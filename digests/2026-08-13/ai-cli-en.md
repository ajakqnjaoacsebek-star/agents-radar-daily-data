# AI CLI Tools Community Digest 2026-08-13

> Generated: 2026-08-13 02:02 UTC | Tools covered: 10

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

# Cross-Tool AI CLI Comparison Report — 2026-08-13

---

## 1. Ecosystem Overview

The AI CLI ecosystem is in a **reliability-focused consolidation phase**: across all ten tracked tools, community attention has shifted from capability requests toward session durability, context lifecycle management, and desktop process stability. Security hardening and MCP spec compliance are now release-blocking concerns — evidenced by Gemini CLI's SSRF and variable-expansion fixes, OpenCode's permission globstar correction, and DeepSeek's `nextCursor` spec-compliance patch. The next competitive frontier is forming around evaluation infrastructure, persistent cross-session memory, and multi-agent orchestration, with leading tools investing in per-thread usage accounting, durable thread state, and per-agent transcripts. Windows/macOS desktop reliability remains the single largest cross-tool source of user frustration, while false-success reporting by subagents emerges as the most dangerous unresolved trust defect.

---

## 2. Activity Comparison

| Tool | Hot Issues | PRs Updated | Release(s) Today |
|---|---|---|---|
| Claude Code | 10 | 5 | v2.1.229 (stable) |
| OpenAI Codex | 10 | 10 | — |
| Gemini CLI | 10 | 10 | v0.56.0-nightly |
| GitHub Copilot CLI | 10 | 3 | — |
| Kimi Code CLI | 1 | 2 | — |
| OpenCode | 10 | 10 | v1.18.17 + v1.18.18 |
| Pi | 10 | 10 | — |
| Qwen Code | 10 | 10 | Desktop v0.2.0 + v0.2.1 |
| DeepSeek TUI | 10 | 10 | v0.9.6 |
| Grok Build | 0 | 0 | — |

*PR counts reflect PRs updated/opened in the last 24 hours per each project's digest.*

---

## 3. Shared Feature Directions

**Session durability & context lifecycle** — the most universal theme. Claude Code (#24172 conversation loss in VSCode), Codex (#32888 auto-compaction with stale token usage, #26990 power-loss state corruption), Pi (#6879 compaction never triggering before overflow, #7724 replay of removed overflow responses), Copilot CLI (#4441 recursively lossy compaction), Qwen (#8678 restore timeouts on large histories), DeepSeek (#5000 interrupted output not persisted as session items), and OpenCode (#42170 desktop schema mismatch crash) all target the same failure class: long-running agent sessions must survive crashes, overflow, and resumption without losing context.

**Multi-agent orchestration & visibility** — Claude Code's 12-bug coordination post-mortem (#54393), Gemini CLI's agent-to-agent delegation PR (#28738), Qwen's background-agent coordination gap (#8097) plus per-agent transcripts (#8971), DeepSeek's unified tasks surface (#5270), and Copilot CLI's silent subagent model overrides (#4432) show the industry converging on a need for explicit agent lifecycle management, blocked-session indicators, and tamper-proof subagent reporting.

**MCP reliability & spec compliance** — Claude Code (draft-07 `outputSchema` rejected, #86142), Copilot CLI (Entra OAuth refresh scope bug, #4464; transient 5xx treated as permanent, #4466), Gemini CLI (corrupt enablement config failing open to all servers, #28794), OpenCode (MCP tools connected but never reaching the agent, #33027), and DeepSeek (`nextCursor: null` breaking strict clients, #5335) collectively indicate that MCP integration is the most fragile interoperability boundary across the ecosystem.

**Windows desktop stability** — Claude Code (GPU process crash killing sessions, #81698; repeated repair loops, #85199), Codex (unbounded `taskkill.exe` WMI exhaustion, #34260; per-second PowerShell polling, #25453), and Copilot CLI (WSL2 `ctrl+h` misbinding) dominate the desktop complaint volume. Native Linux desktop demand persists as the highest-signal feature request overall (498 👍 on Claude Code #65697).

**Security hardening** — Gemini CLI led today with four P1 security fixes (SSRF via async DNS, `$VAR`/`${VAR}` expansion bypass, MCP fail-open configs). OpenCode closed a deny-rule bypass (`*` now correctly excludes `/`, plus `**` globstar support, #28689) and flagged `.env` exposure via grep/glob patterns (#17073). Copilot CLI migrated its automation off `pull_request_target` (#4449).

**Persistent memory** — Kimi's Memory System design (#1283, 36 comments over six months), Qwen's auto-memory recall RFC (#7040), and Gemini CLI's Auto Memory retry/redaction issues (#26522, #26525) show cross-session context moving from nice-to-have to core roadmap.

**Local/self-hosted model support** — Pi's dependency-free Ollama proxy (#8049), Qwen's keyless Vertex AI ADC inference (#9025), Claude Code's server-supplied hooks for self-hosted runners, and DeepSeek's OrcaRouter provider registration (#5332) reflect a mainstreaming of non-managed model endpoints.

**Eval infrastructure** — Gemini CLI's `eval:validate` with CI-gating exit codes (#28344) and behavioral evals for skills activation/URL fetching (#28788), alongside Qwen's Maven multi-module review verification (#8777), signal a shift toward measurable agent-quality gates.

**Cost visibility & billing** — Codex's per-thread usage PRs (#38281/#38282) and OpenCode's per-session budget limit (#42202) build billing transparency into the protocol/UI layer, while OpenCode's widespread free-tier entitlement errors (#14273, #42128) and Codex's wasted rate-limit resets (#31606) show pricing logic bugs directly eroding user trust.

---

## 4. Differentiation Analysis

**Claude Code** targets enterprise compliance and ecosystem breadth: CVP approval handling (#84352), hooks/plugins maturity, and by far the largest feature-request gravity (498 👍 Linux desktop). Its risk is desktop reliability — four of ten hot issues are Windows stability/data-loss.

**OpenAI Codex** is investing deepest in **infrastructure**: durable thread reverts (#38292), gRPC code-mode hosts (#38288), per-thread usage accounting, and creation-time-stamped history items (#38272). Desktop process management is its visible weak spot (392 👍 on the macOS resource runaway).

**Gemini CLI** differentiates on **velocity and security posture**: nightly releases, a P1-driven fix cadence (4 security PRs today), and an eval-first culture. Its agent correctness problems — subagents reporting MAX_TURNS as GOAL success (#22323) — are the most candidly framed in the ecosystem.

**GitHub Copilot CLI** is the enterprise-GitHub play: org model catalogue (#4390), remote MCP OAuth support, and deep GitHub Actions integration. Slow PR throughput (3, mostly bot-generated) contrasts with a hot issue tracker, suggesting maintenance-mode risk or triage backlog.

**OpenCode** ships the broadest provider surface with aggressive iteration (two patch releases in 24h). Its differentiation is cost controls and TUI polish, but billing entitlement bugs and provider-streaming failures (Gemini 3 Pro function calling, #4832) undermine reliability perception.

**Pi** is the most **extension- and correctness-focused**: transactional session persistence (#8052), TUI mouse events for extensions (#8037), and honest edit-tool compatibility fixes. Its local-model proxy direction is a meaningful architectural bet.

**Qwen Code** leads on **workflow orchestration**: workflow agents that pin working directories and outlive default bounds (#8972), per-agent transcripts, adaptive live-journal caps (#8905), and WebShell/desktop maturation. Regression sensitivity (image-load crash, tmux flicker) is its Achilles heel.

**DeepSeek TUI (CodeWhale)** is executing a deliberate **branding + architecture transition**: Rust crate decomposition (EPIC-005), i18n dictionary spine, and MCP strictness. Its community faces structural contribution friction — repeated base-drift CI failures force maintainer "harvest" re-lands.

**Kimi Code CLI** is quietly consolidating around a single high-value design discussion (Memory System), with minimal churn elsewhere. **Grok Build** is dormant.

---

## 5. Community Momentum & Maturity

**Highest-engagement communities:** Claude Code (498 👍 Linux desktop, 25-comment session-loss threads), Codex (392 👍 macOS resource runaway, 83 comments), and Copilot CLI (35 👍 CIMD OAuth support) show the largest user bases with sustained issue participation.

**Fastest iteration:** Gemini CLI (nightly releases, ~10 substantive PRs/day), OpenCode (two patch releases), and Qwen Code (two desktop releases) are shipping multiple times per week. Claude Code's single stable release with server-side hook support indicates a slower, more deliberate enterprise cadence.

**Reliability leaders:** Pi and Claude Code both shipped targeted correctness fixes (transactional JSONL persistence, SSE keepalives, cache invalidation controls), suggesting mature engineering discipline over raw feature speed.

**Stall risk:** Copilot CLI (0 releases, 3 PRs of which 2 are bot-generated), Kimi (1 issue, 2 PRs), and Grok (dormant) show either maintenance-mode pauses or triage backlogs. Copilot CLI's hot-issue volume (10 active threads including a 4-day-old OAuth regression) makes its low PR throughput the most concerning divergence.

**Contributor friction:** DeepSeek TUI's harvest pattern is the clearest systemic issue — community PRs repeatedly fail CI from base drift, and maintainers re-land identical work, which will eventually suppress external contributions.

---

## 6. Trend Signals

1. **False-success reporting is a trust crisis.** Gemini CLI's subagent MAX_TURNS→GOAL misreport (#22323), DeepSeek's fake file-edit success (#5209), and Claude Code's Opus quality/hallucination complaints (#82162) all attack the same thing: confidence in agent output. Expect "truthful completion verification" and delivery-receipt semantics to become headline features.

2. **Session durability has moved from feature to table stakes.** Transactional session writes (Pi #8052), durable thread reverts (Codex #38292), adaptive journal caps (Qwen #8905), and crash-safe local state (Codex #26990) are converging on a shared architectural pattern: append-only, atomic, replay-safe session stores.

3. **MCP spec compliance is becoming a procurement criterion.** Strict clients rejecting `null` cursors and draft-07 schemas means MCP servers must either comply exactly or lose interoperability — this will drive a compliance-testing wave similar to OpenAPI tooling.

4. **Desktop is the new battleground.** Every vendor with a desktop client shipped stability regressions this cycle. The next release race will center on crash-safe local state, GPU-process isolation, and resource bounds — not new UI features.

5. **Local and self-hosted models are a distribution channel, not a niche.** Ollama proxies, keyless ADC, and self-hosted runner hooks are appearing simultaneously across four unrelated codebases — a strong market signal.

6. **Evaluations are becoming product features.** Gemini CLI's `eval:validate` with CI exit codes suggests agent quality gates will sit alongside unit tests in CI pipelines, potentially becoming a purchasing checkbox for enterprises.

7. **Per-session cost visibility is moving into the protocol layer.** Codex thread-credits and OpenCode per-session budgets prefigure a future where billing transparency is a differentiator, not a support ticket.

8. **Persistent memory will absorb the next investment cycle.** Kimi's Memory System and Qwen's auto-memory recall address the same gap — agents that remember project context across sessions without manual re-explanation. The compaction/replay infrastructure being built today is likely the substrate for this.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-13 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The source data is ordered by PR comment volume. Below are the top eight skill-focused PRs, excluding repository-doc and non-skill PRs.

### 1. fix(skill-creator): run_eval.py always reports 0% recall — [#1298](https://github.com/anthropics/skills/pull/1298) — **Open**
- **Functionality:** Repairs the skill-creator evaluation pipeline: installs the eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel worker behavior.
- **Discussion highlights:** Directly addresses the widely reproduced `recall=0%` bug from issue [#556](https://github.com/anthropics/skills/issues/556). The community clearly depends on reliable eval tooling for skill description optimization.
- **Status:** Open.

### 2. Add document-typography skill — [#514](https://github.com/anthropics/skills/pull/514) — **Open**
- **Functionality:** Typographic quality control for generated documents: orphan word wrap, widow paragraphs, section-header stranding, and numbering misalignment.
- **Discussion highlights:** High attention because these issues affect virtually every Claude-generated long document. Users rarely ask for typographic polish, so the skill would enforce it automatically.
- **Status:** Open.

### 3. fix(pdf): correct case-sensitive file references — [#538](https://github.com/anthropics/skills/pull/538) — **Open**
- **Functionality:** Fixes eight `SKILL.md` references to `reference.md`/`forms.md`, which were incorrectly written in uppercase.
- **Discussion highlights:** Breaks on case-sensitive filesystems. Shows demand for portability and correctness in official document skills.
- **Status:** Open.

### 4. Add ODT skill — OpenDocument text creation and template filling — [#486](https://github.com/anthropics/skills/pull/486) — **Open**
- **Functionality:** Creates, fills, reads, and converts OpenDocument files (`.odt`, `.ods`), including ODT-to-HTML conversion.
- **Discussion highlights:** Extends document-format coverage beyond PDF/DOCX and into LibreOffice/ISO-standard workflows. Broad trigger descriptions suggest a widely anticipated skill.
- **Status:** Open.

### 5. Improve frontend-design skill clarity and actionability — [#210](https://github.com/anthropics/skills/pull/210) — **Open**
- **Functionality:** Rewrites the `frontend-design` skill so every instruction is concrete and executable within a single Claude conversation.
- **Discussion highlights:** Reflects community pressure to move from abstract documentation to operational, behavior-directing skill content.
- **Status:** Open.

### 6. Add skill-quality-analyzer and skill-security-analyzer — [#83](https://github.com/anthropics/skills/pull/83) — **Open**
- **Functionality:** Adds two meta-skills: one evaluates skill structure/documentation quality, the other analyzes security posture.
- **Discussion highlights:** Community interest in self-auditing skills themselves, especially given rising concern about skill supply-chain trust.
- **Status:** Open.

### 7. fix(docx): prevent tracked change w:id collision — [#541](https://github.com/anthropics/skills/pull/541) — **Open**
- **Functionality:** Fixes document corruption when the DOCX skill adds tracked changes to files with existing bookmarks.
- **Discussion highlights:** Deep OOXML fix: `w:id` is a shared ID space across bookmarks, tracked changes, comments, and move ranges. Demonstrates demand for low-level document reliability.
- **Status:** Open.

### 8. fix(skill-creator): warn on unquoted description with YAML special characters — [#539](https://github.com/anthropics/skills/pull/539) — **Open**
- **Functionality:** Adds pre-parse validation to catch unquoted `description:` fields containing colons before `yaml.safe_load()` fails silently.
- **Discussion highlights:** Prevents truncated or misparsed skill descriptions — a common authoring pitfall that breaks skill triggering.
- **Status:** Open.

---

## 2. Community Demand Trends

From the most-commented issues, several clear demand clusters emerge:

- **Better skill authoring and evaluation tooling**  
  Issues [#556](https://github.com/anthropics/skills/issues/556) and [#1169](https://github.com/anthropics/skills/issues/1169) report that `run_eval.py` returns `recall=0%` for all queries, making description-optimization loops useless. Combined with [#202](https://github.com/anthropics/skills/issues/202), the community is pushing for professional-grade skill-creator tooling.

- **Security, trust, and governance for skills**  
  Issue [#492](https://github.com/anthropics/skills/issues/492) highlights a trust-boundary vulnerability from community skills distributed under the `anthropic/` namespace. Issue [#412](https://github.com/anthropics/skills/issues/412) proposes an `agent-governance` skill for safety patterns, and [#1175](https://github.com/anthropics/skills/issues/1175) raises security/context-window concerns around SharePoint document handling.

- **Organizational sharing and plugin hygiene**  
  Issue [#228](https://github.com/anthropics/skills/issues/228) asks for org-wide skill sharing; issue [#189](https://github.com/anthropics/skills/issues/189) reports duplicate skills when installing both `document-skills` and `example-skills`. Demand is rising for enterprise-grade distribution and deduplication.

- **Context and memory efficiency**  
  Issue [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` skill eagerly injecting ~156k tokens and exhausting context. Issue [#1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` skill for symbolic agent state. Issue [#1385](https://github.com/anthropics/skills/issues/1385) proposes a full reasoning-quality-gate pipeline.

- **Platform interoperability**  
  Issues [#29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock) and [#16](https://github.com/anthropics/skills/issues/16) (Expose Skills as MCPs) show users want Skills to work beyond the default Claude Code environment.

- **Document-format robustness**  
  Issue [#12](https://github.com/anthropics/skills/issues/12) reports DOCX corruption from whitespace reformatting. Combined with PDF/DOCX PRs, this is a persistent demand area.

---

## 3. High-Potential Pending Skills

These open PRs have active discussion and address clear community needs; they may land soon.

- **feat(skills): add self-audit — mechanical verification + four-dimension reasoning quality gate** — [#1367](https://github.com/anthropics/skills/pull/1367) — **Open**  
  Audits AI output by first verifying all claimed output files exist, then applying a damage-severity-ordered reasoning review. Directly extends the quality-gate conversation from issue [#1385](https://github.com/anthropics/skills/issues/1385).

- **feat: add testing-patterns skill** — [#723](https://github.com/anthropics/skills/pull/723) — **Open**  
  Comprehensive testing-stack coverage: Testing Trophy model, unit testing, React Testing Library, and what not to test. Addresses the gap for structured test-generation guidance.

- **feat: add ServiceNow platform skill** — [#568](https://github.com/anthropics/skills/pull/568) — **Open**  
  Broad enterprise platform assistant covering ITSM, ITOM, ITAM/SAM, FSM, SPM, CSDM, IntegrationHub, and SecOps. Updated as recently as 2026-08-12, suggesting ongoing maintainer interest.

- **Add pyxel skill for retro game development** — [#525](https://github.com/anthropics/skills/pull/525) — **Open**  
  Wraps pyxel-mcp for Python retro/pixel-art game development. Demonstrates demand for domain-specific MCP-integrated skills.

- **Add plan-file-hygiene skill** — [#1479](https://github.com/anthropics/skills/pull/1479) — **Open**  
  Solves the problem of accumulating planning artifacts by giving plan files a lifecycle. Addresses a clearly named community gap from issue [#1417](https://github.com/anthropics/skills/issues/1417).

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **trustworthy, reliable, and efficient skill infrastructure** — especially skill-evaluation tooling, security/org governance, and document-format correctness — rather than for any single new domain-specific skill.

---

# Claude Code Community Digest — 2026-08-13

## Today’s Highlights

v2.1.229 shipped with server-supplied hook support for self-hosted runners and SSE keepalive pings for gateway streaming. The issue tracker this cycle is dominated by Windows desktop stability, session/cache reliability, and model-quality complaints, while community demand for a native Linux desktop build remains the most-upvoted feature request ([#65697](https://github.com/anthropics/claude-code/issues/65697), 498 👍).

## Releases

**v2.1.229** ([release notes](https://github.com/anthropics/claude-code/releases/tag/v2.1.229))

- Documented `claude remote-control --continue` for resuming the most recent Remote Control session.
- Added server-supplied Claude Code hook support for self-hosted runner sessions, matching managed-environment behavior.
- Added SSE keepalive pings to gateway streaming responses.

## Hot Issues

1. [CVP-approved Claude.ai org still receives cyber safeguard blocks](https://github.com/anthropics/claude-code/issues/84352) — 80 comments, 12 👍. Enterprise/compliance concern: prior approval is not reflected in Claude Code; Verification Portal still shows “Under review.”
2. [Official Claude Desktop build for Linux](https://github.com/anthropics/claude-code/issues/65697) — 498 👍, 52 comments. Closed, but still the strongest signal for native Linux desktop demand.
3. [Post-mortem: 12 multi-agent coordination bugs in one overnight cycle](https://github.com/anthropics/claude-code/issues/54393) — 27 comments. A useful generic catalog of autonomous multi-agent reliability gaps.
4. [Windows desktop GPU process crash kills app and all running sessions](https://github.com/anthropics/claude-code/issues/81698) — 25 comments. Session and data-loss impact on Windows.
5. [`/plugin update` does not invalidate plugin cache](https://github.com/anthropics/claude-code/issues/14061) — 25 comments, 31 👍. Repeated stale-cache friction for plugin developers.
6. [Left arrow accidentally navigates to agents screen and breaks session view](https://github.com/anthropics/claude-code/issues/75899) — 14 comments, 19 👍. TUI keybinding regression with no rebind option.
7. [Claude Desktop repeatedly crashes and requires “Advanced Options → Repair” on Windows](https://github.com/anthropics/claude-code/issues/85199) — 13 comments. Ongoing Windows stability pain.
8. [Critical: conversations disappear when closing VSCode or navigating away](https://github.com/anthropics/claude-code/issues/24172) — 12 comments, 25 👍. High-priority data-loss report, still open.
9. [Worktree sessions reuse a previous worktree directory](https://github.com/anthropics/claude-code/issues/79366) — 11 comments. Isolation bug that can contaminate unrelated sessions.
10. [Opus 5.0 “nerfed”: poor quality, no delivery after 5 retries](https://github.com/anthropics/claude-code/issues/82162) — 9 comments, 3 👍. Part of growing model-quality feedback; see also [hallucination report #82326](https://github.com/anthropics/claude-code/issues/82326).

## Key PR Progress

Only 5 PRs were updated in the last 24 hours; all are listed below.

- [docs: point remaining stale doc links at code.claude.com](https://github.com/anthropics/claude-code/pull/85925) — Closed. Removes redirect-only docs links across plugins, skills, agents/commands, and templates.
- [docs: fix stale doc links and README drift in plugins and examples](https://github.com/anthropics/claude-code/pull/85822) — Closed. Corrects hooks documentation links and related READMEs.
- [add the missing source to claude code](https://github.com/anthropics/claude-code/pull/41611) — Open. Minimal PR description; no further scope details provided.
- [examples: Add MEP (Meat Puppet Elimination Protocol)](https://github.com/anthropics/claude-code/pull/42996) — Open. Async state relay pattern for preserving context across multi-machine/resumed Claude Code sessions; zero new infrastructure.
- [Scope `child_process_exec` to JS/TS files](https://github.com/anthropics/claude-code/pull/57888) — Closed. Fixes a Python false-positive in `security_reminder_hook.py` for `asyncio.create_subprocess_exec`.

## Feature Request Trends

- **Native Linux desktop support**: still the highest-signal request ([#65697](https://github.com/anthropics/claude-code/issues/65697), 498 👍).
- **Agent-session lifecycle management**: users want to mark agents complete/dismiss them ([#66202](https://github.com/anthropics/claude-code/issues/66202)), see “needs input / sleeping” states clearly ([#86082](https://github.com/anthropics/claude-code/issues/86082)), and avoid accidental navigation to the agent view ([#75899](https://github.com/anthropics/claude-code/issues/75899)).
- **Cross-machine session continuity**: surface on-disk transcripts in the desktop app ([#81835](https://github.com/anthropics/claude-code/issues/81835)) and better resumability patterns via `remote-control --continue` or async state relay ([PR #42996](https://github.com/anthropics/claude-code/pull/42996)).
- **Desktop UX polish**: clearer collapse controls for thinking blocks with preserved scroll position ([#83418](https://github.com/anthropics/claude-code/issues/83418)).

## Developer Pain Points

- **Windows desktop reliability**: repeated crashes requiring repair ([#85199](https://github.com/anthropics/claude-code/issues/85199)), GPU process crashes killing sessions ([#81698](https://github.com/anthropics/claude-code/issues/81698)), and browser-pane crashes ([#84951](https://github.com/anthropics/claude-code/issues/84951)).
- **Session and conversation loss**: conversations disappear in VSCode ([#24172](https://github.com/anthropics/claude-code/issues/24172)), cross-session messages interrupt receiving sessions ([#86059](https://github.com/anthropics/claude-code/issues/86059)), or render but never reach the runtime input queue ([#86237](https://github.com/anthropics/claude-code/issues/86237)).
- **Prompt-cache invalidation increasing cost**: background auto-update invalidates caches ([#86244](https://github.com/anthropics/claude-code/issues/86244)), `git status` changes invalidate full-prefix caches ([#78720](https://github.com/anthropics/claude-code/issues/78720)), and advisor usage rollups over-count tokens ([#84738](https://github.com/anthropics/claude-code/issues/84738)).
- **Multi-agent coordination bugs**: 12-issue coordination post-mortem ([#54393](https://github.com/anthropics/claude-code/issues/54393)), worktree reuse ([#79366](https://github.com/anthropics/claude-code/issues/79366)), and missing blocked-session indicators ([#86082](https://github.com/anthropics/claude-code/issues/86082)).
- **MCP friction**: draft-07 `outputSchema` rejected client-side ([#86142](https://github.com/anthropics/claude-code/issues/86142)), servers killed and respawned mid-session ([#86040](https://github.com/anthropics/claude-code/issues/86040)), and connector timeouts ([#86023](https://github.com/anthropics/claude-code/issues/86023)).
- **Model quality regressions**: Opus 5 quality/hallucination complaints ([#82162](https://github.com/anthropics/claude-code/issues/82162), [#82326](https://github.com/anthropics/claude-code/issues/82326)) and WebSearch HTTP 400 failures at high effort levels ([#83364](https://github.com/anthropics/claude-code/issues/83364)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Today's Highlights

No new Codex release shipped in the last 24 hours. Community attention is concentrated on macOS Desktop resource runaway (#25719, 392 👍) and the missing opt-out for CLI auto-resolve timeouts (#28969, 194 👍). Meanwhile, a substantial batch of infrastructure PRs landed around durable thread state, gRPC code-mode hosts, per-thread usage reporting, and plugin metric collection.

## Releases

No new releases in the last 24 hours.

## Hot Issues

- **macOS Desktop triggers `syspolicyd` / `trustd` CPU and memory runaway** — [#25719](https://github.com/openai/codex/issues/25719)  
  83 comments and 392 👍 make this the highest-engagement issue. Desktop users on macOS report severe system-wide resource exhaustion, suggesting a systemic regression in app process management.

- **Add setting to disable the auto-resolve in 60 seconds for questions** — [#28969](https://github.com/openai/codex/issues/28969)  
  70 comments, 194 👍. The default timeout for CLI prompts interrupts long-running agent sessions; users want explicit control over how long permission/input questions stay open.

- **Reset failed, did not apply and 1 reset is wasted** — [#31606](https://github.com/openai/codex/issues/31606)  
  56 comments, 65 👍. Rate-limit resets are being consumed without actually taking effect, which directly costs users paid quota and has generated sustained frustration.

- **Windows Desktop: unbounded `taskkill.exe`/`conhost.exe` cleanup storm exhausts WMI** — [#34260](https://github.com/openai/codex/issues/34260)  
  34 comments. A process-cleanup loop can spawn hundreds of `taskkill` instances, exhaust WMI provider quotas, and degrade the whole machine.

- **Unable to install after clicking Update in the Codex app** — [#37002](https://github.com/openai/codex/issues/37002)  
  28 comments, closed. macOS 12 users hit a broken self-update path, blocking the app from launching after an in-app update.

- **Windows Desktop spawns `powershell.exe` every second for full process polling** — [#25453](https://github.com/openai/codex/issues/25453)  
  25 comments, 7 👍. High CPU usage caused by constant PowerShell process polling is another recurring Windows-specific performance complaint.

- **Windows Computer Use screenshot fails when `SetIsBorderRequired` is called** — [#25178](https://github.com/openai/codex/issues/25178)  
  25 comments, 13 👍. Computer Use can interact with apps but cannot capture screenshots on Windows 10 22H2, breaking core agent visibility.

- **Windows Desktop local state is not crash-safe after power loss** — [#26990](https://github.com/openai/codex/issues/26990)  
  14 comments. Users report pins/projects resetting, config regressions, and future timestamps after power loss — a durability problem in local state persistence.

- **Auto-compaction uses stale token usage after tool output, causing unrecoverable context overflow** — [#32888](https://github.com/openai/codex/issues/32888)  
  3 comments, but architecturally important. Large tool results can bypass compaction and permanently overflow the context window for long-running turns.

- **Desktop can remain blank indefinitely when opening tasks with stale subagents** — [#38250](https://github.com/openai/codex/issues/38250)  
  Recent issue with immediate impact: existing tasks become unopenable if subagent state is stale, requiring manual cleanup or restart.

## Key PR Progress

- **Add durable reverts for paginated threads** — [#38292](https://github.com/openai/codex/pull/38292)  
  Introduces `ThreadStore::revert_thread`, preserving history before a selected turn via an immutable rollout while keeping the logical thread ID.

- **Support gRPC code-mode hosts in app server** — [#38288](https://github.com/openai/codex/pull/38288)  
  Allows `http://` and `https://` `--code-mode-host` endpoints to use the shared gRPC session provider; WebSocket transport remains for `ws://`/`wss://`.

- **Collect plugin metrics from remote executors** — [#38283](https://github.com/openai/codex/pull/38283)  
  Resolves manifest-declared metric operations against executor filesystems and streams bounded measurement output from remote plugin commands.

- **Add thread usage to TUI status surfaces** — [#38282](https://github.com/openai/codex/pull/38282)  
  Adds `thread-credits` and `estimated-thread-cost` to the configurable status line and terminal title for Enterprise workspaces.

- **Show estimated thread usage in `/status`** — [#38281](https://github.com/openai/codex/pull/38281)  
  Extends `account/usage/read` with optional `threadId` and returns estimated credits, USD cost, and model/reasoning/speed/token breakdowns.

- **Track plugin metrics for background unified exec commands** — [#38276](https://github.com/openai/codex/pull/38276)  
  Keeps plugin measurement collection active until background commands exit, even when item completion arrives after the turn has finished.

- **Unify turn input submission and routing** — [#38275](https://github.com/openai/codex/pull/38275)  
  Adds `TurnInputRequest` and typed submission results for atomically starting, steering, or declining a turn.

- **Stamp conversation history items with creation times** — [#38272](https://github.com/openai/codex/pull/38272)  
  Adds fractional Unix creation times to locally authored conversation items for more accurate history reconstruction.

- **Add per-thread usage queries to the backend client** — [#38270](https://github.com/openai/codex/pull/38270)  
  Adds `Client::get_thread_usage` for authoritative per-thread estimated credit and dollar usage across backend path styles.

- **Use bounded fallback ports for Windows managed proxies** — [#38265](https://github.com/openai/codex/pull/38265)  
  Tries the configured Windows proxy port first, then scans the protocol’s preferred port range; reserves HTTP and SOCKS5 listeners independently.

## Feature Request Trends

- **Configurable input/prompt timeouts** — Users repeatedly ask for control over auto-resolving questions, either disabling the 60-second default (#28969) or allowing `request_user_input` to wait indefinitely (#37472).

- **Thread and session lifecycle management** — Requests around explicit cross-thread orchestration (#14923), `/fork` cleanup (#38144), and reliable `thread/resume` behavior (#38169) show a need for more robust thread primitives.

- **Better permission-approval ergonomics** — A configurable audible alert for pending approvals (#11604) reflects the broader ask for better async-work signaling.

- **Richer browser/computer-use capabilities** — Users want file upload support in Browser Use (#20785) and more reliable window/screenshot behavior across Windows versions.

## Developer Pain Points

- **Desktop process management on macOS/Windows** — Recurring high CPU/memory issues caused by `syspolicyd`/`trustd` (#25719), `powershell.exe` polling (#25453), and `taskkill.exe` WMI storms (#34260).

- **Computer Use platform inconsistencies** — Windows-specific failures around screenshots (#25178), EPERM after granting permission (#38293), and inability to enumerate desktop apps (#37932).

- **State durability and recovery failures** — Local state loss after power failure (#26990), sqlite backfill hangs (#28087), stale subagents blanking the app (#38250), and auto-compaction missing large tool outputs (#32888).

- **Rate-limit and quota reliability** — Rate-limit resets being consumed without applying (#31606) is a direct, high-frustration problem for paying users.

- **MCP and tool-result fidelity** — MCP tool results losing content when `structuredContent` is present (#38287) shows integration regressions can still ship between desktop builds.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-13

## 1. Today's Highlights

A new nightly release (v0.56.0-nightly.20260813) lands two significant eval-infrastructure features—`eval:validate` static analysis and tool-call failure summaries—signaling a push toward CI-gated behavioral testing. Concurrently, the maintainer team merged/opened multiple critical reliability and security fixes, including two P1 PRs addressing a fail-open vulnerability in MCP enablement config and a completed SSRF protection for `web_fetch`. Agent correctness remains the loudest community theme: subagents misreporting MAX_TURNS interruptions as goal success, generalist agent hangs, and browser agent instability dominate the issue tracker.

## 2. Releases

**v0.56.0-nightly.20260813.g1ac337739** (nightly)
- `eval:validate` static analysis command for validating eval source files against 9 rules with CI-gating exit codes (PR #28344)
- Tool-call timeline formatter and failure-summary diagnostics for behavioral evals (PR #28305)
- Changelog for v0.55.1

No stable release in the last 24 hours.

## 3. Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)** (P1, 12 comments) — The `codebase_investigator` subagent reports `status: "success"` with `Termination Reason: "GOAL"` even when it hit the max turn limit before doing any analysis. This false-success reporting undermines trust in agent outputs and is a top-priority correctness bug.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (P1, 8 👍, 8 comments) — Defers to the generalist agent hang indefinitely, even for trivial tasks like folder creation. Users wait up to an hour before cancelling; the workaround (instructing the model never to use subagents) defeats the feature's purpose.

3. **[#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** (P1, 3 👍) — Simple, non-interactive CLI commands remain stuck in an "Awaiting user input" state after finishing. A common P1 hang that blocks automation workflows.

4. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (6 comments) — Anecdotal but widely resonant: even with well-described `gradle`/`git` skills, the model only uses them when explicitly instructed. Raises questions about tool/skill discovery incentives in the agent loop.

5. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (5 comments) — Sessions skipped as low-signal are never marked processed, causing the extraction agent to re-surface them indefinitely—a wasteful retry loop in the newer Auto Memory system.

6. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (4 comments) — Auto Memory sends local transcript content to the extraction model before prompt-based redaction can apply, and the service can log existing skill content. A security/privacy concern for users with sensitive local repos.

7. **[#24246 — Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** (3 comments) — Hitting the context tool-count ceiling produces a hard 400 error rather than graceful scoping. Users expect the agent to limit tools in scope when too many are enabled.

8. **[#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** (3 comments) — Subagents (e.g., `generalist`) activate even when agents mode is disabled in all configurations. A permission-model regression that surprised users who expected MCP-only behavior.

9. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (P1, 1 👍) — Browser agent terminates with `GOAL` immediately on Wayland sessions. Environment-specific but impacts a growing Linux desktop segment.

10. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** (3 comments) — Models occasionally reach for `git reset` / `--force` / destructive DB operations when safer alternatives exist. Community wants guardrails around destructive command families.

## 4. Key PR Progress

1. **[#28794 — Prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)** (P1) — Fixes a vulnerability/data-loss bug where invalid JSON in `mcp-server-enablement.json` silently collapsed to `{}`, re-enabling every MCP server (fail-open). Closes #28786.

2. **[#28787 — Don't treat a corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)** (P1) — Companion fix: `readConfig()` now distinguishes "file missing" from "file corrupt," preventing accidental re-enablement of servers the user disabled.

3. **[#28691 — Block `$VAR` and `${VAR}` variable expansion bypass](https://github.com/google-gemini/gemini-cli/pull/28691)** (P1, security) — Completes the GHSA-wpqr-6v78-jr5g fix by closing bypasses in `detectBashSubstitution()` / `detectPowerShellSubstitution()`. Also hardens the automated issue-dedup workflow.

4. **[#28557 — Resolve SSRF vulnerability in web-fetch.ts via async DNS resolution](https://github.com/google-gemini/gemini-cli/pull/28557)** (closed) — `isBlockedHost` only flagged literal IPs; hostnames resolving to `169.254.169.254` or internal ranges passed validation. Switches to async DNS-aware checks (fixes #28555).

5. **[#28790 — Context-aware silent retries and availability TTL for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)** (P1) — Fixes the capacity-exhaustion retry regression from #28761: unattended/non-interactive runs now back off and retry automatically with up to 2 silent retries.

6. **[#28738 — Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)** (P2, help wanted) — Enables subagent-to-subagent delegation and self-recursion via `tools:` frontmatter. Directly addresses the long-standing #22092 and the broader "agents aren't agentic enough" feedback.

7. **[#28789 — Fix vscode-ide-companion stop() hang and keep-alive failure threshold](https://github.com/google-gemini/gemini-cli/pull/28789)** — Resolves an indefinite `IdeServer.stop()` hang when active streaming MCP sessions are open, plus a resource leak where intermittent ping failures never triggered cleanup.

8. **[#28673 — Add Gemini 3.6 Flash and 3.5 Flash-Lite model configurations](https://github.com/google-gemini/gemini-cli/pull/28673)** — Adds base model definitions, capability flags (`thinking`, `multimodalToolUse`), aliases, and code-execution support for two new models in `packages/core`.

9. **[#28788 — Behavioral evals for skills activation and URL fetching](https://github.com/google-gemini/gemini-cli/pull/28788)** — Adds behavioral evaluations for `activate_skill` and `web_fetch`, plus Windows-compat fixes for the local eval environment and EDK report aggregator bug fixes (filtering non-executed tests).

10. **[#28405 — Prevent scroll position jump during content updates](https://github.com/google-gemini/gemini-cli/pull/28405)** — Fixes #5009: `VirtualizedList.tsx` re-enables `isStickingToBottom` too aggressively, yanking the viewport when users scroll up to review changes and new content arrives.

## 5. Feature Request Trends

- **Agent delegation & orchestration**: Agents calling agents, visible subagent trajectories via `/chat share` (#22598), and improved subagent context in `/bug` reports (#21763) point toward making multi-agent workflows first-class and transparent.
- **Evaluation infrastructure maturity**: Component-level behavioral evals (#24353), AST-aware file reads/search/codebase mapping (#22745, #22746), and eval validation tooling show demand for systematic, measurable agent quality.
- **Safety & security hardening**: Deterministic redaction in Auto Memory (#26525), destructive-behavior guardrails (#22672), and SSRF/expansion-bypass fixes reflect a community that increasingly runs agents against sensitive local state.
- **Browser agent resilience**: Automatic session takeover, lock recovery (#22232), settings.json override support (#22267), and Wayland compatibility (#21983) are consolidating into a "make browser automation reliable" workstream.
- **Zero-dependency OS sandboxing**: #19873 proposes leveraging the model's native bash affinity via OS-level sandboxing with post-execution intent routing—a direction toward safer, more capable shell use.

## 6. Developer Pain Points

- **False success reporting**: Subagents hitting MAX_TURNS report `GOAL` success (#22323)—the most dangerous failure mode because it silently corrupts confidence in agent output.
- **Non-terminating agents**: Generalist hangs (#21409), shell commands stuck in "Waiting input" (#25166), and the vscode-ide-companion `stop()` hang (#28789) all erode trust in unattended operation.
- **Permission-model surprises**: Subagents activating despite agent mode being disabled (#22093) and disruptive shell commands (#22672) indicate permission enforcement feels inconsistent.
- **Config fragility**: Corrupt MCP enablement configs failing open (PRs #28787/#28794) and browser agent ignoring settings.json overrides (#22267) highlight configuration handling as a weak spot.
- **Scale ceilings**: 400 errors with >128 tools (#24246) and terminal rendering jank on resize (#21924) show real-world usage outgrowing current implementation limits.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-13

## Today's Highlights

No new release shipped in the last 24 hours, but issue activity was heavy around two themes: **remote MCP server reliability** (OAuth refresh failures, transient 5xx handling, socket errors) and **silent model/subagent overrides** (code-review, rubber-duck, and task-tool downgrades). The only substantive PR was a security-minded migration away from `pull_request_target` in the repo’s own automation.

## Releases

No new releases in the last 24 hours.

## Hot Issues

- [#1305 Support CIMD for Remote OAuth MCP Servers](https://github.com/github/copilot-cli/issues/1305)  
  Long-running request with **35 👍** and 5 comments. Users want MCP servers protected by OAuth to support CIMD (Client-Initiated Mutual TLS? / custom identity metadata), extending the existing DCR-based remote MCP support.

- [#4390 Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)  
  Business users report models explicitly enabled by their org are unavailable in Copilot CLI, including Claude Sonnet 5/Opus 5 and Kimi K3. This blocks enterprise adoption and has 4 👍.

- [#1730 sessionStart hook in .github/hooks/ does not fire](https://github.com/github/copilot-cli/issues/1730)  
  `sessionStart` hooks defined in `.github/hooks/*.json` are not executed on Windows 11/PowerShell 7. One of the most-commented issues today (8 comments), indicating plugin/hook lifecycle is a common pain point.

- [#4328 Ctrl+H misinterpreted as Ctrl+Backspace under WSL2](https://github.com/github/copilot-cli/issues/4328)  
  In WSL2, `ctrl+h` deletes the whole previous word instead of one character, due to `WT_SESSION` leaking from Windows Terminal. Key input handling issue for WSL users.

- [#2109 ACP: support an ask_user / ask_question style extension method](https://github.com/github/copilot-cli/issues/2109)  
  7 👍 request to add a structured way for custom ACP clients to ask the user clarifying questions, beyond the existing `session/request_permission` mechanism.

- [#3976 native tgrep indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976)  
  The experimental `tgrep` indexer spawns a persistent daemon with no apparent memory cap, causing OOM on large monorepos. Serious stability concern for monorepo users.

- [#4432 rubber-duck: model-emitted `model` argument silently overrides the complementary strategy](https://github.com/github/copilot-cli/issues/4432)  
  The `rubber-duck` cross-family reviewer can be hijacked when the `task` tool emits an explicit `model` argument, defeating the intended "opposite family" review strategy.

- [#4346 MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN](https://github.com/github/copilot-cli/issues/4346)  
  In GitHub Actions, non-default MCP servers fail because the registry policy fetch rejects the workflow's `GITHUB_TOKEN`. Breaks the documented PAT-less setup in CI (3 👍).

- [#4464 Remote MCP OAuth: silent refresh fails with AADSTS70011](https://github.com/github/copilot-cli/issues/4464)  
  New triage report: Microsoft Entra OAuth for remote MCP servers never refreshes silently; the refresh request mixes `.default` and resource-specific scopes, forcing interactive sign-in every ~60–75 minutes.

- [#4468 `--server --stdio` never releases extension-host processes](https://github.com/github/copilot-cli/issues/4468)  
  Long-lived server mode accumulates four extension-host child processes per session that are never terminated, causing resource leaks in desktop-hosted usage.

## Key PR Progress

Only 3 PRs were updated in the last 24 hours:

- [#4449 Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)  
  Open PR that moves invalid-label automation off `pull_request_target`, using issue-scoped write tokens and no-permission `pull_request` signals. Important security hardening for the repo’s bot workflows.

- [#4453 Julesdemangeot ship it patch 1](https://github.com/github/copilot-cli/pull/4453)  
  Closed bot-generated PR; no meaningful content to summarize.

- [#4452 Revert 5 copilot/fix with copilot](https://github.com/github/copilot-cli/pull/4452)  
  Closed bot-generated revert PR; no meaningful content to summarize.

## Feature Request Trends

- **Remote MCP hardening is the dominant theme**: support for CIMD/OAuth (#1305), better handling of transient 5xx (#4466), correct silent refresh with Entra (#4464), Windows socket-error resilience (#4463), and cleanup of Docker MCP containers (#4460/#4461).
- **Model selection and subagent control**: users want a BYOK `/model` picker populated from the provider’s `/models` endpoint (#4358), respect for explicit subagent model overrides (#3565, #4458/#4462), and protection of complementary-strategy agents like `rubber-duck` (#4432).
- **Context durability beats raw context size**: repeated compactions are recursively lossy (#4441), long-running sessions can exhaust event storage (#4467), and orphaned permission events replay on resume (#4469).
- **Plugin and extension lifecycle**: users want reliable session hooks (#1730), auto-update for marketplace plugins (#4465), and the ability to use a system-installed `gh` CLI instead of the bundled one (#4456).

## Developer Pain Points

- **Silent configuration overrides** are a recurring frustration: model settings are ignored or downgraded without user-visible warnings, affecting code-review subagents, task tools, and cross-family reviewers.
- **MCP OAuth and remote-server failures** continue to disrupt real workflows: transient 5xx are treated as permanent, refresh tokens fail with scope bugs, and Windows socket errors block auth entirely.
- **Resource leaks are accumulating**: extension-host processes linger under `--server --stdio`, Docker MCP containers survive session close, and the experimental `tgrep` indexer can OOM the host.
- **Long-lived sessions degrade over time**: context compaction loses early decisions, queued messages get stuck, and resumed `/ask` chats can render blank screens.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-13

## 1. Today's Highlights
A quiet day for MoonshotAI/kimi-cli: no new releases shipped, and only one issue plus two pull requests received updates in the last 24 hours. The standout is continued momentum on the long-running **Memory System** feature request ([#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)), which has now gathered 36 comments over nearly six months, signalling persistent demand for cross-session context. Meanwhile, contributor Ricardo-M-L moved two robustness PRs forward — a string-rendering correctness fix and a broken-pipe guard for the web session runner.

## 2. Releases
None in the last 24 hours.

## 3. Hot Issues
Only one issue was updated in the window, so this section covers all available activity:

- **[#1283 [enhancement] Feature Request: Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)** — *OPEN*
  - **Author:** CatKang | **Created:** 2026-02-27 | **Updated:** 2026-08-13 | **Comments:** 36 | 👍: 0
  - **Summary:** Proposes a two-tier memory system: automatic memory (AI-managed notes about the codebase, project patterns, user preferences) and manual memory (user-defined persistent instructions).
  - **Why it matters:** This is the most active issue in the dataset and a core differentiator for AI coding assistants — retaining context across sessions. The 36-comment, six-month-long discussion suggests real design/scope deliberation rather than simple demand, making it a strong roadmap signal. Interestingly, the issue has 0 👍 reactions despite the long thread, which may indicate a vocal minority or that discussion has moved to design details. Watch this one for feature-landing signals.

## 4. Key PR Progress
Two PRs were updated in the window, both authored by Ricardo-M-L and both still open:

- **[#2449 [fix(string)] strip newlines in shorten_middle before the length check](https://github.com/MoonshotAI/kimi-cli/pull/2449)** — *OPEN*
  - **Created:** 2026-06-13 | **Updated:** 2026-08-12
  - **What it does:** `shorten_middle(text, width, remove_newline=True)` returns early on short input *before* newlines are collapsed, so `extract_key_argument`'s single-line tool-call summary can leak raw newlines and break rendering. The fix strips newlines prior to the length check.
  - **Why it matters:** Small but user-visible correctness fix for CLI output — tool-call summaries should always render as a clean single line.

- **[#2324 [fix(web)] handle BrokenPipeError in SessionProcess.send_message](https://github.com/MoonshotAI/kimi-cli/pull/2324)** — *OPEN*
  - **Created:** 2026-05-19 | **Updated:** 2026-08-12
  - **What it does:** Guards the write to `process.stdin`/`drain()` in `src/kimi_cli/web/runner/process.py` against the subprocess exiting between `start()` and the write, converting a possible unhandled `BrokenPipeError` into a clean cancellation/failure path.
  - **Why it matters:** Addresses a real race condition in the web runner's session lifecycle — a class of "process died underneath me" bugs that otherwise surface as cryptic tracebacks.
  - **Note:** No review comments captured yet (`comments: undefined`), so community feedback is still pending.

## 5. Feature Request Trends
The available sample points to one dominant direction: **persistent memory and cross-session context**. Issue [#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283) distills the most-requested capability into a dual-tier design:
1. **Automatic memory** — AI-managed notes capturing project patterns, conventions, and user preferences as the agent works.
2. **Manual memory** — user-authored persistent instructions (à la CLAUDE.md-style directives) that survive session boundaries.

If this issue is representative of broader demand, the community is pushing Kimi Code CLI from a stateless conversational tool toward a stateful, context-aware coding agent.

## 6. Developer Pain Points
- **Session/process lifecycle failures** — PR [#2324](https://github.com/MoonshotAI/kimi-cli/pull/2324) targets a subprocess-exit race in the web runner; "process disappeared between check and write" is a classic concurrency headache in session-based runners.
- **Output rendering correctness** — PR [#2449](https://github.com/MoonshotAI/kimi-cli/pull/2449) fixes newlines leaking into single-line tool-call summaries; subtle formatting bugs like this degrade CLI readability and trust.
- **Context loss across sessions** — the sustained interest in [#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283) implies users are frustrated by re-explaining project context and preferences on every new session, a recurring pain point for AI coding assistants generally.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-13

## Today's Highlights
OpenCode shipped two patch releases with targeted fixes for provider selection and session reliability: v1.18.18 corrects the Kimi system prompt and xai reasoning effort, while v1.18.17 improves session compaction, adds MERGE Gateway reasoning variants, and caps retry loops. The issue tracker is dominated by user frustration around “Free usage exceeded” errors on Zen models even for paid or balanced accounts, signaling a billing/entitlement logic problem. On the PR side, maintainers landed important Desktop/service reliability fixes and a popular security fix for permission wildcard matching.

## Releases

### v1.18.18
- Fixed Kimi system prompt selection for official Moonshot and Kimi providers.
- Fixed `xhigh` reasoning effort for xAI models.

### v1.18.17
- Session compaction now keeps complete recent turns and produces clearer summaries for smaller models.
- Added MERGE Gateway reasoning variants so those models work correctly. (@MatthewFeroz)
- Capped automatic session retries and added jitter to avoid repeated retry storms.

## Hot Issues

1. **[#14273 — “Free usage exceeded” when using Zen free models, despite balance](https://github.com/anomalyco/opencode/issues/14273)**  
   Users with a paid Zen balance are still blocked by free-tier quota errors. 40 comments, closed, but the volume shows confusion about how free limits and paid credits interact.

2. **[#4832 — Gemini 3 Pro function calling fails: missing `thoughtSignature` support](https://github.com/anomalyco/opencode/issues/4832)**  
   Blocks tool use on Gemini 3 Pro, a major provider integration. 35 comments and 14 👍 make it one of the most impactful provider-specific bugs.

3. **[#41470 — “Copied to clipboard” doesn't work](https://github.com/anomalyco/opencode/issues/41470)**  
   In VSCode Server/Docker environments, OpenCode reports a successful copy but the system clipboard is never updated. Common remote-development workflow is broken.

4. **[#3366 — Mermaid rendering in chat](https://github.com/anomalyco/opencode/issues/3366)**  
   Community has long requested Mermaid diagram rendering in the chat UI. 26 👍 shows strong interest in richer visual output.

5. **[#6815 — Command palette action to reload configuration without restart](https://github.com/anomalyco/opencode/issues/6815)**  
   The highest-upvoted open feature request at 88 👍. Users want to apply `opencode.json` / `AGENTS.md` changes without restarting.

6. **[#33027 — MCP tools connected but not exposed to agent](https://github.com/anomalyco/opencode/issues/33027)**  
   MCP servers connect and list tools, but the agent never sees them. This is a critical gap for the MCP ecosystem.

7. **[#19005 — Make local file paths clickable in terminal output](https://github.com/anomalyco/opencode/issues/19005)**  
   Generated file paths appear as plain text, forcing manual copy/paste. Simple UX win with steady community support.

8. **[#42128 — Free usage limit exceeded on first request (DeepSeek V4 Flash Free / Zen)](https://github.com/anomalyco/opencode/issues/42128)**  
   New users hit free-tier quota before making any request. Suggests a first-use/metering bug rather than actual quota exhaustion.

9. **[#42170 — Desktop fails to load sessions: `no such column: project_id`](https://github.com/anomalyco/opencode/issues/42170)**  
   Desktop app crashes on launch due to a schema mismatch between builds. Only 2 comments, but the app is completely unusable for affected users.

10. **[#17073 — Protect `.env` files in grep/glob results, not just direct read](https://github.com/anomalyco/opencode/issues/17073)**  
   Permission rules can be bypassed when grep/glob matching applies to the search pattern rather than the matched file path. Security-relevant for secret exposure.

## Key PR Progress

1. **[#42209 — fix(client): cancel SSE readers after handshake](https://github.com/anomalyco/opencode/pull/42209)**  
   Prevents native memory growth by detaching AbortSignals after SSE connections are established, important for long-lived reconnecting sessions.

2. **[#42214 — feat(tui): highlight bash shell input](https://github.com/anomalyco/opencode/pull/42214)**  
   Adds Tree-sitter-based Bash syntax highlighting to TUI Shell mode while leaving normal chat prompts unparsed.

3. **[#42158 — fix(opencode): bridge question tool to ACP elicitation](https://github.com/anomalyco/opencode/pull/42158)**  
   Fixes the `question` tool blocking indefinitely in ACP mode by forwarding the QuestionV2 request ID to `sdk.question.reply/reject`.

4. **[#42185 — fix(client): prevent stale service replacement](https://github.com/anomalyco/opencode/pull/42185)**  
   Stops older CLI/Desktop clients from replacing a newer managed background service after an update.

5. **[#42188 — fix(tui): retry migration status transport errors](https://github.com/anomalyco/opencode/pull/42188)**  
   Keeps migration status polling alive through transient server disconnects instead of failing the migration overlay.

6. **[#42206 — fix(tui): omit implicit `cd` autocomplete prefix](https://github.com/anomalyco/opencode/pull/42206)**  
   Removes the implicit `./` prefix for current-directory autocomplete entries while preserving explicit `../`, `~/`, and absolute paths.

7. **[#28689 — fix(permission): `*` should not match `/`; add `**` globstar support](https://github.com/anomalyco/opencode/pull/28689)**  
   Fixes a deny-rule bypass where patterns like `*.env` did not block `src/.env`. A meaningful security hardening for permission configs.

8. **[#39473 — fix: retry truncated provider streams](https://github.com/anomalyco/opencode/pull/39473)**  
   Treats streams that end without a finish reason as retryable truncation, improving resilience with flaky model providers.

9. **[#42202 — feat(opencode): add per-session budget limit](https://github.com/anomalyco/opencode/pull/42202)**  
   Adds an optional per-session cost budget with a TUI sidebar widget. Cost control is becoming a common request.

10. **[#42169 — fix(core): restore `workspace.project_id` for project ID remaps](https://github.com/anomalyco/opencode/pull/42169)**  
   Fixes the Desktop “no such column: project_id” crash on session load. Closes #42170.

## Feature Request Trends

- **Richer chat/terminal UI**: Mermaid rendering (#3366), clickable file paths (#19005), and Bash syntax highlighting (#42214) all point to a desire for a more capable interactive surface.
- **Faster configuration iteration**: Reload without restart (#6815) and custom provider model aliases (#30519) show users want less friction when tweaking configs.
- **Security controls**: Protecting `.env` files in grep/glob results (#17073) and per-MCP-server trust configuration (#40111) reflect growing concern about secrets and private-network MCP servers.
- **Cost management**: Per-session budgets (#42202) and the many billing/free-tier complaints indicate users want predictable cost visibility and enforcement.

## Developer Pain Points

- **Free-tier/billing confusion**: Numerous issues (#14273, #42128, #42132, #42140, #42154, #42215) report “Free usage exceeded” / “subscribe to Go” errors even after paying or with existing credits.
- **Desktop/service reliability**: Schema migration crashes (#42170), Linux bootstrap hangs (#41806), disk I/O errors (#32571), and project-open collisions (#42040) are disrupting normal workflows.
- **Provider streaming failures**: Azure large models hang (#42147), infinite retry loops (#41848), Gemini function-calling failures (#4832), and truncated streams (#39473) show provider integration remains fragile.
- **MCP integration gaps**: Tools that connect successfully but never reach the agent (#33027) remain a major blocker for MCP adoption.
- **Remote/clipboard UX**: Clipboard failures in VSCode Server (#41470) and non-clickable file paths (#19005) add unnecessary friction for developers in containerized/remote setups.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-13

## Today’s Highlights

No new release was published in the last 24h, but the tracker is very active around session reliability: the auto-compaction bug [#6879](https://github.com/earendil-works/pi/issues/6879) has 18 comments and 17 👍, while fixes are moving for streaming `usage` events ([#7982](https://github.com/earendil-works/pi/pull/7982)), extension `triggerTurn:false` behavior ([#8022](https://github.com/earendil-works/pi/pull/8022)), and transactional session persistence ([#8052](https://github.com/earendil-works/pi/pull/8052)). On the feature side, the community is pushing forward TUI mouse-event support for extensions ([#8037](https://github.com/earendil-works/pi/pull/8037), [#8032](https://github.com/earendil-works/pi/pull/8032)), Grok 4.6 support ([#8042](https://github.com/earendil-works/pi/pull/8042)), and an Ollama local-model proxy ([#8049](https://github.com/earendil-works/pi/pull/8049)).

## Releases

No new versions in the last 24h.

## Hot Issues

1. [Issue #6879: auto-compaction never triggers after context grows past 100% until provider overflow](https://github.com/earendil-works/pi/issues/6879)  
   Most active issue this cycle. A long agentic turn climbed past the compaction threshold and only stopped at a 373k-token API rejection. 18 comments and 17 👍 suggest users want compaction checks after every agent step, not only on overflow.

2. [Issue #7730: High CPU usage on macOS with long session](https://github.com/earendil-works/pi/issues/7730)  
   CPU swings between 50–110% and memory reaches 600–800MB on long sessions, seemingly correlated with context/session length. 11 comments and 8 👍 make this a significant local-dev pain point.

3. [Issue #7836: Edit fuzzy match misses lines with differences in whitespace length](https://github.com/earendil-works/pi/issues/7836)  
   Marked `inprogress`. `normalizeForFuzzyMatch` does not collapse whitespace runs or strip leading whitespace, so `oldText` fails even when content is identical. Particularly painful for smaller models using the Edit tool.

4. [Issue #8000: `@` file autocomplete ranks deep nested matches above direct children](https://github.com/earendil-works/pi/issues/8000)  
   Fresh UX bug: when typing `@~/<dir>/pro`, deep nested basename matches can win over the direct child the user almost certainly wants. Small comment count but high workflow impact.

5. [Issue #7835: Edit tool rejects a single-object edits argument](https://github.com/earendil-works/pi/issues/7835)  
   Marked `inprogress`. Some models wrap `edits` as a single object `{oldText, newText}` rather than an array; the Edit tool throws instead of recovering. Arrays are handled, objects are not.

6. [Issue #7724: Cold restore replays an overflow assistant removed by live recovery](https://github.com/earendil-works/pi/issues/7724)  
   After compaction + retry, reopening the session can re-add the failed/truncated assistant response to model history. This undermines live recovery and can confuse the model on resume.

7. [Issue #7911: 0.84.0 delta-only `message_update` removed `usage` from the wire protocol](https://github.com/earendil-works/pi/issues/7911)  
   Regression: `usage` was attached to the old cumulative `message` field, and dropping that field removed mid-run usage data. Now fixed by [#7982](https://github.com/earendil-works/pi/pull/7982).

8. [Issue #8018: DeepSeek provider silently ignores `max_completion_tokens`](https://github.com/earendil-works/pi/issues/8018)  
   DeepSeek documents only `max_tokens`; Pi sends `max_completion_tokens`, so output length limits are never enforced. Simple compatibility bug with real cost/latency consequences.

9. [Issue #8029: Very slow performance moving in the prompt editor](https://github.com/earendil-works/pi/issues/8029)  
   A ~7000-line prompt buffer makes a single arrow-key press take ~1650ms. Cursor movement grows linearly with buffer size, making large paste/edit sessions nearly unusable.

10. [Issue #7805: Root `.md` docs in skill directories are loaded as skills](https://github.com/earendil-works/pi/issues/7805)  
    Marked `inprogress`. `README.md`, `AGENTS.md`, and `CLAUDE.md` in skill directories are treated as individual skills, producing validation warnings. Fixed by [#8012](https://github.com/earendil-works/pi/pull/8012).

## Key PR Progress

1. [PR #8052: fix(coding-agent): make session persistence transactional](https://github.com/earendil-works/pi/pull/8052)  
   Closes a serious corruption window: `_appendEntry()` advanced the in-memory graph before JSONL writes completed. If an `ENOSPC` occurred, the next entry referenced a parent that never reached disk.

2. [PR #7982: fix(coding-agent): preserve usage in streaming events](https://github.com/earendil-works/pi/pull/7982)  
   Restores cumulative provider `usage` on JSON/RPC `message_update` events while keeping message snapshots omitted so stream size stays linear. Closes [#7911](https://github.com/earendil-works/pi/issues/7911).

3. [PR #8022: fix: `triggerTurn:false` should not start a turn](https://github.com/earendil-works/pi/pull/8022)  
   Fixes [#7783](https://github.com/earendil-works/pi/issues/7783). Custom display messages from `agent_end` were being routed through `agent.steer()`, causing an unintended second assistant turn.

4. [PR #8042: feat(ai): add Grok 4.6](https://github.com/earendil-works/pi/pull/8042)  
   Adds Grok 4.6 to the xAI Responses model set, preserving `low`, `medium`, `high`, and `xhigh` reasoning-effort levels.

5. [PR #8044: fix(bedrock): expose safe stream failure diagnostics](https://github.com/earendil-works/pi/pull/8044)  
   Classifies Bedrock send/stream-event/completion failures with bounded structured diagnostics, preserves tool-call metadata, and treats EOF-without-terminal-event as a safe transient failure.

6. [PR #8037 and PR #8032: TUI mouse events for components](https://github.com/earendil-works/pi/pull/8037)  
   Two implementations of the `Component.onMouse` hook from [#7683](https://github.com/earendil-works/pi/issues/7683). `TuiAltScreen` previously swallowed all mouse events, making it impossible for extension widgets/overlays to handle clicks and wheel. [#8032](https://github.com/earendil-works/pi/pull/8032) is still open.

7. [PR #7956: feat(coding-agent): render Mermaid diagrams in HTML exports](https://github.com/earendil-works/pi/pull/7956)  
   Reuses the ANSI-to-HTML tool-call rendering path so Mermaid diagrams are rendered in HTML exports, with a header toggle. Follow-up request [#8041](https://github.com/earendil-works/pi/issues/8041) asks for LaTeX parity as well.

8. [PR #8049: feat: use local Ollama models in Pi via a local model proxy](https://github.com/earendil-works/pi/pull/8049)  
   Adds two dependency-free Node.js scripts to proxy local Ollama models into Pi. Cross-platform and aimed at users who want local models without complex provider setup.

9. [PR #8012: fix: don’t load root `.md` files as skills in settings](https://github.com/earendil-works/pi/pull/8012)  
   Addresses [#7805](https://github.com/earendil-works/pi/issues/7805). Root `README.md` / `AGENTS.md` files are only treated as skills when they parse as valid skill frontmatter with `name` and `description`.

10. [PR #5262: feat(ai): add Anthropic Vertex provider](https://github.com/earendil-works/pi/pull/5262)  
    Long-running but notable: adds a built-in `anthropic-vertex` provider for Claude on Google Cloud Vertex AI, reusing the existing Anthropic Messages streaming/tool path.

## Feature Request Trends

- **Local/self-hosted model support** is a clear theme: Ollama proxy ([#8050](https://github.com/earendil-works/pi/issues/8050), [#8049](https://github.com/earendil-works/pi/pull/8049)), exposing all llama.cpp models in `/models` ([#8051](https://github.com/earendil-works/pi/issues/8051)), and a `/add-local-model` example extension ([#8039](https://github.com/earendil-works/pi/pull/8039)).
- **TUI/extension interactivity** is highly requested: component mouse events ([#7683](https://github.com/earendil-works/pi/issues/7683)), configurable wheel scroll step ([#7765](https://github.com/earendil-works/pi/issues/7765)), mid-line slash-command menus ([#8015](https://github.com/earendil-works/pi/issues/8015)), and extension hooks to display/replace assistant messages ([#8035](https://github.com/earendil-works/pi/issues/8035)).
- **Provider/API expansion** continues across the board: Grok 4.6 ([#8042](https://github.com/earendil-works/pi/pull/8042)), Anthropic Vertex ([#5262](https://github.com/earendil-works/pi/pull/5262)), Scaleway open-weight models ([#6165](https://github.com/earendil-works/pi/issues/6165)), MiniMax image-to-image ([#8030](https://github.com/earendil-works/pi/pull/8030)), and synchronous speech generation ([#8014](https://github.com/earendil-works/pi/pull/8014)).
- **HTML export fidelity**: users want exports to match the TUI, including Mermaid and LaTeX rendering ([#8041](https://github.com/earendil-works/pi/issues/8041), [#7956](https://github.com/earendil-works/pi/pull/7956)).
- **Terminal/platform compatibility**: WSL file links should open in Windows Terminal ([#8054](https://github.com/earendil-works/pi/issues/8054)), and ambiguous-width characters need correct column width for CJK terminals ([#8055](https://github.com/earendil-works/pi/issues/8055)).

## Developer Pain Points

- **Context/session reliability** is the biggest recurring frustration: compaction not triggering before overflow ([#6879](https://github.com/earendil-works/pi/issues/6879)), replay of removed overflow responses on restore ([#7724](https://github.com/earendil-works/pi/issues/7724)), agent turns wedging forever ([#7336](https://github.com/earendil-works/pi/issues/7336)), and high CPU/memory on long sessions ([#7730](https://github.com/earendil-works/pi/issues/7730)).
- **Edit tool compatibility** is a sharp edge: fuzzy matching fails on whitespace differences ([#7836](https://github.com/earendil-works/pi/issues/7836)) and single-object `edits` arguments are rejected ([#7835](https://github.com/earendil-works/pi/issues/7835)).
- **Extension API gaps** keep surfacing: `triggerTurn:false` still started turns ([#7783](https://github.com/earendil-works/pi/issues/7783)), no acknowledgement for durable custom messages ([#8023](https://github.com/earendil-works/pi/issues/8023)), and mouse events are swallowed by the TUI ([#7683](https://github.com/earendil-works/pi/issues/7683)).
- **Provider compatibility** remains a recurring source of bugs: OpenAI-compatible proxies rejecting SDK metadata headers ([#3207](https://github.com/earendil-works/pi/issues/3207)), DeepSeek silently ignoring `max_completion_tokens` ([#8018](https://github.com/earendil-works/pi/issues/8018)), and mid-run `usage` disappearing from wire events ([#7911](https://github.com/earendil-works/pi/issues/7911)).
- **Editor performance** matters: large prompt buffers cause multi-second cursor movement ([#8029](https://github.com/earendil-works/pi/issues/8029)) and TUI rendering can misalign on CJK terminals ([#8055](https://github.com/earendil-works/pi/issues/8055)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-13

## Today’s Highlights
Desktop users received two new releases: v0.2.0 stabilizes Web Shell transcript pagination, and v0.2.1 makes default project memory workspace-scoped. On the server side, live-journal caps now grow adaptively before mid-turn replay truncation, while workflow agents are gaining per-agent transcripts and the ability to pin a working directory and outlive default bounds. Community attention remains focused on long-running/headless task reliability, a desktop image-load regression, and Vertex AI ADC friction.

## Releases
- [Qwen Code Desktop v0.2.1](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.1)  
  Refactors default project memory to workspace scope ([#8856](https://github.com/QwenLM/qwen-code/pull/8856)) and aligns session-lifecycle telemetry.

- [Qwen Code Desktop v0.2.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.0)  
  Stabilizes Web Shell transcript history pagination ([#8914](https://github.com/QwenLM/qwen-code/pull/8914)) and adds session catalog sharing for Web Shell.

- [dsw-eas-smoke-20260812-281542bfdc](https://github.com/QwenLM/qwen-code/releases/tag/dsw-eas-smoke-20260812-281542bfdc)  
  Non-production DSW EAS infrastructure smoke. No SWE score published. Benchmark ref: v0.21.2.

## Hot Issues
- [RFC: Reliable auto-memory recall — timing, quality, and telemetry #7040](https://github.com/QwenLM/qwen-code/issues/7040) — 10 comments  
  Central design issue for memory reliability. Recall delivery telemetry is merged; bounded initial-turn recall and multilingual evaluation are in review. The most active memory-related discussion in the tracker.

- [不能自动运行 / Shell will not run tasks #8963](https://github.com/QwenLM/qwen-code/issues/8963) — 9 comments  
  Users report YOLO/auto modes stalling on Python scripts and long-running commands. Community compares Qwen Code unfavorably to Kimi Code for durability, with a clear ask for a “no-brainer accept” mode for overnight tasks.

- [Regression: Qwen Code crashes on image load since 0.21.2 #8957](https://github.com/QwenLM/qwen-code/issues/8957) — 8 comments  
  A release-blocking regression: 0.21.1 works, 0.21.2 crashes immediately on image reads. High visibility among desktop/image-heavy users.

- [Preserve current session when a large restore times out #8678](https://github.com/QwenLM/qwen-code/issues/8678) — 7 comments  
  P1 session-management issue. First PR merged with timeout contracts and observability; selective restore design still in progress. Important for daemon-mode users with large histories.

- [tmux flickering when using Qwen Code via SSH #8562](https://github.com/QwenLM/qwen-code/issues/8562) — 7 comments  
  Linux/terminal rendering regression: screen flickers only inside tmux split panes. Multiple users confirmed the issue after recent version updates.

- [Background agent coordination gap #8097](https://github.com/QwenLM/qwen-code/issues/8097) — 6 comments  
  Duplicate work, premature completion, and non-interactive `send_message` when multiple background Explore subagents run concurrently. Key multi-agent roadmap feedback.

- [Harden tool-output budgeting, observability, and artifact lifecycle #7306](https://github.com/QwenLM/qwen-code/issues/7306) — 5 comments  
  Phase 1 correctness is complete; follow-up includes bounded tool-result display payloads. Important for preventing context bloat in long sessions.

- [--approval-mode and --auth-type accepted but missing from qwen --help #8897](https://github.com/QwenLM/qwen-code/issues/8897) — 5 comments  
  CLI configuration gap: flags work but are undocumented in help output. A low-effort, high-discovery bug for headless/CI users.

- [Anthropic wire is missing stream-safety protections #9005](https://github.com/QwenLM/qwen-code/issues/9005) — 3 comments  
  P1 issue: Anthropic content generator lacks stream-safety guards the OpenAI wire already has. Also flags an outdated `@anthropic-ai/sdk` pin. Relevant for proxy and multi-provider deployments.

- [Keyless Vertex AI is not inferred from environment #9025](https://github.com/QwenLM/qwen-code/issues/9025) — 3 comments  
  Headless ADC runs fail because `getAuthTypeFromEnv` does not infer keyless Vertex AI. Blocks environment-only Vertex setups and CI authentication.

## Key PR Progress
- [feat(serve): adaptively grow live-journal caps before truncating mid-turn replay #8905](https://github.com/QwenLM/qwen-code/pull/8905)  
  Daemon now grows per-session live-journal caps before dropping replay entries, reducing data loss during long in-flight turns.

- [feat(core): write per-agent transcripts for workflow dispatches #8971](https://github.com/QwenLM/qwen-code/pull/8971)  
  Workflow `agent()` dispatches now generate the same per-agent JSONL transcripts as Agent-tool subagents, improving debug and audit ability.

- [feat(core): let a workflow agent pin a directory and outlive the default bounds #8972](https://github.com/QwenLM/qwen-code/pull/8972)  
  Workflow subagents can run in an existing git worktree via `workingDir` and exceed default duration/lifetime limits. A major capability boost for workflow orchestration.

- [feat(web-shell): support workspace file uploads #8874](https://github.com/QwenLM/qwen-code/pull/8874)  
  Adds drag-and-drop and composer uploads with progress, cancellation, conflict renaming, and inline file references.

- [feat(web-shell): redesign Channel policy and workspace management #8848](https://github.com/QwenLM/qwen-code/pull/8848)  
  Exposes direct-message, group-access, session-routing, and workspace-ownership controls across manageable Web Shell adapters.

- [feat(serve): share one Chrome bridge across sessions via multi-client /cdp tunnel #8740](https://github.com/QwenLM/qwen-code/pull/8740)  
  Makes the daemon `/cdp` tunnel multi-client so sessions share a single Chrome extension bridge instead of reconnecting individually.

- [feat(review): add Maven multi-module verification #8777](https://github.com/QwenLM/qwen-code/pull/8777)  
  Registers a Maven adapter on the toolchain boundary; `review build-test` now recognizes Maven roots and multi-module projects.

- [feat(cli): Add review settings for attribution, default effort, and default comment #8994](https://github.com/QwenLM/qwen-code/pull/8994)  
  Adds operator-controlled `/review` settings while preventing repository-controlled settings from overriding review policy.

- [fix(cli): Bound headless tool result content #9012](https://github.com/QwenLM/qwen-code/pull/9012)  
  Caps headless `tool_result.content` at 65,536 UTF-8 bytes with deterministic 20/80 previews, aligning headless output with the ACP display bound.

- [feat(serve): no-op on empty channel set and restore only active channels #8978](https://github.com/QwenLM/qwen-code/pull/8978)  
  `qwen serve --channel all` now treats an empty channel configuration as a graceful no-op instead of exiting the daemon.

## Feature Request Trends
- **Reliable memory and session restore**  
  Top trend: auto-memory recall timing, tool-output budgeting, and selective session restore to avoid large-history failures.

- **Multi-agent and workflow orchestration**  
  Requests for background-agent coordination, per-agent transcripts, workflow agents with working directories, and longer-lived subagents.

- **WebShell/desktop maturity**  
  Community continues pushing Web Shell file uploads, channel policy controls, stable session navigation, manual session naming, and desktop UI polish.

- **Authentication and provider flexibility**  
  Vertex AI ADC/keyless support, SDK/CLI parity for permission modes, and better Anthropic model-ID/token handling are recurring asks.

## Developer Pain Points
- **Long-running tasks are not reliable enough**  
  Shell stalling on long commands ([#8963](https://github.com/QwenLM/qwen-code/issues/8963)), headless `NO_TOOL_RESULT_PROGRESS` failures ([#9026](https://github.com/QwenLM/qwen-code/issues/9026)), and MAX_TOKENS transcript desync ([#8979](https://github.com/QwenLM/qwen-code/issues/8979)).

- **Regression sensitivity in new releases**  
  Image-load crashes ([#8957](https://github.com/QwenLM/qwen-code/issues/8957)), tmux flicker ([#8562](https://github.com/QwenLM/qwen-code/issues/8562)), and desktop scrollbar jitter ([#8985](https://github.com/QwenLM/qwen-code/issues/8985)) show users are hitting visible regressions quickly after upgrades.

- **Authentication and CLI friction**  
  Vertex ADC inability ([#9016](https://github.com/QwenLM/qwen-code/issues/9016), [#9025](https://github.com/QwenLM/qwen-code/issues/9025)), missing CLI help entries ([#8897](https://github.com/QwenLM/qwen-code/issues/8897)), and SDK rejecting valid permission modes ([#9002](https://github.com/QwenLM/qwen-code/issues/9002)).

- **CI and pipeline instability**  
  Main CI E2E failure tracking ([#9015](https://github.com/QwenLM/qwen-code/issues/9015)) and ENOSPC/load-sensitive test flakes ([#8982](https://github.com/QwenLM/qwen-code/pull/8982)) remain visible to contributors.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-13

## Today's Highlights
v0.9.6 formalizes the branding transition: **CodeWhale** is now the public product name, the `codewhale` command/npm package is canonical, and the legacy `deepseek-tui` package is deprecated. Community PRs remain active but consistently hit base-drift CI failures, forcing maintainers to re-land identical changes through a "harvest" path — a notable contribution-friction signal. Two v0.9.5 regressions dominated discussion today: Auto-Review silently blocking Bash/write calls, and an MCP `nextCursor: null` response that breaks strict clients.

## Releases
**v0.9.6** — Confirms CodeWhale (Shannon Labs) as the public product; `codewhale` remains the lowercase technical identifier for commands, npm, and release assets. The legacy `deepseek-tui` npm package is deprecated with no further releases; users on v0.8.x legacy `deepseek`/`d...` entrypoints must migrate to `codewhale`.

## Hot Issues
1. [#5323 — Regression in v0.9.5: Auto-Review silently blocks every Bash call and write operation](https://github.com/Hmbown/CodeWhale/issues/5323) — Upgrading to v0.9.5 changed Auto-Review from auto-approving to silently blocking all tool calls as "destructive". High impact for agentic workflows.
2. [#5335 — `serve --mcp` returns `"nextCursor": null`, breaking strict MCP clients](https://github.com/Hmbown/CodeWhale/issues/5335) — `tools/list` and `resources/list` violate the MCP spec; strict clients like Claude Code reject the shape (`expected string, received null`). Fix already landed via #5336.
3. [#4949 — Chinese translation of "Constitution": 宪法 vs 协作准则](https://github.com/Hmbown/CodeWhale/issues/4949) — 9-comment community debate over whether "Constitution" should be translated as 宪法 (foundational authority, but politically sensitive) or 协作准则 (collaboration norms). Triggered by PR #4908 reverting to 宪法.
4. [#5316 — EPIC-005: CodeWhale TUI crate decomposition umbrella](https://github.com/Hmbown/CodeWhale/issues/5316) — Tracking issue for the staged TUI decomposition into command contracts, facets, and shared types; defines the architectural roadmap for EPIC-006 and downstream FEAT work.
5. [#5322 — Regression: output area doesn't fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322) — v0.9 caps transcript width, leaving cramped text on wide displays; worked correctly in v0.8.65.
6. [#5209 — File edit tool silently accepts wrong parameter names and reports fake success](https://github.com/Hmbown/CodeWhale/issues/5209) — Using `new_str` instead of `replace` returns "Replaced successfully" without doing anything, forcing 3–5x re-edits per location.
7. [#5250 — Only one API key can be saved across providers](https://github.com/Hmbown/CodeWhale/issues/5250) — Switching between DeepSeek, GLM, and other providers overwrites the previous key; users want per-provider key storage.
8. [#5314 — Copy message from context menu includes rail decorations](https://github.com/Hmbown/CodeWhale/issues/5314) — Copied text carries `●` role glyphs and `▏` rail prefixes, unlike selection copy. Fixed in #5331/#5319.
9. [#5270 — Unified tasks surface (shell + subagents + durable workers)](https://github.com/Hmbown/CodeWhale/issues/5270) — Requests one operator-facing list of everything still running: background shells, subagents, Fleet/lane workers, and workflow runs.
10. [#5000 — Interrupted assistant output should be a durable first-class session item](https://github.com/Hmbown/CodeWhale/issues/5000) — Text emitted before `MessageComplete` exists only in TUI-local display, not the authoritative session, causing context loss on resume.

## Key PR Progress
1. [#5327 — Interactive extensions manager](https://github.com/Hmbown/CodeWhale/pull/5327) — Adds localized `/plugin` and `/plugins` managers with digest-bound bundle lifecycle control; legacy executable tools remain read-only inventory entries until a curated Marketplace exists.
2. [#5333 / #5318 — Pin host terminal window as always-on-top mini window](https://github.com/Hmbown/CodeWhale/pull/5333) — Maintainer harvest of SparkofSpike's PR: `/pin` shrinks the host terminal to 640x400 and pins it always-on-top; toggle restores original size/maximized state.
3. [#5336 — Fix MCP: omit `nextCursor` when there are no further pages](https://github.com/Hmbown/CodeWhale/pull/5336) — Fixes #5335 by making the field absent instead of `null`, restoring spec compliance for `tools/list` and `resources/list`.
4. [#5332 / #5321 — Register OrcaRouter as a named provider](https://github.com/Hmbown/CodeWhale/pull/5332) — Wires OrcaRouter (OpenAI-compatible gateway, `sk-orca-` keys) into the model picker, config reference, and docs, mirroring the OpenRouter integration.
5. [#5331 / #5319 — Copy messages without visual rails](https://github.com/Hmbown/CodeWhale/pull/5331) — Harvest of XhesicaFrost's PR closing #5314: user/assistant cells copy canonical source content; complex cells (tool, thinking, system) keep the full-transcript path. Includes regressions.
6. [#5330 / #5320 — Separate snapshot reads from crash recovery](https://github.com/Hmbown/CodeWhale/pull/5330) — Adds `load_session_snapshot` for side-effect-free reads during active tool calls and `recover_session_for_resume` returning repair stats so recovery happens only after a known restart.
7. [#5329 — Move lru to 0.18 and unpin ratatui-core (RUSTSEC-2026-0253)](https://github.com/Hmbown/CodeWhale/pull/5329) — Restores the green main gate: `lru` 0.16.4's `LruCache::pop()` is panic-unsafe and can leave dangling list pointers; fixed upstream in 0.18.2.
8. [#5339 — Suppress child-owned shell completions](https://github.com/Hmbown/CodeWhale/pull/5339) — Filters child-owned background shell completion events out of the parent model stream while preserving unowned parent completions and task/status visibility; closes #5325.
9. [#5338 — Move docs guide page onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5338) — First slice of #5337: retires `isZh` ternaries in `docs/guide/page.tsx` via a per-page `DocsGuideDict` with en/zh dictionaries, copy moved verbatim.
10. [#5328 — FEAT-014: Command contract crate boundary (facets + shared types)](https://github.com/Hmbown/CodeWhale/pull/5328) — Prototype migration shapes for the EPIC-005/006 command extraction; no production rewiring, accepted as an early-review exception to the fork-local rule.

## Feature Request Trends
- **Multi-provider ergonomics**: repeated asks for per-provider API keys (#5250) plus new provider registrations (OrcaRouter in #5321) show users are actively multi-model and want first-class key/config separation.
- **Session durability & recovery**: interrupted-output persistence (#5000), prompt-scoped workspace restore (#5272), and persistent agent state with signed compressed KV-cache capsules (#2904) signal demand for crash-safe, resumable long-running sessions.
- **Unified automation surface**: the unified tasks panel (#5270) and cron-watcher gap (#5181) point to one operator-facing view for background shells, subagents, and scheduled/durable workers.
- **i18n completeness**: the dictionary spine series (#5337, #5338) and the Chinese "Constitution" terminology debate (#4949) show a push to replace `isZh` branching with full per-locale dictionary paths.
- **MCP spec strictness**: the `nextCursor` issue (#5335) followed by an immediate fix signals that spec compliance is becoming a hard requirement for external client interoperability.

## Developer Pain Points
- **Silent behavioral regressions**: Auto-Review blocking every tool call (#5323) and the wide-terminal output cap (#5322) show v0.9.5 shipped behavior changes that broke established workflows — the community responds strongly to changes that fail loudly instead of erring.
- **Tool correctness & trust**: File edit's fake success (#5209) and stale prompt claims about `code_execution` and sub-agent routing (#5215) mislead both user and model, incurring a 3–5x re-edit tax.
- **Config persistence surprises**: API keys persisting only in repo-local plaintext (#5047) and the single-key storage limit (#5250) create both security and multi-project friction.
- **Community contribution friction**: the repeated maintainer-harvest pattern (#5333, #5331, #5330, #5332) — where community PRs fail CI only from base drift and fork pushes are declined — remains the dominant contributor hurdle despite maintainers landing the work.
- **Hardcoded limits and heavy ceremony**: the 10-continuation goal-loop cap (#5052) and the sub-agent output contract requiring SUMMARY/EVIDENCE/CHANGES/RISKS/BLOCKERS + sentinel (#5189) frustrate users who want completion-verified runs and lighter syntax for small tasks.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*