# 每周灵感候选更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a no-LLM weekly signal refresh and enforce a maximum of three dynamic inspiration recommendations per week.

**Architecture:** Keep the 93-item evergreen catalog immutable. Store public-source dynamic candidates in `config/inspiration-signals.json`; the daily fallback loads both pools and records weekly dynamic selections in the existing inspiration state.

**Tech Stack:** TypeScript, Node fetch, Vitest, pnpm, GitHub Actions.

## Global Constraints

- No new account, API key, or DeepSeek request.
- Dynamic candidates must use HTTPS sources and stable IDs.
- Evergreen catalog remains unchanged by the weekly job.
- Dynamic recommendations are capped at 3 per China-local calendar week.

---

### Task 1: Define state and quota behavior

**Files:**
- Modify: `src/inspiration.ts`
- Modify: `src/inspiration-generator.ts`
- Test: `src/__tests__/inspiration-generator.test.ts`

- [ ] Write failing tests for three dynamic selections in one week, a fourth selection falling back to evergreen, and state compatibility without `weeklyDynamic`.
- [ ] Run `pnpm vitest run src/__tests__/inspiration-generator.test.ts` and confirm the quota assertions fail.
- [ ] Add a China-local week key, optional `weeklyDynamic` state, candidate filtering, and origin-aware state updates.
- [ ] Make fallback selection prefer eligible dynamic candidates only while the weekly quota remains; otherwise use eligible evergreen candidates.
- [ ] Rerun the focused tests and then the full test suite.

### Task 2: Add signal storage and public-source refresh

**Files:**
- Create: `src/inspiration-refresh.ts`
- Create: `src/__tests__/inspiration-refresh.test.ts`
- Create: `config/inspiration-signals.json`
- Modify: `package.json`

- [ ] Write failing tests for HTTPS filtering, stable-ID deduplication, merge preservation, and 90-day pruning.
- [ ] Run the focused refresh tests and verify they fail before implementation.
- [ ] Implement pure merge/normalization helpers and fetch GitHub Search, Hacker News Algolia, and Hugging Face public endpoints with per-source failure isolation.
- [ ] Add `inspiration:refresh` to run the weekly refresh and write the signal file only when valid candidates are available.
- [ ] Run focused tests and validate the generated signal file against the existing catalog schema.

### Task 3: Use dynamic signals in the no-LLM daily path

**Files:**
- Modify: `src/inspiration-generator.ts`
- Modify: `src/inspiration-only.ts`
- Test: `src/__tests__/inspiration-generator.test.ts`

- [ ] Write a failing test proving an eligible dynamic signal can be selected in no-LLM mode and records its weekly count.
- [ ] Run the focused test and confirm it fails because the daily path currently supplies only empty inputs.
- [ ] Load `config/inspiration-signals.json`, pass it as extra candidates, and preserve the existing evergreen fallback.
- [ ] Run all inspiration tests and confirm no model call is made.

### Task 4: Schedule the weekly job and document the behavior

**Files:**
- Create: `.github/workflows/weekly-inspiration-refresh.yml`
- Modify: `.github/workflows/daily-inspiration.yml`
- Modify: `README.md`
- Modify: `README.zh.md`

- [ ] Add a Sunday 08:00 CST workflow that installs dependencies, runs `pnpm inspiration:refresh`, and commits only the signal file.
- [ ] Keep the daily 08:15 CST workflow unchanged except for the signal-loading step.
- [ ] Document the 3-per-week cap, source scope, 90-day retention, and zero-model-cost behavior.
- [ ] Parse both workflow files and run the full typecheck, tests, lint, and diff checks.

### Task 5: Publish and verify

**Files:**
- Modify: generated `config/inspiration-signals.json` if the first refresh yields valid candidates.

- [ ] Commit implementation and generated signal data separately.
- [ ] Push the exact commits to the data repository `master` branch.
- [ ] Confirm the remote branch contains both workflow files and the new signal file.
- [ ] Run a local no-LLM daily generation and inspect that the card source is HTTPS and the weekly dynamic count never exceeds 3.
