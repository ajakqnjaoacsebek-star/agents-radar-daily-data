import { toCstDateStr } from "./date.ts";
import { saveDailyInspiration } from "./inspiration-generator.ts";
import { loadInspirationSignals } from "./inspiration-refresh.ts";
import type { InspirationInputs } from "./inspiration.ts";

// This path intentionally uses only the verified evergreen catalog. It keeps
// the Daily Inspiration workflow useful when the paid LLM provider is paused.
const emptyInputs = {
  trendingData: { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false },
  hnData: { stories: [] },
  phData: { products: [] },
  hfData: { models: [] },
  webResults: [],
} as unknown as InspirationInputs;

const now = new Date();
await saveDailyInspiration(emptyInputs, toCstDateStr(now), now.toISOString(), {
  allowLlm: false,
  signalCandidates: loadInspirationSignals(undefined, toCstDateStr(now)),
});
