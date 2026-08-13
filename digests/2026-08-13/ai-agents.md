# OpenClaw 生态日报 2026-08-13

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-13 02:02 UTC

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

# OpenClaw 项目日报 — 2026-08-13

## 1. 今日速览

过去24小时OpenClaw仓库继续保持极高活跃度：共发生500条Issue更新（新开/活跃406，关闭94）与500条PR更新（待合并357，合并/关闭143），无新版本发布。当前项目健康度的核心矛盾在于**subagent完成投递链路反复出现静默丢失**，多个P1级旧Issue（#44925、#67777、#92433）仍处于未关闭状态，#121058以91条评论成为社区最关注话题，显示用户对该问题的耐心正在被消耗。与此同时，一批新的修复PR（如#122878 Discord ingress阻塞、#122650内部推理标签泄漏、#122624 Slack重复连接）集中提交，表明维护团队正在多线程推进稳定性修复。整体看，项目处于“高迭代、高讨论、核心稳定性待攻坚”的状态。

---

## 2. 版本发布

今日无新版本发布（Releases 为空）。相关变更均通过PR合并进入主分支，等待下一个版本聚合。

---

## 3. 项目进展

今日合并/关闭的PR数量为143条，以下为重点变更：

- **#122888 [已关闭] fix(e2e): restore gateway network qualification** — 修复E2E测试中网关网络资格认证在prepared suspension后失败的问题，合并后恢复了CI对网关网络能力的验证覆盖，保障后续合并的PR不会破坏网络层功能。
  链接：https://github.com/openclaw/openclaw/pull/122888

- **#122624 [已关闭] fix(slack): prevent duplicate Socket Mode connections after reconnect errors** — 针对Slack Socket Mode在重连错误后累积多个活跃连接、导致消息被路由到错误连接而“静默丢失”的问题，增加了连接唯一性保障。该PR直接呼应Issue #102439。
  链接：https://github.com/openclaw/openclaw/pull/122624

- **#79405 [已关闭] fix: harden subagent completion fallback delivery** — 历经3个多月后终于合并。该PR强化了subagent完成投递的降级路径：在task-aware give-up路径中保留taskId、分离child run id与task id、避免将瞬时主投递失败持久化为终态。这是对社区反复报告（#44925、#67777、#92433）的投递丢失问题的核心加固。
  链接：https://github.com/openclaw/openclaw/pull/79405

- **今日新提交的高质量修复PR**（尚未合并，但值得关注）：
  - **#122878 fix(discord): unblock ingress after retry exhaustion** — 修复Discord pre-admission失败后debouncer未更新durable claim导致ingress永久阻塞的问题，为P1级修复。
    https://github.com/openclaw/openclaw/pull/122878
  - **#122650 fix(reasoning-tags): strip `<internal>` reflection blocks from visible replies** — 防止模型内部推理内容通过Telegram等可见消息泄漏，涉及安全边界。
    https://github.com/openclaw/openclaw/pull/122650
  - **#122679 fix(skills): concurrent sandboxed runs omit skills from available_skills** — 修复沙箱并发运行时available_skills目录被重建清空的问题。
    https://github.com/openclaw/openclaw/pull/122679

---

## 4. 社区热点

- **#121058 Silent reply failures still recurring after #116277 closed（91条评论）** — 今日最热Issue。用户sloptop-the-terrible投诉“静默回复失败”在#116277关闭后仍然持续发生，监控cron不断记录新故障（包括今天）。该Issue没有获得任何👍，却聚集了91条评论，说明大量用户遭遇了相同问题但不愿表示赞同，侧面反映社区对该问题长期未根治的沮丧。
  链接：https://github.com/openclaw/openclaw/issues/121058

- **#7707 Memory Trust Tagging by Source（45条评论）** — 一个2月份提出的功能请求至今仍在讨论。用户LumenLantern提出为记忆条目按来源（用户命令、网页抓取、第三方技能）打信任标签，防止记忆投毒攻击。该项目在今日保持更新，显示社区对AI安全、记忆污染议题的持续关注。
  链接：https://github.com/openclaw/openclaw/issues/7707

- **#44925 Subagent completion silently lost（26条评论, 2👍）** — P1级Bug，已在3月提交但至今未关闭。用户IIIyban描述了3种静默丢失模式（完成通知失败、超时无重启、结果不通知）。此问题与#121058形成呼应，是社区最痛的稳定性痛点之一。
  链接：https://github.com/openclaw/openclaw/issues/44925

---

## 5. Bug 与稳定性

今日报告的Bug数量庞大，按严重程度排列如下：

| 严重度 | Issue | 问题描述 | 修复状态 |
|--------|-------|----------|----------|
| P1 | #121058 | 静默回复失败在修复后仍复发，无队列回放 | 无fix PR，监控持续报警 |
| P1 | #44925 | Subagent完成静默丢失，无重试/通知/自动重启 | 已有#79405（今日合并），待验证 |
| P1 | #67777 | Subagent完成投递在direct-announce超时/drain时丢失 | 已有#79405覆盖，待验证 |
| P1 | #92433 | Subagent完成被steer到已结束的run导致永久丢弃 | 无直接fix PR |
| P1 | #43367 | 多agent并发配置覆盖、会话锁失败、子任务游离 | 无fix PR，维护者卡在review阶段 |
| P1 | #43374 | 多agent并发时所有LLM API调用同时超时 | 无fix PR，疑似内部请求头阻塞 |
| P1 | #89278 | Codex OAuth刷新需10s+，但cron/heartbeat仅有10s超时 | 无fix PR |
| P1 | #97983 | iOS/WebChat消息追加到transcript但不触发回复 | 无fix PR，已标记stable复现 |
| P1 | #111498 | 主agent被workspace-state迁移阻塞，无法响应Anthropic轮次 | 无fix PR |
| P1 | #97616 | Hook/tool子进程泄漏产生僵尸进程，运行时退化 | 无fix PR |
| P2 | #115001 | Hybrid memory搜索通过FTS LIKE-fallback返回虚假1.0相似度 | 有PR #122650 相关但非直接修复 |

值得注意的是，**#79405的合并**是本日对投递丢失类问题最重要的里程碑，但该修复是否真正覆盖#92433中“steer进入已结束run”的场景仍需验证。其余多项P1问题尚无对应fix PR，稳定性攻坚仍是未来数周的重心。

---

## 6. 功能请求与路线图信号

今日功能请求活跃，以下方向可能被纳入后续版本：

- **记忆安全（高热度）**：#7707“Memory Trust Tagging by Source”持续获得讨论，结合安全圈对agent技能供应链的关注，该功能有较高概率进入路线图。
  链接：https://github.com/openclaw/openclaw/issues/7707

- **WebChat语音能力增强**：#45508 要求将WebChat的TTS/STT从浏览器API路由到自托管网关，打通自托管语音链路。该Issue已带`linked-pr-open`标记，说明已有PR在跟进。
  链接：https://github.com/openclaw/openclaw/issues/45508

- **YAML配置支持**：#45758（9条评论）请求增加YAML作为JSON5之外的配置格式，属于DevOps友好性提升，虽优先级仅为P3，但讨论热度稳定。
  链接：https://github.com/openclaw/openclaw/issues/45758

- **技能优先级配置**：#50199 建议为重叠技能增加优先级选择规则，反映用户在多技能场景下的实际困惑。
  链接：https://github.com/openclaw/openclaw/issues/50199

- **交付队列TTL**：#16555 建议为持久化投递队列增加TTL，防止网关重启后陈旧消息冲刷频道。该诉求与#121058的静默丢弃问题互补，可能被一并考虑。
  链接：https://github.com/openclaw/openclaw/issues/16555

今日新提交的PR中，**#122919 fix: retrying a failed steer dead-ends after its target run exits**、**#122923 feat(ui): show useful environment facts in the picker**、**#122425 fix: allow slash skills inside normal messages** 均指向Web UI与交互体验优化，可视为下一个版本的功能储备。

---

## 7. 用户反馈摘要

从今日Issues评论中提炼用户真实声音：

- **对“静默失败”的绝望感** — #121058评论中，用户反复强调“监控cron在issue关闭后仍每天记录新事件”，说明修复并未真正解决问题。社区情绪从最初的报告转为疲劳和失望。
  链接：https://github.com/openclaw/openclaw/issues/121058

- **多智能体跑步进入生产陷阱** — #43367用户waliddafif描述了从CLI编排并发agent时遭遇的“配置覆盖、锁失败、子任务游离”三连击，称“让多agent运行在生产环境下不可靠”，这直接影响用户对OpenClaw大规模部署的信心。
  链接：https://github.com/openclaw/openclaw/issues/43367

- **内存管理混乱** — #43747用户AM-young-fun抱怨自己和3位同事的“memory管理方式完全不同”（有的chunking/embedding存sqlite，有的存文件，有的存向量库），认为“管理混乱”已经到了影响协作的程度。此反馈指向内存层的实现方式碎片化问题。
  链接：https://github.com/openclaw/openclaw/issues/43747

- **对技术细节的深度认可** — 与普遍抱怨形成对比，#95610（prompt-cache前缀churn问题）用户aleps001对OpenAI缓存原理分析透彻，获得维护者的专业讨论。这类用户为项目贡献了高质量诊断，是社区生态健康的积极信号。
  链接：https://github.com/openclaw/openclaw/issues/95610

- **可访问性与细节改进** — #65538（屏幕阅读器逐token朗读）虽已关闭，但其评论中用户对流式输出可访问性的期待，说明OpenClaw用户群体正在扩展至更广泛的非技术场景。
  链接：https://github.com/openclaw/openclaw/issues/65538

---

## 8. 待处理积压

以下重要Issue/PR长期未得到响应或解决，建议维护者优先关注：

- **#7707 内存信任标记（45条评论，长期讨论）** — 自2026-02-03创建以来持续活跃，且直接关乎AI安全。当前标记为`needs-product-decision`，等待产品决策。
  链接：https://github.com/openclaw/openclaw/issues/7707

- **#51762 默认agent存储扫描修复（自3月21日，至今未合并）** — 修复Secret audits等扫描方向错误的问题，却搁置近5个月。该PR正确且小（size: S），长时间未merge令人费解。
  链接：https://github.com/openclaw/openclaw/pull/51762

- **#44925 Subagent静默丢失（P1, 26条评论）** — 虽#79405已合并，但该Issue仍标记为open。维护者应验证修复效果后关闭或更新状态，避免社区困惑。
  链接：https://github.com/openclaw/openclaw/issues/44925

- **#43367 多Agent编排不稳定（P1, 14条评论）** — 处于`needs-maintainer-review`状态多月，但无人接手，严重制约多智能体场景的可用性。
  链接：https://github.com/openclaw/openclaw/issues/43367

- **#89278 Codex OAuth刷新超时（P1, 10条评论）** — 涉及认证链路，用户已给出详尽环境信息和复现步骤，但尚未有维护者确认或分配。
  链接：https://github.com/openclaw/openclaw/issues/89278

- **#78493 sudo更新导致权限混用（P1, 7条评论）** — 会直接导致配置丢失（`doctor`覆盖配置文件），属于高风险数据损坏问题，目前仍等待产品决策。
  链接：https://github.com/openclaw/openclaw/issues/78493

---

**总结**：OpenClaw项目保持着极高的社区活跃度和PR吞吐量，但核心稳定性问题（特别是subagent投递链路）尚未完全闭环，用户情绪在部分长期未决问题上趋于疲惫。今日合并的#79405和#122624是实质性进展，但后续仍需集中力量解决#92433、#43367、#89278等P1问题，以恢复社区对项目稳定性的信心。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-13）

---

## 1. 生态全景

2026-08-13，个人 AI 助手/自主智能体开源生态呈现"超级项目主导、长尾并存、安全与稳定性优先"的格局。12 个观测项目中 9 个有实质活动，单日合计产生逾 690 条 Issue 更新与 750 条 PR 更新，其中 OpenClaw 独占约七成流量，形成"OpenClaw + 多路垂直竞争者"的金字塔结构。各活跃项目不约而同将资源投向两大方向——**静默失败与消息可靠性的治理**，以及**安全加固（沙箱、路径逃逸、凭据泄漏、插件权限）**，而非激进的新功能扩张。多智能体编排、MCP 集成稳定性、插件治理和 Token 成本优化成为跨项目共性战场；Windows 平台缺陷与版本升级回归则在多个项目中同时暴露，表明快速迭代正在积累"平台债"。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 今日健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 406，关闭 94） | 500（待合并 357，合并/关闭 143） | 无 | 高迭代高讨论；subagent 投递链路等核心 P1 悬而未决，用户情绪趋于疲惫，**健康度中等偏下** |
| **NanoBot** | 8（新开/活跃 4，关闭 4） | 36（待合并 19，合并/关闭 17） | 无 | 良好；安全修复密集（凭据泄漏、路径防护、Docker 降权），但 P0 会话一致性 PR 滞留 7 天 |
| **Hermes Agent** | 50（新开/活跃 39，关闭 11） | 50（待合并 34，合并/关闭 16） | 无 | 高度活跃；插件体系从设计走向落地，但 Windows 双 P1 网关问题待解 |
| **PicoClaw** | 2（均为历史 stale 更新） | 3（0 合并） | 无 | 开发活跃但**合入完全停滞**；MCP 挂起与 WebUI 卡顿无修复 PR |
| **NanoClaw** | 4（全部新开） | 10（待合并 9，关闭 1） | 无 | 良好；2.1.54 升级后迁移/兼容问题密集反馈，9 条 PR 积压 |
| **NullClaw** | 0 | 0 | 无 | 无活动 |
| **IronClaw** | 41（新开/活跃 29，关闭 12） | 50（待合并 31，合并/关闭 19） | v1.2.0-rc.2 / rc.3 | 良好；v1.2.0 冲刺中，但 QA 在 Telegram 渠道发现 9 条 Bug 集中爆发 |
| **LobsterAI** | 6（活跃 4，关闭 2） | 8（合并/关闭 7，待合并 1） | 无 | 稳定迭代；UI 修复合入率高，但"强制沙箱""卸载残留"等信任类问题 4 个月无响应 |
| **Moltis** | 0 | 0 | 无 | 无活动 |
| **CoPaw** | 30（新开/活跃 23，关闭 7） | 44（待合并 28，合并/关闭 16） | v2.1.0-beta.4 | 高速迭代；但修复 PR #6816 被回退、插件安全漏洞 #6916 悬置，**稳定性承压** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 |
| **ZeroClaw** | 50（新开/活跃 45，关闭 5） | 50（待合并 30，合并/关闭 20） | 无 | 良好；安全修复（截图路径逃逸、终端标记泄漏）落地快，但 Security CI 红标（#9899）阻塞 |

> 注：OpenClaw 的 500/500 为数据窗口内更新量，其余项目均为实际更新数。

---

## 3. OpenClaw 在生态中的定位

**生态绝对中心与事实标准。** OpenClaw 单日 500 条 Issue + 500 条 PR 的流量，较第二梯队（Hermes / IronClaw / ZeroClaw 的 50/50）高出约一个数量级，较第三梯队（NanoBot / LobsterAI）高出两个数量级。它不仅是社区规模最大的项目，也被生态视为"核心参照"——LobsterAI 的 PR #1181（隐藏内部会话）与多个"Claw 系"项目（PicoClaw、NanoClaw、ZeroClaw）均表现出对其设计语言与技术路线的直接借鉴或血缘关系。

**优势：**
- **渠道矩阵深度**：Slack / Discord / Telegram / WebChat / iOS 全覆盖，且已沉淀出连接去重（#122624）、ingress 阻塞恢复（#122878）等细节修复，同类项目尚停留在单渠道可用阶段。
- **子代理编排复杂度**：subagent 完成投递链路（taskId 保留、child run 与 task id 分离、降级投递）是生态内最深的编排实现；#79405 历经 3 个月合并，说明其工程严谨度，也反映其历史包袱之重。
- **社区自组织能力**：单日合并/关闭 143 条 PR、关闭 94 条 Issue，维护吞吐量为生态之最；同时社区贡献者具备深挖 prompt-cache 前缀抖动（#95610）的高质量诊断能力。

**技术路线差异：**
- 网关-队列-投递链架构，强调消息持久化与降级路径；相比之下，NanoBot、PicoClaw 等轻量项目多为进程内直连，CoPaw 侧重 agent 框架能力（computer-use、多 agent 会话），IronClaw 则走"发布工程规范化 + Web3 云集成"路线。
- OpenClaw 的记忆系统（混合检索 + FTS 回退）与信任标记提案（#7707）在生态中领先，但"碎片化实现"争议（#43747）也反映出复杂度失控的风险。

**社区规模对比的风险信号：** #121058 以 91 条评论但 **0 个 👍** 成为最热 Issue——大量用户遭遇同类问题却不再愿意表态，是"规模大但耐心耗尽"的典型指标。多个 3-4 月创建的 P1（#44925、#43367）长期未闭环。OpenClaw 的定位可概括为：**生态的引擎与瓶颈并存——它的投递链路稳定性直接影响整个品类在用户心中的信任基线。**

---

## 4. 共同关注的技术方向

### 4.1 静默失败治理（可靠性红线）

| 涉及项目 | 具体诉求 |
|---|---|
| OpenClaw | subagent 完成静默丢失（#44925、#67777、#92433）、Slack 重复连接导致消息丢路由（#122624） |
| CoPaw | 多步骤任务规划后静默停止，需用户说"继续"才继续（#6921） |
| NanoClaw | WhatsApp 向未注册号码发消息"假成功"（#3086，今日已修复） |
| ZeroClaw | cron 任务"运行成功但结果被丢弃"（#9340，今日已修复） |
| PicoClaw | MCP 连接失败导致整个 agent loop 挂起、界面停止回复（#3269） |

**共同诉求**：失败必须可见、可重试、可恢复，杜绝"假成功"与无提示中断。可观测性（队列回放、状态可见、自动重启）正从附加功能变为核心要求。

### 4.2 MCP 生态稳定性与安全

| 涉及项目 | 具体诉求 |
|---|---|
| Hermes Agent | OAuth MCP 连接 4 小时后永久死锁（#38193、#81051） |
| PicoClaw | MCP 连接失败挂起整个 agent 循环（#3269） |
| CoPaw | MCP 工具将数字字符串以数字类型传参导致调用失败（#6839） |
| IronClaw | 自定义 MCP 服务器添加流程报 "validation error"（#7554） |
| NanoBot | MCP OAuth 读取失败时避免覆盖其他 server 凭据（#5338） |
| ZeroClaw | 延迟 MCP 访问策略集中化（#8496 已合并） |

**判断**：MCP 已事实上成为工具集成标准，但"连接管理 + 鉴权 + 超时降级 + 参数校验"四个环节在多数项目中仍不成熟，是明确的基础设施级机会。

### 4.3 插件治理与供应链安全

- **Hermes Agent**：插件接口标准化（#64182）——事件总线、生命周期账本、pre_transcription hook 密集落地。
- **CoPaw**：安全漏洞——插件可静默创建 cron 任务并向会话注入消息，无任何用户确认（#6916）。
- **ZeroClaw**：WASM 插件墙钟截止时间约束，防失控插件占死宿主（#9403）。
- **NanoClaw**：Agent Plugins 1.0.0 目录结构（#3220），引擎级模板重构。
- **LobsterAI**：Windows 插件安装跨卷符号链接失败（#2479，已修复）。

### 4.4 Token 成本与上下文效率

- **Hermes Agent**：#6839 Lazy Tool Schema 加载，18👍 为今日生态最高赞功能请求——50+ 工具每次注入完整 schema 消耗 3,500-5,000 tokens/次。
- **IronClaw**：Token 估算器双倍计数 ASCII 修复（#7485）、上下文窗口驱逐策略（#7484）。
- **ZeroClaw**：终端标记（`<eom>`）泄漏至响应与持久化历史（#9695，已修复），同时也在清理无效 token 输出。
- **OpenClaw**：#95610 prompt-cache 前缀 churn 问题获得高质量社区分析。

### 4.5 多智能体/子代理编排可靠性

- **OpenClaw**：subagent 完成投递核心加固（#79405 今日合并）。
- **CoPaw**：多子 agent 死循环（#6927）、inter-agent 消息创建影子会话（#6918）、多 agent 协作需同窗口展示（#6925）。
- **Hermes Agent**：K8s 会话 Pod 终端执行后端（#84962）。
- **LobsterAI**：#1181 要求将内部 heartbeat/cron 会话从用户会话列表隐藏（搁置 4 个月）。
- **NanoClaw**：agent 模板/组体系（#3220）与旧版周期任务迁移失明（#3233）。

### 4.6 Windows 平台体验补齐

- **ZeroClaw**：Windows 11 简体中文环境 74 个测试失败（#7462）、安装器启动失败（#9290）。
- **Hermes Agent**：桌面重启后网关被回收不拉起（#83683）、更新后网关静默死亡（#84185），双 P1。
- **IronClaw**：rc.2 修复 Windows 首次启动文件发布失败。
- **LobsterAI**：修复 Windows 插件安装 EPERM 与大图标提取崩溃（#2478、#2479）。
- **CoPaw**：Windows 概率性启动报错、进程崩溃（#6955）。

**共性根因**：多数项目 CI 仅跑 Linux，Windows 问题长期外溢。桌面大众用户市场正在扩大，Windows 支持将是下一轮差异化竞争点。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能自托管个人 AI；多渠道网关 + 深度子代理编排 | 开发者、重度个人用户、自托管社区 | 网关-队列-投递链架构，强调持久化与降级；社区驱动，"集市式"开发 |
| **NanoBot** | 安全优先的轻量助手；Provider 兼容（DeepSeek V4 Pro、Gemini、QwenCloud 即将接入） | 注重安全的中小型部署者、Docker 用户 | 安全默认值（路径防护、cap_drop、凭据隔离）；Hook 自动发现；WebUI 服务端会话协作 |
| **Hermes Agent** | 桌面优先 + 插件生态标准化 | Windows 桌面用户、多网关运营者、MCP 重度用户 | 插件事件总线 + 生命周期账本；桌面端深度集成（OAuth、本地 STT）；"接管-重建"社区 PR 管理机制 |
| **PicoClaw** | 边缘/嵌入式 agent（Sipeed 硬件基因） | 嵌入式与边缘设备开发者 | 轻量依赖、小社区；Telegram 话题支持、Exa 搜索等定向增强 |
| **NanoClaw** | CLI 中心、模板化 agent 管理 | CLI 运维型开发者、多实例管理者 | agent 模板/组、周期任务、技能化 Provider（QwenCloud）；2.1.54 迁移暴露兼容性压力 |
| **IronClaw** | NEAR 云生态 + 发布工程规范化 | NEAR 生态开发者、团队协作 | 严格 RC/backport 发布线、设计系统（Storybook）、Web3 staking 集成；QA 驱动的 Telegram 渠道打磨 |
| **LobsterAI** | Electron 桌面 + 中文工作场景 | 中国企业/知识工作者（飞书集成） | Electron 跨平台渲染层迭代快；技能管理器；插件体系初具规模 |
| **CoPaw** | 功能密度最高的 agent 框架；computer-use + 多 agent 协作 | 功能尝鲜型用户、数据分析场景 | computer-use（macOS 元素激活）；DataPaw 原生数据分析运行时；per-session 模型覆盖；beta 高频迭代 |
| **ZeroClaw** | 安全加固型 agent 运行时 | 对安全治理敏感的高级用户 | 浏览器/SSRF 防护、WASM 插件时限、Kanban/SOP 治理功能；安全 PR 社区贡献活跃 |

> NullClaw、Moltis、ZeptoClaw 处于无活动状态，暂不纳入定位分析。

---

## 6. 社区热度与成熟度

### 热度分层（按单日更新量）

| 层级 | 项目 | 特征 |
|---|---|---|
| **超级头部**（500 级） | OpenClaw | 流量是第二梯队 10 倍；但"高讨论-低赞"现象（#121058）显示用户情绪疲劳 |
| **活跃头部**（40-50 级） | Hermes Agent、IronClaw、ZeroClaw、CoPaw | 均处于"功能落地 + 质量巩固"并行阶段；CoPaw 迭代最快但有回归，IronClaw 发布冲刺中 |
| **中等活跃**（<40 级） | NanoBot、LobsterAI、NanoClaw | 节奏稳健、合入率高（NanoBot 47%、LobsterAI 87.5%）；社区讨论量有限但维护响应相对及时 |
| **低活跃/停滞** | PicoClaw | 有开发愿景但 0 合并，Issue 被标记 stale，维护者响应是明显瓶颈 |
| **无活动** | NullClaw、Moltis、ZeptoClaw | 24 小时零动态，处于生态边缘 |

### 成熟度判断

- **快速迭代期（功能扩张优先）**：CoPaw（beta.4 发布 + 44 PR）、IronClaw（v1.2.0 RC 冲刺）——功能推进快，但稳定性与安全模型被动跟随。
- **质量巩固期（安全/稳定性优先）**：ZeroClaw、NanoBot——合入内容以安全修复为主，节奏健康；OpenClaw 属"被迫巩固"——迭代规模大但核心 P1 积压，需靠修复 PR 追平信任赤字。
- **混合期**：Hermes Agent（插件功能批量落地 + Windows P1 拖尾）、LobsterAI（渲染层 UI 打磨 + 信任危机待处理）。

---

## 7. 值得关注的趋势信号

### 7.1 "静默失败"已从 Bug 升级为产品红线

OpenClaw #121058（91 条评论、0👍）、CoPaw #6921、NanoClaw #3086"假成功"、ZeroClaw #9340 在单日集中出现，说明用户对不可见失败已零容忍。**对开发者的启示**：失败可见性（告警、队列回放、状态指示）应作为核心功能纳入设计，而非事后补救。

### 7.2 Token 经济性成为差异化竞争力

Hermes #6839 以 18👍 成为今日生态最高赞功能请求，IronClaw 修正 Token 估值器、ZeroClaw 剥离终端标记——在本地/边缘模型场景，context 效率直接决定可用性。**趋势**：按需工具注入、上下文压缩与精确估算将成为 agent 框架的标配能力。

### 7.3 插件生态进入"治理时代"

Hermes 事件总线与生命周期账本、CoPaw 插件安全漏洞、ZeroClaw WASM 时限、NanoClaw 插件目录标准化——单日四个项目同时触碰插件治理的不同侧面。**趋势**：从"支持插件"转向"插件权限模型 + 生命周期管理 + 供应链安全"，这决定 agent 平台能否承载企业级工作负载。

### 7.4 MCP 是基础设施级机会

五个活跃项目同日出现 MCP 相关问题：连接挂起、OAuth 死锁、参数类型误传、凭据保留、访问策略。**判断**：MCP 已统一工具接入层，但连接可靠性、鉴权与降级机制仍是空白，能提供"标准 MCP 网关层"的解决方案将获巨大需求。

### 7.5 Windows 是结构性短板，也是错位竞争窗口

ZeroClaw 74 个测试失败、Hermes 双 P1、IronClaw 首次启动修复、LobsterAI 跨平台修复——多数项目 CI 仅覆盖 Linux。**趋势**：个人 AI 助手向大众桌面用户渗透时，Windows 优先的项目（Hermes、LobsterAI）将获得显著的错位优势；跨平台 CI 是最低成本的第一步。

### 7.6 多智能体从 Demo 走向生产负载

OpenClaw 投递链路加固、CoPaw 影子会话与死循环、Hermes K8s Pod 终端、NanoClaw agent 模板——**趋势**：多智能体的下一波基础设施需求是"任务血缘追踪 + 结果投递保障 + 会话隔离"，而不仅是并发调度能力。

### 7.7 AI 安全从"功能开关"演变为"信任契约"

LobsterAI 强制沙箱引发用户回滚（#1179）、CoPaw 插件注入、ZeroClaw 路径逃逸、NanoBot 凭据泄漏修复——**启示**：安全机制必须提供透明度、可配置性与迁移路径；"半夜自动更新 + 无法关闭"（#1179）与"卸载后进程仍存活"（#1173）等事件表明，技术安全与用户信任之间需要产品化沟通，否则安全功能本身会反噬口碑。

---

*报告基于 2026-08-13 各项目 GitHub 社区动态自动生成，数据窗口为 UTC 2026-08-12 至 2026-08-13。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报 — 2026-08-13

## 1. 今日速览
- 过去 24 小时项目活跃度较高：8 条 Issue 更新（新开/活跃 4，已关闭 4），36 条 PR 更新（待合并 19，已合并/关闭 17），无新版本发布。
- 安全与稳定性是本日主线：多项涉及工作区边界绕过（`ExecTool` 路径防护）、凭据外泄（Jina 读取器）、会话历史隔离、Docker 权限模型的修复已合并。
- 提供者生态持续推进：DeepSeek V4 Pro 的 Responses API 支持已合并，QwenCloud 兼容路径的新需求也已提出。
- WebUI 方向明显加强：会话协作、频道设置流程、应用发现页等 3 个功能 PR 同日新开，预示下一阶段 UI 能力将有较大升级。
- 整体健康度良好：P0 级会话一致性 PR 已存在数日，需维护者优先关注；其余开放条目大多有明确负责人和推进节奏。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
过去 24 小时内有 17 个 PR 被合并/关闭，主要集中在安全加固、提供者适配和核心生命周期治理：

- **安全边界加固**
  - [#5258 fix(web): keep credential-bearing URLs away from the remote Jina reader](https://github.com/HKUDS/nanobot/pull/5258)：用户信息（userinfo）和 token/签名型查询参数改为走本地可读性路径，不再发给 `r.jina.ai`；并要求检查完整重定向链后才允许转发原始 URL，防止短链绕过。
  - [#5329 fix(exec): guard bare and named-user home paths](https://github.com/HKUDS/nanobot/pull/5329)：`ExecTool` 现在能识别裸 `~`、`~/...`、`~user` 路径和输入重定向（如 `<~root/.bashrc`），堵住工作区越界读取。
  - [#5218 fix(tools): treat redirection and grouping delimiters in ExecTool path guard](https://github.com/HKUDS/nanobot/pull/5218)：修正 POSIX 表达式对重定向/分组符号的处理，避免漏判路径但仍保留合法引号与嵌套命令。
  - [#5320 fix(docker): restore capabilities for privilege drop](https://github.com/HKUDS/nanobot/pull/5320)：保持 `cap_drop: ALL` 的同时恢复 root 引导阶段所需的三项 capability，并开启 `no-new-privileges`，防止降权后的进程通过 setuid 重新提权。
  - [#5279 fix(session): store session history outside the agent workspace](https://github.com/HKUDS/nanobot/pull/5279)：会话记录从 `<workspace>/sessions/` 迁移到 `<config-dir>/sessions/<workspace-id>/`，避免被工作区级工具读取/篡改。

- **提供者与模型兼容**
  - [#5362 feat(providers): support DeepSeek V4 Pro Responses](https://github.com/HKUDS/nanobot/pull/5362)：为 `deepseek-v4-pro` 接通 DeepSeek 原生 Responses API，并显式保留 `reasoning.effort: "none"` 以维持默认关闭思考模式的行为。
  - [#5230 fix(gemini): preserve imported tool calls with signature fallback](https://github.com/HKUDS/nanobot/pull/5230)：修复 Gemini 3 拒绝无 thought signature 的重放 function-call 问题；现在会按原样保留 Gemini 签名，同时为无签名来源的记录提供回退。

- **框架能力**
  - [#4878 feat(hooks): add auto-discovery mechanism for agent hooks](https://github.com/HKUDS/nanobot/pull/4878)：hooks 支持 `pkgutil` 扫描 + `entry_points` 自动发现，新增自定义 hook 只需放入 `nanobot/agent/hooks/` 即可，无需手工接线。

这些合并使项目在安全默认值、跨提供者可移植性和扩展机制三个维度同时向前迈进，尤其对部署 Docker 与多 Provider 用户群体有明显收益。

## 4. 社区热点
- [#5327 [CLOSED] Nanobot repeats multiple times the same message while reasoning](https://github.com/HKUDS/nanobot/issues/5327)（评论 11，最热）：用户反馈 agent 在推理阶段随机重复“Good points, let me investigate the issue”等短语，触发条件不稳定、难以复现，因此讨论热度高。该 Issue 已关闭，推测已有修复或定位结论。
- [#5295 [CLOSED] deploy with docker compose failed, "cannot open /usr/local/bin/entrypoint.sh: Permission denied"](https://github.com/HKUDS/nanobot/issues/5295)（评论 5）：多个用户反馈 Docker 部署失败，最终定位到 entrypoint 执行权限问题，并与今日合并的 #5320 权限模型修复直接相关。
- [#5350 [OPEN] Proposal: add a backward-compatible QwenCloud provider path alongside existing DashScope support](https://github.com/HKUDS/nanobot/issues/5350)（创建仅 1 天即获讨论）：来自国际用户的明确诉求，希望在不破坏现有 DashScope 配置的前提下接入 QwenCloud，反映 NanoBot 用户已覆盖中国与国际双市场。
- [#4010 [OPEN] Feature proposal: text-to-speech / voice output support](https://github.com/HKUDS/nanobot/issues/4010)（3 👍，评论 3）：虽已开放 80 天，仍是社区持续关注的语音闭环方向，用户明确表示“已有 voice-in，缺 voice-out”。

## 5. Bug 与稳定性
按严重程度排列：

- **严重 / 行为异常**
  - [#5327 推理时重复输出同一句话](https://github.com/HKUDS/nanobot/issues/5327)（已关闭）。现象随机出现，影响用户对输出的信任；关闭状态暗示已定位或修复。
- **严重 / 部署阻断**
  - [#5295 Docker Compose 部署失败](https://github.com/HKUDS/nanobot/issues/5295)（已关闭）。`/usr/local/bin/entrypoint.sh: Permission denied`，已被 #5320 的 capability 修复覆盖。
- **安全**
  - [#4884 WebFetch 将完整用户 URL 发送给 Jina](https://github.com/HKUDS/nanobot/issues/4884)（已关闭）。修复 PR #5258 今日确认合并，风险解除。
- **中 / 测试稳定性**
  - [#5348 两个 token-usage 测试在 UTC 与配置时区不匹配的时间窗口内确定性失败](https://github.com/HKUDS/nanobot/issues/5348)（开放中，无 fix PR）。约每天 03:00–08:00 UTC 触发，属于典型的时区处理缺陷，建议尽快小修。
- **中 / 会话一致性（已修复方向）**
  - 今日还合并了 #5279 会话历史隔离、#5338 尚未合并的 MCP OAuth 存储读取失败保护，以及 #5361 微信 QR token 持久化修复。
- **开放中高优项**
  - [#5271 [p0] fix(session): prevent stale background task saves from overwriting session data](https://github.com/HKUDS/nanobot/pull/5271)（仍开放）——阻止后台任务过期后覆盖 `/new` 等生命周期替换后的会话数据。P0 级别但已开放 7 天，建议维护者尽快推进合入。

## 6. 功能请求与路线图信号
- **长期高赞需求**
  - [#4010 语音输出（TTS）](https://github.com/HKUDS/nanobot/issues/4010)：3 👍，开放 80 天。对应 PR 尚未出现，可能是路线图之外的方向，但社区诉求稳定。
- **新出现的 Provider 需求**
  - [#5350 QwenCloud 兼容路径](https://github.com/HKUDS/nanobot/issues/5350)：与已合并的 DeepSeek V4 Pro 支持形成呼应，说明项目正积极补齐中国主流云模型入口。
- **Matrix 线程语义**
  - [#5275 “reply in thread” 应形成独立上下文](https://github.com/HKUDS/nanobot/issues/5275)：与 Discord/Slack 线程行为对齐，已有 PR #5292 修复 Matrix 回复事件关联但未合入，功能上需继续跟进。
- **WebUI 新功能正在排队**
  - [#5358 会话协作（通过 @提及）](https://github.com/HKUDS/nanobot/pull/5358)：为 WebUI 会话分配稳定的服务端 `@name`，允许选择 peer 会话协作。
  - [#5356 频道设置流程重构](https://github.com/HKUDS/nanobot/pull/5356)：将字段按 account/credentials/connection/mail/access/behavior/security 分组，并优化未配置频道的引导。
  - [#5342 应用发现页重新设计](https://github.com/HKUDS/nanobot/pull/5342)：引入 Discover/Installed/All 三类视图 + 官方 registry 的 Featured 列表。
  - 三者均于 08-11/08-12 开出，叠加 [#4329 TypeScript 终端 UI](https://github.com/HKUDS/nanobot/pull/4329)，可判断下一阶段项目重点之一是交互体验全面升级。
- **可观测性**
  - [#5291 持久化子代理对话记录](https://github.com/HKUDS/nanobot/pull/5291)：让子代理的 tool calls、推理过程和最终结果可追溯，目前仍开放。

## 7. 用户反馈摘要
- **部署体验**：有用户完全按 `deployment.md` 操作 Docker Compose 却失败，报 `entrypoint.sh: Permission denied`（#5295），说明文档与镜像权限组合仍需验证，好在已通过 #5320 修复。
- **输出可靠性**：agent 会随机重复“Good points, let me investigate the issue”等推理短语（#5327），即便关闭后，用户仍可能在意推理阶段的稳定性与可复现性。
- **平台地域差异**：国际用户明确指出现有 DashScope 路径不覆盖 QwenCloud，且不希望已有 provider ID/API key/endpoint 配置失效（#5350）——这是典型的“新增兼容层而非切换”诉求。
- **消息关联体验**：Matrix 用户对“回复线程”与“普通回复”两种模式的归属关系有精细预期（#5275、#5292）；当前 bot 的普通房间回复未标记为 reply，客户端无法串联上下文，影响多轮沟通效率。
- **语音交互闭环**：用户认为“语音输入已有、语音输出缺失”是明显短板，通道侧已原生支持语音消息，期望 agent 回复也能语音化（#4010）。

## 8. 待处理积压
- **P0/P1 开放 PR，请优先关注**
  - [#5271 [p0] fix(session): prevent stale background task saves from overwriting session data](https://github.com/HKUDS/nanobot/pull/5271)：会话数据被过期任务覆盖是高风险一致性缺陷，需尽快 review 合入。
  - [#5204 [p1] refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204)：涉及 OpenAI、GitHub Copilot、DeepSeek 三条 provider 路径，且有 conflict 标记，需协作者尽快解决冲突。
- **社区长期等待**
  - [#4010 语音输出 TTS](https://github.com/HKUDS/nanobot/issues/4010)：开放 80 天，3 👍，无 assignee 无 PR，建议在路线图中明确表态。
  - [#4329 原生 TypeScript 终端 UI](https://github.com/HKUDS/nanobot/pull/4329)：开放 63 天且带 conflict，属于大方向功能，需要维护者决策并协调跨平台实现（@chengyongru 与 @pancacake 的整合方案）。
- **新报告需快速响应**
  - [#5348 token-usage 测试时区问题](https://github.com/HKUDS/nanobot/issues/5348)：触发窗口每天约 5 小时，影响 CI 稳定性，修复成本低。
- **待合并的功能链**
  - [#5291 子代理会话持久化](https://github.com/HKUDS/nanobot/pull/5291)：与 #5271 都是会话领域改进，建议一同 review。
  - [#5338 MCP OAuth 读取失败时保留凭据](https://github.com/HKUDS/nanobot/pull/5338)：与安全相关，避免误覆盖其他 server 的凭据。
  - [#5292 Matrix 回复关系修复](https://github.com/HKUDS/nanobot/pull/5292)：虽然改动不大，但能直接改善 Matrix 用户的消息串接体验，建议与 #5275 一并评估。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时项目保持高活跃度：共计 50 条 Issue 更新（新开/活跃 39 条，关闭 11 条）与 50 条 PR 更新（待合并 34 条，已合并/关闭 16 条）。社区讨论热点集中在**插件接口扩展**与**工具调用 Token 开销优化**两大方向，其中 `teknium1` 主导的插件系列 PR（pre_transcription hook、inter-plugin event bus、ownership ledger 等）今日密集落地，标志着插件体系正从设计讨论走向实际交付。稳定性方面，Windows 平台出现 2 个 P1 级网关/更新回归 Bug，另有 1 个 OAuth MCP 死锁问题已有对应修复 PR。无新版本发布。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日闭合的关键 PR 集中在**插件接口扩展**，该系列源自跟踪 Issue #64182 的社区提案，由 `teknium1` 批量接手并保留原作者署名，项目正在将 7 月以来积压的插件 PR 逐步落地：

- **[PR #84934 — pre_transcription hook：STT 提示词与词汇增强](https://github.com/NousResearch/hermes-agent/pull/84934)**（已合并）
  为 STT 后端增加 `pre_transcription` 钩子，允许插件在请求侧注入模型提示词/词汇提示，修复子问题 #64168，并替代/继承了 #65632（原作者 @hansai-art）。

- **[PR #84932 — 插件间事件总线：声明式 emits/listens 契约](https://github.com/NousResearch/hermes-agent/pull/84932)**（已合并）
  为插件提供一等公民的命名空间事件总线（`ctx.emit()` / `ctx.subscribe()`），要求插件在 manifest 中声明 `emits:` / `listens:`，替代了 #66085 并为关闭子问题 #64164 铺路。

- **[PR #84923 — 插件所有权账本、on_unload 与受监督任务](https://github.com/NousResearch/hermes-agent/pull/84923)**（开放）
  为每个插件建立 profile 隔离的所有权账本，支持 `on_unload` 清理与后台任务监督，是后续 force-reload（#64229）的结构性前提。

- **[PR #84914 — pre_command 观察者钩子 + 按能力门控的 ctx.call_mcp](https://github.com/NousResearch/hermes-agent/pull/84914)**（开放）
  插件可观察所有斜杠命令的分发前事件，并且可通过白名单方式调用已配置的 MCP 服务器。

- **[PR #84519 — 修正 Upstage solar-pro4 与 syn-pro 上下文长度](https://github.com/NousResearch/hermes-agent/pull/84519)**（已关闭）
  修复 #84482，将 `syn-pro` 的上下文从默认 256K 拉低到实际 65,536，避免因截断导致的会话数据损伤。

- **[PR #84963 — MCP OAuth teardown lock 生命周期修复](https://github.com/NousResearch/hermes-agent/pull/84963)**（开放）
  针对 #38193 的死锁问题，在公有 HTTP transport 层面对 OAuth 授权流生成器做确定性关闭，并落定资源持有状态；同族问题 #81051 亦有提及。

整体来看，插件体系在这一天实质性前进了至少三个子项目的落地，且社区 PR 的"回收-重建-合并"流程保证了原作者贡献被保留。OAuth MCP 锁竞争这一长期 Bug 终于迎来修复实现，是稳定性的重要进展。

---

## 4. 社区热点

- **[Issue #6839 — Lazy Tool Schema 加载（双程工具注入）](https://github.com/NousResearch/hermes-agent/issues/6839)**（39 评论，18 👍）
  当前讨论热度最高的 issue：每次 API 调用都会注入全部工具的完整 schema，50+ 工具消耗约 3,500-5,000 tokens/次，即使对话根本用不到这些工具。社区对本地模型的 token 开销尤为敏感，围绕"按需注入/双程加载"的取舍、与 MCP 动态工具发现的交互、以及对现有工具调用的影响持续辩论。该 issue 状态为 `needs-decision`，已在讨论中停留 4 个月，亟需维护者拍板。

- **[Issue #64182 — 插件接口扩展跟踪（社区提案，2026年7月）](https://github.com/NousResearch/hermes-agent/issues/64182)**（33 评论）
  这是整个插件扩展路线图的源头，今日多个合并 PR（#84934、#84932）均锚定此跟踪 issue。社区贡献者的 PR 长期排队问题通过 teknium1 的"接管-重建"模式得到加速。

- **[Issue #64231 — 插件生命周期事件目录与钩子分类学](https://github.com/NousResearch/hermes-agent/issues/64231)**（24 评论）
  社区要求先建立统一的生命周期事件目录和钩子接受标准，再批量处理十个左右悬而未决的 `VALID_HOOKS` PR，避免"每次合并一个一次性钩子"的碎片化。此 issue 的处理进度直接决定插件扩展的长期健康度。

- **[Issue #66616 — Skills 索引过期/退化（自动化探针报告）](https://github.com/NousResearch/hermes-agent/issues/66616)**（19 评论）
  nousbot-eng 的自动探针发现 `/docs/api/skills-index.json` 已 29.8 小时未更新（上限 26h），状态为 `degraded`。CI 管道（`skills-index.yml` 与 `deploy-site.yml`）存在不一致，社区就修复方案讨论了约 1 个月。

**背后诉求**：社区对 token 成本的敏感度正在提高（#6839 获得最高赞），同时插件体系亟需规范化和批量清理（#64182/#64231），且自动化基础设施的健康度开始被社区关注（#66616）。

---

## 5. Bug 与稳定性

### 🔴 P1（严重，需紧急关注）

- **[Issue #83683 — Windows 桌面重启后网关被回收但未重新拉起（微信/QQ/Telegram 全部静默）](https://github.com/NousResearch/hermes-agent/issues/83683)**（10 评论）
  回归问题：Hermes 0.20.0 桌面版每次重启都会强杀正在运行的 messenger gateway，且不再重新启动它，用户必须手动拉起。影响 Windows 桌面端全部 IM 通道。尚无关联 fix PR。

- **[Issue #84185 — Windows 上 `hermes update` 后网关冷启动静默死亡](https://github.com/NousResearch/hermes-agent/issues/84185)**（6 评论）
  更新程序打印"已启动 gateway (PID <n>)"，但子进程立即死亡，不写日志、不生成 PID 文件，服务离线直到手动重启。同为 Windows 更新链路问题，与 #51922 的修复范围相关但独立存在。尚无关联 fix PR。

- **[Issue #53479 — CLI updater 仍信任 rev-list 计数，浅克隆/分叉安装会得到虚假大数字](https://github.com/NousResearch/hermes-agent/issues/53479)**（3 评论）
  桌面端已在 #51922 修掉了同类问题，但 CLI 端仍使用无条件的 `git rev-list HEAD..origin/branch --count`。从 6 月 27 日至今无对应 PR。

### 🟠 P2（中等，多数已有修复或讨论中）

- **[Issue #38193 — OAuth 后 MCP 服务器 keepalive 重连后永久死锁](https://github.com/NousResearch/hermes-agent/issues/38193)**（4 评论）→ ✅ 已有 [PR #84963](https://github.com/NousResearch/hermes-agent/pull/84963) 修复，但尚未合并，需评审验证。
- **[Issue #81051 — OAuth MCP 连接约 4 小时后永久卡死（parked），只能重启网关](https://github.com/NousResearch/hermes-agent/issues/81051)**（2 评论）→ 与 #38193 同族，PR #84963 声明覆盖。
- **[Issue #83427 — browser_exec 崩溃：PYTHONPATH 指向 Hermes 自身 venv 时的 pydantic_core ModuleNotFoundError](https://github.com/NousResearch/hermes-agent/issues/83427)**（4 评论）→ 桌面端环境变量污染类问题。
- **[Issue #84206 — @file 展开只认 UTF-8，GBK/Shift_JIS/Windows-1252 文件直接报错](https://github.com/NousResearch/hermes-agent/issues/84206)**（2 评论）→ 影响中文/日文/西欧语系用户。
- **[Issue #83390 — DeepSeek 上辅助标题生成失败：HTTP 400 "response_format unavailable"](https://github.com/NousResearch/hermes-agent/issues/83390)**（2 评论，2 👍）→ `auxiliary.title_generation` 路由到 DeepSeek 时必现。
- **[Issue #77505 — VirtualSessionList 滚动抖动在 #77328 后依然存在](https://github.com/NousResearch/hermes-agent/issues/77505)**（5 评论）→ memoization 后重新渲染减少了但物理滚动抖动未消失。
- **[Issue #83918 — 桌面端运行时插件加载全部失败：内置 completion-sound bundle 语法错误](https://github.com/NousResearch/hermes-agent/issues/83918)**（1 评论）→ Windows 桌面端用户安装的插件全部无法初始化。

### 🟡 P3（低优先）

- **[Issue #66616 — Skills 索引过期（degraded）](https://github.com/NousResearch/hermes-agent/issues/66616)**（19 评论）→ CI 管道不一致，需修复工作流配置。

---

## 6. 功能请求与路线图信号

**插件接口扩展（明确的路线图，正在快速落地）**：跟踪 Issue #64182/#64231 下的多个子功能已在今日合并或进入 PR 阶段，包括 STT 钩子（#64168）、事件总线（#64164）、生命周期账本（#64229）、MCP 能力门控（#64204，见 PR #84914）。这套体系已经成为下一版本插件能力的核心，预计后续会有更多社区 PR 被纳入标准化框架。

**Token 成本优化可能成为下一个重点**：Issue #6839（Lazy Tool Schema Loading）是当前社区呼声最高的功能请求，18 👍 + 39 评论说明供需缺口明显。当前尚无对应 PR，但该方向的落地会直接影响本地模型用户体验。

**新提交的功能请求（今日新开）**：

- **[Issue #84921 — 新增 display.autolink_urls 设置，禁用桌面端自动 URL 转链接](https://github.com/NousResearch/hermes-agent/issues/84921)**（3 评论）— 用户需要纯文本 URL 列表展示，希望该行为可配置。
- **[PR #84960 — 侧边栏新增 Inbox 风格会话卡片（过滤菜单切换）](https://github.com/NousResearch/hermes-agent/pull/84960)** — 桌面端 UI 可选项，改善多会话管理体验。
- **[PR #84962 — Kubernetes 会话 Pod 终端执行后端](https://github.com/NousResearch/hermes-agent/pull/84962)** — 将 agent 终端命令隔离在独立 Pod 中执行，面向 K8s 运维场景。
- **[PR #84965 — 内存压力与疑似 OOM 重启的用户可见化](https://github.com/NousResearch/hermes-agent/pull/84965)** — 解决托管 agent 被 OOM kill 但仪表盘无感知的问题。
- **[PR #84946 — 配额警告阈值可配置化与抑制（#6567）](https://github.com/NousResearch/hermes-agent/pull/84946)** — 用户可自定义用量警告触发线和关闭方式。

**长期开放但仍有讨论的路线图信号**：

- [#45779 多网关连接与桌面端页签](https://github.com/NousResearch/hermes-agent/issues/45779)（4 评论，7 👍）— 多机器多 agent 管理的桌面端诉求持续存在。
- [#84834 Webhook 全面修复战役（meta-issue）](https://github.com/NousResearch/hermes-agent/issues/84834) 与 [#79564 Discord API v10 对齐战役（meta-issue）](https://github.com/NousResearch/hermes-agent/issues/79564) — 平台适配的体系化推进计划。
- [#38275 HAMP 协议提案（Agent 地址系统 + 异步消息 + 加密身份）](https://github.com/NousResearch/hermes-agent/issues/38275) — 更远期的 Agent 间通信设想，仍处于讨论阶段。

---

## 7. 用户反馈摘要

- **对 Token 消耗不满**（来自 #6839 评论）：用户明确表达每次调用注入全部工具 schema 是"不可接受的浪费"，尤其在使用本地模型时，推理成本与显存占用都受影响。社区普遍认为这是目前制约工具链规模扩大的主要瓶颈之一。
- **Windows 用户的稳定性困扰**（#83683、#84185）：多位 Windows 用户报告升级到 0.20.0 后遇到"网关进程消失但 UI 一切正常"的诡异现象，消息通道静默不可用。一位用户指出"在微信/QQ 上完全收不到消息，直到我手动打开终端重启 gateway"。
- **编码兼容性痛点**（#84206）：中文用户反馈 `@file:`展开遇到 GB18030/GBK 编码文件直接报错，被迫用 UTF-8 重新保存才能工作，这影响日常使用流程。
- **OAuth MCP 稳定性焦虑**（#38193、#81051）：用户依赖 Composio 等 OAuth 认证的 MCP 服务时，连接在几小时后即进入不可恢复的卡死状态，唯一的恢复手段是重启整个网关，这对长运维周期非常不便。
- **对插件功能快速落地的期待**（#64182、#64231 评论区）：社区对 teknium1 快速"回收-重建"积压 PR 的做法表示认可，多人在评论中感谢原作者和接手的维护者，希望这套机制能复制到其他领域的 PR 管理中。

---

## 8. 待处理积压

- **[Issue #6839 — Lazy Tool Schema Loading](https://github.com/NousResearch/hermes-agent/issues/6839)**：4 月 9 日创建，4 个月后仍在 `needs-decision`。这是社区投票最高的功能请求（18 👍），建议维护者明确方向并指定认领人。
- **[Issue #53479 — CLI updater rev-list 计数问题（P1）](https://github.com/NousResearch/hermes-agent/issues/53479)**：6 月 27 日提交，桌面端已修复，CLI 端 47 天未有 PR，属于已知但被搁置的稳定性缺陷。
- **[Issue #39043 — Signal 适配器原生引用/编辑/删除/回执支持](https://github.com/NousResearch/hermes-agent/issues/39043)**：6 月 4 日创建，仅 7 评论，尚无实现 PR。
- **积压的 BLOCKED 测试类 PR**：以下 PR 均标记为 `MERGEABLE / BLOCKED`、无 CI 报告、无 reviewer 响应，需维护者批量处理：
  - [#49169 — 移除 DeepSeek 静默别名旧模型](https://github.com/NousResearch/hermes-agent/pull/49169)（6 月 19 日）
  - [#67934 — 使用原生 Ollama tags 做模型发现](https://github.com/NousResearch/hermes-agent/pull/67934)（7 月 20 日）
  - [#70667 — Kanban 委托 CLI 拒绝状态测试](https://github.com/NousResearch/hermes-agent/pull/70667)（7 月 24 日）
  - [#72671 — Gateway 后台清理 fixture 修复](https://github.com/NousResearch/hermes-agent/pull/72671)（7 月 27 日）
- **[Issue #36616 — Skills 索引 CI 故障](https://github.com/NousResearch/hermes-agent/issues/66616)**。由于文档索引超过 26h 更新限制，已处于 `degraded` 状态近一个月，影响 `/docs/skills` 站点的数据新鲜度，目前仍缺少明确的修复 PR。

---

**项目健康度总评**：项目整体处于高度活跃状态，插件生态从"纸面设计"走向"代码落地"，社区贡献者路径正在被系统性清理和优化。但 Windows 平台连续出现的 2 个 P1 级问题（桌面重启网关消失 + 更新后网关静默死亡）值得高度重视，建议下一轮优先解决；同时，长期 `needs-decision` 的 #6839 正在损耗社区热情，尽快做出方向性决策将对路线图产生正面影响。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-08-13

## 1. 今日速览

过去 24 小时，PicoClaw 仓库共有 **2 个 Issue 更新、3 个 PR 更新**，无新版本发布，也无 PR 被合并或关闭。两个历史 Bug 均已被标记为 `stale`，但仍在 8 月 12 日获得评论更新，说明社区关注度并未消退。3 个待合并 PR 分别涉及 routed-agent 上下文管理、Telegram 私聊话题支持和 Exa 搜索 provider，功能方向较为清晰。整体来看项目处于“开发活跃、合入停滞”的状态，维护者需要尽快响应积压 Issue 和待审 PR。

## 2. 版本发布

过去 24 小时无新版本 Release，本节从略。

## 3. 项目进展

今日 **没有 PR 被合并或关闭**，代码主线的合入进度暂无新增。但以下 3 个 PR 在今天仍有更新，属于当前在途的重要开发工作：

- [PR #3316: fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316)  
  修复 routed-agent 在 Discord 等渠道中不记忆历史消息、不触发自动压缩的问题，属于 agent 上下文管理核心修复。

- [PR #3315: Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)  
  修复 Telegram 私聊机器人开启 forum topic 模式后无法正确识别话题的问题。

- [PR #3299: Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)  
  为 `tools.web` / `web_search` 增加原生 Exa 搜索 provider，扩展联网搜索能力。

虽然今日无合入，但这三个 PR 持续更新，说明功能开发与修复仍在推进中，后续若完成 review 将显著提升项目能力。

## 4. 社区热点

今日最受关注的讨论集中在两个历史 Issue 上，两者均有 **4 条评论、1 个 👍**：

- [Issue #3281: [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  用户反馈 Web UI 输入框在会话历史稍长后变得非常卡顿，直接影响日常使用体验。

- [Issue #3269: [BUG] If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying to users.](https://github.com/sipeed/picoclaw/issues/3269)  
  用户反馈 MCP server 连接失败会导致 agent 循环挂起，聊天界面停止回复，属于严重的可靠性问题。

这两个 Issue 反映了社区当前最关心的两大痛点：**前端交互性能** 与 **后端 Agent 稳定性**。尤其是 MCP 连接失败导致整个对话不可用，容易让用户对系统产生“不可靠”的印象。

## 5. Bug 与稳定性

今日暂无新增 Bug，但有两个历史 Bug 仍处于未修复状态，且均被标记为 `stale`，按严重程度排列如下：

| 严重程度 | Issue | 问题描述 | 是否有修复 PR |
| --- | --- | --- | --- |
| 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP server 连接失败会导致 agent loop 挂起，聊天界面停止回复 | 无对应修复 PR |
| 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 聊天输入框在历史较长时严重卡顿 | 无对应修复 PR |

其中 #3269 直接影响用户可用性，建议维护者优先排查 MCP 连接失败时的超时与重试逻辑。两个 Issue 均已在 8 月 12 日有评论更新，说明用户仍在等待反馈或解决方案。

## 6. 功能请求与路线图信号

虽然今日没有新的功能请求 Issue，但 3 个在途 PR 释放了明确的路线图信号：

- **搜索能力扩展**：[PR #3299](https://github.com/sipeed/picoclaw/pull/3299) 新增 Exa 原生搜索 provider，说明项目正在增强 `web_search` 工具链的多样性，未来可能支持更多搜索后端。
- **Telegram 话题支持完善**：[PR #3315](https://github.com/sipeed/picoclaw/pull/3315) 补全了私有 bot 聊天中的 topic 处理逻辑，意味着 Telegram 集成正在往更精细的方向迭代。
- **Routed-agent 上下文管理修复**：[PR #3316](https://github.com/sipeed/picoclaw/pull/3316) 修复历史记录、压缩与 summarization 不生效的问题，这是 multi-agent/分发场景下非常关键的基础能力。

这些 PR 若被合入，预计会进入下一版本，提升 PicoClaw 在 Agent 编排、Telegram 场景和搜索能力上的完整度。

## 7. 用户反馈摘要

从过去 24 小时更新的 Issue 评论中，可以提炼出以下真实用户痛点：

- **Web UI 性能瓶颈**：用户反映当单会话历史变长时，输入框出现明显卡顿，说明前端渲染或状态管理可能缺少虚拟滚动、消息裁剪或分页加载机制。
- **MCP 连接失败的后果过重**：MCP server 连接失败后，不是局部报错而是整个 agent loop 挂起，导致聊天界面不再回复。用户期待更健壮的容错机制，至少应该跳过失败节点或自动重试。
- **Stale 状态让用户焦虑**：两个 Issue 都已存在超过 3 周并被标记 `stale`，但用户仍在补充讨论，说明问题未被解决但又未关闭，社区希望得到维护者明确回应。

## 8. 待处理积压

以下 Issue 和 PR 长期未获合入或关闭，建议维护者优先关注：

- [Issue #3281: Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  创建于 2026-07-21，已被标记 `stale`，评论 4 条，无修复 PR。

- [Issue #3269: MCP server connection fails causing agent loop hang](https://github.com/sipeed/picoclaw/issues/3269)  
  创建于 2026-07-20，已被标记 `stale`，评论 4 条，无修复 PR。

- [PR #3299: Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)  
  创建于 2026-07-26，已开放超过 18 天，当前仍待 review 或合入。

- [PR #3316: fix: routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)  
  创建于 2026-08-03，已开放 10 天，仍待 review。

- [PR #3315: Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)  
  创建于 2026-08-03，已开放 10 天，仍待 review。

整体来看，项目社区活跃度尚可，但 Issue 与 PR 的响应速度存在一定滞后，尤其是两个 `stale` Bug 直接影响用户体验，建议维护者在下一轮迭代中优先处理。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-13

## 今日速览

NanoClaw 项目过去 24 小时保持高度活跃：新增 4 个 Issues，提交 10 条 PR 更新（其中 9 条仍待合并，1 条已关闭），无新版本发布。核心团队在 Agent Plugins 架构升级（#3220 系列）上持续推进，同时社区提交了多个质量修复（WhatsApp 收件人校验、Signal DM 一致性、未知斜杠命令处理）与新技能提案（QwenCloud 提供商、add-why 解释技能）。值得关注的是 3 个新 Issue 集中在迁移兼容性与数据一致性问题（agent 组 ID 前缀、旧版任务数据、模板 UUID），提示 2.1.54 版本升级后可能存在回归风险。整体项目健康度良好，但 9 条 PR 待合并的积压量需要维护者关注。

---

## 项目进展

今日项目核心进展体现在 PR 的持续推进与里程碑式架构调整中。

**Agent Plugins 架构升级（重大变更）**：PR #3220 提出将 agent 模板升级为 Agent Plugins 1.0.0 目录结构，该 PR 同时包含安全加固（stamp-time 符号链接/caps/secret 硬化）与格式迁移，属于引擎级变更。配套的 #2909（setup wizard 模板流程与首 agent 印刻）与 #3231（codex/opencode 插件 MCP cwd 支持）均基于此 PR 搭建，形成完整的插件化模板体系。这一系列变更将改变 Agent 模板的存储与加载方式，对现有用户存在迁移要求。

**已合并/关闭 PR**：#3086 修复 WhatsApp 渠道发送消息前未验证收件人是否注册的问题。此前向未注册号码发送消息会返回"成功"+ 看似真实的 platformMsgId，但消息实际未送达，本次修复将消除这一静默失败场景。

**长期悬而未决的修复**：#2689（Signal DM 平台 ID 一致性、isMention 标志与 ask_question/approval 投递）与 #2346（未知斜杠命令应作为普通聊天处理）今日均有更新，但已分别悬置 70 天与 97 天，仍在等待合并。

---

## 社区热点

今日讨论热度集中在以下 PR/Issue：

**#2504 — `ncl status` 健康检查命令提案**（1 条评论，创建于 5 月 15 日，8 月 12 日仍有更新）：用户 alexli-77 提出需要一个轻量级的实例健康状态查看命令。现有工具要么只能查看会话列表但没有健康信号（容器存活？最后消息时间？近期错误？），要么需要外部 dashboard 技能。这是对基础可观测性能力的明确需求，指向 CLI 工具链的易用性改进。

**PR #3220 — Agent Plugins 1.0.0 目录结构**：核心团队主导的引擎级变更，虽然今日评论数为 0，但其"breaking change"性质与 9 条待合并 PR 中的 3 条与之相关，说明该 PR 是当前开发主线的焦点。

**PR #2346 — 未知斜杠命令静默丢弃修复**：该 PR 修复了一个影响使用体验的问题——当用户输入未知的 "/" 命令时，系统将其归类为 passthrough，导致 Agent SDK 把它当作 Claude Code 斜杠命令处理并输出无法解析的内容，最终响应被静默丢弃。这个修复代表了典型的 Agent 交互体验细节改进。

---

## Bug 与稳定性

### 高严重度

**#3233：Agent 作用域的 `ncl tasks` 对 2.1.54 之前的旧版周期性任务失明**（2026-08-12 创建，无 fix PR）：升级到 2.1.54 后，agent 在容器内运行 `ncl tasks list` 返回 "No tasks"，但旧任务实际仍在调度。agent 侧对 `tasks get / pause / resume / cancel / update` 也全部失效。核心问题是迁移过程未将 legacy 任务行 rehome 到新存储结构，影响所有从旧版本升级且使用周期性任务的用户。

### 中严重度

**#3234：模板创建的 agent 组 ID 缺少 `ag-` 前缀**（2026-08-12 创建，无 fix PR）：`ncl groups create --template <ref>` 生成的 agent 组使用裸 `randomUUID()`，而 `--folder` 路径生成 `ag-<uuid>`。由于 agent 组 ID 在 spawn 时被直接用作 OneCLI agent 标识符，以数字开头的裸 UUID 会触发 OneCLI `ensureAgent` 拒绝。这实际是模板功能引入的一致性问题，可能导致部分模板创建的 agent 组无法正常 spawn。

### 低严重度 / 文档问题

**PR #3230（待合并）**：修复技能移除文档仍指向已废弃的 data/env mirror 的链接问题，属文档准确性修复，无行为影响。

---

## 功能请求与路线图信号

**#3232 — 新增 QwenCloud 作为可选提供商技能**（2026-08-12 创建）：请求添加 `/add-qwencloud` 提供商技能，使 NanoClaw 支持通过 OpenAI/Anthropic 兼容 API 使用 Qwen 模型。该项目采用"通过技能模块化支持外部提供商"的思路，与现有产品架构一致，被采纳的可能性较高。若实现，将是扩展推理模型供应商清单的低成本方式。

**#2504 — `ncl status` 命令**（5 月创建，至今仍开放）：健康检查是运维刚需，5 月提出至今未实现，但今日仍有更新，说明用户持续关注。该功能可填补 CLI 在可观测性方面的空白，路线图价值较高。

**PR #3189 — add-why 技能**（8 月 5 日创建，仍待合并）：新增实用工具技能，用于追踪并解释单条消息的处理结果。这类"解释 AI 行为"的能力与项目在 Agent 可观测性方面的需求方向一致。

**PR #3050 — Dial 频道集成**：在频道选择器中加入 Dial 渠道，扩展消息渠道覆盖面，目前仍待合并。

**值得注意的路线图信号**：今日新增的 3 个 Issue（#3234、#3233、#3232）说明 2.1.54 版本发布后，社区正密集反馈迁移与兼容性问题。建议项目组尽快处理 #3233（周期性任务迁移）与 #3234（agent 组 ID 前缀）这两个与版本升级直接相关的回归问题，以免影响用户对版本迭代的信心。

---

## 用户反馈摘要

- **运维可观测性诉求**：#2504 用户指出当前 CLI 缺少实例健康状态入口 — `ncl sessions list` 只显示活跃会话但无健康信号（容器是否存活、最后消息时间、近期错误），`/add-dashboard` 需要外部依赖。这是长期用户对基础运维能力的真实痛点，说明 CLI 在可观测性方面仍需补齐。
- **升级回归困扰**：#3233 用户报告升级到 2.1.54 后，周期性任务在 agent 容器内不可见且无法管理，尽管任务仍在后台调度。"No tasks" 的错误提示对用户产生了严重误导，且 pause/cancel 失败意味着用户无法主动停止正在执行的任务。
- **模板功能一致性问题**：#3234 用户发现 `--template` 与 `--folder` 两种创建路径生成的 agent 组 ID 格式不一致，导致同一功能在不同入口产生不同的结果，这属于工具链中容易被忽视但在实际使用中会产生硬性阻塞的问题。
- **WhatsApp 静默失败**：PR #3086 的修复说明了用户场景中的典型困扰 — 发送到未注册号码时，系统显示"Message delivered"并返回真实的 platformMsgId，但消息实际未送达。这种"假成功"比显式报错更具危害性，因为它让用户无法感知失败。

---

## 待处理积压

**PR #2346 — 未知斜杠命令作为普通聊天处理**（创建于 2026-05-08，已开放 97 天）：修复 agent 静默丢弃未知斜杠命令的问题。该 PR 直接影响用户与 Agent 的日常交互体验（输入 "/xxx" 时响应被静默丢弃），建议优先安排 review。

**PR #2689 — Signal DM 平台 ID 一致性修复**（创建于 2026-06-04，已开放 70 天）：修复 Signal DM 首次消息被静默丢弃、群组未注册、isMention 缺失等问题。这是 Signal 渠道较完整的功能修复，长时间未合并对 Signal 用户影响显著。

**Issue #2504 — `ncl status` 健康检查命令**（创建于 2026-05-15，已开放 90 天）：健康状态查看是开发者运维 NanoClaw 实例的基础需求，至今仍在开放状态，建议确认是否进入路线图。

**PR #2909 — setup wizard 模板流程**（创建于 2026-07-02，已开放 42 天）：作为 #3220 的依赖项，该 PR 的合并进度直接影响 Agent Plugins 系列功能的上线时间。

---

*数据来源：nanocoai/nanoclaw GitHub 仓库 · 数据截至 2026-08-13*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-13

> 数据窗口：2026-08-12 ~ 2026-08-13（24h） | 数据来源：GitHub Issues / PRs / Releases

---

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：41 条 Issue 更新（29 新开/活跃、12 关闭），50 条 PR 更新（31 待合并、19 已合并/关闭），并发布 2 个 RC 版本（v1.2.0-rc.2 / v1.2.0-rc.3）。RC 密集发布表明 **v1.2.0 进入收尾冲刺**，但与此同时 QA 团队在 Railway staging 实例上报出**一组 Telegram 渠道 P1/P2 Bug**（卡死、消息乱序、附件丢失、webhook 不激活等），呈集中爆发态势。此外，WebUI 设计系统 Epic（#7038）和渠道优先引导（#7044）两条长期主线持续推进，对应 PR 仍在活跃开发。整体健康度良好，但发布前的 Telegram/多用户场景稳定性需要重点盯防。

---

## 2. 版本发布

### ironclaw-v1.2.0-rc.3（2026-08-12）

[Release 链接](https://github.com/nearai/ironclaw/releases) | 修复内容：

- **运行时容器镜像安装 curl**。Orchestrator 使用 `curl -fsS http://localhost:3000/` 探活 worker 容器，但镜像未携带 HTTP 客户端，导致健康检查永远无法执行、容器永远无法被标记为就绪。安装 curl 后探活链路恢复。
- **影响范围**：所有部署在 orchestrator 托管环境中的容器实例。升级 rc.3 前，这些实例实际处于"永不就绪"状态，但可能未被表象察觉；升级后健康检查将真实生效，需确保 worker 端口/路径符合探活约定。

### ironclaw-v1.2.0-rc.2（2026-08-12）

[Release 链接](https://github.com/nearai/ironclaw/releases) | 修复内容：

- **Windows 首次启动文件系统发布**：改用原生原子重命名语义（替代硬链接方案），并容忍不支持目录同步的文件系统——解决 Windows 环境下首次启动可能出现的文件发布失败。
- **Release smoke 运行保留 Windows 账户身份**：确保独立 secrets key 的安全存储不受账户身份切换影响。

> ⚠️ **迁移注意**：两个版本均为 RC，未提及破坏性变更；但 rc.3 的 curl 修复是 forward-port 自 PR #7555（详见下文），若你在 release/2026-08-11 分支上部署，建议同步合入该修复。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 内容 | 类型 |
|---|---|---|
| [#7555](https://github.com/nearai/ironclaw/pull/7555) | **fix(docker): 安装 curl 使 orchestrator 健康检查可执行**（对应 rc.3，forward-port 自 #7303） | 发布工程修复 |
| [#7560](https://github.com/nearai/ironclaw/pull/7560) | **fix(release): dist installer 下载失败重试**（解决 rc.3 发布时 cargo-dist 下载 5 次超时问题） | CI/发布修复 |
| [#7550](https://github.com/nearai/ironclaw/pull/7550) | **feat(extensions): 管理配置表单逐字段帮助文案 + Telegram 渠道文档重写** | WebUI/文档 |
| [#7427](https://github.com/nearai/ironclaw/pull/7427) | **release: 准备 1.1.1-rc.1**（backport IronHub/MCP、WebUI、Telegram、Slack 等修复至 1.1 发布线） | 发布线维护 |
| [#5503](https://github.com/nearai/ironclaw/pull/5503) | **[实验] Google 扩展 compact 能力**（Gmail 摘要、日历紧凑读取、Drive 搜索），已关闭 | 功能实验 |
| [#6836](https://github.com/nearai/ironclaw/pull/6836) | **feat(webui): @ironclaw/ui 与 workspace 重构**（从 main 重新推导设计系统，分 5 层 reviewable 提交） | 架构/WebUI |

### 已关闭的重要 Issue（功能/修复落地）

- [#7407](https://github.com/nearai/ironclaw/issues/7407) — **BatchPolicy::Parallel 并行执行**已落地，`invoke_capability_batch` 将真正并发运行多工具调用批次，零模型面改动。
- [#7484](https://github.com/nearai/ironclaw/issues/7484) — **上下文窗口任务驱逐**：pin 用户消息、驱逐时压缩、重新审视 128 条消息上限，已修复。
- [#7485](https://github.com/nearai/ironclaw/issues/7485) — **Token 估算器双倍计数 ASCII**（2 chars/token，实为文档约定的一半），已统一两个估算器。
- [#7302](https://github.com/nearai/ironclaw/issues/7302) — **WebUI 工具调用失败 UI**：改为信息性展示，弱化"攻击性"提示。
- [#5508](https://github.com/nearai/ironclaw/issues/5508) — **Slack 投递目标误报**（旧 issue 关闭，属于 1.1 修复线）。

**整体判断**：v1.2.0 的发布工程链（健康检查、下载重试、backport 机制）已补强，核心 loop 的上下文/估算/并行执行三大效率问题同日收敛，项目在向 1.2.0 稳定版的方向迈出扎实一步。

---

## 4. 社区热点

> 注：多数 PR 未展示评论数，热点分析以 Issues 评论为主要依据。

| Issue | 标题 | 评论数 | 状态 |
|---|---|---|---|
| [#7360](https://github.com/nearai/ironclaw/issues/7360) | Expand stress coverage across built-in and durable write paths | 3 | OPEN |
| [#7407](https://github.com/nearai/ironclaw/issues/7407) | Execute BatchPolicy::Parallel capability batches concurrently | 3 | CLOSED |
| [#7554](https://github.com/nearai/ironclaw/issues/7554) | Custom MCP server add flow shows validation error | 1 | OPEN |
| [#7517](https://github.com/nearai/ironclaw/issues/7517) | Cloud.near.ai: allow staking path for Google/GitHub sign-ins | 1 | OPEN |

**热点分析**：

- **#7360（压力测试覆盖缺口）** 是今日讨论度最高的 open issue。作者指出 nightly API-capacity 压测的 mock 模型从不返回工具调用，导致 built-in 能力写路径的回归无法被压测发现。社区关注点在于**测试基础设施的可信度**——没有工具调用覆盖，性能回归将悄悄溜进发布。
- **#7407（并行批次执行）** 在 issue 关闭后仍有讨论，表明用户对多工具调用延迟敏感，期待该修复实际改善 agent 回复速度。
- **#7554（自定义 MCP 服务器无法添加）** 来自真实用户反馈（Slack #x-ai-product-feedback），"validation error" 阻断核心扩展流程，对 power user 影响直接，反应了 **MCP 生态接入的顺滑度**是当前用户核心诉求。
- **#7517（Google/GitHub 登录无法 staking）** 反映 NEAR 生态特有的诉求：Web2 登录用户被排除在 staking 通道之外，社区希望 Web3 身份能与 Web2 登录共存。

---

## 5. Bug 与稳定性

> 按严重程度排列（P1 = 阻断/卡死，P2 = 功能异常但可绕过，P3 = 体验问题）。所有 Bug 均来自 QA 在 Railway staging 实例上的测试。

### P1（阻断）

| Issue | 标题 | 状态 |
|---|---|---|
| [#7538](https://github.com/nearai/ironclaw/issues/7538) | **Telegram 收到 GIF/sticker 后 agent 完全卡死**，后续所有文本消息均无响应 | OPEN，无 fix PR |
| [#7536](https://github.com/nearai/ironclaw/issues/7536) | **多用户共享流程断裂**：Admin UI 创建的用户收到邀请邮件，但打开 UI 报 "Invalid secret"，无法确认是邀请过期/绑定错误/密钥轮换问题 | OPEN，无 fix PR |
| [#7535](https://github.com/nearai/ironclaw/issues/7535) | **Telegram webhook 保存不激活**：必须完整 redeploy 才生效，期间出现 "Forbidden [nearai-prod cfd5eb33]" 错误 | OPEN，无 fix PR |

### P2（功能异常）

| Issue | 标题 | 状态 |
|---|---|---|
| [#7541](https://github.com/nearai/ironclaw/issues/7541) | Telegram 无法发送生成的附件，给出本地路径而非真实发送 | OPEN，无 fix PR |
| [#7539](https://github.com/nearai/ironclaw/issues/7539) | Telegram 消息显示顺序错乱，用户消息出现在 agent 工作状态之后 | OPEN，无 fix PR |
| [#7540](https://github.com/nearai/ironclaw/issues/7540) | Telegram 长消息被拆分后只处理第一段，其余被 "still working" 拒绝 | OPEN，无 fix PR |
| [#7451](https://github.com/nearai/ironclaw/issues/7451) | Telegram 下 agent 偶尔要求用户提供 API Key，即使请求本不需要凭据 | OPEN，无 fix PR |
| [#7542](https://github.com/nearai/ironclaw/issues/7542) | Agent 不识别对话已发生在 Telegram，仍问"要不要发到你的 Telegram" | OPEN，无 fix PR |
| [#7545](https://github.com/nearai/ironclaw/issues/7545) | 查询多币种价格时 agent 误称无实时数据工具，尽管有通用 HTTP 能力 | OPEN，无 fix PR |
| [#7544](https://github.com/nearai/ironclaw/issues/7544) | Agent 将内部推理/规划步骤直接输出给用户 | OPEN，无 fix PR |
| [#7543](https://github.com/nearai/ironclaw/issues/7543) | Telegram 定时 routine 首次执行成功但消息未投递 | OPEN，无 fix PR |
| [#7508](https://github.com/nearai/ironclaw/issues/7508) | GitHub MCP 扩展启动提示 endpoint 验证困惑（"已注册"却又要求验证） | OPEN，无 fix PR |

### P3 / 基础设施

| Issue | 标题 | 状态 |
|---|---|---|
| [#7546](https://github.com/nearai/ironclaw/issues/7546) | Telegram sticker 被静默忽略，agent 无任何反应 | OPEN，无 fix PR |
| [#7547](https://github.com/nearai/ironclaw/issues/7547) | **Instance 升级在 egress apply 阶段失败**（agent-stg.near.ai，镜像已切换但 egress 报 "egress apply failed"） | OPEN，无 fix PR |

### 已有 fix PR 的关联项

- **容器健康检查**（关联 rc.3）：PR [#7555](https://github.com/nearai/ironclaw/pull/7555) 已合并，修复 orchestrator 探活失败的根本问题。
- **不可用 capability 调用中断运行**：PR [#7551](https://github.com/nearai/ironclaw/pull/7551) 已提交（OPEN），移除提示文本层的能力拦截，将越权调用视为一次性可修复的模型输出，避免整个 run 被 abort。
- **CI 下载失败**：PR [#7560](https://github.com/nearai/ironclaw/pull/7560) 已合并，为 dist installer 增加重试。

**趋势总结**：今日 Bug 高度集中在 **Telegram 渠道**（9 条相关），建议维护者将 Telegram 集成层（含 webhook、消息分段、媒体处理、渠道身份识别）列为 1.2.0 发布阻断项。

---

## 6. 功能请求与路线图信号

| Issue/PR | 标题 | 信号强度 | 判断 |
|---|---|---|---|
| [#7537](https://github.com/nearai/ironclaw/issues/7537) | feat(llm): 通用 per-request thinking/effort 控制（DeepSeek V4 Flash 触发） | ★★★ | 已有明确 issue 规划 provider-native mapping，属 v1.2/后续版本的高优功能 |
| [#7517](https://github.com/nearai/ironclaw/issues/7517) | Cloud.near.ai 允许 Google/GitHub 登录后 staking | ★★☆ | 用户明确诉求，需产品决策：是否将 NEAR 钱包作为"第二身份附加"而非独立登录 |
| [#7044](https://github.com/nearai/ironclaw/issues/7044) + [#6993](https://github.com/nearai/ironclaw/issues/6993) | 渠道优先 onboarding 引导（Epic + 后端 wiring） | ★★☆ | 已有设计原型 PR #6994，backend 接线为 Phase-1 待办，方向确定 |
| [#7038](https://github.com/nearai/ironclaw/issues/7038) + [#7042](https://github.com/nearai/ironclaw/issues/7042) | Storybook + AI-first Design System（Epic + Phase 2 治理） | ★★☆ | Phase 3 参考 PR [#7558](https://github.com/nearai/ironclaw/pull/7558) 今日已出（@ironclaw/ui 脚手架），路线清晰 |
| [#7520](https://github.com/nearai/ironclaw/issues/7520) | Epic: 退役过时/不可达的 WebUI 前端界面 | ★☆☆ | 清理型 epic，方向务实，不阻塞主功能 |
| [#7360](https://github.com/nearai/ironclaw/issues/7360) | 压力测试覆盖 built-in 与持久化写路径 | ★★☆ | 测试基建增强，社区讨论度高，但未见对应 PR |

**路线图判断**：v1.2.0 大概率聚焦 Telegram 渠道稳定性 + LLM thinking 参数透传；设计系统与 onboarding 属 v1.3.0 的并行主线，今日 Phase 3 脚手架 PR 说明该线在按计划推进。

---

## 7. 用户反馈摘要

**Telegram 渠道的用户体验是当前最大痛点**。从 QA 报告（#7538、#7541、#7542、#7543）可以拼出使用场景画像：用户期望 Telegram 是一个**完整的、可靠的交互通道**——能发文件、能收媒体、能保持对话顺序、能正确识别渠道。现实是：

- "Agent 分不清自己在哪个渠道"（#7542）让用户感到困惑——它明明在 Telegram 里，却问要不要把结果发到 Telegram；
- "生成了文件但只给路径不给附件"（#7541）违背了移动端用户对 Telegram 的预期；
- "一个 GIF 就能让 agent 永久卡死"（#7538）属于不可接受的稳定性问题。

**WebUI 的微摩擦仍在累积**：
- 用户对"Reconnecting"提示感到困惑（#6541），即使 agent 工作正常，通知也造成焦虑；
- 工具调用失败提示被用户评为"攻击性外观"（#7302），虽然 agent 已恢复，UI 仍造成负面感受。

**多用户协作流程**（#7536）暴露了 Admin UI 的信任链问题：邀请邮件/令牌 → UI 打开的链路里，"Invalid secret" 指向不明，管理员无法自行诊断是令牌过期、绑定错误还是密钥轮换导致。这是团队/企业用户的**协作前置条件**，建议补充错误详情与自助排查路径。

**正面信号**：此前长期存在的 Slack 投递目标误报（#5508，7 月 1 日提出）已关闭；WebUI 重连（#6541）已关闭；token 估算器双倍计数问题（#7485）已修复——说明老问题在逐步消化，用户的耐心是有回报的。

---

## 8. 待处理积压

> 已超 3 天无更新的关键项，按优先级排列。

| 项目 | 创建时间 | 最后更新 | 备注 |
|---|---|---|---|
| [#7383](https://github.com/nearai/ironclaw/issues/7383) tool_disclosure_port.rs 分解跟踪（4.4k 行） | 08-07 | 08-12 | 架构规则要求 >3000 行文件分解跟踪，5 天无实质推进，存在架构债风险 |
| [#7044](https://github.com/nearai/ironclaw/issues/7044) Onboarding 渠道优先 Epic | 08-03 | 08-12 | 大规模新用户引导改造，Phase 1 原型 PR #6994 已开 12 天未合 |
| [#6993](https://github.com/nearai/ironclaw/issues/6993) OOBE 后端 wiring | 08-01 | 08-12 | 等待 #6994 合并，后端部分可先行准备，12 天无拆分进展 |
| [#7038](https://github.com/nearai/ironclaw/issues/7038) 设计系统 Epic（Storybook + theming + IA） | 08-03 | 08-12 | Phase 1–3 各有 PR 在推进，但 Epic 本身已 10 天未更新里程碑 |
| [#5508](https://github.com/nearai/ironclaw/issues/5508)（已关闭） | 07-01 | 08-12 | 生命周期 42 天，暴露了 QA → 修复链路周期过长的问题（虽已闭环） |

**提醒**：#7383 属于架构规则强制的跟踪项，建议分配给 loop-host 模块 owner 尽快排期；#7044/#6993 是整条 onboarding 主线的咽喉，PR #6994 已在 review 阶段，若设计评审未达成共识，请在 issue 内注明阻塞点，避免社区等待失焦。

---

*本日报基于公开 GitHub 数据自动生成，不构成任何投资或产品建议。数据窗口为 UTC 2026-08-12 至 2026-08-13。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 2026-08-13 LobsterAI 项目动态日报

## 1. 今日速览
过去24小时 LobsterAI 保持中等偏上的开发活跃度：共 8 条 PR 更新，其中 7 条已合并/关闭（合并率 87.5%），仅 1 条老 PR（#1181，已搁置 4 个月）仍待合并；Issue 侧 6 条更新中 4 条活跃、2 条关闭，但全部为 3-5 月创建的老 Issue 被机器人标记为 `stale`，无新问题涌入。无新版本发布。整体来看，项目正处于稳定的迭代期，核心工作集中在渲染层 UI 优化、插件安装稳定性与 macOS/Windows 跨平台适配，但社区端的信任类问题（强制沙箱、卸载残留）值得关注。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日有 7 个 PR 被合并/关闭，主要推进了以下方向：

- **模型选择器细化** — PR #2475 让每个模型独立保存"思考强度"设置，修复了多个模型之间互相覆盖的问题，属于能直接提升日常使用体验的修复。
- **Windows 插件安装稳定性** — PR #2479 修复 Windows 插件安装时因跨卷操作导致 `EPERM` 符号链接失败的问题，通过"暂存-原子重命名"策略保留依赖的 junction，对 Windows 用户的插件生态健康有实质帮助。
- **跨平台兼容性修复** — PR #2478 修复 macOS/Windows 上 `app.getFileIcon` 不支持 `'large'` 尺寸导致的图标提取失败，属 Electron 平台差异的务实修复。
- **渲染层 UI 重构** — PR #2482（技能管理器拆分"我的/内置"标签页）与 PR #2481（任务搜索移入头部操作，统一 macOS/Windows 外观）合并，UI 交互进一步收敛。
- **发布管线** — PR #2480 为 `2026.8.12` 发布分支，已合并，但未产出新 Release（可能为内部预发布）。

另有老 PR #1233（模型提供商官网链接和 API Key 引导）因长期未合并被标记 stale 后关闭。

## 4. 社区热点
今日无新开 Issue，讨论热度集中在两个老问题上，均为用户信任类话题，评论互动最多：

- **Issue #1179 — "3.31版本强制沙箱怎么关？"**（评论 2，活跃中）：用户对午夜自动更新后被强制开启沙箱表示强烈不满，明确要求关闭入口或配置文件，并称"回滚3.30正常"。这反映了自动更新策略对用户控制权的侵蚀，是典型的用户反抗型诉求。
- **Issue #1173 — "卸载之后程序还能运行？？"**（评论 1，活跃中）：用户卸载后 LobsterAI 仍能运行并给飞书发消息，直接质问是否留后门。该问题涉及用户数据安全和信任底线，虽然大概率是"卸载不杀进程"的常规缺陷，但措辞激烈，需要维护者正面澄清和修复。
- **PR #2481 / #2475** 是今日少数有实质功能改进的合并，但评论区无用户互动，开发侧活跃而社区侧相对安静。

## 5. Bug 与稳定性
今日报告的 Bug 均为存量 Issue 的 `stale` 触碰，无新 Bug；已合并的 PR 中有 3 个是稳定性修复。按严重程度排列：

| 严重程度 | 问题 | 状态 | 是否已有 Fix PR |
|---|---|---|---|
| **高** | Issue #1180 — 修改自建 agent 图标会触发网关反复重启，删除 agent 后恢复 | OPEN，4 个月未响应 | 无 |
| **高** | Issue #1173 — 卸载后 LobsterAI 进程仍存活且可操作（用户怀疑后门） | OPEN，4 个月未响应 | 无 |
| **中** | Issue #1179 — 强制沙箱无法关闭，用户被迫回滚 3.30 | OPEN，4 个月未响应 | 无 |
| **低** | Issue #1236 — 插件 entry key 与 manifest ID 不匹配，每次启动有警告 | CLOSED（stale） | 无公开 fix，可能是配置层问题 |
| **已修复** | PR #2479 — Windows 插件安装跨卷符号链接失败 | 已合并 | ✅ |
| **已修复** | PR #2478 — macOS/Windows 大图标提取崩溃 | 已合并 | ✅ |
| **已修复** | PR #2475 — 模型思考深度全局互斥覆盖 | 已合并 | ✅ |

## 6. 功能请求与路线图信号
- **Issue #1174 — 支持多个自定义模型提供商**：用户希望同时保留多个自定义模型提供商（而非只能有一个），这是明确的路线图信号。结合今日合并的 PR #2475（模型独立性），说明模型管理正在向"每个对象（agent/模型/会话）持有独立配置"的方向演进，**多个自定义提供商** 很可能在后续版本中实现。
- **Issue #1179 — 沙箱功能可配置化**：用户强烈要求能显式关闭强制沙箱，这指向一个核心设计问题——安全功能需要提供"禁用途径"和"迁移指南"，否则会被视为强制绑架。
- **PR #2482（技能管理器拆分标签页）** 与 **PR #2481（侧边栏搜索入口调整）** 表明团队在持续打磨渲染层交互细节，短期内路线图可能偏向 UI/UX 优化而非大功能革新。

## 7. 用户反馈摘要
从今日活跃的 Issues 评论中提炼：

- **对自动更新 + 强制功能（沙箱）非常反感**：#1179 用户明确表示"半夜更新"、"找不到关闭按钮"、被迫回滚，这种"不打招呼就改变行为"的方式是用户不满的主要来源。
- **对隐私/后门高度敏感**：#1173 用户用"偷偷留后门准备操控电脑"这种强烈措辞，即使真实原因是进程未随卸载退出，也说明用户对 Electron 类应用的生命周期管理信任度很低，需要快速响应和安抚。
- **对插件生态的宽容度较高**：#1236 用户对插件 ID 不匹配仅描述为"配置警告"，更希望日志更干净而非功能受阻，说明插件体系整体可用。

## 8. 待处理积压
以下为长期未响应的关键项，提醒维护者优先关注：

- **PR #1181（OPEN，4 个月）— fix(cowork): hide OpenClaw main agent sessions from session list**：这是一个重要的数据隔离修复（将内部 heartbeat/cron 会话从用户会话列表中隐藏），技术方案已完整（增加 `hidden` 列），但自 4 月 1 日起一直未被合并。建议尽快 review 并合入，避免与后续 schema 变更冲突。
- **Issue #1173（OPEN，4 个月）— 卸载后程序仍运行**：涉及用户信任底线，若属实建议热修；若为误报也需官方说明，避免负面口碑发酵。
- **Issue #1174（OPEN，4 个月）— 支持多个自定义模型提供商**：用户需求明确且场景合理，建议纳入路线图或至少回应后续版本规划。
- **Issue #1180（OPEN，4 个月）— 修改 agent 图标触发网关重启**：严重度较高却无任何维护者响应，属于"沉默的炸弹"。

---

*数据来源：LobsterAI GitHub 仓库（netease-youdao/LobsterAI）*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-13

> 数据来源：CoPaw（GitHub 仓库当前显示为 [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)）· 统计窗口：2026-08-12 ~ 2026-08-13

---

## 1. 今日速览

过去 24 小时项目保持**高度活跃**：30 条 Issue 更新（新开 23 / 关闭 7）、44 条 PR 更新（待合并 28 / 合并关闭 16），并发布 **v2.1.0-beta.4** 新版本。社区反馈集中指向两个稳定性矛盾——**多步骤任务中途静默停止**（#6921）与**升级后工具配置丢失**（#6957），此外出现一个**插件安全漏洞**报告（#6916，可静默创建定时任务）。开发侧响应积极：针对 #6839（MCP 参数类型）、#6883（日记分组）、#6826（消息时间）的修复 PR 均已提交，但**修复 #6813 的 PR #6816 今日被回退**，提示聊天标题生成问题仍在反复。整体看，项目功能迭代与修复节奏强劲，但稳定性和安全模型仍需加固。

| 指标 | 数值 | 说明 |
|---|---|---|
| Issues 更新 | 30 条 | 新开/活跃 23，已关闭 7 |
| PRs 更新 | 44 条 | 待合并 28，已合并/关闭 16 |
| 新版本 | 1 个 | v2.1.0-beta.4 |
| 关键回归 | 1 起 | #6816 修复被回退 |

---

## 2. 版本发布

### v2.1.0-beta.4（2026-08-12/13 发布）

**更新内容**（来自 [Release Note](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4)）：

- **fix(files)**：修复文件预览及暗色模式样式问题 — [PR #6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)
- **fix(tools)**：修正 `read_file` 工具的描述文本 — [PR #6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)
- **chore**: 将版本号提升至 2.1.0b4

**破坏性变更**：无声明。

**迁移注意事项**：

- 用户报告在升级后**工具页面的插件/API 配置需要重新配置**（[Issue #6957](https://github.com/agentscope-ai/QwenPaw/issues/6957)），beta 阶段配置持久化不稳定，建议升级前备份配置文件。
- 已知问题：多步骤任务自动停止（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）在 beta.4 中**未标记为已修复**，请用户知悉。

---

## 3. 项目进展

今日合并/关闭的 16 条 PR 中，值得注意的推进包括：

### ✅ 已合并/关闭

| PR | 内容 | 意义 |
|---|---|---|
| [PR #6913](https://github.com/agentscope-ai/QwenPaw/pull/6913) | **fix(computer-use)**：改进 macOS 元素激活逻辑 | 修复 macOS 上下文菜单打开时窗口被抬起导致菜单关闭的问题，对 Mac 用户是实际体验提升 |
| [PR #6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) | **fix(agents)**：在模型调用前清理工具消息 | 解决孤儿工具结果导致的 OpenAI 兼容接口报错（#6407） |
| [PR #6944](https://github.com/agentscope-ai/QwenPaw/pull/6944) | chore：更新 v2.1.0 release notes | 为正式版做准备 |
| [PR #6956](https://github.com/agentscope-ai/QwenPaw/pull/6956) | **Revert** "fix(chats): handle dict-like model responses (#6813)" | **回归事件**：回退了 8 月 8 日的 #6816 修复，聊天标题生成 KeyError 问题可能重新出现 |

### ⚠️ 待关注

- [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) 的合并提交被回退（`021f35f`），原因未公开说明。该修复解决的是 agentscope 2.x ChatResponse 字典子类导致的 `KeyError: '__aiter__'` 问题。回退后，**聊天自动标题生成功能存在回归风险**，相关用户（#6813）可能需要留意。

### 📌 尚未合并的关键 PR（高价值，处于 review 中）

- [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938) — 修复 #6826 助手消息完成时间显示（"狄仁杰·Repairer" 提交，标记 ready-for-human-review）
- [PR #6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) — 修复 #6839 MCP 工具字符串参数被当数值传参的问题
- [PR #6941](https://github.com/agentscope-ai/QwenPaw/pull/6941) — 修复 #6883 日记页面子文件夹笔记日期分组错误，并附带重写 Files workspace 博客（[#6950](https://github.com/agentscope-ai/QwenPaw/pull/6950)）

**总体判断**：项目在 macOS 桌面端、工具消息清洗、发布流程自动化上取得实质进展；3 个用户报告问题的修复已进入合入通道，预计未来 1-2 天内可并入 main。

---

## 4. 社区热点

今日讨论最活跃的 Issue 呈现"**任务执行可靠性**"和"**记忆系统可信度**"两大主题：

### 🔥 热度最高

**[#6921] 多步骤任务经常无提示静默停止，需用户说"继续"才继续**（5 评论）
[GitHub Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)

- 现象：模型输出 "Now 2.1, 3.1, 3.2. Let me do all three." 后即停止，无任何错误提示
- 影响：Windows 11 + 2.1beta2，多步骤长任务场景高频出现
- 社区诉求：**任务规划与执行之间缺少衔接机制**，规划后应自动继续执行，而非等待用户二次确认

**[#6853] prompts.py 对 Agent "撒谎"：Dream 流程从未实现将摘要写入 MEMORY.md**（5 评论）
[GitHub Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)

- 现象：代码注释声称 Dream 会自动同步向量摘要至 MEMORY.md，但实际追踪 ReMe pipeline 发现未实现
- 意义：**记忆系统文档/提示词与真实行为不一致**，导致 Agent 对自身记忆能力的认知存在偏差
- 已有修复 PR：[#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942) 已提交，简化记忆提示词，避免暴露内部存储细节，Closes #6853

### 💬 其他活跃讨论

- **[#6780] 2.0.1 版闲置数十分钟后卡死**（4 评论）— 与 #6921 同为"自主性/稳定性"问题，询问是否有心跳保活机制
- **[#6928] 历史消息无法向上滚动 + 输入栏编辑覆盖后续文本**（4 评论）— 2.1.0.B3 的 UI 回归类问题
- **[#6839] MCP 工具调用将数字字符串以数字格式传参导致失败**（4 评论）— 开发者集成真实场景受阻，已有修复 PR #6936
- **[#6826] 助手消息结束时间显示异常**（4 评论）— 2.0.1 版本，实际思考 2 分钟 UI 显示仅几秒，已有修复 PR #6938

**分析**：社区主要矛盾集中在 Agent **任务执行的自主性**上——规划完成后应自动继续执行而非停止等待；其次是**前端时间显示与真实耗时严重不符**，影响用户对系统状态的判断。

---

## 5. Bug 与稳定性

按严重程度排序（🔴 高 = 阻断/安全 / 🟠 中 = 功能受损 / 🟡 低 = 体验问题）：

### 🔴 高严重度

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件可静默创建 cron 任务并向 agent 会话注入用户可见消息，无需任何用户确认 | OPEN · 安全 | 无 |
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步骤任务规划后静默停止，需用户说"继续"才继续 | OPEN · 2.1beta2 | 无 |
| [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | 网络短时中断恢复后无法自动重连，需重启进程 | OPEN · 2.0.1 | 无 |

### 🟠 中严重度

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6957](https://github.com/agentscope-ai/QwenPaw/issues/6957) | 每次升级后工具页配置需重新配置 | OPEN · 2.0.1b3 | 无 |
| [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | 概率性启动报错、进程崩溃（Windows/pip 安装） | OPEN · 2.0.1 | 无 |
| [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前聊天记录不可见 | OPEN · 2.1 | 无 |
| [#6927](https://github.com/agentscope-ai/QwenPaw/issues/6927) | 调用多个子 agent 执行任务时反复陷入死循环 | OPEN · 2.1beta3 | 无 |
| [#6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) | 历史消息无法滚动查看 + 输入栏编辑覆盖后续内容 | OPEN · 2.1.0.B3 | 无 |
| [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) | Inter-agent 消息会为每条消息创建新的 agent session（影子实例） | OPEN · 2.1 | 无 |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 工具被调用时将数字型字符串以数字传参（如 apiKey） | OPEN · 2.0.1 | [PR #6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) 已提交 |
| [#6948](https://github.com/agentscope-ai/QwenPaw/issues/6948) | 管理后台对话时间显示为 UTC 而非用户配置时区 | OPEN · 新 | 无 |

### 🟡 低严重度（今日已有关闭）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面子文件夹内笔记被错误分组到错误的日期下 | OPEN | [PR #6941](https://github.com/agentscope-ai/QwenPaw/pull/6941) 已提交 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息结束时间显示异常 | OPEN | [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938) 已提交 |
| [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) | `KeyError: '__aiter__'` 聊天标题生成失败 | CLOSED | ⚠️ [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) 的修复**已回退** |
| [#6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) | sync.py 使用随机 AgentState UUID 而非真实 session_id 导入历史，18-50% 行成为孤儿数据 | CLOSED | 关闭，原因未标注 |

**稳定性总结**：今日有 2 个 Bug 被关闭（#6813、#6926），但 #6813 的修复被回退意味着该问题**仍存在复发可能**。3 个高严重度问题（安全注入、任务静默停止、网络恢复）均无对应修复 PR，建议维护者优先排期。

---

## 6. 功能请求与路线图信号

社区今日提出了 6 项功能建议，结合已有 PR 判断路线图方向：

### 有 PR 支撑的方向（已进入开发管线）

| Issue/PR | 需求 | 状态/信号 |
|---|---|---|
| [PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) | **原生 DataPaw 应用运行时与持久化分析工作区**（feat(pawapp)） | 新 PR · 首个提交者，功能级别为**新应用**，配套 [QwenPaw-Data infra repo](https://github.com/agentscope-ai/QwenPaw-Data/) |
| [PR #6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) | **新增 MiniMax TTS 支持**（feat(channels)） | 新 PR · 扩展 SIP 频道语音能力，有待合入 |
| [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | **per-session model overrides（单会话模型覆盖）** | 7 月 12 日提交，仍在 Under Review |
| [PR #5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) | **在所有 UI 的斜杠命令自动补全中暴露系统命令** | 7 月 8 日提交，仍在 Under Review |

### 无对应 PR 的路线图信号

| Issue | 需求 | 潜在归属 |
|---|---|---|
| [#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917) | Agent 应能将任意报告/消息主动投递至收件箱（Inbox），不限于 cron/heartbeat 任务 | 核心 Agent 能力扩展 |
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) | 多智能体协作应在**同一个会话窗口**中展示，避免每次创建新会话 | Agent 协作 UX 重构 |
| [#6929](https://github.com/agentscope-ai/QwenPaw/issues/6929) | 项目-对话-文件夹层级：以文件夹为对话基础（参照 codex/trae），支持选中内容添加到对话 | 工作区 UX 重构 |

**判断**：DataPaw 原生运行时（#6940）是一个值得关注的重大方向，暗示 CoPaw 正从"通用 agent 框架"走向"数据/分析场景专用应用"。社区对**单窗口多 Agent 协作**的呼声上升，预计后续版本可能调整协作交互模式。per-session 模型覆盖（#5992）已近 1 个月未合入，可能需要 maintainer 明确态度。

---

## 7. 用户反馈摘要

从今日 Issue 评论和标题中提炼的真实用户声音：

### 核心痛点

1. **任务自主性不足**（多用户共鸣）
   - "规划好下一步就停止了，没实际开始干也无任何视觉可见的提示" — [rerbin #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)
   - "不知道为什么，他们协作对话一次创建一次新的会话" — [cmhaoso #6925](https://github.com/agentscope-ai/QwenPaw/issues/6925)

2. **稳定性与安全顾虑**
   - "经常会被杀软拦截，甚至强制关停 QwenPaw 进程，WorkBuddy 不会" — [cmhaoso #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)
   - "不使用时几十分钟后自己卡死，只能关闭进程重新启动" — [sunnnnnnner #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780)

3. **升级体验断层**
   - "每次更新版本之后，之前给 agent 在工具设置页面配置过的就要重新配置一次" — [henryliuwork #6957](https://github.com/agentscope-ai/QwenPaw/issues/6957)

4. **配置自由度收紧**
   - "2.0.x 之后自定义频道在交互配置菜单的入口被限制为仅内置渠道" — [zcmk123 #6924](https://github.com/agentscope-ai/QwenPaw/issues/6924)
   - "web 端自定义配置的限制有点多，只能简单出现输入框" — 同上

### 积极信号

- 用户 [xiaohushi512 #6929](https://github.com/agentscope-ai/QwenPaw/issues/6929) 提出了基于文件夹的对话、内容选区添加等具体工作区改进建议，表明用户**正在深度使用并期待更细致的文件工作流**
- 用户 [oitsukiii #6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) 使用 agent 代笔提交 issue，中英文双语备注——说明 CoPaw 生态内已有用户**自发使用 agent 驱动开发协作**，是项目粘性的体现
- 用户对 `scroll` 压缩策略下聊天记录不可见的问题（[#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)）描述专业、定位准确，显示社区技术水平整体较高

---

## 8. 待处理积压

以下 Issue/PR 长期未获得维护者响应或处于停滞状态，建议优先关注：

### ⏳ PR 积压（跨两周以上未合入）

| PR | 标题 | 提交日期 | 停留时间 | 备注 |
|---|---|---|---|---|
| [PR #5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) | feat(console, tui): 暴露系统命令到斜杠自动补全 | 2026-07-08 | **>5 周** | first-time contributor，Under Review |
| [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | Add per-session model overrides | 2026-07-12 | **>4 周** | 功能型需求，Under Review |
| [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) | fix(acp): 修复通知与 prompt 响应竞争时丢字问题 | 2026-08-01 | 12 天 | 修复 #6625，Under Review |
| [PR #6818](https://github.com/agentscope-ai/QwenPaw/pull/6818) | fix(summary): 遵守 disable_thinking 和打断状态 | 2026-08-08 | 5 天 | Under Review |

### ⚠️ 长期未解决的高价值 Issue

| Issue | 标题 | 创建日期 | 重要性 |
|---|---|---|---|
| [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 闲置后卡死，需重启 | 2026-08-07 | 高 · 稳定性和保活机制 |
| [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) | QwenPaw 被杀软拦截强制关停 | 2026-08-09 | 高 · 需要排查进程行为可疑原因 |
| [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件可静默创建 cron 任务并注入消息 | 2026-08-11 | **高 · 安全模型缺陷**，未有回应 |

### 📋 特别提醒

**安全漏洞 #6916**（插件权限模型缺口）是今日唯一的高风险安全类 Issue，涉及应用市场供应链信任边界。在插件生态扩张的背景下，建议维护者在下一个版本前给出权限模型补强方案（如增加装插件时的权限声明确认、cron 执行的二次授权等）。

---

**日报小结**：CoPaw 项目仍处于高速迭代期（beta.4 发布+30 条 Issue 更新+44 条 PR 更新），修复与功能管线并行，Health 总体良好。但需警惕三重风险：**回退事件 #6816 造成的回归**、**安全模型缺口 #6916 的悬置**、**多步任务静默停止 #6921 的高频用户抱怨**。若三日内能合入 #6936、#6938、#6941 三个修复 PR 并回应对讲 #6916，项目将明显向稳定方向倾斜。

---

*本报告由 AI 分析师自动生成，数据截止 2026-08-13。所有链接均指向 GitHub 原始讨论，可点击查看详情。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时项目保持高活跃度：50 条 Issue 更新（新开/活跃 45，关闭 5）、50 条 PR 更新（待合并 30，合并/关闭 20），无新版本发布。今日合并/关闭的 PR 集中于安全加固（浏览器截图路径逃逸修复、MCP 访问策略集中化）与运行时健壮性（终端标记泄漏、微信游标持久化时序），表明项目处在一个"安全与稳定性优先"的收敛阶段。但多个高优先级问题仍未关闭：Windows 平台 74 个测试失败（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）、web_fetch 压缩响应乱码（[#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)）、Windows 安装器无法启动（[#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)）等 S1/S2 问题悬而未决。整体健康度良好，唯需优先处理 Security CI 阻断（[#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)）及维护者决策积压。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并 PR 共 20 条，可见的重要变更集中在以下方向（含两对"旧版方案被新版取代"的同日关闭）：

**安全加固**
- [PR #9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) fix(browser): validate screenshot destination path against workspace policy — 修复浏览器工具 `screenshot` 动作的任意文件写入逃逸漏洞（高危，原先完全没有 `is_path_allowed`/`resolve_tool_path` 校验）；同日关闭的 [PR #8741](https://github.com/zeroclaw-labs/zeroclaw/pull/8741) 为该修复的早期版本，确认以 #9362 为最终合入方案。
- [PR #8496](https://github.com/zeroclaw-labs/zeroclaw/pull/8496) fix(tools/mcp): centralize deferred-MCP access policy — 将延迟 MCP 访问策略集中为单一事实来源，修复 [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) Surface 1(b) 的策略遗漏。

**运行时健壮性**
- [PR #9695](https://github.com/zeroclaw-labs/zeroclaw/pull/9695) fix(runtime): strip terminal markers from streaming and non-streaming responses — 修复 `<eom>`/`<|eom|>` 终端标记泄漏到响应文本、实时 `TurnEvent::Chunk`、持久化历史及下游渠道的问题（[#9006](https://github.com/zeroclaw-labs/zeroclaw/issues/9006)）；旧版 [PR #9037](https://github.com/zeroclaw-labs/zeroclaw/pull/9037) 同日关闭，由本 PR 取代。
- [PR #9956](https://github.com/zeroclaw-labs/zeroclaw/pull/9956) fix(wechat): persist sync cursor only after inbound batch is enqueued — 修复微信渠道在批量消息入队前即持久化游标、崩溃时可能丢消息/重复拉取的风险窗口（当日创建当日关闭，推进迅速）。

整体来看，项目今日完成了一轮"高危漏洞修复 + 渠道可靠性补强"，为 30 个待合并 PR（Hailo-Ollama 支持 [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)、Langfuse 观测 [#9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556)、凭据轮换 [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) 等）清出了合入通道。

## 4. 社区热点

- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)（14 评论，p1，accepted）— **Windows 平台 74 个测试失败**。今日最热议题：测试套件在 Windows 11 简体中文环境（代码页 936）下大面积失败，根因包括 Unix-only 测试命令、路径语义、控制台编码；CI 仅跑 Linux 因此长期未被拦截。背后诉求直指跨平台 CI 支持（关联 [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)）。
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（13 评论，tracker）— **维护者决策队列**。社区对 RFC/设计 Issue 长期得不到裁决表达关注，要求建立 issue 级决策队列，明确接受/拒绝/推迟流程。
- [Issue #8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)（9 评论，p2，accepted）— **插件自有 Kanban 看板**。面向 Agent 工作协调的看板 RFC，提议"插件拥有卡片语义、宿主提供通用能力"的分层架构，讨论度高。
- [Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)（9 评论，p1，accepted）— **发布签名机制整合**。v0.8.3 同时使用三套并行签名/溯源机制（cosign、GitHub Artifact Attestations、slsa-github-generator），产出 53 个发布资产；社区要求收敛为"一个签名故事 + 约 20 个资产"，减少 CI 耗时与维护成本。

## 5. Bug 与稳定性

**S1 — 工作流阻断**
- [Issue #9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)（p1，in-progress）— `web_fetch` 对 gzip/brotli/deflate 压缩响应返回乱码二进制，Agent 无法解析，抓取 `https://f...` 类站点即阻塞；已有处理中。
- [Issue #9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)（p1，accepted）— Windows 桌面安装器（v0.8.3 exe）启动即失败，报缺少 `TaskDialogIndirect`。
- [Issue #7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)（p1，needs-repro）— macOS 15.7.7 桌面应用重开时空白或无窗口，权限检测失效；因缺复现信息积压近 2 个月。

**S2 — 功能降级**
- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)（p1，accepted）— Windows 74 个测试失败，详见社区热点；尚无 fix PR，但 [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)（CI 平台矩阵）已接受。
- [Issue #9796](https://github.com/zeroclaw-labs/zeroclaw/issues/9796) — cron 父命令帮助输出无效的 `add-at`/`add-every`/`once` 示例，**今日已关闭**（已修复）。
- [Issue #9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)（p1）— CLI 创建的 cron 任务投递硬编码为 `none`，任务"运行成功但结果被丢弃"的静默失败，**今日已关闭**（已修复）。

**S3 — 轻微问题**
- [Issue #9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)（p2，accepted）— Dashboard daemon 重载后 Discord "正在输入…"指示器永久卡住。
- [Issue #9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)（p2，in-progress）— `zeroclaw desktop` 命令使用失效下载 URL，且无法检测已注册的 AppImage。

**今日修复的安全/稳定性问题**
- 浏览器 `screenshot` 任意文件写入逃逸 → [PR #9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) 已关。
- 终端标记泄漏至对话与持久化数据 → [PR #9695](https://github.com/zeroclaw-labs/zeroclaw/pull/9695) 已关。

## 6. 功能请求与路线图信号

**可能有 PR 在审、接近下一版本的功能**
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — 原生 Hailo-Ollama provider（本地/边缘推理的 `/api/chat`、`/api/tags` 契约）。
- [PR #9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) — Langfuse 观测后端，Agent OTel 轨迹可导出至云或自托管。
- [PR #9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) — 可靠 provider 凭据轮换：429 时仅冷却出错的凭据，而非整体限流。
- [PR #9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) — WASM 插件出口按墙钟截止时间约束（默认 30s），防失控插件占死宿主。
- [PR #9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194) — `KeySource` 密钥源抽象 + 文件密钥源后端，为主密钥获取提供可插拔架构。
- [PR #9694](https://github.com/zeroclaw-labs/zeroclaw/pull/9694) — ZeroCode SOP 面板只读状态视图；关联任务 [#9684](https://github.com/zeroclaw-labs/zeroclaw/issues/9684) 今日关闭。
- [PR #9196](https://github.com/zeroclaw-labs/zeroclaw/pull/9196) — MCP `tools/call` 返回的 resource blob 物化到工作区，并带聚合预算预检。

**路线图信号**
- [Issue #9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) — 计划 v0.9.0 退役 Lucid 内存连接器（上游在合并后 4 天即休眠）。
- [Issue #8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) — Agent 工作协调 Kanban 看板 RFC，尚在设计讨论。
- [Issue #8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078) — ZeroCode 本地预提交门禁 RFC（在本地跑完整贡献者门槛，不通过拒开 PR）。
- 跨平台 CI：[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)（p2，accepted）与 [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910)（Windows 自更新覆盖）已获接受，待排期。

## 7. 用户反馈摘要

- **Windows 用户痛点集中**：简体中文 Windows 11（代码页 936）下 74 个测试失败（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）；安装器启动失败（[#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)）；`zeroclaw desktop` 检测不到已装 AppImage、下载 URL 失效（[#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)）。反馈共同指向：**项目对 Windows 支持不足，且 CI 不跑 Windows 导致问题长期外溢**。
- **Agent 实际使用场景受阻**：`web_fetch` 抓取 gzip 站点拿到乱码、无法解析（[#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)）；CLI 建的 cron 任务"运行成功但输出被丢弃"，属于难以察觉的静默失败（[#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)，已修复）。
- **渠道与桌面体验**：Discord 打字指示器卡死影响团队协作观感（[#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)）；macOS 空白窗口问题久未解决（[#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)）。
- **贡献者侧信号**：wangmiao0668000666、IftekharUddin、Audacity88 等资深贡献者持续提交 SSRF 加固（[#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)）、截图路径校验（[#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)）、WASM 时限（[#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403)）等安全 PR，社区对**安全与治理**的关注度在上升。

## 8. 待处理积压

**需维护者优先处理**
- [Issue #9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)（p1，blocked）— `cargo deny` 因 RUSTSEC-2026-0247（`bitmaps 3.2.1` 经 `imbl` → Matrix SDK dev-deps 进入依赖图）持续失败，**Security CI 当前红标**，等待 triage 或豁免调整。
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（13 评论）— 维护者决策队列，社区高关注，等待维护者确认运作机制。

**长期搁置的需求**
- [Issue #5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316)（2026-04-05 创建，p2，accepted）— SearXNG 支持与 Web 搜索失败恢复（含 DuckDuckGo CAPTCHA 检测），已接受但搁置超 4 个月。
- [Issue #5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)（2026-04-19 创建，p2，needs-author-action）— ZeroCode 编码工作流 LSP 支持，等待作者补充。
- [Issue #6653](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)（2026-05-14 创建，p3，needs-author-action）— 模拟安装的主机架构策略。
- [Issue #7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)（2026-06-12 创建，p1，needs-repro）— macOS 空白窗口，S1 但近 2 个月无复现进展，建议维护者主动联系作者。

**等待作者行动的已接受 PR**
- [PR #8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) — file_download SSRF 加固（建议 `allowed_private_hosts` 显式白名单）。
- [PR #9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) — `always_ask` 在 Full autonomy 下被绕过的修复（XS，改动小但涉及安全语义）。
- [PR #9196](https://github.com/zeroclaw-labs/zeroclaw/pull/9196) — MCP 资源 blob 物化。
- 以上均标记 `needs-author-action`，作者回应维护者意见后即可推进合入。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*