import { describe, expect, it } from "vitest";
import {
  calculateRawDifficulty,
  calibrateAbilityOffset,
  createAiProjectCard,
  mapDifficultyStars,
  selectDailyAiProject,
  validateAiProjectCatalog,
  type AiProjectCandidate,
  type PrivateProjectPreferences,
} from "../ai-projects.ts";

function candidate(candidateId: string, overrides: Partial<AiProjectCandidate> = {}): AiProjectCandidate {
  return {
    candidateId,
    origin: "original-concept",
    title: `项目 ${candidateId}`,
    oneLine: "把一个真实问题做成可验证的 AI 项目。",
    summary: "先做关键验证，再决定是否继续投入。",
    outcome: "一个可以亲自试用的成果。",
    whyWorthwhile: "能学习可迁移的 AI 技巧。",
    skills: ["结构化输出", "自动化"],
    realWorldPotential: "可用于个人工作流。",
    feasibilityProbe: "用一小时验证最不确定的数据入口。",
    costAndRisks: ["可能需要少量 API 费用"],
    tags: ["practical"],
    crossDomain: false,
    largeCommercial: false,
    difficulty: {
      technical: 40,
      dependencies: 40,
      time: 40,
      costRisk: 20,
      uncertainty: 40,
      explanation: "需要一个 API 和简单界面。",
    },
    ...overrides,
  };
}

const emptyPreferences: PrivateProjectPreferences = {
  abilityOffset: 0,
  feedback: [],
  completed: [],
};

describe("AI project catalog", () => {
  it("rejects a verified project whose source is missing", () => {
    expect(() =>
      validateAiProjectCatalog([candidate("verified", { origin: "verified-existing", source: undefined })]),
    ).toThrow(/source/i);
  });

  it("keeps original concepts source-free and visibly marked", () => {
    const [original] = validateAiProjectCatalog([candidate("original")]);
    expect(original?.origin).toBe("original-concept");
    expect(original?.source).toBeUndefined();
  });

  it("rejects duplicate stable IDs", () => {
    expect(() => validateAiProjectCatalog([candidate("same"), candidate("same")])).toThrow(/duplicate/i);
  });
});

describe("difficulty", () => {
  it("uses the agreed weighted 20-100 score", () => {
    expect(
      calculateRawDifficulty({
        technical: 100,
        dependencies: 80,
        time: 60,
        costRisk: 40,
        uncertainty: 20,
        explanation: "fixture",
      }),
    ).toBe(66);
  });

  it("maps raw difficulty through configurable thresholds and ability offset", () => {
    expect(mapDifficultyStars(66, { abilityOffset: 0 })).toBe(4);
    expect(mapDifficultyStars(66, { abilityOffset: 1 })).toBe(3);
  });

  it("raises ability only after three near-limit completions with two Codex checks", () => {
    expect(
      calibrateAbilityOffset({
        abilityOffset: 0,
        feedback: [],
        completed: [
          { projectId: "a", completedAt: "2026-08-01", starsAtCompletion: 3, verification: "codex" },
          { projectId: "b", completedAt: "2026-08-02", starsAtCompletion: 3, verification: "codex" },
          { projectId: "c", completedAt: "2026-08-03", starsAtCompletion: 3, verification: "self" },
        ],
      }),
    ).toBe(1);

    expect(
      calibrateAbilityOffset({
        abilityOffset: 0,
        feedback: [],
        completed: [
          { projectId: "a", completedAt: "2026-08-01", starsAtCompletion: 3, verification: "self" },
          { projectId: "b", completedAt: "2026-08-02", starsAtCompletion: 3, verification: "self" },
          { projectId: "c", completedAt: "2026-08-03", starsAtCompletion: 3, verification: "codex" },
        ],
      }),
    ).toBe(0);
  });

  it("does not reuse the same three completions to raise ability repeatedly", () => {
    expect(
      calibrateAbilityOffset({
        abilityOffset: 1,
        feedback: [],
        completed: [
          { projectId: "a", completedAt: "2026-08-01", starsAtCompletion: 3, verification: "codex" },
          { projectId: "b", completedAt: "2026-08-02", starsAtCompletion: 3, verification: "codex" },
          { projectId: "c", completedAt: "2026-08-03", starsAtCompletion: 3, verification: "self" },
        ],
      }),
    ).toBe(1);
  });
});

describe("daily selection", () => {
  it("does not repeat an exact candidate within 90 days", () => {
    const selected = selectDailyAiProject(
      [candidate("recent"), candidate("fresh")],
      { recent: [{ candidateId: "recent", date: "2026-08-01", tags: ["practical"] }] },
      emptyPreferences,
      "2026-08-24",
    );
    expect(selected.candidateId).toBe("fresh");
  });

  it("fills a missing cross-domain slot around every seventh recommendation", () => {
    const history = Array.from({ length: 6 }, (_, index) => ({
      candidateId: `old-${index}`,
      date: `2026-08-${String(index + 18).padStart(2, "0")}`,
      tags: ["practical"] as AiProjectCandidate["tags"],
      crossDomain: false,
    }));
    const selected = selectDailyAiProject(
      [candidate("plain"), candidate("cross", { crossDomain: true, tags: ["learning"] })],
      { recent: history },
      emptyPreferences,
      "2026-08-24",
    );
    expect(selected.candidateId).toBe("cross");
  });

  it("limits four-star large commercial projects to one in a rolling month", () => {
    const selected = selectDailyAiProject(
      [
        candidate("large", {
          largeCommercial: true,
          tags: ["commercial"],
          difficulty: {
            technical: 70,
            dependencies: 70,
            time: 70,
            costRisk: 70,
            uncertainty: 70,
            explanation: "大型系统",
          },
        }),
        candidate("small"),
      ],
      {
        recent: [
          {
            candidateId: "previous-large",
            date: "2026-08-10",
            tags: ["commercial"],
            largeCommercial: true,
            stars: 4,
          },
        ],
      },
      emptyPreferences,
      "2026-08-24",
    );
    expect(selected.candidateId).toBe("small");
  });

  it("returns a source-bound card without allowing selection to replace facts", () => {
    const project = candidate("real", {
      origin: "verified-existing",
      title: "Browser Use",
      source: {
        label: "GitHub · browser-use/browser-use",
        url: "https://github.com/browser-use/browser-use",
        verifiedAt: "2026-08-24",
      },
    });
    const card = createAiProjectCard(project, "2026-08-24", emptyPreferences, "curated-fallback");
    expect(card.source?.url).toBe("https://github.com/browser-use/browser-use");
    expect(card.title).toBe("Browser Use");
  });
});
