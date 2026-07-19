import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(scriptDir, "detect-agent.mjs");

test("reports a concise usage error when --project has no value", () => {
  const result = spawnSync(process.execPath, [scriptPath, "--project"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
  assert.equal(result.stdout, "");
  assert.equal(
    result.stderr,
    "Usage: node scripts/detect-agent.mjs [--project <dir>]\n"
  );
});

test("reports a concise usage error when --project is followed by a flag", () => {
  const result = spawnSync(
    process.execPath,
    [scriptPath, "--project", "--unknown"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 2);
  assert.equal(result.stdout, "");
  assert.equal(
    result.stderr,
    "Usage: node scripts/detect-agent.mjs [--project <dir>]\n"
  );
});
