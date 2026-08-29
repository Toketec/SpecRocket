# SPEC-TOOL-{XXX}: {工具/工作流名称}

> **编写者**: Dev
> **所属工具**: `tools/{tool-name}/`
> **规格路径**: `tools/{tool-name}/specs/SPEC-TOOL-{XXX}_{工具名称}/`（新建规格 = `cp specs/_template/ specs/SPEC-TOOL-{XXX}_{工具名称}/`）
> **基于冲刺**: `sprints/sprint-NNN/SPRINT-features.md` 中的功能 F{X}

## 问题

{这个工具要解决什么实际问题}

## 技术方案

### 输入/输出

```
输入: {数据格式或参数}
处理: {核心逻辑简述}
输出: {结果格式}
```

### 关键代码路径

{函数签名 + 核心算法或工作流描述}

## 验证方式

```bash
# 运行命令
{command} --input {test-data}
# 期望输出
{expected output}
```

## 注意事项

- {边界情况}
- {环境依赖}

## 生命周期状态

> 当前: **draft** → review → approved → active → done → archived
