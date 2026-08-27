# {Project Name}

> {一句话描述这个产品做什么}

---

## 快速开始

```bash
# 安装
pnpm install

# 开发
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm typecheck
```

---

## 目录结构

```
├── docs/                         # ★ 稳定层 — 全版本通用产品规划文档
│   ├── product-overview.md       # 产品概览
│   ├── non-functional-reqs.md    # 非功能需求
│   ├── visual-design.md          # 视觉设计规范
│   └── sprints/                  # ★ 版本层 — 每次迭代的完整设计容器
│       ├── _template/            # 模板（含 6 个文档 + 原型）
│       └── sprint-001_功能名/    # 每次迭代一个容器（cp _template 创建）
│
├── apps/                         # 前端/客户端应用
│   ├── {app-name}/
│   └── _template/                # 创建新应用时复制
│
├── businesses/                   # 后端业务服务
│   ├── {service-name}/
│   └── _template/
│
├── tools/                        # 工作流类工具/脚本
│   └── _template/
│
├── scripts/                      # 项目工具脚本
│   ├── bootstrap-project.sh      # ★ 核心脚本：创建新项目/迁移老项目
│   └── make-pptx.js
│
├── ADR/                          # 架构决策记录
│   └── _template/ADR.md
│
├── .gitignore
├── LICENSE
├── AGENTS.md                     # AI 协作规范（开发用）
└── README.md                     # 本文件
```

> **开发规范详见**: `AGENTS.md`（AI 协作入口）和 [ssot-convention.zh.md](https://github.com/Toketec/SpecRocket/blob/main/ssot-convention.zh.md)（完整团队规范，位于 SpecRocket 主仓库）

---

## 技术栈

| 层 | 技术 |
|:---|:-----|
| 前端 | {React / Vue / ...} |
| 后端 | {Node.js / Go / ...} |
| 数据库 | {PostgreSQL / MySQL / ...} |
| 部署 | {Docker / K8s / ...} |

---

## 团队

| 角色 | 负责人 |
|:----|:------|
| PM / 产品 | @{name} |
| TL / 技术 | @{name} |
| Dev / 开发 | @{name} |
| QA / 测试 | @{name} |

---

## 里程碑

| 里程碑 | 时间 | 状态 |
|:------|:----|:----:|
| v1.0 MVP | {日期} | ☐ |
| v1.1 | {日期} | ☐ |
