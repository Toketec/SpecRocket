# SPEC-BIZ-{XXX}: 后端执行计划

## 架构总览

```text
{数据流 + 分层}
```

## 改动步骤

### Step 1: 数据层

**文件**: `businesses/{service}/src/data/{file}`

{接口签名 + 骨架}

### Step 2: API 路由

**文件**: `businesses/{service}/src/routes/{file}`

{路由定义}

### Step 3: 业务逻辑

**文件**: `businesses/{service}/src/services/{file}`

{核心函数}

## 文件修改清单

| # | 文件 | 操作 | 预期工时 |
|:-:|:----|:----|:-------:|
| 1 | `businesses/{name}/src/{path}` | 新增 | 30min |

## 注意事项

- {事务边界}
- {并发处理}

## 回滚方案

{回退步骤}
