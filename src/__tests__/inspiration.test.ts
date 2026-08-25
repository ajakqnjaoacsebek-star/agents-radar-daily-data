import { describe, expect, it } from "vitest";
import {
  buildDynamicCandidates,
  buildInspirationPrompt,
  createFallbackCard,
  filterRecentlyUsed,
  isReaderReadyInspirationCandidate,
  parseInspirationSelection,
  validateCatalog,
  type InspirationCandidate,
} from "../inspiration.ts";

const evergreen: InspirationCandidate = {
  id: "evergreen:photopea",
  origin: "evergreen",
  category: "实用工具",
  title: "浏览器里的图片编辑器",
  summary: "Photopea 可以直接在浏览器里编辑常见图片和 PSD 文件。",
  whyInteresting: "临时修图时不用安装大型软件。",
  remixIdea: "把它加入自己的截图整理流程。",
  source: { label: "Photopea", url: "https://www.photopea.com/" },
  caution: "敏感文件仍应先确认隐私要求。",
};

describe("buildDynamicCandidates", () => {
  it("merges supported live sources and drops entries without a usable source URL", () => {
    const candidates = buildDynamicCandidates({
      trendingData: {
        trendingFetchSuccess: true,
        trendingRepos: [
          {
            fullName: "owner/useful-project",
            description: "A useful project",
            language: "TypeScript",
            todayStars: 20,
            totalStars: 100,
            forks: 5,
            url: "https://github.com/owner/useful-project",
          },
          {
            fullName: "owner/no-link",
            description: "missing link",
            language: "",
            todayStars: 1,
            totalStars: 2,
            forks: 0,
            url: "",
          },
        ],
        searchRepos: [],
      },
      hnData: { stories: [], fetchSuccess: true },
      phData: {
        fetchSuccess: true,
        products: [
          {
            id: "ph-1",
            name: "Tiny Tool",
            tagline: "Does one useful thing",
            url: "https://www.producthunt.com/posts/tiny-tool",
            website: "https://tiny.example/",
            votesCount: 25,
            commentsCount: 3,
            createdAt: "2026-08-14T00:00:00Z",
            topics: ["Productivity"],
          },
        ],
      },
      hfData: { models: [], fetchSuccess: true },
      webResults: [],
    });

    expect(candidates.map((candidate) => candidate.id)).toEqual([
      "github:owner/useful-project",
      "producthunt:ph-1",
    ]);
    expect(candidates[1]?.source.url).toBe("https://tiny.example/");
  });
});

describe("filterRecentlyUsed", () => {
  it("excludes candidates selected in the last 30 days without imposing category quotas", () => {
    const candidates = [evergreen, { ...evergreen, id: "evergreen:other", category: "AI 小发现" }];
    const eligible = filterRecentlyUsed(
      candidates,
      { recent: [{ id: evergreen.id, date: "2026-08-10" }] },
      "2026-08-14",
      30,
    );

    expect(eligible.map((candidate) => candidate.id)).toEqual(["evergreen:other"]);
  });
});

describe("isReaderReadyInspirationCandidate", () => {
  it("accepts evergreen copy but requires dynamic discoveries to be explicitly reader-ready", () => {
    const rawSignal: InspirationCandidate = {
      ...evergreen,
      id: "signal:hn:1",
      origin: "dynamic",
      title: "What open source projects taught us about AI",
      summary: "这是一条近期围绕 AI、工具或数字生活展开的社区讨论。",
    };

    expect(isReaderReadyInspirationCandidate(evergreen)).toBe(true);
    expect(isReaderReadyInspirationCandidate(rawSignal)).toBe(false);
    expect(
      isReaderReadyInspirationCandidate({
        ...rawSignal,
        title: "开源项目的 AI 安全体检",
        summary: "你可以用它检查自己的 AI 项目会不会把密钥或私人数据暴露出去。",
        whyInteresting: "它把抽象的安全问题变成了你能在项目上线前逐项检查的清单。",
        remixIdea: "拿你最近做的一个 Codex 项目，对照检查一次密钥、日志和公开链接。",
        readerReady: true,
      }),
    ).toBe(true);
  });
});

describe("parseInspirationSelection", () => {
  it("uses the candidate's verified source instead of a model-supplied URL", () => {
    const raw = JSON.stringify({
      candidateId: evergreen.id,
      title: "今天随手发现一个修图工具",
      whyInteresting: "打开网页就能改图。",
      remixIdea: "可以拿它做日报封面。",
      source: { label: "假的", url: "https://evil.example/" },
    });

    const card = parseInspirationSelection(raw, [evergreen], "2026-08-14", "2026-08-14T00:00:00Z");

    expect(card.source).toEqual(evergreen.source);
    expect(card.candidateId).toBe(evergreen.id);
    expect(card.origin).toBe("evergreen");
    expect(card.title).toBe(evergreen.title);
    expect(card.whyInteresting).toBe(evergreen.whyInteresting);
    expect(card.remixIdea).toBe(evergreen.remixIdea);
  });

  it("rejects unknown candidate IDs", () => {
    expect(() =>
      parseInspirationSelection(
        JSON.stringify({
          candidateId: "invented:item",
          title: "编造的项目",
          whyInteresting: "不存在。",
          remixIdea: "不存在。",
        }),
        [evergreen],
        "2026-08-14",
        "2026-08-14T00:00:00Z",
      ),
    ).toThrow(/unknown candidate/i);
  });
});

describe("createFallbackCard", () => {
  it("creates a complete card from verified catalog copy when the model fails", () => {
    const card = createFallbackCard([evergreen], "2026-08-14", "2026-08-14T00:00:00Z", () => 0);

    expect(card).toMatchObject({
      version: 1,
      date: "2026-08-14",
      candidateId: evergreen.id,
      title: evergreen.title,
      whyInteresting: evergreen.whyInteresting,
      remixIdea: evergreen.remixIdea,
      source: evergreen.source,
      generatedBy: "fallback",
    });
  });
});

describe("buildInspirationPrompt", () => {
  it("requires a single traceable choice and explicitly avoids lesson-style output", () => {
    const prompt = buildInspirationPrompt([evergreen], "2026-08-14");

    expect(prompt).toContain(evergreen.id);
    expect(prompt).toContain(evergreen.source.url);
    expect(prompt).toContain("只能选择一个候选项");
    expect(prompt).toContain("不要写成课程");
    expect(prompt).toContain("不要输出来源链接");
    expect(prompt).toContain('{"candidateId":"..."}');
  });
});

describe("validateCatalog", () => {
  it("rejects duplicate IDs and entries without HTTPS sources", () => {
    expect(() => validateCatalog([evergreen, evergreen])).toThrow(/duplicate/i);
    expect(() =>
      validateCatalog([{ ...evergreen, id: "evergreen:unsafe", source: { label: "bad", url: "http://x" } }]),
    ).toThrow(/https/i);
  });

  it("rejects malformed origin, category, and source labels", () => {
    expect(() => validateCatalog([{ ...evergreen, origin: "live" as never }])).toThrow(/origin/i);
    expect(() => validateCatalog([{ ...evergreen, category: "" }])).toThrow(/category/i);
    expect(() => validateCatalog([{ ...evergreen, source: { ...evergreen.source, label: "" } }])).toThrow(
      /source label/i,
    );
  });
});
