# SPEC-APP-{XXX}: 验收方案

## 🔧 AI 自检

```bash
pnpm typecheck
pnpm build
# 如已启动 dev server
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/{path}
```

## 🧪 人工检查

| # | 操作 | 预期结果 |
|:-:|:----|:--------|
| 1 | 打开 {页面} | {视觉描述} |
| 2 | 输入 {内容}，点击 {按钮} | {结果描述} |
| 3 | 断网后操作 | {错误状态描述} |

## 回归测试范围

- {可能受影响的 spec 或模块}
