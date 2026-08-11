# AI CLI Tools Community Digest 2026-08-11

> Generated: 2026-08-11 10:24 UTC | Tools covered: 10

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Grok Build](https://github.com/xai-org/grok-build)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool AI CLI Comparison Report — 2026-08-11

## 1. Ecosystem Overview

The AI CLI ecosystem is bifurcating into enterprise-backed tools (Claude Code, OpenAI Codex, GitHub Copilot CLI, Gemini CLI, Qwen Code) and independent/open-source tools (OpenCode, Pi, Kimi Code CLI, CodeWhale/DeepSeek TUI). Release cadence is high for Claude Code, Codex, Gemini, and Qwen; OpenCode and Pi compensate with rapid PR velocity despite no releases. Community feedback is converging on a few systemic problems: safety-guardrail false positives, Windows/WSL reliability, session/resume state fragility, and MCP/ACP integration depth. No tool has yet delivered a truly durable cross-session memory solution, making this a major differentiation opportunity.

## 2. Activity Comparison

Counts reflect issues/PRs highlighted in each community digest, not full repository totals.

| Tool | Issues (tracked) | PRs (tracked) | Release status |
|---|---|---:|---:|---|
| Claude Code | 10 | 1 | v2.1.227 |
| OpenAI Codex | 10 | 10 | rust-v0.147.0-alpha.6.6 |
| Gemini CLI | 10 | 10 | v0.56.0-nightly.20260811 |
| GitHub Copilot CLI | 10 | 1 | v1.0.79 |
| Kimi Code CLI | 5 | 7 | None |
| OpenCode | 10 | 10 | None |
| Pi (pi-mono) | 10 | 10 | None |
| Qwen Code | 10 | 10 | v0.21.9 + nightly + live-host-v0.1.1 |
| DeepSeek TUI / CodeWhale | 2 | 5 | None |
| Grok Build | 0 | 0 | None |

## 3. Shared Feature Directions

- **Persistent memory / cross-session context**  
  Kimi (#1283, #1478), Gemini (Auto Memory), OpenCode (auto-compact stale sessions, `file_unchanged` stubs), and Qwen (session rotation) all show demand for context that survives session boundaries without exploding token usage.

- **Session/resume reliability**  
  Claude Code (expired-token bug, stale PR picker), Codex (thread handoff, subagent accumulation), Gemini (`--resume` duplicate sessions), Copilot (unloadable sessions after `events.jsonl` grows too large), OpenCode (aborted streams recorded as clean stops), Pi ("Working…" hangs), and Qwen (session restore timeout) all face state-management failures.

- **Windows/WSL as a first-class platform**  
  Codex (sandbox/Computer Use), Copilot (render loop, plugin file-locking), Kimi (PowerShell D-drive path), OpenCode (encoding, sidecar crashes), Pi (CMD corruption, WSL login), and Qwen (broken Windows file links) all report Windows-specific regressions.

- **Safety/guardrail calibration**  
  Claude Code is the most affected by AUP/cyber-safeguard false positives; Codex has safety-buffering metadata handling; Copilot struggles with enterprise policy enforcement; OpenCode users report silent quota exhaustion. Over-broad classification is a cross-tool usability issue.

- **MCP/ACP integration depth**  
  Codex (MCP tool catalogs, `$ref` resolution), Gemini (MCP OAuth refresh), Copilot (enterprise MCP registry), Claude Code (computer-use MCP injection), Kimi (ACP hardening), Qwen (ACP child processes), and CodeWhale (ACP tool execution) all treat MCP/ACP as a core integration surface — but each has compatibility gaps.

- **Bounded, configurable retries**  
  OpenCode (infinite vs. absent retries), Pi (WebSocket retry handling), and Codex (stream reliability) show that transient provider errors need predictable backoff, caps, and observability.

## 4. Differentiation Analysis

- **Claude Code** — Mature enterprise CLI with desktop app and plugin ecosystem; current focus is reliability bugfixes and managing policy false-positive noise. PR contribution is low, but issue volume is high — a sign of a large installed base.
- **OpenAI Codex** — Fast-maturing Rust rewrite; emphasizes MCP, sandboxing, code-mode, and Windows reproducibility. Alpha releases target bleeding-edge adopters; Windows sandbox/Computer Use is the biggest weak spot.
- **Gemini CLI** — Google-backed, nightly releases; strong security posture and session/ACP fixes. Differentiates on subagent semantics, model configs, and Code Assist integration; quota-accounting bugs are the main community friction.
- **GitHub Copilot CLI** — Enterprise-first: policy enforcement, BYOK/custom models, MCP registry. Low PR throughput but high-stakes issues around config data loss and Windows breakage; GitHub ecosystem integration is the moat.
- **Kimi Code CLI** — Lightweight Python CLI; community is dominated by a single persistent memory/context request. ACP and file-tool safety hardening indicate backend reliability work while feature demand outpaces supply.
- **OpenCode** — Open-source, provider-agnostic, high community velocity. Focus on retry policy, background execution, cost transparency, Android/Termux support, and subagent capability propagation. The most community-driven feature roadmap in this set.
- **Pi (pi-mono)** — Independent TUI focused on terminal ergonomics: fullscreen search, render optimization, hyperlinks, tmux inline images. Also actively consolidating Windows/WSL support; provider parity and session consistency remain rough.
- **Qwen Code** — Alibaba-backed, multi-surface release cadence (CLI, nightly, live-host). Distinctive direction: Qoder plugin installation, Local Control pairing, WebShell diff sources, tmux-backed interactive sub-agents, and a supervised multi-agent fleet roadmap.
- **DeepSeek TUI / CodeWhale** — Niche but deliberate: ACP tool execution parity and crate decomposition. Small community, clear architectural focus, and robust subagent recursion-budget enforcement.

## 5. Community Momentum & Maturity

- **Most active / rapidly iterating:** OpenAI Codex, OpenCode, Qwen Code, and Pi. All show 10+ PRs in the digest window and broad issue engagement. Codex and Qwen pair this with releases; OpenCode and Pi maintain velocity through code contributions alone.
- **High issue volume, lower PR throughput:** Claude Code and Copilot CLI both have mature user bases but only 1 PR each today. Claude Code’s tracker is dominated by stale/duplicate safety reports; Copilot’s issues are concentrated and severe (config loss, session death).
- **Steady but narrower:** Gemini CLI has a healthy PR queue focused on fixes/security; Kimi Code CLI’s 7 PRs are mostly hardening, reflecting a maintenance phase; DeepSeek TUI / CodeWhale is small but active in focused areas.
- **Inactive:** Grok Build had no activity in the last 24h.

## 6. Trend Signals

- **Safety guardrails must be calibrated to context, not keywords.** Claude Code’s false-positive wave is a warning: overbroad policy blocking erodes trust and blocks routine maintenance, security, and development tasks.
- **Windows/WSL reliability is now a cross-industry gap.** Developers are increasingly running AI CLIs on Windows terminals, and every major tool has unresolved Windows issues. First-class Windows support is a clear competitive differentiator.
- **Session state is the next frontier.** Resume, compaction, rotation, thread persistence, and cross-device handoff are unresolved across almost all tools. Expect investment in deterministic session IDs, bounded event logs, and durable memory layers.
- **Silent false-success is the most dangerous failure mode.** OpenCode’s aborted-stream-as-clean-stop issue and Qwen’s API-error-with-exit-0 both mask real failures — automation tooling must prioritize error observability over surface-level success.
- **MCP/ACP is moving from chat-only to tool-execution parity.** CodeWhale’s ACP fix and Qwen/Codex MCP work indicate the ecosystem wants protocol-level code editing, not just streaming text.
- **Subagent governance needs explicit limits.** Disabled subagents still running, nested recursion-budget overrides, and model-selection overrides appear across Gemini, CodeWhale, Copilot, and OpenCode. Root-session authority must be enforced.
- **Billing/quota transparency is becoming a usability issue.** Gemini’s false quota errors, OpenCode’s silent spend, and Codex’s weekly-limit confusion show that usage accounting must be visible and accurate to retain trust.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data: github.com/anthropics/skills | as of 2026-08-11*

---

## 1. Top Skills Ranking

The most-commented PRs are ranked below (per the comment-sorted dataset). The clearest signal: **a cluster of PRs fixing the `skill-creator` evaluation harness dominates discussion**, ahead of any single new skill submission.

**1. `skill-creator` evaluation-loop repair cluster — multiple open PRs**
The single most-discussed topic in the repository. `run_eval.py` reports `recall=0%` for every skill description, so the description-optimization loop (`run_loop.py`, `improve_description.py`) optimizes against noise — reproduced 10+ times ([#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169)). The PRs attack different root causes:
- [#1298](https://github.com/anthropics/skills/pull/1298) — installs the eval artifact as a real skill; fixes Windows stream reading, trigger detection, parallel workers
- [#1099](https://github.com/anthropics/skills/pull/1099) — fixes Windows crash `[WinError 10038]` when reading from a subprocess pipe
- [#1050](https://github.com/anthropics/skills/pull/1050) — fixes `claude.cmd` not being resolved via `PATHEXT` on Windows
- [#1323](https://github.com/anthropics/skills/pull/1323) — trigger detection misses the real skill name and bails on the first non-Skill tool
- [#1261](https://github.com/anthropics/skills/pull/1261) — eval writes synthetic command files into the user's live project registry
- [#539](https://github.com/anthropics/skills/pull/539) — pre-parse YAML validation for unquoted descriptions containing `:`

**Status:** all open. This is the ecosystem's critical-path blocker: the official skill-authoring loop cannot measure itself.

**2. [document-typography #514](https://github.com/anthropics/skills/pull/514)** — open, updated 2026-03-13
Typographic quality control for AI-generated documents: orphan word wrap (1–6 words spilling to the next line), widow paragraph headers stranded at page bottom, and numbering misalignment. Discussion centers on these defects being universal in Claude-generated documents and rarely requested by users, making a skill-level fix high-value.

**3. [ODT skill #486](https://github.com/anthropics/skills/pull/486)** — open, updated 2026-04-14
OpenDocument text creation, template filling, and ODT→HTML parsing for `.odt`/`.ods`, with triggers for "LibreOffice document" and ISO-standard/OSS format requests. Complements the existing docx/pdf skills and rounds out document-format coverage.

**4. [frontend-design revision #210](https://github.com/anthropics/skills/pull/210)** — open, updated 2026-03-07
Substantive revision of the existing `frontend-design` skill for clarity, actionability, and internal coherence. Goal: every instruction must be executable within a single conversation, with guidance specific enough to steer behavior without over-constraining.

**5. [skill-quality-analyzer + skill-security-analyzer #83](https://github.com/anthropics/skills/pull/83)** — open, updated 2026-01-07
Two meta-skills added to the example-skills marketplace. The quality analyzer evaluates skills across five dimensions (structure & documentation, examples, resources…); the security analyzer addresses the trust surface of community skills. Discussion connects directly to the trust-boundary concerns raised in issue #492.

**6. [testing-patterns #723](https://github.com/anthropics/skills/pull/723)** — open, updated 2026-04-21
A comprehensive testing skill: Testing Trophy philosophy, what to test vs. what not to test, AAA unit-test patterns, React component testing with Testing Library, and query-based testing. One of the broadest-scope general engineering skills proposed this cycle.

**7. [pyxel #525](https://github.com/anthropics/skills/pull/525)** — open, updated 2026-07-15
Retro/pixel-art/8-bit game development via `pyxel-mcp`, a new MCP server for the Pyxel engine. Covers the write → run_and_capture → inspect → iterate workflow. Notably active through July 2026, suggesting ongoing maintainer engagement.

**8. [color-expert #1302](https://github.com/anthropics/skills/pull/1302)** — open, updated 2026-07-21
A self-contained color-expertise skill: color naming systems (ISCC-NBS, Munsell, XKCD, RAL, Ridgway 1912, CSS named), and a "what to use when" table for color spaces (OKLCH for scales, OKLAB for gradients, CAM16…). Recently updated, indicating momentum.

---

## 2. Community Demand Trends

Distilled from Issues (by comment volume):

- **Trust & security boundaries (strongest signal)** — [#492](https://github.com/anthropics/skills/issues/492) (43 comments): community skills distributed under the `anthropic/` namespace impersonate official skills, creating a trust-boundary vulnerability where users may grant elevated permissions. The community wants provenance/verification for published skills.
- **Enterprise distribution & lifecycle** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍): org-wide skill sharing in Claude.ai; plus skills disappearing ([#62](https://github.com/anthropics/skills/issues/62)) and duplicate installs across plugins ([#189](https://github.com/anthropics/skills/issues/189)). Demand: a managed, non-manual skill library.
- **Authoring-tool reliability** — [#556](https://github.com/anthropics/skills/issues/556)/[#1169](https://github.com/anthropics/skills/issues/1169): the `skill-creator` eval loop never triggers skills (0% recall); [#1487](https://github.com/anthropics/skills/issues/1487): `claude-api` skill injects ~156k tokens, exhausting context in one call. Demand: correct, context-safe tooling.
- **Meta-skills & quality gates** — [#1385](https://github.com/anthropics/skills/issues/1385) (pre-task calibration → adversarial review → delivery verification), [#412](https://github.com/anthropics/skills/issues/412) (agent-governance: policy enforcement, threat detection, trust scoring), [#202](https://github.com/anthropics/skills/issues/202) (skill-creator should be operational, not educational). Demand: skills that audit other skills/agents.
- **Platform expansion** — [#29](https://github.com/anthropics/skills/issues/29) (Bedrock support), [#16](https://github.com/anthropics/skills/issues/16) (expose Skills as MCPs). Smaller but persistent asks.
- **Agent memory** — [#1329](https://github.com/anthropics/skills/issues/1329) (9 comments): `compact-memory`, a symbolic-notation skill for compact agent state, signals growing interest in long-running-agent context efficiency.

---

## 3. High-Potential Pending Skills

Actively-discussed, not-yet-merged skills likely to land soon:

- **[plan-file-hygiene #1479](https://github.com/anthropics/skills/pull/1479)** — open, updated 2026-07-27. Addresses #1417: planning artifacts accumulate with no lifecycle. Introduces a lifecycle for plan files so long-running sessions don't drown in stale plans. Fresh and directly tied to a named community gap.
- **[self-audit #1367](https://github.com/anthropics/skills/pull/1367)** — open, updated 2026-07-02. v1.3.0 of a universal audit skill: mechanical file verification first, then a four-dimension reasoning audit ordered by damage severity. Works with any project/model — fits the meta-skill demand trend.
- **[SAP-RPT-1-OSS predictor #181](https://github.com/anthropics/skills/pull/181)** — open, updated 2026-03-16. A skill for SAP's open-source tabular foundation model for predictive analytics on SAP business data. Niche but enterprise-relevant; aligns with the org-focused demand in issue #228.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **trust and reliability infrastructure around Skills**: fixing the broken `skill-creator` evaluation loop (0% recall), securing the `anthropic/` namespace trust boundary, and shipping meta-skills that audit, verify, and govern AI output — ahead of any single new domain skill.

---

# Claude Code Community Digest — 2026-08-11

Source: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

## Today's Highlights

Claude Code shipped v2.1.227, fixing two important reliability bugs: feature flags evaluated against an expired login token and a Bash-command failure under `claude-code-action`. The issue tracker remains dominated by closed/stale reports from a single reporter documenting widespread Anthropic Usage Policy (AUP) false positives on routine development tasks. PR activity is light, with one open security-related fix for the `hookify` plugin.

## Releases

- [v2.1.227](https://github.com/anthropics/claude-code/releases/tag/v2.1.227)
  - Fixed feature flags being evaluated without the user's subscription tier when a session starts with an expired login token, which could wrongly prompt Max plan users to enable usage credits.
  - Fixed every Bash command failing under `claude-code-action` with an `allowed_no`-related error.

No other releases were published in the last 24 hours.

## Hot Issues

Despite most issues being closed as stale/duplicate, the volume of reports highlights real friction.

- [Issue #71357 — Age verification feature triggers Anthropic API content filtering error](https://github.com/anthropics/claude-code/issues/71357) — macOS user hit an "Output blocked by content filtering policy" error triggered by the age verification feature. Important because it shows a consumer-facing safety feature interfering with API responses.

- [Issue #68022 — Desktop app injects computer-use MCP server even when Computer Use is disabled](https://github.com/anthropics/claude-code/issues/68022) — Desktop sessions receive 27 computer-use tools and a ~1.4K-token instruction block despite the setting being disabled. A significant privacy/behavior concern for desktop users.

- [Issue #64472 — Feature request: Chinese (Simplified) localization / i18n support](https://github.com/anthropics/claude-code/issues/64472) — Users continue to request translated CLI prompts, help output, and error messages. The only explicit feature request in the current batch.

- [Issue #71414 — Safety block wrongly halted installing a downloaded app via package manager](https://github.com/anthropics/claude-code/issues/71414) — AUP false positive blocked routine local app installation from component package files. Representative of a larger batch of similar false-positive reports.

- [Issue #71326 — Desktop PR picker shows stale merged/closed PR cards that can't be dismissed or refreshed](https://github.com/anthropics/claude-code/issues/71326) — Session-attached PR picker freezes PR state, leading to stale cards. Includes a data-loss finding and affects desktop workflow reliability.

- [Issue #69471 — Missing 'design' command documentation in CLI guide](https://github.com/anthropics/claude-code/issues/69471) — The `design` command is referenced in docs but not listed in the CLI guide. Documentation gap that blocks discoverability.

- [Issue #71404 — Cyber safeguard false-positive blocks automated prediction-market order script](https://github.com/anthropics/claude-code/issues/71404) — A benign market-order automation task was blocked by cyber-related safeguards. Highlights overbroad safety classification.

- [Issue #71208 — Cloud-IAM incident-response sweep blocked as AUP violation](https://github.com/anthropics/claude-code/issues/71208) — Defensive security work on the user's own infrastructure was blocked. Significant for security practitioners using Claude Code for incident response.

- [Issue #71333 — Deleting Claude's own memory/history files blocked by cyber safeguards](https://github.com/anthropics/claude-code/issues/71333) — Local project cleanup of Claude Code session files was flagged. Shows false positives can interfere with basic maintenance tasks.

- [Issue #71190 — Editing a contact-form tool README explaining privacy-by-design data blocked](https://github.com/anthropics/claude-code/issues/71190) — A plain web-development README edit was flagged. Demonstrates how benign context can trigger safety policies.

## Key PR Progress

Only one PR was created or updated in the last 24 hours.

- [PR #85716 — fix(hookify): load rules from ancestor .claude directories to prevent silent bypass](https://github.com/anthropics/claude-code/pull/85716) — Open, created by alifakbxr. Fixes issue #85613 by making the `hookify` plugin's `config_loader.py` correctly discover rules from ancestor `.claude` directories, closing a silent security-bypass path. Targets Python 3.10+, cross-platform.

No other PRs were reported in the current window.

## Feature Request Trends

- **Localization / i18n** — The clearest recurring request is Chinese (Simplified) UI support, covering CLI prompts, help text, and error messages ([#64472](https://github.com/anthropics/claude-code/issues/64472)).
- **Desktop UI state management** — Users want session-attached views like the PR picker to support refresh/dismiss actions and reflect live PR state ([#71326](https://github.com/anthropics/claude-code/issues/71326)).
- **Configurable behavior injection** — The desktop app injecting computer-use MCP tooling despite disabled settings points to demand for stricter opt-in controls ([#68022](https://github.com/anthropics/claude-code/issues/68022)).

## Developer Pain Points

- **AUP/cyber-safeguard false positives** — The dominant pain point. Numerous reports from Linux users show routine tasks blocked: installing apps, cleaning local memory files, editing READMEs, auditing own cloud IAM, and reverting production configs. Most are closed as stale/duplicate, which may frustrate affected users.
- **Safety filters firing on trivial or placeholder input** — Several reports describe blocks triggered after short typo-filled messages or single-character keystrokes, suggesting overly sensitive context classification.
- **Expired-token session misbehavior** — v2.1.227 fixes a bug where expired login tokens caused wrong subscription-tier evaluation; this was confusing Max plan users with usage-credit prompts.
- **Desktop/CLI doc gaps** — Missing documentation for the `design` command and stale desktop UI data continue to create workflow friction.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Today's Highlights

Activity on `openai/codex` on 2026-08-11 centers on a new Rust alpha release, a broad set of internal PRs improving MCP tool handling, image safety, and Windows build reproducibility, and continued community pressure around Windows sandbox/Computer Use reliability and rate-limit behavior.

## Releases

- [rust-v0.147.0-alpha.6.6](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.6)  
  New incremental alpha on the 0.147.0 CLI line. No detailed changelog was provided in the release data.

## Hot Issues

- [#14297](https://github.com/openai/codex/issues/14297) — **App repeatedly “Reconnecting…” before responding** *(closed)*  
  54 comments; users report new Codex app versions run 5 reconnect cycles before answering. High engagement even after closure, signaling an app reliability sore spot.

- [#31836](https://github.com/openai/codex/issues/31836) — **Projects “Sort By Last updated” is incomplete**  
  39 👍 / 41 comments. Sorting only affects tasks inside project groups, not the projects themselves. Strong community demand for project management fixes.

- [#33685](https://github.com/openai/codex/issues/33685) — **Weekly limit drains like the old 5-hour limit**  
  14 👍 / 26 comments. Users report the weekly quota depletes at roughly the same rate as the previous 5-hour limit during normal GPT-5.5 High usage.

- [#21211](https://github.com/openai/codex/issues/21211) — **Thread navigation/loading performance regression**  
  24 comments. Unbounded thread metadata and eager large-history hydration slow thread list and loading paths.

- [#37013](https://github.com/openai/codex/issues/37013) — **Windows Computer Use reuses stale `node_repl` exec context**  
  21 comments. After the first JS execution finishes, subsequent `node_repl/js` calls reuse a broken Windows helper transport.

- [#31073](https://github.com/openai/codex/issues/31073) — **Windows sandbox breaks Git HTTPS remote operations**  
  17 comments. Remote Git commands fail/crash inside Codex while working in normal PowerShell; local Git operations work fine.

- [#25179](https://github.com/openai/codex/issues/25179) — **Stale subagents accumulate and cannot be closed**  
  16 comments. Long-running desktop sessions accumulate subagents in cache/UI, and closing them is unreliable.

- [#29908](https://github.com/openai/codex/issues/29908) — **Bubblewrap sandbox failure on Ubuntu 24.04**  
  15 comments. `apply_patch` and managed sandbox commands fail before execution due to Bubblewrap loopback/userns errors.

- [#37415](https://github.com/openai/codex/issues/37415) — **Windows Computer Use fails with `spawn EPERM`**  
  10 comments. Elevated sandbox setup fails on WindowsApps ACL, blocking Computer Use on Windows.

- [#37403](https://github.com/openai/codex/issues/37403) — **macOS cannot resume Remote Control / CLI thread**  
  9 comments / 7 👍. New “already has an active writer” regression prevents desktop resume of a Codex CLI thread after the latest macOS update.

## Key PR Progress

- [#37970](https://github.com/openai/codex/pull/37970) — **Cache tool catalogs for streamable HTTP MCP servers**  
  Lets subagents use known MCP tool definitions without opening a connection until a tool is actually invoked.

- [#37979](https://github.com/openai/codex/pull/37979) — **Honor per-directory bundled skill settings in `skills/list`**  
  Fixes bundled skill discovery when multiple working directories have different `skills.bundled.enabled` configurations.

- [#37908](https://github.com/openai/codex/pull/37908) — **Apply refreshed cloud config bundles to later sessions**  
  Previously, background refreshes only warmed the on-disk cache; new sessions now pick up refreshed config in the same process.

- [#37926](https://github.com/openai/codex/pull/37926) — **Distinguish turn-start thread persistence**  
  Adds `PersistContext` so stores can enqueue persistence at turn start in the background without blocking model sampling.

- [#37906](https://github.com/openai/codex/pull/37906) — **Make gRPC code-mode notifications fire-and-forget**  
  Unacknowledged notifications no longer delay cell completion; the ack RPC remains as a compatibility no-op.

- [#37939](https://github.com/openai/codex/pull/37939) — **Validate images before returning `view_image` output**  
  Rejects invalid/unsupported image data before producing tool output, preventing non-image file contents from leaking through code mode.

- [#37896](https://github.com/openai/codex/pull/37896) — **Add hermetic Windows SDK and MSVC runtime repositories**  
  Pins Windows SDK/MSVC runtime for x64 and arm64 with an explicit EULA opt-in, improving reproducible Windows builds.

- [#37895](https://github.com/openai/codex/pull/37895) — **Add configurable Responses API request metadata**  
  Adds product-owned key/value metadata to Responses API turns, including parent and subagent requests, with size/key constraints.

- [#37882](https://github.com/openai/codex/pull/37882) — **Read safety buffering from response metadata**  
  Parses typed `response.metadata` SSE events while preserving the existing top-level `safety_buffering` field as authoritative.

- [#31901](https://github.com/openai/codex/pull/31901) — **Resolve local MCP `$ref`s in Code Mode tool schemas**  
  Supports `#/$defs/...` and `#/definitions/...`, preserving sibling descriptions when rendering TypeScript tool declarations.

## Feature Request Trends

- **Mobile/Remote parity**: users want arbitrary file uploads in Codex Remote ([#37074](https://github.com/openai/codex/issues/37074)) and restoration of microphone dictation in active threads ([#36536](https://github.com/openai/codex/issues/36536)).
- **Project organization**: better sorting and management of projects/tasks ([#31836](https://github.com/openai/codex/issues/31836)).
- **Plain-text paste behavior**: pasted code should not be auto-transformed into rich text ([#33307](https://github.com/openai/codex/issues/33307)).
- **Custom model/MCP support**: Browser & Computer Use plugins and `tool_search` should work with custom model providers and non-native endpoints ([#31750](https://github.com/openai/codex/issues/31750), [#20574](https://github.com/openai/codex/issues/20574)).
- **Session continuity**: reliable handoff between desktop, CLI, and mobile remote sessions ([#37403](https://github.com/openai/codex/issues/37403), [#24464](https://github.com/openai/codex/issues/24464)).

## Developer Pain Points

- **Windows sandbox/Computer Use instability**: recurring issues with stale exec contexts, WindowsApps ACL/EPERM, Git HTTPS failures, and helper setup errors ([#37013](https://github.com/openai/codex/issues/37013), [#37415](https://github.com/openai/codex/issues/37415), [#31073](https://github.com/openai/codex/issues/31073)).
- **Rate-limit and quota confusion**: weekly limits draining too quickly, compaction exhausting weekly usage, and rate limits attributed to unrelated orgs ([#33685](https://github.com/openai/codex/issues/33685), [#35935](https://github.com/openai/codex/issues/35935), [#37948](https://github.com/openai/codex/issues/37948)).
- **Session/thread reliability**: slow navigation, failed compaction, stale subagents, and lost thread visibility on mobile/desktop ([#21211](https://github.com/openai/codex/issues/21211), [#32028](https://github.com/openai/codex/issues/32028), [#25179](https://github.com/openai/codex/issues/25179)).
- **Linux sandbox regressions**: Bubblewrap/userns failures on Ubuntu 24.04 block `apply_patch` and managed sandbox commands ([#29908](https://github.com/openai/codex/issues/29908)).
- **MCP/custom-model edge cases**: tool discovery and payload handling break with non-native API endpoints or custom providers ([#20574](https://github.com/openai/codex/issues/20574), [#31750](https://github.com/openai/codex/issues/31750)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-11

## Today's Highlights
A single nightly release landed today, fixing an MCP OAuth token refresh bug from first-time contributor @ParthivNaresh. The hottest community topic is a fast-rising quota-accounting issue ([#28761](https://github.com/google-gemini/gemini-cli/issues/28761)) where Code Assist Standard users are blocked by false "usage limit reached" errors despite ample remaining quota — 15 👍 within 24 hours. The PR queue is dominated by session-management and security fixes, including two P1 corrections for `--resume`/ACP session poisoning and a security patch stripping stale Authorization headers.

## Releases
**v0.56.0-nightly.20260811.geef19f25c** — [Release](https://github.com/google-gemini/gemini-cli/releases)
- fix(core): refresh MCP OAuth tokens with the stored client ID ([#28481](https://github.com/google-gemini/gemini-cli/pull/28481)) — first contribution from @ParthivNaresh, fixing token refreshes that lost the original client ID context.

## Hot Issues
1. **Usage limit reached despite available quota** ([#28761](https://github.com/google-gemini/gemini-cli/issues/28761), 15 👍) — Code Assist Standard users get "Usage limit reached for gemini-3.5-flash" while the model usage display shows 1–8% consumption. Fastest-rising issue this cycle; points to a quota-accounting mismatch in the auth/usage path.
2. **Subagent MAX_TURNS reported as GOAL success** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 12 comments) — `codebase_investigator` reports `status: "success"` with `Termination Reason: "GOAL"` even when it hit the turn limit before doing any analysis. Misleading termination reporting undermines trust in agent status.
3. **Generalist agent hangs indefinitely** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 👍) — Trivial operations like folder creation hang for up to an hour when deferred to the generalist agent; instructing the model to avoid subagents works around it.
4. **Shell commands stuck in "Waiting input"** ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166), 3 👍) — Finished simple CLI commands remain displayed as active and awaiting input, blocking the session from proceeding.
5. **Gemini under-uses skills and sub-agents** ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)) — Custom skills (e.g., gradle, git) are ignored unless explicitly instructed, reducing the value of the extensibility model.
6. **Subagents running despite being disabled** ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)) — Since v0.33.0, subagents execute even when agents mode is disabled in all configurations — a permissions/configuration regression.
7. **Symlinked agent files not recognized** ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)) — `~/.gemini/agents/filename.md` symlinks are silently ignored, breaking dotfile-managed agent setups.
8. **Auto Memory retries low-signal sessions forever** ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)) — Sessions the extractor deems low-signal stay unprocessed and resurface repeatedly, wasting background compute.
9. **400 error with >128 tools** ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) — Tool-heavy configurations exceed model limits; users want smarter tool scoping based on enabled tools.
10. **Browser Agent ignores settings.json overrides** ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) — Config such as `maxTurns` is correctly merged by AgentRegistry but never applied at runtime.

## Key PR Progress
1. **fix(cli): --resume opens a second session file** ([#28767](https://github.com/google-gemini/gemini-cli/pull/28767), P1) — Fixes reuse of the resumed session ID causing a fresh chat to start and cleanup to delete the real session file.
2. **fix(acp): don't start a fresh chat before resuming** ([#28744](https://github.com/google-gemini/gemini-cli/pull/28744), P1) — Removes one of two fresh-chat starts on the load path that poisons the session file; partially addresses #28693.
3. **fix(core): strip Authorization header with GEMINI_API_KEY** ([#28546](https://github.com/google-gemini/gemini-cli/pull/28546), P1, security) — Stale `Authorization` headers caused `401 UNAUTHENTICATED ACCESS_TOKEN_TYPE_UNSUPPORTED`; closes #28538.
4. **fix(mcp): disclose Plan Mode read-only status is a server claim** ([#28549](https://github.com/google-gemini/gemini-cli/pull/28549), security) — `readOnlyHint` comes from MCP servers and is unverified; the PR documents this and closes the trust gap in `plan.toml` promotion.
5. **fix(cli): skip diff hunk markers during @ processing** ([#28581](https://github.com/google-gemini/gemini-cli/pull/28581)) — Prevents `@@` hunk markers from being interpreted as `@file` references, eliminating two recursive workspace-wide glob searches per hunk and fixing heap growth on large diffs.
6. **feat(core): Gemini 3.6 Flash and 3.5 Flash-Lite model configs** ([#28673](https://github.com/google-gemini/gemini-cli/pull/28673)) — Adds base model definitions, capabilities, aliases, and Code Assist mappings for two upcoming models.
7. **fix(core): align GlobTool validation with execute() scope** ([#28666](https://github.com/google-gemini/gemini-cli/pull/28666)) — `validateToolParamValues()` only checked the target dir while `execute()` searched multiple workspace dirs — a validation bypass.
8. **fix(core): guard formatTruncatedToolOutput against non-positive maxChars** ([#28639](https://github.com/google-gemini/gemini-cli/pull/28639), P1) — Negative `maxChars` inflated output ~2x via `String.slice()` negative-index behavior; fixes #28620.
9. **fix(sdk): keep sendStream alive on malformed tool arguments** ([#28660](https://github.com/google-gemini/gemini-cli/pull/28660)) — Converts uncaught `JSON.parse` failures into structured `functionResponse` errors instead of killing the stream.
10. **fix(core): Whisper model downloads failure-atomic** ([#28655](https://github.com/google-gemini/gemini-cli/pull/28655)) — Interrupted downloads can no longer leave a corrupt `.bin` at the installed model path, since writes stream to temp and await completion.

*Also notable:* duplicate fixes for the VS Code companion comma-operator bug that leaked Disposables and dropped command registrations ([#28764](https://github.com/google-gemini/gemini-cli/pull/28764), [#28665](https://github.com/google-gemini/gemini-cli/pull/28665)).

## Feature Request Trends
- **Agent self-awareness & observability**: Users consistently request subagent trajectory sharing via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and agents that understand their own CLI flags and hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **AST-aware codebase navigation**: An Epic ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745)) proposes AST-based file read/search/mapping to reduce token noise and turn count, with a follow-up recommending `tilth`/`glyph` tools ([#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).
- **Memory system hardening**: Auto Memory needs deterministic secret redaction before content enters model context ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) and quarantine for invalid inbox patches ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)).
- **Browser agent resilience**: Automatic session takeover and lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) plus honoring `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Broader evaluations**: Component-level eval expansion beyond the existing 76 behavioral tests ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)).

## Developer Pain Points
- **Hangs and false progress**: Generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), stuck shell commands ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and blocking interactive prompts during Vite scaffolding ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) are the top workflow killers.
- **Misleading self-reporting**: MAX_TURNS surfaced as GOAL success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) and spurious quota errors ([#28761](https://github.com/google-gemini/gemini-cli/issues/28761)) erode confidence in the tool's status reporting.
- **Unexpected agent behavior**: Agents executing despite being disabled ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)), scattering temp scripts across workspaces ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), and destructive git/DB operations ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Session reliability**: Duplicate sessions on `--resume` ([#28767](https://github.com/google-gemini/gemini-cli/pull/28767)), retention deleting unrelated chats due to short-ID collisions ([#28653](https://github.com/google-gemini/gemini-cli/pull/28653)), and ACP session-file poisoning ([#28744](https://github.com/google-gemini/gemini-cli/pull/28744)) — actively being patched.
- **Terminal/UI polish**: Resize flicker and full-history re-render performance ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) and terminal corruption after exiting external editors ([#24935](https://github.com/google-gemini/gemini-cli/issues/24935)) remain open quality gaps.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-11

## Today's Highlights
- **v1.0.79 shipped** with sandbox configuration visibility and enterprise policy improvements for allow-auto-only and proxy enforcement.
- A critical config data-loss bug was reported: `/config model` wipes `settings.json` (#4431), and a related issue shows the configured default model is not applied to new sessions until restart (#4434).
- Community attention remains concentrated on enterprise policy enforcement, BYOK/custom model handling, long-session reliability, and Windows-specific regressions.

## Releases
- [v1.0.79](https://github.com/github/copilot-cli/releases/tag/v1.0.79) — 2026-08-10  
  - The `/sandbox` configuration dialog now shows where sandbox settings are stored in `settings.json`.
  - Added support for enterprise `allow-auto-only` policy so `/allow-all auto` works while full allow-all remains blocked.
  - Enterprise-managed sandbox policy can now enforce a proxy URL while handling credential flows appropriately.

## Hot Issues
1. [Issue #4431 — Using `/config model` wipes all settings](https://github.com/github/copilot-cli/issues/4431)  
   A new v1.0.79 regression where selecting a user-wide model overwrites the entire `settings.json`. Immediately reported and closed, but the data-loss risk is significant.

2. [Issue #4434 — User-level configured model is not used in new sessions](https://github.com/github/copilot-cli/issues/4434)  
   Related to #4431: a user-default model is ignored after `/clear` or via the sessions UI until the CLI is fully restarted. Frustrating for users who expect persistent configuration to apply immediately.

3. [Issue #1595 — Sporadic policy blocking issue retrieving models](https://github.com/github/copilot-cli/issues/1595)  
   Long-running enterprise issue with 29 comments and 11 👍. Valid Enterprise subscriptions see “access denied by Copilot policy” when using `/models`, despite premium quota remaining. High visibility among enterprise admins.

4. [Issue #4222 — Regression of #2802: main pane freezes / output swallowed on Windows](https://github.com/github/copilot-cli/issues/4222)  
   The infinite React/Ink render loop from v1.0.31 has regressed on v1.0.72+ in VS Code integrated terminal on native Windows. Prompts disappear, UI hangs on “Working...”, and output is never rendered.

5. [Issue #4325 — Session permanently unloadable once `events.jsonl` exceeds V8 max string length](https://github.com/github/copilot-cli/issues/4325)  
   Long-lived sessions become impossible to resume after the event log grows past V8’s string limit. The session stays visible in `/resume` but cannot be loaded, causing permanent session loss.

6. [Issue #4095 — Windows: plugin update fails with “Access is denied” while VS Code is running](https://github.com/github/copilot-cli/issues/4095)  
   Backed by 13 👍, this affects any Windows user with the Copilot extension open. VS Code holds watcher handles on installed plugins, so `copilot plugin update` fails with `os error 5`.

7. [Issue #3954 — `explore` tool hardcodes `gpt-5.4-mini`, ignoring custom/DeepSeek API configuration](https://github.com/github/copilot-cli/issues/3954)  
   BYOK users on custom endpoints hit failures because the `explore` tool always targets `gpt-5.4-mini`. This undermines custom-model setups and generated 3 👍 from affected developers.

8. [Issue #4427 — Subagent started with unsupported model fails the whole session](https://github.com/github/copilot-cli/issues/4427)  
   In a long autopilot session, a subagent was launched with `gemini-3.6-flash`, which was later deprecated mid-session. The entire main agent session then failed instead of gracefully falling back.

9. [Issue #4432 — `rubber-duck` model-emitted `model` argument overrides complementary strategy](https://github.com/github/copilot-cli/issues/4432)  
   The `rubber-duck` reviewer is meant to provide an independent cross-family review, but the model can emit a `model` argument that silently overrides the complementary selection and user `/subagents` settings.

10. [Issue #4364 — Enterprise MCP registry unreachable on macOS: rustls rejects private CA cert](https://github.com/github/copilot-cli/issues/4364)  
   macOS users cannot use enterprise custom MCP registries because TLS verification fails with Apple error -67901 for private CA certificates. The fail-closed behavior blocks all MCP servers.

## Key PR Progress
Only one PR was updated/created in the last 24h, so no 10-item list is available.

- [PR #4428 — Add initial devcontainer configuration](https://github.com/github/copilot-cli/pull/4428)  
  Adds a devcontainer configuration for contributors. The PR summary is minimal (“LGTM”), and it is currently open with no comments.

## Feature Request Trends
- **Flexible model routing and BYOK support:** Users continue to request custom/DeepSeek-friendly model selection, persistent default models, and no hardcoded subagent models. Issues #3954, #4434, and #4427 all point in this direction.
- **MCP unification and reliability:** Developers want a single `mcp.json` shared between VS Code and Copilot CLI, better handling of idle MCP connections, and built-in GitHub MCP tools enabled by default. See #4429, #3257, and #4436.
- **Session lifecycle hooks and resumability:** Requesters want `sessionStart` hooks to fire on `/new` and `/clear`, and better handling of very large session event logs so long sessions do not become permanently unloadable (#4365, #4325).
- **Enterprise policy transparency:** Users need clearer diagnostics for policy-related blocks, especially around model listing, allow-auto-only behavior, and private-CA MCP registries (#1595, #4364).

## Developer Pain Points
- **Configuration data loss and inconsistency:** `/config model` wiping `settings.json` and user-default models not applying until restart are top frustrations in the latest 24h.
- **Long-session fragility:** Sessions break from V8 string limits, unsupported model deprecation mid-run, and silent permission revocation in non-interactive `-p` mode. These cause unrecoverable workflow interruptions.
- **Enterprise and BYOK friction:** Sporadic policy denials, local 403 errors before reaching custom providers, and private-CA rejection on macOS create major blockers for enterprise/BYOK users.
- **Windows-specific breakage:** Render-loop regressions, plugin update file-locking, and `/cwd` not stripping quotes from copied Windows paths highlight ongoing Windows platform gaps.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-11

## 1. Today’s Highlights

No new releases were published in the last 24 hours. The community’s strongest ongoing demand remains a persistent memory/context system (#1283, #1478), with the main memory thread accumulating 33 comments. Seven older PRs, mostly hardening ACP internals and file-tool safety, were closed/updated today.

## 2. Releases

No new releases in the last 24h.

---

## 3. Hot Issues

All 5 issues updated in the last 24h are listed.

- **#1283 — [enhancement] Feature Request: Memory System - Persistent context across sessions**  
  [https://github.com/MoonshotAI/kimi-cli/issues/1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  Long-running request (open since Feb) with 33 comments. Wants automatic AI-managed memory plus manual user-defined instructions to persist project patterns, context, and preferences across sessions. High engagement signals this is the most desired feature in the current backlog.

- **#1478 — 能否优化记忆层？/ Can the memory layer be optimized?**  
  [https://github.com/MoonshotAI/kimi-cli/issues/1478](https://github.com/MoonshotAI/kimi-cli/issues/1478)  
  Complains that memory is painful on large projects and that only `agent.md` is mentioned in docs. References an external memory-file layout as a possible model. Complements #1283 and adds urgency around documentation and big-project usability.

- **#2601 — [Feature Request] Quote & Reply: comment on any selected part of an AI response in Kimi Web**  
  [https://github.com/MoonshotAI/kimi-cli/issues/2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)  
  Requests selecting any text span in an assistant response — paragraph, code block, plan step, diff line — and attaching a follow-up comment/question. Although aimed at Kimi Web, it reflects demand for more granular agent-response interaction.

- **#2600 — [bug] Windows PowerShell 7 default D drive start path not found**  
  [https://github.com/MoonshotAI/kimi-cli/issues/2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)  
  On Windows 0.33, if PowerShell 7 is configured to launch from `D:`, Kimi Code can’t resolve the working path. New issue with no comments yet, but relevant to Windows users with non-default shell startup directories.

- **#2599 — [bug] Planning task todo shows “验尸”/“Autopsy” wording**  
  [https://github.com/MoonshotAI/kimi-cli/issues/2599](https://github.com/MoonshotAI/kimi-cli/issues/2599)  
  On 0.34.0 with `kimi k3`, the planning todo unexpectedly contains the word “autopsy,” which is alarming in a normal dev workflow. Likely a model-output/translation issue; indicates a need for safer task-label generation.

---

## 4. Key PR Progress

7 PRs were updated/closed in the last 24h.

- **#2057 — fix(acp): replace assert statements with proper RuntimeError exceptions**  
  [https://github.com/MoonshotAI/kimi-cli/pull/2057](https://github.com/MoonshotAI/kimi-cli/pull/2057)  
  Replaces 5 `assert`s in `acp/session.py` with `RuntimeError`, guaranteeing invariant checks survive Python’s `-O` flag.

- **#2056 — fix(wire): eliminate TOCTOU race in WireFile.append_record**  
  [https://github.com/MoonshotAI/kimi-cli/pull/2056](https://github.com/MoonshotAI/kimi-cli/pull/2056)  
  Fixes a time-of-check/time-of-use race between `exists()` and `stat()` in `WireFile.append_record`, preventing unhandled crashes when files are deleted concurrently.

- **#2055 — fix(agentspec): replace assert with proper AgentSpecError exception**  
  [https://github.com/MoonshotAI/kimi-cli/pull/2055](https://github.com/MoonshotAI/kimi-cli/pull/2055)  
  Replaces `assert agent_spec.extend is None` with an explicit `AgentSpecError`, avoiding silent safety-check removal under optimized Python.

- **#1328 — Fix minor bugs in file tools and UI feedback**  
  [https://github.com/MoonshotAI/kimi-cli/pull/1328](https://github.com/MoonshotAI/kimi-cli/pull/1328)  
  Fixes replacement-count calculation in `StrReplaceFile` for multiple edits and improves UI feedback correctness.

- **#1082 — fix(pyinstaller): filter non-existent dateparser cache files**  
  [https://github.com/MoonshotAI/kimi-cli/pull/1082](https://github.com/MoonshotAI/kimi-cli/pull/1082)  
  Prevents PyInstaller builds from failing when lazily generated `dateparser_tz_cache.pkl` does not exist, especially in clean CI environments.

- **#1077 — fix: remove redundant mode validation in WriteFile tool**  
  [https://github.com/MoonshotAI/kimi-cli/pull/1077](https://github.com/MoonshotAI/kimi-cli/pull/1077)  
  Removes duplicate runtime validation of `mode` in `WriteFile`, simplifying the tool’s logic without changing behavior.

- **#1393 — fix(acp): route shell commands through terminal args**  
  [https://github.com/MoonshotAI/kimi-cli/pull/1393](https://github.com/MoonshotAI/kimi-cli/pull/1393)  
  Fixes ACP shell terminal execution by passing the shell executable in `command` and invocation in `args`, adapting to the current ACP SDK response shape via `terminal_id`. Adds bash and PowerShell regression tests.

---

## 5. Feature Request Trends

- **Persistent memory/context across sessions** is the dominant request. Both #1283 and #1478 ask for automatic/manual memory that survives session boundaries and works reliably on large projects.
- **Granular response interaction** is emerging: #2601 proposes quote-and-reply on arbitrary parts of an AI response, suggesting users want more precise control over agent output beyond full-turn prompting.
- **Docs/visibility gap:** #1478 explicitly notes that memory features are not well documented, so even committed users struggle to discover and configure the intended behavior.

---

## 6. Developer Pain Points

- **Memory is insufficient for large projects:** Users report pain when context/patterns don’t persist across sessions (#1283, #1478).
- **Lack of memory documentation:** Only `agent.md` is visible; users want official guidance for long-term memory files and preference management (#1478).
- **Windows-specific path issues:** Launching Kimi Code from a non-system `D:` drive in PowerShell 7 breaks path resolution (#2600).
- **Confusing or alarming model output:** Users are concerned when planning todos include unexpected words like “autopsy” (#2599), highlighting a need for safer task-naming/normalization.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-11

## Today's Highlights

No new releases landed in the past 24 hours, so attention is on reliability and bug-fix momentum. The most-voted issue of the cycle, [#37852](https://github.com/anomalyco/opencode/issues/37852) (55 👍), exposes a dangerous silent-failure path where aborted provider streams are recorded as clean stops with zero usage and no error. Meanwhile, the two long-standing retry-policy bugs ([#25884](https://github.com/anomalyco/opencode/issues/25884), [#21960](https://github.com/anomalyco/opencode/issues/21960)) finally have a proposed fix in [#41699](https://github.com/anomalyco/opencode/pull/41699). Windows desktop users continue to report stability problems, and the Console Go DeepSeek model-name bug remains contentious even after being closed.

## Releases

None. No new releases were published in the last 24 hours.

## Hot Issues

1. **[#37852 — Aborted provider stream recorded as clean stop](https://github.com/anomalyco/opencode/issues/37852)** · 18 comments · 55 👍  
   The top complaint this cycle: when a provider stream dies mid-generation without a finish reason or usage chunk, opencode records the turn as complete (`finish=unknown`, zero tokens, no text) and subagents return empty — no error, no retry, no log. The high 👍 count reflects broad impact on agent-loop reliability and silent false-success.

2. **[#25884 — OpenAI `server_is_overloaded` stream errors are not retried](https://github.com/anomalyco/opencode/issues/25884)** · 14 comments · 11 👍  
   Transient overload events fail the turn immediately instead of triggering a backoff retry. Community consensus: this is exactly the case where retry is expected, making the omission costly in flaky production environments.

3. **[#23636 — PowerShell output encoding for non-ASCII characters on Windows](https://github.com/anomalyco/opencode/issues/23636)** · 14 comments · 2 👍  
   CJK filenames appear garbled in PowerShell output because `[Console]::OutputEncoding` falls back to system codepage (e.g. GB2312). A significant developer-experience issue for Chinese/Japanese/Korean Windows users.

4. **[#25038 — Long-running shell commands (e.g. Gradle) hang after "BUILD SUCCESSFUL"](https://github.com/anomalyco/opencode/issues/25038)** · 12 comments · 9 👍  
   The process stays hung even after the build completes, blocking the agent loop until manual intervention. The community links this to the need for background execution support (see PR [#40005](https://github.com/anomalyco/opencode/pull/40005)).

5. **[#41306 — deepseek-v4-flash still broken on Console Go after #41211](https://github.com/anomalyco/opencode/issues/41306)** · 5 comments  
   Verified via curl that the gateway still forwards the model name with a **leading space**, yielding HTTP 400 for the documented `deepseek-v4-flash` ID. Paired with [#41300](https://github.com/anomalyco/opencode/issues/41300) and [#41322](https://github.com/anomalyco/opencode/issues/41322) — two issues were closed as fixed while the bug persists, a source of community frustration.

6. **[#21960 — `SessionRetry.policy()` retries forever with no max attempt count](https://github.com/anomalyco/opencode/issues/21960)** · 6 comments  
   Root cause pinpointed in `packages/opencode/src/session/retry.ts`: retryable errors (429, 529, overloaded) retry indefinitely with no attempt cap or total-duration bound. Fix proposed in [#41699](https://github.com/anomalyco/opencode/pull/41699).

7. **[#41684 — Go plan: free-model congestion + silent quota exhaustion](https://github.com/anomalyco/opencode/issues/41684)** · 2 comments · new today  
   A subscriber burned **$12 in 45 minutes with zero output** — free-model congestion stalled all work, and there was no warning until everything silently stopped. Highlights poor quota-exhaustion observability.

8. **[#41697 — Zen model disable toggle is not enforced at the gateway](https://github.com/anomalyco/opencode/issues/41697)** · 3 comments · new today  
   Using the Go plan as a Codex provider, Codex auto-selects `gpt-5.6-luna` despite the Zen disable toggle, and billing continues. Community calls for server-side enforcement rather than client-side settings.

9. **[#41714 — Windows Desktop sidecar crashes with exitCode -2147483645, then "Failed to fetch"](https://github.com/anomalyco/opencode/issues/41714)** · 2 comments · new today  
   The `opencode server` sidecar dies shortly after startup on both 1.18.15 and 1.18.16, taking the UI down. A fresh, reproducible Windows stability regression.

10. **[#34409 — Subagent with vision-capable model fails to analyze images](https://github.com/anomalyco/opencode/issues/34409)** · 3 comments  
    `moonshotai/kimi-k2.6` works for image analysis in the main session but fails when invoked via subagent. Points to capability negotiation not propagating between main and subagent sessions; PR [#41527](https://github.com/anomalyco/opencode/pull/41527) targets the underlying provider capability flag.

## Key PR Progress

1. **[#41699 — Cap session retries and make retry/backoffDelay configurable](https://github.com/anomalyco/opencode/pull/41699)**  
   Directly addresses the infinite-retry bug [#21960](https://github.com/anomalyco/opencode/issues/21960) by adding an attempt cap and exposing `retry`/`backoffDelay` configuration.

2. **[#40005 — Run long-running shell commands without blocking the conversation](https://github.com/anomalyco/opencode/pull/40005)**  
   Re-submission of the background-execution feature; lets polling loops and builds run in the background, targeting the hang reported in [#25038](https://github.com/anomalyco/opencode/issues/25038).

3. **[#41704 — Normalize Windows backslash paths in file watcher](https://github.com/anomalyco/opencode/pull/41704)**  
   Fixes file tree/viewer auto-refresh after AI edits on Windows, where `path.normalize()` preserved backslashes but tree-store and watcher expected forward slashes.

4. **[#41527 — Respect attachment image capability for custom providers](https://github.com/anomalyco/opencode/pull/41527)**  
   Providers configured with `attachment: true` were still treated as non-image-capable unless `modalities` was set. Closes [#33542](https://github.com/anomalyco/opencode/issues/33542) and relates to the subagent vision problem [#34409](https://github.com/anomalyco/opencode/issues/34409).

5. **[#40403 — Auto-compact stale sessions resumed after idle](https://github.com/anomalyco/opencode/pull/40403)**  
   Automatically compacts long-running sessions resumed after idle to avoid re-sending the full prefix every turn — a direct cost-reduction measure.

6. **[#39982 — Concise error output for failed shell commands](https://github.com/anomalyco/opencode/pull/39982)**  
   Part 3 of the shell-error UX overhaul: failed commands (non-zero exit) now produce concise, actionable output instead of dumping full logs.

7. **[#39990 — Inject debugging-loop hint when the same shell command keeps failing](https://github.com/anomalyco/opencode/pull/39990)**  
   Detects repeated failures of the same command and nudges the model to stop cycling through hypotheses at the same layer.

8. **[#39997 — Dedup unchanged file reads with a `file_unchanged` stub](https://github.com/anomalyco/opencode/pull/39997)**  
   If a `read` targets a file already fully in context and unchanged on disk, return a stub instead of re-sending the contents — context-window savings across sessions.

9. **[#13860 — Add GitHub Enterprise Server support to GitHub Action](https://github.com/anomalyco/opencode/pull/13860)**  
   Derives all host-specific values from `GITHUB_SERVER_URL`/`GITHUB_API_URL` instead of hardcoding `github.com`. Closes [#12830](https://github.com/anomalyco/opencode/issues/12830).

10. **[#33010 / #41695 — Android/Termux support](https://github.com/anomalyco/opencode/pull/33010)**  
    Broader Termux/Android platform support in postinstall, wrapper, and publish ([#33010](https://github.com/anomalyco/opencode/pull/33010)), plus a new one-shot `termux-install.sh` bootstrap and docs ([#41695](https://github.com/anomalyco/opencode/pull/41695)).

## Feature Request Trends

- **Session & prompt management**: saving/bookmarking prompts and threads by topic ([#24017](https://github.com/anomalyco/opencode/issues/24017)), `/goal` or `/loop` iterative command reminiscent of Claude Code ([#41687](https://github.com/anomalyco/opencode/issues/41687)), and clearer active-tab indicators in the desktop app ([#41688](https://github.com/anomalyco/opencode/issues/41688)).
- **Android/Termux as a first-class platform**: two complementary PRs ([#33010](https://github.com/anomalyco/opencode/pull/33010), [#41695](https://github.com/anomalyco/opencode/pull/41695)) push toward official Android support.
- **Background execution for long-running commands**: driven by hang reports ([#25038](https://github.com/anomalyco/opencode/issues/25038)) and the new background-task feature ([#40005](https://github.com/anomalyco/opencode/pull/40005)).
- **Configurable, bounded retry policies**: the community wants retry behavior that is neither absent ([#25884](https://github.com/anomalyco/opencode/issues/25884)) nor infinite ([#21960](https://github.com/anomalyco/opencode/issues/21960)).
- **Enterprise/self-host support**: GitHub Enterprise Server for the action ([#13860](https://github.com/anomalyco/opencode/pull/13860)).
- **i18n & language tooling**: Khmer localization ([#37457](https://github.com/anomalyco/opencode/pull/37457)), CJK PowerShell encoding ([#23636](https://github.com/anomalyco/opencode/issues/23636)), and Odin syntax highlighting ([#40889](https://github.com/anomalyco/opencode/issues/40889)).

## Developer Pain Points

- **Silent provider-stream failures**: aborted streams recorded as clean stops with zero usage and no error ([#37852](https://github.com/anomalyco/opencode/issues/37852)) are the most dangerous failure mode — they produce false success rather than surfacing an error.
- **Retry-policy whiplash**: some transient errors are never retried ([#25884](https://github.com/anomalyco/opencode/issues/25884)), while others retry infinitely ([#21960](https://github.com/anomalyco/opencode/issues/21960)); both waste developer time and API spend.
- **Windows instability cluster**: hangs after successful builds ([#25038](https://github.com/anomalyco/opencode/issues/25038)), garbled CJK output ([#23636](https://github.com/anomalyco/opencode/issues/23636)), sidecar crashes ([#41714](https://github.com/anomalyco/opencode/issues/41714)), renderer freezes ([#40572](https://github.com/anomalyco/opencode/issues/40572)), unreachable LAN IPs ([#25908](https://github.com/anomalyco/opencode/issues/25908)), and broken Sublime Text integration ([#41694](https://github.com/anomalyco/opencode/issues/41694)) paint a broad Windows reliability gap.
- **Console Go gateway bug persistence**: the DeepSeek leading-space model-name bug was closed as fixed but verified still broken ([#41306](https://github.com/anomalyco/opencode/issues/41306)) — eroding trust in issue triage.
- **Billing and quota opacity**: silent quota exhaustion on the Go plan ([#41684](https://github.com/anomalyco/opencode/issues/41684)), unenforced Zen model disable toggle ([#41697](https://github.com/anomalyco/opencode/issues/41697)), and Stripe/Alipay payment verification failures ([#33112](https://github.com/anomalyco/opencode/issues/33112)) all point to a need for transparent usage controls.
- **Subagent capability mismatches**: vision-capable models failing only in subagent context ([#34409](https://github.com/anomalyco/opencode/issues/34409)) and custom tools crashing with a Bun minified runtime error ([#35498](https://github.com/anomalyco/opencode/issues/35498)) frustrate advanced multi-agent workflows.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-11

## Today's Highlights
Windows support is the dominant community topic: the open thread on how developers run Pi on Windows and what breaks (#7547) is the most-commented issue this week (25 comments), alongside a long-running WSL Copilot-login hang (#6187) and a P0 CMD output/memory regression (#7947). On the code side, maintainers landed fixes for Codex WebSocket retry handling (#7943), custom skill-directory doc filtering (#7949), and plan-mode progress tracking (#7950), while TUI quality-of-life work — fullscreen transcript search (#7913) and render hot-path optimization (#7921) — continues to move fast.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#7547 — How do you use Pi on Windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547)** — 25 comments. A community-wide survey of Windows usage patterns and pain points. The maintainer explicitly wants help deciding where to focus Windows effort vs. what to delegate out of core; the high engagement shows strong Windows demand and a fragmented setup landscape.

2. **[#6187 — Pi login hangs in WSL after browser-based GitHub Copilot device authorization](https://github.com/earendil-works/pi/issues/6187)** — 22 comments. Device auth completes in the browser (device shows registered) but the WSL client never detects it and hangs. Open since June — a persistent blocker for the WSL subset of the community.

3. **[#5291 — Sessions hang on "Working…" when used with Anthropic subscription](https://github.com/earendil-works/pi/issues/5291)** — 9 comments, 3 👍. Sessions intermittently get stuck on "Working…", often all at once; interrupt/resume only sometimes recovers. Closed, but a good reference point for Anthropic-subscription streaming reliability.

4. **[#7730 — High CPU usage on macOS with long session](https://github.com/earendil-works/pi/issues/7730)** — 9 comments, 8 👍. CPU swings between 50–110% with 600–800MB memory usage, apparently correlated with session/context length. The most-upvoted open bug in this digest.

5. **[#7444 — WebSocket retry only handles two error codes; other transient `response.failed` errors hard-stop the turn](https://github.com/earendil-works/pi/issues/7444)** — 7 comments. The Codex responses transport bails on any `response.failed` frame outside two special-cased codes. This issue directly spawned today's fix PR #7943.

6. **[#7850 — GitHub Copilot login fails with 429 for organizations with 20+ available models](https://github.com/earendil-works/pi/issues/7850)** — 5 comments, 6 👍. Device auth succeeds, then Pi gets rate-limited during Copilot login for orgs with many enabled models. Closed as no-action, but a duplicate (#7428) confirms it affects individual subscribers too.

7. **[#7835 — Edit tool rejects a single-object `edits` argument](https://github.com/earendil-works/pi/issues/7835)** — 4 comments. Some models pass `edits` as one object `{oldText, newText}` or a JSON string instead of an array. Related #7944 points out the existing fix in `prepareEditArguments` is unreachable because schema validation runs first.

8. **[#7846 — Unable to start 0.84.0/0.84.1 with Bun runtime](https://github.com/earendil-works/pi/issues/7846)** — 3 comments, 1 👍. Crash on startup: `TypeError: zlib.createZstdDecompress is not a function` from undici. A runtime-compatibility regression blocking Bun users.

9. **[#7911 — 0.84.0's delta-only `message_update` removed `usage`, hence no mid-run usage on the wire protocol](https://github.com/earendil-works/pi/issues/7911)** — 2 comments. The 0.84.0 fix for #7290 removed cumulative `message` from `message_update` events, but `usage` lived on that event and was dropped too. JSON-RPC consumers now see no usage until `message_end`.

10. **[#7947 — [P0] On CMD: repeated output, memory leak, unresponsive to Ctrl+C](https://github.com/earendil-works/pi/issues/7947)** — 2 comments. On Windows 11 CMD with DeepSeek-V4-Flash, Pi emits endless repeated `0` lines, consumes memory, and ignores interrupt. Freshly filed, P0-tagged terminal regression. Also note **#7760** (in-progress) for incorrect LaTeX `\frac` rendering in the TUI.

## Key PR Progress

1. **[#7943 — fix(ai): retry Codex websocket rate limits](https://github.com/earendil-works/pi/pull/7943)** — Implements the fix requested by #7444: retry all `response.failed` WebSocket errors except known non-retryable cases (context window, quota, policy, etc.).

2. **[#7949 — fix(coding-agent): ignore docs in custom skill directories](https://github.com/earendil-works/pi/pull/7949)** — A second iteration (after #7924) of the fix for #7805: root Markdown files like `README.md`/`AGENTS.md` in `settings.skills` directories are only treated as skills when frontmatter declares a non-empty `description`.

3. **[#7950 — fix(plan-mode): make progress tracking robust and tolerant](https://github.com/earendil-works/pi/pull/7950)** — Hardens the plan-mode example extension (supersedes #7918): completion markers are now recognized in `thinking` blocks and no longer require the exact `[DONE:n]` form, so todo widgets stop sitting at `0/N`.

4. **[#7948 — feat(coding-agent): defer extension runtime reloads](https://github.com/earendil-works/pi/pull/7948)** — Replaces awaited command-only `ctx.reload()` with fire-and-forget `ctx.requestReload()`, coalescing requests and deferring runtime replacement until extension operations, compaction, or summarization settle.

5. **[#7797 — refactor: search](https://github.com/earendil-works/pi/pull/7797)** — Decouples session search from `SessionRepo` using a minimal async-iterable API with stable hit identity (`sessionId`, `entryId`); updates scanning, JSONL, memory, and SQLite backends.

6. **[#7807 — fix(ai): expose low reasoning effort for native DeepSeek V4 Flash](https://github.com/earendil-works/pi/pull/7807)** — V4 Flash supports `low` as a distinct reasoning effort, but the shared V4 map promoted `low` to `high`. Adds a native Flash-specific map (refs #7563, #7589).

7. **[#7892 — fix(tui): avoid repainting idle fullscreen sessions on focus loss](https://github.com/earendil-works/pi/pull/7892)** — Stops focus-out events from requesting renders when nothing changed, eliminating false "new output" activity indicators in iTerm2.

8. **[#7897 — fix(coding-agent): inherit subagent session config](https://github.com/earendil-works/pi/pull/7897)** — Subagents now inherit the current session's model/thinking level instead of picking up whatever the last arbitrary session set.

9. **[#7901 — feat(ai): AI Gateway transport over the Cloudflare AI binding](https://github.com/earendil-works/pi/pull/7901)** — Adds a Cloudflare Workers AI Gateway transport over the AI binding, targeting #7838 and Cloudflare's unified binding API.

10. **[#7913 — feat(tui): add fullscreen transcript search](https://github.com/earendil-works/pi/pull/7913)** — Adds basic transcript search in fullscreen mode, bound to `Ctrl+Shift+f`.

Also notable: **#7921** (split interactive transcript into stable/dynamic render regions to cut render cost), **#7899** (prevents split Alt+Enter ESC/CR bytes from triggering `app.interrupt`), **#7933** (case-insensitive DeepSeek base-URL detection), and **#7940** (canonical transcript read model with cursor paging).

## Feature Request Trends

- **TUI/terminal ergonomics is the hottest area**: sticky headers showing the last prompt (#7802), "more output below" indicators in fullscreen (#7908), fullscreen search (#7913), unbound single-line scroll actions (#7903), clickable OSC 8 hyperlinks in fullscreen mode (#7930), and inline images in tmux via Kitty DCS passthrough (#7936). Users clearly want fullscreen TUI to compete with dedicated terminal apps.
- **Windows/WSL as a first-class platform**: #7547 is an explicit call to consolidate Windows support strategy; WSL login (#6187), CMD output corruption (#7947), and Windows-specific tooling issues are the concrete follow-ups.
- **Provider configurability**: Cloudflare AI Gateway binding (#7901), honoring models.dev cost tiers for all providers (#7912), making model `maxTokens` optional (#7941), case-insensitive provider detection (#7933), and per-provider reasoning-effort maps (#7807).
- **Extension/agent API depth**: a `terminate` hint for blocked tool calls (#5998), exposing `expandPromptTemplates` in `sendUserMessage` (#7857), canonical transcript read model (#7940), canonical message identity for markdown transformers (#7910), and deferred extension reloads (#7948).

## Developer Pain Points

- **Authentication flakiness**: Copilot login 429s for orgs with many models (#7850, #7428) and WSL device-auth hangs (#6187) remain recurring, poorly diagnosed blockers.
- **Hangs & resource leaks**: Anthropic sessions stuck on "Working…" (#5291), macOS CPU/memory bloat on long sessions (#7730), and the P0 CMD repeated-output plus memory leak (#7947) all point to lifecycle/streaming reliability issues.
- **Runtime incompatibilities**: Bun crashes on startup due to missing `zlib.createZstdDecompress` in undici (#7846); Windows CMD renders corrupt output (#7947).
- **Edit tool strictness**: models passing a single-object `edits` get rejected (#7835), fuzzy matching is whitespace-sensitive (#7836), and the existing serialized-JSON fix is unreachable due to validation ordering (#7944).
- **Provider parity gaps**: optional tool fields become required via Cloudflare AI Gateway because `strict:false` is omitted (#7896); Anthropic models via OpenRouter fail with `tools.N.cache_control: Extra inputs are not permitted` (#7938); mid-run `usage` disappeared from the wire protocol after the 0.84.0 delta refactor (#7911).
- **Session/version inconsistencies**: `pi-agent-core` 0.84.1 requires JSONL v4 while `pi-coding-agent`'s `SessionManager` still writes v3 (#7937); `/resume` shows session counts that disagree with what's on disk (#7931).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-11

## Today's Highlights
Qwen Code v0.21.9 shipped with native Qoder plugin installation support and QR-code-based Local Control pairing. Meanwhile, the community is heavily focused on session lifecycle robustness — from restore-timeout handling to `sessionRotation` bounds — and deeper ACP/WebShell integration. A new Autofix PR also introduces a fail-closed E2E verification chain to stabilize the CI automation loop.

## Releases
- [v0.21.9](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.9) — Adds native support for installing Qoder plugins from directories, archives, Git repos, URLs, and npm packages, with automatic system-prompt loading ([#8661](https://github.com/QwenLM/qwen-code/pull/8661)). Also enables Local Control pairing via QR code.
- [v0.21.9-nightly.20260811.8c90697ace](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.9-nightly.20260811.8c90697ace) — Test coverage for context refresh marker carry-over across turns ([#8809](https://github.com/QwenLM/qwen-code/pull/8809)).
- [live-host-v0.1.1](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.1.1) — CLI fixes: probe sandbox runtime before selecting it ([#7734](https://github.com/QwenLM/qwen-code/pull/7734)) and serialize scan-and-pick in Autofix.

## Hot Issues
- [**#8678**](https://github.com/QwenLM/qwen-code/issues/8678) — **[P1] Session restore timeout can drop the current session** (5 comments). Core daemon reliability issue; the first PR, #8691, has already landed timeout-contract and observability work.
- [**#8182**](https://github.com/QwenLM/qwen-code/issues/8182) — **Daemon gives each ACP child 50% of host memory** (4 comments). Memory ceiling is not divided by child count, creating an OOM risk for multi-child serve deployments.
- [**#8644**](https://github.com/QwenLM/qwen-code/issues/8644) — **Windows file links broken by URL-encoded drive colon** (4 comments). `file:///d%3A/...` cannot be opened from chat; impacts VS Code users on Windows.
- [**#8871**](https://github.com/QwenLM/qwen-code/issues/8871) — **ACP child fails with “Unknown argument: acp” in serve mode** (4 comments). Breaks `qwen serve --http-bridge` runs and causes 401 token authentication failures.
- [**#8920**](https://github.com/QwenLM/qwen-code/issues/8920) — **Headless stream-json reports API errors as success with exit 0** (3 comments). Dangerous for automation because upstream failures are masked as successful runs.
- [**#8504**](https://github.com/QwenLM/qwen-code/issues/8504) — **Provider update prompt repeats when custom models are preserved** (4 comments). Users with added custom models are nagged repeatedly despite successful updates.
- [**#8877**](https://github.com/QwenLM/qwen-code/issues/8877) — **macOS microphone permission warning appears on every startup** (3 comments). Voice dictation warning shows even when the user never tries to record.
- [**#8901**](https://github.com/QwenLM/qwen-code/issues/8901) — **iTerm flickers when confirming a command choice on macOS** (3 comments). Reproducible TUI rendering regression in Qwen Code 0.21.8.
- [**#8841**](https://github.com/QwenLM/qwen-code/issues/8841) — **Supervised teammate runtime: fleet MVP stage 1B** (3 comments). Native multi-agent fleet work moves to an in-process preview; depends on stage #8840.
- [**#8926**](https://github.com/QwenLM/qwen-code/issues/8926) — **Bound session lifetime with `sessionRotation`** (2 comments). Requests per-channel session rotation so long-lived routes cannot grow past the context window.

## Key PR Progress
- [**#8927**](https://github.com/QwenLM/qwen-code/pull/8927) — `feat(channels): bound session lifetime with sessionRotation`. Adds per-channel `maxTurns`/time-based session rotation.
- [**#8467**](https://github.com/QwenLM/qwen-code/pull/8467) — `feat(web-shell): add Git diff sources and existing branch switching`. Expands Changes view with Uncommitted/Staged/Committed/Branch comparison sources.
- [**#8782**](https://github.com/QwenLM/qwen-code/pull/8782) — `fix(acp): emit standard session title updates`. Sends standard ACP `session_info_update` notifications for non-Qwen clients.
- [**#8789**](https://github.com/QwenLM/qwen-code/pull/8789) — `fix(cli): optimize repeated inline image rendering`. Adds a negative cache for invalid PNGs and prevents recursive ANSI escaping on image data.
- [**#8475**](https://github.com/QwenLM/qwen-code/pull/8475) — `fix(core): restore deferred MCP tools on resumed sessions`. Fixes MCP tools failing on subsequent queries in resumed sessions.
- [**#8928**](https://github.com/QwenLM/qwen-code/pull/8928) — `feat(autofix): require isolated targeted E2E proof`. Fail-closed verification chain for Autofix issues created from post-merge E2E failures.
- [**#8884**](https://github.com/QwenLM/qwen-code/pull/8884) — `fix: add structured error code to SessionNotFoundError`. Helps WebUI and Java session-close retry behavior handle already-closing sessions idempotently.
- [**#8896**](https://github.com/QwenLM/qwen-code/pull/8896) — `fix(desktop): consolidate 0.1.1 regressions`. macOS runtime proof, microphone state-machine fixes, and no synthetic reconnect on normal SSE endings.
- [**#8675**](https://github.com/QwenLM/qwen-code/pull/8675) — `feat(web-shell): add model-specific reasoning controls`. Registry for Thinking/Effort controls wired through Core, ACP, daemon, SDK, and WebShell.
- [**#8613**](https://github.com/QwenLM/qwen-code/pull/8613) — `feat(web-shell): tmux-backed interactive terminal sub-agent`. Lets agents run REPLs/TUI apps in tmux with a live interactive view in WebShell.

## Feature Request Trends
- **Session lifecycle management is the dominant theme**: `sessionRotation` bounds ([#8926](https://github.com/QwenLM/qwen-code/issues/8926)), standalone sessions without workspaces ([#8908](https://github.com/QwenLM/qwen-code/issues/8908)), and Channel/session/workspace redesign ([#8845](https://github.com/QwenLM/qwen-code/issues/8845)).
- **Multi-agent fleet development is accelerating**: supervised teammate runtime ([#8841](https://github.com/QwenLM/qwen-code/issues/8841)) and tmux-backed interactive sub-agents ([#8613](https://github.com/QwenLM/qwen-code/pull/8613)) point toward a larger agent-orchestration roadmap.
- **ACP/WebShell integration depth is increasing**: reasoning effort selectors ([#8526](https://github.com/QwenLM/qwen-code/pull/8526), [#8675](https://github.com/QwenLM/qwen-code/pull/8675)) and standard ACP session title notifications ([#8782](https://github.com/QwenLM/qwen-code/pull/8782)) improve cross-client compatibility.
- **Reliability tooling is a growing concern**: OpenTelemetry session lifecycle alignment ([#8616](https://github.com/QwenLM/qwen-code/pull/8616)), privacy-safe tool-result diagnostics ([#8786](https://github.com/QwenLM/qwen-code/pull/8786)), and fail-closed Autofix E2E proof ([#8928](https://github.com/QwenLM/qwen-code/pull/8928)).

## Developer Pain Points
- **Daemon session and memory handling remains fragile**: large restores can time out or lose the current session ([#8678](https://github.com/QwenLM/qwen-code/issues/8678)), ACP child memory is over-provisioned ([#8182](https://github.com/QwenLM/qwen-code/issues/8182)), and scheduled prompts can disappear from restored transcripts ([#8837](https://github.com/QwenLM/qwen-code/issues/8837)).
- **Platform-specific UI bugs keep appearing**: broken Windows file links ([#8644](https://github.com/QwenLM/qwen-code/issues/8644)), macOS iTerm flicker ([#8901](https://github.com/QwenLM/qwen-code/issues/8901)), and unwanted microphone permission warnings ([#8877](https://github.com/QwenLM/qwen-code/issues/8877)).
- **Headless/automation correctness is a recurring pain point**: API errors are reported as successful stream-json exits ([#8920](https://github.com/QwenLM/qwen-code/issues/8920)), and ACP child spawning can fail with an unknown `--acp` argument ([#8871](https://github.com/QwenLM/qwen-code/issues/8871)).
- **Configuration and update UX still frustrates users**: provider update prompts repeat when custom models are preserved ([#8504](https://github.com/QwenLM/qwen-code/issues/8504)), and documented settings such as `tools.truncateToolOutputThreshold` are ignored by Shell ([#8922](https://github.com/QwenLM/qwen-code/issues/8922)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-11

All recent activity is tracked in the **Hmbown/CodeWhale** repository.

## Today's Highlights

The last 24h focused on subagent safety and ACP capability: PR #5317 fixed the nested `max_depth` recursion budget bug (#5253), and PR #5225 made ACP `session/prompt` execute tools instead of merely streaming model text. On the architecture side, #5300 moved primary request preparation into `codewhale-core`, and issue #5316 opened as the umbrella EPIC for CodeWhale TUI crate decomposition. No new release was published in the last 24h.

## Hot Issues

Only 2 issues were updated in the last 24h; both are listed below.

- **[#5316 [OPEN] EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)**](https://github.com/Hmbown/CodeWhale/issues/5316)  
  Author: aboimpinto · Created 2026-08-10 · Updated 2026-08-11 · Comments: 2  
  This is the tracking EPIC for the CodeWhale TUI crate decomposition. It is the single reporting point for sub-EPICs, FEAT issues, and PRs related to breaking the TUI into smaller crates. Given recent PRs like #5300, this signals a deliberate modularization push to separate TUI concerns from core DTOs and request preparation.

- **[#5253 [CLOSED] bug(subagents): nested max_depth can widen the root session depth budget**](https://github.com/Hmbown/CodeWhale/issues/5253)  
  Author: cacdcaecawae · Created 2026-08-06 · Updated 2026-08-11 · Comments: 1  
  A nested subagent could supply an explicit `max_depth` and widen the absolute recursion budget inherited from the root session. The global ceiling is 8, but a host configured with a smaller budget was still vulnerable. The issue was quickly addressed by PR #5317.

## Key PR Progress

5 PRs were updated in the last 24h; all are listed below.

- **[#5317 [CLOSED] fix(subagents): cap nested max_depth by inherited budget](https://github.com/Hmbown/CodeWhale/pull/5317)**  
  Author: ousamabenyounes · Updated 2026-08-11  
  Fixes #5253 by applying `inherited.min(..)` in the explicit-`max_depth` arm of `child_max_spawn_depth_for_spawn`, matching the behavior already used for profile-hint depth values. Prevents nested subagents from exceeding the root session’s recursion budget.

- **[#5225 [CLOSED] feat(acp): expose file/search/git/patch/shell tools over session/prompt](https://github.com/Hmbown/CodeWhale/pull/5225)**  
  Author: rafaelcavalheri · Updated 2026-08-11  
  ACP `session/prompt` previously only streamed model text; tool calls requested by the model were never executed. This PR exposes filesystem, search, git, patch, and shell tools over ACP, enabling real code-editing workflows from editors like Zed and community adapters such as `acp-deepseek-adapter`.

- **[#5300 [CLOSED] refactor(core): own primary request preparation](https://github.com/Hmbown/CodeWhale/pull/5300)**  
  Author: Hmbown · Updated 2026-08-10  
  Replaces the unused synthetic `ChatRequest` scaffold in `codewhale-core` with the production `MessageRequest` DTO family previously owned by the TUI crate. Adds a pure `prepare_primary_turn_request` constructor and routes production TUI paths through core, supporting the crate-decomposition effort.

- **[#5315 [CLOSED] chore(release): ship v0.9.6](https://github.com/Hmbown/CodeWhale/pull/5315)**  
  Author: Hmbown · Updated 2026-08-10  
  Release-prep PR for v0.9.6. Described as a subtractive release: fewer runtime guards, one stable base prompt, truthful provider endings, and a smaller compaction path that preserves provider behavior. Release state is tracked in the private `codewhale-ops` release ledger.

- **[#5277 [OPEN] build(deps): bump docker/login-action from 4.5.2 to 4.6.0](https://github.com/Hmbown/CodeWhale/pull/5277)**  
  Author: dependabot[bot] · Updated 2026-08-11  
  Routine dependency bump for GitHub Actions. Includes hardened release notes from `docker/login-action`. CI hygiene with no expected behavior change.

## Feature Request Trends

No new user-facing feature-request issues were opened in the last 24h. The strongest directional signals from active issues and PRs are:

- **ACP tool execution parity** — The ACP protocol should support actual code-editing actions, not just chat completions (#5225).
- **Modular architecture / crate decomposition** — The TUI is being split into smaller crates, with shared DTOs and request preparation moving into `codewhale-core` (#5316, #5300).
- **Stricter subagent recursion controls** — Depth limits should be enforced from the root session, regardless of nested `max_depth` overrides (#5253, #5317).

## Developer Pain Points

- **Recursion budget confusion** — Nested subagents can accidentally or intentionally bypass inherited session depth limits unless every spawn path applies the inherited budget. This is subtle and easy to regress.
- **ACP adapters were effectively chat-only** — Integrations could drive the model over ACP but could not execute filesystem, git, or shell tools, limiting real agent workflows.
- **Dependency/CI maintenance overhead** — Automated dependency PRs (e.g., #5277) are necessary but create ongoing review noise.
- **Private release tracking** — Release state is managed in a private ledger, so public contributors may not have full visibility into the release process until a release-prep PR appears (#5315).

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*