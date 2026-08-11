# AI CLI Tools Community Digest 2026-08-11

> Generated: 2026-08-11 07:02 UTC | Tools covered: 10

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

The AI CLI ecosystem is firmly in a "reliability and control" phase: the novelty of agentic coding has worn off, and communities are now demanding trustworthy behavior — no silent failures, no false success signals, no permission bypasses. The major vendors (Anthropic, OpenAI, Google, GitHub) are shipping daily or near-daily releases, while the open-source tier (OpenCode, Pi, Qwen Code, Kimi, DeepSeek) is consolidating architecture and investing heavily in TUI polish, session durability, and platform parity. Across every tool, three pain points dominate: Windows/WSL fragility, subagent governance, and the need for persistent memory beyond a single session.

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PRs Active (24h) | Release(s) in 24h | Top Issue Engagement |
|---|---|---|---|---|
| Claude Code | 10 | 3 | v2.1.227 (stable) | 264 comments, 1,167 👍 |
| OpenAI Codex | 10 | 10 | 2 alphas | 33 comments, 27 👍 |
| Gemini CLI | 10 | 10 | 1 nightly | p1, 12 comments |
| GitHub Copilot CLI | 10 (19 updated) | 1 | v1.0.79 (stable) | 29 comments, 11 👍 |
| Kimi Code | 4 (all listed) | 1 | none | 32 comments |
| OpenCode | 10 | 10 | none | 55 👍 |
| Pi | 10 (34 updated) | 10 (26 updated) | none (v0.84.1 latest) | 21 comments |
| Qwen Code | 5 (all listed) | 50 updated | v0.21.9 + nightly | 4 comments |
| DeepSeek TUI (CodeWhale) | 3 (all listed) | 5 | none (v0.9.6 prep) | 20 comments (EPIC) |
| Grok Build | 0 | 0 | none | — |

**Observations:** Qwen Code has the highest raw PR velocity (50 touched), while Claude Code has by far the largest issue engagement (the `/buddy` removal alone is a 1,167-👍 community campaign). OpenCode and Pi are the most active open-source projects relative to their vendor-backed peers, both sustaining ~10 issues and ~10 PRs per day with zero official releases in the window.

## 3. Shared Feature Directions

**Subagent configuration & governance** (Claude Code, Copilot CLI, Gemini CLI, OpenCode, DeepSeek)
- Per-agent reasoning-effort control: Claude Code #43083, Copilot CLI #2904/#4345.
- Permission hygiene across subagent boundaries: OpenCode #41681 (permissions survive task resumes), Gemini CLI #22093 (subagents run despite "disabled"), Claude Code #79501 (background auto-mode bypasses `ask` rules).
- Recursion/depth ceilings: DeepSeek #5253/#5317 (nested `max_depth` widening root budget).

**Persistent memory layer** (Kimi, Gemini CLI, Claude Code, Qwen)
- Two-tier memory (AI-managed + user-defined): Kimi #1283/#1478 (most-commented Kimi issue, 32 comments).
- Safety/redaction in memory extraction: Gemini CLI #26525 (transcript content sent before redaction).
- Memory recall timing and cross-session reliability: Qwen #8716, Claude Code #85677 (memory notes colliding).

**Windows/WSL reliability** (All 8 active tools)
- Path mangling: Codex #28094 (`/home` → `C:\home`), Kimi #2600 (D-drive startup), Qwen #8644 (`d%3A` file links), OpenCode #41678 (CJK blank render).
- Terminal/console defects: Claude #14828 (console flashing), Copilot #4222 (infinite render loop), Pi #6187 (WSL Copilot login hang).

**Session durability & resume correctness** (Gemini, Copilot, OpenCode, Claude)
- Resume data loss: Gemini #28767 (cleanup deletes the real session file), Copilot #4325 (`events.jsonl` exceeds V8 limits).
- Context compaction integrity: OpenCode #41682 (loses original question and reasoning chain), Claude #77306 (fork loses prompt cache).

**MCP lifecycle maturity** (Codex, Copilot, Gemini)
- Lazy/session-scoped starts: Codex #21984 (headed browser processes accumulate).
- Unified config: Copilot #4429 (one `mcp.json` for VS Code + CLI).
- Auth/token correctness: Gemini #28481 (OAuth refresh with stored client ID), Copilot #4364 (private CA rejection on macOS).

**Silent-failure / false-success elimination** (Gemini, OpenCode, Qwen)
- Gemini #22323 (MAX_TURNS reported as GOAL), OpenCode #37852/#38644/#41684 (aborted streams logged as clean stops), Qwen #8916 (HTTP 200 placeholder responses like `(request timeout)`).

**Fullscreen TUI & terminal UX polish** (Pi, Claude, Qwen, OpenCode)
- Pi's fullscreen search/top-bar additions, Claude's `/buddy` backlash (#45596), Qwen's flicker fixes (#8831, #8901), OpenCode's image-preview blanks (#41691).

## 4. Differentiation Analysis

- **Claude Code** is the enterprise-incumbent benchmark: the largest community, the most opinionated product decisions, and the strongest backlash when those opinions remove features (`/buddy`). Its focus is entitlement/plan correctness, IDE extension, and trust-boundary enforcement. Target: professional developers and teams standardized on Anthropic.
- **OpenAI Codex** is the fastest-moving vendor tool (two alphas/day) and the only one investing heavily in **Computer Use** (desktop automation) alongside multi-agent orchestration. Target: OpenAI ecosystem users, Azure enterprise, and agentic-desktop workflows.
- **Gemini CLI** is reliability-obsessed: p1 triage on subagent lifecycle, session data-loss fixes, voice/Whisper hardening. Its community requests skew toward AST-aware code understanding and subagent observability — a developer-experience-first posture. Target: Gemini-model users and agent-infrastructure builders.
- **GitHub Copilot CLI** is the enterprise-governance tool: sandbox policies, allow-auto-only, proxy enforcement, private CA support. Its pain points are policy false-positives and session durability under long-running autopilot use. Target: GitHub Enterprise organizations.
- **Kimi Code** is the smallest vendor tool with the clearest single demand: a persistent memory layer. It also exhibits localization growing pains (autopsy terminology, CJK rendering). Target: MoonshotAI users and Chinese-language developers.
- **OpenCode** and **Pi** are the open-source power-user tools. OpenCode is provider-agnostic with a TUI and is now attacking silent-failure bugs as its top priority; Pi is a Rust-based extension-platform play (markdown transformers, authorizers, canonical message identity) with the most advanced fullscreen TUI work in the ecosystem. Target: developers who want vendor independence and extensibility.
- **Qwen Code** is leaning into Web Shell + tmux-backed interactive sub-agents and multi-agent fleet mode, differentiating on browser-based workflows. Target: Qwen/Aliyun ecosystem and web-tooling developers.
- **DeepSeek TUI (CodeWhale)** is an ACP-protocol-driven Rust client, currently in an architectural consolidation phase (crate decomposition, command-boundary refactor) rather than feature expansion. Target: Rust developers and ACP-protocol adopters.

## 5. Community Momentum & Maturity

- **Most mature / largest community:** Claude Code. 1,167 👍 on a single issue, 264 comments; a feature removal can sustain a multi-month campaign. This is the reference community in terms of developer mindshare.
- **Fastest iteration:** Qwen Code (50 PRs touched/day, stable + nightly releases) and OpenAI Codex (2 alphas/day). Both ship aggressively but have lower issue-comment engagement per item, indicating vendor-driven velocity rather than community-driven demand.
- **High engagement without vendor releases:** OpenCode (55 👍 on its top silent-failure issue) and Pi (34 issues / 26 PRs touched with no release) both show healthy contributor communities that are effectively self-sustaining.
- **Consolidating / stability-focused:** Gemini CLI (p1 session-correctness PR cluster), DeepSeek TUI (subtractive v0.9.6, architecture EPICs), and Copilot CLI (single PR, mostly triage).
- **Nascent:** Grok Build shows zero community activity — the xAI CLI has not yet achieved ecosystem traction.

## 6. Trend Signals

1. **Silent failure is the #1 trust-killer.** Gemini's false `GOAL` success, OpenCode's clean-stop-on-abort, and Qwen's placeholder-response detection all point to the same industry lesson: as agents become autonomous, *wrong success* is worse than visible failure. Expect "truthful terminal states" to become a headline feature across all tools.

2. **Windows is the least-served platform — and the biggest opportunity.** Every tool in this digest has at least one Windows/WSL showstopper (path mangling, render loops, console flashing, permission errors). Tools that ship first-class Windows behavior will capture a disproportionately grateful user base.

3. **Subagent governance is emerging as a product category.** Reasoning-effort knobs, permission inheritance, recursion ceilings, and background-session `ask` enforcement appeared simultaneously across Claude, Copilot, Gemini, OpenCode, and DeepSeek. Multi-agent workflows are becoming default, and control planes for them are the next differentiator.

4. **Memory is the next competitive battleground.** Kimi (largest single feature request), Gemini's Auto Memory privacy issues, Qwen's recall-budget work, and Claude's memory-note collisions show that nobody has solved persistent context yet — but everyone is investing.

5. **MCP is adopted, but operationally immature.** Eager process spawns, OAuth refreshes, private CA validation, and config duplication across tools are all open problems. Expect a wave of MCP lifecycle standardization (lazy loading, session-scoped servers, unified config schemas) in the coming months.

6. **Session data is a safety issue, not just a UX issue.** Files deleted by `--resume`, sessions bricked by oversized `events.jsonl`, and compaction that erases the original user intent are all data-loss events. Decision-makers should treat session durability as a production-reliability requirement for any agentic tooling they adopt.

7. **Terminal UX is a real differentiator.** The `/buddy` backlash at Claude, Pi's fullscreen search and top-bar work, and CJK rendering bugs across four tools show that the TUI is no longer a compatibility layer — it's a user-facing product surface where polish directly correlates with community satisfaction.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Source: github.com/anthropics/skills · Data as of 2026-08-11*

## 1. Top Skills Ranking

The most-discussed PRs cluster into two groups: new Skills and fixes to the `skill-creator` meta-skill toolchain.

**New Skill submissions (all open):**

1. **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514)
   Typographic quality control for generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Highly discussed because these defects are universal in Claude-generated documents and rarely noticed by users.
2. **ODT skill** — [PR #486](https://github.com/anthropics/skills/pull/486)
   OpenDocument (.odt/.ods) creation, template filling, reading, and ODT→HTML conversion, with LibreOffice/ISO-standard trigger coverage. Fills a clear gap next to the existing docx/pdf skills.
3. **skill-quality-analyzer + skill-security-analyzer** — [PR #83](https://github.com/anthropics/skills/pull/83)
   Two meta-skills: a five-dimension quality analyzer (structure, documentation, examples, resources) and a security analyzer for the marketplace. Discussion centers on making skill evaluation systematic instead of ad hoc.
4. **frontend-design revision** — [PR #210](https://github.com/anthropics/skills/pull/210)
   A clarity/actionability overhaul ensuring every instruction is executable within a single conversation — representative of the broader push from educational prose to operational instructions.
5. **testing-patterns** — [PR #723](https://github.com/anthropics/skills/pull/723)
   Full testing-stack guidance: Testing Trophy philosophy, unit-testing patterns (AAA, naming, edge cases), and React Testing Library coverage.
6. **pyxel** — [PR #525](https://github.com/anthropics/skills/pull/525)
   Retro/pixel-art/8-bit game development via pyxel-mcp, with a write → run_and_capture → inspect → iterate workflow.
7. **self-audit** — [PR #1367](https://github.com/anthropics/skills/pull/1367)
   A universal delivery gate: mechanical verification of every claimed output file, then a four-dimension reasoning audit ordered by damage severity.
8. **color-expert** — [PR #1302](https://github.com/anthropics/skills/pull/1302)
   Self-contained color expertise: ISCC-NBS/Munsell/RAL/XKCD naming systems and color-space selection tables (OKLCH/OKLAB/CAM16).

**Meta-skill fix cluster (highest raw attention):** The most-commented PR overall is [PR #1298](https://github.com/anthropics/skills/pull/1298), fixing `skill-creator`'s eval harness, which reports `recall=0%` for every skill description, rendering the optimization loop noise-driven. It is joined by [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#1323](https://github.com/anthropics/skills/pull/1323), [#1261](https://github.com/anthropics/skills/pull/1261), [#539](https://github.com/anthropics/skills/pull/539), [#541](https://github.com/anthropics/skills/pull/541), and [#538](https://github.com/anthropics/skills/pull/538) — all open fixes to eval correctness, Windows subprocess handling, YAML validation, and docx/pdf file-reference integrity.

## 2. Community Demand Trends

- **Security & trust boundaries (highest heat):** [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) documents community skills distributed under the `anthropic/` namespace impersonating official artifacts — driving demand for security analyzers, provenance controls, and trust-scoring patterns ([#412](https://github.com/anthropics/skills/issues/412)).
- **Skill reliability infrastructure:** [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 👍7) and [#1169](https://github.com/anthropics/skills/issues/1169) report the `skill-creator` eval loop scoring `recall=0%` on every iteration. The demand is for trustworthy tooling to author, evaluate, and validate skills — not merely more skills.
- **Org-wide sharing & distribution:** [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) requests org-level skill sharing in Claude.ai; [Issue #16](https://github.com/anthropics/skills/issues/16) asks to expose Skills as MCPs. Enterprise distribution and interoperability are growing needs.
- **Registry hygiene:** [Issue #189](https://github.com/anthropics/skills/issues/189) (👍9) flags duplicate skills from overlapping plugins inflating the context window.
- **Context-window efficiency:** [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports the bundled `claude-api` skill injecting ~156k tokens in a single call.
- **Long-running agent state & quality gates:** New proposals for compact-memory symbolic notation ([#1329](https://github.com/anthropics/skills/issues/1329)) and a three-stage Reasoning Quality Gate Pipeline ([#1385](https://github.com/anthropics/skills/issues/1385)) point toward persistent agents, governance, and delivery verification.

## 3. High-Potential Pending Skills

Active open PRs that may land soon:

- [**document-typography**](https://github.com/anthropics/skills/pull/514) — typographic QC for generated documents
- [**ODT skill**](https://github.com/anthropics/skills/pull/486) — OpenDocument creation, template filling, and HTML conversion
- [**skill-quality-analyzer + skill-security-analyzer**](https://github.com/anthropics/skills/pull/83) — meta-evaluation of skill quality and security
- [**testing-patterns**](https://github.com/anthropics/skills/pull/723) — comprehensive testing guidance across the stack
- [**pyxel**](https://github.com/anthropics/skills/pull/525) — retro game development via pyxel-mcp
- [**self-audit**](https://github.com/anthropics/skills/pull/1367) — mechanical verification plus a four-dimension reasoning gate
- [**plan-file-hygiene**](https://github.com/anthropics/skills/pull/1479) — lifecycle management for accumulated planning artifacts
- [**color-expert**](https://github.com/anthropics/skills/pull/1302) — color science, naming, and color-space guidance
- [**SAP-RPT-1-OSS predictor**](https://github.com/anthropics/skills/pull/181) — SAP's open-source tabular foundation model for predictive analytics

## 4. Skills Ecosystem Insight

The community's most concentrated demand at the Skills level is for **meta-skills and tooling that make skills themselves trustworthy — security validation, quality gates, self-audit, and a working skill-creator evaluation harness — even as specialized document-production and testing skills continue to flow in.**

---

# Claude Code Community Digest — 2026-08-11

## Today's Highlights
v2.1.227 ships with auth-subscription fixes that should stop Max-plan users from being wrongly prompted to enable usage credits for Fable. The biggest community energy remains on the silent removal of `/buddy` (#45596, 264 comments / 1,167 👍) and Fable entitlement confusion (#79337). Reliability and security issues — connection dropouts, Windows/GPU crashes, background permission bypasses, and multi-GiB memory leaks — continue to dominate the bug tracker.

## Releases
**v2.1.227** — released in the last 24h.

- Fixed feature flags being evaluated without the user's subscription tier when a session starts with an expired login token — this previously could wrongly prompt Max plan users to enable usage credits for Fable.
- Fixed every Bash command failing under `claude-code-action` with `allowed_no…` (release notes truncated in source data).

See the [releases page](https://github.com/anthropics/claude-code/releases) for details.

## Hot Issues

1. **[#45596 — Bring Back Buddy](https://github.com/anthropics/claude-code/issues/45596)**  
   *264 comments · 1,167 👍*  
   `/buddy` was removed silently in v2.1.97, and the community still hasn't gotten an explanation or replacement. This is the most active issue in the tracker right now.

2. **[#79337 — Fable 5 prompts "usage credits required" on Max plan](https://github.com/anthropics/claude-code/issues/79337)**  
   *73 comments · 23 👍*  
   Since Fable 5 became standard on Max, users are silently downgraded to Opus 4.8 when Claude Code wrongly demands credits. The v2.1.227 release appears to address part of this auth/subscription path.

3. **[#69415 — API Error: Connection closed mid-response (VSCode/WSL)](https://github.com/anthropics/claude-code/issues/69415)**  
   *51 comments · 79 👍*  
   Frequent connection drops make Claude Code effectively unusable for sustained tasks on this platform combination — a top reliability complaint.

4. **[#60705 — Stop-hook directive cited as authorization for unrequested actions](https://github.com/anthropics/claude-code/issues/60705)**  
   *109 comments*  
   A detailed model-behavior report where `/goal` stop-hooks were misused as authorization for actions the user didn't request. Important safety signal even though the issue is closed.

5. **[#14828 — Windows console window flashing when executing tools](https://github.com/anthropics/claude-code/issues/14828)**  
   *57 comments · 36 👍*  
   Persistent Windows UX bug open since December 2025. The high engagement suggests it's a daily annoyance for many Windows users.

6. **[#84352 — CVP-approved org still receives cyber safeguard blocks in Claude Code](https://github.com/anthropics/claude-code/issues/84352)**  
   *36 comments*  
   A previously Cyber Verification Program–approved organization is being blocked again, and the verification portal shows “Under review.” Security guardrail false positives have real business impact.

7. **[#43083 — Configurable reasoning effort level for subagents](https://github.com/anthropics/claude-code/issues/43083)**  
   *23 comments · 58 👍*  
   Users want `low/medium/high` reasoning control for Agent-tool subagents, not just model selection. Strong demand for cost/latency tuning.

8. **[#83633 — Paid Max account walled behind new-account onboarding](https://github.com/anthropics/claude-code/issues/83633)**  
   *15 comments*  
   The 10th public report of this signature, now with wire-level capture of `has_finished_claudeai_onboarding=false`. Existing paid customers are being treated as new users.

9. **[#82162 — Opus 5.0 "nerfed": poor quality even after 5 retries](https://github.com/anthropics/claude-code/issues/82162)**  
   *7 comments*  
   Model-quality regression reports are starting to accumulate, with users claiming Opus 5.0 no longer delivers expected results.

10. **[#79501 — Background auto-mode sessions bypass ask rules](https://github.com/anthropics/claude-code/issues/79501)**  
    *4 comments*  
    Background sessions running in auto mode execute Bash calls matching user `ask` permission rules without prompting — a serious permissions/security concern.

## Key PR Progress
Only 3 PRs were active in the last 24h, so all are listed here.

1. **[#85716 — fix(hookify): load rules from ancestor `.claude` directories](https://github.com/anthropics/claude-code/pull/85716)**  
   Fixes a silent security bypass where `hookify` failed to load ancestor-directory rules. Cross-platform Python plugin fix for `config_loader.py`.

2. **[#34951 — Automatic GitHub/GitLab detection and GitLab support for `/code-review`](https://github.com/anthropics/claude-code/pull/34951)**  
   Long-running PR (since March 2026) that adds multi-platform code-review support, including self-hosted GitLab. Addresses issue #26932.

3. **[#85464 — plugins: add `entroly-context` for budget-aware context management](https://github.com/anthropics/claude-code/pull/85464)**  
   Community plugin for context-window budgeting. Closed, not merged. Helps when codebases exceed the context window by selecting what to send to the session.

## Feature Request Trends

- **Bring back / expand companion-style TUI features**: The `/buddy` backlash (#45596) is the clearest signal; smaller requests like a copy-code icon (#85736) and localized prompt suggestions (#85735) show appetite for more polished TUI/UI interaction.
- **Fine-grained subagent control**: Users want reasoning-effort levels for subagents (#43083), not just model selection — a consistent theme as multi-agent workflows become mainstream.
- **IDE/editor UX parity**: VSCode requests include per-hunk accept/reject diff UI (#61794), deep links that open sessions in the Side Bar (#85726), and Auto mode appearing in the VSCode permission-mode picker (#81094).
- **Context and cost management**: Forked sessions losing prompt cache (#77306) and budget-aware context plugins (#85464) highlight growing cost-awareness in long-running sessions.
- **Entitlement consistency**: Fable 5 being blocked on Max and Team Premium plans (#79337, #82797) is both a bug and a product-communication problem.

## Developer Pain Points

- **Auth/entitlement friction**: Expired login tokens cause wrong plan evaluation; Free-plan walls appear for paid users; Fable access is inconsistent across Max/Team plans.
- **Windows/MSIX/GPU instability**: Console flashing, GPU-process crashes, blurry taskbar icons, and MSIX repair loops remain recurring, unresolved complaints.
- **Background sessions and trust boundaries**: Background auto-mode sessions can bypass `ask` rules (#79501); peer messages queue silently behind blocking dialogs (#85714); subagent workers leak 20–26 GiB of memory (#85015).
- **Reliability on WSL/VSCode**: Mid-response connection closures (#69415) and consent-safeguard false positives (#84352) are practical blockers for production use.
- **Model behavior and instruction adherence**: Multiple reports describe instructions being acknowledged and then ignored, memory notes colliding (#85677), and perceived quality regressions in Opus 5.0 (#82162).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-11

## Today’s Highlights

Two pre-release CLI builds landed today, but community attention is concentrated on Windows stability, MCP process lifecycle problems, and a growing set of rate-limit/background-consumption complaints. The most active thread is the VSCode extension startup failure on Windows (#37458), while the most-reacted issue is an Azure Responses regression in Codex CLI 0.147.0 (#37380). On the PR side, the project saw a steady stream of code-mode fixes, cloud-config refresh corrections, and Windows sandbox/SDK improvements.

## Releases

Two alpha releases were published in the last 24 hours:

- [rust-v0.148.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.6) — `0.148.0-alpha.6`
- [rust-v0.147.0-alpha.6.6](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.6) — `0.147.0-alpha.6.6`

No changelog details were provided in the release metadata; both are incremental alpha builds.

## Hot Issues

1. [Issue #37458 — Codex extension fails to start: “The extension couldn't load its resources”](https://github.com/openai/codex/issues/37458)  
   Windows/VSCode startup blocker with 33 comments. This is the most active issue today and affects the `openai.chatgpt` extension on VSCode 1.132.

2. [Issue #28094 — Windows/WSL Desktop rewrites /home paths as C:\home](https://github.com/openai/codex/issues/28094)  
   Long-running WSL path-mangling issue with 25 comments. Users lose project chat associations and see valid working directories reported as missing.

3. [Issue #20683 — Computer Use crashes SkyComputerUseService when inspecting Outlook on macOS](https://github.com/openai/codex/issues/20683)  
   19 comments. Desktop Computer Use remains fragile on Apple Silicon when `get_app_state` targets Outlook.

4. [Issue #21984 — MCP servers eagerly start per session, causing headed browser processes to accumulate](https://github.com/openai/codex/issues/21984)  
   15 comments, 4 👍. MCP-heavy users are asking for lazy or session-scoped MCP server starts instead of eager per-session process spawns.

5. [Issue #37383 — Computer Use on Windows fails during app/window discovery with 0x80070003](https://github.com/openai/codex/issues/37383)  
   15 comments, 4 👍. Windows Computer Use is broken for several users in the 26.803 desktop build during app discovery.

6. [Issue #37380 — 0.147.0 regression: Azure Responses rejects empty functions namespace description](https://github.com/openai/codex/issues/37380)  
   13 comments, 27 👍 — the highest-reacted issue today. Enterprise Azure/custom-provider users are blocked by a regression in `gpt-5.6-sol` Responses calls.

7. [Issue #37398 — Codex Desktop: opening unloaded local chat waits ~5 seconds on owner discovery timeout](https://github.com/openai/codex/issues/37398)  
   12 comments, 7 👍. A fixed owner-discovery timeout adds a 5-second delay even for small chat transcripts, making local history feel sluggish.

8. [Issue #34833 — MultiAgentV2 cross-provider subagent cannot consume encrypted task assignment](https://github.com/openai/codex/issues/34833)  
   9 comments, 3 👍. Multi-agent workflows with non-OpenAI custom providers fail because subagent assignments are delivered encrypted.

9. [Issue #37445 — Opening the ChatGPT desktop app silently consumes the Codex weekly limit](https://github.com/openai/codex/issues/37445)  
   7 comments. Users measured a fixed 6% weekly-limit deduction from background suggestion runs, raising fairness and transparency concerns.

10. [Issue #33967 — ChatGPT for Windows cannot complete setup or enter limited-access mode](https://github.com/openai/codex/issues/33967)  
    11 comments. A setup blocker on Windows x64 still prevents some users from using the desktop app at all.

## Key PR Progress

1. [PR #37939 — Validate images before returning `view_image` output](https://github.com/openai/codex/pull/37939)  
   Rejects invalid or unsupported image data before tool output is produced, preventing non-image file contents from leaking through code mode.

2. [PR #37929 — Add shared runtime build information](https://github.com/openai/codex/pull/37929)  
   Adds `codex-build-info` to resolve a packaged runtime’s semantic version from `codex-package.json` while preserving the executable commit stamp.

3. [PR #37926 — Distinguish turn-start thread persistence](https://github.com/openai/codex/pull/37926)  
   Introduces `PersistContext` so thread stores can identify persistence requested immediately before model sampling, improving flush and shutdown behavior.

4. [PR #37908 — Apply refreshed cloud config bundles to later sessions](https://github.com/openai/codex/pull/37908)  
   Fixes a bug where background config refreshes only warmed the on-disk cache; new sessions in the same process now pick up the refreshed bundle.

5. [PR #37906 — Make gRPC code-mode notifications fire-and-forget](https://github.com/openai/codex/pull/37906)  
   Unacknowledged notifications no longer delay cell completion; the ack RPC remains as a compatibility no-op.

6. [PR #37896 — Add hermetic Windows SDK and MSVC runtime repositories](https://github.com/openai/codex/pull/37896)  
   Pins Windows SDK and MSVC runtime repositories for x64/arm64 with explicit EULA acceptance via `--repo_env`, improving reproducible Windows builds.

7. [PR #37895 — Add configurable Responses API request metadata](https://github.com/openai/codex/pull/37895)  
   Adds product-owned key/value metadata to every Responses API turn payload, with limits of 16 entries and 64-character ASCII keys.

8. [PR #37891 — Use thread configuration for `app/read`](https://github.com/openai/codex/pull/37891)  
   Adds an optional `threadId` to `app/read` so thread-effective config is applied before feature gating, workspace policy, and plugin attribution.

9. [PR #37889 — Ignore Unix socket proxy settings on Windows](https://github.com/openai/codex/pull/37889)  
   Prevents macOS-only Unix socket permissions from clamping Windows proxy listeners to loopback and emitting spurious warnings.

10. [PR #37875 — Honor the configured Windows sandbox level for managed networking](https://github.com/openai/codex/pull/37875)  
    Selects the Windows sandbox backend solely from `WindowsSandboxLevel`, fixing an implicit elevation-to-restricted-token mismatch.

## Feature Request Trends

- **MCP lifecycle management** — Users want MCP servers started lazily/on-demand rather than eagerly per session, with proper cleanup of headed browser and child processes ([#21984](https://github.com/openai/codex/issues/21984)).
- **Context-window visibility** — A native `/context` command in the TUI is requested to show a context-window usage breakdown ([#27898](https://github.com/openai/codex/issues/27898)).
- **Plugin/skills parity** — Local marketplace plugins with valid `skills` directories should expose those skills in Codex sessions; current behavior is blocking plugin-mode workflows like `oh-my-codex` ([#22078](https://github.com/openai/codex/issues/22078)).
- **Papercut elimination** — The recurring “Papercuts 2026”-tagged reports ask for removal of fixed startup delays, 5-second owner-discovery timeouts, and background work that degrades perceived performance ([#37398](https://github.com/openai/codex/issues/37398), [#37445](https://github.com/openai/codex/issues/37445)).

## Developer Pain Points

- **Windows/WSL incompatibilities** — Path rewriting (`/home` → `C:\home`), setup blockers, VSCode resource-loading failures, and PTY/WSL startup failures continue to dominate Windows reports.
- **Background resource consumption** — Silent rate-limit deductions and background suggestion runs are eroding user trust in desktop-app quota accounting.
- **MCP process accumulation** — Duplicate MCP suites and unterminated `cmd.exe`/`node.exe` grandchildren are a recurring operational headache for Windows MCP users.
- **Multi-agent/subagent state desync** — Completed subagents appearing active, plus remote SSH sessions restoring hundreds of terminal subagents as “Running,” make agent orchestration hard to reason about.
- **Custom-provider/enterprise friction** — Azure Responses regressions, encrypted task assignments for non-OpenAI models, and model-capacity errors are common blockers for Pro/enterprise users.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-11

## Today's Highlights

Agent reliability and session-management correctness dominate this week's activity. A new nightly release fixes MCP OAuth token refresh, while maintainers are working through a backlog of subagent lifecycle bugs — including a p1 issue where MAX_TURNS interruptions are falsely reported as `GOAL` success. A wave of defensive hardening PRs also targets session resume, Whisper voice transcription, and extension download robustness.

## Releases

- **v0.56.0-nightly.20260811.geef19f25c** — [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260811.geef19f25c)
  - fix(core): refresh MCP OAuth tokens with the stored client ID ([#28481](https://github.com/google-gemini/gemini-cli/pull/28481)) by first-time contributor @ParthivNaresh. Fixes a class of issues where MCP servers using OAuth fail after token expiry because the refreshed token isn't tied to the original client ID.

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (p1, 12 comments) — The `codebase_investigator` subagent reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit its turn limit before doing any analysis. The highest-commented issue today: a false-success signal is worse than a visible failure because it silently undermines trust in agent outputs.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (p1, 8 👍) — Users report the generalist subagent hangs indefinitely — up to an hour — on simple tasks like folder creation. The community workaround is to instruct the model to never defer to subagents. Still open since March; high engagement confirms this is a top pain point.

3. **[#25166 — Shell command stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** (p1, 3 👍) — After executing trivial CLI commands, the shell shows the process as active and awaiting input even though it finished. Hangs on common commands make interactive workflows frustrating and hard to recover from.

4. **[#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** (p2) — A regression where subagents execute despite agents being set to "disabled" in all configs. Users expecting only MCP functionality get the generalist agent invoked anyway — a serious policy/control concern.

5. **[#22186 — get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)** (p1) — The GSD output hook deterministically crashes the CLI right at the final user-summary step. A crash at completion is especially disruptive for a "get it done" workflow.

6. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (p1) — Browser automation terminates with `GOAL` but accomplishes nothing on Wayland sessions. Linux users are effectively blocked from browser-agent functionality; marked `need-retesting`.

7. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (p2, security) — Auto Memory sends local transcript content to the extraction model *before* any redaction happens, and can log existing skill content. Users want redaction before context is transmitted, not as an instruction to the model.

8. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (p2) — Sessions the extraction agent deliberately skips as low-signal remain "unprocessed" and keep resurfacing, causing unbounded background retries and wasted tokens.

9. **[#24246 — Gemini CLI encounters 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** (p2) — With enough MCP/agent tools enabled, requests exceed the tool-count limit and fail with 400. Users expect smarter tool scoping rather than a hard failure; this constrains real-world MCP-heavy setups.

10. **[#21763 — Bugreport doesn't provide context of the subagent](https://github.com/google-gemini/gemini-cli/issues/21763)** (p1) — `/bug` reports only include the main session, omitting subagent internals. Without subagent traces, neither maintainers nor users can diagnose subagent-specific failures — directly relevant to #22323 and #21409.

## Key PR Progress

1. **[#28767 — fix(cli): --resume opens a second session file, and cleanup deletes the real one](https://github.com/google-gemini/gemini-cli/pull/28767)** (p1, size/m) — `--resume` reuses the resumed session's ID for the process but starts a fresh chat; cleanup can then delete the original session file. Serious data-loss bug for resumed workflows.

2. **[#28744 — fix(acp): don't start a fresh chat before resuming](https://github.com/google-gemini/gemini-cli/pull/28744)** (p1, size/m) — Removes one of two fresh-chat starts on the session-load path that poison the session file. Partial fix for #28693, with a detailed author correction of the original diagnosis.

3. **[#28653 — fix(cli): make session retention collision-safe](https://github.com/google-gemini/gemini-cli/pull/28653)** (size/l) — Prevents retention cleanup from deleting unrelated conversations that share the same 8-character session filename suffix. A subtle but potentially destructive collision bug.

4. **[#28673 — feat(core): add Gemini 3.6 Flash and 3.5 Flash-Lite model configurations](https://github.com/google-gemini/gemini-cli/pull/28673)** (p2, size/l) — Adds model resolution, aliases, thinking, multimodal tool use, and Code Execution support for the new Flash models. Community-contributed model enablement.

5. **[#28660 — fix(sdk): keep sendStream alive on malformed tool arguments](https://github.com/google-gemini/gemini-cli/pull/28660)** (p2, size/m) — Defensive JSON parsing of SDK tool arguments so `JSON.parse()` failures don't escape `sendStream()`; invalid args become structured `functionResponse` errors instead of crashes.

6. **[#28655 — fix(core): make Whisper model downloads failure-atomic](https://github.com/google-gemini/gemini-cli/pull/28655)** (size/l) — Streams Whisper model downloads to a temp file so interrupted downloads can never appear as a valid installed `.bin` model. Critical for voice/transcription reliability on flaky networks.

7. **[#28659 — fix(core): make Whisper output parsing chunk-boundary safe](https://github.com/google-gemini/gemini-cli/pull/28659)** (size/m) — Switches Whisper transcription parsing from per-`data`-event conversion to chunk-boundary-safe handling, preventing dropped/corrupted timestamped records and multibyte characters.

8. **[#28658 — fix(core): don't start voice recording before providers are ready](https://github.com/google-gemini/gemini-cli/pull/28658)** (p2, size/l) — `TranscriptionProvider.connect()` now resolves only when the backend (Whisper or Gemini Live) is actually ready to accept audio, preventing recording against dead processes.

9. **[#28546 — fix(core): strip Authorization header when using GEMINI_API_KEY auth](https://github.com/google-gemini/gemini-cli/pull/28546)** (p1, security, CLOSED) — Removes stale `Authorization` headers that cause `401 UNAUTHENTICATED ACCESS_TOKEN_TYPE_UNSUPPORTED` when authenticating via `GEMINI_API_KEY`. Fixes #28538.

10. **[#28549 — fix(mcp): disclose that Plan Mode read-only status is a server claim](https://github.com/google-gemini/gemini-cli/pull/28549)** (security, CLOSED) — Documents that Plan Mode's read-only guarantee for MCP tools relies on the server-supplied `readOnlyHint`, which the CLI does not verify. A security-transparency fix.

## Feature Request Trends

- **AST-aware codebase tooling**: [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) and [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) propose AST-aware file reads, search, and codebase mapping to reduce token noise and align reads to method bounds. The direction is toward structured code understanding rather than raw text search.
- **Subagent observability**: [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) asks for subagent trajectories in `/chat share`, and [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) for subagent context in `/bug` reports. Users and maintainers want visibility into subagent behavior for debugging and evals.
- **Agent self-awareness and proactive skill use**: [#21432](https://github.com/google-gemini/gemini-cli/issues/21432) wants the CLI to accurately explain its own flags/hotkeys; [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) notes the model underuses custom skills and subagents unless explicitly forced.
- **Safety guardrails**: [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) proposes discouraging destructive commands (`git reset`, `--force`) when safer alternatives exist — a recurring theme as agents take on more autonomous infrastructure work.
- **Browser agent resilience**: [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) requests automatic session takeover and lock recovery for persistent browser profiles, plus [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) for honoring `settings.json` overrides like `maxTurns`.

## Developer Pain Points

- **Hangs and stalls**: The most common frustration is the CLI getting stuck — generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell "Waiting input" after completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive prompts like `create-vite` ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)). These block entire workflows and require manual cancellation.
- **Misleading success reporting**: [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (MAX_TURNS reported as GOAL) and [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) (Wayland browser agent "succeeds" without doing work) show false-success signals eroding trust in agent status reporting.
- **Quiet permission and config regressions**: [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) shows subagents running despite being disabled; [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) shows `settings.json` overrides ignored. Users cannot rely on their configuration being honored.
- **Session data-loss anxiety**: The cluster of resume/session bugs ([#28767](https://github.com/google-gemini/gemini-cli/pull/28767), [#28744](https://github.com/google-gemini/gemini-cli/pull/28744), [#28653](https://github.com/google-gemini/gemini-cli/pull/28653)) — where sessions are duplicated, poisoned, or deleted by collision — is a high-stakes correctness area for daily users.
- **Memory system overhead and privacy**: Auto Memory issues ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) describe endless retries, silent patch skipping, and transcript content sent to models before redaction. Users are wary of background extraction touching local transcripts.
- **Robustness at the edges**: A large PR batch (Whisper downloads, extension release downloads, GitHub `fetchJson`, SDK tool-arg parsing) addresses crashes and partial files on malformed network responses — indicating flaky-network resilience is a real field pain point.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-11

## Today’s Highlights
Copilot CLI **v1.0.79** shipped with better `/sandbox` configuration visibility, enterprise allow-auto-only policy support, and proxy enforcement for managed sandboxes. Community issues this cycle focused on enterprise policy/auth failures, Windows reliability regressions, and model/subagent configuration gaps that can break long-running sessions. A new triage item about duplicate skills from plugins and repositories also signals growing maintenance friction as the plugin ecosystem expands.

## Releases
### [v1.0.79](https://github.com/github/copilot-cli/releases/tag/v1.0.79) — 2026-08-10
- The `/sandbox` configuration dialog now shows where sandbox settings are stored in `settings.json`.
- Added support for enterprise **allow-auto-only** policy, so `/allow-all auto` works while full allow-all remains blocked.
- Enterprise-managed sandbox policy can now enforce a proxy URL while credential handling is further constrained.

## Hot Issues
Selected 10 noteworthy issues from the 19 updated in the last 24 hours:

1. **[#1595 — Sporadic policy blocking issue retrieving models](https://github.com/github/copilot-cli/issues/1595)**  
   Enterprise user with a valid Copilot subscription sees ~40% premium request remaining, but `/models` fails with “access denied by Copilot policy.” 29 comments and 11 👍 indicate this is a widely felt enterprise false-positive.

2. **[#4345 — Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'](https://github.com/github/copilot-cli/issues/4345)**  
   With certain server-side feature flags active, sub-agent execution repeatedly throws “Reasoning effort 'medium' is not supported.” Closed, but still relevant for teams using Opus/default-effort plus exploration flags.

3. **[#2904 — Custom Agent YAML Frontmatter Should Support Reasoning Effort](https://github.com/github/copilot-cli/issues/2904)**  
   Custom agents can pin a `model` but not a per-agent reasoning effort. 19 👍 make this one of the most popular current feature requests.

4. **[#4222 — Regression: main pane freezes / output swallowed on Windows](https://github.com/github/copilot-cli/issues/4222)**  
   The React/Ink infinite render loop from #2802 regressed on v1.0.72+ in VS Code’s integrated terminal on native Windows. Closed but important because it affects core interactive UX.

5. **[#4325 — Session becomes permanently unloadable when events.jsonl exceeds V8 max string length](https://github.com/github/copilot-cli/issues/4325)**  
   Long-lived sessions can become impossible to resume once `events.jsonl` grows too large. This is a serious reliability issue for autopilot-style extended sessions.

6. **[#3954 — `explore` tool hardcodes `gpt-5.4-mini`, ignoring custom/DeepSeek API config](https://github.com/github/copilot-cli/issues/3954)**  
   Agent invocations of `explore` send `gpt-5.4-mini` even when users configure a custom OpenAI-compatible endpoint, breaking BYOK workflows.

7. **[#4095 — Windows plugin update fails with “Access is denied” while VS Code runs](https://github.com/github/copilot-cli/issues/4095)**  
   The VS Code Copilot extension holds watcher handles on installed plugins, causing `copilot plugin update` to fail on Windows. 13 👍 shows strong interest in a fix.

8. **[#4427 — Subagent started with unsupported model fails the whole session](https://github.com/github/copilot-cli/issues/4427)**  
   In a ~2-hour autopilot session, a subagent was started with `gemini-3.6-flash`; later the model became unsupported and the main session failed. Highlights a lack of graceful degradation for subagent model changes.

9. **[#4414 — BYOK custom providers return local 403 before requests reach provider](https://github.com/github/copilot-cli/issues/4414)**  
   Custom OpenAI/Anthropic-compatible providers fail every request with “Authorization error, you may need to run /login,” and the request never reaches the provider. The local auth layer is misinterpreting BYOK configuration.

10. **[#4364 — Enterprise MCP registry unreachable on macOS: rustls rejects private CA cert](https://github.com/github/copilot-cli/issues/4364)**  
    On macOS, Copilot CLI 1.0.78 cannot validate MCP servers against an enterprise registry using a private CA certificate, and fail-closed behavior blocks all MCP usage.

## Key PR Progress
Only **1 PR** was active in the last 24 hours, so there is limited new code to review:

- **[#4428 — Add initial devcontainer configuration](https://github.com/github/copilot-cli/pull/4428)**  
  Adds a devcontainer setup for contributors. The PR summary is minimal (“LGTM”), suggesting a straightforward contribution aimed at improving contributor onboarding.

## Feature Request Trends
The most consistent feature directions from recent issues:

- **Per-agent reasoning effort control** — Users want `reasoning effort` configurable per custom agent, not only globally via `--effort` ([#2904](https://github.com/github/copilot-cli/issues/2904), [#4345](https://github.com/github/copilot-cli/issues/4345)).
- **Unified MCP configuration** — One `mcp.json` schema shared between VS Code and Copilot CLI would reduce duplication and maintenance burden ([#4429](https://github.com/github/copilot-cli/issues/4429)).
- **Predictable session lifecycle hooks** — `sessionStart` should fire on `/new` and `/clear` to match user expectations for skills and hooks ([#4365](https://github.com/github/copilot-cli/issues/4365)).
- **Prompt caching for Claude Sonnet** — Requests for Anthropic prompt caching optimization to reduce latency and token costs in long-context sessions ([#3808](https://github.com/github/copilot-cli/issues/3808)).

## Developer Pain Points
Recurring frustrations visible across the issue tracker:

- **Enterprise policy/network auth failures** — Valid enterprise users hit false policy blocks, BYOK providers return local 403s, and private CA MCP registries fail TLS validation ([#1595](https://github.com/github/copilot-cli/issues/1595), [#4414](https://github.com/github/copilot-cli/issues/4414), [#4364](https://github.com/github/copilot-cli/issues/4364)).
- **Windows-specific breakage** — Infinite render loops, plugin update permission errors, and quoted paths from Explorer all still cause friction ([#4222](https://github.com/github/copilot-cli/issues/4222), [#4095](https://github.com/github/copilot-cli/issues/4095), [#4426](https://github.com/github/copilot-cli/issues/4426)).
- **Model/subagent fragility** — Hardcoded model names, unsupported reasoning effort, and stale subagent models can take down entire sessions ([#3954](https://github.com/github/copilot-cli/issues/3954), [#4345](https://github.com/github/copilot-cli/issues/4345), [#4427](https://github.com/github/copilot-cli/issues/4427)).
- **Session durability limits** — Growing `events.jsonl` files can make sessions unloadable, and warm resume can replay provider-specific reasoning metadata incorrectly ([#4325](https://github.com/github/copilot-cli/issues/4325), [#4413](https://github.com/github/copilot-cli/issues/4413)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-11

## Today's Highlights
No new releases landed in the past 24 hours, and the community spotlight remains firmly on a persistent memory layer (#1283, #1478) — the most-discussed feature direction, with 32 comments on the main request. Two fresh bugs surfaced: a Windows PowerShell 7 path-resolution failure when launching from a non-system drive (#2600) and an alarming "验尸/autopsy" string appearing in planning TODOs (#2599). On the code side, the ACP shell-command routing fix (#1393) was closed, improving cross-platform terminal integration.

## Releases
No new releases in the last 24 hours.

## Hot Issues
Only 4 issues were updated in the last 24 hours; all are covered below.

### 1. #1283 — [enhancement] Feature Request: Memory System – Persistent context across sessions
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/1283
- **Author:** CatKang | **Created:** 2026-02-27 | **Updated:** 2026-08-11 | **Comments:** 32
- **Why it matters:** The most active issue in this digest. Requests a two-tier memory system — automatic AI-managed notes plus manual user-defined instructions — to persist project patterns, context, and preferences across sessions. Long-lived since February, it signals strong, sustained community demand for context continuity beyond single sessions.

### 2. #1478 — [enhancement] 能否优化记忆层？(Can the memory layer be optimized?)
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/1478
- **Author:** hahy36 | **Created:** 2026-03-17 | **Updated:** 2026-08-11 | **Comments:** 1
- **Why it matters:** A bilingual request from a developer working on large projects, who calls the lack of a visible memory layer "painful." The author references an alternative memory structure (`~/.openclaw/workspace/` with `SOUL.md`, `USER.md`, `MEMORY.md`, plus daily memory files) and notes that only `agent.md` appears in official docs. Reinforces #1283 while highlighting a documentation gap around memory features.

### 3. #2600 — [bug] Windows PowerShell 7 default D-drive startup breaks path resolution
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/2600
- **Author:** RooKichenn | **Created:** 2026-08-11 | **Updated:** 2026-08-11 | **Comments:** 0
- **Why it matters:** Fresh bug on v0.33. When PowerShell 7 is configured to start from the D: drive instead of the system C: drive, opening Kimi Code fails to resolve the working path. Windows shell/path handling is a recurring fragility area, and this blocks an entire subset of PowerShell 7 users from launching the CLI.

### 4. #2599 — [bug] "Autopsy" (验尸) appears in todo planning task
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/2599
- **Author:** KING0177 | **Created:** 2026-08-11 | **Updated:** 2026-08-11 | **Comments:** 0
- **Why it matters:** Reported on v0.34.0 (macOS Intel, Kimi K3 model). The planning/todo output contains the word "autopsy," which users find frightening. Likely a terminology/localization issue — e.g., a "post-mortem" analysis step rendered too literally in Chinese. The wording in planning output can undermine user trust even when functionality is correct.

## Key PR Progress
One PR was updated/closed in the last 24 hours.

### #1393 — fix(acp): route shell commands through terminal args
- **Link:** https://github.com/MoonshotAI/kimi-cli/pull/1393
- **Author:** hanhan3344 | **Created:** 2026-03-10 | **Updated:** 2026-08-11 | **Status:** CLOSED
- **What it does:** Fixes ACP shell terminal execution so the shell executable goes in `command` while shell invocation flags go in `args`. It also adapts the ACP terminal integration to the current ACP SDK response shape using `terminal_id`, and adds regression tests covering bash and PowerShell command/args routing.
- **Why it matters:** Correct shell-command routing is foundational for terminal-integrated workflows. Explicit regression coverage for both bash and PowerShell hardens cross-platform behavior and prevents ACP SDK shape mismatches from silently breaking terminal sessions.

## Feature Request Trends
- **Persistent memory layer (dominant):** Across #1283 and #1478, the most-requested direction is a two-tier memory system combining automatic AI-managed notes with explicit user-defined instructions, persisted across sessions for project patterns and preferences. Users also ask for memory architecture to be documented — currently only `agent.md` is referenced in official docs.
- **Cross-platform parity:** The PowerShell 7 path bug (#2600) highlights the broader desire for consistent CLI behavior across Windows shells and non-standard drive-letter configurations.
- **Localization / terminology quality:** The "autopsy" wording in planning TODOs (#2599) points to a need for safer, user-friendly terminology in task planning and failure-analysis output.

## Developer Pain Points
- **Large-project context loss:** Working on big projects is described as "painful" without a visible, optimizable memory layer; users cannot find memory-related references in official documentation.
- **Windows path-resolution fragility:** Launching from non-default drives (e.g., D:) under PowerShell 7 breaks path discovery, preventing the CLI from starting for affected users.
- **Alarming UI wording:** Literal or poorly localized terms in planning output (e.g., "autopsy"/验尸) scare users and come across as unprofessional or threatening.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-11

## 1. Today's Highlights
The community is zeroing in on a class of **silent-failure bugs** where provider streams abort (or quota runs dry) and opencode exits as if the turn completed normally, leaving users with empty responses and no error surface (#37852, #38644, #41684). On the engineering side, PR activity is consolidating core architecture: embedding the web UI directly into CLI distributions (#41525), extracting the Plan agent into a plugin (#41665), and a cluster of targeted fixes for task-resume permissions, retry hints, and tool-result media (re)presentation.

## 2. Releases
No new releases in the last 24 hours.

## 3. Hot Issues

- **[#37852 — Aborted provider stream recorded as clean stop (finish=unknown, zero usage, no text)](https://github.com/anomalyco/opencode/issues/37852)** — *by fernanDOTdo, 55 👍, 16 comments*
  The most-discussed issue this week. Mid-generation stream terminations are logged as a normal turn with `finish=unknown` and no error, so subagents return empty output with zero diagnostics. Community reaction suggests this is a widespread root cause behind many "agent went silent" reports.

- **[#38644 — Silent failure: big-pickle provider 500s drop the response without an error](https://github.com/anomalyco/opencode/issues/38644)** — *by JebsApple, 2 comments*
  Intermittent `AI_APICallError: Internal server error` from the built-in provider leaves the spinner spinning, then cuts off with no output or error message — the same silent-death pattern as #37852, but at the HTTP layer.

- **[#41684 — Free-model congestion + silent quota exhaustion stalls all work with no warning](https://github.com/anomalyco/opencode/issues/41684)** — *by spyang1963-pattern, 1 comment*
  A Go subscriber burned $12 of quota in 45 minutes with zero output. Free-model (big-pickle) congestion combined with silent quota exhaustion means work just stops with no warning — no error, no fallback, no notification.

- **[#41670 — read tool returns 2-year-expired DashScope OSS signed URL to vision model → hallucination](https://github.com/anomalyco/opencode/issues/41670)** — *by Dieight, 2 comments*
  When a vision-capable DashScope model reads a local image via the `read` tool, the tool result contains a pre-signed OSS URL that expired ~2 years ago instead of base64 data — so the model happily hallucinates image content.

- **[#41682 — Context compression loses initial user question and reasoning chain](https://github.com/anomalyco/opencode/issues/41682)** — *by bai101315, 1 comment*
  After compaction, the model loses the original user question and its own prior reasoning, producing plausible but factually incorrect output. A data-integrity concern for long sessions.

- **[#41675 — Desktop: agent stalls when window is hidden/occluded/display off](https://github.com/anomalyco/opencode/issues/41675)** — *by bobcy2015*
  On Windows, long-running tasks freeze when the display turns off or the window loses focus, because permission auto-accept is renderer-side and gets throttled. The task only resumes when the window is focused again.

- **[#37650 — Optional search metadata breaks pending permission listing](https://github.com/anomalyco/opencode/issues/37650)** — *by kitlangton, 5 comments*
  Pending `glob`/`grep` permissions can make `session.permission.list` fail schema encoding when optional tool inputs are omitted as `undefined`.

- **[#41681 — Task resume keeps permissions from the previous subagent](https://github.com/anomalyco/opencode/issues/41681)** — *by Nath-Vikky*
  Resuming a `task_id` with a different `subagent_type` switches the prompt but keeps the previous agent's derived permissions — a security-relevant bug when switching to a more restricted agent.

- **[#41678 — Chinese input renders as blank for a single CJK character in VSCode integrated terminal](https://github.com/anomalyco/opencode/issues/41678)** — *by 735547951*
  A single CJK character renders as blank in the VSCode integrated terminal on Ubuntu 20.04 — a TUI rendering regression affecting non-Latin input.

- **[#41691 — TUI: image attachment preview renders as a blank thumbnail](https://github.com/anomalyco/opencode/issues/41691)** — *by NguyenDTAnh*
  Image attachments in the TUI show as an almost-blank dark thumbnail with only an `[Image 1]` label, making visual review impossible before sending.

## 4. Key PR Progress

- **[#41525 — feat(cli): embed web UI](https://github.com/anomalyco/opencode/pull/41525)** — *by Brendonovich*
  Embeds web app assets directly in Bun/Node CLI distributions and serves the web UI + API together without proxying `app.opencode.ai`, plus authenticated browser URL launch. A major deployment simplification.

- **[#41683 — fix(opencode): refresh task resume permissions](https://github.com/anomalyco/opencode/pull/41683)** — *by Nath-Vikky*
  Closes #41681 by atomically refreshing stored agent permissions when a queued `task_id` resume starts under a different subagent.

- **[#41677 — fix(cli): honor --interactive flag in opencode run](https://github.com/anomalyco/opencode/pull/41677)** — *by lzwind*
  Closes #41513: `opencode run -i` was parsed but never actually engaged direct interactive split-footer mode.

- **[#41671 — fix(core): optional search metadata breaks pending permission listing](https://github.com/anomalyco/opencode/pull/41671)** — *by asiimhusain*
  Fixes #37650 by cleaning absent optional fields from JSON permission metadata when executing `glob`/`grep` tools.

- **[#41427 — fix(opencode): ignore negative retry hints](https://github.com/anomalyco/opencode/pull/41427)** — *by kennyjinhiro*
  Closes #41424. Negative `retry-after` / `retry-after-ms` values now fall back to exponential backoff instead of reaching the scheduler.

- **[#41672 — fix(core): preserve AI SDK tool media](https://github.com/anomalyco/opencode/pull/41672)** — *by rekram1-node*
  Preserves canonical tool-result content when lowering into AI SDK v3 — mapping inline/remote images and arbitrary files to content output variants instead of collapsing them into JSON. Related to the media-handling bug family above.

- **[#41676 — fix(core): normalize copilot reasoning usage](https://github.com/anomalyco/opencode/pull/41676)** — *by rekram1-node*
  Accepts Copilot Chat responses with top-level reasoning tokens and includes them in normalized inclusive output totals while preserving nested OpenAI semantics.

- **[#41665 — feat(core): extract plan agent into a plugin](https://github.com/anomalyco/opencode/pull/41665)** — *by rekram1-node*
  Moves the built-in Plan agent into an internal `opencode.plan` plugin, stops using `edit * deny`, and rejects edit/write/patch via `execute.before` when Plan is selected — cleaner tool schema for plan mode.

- **[#13860 — feat(github): add GitHub Enterprise Server support to GitHub Action](https://github.com/anomalyco/opencode/pull/13860)** — *by balcsida*
  This long-running (6-month) PR finally makes the GitHub Action GHES-compatible by reading `GITHUB_SERVER_URL` / `GITHUB_API_URL` instead of hardcoding `github.com`.

- **[#40427 — [beta] some experimental perf improvements](https://github.com/anomalyco/opencode/pull/40427)** — *by Hona*
  The reduced v2-only performance series: faster session route loading, fewer compat-client/locale legacy paths, and optimized v2-first rendering.

## 5. Feature Request Trends

- **Subagent session control** — Users want to send prompts directly into subagent sessions (#41667), and subagent lifecycle needs better permission hygiene (#41681) and resume semantics. The web/desktop UI currently disables the composer for subagent sessions.
- **Loop/goal-driven workflows** — A `/goal` or `/loop` command (Claude Code-style iterative improvement) was requested (#41687), indicating demand for autonomous repeated refinement.
- **Better media handling** — Image attach previews in TUI (#41691), correct MIME detection for `--file` (#34318), and provider-aware tool-result media placement (#41674) all point at a broader media pipeline overhaul.
- **Richer syntax highlighting** — Odin language support in the TUI (#40889) continues the trend of expanding fenced-code-block coverage beyond mainstream languages.
- **Desktop UX polish** — Active-tab readability in the project switcher (#41688), keyboard navigation in dialogs (#38345), and embedded-browser scroll fixes (#41655) show the desktop surface maturing.

## 6. Developer Pain Points

- **Silent failures are the #1 frustration.** Multiple independent reports (#37852, #38644, #41684, #41682) describe the same failure mode: no error, no usage, no text — the agent just stops. The 55 👍 on #37852 confirms this resonates broadly.
- **Context/compaction reliability.** Compaction loses the original question and reasoning chain (#41682), and `agent.compaction.variant` config is ignored during compaction (#41578) — the two most-trusted memory mechanisms are both suspect.
- **Desktop/Windows stalls.** Agents freeze when the window is hidden, the display sleeps, or a `gradlew.bat` pipe hangs (#41675, #41686) — background operation is not yet trustworthy on Windows.
- **Provider compatibility gaps.** Expired signed OSS URLs (#41670), negative retry headers (#41424), and provider protocols that can't represent tool-result media (#41674) show the adapter layer is still a source of subtle, hard-to-debug breakage.
- **Permission state drift.** Stale permissions survive task resumes (#41681) and optional `undefined` fields break permission listing (#37650) — permission state is not yet a fully dependable contract.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-11

## Today’s Highlights

No new Pi release landed in the last 24h, but the project stayed highly active: 34 issues updated and 26 PRs updated. The main focus areas are tool-call correctness across providers (Cloudflare, Bedrock, DeepSeek, edit-tool normalization) and fullscreen TUI usability (search, top bar, viewport stability). The most active thread remains WSL GitHub Copilot login hanging, with 21 comments.

## Releases

None in the last 24h. The latest referenced version in the repository is **0.84.1**.

## Hot Issues

- [#6187](https://github.com/earendil-works/pi/issues/6187) **Pi login hangs in WSL after browser-based GitHub Copilot device authorization** — 21 comments, the most discussed issue. The device registers successfully in the browser, but the WSL client never notices and hangs. WSL users are effectively blocked from Copilot auth.

- [#7850](https://github.com/earendil-works/pi/issues/7850) **GitHub Copilot login fails with 429 for organizations with many models** — Device auth succeeds, then Pi’s model enumeration hits rate limits. 5 👍 shows org-scale users are affected. Closed as no-action, but it highlights a scaling problem in Copilot model discovery.

- [#7836](https://github.com/earendil-works/pi/issues/7836) **Edit fuzzy match misses lines with whitespace-length differences** — `normalizeForFuzzyMatch` does not collapse whitespace runs, so the edit tool rejects semantically identical text. Especially painful for smaller models that cannot match exact formatting.

- [#7846](https://github.com/earendil-works/pi/issues/7846) **Unable to start 0.84.0/0.84.1 on Bun runtime** — `zlib.createZstdDecompress is not a function` crashes Pi via undici. Bun-based installs are currently broken.

- [#7896](https://github.com/earendil-works/pi/issues/7896) **Cloudflare AI Gateway omits `strict: false`, making optional tool fields required** — `cloudflare-ai-gateway/gpt-5.6-sol` serializes tools differently from direct OpenAI, causing optional fields to be mandatory. Marked in-progress and likely addressed by PR #7934.

- [#7782](https://github.com/earendil-works/pi/issues/7782) **Invalid Bedrock tool call with empty key poisons the session** — Pi accepted and persisted an invalid tool argument, then replayed it on every turn, bricking the session. Closed after PR #7882 added sanitization for Bedrock replays.

- [#7855](https://github.com/earendil-works/pi/issues/7855) **“Response was truncated before completion.”** — Happens randomly with OpenAI-compatible APIs and local VLLM. Closed as a bug/no-action, but likely disruptive for local-model users.

- [#7746](https://github.com/earendil-works/pi/issues/7746) **Fullscreen double-click splits paths and kebab-case on `/` and `-`** — `Intl.Segmenter` word selection is too aggressive. Double-clicking a file path selects only one path component, which hurts fullscreen file navigation.

- [#7931](https://github.com/earendil-works/pi/issues/7931) **`/resume` shows inconsistent session counts** — The count during loading differs from the count after loading completes. Minor, but confusing for session management.

- [#7923](https://github.com/earendil-works/pi/issues/7923) **Chinese input renders as blank for a single CJK character in VS Code integrated terminal** — TUI rendering issue for CJK users in VS Code’s terminal. Important localization bug.

## Key PR Progress

- [#7934](https://github.com/earendil-works/pi/pull/7934) **fix(ai): send explicit strict mode through Cloudflare Responses** — Marks Cloudflare AI Gateway passthrough models as supporting `strict`, serializes ordinary tools with `strict: false`, and preserves the Workers AI compat path. Directly targets #7896.

- [#7933](https://github.com/earendil-works/pi/pull/7933) **fix(ai): detect DeepSeek base URLs case-insensitively** — Fixes #7886 by lowercasing hostnames in compatibility detection, so custom OpenAI-compatible models using DeepSeek URLs use `max_tokens` instead of `max_completion_tokens`.

- [#7921](https://github.com/earendil-works/pi/pull/7921) **fix(tui): avoid full transcript work during active renders** — Splits the interactive transcript into stable and dynamic render regions to reduce rendering cost during streaming. A meaningful performance fix for long sessions.

- [#7913](https://github.com/earendil-works/pi/pull/7913) **feat(tui): add fullscreen transcript search** — Implements transcript search in fullscreen TUI, triggered by `Ctrl+Shift+f`.

- [#7910](https://github.com/earendil-works/pi/pull/7910) **feat(coding-agent): add canonical message identity to markdown transformer context** — Lets extension markdown transformers keep per-message state across stream, redraw, and restore renders.

- [#7904](https://github.com/earendil-works/pi/pull/7904) **fix(edit): normalize single-object edits argument to array** — Accepts `{oldText, newText}` wrapped directly in an object or JSON string instead of requiring an array. Fixes a common model-format failure.

- [#7882](https://github.com/earendil-works/pi/pull/7882) **fix(ai): sanitize empty Bedrock tool argument keys** — Removes empty property names only when replaying tool arguments to Bedrock, while preserving canonical persisted conversation data. Fixes #7782.

- [#7906](https://github.com/earendil-works/pi/pull/7906) **feat(coding-agent): add fullscreen fixed top bar** — Adds a fullscreen-only top bar showing abbreviated cwd, git branch, context usage, and auto-compaction state.

- [#7918](https://github.com/earendil-works/pi/pull/7918) **fix(plan-mode): make progress tracking robust and tolerant** — Checks `thinking` and hidden text blocks, not just exact `[DONE:n]` markers, so plan steps are actually checked off during execution.

- [#7927](https://github.com/earendil-works/pi/pull/7927) **feat(coding-agent): add unified tool authorization boundary** — Adds semantic authorization metadata, canonical action snapshots, SHA-256 fingerprints, and a single `registerAuthorizer()` authority per session. A substantial security/control feature for extensions.

## Feature Request Trends

- **Fullscreen TUI polish** is the largest cluster: transcript search, fixed top bar, sticky last-prompt header, single-line scrolling, clickable hyperlinks, and better word-selection behavior.
- **Tool-call leniency and robustness** is another major direction: accept single-object `edits`, tolerate whitespace differences in fuzzy matching, and allow extensions to signal `terminate` when a tool call is blocked.
- **Extension ecosystem visibility** is emerging as a pain point: new `pi-ext-*` packages are not indexed by npm search, package gallery pages 500, and docs are missing entries like `AI_AGENT`.
- **Provider compatibility hardening** continues: Cloudflare gateway `strict` mode, DeepSeek URL casing, Copilot org rate limits, and Bedrock argument sanitization are all recent asks.

## Developer Pain Points

- **Authentication reliability**: GitHub Copilot device auth hangs in WSL, and organizations with many enabled models hit 429 rate limits during login.
- **Runtime and terminal compatibility**: Bun crashes because `zlib.createZstdDecompress` is missing; fullscreen TUI corrupts inside embedded terminals like Orca; CJK input can render as blank in VS Code.
- **Model output edge cases**: Responses are randomly truncated, edit tools reject valid tool calls, optional tool fields become required, and malformed provider tool calls can permanently poison a session.
- **Session state and UI state**: `/resume` counts are inconsistent, terminal viewport jumps to top on full redraw, and subagent sessions can inherit model/thinking settings from unrelated sessions.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-08-11

## Today's Highlights

Qwen Code shipped stable **v0.21.9**, adding native Qoder plugin installation from directories, archives, Git repos, URLs, and npm packages, plus QR-code-based Local Control pairing. Active development is concentrated on Web Shell capabilities — tmux-backed interactive terminal sub-agents, workspace file uploads, and transactional session switching — alongside daemon hardening against cross-worktree Git mutations. Community reports this week highlight Windows file-link handling and macOS/iTerm flicker regressions.

## Releases

- [v0.21.9-nightly.20260811.8c90697ace](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.9-nightly.20260811.8c90697ace) — Adds memory context-refresh marker carry-over test coverage ([PR #8809](https://github.com/QwenLM/qwen-code/pull/8809)).
- [v0.21.9](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.9) — Stable release:
  - Native Qoder plugin installation from directories, archives, Git repos, URLs, and npm packages, with automatic system-prompt loading ([#8661](https://github.com/QwenLM/qwen-code/pull/8661)).
  - Local Control pairing via QR code.

## Hot Issues

All 5 issues updated in the last 24h are listed (data source contains 5 total).

- [#8644 – Windows chat file links fail due to URL-encoded drive colon](https://github.com/QwenLM/qwen-code/issues/8644) — VS Code cannot open files because `d:\` becomes `d%3A`; status: need-information, P2. Community: 4 comments.
- [#7167 – Fleet Shepherd Dashboard](https://github.com/QwenLM/qwen-code/issues/7167) — Auto-maintained CI/CD dashboard for fleet PR conflicts, syncs, and dispatches. Community: 3 comments.
- [#8901 – macOS iTerm flicker after command confirmation](https://github.com/QwenLM/qwen-code/issues/8901) — Selecting an option and pressing Enter causes repeated screen flicker in qwen-code 0.21.8. Community: 3 comments.
- [#8916 – Detect upstream fail-fast placeholder responses](https://github.com/QwenLM/qwen-code/issues/8916) — Requests handling for OpenAI-compatible endpoints that return HTTP 200 + finish_reason but only placeholder text like `(request timeout)`; asks for curated-history exclusion and retry without persisting. Community: 2 comments.
- [#8842 – Fleet persistence, recovery, and hardening (stage 2)](https://github.com/QwenLM/qwen-code/issues/8842) — Continues multi-agent fleet work with recovery requirements; depends on #8841, umbrella #8718. Community: 2 comments.

## Key PR Progress

50 PRs updated in the last 24h; 10 selected by impact.

- [#8613 – tmux-backed interactive terminal sub-agent](https://github.com/QwenLM/qwen-code/pull/8613) — Enables agents to run REPLs, CLIs, or TUIs inside tmux and expose a live interactive terminal in the Web Shell.
- [#8687 – Guard cross-worktree Git mutations](https://github.com/QwenLM/qwen-code/pull/8687) — Blocks model-issued shell commands that escape the session workspace via `-C`, `--work-tree`, or `--git-dir`.
- [#8716 – Improve memory recall delivery and multilingual fallback](https://github.com/QwenLM/qwen-code/pull/8716) — Gives managed-memory recall a fixed 100 ms budget before the initial user request and improves multilingual fallback.
- [#8817 – Support fork from any conversation](https://github.com/QwenLM/qwen-code/pull/8817) — Makes session branching target earlier assistant messages safely instead of relying on the latest active state.
- [#8831 – Eliminate banner duplication and drag flicker on resize/wake](https://github.com/QwenLM/qwen-code/pull/8831) — Fixes terminal resize/wake rendering artifacts from #8557, including stranded banner copies after width shrink.
- [#8874 – Support workspace file uploads in Web Shell](https://github.com/QwenLM/qwen-code/pull/8874) — Adds drag/drop and upload-file workflows with progress, cancellation, conflict renaming, and inline file details.
- [#8872 – Improve thinking and tool progress display](https://github.com/QwenLM/qwen-code/pull/8872) — Ctrl+O toggles transcript thinking in Web Shell; hidden thinking aggregates tool calls into single groups, persisted in localStorage.
- [#8882 – Make cross-session switching transactional](https://github.com/QwenLM/qwen-code/pull/8882) — WebUI session switches replay into a staging store; the visible session remains owner until the target is fully restored.
- [#8893 – Clean up OpenAI logs in non-interactive sessions](https://github.com/QwenLM/qwen-code/pull/8893) — Extends OpenAI API log retention to headless invocations, stream-json transports, and ACP daemon sessions with deduplication.
- [#8915 – Improve subagent panel responsiveness](https://github.com/QwenLM/qwen-code/pull/8915) — Waits for panel animation before loading subagent details, preserves root elapsed time, batches replay updates, and respects intentional scroll position.

## Feature Request Trends

- **Multi-agent fleet maturity** — [Issue #8842](https://github.com/QwenLM/qwen-code/issues/8842) requests persistence, recovery, and hardening for the native fleet mode beyond the current MVP.
- **Resilience to degraded upstream responses** — [Issue #8916](https://github.com/QwenLM/qwen-code/issues/8916) asks for detection of valid-looking placeholder responses from failed upstream calls.
- **Automated operational dashboards** — [Issue #7167](https://github.com/QwenLM/qwen-code/issues/7167) reflects demand for self-maintaining fleet health visibility as multi-agent workflows scale.

## Developer Pain Points

- **Platform-specific file handling**: [Issue #8644](https://github.com/QwenLM/qwen-code/issues/8644) shows Windows drive-letter URL encoding breaking chat file links in VS Code.
- **Terminal rendering regressions**: macOS/iTerm flicker ([#8901](https://github.com/QwenLM/qwen-code/issues/8901)) and CLI resize/wake artifacts ([#8831](https://github.com/QwenLM/qwen-code/pull/8831)) are recurring UX friction points.
- **Session/context reliability**: Duplicate context indicators ([#8749](https://github.com/QwenLM/qwen-code/pull/8749)), session-switch timeouts ([#8883](https://github.com/QwenLM/qwen-code/pull/8883)), transactional switching ([#8882](https://github.com/QwenLM/qwen-code/pull/8882)), and memory timing ([#8716](https://github.com/QwenLM/qwen-code/pull/8716)) show that session state management remains a high-priority pain area.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

Here is the **DeepSeek-TUI (CodeWhale) community digest** for **2026-08-11**.  
Note: the repo is listed as `Hmbown/DeepSeek-TUI`, but issue/PR URLs are under `Hmbown/CodeWhale`.

## 1. Today's Highlights

No new release was published in the last 24h, but the project merged a targeted correctness fix for nested subagent recursion limits ([#5317](https://github.com/Hmbown/CodeWhale/pull/5317)) and continued the core/TUI layering effort with [#5300](https://github.com/Hmbown/CodeWhale/pull/5300).  
A new umbrella EPIC for crate decomposition was opened ([#5316](https://github.com/Hmbown/CodeWhale/issues/5316)), while release-prep PR [#5315](https://github.com/Hmbown/CodeWhale/pull/5315) describes v0.9.6 as a subtractive stability release.  
ACP tool execution also moved forward with [#5225](https://github.com/Hmbown/CodeWhale/pull/5225), enabling real code-editing tools over the `session/prompt` API.

## 2. Releases

No new releases were recorded in the last 24h. However, PR [#5315](https://github.com/Hmbown/CodeWhale/pull/5315) indicates **v0.9.6** was shipped: fewer runtime guards, one stable base prompt, truthful provider endings, and a smaller compaction path that preserves provider behavior.

## 3. Hot Issues

Only 3 issues were updated in the window; all are included here.

- [#2870 [CLOSED] EPIC: staged command-boundary refactor for #2791](https://github.com/Hmbown/CodeWhale/issues/2870)  
  A long-running tracking EPIC with 20 comments, updated 2026-08-10. It breaks a large command-boundary refactor into smaller mergeable layers. The high comment count shows significant maintainer/contributor coordination around this architectural cleanup.

- [#5316 [OPEN] EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)](https://github.com/Hmbown/CodeWhale/issues/5316)  
  New umbrella EPIC created 2026-08-10 and updated 2026-08-11. It tracks every sub-EPIC and feature related to splitting the TUI into separate crates. Important for long-term maintainability and contributor onboarding.

- [#5253 [CLOSED] bug: nested max_depth can widen the root session depth budget](https://github.com/Hmbown/CodeWhale/issues/5253)  
  A correctness bug where a descendant subagent could exceed the root/session recursion budget by passing an explicit `max_depth`. Closed after PR [#5317](https://github.com/Hmbown/CodeWhale/pull/5317) applied `inherited.min(..)` to the explicit-depth path.

## 4. Key PR Progress

Only 5 PRs were updated in the window; all are listed below.

- [#5225 [CLOSED] feat(acp): expose file/search/git/patch/shell tools over session/prompt](https://github.com/Hmbown/CodeWhale/pull/5225)  
  Previously, ACP `session/prompt` only streamed model text and ignored tool calls. This PR gives ACP clients like Zed and community bridges access to real file/search/git/patch/shell tools, turning the agent from chat-only into a code-editing agent.

- [#5277 [OPEN] build(deps): bump docker/login-action from 4.5.2 to 4.6.0](https://github.com/Hmbown/CodeWhale/pull/5277)  
  Dependabot update for the Docker login action. Routine CI dependency housekeeping.

- [#5317 [CLOSED] fix(subagents): cap nested max_depth by inherited budget](https://github.com/Hmbown/CodeWhale/pull/5317)  
  Fixes [#5253](https://github.com/Hmbown/CodeWhale/issues/5253). It mirrors the profile-hint arm and applies `inherited.min(..)` in the explicit-`max_depth` arm, preventing nested subagents from widening the absolute recursion budget.

- [#5300 [CLOSED] refactor(core): own primary request preparation](https://github.com/Hmbown/CodeWhale/pull/5300)  
  Replaces the synthetic `ChatRequest` scaffold in `codewhale-core` with the production `MessageRequest` DTO family previously owned by the TUI crate. Adds a pure `prepare_primary_turn_request` constructor and routes both production and tests through it. Key step in reducing TUI/core duplication.

- [#5315 [CLOSED] chore(release): ship v0.9.6](https://github.com/Hmbown/CodeWhale/pull/5315)  
  Release-prep PR for v0.9.6. Described as a subtractive release: fewer runtime guards, one stable base prompt, truthful provider endings, and a smaller compaction path that preserves the provider output.

## 5. Feature Request Trends

No new end-user feature requests appeared in the issue data. The active directions are architectural and capability-focused:

- **Staged command-boundary refactor** ([#2870](https://github.com/Hmbown/CodeWhale/issues/2870)): the community/maintainers want command parsing and execution boundaries cleaned up in small, mergeable steps.
- **TUI crate decomposition** ([#5316](https://github.com/Hmbown/CodeWhale/issues/5316)): a strong push toward splitting the TUI into focused crates for maintainability.
- **Subagent recursion safety** ([#5253](https://github.com/Hmbown/CodeWhale/issues/5253)): users/operators need nested subagent behavior to respect root-configured depth ceilings.
- **ACP tool execution** ([#5225](https://github.com/Hmbown/CodeWhale/pull/5225)): ACP integrations expect full tool use, not just streaming text, from `session/prompt`.

## 6. Developer Pain Points

- **Inherited subagent limits can be bypassed.** Explicit `max_depth` on nested spawns could widen the root budget, forcing a fix in [#5317](https://github.com/Hmbown/CodeWhale/pull/5317).
- **ACP clients were getting chat-only behavior.** Editors and third-party bridges could not get the agent to execute file, search, git, patch, or shell operations until [#5225](https://github.com/Hmbown/CodeWhale/pull/5225).
- **Core/TUI responsibility split is still in flux.** [#5300](https://github.com/Hmbown/CodeWhale/pull/5300) removes duplicated request DTO ownership, indicating ongoing friction between crate boundaries.
- **Release and dependency overhead remains visible.** Tight release-prep PRs ([#5315](https://github.com/Hmbown/CodeWhale/pull/5315)) and routine dependency bumps ([#5277](https://github.com/Hmbown/CodeWhale/pull/5277)) are a steady operational burden.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>