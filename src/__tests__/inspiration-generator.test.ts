import { describe, expect, it } from "vitest";
import {
  generateInspirationCard,
  saveDailyInspirationSafely,
  updateInspirationState,
  type InspirationGenerationDeps,
} from "../inspiration-generator.ts";
import type { InspirationCandidate, InspirationState } from "../inspiration.ts";

const evergreen: InspirationCandidate = {
  id: "evergreen:sample",
  origin: "evergreen",
  category: "项目组合",
  title: "一个有用的组合",
  summary: "把两个现成工具连起来完成一件事。",
  whyInteresting: "不需要从零造轮子。",
  remixIdea: "换成自己的数据源，就能成为私人版本。",
  source: { label: "Sample", url: "https://example.com/sample" },
};

const dynamic: InspirationCandidate = {
  ...evergreen,
  id: "github:owner/project",
  origin: "dynamic",
  category: "开源项目",
  readerReady: true,
  source: { label: "GitHub", url: "https://github.com/owner/project" },
};

describe("generateInspirationCard", () => {
  it("can generate a verified fallback without calling an LLM", async () => {
    let calls = 0;
    const card = await generateInspirationCard({
      candidates: [evergreen],
      evergreenCandidates: [evergreen],
      state: { recent: [] },
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      allowLlm: false,
      deps: {
        generate: async () => {
          calls += 1;
          return "{}";
        },
        random: () => 0,
      },
    });

    expect(calls).toBe(0);
    expect(card.generatedBy).toBe("fallback");
    expect(card.candidateId).toBe(evergreen.id);
  });

  it("uses a dynamic candidate while the weekly quota remains", async () => {
    const state = { recent: [], weeklyDynamic: { week: "2026-08-10", count: 2 } };
    const card = await generateInspirationCard({
      candidates: [dynamic, evergreen],
      evergreenCandidates: [evergreen],
      state,
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      allowLlm: false,
      deps: { generate: async () => "{}", random: () => 0 },
    });

    expect(card.origin).toBe("dynamic");
    expect(updateInspirationState(state, card.candidateId, card.date, card.origin)).toEqual({
      recent: [{ id: card.candidateId, date: card.date }],
      weeklyDynamic: { week: "2026-08-10", count: 3 },
    });
  });

  it("falls back to evergreen after three dynamic recommendations in a week", async () => {
    const card = await generateInspirationCard({
      candidates: [dynamic, evergreen],
      evergreenCandidates: [evergreen],
      state: {
        recent: [],
        weeklyDynamic: { week: "2026-08-10", count: 3 },
      },
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      allowLlm: false,
      deps: { generate: async () => "{}", random: () => 0 },
    });

    expect(card.origin).toBe("evergreen");
  });

  it("selects from eligible candidates and preserves the verified source", async () => {
    const deps: InspirationGenerationDeps = {
      generate: async () =>
        JSON.stringify({
          candidateId: dynamic.id,
          title: "今天发现一个开源项目",
          whyInteresting: "它把麻烦流程做成了现成工具。",
          remixIdea: "可以换成自己的内容来源。",
          source: { url: "https://invented.example" },
        }),
      random: () => 0,
    };

    const card = await generateInspirationCard({
      candidates: [evergreen, dynamic],
      evergreenCandidates: [evergreen],
      state: { recent: [] },
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      deps,
    });

    expect(card.candidateId).toBe(dynamic.id);
    expect(card.source).toEqual(dynamic.source);
    expect(card.generatedBy).toBe("llm");
  });

  it("falls back to evergreen when a raw dynamic signal has not explained its value to the reader", async () => {
    const deps: InspirationGenerationDeps = {
      generate: async () => {
        throw new Error("provider unavailable");
      },
      random: () => 0,
    };

    const card = await generateInspirationCard({
      candidates: [
        {
          ...dynamic,
          readerReady: undefined,
          title: "What open source projects taught us about AI",
          summary: "这是一条近期围绕 AI、工具或数字生活展开的社区讨论。",
        },
        evergreen,
      ],
      evergreenCandidates: [evergreen],
      state: { recent: [] },
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      deps,
    });

    expect(card.candidateId).toBe(evergreen.id);
    expect(card.origin).toBe("evergreen");
    expect(card.generatedBy).toBe("fallback");
  });

  it("uses the full evergreen catalog when every item is in the recent window", async () => {
    const deps: InspirationGenerationDeps = {
      generate: async () => {
        throw new Error("provider unavailable");
      },
      random: () => 0,
    };

    const card = await generateInspirationCard({
      candidates: [evergreen],
      evergreenCandidates: [evergreen],
      state: { recent: [{ id: evergreen.id, date: "2026-08-13" }] },
      date: "2026-08-14",
      generatedAt: "2026-08-14T00:00:00Z",
      deps,
    });

    expect(card.candidateId).toBe(evergreen.id);
  });
});

describe("updateInspirationState", () => {
  it("adds the selected item and removes history older than 90 days", () => {
    const state: InspirationState = {
      recent: [
        { id: "old", date: "2026-01-01" },
        { id: "recent", date: "2026-08-01" },
        { id: "superseded", date: "2026-08-14" },
      ],
    };

    expect(updateInspirationState(state, "new", "2026-08-14")).toEqual({
      recent: [
        { id: "recent", date: "2026-08-01" },
        { id: "new", date: "2026-08-14" },
      ],
    });
  });
});

describe("saveDailyInspirationSafely", () => {
  it("does not stop the existing digest when inspiration storage fails", async () => {
    const save = async () => {
      throw new Error("catalog unavailable");
    };

    await expect(
      saveDailyInspirationSafely({} as never, "2026-08-14", "2026-08-14T00:00:00Z", save),
    ).resolves.toBeNull();
  });
});
