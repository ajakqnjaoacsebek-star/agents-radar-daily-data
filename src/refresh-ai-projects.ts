import { refreshAiProjectSignals } from "./ai-project-refresh.ts";

const candidates = await refreshAiProjectSignals();
console.log(`  [ai-project] Weekly signal pool: ${candidates.length}`);
