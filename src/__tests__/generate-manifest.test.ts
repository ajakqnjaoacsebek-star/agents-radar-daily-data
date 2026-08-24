import { describe, it, expect } from "vitest";
import { buildDateEntry, shouldIncludeDateEntry, toRfc822, escapeXml } from "../generate-manifest.ts";

describe("buildDateEntry", () => {
  it("exposes inspiration availability separately from report IDs", () => {
    expect(buildDateEntry("2026-08-14", ["ai-hn.md", "ai-hn-en.md", "daily-inspiration.json"])).toEqual({
      date: "2026-08-14",
      reports: ["ai-hn", "ai-hn-en"],
      hasInspiration: true,
      hasAiProject: false,
    });
  });

  it("keeps older report dates visible without pretending they have an inspiration card", () => {
    expect(buildDateEntry("2026-08-13", ["ai-cli.md"])).toEqual({
      date: "2026-08-13",
      reports: ["ai-cli"],
      hasInspiration: false,
      hasAiProject: false,
    });
  });

  it("exposes AI project availability independently", () => {
    const entry = buildDateEntry("2026-08-24", ["daily-ai-project.json"]);

    expect(entry).toEqual({
      date: "2026-08-24",
      reports: [],
      hasInspiration: false,
      hasAiProject: true,
    });
    expect(shouldIncludeDateEntry(entry)).toBe(true);
  });

  it("keeps an inspiration-only date in the manifest", () => {
    const entry = buildDateEntry("2026-08-14", ["daily-inspiration.json"]);

    expect(entry.reports).toEqual([]);
    expect(entry.hasInspiration).toBe(true);
    expect(shouldIncludeDateEntry(entry)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// toRfc822
// ---------------------------------------------------------------------------

describe("toRfc822", () => {
  it("formats a known date correctly", () => {
    // 2026-03-09 is a Monday
    const date = new Date(Date.UTC(2026, 2, 9, 14, 30, 0));
    const result = toRfc822(date);
    expect(result).toBe("Mon, 09 Mar 2026 14:30:00 +0000");
  });

  it("pads single-digit day and hours", () => {
    const date = new Date(Date.UTC(2026, 0, 5, 3, 7, 9));
    const result = toRfc822(date);
    expect(result).toBe("Mon, 05 Jan 2026 03:07:09 +0000");
  });

  it("handles midnight correctly", () => {
    const date = new Date(Date.UTC(2026, 5, 15, 0, 0, 0));
    const result = toRfc822(date);
    expect(result).toContain("00:00:00 +0000");
  });

  it("handles end of year", () => {
    const date = new Date(Date.UTC(2026, 11, 31, 23, 59, 59));
    const result = toRfc822(date);
    expect(result).toContain("Dec 2026");
    expect(result).toContain("23:59:59");
  });
});

// ---------------------------------------------------------------------------
// escapeXml
// ---------------------------------------------------------------------------

describe("escapeXml", () => {
  it("escapes ampersand", () => {
    expect(escapeXml("A & B")).toBe("A &amp; B");
  });

  it("escapes angle brackets", () => {
    expect(escapeXml("<tag>")).toBe("&lt;tag&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeXml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("handles multiple escapes in one string", () => {
    expect(escapeXml('A & B < C > D "E"')).toBe("A &amp; B &lt; C &gt; D &quot;E&quot;");
  });

  it("returns unchanged string if no special chars", () => {
    expect(escapeXml("plain text")).toBe("plain text");
  });

  it("handles empty string", () => {
    expect(escapeXml("")).toBe("");
  });
});
