# AI CLI Tools Community Digest 2026-08-14

> Generated: 2026-08-14 02:00 UTC | Tools covered: 10

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

# Cross-Tool AI CLI Comparison Report — 2026-08-14

## 1. Ecosystem Overview

The AI CLI ecosystem is consolidating around a shared reliability baseline: tools that work every day for long-running sessions, across Windows and headless environments, with production-grade MCP integrations. This digest cycle shows **multi-agent orchestration** emerging as the dominant strategic direction — Claude Code shipped `@`-mentions and forkable subagents, Qwen Code landed `/coordinate` and Agent Plugins v1, and OpenAI Codex advanced experimental thread queue APIs. Simultaneously, the community is pushing hard on **context/token lifecycle management**: premature compaction, token inflation from advisor tools, and session bloat are reported across four major toolchains. Security supply-chain hardening also surfaced prominently, with SHA-pinned Actions, CVE-fix PRs, and installer-integrity complaints appearing across Gemini CLI, OpenCode, Qwen Code, and Claude Code.

## 2. Activity Comparison

| Tool | Hot Issues | PRs Active | Releases Today | Notable Release |
|---|---|---|---|---|
| Claude Code | 10 | 2 | 2 | v2.1.232 — subagent forking default, `@`-session mentions |
| OpenAI Codex | 10 | 10 | 4 | rust-v0.148.0-alpha.11→.14 (no changelogs) |
| Gemini CLI | 10 | 10 | 1 | nightly — context-aware retries for capacity errors |
| GitHub Copilot CLI | 10 | 1 | 2 | v1.0.80-0 — `--enable-mcp-server`, shared-session indicators |
| Kimi Code CLI | 3 | 0 | 0 | — |
| OpenCode | 10 | 10 | 0 | — (perf PR series merged) |
| Pi | 10 | 10 | 0 | — |
| Qwen Code | 10 | 10 | 3 | v0.21.11 — Agent Plugins v1, `/coordinate` |
| CodeWhale (DeepSeek TUI) | 10 | 10 | 1 | v0.9.7 — Codewhale branding, `deepseek-tui` deprecated |
| Grok Build | 0 | 0 | 0 | — (no activity) |

## 3. Shared Feature Directions

**Multi-agent orchestration and inter-session communication.** Claude Code (#24798, `@`-mentions, forked subagents), Qwen Code (#8718 RFC → `/coordinate`, fleet staging #8840–#8843), OpenAI Codex (thread/queue APIs, daemon exit menus), and Copilot CLI (shared sessions) all target sequenced handoffs and durable multi-session workflows.

**MCP production-hardening.** OAuth callback fixes dominate: Claude Code v2.1.231 (pre-registered clients), Codex #38448 (per-server callback ports), Copilot CLI #4480/#4464 (Atlassian issuer mismatch, Entra refresh races). Resource leaks are a parallel thread: Codex #26984 (fd leaks → EMFILE), Gemini CLI #28787 (corrupt config enabling all MCP servers).

**Context/token lifecycle management.** Claude Code #53065 (advisor token inflation → premature compaction), Pi #6879 (compaction never fires before overflow), Codex #38445 (retain developer messages across compaction), Gemini CLI #26522 (Auto Memory retrying low-signal sessions forever).

**Persistent memory across sessions.** Kimi #1283 (Memory System), Gemini CLI Auto Memory, Qwen Code #8188–#8189 (memory recall), Copilot CLI session restore — all respond to the same demand for durable project context.

**Windows/platform reliability.** Regressions cluster on Windows across five tools: Claude Code Desktop `send_message` (#86012, #86275, #86014, #86138), Codex WSL2 IDE-context loss (#31553), Copilot CLI socket errors, Qwen Code Ctrl+V paste (#9061), CodeWhale config path divergence (#2369).

**Supply-chain security.** Gemini CLI #28740 (eval workflow RCE), #28778 (simple-git CVE), OpenCode #42434 (curl|bash install), Qwen Code #9008 (CODEOWNERS, Scorecard), Claude Code #60280 (SHA-pinned Actions).

## 4. Differentiation Analysis

| Tool | Strategic Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise governance + multi-session orchestration | Professional devs in regulated orgs | Heavyweight CLI, cyber-safeguard enforcement, background subagents by default |
| **OpenAI Codex** | Fast-moving Rust rewrite, extensibility | Power users on frontier models | Alpha-velocity iterations, experimental app-server thread APIs, external provider support (Bedrock) |
| **Gemini CLI** | Reliability under load | Google-ecosystem / GCP users | Nightly cadence, context-aware retry/backoff, P1 bug triage culture |
| **Copilot CLI** | Copilot ecosystem extension | VS Code / GitHub-centric developers | Tight VS Code + AHP/session sharing, MCP server management via flags |
| **Kimi Code CLI** | Minimal footprint, ACP automation | Moonshot API users | Lowest activity; gaps in streaming safeguards and persistent memory |
| **OpenCode** | Open-source TUI performance | Self-hosters, multi-provider users | Lazy-loading/perf optimizations, V1/V2 data coexistence, Zen provider routing |
| **Pi** | Terminal/TUI craft | Developer-tooling enthusiasts | Viewport-only rendering, visual-line caching, provider catalog updates |
| **Qwen Code** | Fleet-style multi-agent workflows | Qwen/Agent ecosystem, headless users | `/coordinate` command, Agent Plugins v1, Web Shell/Desktop expansion |
| **CodeWhale** | DeepSeek-first experience | DeepSeek/local-model users | Tool schema simplification, model-guardian review tiers, rebrand migration |

**Notable friction points per tool:** Claude Code — cyber safeguard false positives; Codex — Windows Desktop/IDE-context and MCP fd exhaustion; Gemini CLI — subagent status dishonesty and perms regressions; Copilot CLI — brittle model routing and fragile session state; OpenCode — V1/V2 DB collisions and Zen rate-limit confusion; Pi — compaction timing; Qwen — Vertex AI auth; CodeWhale — schema complexity and macOS rendering.

## 5. Community Momentum & Maturity

- **Highest issue engagement:** Claude Code leads raw volume (94 comments on #84352 alone), but activity skews to bug reports rather than architectural contributions.
- **Rapid iteration:** OpenAI Codex is shipping the fastest (4 releases/day), followed by Qwen Code and Claude Code with substantive feature releases. Gemini CLI sustains nightly cadence with weekly PR throughput.
- **Open-source momentum:** OpenCode, Pi, and CodeWhale show healthy PR counts (10 each) despite zero-to-one releases, indicating active contributor bases — OpenCode's performance PR series and Pi's TUI fixes are particularly well-scoped.
- **Slowing signals:** Kimi Code CLI (3 issues, 0 PRs) and Grok Build (no activity) are effectively dormant this cycle. Copilot CLI's single PR suggests a maintenance posture despite 2 releases.
- **Maturity markers:** Claude Code and Copilot CLI exhibit production-regression pain (Desktop session loss, OAuth scope bugs) typical of wide enterprise adoption. CodeWhale's rebranding and test-isolation fixes signal a project professionalizing its process.

## 6. Trend Signals

1. **Multi-session orchestration is the next battleground.** Claude Code's `@`-mentions, Qwen's `/coordinate`, and Codex's thread queues all land within one week. Expect inter-session messaging and subagent-forking to become baseline capabilities by Q4.
2. **MCP is moving from "nice-to-have" to critical infrastructure.** OAuth callback handling, fd/resource lifecycle, and config corruption are now top-tier issues across four toolchains. Tools that do not harden MCP will lose automation-heavy users.
3. **Context accounting is the hidden cost driver.** Token inflation from advisor/subagent transcripts, late compaction, and session bloat are recurring across Claude, Pi, and Codex. Smarter usage attribution will become a differentiator.
4. **Windows remains the weakest platform.** Nearly every tool ships Windows-specific regressions (Desktop messaging, Ctrl+V, MSIX updates, WSL2 path translation). Teams without dedicated Windows CI will keep bleeding users in enterprise settings.
5. **Supply-chain security is now user-visible.** SHA-pinned Actions, Scorecard integration, and CVE patches appear across four projects in one digest. Raw `curl|bash` installers are attracting active complaint threads.
6. **Persistent memory is a rising requirement.** Kimi's Memory System demand, Gemini's Auto Memory retries, and Qwen's memory recall experiments all point to users wanting durable, project-scoped context — not just chat history.
7. **Runaway-generation guardrails are missing.** Kimi's 88k-token gibberish output and Pi's late compaction show that output-token limits and preemptive compaction remain unsolved across the ecosystem.
8. **TUI polish is a retention lever.** Viewport rendering, visual-line caching, clipboard correctness on VTE, and terminal restoration after SIGINT are actively shipped in Pi, OpenCode, and Qwen — day-to-day ergonomics matter as much as model capability.

**Bottom line for developers:** Prioritize tools with active multi-agent roadmaps (Claude Code, Qwen Code, OpenAI Codex), but budget for platform-specific friction — Windows reliability, MCP OAuth, and context compaction are the three recurring failure modes that will interrupt real work regardless of vendor choice.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Source:** github.com/anthropics/skills • **Data as of:** 2026-08-14

---

## 1. Top Skills Ranking

The most-discussed Skill submissions (PRs), by community attention:

| # | Skill | Functionality | Discussion Highlights | Status |
|---|-------|--------------|----------------------|--------|
| 1 | **[document-typography](https://github.com/anthropics/skills/pull/514)** | Typographic quality control for generated documents: orphan word wrapping, widow paragraphs, and numbering misalignment | Recognized as affecting every Claude-generated document; broadly applicable quality gap | Open |
| 2 | **[ODT skill](https://github.com/anthropics/skills/pull/486)** | OpenDocument Format creation, template filling, and ODT→HTML conversion (LibreOffice/ISO standard files) | Addresses an underserved format niche beyond docx/pdf; long-running discussion since March | Open |
| 3 | **[frontend-design revision](https://github.com/anthropics/skills/pull/210)** | Rewrites the existing frontend-design skill for clarity, actionability, and internal coherence | Debated how to make design guidance executable within a single conversation rather than educational prose | Open |
| 4 | **[skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | Two meta-skills: quality analysis across five weighted dimensions and security analysis for Claude Skills | Early (Nov 2025) proposal that anticipated the community's later security/trust concerns; still active | Open |
| 5 | **[self-audit](https://github.com/anthropics/skills/pull/1367)** | Pre-delivery audit: mechanical output-file verification plus a four-dimension reasoning quality gate | Strong traction as a universal quality gate; linked to a broader reasoning-pipeline proposal (#1385) | Open |
| 6 | **[testing-patterns](https://github.com/anthropics/skills/pull/723)** | Comprehensive testing skill: Testing Trophy model, unit testing (AAA, naming, edge cases), React Testing Library | Matches demand for generated test suites; broad coverage seen as both strength and maintenance risk | Open |
| 7 | **[ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)** | Broad ServiceNow assistant: ITSM, ITOM, ITAM/SAM, FSM, HRSD, CSM, SPM, Vulnerability & Security Incident Response, CSDM, IntegrationHub | Largest enterprise-platform submission; long review cycle (Mar–Aug) suggests scope scrutiny | Open |
| 8 | **[pyxel retro game dev](https://github.com/anthropics/skills/pull/525)** | Retro/pixel-art/8-bit game development workflow via pyxel-mcp: write → run_and_capture → inspect → iterate | Community excitement around creative/entertainment skills, not just productivity | Open |

> **Note:** The single most-commented PR overall is [#1298](https://github.com/anthropics/skills/pull/1298), a fix to the `skill-creator` eval tooling (0% recall bug) — signalling that tooling reliability is the community's top meta-concern.

---

## 2. Community Demand Trends

From the most-active Issues, five clear demand directions emerge:

1. **Skill Lifecycle Reliability** — The dominant theme. [#556](https://github.com/anthropics/skills/issues/556) (12 comments) documents `run_eval.py` never triggering skills; [#62](https://github.com/anthropics/skills/issues/62) (10 comments) reports skills silently disappearing; [#189](https://github.com/anthropics/skills/issues/189) (6 comments) covers duplicate skills from overlapping plugins.

2. **Security & Trust Boundaries** — [#492](https://github.com/anthropics/skills/issues/492) (43 comments, the most-commented issue) exposes how community skills under the `anthropic/` namespace enable trust-boundary abuse. Related proposals: agent-governance skills ([#412](https://github.com/anthropics/skills/issues/412)) and SharePoint permission concerns ([#1175](https://github.com/anthropics/skills/issues/1175)).

3. **Enterprise Sharing & Collaboration** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests org-wide skill sharing in Claude.ai instead of manual file transfer.

4. **Context-Window Efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` skill injecting ~156k tokens in one call; [#1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory`, a symbolic notation for compact agent state.

5. **Quality Gating of Agent Output** — [#1385](https://github.com/anthropics/skills/issues/1385) proposes a three-gate reasoning quality pipeline, mirroring the self-audit PR (#1367).

---

## 3. High-Potential Pending Skills

Open PRs with active discussion that are likely to land next:

- **[self-audit](https://github.com/anthropics/skills/pull/1367)** — Verification + reasoning quality gate (v1.3.0); author also driving the related pipeline proposal.
- **[testing-patterns](https://github.com/anthropics/skills/pull/723)** — High-demand testing coverage; awaiting maintainer feedback since April.
- **[ServiceNow platform](https://github.com/anthropics/skills/pull/568)** — Updated as recently as 2026-08-12; enterprise-scope skill nearing a decision.
- **[pyxel retro game dev](https://github.com/anthropics/skills/pull/525)** — Updated 2026-07-15; creative skill with clear trigger conditions and an MCP reference implementation.
- **[plan-file-hygiene](https://github.com/anthropics/skills/pull/1479)** — Addresses planning-artifact accumulation/lifecycle (issue #1417); community-co-authored framing.
- **[ODT skill](https://github.com/anthropics/skills/pull/486)** — Long review window but no rejection; fills a real format gap.
- **[skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** — Would directly address the community's #1 security concern (#492); high strategic value.
- **[SAP-RPT-1-OSS predictor](https://github.com/anthropics/skills/pull/181)** — Tabular foundation model integration for SAP business data; niche but concrete enterprise use case.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for trust and reliability across the entire skill lifecycle — working evaluation tooling, secure distribution, quality verification, and context-window discipline consistently outrank any single new domain skill in both PR and Issue attention.**

---

# Claude Code Community Digest — 2026-08-14

## Today’s Highlights

Anthropic shipped **v2.1.232**, enabling subagent forking by default and adding `@`-mentions for linking other Claude sessions in a prompt. Meanwhile, the community is heavily focused on two issues: a high-traffic bug where CVP-approved Claude.ai organizations still receive cyber safeguard blocks in Claude Code (#84352, 94 comments), and a cluster of Windows Desktop regressions where cross-session `send_message` reports success but never actually reaches the target session (#86012, #86275).

## Releases

- **[v2.1.232](https://github.com/anthropics/claude-code/releases/tag/v2.1.232)** — Subagent forking is now on by default: `subagent_type: "fork"` inherits the full conversation and prompt cache, and non-teammate agent spawns in interactive sessions now run in the background by default. Also new: type `@` in the prompt to mention another Claude session by name.
- **[v2.1.231](https://github.com/anthropics/claude-code/releases/tag/v2.1.231)** — Fixes MCP OAuth sign-in failing with a redirect URI mismatch for servers using pre-registered OAuth clients, such as Slack.

## Hot Issues

1. **[#84352 — CVP-approved Claude.ai organization still receives cyber safeguard blocks in Claude Code](https://github.com/anthropics/claude-code/issues/84352)** — 94 comments, 14 👍. The most active issue today. Users report that an org previously approved under the Cyber Verification Program is again blocked, and the Verification Portal shows the application as “Under review.” Points to a disconnect between org approval state and Claude Code safeguard enforcement.

2. **[#24798 — Inter-session communication for multi-Claude workflows](https://github.com/anthropics/claude-code/issues/24798)** — 66 comments, 21 👍. A long-running feature request asking for direct, sequenced handoffs between isolated Claude sessions. This is the clearest community signal for first-class multi-agent orchestration.

3. **[#85603 — Typed input queued mid-turn is silently dropped at turn end](https://github.com/anthropics/claude-code/issues/85603)** — 22 comments. Interactive TUI users lose input typed while a turn is running; no Escape key involved. Painful for long-running agent sessions in tmux.

4. **[#86012 — Cross-session messages leave the recipient’s query completely unresponsive](https://github.com/anthropics/claude-code/issues/86012)** — 15 comments, Windows/macOS Desktop. Recipient sessions hang with `hadFirstResponse=false` until an idle-timeout force-kill. Part of the broader Desktop cross-session messaging regression.

5. **[#53065 — advisor() tool inflates reported input tokens by forwarding full transcript, triggering premature auto-compaction](https://github.com/anthropics/claude-code/issues/53065)** — 14 comments, 6 👍. The advisor’s forwarded-transcript usage is summed into the main turn’s usage, which can make Claude Code auto-compact far too early on long-context models. Several related issues duplicate this.

6. **[#82092 — Apps gateway serves an otlpEndpoint without otlpHeaders, so every Desktop telemetry flush is rejected](https://github.com/anthropics/claude-code/issues/82092)** — 10 comments. Desktop telemetry is silently failing because OTLP ingest is bearer-gated but no auth header is configured.

7. **[#86275 — Windows desktop: cross-session send_message silently fails after 2.1.222→2.1.227 auto-update](https://github.com/anthropics/claude-code/issues/86275)** — 8 comments. Tool reports success, but the message is never delivered. Strong evidence that the Windows Desktop runtime bump introduced the regression.

8. **[#86138 — send_message to a paused session is never delivered, leaving a permanent phantom turn](https://github.com/anthropics/claude-code/issues/86138)** — 7 comments. Message appears delivered, the target session resumes, but the model never receives the prompt.

9. **[#86014 — Cross-session send_message reports success but message is never delivered](https://github.com/anthropics/claude-code/issues/86014)** — 7 comments. Stuck loading with 0/4 delivery in the target session; another variant of the same Windows Desktop regression.

10. **[#79596 — Cowork / Claude in Chrome extension navigated a real Chrome tab to unint related external site](https://github.com/anthropics/claude-code/issues/79596)** — 6 comments. The extension performed an unprompted navigation to `aisle.wedding`; a notable autonomy/safety concern.

## Key PR Progress

Only two PRs were active in the last 24 hours.

- **[#86537 — Fix duplicated word in CHANGELOG.md](https://github.com/anthropics/claude-code/pull/86537)** — Documentation-only fix for a duplicated “to to” in the `CLAUDE_BASH_NO_LOGIN` changelog entry. Open, no objections.
- **[#60280 — chore(ci): SHA-pin remaining actions/checkout and actions/github-script](https://github.com/anthropics/claude-code/pull/60280)** — Closed. Supply-chain hardening follow-up that pins third-party GitHub Actions to commit SHAs across six workflows.

## Feature Request Trends

The dominant requested direction is **multi-session orchestration and inter-session communication**. Issue #24798 is the highest-traffic feature request and asks for direct project workflow between Claude sessions with dependencies. The v2.1.232 release — `@`-mentions, forked subagents inheriting full context, and background agent spawns — shows the maintainers are already pushing in that direction.

Secondary trends:

- **Better MCP OAuth support** for pre-registered clients, addressed in v2.1.231.
- **Smarter token/context accounting** so advisor-style sub-inferences don’t inflate usage and trigger premature compaction.
- **More deterministic agent execution**, including reliable background behavior and safe cross-session wake-ups.

## Developer Pain Points

- **Cross-session messaging on Windows Desktop is broken since runtime 2.1.227.** Multiple reports (#86275, #86138, #86014, #86012, #86385) all describe `send_message` returning success while the message is never delivered, never triggers a turn, or wedges the target session.
- **`advisor()` token inflation causes premature auto-compaction** (#53065, #81620, #82863), wasting useful context and disrupting long sessions.
- **Cyber safeguard false positives for approved orgs** (#84352, #86527) are confusing and disruptive, especially when the verification portal contradicts prior approval emails.
- **Windows MSIX update and launch failures persist** (#73107, #77421): orphaned processes block upgrades with “Another program is currently using this file.”
- **Silent telemetry/auth failures** (#82092) make it hard to trust whether Desktop diagnostics are actually being sent.
- **Unrequested background `git fetch`** (#84698) is untraceable and has no opt-out.
- **PreToolUse hook denials lose the denying hook’s identity** (#82642) because `decisionReason` is discarded at transcript-write time.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-14

## Today’s Highlights

The Codex Rust line accelerated through four alpha tags (`0.148.0-alpha.11` → `.14`), though no detailed changelog was attached to the releases. On the feature side, the codebase advanced on Amazon Bedrock support, MCP OAuth callback ports, and experimental persistent thread queue APIs. Community discussion remains weighted toward Windows/WSL2 IDE-context breakage and reliability problems in long-running desktop sessions.

## Releases

Four new Rust alpha releases were published in the last 24 hours. No detailed change notes were included in the release metadata, so the changes appear to be fast-follow alpha iterations of the CLI.

- [rust-v0.148.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14)
- [rust-v0.148.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.13)
- [rust-v0.148.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.12)
- [rust-v0.148.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.11)

## Hot Issues

1. **[#37458 — Codex extension fails to start: “The extension couldn’t load its resources”](https://github.com/openai/codex/issues/37458)**  
   Closed, but still the most active issue with 53 comments and 11 👍. It is part of a broader cluster of VS Code extension resource-load failures on Windows and remote setups.

2. **[#26984 — MCP stdio servers leak pipe fds + orphan child processes → EMFILE](https://github.com/openai/codex/issues/26984)**  
   21 comments. Long-running MCP-heavy Codex sessions can exhaust file descriptors with “Too many open files.” This is a serious reliability problem for users building MCP-based workflows.

3. **[#37403 — macOS Desktop cannot resume Remote Control / CLI thread: “already has an active writer”](https://github.com/openai/codex/issues/37403)**  
   18 comments, 11 👍. A regression after the August 7 update that breaks remote-controlled Codex sessions on macOS.

4. **[#31553 — VS Code extension stopped auto-including IDE context after update](https://github.com/openai/codex/issues/31553)**  
   17 comments, 12 👍. Affects remote/container setups and WSL2 users, where IDE context silently stops being attached.

5. **[#26990 — Windows Desktop local state is not crash-safe after power loss](https://github.com/openai/codex/issues/26990)**  
   16 comments. Reported pins/projects reset, config regressions, and future timestamps after unclean shutdowns.

6. **[#34920 — IDE Context fails in Codex extension 26.715.x with RPC serialization error](https://github.com/openai/codex/issues/34920)**  
   10 comments. Windows-specific RPC serialization failure in recent extension builds; closed but reflects a recurring IDE-context instability theme.

7. **[#23454 — `$skill` explicit invocation ignores local explicit-only skills absent from implicit skill list](https://github.com/openai/codex/issues/23454)**  
   8 comments. Breaks workflows for users who rely on explicit-only local skills for `$skill` invocations.

8. **[#33551 — Multi-Agent V2 sends OpenAI-specific `agent_message` items to external Responses providers](https://github.com/openai/codex/issues/33551)**  
   8 comments. Blocks OpenAI-compatible external providers such as Ollama from running Codex Multi-Agent V2 correctly.

9. **[#22779 — Completed subagents continue to count against thread limit](https://github.com/openai/codex/issues/22779)**  
   7 comments. Long-running sessions eventually clamp down on new subagents even after old ones finish.

10. **[#38455 — ChatGPT desktop repeatedly spawns Computer Use workers and crashes with V8 OOM on macOS](https://github.com/openai/codex/issues/38455)**  
   3 comments, but severe: reproducible idle crash shortly after launch in version `26.810.41047`.

## Key PR Progress

1. **[#38470 — Add an Amazon Bedrock Runtime provider](https://github.com/openai/codex/pull/38470)**  
   Adds a built-in `amazon-bedrock-runtime` provider for regional OpenAI-compatible endpoints, including SigV4 and per-provider AWS profile/region support.

2. **[#38456 — Add experimental thread queue APIs to app server](https://github.com/openai/codex/pull/38456)**  
   Adds persistent `thread/queue/add`, `list`, `update`, `delete`, `reorder`, and `start` APIs with FIFO dispatch after completed or failed turns.

3. **[#38475 — Add bounded skill model delegation instructions](https://github.com/openai/codex/pull/38475)**  
   Allows skills to request Luna while running on Sol or Terra, but only resolves Luna when available in the current provider namespace.

4. **[#38467 — Parse model annotations from skill frontmatter](https://github.com/openai/codex/pull/38467)**  
   Adds an optional `model` field to skill metadata, enabling future per-skill model routing.

5. **[#38448 — Support per-server MCP OAuth callback ports](https://github.com/openai/codex/pull/38448)**  
   Adds `oauth.callback_port` to MCP server configuration and preserves it through config edits and plugin declarations.

6. **[#38450 — Embed the Windows sandbox setup manifest in Bazel builds](https://github.com/openai/codex/pull/38450)**  
   Fixes a Bazel-specific issue where `rules_rust` drops the `asInvoker` manifest from the Windows sandbox helper.

7. **[#38441 — Give Guardian V2 full tool action context](https://github.com/openai/codex/pull/38441)**  
   Exposes the original pre-hook `ToolPayload` to tool lifecycle contributors so Guardian can assess actual risk before approval.

8. **[#38445 — Retain client developer messages across context compaction](https://github.com/openai/codex/pull/38445)**  
   Preserves annotated client-authored developer messages during compaction when `retain_client_developer_messages` is enabled.

9. **[#38447 — Add running-task exit choices to local daemon sessions](https://github.com/openai/codex/pull/38447)**  
   Adds a `Ctrl-C` menu for daemon sessions: cancel the task, exit and leave it running, or stop the daemon.

10. **[#38440 — Add app-server support for reverting paginated threads](https://github.com/openai/codex/pull/38440)**  
    Adds experimental `thread/revert`: replace a loaded paginated thread’s durable history with the prefix before `beforeTurnId`, preserving the thread ID.

## Feature Request Trends

- **Background and long-running process management**  
  Community members want Codex to monitor servers/builds without blocking other work. See [#2062 — Request: monitor background services](https://github.com/openai/codex/issues/2062), plus the daemon exit choices in [#38447](https://github.com/openai/codex/pull/38447).

- **Persistent, resumable thread workflows**  
  Users increasingly need durable session state: queued submissions, paginated thread revert, crash-safe local state, and better context compaction. See [#26990](https://github.com/openai/codex/issues/26990), [#24060](https://github.com/openai/codex/issues/24060), and [#38456](https://github.com/openai/codex/pull/38456).

- **MCP and external-provider interoperability**  
  There is clear demand for production-grade MCP support and compatibility with non-OpenAI providers, driven by OAuth callback ports, fd-leak fixes, and multi-agent wire-compatibility issues. See [#38448](https://github.com/openai/codex/pull/38448), [#26984](https://github.com/openai/codex/issues/26984), and [#33551](https://github.com/openai/codex/issues/33551).

- **More flexible model and subagent routing**  
  Users want per-skill model choices, external provider support, and subagent model parity with the standalone CLI. See [#23454](https://github.com/openai/codex/issues/23454), [#38107](https://github.com/openai/codex/issues/38107), [#38467](https://github.com/openai/codex/pull/38467), and [#38475](https://github.com/openai/codex/pull/38475).

## Developer Pain Points

- **Windows / WSL2 and VS Code remote instability**  
  IDE context silently disables, extension resources fail to load, RPC serialization breaks, and WSL path translation causes agent cwd and browser/computer-use failures. Notable reports: [#37458](https://github.com/openai/codex/issues/37458), [#31553](https://github.com/openai/codex/issues/31553), [#34920](https://github.com/openai/codex/issues/34920), [#35419](https://github.com/openai/codex/issues/35419), [#30435](https://github.com/openai/codex/issues/30435).

- **Context compaction and session bloat**  
  Long-running desktop sessions become huge after repeated compaction, thread reads get truncated, and compaction endpoints occasionally return 404s. See [#38466](https://github.com/openai/codex/issues/38466), [#38323](https://github.com/openai/codex/issues/38323), and [#38445](https://github.com/openai/codex/pull/38445).

- **Subagent lifecycle and model parity**  
  Completed subagents can still consume thread limits, subagents get stuck after app restarts, and the bundled VS Code extension CLI may reject models the standalone CLI accepts. See [#22779](https://github.com/openai/codex/issues/22779), [#38408](https://github.com/openai/codex/issues/38408), [#38107](https://github.com/openai/codex/issues/38107).

- **MCP resource exhaustion**  
  MCP stdio server fd leaks and orphaned child processes are a top reliability complaint for automation-heavy Codex users. See [#26984](https://github.com/openai/codex/issues/26984).

- **Sandbox and approval policy inconsistencies**  
  Windows users still see approval prompts despite `approval_policy=never`, and upgrading `/Permissions` to Full Access does not always apply during an active task. See [#24934](https://github.com/openai/codex/issues/24934) and [#33114](https://github.com/openai/codex/issues/33114).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-14

## Today's Highlights
The latest nightly release focuses on reliability: a new context-aware retry mechanism for capacity errors and stabilization of flaky end-to-end tests. Community attention remains concentrated on subagent correctness and hangs, with several P1 issues continuing to receive maintainer triage and user reports.

## Releases
**v0.56.0-nightly.20260814.gc0d192452** — [Release notes](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260814.gc0d192452)

What's changed:
- `test(e2e)`: stabilize `file-system-interactive` test on slow runners ([#28793](https://github.com/google-gemini/gemini-cli/pull/28793))
- `fix(core)`: implement context-aware silent retries and availability TTL for capacity errors ([#28790](https://github.com/google-gemini/gemini-cli/pull/28790))

## Hot Issues
1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   P1 bug with 12 comments. A subagent reports `status: "success"` even when it hit the max turn limit, hiding an interruption. Community reaction: 2 👍; misleading agent status can corrupt automated workflows.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   P1 issue with 8 comments and 8 👍. Simple tasks like folder creation hang forever when deferred to the generalist agent. Users report waiting over an hour before canceling.

3. **[#25166 — Shell command gets stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   P1 core bug with 3 👍. Simple CLI commands are shown as active long after they finish, hanging the session. High impact for daily CLI use.

4. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   P1 browser bug with 4 comments. Browser agent terminates with GOAL status but effectively fails on Wayland, affecting Linux users.

5. **[#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)**  
   P2 permission regression: agents are invoked even when disabled in config. Users expect subagents to remain off unless explicitly enabled.

6. **[#26522 — Auto Memory retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   P2 memory bug with 5 comments. Low-signal sessions are never marked processed, so the background extractor keeps retrying them forever.

7. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**  
   P2 security/privacy issue. Transcript content is sent to the model before redaction; logging may expose existing skill content.

8. **[#24246 — Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   P2 agent scalability bug. Users with many MCP tools hit API limits, and the agent does not limit tool scope intelligently.

9. **[#20079 — ~/.gemini/agents/filename.md symlink not recognized as agent](https://github.com/google-gemini/gemini-cli/issues/20079)**  
   P2 UX bug with 4 comments. Symlinked agent files are silently ignored, breaking common dotfiles workflows.

10. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)**  
    P2 safety concern. Models use `git reset`, `--force`, or destructive DB operations even when safer alternatives exist.

## Key PR Progress
1. **[#28790 — Context-aware silent retries and availability TTL for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)** (closed)  
   Core fix for the critical capacity exhaustion retry regression. Adds backoff/retry for unattended runs and silent retries for interactive sessions.

2. **[#28740 — Prevent supply chain RCE in eval-pr workflows](https://github.com/google-gemini/gemini-cli/pull/28740)** (open)  
   Critical security fix splitting eval workflows into trusted build and execution steps to avoid `pull_request_target` privilege escalation.

3. **[#28778 — Upgrade simple-git to 3.32.3 (CVE-2026-28292)](https://github.com/google-gemini/gemini-cli/pull/28778)** (open)  
   Fixes a CRITICAL vulnerability in `simple-git` reported by Trivy.

4. **[#28803 — Add Claude Sonnet 4.5 and Opus 4.8 model definitions](https://github.com/google-gemini/gemini-cli/pull/28803)** (closed)  
   Adds model constants, alias resolution, and default configs for external Claude models.

5. **[#28804 — Feat/evals tools expansion](https://github.com/google-gemini/gemini-cli/pull/28804)** (open)  
   Adds behavioral evaluations for `read_many_files`, `get_internal_docs`, and MCP resource tools.

6. **[#28801 — Rollback entire multi-turn request on cancellation or abort](https://github.com/google-gemini/gemini-cli/pull/28801)** (closed)  
   Prevents incomplete prompt state by rolling back cancelled multi-turn requests, avoiding stuck sessions.

7. **[#28789 — Fix vscode-ide-companion stop() hang and keep-alive failure threshold](https://github.com/google-gemini/gemini-cli/pull/28789)** (open)  
   Resolves indefinite hangs during shutdown/open MCP sessions and fixes keep-alive ping resource leaks.

8. **[#28787 — Don't treat corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)** (open)  
   Prevents silently enabling all MCP servers when the enablement JSON is malformed.

9. **[#28699 — Enforce authentication and stop checkpoint path traversal in A2A server](https://github.com/google-gemini/gemini-cli/pull/28699)** (open)  
   Security hardening for custom A2A REST routes; adds credential checks and path traversal protections.

10. **[#28678 — Prevent OAuth callback timeout leak and release resources](https://github.com/google-gemini/gemini-cli/pull/28678)** (open)  
    Centralizes callback server settlement to avoid stale timeout callbacks and memory leaks.

## Feature Request Trends
- **Behavioral evals & observability**: Multiple epics (#24353, #22745) push for component-level evaluations and better insight into subagent trajectories (#22598).
- **AST-aware tooling**: Requests to use AST-aware file reads/search/mapping for more precise code understanding (#22745, #22746).
- **Sandboxing & safety**: Zero-dependency OS sandboxing and post-execution intent routing (#19873), plus discouraging destructive shell behavior (#22672).
- **Agent self-awareness & resilience**: Accurate CLI flags/hotkeys, self-execution (#21432), browser agent session takeover/lock recovery (#22232).
- **Native tool integration**: Preferences for native file tools over generated scripts (#21000) and better use of existing skills/sub-agents (#21968).

## Developer Pain Points
- **Frequent hangs and deadlocks**: Generalist agent hangs, shell “Waiting input” after completion, and vscode-ide-companion stop hangs are recurring themes.
- **Subagent reliability and honesty**: Incorrect success/GOAL status despite failing, permissions ignored, and missing bug-report context are top frustrations.
- **Memory system overhead**: Auto Memory can retry low-signal sessions indefinitely, silently skip invalid patches, and leak sensitive content into logs/model context (#26522, #26523, #26525).
- **Platform-specific issues**: Wayland browser failures, Windows ripgrep EFTYPE errors, WSL2 clipboard limitations, and terminal corruption on resize remain open.
- **Configuration and tool limits**: MCP config corruption, ignored `settings.json` overrides, and 400 errors with too many tools disrupt real-world setups.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-14

## Today's Highlights
Copilot CLI released **v1.0.80-0** and **v1.0.80-1**, adding a `--enable-mcp-server` flag and clearer shared-session indicators. The issue tracker remains focused on MCP/OAuth reliability, model routing and reasoning-effort mismatches, and session lifecycle bugs. Only one PR was active in the last 24 hours, proposing docs for per-agent reasoning-effort frontmatter.

## Releases
- [v1.0.80-1](https://github.com/github/copilot-cli/releases) — Patch release with general fixes and changes.
- [v1.0.80-0](https://github.com/github/copilot-cli/releases) — Added:
  - `--enable-mcp-server` to re-enable MCP servers that were disabled in settings for the current run.
  - Improved `--ahp`/session-sharing UI: joined sessions now show `2 clients` when another user is attached, including in the Sessions tab.

## Hot Issues
1. [**Custom Agent YAML Frontmatter Should Support Reasoning Effort** (#2904)](https://github.com/github/copilot-cli/issues/2904)  
   Users want per-agent reasoning-effort configuration via `.agent.md` frontmatter, not just global `--effort`. Strong demand: 20 👍 and 6 comments.

2. [**Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'** (#4345)](https://github.com/github/copilot-cli/issues/4345)  
   Closed, but the same failure is still being reported in #4473. Sub-agent routing is applying unsupported reasoning-effort levels to models that do not accept them.

3. [**Custom agent frontmatter `model` field rejects array syntax** (#2133)](https://github.com/github/copilot-cli/issues/2133)  
   VS Code Copilot Chat supports `model` arrays, but Copilot CLI cannot parse them. This creates incompatibility for users sharing custom agents across both tools.

4. [**`explore` tool hardcodes model to `gpt-5.4-mini`, ignoring custom/DeepSeek API configuration** (#3954)](https://github.com/github/copilot-cli/issues/3954)  
   The `explore` tool bypasses custom model endpoints, causing failures for users with DeepSeek or other API configurations.

5. [**`allowed_directories` in `permissions-config.json` does not suppress directory prompt** (#4482)](https://github.com/github/copilot-cli/issues/4482)  
   Users report that shell commands still trigger "path outside your allowed directory list" prompts even when the path is listed. `add-dir` works, but file-based config does not.

6. [**Atlassian MCP OAuth fails with "Incompatible authorization server"** (#4480)](https://github.com/github/copilot-cli/issues/4480)  
   Regression from 1.0.71 to 1.0.79: OAuth discovery against `mcp.atlassian.com` fails due to issuer mismatch.

7. [**Session and prompt lost when stopping an action or hitting the stop button** (#4477)](https://github.com/github/copilot-cli/issues/4477)  
   Stopping an in-progress action deletes the entire session, including the original prompt and edits. High-impact for daily interactive use.

8. [**Explicit code-review subagent model override is ignored** (#4462)](https://github.com/github/copilot-cli/issues/4462)  
   The built-in `code-review` subagent starts with `gpt-5.6-sol` even when configured for `gpt-5.6-luna`, silently ignoring per-agent configuration.

9. [**Remote MCP OAuth silent refresh fails with AADSTS70011** (#4464)](https://github.com/github/copilot-cli/issues/4464)  
   Microsoft Entra OAuth refresh requests mix `.default` with resource-specific scopes, forcing repeated interactive sign-ins every ~60–75 minutes.

10. [**`--server --stdio` never releases session extension-host processes** (#4468)](https://github.com/github/copilot-cli/issues/4468)  
    Long-lived servers accumulate four extension-host child processes per session, never cleaning them up until the server exits. Significant resource leak for desktop-app users.

## Key PR Progress
Only one PR was updated in the last 24 hours:

- [**docs: document proposed custom-agent effort frontmatter (Option A)** (#4476)](https://github.com/github/copilot-cli/pull/4476) — Closed PR adding README documentation for a proposed dedicated `effort` frontmatter field for custom agents, paralleling the existing `model` field. It directly addresses the request in #2904.

No other PRs were active in this window.

## Feature Request Trends
- **Per-agent model and reasoning-effort configuration** is the strongest recurring ask: custom agent frontmatter should support `effort`, model arrays, and explicit overrides for built-in subagents such as `code-review` and `explore`.
- **Session management improvements**: users want a way to list running CLI sessions with status, prevent accidental session deletion on stop, and restore archived chats.
- **Remote MCP OAuth/resilience**: repeated requests for retry/backoff on transient 5xx errors, correct OAuth scope handling, and safe concurrency during token refresh.
- **Permissions configuration consistency**: `allowed_directories` should behave the same as `add-dir`, and permission state should not replay or get orphaned across session resumes.
- **Plugin lifecycle clarity**: auto-update behavior for `extraKnownMarketplaces` is expected but not working, and disabled plugin skills need clear UI state and persistence.

## Developer Pain Points
- **Model routing is brittle**: sub-agents are launched with hardcoded or incorrect models, and reasoning-effort mismatches (`medium` with `claude-haiku-4.5`) keep surfacing despite prior fixes.
- **MCP OAuth is a recurring source of friction**: Windows socket errors, Entra refresh-token scope bugs, issuer mismatches, and concurrent refresh races all interrupt real workflows.
- **Session state is fragile**: stopping actions can delete sessions, long sessions exhaust event storage, orphaned permission prompts reappear on resume, and server mode leaks processes.
- **Configuration is not consistently honored**: custom model endpoints, per-agent overrides, and `allowed_directories` are ignored or only partially applied, forcing users back to interactive workarounds.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-14

## Today's Highlights
No new releases or pull requests landed in the last 24 hours. The main activity is concentrated on three open issues: the long-running **Memory System** feature request continues to generate discussion, while two critical bug reports highlight serious reliability gaps in streaming behavior and generation control. These issues suggest that community attention is shifting from feature breadth toward stability, observability, and persistent context.

## Releases
No new releases in the last 24 hours.

## Hot Issues
Only 3 issues were updated in the last 24 hours, so all are listed below.

### 1. [Feature Request: Memory System – Persistent context across sessions (#1283)](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **Author:** CatKang | **Created:** 2026-02-27 | **Updated:** 2026-08-13 | **Comments:** 38
- **Summary:** Proposes a comprehensive memory system for Kimi Code CLI, including automatic AI-managed notes and manual user-defined instructions, so that project patterns and preferences persist across sessions.
- **Why it matters:** This is the highest-engagement issue in the current set and has been open for months. The 38 comments indicate sustained demand for long-lived context, which is a common requirement for AI-assisted development workflows.

### 2. [ACP/print streaming response hangs silently (#2598)](https://github.com/MoonshotAI/kimi-cli/issues/2598)
- **Author:** ai-agent-workbench | **Created:** 2026-08-09 | **Updated:** 2026-08-13 | **Comments:** 1
- **Summary:** In ACP mode with Kimi CLI 0.34.0, streaming responses can hang after all content deltas arrive: the terminal `[DONE]` frame never appears, there is no idle timeout, and the next user message silently replaces the hung turn without writing the partial response or usage record to `wire.jsonl`.
- **Why it matters:** This is a severe availability issue for anyone relying on ACP-based automation. The silent loss of wire logs makes debugging difficult and can corrupt session state without any visible error.

### 3. [Runaway garbled generation — 88k tokens of gibberish (#2597)](https://github.com/MoonshotAI/kimi-cli/issues/2597)
- **Author:** kdp123 | **Created:** 2026-08-08 | **Updated:** 2026-08-13 | **Comments:** 1
- **Summary:** A normal interactive session triggered a single LLM step that ran for 3,214 seconds and emitted 88,114 tokens of incoherent, repetitive multilingual gibberish before completion.
- **Why it matters:** Unbounded generation is both a cost and correctness hazard. This issue highlights the lack of output-token limits or runaway-generation safeguards, which is especially concerning for long-running CLI workflows.

## Key PR Progress
No pull requests were updated in the last 24 hours.

## Feature Request Trends
- **Persistent memory/context:** The only explicit feature request in the current issue set is the [Memory System proposal (#1283)](https://github.com/MoonshotAI/kimi-cli/issues/1283). Both automatic memory and manual/user-defined memory are requested, indicating a desire for reusable project context across sessions.
- **Streaming lifecycle safeguards:** Although filed as bugs, [#2598](https://github.com/MoonshotAI/kimi-cli/issues/2598) and [#2597](https://github.com/MoonshotAI/kimi-cli/issues/2597) point to missing controls that users may soon request as features: idle timeouts for streaming, complete `wire.jsonl` flushing on interruption, and hard output-token limits.

## Developer Pain Points
- **Silent streaming hangs:** In ACP mode, responses can end without a terminal frame, and the CLI has no configurable idle timeout. The next message then silently discards the previous partial result without writing it to the wire log.
- **No output-token guardrails:** A single generation can run for tens of minutes and produce tens of thousands of useless tokens with no built-in cutoff, which is both frustrating and expensive.
- **Lack of persistent context:** Developers must re-establish project patterns and preferences every session because there is no built-in memory system.

*Digest generated from [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) data for 2026-08-14.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-14

## Today's Highlights
The community is heavily focused on stability and performance this week: V2/V1 data coexistence, rate-limit failures on Zen, and slow startup due to network-fetch blocking are top pain points. On the PR side, maintainers landed a series of lazy-loading/startup-performance improvements, plus fixes for TUI unread state, tab scroll isolation, and SEA-safe plugin loading.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues

1. **[#37012 — Keep legacy layout option](https://github.com/anomalyco/opencode/issues/37012)**  
   High-engagement request (37 comments, 41 👍) asking to preserve the classic layout because the new version hides frequently used options behind navigation. The community clearly wants an opt-out rather than a forced migration.

2. **[#41470 — “Copied to clipboard” doesn't work](https://github.com/anomalyco/opencode/issues/41470)**  
   Copying from OpenCode inside VSCode Server/Docker shows success but the system clipboard is never updated. Affects remote-development workflows significantly.

3. **[#42029 — FreeUsageLimitError on Zen even without usage](https://github.com/anomalyco/opencode/issues/42029)**  
   Users report rate-limit errors despite not having used the service. Confusing and frustrating for free-tier users, with no clear reset explanation.

4. **[#42083 — GitHub Copilot provider shows zero models](https://github.com/anomalyco/opencode/issues/42083)**  
   Auth via `github-copilot` succeeds, but the model picker and `opencode models` show nothing. Blocks an entire authentication path for Arch-package users.

5. **[#40516 — Desktop app fails to load provider/model/MCP on startup](https://github.com/anomalyco/opencode/issues/40516)**  
   Regression between v1.18.4 and v1.18.5+ makes the desktop app unusable ~80% of the time for multiple users in one organization. Downgrading is currently the only workaround.

6. **[#42434 — `opencode upgrade` uses curl|bash without integrity verification](https://github.com/anomalyco/opencode/issues/42434)**  
   Security report flagging the classic supply-chain/TOCTOU risk. The community is asking for checksum verification and safer install patterns.

7. **[#42441 — opencode deletes itself](https://github.com/anomalyco/opencode/issues/42441)**  
   After a day of normal use, the globally installed binary disappears from `.local/share/pnpm/opencode`. Extremely unusual and severe—likely post-install script or auto-update behavior.

8. **[#42376 — Startup blocks on models.dev/api.json network fetch](https://github.com/anomalyco/opencode/issues/42376)**  
   A 3.6 MB synchronous fetch delays startup by 10–30 seconds when cache is stale or the host is slow. The 5-minute TTL is too aggressive for the model registry.

9. **[#35402 — Zen: request rerouting breaks prompt-cache locality](https://github.com/anomalyco/opencode/issues/35402)**  
   Byte-identical requests to `glm-5.2` intermittently hit a cold-cache provider. Users want `stickyProvider` for multi-sourced Zen models to avoid re-billing and slow prefills.

10. **[#42260 — V2 mutates shared V1 database and breaks coexistence](https://github.com/anomalyco/opencode/issues/42260)**  
    OpenCode V2 migrated the schema of the shared V1 database, breaking `/move` and trapping a session in a worktree. Users running V1 and V2 side-by-side need isolation.

## Key PR Progress

1. **[#42471 — fix(tui): scope unread updates to focused terminal](https://github.com/anomalyco/opencode/pull/42471)**  
   Prevents background TUIs from incorrectly marking shared sessions as unread or clearing unread indicators.

2. **[#42466 — fix(tui): load local TUI plugins via SEA-safe runtime import](https://github.com/anomalyco/opencode/pull/42466)**  
   Fixes `ERR_UNKNOWN_BUILTIN_MODULE` when the Node SEA build tries to import local TUI plugins.

3. **[#42468 — perf(core): load MCP client lazily](https://github.com/anomalyco/opencode/pull/42468)**  
   Keeps the MCP SDK out of startup evaluation when no MCP servers are enabled, reducing baseline startup cost.

4. **[#42469 — perf(core): defer webfetch HTML parsing](https://github.com/anomalyco/opencode/pull/42469)**  
   `htmlparser2` is now loaded only when HTML-to-text/Markdown conversion is actually needed—good for startup and non-HTML fetches.

5. **[#42470 — refactor(cli): load semver lazily for update checks](https://github.com/anomalyco/opencode/pull/42470)**  
   Delays `semver` import until a candidate update actually needs comparison, saving startup work for local/disabled-check installs.

6. **[#40427 — some experimental perf improvements](https://github.com/anomalyco/opencode/pull/40427)**  
   Reduced v2-only performance series: faster session route loading and related tuning, rebased cleanly onto `v2`.

7. **[#42222 — refactor(util): replace xdg-basedir](https://github.com/anomalyco/opencode/pull/42222)**  
   Removes a direct runtime dependency with a behavior-compatible local implementation, trimming installed size.

8. **[#42456 — fix(tui): isolate tab scroll state](https://github.com/anomalyco/opencode/pull/42456)**  
   Fixes a bug where switching tabs could save a session’s scroll position under the wrong tab when `tab_scroll` is enabled.

9. **[#42457 — refactor(core): trim sqlite adapter paths](https://github.com/anomalyco/opencode/pull/42457)**  
   Removes unused migration variants and replica wrappers from the internalized SQLite adapter, deleting 201 lines of dead code.

10. **[#42460 — refactor(core): remove bus replay all](https://github.com/anomalyco/opencode/pull/42460)**  
    Drops an unused test-convenience operation, replacing it with supported `Bus.replay` calls—114 lines deleted with no production impact.

## Feature Request Trends
- **Legacy layout opt-out**: Users want the classic main-window layout preserved or selectable, especially for quick access to all options.
- **Localization**: New requests for Hebrew (`he`) locale signal growing demand for i18n completeness.
- **TUI background-activity visibility**: A right sidebar listing running/background subagents was requested with status and model preview.
- **Provider routing control**: Zen users want sticky session/provider routing to preserve prompt-cache locality and avoid unpredictable re-billing.
- **V1/V2 coexistence**: Clear desire for separate data stores or safe migration paths so V2 doesn’t corrupt V1 sessions.

## Developer Pain Points
- **Rate-limit ambiguity**: Recurring 429 `FreeUsageLimitError` reports on Zen, including false positives when the user hasn’t hit any limit.
- **Startup latency**: Synchronous network fetches and eager dependency loading make startup slow on unstable connections or large registries.
- **V1/V2 instability**: Database schema collisions and missing V2 runtime tools (e.g., `todowrite`/`todoread`) hurt users testing the next major version.
- **Security concerns**: Raw `curl|bash` upgrade flow, SSRF via `webfetch`, and silent context pruning are all being raised as integrity/supply-chain risks.
- **Remote-development gaps**: Clipboard integration and desktop-app startup failures are particularly painful for Docker, VSCode Server, and multi-user environments.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-14

## Today’s Highlights
Pi remains heavily focused on reliability, terminal/TUI polish, and extension-tool robustness. The most active issue is context compaction failing before provider overflow, while merged PRs improve terminal restoration on SIGINT, viewport-only rendering, and CLI flag handling. No new releases were published in the last 24 hours.

## Releases
No new releases in the last 24 hours.

## Hot Issues

- [#6879](https://github.com/earendil-works/pi/issues/6879) — **Auto-compaction never triggers until provider overflow**  
  Long agentic turns can blow past the context window before compaction fires; the API ultimately rejects the request at 373k tokens. This is the most commented/upvoted issue today (19 comments, 17 👍) and points to a critical reliability gap in long-running agent sessions.

- [#7836](https://github.com/earendil-works/pi/issues/7836) — **Edit fuzzy match misses whitespace-length differences**  
  `normalizeForFuzzyMatch` does not collapse whitespace runs, so otherwise identical edits fail. Especially painful for smaller models relying on the edit tool.

- [#8029](https://github.com/earendil-works/pi/issues/8029) — **Very slow prompt editor with large buffers**  
  Moving the cursor in a ~7000-line prompt costs ~1650ms per arrow press. A related PR with visual-line caching is already up.

- [#7791](https://github.com/earendil-works/pi/issues/7791) — **Global Undici dispatcher inherits 16 KiB maxHeaderSize**  
  Responses with larger headers fail with `UND_ERR_HEADERS_OVERFLOW`. This is a subtle environment-level bug that can break many fetch-based integrations.

- [#7779](https://github.com/earendil-works/pi/issues/7779) — **Shared PI_CODING_AGENT_DIR blocked by 0600 permissions**  
  `auth.json` and `models-store.json` are written 0600, so a second Unix user cannot read shared Pi state. Community is asking for a trusted-user sharing model.

- [#7829](https://github.com/earendil-works/pi/issues/7829) — **Invalid settings.json silently ignored on Windows**  
  Unescaped paths in `settings.json` produce a misleading “bash not found” error. The diagnostics around invalid config need to be surfaced instead of swallowed.

- [#7689](https://github.com/earendil-works/pi/issues/7689) — **Handle `end_turn: false` for Codex backend**  
  Codex responses can include `end_turn: false` on `response.completed`, which Pi currently doesn’t handle. Important for correct multi-turn behavior on Codex-backed sessions.

- [#7761](https://github.com/earendil-works/pi/issues/7761) — **TUI says “Copied!” but clipboard stays empty on VTE terminals**  
  GNOME Terminal/VTE shows the success flash, but `wl-paste` confirms nothing was copied. Clipboard integration is incomplete on common Linux setups.

- [#8055](https://github.com/earendil-works/pi/issues/8055) — **Ambiguous-width characters break TUI table alignment on CJK terminals**  
  Characters like `① ± … €` are counted as one column but rendered two columns wide by CJK terminals, causing misaligned tables and list rendering.

- [#8017](https://github.com/earendil-works/pi/issues/8017) — **Support Anthropic refusal server-side fallback**  
  Opened by badlogic: compaction can fail when Anthropic’s classifier refuses requests. Would add fallback behavior compatible with Anthropic’s server-side refusal handling.

## Key PR Progress

- [#8086](https://github.com/earendil-works/pi/pull/8086) — **fix(ai): fall back to legacy Gemini tool schema**  
  Some Gemini endpoints reject `parametersJsonSchema`/unknown fields. This PR falls back to the legacy schema when endpoints reject the request.

- [#8082](https://github.com/earendil-works/pi/pull/8082) — **fix(tui): render only visible viewport; restore terminal on SIGINT**  
  Fixes both the “resume floods terminal” issue and the broken terminal state after SIGINT. High-impact TUI hygiene fix.

- [#8084](https://github.com/earendil-works/pi/pull/8084) — **fix(coding-agent): don’t swallow prompt after boolean extension flags**  
  Fixes `--plan`-style boolean flags consuming the next CLI argument, which previously started sessions with no messages.

- [#8070](https://github.com/earendil-works/pi/pull/8070) — **fix(coding-agent): validate extension flag defaults**  
  Prevents type/default mismatches in `registerFlag()`, notably boolean flags with string defaults that evaluate truthy.

- [#8066](https://github.com/earendil-works/pi/pull/8066) — **fix(tui): visual lines caching**  
  Directly addresses #8029 by caching visual-line computations, avoiding repeated work on every cursor move in large prompt buffers.

- [#8057](https://github.com/earendil-works/pi/pull/8057) — **fix(examples): todo renderResult returns undefined on validation errors**  
  A failed `todo` schema validation was returning `undefined` and crashing the interactive TUI; now handled gracefully.

- [#7984](https://github.com/earendil-works/pi/pull/7984) — **fix(coding-agent): update grok-mermaid to 0.2.3**  
  Improves mermaid rendering output, mirroring more of the expected visual fidelity.

- [#6216](https://github.com/earendil-works/pi/pull/6216) — **feat: Amazon Bedrock Mantle OpenAI Responses provider**  
  Adds support for Bedrock Mantle’s OpenAI-compatible Responses API through the existing OpenAI Bedrock provider path.

- [#8085](https://github.com/earendil-works/pi/pull/8085) — **feat(tui): cancel active mouse selection with Escape**  
  Allows users to abandon a mouse selection before release, avoiding accidental auto-copy.

- [#8067](https://github.com/earendil-works/pi/pull/8067) — **Use APP_NAME in user-facing messages**  
  Replaces hardcoded “pi” in user-facing strings so rebranded builds don’t look inconsistent.

## Feature Request Trends

- **Startup and rendering performance**  
  Requests to reduce startup latency (#4254, #7739) and eliminate UI jank (#8029) are recurring, with multiple PRs targeting caching and viewport rendering.

- **Extension/tool API robustness**  
  Strong interest in validation opt-outs (#7607), flag type safety (#8070), and safer extension registration defaults. Developers want more control without breaking edge cases.

- **Provider compatibility and catalog freshness**  
  Community members are actively submitting provider catalog updates: Grok 4.6 (#8046), Kimi cached-token tracking (#8075), Gemini schema fallback (#8086), and Anthropic refusal fallback (#8017).

- **Rendering fidelity across backends**  
  Issues like Mermaid/LaTeX in HTML exports (#8041) and ambiguous-width character handling in TUI (#8055) show demand for consistent rendering across terminals and exported output.

## Developer Pain Points

- **Context compaction is not aggressive enough**  
  #6879: Compaction only fires after the provider rejects the request, making long agent turns fragile.

- **Edit tool is too strict about whitespace**  
  #7836: Fuzzy matching fails on benign whitespace differences, causing avoidable edit failures.

- **Large buffers still cause severe UI stalls**  
  #8029: Cursor movement is linear in prompt size; users with multi-thousand-line prompts experience seconds of latency.

- **Environment/config friction**  
  Recurring issues with Undici header limits (#7791), 0600 shared files (#7779), invalid settings being silently ignored (#7829), and Windows-specific socket/test failures (#8047).

- **Terminal safety and restoration**  
  Several reports of terminals left in raw mode or misconfigured after `/exit` or SIGINT (#5065, #8080), plus clipboard failures on VTE (#7761) and large resume sessions flooding scrollback (#8079).

- **Streaming / retry behavior is unreliable**  
  Mid-stream terminations can restart the whole response and duplicate partial output (#8031), and streaming thinking output can briefly flash the wrong theme color (#8060).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-08-14

## Today's Highlights

Stable **v0.21.11** shipped with **Agent Plugins v1** and native multi-agent workflows via the **`/coordinate`** command, marking a major step toward fleet-style collaboration. Web-shell fixes for standalone session targets and workspace file uploads landed in preview/nightly builds, while SWE-bench Verified remains **QUARANTINED** (500/500 completed, 0 resolved). Community energy is concentrated on multi-agent fleet implementation, Vertex AI authentication/model-parameter bugs, and Windows CLI regressions.

## Releases

- **[v0.21.11](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11)** — Stable release:
  - **Agent Plugins v1** to extend agent capabilities ([#8834](https://github.com/QwenLM/qwen-code/pull/8834))
  - Native multi-agent workflows with read-only teammates via `/coordinate` ([#8804](https://github.com/QwenLM/qwen-code/pull/8804))
  - SWE-bench Verified run is **QUARANTINED**: 500/500 tasks completed, 0 resolved — non-production E2E validation only.

- **[v0.21.12-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.1)** — Preview:
  - `fix(web-shell): preserve standalone session target` ([#9038](https://github.com/QwenLM/qwen-code/pull/9038))
  - `feat(web-shell): support workspace file uploads`

- **[v0.21.11-nightly.20260814.45c2e73080](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-nightly.20260814.45c2e73080)** — Nightly:
  - Same web-shell fixes as the preview release.

## Hot Issues

1. **[#8718 — RFC: Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718)**  
   *Closed, 9 comments.* The core multi-agent RFC requesting leader dispatch of independent worker sessions. Now being realized through the `/coordinate` command and the fleet stage work.

2. **[#8678 — Preserve the current session when a large restore times out](https://github.com/QwenLM/qwen-code/issues/8678)**  
   *Open, 8 comments.* A dangerous daemon edge case: slow session restores can drop or corrupt the active session. PR1 ([#8691](https://github.com/QwenLM/qwen-code/pull/8691)) merged, but further recovery layers are still wanted.

3. **[#9019 — Gemini 2.5 models unusable on Vertex AI: `thinkingLevel` always sent](https://github.com/QwenLM/qwen-code/issues/9019)**  
   *Open, 5 comments.* Requests fail immediately with HTTP 400 because `thinking_level` is sent even when unsupported. Blocks all Gemini 2.5 usage through `vertex-ai` auth.

4. **[#9025 — Keyless Vertex AI is not inferred from the environment](https://github.com/QwenLM/qwen-code/issues/9025)**  
   *Open, 5 comments.* Headless ADC runs exit at startup because `vertex-ai` auth type is not auto-selected from the environment, making keyless setups impossible in CI/non-interactive mode.

5. **[#9061 — Ctrl+V paste completely unresponsive in CLI on Windows](https://github.com/QwenLM/qwen-code/issues/9061)**  
   *Open, 4 comments.* A regression since 0.21.0; clipboard paste does nothing in the CLI. Strong signal of Windows input handling issues introduced during the 0.21.x series.

6. **[#9088 — `read_file` sends non-image file to model API based only on `.png` extension](https://github.com/QwenLM/qwen-code/issues/9088)**  
   *Open, 3 comments.* A file named `screenshot.png` containing JSON bytes is treated as an image, causing a raw 400 that aborts the whole turn. Highlights missing content-type/byte verification.

7. **[#9083 — `record_artifact` succeeds without verifying `workspacePath`](https://github.com/QwenLM/qwen-code/issues/9083)**  
   *Open, 3 comments.* Artifacts can be reported as available while the store marks them `missing`, confusing the model and breaking the Web Shell artifact panel.

8. **[#9108 — Desktop: remaining Web Shell external links can fail silently; MCP OAuth cannot complete](https://github.com/QwenLM/qwen-code/issues/9108)**  
   *Open, 3 comments.* Follow-up to [#9069](https://github.com/QwenLM/qwen-code/pull/9069): several link surfaces still bypass the Tauri opener, including MCP OAuth flows.

9. **[#7118 — Windows standalone installer fails when PowerShell cannot resolve `Get-FileHash`](https://github.com/QwenLM/qwen-code/issues/7118)**  
   *Closed, 7 comments, 👍3.* SHA-256 verification breaks installation on constrained PowerShell environments. Closed, but a common Windows on-boarding frustration.

10. **[#8944 — 2 high severity vulnerabilities reported after `npm update` since 0.21.0](https://github.com/QwenLM/qwen-code/issues/8944)**  
    *Closed, 3 comments.* Users are seeing high-severity npm audit findings after update; the repo has since started addressing supply-chain hygiene.

## Key PR Progress

1. **[#8834 — Agent Plugins v1](https://github.com/QwenLM/qwen-code/pull/8834)**  
   Merged into v0.21.11. Introduces the v1 plugin contract, allowing agents to be extended beyond built-in tools.

2. **[#8804 — Native multi-agent workflows via `/coordinate`](https://github.com/QwenLM/qwen-code/pull/8804)**  
   Merged into v0.21.11. Enables read-only teammate agents in coordinated multi-agent sessions.

3. **[#8677 — OpenTUI renderer backend (react track)](https://github.com/QwenLM/qwen-code/pull/8677)**  
   Large TUI rewrite with a flicker-free renderer and first-class mouse support. A major long-term UI investment for the CLI.

4. **[#8682 — Pollable turn-status endpoints for daemon sessions](https://github.com/QwenLM/qwen-code/pull/8682)**  
   Adds `GET /session/:sessionId/turns/:promptId` and `/turns/current` so clients can poll turn lifecycle states instead of holding long-lived streams.

5. **[#8978 — `serve`: no-op on empty channel set and restore only active channels](https://github.com/QwenLM/qwen-code/pull/8978)**  
   Prevents `--channel all` from crashing when no channels are configured, and makes channel restore more targeted.

6. **[#9086 — Harden `/review` pipeline against four live-run failures](https://github.com/QwenLM/qwen-code/pull/9086)**  
   Fixes four real defects found by running `qwen review run` against open PRs, each pinned with regression tests.

7. **[#9095 — `/review`: close unbounded finding classes instead of enumerating them](https://github.com/QwenLM/qwen-code/pull/9095)**  
   Prompt-level improvements teach review agents to identify entire defect classes prospectively rather than chasing individual instances.

8. **[#9104 — Autofix: escalate non-converging diff to maintainer handoff](https://github.com/QwenLM/qwen-code/pull/9104)**  
   Stops unbounded autofix patching by escalating PRs whose diffs keep growing across rounds to a maintainer decision.

9. **[#9111 — Desktop: open remaining external links through shell opener](https://github.com/QwenLM/qwen-code/pull/9111)**  
   Fixes the remaining Web Shell link surfaces that could be silently dropped by the desktop webview, including MCP OAuth flows.

10. **[#9008 — Security hygiene: CODEOWNERS, least-privilege permissions, Scorecard](https://github.com/QwenLM/qwen-code/pull/9008)**  
    Merged repo-hardening PR: adds CODEOWNERS for release workflows, least-privilege token permissions, and Scorecard checks after the npm audit report.

## Feature Request Trends

- **Multi-agent fleet is the dominant roadmap theme.** The RFC ([#8718](https://github.com/QwenLM/qwen-code/issues/8718)) has evolved into staged implementation ([#8840](https://github.com/QwenLM/qwen-code/issues/8840), [#8841](https://github.com/QwenLM/qwen-code/issues/8841), [#8842](https://github.com/QwenLM/qwen-code/issues/8842), [#8843](https://github.com/QwenLM/qwen-code/issues/8843)) with focus on supervised teammates, persistence, recovery, and terminal attach.

- **Web Shell and Desktop are becoming first-class surfaces.** Requests around channel policy, session isolation, workspace ownership, external link handling, and startup behavior ([#8845](https://github.com/QwenLM/qwen-code/issues/8845), [#9108](https://github.com/QwenLM/qwen-code/issues/9108), [#9043](https://github.com/QwenLM/qwen-code/issues/9043), [#8985](https://github.com/QwenLM/qwen-code/issues/8985)) show growing demand beyond the CLI.

- **Omni multimodal integration remains an active experiment.** The `omni-experiment` issues ([#8197](https://github.com/QwenLM/qwen-code/issues/8197), [#8186](https://github.com/QwenLM/qwen-code/issues/8186)–[#8190](https://github.com/QwenLM/qwen-code/issues/8190)) cover policy-driven media compression, cross-session memory recall, provenance, and GC for long-running systems.

- **Long-lived memory and token management are recurring asks.** Pinned memory directories ([#6801](https://github.com/QwenLM/qwen-code/issues/6801)) and memory recall/reuse ([#8188](https://github.com/QwenLM/qwen-code/issues/8188), [#8189](https://github.com/QwenLM/qwen-code/issues/8189)) indicate users want durable, project-scoped context beyond single sessions.

- **Daemon/headless resilience for background automation.** Issues around safe session restore, activeWork tracking, and empty-channel behavior ([#8678](https://github.com/QwenLM/qwen-code/issues/8678), [#8586](https://github.com/QwenLM/qwen-code/issues/8586), [#8978](https://github.com/QwenLM/qwen-code/pull/8978)) point to a push for dependable unattended operation.

## Developer Pain Points

- **Windows regressions are a recurring theme.** From Ctrl+V paste breaking in 0.21.x ([#9061](https://github.com/QwenLM/qwen-code/issues/9061)) to installer failures ([#7118](https://github.com/QwenLM/qwen-code/issues/7118)) and Desktop runtime Terminal windows ([#9043](https://github.com/QwenLM/qwen-code/issues/9043)), Windows users face repeated platform-specific friction.

- **Cloud/auth setup friction on Vertex AI.** Gemini 2.5 request failures ([#9019](https://github.com/QwenLM/qwen-code/issues/9019)) and keyless ADC not being auto-detected ([#9025](https://github.com/QwenLM/qwen-code/issues/9025)) are blocking headless and Google Cloud users.

- **File/artifact trust issues break agent workflows.** Tools trust file extensions and workspace paths without validating actual bytes or store state ([#9088](https://github.com/QwenLM/qwen-code/issues/9088), [#9083](https://github.com/QwenLM/qwen-code/issues/9083)), leading to aborted turns and missing artifacts.

- **Small-window and resource-constrained deployments hit hard failures.** The `/statusline` dialog clipping ([#9037](https://github.com/QwenLM/qwen-code/issues/9037)) and compression side-query `maxOutputTokens` exceeding context windows ([#7960](https://github.com/QwenLM/qwen-code/issues/7960)) show TUI and token-limit edge cases still need hardening.

- **Security hygiene is being taken seriously by the community.** The npm audit report ([#8944](https://github.com/QwenLM/qwen-code/issues/8944)) prompted visible supply-chain improvements, including CODEOWNERS, least-privilege permissions, and Scorecard integration ([#9008](https://github.com/QwenLM/qwen-code/pull/9008)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-14

## Today's Highlights

CodeWhale shipped **v0.9.7**, formally deprecating the legacy `deepseek-tui` npm package and anchoring the Codewhale branding while keeping lowercase technical identifiers. Maintainers are already moving toward **v0.9.8** with model-guardian auto-review, first-class local DS4 setup, and tool-schema simplification; community PRs are landing fixes for MCP compliance, flaky tests, and shell-completion noise.

## Releases

- **v0.9.7** ([release](https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.7)): Codewhale is now the public product name. The `codewhale` command, npm package, and release-asset names remain lowercase technical identifiers. The legacy `deepseek-tui` npm package is deprecated and receives no further releases; v0.8.x `deepseek` / `d...` users are being migrated to the new package.

## Hot Issues

- [#998 Truncated text display / 文案展示不全](https://github.com/Hmbown/CodeWhale/issues/998) — 11 comments. Users report UI text is cut off and request hover tooltips; high engagement suggests a common readability problem.
- [#5324 Simplify the 32-field agent tool schema](https://github.com/Hmbown/CodeWhale/issues/5324) — 7 comments. Maintainer-opened. The agent tool has 32 properties, zero required fields, eight actions, and alias handling; models error too often, so this is a core reliability target.
- [#2369 CodeWhale config paths fragmented across OS/Cygwin plus silent migration bug](https://github.com/Hmbown/CodeWhale/issues/2369) — 7 comments. Windows/Cygwin resolve config and secret paths differently, and a legacy migration can silently misplace data.
- [#1425 Session hangs on large text processing](https://github.com/Hmbown/CodeWhale/issues/1425) — 6 comments. Analyzing a 3M-character novel spawned 10 sub-agents, but `agent_wait` timeouts interrupted and hung the session. Points to weak sub-agent supervision.
- [#1732 Merging/saving analysis reports is very slow](https://github.com/Hmbown/CodeWhale/issues/1732) — 6 comments. Low cache hit and slow saves when persisting merged reports; a performance issue amplified by long-context sessions.
- [#1829 SSH failure exit code 255 in sandbox](https://github.com/Hmbown/CodeWhale/issues/1829) — 5 comments. Outbound TCP 22 appears blocked by the TUI shell sandbox; breaks common SSH/scp workflows.
- [#1917 Universal PreToolUse/PostToolUse hook layer for Cancel/Pause/Resume](https://github.com/Hmbown/CodeWhale/issues/1917) — 5 comments. Proposal to unify agent lifecycle control across all action types; important architectural direction.
- [#5340 `doctor` first-run/update checkpoint stuck after upgrade](https://github.com/Hmbown/CodeWhale/issues/5340) — 2 comments. Upgrading v0.9.4 → v0.9.6 leaves setup state permanently `needs action`, preventing onboarding completion.
- [#5359 Four TUI tests read machine state and fail on dev boxes](https://github.com/Hmbown/CodeWhale/issues/5359) — 2 comments. Tests read `~/.codewhale` and display probes, so CI stays green while local runs fail; a test-isolation defect.
- [#5374 Agent writing output corrupted on macOS](https://github.com/Hmbown/CodeWhale/issues/5374) — 3 comments. Agent-generated text renders garbled and unreadable; a new user-reported encoding/rendering bug.

## Key PR Progress

- [#5353 Model guardian tier for Auto-Review (v0.9.8)](https://github.com/Hmbown/CodeWhale/pull/5353): Makes Auto-Review a two-layer mode; the deterministic floor stays non-bypassable, and fallback escalates to a one-shot model guardian.
- [#5365 First-class local DS4 setup](https://github.com/Hmbown/CodeWhale/pull/5365): Adds `/setup provider ds4` and provider-picker `D` shortcut; reuses the OpenAI-compatible transport without new adapters.
- [#5369 Degrade Moonshot schemas instead of refusing conditionals](https://github.com/Hmbown/CodeWhale/pull/5369): Prerequisite for #5324; makes schema handling net-negative rather than rejecting conditional schemas.
- [#5368 Confine unguarded tests to isolated state root](https://github.com/Hmbown/CodeWhale/pull/5368): Fixes the four machine-state tests from #5359 with three independent mechanisms, each covered by a regression.
- [#5339 Suppress child-owned shell completions](https://github.com/Hmbown/CodeWhale/pull/5339): Filters child-owned background shell completion events out of the parent model stream; keeps parent completions and task/status visibility.
- [#5358 Auto-review denial rationale + turn circuit breaker](https://github.com/Hmbown/CodeWhale/pull/5358) (closed): P0 fix for auto-review denial loops; blocked actions now carry rationale and trigger a circuit breaker instead of burning through the step budget.
- [#5364 Render markdown blockquotes with a quote rail](https://github.com/Hmbown/CodeWhale/pull/5364) (closed): Replaces literal `>` markers with proper quote-rail rendering, nesting, wrapping, and selection-copy behavior.
- [#5336 Omit `nextCursor` when there are no further pages](https://github.com/Hmbown/CodeWhale/pull/5336) (closed): Makes MCP `tools/list` and `resources/list` spec compliant; strict clients like Claude Code reject `null`.
- [#5333 Pin host terminal as always-on-top mini window](https://github.com/Hmbown/CodeWhale/pull/5333) (closed): Lands the PiP feature from community PR #5318 with CI fixes; `/pin` shrinks the host window to 640x400 and restores on toggle.
- [#5354 Refresh source-structure CI budget](https://github.com/Hmbown/CodeWhale/pull/5354) (closed): Fixes `main` failing its own Lint gate after #5348 missed a budget commit; unblocks contributor PRs.

## Feature Request Trends

- **Input & keymap flexibility**: Multiple users want multi-line input and configurable send shortcuts — [#5345](https://github.com/Hmbown/CodeWhale/issues/5345) — plus a general configurable keymap — [#436](https://github.com/Hmbown/CodeWhale/issues/436).
- **Provider/local-model ergonomics**: Requests for first-class local DeepSeek V4 DS4 setup — [#5363](https://github.com/Hmbown/CodeWhale/issues/5363) — NVIDIA NIM fixes — [#1482](https://github.com/Hmbown/CodeWhale/issues/1482) — and provider-neutral naming/plumbing — [#5106](https://github.com/Hmbown/CodeWhale/pull/5106).
- **Remote workbench & platform reach**: Calls for a US/global remote control lane — [#1990](https://github.com/Hmbown/CodeWhale/issues/1990), unified CNB/Lighthouse/Feishu flow — [#1984](https://github.com/Hmbown/CodeWhale/issues/1984), FreeBSD support — [#1097](https://github.com/Hmbown/CodeWhale/issues/1097), and Windows Terminal as default launcher — [#1854](https://github.com/Hmbown/CodeWhale/issues/1854).
- **Tool-call and agent lifecycle maturity**: Simplify large tool schemas — [#5324](https://github.com/Hmbown/CodeWhale/issues/5324), add universal Pre/PostToolUse hooks — [#1917](https://github.com/Hmbown/CodeWhale/issues/1917), expose model-visible tool-result size limits — [#5367](https://github.com/Hmbown/CodeWhale/issues/5367), and provide an on-demand `tui_help` command — [#1708](https://github.com/Hmbown/CodeWhale/issues/1708).
- **i18n/display polish**: Expand localization beyond core UI — [#790](https://github.com/Hmbown/CodeWhale/issues/790), retire stale zh-Hant partial-pack declarations — [#5334](https://github.com/Hmbown/CodeWhale/pull/5334), and add tooltips for truncated content — [#998](https://github.com/Hmbown/CodeWhale/issues/998).

## Developer Pain Points

- **Scale/stability under large workloads**: Sub-agent timeouts hang sessions — [#1425](https://github.com/Hmbown/CodeWhale/issues/1425); long report saves are extremely slow — [#1732](https://github.com/Hmbown/CodeWhale/issues/1732); YOLO Agent can crash VS Code — [#1651](https://github.com/Hmbown/CodeWhale/issues/1651).
- **Environment/platform inconsistencies**: Config paths diverge on Windows/Cygwin with silent migration issues — [#2369](https://github.com/Hmbown/CodeWhale/issues/2369); SSH outbound is blocked in the sandbox — [#1829](https://github.com/Hmbown/CodeWhale/issues/1829); NIM returns 404 — [#1482](https://github.com/Hmbown/CodeWhale/issues/1482); FreeBSD installs fail — [#1097](https://github.com/Hmbown/CodeWhale/issues/1097).
- **Model/tool contract friction**: Excessively complex schemas cause model errors — [#5324](https://github.com/Hmbown/CodeWhale/issues/5324); Moonshot conditionals are refused — [#5369](https://github.com/Hmbown/CodeWhale/pull/5369); auto-review denials loop without rationale — [#5358](https://github.com/Hmbown/CodeWhale/pull/5358); invalid `nextCursor: null` breaks strict MCP clients — [#5336](https://github.com/Hmbown/CodeWhale/pull/5336).
- **Stateful test/onboarding flakiness**: Tests read real `~/.codewhale` state and fail locally — [#5359](https://github.com/Hmbown/CodeWhale/issues/5359); `codewhale doctor` gets stuck on `first-run`/`update checkpoint` after upgrade — [#5340](https://github.com/Hmbown/CodeWhale/issues/5340).
- **Output rendering/encoding defects**: Chinese real-time output garbles — [#1675](https://github.com/Hmbown/CodeWhale/issues/1675); text truncates without tooltips — [#998](https://github.com/Hmbown/CodeWhale/issues/998); images display out of order — [#894](https://github.com/Hmbown/CodeWhale/issues/894); agent writing is corrupted on macOS — [#5374](https://github.com/Hmbown/CodeWhale/issues/5374).

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*