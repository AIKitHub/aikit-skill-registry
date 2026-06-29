# postgres-cli installation guide

Use the official PostgreSQL command-line client:

- [`psql`](https://www.postgresql.org/docs/current/app-psql.html) — PostgreSQL interactive terminal

For hosted Neon Postgres MCP and Agent Skills, see [neon-postgres](../neon-postgres/ADAPTER.md).

## Step 1: Check if already installed

```shell
psql --version
```

If `psql` is available, no installation is needed.

## Step 2: Install (if missing)

Installation depends on the operating system and package manager. **Ask the user before running any package manager command**, then follow the official PostgreSQL install docs or the OS package manager docs for their platform.

Do not install or upgrade system packages without explicit user approval.

## Step 3: Use safely

- Use a read-only database role by default.
- Do not commit passwords, connection strings, `.pgpass`, service files, or private hostnames to git.
- Prefer local environment variables or an untracked local service definition.
- Show commands and wait for user confirmation before write operations (`INSERT`, `UPDATE`, `DELETE`, DDL, imports, dumps, migrations).

## Useful checks

```shell
psql --version
psql "$DATABASE_URL" -c "SELECT 1;"
psql "$DATABASE_URL" -c "\\dt"
```

Use `SELECT`, `SHOW`, `EXPLAIN`, and schema inspection commands by default. For production databases, do not run large scans or exports without explicit approval.

## Example prompts

```text
Check whether psql is available; do not install system packages without asking.
```

```text
Connect with a read-only PostgreSQL role and run SELECT 1 plus schema inspection only.
```
