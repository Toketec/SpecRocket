# SSOT — 规格驱动开发规范手册

> **版本**: 3.0
> **用途**: 本文档是 SSOT（Single Source of Truth）规格驱动开发的完整规范。每个团队成员在加入时应阅读一次。
> **AI 协作入口**: `AGENTS.md`（AI 读取的浓缩版，位于根目录）
> **核心理念**: 一次冲刺 = 一个完整容器（PM 产品设计 + Dev 技术规格）。specs 聚合在迭代容器内，共同促成一次迭代的所有开发任务；adrs 记录一次大型变动的完整架构设计；代码域只关心实现。

---

## 〇、框架定位与核心优势

**SpecRocket 是一个轻量化的 SDD（规格驱动开发）框架**，以规格驱动思想为主、单一事实源（SSOT）为核心结构。相比 spec-kit、OpenSpec、superpowers、monorepo 等方案，SpecRocket 的设计定位如下：

| # | 优势 | 说明 |
|:-:|:----|:------|
| 1 | **结构更轻量** | 无 package.json、无构建工具链、无 VS Code 绑定。仅 4 个根配置 + 迭代容器模板 + adr 模板 + 产品文档模板。`curl \| bash` 一键初始化 |
| 2 | **边界定位清晰，适合企业协作** | 五步法（PM→Dev+AI→评审→AI编码→Dev收尾）明确每个角色职责边界。PM 不需要懂技术实现，Dev 不需要反复解释需求，AI 不跳步骤不改方案 |
| 3 | **迭代内聚合，支持并行开发** | 一次冲刺拆多个 spec（前端/后端/服务分列），多个 spec 共同促成一次迭代的全部开发任务。规格相互独立 → 可并行开发互不干扰；颗粒度受「解耦 + token 利用率」约束 |
| 4 | **可脱离 AI 工具独立交付** | `_template/` + 命名约定 + 目录职责表构成完整的项目管理框架。即使所有 AI 工具消失，团队仍可按此结构交付、复用、维护 |
| 5 | **标准化产品文档 → 单一事实源** | `docs/`（全局锚点）→ `sprints/*/docs/`（版本设计）→ `adrs/`（架构变动设计）→ `sprints/*/specs/`（技术规格），信息链路完整可追溯 |
| 6 | **保留 TDD 思想，简化为 check** | 不追求传统 TDD 的测试先行成本，但保留验收驱动精神：`check.md` 在实现前定义验收预期，实现后 AI 自检 + QA 签收形成双层验证 |
| 7 | **标准化项目结构（核心）** | 这是框架最重要的设计。只有标准化的结构可以脱离 AI 工具进行可交付、可复用、可维护——即使未来方法论被大模型吸纳，这个结构依然适合团队分工与交付 |

**对比参考**:
- superpowers → 绑定 Cursor/VS Code，工具锁定 ❌ | SpecRocket → 纯文件驱动，工具无关 ✅
- spec-kit → 依赖 CLI + Schema 验证，学习成本高 ❌ | SpecRocket → 4 文件规格，两步上手 ✅
- monorepo（nx/turborepo）→ 构建编排复杂 ❌ | SpecRocket → 只取组织结构，工具链自选 ✅
- OpenSpec → 缺乏角色边界和迭代机制 ❌ | SpecRocket → 五步法 + sprint 迭代 ✅

---

## 一、目录结构总览

> ★ = SpecRocket 骨架文件（`init` 时创建）
> ✦ = 开发过程中创建的文件/目录

```text
project-root/
│
├── AGENTS.md                         # ★ AI 协作入口（五步开发流程规范）
├── CLAUDE.md                         # ★ AI 指令文件（agent 自动加载）
├── README.md                         # ★ 项目介绍（`init` 时填入项目名）
│
├── docs/                             # ★ 稳定层 — 全版本通用的产品规划文档
│   ├── product-overview.md           # ★ 产品概览（用户画像、核心场景、术语表）
│   ├── non-functional-reqs.md        # ★ 非功能需求 — 性能/SLA/安全/合规
│   ├── visual-design.md              # ★ 视觉设计规范
│   ├── whitepaper.md                 # ★ 白皮书（产品愿景/市场定位/核心理念）
│   ├── competition-strategy.md       # ✦ 竞品策略（可选）
│   └── judge-qa.md                   # ✦ 评委/投资人 Q&A（可选）
│
├── sprints/                          # ★ 迭代层 — 每次迭代的完整容器
│   ├── _template/                    # ★ sprint 模板（创建新 sprint 时 cp）
│   │   ├── docs/                     # ★ 冲刺产品文档（PM 产出）
│   │   │   ├── SPRINT-features.md    #   冲刺目标 + 功能清单 + 业务验收条件
│   │   │   ├── functional-overview.md #   本版本功能总览 + 路线图
│   │   │   ├── user-scenarios.md     #   本版本用户旅程 + 用例
│   │   │   ├── business-flows.md     #   核心业务流程图（泳道/时序/状态，必写）
│   │   │   ├── uml-pack.md           #   UML 图表包（按需，最小化原则）
│   │   │   └── prototypes/           #   UI 设计（prototypes.md）+ 交互原型（prototype.html）
│   │   │       ├── prototypes.md     #   本版本页面结构/布局/内容/线框/文案
│   │   │       └── prototype.html    #   可点击交互原型（纯演示）
│   │   └── specs/                    # ★ 本次迭代的规格库（Dev 产出）
│   │       ├── _template/            #   规格模板（cp 建新规格）
│   │       │   ├── requirements.md   #   技术方案 + 架构 + 边界 + 验收条件
│   │       │   ├── plan.md           #   实现步骤 + 文件清单
│   │       │   ├── tasks.md          #   任务拆分 + 验证 + 审计追踪
│   │       │   └── check.md          #   AI 自检 + 人工验收清单
│   │       └── spec-001-功能名/      # ✦ 具体规格（编号+描述，cp _template 创建）
│   │           ├── requirements.md
│   │           ├── plan.md
│   │           ├── tasks.md
│   │           └── check.md
│   │
│   └── sp-001-功能名/                # ✦ 具体冲刺 — 每次迭代一个完整容器
│       ├── docs/                     #   本冲刺的产品设计（PM）
│       │   └── ...
│       └── specs/                    #   本冲刺的技术规格（Dev）
│           ├── _template/
│           ├── spec-001-前端用户登录/  #   前端独立规格
│           ├── spec-002-后端认证服务/  #   后端独立规格 → 可并行开发
│           └── ...
│
├── adrs/                             # ★ 架构变动设计库（一次大型变动 = 一个 adr 文件夹）
│   ├── _template/                    # ★ adr 模板（3 份文档）
│   │   ├── architecture.md           #   架构总览（上下文/组件/流程/技术选型）
│   │   ├── data-model.md             #   数据模型（实体/关系/表结构）
│   │   └── impact.md                 #   影响与注意事项（关联模块/部署/回滚）
│   ├── adr-20260808-订单系统重构/     # ✦ 一次大型变动的完整设计（3 份文档）
│   └── ...
│
├── assets/                           # ★ 运营资产 — 被系统/业务直接引用的文件
│   ├── README.md                     # ★ 定位说明（判定规则 + 角色边界）
│   ├── configs/                      #   配置模板库（.env.example、nginx 模板）
│   ├── interfaces/                   #   对外接口（OpenAPI、API 契约、SDK）
│   ├── standards/                    #   规范库（编码规范、数据字典、术语表）
│   └── manuals/                      #   说明文档（部署/运维手册、FAQ）
│                                     #   ✦ 按需取用，不强制全建
│
├── apps/                             # ★ 前端/客户端应用（纯代码域）
│   └── app-web/                      # ✦ 具体应用（框架项目，结构由框架决定）
│
├── businesses/                       # ★ 后端业务服务（纯代码域）
│   └── user-service/                 # ✦ 具体服务（框架项目，结构由框架决定）
│
├── tools/                            # ★ 工具/脚本（纯代码域）
│   └── backup-tool/                  # ✦ 具体工具（框架项目，结构由框架决定）
│
└── .gitignore                        # ★
```

**核心原则**:
- `docs/` = **稳定层** — 只放全版本通用的产品规划文档（产品概览、非功能需求、视觉规范、白皮书）。**不动摇的设计决策放这里，每次迭代的细节放 sprint**。
- `sprints/` = **迭代层** — 每次迭代的完整容器：`docs/`（PM 产品设计）+ `specs/`（Dev 技术规格）。**多个 spec 共同促成一次迭代的所有开发任务**。上次迭代的文档和原型作为历史记录，不覆盖。
- `adrs/` = **架构变动设计库** — 一次大型架构变动 = 一个 adr 文件夹（`architecture.md` 架构总览 + `data-model.md` 数据模型 + `impact.md` 影响注意）。**整个系统的技术设计只出现在这里**，其他目录不承载技术设计。**全局历史累积，不一定每次 sprint 都变架构，所以不放在 sprint 内**。AI 首次进入项目时先读此目录理解全局。
- `apps/` / `businesses/` / `tools/` = **纯代码实现域** — 只关心实现，不再携带规格。**每个子目录直接放一个框架项目**（Next.js / Spring Boot / Cargo 等），目录结构由框架脚手架决定，不额外建 `src/` 壳。
- `assets/` = **运营资产域** — 被系统/业务/外部直接引用的工程资产（配置模板、对外接口、规范库、说明手册），由 **Ops 运营角色**产出与维护。**判定规则：文件是否被代码/部署/外部系统直接引用？是 → assets/；否且是过程文档 → docs/。** docs/specs 引用 assets 用相对链接，不复制内容（SSOT）
- `AGENTS.md` = **AI 协作入口**，浓缩规范供 AI 读取

> **关键约束**: `docs/` 根目录不存放版本迭代型文档（如场景、流程、图表、原型）。迭代型产品文档必须随版本放入 `sprints/sp-NNN-*/docs/`，技术规格放入同 sprint 的 `specs/`。一个冲刺一个完整容器。

---

## 二、命名规则（v3.0）

> 全小写 + 连字符，与目录类型强一致。模板目录统一 `_template`（不参与编号）。

| 对象 | 规则 | 示例 |
|:--|:--|:--|
| 冲刺容器 | `sp-{编号}-{名字}` | `sprints/sp-001-核心交易/` |
| 规格目录 | `spec-{编号}-{名字}` | `sprints/sp-001-核心交易/specs/spec-001-前端收银台/` |
| 架构变动设计 | `adr-{YYYYMMDD}-{名字}` | `adrs/adr-20260808-订单系统重构/` |
| 模板目录 | `_template` | `sprints/_template/`、`sprints/_template/specs/_template/` |
| 编号规则 | 冲刺内递增（001, 002…） | spec 编号在所属冲刺内从 001 起 |

> 命名是结构的标识符：任何人/任何 AI 看到目录名即可判断类型与归属，无需读内容。

---

## 三、五步开发流程 (Core Workflow)

```
┌──────────────────────────────────────────────────────────┐
│  Step 1 │ PM 独作 — 产品设计阶段                        │
│          │ 产出: docs/ + sprints/*/docs/ + prototypes/  │
│          │ AI 角色: 协助润色、画 ASCII 图、生成原型模板  │
├──────────────────────────────────────────────────────────┤
│  Step 2 │ Dev+AI 独作 — 架构设计与规格编写              │
│          │ 输入: sprints/*/docs/ 的功能描述              │
│          │ 产出: adrs/（一次大型变动一个 adr）+ sprints/*/specs/（多个 spec）│
│          │ Dev 给方向 → AI 写完整 spec 四文件            │
├──────────────────────────────────────────────────────────┤
│  Step 3 │ PM + Dev 共同 — 方案评审                      │
│          │ PM 审: "spec 的方案能满足业务需求吗?"         │
│          │ TL 审: "方案架构合理、边界清晰吗?"            │
│          │ → 通过 或 打回 Step 2                        │
├──────────────────────────────────────────────────────────┤
│  Step 4 │ AI 按 spec 执行 — 编码                       │
│          │ 输入: requirements.md + plan.md               │
│          │ AI 生成代码 → 更新 tasks.md                   │
│          │ 自检: typecheck + build + curl                │
├──────────────────────────────────────────────────────────┤
│  Step 5 │ Dev 收尾 — 验收                              │
│          │ 修复 AI 遗留的小 bug                          │
│          │ 集成测试、回归检查                             │
│          │ QA 跑 check.md → 签收                        │
└──────────────────────────────────────────────────────────┘
```

### 3.1 Step 1: PM 独作 — 产品设计

**谁来干**: PM（产品经理），AI 可协作辅助
**产出去哪**: `docs/` 和 `sprints/sp-NNN-*/docs/`
**AI 能力边界**: AI 可协助润色文案、画 ASCII 流程图、生成 HTML 原型模板，**但业务流程定义和验收条件由 PM 把关**

**交付物清单**（按需选，不强制全部写完才进入 Step 2）:

| 文件 | 必需度 | 说明 |
|:----|:-----:|:-----|
| `docs/product-overview.md` | ⭐⭐⭐ | 用户画像、核心场景、术语表。所有后续文档的锚点 |
| `docs/non-functional-reqs.md` | ⭐⭐⭐ | **必须存在**，无要求也要一行占位。性能/SLA/安全/合规基线 |
| `docs/visual-design.md` | ⭐⭐⭐ | **必须存在**，无 UI 也要一行占位。视觉方向 |
| `docs/whitepaper.md` | ⭐⭐ | 产品愿景/市场定位/核心理念。无对外需求可一行占位 |
| `sprints/*/docs/functional-overview.md` | ⭐⭐ | 5+ 功能点的项目建议写。全局功能索引+版本路线图 |
| `sprints/*/docs/user-scenarios.md` | ⭐⭐⭐ | 用户旅程总览（叙述式阶段表）+ 用例清单。Dev 理解业务的基础 |
| `sprints/*/docs/business-flows.md` | ⭐⭐⭐ | 核心业务流程图（泳道/时序/状态）。**业务闭环一眼可见** |
| `sprints/*/docs/uml-pack.md` | ⭐⭐ | 软件工程图表包（用例/ER/类图/C4）。**按需最小化绘制** |
| `sprints/*/docs/prototypes/` | ⭐⭐ | 客户端项目建议做：**prototypes.md**（本版本页面结构/布局/内容/线框/文案）+ **prototype.html**（交互原型） |
| `sprints/*/docs/SPRINT-features.md` | ⭐⭐⭐ | 每次冲刺的功能描述（含业务验收条件） |

**编辑顺序（必须遵守，不跳序）**:

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `docs/product-overview.md` | 全局锚点，先定义产品是什么 |
| 2️⃣ | `docs/non-functional-reqs.md` | 技术约束基线（性能/安全/合规），影响技术选型 |
| 3️⃣ | `docs/visual-design.md` | 视觉方向（或明确无 UI），影响前端框架选型 |
| 4️⃣ | `docs/whitepaper.md` | 白皮书（愿景/定位），影响对外叙事 |
| 5️⃣ | `sprints/sp-NNN-*/docs/` | 版本迭代设计，依赖前四步的全局决策 |

**占位规则**: `docs/` 根目录下的每个必填文件必须存在并有内容。无实质可写时写一行占位说明「为什么不需要」。

| 文件 | 占位示例 |
|:----|:--------|
| `non-functional-reqs.md` | `本项目为无用户交互的脚本工具，无特殊非功能需求要求。` |
| `visual-design.md` | `本项目无前端界面（纯后端/脚本/CLI），不涉及视觉设计。` |
| `whitepaper.md` | `本项目为内部工具，不涉及对外白皮书。` |

**进入 Step 2 的条件**: 至少 `product-overview.md` + `sprints/sp-NNN-*/docs/user-scenarios.md` + `sprints/sp-NNN-*/docs/SPRINT-features.md` 就位并经过 TL 技术可行性评审。

---

### 3.2 Step 2: Dev+AI 独作 — 架构设计与规格编写

**谁来干**: Dev 给方向，AI 写产出
**输入**: `sprints/sp-NNN-*/docs/SPRINT-features.md`
**产出去哪**: `adrs/` + 本冲刺的 `sprints/sp-NNN-*/specs/`

**Dev 的职责**（4 件事，10 分钟决策）:

| 决策 | 示例 |
|:----|:-----|
| 本次迭代拆几个 spec？每个 spec 的边界 | `spec-001-前端收银台` / `spec-002-后端订单服务` |
| 本次变更是大型架构变动吗 | 新增服务、改数据模型、换技术栈 → **一次大型变动 = 一个 adr 文件夹**（整份设计）；小改动不写 adr |
| 跨 spec 依赖 | spec-002 与 spec-001 的接口契约是什么？ |
| spec 关键字 | 核心函数名、API 路径、数据表名 |

**AI 的职责**（基于 Dev 的方向自动完成）:

- 写 `adrs/adr-YYYYMMDD-*/` 的架构变动设计文件夹（architecture / data-model / impact 三份）——**一次大型变动一整份**
- 写 `sprints/sp-NNN-*/specs/spec-XXX_*/` 四文件（requirements / plan / tasks / check）

**Step 2 的产出物必须包含架构设计和技术方案**，不只是一堆空模板。AI 应该写出可供评审的完整方案。

#### 📐 规格拆分原则（核心，v3.0）

> **为什么一次冲刺要拆多个规格？**
> 把一次开发任务**解耦、拆解、尽量相互独立**，以便**并行开发且互不干扰**——前端和后端分离成多个规格项、不同服务分成不同规格项。多个 spec 共同促成一次迭代的所有开发任务（必然包含前端、后端或其他服务）。

**颗粒度控制原则**:

| 原则 | 说明 |
|:----|:----|
| ✅ 解耦 | 能独立开发/独立验收的边界才拆（前端/后端、不同服务、不同领域） |
| ✅ 提升 token 利用率减少幻觉 | spec 上下文要小到 AI 能完整理解；过大 → 幻觉增多 |
| ❌ 不刻意多拆 | 没有独立边界不硬拆；拆太多 → 管理成本上升 |
| 上限 | 「解耦 + token 利用率」 |
| 下限 | 「方便管理」 |

**判断问题**: 这个规格能独立交给一个 AI 对话完整实现并验收吗？能 → 拆；不能（拆了就互相耦合）→ 合并。

---

### 3.3 Step 3: PM + Dev 共同 — 方案评审

**这是唯一必须真人碰面的节点**。评审两件事：

| 谁审 | 审什么 | 通过标准 |
|:----|:------|:--------|
| PM | spec 的技术方案能否解决 sprint 里的业务需求 | "我看懂了，能解决问题" |
| TL | 架构是否合理、边界是否清晰、有没有遗漏 | "方案可行，没有重大隐患" |

**如果 PM 说看不懂** → 说明 Step 2 的 spec 没写好。Dev 应该用业务语言解释技术方案的取舍，不要只丢技术术语。这是 spec 质量的检验标准：**PM 不需要懂技术实现，但要能理解"这个方案为什么能解决我的需求"**。

**评审结论**:
- ✅ **通过** → 进入 Step 4（AI 编码）
- 🔁 **需修改** → 打回 Step 2，Dev+AI 修改后重新评审

> 多个 spec 可以并行评审，但必须逐个过，不能打包通过。

---

### 3.4 Step 4: AI 按 spec 执行 — 编码

**谁来干**: AI 按 spec 自动编码，Dev 监督
**输入**: `requirements.md` + `plan.md`
**输出**: 代码实现

**AI 执行原则**:

```
1. 读 requirements.md 理解方案
2. 按 plan.md 步骤逐文件实现
3. 每完成一个步骤更新 tasks.md 状态
4. 全部完成后跑 self-check (typecheck + build + curl)
5. 展示改动 → 等待用户确认 → 提交
```

**禁止**:
- ❌ 不读 spec 直接写代码
- ❌ 边写边改方案（改方案必须回 Step 2/3）
- ❌ 自动 git commit/push（必须展示改动等确认）
- ❌ 跨 spec 修改其他规格的文件（并行开发的边界）

---

### 3.5 Step 5: Dev 收尾 — 验收

**谁来干**: Dev 修复边界情况，QA 最终验收
**输入**: AI 生成的代码
**输出**: 可通过 `check.md` 全部步骤的完成品

**Dev 收尾清单**:

| 检查项 | AI 能覆盖 | 人必须做 |
|:-------|:--------:|:--------|
| 逻辑正确性 | ⭐⭐⭐ 标准路径 | 🔴 边界情况（空数据、并发、权限绕过） |
| UI 细节 | ⭐⭐ 布局+响应式 | 🔴 细微交互、动效、文案 |
| 错误处理 | ⭐⭐ try/catch 主线 | 🔴 异常组合（网络断开+用户重复点击） |
| 安全 | ⭐ 常见注入 | 🔴 权限穿越、敏感数据泄露 |
| 性能 | ⭐ 明显的 N+1 | 🔴 大数据量下的瓶颈 |
| 集成 | ⭐⭐ 单规格 | 🔴 跨规格数据流 |
| 代码风格 | ⭐⭐⭐ 格式化 | ⚪ 团队约定（命名、注释风格） |

**QA 验收**: 跑 `check.md` 全部人工验收步骤，通过后签署 done。

---

### 3.6 常见问题

**Q: 一个 sprint 多个功能怎么办？**
一个功能（或一组相关功能）一个 spec，Step 2-3 可以并行。但 Step 3 评审必须逐个过。

**Q: 一个 sprint 拆几个 spec？**
按「规格拆分原则」：解耦 + 提升 token 利用率减少幻觉，不刻意多拆。前端/后端/不同服务天然是拆分边界。

**Q: Step 2 写 spec 时发现 sprint 有问题？**
打回 Step 1，PM 修 sprint 文档后再来。**不要在 spec 里改业务需求**。

**Q: Step 4 AI 生成的代码有问题？**
小 bug → Step 5 修。大方向错了 → 说明 Step 2 的 spec 不够清晰，回 Step 2 改 spec。

**Q: 谁验收 check.md？**
QA 跑人工验收项。如果项目没有专职 QA，Dev 自行验收，PM 确认业务验收条件满足。

**Q: adrs 为什么不放 sprint 里？**
不一定每次 sprint 都改架构。架构变动设计是全局历史累积，跨 sprint 生效；但**架构要直观在首层看见**，所以独立存在。一次大型变动 = 一个 adr 文件夹（整份完整设计），不是按技术点拆多个 adr。

---

## 四、各目录角色与产出

### 4.1 docs/ — 稳定层：全版本通用的产品规划文档

`docs/` 根目录只存放**变化极小或不常变的全版本通用文档**。每次大版本的迭代型产品文档（场景、流程、图表、原型）必须在对应的 `sprints/sp-NNN-*/docs/` 中。

| 文件/目录 | 内容 | 替代了什么 | 页数上限 | 必须 |
|:---------|:----|:----------|:--------:|:----:|
| `product-overview.md` | 用户画像、核心场景、价值主张、成功指标、**业务术语表** | PRD 的"背景/目标/用户" | 200 行 | ✅ |
| `non-functional-reqs.md` | **非功能需求** — 性能/SLA/安全/合规/埋点/可观测性 | 传统 PRD 的非功能章节 | 不限 | ✅ |
| `visual-design.md` | **视觉设计规范** — 全局唯一审美边界（颜色/大小/设计语言/风格/动效/间隔），**禁业务设计**；组件仅记跨版本稳定视觉属性 | Figma Design System / UI Kit | 不限 | ✅ |
| `whitepaper.md` | **白皮书** — 愿景/市场/价值/商机；**质量门槛：全盘视野/无版本关联/双视角/低认知门槛** | 对外介绍材料 | 不限 | ⭐⭐ |
| `competition-strategy.md`（可选） | 竞品对比、定位、差异化 | 竞品分析 PPT | — | ❌ |
| `judge-qa.md`（可选） | 评委/投资人 Q&A 预演 | 答辩准备 | — | ❌ |

> ⚠️ **必填规则**：`non-functional-reqs.md` 和 `visual-design.md` 是 **必填文件**，即使项目极简（纯脚本/CLI/无 UI）也必须存在。无实质内容时写一行占位说明「为什么不需要」，不留空白。`whitepaper.md` 建议存在，内部工具可一行占位。

> ⚠️ **不在 `docs/` 根目录存放的文档**: 用户场景（user-scenarios）、业务流程图（business-flows）、UML 图表（uml-pack）、功能总览（functional-overview）、UI 具体形态（prototypes）。这些必须放入对应的 `sprints/sp-NNN-*/docs/` 目录，一个版本一个完整容器。

对于有客户端的项目（Web/移动端），PM 应在对应 sprint 的 `prototypes/` 目录中同时产出 **UI 设计文档** 与 **交互原型**：

```text
sprints/sp-NNN-名称/docs/prototypes/
├── prototypes.md       # UI 设计说明 — 本版本页面结构/布局/内容/线框/文案（随版本变动）
└── prototype.html      # 可交互原型（纯演示，不写说明文字/线框）
```

> **分工原则**: `visual-design.md` 只定义全局审美边界（与版本无关）；页面具体形态（哪些页面、什么布局、什么内容、什么文案、线框）→ `prototypes.md`；可点击演示 → `prototype.html`。两者一一对应，改文案改 md，改演示改 html。

> ⚡ **原型必须包含完整的交互演示**：页面切换、弹窗、表单填写、状态切换（loading/empty/error/success）。不接受只有静态视觉输出的原型。双击 HTML 文件即可在浏览器中运行。

| 规则 | 说明 |
|:----|:-----|
| ✅ 纯 HTML/CSS/JS | 不需要框架（React/Vue）、不需要后端、不需要真实数据 |
| ✅ 可点击交互 | 页面切换、按钮状态、弹窗、表单填写等交互演示 |
| ✅ 组件级演示 | 每个页面的 loading/empty/error/success 状态 |
| ✅ 手机优先 | 默认移动端宽度（480px），兼顾桌面 |
| ✅ 单文件 | 一个页面一个 .html，自包含，双击即可打开 |
| ❌ 不要 mock 后端 | 数据用静态变量模拟，不调 API |
| ❌ 原型不写说明 | 线框、文字说明、页面清单一律进 prototypes.md |

**规则**:
- 所有图文（原型图、流程图、截图）转化为 MD 文本描述，人+AI 可读
- 不包含技术架构、API 设计、DB schema
- 经过 TL 评审技术可行性后才能进入 Sprint 阶段

### 4.2 sprints/ — 迭代层：每次迭代的完整容器

```
sprints/sp-NNN-名称/
├── docs/                           # PM 产品设计
│   ├── SPRINT-features.md          # 冲刺目标 + 功能清单 + 业务流程 + 验收条件
│   ├── functional-overview.md      # 本版本功能需求总览 + 版本路线图
│   ├── user-scenarios.md           # 本版本用户旅程总览 + 用例清单
│   ├── business-flows.md           # 核心业务流程图（Mermaid，必写）
│   ├── uml-pack.md                 # UML 图表包（用例/ER/类图/C4，按需最小化）
│   └── prototypes/
│       ├── prototypes.md           # 本版本 UI 设计（页面结构/布局/内容/线框/文案）
│       └── prototype.html          # 本版本可交互 HTML 原型（纯演示）
└── specs/                          # Dev 技术规格（多个 spec 共同促成本次迭代）
    ├── _template/                  # 规格模板（cp 建新规格）
    └── spec-001-前端xxx/           # 具体规格
        ├── requirements.md
        ├── plan.md
        ├── tasks.md
        └── check.md
```

每个 sprint 是一个独立的、完整的版本容器（产品设计 + 技术规格）。PM 在每个大版本迭代时完整复制一次模板，填入本次版本的完整产品设计；Dev 在 Step 2 时在 `specs/` 中拆解规格。

**为什么要一个版本一个容器？**
- ✅ **迭代完整自包含** — 一次迭代的所有产出（产品设计 + 技术规格）在同一目录，Dev 只看本 sprint 即可理解要做什么
- ✅ **冻结即全冻结** — sprint 冻结 = docs + specs 全部冻结，迭代边界干净
- ✅ **原型可回溯** — 上一个版本的原型不会被覆盖，随时可以回顾
- ✅ **历史对比** — 两个 sprint 的 user-scenarios.md 放在一起，一眼看出本次迭代改了哪些场景

**创建新 sprint 的命令**:

```bash
# 从模板创建新 sprint（完整容器：docs/ + specs/）
cp -r sprints/_template sprints/sp-NNN-名称

# 或从上一个 sprint 复制（保持一致的文档结构）
cp -r sprints/sp-001-xxx/* sprints/sp-002-xxx/
```

### 4.3 apps/ / businesses/ / tools/ — 纯代码实现域（Dev 产出）

**直接放框架项目，结构由框架决定**（不提供 SpecRocket 代码模板，不规定模块内建 `src/`）：

```
apps/app-web/                # 前端应用（Next.js 脚手架生成，自带 app/ 等结构）
businesses/user-service/     # 后端服务（Spring Boot 生成，自带 src/main/ 等结构）
tools/backup-tool/           # 工具/脚本（cargo new 生成，自带 src/ 等结构）
```

> **v3.1 变化**: 代码域不再提供 `_template/src/` 空壳模板，**每个子目录直接放一个框架脚手架项目**（Next.js / Spring Boot / Cargo 等），目录结构由框架决定。规格仍统一聚合在迭代容器 `sprints/sp-NNN-*/specs/` 内（v3.0 起），多个 spec 共同促成一次迭代的所有开发任务。

**创建新应用/服务/工具**（用框架脚手架，不用 cp 模板）:

```bash
npx create-next-app@latest apps/app-web                              # 前端（Next.js）
spring init --dependencies=web,data-jpa businesses/user-service      # 后端（Spring Boot）
cargo new tools/backup-tool                                          # 工具（Rust）
```

### 4.4 adrs/ — 架构变动设计库（Dev 产出，全局）

```
adrs/
├── _template/                    # adr 模板（cp 建新 adr 文件夹）
│   ├── architecture.md           # 架构总览（上下文/组件/流程/技术选型）
│   ├── data-model.md             # 数据模型（实体/关系/表结构）
│   └── impact.md                 # 影响与注意事项（关联模块/部署/回滚）
├── adr-20260808-订单系统重构/     # ✦ 一次大型变动的完整设计
│   ├── architecture.md
│   ├── data-model.md
│   └── impact.md
└── ...
```

**核心定位: 一次大型架构变动 = 一个 adr 文件夹（整份完整新结构设计）**。整个系统的技术内容设计（架构、数据、技术选型）**只出现在 adrs/**，其他地方不承载技术设计。

**什么时候需要写 adr**（Dev 与 AI 完成一次架构交流后即产出）:

| 场景 | 示例 | 是否写 adr |
|:----|:-----|:-------------:|
| 大型架构变动 | 引入微服务、重构数据层、整体换技术栈 | ✅ **一个 adr 文件夹**（整份设计） |
| 新增服务 | 新加一个 `order-service`（影响系统架构） | ✅ 并入本次变动的 adr 文件夹 |
| 改数据模型 | 改 `users` 表结构、新增核心实体 | ✅ 并入本次变动的 adr 文件夹 |
| 小功能 | 5 行代码改个按钮文案 | ❌ |
| bugfix | 修复已有逻辑，不改接口 | ❌ |

> ⚠️ **收敛原则**: 一次大型变动只出一份 adr 文件夹，**不按技术点拆多个 adr**（不要"数据库选型一个 adr + 认证方案一个 adr"）。Dev 与 AI 交流完一次架构设计 → 整合为一整份。

**adr 和 spec 的关系**:

```
adrs/ (整个系统的技术设计 — 一次大型变动一整份)
  └── adr-20260808-订单系统重构/
      ├── architecture.md  "系统上下文 + 组件 + 技术选型"
      └── data-model.md    "订单/用户实体 + 表结构"
          └── sprints/sp-001-*/specs/spec-002-后端订单服务/requirements.md
              "基于本架构的订单服务落地实现方案"
```

- **adr 是跨 spec 的**，一份 adr 可能影响多个 spec（可跨多个 sprint）
- **spec 是迭代内的技术方案**，是 adr 架构下的具体落地；spec 内**不重复做技术决策**，只引用 adr 的实现
- **adr 不随 sprint 走**：不一定每次 sprint 都变架构，但架构要**直观在首层看见**，所以独立存在
- **读的顺序**: adrs 先看（理解整体架构）→ 再到具体 sprint 读 spec（理解实现）

**创建新 adr**:

```bash
cp -r adrs/_template adrs/adr-20260808-变动名
```

### 4.5 assets/ — 运营资产（Ops 产出）

`assets/` 存放**被系统/业务直接引用的工程资产**（配置模板、对外接口、规范库、说明手册），由 **Ops 运营角色**产出与维护。

- 四类按需取用：`configs/`（配置模板）、`interfaces/`（对外接口）、`standards/`（规范库）、`manuals/`（说明文档）
- docs/specs 引用本目录文件用**相对链接**，不复制内容（SSOT）

---

## 五、Spec 四文件详解

### 5.1 规格目录结构

```
sprints/sp-NNN-名称/specs/
├── _template/                       # 规格模板（cp 建新规格）
│   ├── requirements.md
│   ├── plan.md
│   ├── tasks.md
│   └── check.md
└── spec-001-功能名/                 # 具体规格（编号+描述，cp _template 创建）
    ├── requirements.md
    ├── plan.md
    ├── tasks.md
    └── check.md
```

**新建规格**：`cp -r specs/_template specs/spec-{XXX}_{规格名}`，编号在冲刺内递增（001, 002…），描述用下划线连接。

### 5.2 四文件职责

| 文件 | 职责 | 关键内容 |
|:----|:----|:--------|
| `requirements.md` | 技术方案 + 边界 + 验收条件 | 架构设计、接口/API 设计、数据/存储设计、边界、验收条件 |
| `plan.md` | 实现步骤 + 文件清单 | 分步实现、文件增改清单、风险 |
| `tasks.md` | 任务拆分 + 验证 + 审计追踪 | 任务表、跨 spec 依赖、回归范围 |
| `check.md` | AI 自检 + 人工验收 | AI 自检项、QA 签收项、回归验证 |

### 5.3 跨规格引用（Context Contract）

所有 specs 共享一个 Context Contract 机制（≤15 行）：

```
## Context from Dependencies

### spec-002 (后端订单服务) → 接口契约
- `POST /api/orders` 创建订单，返回 `{ id, status }`
- `GET /api/orders/:id` 获取订单详情
```

A spec 想确认依赖方 B 的接口格式，直接在 A 的 `requirements.md` 里写上述 Context Contract。不需要翻 B 的规格。**这种引用只读不写，下游规格不可修改上游规格。**

---

## 六、生命周期状态管理

### 状态流转

```
sprint: drafting → review → approved → active → done
spec:   draft → review → approved → active → done → archived
adr:    proposed → accepted → deprecated → superseded
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

> 状态直接在 spec 文件顶部标记，或由各规格自行管理。不再需要全局 catalog。

---

## 七、迁移指南（v3.0 结构迁移）

### 迁移原则（转移 → 收敛 → 保留 → 删除）

> 执行 `./spec-rocket migrate` 时，旧结构的内容按以下优先级处理：
> 1. **转移**：能确定归属的，直接移动并重命名（如 sprint 文档 → 新 sprint 容器）
> 2. **收敛**：不方便转移的，合并进新位置对应文档（语义合并由 AI 执行）
> 3. **保留**：不方便收敛的，保留信息不丢失（`.legacy` / `archive/`）
> 4. **删除**：确认无价值且内容已转移后删除
>
> **最终保持目录结构完全符合最新规范，零残留。**

### 旧 → 新映射表

| 旧结构（≤ v2.12） | 新结构（v3.0） | 策略 |
|:--|:--|:--|
| `docs/sprints/sprint-001_xxx/` 下 6 文档+原型 | `sprints/sp-001-xxx/docs/` | 转移（重命名 + 改路径） |
| `{apps\|businesses\|tools}/*/specs/SPEC-{APP\|BIZ\|TOOL}-NNN_xxx/` | `sprints/sp-NNN-xxx/specs/spec-NNN-xxx/`（按 spec 头部「基于冲刺」字段或 AI 判断归入对应冲刺） | 转移 + 重新编号 |
| `ADR/ADR-NNN_xxx.md`（旧决策记录） | `adrs/adr-YYYYMMDD-xxx/`（架构变动设计文件夹，3 份文档） | 转移 + 重命名，内容按新语义收敛（AI 整合为一整份） |
| 无法归类的游离文档 | 对应 sprint `docs/` 收敛；仍无法归类 → `archive/` | 收敛 → 保留 → 删 |
| `visual-design.md` 中混入的业务设计（页面/布局/内容/线框） | `sprints/sp-NNN-*/docs/prototypes/prototypes.md`（无对应冲刺 → 最近冲刺或 `archive/`） | AI 转移，`visual-design.md` 只留审美边界 |
| `sprints/sprint-000_initial/`（纯模板） | 直接删除 | 删除 |
| `sprints/sprint-000_initial.legacy/`（含内容） | 内容转移至 `sprints/sp-001-*/docs/` 后删除 | 转移 → 删除 |

> 脚本完成结构层迁移（目录/文件移动、命名规范化），内容层的语义合并由 AI 按 MIGRATION-REPORT.md 执行。

---

## 八、常见陷阱（Pitfalls）

### 8.1 规格颗粒度陷阱

**错误做法**: 为了"看起来专业"把一个功能拆成 5 个 spec，每个 spec 只有 3 行内容。
**正确做法**: 按「规格拆分原则」——有独立边界（前端/后端/不同服务/不同领域）才拆；拆了要能独立交给一个 AI 对话完整实现。

### 8.2 跨规格耦合陷阱

**错误做法**: spec-A 直接引用 spec-B 的实现细节（内部函数、私有表结构）。
**正确做法**: 只通过 Context Contract（接口契约 ≤15 行）引用。实现细节各自独立，改 spec-B 内部不影响 spec-A。

### 8.3 角色越界陷阱

**错误做法**: PM 在 sprint 文档里写死技术方案（"用 PostgreSQL""用 React"）；Dev 在 spec 里改业务需求。
**正确做法**: PM 文档只定义**做什么**，不决定**怎么做**；技术方案在 Step 2 的 adrs + specs 中推导。发现业务问题 → 打回 Step 1。

### 8.4 迭代边界陷阱

**错误做法**: Step 4 编码中 PM 改需求，AI 边写边改。
**正确做法**: 新需求进下一个 sprint，当前 sprint 以冻结的 spec 为准。

### 8.5 视觉设计混入业务设计陷阱

**错误做法**: `visual-design.md` 里写具体页面（"首页顶部导航、左侧列表"）、业务文案、框线图——且这些业务设计在其他文档缺失。
**正确做法**: `visual-design.md` 只定义全局审美边界（颜色/字体/间距/动效/组件视觉属性，与版本无关）；页面形态进对应 sprint 的 `prototypes/prototypes.md`，交互演示进 `prototype.html`。migrate 时若发现 `visual-design.md` 含业务设计，转移到 `prototypes.md` 并清理原文件。

---
