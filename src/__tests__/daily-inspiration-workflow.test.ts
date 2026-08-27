import fs from "node:fs";
import { describe, expect, it } from "vitest";

describe("Daily Inspiration workflow", () => {
  it("keeps the morning run and adds an idempotent 11:30 CST catch-up", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow).toContain('cron: "15 0 * * *"');
    expect(workflow).toContain('cron: "30 3 * * *"');
    expect(workflow).toContain("digests/${DATE}/daily-inspiration.json");
    expect(workflow).toContain("if: steps.daily-gate.outputs.should_run == 'true'");
    expect(workflow).toContain('if [ "$GITHUB_EVENT_NAME" = "schedule" ]');
  });

  it("syncs and pushes master explicitly after committing a card", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow).toContain("git pull --rebase origin master");
    expect(workflow).toContain("git push origin HEAD:master");
  });

  it("does not run local Husky hooks for generated-data commits", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow.match(/git commit --no-verify/g)).toHaveLength(2);
  });

  it("commits every file produced by manifest generation", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow).toContain("git add manifest.json feed.xml");
  });
});
