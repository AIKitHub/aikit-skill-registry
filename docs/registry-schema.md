# Registry schema reference

For maintainers. User-facing install steps belong in `packages/<id>/ADAPTER.md`.

Source file: [`registry/skills.json`](../registry/skills.json)

## Top level

```json
{
  "version": 1,
  "detection_order": ["cursor", "claude-code", "codex"],
  "agents": {},
  "skills": []
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `version` | integer | yes | Schema version (`1`) |
| `detection_order` | string[] | yes | Agent detection priority |
| `agents` | object | yes | Agent detection map (see below) |
| `skills` | array | yes | Skill entries |

## Agents (`agents`)

Registry-wide Agent detection. Shared by all skills.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `label` | string | Display name |
| `skill_dir` | string | Default project skill directory |
| `skill_dir_alt` | string | Alternate skill directory (optional) |
| `detect.env_any` | string[] | Env vars that identify this Agent |
| `detect.process_names` | string[] | Process names to match |
| `detect.project_markers` | string[] | Paths relative to project root |

Each skill's `supported_agents` lists which Agents that skill supports (subset of `agents` keys).

## Skill entry (common fields)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `id` | string | yes | Unique id; matches `packages/<id>/` |
| `supported_agents` | string[] | yes | `cursor`, `codex`, `claude-code` |
| `install_project` | boolean | no | Project-scoped install |
| `install_global` | boolean | no | Allows global CLI install |
| `checksum_sha256` | string \| null | no | Optional checksum (reserved) |
| `notes` | string | no | Short summary |
| `source_label` | string | no | Upstream doc or package URL |

## Git entry

```json
{
  "id": "zero-skills",
  "git": { "url": "https://github.com/org/repo.git", "ref": "main" },
  "supported_agents": ["cursor", "codex", "claude-code"]
}
```

## Command entry

```json
{
  "id": "feishu-cli",
  "install_commands": [
    ["npm", "install", "-g", "@larksuite/cli"]
  ],
  "install_cwd": "~",
  "supported_agents": ["cursor", "codex", "claude-code"]
}
```

Agent install flow: [install.md](install.md). Per-skill commands in ADAPTER.md.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `install_commands` | string[][] | yes* | Commands run in order |
| `install_cwd` | string | no | Working directory (`~` = home) |

\* Required when `git` is absent.

## Project install paths

| Agent | Directory |
| ----- | ----------- |
| Cursor | `.cursor/skills/<id>/` |
| Codex | `.agents/skills/<id>/` |
| Claude Code | `.claude/skills/<id>/` |
