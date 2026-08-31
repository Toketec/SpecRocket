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
├── docs/                         # ★ 稳定层 — 全版本通用产品文档
│   ├── product-overview.md       # 产品概览
│   ├── non-functional-reqs.md    # 非功能需求
│   ├── visual-design.md          # 视觉设计规范
│   ├── whitepaper.md             # 白皮书（愿景/定位/理念）
│   └── (可选) competition-strategy.md / judge-qa.md
│
├── sprints/                      # ★ 迭代层 — 每次迭代的完整容器
│   ├── _template/                # sprint 模板（docs/ + specs/）
│   └── sp-001_功能名/            # 具体冲刺：docs/（产品设计）+ specs/（技术规格）
│       ├── docs/
│       └── specs/
│           ├── _template/
│           └── spec-001-前端xxx/ # 多个规格共同促成本次迭代（可并行开发）
│
├── adrs/                         # ★ 架构变动设计库（一次大型变动 = 一个文件夹）
│   ├── _template/                # 模板（architecture / data-model / impact）
│   └── adr-20260808-变动名/       # 一次大型变动的完整设计（3 份文档）
│
├── apps/                         # 前端/客户端应用（纯代码域，直接放框架项目）
│   └── {app-name}/
│
├── businesses/                   # 后端业务服务（纯代码域，直接放框架项目）
│   └── {service-name}/
│
├── tools/                        # 工作流类工具/脚本（纯代码域，直接放框架项目）
│   └── {tool-name}/
│
├── assets/                       # ★ 运营资产 — 被系统/业务直接引用的文件
│   ├── configs/                  # 配置模板库（.env.example、nginx 模板）
│   ├── interfaces/               # 对外接口（OpenAPI、API 契约、SDK）
│   ├── standards/                # 规范库（编码规范、数据字典、术语表）
│   └── manuals/                  # 说明文档（部署/运维手册、FAQ）
│
├── scripts/                      # 项目工具脚本
│   ├── bootstrap-project.sh      # ★ 核心脚本：创建新项目/迁移老项目
│   └── make-pptx.js
│
├── .gitignore
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
