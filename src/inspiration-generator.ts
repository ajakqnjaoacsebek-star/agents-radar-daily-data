import fs from "node:fs";
import path from "node:path";
import {
  buildDynamicCandidates,
  buildInspirationPrompt,
  createFallbackCard,
  filterRecentlyUsed,
  parseInspirationSelection,
  validateCatalog,
  type InspirationCandidate,
  type InspirationCard,
  type InspirationInputs,
  type InspirationState,
  weeklyDynamicCount,
  weekKey,
} from "./inspiration.ts";
import { callLlm, saveFile } from "./report.ts";
import { loadInspirationSignals } from "./inspiration-refresh.ts";

const CATALOG_PATH = path.join("config", "inspiration-catalog.json");
const STATE_PATH = path.join("digests", "inspiration-state.json");
const RECENT_DAYS = 30;
const HISTORY_DAYS = 90;
const MODEL_CANDIDATE_LIMIT = 24;

export interface InspirationGenerationDeps {
  generate: (prompt: string) => Promise<string>;
  random: () => number;
}

interface GenerateInspirationCardParams {
  candidates: InspirationCandidate[];
  evergreenCandidates: InspirationCandidate[];
  state: InspirationState;
  date: string;
  generatedAt: string;
  allowLlm?: boolean;
  deps?: InspirationGenerationDeps;
}

export interface SaveDailyInspirationOptions {
  allowLlm?: boolean;
  signalCandidates?: InspirationCandidate[];
}

const defaultDeps: InspirationGenerationDeps = {
  generate: (prompt) => callLlm(prompt, 1024, { timeoutMs: 30_000 }),
  random: Math.random,
};

function shuffled<T>(values: T[], random: () => number): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex]!, result[index]!];
  }
  return result;
}

export async function generateInspirationCard({
  candidates,
  evergreenCandidates,
  state,
  date,
  generatedAt,
  allowLlm = true,
  deps = defaultDeps,
}: GenerateInspirationCardParams): Promise<InspirationCard> {
  const eligible = filterRecentlyUsed(candidates, state, date, RECENT_DAYS);
  const dynamicAllowed = weeklyDynamicCount(state, date) < 3;
  const selectable = eligible.filter((candidate) => dynamicAllowed || candidate.origin !== "dynamic");
  const modelPool = shuffled(selectable, deps.random).slice(0, MODEL_CANDIDATE_LIMIT);

  if (allowLlm && modelPool.length) {
    try {
      const raw = await deps.generate(buildInspirationPrompt(modelPool, date));
      return parseInspirationSelection(raw, modelPool, date, generatedAt);
    } catch (error) {
      console.error(`  [inspiration] LLM selection failed, using evergreen fallback: ${error}`);
    }
  }

  const eligibleDynamic = dynamicAllowed ? eligible.filter((candidate) => candidate.origin === "dynamic") : [];
  const eligibleEvergreen = filterRecentlyUsed(evergreenCandidates, state, date, RECENT_DAYS);
  const fallbackPool = eligibleDynamic.length
    ? eligibleDynamic
    : eligibleEvergreen.length
      ? eligibleEvergreen
      : evergreenCandidates;
  return createFallbackCard(fallbackPool, date, generatedAt, deps.random);
}

export function updateInspirationState(
  state: InspirationState,
  selectedId: string,
  date: string,
  origin?: InspirationCandidate["origin"],
): InspirationState {
  const current = Date.parse(`${date}T00:00:00Z`);
  const cutoff = current - HISTORY_DAYS * 24 * 60 * 60 * 1000;
  const recent = state.recent.filter(
    (entry) => entry.date !== date && Date.parse(`${entry.date}T00:00:00Z`) >= cutoff,
  );
  recent.push({ id: selectedId, date });
  const next: InspirationState = { recent };
  if (origin === "dynamic") {
    next.weeklyDynamic = {
      week: weekKey(date),
      count: weeklyDynamicCount(state, date) + 1,
    };
  } else if (state.weeklyDynamic && state.weeklyDynamic.week === weekKey(date)) {
    next.weeklyDynamic = state.weeklyDynamic;
  }
  return next;
}

export function loadInspirationCatalog(filePath = CATALOG_PATH): InspirationCandidate[] {
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as InspirationCandidate[];
  return validateCatalog(parsed);
}

export function loadInspirationState(filePath = STATE_PATH): InspirationState {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Partial<InspirationState>;
    if (!Array.isArray(parsed.recent)) return { recent: [] };
    return {
      recent: parsed.recent.filter(
        (entry): entry is { id: string; date: string } =>
          typeof entry?.id === "string" && /^\d{4}-\d{2}-\d{2}$/.test(entry.date ?? ""),
      ),
      ...(parsed.weeklyDynamic &&
      typeof parsed.weeklyDynamic.week === "string" &&
      Number.isInteger(parsed.weeklyDynamic.count) &&
      parsed.weeklyDynamic.count >= 0
        ? { weeklyDynamic: parsed.weeklyDynamic }
        : {}),
    };
  } catch {
    return { recent: [] };
  }
}

export async function saveDailyInspiration(
  inputs: InspirationInputs,
  date: string,
  generatedAt: string,
  options: SaveDailyInspirationOptions = {},
): Promise<InspirationCard> {
  const evergreenCandidates = loadInspirationCatalog();
  const dynamicCandidates = [
    ...buildDynamicCandidates(inputs),
    ...(options.signalCandidates ?? loadInspirationSignals()),
  ];
  const candidates = validateCatalog([...evergreenCandidates, ...dynamicCandidates]);
  const state = loadInspirationState();
  const card = await generateInspirationCard({
    candidates,
    evergreenCandidates,
    state,
    date,
    generatedAt,
    allowLlm: options.allowLlm,
  });

  const outputPath = saveFile(JSON.stringify(card, null, 2) + "\n", date, "daily-inspiration.json");
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(
    STATE_PATH,
    JSON.stringify(updateInspirationState(state, card.candidateId, date, card.origin), null, 2) + "\n",
    "utf-8",
  );
  console.log(`  [inspiration] Saved ${outputPath}`);
  return card;
}

export async function saveDailyInspirationSafely(
  inputs: InspirationInputs,
  date: string,
  generatedAt: string,
  save: typeof saveDailyInspiration = saveDailyInspiration,
): Promise<InspirationCard | null> {
  try {
    return await save(inputs, date, generatedAt);
  } catch (error) {
    console.error(`  [inspiration] Skipped without interrupting the existing digest: ${error}`);
    return null;
  }
}
