# OpenClaw Ecosystem Digest 2026-08-13

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-13 02:02 UTC

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

# OpenClaw Project Digest — 2026-08-13

## 1. Today's Overview

OpenClaw remains very active, with **500 issues updated** in the last 24 hours (406 open/active, 94 closed) and **500 PRs updated** (357 open, 143 merged/closed). No new release was published in this window. The activity is heavily weighted toward reliability bugs: silent subagent completion loss, channel delivery failures, auth/rate-limit timeouts, and memory/session-state inconsistency. Maintainers are clearly responding — there are 143 merged/closed PRs and 94 closed issues — but many high-severity issues remain open and continue to accumulate comments. Overall project health is mixed: high contribution momentum and maintainer responsiveness, but with a persistent long-tail of message-delivery and multi-agent orchestration failures.

## 2. Releases

**None.**  
There were no new releases published for `openclaw/openclaw` on 2026-08-13, so there are no release notes, breaking changes, or migration steps to report.

## 3. Project Progress

**143 PRs moved to merged/closed and 94 issues were closed in the last 24 hours.** Notable closed/merged PRs in the sampled top-30 include:

- [PR #122624 — fix(slack): prevent duplicate Socket Mode connections after reconnect errors](https://github.com/openclaw/openclaw/pull/122624)  
  Addresses silent message loss caused by multiple live Slack Socket Mode connections.

- [PR #122888 — fix(e2e): restore gateway network qualification](https://github.com/openclaw/openclaw/pull/122888)  
  Fixes E2E harness expectations after prepared gateway suspension.

- [PR #79405 — fix: harden subagent completion fallback delivery](https://github.com/openclaw/openclaw/pull/79405)  
  Closes gaps in subagent completion delivery fallback paths.

**Notable issue closures indicating shipped fixes:**

- [#57901 — Safeguard compaction ignores `compaction.model`](https://github.com/openclaw/openclaw/issues/57901)  
- [#42820 — Feishu file send blocked by poll schema/guard](https://github.com/openclaw/openclaw/issues/42820)  
- [#57256 — `openclaw status` falsely reports mem0 unavailable](https://github.com/openclaw/openclaw/issues/57256)  
- [#65538 — Screen readers announce every streaming token](https://github.com/openclaw/openclaw/issues/65538)  
- [#45031 — Built-in security scanning for skill installation](https://github.com/openclaw/openclaw/issues/45031)  
- [#33413 — Slack tool-level progress in thread status](https://github.com/openclaw/openclaw/issues/33413)  
- [#8299 — Config option to suppress sub-agent announce](https://github.com/openclaw/openclaw/issues/8299)  

**In-review PRs that would advance reliability/features if merged:**

- [PR #122878 — fix(discord): unblock ingress after retry exhaustion](https://github.com/openclaw/openclaw/pull/122878)  
- [PR #122650 — fix(reasoning-tags): strip `<internal>` reflection blocks from visible replies](https://github.com/openclaw/openclaw/pull/122650)  
- [PR #121283 — fix: prompt caching breaks on Claude Opus 5 and Sonnet 5](https://github.com/openclaw/openclaw/pull/121283)  
- [PR #118750 — fix(memory-core): make dreaming timestamp comparators NaN-safe](https://github.com/openclaw/openclaw/pull/118750)  
- [PR #118681 — fix(agents): bounded memory flush before recovery compaction](https://github.com/openclaw/openclaw/pull/118681)  
- [PR #116253 — fix(embedded-runner): flush partial streaming output before run budget abort](https://github.com/openclaw/openclaw/pull/116253)  

## 4. Community Hot Topics

- [#121058 — Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058) — **91 comments**  
  The highest-activity issue. Users report silent reply failures continue even after a prior fix was closed, with no queued reply payload left behind. Underlying need: durable, observable delivery for agent replies.

- [#7707 — Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — **45 comments**  
  Long-running feature discussion about preventing memory poisoning by tagging trust based on memory origin. Needs product and security decision.

- [#44925 — Subagent completion silently lost — no retry, no notification, no auto-restart](https://github.com/openclaw/openclaw/issues/44925) — **26 comments, 2👍**  
  P1 message-loss issue. Users want subagent completions to be retried or surfaced instead of silently dropped.

- [#77598 — Track live dev agent behavior and trajectory](https://github.com/openclaw/openclaw/issues/77598) — **23 comments**  
  Maintainer observational issue; community is watching agent behavior in production rather than steering it.

- [#57901 — Safeguard compaction ignores `compaction.model`](https://github.com/openclaw/openclaw/issues/57901) — **15 comments**  
  Closed, but highly discussed before landing.

- [#39604 — Add `tools.web.fetch.allowPrivateNetwork`](https://github.com/openclaw/openclaw/issues/39604) — **14 comments, 12👍**  
  Closed already-fixed. Strong demand from self-hosted/enterprise users for opt-in private-network web fetching.

- [#43367 — Multi-agent orchestration is unstable](https://github.com/openclaw/openclaw/issues/43367) — **14 comments, 1👍**  
  Reports of concurrent `agents add` config overwrites, session-lock failures, and detached child work.

**Underlying needs:** reliable asynchronous message delivery, memory/security provenance, multi-agent isolation, and better visibility into why messages or subagent results are lost.

## 5. Bugs & Stability

### High severity — P1 / message loss / session state

- [#121058 — Silent reply failures still recurring](https://github.com/openclaw/openclaw/issues/121058)  
  No new fix PR was visible in the sample; issue remains open.

- [#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)  
  No retry, no notification, no auto-restart.

- [#67777 — Subagent completion delivery lost on timeout, drain, or orphan prune](https://github.com/openclaw/openclaw/issues/67777)  
  Related to direct-announce failure paths.

- [#92433 — Subagent completion silently dropped when announce steers into a requester run that ends before processing it](https://github.com/openclaw/openclaw/issues/92433)  
  Still open; fix requires careful lifecycle handling.

- [#97983 — iOS/WebChat messages append but do not trigger/deliver assistant replies](https://github.com/openclaw/openclaw/issues/97983)  
  P1, reproducibility available; impacts mobile/web users.

- [#111498 — Main agent blocked by persistent workspace-state migration after Anthropic auth recovery](https://github.com/openclaw/openclaw/issues/111498)  
  macOS regression; TUI and CLI probe stall.

- [#89278 — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout](https://github.com/openclaw/openclaw/issues/89278)  
  P1 regression with 2👍.

- [#72015 — Active-memory blocks replies and QMD boot initialization can overload multi-agent gateways](https://github.com/openclaw/openclaw/issues/72015)  
  P1 reliability issue on multi-agent gateways.

- [#54488 — Session lane starvation: followup drain monopolizes session lane](https://github.com/openclaw/openclaw/issues/54488)  
  Inbound dispatch blocked for 20–30 minutes.

- [#43374 — All LLM API calls time out simultaneously under multi-agent concurrency](https://github.com/openclaw/openclaw/issues/43374)  
  Not a provider issue; internal bottleneck suspected.

- [#44502 — Discord routing / mention-gating regression](https://github.com/openclaw/openclaw/issues/44502)  
  P1; preflight logic too permissive in some agent-routing cases.

- [#97616 — Leaked unreaped hook/tool child processes causing zombie accumulation](https://github.com/openclaw/openclaw/issues/97616)  
  P1 regression; runtime degradation over time.

### Medium severity

- [#43747 — Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) — P2 regression, inconsistent memory behavior across installs.  
- [#115001 — Hybrid memory search returns spurious 1.0 similarity scores via FTS LIKE-fallback](https://github.com/openclaw/openclaw/issues/115001) — P2.  
- [#107814 — `gpt-5.3-codex-spark` emits empty arguments for required tool calls](https://github.com/openclaw/openclaw/issues/107814) — P2.  
- [#114154 — bundle-mcp passes policy/probe but agent sessions never bundle the tool](https://github.com/openclaw/openclaw/issues/114154) — P2.  
- [#77733 — Bare `/new` and `/reset` no longer trigger persona greeting](https://github.com/openclaw/openclaw/issues/77733) — P2 regression.

### Fix PRs in flight

- [PR #122624](https://github.com/openclaw/openclaw/pull/122624) fixes Slack duplicate Socket Mode connections.
- [PR #122878](https://github.com/openclaw/openclaw/pull/122878) fixes Discord ingress blocked after retry exhaustion.
- [PR #122650](https://github.com/openclaw/openclaw/pull/122650) prevents `<internal>` reasoning blocks from leaking into visible replies.
- [PR #121283](https://github.com/openclaw/openclaw/pull/121283) fixes prompt-cache invalidation on Claude Opus 5/Sonnet 5.
- [PR #118750](https://github.com/openclaw/openclaw/pull/118750) makes memory-core timestamp comparators NaN-safe.
- [PR #118681](https://github.com/openclaw/openclaw/pull/118681) adds bounded memory flush before recovery compaction.
- [PR #116253](https://github.com/openclaw/openclaw/pull/116253) preserves partial streaming output on budget abort.

## 6. Feature Requests & Roadmap Signals

### Security and trust

- [#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — likely to need product/security review before any implementation.
- [#45031 — Built-in security scanning for skill installation](https://github.com/openclaw/openclaw/issues/45031) — closed already-fixed, indicating this area is on the roadmap.

### Configuration and UX

- [#45758 — YAML as alternative config format](https://github.com/openclaw/openclaw/issues/45758)  
- [#45501 — `session.resetPrompt` configurable startup message](https://github.com/openclaw/openclaw/issues/45501)  
- [#51028 — Sessions panel sort by last meaningful activity](https://github.com/openclaw/openclaw/issues/51028)  
- [#42276 — Reasoning stream with overwrite/status line behavior](https://github.com/openclaw/openclaw/issues/42276)  
- [#50199 — Skill priority configuration](https://github.com/openclaw/openclaw/issues/50199)

### Platform / integration

- [#45508 — Self-hosted STT/TTS in webchat](https://github.com/openclaw/openclaw/issues/45508)  
- [#9016 — Expose OpenRouter usage cost to agent runtime](https://github.com/openclaw/openclaw/issues/9016)  
- [#16555 — TTL/expiry for delivery queue messages](https://github.com/openclaw/openclaw/issues/16555)  
- [#46058 — Chat-first Android surface](https://github.com/openclaw/openclaw/issues/46058)

### Likely next-version candidates based on current review queue

- [PR #122425 — slash skills inside normal messages](https://github.com/openclaw/openclaw/pull/122425)  
- [PR #122344 — profile-aware model picker](https://github.com/openclaw/openclaw/pull/122344)  
- [PR #122923 — show useful environment facts in the picker](https://github.com/openclaw/openclaw/pull/122923)  
- [PR #122123 — Wear Agent Pulse](https://github.com/openclaw/openclaw/pull/122123)  
- [PR #120486 — Discord progress draft with tool command/args in raw mode](https://github.com/openclaw/openclaw/pull/120486)

## 7. User Feedback Summary

**Top pain point is silent loss.** Users repeatedly describe subagent and reply completions disappearing without retry, notification, or auto-restart. This appears across Telegram, subagent orchestration, and iOS/WebChat channels.

**Memory behavior is inconsistent.** Users report that memory chunking/embedding behavior differs drastically between installations and teammates, making shared multi-user setups confusing.

**Cost and latency are growing concerns.** Reports include ignored `cacheRetention` for LiteLLM-proxied Anthropic models, prompt-cache prefix churn on OpenAI models, and synchronous 10–15s auth stages blocking embedded runs.

**Multi-agent orchestration is a serious pain point.** Users trying parallel coding batches report config overwrites, session-lock failures, lane starvation, and total LLM timeout cascades.

**Positive signals:** high-consensus requests are getting fixed. The private-network `web_fetch` request closed with 12👍, the Codex OAuth issue has 6👍, and several accessibility/security requests closed with `already-fixed`. This suggests maintainers are paying attention to strongly supported, well-scoped requests.

## 8. Backlog Watch

The following issues and PRs have been open for a long time and appear to need maintainer attention:

### Issues

- [#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — open since Feb 3, 45 comments, needs product/security review.  
- [#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925) — open since Mar 13, P1, 26 comments.  
- [#43367 — Multi-agent orchestration unstable](https://github.com/openclaw/openclaw/issues/43367) — open since Mar 11, P1, 14 comments, linked PR open.  
- [#44431 — Browser tool: 7 improvements from field test](https://github.com/openclaw/openclaw/issues/44431) — open since Mar 12, needs maintainer/product decision.  
- [#43747 — Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) — open since Mar 12, regression, needs info.  
- [#67777 — Subagent completion delivery lost on timeout/drain/orphan](https://github.com/openclaw/openclaw/issues/67777) — open since Apr 16, P1.  
- [#72015 — Active-memory blocks replies / QMD boot overload](https://github.com/openclaw/openclaw/issues/72015) — open since Apr 26, P1.  
- [#92433 — Subagent completion dropped on steer into ending run](https://github.com/openclaw/openclaw/issues/92433) — open since Jun 12, P1.  
- [#97983 — iOS/WebChat messages don't trigger assistant replies](https://github.com/openclaw/openclaw/issues/97983) — open since Jun 30, P1.  
- [#111498 — Main agent blocked by workspace-state migration](https://github.com/openclaw/openclaw/issues/111498) — open since Jul 19, P1.  
- [#115001 — Hybrid memory search returns spurious 1.0 similarity scores](https://github.com/openclaw/openclaw/issues/115001) — open since Jul 28, linked PR open.

### PRs waiting on author or maintainer look

- [PR #51762 — honor configured default agent in storage scans](https://github.com/openclaw/openclaw/pull/51762) — open since Mar 21, waiting on author.  
- [PR #97175 — keep background maintenance from blocking new messages](https://github.com/openclaw/openclaw/pull/97175) — open since Jun 27, needs proof.  
- [PR #110796 — page SQLite transcript visits for `sessions.files.list`](https://github.com/openclaw/openclaw/pull/110796) — open since Jul 18, waiting on author.  
- [PR #121283 — prompt caching breaks on Claude Opus 5 / Sonnet 5](https://github.com/openclaw/openclaw/pull/121283) — ready for maintainer look.  
- [PR #116253 — flush partial streaming output before budget abort](https://github.com/openclaw/openclaw/pull/116253) — ready for maintainer look.  

---

**Digest summary:** OpenClaw is shipping fixes at a fast pace, but the project remains in a reliability-focused phase. The clearest signals from the community are: make message and subagent delivery durable, make memory behavior predictable and secure, and reduce auth/cache overhead in multi-agent deployments.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open Source Ecosystem
**Coverage: 2026-08-13 community digests**

---

## 1. Ecosystem Overview

The open-source personal AI assistant space remains hyper-competitive and reliability-constrained. A clear center of gravity exists around OpenClaw and its "Claw" derivatives (NanoClaw, PicoClaw, ZeroClaw, ZeptoClaw), while independent projects (Hermes Agent, IronClaw, CoPaw, NanoBot, LobsterAI) compete on extensibility, cloud integration, desktop UX, and security. Across every active project, the dominant second-generation problems are silent message/subagent loss, memory inconsistency, multi-agent instability, and Windows/desktop reliability gaps. Security hardening is shifting from optional to default — tool-execution boundaries, credential-safe fetching, and plugin permission models are being shipped as fixes, not features. The ecosystem overall is past the "can it talk to a model?" phase and into "can it be trusted to operate channels, memory, and subagents unattended?"

---

## 2. Activity Comparison

*Issues/PRs reflect 24-hour update counts (with closed/merged subsets where reported). Health score: composite of throughput, merge/close rate, release cadence, open P1/security load, and backlog risk; 1 = dormant, 10 = excellent.*

| Project | Issues (24h) | PRs (24h) | Release Status | Health |
|---|---|---|---|---|
| **OpenClaw** | 500 updated (94 closed; 406 open) | 500 updated (143 merged/closed) | None | 6/10 |
| **ZeroClaw** | 50 updated (5 closed) | 50 updated (20 merged/closed) | None | 7/10 |
| **Hermes Agent** | 50 updated (11 closed) | 50 updated (16 merged/closed) | None | 7/10 |
| **IronClaw** | 41 updated | 50 updated (19 merged/closed) | v1.2.0-rc.2 + rc.3 | 8/10 |
| **CoPaw (QwenPaw)** | 30 updated (7 closed) | 44 updated (16 merged/closed) | v2.1.0-beta.4 | 5/10 |
| **NanoBot** | 8 updated (4 closed) | 36 updated (17 merged/closed) | None | 8/10 |
| **NanoClaw** | 4 open (0 closed) | 10 updated (1 merged/closed) | None | 5/10 |
| **LobsterAI** | 6 updated (0 closed) | 8 updated (7 merged/closed) | None | 7/10 |
| **PicoClaw** | 2 updated (0 resolved) | 3 updated (0 merged) | None | 4/10 |
| **NullClaw / Moltis / ZeptoClaw** | No activity | No activity | None | 2/10 |

**Interpretation:** OpenClaw's raw volume is an order of magnitude above every peer, but its open-issue load (406) and recurring P1 delivery bugs cap its health score. IronClaw and NanoBot show the best balance of throughput, close rate, and release cadence. CoPaw's reverted fix and Windows crash cluster pull its score down despite high merge volume. PicoClaw's stale high-severity bugs and zero merge activity make it the healthiest candidate for concern.

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Reference-implementation gravity:** The ecosystem explicitly positions OpenClaw as the core reference, and the "Claw" naming lineage (NanoClaw, PicoClaw, ZeroClaw, ZeptoClaw) is a visible moat — derivatives borrow its architecture and vocabulary.
- **Community size:** 500 issues + 500 PRs touched daily vs. 2–50 for every peer. OpenClaw's issue tracker functions as the ecosystem's early-warning radar; what breaks there first often becomes a peer's roadmap item.
- **Channel breadth:** Slack, Discord, Telegram, Feishu, Matrix, iOS/WebChat — broader delivery-surface coverage than any competitor, with channel-specific fixes (Socket Mode duplicates, Discord ingress, Feishu file guards) landing in the same window as reports.
- **Fix throughput:** 143 merged/closed PRs and 94 closed issues in 24h is unmatched absolute responsiveness.

**Technical approach differences**
- OpenClaw optimizes for **orchestration**: subagent lifecycle management, delivery-queue fallback paths, memory compaction/safeguards, and multi-agent gateway scheduling. Peers optimize for different axes — NanoBot for security hardening, Hermes for plugin extensibility, IronClaw for a cloud product experience.
- Its architecture carries more moving parts, which is both the strength (universal automation) and the weakness (406 open issues, recurring silent-loss cases like #121058 resurfacing after #116277 was closed).

**Community size comparison**
- OpenClaw: ~10–100× peer activity. IronClaw, ZeroClaw, and Hermes are the only projects in the same conversational tier, and each remains ~10× smaller in absolute volume.

---

## 4. Shared Technical Focus Areas

Across six or more projects, the same requirements are emerging independently:

**1. Durable, observable async delivery** — OpenClaw (#121058, #44925), NanoClaw (#3086 WhatsApp, #2689 Signal, #2346 slash commands), IronClaw (Telegram cluster #7540/#7543), ZeroClaw (#9340 cron output lost, #9956 WeChat cursor race), Hermes (#83683/#84185 desktop gateway silent-offline), CoPaw (#6921 agent stops mid-task).
*Need: retries, delivery receipts, no silently dropped work.*

**2. Memory / session-state consistency** — OpenClaw (#43747 "memory in chaos", #115001 spurious similarity scores), CoPaw (#6853 prompts lie about MEMORY.md, #6951 compression hides history, #6926 orphaned history rows), IronClaw (#7484 context eviction of user task), NanoBot (p0 stale-session overwrite PR #5271).
*Need: predictable memory behavior, migration safety, transcript integrity.*

**3. Multi-agent orchestration reliability** — OpenClaw (#43367, #54488 lane starvation), CoPaw (#6927 dead loops, #6918 shadow sessions), Hermes (gateway/plugin lifecycle), NanoBot (subagent transcript persistence #5291).
*Need: isolation, lane fairness, durable subagent completion.*

**4. Security at the tool/plugin boundary** — NanoBot (ExecTool path guards, credential-safe Jina fetching, Docker privilege drop), ZeroClaw (browser screenshot path traversal, release attestation, WASM deadlines), OpenClaw (memory trust tagging #7707, skill-install scanning), CoPaw (plugin cron/injection guardrails #6916).
*Need: capability boundaries, provenance, least privilege.*

**5. Windows / desktop platform maturity** — Hermes (two open Windows P1s), CoPaw (crashes, idle freeze), ZeroClaw (#9290 installer failure, #7462 74 test failures), LobsterAI (Windows plugin install fixes), IronClaw (Windows atomic-rename RC fixes).
*Need: Windows CI, update-path hygiene, installer reliability.*

**6. Token cost & provider compatibility** — Hermes (#6839 lazy tool schemas, 18👍), IronClaw (#7485 token-estimator double-count), OpenClaw (prompt-cache invalidation on Claude Opus 5/Sonnet 5), NanoBot (Gemini/DeepSeek signature fixes), ZeroClaw (Hailo-Ollama local inference).
*Need: cache-friendly prompts, dynamic schema injection, per-provider quirk handling.*

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target Users | Architecture |
|---|---|---|---|
| **OpenClaw** | Universal channel agent, subagent orchestration, memory | Self-hosters, power users, teams | Orchestration-heavy gateway; delivery queues, subagents, memory compaction |
| **NanoBot** | Security-hardened lightweight agent, broad provider support | Security-conscious self-hosters, Docker users | Lean core; hardened `ExecTool` workspace, hooks auto-discovery |
| **Hermes Agent** | Plugin interface expansion (hooks, event bus, lifecycle) | Developers, plugin authors, local-model users | Plugin-first extensibility; Electron desktop + TUI |
| **PicoClaw** | Lightweight channel agent (Sipeed ecosystem) | Edge/embedded enthusiasts | Small footprint; modular MCP/web-search additions |
| **NanoClaw** | Template/plugin-driven rapid onboarding | Fast-deploy individuals/SMBs | Agent Plugins 1.0.0 templates; wizard; channel skill plugins |
| **IronClaw** | Cloud productized agent (near.ai), channel-first OOBE, design system | Cloud users, NEAR/Web3 ecosystem | Capability contracts, release-candidate discipline, cloud gateway |
| **LobsterAI** | Chinese-market desktop client, Feishu, skills manager | Chinese enterprise/desktop users | Electron desktop; model-provider onboarding UX |
| **CoPaw (QwenPaw)** | Qwen-centric desktop agent, Inbox, computer-use | Windows-heavy, Chinese-speaking users | Tauri desktop; beta-churn cadence; agent collaboration |
| **ZeroClaw** | Rust-based robust agent, ZeroCode TUI, SOP automation | Ops/dev users, security-minded | Rust core; plugin-owned domains; release attestation |
| **NullClaw / Moltis / ZeptoClaw** | — | — | Dormant |

---

## 6. Community Momentum & Maturity

**Tier 1 — Sustained high velocity, reliability phase:**
- **OpenClaw** (massive, but open-issue-heavy), **ZeroClaw** (security/stability focus, 20 merges/day), **Hermes Agent** (plugin campaign landing daily, Windows P1s pending).

**Tier 2 — Active release/triage cycles:**
- **IronClaw** — fastest release cadence (two RCs back-to-back) and an organized Telegram QA bug-bash; maturing toward production.
- **NanoBot** — small but highly responsive; high close rate (17/36 PRs); stabilizing after a security-fix sprint.
- **LobsterAI** — steady polish with the cleanest close rate (7/8 PRs); older stale issues remain.
- **CoPaw** — high raw velocity but beta-phase churn; a reverted chat fix and open Windows crash cluster signal instability.

**Tier 3 — Low throughput / at risk:**
- **NanoClaw** — infrastructure work (Agent Plugins 1.0.0) but stacked PRs are blocked; migration bugs unaddressed.
- **PicoClaw** — zero merges; two high-severity bugs marked `[stale]` with no fix PRs. Most likely to lose contributor trust.

**Tier 4 — Dormant:**
- **NullClaw, Moltis, ZeptoClaw** — no activity in the window; effectively shelved.

**Rapidly iterating:** OpenClaw, ZeroClaw, IronClaw, Hermes, CoPaw.
**Stabilizing:** NanoBot, LobsterAI.
**At risk:** PicoClaw (stale bugs), CoPaw (reverted fix, Windows instability), NanoClaw (blocked stacked PRs).

---

## 7. Trend Signals

**Reliability is the new feature race.** The most consistent community complaint across 6+ projects is "silent success" — work accepted but never delivered or processed (subagent completions, cron output, WhatsApp/Signal messages, desktop gateway restarts). **Value for developers:** instrument async delivery with retries, receipts, and visible failure states; treat silent drops as P0.

**Per-call token efficiency is a purchase decision.** Hermes' lazy tool-schema proposal (18👍, 39 comments), OpenClaw's prompt-cache invalidation, and IronClaw's token-estimator correction all point to cost-per-call as a top adoption blocker — especially for local/self-hosted models. **Value:** two-pass/dynamic tool injection and cache-friendly prompt construction are becoming table stakes.

**Security is moving into the tool/plugin boundary.** Path traversal in browser screenshots, credentials leaking via URL forwarding to third-party readers, WASM deadline escapes, and plugins silently creating cron jobs — the market is converging on capability-based permissions and provenance tracking. **Value:** build least-privilege tool execution and plugin permission manifests now.

**Multi-agent orchestration is the hard unsolved problem.** Lane starvation, shadow sessions, dead loops, and lost subagent completions appear across OpenClaw, CoPaw, Hermes, and NanoBot. **Value:** a durable, observable subagent delivery protocol is a genuine gap in the ecosystem.

**Windows desktop is the industry's weak flank.** Every project shipping a desktop client (Hermes, CoPaw, ZeroClaw, LobsterAI, IronClaw) reports Windows-specific P1s in this single 24h window. **Value:** Windows CI coverage and update-path testing are high-ROI investments that most projects are missing.

**Plugin/skill formats are consolidating.** Hermes' hook taxonomy, NanoClaw's Agent Plugins 1.0.0, OpenClaw's skill-scanning/priority work, and NanoBot's hook auto-discovery signal an emerging standard for portable, secure agent extensions. **Value:** early adoption of a clean plugin ABI is a competitive moat.

**Local/edge inference demand is visible and growing.** Hailo-Ollama support (ZeroClaw), OpenClaw's private-network fetch (12👍) and self-hosted STT/TTS, Hermes' native Ollama tags, and QwenCloud provider proposals all confirm a meaningful segment prioritizing on-prem/edge operation over cloud convenience.

---

*Sources: Project community digests for 2026-08-13 covering OpenClaw, NanoBot, Hermes Agent, PicoClaw, NanoClaw, NullClaw, IronClaw, LobsterAI, Moltis, CoPaw (QwenPaw), ZeptoClaw, and ZeroClaw.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-13

## 1. Today's Overview

NanoBot saw high activity over the last 24 hours: 8 issues were updated (4 open, 4 closed) and 36 PRs were touched, with 17 merged or closed. The most notable momentum was in security and stability fixes, including hardened `ExecTool` path handling, credential-safe remote fetching, Docker privilege-drop corrections, and session-data integrity protections. No new releases were published. The project remains responsive and maintainer-heavy, with several p1/p2 fixes landed and newer feature PRs continuing to arrive.

## 2. Releases

No new releases for 2026-08-13.

## 3. Project Progress

Merged/closed PRs from the last 24h show a broad mix of bug fixes, security hardening, and platform support:

- **Security: ExecTool workspace-boundary hardening** — [PR #5329](https://github.com/HKUDS/nanobot/pull/5329) fixes bare `~`, `~user`, redirects, and tilde command words that could bypass workspace restrictions. Also [PR #5218](https://github.com/HKUDS/nanobot/pull/5218) improves path extraction around redirection and grouping delimiters.
- **Security: Remote Jina reader no longer receives credential-bearing URLs** — [PR #5258](https://github.com/HKUDS/nanobot/pull/5258) sends userinfo/token-style URLs through the local readability path and checks redirect chains before forwarding.
- **Docker: Capability restoration for privilege drop** — [PR #5320](https://github.com/HKUDS/nanobot/pull/5320) keeps `cap_drop: ALL` while restoring three bootstrap capabilities and enables `no-new-privileges`.
- **Provider: Gemini imported tool-call signature fallback** — [PR #5230](https://github.com/HKUDS/nanobot/pull/5230) preserves native Gemini signatures and fixes replayed function calls from providers without signature support.
- **Provider: DeepSeek V4 Pro Responses support** — [PR #5362](https://github.com/HKUDS/nanobot/pull/5362) routes `deepseek-v4-pro` through the native Responses API and keeps explicit `reasoning.effort: "none"`.
- **Session storage moved outside agent workspace** — [PR #5279](https://github.com/HKUDS/nanobot/pull/5279) closes the session-history reachability problem by storing transcripts under `<config-dir>/sessions/`.
- **Hooks auto-discovery** — [PR #4878](https://github.com/HKUDS/nanobot/pull/4878) adds `pkgutil` scanning + entry-point registration for agent hooks, mirroring channel/tool patterns.

## 4. Community Hot Topics

- **Repeated messages during reasoning** — [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) (11 comments, closed): users report Nanobot intermittently repeats phrases like “Good points, let me investigate the issue” while reasoning. This is a reliability/UX concern; no linked fix PR was visible in the data.
- **Docker Compose deployment failure** — [Issue #5295](https://github.com/HKUDS/nanobot/issues/5295) (5 comments, closed): `entrypoint.sh: Permission denied` in the gateway container affected users following deployment docs. Likely addressed by the Docker capability work in [PR #5320](https://github.com/HKUDS/nanobot/pull/5320).
- **Voice output / text-to-speech** — [Issue #4010](https://github.com/HKUDS/nanobot/issues/4010) (3 comments, 3 👍, open): voice-input already works, but the agent cannot reply with voice notes. Strong community signal, moderate interest.
- **QwenCloud provider path** — [Issue #5350](https://github.com/HKUDS/nanobot/issues/5350) (new, open): requests a backward-compatible QwenCloud provider alongside DashScope, reflecting international Qwen developers’ needs.
- **Matrix reply-in-thread context** — [Issue #5275](https://github.com/HKUDS/nanobot/issues/5275) (1 comment, open): Matrix “reply in thread” streams should form a dedicated context like Discord/Slack threads.

## 5. Bugs & Stability

Ranked by severity:

- **Critical (p0): Stale background task saves can overwrite session data** — [PR #5271](https://github.com/HKUDS/nanobot/pull/5271) is open with priority p0 and serializes `/new` with compaction, rejecting saves from invalidated tasks. Needs maintainer attention.
- **High (p1): ExecTool path guard bypasses** — Fixed by [PR #5329](https://github.com/HKUDS/nanobot/pull/5329) and [PR #5218](https://github.com/HKUDS/nanobot/pull/5218).
- **High (p1): Credential-bearing URLs sent to Jina** — Fixed by [PR #5258](https://github.com/HKUDS/nanobot/pull/5258); also closes privacy issue [Issue #4884](https://github.com/HKUDS/nanobot/issues/4884).
- **High (p1): Docker privilege-drop / entrypoint failure** — Fixed by [PR #5320](https://github.com/HKUDS/nanobot/pull/5320), related to [Issue #5295](https://github.com/HKUDS/nanobot/issues/5295).
- **Medium (p1): Gemini tool-call replay failures** — Fixed by [PR #5230](https://github.com/HKUDS/nanobot/pull/5230).
- **Medium (p2): Token-usage settings tests fail in a ~5-hour daily timezone window** — [Issue #5348](https://github.com/HKUDS/nanobot/issues/5348) remains open, caused by UTC defaults vs configured timezone in settings payloads.
- **Medium (p2): Matrix room-level replies not linked to originating event** — [PR #5292](https://github.com/HKUDS/nanobot/pull/5292) is open.
- **Medium (p2): Non-ASCII MCP tool names sanitized to the same `_` identifier** — [PR #5360](https://github.com/HKUDS/nanobot/pull/5360) proposes uniqueness fixes.
- **Low/UX: Repeated reasoning messages** — [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) closed, but no explicit fix PR was listed.

## 6. Feature Requests & Roadmap Signals

Several forward-looking features are either open or in active PRs:

- **WebUI session collaboration via mentions** — [PR #5358](https://github.com/HKUDS/nanobot/pull/5358) adds stable server-owned `@name`s for sessions and composer mention picker support.
- **Improved channel setup flows** — [PR #5356](https://github.com/HKUDS/nanobot/pull/5356) reorganizes WebUI channel fields into clearer sections and makes unconfigured toggles actionable.
- **Apps discovery redesign** — [PR #5342](https://github.com/HKUDS/nanobot/pull/5342) reworks the Apps tab around Discover/Installed/All and curated Featured entries.
- **Native TypeScript terminal UI** — [PR #4329](https://github.com/HKUDS/nanobot/pull/4329) remains open with conflicts; this is a major CLI product direction.
- **QwenCloud provider path** — [Issue #5350](https://github.com/HKUDS/nanobot/issues/5350) is likely to land soon given existing DashScope provider infrastructure.
- **Voice output** — [Issue #4010](https://github.com/HKUDS/nanobot/issues/4010) remains a popular request, though no implementation PR is visible.
- **Subagent transcript persistence** — [PR #5291](https://github.com/HKUDS/nanobot/pull/5291) would preserve full subagent conversation history instead of losing it after background runs.

## 7. User Feedback Summary

User pain points center on reliability and deployment friction:

- Intermittent repeated messages during reasoning degrade trust in agent output ([#5327](https://github.com/HKUDS/nanobot/issues/5327)).
- Docker Compose deployment failed for some users with `entrypoint.sh: Permission denied`, hurting onboarding ([#5295](https://github.com/HKUDS/nanobot/issues/5295)).
- Users want conversational voice output, not just text replies, especially on channels that natively support voice notes ([#4010](https://github.com/HKUDS/nanobot/issues/4010)).
- Matrix power users want thread semantics to work consistently like Discord/Slack ([#5275](https://github.com/HKUDS/nanobot/issues/5275)).
- Security-conscious users appreciate the privacy concern around sending full user URLs to Jina ([#4884](https://github.com/HKUDS/nanobot/issues/4884)) and the prompt fixes in PRs.
- Session/reliability issues — stale saves, subagent transcripts disappearing — indicate users expect stronger persistence guarantees.

Overall, feedback reflects a maturing project: users are relying on NanoBot for real workflows and demanding production-grade security, session integrity, and channel-specific behavior.

## 8. Backlog Watch

Items needing maintainer attention:

- **[PR #5271](https://github.com/HKUDS/nanobot/pull/5271)** — priority p0 session overwrite fix; open for several days despite critical severity.
- **[Issue #4010](https://github.com/HKUDS/nanobot/issues/4010)** — voice output feature request open since May 2026 with 3 👍 and no implementation PR.
- **[PR #4329](https://github.com/HKUDS/nanobot/pull/4329)** — native TypeScript terminal UI, open since June, marked with conflicts.
- **[PR #5291](https://github.com/HKUDS/nanobot/pull/5291)** — subagent transcript persistence, open since August 7, no visible maintainer response.
- **[PR #5204](https://github.com/HKUDS/nanobot/pull/5204)** — Responses capabilities refactor for providers, open since August 1 and marked with conflicts.
- **[PR #5342](https://github.com/HKUDS/nanobot/pull/5342)** and **[PR #5338](https://github.com/HKUDS/nanobot/pull/5338)** — both open with `conflict` labels.
- **[Issue #5275](https://github.com/HKUDS/nanobot/issues/5275)** — Matrix thread-context semantics; only 1 comment, needs maintainer triage.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-13

## 1. Today's Overview

Hermes Agent saw elevated activity over the last 24 hours, with 50 issues and 50 PRs updated — 11 issues closed and 16 PRs merged/closed. No new releases shipped in this window. The dominant theme is the **plugin interface expansion campaign**: multiple plugin-system PRs landed today (STT `pre_transcription` hook, inter-plugin event bus, ownership ledger/teardown, `pre_command` observer hook), advancing the long-running community tracker. Concurrently, two **P1 Windows reliability regressions** are active — the desktop app killing the live gateway on restart (#83683) and the post-update gateway dying silently (#84185) — which will likely be the next hotfix focus. Overall project health is good on feature velocity, with concern concentrated in the Windows desktop/update path and OAuth-backed MCP connection stability.

## 2. Releases

No new releases in the last 24 hours. (Previous release: Hermes 0.20.0, referenced in several recent bug reports.)

## 3. Project Progress

**Merged/closed PRs today** (notable):

- **[#84934](https://github.com/NousResearch/hermes-agent/pull/84934)** — `feat(plugins): pre_transcription hook — STT prompts and vocabulary hints`. Threads model prompts/vocabulary hints into every STT provider; salvages #65632 (hansai-art) with authorship preserved. Addresses sub-issue #64168.
- **[#84932](https://github.com/NousResearch/hermes-agent/pull/84932)** — `feat(plugins): inter-plugin event bus with declared emits/listens`. Namespaced pub/sub with manifest declarations and bounded delivery; salvages #66085 (hansai-art). Addresses sub-issue #64164.
- **[#84519](https://github.com/NousResearch/hermes-agent/pull/84519)** — `fix(agent): correct Upstage solar-pro4 and syn-pro context lengths`. Fixes #84482; `syn-pro` was dangerously over-reported at 256K (true window 65,536).
- **Superseded PRs closed:** [#65632](https://github.com/NousResearch/hermes-agent/pull/65632) and [#66085](https://github.com/NousResearch/hermes-agent/pull/66085) were closed in favor of the salvaged re-submissions above.

**Closed issues reflect the plugin campaign landing:**
- [#64161](https://github.com/NousResearch/hermes-agent/issues/64161) — Streaming LLM output observer hooks (deltas, lifecycle)
- [#64164](https://github.com/NousResearch/hermes-agent/issues/64164) — Inter-plugin event bus
- [#64168](https://github.com/NousResearch/hermes-agent/issues/64168) — STT request hook
- [#64167](https://github.com/NousResearch/hermes-agent/issues/64167) — Cache-safe context injection (system prompt sections)
- [#65449](https://github.com/NousResearch/hermes-agent/issues/65449) — Additive-only redaction pattern registry
- [#64900](https://github.com/NousResearch/hermes-agent/issues/64900) — Plugin-extensible `send_message` schema/handlers
- [#26193](https://github.com/NousResearch/hermes-agent/issues/26193) — Custom `@prefix` context references
- [#42525](https://github.com/NousResearch/hermes-agent/issues/42525) — Desktop workspace/directory switching (5 👍)
- [#81039](https://github.com/NousResearch/hermes-agent/issues/81039) — Windows console-window flash on subprocess spawn

## 4. Community Hot Topics

- **[#6839 — Lazy Tool Schema Loading / Two-Pass Tool Injection](https://github.com/NousResearch/hermes-agent/issues/6839)** (39 comments, 18 👍, open, P2, needs-decision) — The single most-engaged issue. Users report 3,500–5,000 tokens burned per API call on full tool schemas for 50+ tools, a critical problem for local-model users. The proposal: two-pass tool injection to defer schemas until actually needed. This is the clearest token-cost reduction signal in the backlog.
- **[#64182 — Plugin Interface Expansion tracking](https://github.com/NousResearch/hermes-agent/issues/64182)** (33 comments) — Reference plan for the plugin-system campaign; today's multiple landings show maintainers executing on it.
- **[#64231 — Lifecycle-event catalog & hook taxonomy](https://github.com/NousResearch/hermes-agent/issues/64231)** (24 comments) — Seeks to batch-triage a dozen pending hook PRs against a coherent standard instead of merging one-offs. Today's landings (#84934, #84914, #84923) appear to be that triage in action.
- **[#66616 — Skills index stale/degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** (19 comments, bot-reported) — `skills-index.json` rebuild is 29.8h old against a 26h limit; an automated infra-health issue with sustained discussion.
- **[#83683 — Desktop restart kills live gateway](https://github.com/NousResearch/hermes-agent/issues/83683)** (10 comments, P1 regression) — High community impact: WeChat/QQ/Telegram go silent on every desktop restart.

**Underlying needs:** (1) reducing per-call token waste on local/self-hosted models; (2) a stable, documented plugin API so long-queued community PRs can land; (3) Windows desktop reliability for always-on gateway usage.

## 5. Bugs & Stability

**P1 (severe, active):**
- **[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)** — Desktop restart force-kills the messaging gateway and never relaunches it (WeChat/QQ/Telegram silent). Regression on Windows; 10 comments; no fix PR yet.
- **[#84185](https://github.com/NousResearch/hermes-agent/issues/84185)** — On Windows, `hermes update` spawns a gateway that dies immediately and silently (no logs, no PID file). Offline until manual restart; no fix PR yet.
- **[#53479](https://github.com/NousResearch/hermes-agent/issues/53479)** — CLI updater still trusts `git rev-list --count` on shallow/diverged installs, producing bogus update counts (Desktop was fixed in #51922; CLI was not).

**P2 (medium, with fixes in flight or related):**
- **[#38193](https://github.com/NousResearch/hermes-agent/issues/38193)** — OAuth-backed MCP server permanently deadlocks after keepalive reconnect (auth-flow lock released cross-task). **Fix PR exists:** [#84963](https://github.com/NousResearch/hermes-agent/pull/84963) closes this teardown-lock failure class.
- **[#81051](https://github.com/NousResearch/hermes-agent/issues/81051)** — Related OAuth MCP issue: connections "parked" permanently after ~4h uptime, only gateway restart recovers. Likely addressed by #84963.
- **[#83427](https://github.com/NousResearch/hermes-agent/issues/83427)** — `browser_exec` fails with `pydantic_core ModuleNotFoundError` because PYTHONPATH points at Hermes venv in the desktop app.
- **[#77505](https://github.com/NousResearch/hermes-agent/issues/77505)** — Severe scroll jitter in `VirtualSessionList` persists after #77328's memoization.
- **[#84206](https://github.com/NousResearch/hermes-agent/issues/84206)** — `@file:` expansion assumes UTF-8; fails on GB18030/Shift_JIS/CP932/Windows-1252/Big5 text.
- **[#83390](https://github.com/NousResearch/hermes-agent/issues/83390)** — `auxiliary.title_generation` fails on DeepSeek: HTTP 400 `response_format` unsupported.
- **[#83918](https://github.com/NousResearch/hermes-agent/issues/83918)** — Desktop runtime plugins fail to load due to a syntax error in the bundled `completion-sound-*.js`.

**P3 / bot-detected:**
- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)** — Skills index freshness probe degraded (29.8h vs 26h limit).

**Other fix PRs open today:** [#83975](https://github.com/NousResearch/hermes-agent/pull/83975) (desktop-origin cron reports delivered to chat), [#84970](https://github.com/NousResearch/hermes-agent/pull/84970) (TUI prompt cleanup `UnboundLocalError` guard), [#49169](https://github.com/NousResearch/hermes-agent/pull/49169) (remove silently-aliased DeepSeek legacy models from picker).

## 6. Feature Requests & Roadmap Signals

Strong signals for the next minor release:

- **Lazy tool schema loading (#6839)** — 18 👍 and a clear token-cost win; the most likely large feature to be scheduled next, though still `needs-decision`.
- **Plugin interface expansion** — effectively already shipping: pre_command hook + `ctx.call_mcp` (#84914), ownership ledger + `on_unload` + supervised tasks (#84923) are open and in review today, completing the Phase-0 structural work.
- **Multi-gateway Desktop tabs ([#45779](https://github.com/NousResearch/hermes-agent/issues/45779), 7 👍)** — recurring request from multi-machine users; still open with no PR.
- **Xiaomi MiMo-V2.5 TTS/ASR provider ([#46257](https://github.com/NousResearch/hermes-agent/issues/46257))** — Chinese-language speech models; waiting on decision.
- **Smaller new items today:** `display.autolink_urls` toggle ([#84921](https://github.com/NousResearch/hermes-agent/issues/84921)), configurable/suppressible quota warnings ([#84946](https://github.com/NousResearch/hermes-agent/pull/84946)), Kubernetes session-pod terminal backend ([#84962](https://github.com/NousResearch/hermes-agent/pull/84962)), memory-pressure/OOM status surfacing ([#84965](https://github.com/NousResearch/hermes-agent/pull/84965)), and inbox-style sidebar session cards ([#84960](https://github.com/NousResearch/hermes-agent/pull/84960)).

**Prediction:** the plugin-system rollout (event bus, hooks, ownership) will reach stable in the next release; Lazy Tool Schema Loading is the strongest candidate to follow, given community demand.

## 7. User Feedback Summary

- **Token overhead is the #1 pain point.** #6839's 18 👍 + 39 comments reflect real cost pressure, especially for local-model users who pay for irrelevant tool schemas on every call.
- **Windows desktop reliability is eroding trust.** Two P1s (#83683, #84185) both cause "silent offline" messaging gateways — the worst failure mode for an always-on assistant.
- **OAuth MCP connectivity is fragile in production.** Users report deadlocks/parking after hours of uptime with only a full restart as remediation (#38193, #81051). Positive: the fix PR landed the same day.
- **Plugin developers are engaged but were blocked.** The repeated "salvages PR X with authorship preserved" pattern shows contributor patience; maintainers are now clearing the queue.
- **Desktop UX requests persist** — multi-gateway tabs (#45779), workspace switching (#42525, now closed/implemented), and scroll jitter (#77505) show active daily use of the Electron client.

## 8. Backlog Watch

- **[#6839 — Lazy Tool Schema Loading](https://github.com/NousResearch/hermes-agent/issues/6839)** — Open since 2026-04-09 (4+ months), 18 👍, 39 comments, still `needs-decision`. Highest-value item awaiting a maintainer decision.
- **[#53479 — CLI updater shallow/diverged installs](https://github.com/NousResearch/hermes-agent/issues/53479)** — P1 open since 2026-06-27; Desktop got the fix in #51922, CLI path still broken.
- **[#39043 — Signal adapter native quote/edit/delete/read-receipt](https://github.com/NousResearch/hermes-agent/issues/39043)** — Open since June with 3 👍; no PR attached.
- **Blocked PRs awaiting maintainer review** (all marked `MERGEABLE / BLOCKED`, no checks reported, no review attached):
  - [#67934](https://github.com/NousResearch/hermes-agent/pull/67934) — Native Ollama tags for local model discovery
  - [#70667](https://github.com/NousResearch/hermes-agent/pull/70667) — Kanban delegated CLI refusal exit-status test
  - [#72671](https://github.com/NousResearch/hermes-agent/pull/72671) — Gateway background cleanup fixture fix
- **[#66616 — Skills index watchdog degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — Automated infra issue has 19 comments; suggests the docs-site CI pipeline needs attention.

---

*Data source: GitHub (NousResearch/hermes-agent), last 24h as of 2026-08-13.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## Today's Overview

PicoClaw saw moderate activity in the last 24 hours: no new releases, no merged or closed PRs, and no resolved issues. Two open issues were updated, both still active and marked `[stale]`, indicating that user-reported bugs remain unresolved. Three open PRs received updates, showing ongoing development effort in areas like routed-agent memory, Telegram topic support, and native web search integration. Overall, the project is actively being worked on, but bug-fix throughput is low and several important items need maintainer attention.

## Releases

No new releases were published in the last 24 hours. The most recent referenced versions in issue reports are `PicoClaw 0.3.1` and a nightly build from commit `2cf030d2`.

## Project Progress

No PRs were merged or closed in the last 24 hours. Three open PRs were updated, indicating active work in review:

- [#3316 fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316) – Addresses a bug where routed agents in Discord channels did not remember previous messages and auto-compaction never triggered.
- [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) – Fixes Telegram topic handling for private bot chats with `IsTopicMessage`.
- [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) – Adds Exa as a native `tools.web` / `web_search` provider with range filter support.

These are promising additions, but none have been merged yet.

## Community Hot Topics

The most active items are the two open bugs, each with 4 comments and 1 👍 reaction:

- [#3281 [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  Users report significant input lag in the PicoClaw Web UI as session history grows. This points to a need for better frontend rendering or message virtualization for long conversations.

- [#3269 [BUG] If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying to users](https://github.com/sipeed/picoclaw/issues/3269)  
  A failed MCP server connection causes the agent loop to hang and the chat interface to stop responding. This indicates a need for better error handling, timeouts, and retry logic around MCP dependencies.

Both issues have no linked fix PRs yet and are marked `[stale]`, which is concerning given their impact.

## Bugs & Stability

Ranked by severity:

1. **High: MCP connection failure hangs the agent loop and stops chat replies**  
   [#3269](https://github.com/sipeed/picoclaw/issues/3269)  
   If an MCP server fails, the agent loop can hang indefinitely, making the chat interface unresponsive. This is a critical resilience bug for users relying on MCP tools. Reported on nightly build with Qwen3. No fix PR is currently linked.

2. **Medium: Web UI chat input becomes very laggy with long history**  
   [#3281](https://github.com/sipeed/picoclaw/issues/3281)  
   Typing in the Web UI degrades noticeably after accumulating chat history in a session. Reported on version `0.3.1`. This is a performance/UX issue rather than a complete outage, but it directly affects daily usability.

Both issues are still open and have been marked `[stale]`.

## Feature Requests & Roadmap Signals

No new feature requests were filed in the last 24 hours, but the open PRs signal likely roadmap directions:

- **Native Exa web search provider** ([#3299](https://github.com/sipeed/picoclaw/pull/3299)) suggests broader web-search tooling support.
- **Telegram topics in private bot chats** ([#3315](https://github.com/sipeed/picoclaw/pull/3315)) improves Telegram integration completeness.
- **Routed-agent context management fixes** ([#3316](https://github.com/sipeed/picoclaw/pull/3316)) indicate ongoing investment in multi-agent routing, memory, and auto-compaction behavior.

If these PRs are merged, they are strong candidates for inclusion in the next PicoClaw release.

## User Feedback Summary

Real user pain points expressed in the current data:

- Long chat histories make the Web UI input box laggy and unpleasant to use.
- MCP server failures can completely stop the assistant from replying, which is especially problematic for production use.
- Routed agents in channels like Discord may not remember previous messages or trigger auto-compaction, breaking conversational context.
- Telegram users with private bot chats and forum topic mode enabled need proper topic support.
- Users want more native search provider options, such as Exa.

No positive or satisfaction feedback was captured in the last 24 hours; the available signal is mostly bug-related friction.

## Backlog Watch

Issues needing maintainer attention:

- [#3269 MCP connection failure hangs agent loop](https://github.com/sipeed/picoclaw/issues/3269) – Open since 2026-07-20, marked `[stale]`, high severity, no fix PR.
- [#3281 Web UI input laggy with long history](https://github.com/sipeed/picoclaw/issues/3281) – Open since 2026-07-21, marked `[stale]`, no fix PR.

PRs needing review or merge decisions:

- [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) – Open since 2026-07-26, updated but not merged.
- [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) – Open since 2026-08-03.
- [#3316 Fix routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316) – Open since 2026-08-03.

The `[stale]` labels on two unresolved high-visibility bugs are a risk sign; maintainers should triage or update these before they get auto-closed or ignored.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw Project Digest — 2026-08-13

### 1. Today's Overview

As of 2026-08-13, NanoClaw is in an active development period between releases: no new versions were published, 4 issues are open, and 10 PRs were touched in the last 24 hours (9 open, 1 closed). The only closed PR was a WhatsApp recipient-validation fix that addresses silent message-delivery failures. Core-team work continues around the Agent Plugins 1.0.0 format (#3220), setup wizard template flow (#2909), and plugin MCP working-directory support (#3231), while community PRs for Signal, Telegram, skill docs, and new skills also saw updates. Overall project health appears stable, with more activity on feature/template infrastructure than on urgent bug-fixing.

### 2. Releases

None in the last 24 hours.  
No changelog, breaking-change notes, or migration guidance to report.

### 3. Project Progress

- ✅ **Closed/merged PR:** [#3086 fix(whatsapp): validate recipient exists before sending](https://github.com/nanocoai/nanoclaw/pull/3086) — closed 2026-08-12. Prevents WhatsApp messages from being reported as delivered when sent to unregistered numbers.
- 🔄 **Updated open PRs:** [#3220 agent templates as Agent Plugins 1.0.0](https://github.com/nanocoai/nanoclaw/pull/3220), [#2909 setup wizard template flow](https://github.com/nanocoai/nanoclaw/pull/2909), [#3231 plugin MCP cwd support](https://github.com/nanocoai/nanoclaw/pull/3231), [#3193 Telegram rich messages](https://github.com/nanocoai/nanoclaw/pull/3193), [#3050 Dial channel integration](https://github.com/nanocoai/nanoclaw/pull/3050), [#3189 add-why skill](https://github.com/nanocoai/nanoclaw/pull/3189), [#2689 Signal DM fixes](https://github.com/nanocoai/nanoclaw/pull/2689), [#2346 unknown slash command handling](https://github.com/nanocoai/nanoclaw/pull/2346), and [#3230 skill removal docs fix](https://github.com/nanocoai/nanoclaw/pull/3230).

No other merges were reported in this window.

### 4. Community Hot Topics

- **Issue #2504 — [`ncl status` command proposal](https://github.com/nanocoai/nanoclaw/issues/2504)**  
  The only issue with explicit comments (1) in the dataset. Created May 15, still open and updated Aug 12. Underlying need: operators want a lightweight, built-in way to check NanoClaw instance health instead of relying on session listings or external dashboards.

- **PR #3220 — [Agent templates become Agent Plugins 1.0.0 directories](https://github.com/nanocoai/nanoclaw/pull/3220)**  
  Core-team PR, updated Aug 12. This is the central architecture change affecting template format, security hardening, and plugin loading. High visibility because several other PRs are stacked on it.

- **PR #2909 — [Template setup flow in the wizard and first-agent stamping](https://github.com/nanocoai/nanoclaw/pull/2909)**  
  Core-team PR, stacked on #3220. Repeated updates show active iteration on onboarding and template instantiation.

- **PR #2689 — [Signal DM platform ID consistency and delivery fixes](https://github.com/nanocoai/nanoclaw/pull/2689)**  
  Long-running community fix (created June 4) still receiving updates. Addresses dropped DMs and inconsistent platform IDs, indicating real user pain around Signal reliability.

No reaction counts were available in the source data.

### 5. Bugs & Stability

Ranked by severity:

- **High — [#3233 Agent-scoped `ncl tasks` is blind to pre-2.1.54 recurring tasks](https://github.com/nanocoai/nanoclaw/issues/3233)**  
  After migrating to 2.1.54, agents see `No tasks.` for legacy recurring tasks, and `get / pause / resume / cancel` fail. The issue explicitly calls out the missing migration/rehoming of legacy rows. No fix PR is open yet.

- **High — [#3234 Template-stamped agent groups get a bare UUID instead of `ag-` prefix](https://github.com/nanocoai/nanoclaw/issues/3234)**  
  Agent groups created with `--template` get a bare `randomUUID()`, which can begin with a digit and cause OneCLI `ensureAgent` to reject the identifier. This breaks spawning agent groups created from templates. No fix PR is open yet.

- **Medium — [#3086 WhatsApp messages silently "succeed" to unregistered numbers](https://github.com/nanocoai/nanoclaw/pull/3086)**  
  `sendMessage` returns a message key even when the recipient does not exist, producing false delivery logs. Fix PR was closed/merged in this window.

- **Medium — [#2689 Signal DMs silently dropped and `isMention` not set](https://github.com/nanocoai/nanoclaw/pull/2689)**  
  First Signal messages can be dropped because the router only auto-creates messaging groups when `isMention` is true. Fix PR is open.

- **Medium — [#2346 Unknown slash commands treated as passthrough and responses dropped](https://github.com/nanocoai/nanoclaw/pull/2346)**  
  Unrecognized commands are interpreted as Claude Code slash commands, producing output without `<message>` blocks that gets silently discarded. Fix PR is open.

- **Low-Medium — [#3193 Telegram Chat SDK needs update for rich messages](https://github.com/nanocoai/nanoclaw/pull/3193)**  
  Open fix PR to update the Telegram integration for rich-message support.

- **Low — [#3230 Skill removal docs point at retired data/env mirror](https://github.com/nanocoai/nanoclaw/pull/3230)**  
  Documentation-only fix, open.

### 6. Feature Requests & Roadmap Signals

- **#2504 — [`ncl status` operational health command](https://github.com/nanocoai/nanoclaw/issues/2504)**  
  Community request for a first-class health-check command. Could be a near-term addition if maintainers accept the scope.

- **#3232 — [QwenCloud as an optional provider skill](https://github.com/nanocoai/nanoclaw/issues/3232)**  
  Proposal to add `/add-qwencloud`, following NanoClaw's modular provider-skill pattern. Likely to be accepted if maintainers want broader Qwen model support without bundling providers in trunk.

- **#3050 — [Dial channel integration](https://github.com/nanocoai/nanoclaw/pull/3050)**  
  Open feature skill adding Dial to the channel picker and wizard. Candidate for a future minor release.

- **#3189 — [`add-why` skill](https://github.com/nanocoai/nanoclaw/pull/3189)**  
  Utility skill that explains what happened to a single message. Low-risk, skill-only addition.

- **#3220 / #2909 / #3231 — [Agent Plugins 1.0.0, setup wizard template flow, plugin MCP cwd](https://github.com/nanocoai/nanoclaw/pull/3220)**  
  These form the next major template/plugin push. If the stacked PRs land, the next release will likely include the Agent Plugins 1.0.0 migration, wizard template onboarding, and MCP working-directory handling for Codex/OpenCode.

### 7. User Feedback Summary

Real user pain points visible in the last 24 hours:

- **Operational visibility:** Users want a quick health check (`ncl status`) because existing session listing and dashboard skills are too heavy or limited.
- **Migration gaps:** Upgrading to 2.1.54 silently breaks agent access to older recurring tasks; users only discover the problem after the migration.
- **Template usability:** Template-created agent groups can fail at spawn time due to invalid generated IDs.
- **Silent messaging failures:** WhatsApp, Signal, and unknown slash commands all show a pattern of messages being accepted by the system but not actually delivered or processed.
- **Documentation drift:** Removal docs still reference a retired data/env mirror, causing confusion.

No explicit satisfaction or dissatisfaction metrics were included, but the issue narratives indicate frustration with silent failures and data-visibility gaps after migration.

### 8. Backlog Watch

- **PR #2346 — [Unknown slash commands treated as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)**  
  Open since **May 8**, still not merged despite addressing a silent message-drop bug.

- **Issue #2504 — [`ncl status` health check request](https://github.com/nanocoai/nanoclaw/issues/2504)**  
  Open since **May 15**, only 1 comment, no clear maintainer decision yet.

- **PR #2689 — [Signal DM fixes](https://github.com/nanocoai/nanoclaw/pull/2689)**  
  Open since **June 4**, repeatedly updated but not merged. Signal reliability remains pending.

- **PR #2909 — [Setup wizard template flow](https://github.com/nanocoai/nanoclaw/pull/2909)**  
  Open since **July 2**; blocked on #3220 landing. Needs maintainer sequencing and review.

- **PR #3220 — [Agent Plugins 1.0.0](https://github.com/nanocoai/nanoclaw/pull/3220)**  
  Core-team PR created Aug 10; central to the template roadmap. Continued attention needed so stacked PRs like #2909 and #3231 are not blocked indefinitely.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-13

## 1. Today's Overview
IronClaw is in a high-intensity stabilization-and-feature window: 41 issues and 50 PRs were updated in the last 24 hours, and two consecutive release candidates (v1.2.0-rc.2, v1.2.0-rc.3) shipped back-to-back. The dominant new traffic is a QA bug-bash focused on the Telegram channel, which surfaced a dense cluster of P1/P2 reliability defects — stuck sessions, webhook activation failures, and message loss. Feature work continues in parallel on the unified coding-tool contract, automations execution contracts, per-user model preferences, and the WebUI design-system epic, while a 1.1.1-rc.1 backport release was prepared to carry urgent fixes to the older line. Overall health: very high feature velocity, with a predictable surge of channel-maturity bugs now being triaged and patched.

## 2. Releases
Two new release candidates on the 1.2.0 line, both dated 2026-08-12:

**ironclaw-v1.2.0-rc.3**
- Fixed: The runtime container image now installs `curl`, so orchestrator in-container HTTP healthchecks (`curl -fsS http://localhost:3000/`) can execute. The image previously shipped no HTTP client, so the probe could never run and container readiness could not be established. Source fix: [PR #7555](https://github.com/nearai/ironclaw/pull/7555).

**ironclaw-v1.2.0-rc.2**
- Fixed: Windows first-start filesystem publication now uses native atomic rename semantics instead of hard links, and tolerates unsupported directory syncs.
- Fixed: Release smoke runs preserve the Windows account identity required to secure the standalone secrets key.

Neither RC published breaking-change or migration notes; both are bug-fix candidates. Release infrastructure was also hardened by [PR #7560](https://github.com/nearai/ironclaw/pull/7560) (closed), which retries the cargo-dist installer download after the rc.3 `x86_64-unknown-linux-musl` leg failed on a connection error.

## 3. Project Progress
19 PRs were merged/closed in the window. Notable items:

- [PR #7555](https://github.com/nearai/ironclaw/pull/7555) (closed) — Install `curl` in runtime Docker image; forward-port of #7303, shipped in v1.2.0-rc.3.
- [PR #7427](https://github.com/nearai/ironclaw/pull/7427) (closed) — Prepare 1.1.1-rc.1; backports urgent IronHub/custom MCP, WebUI, retrieval, runtime-credential, Slack, and Telegram fixes onto the 1.1 line; safely defaults the retained Slack/Telegram migration to skip legacy channel state.
- [PR #7550](https://github.com/nearai/ironclaw/pull/7550) (closed) — Per-field help text on admin configuration forms (manifest-driven `description` hints) plus channel setup docs rewrite; Telegram manifest is the first consumer.
- [PR #5503](https://github.com/nearai/ironclaw/pull/5503) (closed) — Compact Google extension capabilities: Gmail `fetch_message_summaries` for inbox triage, compact Calendar capabilities.
- [PR #6836](https://github.com/nearai/ironclaw/pull/6836) (closed) — `@ironclaw/ui` and WebUI workspace refactor; re-derives the design system cleanly from main and supersedes earlier attempts.
- [PR #7560](https://github.com/nearai/ironclaw/pull/7560) (closed) — Release-pipeline fix: retry dist installer download.

Closed issues reflecting completed engineering work:

- [Issue #7407](https://github.com/nearai/ironclaw/issues/7407) — `BatchPolicy::Parallel` capability batches now execute concurrently in `invoke_capability_batch`.
- [Issue #7484](https://github.com/nearai/ironclaw/issues/7484) — Context window no longer silently evicts the user task; user messages pinned, compaction on eviction, 128-message clamp revisited.
- [Issue #7485](https://github.com/nearai/ironclaw/issues/7485) — Token estimator double-counting ASCII (2 chars/token) fixed; the two estimators were unified.
- [Issue #7302](https://github.com/nearai/ironclaw/issues/7302) — WebUI tool-call failure UI softened to informational; no more aggressive-looking errors when the agent recovers.
- [Issue #5508](https://github.com/nearai/ironclaw/issues/5508) — Slack delivery target not found despite active connection — resolved.
- [Issue #6541](https://github.com/nearai/ironclaw/issues/6541) — WebUI constantly reconnecting — resolved.
- [Issue #7383](https://github.com/nearai/ironclaw/issues/7383) — Decomposition tracking issue opened for the 4.4k-line `tool_disclosure_port.rs`.

## 4. Community Hot Topics
Most-commented issues:

- [Issue #7360](https://github.com/nearai/ironclaw/issues/7360) (3 comments, open) — Expand stress coverage across built-in and durable write paths. Underlying need: the nightly API-capacity workload's mock model never emits tool calls, so regressions in built-in capability writes can land unexercised; the community wants the stress harness to match real agent behavior.
- [Issue #7407](https://github.com/nearai/ironclaw/issues/7407) (3 comments, closed) — Parallel capability batch execution. Attention on this moved it from proposal to shipped implementation in under a week.
- [Issue #7554](https://github.com/nearai/ironclaw/issues/7554) (1 comment) — Custom MCP server add flow shows a blocking validation error.
- [Issue #7517](https://github.com/nearai/ironclaw/issues/7517) (1 comment) — Staking path missing for Google/GitHub sign-ins on Cloud.near.ai.
- [Issue #7484](https://github.com/nearai/ironclaw/issues/7484), [#5508](https://github.com/nearai/ironclaw/issues/5508), [#6541](https://github.com/nearai/ironclaw/issues/6541) (1 comment each, closed) — context-window eviction, Slack delivery, WebUI reconnection.

The de-facto community hotspot is the Telegram QA bug-bash cluster ([#7535](https://github.com/nearai/ironclaw/issues/7535) through [#7546](https://github.com/nearai/ironclaw/issues/7546), 12 issues). The underlying need: Telegram as a first-class channel requires mature webhook lifecycle management, media-type handling, message ordering, long-message reassembly, and reliable delivery before it is production-grade.

## 5. Bugs & Stability
Ranked by severity:

**P1 — blocking:**
- [Issue #7538](https://github.com/nearai/ironclaw/issues/7538) — Agent becomes completely stuck after receiving a GIF or sticker; the session stops responding even to normal text. No fix PR referenced yet.
- [Issue #7536](https://github.com/nearai/ironclaw/issues/7536) — Multi-user access flow broken; additional users get "Invalid secret" when opening the UI.
- [Issue #7535](https://github.com/nearai/ironclaw/issues/7535) — Telegram webhook not activated after saving bot config; only works after full redeploy ("Forbidden [nearai-prod]"/CrabStrap errors).
- [Issue #7547](https://github.com/nearai/ironclaw/issues/7547) — Instance upgrade fails at egress apply on agent-stg.near.ai (v1-launch-checklist).

**P2:**
- [Issue #7540](https://github.com/nearai/ironclaw/issues/7540) — Long Telegram messages split by Telegram are partially missed; only the first part is processed.
- [Issue #7541](https://github.com/nearai/ironclaw/issues/7541) — Generated files are not sent as Telegram attachments; agent returns a local workspace path as a Markdown link.
- [Issue #7539](https://github.com/nearai/ironclaw/issues/7539) — Telegram user message appears after agent starts working; conversation flow looks out of order.
- [Issue #7544](https://github.com/nearai/ironclaw/issues/7544) — Agent exposes internal reasoning/planning/tool docs in chat instead of a user-facing response.
- [Issue #7545](https://github.com/nearai/ironclaw/issues/7545) — Agent refuses multi-token crypto price queries, claiming no live market-data tool despite general HTTP access.
- [Issue #7543](https://github.com/nearai/ironclaw/issues/7543) — Telegram routine executes successfully but the message is not delivered on first execution.
- [Issue #7542](https://github.com/nearai/ironclaw/issues/7542) — Agent doesn't recognize the conversation is already in Telegram and offers delivery to Telegram.
- [Issue #7451](https://github.com/nearai/ironclaw/issues/7451) — Agent sometimes asks for credentials when none are required.
- [Issue #7554](https://github.com/nearai/ironclaw/issues/7554) — Custom MCP server add flow shows a red validation error and blocks adding the server (Slack user report).
- [Issue #7508](https://github.com/nearai/ironclaw/issues/7508) — GitHub MCP extension startup reports "already registered and installed" then raises confusing endpoint-verification concerns.

**P3:**
- [Issue #7546](https://github.com/nearai/ironclaw/issues/7546) — Telegram stickers silently ignored; no reaction or acknowledgment.

Mitigations in flight: v1.2.0-rc.3 fixes the container healthcheck gap ([#7555](https://github.com/nearai/ironclaw/pull/7555)); [PR #7560](https://github.com/nearai/ironclaw/pull/7560) fixes release-pipeline download retries; [PR #7551](https://github.com/nearai/ironclaw/pull/7551) (open) makes unavailable-capability calls one-shot repairable instead of aborting runs, which may address behaviors in #7544/#7545. The 1.1.1-rc.1 backport ([#7427](https://github.com/nearai/ironclaw/pull/7427)) carries Slack/Telegram/WebUI/retrieval fixes to the older line.

## 6. Feature Requests & Roadmap Signals
- [Issue #7517](https://github.com/nearai/ironclaw/issues/7517) — Allow a staking path for Google/GitHub sign-ins on Cloud.near.ai. User-requested; likely candidate for the next cloud/release iteration.
- [Issue #7537](https://github.com/nearai/ironclaw/issues/7537) — Generic per-request thinking/effort control for LLM requests, with provider-native mapping (DeepSeek V4 Flash trigger case). Strong candidate for 1.2.x; no PR yet.
- [Issue #7044](https://github.com/nearai/ironclaw/issues/7044) (epic, v1.4.0) — Onboarding to channel-first approach. Backend wiring tracked in [Issue #6993](https://github.com/nearai/ironclaw/issues/6993); implementation prototype in [PR #6994](https://github.com/nearai/ironclaw/pull/6994), gated behind an off-by-default flag.
- [Issue #7038](https://github.com/nearai/ironclaw/issues/7038) (epic, v1.3.0) — Storybook + AI-first design system. Phases advancing via [PR #7039](https://github.com/nearai/ironclaw/pull/7039) (phase 1), [PR #7043](https://github.com/nearai/ironclaw/pull/7043) (phase 2 governance), and [PR #7558](https://github.com/nearai/ironclaw/pull/7558) (phase 3 `@ironclaw/ui` scaffold).
- [Issue #7520](https://github.com/nearai/ironclaw/issues/7520) — Epic to retire superseded/unreachable WebUI frontend surfaces (explicitly excluding the Jobs surface).
- In-flight PR signals: [PR #7439](https://github.com/nearai/ironclaw/pull/7439) — per-user model preferences and `/model` commands; [PR #7548](https://github.com/nearai/ironclaw/pull/7548) — versioned structured execution contracts for scheduled automations; [PR #7491](https://github.com/nearai/ironclaw/pull/7491) — unified coding-tool contract (`read`, `write`, `edit`, `glob`, `grep`) with a benchmark arm.

## 7. User Feedback Summary
- **Custom MCP flow blocked:** A user reported via Slack (posted by IronClaw in #x-ai-product-feedback) that the Custom MCP flow shows a nonspecific red "validation" error and refuses to add the server ([#7554](https://github.com/nearai/ironclaw/issues/7554)).
- **Telegram channel dissatisfaction:** QA-bash users on Railway report totally stuck sessions after media, out-of-order messages, missing file attachments, lost long messages, and routine results that never arrive — a clearly negative first-run experience for this channel ([#7535](https://github.com/nearai/ironclaw/issues/7535)–[#7546](https://github.com/nearai/ironclaw/issues/7546)).
- **Agent behavior confusion:** Users see raw reasoning/planning/tool docs in chat ([#7544](https://github.com/nearai/ironclaw/issues/7544)) and refusals for tasks the agent can actually perform, e.g., crypto price lookups ([#7545](https://github.com/nearai/ironclaw/issues/7545)).
- **Cloud friction:** Google/GitHub users cannot stake NEAR for inference; only Stripe credits are offered and NEAR wallet attach is not available ([#7517](https://github.com/nearai/ironclaw/issues/7517)).
- **Onboarding friction:** First-run WebUI is a "blank slate" — the burden is on the user to imagine, describe, and configure a use case ([#7044](https://github.com/nearai/ironclaw/issues/7044)).
- **Positive resolution signals:** WebUI "Reconnecting" confusion ([#6541](https://github.com/nearai/ironclaw/issues/6541)) and Slack delivery-target failure ([#5508](https://github.com/nearai/ironclaw/issues/5508)) were closed as fixed.

## 8. Backlog Watch
- [Issue #6993](https://github.com/nearai/ironclaw/issues/6993) (open since 08-01) — Backend wiring for the OOBE automation-tasks prototype; no linked implementation PR yet.
- [Issue #7044](https://github.com/nearai/ironclaw/issues/7044), [#7038](https://github.com/nearai/ironclaw/issues/7038), [#7042](https://github.com/nearai/ironclaw/issues/7042) (open since 08-03) — Large onboarding and design-system epics; progressing via PRs but require sustained review capacity.
- [Issue #7360](https://github.com/nearai/ironclaw/issues/7360) (open since 08-07, 3 comments) — Stress-coverage expansion across built-in and durable write paths; important for regression safety, no linked fix PR yet.
- [Issue #7451](https://github.com/nearai/ironclaw/issues/7451) (open since 08-10) — Telegram agent incorrectly requesting credentials; P2 but a user-trust issue; no linked fix.
- [Issue #7508](https://github.com/nearai/ironclaw/issues/7508) (open since 08-11) — GitHub MCP confusing endpoint-verification prompt; no linked fix.
- [PR #6994](https://github.com/nearai/ironclaw/pull/6994) (open since 08-01) — OOBE automation-tasks prototype; long-running XL PR awaiting review/merge (flag-gated, low risk).

**Key observation:** the backlog is healthy and actively triaged — most July-reported items are now closed — but the Telegram bug cluster and the OOBE/design-system PR stack are the two areas most likely to consume maintainer bandwidth in the coming days.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-13

## 1. Today's Overview

Activity over the last 24 hours was moderate, with 6 issues and 8 PRs updated. All 6 issues are relatively old and several carry `stale` labels, suggesting maintenance/cleanup rather than fresh bug influx. The PR queue is healthier: 7 of 8 PRs are merged/closed, covering UI refinements, a Windows plugin installation fix, and a release branch. No new releases were published in the last 24 hours. Overall, the project shows steady forward progress, though several older open issues remain unresolved and would benefit from maintainer attention.

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

Seven PRs were closed/merged in the last 24 hours:

- **#2482** — `feat: skills manager split mine builtin tabs`  
  https://github.com/netease-youdao/LobsterAI/pull/2482  
  Improves the skills manager by splitting "mine" and built-in tabs.

- **#2481** — `feat(sidebar): move task search to header actions`  
  https://github.com/netease-youdao/LobsterAI/pull/2481  
  Replaces the labeled search entry with an icon-only action and adds cross-platform alignment plus regression coverage.

- **#2480** — `Release/2026.8.12`  
  https://github.com/netease-youdao/LobsterAI/pull/2480  
  Release branch for the 2026.8.12 milestone.

- **#2479** — `fix(plugins): preserve junctions during Windows install`  
  https://github.com/netease-youdao/LobsterAI/pull/2479  
  Fixes Windows plugin installation issues by staging installs on the same volume and preserving dependency junctions.

- **#2478** — `fix(shell): avoid unsupported large file icon size on macOS/Windows`  
  https://github.com/netease-youdao/LobsterAI/pull/2478  
  Corrects Electron file-icon fallback behavior on macOS/Windows.

- **#2475** — `fix(model-selector): give each model its own thinking level`  
  https://github.com/netease-youdao/LobsterAI/pull/2475  
  Fixes a bug where thinking-level settings were shared across models and overwrote each other.

- **#1233** — `feat(model): 为模型提供商添加官网链接和 API Key 获取引导`  
  https://github.com/netease-youdao/LobsterAI/pull/1233  
  Older PR, updated and closed, adding official website links and API-key guidance for model providers.

---

## 4. Community Hot Topics

The most active updated issues are older items, each with 2 comments:

- **#1179 — “3.31版本强制沙箱怎么关？”**  
  https://github.com/netease-youdao/LobsterAI/issues/1179  
  User reports 3.31 forces a sandbox mode with no visible toggle; rollback to 3.30 solves it. This suggests sandboxing behavior changed without clear user control/communication.

- **#1236 — `[bug] 插件 ID 不匹配警告`**  
  https://github.com/netease-youdao/LobsterAI/issues/1236  
  Plugin configuration key mismatches manifest ID, causing repeated startup warnings. Closed/stale, but represents a configuration-validation gap.

- **#2071 — “创建定时任务错误”**  
  https://github.com/netease-youdao/LobsterAI/issues/2071  
  Scheduled task creation fails on version 2026.5.27. Closed/stale with no visible fix discussion.

Also noteworthy is the only open PR:

- **#1181** — `fix(cowork): hide OpenClaw main agent sessions from session list`  
  https://github.com/netease-youdao/LobsterAI/pull/1181  
  Open since April, still awaiting maintainer review.

---

## 5. Bugs & Stability

No new critical regressions were filed in the last 24 hours, but several existing issues remain open. Ranked by severity:

- **High / Trust concern — #1173**: “卸载之后程序还能运行？？”  
  https://github.com/netease-youdao/LobsterAI/issues/1173  
  User reports the app continues running and can send Feishu messages after uninstall, raising concerns about background processes. This is high-priority for user trust and uninstall hygiene.

- **Medium / Gateway stability — #1180**: “修改自建agent可能会触发网关反复重启”  
  https://github.com/netease-youdao/LobsterAI/issues/1180  
  Editing a custom agent icon triggers repeated gateway restarts; deleting the agent restores normal behavior.

- **Medium / Sandbox behavior — #1179**: Forced sandbox in 3.31 with no off switch. Users are likely to stay on old versions until this is addressed.

- **Medium / Cron feature — #2071**: Scheduled task creation error on 2026.5.27, with a screenshot but no further detail. Closed/stale, but the underlying bug may still exist.

- **Low / Configuration warning — #1236**: Plugin ID mismatch warning on every gateway start. The issue is closed, but it is a warning-not-error that users still find noisy.

Related fix PRs merged today: #2479 improves Windows plugin installation reliability; #2478 fixes shell icon sizing. Neither directly addresses the open bug list above.

---

## 6. Feature Requests & Roadmap Signals

- **Multiple custom model providers — #1174**  
  https://github.com/netease-youdao/LobsterAI/issues/1174  
  Users want to keep multiple custom model providers at once rather than replacing the existing one. This is a clear roadmap signal for provider management UX.

- **Provider links and API-key guidance — PR #1233**  
  https://github.com/netease-youdao/LobsterAI/pull/1233  
  Merged/closed today; likely to be included in a future release. It adds official-site links and “Get API Key” shortcuts, improving model provider onboarding.

- **Skills manager UX — PR #2482**  
  https://github.com/netease-youdao/LobsterAI/pull/2482  
  Separating user-created skills from built-in tabs suggests continued investment in the skills/customization experience.

Based on recent PR patterns, next minor releases may focus on model-provider usability, sidebar/search refinements, and Windows install robustness.

---

## 7. User Feedback Summary

Real user pain points in the last 24 hours:

- Updated versions can introduce behavior changes (forced sandbox) without an obvious user-facing toggle, leading to rollbacks.
- Uninstall behavior is being questioned, including perceived "backdoor" behavior — this needs immediate clarification or cleanup.
- Users still want more flexible custom model provider configuration.
- Configuration warnings and cron-task errors are present but not critical; they still erode polish.
- There is positive signal in PR activity: UI refinements, per-model thinking settings, and Windows plugin fixes suggest the team is actively addressing quality issues.

---

## 8. Backlog Watch

Long-open items needing maintainer attention:

- **PR #1181 — hide OpenClaw main agent sessions from session list**  
  https://github.com/netease-youdao/LobsterAI/pull/1181  
  Open since April 1, with a clear scope and no comments. It would improve cowork session clarity and appears ready for review.

- **Issue #1173 — uninstall behavior / privacy concern**  
  https://github.com/netease-youdao/LobsterAI/issues/1173  
  Stale, open since March 31, high user trust impact.

- **Issue #1174 — multiple custom model providers**  
  https://github.com/netease-youdao/LobsterAI/issues/1174  
  Stale, open since March 31, but directly maps to a likely roadmap feature.

- **Issue #1179 — forced sandbox toggle**  
  https://github.com/netease-youdao/LobsterAI/issues/1179  
  Stale, open since March 31, potentially causing user retention issues.

- **Issue #1180 — gateway restart loop on agent edit**  
  https://github.com/netease-youdao/LobsterAI/issues/1180  
  Stale, open since March 31, with a clear repro scenario.

These are good candidates for triage, closure, or explicit “in progress” status updates.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

Note: The supplied data references `agentscope-ai/QwenPaw` issues/PRs. I use those links below while treating “CoPaw” as the project name.

---

## 1. Today's Overview

CoPaw remains highly active in a beta-phase release cycle: 30 issues and 44 PRs were touched in the last 24 hours, with 7 issues closed and 16 PRs merged/closed. A new beta release, `v2.1.0-beta.4`, shipped with two targeted fixes and a version bump. Activity is strong, but project health looks mixed — the most visible signals are Windows stability complaints, agent task-execution halts, and a few memory/UI consistency regressions. Maintainers are responding quickly with fix PRs for several reported issues, though one previously merged chat response fix was reverted in the same window.

## 2. Releases

### v2.1.0-beta.4
- [Release page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4)
- **fix(files):** repair previews and dark mode styling — [PR #6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)
- **fix(tools):** correct `read_file` tool description — [PR #6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)
- **chore:** bump version to `2.1.0b4`

No breaking changes or migration notes were published in the release notes. Since this is a beta, users upgrading from `2.0.x` should watch for configuration-reset reports such as [Issue #6957](https://github.com/agentscope-ai/QwenPaw/issues/6957).

## 3. Project Progress

Key merged/closed PRs in the last 24 hours:

- **#6956 — Revert "fix(chats): handle dict-like model responses (#6813)"** — [PR #6956](https://github.com/agentscope-ai/QwenPaw/pull/6956)  
  This reverts the earlier chat-response fix, meaning [Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) (`KeyError: '__aiter__'` on auto-title generation) may be effectively reopened until a replacement fix lands.

- **#6816 — fix(chats): handle dict-like model responses** — [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816)  
  Merged earlier, then reverted by #6956.

- **#6944 — chore: update release notes for v2.1.0** — [PR #6944](https://github.com/agentscope-ai/QwenPaw/pull/6944)

- **#6913 — fix(computer-use): improve macOS element activation** — [PR #6913](https://github.com/agentscope-ai/QwenPaw/pull/6913)

- **#6540 — fix(agents): sanitize tool messages before model calls** — [PR #6540](https://github.com/agentscope-ai/QwenPaw/pull/6540)  
  Fixes orphaned tool-result state that can break OpenAI-compatible providers.

Also shipped in the release: file preview/dark mode fix and `read_file` description correction (see Releases above).

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- **[#6853 — prompts.py lies to agents about Dream writing to MEMORY.md](https://github.com/agentscope-ai/QwenPaw/issues/6853)** — 5 comments  
  Users found that the memory prompt documents behavior that was never implemented. A fix PR is already open: [#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942).

- **[#6921 — Agent stops after “Let me do all three” with no prompt, needs user to say “继续”](https://github.com/agentscope-ai/QwenPaw/issues/6921)** — 5 comments  
  Multi-step agent runs stop after planning; no visible error or progress indicator. This is a core autonomy/reliability concern.

- **[#6780 — 2.0.1 freezes after idle for tens of minutes; must kill process](https://github.com/agentscope-ai/QwenPaw/issues/6780)** — 4 comments  
  Long-running desktop users report process-level deadlock.

- **[#6928 — History message scroll + input bar bug](https://github.com/agentscope-ai/QwenPaw/issues/6928)** — 4 comments

- **[#6826 — Assistant message end time shown incorrectly in chat history](https://github.com/agentscope-ai/QwenPaw/issues/6826)** — 4 comments  
  Fix PR open: [#6938](https://github.com/agentscope-ai/QwenPaw/pull/6938).

- **[#6839 — MCP tool calls pass numeric-looking strings as numbers, causing failures](https://github.com/agentscope-ai/QwenPaw/issues/6839)** — 4 comments  
  Fix PR open: [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936).

- **[#6924 — Custom channel plugin configuration entry missing since 2.0.x](https://github.com/agentscope-ai/QwenPaw/issues/6924)** — 4 comments

- **[#6847 — QwenPaw killed by antivirus while WorkBuddy is not](https://github.com/agentscope-ai/QwenPaw/issues/6847)** — 4 comments

## 5. Bugs & Stability

Ranked by severity:

**High**
- **Windows crashes / shutdown failure** — [Issue #6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) and [Issue #6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) both report frequent crashes on Windows via pip install. No fix PR yet.
- **Idle freeze** — [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780): QwenPaw becomes unresponsive after idle; process must be killed.
- **Agent stops mid-task without explanation** — [Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921): users must manually prompt “继续” to resume.
- **No auto-recovery after transient network interruptions** — [Issue #6932](https://github.com/agentscope-ai/QwenPaw/issues/6932): all LLM requests fail with `httpx.ConnectTimeout` until manual restart.
- **Chat auto-title regression risk** — The revert [PR #6956](https://github.com/agentscope-ai/QwenPaw/pull/6956) reopens [Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813).

**Medium-High**
- **Multi-subagent dead loops** — [Issue #6927](https://github.com/agentscope-ai/QwenPaw/issues/6927).
- **Inter-agent messages spawn new agent sessions** — [Issue #6918](https://github.com/agentscope-ai/QwenPaw/issues/6918): parallel “shadow instances” cause duplicate work.
- **Scroll compression hides prior chat history** — [Issue #6951](https://github.com/agentscope-ai/QwenPaw/issues/6951): compressed context replaces user-visible transcript.
- **History imported under random UUIDs** — [Issue #6926](https://github.com/agentscope-ai/QwenPaw/issues/6926): 18–50% rows orphaned, recall split/duplicated.

**Medium**
- **Daily notes grouped under wrong date** — [Issue #6883](https://github.com/agentscope-ai/QwenPaw/issues/6883); fix PR open: [#6941](https://github.com/agentscope-ai/QwenPaw/pull/6941).
- **MCP string parameters coerced to numbers** — [Issue #6839](https://github.com/agentscope-ai/QwenPaw/issues/6839); fix PR open: [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936).
- **Incorrect assistant completion time** — [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826); fix PR open: [#6938](https://github.com/agentscope-ai/QwenPaw/pull/6938).
- **Antivirus force-kills QwenPaw** — [Issue #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847).
- **Tool/plugin configurations reset after upgrade** — [Issue #6957](https://github.com/agentscope-ai/QwenPaw/issues/6957).
- **Admin console timestamps in UTC instead of configured timezone** — [Issue #6948](https://github.com/agentscope-ai/QwenPaw/issues/6948).

**Lower / UI**
- **Smart-mode sandbox write failure** — [Issue #6945](https://github.com/agentscope-ai/QwenPaw/issues/6945).
- **Long tool output collapsed into unreadable blob** — [Issue #6852](https://github.com/agentscope-ai/QwenPaw/issues/6852), closed in this window.

## 6. Feature Requests & Roadmap Signals

- **Agent-to-Inbox delivery** — [Issue #6917](https://github.com/agentscope-ai/QwenPaw/issues/6917): agents should be able to push arbitrary reports/messages into the Inbox, not only cron/heartbeat/memory tasks.
- **Single-window agent collaboration** — [Issue #6925](https://github.com/agentscope-ai/QwenPaw/issues/6925): collaborative agent sessions should live in one conversation, not spawn new sessions.
- **Folder-based conversations** — [Issue #6929](https://github.com/agentscope-ai/QwenPaw/issues/6929): closed request for using a folder as conversation context, with file preview and selected-content insertion.
- **Custom channel plugin configuration UI** — [Issue #6924](https://github.com/agentscope-ai/QwenPaw/issues/6924): users want parity with built-in channel config menus.
- **LongHorizon-Harness direction** — [Issue #6923](https://github.com/agentscope-ai/QwenPaw/issues/6923): suggestion for sustained multi-round tasks without state drift.
- **Plugin permission guardrails** — [Issue #6916](https://github.com/agentscope-ai/QwenPaw/issues/6916): security gap allowing plugins to silently create cron jobs and inject user-visible messages.

Likely next-beta candidates based on open fix PRs: memory prompt simplification ([#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942)), daily-note grouping ([#6941](https://github.com/agentscope-ai/QwenPaw/pull/6941)), assistant time display ([#6938](https://github.com/agentscope-ai/QwenPaw/pull/6938)), MCP string coercion ([#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936)), and scroll compression placeholder type ([#6947](https://github.com/agentscope-ai/QwenPaw/pull/6947)). Larger features such as MiniMax TTS ([#6954](https://github.com/agentscope-ai/QwenPaw/pull/6954)), DataPaw app runtime ([#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)), and per-session model overrides ([#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)) are also in flight.

## 7. User Feedback Summary

The current user base appears to be heavily using QwenPaw on Windows with both pip and Tauri installs, and a large share of reports are written in Chinese. Common pain points:

- **Stability on Windows** remains the biggest dissatisfaction driver: crashes, idle freezes, shutdown errors, and antivirus interference.
- **Agent autonomy is not reliable enough**: users frequently have to nudge the agent to continue, and multi-subagent runs can loop or spawn duplicate sessions.
- **Memory / transcript consistency matters**: users are frustrated by misleading memory prompts, compression hiding history, wrong date grouping, and split recall.
- **Upgrade friction** is a recurring complaint: plugin/tool configurations reset between versions, and custom channel plugin config UI regressed in 2.0.x.

No explicit praise was captured in the sampled data, but the detailed bug reports and active forum-style discussion indicate a technically engaged, fast-testing community.

## 8. Backlog Watch

Items that may need maintainer attention:

- **PR #5869 — expose system commands in slash autocomplete across all UIs** — [PR #5869](https://github.com/agentscope-ai/QwenPaw/pull/5869)  
  Opened 2026-07-08, still open/Under Review after more than a month.

- **PR #5992 — per-session model overrides** — [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)  
  Opened 2026-07-12, still open/Under Review.

- **PR #6623 — prevent ACP final text loss when notifications race prompt response** — [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)  
  Opened 2026-08-01, still open; affects ACP client reliability.

- **PR #6818 — summary should honor `disable_thinking` and interruption** — [PR #6818](https://github.com/agentscope-ai/QwenPaw/pull/6818)  
  Opened 2026-08-08, still open.

- **Issue #6780 — idle freeze in 2.0.1** — [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780)  
  Opened 2026-08-07, no visible fix PR yet.

- **Issue #6847 — antivirus force-terminates QwenPaw** — [Issue #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)  
  Opened 2026-08-09, no fix PR yet.

- **Issue #6916 — plugins can silently create cron jobs and inject messages** — [Issue #6916](https://github.com/agentscope-ai/QwenPaw/issues/6916)  
  Security issue with only 1 comment so far; needs maintainer triage.

- **Issue #6946 — release-duty verification for v2.1.0-beta.4** — [Issue #6946](https://github.com/agentscope-ai/QwenPaw/issues/6946)  
  Open with 0 comments despite the stated deadline having already passed.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-13

## 1. Today's Overview

ZeroClaw saw a very active 24-hour window: **50 issues and 50 PRs were updated**, with **45 issues open/active and 5 closed**, plus **30 PRs open and 20 merged/closed**. No new release shipped in this period. The project’s main pressure points are clear: cross-platform test reliability, security hardening (browser file writes, release attestation, credential rotation), and provider/runtime robustness. The volume of high-severity bug reports and accepted security trackers suggests the project is in a stability-focused phase, while several large feature PRs indicate continued roadmap investment.

## 2. Releases

No new releases were published in the last 24 hours. There are no release notes, breaking-change notes, or migration instructions to report for this digest.

## 3. Project Progress

The following merged/closed PRs represent the most notable completed work in the period:

- **[#9956 — fix(wechat): persist sync cursor only after inbound batch is enqueued](https://github.com/zeroclaw-labs/zeroclaw/pull/9956)**  
  Fixes a race where a crash or listener exit between reading a WeChat update batch and enqueueing it could advance the sync cursor before the batch was safely queued.

- **[#8496 — fix(tools/mcp): centralize deferred-MCP access policy](https://github.com/zeroclaw-labs/zeroclaw/pull/8496)**  
  Closes the deferred-MCP access-policy gap by making `DeferredMcpToolSet::filter_by_policy` the single source of truth for prompt discovery and tool-search surfaces.

- **[#9362 — fix(browser): validate screenshot destination path against workspace policy](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)**  
  Fixes an arbitrary-file-write escape in the browser `screenshot` action. A related earlier PR, [#8741](https://github.com/zeroclaw-labs/zeroclaw/pull/8741), was also closed.

- **[#9695 / #9037 — fix(runtime): strip terminal markers from streamed and non-streamed responses](https://github.com/zeroclaw-labs/zeroclaw/pull/9695)**  
  Prevents `<eom>` / `<|eom|>` markers from leaking into transcripts, persisted history, and downstream channel delivery.

Closed issues in the same period also show completed work:

- **[#9340 — CLI-created cron jobs cannot deliver output](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)** — closed; delivery mode is no longer silently hardcoded to `none`.
- **[#9684 — zerocode SOP pane live run-status icons](https://github.com/zeroclaw-labs/zeroclaw/issues/9684)** — closed; SOP status icons shipped.
- **[#9796 — cron parent help invalid examples](https://github.com/zeroclaw-labs/zeroclaw/issues/9796)** — closed; CLI help examples corrected.

## 4. Community Hot Topics

Most-discussed issues in the last 24 hours:

- **[#7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 14 comments  
  Unix-only test commands, path semantics, and console encoding failures on Windows 11 Simplified Chinese / code page 936. Underlying need: a real cross-platform CI strategy.

- **[#8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 13 comments  
  Community interest in a transparent, tracked queue for RFC/design/release-policy decisions. This is a governance bottleneck signal.

- **[#8832 — Plugin-owned Kanban board for agent work](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** — 9 comments  
  Opt-in Kanban as a plugin-owned domain on host-owned capabilities. Signals demand for higher-level agent coordination primitives.

- **[#9101 — Consolidate release attestation mechanisms](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)** — 9 comments  
  Three parallel signing/provenance mechanisms shipped in v0.8.3; community supports one signing story with ~20 assets instead of 53.

- **[#6653 — Define host-architecture policy for emulated installs](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)** and **[#7929 — Unify slash-command registries](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)** — 7 comments each  
  Architecture consistency work: install/update behavior for emulated targets, and slash-command drift across web UI, ZeroCode TUI, and channel runtime.

On the PR side, the largest active discussions/efforts revolve around:

- **[#9109 — feat(providers): native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — large provider-facing addition.
- **[#9002 — fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)** — p1 gateway reliability.
- **[#9419 — fix(providers): rotate live credentials after rate limits](https://github.com/zeroclaw-labs/zeroclaw/pull/9419)** — p2/high-risk reliability hardening.
- **[#9403 — fix(plugins): bound WASM exports by wall-clock deadline](https://github.com/zeroclaw-labs/zeroclaw/pull/9403)** — p1 plugin runtime safety.

## 5. Bugs & Stability

Bugs ranked by reported severity/priority:

1. **[#9207 — web_fetch returns garbage for compressed responses](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)**  
   **S1 / p1 / in-progress** — gzip, brotli, and deflate responses are returned as unparsable binary data, blocking agents from fetching common sites.

2. **[#7527 — macOS desktop app can reopen blank or without a window](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)**  
   **S1 / p1 / r:needs-repro** — workflow blocked after install/permission issues; maintainers still need reproduction details.

3. **[#9290 — Windows desktop installer fails at launch with missing TaskDialogIndirect](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)**  
   **S1 / p1 / accepted** — freshly installed ZeroClaw desktop cannot start on Windows.

4. **[#7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**  
   **S2 / p1 / accepted** — CI only runs Linux, so Windows regressions ship unnoticed. Related feature request: [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461).

5. **[#9899 — RUSTSEC-2026-0247 bitmaps advisory waiver](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)**  
   **p1 / blocked tracker** — `cargo deny check` is failing via `imbl` → Matrix SDK dev-dependencies; needs triage and removal of the advisory waiver.

6. **[#7872 — QQ group replies need msg_id for passive reply sends](https://github.com/zeroclaw-labs/zeroclaw/issues/7872)**  
   **p1 / accepted tracker** — partial fix merged via #9180; tracker remains open.

7. **[#9198 — Discord typing indicator stuck after daemon reload](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)**  
   **S3 / p2 / accepted** — stale “agent is typing…” state persists until restart.

8. **[#9202 — `zeroclaw desktop` uses dead download URL and misses installed AppImage](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)**  
   **S3 / p2 / in-progress** — Linux desktop detection and docs are stale.

Security-focused fixes landed in this cycle for browser screenshot path traversal ([#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)), terminal marker leakage ([#9695](https://github.com/zeroclaw-labs/zeroclaw/pull/9695)), and WeChat sync-cursor durability ([#9956](https://github.com/zeroclaw-labs/zeroclaw/pull/9956)).

## 6. Feature Requests & Roadmap Signals

Accepted/open feature work likely to shape the next releases:

- **Cross-platform CI**: [#7461 — Run test suite on Windows and macOS](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) and [#7910 — Windows runtime test coverage for self-update paths](https://github.com/zeroclaw-labs/zeroclaw/issues/7910).
- **Web search reliability**: [#5316 — Complete SearXNG configuration and web-search failure recovery](https://github.com/zeroclaw-labs/zeroclaw/issues/5316).
- **Agent/coding experience**: [#5907 — Opt-in LSP support for ZeroCode workflows](https://github.com/zeroclaw-labs/zeroclaw/issues/5907), [#8078 — zerocode local pre-submission gate](https://github.com/zeroclaw-labs/zeroclaw/issues/8078).
- **Memory architecture**: [#6998 — Schema-validated memory consolidation with bounded fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/6998), [#9644 — Retire the Lucid memory connector at v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/issues/9644).
- **Release/security governance**: [#9101 — Consolidate release attestation mechanisms](https://github.com/zeroclaw-labs/zeroclaw/issues/9101), [#9507 — Enforce crate dependency direction with one declarative CI gate](https://github.com/zeroclaw-labs/zeroclaw/issues/9507).
- **Plugin/user coordination**: [#8832 — Plugin-owned Kanban board for agent work](https://github.com/zeroclaw-labs/zeroclaw/issues/8832), [#9694 — zerocode SOP pane as read-only status view](https://github.com/zeroclaw-labs/zeroclaw/pull/9694).

In-flight feature PRs likely to land soon include:

- [#9109 — Hailo-Ollama native provider](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)
- [#9556 — Langfuse observer backend](https://github.com/zeroclaw-labs/zeroclaw/pull/9556)
- [#9194 — KeySource trait + FileKeySource backend](https://github.com/zeroclaw-labs/zeroclaw/pull/9194)
- [#8337 — herdr agent reporting integration](https://github.com/zeroclaw-labs/zeroclaw/pull/8337)
- [#9196 — MCP resource blob materialization with aggregate budget preflight](https://github.com/zeroclaw-labs/zeroclaw/pull/9196)

Given the v0.9.0 retirement deadline in [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644), the next minor release is likely to include memory-connector cleanup, provider additions, and the merged observability/security hardening items.

## 7. User Feedback Summary

User pain points in this cycle are concentrated on cross-platform reliability and silent failures:

- Windows users report a **broken test suite** on Simplified Chinese / code page 936 environments ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)) and a **Windows desktop installer that cannot launch** ([#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)).
- macOS users report a **blank or missing desktop window** after launch/permission issues ([#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)).
- Agents are **blocked by `web_fetch` returning binary garbage** for compressed HTTP responses ([#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)).
- There is frustration about **silent output loss**: CLI-created cron jobs ran successfully but discarded all output because delivery was hardcoded to `none` ([#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340), now closed).
- Discord users hit a **stuck typing indicator** after dashboard daemon reloads ([#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)).
- Linux desktop users hit a **dead download URL and undetected AppImage** in `zeroclaw desktop` ([#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)).
- Contributors also expressed a need for **clearer release provenance** ([#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)) and a **transparent maintainer decision queue** ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)), indicating good community investment in governance but also some process frustration.

Overall, users value the project’s ambitious agent/plugin roadmap but are sensitive to stability gaps on non-Linux platforms and to “silent success” bugs where work appears to complete but results are lost.

## 8. Backlog Watch

Items that appear to need maintainer attention or author follow-up:

- **[#5907 — Opt-in LSP support for ZeroCode coding workflows](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)**  
  Created Apr 19, `needs-author-action`, p2/risk:high. Long-standing developer-experience request.

- **[#6653 — Host-architecture policy for emulated installs](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)**  
  Created May 14, `needs-author-action`, p3/medium. Original problem superseded, but a narrower scenario remains unresolved.

- **[#6998 — Schema-validated memory consolidation with bounded fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)**  
  Created May 29, `needs-maintainer-review`, p2/risk:high. Maintainer review is the next required step.

- **[#7527 — macOS desktop app blank/no window](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)**  
  Created Jun 12, `r:needs-repro`, p1/risk:high. Blocked on reproduction information from the reporter.

- **[#7929 — Unify slash-command registries across web UI, ZeroCode TUI, and channel runtime](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)**  
  Created Jun 18, `needs-author-action`, p2/risk:high. Cross-surface drift remains unfixed.

- **[#8367 — Derived capability readiness for agent guidance](https://github.com/zeroclaw-labs/zeroclaw/issues/8367)**  
  Created Jun 26, `status:blocked`, p3/risk:high.

- **[#9323 — Define execution-tree iteration budget ownership](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)**  
  Created Jul 24, `needs-author-action`, p2/risk:high. `ToolLoop.shared_budget` is currently unused by production roots.

- **[#9644 — Retire the Lucid memory connector at v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/issues/9644)**  
  Created Aug 1, `needs-author-action`, p2/risk:high. Time-sensitive because the retirement target is v0.9.0.

- **[#9899 — Triage/remove RUSTSEC-2026-0247 bitmaps advisory waiver](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)**  
  Created Aug 10, `status:blocked`, p1. Security CI is currently failing; should be prioritized.

- **[PR #9002 — fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)**  
  p1, `needs-maintainer-review`, risk:high. Important user-facing gateway reliability fix waiting on review.

- **[PR #9194 — feat(secrets): extract KeySource trait + FileKeySource backend](https://github.com/zeroclaw-labs/zeroclaw/pull/9194)**  
  p2, `needs-author-action`, risk:high, size:XL. Large security-adjacent refactor awaiting follow-up.

The most urgent backlog items are the **failing Security CI from #9899**, the **S1 web_fetch regression #9207**, and the **p1 gateway reviewer bottleneck #9002**.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*