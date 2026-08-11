# OpenClaw Ecosystem Digest 2026-08-11

> Issues: 248 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-11 07:02 UTC

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

OpenClaw continues to show very high development and community activity: **248 issues were updated in the last 24 hours** (172 open/active, 76 closed) and **500 PRs were updated** (287 open, 213 merged/closed). The busiest conversations are concentrated around session-state reliability, memory security, Feishu/Telegram channel behavior, and multi-agent orchestration. Several P1 bugs remain open with no linked fix PR, while maintainers are actively reviewing and iterating on large refactors across gateway, agents, and system-agent modules. No new releases were published today.

## 2. Releases

None. No new OpenClaw release versions or changelog entries were published on 2026-08-11.

## 3. Project Progress

**Merged/closed PRs:** 213 PRs were merged or closed in the last 24 hours. The visible closed PR in the top discussion set is [#121909](https://github.com/openclaw/openclaw/pull/121909) — a small docs cleanup removing the retired QMD glossary entry.

**Notable in-flight PRs under active review/development:**

- **Gateway restart replay prevention** — [#121908](https://github.com/openclaw/openclaw/pull/121908) records per-delivery custody for pending finals so a Gateway restart between reply preparation and delivery does not replay a final the recipient already received.
- **Team secrets management in Control UI** — [#121724](https://github.com/openclaw/openclaw/pull/121724) adds a typed management surface for team-scoped secrets in the running Gateway/UI.
- **Codex execution reliability** — [#119835](https://github.com/openclaw/openclaw/pull/119835) preserves quiet native Codex tool results; [#120721](https://github.com/openclaw/openclaw/pull/120721) prevents double-consumption of prepared images in CLI-backed turns; [#120496](https://github.com/openclaw/openclaw/pull/120496) allows Claude CLI sessions to compact without API keys.
- **Large refactors** — [#121884](https://github.com/openclaw/openclaw/pull/121884), [#121901](https://github.com/openclaw/openclaw/pull/121901), and [#121896](https://github.com/openclaw/openclaw/pull/121896) split overgrown system-agent and message-tool modules into concept-level modules and simplify embedded subscription state.
- **Channel/platform additions** — Signal account linking ([#119344](https://github.com/openclaw/openclaw/pull/119344)), Feishu delete-message action ([#121808](https://github.com/openclaw/openclaw/pull/121808)), and a shared system-agent QR contract for WhatsApp/Zalo ([#119341](https://github.com/openclaw/openclaw/pull/119341)).
- **UI fixes** — Android compact composer layout ([#120247](https://github.com/openclaw/openclaw/pull/120247)), Ctrl/Cmd+F search rendering/focus fix ([#121910](https://github.com/openclaw/openclaw/pull/121910)), and CJK-friendly markdown bold rendering ([#121542](https://github.com/openclaw/openclaw/pull/121542)).

## 4. Community Hot Topics

The most-commented issues show a mix of security, reliability, cost control, and multi-agent protocol needs:

- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** · 35 comments  
  Users want memory entries tagged by trust based on source, specifically to prevent memory-poisoning attacks from web scrapes or third-party content. This is the strongest signal for memory security hardening.

- **[#48788 — Centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788)** · 20 comments  
  Follow-up on Feishu Chinese filename corruption. The community is pushing for an architectural solution supporting Shift-JIS, EUC-KR, GB18030, etc., across all channel adapters.

- **[#87744 — Codex-backed Telegram turns time out](https://github.com/openclaw/openclaw/issues/87744)** · 18 comments, 3 👍  
  Users report Telegram sessions repeatedly failing because Codex-backed turns never reach terminal `turn/completed`. High-impact reliability issue with message-loss consequences.

- **[#42475 — Per-agent cost budget enforcement at gateway](https://github.com/openclaw/openclaw/issues/42475)** · 15 comments  
  Operators want daily/monthly per-agent budget caps enforced before model dispatch to prevent runaway spend.

- **[#39476 — A2A sessions_send duplicate messages](https://github.com/openclaw/openclaw/issues/39476)** · 13 comments  
  Multi-agent protocol bug: Agent B responding via `sessions_send` back to Agent A causes duplicate replies in the requester’s channel. A linked PR is open.

- **[#84583 — Cron announce triggers session takeover error](https://github.com/openclaw/openclaw/issues/84583)** · 12 comments, 3 👍  
  Cron announce delivery collides with active user chat, producing `EmbeddedAttemptSessionTakeoverError`. Users are hitting this in real Telegram workflows.

## 5. Bugs & Stability

P1 bugs updated in the last 24 hours, ranked roughly by impact:

| Severity | Issue | Summary | Fix status |
|---|---|---|---|
| P1 | [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turns repeatedly time out waiting for `turn/completed`; final answers never delivered | No new fix PR; needs maintainer review/live repro |
| P1 | [#39476](https://github.com/openclaw/openclaw/issues/39476) | A2A `sessions_send` back-call creates duplicate messages in requester channel | Linked PR open |
| P1 | [#84583](https://github.com/openclaw/openclaw/issues/84583) | Cron announce delivery triggers `EmbeddedAttemptSessionTakeoverError` during active chat | Source repro; no linked PR |
| P1 | [#53408](https://github.com/openclaw/openclaw/issues/53408) | `write`/`exec` tool parameters silently dropped after long conversations | Needs maintainer review/info; no fix PR |
| P1 | [#47975](https://github.com/openclaw/openclaw/issues/47975) | Subagent sessions persist after completion; main session becomes unresponsive | Open |
| P1 | [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat messages append to transcript but do not trigger/deliver assistant replies | No new fix PR |
| P1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool child processes unreaped → zombie accumulation and runtime degradation | Needs info; no fix PR |
| P1 | [#83598](https://github.com/openclaw/openclaw/issues/83598) | `anthropic:claude-cli` OAuth refresh still dead-ends main lane in 2026.5.12 | No new fix PR |
| P1 | [#85027](https://github.com/openclaw/openclaw/issues/85027) | macOS update 2026.5.6 → 2026.5.19 left LaunchAgent Gateway unrecoverable | No fix PR |
| P1 | [#103804](https://github.com/openclaw/openclaw/issues/103804) | Service-env serializer double-quotes values, breaking `AWS_REGION` and secrets | Linked PR open |
| P1 | [#114020](https://github.com/openclaw/openclaw/issues/114020) | Feishu/Telegram channel dispatch fails: `runChannelInboundEvent requires runDispatchLifecycle` after beta upgrade | Not reproduced on main |

Stabilized/closed issues updated today include [#99912](https://github.com/openclaw/openclaw/issues/99912) (agent heartbeat routing to wrong session — closed), [#52130](https://github.com/openclaw/openclaw/issues/52130) (Telegram restart storm — closed), and [#42819](https://github.com/openclaw/openclaw/issues/42819) (browser-in-docker cache path regression — closed).

## 6. Feature Requests & Roadmap Signals

The most prominent user-requested features are:

- **Memory trust/source tagging** — [#7707](https://github.com/openclaw/openclaw/issues/7707). Security-driven request with high engagement; likely to influence memory hardening work.
- **Centralized multi-encoding filename handling** — [#48788](https://github.com/openclaw/openclaw/issues/48788). Already a follow-up to a real fix, so a plausible near-term architecture improvement.
- **Gateway-level per-agent cost budgets** — [#42475](https://github.com/openclaw/openclaw/issues/42475). Has linked PR activity; could land if maintainers accept the gateway-enforcement design.
- **Session snapshots** — [#13700](https://github.com/openclaw/openclaw/issues/13700). `session save|load` checkpoints for branching and rollback.
- **Mandatory Memory/Embedding onboarding** — [#16670](https://github.com/openclaw/openclaw/issues/16670). Users want embedding setup to be a required wizard step.
- **Multi-agent Control UI improvements** — [#52803](https://github.com/openclaw/openclaw/issues/52803). Hierarchy, bulk operations, active-first visibility.
- **Recursive subagent listing** — [#47320](https://github.com/openclaw/openclaw/issues/47320). Needed for orchestrator-style depth-2 agent monitoring.
- **Reason-aware cron guardrails** — [#14376](https://github.com/openclaw/openclaw/issues/14376). Backoff/circuit-breaker differentiated by quota/auth/rate-limit failures.
- **Plugin hot-reload** — [#14438](https://github.com/openclaw/openclaw/issues/14438). Strong developer-experience demand (4 👍).
- **Provider visibility** — [#51441](https://github.com/openclaw/openclaw/issues/51441) and [#51336](https://github.com/openclaw/openclaw/issues/51336). Users want resolved backend model names and provider names in errors/status.

Likely next-version candidates: [#48788](https://github.com/openclaw/openclaw/issues/48788) (clear scope, 20 comments), [#42475](https://github.com/openclaw/openclaw/issues/42475) (linked PR), and [#39476](https://github.com/openclaw/openclaw/issues/39476) (P1 bug with linked PR) are closer to landing than the larger memory/UI roadmap items.

## 7. User Feedback Summary

Real user pain points reflected in today’s data:

- **Session-state and message-loss issues dominate.** Multiple P1s involve the system doing work but never delivering the final reply, silently dropping tool parameters, or routing heartbeats/announces to the wrong session.
- **Feishu remains a friction-heavy channel.** Users report activation-mode regressions ([#50490](https://github.com/openclaw/openclaw/issues/50490)), missing interactive-card content parsing ([#41609](https://github.com/openclaw/openclaw/issues/41609)), file-send schema pollution ([#42820](https://github.com/openclaw/openclaw/issues/42820)), and `ignoreFileContent` not being honored ([#42952](https://github.com/openclaw/openclaw/issues/42952)).
- **Multi-agent setups feel unreliable.** Duplicate messages, wrong-agent context in group chats, and lack of hierarchical visibility are recurring themes ([#39476](https://github.com/openclaw/openclaw/issues/39476), [#56692](https://github.com/openclaw/openclaw/issues/56692), [#13487](https://github.com/openclaw/openclaw/issues/13487)).
- **Operators want cost and provider transparency.** Per-agent budgets, resolved backend model names, and explicit provider names in error/overload messages are common asks.
- **Maintainers are investing in code health.** Numerous refactor PRs from maintainers (e.g., [#121884](https://github.com/openclaw/openclaw/pull/121884), [#121901](https://github.com/openclaw/openclaw/pull/121901), [#121896](https://github.com/openclaw/openclaw/pull/121896)) suggest active debt-reduction work despite the high open-bug load.

## 8. Backlog Watch

Older, important issues still needing maintainer attention:

- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** — open since Feb 3; 35 comments; still needs maintainer/product/security review. Security-relevant and one of the most-discussed open issues.
- **[#87744 — Codex-backed Telegram timeouts](https://github.com/openclaw/openclaw/issues/87744)** — open since May 28; P1 message-loss bug; no fix PR; needs maintainer review and live repro.
- **[#84583 — Cron announce session takeover](https://github.com/openclaw/openclaw/issues/84583)** — open since May 20; P1 session-state crash; no linked PR.
- **[#97983 — iOS/WebChat no assistant replies](https://github.com/openclaw/openclaw/issues/97983)** — open since Jun 30; P1 stable-version bug; no fix PR.
- **[#53408 — Write/exec tool params silently dropped](https://github.com/openclaw/openclaw/issues/53408)** — open since Mar 24; P1 behavior bug; still needs maintainer/info.
- **[#83598 — Claude CLI OAuth dead-end](https://github.com/openclaw/openclaw/issues/83598)** — open since May 18; P1 auth-provider failure; no new-fix-PR despite an earlier attempted fix.
- **[#42475 — Per-agent cost budgets](https://github.com/openclaw/openclaw/issues/42475)** — open since Mar 10; high-comment feature with linked PR open; needs product decision and maintainer review.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant & Agent Ecosystem
**Digest date:** 2026-08-11 · **Scope:** 12 open-source projects

---

## 1. Ecosystem Overview

The personal AI assistant landscape is highly fragmented but gravitates around OpenClaw as the de facto reference implementation. A large "Claw family" of derivatives (PicoClaw, NanoClaw, NullClaw, IronClaw, ZeroClaw, ZeptoClaw) indicates active forking into specialized niches rather than consolidation. Across all projects, the dominant engineering theme has shifted from feature breadth to **production reliability**: message-delivery correctness, session-state integrity, memory governance, and observable failure handling. Multi-agent interoperability (A2A) and MCP tooling are emerging as the next standardization battlegrounds, while operators increasingly demand cost controls, provider transparency, and channel parity. The ecosystem is maturing from demo-grade agents to infrastructure that users run 24/7 with real operational consequences.

---

## 2. Activity Comparison

*Health score = composite of throughput, merge/closure ratio, bug responsiveness, and backlog risk (1–10, qualitative). For ZeptoClaw, no data; score reflects stasis, not code quality.*

| Project | Issues updated | PRs updated | Release | Health |
|---|---|---|---|---|
| OpenClaw | 248 (76 closed) | 500 (213 merged) | None | 8.0 |
| NanoBot | 5 | 116 (104 merged) | None | 8.0 |
| Hermes Agent | 8 (0 closed) | 50 (3 merged/closed) | None | 6.0 |
| PicoClaw | 5 | 8 (6 merged) | None | 6.5 |
| NanoClaw | 3 (0 closed) | 21 (10 merged) | None | 7.0 |
| NullClaw | 1 (1 closed) | 0 | None | 6.5 |
| IronClaw | 22 (10 closed) | 50 (17 merged) | **v1.1.1-rc.1** | 8.5 |
| LobsterAI | 4 | 29 (18 merged) | None | 7.5 |
| Moltis | 3 | 2 (0 merged) | None | 6.0 |
| CoPaw | 15 (7 closed) | 50 (22 merged) | None | 8.0 |
| ZeroClaw | 19 (1 closed) | 50 (4 merged) | None | 6.5 |
| ZeptoClaw | 0 | 0 | None | 5.0 |

---

## 3. OpenClaw's Position

**Scale advantage.** OpenClaw's 24-hour activity (248 issues, 500 PRs) is 2–5× larger than the next tier (IronClaw, CoPaw, ZeroClaw, Hermes) and roughly 10× NanoBot. Its 213 merged PRs/day exceed the total monthly merge volume of most peers.

**Technical depth.** OpenClaw is the only project addressing advanced reliability engineering at protocol level: gateway restart replay prevention (per-delivery custody), A2A duplicate-message suppression, memory trust tagging against poisoning attacks, and gateway-level per-agent cost budgets. Its modular gateway/agent/system-agent architecture is being actively refactored, indicating healthy debt reduction despite heavy load.

**Community gravity.** The contributor base is unmatched, and maintainers are responsive — but the sheer volume creates triage risk. Ten P1 bugs remain open with no linked fix (e.g., Codex-backed Telegram timeouts, silently dropped tool parameters, iOS/WebChat delivery failures). No release was cut in the window, meaning fixes accumulate on `main`. OpenClaw's position is secure as the ecosystem's reference core, but its P1 backlog and review bottleneck are real vulnerabilities that niche competitors can exploit.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects:

| Focus area | Projects | Specific needs |
|---|---|---|
| **Delivery & session reliability** | OpenClaw, NanoBot, Hermes, NanoClaw, CoPaw, IronClaw, ZeroClaw, LobsterAI | Duplicate replies, silent message drops, session takeover errors, gateway restart replay, tool params silently dropped after long conversations |
| **Memory security & lifecycle** | OpenClaw, NanoBot, ZeroClaw, CoPaw, IronClaw, NanoClaw | Trust/source tagging to prevent poisoning; consolidation runaway (10M+ token incident in NanoBot); decoupling lifecycle policy from storage backends; privacy-safe logging |
| **MCP maturity** | NanoBot, CoPaw, Hermes, IronClaw, NanoClaw | OAuth web authorization for cloud MCP servers; session recovery without dropping tools; surfacing real connection failures; migration to MCP 2.x SDK; remote Streamable HTTP transport |
| **Tool-loop & cost guardrails** | PicoClaw, NanoBot, IronClaw, LobsterAI, OpenClaw | Repeated identical tool failures looping to `max_tool_iterations`; per-agent daily/monthly budget caps enforced before dispatch; redundant fetch-retry loops burning turn budgets |
| **Channel parity** | OpenClaw, ZeroClaw, Hermes, PicoClaw, CoPaw | Reactions on WhatsApp, table rendering on Telegram, media batching on WeChat, Feishu filename encoding, reduced QQ workflow noise — users expect identical behavior across all messengers |
| **Multi-agent / A2A interop** | OpenClaw, NullClaw, ZeroClaw, Hermes | Client-side A2A calls (NullClaw), duplicate suppression on `sessions_send` (OpenClaw), hierarchical subagent visibility, selective multiplex profile serving |
| **Security hardening at boundaries** | Hermes, PicoClaw, NanoClaw, ZeroClaw, NanoBot | Plugin backdoor prevention, remote exec disabled by default, CSPRNG pairing codes, SSRF gates, CSRF protection, secret redaction |
| **Observable failures** | NanoClaw, ZeroClaw, IronClaw, LobsterAI | Silent message drops, invisible scheduled-task errors, swallowed provider runtime failures, SOP misconfigurations reporting success — "silent failure must become observable" |

---

## 5. Differentiation Analysis

| Project | Positioning | Distinctive focus | Target users |
|---|---|---|---|
| **OpenClaw** | General-purpose reference platform | Maximal surface area: channels, A2A, memory, gateway, UI | Power users, operators, ecosystem builders |
| **NanoBot** | Memory-centric assistant | Dream consolidation, read-only sessions, `/insights` usage logging, MCP inheritance | Self-hosters, memory-heavy users |
| **Hermes Agent** | Desktop-first reliability | Windows gateway lifecycle, WeChat/QQ/Telegram, Termux, plugin security | Desktop users, Chinese IM users |
| **PicoClaw** | Lightweight Telegram-native | Rich Telegram tables, dispatch rules, i18n breadth, remote-exec hardening | Lightweight/Telegram-first deployments |
| **NanoClaw** | Architecture & privacy discipline | Module migration registry, privacy-safe DM logs, pairing security, remote MCP | Privacy-conscious, long-running deployments |
| **NullClaw** | A2A federation | Server-side A2A v0.3.0; community-built client `a2a_call` for multi-instance setups | Federated multi-agent builders |
| **IronClaw** | Enterprise-grade correctness | QA-driven truthfulness fixes, release candidates, doc-truth pipeline, sandboxed shell, durable storage | Extension builders, enterprise operators |
| **LobsterAI** | Desktop productivity hub | Cowork UX, multi-window orchestration, thinking levels, cross-platform window attention | Desktop multitaskers, Chinese-speaking users |
| **Moltis** | Sandbox & browser control | Apple Container backend, interactive CDP browser viewing UI | Security-focused developers |
| **CoPaw** | Chinese-ecosystem console | Creator/ReMe memory, MCP session recovery, AnySearch integration, WeChat group demand | Chinese-speaking community |
| **ZeroClaw** | SOP-driven operations | SOP validation lifecycle, WhatsApp/Matrix parity, per-chat model picker, config schema decomposition | Operators running structured workflows |
| **ZeptoClaw** | — | No activity | — |

**Architecture signals:** IronClaw uses Rust/WebAssembly (cargo-component) with release-candidate discipline; ZeroClaw is Rust with a 38.7k-line config schema under decomposition; NanoClaw emphasizes module lifecycle and migration registry; LobsterAI is Electron-style desktop with IPC and openclaw runtime integration; CoPaw explicitly routes through OpenClaw-compatible gateway concepts.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, high throughput:**
- **OpenClaw** — hyperactive core; 213 merges/day, large maintainer refactors, but P1 backlog and no release cadence visible.
- **NanoBot** — cleanup wave (104 PRs merged in 24h) consolidating a broad feature set; token-burn incident shows memory features outrunning guardrails.
- **IronClaw** — most disciplined: only project cutting a release candidate; merged a deterministic one-commit-per-issue fix batch for agent hallucination bugs.
- **CoPaw** — fast fix cycle (22 merges, bugs closed within 24h of report); Chinese-community engagement growing.

**Tier 2 — Active, stabilizing:**
- **Hermes** — fix-heavy, security-aware, but 0 issue closures and no releases; Windows P1 has a same-day fix PR, indicating responsiveness but constrained capacity.
- **LobsterAI** — steady feature velocity (18 merges); only 1 open issue; strong UX investment in Cowork.
- **NanoClaw** — refactoring plus security hardening; low issue volume but targeted fix PRs.
- **ZeroClaw** — high contributor momentum (46 open PRs) but severe merge bottleneck (4 merged); long-running XL PRs need maintainer decisions.

**Tier 3 — Maintenance mode:**
- **PicoClaw** — modest but healthy; stale labels on production-impacting bugs need triage.
- **Moltis** — light activity; a major browser-UI PR has been open since March.
- **NullClaw** — quiet but stable; A2A client-side gap closed conceptually.

**Dormant:** ZeptoClaw — no activity in window.

---

## 7. Trend Signals

1. **Reliability has surpassed features as the top user demand.** Message-loss and session-state bugs dominate P1 lists across at least 8 projects. Idempotency, replay prevention, and delivery receipts are table stakes.

2. **"Fail loud" is a design requirement.** Users repeatedly hit silent drops: unroutable scheduled-task errors, swallowed provider failures, SOPs reporting success when unparsed. Build observability into failure paths by default.

3. **Memory is now a security and cost surface.** Memory-poisoning via untrusted web content (OpenClaw #7707) and a 10M-token consolidation runaway (NanoBot #5324) show the two failure modes: trust and economics. Trust tagging, lifecycle/storage separation, and consolidation budgets will be standard.

4. **MCP is the universal tool standard, but lifecycle and auth are immature.** OAuth web authorization, session recovery, and honest connection-failure reporting are requested across five projects. Expect MCP 2.x and remote HTTP transports to land broadly.

5. **A2A federation is moving from niche to mainstream.** NullClaw's client-side `a2a_call` demand and OpenClaw's duplicate-message fixes signal that multi-agent deployments are real user workflows, not experiments.

6. **Cost governance is an operator prerequisite.** Per-agent budgets (OpenClaw), usage logging and `/insights` (NanoBot), and token-burn incidents all point to the same conclusion: agents must be budgetable and billable.

7. **Channel parity is assumed, not optional.** Users expect reactions, rich rendering, and media batching consistently across Telegram, WhatsApp, Discord, Matrix, WeChat, and Feishu. Chinese-channel support (Feishu, QQ, WeChat, IME handling) is a fast-growing, underserved segment.

8. **Security hardening is shifting to defaults.** Remote exec disabled by default, CSPRNG pairing codes, plugin backdoor rejection, SSRF gates, and CSRF protection are landing across projects — driven by public-deployment footguns.

**Value for AI agent developers:** prioritize idempotent message delivery; make every failure observable; treat memory as untrusted input with cost bounds; abstract channels behind a parity contract; adopt MCP with explicit lifecycle recovery; and build cost enforcement into the gateway before dispatch.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-11

## 1. Today's Overview

NanoBot shows high maintenance activity: **116 PRs were updated in the last 24 hours**, with **104 merged/closed** and **12 still open**, while only **5 issues** were touched in the same period. A large batch of older PRs appears to have been resolved or closed, alongside one new WebUI fix and one open WebUI/MCP reliability PR. No new releases were published, so users remain on the previous version. Community attention is concentrated on conversation-loop bugs, MCP/OpenRouter capabilities, and memory/token runaway incidents.

## 2. Releases

**No new releases** were published in the last 24 hours. No changelog, migration notes, or version-specific upgrade guidance is available for this digest period.

## 3. Project Progress

The 104 merged/closed PRs represent a significant cleanup and feature/advance wave. Highlights from the top updated PRs include:

- **WebUI polish** — [PR #5326](https://github.com/HKUDS/nanobot/pull/5326): softened form-control focus rings and centralized focus treatment.
- **Telegram per-chat policies** — [PR #3323](https://github.com/HKUDS/nanobot/pull/3323): per-chat `group_policy` overrides, enabling different bot behavior per group.
- **Read-only sessions** — [PR #4271](https://github.com/HKUDS/nanobot/pull/4271): skip LLM processing entirely for pinned read-only sessions.
- **MCP tool inheritance for subagents** — [PR #4192](https://github.com/HKUDS/nanobot/pull/4192): opt-in `tools.subagentMcpAccess` allows subagents to inherit live MCP tools.
- **WebSocket session recovery** — [PR #4139](https://github.com/HKUDS/nanobot/pull/4139): accept `target_chat_id` hint in `new_chat` to preserve history after page refresh.
- **Modular system prompt** — [PR #4022](https://github.com/HKUDS/nanobot/pull/4022): toggle system prompt components.
- **Azure Speech voice-to-text** — [PR #3970](https://github.com/HKUDS/nanobot/pull/3970): support for Azure Speech transcription.
- **Usage logging and `/insights`** — [PR #3921](https://github.com/HKUDS/nanobot/pull/3921): JSONL token/cost logging plus an insights slash command.
- **Memory consolidation optimization** — [PR #3880](https://github.com/HKUDS/nanobot/pull/3880): compress long tool results before LLM archive consolidation.
- **CLI session management** — [PR #3777](https://github.com/HKUDS/nanobot/pull/3777) & [PR #3778](https://github.com/HKUDS/nanobot/pull/3778): `nanobot sessions` commands and `/export`.
- **Agent hook extension** — [PR #3628](https://github.com/HKUDS/nanobot/pull/3628): `before_process` hook for message/media preprocessing.
- **Discord interactive components** — [PR #3589](https://github.com/HKUDS/nanobot/pull/3589): buttons, select menus, and modals.
- **New provider router** — [PR #3568](https://github.com/HKUDS/nanobot/pull/3568): Manifest LLM router support.
- **Security hardening** — [PR #3492](https://github.com/HKUDS/nanobot/pull/3492): address public-deploy footguns and browser-CSRF on `/v1/*`.

Additionally, [PR #5331](https://github.com/HKUDS/nanobot/pull/5331) is **open** and aims to surface real MCP runtime connection failures in the WebUI, including recovery states for OAuth, custom, and non-OAuth servers.

## 4. Community Hot Topics

The most-discussed issues in the last 24 hours center on integration gaps and loop/repetition bugs:

- **[Issue #5297 — MCP OAuth web authorization (closed)](https://github.com/HKUDS/nanobot/issues/5297)**  
  3 comments. User requested OAuth web-based authorization for MCP servers such as `https://app.xmind.com/api/mcp`. This is a practical blocker for using cloud services that require interactive browser login.

- **[Issue #5256 — `/goal` produces dozens of repeated replies (open)](https://github.com/HKUDS/nanobot/issues/5256)**  
  2 comments. A single `/goal` message triggered many near-identical replies while the agent waited for user input. The loop stopped only after user intervention or model self-cancellation.

- **[Issue #5324 — Dream memory consolidation infinite loop (closed)](https://github.com/HKUDS/nanobot/issues/5324)**  
  2 comments. A severe incident: memory consolidation ran 23 minutes and consumed over 10M tokens (~half a month of usage) when `edit_file` accepted no-op edits in a loop.

- **[Issue #5327 — Repeated same message while reasoning (open)](https://github.com/HKUDS/nanobot/issues/5327)**  
  1 comment. Random repetition of phrases like “Good points, let me investigate the issue” during reasoning/investigation tasks.

- **[Issue #5333 — OpenRouter Server Tools support (open)](https://github.com/HKUDS/nanobot/issues/5333)**  
  New request asking for support of OpenRouter server tools such as Web Search, Web Fetch, and Fusion via the `tools` field.

## 5. Bugs & Stability

Ranked by severity:

1. **Critical: Dream memory consolidation infinite loop / token burn** — [Issue #5324](https://github.com/HKUDS/nanobot/issues/5324)  
   Ran 23 minutes, consumed 10M+ tokens, and was only stopped by external intervention. Marked closed, but no linked fix PR is visible in the provided data. This is the most serious reported incident.

2. **High: `/goal` repeated-reply loop** — [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256)  
   Still open and active. The agent floods chat with repeated replies while waiting for user answers. No fix PR is visible yet.

3. **Medium: Random message repetition during reasoning** — [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327)  
   Still open. Reproducibility is inconsistent, which may make it harder to diagnose.

4. **Stability/UI fix: WebUI focus rings** — [PR #5326](https://github.com/HKUDS/nanobot/pull/5326)  
   Closed; cosmetic fix rather than a runtime bug.

5. **MCP runtime error visibility** — [PR #5331](https://github.com/HKUDS/nanobot/pull/5331)  
   Open fix to expose real MCP connection failures instead of assuming success based on persisted configuration.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals from this update period:

- **MCP OAuth web authorization** — [Issue #5297](https://github.com/HKUDS/nanobot/issues/5297): requested for MCP servers requiring browser-based OAuth. Likely to be considered for the next web/gateway-related release.
- **OpenRouter Server Tools** — [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333): users want OpenRouter’s built-in tools (Web Search, Web Fetch, Fusion) exposed through NanoBot. This fits the project’s MCP/tool ecosystem direction.
- **Per-group Telegram policies** — [PR #3323](https://github.com/HKUDS/nanobot/pull/3323): closed/merged; a clear product-level enhancement for multi-tenant Telegram usage.
- **Subagent MCP inheritance** — [PR #4192](https://github.com/HKUDS/nanobot/pull/4192): closed/merged; likely part of the next agent framework update.
- **Read-only sessions** — [PR #4271](https://github.com/HKUDS/nanobot/pull/4271): closed/merged; useful for platform builders who need pinned static content without LLM costs.
- **Usage tracking** — [PR #3921](https://github.com/HKUDS/nanobot/pull/3921): closed/merged; `/insights` and JSONL usage logging directly address community cost-tracking requests.

Given the concentrated closing of feature PRs, the next NanoBot version may include MCP tool inheritance, read-only sessions, Telegram per-chat policies, usage insights, WebUI focus polish, and MCP connection failure reporting.

## 7. User Feedback Summary

- **Positive sentiment**: One new issue author explicitly thanked the maintainers, saying *“thank you for creating such an amazing project”* ([Issue #5333](https://github.com/HKUDS/nanobot/issues/5333)).
- **Pain point — interactive MCP auth**: Users need OAuth web authorization for MCP servers like XMind; local-only or non-interactive auth is insufficient ([Issue #5297](https://github.com/HKUDS/nanobot/issues/5297)).
- **Pain point — runaway token consumption**: The Dream consolidation incident caused significant cost/waste concern, with one user comparing 10M tokens to half a month of usage ([Issue #5324](https://github.com/HKUDS/nanobot/issues/5324)).
- **Pain point — loop/repetition**: Multiple users report the agent repeating identical messages or getting stuck in loops during reasoning or waiting states ([Issue #5256](https://github.com/HKUDS/nanobot/issues/5256), [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327)).
- **Integration expectations**: Users want broader provider/tool support, especially OpenRouter Server Tools ([Issue #5333](https://github.com/HKUDS/nanobot/issues/5333)).

## 8. Backlog Watch

- **[Issue #5256 — `/goal` repeated replies](https://github.com/HKUDS/nanobot/issues/5256)**  
  Open since August 5 and still active. This is the most important open bug needing maintainer attention because it directly affects reliability and user trust.

- **[Issue #5327 — random repeated messages while reasoning](https://github.com/HKUDS/nanobot/issues/5327)**  
  Open since August 10. Needs triage and reproduction guidance.

- **[Issue #5333 — OpenRouter Server Tools](https://github.com/HKUDS/nanobot/issues/5333)**  
  New and unanswered. It is a feature request rather than a bug, but it has clear user demand.

- **[PR #5331 — MCP runtime failure surfacing](https://github.com/HKUDS/nanobot/pull/5331)**  
  Open fix PR. Should be reviewed and merged to prevent silent MCP connection failures.

No extremely old issues appear in this 24-hour slice, but the large wave of closed PRs suggests the maintainers are actively cleaning up stale contributions and consolidating the feature set.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-11

## 1. Today's Overview

Hermes Agent had a high-activity day on 2026-08-11: 8 issues were updated in the last 24 hours (all still open) and 50 PRs were touched, with 47 open and 3 closed/merged. No new releases were published. The dominant theme is reliability: a P1 Windows regression where desktop restarts kill the live messaging gateway ([#83683](https://github.com/NousResearch/hermes-agent/issues/83683)) already has a fix PR open ([#83720](https://github.com/NousResearch/hermes-agent/pull/83720)), while several P2 issues remain around Termux installation, the `patch` tool, and desktop session windows. The open PR pipeline is active across security, gateway adapters, Kanban, and desktop fixes, but there are no new release artifacts to report yet.

## 2. Releases

No new releases were published in the last 24 hours. There are no release notes, version changes, breaking-change notices, or migration instructions to report.

## 3. Project Progress

The daily PR count shows **3 merged/closed PRs**, but only one closed PR is visible in the top-20 data:

- [PR #83400 — feat(gateway): allow selective multiplex profile serving](https://github.com/NousResearch/hermes-agent/pull/83400) — Closed. This proposed allowing one shared gateway to selectively serve multiple Hermes profiles (e.g. `default` vs. `kids-safe`). No merge status is visible in the data.

No issues were closed in the last 24 hours — all 8 updated issues remain open.

Notable open PRs actively advancing fixes and features today:

- [PR #83720 — fix(gateway): never reap supervised gateway + relaunch on desktop (re)start](https://github.com/NousResearch/hermes-agent/pull/83720) — Direct fix for P1 regression [#83683](https://github.com/NousResearch/hermes-agent/issues/83683).
- [PR #83724 — fix(plugins): stop tampered directory plugins from running backdoors before rejection](https://github.com/NousResearch/hermes-agent/pull/83724) — Security hardening for plugin loading.
- [PR #83725 — fix(agent): retry title generation when provider rejects json_schema](https://github.com/NousResearch/hermes-agent/pull/83725) — Fixes 100% title-generation failures on DeepSeek/Kimi.
- [PR #83727 — fix(sessions): list reset continuations](https://github.com/NousResearch/hermes-agent/pull/83727) — Fixes reset sessions disappearing from CLI/gateway resume pickers.
- [PR #83728 — fix(kanban): guard block_task against live-claim theft](https://github.com/NousResearch/hermes-agent/pull/83728) — Related to Kanban concurrency issue [#83726](https://github.com/NousResearch/hermes-agent/issues/83726).
- [PR #83713 — fix(gateway): classify terminal adapter connect failures + escalate long-lived retry loops](https://github.com/NousResearch/hermes-agent/pull/83713) — Targets silently retrying Telegram/Discord/Photon adapters.
- [PR #83689 — ci(windows): desktop install + update E2E on a real Windows runner](https://github.com/NousResearch/hermes-agent/pull/83689) — CI improvement to prevent Windows install/update regressions.
- [PR #82830 — fix(approval): stop absolute-path spellings bypassing the hardline floor](https://github.com/NousResearch/hermes-agent/pull/82830) — Security fix split from a larger review thread.

## 4. Community Hot Topics

The PR list does not expose comment counts in the provided data, so issue comment activity is the main signal.

- [Issue #18106 — [Email] IMAP fetch error: 'int' object has no attribute 'decode'](https://github.com/NousResearch/hermes-agent/issues/18106) — **4 comments, open since April 30.** This is the most-commented issue in the 24h window. It is a long-running P3 email adapter bug that remains unresolved.
- [Issue #83683 — Desktop restart reaps the live gateway but never relaunches it](https://github.com/NousResearch/hermes-agent/issues/83683) — **2 comments, P1, Windows regression.** WeChat/QQ/Telegram go silent after desktop app restart. This generated immediate attention and a same-day fix PR ([#83720](https://github.com/NousResearch/hermes-agent/pull/83720)).
- Several newer issues ([#83718](https://github.com/NousResearch/hermes-agent/issues/83718), [#83714](https://github.com/NousResearch/hermes-agent/issues/83714), [#83680](https://github.com/NousResearch/hermes-agent/issues/83680)) have 1 comment each and likely represent fresh user reports that need maintainer triage.

Underlying community need: messaging reliability, especially gateway lifecycle management on Windows, email adapter stability, and avoiding silent delivery failures across Telegram, WeChat, QQ, and IMAP.

## 5. Bugs & Stability

All 8 updated issues are still open. Ranked by severity:

| Severity | Issue | Description | Fix Status |
|---|---|---|---|
| **P1** | [#83683 — Desktop restart reaps live gateway, WeChat/QQ/Telegram go silent](https://github.com/NousResearch/hermes-agent/issues/83683) | Windows regression: desktop restart force-kills the running gateway and never relaunches it. | Fix PR open: [#83720](https://github.com/NousResearch/hermes-agent/pull/83720) |
| **P2** | [#83680 — Termux: cryptography Rust extension cannot resolve PyLong_Type at runtime](https://github.com/NousResearch/hermes-agent/issues/83680) | Regression after upgrading `cryptography` 48.x → 50.0.0; breaks bundled secret sources on Android/Termux. | No fix PR visible |
| **P2** | [#83714 — patch tool truncates new_string with literal '...[truncated]' text](https://github.com/NousResearch/hermes-agent/issues/83714) | `patch`/`write_file` corrupt source files by inserting literal truncation text. | No fix PR visible |
| **P2** | [#83716 — Opening a session in a new window freezes live updates in original window](https://github.com/NousResearch/hermes-agent/issues/83716) | Desktop pop-out steals the live event stream; original window never recovers. | No fix PR visible |
| **P3** | [#18106 — Email IMAP fetch error: 'int' object has no attribute 'decode'](https://github.com/NousResearch/hermes-agent/issues/18106) | Long-standing email adapter failure on iCloud IMAP. | No fix PR visible |
| **P3** | [#83726 — Kanban needs atomic conditional unblock to preserve concurrent stronger blocks](https://github.com/NousResearch/hermes-agent/issues/83726) | Race between `show` + unconditional `unblock` can clear stronger manual/approval/topology/quarantine blocks. | Related PR [#83728](https://github.com/NousResearch/hermes-agent/pull/83728) covers live-claim theft, but not the full atomic primitive |

Related stability work: [PR #83713](https://github.com/NousResearch/hermes-agent/pull/83713) addresses fleet-wide cases where terminal adapters silently retry for weeks due to revoked tokens or rejected intents.

## 6. Feature Requests & Roadmap Signals

User-requested features visible in the last 24h:

- [Issue #83718 — Weixin media messages should go through debounce batching (not just text)](https://github.com/NousResearch/hermes-agent/issues/83718) — Multiple WeChat images currently trigger separate agent invocations; users want media batched like text.
- [Issue #83715 — Group Chat Codex agent editing lacks model dropdown for built-in Provider](https://github.com/NousResearch/hermes-agent/issues/83715) — Chinese-language UI bug/feature request: built-in providers like `openai-codex` do not show a model selector in Hermes Studio group chat.
- [PR #83723 — recognize X-Gitea-Event and X-Forgejo-Event headers](https://github.com/NousResearch/hermes-agent/pull/83723) — Adds webhook support for Gitea/Forgejo events.
- [PR #83400 — selective multiplex profile serving](https://github.com/NousResearch/hermes-agent/pull/83400) — Closed, but signals roadmap interest in shared gateways serving multiple trust profiles.

Likely near-term release candidates based on today's PR activity: the P1 gateway relaunch fix ([#83720](https://github.com/NousResearch/hermes-agent/pull/83720)), plugin security verification ([#83724](https://github.com/NousResearch/hermes-agent/pull/83724)), title-generation fallback ([#83725](https://github.com/NousResearch/hermes-agent/pull/83725)), and Webhook header support ([#83723](https://github.com/NousResearch/hermes-agent/pull/83723)). The overall signal is that bug fixes and security hardening are being prioritized over larger features.

## 7. User Feedback Summary

Real user pain points reported in the last 24 hours:

- **Windows messaging reliability is the biggest complaint**: desktop restarts silently kill WeChat/QQ/Telegram until manual gateway restart ([#83683](https://github.com/NousResearch/hermes-agent/issues/83683)).
- **Termux users are blocked**: the `cryptography==50.0.0` upgrade breaks Hermes on Android/Termux ([#83680](https://github.com/NousResearch/hermes-agent/issues/83680)).
- **Developer tooling trust is affected**: the `patch`/`write_file` truncation bug corrupts source files with literal `...[truncated]` text, causing syntax errors ([#83714](https://github.com/NousResearch/hermes-agent/issues/83714)).
- **Desktop multi-window sessions are unreliable**: opening a session in a new window freezes the original window's live updates ([#83716](https://github.com/NousResearch/hermes-agent/issues/83716)).
- **Long-standing email issues remain**: IMAP adapter failures continue to affect iCloud users ([#18106](https://github.com/NousResearch/hermes-agent/issues/18106)).
- **Feature expectations**: users want WeChat media batched like text ([#83718](https://github.com/NousResearch/hermes-agent/issues/83718)) and proper model selection for Codex-type agents in group chat ([#83715](https://github.com/NousResearch/hermes-agent/issues/83715)).

No explicit positive satisfaction signals were captured in the 24h window; nearly all feedback is bug-report or feature-request oriented.

## 8. Backlog Watch

Several important issues and PRs have been open for extended periods and may need maintainer attention:

- [Issue #18106 — Email IMAP fetch error](https://github.com/NousResearch/hermes-agent/issues/18106) — Open since **April 30**, 4 comments, P3, no fix PR.
- [PR #48267 — feat(skills): add OKF v0.2 opt-in and migration to llm-wiki](https://github.com/NousResearch/hermes-agent/pull/48267) — Open since **June 18**, feature work stalled.
- [PR #66926 — fix(redact): also catch bare AQ.-prefix Gemini authorization keys](https://github.com/NousResearch/hermes-agent/pull/66926) — Open since **July 18**, security-related.
- [PR #71490 — fix(agent): add config opt-out for mixed-batch tool execution permissiveness](https://github.com/NousResearch/hermes-agent/pull/71490) — Open since **July 25**, P2 behavior/config fix.
- [PR #71884 — fix(gateway/signal): poll /v1/receive instead of broken /v1/events SSE](https://github.com/NousResearch/hermes-agent/pull/71884) — Open since **July 26**, P2 message-delivery fix for Signal.
- [PR #75476 — fix(redact): pass interrupt_debug.log messages through redact_sensitive_text](https://github.com/NousResearch/hermes-agent/pull/75476) — Open since **July 31**, security/privacy fix for plaintext credential logging.
- [PR #75480 — fix(agent): wire ProviderProfile hooks into the Anthropic transport](https://github.com/NousResearch/hermes-agent/pull/75480) — Open since **July 31**, provider compatibility bug.
- [PR #76736 — feat(mcp): migrate to the mcp 2.x SDK](https://github.com/NousResearch/hermes-agent/pull/76736) — Open since **August 2**, large SDK migration.
- [PR #77302 — fix(desktop): persist message reactions config](https://github.com/NousResearch/hermes-agent/pull/77302) — Open since **August 3**, P2 desktop config bug.

These items are worth prioritizing, especially the security/privacy PRs ([#66926](https://github.com/NousResearch/hermes-agent/pull/66926), [#75476](https://github.com/NousResearch/hermes-agent/pull/75476)) and the P2 Signal message-delivery fix ([#71884](https://github.com/NousResearch/hermes-agent/pull/71884)).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-11

## 🧭 Today's Overview
PicoClaw is in a moderately active maintenance phase: 5 issues and 8 PRs were touched in the last 24 hours, but no new releases were published. Activity is concentrated on bug fixes and quality-of-life improvements rather than large feature work. Two issues remain open with a `stale` label, including one production-impacting silent tool-failure bug. Community contributions are flowing steadily, with six PRs closed/merged and two PRs still open for review. Overall project health is stable, though maintainer attention is needed on a few long-running PRs and open bug reports.

## 📦 Releases
No new releases were published in this window. No changelog, breaking-change, or migration notes are available.

## 🛠️ Project Progress
Six PRs were closed/merged in the last 24 hours:

- **#3327 — feat(telegram): render tables with native rich messages**  
  [sipeed/picoclaw PR #3327](https://github.com/sipeed/picoclaw/pull/3327)  
  Telegram table rendering was upgraded from monospaced code blocks to Bot API rich messages, including GFM and supported HTML table detection.

- **#3326 — fix(web): remove duplicate pnpm lock entries**  
  [sipeed/picoclaw PR #3326](https://github.com/sipeed/picoclaw/pull/3326)  
  Fixed broken `pnpm install --frozen-lockfile` due to duplicate `semver@7.8.5` mappings.

- **#3297 — fix(security): harden remote prompt and exec boundaries**  
  [sipeed/picoclaw PR #3297](https://github.com/sipeed/picoclaw/pull/3297)  
  Remote exec now defaults to disabled, requires per-call approval, and enforces origin policy. Configs were migrated to schema v4.

- **#3295 — fix(channels): prevent SplitMessage hang on oversized fence headers**  
  [sipeed/picoclaw PR #3295](https://github.com/sipeed/picoclaw/pull/3295)  
  Fixed a hang in message splitting when fenced-code info strings exceed the length limit.

- **#3296 — i18n: complete Czech code wrap labels**  
  [sipeed/picoclaw PR #3296](https://github.com/sipeed/picoclaw/pull/3296)  
  Completed Czech translations for code-wrap UI labels.

- **#1547 — fix: merge PR #1466 #1465**  
  [sipeed/picoclaw PR #1547](https://github.com/sipeed/picoclaw/pull/1547)  
  Stale merge of earlier open fixes.

## 💬 Community Hot Topics
- **#3294 — `/list models` only shows the current model instead of all configured models**  
  [sipeed/picoclaw Issue #3294](https://github.com/sipeed/picoclaw/issues/3294) — 3 comments  
  Users expect `/list models` to enumerate every configured model in `model_list`, but it only reports the active one. This is a UX/expectation mismatch around multi-provider setups.

- **#3301 — `/clear` and session auto-compression don't work in chats routed via dispatch rules**  
  [sipeed/picoclaw Issue #3301](https://github.com/sipeed/picoclaw/issues/3301) — 3 comments  
  Dispatch-rule routing breaks core session maintenance in Discord/Telegram. This is a real workflow blocker for users with multi-agent routing.

- **#3298 — Add AI Router as an OpenAI-compatible provider preset**  
  [sipeed/picoclaw Issue #3298](https://github.com/sipeed/picoclaw/issues/3298) — 2 comments  
  Community proposal to add a named AI Router preset instead of relying on generic `openai` provider configuration. Likely to reduce setup friction.

- **#3311 — Repeated identical tool failure loops silently to max_tool_iterations**  
  [sipeed/picoclaw Issue #3311](https://github.com/sipeed/picoclaw/issues/3311) — 1 comment  
  A user reported a silent loop where a failing tool is re-invoked repeatedly with no answer being delivered. This issue has a linked open fix PR.

## 🐞 Bugs & Stability
Ranked by severity:

1. **High — Silent tool failure loop**  
   [Issue #3311](https://github.com/sipeed/picoclaw/issues/3311)  
   A turn can spin for many minutes, re-calling the LLM and re-executing the same failing tool until `max_tool_iterations`, with no user-visible reply.  
   Fix PR exists: [#3312](https://github.com/sipeed/picoclaw/pull/3312) — currently open.

2. **Medium — `line.settings.webhook_host` / `webhook_port` documented but not consumed**  
   [Issue #3328](https://github.com/sipeed/picoclaw/issues/3328)  
   Newly reported. Config keys have defaults and docs but no code reads them; setting them has no effect. No fix PR yet.

3. **Medium — `/clear` and session auto-compression broken in dispatcher-routed chats**  
   [Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)  
   Sessions routed to non-default agents via dispatch rules cannot be cleared or compressed, affecting chat stability. No dedicated fix PR identified.

4. **Low — `/list models` shows only current model**  
   [Issue #3294](https://github.com/sipeed/picoclaw/issues/3294)  
   Closed as stale, but reflects a persistent expectation gap for multi-model users.

## 🧩 Feature Requests & Roadmap Signals
- **AI Router provider preset** — [Issue #3298](https://github.com/sipeed/picoclaw/issues/3298)  
  A named provider preset would simplify AI Router integration. Given an outside maintainer is willing to contribute, this may land in a future minor release.

- **Native Telegram table rendering** — [PR #3327](https://github.com/sipeed/picoclaw/pull/3327) merged  
  Indicates the project is investing in richer channel output rather than plain code-block formatting.

- **Remote exec hardening** — [PR #3297](https://github.com/sipeed/picoclaw/pull/3297) merged  
  Schema v4 migration and stricter remote-exec defaults suggest security is a current roadmap focus.

- **Stop-on-repeated-tool-failure behavior** — [PR #3312](https://github.com/sipeed/picoclaw/pull/3312)  
  If reviewed and merged, this would directly address the high-severity silent-failure loop.

## 📣 User Feedback Summary
Users are hitting real production pain points: agents that silently hang for minutes on repeated tool failures, session reset/compression not working under dispatch rules, and config options that exist in docs but are ignored. There is also clear demand for better multi-model visibility in Telegram and smoother third-party router integration. On the positive side, several users are actively submitting fixes, which indicates a healthy contributor community. The volume of stale-labeled items suggests some older issues need either triage or explicit closure.

## 🗄️ Backlog Watch
Open items needing maintainer attention:

- **PR #3312 — Fix repeated identical tool failure loop**  
  [sipeed/picoclaw PR #3312](https://github.com/sipeed/picoclaw/pull/3312) — stale, linked to high-severity issue #3311.

- **PR #3314 — Fix customAllowPatterns not being honored**  
  [sipeed/picoclaw PR #3314](https://github.com/sipeed/picoclaw/pull/3314) — stale, affects shell command allowlisting.

- **Issue #3301 — Dispatch-rule routing breaks session clear/compression**  
  [sipeed/picoclaw Issue #3301](https://github.com/sipeed/picoclaw/issues/3301) — open, stale-labeled, ongoing discussion.

- **Issue #3311 — Silent tool failure loop**  
  [sipeed/picoclaw Issue #3311](https://github.com/sipeed/picoclaw/issues/3311) — open, stale-labeled, production-impacting.

- **Issue #3328 — Unread `webhook_host` / `webhook_port` config**  
  [sipeed/picoclaw Issue #3328](https://github.com/sipeed/picoclaw/issues/3328) — new, no comments yet; should be triaged promptly.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-11

## Today's Overview

NanoClaw saw a busy 24-hour cycle: 3 issues were active and none were closed, while 21 PRs were updated — 11 remain open and 10 are now merged/closed. The activity is dominated by internal refactoring, permission/logging hardening, and messaging reliability fixes rather than user-facing features. No new releases were published. Overall project health looks solid, but the active issues cluster around silent failure modes that are worth prioritizing.

## Releases

No releases were published in this window.

## Project Progress

10 PRs moved to merged/closed in the last 24 hours. The batch was heavily focused on reliability, privacy, and internal architecture:

- **Reliability:** [PR #3228](https://github.com/qwibitai/nanoclaw/pull/3228) fixed duplicate turn-scoped chat delivery.
- **Privacy/logging:** [PR #3222](https://github.com/qwibitai/nanoclaw/pull/3222) added opt-in privacy-safe DM logs; [PR #3215](https://github.com/qwibitai/nanoclaw/pull/3215) redacted DM resolution logs.
- **Refactoring:** [PR #3186](https://github.com/qwibitai/nanoclaw/pull/3186) added host seams for skill-owned capabilities; [PR #3212](https://github.com/qwibitai/nanoclaw/pull/3212) added a module migration registry; [PR #3213](https://github.com/qwibitai/nanoclaw/pull/3213) registered question renderers; [PR #3214](https://github.com/qwibitai/nanoclaw/pull/3214) unified module lifecycle hooks; [PR #3227](https://github.com/qwibitai/nanoclaw/pull/3227) declared single-writer file surfaces.
- **Docs:** [PR #3216](https://github.com/qwibitai/nanoclaw/pull/3216) documented `install_packages` scope; [PR #3211](https://github.com/qwibitai/nanoclaw/pull/3211) defined the single-responsibility integration rule.

## Community Hot Topics

Comment and reaction counts are low across the board, but the most-discussed/active items are:

- [Issue #3226 — Inbound messages silently dropped when a platform reuses a message ID](https://github.com/qwibitai/nanoclaw/issues/3226) — 1 comment. Core concern: users cannot tell whether the agent ignored them or the message was dropped.
- [Issue #3075 — Silent log loss + duplicate-insert errors after long uptime](https://github.com/qwibitai/nanoclaw/issues/3075) — 1 comment. Operational reliability issue for long-running Matrix-backed deployments.
- [Issue #3223 — Scheduled-task errors produce unroutable, silently dropped error messages](https://github.com/qwibitai/nanoclaw/issues/3223) — 0 comments. Operators never learn that a scheduled task failed.

The underlying need across all three is the same: **silent failures must become observable.**

Large architectural PRs [PR #3220](https://github.com/qwibitai/nanoclaw/pull/3220) (Agent Plugins 1.0.0) and [PR #3092](https://github.com/qwibitai/nanoclaw/pull/3092) (remote Streamable HTTP MCP servers) also stand out by scope.

## Bugs & Stability

Ranked by severity:

1. **High — [Issue #3226](https://github.com/qwibitai/nanoclaw/issues/3226): inbound messages silently dropped on message-ID reuse.** Fix exists: [PR #3224](https://github.com/qwibitai/nanoclaw/pull/3224) preserves inbound messages across platform ID reuse.
2. **High — [Issue #3223](https://github.com/qwibitai/nanoclaw/issues/3223): scheduled-task errors silently dropped.** No fix PR is currently linked.
3. **Medium — [Issue #3075](https://github.com/qwibitai/nanoclaw/issues/3075): silent log loss + duplicate-insert errors after long uptime.** No fix PR is currently linked; also flags missing systemd unit.
4. **Security — Telegram pairing hardening:** [PR #3229](https://github.com/qwibitai/nanoclaw/pull/3229) replaces `Math.random()` with a CSPRNG, and [PR #3225](https://github.com/qwibitai/nanoclaw/pull/3225) enforces owner-only permissions on pairing storage. Both are open fixes for predictable pairing-code and filesystem-mode weaknesses.

Also note [PR #3228](https://github.com/qwibitai/nanoclaw/pull/3228) was closed as a fix for duplicate turn-scoped chat delivery.

## Feature Requests & Roadmap Signals

No new user-facing feature-request issues were filed in this window, but the PR backlog clearly signals the next roadmap directions:

- **Agent Plugins 1.0.0 migration:** [PR #3220](https://github.com/qwibitai/nanoclaw/pull/3220) converts agent templates into plugin directories; [PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909) adds the setup-wizard template flow.
- **Remote Streamable HTTP MCP support:** [PR #3092](https://github.com/qwibitai/nanoclaw/pull/3092) teaches the engine/Claude provider, and [PR #3221](https://github.com/qwibitai/nanoclaw/pull/3221) extends it to codex and opencode.
- **CLI ergonomics:** [PR #3218](https://github.com/qwibitai/nanoclaw/pull/3218) adds bounded JSON input from stdin.
- **Privacy controls:** [PR #3222](https://github.com/qwibitai/nanoclaw/pull/3222) adds opt-in privacy-safe DM logs.

The strongest next-release candidates are **Agent Plugins 1.0.0** and **remote Streamable HTTP MCP support**.

## User Feedback Summary

User-submitted pain points in this window are almost entirely about **reliability and observability**:

- Inbound messages can disappear without any user-visible sign ([#3226](https://github.com/qwibitai/nanoclaw/issues/3226)).
- Scheduled-task failures are invisible to operators ([#3223](https://github.com/qwibitai/nanoclaw/issues/3223)).
- Long-running instances can lose logs and hit duplicate-insert errors ([#3075](https://github.com/qwibitai/nanoclaw/issues/3075)).
- Telegram pairing code generation and file permissions need security hardening ([#3229](https://github.com/qwibitai/nanoclaw/pull/3229), [#3225](https://github.com/qwibitai/nanoclaw/pull/3225)).
- DM logging should support privacy-safe operation ([#3222](https://github.com/qwibitai/nanoclaw/pull/3222)).

There are no strong positive or negative reactions in the data, but maintainers appear responsive: targeted fix PRs exist for several of the reported issues.

## Backlog Watch

Items that may need maintainer attention:

- [PR #2134](https://github.com/qwibitai/nanoclaw/pull/2134) — open since **April 29**; Apple Silicon + Colima env vars in launchd plist.
- [Issue #3075](https://github.com/qwibitai/nanoclaw/issues/3075) — open since **July 17**; only 1 comment so far, and no linked fix.
- [PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909) — open since **July 2**; setup-wizard template flow + first-agent stamping.
- [PR #3092](https://github.com/qwibitai/nanoclaw/pull/3092) — open since **July 19**; core-team remote Streamable HTTP MCP support, still not merged.
- [Issue #3223](https://github.com/qwibitai/nanoclaw/issues/3223) — created August 10 with no comments yet; scheduled-task error routing needs a decision.
- [PR #3193](https://github.com/qwibitai/nanoclaw/pull/3193) — open since **August 6**; Telegram Chat SDK update for rich messages.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-11

## Today's Overview
NullClaw is in a low-activity phase as of 2026-08-11: exactly **1 issue updated** in the last 24 hours, **0 pull requests**, and **0 new releases**. The sole update was the closure of Issue #700, an A2A client-side feature proposal that had been open since late March 2026 — roughly five months. No open PRs are in flight, and no bug reports or regressions surfaced. The project is stable but quiet, with the main signal being the resolution of a community-contributed interoperability feature.

## Releases
No new releases were published in the last 24 hours. No changelog, breaking-change, or migration notes are applicable.

## Project Progress
- No pull requests were merged, closed, or opened today.
- The only progress signal is the closure of **[Issue #700 — Add a2a_call client tool for calling remote agents](https://github.com/nullclaw/nullclaw/issues/700)** (closed, updated 2026-08-10). This issue proposed adding a client-side `a2a_call` tool so the agent can send A2A `message/send` JSON-RPC requests to remote agents. Closure after a 5-month open period suggests community contributions or maintainer discussion reached a conclusion.

## Community Hot Topics
- **[Issue #700 — Add a2a_call client tool for calling remote agents](https://github.com/nullclaw/nullclaw/issues/700)** — 1 comment, 1 👍 reaction. The only discussion item in the window. The underlying need is **bidirectional A2A interoperability**: NullClaw currently serves the A2A protocol (v0.3.0) but has no client-side implementation, forcing users to bolt on their own tooling. The contributor's use case — running a public-facing "doorman" instance and a private personal agent — signals real demand for federated multi-instance agent deployments.

## Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. No stability-related PRs are pending. Severity ranking: **N/A**.

## Feature Requests & Roadmap Signals
- **[Issue #700](https://github.com/nullclaw/nullclaw/issues/700)** is the prominent feature signal: community-built client-side A2A support (`a2a_call`) for making outbound calls to remote agents. Since NullClaw already implements A2A v0.3.0 server-side, adding native client-side A2A is a natural roadmap step.
- Prediction: a first-party `a2a_call` client tool (or adoption of the contributor's implementation) could land in a future minor release, completing the A2A server/client loop and enabling multi-agents architectures out of the box.

## User Feedback Summary
- **Real use case**: georgeglarson runs two NullClaw instances — a public-facing doorman and a private personal agent — and needed programmatic communication between them via A2A `message/send`.
- **Pain point**: NullClaw lacks native client-side A2A, so the user built a custom `a2a_call` tool and contributed it back as a proposal.
- **Sentiment**: Positive but implicit — the issue garnered a 👍 and was eventually closed. The closure itself (whether merged conceptually or superseded) implies maintainers engaged with the proposal rather than ignoring it.

## Backlog Watch
No long-unanswered issues or stale PRs requiring maintainer attention are visible. The only tracked issue is now closed, there are zero open PRs, and the issue backlog shows no other items. The project's backlog appears fully drained from a maintenance standpoint.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-11

## 1. Today's Overview

IronClaw is in an active patch-and-stabilize cycle: a release candidate (v1.1.1-rc.1) was cut targeting channel delivery, MCP compatibility, WebUI streaming, and upgrade safety, while 22 issues and 50 PRs were updated in the last 24 hours (12 issues open, 10 closed; 33 PRs open, 17 merged/closed). The standout event is the merged fix batch [#7474](https://github.com/nearai/ironclaw/pull/7474), which resolved three QA-reported "agent asserts unverified state" hallucination bugs in one pass. Feature work is converging across several fronts: tenant/user model selection ([#7428](https://github.com/nearai/ironclaw/pull/7428), [#7439](https://github.com/nearai/ironclaw/pull/7439), [#7440](https://github.com/nearai/ironclaw/pull/7440)), a unified channel adapter ([#7477](https://github.com/nearai/ironclaw/pull/7477)), and profile-agnostic durable storage ([#7456](https://github.com/nearai/ironclaw/pull/7456)). A new contributor (theredspoon) is actively landing delivery-correctness work, a positive signal for community health. Overall the project shows high throughput with deliberate attention to agent truthfulness and operational stability.

## 2. Releases

### [ironclaw-v1.1.1-rc.1](https://github.com/nearai/ironclaw/releases) — 1.1.1-rc.1 (2026-08-10)

Urgent patch candidate for the 1.1 line, concentrating on:
- **Channel delivery and pairing**
- **IronHub / custom MCP compatibility**
- **WebUI streaming stability**
- **Durable retrieval**
- **Safe upgrades from both supported stable predecessors**

**Migration note:** Upgrading from 1.0.0 requires **stopping all writers** before the upgrade.

## 3. Project Progress

Merged/closed PRs in the last 24h (visible set of 17 total):

- **[#7474](https://github.com/nearai/ironclaw/pull/7474)** — `fix(qa)`: stop the agent asserting unverified state — automation status, per-caller extension auth, recalled memory. Closes three bugs at once: [#7246](https://github.com/nearai/ironclaw/issues/7246), [#7247](https://github.com/nearai/ironclaw/issues/7247), [#7294](https://github.com/nearai/ironclaw/issues/7294). One commit per issue, each reproduced deterministically before the fix.
- **[#7426](https://github.com/nearai/ironclaw/pull/7426)** — `feat(stress)`: durable memory parity matrix. Adds production-wired `memory_roundtrip`, `memory_grow`, and `memory_mixed` workloads across 4 KiB–1 MiB documents, with stateful compaction recovery and bounded contention.
- **[#7381](https://github.com/nearai/ironclaw/pull/7381)** — `docs(internal)`: doc-truth pipeline design record (final PR of the doc-truth series, 5/5). Answers issue [#7317](https://github.com/nearai/ironclaw/issues/7317) with decisions of record around the `docs-live` deployment branch and deterministic verification.
- **[#7336](https://github.com/nearai/ironclaw/pull/7336)** — `fix(loop-host)`: dedup consumed steering replays, preventing delayed queued-message replays from triggering duplicate assistant replies.

Closed issues reflecting completed or consolidated work: [#7317](https://github.com/nearai/ironclaw/issues/7317) (doc-truth pipeline), [#6941](https://github.com/nearai/ironclaw/issues/6941) (self-create/find/use skills sub-epic), [#6727](https://github.com/nearai/ironclaw/issues/6727) (custom/arbitrary MCP server support), [#6485](https://github.com/nearai/ironclaw/issues/6485), [#6484](https://github.com/nearai/ironclaw/issues/6484), [#6483](https://github.com/nearai/ironclaw/issues/6483) (channel-aware conversations, canonical messaging ops, Telegram completeness epics), and [#6834](https://github.com/nearai/ironclaw/issues/6834) (Slack setup failure).

## 4. Community Hot Topics

- **[#7137 — live-canary shard artifacts are 700MB–1.5GB](https://github.com/nearai/ironclaw/issues/7137)** (12 comments, open, enhancement): The most-discussed item. CI shards push total run artifacts past **5GB across 13 bundles**, burning GitHub Actions storage quota and making triage downloads impractically slow. Underlying need: exclude regenerable/intermediate paths from upload. No linked fix PR yet.
- **[#7317 — Doc-Truth Verification Pipeline](https://github.com/nearai/ironclaw/issues/7317)** (3 comments, closed, 1 👍): User-authored proposal with concrete drift examples (e.g., `origin_gate_matrix` becoming mandatory without doc updates). Resolved when the doc-truth pipeline records landed via [#7381](https://github.com/nearai/ironclaw/pull/7381).
- **[#3762 — Editing AGENTS.md does not update system prompt](https://github.com/nearai/ironclaw/issues/3762)** (2 comments, open since May, P1/customer-tagged): WebUI edits to identity files save but never reach the system prompt for current or future conversations. No fix PR attached.
- **[#6941 — Skills epic: self-create/find/choose/use](https://github.com/nearai/ironclaw/issues/6941)** (1 comment, closed): Closed as a deliberately-scoped subset of the oversized #6565; the issue text explicitly notes 21 acceptance criteria were too large for one person.

Note: PR comment counts were not reliably populated in this dataset, so issue comment volume is the primary engagement signal. New contributor **theredspoon** is notably active on delivery-correctness topics ([#7475](https://github.com/nearai/ironclaw/pull/7475), [#7472](https://github.com/nearai/ironclaw/pull/7472), [#5101](https://github.com/nearai/ironclaw/pull/5101)).

## 5. Bugs & Stability

Ranked by severity:

1. **[#7473 — Connect-nudge throttle released on ref-less delivery](https://github.com/nearai/ironclaw/issues/7473)** (open): `post_notice` collapses "nothing sent" and "sent but no vendor ref" into one `None`, releasing the anti-duplicate throttle and allowing a second connect-nudge to reach an already-nudged user. **Fix PR exists:** [#7475](https://github.com/nearai/ironclaw/pull/7475) (open, size L, new contributor). Related open gap: [#7476](https://github.com/nearai/ironclaw/issues/7476) — `classify_delivery_outcome` on the MODEL path ignores `vendor_message_refs` on `Failed`, hiding partial-send evidence.
2. **[#7447 — Agent fails after calling too many tools](https://github.com/nearai/ironclaw/issues/7447)** (open, v1.3.0): Agent entered a redundant fetch-retry loop (4 near-duplicate GitHub queries with shrinking limits) instead of paginating, burning the run's tool-call/turn budget. Points to a need for better loop/budget management or pagination prompting.
3. **[#7481 — Long conversation titles unreachable in left navigation](https://github.com/nearai/ironclaw/issues/7481)** (open): Truncated titles cannot be read on hover. **Fix PR exists:** [#7480](https://github.com/nearai/ironclaw/pull/7480) adds an overflow-aware `MarqueeText` component.
4. **Closed by [#7474](https://github.com/nearai/ironclaw/pull/7474):** [#7246](https://github.com/nearai/ironclaw/issues/7246) (agent fabricated automation status), [#7247](https://github.com/nearai/ironclaw/issues/7247) (agent falsely claimed GitHub connected), [#7294](https://github.com/nearai/ironclaw/issues/7294) (agent "remembered" a Telegram routine from another scope). All three were QA-found false-state assertions on the Railway libsql instance.
5. **[#6834 — Slack setup fails (near.foundation account)](https://github.com/nearai/ironclaw/issues/6834)** (closed): Connection/auth flow never completes, leaving the extension unusable.

## 6. Feature Requests & Roadmap Signals

**In-flight feature work (open PRs):**
- **Model selection & preferences** — [#7428](https://github.com/nearai/ironclaw/pull/7428) (tenant-scoped model policy + sanitized catalog), [#7439](https://github.com/nearai/ironclaw/pull/7439) (per-user preferences + `/model` commands), [#7440](https://github.com/nearai/ironclaw/pull/7440) (non-admin Settings → Inference UI). This coherent initiative will likely land in **v1.3.0**.
- **[#7477 — Unified channel model](https://github.com/nearai/ironclaw/pull/7477)** (open, XL): One `ChannelAdapter` per channel (web-app, Slack, Telegram) for inbound, replies, and notifications; implements the 2026-08-10 design doc end-to-end.
- **[#7478 — Sandbox: shell integration, egress mediation, credential firewall](https://github.com/nearai/ironclaw/pull/7478)** (open, draft): Sandboxed shell to run `git clone`, `npm install`, and authenticated API calls without exposing credentials. Draft explicitly opened for design review.
- **[#7456 — Profile-agnostic durable storage](https://github.com/nearai/ironclaw/pull/7456)** (open, epic [#7467](https://github.com/nearai/ironclaw/issues/7467)): Roots Reborn storage at `IRONCLAW_REBORN_HOME` with a typed security envelope, migrating legacy profile roots.
- **[#7410 — Tool-search fair discovery](https://github.com/nearai/ironclaw/pull/7410)** (open, XL): Bounded complete input signatures remove the mandatory `tool_describe` round trip; adds deterministic representative-tool rounds.

**Roadmap epics by target version:**
- **v1.3.0:** [#7038](https://github.com/nearai/ironclaw/issues/7038) (Storybook + AI-first Design System), [#7354](https://github.com/nearai/ironclaw/issues/7354) (Extensions vNext: Web Push, Rich Messaging, Telegram User Sessions, Signal — target 2026-08-14), [#3762](https://github.com/nearai/ironclaw/issues/3762) (AGENTS.md system-prompt sync).
- **v1.4.0:** [#7044](https://github.com/nearai/ironclaw/issues/7044) (channel-first onboarding).
- **Unversioned:** [#7046](https://github.com/nearai/ironclaw/issues/7046) (admin configuration of all tools/channels from AI chat), [#7465](https://github.com/nearai/ironclaw/issues/7465) (Company Brain FDE).

## 7. User Feedback Summary

- **Agent truthfulness is the sharpest current pain point:** Three QA bugs in one week involved the agent confidently asserting unverified state — automation running, GitHub connected, Telegram routine existing. Maintainers responded with a deterministic, one-commit-per-issue fix batch ([#7474](https://github.com/nearai/ironclaw/pull/7474)), signaling this is treated as a top correctness priority.
- **Setup friction persists:** The closed Slack failure ([#6834](https://github.com/nearai/ironclaw/issues/6834)) and the [#7046](https://github.com/nearai/ironclaw/issues/7046) proposal to configure everything from chat both point to configuration UX as a key adoption barrier.
- **Docs drift validated by users:** [#7317](https://github.com/nearai/ironclaw/issues/7317) documented real cases of breaking changes released without doc updates; the maintainers accepted and shipped a doc-truth pipeline ([#7381](https://github.com/nearai/ironclaw/pull/7381)) — a responsive close of a user-raised process issue.
- **Long-standing customer issue:** [#3762](https://github.com/nearai/ironclaw/issues/3762) (AGENTS.md edits not reflected in system prompt) has been open since May with only two comments and no fix PR despite P1/v1.3.0 tags.
- **Maintainer-experience complaints:** The 5GB+ CI artifact problem ([#7137](https://github.com/nearai/ironclaw/issues/7137)) is framed around slow triage downloads and storage quota burn — operational debt that affects contributor velocity.

## 8. Backlog Watch

- **[#3762 — AGENTS.md edits don't update system prompt](https://github.com/nearai/ironclaw/issues/3762)** — open since **2026-05-18**, P1/customer-tagged, v1.3.0, only 2 comments in ~3 months, no linked PR. Highest-priority item needing maintainer attention.
- **[#5101 — Reuse cargo-component installer in live canary](https://github.com/nearai/ironclaw/pull/5101)** — open since **2026-06-20**, size S, CI-scoped, zero comments. A small hardening change that has stalled despite active CI work elsewhere.
- **[#7137 — live-canary artifact bloat](https://github.com/nearai/ironclaw/issues/7137)** — open since 2026-08-04, high engagement (12 comments) but no fix PR attached yet; every day it stays open consumes ~5GB of Actions storage per run.
- **[#7046 — Configure all tools/channels from AI chat](https://github.com/nearai/ironclaw/issues/7046)** — open since 2026-08-03, zero comments; overlaps with the v1.4.0 onboarding epic ([#7044](https://github.com/nearai/ironclaw/issues/7044)) and could absorb the user pain seen in #6834-style setup failures.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-11

## 1. Today's Overview
LobsterAI is in a high-velocity development phase. 29 PRs were updated in the last 24 hours, with 18 closed/merged and 11 still open — the strongest recent signal being a sustained push across the Cowork experience and OpenClaw runtime reliability. Only 4 issues were touched, mostly stale bot closures from April–May reports, leaving exactly **1 open issue** ([#1183](https://github.com/netease-youdao/LobsterAI/issues/1183)). No new releases shipped today. Maintainer responsiveness looks healthy: the long-dormant Settings data-loss issue ([#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)) was resolved via merged PR [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241), and today's merged work adds substantial user-facing features (configurable thinking levels, file attachment cards, right-click file menus) alongside several runtime stability fixes.

## 2. Releases
**None.** No new versions were published in the last 24 hours. This sprint's features (thinking levels, Cowork UX, OpenClaw fixes) are currently only available on `main` and will likely consolidate into a future release.

## 3. Project Progress
**18 PRs closed/merged in the last 24h.** Highlights by area:

**Feature work:**
- [**#2457 — feat(models): add configurable thinking levels**](https://github.com/netease-youdao/LobsterAI/pull/2457) — biggest PR of the day, cross-cutting renderer/docs/main/openclaw/cowork. Adds server-driven thinking-level options, product-level `max` → runtime `xhigh` alias mapping, and per-session/per-agent persistence with versioned model request options.
- [**#1241 — feat(settings): unsaved-changes confirmation on close**](https://github.com/netease-youdao/LobsterAI/pull/1241) — closes [#1237](https://github.com/netease-youdao/LobsterAI/issues/1237); dirty-check via initial snapshot, intercepts background-click / X / Cancel.
- [**#1239 — feat(main): flash taskbar/Dock icon on AI task completion**](https://github.com/netease-youdao/LobsterAI/pull/1239) — cross-platform attention: `win.flashFrame(true)` on Windows, `app.dock.bounce` on macOS, no-op on Linux.
- [**#2473 — feat(cowork): right-click context menu for local file links**](https://github.com/netease-youdao/LobsterAI/pull/2473) — open-with / save-as / copy-path / copy-contents / reveal-in-folder, plus new `dialog:saveFileCopy` IPC handler.
- [**#2471 — feat(cowork): submitted file attachments render as clickable cards**](https://github.com/netease-youdao/LobsterAI/pull/2471) — non-image attachments no longer degrade to raw `输入文件: /path` text.
- [**#2472 — feat: cowork activity group collapse**](https://github.com/netease-youdao/LobsterAI/pull/2472)
- [**#2469 — feat(cowork): collapse-agent-tasks shortcut; modifier shortcuts while typing**](https://github.com/netease-youdao/LobsterAI/pull/2469)
- [**#2468 — refactor(cowork): unify streaming loading indicators**](https://github.com/netease-youdao/LobsterAI/pull/2468)

**Stability & bug fixes:**
- [**#2470 — fix(openclaw): surface provider runtime failures on late chat error**](https://github.com/netease-youdao/LobsterAI/pull/2470) — real LLM/provider failures (e.g., idle-timeout failover) were being swallowed as "stale tool-failure notices"; now surfaced.
- [**#2454 — fix(openclaw): stop tool-loop guard from killing legitimate polling**](https://github.com/netease-youdao/LobsterAI/pull/2454)
- [**#2467 — fix(python-runtime): repair stale pip shims on Windows runtime upgrade**](https://github.com/netease-youdao/LobsterAI/pull/2467) — health checks now converge shim templates rather than only checking file existence.
- [**#2466 — fix: renderer init IPC stall retry**](https://github.com/netease-youdao/LobsterAI/pull/2466)
- [**#2474 — fix(sidebar): align sites icon stroke weight**](https://github.com/netease-youdao/LobsterAI/pull/2474)

**Dependency updates (merged):** [vite 5.4.21 → 8.0.13](https://github.com/netease-youdao/LobsterAI/pull/1766), [react-dom 18.3.1 → 19.2.6](https://github.com/netease-youdao/LobsterAI/pull/1764), [@vitejs/plugin-react 4.7.0 → 6.0.1](https://github.com/netease-youdao/LobsterAI/pull/1763). Follow-up bumps to vite 8.2.1 ([#2465](https://github.com/netease-youdao/LobsterAI/pull/2465)) and react-dom 19.2.8 ([#2464](https://github.com/netease-youdao/LobsterAI/pull/2464)) remain open.

## 4. Community Hot Topics
Thread activity is light (1–2 comments per issue), suggesting the community interacts mostly by filing reports rather than discussing. The most significant threads:

- [**#1240 — Rate-limited model locks out switching to all other models**](https://github.com/netease-youdao/LobsterAI/issues/1240) — A user running LobsterAI as a multi-window orchestration hub (QQ-scheduled tasks, Gemini agents in parallel) reports that when Volcano Engine's coding plan exhausted its quota, *every* window/agent reported "受限" (restricted), including Gemini. Restart failed until rolling back `openclaw.json`. **Underlying need: per-provider fault isolation and failover** — a provider-level outage currently poisons all model routing.
- [**#1237 — Settings closes without confirmation, API Key silently lost**](https://github.com/netease-youdao/LobsterAI/issues/1237) — configuration data-loss UX issue; now fixed by [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241).
- [**#2062 — Task exceeds maximum duration; state ambiguous**](https://github.com/netease-youdao/LobsterAI/issues/2062) — User doesn't know if a timed-out 24h task was killed or still running in background.

## 5. Bugs & Stability
Ranked by severity:

1. **[HIGH] [Open] [#1183 — Gateway startup mask loops indefinitely (Windows)]** — [Issue](https://github.com/netease-youdao/LobsterAI/issues/1183). After toggling a model off and saving, the app repeatedly shows the "openClaw 网关未能在规定时间内启动成功" overlay. Open since **2026-04-01**, stale-marked, no linked fix PR. The oldest unresolved bug in the project.
2. **[HIGH] [Closed/stale] [#1240 — Provider rate-limit cascades globally, app becomes unusable]** — [Issue](https://github.com/netease-youdao/LobsterAI/issues/1240). Closed by stale bot without a linked fix. The isolation problem likely remains.
3. **[MED] [Closed/stale] [#2062 — Task timeout leaves ambiguous kill/continue state]** — [Issue](https://github.com/netease-youdao/LobsterAI/issues/2062). User attempted a 24h continuous task; unclear whether work continues in background.
4. **[LOW] [Fixed] [#1237 — Silent Settings data loss]** — [Issue](https://github.com/netease-youdao/LobsterAI/issues/1237) → fix merged in [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241).

**Today's shipped stability fixes** worth highlighting: tool-loop guard false positives ([#2454](https://github.com/netease-youdao/LobsterAI/pull/2454)), Windows pip shim corruption after runtime upgrade ([#2467](https://github.com/netease-youdao/LobsterAI/pull/2467)), renderer IPC init stalls with retry ([#2466](https://github.com/netease-youdao/LobsterAI/pull/2466)), and swallowed provider runtime errors on late chat responses ([#2470](https://github.com/netease-youdao/LobsterAI/pull/2470)). These target exactly the class of "silent failure" complaints seen in recent issues.

## 6. Feature Requests & Roadmap Signals
- **Configurable thinking levels** ([#2457](https://github.com/netease-youdao/LobsterAI/pull/2457)) just landed — expect per-agent "thinking effort" controls to be surfaced in UI and documented in the next release.
- **Cowork is clearly the flagship surface**: today's merged work (attachment cards, right-click file menus, activity collapse, shortcut, unified loading indicators) is a coordinated UX maturation pass. This is the strongest roadmap signal.
- **Task continuation after timeout** ([#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)) — the error message already hints "You can continue the…" (likely a resume path); a completion of that affordance is a plausible near-term patch.
- **Per-provider fault isolation** ([#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)) — the highest-value reliability upgrade users are implicitly requesting; no PR exists yet.
- **Cross-platform window attention** ([#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)) — a nice quality-of-life addition, especially for background multi-window workloads.

## 7. User Feedback Summary
- **Dissatisfaction clusters around three themes:** configuration/data safety (silent Settings loss, #1237), fragile multi-provider model routing under rate limits (#1240), and opaque long-running task lifecycle (#2062).
- **Usage patterns reveal production-ish deployment:** users schedule tasks from IM (QQ), run multiple agent windows concurrently, and depend on continuous 24h operations — meaning provider outages and gateway failures have real operational impact.
- **Positive responsiveness signal:** #1237 reported April 1 → fix PR merged by August 11 (and the issue closed on update); maintainers did not drop it. The breadth of Cowork feature work also indicates active investment in the end-user experience.
- All four issues touched today are from Chinese-speaking users — the community remains bilingual (issues/PRs in zh and en), consistent with the netease-youdao lineage.

## 8. Backlog Watch
- [**#1183 — Gateway mask loop (OPEN, stale since 2026-04-01)**](https://github.com/netease-youdao/LobsterAI/issues/1183) — the only open issue in today's data; Windows-specific startup regression with no linked PR. Needs maintainer triage.
- [**#1181 — Hide OpenClaw main agent sessions from session list (OPEN, stale)**](https://github.com/netease-youdao/LobsterAI/pull/1181) — a UX cleanup PR open since April (adds `hidden` column to `cowork_sessions`); appears complete and awaiting review.
- [**#2452 — Preserve provider for slashed model IDs (OPEN)**](https://github.com/netease-youdao/LobsterAI/pull/2452) — correctness fix for models like `custom_0` + `deepseek-ai/DeepSeek-V4-Flash` where the `/` in the model ID causes provider-prefix loss. Open since 2026-08-07; important for third-party/model-router users.
- **Open dependency follow-ups:** [vite 8.2.1 (#2465)](https://github.com/netease-youdao/LobsterAI/pull/2465) and [react-dom 19.2.8 (#2464)](https://github.com/netease-youdao/LobsterAI/pull/2464) — trivial bumps continuing today's major-version migrations.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-11

Source: [github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)

## 1. Today's Overview
Moltis saw light but active maintenance activity in the last 24 hours: no releases were published, no PRs were merged/closed, and all tracked items remain open. Three bug issues were active/updated, and two long-running open PRs received updates, suggesting ongoing development rather than a release-oriented day. The most discussed item is an Apple Container sandbox detection issue, while a major browser UI feature PR continues to move forward after several months. Overall project health appears stable, with no regressions or crashes reported in the current window and no closed issues/PRs to signal completed work.

## 2. Releases
None in the last 24 hours. No release data is available for 2026-08-11.

## 3. Project Progress
No PRs were merged or closed during this period.

Two existing open PRs were updated:

- [PR #1182 – fix(sessions): allow deleting and archiving the main session](https://github.com/moltis-org/moltis/pull/1182)  
  Updated 2026-08-11. This PR fixes the inability to delete/archive the `main` session, keeping the active-channel-session restriction while removing the `main` guard. The related issue is #1132.

- [PR #531 – feat(browser): interactive browser viewing UI with CDP screencast](https://github.com/moltis-org/moltis/pull/531)  
  Updated 2026-08-10. This large feature PR adds live browser viewing via CDP screencast, mouse/keyboard/scroll interaction, action logs, and per-agent browser profiles. It remains open and is a strong candidate for future release content.

## 4. Community Hot Topics
The only item with meaningful discussion in the current set is:

- [Issue #1185 – [Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)  
  Created 2026-08-08, updated 2026-08-10, 3 comments. This is the most active issue in the window. The underlying need is reliable sandbox lifecycle detection for Apple Container — users need Moltis to accurately reflect that a sandbox is running so they don't get stuck in a false "not running" state.

Other items currently have no comments, though [PR #1182](https://github.com/moltis-org/moltis/pull/1182) and [PR #531](https://github.com/moltis-org/moltis/pull/531) represent ongoing community-contributed functionality that will likely attract more attention once merged.

## 5. Bugs & Stability
Three bug reports were active/updated in the last 24 hours, ranked by estimated severity:

1. **[Issue #1185 – Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)**  
   **Severity: High** — This can cause valid, running sandboxes to be misreported as inactive, potentially blocking workflows and causing user confusion. It has the most engagement (3 comments) but no explicit fix PR is visible.

2. **[Issue #1188 – resource limits not applied for apple-container backend](https://github.com/moltis-org/moltis/issues/1188)**  
   **Severity: Medium/High** — Resource limit enforcement is silently skipped for Apple Container, which can lead to uncontrolled resource usage. No comments or fix PR yet.

3. **[Issue #1189 – Sandbox build failing due to wrong gogcli github URL](https://github.com/moltis-org/moltis/issues/1189)**  
   **Severity: Low/Medium** — A build configuration issue caused by a wrong `gogcli` GitHub URL. This is likely a quick fix, but it blocks sandbox builds for affected users. No comments yet.

No crashes or regressions beyond the above were reported.

## 6. Feature Requests & Roadmap Signals
The clearest roadmap signal is [PR #531 – interactive browser viewing UI with CDP screencast](https://github.com/moltis-org/moltis/pull/531). It has been open since 2026-03-31 and was updated again this period, indicating active iteration on a major browser-session feature. If merged, it could become a headline feature in a future release.

[PR #1182 – allow deleting and archiving the main session](https://github.com/moltis-org/moltis/pull/1182) addresses a practical session-management limitation and is tied to issue #1132. It is small, focused UX work and could land in the next minor/patch release.

## 7. User Feedback Summary
User-reported pain points in the current window center on Apple Container backend reliability:

- Moltis does not correctly detect that an Apple Container 1.x sandbox is running ([#1185](https://github.com/moltis-org/moltis/issues/1185)).
- Resource limits are not enforced for the Apple Container backend ([#1188](https://github.com/moltis-org/moltis/issues/1188)).
- Sandbox builds can fail due to a wrong dependency URL ([#1189](https://github.com/moltis-org/moltis/issues/1189)).
- Users want the ability to delete/archive the main session, which was previously blocked ([#1182](https://github.com/moltis-org/moltis/pull/1182)).

There is no indication of user praise or satisfaction in this window; feedback is mostly bug-focused. The preflight checklist is being used, which suggests users are testing the latest version and reporting issues in a structured way.

## 8. Backlog Watch
The following items may need maintainer attention:

- **[PR #531 – feat(browser): interactive browser viewing UI with CDP screencast](https://github.com/moltis-org/moltis/pull/531)**  
  Open since 2026-03-31, recently updated, but still not merged. This is the longest-running significant feature PR and needs a maintainer review/decision.

- **[Issue #1185 – Apple Container sandbox detection bug](https://github.com/moltis-org/moltis/issues/1185)**  
  Created 2026-08-08, with discussion but no associated fix PR. Given the likely impact, it should be prioritized.

- **[PR #1182 – fix(sessions): allow deleting and archiving the main session](https://github.com/moltis-org/moltis/pull/1182)**  
  Open since 2026-08-01 and updated 2026-08-11; appears ready for closer review and possible merge.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-11

## 1. Today's Overview

CoPaw/QwenPaw showed very high activity on 2026-08-11: 15 issues were updated (8 open/active, 7 closed) and 50 PRs were updated (28 open, 22 merged/closed). No new release was cut in the last 24 hours; the user-visible version remains around the v2.1.0-beta.2 line. The bulk of closed work focused on Console UX fixes, MCP session recovery, CLI argument handling, and dependency updates. Open PRs indicate continued investment in memory features, provider discovery, search integration, and workspace artifacts. Overall project health looks solid, though MCP reliability and a Chinese IME crash remain notable stability watchpoints.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

The following notable PRs were closed/merged today (22 PRs merged/closed total; visible top-20 list shown):

- [fix(console): stabilize chat wheel scrolling (#6904)](https://github.com/agentscope-ai/QwenPaw/pull/6904) — Normalizes wheel deltas for reverse-ordered chat lists and preserves nested scrolling behavior.
- [fix: accept project paths after global CLI options (#6892)](https://github.com/agentscope-ai/QwenPaw/pull/6892) — Fixes `qwenpaw --port 6066 .` failing with “No such command”.
- [test(integration): drop stale project_dir assertion in coding-mode test (#6899)](https://github.com/agentscope-ai/QwenPaw/pull/6899) — Aligns integration tests with upstream `project_dir` unification.
- [feat(creator): settings center, agent skills, mm-plugins compose orchestration, async media generation (#6870)](https://github.com/agentscope-ai/QwenPaw/pull/6870) — Large Creator plugin aggregate.
- [fix(console): remove duplicated GitHub link from header resources menu (#6903)](https://github.com/agentscope-ai/QwenPaw/pull/6903) — Console header cleanup.
- [fix(approvals): pass channel routing fields in driver gate (#6833)](https://github.com/agentscope-ai/QwenPaw/pull/6833) — Prevents approval requests from silently waiting without notifying the correct channel.
- [fix(tests): skip qoder harness tests cleanly when the SDK is missing (#6886)](https://github.com/agentscope-ai/QwenPaw/pull/6886) — Improves CI behavior when optional dependencies are absent.
- [fix(mcp): recover terminated sessions without dropping all tools (#6894)](https://github.com/agentscope-ai/QwenPaw/pull/6894) — Treats “Session terminated” as recoverable and serves cached tool schemas during reconnection.
- [fix(scroll): fix of recall correctness issues from aone (#6824)](https://github.com/agentscope-ai/QwenPaw/pull/6824) — Fixes CJK substring search failures caused by SQLite FTS5 tokenization.
- [chore(deps): update @agentscope-ai/chat to 1.1.73-beta (#6896)](https://github.com/agentscope-ai/QwenPaw/pull/6896) — Fixes off-screen load-more spinner causing idle repaint.
- [feat(agent-stats): narrow Agent Statistics page to the current agent (#6862)](https://github.com/agentscope-ai/QwenPaw/pull/6862) — Removes misleading process-wide token usage from the statistics page.

Also active/open today:

- [fix(sandbox): stop injecting PYTHONHOME into child processes (#6902)](https://github.com/agentscope-ai/QwenPaw/pull/6902) — Fixes frozen desktop backend environment issues.
- [feat(chat): add persistent workspace artifact cards (#6719)](https://github.com/agentscope-ai/QwenPaw/pull/6719)
- [feat(retry): add cumulative back-off budget, Retry-After cap, and on_retry callback (#6905)](https://github.com/agentscope-ai/QwenPaw/pull/6905)
- [fix: make Auto-Dream integration resilient (#6884)](https://github.com/agentscope-ai/QwenPaw/pull/6884)
- [feat: integrate AnySearch web search (SearchProvider + MCP) (#6817)](https://github.com/agentscope-ai/QwenPaw/pull/6817)

## 4. Community Hot Topics

Issue comment counts were the clearest signal; PR comment data was not fully exposed. Most active issues:

- [\[Bug\]: mcp工具规律性失效 (#6732)](https://github.com/agentscope-ai/QwenPaw/issues/6732) — 9 comments, closed. MCP tools stop being recognized after hours until container restart. High frustration: users need a reliable long-running MCP lifecycle.
- [\[Bug\]: OpenAI-compatible chat requests carry Responses-API input_text content type (#6803)](https://github.com/agentscope-ai/QwenPaw/issues/6803) — 6 comments, closed. Strict providers reject chat requests with non-standard fields.
- [\[Bug\]: Loading animation does not disappear after Agent response completes (#5790)](https://github.com/agentscope-ai/QwenPaw/issues/5790) — 4 comments, closed. Console spinner UX issue.
- [\[Feature\]: isolate chat project directories from the agent workspace (#6900)](https://github.com/agentscope-ai/QwenPaw/issues/6900) — 3 comments, closed. Users want clearer separation between internal workspace and user-facing chat projects.
- [\[Question\]: 怎么集成CopilotKit (#6882)](https://github.com/agentscope-ai/QwenPaw/issues/6882) — 2 comments, open. Users want a concrete CopilotKit integration guide.
- [\[Question\]: 接入QQbot对话能减少在QQ bot工作流在信息 (#6897)](https://github.com/agentscope-ai/QwenPaw/issues/6897) — 2 comments, open. QQ channel workflow messages are too noisy and risk rate limiting.
- [\[Question\]: 能建立个微信群吗？ (#6895)](https://github.com/agentscope-ai/QwenPaw/issues/6895) — 2 comments, open. Strong Chinese community demand for a WeChat group.
- [\[Bug\]: Console UI crashes on Chinese IME compositionEnd (#6885)](https://github.com/agentscope-ai/QwenPaw/issues/6885) — 2 comments, open. Severe input-method-related UI crash.
- [\[Bug\]: Frontend historical message timestamps shifted by +8h (#6871)](https://github.com/agentscope-ai/QwenPaw/issues/6871) — 2 comments, closed.
- [\[Feature\]: Auto-refresh session title after auto-memory update (#6881)](https://github.com/agentscope-ai/QwenPaw/issues/6881) — 2 comments, open.

Underlying needs: MCP reliability for long-running deployments, strict compatibility with OpenAI-compatible providers, better Console resource usage and Chinese input-method support, and a more direct communication channel for Chinese users.

## 5. Bugs & Stability

Ranked by severity:

- **High — Console UI crashes on Chinese IME compositionEnd during agent run (#6885)**  
  [Issue #6885](https://github.com/agentscope-ai/QwenPaw/issues/6885)  
  Open. In v2.1.0b2, using a Chinese IME while the agent is running makes the message queue unusable. No dedicated fix PR is visible yet.

- **High — MCP tools intermittently become unavailable until container restart (#6732)**  
  [Issue #6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)  
  Closed. PR [#6894](https://github.com/agentscope-ai/QwenPaw/pull/6894) appears to target the root cause by recovering terminated MCP sessions and serving cached tool schemas.

- **Medium-High — Console idle repaint ~20% CPU due to infinite CSS animations (#6828)**  
  [Issue #6828](https://github.com/agentscope-ai/QwenPaw/issues/6828)  
  Closed. Fixed via dependency update [#6896](https://github.com/agentscope-ai/QwenPaw/pull/6896).

- **Medium — OpenAI-compatible chat requests rejected by strict providers (#6803)**  
  [Issue #6803](https://github.com/agentscope-ai/QwenPaw/issues/6803)  
  Closed. Requests included Responses-API `input_text` content type and raw streaming fields, causing 400 errors at providers like StepFun.

- **Medium — Historical message timestamps shifted by +8h after re-render (#6871)**  
  [Issue #6871](https://github.com/agentscope-ai/QwenPaw/issues/6871)  
  Closed. Frontend timezone rendering bug in UTC+8 environments.

- **Medium — Loading animation remains after Agent response completes (#5790)**  
  [Issue #5790](https://github.com/agentscope-ai/QwenPaw/issues/5790)  
  Closed. Console spinner state bug.

- **Medium — Daily page notes inside subfolders grouped under wrong date (#6883)**  
  [Issue #6883](https://github.com/agentscope-ai/QwenPaw/issues/6883)  
  Open. Notes such as `memory/2026-08-09/xxx.md` appear under 2026-08-10 instead of 2026-08-09.

- **Low-Medium — Background forked subagent reports completed when worktree finalization fails (#6722)**  
  [Issue #6722](https://github.com/agentscope-ai/QwenPaw/issues/6722)  
  Closed. The subagent reported success even though the expected commit was missing.

- **Low — Repeated GitHub links in Console header (#6901)**  
  [Issue #6901](https://github.com/agentscope-ai/QwenPaw/issues/6901)  
  Open. Possibly a regression from header resource-menu changes.

## 6. Feature Requests & Roadmap Signals

Active feature requests:

- [Isolate chat project directories from the agent workspace (#6900)](https://github.com/agentscope-ai/QwenPaw/issues/6900) — Closed, and already reflected in test updates from PR [#6899](https://github.com/agentscope-ai/QwenPaw/pull/6899).
- [Auto-refresh session title after auto-memory update (#6881)](https://github.com/agentscope-ai/QwenPaw/issues/6881) — Open; users want session titles to stay aligned with memory updates.
- [公式渲染问题；会话分组管理；活动会话背景 (#6893)](https://github.com/agentscope-ai/QwenPaw/issues/6893) — Open; requests LaTeX rendering, session grouping, and active-session background styling.
- [CopilotKit integration question (#6882)](https://github.com/agentscope-ai/QwenPaw/issues/6882) — Open; users want official integration guidance.
- [QQ bot workflow message reduction (#6897)](https://github.com/agentscope-ai/QwenPaw/issues/6897) — Open; users want less verbose workflow updates in QQ to avoid rate limiting.
- [WeChat community group (#6895)](https://github.com/agentscope-ai/QwenPaw/issues/6895) — Open; community-building request.

Open PRs that signal roadmap direction:

- [AnySearch web search integration replacing Tavily (#6817)](https://github.com/agentscope-ai/QwenPaw/pull/6817)
- [Persistent workspace artifact cards (#6719)](https://github.com/agentscope-ai/QwenPaw/pull/6719)
- [Embedding hot updates and Daily Paper for ReMe Light (#6772)](https://github.com/agentscope-ai/QwenPaw/pull/6772)
- [Unified provider discovery, model metadata, routing, and agent controls (#6302)](https://github.com/agentscope-ai/QwenPaw/pull/6302)
- [CI gate on main mergeability (#6764)](https://github.com/agentscope-ai/QwenPaw/pull/6764)
- [Retry back-off budget and Retry-After handling (#6905)](https://github.com/agentscope-ai/QwenPaw/pull/6905)

Likely next-version content: MCP recovery improvements, Console input-method and scrolling fixes, workspace artifact support, and possibly the AnySearch provider integration.

## 7. User Feedback Summary

Real user pain points visible in this snapshot:

- Long-running MCP deployments are fragile; users must restart Docker containers to restore tool access.
- Strict OpenAI-compatible providers reject QwenPaw chat requests because of Responses-API leakage into the Chat Completions payload.
- Chinese IME input is effectively broken during agent runs in v2.1.0b2.
- Console frontend can burn ~20% CPU at idle, causing visible UI jank.
- QQ channel users feel workflow updates are too noisy and may trigger rate limits.
- Users are asking for LaTeX formula rendering, session grouping, and better timezone display.
- Chinese users repeatedly request a WeChat group, indicating demand for a more accessible community channel.

Satisfaction signals: many bugs are being closed quickly, multiple first-time contributors are landing PRs, and maintainers are actively merging fixes within 24 hours of reports.

## 8. Backlog Watch

Items that appear to need continued maintainer attention:

- [feat: unify provider discovery, model metadata, routing, and agent controls (#6302)](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Open since 2026-07-21. Large architectural PR, still in review.
- [fix(plugins): isolate bare absolute imports per plugin namespace (#6688)](https://github.com/agentscope-ai/QwenPaw/pull/6688) — Open since 2026-08-04. First-time contributor, under review; fixes a real App Center plugin install failure.
- [feat(ci): gate main mergeability on tests (#6764)](https://github.com/agentscope-ai/QwenPaw/pull/6764) — Open since 2026-08-06. Important for preventing red-test merges.
- [feat: integrate AnySearch web search (#6817)](https://github.com/agentscope-ai/QwenPaw/pull/6817) — Open since 2026-08-08. Notable product change, needs maintainer review.
- [\[Feature\]: Auto-refresh session title after auto-memory update (#6881)](https://github.com/agentscope-ai/QwenPaw/issues/6881) — Open since 2026-08-10 with limited engagement.
- [\[Bug\]: 日记页面中子文件夹内的笔记被错误分组 (#6883)](https://github.com/agentscope-ai/QwenPaw/issues/6883) — Open, low maintainer response so far.
- [\[Feature\]: 公式渲染问题；会话分组管理；活动会话背景 (#6893)](https://github.com/agentscope-ai/QwenPaw/issues/6893) — Open, only 1 comment; likely needs triage.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-11

## Today's Overview

ZeroClaw saw high activity on 2026-08-11: 19 issues were updated (18 open/active, 1 closed) and 50 PRs were updated (46 open, 4 merged/closed). No new releases were published. The day’s work centered on SOP reliability and diagnostics, Matrix and WhatsApp channel parity, skill-injection defaults, and a large tail of long-running feature PRs. The wide gap between open PRs and merged PRs suggests strong contributor momentum but also a possible maintainer-review bottleneck. Overall, the project is actively evolving, with community-reported regressions being fixed quickly in several cases.

## Releases

No new releases were published on 2026-08-11. There are no release notes, breaking-change summaries, or migration instructions to report.

## Project Progress

Four PRs were merged or closed in the last 24 hours. The snapshot highlights two:

- [PR #9897 — fix(cli): stop telling operators to reload with a signal that kills the daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/9897)  
  A dangerous operational warning was corrected: the daemon does not register `SIGUSR1`, so the previous guidance could terminate the process.

- [PR #9893 — feat(whatsapp-web): implement add_reaction and remove_reaction (rebase of #7535)](https://github.com/zeroclaw-labs/zeroclaw/pull/9893)  
  Closed in favor of the parallel rebase [PR #9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894), which remains open. This work closes the WhatsApp reaction parity gap with Telegram/Discord/Matrix.

Also notable: [Issue #9874 — RFC: Rewrite ZeroClaw in Python and retire the Rust codebase](https://github.com/zeroclaw-labs/zeroclaw/issues/9874) was closed after 3 comments. The issue voiced frustration with the size of the Rust codebase, but the closure indicates the RFC did not move forward.

## Community Hot Topics

The most active issue by comments is:

- [Issue #6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)  
  11 comments. This long-running RFC asks for a clear boundary between durable memory storage and lifecycle decisions like consolidation/governance. Underlying need: gateway and channel implementations should not reimplement memory policy per backend.

Other actively discussed issues:

- [Issue #8600 — Feature: easy per-chat model switching for multi-model providers](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)  
  4 comments, 1 👍. Users want provider- and model-switching to be as simple as it is in other assistants like Moltis.

- [Issue #9779 — [sop] sops_dir: documented default is not honoured by the daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)  
  4 comments. Operators are hitting silent SOP loading failures when relying on documented defaults.

- [Issue #9874 — RFC: Rewrite ZeroClaw in Python](https://github.com/zeroclaw-labs/zeroclaw/issues/9874)  
  3 comments. Closed, but reflects real dissatisfaction with codebase complexity.

On the PR side, comment counts were not shown in the snapshot, but the largest and most watched PRs by label and scope include:

- [PR #8713 — fix(tools): add allowed_private_hosts opt-in to file_download SSRF gate](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)
- [PR #8486 — feat(gateway): add OpenAI chat completions endpoint](https://github.com/zeroclaw-labs/zeroclaw/pull/8486)
- [PR #8754 — feat(config)!: schema V4 cut of skills, inert tunable, and summary_model cruft](https://github.com/zeroclaw-labs/zeroclaw/pull/8754)

## Bugs & Stability

Bug reports updated or created on 2026-08-11, ranked by severity:

- **S1 — Workflow blocked:** [Issue #9901 — unknown SOP step bullets silently treated as prose](https://github.com/zeroclaw-labs/zeroclaw/issues/9901)  
  Unterminated or unknown SOP bullets are silently discarded, and `zeroclaw sop validate` still reports success. No dedicated fix PR appears in the current snapshot.

- **S2 — Skill-injection regression:** [Issue #9912 — Restore full skill injection default through v0.8.x](https://github.com/zeroclaw-labs/zeroclaw/issues/9912)  
  The default changed to `compact`, degrading ordinary skill prompting. Fix: [PR #9913](https://github.com/zeroclaw-labs/zeroclaw/pull/9913) is open.

- **S2 — Matrix group replies dropped:** [Issue #9909 — Matrix mention_only drops group replies without @-mention](https://github.com/zeroclaw-labs/zeroclaw/issues/9909)  
  Direct replies to bot messages are filtered out before `m.in_reply_to` is considered. Fix: [PR #9911](https://github.com/zeroclaw-labs/zeroclaw/pull/9911) is open.

- **S2 — Skill description truncation:** [Issue #9908 — SkillDocument truncates multi-paragraph block-scalar descriptions](https://github.com/zeroclaw-labs/zeroclaw/issues/9908)  
  YAML block-scalars are cut at the first blank line. No fix PR in the current snapshot.

- **S2 — Discord transcription misconfiguration:** [Issue #9905 — Discord audio transcription manager is never bound to the active agent provider](https://github.com/zeroclaw-labs/zeroclaw/issues/9905)  
  Transcription manager is constructed but not wired to the active provider. No fix PR in the snapshot.

- **S2 — Misleading memory status:** [Issue #9896 — status/startup banner can report `Memory: none` when effective backend is sqlite](https://github.com/zeroclaw-labs/zeroclaw/issues/9896)  
  Cosmetic but confusing runtime status. No fix PR in the snapshot.

- **Security CI failure:** [Issue #9899 — triage and remove bitmaps unmaintained advisory waiver (RUSTSEC-2026-0247)](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)  
  `cargo deny check` is failing because `bitmaps 3.2.1` is pulled in via Matrix SDK dev-dependencies. Still a tracker/open issue.

- **Unbounded WebP decode:** [Issue #9883 — Inbound WebP conversion decodes unbounded before the shared image validator runs](https://github.com/zeroclaw-labs/zeroclaw/issues/9883)  
  The fix is likely related to [PR #9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819), which remains open.

Other active bug threads updated today include [Issue #9779 – silent SOP `sops_dir` default failure](https://github.com/zeroclaw-labs/zeroclaw/issues/9779), [Issue #9786 – malformed SOP.toml silently dropped](https://github.com/zeroclaw-labs/zeroclaw/issues/9786), [Issue #9768 – dangerous SIGUSR1 reload guidance](https://github.com/zeroclaw-labs/zeroclaw/issues/9768), and [Issue #9771 – gateway clippy failure](https://github.com/zeroclaw-labs/zeroclaw/issues/9771).

## Feature Requests & Roadmap Signals

Strong roadmap signals from accepted/no-stale issues and active PRs:

- [Issue #8600 — Easy per-chat model switching](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)  
  Accepted and marked `no-stale`. Users want to switch between any model supported by a provider without manual config changes. This is likely to influence the next minor release.

- [Issue #7518 — WhatsApp reaction support for `ack_reactions`](https://github.com/zeroclaw-labs/zeroclaw/issues/7518)  
  Accepted channel-parity request. Implementations are already in [PR #9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894), so this could land soon.

- [Issue #9895 — Provider-grouped, paginated Telegram `/model` picker](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)  
  New feature request for mobile-friendly model selection. No PR yet, but it builds directly on #8600.

- [Issue #9906 — Decompose the config schema into domain modules](https://github.com/zeroclaw-labs/zeroclaw/issues/9906)  
  Technical-debt reduction: `schema.rs` is ~38,700 lines. No behavior change intended, but it signals maintainability work ahead.

- [Issue #6850 — Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)  
  Still an open RFC with high risk; it would shape future architecture but is not yet implemented.

Next-version prediction: v0.8.x patch releases will likely include the skill-injection default fix ([PR #9913](https://github.com/zeroclaw-labs/zeroclaw/pull/9913)) and the SIGUSR1 warning fixes ([PR #9897](https://github.com/zeroclaw-labs/zeroclaw/pull/9897) / [PR #9879](https://github.com/zeroclaw-labs/zeroclaw/pull/9879)). The next minor release could include WhatsApp reactions and Matrix mention-only fixes if current PRs merge cleanly.

## User Feedback Summary

Real user pain points visible in this snapshot:

- **Model switching is too cumbersome.** A user migrating from Moltis specifically asked for easier per-chat provider/model switching ([#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)).
- **Silent SOP failures damage trust.** Multiple issues report SOPs or SOP defaults failing without logs, errors, or validation warnings ([#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779), [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786), [#9901](https://github.com/zeroclaw-labs/zeroclaw/issues/9901)).
- **Channel parity matters.** Users expect the same acknowledgment/reaction behavior across WhatsApp, Telegram, Discord, and Matrix ([#7518](https://github.com/zeroclaw-labs/zeroclaw/issues/7518), [#9909](https://github.com/zeroclaw-labs/zeroclaw/issues/9909)).
- **Mobile UX on Telegram is still rough.** Text-based model commands are considered cumbersome; users want an inline picker ([#9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)).
- **Some users feel the Rust codebase is over-engineered.** The closed Python rewrite RFC ([#9874](https://github.com/zeroclaw-labs/zeroclaw/issues/9874)) cited 776k lines of Rust as evidence of complexity.

## Backlog Watch

Long-running items that may need maintainer attention:

- [Issue #6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)  
  Open since May 22 with 11 comments and no resolution. High-risk architectural decision.

- [PR #8713 — SSRF gate for file_download](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)  
  Open since July 4, marked `needs-author-action` and `risk:high`. Security-relevant fix.

- [PR #8486 — OpenAI chat completions endpoint](https://github.com/zeroclaw-labs/zeroclaw/pull/8486)  
  Open since June 29, `size:XL`, `needs-author-action`. Would significantly improve gateway interoperability.

- [PR #8443 — Matrix single-message progress drafts](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)  
  Open since June 28, `size:XL`, `needs-author-action`. Large channel UX feature.

- [PR #8754 — Schema V4 breaking cut](https://github.com/zeroclaw-labs/zeroclaw/pull/8754)  
  Open since July 6, `size:XL`, `needs-author-action`. Likely to be a major breaking-change release candidate.

- [PR #9314 — Telegram long-poll offset reliability fix](https://github.com/zeroclaw-labs/zeroclaw/pull/9314)  
  Open since July 23, priority P1, `needs-author-action`. This fixes a potential silent message-loss bug and deserves review priority.

</details>