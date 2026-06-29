# postman-api integration guide

Use Postman's official agent and automation surfaces for API collection management and integration test execution.

Official references:

- [Postman MCP Server](https://learning.postman.com/docs/reference/vs-code-extension/postman-mcp-server/)
- [Postman API](https://learning.postman.com/docs/developer/postman-api/intro-api/)
- [Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-overview/)
- [Newman CLI](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/)

## Capability matrix

| Need | Preferred path | Fallback path |
| ---- | -------------- | ------------- |
| Agent-managed collections, requests, tests, environments | Postman MCP Server | Postman API |
| CRUD for collections and environments | Postman MCP Server or Postman API | Local exported collection JSON, then import/sync |
| Generate or update Tests / pre-request scripts | Postman MCP Server | Postman API update collection payloads |
| Execute integration tests | Postman CLI or Newman | Postman cloud monitor / local Postman runner |
| Human rerun and debugging | Postman desktop app | Exported collection + environment files |

## Authentication

Use a Postman API key stored outside git:

```shell
export POSTMAN_API_KEY=<set-locally>
```

Do not commit API keys, workspace IDs, environment secrets, exported production environment values, or generated reports that contain tokens.

## MCP setup

When the agent platform supports remote MCP servers, configure Postman's official MCP endpoint with bearer authentication. Exact config keys vary by agent, but the HTTP header must resolve to:

```text
Authorization: Bearer ${POSTMAN_API_KEY}
```

Use MCP first for workspace-aware create/read/update/delete operations because it gives the agent typed tools instead of requiring it to handcraft full collection payloads.

## API fallback

If MCP is unavailable, use the Postman API with least-privilege workspace scope.

Common operations:

```shell
curl -sS -H "X-Api-Key: ${POSTMAN_API_KEY}" \
  "https://api.getpostman.com/collections"

curl -sS -H "X-Api-Key: ${POSTMAN_API_KEY}" \
  "https://api.getpostman.com/environments"
```

For write operations, show the target workspace, collection/environment name, and high-level diff before sending a request. Prefer updating development or staging collections over production collections.

## Execute tests

Use a local runner for reproducible integration verification:

```shell
postman collection run <collection-id-or-file> \
  --environment <environment-id-or-file>
```

or:

```shell
npx newman run ./postman/collection.json \
  --environment ./postman/environment.json \
  --reporters cli,json \
  --reporter-json-export ./.ai/context/verification/postman-newman-report.json
```

Postman CLI is the first choice when the team already uses Postman cloud workspaces. Newman is the first choice for repository-local exported collections or CI jobs that should not depend on a desktop client.

## Agent workflow

1. Discover API contracts from `.ai/context`, OpenAPI files, REST/RPC docs, or source routes.
2. Build an integration scenario graph: setup, auth, create/read/update/delete, cross-module assertions, cleanup, and negative paths.
3. Create or update a Postman collection with folders per scenario and requests ordered by data dependency.
4. Attach Tests scripts that assert status, schema, required business fields, error codes, side effects, and variables passed to later requests.
5. Create or update a non-production environment with base URLs and generated test data placeholders.
6. Run the collection once with Postman CLI or Newman.
7. If failures are caused by generated tests or stale assumptions, adjust the collection/tests and rerun. If failures indicate product defects, stop and record evidence.
8. Store verification evidence in `.ai/context/**/verification.md` or an equivalent verification record.

## Safety constraints

- Use local, dev, or staging targets by default.
- Ask before running against production or mutating shared cloud collections.
- Add cleanup requests when tests create persistent data.
- Keep generated test data idempotent by using timestamps, UUIDs, or pre-run cleanup.
- Redact secrets from command output and report files before committing or sharing.
