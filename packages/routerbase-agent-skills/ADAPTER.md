# routerbase-agent-skills installation guide

Install the community [routerbase](https://routerbase.com/) Agent Skills bundle from
[`zenlee123/routerbase-agent-skills`](https://github.com/zenlee123/routerbase-agent-skills).

The bundle contains three skills:

- `routerbase-api-integration`
- `routerbase-model-routing`
- `routerbase-media-generation`

## Safety notes

- The upstream repository contains skill instructions and placeholder examples only.
- Do not commit `ROUTERBASE_API_KEY`, `.env` files, request logs, or generated media that contains private data.
- Use a development RouterBase key first, and store it only in your local environment or secret manager.

## Step 1: Clone upstream

```shell
git clone https://github.com/zenlee123/routerbase-agent-skills.git /tmp/routerbase-agent-skills
```

Use branch `main` unless you need a specific release.

## Step 2: Install into your project

Copy each skill directory into the skill directory for your Agent.

```shell
# Cursor
mkdir -p .cursor/skills
cp -R /tmp/routerbase-agent-skills/skills/routerbase-api-integration .cursor/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-model-routing .cursor/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-media-generation .cursor/skills/

# Codex
mkdir -p .agents/skills
cp -R /tmp/routerbase-agent-skills/skills/routerbase-api-integration .agents/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-model-routing .agents/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-media-generation .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/routerbase-agent-skills/skills/routerbase-api-integration .claude/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-model-routing .claude/skills/
cp -R /tmp/routerbase-agent-skills/skills/routerbase-media-generation .claude/skills/
```

## Step 3: Configure credentials locally

Set your RouterBase API key outside git:

```shell
export ROUTERBASE_API_KEY=<set-locally>
export ROUTERBASE_BASE_URL=https://routerbase.com/v1
```

## Step 4: Verify

- Confirm each installed directory contains a `SKILL.md`.
- Ask your Agent to use `routerbase-api-integration` for an OpenAI-compatible SDK migration.
- Ask your Agent to use `routerbase-model-routing` when planning fallback or cost-aware routing.
- Ask your Agent to use `routerbase-media-generation` when generating image, audio, or video assets through RouterBase.

## Upgrade

Pull the latest upstream content and copy the three skill directories again:

```shell
git -C /tmp/routerbase-agent-skills pull
```

Ask before overwriting local skill directories if they have project-specific edits.
