# AI CLI Tools Community Digest 2026-08-12

> Generated: 2026-08-12 02:00 UTC | Tools covered: 10

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

# Cross-Tool AI CLI Comparison Report — 2026-08-12

## 1. Ecosystem Overview

The AI CLI ecosystem is in a **stabilization-plus-expansion phase**: mature tools like Claude Code and Gemini CLI are shipping incremental reliability fixes, while OpenAI Codex and Qwen Code churn out multiple releases per day toward next-generation runtimes. The dominant community concerns have shifted from "what can these tools do" to **trust and governance** — subagent behavior transparency, false success reporting, resource exhaustion, and silent configuration overrides appear across nearly every tracker. Windows support remains the single largest recurring pain point, with plugin lifecycle corruption, console flashing, and path-resolution bugs affecting six of nine active tools. Meanwhile, MCP/ACP protocol interop and persistent cross-session memory are emerging as the next major feature battlegrounds.

## 2. Activity Comparison

| Tool | Hot Issues | PRs (24h) | Releases (24h) | Notable Release |
|---|---|---|---|---|
| **Claude Code** | 10 | 7 | 1 | v2.1.228 (rendering fixes, Windows Git discovery) |
| **OpenAI Codex** | 10 | 10 | 3 | rust-v0.148.0-alpha.7 → .alpha.9 |
| **Gemini CLI** | 10 | 9 | 4 | v0.56.0-nightly (capacity-exhaustion fix) |
| **GitHub Copilot CLI** | 10 | 3 | 0 | — (v1.0.79 bug cluster in triage) |
| **Kimi Code CLI** | 3 | 8 | 0 | — (→ `/effort` PR #2509 pending) |
| **OpenCode** | 10 | 13 | 0 | — (V2 `next` channel hardening) |
| **Pi** | 10 | 10 | 0 | — (login/streaming fixes landed) |
| **Qwen Code** | 10 | 10 | 4 | v0.21.10, v0.21.11-preview.0, nightly, live-host-v0.1.1 |
| **DeepSeek TUI** | 10 | 6 | 0 | — (v0.9.5 regression response PRs) |
| **Grok Build** | — | — | — | No activity |

**Velocity leaders:** Qwen Code and Gemini CLI (4 releases each) and OpenAI Codex (3 alpha releases) are iterating fastest. Claude Code is shipping steady patch releases. Copilot CLI, Kimi, OpenCode, Pi, and DeepSeek TUI are in PR-pipeline mode (fixes in flight, no release cut today).

## 3. Shared Feature Directions

| Direction | Tools | Specific Needs |
|---|---|---|
| **Persistent memory / cross-session context** | Kimi (#1283, 34 comments), Copilot CLI (#4441), Gemini (Auto Memory cluster #26516–26525), Claude Code (skills/context reuse) | AI-managed + user-defined memory, durable context across compactions, deterministic redaction of sensitive transcript data |
| **Subagent transparency & governance** | Gemini (#22323 false MAX_TURNS success, #21409 hangs), Claude Code (#80988 `heron_brook` delegation override), Copilot CLI (#4432, #4380 rubber-duck model override), DeepSeek (#5324 32-field schema), Qwen Code (#8182 ACP memory guards) | Failures must not masquerade as success; user delegation/settings must not be silently overridden; subagent resource budgets need real caps |
| **Configurable reasoning effort** | Kimi (#2509 `/effort`), Qwen Code (#8526 reasoning-effort session config), Pi (#7553 compaction thinking level, #7966 `--thinking`) | Per-operation control over reasoning depth to trade latency/cost vs. thoroughness |
| **MCP protocol hardening** | Claude Code (#36024 multi-account Gmail, #79986 tools never dispatched), Codex (#38103, #38089 MCP OAuth CIMD), Copilot CLI (#4211 BigInt serialization) | Multi-account multiplexing, reliable dispatch, OAuth/registration standards, type-safety |
| **Windows platform parity** | Claude Code (#14828 console flash), Codex (#20214, #38059, #25391), Copilot CLI (#4095, #4151 plugin access denied), Kimi (#2600 D: drive path), OpenCode (#37090 CRLF), Qwen Code (#8644 URL-encoded drive letters), DeepSeek (#4564 flag parsing) | Plugin lifecycle integrity, no console flashing, correct path/encoding handling, memory stability |
| **Resource governance & OOM prevention** | Claude Code (#54394 ugrep OOM), Codex (#38059 8.8 GB idle), Copilot CLI (#3976 tgrep OOM-kills host, #4251 resume OOM), OpenCode (#27924 compaction loop, #41848 infinite retry), Gemini (#26522 retry loops), Qwen Code (#8182, #8947) | Memory caps on daemons/indexers, retry backoff ceilings, deterministic loop breaking |
| **Supply-chain security** | Gemini (#28780 shell-quote CVE, #28778 simple-git CVE, #28773 nanoid), Qwen Code (#8944 npm vulns), Copilot CLI (#4449 `pull_request_target` removal) | Transitive dependency auditing, CI workflow hardening, rapid community CVE PRs |
| **Headless/automation reliability** | Codex (#31376 `exec` hangs), Qwen Code (#8920 `stream-json` false success), Kimi (ACP assert hardening #2057/#2055), OpenCode (#41898 empty-response handling) | Correct exit codes, bounded waits, no silent false-positive completions |

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise-grade IDE/desktop agent | Professional developers in large orgs | Node-based, Opus 5 model, MCP-first, Cowork VM; slow, careful release cadence; strongest GUI/desktop companion |
| **OpenAI Codex** | Rapid CLI/agent runtime iteration | Developers on the OpenAI platform | Rust rewrite (alpha channel), gRPC code-mode sessions, hosted app context, Windows sandbox ACLs; velocity over stability |
| **Gemini CLI** | Agent observability & evals | Google Cloud / Vertex users | Nightly + preview tracks, behavioral eval infrastructure (76 tests), AST-aware navigation EPICs, subagent trajectory sharing requests |
| **Copilot CLI** | GitHub-native enterprise workflows | GitHub Enterprise / Copilot subscribers | Tight GitHub Copilot integration, rubber-duck adversarial reviews, skills/plugins; server-side entitlement coupling causes confusing failures |
| **Kimi Code CLI** | Lightweight Python coding agent | Python-centric developers | Python-based, ACP protocol, smaller feature surface; community focuses on memory and reasoning-effort control |
| **OpenCode** | Multi-runtime TUI orchestration | TUI power users / early adopters | V2 "next" beta with ALSA/TUI polish, Claude Code ACP runtime PR, DevTools experiments bar, Zap-style commands (`/usage`, `/security-review`) |
| **Pi** | Multi-provider terminal agent | Copilot & Qwen API users | Bun/TypeScript, streaming protocol transparency (JSON/RPC events), Mermaid rendering, Cloudflare AI Gateway support |
| **Qwen Code** | Daemon/WebShell remote agent | Qwen API / DashScope + enterprise daemon users | daemon + ACP architecture, tmux-backed interactive subagents, Web Shell uploads/image previews, resource-guard validation |
| **DeepSeek TUI** | Minimal Rust TUI for DeepSeek | DeepSeek API users, TUI purists | Rust + Ratatui, agent tool schema simplification, provider routing (OrcaRouter), PiP terminal windows |

## 5. Community Momentum & Maturity

- **Most mature / enterprise-stable:** Claude Code. One patch release, low PR churn, highest issue-quality bar. Community focuses on advanced needs (MCP multiplexing, delegation policy) rather than basic stability.
- **Fastest iterating:** OpenAI Codex (3 alphas/24h) and Qwen Code (4 releases/24h). Codex is burning down Windows sandbox/plugin issues; Qwen is shipping WebShell/daemon features at a rapid clip.
- **Strong community pull:** Gemini CLI has the most coordinated feature-request culture (EPICs, eval infrastructure, maintainer-led issue triage), but its subagent trust issues (#21409, #22323) are the most serious reputational risk in the ecosystem.
- **Highest-urgency bug debt:** Copilot CLI's v1.0.79 settings-wipe regression (#4431) and Windows plugin failures (#4095, 14 👍) — data loss in a production release is the most severe single incident today.
- **Beta-testing community:** OpenCode's V2 `next` channel has an engaged early-adopter base filing and triaging regressions quickly (ALSA corruption, migration crash, webfetch null), but the volume indicates the preview needs hardening.
- **Quiet but solid:** Pi closed a long-running WSL login hang and is steadily improving streaming/export UX. Kimi has low issue volume but high-signal demand (memory system #1283 at 34 comments). DeepSeek TUI is small but maintainer-driven with fast PR response to regressions.

## 6. Trend Signals

1. **Trust is the new feature.** Across Gemini, Claude Code, and Copilot CLI, users are demanding that agents *report failure honestly* (MAX_TURNS ≠ GOAL success), *respect user configuration* (no `heron_brook`-style stealth overrides), and *reveal subagent reasoning*. Tool builders who treat observability as a first-class feature will win developer confidence.

2. **Persistent memory is the next adoption gate.** Kimi's six-month #1283 thread and Copilot CLI's compaction-durability request signal that users no longer accept re-stating context every session. Expect "memory systems" (with deterministic redaction) to become table stakes within two quarters.

3. **Windows is the battleground platform.** Six of nine active tools have open Windows-specific defects ranging from cosmetic (console flashing) to catastrophic (plugin state corruption, OOM-kill). Tools that ship reliable Windows plugin lifecycle management and sandboxing will capture significant market share from frustrated users.

4. **Resource governance is a hard requirement, not a nicety.** Unbounded retries, indexer OOM-kills, and compaction loops are appearing across every major tool. Users are hitting real financial and operational damage (8 GB V8-heap freezes, $600+ billing incidents, host OOM-kills). Expect watchdog/backoff/cap features to be prominently marketed.

5. **MCP/ACP protocol interop is consolidating.** OpenCode adding Claude Code as an ACP runtime, Codex adding CIMD OAuth, and Qwen's ACP resource guards all point toward a standardized agent-client protocol layer — but the current fragmentation (MCP server dispatch failures, BigInt crashes) shows the ecosystem is still pre-standardization.

6. **Supply-chain security is now community-driven.** The Gemini shell-quote/simple-git CVE fixes from a single contributor within 24 hours, plus Copilot CLI's CI hardening PR, show that open-source security remediation velocity is a competitive signal. Tools that are slow to merge security PRs will face user backlash.

7. **Configurable reasoning effort is becoming a UX differentiator.** Kimi's `/effort`, Qwen's ACP reasoning levels, and Pi's thinking-level overrides all address the same need: developers want explicit control over the latency/cost/quality tradeoff at both session and per-operation granularity.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Report — 2026-08-12

*Source: github.com/anthropics/skills (official Claude Code Skills repository)*

## 1. Top Skills Ranking

The eight most-discussed pull requests by comment activity, all currently **Open**:

1. **skill-creator evaluation fix** ([PR #1298](https://github.com/anthropics/skills/pull/1298)) — Fixes `run_eval.py`'s systemic `recall=0%` bug that makes the description-optimization loop "optimize against noise." Addresses Windows stream reading, trigger detection, and parallel workers; references 10+ independent reproductions of the bug (issue #556).
2. **document-typography skill** ([PR #514](https://github.com/anthropics/skills/pull/514)) — Typographic quality control for AI-generated documents: orphan word wrap, widow paragraph headers, and numbering misalignment.
3. **pdf skill case-sensitivity fix** ([PR #538](https://github.com/anthropics/skills/pull/538)) — Corrects 8 mismatched file references in `skills/pdf/SKILL.md` that break skill loading on case-sensitive filesystems.
4. **ODT / OpenDocument skill** ([PR #486](https://github.com/anthropics/skills/pull/486)) — Creation, template filling, and ODT→HTML parsing for `.odt`/`.ods`, targeting LibreOffice and ISO-standard document workflows.
5. **frontend-design skill revision** ([PR #210](https://github.com/anthropics/skills/pull/210)) — Overhauls the frontend-design skill for clarity and actionability, aiming for instructions Claude can execute within a single conversation.
6. **Meta skill analyzers** ([PR #83](https://github.com/anthropics/skills/pull/83)) — Adds `skill-quality-analyzer` and `skill-security-analyzer`, meta-skills evaluating other Skills across five dimensions (structure, documentation, examples, resources, security).
7. **docx tracked-change fix** ([PR #541](https://github.com/anthropics/skills/pull/541)) — Prevents OOXML document corruption from `w:id` collisions between new tracked changes and existing bookmarks.
8. **skill-creator YAML validation fix** ([PR #539](https://github.com/anthropics/skills/pull/539)) — Adds pre-parse detection of unquoted `description` fields containing `:`, preventing silent frontmatter truncation.

## 2. Community Demand Trends

From the most-commented issues:

- **Security and trust boundaries** — The highest-activity issue ([#492](https://github.com/anthropics/skills/issues/492), 43 comments) flags that community Skills distributed under the `anthropic/` namespace enable trust-boundary abuse: users may grant elevated permissions believing Skills are official. A related concern ([#1175](https://github.com/anthropics/skills/issues/1175)) applies the same security/context-window lens to SharePoint Online document handling.
- **Reliable skill-authoring tooling** — Multiple issues ([#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169), [#202](https://github.com/anthropics/skills/issues/202)) target the skill-creator evaluation loop's 0% recall and Windows incompatibilities; the community wants an authoring pipeline that optimizes against real signal.
- **Org-wide Skill sharing** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests direct organizational Skill sharing instead of manual `.skill` file downloads via Slack/Teams.
- **Agent memory and state management** — [#1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` Skill using symbolic notation to reduce a long-running agent's context overhead.
- **Efficiency and context-window hygiene** — [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` Skill eagerly injecting ~156k tokens in a single call, exhausting the context window.
- **Governance and safety patterns** — [#412](https://github.com/anthropics/skills/issues/412) proposes an `agent-governance` Skill covering policy enforcement, threat detection, trust scoring, and audit trails.
- **Ecosystem hygiene** — [#189](https://github.com/anthropics/skills/issues/189) documents duplicate Skills between `document-skills` and `example-skills` plugins, wasting context window.
- **Interoperability** — Recurring requests to expose Skills as MCPs ([#16](https://github.com/anthropics/skills/issues/16)) and to support AWS Bedrock ([#29](https://github.com/anthropics/skills/issues/29)).

## 3. High-Potential Pending Skills

Notable open PRs with active discussion that may land soon:

- **self-audit Skill** ([PR #1367](https://github.com/anthropics/skills/pull/1367)) — Universal output verification: mechanical file checks followed by a four-dimension reasoning quality gate; tied to proposal [#1385](https://github.com/anthropics/skills/issues/1385). Updated as recently as 2026-07-02.
- **testing-patterns Skill** ([PR #723](https://github.com/anthropics/skills/pull/723)) — Comprehensive coverage: Testing Trophy philosophy, unit-testing patterns, React component testing with Testing Library.
- **pyxel retro-game Skill** ([PR #525](https://github.com/anthropics/skills/pull/525)) — MCP-driven workflow for Pyxel retro/pixel-art/8-bit game development (write → run_and_capture → inspect → iterate); still receiving updates as of 2026-07-15.
- **plan-file-hygiene Skill** ([PR #1479](https://github.com/anthropics/skills/pull/1479)) — Addresses the lifecycle gap of accumulating planning artifacts (issue #1417).
- **color-expert Skill** ([PR #1302](https://github.com/anthropics/skills/pull/1302)) — Self-contained color expertise: naming systems (ISCC-NBS, Munsell, RAL, XKCD) and color-space selection tables.
- **SAP-RPT-1-OSS predictor Skill** ([PR #181](https://github.com/anthropics/skills/pull/181)) — Predictive analytics on SAP business data using SAP's open-source tabular foundation model.

Additional skill-creator bug fixes ([#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#1323](https://github.com/anthropics/skills/pull/1323)) are also actively discussed and would unblock the broader authoring ecosystem.

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for dependable skill infrastructure: fixing the skill-creator evaluation/optimization loop so Skill descriptions are tuned against real signal, and establishing security/trust guarantees for community-submitted Skills distributed under the official `anthropic/` namespace.

---

# Claude Code Community Digest — 2026-08-12

## Today's Highlights
Anthropic shipped **v2.1.228**, fixing interactive rendering stalls, Windows Git/Git Bash discovery, and `/tui` revert behavior. Meanwhile, the community is most engaged with a persistent Cowork VM failure (#27801), the long-running Windows console flashing issue (#14828), and a highly upvoted request for multi-account Gmail MCP support (#36024). A contentious system-prompt section (`heron_brook`) that overrides user delegation policy is also drawing significant attention (#80988).

## Releases
**v2.1.228** ([repo](https://github.com/anthropics/claude-code))
- Fixed interactive sessions that could stop redrawing entirely while the process kept running after a rare internal layout error.
- Fixed `git` / Git Bash not being found on Windows when Claude Code is launched from a parent folder of the git installation.
- Fixed `/tui` revert behavior.

## Hot Issues
1. **#27801 — Cowork: VM service not running** ([link](https://github.com/anthropics/claude-code/issues/27801))  
   72 comments, 41 👍. Top issue: `Cowork: "Failed to start Claude's workspace"` persists after reboot. Blocking adoption and generating the most community engagement.

2. **#14828 — Windows console window flashing when executing tools** ([link](https://github.com/anthropics/claude-code/issues/14828))  
   60 comments, 36 👍. Long-standing Windows QoL bug; still one of the most active issues after months.

3. **#54394 — WSL2: ugrep wrapper amplifies regex backtracking into V8-heap OOM** ([link](https://github.com/anthropics/claude-code/issues/54394))  
   27 comments. Embedded `ugrep` routes grep through Claude Code, turning grep-process OOM into an 8 GB V8-heap OOM that freezes the host.

4. **#36024 — Support multiple Gmail accounts in MCP integration** ([link](https://github.com/anthropics/claude-code/issues/36024))  
   25 comments, 77 👍. The most-upvoted enhancement in this digest. Users with personal + Google Workspace accounts want simultaneous Gmail MCP connections.

5. **#80988 — `heron_brook` prompt section overrides delegation policy** ([link](https://github.com/anthropics/claude-code/issues/80988))  
   21 comments, 48 👍. Opus 5-only system prompt injects “Do not call AgentTool unless requested,” silently overriding user-configured delegation with no opt-out.

6. **#33502 — Add setup folders to GUI recent list for deletion** ([link](https://github.com/anthropics/claude-code/issues/33502))  
   21 comments, 37 👍. Users want newly added folders to appear in the Claude Code GUI recent list so they can be managed/deleted.

7. **#79986 — Desktop MCP tools announced but never dispatched** ([link](https://github.com/anthropics/claude-code/issues/79986))  
   15 comments. External stdio MCP servers complete handshake, but the app never sends `tools/call`. Reported across all platforms and install types after a desktop update.

8. **#59408 — Ctrl+C / Ctrl+Shift+C silently clears prompt input** ([link](https://github.com/anthropics/claude-code/issues/59408))  
   14 comments. No confirmation or recovery path; users lose prompt contents by accident.

9. **#81703 — July 17 billing incident: $604.71 automatic recharges disputed** ([link](https://github.com/anthropics/claude-code/issues/81703))  
   12 comments. Users report paid usage credits being charged despite plan allowance after an acknowledged mass billing incident.

10. **#78775 — Desktop session time-range filter regression** ([link](https://github.com/anthropics/claude-code/issues/78775))  
    8 comments, 28 👍. Time-range filter only appears when “Group by” is set to State, breaking expected session filtering in the desktop app.

## Key PR Progress
Only 7 PRs were updated in the last 24h; all are listed below.

1. **#85925 — docs: point remaining stale doc links at code.claude.com** ([link](https://github.com/anthropics/claude-code/pull/85925))  
   Cleanup of old-domain doc links across plugins, skills, commands, and issue templates.

2. **#85834 — fix: HackerOne Bug Bounty Program access issue** ([link](https://github.com/anthropics/claude-code/pull/85834))  
   Community PR adjusting `devcontainer.json` so the hookify plugin installs correctly for HackerOne access.

3. **#70173 — fix(commit-commands): detect `[gone]` branches with `git branch -vv` in clean_gone** ([link](https://github.com/anthropics/claude-code/pull/70173))  
   Fixes `/clean_gone` never deleting anything because the old `git branch -v | grep '[gone]'` check did not work with upstream-gone branches. Closed.

4. **#85822 — docs: fix stale doc links and README drift in plugins and examples** ([link](https://github.com/anthropics/claude-code/pull/85822))  
   Verified redirect fixes for hooks docs and plugin README links.

5. **#85806 — fix(security-guidance): skip XSS warnings in docs** ([link](https://github.com/anthropics/claude-code/pull/85806))  
   Reuses the existing `_DOC_EXTS` filter so XSS-related patterns in documentation don’t trigger false warnings, while preserving source-file checks.

6. **#85243 — fix(skills): use spec-conformant names in plugin-dev and hookify skills** ([link](https://github.com/anthropics/claude-code/pull/85243))  
   Eight bundled skills use title-cased `name:` values containing spaces; corrected to spec-conformant names.

7. **#85716 — fix(hookify): load rules from ancestor `.claude` directories to prevent silent bypass** ([link](https://github.com/anthropics/claude-code/pull/85716))  
   Fixes #85613 by making hookify security rules load from ancestor `.claude` directories, closing a silent configuration-bypass hole.

## Feature Request Trends
- **MCP account multiplexing**: Strong demand for connecting multiple accounts, especially Gmail/Google Workspace (#36024).
- **Desktop/GUI session management**: Users want better recent-folder management (#33502) and less context-dependent UI filtering (#78775).
- **Cross-session coordination**: Heavy users want first-party coordination for independently launched sessions sharing one working tree (#76727).
- **User control over agent/delegation policy**: The `heron_brook` issue (#80988) reflects broader concern that system prompts should not silently override user-configured delegation.
- **Cost-aware agent spawning**: Request for guardrails against excessive parallel agent token consumption (#67636).

## Developer Pain Points
- **Windows/TUI rough edges**: Console flashing when running tools (#14828), Ctrl+C clearing prompt input (#59408), and Git discovery issues (fixed in v2.1.228) remain recurring friction.
- **Sandbox and performance breakage**: macOS sandbox fails with `E2BIG` when many git worktrees inflate the Seatbelt profile (#73468); WSL2 faces severe OOMs from embedded ugrep (#54394); large image reads can deadlock all subsequent API calls (#85884).
- **Agent trust and reliability**: Reports of instructions being read then ignored (#85677), tools claiming to review content without reading it (#72061), and unsanctioned autonomous actions (#71576) are becoming a notable pattern.
- **Billing/credits surprises**: Unexpected auto-recharges despite included plan limits (#81703, #83062) are causing trust issues.
- **Update/install reliability**: Auto-updates reporting success while leaving a non-functional stub binary (#85975/#85974) and blank desktop sessions after failed updates (#85798) are impacting upgrade confidence.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-12

## Today's Highlights
- Three Rust alpha releases landed within 24 hours (`v0.148.0-alpha.7` → `.alpha.9`), signaling continued rapid iteration on the CLI/agent runtime.
- Community attention remains dominated by Windows desktop stability, especially bundled Browser/Chrome/Computer Use plugins breaking after app updates.
- The current PR batch heavily targets Windows sandbox fixes, MCP/TUI performance, and code-mode/gRPC session routing.

## Releases
- [rust-v0.148.0-alpha.9](https://github.com/openai/codex/releases)
- [rust-v0.148.0-alpha.8](https://github.com/openai/codex/releases)
- [rust-v0.148.0-alpha.7](https://github.com/openai/codex/releases)

No detailed user-facing changelogs were included in the release notes. These are likely incremental stabilization releases building toward the next Rust client milestone.

## Hot Issues
Selected from the 50 issues updated in the last 24 hours.

1. [Linux desktop app request (#11023)](https://github.com/openai/codex/issues/11023) — The most popular platform request by far: 950 👍 and 207 comments. Closed, but the demand for a Codex Linux desktop app remains strong.

2. [Codex App freezes/stutters on Windows 11 (#20214)](https://github.com/openai/codex/issues/20214) — 96 comments. Users report UI freezes despite ample CPU/RAM. A recurring Windows desktop performance complaint.

3. [macOS Remote Control regression: `already has an active writer` (#37403)](https://github.com/openai/codex/issues/37403) — After the August 7 update, desktop cannot resume a thread started via mobile Remote Control or Codex CLI. High-impact for multi-device workflows.

4. [Windows Computer Use plugin fails to bootstrap (#25391)](https://github.com/openai/codex/issues/25391) — Native pipe/helper paths unavailable, blocking Computer Use setup on Windows. Part of a larger Windows plugin reliability cluster.

5. [`codex exec` can hang indefinitely before SSE stream starts (#31376)](https://github.com/openai/codex/issues/31376) — No timeout/retry on response-header wait. Dangerous for long-running non-interactive automation.

6. [Windows Desktop memory grows to 8.8 GB while idle (#38059)](https://github.com/openai/codex/issues/38059) — New report on version `26.803.10989.0`; UI freezes after 1–2 messages. Adds to Windows performance concerns.

7. [Codex asks for permission despite full access and disabled approvals (#29235)](https://github.com/openai/codex/issues/29235) — 16 👍 with few comments. Breaks flow for users expecting fully autonomous local execution.

8. [`functions.wait` reports completion while child processes still run (#38093)](https://github.com/openai/codex/issues/38093) — New Code Mode bug on `codex-cli 0.147.0`; cell can be marked terminal while spawned processes remain active.

9. [Completed subagents stay open and restore stale MCP stacks (#33700)](https://github.com/openai/codex/issues/33700) — macOS App issue where finished subagents leak into `thread_spawn_edges` and rehydrate old MCP tool-state.

10. [RISC-V Linux support request (#6150)](https://github.com/openai/codex/issues/6150) — `Unsupported platform: linux (riscv64)`. Small but notable demand for non-x86/ARM Linux architecture support.

## Key PR Progress
1. [Avoid cloning MCP invocations in TUI history (#38103)](https://github.com/openai/codex/pull/38103) — Reduces allocation overhead by borrowing MCP invocation data when rendering TUI history cells.

2. [Attach hosted app context to file uploads (#38101)](https://github.com/openai/codex/pull/38101) — Adds connector ID, action name, and model info to file-creation requests for hosted app tool calls.

3. [Test Guardian context for code mode commands (#38094)](https://github.com/openai/codex/pull/38094) — Integration coverage ensuring Guardian sees both user prompt and outer `exec` source for nested `exec_command` calls.

4. [Simplify queued user message admission (#38092)](https://github.com/openai/codex/pull/38092) — Resolves user-message admission when Core accepts the input, removing persistence/hook-specific error paths and bookkeeping.

5. [Add CIMD support to MCP OAuth registration (#38089)](https://github.com/openai/codex/pull/38089) — Prefers Client ID Metadata Documents (CIMD) for public clients, falling back to Dynamic Client Registration when unavailable.

6. [Route gRPC code-mode sessions through shared HTTP client (#38087)](https://github.com/openai/codex/pull/38087) — Enables outbound proxy and custom CA support for gRPC code-mode connections.

7. [Allow empty input to start a turn (#38084)](https://github.com/openai/codex/pull/38084) — Permits immediate user-message admission when `Op::UserInput` has no items, letting generated environment context drive the turn.

8. [Allow nested Git repositories in Windows sandbox (#38080)](https://github.com/openai/codex/pull/38080) — Adds worktree root and wildcard Git ownership rules so nested repos work under the sandbox user.

9. [Reduce cloning in world-state patch handling (#38078)](https://github.com/openai/codex/pull/38078) — Deserializes typed section snapshots from borrowed JSON and applies merge patches in place; a meaningful performance/GC improvement.

10. [Grant Windows sandbox access to the Codex app root (#38064)](https://github.com/openai/codex/pull/38064) — Applies read/execute ACL to the app root so sandboxed processes can access installed Codex files.

## Feature Request Trends
- **Linux desktop app support** is the standout request, with #11023 accumulating 950 👍 and still attracting comments.
- **Broader platform/architecture support**: users also want RISC-V Linux support (#6150).
- **True autonomous execution**: multiple users are asking for fewer permission prompts when full access and approval-disabled settings are already configured (#29235).
- **More reliable remote/background operation**: requests for robust thread resumption, scheduled runs, and less fragile remote-control state (#37403, #35030).
- **Windows plugin lifecycle improvements**: not labeled as features, but users are effectively requesting transactional/atomic updates for bundled marketplaces and plugins.

## Developer Pain Points
- **Windows plugin state corruption after updates** is the largest recurring theme: bundled marketplace snapshots go stale, native hosts remain locked, and Browser/Chrome/Computer Use tools disappear until manual cleanup. See [#30270](https://github.com/openai/codex/issues/30270), [#33738](https://github.com/openai/codex/issues/33738), [#26501](https://github.com/openai/codex/issues/26501), and [#26109](https://github.com/openai/codex/issues/26109).
- **Windows native pipe/helper-path failures** block Computer Use bootstrap even when entitlements appear enabled ([#25391](https://github.com/openai/codex/issues/25391), [#25571](https://github.com/openai/codex/issues/25571)).
- **Desktop performance instability**: freezes, stutters, 60-second plugin reconciliation blocks, and memory growth on Windows ([#20214](https://github.com/openai/codex/issues/20214), [#38059](https://github.com/openai/codex/issues/38059), [#34244](https://github.com/openai/codex/issues/34244)).
- **CLI hangs and misleading completion states**: `codex exec` can hang indefinitely on dead SSE connections ([#31376](https://github.com/openai/codex/issues/31376)); `functions.wait` can return while child processes remain alive ([#38093](https://github.com/openai/codex/issues/38093)).
- **Settings not honored**: full-access/approvals-disabled threads still trigger permission prompts, breaking automation and trust in configuration ([#29235](https://github.com/openai/codex/issues/29235)).
- **Thread-state regressions**: Remote Control/CLI resume failures and scheduled runs hanging on `list_threads` indicate desktop/CLI state synchronization needs work ([#37403](https://github.com/openai/codex/issues/37403), [#35030](https://github.com/openai/codex/issues/35030)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-12

## Today's Highlights
The v0.56.0 nightly pipeline delivers a significant reliability fix for false model capacity exhaustion and quota lookup mis-mapping (PR #28730), accompanied by two critical CVE remediation PRs (`shell-quote`, `simple-git`) from the community. Meanwhile, the issue tracker continues to surface subagent trust and transparency concerns as the dominant theme, with the top-voted issue (#21409, 8 👍) reporting that the generalist agent hangs indefinitely, and #22323 revealing that subagent MAX_TURNS interruptions are misleadingly reported as GOAL success.

## Releases
- **[v0.56.0-nightly.20260812.g5024443c7](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260812.g5024443c7)** — Fixes false model capacity exhaustion messages and corrects client-side quota lookup model mapping in core ([#28730](https://github.com/google-gemini/gemini-cli/pull/28730)); adds local `eval:report` command and developer docs for behavioral evaluations ([#28369](https://github.com/google-gemini/gemini-cli/pull/28369)).
- **[v0.56.0-preview.1](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-preview.1)** — Changelog and version bump for preview track.
- **[v0.55.1](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.1)** — Release verification fixes (npm `ci` script ignore, workspace binary shadowing in CI) plus initial tool registry feature work.
- **[v0.55.0-preview.3](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-preview.3)** — Cherry-picks the capacity exhaustion fix ([#28730](https://github.com/google-gemini/gemini-cli/pull/28730)) into the v0.55.0 preview line ([#28771](https://github.com/google-gemini/gemini-cli/pull/28771)).

## Hot Issues
- **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (12 comments, 2 👍) — `codebase_investigator` subagents report `status: "success"` and `Termination Reason: "GOAL"` despite hitting the turn limit before doing any analysis. This is a serious trust problem: failures masquerading as successes undermine agent observability. Maintainer-only, marked `need-retesting`.
- **[#21409 — Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** (8 comments, 8 👍) — The most upvoted open bug; deferring to the generalist agent hangs even for simple tasks like folder creation. Workaround: instructing the model not to use subagents. High community impact given the default agent architecture.
- **[#24353 — Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** (7 comments) — EPIC tracking expansion of behavioral evals (76 tests currently, 6 Gemini models). Signals the maintainers' push toward systematic regression coverage for agent behavior.
- **[#22745 — Assess AST-aware file reads/search/mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** (7 comments, 1 👍) — EPIC investigating AST-aware tools for precise method-boundary reads and reduced token noise. Related investigation [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) recommends `tilth`/`glyph` as starting points.
- **[#21968 — Gemini doesn't use skills and subagents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (6 comments) — Anecdotal but widely relatable: custom skills (e.g., `gradle`, `git`) are ignored unless explicitly instructed, even when clearly relevant. Points to a gap in the model's tool-utilization prompting.
- **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (5 comments) — Sessions the extraction agent deems low-signal are never marked processed and keep resurfacing. Part of a broader memory-system bug cluster (#26516, #26523, #26525).
- **[#24828 — Sandbox does not forward `GOOGLE_GENAI_API_VERSION`](https://github.com/google-gemini/gemini-cli/issues/24828)** (5 comments) — With `GEMINI_SANDBOX=true` and Vertex-compatible base URLs, sandbox.ts's hardcoded env-var allowlist omits `GOOGLE_GENAI_API_VERSION`, causing 404 `ModelNotFoundError`.
- **[#25166 — Shell command stuck in "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** (4 comments, 3 👍) — CLI hangs showing an active shell command even after trivial commands finish. Filed by maintainer rnett; effort/medium.
- **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (4 comments) — Privacy concern: Auto Memory sends transcript content to the extraction model before prompt-based redaction, and the service may log skill contents. Requests deterministic pre-redaction.
- **[#22232 — Browser agent resilience: session takeover and lock recovery](https://github.com/google-gemini/gemini-cli/issues/22232)** (4 comments) — `BrowserManager.ts` fail-fast strategy on locked persistent profiles should instead recover or take over. Related Wayland failure [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) remains in `need-retesting`.

## Key PR Progress
- **[#28730 — fix(core,cli): resolve false model capacity exhaustion and quota lookup mapping](https://github.com/google-gemini/gemini-cli/pull/28730)** (CLOSED, merged into nightly) — Fixes false `MODEL_CAPACITY_EXHAUSTED` messaging, corrects client-side quota lookup model mapping, and preserves the "Keep trying" UI option during transient surges. The marquee fix of this cycle.
- **[#28780 — fix: upgrade shell-quote to 1.8.4 (CVE-2026-9277)](https://github.com/google-gemini/gemini-cli/pull/28780)** (OPEN) — Critical Trivy-flagged vulnerability in `shell-quote`; direct dependency of the CLI's shell execution path. High priority for anyone running untrusted prompts.
- **[#28778 — fix: upgrade simple-git to 3.32.3 (CVE-2026-28292)](https://github.com/google-gemini/gemini-cli/pull/28778)** (OPEN) — Second critical CVE fix from the same contributor (anupamme), upgrading `simple-git` from 3.28.0.
- **[#28599 — fix(core): classify capacity exhaustion as terminal to prevent retry hangs](https://github.com/google-gemini/gemini-cli/pull/28599)** (CLOSED) — Classifies `MODEL_CAPACITY_EXHAUSTED` (HTTP 429) as terminal when no retry delay is provided, triggering immediate fallback instead of client-side hangs. Follow-up to the wider capacity-fix theme in #28730/#28716.
- **[#28369 — feat(evals): add local report command and developer documentation](https://github.com/google-gemini/gemini-cli/pull/28369)** (CLOSED, in nightly) — Adds `npm run eval:report` to aggregate pass rates by model from Vitest `report.json`, with proper duplicate-test handling and inventory policy mapping.
- **[#28773 — chore(deps): bump nanoid from 3.3.11 to 3.3.18](https://github.com/google-gemini/gemini-cli/pull/28773)** (CLOSED, dependabot) — Security hardening for nanoid, including a React Native async infinite-loop fix.
- **[#28729 — fix(core): resolve swallowed directory mismatch in IDE connections](https://github.com/google-gemini/gemini-cli/pull/28729)** (CLOSED) — Fixes CLI-to-IDE companion connection failures under Cider/VS Code forks using virtual or differing FUSE directory paths; connection ports were previously skipped on workspace mismatch.
- **[#28688 — fix(core): dynamically resolve Cloud Workstations proxy redirect URI for OAuth flows](https://github.com/google-gemini/gemini-cli/pull/28688)** (CLOSED) — OAuth inside Cloud Workstations VMs failed because redirects were hardcoded to `localhost`; now resolves the actual proxy URI. Relevant for cloud-based development setups.
- **[#28581 — fix(cli): skip diff hunk markers during @ processing](https://github.com/google-gemini/gemini-cli/pull/28581)** (OPEN) — Prevents unified/combined diff hunk markers from being parsed as `@file` references, eliminating two recursive workspace-wide glob searches per hunk and avoiding `minimatch`/`path-scurry` heap growth on large diffs.
- **[#28679 — fix(auth): improve Vertex AI 401 error message when using standard API key](https://github.com/google-gemini/gemini-cli/pull/28679)** (OPEN) — Replaces a confusing request failure with a clear diagnostic when `vertex-ai` auth type is configured with only a standard Gemini API key instead of Google Cloud credentials.

## Feature Request Trends
- **AST-aware codebase navigation** — Two active EPICs ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) push toward AST-aware file reads, search, and codebase mapping for fewer turns, less token noise, and more precise method-boundary reads.
- **Subagent transparency and self-awareness** — Requests for visible/shareable subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), accurate self-knowledge of CLI flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)), and richer `/bug` reports containing subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Memory-system hardening** — A coordinated cluster of issues ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) targeting Auto Memory retry loops, invalid patch quarantine, deterministic secret redaction, and logging reduction.
- **Safer agent behavior** — [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) asks the agent to actively avoid destructive operations (`git reset`, `--force`, DB modifications) when safer alternatives exist.
- **Behavioral eval infrastructure** — Continued investment in evals tooling ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353), plus PRs #28369, #28305) signals a formalized regression-testing culture for agent behaviors.

## Developer Pain Points
- **Subagent reliability and trust** — The most recurrent theme: hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), false success reporting after MAX_TURNS ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), ignored `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), and unwanted subagent execution despite disabled agent mode ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)).
- **False capacity/rate-limit errors** — The cluster of PRs (#28730, #28599, #28716) indicates users were hitting phantom `MODEL_CAPACITY_EXHAUSTED` errors that broke workflows; the fixes are now landing across nightly, preview, and patch lines.
- **Shell execution hangs** — Commands stuck in "Waiting input" after completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) and interactive-prompt deadlocks during scaffolding ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) remain persistent CLI friction points.
- **Dependency security debt** — Two critical CVEs (`shell-quote`, `simple-git`) in a single digest cycle highlight the supply-chain risk in the CLI's transitive dependencies; the community responded quickly with upgrade PRs.
- **Tool-count limits and scatter** — 400 errors once the tool set exceeds ~128 tools ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) and the model's habit of scattering temp scripts across directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) both indicate a need for smarter tool scoping and workspace hygiene.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-12

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but the issue tracker saw an influx of triaged bug reports against **v1.0.79**, including a critical regression where `/config model` wipes the user's entire `settings.json` ([#4431](https://github.com/github/copilot-cli/issues/4431)). Windows users continue to be the most affected cohort, with plugin install/update failures (`Access is denied (os error 5)`) now spanning two distinct reports and drawing the highest community upvotes ([#4095](https://github.com/github/copilot-cli/issues/4095) at 14 👍). Notably, several new issues emerged around model-selection integrity — subagents overriding the complementary reviewer strategy, `auto` mode picking unavailable reasoning levels, and repo-level `AGENT.md` model fields hijacking session models.

## 2. Releases

No new releases in the last 24 hours. (Latest tracked version referenced across issues: **1.0.79**.)

## 3. Hot Issues

1. **[#4431 — Using `/model config` wipes all settings](https://github.com/github/copilot-cli/issues/4431)**  
   In v1.0.79, running `/config model` overwrites `<user>/.copilot/settings.json`, destroying all existing configuration. A high-severity data-loss bug in the latest release; community commented on the issue within hours of the report.

2. **[#4095 — Windows: plugin update fails with "Access is denied" while VS Code is running](https://github.com/github/copilot-cli/issues/4095)**  
   The Copilot extension holds watcher handles on `installed-plugins`, so `copilot plugin update` fails on Windows whenever VS Code is open. The highest-upvoted open issue (14 👍), signaling a prevalent workflow blocker for Windows + VS Code users.

3. **[#4151 — Windows: plugin install fails for all sources](https://github.com/github/copilot-cli/issues/4151)**  
   `copilot plugin install` fails 100% of the time on Windows 11, across marketplace, GitHub repo, and local directory sources. Complements #4095 and suggests a deeper Windows file-permission/handle bug in the plugin subsystem.

4. **[#4251 — Resuming large sessions OOMs / pegs CPU for ~70 min in v1.0.74](https://github.com/github/copilot-cli/issues/4251)**  
   A/B testing isolates a regression where session resume uses 3–4× memory vs v1.0.73. Long-lived-session users are effectively locked out of upgrading; the issue includes a controlled version-comparison table.

5. **[#4422 — All Claude models disabled under CLI model selection for Enterprise](https://github.com/github/copilot-cli/issues/4422)**  
   Claude models (Sonnet 5, 4.8, etc.) are unavailable in the CLI despite being enabled in GitHub Copilot settings. Rollback attempts failed, pointing to a server-side policy or entitlement regression rather than a local config issue. 3 👍 in two days.

6. **[#4211 — Copilot CLI can't serialize BigInt in MCP responses](https://github.com/github/copilot-cli/issues/4211)**  
   MCP servers returning large numbers crash the CLI with `TypeError: Do not know how to serialize a BigInt`, aborting all in-flight tasks. A straightforward but blocking interoperability gap for MCP adopters.

7. **[#3976 — Native `tgrep` indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976)**  
   The `tgrep` trigram indexer daemon has no memory cap, and on large monorepos the host is OOM-killed at session startup. Severity is elevated because the failure takes down the entire machine, not just the CLI.

8. **[#4380 — "Rubber Duck" reviews reuse the primary session's model family](https://github.com/github/copilot-cli/issues/4380)**  
   The adversarial-review subagent sometimes selects the same model family as the main session (e.g., Terra-Max), defeating the purpose of complementary cross-family review. Observed across multiple models; undermines trust in the rubber-duck workflow.

9. **[#4405 — Copilot Free in Codespaces: "No model available" after update](https://github.com/github/copilot-cli/issues/4405)**  
   Every prompt fails with `No model available` for Copilot Free accounts in Codespaces, even though policy enablement looks correct. Combines auth, model-policy, and Codespaces token-isolation concerns in one confusing failure mode.

10. **[#4432 — `rubber-duck` model argument silently overrides the complementary strategy](https://github.com/github/copilot-cli/issues/4432)**  
    The `task` tool exposes an optional `model` argument that, when emitted by the model, overrides the shipped `complementary` strategy and the user's `/subagents` settings — a silent, non-obvious defeat of an explicit user preference.

## 4. Key PR Progress

Only 3 pull requests were updated in the last 24 hours. All are summarized below.

1. **[#4452 — Revert "5 copilot/fix with copilot" (CLOSED)](https://github.com/github/copilot-cli/pull/4452)**  
   A closed revert PR. No description provided; presumably rolling back an automated "fix with copilot" change that was merged prematurely or broke something. Worth watching for a follow-up corrected fix.

2. **[#4449 — Migrate pull request automation away from `pull_request_target` (OPEN, draft)](https://github.com/github/copilot-cli/pull/4449)**  
   A security-hardening PR replacing `pull_request_target` with lower-privilege `pull_request` workflows for untrusted input, moving any repository-write actions into a separate secure path. Directly addresses supply-chain risk in CI; relevant given the project's own Copilot-driven automation.

3. **[#4428 — Add initial devcontainer configuration (OPEN)](https://github.com/github/copilot-cli/pull/4428)**  
   Adds a devcontainer to standardize the contributor environment. Minimal description ("LGTM"), but a welcome DX improvement for onboarding new maintainers.

## 5. Feature Request Trends

- **Enterprise policy enforcement for sandboxing** — [#4446](https://github.com/github/copilot-cli/issues/4446) asks for org-level configuration and enforcement of CLI sandbox features, echoing broader enterprise governance demands.
- **Granular permission prompts** — [#4443](https://github.com/github/copilot-cli/issues/4443) requests distinguishing read-only vs. write operations outside the cwd (e.g., `docker compose ps` shouldn't require full path approval), plus [#3877](https://github.com/github/copilot-cli/issues/3877) asks for auto-allow on session start.
- **Cross-tool instruction compatibility** — [#4440](https://github.com/github/copilot-cli/issues/4440) proposes reading `.claude/rules` to avoid duplicating instructions between Claude Code and Copilot.
- **Controlled / explicit file editing** — [#4444](https://github.com/github/copilot-cli/issues/4444) requests per-change accept/reject/comment on file edits to reduce "AI slop."
- **Context durability and readability** — [#4441](https://github.com/github/copilot-cli/issues/4441) asks to preserve durable context across repeated compactions (currently recursively lossy), and [#2623](https://github.com/github/copilot-cli/issues/2623) requests a condensed timeline for autopilot mode.

## 6. Developer Pain Points

- **Windows plugin management is broken** — Two issues (#4095, #4151) covering install *and* update failures with `Access is denied (os error 5)`; the VS Code watcher-handle interaction makes the failure extremely common in daily Windows workflows (14 👍 on #4095 alone).
- **Model selection is unreliable** — A cluster of complaints: `auto` mode picks unavailable reasoning levels and crashes ([#4445](https://github.com/github/copilot-cli/issues/4445)), user-level `/config model` is ignored for new sessions until restart ([#4434](https://github.com/github/copilot-cli/issues/4434)), Claude models vanish for Enterprise accounts ([#4422](https://github.com/github/copilot-cli/issues/4422)), and subagents can silently override model strategy ([#4432](https://github.com/github/copilot-cli/issues/4432)).
- **Memory blowups and hangs** — OOM on session resume ([#4251](https://github.com/github/copilot-cli/issues/4251)), OOM-kill of the host via `tgrep` ([#3976](https://github.com/github/copilot-cli/issues/3976)), and `grep`/code-search stalling indefinitely ([#4448](https://github.com/github/copilot-cli/issues/4448)) indicate systemic resource-management issues.
- **Config corruption and lost work** — The `/config model` settings-wipe bug ([#4431](https://github.com/github/copilot-cli/issues/4431)) is a data-loss severity issue landing in a production release; users report "significant work lost" from related model-selection crashes ([#4445](https://github.com/github/copilot-cli/issues/4445)).
- **Skill/plugin duplication and shadowing** — Duplicate skill loading from repo + plugin ([#4430](https://github.com/github/copilot-cli/issues/4430)), redundant skill reloads failing with "Skill not found" ([#4451](https://github.com/github/copilot-cli/issues/4451)), and `disable-model-invocation` making skills unreachable entirely ([#4438](https://github.com/github/copilot-cli/issues/4438)) — the skill registry is clearly in flux and confusing users.
- **Edge-case rendering and input bugs** — A backspace regression in the prompt removes entire words at a time ([#4447](https://github.com/github/copilot-cli/issues/4447)), and assistant text before tool calls disappears into collapsed "Thought" blocks ([#4450](https://github.com/github/copilot-cli/issues/4450)).

---

*Digest generated from [github/copilot-cli](https://github.com/github/copilot-cli) activity on 2026-08-12.*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-12

## Today's Highlights

No new releases shipped in the last 24 hours, but development momentum continues: PR #2509, which introduces configurable thinking effort and a new `/effort` command, received its latest updates and is positioned to resolve long-standing issue #2501. Meanwhile, the Memory System feature request (#1283) remains the most active community thread, accumulating 34 comments over six months of discussion and signaling strong demand for persistent context across sessions.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **Memory System — Persistent context across sessions (#1283)** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/1283)
   The most-discussed open feature request, spanning six months with 34 comments. Proposes both automatic memory (AI-managed notes) and manual memory (user-defined instructions) so Kimi Code CLI retains project patterns, preferences, and useful context across sessions. Its longevity and engagement indicate this is a top-priority gap for the community.

2. **Quote & Reply on AI responses (#2601)** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/2601)
   Newly opened (2026-08-11): request for quote-and-reply on assistant messages in Kimi Web — letting users select any text span (paragraph, code block, plan step, diff line) and attach a follow-up comment or question, with the agent continuing from that exact selection. Zero comments yet, but it targets a common UX gap for iterative code-review workflows.

3. **Windows PowerShell7 starts from D: drive, path not found (#2600)** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/2600)
   Bug report (opened 2026-08-11) for v0.33: when PowerShell7's default startup directory is set to a D: drive instead of system C:, launching Kimi Code fails to resolve the working path. Affects Windows users with non-standard PowerShell profiles; no comments or workaround yet.

## Key PR Progress

1. **[OPEN] feat(kimi): configurable thinking effort and /effort command (#2509)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2509)
   The headline PR: adds user-configurable reasoning effort plus a new `/effort` command, resolving #2501 and building on the legacy `reasoning_effort` passthrough from #2499 (related to the older #318). Offers developers direct control over response depth vs. latency/cost — a frequently requested capability.

2. **[CLOSED] fix(acp): replace assert statements with proper RuntimeError exceptions (#2057)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2057)
   Replaces five `assert` statements in `acp/session.py` with `RuntimeError` exceptions. Important because Python's `-O` (optimize) flag strips all assertions, which could silently disable critical invariant checks guarding `_ToolCallSta...` state handling in production.

3. **[CLOSED] fix(wire): eliminate TOCTOU race in WireFile.append_record (#2056)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2056)
   Fixes a time-of-check-to-time-of-use race where `self.path.exists()` was checked before `self.path.stat().st_size`, leaving a window for the file to be deleted between calls and causing an unhandled crash.

4. **[CLOSED] fix(agentspec): replace assert with proper AgentSpecError exception (#2055)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2055)
   Replaces `assert agent_spec.extend is None` with an explicit `AgentSpecError`, protecting the `extend` contract against Python `-O` stripping — the same reliability concern as #2057, applied to `agentspec.py`.

5. **[CLOSED] Fix minor bugs in file tools and UI feedback (#1328)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/1328)
   Fixes three issues: incorrect replacement-count calculation in `StrReplaceFile` when multiple edits are applied (computed against `original_content` rather than cumulative changes), plus two UI feedback improvements for user experience and correctness.

6. **[CLOSED] fix(pyinstaller): filter non-existent dateparser cache files (#1082)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/1082)
   Fixes PyInstaller data collection for `dateparser` by filtering out non-existent cache files. `dateparser_tz_cache.pkl` is generated lazily on first use, so fresh installs and CI environments previously broke the collection step.

7. **[CLOSED] fix: remove redundant mode validation in WriteFile tool (#1077)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/1077)
   Removes redundant runtime validation of the `mode` parameter ("overwrite"/"append") in `src/kimi_cli/tools/file/write.py`, eliminating dead defensive code from the WriteFile tool path.

8. **[CLOSED] fix(acp): route shell commands through terminal args (#1393)** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/1393)
   Fixes ACP Shell terminal execution to pass the shell executable in `command` and the shell invocation in `args`, adapts the integration to the current ACP SDK response shape (`terminal_id`), and adds a regression test covering bash and PowerShell command/args routing.

## Feature Request Trends

- **Persistent memory / cross-session context (#1283)** is the dominant theme — no other issue has matched its 34-comment, six-month discussion arc. Users want Kimi to remember project patterns, preferences, and context either automatically (AI-managed notes) or manually (user-defined instructions).
- **Interactive response manipulation (#2601)** — quote-and-reply on arbitrary spans of AI output — signals growing demand for granular, conversation-style control over agent behavior, especially for reviewing diffs and multi-step plans.
- **Configurable reasoning depth** — the `/effort` command in #2509 (resolving #2501) continues a trend of letting developers explicitly trade token cost for reasoning thoroughness.

## Developer Pain Points

- **Context loss across sessions** — the #1283 thread embodies the frustration of re-stating project context on every invocation; users increasingly expect agentic CLIs to behave as long-lived assistants with retained memory.
- **Windows path/environment quirks** — #2600 highlights that non-standard PowerShell startup directories break path resolution in v0.33, a recurring quality-of-life gap for Windows users with multi-drive setups.
- **Reliability of production invariants** — the cluster of assert-related PRs (#2057, #2055) reflects a shared concern that Python's `-O` flag silently disables critical runtime safety checks, motivating migration to explicit exception types.
- **File-operation race conditions** — #2056 shows the community actively hardening append/write paths against TOCTOU-style failures, pointing at broader file-safety sensitivity in the codebase.
- **Packaging/build fragility** — #1082's lazy-cache issue demonstrates how dynamic runtime artifacts (like `dateparser_tz_cache.pkl`) can break build-time tooling such as PyInstaller — a recurring annoyance for CLI distribution pipelines.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-12

## 1. Today's Highlights

No new releases landed in the last 24 hours, but the community is deeply engaged with the V2 (2.0) beta/next channel: several critical regressions were filed — ALSA audio spam corrupting the TUI, `webfetch` silently returning `null` in Code Mode, and a V1→V2 SQLite migration crash — while maintainers and contributors merged a steady stream of fixes and TUI polish. Notably, a contributor submitted a PR adding Claude Code as an ACP runtime, signaling continued momentum toward multi-runtime interoperability.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#27924 — Infinite compaction loop when compression fails to reduce context](https://github.com/anomalyco/opencode/issues/27924)** — OPEN, 8 comments. The session loop can enter an endless `overflow → compact → still overflow` cycle when compression state is lost or compaction cannot reduce context below the token limit. This is a session-blocking bug that wastes tokens and stalls the agent indefinitely; the community is actively discussing how to detect and break the cycle.

2. **[#39831 — Zen: gpt-5.6-luna / gpt-5.6-terra fail with "Upstream request failed"](https://github.com/anomalyco/opencode/issues/39831)** — OPEN, 5 comments. Both new Zen models consistently return HTTP 403 while `gpt-5.4-nano` works. Since Zen is the flagship `opencode` provider, model-specific regressions like this have broad impact on users pinning newer model versions.

3. **[#41763 — [2.0] ALSA errors flood and corrupt the terminal during interaction](https://github.com/anomalyco/opencode/issues/41763)** — OPEN, 4 comments. On Linux hosts without a sound card, scrolling the slash-command picker re-triggers ALSA initialization, printing diagnostics over the TUI and corrupting the display. A fix PR (#41770) is already in flight, but the issue highlights a broader gap in audio-device error handling in the V2 TUI.

4. **[#41848 — LLM retry has no max attempts: infinite retry loop, UI stuck on Thinking](https://github.com/anomalyco/opencode/issues/41848)** — OPEN, 2 comments. `RETRY_MAX_DELAY` is set to ~24 days, so stream errors from providers like DeepSeek leave the UI stuck on "Thinking..." forever with no backoff cap or error surfacing. High severity: this silently bricks sessions and wastes resources.

5. **[#41806 — Instance bootstrap hangs forever on Linux: git child exits but is never reaped](https://github.com/anomalyco/opencode/issues/41806)** — OPEN, 2 comments. Intermittent hang where a spawned `git` child becomes `<defunct>` and the bootstrap never settles; the TUI renders but Enter can never start a session. A subtle process-management bug that will resonate with anyone running long-lived OpenCode instances.

6. **[#41777 — [2.0] webfetch inside Code Mode completes but returns null](https://github.com/anomalyco/opencode/issues/41777)** — CLOSED, 3 comments. A regression between `next-202606301613` and `next-16365`: `webfetch` reports success but returns no content and disappears from the top-level tool list in Code Mode. Confidence is high because the reporter bisected the exact regression window.

7. **[#41869 — [2.0] V1 migration fails with SQLiteError near ',' on apostrophes](https://github.com/anomalyco/opencode/issues/41869)** — CLOSED, 2 comments. The V1→V2 migration interpolates JSON payloads directly into SQL without escaping, so any apostrophe in legacy message data crashes every server startup. A release-blocking data-integrity issue for V2 adopters.

8. **[#41751 — v1.18.16 server/web mode: exactly 2 project skills silently dropped in git repos](https://github.com/anomalyco/opencode/issues/41751)** — OPEN, 2 comments. A deterministic, reproducible skill-loading bug: server/web mode drops exactly 2 project skills when a `.git` directory is present, while the same binary loads all skills in TUI/CLI mode. Odd and frustrating for users relying on web mode.

9. **[#37090 — Tool apply_patch messes up line endings on Windows](https://github.com/anomalyco/opencode/issues/37090)** — OPEN, 3 comments. The built-in `apply_patch` and `write` tools introduce LF line endings into CRLF files, corrupting diffs and causing noisy file churn for Windows users. A long-standing cross-platform pain point.

10. **[#41890 — [2.0] ALSA lib: cannot find card '0'](https://github.com/anomalyco/opencode/issues/41890)** — CLOSED, 3 comments. A duplicate of #41763 that was quickly triaged and closed — a good sign that the maintainers are actively tracking the V2 audio regression cluster.

## 4. Key PR Progress

1. **[#41901 / #41904 — feat(opencode): add Claude Code ACP runtime](https://github.com/anomalyco/opencode/pull/41901)** — Two open PRs (likely a rebased duplicate) add Claude Code as a runtime via `@agentclientprotocol/claude-agent-acp`. This is a milestone for the Agent Client Protocol story, letting users select Claude Code from within OpenCode.

2. **[#41891 — fix(tui): truncate fractional mtimes in fresh plugin specifiers](https://github.com/anomalyco/opencode/pull/41891)** — A one-character fix for a nasty bug: external TUI plugins using JSX or importing `solid-js` fail to load in the compiled `opencode2` binary because raw `stat.mtimeMs` is appended to the import specifier, producing invalid module paths.

3. **[#41770 — fix(tui): stop retrying unavailable audio](https://github.com/anomalyco/opencode/pull/41770)** — Closes #41763. Disposes the failed native audio engine and stops retry attempts when no playback device is available, preventing the ALSA spam that corrupts the V2 terminal.

4. **[#41790 — fix(core): tolerate older migration schemas](https://github.com/anomalyco/opencode/pull/41790)** — Lets the importer load pre-launch previous-channel databases whose `project`/`session` tables predate nullable fields expected by the current migration. Protects users upgrading across a long gap.

5. **[#41917 — feat(tui): experiments via devtools bar, drafts stay put](https://github.com/anomalyco/opencode/pull/41917)** — Follow-up to #41862: experiments are now surfaced through a DevTools bar item instead of a hidden `/baldbeard` easter-egg command. Makes feature-flag experimentation a first-class, discoverable surface.

6. **[#41896 — feat(server): web-standard fetch handler entry](https://github.com/anomalyco/opencode/pull/41896)** — Exposes the same HttpApi routes as the Node server as a pure `(request: Request) => Promise<Response>` handler with no port binding or signal handlers. Enables embedding OpenCode's server in any runtime, including workers/edge functions.

7. **[#41899 — feat(session): record location switches](https://github.com/anomalyco/opencode/pull/41899)** — Project durable sessions now emit a `location-switched` timeline message, send directory changes to subsequent model context, and preserve them through compaction. Fixes context drift when a session moves directories mid-conversation.

8. **[#41883 — fix(tui): show completed write output](https://github.com/anomalyco/opencode/pull/41883)** — Cherry-picks #41352 onto `v2`: after the `write` tool completes, the TUI now shows the syntax-highlighted file contents instead of a bare success line. A UX win that was accidentally merged into the stale `v2-migration` branch first.

9. **[#41898 — fix(session): fail empty assistant responses instead of recording success](https://github.com/anomalyco/opencode/pull/41898)** — Closes #37372. Reasoning-only responses with no visible text and no tool calls are now treated as failures instead of successful executions — a sanity check for provider edge cases.

10. **[#41729 — fix(desktop): label windows by active tab](https://github.com/anomalyco/opencode/pull/41729)** — Closes #40490. Desktop window titles now reflect the active tab, making macOS Window-menu entries distinguishable — a small but high-visibility quality-of-life fix.

Also noteworthy: **[#41897](https://github.com/anomalyco/opencode/pull/41897)** removes a leftover discovery smoke plugin from the TUI plugin loader, and **[#41893](https://github.com/anomalyco/opencode/pull/41893)** fixes Windows-autocomplete path assertions in the TUI test suite.

## 5. Feature Request Trends

- **Slash-command expansion (new wave):** Multiple requests from a single author on 2026-08-12 propose a full Claude Code–inspired command suite: `/usage` (alias `/cost`) for token/cost reports (#41915), `/security-review` for secret scanning (#41913), `/verify` for test/lint pipelines (#41912), `/simplify` for multi-agent refactoring (#41911), `/btw` for ephemeral side questions that bypass session history (#41910), `/approve` for runtime permission toggling (#41909), and `/context` for token breakdown panels (#41908). This suggests users want richer in-app workflow control without leaving the TUI.

- **TUI session management maturity:** Chrome-style tabs for multi-session workflows (#12548) and session/subagent tabs for orchestration (#17838) remain the most-upvoted open feature directions (👍 10 and 👍 6 respectively). The V2 TUI is clearly the focus of community expectations.

- **Desktop integration:** Close-to-tray behavior (#18134) and VS Code notifications when agents complete or need attention (#39936) show users want OpenCode to behave like a first-class desktop citizen, not just a terminal app.

- **Configuration and ergonomics:** Configurable permission-prompt height/expanded state (#28191) and silent/background compaction (#13033, 👍 5) reflect a desire for less disruptive, more customizable long-running sessions.

## 6. Developer Pain Points

- **V2 beta instability is the dominant theme.** The ALSA terminal-corruption cluster (#41763, #41890), `webfetch` null regression (#41777), migration SQLite crash (#41869), and new-session cwd inheritance bug (#41905) all hit the `next` channel in the same window. The community is reporting and triaging quickly, but the volume suggests the V2 preview still needs hardening.

- **Infinite loops and hangs** — compaction loops (#27924), unbounded LLM retries (#41848), and the unreaped-git-child bootstrap hang (#41806) — are a recurring frustration class. Users are hitting scenarios where OpenCode spins forever with no error feedback or escape hatch.

- **Multi-server / multi-directory isolation leaks.** When several TUIs share one `opencode serve` instance, events and branch metadata bleed across projects (#39181). Server mode also silently drops project skills in git repos (#41751). Trust in web/server mode is being eroded by these nondeterministic behaviors.

- **Windows and non-UTF-8 environments remain underserved.** CRLF corruption from `apply_patch` (#37090) and the request for GBK/encoding support in edit/write tools (#37602) reflect a persistent platform gap for Windows and CJK developers.

- **Provider-specific breakage** (Zen 403s on gpt-5.6 models, #39831) and **self-reply loops** from non-monotonic message IDs (#28986) round out a picture of a project growing quickly — with the community eager to help stabilize robustly across providers and platforms.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

## Pi Community Digest — 2026-08-12

## Today's Highlights

No new releases were published in the last 24 hours. The main focus was stabilizing login flows and streaming/protocol behavior: the long-running WSL Copilot login hang was closed after 25 comments, and PRs landed to preserve usage in streaming events and normalize edit-tool inputs. Several TUI and export enhancements also moved forward, including Mermaid rendering in HTML exports and more reliable clipboard copy.

## Releases

None in the last 24 hours.

## Hot Issues

1. **WSL GitHub Copilot login hangs after device authorization** — [Issue #6187](https://github.com/earendil-works/pi/issues/6187)  
   Device auth completes in the browser, but the terminal never detects it. Closed after 25 comments; a major setup blocker for WSL users.

2. **High CPU usage on macOS with long sessions** — [Issue #7730](https://github.com/earendil-works/pi/issues/7730)  
   CPU swings between 50–110% and memory reaches 600–800MB, seemingly tied to context/session length. Open with 8 👍, indicating broad impact.

3. **0.84.0/0.84.1 crash on Bun runtime** — [Issue #7846](https://github.com/earendil-works/pi/issues/7846)  
   `zlib.createZstdDecompress is not a function` from undici crashes Pi at startup. Closed, but critical for Bun-based users.

4. **Copilot login fails with 429 for orgs with many models** — [Issue #7850](https://github.com/earendil-works/pi/issues/7850)  
   Orgs with 20+ available models hit rate limiting after device auth succeeds. Closed as no-action, but 7 👍 and similar reports in #7428 show a pattern.

5. **Compaction cannot use its own thinking level/model** — [Issue #7553](https://github.com/earendil-works/pi/issues/7553)  
   Auto-compaction reuses the session's reasoning budget, making summarization expensive on reasoning models. Open with 8 comments.

6. **WebSocket retry only handles two error codes** — [Issue #7444](https://github.com/earendil-works/pi/issues/7444)  
   Any other `response.failed` frame hard-stops the turn in the OpenAI Codex path. Closed; transient failures should be retried.

7. **Edit fuzzy match misses whitespace-length differences** — [Issue #7836](https://github.com/earendil-works/pi/issues/7836)  
   `normalizeForFuzzyMatch` doesn't collapse whitespace, so valid edits fail with small models. Open; directly affects model edit reliability.

8. **`--thinking` CLI parameter has no effect** — [Issue #7966](https://github.com/earendil-works/pi/issues/7966)  
   `pi --thinking off "prompt"` starts in the previously used thinking mode. Closed; confusing for scripting and CLI users.

9. **0.84.0 removed `usage` from streaming `message_update` events** — [Issue #7911](https://github.com/earendil-works/pi/issues/7911)  
   The fix for #7290 removed cumulative message snapshots but also dropped usage; JSON/RPC clients lose mid-run usage. Open.

10. **Session JSONL version mismatch between packages** — [Issue #7937](https://github.com/earendil-works/pi/issues/7937)  
   `pi-coding-agent` and `pi-agent-core` disagree on v3 vs v4 session headers, causing invalid-session errors. Closed.

## Key PR Progress

1. **Preserve usage in streaming events** — [PR #7982](https://github.com/earendil-works/pi/pull/7982)  
   Keeps cumulative message snapshots omitted while restoring provider usage on JSON/RPC `message_update`; fixes #7911.

2. **Normalize single-object edits and collapse whitespace in fuzzy match** — [PR #7978](https://github.com/earendil-works/pi/pull/7978)  
   Fixes the edit tool rejecting single-object/JSON-string `edits` and addresses whitespace-length mismatch from #7836.

3. **Update grok-mermaid to 0.2.3** — [PR #7984](https://github.com/earendil-works/pi/pull/7984)  
   Fixes Mermaid class rendering; closes #7832.

4. **Render Mermaid diagrams in HTML exports** — [PR #7956](https://github.com/earendil-works/pi/pull/7956)  
   Reuses the ANSI-to-HTML rendering path so Mermaid diagrams appear in exported transcripts.

5. **Map models.dev cost tiers for every provider** — [PR #7981](https://github.com/earendil-works/pi/pull/7981)  
   Extends `getModelsDevCost` beyond GitHub Copilot so all providers get tiered cost data; fixes #7912.

6. **AI Gateway transport over Cloudflare AI binding** — [PR #7901](https://github.com/earendil-works/pi/pull/7901)  
   Adds Cloudflare Workers AI Gateway support.

7. **Add Qwen Token Plan Individual CN provider** — [PR #7989](https://github.com/earendil-works/pi/pull/7989)  
   Mirrors #7659 for China's Token Plan endpoint (cn-beijing), reusing `QWEN_TOKEN_PLAN_CN_API_KEY`.

8. **Theme override via `--use-theme`** — [PR #7722](https://github.com/earendil-works/pi/pull/7722)  
   Allows per-run theme override with single or appearance-based notation, e.g. `pi --use-theme dayowl/nightowl`.

9. **Inherit subagent session config** — [PR #7897](https://github.com/earendil-works/pi/pull/7897)  
   Subagents now follow the current model/thinking level instead of whatever an arbitrary session last set.

10. **Route selection copy through host clipboard** — [PR #7972](https://github.com/earendil-works/pi/pull/7972)  
   Replaces bare OSC 52 writes with host clipboard integration so the "Copied!" indicator is only shown when copying actually works.

## Feature Request Trends

- **Per-operation model/thinking control**: Users want compaction to have its own thinking level/model (#7553), and the `--thinking` flag should actually override saved state (#7966).
- **Terminal/TUI compatibility**: Requests for tmux Kitty image passthrough (#7936), clickable OSC 8 links (#7930), CJK input rendering (#7923), and better fullscreen mouse behavior.
- **Performance budgets**: A startup-time budget targeting jcode-comparable latency/memory (#7739) and investigation of macOS long-session CPU/memory growth (#7730).
- **Streaming/protocol transparency**: Expose session-bound off-transcript model streaming to extensions (#7986), preserve usage in wire events (#7911), and add inactivity timeouts to SSE turns (#7954).
- **Provider/transport breadth**: Cloudflare AI Gateway (#7901), Qwen China region provider (#7988/#7989), and complete models.dev cost tier mapping (#7981).

## Developer Pain Points

- **Login and rate-limit friction**: WSL login hanging (#6187) and Copilot 429s for large orgs (#7850, #7428) block users at onboarding.
- **Runtime/environment fragility**: Bun incompatibility (#7846), silently ignored invalid `settings.json` (#7829), and Windows CMD output/memory issues (#7947).
- **Edit-tool correctness**: Whitespace fuzzy-match misses (#7836), single-object edit rejection (#7944), and unreachable `prepareEditArguments` fixes hurt model-driven editing.
- **Streaming/protocol regressions**: Lost `usage` on wire events (#7911), session JSONL version mismatches (#7937), and SSE turns hanging forever (#7954).
- **Configuration/UX inconsistencies**: Hardcoded keybindings bypassing configuration (#7939), ignored `--thinking` (#7966), and `/resume` showing divergent counts (#7960, #7931).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-12

## Today's Highlights

Qwen Code shipped v0.21.10 with ACP reasoning-effort session configuration and Web Shell image previews, followed closely by v0.21.11-preview.0 with prompt-safe session navigation fixes. The most active community threads are around daemon/session reliability — large restore timeouts, ACP memory guards, and multi-workspace storage — plus recurring terminal flicker under tmux/iTerm. PR activity is strongest around Web Shell remote interactivity, ACP resource isolation, and CI/review-tooling hardening.

## Releases

- **v0.21.10** — Adds ACP support for configuring reasoning-effort levels from Default to Max via session configuration ([#8526](https://github.com/QwenLM/qwen-code/pull/8526)). Clicking uploaded or pasted images in the Web Shell now opens a preview in the artifact.  
  [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10)

- **v0.21.11-preview.0** — Fixes prompt-safe session navigation in the Web Shell and adds session continuation admission logging for `serve`.  
  [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-preview.0)

- **v0.21.10-nightly.20260812.a64d1291d2** — Nightly build carrying the same Web Shell/serve fixes as the preview release.  
  [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10-nightly.20260812.a64d1291d2)

- **live-host-v0.1.1** — Fixes CLI sandbox runtime probing before selection and serializes autofix scan-and-pick operations.  
  [Release](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.1.1)

## Hot Issues

1. **#8678 — Preserve current session when a large restore times out**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8678)  
   Why it matters: session restore timeouts can disrupt active daemon sessions.  
   Reaction: 7 comments; PR [#8691](https://github.com/QwenLM/qwen-code/pull/8691) already lands the timeout-contract and observability groundwork.

2. **#8920 — Headless `stream-json` reports OpenAI API errors as success**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8920)  
   Why it matters: automation and CI can misinterpret failed API calls as successful runs.  
   Reaction: 4 comments; users are concerned about false-positive exit codes.

3. **#8182 — Daemon authorises each ACP child 50% of host memory**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8182)  
   Why it matters: memory ceilings are not divided by child process count, risking OOM under multi-session loads.  
   Reaction: 4 comments; follow-up PR [#8947](https://github.com/QwenLM/qwen-code/pull/8947) targets the resource-guard gaps.

4. **#8957 — Regression: Qwen Code crashes on image load since 0.21.2**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8957)  
   Why it matters: image handling is broken for users on versions after 0.21.1.  
   Reaction: 3 comments; labeled as needing retesting.

5. **#8562 — tmux flicker when using iTerm/SSH into Ubuntu**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8562)  
   Why it matters: terminal rendering regression makes remote/tmux workflows hard to use.  
   Reaction: 6 comments; reporter used Qwen 3.8 Max to trace the issue and suspected Qwen Code itself.

6. **#8901 — macOS iTerm flicker on approval prompts**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8901)  
   Why it matters: same flicker class appears in iTerm when selecting command-approval options.  
   Reaction: 4 comments; reinforces a UI-rendering bug affecting multiple terminal environments.

7. **#8897 — `--approval-mode` and `--auth-type` accepted but missing from `qwen --help`**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8897)  
   Why it matters: CLI flags are validated but undocumented, hurting discoverability.  
   Reaction: 4 comments; user provided exact reproduction on 0.21.9.

8. **#8644 — Windows file links fail because drive-letter colon is URL-encoded**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8644)  
   Why it matters: clicking chat file links on Windows opens `file:///d%3A/...` instead of a valid local path.  
   Reaction: 4 comments; blocks basic file-navigation workflows on Windows.

9. **#8944 — Two high-severity npm vulnerabilities reported since 0.21.0**  
   [Issue](https://github.com/QwenLM/qwen-code/issues/8944)  
   Why it matters: supply-chain security concerns after `npm update`.  
   Reaction: 3 comments; users are asking for dependency remediation.

10. **#8922 — Shell ignores `tools.truncateToolOutputThreshold`**  
    [Issue](https://github.com/QwenLM/qwen-code/issues/8922)  
    Why it matters: documented configuration is not honored; Shell uses a fixed 30,000-character budget instead.  
    Reaction: 3 comments; configuration mismatch frustrates users with large tool outputs.

## Key PR Progress

1. **#8947 — Close daemon ACP resource guard gaps**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8947)  
   Follow-up to resource-protection work; validates bounded JSON-RPC envelopes before ACP dispatch and caps active handlers, prepared responses, and outbound operations.

2. **#8152 — Isolate workspace settings and context files for worktree sessions**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8152)  
   Fixes `settings.json` and `QWEN.md` resolution when a session runs inside a git worktree, instead of incorrectly falling back to the project root.

3. **#8613 — tmux-backed interactive terminal sub-agent for Web Shell**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8613)  
   Lets an agent drive REPL/TUI-style CLIs inside a tmux session on the daemon host, with a live interactive view in Web Shell.

4. **#8675 — Model-specific reasoning controls end-to-end**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8675)  
   Adds a reasoning-controls registry used across Core, ACP, daemon, SDK, and WebShell, starting with Qwen 3.x models.

5. **#8874 — Web Shell workspace file uploads**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8874)  
   Adds drop/upload support to the composer, including progress, cancellation, automatic conflict renaming, and inline file display.

6. **#7837 — Coordinate terminal teardown**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7837)  
   Gives interactive sessions a single idempotent teardown path for normal exit, `SIGINT`, `SIGTERM`, and `SIGHUP`, while preserving signal-derived exit codes.

7. **#8525 — Resolve Qwen 3.8 reasoning budget conflicts**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8525)  
   Prevents DashScope Qwen 3.8 requests from carrying both `reasoning_effort` and `thinking_budget` when settings come from different configuration layers.

8. **#8585 — Accept dotted-minor Claude aliases and add Opus 5 token limits**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8585)  
   Fixes model-ID parsing for proxy-style aliases like `claude-opus-4.8` and adds proper token-limit handling for newer Claude models.

9. **#8777 — Maven multi-module verification for reviews**  
   [PR](https://github.com/QwenLM/qwen-code/pull/8777)  
   Extends the review toolchain so `review build-test` recognizes Maven roots and supports multi-module verification.

10. **#8735 — Durable replay journal for workflows**  
    [PR](https://github.com/QwenLM/qwen-code/pull/8735)  
    Makes workflow replay state a versioned, durable checkpoint contract with serialized journal writes and crash-safe recovery.

## Feature Request Trends

- **ACP/session configurability** — Users want reasoning effort exposed via session config ([#8514](https://github.com/QwenLM/qwen-code/issues/8514)) and predictable provider/session behavior after updates ([#8948](https://github.com/QwenLM/qwen-code/issues/8948)).
- **Web Shell / remote terminal interactivity** — Demand is growing for tmux-backed interactive subagents ([#8613](https://github.com/QwenLM/qwen-code/pull/8613)), workspace uploads ([#8874](https://github.com/QwenLM/qwen-code/pull/8874)), image previews, and better thinking/tool progress display.
- **Daemon resource governance** — Repeated asks for bounded ACP child memory, safe large-session restores, and durable workflow state ([#8091](https://github.com/QwenLM/qwen-code/issues/8091), [#8182](https://github.com/QwenLM/qwen-code/issues/8182), [#8678](https://github.com/QwenLM/qwen-code/issues/8678)).
- **Model/provider flexibility** — Community interest in modality resolution from metadata ([#8529](https://github.com/QwenLM/qwen-code/pull/8529)), reasoning-effort tiers, and graceful handling of provider aliases and template updates.

## Developer Pain Points

- **Terminal flicker/lag under tmux/iTerm** is the most repeated UI complaint: [#8562](https://github.com/QwenLM/qwen-code/issues/8562), [#8901](https://github.com/QwenLM/qwen-code/issues/8901), and [#8962](https://github.com/QwenLM/qwen-code/issues/8962).
- **Session restore/continuation bugs** erode trust in long-running workflows: large restores can time out ([#8678](https://github.com/QwenLM/qwen-code/issues/8678)), scheduled prompts disappear from restored transcripts ([#8837](https://github.com/QwenLM/qwen-code/issues/8837)), and multi-workspace restores can use the wrong runtime storage ([#8909](https://github.com/QwenLM/qwen-code/issues/8909)).
- **Headless/automation false positives** are a serious concern: `stream-json` reports API errors as success ([#8920](https://github.com/QwenLM/qwen-code/issues/8920)) and parallel `read_file` calls can merge results ([#8940](https://github.com/QwenLM/qwen-code/issues/8940)).
- **CLI/provider config inconsistencies** keep appearing: flags missing from help ([#8897](https://github.com/QwenLM/qwen-code/issues/8897)), provider update prompts repeating ([#8504](https://github.com/QwenLM/qwen-code/issues/8504)), and prompts promising model switches that no longer happen ([#8948](https://github.com/QwenLM/qwen-code/issues/8948)).
- **Security and CI noise** adds overhead for maintainers: high-severity npm audit findings ([#8944](https://github.com/QwenLM/qwen-code/issues/8944)), main-branch E2E failures ([#8959](https://github.com/QwenLM/qwen-code/issues/8959)), and bot-triggered review bursts ([#8945](https://github.com/QwenLM/qwen-code/issues/8945)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-12

No new release landed in the last 24h. The conversation is dominated by v0.9.5 regressions, especially Auto-Review silently blocking Bash/write calls, copy-message rail decorations, and wide-terminal output no longer filling the screen. Contributors are already responding with PRs for clean copy, session-snapshot hardening, and web-site audit fixes, while the maintainer filed runtime and agent-schema issues aimed at reducing model-facing errors.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#5323 — Regression in v0.9.5: Auto-Review mode silently blocks every Bash call and write operation](https://github.com/Hmbown/CodeWhale/issues/5323)**  
   Critical upgrade regression: Auto-Review changed from auto-approving tool calls to silently blocking them with “destructive action requires explicit review.” This breaks autonomous workflows. 2 comments; likely to be a priority fix.

2. **[#5314 — Copy message from context menu includes rail decorations](https://github.com/Hmbown/CodeWhale/issues/5314)**  
   The “Copy message” action copies role glyphs and rail characters (`●`, `▏`) instead of clean message text. Directly affects users who copy transcripts into notes or docs. 2 comments; PR #5319 targets this exact issue.

3. **[#5322 — Regression: output area doesn’t fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322)**  
   In v0.8 the output area expanded to terminal width; in v0.9 it is capped, leaving wasted space on wide monitors. 1 comment; a UX regression for desktop TUI users.

4. **[#5325 — runtime: don’t deliver child-owned background shell completions to the parent model stream](https://github.com/Hmbown/CodeWhale/issues/5325)**  
   Maintainer-filed runtime bug: child-agent background shell completions are also sent to the parent stream, which can pollute context and confuse the model. 0 comments; important for reliable sub-agent execution.

5. **[#5324 — agent tool: simplify the 32-field schema so models stop erroring on it](https://github.com/Hmbown/CodeWhale/issues/5324)**  
   The model-facing `agent` tool has 32 JSON-schema properties, 8 actions, zero required fields, and alias handling. This complexity is causing model errors. 0 comments; maintainer-identified technical debt.

6. **[#4959 — proposed `stop` command](https://github.com/Hmbown/CodeWhale/issues/4959)**  
   Community request for a real `/stop` command and runtime STOP-word intercept, especially for YOLO mode and autonomous workflows where textual stop commands are ignored. 8 comments; strong user interest in abort controls.

7. **[#4650 — v0.9.1 completion board, exact final dogfood, and no-publish release gate](https://github.com/Hmbown/CodeWhale/issues/4650)**  
   Release-blocker meta-issue tracking final integration evidence, local dogfooding, and the stop line for v0.9.1. 4 comments; important for understanding release process and quality gates.

8. **[#4683 — Wrong deepseek completions url](https://github.com/Hmbown/CodeWhale/issues/4683)**  
   Intermittent network errors against `api.deepseek.com/v1/chat/completions`, often after long-running requests. 3 comments; likely affects users on DeepSeek provider routes.

9. **[#5241 — Pricing endpoint returns 503 — all sessions show unverified_live_pricing](https://github.com/Hmbown/CodeWhale/issues/5241)**  
   Cost display stopped working after upgrading; every provider/session is unpriced because the pricing endpoint returns 503. 1 comment; hurts cost visibility for heavy TUI users.

10. **[#4564 — codewhale exec --auto: --model and --toolsets flags consumed as single arg on Windows](https://github.com/Hmbown/CodeWhale/issues/4564)**  
    Windows users cannot place `--model`/`--toolsets` before `exec` because they are concatenated into one argument. 2 comments; proposed workaround is env vars. Reflects ongoing Windows CLI parity issues.

## Key PR Progress

1. **[#5326 — web: audit fixes — i18n parity, copy/spacing, test fixes](https://github.com/Hmbown/CodeWhale/pull/5326)**  
   Maintainer cleanup pass over the community website: fixes a stale quote assertion in `public-surface-contract.test.ts`, plus copy/spacing issues. Open.

2. **[#5319 — fix(tui): copy messages without visual rails](https://github.com/Hmbown/CodeWhale/pull/5319)**  
   Contributor fix for #5314: User/Assistant cells now copy canonical source content instead of rendered Ratatui lines. Tool/Thinking/System cells keep the full-transcript path. Includes regression tests. Open.

3. **[#5320 — fix(session): separate snapshot reads from crash recovery](https://github.com/Hmbown/CodeWhale/pull/5320)**  
   Adds `load_session_snapshot` for side-effect-free reads and `recover_session_for_resume` with repair statistics. Helps embedding hosts avoid recovery during live tool calls. Open.

4. **[#5321 — feat: register OrcaRouter as a named provider](https://github.com/Hmbown/CodeWhale/pull/5321)**  
   Adds OrcaRouter as a first-class provider, similar to OpenRouter, using `ORCAROUTER_API_KEY` and OpenAI-compatible routing. Improves provider choice and consistency. Open.

5. **[#5318 — feat(tui): pin host terminal window as an always-on-top mini window](https://github.com/Hmbown/CodeWhale/pull/5318)**  
   Windows-focused enhancement: right-click context menu or `/pin` shrinks the host terminal to 640x400 and pins it always-on-top; toggling restores the original size. Open.

6. **[#5225 — feat(acp): expose file/search/git/patch/shell tools over session/prompt](https://github.com/Hmbown/CodeWhale/pull/5225)**  
   Closed PR that aimed to make ACP sessions capable of real tool execution rather than chat-only model text. Would enable editors and bridges to drive CodeWhale as a coding agent. Status: closed.

## Feature Request Trends

- **Autonomous-mode stop controls** — Users want explicit `/stop` and runtime STOP-word interception to halt runaway model loops, especially in YOLO mode ([#4959](https://github.com/Hmbown/CodeWhale/issues/4959)).
- **Terminal layout and pane flexibility** — Requests for pane zooming, wide-terminal filling, and host-terminal PiP mode indicate demand for better screen real-estate control ([#1261](https://github.com/Hmbown/CodeWhale/issues/1261), [#5322](https://github.com/Hmbown/CodeWhale/issues/5322), [#5318](https://github.com/Hmbown/CodeWhale/pull/5318)).
- **Provider/routing extensibility and reliability** — Users want more provider adapters and stable routing/cost endpoints, e.g. OrcaRouter registration and pricing endpoint fixes ([#5321](https://github.com/Hmbown/CodeWhale/pull/5321), [#5241](https://github.com/Hmbown/CodeWhale/issues/5241)).
- **Simpler model-facing agent contracts** — The 32-field `agent` tool schema and cross-stream background-shell events are being reworked to reduce model errors and context pollution ([#5324](https://github.com/Hmbown/CodeWhale/issues/5324), [#5325](https://github.com/Hmbown/CodeWhale/issues/5325)).

## Developer Pain Points

- **Upgrade regressions in v0.9.x** — Auto-Review blocking Bash/writes ([#5323](https://github.com/Hmbown/CodeWhale/issues/5323)), capped output width ([#5322](https://github.com/Hmbown/CodeWhale/issues/5322)), and copy-rail pollution ([#5314](https://github.com/Hmbown/CodeWhale/issues/5314)) show version-to-version stability issues.
- **Network/provider flakiness** — DeepSeek completions URL failures ([#4683](https://github.com/Hmbown/CodeWhale/issues/4683)), WSL2 provider connection errors ([#4956](https://github.com/Hmbown/CodeWhale/issues/4956)), and pricing endpoint outages ([#5241](https://github.com/Hmbown/CodeWhale/issues/5241)) disrupt normal usage.
- **Windows CLI and performance gaps** — `exec --auto` flag parsing on Windows ([#4564](https://github.com/Hmbown/CodeWhale/issues/4564)) and slow `/slash` command response on Windows 10 ([#4568](https://github.com/Hmbown/CodeWhale/issues/4568)).
- **Release/dogfood overhead** — The project relies on heavy completion boards, exact dogfood builds, and no-publish gates ([#4650](https://github.com/Hmbown/CodeWhale/issues/4650)), and is planning a large crate decomposition EPIC ([#5316](https://github.com/Hmbown/CodeWhale/issues/5316)), indicating maintainability pressure.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*