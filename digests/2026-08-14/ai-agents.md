# OpenClaw 生态日报 2026-08-14

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-14 02:00 UTC

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

# OpenClaw 项目动态日报 — 2026-08-14

## 今日速览

过去24小时内，OpenClaw 仓库共产生 500 条 Issue 动态（新开/活跃 338 条，关闭 162 条）和 500 条 PR 动态（待合并 386 条，已合并/关闭 114 条），社区讨论热度极高。**可靠性问题（消息投递丢失、会话状态管理）仍是社区关注的核心焦点**，评论数最高的 10 个 Issue 中有 8 个与此相关。维护侧今日无新版本发布，但已合并 2 个关键修复 PR（网关排空误报、插件升级安装），并有多项大型功能 PR 处于可合并状态。项目整体处于高活跃度、高讨论量、但历史 Bug 积压仍需加速清理的状态。

---

## 项目进展

### 已合并/关闭的关键 PR

今日共关闭/合并 114 个 PR，以下为重点变更：

| PR | 内容 | 状态 | 影响 |
|---|---|---|---|
| [#123418](https://github.com/openclaw/openclaw/pull/123418) | **修复网关排空误报**: 用户在 Settings → Model Setup 完成设备授权后收到 "Gateway is draining" 错误，实际网关并未排空 | ✅ 已合并 | 修复了模型设置流程中的关键阻断问题 |
| [#123399](https://github.com/openclaw/openclaw/pull/123399) | **升级时安装外部化插件**: 修复打包安装升级后，已配置渠道的官方配套插件未被安装的问题 | ✅ 已合并 | 完善了升级路径的插件一致性 |
| [#123386](https://github.com/openclaw/openclaw/pull/123386) | **UI 修复**: 保持 composer pickers 在视口边缘可见，防止菜单被裁剪 | ✅ 已合并 | Control UI 体验优化 |
| [#123374](https://github.com/openclaw/openclaw/pull/123374) | **技能集合评审安全修复**: 防止共享技能根目录在评审中被意外重命名或写入 | ✅ 已合并 | 安全性改进 |

### 值得关注的进行中 PR

以下 PR 已进入 "ready for maintainer look" 或接近合并状态，代表项目短中期方向：

- [#123402](https://github.com/openclaw/openclaw/pull/123402) **feat(anthropic): opt-in server-side compaction** — 接入 Anthropic 服务端压缩（compact-2026-01-12），有望改善长会话的缓存效率和稳定性
- [#123216](https://github.com/openclaw/openclaw/pull/123216) **feat(secrets): authenticated egress substitution proxy** — 为 agent 生成的子进程（curl、gh 等）提供密钥注入与认证能力
- [#121945](https://github.com/openclaw/openclaw/pull/121945) **fix(memory): complete Phase 1C read isolation** — 内存系统读取隔离的最后阶段，落地授权运行时/上下文契约
- [#120933](https://github.com/openclaw/openclaw/pull/120933) **fix(ui): complete mobile pairing after code redemption** — 移动端配对流程完成状态修复，标注 mobile/web-ui/android 多端

> **整体判断**: 项目在可靠性加固（内存隔离、密钥代理、服务端压缩）和移动端体验完善两条线上并行推进，预计下一版本将集中释放这些能力。

---

## 社区热点

### 🔥 最热 Issue

| Issue | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | Silent reply failures still recurring after #116277 closed — no queued reply payload | **92** | 静默回复失败在 #116277 关闭后仍复现，用户对修复效果提出强烈质疑 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | Feature Request: Memory Trust Tagging by Source | **48** | 为记忆条目增加来源信任标签，防止记忆投毒攻击 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | Text between tool calls leaks to messaging channels | **48** | 工具调用之间的内部文本被发送到外部消息渠道，造成 UX 困扰 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost — no retry, no notification, no auto-restart | **27** | 子代理完成结果静默丢失，无重试、无通知、无自动重启 |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) | Cron agent turns stall on DeepSeek — prefix deprioritized | **16** | DeepSeek API 边缘服务对 `[cron:` 前缀的请求降级处理，导致调度阻塞 |

### 🔥 热门 PR

评论最多的 PR 集中在两个方向：

1. **安全边界扩展**: [#123216](https://github.com/openclaw/openclaw/pull/123216)（密钥认证代理）讨论热度最高，涉及 security-boundary 变更
2. **内存系统重构**: [#121945](https://github.com/openclaw/openclaw/pull/121945)（内存读取隔离）涉及 8 个扩展模块，影响面广

### 分析

社区当前最强烈的诉求集中在**"消息不丢"**和**"可控性"**两个主题。 #121058 的 92 条评论反映出用户对重复出现的静默失败模式的耐心正在耗尽，这类问题应优先处理。同时 #25592（工具调用文本泄漏）和 #7707（记忆信任标签）均涉及安全/隐私边界，体现用户对 AI Agent 安全性的关注正在上升。

---

## Bug 与稳定性

### P1 级 & 高影响（diamond lobster 评级）问题

| Issue | 标题 | 关键词 | 是否有 Fix PR |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间文本泄漏到消息渠道 | 隐私、UX | ⚠️ 无新PR，需产品决策 |
| [#72015](https://github.com/openclaw/openclaw/issues/72015) | active-memory 阻塞回复 + QMD 启动过载 | 崩溃循环 | ⚠️ 无新PR |
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat 消息追加但无回复触发 | 消息丢失 | ⚠️ 无新PR |
| [#41165](https://github.com/openclaw/openclaw/issues/41165) | Telegram DM 仍可路由到主会话 | 会话污染 | ⚠️ 无新PR |
| [#85714](https://github.com/openclaw/openclaw/issues/85714) | LLM 忘记调用投递工具时回复滞留 | 消息丢失 | ⚠️ 已关闭但未看到修复版本 |
| [#78493](https://github.com/openclaw/openclaw/issues/78493) | sudo update 导致文件所有权混乱 | 数据损坏 | ⚠️ 无新PR |
| [#95553](https://github.com/openclaw/openclaw/issues/95553) | 预检压缩硬编码 60s 超时 | 性能/UX | ⚠️ 无新PR |
| [#115421](https://github.com/openclaw/openclaw/issues/115421) | Schema 降级恢复导致状态 DB 被隔离/清空 | 数据丢失 | ⚠️ 有 linked PR |
| [#54488](https://github.com/openclaw/openclaw/issues/54488) | 会话通道饥饿：followup drain 堵塞入站 20-30 分钟 | 通道阻塞 | ⚠️ 无新PR |
| [#120449](https://github.com/openclaw/openclaw/issues/120449) | loopDetection WARNING 级日志仅服务端可见 | 可观测性 | ⚠️ 有 linked PR |
| [#40611](https://github.com/openclaw/openclaw/issues/40611) | Heartbeat 修复引入 Telegram 阻塞回归 | 回归 | ❌ 无 |
| [#44502](https://github.com/openclaw/openclaw/issues/44502) | Discord 路由/提及门控 bug | 回归 | ❌ 无 |
| [#121605](https://github.com/openclaw/openclaw/issues/121605) | 模型 fallback 后回复未投递（2026.7.1-2 回归） | 回归 | ✅ 已关闭 |
| [#123073](https://github.com/openclaw/openclaw/issues/123073) | dev 频道更新失败：npm/pnpm 协议冲突 | 更新失败 | ⚠️ fix-shape-clear |

### 系统性风险

从 Issue 标签统计看，**"message-loss"** 和 **"session-state"** 是两个最集中的故障域，且多个 P1 问题处于 `clawsweeper:needs-product-decision` 状态 — 说明技术修复路径已明确，但需要产品决策推动。`clawsweeper-recovery-stuck` 标签出现在 #43747、#45771、#78493 上，意味着这些问题的恢复机制可能进入"卡死"状态，需要人工介入。

---

## 功能请求与路线图信号

### 社区高呼声功能

| Issue | 功能 | 评论/👍 | 被纳入下一版本的可能性 |
|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 记忆来源信任标签（防投毒） | 48 评论 | 🔥 高 — 与 #121945 PR 方向一致 |
| [#45758](https://github.com/openclaw/openclaw/issues/45758) | YAML 配置文件支持 | 8 评论 / 2👍 | 中 — 操作便捷性需求 |
| [#45771](https://github.com/openclaw/openclaw/issues/45771) | 内置 pace-aware 速率限制 | 7 评论 / 2👍 | 中 — 解决 API 配额消耗问题 |
| [#45508](https://github.com/openclaw/openclaw/issues/45508) | 自托管 STT/TTS 接入 WebChat | 7 评论 / 2👍 | 中 — 呼应企业自托管需求 |
| [#16555](https://github.com/openclaw/openclaw/issues/16555) | 投递队列消息 TTL/过期 | 6 评论 | 🔥 高 — 直接关系消息可靠性 |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | OpenRouter 成本暴露给 agent | 7 评论 / 1👍 | 中低 — 属于观测性增强 |
| [#46058](https://github.com/openclaw/openclaw/issues/46058) | Android chat-first 独立界面 | 6 评论 / 1👍 | 低 — 社区 fork，不计划 upstream |
| [#79165](https://github.com/openclaw/openclaw/issues/79165) | 网关崩溃恢复阶梯 | 6 评论 / 1👍 | 🔥 高 — 与稳定性主题强相关 |

### 路线图信号

- **PR #123402（Anthropic 服务端压缩）** 的出现说明项目正在系统性解决长会话场景的缓存效率和状态一致性问题
- **PR #123216（密钥认证代理）** 配合 #16555 的 TTL 需求，显示开发者生态对"agent 安全执行外部命令"场景的重视
- **PR #123351（Control UI 邀请入 Discord）** 和 #123356（斜杠命令参数暂存）表明项目同时投入社区增长与 UI 交互打磨

---

## 用户反馈摘要

### 核心痛点（来自 Issue 评论摘要）

1. **"修复无效"的不信任感蔓延** — #121058 用户指出 #116277 关闭后监控 cron 仍持续记录失败，质疑关闭 Issue 的真实依据；#121605 用户指出 2026.7.1-2 存在回归，而 2026.5.28 正常 — 这类反馈说明用户对版本回归的容忍度已显著降低。

2. **子代理编排的"静默黑洞"** — #44925、#67777、#92433 三个 Issue 共同指向同一问题：子代理结果在多种失败路径下（直接投递超时、drain、孤儿清理、steering 目标已结束）被静默丢弃，且无告警、无重试、无自动重启。用户评价："这是生产环境不可接受的可靠性水平"。

3. **多代理并发的不稳定** — #43367（并发 agents add 覆盖配置）、#43374（多代理并发时 LLM 调用集体超时）、#47975（子代理会话残留导致主会话无响应）— 多代理场景在真实部署中仍不可靠，制约了用户从单 agent 到多 agent 的演进。

4. **记忆管理混乱** — #43747 用户描述了同事间记忆存储位置不一致（SQLite vs 文件 vs 其他）、行为差异明显，团队协作场景下记忆系统难以预测。

### 用户满意信号

- PR #123386（UI picker 修复）、#122985（chat 跟随 composer 高度）等小粒度 UI 修复被快速合并，社区对 UI 细节关注度高且维护者响应积极
- #120302 用户提出的 usage.status 相关 UI Bug 获得快速修复

---

## 待处理积压

### 需维护者重点关注的长期 Issue

| Issue | 创建时间 | 已停留 | 状态标记 | 备注 |
|---|---|---|---|---|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 2026-08-09 | 5 天 | OPEN, 92 评论 | 高热度静默失败问题，需明确回应或解决方案 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | **6 个月+** | needs-maintainer-review, needs-product-decision | 记忆信任标签跨版本未决，社区持续关注 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 6 个月 | needs-maintainer-review, needs-product-decision | 工具间文本泄漏为隐私风险，需产品决策 |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | 2026-03-12 | 5 个月 | recovery-stuck, needs-live-repro | 记忆混乱问题被标记为恢复卡死 |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | 2026-06-02 | 2 个月 | needs-live-repro, linked-pr-open | Codex OAuth 刷新超时，有 PR 但未闭环 |
| [#91363](https://github.com/openclaw/openclaw/issues/91363) | 2026-06-08 | 2 个月 | 无 maintainer review 标记，6👍 | 隔离 cron 持续失败，用户共鸣度高 |

### 长期未合并 PR 提醒

| PR | 创建时间 | 状态 | 风险 |
|---|---|---|---|
| [#117712](https://github.com/openclaw/openclaw/pull/117712) (dependabot actions 批量更新) | 2026-08-02 | waiting on author | 12 天未推进，建议尽快处理以保持依赖健康 |
| [#77184](https://github.com/openclaw/openclaw/pull/77184) (plugin-sdk 类型导出) | 2026-05-04 | needs proof | 已滞留 3 个月，是插件开发者等待的基础能力 |

---

**总结**: OpenClaw 项目当前处于**高活跃度但可靠性压力显著**的阶段。社区讨论热度高、PR 提交频繁，但"消息丢失、会话状态异常、子代理不可靠"三类问题长期存在且用户感知强烈。建议维护方：① 对 #121058 的 92 条评论作出公开回应；② 优先解决 message-loss 聚类问题；③ 对滞留超过 3 个月的 PR 进行清理或关闭。项目在内存隔离、密钥代理、服务端压缩等方向的投入值得期待，但稳定性的"欠账"需要在下一版本中集中偿还。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-14**
**数据窗口：过去 24 小时（2026-08-13 → 2026-08-14）**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态处于**高活跃、高强度迭代**阶段：12 个追踪项目中 9 个在 24 小时内产生实质动态，头部项目单日 Issue/PR 更新量达 50 条量级，且多个项目同步推进架构级重构（OpenClaw 内存隔离、IronClaw Reborn、ZeroClaw 安全加固、CoPaw OS Shell）。**可靠性（消息不丢、任务不静默失败）是社区最集中的痛点**，几乎每个活跃项目都有对应的高热度 Issue 或回归报告。与此同时，安全与隐私边界（密钥管理、shell 白名单、记忆防投毒）和模型层可配置性（动态路由、上下文压缩、成本治理）成为跨项目涌现的第二、第三大主题。生态整体呈现“**功能繁荣但稳定性欠账**”的典型阶段特征。


## 2. 各项目活跃度对比

| 项目 | Issues 动态（新开/活跃 / 关闭） | PR 动态（待合并 / 合并/关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（338 / 162） | 500（386 / 114） | 无 | ⚠️ 高活跃，可靠性问题积压，用户信任感承压 |
| **IronClaw** | 50（32 / 18） | 50（25 / 25） | **v1.2.0** | ✅ 健康，架构迭代与稳定交付并行 |
| **ZeroClaw** | 50（37 / 13） | 50（40 / 10） | 无 | ✅ 高活跃，安全加固期，RFC 决策是瓶颈 |
| **CoPaw (QwenPaw)** | 43（26 / 17） | 50（31 / 19） | **v2.1.0 + beta.5** | ⚠️ 高活跃，稳定性短板明显 |
| **Hermes Agent** | 50（约 40+ / 约 10）¹ | 50（约 45 / 5）¹ | **v0.20.1** | ⚠️ 高活跃，v0.20.0 回归问题集中 |
| **NanoBot** | 11（10 / 1） | 31（22 / 9） | 无 | ✅ 健康，高产出、高响应 |
| **LobsterAI** | 2（2 / 0） | 11（6 / 5） | 无 | ⚠️ 活跃，stale PR 积压，版本空窗 |
| **PicoClaw** | 3（3 / 0） | 9（4 新开 / 3 关闭）² | 无 | ✅ 稳定维护期，依赖更新积压 |
| **Moltis** | 1（1 / 0） | 4（4 / 0） | 无 | ✅ 中等活跃，待合并 PR 积压 |
| **NanoClaw** | 数据缺失 | 数据缺失 | - | 🔴 摘要生成失败，需复核 |
| **NullClaw** | 0 | 0 | - | ⚪ 无活动 |
| **ZeptoClaw** | 0 | 0 | - | ⚪ 无活动 |

> ¹ Hermes 报告未给出精确分解，按总量 50/50 且 5 个 PR 合入估算。² PicoClaw PR 动态含 4 个新开 Dependabot、3 个 stale 关闭、1 个锁文件修复 PR、1 个其他。

**分层结论**：OpenClaw 以 500/500 的量级遥遥领先，属于生态绝对核心；IronClaw、ZeroClaw、CoPaw、Hermes 构成第二梯队（各 50 条左右）；NanoBot、LobsterAI、PicoClaw、Moltis 为第三梯队（个位数到 30 条）。NanoClaw、NullClaw、ZeptoClaw 处于停滞或数据缺失状态。


## 3. OpenClaw 在生态中的定位

### 社区规模对照

| 指标 | OpenClaw | 第二梯队均值（IronClaw/ZeroClaw/CoPaw/Hermes） | 倍数 |
|---|---|---|---|
| Issue 动态 | **500** | ~48 | **10.4×** |
| PR 动态 | **500** | ~50 | **10×** |
| 最热 Issue 评论数 | **92**（#121058） | ~20（IronClaw #7482） | **4.6×** |

### 核心差异

- **生态位**：OpenClaw 是“个人 AI 助手基础设施”，提供从多渠道接入、技能系统、记忆系统到网关的完整框架；同类项目多聚焦某一垂直场景（如 IronClaw 的 kernel 化架构、CoPaw 的 OS Shell、Moltis 的数据连接器）。
- **技术路线**：OpenClaw 当前最关键的投入是**可靠性三件套**——内存读取隔离（#121945）、密钥认证代理（#123216）、Anthropic 服务端压缩（#123402），对应社区最痛的“消息不丢、记忆可信、长会话稳定”三大诉求；其“修复-回归-再修复”的循环（如 #121058 对 #116277 的质疑）也说明项目在复杂度管理上承压明显。
- **社区特征**：OpenClaw 的用户反馈最激烈（92 条评论的静默失败 Issue），但也正因如此，它实际上是整个生态的**需求风向标**——其他项目讨论的可靠性、安全、内存问题，多数都能在 OpenClaw 找到同题 Issue。维护者对 UI 小修复响应积极（#123386 当日合入），但对深水区问题（message-loss、session-state）的修复速度未达用户预期。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 案例 |
|---|---|---|
| **消息/任务可靠性** | OpenClaw、Hermes、CoPaw、NanoBot | OpenClaw #121058（静默回复失败，92 评论）、Hermes #83683（网关被误杀，P1）、CoPaw #6921（任务无提示中断）、NanoBot #5373（cron 调度器静默死亡） |
| **记忆与上下文管理** | OpenClaw、IronClaw、CoPaw、ZeroClaw、Hermes | OpenClaw #121945 内存隔离；IronClaw #7185（跨会话记忆不可靠）；CoPaw #6853（prompts 与实现不一致）、#7003（ViBo 记忆优化）；ZeroClaw #6850（记忆生命周期与存储解耦 RFC）；Hermes #85418（本地优先内存层提议） |
| **安全与权限边界** | OpenClaw、ZeroClaw、CoPaw、NanoBot、Hermes | OpenClaw #7707 记忆防投毒、#25592 工具文本泄漏；ZeroClaw #9328（凭证链验证缺陷）、#7155（shell 命令分级授权 RFC）；CoPaw #6916/#6992/#6993（端口暴露、插件静默执行）；NanoBot #5306（exec.allowPatterns 绕过）；Hermes #85673（MCP OAuth 误导选项） |
| **模型层可配置性与成本治理** | OpenClaw、ZeroClaw、CoPaw、PicoClaw、NanoBot | OpenClaw #123402 服务端压缩；ZeroClaw #9631（session_id 缓存优化）；CoPaw #6973（阿里云百炼 token plan）；PicoClaw #3330（动态模型覆盖）；NanoBot #5298（MCP schema 预算） |
| **会话/子代理编排** | OpenClaw、CoPaw、ZeroClaw、Hermes | OpenClaw #44925（子代理结果静默丢失）、#43367/#43374（多代理并发不稳定）；CoPaw #6652（max_iterations 强制上限）；ZeroClaw #8303（Goal mode 分阶段落地 RFC）；Hermes #67798（生命周期钩子统一） |
| **部署形态扩展** | CoPaw、IronClaw、Hermes、Moltis | CoPaw #7010（守护模式）、#7002（服务端代理）；IronClaw #2117（本地文件桥接）；Hermes #35966（原生客户端）；Moltis #1190（CalDAV/Channel History 持久化连接器） |
| **WebUI/移动端体验** | OpenClaw、NanoBot、PicoClaw、Hermes | OpenClaw #120933（移动端配对）；NanoBot #5381（原生文件夹选择器）；PicoClaw #3281（Web UI 输入卡顿，24 天未修复）；Hermes #69592（TUI 界面不可见，超 3 周） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手（多渠道网关、技能、记忆、市场） | 个人用户/开发者 | 插件化 + 网关模型，配置复杂但扩展性最强 |
| **IronClaw** | **Kernel 化重构**（调度、租户、能力膜、密钥中介、出网边界），loop 变为“货架式 harness” | 云部署/企业/高级开发者 | ACP 执行器 + 声明式集成（约 30 行配置替代手写 WASM 包） |
| **ZeroClaw** | **安全与合规优先**（verifiable-intent、凭证链、RFC 驱动设计） | 企业/安全敏感用户 | 强类型策略契约 + 大型 RFC 评审流程 |
| **CoPaw (QwenPaw)** | 面向终端用户的桌面级体验（OS Shell、窗口化应用管理、任务栏） | 普通消费者/创意工作者 | 内置 App Center + Mission 模式 + 渠道插件化 |
| **Hermes Agent** | 桌面优先 + 消息桥接（Photon），强调**本地与云端衔接** | 日常桌面用户/多平台消息重度用户 | 桌面应用 + 消息网关 + TUI，发布节奏快 |
| **NanoBot** | 轻量、渠道丰富（Telegram/Matrix/WebUI），**MCP 生态集成** | 自托管用户/机器人开发者 | 模块化 cron + Dream 记忆整合 + 可插拔 MCP Apps |
| **LobsterAI** | UI/UX 体验统一（skills/MCP/cowork 合并视图）+ 企业版 + 运营工具（签到） | 企业内部用户/运营团队 | 前端设计系统统一 + 企业特性分支 |
| **Moltis** | **个人数据中枢**（CalDAV/聊天历史连接器 + 本地全文搜索） | 隐私敏感/效率用户 | 连接器持久化 + 原子快照 + 本地搜索 |
| **PicoClaw** | Go 实现的高效/轻量 Agent | Go 生态开发者/嵌入式场景 | 单一二进制 + 依赖简单，SDK 升级活跃 |


## 6. 社区热度与成熟度

### 分层评估

| 梯队 | 项目 | 状态特征 | 成熟度信号 |
|---|---|---|---|
| **T1 高速迭代** | OpenClaw、IronClaw、ZeroClaw、CoPaw | 日更 40-50 条，架构级 PR 密集，版本发布或重构进行中 | IronClaw v1.2.0 稳定晋升 + Reborn 规划收敛；ZeroClaw 安全修复当日合入；CoPaw v2.1.0 功能里程碑 |
| **T2 质量巩固** | NanoBot、Hermes、LobsterAI | 日更 2-30 条，修复与打磨为主 | NanoBot 对 cron 死亡问题三轮 PR 快速迭代；Hermes 发布补丁版并迅速定位回归；LobsterAI 集中统一 UI 设计系统 |
| **T3 稳定维护** | PicoClaw、Moltis | 个位数更新，依赖维护/小步修复 | PicoClaw Dependabot 正常运转但积压；Moltis 连接器功能待合并 |
| **T4 停滞/异常** | NanoClaw、NullClaw、ZeptoClaw | 无活动或数据异常 | 需确认项目是否处于休眠或迁移状态 |

### 关键观察

- **OpenClaw 处于“规模最大但痛苦最明显”的阶段**：500 条日更背后是用户对重复回归的强烈不满（#121058 的 92 条评论），说明其代码复杂度和社区期望都已达到需要更系统化质量保障机制的水平。
- **IronClaw 与 ZeroClaw 是“高质量迭代”的样本**：前者用“先立终态再调整”的方式推进架构重构；后者以 RFC 评审 + 小 PR 快速合入的组合拳保持安全性优先的节奏，且社区讨论规范（revision history 透明）。
- **CoPaw 呈现“功能快、稳定性跟不上”**：v2.1.0 发布 OS Shell 大功能，但“任务无提示中断”“压缩后 transcript 不可见”等核心体验问题未闭环，与 OpenClaw 有相似风险。


## 7. 值得关注的趋势信号

### 信号一：可靠性正在取代功能成为核心竞争力

从 OpenClaw #121058（静默失败 92 评论）到 Hermes 网关误杀集群、CoPaw 任务无提示中断、NanoBot cron 静默死亡，**“不静默”已成为用户对 agent 的基本要求**。对于开发者：在设计 agent 系统时，应把“失败可见性”作为一等公民——任何后台任务的成功/失败/重试状态都必须有可观测事件和可恢复路径，这比多一个工具调用或花哨的 UI 更能建立信任。

### 信号二：安全需求从“外围防护”深入“核心信任链”

ZeroClaw 的 verifiable-intent 凭证链验证缺陷、CoPaw 的端口暴露与插件静默执行、OpenClaw 的记忆防投毒提案（#7707）、NanoBot 的 shell 白名单绕过——安全议题已不再只是网络层防护，而是渗透到**记忆数据源可信度、子进程密钥注入、凭证链密码学验证、插件行为审计**等 agent 特有攻击面。未来 agent 框架的安全设计需要从“边界防火墙”转向“全链路信任契约”。

### 信号三：记忆系统成为“下一代”竞争的制高点

OpenClaw 内存读取隔离 + 来源信任标签、IronClaw #7185 跨会话记忆不可靠、CoPaw ReMe dream 管道与 ViBo 提案（宣称减少 97.5% memory tokens）、ZeroClaw 记忆生命周期与存储解耦、Hermes 本地优先内存层提议——记忆正从“功能 feature”升维为“架构问题”。核心矛盾是**隐私（本地/加密）、成本（token 压缩）、一致性（多会话/多代理共享）、安全（防投毒）** 四者的平衡。这个方向值得长期关注，可能孕育出独立的基础设施层。

### 信号四：模型层抽象与成本治理走向精细化

ZeroClaw 对 OpenRouter 重复请求的抱怨（每轮重放 system prompt 和 tool schema）、CoPaw 对阿里云百炼 token plan 的接入呼声、OpenClaw 的 Anthropic 服务端压缩、NanoBot 的 MCP schema 预算、PicoClaw 的动态模型覆盖——说明开发者已经不再满足于“能接模型”，而是要求**按需路由、缓存友好、token 可预算、成本可感知**。大模型 API 的成本波动和长上下文场景正在倒逼框架层做更细粒度的模型管理。

### 信号五：部署形态分化——“桌面重体验”与“服务器端托管”并行

CoPaw 用户要求守护模式、IronClaw 云端部署 + 本地文件桥接、Hermes 原生客户端呼吁、OpenClaw 移动端配对修复、NanoBot WebUI 本地文件夹选择器——生态正在从“单机命令行工具”向**多形态（桌面/移动/云端/自托管）** 演进。对开发者而言，在设计 agent 框架时应提前抽象“headless 模式”和“远程/本地资源访问边界”，否则后期补课成本极高（如 IronClaw #2117 已积压 4 个月）。

### 信号六：上游依赖迁移与供应链健康成为隐性风险

PicoClaw 的 pnpm-lockfile 损坏、Moltis 因 openclaw org 迁移导致的 Go module 路径失效、IronClaw 的 wasm 依赖升级积压、OpenClaw 的 dependabot PR 滞留——多个项目同时出现供应链漂移问题。在快速迭代阶段，**依赖更新审查周期和锁文件自动化校验**应纳入 CI 基础门槛，否则一个小小路径变更就能导致 sandbox 构建全线失败（Moltis #1191）。

---

**报告结论**：个人 AI 助手开源生态正处于“**功能军备竞赛**”与“**可靠性/安全性补课**”的叠加期。OpenClaw 作为生态核心，其痛点（消息丢失、记忆不可信、多代理不稳定）实际上定义了整个行业未来 6-12 个月的技术攻关方向；IronClaw 的 kernel 化、ZeroClaw 的安全契约、Moltis 的数据中枢探索则为生态提供了差异化路径参考。对于技术决策者，建议在选型时将“失败可见性”“记忆可信度”“供应链健康度”纳入与功能清单同等的评估权重。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot 项目动态日报 — 2026-08-14

### 今日速览

过去 24 小时项目活跃度很高：11 条 Issue 更新（10 活跃 / 1 关闭），31 条 PR 动态（22 待合并 / 9 已合并或关闭），无新版本发布。稳定性修复是今日主线——cron 调度器因单次持久化失败而永久死亡的问题引发了三轮 PR 迭代（#5374 → #5376）；会话整合归档中的截断与状态漂移问题也有专门 PR 应对。功能侧同样高产，Telegram 贴纸、MCP schema 预算、MCP Apps 元数据保留等新 PR 集中在同一天提交，整体呈现"高产出、高响应"的健康状态。

### 项目进展

今日共有 9 个 PR 结束流程（合并或关闭），以下为代表性变更：

- **WebUI 原生文件夹选择器** — [PR #5381](https://github.com/HKUDS/nanobot/pull/5381) 为本地 WebUI 会话增加 macOS / Windows / Linux 原生目录选择能力。仅在回环连接且浏览器访问为本地时启用，优先使用 Desktop 注入的 runtime host，保留手动路径输入作为远程访问兜底。该项显著改善自托管用户的本地文件操作体验。

- **恢复纯转录会话历史** — [PR #5384](https://github.com/HKUDS/nanobot/pull/5384) 修复了"仅有显示转录、缺失规范会话 JSONL"时侧边栏无法发现历史记录的问题；当两种存储同时存在时仍以规范元数据为准，且转录专属历史可打开、可删除，无需重建有损模型上下文。

- **Cron 调度器存活修复（替代轮次）** — [PR #5374](https://github.com/HKUDS/nanobot/pull/5374) 与 [PR #5375](https://github.com/HKUDS/nanobot/pull/5375) 已关闭，由 [PR #5376](https://github.com/HKUDS/nanobot/pull/5376)（开放中）取代。最终修复方向是将 `_save_store()` 的持久化异常限制在 try/finally 内部，确保 `_arm_timer()` 始终执行，调度器不会被单次磁盘故障永久杀死。

- **Cron 运行间会话隔离（P1）** — [PR #4550](https://github.com/HKUDS/nanobot/pull/4550) 修复了 cron 多次运行复用同一 session key 导致上下文串扰的问题（对应 issue #4082），为每次 cron 运行追加唯一 run_id 到 session key 覆盖项。

- **Dream 整合支持 model_override** — [PR #4556](https://github.com/HKUDS/nanobot/pull/4556) 为周期记忆整合接入 `DreamConfig.model_override`（对应 issue #4029），使 Dream 整合可使用独立模型执行。

**小结**：这些变更集中在会话存储可靠性、cron 任务正确性与 WebUI 本地化体验三个方向，项目在"数据不丢失、调度不静默死亡、本地操作更顺手"方面有实质推进。

### 社区热点

- **cron 调度器单点故障即永久死亡**（[Issue #5373](https://github.com/HKUDS/nanobot/issues/5373)）：用户 rickererer 精准描述了"磁盘满 / 权限变化 / 文件锁"等单次持久化失败导致调度器静默停摆的问题。该 issue 直接触发 #5374 / #5375 / #5376 三轮 PR 快速迭代，是目前讨论最集中的故障修复链路。

- **安全通告：exec.allowPatterns 可被 shell 链绕过**（[Issue #5306](https://github.com/HKUDS/nanobot/issues/5306)）：涉及命令白名单的绕过风险，已在过去 24 小时关闭。建议维护者在 Release Notes 中明确该问题是否已修复，以及修复所在的版本号。

- **MCP 大工具集上下文成本**（[Issue #5298](https://github.com/HKUDS/nanobot/issues/5298)）：用户提出为模型可见的 MCP tool schemas 设置预算，避免大型工具集撑爆上下文。该提案已被 [PR #5388](https://github.com/HKUDS/nanobot/pull/5388) 以 opt-in 方式落地（默认关闭）。

- **Telegram 贴纸与 MCP Apps 生态**（[Issue #5289](https://github.com/HKUDS/nanobot/issues/5289)、[Issue #5251](https://github.com/HKUDS/nanobot/issues/5251)）：分别对应 [PR #5387](https://github.com/HKUDS/nanobot/pull/5387)（贴纸回复）与 [PR #5386](https://github.com/HKUDS/nanobot/pull/5386)（MCP Apps 元数据保留），社区对渠道丰富度和 WebUI 集成 MCP 生态有持续期待。

### Bug 与稳定性

| 严重度 | 问题 | 状态 | 对应修复 |
|---|---|---|---|
| 安全 | [exec.allowPatterns shell 链命令执行绕过](https://github.com/HKUDS/nanobot/issues/5306) | 已关闭 | 需确认修复版本 |
| 高 | [cron 调度器在 job-store 持久化失败后永久死亡](https://github.com/HKUDS/nanobot/issues/5373) | 待合并 | [PR #5376](https://github.com/HKUDS/nanobot/pull/5376) |
| 高 | [整合截断归档输入但推进全部消息游标](https://github.com/HKUDS/nanobot/issues/5377) | 待合并 | [PR #5379](https://github.com/HKUDS/nanobot/pull/5379) |
| 高 | [file-cap 归档失败会先改变会话内存态](https://github.com/HKUDS/nanobot/issues/5378) | 待合并 | [PR #5380](https://github.com/HKUDS/nanobot/pull/5380) |
| 中 | [WebUI 在 Agent 回合未结束时显示复制/分叉操作](https://github.com/HKUDS/nanobot/issues/5368) | 待修复 | 暂无明确 PR |
| 中 | [Matrix 机器人设备在 Element 中显示不受信任](https://github.com/HKUDS/nanobot/issues/4841) | 长期（38 天） | [PR #5385](https://github.com/HKUDS/nanobot/pull/5385) 开放中 |
| 低 | [Windows 下 os.replace() 瞬时 PermissionError 击穿网关](https://github.com/HKUDS/nanobot/pull/5382) | 待合并 | [PR #5382](https://github.com/HKUDS/nanobot/pull/5382)（自报自修） |

今日新出现的 Bug 集中在会话存储一致性（#5377、#5378）与 cron 持久化（#5373）两条线上，均已有明确修复 PR，响应速度良好。

### 功能请求与路线图信号

- **MCP schema 预算**（[Issue #5298](https://github.com/HKUDS/nanobot/issues/5298)）— [PR #5388](https://github.com/HKUDS/nanobot/pull/5388) 已实现 opt-in 字节预算，默认关闭，保留全部内置工具且不改变注册/可执行工具集，大概率进入下个版本。
- **Telegram 可复用贴纸回复**（[Issue #5289](https://github.com/HKUDS/nanobot/issues/5289)）— [PR #5387](https://github.com/HKUDS/nanobot/pull/5387) 暴露入站贴纸 `file_id`、emoji 与贴纸包名，支持完全由贴纸标记组成的出站回复复用贴纸。
- **MCP Apps 结果元数据保留**（[Issue #5251](https://github.com/HKUDS/nanobot/issues/5251)）— [PR #5386](https://github.com/HKUDS/nanobot/pull/5386) 将结构化应用结果与模型可见文本分离，随 tool progress 事件传递，不膨胀模型上下文。
- **WebUI 会话协作**（[PR #5358](https://github.com/HKUDS/nanobot/pull/5358)）— 为 WebUI 会话分配稳定 `@name`，通过 composer 的 mention 选择器引用对等会话，属于协作方向的前瞻性设计。
- **WebUI Agent 活动文本本地化**（[Issue #5366](https://github.com/HKUDS/nanobot/issues/5366)）— 请求将 "Working for..."、"Searching files..." 等前端生成的 Agent 活动文案改为跟随用户语言。需求清晰且范围可控，适合作为 good first issue 或社区贡献入口。

### 用户反馈摘要

- **定时任务可靠性诉求**：[Issue #5373](https://github.com/HKUDS/nanobot/issues/5373) 暴露了生产环境中 cron 在"磁盘满 / 权限变化"等真实故障下的静默失效问题，用户期望至少保留存活、重试或明确告警机制。
- **认证与信任链路**：[Issue #4841](https://github.com/HKUDS/nanobot/issues/4841) 反馈在 `e2eeEnabled + sasVerification` 开启时，Element 全端显示机器人设备不受信任，且没有干净路径清除警告。用户对 Matrix 端到端加密下的设备信任体验有较高期待。
- **WebUI 完成信号冲突**：[Issue #5368](https://github.com/HKUDS/nanobot/issues/5368) 指出复制/分叉操作在 Agent 回合仍生成时即可见，同时活动状态仍在跑，"完成信号冲突"造成操作误导，反映用户对交互反馈一致性敏感。
- **上下文成本意识增强**：[Issue #5298](https://github.com/HKUDS/nanobot/issues/5298) 与 [Issue #5372](https://github.com/HKUDS/nanobot/issues/5372)（外部记忆系统提议）均表明用户开始关注大工具集与多轮对话带来的 token 开销，并愿意尝试可配置的上下文收缩方案。

### 待处理积压

- **Matrix 设备信任问题**（[Issue #4841](https://github.com/HKUDS/nanobot/issues/4841)）已持续 38 天，[PR #5385](https://github.com/HKUDS/nanobot/pull/5385) 开放中，建议尽快 Review 并补充 Element 端验证流程。
- **Heartbeat 配置增强**（[PR #4549](https://github.com/HKUDS/nanobot/pull/4549) model_override、[PR #4551](https://github.com/HKUDS/nanobot/pull/4551) isolated_session）已开放 49 天未合并，功能完整、无冲突标记，需要维护者决策或补充配置文档。
- **带 [conflict] 标记的 PR 需冲突协调**（[PR #5383](https://github.com/HKUDS/nanobot/pull/5383)、[PR #5357](https://github.com/HKUDS/nanobot/pull/5357)、[PR #5358](https://github.com/HKUDS/nanobot/pull/5358)）：三者在 session 与 WebUI 路径上可能相互影响，建议维护者安排一次集中 Review，避免多 PR 交叉阻塞合并。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

好的，作为一名 AI 智能体与个人 AI 助手领域开源项目分析师，我基于您提供的 Hermes Agent GitHub 数据，为您生成 2026-08-14 的项目动态日报。

---

# Hermes Agent 项目动态日报 (2026-08-14)

## 1. 今日速览

Hermes Agent 项目今日活跃度极高，过去 24 小时内 Issue 与 PR 更新各达 50 条，并发布了 v0.20.1 补丁版本。项目正处于密集的迭代与修复周期：一方面，围绕 Webhook 重构、生命周期钩子等方向的史诗级议题（EPIC）正在持续推进；另一方面，v0.20.0 引入的桌面端与消息网关（Gateway）的“孤儿进程回收”回归问题引发社区集中反馈，已形成多个高优先级重复 Issue 和对应修复 PR。总体来看，项目健康度呈“高活跃、高压力”状态，维护者响应迅速，但近期稳定性问题对用户影响较大。

## 2. 版本发布

- **v2026.8.13 / v0.20.1 (2026-08-13)**
  - **概述**：这是一个补丁（Patch）版本，将自 v0.20.0 以来合并的约 656 个 PR 汇总为稳定标签，供下游消费者（Docker 镜像、托管部署等）使用。
  - **说明**：由于是补丁版本，主要包含 bug 修复与稳定性改进，未提及重大破坏性变更。建议所有使用 v0.20.0 的用户关注并升级，以解决已知问题。
  - **迁移注意**：虽然此版本本身无重大变更，但鉴于今日大量关于 v0.20.0 桌面端与网关联动的回归报告，升级后建议**重启桌面应用与网关进程**，确保新逻辑生效。
  - **关联链接**：[v2026.8.13 Release](https://github.com/NousResearch/hermes-agent/releases)

## 3. 项目进展

今日共有 5 个 PR 被合并/关闭（数据统计），其中值得关注的是对安全与稳定性的持续加固：

- **安全修复：GitHub MCP OAuth 误导性选项移除 (PR #85673, CLOSED)**：修复了桌面端对不支持 OAuth 动态客户端注册的 GitHub 托管 MCP 服务器仍提供一键 OAuth 选项的问题，避免用户困惑与连接失败。
  - [PR #85673](https://github.com/NousResearch/hermes-agent/pull/85673)
- **插件功能：iMessage 默认纯文本回复 (PR #85733, CLOSED)**：Photon（iMessage 桥接）的回复默认改为纯文本，Markdown 成为显式选择，提升了跨设备消息的兼容性。
  - [PR #85733](https://github.com/NousResearch/hermes-agent/pull/85733)
- **功能修复：准确引文匹配优化 (PR #85749, CLOSED)**：针对“接地引文”功能，修复了因排版 Unicode 字符（如弯引号、连字符）导致原文逐字引用匹配失败的问题。
  - [PR #85749](https://github.com/NousResearch/hermes-agent/pull/85749)

这些合并且关闭的 PR 表明项目正在从功能开发转向对既有功能的精细打磨与安全加固，整体向前稳步迈进。

## 4. 社区热点

今日讨论热度最高的议题集中于**系统稳定性**与**大规模重构规划**：

- **(1) 网关/桌面端进程管理回归 (Issue #83683, 20 评论)**：用户在 Windows 平台反馈，每次桌面应用重启后，运行的微信/QQ/Telegram 消息网关会被强制杀死且不会自动重启，导致消息静默。该问题被标记为 P1，且与多个后续 Issue 高度重复，是今日最集中的用户痛点。
  - [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683)
- **(2) Skills 索引陈旧 (Issue #66616, 25 评论)**：自动化探针检测到 Skills Hub 依赖的 `skills-index.json` 文件过期（29.8 小时，超过 26 小时限制），影响了文档站点的功能。该问题已暴露近一个月（7月18日创建），评论数持续增多，反映出用户对文档与技能生态健康度的关注。
  - [Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616)
- **(3) Webhook 革命 (Meta-Issue #84834, 16 评论)**：这是一个“史诗级”重构议题，旨在系统化修复整个 Webhook 表面（入口、执行、投递、配置、管理 UI、部署、文档）。该议题的活跃讨论表明社区对 webhook 稳定性与易用性有较高期待。
  - [Issue #84834](https://github.com/NousResearch/hermes-agent/issues/84834)

**诉求分析**：社区讨论热点反映出用户对后台服务（网关）在桌面端操作下的“生存能力”有强烈关注；同时，社区也在积极参与项目大规模技术演进的顶层设计讨论。

## 5. Bug 与稳定性

今日 Bug 报告数量较多（约40个），其中 **P0/P1 级别的严重问题**尤为突出，以下按严重程度排列：

- **P0 - 已解决**：`_canonicalize_api_tool_calls` 历史记录篡改问题 (Issue #81639, CLOSED)。该问题会导致会话永久卡死，但今日已作为重复问题被关闭。
  - [Issue #81639](https://github.com/NousResearch/hermes-agent/issues/81639)
- **P1 - 网关被“孤儿回收”机制误杀 (集群问题)**：这是今日最大 Bug 集群，多个独立 Issue 报告了在 macOS 和 Windows 上，桌面应用启动时会将由 launchd/计划任务托管的正规网关进程杀死（详情见 #83683, #85344, #85044）。
  - [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683) | [Issue #85344](https://github.com/NousResearch/hermes-agent/issues/85344) | [Issue #85044](https://github.com/NousResearch/hermes-agent/issues/85044)
  - **关联修复 PR**：PR #85743 正针对此问题修复，通过排除服务托管的 PID 来避免误杀。
    - [PR #85743](https://github.com/NousResearch/hermes-agent/pull/85743)
- **P2 - 功能故障**：包括 `browser_exec` 因 PYTHONPATH 路径问题导致 `pydantic_core` 导入失败 (#83427)；SQLite POSIX 锁冲突导致网关 API 连接错误 (#80117)；更新程序在 Windows 上因 ZIP 回退导致桌面应用被删除且不会重建 (#83846)。
  - [Issue #83427](https://github.com/NousResearch/hermes-agent/issues/83427) | [Issue #80117](https://github.com/NousResearch/hermes-agent/issues/80117) | [Issue #83846](https://github.com/NousResearch/hermes-agent/issues/83846)
- **P1/P2 回归问题**：桌面端同一消息渲染两次 (#85104)、profile 切换后会话列表错误 (#85745)、TUI 中 `/sessions` 与 `/models` 界面不可见 (#69592) 等问题依然存在，影响用户核心操作路径。
  - [Issue #85104](https://github.com/NousResearch/hermes-agent/issues/85104) | [Issue #85745](https://github.com/NousResearch/hermes-agent/issues/85745) | [Issue #69592](https://github.com/NousResearch/hermes-agent/issues/69592)

## 6. 功能请求与路线图信号

今日新功能请求与路线图信号较为丰富，部分已有关联 PR 处于待合并状态：

- **核心业务扩展**：
  - **DeepSeek Responses API 支持 (Issue #85740)**：新请求，希望适配 DeepSeek 新推出的 `/v1/responses` 接口。鉴于已有 DeepSeek 相关 bug 报告 (#83390)，此请求有望进入近期迭代。
    - [Issue #85740](https://github.com/NousResearch/hermes-agent/issues/85740)
  - **挂钩机制统一 (Issue #67798)**：请求将生命周期钩子（Lifecycle Hooks）从网关独占变为所有执行面（CLI、TUI、Cron 等）共享的运行时契约，该议题已进入 `needs-decision` 状态，PR #69182 的部分改动与此相关。
    - [Issue #67798](https://github.com/NousResearch/hermes-agent/issues/67798)
- **生态与体验改善**：
  - **原生桌面/移动客户端 (Issue #35966, 👍4)**：社区持续呼吁开发现生客户端，摆脱对第三方消息平台的依赖，该请求已获得一定的社区支持。
    - [Issue #35966](https://github.com/NousResearch/hermes-agent/issues/35966)
  - **内存提供方建议 (Issue #85418)**：用户提议基于 Hermes 构建本地优先、零依赖的 Agent 内存层，并已提供基准测试方案。
    - [Issue #85418](https://github.com/NousResearch/hermes-agent/issues/85418)
  - **Telegram 启动丢弃更新选项 (Issue #84317)**：请求允许用户在冷启动时选择不丢弃 `drop_pending_updates`，以保留消息。
    - [Issue #84317](https://github.com/NousResearch/hermes-agent/issues/84317)

## 7. 用户反馈摘要

- **“桌面重启即网关失联”成为最大痛点**：多位用户在 Windows 与 macOS 平台上复现了类似问题，表达了对“消息平台全部静默”这一故障的强烈不满，并确认这是 v0.20.0 的回归。有用户评论称：“This is a regression: before this version, the old...” (Issue #83683)。
- **对维护者的修复速度表示认可**：尽管问题严重，但用户发现核心维护者已迅速对网关误杀问题给出了修复 PR (#85743)，并有人主动提交了关联的重复 Issue 作为补充证据，社区协作氛围良好。
- **对文档健康状况敏感**：关于 Skills 索引陈旧的问题，用户持续关注，评论数高达 25 条，表明开发者社区对官方文档与技能库的可用性有较高要求。
- **对复杂配置的困惑**：多个 Issue 涉及配置项（如 `agent.reasoning_effort`）未被正确识别，或替代方案不易感知，说明配置系统的健壮性和用户引导仍有提升空间（已有多个 PR 针对此进行修复，如 #85752、#85757）。

## 8. 待处理积压

以下是长期存在、尚未解决的重要 Issue/PR，提请维护者重点关注：

- **P1 长期未修复：TUI 核心界面不可见 (Issue #69592, 创建于 2026-07-22)**：距离首次报告已超过 3 周（用户评论提到“Day 13”），至今尚无有效的修复 PR，严重影响核心用户体验。
  - [Issue #69592](https://github.com/NousResearch/hermes-agent/issues/69592)
- **P3 需求已逾 4 个月：富电子表格技能 (Issue #4438, 创建于 2026-04-01)**：用户对结构化处理 xlsx/csv 文件的需求已等待较久，暂无后续进展迹象。
  - [Issue #4438](https://github.com/NousResearch/hermes-agent/issues/4438)
- **P3 功能请求：原生客户端 (Issue #35966, 创建于 2026-05-31)**：该请求有 4 次 👍 支持，但仍在开放讨论中，未进入设计或开发阶段。
  - [Issue #35966](https://github.com/NousResearch/hermes-agent/issues/35966)
- **P3 配置改进：凭证池 TTL 可配置化 (Issue #33049, 创建于 2026-05-27)**：用户希望将硬编码的 `EXHAUSTED_TTL_*` 常量暴露为配置项，但长期未获处理。
  - [Issue #33049](https://github.com/NousResearch/hermes-agent/issues/33049)

---
**数据说明**：本日报数据基于 2026-08-13 至 2026-08-14 的 GitHub 活动快照。部分 PR 的评论数未能从快照中获取，故“PR 评论数”未作为排序依据。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-08-14**
**数据窗口：过去 24 小时（截至 2026-08-14）**


## 1. 今日速览

PicoClaw 今日活跃度中等。过去 24 小时新增 3 个 Issue，其中 1 个为长期未解决的 Web UI 性能 Bug（#3281）继续获得关注，另外 2 个为新功能请求。PR 侧有 9 条更新，其中 4 个新开的 Dependabot 自动依赖更新 PR 待维护者处理，3 个陈旧的重复依赖更新 PR 被关闭，另有 1 个修复 pnpm-lockfile 损坏问题的 PR（#3318）仍在等待审查。项目今日无新版本发布，整体处于功能迭代前的维护与依赖更新阶段，社区反馈集中在功能扩展与体验优化上。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日无重大功能合并，但有以下值得关注的动态：

- **依赖陈旧 PR 清理**：3 个标记为 `stale` 的 Dependabot PR 被自动关闭（#3304、#3305、#3306），均为旧版依赖升级被更新的 PR 取代。这保持了 PR 队列的整洁，避免维护者重复审查。
- **待合并 PR 积压至 6 个**：当前有 6 个 PR 处于待合并状态，其中 5 个为 Dependabot 依赖更新，分别是：
  - [#3332](https://github.com/sipeed/picoclaw/pull/3332)：`aws-sdk-go-v2` v1.42.0 → v1.43.4
  - [#3333](https://github.com/sipeed/picoclaw/pull/3333)：`mautrix-go` v0.27.0 → v0.29.0
  - [#3334](https://github.com/sipeed/picoclaw/pull/3334)：`anthropic-sdk-go` v1.55.1 → v1.62.0
  - [#3335](https://github.com/sipeed/picoclaw/pull/3335)：`aws-sdk-go-v2/config` v1.32.25 → v1.32.35
  - [#3336](https://github.com/sipeed/picoclaw/pull/3336)：`bedrockruntime` v1.53.3 → v1.57.1

  这些更新涉及 Anthropic SDK 的 minor 版本跳跃（1.55→1.62），可能包含重要功能更新，建议维护者尽快审查合并。

- **锁文件修复 PR**：[#3318](https://github.com/sipeed/picoclaw/pull/3318) 修复 `pnpm-lock.yaml` 中重复映射键导致无法解析的问题，该问题会阻塞 Web 前端依赖安装和 CI 流程。已标记 `stale`，需要维护者确认。


## 4. 社区热点

- **#3281（Web UI 输入卡顿）** 今日更新于 8 月 13 日，有 **5 条评论 + 1 👍**，是过去 24 小时讨论度最高的问题。用户反馈在会话历史较长时，Web UI 聊天输入框出现明显卡顿。该 Issue 创建于 7 月 21 日，已存在超 3 周，当前仍无明确的修复 PR，是社区关注度最高的未解决问题之一。
  链接：[#3281](https://github.com/sipeed/picoclaw/issues/3281)

- **新增功能请求** #3330 与 #3331 均于 8 月 13 日新开，目前暂无评论。但两者的主题分别涉及 agent 工具的模型动态覆盖与 ASR 转录端点扩展，这暗示社区用户正在探索更灵活的模型路由和语音集成场景，与上游 SDK 的大版本更新形成呼应。


## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 | 关联 PR |
|---------|-------|------|------|---------|
| 🟡 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 聊天输入框在会话历史较长时严重卡顿，影响日常使用体验 | **开放中**，5 条评论，1 👍 | 无 |
| 🔴 高 | [#3318](https://github.com/sipeed/picoclaw/pull/3318) | `web/frontend/pnpm-lock.yaml` 含重复键导致锁文件损坏，安装与 CI 失败 | **PR 已提交**待审查，已标记 stale | PR #3318 |

其中 #3281 虽非崩溃类 Bug，但直接关系到 Web UI 的核心交互体验，且已持续超 3 周未获修复，建议维护者优先排查（可能与 DOM 渲染或虚拟列表机制有关）。#3318 是构建链路的阻断性问题，虽然修复 PR 已提交，但该 PR 本身已标记 `stale`，存在被自动关闭的风险，需要维护者介入。


## 6. 功能请求与路线图信号

今日收到 2 个新功能请求，均处于完全开放状态（无评论、无 👍）：

- **#3330 [Feature] 在 delegate/spawn/subagent 工具中支持动态模型覆盖**
  - 用户需求：在调用时指定模型，而不是由配置静态决定。目前 `delegate` 使用目标 agent 的配置模型、`spawn` 固定使用主 agent 的 `defaultModel`、`subagent` 同样受限。
  - 信号强度：中。该请求涉及 agent 核心执行链路的灵活性，符合当前 AI Agent 领域"动态路由 + 模型选择"的趋势。若实现，将显著提升 PicoClaw 在多模型工作流中的实用性。
  - 链接：[#3330](https://github.com/sipeed/picoclaw/issues/3330)

- **#3331 [Feature] 支持任意兼容 OpenAI 的 `/audio/transcriptions` 端点模型**
  - 用户需求：当前 ASR 功能仅匹配 `*-whisper-*` 模型名，用户希望添加如 `whisper-transcription: true` 之类的配置开关，以强制走 whisper 路径来适配更多模型服务。
  - 信号强度：中。这反映用户对语音输入模型的定制化需求，也暴露了当前 ASR 路径对模型命名约定耦合过深的设计局限。
  - 链接：[#3331](https://github.com/sipeed/picoclaw/issues/3331)

**路线图预判**：这两个请求与当前 PR 中 Anthropic SDK 升级（#3334）无直接关联，但它们共同反映用户对"模型层可配置性"的强烈意愿。若维护者认可方向，它们有可能与未来的模型路由重构一起纳入下个 minor 版本。


## 7. 用户反馈摘要

- **Web UI 性能痛点**：[#3281](https://github.com/sipeed/picoclaw/issues/3281) 的反馈用户（xpader）使用 PicoClaw 0.3.1 + Go 1.25.11 + Web 端，明确指出"会话历史稍微变长后输入框卡顿"。5 条评论的存在说明至少有多个用户遇到过类似情况或参与了讨论，这是一个真实的体验摩擦点。
- **模型灵活性的潜在需求**：新功能请求 #3330 和 #3331 代表了一部分进阶用户对"不被静态配置绑定"的期望，分别为 agent 工具的运行时模型覆盖和 ASR 模型不可扩展两个方向发声。虽然没有评论佐证共振，但这两个需求点都切中了当前大模型应用开发者在多模型管理上的共性痛点。

**满意点**：从 Issue 评论数据看，社区暂无对新版本的负面反馈；依赖更新 PR 持续由 Dependabot 驱动，表明项目的供应链维护机制运转正常。


## 8. 待处理积压

- **#3281（Web UI 输入卡顿）**：创建于 2026-07-21，已存在 **24 天**，期间有持续讨论但无修复 PR。作为用户直接感受到的性能问题，建议维护者在一周内给出响应（排查方向或临时缓解方案）。
  链接：[#3281](https://github.com/sipeed/picoclaw/issues/3281)

- **#3318（pnpm-lockfile 损坏修复 PR）**：创建于 2026-08-05，已 9 天未获审查，且被标记为 `stale`。锁文件损坏会直接影响 Web 前端的安装与 CI，此 PR 应尽快处理（合并或关闭并给出替代方案）。
  链接：[#3318](https://github.com/sipeed/picoclaw/pull/3318)

- **依赖更新 PR 批量等待**：6 个待合并 PR 中有 5 个为 Dependabot 依赖更新，其中 [#3334](https://github.com/sipeed/picoclaw/pull/3334)（anthropic-sdk-go 1.55.1 → 1.62.0）版本跨度较大，长期不合并可能导致后续更新冲突累积。建议维护者设置固定的依赖更新审查周期。
  链接：[#3332](https://github.com/sipeed/picoclaw/pull/3332)、[#3333](https://github.com/sipeed/picoclaw/pull/3333)、[#3334](https://github.com/sipeed/picoclaw/pull/3334)、[#3335](https://github.com/sipeed/picoclaw/pull/3335)、[#3336](https://github.com/sipeed/picoclaw/pull/3336)


> **健康度评估**：PicoClaw 当前处于稳定的维护节奏中——Dependabot 正常运转、Issue 讨论活跃、新功能需求持续提出。需要重点关注的两个信号是：① Web UI 性能问题旷日持久未解，② 功能请求与维护 PR 的比例上升且依赖更新积压。项目整体健康度良好，但需避免"依赖更新淹没问题修复"的倾向。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-14


## 1. 今日速览

过去 24 小时项目活跃度极高：共更新 Issues 50 条（新开/活跃 32，关闭 18）、PR 50 条（待合并 25，已合并/关闭 25），并正式发布 v1.2.0 稳定版。核心事件是 Reborn 架构重构（[#7482](https://github.com/nearai/ironclaw/issues/7482)）完成大规模子任务拆分：15 个规划类子 Issue 全部关闭，收敛为 4 个 open 实施项（[#7621](https://github.com/nearai/ironclaw/issues/7621)、[#7622](https://github.com/nearai/ironclaw/issues/7622)、[#7623](https://github.com/nearai/ironclaw/issues/7623)、[#7624](https://github.com/nearai/ironclaw/issues/7624)），其中 [#7624](https://github.com/nearai/ironclaw/issues/7624)（ACP 执行器 v0）被标记为"现在唯一需要构建的工作项"。与此同时，性能优化（Tier 3，epic [#7591](https://github.com/nearai/ironclaw/issues/7591)）有 4 个新 PR 进入审查；文档契约测试与结构化文档编辑等长线功能也取得合入。整体健康度良好，处于高强度架构迭代期。


## 2. 版本发布

### ironclaw-v1.2.0（2026-08-13）

由 `1.2.0-rc.3` 稳定晋升，发布 PR 为 [#7625](https://github.com/nearai/ironclaw/pull/7625)。

**含 RC1 完整特性集与 RC2/RC3 全部修复**，其中公开的修复点包括：

- 运行时容器镜像预装 `curl`，使容器内 HTTP 健康检查可正常执行；编排器对 worker 的探活不再因缺少工具而失败。
- RC1–RC3 的变更日志已统一合并至稳定版条目下。

未提及破坏性变更或迁移注意事项。若用户从 v1.1.x 升级，建议以本次稳定版聚合的 RC 变更日志为准。

**相关链接**：[Release 页面](https://github.com/nearai/ironclaw/releases) · [晋升 PR #7625](https://github.com/nearai/ironclaw/pull/7625)


## 3. 项目进展

今日关闭/合入的 PR 覆盖架构、文档、稳定性与基础设施四条线，整体向前推进明显：

**架构（unbound-turns）**
- [#7633](https://github.com/nearai/ironclaw/pull/7633)（已关闭）实现 unbound-turns 设计终态：threads 成为协调器的"工作单元"，conversation 变为 thread + 产品侧 binding，内核彻底移除回复路由职责。这是 [#7562](https://github.com/nearai/ironclaw/pull/7562) 设计文档的落地实现，属于"先立终态再调整"的高风险合入。

**文档契约测试与 CI 门槛**
- [#7376](https://github.com/nearai/ironclaw/pull/7376)（已关闭）将 `check-guidance.py` 路径引用门禁扩展到整个 `docs/` 表面（含 Mintlify 公开页、中文镜像、内部契约仓库），此前公开文档树存在零路径校验。
- [#7378](https://github.com/nearai/ironclaw/pull/7378)（待合并）新增三个确定性"文档事实"契约测试，分别落在所验证 crate 内，杜绝文档声明与真实行为漂移。

**文档能力**
- [#7163](https://github.com/nearai/ironclaw/pull/7163)（已关闭）实现 docx/xlsx/pptx 结构化编辑、HTML 渲染 PDF，并修复 #7109 引入的文本日志回归（即：之前"拒绝写坏二进制文档"的守卫留下了用户诉求未满足的空档，此 PR 补上真实文档往返能力）。

**稳定性 / 行为修正**
- [#7531](https://github.com/nearai/ironclaw/pull/7531)（已关闭）将 repeated-call 检测由滑动窗口频率启发式改为"连续三次相同签名"的简单检查，且仅作模型可见告警，不再将启发式重复转化为硬性阻断。
- [#7581](https://github.com/nearai/ironclaw/pull/7581)（已关闭）修复扩展面板状态：OAuth 发现后刷新内置托管 MCP 目录投影，工具不再显示为 `setup_needed`；同时保留升级时的旧策略。
- [#7590](https://github.com/nearai/ironclaw/pull/7590)（已关闭）修复 live-canary 中内置技能标记所有者与运行时 mint 不一致的问题，使 CI 自检的 verdict 叙述真正生效。

**性能（Tier 3，[#7591](https://github.com/nearai/ironclaw/issues/7591)）— 今日新提交、审查中**
- [#7628](https://github.com/nearai/ironclaw/pull/7628)：移除心跳 journal 追加与游标预留，全权保留 materialized 行上的租约时间戳。
- [#7629](https://github.com/nearai/ironclaw/pull/7629)：将 trigger 运行历史保留剪枝从每次 Running 行更新移动到初始 fire claim。
- [#7630](https://github.com/nearai/ironclaw/pull/7630)：新增 `db-write-measurement` 压力预设，量化单用户轮次的 Postgres 写放大。
- [#7631](https://github.com/nearai/ironclaw/pull/7631)：通过共享 CoalescingEventSink 合并运行时事件与里程碑持久化写入。

**依赖维护**
- [#7506](https://github.com/nearai/ironclaw/pull/7506)（已关闭）一次性升级 17 个依赖（async-trait、thiserror、base64、toml 等）。

**小结**：v1.2.0 稳定版 + unbound-turns 架构合入 + Reborn 规划收敛 + 性能测量基建开工，项目在"稳定交付"与"架构现代化"双线上同时前进。


## 4. 社区热点

**最热 Issue：Reborn epic [#7482](https://github.com/nearai/ironclaw/issues/7482)**（6 条评论，0 👍，但衍生 20+ 子 Issue）
今日创建的全部子任务（[#7606](https://github.com/nearai/ironclaw/issues/7606) 至 [#7624](https://github.com/nearai/ironclaw/issues/7624)）均挂靠此 epic。核心叙事：**IronClaw 成为 kernel（调度、租户、能力膜、密钥中介、出网边界、持久审计、入站通道），而不再拥有 agent loop 与集成代码**。loop 变为"货架式 harness"（claude-code、pi、codex + 原生 Rust 循环），集成从手写 WASM 包降为约 30 行声明式配置。评论区的绑定决策记录（comment 1 / comment 2）是后续实现不得重新争辩的约束，显示出很强的"决策集中、执行解耦"管理风格。背后诉求：解决 run-length 路径病（N 次模型往返）与月度上游破坏性变更的维护负担。

**次热 Issue：PDF mime_type 报错 [#6257](https://github.com/nearai/ironclaw/issues/6257)**（4 条评论，已关闭）
来自 Slack #x-ai-product-feedback 的 Michael Kelly。发送/生成 PDF 时铁定报 `Invalid value (attachments.mime_type)`。已关闭，说明根因已定位修复。

**用户功能诉求：#2117 ironclaw-bridge**（2 条评论，👍 1，开放中）
云托管部署下无法访问本地文件（Obsidian vault、本地项目目录）。已有 tunnel 系统不能满足，社区希望有本地文件/MCP 桥接守护进程。虽有 1 个 👍，但自 4 月创建以来长期低活跃，属于"叫好不叫座"的积压需求。

**记忆连续性：#7185 Memory not reliably recalled across conversations**（2 条评论，开放中）
来自 2026-07-23 IronClaw Champions 周会，多名测试者独立观察到跨会话记忆不可靠。涉及法律（Devon/Tobias 转述）与通用场景，属核心体验问题，至今仍在开放状态。


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| 高（功能阻塞） | [#7626](https://github.com/nearai/ironclaw/issues/7626)（新开） | 自定义 MCP 需要浏览器/邮箱认证时，Hermes 能打开浏览器但 IronClaw 卡死；MKT1 场景确认复现 | 无 fix PR |
| 高（核心体验） | [#7185](https://github.com/nearai/ironclaw/issues/7185)（开放 11 天） | 跨会话记忆不可靠，多位 Champions 测试者报告 | 无 fix PR |
| 中（状态误导） | [#7627](https://github.com/nearai/ironclaw/issues/7627)（新开） | GitHub 扩展输入任意无效凭证（如 "1"）仍显示"已连接"，随后才提示认证失败 | 无 fix PR |
| 低（外部依赖） | [#7589](https://github.com/nearai/ironclaw/issues/7589)（已关闭） | NEAR AI Cloud 的 Sonnet-5 连续三天返回 500；关联 nearai/cloud-api#920 | 已关闭，属上游 |
| 已修复 | [#6257](https://github.com/nearai/ironclaw/issues/6257)（已关闭） | PDF 附件 mime_type 校验失败，导致发送/生成 PDF 不可用 | 已关闭 |

**值得注意**：[#7627](https://github.com/nearai/ironclaw/issues/7627) 与 [#7581](https://github.com/nearai/ironclaw/pull/7581)（已合入）同属扩展/MCP 连接状态管理，后者的修复针对的是 `setup_needed` 反向问题（可用却显示未配置），而 #7627 是未认证却显示已连接——同一状态机两端的缺陷，建议维护者在关闭 #7627 前对扩展连接状态做一次统一梳理。


## 6. 功能请求与路线图信号

**近期确定性路线图（Reborn）**
- [#7624](https://github.com/nearai/ironclaw/issues/7624)（OPEN，明确"现在构建"）**v0: ACP 执行器**：以 claude-code 作为 loop、dev-only yolo 模式，是唯一立即动工的 pluggable-loops 工作项；[#7621](https://github.com/nearai/ironclaw/issues/7621)（egress 边缘/iron-proxy）、[#7622](https://github.com/nearai/ironclaw/issues/7622)（外部 harness 执行）、[#7623](https://github.com/nearai/ironclaw/issues/7623)（能力访问与灰度）为后续阶梯，触发条件满足后才启动。**判断：v1.3.0 将包含 ACP 实验性支持。**

**用户新功能需求**
- [#7580](https://github.com/nearai/ironclaw/issues/7580)（新开）：在 Web UI 中显示 Reborn 版本号。来自 #x-ai-product-feedback，属于低成本 UX 改进，实现难度极小，很可能快速进入 backlog。
- [#2117](https://github.com/nearai/ironclaw/issues/2117)（开放 4 个月）：ironclaw-bridge 本地文件/MCP 桥接守护进程。与云端部署战略有关，但因涉及架构（tunnel、权限、安全边界）可能排期靠后。

**可能被纳入下一版本的 in-flight 能力**
- [#7513](https://github.com/nearai/ironclaw/pull/7513)（OPEN）：CLI `--acp --stdio` 命令，暴露 ACP 协议端点，接驳 GitHub Copilot CLI / VS Code。与 #7624 呼应，ACP 生态是明确方向。
- [#7548](https://github.com/nearai/ironclaw/pull/7548)（OPEN）：为定时自动化引入结构化执行契约（目标、成功标准、输出指令、无结果行为、能力白名单、必选技能）。独立于 Reborn，是产品化增强。
- [#7184](https://github.com/nearai/ironclaw/pull/7184)（OPEN）：为 WASM 工具沙箱新增 Nostr 主机函数（签名、发布、查询），私钥不出宿主机。社区贡献（新贡献者 Kampouse），审慎评估中。
- [#7562](https://github.com/nearai/ironclaw/pull/7562)（OPEN）：detached turns 设计文档——threads 为工作单元。其实现 PR [#7633](https://github.com/nearai/ironclaw/pull/7633) 已关闭，说明该设计已进入实际落地阶段。


## 7. 用户反馈摘要

- **记忆/上下文连续性（核心痛点）**：[#7185](https://github.com/nearai/ironclaw/issues/7185) 中多位测试者（法律领域 Devon、Champions 周会参与者）反馈"一个对话中建立的信息，后续对话无法可靠访问"。这是 agent 产品最关键的体验指标之一，且当前无对应 fix PR，建议提升排期优先级。
- **MCP 认证流程卡死（真实工作流受阻）**：[#7626](https://github.com/nearai/ironclaw/issues/7626) 用户尝试连接需要浏览器/邮箱验证的 MCP（MKT1 付费访问），浏览器弹出了但 IronClaw 卡住。提示自定义 MCP harness 对 OAuth/浏览器流支持不完整。
- **连接状态不诚实（信任受损）**：[#7627](https://github.com/nearai/ironclaw/issues/7627) 用户输入任意字符（"1"）后扩展显示"已连接"，实际认证失败仍显示连接态。用户对状态真实性的信任感降低。
- **PDF 附件不可用（经典场景受阻）**：[#6257](https://github.com/nearai/ironclaw/issues/6257)（已修复）Slack 用户 Michael Kelly 报告发送/生成 PDF 失败。Agent 场景中"读取 PDF 并产出 PDF"是高频刚需，修复值得肯定。
- **模型服务不稳定（上游担忧）**：[#7589](https://github.com/nearai/ironclaw/issues/7589) Sonnet-5 三天 500 错误，用户已受影响数日；虽定位在 cloud-api 上游，但说明产品对单一模型供应商的依赖风险在累积。
- **版本可见性（开发者体验）**：[#7580](https://github.com/nearai/ironclaw/issues/7580) 用户不知道如何从 Web UI 查看 Reborn 版本——版本号不可见会显著增加问题排查成本，建议尽快补上。


## 8. 待处理积压

**长期开放的 Issue**

- [#2117](https://github.com/nearai/ironclaw/issues/2117) — **ironclaw-bridge 本地文件/MCP 桥接**（创建 2026-04-07，已 4 个月+，2 条评论，1 👍）。云托管用户无法访问本地 Obsidian vault/项目目录的阻塞性需求，至今无明确排期。
- [#7185](https://github.com/nearai/ironclaw/issues/7185) — **跨会话记忆不可靠**（开放 11 天，2 条评论）。来自官方 Champions 周会反馈，直接影响核心 agent 体验，尚无 fix PR 或排期回应。

**长期开放的 PR（等待审查/反馈）**

- [#7184](https://github.com/nearai/ironclaw/pull/7184) — **Nostr WASM 主机函数**（8 月 4 日提交，开放 10 天）。外部贡献者 Kampouse（新贡献者），涉及密钥签名与网络能力，安全评审较重，但长期不回会有损社区贡献意愿。
- [#7020](https://github.com/nearai/ironclaw/pull/7020) — **tokio-tungstenite 0.29 → 0.30**（8 月 2 日提交，开放 12 天）。纯依赖升级零风险，长期挂起会积累技术债。
- [#7262](https://github.com/nearai/ironclaw/pull/7262) — **wasm 组依赖升级（wit-component / wit-parser）**（8 月 5 日提交，开放 9 天）。
- [#7378](https://github.com/nearai/ironclaw/pull/7378) — **doc-fact 契约测试**（doc-truth PR 3/5，8 月 7 日提交，今日仍有更新）。与其配套的 2/5（#7376）已合入，此 PR 是同一系列的后半段，宜尽快推进避免系列脱节。

**结构性提示**：Reborn 拆解出的 20+ 个子 Issue 中，15 个规划类已关闭，但实施类（[#7621](https://github.com/nearai/ironclaw/issues/7621)、[#7622](https://github.com/nearai/ironclaw/issues/7622)、[#7623](https://github.com/nearai/ironclaw/issues/7623)）全部等待 [#7624](https://github.com/nearai/ironclaw/issues/7624) v0 验证后再启动；请关注 #7624 的推进节奏，避免架构重构进入"规划完成、实施悬空"的停滞窗口。

---

*数据范围：2026-08-13 至 2026-08-14（GitHub API）*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-08-14）

> 数据来源：[github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | 统计周期：2026-08-13 → 2026-08-14

## 1. 今日速览

过去 24 小时项目保持较高的开发活跃度：PR 更新达 11 条，其中 6 条已关闭（含合入），5 条待处理；Issues 更新 2 条，均为活跃状态，无新关闭。今日无新版本发布，处于“功能开发密集推进、版本发布静默”的阶段。开发重心集中在 renderer/UI 层的体验统一重构——skills、MCP、cowork 三大模块的卡片、列表与详情视图正在被整合为统一风格，同时企业版特性（#2484）已合入。社区侧最突出的声音是 Issue #2489 的用户直接催更 v4pro，反映出对下一个大版本发布的强烈期待。此外，多条 3 月底创建的 stale 测试补充 PR 仍处于待合并状态，测试基建的历史欠账值得关注。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共关闭/合并 6 个 PR，覆盖 UI 重构、功能迭代与 Bug 修复：

- **[#2484] Feat/enterprise edition（已合并/关闭）** — 企业版特性合入，涉及 renderer、docs、main、openclaw 等多个 area，是项目企业化路线图的重要里程碑。[链接](https://github.com/netease-youdao/LobsterAI/pull/2484)
- **[#2485] feat(activity): support evergreen daily check-in（已合并/关闭）** — 将签到活动从旧版一次性活动调整为 Evergreen 常驻形态，并复用既有服务端与管理端能力；补充活动状态自动刷新、积分入口改为跳转网页积分详情。定向 Vitest 7/7 通过，ESLint 零警告，build 通过。[链接](https://github.com/netease-youdao/LobsterAI/pull/2485)
- **[#2486] refactor(mcp): unify MCP card/detail UI with kits and skills styling（已合并/关闭）** — 将 SkillCardMenu 重命名为共享 CardOverflowMenu 并在 kits/mcp/skills 间复用；抽取 managementTypography 统一样式；新增 McpCard 与 McpDetailModal，拆分 mcpTabs，重构 McpManager 列表/详情流程与 mcpRegistry 展示。[链接](https://github.com/netease-youdao/LobsterAI/pull/2486)
- **[#2487] refactor(skills): merge skills and mcp views into unified skills-and-connectors view（已合并/关闭）** — 将 skills 与 MCP 两个视图合并为统一的 skills-and-connectors 视图，减少导航层级并统一交互入口。[链接](https://github.com/netease-youdao/LobsterAI/pull/2487)
- **[#2488] Refactor/cowork btw and management UI（已合并/关闭）** — cowork 相关与管理 UI 的重构，具体变更细节待进一步披露。[链接](https://github.com/netease-youdao/LobsterAI/pull/2488)
- **[#1232] fix(scheduledTask): 修复定时任务首次执行结果不推送到 UI 的问题（已关闭）** — 修复 `cronJobService.ts` 中 `pollOnce()` 检测条件 `previousRunAtMs > 0` 导致任务首次执行时 `previousRunAtMs` 为 0、推送被跳过的问题。该 PR 创建于 4 月 1 日，今天被关闭，积压修复得到清理。[链接](https://github.com/netease-youdao/LobsterAI/pull/1232)

整体来看，项目正在推进一轮集中的 UI/UX 重构：skills、MCP、cowork 三大模块的视觉与交互规范趋于统一，同时企业版与运营活动（签到）能力同步落地。UI 层的整合为后续功能迭代构建了更干净的基础。

## 4. 社区热点

今日 Issues/PR 评论数整体偏低，最受关注的有两条：

- **[#2489] [OPEN] 快更新v4pro！** — 用户直白地催促发布 v4pro 版本，虽仅有 1 条评论，但诉求十分强烈，是典型的“催更”声音。[链接](https://github.com/netease-youdao/LobsterAI/issues/2489)
- **[#1162] [OPEN] [stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试** — 该 Issue 创建于 3 月 31 日，今日仍有评论活跃。它对应 75 个测试的补充工作，反映了社区对核心模块零测试覆盖的持续关注。[链接](https://github.com/netease-youdao/LobsterAI/issues/1162)

共同信号：用户对版本迭代节奏有较高期望，同时对测试覆盖、工程质量也有持续诉求。

## 5. Bug 与稳定性

今日无新报告的严重 Bug。稳定性相关工作主要体现在已关闭的修复 PR 和待合并的修复 PR 中：

**已处理：**
- **[#1232]（已关闭）** 定时任务首次执行结果不推送到 UI 的修复，属功能完整性缺陷，已解决。[链接](https://github.com/netease-youdao/LobsterAI/pull/1232)

**待处理（均有对应 fix PR，按严重程度排序）：**

| 严重程度 | 问题描述 | 修复 PR | 状态 |
| --- | --- | --- | --- |
| 中 | OpenClaw `skills.entries` 的 key 使用目录名而非 frontmatter name，导致 UI 开关对 enable overrides 的切换静默失效 | [#2483](https://github.com/netease-youdao/LobsterAI/pull/2483) | OPEN，2026-08-13 提交，待 review |
| 中 | 定时任务点击“立即运行”后无任何界面反馈，状态需等最长 15 秒轮询才更新，易导致重复点击 | [#1163](https://github.com/netease-youdao/LobsterAI/pull/1163) | OPEN，stale，2026-03-31 创建 |
| 中低 | 创建自定义 Agent 时允许重名，导致列表歧义、用户需手动查找原条目 | [#1166](https://github.com/netease-youdao/LobsterAI/pull/1166) | OPEN，stale，2026-03-31 创建 |

## 6. 功能请求与路线图信号

- **企业版（#2484 已合入）**：企业版特性已经进入主干，说明商业化版本是当前明确的路线图方向之一。后续可能围绕权限、部署、管理端能力继续深化。[链接](https://github.com/netease-youdao/LobsterAI/pull/2484)
- **Evergreen 常驻签到活动（#2485 已合入）**：签到从一次性活动变为常驻能力，表明产品在强化用户留存与运营工具链。[链接](https://github.com/netease-youdao/LobsterAI/pull/2485)
- **Skills/MCP 统一视图（#2487 已合入）**：将 skills 与 MCP 合并为“skills-and-connectors”视图，是产品信息架构的一次收敛，预计后续版本将围绕 Connectors 生态继续扩展。[链接](https://github.com/netease-youdao/LobsterAI/pull/2487)
- **UI 风格统一（#2486 已合入）**：MCP 卡片/详情风格与 kits/skills 对齐，说明项目正在推动设计系统层面的统一规范。[链接](https://github.com/netease-youdao/LobsterAI/pull/2486)
- **v4pro（#2489 用户催更）**：用户直接要求更新 v4pro，但目前 Issue 中未附带具体功能列表。从社区诉求看，v4pro 的发布是下一阶段最受期待的事件。[链接](https://github.com/netease-youdao/LobsterAI/issues/2489)
- **核心模块测试补充（#1156/#1165 待合并）**：为 `commandSafety`、`coworkMemoryJudge`、`openclawMemoryFile`、`openclawLocalTimeContextPrompt` 补充 Vitest 测试的 PR 仍在等待评估。这类纯增量、低风险的改动很可能在后续窗口期被纳入。[PR #1156](https://github.com/netease-youdao/LobsterAI/pull/1156)｜[PR #1165](https://github.com/netease-youdao/LobsterAI/pull/1165)

## 7. 用户反馈摘要

今日可提炼的用户反馈主要集中在 Issue #2489 与 #1162：

- **对版本发布的急切诉求**：Issue #2489 标题“快更新v4pro！”直接反映了用户对 v4pro 等待已久的焦躁情绪。考虑到今日已有企业版、签到、UI 重构等多个 PR 合入但无 release，用户明显感知到开发进展与版本发布节奏之间的落差。[链接](https://github.com/netease-youdao/LobsterAI/issues/2489)
- **对测试覆盖的持续关注**：Issue #1162 自 3 月创建以来持续被关注，社区（或内部开发者）对 `openclawMemoryFile` 等核心模块长期以来零测试覆盖感到不安。该 Issue 对应的 PR #1165 已提交 4 个多月仍未合并，可能会消磨贡献者的积极性。[链接](https://github.com/netease-youdao/LobsterAI/issues/1162)

## 8. 待处理积压

以下为创建已久、至今仍开放的重要 Issue/PR，建议维护者优先关注：

- **[#1165] [OPEN] [stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试** — 创建于 2026-03-31，已 stale，对应 75 个测试的完整补充，等待合入。[链接](https://github.com/netease-youdao/LobsterAI/pull/1165)
- **[#1156] [OPEN] [stale] 为 commandSafety 和 coworkMemoryJudge 补充 Vitest 单元测试** — 创建于 2026-03-31，已 stale。commandSafety 是危险命令检测门卫，零测试覆盖风险较高。[链接](https://github.com/netease-youdao/LobsterAI/pull/1156)
- **[#1163] [OPEN] [stale] fix(定时任务): 补全“立即运行”交互反馈，引入乐观更新与 Gateway 状态同步** — 创建于 2026-03-31，已 stale，涉及明显的前端体验缺陷。[链接](https://github.com/netease-youdao/LobsterAI/pull/1163)
- **[#1166] [OPEN] [stale] fix(agent): prevent duplicate custom agent names** — 创建于 2026-03-31，已 stale，修复自定义 Agent 重名问题。[链接](https://github.com/netease-youdao/LobsterAI/pull/1166)
- **[#1162] [OPEN] [stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试** — 与 #1165 对应的 Issue，2026-03-31 创建，长期未关闭。[链接](https://github.com/netease-youdao/LobsterAI/issues/1162)
- **[#2483] [OPEN] fix(openclaw): key skill entries by frontmatter name** — 2026-08-13 新提交，修复 skill UI 开关静默失效问题，涉及 main 与 openclaw 核心逻辑，建议尽快安排 review。[链接](https://github.com/netease-youdao/LobsterAI/pull/2483)

---

**总体判断**：项目处于活跃迭代期，UI 层重构与企业版推进带来了显著的代码变动，项目健康度良好；但 stale PR 的长期积压和 v4pro 版本的空窗期是当前社区情绪的两个潜在风险点。建议在下一版本发布前集中清理一批测试补充与体验修复类 PR，既能提升工程质量，也能回应社区期待。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-14

## 今日速览

过去24小时 Moltis 项目保持中等活跃度：新增 1 个 Issue（#1193，flaky test），提交 4 个待合并 PR（#1191、#1192、#1194 为构建/脚本修复，#1190 为大型功能 PR），无新版本发布。核心趋势集中在**构建脚本兼容性修复**（macOS bash 3.2）、**依赖模块路径修正**（openclaw org 迁移）以及**连接器能力扩展**（CalDAV/Channel History）。所有 PR 均未合并，但方向清晰，项目整体处于“修复与能力建设并行”阶段。

## 版本发布

本期无新版本发布。

## 项目进展

今日无已合并/关闭 PR，但有 **4 个待合并 PR**，分别对应以下进展：

| PR | 内容 | 影响 |
|----|------|------|
| [#1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194) | 修复 `just local-validate-full` 在 macOS bash 3.2 下因空数组展开导致的 `unbound variable` 崩溃 | 提升本地开发体验，解决 macOS 用户跑验证脚本的阻塞问题 |
| [#1190 Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190) | 新增 provider-neutral 连接器持久化、原子快照、调度、投影、本地全文搜索；增加只读 CalDAV 数据集及 Slack/Discord/Matrix/Teams 消息历史数据集 | 大幅扩展 Moltis 的数据接入能力，是本期最大的功能增量 |
| [#1192 fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192) | 修正 wacrawl skill 的 Go install 路径，从 `steipete/wacrawl` 指向 `openclaw/wacrawl` | 修复 skill 安装失败问题 |
| [#1191 fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191) | 修正 sandbox Dockerfile 中 gogcli 的安装路径，同步 openclaw org 迁移 | 修复 `moltis sandbox build` 在预构建镜像上的失败 |

如果 #1191、#1192、#1194 合并，将直接解决三个影响 macOS 用户和 sandbox 构建的实际故障；#1190 合并则标志着连接器体系从“单一读取”走向“持久化 + 可搜索 + 多平台历史”阶段。

## 社区热点

- **[PR #1190 Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)** — 本期最重量级 PR，覆盖 CalDAV 日历数据、四个主流聊天平台的历史消息连接，并引入连接器持久化和全文搜索。虽无评论数据，但从 PR 规模和描述看，是社区关注的核心议题：**用户希望 Moltis 能跨平台存取个人数据，而非仅仅作为实时会话代理**。
- **[PR #1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194)** — macOS 用户在本地验证脚本上的挫败感是明显痛点，该修复若合并将消除一个高频摩擦点。
- **[Issue #1193 Flaky test: push fanout timeout assertion races under full-suite load](https://github.com/moltis-org/moltis/issues/1193)** — 测试稳定性问题，虽然暂时不影响用户，但可能影响 CI 效率与维护者合并 PR 的信心。

## Bug 与稳定性

按严重程度排列：

1. **中高严重度 — [Issue #1193 Flaky test: push fanout timeout assertion races under full-suite load](https://github.com/moltis-org/moltis/issues/1193)**  
   推送扇出超时断言在全量测试负载下不稳定，10 核 macOS 上 3 次全量运行失败 2 次。表明存在真实的并发时序竞争，尚未有对应 fix PR。**可能拖慢 CI 并掩盖真实回归。**

2. **中严重度 — [PR #1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194)**  
   macOS 上 `just local-validate-full` 直接崩溃（`args[@]: unbound variable`），已提交修复 PR，待合并。

3. **中严重度 — [PR #1191 fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191)**  
   `moltis sandbox build` 在所有预构建镜像上失败（Go module 路径变更），已提交修复 PR，待合并。

4. **中严重度 — [PR #1192 fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192)**  
   wacrawl skill 安装路径失效，导致 skill 无法安装，已提交修复 PR，待合并。

## 功能请求与路线图信号

- **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)** 包含了明确的路由图信号：**连接器持久化 + 调度 + 快照 + 局部全文搜索**，说明项目正在从“对话式 AI 助手”向“**个人数据中枢**”演进。CalDAV 只读连接器和 Slack/Discord/Matrix/Teams 历史消息连接器若合并，意味着 Moltis 将能够索引和检索用户跨平台的历史数据，而不仅限于实时会话。
- 该 PR 还提到“不复制渠道凭证”，表明对**安全与隐私设计**有明确考虑，这可能是被纳入下一版本的关键 feature。

## 用户反馈摘要

- **macOS 用户痛点**：`just local-validate-full` 在 macOS bash 3.2 上无法运行（[PR #1194](https://github.com/moltis-org/moltis/pull/1194)），反映出项目脚本对原生 macOS 环境的兼容性仍有改进空间。
- **sandbox 构建故障**：用户反馈 `moltis sandbox build` 在所有预构建镜像上失败（[PR #1191](https://github.com/moltis-org/moltis/pull/1191)），由于上游仓库 org 迁移导致，是典型的供应链路径变更引发的问题。
- **skill 安装失败**：wacrawl skill 安装报错（[PR #1192](https://github.com/moltis-org/moltis/pull/1192)），同样是 org 迁移导致，说明外部依赖变更对最终用户功能有直接冲击。

## 待处理积压

- **[PR #1190 Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)** — 创建于 8 月 11 日，已开放 3 天，仍无评论数据，处于等待审查/合并状态。作为大型功能 PR，建议维护者尽快安排 review，避免分支过期或大规模冲突。
- **[Issue #1193 Flaky test](https://github.com/moltis-org/moltis/issues/1193)** — 尚未有 PR 关联，建议优先定位与修复，以免影响 CI 稳定性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 项目动态日报 — 2026-08-14

> 数据来源：github.com/agentscope-ai/QwenPaw | 统计窗口：2026-08-13 ~ 2026-08-14

---

## 1. 今日速览

项目近期整体活跃度处于高位：过去 24 小时内共产生 43 条 Issue 动态（新开/活跃 26 条、关闭 17 条）和 50 条 PR 动态（待合并 31 条、合并/关闭 19 条），同时发布了 v2.1.0 正式版和 v2.1.0-beta.5 两个版本。正式版引入了 QwenPaw OS Shell（窗口化应用管理），是今日最大的功能里程碑；合并队列中内存机制与聊天历史的修复占据较大比重。安全类议题（端口暴露、插件静默执行）是当日社区讨论的突出焦点，同时出现了多条关于后台守护模式与服务器端部署的呼声，呈现从“单机助手”向“可托管服务”演进的明确信号。

---

## 2. 版本发布

### v2.1.0（正式版）

- **核心亮点——QwenPaw OS Shell**：新增可在可移动、可调整大小的窗口中打开应用的能力，并配套提供启动器（launcher）、任务栏（taskbar）、通知系统以及已保存布局（saved layouts）功能。相关实现见 [PR #6645](https://github.com/agentscope-ai/QwenPaw/pull/6645)。
- 安装的应用与市场应用现已在 App Center 中共用同一套目录体系。
- 变更详情见 [v2.1.0 Release 页面](https://github.com/agentscope-ai/QwenPaw/releases)。

### v2.1.0-beta.5（预发布）

- **修复**：聊天模块现在可正确处理 dict 类型的模型响应（[PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) 修复 [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813)）。
- **修复**：简化长期记忆（long-term memory）的引导逻辑，见 [PR #6942](https://github.com/agentscope-ai/QwenPaw/pull/6942)。
- **文档**：改进了 Files workspace 相关文档。
- 完整说明见 [v2.1.0-beta.5 Release 页面](https://github.com/agentscope-ai/QwenPaw/releases)。

**迁移注意事项**：两个版本均未标注破坏性变更。使用 v2.1.0 正式版的用户，建议查阅 OS Shell 新特性的配置项（如布局保存与任务栏行为），以完成从旧版工作区的平滑过渡。

---

## 3. 项目进展

今日合并/关闭的 PR 整体提升了服务端的任务执行约束、前端历史记录加载体验与依赖管理效率：

- **Mission 模式服务端强制 `max_iterations`**（[PR #6652](https://github.com/agentscope-ai/QwenPaw/pull/6652)，已合并）：修复了 [#6505](https://github.com/agentscope-ai/QwenPaw/issues/6505) 中控制器可无限分发子代理直到账户余额耗尽的问题（曾产生 54+ 子会话，远超设置的 20 次上限）。这一修复对生产环境成本控制具有实质意义。
- **聊天历史分页与 GZip 压缩**（[PR #6636](https://github.com/agentscope-ai/QwenPaw/pull/6636)，已合并）：解决了长聊天（1MB+）在慢网络下 30 秒超时的问题，优化了 `/api/chats/{chat_id}` 的响应策略。
- **内置 Channel 可选依赖按需安装**（[PR #6387](https://github.com/agentscope-ai/QwenPaw/pull/6387)，已关闭）：将 Channel 专属 SDK 移出默认依赖集，Console 中未安装的 Channel 保持可见并提示按需安装，减轻了安装体积与依赖冲突风险。
- **Auto-Dream 集成容错优化**（[PR #6884](https://github.com/agentscope-ai/QwenPaw/pull/6884)，已关闭）：单个空 schema 或结构化输出异常不再导致整个 Auto-Dream 任务失败，提升了第三方集成场景的可用性。
- **v2.1.0 发布说明更新**（[PR #6989](https://github.com/agentscope-ai/QwenPaw/pull/6989)，已关闭）：配合正式版发布完成 Release Notes 更新。

整体来看，项目在“任务执行可控性”、“长会话数据访问效率”和“可插拔依赖”三个方向上有明确进展，配合 v2.1.0 正式版发布，标志着功能迭代进入相对稳定的阶段。

---

## 4. 社区热点

以下为今日讨论热度最高的内容，反映了用户当前最集中的诉求：

- **[Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)：多步骤任务执行中无提示自行停止（6 条评论）**
  - 用户反馈：模型在输出“Now 2.1, 3.1, 3.2. Let me do all three.”这类规划性信息后便停止执行，必须用户手动输入“继续”才会恢复，且无任何可视化提示。这是高频日常工作流中的“假死”体验，用户关注度极高，且发生在 v2.1.0 beta 版本上，值得优先排查。
- **[Issue #6973](https://github.com/agentscope-ai/QwenPaw/issues/6973)：qwenpaw creator 能否支持阿里云百炼的 token plan（5 条评论）**
  - 用户希望接入阿里云百炼的 token 计划（订阅模式），反映出国内用户对国内云厂商计费/鉴权体系的原生集成的明确需求。
- **[Issue #6811](https://github.com/agentscope-ai/QwenPaw/issues/6811)：OpenAI Responses 续写摘要忽略 `disable_thinking`，且 60 秒取消被误报为格式错误（5 条评论，已关闭）**
  - 技术细节讨论集中：上下文驱逐（Scroll eviction）触发的续写摘要调用阻塞了主会话，且错误归类不当。说明长会话压缩路径的稳定性仍需加固。
- **[Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)：prompts.py 对 agent “说谎”——dream 实际写入 digest/ 而非 MEMORY.md（5 条评论，已关闭）**
  - 用户深挖了 ReMe dream 管道的实现，指出提示词中描述的自动同步行为从未实现。该议题获得了社区对文档与实现一致性的认可，已关闭表明官方已确认或回应。

---

## 5. Bug 与稳定性

按严重程度排列（🔴 严重 / 🟠 中等 / 🟡 轻微）：

- 🔴 **安全：端口暴露与 API 无鉴权（[Issue #6992](https://github.com/agentscope-ai/QwenPaw/issues/6992)、[Issue #6993](https://github.com/agentscope-ai/QwenPaw/issues/6993)）**
  用户报告 QwenPaw 以 `0.0.0.0` 暴露 8088 端口，且插件安装 API 无鉴权，具备任意命令执行风险，并附有详细 incident-report PDF。当前两项均被标记为 `[invalid]` 并已关闭，但关联的 **[Issue #6916](https://github.com/agentscope-ai/QwenPaw/issues/6916)**（插件可静默创建 cron 任务并注入消息）仍处于 OPEN，安全模型缺口值得维护者进一步审视。
- 🔴 **死循环阻塞会话数小时（[Issue #6768](https://github.com/agentscope-ai/QwenPaw/issues/6768)，已关闭）**
  多步骤任务中 agent 进入完全无响应状态数小时。已关闭，但建议确认修复方案是否已在正式版中生效。
- 🟠 **多步骤任务无提示中断（[Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)，OPEN）**
  规划下一步后不实际执行，需用户手动催促。截至今日暂无已关联的 fix PR。
- 🟠 **Scroll 压缩后聊天记录不可见（[Issue #6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)，OPEN）**
  `/compact` 后重新进入会话，压缩前的原始消息不再显示，仅剩内部 eviction index。用户强调“上下文压缩应只影响模型输入，不应破坏用户可见的完整 transcript”。
- 🟠 **概率性启动崩溃（[Issue #6955](https://github.com/agentscope-ai/QwenPaw/issues/6955)，OPEN）**
  Windows + pip 安装 v2.0.1，启动阶段报 asyncio/Windows events 相关错误。暂无 fix PR。
- 🟠 **Windows Desktop TUI 启动失败（[Issue #7007](https://github.com/agentscope-ai/QwenPaw/issues/7007)，OPEN）**
  `transport: Connection closed`，原因与打包版 qwenpaw.exe 拒绝 `-m qwenpaw acp` 参数有关。
- 🟠 **Anthropic 模型端误审核图片导致会话中断（[Issue #7008](https://github.com/agentscope-ai/QwenPaw/issues/7008)，OPEN）**
  长会话中图片被模型端误判为 sensitive，报 `1026` 错误，用户已人工复核确认无违规内容。属上游模型行为，但 QwenPaw 可考虑增加重试/降级策略。
- 🟡 **新聊天误开旧会话（[Issue #6047](https://github.com/agentscope-ai/QwenPaw/issues/6047)，已关闭）**
  升级 2.0.0 后新 console chat 写入旧 session。已关闭，可在现有版本中回归验证。
- 🟡 **Shabox 与 UV 缓存冲突（[Issue #7005](https://github.com/agentscope-ai/QwenPaw/issues/7005)，OPEN）**
  启用 Shabox 后续 `~/.cache/uv` 写入失败，用户通过手动添加 `Write(~/.cache/uv/**)` 规避。
- 🟡 **续写摘要忽略 `disable_thinking`（[Issue #6811](https://github.com/agentscope-ai/QwenPaw/issues/6811)，已关闭）** — 相关修复可在后续版本中跟踪验证。

---

## 6. 功能请求与路线图信号

今日多条外部请求集中指向“服务器化部署”与“云厂商生态集成”两大主题：

- **后台/守护模式（[Issue #7010](https://github.com/agentscope-ai/QwenPaw/issues/7010)，OPEN，3 条评论）**：用户明确表示 `qwenpaw app` 只能前台运行，SSH / 脚本启动时命令挂住。这是将 QwenPaw 作为服务运行的基础能力，与“服务器端部署版本代理客户端”的请求（[Issue #7002](https://github.com/agentscope-ai/QwenPaw/issues/7002)）形成互补。若 QwenPaw 布局 server-side 场景，这两项需求优先级较高。
- **阿里云百炼 token plan 支持（[Issue #6973](https://github.com/agentscope-ai/QwenPaw/issues/6973)，OPEN）**：国内用户对阿里云百炼订阅制的接入诉求，判断取决于与阿里云的合作或兼容层适配。
- **Shell 子进程注入当前 Channel 标识（[Issue #6995](https://github.com/agentscope-ai/QwenPaw/issues/6995)，OPEN）**：建议新增 `QWENPAW_CHANNEL` 环境变量，便于外部脚本感知渠道来源。实现成本低，且对渠道扩展生态价值高，较有可能进入后续版本。
- **会话级多项目目录绑定（[PR #6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)，OPEN）**：聊天可绑定有序项目目录列表，首个目录为 primary。该 PR 已在今日提交，是工作区管理方向的实质性推进。
- **嵌入/API 支持（[Issue #6970](https://github.com/agentscope-ai/QwenPaw/issues/6970)，OPEN）**：用户提出聊天界面可无侧栏/头部单独打开、URL 携带 apikey、session 列表支持多条件筛选。与已有的 console 前端 API 设计相关，可以作为 embed 场景的路线图参考。

另有来自社区的记忆优化方案 [Issue #7003（ViBo）](https://github.com/agentscope-ai/QwenPaw/issues/7003) 宣称可减少 97.5% 的 memory tokens，属于可借鉴的设计思路，是否采纳取决于项目自身的 memory 路线规划。

---

## 7. 用户反馈摘要

- **“无提示中断”是第一痛点**（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）：用户详细描述了模型输出“规划宣言”后即停止的行为，并强调“无任何视觉可见提示”。这直接影响用户对 agent “自主完成任务”的核心信任感，建议修复时补充“已暂停、等待用户确认”的显式 UI 状态。
- **杀软误杀导致进程被强制关停**（[#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)，OPEN）：用户对比称“同样任务和模型，WorkBuddy 不会被杀软打死”。QwenPaw 的行为模式（文件读写、命令执行）更容易触发杀软启发式规则，这不仅是兼容性问题，也可能影响用户对软件安全性的判断。
- **智能/任务模式的权限边界令人困惑**（[#6945](https://github.com/agentscope-ai/QwenPaw/issues/6945)，OPEN）：用户反馈“智能模式写入沙盘之外会失败”，并怀疑“智能是不是只能审批”。表明产品内“自由模式 vs 沙箱 vs 审批”的心智模型过于复杂，需要更清晰的交互说明。
- **“历史记录里怎么会有这么多对话”**（[#6457](https://github.com/agentscope-ai/QwenPaw/issues/6457)，已关闭）：用户对任务模式生成大量历史对话感到困惑，建议后续版本在 UI 中明确标识子任务/会话分组的来源。
- **UI 细节影响专注力**（[#6585](https://github.com/agentscope-ai/QwenPaw/issues/6585)，已关闭）：聊天框下方“已接收 N 字符”动态闪烁让用户“眼睛疼”，希望增加开关。虽然是轻量改进，但反映出用户对界面克制性的需求。

---

## 8. 待处理积压

以下为当前状态 OPEN、停留时间较长或维护者需重点关注的内容：

- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（feat: unify provider discovery, model metadata, routing, and agent controls）** — 7 月 21 日创建，已积压 3 周以上。该 PR 涉及 provider 发现、模型元数据、路由与控制的大一统设计，范围大、影响面广，建议维护者明确推进计划或给出阶段性评审结论。
- **[PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715)（feat(onebot): localize inbound media before agent processing）** — 8 月 5 日创建，状态为 Under Review。OneBot 渠道入站媒体的本地化预处理对机器人场景体验提升明显，已进入评审流程但停留约 1 周，可适当推进。
- **[Issue #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)（QwenPaw 频繁被杀软拦截/暴力结束）** — 8 月 9 日创建，4 条评论，无官方回复迹象。该问题同时影响用户信任与终端覆盖，建议至少给出官方说明或规避指引。
- **[PR #6823](https://github.com/agentscope-ai/QwenPaw/pull/6823)（feat(providers): apply documented capability templates to custom providers）** — 8 月 8 日创建，首次贡献者提交，利用内置模板为自定义 OpenAI 兼容 provider 注入多模态能力。代码范围可控，可作为鼓励社区贡献的切入点尽快处理。

---

**总结**：v2.1.0 正式版的发布为项目赢得了功能层面的关注度，但多步骤任务中断、长会话压缩后 transcript 不可见等稳定性问题仍是影响用户体验的核心短板；安全模型的开放性（插件静默动作、端口暴露）是潜在风险点，社区已出现相关讨论；服务器化部署与云厂商生态集成是当前呼声最高的方向，可作为下一阶段路线图的重点参考。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-14

> 数据窗口：2026-08-13 ~ 2026-08-14 | 数据源：GitHub (zeroclaw-labs/zeroclaw)

## 1. 今日速览

- 过去 24 小时 **50 条 Issue 更新**（新开/活跃 37，关闭 13）、**50 条 PR 更新**（待合并 40，合并/关闭 10），无新版本发布，整体活跃度处于高位。
- 项目正处于 **v0.9.0 安全与架构加固期**：今日合并的 PR 集中在网关资产路径安全、会话队列竞态修复、容器构建修复；多条高风险 RFC 在维护者复核队列中（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)、[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）。
- 社区讨论热点围绕 **“大特性如何分阶段落地”与“工具安全策略精细化”**：Goal mode RFC 作者主动缩小首个交付范围，shell 命令策略 RFC 完成第三轮修订并进入 Core 投票。
- 安全 bug 修复节奏快：今日关闭了未认证 `/api/pair` 锁定缺陷（[#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)）、WeChat 模块不进 CI（[#9951](https://github.com/zeroclaw-labs/zeroclaw/issues/9951)）等问题，但 verifiable-intent 凭证链验证缺陷（[#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)）仍在推进中。
- 项目健康度总体良好：小尺寸 PR 从创建到合入多数在 1-2 天内完成；积压压力集中在 XL 尺寸 PR、`needs-maintainer-review` 的 RFC 和少数长期未推进的功能请求。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 共 10 条，以下为重要变更，按领域分组：

**安全加固**
- **fix(gateway): contain filesystem dashboard assets**（[PR #9969](https://github.com/zeroclaw-labs/zeroclaw/pull/9969)，已合并）— 对文件系统型 dashboard 资源路径做 canonicalize 并校验必须在分发根目录内，拒绝符号链接逃逸。这是对网关资产路径穿越风险的直接修复，优先级 p1。
- **fix(infra): preserve session queue serialization during eviction**（[PR #9674](https://github.com/zeroclaw-labs/zeroclaw/pull/9674)，已合并）— 会话请求在 slot map 仍持锁时即完成注册，并用 RAII guard 跟踪 pending 状态，修复空闲淘汰与请求注册之间的竞态。

**构建 / CI**
- **fix(container): match nested fixture manifests by glob**（[PR #9966](https://github.com/zeroclaw-labs/zeroclaw/pull/9966)，已合并）— Dockerfile 依赖预取阶段原先用 `crates/*/Cargo.toml` 单层 glob，无法匹配 `crates/<name>/<sub>/Cargo.toml` 这类嵌套成员；改为递归 glob 修复。
- **ci(codeql): drop rust/hard-coded-cryptographic-value**（[PR #9932](https://github.com/zeroclaw-labs/zeroclaw/pull/9932)，已合并）— 该 CodeQL 查询在 `cfg(test)` 下产生 27 个全部为误报的 critical 告警，通过 `query-filters` 排除，减少 CI 噪音。

**配置 / CLI 修复**
- **fix(config): allow config set on existing hyphenated cron aliases**（[PR #9705](https://github.com/zeroclaw-labs/zeroclaw/pull/9705)，已合并）— `config set cron.<alias>.name` 此前拒绝任何含连字符的已加载 cron 别名（如 `morning-brief`），与 TOML 加载器和调度器行为不一致，现已修复。
- **fix(tts): clean up Edge TTS temp output on every error path**（[PR #9709](https://github.com/zeroclaw-labs/zeroclaw/pull/9709)，已合并）— 补齐子进程成功退出但输出读取失败等错误路径上的临时文件删除。

**文档**
- **docs(architecture): document provider routing lifecycle**（[PR #9639](https://github.com/zeroclaw-labs/zeroclaw/pull/9639)，已合并）— 新增 provider 路由生命周期文档，覆盖 profile 构建、hint 路由、重试/回退顺序、cooldown、流式恢复、no-replay 边界等内容，来源可追溯。

另有 [PR #9984](https://github.com/zeroclaw-labs/zeroclaw/pull/9984)（validation-only）仅用于在真实 Blacksmith runner 上验证 rust-cache 路径，已按计划关闭、不会合入。

整体来看，这些合入让**网关资产边界更安全、会话队列更稳、容器构建更可靠、配置行为更一致**，同时补上 provider 路由的文档空白。

## 4. 社区热点

讨论最活跃的 Issues（评论数最多）：

- **[Issue #8303：RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)**（20 评论，risk:high，needs-maintainer-review）— 作者 vrurg 明确将首个交付范围收缩为“有界前台任务”，把重启交接、全渠道接纳、Web 与异步子任务拆出。社区核心诉求是：**大型设计应分阶段落地，保证可审查、可合并**。1 个 👍 表明讨论以设计收敛为主而非投票热度。
- **[Issue #7155：RFC: per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)**（18 评论，priority:p1，needs-maintainer-review）— 已发布 Revision 3，按 Audacity88 的 scope review 将规范范围收窄为 shell 策略契约（allow/ask/deny）。这是 v0.9.0 工具权限体系的前哨设计，讨论密度与迭代频率说明用户对 shell 命令安全授权有强需求。
- **[Issue #8692：Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（13 评论，status:accepted）— 维护者决策队列 tracker。高评论数说明 **RFC/设计积压已成为协作瓶颈**，社区需要一个显式的问题级决策通道。
- **[Issue #9328：[Bug] verifiable-intent evaluates constraints without verifying the credential chain](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)**（12 评论，risk:high，in-progress）— `vi_verify` 的 `evaluate_constraints` 只对调用者传入的 L2 约束与 fulfillment 做检查，未先做密码学凭证链验证，与 VI 参考实现的 `check_constraints` 语义不一致。安全影响面大，讨论热度高，当前状态 in-progress。
- **[Issue #9487：RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**（11 评论，risk:high，needs-maintainer-review）— 与会话持久化所有权 tracker [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) 联动，Revsion 2 已确立 #9487/#9488/#9600 的所有权边界。社区关注的是**多工作流同时改同一契约时的协调机制**。

## 5. Bug 与稳定性

今日 Bug 相关动态按严重程度排列：

**高严重度**
- **[Issue #9328：verifiable-intent 未验证凭证链](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)**（OPEN，risk:high，in-progress/accepted）— 约束评估绕过链上验证，属于安全语义缺陷。暂无对应 fix PR 出现在今日列表中，需持续关注。
- **[Issue #9929：headless SOP step turn 有 session path 但从未持久化](https://github.com/zeroclaw-labs/zeroclaw/issues/9929)**（OPEN，risk:high，blocked/accepted，p1）— `drive_headless_run` 为每个 step turn 构造 `session_path = "sop-{run_id}-step-{n}"` 但从不写入 session store。已被会话持久化 tracker [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) 接管，暂无独立 fix PR。
- **[Issue #9389：未认证 POST /api/pair 的锁定基于攻击者可控 header](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)**（已关闭，p1）— 安全审计发现配对接口锁定制裁键来自请求头，存在绕过风险。今日关闭，未见同一数据窗口内的对应公开 PR，建议维护者在关闭说明中补充修复位置。
- **[Issue #9951：WeChat 模块及其 51 个单元测试从不进 CI](https://github.com/zeroclaw-labs/zeroclaw/issues/9951)**（已关闭，p2）— `channel-wechat` feature 不在任何 CI feature 组合中，代码与测试长期未编译。测试盲区风险，已关闭。

**中严重度**
- **[Issue #9366：WhatsApp Web 接受 approval_timeout_secs 但从不读取](https://github.com/zeroclaw-labs/zeroclaw/issues/9366)**（已关闭，p2）— 配置验证通过但运行时不生效，属于典型“静默失效”配置缺陷。已关闭。

**低严重度**
- **[Issue #9710：desktop 截图临时文件在部分退出路径未清理](https://github.com/zeroclaw-labs/zeroclaw/issues/9710)**（已关闭，p3）— 两个 early return 绕过删除，造成临时文件泄漏。已关闭。
- **[Issue #9706：Edge TTS 临时输出在错误路径未清理](https://github.com/zeroclaw-labs/zeroclaw/issues/9706)**（已关闭，p3）— 已有对应修复 **PR #9709 今日合并**，问题解决确认。

## 6. 功能请求与路线图信号

**已被 accepted / 进入实现通道的新功能**
- **[Issue #9895：Provider 分组、分页的 Telegram /model 选择器](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)**（status:accepted，risk:high）— 移动端模型选择体验改进，已接受但暂无 PR。
- **[Issue #9887：超大图像降级而非丢弃，支持 0 禁用多模态限制](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)**（status:accepted+blocked）— 当前 >5MiB 图片直接丢弃并告知模型“无法加载”，对畸形/恶意载荷合理但对普通用户不友好。已接受。
- **[Issue #9945：browser 工具只暴露 16/100+ 命令](https://github.com/zeroclaw-labs/zeroclaw/issues/9945)**（status:accepted+blocked）— iframe、JS 对话框、标签页和表单控件不可达，工具面覆盖严重不足。已接受，被阻塞。

**已进入 PR 阶段的新功能**
- **[PR #9109：原生 Hailo-Ollama 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)**（OPEN，XL）— 新增专用 `HailoOllamaModelProvider`。
- **[PR #9420：支持 Anthropic 存储的 OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)**（OPEN，XL）— 增加 `auth_mode = "oauth"`，按别名解析同名的 Anthropic stored profile。
- **[PR #9713：history-trim 事件暴露 token 计量](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)**（OPEN，XL）— 解决整轮裁剪难以判断 token 预算消耗的问题（#9619）。
- **[PR #9986：agent 导出为可移植 bundle](https://github.com/zeroclaw-labs/zeroclaw/pull/9986)**（OPEN）— `zeroclaw agents export <alias> --out <dir>`，输出 manifest + 配置闭包 + workspace 树，便于跨安装迁移。
- **[PR #9013：TodoWrite 显示配置从 daemon 迁入 zerocode](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)**（OPEN，breaking change，XL）— 属于破坏性变更，仍在讨论。

**路线图判断**
v0.9.0 tracker（[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)）仍以 **auth/security/gateway/工具策略** 为主线，安全类 RFC（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#9880](https://github.com/zeroclaw-labs/zeroclaw/issues/9880)、[#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)）优先级最高；上述功能类 PR 更可能落入 0.9.x 或 0.10。

## 7. 用户反馈摘要

- **成本投诉（具体数据）**：[Issue #9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631) 指出 ZeroClaw 经 OpenRouter 的对话“单次会话发起数十次 LLM 请求”，且 system prompt 和 tool schema 每一轮都在重放。用户明确诉求是发送稳定 `session_id` 以命中 prompt 缓存，属于可量化成本优化。
- **移动端可用性**：[Issue #9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895) 用户反馈手机上的文本式 `/model` 在路由多时“仍然笨重”，期望 Telegram inline-keyboard 分组分页选择器。
- **安全策略与真实场景冲突**：[Issue #9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) 泄漏检测器把公开区块链地址当作高熵机密删除，导致**支付请求 URL 无法交付**。用户认可这是误报而非 bug，但说明启发式规则需要“发布安全例外”机制。
- **配置迁移摩擦**：[Issue #9707](https://github.com/zeroclaw-labs/zeroclaw/issues/9707) 裸 `vision_model_provider = "<family>"` 无法解析到迁移后的 V3 别名，运行时只认 `<family>.<alias>`；[Issue #9705](https://github.com/zeroclaw-labs/zeroclaw/issues/9705) 显示 `config set` 会拒绝连字符 cron 别名。两处都指向**同一个问题：新配置模型与旧写法之间缺少兼容层或清晰报错**。
- **设计讨论的满意度信号**：[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) 的 Revision 3 由维护者 Audacity88 做范围收窄，[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) 作者主动拆出非核心范围。社区以 revision history 透明推进设计的做法获得讨论者持续参与（无关闭压力），是健康的协作信号。

## 8. 待处理积压

**长期未推进（按创建时间排序，提醒维护者关注）**
- **[Issue #5907：Opt-in LSP 支持 for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)** — 创建于 2026-04-19，已近 4 个月，needs-author-action。LSP 可降低本地模型写代码的幻觉率，属于提升 coding workflow 价值的功能，建议明确接受/拒绝。
- **[Issue #6850：RFC: 将内存生命周期策略与存储后端解耦](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** — 创建于 2026-05-22，needs-author-action。当前 `Memory` trait 同时负责存储与生命周期决策，架构上需要拆分，已有多轮讨论但停滞在等作者更新。
- **[PR #8713：file_download SSRF gate 增加 allowed_private_hosts opt-in](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)** — 创建于 2026-07-04，XL 尺寸，needs-author-action。这是**安全相关 PR**（SSRF 防护），挂起时间已超一个月且为高优先级标签，建议优先安排 review 或明确阻塞原因。
- **[PR #9013：TodoWrite 显示配置从 daemon 迁入 zerocode](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)** — 创建于 2026-07-12，XL 尺寸，breaking change。破坏性变更需要维护者明确决策窗口。
- **[PR #9420：Anthropic OAuth profile 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)** — 创建于 2026-07-26，XL 尺寸，needs-author-action。覆盖多个组件，等待作者更新。

**等待维护者复核（needs-maintainer-review）的高风险 RFC**
- [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)（Goal mode v1，20 评论）、[Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（shell 命令策略，18 评论）、[Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（runtime-owned 会话，11 评论）、[Issue #9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)（区块链标识符发布例外，5 评论）、[Issue #9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)（Agent Plugins 1.0 加载，blocked）、[Issue #9880](https://github.com/zeroclaw-labs/zeroclaw/issues/9880)（peer policy 类型化，blocked）、[Issue #9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)（SOP 权限契约，blocked）。

这些 RFC 均在 5-20 评论区间，设计已基本成型，**缺的是维护者的合并/拒绝/拆分决策**。维护者决策队列 tracker（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）正在显式化这一瓶颈，建议结合 v0.9.0 时间表给每个 RFC 标注目标决策日期。

---

**总结**：ZeroClaw 当前处于高活跃、重安全、大设计密集讨论的阶段。合并流畅通（小型 PR 当日或次日合入），但 XL 尺寸 PR 和 needs-maintainer-review 的 RFC 积压是显性瓶颈。v0.9.0 的安全/网关路线清晰，社区参与质量高，项目整体健康。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*