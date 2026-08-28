# SpecRocket — AI 协作规范

> 用于 Claude Code / Cursor / Windsurf / Cline 等 AI 编码代理。
> 同步自 SKILL.md，保持一致。

## 斜杠命令

| 命令 | 用途 |
|:----|:------|
| `init [项目名]` | 从 template/ 目录复制骨架。**无参=当前目录，有参=新建项目目录** |
| `brainstorm` | 引导用户描述产品 → 按固定顺序生成 4 组文档（产品概览 → 非功能需求 → 视觉设计 → sprint） |
| `migrate` | ① 给现有项目嵌入骨架；② 旧版项目强制升级到最新模板结构（内容转移） |
| `preview` | 扫描项目 → 生成 dark-theme 可视化预览页 |
| `update` | 一键更新本地 skill（自动检测 AI 工具，按工具安装位置同步） |

## `/spec-rocket init` — 建新项目

**做什么：** 从 `template/` submodule 复制 SpecRocket 骨架到目标项目，初始化 Git。
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
2. **获取模板：** 如果当前不在 SpecRocket 仓库内，先 `git clone --recursive https://github.com/Toketec/SpecRocket.git` 到临时目录，获取 `template/` 内容
3. 复制 `template/` 全部内容到目标目录
4. 执行 `git init` + 首次提交
5. 完成初始化。告诉用户骨架已就位，建议下一步跑 `/spec-rocket brainstorm` 引导填写产品文档。

---

## 其他命令（概要）

| 命令 | 说明 |
|:----|:------|
| `/spec-rocket brainstorm` | 按固定顺序生成 4 组文档：产品概览 → 非功能需求 → 视觉设计 → sprint |
| `/spec-rocket migrate` | 给现有项目嵌入骨架 / 旧版项目升级到最新模板结构（含 assets/ 运营资产骨架补齐） |
| `/spec-rocket preview` | 生成 dark-theme 可视化预览页 → `docs/preview.html` |
| `/spec-rocket update` | 一键更新本地 skill（自动检测 AI 工具） |
| `./spec-rocket` (CLI) | 脚本方式执行 init / update / migrate |

## 运营资产（assets/）

`assets/` 存放**被系统/业务直接引用的工程资产**（配置模板、对外接口、规范库、说明手册），由 **Ops 运营角色**产出与维护。角色边界：`docs/` = PM 产出，`specs/` = Dev 产出，`assets/` = Ops 产出。

- 四类按需取用：`configs/`（配置模板）、`interfaces/`（对外接口）、`standards/`（规范库）、`manuals/`（说明文档）
- docs/specs 引用本目录文件用**相对链接**，不复制内容（SSOT）
- 详见模板内 `assets/README.md`
