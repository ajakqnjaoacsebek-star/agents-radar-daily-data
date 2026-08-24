import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { validateAiProjectCatalog, type AiProjectCandidate } from "../ai-projects.ts";

const catalog = validateAiProjectCatalog(
  JSON.parse(fs.readFileSync("config/ai-project-catalog.json", "utf8")) as AiProjectCandidate[],
);

describe("initial AI project catalog", () => {
  it("contains at least 120 complete, stable candidates", () => {
    expect(catalog.length).toBeGreaterThanOrEqual(120);
    expect(new Set(catalog.map((item) => item.candidateId)).size).toBe(catalog.length);
  });

  it("does not pad the catalog with repeated generic project copy", () => {
    expect(new Set(catalog.map((item) => item.oneLine)).size).toBe(catalog.length);
    expect(new Set(catalog.map((item) => item.outcome)).size).toBe(catalog.length);
    expect(new Set(catalog.map((item) => item.feasibilityProbe)).size).toBe(catalog.length);
  });

  it("covers verified work, original concepts, all content goals and cross-domain practice", () => {
    expect(catalog.some((item) => item.origin === "verified-existing")).toBe(true);
    expect(catalog.some((item) => item.origin === "original-concept")).toBe(true);
    for (const tag of ["practical", "learning", "imagination", "commercial"] as const) {
      expect(catalog.some((item) => item.tags.includes(tag))).toBe(true);
    }
    expect(catalog.filter((item) => item.crossDomain).length).toBeGreaterThanOrEqual(12);
  });
});
