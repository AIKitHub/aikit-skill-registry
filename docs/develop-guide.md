# Develop guide

For registry maintainers. End-user / Agent install instructions: [install.md](install.md).

Related: [registry-schema.md](registry-schema.md) · [CONTRIBUTING.md](../CONTRIBUTING.md)

## Repository layout

| Path | Audience | Purpose |
| ---- | -------- | ------- |
| `registry/skills.json` | Agent | Skill index + `agents` detection map |
| `packages/<id>/ADAPTER.md` | Agent | Per-skill install steps (method varies by skill) |
| `scripts/detect-agent.mjs` | Agent (optional) | Agent detection helper |
| `docs/install.md` | User + Agent | Install instructions (single source) |
| `docs/develop-guide.md` | Maintainer | This file |

## Agent install workflow

See [install.md](install.md) — single source for user prompts and Agent rules. Summary for maintainers:

## Adding a skill entry

1. Add fields to `registry/skills.json`.
2. Add `packages/<id>/ADAPTER.md` with complete, self-contained install steps.
3. Set `supported_agents` to a subset of `agents` keys.
4. Validate: `python -m json.tool registry/skills.json`.
5. Update [install.md](install.md) if Agent install rules change.

Vendor-specific CLI flags belong in ADAPTER.md only (e.g. feishu-cli `skills add --agent`).
