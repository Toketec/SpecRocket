# SPEC-BIZ-{XXX}: 验收方案

## 🔧 AI 自检

```bash
pnpm typecheck
pnpm build
# API 端点可达
curl -s -o /dev/null -w "%{http_code}" http://localhost:{port}/api/{resource}
```

## 🧪 人工检查

| # | 操作 | 预期结果 |
|:-:|:----|:--------|
| 1 | `curl POST /api/{resource}` | 返回 201 + id |
| 2 | 输入非法参数 | 返回 400 + 错误信息 |
| 3 | 模拟下游超时 | 返回 503 + fallback |

## 回归测试范围

- {可能受影响的 spec 或上游调用方}
