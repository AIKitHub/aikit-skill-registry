# Xquik X data skill installation guide

Install the Xquik X data skill from [Xquik-dev/x-twitter-scraper](https://github.com/Xquik-dev/x-twitter-scraper/tree/master/skills/x-twitter-scraper).

The skill helps agents route X data workflows through Xquik REST, MCP, SDK setup, tweet search, user lookup, follower export, monitoring, webhooks, and approval-gated X actions.

## Prerequisites

- Git
- An Xquik API key exposed as `XQUIK_API_KEY`

## Step 1: Install

Clone the source repository, then copy only the skill directory into the detected Agent skill directory from `registry/skills.json`.

```shell
tmp_dir="$(mktemp -d)"
git clone --depth 1 --branch master https://github.com/Xquik-dev/x-twitter-scraper.git "$tmp_dir/x-twitter-scraper"

# Cursor
mkdir -p .cursor/skills
cp -R "$tmp_dir/x-twitter-scraper/skills/x-twitter-scraper" .cursor/skills/x-twitter-scraper

# Codex
mkdir -p .agents/skills
cp -R "$tmp_dir/x-twitter-scraper/skills/x-twitter-scraper" .agents/skills/x-twitter-scraper

# Claude Code
mkdir -p .claude/skills
cp -R "$tmp_dir/x-twitter-scraper/skills/x-twitter-scraper" .claude/skills/x-twitter-scraper
```

Choose only the block for the detected Agent. If the destination already exists, ask before replacing it.

## Step 2: Configure

Set `XQUIK_API_KEY` in the user's local environment or secret store. Do not write API keys to tracked files.

Optional MCP setup is documented at <https://docs.xquik.com/mcp/overview>.

## Step 3: Verify

- Cursor: confirm `.cursor/skills/x-twitter-scraper/SKILL.md` exists.
- Codex: confirm `.agents/skills/x-twitter-scraper/SKILL.md` exists, then use `$x-twitter-scraper`.
- Claude Code: confirm `.claude/skills/x-twitter-scraper/SKILL.md` exists, then run `/skills`.

## Upgrade

Pull a fresh copy from the source repository and replace the installed skill directory after confirming there are no local edits to preserve.

Xquik is an independent third-party service. Not affiliated with X Corp. "Twitter" and "X" are trademarks of X Corp.
