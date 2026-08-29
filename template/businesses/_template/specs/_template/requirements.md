# SPEC-BIZ-{XXX}: {功能名称}

> **编写者**: Dev (后端业务)
> **所属服务**: `businesses/{service-name}/`
> **规格路径**: `businesses/{service-name}/specs/SPEC-BIZ-{XXX}_{功能名称}/`（新建规格 = `cp specs/_template/ specs/SPEC-BIZ-{XXX}_{功能名称}/`）
> **基于冲刺**: `sprints/sprint-NNN/SPRINT-features.md` 中的功能 F{X}
> **本文档包含架构设计和技术方案**

## 问题

{为什么需要做这个。引用冲刺文档中的业务描述}

## 原冲刺功能

| 冲刺来源 | 功能 ID | 功能简述 |
|:--------|:------:|:--------|
| `sprint-NNN` | F{X} | {来自 sprint 的业务描述} |

## 架构总览

```text
{系统上下文图 — 这个服务在整体架构中的位置}
{例如:}
HTTP Request → API Gateway → {Service} → DB
                              │
                              └──→ {External API}
```

## 技术方案

### 数据模型

```typescript
interface {Entity} {
  id: string;
  // ... 字段
}
```

### API 接口

```
POST /api/{resource}  — {描述}
  请求: {Body}
  响应: {Body}
  错误码: 400/404/500
```

### 核心逻辑

{业务规则、状态机、算法描述}

### DB 变更

```sql
-- 新增/修改的表
CREATE TABLE IF NOT EXISTS ...;
```

## 依赖项

- {BIZ-XXX}: {依赖的其他后端服务}
- {外部依赖}: {第三方 API/SDK}

## Context from Dependencies

```typescript
// 上游 BIZ-XXX 提供的接口
function getX(id: string): Promise<X>
```

## 生命周期状态

> 当前: **draft** → review → approved → active → done → archived
