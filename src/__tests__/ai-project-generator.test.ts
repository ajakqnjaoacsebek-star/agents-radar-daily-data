import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  defaultPrivateProjectPreferences,
  loadPrivateProjectPreferences,
  saveDailyAiProject,
  updateAiProjectState,
} from "../ai-project-generator.ts";
import type { AiProjectCandidate } from "../ai-projects.ts";

const temporaryDirectories: string[] = [];

function tempDirectory(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ai-project-generator-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function fixtureCandidate(candidateId = "fixture"): AiProjectCandidate {
  return {
    candidateId,
    origin: "original-concept",
    title: "模糊点子验证器",
    oneLine: "把一句模糊想法变成可验证假设。",
    summary: "先验证最不确定的一点，不急着开发完整产品。",
    problemSolved: "你有点子，但不知道它值不值得做。",
    howItHelps: "它会先收集证据，再让你决定是否开工。",
    readerReady: true,
    outcome: "一张包含证据、风险和下一步的点子卡。",
    whyWorthwhile: "避免想法直接开工后才发现方向不成立。",
    skills: ["需求验证", "证据整理"],
    realWorldPotential: "适合个人项目立项。",
    feasibilityProbe: "输入一个想法，核对三个竞品和五条真实讨论。",
    costAndRisks: ["搜索结果可能有偏差"],
    tags: ["practical", "learning"],
    crossDomain: false,
    largeCommercial: false,
    difficulty: {
      technical: 30,
      dependencies: 20,
      time: 30,
      costRisk: 20,
      uncertainty: 40,
      explanation: "只需本地页面和公开搜索。",
    },
  };
}

describe("private preference loading", () => {
  it("falls back without exposing a failed private repository read", async () => {
    const preferences = await loadPrivateProjectPreferences(
      {
        owner: "owner",
        repo: "vault",
        path: "data/state.json",
        token: "secret-token",
      },
      async () => new Response("denied", { status: 403 }),
    );

    expect(preferences).toEqual(defaultPrivateProjectPreferences());
  });

  it("extracts only recommendation preferences from vault state", async () => {
    const remoteState = {
      version: 1,
      revision: 9,
      favorites: [{ candidateId: "private-favorite" }],
      feedback: [{ candidateId: "skip", reasons: ["太重复"], note: "私人备注" }],
      completed: [
        {
          projectId: "done",
          completedAt: "2026-08-20",
          rating: { starsAtCompletion: 3 },
          verification: "codex",
        },
      ],
      ability: { offset: 1 },
    };
    const content = Buffer.from(JSON.stringify(remoteState)).toString("base64");
    const preferences = await loadPrivateProjectPreferences(
      { owner: "owner", repo: "vault", path: "data/state.json", token: "token" },
      async () => Response.json({ content, encoding: "base64", sha: "abc" }),
    );

    expect(preferences.abilityOffset).toBe(1);
    expect(preferences.feedback).toEqual([{ candidateId: "skip", reasons: ["太重复"], note: "私人备注" }]);
    expect(preferences.completed).toHaveLength(1);
    expect(preferences).not.toHaveProperty("favorites");
  });

  it("respects a manual ability offset instead of auto-calibrating it", async () => {
    const completed = ["codex", "codex", "self"].map((verification, index) => ({
      projectId: `done-${index}`,
      completedAt: "2026-08-20",
      rating: { starsAtCompletion: 3 },
      verification,
    }));
    const content = Buffer.from(
      JSON.stringify({
        version: 1,
        revision: 4,
        feedback: [],
        completed,
        ability: { offset: 0, mode: "manual" },
      }),
    ).toString("base64");
    const preferences = await loadPrivateProjectPreferences(
      { owner: "owner", repo: "vault", path: "data/state.json", token: "token" },
      async () => Response.json({ content, encoding: "base64", sha: "abc" }),
    );

    expect(preferences.abilityOffset).toBe(0);
    expect(preferences.abilityMode).toBe("manual");
  });
});

describe("daily AI project storage", () => {
  it("writes only its own JSON and state files", async () => {
    const root = tempDirectory();
    const catalogPath = path.join(root, "config", "ai-project-catalog.json");
    const statePath = path.join(root, "digests", "ai-project-state.json");
    fs.mkdirSync(path.dirname(catalogPath), { recursive: true });
    fs.writeFileSync(catalogPath, JSON.stringify([fixtureCandidate()]));

    const card = await saveDailyAiProject({
      date: "2026-08-24",
      catalogPath,
      signalsPath: path.join(root, "config", "missing-signals.json"),
      statePath,
      digestsDirectory: path.join(root, "digests"),
      preferences: defaultPrivateProjectPreferences(),
    });

    expect(card.candidateId).toBe("fixture");
    expect(
      JSON.parse(fs.readFileSync(path.join(root, "digests", "2026-08-24", "daily-ai-project.json"), "utf8"))
        .candidateId,
    ).toBe("fixture");
    expect(fs.existsSync(path.join(root, "digests", "2026-08-24", "daily-inspiration.json"))).toBe(false);
  });

  it("keeps 90-day selection evidence with difficulty metadata", () => {
    const next = updateAiProjectState({ recent: [] }, fixtureCandidate("selected"), "2026-08-24", 2);
    expect(next.recent).toEqual([
      {
        candidateId: "selected",
        date: "2026-08-24",
        tags: ["practical", "learning"],
        crossDomain: false,
        largeCommercial: false,
        stars: 2,
      },
    ]);
  });
});
