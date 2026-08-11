# OpenClaw 生态日报 2026-08-11

> Issues: 248 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-11 07:02 UTC

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

## 今日速览

过去 24 小时项目活跃度处于**高位**：Issue 侧共 248 条更新（新开/活跃 172 条，关闭 76 条），PR 侧共 500 条更新（待合并 287 条，已合并/关闭 213 条），无新版本发布。社区讨论重心集中在**会话状态管理**（session-state）、**消息丢失**（message-loss）、**认证与鉴权**（auth-provider）三条主线上，且多个 P1 级 Bug 已持续数周未获修复，存在稳定性隐患。积极信号是核心维护者 steipete 今日提交了 6 个重构类 PR（模块拆分、技术债清理），显示项目在功能推进之外同步进行架构治理。

- 活跃度：高（Issue 248 条更新 / PR 500 条更新）
- 版本发布：无
- 健康度信号：长期遗留 Bug 与新功能 PR 并存，需关注 P1 积压

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日共有 **213 条 PR 被合并/关闭**，从公开 PR 列表可见以下重要推进：

| PR | 类型 | 说明 |
|---|---|---|
| [PR #121909](https://github.com/openclaw/openclaw/pull/121909) | chore(memory) | 已关闭；移除 QMD 后端退役遗留的英文文档词汇表条目，清理 i18n 残留 |
| [PR #121908](https://github.com/openclaw/openclaw/pull/121908) | fix(gateway) | 重新落地 #121507（此前被 #121491 回滚）：Gateway 重启后防止 final reply 被重复投递，引入 per-delivery custody 记录 |
| [PR #121901](https://github.com/openclaw/openclaw/pull/121901) | refactor(agents) | 将 2037 行的 message-tool.ts 按概念边界拆分，消除 max-lines 豁免 |
| [PR #121896](https://github.com/openclaw/openclaw/pull/121896) | refactor(agents) | 简化 embedded runner 的订阅与状态标记，是 #121305/#121344/#121393/#121550 系列安全重构的 wave-2 |
| [PR #121884](https://github.com/openclaw/openclaw/pull/121884) | refactor(system-agent) | 将约 2000 行的系统代理聊天引擎拆分为概念模块，统一 Gateway/搜索持久化路径 |
| [PR #121888](https://github.com/openclaw/openclaw/pull/121888) | refactor(SDK) | 清理 30 个跨模块语义冲突的导出名称，消除 #121300 引入的 SDK 债务 |

**趋势判断**：架构成熟度是今日主线。多个大型模块（message-tool、system-agent、embedded runner）正在被系统性拆分，配合 #121908 的投递可靠性修复，项目正在为后续功能迭代夯实内部基础。

---

## 社区热点

今日评论数最高的 Issues 反映了社区最关心的几个方向：

### 1. 记忆安全与信任分级 — [Issue #7707](https://github.com/openclaw/openclaw/issues/7707)（35 评论）
**Feature Request: Memory Trust Tagging by Source**（P2, 安全相关）
- 诉求：按记忆来源（用户命令、网页抓取、第三方技能）打上信任等级标签，防止恶意指令通过不可信内容（网页、消息、第三方集成）进行记忆投毒。
- 分析：这是**安全敏感型需求**，与长期存在的 prompt injection 威胁直接相关。评论数高表明社区对记忆安全的焦虑在上升。当前无 fix PR，处于 needs-product-decision 状态。

### 2. 多编码文件名处理 — [Issue #48788](https://github.com/openclaw/openclaw/issues/48788)（20 评论）
**feat: centralized filename encoding utility**（P3）
- 诉求：PR #48578 只修复了 UTF-8 被误读为 Latin-1 的单一场景，社区希望有统一的文件名编码工具，覆盖 Shift-JIS、EUC-KR、GB18030 等多编码场景。
- 分析：国际化用户基数在扩大，Feishu 中文文件名问题只是冰山一角。该 Issue 虽为 P3，但实用价值高。

### 3. Codex 回合超时 — [Issue #87744](https://github.com/openclaw/openclaw/issues/87744)（18 评论，👍3）
**[Bug]: Codex-backed Telegram turns repeatedly time out**（P1）
- 现象：2026.5.27 版本后，Codex 驱动的 Telegram 会话反复出现"已做工作但永远不进入 turn/completed 终态"，导致最终答案无法送达用户。
- 分析：这是**阻断性 Bug**，直接影响核心使用场景。无 fix PR，需要 live-repro 和 maintainer review，已积压 2.5 个月，社区不满度在上升。

### 4. 网关级成本预算 — [Issue #42475](https://github.com/openclaw/openclaw/issues/42475)（15 评论）
**Feature: Per-agent cost budget enforcement at the gateway level**（P2）
- 诉求：在网关层强制每日/每月成本上限，防止模型调用失控。
- 分析：已 linked PR，说明有实现路径。运维类需求，预计会被纳入后续版本。

### 5. A2A 重复消息 — [Issue #39476](https://github.com/openclaw/openclaw/issues/39476)（13 评论）
**A2A sessions_send: target agent can call sessions_send back, causing duplicate messages**（P1）
- 现象：Agent A 调用 sessions_send 给 Agent B，B 回调时导致 A 的信道出现重复消息（primaryReply + 独立回发）。
- 分析：A2A 协议设计缺陷，linked-pr-open 表明修复已在路上。

---

## Bug 与稳定性

按严重程度排列今日活跃的 Bugs：

### P1 级（阻断/严重）

| Issue | 问题 | 影响 | Fix PR 状态 |
|---|---|---|---|
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram 回合反复超时，最终答案丢失（2026.5.27 回归） | 消息丢失 | ❌ 无 |
| [#84583](https://github.com/openclaw/openclaw/issues/84583) | cron announce 投递触发 EmbeddedAttemptSessionTakeoverError，与用户活跃聊天冲突 | 会话状态损坏 | ❌ 无 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 长对话后 write/exec 工具参数被静默丢弃（15+ 轮后出现） | 数据丢失/错误执行 | ❌ 无 |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话结束后未释放，主会话变为无响应 | 会话阻塞 | ❌ 无 |
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat 消息追加到 transcript 但不触发助手回复（--deliver 无法投递） | 消息不回复 | ❌ 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未回收，僵尸进程累积导致运行时劣化 | 崩溃循环/资源耗尽 | ❌ 无（needs-info） |
| [#83598](https://github.com/openclaw/openclaw/issues/83598) | anthropic:claude-cli OAuth 刷新在 2026.5.12 仍无法到达运行时路径（#73682 修复未生效） | 全部流量 dead-end | ❌ 无 |
| [#103804](https://github.com/openclaw/openclaw/issues/103804) | service-env 生成器双重引号导致 AWS_REGION 变成 '"us-east-1"' | 认证/配置损坏 | ✅ [PR #120332](https://github.com/openclaw/openclaw/pull/120332) 等 |
| [#103198](https://github.com/openclaw/openclaw/issues/103198) | WebChat 图片附件未映射到 media store，image 工具收到 "image_0" 占位符 | 功能不可用 | ✅ 有 linked PR |

### P2 级（中等）

- [#114154](https://github.com/openclaw/openclaw/issues/114154)：bundle-mcp 工具通过策略但 agent 会话永远不加载，ToolSearch 无结果
- [#50490](https://github.com/openclaw/openclaw/issues/50490)：Feishu 群聊 activation mention 模式切换无效（回归）
- [#57256](https://github.com/openclaw/openclaw/issues/57256)：openclaw status 误报 mem0 不可用（实际运行正常）
- [#58957](https://github.com/openclaw/openclaw/issues/58957)：模型切换在上下文过大时静默失败，无明确报错
- [#99659](https://github.com/openclaw/openclaw/issues/99659)：companion app 连接后 OOM 被 Kubernetes 杀死
- [#85027](https://github.com/openclaw/openclaw/issues/85027)：macOS 升级后 LaunchAgent Gateway 不可恢复，只能 Time Machine 还原
- [#114020](https://github.com/openclaw/openclaw/issues/114020)：2026.7.2-beta.4 升级后 Feishu/Telegram 入站消息全部 dispatch 失败

**稳定性判断**：P1 级问题中有 7 个尚无 fix PR，且多数已积压超过 2 个月（最早 #39476 创建于 3 月 8 日）。"会话状态"（session-state）和"消息丢失"（message-loss）是高频影响标签，提示核心运行时可靠性仍是当前最大短板。

---

## 功能请求与路线图信号

### 安全与信任
- **[#7707 Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707)**：按来源标记记忆信任等级（P2，安全）。无 PR，但社区呼声极高，可能进入路线图
- **[#81917 Dashboard URL 安全](https://github.com/openclaw/openclaw/issues/81917)**：日志泄露裸 URL + KDE 浏览器启动挂起（已关闭，需确认修复版本）

### 运维与成本控制
- **[#42475 Per-agent 成本预算](https://github.com/openclaw/openclaw/issues/42475)**：网关层每日/每月成本上限（已有 linked PR）
- **[#14376 原因感知 cron 退避](https://github.com/openclaw/openclaw/issues/14376)**：按失败原因（402/限流/网络）差异化重试策略
- **[#14747 可配置 lane 等待阈值](https://github.com/openclaw/openclaw/issues/14747)**：当前 2 秒硬编码阈值不适配 60-120 秒的合法 cron 任务

### 开发体验
- **[#14438 插件热重载](https://github.com/openclaw/openclaw/issues/14438)**：无需重启容器即可迭代插件（👍4，社区最想要的 DX 改进之一）
- **[#13700 会话快照](https://github.com/openclaw/openclaw/issues/13700)**：/session save|load 实现上下文检查点
- **[#47320 递归子代理列表](https://github.com/openclaw/openclaw/issues/47320)**：--depth/--recursive 查看多级子代理

### 今日新增功能 PR（可能进入下一版本）
- [PR #121724](https://github.com/openclaw/openclaw/pull/121724)：Control UI 管理团队级 Secrets（XL 规模）
- [PR #119344](https://github.com/openclaw/openclaw/pull/119344)：Signal 插件支持 signal-cli 账户链接
- [PR #121808](https://github.com/openclaw/openclaw/pull/121808)：Feishu 通道新增删除消息能力
- [PR #121859](https://github.com/openclaw/openclaw/pull/121859)：Cron 任务保留 Codex 应用授权（此前调度任务无法调用已连接应用）
- [PR #119001](https://github.com/openclaw/openclaw/pull/119001)：Codex Realtime 语音绑定到现有会话

---

## 用户反馈摘要

### 真实痛点点名

1. **"长对话后工具参数静默丢失是最可怕的 Bug"** — [Issue #53408](https://github.com/openclaw/openclaw/issues/53408) 用户在 write/exec 工具收到空参数对象后，无法确定工作是否被错误执行，只能人工核对。

2. **"Telegram 会话反复超时让用户流失"** — [Issue #87744](https://github.com/openclaw/openclaw/issues/87744) 多个 Telegram 会话在 Codex 回合上超时，用户多次重试仍无最终答案，严重影响可用性。

3. **"升级变成灾难恢复"** — [Issue #85027](https://github.com/openclaw/openclaw/issues/85027) macOS 用户从 2026.5.6 升到 2026.5.19 后 Gateway 完全不可用，`openclaw doctor --fix` 无效，唯一出路是 Time Machine 还原，再重新生成 Gateway。

4. **"TTFT 被固定开销拖垮"** — [Issue #80131](https://github.com/openclaw/openclaw/issues/80131) 用户实测每 43 秒 TTFT 中有约 14 秒（认证 5.5s + 工具打包 8.9s）花在与请求无关的重复工作上，建议缓存。

5. **"僵尸进程让服务逐渐腐烂"** — [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) 用户发现 openclaw-hooks/bash/codex 子进程未被回收，长期运行后系统响应变慢，最终被 OOM Kill。

### 积极反馈信号

- [PR #119835](https://github.com/openclaw/openclaw/pull/119835)（codex 安静工具结果保留）获得 "proof: sufficient" 标签，说明社区提的 PR 质量在提升
- 多个重构 PR（steipete 系列）表明维护者在主动解决代码可维护性问题，社区对此整体持正面态度

---

## 待处理积压

以下重要 Issue 长期未得到有效响应，提醒维护者关注：

### 高优先级积压（P1，已超过 1 个月）

| Issue | 创建时间 | 持续时间 | 关键阻塞 |
|---|---|---|---|
| [#39476](https://github.com/openclaw/openclaw/issues/39476) A2A 重复消息 | 2026-03-08 | 5 个月 | 已有 linked PR，等待合并 |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) Codex Telegram 超时 | 2026-05-28 | 2.5 个月 | 需要 live-repro，无 assignee |
| [#84583](https://github.com/openclaw/openclaw/issues/84583) cron takeover 错误 | 2026-05-20 | 2.8 个月 | source-repro 已提供，待修复 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) 工具参数静默丢失 | 2026-03-24 | 4.5 个月 | needs-maintainer-review |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) 子代理会话不释放 | 2026-03-16 | 5 个月 | 无 assignee，无 PR |

### 低优先级但长时间未动（P2/P3，已超 5 个月）

- [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory Trust Tagging（2026-02-03，35 评论，至今无 PR）
- [#13700](https://github.com/openclaw/openclaw/issues/13700) 会话快照（2026-02-10）
- [#13487](https://github.com/openclaw/openclaw/issues/13487) Discord 路由优先级（2026-02-10，P1 但无动静）
- [#13911](https://github.com/openclaw/openclaw/issues/13911) 子代理 announce 抑制（2026-02-11）
- [#16670](https://github.com/openclaw/openclaw/issues/16670) Onboarding 应包含 Memory 配置（2026-02-15）

### 风险警示

这些积压项的共同特征是：**都带有 `clawsweeper:needs-maintainer-review` 或 `clawsweeper:needs-product-decision` 标签**，说明 ClawSweeper（自动化筛选）已识别但维护者人力不足，未能及时跟进。P1 级 Bug 长时间无 fix PR 是当前项目健康度最大的减分项，建议优先调度资源处理 #87744 与 #84583 两个直接影响消息送达的回归。

---

*本日报基于 2026-08-11 GitHub 公开数据自动生成，仅供参考。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析（2026-08-11）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从“功能探索”向“生产可用”过渡**的关键阶段。多个项目保持高活跃度，OpenClaw 以绝对体量领先，但 P1 级 Bug 积压暴露了扩张期的稳定性隐忧；IronClaw、CoPaw、ZeroClaw 等迅速跟进，在稳定性、企业级能力或垂直场景上寻求差异化。社区共同焦虑集中在**消息可靠性与静默失败、MCP 工具链成熟度、Agent 行为可信度与成本治理**上，说明用户已不再满足于“能跑 demo”，而是要求 7×24 小时可靠运行、可观测、可控制。同时，多模型切换、跨平台渠道、合规安全等需求持续涌现，推动各项目从“单点工具”走向“平台化基础设施”。

## 2. 各项目活跃度对比

| 项目 | Issue 动态 | PR 动态 | Release | 健康度/阶段 |
|---|---|---|---|---|
| OpenClaw | 248 更新（172 新/活跃，76 关闭） | 500 更新（287 待合并，213 合并/关闭） | 无 | 高活跃，社区最大；P1 积压严重 |
| NanoBot | 5 更新（3 新/活跃，2 关闭） | 116 更新（104 合并/关闭，12 待合并） | 无 | 高产出，存在 Agent 重复回复/循环控制问题 |
| Hermes Agent | 8 更新（全部新增/活跃） | 50 更新（仅 3 合并/关闭，47 待合并） | 无 | 开发活跃，合并瓶颈明显，安全修复积压 |
| PicoClaw | 5 更新（1 新开，2 关闭） | 8 更新（6 合并/关闭，2 待合并） | 无 | 中等活跃，安全加固实质推进 |
| NanoClaw | 3 更新 | 21 更新（9 合并/关闭，11 待合并） | 无 | 高强度，架构重构+可靠性问题突出 |
| NullClaw | 1 关闭 | 0 | 无 | 低活跃，维护平静 |
| IronClaw | 22 更新（12 新/活跃，10 关闭） | 50 更新（17 合并/关闭，33 待合并） | **v1.1.1-rc.1** | 高活跃，P1 当日批量修复，工程严谨 |
| LobsterAI | 4 更新（3 机器人关闭） | 29 更新（18 合并/关闭） | 无 | 中高，stale 关闭较多，核心稳定性存疑 |
| Moltis | 3 新 Bug | 2 待合并 | 无 | 中等，合并节奏偏慢，Apple 后端不稳 |
| CoPaw (QwenPaw) | 15 更新（8 新/活跃，7 关闭） | 50 更新（22 合并/关闭，28 待合并） | 无 | 高活跃，2.1 beta 密集打磨 |
| ZeptoClaw | 0 | 0 | 无 | 无活动 |
| ZeroClaw | 19 更新（18 新/活跃，1 关闭） | 50 更新（4 合并/关闭，46 待合并） | 无 | 高活跃，SOP 静默失败类 Bug 密集 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的**中心参照系**，社区规模断崖式领先：单日 PR 更新 500 条、Issue 更新 248 条，约为第二名 IronClaw/CoPaw 的 2.5 倍以上。其优势在于：

- **平台广度**：覆盖 Telegram、Feishu、WebChat、iOS/Android 等多渠道，集成 Codex、Claude 等多种模型后端；
- **架构治理意识**：核心维护者持续推进大型模块拆分（message-tool、system-agent 等），主动偿还技术债；
- **生态辐射力**：LobsterAI 深度集成 OpenClaw，PicoClaw、NanoClaw 等命名和功能上也明显受其影响。

但 OpenClaw 的短板同样明显：**P1 级 Bug 最长积压 5 个月，且多集中在消息丢失与会话状态损坏**，直接影响核心使用场景。相比之下，IronClaw 在 QA 驱动下能做到 P1 当日修复，体现了两者工程响应速度的差异。OpenClaw 若不能尽快解决可靠性问题，可能给竞品留下“以稳定换规模”的替代空间。

## 4. 共同关注的技术方向

### 4.1 消息可靠性与“静默失败”治理
用户对“Agent 无响应”的容忍度极低，多项目集中处理消息丢失、状态误判、投递证据缺失：
- **OpenClaw**：message-loss 系列，Gateway 防重复投递（PR #121908）
- **NanoClaw**：平台复用消息 ID 导致静默丢弃（#3226）、计划任务错误无路由（#3223）
- **IronClaw**：投递失败路径忽略 vendor refs（#7476）、steering 重放去重（#7336）
- **ZeroClaw**：SOP 静默篡改/丢弃（#9901、#9786）
- **LobsterAI**：任务超时状态不透明（#2062）

**启示**：失败必须可见、可诊断、可恢复，可观测性是生产级 AI Agent 的刚需。

### 4.2 MCP 工具生态快速膨胀
MCP 已成为工具调用的事实标准，各项目在接入深度和体验上展开竞争：
- **CoPaw**：MCP 工具规律性失效（#6732）→ 今日修复 PR #6894
- **NanoBot**：MCP 连接状态可视化（#5331）、子代理继承 MCP 工具（#4192）
- **NanoClaw**：远程 Streamable HTTP MCP 服务器（#3092、#3221）
- **Hermes Agent**：MCP SDK 2.x 迁移（#76736）
- **IronClaw**：v1.1.1-rc.1 改善自定义 MCP 兼容性

**启示**：MCP 的稳定性、远程化、权限继承将成为下一阶段核心竞争力。

### 4.3 Agent 行为可信度与安全边界
社区开始要求 Agent “说实话”、不能未经确认就声称操作成功，同时强化防投毒和权限控制：
- **IronClaw**：批量修复 Agent 虚构状态/未验证断言（#7246/#7247/#7294）
- **OpenClaw**：Memory Trust Tagging，防止记忆投毒（#7707）
- **PicoClaw**：远程执行默认禁用+独立审批（PR #3297）
- **NanoClaw**：Telegram 配对码 CSPRNG（#3229）、DM 日志脱敏（#3215）
- **Hermes Agent**：阻止插件后门预执行（#83724）

**启示**：AI Agent 的输出必须可审计、可追溯，安全需要默认收敛而非事后补救。

### 4.4 成本控制与资源治理
异常 token 消耗、CPU 空转、CI 存储膨胀等问题，说明成本治理正从“可选优化”变成“必备能力”：
- **NanoBot**：Dream 记忆整理无限循环消耗 10M+ token（#5324）
- **OpenClaw**：网关级每日/每月成本预算需求（#42475）
- **CoPaw**：Console 空闲 CPU ~20%（#6828，今日已修）
- **IronClaw**：live-canary 工件体积 700MB–1.5GB（#7137）

**启示**：需要预算上限、异常中断、成本可视化等机制，否则 AI Agent 难以大规模落地。

### 4.5 多模型管理与灵活切换
厂商锁定风险被用户反复提及，模型切换的故障隔离和易用性成为共性诉求：
- **LobsterAI**：单一 Provider 受限导致全局瘫痪（#1240）
- **ZeroClaw**：per-chat 模型快速切换（#8600）
- **CoPaw**：统一 provider 发现/路由（#6302）
- **Hermes Agent**：群聊内置 Provider 缺少模型选择（#83715）
- **NanoBot**：OpenRouter Server Tools 接入请求（#5333）

**启示**：模型网关层需要提供统一抽象、故障隔离、按需切换能力。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构/技术特征 |
|---|---|---|---|
| **OpenClaw** | 全能型个人助手，多通道+多模型 | 开发者/重度自托管用户 | 模块化单体，Rust/TS 混合，配置复杂，生态最大 |
| **NanoBot** | 平台化 Agent 框架，WebUI/MCP/子代理 | 平台构建者、嵌入式场景 | 强调可嵌入、只读会话、MCP 继承，JS/TS 生态 |
| **Hermes Agent** | 桌面优先的多 IM 助理 | 桌面端/移动端个人用户 | Python 技术栈，Windows/macOS 桌面体验，Termux 支持 |
| **PicoClaw** | 轻量精简实现 | 低资源/小规模部署 | 重视安全默认值，Telegram/Web 为主，PNPM 前端 |
| **NanoClaw** | 高可靠消息交付+架构治理 | 对消息一致性要求高的自托管者 | 主动重构（迁移注册表/生命周期钩子），Matrix/Telegram |
| **NullClaw** | A2A 互操作实验 | 多实例互联用户 | 低活跃，客户端工具缺口 |
| **IronClaw** | 企业级团队协作 | 企业/团队用户 | Rust，租户策略/文档治理/CI 工程化，QA 驱动 |
| **LobsterAI** | OpenClaw 桌面客户端 | 桌面端知识工作者 | Electron/React，Cowork 本地文件协作，深度绑定 OpenClaw |
| **Moltis** | 沙箱/容器编排+浏览器自动化 | 需要隔离执行环境的用户 | 多后端（含 apple-container），CDP 交互 UI |
| **CoPaw (QwenPaw)** | Qwen 生态+Console WebUI | 中文用户、Qwen 模型使用者 | TypeScript 前端，插件体系，2.1 beta 密集修 bug |
| **ZeptoClaw** | — | — | 无活动 |
| **ZeroClaw** | SOP 驱动的自动化流程 | 复杂自动化/运维场景用户 | Rust，大配置 schema，SOP 子系统，渠道功能全面 |

**关键差异**：OpenClaw 是“大而全”，IronClaw 是“企业级严谨”，ZeroClaw 是“流程自动化”，NanoBot 是“平台嵌入”，LobsterAI 是“桌面体验”，Moltis 是“沙箱隔离”。这些差异使生态呈现互补格局，而非同质竞争。

## 6. 社区热度与成熟度

### 活跃度分层

- **第一梯队（高活跃，日 PR 50+ 或合并量大）**：OpenClaw、NanoBot、IronClaw、CoPaw、ZeroClaw
- **第二梯队（中高活跃，日 PR 20-50）**：Hermes Agent、NanoClaw、LobsterAI
- **第三梯队（中等活跃，日 PR <10）**：PicoClaw、Moltis
- **第四梯队（低/无活跃）**：NullClaw、ZeptoClaw

### 成熟度评估

- **快速迭代/功能扩展期**：OpenClaw（规模驱动）、ZeroClaw（渠道与 SOP 扩展）、NanoBot（平台化转型）
- **质量巩固/打磨期**：IronClaw（RC 发布，P1 快速修复）、CoPaw（2.1 beta 收敛）、NanoClaw（架构重构+可靠性加固）
- **存在流程瓶颈**：Hermes Agent（合并率低，安全修复滞留）、Moltis（PR 长期不合并）
- **健康度预警**：OpenClaw（P1 积压）、LobsterAI（stale 关闭不等于修复）、ZeroClaw（SOP 静默失败密集）

## 7. 值得关注的趋势信号

1. **静默失败成为第一公敌**：多个项目最严重的 Bug 都是“用户无感知地丢消息/丢状态”。AI Agent 的信任建立在“每次请求都有明确结果或错误”之上，开发者应优先构建可观测性、失败告警和自动恢复机制。

2. **MCP 正从“协议”变成“生态护城河”**：远程 MCP、子代理继承、连接状态可视化、故障恢复均在本日出现。谁能让 MCP 工具更稳定、更易接入，谁就能吸引更多集成商和用户。

3. **Agent“说谎”问题的严重性被正视**：IronClaw 针对 Agent 虚构状态的高优修复，OpenClaw 的记忆投毒防护，都指向同一个方向——**Agent 的每一步断言都需要可验证来源**。未来工具链中，带证据链的决策日志可能成为标配。

4. **成本失控是生产落地的隐形杀手**：NanoBot 一次异常消耗半月 token，CoPaw 一个 CSS 动画吃掉 20% CPU。随着 Agent 长期运行，预算上限、资源隔离和异常中断机制将成为基础要求。

5. **跨项目迁移用户放大体验差距**：有用户从 Moltis 迁移到 ZeroClaw，并明确对比功能缺失；LobsterAI 的“模型全局瘫痪”问题也揭示了故障隔离的价值。项目间竞争已从“有没有”转向“好不好用”和“坏不坏得起”。

6. **中文用户群体的重要性显著上升**：CoPaw 的 QQ 群、微信群、中文 IME 崩溃，PicoClaw 的 Feishu 中文文件名问题，均反映非英语市场的需求正倒逼项目本地化适配。支持多字节编码、中文输入法、国内 IM 渠道将成为差异化加分项。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时内 NanoBot 的 PR 活动量处于高位：共 116 条 PR 更新，其中 104 条被合并/关闭，12 条待合并；Issues 更新 5 条（3 条新开/活跃，2 条已关闭）；无新版本发布。值得关注的是，关闭的 PR 中包含大量 4-6 月创建、带有冲突标记的早期贡献，表明维护者在进行一次积压清理；与此同时，只读会话、子代理 MCP 工具继承、MCP 运行时连接状态可视化等高质量 PR 正在推进，项目整体仍处于活跃迭代通道。但“agent 重复回复”“Dream 记忆整理无限循环”两项稳定性问题引发了社区对资源成本和使用体验的关注，是当前需要优先跟进的信号。

---

## 2. 版本发布

过去 24 小时无新版本 Release 发布。

---

## 3. 项目进展

过去 24 小时合并/关闭的 104 条 PR 中，较能体现项目前进方向的有：

- **feat(agent): skip LLM processing for read_only sessions**（[#4271](https://github.com/HKUDS/nanobot/pull/4271)）  
  支持通过 session metadata 标记只读会话（如系统配置页、项目指南、FAQ 等），禁止触发 LLM，仅返回静态提示。不创建 task、不消耗并发槽位、不获取 session lock/gate。为平台构建者提供了资源节省和权限控制的新手段。

- **feat: allow subagents to inherit MCP tools**（[#4192](https://github.com/HKUDS/nanobot/pull/4192)）  
  新增 `tools.subagentMcpAccess` 配置，允许派生 subagent 继承主 agent 的实时 `mcp_*` 工具；默认关闭（opt-in），并附带回归测试。修复 [#4166](https://github.com/HKUDS/nanobot/issues/4166)，显著增强多代理协作场景下工具链的复用能力。

- **feat(ws): accept target_chat_id hint in new_chat for session recovery**（[#4139](https://github.com/HKUDS/nanobot/pull/4139)）  
  解决云/本地部署中页面刷新后 WebUI 发送 `new_chat` 导致历史丢失的问题，通过接受 `target_chat_id` 提示实现会话恢复。这是从大型部署场景拆出的聚焦性改进。

- **feat(memory): compress long tool results before LLM consolidation**（[#3880](https://github.com/HKUDS/nanobot/pull/3880)）  
  归档闲时会话前，将单个超过 10k 字符的工具结果（文件读取、shell 输出）做静态截断，避免主对话逻辑被工具输出淹没，降低归档 LLM 的输入成本。

- **fix(webui): soften form control focus rings**（[#5326](https://github.com/HKUDS/nanobot/pull/5326)）  
  将表单控件的 opaque 焦点环替换为柔和的 2px inset 指示器，并统一了输入框、文本域、原生 automation select 与 prompt 搜索的焦点处理。纯 UI 打磨，但体现 WebUI 体验细节的持续改进。

- **feat(cli): add session management commands (list/export/delete)**（[#3777](https://github.com/HKUDS/nanobot/pull/3777)）  
  新增 `nanobot sessions` 命令组：list 显示所有会话，export 导出为 Markdown/JSON，delete 带确认删除。全部复用现有会话存储逻辑，补足了 CLI 侧会话管理空白。

**清理信号**：大量早期 PR 被批量关闭，如 [#3323](https://github.com/HKUDS/nanobot/pull/3323)（Telegram 按聊天组策略覆盖）、[#3970](https://github.com/HKUDS/nanobot/pull/3970)（Azure Speech 语音转文本）、[#3921](https://github.com/HKUDS/nanobot/pull/3921)（JSONL 用量日志 + /insights）、[#3589](https://github.com/HKUDS/nanobot/pull/3589)（Discord 交互组件）、[#3628](https://github.com/HKUDS/nanobot/pull/3628)（before_process 钩子）等，均带 `conflict` 标记。这些功能实现完整但因分支过期关闭，建议维护者确认是否仍纳入路线图。

---

## 4. 社区热点

- **PR #5326：fix(webui): soften form control focus rings**（[链接](https://github.com/HKUDS/nanobot/pull/5326)）  
  评论数最多的 PR 之一。焦点样式属于细节改进，却能获得大量关注，侧面说明 WebUI 用户基数可观、视觉体验是被高频感知的维度。该 PR 已关闭（合入）。

- **Issue #5256：/goal message produces dozens of repeated replies**（[链接](https://github.com/HKUDS/nanobot/issues/5256)）  
  自 8 月 5 日开放，今日仍在更新。单个 /goal 消息在等待用户回答时产生几十条近乎相同的回复，用户只能手动介入才能终止，属于“agents 自我刷屏”类杀伤力很强的体验问题。

- **Issue #5324：Dream memory consolidation infinite loop**（[链接](https://github.com/HKUDS/nanobot/issues/5324)）  
  8 月 10 日创建、当日关闭。异常运行 23 分钟、消耗超 10M token（约半月用量），是关乎用户成本的最严重稳定性问题之一，讨论和关注度很高。

- **PR #5331：fix(webui): surface MCP runtime connection failures**（[链接](https://github.com/HKUDS/nanobot/pull/5331)）  
  开放中。将 MCP 的 connecting/connected/failed 状态从持久化配置中拆出，基于真实 gateway 连接尝试实时渲染 Apps 卡片；对 OAuth、custom 等失败场景暴露恢复入口。MCP 是当前最活跃的功能域之一。

---

## 5. Bug 与稳定性

按严重程度排列：

1. **（严重，已修复）Dream 记忆整理无限循环导致 10M+ token 消耗**（[#5324](https://github.com/HKUDS/nanobot/issues/5324)）  
   2026-08-10 16:45-17:08 异常运行 23 分钟，消费超 10M token（约半个月用量）。根因是 `edit_file` 接受无意义（no-op）编辑后，记忆整理流程陷入无限循环。该 issue 已在创建当日关闭，用户成本损失巨大，建议维护者将修复 commit 在 changelog 中显著标注。

2. **（中等，开启中）/goal 指令产生几十条重复回复**（[#5256](https://github.com/HKUDS/nanobot/issues/5256)）  
   等待用户回答期间 agent 持续输出近相同内容，直到用户介入或模型识别出系统循环并取消 goal。触发条件未完全明确，截至 8 月 11 日无对应修复 PR。

3. **（中等，开启中）推理过程中随机重复同一消息**（[#5327](https://github.com/HKUDS/nanobot/issues/5327)）  
   用户让 agent 调查问题时随机复读“Good points, let me investigate the issue”等短语。与 #5256 可能共享根因，建议维护者合并排查。

---

## 6. 功能请求与路线图信号

- **OpenRouter Server Tools 支持**（[#5333](https://github.com/HKUDS/nanobot/issues/5333)，新开）  
  用户请求将 OpenRouter 的 server tools（Web Search、Web Fetch、Fusion 等）通过 `tools` 字段接入，并提到此前已有相关 commit 但未落地。若呼声持续，这是低成本高收益的 provider 能力补强。

- **MCP OAuth 网页授权**（[#5297](https://github.com/HKUDS/nanobot/issues/5297)，已关闭）  
  用户希望支持需要 OAuth 网页授权的 MCP 服务（如 XMind MCP），并期望通过 gateway 获取授权信息，使非本机远程访问成为可能。虽然 issue 已关闭，但 [#5331](https://github.com/HKUDS/nanobot/pull/5331) 正在推进 MCP 失败状态与 OAuth 恢复的可视化，说明该方向仍在演进。

- **read_only 会话（#4271）与子代理 MCP 继承（#4192）**：两者均已合入主线，表明项目正从单用户单机走向多代理、平台化部署形态。下一版本可预期在资源控制和工具复用方面有更多配置化能力。

---

## 7. 用户反馈摘要

- **成本敏感度极高**：[#5324](https://github.com/HKUDS/nanobot/issues/5324) 用户对“半月 token 用量”级别的异常消耗做了完整日志分析并提交 issue，说明真实用户对记忆整理这类后台任务的资源消耗非常敏感。后台任务需要有预算上限或异常退出机制。

- **重复回复严重降低信任**：[#5256](https://github.com/HKUDS/nanobot/issues/5256) 与 [#5327](https://github.com/HKUDS/nanobot/issues/5327) 用户均描述 agent 在推理/等待期间“随机但频繁”地刷屏。这类“agent 自己反复说同一句话”的行为会直接打断对话流，是社区容忍度最低的体验缺陷之一。

- **MCP OAuth 是真实场景缺口**：[#5297](https://github.com/HKUDS/nanobot/issues/5297) 用户明确给出了需要 OAuth 网页授权的具体服务（XMind），说明真实用户已开始在生产中接入需要鉴权的第三方 MCP，该能力缺失会阻塞一批实际使用场景。

- **新用户整体满意度健康**：[#5333](https://github.com/HKUDS/nanobot/issues/5333) 开局即表达“thank you for creating such an amazing project”，功能请求以增量场景为主，未见替代性抱怨，社区情绪整体积极。

---

## 8. 待处理积压

- **#5256 / #5327（agent 重复回复）**：两 issue 极可能指向同一循环控制缺陷，均已开放且无关联修复 PR，建议按 P1 处理。[#5256](https://github.com/HKUDS/nanobot/issues/5256) · [#5327](https://github.com/HKUDS/nanobot/issues/5327)

- **#5331（MCP 运行时连接失败展示）**：开放中。MCP 是当前社区关注度最高的功能域，该 PR 直接决定 MCP 故障排查体验，建议优先 review 并合入。[链接](https://github.com/HKUDS/nanobot/pull/5331)

- **#5333（OpenRouter Server Tools）**：新开暂无评论。建议维护者尽早回应是否纳入路线图，避免用户长时间等待。[链接](https://github.com/HKUDS/nanobot/issues/5333)

- **被关闭的早期高质量 PR**：8 月 11 日集中关闭了一批 4-6 月提交的 PR，包括 Telegram per-chat group policy（#3323）、Discord 交互组件（#3589）、JSONL 用量日志 + /insights（#3921）、Azure Speech 语音转文本（#3970）、模块化系统提示词（#4022）。这些功能实现完整、社区有真实需求，若仍在路线图中，建议维护者邀请作者基于当前 nightly 分支重新提交，避免有价值的贡献流失。[#3323](https://github.com/HKUDS/nanobot/pull/3323) · [#3589](https://github.com/HKUDS/nanobot/pull/3589) · [#3921](https://github.com/HKUDS/nanobot/pull/3921) · [#3970](https://github.com/HKUDS/nanobot/pull/3970) · [#4022](https://github.com/HKUDS/nanobot/pull/4022)

---

**项目健康度总结**：PR 合并/关闭量（104 条）与待合并量（12 条）显示主干维护节奏正常，MCP、WebUI 是多产出的活跃领域；但 agent 循环控制相关的两个 bug 悬而未决，且两天内连续出现两个“重复回复”报告，建议优先投入。社区对新功能既感激又期待，处于健康开源项目的典型成长阶段。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-11

## 1. 今日速览

过去24小时项目保持高活跃度，共发生8条Issue更新和50条PR更新，但无新版本发布。最突出的是P1级Windows桌面端gateway回归（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)），团队当天即提交修复PR（[#83720](https://github.com/NousResearch/hermes-agent/pull/83720)），响应迅速。合并流程出现积压，仅3条PR被合并/关闭（可见数据确认[#83400](https://github.com/NousResearch/hermes-agent/pull/83400)），47条待合并PR中包含多个安全修复项。Issue侧8条全部为新增或活跃、0条关闭，处理速度低于新增速度。整体判断：开发活跃但合并瓶颈明显，安全相关修复需优先review。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去24小时确认关闭1条PR：[#83400](https://github.com/NousResearch/hermes-agent/pull/83400) feat(gateway): allow selective multiplex profile serving。该PR原计划为多profile共享gateway场景提供可选multiplex能力，当前状态为关闭（非合入）。另2条合并/关闭的PR未出现在展示列表中，本期无法确认其内容。

今日实质进展更多体现在新提交的关键修复PR上，等待合入的包括：
- [#83720](https://github.com/NousResearch/hermes-agent/pull/83720)（P1修复）：桌面端重启后不遗弃gateway并负责重新拉起，直击#83683回归
- [#83724](https://github.com/NousResearch/hermes-agent/pull/83724)（安全）：阻止被篡改的目录插件在拒绝前执行后门代码
- [#83713](https://github.com/NousResearch/hermes-agent/pull/83713)（稳定性）：对Telegram/Discord/Email等终端适配器连接失败分类并升级长时重试循环

这些PR若合入将实质性改善gateway稳定性与安全边界，但项目整体向前迈进的节奏目前受制于review队列。

## 4. 社区热点

按评论数排序：
- [Issue #18106](https://github.com/NousResearch/hermes-agent/issues/18106)（4条评论）是今日评论最多的问题，Email IMAP fetch错误自4月30日以来持续被讨论，反映邮箱平台适配问题的长期性。
- [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683)（2条评论，P1）：Windows用户遭遇桌面重启后gateway静默，社区在评论中确认了回归性质，且已有修复PR跟进。
- 新开issues中，[#83718](https://github.com/NousResearch/hermes-agent/issues/83718)（微信媒体消息批处理）、[#83680](https://github.com/NousResearch/hermes-agent/issues/83680)（Termux依赖回归）、[#83714](https://github.com/NousResearch/hermes-agent/issues/83714)（patch截断）各有1条评论。

PR侧评论数未在数据中显示，但从提交密度看，gateway、kanban、sessions相关的小步修复（[#83728](https://github.com/NousResearch/hermes-agent/pull/83728)、[#83727](https://github.com/NousResearch/hermes-agent/pull/83727)）是今日PR热点方向。

## 5. Bug 与稳定性

**P1 严重**
- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) Windows桌面重启会kill掉活跃gateway且不重新拉起，WeChat/QQ/Telegram全部静默。→ 已有修复PR [#83720](https://github.com/NousResearch/hermes-agent/pull/83720)

**P2 中等**
- [#83680](https://github.com/NousResearch/hermes-agent/issues/83680) Termux上cryptography升级到50.0.0后Rust扩展无法解析PyLong_Type，v0.20.0无法加载bundled secret sources。→ 无修复PR
- [#83714](https://github.com/NousResearch/hermes-agent/issues/83714) patch/write_file工具写入字面'...[truncated]'文本，直接损坏源代码文件。→ 无修复PR
- [#83716](https://github.com/NousResearch/hermes-agent/issues/83716) 桌面端新窗口打开session会窃取原窗口实时事件流，关闭弹窗后原窗口仍不恢复。→ 无修复PR

**P3 较低**
- [#18106](https://github.com/NousResearch/hermes-agent/issues/18106) Email IMAP fetch 'int' object has no attribute 'decode'，长期未修复
- [#83726](https://github.com/NousResearch/hermes-agent/issues/83726) Kanban缺少原子条件解除阻塞原语，并发场景下可能覆盖更强阻塞

**安全相关待合入修复**（当前均无merged状态）：
[#82830](https://github.com/NousResearch/hermes-agent/pull/82830) 绝对路径拼写绕过审批硬性下限、[#83724](https://github.com/NousResearch/hermes-agent/pull/83724) 插件后门预执行、[#75476](https://github.com/NousResearch/hermes-agent/pull/75476) interrupt_debug.log明文凭据泄漏、[#66926](https://github.com/NousResearch/hermes-agent/pull/66926) AQ.前缀Gemini密钥捕获。

## 6. 功能请求与路线图信号

- [#83718](https://github.com/NousResearch/hermes-agent/issues/83718)（duplicate）微信媒体消息应走debounce批处理，目前仅TEXT类型进入批处理管道，图片/图文场景各自触发agent调用。
- [#83715](https://github.com/NousResearch/hermes-agent/issues/83715) 群聊Codex类型智能体编辑时，内置Provider（如openai-codex）缺少模型选择下拉框，仅自定义Provider正常显示。
- [#83723](https://github.com/NousResearch/hermes-agent/pull/83723) webhook适配器识别X-Gitea-Event/X-Forgejo-Event头，扩展Forgejo/Gitea生态支持。
- [#48267](https://github.com/NousResearch/hermes-agent/pull/48267) 为llm-wiki技能增加OKF v0.2格式opt-in与迁移（6月18日提交，仍待合入）。
- [#76736](https://github.com/NousResearch/hermes-agent/pull/76736) 迁移至mcp 2.x SDK（8月2日提交，涉及较广兼容性改造）。

整体看，gateway多平台适配（WeCom/Signal/Forgejo）和桌面端体验是当前功能迭代的两大主线。

## 7. 用户反馈摘要

根据今日Issue描述中的用户反馈：

- **Windows桌面用户**（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)）明确表达对回归问题的挫败感，强调旧版本中gateway经reparent可存活于桌面重启，当前0.20.0必须手动重启才能恢复聊天机器人。
- **Termux / Android用户**（[#83680](https://github.com/NousResearch/hermes-agent/issues/83680)）报告升级cryptography后无法加载托管secret sources，移动端使用受阻。
- **开发者用户**（[#83714](https://github.com/NousResearch/hermes-agent/issues/83714)）描述patch工具在多行new_string场景下插入字面'...truncated...'文本，直接造成语法错误，认为这是工具可靠性的严重缺陷。
- **微信群聊用户**（[#83718](https://github.com/NousResearch/hermes-agent/issues/83718)）反馈多图消息被拆成多次agent调用，产生大量重复响应，期望合并批处理以降低噪音。
- **中文用户**（[#83715](https://github.com/NousResearch/hermes-agent/issues/83715)）在Studio群聊编辑Codex智能体时无法为内置Provider选择模型，只能通过API变通，影响上手体验。

## 8. 待处理积压

**长期未合入PR（按创建时间）：**
- [#48267](https://github.com/NousResearch/hermes-agent/pull/48267) OKF v0.2技能格式（6月18日）
- [#66926](https://github.com/NousResearch/hermes-agent/pull/66926) AQ.前缀Gemini密钥捕获（7月18日）
- [#71231](https://github.com/NousResearch/hermes-agent/pull/71231) 内置人格标签i18n本地化（7月25日）
- [#71490](https://github.com/NousResearch/hermes-agent/pull/71490) 混合批次工具执行permissiveness opt-out（7月25日，needs-decision）
- [#71884](https://github.com/NousResearch/hermes-agent/pull/71884) Signal改用/v1/receive轮询（7月26日，P2）
- [#75476](https://github.com/NousResearch/hermes-agent/pull/75476) interrupt_debug.log明文凭据（7月31日，P2）
- [#76736](https://github.com/NousResearch/hermes-agent/pull/76736) MCP SDK 2.x迁移（8月2日）
- [#77302](https://github.com/NousResearch/hermes-agent/pull/77302) 桌面端消息反应配置持久化（8月3日）

**长期活跃Issue：**
- [#18106](https://github.com/NousResearch/hermes-agent/issues/18106) Email IMAP fetch错误，4月30日创建，4条评论，P3低优先级但持续有用户触及。

**维护建议：** 47条待合并PR中至少包含1条P1回归修复（#83720）和3条安全加固（#82830、#83724、#75476），建议优先处理上述高风险合并；同时注意#71490、#71884等带needs-decision标签的PR，需维护者尽快明确方向。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去24小时 PicoClaw 项目整体活跃度中等偏缓。共产生 5 条 Issue 更新（新开 1 条、关闭 2 条）和 8 条 PR 更新（合并/关闭 6 条、待合并 2 条），无新版本发布。值得注意的是，社区侧提交的 PR 合并率较高（6/8），说明维护者有在积极推进外部贡献的合入；但同时多个 Issue 带有 stale 标记，存在一定的审查积压。今日新开的 Issue #3328 披露了一个配置项声明但无消费方的功能缺失问题，属于值得关注的代码质量问题。整体来看，项目处于持续的 bug 修复与功能打磨阶段，版本未迭代。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共 6 个 PR 被合并/关闭，重点进展如下：

- **#3327 feat(telegram): 用原生富消息渲染表格** — 合并。Telegram 渠道不再将表格降级为等宽代码块，而是用 Bot API 富消息渲染 GFM 表格与 HTML `<table>` 块（支持发送、回复/话题、编辑场景）。这显著改善了 Telegram 渠道的阅读体验。[PR #3327](https://github.com/sipeed/picoclaw/pull/3327)
- **#3326 fix(web): 移除 pnpm lock 重复条目** — 合并。修复了 `web/frontend/pnpm-lock.yaml` 中重复的 `semver@7.8.5` 映射导致 `pnpm install --frozen-lockfile` 失败的问题，保障 Web 前端构建链路的可用性。[PR #3326](https://github.com/sipeed/picoclaw/pull/3326)
- **#3297 fix(security): 加固远程提示词与执行边界** — 合并。将远程发送者与聊天元数据放入规范化的用户角色信封（而非 provider 系统指令）；远程执行默认禁用，启用后每次调用需独立审批，并在执行时再次执行来源策略；同时将配置迁移至 schema v4。这是安全模型的一次重要收紧。[PR #3297](https://github.com/sipeed/picoclaw/pull/3297)
- **#3295 fix(channels): 防止 SplitMessage 在超大 fence 头时挂起** — 合并。修复了开 fence 代码块信息字符串超过 `maxLen` 时 `SplitMessage` 挂起的问题；新增了回归测试覆盖。[PR #3295](https://github.com/sipeed/picoclaw/pull/3295)
- **#3296 i18n: 补全捷克语 code wrap 标签** — 合并。完善捷克语本地化。 [PR #3296](https://github.com/sipeed/picoclaw/pull/3296)
- **#1547 fix: 合并 PR #1466 #1465** — 关闭（合并）。（注：这是一个较早期的 PR，今日被关闭，建议确认合入结果。）[PR #1547](https://github.com/sipeed/picoclaw/pull/1547)

整体来看，修复集中在聊天消息分割稳定性、前端构建可靠性、Telegram 富文本体验和安全模型加固，项目在多渠道稳定性与安全加固上有了实质进展。

## 4. 社区热点

- **[Issue #3294] `/list models` 只显示当前模型而非所有配置模型**（评论 3 条，已关闭）。用户期望 `/list models` 按命令描述列出全部配置的模型，但实际只显示当前使用模型与 provider，引发了预期不符的讨论。背后反映出用户对命令行语义与实际输出一致性的诉求。[Issue #3294](https://github.com/sipeed/picoclaw/issues/3294)
- **[Issue #3301] 路由到非默认 agent 的会话中 `/clear` 与自动压缩不生效**（评论 3 条）。在通过 dispatch rules 路由的会话中，会话清理/压缩机制失效，影响长期使用体验。该问题反映了多 agent 路由场景下会话生命周期管理的薄弱环节。[Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)

社区反馈集中在命令行为一致性、路由场景下的会话管理等功能性问题，而非单纯的情绪表达。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高 | [#3311](https://github.com/sipeed/picoclaw/issues/3311) | 工具反复相同错误时，静默循环至 `max_tool_iterations`，用户永远得不到回复（生产环境 Telegram 实测） | OPEN，已有对应 PR #3312 |
| 中 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | 非默认 agent 的会话中 `/clear` 和自动压缩不生效 | OPEN |
| 中 | [#3328](https://github.com/sipeed/picoclaw/issues/3328) | `line.settings.webhook_host/webhook_port` 有默认值和文档但代码中无任何读取方，配置静默失效 | OPEN（今日新开） |
| 低 | [#3294](https://github.com/sipeed/picoclaw/issues/3294) | `/list models` 输出与命令描述不符 | CLOSED（stale） |

其中 #3311 已有对应的修复 PR #3312（打开中），是当前最值得关注的稳定性修复链路。

## 6. 功能请求与路线图信号

- **[Issue #3298] 添加 AI Router 作为 OpenAI-compatible provider 预设**（已关闭，stale）。作者（AI Router 维护者）建议将 AI Router 作为命名 provider 预设。使用通用 `openai` provider 虽然可行但用户无法直接选择命名路由方案。该请求虽已因 stale 关闭，但与 PR #3297 的安全边界收紧方向一致，后续若有贡献，可能进入下一版本路线图。[Issue #3298](https://github.com/sipeed/picoclaw/issues/3298)
- **远程执行安全模型升级** — PR #3297 默认禁用远程 exec + 每次调用独立审批，属于面向安全性的功能性收敛，建议关注文档与升级说明（schema v4 迁移）。

## 7. 用户反馈摘要

- **命令行语义预期偏差**（#3294）：用户根据 `/list models` 及其描述“Configured models”预期看到所有配置模型，实际只见当前模型。此类“命令名与行为不一致”的反馈可能对可用性口碑有影响。
- **生产环境长时间无响应**（#3311）：用户发消息要求执行 `git` 命令，因工具反复失败且无错误反馈，数分钟内无任何回复直到达到迭代上限。这对生产部署是高风险体验，用户明确表达“从未收到答案”。
- **配置静默失效**（#3328）：用户指出配置了 `webhook_host`/`webhook_port` 后没有任何效果，且代码中无消费方、无警告，属于“设置无效但无提示”的负面体验。

整体用户反馈集中于功能有效性、行为可预期性与配置透明性，而非单纯的功能缺失请求。

## 8. 待处理积压

- **[PR #3314] Fix: agent 无法执行加入 customAllowPatterns 的 shell 命令**（OPEN，stale，8/3 起无更新）。修复 `guardCommand` 中默认拒绝规则始终优先于 `customAllowPatterns` 的问题。涉及命令白名单配置的核心信任机制，建议优先审查合入。[PR #3314](https://github.com/sipeed/picoclaw/pull/3314)
- **[PR #3312] fix(agent): 重复相同工具失败时提前终止 turn**（OPEN，stale，8/2 起无更新）。对应 Issue #3311 的修复，直接解决生产环境用户无响应问题，建议重点关注并推进合入。[PR #3312](https://github.com/sipeed/picoclaw/pull/3312)
- **[Issue #3301] `/clear` 与自动压缩在路由会话中不生效**（OPEN，stale，8/10 有更新）。会话生命周期管理在多 agent 路由场景下存在缺口，影响长期使用体验，建议纳入计划。

---

*本日报基于 GitHub 数据自动生成，部分合并结果与影响面建议结合维护者确认。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-11

> 数据来源：github.com/qwibitai/nanoclaw | 统计窗口：2026-08-10 ~ 2026-08-11

## 1. 今日速览

过去 24 小时 NanoClaw 项目处于**高强度开发状态**：共产生 3 条 Issue 和 21 条 PR 更新，其中 9 条 PR 已合并/关闭、11 条待合并。今日无新版本发布。开发重心集中在三个方向：(1) 消息可靠性与去重、修复平台消息 ID 复用导致的静默丢消息问题；(2) 隐私安全加固（Telegram 配对码 CSPRNG、DM 日志脱敏）；(3) 系统架构重构（模块生命周期钩子、数据库迁移注册表、skill 宿主隔离）。Issue 侧最突出的主题是 **"静默失败"（silent failure）**——多条消息被丢弃后用户/操作员毫无感知，这是当前最值得重视的稳定性隐患。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日合入的 PR 在 **架构收敛** 和 **隐私/安全加固** 两条线上有明显推进：

**架构重构（zvi-fried 系列，批量合入）**
- [refactor(db): add module migration registry #3212](https://github.com/qwibitai/nanoclaw/pull/3212) — 为 DB 模块引入迁移注册表，统一数据库结构变更管理。
- [refactor(host): unify module lifecycle hooks #3214](https://github.com/qwibitai/nanoclaw/pull/3214) — 统一宿主模块生命周期钩子，降低模块接入成本。
- [refactor(channels): register question renderers #3213](https://github.com/qwibitai/nanoclaw/pull/3213) — 通道层问题渲染器改为注册制。
- [refactor: add host seams for skill-owned capabilities #3186](https://github.com/qwibitai/nanoclaw/pull/3186) — 为 skill 自有能力增加宿主隔离接缝。
- [docs(skills): define single-responsibility integration rule #3211](https://github.com/qwibitai/nanoclaw/pull/3211) — 以文档形式固化 skill 集成的单一职责规则。

这批重构表明项目正在为 **Agent Plugins 1.0（#3220）** 铺路——将 skill/模板体系向插件化、模块化迁移。

**隐私与安全修复**
- [fix: deduplicate turn-scoped chat delivery #3228](https://github.com/qwibitai/nanoclaw/pull/3228) — 修复单轮会话内聊天消息重复派发的问题。
- [feat(permissions): add opt-in privacy-safe DM logs #3222](https://github.com/qwibitai/nanoclaw/pull/3222) — 新增可选隐私安全 DM 日志，默认保留原有详细日志行为。
- [fix(permissions): redact DM resolution logs #3215](https://github.com/qwibitai/nanoclaw/pull/3215) — 对 DM 解析日志进行脱敏处理。

**文档**
- [docs(hardened-image): note that install_packages covers apt and npm only #3216](https://github.com/qwibitai/nanoclaw/pull/3216) — 明确 hardened-image 中 `install_packages` 仅覆盖 apt/npm，避免用户误用。

整体来看，项目在 **内部治理** 上迈出了一大步，模块化/插件化架构逐步成型；安全与隐私相关的 PR 密集合入，体现维护团队对合规风险的重视。

---

## 4. 社区热点

今日讨论热度最高的议题集中在 **"消息被静默丢弃"** 这一现象上，两条 Issue 高度相关：

- [Issue #3226 Inbound messages silently dropped when a platform reuses a message id](https://github.com/qwibitai/nanoclaw/issues/3226) — 用户 dweekly 报告：当平台在同一个 session 中复用了之前的 message id，入站消息被静默丢弃，agent 完全收不到，用户侧也无任何提示。**该 Issue 发布后 24 小时内即出现对应修复 PR #3224**，说明维护者响应迅速。
- [Issue #3075 Silent log loss + inbound message duplicate-insert errors after long uptime](https://github.com/qwibitai/nanoclaw/issues/3075) — 长期运行后出现静默日志丢失和入站消息重复插入错误，时间跨度接近一个月（7-17 创建），仍在活跃讨论。

背后的诉求很明确：**用户对"静默失败"零容忍**。无论是消息 ID 冲突还是日志丢失，用户无法区分"agent 忽略了我"和"系统故障"，这对 AI 助手的信任建立是致命的。好消息是 #3224 已经针对 #3226 提出了修复方案，待合并。

---

## 5. Bug 与稳定性

按严重程度排列今日活跃的 Bug 类 Issue/PR：

| 严重度 | 编号 | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3226](https://github.com/qwibitai/nanoclaw/issues/3226) | 平台复用 message ID 时入站消息被**静默丢弃**，用户无法感知 | 已有 fix PR [#3224](https://github.com/qwibitai/nanoclaw/pull/3224) |
| 🔴 高 | [#3075](https://github.com/qwibitai/nanoclaw/issues/3075) | 长时间运行后**静默日志丢失** + 入站消息重复插入错误（Matrix 通道） | 待修复，注意其环境为 WSL2 + Docker + Matrix |
| 🟠 中 | [#3223](https://github.com/qwibitai/nanoclaw/issues/3223) | 计划任务执行出错时，错误消息**无法路由且被静默丢弃**，操作员无法得知任务失败 | 待修复，无对应 PR |
| 🟡 安全 | [#3229](https://github.com/qwibitai/nanoclaw/pull/3229) | Telegram 配对码使用 `Math.random()` 生成，存在可预测性风险 | 修复 PR 已提交，待合并 |
| 🟡 安全 | [#3225](https://github.com/qwibitai/nanoclaw/pull/3225) | Telegram 配对目录/存储文件权限过于宽松 | 修复 PR 已提交，待合并 |

核心风险集中在消息可靠性。值得注意的是 #3224 的根因分析能力很强——直接定位到 session 数据库主键冲突，将异常场景转为可恢复路径。同时 #3225/#3229 两个 Telegram 安全加固 PR 互相重叠（均由 dweekly 提交），建议维护者合并评审，避免冲突。

---

## 6. 功能请求与路线图信号

- **远程 Streamable HTTP MCP 服务器** —— 两个 PR 并行推进，是当前最大的功能主线：
  - [PR #3092 feat: support remote Streamable HTTP MCP servers](https://github.com/qwibitai/nanoclaw/pull/3092)（引擎 + Claude provider 支持）
  - [PR #3221 feat(providers): remote Streamable HTTP MCP servers for codex and opencode](https://github.com/qwibitai/nanoclaw/pull/3221)（补齐 codex/opencode 通道）
  
  两个 PR 配合意味着 NanoClaw 的 MCP 能力将从 stdio 本地进程扩展到**远程 HTTP 服务器**，这将是 v2 走向生产环境的关键能力。

- **Agent Templates → Agent Plugins 1.0.0** —— [PR #3220](https://github.com/qwibitai/nanoclaw/pull/3220) 是破坏性变更（feat!），将 agent templates 迁移为 Agent Plugins 1.0.0 目录结构。这是模板功能的一次格式大迁移，需要关注升级兼容性。

- **CLI 支持有界 JSON 标准输入** —— [PR #3218 feat(cli): accept bounded JSON from stdin](https://github.com/qwibitai/nanoclaw/pull/3218) 为 `ncl` 客户端增加 `--stdin-json` 模式，提供有界、结构化的参数输入方式，属开发者体验改进。

综合来看，**MCP 远程化**和 **Agent Plugins 体系**是最可能进入下一版本的两大特性。

---

## 7. 用户反馈摘要

来自 Issue 评论的真实用户声音：

- **对静默失败的失望**（#3226）："从用户的角度，这根本无法与'agents 忽略了我'区分开。" —— 用户对消息丢失的感知等同于 AI 助手的"失职"，这是产品信任度的直接威胁。
- **部署环境多样性带来挑战**（#3075）：用户在 WSL2 + Docker Desktop + Matrix 本地服务器的复杂环境下做长期运行测试，暴露了 uptime 相关的资源或状态管理问题。用户提交了完整的环境和复现信息，质量很高。
- **运维可观测性缺失**（#3223）：计划任务（scheduled tasks）失败时错误消息没有路由目标，操作员永远不知道任务失败。这是一个典型的 **"无人值守任务"** 场景痛点——自动化程度越高，失败可见性越重要。

综合反馈：用户对 NanoClaw 的通道扩展能力有较高期待（Matrix、Telegram、远程 MCP），但对 **错误可观测性** 和 **消息不丢失** 有更迫切的诉求。

---

## 8. 待处理积压

以下 Issue/PR 长期未得到合并或响应，建议维护团队重点关注：

| 编号 | 类型 | 创建时间 | 搁置时长 | 说明 |
|---|---|---|---|---|
| [PR #2134](https://github.com/qwibitai/nanoclaw/pull/2134) | fix(setup) | 2026-04-29 | **超过 3 个月** | Apple Silicon + Colima 环境变量未包含在 launchd plist 中，影响 macOS 用户安装体验 |
| [PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909) | feat(setup) | 2026-07-02 | **约 6 周** | 模板设置流程 + 首个 agent 印章功能，与 #3220（Agent Plugins 1.0）路线相关，建议联动推进 |
| [Issue #3075](https://github.com/qwibitai/nanoclaw/issues/3075) | bug | 2026-07-17 | **约 4 周** | 静默日志丢失 + 重复插入错误，仍处于 OPEN 状态，虽有讨论但无明确 fix 计划，需要维护者确认是否由 #3224 一并解决 |

值得注意：#2134 是当前积压最久的 PR，虽是小改动但影响 Apple Silicon 用户的安装体验，优先级建议上调；#3075 与 #3226 同属消息可靠性问题，建议合并追踪。

---

**总结**：NanoClaw 今日处于"架构大扫除 + 安全加固"的高活跃阶段，PR 吞吐量可观（24h 内 21 条更新）。但在版本发布缺失、消息可靠性 Bug 频出的背景下，**建议下一步将"消息不丢失 + 失败可见"作为最高优先级**，同时加速推进远程 MCP 和 Agent Plugins 两项预发布特性。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目日报 — 2026-08-11

## 1. 今日速览

过去 24 小时项目处于低活跃状态：1 条 Issue 被关闭（#700），无新增/活跃 Issue，无 PR 活动，无版本发布。值得注意的是，#700 从创建到关闭历时近 5 个月，最终在昨天（08-10）被标记为关闭，但当日无对应 PR 合并记录，说明该功能请求的收尾可能以「非代码合并」方式完成（如已在其他分支实现、被拒绝或判定为重复）。社区讨论热度较低，仅 1 条评论与 1 个 👍，整体项目节奏偏平静，处于合理维护区间。

## 3. 项目进展

无 PR 被合并或关闭，代码库今日无直接变更记录。唯一动态是 **Issue #700 被关闭**，该 Issue 提出为 nullclaw 增加 `a2a_call` 客户端工具，使 agent 能够向远程 agent 发送 A2A 协议（v0.3.0）的 `message/send` JSON-RPC 请求。虽然今日没有对应的 PR 合入，但该长期开放的 Issue 被正式关闭，意味着此项 A2A 客户端能力的功能请求有了明确结论 — 无论是通过已实现代码收尾，还是被移出路线图，对潜在贡献者都是一个重要的信号：**在投入开发前需先确认该能力的实际落地状态**。

🔗 [Issue #700: Add a2a_call client tool for calling remote agents](https://github.com/nullclaw/nullclaw/issues/700)

## 4. 社区热点

今日唯一被更新的 Issue 为 **#700**（评论 1，👍 1）。（注：由于数据中未附 Issue #700 的具体评论内容，无法进一步归纳讨论观点。）

从 Issue 摘要可看出，用户的核心场景是**多实例互联**：同时运行两个 nullclaw 实例（一个对外服务的 "doorman" 和一个私有个人 agent），并在两者之间建立远程调用通道。该场景反映了当前 AI agent 生态中「agent 间通信（A2A）」的早期采纳需求，用户希望 nullclaw 不局限为 A2A 服务提供方，也能扮演客户端角色，实现双向互操作。

🔗 [Issue #700](https://github.com/nullclaw/nullclaw/issues/700)

## 5. Bug 与稳定性

今日无新增 Bug、崩溃或回归问题报告。项目稳定性方面未见负面信号。

## 6. 功能请求与路线图信号

- **A2A 客户端能力（a2a_call）** — Issue #700 的核心诉求是让 nullclaw 具备 A2A 客户端调用能力，而不仅是服务端实现。该 Issue 已于今日关闭，但无对应 PR 合并记录，存在两种可能：
  1. **已在其他渠道实现**（如未关联的 PR、分支或私有代码），关闭 Issue 仅作归档；
  2. **未被采纳**，关闭时未附带代码变更。

  鉴于 A2A 协议 v0.3.0 在生态中处于快速演进期，如果该能力尚未落地，未来可能以其他形式（如独立的 `a2a` 命令族）再次出现在路线图中。建议维护者在关闭 Issue 时补充关闭理由（如「已实现」/「won't fix」/「duplicate」），以增强项目可追溯性。

## 7. 用户反馈摘要

从 Issue #700 的描述中可提炼出以下真实用户信息：

- **使用场景**：用户运行多个 nullclaw 实例并希望其互相通信，典型组合是「对外门面 + 私有个人 agent」。
- **痛点**：nullclaw 实现了 A2A 服务端协议，但缺少配套的客户端调用工具，导致同一项目的多实例间无法直接通过标准 A2A 消息互访。
- **诉求**：希望提供 `message/send` 的客户端封装，将远程 agent 调用能力融入工具链（tool calling）体系。
- **积极信号**：用户愿意自行构建工具并提交 Issue，说明 nullclaw 的扩展性设计（工具机制）能够支撑此类二次开发，但 OOTB（开箱即用）的 A2A 集成深度仍待加强。

## 8. 待处理积压

今日数据未显示长期未响应的重要 Issue 或 PR。需关注的是 #700 关闭后是否遗留**文档更新**任务（如 README 中 A2A 能力说明需同步）以及是否有**后续跟进 PR** 待补充 —— 建议维护者确认关闭原因的记录是否完整，避免贡献者重复提交同类功能。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-11

## 1. 今日速览

过去 24 小时 IronClaw 项目进入 **高活跃度** 迭代状态：22 条 Issue 更新（新开/活跃 12、关闭 10），50 条 PR 更新（待合并 33、合并/关闭 17），并发布 1 个紧急补丁候选版本 `v1.1.1-rc.1`。当前开发重心集中在 **Agent 行为可信度修复**、**统一渠道模型重构**、**持久存储架构调整** 与 **模型偏好管理** 四大方向。核心维护者对 QA 上报的 3 个 P1 缺陷实现了当日批量修复（PR #7474），社区反馈整体积极；但 CI 工件体积、AGENTS.md 系统提示词同步失效等长期问题仍在积压，需持续关注。

---

## 2. 版本发布

### ironclaw-v1.1.1-rc.1（2026-08-10）

**定位**：1.1 产品线的紧急补丁候选版本，聚焦渠道投递、MCP 兼容性与 WebUI 稳定性的快速收敛。

**主要更新**：
- **渠道投递与配对**：修复 channel delivery 与 pairing 流程中的稳定性问题
- **IronHub / 自定义 MCP 兼容性**：改善自定义 MCP 服务器接入的兼容性
- **WebUI 流式（streaming）稳定性**：修复流式响应中的连接与渲染问题
- **持久化检索（durable retrieval）**：优化持久状态下的数据检索可靠性
- **安全升级路径**：支持从两个受支持的稳定前序版本直接升级

**⚠️ 迁移注意**：
- 从 **1.0.0 升级** 时，必须先停止所有写入器（writers），以避免升级过程中产生数据不一致。

🔗 [查看 Release 详情](https://github.com/nearai/ironclaw/releases)

---

## 3. 项目进展

过去 24 小时 **合并/关闭** 的重要 PR，集中体现了近期项目的推进方向：

| PR | 内容 | 关联 |
|---|---|---|
| [#7474](https://github.com/nearai/ironclaw/pull/7474) | **批量修复 3 个 QA P1 缺陷**：阻止 Agent 断言未验证状态（自动化状态、GitHub 连接、Telegram 例程）。每个 issue 单独 commit，修复前先做确定性复现 | #7246、#7247、#7294 |
| [#7426](https://github.com/nearai/ironclaw/pull/7426) | **持久内存奇偶校验矩阵**：新增 `memory_roundtrip` / `memory_grow` / `memory_mixed` 生产脚本化压力测试，覆盖 4KiB–1MiB 文档规模 | — |
| [#7381](https://github.com/nearai/ironclaw/pull/7381) | **doc-truth 流水线设计记录**：以 as-built 文档形式固化文档漂移治理方案，确认 `docs-live` 部署分支 + 确定性校验 | #7317 |
| [#7336](https://github.com/nearai/ironclaw/pull/7336) | **steering 重放去重**：保留已消费 steering 消息的有限持久身份窗口，避免重放导致重复模型迭代与重复回复 | — |

这些合并意味着项目在一周内同时完成了 **AI 行为可信度修复**、**数据层可靠性验证**、**文档治理机制落地** 与 **核心循环防重放保障**，整体工程健康度有明显提升。

---

## 4. 社区热点

| 条目 | 类型 | 评论数 | 分析 |
|---|---|---|---|
| [#7137](https://github.com/nearai/ironclaw/issues/7137) | Issue（OPEN） | **12** | live-canary 工作流分片工件体积达 700MB–1.5GB，总计超 5GB。社区对 CI 基础设施成本与效率的关注度最高，背后诉求是 **降低 GitHub Actions 存储消耗并提升排障体验** |
| [#7317](https://github.com/nearai/ironclaw/issues/7317) | Issue（CLOSED） | 3 | Doc-Truth 验证流水线提案，社区提出文档漂移问题后，团队快速以设计记录 PR 承接并关闭，展示了 **用户→维护者的高效闭环** |
| [#3762](https://github.com/nearai/ironclaw/issues/3762) | Issue（OPEN） | 2 | Web UI 编辑 `AGENTS.md` 不更新系统提示词，属于 **长期未解决的用户痛点**，社区对此保持关注 |
| [#7481](https://github.com/nearai/ironclaw/issues/7481) | Issue（OPEN） | 0（新开） | 左侧导航长对话标题悬停显示，当天即有对应 PR #7480 实现，可见社区建议被采纳的速度 |

---

## 5. Bug 与稳定性

### 🔴 P1（已修复）
| Bug | 描述 | 修复 PR |
|---|---|---|
| [#7246](https://github.com/nearai/ironclaw/issues/7246) | Agent 虚构"自动化正在运行"状态，实际无任何自动化 | [#7474](https://github.com/nearai/ironclaw/pull/7474) |
| [#7247](https://github.com/nearai/ironclaw/issues/7247) | Agent 未验证就声称 GitHub 已连接 | [#7474](https://github.com/nearai/ironclaw/pull/7474) |
| [#7294](https://github.com/nearai/ironclaw/issues/7294) | Agent 将其他作用域的 Telegram 例程错误记入当前上下文 | [#7474](https://github.com/nearai/ironclaw/pull/7474) |

### 🟡 新发现 Bug（有修复 PR / 待处理）
| Bug | 描述 | 状态 |
|---|---|---|
| [#7473](https://github.com/nearai/ironclaw/issues/7473) | connect-nudge 节流在"已投递但无 vendor ref"时被提前释放，可能导致重复提醒用户 | 修复 PR [#7475](https://github.com/nearai/ironclaw/pull/7475) 已开 |
| [#7476](https://github.com/nearai/ironclaw/issues/7476) | `classify_delivery_outcome` 失败路径忽略 `vendor_message_refs`，隐藏部分投递证据 | 暂无 fix PR，建议与 #7475 一并处理 |

### 🟠 值得关注的功能性修复（PR 待合入）
- **[#7470](https://github.com/nearai/ironclaw/pull/7470)**：修复 `thread_index` 行在无排序投影元数据时无法在侧边栏/list API 中列出的问题。

### 🟣 长期未解决
- **[#3762](https://github.com/nearai/ironclaw/issues/3762)**：Web UI 编辑 `AGENTS.md` 不更新系统提示词（自 2026-05-18 开放，标记 suggested_P1，目标 v1.3.0）。
- **[#6834](https://github.com/nearai/ironclaw/issues/6834)**：Slack 集成设置失败（near.foundation 账号），已关闭但未在数据中看到对应修复 PR。

### ⚪ CI / 性能优化
- **[#7137](https://github.com/nearai/ironclaw/issues/7137)**：live-canary 分片工件体积过大，建议排除可再生成/中间路径。社区最热话题，尚未合入修复。

---

## 6. 功能请求与路线图信号

### 高概率纳入 v1.3.0 的功能
| 功能 | 相关 PR/Issue | 说明 |
|---|---|---|
| **模型偏好管理** | [#7440](https://github.com/nearai/ironclaw/pull/7440)、[#7428](https://github.com/nearai/ironclaw/pull/7428)、[#7439](https://github.com/nearai/ironclaw/pull/7439) | 三 PR 形成完整闭环：非管理员可用模型偏好设置 + 租户级模型选择策略 + 每用户 `/model` 命令 |
| **Extensions vNext** | [#7354](https://github.com/nearai/ironclaw/issues/7354) | Web Push、富消息、Telegram 用户会话、Signal 渠道，目标 2026-08-14 |
| **统一渠道模型** | [#7477](https://github.com/nearai/ironclaw/pull/7477) | 所有渠道（web-app/Slack/Telegram）统一为一个 ChannelAdapter，覆盖入站、回复、通知三类能力，属架构级重构 |

### 新方向的 Epic 信号
- **渠道优先入门**（[#7044](https://github.com/nearai/ironclaw/issues/7044)，v1.4.0）与 **AI Chat 全量配置**（[#7046](https://github.com/nearai/ironclaw/issues/7046)）：降低新用户上手门槛，聚焦首次体验。
- **Company Brain FDE**（[#7465](https://github.com/nearai/ironclaw/issues/7465)）：新开 Epic，预示团队开始探索企业级知识库方向。
- **Reborn 持久状态 profile-agnostic**（[#7467](https://github.com/nearai/ironclaw/issues/7467)）：对应 PR [#7456](https://github.com/nearai/ironclaw/pull/7456)，解决部署配置切换时数据"消失"的迁移问题。

### 即时 UX 改进
- **[#7480](https://github.com/nearai/ironclaw/pull/7480)**：悬停显示完整对话标题（MarqueeText 组件），针对 Issue #7481 当日产出。

---

## 7. 用户反馈摘要

从近期 Issue 与 PR 讨论中提炼的真实用户反馈：

- **对 Agent 行为可信度提出质疑**（QA 用户 joe-rlo 报告）：Agent 在未实际检查时断言"已连接、已配置、正在运行"，影响用户对 AI 能力的信任。此类问题在 #7246 / #7247 / #7294 中被集中暴露，团队已批量修复。
- **文档与代码漂移**（#7317 提案者）：`origin_gate_matrix` 等破坏性变更未同步更新文档，用户需要更可靠的 doc-truth 验证机制。该提案已被采纳为设计记录。
- **长期配置体验不佳**（#3762）：在 Web UI 中编辑 `AGENTS.md` 不生效，阻断用户通过界面调整 AI 行为的路径，反馈时间已近 3 个月。
- **Agent 工具调用预算耗尽**（#7447）：Agent 陷入冗余 fetch-retry 循环（4 轮近重复 GitHub 查询），最终任务失败。用户希望 Agent 能更智能地处理分页，而非重复请求。

**积极信号**：用户新提交的体验问题（#7481）在当天即获得实现 PR，社区对项目的响应速度感知良好；doc-truth 提案按"提案→设计→实现"路径快速落地，说明项目具备 **用户驱动的快速迭代机制**。

---

## 8. 待处理积压

以下为需要维护者重点关注、但尚未关闭或合入的条目：

| 条目 | 类型 | 创建日期 | 说明 |
|---|---|---|---|
| [#3762](https://github.com/nearai/ironclaw/issues/3762) | Bug（suggested_P1） | 2026-05-18 | AGENTS.md 编辑不更新系统提示词，长期未解决，建议排入 v1.3.0 迭代 |
| [#5101](https://github.com/nearai/ironclaw/pull/5101) | PR | 2026-06-20 | live-canary 复用 cargo-component 安装器，与 #7137 同属 CI 基础设施优化，开放已约 1.5 个月 |
| [#7137](https://github.com/nearai/ironclaw/issues/7137) | Enhancement | 2026-08-04 | live-canary 工件体积过大，社区关注度最高（12 评论），涉及存储配额与排障体验，建议优先规划 |
| [#7465](https://github.com/nearai/ironclaw/issues/7465) | Epic | 2026-08-10 | Company Brain FDE，目前无描述与验收标准，建议补充定义后进入规划管道 |
| [#7476](https://github.com/nearai/ironclaw/issues/7476) | Bug | 2026-08-11 | delivery 失败路径忽略 vendor refs，与 #7473/#7475 同一投递链路，建议合并处理 |
| [#7046](https://github.com/nearai/ironclaw/issues/7046) | Epic | 2026-08-03 | 从 AI Chat 配置全部工具/渠道/扩展，与 #7044 有依赖关系，需明确版本节奏 |

**积压趋势说明**：若干早期 Epic（[#6483](https://github.com/nearai/ironclaw/issues/6483)、[#6484](https://github.com/nearai/ironclaw/issues/6484)、[#6485](https://github.com/nearai/ironclaw/issues/6485)）被标记为 CLOSED / Dormant Backlog，且已完成的交付被收敛到 v1.1.x 与 v1.3.0 版本目标中，表明团队正在主动清理长尾规划，将资源聚焦于近期高价值交付。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时项目整体活跃度中高，PR 侧表现强劲：共 29 条 PR 更新，其中 18 条已合并/关闭，贡献者 `fisherdaddy` 以高密度提交推动了多项 Cowork 与 OpenClaw 相关修复；Issues 侧则以 **stale 自动清理** 为主要动作，4 条中 3 条被机器人关闭（其中 #1237 虽有对应 PR，但该 PR 同样被关闭，修复是否真正落地存疑）。无新版本发布，依赖升级（Vite 8、React 19）仍在分步推进中。需要警惕的是：#1183 作为 4 月提出的网关启动恶性 Bug 仍处于 OPEN 状态且已被标记 stale，长期未获解决。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 以 **bug 修复、Cowork 体验优化、依赖升级** 三条线为主，主要由 `fisherdaddy` 贡献，显示出 OpenClaw 集成层正在经历系统性加固：

### ✨ 功能增强与体验优化
- **[#2473] 本地文件链接右键菜单**（`fisherdaddy`，已合并） — 为 Cowork 中的本地文件链接新增右键菜单，支持打开方式/另存为/复制路径/复制内容/复制图片/在文件夹中显示等操作，并新增 `dialog:saveFileCopy` IPC 通道与 shell 应用查询缓存。这填补了文件操作路径的交互空白。
- **[#2471] 提交的附件渲染为可点击卡片**（`fisherdaddy`，已合并） — 修复非图片附件在发送后回退为纯文本路径的问题，现在会解析并渲染为带图标、名称和类型的文件卡片，与发送前的预览一致。
- **[#2472] Cowork 活动分组折叠**（`fisherdaddy`，已合并） — 优化长会话活动流的视觉密度。
- **[#2469] 新增折叠 Agent 任务快捷键，且允许在键入时使用修饰键快捷键**（`fisherdaddy`，已合并） — 提升键盘效率，减少键位冲突。
- **[#2457] 可配置 thinking levels 多模型推理强度**（`btc69m979y-dotcom`） — 为受支持的包模型增加服务端驱动的思考等级配置，支持产品级 `max` 映射到运行时级 `xhigh` 的 OpenClaw 别名，并将会话/Agent 级选择持久化。

### 🐛 稳定性修复
- **[#2454] 修复工具循环守卫误杀合法轮询**（`fisherdaddy`，已合并） — 避免 OpenClaw 工具循环保护机制将正常的定时轮询当作死循环终止。
- **[#2467] 修复 Windows 运行时升级时残留的 pip shim**（`fisherdaddy`，已合并） — 此前健康检查仅验证文件存在，导致损坏的旧 shim 在每个运行时同步周期中存活；现收敛为共享的 `pythonPipShim` 模板。
- **[#2466] 修复渲染器初始化 IPC 停滞重试**（`fisherdaddy`，已合并） — 应对初始化阶段 IPC 通道卡死的问题。
- **[#2470] 在迟到聊天错误上暴露 Provider 运行时故障**（`fisherdaddy`，已合并） — 之前 `completeDeferredFinalOnStaleChatError` 会吞掉真实的 Provider/LLM 运行时错误（如 idle timeout failover），现改为正常抛出。

### 📦 依赖升级
- **Vite 5.4.21 → 8.0.13**（dependabot，已合并）
- **React DOM 18.3.1 → 19.2.6**（dependabot，已合并）
- **@vitejs/plugin-react 4.7.0 → 6.0.1**（dependabot，已合并）

> 这些合并表明 LobsterAI 正在将前端工具链推进到下一代，但需要注意：React 19 与 Vite 8 均为大版本跃迁，存在破坏性变更可能，建议关注后续回归测试情况。

## 4. 社区热点

今日 Issues 数据中讨论热度较高的（评论数各 2-4 条）均为 **stale 标签下的老问题**，经机器人自动关闭，但这恰恰折射出社区用户最核心的痛点：

### 热点一：大模型 API 受限后整体瘫痪（#1240，今日被关闭）
> “现有大模型受限后无法切换到其他大模型，所有对话框任务都会受限… lobsterai 整体陷入瘫痪。”

- 链接：[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)
- 背景：火山引擎 coding plan 请求次数烧光后，用户尝试切换到 Gemini 3 flash 和 Gemini 3.1 pro preview 均被错误地提示受限，重启后甚至无法启动，还原配置才恢复。
- 诉求：**模型切换的故障隔离与降级机制**。用户已证实同一 API 在其他设备上运行畅通，说明 LobsterAI 在单一 Provider 受限时未正确隔离故障，导致全局不可用。

### 热点二：任务超时且状态不透明（#2062，今日被关闭）
> “也不知道任务是停止了还是后台还在跑”

- 链接：[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)
- 诉求：24 小时连续运行任务被 `Task timed out` 自动停止，但用户无法确认任务状态，暴露了**任务生命周期可见性不足**的问题。

### 热点三：Settings 配置静默丢失（#1237，今日被关闭）
- 链接：[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)
- 值得注意：虽有 PR #1241 声明 `Closes #1237`，但该 PR 同样为 CLOSED（stale）状态，需确认修复是否真正合入主线。若未合入，该问题实际仍未解决。

## 5. Bug 与稳定性

按严重程度排序（🔴 = 阻断核心功能，🟡 = 影响体验，🟢 = 轻微）：

| 严重度 | Issue/PR | 标题 | 状态 | 备注 |
|--------|----------|------|------|------|
| 🔴 | [#1183](https://github.com/netease-youdao/LobsterAI/issues/1183) | 一直循环跳出遮罩启动网关 | **OPEN (stale)** | **4 个月未修复**，影响 Windows 用户基本使用，关闭模型开关后反复弹出“网关未能在规定时间内启动成功” |
| 🔴 | [#1240](https://github.com/netease-youdao/LobsterAI/issues/1240) | 大模型受限后无法切换，全局瘫痪 | CLOSED (stale) | 问题核心（故障隔离）未见对应修复 PR；stale 关闭不等于已解决 |
| 🟡 | [#2062](https://github.com/netease-youdao/LobsterAI/issues/2062) | 任务超过最大时长 | CLOSED (stale) | 状态显示不透明，用户无法判断任务是否还在后台运行 |
| 🟡 | [#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) | Settings 关闭无确认，API Key 静默丢失 | CLOSED (stale) | 修复 PR #1241 同样被关闭，需人工验证修复是否合入 |
| 🟢 | [#2454](https://github.com/netease-youdao/LobsterAI/pull/2454) | 工具循环守卫误杀合法轮询 | **已合并** | 已修复 |
| 🟢 | [#2467](https://github.com/netease-youdao/LobsterAI/pull/2467) | Windows 运行时升级残留 pip shim | **已合并** | 已修复 |
| 🟢 | [#2466](https://github.com/netease-youdao/LobsterAI/pull/2466) | 渲染器初始化 IPC 停滞 | **已合并** | 已修复 |

## 6. 功能请求与路线图信号

基于今天的 PR 和 Issue，可观察到以下路线图信号：

- **可配置推理强度（Thinking Levels）** — PR #2457 显示项目正在向“模型能力按需调优”方向演进，支持服务端驱动配置、产品级别名映射与持久化。这通常与高端模型定价分层相关，预计将进入下一版本。
- **跨平台窗口提醒** — PR #1239（任务完成时闪烁任务栏/Dock 图标）曾被提出，虽未合并，但结合 #2062（任务状态不透明）的反馈，说明“后台任务完成提醒”是明确需求，可能重新进入开发队列。
- **本地文件操作深化** — PR #2473 的右键菜单与 #2471 的附件卡片化，标志着 Cowork 从“文本对话”向“本地文件工作台”演进，未来可能扩展更多文件管理能力。
- **键盘效率与信息密度** — PR #2469（快捷键）和 #2472（活动折叠）表明团队在打磨重度用户的交互体验。

## 7. 用户反馈摘要

- **“全局瘫痪”是最大痛点**：来自 #1240 的用户描述表明，单一 Provider 受限不应影响其他模型的使用，当前故障隔离能力明显不足。用户已证明 API 本身可用，问题出在 LobsterAI 的状态管理。
- **任务状态不可见造成焦虑**：#2062 的用户在 24 小时长任务场景下无法判断任务是否还在运行，“也不知道任务是停止了还是后台还在跑”反映了任务卡片 / 日志体系需要更强的实时反馈。
- **启动与网关稳定性反复出现**：#1183 的“一直跳出遮罩”说明 OpenClaw 网关的启动流程在 Windows 上存在顽固缺陷，且长时间无人响应，这可能是 Windows 用户放弃使用的首要原因。

## 8. 待处理积压

以下条目长期未获响应或被标记 stale，建议维护者优先审查：

| 类型 | 编号 | 标题 | 需关注原因 |
|------|------|------|------------|
| Issue | [#1183](https://github.com/netease-youdao/LobsterAI/issues/1183) | 一直循环跳出遮罩启动网关 | 唯一仍 OPEN 且已 stale 的 4 月 Issue，影响 Windows 基本使用，无任何关联的 fix PR |
| PR | [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) | fix(openclaw): preserve provider for slashed model ids | 已待合并 4 天，修复含 `/` 的模型 ID（如 `deepseek-ai/DeepSeek-V4-Flash`）丢失 provider 前缀的问题，会影响自定义模型加载 |
| PR | [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) | fix(cowork): hide OpenClaw main agent sessions | 已 OPEN 4 个月（stale），解决主 Agent 内部会话出现在用户会话列表中的混乱问题 |
| PR | [#2465](https://github.com/netease-youdao/LobsterAI/pull/2465) / [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464) | Vite 8.2.1 / React DOM 19.2.8 依赖升级 | 今日新开的依赖升级 PR，仍待合并；结合已合并的 Vite 8.0.13 / React 19.2.6，应尽快对齐闭环 |

---

*报告生成时间：2026-08-11 · 数据来源：LobsterAI GitHub 仓库 (netease-youdao/LobsterAI)*
*注：标记 `stale` 的 Issue 由机器人自动关闭，问题不代表已修复，建议维护者逐一核对关闭理由。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时内，Moltis 项目保持中等活跃度：新增/活跃 Issues 3 条（全部为 Bug），待合并 PR 2 条，无新版本发布。值得关注的是，3 条新 Issue 中有 2 条直接指向 `apple-container` 后端（#1185、#1188），另有 1 条涉及沙箱构建失败（#1189），说明 Apple 容器后端的稳定性是当前社区反馈较集中的薄弱环节。PR 方面，`shixi-li` 的会话管理修复（#1182）在提交 10 天后仍有更新，大型浏览器交互 UI 功能 PR（#531）依旧待合并。整体来看，项目处于「社区积极反馈 Bug、维护者持续推进但合并节奏偏缓」的区间，健康度中等。

---

## 3. 项目进展

过去 24 小时内**没有 PR 被合并或关闭**，但有两条待合并 PR 仍在推进中：

- **[#1182] fix(sessions): allow deleting and archiving the main session**（作者: shixi-li | 更新于 2026-08-11）
  该 PR 修复 #1132，允许 `main` 会话像其他会话一样被删除和归档，同时保留当前活跃通道会话的归档限制，并确保 `sessions.clear_all` 仍保留 main/channel 边界会话。此 PR 在创建 10 天后仍有更新，说明作者在根据 review 反馈持续迭代，属于活跃推进状态。
  链接: https://github.com/moltis-org/moltis/pull/1182

- **[#531] feat(browser): interactive browser viewing UI with CDP screencast**（作者: penso | 更新于 2026-08-10）
  该 PR 为 Settings > Browser 页面新增完整的浏览器查看与交互 UI，支持 CDP 实时屏幕流、鼠标/键盘/滚轮交互、会话历史与操作日志回放，以及基于 Agent 的浏览器配置文件 cookie 隔离。该 PR 已存在超过 4 个月，近期仍有更新，但尚未合并。该功能若落地将显著提升 Moltis 的浏览器自动化易用性。
  链接: https://github.com/moltis-org/moltis/pull/531

**项目整体推进判断**：核心会话管理逻辑正在接受打磨，浏览器交互 UI 是一个功能性大块且接近成熟但尚未合并；Bug 修复的 PR 产出速度跟上问题反馈速度，但合并效率有待提高。

---

## 4. 社区热点

过去 24 小时评论最活跃的 Issue 为：

- **[#1185] [Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running**（评论: 3 | 创建: 2026-08-08 | 更新: 2026-08-10）
  链接: https://github.com/moltis-org/moltis/issues/1185

这条 Issue 是当前社区讨论的焦点。用户报告 Apple Container 1.x 沙箱实际已启动，但 Moltis 仍然判定其未在运行。3 条评论说明至少有多位用户或维护者参与了探讨，反映出这个 bug 影响了实际使用流程——沙箱已投入运行但系统不认，会导致后续依赖该状态的操作全部失效。社区的核心诉求是**后端状态检测的准确性**。

---

## 5. Bug 与稳定性

过去 24 小时内报告了 3 条新 Bug，按严重程度排列如下：

| 严重程度 | Issue | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#1189] [Bug]: Sandbox build failing due to wrong gogcli github URL | 沙箱构建失败，由 `gogcli` 的 GitHub URL 错误导致。构建失败属于阻断性问题，直接影响开发者使用。 | 无关联 fix PR |
| 🟠 中 | [#1188] [Bug]: resource limits not applied for apple-container backend | `apple-container` 后端的资源限制（CPU/内存等）未生效，可能导致沙箱资源失控。 | 无关联 fix PR |
| 🟠 中 | [#1185] [Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running | 沙箱已启动但状态误判，影响后续依赖状态判断的流程。已有 3 条评论讨论。 | 无关联 fix PR |

链接:
- https://github.com/moltis-org/moltis/issues/1189
- https://github.com/moltis-org/moltis/issues/1188
- https://github.com/moltis-org/moltis/issues/1185

**稳定性判断**：3 条 Bug 中有 2 条聚焦 `apple-container` 后端/沙箱，1 条直接导致构建失败。当前没有对应的 fix PR 被关联，维护者需要在未来一周优先响应，尤其是构建阻断类问题。

---

## 6. 功能请求与路线图信号

过去 24 小时没有新增 Feature Request 类 Issue，但两条在途 PR 为路线图提供了信号：

- **PR #531（browser 交互 UI）**：该 PR 拟新增浏览器实时查看与交互能力，属于用户体验导向的功能增强。考虑到 PR 存在时间长且近期仍有更新，推测并未被放弃，但仍在等待 review 或进一步调整。一旦合并，将构成 Moltis 浏览器自动化的一个重要里程碑。
  链接: https://github.com/moltis-org/moltis/pull/531

- **PR #1182（main 会话可删除/归档）**：该 PR 属于会话管理功能补全，解决用户无法管理 `main` 会话的痛点。预计近期内可合入，并随下一个版本发布。
  链接: https://github.com/moltis-org/moltis/pull/1182

**路线图判断**：短期重点在会话管理和浏览器交互增强，中期则需优先解决 `apple-container` 后端稳定性问题，否则会持续占据 issue 版面并拉低用户对稳定性的评价。

---

## 7. 用户反馈摘要

从近 24 小时 Issues 及评论中提炼的真实用户反馈：

- **沙箱状态可靠性问题（#1185）**：至少 3 位用户在讨论中反馈或关注了 Apple Container 1.x 沙箱启动后状态误判的问题。用户实际想表达的是：Moltis 对沙箱生命周期的检测逻辑不可靠，已有流程被卡断。这体现出用户依赖 Moltis 作为沙箱编排层的核心诉求——**正确的状态感知比功能丰富优先**。
  链接: https://github.com/moltis-org/moltis/issues/1185

- **构建链路依赖问题（#1189）**：用户报告沙箱构建失败由 `gogcli` 的 GitHub URL 配置错误引起。这类问题通常源于上游仓库地址变更或依赖固定策略不完善，说明构建链路的容错性和依赖管理还有改进空间。
  链接: https://github.com/moltis-org/moltis/issues/1189

- **资源限制缺位（#1188）**：用户报告 `apple-container` 后端资源限制未生效，暗示对于沙箱资源隔离的默认预期没有得到满足。用户期望的是**与 Docker/其他后端一致的资源管控能力**。
  链接: https://github.com/moltis-org/moltis/issues/1188

---

## 8. 待处理积压

以下为值得维护者重点关注的长期未合入/未响应项：

- **[#531] feat(browser): interactive browser viewing UI with CDP screencast**
  - 创建于 2026-03-31，已开放 **133 天**
  - 最近更新 2026-08-10，但长期停留在 open 状态
  - 这是一个大型功能 PR，长期不合并可能导致维护成本持续上升、代码冲突风险累积，建议维护者明确给出 review 排期或阶段性结论。
  链接: https://github.com/moltis-org/moltis/pull/531

- **[#1182] fix(sessions): allow deleting and archiving the main session**
  - 创建于 2026-08-01，已开放 **10 天**
  - 修复了明确的功能缺陷（#1132），且作者仍在持续更新，需要维护者尽快安排 review，避免 PR 周期过长导致修复与主干产生更多冲突。
  链接: https://github.com/moltis-org/moltis/pull/1182

- **Apple Container 后端系列 Bug（#1185、#1188）**
  - 均为近 2-3 天报告，尚无 fix PR 关联
  - 已呈现出「同一后端多点问题」的模式，建议维护者集中排查 `apple-container` 后端的整体状态管理与资源控制实现，避免单点补丁式修复。

---

**整体健康度总结**：Moltis 目前处于一个「社区反馈活跃但合并节奏偏慢」的阶段。bug 集中在 Apple 容器后端，说明最近引入的 backend 需要加强打磨；浏览器 UI 功能长期 unmerged 构成技术债风险。项目方向依然清晰，但维护者需要在 Bug 响应速度与 PR review 效率上做出调整，才能维持社区的迭代信心。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-11

> 数据来源：[github.com/agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)（CoPaw 项目主仓库）


## 1. 今日速览

- 昨日项目活跃度极高：24小时内 **15 条 Issue 更新**（新开/活跃 8 条，关闭 7 条），**50 条 PR 更新**（待合并 28 条，已合并/关闭 22 条），无新版本发布。
- 合并 PR 中不含重大新特性，但包含两个重要修复方向：**MCP 工具稳定性**（#6894 合并，直接回应社区高频 Bug #6732）与 **Console 前端体验打磨**（滚动、加载动画、重复链接等多项修复落地）。
- Release 节奏处于空窗期，当前最新版本仍为 `2.1.0-beta` 系列；合并 PR 中已出现 `fix(console)` 与 `chore(deps)` 等面向 beta 质量收敛的改动，**2.1 正式版发布前处于密集修 bug 阶段**。
- 社区侧中文用户活跃度显著：QQ bot 反馈（#6897）、微信群请求（#6895）、中文输入法崩溃（#6885）、公式渲染问题（#6893）集中出现，**中文用户体验是当前反馈集中的短板**。
- 整体项目健康度良好：高热度 Bug（MCP 失效、CPU 空转）均有对应 fix PR 合并或推进，但 **MCP 会话恢复与中文 IME 崩溃两个问题仍需后续版本验证**。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日合并/关闭的 PR 集中在 **Console 前端稳定性、MCP 健壮性、CLI 体验、Creator 插件聚合** 四个方向。整体项目处于 **beta 质量收敛阶段**，无明显架构级变更，但工程化与稳定性投入显著。

### 已合并/关闭的重要 PR

- **[#6894 fix(mcp): recover terminated sessions without dropping all tools](https://github.com/agentscope-ai/QwenPaw/pull/6894)** — 将 `Session terminated` 视为可恢复错误，重连期间继续提供缓存的工具 schema；单个 driver 故障不再导致全部 MCP 工具被移除。**直接回应 Issue #6732**（MCP 工具规律性失效），属本轮最有价值的稳定性修复。
- **[#6870 feat(creator): settings center, agent skills, mm-plugins compose orchestration, async media generation](https://github.com/agentscope-ai/QwenPaw/pull/6870)** — Creator 插件大聚合 PR，包含设置中心、Agent 技能、多模态插件组合编排、异步媒体生成及跨平台加固，**Creator 插件版本升级**。合并此 PR 意味着多个子 PR 已在 fork 分支上独立评审并通过 CI。
- **[#6904 fix(console): stabilize chat wheel scrolling](https://github.com/agentscope-ai/QwenPaw/pull/6904)** — 修复反向排序消息列表中滚轮滚动不稳定、嵌套区域滚动被吞、动态 Thinking 内容高度变化后无法回到最新消息等问题。
- **[#6892 fix: accept project paths after global CLI options](https://github.com/agentscope-ai/QwenPaw/pull/6892)** — 修复 `qwenpaw --port 6066 .` 报 `No such command "."` 的问题，CLI 可用性修复。
- **[#6896 chore(deps): update @agentscope-ai/chat to 1.1.73-beta](https://github.com/agentscope-ai/QwenPaw/pull/6896)** — 修复 #6828（Console 空闲时无限 CSS 动画导致 CPU ~20%），属于低风险依赖升级。
- **[#6862 feat(agent-stats): narrow Agent Statistics page to the current agent](https://github.com/agentscope-ai/QwenPaw/pull/6862)** — Agent 统计页去掉误导性的 “All Agents” 全局 token 用量，改为仅展示当前 Agent 的指标与趋势。
- **[#6824 fix(scroll): fix recall correctness issues from aone](https://github.com/agentscope-ai/QwenPaw/pull/6824)** — 修复 Scroll 召回正确性问题：CJK 连续句子被 SQLite FTS5 作为单 token 索引导致子串搜索失效，已有解决方案。
- **[#6903 fix(console): remove duplicated GitHub link from header resources menu](https://github.com/agentscope-ai/QwenPaw/pull/6903)** — 与 Issue #6901（重复 GitHub 链接）对应，资源菜单去重。
- **[#6833 fix(approvals): pass channel routing fields in driver gate](https://github.com/agentscope-ai/QwenPaw/pull/6833)** — 审批门中 `channel_meta` 和 `_channel_instance` 字段丢失导致审批挂起不通知的问题修复。
- **[#6899 test(integration): drop stale project_dir assertion in coding-mode test](https://github.com/agentscope-ai/QwenPaw/pull/6899)** / **[#6886 fix(tests): skip qoder harness tests cleanly](https://github.com/agentscope-ai/QwenPaw/pull/6886)** — 均为测试链路配套修复，前者适配 #6504 合并后的接口变化，后者避免可选依赖缺失时测试目录被整体忽略。

### 待合并的看点 PR

- **[#6905 feat(retry): cumulative back-off budget, Retry-After cap, on_retry callback](https://github.com/agentscope-ai/QwenPaw/pull/6905)** — 重试机制增强：累计退避预算、`Retry-After` 上限、`on_retry` 回调，非破坏性、默认行为不变，已标记准备好进行人工审查。
- **[#6902 fix(sandbox): stop injecting PYTHONHOME into child processes](https://github.com/agentscope-ai/QwenPaw/pull/6902)** — 修复 Windows 沙箱子进程继承宿主 `PYTHONHOME` 的问题（Fixes #6697）。
- **[#6884 fix: make Auto-Dream integration resilient](https://github.com/agentscope-ai/QwenPaw/pull/6884)** — 单个无效的集成 schema 不再拖垮整个 Auto-Dream 任务。


## 4. 社区热点

今日讨论最集中的议题围绕 **MCP 工具稳定性、消息通道体验（QQ bot）与中文用户使用场景**。

### 热点 1：MCP 工具规律性失效（评论 9 条）
- **[Issue #6732 [bug] mcp工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)**（已关闭）
- 用户反馈每隔数小时 MCP 工具自动失效，报“未注册或不存在”，重启容器后恢复。评论区 9 条，是今日讨论量最高的单个 Issue。
- 关联修复：**PR #6894 今日合并**，将 `Session terminated` 视为可恢复错误并在重连期间提供缓存工具。社区诉求得到快速响应，整个链路（反馈→定位→修复→合并）约 5 天。
- 深层诉求：**MCP 工具作为 Agent 核心能力的稳定性保障**，重启容器不应成为常规恢复手段。

### 热点 2：QQ bot 工作流信息刷屏与限流风险（评论 2 条，新开）
- **[Issue #6897 接入QQbot对话能减少在QQ bot工作流在信息](https://github.com/agentscope-ai/QwenPaw/issues/6897)**（开放）
- 用户场景：项目调研时详细工作流全部推送到 QQ，触发限流且持续提醒。诉求是**将工作流详细步骤与最终结果分层推送**，这背后是消息通道的推送策略/可配置性问题，值得产品侧评估。

### 热点 3：OpenAI 兼容接口被严格提供方拒绝（评论 6 条）
- **[Issue #6803 OpenAI-compatible requests carry Responses-API `input_text` content type, rejected by strict providers](https://github.com/agentscope-ai/QwenPaw/issues/6803)**（已关闭）
- 调用 StepFun `step-3.5-flash` 等严格校验 message 结构的 OpenAI 兼容端点时，请求携带了 Responses-API 的 `input_text` 内容类型和原始流式字段，被 400 拒绝。暴露了 **OpenAI 兼容层的协议边界问题**：Responses-API 与 Chat Completions API 的字段串扰。


## 5. Bug 与稳定性

按严重程度排列。整体来看，**今日关闭 Bug 多于新开 Bug（7:4）**，且多数高影响 Bug 已有对应修复 PR，稳定性趋势向好。

### 高严重度

- **[#6885 Console UI crashes on Chinese IME compositionEnd — message queue unusable (v2.1.0b2)](https://github.com/agentscope-ai/QwenPaw/issues/6885)**（开放，8/10 创建）
  - 中文输入法在 Agent 运行期间触发 `compositionEnd` 导致 Console UI 崩溃，消息队列功能完全不可用，属**中文用户核心输入路径的回归**。截至今日暂无关联 fix PR，需优先跟进。
- **[#6732 MCP工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)**（已关闭）
  - 已由 **PR #6894** 修复（今日合并），但**修复效果需发布后用户验证**。

### 中严重度

- **[#6803 OpenAI 兼容请求被 StepFun 严格提供方拒绝](https://github.com/agentscope-ai/QwenPaw/issues/6803)**（已关闭）
  - 协议字段串扰（Responses-API `input_text` 混入 Chat Completions 请求），第三方兼容性问题，修复已合入。
- **[#6883 日记页面子文件夹笔记被错误分组到错误日期](https://github.com/agentscope-ai/QwenPaw/issues/6883)**（开放）
  - 如 `memory/2026-08-09/xxx.md` 被显示在 8/10 下，**日期分组逻辑存在路径解析错误**，数据组织可见性问题，暂无关联 PR。

### 低严重度 / 已快速修复

- **[#6871 前端历史消息时间戳时区偏移 +8h](https://github.com/agentscope-ai/QwenPaw/issues/6871)**（已关闭）— 视图重渲染后时间戳错误。
- **[#6828 Console 空闲时 CPU ~20%（无限 CSS 动画）](https://github.com/agentscope-ai/QwenPaw/issues/6828)**（已关闭）— **PR #6896 今日合并修复**。
- **[#6901 资源菜单重复 GitHub 链接](https://github.com/agentscope-ai/QwenPaw/issues/6901)**（开放，1 评论）— **PR #6903 今日合并修复**
- **[#5790 Agent 响应完成后加载动画不消失](https://github.com/agentscope-ai/QwenPaw/issues/5790)**（已关闭）— Console 前端 spinner 状态未正确复位。
- **[#6722 后台 fork 子代理在 worktree 失败时误报完成](https://github.com/agentscope-ai/QwenPaw/issues/6722)**（已关闭）— 任务状态与工作区结果不一致。


## 6. 功能请求与路线图信号

### 较可能纳入近期版本

- **[#6900 将聊天项目目录与 Agent 工作区隔离](https://github.com/agentscope-ai/QwenPaw/issues/6900)**（已关闭，3 评论）
  - 每个持久化 Chat 拥有独立项目目录，`workspace_dir` 保持为系统内部路径。此需求**与 #6504 的“unify project directory”方向一致**（见 PR #6899 的测试适配），说明项目目录模型正在收敛，预计核心支持已落地。
- **[#6881 自动记忆更新后自动刷新会话标题](https://github.com/agentscope-ai/QwenPaw/issues/6881)**（开放）
  - 与 **PR #6772（ReMe Light 记忆增强）** 相关；该 PR 正在推进长期记忆配置升级，自动刷新标题属于较轻量的 UI 联动，有可能随记忆模块一起合入。

### 观望/需产品决策

- **[#6893 公式渲染 + 会话分组管理 + 活动会话背景](https://github.com/agentscope-ai/QwenPaw/issues/6893)**（开放）
  - 公式在对话框中无法渲染（LaTeX 裸文本），对比 Cherry Studio 等工具差距明显；会话分组管理是常见效率需求。建议产品侧结合 Console 路线图评估。
- **[#6897 QQ bot 工作流信息分层推送](https://github.com/agentscope-ai/QwenPaw/issues/6897)**（开放）
  - 涉及通道消息策略，有一定产品设计空间（是否仅推送摘要/结果，细节可查）。
- **[#6882 集成 CopilotKit](https://github.com/agentscope-ai/QwenPaw/issues/6882)**（开放）
  - 建议在 Discussions 中提供集成思路或示例，短期纳入核心路线图可能性较低。
- **[#6895 建立微信群](https://github.com/agentscope-ai/QwenPaw/issues/6895)**（开放）
  - 社区运营诉求，非代码问题。中文用户活跃度持续上升，值得维护者考虑。

### 路线图信号（来自待合并 PR）

- **PR #6719**：每轮对话结束后持久化展示工作区产物卡片（Workspace artifacts），已推迟数日未合并，或与 #6504 目录模型变更存在联动。
- **PR #6817**：集成 AnySearch 作为内置 Web 搜索（替代 Tavily），同时修复 MCP env-ref 头绑定缺陷，首次贡献者提交，仍在评审中。
- **PR #6764**：为 main 分支添加 CI 测试门禁，防止“测试全红仍合入”的情况再次发生，属于工程质量基建。

| 方向 | 信号强度 | 说明 |
|---|---|---|
| MCP 稳定性与恢复 | ★★★★★ | #6894 已合并，回应 #6732 高频投诉；另有 #6817 附带修复 MCP env 绑定 |
| Console 前端体验 | ★★★★ | 滚动、动画、链接、时间戳四项修复同日合并；#6885 中文 IME 仍未解决 |
| 工作区/目录模型 | ★★★★ | #6504/PR #6899 体现项目目录统一，#6900 呼应；#6719 产物卡片待合入 |
| 记忆与自动管理 | ★★★ | #6772（ReMe Light 嵌入/日报）推进中，#6881 为轻量联动需求 |
| 重试/弹性能力 | ★★★ | #6905 待合并，增强模型调用的重试预算与 failover 决策 |
| 搜索（Scroll） | ★★ | #6824 修复 CJK 召回是功能性补强，后续可能有更大搜索统一计划 |


## 7. 用户反馈摘要

### 痛点明确（高可信度）

- **MCP 工具不可用是当前最痛的问题**（#6732）：用户需重启 Docker 容器恢复，影响生产可用性。**已在 #6894 中修复**，建议发布 beta 后主动回访验证。
- **中文输入法在 v2.1.0b2 升级后消息队列完全不可用**（#6885）：用户在 Agent 回复期间输入中文即崩溃，属升级回归，诉求迫切。
- **工作流详情刷屏 QQ**（#6897）：触发限流、打扰用户，“没必要把每一步工作流全部发送到 QQ 上”。解决后能显著改善 QQ bot 实际可用性。
- **公式渲染缺失暴露专业场景缺口**（#6893）：数学/统计公式显示为裸 LaTeX 文本，“很尴尬”，用户明确对比了 Cherry Studio 等竞品。

### 满意/正面信号

- 项目对高热度 Bug 的响应速度值得肯定：#6732 从报告到修复 PR 合并约 5 天，**社区参与度高（首次贡献者活跃，如 #6884、#6817、#6905）**。
- #6899、#6886 等测试配套修复体现了维护者对 CI 质量的重视，用户可感知到工程纪律。

### 建议运营侧关注的社区声音

- #6895（微信群）：用户认为“微信人群多，便于交流”，说明微信生态对扩大社区有较大价值。
- #6882（CopilotKit 集成）：“能否给个例子或者思路”——用户期待官方提供集成指引或示例仓库。


## 8. 待处理积压

### 长期未合并 PR（>5 天）

- **[#6302 feat: unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302)**（7/21 创建，已开放 21 天）
  - 大型功能 PR，覆盖 provider 发现、模型元数据、路由与 Agent 控制，对应 #6167。长期未合并可能因体量过大需拆分，建议维护者明确其状态。
- **[#6688 fix(plugins): isolate bare absolute imports per plugin namespace](https://github.com/agentscope-ai/QwenPaw/pull/6688)**（8/4 创建，开放 7 天，first-time-contributor）
  - 修复 App Center 安装 `qwenpaw-creator` 报 `No module named 'utils.env'` 的问题。**直接影响用户安装插件的核心路径**，需优先评审。
- **[#6719 feat(chat): add persistent workspace artifact cards](https://github.com/agentscope-ai/QwenPaw/pull/6719)**（8/5 创建，开放 6 天）
  - 工作区产物卡片功能，与 #6900 和 #6504 的目录模型存在交集，建议明确依赖关系。
- **[#6764 feat(ci): gate main mergeability on tests](https://github.com/agentscope-ai/QwenPaw/pull/6764)**（8/6 创建，开放 5 天）
  - 工程基建项，可防止“测试红着合入”再次发生，阻塞风险低但收益长尾。
- **[#6772 feat(memory): add embedding hot updates and Daily Paper to ReMe Light](https://github.com/agentscope-ai/QwenPaw/pull/6772)**（8/6 创建，开放 5 天，涉及 Console 重构）
  - 功能完整度高（Embedding 配置/验证/热更新、Daily Paper、索引维护），但涉及长期记忆模块，建议充分测试后合入。

### 需维护者关注的高影响 Issue

- **[#6885 中文 IME 崩溃问题](https://github.com/agentscope-ai/QwenPaw/issues/6885)**：无关联 PR，影响中文用户核心功能，建议优先指派。
- **[#6883 日记页面日期分组错误](https://github.com/agentscope-ai/QwenPaw/issues/6883)**：无关联 PR，数据可见性 bug，修复成本可能不高。
- **[#6697 Windows 沙箱 PYTHONHOME 注入](https://github.com/agentscope-ai/QwenPaw/issues/6697)**：虽已有 **PR #6902 待合并**，但该 Issue 未标注关闭，建议 PR 合入后及时更新关联状态。

---

**总结**：CoPaw 项目处于 2.1 beta 的密集打磨期，MCP 稳定性与 Console 体验修复频密，工程质量意识强，社区中文用户活跃。当前最需要关注的是**中文 IME 崩溃的修复进度**与**长周期 PR（#6302、#6688）的推进节奏**。下一里程碑（2.1 正式版）预计以稳定性与体验收敛为主，功能性突破可关注 Creator 与记忆模块的后续演进。

*本日报基于 GitHub 公开数据自动生成，链接指向 agentscope-ai/QwenPaw 仓库。*

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

过去 24 小时 ZeroClaw 仓库保持高水平活跃：**19 条 Issue 更新**（其中 18 条新开/活跃、1 条关闭）与 **50 条 PR 更新**（其中 46 条待合并、4 条已合并/关闭），无新版本发布。今日动态集中在三大主线：**SOP 子系统可靠性问题集中爆发**（多条 P1/S1 bug 与对应修复 PR）、**渠道层功能补齐**（WhatsApp reactions 的 rebase PR、Matrix mention_only 回复修复）、以及 **配置架构演进**（schema 分解、skill 注入默认值回归修复）。一个新开 RFC「用 Python 重写 Rust 代码库」在被讨论后已关闭，未进入路线图，社区整体方向仍稳固在 Rust 技术栈上。项目健康度整体良好，但 SOP 相关的静默失败类 bug 密集出现，值得维护者优先重视。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

过去 24 小时 4 条 PR 被合并/关闭（以下为已展示部分），主要为小步修复与重复 PR 清理：

- **[#9897] fix(cli): stop telling operators to reload with a signal that kills the daemon**（已合并）— 修正了 degraded-security 警告中误导的 SIGUSR1 reload 指引。该信号未被注册，默认处置会终止进程。此修复与 [#9879](https://github.com/zeroclaw-labs/zeroclaw/pull/9879) 相互关联，后者仍在开放中。两者的共同目标是解决 [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)。
- **[#9893] feat(whatsapp-web): implement add_reaction and remove_reaction (rebase of #7535)**（已关闭）— 该 PR 因与 [#9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894) 重复被关闭，后者将继续推进 WhatsApp reactions 功能。

此外，**Issue #9874**（用 Python 重写 ZeroClaw 的 RFC）已被关闭，意味着社区未采纳该方向性提案，Rust 技术栈路线得到确认。

整体来看，今日合并量偏少，项目处于「**大量功能 PR 排队待合入、少量修复快速落地**」的阶段。46 条待合并 PR 中不乏大尺寸（size:XL）长线功能，短期内可能仍以 bug 修复与稳定性提升为主节奏。

---

## 4. 社区热点

- **[#6850] RFC: Decouple memory lifecycle policy from storage backends** — 11 条评论，为今日评论数最多
  https://github.com/zeroclaw-labs/zeroclaw/issues/6850
  创建于 5 月 22 日，至今持续活跃。核心诉求是：存储后端操作与内存生命周期策略（合并、治理）边界模糊，不应由各 gateway/channel/backend 重复实现。该 RFC 风险等级为 high，关联 PR #8486 与 #8603，指向跨切面的架构演进方向，是当前社区讨论最集中的设计议题。

- **[#8600] [Feature]: easy per-chat model switching for multi-model providers** — 4 条评论，1 👍
  https://github.com/zeroclaw-labs/zeroclaw/issues/8600
  作者直言从 moltis 迁移而来，缺少「同一 provider 下任意模型快速切换」的能力。这是来自竞品迁移用户的真实功能缺口诉求，讨论虽不多但需求信号明确。

- **[#9874] RFC: Rewrite ZeroClaw in Python and retire the Rust codebase** — 3 条评论（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/9874
  作者尖锐批评「100% Rust」是 flex 而非工程需求，但该 RFC 在提出两天后即被关闭，说明项目维护者与社区整体均不认同这一方向，Rust 技术栈的决策在短期内不会动摇。

---

## 5. Bug 与稳定性

按严重程度排列（S1 > S2/P1 > P2 > P3）：

### S1 — 工作流阻塞

- **[#9901] SOP: unknown step bullets silently treated as prose, validate still reports valid**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9901
  SOP.md 中无法识别的步骤子弹被静默丢弃进 step body，`sop validate` 报告成功、`sop show` 正常渲染，但实际运行语义完全改变。与 #9786 同为 SOP 静默失败类问题，尚无对应 fix PR。

### S2 / P1 — 功能降级

- **[#9912] [Bug]: Restore full skill injection default through v0.8.x**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9912
  PR #8313 将 `SkillsPromptInjectionMode` 默认值改为 `compact`，导致普通技能贡献的元数据被压缩。**已有对应修复 PR [#9913](https://github.com/zeroclaw-labs/zeroclaw/pull/9913)**，旨在 v0.8.x 恢复 `full` 默认值。
- **[#9768] [Bug]: daemon reload is not on SIGUSR1, and warning tells operators to send a signal that kills the daemon**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9768
  两处文档/警告指引操作员使用 SIGUSR1 触发 reload，但该信号未被注册、默认处置为终止进程。**已有修复 PR [#9897（已合并）](https://github.com/zeroclaw-labs/zeroclaw/pull/9897) 与 [##9879（开放中）](https://github.com/zeroclaw-labs/zeroclaw/pull/9879)**。
- **[#9779] [sop] sops_dir: documented default is not honoured by the daemon, so SOPs silently never load**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9779
  文档声明 `sops_dir` 有可选默认值，但 daemon 两条启动路径都以 `sops_dir.is_some()` 作为 SOP 子系统的启用门槛。依赖默认值的操作者会遇到 SOP 永不加载且无任何日志的静默失败。尚无对应 fix PR。
- **[#9786] SOP: malformed SOP.toml silently dropped — sop list omits it and sop validate reports success**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9786
  含未知字段的 SOP.toml 在加载时被静默丢弃，`sop list` 缺失、`sop validate` 误报成功，与 SOP 不存在完全不可区分。尚无对应 fix PR。
- **[#9909] Matrix mention_only drops group replies to the bot without an @-mention**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9909
  `mention_only = true` 时，在群组房间中直接回复机器人消息（无新 @-mention）会被静默丢弃，`m.in_reply_to` 未被考虑。**已有对应修复 PR [#9911](https://github.com/zeroclaw-labs/zeroclaw/pull/9911)**。
- **[#9908] SkillDocument truncates multi-paragraph block-scalar descriptions at blank lines**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9908
  `SkillDocument::parse` 在第一个空行截断 YAML block-scalar 描述，多段落的 `>-`/`>`/`|` 描述被截断。尚无 fix PR。
- **[#9905] Discord audio transcription manager is never bound to the active agent provider**
  https://github.com/zeroclaw-labs/zeroclaw/issues/9905
  Discord 通道的 `TranscriptionManager` 未绑定 agent 的 `transcription_provider`，音频附件处理时行为与配置不符。尚无 fix PR。

### P2 / P3 — 常规缺陷

- **[#9771] zeroclaw-gateway fails clippy -D warnings on the default feature surface** — 测试辅助代码特性门不一致导致死代码警告，已有明确一行修复方案。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9771
- **[#9896] status/startup banner can report `Memory: none` when effective backend is sqlite** — 误导性的内存状态展示，影响排障。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9896
- **[#9883] Inbound WebP conversion decodes unbounded before the shared image validator runs** — 从 #9819 拆出的安全问题，图像验证前存在无限制解码路径。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9883
- **[#9711] Clean up Arduino flash temporary directories on every exit** — S3 轻微问题，异常退出路径可能遗留临时目录。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9711

---

## 6. 功能请求与路线图信号

- **[#8600] easy per-chat model switching for multi-model providers** — 4 条评论、1 👍
  https://github.com/zeroclaw-labs/zeroclaw/issues/8600
  已标记 `status:accepted` 与 `no-stale`，明确进入路线图。Signal 强烈：来自竞品 moltis 的迁移用户核心诉求，P2 优先级。

- **[#9895] Provider-grouped, paginated Telegram /model picker** — 1 条评论
  https://github.com/zeroclaw-labs/zeroclaw/issues/9895
  在 #8600 文本命令的已有基础上，提出移动端更友好的交互形式。两者可形成互补：**#8600 解决「能不能切」，#9895 解决「切得爽不爽」**。若 #8600 落地，此功能大概率作为后续增强被纳入。

- **[#7518] WhatsApp message reactions (ack_reactions parity)** — 3 条评论
  https://github.com/zeroclaw-labs/zeroclaw/issues/7518
  已标记 accepted/no-stale。**已有对应实现 PR [#9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894)**（今日 rebase 提交），推进中。

- **[#9906] Decompose the config schema into domain modules without changing behavior** — 0 条评论（新开）
  https://github.com/zeroclaw-labs/zeroclaw/issues/9906
  针对 38,700 行的单文件 schema.rs 提出模块化拆分，size:L。属于代码可维护性重构，短期不改变用户可见行为，但可能为后续 schema V4（PR #8754）做铺垫。

- **[#6850] RFC: Decouple memory lifecycle policy from storage backends** — 11 条评论
  https://github.com/zeroclaw-labs/zeroclaw/issues/6850
  尽管非新开，但仍是当前社区讨论热度最高的设计 RFC。若被采纳，将影响 gateway/channel/backend 多层架构。

---

## 7. 用户反馈摘要

- **「文档承诺的默认值不可信」成为今日高频痛点。** #9779（sops_dir 默认值）、#9768（SIGUSR1 信号误导）均属于「文档/警告告诉用户这样做，但实际不生效甚至有害」。这反映出 ZeroClaw 在**文档与实现一致性**上存在系统性短板，尤其在运维路径上。
- **SOP 静默失败问题伤及信任。** #9901 作者将「SOP 内容被静默篡改语义」评为 S1 工作流阻塞，且在 #9786 中强调「畸形 SOP 与 SOP 不存在完全不可区分」。用户对诊断能力的期望明显高于当前实现——即便 validate 命令可用，也无法提供有效的失败反馈。
- **跨项目迁移用户的声音值得关注。** #8600 作者从 moltis 迁移而来，表示「大部分功能都已具备，唯独缺少多模型快速切换」。此类「竞品迁移用户」的反馈往往能暴露 ZeroClaw 在**体验细节上的真实差距**。
- **架构争议性讨论仍存在但未形成波澜。** #9874 对 Rust 技术栈的批评（「flex for the sake of flex」）在提出后迅速被关闭，说明社区对当前技术方向有较高共识；但 776k 行 Rust 的维护成本问题可能仍值得维护者内部关注。
- **渠道层功能补齐受用户直接驱动。** WhatsApp reactions（#7518）与 Matrix 回复（#9909）的 Issue 作者同时提交了对应 PR，说明用户对渠道体验的一致性有明确期待，且愿意主动贡献代码。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

- **[#6850] RFC: Decouple memory lifecycle policy from storage backends** — 创建于 2026-05-22，持续 80+ 天
  https://github.com/zeroclaw-labs/zeroclaw/issues/6850
  虽是社区最热 RFC，但 3 个月来仍停留在讨论阶段，无明确决策或实现计划。建议维护者明确给出采纳/拒绝的结论，或拆解为可执行子任务。

### 等待作者行动（needs-author-action）的 PR

以下 PR 均带有 `needs-author-action` 标签，可能因作者未响应而阻塞进度：

- **[#8713] fix(tools): add allowed_private_hosts opt-in to file_download SSRF gate** — 创建于 2026-07-04，安全相关，size:XL
  https://github.com/zeroclaw-labs/zeroclaw/pull/8713
- **[#8486] feat(gateway): add OpenAI chat completions endpoint** — 创建于 2026-06-29，生态集成关键 PR，size:XL
  https://github.com/zeroclaw-labs/zeroclaw/pull/8486
- **[#8443] feat(matrix): add single-message progress drafts** — 创建于 2026-06-28，size:XL
  https://github.com/zeroclaw-labs/zeroclaw/pull/8443
- **[#8754] feat(config)!: schema V4 cut of skills, inert tunable, and summary_model cruft** — 创建于 2026-07-06，破坏性变更，size:XL
  https://github.com/zeroclaw-labs/zeroclaw/pull/8754
- **[#9203] fix(sop): wire authenticated HTTP fan-in** — 创建于 2026-07-20，size:XL
  https://github.com/zeroclaw-labs/zeroclaw/pull/9203

建议维护者批量筛查 `needs-author-action` 标签的 PR，对长期无响应的作者进行 ping 或主动接手，避免大量大尺寸功能 PR 因沟通阻塞而长期滞留。

---

*本日报基于 ZeroClaw GitHub 仓库公开数据自动生成，数据截至 2026-08-11。*

</details>