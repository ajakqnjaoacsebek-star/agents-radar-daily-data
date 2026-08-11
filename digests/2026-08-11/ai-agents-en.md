# OpenClaw Ecosystem Digest 2026-08-11

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-11 10:24 UTC

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

# OpenClaw Project Digest — 2026-08-11

## 1. Today's Overview

OpenClaw is in an intense stabilization-and-refactor phase. In the last 24 hours, 500 issues were updated (358 open/active, 142 closed) and 500 PRs were updated (252 open, 248 merged/closed), with **no new releases** published. Activity is dominated by large core refactors (export-name collision cleanup, session-accessor simplification, Plugin SDK baseline consolidation) from maintainers like steipete and obviyus, alongside targeted reliability fixes for Telegram, Discord, Codex/OAuth, and Gateway session resumption. A P0 boot-loop caused by a broken beta publish (`2026.8.1-beta.1`) was resolved and closed. The most notable health concern is a large, long-lived backlog of P1/P2 issues awaiting maintainer or product decisions — many dating back to February–March 2026.

## 2. Releases

No new releases were published in the last 24 hours.

The most recent release event was negative: [Issue #121675](https://github.com/openclaw/openclaw/issues/121675) (P0, closed) reported that `2026.8.1-beta.1` was published to npm **without republishing companion `@openclaw/*` plugins**, causing the lockstep version resolution to make every configured plugin unresolvable and the startup convergence guard to loop unrecoverably. The issue is now closed, indicating a fix was applied.

## 3. Project Progress

**Merged/closed PRs in the last 24h:**
- [PR #121992](https://github.com/openclaw/openclaw/pull/121992) — `docs(config)`: refresh generated baseline hash (fixes stale config baseline after #121653)
- [PR #121920](https://github.com/openclaw/openclaw/pull/121920) — `fix(plugin-sdk)`: keep inbound reply dispatch compatibility shim until next major
- [PR #121922](https://github.com/openclaw/openclaw/pull/121922) — `fix(plugin-sdk)`: keep inbound reply shim through next SDK major
- [PR #109077](https://github.com/openclaw/openclaw/pull/109077) — `fix(e2e)`: download non-root installer before execution (prevents partial payload execution)

**Closed issues indicating landed fixes:**
- [Issue #121675](https://github.com/openclaw/openclaw/issues/121675) (P0) — beta publish boot-loop, resolved
- [Issue #99912](https://github.com/openclaw/openclaw/issues/99912) (P1) — agent heartbeat routing to wrong agent's session
- [Issue #109145](https://github.com/openclaw/openclaw/issues/109145) (P1) — Gateway HTTP server listening but not accepting connections
- [Issue #94536](https://github.com/openclaw/openclaw/issues/94536) (P2) — commitment marked 'sent' but never delivered (second case)
- [Issue #52130](https://github.com/openclaw/openclaw/issues/52130) (P2) — Telegram restart storm from `retry.jitter` type mismatch + misleading SecretRef diagnostics
- [Issue #114690](https://github.com/openclaw/openclaw/issues/114690) (P2) — Discord duplicate source reply after native Codex compaction
- [Issue #42819](https://github.com/openclaw/openclaw/issues/42819) (P3) — browser in Docker hidden in cache folder

**Long-running feature work still open in PR:** [PR #120001](https://github.com/openclaw/openclaw/pull/120001) (fix(codex): keep native subagent tools available after parent turns end) closes #111010/#118534 but is explicitly flagged for an **owner/security decision before merge**.

## 4. Community Hot Topics

Most-commented issues:

- [Issue #121058](https://github.com/openclaw/openclaw/issues/121058) — **Silent reply failures recurring after #116277 closed** (50 comments) — the single hottest topic; monitoring cron continues logging new occurrences of undelivered reply payloads.
- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — **Feature: Memory Trust Tagging by Source** (35 comments) — tag memory by provenance (user commands, web scrapes, third-party skills) to prevent memory-poisoning/prompt-injection attacks.
- [Issue #48788](https://github.com/openclaw/openclaw/issues/48788) — **Centralized filename encoding utility** (19 comments) — architectural fix for multi-encoding Content-Disposition handling across all channel adapters (Shift-JIS, EUC-KR, GB18030).
- [Issue #87744](https://github.com/openclaw/openclaw/issues/87744) — **Codex-backed Telegram turns repeatedly time out** (18 comments, 3 👍) — work completes but `turn/completed` never fires, so Telegram fails to deliver the final answer.
- [Issue #22438](https://github.com/openclaw/openclaw/issues/22438) — **Tiered bootstrap file loading** (18 comments) — progressive context control to avoid wasting LLM token budget in large workspaces.
- [Issue #42475](https://github.com/openclaw/openclaw/issues/42475) — **Per-agent cost budget enforcement at the gateway** (16 comments, 1 👍) — daily/monthly caps to prevent runaway spend.
- [Issue #68596](https://github.com/openclaw/openclaw/issues/68596) — **Configurable streaming watchdog timeout** (15 comments, **8 👍**, most-reacted issue) — extended-reasoning models (kimi-k2.5, DeepSeek-R1) trip the 30s watchdog.
- [Issue #39476](https://github.com/openclaw/openclaw/issues/39476) — **A2A sessions_send duplicate messages** (13 comments) — target agent calling back causes duplicates in the requester's channel.

**Underlying needs:** reliability of delivery (silent failures, timeouts, duplicates), security hardening (memory poisoning, provenance), context-window/cost management, and better observability of streaming and session state.

## 5. Bugs & Stability

**P0 — resolved:**
- [Issue #121675](https://github.com/openclaw/openclaw/issues/121675) — beta published without companion plugins → unrecoverable boot loop (closed).

**P1 — open, highest attention:**
- [Issue #121058](https://github.com/openclaw/openclaw/issues/121058) — Silent reply failures recurring (50 comments) — no fix PR yet.
- [Issue #87744](https://github.com/openclaw/openclaw/issues/87744) — Codex-backed Telegram turns time out waiting for `turn/completed` (18 comments).
- [Issue #39476](https://github.com/openclaw/openclaw/issues/39476) — A2A `sessions_send` back-call causes duplicate messages (13 comments); linked PR open.
- [Issue #84583](https://github.com/openclaw/openclaw/issues/84583) — Cron announce delivery triggers `EmbeddedAttemptSessionTakeoverError` during active chat (12 comments).
- [Issue #40001](https://github.com/openclaw/openclaw/issues/40001) — `write` tool lacks append mode; isolated cron sessions overwrite/destroy shared files (12 comments).
- [Issue #47975](https://github.com/openclaw/openclaw/issues/47975) — Subagent sessions persist after completion; main session becomes unresponsive (10 comments).
- [Issue #53408](https://github.com/openclaw/openclaw/issues/53408) — Write/exec tool parameters silently dropped after long conversations (10 comments).
- [Issue #97983](https://github.com/openclaw/openclaw/issues/97983) — iOS/WebChat messages append to transcript but don't trigger assistant replies (9 comments).
- [Issue #89278](https://github.com/openclaw/openclaw/issues/89278) — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth timeout (9 comments).
- [Issue #71689](https://github.com/openclaw/openclaw/issues/71689) — Tasks registry restore fails on malformed SQLite (`database disk image is malformed`) (6 comments).
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — Leaked unreaped hook/tool child processes cause zombie accumulation (7 comments).
- [Issue #103804](https://github.com/openclaw/openclaw/issues/103804) — service-env generator double-quotes values, breaking `AWS_REGION` hostname resolution (6 comments).
- [Issue #83598](https://github.com/openclaw/openclaw/issues/83598) — `anthropic:claude-cli` OAuth refresh still dead-ends main lane in 2026.5.12 (6 comments).
- [Issue #103198](https://github.com/openclaw/openclaw/issues/103198) — WebChat image attachments mapped to `image_0` instead of real media-store path (6 comments, 3 👍).
- [Issue #42820](https://github.com/openclaw/openclaw/issues/42820) — Feishu message tool: poll schema/guard prevents file sends (7 comments).
- [Issue #65538](https://github.com/openclaw/openclaw/issues/65538) — Screen readers announce every streaming token due to `aria-live="polite"` (7 comments).

**Related fix PRs in flight:**
- [PR #121764](https://github.com/openclaw/openclaw/pull/121764) — prepared cancellable OAuth refresh hooks (addresses #89278).
- [PR #121969](https://github.com/openclaw/openclaw/pull/121969) — resume main sessions after gateway restarts.
- [PR #121991](https://github.com/openclaw/openclaw/pull/121991) — handle Discord MCP stringified components (fixes #121778).
- [PR #121980](https://github.com/openclaw/openclaw/pull/121980) — preserve attachment order in chat history.
- [PR #121165](https://github.com/openclaw/openclaw/pull/121165) — keep Discord forum payload attachments in one thread.
- [PR #119988](https://github.com/openclaw/openclaw/pull/119988) — limit attach SIGINT shutdown to direct child + force-kill timeout.
- [PR #119268](https://github.com/openclaw/openclaw/pull/119268) — reject Telegram `webhookPath` colliding with `/healthz` or missing leading slash.

## 6. Feature Requests & Roadmap Signals

**Most-upvoted requested features:**
- [Issue #68596](https://github.com/openclaw/openclaw/issues/68596) — Configurable streaming watchdog timeout (8 👍) — strong demand from users of long-thinking models.
- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — Memory Trust Tagging by Source (35 comments; needs security review + product decision).
- [Issue #42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget enforcement at the gateway (linked PR open).
- [Issue #22438](https://github.com/openclaw/openclaw/issues/22438) — Tiered bootstrap file loading for progressive context control (linked PR open).
- [Issue #13700](https://github.com/openclaw/openclaw/issues/13700) — Session snapshots: `/session save|load` checkpoints for branching/rollback.
- [Issue #15032](https://github.com/openclaw/openclaw/issues/15032) — Per-spawn tool restrictions for sub-agents (DMZ/prompt-injection defense use case).
- [Issue #71058](https://github.com/openclaw/openclaw/issues/71058) — Multiple Azure/Teams bots on a single gateway.
- [Issue #66252](https://github.com/openclaw/openclaw/issues/66252) — Per-agent TTS/STT configuration overrides for multi-language support.
- [Issue #63990](https://github.com/openclaw/openclaw/issues/63990) — Multi-index embedding memory with model-aware failover (no mixed vector spaces).
- [Issue #47910](https://github.com/openclaw/openclaw/issues/47910) — Provider fallback by failure class, quarantining auth-broken providers.

**Likely next-version candidates:** Features with open linked PRs and maintainer traction — #42475 (cost budgets), #22438 (tiered bootstrap). Also adjacent fixes already in PR: #121852 (hide unusable models in Control UI picker), #121988 (heartbeat default delivery to configured owner, never groups), and #121764 (OAuth refresh hooks). The 8-upvote watchdog request (#68596) remains stalled on product decision since April.

## 7. User Feedback Summary

**Recurring pain points:**
- **Silent failures are the #1 complaint** — replies never delivered (#121058), tool params silently dropped (#53408), model switches failing without error (#58957), iOS/WebChat producing no replies (#97983).
- **Data loss** — `write` tool overwrites shared files in isolated cron sessions (#40001); tasks-registry SQLite corruption blocks startup (#71689).
- **OAuth/identity flakiness in background contexts** — Codex (#89278) and anthropic:claude-cli (#83598) refresh paths succeed on probe but dead-end in cron/heartbeat lanes.
- **Session-state corruption** — subagent sessions lingering and blocking the main session (#47975), heartbeat routed to wrong agent (#99912), cron announcements causing takeover errors (#84583).
- **UX/accessibility gaps** — screen readers announce every streaming token (#65538), Slack shows only static "is typing..." (#33413), transient tool warnings clutter channels (#39406, #45565), onboarding wizard omits Memory/Embedding setup (#16670).

**Satisfaction signals:** The triage system is mature (clawsweeper labels, issue ratings, merge-risk flags), 142 issues closed and 248 PRs merged/closed in 24 hours indicate a responsive maintainer team, and large maintainer-led refactors (#121888, #121893, #121995, #121536) show active investment in code health.

## 8. Backlog Watch

**Long-open items needing maintainer/product decisions (many since Feb–Mar 2026):**

- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — Memory Trust Tagging (created Feb 3; **35 comments**; needs maintainer review + product decision + security review).
- [Issue #13700](https://github.com/openclaw/openclaw/issues/13700) — Session snapshots save/load (created Feb 10; needs maintainer review + product decision).
- [Issue #15032](https://github.com/openclaw/openclaw/issues/15032) — Per-spawn tool restrictions (created Feb 12; needs security review; linked PR open).
- [Issue #16670](https://github.com/openclaw/openclaw/issues/16670) — Onboarding Wizard Memory/Embedding setup (created Feb 15; needs maintainer review + product decision).
- [Issue #22438](https://github.com/openclaw/openclaw/issues/22438) — Tiered bootstrap file loading (created Feb 21; 18 comments; linked PR open).
- [Issue #39406](https://github.com/openclaw/openclaw/issues/39406) — Suppress transient tool error warnings (created Mar 8; needs maintainer review + product decision).
- [Issue #42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget enforcement (created Mar 10; 16 comments; linked PR open).
- [Issue #58957](https://github.com/openclaw/openclaw/issues/58957) — Model switch silently fails on oversized context (created Apr 1; not repro on main).
- [Issue #68596](https://github.com/openclaw/openclaw/issues/68596) — Configurable streaming watchdog timeout (created Apr 18; 15 comments, 8 👍; needs maintainer review + product decision).
- [Issue #87744](https://github.com/openclaw/openclaw/issues/87744) — Codex Telegram turn timeouts (created May 28; needs live repro).

**PRs flagged "ready for maintainer look" that deserve review:**
- [PR #120001](https://github.com/openclaw/openclaw/pull/120001) — Codex subagent tool retention; explicitly requires **owner/security decision before merge**.
- [PR #121852](https://github.com/openclaw/openclaw/pull/121852) — Control UI: hide unusable models from picker.
- [PR #121893](https://github.com/openclaw/openclaw/pull/121893) / [PR #121888](https://github.com/openclaw/openclaw/pull/121888) — export-collision refactors (large, compatibility risk).
- [PR #121165](https://github.com/openclaw/openclaw/pull/121165) — Discord forum payload attachments.
- [PR #110736](https://github.com/openclaw/openclaw/pull/110736) — CI: bound plugin-clawhub-release git fetch with timeout.

**PRs "waiting on author":** #121920, #121969, #121986, #102701, #121764, #121554, #121988 — all appear blocked on maintainer feedback or author revisions.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date:** 2026-08-11 | **Data source:** Community digests of 12 projects

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a **high-velocity stabilization phase**: no project shipped a stable release in this 24-hour window (one RC and one imminent release), yet combined activity exceeded 700 issues and 800 PRs updated. The dominant engineering theme is **reliability over novelty** — silent reply failures, agent loop/token-abuse bugs, session-state corruption, OAuth flakiness, and MCP connectivity issues consume the majority of maintainer attention across nearly every codebase. Architecturally, the ecosystem is converging on a shared stack: gateway/channel adapters (Telegram, Discord, WeChat, Feishu, QQ), MCP tool integration, memory/embedding subsystems, and WebUI consoles — with Rust (ZeroClaw), TypeScript (OpenClaw/NanoClaw/CoPaw), and Python (NanoBot/Hermes) all viable implementation choices. Security hardening, particularly around webhook authentication, credential isolation, and prompt-injection defense, has risen from background concern to active priority in at least five projects.

---

## 2. Activity Comparison

| Project | Issues Updated (closed) | PRs Updated (merged/closed) | Release Status | Health Score (1–10) |
|---|---|---|---|---|
| **OpenClaw** | 500 (142) | 500 (248) | None (P0 boot-loop resolved) | **7.0** — Massive throughput, but 358 open issues with a long P1/P2 backlog |
| **NanoBot** | 5 (3) | 117 (102) | None | **8.5** — Highest merge ratio (87%); agent-loop bugs remain open |
| **Hermes Agent** | 50 (2) | 50 (2) | None | **6.0** — High author activity, low merge throughput; active triage (dupes closed) |
| **PicoClaw** | 5 (2) | 8 (6) | None (v0.3.1 ref) | **5.5** — Healthy merges, but high-severity fix PRs marked stale |
| **NanoClaw** | 3 (0) | 22 (11) | None | **7.5** — Fast issue→fix velocity; privacy hardening momentum |
| **NullClaw** | 1 (1) | 0 (0) | None | **7.0** — Quiet but stable; A2A client feature finalized |
| **IronClaw** | 50 (26) | 50 (15) | **v1.1.1-rc.1** | **8.0** — RC shipped; 26 issues closed; XL PRs strain review |
| **LobsterAI** | 4 (3) | 29 (17) | None | **7.5** — Steady shipping; provider-isolation bug unaddressed |
| **Moltis** | 1 (0) | 2 (0) | None | **5.0** — Low velocity; build-blocker regression open |
| **CoPaw (QwenPaw)** | 19 (12) | 49 (25) | None (v2.1.0 imminent) | **8.0** — Release-ready; responsive triage; strong Chinese-market focus |
| **ZeptoClaw** | 0 | 0 | None | **N/A** — Dormant |
| **ZeroClaw** | 33 (6) | 50 (1) | None | **4.5** — S0 security fix closed, but 49/50 PRs open = severe review bottleneck |

**Note:** Health score weighs merge throughput, issue-response rate, severity backlog, and release cadence. OpenClaw's and ZeroClaw's raw volume reflects their large contributor bases, not necessarily higher responsiveness.

---

## 3. OpenClaw's Position

**Advantages:**
- **Ecosystem gravity:** 500 issues/PRs daily, 358 active issues, and a plugin SDK make it the de-facto reference implementation — the project peers measure themselves against.
- **Engineering maturity:** P0 incidents (beta publish boot-loop) are resolved within hours; maintainer-led refactors (export-collision cleanup, session-accessor simplification, Plugin SDK baseline) show continuous investment in code health.
- **Breadth:** Only project with an explicit plugin SDK, session snapshots, memory trust tagging, per-agent cost budgets, and A2A support in active discussion simultaneously.

**Technical approach differences:**
- TypeScript/lockstep-versioned monorepo with companion `@openclaw/*` plugins — stricter coupling than NanoBot's pip-based modularity or ZeroClaw's Rust/WASM plugin vision.
- Deep Codex/native-agent integration (subagent tools, OAuth) is further along than peers.
- Gateway/session-resumption architecture targets long-lived production deployments, evidenced by the `EmbeddedAttemptSessionTakeoverError` and heartbeat-routing bug class.

**Community size comparison:**
- OpenClaw's daily activity (500+500) is 10× NanoBot's, 10× IronClaw's, and 15× Hermes'. It is the only project with a "clawsweeper" triage automation layer and issue ratings — indicating an organizational, not just open-source, operational model.

**Vulnerability:** The P1/P2 backlog (many open since Feb–Mar 2026) grows faster than maintainer decisions. Silent reply failures (#121058, 50 comments) and memory-poisoning defense (#7707) are high-demand items without merged fixes.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Silent failure observability** | OpenClaw, NanoClaw, NanoBot, ZeroClaw, IronClaw | Undelivered replies, dropped messages on ID reuse, error routing for scheduled tasks, invisible SOP load failures — demand is for *loud* validation and operator-visible diagnostics |
| **Agent loop / token-abuse guardrails** | NanoBot, PicoClaw, LobsterAI, IronClaw, OpenClaw | `/goal` reply storms, 10M-token dream-consolidation loops, repeated identical tool failures, no-progress false positives — need idle detection, loop bounds, cost caps |
| **Memory architecture & provenance** | OpenClaw, NanoBot, IronClaw, ZeroClaw, CoPaw | Trust tagging by source, lifecycle/backend decoupling, bounded snippets, embedding hot-updates, consolidation retry — moving from "works" to "safe and governed" |
| **MCP ecosystem maturity** | NanoBot, NanoClaw, IronClaw, CoPaw, Hermes | OAuth web authorization, remote Streamable HTTP servers, tool-inheritance by subagents, connection-status surfacing, degradation after hours |
| **Credential/security hardening** | ZeroClaw, NanoClaw, Hermes, PicoClaw, OpenClaw | Webhook fail-closed auth (S0), CSPRNG pairing codes, profile secret leakage, remote exec default-deny, prompt-injection defense |
| **OAuth & provider reliability** | OpenClaw, NanoBot, Hermes | Codex/Claude-cli refresh dead-ends in background lanes; custom-endpoint API-key isolation |
| **Per-chat/per-agent model control** | ZeroClaw, CoPaw, LobsterAI, IronClaw | Per-chat model switching, per-model thinking levels, provider fallback by failure class |
| **Cost governance** | OpenClaw, NanoBot, IronClaw | Per-agent budgets, usage logging (`/insights`), bounded memory payloads (8 KiB), CI artifact cost reduction |
| **Session lifecycle & persistence** | OpenClaw, Hermes, CoPaw, Moltis, NanoClaw | Checkpoints/rollback, main-session delete/archive, crash/resume conformance, recovery across gateway restarts |
| **WebUI/UX expectations** | NanoBot, CoPaw, LobsterAI, IronClaw, Hermes | PWA support, tabbed panes, formula rendering, rich file cards, accessible streaming (aria-live), idle CPU burns |

---

## 5. Differentiation Analysis

| Project | Target User / Positioning | Architectural Signature |
|---|---|---|
| **OpenClaw** | Production operators, plugin developers; the "standard" | TypeScript monorepo + plugin SDK; largest channel surface; gateway-centric session model |
| **NanoBot** | Power users, tinkerers; fastest iteration | Python, pip-installable; WebUI-first; aggressive community feature intake (PWA, tabs, insights) |
| **Hermes Agent** | Research/advanced users (NousResearch lineage) | Muse-Glimmer model integration; desktop client + TUI; god-file sharding policy; parallel platform connects |
| **PicoClaw** | Embedded/hobbyist (Sipeed); lightweight | Small footprint; schema-v4 config migration; security hardening focus |
| **NanoClaw** | Privacy-conscious operators | Privacy-safe logging; remote MCP support; breaking Agent-Templates→Plugins migration |
| **NullClaw** | Multi-instance/A2A deployments | A2A protocol v0.3.0 serve + new client-side `a2a_call`; minimal change surface |
| **IronClaw** | NEAR AI ecosystem; enterprise-adjacent | Rust-touched reliability culture; Reborn-loop stabilization; "kernel + pluggable ACP loops" strategy |
| **LobsterAI** | Chinese-market desktop users (NetEase Youdao) | Electron-style desktop; Cowork multi-agent UI; OpenClaw gateway under-the-hood |
| **Moltis** | Self-hosters building from source | Sandbox-centric; CDP browser UI; low merge velocity |
| **CoPaw (QwenPaw)** | Chinese-market omnichannel (Feishu/QQ/WeCom) | ReMe Light memory; Computer Use; strong Console UX; v2.1.0 imminent |
| **ZeroClaw** | Security-critical, SOP-driven operators | Rust; WASM plugin foundation; Standard Operating Procedures (SOP) engine; fail-closed webhook philosophy |
| **ZeptoClaw** | — | Dormant |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, high merge throughput:**
- **NanoBot** (102 PRs merged/day, 87% close rate) — community feature factory; risk is quality-control with so many inbound PRs.
- **CoPaw** (25 merged, release-ready) — strongest issue-to-fix cycle among Chinese-market projects.
- **IronClaw** (RC shipped, 26 issues closed) — maturing toward a disciplined 1.1.1 stable.

**Tier 2 — Heavy activity, constrained by review bandwidth:**
- **OpenClaw** — immense contributor base; bottleneck is maintainer/product decisions on long-lived P1/P2s.
- **Hermes Agent** — high submission velocity (48 open PRs) but near-zero merge rate in this window; duplicate-closure triage is active, suggesting a review crunch.
- **ZeroClaw** — 49 open PRs vs 1 merge = the clearest review bottleneck in the ecosystem; stacked XL plugin PRs stall the architectural roadmap.

**Tier 3 — Steady, focused maintenance:**
- **NanoClaw**, **LobsterAI**, **PicoClaw** — consistent small-batch merges; each has 1–3 stale items needing maintainer decisions.

**Tier 4 — Quiet/Stable:**
- **NullClaw** (feature finalization), **Moltis** (low velocity, build regression), **ZeptoClaw** (no activity).

---

## 7. Trend Signals

1. **"Fail loudly" is the new reliability bar.** Across OpenClaw, NanoClaw, ZeroClaw, and IronClaw, users consistently report failures that are indistinguishable from success: dropped messages, swallowed errors, misleading status banners. Expect observability tooling (structured diagnostics, validation warnings, operator dashboards) to be a competitive differentiator in 2026 H2.

2. **Runaway-cost protection is becoming table stakes.** NanoBot's 10M-token single-loop incident and OpenClaw's per-agent budget request signal that LLM-cost governance is moving from nice-to-have to required feature. Watch for loop-idle detection, spend caps, and usage analytics (`/insights`) to coalesce into a standard feature set.

3. **MCP is the universal integration fabric — but OAuth and remote access are the missing layers.** Four projects independently hit MCP connection/auth/reliability issues. The next ecosystem milestone is a shared convention for MCP OAuth flows and remote (non-stdio) server management.

4. **Memory is shifting from storage to policy.** OpenClaw's provenance tagging, ZeroClaw's lifecycle/backend RFC, IronClaw's 8 KiB snippet bounds, and NanoBot's consolidation-loop bug all point to the same conclusion: the hard problems are governance (what to keep, who to trust, how much to spend), not embeddings.

5. **Per-conversation model/provider control is a rising demand.** ZeroClaw, CoPaw, and LobsterAI all field requests for per-chat model switching, per-model thinking levels, and failure-class-based provider fallback. Single-global-model configuration is no longer acceptable to power users.

6. **Channel breadth is now table stakes — and increasingly localized.** Chinese-platform support (Feishu, QQ, WeCom, WeChat) in CoPaw, ZeroClaw, and LobsterAI parallels Western-platform depth in OpenClaw/NanoBot. Projects targeting global adoption must treat CN channels as first-class.

7. **Security hardening correlates with ecosystem leadership.** The top-tier projects (OpenClaw, ZeroClaw, NanoClaw) are the ones shipping S0/S1 security fixes — webhook fail-closed auth, CSPRNG pairing codes, remote-exec default-deny. Security posture is becoming a visible proxy for project maturity.

---

*Report generated from 2026-08-11 community digests. Metrics reflect a 24-hour window and may not represent long-term trends.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-11

## 1. Today's Overview

NanoBot saw very high contributor activity in the last 24 hours: **117 PRs were updated**, with **102 closed/merged** and **15 still open**, while only **5 issues** were updated (3 closed, 2 open). No new releases were published. The bulk of activity centered on WebUI improvements, provider-specific fixes (OpenRouter, DeepSeek), MCP connectivity/tooling, and agent loop/stability fixes. The PR volume suggests a healthy, fast-moving open-source project, though several bug reports about repeated replies and token-heavy loops indicate that agent runtime safeguards remain an active area of work.

## 2. Releases

**No new releases were published in the last 24 hours.** No version-specific changes, breaking changes, or migration notes to report.

## 3. Project Progress

Notable closed/merged PRs from the 24-hour window include:

- **OpenRouter server tools support** — [PR #5335](https://github.com/HKUDS/nanobot/pull/5335) merges Chat Completions `extraBody.tools` into NanoBot’s generated tool list while preserving ordinary `extraBody` fields. This also documents optional OpenRouter web search/fetch server tools, resolving [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333).
- **WebUI focus ring polish** — [PR #5326](https://github.com/HKUDS/nanobot/pull/5326) softens form-control focus rings and centralizes focus treatment.
- **Proxy-configured OpenAI Codex endpoint** — [PR #2292](https://github.com/HKUDS/nanobot/pull/2292) is closed/merged; it allows `openaiCodex.apiBase` and `apiKey` configuration instead of always using the hardcoded Codex OAuth flow.
- **Telegram per-chat group policy overrides** — [PR #3323](https://github.com/HKUDS/nanobot/pull/3323) adds per-chat `group_policy` control for Telegram groups.
- **Read-only sessions** — [PR #4271](https://github.com/HKUDS/nanobot/pull/4271) skips LLM processing for sessions marked `metadata.read_only = true`.
- **Subagents inherit MCP tools** — [PR #4192](https://github.com/HKUDS/nanobot/pull/4192) adds opt-in `tools.subagentMcpAccess`, letting spawned subagents inherit live `mcp_*` tools from the main agent.
- **WebSocket session recovery** — [PR #4139](https://github.com/HKUDS/nanobot/pull/4139) accepts a `target_chat_id` hint in `new_chat` to avoid losing history on page refresh.
- **Modular system prompt** — [PR #4022](https://github.com/HKUDS/nanobot/pull/4022) adds the ability to toggle system prompt components.
- **Azure Speech voice-to-text** — [PR #3970](https://github.com/HKUDS/nanobot/pull/3970) adds Azure Speech Service voice-to-text transcription for Telegram/WhatsApp.
- **Usage logging and `/insights`** — [PR #3921](https://github.com/HKUDS/nanobot/pull/3921) adds JSONL token usage logging and a `/insights [days]` command.
- **Comprehensive hardening/refactor** — [PR #1298](https://github.com/HKUDS/nanobot/pull/1298) is closed/merged; it introduces per-session locks, sensitive-argument log scrubbing, and other robustness improvements.

Open PRs also show active work on **WebUI tabbed panes** ([PR #5322](https://github.com/HKUDS/nanobot/pull/5322)), **PWA support** ([PR #5336](https://github.com/HKUDS/nanobot/pull/5336)), and **MCP runtime connection failure surfacing** ([PR #5331](https://github.com/HKUDS/nanobot/pull/5331)).

## 4. Community Hot Topics

Issue comment activity was relatively low, but the most discussed issues were:

- [Issue #5297](https://github.com/HKUDS/nanobot/issues/5297) — *[CLOSED] [enhancement] MCP OAuth web authorization* — 3 comments. User wants NanoBot to support MCP servers requiring web-based OAuth, e.g., `https://app.xmind.com/api/mcp`, including remote/gateway access via IP/domain. This indicates real demand for OAuth-managed MCP workflows.
- [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) — *[OPEN] [bug] `/goal` produces dozens of repeated replies while waiting for user's answer* — 2 comments. High-visibility agent loop bug.
- [Issue #5324](https://github.com/HKUDS/nanobot/issues/5324) — *[CLOSED] [bug] Dream memory consolidation enters infinite loop* — 2 comments. The loop consumed 10M+ tokens in 23 minutes, causing serious cost concerns.

On the PR side, the **PWA/mobile gesture work** is attracting attention: [PR #4494](https://github.com/HKUDS/nanobot/pull/4494) was reopened/conflicted, and [PR #5336](https://github.com/HKUDS/nanobot/pull/5336) cherry-picks the PWA portion with authorship preserved. This suggests continued community interest in installable/mobile-friendly WebUI.

## 5. Bugs & Stability

Ranked by severity:

1. **Dream memory consolidation infinite loop / token drain** — [Issue #5324](https://github.com/HKUDS/nanobot/issues/5324) — **High severity**. The memory consolidation task ran for 23 minutes and consumed over 10M tokens (~half a month of usage). The issue is closed, but no dedicated fix PR appeared in the 24h update list, so regressions should be monitored.
2. **Repeated reply loops while waiting/reasoning** — [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) and [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) — **High severity / UX-breaking**. A single `/goal` message produced dozens of near-identical replies; another user saw random repetition of phrases like *“Good points, let me investigate the issue”*. [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) is an open fix that bounds sustained-goal continuation when a turn goes idle, directly targeting #5256.
3. **DeepSeek message handling** — [PR #3869](https://github.com/HKUDS/nanobot/pull/3869) — **Medium severity** for DeepSeek users. It addresses null-content 400 errors, `"(empty)"` placeholder leakage, and unconditional assistant-text dropping. Still open and marked as conflicting; likely needs maintainer review.
4. **Message-split indentation corruption** — [PR #5334](https://github.com/HKUDS/nanobot/pull/5334) — **Medium severity**. Fixes indentation loss after newline-based splits and avoids whitespace-only chunks, including Signal UTF-16 offset correctness.
5. **OpenRouter tool merging** — [PR #5335](https://github.com/HKUDS/nanobot/pull/5335) — **Medium severity / compatibility**. The OpenAI SDK merge of `extra_body` was losing NanoBot's own tools when OpenRouter server tools were used; this is now fixed.
6. **MCP runtime connection status** — [PR #5331](https://github.com/HKUDS/nanobot/pull/5331) — **Medium severity / WebUI correctness**. Surfaces real `connecting` / `connected` / `failed` states from the gateway and excludes failed/unknown MCPs from Ready, improving debuggability.

## 6. Feature Requests & Roadmap Signals

- **OpenRouter server tools** — [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333) was closed by [PR #5335](https://github.com/HKUDS/nanobot/pull/5335), so OpenRouter Web Search/Web Fetch/Fusion-style tools are likely to appear in the next release.
- **MCP OAuth web authorization** — [Issue #5297](https://github.com/HKUDS/nanobot/issues/5297) is a closed enhancement request, but no implementation PR is visible yet. Given MCP momentum, an OAuth gateway flow may be a future feature.
- **PWA support and mobile sidebar gestures** — [PR #5336](https://github.com/HKUDS/nanobot/pull/5336) is open and a strong roadmap signal; [PR #4494](https://github.com/HKUDS/nanobot/pull/4494) is the older/conflicting version. PWA support is likely to land soon.
- **Tabbed pane workbench** — [PR #5322](https://github.com/HKUDS/nanobot/pull/5322) is open and introduces a substantial WebUI layout model (tabs, panes, columns, rows, grid, monocle). This suggests an upcoming power-user UI upgrade.
- **Agent Plugins with CLI Apps** — [PR #5288](https://github.com/HKUDS/nanobot/pull/5288) is open and proposes integrating vendor-neutral Agent Plugins with CLI Apps. It is marked with a conflict label, so it may need design discussions before merging.
- **Community features already completed** — modular system prompts ([PR #4022](https://github.com/HKUDS/nanobot/pull/4022)), JSONL usage logging + `/insights` ([PR #3921](https://github.com/HKUDS/nanobot/pull/3921)), subagent MCP inheritance ([PR #4192](https://github.com/HKUDS/nanobot/pull/4192)), and read-only sessions ([PR #4271](https://github.com/HKUDS/nanobot/pull/4271)) all advanced to closed/merged state, showing that community-requested features are being actively shipped.

## 7. User Feedback Summary

- **OAuth-needed MCP servers are a real blocker**: [Issue #5297](https://github.com/HKUDS/nanobot/issues/5297) specifically calls out XMind MCP, with users wanting remote/gateway-based OAuth authorization.
- **Agent loops are the most painful current bug**: [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) and [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) describe noisy, repeated replies that require user intervention or auto-cancellation.
- **Cost/token abuse is a major concern**: [Issue #5324](https://github.com/HKUDS/nanobot/issues/5324) shows that a single faulty Dream memory consolidation run consumed more than half a month of tokens. Users need stronger loop detection and runaway-cost protection.
- **Positive community engagement**: [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333) explicitly thanks maintainers, and multiple contributors submitted polished PRs such as PWA support and usage tracking. Overall, feedback is constructive and feature-focused.

## 8. Backlog Watch

Potentially neglected or attention-requiring threads:

- [PR #3869](https://github.com/HKUDS/nanobot/pull/3869) — **Open since 2026-05-16** — DeepSeek message hardening. Important for DeepSeek users, but marked with a conflict label and still not merged.
- [PR #4494](https://github.com/HKUDS/nanobot/pull/4494) — **Open since 2026-06-24** — Original PWA + mobile swipe PR. Now largely superseded by [PR #5336](https://github.com/HKUDS/nanobot/pull/5336); maintainers should decide whether to close it to avoid duplicate/conflicting work.
- [PR #5288](https://github.com/HKUDS/nanobot/pull/5288) — **Open since 2026-08-07** — Agent Plugins integration with CLI Apps. This is a significant architectural proposal with a conflict label; it needs maintainer direction.
- [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) — **Open since 2026-08-05** — Fix for sustained-goal continuation when the turn goes idle. Directly linked to the reported `/goal` loop bug; should be prioritized for stability.

Overall, NanoBot is in a high-activity phase with strong contributor momentum. The main health risk is agent loop/token-abuse bugs in goal-driven and memory-reasoning paths, while WebUI/UX and provider compatibility continue to improve at a rapid pace.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-11

## 1. Today's Overview

The Hermes Agent repository showed high activity in the last 24 hours: **50 issues updated** (48 open, 2 closed) and **50 PRs updated** (48 open, 2 closed/merged). No new release was published. The majority of updated work is still open, with many new PRs submitted on Aug 11 covering fixes, features, and tests. Two duplicate items were closed during triage — issue [#83784](https://github.com/NousResearch/hermes-agent/issues/83784) and PR [#83815](https://github.com/NousResearch/hermes-agent/pull/83815) — indicating active issue management. Overall, the project is in a high-velocity, community-driven contribution phase.

## 2. Releases

No releases were published in the last 24 hours. No changelog, breaking-change, or migration notes are available for this digest period.

## 3. Project Progress

No release shipped, but the PR pipeline is active. The visible closed PR in this snapshot is:

- [#83815](https://github.com/NousResearch/hermes-agent/pull/83815) — closed as a duplicate; it addressed the same `/model <name>` provider-deduplication problem as [#66128](https://github.com/NousResearch/hermes-agent/pull/66128).

The second closed/merged PR was outside the visible top-20 slice. On the issue side, [#83784](https://github.com/NousResearch/hermes-agent/issues/83784) was closed as a duplicate.

Notable open PRs that advanced today:

- [#83809](https://github.com/NousResearch/hermes-agent/pull/83809) — parallel messaging-platform connects, fixing the serialized-startup regression in [#83791](https://github.com/NousResearch/hermes-agent/issues/83791).
- [#83830](https://github.com/NousResearch/hermes-agent/pull/83830) — keeps Windows venv Scripts off the user PATH.
- [#83823](https://github.com/NousResearch/hermes-agent/pull/83823) — fixes dashboard PTY state desync during reconnect.
- [#83824](https://github.com/NousResearch/hermes-agent/pull/83824) — adds recovery of tool calls from Muse-Glimmer's ATEM markup.
- [#83826](https://github.com/NousResearch/hermes-agent/pull/83826) — adds a warning when `API_SERVER_KEY` is too short.
- [#83829](https://github.com/NousResearch/hermes-agent/pull/83829) — scopes Telegram `session_search` to the current conversation.
- [#83831](https://github.com/NousResearch/hermes-agent/pull/83831) — backfills Kanban blocked-task idempotency handling.
- [#83816](https://github.com/NousResearch/hermes-agent/pull/83816) — adds Bale gateway support with Persian localization.

## 4. Community Hot Topics

The most active issue by a wide margin is the repo-wide god-file decomposition epic:

- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — **67 comments**. The community is invested in the 2026-08 standing policy that "all god files are sharded, never reverted." This is a major architectural signal and an open `needs-decision` item.

Other highly discussed items:

- [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) — **11 comments / 1 👍**: Desktop client renderer/GPU processes spin at 100% CPU at idle, causing high energy usage. Strong user frustration around resource consumption.
- [#69178](https://github.com/NousResearch/hermes-agent/issues/69178) — **8 comments**: Native Discord `/model` and `/profile` commands ignore multiplexed channel profile routes.
- [#69603](https://github.com/NousResearch/hermes-agent/issues/69603) — **6 comments / 1 👍**: `state.db` repair/re-corrupt cascade; session-state corruption recurring.
- [#11347](https://github.com/NousResearch/hermes-agent/issues/11347) — **5 comments / 5 👍**: Request for `/detach` so the agent can continue running in the background after exiting the CLI. This is the most upvoted feature request in the visible set.
- [#83791](https://github.com/NousResearch/hermes-agent/issues/83791) — **5 comments**: Messaging-platform connects are serialized, allowing one platform's failure to cascade.
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) — **5 comments**: Security-sensitive report that default-profile secrets leak into secondary profiles' terminal/Kanban subprocesses under `multiplex_profiles`.

## 5. Bugs & Stability

Ranked by severity and impact:

1. **Secret / credential leakage**
   - [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) — default profile secrets leak into secondary profiles' `terminal` tool and Kanban worker subprocesses under `gateway.multiplex_profiles`. No fix PR is visible in this snapshot.
   - [#83612](https://github.com/NousResearch/hermes-agent/issues/83612) — `model_aliases` custom endpoint ignores its `api_key` and sends the default provider's key to the custom host, causing both 401s and a credential leak.

2. **File corruption**
   - [#83714](https://github.com/NousResearch/hermes-agent/issues/83714) — the `patch` tool inserts literal `...[truncated]` text into written files, corrupting source code. High priority because it directly breaks file edits.

3. **Gateway availability**
   - [#83791](https://github.com/NousResearch/hermes-agent/issues/83791) — serialized messaging-platform connects let one platform's failure block others. A fix exists: [#83809](https://github.com/NousResearch/hermes-agent/pull/83809).

4. **Windows PTY input broken**
   - [#83773](https://github.com/NousResearch/hermes-agent/issues/83773) — `submit_stdin` appends LF on winpty, but canonical mode requires CR; stdin never reaches the child process.

5. **Session-state corruption**
   - [#69603](https://github.com/NousResearch/hermes-agent/issues/69603) — `state.db` repair/re-corrupt cascade; schema surgery is only serialized in-process, and `sqlite_master` edits never bump the schema cookie.

6. **Runtime compatibility regressions**
   - [#83642](https://github.com/NousResearch/hermes-agent/issues/83642) — auxiliary endpoint rewrite breaks Anthropic-only custom gateways.
   - [#35062](https://github.com/NousResearch/hermes-agent/issues/35062) — WeChat cron pushes silently fail after v0.15 with `ret=-3`.
   - [#58784](https://github.com/NousResearch/hermes-agent/issues/58784) — rough token estimates undercount CJK/fullwidth text.
   - [#82943](https://github.com/NousResearch/hermes-agent/issues/82943) — hindsight plugin's `config_changed` never matches, causing daemon SIGTERM on every session start.

7. **Config/CLI behavior**
   - [#83750](https://github.com/NousResearch/hermes-agent/issues/83750) — API Server cannot be enabled; [#83826](https://github.com/NousResearch/hermes-agent/pull/83826) adds a warning but is not yet a full fix.
   - [#83814](https://github.com/NousResearch/hermes-agent/issues/83814) — `/model <name>` fails with duplicate-provider errors; superseded by PR [#66128](https://github.com/NousResearch/hermes-agent/pull/66128).
   - [#71446](https://github.com/NousResearch/hermes-agent/issues/71446) — custom desktop backend skins do not persist across restarts.

8. **CI/test breakage**
   - [#83743](https://github.com/NousResearch/hermes-agent/issues/83743) — `test_profile_route_and_nonmultiplexed_resolution_preserve_boundaries` always fails after [#83550](https://github.com/NousResearch/hermes-agent/issues/83550).

Also seen but closed as duplicate:

- [#83784](https://github.com/NousResearch/hermes-agent/issues/83784) — MoA reference context trim does not fire when rough token estimates undercount CJK-dense transcripts.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals include both user-facing features and architectural refactoring:

- [#11347](https://github.com/NousResearch/hermes-agent/issues/11347) — `/detach`: run Hermes in the background after exiting the TUI/CLI. 5 👍 makes it the most popular requested feature in this snapshot.
- [#16636](https://github.com/NousResearch/hermes-agent/issues/16636) — expandable tool-call messages in the TUI.
- [#80921](https://github.com/NousResearch/hermes-agent/issues/80921) — machine-checked crash/resume conformance suite for session persistence, inspired by arXiv:2608.03836.
- [#15021](https://github.com/NousResearch/hermes-agent/issues/15021) — Persian/Thai translation work for messaging docs.
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) and [#78642](https://github.com/NousResearch/hermes-agent/issues/78642) — repo-wide god-file sharding is now standing policy; expect continued decomposition of large files such as `tools/mcp_tool.py`.

Likely next-version candidates based on open PRs:

- Native Ollama `/api/chat` adapter — [#73285](https://github.com/NousResearch/hermes-agent/pull/73285)
- Persistent goals loaded from files — [#70015](https://github.com/NousResearch/hermes-agent/pull/70015)
- Parallel gateway platform connects — [#83809](https://github.com/NousResearch/hermes-agent/pull/83809)
- Per-server MCP `env_file` isolation — [#74809](https://github.com/NousResearch/hermes-agent/pull/74809)
- ATEM tool-call recovery for Muse-Glimmer — [#83824](https://github.com/NousResearch/hermes-agent/pull/83824)

## 7. User Feedback Summary

- **Resource consumption is the loudest complaint.** The desktop client GPU/renderer CPU spin at idle ([#73082](https://github.com/NousResearch/hermes-agent/issues/73082)) is a clear quality-of-life issue.
- **Users are hitting isolation bugs.** Examples include skills pollution between Hermes and OpenClaw ([#17345](https://github.com/NousResearch/hermes-agent/issues/17345)), profile secret leaks ([#82936](https://github.com/NousResearch/hermes-agent/issues/82936)), and MCP environment conflicts ([#74809](https://github.com/NousResearch/hermes-agent/pull/74809)).
- **Windows support is a recurring pain point.** Issues include PTY stdin not reaching children ([#83773](https://github.com/NousResearch/hermes-agent/issues/83773)) and PATH pollution from the installer ([#83830](https://github.com/NousResearch/hermes-agent/pull/83830)).
- **Feature interest is strong but backlogged.** The `/detach` request ([#11347](https://github.com/NousResearch/hermes-agent/issues/11347)) shows users want long-running agent sessions independent of the CLI.
- **Users are contributing fixes directly.** The large number of community-submitted PRs on Aug 11 indicates a healthy contributor ecosystem, even while several fixes are still awaiting review.

## 8. Backlog Watch

These items have been open for a while, are still active, and appear to need maintainer attention:

- [#11347](https://github.com/NousResearch/hermes-agent/issues/11347) — `/detach` feature; open since Apr 17, 5 👍, no visible PR.
- [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) — skills repo pollution between Hermes and OpenClaw; open since Apr 29.
- [#15021](https://github.com/NousResearch/hermes-agent/issues/15021) — Thai translation for messaging docs; open since Apr 24.
- [#24731](https://github.com/NousResearch/hermes-agent/issues/24731), [#24687](https://github.com/NousResearch/hermes-agent/issues/24687), [#24736](https://github.com/NousResearch/hermes-agent/issues/24736) — three TOCTOU/concurrency races reported May 13.
- [#35062](https://github.com/NousResearch/hermes-agent/issues/35062) — WeChat cron `ret=-3` regression; open since May 30.
- [#69178](https://github.com/NousResearch/hermes-agent/issues/69178) — Discord native slash commands ignore multiplexed profile routes; open since Jul 22.
- [#69603](https://github.com/NousResearch/hermes-agent/issues/69603) — `state.db` repair/re-corrupt cascade; open since Jul 22.
- [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) — desktop 100% CPU at idle; open since Jul 28.
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — god-file sharding epic; open since Aug 4, currently `needs-decision`.

Long-running PRs that may need review or follow-up:

- [#44772](https://github.com/NousResearch/hermes-agent/pull/44772) — drop `agent-browser`/`@streamdown-math` from root npm deps; open since Jun 12.
- [#68808](https://github.com/NousResearch/hermes-agent/pull/68808) — preserve MCP tool filters across reconnects; open since Jul 21.
- [#69928](https://github.com/NousResearch/hermes-agent/pull/69928) — include `items` in Gemini native array tool schemas; open since Jul 23.
- [#70015](https://github.com/NousResearch/hermes-agent/pull/70015) — load persistent goals from files; open since Jul 23.
- [#73285](https://github.com/NousResearch/hermes-agent/pull/73285) — native Ollama `/api/chat` adapter; open since Jul 28.
- [#74809](https://github.com/NousResearch/hermes-agent/pull/74809) — isolate per-server MCP `env_file` resolution; open since Jul 30.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-11

## Today's Overview

PicoClaw shows moderate activity in the last 24 hours: 5 issues were updated (3 still open, 2 closed), 8 pull requests were updated (2 open, 6 closed/merged), and no new releases were published. The current referenced version remains **v0.3.1 (2cf030d)**. The project has healthy contributor flow, especially around security hardening, Telegram channel rendering, and build hygiene. However, several important bugs and fixes are marked stale and waiting for maintainer review, particularly around tool-failure loops and `customAllowPatterns` behavior.

## Releases

**No new releases in the last 24 hours.** No changelog, migration notes, or breaking-change announcements are available for this digest period.

## Project Progress

The six closed/merged PRs advanced several areas:

- **[#3297 — `fix(security): harden remote prompt and exec boundaries`](https://github.com/sipeed/picoclaw/pull/3297)**  
  Security hardening for remote prompts and exec handling, including default-disabled remote exec and config migration to schema v4.

- **[#3327 — `feat(telegram): render tables with native rich messages`](https://github.com/sipeed/picoclaw/pull/3327)**  
  Telegram table output is no longer always reduced to monospaced code blocks; GFM tables and supported HTML tables now use Bot API rich messages.

- **[#3295 — `fix(channels): prevent SplitMessage hang on oversized fence headers`](https://github.com/sipeed/picoclaw/pull/3295)**  
  Fixes a channel-message splitter hang when fenced-code info strings exceed `maxLen`, with regression coverage.

- **[#3296 — `i18n: complete Czech code wrap labels`](https://github.com/sipeed/picoclaw/pull/3296)**  
  Completes Czech localization labels.

- **[#3326 — `fix(web): remove duplicate pnpm lock entries`](https://github.com/sipeed/picoclaw/pull/3326)**  
  Unblocks `pnpm install --frozen-lockfile` by removing duplicate `semver@7.8.5` lock entries.

- **[#1547 — `fix: merge PR #1466 #1465`](https://github.com/sipeed/picoclaw/pull/1547)**  
  A long-lived internal fix-merge PR was closed.

Two fix PRs remain open and need attention:

- **[#3312 — `fix(agent): stop turn early on repeated identical tool failure`](https://github.com/sipeed/picoclaw/pull/3312)** — addresses the silent tool-loop bug.
- **[#3314 — `Fix: agent not able to execute shell command added to customAllowPatterns`](https://github.com/sipeed/picoclaw/pull/3314)** — addresses allow-list precedence bug.

## Community Hot Topics

The most-commented issues were:

- **[#3294 — `/list models only shows the current model instead of all configured models`](https://github.com/sipeed/picoclaw/issues/3294)** — 3 comments, closed as stale.  
  Users expect `/list models` to show every configured model, not just the active one. The command name and description imply a full listing, so this is a UX/transparency gap that may need a fresh, non-stale report.

- **[#3301 — `/clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules`](https://github.com/sipeed/picoclaw/issues/3301)** — 3 comments, open but stale.  
  This affects users relying on dispatch rules with non-default agents. Session lifecycle features (`/clear`, auto-compression) break in that routing path, impacting long-running chats on Discord/Telegram.

- **[#3298 — `Add AI Router as an OpenAI-compatible provider preset`](https://github.com/sipeed/picoclaw/issues/3298)** — 2 comments, closed as stale.  
  Users can already use AI Router via generic OpenAI-compatible config, but want named provider presets for easier onboarding.

Underlying signals: users want **transparent model listing**, **provider preset ergonomics**, and **session-management reliability across dispatch-rule routing**.

## Bugs & Stability

Ranked by severity:

1. **High — [#3311: Repeated identical tool failure loops silently to `max_tool_iterations`](https://github.com/sipeed/picoclaw/issues/3311)**  
   A turn can spin for minutes re-running the same failing tool, and the user never gets an answer. Seen in production over Telegram with a `git` command. A fix PR exists: [#3312](https://github.com/sipeed/picoclaw/pull/3312), currently open and stale.

2. **Medium — [#3328: `line.settings.webhook_host` / `webhook_port` are never read](https://github.com/sipeed/picoclaw/issues/3328)**  
   Newly filed today. The config fields are declared, defaulted, and documented, but nothing consumes them. Silent no-op config hurts user trust. No fix PR yet.

3. **Medium — [#3301: Session `clear`/auto-compression broken with dispatch-rule routed chats](https://github.com/sipeed/picoclaw/issues/3301)**  
   Open and stale, with no linked fix PR. Impacts non-default agent routing.

4. **Low — [#3294: `/list models` only shows current model](https://github.com/sipeed/picoclaw/issues/3294)**  
   Real functional/UX bug, but closed as stale without a code fix.

Also notable: closed fixes today include the `SplitMessage` hang [#3295](https://github.com/sipeed/picoclaw/pull/3295) and remote exec/prompt security hardening [#3297](https://github.com/sipeed/picoclaw/pull/3297).

## Feature Requests & Roadmap Signals

- **[#3298 — AI Router as an OpenAI-compatible provider preset](https://github.com/sipeed/picoclaw/issues/3298)** was closed as stale, but the request indicates demand for **more first-class provider presets** beyond the generic OpenAI endpoint.

- **Native Telegram rich table rendering** from [#3327](https://github.com/sipeed/picoclaw/pull/3327) is a channel-UX improvement likely to land in the next release if merged.

- **Schema v4 config migration** from security PR [#3297](https://github.com/sipeed/picoclaw/pull/3297) signals upcoming config-structure changes around remote exec defaults.

- **Czech i18n completion** ([#3296](https://github.com/sipeed/picoclaw/pull/3296)) shows continued community investment in localization.

If the closed PRs are merged, the next PicoClaw version could include: security hardening, Telegram rich tables, a message-splitter hang fix, and lockfile/CI improvements. Open PRs [#3312](https://github.com/sipeed/picoclaw/pull/3312) and [#3314](https://github.com/sipeed/picoclaw/pull/3314) are strong candidates for the following release.

## User Feedback Summary

- Users want **commands to match their documented behavior**: `/list models` should list all configured models, not just the active one.
- Dispatch-rule users are hitting **session lifecycle bugs** (`/clear`, auto-compression) in non-default agent chats.
- The **silent tool-failure loop** is a production pain point: users wait minutes and receive no reply.
- `customAllowPatterns` being overridden by default deny rules is confusing and breaks legitimate shell commands like `git push`.
- Documented config options that do nothing, such as `webhook_host`/`webhook_port`, are a trust issue.
- Community contributions are broadly positive: security hardening, localization, and channel rendering improvements are being submitted and closed.

## Backlog Watch

Items needing maintainer attention:

- **[#3301 — dispatch-rule session bugs](https://github.com/sipeed/picoclaw/issues/3301)** — open since 2026-07-29, 3 comments, marked stale, no linked fix PR.

- **[#3312 — repeated tool failure loop fix](https://github.com/sipeed/picoclaw/pull/3312)** — open since 2026-08-02, marked stale; directly fixes a high-severity bug.

- **[#3314 — `customAllowPatterns` fix](https://github.com/sipeed/picoclaw/pull/3314)** — open since 2026-08-03, marked stale; needs review and decision.

- **[#3294 — `/list models` incomplete listing](https://github.com/sipeed/picoclaw/issues/3294)** — closed as stale despite a plausible bug; may need reopening or replacement with a clearer report.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-11

## 1. Today's Overview

NanoClaw is in a sustained maintenance-and-hardening cycle: 22 PRs were updated in the last 24 hours, with 11 merged/closed and 11 still open. Issue activity was quieter (3 open issues updated, 0 closed), but the open items are high-signal — all three concern silent failures in message delivery or error routing, a theme echoed across several PRs. No new releases were published, so merges are accumulating toward the next version. Overall the project is healthy: contributors are actively triaging reliability gaps, fixing security hardening items, and landing a large refactor series by a single author.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

The most significant change is remote Streamable HTTP MCP server support, which landed in two parts: **[PR #3092](https://github.com/nanocoai/nanoclaw/pull/3092) (closed)** adds the engine/Claude-provider capability, and **[PR #3221](https://github.com/nanocoai/nanoclaw/pull/3221) (closed)** extends it to the codex and opencode providers, fixing the stdio-only assumption in `McpServerConfig`. This is a notable feature milestone for provider interoperability.

Other merged/closed work in the last 24 hours:

- **Fix — [PR #3228](https://github.com/nanocoai/nanoclaw/pull/3228):** deduplicates turn-scoped chat delivery, addressing duplicate-message behavior.
- **Feature — [PR #3222](https://github.com/nanocoai/nanoclaw/pull/3222):** adds an opt-in `privacySafeLogs` setting for DM logging, omitting user IDs and raw adapter errors while preserving existing default behavior.
- **Fix — [PR #3215](https://github.com/nanocoai/nanoclaw/pull/3215):** redacts DM resolution logs — a complement to #3222.
- **Docs — [PR #3216](https://github.com/nanocoai/nanoclaw/pull/3216):** clarifies that `install_packages` in the hardened-image guide covers apt and npm only.
- **Refactors (zvi-fried):** host seams for skill-owned capabilities ([#3186](https://github.com/nanocoai/nanoclaw/pull/3186)), channel question-renderer registration ([#3213](https://github.com/nanocoai/nanoclaw/pull/3213)), unified module lifecycle hooks ([#3214](https://github.com/nanocoai/nanoclaw/pull/3214)), and a module migration registry ([#3212](https://github.com/nanocoai/nanoclaw/pull/3212)) — a cohesive architectural cleanup reducing inferred behavior.

## 4. Community Hot Topics

The most active items by discussion and follow-up activity:

- **[Issue #3226 — Inbound messages silently dropped when a platform reuses a message id](https://github.com/nanocoai/nanoclaw/issues/3226)** (dweekly): the clearest user-facing failure this cycle. A reused message ID causes a primary-key insert conflict, and the message is dropped before reaching the agent — indistinguishable from "the agent ignored me." The author immediately filed a companion fix, **[PR #3224](https://github.com/nanocoai/nanoclaw/pull/3224)**, indicating strong issue-to-fix velocity.

- **[Issue #3075 — Silent log loss + duplicate-insert errors after long uptime; no systemd unit installed](https://github.com/nanocoai/nanoclaw/issues/3075)** (libellebilai-collab, open since 2026-07-17): the longest-running open issue, touching the same session-DB/duplicate-insert territory as #3226 plus a missing systemd unit for deployments. It represents a real operator pain point that may deserve a maintainer response.

- **[PR #3229 — fix(telegram): generate pairing codes with a CSPRNG, not Math.random()](https://github.com/nanocoai/nanoclaw/pull/3229)** (chiptoe-svg): security-focused and quickly paralleled by **[PR #3225](https://github.com/nanocoai/nanoclaw/pull/3225)** (dweekly), which also hardens pairing-store file permissions. Two independent contributors converging on the same vulnerability suggests community awareness of the issue.

## 5. Bugs & Stability

Ranked by severity:

1. **Silent inbound message drops on platform ID reuse — [Issue #3226](https://github.com/nanocoai/nanoclaw/issues/3226).** Critical for trust: messages are lost with no user-visible sign. Fix exists: **[PR #3224](https://github.com/nanocoai/nanoclaw/pull/3224)** preserves inbound messages across platform ID reuse in the session database.

2. **Unroutable error messages for failed scheduled tasks — [Issue #3223](https://github.com/nanocoai/nanoclaw/issues/3223).** When a scheduled-task turn throws, the error is written as a `chat` message carrying routing fields from a task message that has none by design — so the operator never learns the task failed. No fix PR yet; this needs a routing solution for task-originated errors.

3. **Silent log loss + duplicate-insert errors after long uptime — [Issue #3075](https://github.com/nanocoai/nanoclaw/issues/3075).** Long-running instances lose logs and hit duplicate-insert errors; likely shares a root-cause family with #3226. Also flags missing systemd unit for service management.

4. **Weak Telegram pairing codes — [PR #3229](https://github.com/nanocoai/nanoclaw/pull/3229) / [PR #3225](https://github.com/nanocoai/nanoclaw/pull/3225).** `Math.random()`‑generated pairing codes are predictable; both PRs switch to `crypto.randomInt` (4→6 digits in #3229) and enforce owner-only store permissions.

## 6. Feature Requests & Roadmap Signals

- **Breaking change incoming: Agent Templates → Agent Plugins 1.0.0 — [PR #3220](https://github.com/nanocoai/nanoclaw/pull/3220) (open).** A format migration for the template feature, with a security fix component (stamp-time symlink/caps/secret hardening). Paired with **[PR #2909](https://github.com/nanocoai/nanoclaw/pull/2909)** (open), which adds the template setup-wizard flow and first-agent stamping. Together these point to a richer plugin ecosystem in the next release.
- **Remote Streamable HTTP MCP servers** across all providers ([#3092](https://github.com/nanocoai/nanoclaw/pull/3092), [#3221](https://github.com/nanocoai/nanoclaw/pull/3221)) — likely included in the next version.
- **CLI bounded JSON stdin — [PR #3218](https://github.com/nanocoai/nanoclaw/pull/3218) (open):** a generic `--stdin-json` mode for host and container `ncl` clients, enabling structured scripted input without changing request framing or authorization.
- **Transactional upgrades — [PR #3195](https://github.com/nanocoai/nanoclaw/pull/3195) (open):** makes `ncl update` rollback-safe, responding to upgrade-failure concerns.

## 7. User Feedback Summary

- **Silent failures erode trust.** Users reported that dropped inbound messages are indistinguishable from an unresponsive agent ("the agent ignored me"), and that failed scheduled tasks produce no operator-visible error. The recurring theme is a demand for *observability of failures*, not just fixing the drop itself.
- **Privacy concerns in logging.** DM resolution logs exposed user IDs and raw adapter errors; contributors responded with both an opt-in privacy-safe mode ([#3222](https://github.com/nanocoai/nanoclaw/pull/3222)) and default redaction ([#3215](https://github.com/nanocoai/nanoclaw/pull/3215)) — a fast, community-driven response.
- **Deployment friction.** A WSL2/Docker Desktop user reported missing systemd unit and long-uptime instability ([#3075](https://github.com/nanocoai/nanoclaw/issues/3075)); another user has waited since April for Apple Silicon/Colima environment variables to be included in the launchd plist ([#2134](https://github.com/nanocoai/nanoclaw/pull/2134)).
- **Security awareness is high.** Two independent contributors filed Telegram pairing-code hardening PRs within hours of each other, showing active community auditing.

## 8. Backlog Watch

- **[PR #2134 — include Apple Silicon + Colima env vars in launchd plist](https://github.com/nanocoai/nanoclaw/pull/2134)**: open since **2026-04-29** — over three months. Important for macOS Apple Silicon users; needs maintainer review/merge or explicit closure.
- **[Issue #3075 — silent log loss + duplicate-insert errors; no systemd unit](https://github.com/nanocoai/nanoclaw/issues/3075)**: open since 2026-07-17. Overlaps with #3226/#3224; maintainers should confirm whether the session-DB fix resolves the long-uptime variant and address the systemd unit request.
- **[PR #3145 — db: backfill destinations for existing wirings](https://github.com/nanocoai/nanoclaw/pull/3145)**: open since 2026-07-28; migration 021 adds missing channel destinations. Pending review despite being a data-integrity fix.
- **[PR #2909 — template setup flow in the wizard](https://github.com/nanocoai/nanoclaw/pull/2909)**: open since 2026-07-02; blocked/linked to the #3220 breaking template change and needs coordination.
- **[PR #3195 — transactional upgrades](https://github.com/nanocoai/nanoclaw/pull/3195)**: open since 2026-08-06; a robustness improvement that could prevent upgrade-induced outages.

---

*Data sources: GitHub issues and pull requests for `nanocoai/nanoclaw`, updated 2026-08-10/11.*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

## NullClaw Project Digest — 2026-08-11

### 1. Today's Overview
NullClaw had a quiet but meaningful 24-hour window: 1 issue was updated, 0 pull requests changed state, and 0 new releases were published. The sole update was the closure of Issue #700, which concerned adding an `a2a_call` client tool for interacting with remote A2A agents. This suggests feature-related maintenance is being finalized, even though no PR activity was captured today. No new bugs or stability concerns were reported, so overall project health appears stable. The next visible milestone is likely making the completed A2A client functionality available in a release.

### 2. Releases
No new releases were published in the last 24 hours. There are therefore no changelog entries, breaking changes, or migration notes to report for this digest period.

### 3. Project Progress
- **No pull requests** were merged or closed in the last 24 hours.
- **Issue #700 was closed**: [Issue #700](https://github.com/nullclaw/nullclaw/issues/700) — "Add a2a_call client tool for calling remote agents." This issue was created on 2026-03-23 and updated on 2026-08-10. Since no PR appeared in the 24-hour window, the closure likely reflects the acceptance or integration of previously submitted work rather than a fresh PR merge today.

### 4. Community Hot Topics
- [Issue #700: Add a2a_call client tool for calling remote agents](https://github.com/nullclaw/nullclaw/issues/700) — 1 comment, 1 👍. This is the only active discussion item in the window. The author describes needing a client-side `a2a_call` tool to send `message/send` JSON-RPC requests to remote agents. The use case is running two NullClaw instances: a public-facing doorman and a private personal agent. The reaction count indicates modest user support, and the issue being closed suggests maintainer acceptance of the underlying need.

### 5. Bugs & Stability
No bugs, crashes, regressions, or stability-related issues were reported or updated in the last 24 hours. There are no severity-ranked items to list at this time.

### 6. Feature Requests & Roadmap Signals
- The main roadmap signal is **client-side A2A protocol support**, as described in [Issue #700](https://github.com/nullclaw/nullclaw/issues/700). NullClaw already serves the A2A protocol v0.3.0, but lacked the ability to call other agents as a client.
- Since the issue was closed, the `a2a_call` tool is likely to appear in an upcoming NullClaw release. This would enable bidirectional agent-to-agent communication and support more complex multi-instance deployments, such as the public doorman + private agent architecture mentioned by the issue author.

### 7. User Feedback Summary
- One user contributed a concrete implementation rather than just filing a request, showing active community engagement.
- The underlying pain point is **lack of native A2A client capability**, forcing multi-instance users to work around the limitation.
- The use case highlights demand for **inter-agent interoperability**, especially for deployments using separate public-facing and private agent roles.
- The issue's closure and positive reaction suggest satisfaction with the direction, though no post-merge feedback is available yet.

### 8. Backlog Watch
No long-unanswered issues or pull requests require maintainer attention within this 24-hour window. The only tracked issue, #700, was closed after roughly 4.5 months, meaning it is no longer a backlog item. There are no other open items visible in the current update window.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-11

## Today's Overview

IronClaw saw heavy activity on 2026-08-11: 50 issues and 50 PRs were updated in the last 24 hours, with 26 issues closed and 15 PRs merged/closed. One new release candidate, `ironclaw-v1.1.1-rc.1`, was published. The project remains concentrated on Reborn-era loop/tooling stabilization, CI coverage restoration, extension disclosure correctness, memory/context bounding, and a set of large architecture-moving PRs. The overall health signal is strong, but review bandwidth is likely strained by several XL-sized PRs and a cluster of newly filed loop/tool bugs.

## Releases

### `ironclaw-v1.1.1-rc.1`
Released 2026-08-10 as an "urgent patch candidate for the 1.1 line." Highlights from the release notes:

- Channel delivery and pairing fixes
- IronHub/custom MCP compatibility improvements
- WebUI streaming stability work
- Durable retrieval fixes
- Safer upgrades from both supported stable predecessors

Migration note: the release notes begin with an upgrade warning for 1.0.0 users: **"Stop all writers"** before upgrading. This suggests a coordinated write-halt/downtime step is required for safe migration from 1.0.0.

## Project Progress

Notable merged/closed PRs in the last 24 hours:

- [#7442](https://github.com/nearai/ironclaw/pull/7442) — Install the packages the catalog already publishes: installs every companion file published for an IronHub skill with path validation, digest verification, and aggregate checking.
- [#7493](https://github.com/nearai/ironclaw/pull/7493) — Restore main coverage gates: Telegram run-reaction mappings, vendor rate-limit/auth-rejection paths, and web-push E2E expectations.
- [#7494](https://github.com/nearai/ironclaw/pull/7494) — Cover bounded memory search branches, including UTF-8 rounding and cap-exhaustion cases.
- [#7495](https://github.com/nearai/ironclaw/pull/7495) — Add unattended scheduled-run protocol for loop-owned runs triggered by `ScheduledTrigger`.
- [#7436](https://github.com/nearai/ironclaw/pull/7436) — Bound native memory search result snippets to 8 KiB of raw UTF-8 content before serialization.
- [#7410](https://github.com/nearai/ironclaw/pull/7410) — Complete fair tool-search discovery and benchmark arms: bounded complete input signatures, semantic namespace summaries, and representative-tool rounds.
- [#7325](https://github.com/nearai/ironclaw/pull/7325) — Default `origin_gate_matrix` to a safe interactive fallback instead of failing closed when omitted.

Several closed issues also reflect finished audit/architecture work, including [#7145](https://github.com/nearai/ironclaw/issues/7145), [#7147](https://github.com/nearai/ironclaw/issues/7147), [#7149](https://github.com/nearai/ironclaw/issues/7149), [#7150](https://github.com/nearai/ironclaw/issues/7150), and [#7151](https://github.com/nearai/ironclaw/issues/7151), alongside extension layout cleanup ([#6492](https://github.com/nearai/ironclaw/issues/6492)) and TrustClass semantics resolution ([#3604](https://github.com/nearai/ironclaw/issues/3604)).

## Community Hot Topics

- [#7137](https://github.com/nearai/ironclaw/issues/7137) — **12 comments** — Open enhancement request to stop `live-canary` shards from uploading 700MB–1.5GB artifacts each. Underlying need: GitHub Actions storage cost, slow downloads, and painful triage caused by uploading regenerable/intermediate paths.
- [#7145](https://github.com/nearai/ironclaw/issues/7145) — **4 comments** — Closed sizing issue for the extension_host → loops re-layer. Discussion centered on measuring architectural work from residue, not file counts.
- [#7482](https://github.com/nearai/ironclaw/issues/7482) — **3 comments** — New epic proposing IronClaw as a "kernel" with pluggable ACP agent loops and edge credential injection. Signals a major strategic direction.
- [#7317](https://github.com/nearai/ironclaw/issues/7317) — **3 comments** — Closed proposal for a doc-truth verification pipeline. Underlying pain: breaking changes shipped without matching documentation updates.
- [#6257](https://github.com/nearai/ironclaw/issues/6257) — **3 comments** — Open bug: PDF send/generation fails with `Invalid value (attachments.mime_type)`. Customer-reported via Slack.
- [#3762](https://github.com/nearai/ironclaw/issues/3762) — **2 comments** — Long-running P1: editing `AGENTS.md` in the WebUI does not update the system prompt for current or future conversations.

## Bugs & Stability

New/updated bugs ranked by severity:

1. **Context window silently evicts the task** — [#7484](https://github.com/nearai/ironclaw/issues/7484)  
   The per-turn prompt keeps only the newest N messages, with N hard-capped at 128 in three places. This can evict the user's task entirely. Requested fix: pin user messages, compact on eviction, revisit the clamp.

2. **Token estimator double-counts ASCII** — [#7485](https://github.com/nearai/ironclaw/issues/7485)  
   Two inconsistent estimators exist; the transcript one uses `bytes/2`, which for ASCII is ~2 chars/token, effectively halving the usable context window.

3. **Disclosure bridge tools hardcoded to exclusive serialization** — [#7488](https://github.com/nearai/ironclaw/issues/7488)  
   `tool_search`, `tool_describe`, and `tool_call` are all `ConcurrencyHint::Exclusive`, despite metadata lookups being side-effect-free. This serializes batches and discards batch tails.

4. **`tool_search` disarms describe-first safety** — [#7487](https://github.com/nearai/ironclaw/issues/7487)  
   Tools are marked as disclosed without schemas being returned, and `oneOf` required fields can collapse to empty. This weakens the "describe before calling" protection mechanism.

5. **No-progress escape false-positives** — [#7486](https://github.com/nearai/ironclaw/issues/7486)  
   Idempotent reads/polling are hashed as `NoChange` and can terminally fail legitimate long-running runs.

6. **`retry_disposition()` is dead code** — [#7490](https://github.com/nearai/ironclaw/issues/7490)  
   The ~25-category transient-failure table meant to drive silent redrive is never wired in.

Fixed or addressed today:

- [#7483](https://github.com/nearai/ironclaw/issues/7483) — NEAR AI default provider probes fail without API key; fix PR [#7492](https://github.com/nearai/ironclaw/pull/7492) is open.
- [#7436](https://github.com/nearai/ironclaw/pull/7436) — Bounded memory search snippets, reducing oversized result payloads.
- [#7325](https://github.com/nearai/ironclaw/pull/7325) — Defaulted `origin_gate_matrix`, preventing extension capability startup failures.

Closed user-facing bugs from the QA batch include [#7294](https://github.com/nearai/ironclaw/issues/7294) (agent falsely remembers a Telegram routine from another scope) and [#7247](https://github.com/nearai/ironclaw/issues/7247) (agent falsely claims GitHub is already connected).

## Feature Requests & Roadmap Signals

- **Pluggable agent loops / kernel architecture** — [#7482](https://github.com/nearai/ironclaw/issues/7482)  
  Major epic: IronClaw becomes the scheduling/tenancy/secrets/audit kernel; agent loops become off-the-shelf ACP agents. Likely a long-running strategic effort rather than near-term release content.

- **Host-mediated IdentyClaw Passport** — [#7496](https://github.com/nearai/ironclaw/issues/7496)  
  Requests a `builtin.idcp` host seam and practitioner helper for processless agents. A matching PR is already open: [#7499](https://github.com/nearai/ironclaw/pull/7499).

- **OMP coding-tool surface** — [#7489](https://github.com/nearai/ironclaw/issues/7489)  
  Tracking issue for `result_read` 24 KiB preview ceiling and the 2000-line uneditable wall. Resolution is expected via the omp cutover in [#7491](https://github.com/nearai/ironclaw/pull/7491).

- **WebUI title hover** — [#7481](https://github.com/nearai/ironclaw/issues/7481)  
  Small UX request: reveal long conversation titles on hover in the left sidebar.

- **Live `AGENTS.md` system-prompt updates** — [#3762](https://github.com/nearai/ironclaw/issues/3762)  
  P1, v1.3.0-scoped. Persistent user-facing gap.

- **Deferred tool discovery improvements** — [#7405](https://github.com/nearai/ironclaw/issues/7405)  
  Closed; complete signatures and namespace-aware catalog previews appear to have landed via [#7410](https://github.com/nearai/ironclaw/pull/7410).

Prediction: `1.1.1` stable should follow shortly from the RC. The v1.3.0 timeframe likely carries `AGENTS.md` live-reload, improved tool-search signatures, and continued Reborn loop stability work. The ACP "kernel" epic may remain a multi-release background effort.

## User Feedback Summary

Real user pain points visible in this window:

- PDFs fail to send/generate with `Invalid value (attachments.mime_type)` — [#6257](https://github.com/nearai/ironclaw/issues/6257).
- Slack integration setup fails for at least one real user — [#6834](https://github.com/nearai/ironclaw/issues/6834).
- Agent falsely claims Telegram routines or GitHub connections already exist, eroding trust — [#7294](https://github.com/nearai/ironclaw/issues/7294), [#7247](https://github.com/nearai/ironclaw/issues/7247).
- Editing `AGENTS.md` in the UI does not affect ongoing conversations — [#3762](https://github.com/nearai/ironclaw/issues/3762).
- Default NEAR AI provider dialog fails when no API key is set — [#7483](https://github.com/nearai/ironclaw/issues/7483).
- Practitioners want host-mediated IdentyClaw Passport support without shell/processless restrictions — [#7496](https://github.com/nearai/ironclaw/issues/7496).

Overall, users are positively pushing for better integration reliability, less hallucinated state, lower-friction provider setup, and stronger identity/passport support. The recurring theme is **trust and predictability**: users want the agent to verify state before claiming success.

## Backlog Watch

- [#3762](https://github.com/nearai/ironclaw/issues/3762) — `AGENTS.md` WebUI edits do not update system prompt. Open since May 2026, P1, v1.3.0. Needs maintainer scheduling.
- [#6257](https://github.com/nearai/ironclaw/issues/6257) — PDF MIME-type error. Open since July 19, no visible fix PR yet.
- [#7137](https://github.com/nearai/ironclaw/issues/7137) — CI shard artifact bloat. Open since August 4, 12 comments, needs a CI/storage decision.
- [PR #7001](https://github.com/nearai/ironclaw/pull/7001) — Keep cached system prefix byte-stable across model calls. Open since August 1, XL size.
- [PR #7274](https://github.com/nearai/ironclaw/pull/7274) — Preserve Anthropic prompt cache across tool promotion. Open since August 6.
- [PR #7284](https://github.com/nearai/ironclaw/pull/7284) — Bound WebUI SSE reconnect storms. Open since August 6.
- [PR #7471](https://github.com/nearai/ironclaw/pull/7471) — Lease expiry recovery and journal heartbeat pool isolation. Open since August 10 and directly addresses a user-visible `lease_expired` run failure.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-11

## 1. Today's Overview
LobsterAI saw a busy development day: 29 PRs were updated in the last 24 hours, with 17 merged/closed and 12 still open, while issue activity was low at 4 updated issues (1 open, 3 closed as stale). No new releases were published in this window. The PR pipeline is clearly focused on Cowork UX improvements, model thinking-level configuration, and OpenClaw runtime stability. The few user-submitted issues that surfaced are mostly older, pain-point reports that were closed by stale automation rather than fixed. Overall, the project is shipping steadily in small increments, but a few long-standing user blockers remain unresolved.

---

## 2. Releases
No new releases in this window.

---

## 3. Project Progress
The main merged/closed PR activity centered on **Cowork UI/UX**, **model settings**, **OpenClaw runtime reliability**, and **dependency upgrades**. Notable items from the sampled top-20 PRs:

- **Per-model/global thinking levels**
  - [PR #2457](https://github.com/netease-youdao/LobsterAI/pull/2457) — Add configurable thinking levels for supported models, including OpenClaw alias mapping and persistence.
  - [PR #2475](https://github.com/netease-youdao/LobsterAI/pull/2475) — *Open*: Fix model selector so each model keeps its own thinking level instead of a shared global value.

- **Cowork UX enhancements**
  - [PR #2473](https://github.com/netease-youdao/LobsterAI/pull/2473) — Add right-click context menu for local file links (open-with, save-as, copy path, reveal in folder).
  - [PR #2471](https://github.com/netease-youdao/LobsterAI/pull/2471) — Render submitted file attachments as clickable file cards instead of raw text paths.
  - [PR #2472](https://github.com/netease-youdao/LobsterAI/pull/2472) — Add cowork activity group collapse.
  - [PR #2469](https://github.com/netease-youdao/LobsterAI/pull/2469) — Add collapse-agent-tasks shortcut and allow modifier shortcuts while typing.
  - [PR #2468](https://github.com/netease-youdao/LobsterAI/pull/2468) — Unify streaming loading indicators across cowork.

- **UI / interaction fixes**
  - [PR #2476](https://github.com/netease-youdao/LobsterAI/pull/2476) — Dismiss topmost overlay on Escape, fixing nested modal handling.
  - [PR #2474](https://github.com/netease-youdao/LobsterAI/pull/2474) — Align sidebar sites icon stroke weight.

- **Settings / attention**
  - [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241) — Settings closes now warn about unsaved changes (closes [#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)).
  - [PR #1239](https://github.com/netease-youdao/LobsterAI/pull/1239) — Flash taskbar/Dock icon when AI tasks complete or fail in background.

- **OpenClaw runtime / stability**
  - [PR #2454](https://github.com/netease-youdao/LobsterAI/pull/2454) — Stop tool-loop guard from killing legitimate polling.
  - [PR #2470](https://github.com/netease-youdao/LobsterAI/pull/2470) — Surface provider runtime failures on late chat errors instead of swallowing them.
  - [PR #2466](https://github.com/netease-youdao/LobsterAI/pull/2466) — Fix renderer init IPC stall retry.
  - [PR #2467](https://github.com/netease-youdao/LobsterAI/pull/2467) — Repair stale pip shims on Windows runtime upgrade.

- **Dependency updates**
  - [PR #1766](https://github.com/netease-youdao/LobsterAI/pull/1766) — Vite `5.4.21 → 8.0.13` (closed).
  - [PR #1764](https://github.com/netease-youdao/LobsterAI/pull/1764) — React DOM `18.3.1 → 19.2.6` (closed).
  - Open counterparts remain: [PR #2465](https://github.com/netease-youdao/LobsterAI/pull/2465) (Vite `8.2.1`) and [PR #2464](https://github.com/netease-youdao/LobsterAI/pull/2464) (React DOM `19.2.8`).

---

## 4. Community Hot Topics
Issue discussion is very light this window — no PRs in the visible sample have meaningful comment counts, and no reactions were recorded. The most-discussed issues each have only 2 comments, but they represent real user pain points:

- [Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240) — **"One provider rate-limited blocks all models and dialogs"**  
  User reports that after exhausting an API quota, the entire LobsterAI app becomes unusable across all agent windows, and a restart fails. This indicates a need for **per-provider failure isolation** and clearer quota-exhaustion handling.

- [Issue #1237](https://github.com/netease-youdao/LobsterAI/issues/1237) — **"Settings close silently loses unsaved API Key/config changes"**  
  User expects confirmation when closing Settings with unsaved changes. This was addressed by [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241).

- [Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062) — **"Task exceeds maximum duration"**  
  User attempted 24-hour continuous tasks and got an ambiguous timeout error; unclear whether the task stopped or continued running in the background. This points to a need for **long-running task controls, visibility, and resume behavior**.

- [Issue #1183](https://github.com/netease-youdao/LobsterAI/issues/1183) — **Open (stale)** — "Infinite overlay loop: OpenClaw gateway fails to start"  
  Windows user sees repeated "OpenClaw 网关未能在规定时间内启动成功" mask overlays. No fix PR is linked yet.

---

## 5. Bugs & Stability
Ranked by severity:

1. **High — Provider-level limitation cascades across all agents** ([Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240))  
   When one model provider is rate-limited, all dialogs/agents report failure and the app can fail to restart. This is the most severe stability report in the window. No fix PR is linked.

2. **High — OpenClaw gateway fails to start, causing looping overlay** ([Issue #1183](https://github.com/netease-youdao/LobsterAI/issues/1183))  
   Windows-specific, still open and stale. No merged fix is visible.

3. **Medium — Task timeout unclear, no visible continuation/resume path** ([Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062))  
   Users running long tasks hit the max-duration guard without understanding whether the task is still running. No fix PR linked.

4. **Low/UX — Settings unsaved changes silently discarded** ([Issue #1237](https://github.com/netease-youdao/LobsterAI/issues/1237))  
   Fixed by [PR #1241](https://github.com/netease-youdao/LobsterAI/pull/1241).

On the positive side, several stability fixes merged today directly target backend reliability: **tool-loop guard false positives** ([#2454](https://github.com/netease-youdao/LobsterAI/pull/2454)), **late provider errors being swallowed** ([#2470](https://github.com/netease-youdao/LobsterAI/pull/2470)), **renderer IPC stall retry** ([#2466](https://github.com/netease-youdao/LobsterAI/pull/2466)), and **Windows pip shim corruption** ([#2467](https://github.com/netease-youdao/LobsterAI/pull/2467)).

---

## 6. Feature Requests & Roadmap Signals
The strongest roadmap signal is **model thinking-level configuration**. Both the server-driven options added in [PR #2457](https://github.com/netease-youdao/LobsterAI/pull/2457) and the per-model fix in [PR #2475](https://github.com/netease-youdao/LobsterAI/pull/2475) suggest this is an active, near-ship feature.

Cowork is also receiving a wave of usability enhancements that will likely appear in the next release:
- File attachments rendered as rich cards ([#2471](https://github.com/netease-youdao/LobsterAI/pull/2471))
- Right-click file context menu ([#2473](https://github.com/netease-youdao/LobsterAI/pull/2473))
- Activity group collapse ([#2472](https://github.com/netease-youdao/LobsterAI/pull/2472))
- Collapse-agent-tasks keyboard shortcut ([#2469](https://github.com/netease-youdao/LobsterAI/pull/2469))

User-requested features that have now been implemented include **unsaved settings confirmation** ([#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) → [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)) and **taskbar/Dock attention for completed AI tasks** ([#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)).

---

## 7. User Feedback Summary
User sentiment in this window is dominated by **reliability concerns** rather than feature praise:

- **Provider lockout frustration**: One exhausted API key can make the whole app feel dead — users want independent failure domains.
- **Settings trust issue**: Users expect explicit confirmation before losing configuration changes.
- **Long-task anxiety**: Unclear timeout semantics make users unsure whether scheduled or long-running work is still alive.
- **Windows startup pain**: Repeated OpenClaw gateway startup overlays make the app unusable on some Windows setups.

There is very little explicit praise in the captured data, but the high volume of PRs and the fact that several user-reported issues are being picked up indicate a responsive maintainer team. The main dissatisfaction cluster is around **failover/isolation when a single model provider becomes unavailable**.

---

## 8. Backlog Watch
These items are old or stale and still need maintainer attention:

- [Issue #1183](https://github.com/netease-youdao/LobsterAI/issues/1183) — **OpenClaw gateway startup loop on Windows**  
  Open since 2026-04-01, stale, no fix PR. This is a Windows-specific blocker for some users.

- [PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181) — **Hide OpenClaw main agent sessions from session list**  
  Open since 2026-04-01, stale. A UX/confusion fix that has not been merged or closed.

- [Issue #1240](https://github.com/netease-youdao/LobsterAI/issues/1240) — **One provider rate-limit blocks all model use**  
  Closed as stale, but the underlying problem is severe and has no linked fix. Worth reopening or tracking as a known limitation.

- [Issue #2062](https://github.com/netease-youdao/LobsterAI/issues/2062) — **Task max-duration timeout ambiguity**  
  Closed as stale, but the requested transparency for long-running tasks remains unaddressed.

- Open dependency PRs [#2465](https://github.com/netease-youdao/LobsterAI/pull/2465) and [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464) should be tracked to completion to stay current after the recently merged Vite/React DOM upgrades.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Today's Overview

Moltis saw a quiet 24-hour window: **1 open issue** and **2 open PRs** were updated, with **no new releases** and **no PRs merged or closed**. The only new issue is a sandbox build failure caused by an incorrect `gogcli` GitHub URL. Two long-running PRs were touched — one improving session deletion/archiving and one adding an interactive browser UI — but neither has landed. Overall, the project appears stable but in a low-merge-velocity phase, with maintainers still actively iterating on existing feature work.

## Releases

No new releases were published in this period. There are no changelog entries, breaking changes, or migration notes to report.

## Project Progress

No PRs were merged or closed on 2026-08-11. However, two open PRs received updates:

- [PR #1182 – fix(sessions): allow deleting and archiving the main session](https://github.com/moltis-org/moltis/pull/1182)  
  Updated 2026-08-11. This PR addresses issue #1132 by removing the special `main` session guard, allowing the main session to be deleted or archived like any other session. This is a meaningful UX fix for session management.

- [PR #531 – feat(browser): interactive browser viewing UI with CDP screencast](https://github.com/moltis-org/moltis/pull/531)  
  Updated 2026-08-10. This feature PR aims to add live browser sessions, CDP screencast viewing, mouse/keyboard/scroll interaction, session history, and per-agent browser profile isolation. It remains open and under development.

## Community Hot Topics

No issues or PRs currently show significant comment or reaction activity. The single new issue — [Issue #1189](https://github.com/moltis-org/moltis/issues/1189) — has **0 comments and 0 reactions**, so there is no active community discussion thread to highlight.

The most substantive user-driven signal is [Pull Request #1182](https://github.com/moltis-org/moltis/pull/1182), which explicitly references and fixes issue #1132. This indicates an underlying user need for more flexible session lifecycle management, especially around the default `main` session.

## Bugs & Stability

- **[Issue #1189 – Sandbox build failing due to wrong gogcli GitHub URL](https://github.com/moltis-org/moltis/issues/1189)**  
  **Severity: Medium-High**  
  This is the only bug reported in the last 24 hours. The sandbox build is failing because the project references an incorrect `gogcli` GitHub URL. This blocks sandbox builds and likely affects users who build Moltis from source. Since no fix PR is currently attached, maintainers should verify and correct the dependency URL promptly. The author confirmed they are on the latest version, which points to a current regression or packaging issue.

## Feature Requests & Roadmap Signals

The active PRs point to two likely roadmap directions:

- **Session management improvements**: [PR #1182](https://github.com/moltis-org/moltis/pull/1182) directly addresses user request #1132, allowing deletion and archiving of the main session. This indicates a focus on making session handling more flexible and less restrictive.

- **Browser interaction and observability**: [PR #531](https://github.com/moltis-org/moltis/pull/531) adds a full browser viewing and interaction UI via CDP screencast, with per-agent cookie isolation. This is a substantial feature that may land in a future release, assuming it progresses through review.

No new feature requests were filed in this window, but these two PRs suggest the next version may include enhanced session lifecycle controls and a richer browser UI.

## User Feedback Summary

- **Pain point**: [Issue #1189](https://github.com/moltis-org/moltis/issues/1189) reports a build-blocking problem with the sandbox setup. The user followed the preflight checklist and uses the latest version, but the build still fails due to the `gogcli` URL issue.
- **Requested capability**: [PR #1182](https://github.com/moltis-org/moltis/pull/1182) reflects user demand to delete or archive the `main` session, a flexibility request that maintainers are actively addressing.
- **Satisfaction indicators**: There are no direct positive/negative sentiment signals in the current data. The lack of comments or reactions limits broader community feedback analysis, but continued PR updates show maintainer responsiveness.

## Backlog Watch

- **[PR #531 – feat(browser): interactive browser viewing UI with CDP screencast](https://github.com/moltis-org/moltis/pull/531)**  
  Open since **2026-03-31**, this PR is now more than four months old. It received activity on 2026-08-10, but it remains unmerged. Given its size and scope, it likely needs maintainer review, possible rebasing, or a clear roadmap decision on whether this feature will land in a near-term release.

- **[Issue #1189 – Sandbox build failing due to wrong gogcli GitHub URL](https://github.com/moltis-org/moltis/issues/1189)**  
  This issue is new, but it is a build blocker. If not addressed quickly, it could accumulate duplicate reports or frustrate contributors. Maintainer attention is recommended as a high-priority fix.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

## CoPaw / QwenPaw Project Digest — 2026-08-11

### 1. Today's Overview

QwenPaw is in a high-velocity maintenance and pre-release phase. In the last 24 hours, 19 issues were updated (12 closed), and 49 PRs were updated (25 closed/merged vs 24 still open). No new release was published, but an open PR preparing v2.1.0 release notes suggests a release is imminent. Activity spans both user-facing stabilisation — console scrolling, sandbox environment fixes, channel validation — and larger roadmap items such as marketplace unification, per-session model overrides, and workspace artifact cards. The project looks healthy: triage is responsive, regressions are being fixed quickly, and a mix of Chinese- and English-speaking users is actively reporting edge cases.

### 2. Releases

No new releases in the last 24 hours.

The latest versions referenced in issues are `v2.0.1`, `v2.1.0-beta.1`, `v2.1.0-beta.2`, and `v2.1.0b3`. PR [#6875](https://github.com/agentscope-ai/QwenPaw/pull/6875) is preparing v2.1.0 release notes and the 2026-08-12 News entry, so v2.1.0 may be expected shortly.

### 3. Project Progress

The visible closed/merged PRs in the top-20 sample show significant progress across several areas:

- **Memory reliability**: [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) — flush pending turns before compression.
- **Computer Use workflows**: [#6891](https://github.com/agentscope-ai/QwenPaw/pull/6891) — improve native input reliability with bounded keyboard-only sequences.
- **ReMe Light memory**: [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) — embedding hot updates, Daily Paper support, scheduled tasks, and a redesigned Console memory settings UI.
- **Channel configuration**: [#6907](https://github.com/agentscope-ai/QwenPaw/pull/6907) — allow custom gateway endpoints for Feishu, QQ, WeCom, XiaoYi, and Yuanbao; [#6909](https://github.com/agentscope-ai/QwenPaw/pull/6909) — warn when a bot is already used by another agent.
- **Sandbox fix**: [#6902](https://github.com/agentscope-ai/QwenPaw/pull/6902) — stop injecting `PYTHONHOME` into child processes, fixing the desktop Python crash regression.
- **Console UX**: [#6904](https://github.com/agentscope-ai/QwenPaw/pull/6904) — stabilise chat wheel scrolling.
- **Test cleanup**: [#6899](https://github.com/agentscope-ai/QwenPaw/pull/6899) — remove stale `project_dir` assertions in coding-mode tests.

Newer open PRs also indicate near-term direction: [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) unifies code block rendering with LaTeX/Mermaid preview tabs, [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) fixes HTTP 500s for invalid channel payloads, and [#6906](https://github.com/agentscope-ai/QwenPaw/pull/6906) makes `grep_search` result paths clickable in the editor.

### 4. Community Hot Topics

The most active issues by comment count are:

- **[#6732 — MCP tools periodically stop working](https://github.com/agentscope-ai/QwenPaw/issues/6732)** (10 comments, closed). MCP tools silently become unavailable after hours until a Docker container restart. This is a high-impact reliability concern for production agent usage.
- **[#6893 — Formula rendering, session grouping, active-session background](https://github.com/agentscope-ai/QwenPaw/issues/6893)** (7 comments, open). Users want proper LaTeX rendering in chat, grouping of conversations, and a clearer visual active-session state.
- **[#6803 — OpenAI-compatible requests rejected by strict providers](https://github.com/agentscope-ai/QwenPaw/issues/6803)** (6 comments, closed). StepFun rejected QwenPaw chat requests because payloads contained Responses-API `input_text` fields and raw streaming fields.
- **[#5790 — Loading animation does not disappear after agent response](https://github.com/agentscope-ai/QwenPaw/issues/5790)** (4 comments, closed). Console UI feedback state can get stuck, undermining trust in the agent status.

No issue in the sampled data had notable 👍 reactions — all were 0 — so comments are the primary engagement signal.

### 5. Bugs & Stability

Ranked roughly by severity:

- **Desktop Python subprocess crash**: [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) — frozen desktop app injected `PYTHONHOME`, breaking every Python child process. **Closed**. Fix PR: [#6902](https://github.com/agentscope-ai/QwenPaw/pull/6902).
- **MCP tool registration degrades until restart**: [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) — closed, but no explicit fix PR is visible in the sample; should be verified as resolved.
- **Console crash on Chinese IME composition**: [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) — open, message queue becomes unusable during agent runs. No fix PR yet.
- **Strict OpenAI provider incompatibility**: [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) — closed; payload structure needs to be aligned with chat-completions expectations.
- **Idle CPU burn from CSS animations**: [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) — closed; console renderer was repainting at ~18–22% CPU at idle.
- **Timezone-shifted timestamps**: [#6871](https://github.com/agentscope-ai/QwenPaw/issues/6871) — closed; historical messages shifted +8 hours after re-render.
- **HTTP 500 on invalid channel config**: [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) — open; client input should return 422, fix PR [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) is already open.
- **Daily page wrong-date grouping**: [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) — open; notes in subfolders appear under incorrect dates.
- **Background subagent false completion**: [#6722](https://github.com/agentscope-ai/QwenPaw/issues/6722) — closed; subagent reported success even when worktree finalization failed.

### 6. Feature Requests & Roadmap Signals

Notable user-requested features in the last 24 hours:

- **LaTeX rendering + session UX improvements**: [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893). PR [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) directly targets the rendering side with LaTeX/Mermaid preview tabs.
- **Auto-refresh session titles after auto-memory update**: [#6881](https://github.com/agentscope-ai/QwenPaw/issues/6881).
- **CopilotKit integration guidance**: [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882).
- **Reduced QQ bot workflow messages**: [#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897) — users want less verbose workflow output on QQ to avoid rate limiting.
- **Isolate chat project directories from agent workspace**: [#6900](https://github.com/agentscope-ai/QwenPaw/issues/6900) — closed, likely already addressed by the unified project-directory change.
- **Desktop font scaling, backend service mode, clickable file paths**: [#4154](https://github.com/agentscope-ai/QwenPaw/issues/4154) — closed after a long-running request.
- **Auto-Dream tolerance/retry**: [#6841](https://github.com/agentscope-ai/QwenPaw/issues/6841). Open PR [#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) makes Auto-Dream integration resilient to malformed LLM output.

Given PR [#6875](https://github.com/agentscope-ai/QwenPaw/pull/6875), v2.1.0 is likely being finalised. The most probable v2.1.0 features are already-merged work such as channel gateway overrides, memory embedding hot updates, and sandbox fixes. Larger roadmap PRs — [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) workspace artifacts, [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) unified marketplace, [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) provider discovery — may land just after the release.

### 7. User Feedback Summary

Real user pain points are concentrated around reliability and Chinese-localised UX:

- **MCP reliability** is a recurring concern: tools silently fail after hours, forcing container restarts ([#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)).
- **Chinese IME users** are hit with a hard console crash during agent runs ([#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885)).
- **QQ bot users** want less workflow spam in chat to avoid rate limits and notification fatigue ([#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897)).
- **Community-building desire**: users explicitly requested a WeChat group for broader Chinese community support ([#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895)).
- **Scientific/academic users** expect proper formula rendering; seeing raw TeX fallback was described as “awkward/embarrassing” ([#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)).
- **Satisfaction signals**: maintainers are closing issues quickly, and 25 PRs were closed/merged in a single day, suggesting an active and responsive development cycle.

### 8. Backlog Watch

Items that may need maintainer attention:

- **PR [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — Add per-session model overrides**. Opened July 12, first-time contributor, still under review. Important feature for multi-model workflows.
- **PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unify provider discovery, model metadata, routing, and agent controls**. Opened July 21, still open. Broad architectural change that touches Console and providers.
- **PR [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) — AnySearch web search integration**. Opened August 8, first-time contributor, still under review.
- **PR [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) — OneBot remote inbound voice/image media**. Opened August 5, under review.
- **Issue [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) — Chinese IME console crash**. Open and no fix PR yet; high impact for Chinese-speaking users.
- **Issue [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) — Daily page wrong-date grouping**. Open with only the author’s report; needs triage.
- **Issue [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) — CopilotKit integration question**. Open; users would benefit from an official example or docs pointer.

Overall, QwenPaw shows strong momentum: a large number of PRs are moving through review, critical regressions are being fixed within days, and the v2.1.0 release appears close.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-11

## Today's Overview

ZeroClaw is in a high-intensity stabilization and security-hardening phase: **33 issues** were updated in the last 24 hours (27 open, 6 closed) and **50 PRs** saw activity (49 open, 1 merged/closed), with no new releases published. The closure of an S0 gateway webhook authentication flaw ([#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)) marks a significant security win, but the open-PR queue (49) far outstrips merges (1), indicating a likely review/maintainer bottleneck — especially for the large stacked WASM plugin foundation PRs. A fresh wave of P1 bugs was filed on August 10–11 covering session-key handling, sandbox launcher resolution, skill-injection defaults, and memory-backend fallbacks, with at least one fix PR ([#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918)) already submitted. Community attention continues to concentrate on SOP reliability (silent failures, missing cancellation), memory architecture (RFC [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)), and model-switching ergonomics.

## Releases

**No new releases** were published in the 24-hour window. The latest release remains prior to this snapshot; no changelog, breaking-change, or migration notes are applicable today.

## Project Progress

- **Merged/closed PRs:** 1 PR was merged or closed, but it falls outside the top-20 by comment count in this snapshot, so its contents cannot be detailed here. The remaining 49 PRs are still open — a signal that review throughput, not author activity, is the current constraint.
- **Closed issues (6)** — all resolved in the last 24 hours:
  - [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) — **S0 security fix:** gateway webhook handlers (WhatsApp Cloud, Linq, WATI) now fail closed instead of dispatching unauthenticated attacker-controlled messages into the agent.
  - [#9596](https://github.com/zeroclaw-labs/zeroclaw/issues/9596) — Anthropic tool-result images are delivered as images rather than inlined base64 text.
  - [#9792](https://github.com/zeroclaw-labs/zeroclaw/issues/9792) — Git channel no longer silently drops all events (including SOP routes) when the peer allowlist resolves empty.
  - [#8967](https://github.com/zeroclaw-labs/zeroclaw/issues/8967) — WeChat `sendmessage` now honors in-body errors instead of reporting failed deliveries as successful.
  - [#9613](https://github.com/zeroclaw-labs/zeroclaw/issues/9613) — Monthly outdated-dependency CI scan no longer misclassifies scanner failures.
  - [#9874](https://github.com/zeroclaw-labs/zeroclaw/issues/9874) — RFC to rewrite ZeroClaw in Python and retire Rust was closed; the project remains on the Rust codebase.
- **Notable forward-progress PRs (open):**
  - [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918) — Small (size:S) P1 fix accepting the full `session_key` on abort/rename/state/message_post, resolving the double `gw_` prefix bug ([#9917](https://github.com/zeroclaw-labs/zeroclaw/issues/9917)).
  - [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — Pixel-level image validation to prevent corrupt images from failing provider requests (size:M, risk:high).
  - [#9921](https://github.com/zeroclaw-labs/zeroclaw/pull/9921) — Docs: FND-001 advanced to Rev. 9, retiring WATI references after the channel's removal in #9571.
  - [#9808](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) — Dependabot batch bump of the `rust-all` group with 46 updates (tokio, clap, etc.), awaiting merge.

## Community Hot Topics

- **[#6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** *(11 comments, open since May 22, needs-author-action, risk:high)* — The most-discussed item by far. Underlying need: a clean architectural boundary so consolidation/governance are not reimplemented by every gateway, channel, or backend; responders are clearly invested in the memory subsystem's future direction.
- **[#8600 — Easy per-chat model switching for multi-model providers](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)** *(4 comments, 1 👍, accepted, no-stale)* — A user migrating from moltis wants the full provider model set switchable per chat. Accepted as a tracker; the only issue in the snapshot with a 👍 reaction.
- **[#9779 — `sops_dir` documented default not honored; SOPs silently never load](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)** *(4 comments, P1, accepted, risk:high)* — Operators relying on the documented default get zero SOP loading with no error or log line. High resonance because failure is invisible.
- **[#9425 — Running SOP jobs have no operator cancellation path](https://github.com/zeroclaw-labs/zeroclaw/issues/9425)** *(4 comments, P1, in-progress, no-stale, risk:high)* — Web dashboard can list and view running SOP jobs but cannot stop them; severity S1 (workflow blocked).
- **[#9874 — RFC: Rewrite ZeroClaw in Python](https://github.com/zeroclaw-labs/zeroclaw/issues/9874)** *(3 comments, closed)* — Provocative but closed; the blunt critique of "100% Rust as branding" nonetheless reflects real onboarding-friction sentiment for some users.
- **PR stack watch:** JordanTheJet's stacked plugin foundation PRs ([#8857](https://github.com/zeroclaw-labs/zeroclaw/pull/8857), [#8923](https://github.com/zeroclaw-labs/zeroclaw/pull/8923), [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134), [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142), [#9129](https://github.com/zeroclaw-labs/zeroclaw/pull/9129)) remain the largest architectural conversation in the PR queue — all size:XL, risk:high, several tagged `needs-author-action`.

## Bugs & Stability

Bugs active or reported in the last 24 hours, ranked by severity:

**Critical / High**
- **[#9916 — Host launchers resolved before applying workspace cwd (S0, P1, risk:high)](https://github.com/zeroclaw-labs/zeroclaw/issues/9916)** — Follow-up from #9607 review: bare executable names are resolved by the child process environment, creating a sandbox/security risk when the coding CLI executes. **No fix PR yet.**
- **[#9917 — Session abort/rename/state/message_post treat full `session_key` as display id (double `gw_` prefix) (P1, in-progress, risk:high)](https://github.com/zeroclaw-labs/zeroclaw/issues/9917)** — Clients using the full DB `session_key` get `gw_gw_<id>`; abort incorrectly returns 200 `no_active_response`. **Fix PR exists:** [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918).
- **[#9912 — Restore full skill injection default through v0.8.x (P1, risk:high)](https://github.com/zeroclaw-labs/zeroclaw/issues/9912)** — Regression after #8313: `SkillsPromptInjectionMode` defaults to `compact`, degrading ordinary skill contributions. **No fix PR yet.**
- **[#9919 — Qdrant silently routed through MarkdownMemory fallback in builder-only factory (P1, accepted, risk:medium)](https://github.com/zeroclaw-labs/zeroclaw/issues/9919)** — Can select the wrong persistence layer without error; the issue itself proposes the corrective split.

**S1 / S2 (workflow-blocking / degraded)**
- **[#9901 — Unknown SOP step bullets silently treated as prose; `sop validate` still reports valid (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/9901)** — Runs execute with semantics different from the authored SOP. No fix PR.
- **[#9883 — Inbound WebP conversion decodes unbounded before shared image validator runs](https://github.com/zeroclaw-labs/zeroclaw/issues/9883)** — Security-adjacent resource risk split out from [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819); the related fix PR is open but tagged `needs-author-action`.
- **[#9909 — Matrix `mention_only` drops group replies to the bot without a fresh @-mention (S2)](https://github.com/zeroclaw-labs/zeroclaw/issues/9909)** — `m.in_reply_to` not considered before the mention gate.
- **[#9908 — `SkillDocument` truncates multi-paragraph block-scalar descriptions at blank lines (S2)](https://github.com/zeroclaw-labs/zeroclaw/issues/9908)** — Data loss on read/write of skill docs.
- **[#9896 — Status/startup banner reports `Memory: none` when effective backend is sqlite](https://github.com/zeroclaw-labs/zeroclaw/issues/9896)** — Misleading operator output.
- **[#9889 / #9890 — `cron_add` infers Agent from blank/null prompt keys; `update_job` skips delivery validation](https://github.com/zeroclaw-labs/zeroclaw/issues/9889)** — Cron tooling validation gaps (S2).

**Still-open SOP reliability cluster (updated today, P1)**
- [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) — documented `sops_dir` default never loads SOPs; [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) — malformed `SOP.toml` silently dropped; [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) — daemon reload not on SIGUSR1, and the degraded-security warning instructs a signal that kills the daemon.

**Security / CI**
- **[#9899 — RUSTSEC-2026-0247 (`bitmaps 3.2.1`) advisory breaks `cargo deny`](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)** — Tracker open since Aug 10; security CI currently failing via `imbl` → Matrix SDK dev-dependencies.

## Feature Requests & Roadmap Signals

- **Per-chat model switching is the clearest near-term feature signal:** [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) is accepted and stale-protected, and a brand-new request for a **[provider-grouped, paginated Telegram `/model` picker](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)** (Aug 10) is a direct mobile UX follow-on. Both are strong candidates for the next minor release.
- **SOP operator controls:** [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) (cancellation path) is P1 and in-progress — likely landing soon.
- **WASM plugin platform is the dominant roadmap investment:** the stacked PRs from JordanTheJet ([#8857](https://github.com/zeroclaw-labs/zeroclaw/pull/8857) scoped secrets/encrypted state, [#8923](https://github.com/zeroclaw-labs/zeroclaw/pull/8923) host-mediated TCP/STARTTLS, [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137) shared egress policy, [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142) named TLS profiles, [#9129](https://github.com/zeroclaw-labs/zeroclaw/pull/9129) channel config services, [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) exact component payload bytes, [#9577](https://github.com/zeroclaw-labs/zeroclaw/pull/9577) in-tree test fixture) define a coherent v0.9 plugin story. Many are `needs-author-action`, so landing depends on rebase/response plus maintainer review bandwidth.
- **Memory architecture:** RFC [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) (decouple lifecycle policy from storage backends) continues as the design reference for memory, reinforced by today's [#9919](https://github.com/zeroclaw-labs/zeroclaw/issues/9919) backend-fallback bug.
- **Other accepted/queued:** [#7518](https://github.com/zeroclaw-labs/zeroclaw/issues/7518) WhatsApp Web `ack_reactions` parity (accepted, no-stale); [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) context compaction anchored to model window ratio (P1, follow-up); [#9567](https://github.com/zeroclaw-labs/zeroclaw/pull/9567) email Cc/Bcc on a single message (stacked on the reply-threading work).

## User Feedback Summary

- **Recurring pain point: silent failures with no diagnostics.** Multiple reports, several from the same contributor, describe subsystems that fail invisibly: SOPs never loading despite documented defaults ([#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)), malformed SOPs dropped with `sop validate` reporting success ([#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786)), unknown SOP bullets silently treated as prose ([#9901](https://github.com/zeroclaw-labs/zeroclaw/issues/9901)), and git-channel events dropped at DEBUG only ([#9792](https://github.com/zeroclaw-labs/zeroclaw/issues/9792), now fixed). The underlying ask is clear: **validation and operational failures must be loud.**
- **Onboarding/migration friction:** the Python-rewrite RFC ([#9874](https://github.com/zeroclaw-labs/zeroclaw/issues/9874)) and the moltis migration request ([#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)) both signal that the Rust codebase's size/complexity and feature-parity gaps are felt by real users — even though the RFC was closed.
- **Trust in operator output:** [#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) (banner claiming `Memory: none` while sqlite is active) and [#9912](https://github.com/zeroclaw-labs/zeroclaw/issues/9912) (silent default change to `compact` skill injection) show how regressions in defaults/status can mislead operators and degrade agent behavior.
- **Satisfaction signals:** six issues — including an S0 security hole — were closed within 24 hours, and a steady stream of distinguished/principal contributors (JordanTheJet, IftekharUddin, NiuBlibing, Audacity88, wangmiao0668000666) are actively landing hardening work, indicating a healthy, engaged contributor base despite the review bottleneck.

## Backlog Watch

Items needing maintainer attention or author response:

- **[#6850 — Memory lifecycle RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** — Open since May 22 with 11 comments; tagged `needs-author-action` and risk:high. The community has engaged; it needs a maintainer decision or a revised proposal to move forward.
- **[#8713 — `allowed_private_hosts` opt-in for file_download SSRF gate](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)** — Open since July 4, security-relevant, principal contributor, size:XL, `needs-author-action`. Long wait for a security PR is concerning.
- **Stacked plugin foundation PRs** ([#8857](https://github.com/zeroclaw-labs/zeroclaw/pull/8857), [#8923](https://github.com/zeroclaw-labs/zeroclaw/pull/8923), [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134), [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142), [#9129](https://github.com/zeroclaw-labs/zeroclaw/pull/9129)) — Open since July 8–18, all XL/risk:high, several `needs-author-action`; the dependency chain means one stale branch stalls the whole platform track. A maintainer review plan or explicit merge order would help.
- **[#9313 — WeChat sync cursor persisted before batch enqueue (P1, risk:high)](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)** — Open since July 23, data-loss adjacent, `needs-author-action`.
- **[#8443 — Matrix single-message progress drafts (trusted contributor, XL)](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)** — Open since June 28; long-dormant feature PR awaiting review.
- **[#8600 — Per-chat model switching tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)** — Accepted and no-stale since July 1, but no implementation PR has appeared; with the new Telegram picker request ([#9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)), this is now a two-issue feature track.
- **[#9899 — RUSTSEC-2026-0247 advisory tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)** — Security CI is red; this should be prioritized over feature work.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*