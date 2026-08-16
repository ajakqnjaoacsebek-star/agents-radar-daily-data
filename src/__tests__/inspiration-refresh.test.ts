import { describe, expect, it } from "vitest";
import { mergeInspirationSignals } from "../inspiration-refresh.ts";
import type { InspirationCandidate } from "../inspiration.ts";

function signal(overrides: Partial<InspirationCandidate> = {}): InspirationCandidate {
  return {
    id: "signal:github:owner/project",
    origin: "dynamic",
    category: "开源项目",
    title: "Owner / Project",
    summary: "一个近期公开的项目。",
    whyInteresting: "可以观察它如何解决一个具体问题。",
    remixIdea: "想想它能否和自己的工作流组合。",
    source: { label: "GitHub", url: "https://github.com/owner/project" },
    signalDate: "2026-08-15",
    ...overrides,
  };
}

describe("mergeInspirationSignals", () => {
  it("deduplicates by id and source URL, rejects unsafe entries, and prunes old signals", () => {
    const result = mergeInspirationSignals(
      [signal({ id: "signal:old", signalDate: "2026-05-01" })],
      [
        signal({ title: "Updated project" }),
        signal({ id: "signal:other", source: { label: "Other", url: "https://github.com/owner/project" } }),
        signal({ id: "signal:unsafe", source: { label: "Unsafe", url: "http://example.com" } }),
      ],
      "2026-08-16",
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe("Updated project");
  });

  it("keeps valid signals from the retention boundary", () => {
    const result = mergeInspirationSignals(
      [],
      [signal({ id: "signal:boundary", signalDate: "2026-05-18" })],
      "2026-08-16",
    );

    expect(result.map((candidate) => candidate.id)).toEqual(["signal:boundary"]);
  });
});
