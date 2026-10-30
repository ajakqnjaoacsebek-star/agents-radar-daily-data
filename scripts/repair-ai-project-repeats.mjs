import fs from "node:fs";
import path from "node:path";
import { createAiProjectCard, selectDailyAiProject, validateAiProjectCatalog } from "../src/ai-projects.ts";
import { defaultPrivateProjectPreferences, updateAiProjectState } from "../src/ai-project-generator.ts";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const candidateId = argument("--candidate");
const fromDate = argument("--from") ?? "0000-01-01";
const shouldWrite = process.argv.includes("--write");
if (!candidateId) throw new Error("Pass --candidate <candidate-id>");
if (!/^\d{4}-\d{2}-\d{2}$/.test(fromDate)) throw new Error("Pass --from as YYYY-MM-DD");

const root = process.cwd();
const catalog = validateAiProjectCatalog(
  JSON.parse(fs.readFileSync(path.join(root, "config", "ai-project-catalog.json"), "utf8")),
);
const signals = validateAiProjectCatalog(
  JSON.parse(fs.readFileSync(path.join(root, "config", "ai-project-signals.json"), "utf8")),
);
const statePath = path.join(root, "digests", "ai-project-state.json");
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const targetDates = state.recent
  .filter((entry) => entry.candidateId === candidateId && entry.date >= fromDate)
  .map((entry) => entry.date)
  .sort();

if (!targetDates.length) {
  console.log(`No ${candidateId} entries found on or after ${fromDate}.`);
  process.exit(0);
}

const targetDateSet = new Set(targetDates);
let nextState = {
  recent: state.recent.filter((entry) => !targetDateSet.has(entry.date)),
};
const preferences = defaultPrivateProjectPreferences();
const evergreenWithoutRepeatedCandidate = catalog.filter((item) => item.candidateId !== candidateId);
const allWithoutRepeatedCandidate = [...signals, ...evergreenWithoutRepeatedCandidate];
const replacements = [];

for (const date of targetDates) {
  let selected;
  let generatedBy = "weekly-llm";
  try {
    selected = selectDailyAiProject(allWithoutRepeatedCandidate, nextState, preferences, date);
    if (!signals.some((item) => item.candidateId === selected.candidateId)) {
      generatedBy = "curated-fallback";
    }
  } catch {
    selected = selectDailyAiProject(evergreenWithoutRepeatedCandidate, nextState, preferences, date);
    generatedBy = "curated-fallback";
  }
  const card = createAiProjectCard(selected, date, preferences, generatedBy);
  replacements.push({ date, card });
  nextState = updateAiProjectState(nextState, selected, date, card.difficulty.currentStars);
}

for (const replacement of replacements) {
  console.log(`${replacement.date}: ${candidateId} -> ${replacement.card.candidateId}`);
}

if (!shouldWrite) {
  console.log("Dry run only. Pass --write to update digest files and selection state.");
  process.exit(0);
}

for (const { date, card } of replacements) {
  const outputPath = path.join(root, "digests", date, "daily-ai-project.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(card, null, 2)}\n`, "utf8");
}
nextState.recent.sort((left, right) => left.date.localeCompare(right.date));
fs.writeFileSync(statePath, `${JSON.stringify(nextState, null, 2)}\n`, "utf8");
console.log(`Updated ${replacements.length} repeated AI project cards.`);
