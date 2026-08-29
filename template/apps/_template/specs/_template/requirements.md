# SPEC-APP-{XXX}: {功能名称}

> **编写者**: Dev (前端/客户端)
> **所属应用**: `apps/{app-name}/`
> **规格路径**: `apps/{app-name}/specs/SPEC-APP-{XXX}_{功能名称}/`（新建规格 = `cp specs/_template/ specs/SPEC-APP-{XXX}_{功能名称}/`）
> **基于冲刺**: `sprints/sprint-NNN/SPRINT-features.md` 中的功能 F{X}
> **本文档包含架构设计和技术方案**

## 问题

{为什么需要做这个。引用冲刺文档中的业务描述}

## 原冲刺功能

| 冲刺来源 | 功能 ID | 功能简述 |
|:--------|:------:|:--------|
| `sprint-NNN` | F{X} | {来自 sprint 的业务描述} |

## 前端架构

```text
{架构图 — 组件树、数据流、路由结构}
{例如:}
Page
 ├── Header (登录状态)
 ├── FeatureForm (表单组件)
 │    ├── InputGroup
 │    └── SubmitButton → API: POST /api/xxx
 └── ResultPanel
```

## 技术方案

### 组件结构

| 组件 | 职责 | 状态 | Props |
|:----|:----|:----|:------|
| {ComponentName} | {做什么的} | loading/empty/error/success | `{prop: type}` |

### API 对接

```
{method} /api/{path}
  请求: {结构}
  响应: {结构}
  错误处理: {loading/error/placeholder}
```

### 路由/导航

```
/{path} — {页面描述}
/{path}/:id — {详情页描述}
```

## 依赖项

- {BIZ-XXX}: {依赖的后端服务规格}
- {APP-XXX}: {依赖的其他前端规格}

## Context from Dependencies

```
// 上游 BIZ-XXX 提供的接口
GET /api/{resource} → {type}
POST /api/{resource} → {type}
```

## 生命周期状态

> 当前: **draft** → review → approved → active → done → archived
