export const AI_PROJECT_VERSION = 1 as const;

export type AiProjectOrigin = "verified-existing" | "original-concept";
export type AiProjectTag = "practical" | "learning" | "imagination" | "commercial";

export interface AiProjectSource {
  label: string;
  url: string;
  verifiedAt: string;
}

export interface DifficultyDimensions {
  technical: number;
  dependencies: number;
  time: number;
  costRisk: number;
  uncertainty: number;
  explanation: string;
}

export interface AiProjectCandidate {
  candidateId: string;
  origin: AiProjectOrigin;
  title: string;
  oneLine: string;
  summary: string;
  outcome: string;
  whyWorthwhile: string;
  skills: string[];
  realWorldPotential: string;
  feasibilityProbe: string;
  costAndRisks: string[];
  tags: AiProjectTag[];
  crossDomain: boolean;
  largeCommercial: boolean;
  difficulty: DifficultyDimensions;
  source?: AiProjectSource;
  signalDate?: string;
}

export interface AiProjectCard {
  version: typeof AI_PROJECT_VERSION;
  date: string;
  candidateId: string;
  origin: AiProjectOrigin;
  title: string;
  oneLine: string;
  summary: string;
  outcome: string;
  whyWorthwhile: string;
  skills: string[];
  realWorldPotential: string;
  feasibilityProbe: string;
  costAndRisks: string[];
  difficulty: {
    scale: 5;
    rawScore: number;
    currentStars: number;
    explanation: string;
  };
  source?: AiProjectSource;
  generatedBy: "weekly-llm" | "curated-fallback";
}

export interface AiProjectHistoryEntry {
  candidateId: string;
  date: string;
  tags: AiProjectTag[];
  crossDomain?: boolean;
  largeCommercial?: boolean;
  stars?: number;
}

export interface AiProjectSelectionState {
  recent: AiProjectHistoryEntry[];
}

export interface CompletedCalibrationEntry {
  projectId: string;
  completedAt: string;
  starsAtCompletion: number;
  verification: "codex" | "self";
}

export interface PrivateProjectPreferences {
  abilityOffset: number;
  difficultyThresholds?: [number, number, number, number];
  feedback: Array<{ candidateId: string; reasons: string[]; note?: string }>;
  completed: CompletedCalibrationEntry[];
}

const DEFAULT_THRESHOLDS: [number, number, number, number] = [35, 50, 65, 80];
const DAY_MS = 24 * 60 * 60 * 1000;

function isHttps(value: string | undefined): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validDimension(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 20 && value <= 100;
}

export function validateAiProjectCatalog(candidates: AiProjectCandidate[]): AiProjectCandidate[] {
  const ids = new Set<string>();
  for (const item of candidates) {
    if (!nonEmpty(item.candidateId)) throw new Error("Missing AI project candidate ID");
    if (ids.has(item.candidateId)) throw new Error(`Duplicate AI project candidate ID: ${item.candidateId}`);
    ids.add(item.candidateId);
    if (item.origin !== "verified-existing" && item.origin !== "original-concept") {
      throw new Error(`Invalid AI project origin: ${item.candidateId}`);
    }
    const textFields = [
      item.title,
      item.oneLine,
      item.summary,
      item.outcome,
      item.whyWorthwhile,
      item.realWorldPotential,
      item.feasibilityProbe,
      item.difficulty?.explanation,
    ];
    if (textFields.some((value) => !nonEmpty(value)) || !item.skills?.length || !item.costAndRisks?.length) {
      throw new Error(`Incomplete AI project candidate: ${item.candidateId}`);
    }
    if (
      !item.tags?.length ||
      item.tags.some((tag) => !["practical", "learning", "imagination", "commercial"].includes(tag))
    ) {
      throw new Error(`Invalid AI project tags: ${item.candidateId}`);
    }
    const dimensions = item.difficulty;
    if (
      !dimensions ||
      !validDimension(dimensions.technical) ||
      !validDimension(dimensions.dependencies) ||
      !validDimension(dimensions.time) ||
      !validDimension(dimensions.costRisk) ||
      !validDimension(dimensions.uncertainty)
    ) {
      throw new Error(`Invalid AI project difficulty: ${item.candidateId}`);
    }
    if (item.origin === "verified-existing") {
      if (
        !item.source ||
        !nonEmpty(item.source.label) ||
        !isHttps(item.source.url) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(item.source.verifiedAt)
      ) {
        throw new Error(`Verified AI project ${item.candidateId} requires a valid source`);
      }
    }
  }
  return candidates;
}

export function calculateRawDifficulty(dimensions: DifficultyDimensions): number {
  return Math.round(
    dimensions.technical * 0.3 +
      dimensions.dependencies * 0.2 +
      dimensions.time * 0.2 +
      dimensions.costRisk * 0.1 +
      dimensions.uncertainty * 0.2,
  );
}

export function mapDifficultyStars(
  rawScore: number,
  preferences: Pick<PrivateProjectPreferences, "abilityOffset" | "difficultyThresholds">,
): number {
  const thresholds = preferences.difficultyThresholds ?? DEFAULT_THRESHOLDS;
  let stars = 1;
  for (const threshold of thresholds) if (rawScore > threshold) stars += 1;
  return Math.max(1, Math.min(5, stars - Math.max(0, Math.floor(preferences.abilityOffset))));
}

export function calibrateAbilityOffset(preferences: PrivateProjectPreferences): number {
  const qualifying = preferences.completed.filter((entry) => entry.starsAtCompletion >= 3);
  const verified = qualifying.filter((entry) => entry.verification === "codex");
  const earnedLevels = Math.min(Math.floor(qualifying.length / 3), Math.floor(verified.length / 2));
  return Math.max(preferences.abilityOffset, Math.min(4, earnedLevels));
}

function ageInDays(date: string, currentDate: string): number {
  return Math.floor((Date.parse(`${currentDate}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / DAY_MS);
}

function preferencePenalty(candidate: AiProjectCandidate, preferences: PrivateProjectPreferences): number {
  const rejected = preferences.feedback.find((entry) => entry.candidateId === candidate.candidateId);
  if (rejected) return 1_000;
  const reasonText = preferences.feedback.flatMap((entry) => entry.reasons).join(" ");
  let penalty = 0;
  if (reasonText.includes("没意思") && candidate.tags.includes("imagination")) penalty += 12;
  if (reasonText.includes("投入不值得") && candidate.largeCommercial) penalty += 18;
  return penalty;
}

export function selectDailyAiProject(
  candidates: AiProjectCandidate[],
  state: AiProjectSelectionState,
  preferences: PrivateProjectPreferences,
  date: string,
): AiProjectCandidate {
  const valid = validateAiProjectCatalog(candidates);
  const recent90 = state.recent.filter(
    (entry) => ageInDays(entry.date, date) >= 0 && ageInDays(entry.date, date) < 90,
  );
  const blocked = new Set(recent90.map((entry) => entry.candidateId));
  const hasRecentLarge = recent90.some(
    (entry) => ageInDays(entry.date, date) < 30 && entry.largeCommercial && (entry.stars ?? 0) >= 4,
  );
  const lastSeven = recent90.filter((entry) => ageInDays(entry.date, date) < 7);
  const needsCrossDomain = lastSeven.length >= 6 && !lastSeven.some((entry) => entry.crossDomain);

  let eligible = valid.filter((candidate) => !blocked.has(candidate.candidateId));
  if (hasRecentLarge) eligible = eligible.filter((candidate) => !candidate.largeCommercial);
  if (!eligible.length) throw new Error("No AI project candidate is eligible after 90-day deduplication");

  const practicalCount = recent90.filter(
    (entry) => ageInDays(entry.date, date) < 30 && entry.tags.includes("practical"),
  ).length;
  const learningCount = recent90.filter(
    (entry) => ageInDays(entry.date, date) < 30 && entry.tags.includes("learning"),
  ).length;
  const imaginationCount = recent90.filter(
    (entry) => ageInDays(entry.date, date) < 30 && entry.tags.includes("imagination"),
  ).length;

  return [...eligible]
    .map((candidate) => {
      const raw = calculateRawDifficulty(candidate.difficulty);
      const stars = mapDifficultyStars(raw, preferences);
      let score = 100 - stars * 4 - preferencePenalty(candidate, preferences);
      if (candidate.tags.includes("practical") && practicalCount < 16) score += 24;
      if (candidate.tags.includes("learning") && learningCount < 7) score += 18;
      if (candidate.tags.includes("imagination") && imaginationCount < 3) score += 8;
      if (needsCrossDomain) score += candidate.crossDomain ? 80 : -80;
      for (const history of lastSeven) {
        if (history.tags.some((tag) => candidate.tags.includes(tag))) score -= 3;
      }
      if (stars === 5) score -= 80;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.candidateId.localeCompare(b.candidate.candidateId))[0]!
    .candidate;
}

export function createAiProjectCard(
  candidate: AiProjectCandidate,
  date: string,
  preferences: PrivateProjectPreferences,
  generatedBy: AiProjectCard["generatedBy"],
): AiProjectCard {
  validateAiProjectCatalog([candidate]);
  const rawScore = calculateRawDifficulty(candidate.difficulty);
  return {
    version: AI_PROJECT_VERSION,
    date,
    candidateId: candidate.candidateId,
    origin: candidate.origin,
    title: candidate.title,
    oneLine: candidate.oneLine,
    summary: candidate.summary,
    outcome: candidate.outcome,
    whyWorthwhile: candidate.whyWorthwhile,
    skills: [...candidate.skills],
    realWorldPotential: candidate.realWorldPotential,
    feasibilityProbe: candidate.feasibilityProbe,
    costAndRisks: [...candidate.costAndRisks],
    difficulty: {
      scale: 5,
      rawScore,
      currentStars: mapDifficultyStars(rawScore, preferences),
      explanation: candidate.difficulty.explanation,
    },
    ...(candidate.source ? { source: { ...candidate.source } } : {}),
    generatedBy,
  };
}
