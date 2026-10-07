#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const startedAt = performance.now();
const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const matrixPath = join(root, "governance/methodology-expressions.json");
const matrix = JSON.parse(readFileSync(matrixPath, "utf8"));
const failures = [];
const cache = new Map();

function fail(message) {
  failures.push(message);
}

function decodeXml(text) {
  return text
    .replace(/<a:br\s*\/>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ");
}

function expressionText(name) {
  if (cache.has(name)) return cache.get(name);
  const expression = matrix.expressions[name];
  if (!expression) {
    fail(`表达矩阵引用了未定义表达: ${name}`);
    return "";
  }
  const absolutePath = join(root, expression.path);
  let text;
  try {
    if (expression.type === "pptx") {
      text = decodeXml(
        execFileSync("unzip", ["-p", absolutePath, "ppt/slides/slide*.xml"], {
          encoding: "utf8",
          maxBuffer: 32 * 1024 * 1024,
        }),
      );
    } else {
      text = readFileSync(absolutePath, "utf8");
    }
  } catch (error) {
    fail(`无法读取表达 ${name} (${expression.path}): ${error.message}`);
    text = "";
  }
  cache.set(name, text);
  return text;
}

for (const [name] of Object.entries(matrix.expressions)) {
  expressionText(name);
}

for (const concept of matrix.concepts) {
  for (const [expressionName, requirement] of Object.entries(concept.coverage)) {
    const text = expressionText(expressionName).toLocaleLowerCase();
    for (const needle of requirement.allOf ?? []) {
      if (!text.includes(needle.toLocaleLowerCase())) {
        fail(`${concept.id}: ${expressionName} 缺少语义锚点“${needle}”`);
      }
    }
  }
}

const requiredTemplateFiles = [
  "template/AGENTS.md",
  "template/CLAUDE.md",
  "template/README.md",
  "template/docs/product-overview.md",
  "template/docs/non-functional-reqs.md",
  "template/docs/visual-design.md",
  "template/docs/whitepaper.md",
  "template/sprints/_template/specs/_template/requirements.md",
  "template/sprints/_template/specs/_template/plan.md",
  "template/sprints/_template/specs/_template/tasks.md",
  "template/sprints/_template/specs/_template/check.md",
];
for (const path of requiredTemplateFiles) {
  try {
    if (!statSync(join(root, path)).isFile()) fail(`模板缺少文件: ${path}`);
  } catch {
    fail(`模板缺少文件: ${path}`);
  }
}

const skillVersion = expressionText("skill").match(/^version:\s*([^\s]+)$/m)?.[1];
const cliVersion = expressionText("cli").match(/^VERSION="([^"]+)"$/m)?.[1];
if (!skillVersion || !cliVersion || skillVersion !== cliVersion) {
  fail(`版本不一致: SKILL=${skillVersion ?? "缺失"}, CLI=${cliVersion ?? "缺失"}`);
}

for (const rule of matrix.agentPortability.universalEntrypoints) {
  const text = expressionText(rule.expression).toLocaleLowerCase();
  for (const needle of rule.allOf ?? []) {
    if (!text.includes(needle.toLocaleLowerCase())) {
      fail(`Agent 通用入口 ${rule.expression} 缺少“${needle}”`);
    }
  }
  for (const needle of rule.noneOf ?? []) {
    if (text.includes(needle.toLocaleLowerCase())) {
      fail(`Agent 通用入口 ${rule.expression} 不得绑定“${needle}”`);
    }
  }
}

for (const bridge of matrix.agentPortability.vendorBridges) {
  const text = expressionText(bridge.expression);
  if (!text.includes(bridge.mustReference)) {
    fail(`${bridge.expression} 未引用通用入口 ${bridge.mustReference}`);
  }
  if (text.split("\n").length > bridge.maxLines) {
    fail(`${bridge.expression} 超过 ${bridge.maxLines} 行，不再是精简桥接层`);
  }
  for (const needle of bridge.noneOf ?? []) {
    if (text.includes(needle)) {
      fail(`${bridge.expression} 重复定义了通用规则“${needle}”`);
    }
  }
}

const forbiddenMetadata = /^\s*>?\s*\*\*(最近变更|最后更新|最新更新|文档状态|生命周期状态|状态)\*\*[：:]|^#{1,6}\s+(评审记录|变更记录|修订历史|生命周期状态|版本路线图)\s*$/m;
function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else files.push(absolute);
  }
  return files;
}
for (const absolute of walk(root).filter((path) => path.endsWith(".md"))) {
  const path = relative(root, absolute);
  if (/\/specs\/.*\/(tasks|check)\.md$/.test(path)) continue;
  if (forbiddenMetadata.test(readFileSync(absolute, "utf8"))) {
    fail(`${path} 含禁止维护的文档状态或历史字段`);
  }
}

const englishStatus = expressionText("readme_en").match(/## .*Project Status([\s\S]*?)(?=\n## |$)/)?.[1] ?? "";
if (/^\s*[-*]\s+\[[ xX]\]/m.test(englishStatus)) {
  fail("README.en.md 不应复制项目进度清单，只能引用 README.md");
}

for (const absolute of walk(root)) {
  const path = relative(root, absolute).replaceAll("\\", "/");
  if (/\/assets\/interfaces\/(v\d+|current|latest|20\d{2}[-_]?\d{2}[-_]?\d{2})(\/|$)/i.test(`/${path}`)) {
    fail(`公共契约不得按版本、日期、current 或 latest 目录保存: ${path}`);
  }
}

for (const [name, text] of cache) {
  if (text.includes("DOC-GOVERNANCE:START") || text.includes("DOC-GOVERNANCE:END")) {
    fail(`${name} 仍含旧的公共文字生成标记`);
  }
}

if (expressionText("training").includes("sprints/*/sprints/*/specs/")) {
  fail("培训 PPT 含重复路径 sprints/*/sprints/*/specs/");
}

const checkerSource = readFileSync(fileURLToPath(import.meta.url), "utf8");
for (const dependency of matrix.agentPortability.localSelfCheck.forbiddenRuntimeDependencies) {
  if (checkerSource.includes(dependency)) {
    fail(`一致性检查脚本含平台或网络运行时依赖“${dependency}”`);
  }
}

const elapsedMs = performance.now() - startedAt;
if (elapsedMs > matrix.agentPortability.localSelfCheck.maxDurationMs) {
  fail(`一致性检查耗时 ${Math.round(elapsedMs)}ms，超过 ${matrix.agentPortability.localSelfCheck.maxDurationMs}ms 本地自检上限`);
}

if (failures.length > 0) {
  console.error("方法论多表达一致性检查失败：");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(
  `方法论多表达一致性检查通过：${matrix.concepts.length} 个核心概念，` +
  `${Object.keys(matrix.expressions).length} 种表达，${matrix.agentPortability.universalEntrypoints.length} 个 Agent 通用入口，` +
  `本地耗时 ${Math.round(elapsedMs)}ms。`,
);
