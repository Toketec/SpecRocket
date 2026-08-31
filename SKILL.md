---
name: spec-rocket
description: "斜杠命令 /spec-rocket — 规格驱动开发（SDD）框架。子命令：init, brainstorm, migrate, preview, update。"
version: 3.0.0
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
│   ├── docs/                   ← 稳定层产品文档模板（含 whitepaper.md）
│   ├── sprints/_template/      ← 迭代容器模板（docs/ 产品设计 + specs/ 技术规格）
│   ├── adrs/                   ← 架构决策模板（adr-NNN-名称.md）
│   ├── assets/                 ← 运营资产模板（configs/interfaces/standards/manuals）
│   ├── apps/businesses/tools/  ← 纯代码域模板（src/，无 specs/）
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
| `migrate` | ① 给现有项目嵌入骨架；② 旧版 SpecRocket 项目强制升级到最新模板结构（转移 → 收敛 → 保留 → 删除，零残留） |
| `preview` | 扫描项目 → 生成 dark-theme 可视化预览页 |
| `update` | 一键更新本地 skill（自动检测用户使用的 AI 工具，按工具安装位置同步） |

---

## `/spec-rocket init` — 建新项目

**做什么：** 从 `template/` 目录（与主仓库共享 .git，非 submodule）复制 SpecRocket 骨架到目标项目，初始化 Git。**无参时在当前目录初始化，有参时创建项目目录。**

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

**用途：** 用户已经有项目（刚 init 或现有项目），不清楚怎么写文档。AI 用问题引导，按固定顺序写 5 组文件。

### 📋 编辑顺序（必须遵守，不跳序）

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `docs/product-overview.md` | 全局锚点，定义产品是什么 |
| 2️⃣ | `docs/non-functional-reqs.md` | 技术约束基线（性能/安全/合规） |
| 3️⃣ | `docs/visual-design.md` | 视觉方向（或明确无 UI） |
| 4️⃣ | `docs/whitepaper.md` | 白皮书（愿景/定位/理念） |
| 5️⃣ | `sprints/sp-001-功能名/` | 版本迭代设计 |

> 每步完成后再进入下一步。即使确定本项目无 UI/无特殊非功能需求/无对外白皮书，2️⃣3️⃣4️⃣也必须写一行占位（参见「占位规则」）。

### 📌 占位规则

> `docs/` 根目录下的每个文件在 brainstorm 结束时**必须存在并有内容**。即使项目极简也要写一行占位，不能漏或删。

| 文件 | 占位示例 |
|:----|:--------|
| `non-functional-reqs.md` | `本项目为无用户交互的脚本工具，无特殊非功能需求要求。` |
| `visual-design.md` | `本项目无前端界面（纯后端/脚本/CLI），不涉及视觉设计。` |
| `whitepaper.md` | `本项目为内部工具，不涉及对外白皮书。` |

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
5. **Step 4️⃣** — 写 whitepaper.md：判断是否有对外白皮书需求
   - 对外产品 → 填写愿景/定位/理念
   - 内部工具 → 写入占位行
6. **Step 5️⃣** — 创建 sp-001：一个问题引导

   | # | 问题 | 写入哪里 |
   |:--|:-----|:---------|
   | 5 | 第一个版本最想做什么功能？ | 创建 `sprints/sp-001_功能名/` 从 _template |

7. 展示全部 5 组文件给用户确认
8. 问："还要补充什么？直接告诉我改哪里"

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
   | `docs/*` | `./docs/*`（product-overview / non-functional-reqs / visual-design / whitepaper） |
   | `sprints/_template/` | `./sprints/_template/` |
   | `adrs/_template/` | `./adrs/_template/` |
   | `apps/_template/` | `./apps/_template/` |
   | `businesses/_template/` | `./businesses/_template/` |
   | `tools/_template/` | `./tools/_template/` |
   | `assets/` | `./assets/` |

4. 完成时列出添加的文件清单，告诉用户做了什么

### 模式 2：旧版 SpecRocket 项目升级（结构迁移 + 内容转移）

> 当项目由旧版本（v2.x）初始化，或用户自行添加了不符合模板结构的文档时使用。**强制更新到最新模板结构（v3.0）。**

**第 1 步：结构迁移（脚本执行）**
```bash
./spec-rocket migrate [项目路径]     # 默认当前目录
```
脚本会：
- **迁移 sprint 容器**：`docs/sprints/sprint-NNN_xxx/` → `sprints/sp-NNN-xxx/docs/`（重命名 + 改路径；检测旧版文件 `ux-flows.md` / `ui-wireframes.md` / `user-journey-flows.md` 报告由 AI 转移）
- **迁移模块规格**：`{apps|businesses|tools}/*/specs/SPEC-{APP|BIZ|TOOL}-NNN_xxx/` → 按 spec 头部「基于冲刺」字段归入 `sprints/sp-NNN-xxx/specs/spec-NNN-xxx/`（脚本报告，AI 执行内容转移 + 重新编号）
- **迁移架构决策**：`ADR/ADR-NNN_xxx.md` → `adrs/adr-NNN-xxx.md`
- **清理废弃目录**：`sprint-000_initial/`（纯模板直接删；含内容转 `.legacy` 待转移）；根目录 `ssot-convention*.md` 归档到 `archive/`
- **补齐新骨架**：`docs/whitepaper.md`、`sprints/_template/`（docs + specs）、`adrs/_template/`
- **扫描游离文档**：docs/ 全递归（排除 sprints/）+ 根目录非白名单内容 → 报告收敛
- **扫描根目录非规范项** → 报告转移收敛到 assets/ 对应子目录
- 生成 `MIGRATION-REPORT.md`

**第 2 步：内容转移（AI 执行，按迁移映射表）**

| 旧文件 | 内容去向 |
|:-------|:---------|
| `ux-flows.md` | 旅程部分 → `sprints/sp-NNN-*/docs/user-scenarios.md`；流程部分 → `business-flows.md` |
| `ui-wireframes.md` | 布局/交互 → `docs/prototypes/prototype.html`；系统图表 → `uml-pack.md` |
| `user-journey-flows.md` | 旅程总览 → `user-scenarios.md`；流程图 → `business-flows.md` |
| `docs/sprints/sprint-NNN_xxx/` 其余文档 | → `sprints/sp-NNN-xxx/docs/` 对应文件 |
| `{apps\|businesses\|tools}/*/specs/SPEC-{APP\|BIZ\|TOOL}-NNN_xxx/` | → 归属冲刺的 `sprints/sp-NNN-xxx/specs/spec-NNN-xxx/`（四文件；重新编号；头部改写覆盖范围） |
| `ADR/ADR-NNN_xxx.md` | → `adrs/adr-NNN-xxx.md` |
| 全局 `spec/` + `_catalog.yaml` | 内容归入对应冲刺 specs/ 或 archive/（AI 判断） |
| `sprint-000_initial.legacy/` | 基线设计转移至 `sp-001-*/docs/` 后删除 |

**第 3 步：AI 转移后清理**
- 确认 `*.legacy.md` 内容已全部转移 → 删除 `*.legacy.md` 和 `MIGRATION-REPORT.md`
- 更新 AGENTS.md 目录结构描述（如有手动改动）

> **迁移原则**：转移 → 收敛 → 保留 → 删除。旧文档/冲刺/规格优先尽量对原始内容做转移；不方便转移的做收敛；不方便收敛的尽量保留信息不丢失；最后删除。**最终保持目录结构完全符合最新规范，零残留。**

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
| 🗺️ **业务地图** | `docs/product-overview.md` 核心场景 + `sprints/` | 用户旅程 / 业务流转关系图 |
| 🗺️ **架构地图** | `adrs/` 目录 + `apps/` `businesses/` `tools/` + `sprints/*/specs/` + `assets/` | 模块关系 + 技术选型 + 迭代规格分布 + 运营资产（配置/接口/规范/手册） |

下方补充信息（按需展示，无则不显）：

| 信息块 | 来源 |
|:------|:-----|
| 用户画像 | `docs/product-overview.md` |
| 关键术语 | `docs/product-overview.md` |
| Sprint 路线图 | `sprints/` |
| adr 决策列表 | `adrs/` |
| 技术栈 | `docs/non-functional-reqs.md` |
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
Dev 把 sp-NNN 的 docs/（冲刺文档）→ 拖到新的 AI 对话中（干净上下文）
  ↓
Dev 给 4 个方向：
  ① 本次迭代拆几个 spec？每个 spec 的边界
  ② 是否需要新 adr
  ③ 跨 spec 依赖
  ④ 核心函数/API/表名
  ↓
AI 在干净上下文中写 specs 四文件
  ↓
PM + Dev 评审
```

### 📐 规格拆分原则（核心）

> **为什么一次冲刺要拆多个规格？** 把一次开发任务**解耦、拆解、尽量相互独立**，以便**并行开发且互不干扰**——前端和后端分离成多个规格项、不同服务分成不同规格项。多个 spec 共同促成一次迭代的所有开发任务（必然包含前端、后端或其他服务）。

| 原则 | 说明 |
|:----|:----|
| ✅ 解耦 | 能独立开发/独立验收的边界才拆（前端/后端、不同服务、不同领域） |
| ✅ 提升 token 利用率减少幻觉 | spec 上下文要小到 AI 能完整理解；过大 → 幻觉增多 |
| ❌ 不刻意多拆 | 没有独立边界不硬拆；拆太多 → 管理成本上升 |
| 上限 | 「解耦 + token 利用率」 |
| 下限 | 「方便管理」 |

### Specs 目录层级（v3.0）

每个冲刺容器内有 `specs/` 规格库，内含 `_template/`（四文件模板）+ 每个规格一个"编号+描述"独立目录：

```
sprints/sp-001-核心交易/specs/
├── _template/                  # 规格模板（cp 建新规格）
│   ├── requirements.md
│   ├── plan.md
│   ├── tasks.md
│   └── check.md
└── spec-001-前端收银台/        # 具体规格（编号+描述）
    ├── requirements.md
    └── ...
```

新建规格 = `cp -r specs/_template specs/spec-{XXX}_{规格名}`，编号 `spec-{三位数}` 在冲刺内递增，描述下划线连接（与 `sp-001-功能名` 同款机制）。

> ⚠️ **详细结构、命名规则、变更检查清单、版本差异见 `references/specs-directory-hierarchy.md`**。改模板结构前先读，并向用户梳理层级确认后再动手。

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
