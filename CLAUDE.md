# SpecRocket — AI 协作规范

> 用于 Claude Code / Cursor / Windsurf / Cline 等 AI 编码代理。
> 同步自 SKILL.md，保持一致。

## 斜杠命令

| 命令 | 用途 |
|:----|:------|
| `init [项目名]` | 从 template/ 目录复制骨架。**无参=当前目录，有参=新建项目目录** |
| `brainstorm` | 引导用户描述产品 → 按固定顺序生成 5 组文档（产品概览 → 非功能需求 → 视觉设计 → 白皮书 → sprint） |
| `migrate` | ① 给现有项目嵌入骨架；② 旧版项目强制升级到最新模板结构（转移 → 收敛 → 保留 → 删除；最终零残留） |
| `preview` | 扫描项目 → 生成 dark-theme 可视化预览页 |
| `update` | 一键更新本地 skill（自动检测 AI 工具，按工具安装位置同步） |

## `/spec-rocket init` — 建新项目

**做什么：** 从 `template/` 目录（与主仓库共享 .git，非 submodule）复制 SpecRocket 骨架到目标项目，初始化 Git。
**无参时在当前目录初始化，有参时创建项目目录。**

**手动执行（无 AI 时）：**
```bash
./init.sh              # 在当前目录初始化
./init.sh 项目名        # 创建目录并初始化
```

**AI 斜杠命令执行时：**
1. **判断目标：**
   - 无参数 → 在当前目录 `.` 进行初始化
   - 有参数 `项目名` → 创建目录 `项目名` 并进入
2. **获取模板：** 如果当前不在 SpecRocket 仓库内，先 `git clone https://github.com/Toketec/SpecRocket.git` 到临时目录，获取 `template/` 内容
3. 复制 `template/` 全部内容到目标目录
4. 执行 `git init` + 首次提交
5. 完成初始化。告诉用户骨架已就位，建议下一步跑 `/spec-rocket brainstorm` 引导填写产品文档。

---

## 其他命令（概要）

| 命令 | 说明 |
|:----|:------|
| `/spec-rocket brainstorm` | 按固定顺序生成 5 组文档：产品概览 → 非功能需求 → 视觉设计 → 白皮书 → sprint |
| `/spec-rocket migrate` | 给现有项目嵌入骨架 / 旧版项目升级到最新模板结构（转移 → 收敛 → 保留 → 删除；旧 sprint 文档→新 sprint 容器、模块 specs→迭代 specs、ADR→adrs） |
| `/spec-rocket preview` | 生成 dark-theme 可视化预览页 → `docs/preview.html` |
| `/spec-rocket update` | 一键更新本地 skill（自动检测 AI 工具） |
| `./spec-rocket` (CLI) | 脚本方式执行 init / update / migrate |

## 角色与产出目录

| 角色 | 产出目录 | 说明 |
|:----|:--------|:----|
| 👤 PM | `docs/` + `sprints/*/docs/` | 产品概览/非功能/视觉/白皮书 + 冲刺产品设计 |
| 🔧 Dev | `adrs/` + `sprints/*/specs/` + 代码 | 架构决策 + 迭代内规格（多个 spec 共同促成本次迭代）+ 实现 |
| 🛠️ Ops | `assets/` | 运营资产（被系统/业务直接引用） |

## 迭代容器（sprints/）

一次冲刺 = 一个完整容器：`sprints/sp-NNN-名称/` 内含 `docs/`（PM 产品设计）+ `specs/`（Dev 技术规格，多个 spec 共同促成本次迭代，可并行开发）。

**规格拆分原则**: 解耦、拆解、相互独立以便并行开发且互不干扰（前端/后端分列、不同服务分列）；颗粒度以「解耦 + 提升 token 利用率减少幻觉」为上限，**不刻意多拆**，方便管理为下限。

## 架构决策（adrs/）

`adrs/` 存放全局架构决策记录（`adr-NNN-名称.md`），**不随 sprint 走**——不一定每次都改架构，历史累积跨迭代生效。AI 首次进入项目先读 `adrs/` 理解全局。

## 运营资产（assets/）

`assets/` 存放**被系统/业务直接引用的工程资产**（配置模板、对外接口、规范库、说明手册），由 **Ops 运营角色**产出与维护。

- 四类按需取用：`configs/`（配置模板）、`interfaces/`（对外接口）、`standards/`（规范库）、`manuals/`（说明文档）
- docs/specs 引用本目录文件用**相对链接**，不复制内容（SSOT）
- 详见模板内 `assets/README.md`
