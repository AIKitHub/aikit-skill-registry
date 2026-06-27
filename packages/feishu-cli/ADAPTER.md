# Feishu CLI installation guide

Install the Feishu (Lark) CLI and its companion skill. Some steps require the user to complete actions in a browser.

Official docs: [Feishu CLI installation guide](https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md)

## Prerequisites

- Node.js (npm / npx)

## Step 1: Install CLI

Run in the project or user home (ask before global install):

```shell
npm install -g @larksuite/cli
```

If `npm install -g` fails with permission errors:

```shell
mkdir -p "$HOME/.npm-global/bin"
NPM_CONFIG_PREFIX="$HOME/.npm-global" npm install -g @larksuite/cli
export PATH="$HOME/.npm-global/bin:$PATH"
```

Verify: `lark-cli --version`

## Step 2: Install platform skills (Feishu `skills` CLI)

Feishu distributes skills via the [`skills`](https://skills.sh/) CLI. **This tool is Feishu-specific** — other registry entries do not use it.

Replace `<agent>` with the detected Agent id from `registry/skills.json` → `agents` (e.g. `cursor`, `claude-code`, `codex`):

```shell
npx -y skills add https://open.feishu.cn --agent <agent> -y
```

> **Important:** `--agent` is required for this CLI. Omitting it installs to every supported Agent (~50 project directories).

## Step 3: Configure app credentials

The user runs this in their terminal (browser required). The Agent may help interpret the output:

```shell
lark-cli config init --new
```

## Step 4: Login

The user runs this in their terminal. The Agent may extract the auth link and send it to the user:

```shell
lark-cli auth login --recommend
```

## Step 5: Verify

```shell
lark-cli auth status
npx skills ls -a <agent>
```

## Claude Code (optional)

To reduce permission prompts, merge into `.claude/settings.json` (project) or `~/.claude/settings.json` (global):

```json
{ "permissions": { "allow": ["Bash(lark-cli:*)"] } }
```

## Upgrade

```shell
npm update -g @larksuite/cli
```

Re-run Step 2 if Feishu updates the platform skill.
