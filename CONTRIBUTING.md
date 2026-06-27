# Contributing

## What to add

- Registry entries in `registry/skills.json`
- User-facing install guides in `packages/<id>/ADAPTER.md`

Do **not** add secrets, credentials, internal URLs, or vendored upstream code trees.

First-party `SKILL.md` content belongs in [aikit-skills](https://github.com/AIKitHub/aikit-skills).

## Adding an entry

1. Add a unique `id` to `registry/skills.json`.
2. Add `packages/<id>/ADAPTER.md` — a step-by-step install guide for end users (see existing entries).
3. Set `supported_tools` to: `cursor`, `codex`, `claude-code`.
4. Validate JSON: `python -m json.tool registry/skills.json`.
5. Open a pull request with the upstream source and any security notes.

Registry field reference: [docs/registry-schema.md](docs/registry-schema.md).

## Commit messages

- `feat: add <skill-id> registry entry`
- `docs: update feishu-cli install steps`
- `fix: correct mysql-mcp-server env example`
