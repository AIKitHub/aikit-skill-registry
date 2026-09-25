# yylo-skills installation guide

Install the community YYLO Agent Skills bundle from
[`yylo-dev/yylo-skills`](https://github.com/yylo-dev/yylo-skills) (MIT).

The bundle contains eight skills:

- `artifact-yylo`
- `benchmark-yylo`
- `ledger-tasks-yylo`
- `plan-ledger-tasks-yylo`
- `ralph-loop-yylo`
- `understand-project-yylo`
- `wiki-yylo`
- `workflow-yylo`

## Safety notes

- The upstream repository contains skill instructions (`SKILL.md`), reference docs, and helper scripts only; no credentials are required.
- Review the skill instructions and scripts before installing them; skills can instruct the Agent to run project commands.
- Do not commit task ledgers, receipts, or local task-workspace files that the skills create inside your project unless you intend to track them.

## Step 1: Clone upstream

```shell
git clone https://github.com/yylo-dev/yylo-skills.git /tmp/yylo-skills
```

Use branch `main` unless you need a specific release; published versions use immutable `vMAJOR.MINOR.PATCH` tags.

## Step 2: Install into your project

Copy each skill directory into the skill directory for your Agent.

```shell
# Cursor
mkdir -p .cursor/skills
cp -R /tmp/yylo-skills/skills/artifact-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/benchmark-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/ledger-tasks-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/plan-ledger-tasks-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/ralph-loop-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/understand-project-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/wiki-yylo .cursor/skills/
cp -R /tmp/yylo-skills/skills/workflow-yylo .cursor/skills/

# Codex
mkdir -p .agents/skills
cp -R /tmp/yylo-skills/skills/artifact-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/benchmark-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/ledger-tasks-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/plan-ledger-tasks-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/ralph-loop-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/understand-project-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/wiki-yylo .agents/skills/
cp -R /tmp/yylo-skills/skills/workflow-yylo .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/yylo-skills/skills/artifact-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/benchmark-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/ledger-tasks-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/plan-ledger-tasks-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/ralph-loop-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/understand-project-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/wiki-yylo .claude/skills/
cp -R /tmp/yylo-skills/skills/workflow-yylo .claude/skills/
```

The upstream repository also supports the open `skills` CLI installer as an
alternative route:

```shell
npx skills add yylo-dev/yylo-skills
```

## Step 3: Verify

- Confirm each installed directory contains a `SKILL.md`.
- Ask your Agent to use `understand-project-yylo` when studying a codebase before planning changes.
- Ask your Agent to use `plan-ledger-tasks-yylo` or `ledger-tasks-yylo` when registering Kanban or Ledger tasks.
- Ask your Agent to use `wiki-yylo` when recording durable project knowledge.

## Upgrade

Pull the latest upstream content and copy the eight skill directories again:

```shell
git -C /tmp/yylo-skills pull
```

Ask before overwriting local skill directories if they have project-specific edits.
