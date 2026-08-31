# spec-{XXX}: {规格名称}

> **编写者**: Dev
> **所属冲刺**: `sprints/sp-{NNN}-{冲刺名}/`
> **规格路径**: `sprints/sp-{NNN}-{冲刺名}/specs/spec-{XXX}_{规格名}/`
> **新建规格**: `cp -r specs/_template specs/spec-{XXX}_{规格名}`（编号在冲刺内递增 001, 002…）
> **覆盖范围**: 前端 `apps/{app-name}/` · 后端 `businesses/{service-name}/` · 工具 `tools/{tool-name}/`（按需填写，可多选）
> **基于冲刺**: `sprints/sp-{NNN}-{冲刺名}/docs/SPRINT-features.md` 中的功能 F{X}
> **本文档包含架构设计和技术方案**

## 问题

{为什么需要做这个。引用冲刺文档中的业务描述}

## 原冲刺功能

| 冲刺来源 | 功能 ID | 功能简述 |
|:--------|:------:|:--------|
| `sp-{NNN}-{冲刺名}` | F{X} | {来自 sprint 的业务描述} |

## 架构设计（技术方案）

### 组件/模块结构

```text
{架构图 — 组件树、数据流、路由结构}
{例如:}
apps/web (页面层)
 ├── LoginPage
 │    ├── LoginForm → POST /api/auth/login
 │    └── ErrorBanner
businesses/auth-service (服务层)
 ├── AuthController → AuthService → UserRepository → DB
 └── JwtProvider (签发/校验)
```

### 接口/API 设计

```
{method} /api/{path}
  请求: {结构}
  响应: {结构}
  错误处理: {loading/error/placeholder}
```

### 数据/存储设计

```text
{表结构 / Schema / 缓存键（如涉及）}
```

## 依赖项（跨 spec）

- {spec-00X}: {依赖的规格（本冲刺内或其他冲刺）}
- {adr-YYYYMMDD-变动名}: {依据的架构变动设计（整份文件夹）}

## Context from Dependencies

```
// 上游 spec-00X 提供的接口
GET /api/{resource} → {type}
POST /api/{resource} → {type}
```

## 生命周期状态

> 当前: **draft** → review → approved → active → done → archived
