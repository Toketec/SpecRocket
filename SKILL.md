---
name: spec-rocket
description: "斜杠命令 /spec-rocket — 规格驱动开发（SDD）框架。子命令：init, brainstorm, migrate, preview, update。"
license: MIT
metadata:
  version: "4.1.0"
---

# `/spec-rocket` — SpecRocket 项目引导命令

> SpecRocket 的 AI 协作指南。任何 AI 编码代理（Claude Code、Cursor、Cline、Windsurf、Codex、Hermes Agent 等）均可按本文档指引执行 `/spec-rocket` 命令。
>
> 安装方式：克隆本仓库 → AI 读取 `SKILL.md`（或将本文档内容注入为系统提示词）。

## 仓库结构

```
SpecRocket/                      ← 本仓库
├── AGENTS.md                   ← 本仓库通用 AI 协作入口
├── CLAUDE.md                   ← Claude Code 入口（引用 AGENTS.md）
├── SKILL.md                    ← 标准 skill 文件（AI 斜杠命令）
├── spec-rocket                 ← CLI 脚本（init / update / migrate）
├── init.sh                     ← 手动 init 脚本（无 AI 时用）
├── ssot-convention.zh.md   ← 完整 SSOT 规范手册（仅主仓库，不进入项目模板）
├── SSOT-开发方法论-培训.pptx ← 培训 PPT（仅主仓库）
├── template/               ← 项目模板框架（init/migrate 复制此目录）
│   ├── AGENTS.md               ← AI 协作规则
│   ├── CLAUDE.md               ← Claude Code 入口（引用 AGENTS.md）
│   ├── docs/                   ← 稳定层产品文档模板（含 whitepaper.md）
│   ├── sprints/_template/      ← 迭代容器模板（docs/ 产品设计 + specs/ 技术规格）
│   ├── architecture/           ← 当前架构 3 文件 + adrs/ 单文件决策历史（无 README）
│   ├── assets/                 ← 运营资产模板（configs/interfaces/standards/manuals）
│   ├── apps/businesses/tools/  ← 纯代码域模板（直接放框架项目，无 specs/）
│   └── ...
├── README.md                   ← 项目介绍
├── LICENSE                     ← MIT License
```

## SSOT 维护边界

- 产品、当前架构、冲刺、计划和需求文档只描述当前有效的设计、约束与实现，不维护“最近变更”“最后更新”、修订历史或文档生命周期状态；历史由 Git 提供。`architecture/adrs/` 是唯一的架构决策历史例外。
- 项目整体的粗粒度功能进度只维护在根目录 `README.md`，不描述实现细节。
- 规格中的 `tasks.md` 与 `check.md` 必须维护任务、自检和人工验收状态，这是规格执行闭环的一部分。
- 业务实体状态、UI 状态机和兼容性版本要求属于设计事实，不属于项目进度状态，应在对应设计中正常维护。
- `assets/interfaces/` 中的公共契约属于代码实现的一部分，每个接口只保留一份当前有效的权威定义，并与实现同步修改；不按日期或修订号复制历史契约。
- 如果系统同时支持多个协议版本，在同一份当前契约中描述实际仍受支持的版本，历史差异由 Git 提供。
- Step 2 必须根据项目事实识别跨服务、进程、语言、独立部署、外部调用、消息/文件或多消费方边界。没有共享边界时不创建公共契约；存在共享边界时，Step 3 前必须明确生产方、消费方、权威契约和兼容策略。
- 契约语义由生产方 Dev 维护，消费方参与评审；变更时同步生产方、消费方、Mock/生成物、兼容策略与负责实现的 spec，破坏性变更回到 Step 2/3。
- `architecture/data-model.md` 维护当前数据语义、归属、生命周期和不变量；数据库所属服务内的 migration/schema 维护表、字段、索引与约束的可执行事实。
- 契约检查/生成/Mock 和数据模型检查/可视化工具由用户决定是否建设；建设时作为 `tools/` 中的普通产品能力，通过独立 spec 评审、实现和验收，不由 SpecRocket 默认生成。

## 斜杠命令

全部命令在 AI 对话中以 `/spec-rocket` 开头：

| 命令 | 用途 |
|:----|:------|
| `init [项目名]` | 从 template/ 目录复制骨架。无参=当前目录，有参=新建项目目录 |
| `brainstorm` | 引导用户描述产品 → 自动生成产品文档 + 创建 sprint |
| `migrate` | 项目重构：介入 → 理解 → 保持 → 重构（不区分是否 SpecRocket 项目，保持原有设计不变，重构到最新模板结构，零残留） |
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
| **Hermes Agent** | `~/.hermes/skills/spec-rocket/` | 复制最新 `SKILL.md` |
| **spec-rocket-light**（若安装） | `~/.hermes/skills/spec-rocket-light/` | 同步 light 版 SKILL.md |
| **Codex** | 项目级 `AGENTS.md`（全局 `~/.codex/AGENTS.md` 谨慎） | 检测到全局含 SpecRocket 内容 → 提示手动同步；推荐项目级由 init/migrate 注入 |
| **Claude Code** | 项目级 `AGENTS.md` + `CLAUDE.md` 引用入口 | 无需全局更新；项目升级用 `/spec-rocket migrate` |
| **Cursor** | 项目级 `.cursor/rules/` 或 `.cursorrules` | 同上 |
| **Windsurf** | 项目级 `.windsurf/rules/` | 同上 |
| **Cline** | 项目级 `AGENTS.md` | 同上 |

> **核心原则**：SpecRocket 是纯文件约定。`AGENTS.md` 是项目通用协作入口，`CLAUDE.md` 仅保留 Claude 专属内容并引用 `AGENTS.md`。`update` 保证「本地源」最新（仓库 git pull + 有全局 skill 概念的工具同步），项目级规则文件随各项目执行 `migrate` 更新。

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
| 3️⃣ | `docs/visual-design.md` | 全局审美边界（颜色/大小/设计语言/风格/动效），**禁业务设计** |
| 4️⃣ | `docs/whitepaper.md` | 白皮书（愿景/价值/商机，**质量门槛**） |
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
2. **阶段①** — 写 product-overview.md：依次提问

   | # | 问题 | 写入哪里 |
   |:--|:-----|:---------|
   | 1 | 一句话描述这个产品？ | 标题 + 一句话 |
   | 2 | 目标用户是谁？（角色+一句话） | 用户画像表格 |
   | 3 | 最核心的场景是什么？ | 核心场景章节 |
   | 4 | 涉及哪些关键术语？ | 术语表 |

3. **阶段②** — 写 non-functional-reqs.md：判断项目是否需要性能/安全/合规基线
   - 有 → 按模板填写关键指标
   - 无 → 写入占位行
4. **阶段③** — 写 visual-design.md：判断项目是否有前端界面
   - 有 UI → 根据产品类型选策略（完整设计系统 / UI框架定制 / 纯框架默认）；**只定义审美边界（颜色/字体/间距/动效/组件视觉属性），禁止写具体页面/布局/内容/线框**（这些进 sprint 的 `prototypes/prototypes.md`）
   - 纯后端/脚本/CLI → 写入占位行
5. **阶段④** — 写 whitepaper.md：判断是否有对外白皮书需求
   - 对外产品 → **按质量门槛写完整**：全盘视野、无版本关联、产品专家+商业精英双视角、痛点→收益→商机、低认知门槛
   - 内部工具 → 写入占位行
6. **阶段⑤** — 创建 sp-001：一个问题引导

   | # | 问题 | 写入哪里 |
   |:--|:-----|:---------|
   | 5 | 第一个版本最想做什么功能？ | 创建 `sprints/sp-001_功能名/` 从 _template |

7. 展示全部 5 组文件给用户确认
8. 问："还要补充什么？直接告诉我改哪里"

---

## `/spec-rocket migrate` — 项目重构（介入 → 理解 → 保持 → 重构）

**用途：** **不区分项目是否 SpecRocket 基础**——直接介入任何项目，理解项目现状，在**保持原有设计不变**的前提下，重构到最新模板结构，零残留。

### 统一流程（五步）

```
① 介入   CLI 扫描项目结构（旧结构/游离内容/骨架缺失 → 生成报告）
② 理解   AI 读项目并建立架构证据矩阵：每份旧 ADR/架构资料都要判定当前有效、纯历史或混合
③ 保持   原有设计不变：旧架构、规格阶段事实与业务设计完整保留，无法自动判断的内容先进入 .legacy
④ 重构   补齐最新骨架 + 把全部当前有效事实收敛进三份架构总览 + 补齐旧规格阶段语义
⑤ 验收   通过架构独立阅读门禁和零残留检查 → 删除报告与 .legacy → 完成
```

**第 1 步：介入（脚本执行）**
```bash
./spec-rocket migrate [项目路径]     # 默认当前目录
```
脚本扫描并处理结构层：
- **迁移 sprint 容器**：`docs/sprints/sprint-NNN_xxx/` → `sprints/sp-NNN-xxx/docs/`（重命名 + 改路径；检测旧版文件 `ux-flows.md` / `ui-wireframes.md` / `user-journey-flows.md` 报告由 AI 转移）
- **迁移模块规格**：`{apps|businesses|tools}/*/specs/SPEC-{APP|BIZ|TOOL}-NNN_xxx/` → 按 spec 头部「基于冲刺」字段归入 `sprints/sp-NNN-xxx/specs/spec-NNN-xxx/`（脚本报告，AI 执行内容转移 + 重新编号）
- **迁移历代架构结构**：`ADR/ADR-NNN_xxx.md` → `architecture/adrs/adr-YYYYMMDD-xxx.md`；3.x `adrs/adr-*/` 三文件目录 → `architecture/adrs/adr-*.legacy/`，完整保留后由 AI 提炼为单文件 ADR，并把当前有效结果收敛进 `architecture/*.md`
- **扫描旧规格阶段语义**：已有 `requirements.md` 缺少“架构落地边界”时只报告，不由脚本猜测；AI 结合代码、上下游规格和验收记录补齐架构基线、进入状态、实现程度、退出状态、临时实现与收口责任
- **清理废弃目录**：`sprint-000_initial/`（纯模板直接删；含内容转 `.legacy` 待转移）；根目录 `ssot-convention*.md` 归档到 `archive/`
- **处理遗留 LICENSE**：模板默认证书（MIT + Toketec 署名）→ 归档；自定义证书 → 保留
- **扫描 visual-design 混入业务设计**：检测 `docs/visual-design.md` 中疑似业务形态（页面/布局/内容/线框关键词）→ 报告 AI 转移到 `sprints/*/docs/prototypes/prototypes.md`，visual-design.md 只留审美边界
- **扫描游离文档**：docs/ 全递归（排除 sprints/）+ 根目录非白名单内容 → 报告收敛
- **扫描根目录非规范项** → 报告转移收敛到 assets/ 对应子目录
- 生成 `MIGRATION-REPORT.md`

**第 2 步：理解（AI 执行）**

AI 在动手前先读项目——**理解是保持的前提，不知道原有设计就无法在重构中保留它**：

| 读什么 | 理解什么 |
|:------|:--------|
| `README.md` + 根目录文件 | 项目是什么、主语言、构建工具 |
| 源码目录结构 | 模块划分、领域边界 |
| 现有文档（docs/ 等） | 已有产品/业务设计意图 |
| 关键配置（package.json / Cargo.toml 等） | 技术栈 |
| 现有部署配置、服务编排与旧 ADR | 当前运行依赖、架构不变量和历史决策；逐项登记到迁移报告的架构证据矩阵 |
| 公共接口、外部端口及其生产方与消费方 | 是否存在跨服务、进程、语言、独立部署、外部调用、消息/文件或多消费方边界；当前以哪份定义为准 |
| 数据库 schema/migration 与持久化代码 | 是否存在持久化、数据归属服务、当前可执行基线及其与领域语义的映射 |

理解阶段必须先完成分类，禁止先写一份概括性总览再删除旧材料：

- **当前有效**：仍约束现有代码、数据或部署的事实，必须完整写入 `architecture/*.md`；ADR 只保留其决策原因。
- **纯历史**：已经被替代且不再约束现状，只保留在 ADR，并明确替代关系。
- **混合**：同一来源同时含当前事实与历史原因；先把当前事实逐条收敛到三份架构文档，再提炼 ADR。
- 代码、数据迁移和部署配置与旧 ADR 冲突时，以可验证的当前实现为准，并在矩阵中记录冲突与结论；不得静默选择。
- 对每个协作边界逐项判断：没有共享边界时明确标记“不适用”，不为了形式完整制造公共契约；存在共享边界时，在 Step 3 前识别生产方、消费方、当前权威定义和兼容策略。缺失或无法判定时必须作为迁移阻断项，不得把目录存在当成契约有效。

**第 3 步：保持（AI 执行，按迁移映射表）**

原有设计全部保留——内容转移不丢失、业务设计归位：

| 旧文件 | 内容去向 |
|:-------|:---------|
| `ux-flows.md` | 旅程部分 → `sprints/sp-NNN-*/docs/user-scenarios.md`；流程部分 → `business-flows.md` |
| `ui-wireframes.md` | 布局/交互 → `docs/prototypes/prototypes.md` + `prototype.html`；系统图表 → `uml-pack.md` |
| `user-journey-flows.md` | 旅程总览 → `user-scenarios.md`；流程图 → `business-flows.md` |
| `visual-design.md` 混入的业务设计（页面/布局/内容/线框） | → `sprints/sp-NNN-*/docs/prototypes/prototypes.md`（无对应冲刺 → 最近冲刺或 archive/）；visual-design.md 只留审美边界 |
| `docs/sprints/sprint-NNN_xxx/` 其余文档 | → `sprints/sp-NNN-xxx/docs/` 对应文件 |
| `{apps\|businesses\|tools}/*/specs/SPEC-{APP\|BIZ\|TOOL}-NNN_xxx/` | → 归属冲刺的 `sprints/sp-NNN-xxx/specs/spec-NNN-xxx/`（四文件；重新编号；头部改写覆盖范围） |
| `ADR/ADR-NNN_xxx.md` | → `architecture/adrs/adr-YYYYMMDD-xxx.md`，补齐背景/决策/影响/生效规格；当前有效结果写入 `architecture/*.md` |
| `adrs/adr-*/` 三文件目录 | → `architecture/adrs/adr-*.legacy/` 完整保留；AI 提炼单文件 ADR、收敛当前架构，确认无遗漏后删除 `.legacy/` |
| 旧 spec `requirements.md` | 原位补齐架构基线、进入/退出状态、实现程度、临时实现与收口责任；已完成规格只补事实，不改写历史交付边界 |
| 全局 `spec/` + `_catalog.yaml` | 内容归入对应冲刺 specs/ 或 archive/（AI 判断） |
| `sprint-000_initial.legacy/` | 基线设计转移至 `sp-001-*/docs/` 后删除 |

**第 4 步：重构（脚本 + AI）**

- **补齐新骨架**（只添加不存在的文件，不覆盖已有业务内容）：`AGENTS.md`、`.gitignore`、`docs/*`、`architecture/{architecture,data-model,runtime}.md`、`architecture/adrs/_template.md`、最新版 `sprints/_template/`、`apps|businesses|tools/` `.gitkeep`、`assets/`
- **收敛当前架构**：结合代码、数据迁移、部署配置和旧 ADR，填写三份当前文档并删除模板占位。三份文档必须共同构成当前架构 SSOT，而不是 ADR 索引、执行摘要或链接集合：
  - `architecture.md` 覆盖系统责任边界、模块拓扑与依赖方向、主要业务/技术链路、跨模块约束和安全边界；
  - `data-model.md` 覆盖领域聚合、事实源与所有权、可变/不可变分层、关系和状态生命周期、一致性/并发/审计与数据演进；
  - `runtime.md` 覆盖运行单元与故障域、中间件和外部服务、同步/异步拓扑、支持的部署形态、配置/密钥、健康检查、重试/幂等/背压、可用性、观测、扩缩容与恢复。
- **完成架构证据矩阵**：对迁移报告列出的每份旧 ADR、旧架构目录和关键实现证据，填写“当前性、目标章节、处理结论”。标为当前有效或混合的条目必须映射到 `architecture/*.md` 的具体章节，不能只指回 ADR。
- **完成协作边界与契约重建矩阵**：没有共享边界时记录“不适用”；已有共享边界时，把生产方、消费方、当前权威契约、兼容策略、Mock/生成物同步方式、验证方式和负责 spec 逐项写清。已有契约收敛到 `assets/interfaces/` 的唯一当前定义；共享边界缺失契约或权威定义冲突时，先作为阻断项提出正常 spec，不由 migrate 顺手补实现。
- **重建数据基线**：没有持久化时记录“不适用”；存在持久化时，确认数据库所属服务及其 migration/schema 是字段、索引和约束的可执行事实，并在 `architecture/data-model.md` 写清数据语义、归属、生命周期和不变量，不在两处复制字段全集。
- **工具由用户决定**：契约/模型检查、生成、Mock 或可视化工具不是 migrate 默认产物。AI 说明价值、成本和适用边界；用户选择建设后，在 `tools/` 中另建正常 spec 推进，拒绝建设不影响迁移完成。
- **控制重复**：当前架构可以引用 SQL、公共契约和配置作为精确定义，但必须在正文写清它们代表的领域含义、约束和运行行为；无需复制字段全集、接口全文或操作步骤。
- **升级规则入口和规格模板**：保留项目专属 AGENTS 规则后合并最新架构/阶段规格规则；旧 `_template` 不同则先保留为 `.legacy-v3`，安装最新版后由 AI 核对清理
- **已有 sprint 补齐**：`prototypes/prototypes.md` 缺失时从模板复制（UI 设计文档）
- **收敛游离文档**：按映射表归入对应 sprint docs/ 或 assets/ 或 archive/

**第 5 步：验收（AI 执行）**
- **独立阅读门禁**：假设读者不能打开 `architecture/adrs/`，仅凭三份当前架构文档，应能回答“系统负责什么、模块如何协作、核心数据如何流转和演进、系统如何部署运行、失败后如何恢复”。任一问题仍需翻 ADR 才能回答，迁移不得完成。
- **覆盖门禁**：迁移报告中的架构证据矩阵必须逐项填写；所有“当前有效/混合”来源都映射到三份架构文档的具体章节，所有“纯历史”来源都说明已失效或被哪个决策替代。
- **事实门禁**：抽查每份当前架构文档与代码、数据迁移、部署配置的一致性；ADR 可作为来源追溯，但禁止成为任何当前有效规则的唯一载体。
- **契约门禁**：所有协作边界均已分类；没有共享边界的明确为“不适用”，共享边界均已记录生产方、消费方、当前权威契约、兼容策略和负责 spec。共享边界仍缺契约或存在多个权威定义时，迁移不得完成。
- **数据门禁**：没有持久化的明确为“不适用”；存在持久化的已确认数据归属、可执行 schema/migration 与 `architecture/data-model.md` 的语义映射。
- **工具非门禁**：用户未选择建设契约或模型辅助工具，不构成迁移阻断；一旦选择建设，则按其独立 spec 验收，不混入 migrate 的结构重构。
- **结构门禁**：确认所有 `.legacy` 内容已转移、当前架构无模板占位、旧规格阶段语义已补齐、没有新的重复事实源。
- 上述门禁全部通过后，才删除 `.legacy` 和 `MIGRATION-REPORT.md`；最终报告应列出三份当前架构的主要章节、协作边界结论和仍保留为纯历史的 ADR 数量。
- 更新 AGENTS.md 目录结构描述（如有手动改动）
- **最终目录结构完全符合最新规范，零残留**

> **重构原则**：转移 → 收敛 → 保留 → 删除。旧文档/冲刺/规格优先尽量对原始内容做转移；不方便转移的做收敛；不方便收敛的尽量保留信息不丢失；最后删除。

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
| 🗺️ **架构地图** | `architecture/*.md` + `apps/` `businesses/` `tools/` + `sprints/*/specs/` + `assets/` | 当前模块/数据/运行依赖 + 迭代规格分布 + 运营资产 |
下方补充信息（按需展示，无则不显）：

| 信息块 | 来源 |
|:------|:-----|
| 用户画像 | `docs/product-overview.md` |
| 关键术语 | `docs/product-overview.md` |
| Sprint 路线图 | `sprints/` |
| ADR 决策历史 | `architecture/adrs/`（仅列单文件历史决策，不代替当前架构） |
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
  ② 是否改变架构不变量（是 → 新增单文件 ADR，并同步当前架构）
  ③ spec 的有向依赖、稳定契约与最终收口责任
  ④ 每个 spec 的进入状态、实现程度、退出状态和核心函数/API/表名
  ↓
AI 在干净上下文中写 specs 四文件
  ↓
PM + Dev 评审
```

### 协作边界与契约

- AI 先检查生产方与消费方是否能够独立开发、部署或变更，以及是否存在网络、消息、文件、SDK 或外部系统对接。
- 无共享边界时，内部类型和调用由代码与当前 spec 管理；存在共享边界时，把字段、协议、错误与兼容要求收敛到 `assets/interfaces/` 的唯一当前契约，Context Contract 只作为下游 spec 执行摘要。
- 契约或数据模型变更必须进入负责实现的 spec；破坏性变更重新评审。辅助检查、生成、Mock 或可视化工具只由 Agent 建议，用户决定是否建设；选择建设时在 `tools/` 中另建正常 spec，不在写规格时直接实现。

### 📐 规格编写原则（核心）

> **总纲**: 规格在原则上是**人的实现切片划分**——它描述当前架构在这个小迭代中被实现到什么程度。spec 边界受人监督，AI 是主要执笔者。规格不是新的系统架构，也不要求每个 spec 自己形成完整业务闭环。

> **为什么一次冲刺要拆多个规格？** 把大模块切成可执行、可验收、可组合的实现切片。优先降低耦合，但允许无法消除的显式有向依赖；关键不是假装零依赖，而是冻结契约、限定阶段差异并明确由谁收口。

#### A. 拆分治理（怎么拆）

| 原则 | 说明 |
|:----|:----|
| ① 人为规格划分 | spec 边界**由人主导、受人监督**，匹配团队工作步骤；**AI 可提议拆分方案，不得擅自定稿**——扩拆/改边界/跨隔离一律回到人确认 |
| ② 规格边界与阶段语义 | 每个 spec 只处理一项可执行任务，写清当前架构基线、进入状态、本规格实现程度和退出状态；依赖按 Context Contract 显式有向表达 |
| ✅ 解耦 | 能独立开发/独立验收的边界才拆（前端/后端、不同服务、不同领域）——解耦=能并行互不干扰；②隔离=变更失败不扩散，两者互补 |
| ✅ 可复原 | 假设删除实现代码，任一 Agent 按 sprint/spec 依赖顺序执行，应能等价复原各阶段功能、业务逻辑、数据行为和产品外观；不要求源码字节一致 |
| ✅ 临时实现可收口 | Mock、适配器、占位字段必须与正式实现共用契约，并在规格内指定替换它的后续 spec；禁止无主 TODO |
| ✅ 提升 token 利用率减少幻觉 | spec 上下文要小到 AI 能完整理解；过大 → 幻觉增多 |
| ❌ 不刻意多拆 | 没有独立边界不硬拆；拆太多 → 管理成本上升 |
| 上限 | 「解耦 + token 利用率」 |
| 下限 | 「方便管理」 |

#### B. 执行顺序（拆完怎么排）

| 原则 | 说明 |
|:----|:----|
| ③ 依赖前置 | 数据模型、中间件、公共契约和其他被依赖能力优先；若为了可见性先做前端，必须先冻结 Mock 与正式服务共用的契约 |
| ④ 按收口路径排序 | `plan.md` 的顺序应从进入状态稳定推进到退出状态，后续 spec 能沿契约替换临时实现，不依赖原作者口头知识 |

### Specs 目录层级（v4.0）

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

新建规格 = `cp -r specs/_template specs/spec-{XXX}-{规格名}`，编号 `spec-{三位数}` 在冲刺内递增，描述使用短横线。

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
→ AI：重构现有项目（介入 → 理解 → 保持原有设计 → 重构到最新标准）
→ 或：/spec-rocket brainstorm
→ AI：引导描述产品 → 生成文档
```
