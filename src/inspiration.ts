import { createHash } from "node:crypto";
import { parseLlmJson } from "./report.ts";
import type { TrendingData } from "./trending.ts";
import type { HnData } from "./hn.ts";
import type { PhData } from "./ph.ts";
import type { HfData } from "./hf.ts";
import type { WebFetchResult } from "./web.ts";

export const INSPIRATION_VERSION = 1 as const;

export type InspirationOrigin = "dynamic" | "evergreen";

export interface InspirationSource {
  label: string;
  url: string;
}

export interface InspirationCandidate {
  id: string;
  origin: InspirationOrigin;
  category: string;
  title: string;
  summary: string;
  whyInteresting: string;
  remixIdea: string;
  source: InspirationSource;
  caution?: string;
  signalDate?: string;
}

export interface InspirationCard {
  version: typeof INSPIRATION_VERSION;
  date: string;
  generatedAt: string;
  candidateId: string;
  origin: InspirationOrigin;
  category: string;
  title: string;
  summary: string;
  whyInteresting: string;
  remixIdea: string;
  source: InspirationSource;
  caution?: string;
  generatedBy: "llm" | "fallback";
}

export interface InspirationHistoryEntry {
  id: string;
  date: string;
}

export interface WeeklyDynamicState {
  week: string;
  count: number;
}

export interface InspirationState {
  recent: InspirationHistoryEntry[];
  weeklyDynamic?: WeeklyDynamicState;
}

export interface InspirationInputs {
  trendingData: TrendingData;
  hnData: HnData;
  phData: PhData;
  hfData: HfData;
  webResults: WebFetchResult[];
}

interface ModelSelection {
  candidateId?: unknown;
}

function shortHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function usableUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

function compact(value: string | null | undefined, fallback: string): string {
  const text = value?.replace(/\s+/g, " ").trim();
  return text || fallback;
}

export function buildDynamicCandidates(inputs: InspirationInputs): InspirationCandidate[] {
  const candidates: InspirationCandidate[] = [];

  for (const repo of [...inputs.trendingData.trendingRepos, ...inputs.trendingData.searchRepos]) {
    if (!usableUrl(repo.url)) continue;
    const description = compact(repo.description, `${repo.fullName} 是近期活跃的开源项目。`);
    candidates.push({
      id: `github:${repo.fullName}`,
      origin: "dynamic",
      category: "开源项目",
      title: repo.fullName,
      summary: description,
      whyInteresting: "它正在获得开发者关注，可能藏着值得借鉴的新功能或工作方式。",
      remixIdea: "看看它解决的核心问题，想一想能否和自己的日报、笔记或自动化组合。",
      source: { label: `GitHub · ${repo.fullName}`, url: repo.url },
    });
  }

  for (const story of inputs.hnData.stories) {
    if (!usableUrl(story.url)) continue;
    candidates.push({
      id: `hn:${story.id}`,
      origin: "dynamic",
      category: "社区发现",
      title: story.title,
      summary: `这条内容在 Hacker News 获得 ${story.points} 分和 ${story.comments} 条讨论。`,
      whyInteresting: "它已经引发真实讨论，适合用来发现技术圈正在尝试或争论的新东西。",
      remixIdea: "不必追完整讨论，先看它解决的问题是否能迁移到自己的工作或项目。",
      source: { label: "Hacker News 原文", url: story.url },
      signalDate: story.createdAt.slice(0, 10),
    });
  }

  for (const product of inputs.phData.products) {
    const url = usableUrl(product.website) ? product.website : usableUrl(product.url) ? product.url : "";
    if (!url) continue;
    candidates.push({
      id: `producthunt:${product.id}`,
      origin: "dynamic",
      category: "新产品",
      title: product.name,
      summary: compact(product.tagline, `${product.name} 是 Product Hunt 上的新产品。`),
      whyInteresting: "它把一个具体需求做成了能直接体验的产品，适合观察产品切入点。",
      remixIdea: "留意它只解决了哪一个小问题，以及能否换成更适合自己的版本。",
      source: { label: product.name, url },
      signalDate: product.createdAt.slice(0, 10),
    });
  }

  for (const model of inputs.hfData.models) {
    if (!usableUrl(model.url)) continue;
    const task = compact(model.pipelineTag, "AI 任务");
    candidates.push({
      id: `huggingface:${model.id}`,
      origin: "dynamic",
      category: "AI 小发现",
      title: model.id,
      summary: `这是一个用于 ${task} 的公开模型页面。`,
      whyInteresting: "它能让人看到 AI 除了聊天之外还能被做成哪些具体能力。",
      remixIdea: "先看页面示例，再想象它能否成为一个更小、更贴近日常的工具。",
      source: { label: `Hugging Face · ${model.id}`, url: model.url },
      signalDate: model.lastModified.slice(0, 10),
    });
  }

  for (const result of inputs.webResults) {
    for (const item of result.newItems) {
      if (!usableUrl(item.url)) continue;
      candidates.push({
        id: `web:${shortHash(item.url)}`,
        origin: "dynamic",
        category: "产品动态",
        title: item.title,
        summary: compact(item.content, `${result.siteName} 发布了一项新内容。`).slice(0, 360),
        whyInteresting: "这是一手产品更新，适合快速了解 AI 产品正在增加什么能力。",
        remixIdea: "只挑其中一个变化，想一想它可能怎样影响自己的工具或工作流。",
        source: { label: `${result.siteName} · ${item.title}`, url: item.url },
        signalDate: item.lastmod.slice(0, 10),
      });
    }
  }

  const unique = new Map<string, InspirationCandidate>();
  for (const candidate of candidates) unique.set(candidate.id, candidate);
  return [...unique.values()];
}

export function validateCatalog(candidates: InspirationCandidate[]): InspirationCandidate[] {
  const ids = new Set<string>();
  for (const candidate of candidates) {
    if (ids.has(candidate.id)) throw new Error(`Duplicate inspiration candidate id: ${candidate.id}`);
    ids.add(candidate.id);
    if (candidate.origin !== "dynamic" && candidate.origin !== "evergreen") {
      throw new Error(`Invalid inspiration candidate origin: ${candidate.id}`);
    }
    if (!candidate.category?.trim()) {
      throw new Error(`Missing inspiration candidate category: ${candidate.id}`);
    }
    if (!candidate.source?.label?.trim()) {
      throw new Error(`Missing inspiration candidate source label: ${candidate.id}`);
    }
    if (
      !candidate.id ||
      !candidate.title ||
      !candidate.summary ||
      !candidate.whyInteresting ||
      !candidate.remixIdea
    ) {
      throw new Error(`Incomplete inspiration candidate: ${candidate.id || "<missing-id>"}`);
    }
    if (!usableUrl(candidate.source?.url)) {
      throw new Error(`Inspiration candidate ${candidate.id} must use an HTTPS source URL`);
    }
  }
  return candidates;
}

export function filterRecentlyUsed(
  candidates: InspirationCandidate[],
  state: InspirationState,
  dateStr: string,
  days = 30,
): InspirationCandidate[] {
  const current = Date.parse(`${dateStr}T00:00:00Z`);
  const cutoff = current - days * 24 * 60 * 60 * 1000;
  const blocked = new Set(
    state.recent.filter((entry) => Date.parse(`${entry.date}T00:00:00Z`) >= cutoff).map((entry) => entry.id),
  );
  return candidates.filter((candidate) => !blocked.has(candidate.id));
}

export function weekKey(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - day + 1);
  return date.toISOString().slice(0, 10);
}

export function weeklyDynamicCount(state: InspirationState, dateStr: string): number {
  return state.weeklyDynamic?.week === weekKey(dateStr) ? state.weeklyDynamic.count : 0;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Missing model field: ${field}`);
  return value.replace(/\s+/g, " ").trim();
}

export function parseInspirationSelection(
  raw: string,
  candidates: InspirationCandidate[],
  date: string,
  generatedAt: string,
): InspirationCard {
  const selection = parseLlmJson<ModelSelection>(raw);
  const candidateId = requiredText(selection.candidateId, "candidateId");
  const candidate = candidates.find((item) => item.id === candidateId);
  if (!candidate) throw new Error(`Unknown candidate selected by model: ${candidateId}`);

  return {
    version: INSPIRATION_VERSION,
    date,
    generatedAt,
    candidateId: candidate.id,
    origin: candidate.origin,
    category: candidate.category,
    title: candidate.title,
    summary: candidate.summary,
    whyInteresting: candidate.whyInteresting,
    remixIdea: candidate.remixIdea,
    source: candidate.source,
    ...(candidate.caution ? { caution: candidate.caution } : {}),
    generatedBy: "llm",
  };
}

export function createFallbackCard(
  candidates: InspirationCandidate[],
  date: string,
  generatedAt: string,
  random: () => number = Math.random,
): InspirationCard {
  if (!candidates.length) throw new Error("No inspiration candidates available for fallback");
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  const candidate = candidates[index]!;
  return {
    version: INSPIRATION_VERSION,
    date,
    generatedAt,
    candidateId: candidate.id,
    origin: candidate.origin,
    category: candidate.category,
    title: candidate.title,
    summary: candidate.summary,
    whyInteresting: candidate.whyInteresting,
    remixIdea: candidate.remixIdea,
    source: candidate.source,
    ...(candidate.caution ? { caution: candidate.caution } : {}),
    generatedBy: "fallback",
  };
}

export function buildInspirationPrompt(candidates: InspirationCandidate[], dateStr: string): string {
  const compactCandidates = candidates.map((candidate) => ({
    id: candidate.id,
    category: candidate.category,
    title: candidate.title,
    summary: candidate.summary,
    whyInteresting: candidate.whyInteresting,
    remixIdea: candidate.remixIdea,
    sourceLabel: candidate.source.label,
    sourceUrl: candidate.source.url,
    caution: candidate.caution ?? "",
  }));

  return (
    `你是“每日灵感”编辑。今天是 ${dateStr}。从候选池中挑一个让普通人觉得“原来还有这东西”的发现。程序会使用候选池内经过核验的中文文案，你只负责选择。\n\n` +
    `要求：\n` +
    `1. 只能选择一个候选项，candidateId 必须原样复制。\n` +
    `2. 不要写成课程，不要列学习步骤或解释。\n` +
    `3. 不要输出来源链接、价格、功能、地区或安全事实。\n` +
    `4. 只输出 JSON，不要代码围栏：\n` +
    `{"candidateId":"..."}\n\n` +
    `候选池：\n${JSON.stringify(compactCandidates, null, 2)}`
  );
}
