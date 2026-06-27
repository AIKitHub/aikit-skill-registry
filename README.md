# aikit-skill-registry

**English** | [简体中文](README.zh-CN.md)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A catalog of third-party Agent Skills. Send your Agent a one-liner with a link below; it will fetch the index and install guide, then install into your project.

> Do not commit passwords, API tokens, or private URLs. See [SECURITY.md](SECURITY.md).

## Links

| Resource | URL |
|----------|-----|
| Repository | https://github.com/AIKitHub/aikit-skill-registry |
| **Skill index** | https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json |

The skill index lists every available `id`. Install guide for each entry: `packages/<id>/ADAPTER.md`.

## Install (copy & paste to your Agent)

**Install by id** — put the skill id(s) in your message; the Agent reads the index:

```text
Install skills from the AIKitHub registry into the current project:
https://github.com/AIKitHub/aikit-skill-registry

Fetch the skill index (registry/skills.json) and install the id(s) I specify in this message.
If none are specified, list available ids from the index and ask me to choose.
Detect the current Agent host automatically. Prefer project-scoped install; ask before global install or system packages. Do not commit credentials.
```

**Generic template** — replace `<skill-id>` with an id from the index:

```text
Install skill <skill-id> into the current project.
Read https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json to verify the id, then follow https://github.com/AIKitHub/aikit-skill-registry/blob/main/packages/<skill-id>/ADAPTER.md
Detect the host automatically. Prefer project-scoped install; ask before global install or system packages. Do not commit credentials.
```

**Example** (skill id filled in):

```text
Install skill feishu-cli into the current project.
Read the skill index to verify the id, then follow the matching ADAPTER.md under packages/feishu-cli/.
Ask before global npm install; login steps require the user in a browser.
```

## Common install paths

Skills are installed into your **project** by default. Paths vary by Agent; let the Agent pick based on the current environment. Examples:

| Environment (example) | Project directory (example) |
|-----------------------|----------------------------|
| Cursor | `.cursor/skills/<id>/` |
| Codex | `.agents/skills/<id>/` |
| Claude Code | `.claude/skills/<id>/` |

## After install

Mention the skill in chat, or use whatever skill discovery / invocation your Agent provides (slash commands, explicit references, etc.).

## Contributing & security

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)

## License

Apache License 2.0 — [LICENSE](LICENSE)
