import fs from "node:fs";
import path from "node:path";
import { toCstDateStr } from "./date.ts";
import { validateCatalog, type InspirationCandidate } from "./inspiration.ts";

export const SIGNALS_PATH = path.join("config", "inspiration-signals.json");
const RETENTION_DAYS = 90;
const USER_AGENT = "agents-radar-inspiration-refresh/1.0";

type JsonFetcher = (input: string, init?: RequestInit) => Promise<Response>;

function cleanText(value: unknown, fallback: string, limit = 360): string {
  const text = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  return (text || fallback).slice(0, limit);
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validSignal(candidate: InspirationCandidate, cutoff: string): boolean {
  return (
    candidate.origin === "dynamic" &&
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.summary === "string" &&
    typeof candidate.whyInteresting === "string" &&
    typeof candidate.remixIdea === "string" &&
    validDate(candidate.signalDate) &&
    candidate.signalDate >= cutoff &&
    /^https:\/\//.test(candidate.source?.url ?? "")
  );
}

function cutoffDate(today: string): string {
  const cutoff = new Date(`${today}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);
  return cutoff.toISOString().slice(0, 10);
}

export function mergeInspirationSignals(
  existing: InspirationCandidate[],
  incoming: InspirationCandidate[],
  today: string,
): InspirationCandidate[] {
  const cutoff = cutoffDate(today);
  const byId = new Map<string, InspirationCandidate>();
  for (const candidate of [...existing, ...incoming]) {
    if (validSignal(candidate, cutoff)) byId.set(candidate.id, candidate);
  }

  const byUrl = new Map<string, InspirationCandidate>();
  for (const candidate of byId.values()) {
    const previous = byUrl.get(candidate.source.url);
    if (!previous || (candidate.signalDate ?? "") > (previous.signalDate ?? "")) {
      byUrl.set(candidate.source.url, candidate);
    }
  }
  return validateCatalog(
    [...byUrl.values()].sort((a, b) => (b.signalDate ?? "").localeCompare(a.signalDate ?? "")),
  );
}

async function fetchJson<T>(url: string, fetchImpl: JsonFetcher): Promise<T> {
  const response = await fetchImpl(url, {
    headers: { accept: "application/json", "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

function githubCandidates(payload: { items?: Array<Record<string, unknown>> }, date: string) {
  return (payload.items ?? []).flatMap((item) => {
    const fullName = typeof item.full_name === "string" ? item.full_name : "";
    const url = typeof item.html_url === "string" ? item.html_url : "";
    if (!fullName || !/^https:\/\//.test(url)) return [];
    return [
      {
        id: `signal:github:${fullName}`,
        origin: "dynamic" as const,
        category: "开源项目",
        title: fullName,
        summary: cleanText(item.description, `${fullName} 是近期出现的开源项目。`),
        whyInteresting: "它正在获得开发者关注，可能藏着值得借鉴的新功能或工作方式。",
        remixIdea: "看看它解决的核心问题，想想能否和自己的日报、笔记或自动化组合。",
        source: { label: `GitHub · ${fullName}`, url },
        signalDate: validDate(String(item.created_at ?? "").slice(0, 10))
          ? String(item.created_at).slice(0, 10)
          : date,
      },
    ];
  });
}

function hnCandidates(payload: { hits?: Array<Record<string, unknown>> }, date: string) {
  return (payload.hits ?? []).flatMap((item) => {
    const id = typeof item.objectID === "string" ? item.objectID : "";
    const title = cleanText(item.title, "Hacker News 上的一条新讨论", 180);
    if (!id) return [];
    const url = typeof item.url === "string" && /^https:\/\//.test(item.url)
      ? item.url
      : `https://news.ycombinator.com/item?id=${id}`;
    return [
      {
        id: `signal:hn:${id}`,
        origin: "dynamic" as const,
        category: "社区发现",
        title,
        summary: "这是一条近期围绕 AI、工具或数字生活展开的社区讨论。",
        whyInteresting: "真实讨论往往能暴露产品背后的需求、争议和意外用法。",
        remixIdea: "先看它在解决什么问题，再想想是否能迁移到自己的工作或项目。",
        source: { label: "Hacker News", url },
        signalDate: validDate(String(item.created_at ?? "").slice(0, 10))
          ? String(item.created_at).slice(0, 10)
          : date,
      },
    ];
  });
}

function huggingFaceCandidates(payload: Array<Record<string, unknown>>, date: string) {
  return payload.flatMap((item) => {
    const id = typeof item.id === "string" ? item.id : "";
    if (!id) return [];
    const task = cleanText(item.pipeline_tag, "AI 任务", 80);
    return [
      {
        id: `signal:huggingface:${id}`,
        origin: "dynamic" as const,
        category: "AI 小发现",
        title: id,
        summary: `这是一个用于 ${task} 的公开模型页面。`,
        whyInteresting: "它能让人看到 AI 除了聊天之外还能被做成哪些具体能力。",
        remixIdea: "先看页面示例，再想象它能否成为一个更小、更贴近日常的工具。",
        source: { label: `Hugging Face · ${id}`, url: `https://huggingface.co/${id}` },
        signalDate: validDate(String(item.lastModified ?? "").slice(0, 10))
          ? String(item.lastModified).slice(0, 10)
          : date,
      },
    ];
  });
}

export interface FetchedInspirationSignals {
  candidates: InspirationCandidate[];
  successfulSources: number;
}

export async function fetchInspirationSignals(
  now = new Date(),
  fetchImpl: JsonFetcher = globalThis.fetch,
): Promise<FetchedInspirationSignals> {
  const date = toCstDateStr(now);
  const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const githubUrl = new URL("https://api.github.com/search/repositories");
  githubUrl.searchParams.set("q", `topic:ai created:>=${since}`);
  githubUrl.searchParams.set("sort", "stars");
  githubUrl.searchParams.set("order", "desc");
  githubUrl.searchParams.set("per_page", "10");

  const requests = [
    fetchJson<{ items?: Array<Record<string, unknown>> }>(githubUrl.toString(), fetchImpl).then((data) =>
      githubCandidates(data, date),
    ),
    fetchJson<{ hits?: Array<Record<string, unknown>> }>(
      `https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&numericFilters=created_at_i%3E${Math.floor(
        (now.getTime() - 7 * 24 * 60 * 60 * 1000) / 1000,
      )}&hitsPerPage=10`,
      fetchImpl,
    ).then((data) => hnCandidates(data, date)),
    fetchJson<Array<Record<string, unknown>>>(
      "https://huggingface.co/api/models?pipeline_tag=text-generation&sort=likes&direction=-1&limit=10",
      fetchImpl,
    ).then((data) => huggingFaceCandidates(data, date)),
  ];
  const results = await Promise.allSettled(requests);
  return {
    candidates: results.flatMap((result) => (result.status === "fulfilled" ? result.value : [])),
    successfulSources: results.filter((result) => result.status === "fulfilled").length,
  };
}

export function loadInspirationSignals(filePath = SIGNALS_PATH, today = toCstDateStr(new Date())) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as InspirationCandidate[];
    return mergeInspirationSignals([], parsed, today);
  } catch {
    return [];
  }
}

export async function refreshInspirationSignals(
  filePath = SIGNALS_PATH,
  now = new Date(),
  fetchImpl: JsonFetcher = globalThis.fetch,
): Promise<InspirationCandidate[]> {
  const today = toCstDateStr(now);
  let existing: InspirationCandidate[] = [];
  try {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8")) as InspirationCandidate[];
  } catch {
    // A missing signal file is normal on the first refresh.
  }
  const fetched = await fetchInspirationSignals(now, fetchImpl);
  if (fetched.successfulSources === 0) return mergeInspirationSignals([], existing, today);
  const merged = mergeInspirationSignals(existing, fetched.candidates, today);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n", "utf-8");
  return merged;
}
