import fs from "node:fs";
import path from "node:path";
import { parseLlmJson } from "./report.ts";
import { validateAiProjectCatalog, type AiProjectCandidate } from "./ai-projects.ts";

export const AI_PROJECT_SIGNALS_PATH = path.join("config", "ai-project-signals.json");
const RETENTION_DAYS = 90;

export interface AiProjectSignalEvidence {
  signalId: string;
  kind: "github" | "hacker-news" | "product-hunt" | "hugging-face" | "official";
  title: string;
  summary: string;
  source: { label: string; url: string; verifiedAt: string };
}

interface ModelCandidate extends Omit<
  AiProjectCandidate,
  "candidateId" | "origin" | "source" | "signalDate"
> {
  signalId: string;
}

function validDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function parseOrganizedAiProjectSignals(
  raw: string,
  evidence: AiProjectSignalEvidence[],
): AiProjectCandidate[] {
  const parsed = parseLlmJson<{ candidates?: unknown }>(raw);
  if (!Array.isArray(parsed.candidates)) throw new Error("AI project organizer must return candidates");
  const evidenceById = new Map(evidence.map((item) => [item.signalId, item]));
  const candidates = parsed.candidates.flatMap((unknownItem) => {
    if (!unknownItem || typeof unknownItem !== "object") return [];
    const item = unknownItem as ModelCandidate;
    const signal = evidenceById.get(item.signalId);
    if (!signal) return [];
    const {
      signalId: _signalId,
      source: _untrustedSource,
      ...copy
    } = item as ModelCandidate & {
      source?: unknown;
    };
    return [
      {
        ...copy,
        candidateId: `signal:${signal.signalId}`,
        origin: "verified-existing" as const,
        title: signal.title,
        summary: signal.summary,
        source: { ...signal.source },
        signalDate: signal.source.verifiedAt,
      },
    ];
  });
  return validateAiProjectCatalog(candidates);
}

function cutoffDate(today: string): string {
  const cutoff = new Date(`${today}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);
  return cutoff.toISOString().slice(0, 10);
}

export function mergeAiProjectSignals(
  existing: AiProjectCandidate[],
  incoming: AiProjectCandidate[],
  today: string,
): AiProjectCandidate[] {
  if (!incoming.length) return validateAiProjectCatalog(existing);
  const cutoff = cutoffDate(today);
  const byId = new Map<string, AiProjectCandidate>();
  for (const candidate of [...existing, ...incoming]) {
    if (!candidate.signalDate || !validDate(candidate.signalDate) || candidate.signalDate < cutoff) continue;
    byId.set(candidate.candidateId, candidate);
  }
  return validateAiProjectCatalog(
    [...byId.values()].sort((a, b) => (b.signalDate ?? "").localeCompare(a.signalDate ?? "")),
  );
}

function clean(value: unknown, fallback: string, limit = 320): string {
  const text = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  return (text || fallback).slice(0, limit);
}

function sourceBoundFallback(signal: AiProjectSignalEvidence): AiProjectCandidate {
  const actualTool =
    signal.kind === "github" || signal.kind === "hugging-face" || signal.kind === "product-hunt";
  return {
    candidateId: `signal:${signal.signalId}`,
    origin: actualTool ? "verified-existing" : "original-concept",
    title: actualTool ? `${signal.title}：复刻一个核心玩法` : `把“${signal.title.slice(0, 48)}”做成小实验`,
    oneLine: "从一条真实近期信号里，挑一个最值得亲手验证的 AI 能力。",
    summary: clean(signal.summary, "这是一条近期出现的 AI 项目或产品信号。"),
    outcome: "一个只覆盖核心能力、可以亲自试用和判断的原型。",
    whyWorthwhile: "从真实项目倒推实现，比只读介绍更容易看懂它为什么有价值。",
    skills: ["需求拆解", "AI 能力接入", "可行性验证"],
    realWorldPotential: "验证成功后可嵌入个人工作流，或继续改成垂直工具。",
    feasibilityProbe: "先用一到三小时复现最关键的一次输入、处理和输出，不做完整产品。",
    costAndRisks: ["先确认来源项目的许可、账号、地区和 API 费用", "不要在首次验证中处理敏感数据"],
    tags: ["learning", "practical"],
    crossDomain: false,
    largeCommercial: false,
    difficulty: {
      technical: 40,
      dependencies: 40,
      time: 40,
      costRisk: 20,
      uncertainty: 40,
      explanation: "路线来自真实项目，但仍需确认本机依赖和公开接口。",
    },
    source: { ...signal.source },
    signalDate: signal.source.verifiedAt,
  };
}

function xmlText(value: string | undefined): string {
  return (value ?? "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export function parsePublicFeed(xml: string): Array<{ title: string; url: string; summary: string }> {
  const blocks = [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)].slice(0, 8);
  return blocks.flatMap(([, , block]) => {
    const title = xmlText(block?.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
    const linkBody = xmlText(block?.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i)?.[1]);
    const linkHref = block?.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\/?\s*>/i)?.[1] ?? "";
    const url = linkHref || linkBody;
    const summary = xmlText(
      block?.match(
        /<(?:description|summary|content)\b[^>]*>([\s\S]*?)<\/(?:description|summary|content)>/i,
      )?.[1],
    );
    if (!title || !/^https:\/\//.test(url)) return [];
    return [
      {
        title: clean(title, "Recent item", 160),
        url: clean(url, "", 500),
        summary: clean(summary, "Recent public signal"),
      },
    ];
  });
}

async function fetchJson<T>(url: string, fetchImpl: typeof fetch): Promise<T> {
  const response = await fetchImpl(url, {
    headers: { accept: "application/json", "user-agent": "ai-daily-project-refresh/1.0" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

async function fetchText(url: string, fetchImpl: typeof fetch): Promise<string> {
  const response = await fetchImpl(url, {
    headers: { accept: "application/rss+xml,text/xml", "user-agent": "ai-daily-project-refresh/1.0" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

export async function fetchAiProjectEvidence(
  now = new Date(),
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<AiProjectSignalEvidence[]> {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const githubUrl = `https://api.github.com/search/repositories?q=topic%3Aai+created%3A%3E%3D${since}&sort=stars&order=desc&per_page=12`;
  const calls: Array<Promise<AiProjectSignalEvidence[]>> = [
    fetchJson<{ items?: Array<Record<string, unknown>> }>(githubUrl, fetchImpl).then((payload) =>
      (payload.items ?? []).flatMap((item) => {
        const name = typeof item.full_name === "string" ? item.full_name : "";
        const url = typeof item.html_url === "string" ? item.html_url : "";
        if (!name || !/^https:\/\//.test(url)) return [];
        return [
          {
            signalId: `github:${name}`,
            kind: "github" as const,
            title: name,
            summary: clean(item.description, `${name} 是近期出现的开源项目。`),
            source: { label: `GitHub · ${name}`, url, verifiedAt: today },
          },
        ];
      }),
    ),
    fetchJson<{ hits?: Array<Record<string, unknown>> }>(
      `https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&hitsPerPage=10`,
      fetchImpl,
    ).then((payload) =>
      (payload.hits ?? []).flatMap((item) => {
        const id = typeof item.objectID === "string" ? item.objectID : "";
        if (!id) return [];
        const url =
          typeof item.url === "string" && /^https:\/\//.test(item.url)
            ? item.url
            : `https://news.ycombinator.com/item?id=${id}`;
        return [
          {
            signalId: `hn:${id}`,
            kind: "hacker-news" as const,
            title: clean(item.title, "Hacker News AI discussion", 180),
            summary: "近期 Hacker News 上的 AI 相关讨论。",
            source: { label: "Hacker News", url, verifiedAt: today },
          },
        ];
      }),
    ),
    fetchJson<Array<Record<string, unknown>>>(
      "https://huggingface.co/api/models?sort=trendingScore&direction=-1&limit=10",
      fetchImpl,
    ).then((payload) =>
      payload.flatMap((item) => {
        const id = typeof item.id === "string" ? item.id : "";
        if (!id) return [];
        return [
          {
            signalId: `huggingface:${id}`,
            kind: "hugging-face" as const,
            title: id,
            summary: `Hugging Face 上的近期模型，任务：${clean(item.pipeline_tag, "未标注")}`,
            source: { label: `Hugging Face · ${id}`, url: `https://huggingface.co/${id}`, verifiedAt: today },
          },
        ];
      }),
    ),
    fetchText("https://www.producthunt.com/feed", fetchImpl).then((xml) =>
      parsePublicFeed(xml).map((item, index) => ({
        signalId: `producthunt:${index}:${item.url}`,
        kind: "product-hunt" as const,
        title: item.title,
        summary: item.summary,
        source: { label: `Product Hunt · ${item.title}`, url: item.url, verifiedAt: today },
      })),
    ),
    fetchText("https://blog.cloudflare.com/rss/", fetchImpl).then((xml) =>
      parsePublicFeed(xml).map((item, index) => ({
        signalId: `official:cloudflare:${index}:${item.url}`,
        kind: "official" as const,
        title: item.title,
        summary: item.summary,
        source: { label: `Cloudflare Blog · ${item.title}`, url: item.url, verifiedAt: today },
      })),
    ),
  ];
  const settled = await Promise.allSettled(calls);
  const values = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  return [...new Map(values.map((item) => [item.source.url, item])).values()];
}

export function buildAiProjectOrganizerPrompt(evidence: AiProjectSignalEvidence[]): string {
  return `你是 AI 项目编辑。只能根据证据数组草拟完整中文候选，不得创造或修改来源事实。每个候选必须原样返回 signalId，并提供 title、oneLine、summary、outcome、whyWorthwhile、skills、realWorldPotential、feasibilityProbe、costAndRisks、tags、crossDomain、largeCommercial、difficulty 五维(20-100)和 explanation。只输出 {"candidates":[]} JSON。证据：\n${JSON.stringify(evidence, null, 2)}`;
}

export async function organizeAiProjectEvidence(
  evidence: AiProjectSignalEvidence[],
  apiKey = process.env.DEEPSEEK_API_KEY,
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<AiProjectCandidate[]> {
  if (!evidence.length) return [];
  if (!apiKey) return validateAiProjectCatalog(evidence.map(sourceBoundFallback));
  try {
    const response = await fetchImpl("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.2,
        max_tokens: 8000,
        messages: [{ role: "user", content: buildAiProjectOrganizerPrompt(evidence) }],
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!response.ok) throw new Error(`DeepSeek returned HTTP ${response.status}`);
    const payload = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek returned no AI project candidates");
    return parseOrganizedAiProjectSignals(content, evidence);
  } catch (error) {
    console.error(`  [ai-project] DeepSeek organizer failed; using source-bound evidence: ${error}`);
    return validateAiProjectCatalog(evidence.map(sourceBoundFallback));
  }
}

export async function refreshAiProjectSignals(
  filePath = AI_PROJECT_SIGNALS_PATH,
  now = new Date(),
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<AiProjectCandidate[]> {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  let existing: AiProjectCandidate[] = [];
  try {
    existing = validateAiProjectCatalog(
      JSON.parse(fs.readFileSync(filePath, "utf8")) as AiProjectCandidate[],
    );
  } catch {
    /* first run */
  }
  try {
    const evidence = await fetchAiProjectEvidence(now, fetchImpl);
    const incoming = await organizeAiProjectEvidence(evidence, process.env.DEEPSEEK_API_KEY, fetchImpl);
    const merged = mergeAiProjectSignals(existing, incoming, today);
    if (!incoming.length) return existing;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n", "utf8");
    return merged;
  } catch (error) {
    console.error(`  [ai-project] Weekly refresh kept the previous pool: ${error}`);
    return existing;
  }
}
