# AIKitHub 技能注册表 — Agent 安装指令

## 任务

将 skill 安装到**当前项目**。用户不运行命令、不填配置；由你完成识别、安装与验证。

## 输入

- 用户消息中可选 skill `id`
- 未提供 `id` → 读取索引后列出全部 id，请用户选择一个

## 资源

| 用途 | URL |
|------|-----|
| 技能索引 | https://raw.githubusercontent.com/AIKitHub/aikit-skill-registry/main/registry/skills.json |
| 仓库（读 ADAPTER） | https://github.com/AIKitHub/aikit-skill-registry |

索引字段：`agents`（Agent 识别）、`skills[].id`、`skills[].supported_agents`。安装步骤在 `packages/<id>/ADAPTER.md`。

## 步骤

1. 拉取 `registry/skills.json`，确定目标 `id`（见「输入」）。
2. 自动识别当前 Agent（读 `agents` + `detection_order`；仓库在本地可执行 `node scripts/detect-agent.mjs --project <项目目录>`）。
3. 确认该 Agent 在目标的 `supported_agents` 中。
4. 读取 `packages/<id>/ADAPTER.md`，**仅按该文件**安装到对应 Agent 的项目目录；各 skill 方式不同，禁止套用其他 skill 的命令。
5. 按 ADAPTER 验证安装结果，简要告知用户路径与后续需手动完成的步骤（如有）。

## 约束

**必须**

- 优先项目级安装
- 全局 npm / 系统包安装前先征得用户同意
- 凭据走环境变量或本地未跟踪配置

**禁止**

- 要求用户运行安装命令或选择技术配置项
- 把密码、Token、内网地址写入 git
- 在无法识别 Agent 时猜测安装；须一句话确认（例：「检测到 Cursor，是否继续？」）

## 维护

规则变更时同步更新本文件。Schema 见 [registry-schema.md](registry-schema.md)；贡献见 [CONTRIBUTING.md](../CONTRIBUTING.md)。
