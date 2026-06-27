# mysql-mcp-server installation guide

Install a **read-only** MySQL MCP server ([mysql-mcp-server on npm](https://www.npmjs.com/package/mysql-mcp-server)). This is a community package, not an Oracle/MySQL official product.

For direct SQL via official clients, see [mysql-cli](../mysql-cli/ADAPTER.md).

## Prerequisites

- Node.js (npm / npx)
- A MySQL account with read-only access (`SELECT`, `SHOW VIEW`)

## Step 1: Install

In the project root:

```shell
npm install -D mysql-mcp-server
```

## Step 2: Set connection variables

Do **not** commit real passwords. Use environment variables or local untracked config:

```shell
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=readonly_user
MYSQL_PASSWORD=<set-locally>
MYSQL_DATABASE=app_db
```

## Step 3: Add MCP configuration

Add to your host's MCP config (Cursor / Codex / Claude Code):

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": ["mysql-mcp-server"],
      "env": {
        "MYSQL_HOST": "127.0.0.1",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "readonly_user",
        "MYSQL_PASSWORD": "${MYSQL_PASSWORD}",
        "MYSQL_DATABASE": "app_db"
      }
    }
  }
}
```

Replace `${MYSQL_PASSWORD}` with your host's env-var syntax if different.

## Step 4: Verify

```shell
npx mysql-mcp-server --help
```

Use the MCP tools for schema exploration and read-only queries (`SELECT`, `EXPLAIN`). Confirm with the user before large scans or exports.
