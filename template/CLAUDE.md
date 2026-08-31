# {项目名} — Agent 指令

> 这是一个 **SpecRocket SSOT 项目**。你通过 `CLAUDE.md` 理解项目结构和开发流程。
> 完整 AI 协作规范请先读 `AGENTS.md`。

---

## 一、项目结构

```
├── docs/                          # ★ 稳定层 — 全版本通用的产品文档
│   ├── product-overview.md        # 产品概览（用户画像、核心场景、术语表）
│   ├── non-functional-reqs.md     # 非功能需求 — 性能/SLA/安全/合规
│   ├── visual-design.md           # 视觉设计规范
│   ├── whitepaper.md              # 白皮书 — 产品愿景/市场定位/核心理念
│   ├── competition-strategy.md    # 竞品策略（可选）
│   └── judge-qa.md                # 评委/投资人 Q&A（可选）
│
├── sprints/                       # ★ 迭代层 — 每次迭代的完整容器（PM 产品设计 + Dev 技术规格）
│   ├── _template/                 # sprint 模板（创建新 sprint 时 cp）
│   │   ├── docs/                  # ★ 冲刺产品文档（PM 产出）
│   │   │   ├── SPRINT-features.md      # 冲刺目标 + 功能清单 + 验收条件
│   │   │   ├── functional-overview.md  # 版本功能总览 + 路线图
│   │   │   ├── user-scenarios.md       # 用户旅程 + 用例
│   │   │   ├── business-flows.md       # 核心业务流程图（泳道/时序/状态）
│   │   │   ├── uml-pack.md             # UML 图表包（按需，最小化原则）
│   │   │   └── prototypes/             # UI 设计（prototypes.md）+ 交互原型（prototype.html）
│   │   │       ├── prototypes.md       # 本版本页面结构/布局/内容/线框/文案
│   │   │       └── prototype.html      # 可点击交互原型（纯演示）
│   │   └── specs/                 # ★ 本次迭代的规格库（Dev 产出）
│   │       ├── _template/         # 规格模板（cp 建新规格）
│   │       │   ├── requirements.md  # 技术方案 + 边界 + 验收
│   │       │   ├── plan.md          # 实现步骤 + 文件清单
│   │       │   ├── tasks.md         # 任务拆分 + 审计追踪
│   │       │   └── check.md         # AI 自检 + 人工验收
│   │       └── spec-001-功能名/     # 具体规格（编号+描述，cp _template 创建）
│   └── sp-001-功能名/             # 具体冲刺（每次迭代一个完整容器）
│       ├── docs/
│       └── specs/
│           ├── _template/
│           ├── spec-001-前端用户登录/   # 前端独立规格 → 可并行开发
│           └── spec-002-后端认证服务/   # 后端独立规格 → 可并行开发
│
├── adrs/                          # ★ 架构变动设计库（一次大型变动 = 一个 adr 文件夹）
│   ├── _template/                 # adr 模板（architecture / data-model / impact）
│   └── adr-20260808-变动名/        # 一次大型变动的完整设计
│
├── apps/                          # ★ 前端/客户端应用（纯代码域，规格在 sprint 内）
│   └── app-web/                   # 具体应用（框架项目，结构由框架决定）
│
├── businesses/                    # ★ 后端业务服务（纯代码域）
│   └── user-service/              # 具体服务（框架项目，结构由框架决定）
│
├── tools/                         # ★ 工具/脚本（纯代码域）
│   └── backup-tool/               # 具体工具（框架项目，结构由框架决定）
│
├── assets/                        # ★ 运营资产 — 被系统/业务直接引用的文件
│   ├── configs/                   # 配置模板库（.env.example、nginx 模板）
│   ├── interfaces/                # 对外接口（OpenAPI、API 契约、SDK）
│   ├── standards/                 # 规范库（编码规范、数据字典、术语表）
│   └── manuals/                   # 说明文档（部署/运维手册、FAQ）
│
├── AGENTS.md                      # 五步开发流程 AI 规范 ← 先读
├── CLAUDE.md                      # 本文件
└── .gitignore
```

> **关键约束**: `docs/` 根目录只放全版本通用的文档。迭代型产品文档（场景、流程、原型）必须放入 `sprints/sp-NNN-*/docs/`，技术规格放入同 sprint 的 `specs/`。

---

## 二、你的角色

| Step | 谁做 | 你的角色 |
|:-----|:-----|:---------|
| **Step 1** | PM | 辅助——润色文档、画 ASCII 流程图、生成 HTML 原型模板（产出 `docs/` + `sprints/*/docs/`） |
| **Step 2** | Dev + 你（主力） | Dev 给方向决策 → 你写 adr（一次大型变动一个文件夹）+ 规格四文件（`specs/_template/` 复制为 `specs/spec-XXX_描述/`） |
| **Step 3** | PM + Dev 评审 | `// 你不参与` |
| **Step 4** | 你（执行） | 读 spec → 按 plan 实现 → 更新 tasks → 自检 |
| **Step 5** | Dev 收尾 | 辅助修 bug |

### Step 2 的 Dev 决策和你的产出

| Dev 决策（10 分钟） | 你产出的文件 |
|:-------------------|:------------|
| 本次迭代拆几个 spec？每个 spec 的边界 | `adrs/adr-YYYYMMDD-*/`（3 份）架构变动设计——一次大型变动一整份 |
| 本次变更是大型架构变动吗 | `sprints/sp-NNN-*/specs/spec-XXX_*/requirements.md` 技术方案+边界+验收 |
| 跨 spec 依赖 | `sprints/sp-NNN-*/specs/spec-XXX_*/plan.md` 实现步骤+文件清单 |
| 核心函数/API/表名 | `sprints/sp-NNN-*/specs/spec-XXX_*/tasks.md` 任务拆分+验证清单 |
| | `sprints/sp-NNN-*/specs/spec-XXX_*/check.md` AI 自检+人工验收 |

> **规格拆分原则**: 解耦、拆解、相互独立以便并行开发且互不干扰（前端/后端分列、不同服务分列）；颗粒度以「解耦 + 提升 token 利用率减少幻觉」为上限，**不刻意多拆**，方便管理为下限。

### Step 4 执行流程

```
读 requirements.md → 理解方案
按 plan.md 逐文件实现
每步更新 tasks.md 状态
完成 → typecheck + build + curl 自检
展示改动 → 等确认 → 提交
```

---

## 三、执行规则

1. **读顺序**: AGENTS.md → adrs/（架构全景）→ sprints/*/docs/（功能意图）→ 目标 sprint specs/（方案细节）
2. **不跳 step**: 未经 Step 3 评审的 spec，不能进入 Step 4 编码
3. **不改方案**: 编码中发现 spec 有问题 → 停，告诉 Dev 回 Step 2/3
4. **人机协作**: 修改后展示改动，用户确认后提交
5. **跨 spec 只读 Context Contract**（≤15 行）
6. **影响架构时更新 adr**: 大型架构变动（新增服务/改数据模型/换技术栈）→ 产出/更新一个 adr 文件夹（整份设计）
7. **AI 工具无关性**:
   - 你是按纯文件约定工作，不依赖特殊扫描/索引能力
   - 禁止自行探索项目目录来"理解项目"——必须按读顺序逐文件读取
   - Step 4 编码时，严格按 `plan.md` 的文件清单实现，不自动搜索其他位置
   - 跨 spec 引用仅通过 Context Contract（≤15 行）
8. **按需读取（控制 token）**: P0 首次进入/架构级改动才全量读；P1 局部改动只读目标 specs + 受影响 docs；P2 微调只读目标文件。禁止每次任务全量重读 docs/
9. **增量更新**: 只改受影响段落，禁止整篇重写或顺手全面刷新其他文件
10. **图表规范**: 产品文档至少 1 个 Mermaid 流程图（业务闭环一眼可见）；`uml-pack.md` 按最小化数量原则按需绘制，不追求全量；环境不支持 Mermaid 时用 ASCII 备选

---

## 四、adr ↔ spec 关系速查

```
adrs/ (整个系统的技术设计 — 一次大型变动一整份)
  └── adr-20260808-订单系统重构/
      ├── architecture.md  "系统上下文 + 组件 + 技术选型"
      └── data-model.md    "订单/用户实体 + 表结构"
          └── sprints/sp-001-*/specs/spec-002-后端订单服务/requirements.md
              "基于本架构的订单服务落地实现方案"
```

| 当出现以下情况... | 需要... |
|:-----------------|:-------|
| 大型架构变动（微服务/数据层重构/换技术栈） | ✅ 一个 adr 文件夹（整份设计） |
| 新增服务 / 改数据模型 | ✅ 并入本次变动的 adr 文件夹 |
| 小功能（5 行代码） | ❌ 不需要 adr |
| bugfix（不改接口） | ❌ 不需要 adr |

> adr 全局历史累积，不随 sprint 走——不是每次迭代都改架构。**收敛原则: 一次大型变动只出一份 adr 文件夹，不按技术点拆多个 adr。**

---

## 五、生命周期状态速查

```
sprint: drafting → review → approved → active → done
spec:   draft → review → approved → active → done → archived
adr:    proposed → accepted → deprecated → superseded
```

| 状态 | 含义 |
|:----|:-----|
| draft | Dev 在写 spec |
| review | 等待 TL 审查 |
| approved | TL 批准，可开始实现 |
| active | Dev 在实现 |
| done | check.md 全部通过 |
| archived | 被替代或历史记录 |

> 状态直接在 spec 文件顶部标记。

---

## 六、快速操作

### SpecRocket CLI（如有安装）
```bash
# 初始化新项目
curl -fsSL https://raw.githubusercontent.com/Toketec/SpecRocket/main/spec-rocket | bash -s init "项目名"

# 引导填充产品文档
curl ... | bash -s brainstorm

# 项目重构（介入 → 理解 → 保持 → 重构，不区分是否 SpecRocket 项目）
curl ... | bash -s migrate

# 生成项目预览页
curl ... | bash -s preview
```

### 手动操作
```bash
# 创建新 sprint（完整容器：docs/ + specs/）
cp -r sprints/_template sprints/sp-001-功能名

# 创建新模块（纯代码域，直接用框架脚手架生成项目）
npx create-next-app@latest apps/my-app                # 前端（Next.js）
spring init --dependencies=web,data-jpa businesses/my-service  # 后端（Spring Boot）

# 创建新规格（在 sprint 内，编号递增）
cp -r sprints/sp-001-功能名/specs/_template sprints/sp-001-功能名/specs/spec-001-功能名

# 创建新 adr（一次大型变动 = 一个文件夹，3 份文档）
cp -r adrs/_template adrs/adr-20260808-变动名

# 创建新原型（UI 设计文档 + 交互原型）
cp -r sprints/_template/docs/prototypes sprints/sp-001-功能名/docs/
```

> 本文件由 SpecRocket 模板自动生成。`{项目名}` 占位符会在 `init` 时自动替换。
