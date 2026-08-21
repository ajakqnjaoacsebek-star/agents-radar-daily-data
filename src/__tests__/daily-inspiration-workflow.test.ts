import fs from "node:fs";
import { describe, expect, it } from "vitest";

describe("Daily Inspiration workflow", () => {
  it("syncs and pushes master explicitly after committing a card", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow).toContain("git pull --rebase origin master");
    expect(workflow).toContain("git push origin HEAD:master");
  });

  it("does not run local Husky hooks for generated-data commits", () => {
    const workflow = fs.readFileSync(".github/workflows/daily-inspiration.yml", "utf8");

    expect(workflow.match(/git commit --no-verify/g)).toHaveLength(2);
  });
});
