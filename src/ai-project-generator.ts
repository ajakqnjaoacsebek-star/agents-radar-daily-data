import fs from "node:fs";
import path from "node:path";
import {
  createAiProjectCard,
  selectDailyAiProject,
  validateAiProjectCatalog,
  type AiProjectCandidate,
  type AiProjectCard,
  type AiProjectSelectionState,
  type PrivateProjectPreferences,
  calibrateAbilityOffset,
} from "./ai-projects.ts";

const CATALOG_PATH = path.join("config", "ai-project-catalog.json");
const SIGNALS_PATH = path.join("config", "ai-project-signals.json");
const STATE_PATH = path.join("digests", "ai-project-state.json");
const DIGESTS_DIRECTORY = "digests";
const HISTORY_DAYS = 180;

export interface VaultReadConfig {
  owner: string;
  repo: string;
  path: string;
  token: string;
  branch?: string;
}

export interface SaveDailyAiProjectOptions {
  date: string;
  catalogPath?: string;
  signalsPath?: string;
  statePath?: string;
  digestsDirectory?: string;
  preferences?: PrivateProjectPreferences;
}

export function defaultPrivateProjectPreferences(): PrivateProjectPreferences {
  return { abilityOffset: 0, abilityMode: "auto", feedback: [], completed: [] };
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function sanitizePreferences(value: unknown): PrivateProjectPreferences {
  if (!value || typeof value !== "object") return defaultPrivateProjectPreferences();
  const state = value as Record<string, unknown>;
  const ability =
    state.ability && typeof state.ability === "object" ? (state.ability as Record<string, unknown>) : {};
  const feedback = Array.isArray(state.feedback)
    ? state.feedback.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const entry = item as Record<string, unknown>;
        if (typeof entry.candidateId !== "string" || !Array.isArray(entry.reasons)) return [];
        return [
          {
            candidateId: entry.candidateId,
            reasons: entry.reasons.filter((reason): reason is string => typeof reason === "string"),
            ...(typeof entry.note === "string" && entry.note.trim() ? { note: entry.note.trim() } : {}),
          },
        ];
      })
    : [];
  const completed = Array.isArray(state.completed)
    ? state.completed.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const entry = item as Record<string, unknown>;
        if (
          typeof entry.projectId !== "string" ||
          !validDate(entry.completedAt) ||
          typeof (entry.rating as Record<string, unknown> | undefined)?.starsAtCompletion !== "number" ||
          (entry.verification !== "codex" && entry.verification !== "self")
        )
          return [];
        const verification: "codex" | "self" = entry.verification;
        return [
          {
            projectId: entry.projectId,
            completedAt: entry.completedAt,
            starsAtCompletion: Math.max(
              1,
              Math.min(5, Math.round(Number((entry.rating as Record<string, unknown>).starsAtCompletion))),
            ),
            verification,
          },
        ];
      })
    : [];
  const preferences: PrivateProjectPreferences = {
    abilityOffset: typeof ability.offset === "number" ? Math.max(0, Math.floor(ability.offset)) : 0,
    abilityMode: ability.mode === "manual" ? "manual" : "auto",
    feedback,
    completed,
  };
  preferences.abilityOffset = calibrateAbilityOffset(preferences);
  return preferences;
}

export async function loadPrivateProjectPreferences(
  config?: VaultReadConfig,
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<PrivateProjectPreferences> {
  if (!config?.owner || !config.repo || !config.path || !config.token)
    return defaultPrivateProjectPreferences();
  try {
    const url = new URL(
      `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${config.path.split("/").map(encodeURIComponent).join("/")}`,
    );
    url.searchParams.set("ref", config.branch ?? "main");
    const response = await fetchImpl(url.toString(), {
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${config.token}`,
        "x-github-api-version": "2022-11-28",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return defaultPrivateProjectPreferences();
    const payload = (await response.json()) as { content?: string; encoding?: string };
    if (payload.encoding !== "base64" || typeof payload.content !== "string")
      return defaultPrivateProjectPreferences();
    return sanitizePreferences(
      JSON.parse(Buffer.from(payload.content.replace(/\s/g, ""), "base64").toString("utf8")),
    );
  } catch {
    return defaultPrivateProjectPreferences();
  }
}

function loadCatalog(filePath: string, allowMissing = false): AiProjectCandidate[] {
  try {
    return validateAiProjectCatalog(JSON.parse(fs.readFileSync(filePath, "utf8")) as AiProjectCandidate[]);
  } catch (error) {
    if (allowMissing) return [];
    throw error;
  }
}

export function loadAiProjectState(filePath = STATE_PATH): AiProjectSelectionState {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as Partial<AiProjectSelectionState>;
    if (!Array.isArray(parsed.recent)) return { recent: [] };
    return {
      recent: parsed.recent.filter(
        (entry) =>
          typeof entry?.candidateId === "string" && validDate(entry.date) && Array.isArray(entry.tags),
      ),
    };
  } catch {
    return { recent: [] };
  }
}

export function updateAiProjectState(
  state: AiProjectSelectionState,
  candidate: AiProjectCandidate,
  date: string,
  stars: number,
): AiProjectSelectionState {
  const current = Date.parse(`${date}T00:00:00Z`);
  const cutoff = current - HISTORY_DAYS * 24 * 60 * 60 * 1000;
  const recent = state.recent.filter(
    (entry) => entry.date !== date && Date.parse(`${entry.date}T00:00:00Z`) >= cutoff,
  );
  recent.push({
    candidateId: candidate.candidateId,
    date,
    tags: [...candidate.tags],
    crossDomain: candidate.crossDomain,
    largeCommercial: candidate.largeCommercial,
    stars,
  });
  return { recent };
}

export async function saveDailyAiProject(options: SaveDailyAiProjectOptions): Promise<AiProjectCard> {
  const catalogPath = options.catalogPath ?? CATALOG_PATH;
  const signalsPath = options.signalsPath ?? SIGNALS_PATH;
  const statePath = options.statePath ?? STATE_PATH;
  const digestsDirectory = options.digestsDirectory ?? DIGESTS_DIRECTORY;
  const evergreen = loadCatalog(catalogPath);
  const signals = loadCatalog(signalsPath, true);
  const state = loadAiProjectState(statePath);
  const preferences = options.preferences ?? defaultPrivateProjectPreferences();

  let selected: AiProjectCandidate;
  let generatedBy: AiProjectCard["generatedBy"] = "weekly-llm";
  try {
    selected = selectDailyAiProject([...signals, ...evergreen], state, preferences, options.date);
    if (!signals.some((item) => item.candidateId === selected.candidateId)) generatedBy = "curated-fallback";
  } catch {
    selected = selectDailyAiProject(evergreen, state, defaultPrivateProjectPreferences(), options.date);
    generatedBy = "curated-fallback";
  }

  const card = createAiProjectCard(selected, options.date, preferences, generatedBy);
  const outputPath = path.join(digestsDirectory, options.date, "daily-ai-project.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(card, null, 2) + "\n", "utf8");
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(
    statePath,
    JSON.stringify(
      updateAiProjectState(state, selected, options.date, card.difficulty.currentStars),
      null,
      2,
    ) + "\n",
    "utf8",
  );
  console.log(`  [ai-project] Saved ${outputPath} (${card.candidateId})`);
  return card;
}

export function vaultReadConfigFromEnv(env: NodeJS.ProcessEnv = process.env): VaultReadConfig | undefined {
  const owner = env.AI_PROJECT_VAULT_OWNER;
  const repo = env.AI_PROJECT_VAULT_REPO;
  const token = env.AI_PROJECT_VAULT_READ_TOKEN;
  if (!owner || !repo || !token) return undefined;
  return {
    owner,
    repo,
    token,
    branch: env.AI_PROJECT_VAULT_BRANCH ?? "main",
    path: env.AI_PROJECT_VAULT_PATH ?? "data/state.json",
  };
}
