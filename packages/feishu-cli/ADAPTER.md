# Feishu CLI installation guide

Install the Feishu (Lark) CLI and its companion skill. Some steps require the user to complete actions in a browser.

Official docs: [Feishu CLI installation guide](https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md)

## Prerequisites

- Node.js (npm / npx)

## Step 1: Install

Run in the project or user home (ask before global install):

```shell
npm install -g @larksuite/cli
npx -y skills add https://open.feishu.cn --skill -y
```

If `npm install -g` fails with permission errors:

```shell
mkdir -p "$HOME/.npm-global/bin"
NPM_CONFIG_PREFIX="$HOME/.npm-global" npm install -g @larksuite/cli
export PATH="$HOME/.npm-global/bin:$PATH"
```

Verify: `lark-cli --version`

## Step 2: Configure app credentials

The user runs this in their terminal (browser required). The Agent may help interpret the output:

```shell
lark-cli config init --new
```

## Step 3: Login

The user runs this in their terminal. The Agent may extract the auth link and send it to the user:

```shell
lark-cli auth login --recommend
```

## Step 4: Verify

```shell
lark-cli auth status
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

Re-run the `npx skills add ...` command if Feishu updates the platform skill.
