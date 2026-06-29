# neon-postgres installation guide

Install the official Neon Postgres Agent integration: Neon MCP Server plus Neon Agent Skills.

Official docs:

- [Neon MCP Server](https://neon.com/docs/ai/neon-mcp-server)
- [Neon Agent Skills](https://neon.com/docs/ai/agent-skills)

This is for Neon-hosted Postgres. For generic PostgreSQL CLI access, see [postgres-cli](../postgres-cli/ADAPTER.md).

## Prerequisites

- Node.js (npm / npx)
- A Neon account and project access
- User approval before browser/OAuth authentication

## Step 1: Project setup

Run in the project root:

```shell
npx neonctl@latest init
```

Neon documents this as the quickest setup path for AI coding assistants. It authenticates with Neon, configures the MCP server, and installs project-level Agent Skills where supported.

If the user only wants the remote MCP server and not the full project setup, use:

```shell
npx add-mcp https://mcp.neon.tech/mcp
```

Use project-level setup by default. Add global flags only if the user explicitly asks for global installation.

## Step 2: Agent-specific official paths

Use the detected Agent id from `registry/skills.json` and pick the matching official path:

- Cursor: Neon plugin from Cursor Marketplace, or `/add-plugin neon-postgres`.
- Claude Code: `/plugin marketplace add neondatabase/agent-skills`, then `/plugin install neon-postgres@neon`.
- Codex: install the Neon Postgres plugin from the Codex plugin directory with `/plugins`.
- Agent Skills compatible tools: `npx skills add neondatabase/agent-skills -s neon-postgres`.

The generic `npx neonctl@latest init` path is preferred when the user wants setup handled automatically for the current project.

## Step 3: Authentication

Neon setup may open OAuth or require an API key. The Agent may start the setup only after user approval for browser/auth steps.

Do not commit:

- Neon API keys
- database URLs
- branch URLs
- private project IDs if the repository is public

For remote agents or CI, use environment variables such as `NEON_API_KEY` instead of writing secrets to repository files.

## Step 4: Verify

After setup, restart the editor/Agent if required, then ask the assistant:

```text
Get started with Neon.
```

Also verify CLI availability if `neonctl` was installed transiently:

```shell
npx neonctl@latest --version
```

## Safety defaults

- Prefer development projects or Neon branches, not production.
- Review and authorize all schema changes and SQL execution.
- Use read-only or least-privilege access for data exploration.
- Keep destructive operations (`DROP`, `TRUNCATE`, bulk updates, branch deletion, project deletion) behind explicit user confirmation.

## Example prompts

```text
Install neon-postgres for this project using the official Neon setup; keep it project-scoped and ask before browser authentication.
```

```text
Use Neon MCP to inspect the current development branch schema. Do not run migrations or write SQL without confirmation.
```
