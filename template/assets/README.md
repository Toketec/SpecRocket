# assets/ — 运营资产（Operations Assets）

> 本目录存放**被系统 / 业务 / 外部直接引用**的工程资产，由**运营（Ops）角色**产出与维护。
> This directory holds operational assets directly referenced by the system / business / external parties — owned by the **Ops role**.

| 子目录 | 放什么 | 示例 |
|:-------|:-------|:-----|
| `configs/` | 配置模板库 | `.env.example`、`nginx/`、docker-compose 模板 |
| `interfaces/` | 对外接口文件 | OpenAPI、API 契约、SDK 接口文档 |
| `standards/` | 规范库 | 编码规范、数据字典、术语表 |
| `manuals/` | 说明文档 | 部署手册、运维手册、FAQ |

**判定规则（一句话）：** 该文件是否被代码 / 部署 / 外部系统**直接引用**？
- 是 → 放这里（一等公民，独立存在）
- 否，且是过程文档 → 放 `docs/`（走规范流程）

**角色边界：**
- `docs/` = **PM 产出**（产品规划）
- `apps/` `businesses/` `tools/` specs = **Dev 产出**（技术规格）
- `assets/` = **Ops 产出**（运营资产）

> 一个系统不仅能被实现，还要能被长期运营——部署、配置、对接、手册都是产品的一部分。

**使用约定：**
- 四类**按需取用**，只有实际需要才建，不强制全建
- `docs/` / `specs/` 引用本目录文件时用**相对链接**，不复制内容（SSOT）
- 机器文件（配置/接口）不必双语；文档类（standards/manuals）遵循中英双语惯例
