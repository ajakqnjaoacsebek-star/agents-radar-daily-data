import { toCstDateStr } from "./date.ts";
import {
  loadPrivateProjectPreferences,
  saveDailyAiProject,
  vaultReadConfigFromEnv,
} from "./ai-project-generator.ts";

const date = toCstDateStr(new Date());
const preferences = await loadPrivateProjectPreferences(vaultReadConfigFromEnv());
await saveDailyAiProject({ date, preferences });
