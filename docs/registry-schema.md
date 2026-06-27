# Registry schema reference

For maintainers. User-facing install steps belong in `packages/<id>/ADAPTER.md`.

Source file: [`registry/skills.json`](../registry/skills.json)

## Top level

```json
{
  "version": 1,
  "skills": []
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `version` | integer | yes | Schema version (`1`) |
| `skills` | array | yes | Skill entries |

## Skill entry (common fields)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `id` | string | yes | Unique id; matches `packages/<id>/` |
| `supported_tools` | string[] | yes | `cursor`, `codex`, `claude-code` |
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
  "supported_tools": ["cursor", "codex", "claude-code"]
}
```

## Command entry

```json
{
  "id": "feishu-cli",
  "install_commands": [
    ["npm", "install", "-g", "@larksuite/cli"],
    ["npx", "-y", "skills", "add", "https://open.feishu.cn", "--skill", "-y"]
  ],
  "install_cwd": "~",
  "supported_tools": ["cursor", "codex", "claude-code"]
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `install_commands` | string[][] | yes* | Commands run in order |
| `install_cwd` | string | no | Working directory (`~` = home) |

\* Required when `git` is absent.

## Project install paths

| Host | Directory |
| ---- | ----------- |
| Cursor | `.cursor/skills/<id>/` |
| Codex | `.agents/skills/<id>/` |
| Claude Code | `.claude/skills/<id>/` |
