# aikit-skill-registry

[English](README.md) | **简体中文**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

第三方 Agent Skill 注册表。向 Agent 发送「一句话 + 下方链接」，即可拉取索引与安装指南，并在当前项目中完成安装。

> 请勿将密码、API Token 或内网地址提交到 git。详见 [SECURITY.md](SECURITY.md)。

## 链接

| 资源 | URL |
|------|-----|
| 仓库 | https://github.com/AIKitHub/aikit-skill-registry |
| **技能索引** | https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json |

技能索引列出所有可用的 `id`。每个条目的安装指南位于 `packages/<id>/ADAPTER.md`。

## 安装（复制到 Agent 对话）

**按 id 安装** — 在本条消息中写出要安装的 skill id，Agent 从索引读取：

```text
请从 AIKitHub 技能注册表安装到当前项目：
https://github.com/AIKitHub/aikit-skill-registry

拉取技能索引（registry/skills.json），安装我在本条消息中指定的 id。
若未指定，请先列出索引中的可用 id 供我选择。
自动识别当前 Agent 宿主，优先项目级安装；全局安装或系统包安装前先确认；不要把凭据提交到 git。
```

**通用模板** — 将 `<skill-id>` 替换为索引中的 id：

```text
帮我安装技能 <skill-id> 到当前项目。
先读取 https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json 确认 id 存在，再按 https://github.com/AIKitHub/aikit-skill-registry/blob/main/packages/<skill-id>/ADAPTER.md 安装。
自动识别宿主，优先项目级安装；全局安装或系统包安装前先确认；不要把凭据提交到 git。
```

**示例**（已填入 skill id）：

```text
帮我安装 feishu-cli 到当前项目。
先读取技能索引确认 id，再按 packages/feishu-cli/ADAPTER.md 安装。
全局 npm 安装前先确认；登录步骤需用户在浏览器中完成。
```

## 常见安装路径

默认安装到**当前项目**。不同 Agent 的 skill 目录可能不同，由 Agent 根据当前环境选择；例如：

| 环境（示例） | 项目内目录（示例） |
|-------------|-------------------|
| Cursor | `.cursor/skills/<id>/` |
| Codex | `.agents/skills/<id>/` |
| Claude Code | `.claude/skills/<id>/` |

## 安装后使用

在对话中提及 Skill 名称，或使用当前 Agent 提供的 Skill 发现 / 调用方式（如 slash 命令、显式引用等）。

## 安全提醒

- 数据库请使用只读账号；写操作需人工确认。
- 飞书 CLI 登录需在浏览器中由用户本人完成。
- 凭据通过环境变量或本地未提交配置注入，不要写入仓库。

## 贡献与安全

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)

## 许可证

Apache License 2.0 — [LICENSE](LICENSE)
