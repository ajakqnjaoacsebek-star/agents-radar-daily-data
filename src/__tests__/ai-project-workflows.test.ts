import fs from "node:fs";
import { describe, expect, it } from "vitest";

describe("AI project workflows", () => {
  it("runs daily at 08:30 CST in an independent concurrency group", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-ai-project.yml", "utf8");
    expect(workflow).toContain('cron: "30 0 * * *"');
    expect(workflow).toContain('cron: "45 3 * * *"');
    expect(workflow).toContain("digests/${DATE}/daily-ai-project.json");
    expect(workflow).toContain("if: steps.daily-gate.outputs.should_run == 'true'");
    expect(workflow).toContain('if [ "$GITHUB_EVENT_NAME" = "schedule" ]');
    expect(workflow).toContain("group: daily-ai-project-${{ github.ref }}");
    expect(workflow).not.toContain("daily-inspiration.json");
  });

  it("runs the weekly refresh at 07:30 CST and preserves explicit master pushes", () => {
    const workflow = fs.readFileSync(".github/workflows/weekly-ai-project-refresh.yml", "utf8");
    expect(workflow).toContain('cron: "30 23 * * 6"');
    expect(workflow).toContain("group: weekly-ai-project-refresh-${{ github.ref }}");
    expect(workflow).toContain("git push origin HEAD:master");
  });
});
