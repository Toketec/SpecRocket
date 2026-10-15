#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cli = join(root, "spec-rocket");
const template = join(root, "template");
const sandbox = mkdtempSync(join(tmpdir(), "specrocket-regression-"));
const startedAt = Date.now();

function run(args, options = {}) {
  const result = spawnSync("bash", [cli, ...args], {
    cwd: options.cwd ?? sandbox,
    encoding: "utf8",
    timeout: 20_000,
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "SpecRocket Regression",
      GIT_AUTHOR_EMAIL: "regression@localhost",
      GIT_COMMITTER_NAME: "SpecRocket Regression",
      GIT_COMMITTER_EMAIL: "regression@localhost",
      ...options.env,
    },
  });
  assert.equal(
    result.status,
    0,
    `命令失败: spec-rocket ${args.join(" ")}\n${result.stdout}\n${result.stderr}`,
  );
  return `${result.stdout}\n${result.stderr}`;
}

function filesUnder(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(absolute));
    else files.push(absolute);
  }
  return files;
}

try {
  const help = run(["help"]);
  assert.match(help, /SpecRocket CLI v4\.0\.1/);

  const generated = join(sandbox, "generated");
  run(["init", "generated"]);
  for (const source of filesUnder(template)) {
    const path = relative(template, source);
    const target = join(generated, path);
    assert.equal(statSync(target).isFile(), true, `init 缺少模板文件: ${path}`);
    assert.deepEqual(readFileSync(target), readFileSync(source), `init 改变了模板文件: ${path}`);
  }
  rmSync(join(generated, "CLAUDE.md"));
  assert.equal(statSync(join(generated, "AGENTS.md")).isFile(), true);
  assert.equal(statSync(join(generated, "sprints", "_template")).isDirectory(), true);
  for (const file of ["architecture.md", "data-model.md", "runtime.md"]) {
    assert.equal(statSync(join(generated, "architecture", file)).isFile(), true);
  }
  assert.equal(statSync(join(generated, "architecture", "adrs", "_template.md")).isFile(), true);

  const legacy = join(sandbox, "legacy");
  mkdirSync(join(legacy, "docs", "sprints", "sprint-001_demo"), { recursive: true });
  writeFileSync(join(legacy, "docs", "sprints", "sprint-001_demo", "overview.md"), "# Demo\n");
  mkdirSync(
    join(legacy, "docs", "sprints", "sprint-001_demo", "specs", "spec-003-old"),
    { recursive: true },
  );
  writeFileSync(
    join(
      legacy,
      "docs",
      "sprints",
      "sprint-001_demo",
      "specs",
      "spec-003-old",
      "requirements.md",
    ),
    "# Old embedded spec\n",
  );
  mkdirSync(join(legacy, "ADR"), { recursive: true });
  writeFileSync(join(legacy, "ADR", "ADR-001_auth.md"), "# Old v2 decision\n");
  mkdirSync(join(legacy, "adrs"), { recursive: true });
  writeFileSync(join(legacy, "adrs", "adr-cache.md"), "# Cache decision\n");
  mkdirSync(join(legacy, "adrs", "adr-20260808-orders"), { recursive: true });
  for (const file of ["architecture.md", "data-model.md", "impact.md"]) {
    writeFileSync(join(legacy, "adrs", "adr-20260808-orders", file), `# ${file}\n`);
  }
  mkdirSync(join(legacy, "sprints", "sp-002-staged", "specs", "spec-001-ui"), {
    recursive: true,
  });
  writeFileSync(
    join(legacy, "sprints", "sp-002-staged", "specs", "spec-001-ui", "requirements.md"),
    "# Legacy spec\n",
  );
  mkdirSync(join(legacy, "docs", "sprints", "sprint-009_conflict"), { recursive: true });
  writeFileSync(
    join(legacy, "docs", "sprints", "sprint-009_conflict", "old.md"),
    "# Old conflict content\n",
  );
  mkdirSync(join(legacy, "sprints", "sp-009-conflict", "docs"), { recursive: true });
  writeFileSync(
    join(legacy, "sprints", "sp-009-conflict", "docs", "current.md"),
    "# Current conflict content\n",
  );
  mkdirSync(join(legacy, "architecture"), { recursive: true });
  writeFileSync(join(legacy, "architecture", "README.md"), "# Legacy architecture index\n");
  mkdirSync(join(legacy, "architecture", "diagrams"), { recursive: true });
  writeFileSync(join(legacy, "architecture", "diagrams", "system.md"), "# Legacy diagram\n");
  run(["migrate", legacy]);
  assert.equal(
    readFileSync(join(legacy, "sprints", "sp-001-demo", "docs", "overview.md"), "utf8"),
    "# Demo\n",
  );
  assert.equal(
    readFileSync(
      join(legacy, "sprints", "sp-001-demo", "specs", "spec-003-old", "requirements.md"),
      "utf8",
    ),
    "# Old embedded spec\n",
  );
  assert.equal(
    existsSync(join(legacy, "sprints", "sp-001-demo", "docs", "specs")),
    false,
    "migrate 不得把旧 specs 重复复制到新 sprint 的 docs/",
  );
  const migratedV2Adr = readdirSync(join(legacy, "architecture", "adrs")).find(
    (name) => /^adr-\d{8}-001-auth\.md$/.test(name),
  );
  assert.ok(migratedV2Adr, "migrate 未迁移 v2 ADR 单文件");
  assert.equal(
    readFileSync(join(legacy, "architecture", "adrs", migratedV2Adr), "utf8"),
    "# Old v2 decision\n",
  );
  assert.equal(
    readFileSync(join(legacy, "architecture", "adrs", "adr-cache.md"), "utf8"),
    "# Cache decision\n",
    "migrate 未保留单文件 ADR",
  );
  const legacyAdr = join(
    legacy,
    "architecture",
    "adrs",
    "adr-20260808-orders.legacy",
  );
  for (const file of ["architecture.md", "data-model.md", "impact.md"]) {
    assert.equal(statSync(join(legacyAdr, file)).isFile(), true);
  }
  for (const file of ["architecture.md", "data-model.md", "runtime.md"]) {
    assert.equal(statSync(join(legacy, "architecture", file)).isFile(), true);
  }
  const migrationReport = readFileSync(join(legacy, "MIGRATION-REPORT.md"), "utf8");
  assert.match(migrationReport, /旧规格阶段语义补齐/);
  assert.match(migrationReport, /sp-002-staged\/specs\/spec-001-ui\/requirements\.md/);
  assert.match(migrationReport, /architecture\/README\.md/);
  assert.match(migrationReport, /architecture\/diagrams/);
  assert.match(migrationReport, /当前架构收敛证据矩阵/);
  assert.match(migrationReport, /架构独立阅读门禁/);
  assert.match(migrationReport, /adr-cache\.md.*待填写.*待填写.*待填写/);
  assert.match(migrationReport, /adr-20260808-orders\.legacy\/.*待填写.*待填写.*待填写/);
  assert.equal(
    statSync(join(legacy, "docs", "sprints", "sprint-001_demo.legacy")).isDirectory(),
    true,
    "migrate 不得在 AI 确认前删除旧 sprint 内容",
  );
  assert.equal(
    readFileSync(
      join(legacy, "docs", "sprints", "sprint-009_conflict.legacy", "old.md"),
      "utf8",
    ),
    "# Old conflict content\n",
    "migrate 在新迭代目标已存在时必须完整保留旧内容",
  );
  assert.equal(
    readFileSync(join(legacy, "sprints", "sp-009-conflict", "docs", "current.md"), "utf8"),
    "# Current conflict content\n",
    "migrate 不得覆盖已有新迭代内容",
  );
  run(["migrate", legacy]);

  const isolatedHome = join(sandbox, "home");
  mkdirSync(join(isolatedHome, ".hermes", "skills"), { recursive: true });
  const updateOutput = run(["update"], {
    env: {
      SPECROCKET_OFFLINE: "1",
      SPECROCKET_USER_HOME: isolatedHome,
    },
  });
  assert.match(updateOutput, /离线模式/);
  const installedSkill = readFileSync(
    join(isolatedHome, ".hermes", "skills", "spec-rocket", "SKILL.md"),
    "utf8",
  );
  assert.match(installedSkill, /^\s+version:\s*["']?4\.0\.1["']?$/m);
  assert.deepEqual(installedSkill, readFileSync(join(root, "SKILL.md"), "utf8"));

  console.log(`CLI 本地回归通过：init / migrate / update，耗时 ${Date.now() - startedAt}ms。`);
} finally {
  rmSync(sandbox, { recursive: true, force: true });
}
