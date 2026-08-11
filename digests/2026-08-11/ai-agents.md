# OpenClaw 生态日报 2026-08-11

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-11 10:24 UTC

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

# OpenClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去24小时OpenClaw项目保持极高活跃度：累计处理Issue 500条（新开/活跃358，关闭142）和PR 500条（待合并252，合并/关闭248），项目维护与社区参与节奏强劲。但值得关注的是修复效率有所下降——需合并的PR数量已累计至252条，其中一大部分仍处于等待维护者评审状态。今日无新版本发布，项目当前处于持续迭代、集中处理存量技术债与质量问题的阶段，多个P0/P1级别Bug（发布事故、消息静默失败、回复重复投递等）仍是社区关注焦点。

## 2. 版本发布

过去24小时内无新版本发布。说明当前公开版本仍为停滞状态，需关注近期是否有已打tag但尚未发布，或beta版本发布流程受阻的问题（见下方Bug #121675——上周末曾发生beta发布未携带companion插件的严重事故）。

## 3. 项目进展

今日无主要功能合并，但一批PR已完成合并/关闭，体现项目在工程基础设施、文档与兼容性维护上的持续投入：

- **PR #121992 [已关闭]** `docs(config): refresh generated baseline hash` — 修复repo-wide Workflow Sanity失败，刷新了过期配置基线hash，属于CI健康度维护。 [链接](https://github.com/openclaw/openclaw/pull/121992)
- **PR #121920 / #121922 [已关闭]** `fix(plugin-sdk): keep inbound reply dispatch until next major` — 两条PR内容高度重合，目标均为避免Plugin SDK外部消费者在2026-08-15兼容清理日失去inbound-reply-dispatch shim，确保SDK主版本升级前不破坏外部集成。 [链接](https://github.com/openclaw/openclaw/pull/121920) | [链接](https://github.com/openclaw/openclaw/pull/121922)
- **PR #109077 [已关闭]** `fix(e2e): download non-root installer before execution` — 修复非root Docker安装冒烟测试在curl未完成前便执行安装脚本的风险，杜绝部分payload执行。 [链接](https://github.com/openclaw/openclaw/pull/109077)

**整体判断**：项目在架构清理（导出命名统一、SDK兼容性维护、代码模块拆分）上取得实质进展——#121995、#121888、#121893等大型重构PR已进入队列或即将合并，但面向用户的功能性进展相对滞后。

## 4. 社区热点

今日讨论最活跃的话题集中在「消息投递可靠性」与「记忆安全」两大主题：

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|:---:|:---|:---:|:---|
| 1 | [#121058 Silent reply failures still recurring](https://github.com/openclaw/openclaw/issues/121058) | 50 | #116277修复无效，静默回复失败仍在发生，监控cron持续记录新发生案例，用户要求彻底解决 |
| 2 | [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 35 | 防止记忆投毒攻击的Feature Request，希望按记忆来源（用户指令、网络爬取、第三方技能）进行信任分级 |
| 3 | [#48788 Centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788) | 19 | 呼吁架构级解决多编码Content-Disposition问题，而非只修单一案例（Feishu中文文件名的UTF-8/Latin-1问题） |
| 4 | [#87744 Codex-backed Telegram turns time out](https://github.com/openclaw/openclaw/issues/87744) | 18 | Codex-backed会话长期不达`turn/completed`状态，Telegram回复超时，被标记为P1 |
| 5 | [#22438 Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438) | 18 | 分层加载Bootstrap文件避免LLM token浪费，针对大型工作区场景 |

**分析**：#121058以50条评论位居榜首，反映出复发性Bug对用户信任的消耗极大——用户在issue中持续追加记录新发生案例，希望维护者正面回应为何修复无效。此外，多个高评论Issue均处于`clawsweeper:needs-maintainer-review`状态，用户等待维护者确认的时间已较长。

## 5. Bug 与稳定性

按严重程度排列，重点关注P0/P1级别问题：

### P0（影响发布与核心可用性）
- **[Closed] #121675** `2026.8.1-beta.1 published without companion @openclaw/* plugins` — 发布流程严重事故：beta版本发布时未同步重发布配套插件，导致启动收敛防护将其变成无法恢复的boot loop。该问题已被关闭，但仍需复盘发布流水线为何未拦截此类事故。 [链接](https://github.com/openclaw/openclaw/issues/121675)

### P1（核心功能受损/消息丢失）
- **#121058** `Silent reply failures still recurring after #116277 closed` — 静默回复失败复发，监控cron持续记录，无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/121058)
- **#87744** `Codex-backed Telegram turns repeatedly time out` — 已有PR #120001（Codex native subagent工具生命周期修复）在队列中，但该PR涉及安全决策，需要维护者审慎推进。 [链接](https://github.com/openclaw/openclaw/issues/87744) / [相关PR](https://github.com/openclaw/openclaw/pull/120001)
- **#39476** `A2A sessions_send duplicate messages` — Agent间互调导致消息重复投递，已有相关PR在队列（`clawsweeper:linked-pr-open`）。 [链接](https://github.com/openclaw/openclaw/issues/39476)
- **#84583** `cron announce delivery triggers EmbeddedAttemptSessionTakeoverError` — 用户交谈时cron任务投递结果导致会话锁冲突。 [链接](https://github.com/openclaw/openclaw/issues/84583)
- **#40001** `Write tool lacks append mode — isolated cron sessions destroy shared files` — 静默数据丢失问题，尚无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/40001)
- **#47975** `Subagent sessions persist after completion` — 子代理会话残留导致主会话无响应，无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/47975)
- **#53408** `Write/exec tool parameters silently dropped after long conversations` — 长对话后工具参数静默丢失，无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/53408)
- **#97983** `iOS/WebChat messages append but do not trigger assistant replies` — 移动端消息不触发回复，P1，无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/97983)
- **#97616** `OpenClaw leaks unreaped hook/tool child processes` — 僵尸进程积累导致运行降级，无fix PR。 [链接](https://github.com/openclaw/openclaw/issues/97616)

### P2（回归/功能异常）
- **#89278** `Codex OAuth refresh succeeds but cron/heartbeat fail` — 已有PR #121764（prepared cancellable OAuth refresh hooks）针对此问题。 [链接](https://github.com/openclaw/openclaw/issues/89278) / [PR](https://github.com/openclaw/openclaw/pull/121764)
- **#83598** `anthropic:claude-cli OAuth refresh still dead-ends main lane` — P1，修复无效，仍待处理。 [链接](https://github.com/openclaw/openclaw/issues/83598)
- **#45494** `Cron agent jobs silently time out during LLM API outages` — 回归问题，需更多信息。 [链接](https://github.com/openclaw/openclaw/issues/45494)
- **#103198** `WebChat image attachments not mapped to media store path` — 图片工具收到无效引用的行为Bug。 [链接](https://github.com/openclaw/openclaw/issues/103198)

**观察**：消息丢失/重复/静默失败类问题是当前稳定性的最大短板，且相当一部分处于`needs-maintainer-review`和`needs-product-decision`状态，说明有些问题不仅是代码Bug，还牵扯产品方向决策（例如Write工具是否该增加append模式）。

## 6. 功能请求与路线图信号

以下功能请求近期讨论热度高，或已有关联PR在推进，值得关注：

| 功能 | Issue | 关联状态 | 可能的版本窗口 |
|:---|:---|:---|:---|
| Per-agent成本预算（gateway级） | [#42475](https://github.com/openclaw/openclaw/issues/42475) | 待产品决策 | 待定 |
| 分层Bootstrap加载 | [#22438](https://github.com/openclaw/openclaw/issues/22438) | 有PR关联 | 待定 |
| 记忆信任标签（防投毒） | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 待安全审查 | 待定 |
| 可配置流式Watchdog超时 | [#68596](https://github.com/openclaw/openclaw/issues/68596) | 待产品决策 | 待定 |
| 会话快照（save/load） | [#13700](https://github.com/openclaw/openclaw/issues/13700) | 待产品决策 | 待定 |
| Per-spawn子代理工具限制 | [#15032](https://github.com/openclaw/openclaw/issues/15032) | 有PR关联，待安全审查 | 待定 |

**路线图信号**：从今日PR看，以下几点可能率先落地：
1. **Plugin SDK OAuth Refresh Hooks**（#121764，合并中）——为OAuth刷新添加可取消钩子，直接解决#89278，契合近期多个OAuth相关Issue的集中反馈。
2. **Codex原生子代理工具生命周期**（#120001，需维护者决策）——修复Codex worker保留问题，涉及安全边界决策。
3. **Gateway重启后的会话恢复**（#121969，待作者更新）——修复主会话在gateway重启后失去连续性的问题，属于可靠性基建。

## 7. 用户反馈摘要

从今日热门Issues中提炼的真实用户声音：

- **"修复无效"的挫败感**：Issue #121058的用户明确表示"#116277被关闭后问题依旧，监控cron一直在记录新发生案例"，并持续在issue中追加证据。这种"关闭但未修复"的循环严重消耗用户信任。类似地，#83598也反馈"尽管#73682已修复，OAuth刷新仍然卡死主通道"。([链接](https://github.com/openclaw/openclaw/issues/121058))
- **数据丢失的焦虑**：#40001（Write工具覆盖共享文件）说明隔离cron会话会静默覆盖`memory/YYYY-MM-DD.md`等记忆文件，用户称之为"静默数据丢失"——对需要长期记忆的AI助手场景而言，这是最敏感的痛点之一。([链接](https://github.com/openclaw/openclaw/issues/40001))
- **长会话可靠性下降**：#53408用户反映对话超过15轮后，`write`和`exec`工具参数开始静默消失。这类"不报错但行为错误"的问题比显式崩溃更难以排查。([链接](https://github.com/openclaw/openclaw/issues/53408))
- **移动端体验断裂**：#97983用户报告官方iOS App消息虽追加到transcript但不会触发回复，且`--deliver`也无法投递——影响实际移动场景的核心体验。([链接](https://github.com/openclaw/openclaw/issues/97983))
- **群聊语义混乱**：#56692用户反馈多Agent Telegram群聊中，当前Agent会误响应发给其他Agent的消息，造成子线程错乱。([链接](https://github.com/openclaw/openclaw/issues/56692))
- **部署/运维复杂度过高**：#92516用户抱怨自托管容器无法使用外部化channel插件，openKeyedStore的信任门禁没有为自托管提供支持路径。这类运维痛点虽非核心功能，但影响用户落地部署。([链接](https://github.com/openclaw/openclaw/issues/92516))

## 8. 待处理积压

以下Issue长期未获得有效响应或处于反复「待维护者处理」状态，建议维护者优先关注：

| Issue | 创建日期 | 等级 | 状态风险 |
|:---|:---:|:---:|:---|
| [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | P2 | 已积压超6个月，需求证据充分（35条评论），涉及安全/产品双决策 |
| [#48788 Centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788) | 2026-03-17 | P3 | 19条评论，有明确PR提案方向，但一直「待产品决策」 |
| [#37000 Write tool append mode（#40001）](https://github.com/openclaw/openclaw/issues/40001) | 2026-03-08 | P1 | 数据丢失类问题，但长期处于`needs-product-decision`，缺少明确解决方案 |
| [#13700 Session snapshots](https://github.com/openclaw/openclaw/issues/13700) | 2026-02-10 | P2 | 功能请求，已积压6个月无进展 |
| [#15032 Per-spawn tool restrictions](https://github.com/openclaw/openclaw/issues/15032) | 2026-02-12 | P2 | 安全相关功能，涉及prompt injection防御，需要安全评审 |

**PR侧积压观察**：252条待合并PR中，多个关键修复（#120001、#121764、#121988等）处于`waiting on author`或`needs maintainer look`状态，需作者与维护者双向推进。部分PR（如#121536 Session-accessor导出重构）已带automerge标记但仍有兼容性风险标注，建议审慎合并。

---

*数据来源：OpenClaw GitHub仓库 (github.com/openclaw/openclaw)，统计时间窗为2026-08-10至2026-08-11。*

---

## 横向生态对比

# 个人AI助手/自主智能体开源生态横向对比分析报告（2026-08-11）

## 1. 生态全景

当前开源个人AI助手生态已进入“高活跃、高分化、高阵痛”的阶段。以 OpenClaw 为枢纽，NanoBot、IronClaw、ZeroClaw、CoPaw 等项目在功能迭代和社区贡献上均在快速推进，一日 PR/Issue 流量可达数十至数百条。但“消息静默失败”“Agent 循环失控”“token 成本爆炸”“安全凭据泄露”成为多项目共有的高频痛点，稳定性建设明显滞后于功能扩张。同时，项目间定位分化加剧：从平台型（OpenClaw）、轻量 Web 型（NanoBot）、研究桌面型（Hermes）、企业内核型（IronClaw）到中文生态型（CoPaw/LobsterAI），技术路线与用户群日渐清晰。MCP 与远程 Agent 互操作协议则成为跨项目的集成标准。维护者审查带宽普遍成为瓶颈，PR 积压是当前生态最突出的协作问题。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| OpenClaw | 500（358活跃/142关闭） | 500（252待/248合并关闭） | 无 | 高活跃，但PR积压严重，集中处理存量技术债 |
| NanoBot | 5（2活跃/3关闭） | 117（15待/102合并关闭） | 无 | 合并吞吐极高，功能迭代快，稳定性问题显现 |
| Hermes Agent | 50（48活跃/2关闭） | 50（48待/2关闭） | 无 | 高输入低输出，审查瓶颈明显，安全Bug密集 |
| PicoClaw | 5（3活跃/2关闭） | 8（2待/6合并关闭） | 无 | 中等活跃，合并效率高，针对性修复为主 |
| NanoClaw | 3（3活跃） | 22（11待/11合并关闭） | 无 | 高活跃，消息可靠性成社区焦点 |
| NullClaw | 0（关闭1） | 0 | 无 | 低活跃，进入维护/停滞期 |
| IronClaw | 50（24活跃/26关闭） | 50（35待/15合并关闭） | v1.1.1-rc.1 | 高活跃，开发与稳定化双轨并行 |
| LobsterAI | 0新增/4 stale | 29（12待/17关闭） | 无 | 开发侧活跃，用户问题多被自动关闭需复核 |
| Moltis | 1 | 2（均待合并） | 无 | 低/中等，大型PR长期悬置 |
| CoPaw | 7新开/12关闭 | 25合并关闭 | 无（v2.1.0临近） | 高活跃，发版前密集修复，响应迅速 |
| ZeptoClaw | 0 | 0 | 无 | 无活动 |
| ZeroClaw | 33（27活跃/6关闭） | 50（49待/1合并关闭） | 无 | 高活跃但合并通道严重拥堵，安全修复加速 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的**核心参照系和事实枢纽**：其单日 500 条 Issue/PR 流量远超第二梯队（50 条左右），社区规模呈断崖式领先。核心优势在于平台化架构：Plugin SDK、消息通道适配层、Clawsweeper 机器人辅助治理、大规模第三方集成，使其成为“默认起点”。相比 NanoBot 的轻量 Web 化、Hermes 的研究驱动、IronClaw 的企业内核化，OpenClaw 走的是“功能全面、生态优先”的路线。

但其短板同样明显：252 条待合并 PR 显示维护者带宽严重不足，P0/P1 的“消息静默失败”“回复重复投递”等问题反复出现，修复效率低于生态热度。与此同时，多个新项目（PicoClaw、NanoClaw、ZeroClaw、ZeptoClaw）明显在借 OpenClaw 的命名与概念切入细分市场，形成“Claw 系列”生态圈，但也都面临从“参照”走向“差异化”的挑战。

## 4. 共同关注的技术方向

### 4.1 消息投递可靠性与可观测性
- **涉及项目**：OpenClaw、NanoBot、NanoClaw、PicoClaw、Hermes、ZeroClaw
- **具体诉求**：OpenClaw #121058 静默回复失败持续复发；NanoBot #5256 重复回复；NanoClaw #3226 平台复用消息 ID 导致入站消息被静默丢弃；PicoClaw #3311 工具失败无反馈直至循环耗尽；Hermes #35062 微信 cron 推送静默失败；ZeroClaw #8967 WeChat sendmessage 假成功。
- **共同结论**：失败必须可见，静默丢弃比显式报错更伤害用户信任。

### 4.2 Agent 循环控制与成本治理
- **涉及项目**：NanoBot、OpenClaw、PicoClaw、IronClaw、CoPaw
- **具体诉求**：NanoBot #5324 记忆整理任务消耗 10M+ token 的无限循环；OpenClaw #84583 cron 会话锁冲突、#121058 回复失败循环；PicoClaw #3311 工具重复失败静默循环；IronClaw #7485 双重计数 token 估算、#7484 上下文窗口静默驱逐用户任务；CoPaw #2454 tool-loop guard 误杀正常轮询。
- **共同结论**：token 预算、循环终止条件、无进展检测已从可选优化变为必备稳定性能力。

### 4.3 记忆安全与生命周期架构
- **涉及项目**：OpenClaw、ZeroClaw、NanoBot、Hermes、CoPaw
- **具体诉求**：OpenClaw #7707 记忆来源信任分级防投毒；ZeroClaw #6850 将记忆生命周期策略与存储后端解耦；NanoBot #5324 记忆整理任务失控；Hermes #69603 state.db 反复损坏；CoPaw #6564 记忆压缩前刷新待处理 turns。
- **共同结论**：记忆系统正在从“功能”走向“安全+架构治理”，需要防投毒、可靠持久化、策略与实现分离。

### 4.4 安全边界与凭据治理
- **涉及项目**：Hermes、ZeroClaw、OpenClaw、NanoClaw、IronClaw
- **具体诉求**：Hermes #82936 默认 profile secrets 泄露到 secondary profile、#83612 api_key 被误发给自定义主机；ZeroClaw #9565 webhook 不 fail-closed、#9916 sandbox 工作目录解析问题；OpenClaw OAuth refresh 系列；NanoClaw #3229 Telegram 配对码使用 Math.random；IronClaw 边缘凭据注入。
- **共同结论**：安全重点从“入口认证”下沉到“数据面隔离”，最小权限、密钥隔离、可撤销授权成为共识。

### 4.5 MCP 生态集成与兼容性
- **涉及项目**：NanoBot、NanoClaw、IronClaw、CoPaw
- **具体诉求**：NanoBot #5335 兼容 OpenRouter server tools、#5297 MCP OAuth 网页授权；NanoClaw #3092/#3221 支持远程 Streamable HTTP MCP；IronClaw 改善自定义 MCP 兼容性；CoPaw #6732 MCP 工具周期性失效。
- **共同结论**：MCP 正成为智能体互操作标准，远程 MCP、OAuth 授权、服务端工具与本地工具共存是下一波集成重点。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构/路线 |
|---|---|---|---|
| OpenClaw | 全功能个人 AI 助手，多平台渠道 + 插件生态 | 自托管用户、开发者 | 集中式核心 + Plugin SDK + 机器人辅助治理 |
| NanoBot | 轻量 WebUI、多 provider、PWA/工作台、MCP 接入 | 个人用户、追求开箱即用 | 快速迭代的 Web 优先架构，合并吞吐极高 |
| Hermes Agent | 桌面端（Electron）+ 多渠道，研究机构出品 | 研究者、开发者 | Monorepo 巨型仓库，目前受 God-File 重构与审查瓶颈制约 |
| PicoClaw | 轻量通道层、Telegram 富文本、安全加固 | 轻量部署用户 | 模块化、回归测试覆盖较好 |
| NanoClaw | 隐私安全、远程 MCP、消息可靠性 | 隐私敏感用户 | 在 OpenClaw 基础上做安全加固与 MCP 扩展 |
| IronClaw | 企业级稳定性、架构治理、可插拔 Agent 循环 | 生产环境/商业用户 | 内核化演进（ACP 执行器 + 边缘凭据注入），强调 CI/质量门 |
| ZeroClaw | 100% Rust、插件系统（WASM）、SOP 自动化 | 追求性能与安全的开发者 | Rust 技术栈 + 插件网络能力栈 + 严格安全修复 |
| CoPaw | 中文生态（飞书/QQ/企微）、Windows 桌面、记忆 ReMe | 中文用户、国内企业 | AgentScope 生态，发版前密集稳定化 |
| LobsterAI | 本地文件工作流、cowork 多 Agent 协作、模型思考级配置 | 桌面端深度用户 | Electron + 本地能力集成，中文社区 |
| Moltis | 会话管理、浏览器可视化交互（CDP） | 浏览器自动化用户 | 小型活跃项目，大型 PR 长期推进 |
| NullClaw | A2A 协议服务端 | 多实例/联邦部署用户 | 低活跃维护期，等待客户端闭环 |
| ZeptoClaw | 暂无动态 | — | 处于停滞状态 |

## 6. 社区热度与成熟度分层

- **第一梯队（高活跃，迭代引擎）**：OpenClaw、NanoBot、IronClaw、ZeroClaw、CoPaw、Hermes。
  - **快速迭代同时进入质量巩固**：IronClaw（发布 RC 同时推进新 Epic）、CoPaw（发版前密集修复）、NanoBot（功能合并快但稳定性隐患集中爆发）。
  - **质量巩固为主**：OpenClaw（处理大量存量 PR 与 P0/P1 Bug）、ZeroClaw（安全修复加速但 PR 积压 49 条）、Hermes（高输入低输出，审查成为瓶颈）。

- **第二梯队（中等活跃，局部推进）**：PicoClaw、NanoClaw、LobsterAI、Moltis。
  - 有明确技术方向但社区规模有限，PicoClaw 合并效率较好，NanoClaw 聚焦消息可靠性，LobsterAI 开发活跃但用户问题响应闭环需改善，Moltis 大型 PR 长期悬置。

- **第三梯队（低活跃/停滞）**：NullClaw、ZeptoClaw。
  - 仅有个别 Issue 状态变化，实际代码推进基本停滞，适合关注其后续规划而非当前活跃度。

## 7. 值得关注的趋势信号

1. **“静默失败”成为信任杀手，可观测性必须前置。** 多项目用户反复报告“无报错但行为错误”：消息被丢弃、工具参数消失、定时任务假成功。未来智能体框架需要内置审计日志、失败可见回调、监控告警，而不是把问题留给用户猜测。

2. **Agent 成本失控与循环防护开始被当作基础能力。** 单次 10M token 消耗、上下文窗口静默驱逐、无进展死循环等事件，说明缺少预算护栏和循环检测。对开发者而言，实现“token 预算上限 + 无进展自动终止 + no-op 保护”应成为默认设计。

3. **记忆系统从功能走向安全与架构治理。** 从“防投毒”的信任标签，到“生命周期策略与存储解耦”，再到 memory 损坏后的恢复机制，记忆已不再是简单的增删查改，而需要像数据库一样的可靠性设计。

4. **安全边界从“入口认证”下沉到“数据面隔离”。** 多项目出现 secrets 跨 profile 泄露、api_key 误发、配对码弱随机、webhook 未鉴权等严重风险。最小权限、按来源隔离、密钥可轮换将逐步成为安全审查的硬性标准。

5. **MCP 成为跨项目集成标准，远程化与 OAuth 是下一站。** 服务端工具共存、远程 Streamable HTTP MCP、MCP OAuth 授权等需求在多项目同时涌现。智能体间互操作正从“各做各的”走向“协议收敛”。

6. **维护者审查带宽已成为生态瓶颈。** OpenClaw 252 条、ZeroClaw 49 条、Hermes 48 条待合并 PR 同时积压，自动化机器人（如 Clawsweeper）虽有一定效果，但深度 review 仍依赖人工。未来“社区驱动的自动评审 + 分层维护者机制”可能成为头部项目的必然选择。

---

*本报告基于 2026-08-11 各项目 GitHub 公开数据生成，数据口径为各项目日报中的过去 24 小时统计。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-11

> 数据窗口：过去 24 小时 | 数据来源：HKUDS/nanobot GitHub 仓库


## 1. 今日速览

NanoBot 过去 24 小时保持高速迭代：**117 条 PR 更新**中 102 条已合并/关闭，项目合并吞吐量处于高位，核心维护者（chengyongru 等）与社区贡献者均有密集产出，包括 OpenRouter 服务端工具兼容性修复、WebUI 多窗格工作台、PWA 支持等。Issue 侧 5 条更新中 2 条为新增，均围绕**模型/Agent 循环失控产生重复回复**类稳定性问题，其中一起记忆整理任务异常消耗超 10M token 的事件尤为突出，需要维护者优先排查。整体来看，项目功能迭代与 bug 修复并行推进，活跃度**极高**，但稳定性方面存在值得警惕的信号。

- 过去 24 小时 **Issues 5 条**（新开/活跃 2，已关闭 3）
- 过去 24 小时 **PR 117 条**（待合并 15，已合并/关闭 102）
- 新版本发布 **0 个**


## 2. 版本发布

无新版本发布。


## 3. 项目进展

过去 24 小时合入/关闭的 PR 数量达到 102 条（含历史 PR 清理）。以下为对项目有实质推进的更新：

### 🔧 核心功能修复

- **[#5335 fix(providers): preserve nanobot tools with OpenRouter server tools](https://github.com/HKUDS/nanobot/pull/5335)** — 已合并。修复 OpenAI SDK 将 `extra_body` 合并入请求导致 nanobot 自身工具被 OpenRouter 服务端工具（Web Search、Web Fetch 等）覆盖的问题。现在 Chat Completions 的 `extraBody.tools` 会与 nanobot 生成的顶层工具列表合并。该 PR 同时解决了今日关闭的 Issue [#5333](https://github.com/HKUDS/nanobot/pull/5335)。

- **[#5326 fix(webui): soften form control focus rings](https://github.com/HKUDS/nanobot/pull/5326)** — 已合并。统一并弱化了 WebUI 表单控件的焦点指示样式，集中管理 input/textarea/select 的 focus 外观，属 UI 一致性微调。

### 🆕 新功能

- **[#5322 feat(webui): add tabbed pane workbench](https://github.com/HKUDS/nanobot/pull/5322)**（待合并）— 将侧边栏建模为「Tab → Pane[]」层次结构，支持单 Tab 内多会话的列/行/网格/主栈/单栏布局，并引入共享 header/composer 概念。这是 WebUI 多任务工作台方向的一次架构级升级。

- **[#5336 feat(webui): PWA support](https://github.com/HKUDS/nanobot/pull/5336)**（待合并）— 为 WebUI 增加 PWA 能力：可安装到主屏、独立窗口启动、离线可用壳。该 PR 从 #4494 中拆出，保留了原作者 @zpljd258 的 commits。

### ✨ 其他值得关注

- **[#5331 fix(webui): surface MCP runtime connection failures](https://github.com/HKUDS/nanobot/pull/5331)**（待合并）— 将 MCP 的 `connecting / connected / failed` 真实状态从 gateway 连接尝试中展示出来，与持久化配置分离，并为失败的 MCP 提供 OAuth、自定义服务器等恢复路径。直接改善 MCP 配置排障体验。

- **[#5257 fix(agent): bound sustained-goal continuation when the turn goes idle](https://github.com/HKUDS/nanobot/pull/5257)**（待合并）— 针对可持续目标（sustained goal）在对话进入空闲后仍无限续跑的问题，修复"无终止条件的循环记录"和"空闲轮次持续跟进"两个端点，直指 Issue #5256。


## 4. 社区热点

由于 GitHub API 未返回各 PR 的评论计数字段，以下基于讨论内容与 Issue 活跃度分析：

### 📌 最高关注：MCP OAuth 网页授权（[#5297，3 条评论，10 日仍更新](https://github.com/HKUDS/nanobot/issues/5297)）

作者希望支持需要 OAuth 网页授权的 MCP 服务（如 XMind API），方案是借助 gateway 获取授权信息，并支持远程访问场景。该 Issue 已被关闭，但需求层面有两点值得注意：

1. 配置本地无法完成的网页授权流程是当前 MCP 接入的**明显功能缺口**；
2. PR #5331 已将 `OAuth recovery` 作为 MCP 失败恢复路径之一提出，说明维护者已将该场景纳入 WebUI 层修复计划。社区可以关注该 PR 的合入进展。

### 🔁 重复回复类问题集中爆发（[#5256](https://github.com/HKUDS/nanobot/issues/5256) / [#5327](https://github.com/HKUDS/nanobot/issues/5327)）

两个独立用户（shakewingo、fablau）在 8 月 5 日和 8 月 10 日分别报告了**同一类现象**：Agent 在等待用户回复或推理过程中，重复生成大量相同/相似内容，最终需要用户介入或模型自行识别为循环才终止。

这类问题直接影响 Agent 的可用性和消费成本，且出现时间集中，大概率与近期某次 Agent 循环控制改动（或模型端行为变化）相关。Issue #5256 已有对应修复 PR #5257，但仍在待合并队列中。

### 💸 异常高消耗事件（[#5324，10M token 消耗，23 分钟](https://github.com/HKUDS/nanobot/issues/5324)）

用户 jermeyhu 报告 Dream 记忆整理任务在 8 月 10 日异常运行 23 分钟，消耗超过 10M token（约半个月用量），根因指向 `edit_file` 接受 no-op 编辑后进入无限循环。这是一起**成本敏感性极高**的稳定性事故，Issue 已被关闭，但尚未检索到对应的防回归 PR。


## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 🔴 严重 | [#5324 Dream 记忆整理无限循环，消耗 10M+ token](https://github.com/HKUDS/nanobot/issues/5324) | `edit_file` 接受无意义编辑后，记忆整理任务进入无限循环，异常运行 23 分钟 | 已关闭，**未见对应防回归 PR** |
| 🔴 严重 | [#5256 /goal 消息产生数十条重复回复](https://github.com/HKUDS/nanobot/issues/5256) | 等待用户回答期间持续输出近似重复消息，直到用户介入或模型自我终止 | 开放中；对应修复 [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) 待合并 |
| 🟠 中等 | [#5327 推理过程中随机重复同一条消息](https://github.com/HKUDS/nanobot/issues/5327) | 随机复现，例如重复输出 "Good points, let me investigate the issue" | 开放中，评论数 1 |
| 🟡 较轻 | [#5334 消息分割后缩进丢失](https://github.com/HKUDS/nanobot/pull/5334) | `split_message` 在边界处使用 `lstrip()` 导致缩进丢失，且产生空 chunk；影响 Signal 等渠道的 UTF-16 偏移 | 修复 PR 已提交，待合并 |

**分析：** 重复回复与无限循环类问题在同一天集中出现，建议维护团队排查：

1. 是否近期有改动影响 Agent 循环终止条件（尤其与 `sustained-goal`、Dream 记忆整理相关的逻辑）；
2. 模型侧（尤其 OpenRouter/DeepSeek 等上游）近期是否有行为变化，导致模型更倾向复读或忽略终止信号；
3. Issue #5324 虽然已关闭，但 10M token 级异常消耗应补充回归测试，防止再次发生。


## 6. 功能请求与路线图信号

### 已进入实现阶段

- 🟢 **OpenRouter 服务端工具支持** — 社区请求 [#5333](https://github.com/HKUDS/nanobot/issues/5333) 当天提出、当天被合并的 PR #5335 解决。OpenRouter 的 Web Search、Web Fetch、Fusion 等工具现已可与 nanobot 本地工具共存。该能力对使用 OpenRouter 聚合模型的用户价值明显。
- 🟢 **MCP OAuth 网页授权** — Issue #5297（已关闭）所提诉求与 PR #5331 的「OAuth recovery」路径相衔接，预计随 PR 合入获得初步支持。
- 🟡 **PWA 支持** — PR #5336 待合并，将补齐 WebUI 的安装、离线、独立窗口能力。
- 🟡 **Tabbed Pane 多会话工作台** — PR #5322 呈现了 WebUI 从「单会话窗口」向「IDE 式多窗格布局」演进的明确意图。

### 路标信号

WebUI 正在经历一轮**密集的交互与工程化升级**（PWA、工作台、MCP 状态可视化、focus 样式统一），说明项目重心正从「Agent 核心能力」向「面向日常使用的产品化体验」倾斜。同时，多条 channel 层修复（缩进、消息分割）表示多平台消息一致性也是当前关注点。


## 7. 用户反馈摘要

- **正面反馈：** Issue #5333 作者（1790374044）对项目表达了感谢（"thank you for creating such an amazing project"），并给出了 OpenRouter server tools 的清晰配置路径建议，说明社区对项目认可度高，且愿意为缺失功能提供解决方案。

- **真实痛点：**
  - **MCP 网页授权无法完成**（#5297）：用户使用需要 OAuth 授权的商业 MCP 服务（如 XMind）时，nanobot 无法完成授权流程，限制了 MCP 生态的接入范围。
  - **重复回复/系统循环**（#5256、#5327）：两位用户独立反馈 Agent 在「等待用户回答」和「推理期间」出现大量重复输出，破坏对话体验并增加 token 成本。
  - **token 消耗失控**（#5324）：单次记忆整理消耗半个多月用量，用户对成本风险的担忧十分明确。
  - **多行消息缩进丢失**（#5334）：影响 Signal 等渠道中代码块/结构化内容的可读性。

- **使用场景观察：** 从反馈看，用户已把 NanoBot 用于真实生产环境（多个群组管理、记忆整理、MCP 服务接入），且对 token 成本敏感。这对项目的稳定性与预算控制能力提出了更高要求。


## 8. 待处理积压

以下为长期未响应/未合入但影响较大的 PR/Issue，建议维护者关注：

| 类型 | 编号 | 说明 | 停留时长 |
|---|---|---|---|
| PR（conflict） | [#3869 DeepSeek 消息加固：保留 content、清理 null/empty](https://github.com/HKUDS/nanobot/pull/3869) | 解决 DeepSeek v4 系列因 `content: null` 报 400、`"(empty)"` 占位符泄漏、assistant 文本被丢弃三类问题；且涉及渠道核心路径 | 约 3 个月，有 conflict 标记 |
| PR（bug fix） | [#5257 sustained-goal 空闲续跑修复](https://github.com/HKUDS/nanobot/pull/5257) | 对应 Issue #5256（数十条重复回复），已等待 6 天，修复价值高 | 6 天 |
| PR（conflict） | [#5288 Agent Plugins 与 CLI Apps 集成](https://github.com/HKUDS/nanobot/pull/5288) | 将 Agent Plugins v1 引入 CLI Apps，统一可移植技能/MCP 运行时边界，涉及架构调整 | 4 天，有 conflict 标记 |
| PR（conflict） | [#2292 OpenAI Codex 代理端点支持](https://github.com/HKUDS/nanobot/pull/2292) | 支持自定义 API Base/Key 的 Codex 代理，绕过硬编码 OAuth 流程 | 近 5 个月，有 conflict 标记 |
| Issue | [#5256 /goal 重复回复](https://github.com/HKUDS/nanobot/issues/5256) | 仍有两位用户报告同类问题，等待 PR #5257 合入 | 6 天 |
| PR（conflict） | [#4494 PWA + 移动端侧边栏手势](https://github.com/HKUDS/nanobot/pull/4494) | 原 PWA PR，已被 #5336 拆分，剩余移动端手势部分仍需决策 | 约 1.5 个月 |
| PR（conflict） | [#3323 Telegram 按群组策略覆盖](https://github.com/HKUDS/nanobot/pull/3323) | 支持不同群组不同 `group_policy`（copilot 模式/响应范围），多群运营刚需 | 近 4 个月，有 conflict 标记 |

---

*本日报由数据自动整合生成，链接指向 GitHub 原始内容。*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-11

> 数据来源：github.com/nousresearch/hermes-agent Issues/PRs | 统计周期：2026-08-10 ~ 2026-08-11

---

## 1. 今日速览

项目在过去 24 小时保持**高活跃度**：共产生 50 条 Issue 更新（48 新开/活跃，2 关闭）和 50 条 PR 更新（48 待合并，2 关闭），Issue 与 PR 双向均达到三位数流量。**但合并率极低**——今日关闭的 2 个 PR / 2 个 Issue 均为 `duplicate`，无实质代码合入，48 个 PR 积压在待合并队列，审查与 CI 通道成为当前瓶颈。值得警惕的是，今日新报告的高优先级 Bug 集中在**安全边界（凭据泄露 ×2）、数据损坏（patch 工具截断写入、state.db 反复损坏）与桌面/网关回归**；而 `#78647` God-File 重构 Epic 以 67 条评论成为社区绝对焦点，反映出用户对代码可维护性的强烈关注。无新版本发布。

---

## 2. 版本发布

无。今日无新 Release。

---

## 3. 项目进展

### 今日合并/关闭的 PR

| PR | 状态 | 说明 |
|---|---|---|
| [#83815](https://github.com/NousResearch/hermes-agent/pull/83815) | CLOSED | `fix(model-switch): dedup providers: key in configured-provider detection` —— 被标记为 **duplicate**，被 #66128 吸收。 |

### 今日关闭的 Issue

| Issue | 状态 | 说明 |
|---|---|---|
| [#83784](https://github.com/NousResearch/hermes-agent/issues/83784) | CLOSED | MoA 引用上下文修剪失效（CJK 低估）——被标记为 **duplicate**。 |

**项目推进评估**：今日没有实质性的代码合并，项目整体处于“**高输入、低输出**”状态。积极的信号是今日新提交了 10 个 PR（#83809、#83816、#83818、#83823、#83824、#83826、#83827、#83829、#83830、#83831），覆盖网关并行启动修复、Dashboard PTY 同步修复、API Server 密钥检测、ATEM 工具调用支持、Telegram 会话范围限定、Bale 平台接入等方向，待合并积压正在增加，**审查是当前项目前进的最大瓶颈**。

---

## 4. 社区热点

### 🔥 Issue 讨论热度 TOP 3

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) *Epic: Shard all 20 god files* | **67** | 仓库级 God-File 分解 Epic，明确“2026-08 起所有 god files 必须 sharded，永不回退”，社区对架构重构方向高度关注，讨论主要围绕分片策略与接口设计。 |
| [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) *Desktop renderer/GPU 100% CPU at idle* | **11** | 桌面端 Electron 空闲时 CPU 50–90% 占用，macOS 下发热严重、电池消耗最高。用户对“空闲也烧 CPU”的能耗问题普遍不满，👍 1。 |
| [#69178](https://github.com/NousResearch/hermes-agent/issues/69178) *Discord /model and /profile ignore multiplexed routes* | **8** | 多路复用配置文件模式下，原生 Discord 斜杠命令不遵守 `profile_routes` 路由，导致用户消息与命令被分发到不同 profile，造成体验分裂。 |

### 🔥 值得关注的“次热点”

- [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) *Hermes 与 OpenClaw skills 仓库污染*：6 条评论。用户同时安装 Hermes 与 OpenClaw 后，Hermes 错误列出 OpenClaw 的 skills，引发多产品共存时的数据隔离质疑。
- [#11347](https://github.com/NousResearch/hermes-agent/issues/11347) *`/detach` 后台运行请求*：👍 5 个赞，持续 4 个月仍未实现，是社区呼声较高的功能需求之一。
- [#69603](https://github.com/NousResearch/hermes-agent/issues/69603) *state.db 反复损坏*：6 条评论，一天内反复损坏 4 次，用户对数据持久化可靠性表达强烈不满。

**需求洞察**：社区热点集中在 **① 代码可维护性（god-file 重构）② 资源占用与能耗 ③ 多路复用配置的正确性 ④ 数据持久化可靠性**。前两者是高频情绪触发点，后两者是功能正确性层面的核心诉求。

---

## 5. Bug 与稳定性

> 按严重程度排列，标 🔴 为安全/数据完整性风险，🟠 为高影响回归，🟡 为并发/平台类。

### 🔴 安全与数据完整性（最严重）

| Issue | 问题 | Fix PR | 备注 |
|---|---|---|---|
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) | **默认 profile 的 secrets 泄露到 secondary profile 的 terminal 工具及 Kanban 子进程**，least-privilege 配置形同虚设 | 无 | P2，风险极高，需优先响应 |
| [#83612](https://github.com/NousResearch/hermes-agent/issues/83612) | `model_aliases` 自定义 endpoint 的 `api_key` 被静默丢弃，**默认 provider 的 key 被误发给自定义主机**（401 + 凭据泄露） | 无 | P2，needs-repro，双重安全风险 |
| [#83714](https://github.com/NousResearch/hermes-agent/issues/83714) | **patch 工具将字面量 `...[truncated]` 写入文件内容**，导致源代码文件损坏、语法错误 | 无 | P2，直接破坏用户数据 |

### 🟠 高影响回归 / 稳定性

| Issue | 问题 | Fix PR |
|---|---|---|
| [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) | 桌面端 renderer/GPU 进程空闲时 100% CPU，macOS 过热、最高能耗 | 无 |
| [#69603](https://github.com/NousResearch/hermes-agent/issues/69603) | state.db 修复后数分钟内再次损坏，schema 手术未更新 schema cookie | 无 |
| [#83791](https://github.com/NousResearch/hermes-agent/issues/83791) | **消息平台启动连接被串行化**，单个平台故障会级联拖垮所有平台 | ✅ [#83809](https://github.com/NousResearch/hermes-agent/pull/83809) |
| [#35062](https://github.com/NousResearch/hermes-agent/issues/35062) | 微信 cron 推送 v0.15 回归，`ret=-3` 静默失败 | 无 |
| [#64425](https://github.com/NousResearch/hermes-agent/issues/64425) | Dashboard 侧栏会话点击后不显示历史消息（v0.18.x 回归） | 无 |
| [#80680](https://github.com/NousResearch/hermes-agent/issues/80680) | 桌面端“Show earlier messages”在到达真正会话起点前消失 | 无 |
| [#83750](https://github.com/NousResearch/hermes-agent/issues/83750) | **API Server 无法启用**——`API_SERVER_KEY=apikey` 太短被 Gate 1 静默丢弃且无警告 | ✅ [#83826](https://github.com/NousResearch/hermes-agent/pull/83826) |
| [#83642](https://github.com/NousResearch/hermes-agent/issues/83642) | auxiliary 自动端点改写破坏 Anthropic-only 自定义网关，压缩/视觉 404 | 无 |
| [#83814](https://github.com/NousResearch/hermes-agent/issues/83814) | `/model <name>` 因 providers 键去重缺陷误报“multiple providers” | ✅ [#66128](https://github.com/NousResearch/hermes-agent/pull/66128)（待合并） |

### 🟡 并发 / 平台 / 测试

| Issue | 问题 | 备注 |
|---|---|---|
| [#24687](https://github.com/NousResearch/hermes-agent/issues/24687) / [#24731](https://github.com/NousResearch/hermes-agent/issues/24731) / [#24736](https://github.com/NousResearch/hermes-agent/issues/24736) | 三个 TOCTOU 竞态：transports 发现标志、async HTTP client 泄漏、web_tools 单例初始化 | 5 月提出至今未修，P2 |
| [#83773](https://github.com/NousResearch/hermes-agent/issues/83773) | Windows winpty 下 `submit_stdin` 追加 LF 而规范模式需 CR，stdin 永远无法到达子进程 | P2，无 PR |
| [#83743](https://github.com/NousResearch/hermes-agent/issues/83743) | `test_profile_route_and_nonmultiplexed_resolution_preserve_boundaries` 在 CI 上必失败（#83550 引入） | P2，无 PR |
| [#83792](https://github.com/NousResearch/hermes-agent/issues/83792) | `vision_analyze` 分发用户未提供且会话中不存在的媒体引用 | P2，无 PR，需要调查是否安全漏洞 |

**总体判断**：今日 Bug 报告密度极高，安全类与数据损坏类问题尤为突出。但**多数严重 Bug 尚无对应 Fix PR**（仅 #83791、#83750、#83814 有活跃 PR），修复能力明显跟不上问题发现速度。

---

## 6. 功能请求与路线图信号

### 🆕 今日新提出的功能 / 增强

| PR/Issue | 功能 | 判断 |
|---|---|---|
| [#83824](https://github.com/NousResearch/hermes-agent/pull/83824) | 支持 Muse-Glimmer-30B 原生 ATEM 工具调用标记 | 新模型适配，扩大模型选择范围，有望合入 |
| [#83827](https://github.com/NousResearch/hermes-agent/pull/83827) | 持久化 `delegate_development` 工具 + MoA 规划 + 心跳/重启协调 | 面向复杂开发任务的编排能力，方向新颖 |
| [#83829](https://github.com/NousResearch/hermes-agent/pull/83829) | Telegram `session_search` 限定当前会话范围，fail-closed | 安全 + 正确性，应优先考虑 |
| [#83816](https://github.com/NousResearch/hermes-agent/pull/83816) | 新增 Bale 平台 + 波斯语本地化 | i18n 扩展，贡献者活跃，成本低 |
| [#70015](https://github.com/NousResearch/hermes-agent/pull/70015) | `/goal --file` 从文件加载持久化目标（CLI/TUI/Desktop 三端） | 已有实现，待合并，进入路线图概率高 |
| [#73285](https://github.com/NousResearch/hermes-agent/pull/73285) | 原生 Ollama `/api/chat` 适配器（修复 num_ctx 与工具调用） | 本地模型用户刚需，needs-decision，值得关注 |

### 💡 老功能需求延续

- [#11347](https://github.com/NousResearch/hermes-agent/issues/11347)：`/detach` 后台运行，👍 5，4 个月未动，建议纳入下一版本排期。
- [#16636](https://github.com/NousResearch/hermes-agent/issues/16636)：TUI 可展开的 Tool Call 消息详情，提升调试体验。
- [#80921](https://github.com/NousResearch/hermes-agent/issues/80921)：基于 arXiv:2608.03836 的崩溃/恢复一致性测试套件提案（SIGKILL、double-resume、consume-once），具有研究价值，适合作为长期质量基建。

**路线图信号**：项目当前扩展方向集中在**更多模型接入（Muse-Glimmer、Ollama）、更多消息平台（Bale、Telegram 增强）、以及开发自动化编排（durable dev jobs）**，同时安全边界收窄（Telegram 范围限定、MCP env_file 隔离）也是明确趋势。

---

## 7. 用户反馈摘要

**真实痛点（来自 Issue 评论）**

- **能耗与发热**（[#73082](https://github.com/NousResearch/hermes-agent/issues/73082)）：“macOS battery menubar reports Hermes as the highest energy consumer and the machine gets noticeably hot”——用户对空闲 CPU 占用极度不满，这是桌面端最突出的体验问题。
- **多产品共存冲突**（[#17345](https://github.com/NousResearch/hermes-agent/issues/17345)）：用户同时使用 OpenClaw 与 Hermes，发现 skills 互相“污染”，“ls ~/.hermes/skills 并没有这些工具，但模型却能列出”。这暴露出多 Agent 生态下的数据隔离缺失。
- **安全信任危机**（[#82936](https://github.com/NousResearch/hermes-agent/issues/82936)）：用户特意强调“A secondary profile configured to be least-privilege (no cred...)”，结果默认 profile 的 secrets 仍然泄露，least-privilege 承诺被破坏，严重打击用户信任。
- **开发体验受损**（[#83714](https://github.com/NousResearch/hermes-agent/issues/83714)）：patch 工具把截断占位符写进源码文件，用户原话描述“corrupts source code files, producing syntax errors”——工具链可靠性问题直接影响开发效率。
- **历史消息丢失感**（[#64425](https://github.com/NousResearch/hermes-agent/issues/64425)、[#80680](https://github.com/NousResearch/hermes-agent/issues/80680)）：Dashboard 和桌面端均出现会话历史不可达/不显示的回归，用户对“会话管理”这一核心功能抱有高期望，连续回归会积累负面情绪。
- **设置不持久**（[#71446](https://github.com/NousResearch/hermes-agent/issues/71446)）：自定义皮肤每次重启后丢失，用户被迫手动执行 `/skin <name>`，属于“差一点就对了”的体验缺陷。
- **后台运行需求**（[#11347](https://github.com/NousResearch/hermes-agent/issues/11347)）：用户希望“exit CLI but let agent continue”，已获得 5 个 👍，在功能请求中靠前。

**整体满意度信号**：用户在认真使用产品、并愿意提交高质量反馈（含复现步骤与代码级分析），但**安全、数据完整性、性能三大问题若持续未解决，可能动摇核心用户信任**。项目对报告的响应速度（是否为 fix 提供 PR）是本日报中观察到的最大短板。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 创建 | 优先级 | 积压原因/风险 |
|---|---|---|---|
| [#11347](https://github.com/NousResearch/hermes-agent/issues/11347) `/detach` 后台运行 | 2026-04-17 | P3 / 👍5 | 社区呼声最高的功能需求之一，4 个月无排期 |
| [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) OpenClaw skills 污染 | 2026-04-29 | P2 | 涉及多产品隔离，影响真实用户，3 个月未解决 |
| [#24687](https://github.com/NousResearch/hermes-agent/issues/24687) / [#24731](https://github.com/NousResearch/hermes-agent/issues/24731) / [#24736](https://github.com/NousResearch/hermes-agent/issues/24736) TOCTOU 三连 | 2026-05-13 | P2 | 三个并发竞态已存在 3 个月，可能在生产环境导致资源泄漏与状态错乱 |
| [#15021](https://github.com/NousResearch/hermes-agent/issues/15021) 泰语翻译（discord/email/feishu） | 2026-04-24 | P3 | 贡献者已完成翻译但长期未审，i18n 贡献流程需疏通 |
| [#58784](https://github.com/NousResearch/hermes-agent/issues/58784) CJK token 低估 | 2026-07-05 | P3 | 影响东亚用户的压缩与预检判断，与 #83784 同源 |

### 待决策的长期 PR

| PR | 创建 | 状态 | 阻塞原因 |
|---|---|---|---|
| [#44772](https://github.com/NousResearch/hermes-agent/pull/44772) 移除 root npm 依赖中的 agent-browser 等 | 2026-06-12 | needs-decision | 两个月的“改法争议”，安装顺序方案未被 review 通过，影响 `hermes update` 稳定性 |
| [#69928](https://github.com/NousResearch/hermes-agent/pull/69928) Gemini 原生数组工具 schema 修复 | 2026-07-23 | P2 待合并 | 修复 Gemini 会话无法启动的阻断 Bug，已 19 天未合并 |
| [#73285](https://github.com/NousResearch/hermes-agent/pull/73285) 原生 Ollama `/api/chat` 适配器 | 2026-07-28 | needs-decision | 本地模型用户的刚需功能，需产品决策 |

### 今日新增预警

- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936)（secrets 跨 profile 泄露）与 [#83612](https://github.com/NousResearch/hermes-agent/issues/83612)（api_key 发送到错误主机）均为 **P2 安全事件**，建议维护者优先分配资源，本周内至少确定修复方案；若涉及数据泄露风险，应考虑临时缓解措施（如禁用 multiplex_profiles 或日志告警）。
- 今日 48 个 PR 待合并、仅 2 个合并/关闭（均为 duplicate），**PR 审查队列已实质积压**。建议维护者评估审查带宽，优先处理 P2 安全/稳定性修复（#69928、#74809、#68808、#66128、#83809、#83826），再推进功能型 PR。

---

*日报完。本报告基于 2026-08-11 GitHub 公开数据自动生成，所有链接指向 NousResearch/hermes-agent 原始 Issue/PR。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-11

## 今日速览

PicoClaw 过去 24 小时整体活跃度中等偏活跃：共 5 条 Issue 更新（3 活跃 / 2 关闭）和 8 条 PR 更新（2 待合并 / 6 已合并或关闭），无新版本发布。合并队列集中在安全加固、Telegram 富文本渲染、i18n 完整性和稳定性修复，说明维护者正在加速清理积压 PR 并推进通道层能力。与此同时，新开 Issue 暴露了两个配置相关盲区（webhook 参数无消费者、工具失败静默循环），其中后者已有对应修复 PR 正在等待审查。当前项目版本仍为 v0.3.1，社区主要以提交 Bug 报告和代码贡献的方式参与。

## 项目进展

今日 6 个 PR 被合并/关闭，主要推进了以下几个方向：

- **安全边界加固（重要）**：[PR #3297](https://github.com/sipeed/picoclaw/pull/3297) 已合并。将远程发送者和聊天元数据收敛到归一化的用户角色封装中，而非直接放入 provider system instructions；远程执行默认禁用、需独立逐次审批，并在执行时再次强制来源策略；同时完成配置迁移到 schema v4。这是一次纵深防御的实质性改进，提升了多租户环境下远程提示词注入和未授权执行的防护能力。
- **通道稳定性修复**：[PR #3295](https://github.com/sipeed/picoclaw/pull/3295) 已合并。修复 `SplitMessage` 在 opening fenced-code info string 过长时可能永久挂起的问题，改为有界 raw split 保证进度，并附带回归测试覆盖。对 Telegram 长消息发送的可靠性有直接帮助。
- **Telegram 表格体验升级**：[PR #3327](https://github.com/sipeed/picoclaw/pull/3327) 已合并。识别 GFM 表格及支持的 HTML `<table>` 块（排除行内代码/围栏代码示例），改用 Bot API 富消息发送，替代原有等宽代码块。这会显著提升 Telelgram 上表格类数据的可读性。
- **构建与 CI 修复**：[PR #3326](https://github.com/sipeed/picoclaw/pull/3326) 已合并。移除 `web/frontend/pnpm-lock.yaml` 中两条重复的 `semver@7.8.5` 映射项，修复 `pnpm install --frozen-lockfile` 失败的问题。
- **i18n 完善**：[PR #3296](https://github.com/sipeed/picoclaw/pull/3296) 已合并，补齐捷克语 code wrap 标签。
- **历史修复收拢**：[PR #1547](https://github.com/sipeed/picoclaw/pull/1547) 已关闭，将 #1466 与 #1465 两个待合并 PR 的修复合并到了一起，属于清理历史积压动作。

## 社区热点

- **[Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)（OPEN，3 条评论）**：当聊天通过 dispatch rules 被路由到非默认 agent 时，`/clear` 命令与 session 自动压缩都失效。该问题源于多 agent 路由场景下的会话边界管理，社区讨论了 3 条评论尚未定性根因。指向 dispatch 功能存在测试覆盖盲区。
- **[Issue #3294](https://github.com/sipeed/picoclaw/issues/3294)（CLOSED，3 条评论）**：用户配置了多个 model_list 模型，但 `/list models` 只显示当前模型和 provider，与命令描述 "Configured models" 不符。该 Issue 最终被标记为 stale 并关闭，但背后反映的是多模型配置可见性不足的实际诉求，值得维护者考虑是否在下个版本改进命令输出语义。
- **[Issue #3298](https://github.com/sipeed/picoclaw/issues/3298)（CLOSED，2 条评论）**：AI Router 维护者主动提出为其项目添加 OpenAI-compatible provider 预设的贡献请求。虽被关闭，但说明社区开始出现针对第三方路由服务的集成诉求，未来可关注是否纳入 provider 预设体系。

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 状态 | 说明 | 对应 Fix PR |
|---|---|---|---|---|
| **高** | [#3311](https://github.com/sipeed/picoclaw/issues/3311) 工具以相同错误反复失败时，静默循环至 `max_tool_iterations`，用户永远收不到回答 | OPEN | 生产中观察到的真实故障：Telegram 用户请求执行 git 命令后长时间无响应，直到循环耗尽 | 已有 [PR #3312](https://github.com/sipeed/picoclaw/pull/3312)，待审查 |
| **中** | [#3301](https://github.com/sipeed/picoclaw/issues/3301) `/clear` 和 session 自动压缩在非默认 agent（dispatch rules 路由）下失效 | OPEN | 会话管理在特定路由配置下部分失效，影响日常使用，暂未有 fix PR | 无 |
| **中低** | [#3328](https://github.com/sipeed/picoclaw/issues/3328) `webhook_host` / `webhook_port` 配置项有默认值、有文档，但代码中从未被读取，设置后无效且无警告 | OPEN | 配置系统存在"看似有效实则无效"的坑，容易误导用户排查 | 无 |

另外，已合并的 [PR #3314](https://github.com/sipeed/picoclaw/pull/3314)（OPEN）修复了 `customAllowPatterns` 不生效（默认 deny 模式总是优先于自定义允许列表），使得 `git push` 等命令虽在允许列表中仍被阻止的问题。

## 功能请求与路线图信号

- **[Issue #3298](https://github.com/sipeed/picoclaw/issues/3298)**：请求将 AI Router 作为 OpenAI-compatible provider 预设内置。当前用户可通过通用 `openai` provider + `api_base` 连接，但无法直接按名称选择路由策略，集成友好度不足。该请求最终被关闭，若社区呼声持续，下一版本有可能会增加命名 preset 机制。
- **[PR #3327](https://github.com/sipeed/picoclaw/pull/3327)** 是今日已合并的功能类 PR，也提供了一个路线图信号：项目正从代码块兜底渲染走向富消息原生化，未来其他通道（Discord、Slack）也可能跟进。
- **[PR #3312](https://github.com/sipeed/picoclaw/pull/3312)** 虽为 Bug 修复，但其"工具连续相同失败时提前终止轮次"的机制，实际上是 agent 循环的**行为改进**，不只是修 bug，可能被纳入下一版的 agent 稳定性特性。

## 用户反馈摘要

- **多模型配置可见性**（[#3294](https://github.com/sipeed/picoclaw/issues/3294)）：用户配置了多个模型后，`/list models` 命令展示不完整，与命令描述不符。这类人会期待在 Telegram 侧获得完整的模型清单以便切换。
- **路由场景下的会话管理失效**（[#3301](https://github.com/sipeed/picoclaw/issues/3301)）：用户使用 dispatch rules 将聊天路由到非默认 agent 后，`/clear` 和自动压缩都不工作。用户明显在真实多机器人分诊或专用 agent 工作流中重度依赖该能力，受挫感较强。
- **工具失败时无反馈**（[#3311](https://github.com/sipeed/picoclaw/issues/3311)）：用户在生产 Telegram 环境中发送请求后几分钟无任何回复，最终不了了之。该场景下用户的信任损失比报错更严重——至少应该有一个"无法完成"的提示。提交者 lucapette 同时附上了修复 PR，体现用户即开发者的良性参与。
- **配置无效但无提示**（[#3328](https://github.com/sipeed/picoclaw/issues/3328)）：用户发现 webhook_host/webhook_port 设置后没有任何效果，也没有 warning，需要翻代码才能确认是配置被忽略。这类"静默失效"的配置体验是开发者社区最容易产生挫败感的问题之一。

## 待处理积压

以下 Issue / PR 已存在较久但尚未解决，建议维护者重点关注：

- **[Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)**（2026-07-29 创建，最后更新 08-10）：非默认 agent 的 `/clear` 与自动压缩失效，已 12+ 天无实质进展，属于影响日常使用的会话管理缺陷。
- **[PR #3312](https://github.com/sipeed/picoclaw/pull/3312)**（2026-08-02 创建）：修复工具重复失败导致用户无响应的问题，直接对应生产环境事故，已等待 8 天，建议尽快审查合并。与 [Issue #3311](https://github.com/sipeed/picoclaw/issues/3311) 直接关联。
- **[PR #3314](https://github.com/sipeed/picoclaw/pull/3314)**（2026-08-03 创建）：修复 `customAllowPatterns` 被默认 deny 规则覆盖的问题，虽已有测试佐证，但同样已等待 7 天以上，是安全配置与易用性之间的关键修复。
- **[Issue #3328](https://github.com/sipeed/picoclaw/issues/3328)**（2026-08-11 创建）：新报告但根因明确（配置无 consumer），可快速在下一版本中要么实现、要么移除文档并给出告警，避免继续误导用户。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时内 NanoClaw 项目保持高度活跃：共产生 3 条 Issue 更新（全部为新开/活跃，无关闭），PR 更新达 22 条，其中 11 条已合并/关闭、11 条待合并。值得关注的是，今日 3 条新 Issue 均聚焦于"消息被静默丢弃"这一核心稳定性问题，社区对消息可靠性的焦虑明显上升；与此同时，远程 Streamable HTTP MCP 服务器支持（#3092 及后续扩展）在本日正式合并，标志着项目在 MCP 生态集成方面迈出关键一步。整体来看，项目正处于功能扩展与稳定性加固并行的快节奏迭代期，维护者响应积极，社区贡献密度较高。

---

## 3. 项目进展

今日合并/关闭了 11 条 PR，其中多项具有里程碑意义：

### 🌟 核心功能推进

- **[#3092] 支持远程 Streamable HTTP MCP 服务器** — 合并 [PR #3092](https://github.com/nanocoai/nanoclaw/pull/3092)
  引擎与 Claude provider 现已接受 `{ type: 'http', url }` 形式的远程 MCP 服务器配置，打破了此前仅支持 stdio 的限制。该功能由核心团队成员 amit-shafnir 贡献，自 7 月 19 日开发至今日合并，历时约 3 周。

- **[#3221] 远程 Streamable HTTP MCP 扩展至 codex 和 opencode providers** — 合并 [PR #3221](https://github.com/nanocoai/nanoclaw/pull/3221)
  在 #3092 的基础上将远程 HTTP MCP 支持同步推广到 codex 和 opencode 两个 provider，使全部主流后端均可使用统一的 MCP 远程配置。

- **[#3228] 修复 turn-scoped 聊天投递去重** — 合并 [PR #3228](https://github.com/nanocoai/nanoclaw/pull/3228)
  解决了同一 turn 内聊天消息可能被重复投递的问题，提升消息投递的精确性。

### 🔧 权限与安全加固

- **[#3222] 新增 opt-in 隐私安全 DM 日志** — 合并 [PR #3222](https://github.com/nanocoai/nanoclaw/pull/3222)
  引入 `privacySafeLogs` 可选配置，启用后日志将省略用户 ID、handle、messaging-group ID 等敏感信息，同时保留非识别的渠道上下文，兼顾可观测性与隐私保护。

- **[#3215] 编辑 DM 解析日志** — 合并 [PR #3215](https://github.com/nanocoai/nanoclaw/pull/3215)
  对 DM 解析过程中的日志进行信息脱敏处理。

### 🧹 架构重构（zvi-fried 系列）

- **[#3212] 模块迁移注册表** — 合并 [PR #3212](https://github.com/nanocoai/nanoclaw/pull/3212)
- **[#3213] 问题渲染器注册机制** — 合并 [PR #3213](https://github.com/nanocoai/nanoclaw/pull/3213)
- **[#3214] 统一模块生命周期钩子** — 合并 [PR #3214](https://github.com/nanocoai/nanoclaw/pull/3214)
- **[#3186] 为主机添加技能自有功能接缝** — 合并 [PR #3186](https://github.com/nanocoai/nanoclaw/pull/3186)

以上 4 条重构 PR 由同一贡献者 zvi-fried 在数日内连续提交并合并，为模块注册、生命周期管理和技能扩展建立了更清晰、统一的架构基础，整体降低了后续新增渠道和技能的复杂度。

### 📝 文档

- **[#3216] hardened-image 指南补充 install_packages 的适用边界** — 合并 [PR #3216](https://github.com/nanocoai/nanoclaw/pull/3216)

---

## 4. 社区热点

今日社区讨论热度相对分散，评论数最多的 Issue 均只有 1 条评论，但三条新开 Issue 全部聚焦于消息可靠性问题，形成明显的话题聚集：

- **[Issue #3226] 平台复用 message id 导致入站消息被静默丢弃** — [链接](https://github.com/nanocoai/nanoclaw/issues/3226)
  由 dweekly 报告，描述当平台在同一会话中复用消息 ID 时，入站消息会被静默丢弃，用户侧表现为"agent 无视了我"。该 Issue 发布不到 24 小时即获得 1 条评论，且已出现对应修复 PR #3224，反映维护者对这一问题的快速响应。

- **[Issue #3075] 长时间运行后日志丢失 + 入站消息重复插入错误** — [链接](https://github.com/nanocoai/nanoclaw/issues/3075)
  虽为 7 月 17 日创建的老 Issue，但仍在 8 月 10 日获得更新，说明问题持续受关注。该 Issue 同时涉及两个稳定性问题，且提到了 systemd unit 缺失的运维痛点。

**分析**：社区对消息可靠性的关注度明显升高。"静默丢弃"类问题的共同危害在于——失败对用户不可见，极易被误判为"AI 能力不足"而非系统缺陷，这直接侵蚀用户对 NanoClaw 的信任。三条 Issue 指向同一类问题，可能暗示需要更系统的消息投递保障机制。

---

## 5. Bug 与稳定性

今日报告的 3 个 Issue 均为 Bug，按严重程度排序如下：

### 🔴 高严重度

- **[Issue #3226] 入站消息被静默丢弃（平台复用 message id）** — [链接](https://github.com/nanocoai/nanoclaw/issues/3226)
  影响所有使用可能复用消息 ID 的平台的用户。消息丢失后无任何用户可见错误，与"agent 忽略用户"在体验上无法区分。**已有对应修复 PR #3224**（[链接](https://github.com/nanocoai/nanoclaw/pull/3224)），由报告者本人提交，方案为在 session-db 中保留跨平台 ID 复用的入站消息。

### 🟠 中高严重度

- **[Issue #3075] 长时间运行后日志丢失 + duplicate-insert 错误；无 systemd unit** — [链接](https://github.com/nanocoai/nanoclaw/issues/3075)
  报告于 7 月 17 日，至今仍开放。涉及运行稳定性（长时间 uptime 后出现日志静默丢失）和部署体验（未安装 systemd unit）两个维度。**目前无关联 fix PR**，建议维护者优先排查。

### 🟡 中严重度

- **[Issue #3223] 定时任务出错时产生无法路由的错误消息并被静默丢弃** — [链接](https://github.com/nanocoai/nanoclaw/issues/3223)
  当定时任务触发的 turn 抛出错误时，错误被写为 `chat` 消息但缺少路由字段（任务消息按设计不携带路由信息），导致错误消息无法投递，操作者完全不知道任务失败。**当前无对应 fix PR**，但该问题与 #3226 同属"静默丢失"范畴，有望在消息可靠性专项中一并解决。

---

## 6. 功能请求与路线图信号

- **Agent Plugins 1.0.0（模板→插件格式迁移）** — **PR #3220** 开放中，[链接](https://github.com/nanocoai/nanoclaw/pull/3220)
  核心团队成员 amit-shafnir 提出的重大格式迁移：将 agent templates 升级为 Agent Plugins 1.0.0 目录结构。同时包含安全加固（stamp-time symlink/caps/secret 加固）。结合 **PR #2909**（[链接](https://github.com/nanocoai/nanoclaw/pull/2909)，设置向导中的模板流程）来看，Agent 模板/插件系统正在经历一次完整的迭代升级，很可能出现在下一版本中。

- **CLI 有界 JSON 输入** — **PR #3218** 开放中，[链接](https://github.com/nanocoai/nanoclaw/pull/3218)
  为 host 和 container 的 `ncl` 客户端添加 `--stdin-json` 输入模式，支持有界、结构化的参数传递。作为一个独立的 CLI 增强，合入门槛较低，有望快速并入。

- **Telegram 配对安全加固（CSPRNG）** — **PR #3229** 开放中，[链接](https://github.com/nanocoai/nanoclaw/pull/3229)
  将 Telegram 配对码从 `Math.random()` 迁移到 `crypto.randomInt`，并将码长从 4 位扩展。另一条 **PR #3225**（[链接](https://github.com/nanocoai/nanoclaw/pull/3225)）做了类似方向的加固（含文件权限修复）。两条 PR 功能重叠，需关注维护者如何整合。

- **事务性升级** — **PR #3195** 开放中，[链接](https://github.com/nanocoai/nanoclaw/pull/3195)
  由 glifocat 提交，使 NanoClaw 的升级过程具备事务性，降低升级中断风险。属于长期稳定性投资。

---

## 7. 用户反馈摘要

- **"The agent ignored me" 是最让人困惑的失败模式** — Issue #3226 中，用户指出消息被静默丢弃时，从他们视角来看就是"agent 无视了我"，没有任何错误提示。这一反馈揭示了当前系统在可观测性方面的短板——失败不可见比失败本身更伤害用户体验。

- **部署和运维的"最后一公里"仍是痛点** — Issue #3075 报告者明确提到"no systemd unit installed"，说明在 WSL2/Docker 环境外的原生部署场景中，NanoClaw 的服务管理仍不够完善。类似的运维痛点还包括长时间运行后的稳定性，这类问题通常需要用户重启实例才能恢复。

- **定时任务失败不可达是自动化工作流的隐患** — Issue #3223 描述了定时任务场景下错误消息因缺少路由信息而被丢弃的问题。对依赖自动化任务的用户来说，这种"安静失败"意味着业务流程中断却毫无感知，属于高影响低可见性的缺陷。

---

## 8. 待处理积压

以下为长期未响应或未解决的重要条目，建议维护者重点关注：

- **[Issue #3075] 长时间运行后日志丢失 + duplicate-insert 错误；no systemd unit** — [链接](https://github.com/nanocoai/nanoclaw/issues/3075)
  创建于 7 月 17 日，已近 4 周，至今仍开放且无关联 fix PR。涉及消息可靠性和部署体验两个维度，建议尽快确认优先级。

- **[PR #2134] Apple Silicon + Colima 环境变量纳入 launchd plist** — [链接](https://github.com/nanocoai/nanoclaw/pull/2134)
  创建于 4 月 29 日，已等待超过 3 个月。这是 Apple Silicon 用户原生运行 NanoClaw 的重要补全，长期未被合并可能形成平台支持缺口。

- **[PR #2909] 设置向导中的模板流程与首 agent 标记** — [链接](https://github.com/nanocoai/nanoclaw/pull/2909)
  创建于 7 月 2 日，与 #3220（Agent Plugins）直接关联。若 #3220 合并，该 PR 需要同步推进，两条 PR 很可能需要一并规划进入下一个版本。

- **[Issue #3223] 定时任务错误消息无法路由被静默丢弃** — [链接](https://github.com/nanocoai/nanoclaw/issues/3223)
  虽然创建仅 1 天，但属于消息可靠性问题群的一部分，建议与 #3226 合并评估，统一设计修复方案。

---

*本日报基于 NanoClaw GitHub 仓库 2026-08-11 数据自动生成。*
*数据来源：github.com/nanocoai/nanoclaw*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去24小时内，NullClaw 项目整体活跃度处于低位：无新 Issues、无 PR 更新、无版本发布。唯一动态为 Issue #700 于今日被关闭，结束了一个长期挂起的 A2A 客户端功能请求。该 issue 自 2026-03-23 提出，历经约五个月后关闭，表明项目可能在非公开状态下推进了相关功能落地，但今日并无对应的代码合并记录。综合来看，项目目前处于低强度维护期，社区讨论与贡献节奏放缓。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有 PR 被合并或关闭，因此没有直接的代码变更记录。不过 Issue #700 的关闭是一个值得关注的状态变化：该 issue 请求为 nullclaw 添加 A2A 协议（v0.3.0）的客户端实现，若关闭原因是相关功能已通过其他 PR 或分支完成，则意味着项目的能力边界从“仅提供 A2A 服务端”扩展到了“可调用远程 A2A 智能体”，这将是架构层面的一个有意义的前进步伐。具体合并内容需要跟进相关分支或 PR 历史验证。整体来看，今日在公开 数据层面项目并未向前推进，更多是积压问题的清理。

---

## 4. 社区热点

### Issue #700：Add a2a_call client tool for calling remote agents

- **链接**: https://github.com/nullclaw/nullclaw/issues/700
- **作者**: georgeglarson
- **创建时间**: 2026-03-23
- **更新时间**: 2026-08-10
- **评论数**: 1
- **👍 数**: 1

这是今日唯一有更新的 issue，也是唯一产生讨论的议题。虽然点赞和评论数量不多，但该请求本身代表了社区中一个明确的使用诉求：多实例互联。作者描述了他运行两个 nullclaw 实例的场景——一个面向公众的 "doorman"，一个私有个人代理，希望通过 `a2a_call` 工具使二者能够通过 `message/send` JSON-RPC 进行通信。这一需求在联邦式个人 AI 代理架构中具有较强的代表性，也反映出用户对 nullclaw 从单一实例向分布式协作网络演进的期待。

---

## 5. Bug 与稳定性

今日无新的 Bug、崩溃或回归问题报告。项目稳定性方面没有新增负面信号，但低提交量也意味着稳定性改善的公开反馈同样有限。

---

## 6. 功能请求与路线图信号

Issue #700 是本周期内最明确的功能请求：**A2A 客户端调用能力**。该 issue 今日关闭，可能意味着：

1. 该功能已通过其他途径实现（需核查隐藏分支或未公开 PR）；
2. 维护者认为当前架构不适合引入此功能而关闭；
3. issue 被转移至其他仓库或工单系统。

无论哪种情况，**A2A 客户端能力** 都应是未来路线图上的重要候选特性。结合 nullclaw 自身即 A2A 协议服务端的定位，实现客户端调用将形成闭环，使 nullclaw 实例间可以互联互通。建议维护者在后续版本说明中明确该 issue 的关闭原因，以便社区知晓计划。

---

## 7. 用户反馈摘要

来自 Issue #700 的真实使用场景反馈：

- 用户实际部署了**两个 nullclaw 实例**，一个是“面向公众的门卫”，一个是“私有个人代理”。
- 他希望通过标准 A2A 协议让实例间互相通信，而不是依赖外部转换层。
- 该请求收到的 👍 说明至少另有一位社区成员有类似需求。

这一反馈揭示了用户对**实例间互操作性**的需求强度：用户已在测试多进程/多角色部署模式，缺少的正是官方提供的 client-side 通信工具。

---

## 8. 待处理积压

### 无新增积压记录

今日数据中没有显示长期未响应的重要 Issue 或 PR（例如长时间无维护者回复的 issue）。但考虑到 Issue #700 从 2026-03-23 提出到今日关闭，中间间隔了约五个月，这本身反映出**维护者对社区提交的响应周期较长**。若项目希望提升社区活跃度，建议关注 issue 与 PR 的首次响应时间（time-to-first-response）。

> 📌 提醒维护者：若有与 Issue #700 关联的 PR 或实现已合入，请在 issue 评论中留下指向性说明，方便追踪功能落地版本。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-11

---

## 1. 今日速览

过去24小时 IronClaw 保持高活跃度：共发生 **50 条 Issue 更新**（新开/活跃 24 条，关闭 26 条）与 **50 条 PR 更新**（待合并 35 条，合并/关闭 15 条），并发布 1 个 Release 候选版本 `v1.1.1-rc.1`。值得关注的是，今日新开 Issue 中集中出现了一批由 `serrrfirat` 提交的 loop/agent 子系统缺陷（token 估算、上下文窗口驱逐、死代码等），同时一个新的大型 Epic（#7482，可插拔 Agent 循环）标志着架构方向正在向“内核化”演进。结合 `v1.1.1-rc.1` 紧急补丁的发布，项目当前正处于 **活跃开发与稳定化并行的双轨阶段**，社区讨论热度集中于 CI 资源消耗与 Agent 行为准确性两大主题。

---

## 2. 版本发布

### ironclaw-v1.1.1-rc.1（2026-08-10）

> 链接：https://github.com/nearai/ironclaw/releases

**Release Notes 摘要：**

该版本是 1.1 产品线的**紧急补丁候选版本**，聚焦以下领域：

- **Channel delivery 与 pairing**：修复通道消息投递与配对流程中的已知问题；
- **IronHub / 自定义 MCP 兼容性**：改善与 IronHub 技能仓库及第三方 MCP 服务器的集成兼容性；
- **WebUI streaming 稳定性**：针对 WebUI 流式响应的稳定问题进行了专项修复；
- **Durable retrieval**：强化持久化检索链路的可靠性；
- **安全升级**：支持从两个受支持的稳定前序版本进行安全迁移。

**破坏性变更与迁移注意：**

- Release Notes 明确提示：**从 1.0.0 升级时需要停止所有写入器（Stop all writers）**。该警告指向数据迁移期间存在写入冲突风险，升级前需协调停机窗口。
- 作为 RC 候选，1.1.1 正式版预计将在近期发布，当前 RC 版本适合在测试环境验证上述修复后再进入生产。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖了多个功能模块，核心进展包括：

### 已合并/关闭的突出 PR

| PR | 关键内容 | 影响 |
|---|---|---|
| [#7410](https://github.com/nearai/ironclaw/pull/7410) | **tool-search 公平发现与基准测试**（closed） | `tool_search` 现在返回有界完整输入签名，免除了部分场景下的强制 `tool_describe` 往返；同时引入语义命名空间摘要与确定性代表性工具轮。对应 Issue #7405 关闭，**v1.3.0 范围项落地**。 |
| [#7442](https://github.com/nearai/ironclaw/pull/7442) | **安装 catalog 已发布的包**（closed） | 为 IronHub 技能安装全部配套文件，包含规范化路径校验、摘要验证与聚合控制，接替 #7076 并保留原作者提交。 |
| [#7325](https://github.com/nearai/ironclaw/pull/7325) | **`origin_gate_matrix` 默认值修复**（closed） | 缺省时自动采用安全交互默认配置（`loop_run = "gated_unless_granted"`，其余 `forbidden`）而非 fail-closed，降低了扩展接入门槛。 |
| [#7436](https://github.com/nearai/ironclaw/pull/7436) | **内存搜索结果长度限制**（closed） | 将原生 memory-search 结果限制为 8 KiB UTF-8 原始内容，防止大结果集撑爆上下文。 |
| [#7493](https://github.com/nearai/ironclaw/pull/7493) / [#7494](https://github.com/nearai/ironclaw/pull/7494) | **CI 覆盖率门禁修复**（closed） | 恢复 main 分支覆盖率栅栏，覆盖 Telegram 运行反应映射、供应商限流等路径。 |
| [#7495](https://github.com/nearai/ironclaw/pull/7495) | **计划触发的无值守运行协议**（closed） | 为 `ScheduledTrigger` 信任来源增加 loop 拥有的无值守运行协议。 |

### 整体评估

今日关闭的 Issue 中，包括了一批**架构治理类问题**（#7145 extension_host 分层、#7147 架构基线漂移、#7151 composition 质量门失效、#7149 同层耦合、#7150 vendor 许可盲区）和**QA 类问题**（#7294、#7247 等 bug_bash P1 项），说明维护者正在系统性地清理 8 月初审计/测试中暴露的技术债。当前仍有 **35 条 PR 待合并**，其中多条为 XL 级大 PR，短期内合并压力不小。

---

## 4. 社区热点

### 讨论最活跃的 Issue

| Issue | 评论数 | 主题 | 热度分析 |
|---|---|---|---|
| [#7137](https://github.com/nearai/ironclaw/issues/7137) | 12 | **live-canary CI 制品过大**（703MB–1.5GB/分片，总计超 5GB） | 开发者对 GitHub Actions 存储配额与下载耗时的直接抱怨，工程效率类诉求，讨论热度最高。 |
| [#7145](https://github.com/nearai/ironclaw/issues/7145) | 4 | **extension_host → loops 分层重构的规模评估方法** | 架构治理类讨论，涉及“以文件数 vs 端口残差”作为规模基准的方法论争议。 |
| [#7482](https://github.com/nearai/ironclaw/issues/7482) | 3 | **Epic: 可插拔 Agent 循环（ACP 执行器 + 边缘凭据注入 + 内核架构）** | 新开的战略级 Epic，虽评论数不多但刚创建即获 3 条讨论，说明社区对架构方向有即时反馈。 |

### 趋势观察

社区讨论呈现 **“工程效率”与“架构演进”并重** 的态势：一方面，CI 存储膨胀、大型 PR 的评审效率成为高频痛点；另一方面，#7482 所勾勒的“IronClaw 作为内核（kernel）+ 外部 ACP Agent”的方向，标志着项目正在从单体 Agent 框架向可组合的平台层演进。这一转向可能对现有扩展生态和工具开发范式带来深远影响。

---

## 5. Bug 与稳定性

### 高优先级

| Issue | 严重度 | 描述 | Fix PR 状态 |
|---|---|---|---|
| [#7485](https://github.com/nearai/ironclaw/issues/7485) | **高** | **Token 估算器双倍计数 ASCII**（`bytes/2` 导致 2 字符/token），等效将上下文窗口减半；且存在两个不一致的估算器 | 无 PR，今日新开 |
| [#7484](https://github.com/nearai/ironclaw/issues/7484) | **高** | **上下文窗口静默驱逐用户任务消息**（128 条硬编码上限），无压缩机制，可导致任务丢失 | 无 PR，今日新开 |
| [#7488](https://github.com/nearai/ironclaw/issues/7488) | 中高 | **bridge 工具硬编码 `ConcurrencyHint::Exclusive`**，`tool_search`/`tool_describe` 为无副作用查询却被串行化 | 无 PR，今日新开 |
| [#7487](https://github.com/nearai/ironclaw/issues/7487) | 中高 | **`tool_search` 不返回 schema 就标记已披露**，解除 describe-first 安全网；`oneOf` required 塌缩为空 | 无 PR，今日新开 |
| [#7486](https://github.com/nearai/ironclaw/issues/7486) | 中 | **无进展逃逸误报**：幂等读/轮询操作因输出哈希不变被判为 `NoChange` 而终止 | 无 PR，今日新开 |
| [#7490](https://github.com/nearai/ironclaw/issues/7490) | 中 | **`retry_disposition()` 为死代码**：~25 类瞬态失败分类表从未接线 | 无 PR，今日新开 |

### 遗留问题

| Issue | 创建时间 | 描述 | 状态 |
|---|---|---|---|
| [#6257](https://github.com/nearai/ironclaw/issues/6257) | 2026-07-19 | **PDF 文件发送/生成报 `Invalid value (attachments.mime_type)`** | 仍开放，3 条评论，疑似客户端类型校验问题 |
| [#3762](https://github.com/nearai/ironclaw/issues/3762) | 2026-05-18 | **Web UI 编辑 AGENTS.md 不更新系统提示词** | 仍开放，v1.3.0 范围，2 条评论 |

**稳定性小结：** 今日新开 Bug 集中在 **loop/turn-runner 子系统**，且均为代码审查中发现的逻辑缺陷（而非偶发崩溃），反映该子系统正处于密集重构期，相关修复预计将通过 #7491（OMP core-tool 迁移）和 #7435 一并落地。目前仅 1 条今日 Bug（#7483）有对应修复 PR（#7492）。

---

## 6. 功能请求与路线图信号

### 战略级信号

- **[#7482 — Epic: 可插拔 Agent 循环](https://github.com/nearai/ironclaw/issues/7482)（新开）**
  IronClaw 将定位为 **“内核”**——负责调度、租户隔离、能力膜、密钥中介、出口边界、持久审计与入站通道；Agent 循环和逐集成的工具代码改为使用 **现成的 ACP Agent**。这是继 Reborn 重构后最重大的架构方向声明，可能影响后续数个里程碑的投入分配。

- **[#7496/#7499 — IdentyClaw Passport 宿主中介](https://github.com/nearai/ironclaw/issues/7496)**
  社区贡献者提出为 processless/secure-default 环境增加 `builtin.idcp` 宿主接缝，使 Agent 可调用 IdentyClaw Passport 而无需 shell。**同日已有对应 PR #7499**（XL 级），说明该需求被快速接纳。

### 功能性请求

| Issue | 请求内容 | 对应 PR / 状态 |
|---|---|---|
| [#7483](https://github.com/nearai/ironclaw/issues/7483) | 默认 NEAR AI 连接/模型探测使用已认证会话；API key 留空时 `test-connection`/`list-models` 失败 | [#7492](https://github.com/nearai/ironclaw/pull/7492)（已开，M 级） |
| [#7481](https://github.com/nearai/ironclaw/issues/7481) | WebUI 左侧导航中长标题 hover 显示完整内容 | 无 PR，小改进 |
| [#7489](https://github.com/nearai/ironclaw/issues/7489) | `result_read` 24 KiB 预览上限 + 读取前全量读取门槛 | 期望通过 [#7435](https://github.com/nearai/ironclaw/issues/7435) OMP 切换解决 |

### 路线图判断

`v1.3.0` 范围中已有多个条目落地或推进：#7405（tool_search 签名完整性）已由 #7410 关闭，[#3762](https://github.com/nearai/ironclaw/issues/3762)（AGENTS.md 系统提示词）仍在列。结合新 Epic #7482 与 #7491（OMP 编码工具契约），**1.3 版本可能同时包含“coding-tool 面重构”和“Agent 循环内核化”两大结构性变更**，建议关注其兼容性计划。

---

## 7. 用户反馈摘要

- **PDF 文件处理受阻（[#6257](https://github.com/nearai/ironclaw/issues/6257)）**：用户报告发送/生成 PDF 时出现 `Invalid value (attachments.mime_type)` 错误，推测为类型校验问题，已持续 3 周无修复，影响文档类工作流。
- **Agent“假记忆/假状态”问题（[#7294](https://github.com/nearai/ironclaw/issues/7294)、[#7247](https://github.com/nearai/ironclaw/issues/7247)）**：QA 测试中发现 Agent 在 Telegram 例程和 GitHub 连接场景中**未经验证就声称“已设置/已连接”**，随后又发现实际不存在对应配置。此类“幻觉式确认”对用户信任伤害较大，虽今日均已关闭，但建议关注其修复是否覆盖根本原因。
- **Slack 集成设置失败（[#6834](https://github.com/nearai/ironclaw/issues/6834)，已关闭）**：用户报告 near.foundation 账户下 Slack 连接流程无法完成，扩展处于不可用状态，已随修复关闭。
- **CI 制品体积痛点（[#7137](https://github.com/nearai/ironclaw/issues/7137)）**：开发者在 issue 中反馈 5GB+ 的 CI 产物使下载变慢、耗尽配额，属于工程体验类反馈，暂未发现对应优化 PR。
- **配置编辑不生效（[#3762](https://github.com/nearai/ironclaw/issues/3762)）**：用户编辑 AGENTS.md 保存成功但系统提示词不变，属于“静默失败”场景，用户困惑度高，已在 v1.3.0 排期中。

---

## 8. 待处理积压

以下为长期开放或存在卡点的问题/PR，建议维护者关注：

| 项目 | 类型 | 创建时间 | 时长 | 备注 |
|---|---|---|---|---|
| [#3762](https://github.com/nearai/ironclaw/issues/3762) | Issue | 2026-05-18 | **85 天** | AGENTS.md 编辑不更新系统提示词；v1.3.0 范围内但长期未动 |
| [#6257](https://github.com/nearai/ironclaw/issues/6257) | Issue | 2026-07-19 | 23 天 | PDF mime_type 错误，无 assignee，无 PR |
| [#7001](https://github.com/nearai/ironclaw/pull/7001) | PR | 2026-08-01 | 10 天 | XL 级，保持系统前缀字节稳定跨模型调用；已更新至 8/11，仍在评审 |
| [#7274](https://github.com/nearai/ironclaw/pull/7274) | PR | 2026-08-06 | 5 天 | XL 级，Anthropic 提示缓存跨工具推广保持；待合并 |
| [#7284](https://github.com/nearai/ironclaw/pull/7284) | PR | 2026-08-06 | 5 天 | M 级，WebUI SSE 重连风暴限制；与 v1.1.1-rc.1 的 WebUI streaming 修复相关 |

**特别提醒：** #7001、#7274 与 #7284 三条 PR 均涉及 prompt 缓存与流式稳定性，与 1.1.1-rc.1 的修复领域高度重叠，建议评估是否需要在 1.1.1 正式版发布前完成合并，以形成完整的稳定性闭环。

---

*本报告基于 2026-08-11 的 IronClaw GitHub 仓库公开数据生成，数据窗口为过去 24 小时。所有链接均指向 github.com/nearai/ironclaw 下的对应 Issue/PR/Release。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 · 2026-08-11

## 1. 今日速览

过去 24 小时，LobsterAI 无新版本 Release，也无新增 Issue；4 条历史 Issue 被 stale 流程处理（3 条关闭、1 条保持打开）。开发侧活跃度较高：共跟踪 29 条 PR 更新，17 条进入 CLOSED 状态（多数为 8 月 10—11 日创建后快速关闭）、12 条仍在待合并队列。代码进展集中在两个方向：一是「模型思考级别可配置」功能落地（[#2457](https://github.com/netease-youdao/LobsterAI/pull/2457) + [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)），二是 cowork 功能的大量交互增强与运行时稳定性修复。整体来看，项目迭代速度快、维护者响应积极，但用户侧提报的旧问题本次多为自动关闭而非修复闭环，健康度评分中等偏上。

## 2. 版本发布

今日无新版本 Release。

## 3. 项目进展

### 模型能力：思考级别（thinking levels）可配置

- **[#2457](https://github.com/netease-youdao/LobsterAI/pull/2457) `feat(models): add configurable thinking levels`** — CLOSED（8-10 创建，8-11 关闭）。服务端驱动思考级别选项与默认值；支持 OpenClaw 产品级别名映射（`max` → runtime `xhigh`）；按会话/按 Agent 持久化，并发送版本化模型请求选项。这是「深度思考」能力的基础性改动。
- **[#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) `fix(model-selector): give each model its own thinking level`** — OPEN / 待合并。修正 #2457 中思考强度「全局一份」的缺陷，让每个模型独立记忆思考档位，避免设置模型 B 时覆盖模型 A 的选择。该 PR 应随 #2457 一并进入下一版本。

### Cowork 工作流与交互

- **[#2471](https://github.com/netease-youdao/LobsterAI/pull/2471)**：非图片附件从发送后的原始路径文本，改为可点击文件卡片展示（CLOSED）。
- **[#2472](https://github.com/netease-youdao/LobsterAI/pull/2472)**：cowork 活动分组支持折叠，降低长会话信息噪音（CLOSED）。
- **[#2473](https://github.com/netease-youdao/LobsterAI/pull/2473)**：本地文件链接新增右键菜单：打开方式、另存为、复制路径、复制内容/图片、在文件夹中显示；并新增 `dialog:saveFileCopy` IPC（CLOSED）。
- **[#2469](https://github.com/netease-youdao/LobsterAI/pull/2469)**：新增「折叠 Agent 任务」快捷键，允许修饰键快捷键在输入时生效（CLOSED）。
- **[#2468](https://github.com/netease-youdao/LobsterAI/pull/2468)**：统一 cowork 流式加载状态指示器（CLOSED）。
- **[#2476](https://github.com/netease-youdao/LobsterAI/pull/2476)**：修复 Escape 关闭弹层时内层对话框与背后面板同时响应的问题，改为仅最顶层 overlay 响应（CLOSED）。

### 稳定性与运行时修复

- **[#2454](https://github.com/netease-youdao/LobsterAI/pull/2454)**：修复 tool-loop guard 误杀正常轮询（CLOSED）。
- **[#2470](https://github.com/netease-youdao/LobsterAI/pull/2470)**：修复迟到 chat error 处理吞掉 provider/LLM 真实运行时错误（CLOSED）。
- **[#2466](https://github.com/netease-youdao/LobsterAI/pull/2466)**：增加 renderer 初始化 IPC stall 重试机制（CLOSED）。
- **[#2467](https://github.com/netease-youdao/LobsterAI/pull/2467)**：修复 Windows 运行时升级后 pip shim 残留损坏问题（CLOSED）。

### 工程化与依赖

- **[#2474](https://github.com/netease-youdao/LobsterAI/pull/2474)**：对齐 sidebar 站点图标 stroke weight（CLOSED）。
- Vite 升级：[#1766](https://github.com/netease-youdao/LobsterAI/pull/1766)（5.4.21 → 8.0.13）关闭，新 PR [#2465](https://github.com/netease-youdao/LobsterAI/pull/2465)（→ 8.2.1）打开。
- React DOM 升级：[#1764](https://github.com/netease-youdao/LobsterAI/pull/1764)（18.3.1 → 19.2.6）关闭，新 PR [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464)（→ 19.2.8）打开。

## 4. 社区热点

今日无新 Issue 提交，社区讨论热度主要来自 stale 批量处理的三条历史 Issue（均有 2 条评论）：

- **[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) Settings 未保存修改静默丢失** — 今日 CLOSED/stale。
- **[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240) API 受限后所有模型不可切换** — 今日 CLOSED/stale。
- **[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062) 任务超过最大时长后状态不可见** — 今日 CLOSED/stale。

共同诉求是「控制感」与「可见性」：配置不能静默丢、故障不能全局锁、任务不能成黑盒。开发侧对模型管理与 cowork 交互响应积极（#2457/#2473/#2475），但上述三个用户问题的修复闭环尚未在数据中体现。

## 5. Bug 与稳定性

按严重程度从高到低排列：

1. **[#1183](https://github.com/netease-youdao/LobsterAI/issues/1183)（OPEN/stale）**：openClaw 网关启动遮罩无限循环，添加模型并开关后反复提示「网关未能在规定时间内启动成功」。已存在 4 个月，无关联修复 PR。
2. **[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)（CLOSED/stale）**：单模型 API 受限导致应用全局瘫痪，所有会话均无法切换模型。被自动关闭但没有修复合入记录，需维护者复核是否已通过其他改动解决。
3. **[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)（CLOSED/stale）**：24 小时长任务超时后无法判断任务是否仍在运行，缺少任务生命周期状态提示。
4. **[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)（CLOSED/stale）**：Settings 配置未保存即关闭时静默丢失。关联 PR [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241) 也已被关闭，若未合入则该问题可能仍然存在。

今日合入的稳定性修复多为内部健壮性问题（#2454、#2470、#2466、#2467、#2476），外部可感知的崩溃/卡死类问题暂无新增报告。

## 6. 功能请求与路线图信号

今日无新功能请求 Issue，但从 PR 合入情况可读出三条路线图信号：

- **多模型精细管理**：思考级别从全局设置走向 per-model（[#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)），说明多模型混合使用场景占比在提升，选项粒度需要下沉到单个模型。
- **Cowork 本地文件工作流**：[#2471](https://github.com/netease-youdao/LobsterAI/pull/2471) 附件卡片与 [#2473](https://github.com/netease-youdao/LobsterAI/pull/2473) 文件右键菜单，使 cowork 正在从「对话工具」演变为「AI + 本地文件」的生产力工具。
- **异步任务提醒**：[#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)（任务完成时闪烁任务栏/Dock 图标）今日 CLOSED，若在后续版本合入，将补齐后台任务的前台提醒闭环。

## 7. 用户反馈摘要

- **[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)**：用户对配置丢失零容忍，期望「未保存就关闭」时出现二次确认，而不是静默丢弃。
- **[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)**：用户描述「lobsterai 整体陷入瘫痪」，且同一 API 在其他设备可用，说明应用缺少限流故障隔离与降级路径，用户语气急切（「辛苦了，请解决问题」）。
- **[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)**：长任务用户无法判断超时后任务是否还在后台运行，需要任务状态持久化与查询能力。
- **[#1183](https://github.com/netease-youdao/LobsterAI/issues/1183)**：启动阶段反复遮罩会直接破坏首次体验，需要将网关启动错误改为可恢复、可跳过的引导式处理。

## 8. 待处理积压

- **[#1183](https://github.com/netease-youdao/LobsterAI/issues/1183)（OPEN/stale，4 个月）**：网关启动遮罩循环，建议优先排查。
- **[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)、[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)**：已被 stale 自动关闭但无修复记录，建议维护者 re-check，若问题仍可复现应 reopen 并安排修复。
- **[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) / [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)**：Issue 与修复 PR 均于今日 CLOSED，若功能未合入请明确关闭原因。
- **待合并 PR**：[#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)（per-model 思考级别）、[#1181](https://github.com/netease-youdao/LobsterAI/pull/1181)（隐藏主 Agent 会话，已 4 个月）、[#2465](https://github.com/netease-youdao/LobsterAI/pull/2465)（Vite 8.2.1）、[#2464](https://github.com/netease-youdao/LobsterAI/pull/2464)（React DOM 19.2.8）。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度处于中等水平：共产生 1 条 Issue（新 Bug 报告）、2 条 PR 更新（均处于待合并状态），无新版本发布。值得关注的是，两个待合并 PR 分别针对会话管理与浏览器交互体验，呈现出项目在核心会话机制与前端可视化两个方向上的持续推进态势。项目健康度总体良好，未出现合并回退或紧急回归事件，但 Sandbox 构建失败的 Bug 需要尽快确认影响范围。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

**今日无 PR 被合并或关闭**，项目在主分支上暂无新的提交落地。

但两个正在活跃推进的 PR 值得关注，它们代表了项目当前的核心开发方向：

- **#1182 [OPEN] fix(sessions): allow deleting and archiving the main session**（更新于 2026-08-11）  
  链接：https://github.com/moltis-org/moltis/pull/1182  
  该 PR 修复 #1132，允许用户像普通会话一样删除和归档 `main` 会话。改动涉及 gateway 层删除实现与归档判定逻辑，并保留当前活跃通道会话的归档限制。若合入，将提升会话管理的灵活性和一致性。

- **#531 [OPEN] feat(browser): interactive browser viewing UI with CDP screencast**（更新于 2026-08-10）  
  链接：https://github.com/moltis-org/moltis/pull/531  
  这是一个功能型 PR，为 Settings > Browser 页面添加完整的浏览器查看与交互 UI，支持通过 CDP screencast 实时查看浏览器会话、鼠标/键盘/滚动交互、会话历史回放与操作日志，以及基于 per-agent 的浏览器 profile cookie 隔离。该 PR 体量较大，涉及功能面广，若合入将显著增强 Moltis 的浏览器自动化能力。

**项目前进判定**：虽然今日无合并动作，但 #1182 的持续更新表明会话管理修复正在收尾；#531 自 3 月提出以来仍在活跃迭代，说明该功能仍是项目重点方向之一。整体处于稳步推进状态。

---

## 4. 社区热点

今日社区讨论热度较低，所有 Issue 与 PR 的评论数均为 0，未形成明显的集中讨论。

从数据中可以观察到的两个信号：

- **#1189 [Bug] Sandbox build failing due to wrong gogcli github URL**（作者 holgzn，2026-08-10 创建）  
  链接：https://github.com/moltis-org/moltis/issues/1189  
  该 Issue 是今日唯一的社区新声，虽然暂无评论与点赞，但它直接关系到 Sandbox 构建流水线，属于开发链路阻断性问题，预计会获得维护者快速响应。

- **#531 功能型 PR 的长期活跃** 与 **#1182 会话管理修复** 虽无评论，但两者的更新频率表明项目维护者与贡献者仍在持续投入，社区贡献节奏正常。

整体观察：当前社区讨论偏冷，更多处于“贡献者推进、用户反馈待发酵”的阶段。

---

## 5. Bug 与稳定性

今日报告 1 条 Bug，严重程度评估如下：

| 严重程度 | Issue | 说明 |
|---------|-------|------|
| **高**（构建/链路阻断） | #1189 [Bug] Sandbox build failing due to wrong gogcli github URL  
  链接：https://github.com/moltis-org/moltis/issues/1189 | Sandbox 构建失败，原因为 gogcli 的 GitHub URL 配置错误。该问题直接影响沙箱环境的构建流程，可能导致依赖该环境的 CI/CD、测试或功能开发受阻。 |

**修复状态**：尚未发现关联的 fix PR，需要维护者确认该 URL 的错误位置并尽快修复。建议将 Issue 标记为 `bug` + `priority: high`，并提醒 CI 维护者介入。

---

## 6. 功能请求与路线图信号

今日未收到新的功能请求类 Issue。但两个待合并 PR 提供了明确的路线图信号：

- **浏览器交互 UI（#531）**  
  链接：https://github.com/moltis-org/moltis/pull/531  
  一旦合入，Moltis 将拥有完整的浏览器可视化交互界面，包括实时 CDP screencast、鼠标键盘操作、会话回放与历史查看。这将是“AI 智能体 + 浏览器自动化”方向的重要里程碑，也回应了用户对可视化、可操作浏览器能力的需求。

- **主会话可删除/归档（#1182）**  
  链接：https://github.com/moltis-org/moltis/pull/1182  
  这一功能修复体现了项目在会话生命周期管理上的完善，使用户不再受限于“主会话不可删除”的特殊限制，可能为后续更细粒度的会话管理（如批量操作、会话迁移）铺路。

**对下一版本的预判**：如果上述两个 PR 顺利合入，下一版本很可能围绕“会话体验优化”与“浏览器交互完整化”两个主题展开。

---

## 7. 用户反馈摘要

由于今日所有 Issue 与 PR 的评论数均为 0，没有直接的社区讨论可供提炼。仅能从 Issue 文本中获取有限信息：

- **用户对构建链路稳定性的敏感度（来自 #1189）**：  
  用户主动按照 Preflight Checklist 检查了既有 Issue 并使用了最新版本，说明社区用户具备一定的参与规范性，遇到构建问题愿意按流程反馈。该用户场景应为开发者/贡献者在使用 Sandbox 构建流程时遇到阻断，反映出构建脚本中外部依赖 URL 的维护需要更严格的审查机制。

- **长期未获反馈的功能期待（来自 #531）**：  
  该 PR 自 2026-03-31 创建至今已有超过 4 个月，虽然无直接评论，但其持续的更新时间戳（最近更新 2026-08-10）说明贡献者仍在维护，侧面反映该功能在社区中有一定需求基础。

待后续评论产生后，可进一步提炼用户真实痛点与满意度信号。

---

## 8. 待处理积压

以下 Issue/PR 长期未获足够关注或合并，建议维护团队重点关注：

| 项目 | 创建时间 | 更新状态 | 说明 |
|------|---------|---------|------|
| **#531 [PR] feat(browser): interactive browser viewing UI with CDP screencast**  
  链接：https://github.com/moltis-org/moltis/pull/531 | 2026-03-31 | 2026-08-10 有更新 | 已持续 4.5 个月，属于大型功能 PR。建议明确时间表：是否需要 review、是否计划合入到特定版本，避免长时间悬置导致分支维护成本上升及社区信心下降。 |
| **#1182 [PR] fix(sessions): allow deleting and archiving the main session**  
  链接：https://github.com/moltis-org/moltis/pull/1182 | 2026-08-01 | 2026-08-11 有更新 | 解决 #1132 的用户痛点，范围较小且修复方向清晰，建议尽快进入 review 流程并合入。 |
| **#1189 [Issue] Sandbox build failing due to wrong gogcli github URL**  
  链接：https://github.com/moltis-org/moltis/issues/1189 | 2026-08-10 | 暂无评论 | 构建阻断型 Bug，宜在一周内给出响应或修复分配，避免影响贡献者体验。 |

> 以上建议优先处理 #1189（构建紧急度），其次推动 #1182（小改动快合入），再为 #531（大功能）制定明确的里程碑计划。

---

*本日报基于 moltis-org/moltis 公开数据生成，数据采集时间截至 2026-08-11。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-11

> 数据来源：GitHub (agentscope-ai/CoPaw) | 统计窗口：2026-08-10 ~ 2026-08-11


## 1. 今日速览

CoPaw 项目今日保持高强度迭代节奏：24 小时内收到 7 条新 Issue、合并或关闭 12 条 Issue 和 25 条 PR，实际合入代码的 PR 数量占全部 PR 更新的一半以上，显示维护团队响应迅速、交付链路通畅。今日无新版本 Release（当前主线围绕 v2.1.0 收尾与 v2.1.0b3 后续补丁展开），但数项针对 Windows 桌面端稳定性、记忆系统与渠道配置的修复已完成合入，项目整体处于“发版前密集修复 + 新功能批量进入 Review”的健康状态。值得关注的是，今日社区反馈中出现了多条中文用户提交的体验类问题（公式渲染、QQ 机器人消息刷屏、日记分组错误），反映产品已进入更多非深度开发者用户的实际使用场景。


## 2. 版本发布

**无新版本发布。**

最新标签仍为 v2.1.0b3，PR #6875（`chore: update release notes for v2.1.0`）已更新 v2.1.0 的英文/中文发布说明及 README 各语言版本，预示正式版发布已临近。


## 3. 项目进展

今日共 25 条 PR 被合并/关闭，以下为对项目方向有实质推动的核心改动：

### 🔧 稳定性修复（已完成合入）

- **修复 Windows 桌面端子进程崩溃** — PR [#6902](https://github.com/agentscope-ai/QwenPaw/pull/6902) `fix(sandbox): stop injecting PYTHONHOME into child processes`
  停止 Windows 沙箱后端从宿主可执行文件派生 `PYTHONHOME` 注入子进程，解决 Python 子进程全部因 `encodings ModuleNotFoundError` 崩溃的问题（修复 #6697），并附带回归测试。

- **修复聊天滚动与渲染问题** — PR [#6904](https://github.com/agentscope-ai/QwenPaw/pull/6904) `fix(console): stabilize chat wheel scrolling`
  针对反向消息列表的滚轮增量做归一化，并改用非 passive 监听器，修复动态 Thinking 内容变化后无法回到底部的问题。

- **记忆压缩逻辑补缺** — PR [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) `fix(memory): flush pending turns before compression`
  修复 `MemoryMiddleware.on_compress_context()` 中 Auto-Memory 持久化被 `summarize_when_compact` 错误拦截的问题（#6555）。

### ✨ 新功能与改进（已完成合入）

- **IM 渠道冲突预警** — PR [#6909](https://github.com/agentscope-ai/QwenPaw/pull/6909) `feat(channels): warn when a bot is already used by another agent`
  保存渠道配置时新增冲突检查，若多个 Agent 绑定同一 Bot 身份，Console 会弹出二次确认对话框。

- **IM 渠道自定义网关** — PR [#6907](https://github.com/agentscope-ai/QwenPaw/pull/6907) `feat(channels): allow custom gateway endpoints for IM channels`
  飞书、QQ、企微、小艺、元宝五个渠道的服务器端点不再硬编码，允许指向私有网关或本地测试服务器，提升自托管灵活性。

- **Computer Use 原生输入工作流改进** — PR [#6891](https://github.com/agentscope-ai/QwenPaw/pull/6891) `feat(computer-use): improve native input workflows`
  新增有界键盘 `sequence` 动作、逐步限速、部分完成上报与观察刷新，Windows 输入在有审批角色时保持定向，减少桌面工作流往返次数。

- **ReMe Light 记忆扩展** — PR [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) `feat(memory): add embedding hot updates and Daily Paper to ReMe Light`
  新增统一 Embedding 构建与连通性测试（支持 openai/dashscope/gemini/ollama 等）、服务级定时任务、索引维护，并重构 Console 长期记忆配置界面。

### 🧹 测试与清理

- PR [#6899](https://github.com/agentscope-ai/QwenPaw/pull/6899) `test(integration): drop stale project_dir assertion` — 适配上游 #6504 “统一项目目录”变更，更新 coding-mode 集成测试。
- PR [#6908](https://github.com/agentscope-ai/QwenPaw/pull/6908) `chore(deps): bumping version of agentscope to 2.0.6` — 依赖升级。


## 4. 社区热点

| 排名 | 标题 | 评论数 | 状态 | 链接 |
|---|---|---|---|---|
| 1 | [Bug] mcp工具规律性失效 | 10 | CLOSED | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) |
| 2 | [Feature] 公式渲染问题；会话分组管理；活动会话背景 | 7 | OPEN | [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) |
| 3 | [Bug] OpenAI-compatible 请求包含 Responses-API 字段，被 StepFun 拒绝 | 6 | CLOSED | [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) |

**分析：**

1. **MCP 工具可靠性是最大热点**（#6732，10 条评论）。用户反馈 MCP 工具在数小时或一晚后“自动失效”，必须重启 Docker 容器才能恢复，报错为“未注册或不存在”。此类问题直接影响使用 Agent 的日常工作流，虽已关闭，但如未能从根因解决（例如连接保活或懒加载机制），极易复发，建议维护者确认关闭原因并考虑增加自动重连或健康检查机制。

2. **公式渲染需求集中爆发**（#6893，7 条评论）。用户明确指出 LaTeX 公式（如 `$Var(\hat{X}) = ...$`）在对话中显示为纯文本，并对比“Cherry Studio”等工具具备此能力。值得注意的是，同日新 PR [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) 正在统一代码块渲染体验（为 LaTeX 和 Mermaid 增加本地 Preview/Source 标签页），说明该需求已被迅速采纳并进入实现阶段。

3. **OpenAI 兼容层严格性不足**（#6803）。用户调用 StepFun 等严格校验消息结构的提供商时，请求中携带了 Responses-API 的 `input_text` 内容类型及原始流式字段导致 400。表明兼容层“能跑通大部分 provider”但未完全遵守 Chat Completions 规范，第三方生态兼容性仍是需要持续收紧的方向。


## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 | 对应修复 |
|---|---|---|---|---|
| 🔴 高 | [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) | v2.1.0b1 Desktop 向子进程注入 PYTHONHOME，导致所有 Python 子进程崩溃（Windows 10，AMD64） | 已关闭 | ✅ PR [#6902](https://github.com/agentscope-ai/QwenPaw/pull/6902) 已合并 |
| 🔴 高 | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | v2.1.0b2 中文输入法组合输入期间若 Agent 正在运行，消息队列功能完全不可用，Console UI 崩溃 | **OPEN** | ❌ 暂无 PR，需优先处理 |
| 🟠 中高 | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP 工具周期性失效，需重启容器恢复 | 已关闭 | ❓ 未指明修复方式，建议回访确认 |
| 🟠 中 | [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) | Console 空闲时持续重绘（~20% CPU），由无限 CSS 动画导致（ai-copilot-blink + antd spinner） | 已关闭 | ❓ 建议关注修复内容 |
| 🟠 中 | [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) | OpenAI 兼容请求携带非标准字段，被 StepFun 等严格提供商拒绝（HTTP 400） | 已关闭 | ✅ 相关兼容层逻辑调整 |
| 🟡 中低 | [#6871](https://github.com/agentscope-ai/QwenPaw/issues/6871) | 前端历史消息时间戳在视图切换后偏移 +8 小时（UTC+8 场景） | 已关闭 | ✅ 已修复 |
| 🟡 低 | [#5790](https://github.com/agentscope-ai/QwenPaw/issues/5790) | Agent 响应完成后加载动画不消失 | 已关闭 | ✅ 已修复 |
| 🟡 低 | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面子文件夹内笔记被错误分组到错误日期下 | **OPEN** | ❌ 暂无 PR |


## 6. 功能请求与路线图信号

### 已进入实现阶段（有对应开放 PR）

| 需求 | Issue / PR | 状态 | 说明 |
|---|---|---|---|
| 公式渲染（LaTeX 预览） | [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) → PR [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) | PR 开放 | 统一代码块体验：标准代码块保留高亮/复制/下载，LaTeX 与 Mermaid 增加 Preview/Source 标签页，跟随明暗主题 |
| Auto-Dream 容错（单个集成单元失败不应拖垮整个任务） | [#6841](https://github.com/agentscope-ai/QwenPaw/issues/6841) → PR [#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) | PR 开放 | 容忍 LLM 返回空/非法 schema，成功单元保留、失败单元单独标记 |
| 无效渠道配置返回 400 而非 500 | [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) → PR [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) | PR 开放 | 将 Pydantic ValidationError 映射为 HTTP 422 |
| `grep_search` 结果路径可点击跳转编辑器 | PR [#6906](https://github.com/agentscope-ai/QwenPaw/pull/6906) | PR 开放 | 不改变工具返回文本，在 Console UI 上增加行号导航 |
| 会话标题随 Auto-Memory 更新自动刷新 | [#6881](https://github.com/agentscope-ai/QwenPaw/issues/6881) | Issue 开放 | — |

### 形成“功能束”的路线图信号

以下多个开放 PR 共同指向三个明确的迭代方向，预计构成后续 1~2 个 minor 版本的主体：

1. **生态集成扩展**：AnySearch 搜索引擎接入（[PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817)）、OneBot 远程语音/图片消息处理（[PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715)）、CopilotKit 集成咨询（[#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882)）。
2. **Console 体验统一**：市场页统一 Apps/Plugins/Skills（[PR #6880](https://github.com/agentscope-ai/QwenPaw/pull/6880)）、工作区持久化产物卡片（[PR #6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)）、每会话模型覆盖（[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)）。
3. **Provider 架构重构**：统一 provider 发现、模型元数据、路由与 Agent 控制（[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)），该 PR 已持续迭代三周，影响面大，是后续模型管理功能的基础。


## 7. 用户反馈摘要

- **QQ 机器人工作流信息刷屏（#6897，已关闭）**：用户指出在 QQ bot 中安排 QwenPaw 进行项目调研时，详细工作流被完整推送到 QQ，不仅干扰阅读还会触发限流。诉求是“不要将每一步工作流都发到 QQ 上”。这是 IM 渠道场景中很典型的噪音治理问题，建议在后续渠道设置中加入“进度播报粒度”选项。

- **社区渠道诉求（#6895，已关闭）**：用户询问“能建立个微信群吗？”，侧面反映微信生态用户基数大、现有社区入口（可能是 Discord/Telegram）未覆盖该人群，对中文用户交流与问题响应有实际需求。

- **公式显示“很尴尬”（#6893）**：用户以对比语气提到“其它的一些工具比如 cherry studio 之类，都可以”，说明对 QwenPaw 的能力预期已不止于对话，而是希望达到甚至超过同类客户端产品的渲染水平。此类体验细节影响用户对产品的专业度评价。

- **时间戳错乱困惑（#6871，已关闭）**：用户在 UTC+8 时区下切换视图后历史消息时间显示偏移 8 小时，属于典型的前端时区处理不严谨问题，虽已修复但提示项目在时区国际化测试上需增加覆盖。

- **对修复速度的隐性认可**：今日关闭的 12 条 Issue 中，包含 5 月 9 日提交的 #4154（字体大小调节、后台服务模式等）和 7 月 5 日提交的 #5790（加载动画），说明存在一定积压但最终都有响应。不过 3 个月的闭环周期对用户体验而言仍偏长。


## 8. 待处理积压

### ⚠️ 需优先关注

| 类型 | 标题 | 创建时间 | 链接 | 备注 |
|---|---|---|---|---|
| Bug | 中文 IME 导致消息队列不可用（v2.1.0b2） | 2026-08-10 | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | **高严重度且无 PR**，直接阻断中文用户核心输入功能，且影响的是升级到 b2 的用户 |
| Bug | 日记页面子文件夹笔记分组错误 | 2026-08-10 | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 数据归类错误，影响记忆可靠性 |
| Configuration Bug | 无效单渠道 payload 返回 HTTP 500 | 2026-08-11 | [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) | 已有对应 PR #6912，等待合入 |

### ⏳ 长期未合并 PR（已开放超过 3 周）

| PR | 标题 | 开放时间 | 备注 |
|---|---|---|---|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | feat: unify provider discovery, model metadata, routing, and agent controls | 2026-07-21 | 大范围重构 PR，持续更新中，建议保持关注以防与 #5992 等模型相关功能产生冲突 |
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | Add per-session model overrides（first-time-contributor） | 2026-07-12 | 新人贡献 PR 已近 1 个月，需维护者给予 Review 反馈或合入计划 |

### 📝 其他提示

- Issue #4154（字体大小调节 / 后台服务 / 文件路径可点击）在开放 3 个月后于今日关闭，社区对该类“生活质量”改进的需求不会消失，建议在 v2.1.0 后将其拆分为独立 feature 跟踪，而不是一次性关闭。

---

*本日报基于 GitHub 公开数据自动生成，供项目维护者与社区参考。*
*数据统计时间：2026-08-11T00:00:00Z ~ 2026-08-11T23:59:59Z*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-11

---

## 1. 今日速览

过去 24 小时 ZeroClaw 保持高度活跃：新增/活跃 Issue 27 条、关闭 6 条，PR 更新 50 条（其中 49 条仍在合并队列），无新版本发布。工作重心明显集中在安全修复（webhook 鉴权、sandbox launcher 解析、SSRF 防护）与 SOP 子系统一致性问题上。值得关注的是：1 个 S0 级 webhook 安全风险 #9565 已关闭，但 8 月 11 日又新报 1 个 S0 级 sandbox 安全问题 #9916；49 条待合并 PR 显示合并通道仍存在较大积压，超过 20 条 PR 处于 `needs-author-action` 状态，维护者响应速度是当前项目健康度的主要瓶颈。

---

## 3. 项目进展

今日没有新 Release，且 PR 合并通道仅推进 1 条，但通过 6 条 Issue 关闭可以观察到以下实质性进展：

- **S0 安全修复落地**：#9565（gateway webhook 不 fail-closed，覆盖 WhatsApp Cloud/Linq/WATI 三个渠道）已关闭，意味着三个 webhook handler 的调用方鉴权问题已修复，攻击者无法再直接向 agent 注入消息。
- **架构方向性争议平息**：#9874（"用 Python 重写 ZeroClaw"）在 4 天内即被关闭，社区/维护者明确否决了该提议，Rust 技术栈路线得到确认，消除了路线图不确定性。
- **渠道与 provider 稳定性改进**：#9792（git channel 空 peer allowlist 静默丢事件）、#9596（Anthropic tool_result 图片被 base64 文本化）、#8967（WeChat sendmessage 假成功）均已关闭，覆盖渠道层、provider 层、传递层三个维度的修复。
- **CI 可靠性修正**：#9613（monthly outdated 扫描误报）已关闭，依赖扫描结果可信度恢复。

除此之外，今日有 3 个新修复 PR 进入队列（#9918 session_key 修复、#9819 像素级图片校验、#9921 WATI 文档清理），其中 #9819 是跨 Anthropic/Gemini 的多模态安全加固，值得关注。

---

## 4. 社区热点

| 热度 | Issue/PR | 评论数 | 核心诉求 |
|---|---|---|---|
| 🔥 最高 | [#6850 RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | 11 | 将记忆生命周期策略（合并/治理）与存储后端解耦，`Memory` trait 不应同时承担两类职责 |
| 高 | [#8600 per-chat model switching](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | 4 + 1👍 | 来自 moltis 的迁移用户需要"一次 provider 配置， chat 内任意切换模型"的能力 |
| 高 | [#9779 sops_dir 默认值未生效](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | 4 | SOP 子系统因文档与实现不一致而静默不加载，运维排障困难 |
| 高 | [#9425 SOP 运行中无取消路径](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | 4 | Web 仪表盘对运行中的 SOP 作业没有 Stop/Cancel 按钮，工作流被阻塞（S1） |

**分析**：#6850 已持续近 3 个月、11 条评论，说明这是架构层面的真问题。当前的记忆实现让每个 gateway/channel/后端各自重复实现合并策略，社区希望有一个统一的生命周期管理层。#8600 是产品易用性诉求，来自竞品迁移用户，这类反馈对吸引新用户至关重要，但目前只停留在 `status:accepted` 阶段，尚无对应 PR 认领。

---

## 5. Bug 与稳定性

### 🔴 S0 — 数据丢失/安全风险

| Issue | 状态 | Fix PR |
|---|---|---|
| [#9916 host launchers 未解析即应用 workspace cwd](https://github.com/zeroclaw-labs/zeroclaw/issues/9916) | 新开 | ❌ 无 |
| [#9565 gateway webhook 不 fail-closed](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) | ✅ 已关闭 | 已修复 |

### 🟠 S1 — 工作流阻塞

| Issue | 状态 | Fix PR |
|---|---|---|
| [#9425 SOP 运行作业无取消路径](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | in-progress | ❌ |
| [#9901 SOP 未知 step bullets 被静默当正文](https://github.com/zeroclaw-labs/zeroclaw/issues/9901) | 新开 | ❌ |
| [#9779 sops_dir 文档默认值不生效](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | accepted | ❌ |
| [#9786 malformed SOP.toml 静默丢弃](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) | accepted | ❌ |
| [#9768 SIGUSR1 reload 未实现且文档误导](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) | accepted | ❌ |

### 🟡 S2 — 行为降级

| Issue | 状态 | Fix PR |
|---|---|---|
| [#9917 session_key 双重 gw_ 前缀](https://github.com/zeroclaw-labs/zeroclaw/issues/9917) | 新开 | ✅ [#9918](https://github.com/zeroclaw-labs/zeroclaw/pull/9918) |
| [#9912 skill 注入默认值回归为 compact](https://github.com/zeroclaw-labs/zeroclaw/issues/9912) | 新开 | ❌ |
| [#9909 Matrix mention_only 丢弃回复](https://github.com/zeroclaw-labs/zeroclaw/issues/9909) | 新开 | ❌ |
| [#9908 SkillDocument 多段描述被截断](https://github.com/zeroclaw-labs/zeroclaw/issues/9908) | 新开 | ❌ |
| [#9896 Memory: none 误报](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) | 新开 | ❌ |
| [#9883 WebP 解码无界 + 跳过校验](https://github.com/zeroclaw-labs/zeroclaw/issues/9883) | 新开 | ✅ [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)（部分覆盖） |
| [#9890 cron update_job 跳过 delivery 校验](https://github.com/zeroclaw-labs/zeroclaw/issues/9890) | 新开 | ❌ |
| [#9889 cron_add 空白 prompt 误判为 Agent](https://github.com/zeroclaw-labs/zeroclaw/issues/9889) | 新开 | ❌ |

### ⚠️ 依赖安全

- [#9899 bitmaps 3.2.1 存在 RUSTSEC-2026-0247](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)：通过 imbl → Matrix SDK dev-dependencies 引入，`cargo deny` 目前在 CI 中失败，需要 triage 或移除 waiver。

**今日 Bug 趋势**：SOP 子系统是重灾区（#9779/#9786/#9425/#9901 四个独立问题），核心矛盾是"静默失败"——sops_dir 不加载不报错、畸形 SOP 不报错、未知 step 不报错。这些叠加在一起让 SOP 的可靠性受到严重质疑。其次是 cron 工具的参数校验缺失（#9889/#9890）。

---

## 6. 功能请求与路线图信号

| 功能请求 | 状态 | 对应 PR / 路线图信号 |
|---|---|---|
| [#8600 per-chat 模型切换](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | `status:accepted` | 暂无直接 PR，但 [#9535 上下文压缩锚定模型窗口比例](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) 显示模型级配置正在丰富，是同一个方向 |
| [#7518 WhatsApp reactions 支持](https://github.com/zeroclaw-labs/zeroclaw/issues/7518) | `status:accepted` | 需求明确（与其他渠道 parity），实现范围小，适合 good first issue |
| [#9895 Telegram 分组分页 /model 选择器](https://github.com/zeroclaw-labs/zeroclaw/issues/9895) | 新开（1 评论） | UI 层增强，与 #8600 属于同一用户体验主题 |
| [#9915/#9914/#9916 Docker sandbox 契约](https://github.com/zeroclaw-labs/zeroclaw/issues/9915) | 新开（follow-up 系列） | 同一作者连开 3 个 issue + 1 个 S0 bug，说明 Docker 后端在真实使用中暴露了边界问题，预计很快会有 PR 跟进 |
| 插件系统（sockets/TLS/secrets/egress） | — | [#8923](https://github.com/zeroclaw-labs/zeroclaw/pull/8923) [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137) [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142) [#8857](https://github.com/zeroclaw-labs/zeroclaw/pull/8857) 四条 XL 级 PR 构成完整插件网络能力栈，这是当前最大的路线图投资方向 |

**路线图判断**：插件系统（WASM + 网络能力）是 ZeroClaw 目前最明确的下一阶段主线，四条 XL PR 由同一核心贡献者 JordanTheJet 连续提交，形成一个自洽的功能集——egress 策略 → TLS profile → 原生 socket → scoped secrets。若这些 PR 合入，ZeroClaw 插件将具备与主进程同级的网络安全能力。另一个值得关注的信号是 Docker sandbox 契约问题（#9914/#9915），表明生产环境对 sandbox 行为确定性有强烈需求。

---

## 7. 用户反馈摘要

**从竞品迁移的用户声音（#8600）**：
> "I'm coming to zeroclaw from moltis; for the most part, all the capabilities I'm using are present except for one."

这是典型的"90% 功能覆盖 + 一个关键缺口"迁移场景。用户已经认可 ZeroClaw 作为 moltis 替代品，per-chat 模型切换是补齐最后一块拼图的功能。这类反馈说明项目在真实地吸收竞品用户，但也意味着竞品的功能基线已成为用户预期。

**对 Rust 技术栈的争议（#9874）**：
> "Rust here is flex for the sake of flex. '100% Rust' reads like branding first and an engineering requirement second."

该 Issue 在 4 天内被关闭，但背后反映的是部分用户对 77.6 万行 Rust 代码库可维护性的担忧。值得一提的是，Issue 中提到 26 个 workspace member、单个模块体积巨大等问题是真实的工程挑战，即使技术栈方向不变，模块拆分和编译时间优化仍是社区潜在痛点。

**SOP 子系统的一致性质疑（#9779/#9786/#9425/#9901）**：
多个 issue 的共性模式是"文档宣称 A，实际行为 B，且无任何错误提示"。用户 JordanTheJet 连续提交了 SOP 方向 4 个 issue（其中 2 个在今日更新），说明 SOP 功能虽已上线但在生产环境中的可信度未达标。特别是 #9779 中"依赖文档默认值的用户 SOP 静默不加载"，属于最危险的失败模式——系统看起来正常，实际完全不工作。

**CI 维护者的反馈（#9771）**：
> "zeroclaw-gateway fails clippy -D warnings on the default feature surface. Four test helpers are dead code whenever the feature is off."

即使是核心质量门禁也有遗漏，`#[cfg(test)]` 与 `#[cfg(feature)]` 不匹配导致 dead code。这类问题虽然 P2，但累积会降低 CI 的可信度。

---

## 8. 待处理积压

### ⚠️ 需维护者优先关注的长期未合并 PR

| PR | 创建时间 | 等待天数 | 风险 | 阻塞原因 |
|---|---|---|---|---|
| [#8443 Matrix single-message progress drafts](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) | 2026-06-28 | **44 天** | high | 基础分支较早（b718f1b），可能需要 rebase |
| [#8713 file_download SSRF gate](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | 2026-07-04 | **38 天** | high | `needs-author-action`；security 相关，建议优先 |
| [#8857 插件 scoped secrets](https://github.com/zeroclaw-labs/zeroclaw/pull/8857) | 2026-07-08 | **34 天** | high | `needs-author-action`；XL 级，依赖/受限于其他插件 PR |
| [#8923 插件 host-mediated TCP/TLS](https://github.com/zeroclaw-labs/zeroclaw/pull/8923) | 2026-07-09 | **33 天** | high | 依赖 #9142 基础 |
| [#9134/#9137/#9142 插件 payload/egress/TLS](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) | 2026-07-18 | **24 天** | high | 三 PR 互相 stacked，`needs-author-action` |
| [#9535 上下文压缩锚定模型窗口](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | 2026-07-29 | **13 天** | high | `needs-author-action`；P1 功能 |
| [#9808 46 个依赖批量升级](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) | 2026-08-07 | 4 天 | high | dependabot 批量更新，需回归测试 |

### ⏳ 长期未关闭的核心 Issue

- **#6850 Memory 生命周期解耦**（5/22 创建，已 80+ 天）：architecture 级 RFC，11 条评论，尚无明确的实施计划或负责人。
- **#8600 per-chat 模型切换**（7/1 创建）：`status:accepted` 但无 PR，竞品迁移用户的核心诉求。
- **#9771 gateway clippy 失败**（8/5 创建）：一行代码即可修复的 CI 问题，但等待了 6 天仍无人认领——低垂果实型任务，适合引导新贡献者。

---

## 总结

ZeroClaw 今日的健康度呈"**高活跃、高积压、安全修复加速**"态势。积极的信号包括：S0 级 webhook 风险已修复、Python 重写争议快速平息、SOP 和 sandbox 问题被密集暴露并进入 accepted 状态。值得警惕的信号是：49 条 PR 待合并中积压了大量 20-40 天的 XL 级插件功能 PR，且超过 20 条处于 `needs-author-action`（意味着作者在等 review 而非反过来）；SOP 子系统连续 4 个 issue 都指向"静默失败"这一类设计缺陷，需要在架构层面解决错误可观测性问题，而非逐个 patch。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*