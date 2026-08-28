<p align="center">
  <img src="https://img.shields.io/badge/status-🚀%20active-brightgreen?style=flat-square" alt="Status">
  <img src="https://img.shields.io/github/license/Toketec/SpecRocket?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/last-commit/Toketec/SpecRocket?style=flat-square" alt="Last Commit">
  <img src="https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square" alt="PRs Welcome">
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> · 🇬🇧 <b>English</b>
</p>

<h1 align="center">🚀 SpecRocket</h1>

<p align="center">
  <b>Spec-Driven Development (SDD) Framework</b><br>
  <i>One command to bootstrap a spec-first project — works with any AI coding agent, out of the box.</i>
</p>

<p align="center">
  <b>👤 Tony Wang (王圣滔)</b> — AI×Web3 at FLYKITES · Serial entrepreneur · Former senior expert at Digiwin Software
</p>

<p align="center">
  <a href="#-quick-start">⚡ Quick Start</a> •
  <a href="#-why-specrocket">🎯 Why</a> •
  <a href="#-the-5-step-development-flow">📋 The 5-Step Flow</a> •
  <a href="#-comparison-with-alternatives">⚔️ Comparison</a> •
  <a href="#-use-cases">🏗️ Use Cases</a> •
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

## 🤯 The Problem: AI Development Chaos

### Scene 1: You vs AI — Talking Past Each Other

```
You:  "Build me an e-commerce checkout page"
AI:   "Sure!"  →  2000 lines of code

You:  "No, I said B2B wholesale checkout, not retail"
AI:   "OK, rewrite!"  →  Another 2000 lines

You:  "And we need letter of credit support"
AI:   "OK… restructure…"  →  Third time's the charm

A day later. Code exists. Can it ship? No.
```

### Scene 2: Vibecoding Party, Maintenance Nightmare

```
PM:   "AI is amazing, I'll code directly!"
Week 1-2 →  3 features/day, boss is thrilled
Month 1  →  Code mountain, changing a button needs 8 files
Month 2  →  "Add search" → AI changes one thing → 3 pages break
Month 3  →  Team hires a developer to take over
Dev:     "What is this? No conventions, no boundaries, no docs… I'm out"
```

> **The truth about vibecoding:** AI gives you the illusion of speed but shifts complexity to the future. **Speed without standards = technical debt accelerator.**

### The Core Problem

**Every root cause is the same: no "spec contract" between human and machine.**

AI doesn't know what you want → you guess what AI understood → lose-lose.
AI wrote something → nobody understands → nobody dares to touch → rewrite.

**SpecRocket's answer:**
> **Every decision has a single source of truth. Every implementation has a spec to follow.**

---

## 👤 Author's Note

I'm **Tony Wang (王圣滔)**. AI×Web3 Senior Technical Expert at FLYKITES PTE LTD (Singapore), serial entrepreneur in the Greater Bay Area.

8 years from enterprise software to AI Native — former Senior Expert at Digiwin Software. Led multiple enterprise-grade AI Native projects, participated in Funtana Web3 community operations, Pannetwork AI on-chain payments (funded).

I've tried every mainstream approach and hit every wall — SpecRocket is the distillation. Not a lab theory, but an answer paid for with tuition.

Issues and PRs welcome.

---

## 🎯 Why SpecRocket

| # | Problem | Solution |
|:-:|:--------|:---------|
| 1 | **AI context loss** | 5-step flow, each step produces artifacts, AI has full context |
| 2 | **Endless requirements back-and-forth** | PM writes product docs → Dev+AI write spec → one review pass |
| 3 | **Architecture decisions lost** | ADR directory persists forever — newcomers and new AIs understand the full picture in 3 minutes |
| 4 | **Unclear acceptance criteria** | `check.md` built-in checklist — AI self-checks + QA signs off |
| 5 | **Vibecoding handover disaster** | 5-step guarantees structured code with clear module boundaries. Code written by AI, handled by devs |
| 6 | **Tool lock-in** | Not a plugin, not a CLI dependency — pure file structure. **Any terminal + Git = it works** |

> 💡 **It's not just another scaffold. It's a human-AI collaboration protocol for the AI era.**

---

## ⚡ Quick Start

### 📟 Manual (no AI tools)

```bash
git clone --recursive https://github.com/Toketec/SpecRocket.git
cd SpecRocket
./init.sh "my-project"    # or ./init.sh (init in current directory)
cd my-project
```

The project skeleton is ready. You can edit `docs/product-overview.md` to start writing product docs.

> If you already have a clone, just run `./init.sh project-name` (new dir) or `./init.sh` (current dir).

---

### 🤖 AI (with AI agent)

First, get SpecRocket's skill installed. The skill file is `SKILL.md` — the universal entry point for any AI agent.

**Pick your tool:**

| AI Tool | How to install the skill |
|:--------|:------------------------|
| **Hermes Agent** | Clone → `hermes skills install spec-rocket` |
| **Claude Code** | Clone → run `claude` in the dir → tell AI "install this GitHub skill" |
| **Trae / Cursor** | Clone → open dir in the tool → tell AI "install this GitHub skill" |
| **OpenClaw** | Clone → run `claw` in the dir → tell AI "install this GitHub skill" |
| **Prompt-based (universal)** | Copy the `SKILL.md` content into your AI as system prompt |
| **Any other AI** | Same — feed `SKILL.md` to your AI and say "this is your workflow spec" |

Once installed, the AI knows all slash commands. Now choose your scenario:

**Scenario A: New project (empty directory)**

```chat
You: Enter a new empty directory
AI: Now in ~/projects/my-app (empty)
|→ You: /spec-rocket init         # init in current directory
|→ AI: No arg → copies skeleton to current dir → git init
|   # With arg: /spec-rocket init "my-project" → creates dir + init
→ You: /spec-rocket brainstorm
→ AI: 5 questions → generates product docs + sprint
```

**Scenario B: Existing project**

```chat
You: Enter ~/projects/legacy-app
→ You: /spec-rocket preview
→ AI: Analyzes the project → generates full overview
→ You: /spec-rocket migrate
→ AI: Embeds skeleton (zero code change)
→ Or: /spec-rocket brainstorm
→ AI: Guides you to describe the product → generates docs
```

> **Slash commands are shortcuts in AI chat.** Just type them like you're chatting — the AI executes them automatically.

---

### Command Overview

| Command | What it does | How long | Execution |
|:--------|:-------------|:---------|:----------|
| `init` | Bootstrap skeleton + git init | ⚡ 1 second | 📟 Manual / 🤖 Slash command |
| `brainstorm` | Guided product doc → sprint creation | 💬 5 questions | 🤖 AI slash command |
| `migrate` | Embed skeleton / upgrade legacy project to latest structure (non-template files: first fold into docs, else into assets) | 🔄 Zero code touch | 🤖 AI slash command |
| `preview` | Generate full project overview page | 👁️ Instant | 🤖 AI slash command |
| `update` | One-click update local skill (auto-detect AI tools) | ⚡ Instant | 📟 Manual / 🤖 Slash command |

---

## 📋 The 5-Step Development Flow

```
┌────────────────────────────────────────────────────────────────────┐
│ Step 1 │ PM solo                                                   │
│         │ docs/ + sprints/ + prototypes/                          │
│         │ AI assists with polish, diagrams, prototype templates   │
├────────────────────────────────────────────────────────────────────┤
│ Step 2 │ Dev+AI solo                                               │
│         │ ADR/ + {apps|biz|tools}/*/specs/                        │
│         │ Dev gives 4 directions (10min) → AI writes 4 files      │
├────────────────────────────────────────────────────────────────────┤
│ Step 3 │ PM + Dev review                                          │
│         │ PM: "Does the spec solve the business need?"            │
│         │ TL: "Is the architecture sound?"                        │
│         │ → Pass or back to Step 2                                │
├────────────────────────────────────────────────────────────────────┤
│ Step 4 │ AI codes per spec                                        │
│         │ Read requirements.md + plan.md → implement → self-test   │
├────────────────────────────────────────────────────────────────────┤
│ Step 5 │ Dev final review                                         │
│         │ Fix bugs → integration → QA runs check.md → sign off    │
└────────────────────────────────────────────────────────────────────┘
```

**Key design:** PM and Dev only do 2 real decision-making tasks (product design + review). Everything else is AI. **AI codes per spec, no skipping steps, no changing plans.**

---

## 📦 Repository Structure

```
SpecRocket/
├── SKILL.md          ← Standard skill file (AI slash command entry)
├── init.sh           ← Manual init script (no AI)
├── spec-rocket       ← CLI script (init / update / migrate)
├── template/               ← Project template framework
│   ├── AGENTS.md              ← AI collaboration rules
│   ├── CLAUDE.md              ← Claude Code collaboration rules
│   ├── docs/                  ← Product doc templates
│   ├── ADR/                   ← Architecture decision record templates
│   ├── assets/                ← Operations asset templates (configs/interfaces/standards/manuals)
│   ├── apps/businesses/tools/ ← Module templates
│   └── ...
├── README.md         ← 🇨🇳 Chinese version
├── README.en.md      ← 🇬🇧 English version
└── LICENSE           ← MIT License
```

---

## ⚔️ Comparison with Alternatives

| Dimension | **SpecRocket** 🚀 | spec-kit | superpowers | OpenSpec | nx/turborepo |
|:----|:----------------:|:---------:|:-----------:|:--------:|:------------:|
| **Focus** | 🎯 Lightweight SDD framework | Template generator | Prompt collection | Open standard | Build orchestrator |
| **Lock-in** | 🔓 **Pure files + Git** | CLI required | VS Code exclusive | None | nx CLI required |
| **AI-independent delivery** | ✅ Just `_template/` | ❌ CLI required | ❌ Plugin required | ✅ Convention only | ❌ |
| **Team roles** | ✅ 5-step method | ❌ | ❌ | ❌ | ❌ |
| **Iteration support** | ✅ sprints/NNN | ❌ One-shot | ❌ | ❌ | ❌ |
| **Product documentation** | ✅ Complete templates | ❌ Spec only | ❌ | ❌ | ❌ |
| **ADR/Architecture** | ✅ Built-in | ❌ | ❌ | ❌ | ❌ |
| **Acceptance strategy** | ✅ check.md | ❌ | ❌ | ❌ | ❌ |
| **Learning curve** | ⭐ **30 minutes** | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ |

**Bottom line:** SpecRocket is the only SDD framework that **defines team role boundaries, has built-in iteration support, and works without AI.**

---

## 🤖 Agent Compatibility

SpecRocket works with **any AI coding agent**. As long as your AI can read files, it can use SpecRocket.

| Agent | How it reads the skill |
|:------|:----------------------|
| **Hermes Agent** | Native `SKILL.md` format |
| Claude Code | Import `SKILL.md` content |
| Cursor | Import `SKILL.md` content |
| Windsurf | Import `SKILL.md` content |
| Cline / Roo Code | Import `SKILL.md` content |
| Trae | Import `SKILL.md` content |
| Codex CLI | Import `SKILL.md` content |
| Aider | Import `SKILL.md` content |
| OpenClaw | Import `SKILL.md` content |

> **`SKILL.md` is the universal entry point.** Any AI can use it by injecting the content.

---

## 🏗️ Use Cases

| Scenario | Recommended path |
|:----|:---------|
| 🆕 **New project** | 📟 Manual `./init.sh` or 🤖 AI `/spec-rocket init` → 🤖 `brainstorm` → 5-step flow |
| 🔄 **Existing project + AI** | 🤖 AI `migrate` → write ADR → Retrospec |
| ⬆️ **Upgrade to latest methodology** | 📟 `./spec-rocket update` → run `migrate` on project to upgrade structure |
| 🏁 **Hackathon** | 📟/🤖 `init` → skip Step 1 → Step 4 AI coding |
| 👥 **Team training** | 📟 Manual `init` → read ssot-convention → PPT |
| 🤖 **AI-only project** | 🤖 `/spec-rocket init` → AI does the rest. Dev only reviews |

---

## 🗺️ Roadmap

- [x] `init` / `brainstorm` / `migrate` / `preview` / `update` slash commands
- [x] 5-step development flow & complete spec handbook
- [x] Bilingual (Chinese + English) documentation
- [ ] English ssot-convention
- [ ] GitHub Actions templates (CI + spec validation)
- [ ] VSCode extension (one-click init)
- [ ] `retrospec` command (auto-analyze existing project → generate skeleton)
- [ ] Web UI configuration panel

---

## 🤝 Contributing

SpecRocket is a community-driven project. Contributions welcome:

- ⭐ **Star the repo** — best support
- 🐛 **Open an Issue** — bugs & suggestions
- 🔧 **Submit a PR** — code, docs, translations
- 💬 **Share** — write, record, tweet

```bash
git clone --recursive https://github.com/Toketec/SpecRocket.git
cd SpecRocket
# Make changes and PR!
```

---

## ❓ FAQ

### Q1: Is SpecRocket a "Harness"?

**No.** We call it an **SDD Framework + Human-AI Collaboration Protocol**.

"Harness" in software engineering typically means "constrain/wrap something to control it" (test harness, evaluation harness), implying top-down control. SpecRocket doesn't constrain AI — it **defines role boundaries so everyone (including AI) can do their best work**:

| Harness trait | SpecRocket approach |
|:-------------|:-------------------|
| Wraps/constrains the lower layer | Gives AI clean context, doesn't constrain it |
| Top controls bottom | Defines PM→Dev→AI roles, not control |
| Depends on a specific runtime | Pure file structure, any terminal + Git works |
| High replacement cost | Zero tool lock-in, AGENTS.md is a universal entry point |

**In short: SpecRocket doesn't "harness" AI. It defines a protocol that humans and AI both follow.** Like HTTP defines how browsers and servers talk, SpecRocket defines the "PM writes docs → Dev gives directions → AI codes → Human reviews" interaction flow.

---

### Q2: Different AI tools scan projects differently — does this affect SpecRocket?

**The framework design has three built-in mitigations, so generally, no.** But your concern is valid — the docs hadn't addressed this explicitly before.

**Layer 1: Depends on file structure, not tool capabilities**

SpecRocket only requires an AI to: (1) read markdown files, (2) perform file operations per instructions, (3) code per spec. Every coding agent does these. No special context management or code understanding is required.

**Layer 2: Every AI touch-point is a "bounded single task"**

```chat
Step 2: Dev drops sprint docs → into a fresh AI conversation (clean context)
       → AI writes 4 spec files → PM+Dev review
Step 4: AI reads only requirements.md + plan.md → codes
```

The AI never needs to "scan the whole project" on its own. Every step's input and output are pre-defined files. Differences in how tools scan directories have almost no impact on this flow.

**Layer 3: Context Contract (≤15 lines) boundary**

Cross-module dependencies are compressed to ≤15 lines. Even with different context handling, 15 lines isn't enough data to produce meaningful deviation.

**AI execution rule (updated in AGENTS.md):**
> AI MUST NOT explore the project directory structure on its own to "understand" the project — it must follow the prescribed reading order file by file. During Step 4 coding, implement strictly per plan.md's file list; do not auto-search other parts of the project.

**Bottom line: not zero risk, but the framework makes the risk controllable.** What matters isn't how an AI tool scans a project — it's whether the AI has a spec to follow. SpecRocket gives it that spec.

---



Do whatever you want. Commercial use, modification, redistribution — all allowed.

---

<p align="center">
  <b>SpecRocket — Spec-Driven Development. Get it right the first time.</b><br>
  <a href="https://github.com/Toketec/SpecRocket">GitHub</a> •
  <a href="https://github.com/Toketec/SpecRocket/issues">Issues</a> •
  <a href="https://github.com/Toketec/SpecRocket/discussions">Discussions</a>
</p>

<p align="center">
  <sub>🔥 If this project helps you, <a href="https://github.com/Toketec/SpecRocket">⭐ star it</a> to help others find it.</sub>
</p>
