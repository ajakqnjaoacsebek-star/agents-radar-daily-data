# OpenClaw Ecosystem Digest 2026-08-12

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-12 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-12

## Today's Overview

OpenClaw remains highly active: 500 issues and 500 PRs were updated in the last 24 hours, with 386 issues open and 114 closed, and 273 PRs open versus 227 merged/closed. No new release was published, so the recent stream of merged PRs is likely accumulating toward a future version. The most prominent user-facing theme is reliability — especially silent reply failures, subagent delivery drops, and channel configuration mismatches. Maintainer attention is visible across UI accessibility fixes, channel config validation cleanup, and several high-priority bugs still waiting on product/maintainer review.

## Releases

No new releases in the last 24 hours.

---

## Project Progress

The 24-hour PR throughput is strong — 227 PRs moved to merged/closed status. Sampled notable PRs that closed today:

- [PR #122334](https://github.com/openclaw/openclaw/pull/122334) — `fix(windows): launch npm-installed native session CLIs`
- [PR #122369](https://github.com/openclaw/openclaw/pull/122369) — `improve: speed up audit event writer tests`
- [PR #121818](https://github.com/openclaw/openclaw/pull/121818) — `feat: clone GitHub projects from session picker`
- [PR #107295](https://github.com/openclaw/openclaw/pull/107295) — `refactor(qqbot): install plugin from Tencent package`
- [PR #122312](https://github.com/openclaw/openclaw/pull/122312) — `fix(ui): show a placeholder for remote markdown images`

Several open PRs indicate an ongoing cleanup of channel config validation. Ayaangazali has a series of PRs fixing documented channel overrides that are rejected by schemas, including:

- [PR #118152](https://github.com/openclaw/openclaw/pull/118152) — group-capable channels reject `historyLimit`
- [PR #119326](https://github.com/openclaw/openclaw/pull/119326) — account-scoped history limits ignored
- [PR #117302](https://github.com/openclaw/openclaw/pull/117302) — IRC rejects documented `healthMonitor` override
- [PR #118148](https://github.com/openclaw/openclaw/pull/118148) — bundled channels reject `responsePrefix`
- [PR #118157](https://github.com/openclaw/openclaw/pull/118157) — bundled channels reject `mediaMaxMb`
- [PR #120736](https://github.com/openclaw/openclaw/pull/120736) — core channel keys missing from generated config schema

Other notable open PRs include:

- [PR #122361](https://github.com/openclaw/openclaw/pull/122361) — retain resolved images when one photo in a batch is unreadable
- [PR #122066](https://github.com/openclaw/openclaw/pull/122066) — keyboard access to identity-menu footer controls
- [PR #122316](https://github.com/openclaw/openclaw/pull/122316) — gate model shortcuts by search focus
- [PR #121327](https://github.com/openclaw/openclaw/pull/121327) — freeze installed tool profile authority, ready for maintainer review

---

## Community Hot Topics

The most active issues by comment count reveal deep user concern around reliability, security, and memory trust:

- [#121058 — Silent reply failures still recurring after #116277 was closed](https://github.com/openclaw/openclaw/issues/121058) — 69 comments. Users report the same silent-reply failure mode continues despite the previous fix being marked resolved.
- [#116201 — Realtime voice work can retain unbounded provider and consult state](https://github.com/openclaw/openclaw/issues/116201) — 64 comments. A P1 resource-ownership bug in realtime voice sessions.
- [#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) — 46 comments, 1 👍. Internal agent narration is being posted to Slack/iMessage; includes security impact.
- [#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — 43 comments. Feature request to tag memory entries by trust level to defend against memory poisoning.
- [#92201 — Freshly streamed thinking signatures intermittently invalid on replay](https://github.com/openclaw/openclaw/issues/92201) — 23 comments, now closed.
- [#42475 — Per-agent cost budget enforcement at the gateway](https://github.com/openclaw/openclaw/issues/42475) — 21 comments, 1 👍.

Underlying needs: users want predictable delivery, bounded resource usage, and protection against untrusted memory content. The high comment counts on reliability issues suggest trust in OpenClaw is heavily dependent on fixing silent failures.

---

## Bugs & Stability

### P0 / Critical

- [#121675 — 2026.8.1-beta.1 published without companion @openclaw/* plugins caused boot loop](https://github.com/openclaw/openclaw/issues/121675) — Closed. This was a release-pipeline blocking bug.

### P1 / High Severity

- [#121058 — Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058) — Open, 69 comments. No queued reply payload found; remains the most discussed reliability bug.
- [#121953 — Cron agent turns stall on DeepSeek due to `[cron:jobId]` message prefix](https://github.com/openclaw/openclaw/issues/121953) — Open, P1, has linked PR. New bug.
- [#116201 — Realtime voice retains unbounded provider/consult state](https://github.com/openclaw/openclaw/issues/116201) — Open, P1, needs product decision.
- [#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) — Open, P1, security impact, linked PR exists.
- [#97616 — Leaked unreaped hook/tool child processes cause zombie accumulation](https://github.com/openclaw/openclaw/issues/97616) — Open, P1, needs maintainer review.
- [#87744 — Codex-backed Telegram turns repeatedly time out waiting for turn/completed](https://github.com/openclaw/openclaw/issues/87744) — Open, P1.
- [#74586 — AM embedded run aborts memory_search tool calls; classified as timeout](https://github.com/openclaw/openclaw/issues/74586) — Open, P1.
- [#84516 — Codex app-server: long replies silently truncated at ~1000–1100 chars](https://github.com/openclaw/openclaw/issues/84516) — Open, P1.
- [#39476 — A2A sessions_send can create duplicate messages via back-calls](https://github.com/openclaw/openclaw/issues/39476) — Open, P1, linked PR open.
- [#97983 — iOS/WebChat messages append but do not trigger assistant replies](https://github.com/openclaw/openclaw/issues/97983) — Open, P1.
- [#112668 — sessions_yield abort-settle timeout still drops subagent announce](https://github.com/openclaw/openclaw/issues/112668) — Open, P1.

### Closed stability fixes today

- [#96827 — message_tool_only: agent does not terminate after delivering a source reply](https://github.com/openclaw/openclaw/issues/96827) — Closed.
- [#92076 — Subagent completion delivery can fail when requester run is inactive](https://github.com/openclaw/openclaw/issues/92076) — Closed.
- [#89315 — Gateway heap grows unbounded and gets OOM-killed](https://github.com/openclaw/openclaw/issues/89315) — Closed.
- [#92460 — Isolated cron completion announcer drops delivery.channel](https://github.com/openclaw/openclaw/issues/92460) — Closed.

Several open P1s carry `linked-pr-open` labels, so fixes may already be in progress: #121953, #39476, #25592, and #39811.

---

## Feature Requests & Roadmap Signals

The most-supported feature requests in the current issue dataset:

- [#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — 43 comments. Strong community interest in memory security.
- [#42840 — MathJax/LaTeX support in Control UI](https://github.com/openclaw/openclaw/issues/42840) — 10 👍, 8 comments.
- [#68596 — Configurable streaming watchdog timeout threshold](https://github.com/openclaw/openclaw/issues/68596) — 8 👍, 15 comments.
- [#72741 — Standard interface for external security and guardrail checks](https://github.com/openclaw/openclaw/issues/72741) — 10 comments.
- [#42475 — Per-agent cost budget enforcement at the gateway](https://github.com/openclaw/openclaw/issues/42475) — 21 comments.
- [#13700 — Session snapshots: save/load context checkpoints](https://github.com/openclaw/openclaw/issues/13700) — 6 comments.
- [#47910 — Provider fallback by failure class, quarantine auth-broken providers](https://github.com/openclaw/openclaw/issues/47910) — 8 comments.
- [#71058 — Multiple Azure/Teams bots on a single gateway](https://github.com/openclaw/openclaw/issues/71058) — 8 comments.
- [#39343 — Image batching / media group buffering at gateway layer](https://github.com/openclaw/openclaw/issues/39343) — 5 comments.

Based on the current PR pipeline, the next version will likely include media handling improvements ([#122361](https://github.com/openclaw/openclaw/pull/122361)), UI accessibility and keyboard fixes ([#122066](https://github.com/openclaw/openclaw/pull/122066), [#122316](https://github.com/openclaw/openclaw/pull/122316), [#122237](https://github.com/openclaw/openclaw/pull/122237)), and further channel config validation consistency fixes from the `ayaangazali` PR series.

---

## User Feedback Summary

The loudest feedback is around silent and unreliable message delivery:

- Users repeatedly report failures that produce no visible error or queued reply payload, especially after previous fixes were considered complete — see [#121058](https://github.com/openclaw/openclaw/issues/121058).
- Long outputs being silently truncated is another pain point: [#84516](https://github.com/openclaw/openclaw/issues/84516) reports replies cut at ~1000–1100 chars with no `aborted` flag.
- Session state problems are common: subagents persisting after completion ([#47975](https://github.com/openclaw/openclaw/issues/47975)), main sessions becoming unresponsive, and iOS/WebChat messages not triggering replies ([#97983](https://github.com/openclaw/openclaw/issues/97983)).
- DeepSeek-specific cron stalls ([#121953](https://github.com/openclaw/openclaw/issues/121953)) show that model-provider edge cases are still causing real production issues.
- Strong upvote counts for MathJax rendering ([#42840](https://github.com/openclaw/openclaw/issues/42840)) and configurable watchdog timeout ([#68596](https://github.com/openclaw/openclaw/issues/68596)) show demand for better long-form mathematical output and long-reasoning-model support.

Satisfaction signals are mixed: maintainers closed several high-severity bugs today, but many older P1s remain blocked on `needs-maintainer-review` or `needs-product-decision`.

---

## Backlog Watch

Older or high-importance items still needing maintainer attention:

- [#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) — Open since Feb 24, P1, security impact, `needs-maintainer-review`, linked PR open.
- [#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — Open since Feb 3, 43 comments, `no-new-fix-pr`.
- [#14785 — Reduce tool schema token overhead ~3,500 tok/session](https://github.com/openclaw/openclaw/issues/14785) — Open since Feb 12, P2, `needs-maintainer-review`.
- [#74704 — SDK: stabilize app-client happy path for agents, sessions, runs](https://github.com/openclaw/openclaw/issues/74704) — Open since Apr 30, maintainer-tagged, `no-new-fix-pr`.
- [#97616 — Zombie child process accumulation](https://github.com/openclaw/openclaw/issues/97616) — Open since Jun 29, P1, `needs-info`, `needs-maintainer-review`.
- [#114612 — SQLite unbounded growth in memory_index_chunks / memory_embedding_cache](https://github.com/openclaw/openclaw/issues/114612) — Open since Jul 27, `needs-maintainer-review`, `needs-product-decision`.
- [#87744 — Codex-backed Telegram turns repeatedly time out](https://github.com/openclaw/openclaw/issues/87744) — Open since May 28, P1, `needs-live-repro`.

PRs awaiting maintainer review include [PR #121327](https://github.com/openclaw/openclaw/pull/121327), [PR #122237](https://github.com/openclaw/openclaw/pull/122237), [PR #122066](https://github.com/openclaw/openclaw/pull/122066), and [PR #122316](https://github.com/openclaw/openclaw/pull/122316). These are ready for maintainer look but have not yet moved to merge/close.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date:** 2026-08-12 | **Basis:** 24-hour community digests for 12 projects

---

## 1. Ecosystem Overview

The personal AI assistant ecosystem is bifurcating into gateway-centric multi-channel assistants (OpenClaw, Hermes, CoPaw) and lightweight developer/bot frameworks (NanoBot, PicoClaw, NanoClaw), with a smaller infrastructure cluster (IronClaw, ZeroClaw) building runtime kernels and security control-planes. Activity is dominated by **reliability hardening rather than new features**: silent message-delivery failures, agent-loop repetition, context/memory lifecycle bugs, and execution-sandbox gaps recur across nearly every active project. Only two releases shipped in the window (LobsterAI 2026.8.11, CoPaw v2.1.0-beta.3), indicating most projects are accumulating changes toward larger milestones. A clear architectural convergence is emerging around MCP-based tool integration, OpenAI-compatible API surfaces, and token-economy optimizations.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | PRs Merged/Closed | Release | Health Score* |
|---|---|---|---|---|---|
| OpenClaw | 500 (114 closed) | 500 (227 merged) | 227 | None | 8.0 |
| NanoBot | 6 (4 closed) | 140 (119 merged) | 119 | None | 7.0 |
| Hermes Agent | 50 (2 closed) | 50 (5 merged) | 5 | None | 7.0 |
| PicoClaw | 3 (1 closed) | 6 | 0 | None | 5.0 |
| NanoClaw | 1 | 8 (3 merged) | 3 | None | 6.5 |
| IronClaw | 22 (9 closed) | 50 (25 merged) | 25 | None | 8.0 |
| LobsterAI | 4 (3 closed) | ~10 (7 merged) | 7 | **2026.8.11** | 8.0 |
| Moltis | 0 | 1 | 0 | None | 5.0 |
| CoPaw (QwenPaw) | 22 (13 closed) | 48 (25 merged) | 25 | **v2.1.0-beta.3** | 7.5 |
| ZeroClaw | 50 (10 closed) | 50 (1 merged) | 1 | None | 6.0 |
| NullClaw / ZeptoClaw | 0 | 0 | 0 | None | N/A (dormant) |

*\*Health score = composite of throughput, merge ratio, release cadence, open critical-severity bugs, and maintainer responsiveness (0–10).*

---

## 3. OpenClaw's Position

**Advantages:**
- **Unmatched community scale** — 500 PRs and 500 issues updated in 24h, ~3.6× NanoBot's PR volume and ~10× most peers. Deep engagement is visible in issue threads (69 comments on #121058).
- **Reference-implementation status** — the broadest channel matrix in the ecosystem (Slack, iMessage, IRC, Telegram, QQ, Discord, iOS/WebChat), with an active plugin ecosystem (`@openclaw/*`).
- **Fast throughput** — 227 PRs merged/closed in a single day, including meaningful fixes (Windows native CLIs, plugin packaging, media handling).
- **Stability fixes are landing** — 4 high-severity issues closed today (subagent delivery, gateway OOM, cron announcer, message_tool_only termination).

**Technical approach differences:**
- Gateway-centric architecture with per-channel config schemas; currently investing heavily in channel-config validation consistency (the `ayaangazali` PR series).
- Session/subagent model (A2A-style sessions) that peers are beginning to mirror (IronClaw's ACP executor, CoPaw's subagents).

**Weaknesses vs peers:**
- The **silent reply failure** (#121058) remains the most-discussed bug in the ecosystem and directly damages user trust.
- Many P1s are blocked on `needs-product-decision` / `needs-maintainer-review` — the issue queue is the largest but also the most backlog-heavy.
- No release has shipped while accumulating 227 merged PRs — version cadence lags LobsterAI and CoPaw.

---

## 4. Shared Technical Focus Areas

These requirements emerged independently across multiple projects:

| Focus Area | Projects | Representative Signals |
|---|---|---|
| **Delivery reliability / no silent failures** | OpenClaw, NanoClaw, CoPaw, NanoBot, Hermes | OpenClaw #121058 (silent replies, 69 comments); NanoClaw #3226 (message-ID reuse drops messages); CoPaw #6918 (shadow sessions); NanoBot #5256 (`/goal` reply storms) |
| **Security & least-privilege execution** | NanoBot, ZeroClaw, Hermes, CoPaw, OpenClaw | NanoBot #5306 (`exec.allowPatterns` bypass); ZeroClaw #9872 (sandbox workspace violation) + #7155 (shell confirmation tier); Hermes #84199 (cross-provider key leakage); CoPaw #6916 (plugin cron injection) |
| **Context/memory lifecycle correctness** | PicoClaw, IronClaw, CoPaw, Hermes, OpenClaw, ZeroClaw | PicoClaw #3301 (routed sessions lose memory); IronClaw #7484/#7485 (task eviction, token double-counting); CoPaw #6564 (compression flushes); Hermes #6839 (lazy tool schemas); OpenClaw #114612 (SQLite memory growth) |
| **Token/cost governance** | OpenClaw, Hermes, IronClaw, ZeroClaw, LobsterAI | OpenClaw #42475 (per-agent cost budgets); Hermes #6839 (18👍); IronClaw #6997 (Anthropic cache_control); ZeroClaw #2269 (cost RFI); LobsterAI #1240 (provider lockout) |
| **Channel config validation & parity** | OpenClaw, PicoClaw, NanoClaw, CoPaw, Hermes | OpenClaw schema-rejection series; PicoClaw #3328 (inert webhook config); NanoClaw #3145 (destination backfill); CoPaw #6909 (bot conflict warning) |
| **Agent-loop stability / repetition** | NanoBot, OpenClaw, IronClaw, CoPaw, Hermes | NanoBot #5344 (identical tool-call spirals); OpenClaw #97616 (zombie processes); IronClaw #7486 (no-progress false positives); CoPaw #6918 |
| **Ecosystem interop (MCP, OpenAI-compatible APIs)** | NanoClaw, NanoBot, ZeroClaw, IronClaw, CoPaw | NanoClaw streamable-HTTP MCP across providers; ZeroClaw #8603 (Chat Completions profile); NanoBot OrcaRouter; IronClaw ACP executor |

---

## 5. Differentiation Analysis

| Project | Core Focus | Target Users | Architectural Signature |
|---|---|---|---|
| **OpenClaw** | Universal multi-channel gateway | Self-hosters, power users, channel-heavy deployments | Gateway core + per-channel schema configs + plugin ecosystem |
| **NanoBot** | Lightweight Python agent runtime | Developers embedding agents | Exec/sandbox-centric, rapid PR triage, minimal footprint |
| **Hermes Agent** | Desktop-first research agent | Individual power users on Win/macOS | God-file sharding refactor, desktop lifecycle, holographic memory |
| **PicoClaw** | Embedded/resource-constrained bots | Maker/edge (Sipeed), Telegram/Discord | Dispatch-rule routing, low-footprint |
| **NanoClaw** | Template/plugin-driven agents | macOS local users | Agent Plugins 1.0.0 migration, transactional upgrades |
| **IronClaw** | Durable agent-loop kernel | NEAR/AI cloud users | "Reborn" loop kernel, lease recovery, ACP executor, staking |
| **LobsterAI** | Desktop Cowork collaboration | NetEase Youdao users, desktop multitaskers | Multi-agent Cowork UI, local-file workflows, release discipline |
| **CoPaw (QwenPaw)** | Chinese-ecosystem desktop console | Chinese-speaking users, Qwen stack | Console code-block/LaTeX UX, WeChat/QQ channels, AgentScope lineage |
| **ZeroClaw** | Security/SOP control-plane runtime | Infrastructure operators | RFC-driven governance, Rust control-plane, sandbox-bound delegation |
| **Moltis** | Local-first personal data | Privacy-focused users | CalDAV connectors, read-only agent data tools |

---

## 6. Community Momentum & Maturity

**Tier 1 — Hyper-scale (ecosystem reference):**
- **OpenClaw** — highest absolute churn; accumulating toward a major release; P1 backlog is the main risk.

**Tier 2 — High-velocity (iterating rapidly):**
- **NanoBot** — aggressive triage mode; 119 PRs closed, but mostly conflict-closures of stale work; open security issue needs triage.
- **IronClaw** — focused QA/stabilization push; 25 PRs merged; pre-release (v1.3.0 roadmap labels).
- **CoPaw** — beta phase toward stable v2.1.0; shipping releases while new crash reports (#6918/#6919) show regression gaps.
- **ZeroClaw** — high activity but **maintainer decision bottleneck** (49 of 50 PRs open); architecture/RFC phase, low merge throughput.
- **Hermes** — responsive to regressions (fix PRs within 24h) but mid-refactor; desktop lifecycle P1s linger.

**Tier 3 — Steady/feature-driven:**
- **LobsterAI** — healthiest release cadence; stable, user-driven polish.
- **NanoClaw** — moderate velocity; mid-migration to Agent Plugins; silent message loss is a trust risk.
- **PicoClaw** — development-heavy but zero merges in window; review throughput is the bottleneck.

**Tier 4 — Quiet/dormant:**
- **Moltis** (1 open PR), **NullClaw**, **ZeptoClaw** (no activity).

---

## 7. Trend Signals

1. **Reliability is the new feature.** Silent delivery failures are the #1 cross-project complaint (OpenClaw, NanoClaw, CoPaw, NanoBot). Users tolerate missing features far less than missing replies.

2. **Security sandboxing is going mainstream.** Command-allowlist bypasses, API-key isolation, SSRF gating, plugin permission models, and workspace-boundary enforcement appear simultaneously across NanoBot, ZeroClaw, Hermes, CoPaw, and OpenClaw — expect least-privilege execution to become a default expectation.

3. **Memory is now an attack surface.** Memory poisoning defense (OpenClaw #7707) and memory lifecycle bugs (PicoClaw, CoPaw, IronClaw) signal that persistent memory is moving from feature to trust-critical infrastructure.

4. **Token economy is a design constraint.** Lazy tool-schema loading, explicit `cache_control` breakpoints, per-agent cost budgets, and context compaction are being driven by real production cost pain (ZeroClaw RFI #2269, Hermes 18👍).

5. **OpenAI-compatible API is the universal integration surface.** ZeroClaw's Chat Completions RFC, NanoBot's router providers, and CopilotKit integration requests all point to compatibility as the ecosystem's lingua franca.

6. **MCP is winning the tool-integration standard.** Streamable-HTTP MCP support is being implemented cross-provider (NanoClaw), alongside ACP executor work (IronClaw) and skill-based tools (Tavily, Exa) — a convergence around standard tool protocols.

7. **Desktop lifecycle quality is the weak underbelly.** Windows update failures, gateway-restart bugs, Chinese IME crashes, and settings-loss issues span Hermes, CoPaw, LobsterAI, and OpenClaw — cross-platform packaging remains immature across the industry.

8. **Multi-agent/tenant architecture is still unsettled.** Shadow sessions (CoPaw), subagent delivery drops (OpenClaw), tenant isolation bypasses (Hermes), and per-session sandboxes (NanoBot) indicate the multi-agent model is the next architectural battleground.

**Value for developers:** prioritize delivery guarantees with visible failure handling, sandboxed execution by default, context/token efficiency, and standard-compatible API surfaces. Projects that solve silent failures and memory trust will capture the most user confidence in the next cycle.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview

NanoBot is in a high-velocity maintenance and triage phase. 140 pull requests were updated in the last 24 hours, with 119 closed/merged and 21 still open, while 4 of 6 updated issues were closed. No release was published, so all of this activity currently lives on the default branch. The maintainers are actively closing stale/conflicting PRs, but several high-signal open security and agent-loop issues remain. Overall project health is strong, but the open `exec.allowPatterns` bypass and repeated-reply bugs still need attention.

## 2. Releases

None.  
No new versions or tags were published on 2026-08-12, so there are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress

In the last 24 hours, 119 PRs were marked merged or closed. Among the visible top-PR set, most closed PRs are older contributions closed as **[conflict]**, indicating maintainers are aggressively triaging stale or unmergeable work.

Closed/conflict PRs seen today include:

- **Xiaomi MiMo provider support** — [PR #2181](https://github.com/HKUDS/nanobot/pull/2181)
- **Contributing guidelines for small incremental PRs** — [PR #1383](https://github.com/HKUDS/nanobot/pull/1383)
- **Kimi-coding model mapping and endpoint** — [PR #1367](https://github.com/HKUDS/nanobot/pull/1367)
- **Tavily search tool support** — [PR #1321](https://github.com/HKUDS/nanobot/pull/1321)
- **Fallback model support for transient LLM failures** — [PR #1199](https://github.com/HKUDS/nanobot/pull/1199)
- **Cron job hot reload** — [PR #1114](https://github.com/HKUDS/nanobot/pull/1114)
- **OpenCode Zen provider support** — [PR #1094](https://github.com/HKUDS/nanobot/pull/1094)
- **`LLM_TIMEOUT` environment variable** — [PR #1031](https://github.com/HKUDS/nanobot/pull/1031)
- **Telegram inline keyboard support** — [PR #1020](https://github.com/HKUDS/nanobot/pull/1020)
- **Cron channel metadata propagation** — [PR #1002](https://github.com/HKUDS/nanobot/pull/1002)

Open PRs also show active work on stability and new features, including MCP credential preservation, exec process-tree cleanup, repeated tool-call detection, WebUI app discovery redesign, provider additions, and per-session sandbox isolation.

## 4. Community Hot Topics

The most active issue by comment count is:

- **[#5327 — Nanobot repeats multiple times the same message while reasoning](https://github.com/HKUDS/nanobot/issues/5327)** — 10 comments, closed.  
  This was the highest-discussion item of the day. Users reported the agent randomly repeating phrases such as “Good points, let me investigate the issue” during reasoning. The underlying need is predictable, non-repetitive agent behavior.

Other notable community discussions:

- **[#5256 — `/goal` message produces dozens of repeated replies](https://github.com/HKUDS/nanobot/issues/5256)** — 2 comments, open.  
  A single `/goal` message caused many near-identical replies while the agent waited for user input. This is a major UX/control issue.

- **[#5306 — `exec.allowPatterns` shell-chain bypass](https://github.com/HKUDS/nanobot/issues/5306)** — 1 comment, open.  
  Security researcher report about command-execution allowlist bypass. Low comment count but high severity.

PR comment counts were not surfaced in the provided data, but the open PRs **[#5344](https://github.com/HKUDS/nanobot/pull/5344)** and **[#5346](https://github.com/HKUDS/nanobot/pull/5346)** directly respond to community complaints about agent loops and orphaned child processes.

## 5. Bugs & Stability

Ranked by severity:

1. **High — `exec.allowPatterns` shell-chain bypass**  
   [Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) — open.  
   Allows unintended command execution even when shell commands are restricted by allow patterns. No dedicated fix PR is visible in today’s data.

2. **High — Provider API keys leaked between providers via global `os.environ` mutation**  
   [Issue #4784](https://github.com/HKUDS/nanobot/issues/4784) — closed.  
   Gateway providers could overwrite API keys in the global environment, causing keys to leak across providers.

3. **High — CLI apps run with full `os.environ`, leaking API keys to subprocesses**  
   [Issue #4783](https://github.com/HKUDS/nanobot/issues/4783) — closed.  
   Installed CLI applications could read provider API keys because subprocesses inherited the unfiltered environment.

4. **Medium/High — `/goal` produces dozens of repeated replies**  
   [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) — open.  
   Sustained goals can loop until the user intervenes. A fix PR exists: **[#5257 — Bound sustained-goal continuation when the turn goes idle](https://github.com/HKUDS/nanobot/pull/5257)**.

5. **Medium — Repeated same message while reasoning**  
   [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) — closed after 10 comments.  
   Likely fixed or mitigated, but no explicit fix PR was listed in the current data.

Stability-hardening PRs in flight:

- **[#5346 — fix(exec): terminate one-shot process trees on cleanup](https://github.com/HKUDS/nanobot/pull/5346)**
- **[#5344 — fix(agent): warn instead of silently spiraling on repeated identical tool calls](https://github.com/HKUDS/nanobot/pull/5344)**

## 6. Feature Requests & Roadmap Signals

Community-requested features and likely roadmap candidates:

- **OpenRouter server tools support**  
  [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333) — closed enhancement request.  
  User asked for support for OpenRouter server tools such as Web Search, Web Fetch, and Fusion, noting that earlier commits may have partially added this capability.

- **OrcaRouter as a named gateway provider**  
  [PR #5328](https://github.com/HKUDS/nanobot/pull/5328) — open.  
  Adds an OpenAI-compatible router gateway with 150+ models and zero-trust security claims.

- **WebUI apps discovery redesign**  
  [PR #5342](https://github.com/HKUDS/nanobot/pull/5342) — open.  
  Redesigns around Discover, Installed, All apps, and custom MCP setup, with curated featured apps.

- **Per-session sandbox isolation for non-WebUI channels**  
  [PR #5283](https://github.com/HKUDS/nanobot/pull/5283) — open.  
  Opt-in filesystem isolation per session, likely to become a security-focused feature.

- **Subagents with configurable model presets**  
  [PR #4291](https://github.com/HKUDS/nanobot/pull/4291) — open.  
  Allows `spawn` to use named model presets instead of the parent model.

- **Windows-safe weather skill**  
  [PR #5341](https://github.com/HKUDS/nanobot/pull/5341) — open.  
  Fixes bare `curl` alias issues in PowerShell.

Older PRs closed as conflicts — Tavily search, Telegram inline keyboards, fallback models, OpenCode Zen, Xiaomi MiMo, and kimi-coding — show repeated community interest in broader provider and platform integration. Some of these may return as rebased PRs.

## 7. User Feedback Summary

Users are generally enthusiastic about NanoBot but are hitting real reliability issues in agent loops and security boundaries.

- **Positive sentiment:** [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333) explicitly thanks maintainers for “creating such an amazing project.”
- **Main pain point:** repeated identical replies, especially during goals or reasoning. Users describe the agent looking “frozen” and requiring manual intervention. See [#5327](https://github.com/HKUDS/nanobot/issues/5327) and [#5256](https://github.com/HKUDS/nanobot/issues/5256).
- **Security concerns:** users are reporting API key leakage and command-allowlist bypasses, indicating a desire for stronger sandboxing and least-privilege execution. See [#4784](https://github.com/HKUDS/nanobot/issues/4784), [#4783](https://github.com/HKUDS/nanobot/issues/4783), [#5306](https://github.com/HKUDS/nanobot/issues/5306).
- **Ecosystem demand:** users want more providers, platform-native tools, and richer WebUI/MCP experiences. Evidence includes OpenRouter server tools [#5333](https://github.com/HKUDS/nanobot/issues/5333), OrcaRouter [#5328](https://github.com/HKUDS/nanobot/pull/5328), and WebUI redesign [#5342](https://github.com/HKUDS/nanobot/pull/5342).

## 8. Backlog Watch

Issues and PRs that need maintainer attention:

- **[#5306 — `exec.allowPatterns` shell-chain bypass](https://github.com/HKUDS/nanobot/issues/5306)** — open security issue since Aug 9, only 1 comment. Needs immediate triage.

- **[#5256 — `/goal` repeated replies](https://github.com/HKUDS/nanobot/issues/5256)** — open since Aug 5, with fix PR **[#5257](https://github.com/HKUDS/nanobot/pull/5257)** still open. Needs review and likely merge.

- **[#5283 — per-session sandbox isolation](https://github.com/HKUDS/nanobot/pull/5283)** — open since Aug 7, no comments surfaced. Significant security/architecture change.

- **[#4291 — subagent model presets](https://github.com/HKUDS/nanobot/pull/4291)** — open since Jun 11, labeled `conflict`. Needs maintainer decision: rebase or close.

- **[#4145 — Weather Skill](https://github.com/HKUDS/nanobot/pull/4145)** — open since Jun 1, labeled `conflict`. Needs review or explicit closure.

- **[#5344 — repeated identical tool-call spiral warning](https://github.com/HKUDS/nanobot/pull/5344)** — open, no comments yet. Important for agent-loop stability.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-12

## Today's Overview

Hermes Agent is in a high-volume maintenance and refactoring cycle: 50 issues and 50 PRs were updated in the last 24 hours, with 2 issues closed and 5 PRs merged/closed. No new release was published. The dominant themes are repo-wide god-file sharding, Windows/macOS desktop lifecycle regressions, and gateway/session reliability fixes. Maintainer response appears quick — several P1 regressions already have fix PRs open or closed within the same window.

## Releases

No new releases were published during the reporting window.

## Project Progress

Two closed PRs are identifiable from the top-20 sample of the 5 merged/closed PRs:

- [PR #62058](https://github.com/NousResearch/hermes-agent/pull/62058) — `fix(web): rotate PTY attach token on session switch` (closed). Fixes an empty terminal view in the Dashboard when switching sessions.
- [PR #84019](https://github.com/NousResearch/hermes-agent/pull/84019) — `fix(video): stop retries after terminal analysis failure` (closed). Prevents repeated paid model requests after a failed `video_analyze` call.

Several active PRs advanced today and directly address reported bugs:

- [PR #84198](https://github.com/NousResearch/hermes-agent/pull/84198) — makes post-`/reset` sessions visible in session lists, fixing #84109.
- [PR #83720](https://github.com/NousResearch/hermes-agent/pull/83720) — stops desktop restart from reaping the live gateway, fixing #83683.
- [PR #84199](https://github.com/NousResearch/hermes-agent/pull/84199) — fixes `model_aliases` API-key handling and cross-provider key leakage.
- [PR #84203](https://github.com/NousResearch/hermes-agent/pull/84203) — closes two gateway lifecycle-guard bypasses and one false positive.
- [PR #84201](https://github.com/NousResearch/hermes-agent/pull/84201) — prevents leaked delegated-child markers from blocking Kanban CLI mutations.

## Community Hot Topics

The most active issues by comment count reveal strong community interest in architecture, token efficiency, and multi-tenancy:

- [Issue #78647](https://github.com/NousResearch/hermes-agent/issues/78647) — *Epic: Shard all 20 god files* (67 comments). A standing repo-wide policy to shard god files; community is tracking decomposition progress closely.
- [Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839) — *Lazy Tool Schema Loading — Two-Pass Tool Injection to Reduce Token Overhead* (38 comments, 18 👍). The highest-reaction issue in the sample; underlying need is reducing 3.5k–5k tokens consumed by full tool schemas on every API call.
- [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) — *Solving the Multi-Tenant Hermes Problem* (25 comments, 3 👍). Memory operations bypass the hook system, making tenant isolation impossible without forking core.
- [Issue #67442](https://github.com/NousResearch/hermes-agent/issues/67442) — *Cross-process turn serialization: CLI-continuity sessions need a DB-level lease* (14 comments). A narrow but important edge case for multi-process session safety.
- [Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616) — *Skills index is stale or degraded* (13 comments). Automated freshness probe failure; docs/skills index is 29.8h old against a 26h limit.
- [Issue #78642](https://github.com/NousResearch/hermes-agent/issues/78642) — *Shard tools/mcp_tool.py* (12 comments). Part of the god-file decomposition epic for a 7,230-line file.

## Bugs & Stability

Reported or updated bugs ranked by severity. P1 desktop/gateway lifecycle issues dominate.

| Severity | Bug | Status / Fix |
|---|---|---|
| P1 | [Issue #84185](https://github.com/NousResearch/hermes-agent/issues/84185) — Windows: gateway cold-started after `hermes update` dies silently, no logs/PID | Open; no fix PR identified |
| P1 | [Issue #84200](https://github.com/NousResearch/hermes-agent/issues/84200) — macOS: Desktop backend startup SIGTERMs the launchd-managed gateway | Open; duplicate of related lifecycle reports |
| P1 | [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683) — Desktop restart reaps live gateway but never relaunches it; WeChat/QQ/Telegram go silent | [PR #83720](https://github.com/NousResearch/hermes-agent/pull/83720) open |
| P1 | [Issue #84109](https://github.com/NousResearch/hermes-agent/issues/84109) — Post-reset gateway sessions invisible in all session lists | [PR #84198](https://github.com/NousResearch/hermes-agent/pull/84198) open |
| P1 | [Issue #83562](https://github.com/NousResearch/hermes-agent/issues/83562) — Windows Desktop update: backend works manually but Desktop reports `Hermes backend exited (0)` | Open; no fix PR identified |
| P1 | [Issue #63717](https://github.com/NousResearch/hermes-agent/issues/63717) — Windows Desktop update failures with 7 correlated root causes | Open |
| P1 | [Issue #62792](https://github.com/NousResearch/hermes-agent/issues/62792) — Desktop backend uses venv Python on Windows, holding `.pyd` locks that block updates | Open |
| P2 | [Issue #83427](https://github.com/NousResearch/hermes-agent/issues/83427) — `browser_exec` crashes with `pydantic_core ModuleNotFoundError` when `PYTHONPATH` points at Hermes venv | Open |
| P2 | [Issue #83213](https://github.com/NousResearch/hermes-agent/issues/83213) — Background process completion notifications misrouted to wrong session after `/new` | Open |
| P2 | [Issue #83448](https://github.com/NousResearch/hermes-agent/issues/83448) — `hermes kanban show` fails with `sqlite3.ProgrammingError` on closed DB; [Issue #84089](https://github.com/NousResearch/hermes-agent/issues/84089) closed as duplicate | Open |
| P2 | [Issue #84102](https://github.com/NousResearch/hermes-agent/issues/84102) — Local TTS providers write Ogg/Vorbis into `.ogg` paths, degrading platform voice bubbles | Open |
| P2 | [Issue #84171](https://github.com/NousResearch/hermes-agent/issues/84171) — `webhook --deliver telegram/all` silently fails; only origin works | Open |
| P2 | [Issue #82846](https://github.com/NousResearch/hermes-agent/issues/82846) — Smart-approval auxiliary LLM call has no enforced timeout, wedging the session | Open |

## Feature Requests & Roadmap Signals

Several feature requests with `needs-decision` or active implementation PRs are strong roadmap signals:

- [Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839) — *Lazy Tool Schema Loading* remains the most-supported feature request (18 👍) and directly targets token cost for local models. High candidate for a future release, but still needs a maintainer decision.
- [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) — *Multi-Tenant Hermes* is a larger architectural request; the submitter has run a production fix for months and wants core memory operations to respect tenant hooks.
- [Issue #83244](https://github.com/NousResearch/hermes-agent/issues/83244) — *Add Antigravity (Google) as a first-class OAuth provider*: exposes Claude Sonnet 4.6, Opus 4.6, and Gemini 3.x via Google OAuth.
- [PR #84202](https://github.com/NousResearch/hermes-agent/pull/84202) — *Add OneBot 11 platform adapter* (NapCat/Lagrange/LLOneBot) for QQ via local bridges. Already implemented, so likely near-term.
- [PR #84196](https://github.com/NousResearch/hermes-agent/pull/84196) — *Scoped owner command ingress for WhatsApp*: default-off, low-risk addition.
- [PR #84192](https://github.com/NousResearch/hermes-agent/pull/84192) — *Rich plugin OS notifications with deeplink activation*: extends `ctx.os` with icons, action buttons, and plugin-owned UI activation.

## User Feedback Summary

Community feedback this window is heavily weighted toward desktop lifecycle pain and update friction. Users report repeated Windows update failures, locked executables, permission errors, and desktop-app restarts killing messaging gateways. Several issues are duplicates or closely related:

- [Issue #68760](https://github.com/NousResearch/hermes-agent/issues/68760) — `hermes.exe` locked during `hermes update` (WinError 32)
- [Issue #82186](https://github.com/NousResearch/hermes-agent/issues/82186) — Desktop update button fails with `WinError 5` since Hermes-managed Node introduction
- [Issue #84200](https://github.com/NousResearch/hermes-agent/issues/84200) — macOS Desktop backend kills launchd-managed gateway

There is also expressed dissatisfaction with session persistence regressions: post-reset sessions are invisible ([#84109](https://github.com/NousResearch/hermes-agent/issues/84109)), background completion notifications go to the wrong session ([#83213](https://github.com/NousResearch/hermes-agent/issues/83213)), and assistant replies can be missing after switching tabs ([#80149](https://github.com/NousResearch/hermes-agent/issues/80149)). On the positive side, maintainers have been responsive — fix PRs for the most visible P1 regressions landed within 24 hours.

## Backlog Watch

Several important items remain open and need maintainer attention:

- [Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839) — Lazy Tool Schema Loading: open since Apr 9, 38 comments, 18 👍, still `needs-decision`.
- [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) — Multi-Tenant Hermes: open since May 29, 25 comments, `needs-decision`, with a production-ready user patch.
- [Issue #29590](https://github.com/NousResearch/hermes-agent/issues/29590) — Hardcoded `max_tokens` and verbose prompt in `vision_tools.py` cause severe latency for reasoning models; open since May 21.
- [Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index freshness probe degraded since Jul 18; automated watchdog issue still unresolved.
- [PR #56467](https://github.com/NousResearch/hermes-agent/pull/56467) — Include Homebrew/Linuxbrew bin dirs in service PATH; open since Jul 1.
- [PR #56833](https://github.com/NousResearch/hermes-agent/pull/56833) — Soften MCP circuit-breaker error messages to avoid model over-adherence; open since Jul 2.
- [PR #68908](https://github.com/NousResearch/hermes-agent/pull/68908) — Survive cross-session `hrr_dim` drift in holographic memory; open since Jul 21.
- [PR #68948](https://github.com/NousResearch/hermes-agent/pull/68948) — Retire the compound-background rewriter on Windows; open since Jul 21.
- [PR #69076](https://github.com/NousResearch/hermes-agent/pull/69076) — Assign spawned shells to a kill-on-exit Job Object on Windows; open since Jul 22.
- [PR #72671](https://github.com/NousResearch/hermes-agent/pull/72671) — Fix background cleanup fixture in gateway tests; open since Jul 27 and currently `MERGEABLE / BLOCKED` with no review attached.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-12

## Today’s Overview

PicoClaw is showing active but somewhat stalled activity: in the last 24 hours, 3 issues were updated (2 still open, 1 closed) and 6 pull requests were updated, but no PR was merged or closed and no new release was published. The open PRs mix concrete bug fixes and feature additions, including one new PR (#3329) that directly fixes a config issue reported today. The project appears to be in a development-heavy phase, but maintainer review/merge throughput looks like a potential bottleneck since multiple older PRs remain open.

---

## Releases

No new releases in the last 24 hours. The most recently referenced user-facing version remains **v0.3.1**.

---

## Project Progress

- **No PRs were merged or closed today.**
- One issue was closed: [#3294 [stale] `/list models` only shows the current model instead of all configured models](https://github.com/sipeed/picoclaw/issues/3294).
- Notable open PRs continue to advance:
  - [#3316 fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316)
  - [#3314 Fix: agent not able to execute shell command added to `customAllowPatterns`](https://github.com/sipeed/picoclaw/pull/3314)
  - [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)
  - [#3317 feat(providers): log prompt cache tokens in LLM response debug output](https://github.com/sipeed/picoclaw/pull/3317)
  - [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)

---

## Community Hot Topics

The most active discussions, both with 3 comments, are:

- [#3301 [BUG] `/clear` and session auto-compression don’t work in chats routed to non-default agent via dispatch rules](https://github.com/sipeed/picoclaw/issues/3301)  
  This open issue reflects a real workflow problem: users rely on dispatch rules for channel/agent routing, but context management breaks for those routed sessions. The underlying need is for routing to preserve full session behavior — memory, history, and auto-compression.

- [#3294 [stale] `/list models` only shows the current model instead of all configured models](https://github.com/sipeed/picoclaw/issues/3294)  
  Now closed as stale, but the comments indicate a usability expectation mismatch: `/list models` should show the complete configured model list, not just the active model. This is likely to resurface if users keep hitting it.

No PRs have recorded comments/reactions in this snapshot.

---

## Bugs & Stability

Ranked by severity:

1. **[#3301] Routed-agent context management is broken — `/clear` and auto-compression do nothing**  
   https://github.com/sipeed/picoclaw/issues/3301  
   Affects chats routed via dispatch rules to non-default agents. Users report sessions not remembering previous messages and auto-compaction never triggering. Severity: **High** — core session behavior is degraded.  
   **Fix PR exists:** [#3316](https://github.com/sipeed/picoclaw/pull/3316), still open.

2. **[#3328] `line.settings.webhook_host` / `webhook_port` are declared and documented but never read**  
   https://github.com/sipeed/picoclaw/issues/3328  
   Configuration is silently ignored, making LINE webhook setup confusing. Severity: **Medium** — config surface is misleading.  
   **Fix PR exists:** [#3329](https://github.com/sipeed/picoclaw/pull/3329), opened today.

3. **Shell allowlist bug fixed by PR**  
   [#3314](https://github.com/sipeed/picoclaw/pull/3314) fixes `customAllowPatterns` being overridden by default deny patterns in `guardCommand`, which blocked commands like `git push` even when explicitly allowed. Severity: **Medium** — security-relevant but functional impact for power users.

No crashes or regressions were reported in the last 24 hours.

---

## Feature Requests & Roadmap Signals

Several PRs point to likely roadmap direction:

- **Native Exa web search provider**  
  [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)  
  Adds `tools.web` / `web_search` support for Exa, including date range filters. This suggests continued investment in web search integrations.

- **Telegram topics in private bot chats**  
  [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)  
  Extends Telegram topic handling beyond forum supergroups to private chats with `IsTopicMessage`. Indicates Telegram UX parity work.

- **Better LLM usage observability**  
  [#3317 feat(providers): log prompt cache tokens in LLM response debug output](https://github.com/sipeed/picoclaw/pull/3317)  
  Provision for prompt-cache token logging, especially relevant for providers like DeepSeek/Cloudflare AI Gateway. Points toward cost/debugging transparency improvements.

These features, if merged, are strong candidates for the next PicoClaw release. The stale-closed `/list models` issue (#3294) also hints at expected improvements to model introspection commands.

---

## User Feedback Summary

Real user pain points visible in today’s data:

- **Routed agent sessions lose memory and auto-compaction does not trigger** in Discord/Telegram channels handled via dispatch rules ([#3301](https://github.com/sipeed/picoclaw/issues/3301)).
- **Shell execution allowlists are misleading**: adding a command to `customAllowPatterns` did not work because default deny patterns always took precedence ([#3314](https://github.com/sipeed/picoclaw/pull/3314)).
- **LINE webhook configuration appears broken by design**: `webhook_host` and `webhook_port` have no consumer, so users cannot effectively change the webhook endpoint ([#3328](https://github.com/sipeed/picoclaw/issues/3328)).
- **Telegram configuration discoverability issue**: `/list models` only shows the current model, not all configured models, causing confusion ([#3294](https://github.com/sipeed/picoclaw/issues/3294)).

Overall, the feedback is mostly negative in tone, centered on config/routing behavior not matching documented or expected behavior. No positive satisfaction signals were recorded in this snapshot.

---

## Backlog Watch

Items that may need maintainer attention:

- **Oldest open PR: [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)**  
  Opened 2026-07-26 and still open after 2+ weeks, with no merge/close activity. It is a substantive feature PR that has already been marked `[stale]`.

- **Unmerged fix for reported bug: [#3316 routed-agent context management fix](https://github.com/sipeed/picoclaw/pull/3316)**  
  Directly addresses the still-open issue [#3301](https://github.com/sipeed/picoclaw/issues/3301). Keeping this unmerged leaves a known bug affecting production use cases unresolved.

- **Should be reviewed quickly: [#3329 fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329)**  
  This is a small, targeted fix for a bug reported today and should be a low-cost merge candidate.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-12

## 1. Today's Overview

NanoClaw showed moderate development activity in the 2026-08-12 update window: 1 issue was updated and remains open, 8 PRs were updated, and 3 PRs are now closed/merged. No new release was published. Active work is concentrated around MCP server support, the agent template-to-plugin migration, and reliability improvements such as transactional upgrades and database backfills. The one newly active issue is a user-facing silent message-loss bug that warrants prompt triage.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

**Closed/merged PRs:**

- [#3221](https://github.com/qwibitai/nanoclaw/pull/3221) — Remote Streamable HTTP MCP servers are now supported for the `codex` and `opencode` providers. This closes the config-write gap left by [#3092](https://github.com/qwibitai/nanoclaw/pull/3092).
- [#3092](https://github.com/qwibitai/nanoclaw/pull/3092) — Core engine and Claude provider support for remote Streamable HTTP MCP servers.
- [#3190](https://github.com/qwibitai/nanoclaw/pull/3190) — Added a Tavily MCP tool skill, a standalone utility skill contribution.

**Still-open PRs updated in this window:**

- [#3220](https://github.com/qwibitai/nanoclaw/pull/3220) — Breaking change: agent templates become Agent Plugins 1.0.0 directories, including security hardening for symlinks, file capabilities, and secrets.
- [#2909](https://github.com/qwibitai/nanoclaw/pull/2909) — Template setup flow in the setup wizard and first-agent stamping; part 2 of the template feature.
- [#3195](https://github.com/qwibitai/nanoclaw/pull/3195) — Makes NanoClaw upgrades transactional.
- [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) — DB migration to backfill missing channel destinations for existing wirings.
- [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) — Includes Apple Silicon + Colima environment variables in the launchd plist.

## 4. Community Hot Topics

The only issue with explicit comment activity is:

- [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) — **Inbound messages silently dropped when a platform reuses a message ID.** This is the most user-visible concern right now: messages never reach the agent, and users perceive it as “the agent ignored me.” The underlying need is reliable deduplication and visible failure handling in message ingestion.

Among PRs, [#3220](https://github.com/qwibitai/nanoclaw/pull/3220) is notable because it is labeled `feat!` and represents a breaking migration for agent templates. It will likely attract more review attention as the project moves toward the Agent Plugins format.

## 5. Bugs & Stability

| Severity | Item | Description | Status |
|---|---|---|---|
| High | [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) | Reused message IDs cause silent inbound message loss; user sees no response. | Open; no fix PR identified yet |
| Medium | [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) | Existing messaging-group wirings can be missing channel destinations; migration 021 would backfill them safely. | Open fix PR |
| Medium | [#3195](https://github.com/qwibitai/nanoclaw/pull/3195) | Upgrades are not transactional and may leave the install in a bad state if interrupted. | Open fix PR |
| Low | [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) | Launchd setup on Apple Silicon with Colima is missing required environment variables. | Open fix PR |
| Resolved | [#3221](https://github.com/qwibitai/nanoclaw/pull/3221) | `codex` and `opencode` providers would throw when writing config with HTTP MCP server entries. | Closed by PR |

## 6. Feature Requests & Roadmap Signals

- **Remote Streamable HTTP MCP servers** are now covered across the engine, Claude, codex, and opencode providers. This is close to becoming a complete cross-provider feature.
- **Tavily MCP tool skill** [#3190](https://github.com/qwibitai/nanoclaw/pull/3190) signals ongoing demand for search and external-tool integrations as reusable skills.
- **Agent Plugins 1.0.0** [#3220](https://github.com/qwibitai/nanoclaw/pull/3220) and **template setup wizard** [#2909](https://github.com/qwibitai/nanoclaw/pull/2909) point toward a template/plugin ecosystem migration. If merged together, the next major release may include both a new directory format and first-agent stamping in the setup wizard.

Likely next-version candidates: remote HTTP MCP support across all providers, Tavily MCP skill, and the transactional upgrade fix.

## 7. User Feedback Summary

- **Silent message loss is the biggest pain point.** Issue [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) describes a failure mode that is indistinguishable from the agent ignoring the user, which is damaging to trust.
- **macOS local users need better setup parity.** PR [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) reflects real friction for Apple Silicon + Colima users.
- **Existing installs want safe migrations.** PR [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) shows that users with existing wiring need backfills that preserve their custom destinations and names.
- **Upgrade reliability matters.** PR [#3195](https://github.com/qwibitai/nanoclaw/pull/3195) addresses the fear of broken or partial upgrades.

## 8. Backlog Watch

- [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) — Open since 2026-04-29. This is the oldest PR in the window and still needs a maintainer decision.
- [#2909](https://github.com/qwibitai/nanoclaw/pull/2909) — Open since 2026-07-02. Core-team feature that completes the template workflow; likely important for the upcoming plugin migration.
- [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) — Open since 2026-07-28. Database migration that fixes missing destinations for existing users; should be reviewed carefully to avoid data loss.
- [#3195](https://github.com/qwibitai/nanoclaw/pull/3195) — Open since 2026-08-06. Transactional upgrade safety is a high-value reliability improvement and could block future release confidence if left pending.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-12

## 1. Today's Overview

IronClaw is in a high-activity stabilization and architecture phase: 22 issues were updated in the last 24 hours (13 open, 9 closed) and 50 PRs were updated (25 open, 25 closed/merged), with no new releases. The most concentrated work is around the “Reborn” loop kernel: context-window handling, token estimation, retry/lease recovery, memory alias resolution, disclosure tooling, and channel unification. Several QA bug-bash P1 issues around agent hallucinating connection/automation state were closed, suggesting a focused reliability push. Overall project health looks active but pre-release: large epics are moving through PRs, while no tagged release shipped in this window.

## 2. Releases

No new releases were published in the last 24 hours, so there are no release notes, breaking changes, or migration details to report.

## 3. Project Progress

Closed/merged PRs in the visible top-20 sample advanced several important fixes:

- [PR #6997 — feat(llm): explicit Anthropic cache_control breakpoints on both transports](https://github.com/nearai/ironclaw/pull/6997) — Closes [#6984](https://github.com/nearai/ironclaw/issues/6984), adding explicit `cache_control` breakpoints instead of relying on automatic caching.
- [PR #7471 — fix(processes): lease expiry recovers safe runs instead of failing them; isolate the journal heartbeat pool](https://github.com/nearai/ironclaw/pull/7471) — Improves run durability and isolates heartbeat infrastructure from data-plane Postgres traffic.
- [PR #7470 — fix(threads): restore listability for unprojected thread index rows](https://github.com/nearai/ironclaw/pull/7470) — Fixes threads disappearing from sidebar/list results when ordered-projection metadata is missing.
- [PR #7503 — fix(loop): retain accepted task across context eviction](https://github.com/nearai/ironclaw/pull/7503) — Pins the accepted user task across the 128-message tail cut; related to context-eviction fixes.
- [PR #7514 — fix: enable Railway shell for hosted volume profile](https://github.com/nearai/ironclaw/pull/7514) — Adds a release-only alias for Railway sandbox shell access.
- [PR #7480 — fix(webui): reveal long conversation titles on hover](https://github.com/nearai/ironclaw/pull/7480) — Closes [#7481](https://github.com/nearai/ironclaw/issues/7481) with an overflow-aware marquee component.
- [PR #7511 — [Ignore]](https://github.com/nearai/ironclaw/pull/7511) — Closed as a no-op.

Closed bug issues include the disclosure-tool fixes [#7487](https://github.com/nearai/ironclaw/issues/7487) and [#7488](https://github.com/nearai/ironclaw/issues/7488), both around `tool_search`/`tool_describe`/`tool_call` behavior, and [#7405](https://github.com/nearai/ironclaw/issues/7405) around deferred tool discovery.

## 4. Community Hot Topics

The most-commented issue in this window is:

- [Issue #7482 — Epic: Pluggable agent loops — ACP executor, edge credential injection, kernel architecture](https://github.com/nearai/ironclaw/issues/7482) — 3 comments, high risk, epic scope. The underlying need is for IronClaw to become a kernel that handles scheduling, tenancy, secrets, egress, and audit while delegating the agent loop and integration tool code to off-the-shelf ACP agents.

Also active:

- [Issue #7405 — Improve deferred tool discovery with complete signatures and namespace-aware catalog previews](https://github.com/nearai/ironclaw/issues/7405) — 2 comments, closed. Signals user desire for fewer model turns and better catalog awareness when many tools are available.
- [Issue #7505 — Memory: target-alias resolution is contract — move it to the domain layer](https://github.com/nearai/ironclaw/issues/7505) — Community interest in memory consistency across providers; fix PR [#7512](https://github.com/nearai/ironclaw/pull/7512) is open.

Note: the PR dataset did not include per-PR comment counts, so issue comment counts were used for hot-topic ranking.

## 5. Bugs & Stability

Ranked by likely severity:

- [Issue #7484 — Context window silently evicts the task — pin user messages, compact on eviction](https://github.com/nearai/ironclaw/issues/7484) — High. User tasks can be silently dropped from the model context. Open fix PRs include [#7504](https://github.com/nearai/ironclaw/pull/7504) and [#7503](https://github.com/nearai/ironclaw/pull/7503).
- [Issue #7485 — Token estimator double-counts ASCII, halving the effective context window](https://github.com/nearai/ironclaw/issues/7485) — High. Two inconsistent estimators can reduce effective context by up to 2x. No fix PR was visible in this window.
- [Issue #7486 — Typed no-progress escape false-positives on idempotent reads/polling](https://github.com/nearai/ironclaw/issues/7486) — High. Legitimate long-running idempotent operations can be terminally failed.
- [Issue #7490 — retry_disposition() silent-redrive table is dead code — wire it or retire it](https://github.com/nearai/ironclaw/issues/7490) — Medium. ~25 transient failure categories are classified but never used.
- [Issue #7505 — Memory target-alias resolution is contract — move it to the domain layer](https://github.com/nearai/ironclaw/issues/7505) — Medium; fix PR [#7512](https://github.com/nearai/ironclaw/pull/7512) is open.
- [Issue #7508 — GitHub MCP extension startup gives confusing endpoint verification prompt](https://github.com/nearai/ironclaw/issues/7508) — Medium/UX. Reported against Railway QA instance.
- [Issue #7489 — result_read 24 KiB preview ceiling + read-before-edit full-read gate](https://github.com/nearai/ironclaw/issues/7489) — Medium tracking issue for coding-tool round-trip inflation.

Closed QA reliability bugs (likely fixed): [#7294](https://github.com/nearai/ironclaw/issues/7294) (agent remembers Telegram routine from another scope), [#7247](https://github.com/nearai/ironclaw/issues/7247) (falsely claims GitHub connected), and [#7246](https://github.com/nearai/ironclaw/issues/7246) (hallucinates automation status).

## 6. Feature Requests & Roadmap Signals

Strong v1.3.0 roadmap signals appear in labels on [#7405](https://github.com/nearai/ironclaw/issues/7405), [#6879](https://github.com/nearai/ironclaw/issues/6879), and [#7038](https://github.com/nearai/ironclaw/issues/7038).

Notable requested/planned features:

- [Issue #7517 — Cloud.near.ai: allow staking path for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517) — New user-requested feature; users want to attach a NEAR wallet for staking to existing Google/GitHub accounts.
- [Issue #7496 — Feature: host-mediated IdentyClaw Passport](https://github.com/nearai/ironclaw/issues/7496) — Practitioner-facing identity/passport flow.
- [Issue #7467 — Epic: Make Reborn durable state profile-agnostic and migrate legacy profile roots](https://github.com/nearai/ironclaw/issues/7467) — PR [#7456](https://github.com/nearai/ironclaw/pull/7456) is open and implements profile-agnostic storage.
- [Issue #7038 — Epic: Storybook + an AI-first Design System](https://github.com/nearai/ironclaw/issues/7038) — Related backend PR [#7498](https://github.com/nearai/ironclaw/pull/7498) adds automation suggestion cards V1.
- [Issue #7482 — Pluggable agent loops / ACP executor](https://github.com/nearai/ironclaw/issues/7482) — Related open PR [#7513](https://github.com/nearai/ironclaw/pull/7513) adds an `acp serve` CLI command with streaming and cancel support.

Open PRs that look likely for the next release: unified channel model [#7477](https://github.com/nearai/ironclaw/pull/7477), memory alias resolution [#7512](https://github.com/nearai/ironclaw/pull/7512), context compaction [#7504](https://github.com/nearai/ironclaw/pull/7504), and explicit cache breakpoints [#6997](https://github.com/nearai/ironclaw/pull/6997).

## 7. User Feedback Summary

Real user pain points visible in this window:

- **Authentication/staking friction**: A Cloud.near.ai user reported that Google/GitHub sign-ins cannot stake for inference; only Stripe credits are available ([#7517](https://github.com/nearai/ironclaw/issues/7517)).
- **Agent overconfidence / hallucinated state**: QA users reported the agent claiming Telegram routines, GitHub connections, and automations were active without verifying actual state ([#7294](https://github.com/nearai/ironclaw/issues/7294), [#7247](https://github.com/nearai/ironclaw/issues/7247), [#7246](https://github.com/nearai/ironclaw/issues/7246)).
- **Confusing extension setup**: GitHub MCP extension startup produced an endpoint verification prompt instead of connecting cleanly ([#7508](https://github.com/nearai/ironclaw/issues/7508)).
- **Memory persistence concerns**: Users expect durable facts to be recalled across conversations; the memory alias bug ([#7505](https://github.com/nearai/ironclaw/issues/7505)) and memory-save guidance PR [#7365](https://github.com/nearai/ironclaw/pull/7365) address this.
- **UI discoverability**: Long conversation titles were unreadable when truncated; addressed by hover marquee ([#7481](https://github.com/nearai/ironclaw/issues/7481), [#7480](https://github.com/nearai/ironclaw/pull/7480)).

No explicit satisfaction metrics were reported in this window.

## 8. Backlog Watch

Long-running or aging items that may need maintainer attention:

- [PR #5910 — fix: hydrate approval gates on notification open](https://github.com/nearai/ironclaw/pull/5910) — Oldest visible open PR, opened 2026-07-10, still open after a month.
- [Issue #6879 — Automation runs are hit-or-miss: unattended runs execute as plain interactive chat turns](https://github.com/nearai/ironclaw/issues/6879) — Open epic since 2026-07-29; core automation reliability problem.
- [Issue #7038 — Epic: Storybook + an AI-first Design System](https://github.com/nearai/ironclaw/issues/7038) — Open since 2026-08-03 with no release yet.
- [PR #7274 — fix(llm): preserve Anthropic prompt cache across tool promotion](https://github.com/nearai/ironclaw/pull/7274) — Open since 2026-08-06; important for LLM cost/latency.
- [PR #7365 — feat(memory): memory-save guidance + always-on MEMORY.md prompt lane](https://github.com/nearai/ironclaw/pull/7365) — Open since 2026-08-07; tied to user-visible memory persistence.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-12

## 1. Today's Overview

As of 2026-08-12, LobsterAI is in a healthy release-and-maintenance rhythm: one new build (`2026.8.11`) shipped, 7 PRs were closed/merged, and 3 PRs remain open. Issue activity was light but productive: 4 issues were updated, with 3 old/stale issues closed and 1 still open. The dominant development themes were Cowork UX polish, local-file workflows, model thinking-level configuration, and settings data-loss prevention. No new critical regressions were introduced in this window.

## 2. Releases

**LobsterAI 2026.8.11** was released.  
Release notes highlight:

- `feat(cowork)`: add collapse-agent-tasks shortcut and allow modifier shortcuts while typing — [PR #2469](https://github.com/netease-youdao/LobsterAI/pull/2469)
- `feat(cowork)`: mark scheduled task sessions in sidebar — contributed by @liuzhq1986

No breaking changes or migration notes were included in the release announcement.  
See all releases: [LobsterAI releases](https://github.com/netease-youdao/LobsterAI/releases)

## 3. Project Progress

Closed/merged PRs in the last 24h show advancement across model configuration, UI, and Cowork features:

- [PR #2477](https://github.com/netease-youdao/LobsterAI/pull/2477) — Release/2026.8.10 merge into `main`: adds configurable model thinking levels, Cowork progress visibility, scheduled-task identification, local-file workflows, startup/runtime reliability, and settings interactions.
- [PR #2457](https://github.com/netease-youdao/LobsterAI/pull/2457) — Adds server-driven thinking-level options and defaults; OpenClaw aliases with product-level `max` → runtime-level `xhigh`; per-session/per-agent persistence; versioned model request options.
- [PR #2476](https://github.com/netease-youdao/LobsterAI/pull/2476) — UI fix: Escape now dismisses only the topmost modal overlay, with IME composition handling.
- [PR #2473](https://github.com/netease-youdao/LobsterAI/pull/2473) — Cowork local file links now have a right-click context menu: open-with, save-as, copy path/contents/image, reveal-in-folder; adds `dialog:saveFileCopy` IPC handler.
- [PR #2474](https://github.com/netease-youdao/LobsterAI/pull/2474) — Sidebar icon stroke-weight alignment fix.
- [PR #1239](https://github.com/netease-youdao/LobsterAI/pull/1239) — AI task completion/error now flashes the Windows taskbar icon or bounces the macOS Dock icon when the app is unfocused.
- [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241) — Settings dialog now detects unsaved changes and asks for confirmation before closing; closes [Issue #1237](https://github.com/netease-youdao/LobsterAI/issues/1237).

## 4. Community Hot Topics

The most-commented issues in the 24h window each had 2 comments:

- [Issue #1237](https://github.com/netease-youdao/LobsterAI/issues/1237) — Settings close without confirmation, silently losing API Key/model configuration changes. Underlying need: prevent accidental data loss in configuration UI. A fix PR (#1241) was closed today.
- [Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240) — One API provider’s rate-limit/restriction state blocks all agents and makes switching to other models impossible. Underlying need: per-model/per-provider failure isolation, or at least a global “unblock/reset” path.
- [Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062) — Long-running tasks exceeding max duration give no clear answer whether the task is stopped or still running in the background. Underlying need: explicit timeout controls and persistent task lifecycle visibility.

No reactions were recorded on the listed issues/PRs.

## 5. Bugs & Stability

Ranked by severity:

1. **High — Global API restriction lockout**  
   [Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240): when one API account becomes restricted, all tasks/agents report “API restricted,” and even switching to a healthy model does not recover. The user reported full app paralysis and startup failure until config rollback. No fix PR is visible in this batch; issue is currently marked closed/stale, but the failure mode is severe.

2. **Moderate-High — OpenClaw gateway startup loop on Windows**  
   [Issue #1183](https://github.com/netease-youdao/LobsterAI/issues/1183): after disabling a model, the app repeatedly shows a “gateway failed to start in time” overlay. Still open, no fix PR in this batch.

3. **Moderate — Unclear task timeout semantics**  
   [Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062): users cannot tell whether a timed-out long task was killed or continues running. No fix PR in this batch.

4. **Moderate — Silent settings loss**  
   [Issue #1237](https://github.com/netease-youdao/LobsterAI/issues/1237): unsaved API key/config changes disappear when closing the Settings dialog. Fix submitted in [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241).

Also related: [PR #2475](https://github.com/netease-youdao/LobsterAI/pull/2475) is an open fix for per-model thinking levels being overwritten by another model’s selection — a real model-selector state bug.

## 6. Feature Requests & Roadmap Signals

- **Long-duration / 24-hour tasks** — [Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062) signals demand for configurable maximum task duration and explicit continuation/stop semantics. Likely candidate for a future task-lifecycle improvement.
- **Multi-model resilience** — [Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240) suggests users expect LobsterAI to keep working with unaffected models when one provider hits rate limits. This may drive per-agent/per-session model isolation or failover.
- **Configurable thinking levels** — [PR #2457](https://github.com/netease-youdao/LobsterAI/pull/2457) and [PR #2475](https://github.com/netease-youdao/LobsterAI/pull/2475) show continued investment in per-model reasoning settings; likely to appear in an upcoming release.
- **Settings safety** — [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241) addresses the community-reported settings-loss issue; expected in next builds.

## 7. User Feedback Summary

Real user pain points in this window:

- Losing unsaved API key/model configuration is frustrating and undermines trust in Settings UI.
- A single provider restriction can take down the whole LobsterAI workflow, especially for users juggling multiple agents and chat windows.
- Users want to run unattended, long-running tasks without ambiguous timeout behavior.
- Windows users still have a recurring gateway-startup overlay loop, which blocks normal use.

On the positive side, maintainers have been responsive: settings-loss got a fix PR, new Cowork shortcuts and scheduled-task visibility shipped, and local-file workflow support is expanding. Overall project health looks good, though the unresolved gateway startup issue and lack of visible fix for global API lockout remain sources of user dissatisfaction.

## 8. Backlog Watch

Items that have been open since early April 2026 and still need maintainer attention:

- [Issue #1183](https://github.com/netease-youdao/LobsterAI/issues/1183) — Open since 2026-04-01: repeated “gateway failed to start” overlay mask on Windows. Needs diagnosis/repro or a fix.
- [PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181) — Open since 2026-04-01: hides internal OpenClaw main-agent sessions from the user-facing Cowork session list via a new `hidden` column. Needs review/merge or explicit closing.
- [PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277) — Open since 2026-04-02: Dependabot update for Electron `40.2.1 → 43.3.0` and `electron-builder`. Needs dependency review/merge or close; long-pending dependency updates can become a security/maintenance risk.

All three were touched/updated recently, indicating they are not forgotten, but they have remained unresolved for roughly four months.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Today's Overview

On 2026-08-12, Moltis showed minimal visible activity: zero issues were updated in the last 24 hours, no pull requests were merged or closed, and no new releases were published. The only active item is open PR #1190, which was created/updated on 2026-08-11 and proposes durable local CalDAV connectors plus related agent tooling. This indicates a quiet day focused on an ongoing feature contribution rather than issue triage or bug fixes. Overall project health appears stable, with no reported regressions or urgent community concerns.

## Releases

No new releases were published in the last 24 hours. There are no version change notes, breaking changes, or migration steps to report.

## Project Progress

No PRs were merged or closed today. The only active PR is:

- [#1190 [OPEN] Add durable local CalDAV connectors](https://github.com/moltis-org/moltis/pull/1190) — author: penso  
  This PR proposes provider-neutral connector persistence, atomic CalDAV snapshots, scheduling, projections, and bounded local full-text search. It also adds prompt-compiled dataset plans and a trusted read-only `connectors` agent tool for local dataset access. If merged, this would advance local-first data integration and agent capabilities.

## Community Hot Topics

The only recently active community item is:

- [#1190 Add durable local CalDAV connectors](https://github.com/moltis-org/moltis/pull/1190) — open, no comments/reactions yet.

Underlying need: the PR suggests a desire for local-first calendar/task data connectivity with durable snapshots, searchable local datasets, and safe agent access. This points toward privacy-preserving local data storage and stronger agent tooling over external service dependencies.

## Bugs & Stability

No bugs, crashes, or regressions were reported in the last 24 hours. No stability-related fixes were merged.

## Feature Requests & Roadmap Signals

The open PR #1190 is the clearest roadmap signal. It indicates planned or requested support for:

- Durable local CalDAV connectors with atomic snapshots
- Local scheduling and projections
- Bounded local full-text search
- Prompt-compiled dataset plans
- A trusted read-only `connectors` agent tool for local dataset access

These features could appear in a future release if the PR progresses through review and merge.

## User Feedback Summary

No direct user feedback was captured in issues or PR comments during this window. The PR description itself suggests user interest in local-first data connectors that are reliable, searchable, and safe for AI agents to access read-only. There is no evidence of dissatisfaction or reported pain points in the last 24 hours.

## Backlog Watch

No long-unanswered issues or PRs requiring maintainer attention were observed. With zero open/active issues and only one open PR, the current backlog is effectively empty.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-12

**Scope:** Activity tracked from `agentscope-ai/QwenPaw` via the CoPaw feed.

## 1. Today's Overview

As of 2026-08-12, QwenPaw is in a high-velocity pre-release phase: **22 issues** and **48 PRs** were updated in the last 24 hours, with **13 issues closed** and **25 PRs closed/merged**. The new **v2.1.0-beta.3** release adds workspace blog support and a provider capability-cache fix, while PR #6875 prepares the official v2.1.0 release notes. Activity is concentrated on stabilizing MCP/tooling, desktop UI polish, memory/context lifecycle fixes, and channel configuration hardening. A small cluster of new crash reports (#6918, #6919) and the unresolved Chinese IME issue (#6885) indicate that regression hardening is still needed before a stable v2.1.0. Overall, maintainer responsiveness looks healthy, and several long-standing issues were closed within the window.

## 2. Releases

**v2.1.0-beta.3** — [Release page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.3)

Changes included in the release snippet:

- **Feat/files workspace blog** by @zhaozhuang521 — [#6783](https://github.com/agentscope-ai/QwenPaw/pull/6783)
- **fix(provider): expire stale capability cache entries and clear on model switch** by @ningblue — [#6723](https://github.com/agentscope-ai/QwenPaw/pull/6723). This is likely tied to the recurring "MCP tool becomes unavailable" issue [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732).
- **chore: bump the version to 2.**

No explicit breaking changes or migration notes were included in the provided data. As a beta, users should expect possible configuration/API instability.

## 3. Project Progress

Notable PRs closed/merged in the last 24 hours:

- **#6915 — fix(files): repair previews and dark mode styling** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6915)  
  Fixes workspace file previews for Unicode PDF filenames and SVG files, with dark-theme alignment.

- **#6911 — feat(console): unify renderable code block experience** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6911)  
  Unifies code blocks, adds localized LaTeX/Mermaid Preview and Source tabs, and follows the active theme. This directly addresses long-standing LaTeX rendering complaints.

- **#6891 — feat(computer-use): improve native input workflows** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6891)  
  Adds a bounded keyboard-only `sequence` action with rate limiting and improves Windows input targeting.

- **#6909 — feat(channels): warn when a bot is already used by another agent** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6909)  
  Adds a confirmation dialog when a channel configuration conflicts with another running agent.

- **#6898 — fix(tools): correct read_file tool description** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6898)  
  Fixes misleading `read_file` tool description, particularly around binary files.

- **#6564 — fix(memory): flush pending turns before compression** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6564)  
  Fixes [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) by preserving pending auto-memory state during compression.

- **#6875 — chore: update release notes for v2.1.0** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6875)  
  Prepares English/Chinese release notes and news entries, signaling a stable v2.1.0 release may be near.

## 4. Community Hot Topics

Most active by comment count:

- **#6732 — [Bug] MCP tools regularly become invalid / unregistered** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6732) · 10 comments · closed  
  Users report MCP tools failing after hours of uptime, with recovery only after restarting the QwenPaw Docker container. Underlying need: long-running MCP connection and capability-cache stability.

- **#6893 — [Feature] Formula rendering; session grouping; active session background** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6893) · 7 comments · closed  
  Chinese users want LaTeX formula rendering comparable to Cherry Studio, plus better session management. This matches the formula-rendering demand from multiple older issues.

- **#5790 — [Bug] Loading animation does not disappear after Agent response completes** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/5790) · 4 comments · closed  
  Frontend state bug in the console chat; users care about UI responsiveness and trust signals.

- **#6882 — [Question] How to integrate CopilotKit?** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6882) · 3 comments · open  
  Community interest in embedding QwenPaw with CopilotKit; needs examples or official integration guidance.

- **#6900 — [Feature] Isolate chat project directories from the agent workspace** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6900) · 3 comments · closed  
  Request to separate per-chat project directories from internal `workspace_dir`, indicating a desire for cleaner file isolation and multi-project workflows.

## 5. Bugs & Stability

Ranked by severity:

- **High — #6919: qwenpaw-v2.0.1 frequent crashes with console process/reply failure** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6919)  
  Core backend crash on Windows pip-install deployment. No linked fix PR yet in the provided data.

- **High — #6918: Inter-agent messages spawn a new agent session per message** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6918)  
  Concurrent "shadow instances" cause duplicate data and session explosion. No fix PR yet.

- **High — #6885: Console UI crashes on Chinese IME compositionEnd during agent run** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6885)  
  Message queue becomes unusable with Chinese IME in v2.1.0b2. No fix PR yet.

- **Medium — #6732: MCP tools periodically fail** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6732)  
  Closed; the v2.1.0-beta.3 provider cache fix ([#6723](https://github.com/agentscope-ai/QwenPaw/pull/6723)) is the likely remedy.

- **Medium — #6910: Invalid single-channel payloads return HTTP 500** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6910)  
  Config endpoint should return 422. Fix PR [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) is open.

- **Medium — #6697: v2.1.0b1 desktop injects PYTHONHOME into child env, crashing Python subprocesses** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6697)  
  Closed; desktop packaging regression.

- **Low — #6828: Console frontend idle repainting at ~20% CPU due to infinite CSS animations** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6828)  
  Closed; UI performance regression fixed.

- **Low — #6722: Background forked subagent reports completed when worktree finalization fails** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6722)  
  Closed; subagent lifecycle correctness fix.

## 6. Feature Requests & Roadmap Signals

- **#6917 — Agent should be able to push reports/messages directly to Inbox** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6917)  
  New request for persistent, unread-marked Inbox delivery rather than ephemeral chat messages. Likely roadmap candidate for agent notification design.

- **#6916 — Plugins can silently create cron jobs and inject visible messages without approval** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6916)  
  Security/permission gap. Mid-high severity; likely to be prioritized before stable release.

- **#6882 — CopilotKit integration** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6882)  
  Developer-facing request; could lead to official integration docs or a starter template.

- **#6893 / #5453 / #4756 — LaTeX formula rendering** — [Issues](https://github.com/agentscope-ai/QwenPaw/issues/6893) · [#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453) · [#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756)  
  Multiple users have requested KaTeX/LaTeX support. PR [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) already adds LaTeX preview tabs, so this appears to be landing soon.

- **#6897 — QQ bot workflow messages should be compacted** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6897)  
  QQ channel users want less verbose workflow output to avoid rate limits and notification spam.

- **#6883 — Daily page notes in subfolders grouped under wrong date** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6883)  
  Desktop notes feature bug; likely to be fixed in a v2.1.x patch.

- **#4154 — Desktop font size adjustable, clickable file paths, background service mode** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/4154)  
  Long-standing desktop UX request, especially font scaling for webview-based UI.

## 7. User Feedback Summary

- **Stability is the top concern:** multiple users report crashes, MCP failures, and frontend freezes. The v2.1.0-beta.3 cache fix and closed issues are positive signals, but new crash reports (#6918, #6919) show that regression testing still has gaps.
- **LaTeX rendering is a recurring pain point:** users compare QwenPaw unfavorably to Cherry Studio and expect markdown math support out of the box. The console code-block unification PR (#6911) directly addresses this.
- **Chinese-speaking users are highly engaged:** requests include WeChat community creation (#6895), QQ bot rate-limit optimization (#6897), and Chinese IME crash fixes (#6885).
- **Desktop UX dissatisfaction persists:** complaints about small fonts (#4154), idle CPU jank (#6828), and persistent loading spinners (#5790) suggest the frontend still needs polish.
- **Developers want more extensibility/integration guidance:** CopilotKit integration (#6882), Inbox delivery (#6917), and safer plugin permission controls (#6916) are the most forward-looking requests.

## 8. Backlog Watch

Items that remain open and appear to need maintainer attention:

- **#6919 — Frequent qwenpaw-v2.0.1 crashes** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6919)  
  High-severity crash with no linked fix PR.

- **#6918 — Inter-agent shadow sessions** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6918)  
  Concurrency/session identity bug, no fix PR yet.

- **#6916 — Plugin cron/message injection security gap** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6916)  
  Security issue, no fix PR yet.

- **#6885 — Chinese IME crash** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6885)  
  UI blocker for Chinese users, no fix PR yet.

- **#6302 — Provider discovery, model metadata, routing, and agent controls unification** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6302)  
  Large architectural PR open since July 21; needs maintainer review/decision.

- **#6779 — Align Scroll and memory with AgentScope lifecycle** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6779)  
  Major context/memory refactor; open since August 7.

- **#6830 — Preserve auto-memory state across compression/session lifecycles** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/6830)  
  Memory consistency fix; open since August 8.

- **#5490 — Navigable fullscreen image gallery for chat media** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/5490)  
  Open since June 24; UI improvement with no visible recent movement.

- **#5869 — Expose system commands in slash autocomplete** — [PR](https://github.com/agentscope-ai/QwenPaw/pull/5869)  
  Under review since July 8; would improve TUI/console discoverability.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-12

## 1. Today's Overview
ZeroClaw is in a sustained high-activity phase: 50 issues and 50 PRs were updated in the last 24 hours, with 40 issues still open/active and 10 closed. PR flow is heavily pending — 49 of 50 updated PRs remain open, while only 1 was merged or closed. No release was published. The project is currently concentrated on high-risk architecture RFCs around security, auth, sessions, and SOP control-plane work, with many items tagged `needs-maintainer-review`; maintainer decision capacity appears to be the main bottleneck.

## 2. Releases
No new releases in the last 24 hours. No changelog, breaking-change, or migration notes to report.

## 3. Project Progress
- **1 PR merged/closed** in the update window, but the provided snapshot does not identify which PR; the dominant signal is 49 still-open PRs.
- **10 issues closed**, including several significant ones:
  - [#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269) — RFI: token consumption and cost management for productized agent workloads *(closed)*
  - [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) — RFC: structured observability / OTel trace correlation *(closed)*
  - [#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) — Docker Compose gateway loopback-bound bug *(closed)*
  - [#9545](https://github.com/zeroclaw-labs/zeroclaw/issues/9545) — gate rustdoc warnings in required PR CI *(closed)*
  - [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) — daemon reload signal issue *(closed)*

- **Active in-flight PRs** updated in the last 24h (all still open):
  - [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) — headless SOP runs plus five SOP defect fixes
  - [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — pixel-level image validation for multimodal provider requests
  - [#9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) — bound direct HTTP response handling
  - [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918) — gateway accepts full `session_key` on abort/rename/state/message_post
  - [#9885](https://github.com/zeroclaw-labs/zeroclaw/pull/9885) — honour documented `sops_dir` default in daemon
  - [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) — rotate live provider credentials after rate limits

## 4. Community Hot Topics
Most active issues by comment count:

- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — RFC: Goal mode v1, bounded foreground Matrix work *(19 comments)*  
  Underlying need: durable, bounded user objectives across multiple agent turns without over-coupling restart handoff, Web, and async child work.

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — RFC: ZeroClaw Chat Completions profile *(18 comments)*  
  Strong ecosystem demand for an OpenAI-compatible surface usable by Open WebUI, LobeChat, Continue.dev, Aider, LangChain, and OpenAI SDK clients.

- [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — RFC: per-execution confirmation tier for high-risk shell commands *(17 comments)*  
  Operators want Claude Code-style `allow / ask / deny` command policy and safer shell-tool defaults.

- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — RFC: pluggable inbound authentication and canonical principals *(14 comments)*  
  Core identity/security milestone; currently `in-progress` and awaiting maintainer review.

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Tracker: maintainer decision queue for RFCs *(13 comments)*  
  This tracker itself shows the community is feeling RFC/decision bottlenecks.

- [#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269) — RFI: token consumption and cost management *(13 comments, closed)*  
  Productized agent workloads are considered too expensive through single high-end models.

PR-side attention is concentrated on large security/refactor work, especially [#9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194) (KeySource extraction), [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) (SSRF opt-in for `file_download`), and [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) (context compaction ratio).

## 5. Bugs & Stability
Ranked roughly by severity:

- **High — [#9883](https://github.com/zeroclaw-labs/zeroclaw/issues/9883)** *(P1, accepted, risk high)*  
  Inbound WebP conversion decodes unbounded before the shared image validator runs. Potential DoS/security gap; no dedicated fix PR visible yet.

- **High — [#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872)** *(P1, accepted, risk high)*  
  Bounded delegate target filesystem operations resolve to the delegator’s workspace instead of the delegate’s own workspace. Sandbox boundary violation.

- **High — [#9918 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9918)** *(P1, risk high)*  
  Gateway endpoints reject full `session_key` with a doubled `gw_gw_` prefix; client-facing API bug with fix PR open.

- **High — [#9862 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9862)** *(P1, risk high)*  
  Direct HTTP response bodies are buffered before truncation; in-flight fix streams to the configured byte limit and stops redirect following.

- **Medium/Closed — [#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)** *(S1, closed)*  
  Docker Compose gateway could remain loopback-bound behind a published port; closed.

- **Closed — [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)** *(S2, closed)*  
  Daemon reload not on SIGUSR1, and degraded-security warning told operators to send a signal that kills the daemon; closed.

Other active hardening PRs: [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) (image validation), [#9748](https://github.com/zeroclaw-labs/zeroclaw/pull/9748) (stale provider refreshes vs replacement sessions), [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) (SOP runtime defects), and [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) (SSRF gate).

## 6. Feature Requests & Roadmap Signals
Strong next-version signals:

- **v0.9.0 security architecture** is the clearest roadmap cluster:
  - [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) — runtime-owned security decision pipeline and restrictive overlays
  - [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — pluggable inbound auth / canonical principals
  - [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — SOP capability permission contract
  - [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) — SOP milestone tracker to 5/5

- **Ecosystem/API compatibility** is another strong demand area:
  - [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — Chat Completions profile
  - [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — runtime-owned conversation sessions and transport adapters
  - [#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346) — unified package/capability/config/runtime-state catalog contract

- **Process reform is already accepted**:
  - [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) — streamline RFC scope, discussion, voting, and assignment *(status: accepted)*

Likely next-version items are the v0.9.0-labelled security/SOP RFCs, with Chat Completions compatibility ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) as the strongest externally visible feature candidate.

## 7. User Feedback Summary
Recurring user/contributor pain points visible in the data:

- **Cost**: [#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269) — running real agent workloads through a single high-end model is considered prohibitively expensive for productized deployments.
- **Operational safety**: [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) and [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) — users want clearer shell-command policy and were actively misled by a signal instruction that kills the daemon.
- **Config reliability**: [#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897) and [#9885](https://github.com/zeroclaw-labs/zeroclaw/pull/9885) — saved config or documented defaults are not always applied without full reloads.
- **Sandbox trust**: [#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872) — delegated agents can resolve filesystem access to the wrong workspace, undermining bounded-delegation trust.
- **API ergonomics**: [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918) — clients passing the full `session_key` hit `gw_gw_` prefix bugs.
- **Process fatigue**: [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) — RFC discussion/voting is seen as slower and more cumbersome than the decisions it supports.

Overall, users are pushing for lower cost, safer shell/security defaults, OpenAI-compatible access, and faster maintainer decisions.

## 8. Backlog Watch
Important items still waiting on maintainer review:

- [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — shell command confirmation tier + allow/ask/deny policy *(created Jun 3, 17 comments)*
- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — pluggable inbound auth / canonical principals *(created Jun 3, 14 comments)*
- [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) — runtime-owned security decision pipeline *(created Jun 3, 9 comments)*
- [#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897) — apply security/config updates without full daemon reload *(created Jun 17, 8 comments)*
- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — Goal mode v1 RFC *(created Jun 24, 19 comments)*
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — Chat Completions profile RFC *(created Jul 2, 18 comments)*
- [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) — plugin-owned Kanban board RFC *(created Jul 8, 9 comments)*
- [#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346) — unified catalog contract RFC *(created Jul 24, 6 comments)*

These are high-risk, heavily discussed items still tagged `needs-maintainer-review`; the active maintainer decision tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) is the right coordination point, but the queue remains large.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*