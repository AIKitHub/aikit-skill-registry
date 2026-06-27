# zero-skills installation guide

Install the official [go-zero Agent Skill](https://github.com/zeromicro/zero-skills) into your project.

Upstream usage: see upstream `SKILL.md` and `getting-started/` guides.

## Step 1: Install

Clone into the skill directory for your host:

```shell
# Cursor
git clone https://github.com/zeromicro/zero-skills.git .cursor/skills/zero-skills

# Codex
git clone https://github.com/zeromicro/zero-skills.git .agents/skills/zero-skills

# Claude Code
git clone https://github.com/zeromicro/zero-skills.git .claude/skills/zero-skills
```

Use branch `main` unless you need a specific version.

## Step 2: Verify

- **Cursor** — skill appears under `.cursor/skills/zero-skills/`.
- **Codex** — run `/skills` and select `zero-skills`, or use `$zero-skills` in a prompt.
- **Claude Code** — run `/skills` or ask the Agent to use go-zero conventions.

## Upgrade

Pull the latest upstream content in the installed directory:

```shell
git -C .cursor/skills/zero-skills pull   # adjust path for your host
```

Ask the user before upgrading if the directory has local changes.
