# postman-api integration guide

Use Postman's official local-first surfaces for API collection management and integration test execution. Prefer repository-local Postman collection and environment files, then import them into the Postman desktop app for human debugging. Use Postman cloud, MCP, or the Postman API only when workspace synchronization or cloud-managed CRUD is explicitly required.

Official references:

- [Postman MCP Server](https://learning.postman.com/docs/reference/vs-code-extension/postman-mcp-server/)
- [Postman API](https://learning.postman.com/docs/developer/postman-api/intro-api/)
- [Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-overview/)
- [Newman CLI](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/)
- [Export data from Postman](https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/)
- [Install the Postman app](https://learning.postman.com/docs/getting-started/installation/install-app/)

## Research conclusion

Postman can be used without relying on a cloud workspace for the default AIKit workflow, but the supported boundary is file-based rather than direct desktop automation:

- Postman desktop supports unsigned-in/lightweight local request work, local collection debugging, and data import/export.
- Postman officially supports exporting collections, environments, and globals as JSON files and importing them back into any Postman instance.
- Postman CLI can run local collections and environments, and can also synchronize with cloud workspaces when needed. It must be installed separately from the desktop app and available on `PATH`.
- Newman can run exported collection JSON locally, but Postman v12 collection v3 compatibility is limited; use Postman CLI when v3 or Native Git workflows are involved.
- There is no documented stable local desktop API for an agent to directly CRUD collections and environments inside the running Postman desktop app. For automated agent edits, update repository-local files first; for human inspection, import them into the desktop app.

Decision: the registry entry should be treated as a local-first Postman adapter. Cloud Postman, MCP, and Postman API are fallbacks for teams that explicitly need shared workspaces, remote CRUD, monitors, or synchronization.

## Capability matrix

| Need | Preferred path | Fallback path |
| ---- | -------------- | ------------- |
| Agent-managed collections, requests, tests, environments | Repository-local collection/environment files | Postman MCP Server or Postman API |
| CRUD for collections and environments | Edit local JSON/YAML, then import into Postman desktop | Postman API for cloud workspace CRUD |
| Generate or update Tests / pre-request scripts | Update local collection files | Postman MCP Server or Postman API update collection payloads |
| Execute integration tests | Postman CLI with local files | Newman for v2.1 JSON collections |
| Human rerun and debugging | Postman desktop app with imported local files | Postman cloud workspace |
| Team synchronization | Git-managed local files | Postman cloud workspace / Native Git |

## Authentication

The local-first path does not require a Postman API key. Use a Postman API key only for Postman MCP Server, Postman API, cloud workspace synchronization, monitors, or other cloud features. Store it outside git:

```shell
export POSTMAN_API_KEY=<set-locally>
```

Do not commit API keys, workspace IDs, environment secrets, exported production environment values, or generated reports that contain tokens.

## Local-first setup

Keep generated artifacts under a project-controlled directory such as `postman/`:

```text
postman/
  collection.json
  environment.local.json
```

Detect the local tools before choosing the exact workflow:

```powershell
Get-Command Postman -ErrorAction SilentlyContinue
Get-Command postman -ErrorAction SilentlyContinue
Get-Command newman -ErrorAction SilentlyContinue
Test-Path "$env:LOCALAPPDATA\Postman\Postman.exe"
```

Workflow:

1. Generate or update the collection/environment files in the repository.
2. Import those files into the Postman desktop app for manual debugging.
3. If a human edits them in Postman desktop, export the collection/environment JSON and replace the repository files.
4. Run verification locally with Postman CLI or Newman when one is installed. If only the desktop app is available, use Postman's local runner manually and record the result.
5. Commit only sanitized collection/environment files. Do not commit local secrets or run reports containing tokens.

## MCP setup

Use MCP only when cloud workspace-aware create/read/update/delete operations are required. When the agent platform supports remote MCP servers, configure Postman's official MCP endpoint with bearer authentication. Exact config keys vary by agent, but the HTTP header must resolve to:

```text
Authorization: Bearer ${POSTMAN_API_KEY}
```

MCP gives the agent typed tools instead of requiring it to handcraft full collection payloads, but it depends on Postman cloud/API access and should not be the default path when local files are sufficient.

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

Postman CLI is the first choice for local-first automated verification, especially for Postman v12 collection v3 or Native Git workflows. It can execute a local collection file without publishing results to Postman cloud, although it may warn that `postman login` is required to publish run details. Newman remains useful for v2.1 exported JSON collections and CI jobs that already standardize on Newman. If neither CLI is installed, keep the collection/environment files local and use the Postman desktop runner manually until a CLI is installed.

## Agent workflow

1. Discover API contracts from `.ai/context`, OpenAPI files, REST/RPC docs, or source routes.
2. Build an integration scenario graph: setup, auth, create/read/update/delete, cross-module assertions, cleanup, and negative paths.
3. Create or update repository-local Postman collection/environment files with folders per scenario and requests ordered by data dependency.
4. Attach Tests scripts that assert status, schema, required business fields, error codes, side effects, and variables passed to later requests.
5. Create or update a non-production environment with base URLs and generated test data placeholders.
6. Run the collection once locally with Postman CLI or Newman.
7. If failures are caused by generated tests or stale assumptions, adjust the collection/tests and rerun. If failures indicate product defects, stop and record evidence.
8. Store verification evidence in `.ai/context/**/verification.md` or an equivalent verification record.

## Safety constraints

- Use local, dev, or staging targets by default.
- Ask before running against production or mutating shared cloud collections.
- Do not assume the local Postman desktop app has an automatable CRUD API; use import/export files as the integration boundary.
- Add cleanup requests when tests create persistent data.
- Keep generated test data idempotent by using timestamps, UUIDs, or pre-run cleanup.
- Redact secrets from command output and report files before committing or sharing.
