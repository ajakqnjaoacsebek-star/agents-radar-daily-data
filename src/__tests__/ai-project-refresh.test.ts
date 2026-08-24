import { describe, expect, it } from "vitest";
import {
  mergeAiProjectSignals,
  organizeAiProjectEvidence,
  parsePublicFeed,
  parseOrganizedAiProjectSignals,
  type AiProjectSignalEvidence,
} from "../ai-project-refresh.ts";

const evidence: AiProjectSignalEvidence = {
  signalId: "github:browser-use/browser-use",
  kind: "github",
  title: "browser-use/browser-use",
  summary: "Make websites accessible for AI agents.",
  source: {
    label: "GitHub · browser-use/browser-use",
    url: "https://github.com/browser-use/browser-use",
    verifiedAt: "2026-08-24",
  },
};

describe("weekly AI project refresh", () => {
  it("extracts both RSS items and Atom entries used by public product feeds", () => {
    const atom = `<?xml version="1.0"?><feed><entry><title>New AI Tool</title><link href="https://example.com/tool"/><summary>A focused product.</summary></entry></feed>`;
    expect(parsePublicFeed(atom)).toEqual([
      { title: "New AI Tool", url: "https://example.com/tool", summary: "A focused product." },
    ]);
  });

  it("rebinds model copy to the fetched source instead of trusting a replacement URL", () => {
    const raw = JSON.stringify({
      candidates: [
        {
          signalId: evidence.signalId,
          title: "Browser Use 实战",
          oneLine: "让 AI 操作公开网页。",
          summary: "做一个公开网页浏览任务。",
          outcome: "一个可复现的网页代理流程。",
          whyWorthwhile: "理解浏览器代理的观察与行动循环。",
          skills: ["浏览器自动化"],
          realWorldPotential: "公开信息收集。",
          feasibilityProbe: "先完成一个无登录网页任务。",
          costAndRisks: ["遵守网站条款"],
          tags: ["practical", "learning"],
          crossDomain: false,
          largeCommercial: false,
          difficulty: {
            technical: 40,
            dependencies: 40,
            time: 40,
            costRisk: 20,
            uncertainty: 40,
            explanation: "需要浏览器环境。",
          },
          source: { url: "https://example.com/fake" },
        },
      ],
    });

    const [candidate] = parseOrganizedAiProjectSignals(raw, [evidence]);
    expect(candidate?.source?.url).toBe("https://github.com/browser-use/browser-use");
    expect(candidate?.candidateId).toBe("signal:github:browser-use/browser-use");
  });

  it("keeps the prior verified pool when a refresh yields no valid candidates", () => {
    const existing = parseOrganizedAiProjectSignals(
      JSON.stringify({
        candidates: [
          {
            signalId: evidence.signalId,
            title: "Browser Use 实战",
            oneLine: "让 AI 操作公开网页。",
            summary: "做一个公开网页浏览任务。",
            outcome: "一个可复现流程。",
            whyWorthwhile: "学习代理循环。",
            skills: ["浏览器自动化"],
            realWorldPotential: "公开信息收集。",
            feasibilityProbe: "先跑公开网页。",
            costAndRisks: ["遵守网站条款"],
            tags: ["practical"],
            crossDomain: false,
            largeCommercial: false,
            difficulty: {
              technical: 40,
              dependencies: 40,
              time: 40,
              costRisk: 20,
              uncertainty: 40,
              explanation: "需要浏览器环境。",
            },
          },
        ],
      }),
      [evidence],
    );

    expect(mergeAiProjectSignals(existing, [], "2026-08-24")).toEqual(existing);
  });

  it("keeps source-bound candidates when DeepSeek returns truncated JSON", async () => {
    const candidates = await organizeAiProjectEvidence([evidence], "test-key", async () =>
      Response.json({ choices: [{ message: { content: '{"candidates":[' } }] }),
    );

    expect(candidates).toHaveLength(1);
    expect(candidates[0]?.candidateId).toBe("signal:github:browser-use/browser-use");
    expect(candidates[0]?.source?.url).toBe(evidence.source.url);
  });
});
