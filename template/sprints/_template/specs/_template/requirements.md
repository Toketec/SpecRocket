# spec-{XXX}: {规格名称}

> **编写者**: Dev
> **所属冲刺**: `sprints/sp-{NNN}-{冲刺名}/`
> **规格路径**: `sprints/sp-{NNN}-{冲刺名}/specs/spec-{XXX}-{规格名}/`
> **新建规格**: `cp -r specs/_template specs/spec-{XXX}-{规格名}`（编号在冲刺内递增 001, 002…）
> **覆盖范围**: 前端 `apps/{app-name}/` · 后端 `businesses/{service-name}/` · 工具 `tools/{tool-name}/`（按需填写，可多选）
> **基于冲刺**: `sprints/sp-{NNN}-{冲刺名}/docs/SPRINT-features.md` 中的功能 F{X}
> **当前架构基线**: `architecture/architecture.md` + {按需引用 `architecture/data-model.md` / `architecture/runtime.md` / `architecture/adrs/adr-NNNN-*.md`}
> **依赖规格**: {无，或 `spec-00X-xxx`}
> **本文档职责**: 定义本次实现切片如何落地已评审架构，不重复定义系统架构。

## 问题

{为什么需要做这个。引用冲刺文档中的业务描述}

## 原冲刺功能

| 冲刺来源 | 功能 ID | 功能简述 |
|:--------|:------:|:--------|
| `sp-{NNN}-{冲刺名}` | F{X} | {来自 sprint 的业务描述} |

## 架构落地边界

### 进入状态

{执行本规格前，代码、数据、契约和上游 spec 已经提供什么。禁止依赖 Agent 自行猜测现有实现。}

### 本规格实现程度

{本次实现哪一段架构能力，哪些仍由后续规格完成。}

### 退出状态

{本规格完成后，系统可观察、可验证的功能、业务逻辑、数据行为与产品外观。}

### 临时实现与收口责任

| 临时边界 | 本规格的实现 | 正式契约 | 收口规格 | 收口后验证 |
|:---------|:---------------|:---------|:---------|:-----------|
| {Mock / Adapter / 空实现 / Feature Flag} | {当前行为} | {引用 `assets/interfaces/` 或 Context Contract} | `spec-00X-xxx` | {如何证明已替换} |

> 没有明确收口规格的 Mock、TODO 或空实现不得进入 Step 4。无临时边界时明确写“无”。

## 局部实现方案

### 组件/模块结构

```text
{本规格触及的组件树、数据流、路由结构；不重复 `architecture/` 中的系统全局设计}
{例如:}
apps/web (页面层)
 └── LoginPage → POST /api/auth/login
businesses/auth-service (服务层)
 └── AuthController → AuthService → UserRepository
```

### 接口/API 落地

```text
{method} /api/{path}
  请求: {结构}
  响应: {结构}
  错误处理: {loading/error/placeholder}
```

### 数据落地

```text
{本规格新增或变更的 migration / Schema / 缓存键，并引用 `architecture/data-model.md` 中的当前模型}
```

## 依赖项（跨 spec）

- `spec-00X-xxx`: {有向依赖与进入条件}
- `architecture/{file}.md`: {本规格落地的架构章节}
- `architecture/adrs/adr-NNNN-*.md`: {如本规格开始落地新架构决策，引用对应 ADR}

## Context from Dependencies

```text
// 上游 spec-00X 提供的接口
GET /api/{resource} → {type}
POST /api/{resource} → {type}
```

> Context Contract 最多 15 行，只保留下游实现必须知道的契约。Mock 与真实实现必须遵守同一契约。

## 验收条件

- {可验证的功能或业务结果}
- {可验证的数据行为或契约结果}
- {可验证的产品外观与交互结果，如适用}
- {本规格明确不证明的后续能力}
