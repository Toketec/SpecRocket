# SSOT — 规格驱动开发规范手册

> **版本**: 2.1
> **用途**: 本文档是 SSOT（Single Source of Truth）规格驱动开发的完整规范。每个团队成员在加入时应阅读一次。
> **AI 协作入口**: `AGENTS.md`（AI 读取的浓缩版，位于根目录）
> **核心理念**: specs 嵌入在代码模块中，ADR 记录架构设计，PM 产出全在 docs/ 下。

---

## 〇、框架定位与核心优势

**SpecRocket 是一个轻量化的 SDD（规格驱动开发）框架**，以规格驱动思想为主、单一事实源（SSOT）为核心结构。相比 spec-kit、OpenSpec、superpowers、monorepo 等方案，SpecRocket 的设计定位如下：

| # | 优势 | 说明 |
|:-:|:----|:------|
| 1 | **结构更轻量** | 无 package.json、无构建工具链、无 VS Code 绑定。仅 3 个根配置 + 3 类模块模板 + ADR 模板 + 产品文档模板。`curl | bash` 一键初始化 |
| 2 | **边界定位清晰，适合企业协作** | 五步法（PM→Dev+AI→评审→AI编码→Dev收尾）明确每个角色职责边界。PM 不需要懂技术实现，Dev 不需要反复解释需求，AI 不跳步骤不改方案 |
| 3 | **吸纳敏捷与瀑布优势** | SDD 本质是瀑布的阶段门禁（Step 1→2→3→4→5 顺序递进），但 `sprints/sprint-NNN/` 结构天然支持多版本迭代。新需求进下一个 sprint，当前 sprint 冻结 |
| 4 | **可脱离 AI 工具独立交付** | `_template/` + 命名约定 + 目录职责表构成完整的项目管理框架。即使所有 AI 工具消失，团队仍可按此结构交付、复用、维护 |
| 5 | **标准化产品文档 → 单一事实源** | `product-overview.md`（全局锚点）→ `sprints/`（版本设计）→ `ADR/`（架构决策）→ `specs/`（技术规格），信息链路完整可追溯 |
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
│   │
│   └── sprints/                      # ★ 版本层 — 每次迭代的完整产品设计容器
│       ├── _template/                # ★ sprint 模板（创建新 sprint 时 cp）
│       │   ├── SPRINT-features.md    #   冲刺目标 + 功能清单 + 业务验收条件
│       │   ├── functional-overview.md #   本版本功能总览 + 路线图
│       │   ├── user-scenarios.md     #   本版本用户旅程 + 用例
│       │   ├── business-flows.md     #   核心业务流程图（泳道/时序/状态，必写）
│       │   ├── uml-pack.md           #   UML 图表包（按需，最小化原则）
│       │   └── prototypes/           #   本版本的可交互 HTML 原型
│       │       └── prototype.html
│       │
│       └── sprint-000_initial/       # ★ v1.0 初始版本基线（6 文件 + 原型）
│           ├── SPRINT-features.md
│           ├── functional-overview.md
│           ├── user-scenarios.md
│           ├── business-flows.md
│           ├── uml-pack.md
│           └── prototypes/
│               └── prototype.html
│
├── ADR/                              # ★ 架构决策记录目录
│   └── _template/ADR.md              # ★ ADR 模板
│   └── ADR-001_xxx.md                # ✦ 后续开发中创建的 ADR…
│
├── apps/                             # ★ 前端/客户端应用目录
│   └── _template/                    # ★ 应用模板（创建新应用时 cp）
│       └── specs/                    # ★ 规格四文件模板
│           ├── requirements.md       #   技术方案 + 边界 + 验收条件
│           ├── plan.md               #   实现步骤 + 文件清单
│           ├── tasks.md              #   任务拆分 + 验证 + 审计追踪
│           └── check.md              #   AI 自检 + 人工验收清单
│       └── 应用名/                   # ✦ 开发中用 `cp _template 应用名` 创建
│           ├── src/                  #   代码目录（开发者创建）
│           └── specs/                #   该应用的规格文件
│
├── businesses/                       # ★ 后端业务服务目录
│   └── _template/                    # ★ 服务模板
│       └── specs/
│           ├── requirements.md
│           ├── plan.md
│           ├── tasks.md
│           └── check.md
│       └── 服务名/                   # ✦ 同上
│           ├── src/
│           └── specs/
│
├── tools/                            # ★ 工具/脚本目录
│   └── _template/                    # ★ 工具模板
│       └── specs/
│           ├── requirements.md
│           ├── plan.md
│           ├── tasks.md
│           └── check.md
│
├── .gitignore                        # ★
└── LICENSE                           # ★ MIT
```

**核心原则**:
- `docs/` = **稳定层** — 只放全版本通用的产品规划文档（产品概览、非功能需求、视觉规范）。**不动摇的设计决策放这里，每次迭代的细节放 sprint**。
- `docs/sprints/sprint-NNN/` = **版本层** — 每次迭代的完整产品设计容器。PM 在每个版本中更新功能描述、场景、流程图、图表和可交互原型。**上次版本的原型和文档作为历史记录，不覆盖。**
- `apps/` / `businesses/` / `tools/` = **代码实现域**，各自携带 specs
- `ADR/` = **架构设计文档库** — 系统上下文、数据模型、核心流程、技术选型。AI 首次进入项目时先读此目录理解全局，一次性看清系统架构。
- `AGENTS.md` = **AI 协作入口**，浓缩规范供 AI 读取

> **关键约束**: `docs/` 根目录不存放版本迭代型文档（如场景、流程、图表、原型）。迭代型产品文档必须随版本放入 `docs/sprints/sprint-NNN/`，一个版本一个完整的 sprint 容器。

---

## 二、五步开发流程 (Core Workflow)

```
┌──────────────────────────────────────────────────────────┐
│  Step 1 │ PM 独作 — 产品设计阶段                        │
│          │ 产出: docs/ + docs/sprints/ + prototypes/    │
│          │ AI 角色: 协助润色、画 ASCII 图、生成原型模板  │
├──────────────────────────────────────────────────────────┤
│  Step 2 │ Dev+AI 独作 — 架构设计与规格编写              │
│          │ 输入: docs/sprints/ 的功能描述                │
│          │ 产出: ADR/ + {apps|biz|tools}/*/specs/       │
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

### 2.1 Step 1: PM 独作 — 产品设计

**谁来干**: PM（产品经理），AI 可协作辅助
**产出去哪**: `docs/` 和 `docs/sprints/`
**AI 能力边界**: AI 可协助润色文案、画 ASCII 流程图、生成 HTML 原型模板，**但业务流程定义和验收条件由 PM 把关**

**交付物清单**（按需选，不强制全部写完才进入 Step 2）:

| 文件 | 必需度 | 说明 |
|:----|:-----:|:-----|
| `product-overview.md` | ⭐⭐⭐ | 用户画像、核心场景、术语表。所有后续文档的锚点 |
| `functional-overview.md` | ⭐⭐ | 5+ 功能点的项目建议写。全局功能索引+版本路线图 |
| `non-functional-reqs.md` | ⭐⭐ | 有性能基线/合规要求时必写 |
| `user-scenarios.md` | ⭐⭐⭐ | 用户旅程总览（叙述式阶段表）+ 用例清单。Dev 理解业务的基础 |
| `business-flows.md` | ⭐⭐⭐ | 核心业务流程图（泳道/时序/状态）。**业务闭环一眼可见** |
| `uml-pack.md` | ⭐⭐ | 软件工程图表包（用例/ER/类图/C4）。**按需最小化绘制** |
| `prototypes/*.html` | ⭐⭐ | 客户端项目建议做，纯 HTML，可点击交互。**承担页面布局+交互展示** |
| `sprints/sprint-NNN/*.md` | ⭐⭐⭐ | 每次冲刺的功能描述（含业务验收条件） |

**进入 Step 2 的条件**: 至少 `product-overview.md` + `user-scenarios.md` + `sprints/sprint-NNN/SPRINT-features.md` 就位并经过 TL 技术可行性评审。

---

### 2.2 Step 2: Dev+AI 独作 — 架构设计与规格编写

**谁来干**: Dev 给方向，AI 写产出
**输入**: `docs/sprints/sprint-NNN/SPRINT-features.md`
**产出去哪**: `ADR/` + 对应模块的 `specs/`

**Dev 的职责**（4 件事，10 分钟决策）:

| 决策 | 示例 |
|:----|:-----|
| 这个功能属于哪个模块 | `apps/web`? `businesses/order-service`? |
| 需要新 ADR 吗 | 新增服务、改数据模型、引入新技术栈 → 写 ADR |
| 跨模块依赖 | 需要对接哪个上游服务？接口是什么？ |
| spec 关键字 | 核心函数名、API 路径、数据表名 |

**AI 的职责**（基于 Dev 的方向自动完成）:

- 写 `ADR/` 的架构设计文档（系统上下文、数据模型、流程）
- 写 `requirements.md`（技术方案 + 架构 + 边界）
- 写 `plan.md`（实现步骤 + 文件清单）
- 写 `tasks.md`（任务拆分 + 验证清单）
- 写 `check.md`（AI 自检 + 人工验收）

**Step 2 的产出物必须包含架构设计和技术方案**，不只是一堆空模板。AI 应该写出可供评审的完整方案。

---

### 2.3 Step 3: PM + Dev 共同 — 方案评审

**这是唯一必须真人碰面的节点**。评审两件事：

| 谁审 | 审什么 | 通过标准 |
|:----|:------|:--------|
| PM | spec 的技术方案能否解决 sprint 里的业务需求 | "我看懂了，能解决问题" |
| TL | 架构是否合理、边界是否清晰、有没有遗漏 | "方案可行，没有重大隐患" |

**如果 PM 说看不懂** → 说明 Step 2 的 spec 没写好。Dev 应该用业务语言解释技术方案的取舍，不要只丢技术术语。这是 spec 质量的检验标准：**PM 不需要懂技术实现，但要能理解"这个方案为什么能解决我的需求"**。

**评审结论**:
- ✅ **通过** → 进入 Step 4（AI 编码）
- 🔁 **需修改** → 打回 Step 2，Dev+AI 修改后重新评审

---

### 2.4 Step 4: AI 按 spec 执行 — 编码

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

---

### 2.5 Step 5: Dev 收尾 — 验收

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
| 集成 | ⭐⭐ 单模块 | 🔴 跨模块数据流 |
| 代码风格 | ⭐⭐⭐ 格式化 | ⚪ 团队约定（命名、注释风格） |

**QA 验收**: 跑 `check.md` 全部人工验收步骤，通过后签署 done。

---

### 2.6 常见问题

**Q: 一个 sprint 多个功能怎么办？**
每个功能一个 spec（或一组相关功能一个 spec），Step 2-3 可以并行。但 Step 3 评审必须逐个过。

**Q: Step 2 写 spec 时发现 sprint 有问题？**
打回 Step 1，PM 修 sprint 文档后再来。**不要在 spec 里改业务需求**。

**Q: Step 4 AI 生成的代码有问题？**
小 bug → Step 5 修。大方向错了 → 说明 Step 2 的 spec 不够清晰，回 Step 2 改 spec。

**Q: 谁验收 check.md？**
QA 跑人工验收项。如果项目没有专职 QA，Dev 自行验收，PM 确认业务验收条件满足。

---

## 三、各目录角色与产出

### 3.1 docs/ — 稳定层：全版本通用的产品规划文档

`docs/` 根目录只存放**变化极小或不常变的全版本通用文档**。每次大版本的迭代型产品文档（场景、流程、图表、原型）必须在对应的 `docs/sprints/sprint-NNN/` 中。

| 文件/目录 | 内容 | 替代了什么 | 页数上限 | 必须 |
|:---------|:----|:----------|:--------:|:----:|
| `product-overview.md` | 用户画像、核心场景、价值主张、成功指标、**业务术语表** | PRD 的"背景/目标/用户" | 200 行 | ✅ |
| `non-functional-reqs.md` | **非功能需求** — 性能/SLA/安全/合规/埋点/可观测性 | 传统 PRD 的非功能章节 | 不限 | ✅ |
| `visual-design.md` | **视觉设计规范** — 设计系统 token / UI框架选型与定制 / 组件清单 / 品牌资产 | Figma Design System / UI Kit | 不限 | ✅ |
| `competition-strategy.md`（可选） | 竞品对比、定位、差异化 | 竞品分析 PPT | — | ❌ |
| `judge-qa.md`（可选） | 评委/投资人 Q&A 预演 | 答辩准备 | — | ❌ |

> ⚠️ **必填规则**：`non-functional-reqs.md` 和 `visual-design.md` 是 **必填文件**，即使项目极简（纯脚本/CLI/无 UI）也必须存在。无实质内容时写一行占位说明「为什么不需要」，不留空白。详见下方「编辑顺序」和「占位规则」。

### 📋 编辑顺序（必须遵守，不跳序）

Step 1 中文档按以下顺序编辑，每步完成后再进入下一步：

| 序 | 文件 | 原因 |
|:--:|:----|:-----|
| 1️⃣ | `product-overview.md` | 全局锚点，先定义产品是什么 |
| 2️⃣ | `non-functional-reqs.md` | 技术约束基线（性能/安全/合规），影响技术选型 |
| 3️⃣ | `visual-design.md` | 视觉方向（或明确无 UI），影响前端框架选型 |
| 4️⃣ | `sprints/sprint-NNN/` | 版本迭代设计，依赖前三项的全局决策 |

### 📌 占位规则

> `docs/` 根目录下的每个必填文件必须存在并有内容。无实质可写时写一行占位说明「为什么不需要」。

| 文件 | 占位示例 |
|:----|:--------|
| `non-functional-reqs.md` | `本项目为无用户交互的脚本工具，无特殊非功能需求要求。` |
| `visual-design.md` | `本项目无前端界面（纯后端/脚本/CLI），不涉及视觉设计。` |

> 占位原则：说清楚**为什么不需要**，不留"可能是忘了"的疑问。

> ⚠️ **不在 `docs/` 根目录存放的文档**: 用户场景（user-scenarios）、业务流程图（business-flows）、UML 图表（uml-pack）、功能总览（functional-overview）、HTML 原型。这些必须放入对应的 `sprints/sprint-NNN/` 目录，一个版本一个完整容器。

对于有客户端的项目（Web/移动端），PM 应提供一个或多个纯 HTML 原型，放在对应 sprint 的 `prototypes/` 目录中：

```html
docs/sprints/sprint-NNN_name/prototypes/
├── prototype.html      # 主要原型（含所有交互）
└── prototype-aux.html  # 辅助原型（可选）
```

> ⚡ **原型必须包含完整的交互演示**：页面切换、弹窗、表单填写、状态切换（loading/empty/error/success）。不接受只有静态视觉输出的原型。双击 HTML 文件即可在浏览器中运行。

| 规则 | 说明 |
|:----|:-----|
| ✅ 纯 HTML/CSS/JS | 不需要框架（React/Vue）、不需要后端、不需要真实数据 |
| ✅ 可点击交互 | 页面切换、按钮状态、弹窗、表单填写等交互演示 |
| ✅ 组件级演示 | 每个页面的 loading/empty/error/success 状态 |
| ✅ 手机优先 | 默认移动端宽度（480px），兼顾桌面 |
| ✅ 单文件 | 一个页面一个 .html，自包含，双击即可打开 |
| ❌ 不要 mock 后端 | 数据用静态变量模拟，不调 API |

**规则**:
- 所有图文（原型图、流程图、截图）转化为 MD 文本描述，人+AI 可读
- 不包含技术架构、API 设计、DB schema
- 经过 TL 评审技术可行性后才能进入 Sprint 阶段

### 3.2 docs/sprints/ — 版本层：每次迭代的完整产品设计容器

```
docs/sprints/sprint-NNN_name/
├── SPRINT-features.md           # 冲刺目标 + 功能清单 + 业务流程 + 验收条件
├── functional-overview.md       # 本版本功能需求总览 + 版本路线图
├── user-scenarios.md            # 本版本用户旅程总览 + 用例清单
├── business-flows.md            # 核心业务流程图（Mermaid，必写）
├── uml-pack.md                  # UML 图表包（用例/ER/类图/C4，按需最小化）
└── prototypes/
    └── prototype.html           # 本版本可交互 HTML 原型（完整交互）
```

每个 sprint 是一个独立的、完整的版本设计容器。PM 在每个大版本迭代时完整复制一次模板，填入本次版本的完整产品设计。

**为什么要一个版本一个容器？**
- ✅ **原型可回溯** — 上一个版本的原型不会被覆盖，随时可以回顾
- ✅ **每次迭代独立** — 每个 sprint 的文档完整自包含，Dev 只看本 sprint 即可理解要做什么
- ✅ **原型可交互** — 每个版本有自己完整的 HTML 原型，双击浏览器打开即可体验该版本的全部交互
- ✅ **历史对比** — 两个 sprint 的 user-scenarios.md 放在一起，一眼看出本次迭代改了哪些场景

**创建新 sprint 的命令**:

```bash
# 从模板创建新 sprint
cp -r docs/sprints/_template docs/sprints/sprint-NNN_{name}

# 或从上一个 sprint 复制（保持一致的文档结构）
cp -r docs/sprints/sprint-001_xxx/* docs/sprints/sprint-002_xxx/
```

---

### SPRINT-features.md 模板结构

### 3.3 apps/ — 前端/客户端应用（Dev 产出）

每个应用一个目录，包含自身代码和 specs：

```
apps/app-name/
├── src/               # 应用代码
└── specs/             # ★ 本应用的规格
    ├── requirements.md   # 前端架构 + 组件设计 + API 对接方案
    ├── plan.md           # 实现步骤 + 组件树 + 路由
    ├── tasks.md          # 任务拆分 + Owner + 验证清单
    └── check.md          # AI 自检 + 人工验收
```

**Spec ID 格式**: `APP-NNN_{name}`（如 `APP-001_user-registration`）

### 3.4 businesses/ — 后端业务服务（Dev 产出）

每个服务一个目录：

```
businesses/service-name/
├── src/               # 服务代码
└── specs/             # ★ 本服务的规格
    ├── requirements.md   # 架构总览 + 数据模型 + API 设计 + DB 变更
    ├── plan.md           # 数据层/路由层/业务逻辑层实现步骤
    ├── tasks.md          # 任务拆分 + 验证清单
    └── check.md          # AI 自检 + 人工验收
```

**Spec ID 格式**: `BIZ-NNN_{name}`（如 `BIZ-001_user-api`）

### 3.5 tools/ — 工作流工具（Dev 产出）

非大型、非结构性、非多模块的工作流类工具：

```
tools/tool-name/
├── src/               # 工具代码
└── specs/             # ★ 多次迭代则应包含 specs
    ├── requirements.md   # 问题定义 + 输入/输出 + 核心逻辑
    ├── plan.md           # 简洁的执行步骤
    ├── tasks.md          # 任务跟踪
    └── check.md          # 命令行验收方式
```

**Spec ID 格式**: `TOOL-NNN_{name}`（如 `TOOL-001_deploy-script`）

**单次工具**（一次性脚本）：不需要 specs，直接在 `src/` 中用 README 说明。
**多次迭代的工具**：必须有 specs 四文件，走完整流程。

---

## 四、ADR — 架构设计文档库

> **ADR 是什么**: 不仅是决策记录(Architecture Decision Record)，更是**整个系统的架构设计文档库**。包含系统上下文图、数据模型、核心流程、技术选型、重要决策理由。AI 首次进入项目先读 ADR/ 即可快速理解全局，不用翻遍每个模块的 spec。
>
> **为什么需要**: businesses 中的后端服务必然涉及大量架构设计（数据库选型、服务拆分、API 网关、认证方案等），这些设计影响多个模块，不能只在某个模块 specs/ 里记录。

### 4.1 ADR 文档类型

| 类型 | 内容 | 示例 |
|:----|:-----|:-----|
| **架构设计** | 系统上下文、ER 图、核心流程、组件关系 | 部署架构、数据流、认证流程 |
| **数据字典** | **跨模块共享数据定义** — 字段名、业务含义、类型、约束 | User、Order、Market 等共享实体 |
| **决策记录** | 多方案对比+选择理由 | 为什么选 A 不选 B |

两者都放在 ADR/ 下，按编号顺序排列即可还原系统全貌。

### 4.2 什么时候需要写 ADR

| 触发条件 | 示例 |
|:--------|:-----|
| 跨多个模块的技术决策 | 选 PostgreSQL vs MongoDB、引入消息队列 |
| 影响全局架构的选择 | 认证方案（JWT vs OAuth）、API 规范（REST vs GraphQL） |
| 有多方案对比且需记录理由 | 为什么选方案 A 不选 B |
| 上游接口变更影响多个消费者 | 改 DB schema 影响 3+ 模块 |

### 4.2 ADR 模板

```
ADR/ADR-NNN_title.md
```

| 章节 | 内容 |
|:----|:-----|
| 背景 | 为什么需要做这个决策 |
| 决策 | 选了什么方案，一句话说清楚 |
| 方案对比 | 表格对比 2-3 个方案（描述、优点、缺点） |
| 正面影响 | 对系统/团队的好处 |
| 负面影响 | 引入的约束或成本 |
| 关联 | 关联的 ADR、specs 路径、模块 |

### 4.3 ADR 和 spec 的关系

```
ADR（全局架构决策）         spec（模块级实现方案）
─────────────────         ────────────────────
记录 WHY                  记录 WHAT + HOW
影响多个模块               只影响本模块
提交即冻结（历史记录）      随代码迭代更新
给所有人看                 给本模块的 Dev 看
```

### 4.4 从 ADR 看系统架构

按编号顺序阅读 ADR/ 目录即可还原整个系统的架构演进：

```
ADR-001_database-choice     → 为什么用 PostgreSQL
ADR-002_auth-scheme         → 为什么用 JWT + refresh token
ADR-003_service-split       → 为什么拆成 user/order/payment 三个服务
ADR-004_api-versioning      → 为什么用 URL prefix 版本化
```

新人或 AI 读 ADR/ 所有文件，就能一次性看清整个系统的架构设计理由，而不需要翻遍每个模块的 spec。

---

## 五、Spec 四文件详解

### 5.1 为什么 specs 分散到模块内

| 旧模式 | 新模式 |
|:------|:------|
| specs 和代码分离 | specs 和代码在一起，修改即更新 |
| 新人不知哪个 spec 对哪个模块 | 打开模块就看到自己的 specs |
| 跨模块依赖需全局文件 | 直接在 requirements.md 中引用路径 |
| 大型 monorepo 目录膨胀 | 每个模块自包含，解耦 |

### 5.2 四文件模板

每个模块的 `specs/` 下包含 4 个文件：

| 文件 | 编写者 | 读者 | 用途 |
|:----|:-------|:----|:-----|
| `requirements.md` | **Dev**（基于 sprint） | TL、Dev、QA | 架构设计 + 技术方案 + 边界 + 验收标准 |
| `plan.md` | **Dev/TL** | Dev | 实现步骤 + 文件清单 + 代码骨架 + 回滚方案 |
| `tasks.md` | **Dev** | TL、QA | 任务拆分 + Owner + Est. + 状态 + Done 条件 |
| `check.md` | **Dev + QA** | 所有人 | AI 自检 + 人工验收步骤 + 回归范围 |

**Retrospec（存量代码）**: 只写 3 个文件（`requirements.md` + `tasks.md` + `check.md`，不写 `plan.md`）。

### 5.3 跨模块引用

当 app 的 specs 需要引用 business 的 specs 时：

```markdown
## 依赖项
- BIZ-001: `businesses/user-service/specs/requirements.md`
- APP-002: `apps/admin-panel/specs/requirements.md`
```

在 `requirements.md` 末尾的 **Context from Dependencies** 小节中维护接口摘要（≤15 行）：

```markdown
## Context from Dependencies

### BIZ-001 (user-service) → 接口契约
- `POST /api/auth/login` → `{ token, user }`
- `GET /api/users/me` → `User`
```

### 5.4 跨模块验收标注

在 check.md 的"回归测试范围"中标注依赖的模块：

```markdown
## 回归测试范围
- `businesses/user-service/specs/` — 改动了认证接口格式
- `apps/admin-panel/specs/` — 改动了共享 User 类型
```

---

## 六、生命周期

```
sprint: drafting → review → approved → active → done
spec:   draft → review → approved → active → done → archived
ADR:    proposed → accepted → deprecated → superseded
```

| 状态 | 含义 | 谁修改 |
|:----|:-----|:-------|
| draft | Dev 在写 spec | Dev |
| review | 等待 TL 审查 | Dev → TL |
| approved | TL 批准，可开始实现 | TL |
| active | Dev 在实现 | Dev |
| done | check.md 全部通过 | QA 签收 |
| archived | 被替代或历史记录 | TL |

状态直接在 spec 文件顶部标记，或由各模块自行管理。不再需要全局 catalog。

---

## 七、AI 协作规则

1. **读顺序**: AGENTS.md → ADR/（架构设计全景→快速理解系统）→ docs/sprints/（确认功能意图）→ 目标模块 specs/（实现细节）
2. **人机协作**: 所有文件 AI 都可编辑修改。修改后展示改动，获得确认后提交
3. **跨模块不读全量 spec**: 只读 Context Contract（≤15 行），避免上下文爆炸
4. **禁止自动 git commit/push**: 先展示改动，等用户确认
5. **影响架构时更新 ADR**: 如果改动改变了系统架构（新增服务、改数据模型、换技术栈），同步更新或新增 ADR 文档

---

## 八、审计追踪

每个 spec 的 `tasks.md` 维护状态历史：

```
T01 | 实现注册 API | plan.md | @dev_a | 30min | ☐ → ✅ (2026-07-20, curl 返回 201)
```

---

## 九、现有项目迁移（Retrospec 模式）

**Phase 0 (30min)**: 使用引导脚本创建骨架
```bash
# 从方法论项目运行引导脚本
path/to/SpecRocket/scripts/bootstrap-project.sh migrate ../my-existing-project "项目名"

# 或手动创建
mkdir -p apps/ businesses/ tools/ ADR/ docs/sprints/
cp -r {methodology}/apps/_template apps/{existing-app}/
cp -r {methodology}/businesses/_template businesses/{existing-service}/
```

**Phase 1**: 为关键模块写 Retrospec（3 文件，无 plan.md）
- requirements.md: 当前功能 + 边界 + 已知问题
- tasks.md: 记录已存在的功能点
- check.md: 当前行为作为验收基线

**Phase 2**: 读 ADR/ 目录了解现有架构决策，补齐缺失的 ADR

**Phase 3**: 新功能强制走 Sprint → ADR → Spec 流程

**Phase 4**: 逐步覆盖存量，每次 sprint 选 1 个模块写 Retrospec

---

## 十、升级路径

从 Lite（单人全包）升级到完整 SSOT：
1. 用引导脚本创建骨架：`scripts/bootstrap-project.sh migrate ./ "项目名"`
2. 创建 `docs/` 写全版本通用产品文档（product-overview、non-functional-reqs、visual-design）
3. 创建 `docs/sprints/sprint-001_name/` 开始第一个版本设计
4. 创建 `ADR/` 记录架构决策
5. 在 `apps/`、`businesses/`、`tools/` 中按模块逐步引入 specs
6. 用 `AGENTS.md` 作为 AI 协作入口
