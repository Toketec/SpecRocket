---
name: spec-rocket
description: "斜杠命令 /spec-rocket — 规格驱动开发（SDD）框架。子命令：init, brainstorm, migrate, preview, update。"
version: 2.8.0
license: MIT
---

# `/spec-rocket` — SpecRocket 项目引导命令

> SpecRocket 的 AI 协作指南。任何 AI 编码代理（Claude Code、Cursor、Cline、Windsurf、Codex、Hermes Agent 等）均可按本文档指引执行 `/spec-rocket` 命令。
>
> 安装方式：克隆本仓库 → AI 读取 `SKILL.md`（或将本文档内容注入为系统提示词）。

## 仓库结构

```
SpecRocket/                      ← 本仓库
├── SKILL.md                    ← 标准 skill 文件（AI 斜杠命令）
├── spec-rocket                 ← CLI 脚本（init / update / migrate）
├── init.sh                     ← 手动 init 脚本（无 AI 时用）
├── ssot-convention.zh.md   ← 完整 SSOT 规范手册（仅主仓库，不进入项目模板）
├── SSOT-开发方法论-培训.pptx ← 培训 PPT（仅主仓库）
├── template/               ← 项目模板框架（init/migrate 复制此目录）
│   ├── AGENTS.md               ← AI 协作规则
│   ├── CLAUDE.md               ← Claude Code 协作规则
│   ├── docs/                   ← 产品文档模板
│   ├── ADR/                    ← 架构决策模板
│   ├── apps/businesses/tools/  ← 模块模板
│   └── ...
├── README.md                   ← 项目介绍
├── LICENSE                     ← MIT License
```

## 斜杠命令

全部命令在 AI 对话中以 `/spec-rocket` 开头：

| 命令 | 用途 |
|:----|:------|
| `init [项目名]` | 从 template/ 目录复制骨架。无参=当前目录，有参=新建项目目录 |
| `brainstorm` | 引导用户描述产品 → 自动生成产品文档 + 创建 sprint |
| `migrate` | ① 给现有项目嵌入骨架；② 旧版 SpecRocket 项目强制升级到最新模板结构（内容转移） |
| `preview` | 扫描项目 → 生成 dark-theme 可视化预览页 |
| `update` | 一键更新本地 skill（自动检测用户使用的 AI 工具，按工具安装位置同步） |

---

## `/spec-rocket init` — 建新项目

**做什么：** 从 `template/` submodule 复制 SpecRocket 骨架到目标项目，初始化 Git。**无参时在当前目录初始化，有参时创建项目目录。**

**手动执行（无 AI 时）：**
```bash
./init.sh              # 在当前目录初始化
./init.sh 项目名        # 创建目录并初始化
```

**AI 斜杠命令执行时：**
1. **判断目标：**
   - 无参数 → 在当前目录 `.` 进行初始化
   - 有参数 `项目名` → 创建目录 `项目名` 并进入
2. **获取模板：** 如果当前不在 SpecRocket 仓库内，先 `git clone https://github.com/Toketec/SpecRocket.git` 到临时目录，获取 `template/` 内容
3. 复制 `template/` 全部内容到目标目录
4. 执行 `git init` + 首次提交
5. 完成初始化。告诉用户骨架已就位，建议下一步跑 `/spec-rocket brainstorm` 引导填写产品文档。

---

## `/spec-rocket update` — 一键更新本地 skill（工具感知）

**用途：** 把本地 SpecRocket skill 更新到最新版本。**自动检测用户使用的 AI 产品**，按各产品的 skill/规则安装位置同步——不假设用户一定用某个工具。

**推荐执行（有 CLI）：**
```bash
./spec-rocket update
```

**各 AI 产品的 skill 安装位置与同步方式：**

| AI 产品 | skill/规则位置 | update 动作 |
|:-------|:-------------|:-----------|
| **Hermes Agent** | `~/.hermes/skills/spec-rocket/` | 复制最新 `SKILL.md` + `references/` |
| **spec-rocket-light**（若安装） | `~/.hermes/skills/spec-rocket-light/` | 同步 light 版 SKILL.md |
| **Codex** | 项目级 `AGENTS.md`（全局 `~/.codex/AGENTS.md` 谨慎） | 检测到全局含 SpecRocket 内容 → 提示手动同步；推荐项目级由 init/migrate 注入 |
| **Claude Code** | 项目级 `CLAUDE.md`（每个项目一份） | 无需全局更新；项目升级用 `/spec-rocket migrate` |
| **Cursor** | 项目级 `.cursor/rules/` 或 `.cursorrules` | 同上 |
| **Windsurf** | 项目级 `.windsurf/rules/` | 同上 |
| **Cline** | 项目级 `CLAUDE.md` | 同上 |

> **核心原则**：SpecRocket 是纯文件约定。`update` 保证「本地源」最新（仓库 git pull + 有全局 skill 概念的工具同步），项目级规则文件（CLAUDE.md / AGENTS.md 等）随各项目执行 `migrate` 更新。

**AI 斜杠命令执行时（无 CLI 环境）：**
1. `git pull` 本地 SpecRocket 仓库（若为 clone）
2. 检测用户工具：`command -v hermes claude codex cursor windsurf cline`
3. 按上表同步对应位置：
   - Hermes → 复制 `SKILL.md` 到 `~/.hermes/skills/spec-rocket/`
   - 其他工具 → 告知用户项目级规则文件用 `/spec-rocket migrate` 更新
4. 输出更新报告（版本号 + 各工具状态）

---

## `/spec-rocket brainstorm` — 引导填文档

**用途：** 用户已经有项目（刚 init 或现有项目），不清楚怎么写文档。AI 用问题引导，按固定顺序写 4 组文件。

### 📋 编辑顺序（必须遵守，不跳序）

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `docs/product-overview.md` | 全局锚点，定义产品是什么 |
| 2️⃣ | `docs/non-functional-reqs.md` | 技术约束基线（性能/安全/合规） |
| 3️⃣ | `docs/visual-design.md` | 视觉方向（或明确无 UI） |
| 4️⃣ | `docs/sprints/sprint-001/` | 版本迭代设计 |

> 每步完成后再进入下一步。即使确定本项目无 UI/无特殊非功能需求，2️⃣3️⃣也必须写一行占位（参见「占位规则」）。

### 📌 占位规则

> `docs/` 根目录下的每个文件在 brainstorm 结束时**必须存在并有内容**。即使项目极简也要写一行占位，不能漏或删。

| 文件 | 占位示例 |
|:----|:--------|
| `non-functional-reqs.md` | `本项目为无用户交互的脚本工具，无特殊非功能需求要求。` |
| `visual-design.md` | `本项目无前端界面（纯后端/脚本/CLI），不涉及视觉设计。` |

> 占位原则：说清楚**为什么不需要**，不留"可能是忘了"的疑问。

### 执行流程

1. 确认 `docs/` 存在，没有就先跑 init
2. **Step 1️⃣** — 写 product-overview.md：依次提问

   | # | 问题 | 写入哪里 |
   |:--|:-----|:---------|
   | 1 | 一句话描述这个产品？ | 标题 + 一句话 |
   | 2 | 目标用户是谁？（角色+一句话） | 用户画像表格 |
   | 3 | 最核心的场景是什么？ | 核心场景章节 |
   | 4 | 涉及哪些关键术语？ | 术语表 |

3. **Step 2️⃣** — 写 non-functional-reqs.md：判断项目是否需要性能/安全/合规基线
   - 有 → 按模板填写关键指标
   - 无 → 写入占位行
4. **Step 3️⃣** — 写 visual-design.md：判断项目是否有前端界面
   - 有 UI → 根据产品类型选策略（完整设计系统 / UI框架定制 / 纯框架默认）
   - 纯后端/脚本/CLI → 写入占位行
5. **Step 4️⃣** — 创建 sprint-001：一个问题引导

   | # | 问题 | 写入哪里 |
   |:--|:-----|:---------|
   | 5 | 第一个版本最想做什么功能？ | 创建 `sprints/sprint-001_功能名/` 从 _template |

6. 展示全部 4 组文件给用户确认
7. 问："还要补充什么？直接告诉我改哪里"

---

## `/spec-rocket migrate` — 嵌入骨架 / 旧版项目升级

**用途：** 两种模式：
- **模式 1**：给已有项目（非 SpecRocket）添加骨架文件
- **模式 2**：旧版 SpecRocket 项目强制升级到最新模板结构（含用户自定义文档的内容转移）

### 模式 1：嵌入骨架（新增文件）

**执行规则：** 只添加不存在的文件，不修改现有代码。从 template/ 中复制。

**操作步骤：**
1. **获取模板：** 如果当前不在 SpecRocket 仓库内，先克隆到临时目录
2. 对每个文件，检查目标目录是否已存在：
   - 已存在 → 跳过（不覆盖）
   - 不存在 → 从 template/ 对应路径复制
3. **添加清单（源路径 → 目标路径）：**

   | 源（template/ 内） | 目标 |
   |:-----------------|:-----|
   | `AGENTS.md` | `./AGENTS.md` |
   | `.gitignore` | `./.gitignore` |
   | `docs/sprints/_template/` | `docs/sprints/_template/` |
   | `apps/_template/` | `apps/_template/` |
   | `businesses/_template/` | `businesses/_template/` |
   | `tools/_template/` | `tools/_template/` |
   | `ADR/_template/` | `ADR/_template/` |

4. 完成时列出添加的文件清单，告诉用户做了什么

### 模式 2：旧版 SpecRocket 项目升级（结构迁移 + 内容转移）

> 当项目由旧版本（v2.1 ~ v2.3）初始化，或用户自行添加了不符合模板结构的文档时使用。**强制更新到最新模板结构。**

**第 1 步：结构迁移（脚本执行）**
```bash
./spec-rocket migrate [项目路径]     # 默认当前目录
```
脚本会：
- 检测旧版文件：`ux-flows.md` / `ui-wireframes.md` / `user-journey-flows.md` / 全局 `spec/` + `_catalog.yaml`
- **规整 sprints 结构**：检测废弃的 `sprint-000_initial/`（v2.5.0 起废弃）——纯模板副本（文件仍含占位符）直接删除；含真实内容则重命名为 `sprint-000_initial.legacy/` 保留待转移
- **清理文档中的 000 残留**：AGENTS.md / CLAUDE.md / README.md / README.en.md / ssot-convention*.md / docs/README.md 结构图中的 `sprint-000_initial` 块自动删除（含兄弟节点前缀修正）；正文描述残留写入 MIGRATION-REPORT.md 由 AI 处理
- **清理方法论残留**：项目根 `ssot-convention*.md` 自动归档到 `archive/`（此文档仅应存在于 SpecRocket 主仓库）
- 从 template 补齐缺失的新 sprint 文件（`user-scenarios.md` / `business-flows.md` / `uml-pack.md`）
- 旧文件重命名为 `*.legacy.md`（内容保留），生成 `MIGRATION-REPORT.md`

**第 2 步：内容转移（AI 执行，按迁移规则）**

| 旧文件 | 内容去向 |
|:-------|:---------|
| `ux-flows.md` | 旅程部分 → `user-scenarios.md` §1；流程部分 → `business-flows.md` |
| `ui-wireframes.md` | 布局/交互 → `prototypes/prototype.html`；系统图表 → `uml-pack.md` |
| `user-journey-flows.md` | 旅程总览 → `user-scenarios.md` §1；流程图 → `business-flows.md` |
| `sprint-000_initial/` | v2.5.0 已废弃——纯模板副本脚本直接删除；含真实内容时 → 把 v1.0 基线设计转移到 `sprint-001/` 对应文件后删除 `.legacy` |
| 全局 `spec/` + `_catalog.yaml` | 按模块迁移到 `{apps\|businesses\|tools}/*/specs/` 四文件（requirements/plan/tasks/check） |

**第 3 步：AI 转移后清理**
- 确认 `*.legacy.md` 内容已全部转移 → 删除 `*.legacy.md` 和 `MIGRATION-REPORT.md`
- 更新 AGENTS.md 目录结构描述（如有手动改动）

> **用户自定义的不符合结构文档**：检测报告中列出 → AI 判断其内容归属（旅程/流程/图表/功能），转移到对应新文件；无法归类的与用户确认后归档到 `archive/`。

---

## `/spec-rocket preview` — 可视化预览

**用途：** 生成 `docs/preview.html`，让人能**快速理解项目全貌**。

顶部是三个通俗易懂的地图，下方是专业信息的解释说明。

---

### 场景 A：项目符合 SpecRocket 模板规范

按模板结构读取文件：

| 地图 | 信息来源 | 展示什么 |
|:----|:---------|:---------|
| 🗺️ **产品地图** | `docs/product-overview.md` | 产品核心功能分区 → 可视化卡片 |
| 🗺️ **业务地图** | `docs/product-overview.md` 核心场景 + `docs/sprints/` | 用户旅程 / 业务流转关系图 |
| 🗺️ **架构地图** | `ADR/` 目录 + `apps/` `businesses/` `tools/` | 模块关系 + 技术选型 |

下方补充信息（按需展示，无则不显）：

| 信息块 | 来源 |
|:------|:-----|
| 用户画像 | `product-overview.md` |
| 关键术语 | `product-overview.md` |
| Sprint 路线图 | `docs/sprints/` |
| ADR 决策列表 | `ADR/` |
| 技术栈 | `non-functional-reqs.md` |
| 项目统计 | 全目录扫描（文件数、目录数、行数） |

---

### 场景 B：非规范项目（无模板结构）

AI 自行探索项目，**先理解再输出**。

**探索步骤：**
1. 看根目录文件列表 → 了解主语言、构建工具（`package.json`、`Cargo.toml`、`go.mod`、`Dockerfile` 等）
2. 读 `README.md` → 了解项目是什么
3. 探索主要源码目录结构 → 了解模块划分
4. 找关键配置文件 → 了解技术栈

**输出规则：** 同样生成三个地图，但基于 AI 的自行探索结论：

- **产品地图** → AI 根据 README + 项目名 + 文件推断产品能力
- **业务地图** → AI 根据代码结构推断领域边界
- **架构地图** → AI 根据源码目录 + 配置文件推断技术架构

> 非规范项目预览时，在每个地图右下角标注 ⚠️ 这是 AI 推断结果，可能存在偏差

---

### 输出格式

- 文件：`docs/preview.html`
- 风格：dark 主题，单页 HTML（内联 CSS，无外部依赖）
- 布局：三地图并排或两行一列（视内容量），下方信息块纵向排列
- 地图使用 ASCII 图表或 SVG 流程图，避免用文字堆砌

**操作步骤：**
1. 判断当前项目是否符合 SpecRocket 模板（检查 `docs/product-overview.md` 是否存在）
2. 按对应场景扫描
3. 生成 HTML → 保存到 `docs/preview.html`
4. 告知用户："预览页已生成 → docs/preview.html"

---

## 关于 Step 2（写 Spec）

SpecRocket **不做** `/spec-rocket plan` 自动写 spec。理由：

```
Dev 把 sprint-001 文档 → 拖到新的 AI 对话中（干净上下文）
  ↓
Dev 给 4 个方向：
  ① 归属哪个模块
  ② 是否需要新 ADR
  ③ 跨模块依赖
  ④ 核心函数/API/表名
  ↓
AI 在干净上下文中写 specs 四文件
  ↓
PM + Dev 评审
```

## 完整使用路径

```chat
# 场景 A：新项目（空目录）
你：帮我进入一个新项目目录
AI：已进入 ~/projects/my-app（空目录）
→ 你：/spec-rocket init "我的项目"
→ AI：从 template/ 复制骨架 → git init
→ 你：/spec-rocket brainstorm
→ AI：5 问引导 → 生成产品文档 + sprint

# 场景 B：已有老项目
你：帮我进入 ~/projects/legacy-app
→ 你：/spec-rocket preview
→ AI：分析现有项目 → 生成全貌预览
→ 你：/spec-rocket migrate
→ AI：嵌入骨架（不碰代码）
→ 或：/spec-rocket brainstorm
→ AI：引导描述产品 → 生成文档
```
