#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
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
  assert.match(help, /SpecRocket CLI v3\.5\.0/);

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

  const legacy = join(sandbox, "legacy");
  mkdirSync(join(legacy, "docs", "sprints", "sprint-001_demo"), { recursive: true });
  writeFileSync(join(legacy, "docs", "sprints", "sprint-001_demo", "overview.md"), "# Demo\n");
  mkdirSync(join(legacy, "adrs"), { recursive: true });
  writeFileSync(join(legacy, "adrs", "adr-cache.md"), "# Cache decision\n");
  run(["migrate", legacy]);
  assert.equal(
    readFileSync(join(legacy, "sprints", "sp-001-demo", "docs", "overview.md"), "utf8"),
    "# Demo\n",
  );
  const migratedAdr = readdirSync(join(legacy, "adrs"), { withFileTypes: true })
    .find((entry) => entry.isDirectory() && /^adr-\d{8}-cache$/.test(entry.name));
  assert.ok(migratedAdr, "migrate 未收敛单文件 ADR");
  for (const file of ["architecture.md", "data-model.md", "impact.md"]) {
    assert.equal(statSync(join(legacy, "adrs", migratedAdr.name, file)).isFile(), true);
  }

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
  assert.match(installedSkill, /^version:\s*3\.5\.0$/m);
  assert.deepEqual(installedSkill, readFileSync(join(root, "SKILL.md"), "utf8"));

  console.log(`CLI 本地回归通过：init / migrate / update，耗时 ${Date.now() - startedAt}ms。`);
} finally {
  rmSync(sandbox, { recursive: true, force: true });
}
