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
│   │
│   └── sprints/                   # ★ 版本层 — 每次迭代的完整产品设计容器
│       ├── _template/             # sprint 模板（创建新 sprint 时 cp）
│       │   ├── SPRINT-features.md      # 冲刺目标 + 功能清单 + 验收条件
│       │   ├── functional-overview.md  # 版本功能总览 + 路线图
│       │   ├── user-scenarios.md       # 用户旅程 + 用例
│       │   ├── business-flows.md     # 核心业务流程图（泳道/时序/状态）
│       │   ├── uml-pack.md           # UML 图表包（按需，最小化原则）
│       │   └── prototypes/             # 可交互 HTML 原型
│       │       └── prototype.html
│       │
│       └── sprint-001_功能名/     # 具体冲刺（每次迭代一个完整容器）
│           └── ...
│
├── ADR/                           # ★ 架构决策记录
│   ├── _template/ADR.md
│   ├── ADR-001_database-choice.md # "为什么选 PostgreSQL"
│   └── ADR-002_auth-scheme.md     # "JWT + refresh token"
│
├── apps/                          # ★ 前端/客户端应用（每个含 src/ + specs/）
│   ├── _template/
│   │   ├── src/                   # 代码目录
│   │   └── specs/                 # 规格四文件
│   │       ├── requirements.md    # 技术方案 + 边界 + 验收
│   │       ├── plan.md            # 实现步骤 + 文件清单
│   │       ├── tasks.md           # 任务拆分 + 审计追踪
│   │       └── check.md           # AI 自检 + 人工验收
│   └── app-web/
│
├── businesses/                    # ★ 后端业务服务（同上结构）
│   ├── _template/
│   │   ├── src/
│   │   └── specs/
│   └── user-service/
│
├── tools/                         # ★ 工具/脚本
│   └── _template/
│       ├── src/
│       └── specs/
│
├── AGENTS.md                      # 五步开发流程 AI 规范 ← 先读
├── CLAUDE.md                      # 本文件
├── .gitignore
└── LICENSE
```

> **关键约束**: `docs/` 根目录只放全版本通用的文档。迭代型文档（场景、流程、原型）必须放入对应 sprint 目录。

---

## 二、你的角色

| Step | 谁做 | 你的角色 |
|:-----|:-----|:---------|
| **Step 1** | PM | 辅助——润色文档、画 ASCII 流程图、生成 HTML 原型模板 |
| **Step 2** | Dev + 你（主力） | Dev 给 4 个方向决策 → 你写 ADR + 规格四文件 |
| **Step 3** | PM + Dev 评审 | `// 你不参与` |
| **Step 4** | 你（执行） | 读 spec → 按 plan 实现 → 更新 tasks → 自检 |
| **Step 5** | Dev 收尾 | 辅助修 bug |

### Step 2 的 Dev 决策和你的产出

| Dev 决策（10 分钟） | 你产出的文件 |
|:-------------------|:------------|
| 归属哪个模块 | `ADR/*.md` 架构设计 |
| 是否需要新 ADR | `requirements.md` 技术方案+边界+验收 |
| 跨模块依赖 | `plan.md` 实现步骤+文件清单 |
| 核心函数/API/表名 | `tasks.md` 任务拆分+验证清单 |
| | `check.md` AI 自检+人工验收 |

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

1. **读顺序**: AGENTS.md → ADR/（架构全景）→ docs/sprints/（功能意图）→ 模块 specs/（方案细节）
2. **不跳 step**: 未经 Step 3 评审的 spec，不能进入 Step 4 编码
3. **不改方案**: 编码中发现 spec 有问题 → 停，告诉 Dev 回 Step 2/3
4. **人机协作**: 修改后展示改动，用户确认后提交
5. **跨模块只读 Context Contract**（≤15 行）
6. **影响架构时同步更新 ADR**
7. **AI 工具无关性**:
   - 你是按纯文件约定工作，不依赖特殊扫描/索引能力
   - 禁止自行探索项目目录来"理解项目"——必须按读顺序逐文件读取
   - Step 4 编码时，严格按 `plan.md` 的文件清单实现，不自动搜索其他位置
   - 跨模块引用仅通过 Context Contract（≤15 行）
8. **按需读取（控制 token）**: P0 首次进入/架构级改动才全量读；P1 局部改动只读目标 specs + 受影响 docs；P2 微调只读目标文件。禁止每次任务全量重读 docs/
9. **增量更新**: 只改受影响段落，禁止整篇重写或顺手全面刷新其他文件
10. **图表规范**: 产品文档至少 1 个 Mermaid 流程图（业务闭环一眼可见）；`uml-pack.md` 按最小化数量原则按需绘制，不追求全量；环境不支持 Mermaid 时用 ASCII 备选

---

## 四、ADR ↔ Spec 关系速查

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

| 当出现以下情况... | 需要... |
|:-----------------|:-------|
| 新增服务 | ✅ 写新 ADR |
| 改数据模型 | ✅ 写新 ADR |
| 换技术栈 | ✅ 写新 ADR |
| 小功能（5 行代码） | ❌ 不需要 ADR |
| bugfix（不改接口） | ❌ 不需要 ADR |

---

## 五、生命周期状态速查

```
sprint: drafting → review → approved → active → done
spec:   draft → review → approved → active → done → archived
ADR:    proposed → accepted → deprecated → superseded
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

# 给现有项目嵌入骨架
curl ... | bash -s migrate

# 生成项目预览页
curl ... | bash -s preview
```

### 手动操作
```bash
# 创建新 sprint
cp -r docs/sprints/_template docs/sprints/sprint-001_功能名

# 创建新模块
cp -r apps/_template apps/my-app
cp -r businesses/_template businesses/my-service

# 创建新 ADR
cp ADR/_template/ADR.md ADR/ADR-003_data-model.md

# 创建新原型
cp docs/sprints/_template/prototypes/prototype.html docs/sprints/sprint-001_name/prototypes/
```

> 本文件由 SpecRocket 模板自动生成。`{项目名}` 占位符会在 `init` 时自动替换。
