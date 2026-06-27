# aikit-skill-registry

[English](README.md) | **简体中文**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

第三方 Agent Skill 注册表。向 Agent 发送「一句话 + 链接」，即可拉取索引与安装指南，并在当前项目中完成安装。

> 请勿将密码、API Token 或内网地址提交到 git。详见 [SECURITY.md](SECURITY.md)。

## 链接

| 资源 | URL |
|------|-----|
| 仓库 | https://github.com/AIKitHub/aikit-skill-registry |
| **安装指令** | [docs/install.md](docs/install.md) |
| **技能索引** | https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json |

## 安装（复制到 Agent 对话）

```text
请帮我安装 AIKitHub Skill：
https://github.com/AIKitHub/aikit-skill-registry/blob/main/docs/install.md
```

可在本条消息中附带 skill `id`；未附带则 Agent 列出可选 id。

## 贡献与安全

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [docs/develop-guide.md](docs/develop-guide.md)
- [SECURITY.md](SECURITY.md)

## 许可证

Apache License 2.0 — [LICENSE](LICENSE)
