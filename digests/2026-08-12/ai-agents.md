# OpenClaw 生态日报 2026-08-12

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-12 02:00 UTC

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

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目保持极高活跃度：Issues 更新 500 条（新开/活跃 386，关闭 114），PR 更新 500 条（待合并 273，合并/关闭 227），无新版本发布。社区反馈集中在**消息投递可靠性**（silent reply 复发、channel dispatch 失败、消息截断）与**会话状态管理**（subagent 完成通知丢失、流式 watchdog 误报）两大方向，P1 级问题占比明显偏高。维护者今日关闭了 1 个 P0（#121675）、2 个 P1（#92201、#92076）及多个 P1/P2 问题，但 #121058（silent reply 复发）以 69 条评论成为当前社区最关注的问题，且修复后复发，需警惕深层架构缺陷。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日共 227 个 PR 被合并/关闭，以下为关键合并：

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#122334](https://github.com/openclaw/openclaw/pull/122334) | fix(windows): launch npm-installed native session CLIs | 已合并 | 修复 Windows 下 npm 安装的原生会话 CLI（Anthropic/Codex/opencode 等）无法启动的问题，避免错误路由到 POSIX shim |
| [#122369](https://github.com/openclaw/openclaw/pull/122369) | improve: speed up audit event writer tests | 已合并 | 合并重叠的 worker 线程测试场景，单文件测试耗时从 39s 显著下降，改善 CI 稳定性 |
| [#121818](https://github.com/openclaw/openclaw/pull/121818) | feat: clone GitHub projects from session picker | 已合并 | 支持从会话选择器直接克隆 GitHub 项目，补齐了 Gateway 侧的项目物化流程（属于 #121381 的一部分） |
| [#107295](https://github.com/openclaw/openclaw/pull/107295) | refactor(qqbot): install plugin from Tencent package | 已合并 | QQBot 通道从 OpenClaw monorepo 剥离，改由腾讯 Connect 独立发布，减少所有权重复 |
| [#122312](https://github.com/openclaw/openclaw/pull/122312) | fix(ui): show a placeholder for remote markdown images | 已合并 | 控制 UI 对远程 Markdown 图片显示占位符，避免用户误以为图片丢失 |
| [#122237](https://github.com/openclaw/openclaw/pull/122237) | improve(ui): quiet slash command menu hierarchy | 待合并 | 优化控制 UI 斜杠命令菜单的视觉层次，弱化非必要元素的品牌色强调 |
| [#122066](https://github.com/openclaw/openclaw/pull/122066) | fix(ui): reach identity-menu footer controls with keyboard | 待合并 | 修复键盘用户无法访问身份菜单底部控件的可访问性问题 |
| [#122316](https://github.com/openclaw/openclaw/pull/122316) | fix(ui): gate model shortcuts by search focus | 待合并 | 修复搜索框聚焦时数字快捷键误触模型切换的问题 |
| [#122361](https://github.com/openclaw/openclaw/pull/122361) | fix(media): retain resolved images when native current media partially resolves | 待合并 | 修复多图发送时单张读取失败导致全部图片被丢弃的问题 |

**结论**：UI 可访问性与 Windows 兼容性修复是今日主要推进方向。渠道插件独立化（QQBot）和 Gateway 侧项目物化是架构演进的重要信号。

---

## 4. 社区热点

| Issue/PR | 评论数 | 主题 | 分析 |
|---|---|---|---|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 69 | Silent reply failures 在 #116277 关闭后仍然复发 | 社区情绪最高的问题。用户明确表示"问题仍持续发生"，监控 cron 在 issue 关闭后仍在记录新事件，说明此前修复未覆盖根本原因。这是对可靠性承诺的严重打击 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | 64 | Realtime voice 会话可无限保留 provider 和 consult 状态 | 资源边界缺失，慢/突发 provider 行为下可能累计大量陈旧状态。涉及会话状态安全，被标记为 diamond lobster 级别 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 46 | Agent 在 tool call 间产生的文本会泄漏到消息渠道 | 用户明确表示这是"显著的 UX 问题"——内部处理输出、执行失败信息被当作可见消息发送到 Slack/iMessage 等渠道。涉及安全与消息丢失双重影响 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 43 | 按来源对记忆进行信任标记 | 社区持续关注记忆投毒防护，希望区分用户指令、网页抓取、第三方技能等不同来源的记忆可信度 |

**共同诉求**：消息投递的确定性与可预期性——用户需要知道"什么会被发送、什么不会"，以及"发送失败时如何感知"。

---

## 5. Bug 与稳定性

### 已关闭（今日解决）

| 严重度 | Issue | 标题 | 说明 |
|---|---|---|---|
| P0 | [#121675](https://github.com/openclaw/openclaw/issues/121675) | 2026.8.1-beta.1 发布缺少配套插件，启动陷入不可恢复的 boot loop | 发布流程缺陷已处理，但需关注发布 CI 是否加了锁步校验 |
| P1 | [#92201](https://github.com/openclaw/openclaw/issues/92201) | Embedded runner 重放时 Anthropic thinking 签名间歇性无效，恢复包装器因错误文本泛化而不触发 | 已关闭，标记为 not-repro-on-main |
| P1 | [#92076](https://github.com/openclaw/openclaw/issues/92076) | Subagent 完成传送到 requester 会话不活跃且 transcript 锁定时失败 | 已关闭 |
| P1 | [#96827](https://github.com/openclaw/openclaw/issues/96827) | message_tool_only 模式下 agent 不终止，产生级联自回复 | 已关闭 |

### 活跃问题（按严重度）

| 严重度 | Issue | 标题 | 是否有 fix PR |
|---|---|---|---|
| P1（复发） | [#121058](https://github.com/openclaw/openclaw/issues/121058) | Silent reply failures 持续复发，无 queued reply payload | ❌ 无 |
| P1 | [#121953](https://github.com/openclaw/openclaw/issues/121953) | Cron agent 在 DeepSeek 上 stall——`[cron:<jobId>]` 前缀导致请求被降优先级 | ✅ 有 PR（linked-pr-open） |
| P1 | [#114020](https://github.com/openclaw/openclaw/issues/114020) | Feishu/Telegram 频道 dispatch 失败：需声明 runDispatchLifecycle | ❌ 无 |
| P1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏，僵尸进程累积导致运行时退化 | ❌ 无 |
| P1 | [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复在 ~1000-1100 字符处静默截断 | ❌ 无 |
| P1 | [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex Telegram 回合超时（3 👍） | ❌ 无 |
| P1 | [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run 中止 memory_search 工具调用并错误分类为超时 | ❌ 无 |

**风险提示**：#121058 的复发性质暗示消息投递链路存在系统性缺陷，而非单一 bug；#97616 的僵尸进程问题在长时间运行的生产环境中影响严重，应提升优先级。

---

## 6. 功能请求与路线图信号

### 高热度功能需求

| Issue | 标题 | 评论/点赞 | 路线图信号 |
|---|---|---|---|
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | 可配置流式 watchdog 超时阈值 | 8 👍 | 对 kimi-k2.5 / DeepSeek-R1 等长思维链模型的支持需求强烈 |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) | Control UI 支持 MathJax/LaTeX | 10 👍 | 学术/教育场景用户需求明确 |
| [#72741](https://github.com/openclaw/openclaw/issues/72741) | 外部安全/护栏检查标准接口 | 1 👍 | 与企业级部署需求相关 |
| [#13700](https://github.com/openclaw/openclaw/issues/13700) | 会话快照（save/load 上下文检查点） | 0 👍 | 开发者用户的分支/回滚工作流需求 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | SQLite 的 memory_index_chunks 和 memory_embedding_cache 无保留策略 | 0 👍 | **技术债信号**：生产实例磁盘将被填满，需要维护者关注 |

### 有望进入下一版本的方向

- **UI/UX 层**：#122237（slash 命令菜单）、#122066（键盘可访问性）已在 PR 队列中，预计随下一版本合并
- **渠道配置修复**：PR #118152/#119326/#118148/#117287/#118157 等一批"文档声明了配置但 schema 拒绝"的修复，涉及 IRC/Mattermost/Feishu/Nostr 等十余个渠道，说明配置系统的文档-实现一致性正在被系统性治理
- **可扩展性**：#14785（tool schema 减少 ~3500 token/会话）虽为 P2 但评论持续活跃，是基础设施级优化

---

## 7. 用户反馈摘要

### 核心痛点

1. **修复反复无效**（#121058）：用户明确表示"#116277 关闭了但问题仍在发生"，直接影响用户对项目维护质量的信任。
2. **内部文本泄漏到外部渠道**（#25592）：用户评论"内部处理输出、失败的执行结果被当作可见消息发送到 Slack/iMessage"——将内部状态暴露给终端用户，既是 UX 问题也是安全隐患。
3. **长回复被截断**（#84516）：gpt-5.5 在 headless 模式下回复截断至 ~1000 字符且无错误标记，模型认为已完成但用户看不到完整回复。
4. **子进程泄漏影响长期运行**（#97616）：生产环境长期运行后僵尸进程累积，"运行时退化"影响稳定性。
5. **配置文档与实现脱节**：多个 channel 的 documented config key 被 schema 拒绝（PR #118152/#119326/#118148 等），社区用户按文档配置却被拒，挫败感强。

### 正面反馈

- 今日无显著正面反馈，但 PR #122369（测试提速）和 #122334（Windows 修复）的提交速度说明维护者对 CI 可靠性有积极投入。

---

## 8. 待处理积压

以下长期未关闭的高关注度 Issue 已远超合理处理周期，提醒维护者关注：

| Issue | 创建时间 | 评论数 | 标签 | 积压时长 | 风险 |
|---|---|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | 43 | P2, security | **6 个月+** | 记忆投毒攻击面持续存在，社区持续讨论但无维护者明确回应 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 46 | P1, security | **5 个月+** | P1 安全/UX 问题长期未解决，且社区热度高（46 评论） |
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | 2026-02-12 | 9 | P2, diamond lobster | **6 个月+** | 基础设施级 token 优化，长期未推进 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 2026-03-08 | 12 | P1, message-loss | **5 个月+** | A2A 会话中重复消息问题，有 linked PR 但未合并 |
| [#42820](https://github.com/openclaw/openclaw/issues/42820) | 2026-03-11 | 7 | P1, message-loss | **5 个月+** | Feishu 文件发送被 poll schema 污染，有 linked PR |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 2026-03-16 | 10 | P1, message-loss | **近 5 个月** | Subagent 会话持久化导致主会话无响应 |

**整体判断**：项目在活跃度上表现优秀，Issue/PR 处理速度（500 条/日）在国内/国际开源项目中都属于第一梯队。但 P1 级问题积压 5 个月以上的情况说明维护者带宽已接近上限。此外，silent reply 复发现象（#121058）和多个 channel 配置校验失败的 PR 系列（#118152 等）提示我们需要在"合并速度"和"架构层根治"之间找到更好的平衡——大量 hotfix 并行推进，但根本原因未消除。建议维护者优先分配 1-2 名核心成员专门处理消息投递链路的架构审查，而将渠道配置类修复作为低优先级批量处理。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**数据窗口：2026-08-11 ~ 2026-08-12 | 覆盖项目：12 个（含 2 个无活跃）**

---

## 1. 生态全景

本日生态整体处于**高速迭代与架构分化并行**的活跃期：以 OpenClaw 为首的项目单日处理 Issue/PR 合计超 1000 条，IronClaw、CoPaw、Hermes Agent、ZeroClaw 等紧随其后，但"合并速度"与"根治深度"的矛盾普遍存在——OpenClaw 的 silent reply 复发、ZeroClaw 仅 1/50 的 PR 合并率、Hermes 桌面端密集回归均指向同一问题：**社区规模已超越维护者带宽，hotfix 并行推进但根因未消**。与此同时，安全边界（命令白名单绕过、插件越权、delegate 工作区逃逸）与消息投递确定性成为跨项目共性痛点，而 MCP 远程化、OpenAI 兼容层、Token 成本工程化则构成了下一轮能力竞争的焦点。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（活跃 386 / 关闭 114） | 500（待合并 273 / 合并关闭 227） | 无 | 极高活跃；消息可靠性存系统性隐患，P1 积压 5 月+ |
| **IronClaw** | 22（活跃 13 / 关闭 9） | 50（待合并 25 / 合并关闭 25） | 无 | 极高活跃；Bug 当日响应，健康度最佳 |
| **CoPaw** | 22（活跃 9 / 关闭 13） | 48（待合并 23 / 合并关闭 25） | **v2.1.0-beta.3** | 极高活跃；发布前冲刺，安全/IME 问题待解 |
| **Hermes Agent** | 50（活跃 48） | 50（待合并 45） | 无（v0.20.0 为 08-03） | 高速迭代；桌面端网关回归密集 |
| **ZeroClaw** | 50（活跃 40 / 关闭 10） | 50（合并 1 / 待合并 49） | 无 | 高讨论；RFC 密集但合并吞吐量极低 |
| **NanoBot** | 6 | 140（合并关闭 119，多为 `[conflict]` 积压清理） | 无 | 方向收缩；1 个高危安全漏洞无 fix |
| **LobsterAI** | 3 关闭 | 7 合并 | **2026.8.11** | 稳定；版本节奏健康，长尾 issue 133 天 |
| **NanoClaw** | 1 | 8（合并 3） | 无 | 中上；MCP 进展扎实，1 个核心消息 bug |
| **PicoClaw** | 3（活跃 2 / 关闭 1） | 6（全部待合并，5 个 stale） | 无 | 中等；PR 审查是明显瓶颈 |
| **Moltis** | 0 | 1 待合并 | 无 | 低频；稳定，重量级 PR 待评审 |
| **NullClaw** | — | — | — | 无活动 |
| **ZeptoClaw** | — | — | — | 无活动 |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是该生态无可争议的参照系与规模天花板。**

| 维度 | OpenClaw | 对比说明 |
|---|---|---|
| 社区规模 | 单日 Issue+PR 更新 1000 条 | 约为 IronClaw/ZeroClaw/Hermes（各 100 条）的 10 倍，是第二梯队总和的 2 倍以上 |
| 合并吞吐 | 227 个 PR 合并/关闭 | IronClaw 25、CoPaw 25、Hermes 5、ZeroClaw 1，OpenClaw 仍居首位 |
| 渠道覆盖 | Feishu/Telegram/Slack/iMessage/QQBot 等十余个渠道 | 渠道广度显著领先；QQBot 已剥离至腾讯 Connect 独立发布，探索渠道插件化 |
| 技术路线 | Monorepo + Gateway + 控制 UI，UI 可访问性与 Windows 兼容性持续补齐 | 与 Hermes（桌面端优先）、IronClaw（可插拔 agent loop 重构）形成差异化 |
| 主要短板 | #121058 silent reply 修复后复发（69 评论）；P1 积压 5 个月+；hotfix 繁多但根因未除 | 社区规模远超维护者根治能力，稳定性承诺受质疑；IronClaw 的"当日 fix PR"响应效率更优 |

**生态位判断**：PicoClaw、NanoClaw、ZeroClaw、NullClaw 等 "Claw" 命名家族本身即是 OpenClaw 影响力的佐证。它在渠道广度和社区规模上无可替代，但架构级可靠性（消息投递链路）和决策效率（P1 积压）正在被 IronClaw 等后发项目以更灵活的架构拉开差距。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目（具体诉求） |
|---|---|
| **消息投递的确定性与可观测性** | OpenClaw #121058 silent reply 复发（69 评论）；NanoClaw #3226 消息 ID 复用导致静默丢弃；Hermes #84185 网关静默死亡无日志；ZeroClaw #9911 mention_only 回复被丢弃。共同诉求：**用户需要知道"什么会被发送、什么不会、失败如何感知"** |
| **Agent 循环失控与重复输出防护** | NanoBot #5256 /goal 重复数十条回复、#5344 重复工具调用告警；IronClaw #7486 no-progress 误报；OpenClaw #96827 级联自回复。共同诉求：**循环检测 + 中断机制 + 进度判定** |
| **执行安全边界策略化** | NanoBot #5306 exec.allowPatterns shell 链绕过（高危无 fix）；CoPaw #6916 插件静默创建 cron（无用户确认）；ZeroClaw #9872 bounded delegate 越权写工作区、#7155 allow/ask/deny 命令策略；OpenClaw #7707 记忆投毒防护。共同诉求：**运行时策略而非静态配置，文件系统隔离，命令确认层** |
| **Token 成本与上下文管理** | Hermes #6839 懒加载工具 Schema（省 3500-5000 tokens/次，👍18）；IronClaw #7484 上下文静默驱逐、#7485 token 估算双倍计数；OpenClaw #14785 tool schema 减 3500 token；ZeroClaw #2269 Token 成本管理。共同诉求：**上下文压缩、schema 按需注入、成本预算控制** |
| **MCP 生态扩展与加固** | NanoClaw #3092/#3221 远程 Streamable HTTP MCP；CoPaw #6732 MCP 周期性失效、#6874 超时可配置；NanoBot #5338 MCP 凭证保护；IronClaw #6997 显式 cache_control 断点。共同诉求：**MCP 从本地 stdio 走向云端 HTTP，同时解决稳定性与凭证安全** |
| **桌面端（尤其 Windows）稳定性** | Hermes #83683/#83562/#84185/#84200 桌面更新杀网关（4 个 P1）；OpenClaw #122334 修复 Windows CLI 启动；CoPaw #6919 Windows 频繁崩溃、#6885 中文 IME 崩溃；LobsterAI #1183 网关启动失败循环（133 天）。共同诉求：**更新链路事务性、进程生命周期守卫、跨平台/本地化测试** |
| **模型/Provider 配置精细化** | LobsterAI #2457 可配置思考级别、#2475 每模型独立；OpenClaw #68596 可配置流式 watchdog（长思维链模型）；NanoBot #5328 OrcaRouter 聚合网关；ZeroClaw #8603 OpenAI Chat Completions 兼容层。共同诉求：**长思维链适配、细粒度模型控制、兼容协议降低接入成本** |

---

## 5. 差异化定位分析

| 项目 | 目标用户 / 场景 | 核心架构 | 关键差异 |
|---|---|---|---|
| **OpenClaw** | 全渠道个人助手 / 团队中枢 | Monorepo + Gateway + 控制 UI | 渠道广度第一，社区规模最大；受困于历史包袱 |
| **Hermes Agent** | 桌面端重度用户（Windows/macOS） | 桌面应用 + 托管网关 + 多协议适配 | 微信/QQ/Telegram/飞书全渠道，桌面生命周期管理是当前软肋 |
| **IronClaw** | 云平台用户 / 开发者 | Reborn 架构：可插拔 agent loop + profile-agnostic 存储 | 架构最激进（ACP executor、内核化），Bug 响应速度最快 |
| **CoPaw** | Qwen 生态 / 中文用户 | Console + Provider 统一层 + 桌面端 | 中文 IME、公式渲染等本地化投入深；插件安全模型待补 |
| **NanoBot** | 轻量自托管用户 | 模块化 agent + WebUI + MCP | 安全审计积极，但对旧 PR 批量清理显示方向收缩 |
| **ZeroClaw** | Rust 技术栈 / 企业安全敏感用户 | RFC 驱动 + 安全策略管线 + 适配器模型 | 决策偏慢（1/50 合并率），但设计文档质量高 |
| **PicoClaw** | 树莓派 / 低资源边缘部署 | 轻量路由代理 + 多频道 | 硬件亲和性强，受限于审查带宽 |
| **NanoClaw** | MCP 重度用户 / agent 模板开发者 | MCP 统一基础设施 + 模板标准化 | 远程 MCP 覆盖最彻底，但规模小 |
| **LobsterAI** | 桌面协同办公（Cowork） | Electron 桌面 + 本地文件工作流 | 版本节奏稳定，Electron 升级是大版本风险点 |
| **Moltis** | 本地优先 / 隐私敏感个人用户 | 持久化连接器（CalDAV）+ 全文搜索 | 定位最"个人数据主权"，但几乎处于停滞评估期 |

---

## 6. 社区热度与成熟度

**第一梯队 · 快速迭代期**（日合并 25+，功能推进密集）：
- **OpenClaw** — 极大规模，功能与修复并行，但陷入"合并速度 vs 根治深度"的矛盾
- **IronClaw** — 迭代质量最健康：高严重度 bug 全部当日获得 fix PR，架构转型与稳定性修复双线推进
- **CoPaw** — 冲刺 v2.1.0 正式版，日关 13 issue + 25 PR，工程化成熟（自动发布验证），但安全漏洞（#6916）和中文 IME 崩溃需要尽快止血
- **Hermes Agent** — 合并量不高但 PR 队列 45 条，P1 桌面回归密集，属"高速但颠簸"

**第二梯队 · 质量巩固期**：
- **NanoBot** — 批量清理 119 条冲突 PR 属于主动收缩方向，安全审计积极但 1 个高危漏洞尚无 fix
- **ZeroClaw** — 处于架构决策窗口期：5 个 RFC 同步发酵，但 49/50 的 PR 滞留使实际交付滞后，社区已自建"维护者裁决队列"（#8692）
- **LobsterAI** — 稳定发布 2026.8.11，4 个月老 PR #1241 终于合入，进入体验打磨阶段

**第三梯队 · 稳步推进**：
- **NanoClaw**（MCP 功能完整度提升，但消息可靠性 bug 待响应）
- **PicoClaw**（修复类 PR 质量高，但 5/6 被标记 stale，存在被机器人自动关闭的风险）

**低频 / 停滞**：Moltis（仅 1 个重量级 PR 待评审）、NullClaw / ZeptoClaw（无活动）。

---

## 7. 值得关注的趋势信号

1. **消息可靠性正取代功能丰富度，成为智能体产品的第一信任指标。** OpenClaw silent reply 复发、NanoClaw 静默丢消息、Hermes 网关静默死亡——"无声失败"比报错更能摧毁用户信任。对开发者：**选型时优先考察项目的消息确认机制、失败可观测性和去重策略，而非仅看渠道数量。**

2. **Agent 安全从"配置校验"走向"运行时策略化"。** ZeroClaw 的 allow/ask/deny 命令策略、CoPaw 的插件权限模型、NanoBot 的命令白名单绕过修复、IronClaw 的密钥中介——安全边界正在向**可插拔沙箱、bounded delegation、审计内核**方向演进。这是企业级落地的入场券。

3. **Token 成本工程化成为竞争焦点。** Hermes 懒加载工具 Schema（18👍）、IronClaw 显式 cache_control 断点、ZeroClaw 成本管理 RFI、OpenClaw 流式 watchdog 配置——长思维链模型（DeepSeek-R1、kimi-k2.5）普及后，**"哪些 token 值得花"将是 agent 框架的核心差异化能力**。

4. **OpenAI 兼容层正在成为生态接入的"通用门票"。** ZeroClaw #8603 呼声极高（18 评论），NanoBot 加紧接入 OpenRouter/OrcaRouter，OpenClaw 已支持多模型别名。对工具链开发者：**优先实现/兼容 Chat Completions 协议，即可一次性接入 Open WebUI、LobeChat、Continue.dev 等生态。**

5. **MCP 正从"本地 stdio 协议"升级为"云端统一基础设施"。** NanoClaw 完成远程 Streamable HTTP MCP 全 provider 覆盖，CoPaw 增加 MCP 超时配置，NanoBot 修复 MCP 凭证覆盖——**远程 MCP + 凭证安全 + 超时治理**三者齐头并进，预示 MCP 生态将进入真正的云端爆发期。

6. **桌面端（尤其 Windows）是个人 Agent 落地的最短木板。** Hermes 一个版本引入 4 个桌面网关回归、CoPaw Windows 崩溃 + 中文 IME、LobsterAI 133 天未解的网关启动循环——**跨平台更新链路的事务性、进程生命周期守卫、本地化输入法兼容**是当前投入产出比最高的改进方向。

7. **架构重构进入集中期，但决策效率决定重构成败。** Hermes 启动 god-file 全面拆分（67 评论）、IronClaw 推进可插拔 agent loop、ZeroClaw 五路 RFC 并行、CoPaw 统一 Provider 层——**社区已从"功能竞争"转向"工程质量竞争"**。ZeroClaw 的 1/50 合并率警示：没有配套决策机制的架构升级，只会堆积更多积压。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-12

## 1. 今日速览
过去24小时项目收到 **140 条 PR 更新**（其中 119 条合并/关闭）、**6 条 Issue 更新**，整体活跃度处于高位。值得关注的是，119 条关闭 PR 中多数为 2-3 月创建的老旧 PR 被批量标记为 `[conflict]` 关闭，属于积压清理而非新功能合并；而真正的新增 PR 质量较高，集中在 **MCP 凭证安全、exec 进程树清理、WebUI 应用发现改版、重复工具调用检测**等方向。安全方面，2 个 API 密钥泄露相关 Issue 已关闭，但仍有 1 个 `exec.allowPatterns` 绕过漏洞处于打开状态。今日无新版本发布。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日无新功能被合并进主干，主要动作为**旧 PR 批量清理**。大量标注 `[conflict]` 的 PR（如 #2181 小米 MiMo 支持、#1367 kimi-coding 模型、#1321 Tavily 搜索、#1199 fallback 模型、#1114 cron 热重载、#1094 OpenCode Zen、#1020 Telegram 内联键盘等）在 8 月 12 日被统一关闭，说明维护者正在**收缩方向、清理与当前架构冲突的贡献**，这可能是为下一轮迭代做准备。

今日新提交的 PR 均在待合并状态，值得重点关注：

- [#5346 fix(exec): terminate one-shot process trees on cleanup](https://github.com/HKUDS/nanobot/pull/5346) — 修复超时/取消时子进程残留问题，完善进程树清理
- [#5344 fix(agent): warn instead of silently spiraling on repeated identical tool calls](https://github.com/HKUDS/nanobot/pull/5344) — 为重复相同工具调用增加告警，防止 agent 卡死
- [#5342 feat(webui): redesign apps discovery](https://github.com/HKUDS/nanobot/pull/5342) — 将 WebUI 应用页拆分为 Discover / Installed / All apps 三个视图，接入 nanobot.wiki 精选应用列表
- [#5338 fix(mcp): preserve credentials when OAuth store read fails](https://github.com/HKUDS/nanobot/pull/5338) — 防止 OAuth 凭证读取失败时被其他 server 覆盖

整体方向指向**稳定性、安全加固与 WebUI 体验**，但功能合并节奏在短期内有放缓迹象。

## 4. 社区热点
- **[#5327 [CLOSED] Nanobot 推理时重复多条相同消息](https://github.com/HKUDS/nanobot/issues/5327)** — 10 条评论，为今日最热 Issue。用户报告模型在推理过程中随机多次重复同一句话（如 "Good points, let me investigate the issue"），虽已关闭，但共鸣度较高，多名用户可能遇到类似现象。
- **[#5256 [OPEN] /goal 消息在等待用户回答时产生数十条重复回复](https://github.com/HKUDS/nanobot/issues/5256)** — 2 条评论，描述了 agent 在等待用户输入时陷入重复输出循环，直到用户介入或模型自我识别才停止。这一 Issue 与 #5327 共同指向 **agent 循环控制缺陷**，是当前社区最集中的痛点。
- **[#5342 [OPEN] WebUI 应用发现改版 PR](https://github.com/HKUDS/nanobot/pull/5342)** — 涉及 Discover / Installed / All apps 的交互重构，且引入了 registry 离线缓存，关注度较高，可能成为下一个 WebUI 版本的重要变化。

## 5. Bug 与稳定性
按严重程度排列：

**高危 — 安全漏洞**：
- [#5306 [OPEN] `exec.allowPatterns` shell-chain 绕过允许意外命令执行](https://github.com/HKUDS/nanobot/issues/5306) — 攻击者可利用 shell 链绕过配置的命令白名单，存在任意命令执行风险。目前无对应修复 PR，**需要优先处理**。

**中危 — 功能缺陷**：
- [#5256 [OPEN] /goal 消息产生数十条重复回复](https://github.com/HKUDS/nanobot/issues/5256) — 已有对应修复 PR [#5257 fix(agent): bound sustained-goal continuation when the turn goes idle](https://github.com/HKUDS/nanobot/pull/5257) 在审，值得跟进
- [#5327 [CLOSED] 推理时随机重复同一条消息](https://github.com/HKUDS/nanobot/issues/5327) — 已关闭，但未看到明确修复说明，建议关注是否真正根治

**低危 — 已在 PR 中修复**：
- [#5346 exec 进程树清理](https://github.com/HKUDS/nanobot/pull/5346) — 超时/取消后子进程残留
- [#5344 重复工具调用静默空转](https://github.com/HKUDS/nanobot/pull/5344) — 无提示的迭代浪费
- [#5341 天气技能在 Windows PowerShell 下 curl 兼容性](https://github.com/HKUDS/nanobot/pull/5341) — 环境兼容问题

## 6. 功能请求与路线图信号
- **[#5333 [CLOSED] OpenRouter 支持 Server Tools](https://github.com/HKUDS/nanobot/issues/5333)** — 用户请求支持 Web Search、Web Fetch、Fusion 等服务端工具，虽已关闭，但结合近期动态，网关类 provider 的支持力度在加强
- **[#5328 [OPEN] 新增 OrcaRouter 网关 provider](https://github.com/HKUDS/nanobot/pull/5328)** — 150+ 模型聚合、零信任安全网关，表明项目在**聚合网关方向持续扩展**
- **[#5283 [OPEN] 非 WebUI 渠道 per-session 沙箱隔离](https://github.com/HKUDS/nanobot/pull/5283)** — 为每个会话提供独立文件系统沙箱，是安全模型的重要增强信号
- **[#4291 [OPEN] 子代理可配置模型预设](https://github.com/HKUDS/nanobot/pull/4291)** — 允许 spawn 子代理时选择不同模型，可能纳入后续版本

路线图判断：近期合并方向可能围绕 **provider 生态扩展**（OpenRouter 工具、OrcaRouter 等）和 **agent 安全边界加固**（沙箱、凭证隔离）。

## 7. 用户反馈摘要
- **循环重复是最痛点**：多个用户报告 agent 在无进展时反复输出相似内容（#5327、#5256），影响可用性和对模型的信任感。社区期待更智能的循环检测与中断机制。
- **安全审计积极**：用户 `hamb1y` 连续提交 2 个 API 密钥环境变量泄露 Issue（#4784、#4783），说明用户正在对代码做安全审计，且都已被确认关闭，反映项目对安全问题响应及时。
- **Windows 用户体验待改善**：天气技能在 Windows 下的 `curl` 别名问题（#5341）虽小但真实存在，反映了跨平台测试覆盖不足。
- **新用户对项目认可度高**：#5333 用户开头即表达对项目的感谢，但由于 OpenRouter server tools 未获支持，最终被关闭，可能造成一定失望。

## 8. 待处理积压
需要维护者关注的长尾项：

- **[#5306 exec.allowPatterns 绕过漏洞](https://github.com/HKUDS/nanobot/issues/5306)** — 安全高危，8/9 提出，仅 1 条评论，无 fix PR，**建议优先响应**
- **[#4291 子代理模型预设](https://github.com/HKUDS/nanobot/pull/4291)** — 6/11 提出，至今 2 个月未合并/关闭，处于悬置状态
- **[#4145 天气技能多文件贡献](https://github.com/HKUDS/nanobot/pull/4145)** — 6/1 提出，与 #5341 的 Windows 修复存在关联，建议统一处理
- **约 117 条 `[conflict]` 标签 PR 批量关闭** — 虽已清理，但反映出贡献指南不够清晰导致大量无效 PR。建议考虑更新 contributor guide，明确当前不接受的方向，从源头减少维护负担。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-12

## 1. 今日速览

过去24小时项目保持高强度活跃：共产生50条Issue更新和50条PR更新，其中新开/活跃Issue 48条、待合并PR 45条，创近期单日新高。当前最突出的问题是**跨平台桌面端与网关生命周期管理**——Windows/macOS 上连续出现4个P1级回归（#83683、#83562、#84185、#84200），均与桌面应用重启/更新杀网关有关，且其中2个已有对应修复PR。此外，会话持久化重构（d2a4d373eb）引入的“重置后会话不可见”回归（#84109）系波及面较广的功能性回归，已有修复PR提交。整体而言，项目迭代速度快、社区反馈活跃，但稳定性相关回归的密度值得关注。

---

## 2. 版本发布

过去24小时内无新版本发布。上次已知版本为 v0.20.0（2026-08-03）。多个P1级Bug（#83683、#84185、#84200）指向该版本在桌面端网关生命周期管理上存在较明显回退，建议维护团队评估v0.20.1补丁版本的优先级。

---

## 3. 项目进展

今天合并/关闭的PR较少（5条），但两个已关闭条目均有明确意义：

**🔒 已合并/关闭 PR**

| PR | 内容 | 意义 |
|---|---|---|
| [#84019](https://github.com/NousResearch/hermes-agent/pull/84019) `[CLOSED]` | video_analyze 失败后停止自动重试，将失败标记为不可重试并阻塞后续重复调用 | 修掉了视频分析在终态失败后仍发起第二次付费模型请求的成本浪费问题。适用于 Docker/远程执行场景，直接降低用户额外花费 |
| [#62058](https://github.com/NousResearch/hermes-agent/pull/62058) `[CLOSED]` | Dashboard Chat 页面切换会话时轮换 PTY attach token | 修复了切换会话后终端显示空白历史的问题。此PR从7月10日持续到今天关闭，属Web端会话安全与体验的重要收尾 |

**📊 待合并 PR 中的关键推进**

- [#83720](https://github.com/NousResearch/hermes-agent/pull/83720)（P1）：修复桌面端重启即杀网关且不重启的回归（#83683），在桌面端（重新）启动时不再回收受监管网关。这是当前最高优先级修复之一
- [#84198](https://github.com/NousResearch/hermes-agent/pull/84198)（P2）：修复 #84109——会话重置后创建的会话在侧边栏/API/选择器中全部不可见。直接回应 d2a4d373eb 引入的list_session可见性回归
- [#84199](https://github.com/NousResearch/hermes-agent/pull/84199)（P2，安全）：模型别名现在会读取属于自己的api_key，同时阻止跨provider的密钥泄露（修 #83612）
- [#84203](https://github.com/NousResearch/hermes-agent/pull/84203)（P2，安全）：封堵网关生命周期守卫的2个绕过漏洞并修复1个误报

**评述：** 今日合并量虽少，但多条高价值修复已进入待合并队列（45条），一旦合入将显著改善桌面端稳定性、会话一致性和安全边界。

---

## 4. 社区热点

**🔥 今日讨论热度 Top 3（均与架构决策相关）**

### [#78647 — Epic: 拆分全部20个god文件](https://github.com/NousResearch/hermes-agent/issues/78647) · 67条评论 · 创建于08-04，更新于08-12

仓库级重构史诗任务，要求将所有god-file拆分为干净模块，且明确写有“拆分后不得回退”的硬性政策。社区讨论持续发酵一周多，说明开发者对代码可维护性的关注度极高，且已形成一定的“拆分为荣、god-file为耻”的共识氛围。

### [#6839 — 懒加载工具Schema（两阶段工具注入）](https://github.com/NousResearch/hermes-agent/issues/6839) · 38条评论 · 👍 18 · 创建于04-09，更新于08-12

这是长期高赞需求：当前每次API调用都注入全部工具schema，50+工具共消耗约3500-5000 tokens/次，本地模型尤甚。社区对这个优化的渴求由来已久（4个月未关闭），👍 18是当前Issue中最高的。它直接关系到用户的token成本和本地模型的可用性。

### [#34352 — 解决多租户Hermes问题](https://github.com/NousResearch/hermes-agent/issues/34352) · 25条评论 · 👍 3 · 创建于05-29，更新于08-12

提案者声称已生产运行多租户修复数月，核心痛点是内存操作绕过hook系统导致租户隔离无法实现。这暗示部分用户正在将Hermes用作多智能体/多人协作的基座，而不仅是个人助手——这是重要的路线图信号。

**分析：** 三项热点分别对应**代码可维护性**、**成本优化**、**多租户架构**，说明社区已从“功能够不够用”阶段逐渐转向“工程质量和规模化”阶段。

---

## 5. Bug 与稳定性

过去24小时Bug类Issue密集，按严重程度排列如下：

### 🔴 P1 级（服务不可用 / 严重回归）

| Issue | 描述 | 已有fix PR？ |
|---|---|---|
| [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) | **Windows**：桌面应用重启强制杀死网关且不再拉起，WeChat/QQ/Telegram全静默。0.20.0回归 | ✅ [#83720](https://github.com/NousResearch/hermes-agent/pull/83720) |
| [#84109](https://github.com/NousResearch/hermes-agent/issues/84109) | 会话重置后创建的新会话在所有会话列表中不可见。d2a4d373eb 引入的回归 | ✅ [#84198](https://github.com/NousResearch/hermes-agent/pull/84198) |
| [#83562](https://github.com/NousResearch/hermes-agent/issues/83562) | **Windows**：桌面更新后，后端手动运行正常但Desktop UI报“Hermes backend exited (0)” | ❌ 暂无（Repair install也无效） |
| [#84185](https://github.com/NousResearch/hermes-agent/issues/84185) | **Windows**：`hermes update` 后冷启动的网关进程静默死亡，无日志、无PID文件，离线直到手动重启 | ❌ 暂无 |
| [#84200](https://github.com/NousResearch/hermes-agent/issues/84200) | **macOS**：桌面后端启动时SIGTERM掉launchd管理的网关（#77276系列提交引入） | ❌ 暂无 |

### 🟠 P2 级（功能异常 / 特定场景阻断）

| Issue | 描述 |
|---|---|
| [#83213](https://github.com/NousResearch/hermes-agent/issues/83213) | 后台进程完成通知在 `/new` 后被投递到错误的会话 |
| [#73779](https://github.com/NousResearch/hermes-agent/issues/73779) | 飞书多路复用模式下 lark_oapi WebSocket 因“Future attached to a different loop”崩溃，网关静默断收 |
| [#83427](https://github.com/NousResearch/hermes-agent/issues/83427) | browser_exec 因 PYTHONPATH 指向 Hermes venv 导致 pydantic_core ModuleNotFoundError |
| [#83448](https://github.com/NousResearch/hermes-agent/issues/83448) | `hermes kanban show` 文本模式在数据库关闭后查询任务图 —— sqlite3.ProgrammingError（已有PR [#83645](https://github.com/NousResearch/hermes-agent/pull/83645) 修复同类blocker判定问题） |
| [#84102](https://github.com/NousResearch/hermes-agent/issues/84102) | 本地 TTS 将 Ogg/Vorbis 写入 .ogg 路径，导致平台语音气泡静默降级 |
| [#84171](https://github.com/NousResearch/hermes-agent/issues/84171) | webhook `--deliver telegram/all` 静默不投递，仅 origin 生效 |
| [#82846](https://github.com/NousResearch/hermes-agent/issues/82846) | 智能审批辅助LLM调用无超时，供应商响应卡死会无限期阻塞整个会话 |
| [#81410](https://github.com/NousResearch/hermes-agent/issues/81410) | v0.20.0 单进程Nous OAuth刷新返回 invalid_grant（排除并发竞争） |

### 🟡 P3 级（体验问题 / 低危）

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) 技能索引过期（29.8h 超过26h阈值），属于自动化巡检失败
- [#57540](https://github.com/NousResearch/hermes-agent/issues/57540) 桌面端将显式 text/plain 围栏内容误判为散文，渲染出可见的 `text` 语言标识
- [#80016](https://github.com/NousResearch/hermes-agent/issues/80016) Email适配器吞掉所有IMAP拉取错误，永远不触发 fatal-error/重连逻辑
- [#29590](https://github.com/NousResearch/hermes-agent/issues/29590) vision_tools.py 硬编码 max_tokens=2000 和冗长prompt，对推理模型造成严重延迟

**趋势观察：** 今日P1级Bug高度集中在**桌面端 × 更新/重启 × 网关生命周期**这个交叉点上，Windows 4个、macOS 1个。外加多个与更新相关的Windows老问题（#63717、#68760、#82186、#62792）持续未关闭，说明**跨平台桌面端稳定性是当前项目最大的薄弱环节**。

---

## 6. 功能请求与路线图信号

### 高潜力（已有对应PR，有望进入下一版本）

| Issue/PR | 内容 | 信号 |
|---|---|---|
| [#84202](https://github.com/NousResearch/hermes-agent/pull/84202) | **OneBot 11平台适配器**（NapCat / Lagrange / LLOneBot / go-cqhttp），通过WebSocket连QQ | 社区对非官方QQ协议接入的需求被证实，这大概率进下一版 |
| [#84196](https://github.com/NousResearch/hermes-agent/pull/84196) | **WhatsApp 限定所有者命令入口**（默认关闭，self-chat模式下仅转发 fromMe 精确命令） | 扩展WhatsApp可用性同时守住安全边界 |
| [#84192](https://github.com/NousResearch/hermes-agent/pull/84192) | **桌面端富插件通知**：支持图标、操作按钮、deeplink激活回调 | 推进插件生态的OS级交互能力 |
| [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) | **懒加载工具Schema两阶段注入**，省3500-5000 tokens/次 | 高赞需求（👍18），若实现将是成本体验双提升 |
| [#83244](https://github.com/NousResearch/hermes-agent/issues/83244) | **Google Antigravity 作为一等OAuth provider**（暴露Claude Sonnet/Opus 4.6等） | 模型聚合方向的新选择，需关注授权可行性 |

### 长期路线图信号

- **多租户/多人协作**（#34352）：已有生产用户自定义修复，说明架构层面需要正式支持
- **God-file大规模拆分**（#78647）：仓库级重构已成既定政策，这会是未来数周PR的持续主题

---

## 7. 用户反馈摘要

- **“更新即受伤”——Windows 更新链路的系统性挫败感。** 用户 alainmfatwahe-cpu 在 [#63717](https://github.com/NousResearch/hermes-agent/issues/63717) 中详细记录了3周内7个相互关联的根因；#68760 遭遇 `WinError 32` 文件占用、#82186 遭遇 `WinError 5` 权限拒绝、#83562 更新后Desktop无法拉起后端。多位用户明确表达了“每次更新都担心坏掉”的焦虑。#62792 从根源上指出 `.pyd` 文件锁是元凶，但该PR至今仍未合并。
- **“网关就是我们与世界的连接，静默死亡是最不能接受的。** ” #83683 的用户描述微信/QQ/Telegram全静默、直到手动重启才恢复，情绪强烈；#84185 中用户强调进程“没有日志、没有PID、没有退出记录”——这种无迹可循的静默失败比报错更让人崩溃。
- **“新会话不见了，我以为我的聊天记录丢了。”** #84109 的用户在会话重置后找不到新建会话，这种“数据消失感”会直接动摇用户信任。好在修复PR(#84198)已在当天提交。
- **“设置里根本没有NeuTTS可选”**，#84034 的报错显示了配置选项与文档不一致的体验裂缝；#84102 中用户敏锐地指出ffmpeg裸调用默认输出Vorbis而非常见的Opus，体现用户技术栈扎实，对细节有较高要求。
- **本地模型用户持续呼吁减少token开销**（#6839），这也是当前成本敏感时代下社区最一致的声音。

---

## 8. 待处理积压

### 长期未关闭的重要Issue（超30天未解决）

| Issue | 创建时间 | 说明 |
|---|---|---|
| [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) | 2026-04-09 | 懒加载工具Schema，4个月+，👍 18，仍是open且无assignee |
| [#34352](https://github.com/NousResearch/hermes-agent/issues/34352) | 2026-05-29 | 多租户Hermes方案，厂商已有生产级修复但主仓未动，讨论2.5个月 |
| [#29590](https://github.com/NousResearch/hermes-agent/issues/29590) | 2026-05-21 | vision_tools.py 硬编码max_tokens导致推理模型严重延迟，近3个月 |
| [#63717](https://github.com/NousResearch/hermes-agent/issues/63717) | 2026-07-13 | Windows桌面更新失败综合诊断（7个相关根因），30天+ |

### 滞留超过1个月的待合并PR（缺少review/ci）

| PR | 创建时间 | 阻塞可能原因 |
|---|---|---|
| [#56467](https://github.com/NousResearch/hermes-agent/pull/56467) | 2026-07-01 | 将Homebrew/Linuxbrew路径注入服务PATH，解决cron找不到gh/jq/ffmpeg的问题。40天+未合并，改动小但涉及服务启动路径，可能需要安全review |
| [#56833](https://github.com/NousResearch/hermes-agent/pull/56833) | 2026-07-02 | 软化MCP断路器错误文案，避免模型过度遵循“不要重试”的指令。40天+，属prompt工程类小改动 |
| [#68908](https://github.com/NousResearch/hermes-agent/pull/68908) | 2026-07-21 | 全息记忆跨会话hrr_dim漂移修复，修了8处bytes_to_phases()未做维度守卫的问题 |
| [#69076](https://github.com/NousResearch/hermes-agent/pull/69076) | 2026-07-22 | Windows下shell子进程孤儿化，用Job Object保证kill-on-exit |
| [#68948](https://github.com/NousResearch/hermes-agent/pull/68948) | 2026-07-21 | 废弃compound-background rewriter，将#71008的进程层修复扩展到Windows |

**提醒：** 多个Windows修复（#69076、#68948、#62792对应的PR、#56467）在队列中停留已久，而Windows相关Bug恰恰是今天P1的主力来源。优先review和合并这批Windows专项修复，可能大幅缓解当前最集中的用户抱怨。

---

**编制说明：** 本日报基于2026-08-12 GitHub公开数据生成。所有链接均为真实Issue/PR编号对应的GitHub地址。项目整体活跃度高、社区参与质量好，但稳定性回归的速度和跨平台问题的堆积值得维护团队在下一个版本周期优先处理。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报

**日期：2026-08-12**

## 1. 今日速览

过去 24 小时，PicoClaw 共有 3 条 Issue 更新（2 条活跃、1 条关闭）、6 条 PR 更新（全部待合并），无新版本发布。期间最大亮点是 Issue [#3328](https://github.com/sipeed/picoclaw/issues/3328)（LINE webhook 配置声明但无消费者）在当日即收到修复 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329)，社区响应节奏高效。同时需关注：6 个待合并 PR 中已有 5 个被打上 **[stale]** 标记，最老 PR [#3299](https://github.com/sipeed/picoclaw/pull/3299) 已开放 17 天。项目整体活跃度中等，外部贡献持续活跃，但 PR 审查/合并进度成为当前主要瓶颈。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日 **无 PR 被合并或关闭**，主线合并进度为零。但以下关键 PR 处于推进和待合并状态：

- **[#3329](https://github.com/sipeed/picoclaw/pull/3329) fix(line): warn on inert webhook_host / webhook_port**（新增）——修复 LINE 渠道 `webhook_host`/`webhook_port` 配置声明但未消费的问题，改为显式警告。直接回应 Issue [#3328](https://github.com/sipeed/picoclaw/issues/3328)。
- **[#3316](https://github.com/sipeed/picoclaw/pull/3316) fix: routed-agent context management** ——修复 dispatch rules 场景下历史记录、总结、自动压缩、seahorse bootstrap 全部失效的缺陷，关联核心 Bug [#3301](https://github.com/sipeed/picoclaw/issues/3301)，已待合并 9 天。
- **[#3314](https://github.com/sipeed/picoclaw/pull/3314) fix: customAllowPatterns 权限修复**——修复 exec 默认 deny 规则优先级高于自定义 allow 规则的问题（影响 `git push` 等命令）。
- **[#3315](https://github.com/sipeed/picoclaw/pull/3315) feat: Telegram 私有聊天主题支持**、**[#3317](https://github.com/sipeed/picoclaw/pull/3317) feat: 日志记录 prompt cache tokens**、**[#3299](https://github.com/sipeed/picoclaw/pull/3299) feat: Exa 搜索 provider** 均处于待合并状态。

若上述 PR 顺利合入，将一次性解决路由代理上下文连续性与 LINE 配置无效两个已知问题，并为下一版本加入 Telegram 主题支持和新的搜索 provider。

---

## 4. 社区热点

- **[Issue #3301](https://github.com/sipeed/picoclaw/issues/3301) 路由代理会话上下文完全丢失**（3 条评论，已活跃 14 天）——用户 j-v 在 Raspberry Pi + DeepSeek + Discord/Telegram 环境中复现：通过 dispatch rules 路由的 agent 不记忆任何历史消息，`/clear` 失效且自动压缩从不触发。该议题获得贡献者 j-v 本人提交的 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 直接修复，说明该问题在真实多频道场景中的高触发率。
- **[Issue #3294](https://github.com/sipeed/picoclaw/issues/3294) `/list models` 输出不完整**（3 条评论，已关闭）——用户 2suige-coder 期望命令列出 `model_list` 中全部配置模型，而实际仅显示当前模型。该 Issue 最终被标记 **[stale]** 并由机器人关闭，但暴露的功能缺陷仍未修复。
- **[Issue #3328](https://github.com/sipeed/picoclaw/issues/3328) LINE webhook 配置项无人消费**（新开，0 条评论）——qing-wang 精准定位到 `pkg/config/config.go:606` 处配置声明，指出其“默认值 + 文档 + 环境绑定”三者齐备，但全代码库无读取路径，属于典型文档与实现脱节问题。

---

## 5. Bug 与稳定性

| 严重度 | 编号 | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | 路由代理的会话历史、/clear、自动压缩全部失效，核心对话记忆功能不可用 | 已有修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 待合并 |
| 🟡 中 | [#3328](https://github.com/sipeed/picoclaw/issues/3328) | `line.settings.webhook_host` / `webhook_port` 声明但无消费，用户配置无任何效果或提示 | 已有修复 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329) 当日提交 |
| 🟢 低 | [#3294](https://github.com/sipeed/picoclaw/issues/3294) | `/list models` 仅显示当前模型而非全部配置 | 已关闭（stale），无修复 PR |

**整体评估**：两个 Open Bug 均有对应修复 PR，风险面可控，当前取决于维护者的合并速度。

---

## 6. 功能请求与路线图信号

- **[PR #3315](https://github.com/sipeed/picoclaw/pull/3315) Telegram 私有聊天主题支持**：为启用了 forum 主题模式的私有 bot 聊天补充 `IsTopicMessage` 判断，补全 Telegram 消息类型覆盖。符合 Telegram 生态演进方向。
- **[PR #3317](https://github.com/sipeed/picoclaw/pull/3317) LLM 响应日志记录 prompt cache tokens**：在调试日志中输出 `prompt_cache_hit_tokens` 等元数据，帮助通过 Cloudflare AI Gateway 等代理使用 DeepSeek 的用户细化成本调优。
- **[PR #3299](https://github.com/sipeed/picoclaw/pull/3299) 原生 Exa 搜索 provider**：新增 `tools.web` / `web_search` 的 Exa 实现，支持 `d/w/m/y` 时间范围过滤。该 PR 已开放 17 天，若合入将使 PicoClaw 多一个海外搜索源选项。

这些 PR 分别指向**多消息平台覆盖、可观测性、搜索源多样化**三个方向，可作为下一版本的内容参考。

---

## 7. 用户反馈摘要

- **路由配置 + 多频道用户对会话记忆高度依赖**——来自 [#3301](https://github.com/sipeed/picoclaw/issues/3301) 的现场反馈：在 Discord/Telegram 频道中通过 dispatch rules 使用 agent 时，跨消息记忆消失直接导致对话不可用。用户 j-v 同时自行完成修复并提出 PR，说明该场景有实际项目落地价值。
- **多模型管理是真实工作流需求**——[#3294](https://github.com/sipeed/picoclaw/issues/3294) 表明用户会在 `model_list` 中配置多个模型，期望 `/list models` 像其命令描述一样列出全部配置，而非只展示当前模型。
- **配置项应"要么生效，要么有警告"**——[#3328](https://github.com/sipeed/picoclaw/issues/3328) 中，用户对照文档和代码发现 LINE webhook 配置完全无效且无提示，反映出用户对配置项可观测性有明确期待。

---

## 8. 待处理积压

- **6 个 PR 全部处于待合并，其中 5 个被标记 [stale]**：包括 [#3316](https://github.com/sipeed/picoclaw/pull/3316)（路由上下文修复）、[#3314](https://github.com/sipeed/picoclaw/pull/3314)（权限修复）、[#3315](https://github.com/sipeed/picoclaw/pull/3315)（Telegram 主题）、[#3317](https://github.com/sipeed/picoclaw/pull/3317)（缓存日志）、[#3299](https://github.com/sipeed/picoclaw/pull/3299)（Exa 搜索）。其中 **#3299 已开放 17 天**，按 stale 机制存在被机器人自动关闭的风险。建议维护者优先审查 **[#3314](https://github.com/sipeed/picoclaw/pull/3314) 与 [#3316](https://github.com/sipeed/picoclaw/pull/3316) 两个修复类 PR**，及时合入锁死对应 Bug。
- **Issue [#3301](https://github.com/sipeed/picoclaw/issues/3301) 已持续 open 14 天**，需在 PR #3316 合入后立即关闭。
- **Issue [#3328](https://github.com/sipeed/picoclaw/issues/3328)** 待 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329) 合并后关闭，形成当日提交、当日响应的高效闭环。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-08-12）

> 数据窗口：2026-08-11 ~ 2026-08-12 | 数据源：GitHub（qwibitai/nanoclaw）

## 今日速览

过去 24 小时 NanoClaw 保持中等偏活跃的协作节奏：新增/更新 Issue 1 条、PR 更新 8 条、无新版本发布。核心进展集中在 MCP（Model Context Protocol）接入能力上——远程 Streamable HTTP MCP 支持在引擎层与 codex/opencode provider 侧同时收尾（[#3092](https://github.com/qwibitai/nanoclaw/pull/3092)、[#3221](https://github.com/qwibitai/nanoclaw/pull/3221)），Tavily 搜索工具 skill 合入（[#3190](https://github.com/qwibitai/nanoclaw/pull/3190)）。与此同时，一条关于“平台复用 message id 导致入站消息被静默丢弃”的 Issue（[#3226](https://github.com/qwibitai/nanoclaw/issues/3226)）被报告，指向消息可靠性的隐患，值得维护者优先关注。整体项目健康度良好，但长期积压 PR（如 [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) 已停滞超 100 天）仍值得留意。

## 项目进展

过去 24 小时有 3 个 PR 进入关闭/合并状态，均在功能推进上有明确价值：

- **[#3092 feat: support remote Streamable HTTP MCP servers](https://github.com/qwibitai/nanoclaw/pull/3092)**（core-team）  
  引擎层与 Claude provider 现已支持 `mcpServers` 中的 `{ type: 'http', url }` 远程 MCP 配置，NanoClaw 不再局限于本地 stdio 型 MCP 服务器，向“云端 MCP 生态”迈出关键一步。

- **[#3221 feat(providers): remote Streamable HTTP MCP servers for codex and opencode](https://github.com/qwibitai/nanoclaw/pull/3221)**（core-team）  
  将 [#3092](https://github.com/qwibitai/nanoclaw/pull/3092) 的远程 MCP 能力补齐到 codex 与 opencode provider，避免 http 配置到达这两个后端时在 config-write 阶段抛错。至此，远程 MCP 支持已覆盖主要 provider。

- **[#3190 feat: add Tavily MCP tool skill](https://github.com/qwibitai/nanoclaw/pull/3190)**（community）  
  新增 Tavily 搜索工具 skill，按 utility skill 规范放置在 `.claude/skills/` 目录，丰富 agent 可用的工具生态。

这三项合并共同指向一个信号：**NanoClaw 正将“远程 MCP 接入”从单点能力扩展为跨 provider 的统一基础设施**，MCP 相关 feature 的完整度在近两周明显提升。

## 社区热点

今日最值得关注的讨论来自 Issue **[#3226 Inbound messages silently dropped when a platform reuses a message id](https://github.com/qwibitai/nanoclaw/issues/3226)**（作者：dweekly，创建 2026-08-10，更新 2026-08-11，当前评论 1 条）。

虽然评论数量不高，但该 Issue 直击“消息到达率与用户信任”这一核心问题：当消息平台在同一会话中复用了历史 message id，入站消息会被去重逻辑静默丢弃，用户侧看不到任何错误提示，表现得就像“agent 无视了我”。这类问题在 AI 助手类产品中影响极大——一次无声消息丢失就可能让用户误判产品失效。考虑到消息传输链路是 NanoClaw 的命脉，该 Issue 有潜力成为本周社区关注焦点，建议维护者尽快给出响应方案。

## Bug 与稳定性

按严重程度排列：

1. 🔴 **高 | 入站消息被静默丢弃**（[#3226](https://github.com/qwibitai/nanoclaw/issues/3226)）  
   触发条件：平台在同一 session 中复用之前用过的 message id 时，新消息不进入 agent 且无任何可见提示。目前尚无对应 fix PR，风险评估为“影响核心消息链路 + 用户无感知”，建议优先处理。

2. 🟠 **中 | 升级流程不具备事务性**（[#3195](https://github.com/qwibitai/nanoclaw/pull/3195)，OPEN）  
   修复类 PR，目标是让 NanoClaw 升级要么完整成功、要么安全回滚，避免升级中断导致的半更新状态。目前仍在待合并队列。

3. 🟠 **中 | 存量 wirings 缺少 channel destination**（[#3145](https://github.com/qwibitai/nanoclaw/pull/3145)，OPEN）  
   通过迁移 021 为已有 messaging-group wirings 补齐 destinations，保留自定义本地名称，存量数据兼容性修复。目前待 review。

4. 🟡 **低 | Apple Silicon + Colima 开发环境修复**（[#2134](https://github.com/qwibitai/nanoclaw/pull/2134)，OPEN）  
   在 launchd plist 中补充 Apple Silicon/Colima 所需环境变量，属于开发者体验修复，不直接影响生产链路。已存在超 100 天未合并。

## 功能请求与路线图信号

- **Agent 模板 → Agent Plugins 1.0.0 格式迁移**（[#3220](https://github.com/qwibitai/nanoclaw/pull/3220)）  
  这是一个带有安全加固性质的模板引擎变更（stamp-time symlink/caps/secret hardening），同时将模板升级为“Agent Plugins 1.0.0 目录”格式。结合同系列 PR [#2909](https://github.com/qwibitai/nanoclaw/pull/2909)（模板设置向导 + first-agent stamping），可以判断 **agent 模板生态正在经历一次有计划的格式标准化**，极有可能进入下一版本。

- **远程 MCP 服务器支持成为明确路线图项**（[#3092](https://github.com/qwibitai/nanoclaw/pull/3092)、[#3221](https://github.com/qwibitai/nanoclaw/pull/3221)）  
  两项 PR 相继合入后，NanoClaw 已具备完整的远程 Streamable HTTP MCP 接入能力。后续可以期待更丰富的 MCP 云端服务生态接入。

- **社区围绕 MCP 生态持续贡献工具**（[#3190 Tavily MCP tool skill](https://github.com/qwibitai/nanoclaw/pull/3190)）  
  说明外部开发者已开始基于 NanoClaw 的 skills 机制提交 MCP 工具，MCP 方向的社区热度正在上升。

## 用户反馈摘要

来自 Issue [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) 的用户描述，可提炼出以下真实痛点：

- **核心痛点：消息无声丢失，用户误判为“agent 已读不回”。** 平台复用 message id 时，消息既不进入 agent，也不产生任何用户可见的错误提示，从用户视角与产品故障完全无法区分。
- **使用场景：** 用户通过消息平台与 agent 进行多轮对话，消息平台由于重试或会话同步机制复用了历史 message id。
- **期望行为：** 至少应保留一条可见错误/日志，或者结合内容哈希、时间戳等手段做更健壮的去重判断，而不是无条件丢弃。
- **潜在影响：** 信任损伤。用户会认为 agent“无视”或“变笨”，这对 AI 助手产品的口碑伤害远大于一次普通 bug。

## 待处理积压

以下 PR/Issue 长期未获得合入或官方响应，建议维护者重点关注：

| 编号 | 标题 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#2134](https://github.com/qwibitai/nanoclaw/pull/2134) | fix(setup): include Apple Silicon + Colima env vars in launchd plist | 2026-04-29 | OPEN | 已搁置超 100 天，影响 macOS 开发环境体验 |
| [#2909](https://github.com/qwibitai/nanoclaw/pull/2909) | feat(setup): template setup flow in the wizard and first-agent stamping | 2026-07-02 | OPEN | core-team，与 [#3220](https://github.com/qwibitai/nanoclaw/pull/3220) 强关联，等待合入 |
| [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) | fix(db): backfill destinations for existing wirings | 2026-07-28 | OPEN | 修复类 PR，存量数据兼容性，等待 review |
| [#3195](https://github.com/qwibitai/nanoclaw/pull/3195) | fix(update): make NanoClaw upgrades transactional | 2026-08-06 | OPEN | 升级稳定性相关，建议优先评估 |
| [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) | Inbound messages silently dropped when a platform reuses a message id | 2026-08-10 | OPEN | 核心链路 bug，暂无 fix PR，建议尽快响应 |

---

**总结**：NanoClaw 今日在 MCP 远程化能力上完成重要闭环，社区贡献活跃，项目整体处于稳步迭代状态。但消息静默丢失问题（[#3226](https://github.com/qwibitai/nanoclaw/issues/3226)）和多个修复类 PR 的长期积压，是当前最需要关注的两项健康度风险。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

IronClaw 项目今日保持高强度迭代节奏：过去 24 小时内有 **22 条 Issue 更新**（13 条活跃、9 条关闭）和 **50 条 PR 更新**（25 条待合并、25 条已合并/关闭），无新版本发布。核心工作集中在 **Reborn 架构转型**（pluggable agent loops、profile-agnostic 存储、统一 channel 模型）与 **循环稳定性修复**（上下文窗口驱逐、token 估算、no-progress 误报）两大主线，同时 WebUI 与第三方集成（Slack/Telegram/GitHub）也有持续产出。值得关注的是，多个高优先级 bug（#7484、#7505、#6984）均已在一日内获得对应 fix PR，反映出维护团队响应速度极快，项目整体健康度良好。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日多条大型 PR 被合并或关闭，项目建设明显提速：

- **#6997** `feat(llm): explicit Anthropic cache_control breakpoints on both transports` — 已合并，关闭 #6984。为 rig 适配器和 OAuth 传输通道均添加了显式 `cache_control` 断点，不再依赖 Anthropic 自动缓存，属 pi-harness 采用计划（P0 #1）的关键交付。 🔗 https://github.com/nearai/ironclaw/pull/6997
- **#7503** `fix(loop): retain accepted task across context eviction` — 已合并，针对 #7484。修复 128 条消息截断时静默丢失用户任务的问题，改为精确固定已接受任务并抛出 `BudgetExceeded` 而非静默丢弃。 🔗 https://github.com/nearai/ironclaw/pull/7503
- **#7471** `fix(processes): lease expiry recovers safe runs instead of failing them` — 已合并。隔离进程日志心跳池与数据面 PostgreSQL 流量，并在安全检查点恢复过期的运行，有效提升长时间运行任务的容错能力。 🔗 https://github.com/nearai/ironclaw/pull/7471
- **#7470** `fix(threads): restore listability for unprojected thread index rows` — 已合并。修复侧边栏线程列表缺失部分线程的问题，恢复了持久化但缺少投影元数据的线程的可见性。 🔗 https://github.com/nearai/ironclaw/pull/7470
- **#7514** `fix: enable Railway shell for hosted volume profile` — 已合并。为 Railway 托管卷新增沙箱 shell 支持，并加入严格 release-only 开关。 🔗 https://github.com/nearai/ironclaw/pull/7514
- **#7480** `fix(webui): reveal long conversation titles on hover` — 已合并，关闭 #7481。新增 `MarqueeText` 组件，溢出时悬停滚动显示完整标题。 🔗 https://github.com/nearai/ironclaw/pull/7480

## 4. 社区热点

今日讨论最集中的是 **#7482**（3 条评论），这是一个高风险的史诗级 Issue：

- **#7482** `Epic: Pluggable agent loops — ACP executor, edge credential injection, kernel architecture` — 提出将 IronClaw 转型为"内核"架构：只负责调度、租约、能力边界、密钥中介、出口边界和审计，而把 agent loop 和每个集成的工具代码全部外部化为"开箱即用的 ACP agents"。这实际上是当前 Reborn 架构方向的顶层设计文档，讨论热度最高反映了社区对项目架构走向的关注。 🔗 https://github.com/nearai/ironclaw/issues/7482

此外 **#7405**（2 条评论，已关闭）围绕 deferred tool discovery 的签名完整性和命令空间感知目录预览，说明大型工具库场景下的模型调用效率是开发者关注重点。 🔗 https://github.com/nearai/ironclaw/issues/7405

## 5. Bug 与稳定性

按严重程度排列：

**高严重度（有配套修复）：**

- **#7484** `[OPEN]` context window 静默驱逐任务 — 用户任务可能被 128 条消息上限静默丢弃。已有 **#7503**（已合并）和 **#7504**（待合并，引入压缩而非丢弃）双重修复。 🔗 https://github.com/nearai/ironclaw/issues/7484
- **#7485** `[OPEN]` token 估算器双倍计数 ASCII，实际上下文窗口减半 — 属于长期未发现的隐性容量问题，已定位两个估算器存在逻辑冲突。 🔗 https://github.com/nearai/ironclaw/issues/7485
- **#7486** `[OPEN]` typed no-progress 终止机制在幂等读/轮询时误报，可能中断合法长任务。 🔗 https://github.com/nearai/ironclaw/issues/7486
- **#7505** `[OPEN]` Memory target-alias 仅在特定 provider 中解析，是契约层 bug。已有 **#7512** fix PR。 🔗 https://github.com/nearai/ironclaw/issues/7505

**中严重度：**

- **#7490** `[OPEN]` `retry_disposition()` 分类表为死代码，25 类瞬时故障的静默重驱逻辑从未生效。 🔗 https://github.com/nearai/ironclaw/issues/7490
- **#7488** `[CLOSED]` 三个 disclosure bridge 工具硬编码 `Exclusive` 并发提示，已将 `tool_search`/`tool_describe` 改为可并发。 🔗 https://github.com/nearai/ironclaw/issues/7488
- **#7487** `[CLOSED]` `tool_search` 标记工具已披露但不返回 schema，绕过了 describe-first 安全网。 🔗 https://github.com/nearai/ironclaw/issues/7487

**QA 报告的回归问题（均已关闭）：**

- **#7246** Agent 虚构自动化运行状态 — 已关闭。 🔗 https://github.com/nearai/ironclaw/issues/7246
- **#7247** Agent 虚假声称 GitHub 已连接 — 已关闭。 🔗 https://github.com/nearai/ironclaw/issues/7247
- **#7294** Agent 错误记忆来自其他 scope/thread 的 Telegram routine — 已关闭。 🔗 https://github.com/nearai/ironclaw/issues/7294

## 6. 功能请求与路线图信号

- **#7517** `Cloud.near.ai: allow staking path for Google/GitHub sign-ins` — 新增强型请求，Google/GitHub 登录用户无法为推理 stake，只能走 Stripe。若采纳，将影响 Cloud.near.ai 的认证与支付流程设计。 🔗 https://github.com/nearai/ironclaw/issues/7517
- **#7496** `Feature: host-mediated IdentyClaw Passport` — 请求内置 `builtin.idcp` 主机中介能力，使 processless/secure-default 配置下的 agent 也能使用 IdentyClaw Passport 进行登录。 🔗 https://github.com/nearai/ironclaw/issues/7496
- **#7513** `feat(cli): add ACP serve command with streaming + cancel support`（待合并）— 新增 `--acp --stdio` 命令，使 GitHub Copilot CLI、VS Code 等外部工具可直连 IronClaw agent，与 #7482 的 ACP executor 方向一致。 🔗 https://github.com/nearai/ironclaw/pull/7513
- **#7516** `feat(webui): operator surface for the IronHub agent link`（待合并）— 将 IronHub 注册 URL 与 hub 密钥安装从 CLI 扩展到 WebUI Extensions 页面。 🔗 https://github.com/nearai/ironclaw/pull/7516
- **#7498** `feat: automation suggestion cards V1 backend`（待合并）— 实现 #7038 设计系统提案中自动化建议卡片的后端，为首页提供模型生成的建议卡片 API。 🔗 https://github.com/nearai/ironclaw/pull/7498

## 7. 用户反馈摘要

从今日关闭的 QA bugs 可提炼出以下真实用户痛点：

- **Agent 状态误报（最突出）**：多个 QA 报告（#7246、#7247、#7294）集中在同一类问题——agent 在未验证真实状态的情况下向用户做出"已连接""已在运行""已设置"的肯定断言，用户随后在界面上发现事实并非如此。这类问题直接侵蚀用户对 agent 的信任，是当前最重要的体验短板。
- **第三方能力绑定流程混乱**：#7508 中 GitHub MCP 扩展启动时出现"已注册但端点验证存疑"的混淆性提示，#7517 中用户反馈 Google/GitHub 登录后无法使用 stake 路径，均反映了第三方集成/身份认证的用户流尚不顺畅。
- **WebUI 细节体验**：#7481 中用户期望侧边栏长标题悬停可读，该需求已通过 #7480 获得解决，属于被积极响应的正面案例。

## 8. 待处理积压

以下为长期未解决的重要事项，建议维护者关注：

- **#6879** `[OPEN, epic, v1.3.0]` Automation runs are hit-or-miss — 创建于 2026-07-29，已持续两周无评论。自动化触发按普通会话执行导致结果不稳定，属于 v1.3.0 史诗级问题，但目前未有对应 PR。 🔗 https://github.com/nearai/ironclaw/issues/6879
- **#7038** `[OPEN, epic, v1.3.0]` Storybook + AI-first Design System — 创建于 2026-08-03，提案文档齐全（含 PR #7257），今日有 #7498 suggestions backend 落地，但设计系统本身尚未启动实施。 🔗 https://github.com/nearai/ironclaw/issues/7038
- **#5910** `[OPEN]` hydrate approval gates on notification open — 由 `ironloopai[bot]` 创建于 2026-07-10，已超一个月未合并。该 PR 直接影响 WebUI 订阅启动时审批门控的送达可靠性，长期未合并值得关注。 🔗 https://github.com/nearai/ironclaw/pull/5910
- **#7365** `[OPEN]` memory-save guidance + always-on MEMORY.md prompt lane — 创建于 2026-08-07，针对用户跨会话记忆丢失的核心诉求，虽已出现 4 天，但该能力对用户体验影响较大，建议推进合并。 🔗 https://github.com/nearai/ironclaw/pull/7365

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-12

## 今日速览

过去 24 小时内，LobsterAI 项目保持高活跃度：发布 1 个新版本（2026.8.11），合并/关闭 7 个 PR，关闭 3 个 Issue，新版本发布节奏稳定。合并内容集中在 Cowork 增强、UI 交互优化及设置可靠性修复，团队正加速推进 v2026.8.x 迭代周期。当前有 3 个 PR 待合并（含 1 个依赖更新和 1 个功能修复），2 个 Issue 仍处开放状态（均为 4 月初创建的历史遗留问题），整体项目健康度良好。

## 版本发布

### LobsterAI 2026.8.11
- **发布时间**：2026-08-11
- **主要更新**：
  - feat(cowork): 新增 collapse-agent-tasks 快捷键，并允许在输入时使用修饰键快捷键（PR #2469）
  - feat(cowork): 在侧边栏标记定时任务会话（PR #2469）
- **发布链接**：https://github.com/netease-youdao/LobsterAI/releases

> 注：该版本为增量迭代，无破坏性变更与迁移注意事项。建议用户通过应用内自动更新或 GitHub Releases 页面获取。

## 项目进展

今日合并/关闭的 7 个 PR 中，以下几个对项目推进有重要意义：

- **PR #2477 — Release/2026.8.10 合并至 main**：包含可配置模型思考级别、Cowork 进度可视化改进、定时任务识别、本地文件工作流优化、启动/运行可靠性增强及设置交互改进。这是过去数日工作的集中落地，覆盖面广，是 2026.8.x 系列的重要里程碑。
  https://github.com/netease-youdao/LobsterAI/pull/2477

- **PR #2457 — 可配置思考级别**：为支持的包模型增加服务器驱动的思考级别选项和默认值，支持 OpenClaw 别名配置，并在会话/代理级别持久化选择，同时发送版本化模型请求选项。该功能已随 Release/2026.8.10 合入，标志着模型控制能力的进一步精细化。
  https://github.com/netease-youdao/LobsterAI/pull/2457

- **PR #2476 — Escape 键关闭最上层浮层**：修复多模态弹窗嵌套时 Escape 键响应混乱的问题，通过 layer id 注册机制确保只有最上层弹窗响应，并兼容 IME 组合输入场景。
  https://github.com/netease-youdao/LobsterAI/pull/2476

- **PR #2473 — 本地文件链接右键菜单**：新增 LocalFileContextMenu，支持打开方式/另存为/复制路径/复制内容/复制图片/在文件夹中显示等操作，并新增 dialog:saveFileCopy IPC 处理器。
  https://github.com/netease-youdao/LobsterAI/pull/2473

- **PR #1241 — Settings 关闭确认机制**（关闭 Issue #1237）：实现脏检测（dirty check），拦截背景点击、X 按钮、Cancel 三条关闭路径，在修改未保存时提示用户确认。该 PR 历经四个月终于合并，解决了用户配置静默丢失的核心痛点。
  https://github.com/netease-youdao/LobsterAI/pull/1241

其余已合并 PR 包括：PR #2474（图标对齐修复）、PR #1239（AI 任务完成时 Windows 任务栏/macOS Dock 图标闪烁提醒），均为提升用户体验的收尾型改动。

## 社区热点

今日讨论最活跃的条目整体热度不高（评论数均为 1–2 条），但有两个值得关注：

- **Issue #1183 — 一直循环跳出遮罩启动网关**（OPEN，1 条评论）：Windows 环境下添加模型并调用后关闭开关并保存，返回首页提示"openClaw 网关未能在规定时间内启动成功"，且反复弹出遮罩。该 Issue 自 4 月初创建至今仍未关闭，虽然评论不多，但作为长期未解决的功能性问题，用户等待时间已超四个月，建议维护团队重点关注。
  https://github.com/netease-youdao/LobsterAI/issues/1183

- **PR #2475 — 每个模型独立的思考级别**（OPEN）：修复"思考强度全局一份导致模型间互斥"的 Bug，为每个模型单独记忆思考深度。该 PR 与今日合并的 #2457 功能高度关联，是对模型配置能力的进一步补充完善，已有明确的复现路径和解决方案描述。
  https://github.com/netease-youdao/LobsterAI/pull/2475

## Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#1183](https://github.com/netease-youdao/LobsterAI/issues/1183) | 网关启动失败，循环弹出启动遮罩，阻断正常使用（Windows） | OPEN，无 fix PR |
| 🟡 中 | [#1240](https://github.com/netease-youdao/LobsterAI/issues/1240) | 单个大模型 API 受限后，所有对话框任务全部受限，无法切换模型，需重启或恢复配置 | CLOSED（stale），无 fix PR |
| 🟡 中 | [#2062](https://github.com/netease-youdao/LobsterAI/issues/2062) | 任务超过最大时长被自动停止，用户无法判断任务是停止还是后台继续运行 | CLOSED（stale），无 fix PR |
| 🟢 低 | [#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) | Settings 关闭无确认，未保存的 API Key 等配置静默丢失 | CLOSED，已由 PR #1241 修复 |

今日无新增 Bug 报告。PR #2475 对应的"思考级别模型互斥"问题虽未关联 Issue，但已被社区提交 PR 修复，预计不久后合入。

## 功能请求与路线图信号

- **每个模型独立的思考级别设置**：PR #2475 提供了按模型维度记忆思考强度配置的能力，解决全局唯一设置的局限性。由于 #2457 刚合入，该 PR 有望在下一个版本中落地。
  https://github.com/netease-youdao/LobsterAI/pull/2475

- **本地文件操作增强**：PR #2473 引入的右键菜单覆盖了打开方式、另存为、复制路径/内容/图片、在文件夹中显示等操作，后续可能继续扩展文件管理类功能。
  https://github.com/netease-youdao/LobsterAI/pull/2473

- **任务时长管理**：Issue #2062 反映出用户对长时间运行任务的需求，社区期待 LobsterAI 支持超越最大时长的超长任务或提供更明确的任务状态提示。该需求目前无对应 PR。
  https://github.com/netease-youdao/LobsterAI/issues/2062

## 用户反馈摘要

- **对设置丢失的确认与认可**：Issue #1237 的关闭及 PR #1241 的合入，回应了用户对于"修改未保存即关闭弹窗导致 API Key 丢失"的投诉。用户 MaoQianTu 提出的"有未保存的修改，离开后修改将丢失，确认离开吗？"交互期望已得到完整实现。
  https://github.com/netease-youdao/LobsterAI/issues/1237

- **模型 API 受限导致整体瘫痪的痛点**：Issue #1240 用户 zolufly-web 描述了当某个大模型 API 烧光请求次数后，无法切换到其他可用模型，导致 LobsterAI 整体陷入不可用状态，且重启无法解决。这暴露了在模型不可用时的降级切换机制缺失，建议后续版本在模型路由和故障转移方面进行增强。
  https://github.com/netease-youdao/LobsterAI/issues/1240

- **超长任务运行需求**：Issue #2062 用户尝试构建 24 小时连续运行的任务时遇到超时自动停止，且无法判断任务状态，场景指向自动化工作流对长时任务的支持诉求。
  https://github.com/netease-youdao/LobsterAI/issues/2062

## 待处理积压

- **Issue #1183 — 网关启动失败循环弹窗**（2026-04-01 创建，已开放 133 天）：Windows 环境下添加模型后网关启动失败，反复弹出遮罩。长时间无维护者响应，建议排期调查并提供临时规避方案。
  https://github.com/netease-youdao/LobsterAI/issues/1183

- **PR #1181 — 隐藏 OpenClaw 主代理会话**（2026-04-01 创建，已开放 133 天）：通过 `hidden` 列将 OpenClaw 主代理会话从 Cowork 会话列表中隐藏，避免用户混淆。作为体验优化型改动长期积压，建议合入或关闭以明确状态。
  https://github.com/netease-youdao/LobsterAI/pull/1181

- **PR #1277 — Electron 依赖大版本升级**（dependabot 自动创建）：Electron 从 40.2.1 升级至 43.3.0（跨 3 个大版本），包含大量底层变更。建议安排专人评审，并在测试环境充分验证后合并。
  https://github.com/netease-youdao/LobsterAI/pull/1277

---

*本日报数据来源于 LobsterAI GitHub 仓库（github.com/netease-youdao/LobsterAI），统计周期为 2026-08-11 至 2026-08-12。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-08-12）

## 1. 今日速览

过去 24 小时内，Moltis 项目处于低频迭代状态：新开 Issues 为 0，无版本发布，仅收到 1 条 Pull Request（PR #1190），目前处于待合并状态。整体活跃度较低，但该 PR 内容涉及本地 CalDAV 连接器、持久化存储、全文搜索及智能体工具等重要能力，属于重量级功能提案，预计后续会进入密集评审期。项目当前无明显回归或 Bug 报告，健康度稳定。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭，但新增了一条待合并的 PR：

- **PR #1190: Add durable local CalDAV connectors**  
  作者：penso  
  链接：https://github.com/moltis-org/moltis/pull/1190  
  创建于 2026-08-11，最后更新于 2026-08-11

该 PR 提出为 Moltis 增加一套 **provider-neutral 的连接器持久化机制**，具体包括：
- 原子化的 CalDAV 快照（atomic CalDAV snapshots）
- 调度（scheduling）与投影（projections）
- 有边界的本地全文搜索（bounded local full-text search）
- 基于 prompt 编译的数据集计划（prompt-compiled dataset plans）
- 可信的只读 `connectors` 智能体工具，用于本地数据集访问
- Settings > Connectors 账号与数据集管理界面

虽然该 PR 尚未合并，但它扩展了 Moltis 在本地数据接入、离线可用性和个人 AI 助手上下文构建方面的能力，是项目向“持久化本地连接器 + 智能体工具”方向迈进的重要信号。后续若合并，将显著增强用户对第三方日历/联系人数据的自主掌控力。

## 4. 社区热点

今日唯一活跃项为 **PR #1190**（https://github.com/moltis-org/moltis/pull/1190），由于数据中未显示评论数与点赞数，暂无法量化其热度。但从内容看，该 PR 触及了多个核心诉求：

- **本地优先**：强调本地持久化与快照，契合用户对数据主权和隐私的关切；
- **连接器生态**：引入 provider-neutral 模式，有望降低接入新数据源（如 CalDAV）的门槛；
- **智能体集成**：新增 `connectors` 工具，使 AI 助手能透明访问本地数据集，属于用户体验增强型改动。

推测社区对该 PR 的关注点会集中在数据一致性（原子快照）、搜索性能（有界索引）以及安全边界（只读工具）上。

## 5. Bug 与稳定性

今日无新增 Bug、崩溃或回归问题报告。PR #1190 中提到的“原子化 CalDAV 快照”和“有界本地全文搜索”属于架构层面的稳定性设计，尚未有对应修复需求。整体项目稳定性良好。

## 6. 功能请求与路线图信号

虽然今日没有新开 Issues，但 PR #1190 本身就是一个大型功能请求的实现：

- **本地 CalDAV 连接器**：用户希望将个人日历（如 Nextcloud、iCloud、Fastmail）以本地持久化方式接入 Moltis，而不是临时同步；
- **数据集计划（dataset plans）**：通过 prompt 编译生成数据使用计划，可能为未来“用户自定义数据管道路径”铺路；
- **只读智能体工具**：强化 AI 助手的本地数据访问能力，同时限制写权限，体现安全与可用性的平衡。

这些信号表明 Moltis 的下一步方向可能包括：**丰富本地数据源支持**、**增强智能体工具生态**以及**提升离线/隐私场景下的体验**。该 PR 若被接受，很可能会成为后续版本（如 v0.x 或 v1.x 里程碑）的核心功能。

## 7. 用户反馈摘要

今日没有任何 Issue 或 PR 评论数据，因此无法提炼用户真实反馈。仅能从 PR #1190 的摘要中推断，其设计初衷是解决“连接器状态不持久”“本地数据访问不可控”“全文搜索无边界”等问题。建议维护者在后续评审中主动收集社区对该 PR 的讨论，以获取更具体的用户场景与痛点。

## 8. 待处理积压

- **PR #1190**（https://github.com/moltis-org/moltis/pull/1190）  
  状态：Open，待合并  
  创建于 2026-08-11，目前未收到任何评论或审核更新。该 PR 涉及多模块改动（连接器持久化、快照、搜索、设置界面、智能体工具），建议维护者尽快安排评审，避免长时间积压。同时，也可考虑将其拆分为更小的可评审单元，降低合并风险。

---

*数据来源：GitHub（moltis-org/moltis），统计时间窗口：2026-08-11 至 2026-08-12。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-08-12）

> 数据来源：CoPaw 官方 GitHub 仓库（agentscope-ai/QwenPaw）；统计窗口：2026-08-11 ~ 2026-08-12

---

## 1. 今日速览

过去 24 小时 CoPaw 项目保持**高活跃度**：Issue 侧共 22 条更新（新开/活跃 9 条，关闭 13 条，关闭率 59%）；PR 侧共 48 条更新（待合并 23 条，关闭/合并 25 条，关闭率 52%）；同时发布了 **v2.1.0-beta.3**。维护者对历史 issue 的清理速度快，项目正处于快速迭代期。但社区反馈暴露两个集中痛点：**MCP 工具稳定性**与**中文 IME/中文用户体验**，其中插件安全权限问题（#6916）属中高风险，建议优先响应。值得注意的是，本次窗口内关闭了 3 个与公式渲染相关的历史 issue（#5453、#4756、#6893），并结合 #6911 的合并，可判断该项能力已在 Console 端实质落地。

---

## 2. 版本发布

### v2.1.0-beta.3（2026-08-11 发布）

**更新内容：**

| 类型 | 内容 | PR |
|------|------|-----|
| 功能 | **文件工作区博客（Files Workspace Blog）**：允许将文件工作区内容以博客形式展示/分享 | [#6783](https://github.com/agentscope-ai/QwenPaw/pull/6783) |
| 修复 | **Provider 能力缓存过期与模型切换清理**：修复 stale capability cache 导致的模型能力感知错误，并在切换模型时主动清缓存 | [#6723](https://github.com/agentscope-ai/QwenPaw/pull/6723) |
| 维护 | 版本号提升至 v2.1.0-beta.3 | — |

**破坏性变更：** 无明确破坏性变更声明。

**迁移与验证提示：**
- 这是 Beta 预发布版，建议在测试环境验证后再用于生产。
- 若你此前遇到“模型切换后能力不更新”或“MCP 工具周期性失效”（#6732 关联现象），建议优先验证本次 provider 缓存修复（#6723）。
- 此前报告的 **v2.1.0b1 中 PYTHONHOME 注入导致 Python 子进程崩溃**（[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)）已在 08-11 关闭，请在 beta.3 中回归确认。
- 项目已启动自动化的发布验证流程（[#6914 Release Duty](https://github.com/agentscope-ai/QwenPaw/issues/6914)），发布后 4 小时内完成多平台安装验证，质量保障机制较完善。

---

## 3. 项目进展

今日关闭/合并的 PR 覆盖**前端体验、工具正确性、记忆系统稳定性、桌面端能力、渠道安全**多条线，整体推进显著。

### 3.1 前端 / Console 体验

| PR | 内容 | 价值 |
|----|------|------|
| [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) | **统一可渲染代码块体验**：代码块统一视觉系统，LaTeX 与 Mermaid 块增加预览/源码 Tab，支持明暗主题 | 直接回应社区关于公式渲染的长期诉求（#5453、#4756、#6893） |
| [#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915) | **修复文件预览与暗色模式**：Unicode PDF 文件名与 SVG 预览失败，下载响应使用 RFC 5987 编码 | 完善工作区文件浏览体验，已标记 ready-for-human-review |

### 3.2 工具与后端正确性

| PR | 内容 | 价值 |
|----|------|------|
| [#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898) | **修正 read_file 工具描述**：明确仅支持文本文件，避免模型误用导致二进制文件乱码 | 小改动，但能直接影响 Agent 工具调用准确率 |
| [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) | **压缩前冲刷 pending auto-memory turns**：修复 #6555，补齐自动记忆在上下文压缩前的持久化缺口 | 记忆系统可靠性重要补强 |

### 3.3 桌面端与渠道

| PR | 内容 | 价值 |
|----|------|------|
| [#6891](https://github.com/agentscope-ai/QwenPaw/pull/6891) | **Computer Use 原生输入工作流改进**：新增 bounded keyboard-only `sequence` 动作、按步骤限速、部分完成回报 | 提升 macOS/Windows 桌面端自动化可靠性 |
| [#6909](https://github.com/agentscope-ai/QwenPaw/pull/6909) | **渠道 BOT 冲突警告**：保存渠道配置时检测到 BOT 已被其他 Agent 使用，弹出确认对话框 | 避免多 Agent 共用同一 BOT 导致消息错乱 |

### 3.4 发布流程

- [#6875](https://github.com/agentscope-ai/QwenPaw/pull/6875)：更新 v2.1.0 中英文发布说明，并同步各 README 的 News 条目，为正式版 v2.1.0 做准备。

**整体判断：** 项目在向 **v2.1.0 正式版收敛**，同时持续吸收社区反馈完善 Console 体验。能在一日内关闭 13 个 issue + 25 个 PR，维护者投入与处理节奏均处于高位。

---

## 4. 社区热点

> 注：本期 PR 评论数未完整记录，以下讨论热度以 Issue 评论数为准。

### 🔥 最热讨论：#6732 — MCP 工具规律性失效（10 评论，已关闭）

- 链接：[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)
- 现象：每隔数小时或一晚，MCP 工具变为“未注册/不存在”，重启 Docker 容器后恢复。
- 诉求分析：MCP 是用户接入第三方工具的核心通道，长期运行场景下稳定性不足，影响生产效率。10 条评论说明不少用户遇到过类似问题。该 issue 已在 08-11 关闭，可能与 #6723（缓存过期清理）相关，**但社区需要 beta.3 的实际验证反馈**。

### 🔥 次热讨论：#6893 — 公式渲染 + 会话分组 + 活动会话背景（7 评论，已关闭）

- 链接：[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)
- 现象：LaTeX 公式无法渲染（用户直接引用了公式，显示为源码）；同时提出会话分组管理和活动会话背景两个 UI 诉求。
- 诉求分析：公式渲染是学术/技术用户的刚需，此前已三次被提出（[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)、[#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756)）。该 issue 在 #6911 合并后关闭，说明修复已落地。用户的另外两个诉求（会话分组、活动背景）反映的是**多会话场景下的组织效率**，属于持续体验优化方向。

### 💡 值得关注：#6918 — Agent 代笔的 Bug 报告（2 评论，开放）

- 链接：[#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918)
- 现象：Agent 间消息会为每条消息 spawn 一个新的 Agent 会话，导致“shadow instances”并发，产生重复数据。
- 信号意义：这是由用户自己的 Agent 自动生成的 issue，说明 CoPaw 正被 AI Agent 开发者社区实际使用；同时该 bug 本身指向 agent 间通信的会话管理缺陷，需要后端修复。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 🔴 高（安全） | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件可在无用户确认时静默创建 cron job，并向对话注入用户可见消息。权限模型缺失，已安装插件即可持久化执行定时动作 | 开放，无 fix PR |
| 🔴 高（崩溃） | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) | v2.0.1 在 Windows pip + Web 端使用中出现**经常性崩溃**，附 console channel traceback | 开放，无 fix PR |
| 🟠 中高（数据一致性） | [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) | Inter-agent 消息为每条消息新建 session，产生并发 shadow instances，导致重复数据 | 开放，无 fix PR |
| 🟠 中高（中文用户） | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | Console UI 在中文 IME compositionEnd 时崩溃，消息队列完全不可用（v2.1.0b2） | 开放，无 fix PR |
| 🟠 中（功能失效） | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP 工具周期性失效，重启容器恢复 | 已关闭，修复验证中 |
| 🟡 中（性能） | [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) | Console 空闲时因无限 CSS 动画（ai-copilot-blink + antd load-more）持续重绘，CPU 占用 ~20% | 已关闭 |
| 🟡 中（API 行为） | [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) | `PUT /api/config/channels/{name}` 对非法 payload 返回 HTTP 500 而非 422 | 开放，**已有 fix PR**：[#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) |
| 🟡 低（体验） | [#5790](https://github.com/agentscope-ai/QwenPaw/issues/5790) | Agent 响应完成后输入框 loading 动画不消失 | 已关闭 |
| 🟡 低（数据） | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面子文件夹笔记被错误分组到错误日期（如 `memory/2026-08-09/` 显示在 08-10 下） | 开放，无 fix PR |

**已有关联修复的 Bug：**
- #6910 → [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912)（将 ValidationError 映射为 422）
- #6722（后台 forked subagent 在 worktree 失败时误报完成）已关闭。

**健康度判断：** 关闭速度较快，但开放中的安全漏洞（#6916）和高频崩溃（#6919）需要优先关注。

---

## 6. 功能请求与路线图信号

### 6.1 用户新提出的功能需求

| Issue | 需求 | 状态 |
|-------|------|------|
| [#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917) | Agent 应能将任意报告/消息主动投递至收件箱（Inbox），不限于 cron/heartbeat/记忆任务 | 开放 |
| [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) | 如何集成 CopilotKit？希望提供示例或设计思路 | 开放（提问） |
| [#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897) | QQ bot 工作流应支持精简输出模式，避免全量推送触发限流 | 已关闭 |
| [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件创建 cron job / 注入消息需用户确认（权限模型完善） | 开放，安全相关 |

### 6.2 可能进入下一版本的在途 PR 信号

**架构层：**
- [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Provider 发现、模型元数据、路由与 Agent 控制的统一重构（大 PR，或影响 v2.1/v2.2 的配置格式）
- [#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779) — Scroll 上下文与 memory 对齐 AgentScope 生命周期（架构收敛，降低不一致风险）

**功能层：**
- [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) — MCP 工具调用超时可配置（默认 120s，关闭 #6724，直接回应 MCP 稳定性痛点）
- [#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877) — 桌面端记住窗口位置与大小
- [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) — 统一 App/插件/技能市场页面
- [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) — 集成 AnySearch 作为内置 Web 搜索（替代 Tavily）

**结论：** 路线图清晰指向 **“架构统一 + 桌面体验 + 工具生态稳定”**。其中 #6880（市场统一）和 #6302（Provider 统一）完成后，用户配置与扩展管理成本将显著下降。

---

## 7. 用户反馈摘要

> 以下反馈提炼自本窗口 issue 描述与讨论主题，数据源链接见各条目。

### 7.1 真实痛点

- **MCP 工具“用着用着就失效”**（[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）：用户以 Docker 方式长期运行，每隔数小时 MCP 即失效，需重启容器，属于高影响稳定性问题。评论区共鸣明显。
- **公式渲染体验“尴尬”**（[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)）：用户对比 cherry studio，明确表达 QwenPaw 中 `$Var(\hat{X}) = ...` 这类公式显示为源码不可接受。该问题已被 #6911 修复。
- **中文输入法导致 UI 崩溃**（[#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885)）：中文 IME 在 Agent 运行期间触发 compositionEnd，导致消息队列不可用。中文用户基础庞大，此问题影响面广。
- **QQ bot 刷屏触发限流**（[#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897)）：真实业务场景中，详细工作流全量推送至 QQ 会造成信息轰炸和平台限流，用户希望输出粒度可配置。
- **桌面端字体过小**（[#4154](https://github.com/agentscope-ai/QwenPaw/issues/4154)）：WebView 窗口无字体缩放，长时间使用疲劳。

### 7.2 满意/正面信号

- **维护者响应与 issue 清理速度令人安心**：一天内关闭 13 个 issue，其中包含多个留存数周的老 issue（#4154、#4756、#5453、#6697、#6828 等）。
- **用户愿意用 Agent 自动写 Bug 报告**（[#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918)）：侧面说明 CoPaw 已被 AI Agent 开发社区作为生产工具使用，且开放性得到认可。
- **发布节奏稳定**：beta 版本迭代 + 自动化 Release Duty 验证流程，成熟的工程化表现。

### 7.3 社区文化观察

- 中文用户占比较高，且提出了建微信群建议（[#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895)）——建议官方考虑建立中文社区沟通渠道。
- 用户通过同一账号连续提交多个 issue 与 PR（如 Jasonsun77、RerankerGuo），说明存在深度参与的核心用户群体。

---

## 8. 待处理积压

### 8.1 需优先响应（高优先级）

| 类型 | 条目 | 说明 |
|------|------|------|
| 安全漏洞 | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件静默创建 cron + 注入消息，权限模型缺失。发布已超过 24 小时无官方回应，建议安全团队介入 |
| 高频崩溃 | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) | v2.0.1 频繁崩溃，用户已提供完整 traceback，建议尽快确认是否与 #6885 同源 |
| 中文 IME 崩溃 | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | 影响消息队列核心功能，中文用户占比高，修复优先级应上调 |

### 8.2 中等优先级（社区等待中）

| 类型 | 条目 | 说明 |
|------|------|------|
| 提问 | [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) | “如何集成 CopilotKit”持续 2 天无回复，建议补充文档或引导至 Discussions |
| Bug | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面分组错误，影响笔记数据可读性，已开 2 天无回应 |

### 8.3 长期待 Review 的 PR（关注贡献者体验）

| 关联 PR | 创建时间 | 等待时长 | 说明 |
|---------|----------|----------|------|
| [#5490](https://github.com/agentscope-ai/QwenPaw/pull/5490) | 2026-06-24 | ~7 周 | Console 全屏图片画廊，功能完整，长期未合并，建议维护者明确状态 |
| [#5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) | 2026-07-08 | ~5 周 | Slash 命令自动补全（TUI + Console），first-time contributor，已 Under Review |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 2026-07-21 | ~3 周 | Provider 统一大重构，改动面大，需安排核心维护者专项 review |
| [#6660](https://github.com/agentscope-ai/QwenPaw/pull/6660) | 2026-08-03 | ~9 天 | .dockerignore 微调，first-time contributor，建议快速合入或关闭以鼓励新人 |
| [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) | 2026-08-08 | ~4 天 | AnySearch 集成，涉及 MCP env-ref 修复，处于 Under Review，需技术确认 |

---

**日报总结语：** CoPaw 当前处于 v2.1.0 发布前的高强度迭代期，项目活跃度和维护者响应速度均为上游水准。下一阶段最值得关注的是：v2.1.0 正式版发布、MCP 稳定性验证结果（#6732）,以及安全权限模型（#6916）的修复方案。建议社区管理侧加速对中文用户问题的响应，并尽快处理积压的 first-time contributor PR，以维持社区贡献热情。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-12

> 数据来源：github.com/zeroclaw-labs/zeroclaw | 统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 ZeroClaw 社区保持高热活跃度：共产生 50 条 Issue 更新（40 条活跃 / 10 条关闭）与 50 条 PR 更新，但仅 1 个 PR 被合并，**合并吞吐量显著偏低**，49 个 PR 仍处于待合并状态。讨论热度高度集中在架构级 RFC（Goal mode、Chat Completions profile、安全策略管线）上，且多个 RFC 已进入 Revision 迭代阶段，说明项目正处于 **密集的架构决策窗口期**。新版本发布为 0，但有多项 S1/S2 级 Bug 在今日闭环（如 Docker Compose 网关端口问题、daemon reload 信号问题）。项目整体健康度良好，但 PR 审查/合并效率是当前最突出的瓶颈。

---

## 2. 版本发布

**今日无新版本发布。**

---

## 3. 项目进展

今日仅 1 个 PR 被合并/关闭，整体合并节奏放缓。不过，共有 10 个 Issue 被关闭，其中 5 个为已完成工作项，能够反映项目的实际推进：

- [#9768 Bug：daemon reload 信号错误](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) — **已关闭**。修复了 SIGUSR1 信号处理与降级安全警告误导运维的问题，提升 daemon 运维可靠性。
- [#9035 Bug：Docker Compose 网关 loopback 绑定](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) — **已关闭**。解决 S1 级工作流阻塞：容器内端口映射后仍 Connection refused 的问题。
- [#9545 Task：rustdoc 警告门禁](https://github.com/zeroclaw-labs/zeroclaw/issues/9545) — **已关闭**。已在必选 PR CI 中落地 rustdoc warning gate，防止工作区文档警告静默回归。
- [#7232 RFC：结构化可观测性增强](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) — **已关闭**。完成 Rich Events、OTel Trace Correlation 与 Bridge 重构的设计收敛。
- [#2269 RFI：Token 消耗与成本管理](https://github.com/zeroclaw-labs/zeroclaw/issues/2269) — **已关闭**。产品化部署成本管理方向的社区征询结束，预计将进入设计阶段。

此外，多个高优先级修复 PR 已在待合并队列中（详见第 5 节），一旦合并将显著提升安全与稳定性水平。

---

## 4. 社区热点

今日讨论最活跃的议题均为 **架构级 RFC**，反映社区对 ZeroClaw 能力边界与安全模型的深度关注：

- **[#8303 RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — 19 条评论，🔥 热度第一
  由 @vrurg 发起，提出跨多轮 Agent 对话的有界目标追踪机制。社区核心诉求：Agent 需要"持久化的执行目标"，而非仅限单轮对话响应。作者在 Revision 中明确收敛了首版交付范围（排除重启交接、Web、异步子任务等），讨论聚焦 MVP 边界。

- **[#8603 RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** — 18 条评论
  社区呼声极高的兼容层提案：让 ZeroClaw 暴露 OpenAI Chat Completions 协议，以便 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等生态工具无缝接入。当前 ZeroClaw 仅支持 WebSocket/ACP/webhook，这一限制是外部生态集成的直接障碍。

- **[#7155 RFC: 高危 shell 命令确认层 + 命令策略模式](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** — 17 条评论
  Claude Code 风格的 `allow/ask/deny` 命令策略。已迭代至 Rev 3，范围在维护者指导下收敛至 shell-policy 契约。反映了用户对 Agent 执行安全边界的强烈关注。

- **[#7141 RFC: 可插拔入站认证与规范主体](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)** — 14 条评论
  Rev 8 版本，目标为 Identity & Access 里程碑。OIDC、多提供方认证机制的讨论长期活跃。

- **[#8692 维护者决策队列 Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 13 条评论
  社区自发建立 RFC/设计问题的维护者裁决队列，侧面反映 **大量 RFC 等待 maintainer 拍板**，是当前项目决策效率的直观体现。

---

## 5. Bug 与稳定性

今日提交与修复的 Bug 按严重程度排序：

### S1 — 工作流阻塞

- **[（已修复）Issue #9035：Docker Compose 网关 loopback 绑定](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)**
  Docker 部署后端口无法访问（Connection refused）。今日已关闭，修复有效。

### S2 — 降级行为 / 安全风险高

- **[Issue #9883：Inbound WebP 转换无限解码](https://github.com/zeroclaw-labs/zeroclaw/issues/9883)** — P1，已接受
  由 #9819 split 出的独立问题：`webp_to_png` 在共享图像验证器前进行无界解码，恶意 WebP 可能导致 DoS。**暂无对应修复 PR**，需尽快跟进。
- **[Issue #9872：Bounded delegate 目标工作区解析错误](https://github.com/zeroclaw-labs/zeroclaw/issues/9872)** — P1，已接受
  当 Agent A（bounded 模式）delegate 给 Agent B 时，B 的 filesystem 操作错误地写入 A 的 workspace，构成越权风险。**暂无对应修复 PR**。
- **[（已修复）Issue #9768：daemon reload 信号错误](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)** — 已关闭
  SIGUSR1 未触发 reload，且降级安全警告引导用户使用会杀死 daemon 的信号。已修复。

### 待合并修复 PR（风险较高，建议优先审查）

| PR | 修复内容 | 优先级 | 备注 |
|---|---|---|---|
| [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918) | Gateway `session_key` 双重 `gw_` 前缀导致 abort/rename 失败 | P1 | size:S |
| [#9911](https://github.com/zeroclaw-labs/zeroclaw/pull/9911) | Matrix `mention_only` 下回复 bot 被静默丢弃 | P2 | size:XS |
| [#9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) | `http_request` 无限缓冲直接响应体 + fal.ai 自动重定向安全隐患 | P1 | size:L |
| [#9885](https://github.com/zeroclaw-labs/zeroclaw/pull/9885) | daemon 未遵守 `sops_dir` 文档默认值 | P1 | size:S |
| [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) | SOP headless 运行 + 5 个代码缺陷修复 | P1 | size:XL |
| [#9748](https://github.com/zeroclaw-labs/zeroclaw/pull/9748) | 过期 provider 刷新误改替代会话（引入 generation 计数器） | P2 | size:L |

---

## 6. 功能请求与路线图信号

今日多个 RFC 进入活跃讨论，以下方向大概率影响下一版本（v0.9.0）范围：

| 方向 | Issue | 状态 | 判断 |
|---|---|---|---|
| **OpenAI 兼容 API** | [#8603 Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | RFC 讨论中 | 生态集成呼声极高，接入后 Open WebUI/LobeChat 等可直接使用，预计进入 v0.9.0 路线图 |
| **Goal mode（有界目标执行）** | [#8303 Goal mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | RFC 收敛中 | 扩展 Agent 跨轮次任务能力，MVP 边界已明确，属下一阶段核心功能 |
| **运行时自有安全决策管线** | [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) + [#7141 可插拔认证](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 多轮 Revision | 目标 v0.9.0 security architecture，是安全模型重构的基石 |
| **运行时所有会话与传输适配器** | [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC 已迭代至 Rev 2 | 统一会话所有权与 InboundAction 入口，影响所有 channel |
| **RFC 流程简化** | [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) | status:accepted | 社区自改进流程：缩短讨论期、精简投票规则，将直接提升后续决策效率 |
| **退役 Lucid memory connector** | [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) | RFC 讨论中 | 上游项目已停更（集成后 4 天即 dormant），技术债务清理 |

---

## 7. 用户反馈摘要

从今日活跃 Issue/PR 评论中提炼的真实用户声音：

- **成本敏感是产品化最大痛点**（[#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269)）
  单一大模型跑真实 Agent 负载成本过高（邮件/客服等场景尤其明显）。社区期待更低成本的模型路由与 token 管控能力，该 RFI 虽已关闭，但需求信号明确指向 **多模型成本路由 + 用量预算控制**。

- **生态兼容性诉求集中爆发**（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）
  用户希望直接用 Open WebUI、LobeChat、Aider、LangChain 等前端接入 ZeroClaw。当前仅 WebSocket/ACP/webhook 的方式提高了使用门槛，OpenAI Chat Completions 兼容被认为是降低接入成本的最短路径。

- **安全边界是用户主动提需求的高频领域**（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872)、[#9883](https://github.com/zeroclaw-labs/zeroclaw/issues/9883)）
  用户对 shell 命令执行、delegate 后的 filesystem 隔离、图像解码安全表现出高度警惕。值得注意：**部分安全问题是用户通过实际使用场景发现的**（如 bounded delegate 文件写入越权），说明安全测试需要在真实 Agent 协作场景下加强。

- **文档与默认行为一致性**（[#9885](https://github.com/zeroclaw-labs/zeroclaw/pull/9885)、[#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)）
  用户指出 `sops_dir` 文档声明与实际 daemon 行为不一致，以及文档中写着"发送 XX 信号"实际却会杀死 daemon 的误导性问题。文档与实现的一致性体验有待提升。

---

## 8. 待处理积压

以下为长期未响应或存在阻塞的重要 Issue/PR，建议维护者关注：

### ⚠️ 长期未合并 PR（等待审查或作者回应）

| PR | 创建时间 | 积压天数 | 说明 |
|---|---|---|---|
| [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) feat(config): SandboxPolicyConfig | 2026-06-17 | ~56 天 | size:XL，stale-candidate，安全策略模型落地 |
| [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) fix(tools): file_download SSRF 门禁 | 2026-07-04 | ~39 天 | size:XL，安全修复，阻断 SSRF 攻击路径 |
| [#8902](https://github.com/zeroclaw-labs/zeroclaw/pull/8902) fix(runtime): 双向 JSON-RPC 响应路由 | 2026-07-09 | ~34 天 | ACP 通道关键链路 |
| [#9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194) feat(secrets): KeySource trait | 2026-07-20 | ~23 天 | size:XL，密钥管理架构基础 |
| [#9385](https://github.com/zeroclaw-labs/zeroclaw/pull/9385) feat(channels): WhatsApp Web request_approval | 2026-07-26 | ~17 天 | stale-candidate，+40 个标签超大体量，需拆分审查 |

### ⚠️ 长期未闭合 Issue

| Issue | 创建时间 | 积压天数 | 说明 |
|---|---|---|---|
| [#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) RFC: LSP 支持 | 2026-04-19 | ~115 天 | needs-author-action，ZeroCode 编码工作流增强 |
| [#6653](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) RFC: 模拟安装的 host 架构策略 | 2026-05-14 | ~90 天 | p3，边缘场景但阻塞特定用户 |
| [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998) RFC: Schema 验证的记忆整合 | 2026-05-29 | ~75 天 | p2，影响记忆可靠性 |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) RFC: 可插拔入站认证 | 2026-06-03 | ~70 天 | p1，Rev 8 仍在等 maintainer 决策 |

### 📌 结构性提示

- **[#8692 Maintainer 决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**：社区已自发建立维护者裁决跟踪器，目前大量 RFC 等待拍板。**PR 合并率（1/50）与 Issue 裁决速度是目前项目健康度最大的不确定因素**，建议维护者考虑批量处理已达成共识的 RFC，或试点 [#9496 简化流程](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) 中提出的投票机制。

---

*本日报由 AI 分析师自动生成，数据截至 2026-08-12。所有链接均可直接跳转至 GitHub 对应 Issue/PR。*

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*