# {项目名} — AGENTS.md

> **AI 协作入口** — 本文档定义了完整的 SSOT 规格驱动开发流程，AI 在协作时必须遵守。

---

## 一、核心原则

**SSOT（Single Source of Truth）** 核心理念：

> 每个决策都有唯一出处，每个实现都有规格可循。

| # | 维度 | 传统开发 | SSOT |
|:-:|:----|:--------|:-----|
| 1 | **输入** | 口头需求 / PRD 文档 | `docs/sprints/` 完整产品设计 |
| 2 | **决策** | 群聊/会议口头决定 | `ADR/` 架构决策记录，永久可查 |
| 3 | **编码** | Dev 手写 → 凭记忆改 | AI 按 `specs/` 四文件执行 |
| 4 | **评审** | 代码 review | 先评 spec → 再验代码 |
| 5 | **AI 协作** | 一问一答，上下文反复丢失 | 五步流程，AI 有完整上下文 |
| 6 | **知识沉淀** | 代码里翻 | `docs/` + `ADR/` + `specs/` 明文化 |

---

## 二、角色识别（AI 接到任务时先做此步）

**SSOT 五步流程定义了 3 种角色，AI 收到任何请求时先判断「当前任务属于哪个角色」。**

| 角色 | 产出目录 | 判断依据 | 典型请求 |
|:----|:--------|:--------|:--------|
| 👤 **PM** | `docs/` | 涉及"功能是什么"、"业务流程"、"用户谁"、"长什么样" | 写产品文档、更新功能描述、设计原型、排版本计划 |
| 🔧 **Dev** | `ADR/` + `apps/`/`businesses/`/`tools/` 下的 `specs/` + 代码 | 涉及"怎么实现"、"架构方案"、"接口"、"数据库" | 写技术方案、编码、修 bug、加 API |
| 👥 **评审** | 无文件产出 | PM + Dev 一起看方案 | 方案评审、验收 |

> **角色识别规则**：
> - 一条请求只属于一个角色。如果混合了 PM + Dev 的需求，先完成 PM 部分，再切到 Dev 角色。
> - PM 角色的文档编辑**始终遵循下方「编辑顺序」**，无论来自 brainstorm 还是用户直接要求修改。

### 📋 编辑顺序（PM 角色必须遵守，不跳序）

当角色识别为 PM（涉及 `docs/` 修改时），按以下顺序编辑，每步完成后再进入下一步：

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `product-overview.md` | 全局锚点，先定义产品是什么 |
| 2️⃣ | `non-functional-reqs.md` | 技术约束基线（性能/安全/合规），可能为空置占位 |
| 3️⃣ | `visual-design.md` | 视觉方向（或明确无 UI），可能为空置占位 |
| 4️⃣ | `sprints/sprint-NNN/` | 版本迭代设计，依赖前三项的全局决策 |

> 极简项目（纯脚本/CLI/无 UI）时，2️⃣ 和 3️⃣ 写入一行占位说明「为什么不需要」，不可跳过文件。

---

## 三、五步开发流程

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1 │ PM 独作 — 产品设计阶段                                │
│         │ 产出: docs/ + docs/sprints/ + prototypes/            │
│         │ AI 角色: 协助润色、画 ASCII 图、生成原型模板          │
├─────────────────────────────────────────────────────────────────┤
│ Step 2 │ Dev+AI 独作 — 架构设计与规格编写                      │
│         │ 输入: docs/sprints/ 的功能描述                        │
│         │ 产出: ADR/ + {apps\|biz\|tools}/*/specs/             │
│         │ Dev 给方向(10min) → AI 写完整四文件                    │
├─────────────────────────────────────────────────────────────────┤
│ Step 3 │ PM + Dev 共同 — 方案评审                              │
│         │ PM 审: "spec 的方案能满足业务需求吗?"                 │
│         │ TL 审: "方案架构合理、边界清晰吗?"                     │
│         │ → 通过 或 打回 Step 2                                │
├─────────────────────────────────────────────────────────────────┤
│ Step 4 │ AI 按 spec 执行 — 编码                               │
│         │ 输入: requirements.md + plan.md                       │
│         │ AI 生成代码 → 更新 tasks.md                           │
│         │ 自检: typecheck + build + curl                        │
├─────────────────────────────────────────────────────────────────┤
│ Step 5 │ Dev 收尾 — 验收                                      │
│         │ 修复 AI 遗留的小 bug                                  │
│         │ 集成测试、回归检查                                     │
│         │ QA 跑 check.md → 签收                                │
└─────────────────────────────────────────────────────────────────┘
```

> **关键设计**: 5 个步骤中 PM 和 Dev 只做 2 件真人决策的事（Step 1 产品设计、Step 3 评审），其余由 AI 执行。

---

## 四、各 Step 详细说明

### 4.1 Step 1 — PM 独作（AI 辅助）

**谁来干**: PM（产品经理），AI 可协作但不决策

**AI 能力边界**:

| 可以做的 | 不可以做的 |
|:--------|:----------|
| 润色产品文档文案 | ❌ 决定业务流程 |
| 画 Mermaid 流程图（环境不支持时用 ASCII） | ❌ 定义验收条件 |
| 生成 HTML 原型模板 | ❌ 写技术方案 |
| 检查 sprint 文档的完整性 | |

**PM 交付物清单**（docs/ 根目录文件必须存在，详见下方「编辑顺序」和「占位规则」）:

| 文件 | 必需度 | 说明 |
|:----|:-----:|:-----|
| `product-overview.md` | ⭐⭐⭐ | 用户画像、核心场景、术语表。所有后续文档的锚点 |
| `non-functional-reqs.md` | ⭐⭐⭐ | **必须存在**，无要求也要写一行占位。性能/SLA/安全/合规基线 |
| `visual-design.md` | ⭐⭐⭐ | **必须存在**，无 UI 也要写一行占位。设计系统 token / UI 框架选型 |
| `functional-overview.md` | ⭐⭐ | 5+ 功能点的项目建议写。全局功能索引+版本路线图 |
| `user-scenarios.md` | ⭐⭐⭐ | 核心流程的用例清单。Dev 理解业务的基础 |
| `user-journey-flows.md` | ⭐⭐⭐ | 用户旅程总览 + 核心流程图（泳道/时序/状态）。**业务闭环一眼可见**，Dev 理解流程的关键 |
| `uml-pack.md` | ⭐⭐ | 软件工程图表包（用例/ER/类图/C4）。**按需最小化绘制**，极简项目可一行占位 |
| `prototypes/*.html` | ⭐⭐ | 客户端项目建议做，纯 HTML，可点击交互。**承担页面布局+交互展示**（原 ui-wireframes 职责） |
| `sprints/sprint-NNN/*.md` | ⭐⭐⭐ | 每次冲刺的功能描述（含业务验收条件） |

> ⚠️ **重要**：`non-functional-reqs.md` 和 `visual-design.md` 的必需度已从 ⭐⭐ 提升为 ⭐⭐⭐，理由：这两个文件过去常被 AI 漏写，导致技术约束和视觉方向有空白。即使项目极简（纯脚本/CLI/无 UI），也至少写入一行占位说明为什么不需要。

### 📋 编辑顺序（必须遵守，不跳序）

Step 1 中文档按以下顺序编辑，每步完成后再进入下一步：

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `product-overview.md` | 全局锚点，先定义产品是什么 |
| 2️⃣ | `non-functional-reqs.md` | 技术约束基线（性能/安全/合规），影响技术选型 |
| 3️⃣ | `visual-design.md` | 视觉方向（或明确无 UI），影响前端框架选型 |
| 4️⃣ | `sprints/sprint-NNN/` | 版本迭代设计，依赖前三项的全局决策 |

> 例如：一个纯脚本工具 → 1️⃣产品概览 → 2️⃣"无特殊非功能需求要求"占位 → 3️⃣"无前端界面，不涉及视觉设计"占位 → 4️⃣sprint。

### 📌 占位规则

> `docs/` 根目录下的每个文件在 Step 1 结束时**必须存在并有内容**。如果项目极简导致某文件无实质可写，必须写一行占位说明「为什么不需要」。

| 文件 | 占位示例 |
|:----|:--------|
| `non-functional-reqs.md` | `本项目为无用户交互的脚本工具，无特殊非功能需求要求。` |
| `visual-design.md` | `本项目无前端界面（纯后端/脚本/CLI），不涉及视觉设计。` |

> 占位原则：说清楚**为什么不需要**，不留"可能是忘了"的疑问。

**进入 Step 2 的条件**: 至少 `product-overview.md` + `user-scenarios.md` + `sprints/sprint-NNN/SPRINT-features.md` 就位并经过 TL 技术可行性评审。

### 4.2 Step 2 — Dev+AI 独作（AI 主力）

**谁来干**: Dev 给方向（4 件事，10 分钟），AI 写产出

**Dev 的职责**:

| 决策 | 示例 |
|:----|:-----|
| 这个功能属于哪个模块 | `apps/web`? `businesses/order-service`? |
| 需要新 ADR 吗 | 新增服务、改数据模型、引入新技术栈 → 写 ADR |
| 跨模块依赖 | 需要对接哪个上游服务？接口是什么？ |
| spec 关键字 | 核心函数名、API 路径、数据表名 |

**AI 的职责**（基于 Dev 的方向自动完成）:

| 产出 | 内容 |
|:----|:-----|
| `ADR/*.md` | 架构设计文档（系统上下文、数据模型、流程） |
| `requirements.md` | 技术方案 + 架构 + 边界 + 验收条件 |
| `plan.md` | 实现步骤 + 文件清单 |
| `tasks.md` | 任务拆分 + 验证清单 |
| `check.md` | AI 自检 + 人工验收 |

> **Step 2 的产出物必须包含架构设计和技术方案**，不只是一堆空模板。AI 应该写出可供评审的完整方案。

### 4.3 Step 3 — PM + Dev 共同评审（AI 不参与）

**这是唯一必须真人碰面的节点**。评审两件事：

| 谁审 | 审什么 | 通过标准 |
|:----|:------|:--------|
| PM | spec 的技术方案能否解决 sprint 里的业务需求 | "我看懂了，能解决问题" |
| TL | 架构是否合理、边界是否清晰、有没有遗漏 | "方案可行，没有重大隐患" |

> **规范质量检验**: PM 不需要懂技术实现，但要能理解"这个方案为什么能解决我的需求"。如果 PM 说看不懂 → 说明 Step 2 的 spec 没写好，需要打回。

**评审结论**:
- ✅ **通过** → 进入 Step 4（AI 编码）
- 🔁 **需修改** → 打回 Step 2，Dev+AI 修改后重新评审

### 4.4 Step 4 — AI 按 spec 执行（AI 编码）

```
读 requirements.md → 理解方案
按 plan.md 逐文件实现
每步更新 tasks.md 状态
完成 → typecheck + build + curl 自检
展示改动 → 等确认 → 提交
```

**AI 执行原则**:

1. 严格遵守 spec 实现，不擅自改方案
2. 实现中暴露预期外的设计问题 → 停在当前文件，打回 Step 2/3，不边写边改
3. 跨模块依赖不确定时 → 只实现接口调用层（mock 返回），标注 TODO
4. 每个 task 实现的标记要做 curl 或 typecheck 验证才标记 ✅
5. 所有改动作 `git diff` 展示给用户确认后，再由用户提交

### 4.5 Step 5 — Dev 收尾验收（AI 辅助修 bug）

Dev 发现边界 bug → AI 推荐修复 → Dev 确认。

**Dev 职责**:
- 修复 AI 编码后遗留的小 bug
- 集成测试、回归检查
- QA 按 `check.md` 逐项跑验收 → 签收

### 4.6 常见问题

| 问题 | 回答 |
|:----|:-----|
| Step 1 写到什么程度才能进 Step 2？ | 至少产品概览 + 用户场景 + 冲刺功能描述就位，TL 评审过技术可行性 |
| Step 2 的 spec 要写多详细？ | 必须包含架构方案和边界，不能是空模板。AI 写出可供人工评审的完整方案 |
| Step 3 评审通不过怎么办？ | PM 看不懂 → 规范没写清楚；TL 不通过 → 架构有隐患。打回 Step 2 修改 |
| Step 4 AI 发现 spec 有坑怎么办？ | 停，告诉 Dev，打回 Step 2/3。不能边写边改 |
| AI 已经进入 Step 4，PM 又改了需求？ | 新需求进下一个 sprint，当前 sprint 以冻结的 spec 为准 |

---

## 五、AI 执行规则

0. **角色识别优先**：收到任务后先按「角色识别」节判断属于哪个角色。PM 角色 → 文档编辑遵循编辑顺序；Dev 角色 → 按读顺序进入 specs 工作。
1. **读顺序**: AGENTS.md → ADR/（架构全景 → 快速理解系统）→ docs/sprints/（确认功能意图）→ 目标模块 specs/（实现细节）。**该顺序适用于首次进入项目或架构级改动（P0）；日常任务按规则 9 按需读取，禁止每次全量重读**
2. **不跳 step**: 没有经过 Step 3 评审的 spec，AI 不能进入 Step 4 编码
3. **不改方案**: AI 编码中发现 spec 有问题 → 停，告诉 Dev 回 Step 2/3，不能边写边改
4. **人机协作**: 所有文件 AI 都可编辑。修改后展示改动，用户确认后提交
5. **跨模块不读全量 spec**: 只读 Context Contract（≤15 行），避免上下文爆炸
6. **影响架构时更新 ADR**: 新增服务、改数据模型、换技术栈 → 同步更新或新增 ADR 文档
7. **禁止自动 git commit/push**: 先展示改动，等用户确认
8. **AI 工具无关性（Tool Independence）**:
   - SpecRocket 是纯文件约定，不依赖任何 AI 工具的特殊扫描/索引/上下文管理能力
   - AI 禁止自行探索项目目录结构来"理解项目"——必须按固定读顺序（AGENTS.md → ADR/ → docs/sprints/ → specs/）逐文件读取
   - Step 4 编码时，严格按 `plan.md` 的文件清单实现，不自动搜索或引用项目其他位置的文件
   - 跨模块引用仅通过 Context Contract（≤15 行），禁止主动遍历其他模块的 specs/
9. **按需读取（任务粒度分级，控制 token）**: 按任务规模决定读取范围，**禁止任何任务都全量重读 docs/**：
   - **P0 首次进入 / 架构级改动** → 全量读（规则 1 的标准读顺序）
   - **P1 局部功能改动** → 只读目标模块 specs/ + 受影响的 docs 文件 + 相关 ADR
   - **P2 文案 / 微小调整** → 只读目标文件本身
   - 拿不准时按低一级处理；发现信息不足再升级读取，而不是一开始就全量读
10. **增量更新（只改受影响段落）**: 修改文档/代码时**只更新受影响的部分**，禁止整篇重写或顺手"全面刷新"其他文件。文档标题下方维护一行「最近变更」记录（日期 + 改动要点），供后续任务快速判断影响面
11. **图表规范（业务闭环可视化）**: 
    - 产品设计文档至少包含 **1 个 Mermaid 流程图**（用户旅程总览或核心业务泳道图），让业务闭环一眼可见；复杂交互配时序图，有状态机配状态图
    - `uml-pack.md` 遵循**最小化数量原则**：按项目实际需要按需绘制，不追求全量；能用一个图说清就不画第二个，极简项目整文件一行占位
    - 工具环境不支持 Mermaid 渲染时，用 ASCII 图替代并标注「ASCII 备选」

---

## 六、目录角色与产出规范

### 目录结构总览

```
project-root/
├── AGENTS.md                  # ★ AI 协作入口（本文档）
├── CLAUDE.md                  # ★ AI 指令文件
├── README.md                  # 项目介绍
│
├── docs/                      # ★ 稳定层 — 全版本通用的产品规划文档
│   ├── product-overview.md    # 产品概览（用户画像、核心场景、术语表）— 变动极小
│   ├── non-functional-reqs.md # 非功能需求 — 性能/SLA/安全/合规
│   ├── visual-design.md       # 视觉设计规范
│   ├── competition-strategy.md # 竞品策略（可选）
│   └── judge-qa.md            # 评委/投资人 Q&A（可选）
│   │
│   └── sprints/               # ★ 版本层 — 每次迭代的完整产品设计容器
│       ├── _template/         # sprint 模板（创建新 sprint 时 cp）
│       │   ├── SPRINT-features.md    # 冲刺目标 + 功能清单 + 业务验收条件
│       │   ├── functional-overview.md # 本版本功能总览 + 路线图
│       │   ├── user-scenarios.md     # 本版本用户旅程 + 用例
│       │   ├── user-journey-flows.md # 用户旅程总览 + 核心流程图（必写）
│       │   ├── uml-pack.md           # UML 图表包（按需，最小化原则）
│       │   └── prototypes/           # 本版本的可交互 HTML 原型
│       │       └── prototype.html
│       │
│       ├── sprint-000_initial/  # v1.0 初始版本基线（同上 6 文件 + 原型）
│       │   └── ...
│       │
│       └── sprint-001_功能名/   # 后续版本 — 每次迭代一个完整的 sprint 容器
│           └── ...
│
├── ADR/                       # ★ 架构决策记录（全局可见，按编号顺序）
│   ├── _template/ADR.md       # ADR 模板
│   ├── ADR-001_database-choice.md  # "为什么选 PostgreSQL"
│   ├── ADR-002_auth-scheme.md      # "JWT + refresh token 方案"
│   ├── ADR-003_xxx.md              # 后续 ADR…
│   └── ...
│
├── apps/                      # ★ 前端/客户端应用（每个应用独立）
│   ├── _template/
│   │   ├── src/               # 代码目录
│   │   └── specs/             # 自己的规格
│   │       ├── requirements.md  # 技术方案 + 边界 + 验收条件
│   │       ├── plan.md          # 实现步骤 + 文件清单
│   │       ├── tasks.md         # 任务拆分 + 验证 + 审计追踪
│   │       └── check.md         # AI 自检 + 人工验收清单
│   │
│   ├── app-web/               # 具体应用 — Web 端
│   │   ├── src/
│   │   └── specs/
│   │
│   └── app-mobile/            # 具体应用 — 移动端
│       ├── src/
│       └── specs/
│
├── businesses/                # ★ 后端业务服务（按领域划分）
│   ├── _template/
│   │   ├── src/
│   │   └── specs/
│   │
│   ├── user-service/          # 用户服务
│   │   ├── src/
│   │   └── specs/
│   │
│   └── order-service/         # 订单服务
│       ├── src/
│       └── specs/
│
├── tools/                     # ★ 非大型工作流类工具/脚本
│   └── _template/
│       ├── src/
│       └── specs/
│
├── .gitignore
└── LICENSE
```

### 各目录职责

| 目录 | 类型 | 用途 |
|:----|:----|:-----|
| `docs/` | **稳定层** | 全版本通用的产品规划文档。**不动摇的设计决策放这里，每次迭代的细节放 sprint** |
| `docs/sprints/` | **版本层** | 每次迭代的完整产品设计容器。PM 在每个版本中更新功能描述、场景、流程图、图表和可交互原型。**上次版本的原型和文档作为历史记录，不覆盖** |
| `ADR/` | **架构库** | 系统上下文、数据模型、核心流程、技术选型。AI 首次进入项目时先读此目录理解全局 |
| `apps/*/specs/` | **前端规格** | Step 2/4 产出 |
| `businesses/*/specs/` | **后端规格** | Step 2/4 产出 |
| `tools/*/specs/` | **工具规格** | Step 2/4 产出 |

> **关键约束**: `docs/` 根目录不存放版本迭代型文档（如场景、流程、图表、原型）。迭代型产品文档必须随版本放入 `docs/sprints/sprint-NNN/`，一个版本一个完整的 sprint 容器。

---

## 六、Spec 四文件详解

### 6.1 为什么 specs 分散到模块内

每个模块（apps/web、businesses/user-service、tools/deploy-tool）**拥有自己的 specs/ 子目录**：

```
apps/my-app/
├── src/         # 代码
└── specs/       # 自己的规格
    ├── requirements.md
    ├── plan.md
    ├── tasks.md
    └── check.md
```

**原因**: 代码变更时附带的 spec 维护在同一个目录，不会被遗忘。跨模块通过 Context Contract（≤15 行）引用。

### 6.2 四文件模板

#### requirements.md — 技术方案 + 边界

```
# {模块名}: {功能标题}

## 技术方案
（概括架构选型 + 核心流程）

## 边界
（不做什么、不做哪些场景、不做兼容）

## 验收条件
（清单式，每条可测试）

## Context Contract
（跨模块接口定义，≤15 行）

## 数据模型
（可选，如需要新增 DB 表或 API 结构）
```

#### plan.md — 实现步骤 + 文件清单

```
# {模块名}: 实现计划

## 文件清单
- [ ] `src/fileA.ts` — 做什么
- [ ] `src/fileB.ts` — 做什么

## 实现顺序
1. 先做 X（依赖 Y）
2. 再做 Z

## 测试计划
（可选）
```

#### tasks.md — 任务拆分 + 验证

```
# {模块名}: 任务拆分

| # | 任务 | 依据文件 | 负责人 | 预估 | 状态 |
|:-:|:----|:--------|:------|:----|:----:|
| T01 | 实现 X API | plan.md | @AI | 30min | ☐ |
| T02 | 实现 Y 函数 | plan.md | @AI | 20min | ☐ |

## 跨模块依赖

## 回归测试范围
```

#### check.md — AI 自检 + 人工验收

```
# {模块名}: 验收清单

## 功能验收
| # | 检查项 | 方式 | AI 自检 | QA 验收 |
|:-:|:------|:----|:-------:|:-------:|
| 1 | API 返回 200 | curl | ✅ | ☐ |
| 2 | 边界条件处理 | 单元测试 | ✅ | ☐ |

## 代码质量
（类型检查、lint、构建通过等）

## 集成验收
（与上下游模块的联调检查项）
```

### 6.3 跨模块引用

所有 specs 共享一个 Context Contract 机制（≤15 行）：

```
## Context from Dependencies

### BIZ-001 (user-service) → 接口契约
- `POST /api/users` 创建用户，返回 `{ id, name }`
- `GET /api/users/:id` 获取用户详情
```

A 模块想确认依赖方 B 的接口格式，直接在 A 的 `requirements.md` 里写上述 Context Contract。不需要翻 B 的规格。**这种引用只读不写，下游模块不可修改上游模块的 spec。**

---

## 七、ADR — 架构决策记录

### 7.1 什么时候需要写 ADR

| 场景 | 示例 | 是否必须写 ADR |
|:----|:-----|:-------------:|
| 新增服务 | 新加一个 `order-service` | ✅ |
| 改数据模型 | 改 `users` 表结构、新增核心字段 | ✅ |
| 换技术栈 | MySQL → PostgreSQL | ✅ |
| 小功能 | 5 行代码改个按钮文案 | ❌ |
| bugfix | 修复已有逻辑，不改接口 | ❌ |

### 7.2 ADR 模板

```
# ADR-NNN: {标题}

## 状态
[proposed | accepted | deprecated | superseded]

## 上下文
（为什么需要这个决策？业务/技术驱动因素）

## 决策
（做了什么选择？解释为什么选这个方案）

## 影响
（对系统、团队、现有代码有什么影响）

## 替代方案
（其他考虑过的方案及其被否决的原因）
```

### 7.3 ADR 和 spec 的关系

```
ADR/ (Why — 为什么做这个决策)
  └── ADR-001_database-choice.md "为什么选 PostgreSQL"
      └── apps/user-service/specs/requirements.md
          "基于 PostgreSQL 的 user 表设计"

ADR/ (What — 整体架构)
  └── ADR-002_auth-scheme.md "JWT + refresh token"
      └── businesses/auth-service/specs/
          实现 JWT 认证的各规格文件
```

- **ADR 是跨 module 的**，一个 ADR 可能影响多个模块的 specs
- **Spec 是一个 module 内部的技术方案**，是 ADR 决策后的具体落地
- **读的顺序**: ADR 先看（理解架构决策）→ 再到具体 module 读 spec（理解实现）

### 7.4 从 ADR 看系统架构

ADR 本身构成了系统的"黑历史"——每个关键决策都有记录。**AI 首次进入项目时先读 ADR/ 目录，一次性看清系统架构全景**，之后需要深入了解某个模块时再读对应的 specs。

---

## 八、生命周期状态管理

### 状态流转

```
sprint: drafting → review → approved → active → done
spec:   draft → review → approved → active → done → archived
ADR:    proposed → accepted → deprecated → superseded
```

### 状态说明

| 状态 | 含义 | 谁修改 |
|:----|:-----|:-------|
| draft | Dev 在写 spec | Dev |
| review | 等待 TL 审查 | Dev → TL |
| approved | TL 批准，可开始实现 | TL |
| active | Dev 在实现 | Dev |
| done | check.md 全部通过 | QA 签收 |
| archived | 被替代或历史记录 | TL |

> 状态直接在 spec 文件顶部标记，或由各模块自行管理。不再需要全局 catalog。

---

## 九、迁移：现有项目引入 SSOT（Retrospec）

### Phase 0（30分钟）

使用 SpecRocket 创建骨架：

```bash
# 一行命令
curl -fsSL https://raw.githubusercontent.com/Toketec/SpecRocket/main/spec-rocket | bash -s migrate

# 或手动
mkdir -p apps/ businesses/ tools/ ADR/ docs/sprints/
cp -r {methodology}/apps/_template apps/{existing-app}/
```

### Phase 1: 为关键模块写 Retrospec（3 文件，无 plan.md）

- `requirements.md`: 当前功能 + 边界 + 已知问题
- `tasks.md`: 记录已存在的功能点
- `check.md`: 当前行为作为验收基线

### Phase 2: 补齐缺失的 ADR

### Phase 3: 新功能强制走 Sprint → ADR → Spec 流程

### Phase 4: 逐步覆盖存量

> 每次 sprint 选 1 个模块写 Retrospec，逐步覆盖。

---

## 十、升级路径

从 Lite（单人全包）升级到完整 SSOT：

1. 用引导脚本创建骨架
2. 创建 `docs/` 写全版本通用产品文档
3. 创建 `docs/sprints/sprint-001_name/` 开始第一个版本设计
4. 创建 `ADR/` 记录架构决策
5. 在 `apps/`、`businesses/`、`tools/` 中按模块逐步引入 specs
6. 用 `AGENTS.md` 作为 AI 协作入口

---

## 十一、审计追踪

每个 spec 的 `tasks.md` 维护状态历史：

```
T01 | 实现注册 API  | plan.md  | @dev_a  | 30min  | ☐ → ✅ (2026-07-20, curl 返回 201)
```

---

## 十二、快速参考

### 创建新项目（推荐：使用 SpecRocket）

```bash
# 一行命令，任何终端可用
curl -fsSL https://raw.githubusercontent.com/Toketec/SpecRocket/main/spec-rocket | bash -s init "项目名"
curl ... | bash -s brainstorm

# 或克隆后本地运行
git clone https://github.com/Toketec/SpecRocket.git
cd SpecRocket && ./spec-rocket init "项目名"
```

> SpecRocket 是 agent 无关的 CLI 引导工具，任何 AI 编码代理均可通过 `CLAUDE.md` 自动识别并使用。

### 手动操作（无 SpecRocket）

```bash
# 创建新 sprint
cp -r docs/sprints/_template docs/sprints/sprint-001_name

# 创建新模块
cp -r apps/_template apps/my-app
cp -r businesses/_template businesses/my-service

# 创建新 ADR
cp ADR/_template/ADR.md ADR/ADR-003_data-model.md

# 创建新原型
cp docs/sprints/_template/prototypes/prototype.html docs/sprints/sprint-001_name/prototypes/
```
