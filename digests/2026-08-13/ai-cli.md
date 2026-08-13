# AI CLI 工具社区动态日报 2026-08-13

> 生成时间: 2026-08-13 02:02 UTC | 覆盖工具: 10 个

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

## 横向对比

# AI CLI 工具横向对比分析报告（2026-08-13）

## 1. 生态全景

当前 AI CLI 工具正从“单点代码助手”进化为“开发者工作台”：主流工具以日级/周级频率发布修复版本，社区关注焦点已从“模型能力比拼”转向“工程可靠性”——Windows 崩溃、远程 MCP 认证、缓存成本、会话一致性成为高频议题。工具间分化明显：一类走向完整桌面/IDE 体验（Claude Code、Codex、Qwen Desktop），另一类坚守可组合的终端 TUI 路线（OpenCode、Pi、CodeWhale）。与此同时，“成本透明化”和“无人值守长任务”成为用户最敏感的神经，直接驱动 session 预算、线程级配额等新功能浮出水面。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 热点数 | 今日 PR 数 | 版本发布 |
|---|---|---|---|
| Claude Code | 10（最高 80 评论 / 498👍） | 5（3 合并） | v2.1.229 |
| OpenAI Codex | 10（最高 83 评论 / 392👍） | 10（全部合并） | 无 |
| Gemini CLI | 10（最高 12 评论 / 8👍） | 10 | v0.56.0-nightly |
| GitHub Copilot CLI | 10（最高 8 评论 / 35👍） | 3（1 有效） | 无 |
| Kimi Code CLI | 1（36 评论） | 2（均开放） | 无 |
| OpenCode | 10（最高 40 评论 / 88👍） | 10 | v1.18.18 / v1.18.17 |
| Pi | 10（最高 18 评论 / 17👍） | 10 | 无 |
| Qwen Code | ~50 条更新（10 热点） | ~50 条更新（10 热点） | desktop-v0.2.1 / v0.2.0 |
| CodeWhale（原 DeepSeek-TUI） | 10（最高 9 评论） | 10（6 合并） | v0.9.6 |
| Grok Build | 0 | 0 | 无 |

> 注：Issue/PR 数为各仓库“更新且被社区追踪”的热点数量，实际仓库总更新量可能更高。

## 3. 共同关注的功能方向

- **Windows 桌面稳定性（最集中痛点）**  
  Claude Code 遭遇 GPU 进程崩溃（#81698）和反复崩溃（#85199）；Codex 面临 WMI 耗尽（#34260）与 PowerShell 轮询风暴（#25453）；Copilot CLI 处理 WSL2 按键错乱（#4328）。三大工具同日暴露 Windows 短板，说明该平台已是口碑主战场。

- **远程 MCP 生产级可靠性**  
  Copilot CLI 集中出现 OAuth 静默刷新失败（#4464）、瞬时 5xx 永久拉黑（#4466）、Docker MCP 容器泄漏（#4461）；Gemini 修复 MCP 配置损坏导致 fail-open（#28794）；CodeWhale 被指 `nextCursor: null` 违反协议规范（#5335）。MCP 正在从“能连”走向“能稳定连、安全连”。

- **上下文与记忆治理**  
  Pi 的 auto-compaction 在 373k tokens 时才触发（#6879）；Codex 因过期 token 计数导致上下文溢出（#32888）；Claude Code 的自动更新使提示缓存批量失效（#86244）；Kimi Code 社区呼声最高的仍是跨会话记忆系统（#1283）。长期上下文管理已成为成本与体验的双重瓶颈。

- **Agent 自治与任务可靠性**  
  Gemini 的 subagent 在 MAX_TURNS 中断后误报成功（#22323）；Qwen 后台子代理重复劳动且 `send_message` 不可交互（#8097）；Copilot CLI 的模型参数被静默覆盖（#4432）。无人值守场景对“何时算完成、谁有权限接管”提出了更高要求。

- **成本透明与控制**  
  需求集中在两端：一是修复计费/用量统计错误（Claude Code usage 翻倍、OpenCode 免费额度误报）；二是提供主动控制手段（OpenCode 新增 per-session 预算 PR #42202，Codex 展示线程级 credits）。

## 4. 差异化定位分析

- **Claude Code**：企业合规与托管 Runner 是其护城河；社区基数大、插件生态最丰富，但 Linux 桌面版缺失和 Windows 不稳定正拖累口碑。目标用户：企业开发团队。
- **OpenAI Codex**：深度绑定订阅额度制，桌面 App 完整体验 + 线程/信用额管理精细。目标用户：Plus/Pro 订阅者中重度依赖 GUI 的开发者。
- **Gemini CLI**：开源 + Nightly 高频迭代，evals 基础设施、安全加固（SSRF/变量展开绕过）投入显著，技术理想主义色彩强。目标用户：Agent 实验型开发者。
- **GitHub Copilot CLI**：GitHub 生态的延伸，企业模型目录（BYOK）、远程 MCP 认证（CIMD）是差异化方向；但 PR 中机器人噪音较多，社区对审查深度有隐忧。目标用户：GitHub 重度/企业用户。
- **Kimi Code**：轻量、中文友好，当前处于稳定性补课阶段，记忆系统是最大增长点。目标用户：轻量 CLI 偏好者。
- **OpenCode**：TUI 优先，多提供商/网关（MERGE、MiniMax）接入激进，双版本日更显示快速试错风格。目标用户：终端爱好者、多模型切换者。
- **Pi**：本地优先、隐私敏感，模型接入最广（Grok 4.6、Ollama 本地代理、Anthropic Vertex）；扩展 API（onMouse 钩子）开放度高。目标用户：本地模型/DIY 玩家。
- **Qwen Code**：服务化基因最强（serve daemon、WebShell、多客户端 Chrome bridge），review/CI 验证走向 Maven 多模块，云平台集成（Vertex 等）是重点。目标用户：云环境团队、通义模型用户。
- **CodeWhale**：从 DeepSeek 单模型向多提供商演进（OrcaRouter），TUI 交互创新（PiP 迷你窗口、Ratatui 治理）活跃，正处品牌/架构转型期。目标用户：TUI 极简主义者。

## 5. 社区热度与成熟度

- **成熟头部梯队**：Claude Code（评论基数最大，企业合规问题单条 80 评论）与 Codex（392👍 的高热度 issue）社区声量明显领先。
- **快速迭代梯队**：Qwen Code（约 50 条 Issue/PR 日更 + 双桌面版本发布）、OpenCode（双版本/日）、Gemini CLI（daily nightly + P1 修复批量合入）均处于高频打磨期。
- **中等活跃梯队**：Pi（10 条热点 Issue/PR，集中在编辑工具与 TUI 扩展）、Copilot CLI（聚焦 MCP 但 PR 活跃度虚高）、CodeWhale（品牌迁移期，Harvest 式 PR 合入带来一定流程噪音）。
- **待启动/低活跃**：Kimi Code（24h 仅 1 条 Issue 更新）、Grok Build（完全无活动）。前者是社区需求集中但供给节奏慢，后者可能处于早期孵化或战略静默期。

## 6. 值得关注的趋势信号

1. **Windows 稳定性是最大的信任风险，也是最大的替代窗口**  
   多个工具连续数日在 Windows 上出现 GPU 崩溃、进程风暴、状态损坏，问题覆盖面广且用户难以自行规避。谁先系统性解决 Windows 桌面端可靠性，谁就能收割大量现有一线开发者。

2. **成本可观测性正从“可选优化”变为“采购前提”**  
   缓存失效、usage 统计虚高、auto-compaction 失灵等问题的本质是“不可见的钱在流失”。OpenCode 的 per-session 预算、Codex 的 thread-credits 展示说明工具方已开始将成本控制内建为产品能力，而非仅靠用户手动监控。

3. **MCP 协议进入“严格互操作排雷期”**  
   社区开始用 Claude Code 等严格客户端反向测试其他工具，`nextCursor: null`、OAuth scope 混用、5xx 不重试等细节错误逐一暴露。这预示着 MCP 将像 HTTP 一样形成“规范 + 严格实现”的成熟工程标准。

4. **记忆系统正在演变为隐私安全议题**  
   Gemini 的 Auto Memory 被质疑“内容进模型后才提示脱敏”、低信号会话无限重试；Claude Code 的 CVP 合规误拦截；CodeWhale 的 API 密钥明文落盘——记忆/上下文沉淀功能必须“先设计隐私，再设计功能”，否则将成为新的合规风险点。

5. **Agent 自治程度越高，越需要“可回收”与“可观测”**  
   从 subagent 误报成功、挂起到后台 agent 重复劳动，社区对自主性的诉求已不止于“能否执行”，而是“是否能被信任地执行”。工作流级 transcript（Qwen PR #8971）、线程级配额可视化（Codex）等能力，正在定义下一代 Agent 编排的信任基础设施。

6. **模型质量回退会被迅速归因到 CLI 工具本身**  
   Claude Code 的 Opus 5.0 质量回退、OpenCode 的 Gemini 3 Pro 函数调用失败均获得高热度，说明用户心智中“模型 = 工具”的耦合度极高。CLI 厂商需要在模型切换、版本兼容上建立更稳健的降级和回滚机制，以对冲上游模型的波动风险。

---

*数据来源：各工具 GitHub 仓库公开议题与 PR，统计窗口为 2026-08-12 至 2026-08-13。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-08-13 ｜ 数据源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行（Top 8）

> 以下 PR 均处于 **Open** 状态，按社区评论热度排序。

**① skill-creator 评估链路修复（#1298）**  
修复 `run_eval.py` 恒报 `recall=0%` 的严重缺陷，并附带 Windows 流读取、触发器检测、并行 worker 修复。该 bug 被 10+ 用户独立复现（对应 [Issue #556](https://github.com/anthropics/skills/issues/556)，12 评论 / 7 👍），使 description 优化循环"在噪声上做优化"，是当前生态最集中的可靠性投诉。  
🔗 https://github.com/anthropics/skills/pull/1298

**② document-typography 文档排版技能（#514）**  
针对 AI 生成文档的排版质量做控制：孤词换行（1–6 词溢出到下一行）、孤行段落（标题滞留页底）、编号错位。社区共鸣点在于"用户几乎不会主动要求排版质量"，需要技能兜底。  
🔗 https://github.com/anthropics/skills/pull/514

**③ pdf 技能大小写引用修复（#538）**  
修复 `SKILL.md` 中 8 处大小写不一致的文件引用（`REFERENCE.md` → `reference.md` 等），在大小写敏感文件系统上会导致技能失效，是官方技能跨平台兼容性的典型疏漏。  
🔗 https://github.com/anthropics/skills/pull/538

**④ ODT 技能（#486）**  
补齐文档格式矩阵：OpenDocument（ODT/ODS）创建、模板填充、ODT→HTML 转换，覆盖 LibreOffice/ISO 标准格式诉求。  
🔗 https://github.com/anthropics/skills/pull/486

**⑤ 元技能：skill-quality-analyzer / skill-security-analyzer（#83）**  
两个配套的"技能审查"元技能：前者从结构文档、示例、资源等五维度评估技能质量；后者对技能做安全分析。体现社区对技能质量标准化、安全审查的主动诉求。  
🔗 https://github.com/anthropics/skills/pull/83

**⑥ docx 修订模式 w:id 冲突修复（#541）**  
修复 DOCX 技能添加修订时 `w:id` 与既有书签冲突导致的文档损坏。根因是 OOXML 中 `w:id` 为书签、修订、批注共享的 ID 空间，而示例使用了硬编码低 ID——技术深度较高的修复。  
🔗 https://github.com/anthropics/skills/pull/541

**⑦ self-audit 交付审计技能（#1367，v1.3.0）**  
交付前先做机械层校验（验证所有声明产出文件真实存在），再按危害优先级执行四维推理审计。与 [Issue #1385「推理质量门禁管线」](https://github.com/anthropics/skills/issues/1385) 呼应，是"质量保障类元技能"趋势的代表作。  
🔗 https://github.com/anthropics/skills/pull/1367

**⑧ frontend-design 技能重构（#210）**  
重写前端设计技能，目标是让每条指令都可在单次对话中落地、可执行。社区讨论核心是"技能指令的可执行性 vs 抽象描述"。  
🔗 https://github.com/anthropics/skills/pull/210

---

## 2. 社区需求趋势（来自 Issues）

**🔴 安全与信任边界（最高热度）**  
[Issue #492](https://github.com/anthropics/skills/issues/492)（43 评论）指出：社区技能被分发在 `anthropic/` 命名空间下、冒充官方技能，形成信任边界滥用，用户可能因此向非官方技能授予高权限。这是当前最受关注的问题。

**🟠 组织级技能共享**  
[Issue #228](https://github.com/anthropics/skills/issues/228)（8 👍，最高赞）：用户希望在 Claude.ai 内直接共享技能，而不是手动下载 `.skill` 文件、经 Slack/Teams 传递再手动上传。

**🟠 开发者工具链可靠性**  
[Issue #556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍）与 [Issue #1169](https://github.com/anthropics/skills/issues/1169)：`run_eval.py` 对所有查询均报 0% 触发率，skill-creator 的优化闭环完全失效，社区对官方工具质量不满已形成集中投诉。

**🟡 上下文窗口与资源安全**  
[Issue #1487](https://github.com/anthropics/skills/issues/1487)：内置 `claude-api` 技能单次工具调用注入约 156k tokens，直接耗尽上下文窗口；[Issue #1175](https://github.com/anthropics/skills/issues/1175) 则讨论 SharePoint 场景下在 SKILL.md 中写权限逻辑的安全与上下文风险。

**🟡 文档类技能质量**  
[Issue #12](https://github.com/anthropics/skills/issues/12)：docx 技能因额外空白重排导致文档损坏、Word 无法打开——官方技能在 OOXML 处理上仍欠打磨。

**🟢 新技能方向提案**  
- agent-governance 治理技能 [Issue #412](https://github.com/anthropics/skills/issues/412)：策略执行、威胁检测、信任评分、审计轨迹。  
- compact-memory 符号化记忆技能 [Issue #1329](https://github.com/anthropics/skills/issues/1329)：用紧凑符号标记替代长篇幅 prose 记忆，节省上下文。  
- 平台集成诉求：AWS Bedrock 使用 [Issue #29](https://github.com/anthropics/skills/issues/29)、Skills MCP 化 [Issue #16](https://github.com/anthropics/skills/issues/16)、插件重复安装 [Issue #189](https://github.com/anthropics/skills/issues/189)（9 👍）。

**趋势小结**：文档处理仍是需求最密的赛道；安全与治理类议题快速升温；组织级共享和企业平台集成（ServiceNow、SharePoint、SAP、Bedrock）是明确的增长方向；对 skill-creator 官方工具链的可靠性不满已成为最集中的负面反馈。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、价值清晰且近期有更新，有望近期落地：

- **ServiceNow 全平台技能（#568）** — 覆盖 ITSM/ITOM/ITAM/SAM/FSM/SPM/CSDM/IntegrationHub 与 SecOps，企业级大而全技能，最近更新于 2026-08-12，活跃度最高。  
  🔗 https://github.com/anthropics/skills/pull/568

- **Agent Skills 规范合规修复（#1538）** — 修复两个技能不符合仓库所定义规范的问题（`name` 与目录不匹配等），更新于 2026-08-12，属于"官方仓库自身合规"的收口型 PR，合并概率高。  
  🔗 https://github.com/anthropics/skills/pull/1538

- **testing-patterns 技能（#723）** — 完整测试栈：Testing Trophy 模型、AAA 模式、React Testing Library、单元测试边界，填补测试类技能空白。  
  🔗 https://github.com/anthropics/skills/pull/723

- **document-typography 排版技能（#514）** — 通用性强、直击 AI 生成文档普遍痛点，评论区持续活跃。  
  🔗 https://github.com/anthropics/skills/pull/514

- **pyxel 复古游戏开发技能（#525）** — 作者即 pyxel-mcp 维护者，绑定 Pyxel 引擎的 write → run_and_capture → inspect → iterate 工作流，生态位独特，更新于 2026-07-15。  
  🔗 https://github.com/anthropics/skills/pull/525

- **plan-file-hygiene 技能（#1479）** — 治理规划文件"只积累无生命周期"的问题，属社区协作共创（issue #1417 衍生），方向新颖。  
  🔗 https://github.com/anthropics/skills/pull/1479

---

## 4. Skills 生态洞察

**一句话总结**：当前社区在 Skills 层面最集中的诉求是"可信度"——一手修复 skill-creator 工具链的可靠性缺陷（0% recall 评估循环），一手构建安全信任边界（打击冒充官方命名空间）与质量审计类元技能（self-audit、quality/security analyzer、reasoning gate），推动技能生态从"快速扩张"转向"可信、可控、可用"。

---

# Claude Code 社区动态日报 — 2026-08-13

## 今日速览

v2.1.229 发布，补上 `remote-control --continue` 恢复能力、自托管 runner 的 hook 支持和 SSE keepalive。社区最热话题是企业 CVP 合规误拦截（#84352，80 条评论），Linux 官方桌面版请求则以 498 个 👍 高居需求榜首位但维持关闭状态。Windows 桌面端崩溃类问题连续多日高频出现。

## 版本发布

**v2.1.229**（刚刚发布）

- 记录 `claude remote-control --continue`，用于恢复最近的 Remote Control 会话
- 自托管 runner 会话支持服务端提供的 Claude Code hook，与托管环境行为对齐
- 网关流式响应增加 SSE keepalive 心跳

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.229

## 社区热点 Issues

1. **[#84352] CVP 合规块误拦截**（80 评论 / 12 👍）
   https://github.com/anthropics/claude-code/issues/84352
   已获 CVP 批准的组织在 Claude Code 中仍被网络安全护栏拦截，且验证门户显示“Under review”与批准邮件矛盾。评论数居当日榜首，说明受影响企业用户较多。

2. **[#65697] Linux 官方桌面版请求**（52 评论 / 498 👍，已关闭）
   https://github.com/anthropics/claude-code/issues/65697
   社区对 Ubuntu LTS / Debian 官方桌面构建的强诉求，498 👍 为近期最高。虽已关闭仍持续被更新，关注度不减。

3. **[#14061] /plugin update 不清理插件缓存**（25 评论 / 31 👍）
   https://github.com/anthropics/claude-code/issues/14061
   更新插件后缓存仍命中旧版本，是插件开发与迭代工作流中的高频痛点，31 👍 说明大量用户踩过。

4. **[#81698] Windows 桌面版 GPU 进程崩溃**（25 评论）
   https://github.com/anthropics/claude-code/issues/81698
   GPU 进程以 exit code 101457950 崩溃，拖垮整个应用和所有运行中会话。RTX 5080 + Win11 环境，影响面较广。

5. **[#24172] 关闭 VSCode 或切换会话后对话丢失**（12 评论 / 25 👍）
   https://github.com/anthropics/claude-code/issues/24172
   对话历史完全消失且无法恢复，属于严重数据丢失问题，带有 `high-priority` 标签，直接影响日常开发信任度。

6. **[#85199] Windows 桌面版反复崩溃，需“修复”恢复**（13 评论）
   https://github.com/anthropics/claude-code/issues/85199
   8 月 9 日创建后短时间获得 13 条评论，用户描述需要反复执行“Advanced Options → Repair”，桌面版稳定性问题持续。

7. **[#75899] 左箭头误触发送至 Agents 屏幕**（14 评论 / 19 👍）
   https://github.com/anthropics/claude-code/issues/75899
   聊天输入框按左方向键会跳转到 agents/后台任务页，且无法重绑定，返回后主会话视图被破坏。交互细节问题但评论活跃。

8. **[#79366] Worktree 会话复用旧目录**（11 评论 / 7 👍）
   https://github.com/anthropics/claude-code/issues/79366
   开启 worktree 隔离的新会话落在旧会话遗留目录中，会话隔离不彻底，带来文件污染风险。

9. **[#82162] Opus 5.0 质量严重回退**（9 评论 / 3 👍）
   https://github.com/anthropics/claude-code/issues/82162
   用户反馈 Opus 5.0 连续 5 次重试无法交付结果，另有 #82326 同样指控“幻觉回答回归”。模型质量焦虑正在社区发酵。

10. **[#86244] 后台自动更新使所有会话提示缓存失效**（1 评论，今日新提交）
    https://github.com/anthropics/claude-code/issues/86244
    运行中进程继续使用旧二进制，但下一次 `--resume` 需重新缓存整个上下文，导致成本激增。同类成本问题 #84738 也指出 usage 汇总翻倍可致自动压缩提前 **30-50 万 token**。

## 重要 PR 进展

过去 24 小时内共 5 条 PR，以下为全部：

1. **#85925 [已合并/关闭] 清理剩余过时文档链接**
   https://github.com/anthropics/claude-code/pull/85925
   将插件、skills/agents/commands 及 issue 模板中的旧 docs.claude.com 链接统一指向 code.claude.com 规范地址。

2. **#85822 [已合并/关闭] 修复插件与示例中的文档链接和 README 漂移**
   https://github.com/anthropics/claude-code/pull/85822
   修正 hooks 文档链接、plugins README 过期引用，所有变更均经线上重定向验证。

3. **#41611 [开放] “add missing source to claude code”**
   https://github.com/anthropics/claude-code/pull/41611
   描述较简略，从标题看是补充某个缺失源码文件，需维护者进一步确认用途。

4. **#42996 [开放] MEP（Meat Puppet Elimination Protocol）异步状态中继**
   https://github.com/anthropics/claude-code/pull/42996
   零新增基础设施、三文件实现的多机器 AI 会话状态同步方案，用于消除切换设备/恢复会话时的上下文丢失。社区自建方案，值得关注。

5. **#57888 [已合并/关闭] 将 child_process_exec 规则限定为 JS/TS 文件**
   https://github.com/anthropics/claude-code/pull/57888
   修复 `security_reminder_hook.py` 中 `"exec("` 子串误匹配 Python `asyncio.create_subprocess_exec` 的误报问题，对 Python 用户友好。

## 功能需求趋势

从近期 Issues 可提炼出四个社区最关注的方向：

1. **桌面端平台覆盖与稳定运行**
   Linux 官方桌面版（#65697，498 👍）仍是最高呼声；Windows 端 GPU/重复崩溃问题加重了对桌面稳定性的焦虑。

2. **会话生命周期与状态管理**
   包括“将 agent 会话标记为完成/关闭”（#66202）、为阻塞会话增加“需要输入/休眠”指示（#86082），以及在桌面端呈现磁盘 transcript 以支持跨机器续跑（#81835）。

3. **成本与缓存效率**
   自动更新、`git status` 变化、usage 统计错误等因素导致提示缓存频繁失效或虚高（#86244、#78720、#84738），正成为重度用户最关心的成本控制议题。

4. **MCP 生态兼容性**
   输出 schema 方言拒绝（draft-07）、MCP server 被静默杀重启、Meta 连接器在 CLI 中超时（#86142、#86040、#86023）——MCP 的健壮性开始被用户集中检验。

## 开发者关注点

- **稳定性压倒一切**：Windows 桌面端崩溃（GPU 崩溃 #81698、重复崩溃 #85199）连续出现，开发者对桌面应用作为主力生产工具的可靠性有更高要求。
- **不可见成本在增加**：缓存失效 + usage 统计错误 = 盲目多付费；用户已开始对“刷新就花钱”的模式表达不满。
- **数据安全是底线**：对话消失不可恢复（#24172）被视为最严重问题，直接侵蚀信任。
- **模型质量回退放大焦虑**：Opus 5 的幻觉/质量下降报告（#82162、#82326）叠加 WebSearch 在 xhigh/max effort 下不可用（#83364），让“为更聪明付费却更笨”的声音越来越大。
- **企业合规与功能“打架”**：CVP 已通过组织仍被护栏拦截（#84352），是当前企业用户最头疼的矛盾点。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-13

## 今日速览

过去 24 小时无新版本发布，开发活动集中在基础设施改进：PR 侧围绕 gRPC 传输支持、插件指标采集与线程用量可视化展开。社区讨论热度最高的仍是两类问题——Windows 平台进程失控（WMI 耗尽、PowerShell 轮询），以及 macOS 上 `syspolicyd`/`trustd` 的 CPU 内存飙升（#25719，392 👍）。此外，“可配置超时”与“重置额度可靠性”是用户呼声最高的功能需求。

## 社区热点 Issues

精选 10 个最值得关注的 Issue，涵盖性能、平台稳定性、功能需求等方向。

### 1. macOS 上持续触发 syspolicyd/trustd CPU 与内存失控
**Issue [#25719](https://github.com/openai/codex/issues/25719)** | 评论 83 | 👍 392 | 开启

Codex Desktop for macOS（26.527.60818）会反复触发 `syspolicyd`/`trustd` 系统进程飙升，造成 CPU 和内存持续占用。这是目前社区关注度最高的问题（392 👍），Plus 用户受影响面广，尚在开放中。

### 2. 建议增加设置项，禁用 60 秒自动解析问题
**Issue [#28969](https://github.com/openai/codex/issues/28969)** | 评论 70 | 👍 194 | 开启

CLI 用户在等待 `request_user_input` 时，问题会在 60 秒后被自动解析（auto-resolve）。用户希望增加关闭该行为的配置项，避免长时间任务中被强制打断。该需求已有 194 👍，说明是普遍痛点。

### 3. Reset 失败且未生效，重置次数被白白浪费
**Issue [#31606](https://github.com/openai/codex/issues/31606)** | 评论 56 | 👍 65 | 开启

Pro 用户使用重置额度时，操作失败但重置计数仍被扣减。涉及付费权益可靠性，社区反响强烈（65 👍）。Windows 平台复现，App 版本 26.623.141536。

### 4. Windows Desktop: taskkill.exe/conhost.exe 清理风暴耗尽 WMI
**Issue [#34260](https://github.com/openai/codex/issues/34260)** | 评论 34 | 👍 11 | 开启

Windows 上 Codex Desktop 进入无界进程清理循环，数百个 `taskkill.exe` 与 `conhost.exe` 同时存活，反复查询 `Win32_Process` 直至耗尽 WMI 配额，导致系统整体卡死。被标记为 Papercuts 2026 项目。

### 5. Windows Desktop 每秒生成 powershell.exe 进行进程轮询
**Issue [#25453](https://github.com/openai/codex/issues/25453)** | 评论 25 | 👍 7 | 开启

Codex Desktop for Windows 每秒生成一次短暂的 `powershell.exe` 做全量进程轮询，导致持续高 CPU。与 #34260 同属 Windows 进程管理问题。

### 6. Windows 10 22H2 上 Computer Use 截图失败
**Issue [#25178](https://github.com/openai/codex/issues/25178)** | 评论 25 | 👍 13 | 开启

`get_window_state` 在截图前调用 `SetIsBorderRequired` 失败（`0x80004002`），导致 Windows 10 22H2 上 Computer Use 无法获取窗口截图。列窗口、激活窗口均可，唯独截图不可用。

### 7. Windows Desktop 断电后本地状态损坏：pins/配置回退
**Issue [#26990](https://github.com/openai/codex/issues/26990)** | 评论 14 | 👍 0 | 开启

断电后 Windows 本地状态非崩溃安全：pins/projects 重置、配置回退、时间戳异常。不涉及订阅或模型问题，但属于数据可靠性隐患。

### 8. Auto-compaction 使用过时 token 计数导致上下文溢出
**Issue [#32888](https://github.com/openai/codex/issues/32888)** | 评论 3 | 👍 0 | 开启

长会话中，大的工具输出追加后，下一次采样请求可能超出上下文窗口，但自动压缩未触发——因为压缩决策使用的是上一次服务端上报的 token 数，未包含新工具输出。一旦溢出无法恢复。

### 9. 打开含陈旧 subagent 的任务时 Desktop 持续空白
**Issue [#38250](https://github.com/openai/codex/issues/38250)** | 评论 3 | 👍 0 | 开启

最新版 Codex Desktop（26.803.61601 / 0.147.0-alpha.6.5）打开某些历史任务时，界面无限期空白。与 subagent 状态陈旧有关，重启后仍复现。影响任务回顾与断点续作。

### 10. grep 工具进程无超时运行，orphaned rg 淹没网络文件系统
**Issue [#37770](https://github.com/openai/codex/issues/37770)** | 评论 2 | 👍 0 | 开启

`codex app-server` 的 search/grep 工具启动的 `rg` 进程没有超时或自动终止机制，在 Lustre/NFS 等网络文件系统上可运行 46 分钟甚至 87 分钟，持续消耗 CPU 与网络 I/O。

## 重要 PR 进展

以下 10 个 PR 代表本周核心开发方向。值得注意的是，多数 PR 由 `copyberry[bot]` 提交，且已合并（CLOSED）。

### 1. 统一轮次输入提交与路由
**PR [#38275](https://github.com/openai/codex/pull/38275)** | 已合并

新增 `TurnInputRequest` 与类型化提交结果，将启动 turn、steer 当前 turn、拒绝输入（带原因）统一为原子操作。`CodexThread` 暴露 `start_or_steer_turn`、`start_turn_if_idle`、`steer_turn` 三个方法，简化多端输入竞争逻辑。

### 2. 支持 gRPC code-mode 主机
**PR [#38288](https://github.com/openai/codex/pull/38288)** | 已合并

`--code-mode-host` 现在可接受 `http://` 与 `https://` URL，并走共享 gRPC 会话通道；`ws://`/`wss://` 仍保留 WebSocket 传输。同时拒绝带路径、查询参数或 fragment 的 URL，防止意外路由。

### 3. 从远程执行器收集插件指标
**PR [#38283](https://github.com/openai/codex/pull/38283)** | 已合并

解决远程插件命令的指标收集问题：在 executor 文件系统上解析 manifest 声明的 metric 操作，创建 executor 本地、owner-private 的临时目录作为 measurement sidecar，并将有界输出流回验证。

### 4. 跟踪后台统一执行命令的插件指标
**PR [#38276](https://github.com/openai/codex/pull/38276)** | 已合并

统一执行（unified exec）可让命令在后台继续运行。此前 turn 结束后插件指标即停止采集；该 PR 确保后台命令退出前指标持续收集，即使 item completion 在 turn 完成后才到达。

### 5. 持久化世界状态统一为 JSON 对象
**PR [#38274](https://github.com/openai/codex/pull/38274)** | 已合并

世界状态快照与合并补丁本质上是键控 section 集合。此前持久化的 `state` 字段允许任意 JSON 值，导致回放代码需要处理非法形状。现在类型上限定为 JSON 对象。

### 6. 会话历史项添加创建时间戳
**PR [#38272](https://github.com/openai/codex/pull/38272)** | 已合并

本地生成的 user/developer/agent/tool-output 项在进入持久会话历史时，会标记毫秒级 Unix 创建时间。若输入已在外部带有时间戳则原样保留。为审计与排序提供基础。

### 7. TUI 状态栏与 /status 展示线程用量
**PR [#38282](https://github.com/openai/codex/pull/38282) / [#38281](https://github.com/openai/codex/pull/38281)** | 已合并

为企业工作区增加线程级配额展示：状态栏新增 `thread-credits` 与 `estimated-thread-cost` 两个可配置项；`/status` 命令扩展 `account/usage/read`，返回估算积分、美元成本、模型/推理努力/速度/token 分项。两项均按需拉取，避免额外开销。

### 8. skills.read 暴露 executor 技能根目录
**PR [#38268](https://github.com/openai/codex/pull/38268)** | 已合并

Executor 支撑的技能可包含捆绑脚本，调用方需要技能目录位置才能定位这些脚本。`skills.read` 响应新增 `skill_root` 字段，直接从 manifest 推导。

### 9. 集成实验性凭证代理（credential broker）
**PR [#29752](https://github.com/openai/codex/pull/29752)** | 已合并

将 #28034 引入的 proxy-owned 凭证代理能力真正接入 Codex 核心：以子进程 dummy 值替换真实凭证，并在命令生命周期内维持代理值。托管子进程在 shell 切换时不再丢失 brokered 值。

### 10. 分页线程的持久化回滚（durable revert）
**PR [#38292](https://github.com/openai/codex/pull/38292)** | 已合并

新增 `ThreadStore::revert_thread`：在选中轮次之前通过创建新不可变 rollout 并原子切换存储路径来保留历史。重复回滚仍保持逻辑线程 ID 与会话元数据不变。

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **可配置超时行为** — #28969（60 秒自动解析不可关闭）、#37472（Default 模式允许无限等待）表明用户对超时策略有强烈定制需求，且希望按模式区分。
2. **Windows 平台稳定性** — 本期 30 条热门 Issue 中近半与 Windows 相关：进程轮询（#25453）、WMI 耗尽（#34260）、权限/EPERM（#37743、#38293）、状态损坏（#26990）。Windows 是当前最大的稳定性短板。
3. **Computer Use 功能完善** — 既有的窗口枚举/截图/文件上传问题（#25178、#20785、#37932、#38293）持续发酵，Windows 上尤其严重。
4. **会话/线程管理可靠性** — 侧线程创建失败（#38248）、/fork 后父线程写锁不释放（#38144）、重度压缩后 thread/resume 丢失最新轮次（#38169）、陈旧 subagent 导致空白任务（#38250）——线程生命周期管理是高频痛点。
5. **用量透明化** — PR 侧大量出现线程级 credits 展示（#38281、#38282、#38270），说明企业/团队场景下配额可见性成为刚需。
6. **MCP 集成质量** — #38287 暴露了 structuredContent 存在时 MCP 工具结果丢失的问题，且该问题在最近版本中才被引入（降级后消失）。

## 开发者关注点

总结开发者反馈中最集中的痛点和诉求：

- **进程失控类 Bug 严重打击信任**：无论是 Windows 的 taskkill/powershell 风暴，还是 macOS 的系统进程飙升，都直接影响用户日常使用，且难以自行终止。
- **付费额度操作必须可靠**：#31606 中重置操作失败但次数仍被扣减，用户抱怨强烈。涉及真金白银的操作不允许静默失败。
- **超时策略不应“一刀切”**：CLI 与 App 中大量内置超时（60 秒自动解析、工具无超时）被诟病。开发者希望精细控制“哪些操作等多久”。
- **数据持久化是底线**：断电后 pins/配置回退（#26990）、sqlite 状态回填卡住（#28087）、会话项缺时间戳——用户对本地状态可靠性要求很高。
- **远程与后台场景的指标与生命周期管理**：远程 executor 的指标采集、后台命令的指标持续跟踪，说明 Codex 正被更多用于远程开发与 CI-like 工作流，而不仅是本地交互式使用。
- **对自动合并机器人 PR 的态度**：大量 `copyberry[bot]` PR 快速合并，社区既有对效率的认可，也存在对审查深度的潜在担忧（如 #38288 的协议变更影响面）。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-13

## 1. 今日速览

今日发布 `v0.56.0-nightly.20260813.g1ac337739`，主要合入了 evals 相关能力：`eval:validate` 静态校验命令，以及失败摘要中的 tool call 时间线格式化。社区 Issues 继续聚焦 subagent 可靠性、CLI 在简单命令后挂起、Auto Memory 安全与效率问题；PR 侧则有多个 P1 级修复，包括 MCP 配置损坏导致 fail-open、容量超限重试、变量展开安全绕过等。

## 2. 版本发布

### v0.56.0-nightly.20260813.g1ac337739
- 合并 `Feat/eval validate`（[#28344](https://github.com/google-gemini/gemini-cli/pull/28344)）：新增 eval 源文件静态校验命令，可按 9 条规则检查并支持 CI 门禁。
- 合并 `feat(evals): add tool call formatter and integrate failure summaries`（[#28305](https://github.com/google-gemini/gemini-cli/pull/28305)）：在评估失败时输出紧凑、带编号的 tool call 时间线，包含参数、状态和错误详情。
- 同步更新 v0.55.1 changelog。

## 3. 社区热点 Issues

1. **[#22323 Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   P1 级 bug，12 条评论。subagent 明明因 `MAX_TURNS` 中断，却被报告为 `GOAL success`，会掩盖自动化流水线中的真实失败，严重影响可观测性。

2. **[#21409 Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   P1 级 bug，8 条评论、8 👍。一旦 CLI 委托给 generalist agent 就可能无限挂起，用户等到一小时只能取消；配置禁止 subagent 后才恢复。社区反应强烈。

3. **[#19873 Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   Enhancement，8 条评论。建议让 Gemini 3 更自然地以 bash 用户方式工作，同时通过 sandbox 和意图路由保障安全，是提升 agent 执行效率的重要方向。

4. **[#24353 Robust component level evalutions](https://github.com/google-gemini/gemini-cli/issues/24353)**  
   EPIC，7 条评论。将行为评估从单点测试升级为组件级评估，并已积累 76 个行为测试，覆盖 6 个 Gemini 模型。

5. **[#22745 Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   7 条评论。评估 AST 感知的文件读取/搜索/代码库映射是否能减少 token、降低误读方法边界的次数，是 agent 效率和成本优化的关键探索。

6. **[#21968 Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   6 条评论。用户反馈即使配置了 `gradle`、`git` 等 skill，Gemini 也不会主动调用，必须显式指示。社区普遍希望提高 agent 自主使用现有工具链的能力。

7. **[#26522 Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   5 条评论。Auto Memory 会把低价值会话反复标记为“未处理”，导致后台提取 agent 无限重试，浪费算力并增加日志噪音。

8. **[#25166 Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   P1 级 bug，4 条评论、3 👍。即使执行最简单的 CLI 命令，完成后仍显示 “Awaiting user input” 并挂起，是高频出现的交互稳定性问题。

9. **[#26525 Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**  
   Security 相关，4 条评论。Auto Memory 会在内容进入模型上下文后才提示脱敏，存在先泄露后处理的问题，且日志可能记录已有 skill 内容，社区关注度高。

10. **[#21983 browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
    P1 级 bug，4 条评论。浏览器 subagent 在 Wayland 环境下直接失败，影响 Linux 桌面用户，属环境兼容性硬伤。

## 4. 重要 PR 进展

1. **[#28794 fix(cli): prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)**  
   修复 `mcp-server-enablement.json` 损坏时 `readConfig()` 返回空对象，进而导致所有 MCP server 被重新启用的 fail-open 和数据丢失风险。

2. **[#28787 fix(cli): don't treat a corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)**  
   与 #28794 同源问题：将 JSON 解析失败与“文件不存在”区分开，避免静默 fallback。

3. **[#28790 fix(core): implement context-aware silent retries and availability TTL for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)**  
   关闭 #28761 中的容量超限 retry 回归：非交互式 CLI 可自动 back-off 重试，同时最多执行 2 次静默重试，并引入 availability TTL。

4. **[#28691 fix(core): block $VAR and ${VAR} variable expansion bypass](https://github.com/google-gemini/gemini-cli/pull/28691)**  
   修复 GHSA-wpqr-6v78-jr5g 的不完整修复，堵住 `$VAR` / `${VAR}` 变量展开绕过 bash/PowerShell 注入检测的安全漏洞。

5. **[#28557 fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution](https://github.com/google-gemini/gemini-cli/pull/28557)**  
   将 `isBlockedHost` 从同步 IP 检查改为异步 DNS 解析，防止域名解析到 `169.254.169.254` 等内网地址后绕过 SSRF 防护。

6. **[#28789 fix(vscode-ide-companion): resolve stop() hang and fix keep-alive failure threshold](https://github.com/google-gemini/gemini-cli/pull/28789)**  
   修复 `IdeServer.stop()` 在活跃 MCP session 下无限挂起的问题，同时修正 keep-alive 心跳异常的资源泄漏和阈值判断。

7. **[#28673 feat(core): add Gemini 3.6 Flash and 3.5 Flash-Lite model configurations](https://github.com/google-gemini/gemini-cli/pull/28673)**  
   为 Gemini 3.6 Flash、3.5 Flash-Lite 增加模型定义、能力标识、别名和 code execution 支持，提前适配新一代模型。

8. **[#28738 Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)**  
   实现子代理通过 `tools:` frontmatter 委托给其他子代理或递归调用自身，修复 #22092。这是 subagent 自治能力的重要扩展。

9. **[#28788 Feat/behavioral evals skills fetch](https://github.com/google-gemini/gemini-cli/pull/28788)**  
   为 `activate_skill` 和 `web_fetch` 增加行为评估，同时改进本地评估环境的 Windows 兼容性，并修复 EDK 报告聚合器遗漏 skipped 用例的 bug。

10. **[#28405 fix: prevent scroll position jump when user scrolls up during content updates](https://github.com/google-gemini/gemini-cli/pull/28405)**  
    修复用户上翻查看内容时，新输出导致 `VirtualizedList` 强行回到底部的体验问题。

## 5. 功能需求趋势

- **Agent/Subagent 自治与可靠性**：社区最关注的方向是 subagent 能否正确判断任务完成、是否被充分使用、能否互相调用以及避免挂起。
- **安全与隐私**：围绕 MCP 配置损坏 fail-open、变量展开绕过、SSRF、Auto Memory 脱敏前置化等安全加固需求明显增多。
- **评估基础设施**：从 `eval:validate` 到 tool call 失败摘要，社区和官方都在推动更可观测、可回归的行为评估体系。
- **开发者体验与终端稳定性**：包括 shell 命令挂起、终端 resize 闪烁、滚动跳位、浏览器 subagent 在 Wayland 下的兼容性。
- **模型与平台适配**：PR 已出现 Gemini 3.6 Flash / 3.5 Flash-Lite 适配，Vertex AI 认证错误提示改进，社区对新模型/企业认证接入保持高关注。

## 6. 开发者关注点

- **Subagent 行为不可控**：要么不主动使用 skill，要么在禁用后仍被调用，要么直接挂起，说明 agent 路由和权限边界仍需大幅改进。
- **简单命令也会卡死**：`gemini-cli` 执行完 shell 命令后仍显示 “Waiting input”，以及创建 Vite 应用时卡在交互式 prompt，是高频痛点。
- **配置损坏的“静默救援”不值得信任**：MCP enablement 配置 JSON 损坏会让安全状态从 disabled 变 enabled，开发者期望失败时显式报错而非 fail-open。
- **Auto Memory 需要更克制**：低信号会话反复重试、无效 patch 静默跳过、脱敏发生得太晚，开发者认为记忆系统需要“先设计隐私，再设计功能”。
- **文件系统/工具链摩擦**：自定义 agent 如果是 symlink 则不被识别、模型喜欢在随机目录生成临时编辑脚本、频繁使用非 AST 感知的文件读取导致 token 浪费，都是实际工作中的体感问题。

---
*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 更新截至 2026-08-13*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-13

## 今日速览

过去 24 小时无新版本发布，社区讨论热度集中在 **MCP 远程服务器的可靠性问题**（OAuth 刷新失败、5xx 重试缺失、Docker 容器资源泄漏）以及**模型管理相关的配置被静默忽略**（子代理 model 覆盖、BYOK 模型选择器）。此外，多个与 Windows/WSL2 平台相关的输入和终端渲染问题持续引起关注。

## 社区热点 Issues

### 1. [Issue #4390] Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5 and Kimi K3)
- **作者**: Rogn | **评论**: 5 | **👍**: 4
- **链接**: https://github.com/github/copilot-cli/issues/4390
- **重要性**: ⭐⭐⭐⭐⭐
- **摘要**: 企业组织在 Copilot Business 中显式启用的模型（Claude Sonnet 5/Opus 5、Kimi K3）未出现在 CLI 模型目录中，选择时提示被组织禁用。这是企业用户面临的直接阻塞问题。
- **社区反应**: 获得较高 👍 支持，多名用户确认遇到类似情况，正在等待 GitHub 官方修复。

### 2. [Issue #1305] Support CIMD for Remote OAuth MCP Servers
- **作者**: ellismg | **评论**: 5 | **👍**: 35
- **链接**: https://github.com/github/copilot-cli/issues/1305
- **重要性**: ⭐⭐⭐⭐⭐
- **摘要**: 自 0.0.389 支持 DCR 标准的远程 MCP OAuth 之后，社区请求进一步支持 CIMD（Center for Internet Security 相关认证标准），以实现更灵活的远程 MCP 认证流程。
- **社区反应**: 35 个 👍 是当前 Issue 中最高之一，表明远程 MCP 认证扩展是社区高度关注的方向。

### 3. [Issue #4328] Ctrl+H misinterpreted as Ctrl+Backspace under WSL2
- **作者**: dimbleby | **评论**: 6 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4328
- **重要性**: ⭐⭐⭐⭐
- **摘要**: 在 WSL2 环境下（Windows Terminal 的 `WT_SESSION` 环境变量泄漏），`Ctrl+H`（删除前一字符）被误识别为 `Ctrl+Backspace`（删除整个单词），影响日常输入效率。
- **社区反应**: 用户反馈积极，认为是 Windows Terminal + WSL2 环境下的高频痛点，涉及终端渲染和输入拦截的底层交互。

### 4. [Issue #1730] sessionStart hook in .github/hooks/ does not fire
- **作者**: jiaczh | **评论**: 8 | **👍**: 3
- **链接**: https://github.com/github/copilot-cli/issues/1730
- **重要性**: ⭐⭐⭐⭐
- **摘要**: `.github/hooks/*.json` 中定义的 `sessionStart` 钩子在 Windows 11 + PowerShell 7 环境下不执行。自 2 月提出至今仍在讨论，涉及插件系统和生命周期事件机制。
- **社区反应**: 该 Issue 已持续 5 个月仍未解决，评论数达 8 条，开发者表达了较强烈的困扰。

### 5. [Issue #4464] Remote MCP OAuth: silent refresh fails with AADSTS70011
- **作者**: madhavdeshpande | **评论**: 0 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4464
- **重要性**: ⭐⭐⭐⭐
- **摘要**: Microsoft Entra OAuth 认证的远程 MCP 服务器，静默刷新因 scope 混用（`.default` 与资源特定 scope 冲突）始终失败，导致每 60-75 分钟强制弹出交互式登录窗口，严重打扰工作流。
- **社区反应**: 新建 Issue，尚无讨论，但问题描述非常具体，根因清晰。

### 6. [Issue #4432] rubber-duck: model-emitted `model` argument silently overrides complementary strategy
- **作者**: eggboy | **评论**: 2 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4432
- **重要性**: ⭐⭐⭐⭐
- **摘要**: `rubber-duck` 子代理设计初衷是跨模型家族提供第二意见（Claude 会话由 GPT 审查，反之亦然），但 `task` 工具允许模型自行传入 `model` 参数，静默覆盖了 `complementary` 策略和用户的 `/subagents` 设置。
- **社区反应**: 社区认为这是一个设计层面的漏洞，模型可以通过参数绕过策略约束。

### 7. [Issue #4466] Remote MCP: transient 5xx on initialize marks server failed for whole session
- **作者**: madhavdeshpande | **评论**: 0 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4466
- **重要性**: ⭐⭐⭐⭐
- **摘要**: 远程 HTTP MCP 服务器在启动时 `initialize` 请求遇到瞬时 502，CLI 会将服务器标记为会话级硬失败，整个会话不会重试。对于不稳定的网络环境，这会导致 MCP 功能一整天不可用。
- **社区反应**: 新提交 Issue，反映了远程 MCP 在生产环境中的稳定性问题。

### 8. [Issue #4468] `--server --stdio` never releases extension-host processes
- **作者**: bghgary | **评论**: 0 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4468
- **重要性**: ⭐⭐⭐⭐
- **摘要**: 当 CLI 以长驻服务器模式（`--server --stdio`，Windows 桌面应用即采用此模式）运行时，每个会话创建 4 个扩展主机子进程，会话结束后这些进程不会终止，直到服务器退出。
- **社区反应**: 由 GitHub 用户提交并由 Copilot 代录，反映出资源泄漏问题在桌面集成场景中尤为突出。

### 9. [Issue #4461] Stdio Docker MCP containers remain running after closing a session
- **作者**: mattheusbr | **评论**: 0 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/4461
- **重要性**: ⭐⭐⭐⭐
- **摘要**: 多个会话使用本地 stdio Docker MCP 服务器时，关闭一个会话不会终止该会话启动的 Docker 容器。长时间使用会积累大量残留容器，占用系统资源。
- **社区反应**: 该 Issue 有重复提交（#4460 同时关闭），说明用户对这个问题非常关注，且希望确保被看到。

### 10. [Issue #3976] native `tgrep` indexer OOM-kills the host on large monorepos
- **作者**: reillysiemens | **评论**: 2 | **👍**: 0
- **链接**: https://github.com/github/copilot-cli/issues/3976
- **重要性**: ⭐⭐⭐
- **摘要**: 启用 `copilot_cli_tgrep` 实验特性后，原生 Rust 实现的 tgrep 三字母组索引器在大型 monorepo 上会以 OOM（内存耗尽）方式杀死宿主机。索引守护进程没有内存上限。
- **社区反应**: 对于大型仓库用户来说是严重问题，但目前影响范围限于实验特性开启者。

## 重要 PR 进展

过去 24 小时共有 3 个 PR 更新，其中值得关注的是：

### 1. [PR #4449] Migrate pull request automation away from pull_request_target
- **作者**: mrecachinas | **状态**: OPEN | **更新**: 2026-08-12
- **链接**: https://github.com/github/copilot-cli/pull/4449
- **摘要**: 将无效标签自动化从 `pull_request_target` 迁移到更安全的权限模型：使用 issue 级写令牌直接关闭无效 Issue，使用无权限的 `pull_request` 信号处理可合并 PR，特权步骤移至 `workflow_run`。这是 GitHub Actions 安全最佳实践的重要改进，能避免 `pull_request_target` 的权限滥用风险。

### 2. [PR #4453] Julesdemangeot ship it patch 1
- **作者**: julesdemangeot-ship-it | **状态**: CLOSED | **更新**: 2026-08-12
- **链接**: https://github.com/github/copilot-cli/pull/4453
- **摘要**: 自动生成的补丁 PR，已被关闭，无实际合并内容。

### 3. [PR #4452] Revert 5 copilot/fix with copilot
- **作者**: julesdemangeot-ship-it | **状态**: CLOSED | **更新**: 2026-08-12
- **链接**: https://github.com/github/copilot-cli/pull/4452
- **摘要**: 自动生成的 revert PR，已被关闭，无实际合并内容。

> **注**：今日 PR 数量较少，且后两个为自动化机器人产生的无效 PR。核心看点集中在 #4449 的 CI 安全加固上。

## 功能需求趋势

从过去 24 小时的 Issue 中，可以提炼出以下社区最关注的功能方向：

### 1. 远程 MCP 服务器的生产级可靠性（最高频 🔥）
- **OAuth 静默刷新**（#4464）与 **CIMD 支持**（#1305）成为认证方向的两大诉求
- **瞬时故障重试机制**（#4466）：5xx 错误不应造成整个会话的永久失败
- **容器/进程生命周期管理**（#4461、#4468）：MCP 服务器资源释放缺失

### 2. 模型管理与 BYOK 体验优化
- **BYOK 模型选择器**（#4358）：希望 `/models` 能从自定义 provider 的 `/models` 端点动态拉取，而不是仅显示一个配置模型
- **统一模型目录**（#4390）：企业组织的模型启用状态与 CLI 不一致
- **子代理模型覆盖语义**（#4432、#4458、#4462）：模型参数被静默忽略或覆盖，需要明确的优先级规则

### 3. 会话持久化与上下文质量
- **跨压缩的持久上下文**（#4441）：反复压缩导致早期决策丢失
- **会话恢复可靠性**（#4469）：孤儿 permission 事件在每次恢复时重放，无法清除
- **事件存储耗尽处理**（#4467）：长时会话大量子代理导致存储耗尽，状态不可信

### 4. 平台兼容性（Windows 生态）
- **WSL2 输入处理**（#4328）：`WT_SESSION` 环境变量导致按键映射错乱
- **Windows 套接字错误**（#4463）：MCP OAuth 在 Windows 上的 socket 10013 错误
- **系统 gh.exe 支持**（#4456）：允许使用系统安装的 GitHub CLI 而非捆绑版本

## 开发者关注点

### 痛点 1：配置与行为不一致，模型被"静默"替换
多个 Issue（#4432、#4458、#4462）指向同一类问题：开发者在子代理或配置中显式指定的模型，被 CLI 通过某种内部逻辑静默替换或忽略。这会让开发者对工具的确定性失去信任，建议增加显式的模型选择确认和日志输出。

### 痛点 2：Windows/WSL2 下的输入体验问题反复出现
从 `Ctrl+H` 被误识别到 MCP OAuth 的 socket 错误，Windows 平台的问题呈现出"打地鼠"的状态。这与 GitHub Copilot CLI 团队在 Linux 上的测试重心有关，Windows 用户需要更系统的兼容性验证。

### 痛点 3：MCP 生态的"最后一公里"体验不足
远程 MCP 是当前最热门的功能方向，但 OAuth 刷新、错误重试、进程回收等生产环境必要能力尚未成熟。开发者希望在 MCP 服务器数量增加的同时，稳定性能够同步跟上。

### 痛点 4：长时会话的资源泄漏与状态错乱
`--server --stdio` 的扩展进程不释放、Docker MCP 容器不回收、事件存储耗尽等问题，集中反映了长驻场景下的资源管理薄弱。对于将 Copilot CLI 嵌入桌面应用或 CI 的开发者来说，这些是阻塞性问题。

### 痛点 5：重复提交的 Issue 增多
#4460/#4461、#4458/#4462 等多组内容相似的 Issue 同时存在，说明开发者对问题响应速度有所不满，也反映出社区活跃度在持续上升。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-13）

## 今日速览
今日无新版本发布。社区最受关注的是 **#1283「记忆系统」功能请求**，该 Issue 自 2 月提出以来持续保持热度，今日仍有状态更新，36 条评论展现出社区对跨会话上下文管理的强烈需求。同时，两枚 bug 修复 PR（#2449、#2324）在昨日有动态更新，均聚焦于稳定性与边界处理。

## 版本发布
无。

## 社区热点 Issues
> 说明：过去 24 小时内有更新的 Issue 仅 1 条，已完整列出。

### #1283 [增强] 记忆系统 — 跨会话持久上下文
- **作者**: CatKang | **创建**: 2026-02-27 | **更新**: 2026-08-13 | **评论**: 36 | 👍: 0
- **链接**: [Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **核心诉求**: 实现「自动记忆 + 手动记忆」双轨机制，让 CLI 跨会话记住项目模式、用户偏好与关键上下文——自动记忆由 AI 自主管理笔记，手动记忆由用户通过命令定义长期指令。
- **为什么重要**: 该 Issue 从创建至今活跃近半年且讨论持续，说明记忆能力是当前 AI 编程工具的刚需。它有望将 Kimi Code CLI 从「一次性对话工具」升级为「长期项目伙伴」，对重度用户的工作流影响显著。
- **社区反应**: 36 条评论，开发者讨论重点集中在实现复杂度、记忆存储方案（文件 vs 向量库）、数据隐私与遗忘机制上，需求真实且热度高。

## 重要 PR 进展
> 说明：昨日更新的 PR 共 2 条，均开放中。

### #2449 [修复] 字符串处理：shorten_middle 需在长度检查前去除换行
- **作者**: Ricardo-M-L | **创建**: 2026-06-13 | **更新**: 2026-08-12 | **状态**: Open
- **链接**: [PR #2449](https://github.com/MoonshotAI/kimi-cli/pull/2449)
- **修复内容**: `shorten_middle(text, width, remove_newline=True)` 被 `extract_key_argument` 用于渲染工具调用关键参数的**单行摘要**，但函数在短输入时会提前返回，**早于**换行折叠逻辑，导致单行输出中混入意外换行。此修复调整了执行顺序，保证所有输出均经过换行清理。

### #2324 [修复] Web 端：SessionProcess.send_message 处理 BrokenPipeError
- **作者**: Ricardo-M-L | **创建**: 2026-05-19 | **更新**: 2026-08-12 | **状态**: Open
- **链接**: [PR #2324](https://github.com/MoonshotAI/kimi-cli/pull/2324)
- **修复内容**: `SessionProcess.send_message` 向子进程 stdin 写入时，未防御子进程在 `start()` 后、写入前已退出的竞态条件，可能触发 `BrokenPipeError` 导致 Web Runner 崩溃。PR 补充了进程存活检查与异常兜底，提升消息发送的健壮性。

## 功能需求趋势
基于当前活跃 Issue/PR 观察，社区最关注的方向包括：
- **持久化记忆系统**：跨会话保留项目上下文、用户偏好与关键模式，且要求自动/手动双轨机制（#1283）。
- **稳定性与错误恢复**：Web/服务化场景下的子进程生命周期管理（#2324），以及字符串渲染的边界处理（#2449），显示出对生产环境可靠性的关注。
- **单行摘要的格式一致性**：工具调用参数等长文本在日志/界面中的紧凑展示，期望不因输入长度不同而变化格式。

## 开发者关注点
- **高频痛点**：会话间无记忆导致反复描述上下文，开发者希望 CLI 能自动沉淀项目知识，减少重复劳动。
- **稳定性诉求**：子进程退出与通信的竞态条件、异常兜底不足，在自动化/服务化使用场景中会引发不可预期中断。
- **细节完善**：即使少量文本渲染逻辑（如长度截断与换行处理）也会影响日志可读性，社区希望保持输出格式的确定性。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-13

## 今日速览

今日发布 v1.18.18 与 v1.18.17 两个修复版本，重点解决 Kimi 系统提示词错误选择、xAI 模型推理强度、会话压缩与重试风暴等问题。社区层面，**免费模型额度误报**成为最大争议焦点（涉及 #14273、#42128、#42215 等多个 Issue）；配置热重载需求以 88 👍 高居功能需求榜首。PR 方面，SSE 内存优化、TUI Shell 语法高亮、服务生命周期管理等多达 10+ 项改进集中落地。

---

## 版本发布

### v1.18.18
- **修复**：官方 Moonshot / Kimi 提供商的系统提示词现可正确选择（此前错误选用默认提示词）
- **修复**：xAI 模型 `xhigh` 推理强度参数异常

### v1.18.17
- **改进**：会话压缩保留完整最近轮次，并为小型模型生成更清晰的摘要
- **新增**：MERGE 网关推理变体支持（感谢 @MatthewFeroz 贡献）
- **修复**：自动会话重试次数上限 + 抖动，消除重复重试风暴

---

## 社区热点 Issues（Top 10）

### 1. #14273 免费模型额度误报 — 已关闭（40 评论）
使用 Kimi K2.5 / MiniMax2.5 免费版时提示 “Free usage exceeded. Add credits”，但用户 Zen 账户实际有 $3 余额。该问题已关闭但引发大量讨论，社区普遍猜测为 Zen 免费配额判断逻辑 bug，且与 OpenCode 版本 1.2.6 可能相关。
🔗 https://github.com/anomalyco/opencode/issues/14273

### 2. #4832 Gemini 3 Pro 函数调用失败 — 已关闭（35 评论，14 👍）
`gemini-3-pro-preview` 在函数调用时因缺失 `thoughtSignature` 支持而报错，`webfetch` 等工具无法使用。该问题直接影响依赖 Gemini 3 Pro 的开发者，最终得以修复。
🔗 https://github.com/anomalyco/opencode/issues/4832

### 3. #6815 配置热重载 — 已关闭（8 评论，88 👍）
社区最高赞功能请求：希望从命令面板直接重载配置（`opencode.json`、`AGENTS.md`），免于手动重启。88 个 👍 表明这是用户最迫切的生产力痛点。
🔗 https://github.com/anomalyco/opencode/issues/6815

### 4. #42128 DeepSeek V4 Flash Free 首次请求即超限 — 已关闭（7 评论）
全新会话首次请求即收到 “Free usage exceeded”，但这与 #14273 类似被归为免费配额误报。有趣的是，该用户并未发起任何先前的会话，疑似免费额度初始状态 bug。
🔗 https://github.com/anomalyco/opencode/issues/42128

### 5. #3366 Chat UI Mermaid 渲染 — 已关闭（10 评论，26 👍）
用户希望 Chat UI 支持 Mermaid 图表渲染，以便直观展示架构图、流程图。26 👍 反映开发者对可视化能力的强烈诉求。
🔗 https://github.com/anomalyco/opencode/issues/3366

### 6. #41470 VSCode Server 中复制失效 — 已开启（11 评论）
Docker 环境的 VSCode Server 内，点击 “Copied to clipboard” 提示成功，但实际无法粘贴到系统剪贴板。这是 IDE 集成场景下的常见痛点。
🔗 https://github.com/anomalyco/opencode/issues/41470

### 7. #33027 MCP 工具连接但未暴露给 Agent — 已开启（7 评论）
`pdfrag` MCP 服务器通过 `tools/list` 正常暴露 6 个工具，但 agent 可用工具列表中无法看到它们。MCP 工具可见性 / 权限过滤机制可能存在缺陷。
🔗 https://github.com/anomalyco/opencode/issues/33027

### 8. #42147 Azure OpenAI 大模型无限挂起 — 已开启（4 评论）
`gpt-5.6-luna`、`gpt-5.6-sol`、`gpt-5.4`、`o3` 等大模型在 Responses API 流式传输时无限挂起，而 `gpt-5-mini` 等小模型正常。疑似与大模型首 token 延迟或响应格式有关。
🔗 https://github.com/anomalyco/opencode/issues/42147

### 9. #42170 Desktop 崩溃：project_id 列缺失 — 已开启（2 评论）
Desktop 1.18.17 启动加载会话时，`Project.migrateProjectId` 报 “no such column: project_id”，导致应用无法启动。该问题直接对应 PR #42169 的修复。
🔗 https://github.com/anomalyco/opencode/issues/42170

### 10. #17073 .env 文件保护漏洞 — 已开启（6 评论）
权限规则作用于 grep/glob 的搜索模式而非匹配文件路径，导致 `read: {"*.env": "deny"}` 可绕过——当搜索 `*` 时，`src/.env` 仍会被读取。安全敏感，社区呼吁尽快修复。
🔗 https://github.com/anomalyco/opencode/issues/17073

---

## 重要 PR 进展（Top 10）

### 1. #42209 fix(client): 取消 SSE 读取器以减少内存增长
长生命周期 Promise SSE 订阅在重连/取消时，AbortSignal 残留导致原生内存持续增长。该 PR 在握手后正确取消 SSE reader，降低原生内存占用。
🔗 https://github.com/anomalyco/opencode/pull/42209

### 2. #42214 feat(tui): Bash Shell 输入语法高亮
TUI 的 Shell 模式现使用现有 Tree-sitter Bash 解析器，对关键字、字符串、变量、注释等语法进行高亮。普通 Chat 提示词不受影响。
🔗 https://github.com/anomalyco/opencode/pull/42214

### 3. #42158 fix(opencode): question 工具桥接 ACP
修复 ACP 模式下 `question` 工具无限阻塞的问题——`question.asked` 事件需携带 QuestionV2 请求 ID 传递给 `sdk.question.reply/reject` 以解除阻塞。Closes #38121。
🔗 https://github.com/anomalyco/opencode/pull/42158

### 4. #42185 fix(client): 防止旧服务替换新服务
此前客户端要求精确版本匹配，升级后旧版客户端会将新版后台服务视为“不兼容”并替换回旧版。该 PR 确保旧客户端不会覆盖新服务。
🔗 https://github.com/anomalyco/opencode/pull/42185

### 5. #42186 fix(client): 要求认证的服务停止
客户端启动替代服务前，必须让托管服务认证并接受精确实例的停止请求，避免超时后 `SIGTERM/SIGKILL` 被滥用。
🔗 https://github.com/anomalyco/opencode/pull/42186

### 6. #42188 fix(tui): 迁移状态错误重试
后台服务重启导致的瞬时传输断开，不再中断迁移状态轮询或误报迁移失败，而是在 1 秒后自动重试。
🔗 https://github.com/anomalyco/opencode/pull/42188

### 7. #42202 feat(opencode): 会话预算限制（新功能）
新增可选 per-session 预算：达到成本上限后自动停止助手，并在 TUI 侧边栏 Context 面板提供预算查看/设置小部件。
🔗 https://github.com/anomalyco/opencode/pull/42202

### 8. #42206 fix(tui): 省略隐式 cd 自动补全前缀
修复当前目录 `/cd` 自动补全时多余的 `./` 前缀问题，同时保留 `../`、`~/` 和绝对路径。
🔗 https://github.com/anomalyco/opencode/pull/42206

### 9. #42169 fix(core): 恢复 workspace.project_id
修复 Desktop 因 `no such column: project_id` 崩溃的问题，在 workspace 表重建时恢复 project_id 迁移。Closes #42170。
🔗 https://github.com/anomalyco/opencode/pull/42169

### 10. #28689 fix(permission): 通配符与 globstar 支持
修复 `*` 不匹配 `/` 的问题，并添加 `**` globstar 支持，确保 `read: {"*.env": "deny"}` 能真正拦截 `src/.env`。Closes #28150。
🔗 https://github.com/anomalyco/opencode/pull/28689

---

## 功能需求趋势

| 趋势方向 | 代表 Issue/PR | 社区热度 |
|---------|--------------|---------|
| **配置热重载** | #6815 | 🔥 88 👍，最高赞需求 |
| **可视化增强** | #3366 Mermaid 渲染 | 26 👍，期待值高 |
| **终端交互优化** | #19005 路径可点击、#42214 Shell 高亮 | 持续推进中 |
| **预算与配额控制** | #42202 会话预算限制 | 成本敏感用户需求 |
| **MCP 生态扩展** | #33027 MCP 工具暴露、#40111 每服务器信任配置 | MCP 集成趋于深度化 |
| **权限与安全** | #17073 .env 保护、#28689 通配符修复 | 安全治理在收紧 |

---

## 开发者关注点

1. **免费额度误报 / 计费同步问题**（#14273、#42128、#42132、#42154、#42215）：多起用户反馈明明有余额或已订阅 Go，却仍被提示 “Free usage exceeded”。社区已对免费配额判断逻辑和计费同步机制产生信任危机，短期内需要官方明确回应。

2. **服务生命周期稳定性**（#42185、#42186、#42188、#42169）：服务替换策略、认证停止、迁移状态恢复等多项 PR 集中在该领域，说明后台服务的可靠性和升级安全性开始成为核心关注点。

3. **大型模型兼容性**：#4832 Gemini 3 Pro 函数调用、#42147 Azure OpenAI 大模型挂起、#41031 MiniMax 提示词回退——模型适配仍有较多边缘场景待修复。

4. **权限系统精细化**：通配符 globstar 支持和 .env 保护修复表明开发者对安全边界更加敏感，预计后续会有更多权限配置增强。

5. **终端与桌面端体验**：剪贴板失效（#41470）、文件路径不可点击（#19005）、tab 滚动位置丢失（#42213）等细节问题被高频提及，在功能之外，用户对交互细节的要求越来越高。

---

> 数据来源：github.com/anomalyco/opencode | 统计周期：2026-08-12 ~ 2026-08-13

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-13

> 数据来源：badlogic/pi-mono（earendil-works/pi）

## 今日速览

今日社区聚焦于核心稳定性和 AI 工具链体验：上下文压缩（auto-compaction）触发不及时的问题引发最多讨论，可能造成 373k token 的 API 溢出；编辑工具（Edit tool）对空白符和单对象参数的兼容性问题被连续提出，直接影响小模型的工具调用成功率；PR 侧则持续拓展模型生态（Grok 4.6、Ollama 本地代理、Anthropic Vertex、MiniMax 图像生成），并修复了流式事件中 usage 数据丢失的问题。

---

## 社区热点 Issues

### 1. [bug] auto-compaction 在上下文超限后仍未触发，直到 provider 报错
**#6879** — 评论 18 · 👍 17 | [链接](https://github.com/earendil-works/pi/issues/6879)
> **为什么重要：** 最热门 Issue。一次 GPT-5.6-sol 的 agent 会话中，上下文占用超过 100% 后压缩仍不触发，直到 373k tokens 时 API 拒绝请求。用户建议在每次 agent 步骤后检查压缩阈值。直接影响长会话可靠性。

### 2. [bug] Mac OS 长会话高 CPU 占用
**#7730** — 评论 11 · 👍 8 | [链接](https://github.com/earendil-works/pi/issues/7730)
> **为什么重要：** 长会话下 CPU 飙升至 50–110%，内存 600–800MB，疑似与上下文/会话长度相关。Mac 用户高频反馈的性能问题。

### 3. [inprogress] Edit 模糊匹配无法处理空白符差异
**#7836** — 评论 9 · 👍 1 | [链接](https://github.com/earendil-works/pi/issues/7836)
> **为什么重要：** `normalizeForFuzzyMatch` 不归一化连续空白符，导致内容相同但空白不同的 `oldText` 匹配失败。小模型在编辑时因此频繁出错。

### 4. [bug] Edit 工具拒绝单对象 edits 参数
**#7835** — 评论 4 · 👍 0 | [链接](https://github.com/earendil-works/pi/issues/7835)
> **为什么重要：** 部分模型会将 `edits` 包装为单个对象 `{oldText, newText}`，当前实现会抛错。暴露了工具参数解析的容错不足。

### 5. [bug] @ 文件自动补全：直接子项输给深层嵌套匹配
**#8000** — 评论 3 · 👍 0 | [链接](https://github.com/earendil-works/pi/issues/8000)
> **为什么重要：** 输入 `@~/<dir>/pro` 时，深层嵌套结果排在直接子目录前面，用户几乎总是想要的那个选项反而不可见。补全排序逻辑需调整。

### 6. [bug] 冷恢复会把已由实时恢复移除的溢出消息加回历史
**#7724** — 评论 1 · 👍 0 | [链接](https://github.com/earendil-works/pi/issues/7724)
> **为什么重要：** 上下文溢出压缩后重试成功，但重开会话时失败/截断的响应又回到模型历史中，污染后续对话。

### 7. [inprogress] settings 技能目录下的根级 .md 文档被误当作技能加载
**#7805** — 评论 2 | [链接](https://github.com/earendil-works/pi/issues/7805)
> **为什么重要：** `README.md`、`AGENTS.md` 等根文档被识别为独立技能，产生误导性验证警告。

### 8. [bug] 提示编辑器在超大 buffer 中移动光标极慢
**#8029** — 评论 1 | [链接](https://github.com/earendil-works/pi/issues/8029)
> **为什么重要：** 约 7000 行输入时，单次方向键耗时 1650ms，线性增长的卡顿严重影响长文本编辑体验。

### 9. [feat] coding-agent：HTML 导出渲染 Mermaid 和 LaTeX
**#8041** — 评论 1 · 👍 1 | [链接](https://github.com/earendil-works/pi/issues/8041)
> **为什么重要：** 当前 HTML 导出跳过 TUI 的转换，Mermaid 图和 LaTeX 公式以原始文本呈现，希望对齐 TUI 渲染效果。

### 10. [bug] settings.json 写入时丢失末尾换行符
**#8009** — 评论 2 | [链接](https://github.com/earendil-works/pi/issues/8009)
> **为什么重要：** Pi 写入 `~/.pi/agent/settings.json` 时移除最终换行，导致版本控制下持续产生无意义 diff，影响日常开发流。

---

## 重要 PR 进展

### 1. fix(coding-agent): 会话持久化改为事务性写入
**#8052** — [链接](https://github.com/earendil-works/pi/pull/8052)
> `_appendEntry()` 先推进内存图再写 JSONL，持久化失败（如 ENOSPC）会导致重启后会话图损坏。改为事务性写入可避免此问题。

### 2. fix(coding-agent): 在流式事件中保留 usage 数据
**#7982** — [链接](https://github.com/earendil-works/pi/pull/7982)
> 修复 #7911——恢复到 0.84.0 之前的行为，在 JSON/RPC `message_update` 事件中携带累积 usage，同时保持消息快照省略以控制流大小。

### 3. feat: 通过本地代理使用 Ollama 模型
**#8049** — [链接](https://github.com/earendil-works/pi/pull/8049)
> 提供两个零依赖 Node.js 脚本，让 Pi 通过本地代理连接 Ollama，跨 Ubuntu/macOS/Windows。社区对本地模型支持需求强烈。

### 4. feat(ai): 添加 Grok 4.6
**#8042** — [链接](https://github.com/earendil-works/pi/pull/8042)
> 在 xAI Responses 模型集中加入 Grok 4.6，支持 low/medium/high/xhigh 推理力度。

### 5. feat(coding-agent): HTML 导出渲染 Mermaid 图表
**#7956** — [链接](https://github.com/earendil-works/pi/pull/7956)
> 复用 TUI 的 ANSI-to-HTML 转换逻辑，在 HTML 导出的头部提供开关来渲染 Mermaid 图。对应 #8041 的前置成果。

### 6. feat(tui): 将鼠标事件分发给组件（onMouse 钩子）
**#8037 / #8032** — [链接](https://github.com/earendil-works/pi/pull/8037) · [链接](https://github.com/earendil-works/pi/pull/8032)
> 实现 #7683 中的 `Component.onMouse` 钩子，使扩展组件能接收鼠标滚轮和 SGR 点击事件。两个 PR 分别独立实现，社区对扩展 TUI 交互兴趣浓厚。

### 7. fix: triggerTurn: false 不应触发新回合
**#8022** — [链接](https://github.com/earendil-works/pi/pull/8022)
> 修复 #7783。此前 `agent_end` 扩展处理器发送 `{triggerTurn: false}` 的自定义消息仍会启动二次假响应。现在自定义消息不再强制走 `agent.steer()` 流式路径。

### 8. feat(ai): 添加 Anthropic Vertex 提供商
**#5262** — [链接](https://github.com/earendil-works/pi/pull/5262)
> 为 Claude on Google Cloud Vertex AI 添加内置 `anthropic-vertex` 提供商，复用现有 Anthropic Messages 流式路径，是长期追踪的企业级需求。

### 9. feat(ai): 添加 MiniMax 图像生成（Img2Img）
**#8030** — [链接](https://github.com/earendil-works/pi/pull/8030)
> 支持通过全局和 CN 图像 API 进行图生图生成，包含 URL 和 base64 响应解析。

### 10. feat(ai): 添加同步语音生成
**#8014** — [链接](https://github.com/earendil-works/pi/pull/8014)
> 补齐全局和 CN 端点的同步语音合成 SDK 路径，注册类型、模型目录与基于 Bearer 的同步传输。

---

## 功能需求趋势

1. **本地模型与私有化部署支持**：Ollama 本地代理（#8050/#8049）、llama.cpp 全模型列表（#8051）、Scaleway EU 托管（#6165）等议题表明，开发者越来越关注数据隐私、零留存和本地推理。

2. **多提供商与最新模型接入**：Grok 4.6（#8042）、DeepSeek 参数兼容修复（#8018）、Anthropic Vertex（#5262）、Xiaomi 计费调整（#4112）——Pi 正快速扩展其 provider 生态，同时也在解决各家 API 的兼容性细节。

3. **TUI 可交互性与自定义能力**：组件接收鼠标事件、可配置滚轮步长、斜杠命令菜单支持行中触发、滚动位置指示器（#7970）等，社区希望终端 UI 更贴近 IDE 的交互体验。

4. **HTML 导出质量提升**：Mermaid/LaTeX 渲染（#8041/#7956）之外，对齐 TUI 的渲染效果正成为文档分享场景的显性需求。

5. **上下文管理智能化**：从自动压缩不触发（#6879）到恢复时的历史污染（#7724），长会话的上下文治理是当前稳定性痛点的核心。

---

## 开发者关注点

- **编辑工具（Edit tool）的鲁棒性不足**：模糊匹配对空白敏感（#7836）、单个对象参数被拒绝（#7835）——这是 AI 编码工具的核心路径，对小型模型的容错亟需加强。
- **性能问题反复出现**：Mac 高 CPU（#7730）、大输入框卡顿（#8029）表明长会话/大缓冲区的性能优化仍有较大空间。
- **配置与文件的兼容性细节**：settings.json 丢失换行（#8009）、WSL 下 `file://` 路径映射错误（#8054）、CJK 终端下全角字符宽度计算错误（#8055）——这些“小问题”在真实工作流中会造成持续的摩擦。
- **持久化可靠性**：会话写入的顺序问题（#8052）和流式事件中 usage 丢失（#7911）显示，底层数据一致性仍是开发者信任的关键。
- **扩展 API 能力边界**：自定义消息的发布确认（#8023）、控制辅助消息显示（#8035）、暂停/恢复 UI 钩子等，社区希望扩展层获得更精细的介入能力，同时不破坏 Pi 自身的回合管理。

---

*本日报由 AI 生成，所有数据来自公开 GitHub 仓库。如有疏漏，欢迎指正。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-13

> 数据来源：github.com/QwenLM/qwen-code  
> 过去 24 小时共更新约 50 条 Issue、50 条 PR。

## 今日速览

Qwen Code Desktop 连续发布 `desktop-v0.2.0` 与 `desktop-v0.2.1`，主要修复 WebShell 历史分页稳定性，并将默认项目记忆调整为 workspace 作用域。社区讨论集中于长任务自动运行可靠性、Session 恢复/重放一致性，以及 Vertex AI 无密钥认证问题；serve、review、CI 稳定性和 WebShell 方向也有多个人气 PR 推进。

## 版本发布

- [desktop-v0.2.1](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.1)：默认项目记忆改为 workspace 作用域（`refactor(serve)`）；对齐会话生命周期遥测（`feat(telemetry)`）。
- [desktop-v0.2.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.0)：修复 WebShell transcript 历史分页稳定性；新增会话目录（session catalog）分享能力。
- `dsw-eas-smoke-20260812-281542bfdc`：非生产环境 DSW EAS 基础设施 smoke 测试，不发布 SWE score，基准参考 `v0.21.2`。

## 社区热点 Issues

1. **#7040 RFC: Reliable auto-memory recall — timing, quality, and telemetry**  
   [Issue #7040](https://github.com/QwenLM/qwen-code/issues/7040)  
   10 条评论，P2 feature request。社区关注点是把 memory recall 的“时机、质量、遥测”做成可信能力。当前 `recall delivery telemetry` 已并入 #7393，受限的 initial-turn recall 与多语言评测仍在 #8716 审查中。

2. **#8963 不能自动运行：auto/yolo 模式跑长任务会卡住**  
   [Issue #8963](https://github.com/QwenLM/qwen-code/issues/8963)  
   9 条评论。用户反馈无论选择 yolo 还是 auto，跑 Python 脚本或 `del` 等命令都会停在原地，无法完成过夜/数天长任务，并对比 Kimi Code 的稳定性。社区需要更可靠的无人值守执行模式。

3. **#8957 [Regression] Qwen Code 自 0.21.2 起加载图片即崩溃**  
   [Issue #8957](https://github.com/QwenLM/qwen-code/issues/8957)  
   8 条评论。0.21.1 正常，0.21.2 后读取图片立刻崩溃，属于影响面较大的回归，已挂 `need-retesting`。图片/多模态输入稳定性是当前明显痛点。

4. **#8678 大 Session restore 超时时，应保留当前会话**  
   [Issue #8678](https://github.com/QwenLM/qwen-code/issues/8678)  
   7 条评论，P1 bug。涉及 serve daemon 的 session restore 超时契约与可观测性。PR1 已通过 #8691 合入，重点修复超时安全、迟到请求和 restore 状态展示。

5. **#8562 tmux 内闪屏：通过 iTerm2 + SSH 连接 Ubuntu 后进入 tmux 出现**  
   [Issue #8562](https://github.com/QwenLM/qwen-code/issues/8562)  
   7 条评论。社区反馈在 tmux 分屏内对话时闪屏，用户用 Qwen 3.8 Max 定位后怀疑是 Qwen Code 版本问题。属于 Linux/交互终端渲染回归风险。

6. **#8097 后台 Agent 协调缺陷：重复劳动、提前完成、send_message 不可交互**  
   [Issue #8097](https://github.com/QwenLM/qwen-code/issues/8097)  
   6 条评论。多个后台 Explore 子代理并行时，父代理会重复子代理工作，且 `send_message` 在运行中不可交互。这是多代理编排方向的关键 gap。

7. **#7306 Harden tool-output budgeting、可观测性与 artifact 生命周期**  
   [Issue #7306](https://github.com/QwenLM/qwen-code/issues/7306)  
   5 条评论。Phase 1 正确性已通过 #7323 合入，Shell no-artifact 回归测试与 `persistedOutputFiles` 三态文档在 #7470 合入。社区很关注工具输出对上下文的消耗控制。

8. **#8897 `--approval-mode` 和 `--auth-type` 已被注册，但 missing from `qwen --help`**  
   [Issue #8897](https://github.com/QwenLM/qwen-code/issues/8897)  
   5 条评论。CLI 参数可被解析和校验，却不出现在帮助信息里，影响可发现性和用户排障，属于 CLI 文档/实现一致性 bug。

9. **#9015 Main 分支 CI 失败：E2E Tests 在 05079297d26c 失败**  
   [Issue #9015](https://github.com/QwenLM/qwen-code/issues/9015)  
   4 条评论，P1。由 qwen-code-dev-bot 自动跟踪，E2E 测试尚未产出结果即失败。主分支健康状态需要尽快修复。

10. **#9026 `NO_TOOL_RESULT_PROGRESS` 导致 headless 运行直接失败**  
    [Issue #9026](https://github.com/QwenLM/qwen-code/issues/9026)  
    3 条评论。当模型在 tool result 后安静结束回合时，headless 流会以 `InvalidStreamError` 中断。对自动化非交互场景影响较大。

## 重要 PR 进展

1. **#8905 feat(serve): adaptively grow live-journal caps before truncating mid-turn replay**  
   [PR #8905](https://github.com/QwenLM/qwen-code/pull/8905)  
   当正在进行的 turn 超过 session live-journal 上限时，优先扩容而不是丢弃旧 replay 条目；PR 还会按比例扩展 entries，降低长会话中途丢失上下文的风险。

2. **#8971 feat(core): write per-agent transcripts for workflow dispatches**  
   [PR #8971](https://github.com/QwenLM/qwen-code/pull/8971)  
   工作流 `agent()` 分发现在会为每个 agent 生成与 Agent 工具一致的 JSONL transcript，记录 prompt 与执行上下文，显著提升工作流可追踪性。

3. **#8972 feat(core): let a workflow agent pin a directory and outlive the default bounds**  
   [PR #8972](https://github.com/QwenLM/qwen-code/pull/8972)  
   工作流子代理可通过 `agent({ workingDir })` 固定到指定 git worktree，并支持超出默认执行边界，适合更长时间的自动化任务。

4. **#8874 feat(web-shell): support workspace file uploads**  
   [PR #8874](https://github.com/QwenLM/qwen-code/pull/8874)  
   WebShell 编辑器支持拖拽/选择文件上传，可顺序上传、显示进度、取消、自动冲突重命名，并在 `@` 文件面板中新增“上传文件”入口。

5. **#8848 feat(web-shell): redesign Channel policy and workspace management**  
   [PR #8848](https://github.com/QwenLM/qwen-code/pull/8848)  
   重做 WebShell 的 Channel 管理，开放 DM、群组访问、会话路由和工作区所有权控制，并支持 allowlist 配置，强化多适配器场景。

6. **#8777 feat(review): add Maven multi-module verification**  
   [PR #8777](https://github.com/QwenLM/qwen-code/pull/8777)  
   在 `review build-test` 中注册 Maven adapter，可识别 Maven 根项目并执行多模块验证；基础工具链 adapter 边界已在 #8776 合并。

7. **#8740 feat(serve): share one Chrome bridge across sessions via multi-client /cdp tunnel**  
   [PR #8740](https://github.com/QwenLM/qwen-code/pull/8740)  
   把 daemon 的 `/cdp` tunnel 改为多客户端，并允许非 daemon 进程复用，使多个 session 共享同一个 Chrome extension bridge，降低资源消耗。

8. **#8978 feat(serve): no-op on empty channel set and restore only active channels (`--channel all`)**  
   [PR #8978](https://github.com/QwenLM/qwen-code/pull/8978)  
   修复 `qwen serve --channel all` 在有效 channel 集合为空时直接 `exit(1)` 的问题；改为优雅 no-op，并只恢复此前活跃的 channels。

9. **#9012 fix(cli): Bound headless tool result content**  
   [PR #9012](https://github.com/QwenLM/qwen-code/pull/9012)  
   对 Headless JSON adapter 中的 `tool_result.content` 施加 65,536 字节上限，超长内容改为 20/80 头尾预览并附加 transport marker，与 #8447 的传输约束对齐。

10. **#8982 fix(ci): reduce ENOSPC and load-sensitive test flakes**  
    [PR #8982](https://github.com/QwenLM/qwen-code/pull/8982)  
    降低 Test 门禁对共享 runner 负载和 `/tmp` 压力的敏感度，优化 idle-watchdog 测试的边界用例执行方式，减少 CI 抖动。

## 功能需求趋势

- **长任务与自主运行可靠性**：社区强烈期望 `auto/yolo` 模式能稳定执行几小时甚至数天任务，包括无人值守接收决策和更强的失败恢复。相关：#8963、#8972、#8097。
- **Memory / Context 治理**：自动记忆召回、工具输出预算、截断阈值配置是反复出现的方向。相关：#7040、#7306、#8922。
- **Session 恢复与 daemon 韧性**：大 session restore 超时、`--resume` 后的 transcript 一致性、channel 为空时 daemon 优雅退出等。相关：#8678、#8979、#8975。
- **云平台认证与集成**：Vertex AI 的 ADC/keyless 认证无法自动推断，以及 Python SDK 参数与 CLI 行为不一致。相关：#9016、#9025、#9002。
- **WebShell / Desktop UI 体验**：文件上传、Channel 策略管理、会话命名保持、分页稳定性、界面闪烁/抖动等。相关：#8874、#8848、#8562、#8977、#8985。
- **多模态与 Omni 实验**：Omni 多模态接入实验总纲仍在推进，文件识别与 metadata 设计文档已并列进入路线图。相关：#8197。

## 开发者关注点

- **无人值守长任务不稳定**：有开发者明确表示“哪怕再加一个无脑接受模式也行”，说明当前模式确认机制对夜间/长任务不够友好。
- **回归问题集中在渲染与图片加载**：0.21.2 后图片加载崩溃、tmux 闪屏等问题让部分开发者停留在旧版本，稳定性优先级很高。
- **Session 数据一致性**：`MAX_TOKENS` 恢复后 transcript 与内存历史不一致，`--resume` 会重新水合出重复 turn，影响长会话续跑。
- **CLI/SDK 行为不一致**：`--help` 缺失部分已支持的参数；Python SDK 不认 CLI 已支持的 `permission_mode="auto"`，增加接入成本。
- **Google Cloud 认证摩擦大**：Vertex AI 无法直接使用 ADC，无 key 环境下 headless 直接退出；配置 key 后反而产生 401，认证路径需要统一。
- **后台 Agent 协作 gap 明显**：多个 background agent 同时运行时存在重复劳动、提前完成和 `send_message` 不可交互的问题，影响多代理生产可用性。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报

**2026-08-13**

> 数据来源：Hmbown/CodeWhale（原 DeepSeek-TUI 项目）


## 今日速览

昨日社区迎来关键转折：**v0.9.6 正式发布**，项目以 **CodeWhale** 品牌继续演进，旧 `deepseek-tui` npm 包正式弃用。与此同时，**社区 PR 合并进入高峰期**——三项由外部贡献者提交的 PR（#5319/#5320/#5321）均以 Harvest 方式被维护者落地，但因基础分支漂移导致原 PR 关闭，新版由维护者代为提交。Bug 修复方面，Auto-Review 回归（#5323）、MCP `nextCursor` 协议违规（#5335）以及复制消息混入 UI 装饰字符（#5314）是社区反馈最集中的三个问题。


## 版本发布

### v0.9.6（2026-08-13 发布）

Codewhale 正式成为 Shannon Labs 的公开产品品牌。本次发布要点：

- `codewhale` 命令、npm 包、release 资产统一采用小写技术标识符；
- 旧 npm 包 `deepseek-tui` 已弃用，不再获得后续 release；
- 来自 v0.8.x 旧版 `deepseek` / `d...` 的用户需迁移至新命令。

> 🔗 https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.6


## 社区热点 Issues（10 条精选）

### 1. #5323 [OPEN] v0.9.5 回归：Auto-Review 模式静默拦截所有 Bash 调用与写入操作
- **作者**: USTHzhanglu | 更新: 08-12 | 评论: 3
- **重要性**: ⭐⭐⭐⭐⭐ 影响所有 v0.9.5 用户的自动化工作流。Auto-Review 模式从"自动批准全部工具调用"退化为"静默拦截"，导致 Agent 无法正常执行 Bash 和文件写入。
- **社区反应**: 报告者明确指出版本间行为差异，属于高优回归 bug。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5323

### 2. #5335 [OPEN] MCP 协议违规：tools/list 与 resources/list 返回 "nextCursor": null
- **作者**: xiaoray-blip | 更新: 08-12 | 评论: 1
- **重要性**: ⭐⭐⭐⭐⭐ 严格 MCP 客户端（如 Claude Code）会直接拒绝响应（`expected string, received null`），导致 `serve --mcp` 无法配合主流客户端使用。
- **社区反应**: 提交者已附带修复 PR #5336，问题定位清晰。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5335

### 3. #4949 [OPEN] 讨论："Constitution" 的中文翻译应为何者？
- **作者**: SparkofSpike | 创建: 07-28 | 更新: 08-12 | 评论: 9
- **重要性**: ⭐⭐⭐⭐ 社区对中文文案的本地化争议。作者在 PR #4908 中改回"宪法"，但社区担心中文语境下的敏感性。9 条评论说明讨论热度高，且直接关系到中文用户的产品认知。
- **社区反应**: 中文本地化贡献者持续讨论，尚未达成一致。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/4949

### 4. #5314 [CLOSED] 复制消息包含 rail 装饰字符（● ▏）
- **作者**: maimik | 创建: 08-09 | 更新: 08-12 | 评论: 2
- **重要性**: ⭐⭐⭐⭐ 影响日常复制粘贴体验。右键"Copy message"复制出的内容混有 role 字形和 rail 字符，用户必须手动清理，社区反馈为 "should be rail-clean like selection copy"。
- **社区反应**: 该 issue 已由社区 PR #5319 修复并合入。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5314

### 5. #5209 [CLOSED] File 工具 edit 模式静默接受错误参数名并报告假成功
- **作者**: yekern | 创建: 08-03 | 更新: 08-12 | 评论: 4
- **重要性**: ⭐⭐⭐⭐ 工具可靠性问题。使用 `new_str` 而非正确的 `replace` 参数时，工具不报错却返回虚假的 "Replaced" 消息，导致 Agent 每个位置需重复编辑 3-5 次。
- **社区反应**: 被标记为 bug/tools/reliability，开发者痛点明显。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5209

### 6. #5322 [OPEN] 回归：输出区域不填满宽屏终端（v0.8.65 正常）
- **作者**: M-Maciej | 创建: 08-11 | 更新: 08-12 | 评论: 2
- **重要性**: ⭐⭐⭐⭐ TUI 基础体验回归。v0.9 在宽屏终端上将输出区限制为最大宽度，宽屏用户无法利用屏幕空间。问题描述为 "Shrinking works; expanding doesn't"。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5322

### 7. #5047 [CLOSED] API 密钥只持久化在当前仓库而非全局密钥存储
- **作者**: Hmbown | 创建: 08-01 | 更新: 08-12 | 评论: 2
- **重要性**: ⭐⭐⭐⭐ 安全与体验双重问题。密钥有时只写入 `<cwd>/.codewhale/config.toml` 明文，跨项目即丢失，且密钥落在仓库中存在泄露风险。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5047

### 8. #5250 [CLOSED] 仅能保存一个 API 密钥，多提供商使用困难
- **作者**: ffyuhf | 创建: 08-05 | 更新: 08-12 | 评论: 3
- **重要性**: ⭐⭐⭐⭐ 多模型用户的核心痛点。用户同时使用 DeepSeek 和 GLM，切换模型时必须重新获取 key，无法分别保存，期望密钥可独立存储。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5250

### 9. #5316 [OPEN] EPIC-005：CodeWhale TUI Crate 分解（Umbrella）
- **作者**: aboimpinto | 创建: 08-10 | 更新: 08-12 | 评论: 5
- **重要性**: ⭐⭐⭐⭐ 架构级重构计划，涉及命令提取、模块边界定义。是 FEAT-014（PR #5328）的上游跟踪 issue，未来多项重构工作将在此 Epic 下汇总。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5316

### 10. #5337 [OPEN] Web：完成 #4934 字典主线——移除所有 isZh 分支并内联 { en, zh } 模块
- **作者**: Lstarsky0 | 创建: 08-12 | 更新: 08-12 | 评论: 2
- **重要性**: ⭐⭐⭐ 前端 i18n 架构清理。将 Web 端页面体统一迁移到按路由 locale 分发的字典路径，首批 PR #5338 已提交。属于持续性的本地化基础设施改进。
- 🔗 https://github.com/Hmbown/CodeWhale/issues/5337


## 重要 PR 进展（10 条精选）

### 1. #5329 [CLOSED] fix(tui): move lru to 0.18 and unpin ratatui-core（RUSTSEC-2026-0253）
- **作者**: Hmbown | 更新: 08-12
- **内容**: 修复 `lru` 0.16.4 的 panic-unsafe 漏洞（`LruCache::pop()` 可导致链表指针悬空），升级至 0.18.2 并解除 ratatui-core 的 pin。恢复 main 分支的绿色 CI。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5329

### 2. #5328 [OPEN] FEAT-014：命令契约 crate 边界（facets + 共享类型）
- **作者**: aboimpinto | 更新: 08-12
- **内容**: 属于 EPIC-005/006 的 TUI 命令分解第一阶段。定义命令迁移的形状与 crate 边界，不涉及生产逻辑改动。维护者为 PR 开了早期评审例外。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5328

### 3. #5336 [OPEN] fix(mcp): omit nextCursor when there are no further pages
- **作者**: xiaoray-blip | 更新: 08-12
- **内容**: 修复 #5335。当 `tools/list` 和 `resources/list` 无更多页面时，直接从响应中省略 `nextCursor` 字段，符合 MCP 规范（string or absent）。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5336

### 4. #5330 [CLOSED] fix(session): separate snapshot reads from crash recovery
- **作者**: Hmbown | 更新: 08-12
- **内容**: Harvest 社区 PR #5320（h3c-hexin）。新增 `load_session_snapshot` 支持无副作用读取；`recover_session_for_resume` 仅在已知进程/引擎重启后执行崩溃恢复，并返回修复统计。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5330

### 5. #5331 [CLOSED] fix(tui): copy messages without visual rails
- **作者**: Hmbown | 更新: 08-12
- **内容**: Harvest 社区 PR #5319（XhesicaFrost）。修复 #5314：用户与助手消息的"Copy message"改为复制 canonical 源内容而非渲染后的 Ratatui 行；保留 Tool/Thinking/System 等复杂单元格的完整输出路径。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5331

### 6. #5332 [CLOSED] feat(config): register OrcaRouter as a named provider
- **作者**: Hmbown | 更新: 08-12
- **内容**: Harvest 社区 PR #5321（XiaoHuo888-hue）。将 OrcaRouter 注册为命名提供商（`ORCAROUTER_API_KEY`，`sk-orca-` 前缀），与 OpenRouter 保持一致的接入方式，解锁 150+ 模型。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5332

### 7. #5339 [OPEN] fix(engine): suppress child-owned shell completions
- **作者**: cyq1017 | 更新: 08-12
- **内容**: 过滤子级后台 shell 完成事件，避免混入父模型流；保留无主父完成事件与任务/状态可见性。附带回归测试覆盖父/子任务。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5339

### 8. #5333 [OPEN] feat(tui): pin host terminal window as an always-on-top mini window
- **作者**: Hmbown | 更新: 08-12
- **内容**: Harvest 社区 PR #5318（SparkofSpike）。为 Windows 宿主终端窗口新增"收缩并置顶"（PiP）能力：右键菜单或 `/pin` 命令将窗口缩至 640x400 并置顶，再次触发可恢复原大小。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5333

### 9. #5338 [OPEN] feat(web): move the docs guide page onto the dictionary spine
- **作者**: Lstarsky0 | 更新: 08-12
- **内容**: #5337 的首个切片。移除 `app/[locale]/docs/guide/page.tsx` 中的 isZh 三元分支，引入每页字典模式（`DocsGuideDict` 含 9 个 key），文案原样迁移无修改。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5338

### 10. #5334 [OPEN] docs(i18n): retire the stale zh-Hant partial-pack declaration
- **作者**: Lstarsky0 | 更新: 08-12
- **内容**: PR #5143 已将 `zh-Hant.json` 补全至与 `en.json` 全量对齐，`is_partial_pack()` 对所有语言均返回 `false`。本 PR 清理系统中仍将 zh-Hant 标记为 partial pack 的 5 处残留（含 `/config` 帮助文本和设置 schema 描述）。
- 🔗 https://github.com/Hmbown/CodeWhale/pull/5334


## 功能需求趋势

从近 24 小时活跃的 27 条 Issues 中提炼出以下最受关注的功能方向：

### 1. 品牌迁移与命令统一（v0.9.6 核心）
- 项目正式更名为 **Codewhale**，旧 `deepseek-tui` / `deepseek` 命令进入弃用通道。社区讨论转向迁移路径平滑性。

### 2. TUI 扩展与窗口管理
- 新增 **PiP 悬浮迷你窗口**（#5318/#5333），支持将宿主终端窗口收缩置顶。说明社区对"轻量并行工作区"有真实需求。

### 3. 多提供商 / 多密钥管理
- 社区明确要求：**密钥按提供商分别保存**（#5250），以及 **OrcaRouter 命名提供商接入**（#5321/#5332）。当前仅支持一个 API key 的约束已成为多模型用户的主要障碍。

### 4. 国际化字典架构统一
- 多个 PR（#5334、#5337、#5338）持续将 Web 端与 TUI 端从 `isZh` 硬编码分支迁移到统一字典 spine，zh-Hant 已完成全量对齐。i18n 基础设施进入系统性清理阶段。

### 5. TUI Crate 分解（架构级重构）
- EPIC-005（#5316）+ FEAT-014（#5328）启动 TUI 命令提取与模块边界定义。虽然属于内部重构，但会逐步影响插件/扩展系统的稳定性。

### 6. MCP 协议严谨性
- `nextCursor: null` 被指违反规范（#5335/#5336），说明社区开始用严格 MCP 客户端（Claude Code）做互操作测试，对协议合规性要求提高。


## 开发者关注点

### 🔴 高频痛点 / P0 级反馈

1. **v0.9.5 Auto-Review 回归（#5323）**
   - "destructive action requires explicit review" 静默拦截所有 Bash 和写入操作，自动化工作流近乎不可用。属于版本间行为倒退，期望快速修复。

2. **复制消息混入 UI 装饰字符（#5314）**
   - "Copy message" 带出 `●` 与 `▏` rail 字符，迁移到 v0.9.5 后开始出现。已修复，但反应出渲染层与数据层边界需要更清晰的切割。

3. **MCP 严格模式兼容性（#5335）**
   - 严格 MCP 客户端直接拒绝响应。不只是美观问题，是协议级阻断 bug。期待修复 PR #5336 尽快合入。

4. **API 密钥持久化混乱（#5047 / #5250）**
   - 密钥有时只在当前仓库落盘（明文），切换项目即丢失；且只支持保存一个密钥。安全和体验双重不满足。

5. **社区 PR 因基础漂移反复关闭（#5319/#5320/#5321 → #5330/#5331/#5332）**
   - 外部贡献者的 PR 因 CI 失败（旧 base 测量、web-parity 陈旧）+ fork push 被拒而关闭，由维护者 Harvest 后代为提交。虽然结果正确，但流程体验对首次贡献者不太友好，值得后续优化。

### 🟡 值得关注

- **File 工具假成功（#5209）**：错误参数名不报错反而返回 "Replaced"，Agent 需反复重试。工具错误处理语义需要更严格。
- **输出区不填充宽屏终端（#5322）**：v0.8 → v0.9 的布局回归，影响宽屏用户日常使用。
- **"Constitution" 中文翻译（#4949）**：中文原生用户的本地化分歧仍悬而未决，预计后续中文文案会有多轮迭代。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*