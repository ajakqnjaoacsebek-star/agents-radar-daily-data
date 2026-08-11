/**
 * Hacker News AI Digest fetcher.
 *
 * Fetches top/best stories from HN Firebase API, filters for AI-relevant
 * content, and provides utilities for building digest prompts.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HnItem {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export interface HnRawItem {
  id?: number;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  time?: number;
  descendants?: number;
  type?: string;
}

export interface HnFetchResult {
  items: HnItem[];
  fetchedAt: string;
  totalFetched: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HN_API_BASE = "https://hacker-news.firebaseio.com/v0";
const HN_ITEM_URL = "https://news.ycombinator.com/item?id=";

/** Minimum score for an item to be considered */
const MIN_SCORE = 10;

/** Maximum number of top story IDs to fetch */
const MAX_STORIES_TO_FETCH = 200;

/** Maximum number of items to include in digest */
const MAX_DIGEST_ITEMS = 30;

/** Per-request timeout (ms) */
const FETCH_TIMEOUT_MS = 10_000;

/** AI-related keywords for filtering */
const AI_KEYWORDS = [
  "ai",
  "llm",
  "gpt",
  "claude",
  "gemini",
  "openai",
  "anthropic",
  "deepmind",
  "machine learning",
  "deep learning",
  "neural network",
  "transformer",
  "diffusion",
  "stable diffusion",
  "midjourney",
  "dall-e",
  "dall·e",
  "chatgpt",
  "copilot",
  "agent",
  "rag",
  "embedding",
  "fine-tun",
  "inference",
  "hugging face",
  "mistral",
  "llama",
  "falcon",
  "language model",
  "foundation model",
  "multimodal",
  "vector database",
  "vector db",
  "langchain",
  "autogpt",
  "reinforcement learning",
  "rlhf",
  "alignment",
  "hallucination",
  "prompt",
  "tokenizer",
  "attention mechanism",
  "generative ai",
  "artificial intelligence",
  "ml ",
  " ml",
  "nlp",
  "computer vision",
  "image generation",
  "text generation",
  "code generation",
  "nvidia",
  "cuda",
  "gpu cluster",
  "tpu",
  "openrouter",
  "perplexity",
  "cohere",
  "together ai",
  "replicate",
  "groq",
  "cerebras",
  "sam altman",
  "ilya sutskever",
  "yann lecun",
  "andrej karpathy",
];

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------

async function httpGet(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0; +https://github.com/search?q=agents-radar)",
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`);
    return await resp.json();
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/**
 * Parse a raw HN API item into a typed HnItem.
 * Returns null if the item is not a valid story.
 */
export function parseHnItem(raw: HnRawItem): HnItem | null {
  if (!raw || raw.type !== "story") return null;
  if (!raw.title || !raw.id) return null;

  return {
    id: raw.id,
    title: raw.title,
    url: raw.url ?? `${HN_ITEM_URL}${raw.id}`,
    score: raw.score ?? 0,
    by: raw.by ?? "",
    time: raw.time ?? 0,
    descendants: raw.descendants ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/**
 * Filter HN items to those relevant to AI/ML topics.
 */
export function filterAiItems(items: HnItem[]): HnItem[] {
  return items.filter((item) => {
    if (item.score < MIN_SCORE) return false;
    const lower = item.title.toLowerCase();
    return AI_KEYWORDS.some((kw) => lower.includes(kw));
  });
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/**
 * Format a score number as a display string.
 */
export function formatScore(score: number): string {
  return `${score} points`;
}

// ---------------------------------------------------------------------------
// Prompt building
// ---------------------------------------------------------------------------

/**
 * Build an LLM prompt for generating an HN AI digest.
 */
export function buildHnDigestPrompt(items: HnItem[], date: string): string {
  if (items.length === 0) {
    return `Generate a Hacker News AI digest for ${date}. No items were found today.`;
  }

  const itemList = items
    .map(
      (item, i) =>
        `${i + 1}. [${item.score} points, ${item.descendants} comments] ${item.title}\n   URL: ${item.url}\n   HN: ${HN_ITEM_URL}${item.id}`
    )
    .join("\n\n");

  return `You are generating a Hacker News AI Digest for ${date}.

Below are the top AI-related Hacker News stories for today, sorted by score:

${itemList}

Please create a concise digest summarizing the most important AI news and discussions from Hacker News today. 
Group related stories where appropriate. Include the HN discussion links.
Focus on what matters most to AI practitioners and researchers.`;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

/**
 * Fetch top story IDs from HN.
 */
async function fetchTopStoryIds(): Promise<number[]> {
  const ids = (await httpGet(`${HN_API_BASE}/topstories.json`)) as number[];
  return ids.slice(0, MAX_STORIES_TO_FETCH);
}

/**
 * Fetch a single HN item by ID.
 */
async function fetchItem(id: number): Promise<HnItem | null> {
  try {
    const raw = (await httpGet(`${HN_API_BASE}/item/${id}.json`)) as HnRawItem;
    return parseHnItem(raw);
  } catch {
    return null;
  }
}

/**
 * Fetch HN top stories, filter for AI content, and return results.
 */
export async function fetchHnAiItems(date: string): Promise<HnFetchResult> {
  console.log("  [hn] Fetching top story IDs...");
  const ids = await fetchTopStoryIds();
  console.log(`  [hn] Got ${ids.length} story IDs, fetching details...`);

  const items: HnItem[] = [];
  for (const id of ids) {
    const item = await fetchItem(id);
    if (item) items.push(item);
  }

  console.log(`  [hn] Fetched ${items.length} stories`);

  const aiItems = filterAiItems(items);
  console.log(`  [hn] Filtered to ${aiItems.length} AI-relevant stories`);

  // Sort by score descending
  aiItems.sort((a, b) => b.score - a.score);

  const topItems = aiItems.slice(0, MAX_DIGEST_ITEMS);

  return {
    items: topItems,
    fetchedAt: date,
    totalFetched: items.length,
  };
}