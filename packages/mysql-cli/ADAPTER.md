# mysql-cli installation guide

Use Oracle/MySQL official command-line tools:

- [`mysql`](https://dev.mysql.com/doc/refman/8.4/en/mysql.html) — command-line client
- [`mysqlsh`](https://dev.mysql.com/doc/mysql-shell/8.4/en/) — MySQL Shell

For read-only schema access via MCP, see [mysql-mcp-server](../mysql-mcp-server/ADAPTER.md).

## Step 1: Check if already installed

```shell
mysql --version
mysqlsh --version
```

If both are available, no installation is needed.

## Step 2: Install (if missing)

Installation depends on the operating system. **Ask the user before running any package manager command**, then follow the official MySQL install docs for their platform.

## Step 3: Use safely

- Use a read-only account by default.
- Do not commit passwords or connection strings to git.
- Show commands and wait for user confirmation before write operations (`INSERT`, `UPDATE`, `DELETE`, `DDL`, imports, dumps).

## Example prompts

```text
Check whether mysql and mysqlsh are available; do not install system packages without asking.
```

```text
Connect with a read-only account and run SELECT 1 and SHOW DATABASES only.
```
