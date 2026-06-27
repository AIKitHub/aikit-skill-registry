#!/usr/bin/env node
/**
 * Detect the current Agent for skill installation.
 * Usage: node scripts/detect-agent.mjs [--project <dir>]
 * Output: JSON { agent, skill_dir, label, confidence, signals }
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryRoot = resolve(__dirname, "..");
const registry = JSON.parse(
  readFileSync(join(registryRoot, "registry", "skills.json"), "utf8")
);

const projectArg = process.argv.indexOf("--project");
const projectDir = resolve(
  projectArg !== -1 ? process.argv[projectArg + 1] : process.cwd()
);

function envHit(keys) {
  const hits = keys.filter((k) => process.env[k]);
  return hits.length ? hits : null;
}

function envPathHit(substrings) {
  const blob = [
    process.env.PATH,
    process.env.Path,
    process.env.VSCODE_NLS_CONFIG,
    process.env.VSCODE_IPC_HOOK,
  ]
    .filter(Boolean)
    .join(" ");
  const lower = blob.toLowerCase();
  return substrings.filter((s) => lower.includes(s.toLowerCase()));
}

function markerHit(markers) {
  return markers.filter((m) => existsSync(join(projectDir, m)));
}

function processHit(names) {
  const platform = process.platform;
  try {
    if (platform === "win32") {
      const out = execSync('tasklist /FO CSV /NH', { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
      const lower = out.toLowerCase();
      return names.filter((n) => lower.includes(n.toLowerCase().replace(".exe", "") + ".exe") || lower.includes(n.toLowerCase()));
    }
    const out = execSync("ps -eo comm=", { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
    const lower = out.toLowerCase();
    return names.filter((n) => lower.includes(n.toLowerCase()));
  } catch {
    return [];
  }
}

function scoreAgent(agentId, agentCfg) {
  const d = agentCfg.detect ?? {};
  const signals = [];
  let score = 0;

  const env = envHit(d.env_any ?? []);
  if (env?.length) {
    score += 100;
    signals.push(`env:${env.join(",")}`);
  }

  const pathHits = envPathHit(d.env_path_contains ?? []);
  if (pathHits.length) {
    score += 40;
    signals.push(`path:${pathHits.join(",")}`);
  }

  const procs = processHit(d.process_names ?? []);
  if (procs.length) {
    score += 80;
    signals.push(`process:${procs.join(",")}`);
  }

  const markers = markerHit(d.project_markers ?? []);
  if (markers.length) {
    score += 20 * markers.length;
    signals.push(`project:${markers.join(",")}`);
  }

  return { agentId, score, signals };
}

const agents = registry.agents ?? {};
const order = registry.detection_order ?? Object.keys(agents);

const ranked = order
  .map((id) => scoreAgent(id, agents[id]))
  .filter((r) => r.score > 0)
  .sort((a, b) => b.score - a.score);

const winner = ranked[0];
const fallback = order[0];
const agentId = winner?.agentId ?? fallback;
const agentCfg = agents[agentId];

const skillDir = existsSync(join(projectDir, agentCfg.skill_dir))
  ? agentCfg.skill_dir
  : agentCfg.skill_dir_alt ?? agentCfg.skill_dir;

const result = {
  agent: agentId,
  skill_dir: skillDir,
  label: agentCfg.label,
  confidence: winner ? (winner.score >= 80 ? "high" : "medium") : "low",
  signals: winner?.signals ?? ["fallback:detection_order"],
  project_dir: projectDir,
};

console.log(JSON.stringify(result, null, 2));
