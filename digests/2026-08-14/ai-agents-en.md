# OpenClaw Ecosystem Digest 2026-08-14

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-14 02:00 UTC

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

## 1. Today's Overview

On 2026-08-14, OpenClaw shows very high activity: 500 issues and 500 PRs were updated in the last 24 hours, with 162 issues closed and 114 PRs merged/closed in that window. No new release was published. The visible issue sample is dominated by long-running reliability bugs — especially silent reply failures, subagent completion loss, and channel routing/blocking — while maintainers continue landing UI, plugin, upgrade, and security fixes. Overall project health is active but strained: community engagement is strong, but several P1 / “diamond lobster” issues have remained in maintainer/product review for weeks or months.

## 2. Releases

No new releases were published on 2026-08-14.

## 3. Project Progress

The full set of 114 merged/closed PRs is not enumerated in the provided top-30 sample, but the visible closed PRs are:

- [fix(ui): keep composer pickers visible near viewport edges](https://github.com/openclaw/openclaw/pull/123386) — UI/composer fix for control panel pickers clipping outside the viewport.
- [fix: install externalized configured plugins during upgrades](https://github.com/openclaw/openclaw/pull/123399) — stops packaged upgrades from losing configured companion plugin installs.
- [fix(skills): keep shared skill roots safe during collection review](https://github.com/openclaw/openclaw/pull/123374) — prevents skill-workshop review from following symlinked shared roots into unsafe rewrites/renames.

Notable issue closures visible in the sample:

- [backup create stalls on large installations](https://github.com/openclaw/openclaw/issues/42273) — closed as already fixed.
- [Browser tool: 7 improvements from field test](https://github.com/openclaw/openclaw/issues/44431) — closed.
- [Agent’s final agent_message stranded when LLM forgets configured delivery tool](https://github.com/openclaw/openclaw/issues/85714) — closed.
- [Telegram DM lane can remain guarded after send timeout](https://github.com/openclaw/openclaw/issues/91456) — closed.
- [All exec command outputs rendered as images instead of text](https://github.com/openclaw/openclaw/issues/105342) — closed.
- [Model fallback reply produced but never delivered](https://github.com/openclaw/openclaw/issues/121605) — closed, P1/diamond regression.

## 4. Community Hot Topics

The most active issues by comment count are almost all reliability- or safety-related:

- [Silent reply failures still recurring after #116277 closed — no queued reply payload](https://github.com/openclaw/openclaw/issues/121058) — 92 comments. The hottest issue by far; users report the same failure mode persisting even after the previous fix was closed.
- [Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — 48 comments. Community is concerned about memory poisoning from untrusted web/content sources.
- [Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) — 48 comments, P1/diamond. Internal processing narration is being visibly sent to Slack/iMessage/etc.
- [Subagent completion silently lost — no retry, no notification, no auto-restart on timeout](https://github.com/openclaw/openclaw/issues/44925) — 27 comments, 2 👍. Strong demand for durable subagent result delivery.
- [Cron agent turns stall on DeepSeek — `[cron:<jobId> <name>]` prefix is deprioritized](https://github.com/openclaw/openclaw/issues/121953) — 16 comments, P1.
- [Isolated cron consistently fails with “LLM request failed”](https://github.com/openclaw/openclaw/issues/91363) — 10 comments, 6 👍; the most-reacted issue in the sample.

Underlying needs: users want delivery guarantees, subagent result durability, trustworthy memory, reliable cron execution across third-party models, and better visibility into silent failures.

## 5. Bugs & Stability

High-severity issues active/updated in the last 24 hours:

| Severity | Issue | Fix PR? |
|---|---|---|
| Hot / recurring | [Silent reply failures recurring after closed fix](https://github.com/openclaw/openclaw/issues/121058) | No fix PR visible in sample; prior fix #116277 did not fully resolve |
| P1 / diamond | [Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) | Labels indicate a linked open PR exists |
| P1 / diamond | [Subagent completion silently lost on timeout/drain/orphan prune](https://github.com/openclaw/openclaw/issues/67777) / [steered announce dropped before requester processes it](https://github.com/openclaw/openclaw/issues/92433) | No fix PR visible in sample |
| P1 / diamond | [iOS/WebChat messages append but do not trigger replies](https://github.com/openclaw/openclaw/issues/97983) | No fix PR visible in sample |
| P1 / diamond | [Schema downgrade recovery wipes state DB / cron jobs](https://github.com/openclaw/openclaw/issues/115421) | Labels indicate a linked open PR exists |
| P1 / diamond | [Heartbeat drift fix causes aggressive retry, blocks Telegram](https://github.com/openclaw/openclaw/issues/40611) | No fix PR visible in sample |
| P1 / diamond | [Telegram DMs still pollute agent:main:main](https://github.com/openclaw/openclaw/issues/41165) | Labels indicate a linked open PR exists |
| P1 / diamond | [Session lane starvation after followup drain](https://github.com/openclaw/openclaw/issues/54488) | No fix PR visible in sample |
| P1 / diamond | [active-memory blocks replies / QMD boot overload](https://github.com/openclaw/openclaw/issues/72015) | No fix PR visible in sample |
| P1 / diamond | [sudo openclaw update creates mixed ownership; doctor overwrites config](https://github.com/openclaw/openclaw/issues/78493) | No fix PR visible in sample |
| P1 / platinum | [Codex OAuth refresh succeeds but cron/heartbeat fails with 10s timeout](https://github.com/openclaw/openclaw/issues/89278) | Labels indicate a linked open PR exists |
| P1 / silver | [Cron stalls on DeepSeek due to prefix deprioritization](https://github.com/openclaw/openclaw/issues/121953) | Labels indicate a linked open PR exists |
| P1 / gold | [Unreaped hook/tool child processes → zombie accumulation](https://github.com/openclaw/openclaw/issues/97616) | No fix PR visible in sample |
| P2 / platinum | [Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) | No fix PR visible in sample |
| P2 / diamond | [SQLite memory tables unbounded growth](https://github.com/openclaw/openclaw/issues/114612) | No fix PR visible in sample |

Also notable: [dev-channel update fails with `EUNSUPPORTEDPROTOCOL` on workspace:*](https://github.com/openclaw/openclaw/issues/123073), a fresh P1/diamond issue preventing dev-channel installs from updating.

## 6. Feature Requests & Roadmap Signals

Strong feature signals from the last 24 hours include:

- [Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — security/trust for memory entries.
- [Text between tool calls should not leak to channels](https://github.com/openclaw/openclaw/issues/25592) — a bug, but effectively a UX/architecture feature request for output routing.
- [Built-in pace-aware rate limiting for autonomous agents](https://github.com/openclaw/openclaw/issues/45771).
- [Support YAML as config file format](https://github.com/openclaw/openclaw/issues/45758).
- [Expose OpenRouter usage cost to agent runtime](https://github.com/openclaw/openclaw/issues/9016).
- [Self-hosted STT/TTS provider support in webchat](https://github.com/openclaw/openclaw/issues/45508).
- [TTL/expiry for delivery queue messages](https://github.com/openclaw/openclaw/issues/16555).
- [Sessions panel sort by last meaningful activity](https://github.com/openclaw/openclaw/issues/51028).
- [Configurable `session.resetPrompt` startup message](https://github.com/openclaw/openclaw/issues/45501).
- [TUI `--deliver` default config support](https://github.com/openclaw/openclaw/issues/33102).
- [Graduated crash recovery ladder for gateway](https://github.com/openclaw/openclaw/issues/79165).

Likely near-term roadmap candidates are already in open PRs, including:

- [feat(anthropic): opt-in server-side compaction](https://github.com/openclaw/openclaw/pull/123402) — could meaningfully improve long-session reliability and prompt-cache behavior.
- [feat(secrets): authenticated egress substitution proxy with destination binding](https://github.com/openclaw/openclaw/pull/123216).
- [fix(memory): complete Phase 1C read isolation](https://github.com/openclaw/openclaw/pull/121945).
- [fix(plugins): bundledDiscovery compat should not disable all bundled plugins](https://github.com/openclaw/openclaw/pull/123416).

## 7. User Feedback Summary

Real user pain points visible in this snapshot:

- **Delivery reliability is the biggest frustration.** The 92-comment issue [#121058](https://github.com/openclaw/openclaw/issues/121058) shows users still seeing silent reply failures after a fix was marked closed.
- **Subagent orchestration is fragile.** Users report silently lost completions, sessions persisting after completion, and main sessions becoming unresponsive ([#44925](https://github.com/openclaw/openclaw/issues/44925), [#67777](https://github.com/openclaw/openclaw/issues/67777), [#47975](https://github.com/openclaw/openclaw/issues/47975)).
- **Channel-specific regressions are common:** Telegram DM routing ([#41165](https://github.com/openclaw/openclaw/issues/41165)), Discord routing/mention gating ([#44502](https://github.com/openclaw/openclaw/issues/44502)), and iOS/WebChat non-delivery ([#97983](https://github.com/openclaw/openclaw/issues/97983)).
- **Memory and data management concerns are growing:** inconsistent memory behavior ([#43747](https://github.com/openclaw/openclaw/issues/43747)) and unbounded SQLite growth ([#114612](https://github.com/openclaw/openclaw/issues/114612)).
- **Operational friction is real:** `sudo openclaw update` ownership problems ([#78493](https://github.com/openclaw/openclaw/issues/78493)), dev-channel pnpm/update failure ([#123073](https://github.com/openclaw/openclaw/issues/123073)), and zombie process accumulation ([#97616](https://github.com/openclaw/openclaw/issues/97616)).
- **On the positive side:** users are filing detailed field reports and use cases, and maintainers are responding with a high volume of PRs and issue closures. The project has strong community investment, but users are clearly pressure-testing reliability at production scale.

## 8. Backlog Watch

Issues that have been flagged for maintainer/product/security review and have remained open for a long time:

- [Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — created 2026-02-03; 48 comments; needs maintainer review + product decision + security review.
- [Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) — created 2026-02-24; P1/diamond; 48 comments; needs maintainer/product/security review.
- [Heartbeat drift fix blocks Telegram during active conversations](https://github.com/openclaw/openclaw/issues/40611) — created 2026-03-09; P1/diamond; no fix PR visible.
- [Telegram DMs still pollute agent:main:main](https://github.com/openclaw/openclaw/issues/41165) — created 2026-03-09; P1/diamond; linked PR reportedly open.
- [Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) — created 2026-03-12; P2/platinum regression; still needs maintainer/product decision.
- [Session lane starvation after followup drain](https://github.com/openclaw/openclaw/issues/54488) — created 2026-03-25; P1/diamond; needs maintainer/product decision.
- [sudo openclaw update creates mixed ownership, then doctor overwrites config](https://github.com/openclaw/openclaw/issues/78493) — created 2026-05-06; P1/diamond; no fix PR visible.
- [Graduated crash recovery ladder for gateway](https://github.com/openclaw/openclaw/issues/79165) — created 2026-05-08; P2/diamond; needs maintainer/product/security review.

Backlog PR watch:

- [feat(plugin-sdk): re-export StatusSummary, SessionStatus, and HeartbeatStatus](https://github.com/openclaw/openclaw/pull/77184) — open since 2026-05-04, still in “needs proof” status despite supplied proof labels.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — AI Agent / Personal Assistant Open-Source Ecosystem
**Date:** 2026-08-14

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a reliability-hardening phase: the dominant themes across all active projects are delivery guarantees, session/memory integrity, and production-grade orchestration. Projects are converging on layered architectures (gateway → kernel → channel adapters → memory → tools) while differentiating on deployment model (local-first vs. cloud-hosted), primary interface (TUI/Desktop/WebUI), and language runtime (TypeScript vs. Rust vs. Go). Community pressure is shifting from feature velocity toward trust: users are demanding durable subagent execution, no silent failures, auditable memory, and secure supply chains. The ecosystem remains healthy but strained — several P1 regressions have persisted for weeks in the largest projects, while smaller projects ship fixes within 24 hours.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Release Status | Health Score (1–10) |
|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | No release | **5/10** — Very high volume, but hot P1s unresolved for weeks (silent reply failures, 92 comments) |
| **ZeroClaw** | 50 | 50 | No release (v0.9.0 hardening) | **7/10** — Security fixes landing; several accepted features blocked on author/maintainer action |
| **Hermes Agent** | 50 | 50 | **v0.20.1** (656 PRs rolled up) | **6/10** — New patch release, but P1 desktop/gateway kill regression cluster (6+ issues) |
| **IronClaw** | 50 | 50 | **ironclaw-v1.2.0** (stable) | **8/10** — Stable promotion, active Reborn architecture work, responsive bug fixes |
| **CoPaw / QwenPaw** | 43 | 50 | **v2.1.0** (OS Shell) | **7/10** — Two releases, fast merges; mid-task silent stops and antivirus conflicts remain open |
| **NanoBot** | 11 | 31 | No release | **8/10** — Excellent fix turnaround (cron fix PRs within a day); small issue surface |
| **NanoClaw** | 2 | 19 | **v2.2.0** (Agent Plugins) | **8/10** — High core-team throughput; long-pending community PRs |
| **LobsterAI** | 2 | 11 | No release | **6/10** — UI consolidation healthy; 4.5-month-old PRs still open |
| **Moltis** | 1 | 4 | No release | **5/10** — Fix PRs ready but unmerged; upstream dependency drift blocking builds |
| **PicoClaw** | 3 | 9 | No release | **5/10** — Dependabot-only activity; UX bug unresolved since July 21; stale lockfile fix |
| **NullClaw** | 0 | 0 | — | N/A (inactive) |
| **ZeptoClaw** | 0 | 0 | — | N/A (inactive) |

*Note: Health score weighs bug-fix responsiveness, severity of open issues, release cadence, and maintainer review throughput, not raw volume.*

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Largest community and issue surface** (500 issues/PRs updated in 24h) — strongest contributor pipeline and field-test feedback loop; effectively the ecosystem's reference implementation.
- **Broadest channel coverage** (Telegram, Slack, iMessage, Discord, iOS/WebChat) with a plugin system that peers emulate (LobsterAI builds directly on OpenClaw's integration layer; NanoClaw and ZeroClaw mirror template/plugin concepts).
- **Delivery-queue and lane architecture** is the most sophisticated in the ecosystem, even though it is currently the source of its hottest bugs — once stabilized, it remains the strongest foundation for multi-channel reliability.

**Technical approach differences:**
- OpenClaw is **channel-agnostic by design** with an explicit delivery-queue/gateway abstraction; IronClaw instead adopts a **kernel + pluggable harness** model (ACP), and Hermes builds around **Desktop-app-supervised gateways**.
- OpenClaw's TypeScript/Node plugin ecosystem contrasts with IronClaw's and ZeroClaw's Rust-based kernels and PicoClaw's Go runtime — offering a lower barrier to community contribution at the cost of some runtime robustness.

**Community size comparison:**
- OpenClaw has the largest visible community (92-comment threads, hundreds of daily updates); Hermes and QwenPaw show strong but smaller communities (QwenPaw ~33.7k stars per its own issue); IronClaw and NanoBot have smaller, more technical user bases that produce high-quality field reports (e.g., IronClaw Champions testers).

**Verdict:** OpenClaw remains the ecosystem anchor, but its reliability debt (silent reply failures, subagent loss) creates an opening for faster-moving peers. Its next fix for #121058 will be a bellwether.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Delivery guarantees / no silent failures** | OpenClaw, NanoBot, CoPaw, Hermes | Queued reply payloads, delivery TTLs, retry semantics, visibility into dropped messages |
| **Subagent / multi-step execution durability** | OpenClaw, CoPaw, NanoBot | Completion persistence, timeout recovery, no silent mid-task stops, server-side iteration limits |
| **Memory trust & lifecycle** | OpenClaw, IronClaw, ZeroClaw, NanoBot, CoPaw | Source-based trust tagging, cross-session recall reliability, memory policy decoupled from storage, truthful memory prompts |
| **Cron / scheduled task reliability** | OpenClaw, NanoBot, Hermes, LobsterAI | Job-store failure resilience, per-run session isolation, model-prefix handling, UI feedback for first runs |
| **Provider compatibility & cost** | OpenClaw, Hermes, ZeroClaw, CoPaw, PicoClaw | DeepSeek transport quirks, OpenRouter stable `session_id` for prompt caching, MCP schema byte budgeting, model override per subtask |
| **Session persistence & context integrity** | OpenClaw, ZeroClaw, NanoBot, CoPaw | Lane starvation fixes, durable session stores before breaking changes, compaction preserving user-visible history, concurrent-reader safety |
| **Security hardening** | NanoBot, NanoClaw, ZeroClaw, CoPaw | Shell-chain bypass prevention, CSPRNG pairing codes, unauthenticated pairing lockout, antivirus false positives, supply-chain image verification |
| **Headless / remote operation** | CoPaw, IronClaw, Hermes | True daemon mode, server deployment + thin client proxy, local-file bridge for cloud installs |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architectural Signature |
|---|---|---|---|
| **OpenClaw** | Multi-channel personal AI gateway | Power users, self-hosters, plugin developers | Delivery-queue + lane routing; TypeScript/Node plugin ecosystem |
| **Hermes Agent** | Desktop-integrated assistant | Desktop-first professionals (macOS/Windows) | Desktop app supervising messaging gateways; TUI; Teams/Slack/WeChat |
| **IronClaw** | Agent kernel + pluggable harnesses | Developers/cloud users (NEAR AI) | Rust kernel, WASM tool sandbox, ACP executor, thread-as-unit-of-work |
| **ZeroClaw** | Secure, policy-driven assistant | Security-conscious self-hosters | Rust; RFC-driven design; SOP permission contracts; verifiable-intent |
| **CoPaw / QwenPaw** | Desktop automation + OS shell | Chinese-language automation users | QwenPaw OS Shell (windowing); Mission Mode; cloud token plans (Bailian) |
| **NanoBot** | Lightweight WebUI + MCP hub | Developers wanting a small, hackable agent | WebUI-centric; MCP schema budgeting; Matrix/Telegram adapters |
| **NanoClaw** | Agent templates & supply-chain integrity | Teams using OneCLI workflows | Agent Plugins 1.0 format; image verification gates; CI-signature approvals |
| **LobsterAI** | UI/UX companion layer | End users of OpenClaw-based assistants | Unified skills/MCP/cowork UI; enterprise edition; gamification |
| **PicoClaw** | Minimal Go agent with rich I/O | Resource-constrained / simple deployments | Go binary; Web UI; Whisper transcription |
| **Moltis** | Durable history connectors | Data-oriented agent/infra builders | CalDAV + channel history datasets; provider-neutral persistence |
| **NullClaw / ZeptoClaw** | — (inactive) | — | — |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapidly iterating (high risk/high reward):**
- **OpenClaw** — Massive throughput, but churning on core reliability; the 92-comment recurring failure is a credibility risk.
- **Hermes Agent** — Shipping releases (v0.20.1, 656 PRs) while burning down a Desktop/gateway regression cluster; momentum strong.
- **IronClaw** — Most architecturally aggressive: v1.2.0 stable + Reborn epic decomposition into executable workstreams. Healthy balance of feature and stability work.
- **ZeroClaw** — Deep v0.9.0 hardening; excellent security fix cadence, but blocked accepted-items indicate review bottleneck.
- **CoPaw / QwenPaw** — Fast feature velocity (v2.1.0 OS Shell) with a strong Chinese community; trust issues (silent stops, security reports) are the gating factor.

**Tier 2 — Stabilizing with steady throughput:**
- **NanoBot** — Best bug-fix responsiveness per issue volume; clear near-term roadmap (MCP budgeting, Telegram stickers, Matrix SAS).
- **NanoClaw** — Core-team velocity very high (13 PRs closed/merged); community PR backlog is the weak spot.

**Tier 3 — Consolidation / moderate activity:**
- **LobsterAI** — UI unification indicates product maturation; 4.5-month-old test PRs should be triaged.
- **Moltis** — Healthy but stalled on review; upstream rename broke builds, fix PRs await merge.
- **PicoClaw** — Maintenance-mode cadence (Dependabot only); one UX bug and one build breakage need attention.

**Tier 4 — Inactive:**
- **NullClaw, ZeptoClaw** — No activity in 24h window.

---

## 7. Trend Signals

**Industry trends extracted from community feedback:**

1. **"Never silently fail" is the new baseline.** Across OpenClaw, NanoBot, CoPaw, and Hermes, users consistently report that silent mid-task stops, dropped replies, and lost subagent results are more damaging than slow performance. Delivery guarantees (queues, TTLs, retries, visible error surfaces) are becoming a competitive requirement, not a nice-to-have.

2. **Memory is a trust surface.** Multiple independent communities (OpenClaw, IronClaw, ZeroClaw, CoPaw) are pushing for source-tagged memory, truthful memory documentation, and decoupled storage/lifecycle policy. Users are treating the memory store as an attack surface for prompt injection, not just a database.

3. **Subagent orchestration is the next scalability wall.** As agents attempt multi-step tasks, projects are hitting the same failure modes: lost completion events, unbounded child sessions (CoPaw's 54-sub-session bug), no retry on timeout. Server-side iteration caps and durable completion delivery are emerging as standard patterns.

4. **Provider agnosticism is a hard requirement.** DeepSeek incompatibilities (Hermes, OpenClaw), NEAR AI Cloud 500s (IronClaw), and bailian token plans (CoPaw) show users expect pluggable providers with identical semantics. Cost optimization (OpenRouter `session_id`, MCP schema budgeting) is directly tied to provider strategy.

5. **Cost-awareness is moving into architecture.** Byte-budgeting MCP schemas (NanoBot), prompt-cache-friendly session IDs (ZeroClaw), and heartbeat model-override isolation (NanoBot) indicate the ecosystem is treating token cost as a first-class architectural constraint.

6. **Supply-chain security is mainstreaming.** NanoClaw's agent-image verification, ZeroClaw's pairing-lockout fix, NanoBot's shell-chain bypass closure, and CoPaw's public security scrutiny all point to a maturing ecosystem where CI/CD trust and secure-by-default pairing are baseline expectations.

7. **Local-first + cloud-bridged is the unresolved split.** Cloud-hosted users want local file/MCP bridges (IronClaw #2117); desktop users want headless/daemon modes (CoPaw #7010); server users want thin proxies (CoPaw #7002). The winning architecture will likely treat the agent core as a headless service with interchangeable thin UIs.

**Value for AI agent developers:** prioritize delivery-queue durability, subagent result persistence, memory provenance, and per-provider compatibility shims. Projects that close these gaps fastest — NanoBot's 24-hour fix cycle and IronClaw's architecture-first approach are instructive — will outpace peers regardless of feature breadth.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-14

## 1. Today's Overview

NanoBot saw a high level of maintenance activity in the last 24 hours: 11 issues were updated (10 open, 1 closed) and 31 PRs were updated (22 open, 9 merged/closed). No new releases were published. The project is in a responsive bug-fixing and feature-building phase: critical cron/session integrity bugs received fix PRs within a day, while feature PRs for MCP schema budgeting, Telegram stickers, MCP Apps metadata, Matrix SAS flow, and WebUI collaboration are actively moving. Several long-open PRs from late June were closed today, indicating the maintainers are also working through backlog. Overall, project health looks strong, with attention split between correctness/stability work and expanding channel/tooling capabilities.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

Merged/closed PRs updated today include several notable fixes and features:

- **Native WebUI workspace folder picker** — closed PR [#5381](https://github.com/HKUDS/nanobot/issues/5381): adds macOS/Windows/Linux folder selection for local WebUI sessions, with loopback-only advertising.
- **Transcript-only session history restored** — closed PR [#5384](https://github.com/HKUDS/nanobot/issues/5384): re-enables sidebar discovery and deletion of display transcripts without canonical session JSONL files.
- **Cron scheduler resilience fixes** — closed PRs [#5374](https://github.com/HKUDS/nanobot/pull/5374) and [#5375](https://github.com/HKUDS/nanobot/pull/5375): prevent a single job-store persistence failure from permanently killing the scheduler.
- **Dream consolidation model_override** — closed PR [#4556](https://github.com/HKUDS/nanobot/pull/4556): applies `DreamConfig.model_override` during periodic memory consolidation.
- **Per-run cron session isolation** — closed PR [#4550](https://github.com/HKUDS/nanobot/pull/4550): stops cron jobs from reusing the same session key and leaking context across runs.

The security issue around `exec.allowPatterns` shell-chain bypass ([#5306](https://github.com/HKUDS/nanobot/issues/5306)) was also closed.

## 4. Community Hot Topics

The most active issues in the last 24 hours, ranked by comment activity (all have one comment; no reaction data is available):

- [#5373](https://github.com/HKUDS/nanobot/issues/5373) — **Cron scheduler dies permanently after job-store persistence failure**: a single error stops all future execution. This resonated because it is a silent, production-impacting failure mode.
- [#5298](https://github.com/HKUDS/nanobot/issues/5298) — **Budget model-visible MCP schemas for large tool sets**: users are concerned about context cost when many MCP tools are registered.
- [#5289](https://github.com/HKUDS/nanobot/issues/5289) — **Telegram sticker support and agent-initiated reactions**: current Telegram integration treats stickers as opaque/empty messages.
- [#5251](https://github.com/HKUDS/nanobot/issues/5251) — **MCP Apps host support in WebUI**: MCP call results are currently model/text-oriented, not rich app/UI artifacts.
- [#4841](https://github.com/HKUDS/nanobot/issues/4841) — **Matrix bot device shows as untrusted**: cross-signing and SAS verification gaps create user friction in Element.
- [#5366](https://github.com/HKUDS/nanobot/issues/5366) — **WebUI Agent activity text is not localized**: users want agent activity messages to follow the WebUI language selection.
- [#5306](https://github.com/HKUDS/nanobot/issues/5306) — **Security: `exec.allowPatterns` shell-chain bypass**: closed, but shows active community security auditing.

The underlying needs are consistent: better reliability under failures, lower LLM context overhead, richer channel integrations, and improved trust/verification flows.

## 5. Bugs & Stability

Multiple bugs were reported or addressed today, ranked by severity:

| Severity | Issue / Bug | Status / Fix |
|---|---|---|
| **Critical** | [#5306](https://github.com/HKUDS/nanobot/issues/5306): `exec.allowPatterns` shell-chain bypass allows unintended command execution | Closed; security fix handling not fully detailed in this data |
| **Critical** | [#5373](https://github.com/HKUDS/nanobot/issues/5373): Cron scheduler dies permanently after one job-store persistence failure | Fix PRs: [#5374](https://github.com/HKUDS/nanobot/pull/5374), [#5375](https://github.com/HKUDS/nanobot/pull/5375) closed; [#5376](https://github.com/HKUDS/nanobot/pull/5376) open |
| **High** | [#5378](https://github.com/HKUDS/nanobot/issues/5378): file-cap archive failure mutates the live session before persistence; later saves cannot restore overflow | Open; fix PR [#5380](https://github.com/HKUDS/nanobot/pull/5380) |
| **High** | [#5377](https://github.com/HKUDS/nanobot/issues/5377): consolidation truncates archive input but advances past the full batch, losing messages | Open; fix PR [#5379](https://github.com/HKUDS/nanobot/pull/5379) |
| **Medium** | Windows `os.replace()` `PermissionError` crashes the gateway during heartbeat session save | Fix PR [#5382](https://github.com/HKUDS/nanobot/pull/5382) open |
| **Medium** | [#5383](https://github.com/HKUDS/nanobot/pull/5383): concurrent session JSONL readers/mutators can corrupt canonical file access | Fix PR open |
| **Low / UX** | [#5368](https://github.com/HKUDS/nanobot/issues/5368): copy/fork actions visible while an Agent turn is still running | Open; no fix PR listed |

The cron and session-integrity bugs are the most serious this cycle. The project responded quickly with multiple fix PRs, but issue #5377/#5378 are only one day old and still need review/merge.

## 6. Feature Requests & Roadmap Signals

Several user-requested features now have active PRs, making them strong candidates for the next version:

- **MCP schema budgeting** — issue [#5298](https://github.com/HKUDS/nanobot/issues/5298) requests opt-in byte-budget control for model-visible MCP tool schemas. Open PR [#5388](https://github.com/HKUDS/nanobot/pull/5388) implements this.
- **Telegram stickers and reactions** — issue [#5289](https://github.com/HKUDS/nanobot/issues/5289) requests sticker support and agent reactions. Open PR [#5387](https://github.com/HKUDS/nanobot/pull/5387) adds reusable sticker replies.
- **MCP Apps result metadata** — issue [#5251](https://github.com/HKUDS/nanobot/issues/5251) asks for MCP Apps host support in WebUI. Open PR [#5386](https://github.com/HKUDS/nanobot/pull/5386) preserves structured MCP App result metadata separately from model context.
- **Matrix cross-signing / SAS verification** — long-standing issue [#4841](https://github.com/HKUDS/nanobot/issues/4841) is addressed by open PR [#5385](https://github.com/HKUDS/nanobot/pull/5385), which completes Element SAS request flow.
- **WebUI localization of Agent activity** — issue [#5366](https://github.com/HKUDS/nanobot/issues/5366) has no PR yet but is a clear UX-roadmap signal.
- **Heartbeat model override / isolated session** — PRs [#4549](https://github.com/HKUDS/nanobot/pull/4549) and [#4551](https://github.com/HKUDS/nanobot/pull/4551) remain open since June and would make heartbeat execution cheaper and configurable.

The next release is likely to include MCP schema budgeting, Telegram sticker replies, MCP Apps metadata handling, Matrix SAS improvements, and the cron/session stability fixes.

## 7. User Feedback Summary

Real user pain points seen in this window:

- **Reliability anxiety**: users report silent, permanent failures in cron scheduling and session persistence ([#5373](https://github.com/HKUDS/nanobot/issues/5373), [#5377](https://github.com/HKUDS/nanobot/issues/5377), [#5378](https://github.com/HKUDS/nanobot/issues/5378)).
- **Context cost concerns**: large MCP tool sets inflate model-visible context ([#5298](https://github.com/HKUDS/nanobot/issues/5298)).
- **Integration gaps**: Telegram stickers are unsupported ([#5289](https://github.com/HKUDS/nanobot/issues/5289)); Matrix verification is painful ([#4841](https://github.com/HKUDS/nanobot/issues/4841)); MCP Apps results are not surfaced natively ([#5251](https://github.com/HKUDS/nanobot/issues/5251)).
- **WebUI polish issues**: agents show English-only activity text ([#5366](https://github.com/HKUDS/nanobot/issues/5366)) and premature copy/fork actions during ongoing turns ([#5368](https://github.com/HKUDS/nanobot/issues/5368)).
- **Desire for persistent memory**: new proposal [#5372](https://github.com/HKUDS/nanobot/issues/5372) asks for cross-session memory via an external system, reflecting a common agent-use need.

Satisfaction is mixed: users clearly rely on NanoBot for serious automation, but failures in core scheduling/session logic create high frustration. The fast turnaround of fix PRs mitigates this.

## 8. Backlog Watch

The following items are older or still awaiting decisions:

- **[#4549](https://github.com/HKUDS/nanobot/pull/4549)** and **[#4551](https://github.com/HKUDS/nanobot/pull/4551)** — heartbeat model-override and isolated-session PRs have been open since **2026-06-26** and were only touched today. They may need maintainer review/merge decisions.
- **[#4841](https://github.com/HKUDS/nanobot/issues/4841)** — Matrix trust/verification issue was open since **2026-07-07**; it now has an active fix PR ([#5385](https://github.com/HKUDS/nanobot/pull/5385)), so future actions should be tracked.
- **[#5372](https://github.com/HKUDS/nanobot/issues/5372)** — new ViBo memory integration proposal has no maintainer response yet.
- **[#5251](https://github.com/HKUDS/nanobot/issues/5251)** and **[#5298](https://github.com/HKUDS/nanobot/issues/5298)** — feature requests from early August now have open PRs but need review and potential merge.
- **[#5349](https://github.com/HKUDS/nanobot/pull/5349)** — test fix for `record_token_usage` timezone handling remains open and is deterministic-noise for CI.

The closure of #4550 and #4556 today shows the maintainers are addressing the older PR backlog, though several June-era heartbeat PRs still lack closure.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-14

## 1. Today's Overview

Hermes Agent is in a high-activity period: 50 issues and 50 PRs were updated in the last 24 hours, with 3 issues closed and 5 PRs merged/closed. A new patch release, **v0.20.1 / v2026.8.13**, was cut today, rolling up ~656 PRs since v0.20.0. The dominant theme is a cluster of P1 regressions around Desktop app startup killing supervised messaging gateways on Windows and macOS, with at least one dedicated fix PR already open. Community contribution remains strong, with multiple contributor-authored fixes landing or proposed in areas like Slack, Telegram, config validation, and Desktop profile routing.

## 2. Releases

**v2026.8.13 / Hermes Agent v0.20.1** — released August 13, 2026  
- Patch release intended for downstream consumers: Docker images, hosted deployments, and latest-tag installs.  
- Rolls up approximately **656 PRs merged since v0.20.0** into a stable tagged release.  
- No explicit breaking changes or migration notes were included in the provided release excerpt.

→ [Release: v2026.8.13](https://github.com/NousResearch/hermes-agent/releases)

## 3. Project Progress

In the last 24 hours: **5 PRs were merged/closed**, and **3 issues were closed**. Visible closed PRs include:

- [#85733](https://github.com/NousResearch/hermes-agent/pull/85733) — fix(photon): default iMessage replies to plain text; Markdown becomes opt-in.
- [#85749](https://github.com/NousResearch/hermes-agent/pull/85749) — fix(grounded-citations): fold typographic Unicode so verbatim quotes match.
- [#85673](https://github.com/NousResearch/hermes-agent/pull/85673) — fix(desktop): stop offering unsupported GitHub MCP OAuth.

Also closed: issue [#85707](https://github.com/NousResearch/hermes-agent/issues/85707) (typed tool-schema boundary before cache decoration) and [#81639](https://github.com/NousResearch/hermes-agent/issues/81639) (P0 duplicate bug around tool-call history mutation).

Notable open PRs advancing features/fixes today:

- [#82793](https://github.com/NousResearch/hermes-agent/pull/82793) — Desktop Git history review.
- [#77518](https://github.com/NousResearch/hermes-agent/pull/77518) — Langfuse tracing for auxiliary LLM calls.
- [#85754](https://github.com/NousResearch/hermes-agent/pull/85754) — Teams Adaptive Card Action.Execute plugin handlers.
- [#85743](https://github.com/NousResearch/hermes-agent/pull/85743) — Gateway orphan reaping excluding service-managed PIDs.
- [#85750](https://github.com/NousResearch/hermes-agent/pull/85750) — Desktop per-profile remote WebSocket routing fix.

## 4. Community Hot Topics

Highest-activity issues by comment count:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — **Skills index stale/degraded** (25 comments). The Skills Hub index is 29.8h old against a 26h limit. Underlying need: reliable automated documentation/skills index freshness.

- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) — **Desktop restart reaps live gateway and never relaunches it** (20 comments). WeChat/QQ/Telegram go silent until manual restart. This is the most discussed active bug and is part of a wider P1 regression cluster.

- [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) — **Webhook Revolution meta-issue** (16 comments). A community-organized, graph-gated repair campaign across the whole webhook surface. Underlying need: systematic webhook reliability, not one-off patches.

- [#69592](https://github.com/NousResearch/hermes-agent/issues/69592) — **TUI `/sessions` and `/models` overlays invisible with ambient widget dock** (12 comments). Users cannot resume sessions or change models; impact updated as “Day 13”.

- [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) — **DeepSeek title generation fails with HTTP 400 response_format error** (9 comments, 2 👍). Underlying need: broader provider compatibility.

- [#4438](https://github.com/NousResearch/hermes-agent/issues/4438) — **Rich Spreadsheet Skill (xlsx/csv)** (8 comments). Underlying need: structured Excel/CSV handling without ad-hoc Python.

Most-liked issue overall: [#35966](https://github.com/NousResearch/hermes-agent/issues/35966) (4 👍) — native desktop/mobile client that talks directly to the local gateway.

## 5. Bugs & Stability

No open P0 issues were observed. The highest open severity is P1, with a large cluster around gateway/desktop lifecycle management.

**P1 — Desktop startup kills supervised messaging gateways (regression cluster):**
- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) — Desktop restart reaps live gateway; WeChat/QQ/Telegram go silent.
- [#85344](https://github.com/NousResearch/hermes-agent/issues/85344) — macOS launchd-supervised gateway gets SIGTERM from desktop startup.
- [#85368](https://github.com/NousResearch/hermes-agent/issues/85368) — Windows gateway repeatedly killed with SIGKILL; suspected OOM false.
- [#84855](https://github.com/NousResearch/hermes-agent/issues/84855) — Windows: “Permission denied to kill orphaned gateway PID” on desktop startup.
- [#85044](https://github.com/NousResearch/hermes-agent/issues/85044) — Windows: desktop serve startup reaps Scheduled Task-managed gateway.
- [#85738](https://github.com/NousResearch/hermes-agent/issues/85738) — Same root cause reported against `_reap_unsupervised_gateway_orphans`.

**Fix PR:** [#85743](https://github.com/NousResearch/hermes-agent/pull/85743) proposes excluding service-managed PIDs from orphan reaping.

**P1 — TUI workflow breakage:**
- [#69592](https://github.com/NousResearch/hermes-agent/issues/69592) — `/sessions` and `/models` overlays invisible with ambient widget dock; `/reload` silent. No dedicated fix PR has surfaced yet.

**P2 — Stability and platform bugs:**
- [#80117](https://github.com/NousResearch/hermes-agent/issues/80117) — SQLite POSIX lock conflict causes `APIConnectionError` in gateway.
- [#83427](https://github.com/NousResearch/hermes-agent/issues/83427) — `browser_exec` fails with `pydantic_core` ModuleNotFoundError when PYTHONPATH points at Hermes venv.
- [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) — Windows ZIP fallback update deletes the built desktop app and later updates report “Already up to date”.
- [#52339](https://github.com/NousResearch/hermes-agent/issues/52339) — macOS: `hermes update` rebuilds Desktop repo-local but leaves `/Applications/Hermes.app` stale.
- [#76267](https://github.com/NousResearch/hermes-agent/issues/76267) — Windows `sync_back` drops remote sandbox file changes.
- [#83340](https://github.com/NousResearch/hermes-agent/issues/83340) — `hermes cron run` reports ‘failed’ without executing the job in desktop-app shell.
- [#85406](https://github.com/NousResearch/hermes-agent/issues/85406) — `vision_analyze` fails for sandbox-side paths on Windows + Docker.
- [#85104](https://github.com/NousResearch/hermes-agent/issues/85104) — Desktop assistant message rendered twice; DB stores only one record.
- [#72064](https://github.com/NousResearch/hermes-agent/issues/72064) — `oneshot -z` cannot skip built-in memory injection; `--ignore-rules` ignored.

**P3 — Other notable bugs:**
- [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) — DeepSeek `response_format` incompatibility for auxiliary title generation.
- [#84058](https://github.com/NousResearch/hermes-agent/issues/84058) — Desktop composer caret lost when tool call starts streaming.
- [#85745](https://github.com/NousResearch/hermes-agent/issues/85745) — Desktop profile tab switch shows wrong session list; fix PR [#85750](https://github.com/NousResearch/hermes-agent/pull/85750) addresses remote WS routing.

Other fix PRs opened today include [#85755](https://github.com/NousResearch/hermes-agent/pull/85755) (voice dictation in profiles), [#85759](https://github.com/NousResearch/hermes-agent/pull/85759) (Telegram TypeHandler rebind), [#85751](https://github.com/NousResearch/hermes-agent/pull/85751) (probe stubs poisoning cache), [#85748](https://github.com/NousResearch/hermes-agent/pull/85748) (kanban nudge/retry protocol), and [#85747](https://github.com/NousResearch/hermes-agent/pull/85747) (Slack thread-root document attachments).

## 6. Feature Requests & Roadmap Signals

Active feature signals likely to influence the next minor release:

- [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) — **Webhook Revolution** epic: graph-gated repair campaign for ingress, execution, delivery, config, UI, deployment, docs.
- [#67798](https://github.com/NousResearch/hermes-agent/issues/67798) — Make lifecycle hooks a shared runtime contract across gateway, CLI, TUI, cron, plugins, desktop.
- [#4438](https://github.com/NousResearch/hermes-agent/issues/4438) — Rich Spreadsheet Skill for xlsx/csv.
- [#35966](https://github.com/NousResearch/hermes-agent/issues/35966) — Native desktop/mobile client app for direct gateway interaction.
- [#85418](https://github.com/NousResearch/hermes-agent/issues/85418) — Local-first, zero-dependency memory provider proposal benchmarked against Honcho; needs decision.
- [#85740](https://github.com/NousResearch/hermes-agent/issues/85740) — Support DeepSeek Responses API transport `/v1/responses`.
- [#84317](https://github.com/NousResearch/hermes-agent/issues/84317) — Opt-out for `drop_pending_updates` on Telegram cold boot.
- [#85754](https://github.com/NousResearch/hermes-agent/pull/85754) — Teams plugins handling Adaptive Card `Action.Execute`.
- [#82793](https://github.com/NousResearch/hermes-agent/pull/82793) — Desktop Git history review.
- [#77518](https://github.com/NousResearch/hermes-agent/pull/77518) — Langfuse tracing of auxiliary LLM calls.

Prediction: the next minor release will likely include the gateway orphan-reaping fix ([#85743](https://github.com/NousResearch/hermes-agent/pull/85743)), Desktop per-profile WS routing ([#85750](https://github.com/NousResearch/hermes-agent/pull/85750)), config-key recognition for `agent.reasoning_effort` ([#85752](https://github.com/NousResearch/hermes-agent/pull/85752) / [#85757](https://github.com/NousResearch/hermes-agent/pull/85757)), and possibly Teams card-action plugin support, if merged.

## 7. User Feedback Summary

- **Most acute pain:** Desktop app restarts are killing supervised messaging gateways on both Windows and macOS, causing WeChat, QQ, Telegram, and other messaging platforms to go silent until manual restart. This is reported through at least 6 separate P1 issues, indicating a strongly felt regression.
- **TUI users are blocked:** The `/sessions` overlay bug is marked “Day 13”; users cannot resume sessions or change models when using documented ambient widget layouts.
- **Provider compatibility friction:** DeepSeek users hit hard failures on auxiliary title generation due to unsupported `response_format`; users want transport compatibility.
- **Update/install frustration:** macOS terminal updates leave `/Applications/Hermes.app` stale; Windows ZIP fallback can delete the desktop app entirely.
- **Cross-platform bugs persist:** Windows-specific path/separator issues affect vision analysis and sandbox file sync; Python environment issues break `browser_exec`.
- **Positive signals:** Users are contributing fixes at a steady pace, and at least one community member explicitly thanked maintainers for resolving a prior issue ([#85418](https://github.com/NousResearch/hermes-agent/issues/85418)). The v0.20.1 release consolidating 656 merged PRs also signals strong sustained development.

## 8. Backlog Watch

Issues/PRs that appear stuck or need maintainer attention:

- [#69592](https://github.com/NousResearch/hermes-agent/issues/69592) — **P1 TUI overlay regression** open since July 22, no visible fix PR.
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — **Skills index degraded** for 18+ days; freshness probe still failing.
- [#4438](https://github.com/NousResearch/hermes-agent/issues/4438) — **Spreadsheet Skill** requested since April 1, still open.
- [#52339](https://github.com/NousResearch/hermes-agent/issues/52339) — **macOS Desktop update split-brain** since June 25.
- [#33049](https://github.com/NousResearch/hermes-agent/issues/33049) — Credential pool exhaustion TTLs hardcoded; open since May 27.
- [#67798](https://github.com/NousResearch/hermes-agent/issues/67798) — Lifecycle hooks as shared runtime contract; tagged `needs-decision`.
- [#69182](https://github.com/NousResearch/hermes-agent/pull/69182) — TUI gateway fail-closed on missing profile; open since July 22.
- [#81623](https://github.com/NousResearch/hermes-agent/pull/81623) — Security fix for Bitwarden `bws` argv validation; open since August 8.
- [#81748](https://github.com/NousResearch/hermes-agent/pull/81748) — Security fix for Slack approval/slash-confirm token binding; open since August 8.
- [#77518](https://github.com/NousResearch/hermes-agent/pull/77518) — Langfuse auxiliary call tracing; open since August 3, tagged `needs-decision`.

These are the highest-signal items that could benefit from maintainer review, merge, or a clear roadmap decision.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-14

## Today's Overview
Activity over the last 24 hours was moderate, with 3 open issues and 9 PRs updated. No new releases were published. The PR landscape is dominated by Dependabot dependency bumps: three older stale PRs were closed and six new dependency update PRs were opened. No feature or bug-fix PRs were merged. Community focus remains on one Web UI performance bug and two newly filed feature requests, indicating active usage but a quieter code-change period.

## Releases
No new releases were published in the last 24 hours.

## Project Progress
No merged feature PRs were observed today. The three closed PRs are all stale Dependabot updates that were closed, likely superseded by newer dependency bumps:

- [#3305 [CLOSED] build(deps): bump github.com/aws/aws-sdk-go-v2/service/bedrockruntime from 1.53.3 to 1.56.2](https://github.com/sipeed/picoclaw/pull/3305)
- [#3306 [CLOSED] build(deps): bump github.com/aws/aws-sdk-go-v2/config from 1.32.25 to 1.32.33](https://github.com/sipeed/picoclaw/pull/3306)
- [#3304 [CLOSED] build(deps): bump github.com/anthropics/anthropic-sdk-go from 1.55.1 to 1.61.0](https://github.com/sipeed/picoclaw/pull/3304)

New open dependency PRs include updates to AWS SDK modules, Anthropic SDK, and Mautrix:
- [#3336 AWS Bedrock Runtime → 1.57.1](https://github.com/sipeed/picoclaw/pull/3336)
- [#3335 AWS Config → 1.32.35](https://github.com/sipeed/picoclaw/pull/3335)
- [#3334 Anthropic SDK Go → 1.62.0](https://github.com/sipeed/picoclaw/pull/3334)
- [#3332 AWS SDK Go → 1.43.4](https://github.com/sipeed/picoclaw/pull/3332)
- [#3333 Mautrix → 0.29.0](https://github.com/sipeed/picoclaw/pull/3333)

There is also a stale open fix PR for a broken pnpm lockfile: [#3318 fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318).

## Community Hot Topics
The only actively discussed item is the Web UI lag issue:

- [#3281 [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  5 comments, 1 👍  
  **Underlying need:** Users want a responsive chat interface even with long session histories. The issue has been open since July 21 and was updated on August 13, so it is still unresolved.

All other issues and PRs have zero comments.

## Bugs & Stability
Ranked by severity:

1. **Web UI input lag with long history** — [#3281](https://github.com/sipeed/picoclaw/issues/3281)  
   PicoClaw 0.3.1, Go 1.25.11, Web UI. Typing becomes very laggy as chat history grows. This is a user-facing performance bug with no fix PR attached yet.

2. **Broken pnpm lockfile** — [#3318 fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318)  
   The lockfile lists `semver@7.8.5` twice, causing `ERR_PNPM_BROKEN_LOCKFILE`. This is a build/CI stability issue. The fix PR is open but marked stale as of August 13.

## Feature Requests & Roadmap Signals
Two feature requests were filed recently:

- [#3331 [Feature] Use any models with /audio/transcriptions endpoint, not only "*-whisper-*"](https://github.com/sipeed/picoclaw/issues/3331)  
  Suggests adding a config flag such as `whisper-transcription: true` to force the ASR path regardless of model name. Implies current logic is too restrictive and excludes faster/newer transcription models.

- [#3330 [Feature] Support dynamic model override in delegate/spawn/subagent tools](https://github.com/sipeed/picoclaw/issues/3330)  
  Requests per-call model selection for `delegate`, `spawn`, and `subagent` tools instead of statically using the agent's configured model or `defaultModel`.

Both are filed today and reflect user demand for more flexible model routing. Given their recency and clear use cases, they are plausible candidates for upcoming minor releases, though no maintainer response is recorded yet.

## User Feedback Summary
- **Pain point:** Long chat history degrades Web UI input performance, making the interface feel sluggish in normal long sessions.
- **Pain point:** Users are forced to use legacy `*-whisper-*` models for audio transcription, which they describe as "too old and slow."
- **Pain point:** Agent delegation (`delegate`/`spawn`/`subagent`) cannot dynamically select a model, limiting workflows that need different models per subtask.
- **Satisfaction signals:** No positive feedback or explicit satisfaction data was present in the last 24h activity.

## Backlog Watch
Items that may need maintainer attention:

- [#3281 Web UI lag issue](https://github.com/sipeed/picoclaw/issues/3281) — open since July 21, 5 comments, no fix PR. This is the most visible unresolved user-facing bug.
- [#3318 pnpm lockfile fix PR](https://github.com/sipeed/picoclaw/pull/3318) — open since August 5, marked stale, still not merged even though it addresses a clear build breakage.
- The three stale closed dependency PRs (#3304, #3305, #3306) were closed, but the new equivalent PRs (#3334, #3336, #3335) still need review/merge to keep dependencies current.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-14

## 1. Today's Overview

NanoClaw is in a high-activity period: v2.2.0 was released, 19 PRs were updated in the last 24 hours, and 13 of those moved to closed/merged state while 6 remain open. The day's work was dominated by core-team supply-chain and CI hardening around the agent-image verification/promotion pipeline, alongside the long-awaited migration of agent templates into Agent Plugins. Two issues were updated in the window: one template-ID bug closed (#3234), and one new unknown-sender approval bug is now open (#3235). Overall project health looks strong on maintainer throughput, though several old community PRs remain pending and the new approval-card issue needs triage.

## 2. Releases

### v2.2.0

- Release PR: [nanocoai/nanoclaw#3237](https://github.com/nanocoai/nanoclaw/pull/3237)

The available release-note excerpt leads with:

> Stamped plugins update in place through `ncl groups create --template <ref>`. When a group already carries the template's plugin, the same command becomes an in-place update instead of minting a duplicate agent: a dry run prints a plan of every plugin-owned surface (plugin files, skills, MCP s… *(source text truncated)*

This release is the user-facing half of the template/plugin engine change:

- [nanocoai/nanoclaw#3220](https://github.com/nanocoai/nanoclaw/pull/3220) — **feat!: agent templates become Agent Plugins 1.0.0 directories**  
  This is a format migration rather than a simple skill addition, and includes stamp-time symlink/caps/secret hardening.
- [nanocoai/nanoclaw#2909](https://github.com/nanocoai/nanoclaw/pull/2909) — Setup wizard template flow and first-agent stamping.
- [nanocoai/nanoclaw#3231](https://github.com/nanocoai/nanoclaw/pull/3231) — Codex and OpenCode config writers now honor plugin MCP working directories.

**Migration/breaking-change note:** Existing template-stamped groups should be treated as affected by the template→Agent Plugin migration. The new `--template` flow is designed to update plugin-owned surfaces in place rather than duplicate agents, with a dry-run plan available before applying.

## 3. Project Progress

### Agent Templates & Plugin System
- [nanocoai/nanoclaw#3220](https://github.com/nanocoai/nanoclaw/pull/3220) — Closed/merged: agent templates become Agent Plugins 1.0.0 directories; security hardening around stamp-time symlinks/caps/secrets.
- [nanocoai/nanoclaw#2909](https://github.com/nanocoai/nanoclaw/pull/2909) — Closed/merged: setup wizard template flow and first-agent stamping.
- [nanocoai/nanoclaw#3231](https://github.com/nanocoai/nanoclaw/pull/3231) — Closed/merged: plugin MCP `cwd` honored in Codex and OpenCode provider config writers.

### CI / Agent-Image Supply Chain
- [nanocoai/nanoclaw#3158](https://github.com/nanocoai/nanoclaw/pull/3158) — Closed/merged: `verify-agent-image` now pins the real publisher identity and checks attestations per architecture.
- [nanocoai/nanoclaw#3238](https://github.com/nanocoai/nanoclaw/pull/3238) — Closed/merged: `verify-agent-image` now runs on every PR so it can actually act as a required status check.
- [nanocoai/nanoclaw#3240](https://github.com/nanocoai/nanoclaw/pull/3240) — Closed/merged: agent-image bump PR is now opened from a `repository_dispatch`.
- [nanocoai/nanoclaw#3241](https://github.com/nanocoai/nanoclaw/pull/3241) — Closed/merged: a verified signature can act as the approving review, off by default behind `AGENT_IMAGE_AUTO_APPROVE=true`.
- [nanocoai/nanoclaw#3236](https://github.com/nanocoai/nanoclaw/pull/3236) — Closed/merged: agent image repinned to `hardened-2026-08-13`.
- [nanocoai/nanoclaw#3239](https://github.com/nanocoai/nanoclaw/pull/3239) — Closed: throwaway smoke test for the `verify-agent-image` gate after adding the CI role ARN.
- [nanocoai/nanoclaw#3237](https://github.com/nanocoai/nanoclaw/pull/3237) — Closed/merged: release chore for v2.2.0.

### Security & Stability Fixes
- [nanocoai/nanoclaw#3229](https://github.com/nanocoai/nanoclaw/pull/3229) — Closed/merged: Telegram pairing codes switched from `Math.random()` to `crypto.randomInt`, with a wider code space.
- [nanocoai/nanoclaw#3145](https://github.com/nanocoai/nanoclaw/pull/3145) — Closed/merged: DB migration 021 backfills missing channel destinations for existing messaging-group wirings.
- [nanocoai/nanoclaw#2624](https://github.com/nanocoai/nanoclaw/pull/2624) — Closed/merged: per-server `disabledTools` support in `McpServerConfig`.

## 4. Community Hot Topics

Public reaction counts were not available in the provided dataset, so activity here is inferred from update recency, comment count, and the core-team/community split.

- [nanocoai/nanoclaw#3234](https://github.com/nanocoai/nanoclaw/issues/3234) — **Closed issue with 1 comment**  
  Template-stamped agent groups get a bare UUID instead of the `ag-` prefix, causing OneCLI `ensureAgent` to reject them. The underlying need is reliable identifier compatibility between NanoClaw agent groups and OneCLI.

- [nanocoai/nanoclaw#3235](https://github.com/nanocoai/nanoclaw/issues/3235) — **Open issue, no comments yet**  
  Unknown-sender approval cards are unbounded for webhook/bot senders. This is a real operational pain point: `request_approval` policy needs bot-aware handling and persistent denials.

- [nanocoai/nanoclaw#3243](https://github.com/nanocoai/nanoclaw/pull/3243) — **Open core-team PR**  
  Argues that arming auto-merge should not count as a verification verdict in `verify-agent-image`. This reflects deeper demand for trustworthy, non-forgeable CI gating.

- [nanocoai/nanoclaw#3242](https://github.com/nanocoai/nanoclaw/pull/3242) — **Open DO-NOT-MERGE draft**  
  Live-fire test of the signature approver chain. Demonstrates active maintenance of the secure agent-image promotion loop.

## 5. Bugs & Stability

Ranked by severity:

1. **High — Unbounded approval cards from webhook/bot senders**  
   [nanocoai/nanoclaw#3235](https://github.com/nanocoai/nanoclaw/issues/3235)  
   Open. `unknown_sender_policy = 'request_approval'` treats automated senders like humans, producing unbounded approval cards; denials do not persist. No fix PR is visible yet.

2. **High — Weak Telegram pairing codes**  
   [nanocoai/nanoclaw#3229](https://github.com/nanocoai/nanoclaw/pull/3229)  
   Fixed/merged. Pairing codes were generated with `Math.random()`; now uses CSPRNG and a wider code space.

3. **High — Agent-image signature verification silently skipped**  
   [nanocoai/nanoclaw#3158](https://github.com/nanocoai/nanoclaw/pull/3158)  
   Fixed/merged. The workflow referenced nonexistent signer-identity variables, so verification was skipped and auto-merge could never fire. Publisher identity is now pinned and per-arch attestations are checked.

4. **Medium — Template-stamped groups get bare UUID IDs**  
   [nanocoai/nanoclaw#3234](https://github.com/nanocoai/nanoclaw/issues/3234)  
   Closed. Missing `ag-` prefix caused OneCLI `ensureAgent` rejection. Appears addressed as part of the template/plugin migration work.

5. **Medium — Existing wirings missing channel destinations**  
   [nanocoai/nanoclaw#3145](https://github.com/nanocoai/nanoclaw/pull/3145)  
   Fixed/merged. Migration 021 backfills destinations while preserving existing custom local names.

No crash-level regressions were reported in the updated issues.

## 6. Feature Requests & Roadmap Signals

Likely candidates for upcoming versions:

- [nanocoai/nanoclaw#3218](https://github.com/nanocoai/nanoclaw/pull/3218) — **feat(cli): accept bounded JSON from stdin**  
  Open, active. Adds a generic `--stdin-json` mode for host and container `ncl` clients. Strong candidate for a future minor release because it is a bounded, non-breaking extension of existing command input.

- [nanocoai/nanoclaw#3235](https://github.com/nanocoai/nanoclaw/issues/3235) — **Unknown-sender approval for bots/webhooks**  
  Newly reported but likely to gain traction: operators need persistent, bot-aware approval behavior for messaging groups.

- [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — **Unknown slash commands should be treated as normal chat**  
  Open since May. If the formatter fix is accepted, it would stop silent response drops for unrecognized commands.

- [nanocoai/nanoclaw#2420](https://github.com/nanocoai/nanoclaw/pull/2420) — **/add-hindsight memory skill**  
  Open since May. Opt-in Hindsight memory integration via bundled MCP wrapper; could land in a future v2.x if maintainers review it.

## 7. User Feedback Summary

Real user pain points visible in this window:

- **Messaging bots and webhooks are not representable as known senders** — approval gates create card floods for recurring automated messages ([#3235](https://github.com/nanocoai/nanoclaw/issues/3235)).
- **Template-stamped groups can break downstream OneCLI integration** because of identifier prefix expectations ([#3234](https://github.com/nanocoai/nanoclaw/issues/3234)).
- **Security-sensitive Telegram pairing codes were weak** — now fixed with CSPRNG ([#3229](https://github.com/nanocoai/nanoclaw/pull/3229)).
- **Unknown slash commands can silently drop responses** — users expect unrecognized commands to fall back to normal chat rather than disappear ([#2346](https://github.com/nanocoai/nanoclaw/pull/2346)).
- **CLI automation users want bounded structured input** via stdin ([#3218](https://github.com/nanocoai/nanoclaw/pull/3218)).
- **Docs still point at a retired data/env mirror**, confusing skill removal workflows ([#3230](https://github.com/nanocoai/nanoclaw/pull/3230)).

No explicit satisfaction ratings were available. The overall contributor pattern is healthy: community PRs are labeled according to the contributing guide, security fixes are being merged, and core-team CI work is unusually active.

## 8. Backlog Watch

Items needing maintainer attention:

- [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — **Open since 2026-05-08**  
  Unknown slash commands treated as normal chat. Updated again on 2026-08-13 but still unmerged.

- [nanocoai/nanoclaw#2420](https://github.com/nanocoai/nanoclaw/pull/2420) — **Open since 2026-05-11**  
  `/add-hindsight` memory skill. Long-running feature PR that has received updates but no merge/close decision.

- [nanocoai/nanoclaw#3235](https://github.com/nanocoai/nanoclaw/issues/3235) — **New open issue with zero comments**  
  Needs triage: unknown-sender approval behavior for webhook/bot senders is actively causing operational pain.

- [nanocoai/nanoclaw#3218](https://github.com/nanocoai/nanoclaw/pull/3218) — **Open since 2026-08-09**  
  Bounded JSON stdin input is ready for review; likely valuable for automation users.

- [nanocoai/nanoclaw#3230](https://github.com/nanocoai/nanoclaw/pull/3230) — **Open since 2026-08-12**  
  Small docs fix for retired data/env mirror references; should be low-cost to land.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-14

## Today's Overview

IronClaw is in a high-activity stabilization and architecture-rebuild phase. In the last 24 hours, 50 issues were updated (32 open/active, 18 closed) and 50 PRs were updated (25 open, 25 merged/closed). The headline event is the stable promotion of **ironclaw-v1.2.0**, consolidating the RC1–RC3 validation cycle. In parallel, the **IronClaw Reborn** epic ([#7482](https://github.com/nearai/ironclaw/issues/7482)) is being actively decomposed into executable workstreams, with a v0 ACP harness executor scoped as the "build right now" item. The project is also investing heavily in Postgres write-amplification reduction, event-sink coalescing, and doc-truth CI checks.

---

## Releases

### ironclaw-v1.2.0 — 2026-08-13

- Stable promotion of `1.2.0-rc.3`, including fixes validated in RC2/RC3 and the complete RC1 feature set.
- Documented fix in RC3: the runtime container image now installs `curl`, so in-container HTTP healthchecks can execute. Orchestrator-to-worker probing is now supported.
- The provided release notes do not explicitly list breaking changes or migration steps.
- Release promotion PR: [#7625](https://github.com/nearai/ironclaw/pull/7625).

---

## Project Progress

Notable merged/closed PRs in this window:

- **Release:** [#7625](https://github.com/nearai/ironclaw/pull/7625) promoted `1.2.0-rc.3` to stable `1.2.0`.
- **Unbound turns / detached threads:** [#7633](https://github.com/nearai/ironclaw/pull/7633) implements the unbound-turns design end-state-first: threads become the coordinator's unit of work, and the kernel no longer carries reply routing. Related design doc: [#7562](https://github.com/nearai/ironclaw/pull/7562).
- **Structured document editing:** [#7163](https://github.com/nearai/ironclaw/pull/7163) adds structural edit support for `.docx`, `.xlsx`, and `.pptx`, renders PDF from HTML, and fixes the #7109 text-log regression.
- **Loop reliability:** [#7531](https://github.com/nearai/ironclaw/pull/7531) makes repeated-call detection advisory-only, preventing heuristic false positives from blocking legitimate tool calls.
- **Extension state fix:** [#7581](https://github.com/nearai/ironclaw/pull/7581) refreshes bundled MCP state after OAuth auth so tools no longer stay stuck in `setup_needed`.
- **Live canary fix:** [#7590](https://github.com/nearai/ironclaw/pull/7590) aligns the bundled-skill marker owner with the runtime mint.
- **Docs CI gate:** [#7376](https://github.com/nearai/ironclaw/pull/7376) extends the path-reference gate to the public docs surface and locale mirror.
- **Dependency updates:** [#7506](https://github.com/nearai/ironclaw/pull/7506) bumps 17 crates in the "everything-else" group.

Open feature/perf PRs in flight:

- **Automation contracts:** [#7548](https://github.com/nearai/ironclaw/pull/7548) adds versioned structured execution contracts for scheduled automations.
- **ACP CLI serve:** [#7513](https://github.com/nearai/ironclaw/pull/7513) adds `acp serve` over stdio with streaming and cancel support.
- **Nostr WASM host functions:** [#7184](https://github.com/nearai/ironclaw/pull/7184) adds Nostr signing host functions to the WASM tool sandbox.
- **Postgres write reduction:** [#7630](https://github.com/nearai/ironclaw/pull/7630), [#7629](https://github.com/nearai/ironclaw/pull/7629), [#7628](https://github.com/nearai/ironclaw/pull/7628), and [#7631](https://github.com/nearai/ironclaw/pull/7631) target per-turn Postgres writes, trigger churn, heartbeat journal churn, and event-sink coalescing.

---

## Community Hot Topics

The most active discussion centers on architectural direction and user-visible bugs:

- **[#7482 — Epic: Pluggable agent loops](https://github.com/nearai/ironclaw/issues/7482)** — 6 comments. This is the dominant roadmap item. It reframes IronClaw as the **kernel** and pushes agent loops and per-integration tool code into pluggable harnesses. It has generated a large family of tracked implementation issues, including open items [#7621](https://github.com/nearai/ironclaw/issues/7621), [#7622](https://github.com/nearai/ironclaw/issues/7622), [#7623](https://github.com/nearai/ironclaw/issues/7623), and [#7624](https://github.com/nearai/ironclaw/issues/7624).
- **[#6257 — "Invalid value (attachments.mime_type)" error with PDF files](https://github.com/nearai/ironclaw/issues/6257)** — 4 comments, closed. User-reported attachment bug affecting PDF generation/sending; appears resolved.
- **[#2117 — ironclaw-bridge local file/MCP bridge daemon](https://github.com/nearai/ironclaw/issues/2117)** — 2 comments, 1 👍. Community asks for local-file access when IronClaw is cloud-hosted.
- **[#7185 — Memory not reliably recalled across conversations](https://github.com/nearai/ironclaw/issues/7185)** — 2 comments. Multiple testers independently observed context loss between conversations; this is a trust-critical issue.

---

## Bugs & Stability

Ranked by severity:

1. **Memory/context not reliably recalled across conversations** — [#7185](https://github.com/nearai/ironclaw/issues/7185) (open). Reported by multiple IronClaw Champions testers. Directly affects the agent's usefulness and continuity.
2. **GitHub extension shows as connected after invalid credentials** — [#7627](https://github.com/nearai/ironclaw/issues/7627) (open). Users entering junk credentials see "connected" before actual auth succeeds; misleading UI and possible auth-state bug.
3. **Custom MCP with browser/email auth gets stuck** — [#7626](https://github.com/nearai/ironclaw/issues/7626) (open). The agent prompts for browser authorization, but IronClaw hangs during connection, blocking MCPs like MKT1.
4. **NEAR AI Cloud Sonnet-5 returns 500 errors** — [#7589](https://github.com/nearai/ironclaw/issues/7589) (closed). Reported as ongoing for three days; now closed.
5. **PDF MIME-type validation error** — [#6257](https://github.com/nearai/ironclaw/issues/6257) (closed). Resolved in the current cycle.

Stability-related fixes landed in PRs:

- [#7531](https://github.com/nearai/ironclaw/pull/7531) — repeated-call detection is now advisory-only; no more false-positive blocking.
- [#7581](https://github.com/nearai/ironclaw/pull/7581) — bundled MCP extension state is refreshed after auth.
- [#7163](https://github.com/nearai/ironclaw/pull/7163) — fixes the #7109 text-log regression for binary documents.
- [#7590](https://github.com/nearai/ironclaw/pull/7590) — fixes live-canary skill-snapshot marker verification.
- Release `1.2.0` includes the in-container `curl` healthcheck fix.

---

## Feature Requests & Roadmap Signals

Clear user-requested features:

- **Local file/MCP bridge for cloud-hosted IronClaw** — [#2117](https://github.com/nearai/ironclaw/issues/2117). Users want to use Obsidian vaults, local project directories, and laptop resources from cloud deployments.
- **Show IronClaw Reborn version in the web UI** — [#7580](https://github.com/nearai/ironclaw/issues/7580). Users cannot currently discover which version is running from the UI.
- **Structured automation execution contracts** — [#7548](https://github.com/nearai/ironclaw/pull/7548). A feature PR requiring goal, success criteria, output instructions, and allowed capabilities for scheduled automations.
- **ACP CLI serve command** — [#7513](https://github.com/nearai/ironclaw/pull/7513). External tools such as GitHub Copilot CLI and VS Code would be able to connect to IronClaw agents over ACP/stdio.
- **Nostr host functions for WASM tools** — [#7184](https://github.com/nearai/ironclaw/pull/7184). Adds Nostr signing capabilities to `near:agent@0.4.0`.
- **Pluggable agent loops / Reborn** — [#7482](https://github.com/nearai/ironclaw/issues/7482). The roadmap signal is clear: IronClaw is moving toward a kernel architecture with off-the-shelf harnesses. The immediate next build is the v0 ACP harness executor ([#7624](https://github.com/nearai/ironclaw/issues/7624)), with claude-code as the first loop.

Prediction: the next release cycle will likely focus on the v0 ACP harness executor, the already-open performance work, and stabilization of the unbound-turns/thread-as-unit-of-work model. Larger Reborn workstreams — egress edge, foreign-harness execution, capability rollout — are explicitly deferred until the v0 slot validates.

---

## User Feedback Summary

Real user pain points visible in the last 24 hours:

- **Memory inconsistency across conversations** ([#7185](https://github.com/nearai/ironclaw/issues/7185)): multiple testers in the IronClaw Champions check-in found that information established in one conversation is not reliably available later.
- **Cloud-hosted users cannot reach local files** ([#2117](https://github.com/nearai/ironclaw/issues/2117)): blocked use cases include Obsidian vaults and local project directories.
- **Custom MCP auth flows hang** ([#7626](https://github.com/nearai/ironclaw/issues/7626)): MCPs requiring browser/email verification get stuck, making paid integrations unusable.
- **GitHub extension auth state is misleading** ([#7627](https://github.com/nearai/ironclaw/issues/7627)): the extension appears connected even after invalid credentials.
- **PDF sending/generation failed** ([#6257](https://github.com/nearai/ironclaw/issues/6257)): user frustration around attachment MIME validation.
- **Sonnet-5 500s on NEAR AI Cloud** ([#7589](https://github.com/nearai/ironclaw/issues/7589)): model-provider reliability issue affecting production use.
- **Version discoverability** ([#7580](https://github.com/nearai/ironclaw/issues/7580)): users cannot find the Reborn version in the web UI.

Overall, users are actively testing, reporting, and pushing on both reliability and cloud/local integration gaps. The number of closed issues and the 1.2.0 stable release suggest that the team is responsive, but open memory/auth bugs remain the most satisfaction-critical items.

---

## Backlog Watch

Items that may need maintainer attention:

- **[#2117 — ironclaw-bridge local file/MCP bridge daemon](https://github.com/nearai/ironclaw/issues/2117)** — Opened 2026-04-07. Still open after ~4 months, with only 2 comments and 1 👍. This is a significant user-facing gap for cloud-hosted deployments.
- **[#7185 — Memory not reliably recalled across conversations](https://github.com/nearai/ironclaw/issues/7185)** — Open since 2026-08-04 with only 2 comments. Core product trust issue; needs triage/ownership.
- **[#7184 — Nostr host functions for WASM tools](https://github.com/nearai/ironclaw/pull/7184)** — Open since 2026-08-04 from a new contributor. No visible review/comments in the snapshot; should be reviewed or explicitly deferred.
- **[#7378 — doc-fact contract tests](https://github.com/nearai/ironclaw/pull/7378)** — Open since 2026-08-07. Part of the doc-truth series; important for preventing docs/behavior drift.
- **[#7513 — ACP serve command](https://github.com/nearai/ironclaw/pull/7513)** — Open since 2026-08-11. Directly relevant to the ACP executor direction in the Reborn epic; could become a dependency for v0.
- **[#7020 — tokio-tungstenite bump](https://github.com/nearai/ironclaw/pull/7020)** and **[#7262 — wasm-tools bump](https://github.com/nearai/ironclaw/pull/7262)** — Dependabot PRs open for ~1–2 weeks; routine but should not accumulate indefinitely.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-14

## Today's Overview
Activity in the last 24 hours was moderate-to-high, with 11 PRs updated and 6 of those merged/closed, while no new releases were published. The project is clearly in a UI/UX consolidation phase: several closed PRs unified skills, MCP, and cowork management views, and added an evergreen daily check-in feature. Issue traffic was light — only 2 issues updated, both open — including a new user request to ship “v4pro” quickly. Overall project health looks good: most merged work is refactoring or targeted fixes, with no new crashes or regressions reported in the issue tracker.

## Releases
No new releases in the last 24 hours.

## Project Progress
Six PRs were merged/closed in the last 24 hours:

- [**#2488**](https://github.com/netease-youdao/LobsterAI/pull/2488) — `[area: renderer, area: cowork]` Refactor cowork “BTW” and management UI. Likely improves the cowork collaboration/management interface.
- [**#2487**](https://github.com/netease-youdao/LobsterAI/pull/2487) — `[area: renderer]` Merge skills and MCP views into a unified “skills-and-connectors” view.
- [**#2486**](https://github.com/netease-youdao/LobsterAI/pull/2486) — `[area: renderer]` Unify MCP card/detail UI with kits and skills styling, including shared `CardOverflowMenu` and new `McpCard`/`McpDetailModal`.
- [**#2485**](https://github.com/netease-youdao/LobsterAI/pull/2485) — `[area: renderer, area: cowork]` Support evergreen daily check-in activity, replacing the old one-off check-in behavior.
- [**#1232**](https://github.com/netease-youdao/LobsterAI/pull/1232) — Fix scheduled task first execution result not being pushed to the UI.
- [**#2484**](https://github.com/netease-youdao/LobsterAI/pull/2484) — `Feat/enterprise edition` across renderer, docs, main, and OpenClaw areas. The PR body is a placeholder, so exact enterprise capabilities are unclear, but it signals enterprise-oriented work.

The overall direction is UI consolidation, consistent styling across skills/MCP/kits, and extending the OpenClaw integration layer.

## Community Hot Topics
The most-commented items are not heavily active, but two issues stand out:

- [**#2489 — “快更新v4pro！”**](https://github.com/netease-youdao/LobsterAI/issues/2489)  
  Newly opened, 1 comment. A user is asking urgently for “v4pro” support. This is likely a model/version request and reflects demand for faster release cadence.
- [**#1162 — Add Vitest tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`**](https://github.com/netease-youdao/LobsterAI/issues/1162)  
  1 comment, open since March. The issue requests 75 unit tests for memory management and local-time prompt logic. It has a corresponding PR [#1165](https://github.com/netease-youdao/LobsterAI/pull/1165) still open.

Both issues highlight two different community needs: users want newer model/version support quickly, while contributors are pushing for more test coverage on core logic.

## Bugs & Stability
No new bug reports were opened in the last 24 hours, but several existing fixes were updated/closed:

- **High — Skill enable toggles silently ineffective**  
  [**PR #2483**](https://github.com/netease-youdao/LobsterAI/pull/2483) (open) fixes skill entries in OpenClaw by keying them by parsed frontmatter `name`. Previously, directory/frontmatter mismatches made UI toggles silently fail.
- **Medium — Scheduled task first-run result not pushed to UI**  
  [**PR #1232**](https://github.com/netease-youdao/LobsterAI/pull/1232) (merged/closed) fixes the condition where first-ever execution results were invisible until the second run.
- **Medium — Duplicate custom agent names allowed**  
  [**PR #1166**](https://github.com/netease-youdao/LobsterAI/pull/1166) (open) prevents duplicate agent names at creation time, which caused ambiguous agent lists.
- **Low/UX — “Run now” button lacks feedback**  
  [**PR #1163**](https://github.com/netease-youdao/LobsterAI/pull/1163) (open) addresses missing loading/success feedback and long 15-second polling delays for scheduled tasks.

No crash-level regressions were reported today.

## Feature Requests & Roadmap Signals
- [**Issue #2489**](https://github.com/netease-youdao/LobsterAI/issues/2489) is a clear user request for “v4pro” support. If this refers to a model version, it will likely become a priority for the next release.
- [**PR #2484**](https://github.com/netease-youdao/LobsterAI/pull/2484) suggests enterprise-edition features are in progress across main, renderer, docs, and OpenClaw areas.
- [**PR #2485**](https://github.com/netease-youdao/LobsterAI/pull/2485) introduces an evergreen daily check-in, indicating plans for ongoing gamification/rewards rather than one-time events.
- Multiple UI refactors ([#2486](https://github.com/netease-youdao/LobsterAI/pull/2486), [#2487](https://github.com/netease-youdao/LobsterAI/pull/2487), [#2488](https://github.com/netease-youdao/LobsterAI/pull/2488)) point to a more unified skills/MCP/cowork management experience in the next version.

## User Feedback Summary
- **Urgency around v4pro**: A user explicitly demanded “快更新v4pro” (update v4pro quickly), indicating dissatisfaction with the current version/model availability.
- **Silent skill failures**: Users likely experienced toggles that appeared to work but had no actual effect due to skill key mismatches ([#2483](https://github.com/netease-youdao/LobsterAI/pull/2483)).
- **Scheduled task UX friction**: Lack of immediate feedback and slow status refresh is a real pain point ([#1163](https://github.com/netease-youdao/LobsterAI/pull/1163)).
- **Agent name ambiguity**: Duplicate custom agent names forced users to manually find the original entry, which is confusing ([#1166](https://github.com/netease-youdao/LobsterAI/pull/1166)).

## Backlog Watch
Several stale PRs/issues have been waiting since **March 31, 2026** and were touched/updated only recently — these likely need maintainer attention:

- [**Issue #1162**](https://github.com/netease-youdao/LobsterAI/issues/1162) — Add Vitest tests for `openclawMemoryFile` / `openclawLocalTimeContextPrompt`; related PR [#1165](https://github.com/netease-youdao/LobsterAI/pull/1165) is still open.
- [**PR #1156**](https://github.com/netease-youdao/LobsterAI/pull/1156) — Add Vitest tests for `commandSafety` and `coworkMemoryJudge`; safety-critical modules currently have zero coverage.
- [**PR #1163**](https://github.com/netease-youdao/LobsterAI/pull/1163) — Fix scheduled-task “run now” feedback and status sync.
- [**PR #1166**](https://github.com/netease-youdao/LobsterAI/pull/1166) — Prevent duplicate custom agent names.

These have been open for roughly 4.5 months and represent both quality and UX improvements that should be reviewed or closed.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-14

## 1. Today's Overview

Moltis saw moderate activity in the last 24 hours: 1 open issue was updated and 4 pull requests are active, with no merges and no new releases. The project is in a fix-heavy phase, with PRs addressing macOS script compatibility, broken Go install paths caused by upstream repository moves, and persistent CI/test issues. No code landed in main today, so the focus remains on stabilizing tooling and reviewing pending fixes. Overall project health looks stable, though maintainer review/merge capacity may be a bottleneck.

## 2. Releases

No new releases were published in the last 24 hours. There are no release notes, breaking changes, or migration steps to report.

## 3. Project Progress

No PRs were merged or closed in the last 24 hours. However, several open PRs show active progress:

- **[PR #1194 — fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194)**  
  Fixes a `just local-validate-full` crash on macOS when running without a PR number.

- **[PR #1190 — Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)**  
  A substantial feature PR adding provider-neutral persistence, snapshots, scheduling, projections, local full-text search, and read-only CalDAV/Slack/Discord/Matrix/Teams history datasets.

- **[PR #1192 — fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192)**  
  Fixes a broken `wacrawl` skill install path after the upstream repository moved to the `openclaw` organization.

- **[PR #1191 — fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191)**  
  Fixes a sandbox build failure affecting every pre-built image due to the `gogcli` module path change.

## 4. Community Hot Topics

No issues or PRs attracted comments or reactions in the last 24 hours, so discussion activity is low. The most impactful items are the active fix PRs, which address real user-facing breakages:

- **[PR #1191](https://github.com/moltis-org/moltis/pull/1191)** is likely the highest-visibility fix because it unblocks `moltis sandbox build` entirely.
- **[PR #1192](https://github.com/moltis-org/moltis/pull/1192)** addresses a broken skill installation path, affecting users of the `wacrawl` skill.
- **[Issue #1193](https://github.com/moltis-org/moltis/issues/1193)** highlights CI flakiness under full-suite load, which can reduce developer trust in test results.

The underlying need across these items is reliability: users need builds, scripts, and skills to work consistently across macOS and Linux, and after upstream dependency renames.

## 5. Bugs & Stability

Ranked by severity:

1. **High — Sandbox builds fail on every pre-built image**  
   [PR #1191](https://github.com/moltis-org/moltis/pull/1191) documents that generated Dockerfiles use `github.com/steipete/gogcli`, but upstream `go.mod` now declares `github.com/openclaw/gogcli`. This blocks all sandbox image builds. Fix PR is open.

2. **Medium — `wacrawl` skill install fallback is broken**  
   [PR #1192](https://github.com/moltis-org/moltis/pull/1192) fixes the Go install path after the upstream rename to `github.com/openclaw/wacrawl`. Users cannot install the skill until merged.

3. **Low/Medium — `just local-validate-full` fails on macOS bash 3.2**  
   [PR #1194](https://github.com/moltis-org/moltis/pull/1194) fixes an unbound variable error caused by empty array expansion under `set -euo pipefail`.

4. **Low — Flaky fanout timeout test under full-suite load**  
   [Issue #1193](https://github.com/moltis-org/moltis/issues/1193) describes `fanout_is_bounded_and_times_out_a_hung_endpoint` failing intermittently only during full-suite runs. No fix PR exists yet, but it appears to be a test/CI race rather than a production bug.

## 6. Feature Requests & Roadmap Signals

The main roadmap signal is **[PR #1190 — Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)**. This is a large feature that would add:

- Provider-neutral connector persistence with atomic snapshots and scheduling
- Read-only CalDAV datasets
- Reusable Slack, Discord, Matrix, and Microsoft Teams message-history datasets without copying channel credentials
- Bounded local full-text search and projections

If merged, this would likely be a headline feature of the next Moltis release. The PR is 3 days old and still open, so it may need maintainer review. The upstream `openclaw` renames also suggest Moltis should audit remaining `steipete/*` references before the next release.

## 7. User Feedback Summary

User-reported pain points in the last 24 hours center on environment compatibility and upstream dependency drift:

- macOS users cannot run `just local-validate-full` due to bash 3.2 behavior ([PR #1194](https://github.com/moltis-org/moltis/pull/1194)).
- Sandbox builds are completely broken by the `gogcli` module path change ([PR #1191](https://github.com/moltis-org/moltis/pull/1191)).
- Skills fail to install because external repositories moved organizations ([PR #1192](https://github.com/moltis-org/moltis/pull/1192)).
- Full-suite CI is occasionally flaky, which can obscure real failures ([Issue #1193](https://github.com/moltis-org/moltis/issues/1193)).

No explicit user satisfaction data was available, but the reports are constructive and include reproduction commands, which indicates engaged technical users.

## 8. Backlog Watch

- **[PR #1190 — Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)** is the longest-open item still awaiting merge or maintainer feedback. As a large feature PR, it risks merge conflicts if left unattended.
- **[Issue #1193 — Flaky fanout timeout test](https://github.com/moltis-org/moltis/issues/1193)** may need a maintainer to tag it as `infra` or `test-flake` and schedule a fix, since it only appears under full-suite load.
- The three open fix PRs from Lstarsky0 ([#1191](https://github.com/moltis-org/moltis/pull/1191), [#1192](https://github.com/moltis-org/moltis/pull/1192), [#1194](https://github.com/moltis-org/moltis/pull/1194)) are small and should be reviewed promptly to unblock affected users.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-14

> Note: The provided data URLs point to `github.com/agentscope-ai/QwenPaw`; this digest treats CoPaw and QwenPaw as the same project line.

## 1. Today's Overview

CoPaw/QwenPaw is in a high-activity window: **43 issues** and **50 PRs** were updated in the last 24 hours, with 26 issues still open and 31 PRs open. Two releases landed, including the significant **v2.1.0** with the new **QwenPaw OS Shell** windowing/desktop layer. Closed/merged PRs show steady hardening around Mission Mode limits, chat pagination, and optional channel dependencies. Community attention is concentrated on multi-step tasks stopping prematurely, security/antivirus conflicts, and missing daemon/background mode. Overall throughput is healthy, but trust-related concerns and a few high-severity bugs deserve maintainer visibility.

## 2. Releases

### [v2.1.0](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0)
- **Added: QwenPaw OS Shell**
  - Open apps in movable, resizable windows with a launcher, taskbar, notifications, and saved layouts.
  - Installed and marketplace apps now share one catalog across the App Center and related surfaces.
- The provided release snippet is truncated; full release notes should be consulted in the GitHub release.
- No explicit breaking-change or migration notes were included in the source data.

### [v2.1.0-beta.5](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.5)
- `fix(chats)`: handle dict-like model responses ([#6816](https://github.com/agentscope-ai/QwenPaw/pull/6816))
- `fix(memory)`: simplify long-term memory guidance ([#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942))
- `docs(website)`: Files workspace documentation improvements.

## 3. Project Progress

**19 PRs were merged/closed in the last 24 hours.** Top visible examples from the provided data:

- [#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) — `fix: make Auto-Dream integration resilient`  
  Makes the Auto-Dream memory pipeline tolerant of malformed structured LLM output.
- [#6652](https://github.com/agentscope-ai/QwenPaw/pull/6652) — `fix(mission): enforce max_iterations server-side in MissionGate`  
  Fixes runaway Mission Mode sub-agent dispatch that could create 54+ sub-sessions instead of the configured 20.
- [#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636) — `fix(chats): add pagination to chat history and enable GZip compression`  
  Addresses 30-second timeouts for long, 1MB+ chat histories.
- [#6387](https://github.com/agentscope-ai/QwenPaw/pull/6387) — `feat(channels): install optional dependencies on demand`  
  Keeps channel registry intact while reducing default dependency weight.
- [#6989](https://github.com/agentscope-ai/QwenPaw/pull/6989) — release notes preparation for v2.1.0.

These are mostly stability and architecture-hardening changes rather than brand-new user-facing features.

## 4. Community Hot Topics

Most active issues by comment count:

- [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — **Agent stops after saying “Now 2.1, 3.1, 3.2. Let me do all three.”**  
  6 comments. Users report multi-step tasks silently halt after planning and only continue after manually saying “继续”.
  **Underlying need:** reliable autonomous task execution without babysitting.

- [#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973) — **QwenPaw Creator support for Alibaba Cloud Bailian token plans**  
  5 comments. Users want cloud token-plan billing integrated.
  **Underlying need:** cost flexibility and local-China cloud ecosystem integration.

- [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) — **OpenAI Responses continuation summary ignores `disable_thinking` and misreports cancellation**  
  5 comments. Closed, but highlights real model-provider edge-case friction.

- [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — **prompts.py lies to agents: Dream writes to digest/, not MEMORY.md**  
  5 comments. Memory documentation/prompt behavior does not match implementation.
  **Underlying need:** transparency and truthful agent memory instructions.

- [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) — **QwenPaw gets killed by antivirus while WorkBuddy does not**  
  4 comments. Antivirus false positives are disrupting real task runs.

- [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047) — **New chat reopens old session after upgrade**  
  4 comments. Session-isolation regression affecting upgrade trust.

The active discussion is largely Chinese-language, reflecting a strong local community around task automation, desktop control, and cloud-provider integration.

## 5. Bugs & Stability

Ranked by severity:

### Critical / Contested security report
- [#6992](https://github.com/agentscope-ai/QwenPaw/issues/6992) and [#6993](https://github.com/agentscope-ai/QwenPaw/issues/6993) — claim port `8088` exposure, unauthenticated plugin-install API, and possible RCE via malicious plugins.  
  Both were closed as invalid in the dataset, but the duplicate reporting suggests users are actively looking at QwenPaw’s attack surface. No fix PR is visible in the provided data.

### High
- [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Multi-step task silently stops after planning; no error, no prompt.  
  Open, no fix PR visible.
- [#7008](https://github.com/agentscope-ai/QwenPaw/issues/7008) — Anthropic model-side “input sensitive image” false positive interrupts long historical sessions.  
  Open, no fix PR visible.
- [#7007](https://github.com/agentscope-ai/QwenPaw/issues/7007) — Windows Desktop TUI fails with `transport: Connection closed` because packaged `qwenpaw.exe` rejects `-m qwenpaw acp`.  
  Open, no fix PR visible.

### Medium
- [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) — Random startup crash/exit on pip-installed v2.0.1 (Windows).  
  Open.
- [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) — After Scroll compaction, pre-compaction chat history is hidden; UI shows only eviction/memory indices.  
  Open, no fix PR visible.
- [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) — Enabling Shabox breaks UV because it cannot write to `~/.cache/uv`.  
  Open; user workaround is adding `Write(~/.cache/uv/**)` to `policy.yaml`.
- [#7009](https://github.com/agentscope-ai/QwenPaw/issues/7009) — Cloudflare Tunnel + monitor plugin triggers false-positive Pod termination email.  
  Open.

### Low
- [#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006) — Language options list inconsistent between top-right dropdown and bottom-left settings gear.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals from user requests:

- [#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010) — **True daemon/background mode** so `qwenpaw app` doesn’t block SSH or script invocations.
- [#7002](https://github.com/agentscope-ai/QwenPaw/issues/7002) — **Server-deployed QwenPaw + lightweight desktop proxy client**, rather than running the heavy desktop app everywhere.
- [#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970) — Embeddable chat sub-page without sidebar/header, API-key bypass option, and improved session-list filtering.
- [#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973) — **Alibaba Cloud Bailian token plan support** in QwenPaw Creator.
- [#6995](https://github.com/agentscope-ai/QwenPaw/issues/6995) — Inject `QWENPAW_CHANNEL` env var into shell subprocesses so external tools know the channel context.
- [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) — **ViBo memory proposal**: encrypted, compact memory with claimed 97.5% fewer tokens.
- [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) — CopilotKit integration questions.
- [#6283](https://github.com/agentscope-ai/QwenPaw/issues/6283) — Automatically append current real-world time to every model context to prevent date confusion across long-lived sessions.

Open PRs also signal direction:

- [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) — session-scoped multi project directories
- [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — Pawport import flow from Codex/Qoder
- [#6984](https://github.com/agentscope-ai/QwenPaw/pull/6984) — ReMe runtime status dashboard
- [#7001](https://github.com/agentscope-ai/QwenPaw/pull/7001) — Matrix per-sender session/memory isolation
- [#6998](https://github.com/agentscope-ai/QwenPaw/pull/6998) — prevent semaphore leaks from unconsumed LLM streams
- [#6999](https://github.com/agentscope-ai/QwenPaw/pull/6999) — prebuild multi-arch Docker images before publish

**Prediction:** after v2.1.0’s OS Shell, the next likely focus areas are headless/remote operation, memory transparency, and provider/plugin reliability.

## 7. User Feedback Summary

- **Positive sentiment:** The project is described as “very good” and cited as having ~33.7k stars in [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003).
- **Core pain points:**
  - Agents stop mid-task after announcing next steps ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)).
  - Antivirus software kills/interferes with QwenPaw processes ([#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)).
  - Cannot run QwenPaw in true background/daemon mode on servers or via SSH ([#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010)).
  - Desktop client feels heavy, slow to start, and doesn’t sync agent data well ([#7002](https://github.com/agentscope-ai/QwenPaw/issues/7002)).
  - Compaction hides user-visible chat history ([#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)).
  - UI annoyances such as flickering character counts and inconsistent language lists ([#6585](https://github.com/agentscope-ai/QwenPaw/issues/6585), [#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006)).
- **Use-case patterns:** users are running real financial data tasks, long document/history sessions, server-side deployments, desktop automation, and Chinese cloud model integrations.

## 8. Backlog Watch

Items that may need maintainer attention:

- [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — **`feat: unify provider discovery, model metadata, routing, and agent controls`**  
  Open since **2026-07-21**, updated 2026-08-13. Large architectural PR; risk of conflict with newer provider changes.

- [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) — **`feat(onebot): localize inbound media before agent processing`**  
  Open since 2026-08-05; under review. Channel-media handling is important for OneBot users.

- [#6823](https://github.com/agentscope-ai/QwenPaw/pull/6823) — **`feat(providers): apply documented capability templates to custom providers`**  
  Open since 2026-08-08; first-time contributor PR. Needs reviewer attention to avoid stalling.

- [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) — **Antivirus false positives / forced process termination**  
  Open since 2026-08-09 with 4 comments. No maintainer/fix signal visible in the provided data.

- [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — **Silent mid-task stops after planning**  
  Open since 2026-08-12 with 6 comments. This is arguably the most important autonomy-reliability issue in the current dataset.

Overall, the project is moving fast, but community attention is now focused on reliability, security perception, and headless/server deployment — areas that are likely to shape the next release cycle.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-14

## 1. Today's Overview

ZeroClaw is in a period of very high activity: 50 issues and 50 PRs were updated in the last 24 hours, with 13 issues closed and 10 PRs merged/closed. No new releases shipped. The project remains deep in v0.9.0 hardening — the day's work centered on security fixes (gateway dashboard asset containment, Zhipu credential handling, pairing lockout remediation), RFC refinement around shell-command policy and session persistence, and CI/toolchain modernization (Rust 1.97.1, Blacksmith runners, CodeQL false-positive cleanup). Four active trackers show that maintainers are consolidating architecture decisions around auth, session persistence, and ADR follow-through. Notably, several accepted features remain **blocked** or waiting on author action, suggesting maintainer bandwidth is the current bottleneck.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

**Merged/closed PRs (10 total in window):**

- **Security fix — [PR #9969](https://github.com/zeroclaw-labs/zeroclaw/pull/9969)** `fix(gateway): contain filesystem dashboard assets` — canonicalizes paths and confines filesystem-backed dashboard assets to the configured distribution root, rejecting symlink escapes (p1, closed)
- **Stability fix — [PR #9674](https://github.com/zeroclaw-labs/zeroclaw/pull/9674)** `fix(infra): preserve session queue serialization during eviction` — registers session requests while the slot map is still locked so idle eviction cannot race (p1, closed)
- **Bug fix — [PR #9709](https://github.com/zeroclaw-labs/zeroclaw/pull/9709)** `fix(tts): clean up Edge TTS temp output on every error path` (closed)
- **Bug fix — [PR #9705](https://github.com/zeroclaw-labs/zeroclaw/pull/9705)** `fix(config): allow config set on existing hyphenated cron aliases` (closed)
- **CI — [PR #9966](https://github.com/zeroclaw-labs/zeroclaw/pull/9966)** `fix(container): match nested fixture manifests by glob` (closed)
- **CI — [PR #9932](https://github.com/zeroclaw-labs/zeroclaw/pull/9932)** `ci(codeql): drop rust/hard-coded-cryptographic-value` — 27 alerts, all false positives on `cfg(test)` (closed)
- **CI — [PR #9984](https://github.com/zeroclaw-labs/zeroclaw/pull/9984)** validation-only run of the Blacksmith rust-cache path (closed)
- **Docs — [PR #9639](https://github.com/zeroclaw-labs/zeroclaw/pull/9639)** `docs(architecture): document provider routing lifecycle` (closed)

**Closed issues today:** [Issue #9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389) (pairing lockout security bug), [Issue #9951](https://github.com/zeroclaw-labs/zeroclaw/issues/9951) (WeChat never compiled in CI), [Issue #9366](https://github.com/zeroclaw-labs/zeroclaw/issues/9366) (WhatsApp approval_timeout_secs ignored), [Issue #9643](https://github.com/zeroclaw-labs/zeroclaw/issues/9643) (WIT enum-variant versioning docs), [Issue #9712](https://github.com/zeroclaw-labs/zeroclaw/issues/9712) (weekly lettered release cuts), plus temp-file cleanup bugs [Issue #9710](https://github.com/zeroclaw-labs/zeroclaw/issues/9710) / [Issue #9706](https://github.com/zeroclaw-labs/zeroclaw/issues/9706).

**Features advanced (open PRs updated today):** [PR #9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) adds `zeroclaw agents export` for portable agent bundles; [PR #9942](https://github.com/zeroclaw-labs/zeroclaw/pull/9942) surfaces the withheld `vi_verify` tool through config; [PR #9968](https://github.com/zeroclaw-labs/zeroclaw/pull/9968) fail-closes Zhipu JWT handling; [PR #9527](https://github.com/zeroclaw-labs/zeroclaw/pull/9527) bumps routine toolchains to Rust 1.97.1; [PR #9985](https://github.com/zeroclaw-labs/zeroclaw/pull/9985) extends Blacksmith runners.

## 4. Community Hot Topics

- **[Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — RFC: Goal mode v1** (20 comments, 1 👍) — the most active thread. Proposes bounded foreground "Matrix" work across multiple agent turns. Needs maintainer review; risk: high.
- **[Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — RFC: Shell command confirmation tier** (18 comments) — Claude Code-style allow/ask/deny policy. Revision 3 narrowed normative scope per maintainer feedback; still needs maintainer review.
- **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Tracker: Maintainer decision queue for RFCs** (13 comments) — the coordination surface for all pending RFC/design decisions; accepted.
- **[Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) — RFC: Decouple memory lifecycle policy from storage backends** (12 comments) — needs author action.
- **[Issue #9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) — Bug: verifiable-intent skips credential-chain verification** (12 comments) — accepted and in-progress; security-relevant.
- **[Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — RFC: Runtime-owned conversation sessions** (11 comments) — ties into the session-persistence tracker [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600).

**Underlying needs:** the community is converging on four themes — (a) policy-driven, safer shell/tool execution, (b) durable multi-turn goal execution, (c) separation of memory storage from lifecycle policy, and (d) a single authoritative session-persistence contract before v0.9.0 breaking changes land.

## 5. Bugs & Stability

**Security (highest concern):**
- **[Issue #9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929)** [p1, risk:high] — headless SOP step turns get a session path but are never persisted to the session store. Accepted, currently **blocked**.
- **[Issue #9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)** [p1, risk:high] — unauthenticated `POST /api/pair` keyed its lockout on an attacker-supplied header. **Closed** in this window.
- **[Issue #9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)** [p2, risk:high] — `vi_verify` evaluates constraints without cryptographically verifying the credential chain. Accepted/in-progress; related fix [PR #9942](https://github.com/zeroclaw-labs/zeroclaw/pull/9942) improves operator visibility.

**Config/regression bugs:**
- **[Issue #9951](https://github.com/zeroclaw-labs/zeroclaw/issues/9951)** [p2, closed] — WeChat channel and its 51 unit tests never compile or execute in any CI feature set.
- **[Issue #9366](https://github.com/zeroclaw-labs/zeroclaw/issues/9366)** [p2, closed] — WhatsApp Web accepts `approval_timeout_secs` but never reads it.
- **[Issue #9710](https://github.com/zeroclaw-labs/zeroclaw/issues/9710)** / **[Issue #9706](https://github.com/zeroclaw-labs/zeroclaw/issues/9706)** [p3, closed] — temp file leaks on macOS screenshots and Edge TTS error paths; fix merged via [PR #9709](https://github.com/zeroclaw-labs/zeroclaw/pull/9709).

**Fix PRs still in flight:** [PR #9968](https://github.com/zeroclaw-labs/zeroclaw/pull/9968) (p1, Zhipu JWT fail-closed), [PR #9942](https://github.com/zeroclaw-labs/zeroclaw/pull/9942) (vi_verify reporting), [PR #8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) (file_download SSRF opt-in gate — awaiting author action).

## 6. Feature Requests & Roadmap Signals

**Fresh, high-signal requests:**
- **[Issue #9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945)** — browser tool exposes only 16 of agent-browser's 100+ commands; iframes, dialogs, tabs, form controls unreachable. Accepted but **blocked**.
- **[Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)** — downscale oversized images instead of dropping them; allow `0` to disable multimodal limits. Accepted but **blocked**.
- **[Issue #9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)** — provider-grouped, paginated Telegram `/model` inline-keyboard picker. Accepted.
- **[Issue #9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)** — stable `session_id` to OpenRouter for prompt-cache savings; direct cost impact, **blocked**.
- **[Issue #9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)** — load Agent Plugins 1.0 skill/MCP packages; vendor-neutral plugin standard, **blocked**.
- **[PR #9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986)** — export an agent to a portable bundle (`agents export`), new capability filed yesterday.

**v0.9.0 roadmap signals** (per tracker [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)): auth/security/gateway breaking changes, SOP permission contract ([#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)), typed peer policy ([#9880](https://github.com/zeroclaw-labs/zeroclaw/issues/9880)), shell policy ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)), and session persistence ([#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)).

**Prediction:** the next release will likely be v0.9.0 consolidating the auth/security/gateway breaking changes. Cost-saving (OpenRouter session_id), browser tool expansion, and multimodal image downscaling are the strongest candidates for the following release.

## 7. User Feedback Summary

**Pain points expressed by users:**
- **Cost:** OpenRouter chats are "unnecessarily expensive" — system prompt and tool schemas replayed every turn without a stable `session_id` ([#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)).
- **Mobile UX:** text-based `/model` is "cumbersome on mobile when many routes are configured" ([#9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)).
- **Tooling gaps:** browser automation severely limited at 16/100+ commands ([#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945)); no LSP support for local-model coding ([#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)).
- **Context loss:** oversized images are dropped outright rather than downscaled, losing attached context ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)).
- **False positives:** the leak detector redacts **public** blockchain addresses, breaking payment-request URLs ([#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)).
- **Safety:** users want Claude Code-style allow/ask/deny for high-risk shell commands ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)).

**Satisfaction signals:** issues are being closed promptly (pairing security bug, temp-file leaks, WeChat CI gap), and maintainer feedback is being incorporated into RFC revisions (shell policy scope narrowed). However, several accepted items sit **blocked** awaiting author action or maintainer review — a recurring friction point visible across the queue.

## 8. Backlog Watch

Long-running or stalled items needing maintainer/author attention:

- **[Issue #5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)** — Opt-in LSP support for ZeroCode coding workflows. Open since **2026-04-19** (~4 months), needs-author-action.
- **[Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** — RFC: decouple memory lifecycle from storage backends. Since 2026-05-22, needs-author-action.
- **[Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** — Shell confirmation policy RFC. Since 2026-06-03, needs-maintainer-review, 18 comments.
- **[Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — Goal mode v1 RFC. Since 2026-06-24, needs-maintainer-review, 20 comments (most-commented issue).
- **[PR #8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)** — file_download SSRF opt-in gate. Since 2026-07-04, needs-author-action; security-relevant.
- **[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — Native Hailo-Ollama provider support. Since 2026-07-17, large/XL.
- **[Issue #9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)** — Execution-tree iteration budget ownership. Needs-author-action.
- **[Issue #9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)** — OpenRouter `session_id`. Blocked, needs-author-action; carries direct cost impact for users.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*