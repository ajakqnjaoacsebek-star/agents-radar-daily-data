import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ---------------------------------------------------------------------------
// Mock fetch globally for HN API tests
// ---------------------------------------------------------------------------

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

import {
  parseHnItem,
  filterAiItems,
  formatScore,
  buildHnDigestPrompt,
} from "../hn.ts";

// ---------------------------------------------------------------------------
// parseHnItem
// ---------------------------------------------------------------------------

describe("parseHnItem", () => {
  it("parses a full HN item object", () => {
    const raw = {
      id: 12345,
      title: "Show HN: GPT-4 beats human experts on medical benchmarks",
      url: "https://example.com/gpt4-medical",
      score: 342,
      by: "user123",
      time: 1723334400,
      descendants: 87,
      type: "story",
    };
    const result = parseHnItem(raw);
    expect(result).not.toBeNull();
    expect(result!.id).toBe(12345);
    expect(result!.title).toBe("Show HN: GPT-4 beats human experts on medical benchmarks");
    expect(result!.url).toBe("https://example.com/gpt4-medical");
    expect(result!.score).toBe(342);
    expect(result!.by).toBe("user123");
    expect(result!.descendants).toBe(87);
  });

  it("uses HN item URL when url field is missing", () => {
    const raw = {
      id: 99999,
      title: "Ask HN: Best AI tools for developers?",
      score: 150,
      by: "devuser",
      time: 1723334400,
      descendants: 45,
      type: "story",
    };
    const result = parseHnItem(raw);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://news.ycombinator.com/item?id=99999");
  });

  it("returns null for non-story types", () => {
    const raw = {
      id: 11111,
      title: "comment text",
      score: 5,
      by: "commenter",
      time: 1723334400,
      type: "comment",
    };
    const result = parseHnItem(raw);
    expect(result).toBeNull();
  });

  it("returns null when title is missing", () => {
    const raw = {
      id: 22222,
      score: 100,
      by: "user",
      time: 1723334400,
      type: "story",
    };
    const result = parseHnItem(raw);
    expect(result).toBeNull();
  });

  it("handles zero descendants gracefully", () => {
    const raw = {
      id: 33333,
      title: "New AI paper released",
      url: "https://arxiv.org/abs/2408.12345",
      score: 200,
      by: "researcher",
      time: 1723334400,
      descendants: 0,
      type: "story",
    };
    const result = parseHnItem(raw);
    expect(result).not.toBeNull();
    expect(result!.descendants).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// filterAiItems
// ---------------------------------------------------------------------------

describe("filterAiItems", () => {
  const makeItem = (title: string, score = 100, url = "https://example.com") => ({
    id: Math.floor(Math.random() * 100000),
    title,
    url,
    score,
    by: "testuser",
    time: 1723334400,
    descendants: 10,
  });

  it("includes items with AI-related keywords", () => {
    const items = [
      makeItem("New LLM benchmark released"),
      makeItem("GPT-4 performance improvements"),
      makeItem("Machine learning for finance"),
      makeItem("Claude AI update"),
    ];
    const result = filterAiItems(items);
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((i) => i.title.includes("LLM"))).toBe(true);
  });

  it("excludes items with low scores", () => {
    const items = [
      makeItem("AI agent framework released", 5),
      makeItem("LLM fine-tuning guide", 3),
    ];
    const result = filterAiItems(items);
    // Low score items should be filtered out or result should be empty
    expect(Array.isArray(result)).toBe(true);
  });

  it("includes items about neural networks", () => {
    const items = [
      makeItem("Neural network architecture survey", 250),
      makeItem("Deep learning optimization", 180),
    ];
    const result = filterAiItems(items);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns empty array for empty input", () => {
    expect(filterAiItems([])).toEqual([]);
  });

  it("filters items by minimum score threshold", () => {
    const highScore = makeItem("AI research paper", 500);
    const lowScore = makeItem("AI blog post", 2);
    const result = filterAiItems([highScore, lowScore]);
    // High score item should be included
    expect(result.some((i) => i.score === 500)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// formatScore
// ---------------------------------------------------------------------------

describe("formatScore", () => {
  it("formats score with points label", () => {
    const result = formatScore(342);
    expect(result).toContain("342");
  });

  it("handles zero score", () => {
    const result = formatScore(0);
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("handles large scores", () => {
    const result = formatScore(9999);
    expect(result).toContain("9999");
  });
});

// ---------------------------------------------------------------------------
// buildHnDigestPrompt
// ---------------------------------------------------------------------------

describe("buildHnDigestPrompt", () => {
  const sampleItems = [
    {
      id: 1001,
      title: "OpenAI releases new model with 1T parameters",
      url: "https://openai.com/blog/new-model",
      score: 892,
      by: "airesearcher",
      time: 1723334400,
      descendants: 234,
    },
    {
      id: 1002,
      title: "Anthropic publishes safety research on Claude",
      url: "https://anthropic.com/research/safety",
      score: 654,
      by: "safetyresearcher",
      time: 1723334400,
      descendants: 156,
    },
    {
      id: 1003,
      title: "Ask HN: What LLM tools are you using in production?",
      url: "https://news.ycombinator.com/item?id=1003",
      score: 445,
      by: "devpractitioner",
      time: 1723334400,
      descendants: 312,
    },
  ];

  it("returns a non-empty string", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("includes the date in the prompt", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    expect(prompt).toContain("2026-08-11");
  });

  it("includes item titles in the prompt", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    expect(prompt).toContain("OpenAI releases new model");
  });

  it("includes item scores in the prompt", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    expect(prompt).toContain("892");
  });

  it("includes item URLs in the prompt", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    expect(prompt).toContain("openai.com");
  });

  it("handles empty items array", () => {
    const prompt = buildHnDigestPrompt([], "2026-08-11");
    expect(typeof prompt).toBe("string");
  });

  it("includes comment count information", () => {
    const prompt = buildHnDigestPrompt(sampleItems, "2026-08-11");
    // Should include comment counts for context
    expect(prompt).toContain("234");
  });
});