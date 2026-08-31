<p align="center">
  <img src="https://img.shields.io/badge/status-🚀%20active-brightgreen?style=flat-square" alt="Status">
  <img src="https://img.shields.io/github/license/Toketec/SpecRocket?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/last-commit/Toketec/SpecRocket?style=flat-square" alt="Last Commit">
  <img src="https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square" alt="PRs Welcome">
</p>

<p align="center">
  🇨🇳 <b>中文</b> · <a href="README.en.md">🇬🇧 English</a>
</p>

<h1 align="center">🚀 SpecRocket</h1>

<p align="center">
  <b>规格驱动开发（SDD）框架</b><br>
  <i>一行命令启动 AI 时代的规范项目 —— 任何 AI Agent 即开即用</i>
</p>

<p align="center">
  **👤 Tony Wang (王圣滔)** — FLYKITES AI×Web3 资深技术专家 · 大湾区连续创业者 · 前鼎捷软件资深专家
</p>

<p align="center">
  <a href="#-快速开始">⚡ 快速开始</a> •
  <a href="#-为什么是-specrocket">🎯 为什么</a> •
  <a href="#-五步开发流程">📋 五步流程</a> •
  <a href="#-与同类方案对比">⚔️ 对比</a> •
  <a href="#-适用场景">🏗️ 场景</a> •
  <a href="#-roadmap">🗺️ Roadmap</a>
</p>

<p align="center">
  <a href="https://github.com/Toketec/SpecRocket">
    <img src="https://img.shields.io/github/stars/Toketec/SpecRocket?style=social" alt="Star">
  </a>
  <a href="https://twitter.com/intent/tweet?text=SpecRocket%20-%20Spec-Driven%20Development%20Framework%20for%20the%20AI%20era&url=https://github.com/Toketec/SpecRocket">
    <img src="https://img.shields.io/badge/Tweet-%F0%9F%93%A3-blue?style=social&logo=twitter" alt="Tweet">
  </a>
</p>

---

## 🤯 痛点：AI 时代的开发困局

### 场景一：你 vs AI — 鸡同鸭讲

```
你：  "帮我写个电商结算页面"
AI：  "好的！"  →  洋洋洒洒 2000 行代码

你：  "不对，我说的是 B2B 批发结算，不是零售"
AI：  "好的，重写！"  →  又 2000 行

你：  "等等，支付方式要支持信用证"
AI：  "好的……重新架构……"  →  第三次

一天过去了。代码有了。能上生产吗？不能。
```

### 场景二：Vibecoding 狂欢，维护噩梦

```
PM：  "AI 太好用了，我直接写！"
前 2 周 →  每天交付 3 个功能，老板狂赞
第 1 个月 →  代码堆成山，改个按钮文案要翻 8 个文件
第 2 个月 →  "帮我加个搜索"  →  AI 改了一个地方 → 炸了三个页面
第 3 个月 →  团队决定招个开发来接手
开发：  "这什么鬼？没有目录规范、没有模块边界、没有文档……这活我接不了"
```

> **Vibecoding 的真相：** AI 给了你速度的幻觉，但把结构复杂度转移到了未来。**没有规范的速度 = 技术债加速器。**

### 场景三：传统开发 vs AI 单体巨石

传统开发团队有很好的纪律——模块化、接口定义、代码评审、CI/CD。但遇到 AI 生成的一坨代码：

- 没有模块边界 → 不知道改哪里会炸
- 没有 spec 文档 → 不知道 AI 当时为什么这么写
- 没有验收标准 → 不知道改了之后对不对
- 没有架构记录 → 没人敢动关键路径

> **AI 代码能跑，但团队无法接手。AI 写的是功能，不是产品。**

### 核心问题

**所有问题的根因都一样：人机之间没有「规格契约」**。

AI 不知道你要什么 → 你猜 AI 理解了什么 → 两败俱伤。
AI 写了什么 → 没人懂 → 没人敢改 → 重写。

**SpecRocket 对这个问题的答案：**
> **每个决策都有唯一出处，每个实现都有规格可循。**

---

## 👤 作者的话

我是 **Tony Wang（王圣滔）**。现 FLYKITES PTE LTD（Singapore）AI×Web3 资深技术专家，大湾区连续创业者。

8 年来从企业软件走到 AI Native——前鼎捷软件资深专家，2015 年发起早期互联网跑腿（跑酷/达达）从 0 验证 O2O 配送需求，江苏省品牌学会优秀项目负责人，新加坡国家青年理事会 NYC & Youth Plan 长期合作伙伴。主导多个企业级 AI Native 落地项目，参与 Funtana Web3 社群本地化运营、Pannetwork AI 链上支付（已获融资）。

这一路试遍所有主流方案，踩遍所有坑——最终凝结成 SpecRocket。它不是实验室理论，是我交过的学费换来的答案。

欢迎提 Issue、提 PR，一起让它变得更好。

---

## 🎯 为什么是 SpecRocket

| # | 它解决什么 | 怎么解决的 |
|:-:|:----------|:----------|
| 1 | **AI 上下文丢失** | 五步流程，每步都有产出物，AI 有完整上下文 |
| 2 | **需求反复沟通** | PM 写产品文档 → Dev+AI 写 spec → 评审一次过 |
| 3 | **架构变动无记录** | adrs/ 目录永久留存，新人新 AI 3 分钟看懂全局 |
| 4 | **验收标准不明确** | `check.md` 内置验收清单，AI 自检 + QA 签收 |
| 5 | **Vibecoding 交接灾难** | 五步法保证结构规整，模块边界清晰。AI 写的代码，开发能接手 |
| 6 | **工具锁定** | 不是插件、不是 CLI 依赖，纯文件结构——**任何终端 + Git = 工作** |

> 💡 **它不是又一个脚手架。它是 AI 时代的人机协作协议。**

### 🔮 未来视角：即使 LLM 内化了这套方法论

有一天，LLM 也许会内化 SDD 的全部规则——你只需说"按标准流程来"，它就自动做完一切。

那 SpecRocket 还有用吗？

**有，而且更重要了。** 因为你需要的不是一个"会 SDD 的 AI"，而是一套**团队能看懂的稳定产出物**：

| 场景 | 有 SpecRocket | 没有（AI 黑箱） |
|:----|:-------------|:--------------|
| 📋 **需求交接** | PM 打开 `product-overview.md` 看，和 AI 看到的一样 | 跟着 AI 的口述回忆"上次说了什么" |
| 🧠 **架构变动设计** | adrs/ 目录（一次大型变动一个文件夹）：3 分钟看懂为什么这么设计 | 问 AI："你当初为什么选这个数据库？" |
| 🔍 **代码验收** | Dev 对照 `check.md` 逐条签收 | 盯着 AI 的代码，猜它是不是对的 |
| 👥 **团队分工** | 一次冲刺多个 spec 独立并行，前端后端互不干扰 | 一个文件改了三个模块，谁都不敢动 |
| 🚧 **新人入职** | 读 spec → 看 adrs → 跑 `preview` → 上手 | "先跟 AI 聊一遍项目……" |

**SpecRocket 交付的不只是工作流效率，而是「人能看到、人能审查、人能交接」的实体工作产品。** 这些文件和 Git 一样久，比任何 LLM 的上下文窗口都长。

即使明天所有 AI 都消失了，你的项目结构依然清晰、文档依然完整、团队依然知道该做什么。

> **SpecRocket 的价值不在于教 AI 怎么做事，而在于把人该看的、该管的、该交接的东西，白纸黑字写了下来。**

---

## ⚡ 快速开始

### 📟 手动使用（没有 AI 工具）

```bash
git clone --recursive https://github.com/Toketec/SpecRocket.git
cd SpecRocket
./init.sh "我的项目"   # 或 ./init.sh（在当前目录初始化）
cd 我的项目
```

完成后项目骨架已就位，可手动编辑 `docs/product-overview.md` 开始写产品文档。

> 如果已有克隆，直接 `./init.sh 项目名`（新建目录）或 `./init.sh`（当前目录）即可。

---

### 🤖 AI 使用（有 AI 工具）

先让 AI 装上 SpecRocket skill。安装方式就是让 AI 拿到 `SKILL.md`：

**选你的工具：**

| AI 工具 | 怎么装 skill |
|:--------|:------------|
| **Hermes Agent** | 克隆项目 → `hermes skills install spec-rocket` |
| **Claude Code** | 克隆项目 → 在目录下启动 `claude` → 和 AI 说"安装这个 GitHub 上的 skill" |
| **Trae / Cursor** | 克隆项目 → 用工具打开目录 → 和 AI 说"安装这个 GitHub 上的 skill" |
| **OpenClaw** | 克隆项目 → 在目录下启动 `claw` → 和 AI 说"安装这个 GitHub 上的 skill" |
| **通用提示词方式** | 把 `SKILL.md` 内容复制给 AI 作为系统提示词即可 |
| **其他任意 AI** | 同上——通用方法：把 `SKILL.md` 丢给 AI，告诉它"这是你的工作规范" |

装好后，AI 就知道全部斜杠命令了。接下来看你要做什么：

**场景 A：新项目（空目录）**

```chat
你：帮我进入一个新项目目录
AI：已进入 ~/projects/my-app（空目录）
|→ 你：/spec-rocket init          # 在当前目录初始化
|→ AI：无参 → 在当前目录复制骨架 → git init
|   # 有参：/spec-rocket init "我的项目" → 新建目录并初始化
→ 你：/spec-rocket brainstorm
→ AI：一步步引导你描述产品，自动生成文档
```

**场景 B：已有老项目**

```chat
你：帮我进入 ~/projects/legacy-app
→ 你：/spec-rocket preview
→ AI：分析现有项目，生成全貌预览
→ 你：/spec-rocket migrate
→ AI：重构现有项目（介入 → 理解 → 保持原有设计 → 重构到最新标准）
→ 或：/spec-rocket brainstorm
→ AI：引导你描述产品，生成文档
```

> **斜杠命令是 AI 对话中的快捷指令**，像聊天一样输入，AI 自动识别执行。

---

### 命令一览

| 命令 | 效果 | 多久 | 执行方式 |
|:----|:-----|:-----|:---------|
| `init` | 建空壳 + git init | ⚡ 1 秒 | 📟 手动 / 🤖 斜杠命令 |
| `brainstorm` | 引导式填写产品文档 → 创建 sprint | 💬 5 问 | 🤖 AI 斜杠命令 |
| `migrate` | 项目重构：介入 → 理解 → 保持 → 重构（不区分是否 SpecRocket 项目，保持原有设计不变，重构到最新模板结构，零残留） | 🔄 不碰代码 | 🤖 AI 斜杠命令 |
| `preview` | 生成项目全貌预览页 | 👁️ 即时 | 🤖 AI 斜杠命令 |
| `update` | 一键更新本地 skill（自动检测 AI 工具） | ⚡ 即时 | 📟 手动 / 🤖 斜杠命令 |

---

## 📋 五步开发流程

```
┌────────────────────────────────────────────────────────────────────┐
│ Step 1 │ PM 独作                                                    │
│         │ docs/ + sprints/*/docs/ + prototypes/                     │
│         │ AI 协助润色、画图、生成原型模板                            │
├────────────────────────────────────────────────────────────────────┤
│ Step 2 │ Dev+AI 独作                                                │
│         │ adrs/（一次大型变动一个 adr）+ sprints/*/specs/（多 spec）  │
│         │ Dev 给 4 个方向 (10min) → AI 写完整四文件                  │
├────────────────────────────────────────────────────────────────────┤
│ Step 3 │ PM + Dev 共同                                              │
│         │ PM 审: "方案能满足业务?"  TL 审: "架构合理?"               │
│         │ → 通过 或 打回 Step 2                                    │
├────────────────────────────────────────────────────────────────────┤
│ Step 4 │ AI 按 spec 编码                                            │
│         │ 读 requirements.md + plan.md → 实现 → 自检                 │
├────────────────────────────────────────────────────────────────────┤
│ Step 5 │ Dev 收尾验收                                               │
│         │ 修小bug → 集成 → QA 跑 check.md → 签收                    │
└────────────────────────────────────────────────────────────────────┘
```

**关键设计：** PM 和 Dev 只做 2 件真人决策的事（产品设计 + 评审），其余交给 AI。**AI 按规格编码，不跳步骤、不改方案。**

---

## 📦 仓库结构

```
SpecRocket/
├── SKILL.md          ← 标准 skill 文件（AI 斜杠命令入口）
├── init.sh           ← 手动 init 脚本（无 AI 时用）
├── spec-rocket       ← CLI 脚本（init / update / migrate）
├── ssot-convention.zh.md   ← 完整 SSOT 规范手册（仅主仓库，不进入项目模板）
├── SSOT-开发方法论-培训.pptx ← 培训 PPT（仅主仓库）
├── template/               ← 项目模板框架（init/migrate 复制此目录）
│   ├── AGENTS.md              ← AI 协作规则
│   ├── CLAUDE.md              ← Claude Code 协作规则
│   ├── docs/                  ← 稳定层产品文档模板（含 whitepaper）
│   ├── sprints/_template/     ← 迭代容器模板（docs/ 产品设计 + specs/ 技术规格）
│   ├── adrs/                   ← 架构变动设计模板（adr-YYYYMMDD-名称/，3 份文档）
│   ├── assets/                ← 运营资产模板（configs/interfaces/standards/manuals）
│   ├── apps/businesses/tools/ ← 纯代码域模板（直接放框架项目，无 specs/）
│   └── ...
├── README.md         ← 🇨🇳 中文版
├── README.en.md      ← 🇬🇧 English version
└── LICENSE           ← MIT License
```

---

## ⚔️ 与同类方案对比

| 维度 | **SpecRocket** 🚀 | spec-kit | superpowers | OpenSpec | nx/turborepo |
|:----|:----------------:|:---------:|:-----------:|:--------:|:------------:|
| **定位** | 🎯 轻量 SDD 框架 | 模板生成器 | 提示词集合 | 开放标准 | 构建编排 |
| **绑定** | 🔓 **纯文件+Git** | CLI 必须 | VS Code 独占 | 无绑定 | nx CLI 必须 |
| **AI 独立交付** | ✅ `_template/` 即可 | ❌ 依赖 CLI | ❌ 依赖插件 | ✅ 纯约定 | ❌ |
| **团队角色** | ✅ 五步法明确 | ❌ | ❌ | ❌ | ❌ |
| **迭代支持** | ✅ sprints/NNN | ❌ 单次 | ❌ | ❌ | ❌ |
| **产品文档** | ✅ 完整模板 | ❌ 仅 spec | ❌ | ❌ | ❌ |
| **adrs/架构** | ✅ 内置 | ❌ | ❌ | ❌ | ❌ |
| **验收策略** | ✅ check.md | ❌ | ❌ | ❌ | ❌ |
| **学习成本** | ⭐ **30 分钟** | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ |

**结论：** SpecRocket 是唯一一个**定义团队角色边界、内置迭代机制、可脱离 AI 交付**的 SDD 框架。

---

## 🤖 Agent 兼容性

SpecRocket 设计为 **任何 AI 编码代理均可驱动**。只要你的 AI 工具能读文件，就能用。

| Agent | 识别方式 |
|:------|:---------|
| **Hermes Agent** | `SKILL.md` 标准格式 |
| Claude Code | 导入 `SKILL.md` 内容 |
| Cursor | 导入 `SKILL.md` 内容 |
| Windsurf | 导入 `SKILL.md` 内容 |
| Cline / Roo Code | 导入 `SKILL.md` 内容 |
| Trae | 导入 `SKILL.md` 内容 |
| Codex CLI | 导入 `SKILL.md` 内容 |
| Aider | 导入 `SKILL.md` 内容 |
| OpenClaw | 导入 `SKILL.md` 内容 |

> 不挑 AI，不锁平台。**`SKILL.md` 是通用入口，任何 AI 都可通过注入内容的方式使用。**

---

## 🏗️ 适用场景

| 场景 | 推荐路径 |
|:----|:---------|
| 🆕 **新项目启动** | 📟 手动 `./init.sh` 或 🤖 AI `/spec-rocket init` → 🤖 AI `brainstorm` → 五步流程 |
| 🔄 **现有项目引入 AI 协作** | 🤖 AI `migrate` → 写 adrs → Retrospec |
| ⬆️ **升级到最新方法论** | 📟 `./spec-rocket update` 更新 skill → 对项目执行 `migrate` 升级结构 |
| 🏁 **Hackathon 快速验证** | 📟/🤖 `init` → 跳过 Step 1 → 直接 Step 4 AI 编码 |
| 👥 **团队培训** | 📟 手动 `init` 看骨架 → 读 ssot-convention → PPT |
| 🤖 **AI-only 项目** | 🤖 `/spec-rocket init` → AI 完成其余步骤。Dev 只做评审 |
| 📦 **企业标准化** | 统一项目结构，新人/新 AI 即开即用 |

---

## 🌟 他们正在用

> *"以前带新人要一周，现在丢一个 SpecRocket 项目给他，三小时上手。"*
> — 某 SaaS 团队 Tech Lead

> *"Hackathon 用 SpecRocket，PM 写需求，AI 写代码，我们专注汇报。拿了第一。"*
> — 某大厂内部黑客松冠军团队

> *"从乱糟糟的 monorepo 迁移过来，现在每个模块的边界清晰得可怕。"*
> — 某创业公司 CTO

*(欢迎 [提交你的故事](https://github.com/Toketec/SpecRocket/issues/new)！)*

---

## 🗺️ Roadmap

- [x] `init` / `brainstorm` / `migrate` / `preview` / `update` slash commands
- [x] 五步开发流程 & 完整规范手册
- [x] 中英双语文档结构
- [ ] 英文版 ssot-convention
- [ ] GitHub Actions 模板（CI + spec 校验）
- [ ] VSCode 扩展（一键 init）
- [ ] `retrospec` 子命令（自动分析现有项目 → 生成骨架）
- [ ] Web UI 配置面板

> 想贡献？看 👇

---

## 🤝 参与贡献

SpecRocket 是一个社区驱动的项目。欢迎各种形式的贡献：

- ⭐ **Star 仓库** — 最好的支持
- 🐛 **提 Issue** — 反馈 bug 或建议
- 🔧 **提交 PR** — 代码 / 文档 / 翻译
- 💬 **分享** — 写文章、录视频、发推

```bash
git clone --recursive https://github.com/Toketec/SpecRocket.git
cd SpecRocket
# 改完提 PR！
```

---

## 📚 学习资源

| 资源 | 在哪 | 给谁 |
|:----|:----|:----|
| 📖 **SSOT 完整规范手册** | `ssot-convention.zh.md`（主仓库根目录） | 所有成员首读 |
| 📊 **培训 PPT** | `SSOT-开发方法论-培训.pptx`（主仓库根目录） | 团队内训 |
| 🤖 **AI 协作规范** | `SKILL.md` | AI Agent |
| 📋 **项目演示** | 跑 `/spec-rocket preview` 看！ | 给 PM/老板看 |

---

## ❓ FAQ

### Q1: SpecRocket 是一个 "Harness" 吗？

**不是。** 我们称它为 **SDD Framework（规格驱动开发框架）+ Human-AI Collaboration Protocol（人机协作协议）**。

"Harness" 在软件工程中通常指"约束/封装某物以便控制它"（如 test harness、evaluation harness），有上层支配下层的含义。但 SpecRocket 的设计不是约束 AI——而是**定义角色边界，让各司其职**：

| Harness 的特点 | SpecRocket 的做法 |
|:---------------|:------------------|
| 封装/约束下层 | 不约束 AI，给 AI 干净的上下文 |
| 上层支配下层 | 定义 PM→Dev→AI 的角色边界，非支配 |
| 依赖特定运行时 | 纯文件结构，任何终端+Git 即工作 |
| 替换成本高 | 零工具锁定，AGENTS.md 是通用入口 |

**一句话：SpecRocket 不"套住"AI，它给人和 AI 约定一个双方都遵守的协作协议。** 就像 HTTP 定义了浏览器和服务器的对话方式，SpecRocket 定义了「PM 写文档→Dev 给方向→AI 编码→人验收」的交互流程。

---

### Q2: 不同 AI 工具扫描项目的方式不同，会影响 SpecRocket 的效果吗？

**框架设计已做了三层缓解，总体无需担心。** 但你的担忧合理——文档之前没有明说这件事。

**第一层：不依赖工具能力，依赖文件结构**

SpecRocket 只要求 AI 能做三件事：（1）读 markdown 文件；（2）按指令做文件操作；（3）按 spec 写代码。任何编码代理都支持。它不要求 AI 有特殊的上下文管理或代码理解能力。

**第二层：每个 AI 介入环节都是「有边界的单任务」**

```chat
Step 2: Dev 把 sprint 文档 → 拖到新的 AI 对话（干净上下文）
       → Dev 拆多个 spec（前端/后端/服务分列）→ AI 写 specs 四文件 → PM+Dev 评审
Step 4: AI 只读 requirements.md + plan.md → 编码
```

AI 不需要自己"扫描整个项目"。每个环节的输入和输出都是预先定义好的文件，不同工具的扫描方式差异在这个流程中几乎没有影响。

**第三层：Context Contract（≤15 行）的边界约束**

跨模块依赖被压缩到 ≤15 行，即使不同工具的上下文处理方式有差异，15 行的信息量也不足以产生实际偏差。

**AI 执行补充规则（已在 AGENTS.md 中更新）：**
> AI 禁止自行探索项目目录结构来"理解项目"——必须按固定读顺序逐文件读取。Step 4 编码时严格按 plan.md 的文件清单实现，不自动搜索项目其他位置。

**结论：不是零风险，但框架设计让风险可控。** 真正重要的不是 AI 工具怎么扫描项目，而是 AI 有没有规范可循。而 SpecRocket 给的就是这个规范。

---

**MIT** — 属于 [Toketec](https://github.com/Toketec) 组织。

想干什么干什么。商用、改、二次分发，都可以。

---

<p align="center">
  <b>SpecRocket — 规格驱动开发，让 AI 一次性做对。</b><br>
  <a href="https://github.com/Toketec/SpecRocket">GitHub</a> •
  <a href="https://github.com/Toketec/SpecRocket/issues">Issues</a> •
  <a href="https://github.com/Toketec/SpecRocket/discussions">Discussions</a>
</p>

<p align="center">
  <sub>🔥 如果这个项目对你有帮助，<a href="https://github.com/Toketec/SpecRocket">点个 ⭐</a> 让更多人看到</sub>
</p>
