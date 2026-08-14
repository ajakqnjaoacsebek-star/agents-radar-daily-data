# AI CLI 工具社区动态日报 2026-08-14

> 生成时间: 2026-08-14 02:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-14）

## 1. 生态全景

AI CLI 工具正从单会话 AI 助手快速演变为多 Agent 协作平台，跨会话通信、子代理编排、MCP 生态集成成为各厂商共同争夺的能力制高点。但本日动态呈现鲜明的“功能提速、稳定性回退”特征：Claude Code 跨会话消息通道系统性回归、Codex IDE 上下文反复损坏、Gemini 子代理假成功、Copilot 远程 MCP OAuth 集中故障，均说明功能扩展速度已超出工程可控范围。与此同时，工具间的能力趋同加速——多 Agent 编排、上下文生命周期管理、Windows 桌面端支持、多种云 provider 接入成为每家都要面对的“必修课”，行业正从“单线程对话式开发”向“Agent 集群协作平台”范式迁移。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 活跃度 | 今日 PR 活跃度 | 版本发布 | 活跃度特征 |
|---|---|---|---|---|
| Claude Code | 50 条更新（含 10+ 跨会话消息 Bug） | 2 个（均为非功能性） | v2.1.232 / v2.1.231 | 发版密集，但 PR 沉寂、社区集中于回归验证 |
| OpenAI Codex | 50 条更新（IDE/MCP 占比高） | 50 条更新（10 个精选，含 Bedrock provider） | 4 个 `0.148.0-alpha` | 迭代最激进，PR/Issue 双高，Rust 重写后快速扩生态 |
| Gemini CLI | 50 个活跃 Issue（P1 子代理问题集中） | 25 个更新（10 个精选，含 CVE 修复） | v0.56.0-nightly | 活跃度高，供应链安全修复是主线之一 |
| GitHub Copilot CLI | 15+ 条新增 triage | 仅 1 个（文档类，已关闭） | v1.0.80-0 / v1.0.80-1 | 版本节奏稳健，社区反馈集中但 PR 侧平静 |
| Kimi Code CLI | 3 个精选热点 | 无 | 无 | 低活跃，Memory System 功能呼声最高 |
| OpenCode | 10 个精选热点（性能/安全三足鼎立） | 10 个（延迟加载重构密集） | 无 | 社区讨论热度高，V2 性能优化为 PR 主线 |
| Pi | 10 个精选热点（终端体验为主） | 12 个（终端卫生修复为主） | 无 | 中高活跃，细节打磨密集 |
| Qwen Code | 10 个精选热点 | 10 个 | v0.21.11 正式版 + preview | 高活跃，多 Agent 功能落地与 Windows Bug 并存 |
| DeepSeek TUI / CodeWhale | 10 个精选热点 | 10 个 | v0.9.7（品牌重塑） | 品牌转型期，schema 简化与 Windows 问题突出 |
| Grok Build | 无 | 无 | 无 | 完全静默 |

## 3. 共同关注的功能方向

### 3.1 多 Agent 协作与跨会话通信（最热）
- **Claude Code**：`send_message` 在 Windows/macOS 出现大面积假成功、丢消息、挂起；v2.1.232 默认开启 Subagent forking
- **OpenAI Codex**：Multi-Agent V2 与外部 provider 不兼容、子代理完成不释放线程额度
- **Gemini CLI**：子代理超 MAX_TURNS 被误报 GOAL 成功（#22323）、通用代理一调就挂死（#21409）
- **Qwen Code**：`/coordinate` 命令落地，后台 Agent 恢复与 activeWork 追踪持续推进
- **GitHub Copilot CLI**：内置子代理（code-review、explore）模型覆盖被静默忽略

**核心信号**：所有主流工具均在突破会话隔离，但消息可靠性、终止原因传递、路由可见性仍远未成熟。

### 3.2 上下文生命周期与 Token 计量透明度
- **Claude Code**：`advisor()` usage 双倍计算触发过早压缩（#53065），preTokens 超模型窗口
- **OpenAI Codex**：压缩后丢弃 client developer 消息，PR #38445 才修复保留机制
- **Gemini CLI**：Auto Memory 对低信号会话无限重试，耗尽资源
- **Pi**：auto-compaction 在上文超限后仍不触发（#6879），社区最热
- **OpenCode**：Compact 静默丢弃指令/约束（#42437）

**核心信号**：上下文压缩策略普遍不可预测，且 token 计量不透明直接削弱用户信任度。

### 3.3 MCP 生态与远程认证
- **Claude Code**：修复 MCP OAuth redirect URI 不匹配（v2.1.231）
- **Copilot CLI**：Atlassian issuer 不兼容、Entra 静默刷新失败、并发刷新竞态，三大 OAuth 问题同日发酵
- **OpenAI Codex**：支持 per-server MCP OAuth 回调端口；stdio 服务器 fds 泄漏致 EMFILE
- **CodeWhale**：`nextCursor: null` 违反 MCP 规范导致严格客户端报错
- **Gemini CLI**：Idea-companion stop() 在活跃 MCP 流式会话下无限挂起

**核心信号**：MCP 已成事实标准，但 OAuth 刷新、连接生命周期、协议合规仍是高频事故区。

### 3.4 Windows 桌面端稳定性
- **Claude Code**：2.1.222→2.1.227 更新后 send_message 静默失败、暂停会话唤醒后产生幻影回合
- **Codex**：扩展资源加载失败、断电后本地状态损坏、WSL2 兼容性
- **Qwen Code**：Ctrl+V 粘贴回归、安装器 Get-FileHash 失败
- **CodeWhale**：Windows/Cygwin 配置路径分裂、SSH 出站阻断
- **Pi**：settings.json 路径转义解析静默失败

**核心信号**：Windows 是被一致忽视的短板，跨平台一致性问题在本次日报中密集爆发。

### 3.5 供应链安全
- **Gemini CLI**：CVE-2026-28292（CRITICAL）修复 simple-git
- **OpenCode**：`curl|bash` 无完整性校验（#42434）、webfetch SSRF（#42435）
- **Claude Code**：CI workflow SHA 固定收尾
- **Qwen Code**：npm 审计 2 个 high severity 漏洞

**核心信号**：社区对 AI CLI 供应链信任的要求显著提升。

### 3.6 多云/本地模型 provider 接入
- **Codex**：新增 Amazon Bedrock Runtime provider（PR #38470）
- **Pi**：Amazon Bedrock Mantle provider（PR #6216）、Gemini schema 回退
- **Qwen Code**：Vertex AI keyless 认证推断失败
- **CodeWhale**：本地 DS4（DwarfStar）成为一等路由

**核心信号**：用户拒绝被单一模型/云绑定，provider 扩展速度成为选型因素。

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 | 关键差异点 |
|---|---|---|---|---|
| **Claude Code** | 企业级多 Agent 协作平台 | 深度 Agent forking、跨会话提及、Teammate 后台运行 | 企业中大型团队，重度多会话并行用户 | 多 Agent 深度最强，但跨会话通道稳定性当前最脆弱 |
| **OpenAI Codex** | 体系化、工程化 Agent 框架 | Rust 重写、Multi-Agent 分代演进、Guardian V2 安全层 | 对扩展性和架构整洁性要求高的工程团队 | 迭代速度最快（4 alpha/天），provider 扩展能力强 |
| **Gemini CLI** | 评测驱动、安全敏感的 Agent 工具 | 行为评估基础设施（76 个测试）、AST 感知代码库理解 | Google 生态开发者、重视可观测性的团队 | Eval 体系最完善，工具使用自主调度待改进 |
| **GitHub Copilot CLI** | GitHub 生态内的 Copilot 延伸 | 与 VSCode 深度耦合、Copilot 模型路由体系 | GitHub 企业客户、VSCode 用户 | 生态锁定明显，模型路由逻辑受社区诟病 |
| **Kimi Code CLI** | 轻量、中文友好的 Code CLI | ACP 协议、Moonshot 模型 | 中文开发者、Moonshot 生态用户 | 社区规模小，Memory System 为最迫切需求 |
| **OpenCode** | 性能敏感型开源 CLI | V2 全重写、延迟加载瘦身、多 provider | 开源社区、自托管用户 | 启动速度优化最积极，但 V1/V2 过渡带来功能阵痛 |
| **Pi** | 终端体验极致打磨的多模型网关 | 跨模型后端代理（Codex/Gemini/Grok 等）、TUI 细节迭代 | 终端重度用户、多模型对比用户 | 终端卫生（SIGINT 恢复、剪贴板、CJK 宽度）细节最细 |
| **Qwen Code** | 多 Agent Fleet + Web Shell + Omni 多模态 | `/coordinate` 原生协作、Web Shell 会话治理、OpenTUI 渲染器 | 阿里云/千问生态开发者、多模态需求用户 | 多 Agent 落地最快（正式版已发布），但 SWE-bench 验证处于 QUARANTINED |
| **CodeWhale** | 本地模型优先的个人效率工具 | 品牌重塑（DeepSeek-TUI→CodeWhale）、DS4 本地路由 | 个人开发者、DeepSeek 生态用户 | Agent 工具 schema 简化是关键技术债，品牌转型期 |

## 5. 社区热度与成熟度

### 梯队划分

- **第一梯队——最活跃（50+ Issue 更新 + 密集发版）**：**Claude Code、OpenAI Codex、Gemini CLI**。三者均具备大规模用户基础、高频版本节奏和复杂的功能矩阵。Claude Code 社区反馈最尖锐（合规拦截、跨会话回归），Codex 工程迭代最强，Gemini 安全与评测投入最扎实。
- **第二梯队——稳定活跃（10+ PR/Issue）**：**Copilot CLI、Qwen Code、Pi、OpenCode**。Qwen 和 OpenCode 处于版本迭代关键期（V2 / 多 Agent），Pi 属于“慢工出细活”型，Copilot 受限于 GitHub 生态节奏。 
- **第三梯队——早期/小众**：**CodeWhale、Kimi Code CLI**。社区讨论有明确焦点但规模有限，处于差异化卡位期。
- **完全静默**：**Grok Build**（24h 无任何活动，需关注是否项目停滞或蓄力期）。

### 成熟度判断

- **功能广度成熟度排序**：Claude Code ≈ OpenAI Codex > Gemini CLI > Copilot CLI > Qwen Code > Pi > OpenCode > CodeWhale ≈ Kimi
- **稳定性口碑**：本日数据显示所有工具都出现回归问题，但 Claude Code 的跨会话消息回归影响面最广（10+ Issue、跨平台复现），Codex 的 IDE 上下文时间跨度最长（多版本反复损坏）。
- **工程体系完备度**：Gemini CLI 的 eval 体系（76 个行为测试）和 Codex 的 Guardian V2 安全层代表两种不同的成熟度路径——前者重验证，后者重新架构。

## 6. 值得关注的趋势信号

**信号一：跨会话通信从“加分项”变成“默认能力”，但可靠性远未达标。**
Claude Code 将 `send_message` 列为默认能力，Qwen 直接把 `/coordinate` 写进正式版，Codex/Gemini/Copilot 均在子代理编排上加码。给开发者的启示：多 Agent 工作流是明确方向，但在消息投递、状态同步、失败恢复的可靠性显著提升前，对关键生产任务应保留“单 Agent 兜底”路径，避免被虚假成功状态误导。

**信号二：Token 计费不透明已成为信任危机。**
Claude Code advisor() 的 usage 合并、Pi 的 auto-compact 不触发、OpenCode 的上下文静默丢失——三个不同工具暴露同类问题：用户无法准确知道自己为什么被收费、为什么被压缩。对开发者的启示：在成本敏感型场景下，优先选择提供上下文水位可观测性、压缩行为可配置的工具，并关注各工具的审计日志完善速度。

**信号三：Windows 平台是当前最大一致性裂缝。**
本次日报中 7 个工具有 Windows 专项问题：粘贴失效、安装校验失败、消息丢失、配置路径分裂、安全沙箱出站阻断。对开发者的启示：Windows 团队用户应保持“滞后一个版本”策略，等待社区确认新版本 Windows 回归后再升级；工具厂商则应把 Windows 列入每个版本的必要验收环境。

**信号四：MCP 生态仍在“基础建设期”，认证是最大瓶颈。**
OAuth 回调端口、issuer 校验、刷新竞态、遥测鉴权头缺失——这些基本问题在同一天内出现在四个主流工具中。对开发者的启示：当前阶段引入远程 MCP 服务器前，应仔细评估其认证实现与 CLI 版本的兼容性；企业场景建议优先使用本地 stdio MCP 或已被验证的 OAuth 实现。

**信号五：供应链安全从“最佳实践”升级为“选型否决项”。**
CVE-2026-28292 的 CRITICAL 评级、curl|bash 无校验安装、npm 漏洞连续报出——社区已明确将供应链安全纳入质量评判。对开发者的启示：评估 AI CLI 时至少检查三点——安装脚本是否校验完整性、依赖链是否有已知 CVE、CI 是否做了 SHA 固定；优先选择有主动安全加固节奏的工具（如 Gemini CLI 的 security 专项 PR）。

**信号六：模型路由逻辑的“黑箱”正引发强烈反弹。**
Copilot CLI 子代理模型覆盖被忽略、Codex Multi-Agent 向外部 provider 发送 OpenAI 专用消息、Gemini 不主动使用 skill——用户对“配置了但被静默覆盖”的容忍度接近零。对开发者的启示：若工作流强依赖特定模型（如成本控制或质量要求），应验证工具是否提供：模型路由日志、覆盖优先级说明、以及“禁止子代理换模型”的硬性配置项。这将是下一轮工具差异化的关键战场。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-08-14 | 来源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行

**① fix(skill-creator): run_eval.py 恒报 0% recall（#1298）** 🔥 热度第一
- **功能**：修复评估脚本 `run_eval.py` 对所有描述恒报 `recall=0%` 的致命 bug，同步修复 Windows 流读取、触发检测、并行 worker 问题，使 `run_loop.py` / `improve_description.py` 的优化循环真正生效
- **讨论焦点**：10+ 独立复现，描述优化循环"在噪声上优化"；对应 Issue #556、#1169，是当前 skill-creator 工具链最大的痛点
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/1298)）

**② document-typography 排版质量控制（#514）**
- **功能**：AI 生成文档的排版质量兜底——修复孤词换行（1-6 词溢出到下一行）、孤行标题（section header 滞留页底）、编号错位三类高频问题
- **讨论焦点**：用户从不主动要求排版质量，但每份生成文档都受影响，需技能自动纠错
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/514)）

**③ pdf 技能大小写引用修复（#538）**
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md → reference.md`、`FORMS.md → forms.md`），解决大小写敏感系统上的文件引用断裂
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/538)）

**④ ODT 技能：OpenDocument 全流程（#486）**
- **功能**：.odt/.ods 文件创建、模板填充、ODT→HTML 解析，覆盖 LibreOffice/ISO 开放文档格式
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/486)）

**⑤ frontend-design 技能可操作性重构（#210）**
- **功能**：重写前端设计技能，确保每条指令能在单次会话内被 Claude 实际执行，提升内部一致性和行为引导精度
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/210)）

**⑥ skill-quality/security-analyzer 元技能（#83）**
- **功能**：新增两个元技能——5 维技能质量分析（结构/文档/样例等）与技能安全分析，属社区早期（2025-11）高讨论度 PR
- **关联**：直接呼应 Issue #492 的安全信任边界问题
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/83)）

**⑦ testing-patterns 测试全栈技能（#723）**
- **功能**：Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、测试命名与边界用例，覆盖完整测试栈
- **状态**：OPEN（[链接](https://github.com/anthropics/skills/pull/723)）

**⑧ ServiceNow 企业平台技能（#568）**
- **功能**：ServiceNow 全平台助手——ITSM/ITOM/ITAM/SecOps/HRSD/FSM/SPM/CSDM/IntegrationHub
- **状态**：OPEN，2026-08-12 仍在活跃更新（[链接](https://github.com/anthropics/skills/pull/568)）

---

## 2. 社区需求趋势（来自 Issues）

| 需求方向 | 代表 Issue | 热度 | 说明 |
|---|---|---|---|
| **安全 / 信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 评论 👑 最高 | 社区技能挂在 `anthropic/` 命名空间下，冒充官方技能，形成信任边界漏洞——用户可能向非官方技能授予高权限 |
| **组织级技能共享** | [#228](https://github.com/anthropics/skills/issues/228) | 16 评论 | 要求 Claude.ai 支持 org 内技能库/共享链接，替代手动下载 + Slack 传输 + 手动上传的原始流程 |
| **skill-creator 工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169) | 12+3 评论 | `claude -p` 无法触发技能，评估循环恒报 0% recall，技能描述优化完全失效 |
| **技能丢失 / 插件重复** | [#62](https://github.com/anthropics/skills/issues/62)、[#189](https://github.com/anthropics/skills/issues/189) | 10+6 评论 | 技能文件消失、document-skills 与 example-skills 插件安装重复技能，白白占用上下文窗口 |
| **上下文窗口膨胀** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 评论 | `claude-api` 技能单次调用注入 ~156k tokens，直接撑爆上下文窗口 |
| **新技能提案** | [#1329](https://github.com/anthropics/skills/issues/1329) compact-memory、[#412](https://github.com/anthropics/skills/issues/412) agent-governance、[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门控 | 9/6/4 评论 | 符号化压缩代理记忆、Agent 安全治理模式、三阶段推理质量流水线 |

---

## 3. 高潜力待合并 Skills（评论活跃但尚未合并）

| Skill | PR | 亮点 | 落地概率 |
|---|---|---|---|
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | 排版自动纠错，覆盖面广（每份文档都受益） | ⭐⭐⭐⭐⭐ |
| **ODT 技能** | [#486](https://github.com/anthropics/skills/pull/486) | 补齐 OpenDocument 格式空白，与 docx/pdf 形成文档矩阵 | ⭐⭐⭐⭐ |
| **testing-patterns** | [#723](https://github.com/anthropics/skills/pull/723) | 测试生成/规范强需求，内容完整 | ⭐⭐⭐⭐ |
| **ServiceNow** | [#568](https://github.com/anthropics/skills/pull/568) | 企业级大而全，仍在持续更新（8 月仍有活动） | ⭐⭐⭐⭐ |
| **skill-quality/security-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | 元技能，呼应 #492 安全议题 | ⭐⭐⭐ |
| **self-audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | 交付前机械校验 + 四维推理审计，v1.3.0 迭代中 | ⭐⭐⭐ |
| **pyxel 复古游戏开发** | [#525](https://github.com/anthropics/skills/pull/525) | 绑定 pyxel-mcp，垂直场景明确 | ⭐⭐⭐ |

---

## 4. Skills 生态洞察

> **一句话总结**：当前社区最集中的诉求是——**修复 skill-creator 评估链路的 0% recall 致命 bug（让技能描述优化回归可用）**，同时解决 **anthropic 命名空间信任滥用**与**超长技能上下文膨胀**两大安全隐患，并持续向文档格式（ODT/typography）、测试生成、企业平台（ServiceNow）等垂直场景补充实用技能。

---

# Claude Code 社区动态日报 — 2026-08-14

## 1. 今日速览

- **v2.1.232 发布**：Subagent forking 默认开启，支持在提示符中输入 `@` 直接提及另一 Claude 会话，并默认在后台运行非 teammate Agent。
- **跨会话消息传递成焦点**：过去 24 小时更新了 10+ 条与 `send_message` 相关的 Bug，集中在 Windows 桌面端自动更新（2.1.222→2.1.227）后出现消息假成功、丢失或悬挂。
- **v2.1.231 修复 MCP OAuth**：解决了 Slack 等使用预注册 OAuth 客户端的服务器登录时 redirect URI 不匹配的问题。

## 2. 版本发布

### v2.1.232
- **Subagent forking 默认开启**：`subagent_type: "fork"` 的 subagent 继承完整对话与提示缓存；交互式会话中非 teammate agent 默认在后台运行。
- **跨会话提及**：在提示符中输入 `@` 可按名称提及另一 Claude 会话，增强多会话协作体验。

### v2.1.231
- **修复 MCP OAuth 登录失败**：解决使用预注册 OAuth 客户端（如 Slack）的服务器出现 redirect URI 不匹配导致的无法登录问题。

## 3. 社区热点 Issues

以下精选 10 条，按讨论热度与影响面排序：

### 1. CVP 批准组织仍遭 Cyber Safeguard 拦截
**#84352** · 评论 94 · 👍 14 · 更新 08-14  
已通过 Cyber Verification Program 批准的 Claude.ai 组织在 Claude Code 中仍持续收到网络防护拦截，且核查门户显示应用为 "Under review"，与已发出的批准邮件矛盾。合规误报直接影响生产可用性，社区讨论量今日最高。  
🔗 https://github.com/anthropics/claude-code/issues/84352

### 2. 多 Claude 会话间直接通信（功能需求）
**#24798** · 评论 66 · 👍 21 · 更新 08-14  
用户请求在多个并行 Claude Code 会话间建立直接工作流编排能力，支持依赖关系的有序执行。当前会话互相隔离，复杂项目需人工搬运上下文。该 Issue 长期高赞，是社区对多 Agent 协作基础设施的核心诉求。  
🔗 https://github.com/anthropics/claude-code/issues/24798

### 3. TUI 中输入被静默丢弃
**#85603** · 评论 22 · 👍 1 · 更新 08-14  
在长时运行 Agent 会话中，回合进行期间键入的文本在回合结束时被丢弃（无 Escape 操作），且 idle 面板不再启动新回合。交互层输入可靠性问题，影响日常使用。  
🔗 https://github.com/anthropics/claude-code/issues/85603

### 4. 跨会话消息致接收方完全无响应
**#86012** · 评论 15 · 👍 3 · 更新 08-14  
Desktop 1.28929.0 中 `send_message` 发送后接收方 `hadFirstResponse=false`，直到 Desktop 自带的 idle-timeout 15-20 分钟后强制终止。Windows/macOS 均有复现，被标记为 regression。  
🔗 https://github.com/anthropics/claude-code/issues/86012

### 5. advisor() 将完整对话转发导致 token 虚高
**#53065** · 评论 14 · 👍 6 · 更新 08-14  
调用 `advisor()` 时完整转录被转发至第二模型（如 claude-opus-4-7），主执行器与 advisor 的 usage 被加总进同一字段，触发过早自动压缩。此问题与 #81620、#82863 同源，均指向上下文计量不透明。  
🔗 https://github.com/anthropics/claude-code/issues/53065

### 6. Desktop 遥测 OTLP 缺少鉴权头
**#82092** · 评论 10 · 👍 5 · 更新 08-14  
Apps gateway 向 Claude Desktop 下发指向自身 bearer 鉴权 OTLP 端点的地址，但未同时下发 `otlpHeaders`，导致每次桌面端遥测 flush 均被 `missing_token` 拒绝。可观测性数据因此全部丢失，影响官方遥测可靠性。  
🔗 https://github.com/anthropics/claude-code/issues/82092

### 7. Windows 自动更新后 send_message 静默失败
**#86275** · 评论 8 · 👍 4 · 更新 08-13  
原生 Windows 桌面端在 runtime 2.1.222→2.1.227 自动更新后，跨会话 `send_message` 报告成功但消息从未送达。用户工作流被静默破坏，属高影响回归。  
🔗 https://github.com/anthropics/claude-code/issues/86275

### 8. 暂停会话收不到跨会话消息
**#86138** · 评论 7 · 👍 1 · 更新 08-12  
Windows Desktop 2.1.227 中对已暂停（idle-timeout）会话 `send_message` 返回成功并唤醒会话，但消息未真正进入模型，产生永久幻影回合。状态管理与消息入队存在缺陷。  
🔗 https://github.com/anthropics/claude-code/issues/86138

### 9. send_message 假成功且投递数为 0/4
**#86014** · 评论 7 · 👍 2 · 更新 08-12  
Windows 11 桌面端 `send_message` 返回 `Message sent to session...`，但目标会话卡在加载中，投递状态 0/4。消息可靠交付在 Windows 平台明显受损。  
🔗 https://github.com/anthropics/claude-code/issues/86014

### 10. 跨会话触发回合 0 token 挂起
**#86386** · 评论 4 · 👍 1 · 更新 08-13  
Desktop 中由跨会话消息触发的回合在 0 token 处悬挂，而手动提示可正常工作。进一步确认触发路径存在回归，且此问题在 2.1.231 中仍未被修复。  
🔗 https://github.com/anthropics/claude-code/issues/86386

> 同期还有 #86069（消息进入 composer 但不提交）、#86059（接收方被中断但无感知）、#86237（UI 渲染但未入队）、#86370（macOS 消息丢弃）、#86029（idle 会话消息丢失）等多个相近 Bug，均指向 2.1.227 的跨会话消息通道存在系统性回归。

## 4. 重要 PR 进展

过去 24 小时 PR 数量较少，仅 2 个，均为非功能性变更：

### 1. 修复 CHANGELOG.md 重复单词
**#86537** · OPEN · 更新 08-13  
修正 CHANGELOG.md 中 `CLAUDE_BASH_NO_LOGIN` 条目里的重复单词 "to to"。纯文档改动，无功能影响。  
🔗 https://github.com/anthropics/claude-code/pull/86537

### 2. CI 工作流 SHA 固定（已关闭）
**#60280** · CLOSED · 更新 08-13  
将剩余 6 个 workflows 中的 `actions/checkout@v4` 与 `actions/github-script` 固定至具体 SHA（如 checkout v4.3.1），提升供应链安全，属于 #56784 的后续收尾。  
🔗 https://github.com/anthropics/claude-code/pull/60280

> 说明：过去 24 小时内无功能类 PR 合并或开启，社区主要精力集中在 Bug 上报与回归验证上。

## 5. 功能需求趋势

综合今日全部 50 条 Issues，社区关注方向如下：

### 5.1 跨会话 / 多 Agent 协作（最热）
- **功能层面**：#24798 等请求打破会话隔离，实现多 Claude 实例间串行编排与依赖感知。
- **技术层面**：大量 Bug 集中在 `ccd_session_mgmt` 的 `send_message` 工具在 Desktop 上的可靠性，说明 Anthropic 已将跨会话通信作为官方能力，但实现仍不稳定，社区在多用户协同、Agent 间委托等场景有强需求。

### 5.2 上下文与 Token 计量透明度
- `advisor()` 工具导致 usage 双倍计算（#53065、#81620），auto-compact 在 33% 实际占用时即触发（#82863），甚至 `preTokens` 超过模型窗口本身。社区要求将 advisor 等子推理的 usage 与主进程分离，并修复基于错误计数的自动压缩策略。

### 5.3 Windows 桌面端稳定性
- 超过 10 条 Issue 涉及 Windows 平台，包含 MSIX 安装包异常、自动更新后回归、AppX 容器冲突等。2.1.222→2.1.227 的更新被广泛报告为引入严重回归的版本，Windows 已成为桌面端稳定性短板。

### 5.4 合规与安全策略可配置性
- #84352、#86527 显示已获 CVP 批准的组织仍被 Claude Code 的 cyber safeguard 拦截，且错误阻止在 Claude 自身生成的上下文而非用户输入。社区需要组织级策略缓存或审批状态同步机制。

### 5.5 后台静默行为控制
- #84698 指出 Desktop 在 diff/commit 刷新时自动执行后台 `git fetch origin`，且无配置项可禁用；结合 #82092 无鉴权 OTLP，开发者对客户端"未预期的自主行为"较为敏感。

## 6. 开发者关注点

### 6.1 跨会话消息不可靠
最高频痛点。多个 Issue 复现同一模式：**发送方收到成功确认，但接收方从未实际处理消息**。涉及 Windows 与 macOS、CLI 与 Desktop，且 2.1.231 仍未完全修复。受影响的用户多为 15-25 个并行会话协调的重度工作流使用者，此问题直接阻断其核心工作方式。

### 6.2 自动更新引入回归
Windows 桌面端自动更新至 2.1.227 后，跨会话消息功能整体劣化，且 MSIX 安装包本身还伴随无法启动、文件占用等问题（#73107、#77421、#85887）。开发者普遍希望：提供更新回滚渠道、更新前自动验证关键路径、或至少在更新后给出已知回归提示。

### 6.3 Token 计费与压缩策略不透明
`advisor()` 的 usage 合并导致用户被收取虚高 token 费用，并触发非预期的自动压缩，破坏长会话连续性。部分用户明确表示这是当前最影响信任度的问题之一。

### 6.4 钩子与安全策略可追溯性
PreToolUse hook 拒绝时 `decisionReason` 未被持久化（#82642），导致事后无法审计是哪个 hook 拒绝了工具调用。对于有严格合规要求的企业团队，可追溯性是刚需。

### 6.5 桌面端功能与 CLI 功能一致性
多个 Bug 显示 Desktop 内置的 CLI runtime 落后于最新版本（如 2.1.227 vs 2.1.231），且 Desktop 的更新机制导致部分 CLI 修复无法及时触达桌面用户。社区倾向于希望 Desktop 与 CLI 保持同步发布节奏。

---

**总结**：今日动态呈现"功能前进、稳定性回退"的典型状态——v2.1.232 在多 Agent 协作能力上做出积极推进，但 2.1.227 引入的跨会话消息回归仍未平息，Windows 平台稳定性与 token 计量透明度是当前社区最强烈的诉求。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-14

## 今日速览

Codex CLI 进入密集迭代期，24 小时内连续发布 4 个 `0.148.0-alpha` 版本（alpha.11 → alpha.14）。社区侧，Windows 与 VS Code 扩展的资源加载、IDE 上下文异常问题成为绝对焦点，多起高讨论量 Issue 于今日关闭或获得官方修复；PR 侧则迎来 Amazon Bedrock Runtime 新 provider、MCP OAuth 回调端口等重量级更新，多智能体与技能系统也在快速演进。


## 版本发布

过去 24 小时发布了 4 个 Rust 版本，均为 `0.148.0-alpha` 系列迭代：

- [`rust-v0.148.0-alpha.14`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14)
- [`rust-v0.148.0-alpha.13`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.13)
- [`rust-v0.148.0-alpha.12`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.12)
- [`rust-v0.148.0-alpha.11`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.11)

Release note 暂无详细内容，但短时间连续发版通常意味着针对社区反馈的快速修复或实验性功能验证。


## 社区热点 Issues

过去 24 小时更新了 50 条 Issue，以下 10 条最值得关注：

1. **[#37458] Codex 扩展无法加载资源（Windows/VS Code）** — 🏷️ CLOSED | 💬 53 | 👍 11  
   VSCode 启动后 Codex 面板报 “The extension couldn't load its resources”，是近期社区反馈最集中的问题，今日已关闭，推测官方已定位根因。  
   https://github.com/openai/codex/issues/37458

2. **[#26984] MCP stdio 服务器泄漏管道 fd 与孤儿进程 → 累积 EMFILE** — 🏷️ OPEN | 💬 21 | 👍 4  
   长会话中 MCP stdio 连接持续泄漏文件描述符并产生孤儿子进程，最终触发 “Too many open files”（os error 24）。该问题已持续两个月，影响长期运行的重度用户。  
   https://github.com/openai/codex/issues/26984

3. **[#37403] [macOS] 桌面端无法恢复 Remote Control / CLI 线程** — 🏷️ OPEN | 💬 18 | 👍 11  
   8 月 7 日更新后，桌面端恢复远程控制 Codex CLI 线程时报 `already has an active writer`，属于明显的回归，移动端远程控制工作流受阻。  
   https://github.com/openai/codex/issues/37403

4. **[#31553] VS Code 扩展停止自动附带 IDE 上下文** — 🏷️ CLOSED | 💬 17 | 👍 12  
   远程/容器环境下，扩展更新后不再自动包含当前文件与选中内容。社区呼声高，今日已关闭。  
   https://github.com/openai/codex/issues/31553

5. **[#26990] Windows 桌面端断电后本地状态损坏** — 🏷️ OPEN | 💬 16 | 👍 0  
   电源中断后 pins/projects 重置、配置回退、时间戳异常（未来时间戳）。桌面端状态持久化缺乏崩溃安全保证。  
   https://github.com/openai/codex/issues/26990

6. **[#34920] IDE Context 在 26.715.x 扩展中报 RPC 序列化错误** — 🏷️ CLOSED | 💬 10 | 👍 5  
   近期多个扩展版本中 IDE 上下文功能整体损坏，已确认影响 VS Code 与 Devin，今日关闭。  
   https://github.com/openai/codex/issues/34920

7. **[#2062] 功能请求：监视后台服务** — 🏷️ OPEN | 💬 9 | 👍 10  
   呼声极高的增强：允许长构建/服务器运行不阻塞 Agent，并可随时检查日志或等待完成。已开放一年仍受关注。  
   https://github.com/openai/codex/issues/2062

8. **[#23454] `$skill` 显式调用忽略本地 explicit-only 技能** — 🏷️ OPEN | 💬 8 | 👍 7  
   当技能不在隐式技能列表中时，显式调用会失败。影响自定义本地技能工作流。  
   https://github.com/openai/codex/issues/23454

9. **[#33551] Multi-Agent V2 向外部 provider 发送 OpenAI 专用消息** — 🏷️ OPEN | 💬 8 | 👍 6  
   子代理指令使用 `agent_message` 类型，Ollama 等外部 Responses 兼容 provider 无法识别，多智能体模式与自定义模型结合时不可用。  
   https://github.com/openai/codex/issues/33551

10. **[#22779] 已完成的子代理仍占用线程额度** — 🏷️ OPEN | 💬 7 | 👍 0  
   子代理执行完毕但未从线程计数中释放，长任务场景中会提前触达线程上限。  
    https://github.com/openai/codex/issues/22779


## 重要 PR 进展

过去 24 小时更新了 50 条 PR，以下 10 个最值得关注：

1. **[#38470] 新增 Amazon Bedrock Runtime provider** — CLOSED  
   内置 `amazon-bedrock-runtime` provider，支持 regional OpenAI 兼容端点、SigV4 签名、AWS profile/region 配置。企业用户接入 AWS 生态的重要一步。  
   https://github.com/openai/codex/pull/38470

2. **[#38448] 支持 per-server MCP OAuth 回调端口** — CLOSED  
   为 MCP server 配置增加 `oauth.callback_port`，支持插件声明与技能依赖元数据传递。多 MCP server 场景下的 OAuth 冲突将得到解决。  
   https://github.com/openai/codex/pull/38448

3. **[#38461] 集中化 turn 环境选择状态** — CLOSED  
   将环境 ID、工作目录、workspace roots 聚合到 `TurnEnvironment` 上，统一环境解析、工具执行与审批逻辑。架构整洁性改进。  
   https://github.com/openai/codex/pull/38461

4. **[#38467] 解析技能 frontmatter 中的模型注解** — CLOSED  
   为技能元数据增加可选 `model` 字段（如 `model: luna`），不支持的模型值将被忽略但不阻塞加载。技能可指定运行模型。  
   https://github.com/openai/codex/pull/38467

5. **[#38475] 增加有界技能模型委派指令** — CLOSED  
   当 Sol/Terra 上运行的技能请求 Luna 时，新增 `SkillModelDelegationInstruction`，仅当 Luna 可用时解析，并对模型标识符、技能名做边界校验。  
   https://github.com/openai/codex/pull/38475

6. **[#38441] Guardian V2 获取完整工具操作上下文** — CLOSED  
   Guardian V2 不再只看到工具名和调用 ID，而是暴露 pre-hook 的完整 `ToolPayload`，使安全审查能基于实际行为判断风险。  
   https://github.com/openai/codex/pull/38441

7. **[#38445] 上下文压缩后保留客户端开发者消息** — CLOSED  
   `retain_client_developer_messages` 开启时，压缩后 client 编写的 developer 指令将保留，避免关键约束在长会话中丢失。  
   https://github.com/openai/codex/pull/38445

8. **[#38440] App server 支持分页线程回滚** — CLOSED  
   新增实验性 `thread/revert` 请求，可将分页线程回滚到 `beforeTurnId` 前缀，同时保留线程 ID 并中断激活中的 turn。  
   https://github.com/openai/codex/pull/38440

9. **[#38463] 跨 revert 重载保留线程订阅** — CLOSED  
   修复 `thread/revert` 过程中连接关闭导致订阅丢失的问题，重启监听任务时从保留状态恢复订阅。  
   https://github.com/openai/codex/pull/38463

10. **[#38473] 停止生成 accepted-line 指纹** — CLOSED  
    将 accepted-line 指纹替换为基于 diff 的新增/删除行数统计，`line_fingerprints` 保留为空字段以兼容 schema。简化遥测逻辑。  
    https://github.com/openai/codex/pull/38473


## 功能需求趋势

从今日更新的 Issues 和 PRs 中，社区最关注的功能方向集中在以下几个方面：

- **IDE 集成稳定性（最高优先级）**：涉及扩展资源加载失败、IDE 上下文自动丢失/禁用、远程与 WSL2 环境兼容性。近期多条高评论 Issue 都围绕 VS Code 扩展展开，说明 IDE 体验已成为 Codex 日常使用的命脉。
- **云端 provider 扩展**：新增 Amazon Bedrock Runtime（#38470）标志 Codex 正在加速适配企业级云平台；同时社区持续反馈外部 Responses 兼容 provider（如 Ollama）的支持缺口（#33551）。
- **多智能体与子代理生命周期管理**：子代理线程额度不释放（#22779）、Windows 上子代理重启后卡死（#38408）、子代理模型选择限制（#38107）等问题集中出现。
- **MCP 生态成熟化**：stdio 连接泄漏（#26984）、OAuth 回调端口配置（#38448）等基础设施问题正在补齐。
- **长会话与上下文管理**：上下文压缩后的信息保留（#38445）、分页线程回滚（#38440）、长时间运行会话的性能衰减与截断（#38466）成为高频痛点。
- **技能系统增强**：技能指定模型（#38467）、显式调用本地技能（#23454）、有界委派指令（#38475），技能正从简单 prompt 向可配置模块演进。


## 开发者关注点

汇总今日 Issue 中的开发者反馈，核心痛点集中在：

- **扩展资源加载失败反复出现**：#37458、#37517、#37508 等多起 Issue 指向同一类 “couldn't load its resources” 问题，涉及 Windows、macOS、Remote-SSH 等不同环境，开发者对扩展质量信心受到影响。
- **IDE 上下文功能不可靠**：自动禁用、不发送选中文本、RPC 序列化错误、workspaceRoot 缺失……IDE 上下文在多个版本中反复出问题，社区已出现建议回滚旧版本的声音。
- **Windows 平台体验落后**：WSL2 兼容性、沙箱权限升级不生效、断电状态损坏、本地上下文崩溃安全等问题集中堆积在 windows-os 标签下。
- **子代理状态不透明**：子代理“看起来还在跑/占用额度/无法清理”是多个 Issue 的共有模式，用户需要更清晰的子代理生命周期展示。
- **性能与资源占用**：macOS 桌面端出现 100%+ CPU、10+ GB RAM、V8 OOM 崩溃（#38455、#38468），长会话压缩后线程过大导致读取截断（#38466），重度用户的体验明显下滑。
- **外部 provider 兼容性**：Multi-Agent V2 的 `agent_message`、子代理模型识别等问题，正在阻碍把 Codex 作为通用 agent 框架对接自有模型/服务的用户。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-14）

## 今日速览

今日发布 v0.56.0-nightly.20260814 夜间版，核心修复了容量耗尽错误的上下文感知静默重试机制，并对慢速 CI 环境下的 e2e 测试做了稳定性加固。社区方面，子代理（Subagent）在达到 MAX_TURNS 后被误报为 GOAL 成功、通用代理挂起、以及供应链安全（CVE-2026-28292）成为开发者最关注的三大热点。

---

## 版本发布

### v0.56.0-nightly.20260814.gc0d192452

**更新内容：**
- **fix(core)**：为容量错误（capacity errors）实现上下文感知的静默重试与可用性 TTL（#28761），改善非交互/无人值守运行时的自动退避与重试体验。
- **test(e2e)**：稳定慢速 runner 上的 `file-system-interactive` 测试，修复在虚拟化慢速环境（如 Windows E2E runners）中的偶发失败。

🔗 发布说明：https://github.com/google-gemini/gemini-cli/releases

---

## 社区热点 Issues（10 个）

### 1. #22323 子代理超过 MAX_TURNS 被误报为 GOAL 成功，掩盖中断
- **标签**：priority/p1 · kind/bug · area/agent
- **评论数**：12 | 👍 2
- **摘要**：`codebase_investigator` 子代理在达到最大轮次限制（未做任何分析）时，仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，导致上层误判任务成功。这是典型的"成功假象"问题，需在终止原因传递链中增加中断状态的显式传播。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### 2. #21409 通用代理（Generalist agent）无限挂起
- **标签**：priority/p1 · kind/bug · area/agent
- **评论数**：8 | 👍 8
- **摘要**：用户反馈，只要 CLI 将任务委托给通用代理，就会永远挂起，简单如创建文件夹的操作也要等一小时以上。用户明确指示模型不要使用子代理后问题消失。高赞反映这不是个例。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### 3. #19873 利用模型 bash 原生能力：零依赖 OS 沙箱与执行后意图路由
- **标签**：priority/p2 · kind/enhancement · effort/large
- **评论数**：8 | 👍 1
- **摘要**：Gemini 3 模型天然擅长以 POSIX 工具链（grep/sed/awk）操作文件系统。提案希望在保证安全与 UX 的前提下，释放模型的原生 bash 能力，通过零依赖沙箱隔离执行，并在执行后做意图路由（区分探索/修改/破坏性操作）。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/19873

### 4. #24353 健壮的组件级评估体系
- **标签**：priority/p1 · kind/customer-issue · area/agent
- **评论数**：7 | 👍 0
- **摘要**：EPIC 类 issue，承接 #15300 引入的行为评估（behavioral evals）体系。目前已累计 76 个测试，覆盖 6 种 Gemini 模型。目标是构建更细粒度的组件级评估，补齐单点失败检测能力。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/24353

### 5. #22745 评估 AST 感知的文件读取/搜索/代码库映射的价值
- **标签**：priority/p2 · kind/feature
- **评论数**：7 | 👍 1
- **摘要**：该 EPIC 跟踪一系列调研，验证基于抽象语法树（AST）的工具是否能以更少的 token、更高的精度完成方法边界读取、符号导航和代码库映射，以减少多轮对齐读取带来的噪声。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/22745

### 6. #21968 Gemini 不会主动使用 skills 和子代理
- **标签**：priority/p2 · kind/bug
- **评论数**：6 | 👍 0
- **摘要**：用户观察（纯轶事性质）到，即使自定义了 `gradle`、`git` 等 skills，CLI 在相关场景下几乎不会自动调用；只有在明确指令下才会使用。反映模型对工具自主调度的倾向性问题。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### 7. #26522 Auto Memory 无限重试低信号会话
- **标签**：priority/p2 · kind/bug · area/agent
- **评论数**：5 | 👍 0
- **摘要**：Auto Memory 只在提取代理成功用 `read_file` 读取会话记录后，才将该候选会话标记为已处理。若代理判定会话为低信号而跳过，则该会话永远不会被标记，导致无限重试、重复消耗资源。需要引入"已跳过"状态。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/26522

### 8. #26525 确定性脱敏与 Auto Memory 日志精简
- **标签**：priority/p2 · kind/bug · area/security
- **评论数**：4 | 👍 0
- **摘要**：Auto Memory 在将本地转录内容送入模型前，依赖 prompt 指令做机密脱敏——但这发生在内容已进入模型上下文之后。此外服务可能记录已有 skill 的元数据。建议改为确定性脱敏（读取前过滤），并减少日志暴露面。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/26525

### 9. #25166 Shell 命令执行完成后卡在 "Waiting input"
- **标签**：priority/p1 · kind/bug · area/core · effort/medium
- **评论数**：4 | 👍 3
- **摘要**：CLI 执行极简单的 shell 命令（绝无交互可能）后，仍显示命令活跃并等待输入，实际上命令早已结束。对日常批量操作影响明显，社区高赞。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/25166

### 10. #22232 增强 browser_agent 韧性：自动会话接管与锁恢复
- **标签**：priority/p3 · kind/feature · area/agent
- **评论数**：4 | 👍 0
- **摘要**：`BrowserManager.ts` 在遇到持久化会话的 profile 锁（如残留进程）时采取"快速失败"策略。提案建议引入自动接管旧会话或恢复孤儿锁的机制，避免用户手动清理。
- 🔗 https://github.com/google-gemini/gemini-cli/issues/22232

---

## 重要 PR 进展（10 个）

### 1. #28806 chore/release: 自动版本号升级至 0.56.0-nightly.20260814
- **状态**：OPEN（size/s）
- **摘要**：机器人例行版本号更新，对应今日凌晨的 nightly 发布。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28806

### 2. #28740 安全修复：阻止 eval-pr 工作流中的供应链 RCE
- **状态**：OPEN（area/security · size/l）
- **摘要**：修复 #28336 中提到的严重安全问题——不可信的 fork 代码可在高权限的 `pull_request_target` 上下文中执行。将 eval 工作流拆分为受限的 `pull_request` 构建 + 可信的 `workflow_run` 执行两步。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28740

### 3. #28778 升级 simple-git 至 3.32.3，修复 CVE-2026-28292
- **状态**：OPEN（size/s）
- **摘要**：`simple-git` 从 3.28.0 升至 3.32.3。CVE-2026-28292 被 trivy 标为 **CRITICAL**，涉及 `package-lock.json` 依赖链。属于必须尽快合入的供应链安全补丁。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28778

### 4. #28790 核心修复：容量错误上下文感知静默重试 + 可用性 TTL
- **状态**：CLOSED（priority/p1 · area/core · size/l）
- **摘要**：完全关闭 #28761 的容量耗尽重试回归。非交互/无人值守运行时自动退避重试，最多增加 2 次静默重试，同时为可用性状态增加 TTL。已随今日 nightly 版本发布。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28790

### 5. #28801 核心修复：取消或中止时回滚整个多轮请求
- **状态**：CLOSED（size/m）
- **摘要**：修复了用户中止含工具调用的多轮请求后，会话聊天历史残留"待响应工具轮次"的脏状态。现在取消时会完整回滚，避免后续无关请求（如发送 "Hello"）收到异常响应。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28801

### 6. #28803 模型支持：新增 Claude Sonnet 4.5 与 Opus 4.8 定义
- **状态**：CLOSED（size/xl）
- **摘要**：为 CLI 添加 `claude-sonnet-4-5` 与 `claude-opus-4-8` 的模型常量、别名解析与策略链回退；更新 `resolveModel` 映射及默认模型配置显示。该 PR 已关闭，但模型定义是否正式启用待后续版本确认。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28803

### 7. #28804 行为评估工具扩展：多文件读取/内部文档/MCP 资源
- **状态**：OPEN（size/l）
- **摘要**：新增对 `read_many_files`（多文件批量读取）、`get_internal_docs`（CLI 内部文档查询）、以及 MCP 资源发现与读取（`list_mcp_resources` / `read_mcp_resource`）的行为评估用例，补齐测试覆盖面。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28804

### 8. #28701 核心修复：修复 TRUST_PARENT 规则在文件夹信任解析中的优先级
- **状态**：OPEN（size/s）
- **摘要**：`LoadedTrustedFolders.isPathTrusted()` 采用"最长匹配优先"策略选择信任规则，但实现中 `TRUST_PARENT`（信任父目录）规则被错误地赋予了更高优先级，导致子目录显式配置被父目录规则覆盖。该 PR 修正规则比较逻辑。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28701

### 9. #28699 A2A 服务器安全加固：强制认证 + 阻止 checkpoint 路径穿越
- **状态**：OPEN（area/security · size/l）
- **摘要**：发现 A2A 服务器的自定义 REST 路由（`/tasks`、`/executeCommand` 等）绕过 `UserBuilder` 认证检查，允许无凭证请求。同时存在 checkpoint 路径穿越漏洞。该 PR 为所有路由统一接入认证，并对文件路径做规范化校验。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28699

### 10. #28789 修复 vscode-ide-companion 的 stop() 挂起与 keep-alive 失效阈值
- **状态**：OPEN（area/core · size/xl）
- **摘要**：解决 #28785 中的两个稳定性 bug：(1) 存在活跃流式 MCP 会话（`GET /mcp`）时 `IdeServer.stop()` 无限挂起；(2) keep-alive 心跳循环中偶发失败未导致资源回收，现修正失败阈值并释放资源。
- 🔗 https://github.com/google-gemini/gemini-cli/pull/28789

---

## 功能需求趋势

从今日 50 个活跃 Issue 和 25 个 PR 中，可提炼出以下社区最关注的功能方向：

| 方向 | 相关 Issue/PR | 热度信号 |
|---|---|---|
| **子代理（Subagent）稳定性与自主调度** | #22323、#21409、#21968、#22093、#20195 | 多个 P1 bug，高评论/高赞 |
| **供应链与认证安全** | #28740、#28778、#28699、#26525 | CVE-2026-28292 CRITICAL，主动安全加固成趋势 |
| **浏览器代理（Browser Agent）增强** | #22232、#21983、#22267 | 锁恢复、Wayland 兼容、配置覆盖 |
| **Auto Memory 可靠性** | #26522、#26523、#26516、#26525 | 5 个 memory 相关 issue 同日更新 |
| **行为评估与测试体系扩展** | #24353、#28804、#28788 | 持续向 eval 基础设施投入 |
| **AST 感知的代码库理解** | #22745、#22746 | 探索性 EPIC，方向前瞻 |
| **新模型接入** | #28803（Claude Sonnet 4.5 / Opus 4.8） | 社区对外部模型接入有持续期待 |
| **终端体验优化** | #25166、#21924、#24935 | Shell 卡死、resize 闪烁、编辑器退出后内容损坏 |

---

## 开发者关注点

1. **子代理"假成功"与无条件挂起成最高频痛点**。多个 P1 issue 表明子代理的终止原因传播链存在缺陷（#22323 误报 GOAL 成功），且通用代理一旦触发就长期无响应（#21409），严重动摇用户对自动模式的信任。

2. **权限控制回归引发警惕**。#22093 指出 v0.33.0 后子代理在显式禁用状态下仍被自动使用，与安全预期相悖；同时 #28701 和 #28699 暴露了信任规则优先级与 A2A 路由认证的实现漏洞。

3. **工具数量上限问题**。#24246 报告当工具超过 128 个（部分场景 400+）时 CLI 直接返回 400 错误，用户期待更智能的工具范围裁剪，而非硬性失败。

4. **Shell 交互卡死是日常使用的大敌**。#25166 中简单命令执行完毕却卡在 "Waiting input"，叠加 #22465（vite 创建交互卡住）、#23571（模型在随机目录创建临时脚本），说明命令生命周期管理仍需打磨。

5. **记忆系统的隐私与效率争议**。Auto Memory 相关 issue（#26522/#26525）集中反映：低信号会话无限重试消耗资源、敏感内容先入上下文再做脱敏的隐私隐患、无效补丁被静默跳过缺乏可见性——开发者对后台服务的透明度和控制力要求明确。

---

> 本日报数据来源：github.com/google-gemini/gemini-cli，统计窗口为 2026-08-13 ~ 2026-08-14。所有链接均为对应 GitHub 原始页面。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-14

## 今日速览
今日共发布 2 个版本（v1.0.80-0 / v1.0.80-1），新增了 `--enable-mcp-server` 运行时开关并修复若干问题。社区侧围绕模型路由（reasoning effort、模型覆盖失效）的讨论热度最高，同时 MCP OAuth 稳定性、会话管理与进程泄漏成为高频痛点，24 小时内新增 15+ 条 triage Issue。

## 版本发布
**v1.0.80-0 / v1.0.80-1**（过去 24 小时）
- 新增 `--enable-mcp-server` 参数：允许在本次运行中重新启用设置里被禁用的 MCP 服务器。
- 会话共享状态增强：在 `--ahp` 模式下，已加入的共享会话会在 Sessions 标签页中以 `2 clients`（或更多）标识客户端数量。
- v1.0.80-1 为常规修复版本（Fixes and changes）。

链接: [v1.0.80-0](https://github.com/github/copilot-cli/releases/tag/v1.0.80-0) | [v1.0.80-1](https://github.com/github/copilot-cli/releases/tag/v1.0.80-1)

---

## 社区热点 Issues（10 个）

### 1. 自定义 Agent YAML Frontmatter 应支持 Reasoning Effort
- **#2904** | 作者: brian-kelley-intel | 创建: 2026-04-22 | 更新: 2026-08-13 | 👍 20 | 评论 6
- 目前 `.agent.md` 可用 `model` 字段指定模型，但推理努力级别只能在全局设置。该 Issue 已持续近 4 个月，今日有 PR（#4476）专门为其提出文档方案，是社区呼声最高的未决需求之一。
- 链接: https://github.com/github/copilot-cli/issues/2904

### 2. `claude-haiku-4.5` 不支持 `medium` 推理级别（已关闭但缺陷再现）
- **#4345** | 作者: indeherb | 创建: 2026-08-03 | 更新: 2026-08-13 | 👍 4
- 该 Issue 在 8 月 13 日被关闭，但同一天新开的 **#4473** 报告了完全相同的错误（当 CLI 内部将子代理任务路由到 `claude-haiku-4.5` 时，携带 `medium` 推理级别导致执行失败）。说明修复可能不完整或在特定 feature flag 下仍然复现。
- 链接: https://github.com/github/copilot-cli/issues/4345

### 3. 显式 code-review 子代理模型覆盖被忽略
- **#4462** | 作者: mattheusbr | 创建: 2026-08-12 | 更新: 2026-08-13
- 内置 `code-review` 子代理配置为 `gpt-5.6-luna`，但 Copilot CLI 实际以 `gpt-5.6-sol` 启动，父会话的 `gpt-5.6-luna` 配置也被静默替换。模型路由逻辑的可靠性问题已多次出现，本事件属于较新的高价值反馈。
- 链接: https://github.com/github/copilot-cli/issues/4462

### 4. Atlassian MCP OAuth 在 1.0.79 回归：RFC 8414 issuer 不匹配
- **#4480** | 作者: jfrost-fabric | 创建: 2026-08-13（triage）
- 从 1.0.71 升至 1.0.79 后，连接 `https://mcp.atlassian.com/v1/mcp` 在 OAuth 发现阶段即失败，报错 `Incompatible authorization server`。远程 MCP 的 OAuth 兼容性问题似乎随版本更新而频发。
- 链接: https://github.com/github/copilot-cli/issues/4480

### 5. 远程 MCP OAuth 并发刷新导致工具调用被取消
- **#4472** | 作者: jmtt89 | 创建: 2026-08-13（triage）
- token 过期后，并发调用的多个工具各自触发一次刷新，每次都创建新的 `rmcp::service`，导致进行中的调用报 `transport closed before the tool responded`。该缺陷直接影响依赖 OAuth 保护型 MCP 服务器（如内部企业服务器）的生产环境。
- 链接: https://github.com/github/copilot-cli/issues/4472

### 6. Microsoft Entra OAuth 静默刷新失败（AADSTS70011），强迫用户反复登录
- **#4464** | 作者: madhavdeshpande | 创建: 2026-08-12 | 更新: 2026-08-13
- 通过 Entra 认证的远程 HTTP MCP 服务器约每 60–75 分钟强制一次交互式登录；根因是刷新请求中的 scope 混用了 `.default` 与资源特定作用域。此问题直接影响企业用户在 MCP 集成上的日常使用。
- 链接: https://github.com/github/copilot-cli/issues/4464

### 7. `--server --stdio` 模式扩展宿主进程泄漏
- **#4468** | 作者: bghgary | 创建: 2026-08-12 | 更新: 2026-08-13
- Windows 桌面应用以 `--server --stdio` 方式长期托管 `copilot.exe` 时，每个会话创建 4 个扩展宿主子进程且会话结束后不释放，直至整个服务器进程退出。内存与进程数量随时间累积，是平台稳定性隐患。
- 链接: https://github.com/github/copilot-cli/issues/4468

### 8. 停止操作导致整个会话（含提示词）被删除
- **#4477** | 作者: daveroama | 创建: 2026-08-13（triage）
- 用户在代理执行中点按停止按钮，会话连同原始 prompt 与编辑内容一并丢失，且已多次复现。这是会阻断用户工作流的严重 UX 缺陷。
- 链接: https://github.com/github/copilot-cli/issues/4477

### 9. `allowed_directories` 不抑制 shell 命令的目录权限提示
- **#4482** | 作者: safich-havok | 创建: 2026-08-13（triage）
- 用户已在 `~/.copilot/permissions-config.json` 中配置 `allowed_directories`，但执行 shell 命令时依旧弹出 "path outside your allowed directory list"。而用 `/add-dir` 添加相同路径却能正常生效——配置优先级与解析逻辑疑似存在缺陷。
- 链接: https://github.com/github/copilot-cli/issues/4482

### 10. 普通代码调试被 CAPI 422 误判为网络安全风险
- **#4479** | 作者: Omotola | 创建: 2026-08-13（triage）
- 用户在创建本地分支、回滚 Visual Studio Build Insights 等常规调试操作时，Copilot CLI 持续返回 CAPI 422，明确与安全/网络无关。安全审查的误报正在干扰正常开发流程，该事件提供请求 ID 可供官方追踪。
- 链接: https://github.com/github/copilot-cli/issues/4479

---

## 重要 PR 进展

### #4476 [CLOSED] docs: 文档化自定义 Agent 推理级别 frontmatter 提案（Option A）
- 作者: romanstetsenko | 更新: 2026-08-13 | 状态: 已关闭
- 为 **#2904** 提出 Option A 方案：在 `.agent.md` frontmatter 中新增独立 `effort` 字段（与 `model` 平级），并在 README 增加 "Custom Agents" 参考章节，覆盖现有字段（name、description、model）与新增字段的用法。
- 虽然 PR 已关闭（可能以其他方式合入或待进一步讨论），但表明官方/社区正在积极推进此需求落地。
- 链接: https://github.com/github/copilot-cli/pull/4476

> 注：当日仅此 1 条 PR 更新。

---

## 功能需求趋势

从过去 24 小时的全部 Issue 中，社区关注的功能方向集中在以下 4 点：

| 方向 | 代表性 Issue | 说明 |
|---|---|---|
| **自定义 Agent 模型/推理配置** | #2904, #4462, #2133, #3954 | 社区强烈要求为每个 Agent 独立设置推理级别，且模型语法需兼容 VS Code Copilot Chat 的数组写法；同时 `explore` 子代理硬编码 `gpt-5.4-mini` 的问题仍未解决。 |
| **MCP 远程稳定性与认证** | #4480, #4472, #4464, #4463 | OAuth（Entra、Atlassian）频繁失败、并发刷新竞态、socket 错误、initialize 遇 5xx 后整个会话不再重试——远程 MCP 的可用性是当周最高频问题。 |
| **会话生命周期管理** | #4470, #4474, #4477, #4467 | 新增需求包括：提供 `cli sessions --json` 方式列出本机所有运行中会话（含 cwd、状态），以便外部工具集成监控；现有会话停止即丢失、自动归档无恢复入口等问题频发。 |
| **权限与安全体验** | #4482, #4479, #4469 | 目录白名单未生效、权限事件在会话恢复时重放、合法调试被误判为网络安全风险——权限机制的精确性和安全审查的误报率都亟需优化。 |

---

## 开发者关注点

1. **模型路由与覆盖逻辑不可预期**：多个 Issue 指向同一类问题——CLI 内部子代理（explore、code-review）不遵守用户的显式模型配置，要么硬编码模型 ID，要么静默替换为其他模型。开发者对 "配置了但被忽略" 的反馈最为强烈。

2. **远程 MCP OAuth 流程脆弱**：无论是微软 Entra 还是 Atlassian，OAuth 刷新失败、issuer 校验不兼容、并发刷新竞态等问题异常集中，且版本升级前后行为不稳定（如 1.0.71 → 1.0.79 回归），企业用户在接入内部/第三方 MCP 时面临持续的认证阻碍。

3. **长生命周期会话的资源管理**：Windows 平台扩展宿主进程每会话累积 4 个、远程会话事件存储被耗尽导致会话状态虚化、停止操作连 prompt 一起销毁——这些现象共同指向会话生命周期管理薄弱，对于把 Copilot CLI 作为后台服务/桌面应用长期运行的团队影响尤为严重。

4. **权限提示存在 Bug 且影响效率**：`allowed_directories` 不生效、权限事件在会话恢复后重复播放、安全审查误报——这些不仅造成开发中断，还削弱了对权限系统本身的信任。

---
**数据来源**: github.com/github/copilot-cli (Issues/Releases/PRs 更新于 2026-08-13 ~ 2026-08-14)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-14）

## 今日速览
过去24小时内Kimi Code CLI仓库无新版本发布与PR更新。社区层面，#1283 Memory System功能请求持续升温（累计38条评论），同时ACP模式流式响应静默挂死（#2598）与单步生成88k乱码Token（#2597）两个严重Bug引发开发者高度关注。

## 版本发布
无。

## 社区热点 Issues

### 1. Memory System – 跨会话持久化上下文（#1283）
- **作者**: CatKang | **创建**: 2026-02-27 | **更新**: 2026-08-13 | **评论**: 38
- **链接**: [GitHub #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **为什么重要**: 这是当前社区关注度最高的功能请求。用户希望在Kimi Code CLI中实现自动记忆（AI管理的笔记）与手动记忆（用户自定义指令）结合的持久化上下文系统，以便在多个会话间保留项目模式、关键上下文与个人偏好。
- **社区反应**: 38条评论表明讨论活跃，开发者普遍认为这是提升CLI在大型项目中实用性的关键能力，也是对比Copilot等竞品时的差异化亮点。

### 2. ACP/Print流式响应静默挂死（#2598）
- **作者**: ai-agent-workbench | **创建**: 2026-08-09 | **更新**: 2026-08-13 | **评论**: 1
- **链接**: [GitHub #2598](https://github.com/MoonshotAI/kimi-cli/issues/2598)
- **为什么重要**: 在ACP模式（`kimi acp`）下，流式对话存在严重可靠性问题：内容delta已全部到达，但终端帧（`[DONE]`/finish）始终未返回，CLI无限等待且无空闲超时配置；用户发送下一条消息后挂死轮被静默顶替，且已流式答复从未写入`wire.jsonl`（无`content.part`，无`usage.record`）。0.31.1仅覆盖了Esc场景，当前版本（0.34.0）仍未解决。
- **社区反应**: 虽然评论数量少，但该Issue描述详尽、复现路径清晰，直指ACP协议实现中的数据丢失风险，对依赖ACP做自动化的开发者影响很大。

### 3. 失控乱码生成 – 单步输出88k Token（#2597）
- **作者**: kdp123 | **创建**: 2026-08-08 | **更新**: 2026-08-13 | **评论**: 1
- **链接**: [GitHub #2597](https://github.com/MoonshotAI/kimi-cli/issues/2597)
- **为什么重要**: 正常交互会话中，模型单次LLM步骤运行长达**3214秒（约53分钟）**，输出**88,114个Token**的杂乱重复内容（多语言碎片、损坏的Markdown、无意义重复），严重影响用户体验并消耗大量Token配额。该问题指向模型采样参数或解码控制存在缺陷。
- **社区反应**: 开发者用户对Token消耗和对话卡死表达不满，期待CLI层面增加输出上限保护或可中断的安全机制。

## 重要 PR 进展
过去24小时无PR更新。

## 功能需求趋势
从近期Issues来看，社区最关注的功能方向集中在：

- **持久化上下文与记忆系统**（#1283）：跨会话保留项目模式、用户偏好，是呼声最高的功能需求。
- **ACP模式稳定性与协议完善**（#2598）：流式响应需要有超时保护、终帧校验、以及失败轮次的落盘行为保障。
- **生成质量与安全护栏**（#2597）：需要防止模型失控输出，应对单次生成Token数量、运行时长设置上限，并提供手动中断机制。

## 开发者关注点
- **流式传输可靠性**：挂死时无超时、被顶替轮不写日志，对自动化集成和问题排查造成严重阻碍。
- **长会话稳定性**：模型在长时间或复杂上下文中容易出现乱码、重复生成，缺乏自纠错或熔断能力。
- **记忆缺失**：会话之间无法保留有效上下文，导致重复说明需求，降低CLI效率。
- **可观测性不足**：事件日志（`wire.jsonl`）在异常场景下记录不完整，开发者难以定位问题根因。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-14

## 今日速览

过去 24 小时无新版本发布，但社区讨论与代码合并非常活跃：性能优化成为 PR 主线，一批面向 V2 启动速度的延迟加载重构正在密集合入；Issue 侧则呈现“功能/性能/安全”三足鼎立的热度格局，其中 V2 与 V1 共存问题、启动阻塞和升级脚本安全引起较多开发者共鸣。核心维护者 kitlangton 主导的多项依赖瘦身与启动优化 PR 值得关注。

## 社区热点 Issues（10 个）

**1. 保留旧版布局作为可选功能** — [#37012](https://github.com/anomalyco/opencode/issues/37012)
- **热议度**：37 评论 | 41 👍（长期热门）
- **重要性**：旧版布局的主窗口一站式操作和工作空间能力获得大量支持，社区希望 V2 提供 legacy layout 选项而非强制迁移，是当前 UI 方向最具代表性的用户诉求。

**2. “Copied to clipboard”提示但实际未复制** — [#41470](https://github.com/anomalyco/opencode/issues/41470)
- 在 VSCode Server（Docker 环境）中，复制操作显示成功但系统剪贴板无内容。直接影响远程开发场景下的基本可用性，需检查剪贴板桥接逻辑。

**3. 启动时同步拉取 models.dev 导致 10-30 秒阻塞** — [#42376](https://github.com/anomalyco/opencode/issues/42376)
- 模型注册表缓存 TTL 仅 5 分钟，网络不稳时每次冷启动被强制同步阻塞。V2 启动性能优化是当前 PR 主线之一，本 issue 提供了最直接的用户侧证据。

**4. GitHub Copilot provider 显示零模型** — [#42083](https://github.com/anomalyco/opencode/issues/42083)
- 在 1.18.15 (Arch 包) 中，`github-copilot` 认证成功但模型选择器无任何模型，`opencode models github-copilot` 直接报 "Provider not found"。第三方 provider 生态接入的稳定性有待加强。

**5. 桌面应用 80% 启动时无法加载 provider/model/MCP** — [#40516](https://github.com/anomalyco/opencode/issues/40516)
- v1.18.4 正常，v1.18.5 至 v1.18.13 全部回归。组织内多用户受影响，属典型的高影响版本回归问题，需优先定位。

**6. `opencode upgrade` 存在 curl|bash 供应链安全风险** — [#42434](https://github.com/anomalyco/opencode/issues/42434)
- 远程脚本无完整性校验即管道执行 bash，存在 TOCTOU/供应链风险。安全性问题通常会被维护者快速响应，值得追踪修复进度。

**7. 上下文压缩静默丢弃指令/约束内容** — [#42437](https://github.com/anomalyco/opencode/issues/42437)
- Compact 过程可能静默丢弃带有指令/约束的上下文，导致模型行为偏离用户意图——这是比成本更严重的上下文完整性问题。

**8. webfetch 可访问回环/私有地址（SSRF）** — [#42435](https://github.com/anomalyco/opencode/issues/42435)
- 本地 SSRF 漏洞，且守卫 PR #40851 被关闭未合并。安全研究员连续提交多个安全问题，建议维护者集中审视 webfetch 的地址限制策略。

**9. V2 中 todowrite/todoread 工具缺失** — [#42421](https://github.com/anomalyco/opencode/issues/42421)
- V2（next 构建）的模型无法使用 TUI TODO 列表工具，V1 的核心能力在 V2 中缺失。社区正在持续追踪 V2 的功能补齐进度。

**10. Zen 多源模型缺少路由亲和性导致冷缓存重复计费** — [#35402](https://github.com/anomalyco/opencode/issues/35402)
- 字节完全相同的请求在 glm-5.2 上被分流到冷缓存 provider，造成重复计费和慢速 prefill。8 👍 表明成本敏感型用户对此有较强共鸣。

## 重要 PR 进展（10 个）

**1. 性能：MCP 客户端延迟加载** — [#42468](https://github.com/anomalyco/opencode/pull/42468)
- 无 MCP server 时不再在启动阶段加载 MCP SDK，仅在实际连接或 OAuth 授权时才引入。显著降低无 MCP 场景的启动成本。

**2. 性能：webfetch HTML 解析延迟加载** — [#42469](https://github.com/anomalyco/opencode/pull/42469)
- 将 htmlparser2 及其实体表从 WebFetch 工具的注册路径中移除，只有真正遇到 HTML 响应才解析。非 HTML 场景完全避开转换开销。

**3. 性能：CLI semver 延迟加载** — [#42470](https://github.com/anomalyco/opencode/pull/42470)
- semver 仅在实际更新检查拉到候选版本后才加载。本地安装、禁用检查、网络失败等场景不再承担 import 成本。

**4. 修复：SEA 构建本地 TUI 插件加载失败** — [#42466](https://github.com/anomalyco/opencode/pull/42466)
- 修复 Node SEA 构建（opencode2-node）无法通过动态 import 加载本地 TUI 插件的问题，对 V2 的插件生态落地很关键。

**5. 重构：移除 xdg-basedir 运行时依赖** — [#42222](https://github.com/anomalyco/opencode/pull/42222)
- 用行为兼容的本地实现替换 `xdg-basedir`，移除一层间接运行时依赖，有助于降低安装体积与审计面。

**6. 性能：npm config 延迟加载** — [#42458](https://github.com/anomalyco/opencode/pull/42458)
- `@npmcli/config` 仅在真正需要 npm 配置时才加载，避免启动路径上的无效初始化。

**7. 修复：TUI 未读状态作用域隔离** — [#42471](https://github.com/anomalyco/opencode/pull/42471)
- 失焦的后台 TUI 不能再错误地标记/清除共享 session 的未读状态，多 TUI 场景不再互相干扰。

**8. 修复：TUI 标签页滚动位置隔离** — [#42456](https://github.com/anomalyco/opencode/pull/42456)
- `tab_scroll` 实验下，每个 session 标签维护独立的阅读位置，切换标签时不再串位。

**9. 重构：移除 Bus.replayAll 测试便利 API** — [#42460](https://github.com/anomalyco/opencode/pull/42460)
- 删除 114 行无生产调用的代码，测试改为逐一调用 `Bus.replay`，是核心 API 面收窄的一部分。

**10. 体验：文档编辑链接指向 v2 分支** — [#42472](https://github.com/anomalyco/opencode/pull/42472)
- www 站点生成的 “Edit on GitHub” 链接统一指向 v2 分支，避免贡献者误改到过时分支。contributor 友好型改动。

## 功能需求趋势

- **V2 性能与启动速度**：延迟加载（semver、MCP、npm config、htmlparser2）成为最密集的 PR 类型，目标是压缩启动时间与减少无用模块加载。
- **保留 V1 遗产能力**：legacy layout 选项（#37012）、V2 中恢复 TODO 工具（#42421）等诉求表明，V2 迁移期用户希望保留老版本核心体验，而非一刀切。
- **安全加固**：curl|bash 供应链风险（#42434）、SSRF（#42435）、上下文完整性（#42437）连续提交，安全审计正在成为社区关注的新焦点。
- **第三方模型/provider 支持**：GitHub Copilot 认证成功但模型不可见（#42083）、deepseek-v4-flash-free 的 429 问题（#42074）、MiMo V2.5 Free 限流（#42452）——低成本/免费模型接入的体验问题频发。
- **平台适配**：Windows 控制台窗口闪烁（#42440）、VSCode Server 剪贴板失效（#41470）——远程开发与 Windows 桌面场景的体验待补齐。
- **V1/V2 共存与数据兼容**：opencode2 迁移共享数据库导致 V1 /move 命令损坏（#42260），多版本共存的数据库隔离策略需明确。

## 开发者关注点

- **限流与免费额度困扰高频出现**：#42029、#42074、#42449、#42452 等多个 issue 都指向比例限制（429）问题，且“未使用却被限额”“恢复后立即再限”等异常频发，Zen 免费层额度判定逻辑需复查。
- **启动速度是共性痛点**：从 models.dev 同步阻塞（#42376）到桌面应用加载失败（#40516），启动阶段的问题影响面最大，开发者对“启动即等待”的容忍度极低。
- **opencode 自删异常**：#42411/#42441 中出现 pnpm 全局安装后二进制文件消失的情况，需排查 postinstall 脚本与自动更新逻辑的冲突。
- **安全敏感度上升**：安全类 issue 虽评论数不多，但连续被提交且涉及升级脚本、SSRF、上下文完整性等多个维度，建议维护者按优先级回应并修复，避免安全信誉受损。
- **V2 功能对齐 V1 的期望强烈**：从 TODO 工具到布局选项，V1 的成熟能力在 V2 中缺失会让用户产生“降级感”，建议在 V2 开发路线图中明确功能补齐时间表。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-14

## 今日速览
过去 24 小时无新版本发布，社区焦点集中在两个方向：一是 TUI 终端卫生问题的集中修复（resume 刷屏、SIGINT 后终端未恢复），二是多起模型提供商适配与上下文压缩边界问题的讨论（#6879 自动压缩失效仍为最热 Issue）。此外，Grok 4.6 模型目录支持、Gemini 旧版 schema 回退等 PR 已快速关闭合并，生态适配节奏明显加快。

## 社区热点 Issues
本周多起 Issue 围绕终端体验、上下文管理与 Windows 兼容性展开，以下为最值得关注的 10 条：

### 1. #6879 auto-compaction 在上下文超限前从不触发
- 作者：alexanderkreidich｜更新：08-13｜评价：19 评论 / 17 👍
- 地址：https://github.com/earendil-works/pi/issues/6879
- 核心问题：`gpt-5.6-sol` 单轮 agentic 任务运行超 2 小时，上下文超过 100% 后压缩仍未触发，直到 API 在 373k tokens 处拒绝请求。提议在每个 agent 步骤后检查上下文水位。
- 看点：当前评论数最高的 Issue，反映长会话场景下自动压缩机制的可靠性短板，社区高度关注。

### 2. #7836 Edit 模糊匹配忽略空白符长度差异
- 作者：robjgray｜更新：08-13｜评价：10 评论 / 1 👍
- 地址：https://github.com/earendil-works/pi/issues/7836
- 核心问题：`normalizeForFuzzyMatch` 不折叠连续空白，导致 `oldText` 在空白不一致时模糊匹配失败，影响小型模型的编辑成功率。
- 看点：直接关系到小模型在工具调用中的稳定性，具有明确的修复路径。

### 3. #8029 大缓冲区下提示编辑器移动卡顿
- 作者：affanali2k3｜更新：08-13｜评价：7 评论
- 地址：https://github.com/earendil-works/pi/issues/8029
- 核心问题：prompt 输入框内约 7000 行文本时，单次上箭头按下耗时 1650ms，性能随缓冲区线性劣化。
- 看点：已有对应 PR #8066 提交视觉行缓存方案，性能优化方向明确。

### 4. #7791 全局 Undici dispatcher 继承 16 KiB 头部上限
- 作者：mungerism｜更新：08-13｜评价：6 评论（已关闭）
- 地址：https://github.com/earendil-works/pi/issues/7791
- 核心问题：Pi 安装 `EnvHttpProxyAgent` 作为全局 dispatcher 时未设置 `maxHeaderSize`，导致合法的大响应头触发 `UND_ERR_HEADERS_OVERFLOW`。
- 看点：影响所有使用全局 fetch 的代理/网关场景，修复成本低但波及面广。

### 5. #7829 Windows 下无效 settings.json 被静默忽略
- 作者：odafeng｜更新：08-13｜评价：5 评论
- 地址：https://github.com/earendil-works/pi/issues/7829
- 核心问题：`settings.json` 中未转义的 Windows 路径导致 JSON 解析失败，但 Pi 静默忽略并报出误导性的 “bash not found”。
- 看点：暴露了配置错误诊断链的脆弱性，Windows 用户尤其容易踩坑。

### 6. #7779 可信 Unix 用户无法共享 PI_CODING_AGENT_DIR
- 作者：AlecRosenbaum｜更新：08-13｜评价：5 评论
- 地址：https://github.com/earendil-works/pi/issues/7779
- 核心问题：`auth.json` 与 `models-store.json` 以 `0600` 权限写入，首个创建用户之外的其他用户无法读写共享状态。
- 看点：多用户环境下的权限设计争议，涉及安全与可用性的权衡。

### 7. #7761 TUI 复制提示 “Copied!” 但剪贴板为空
- 作者：x1325990526｜更新：08-13｜评价：3 评论
- 地址：https://github.com/earendil-works/pi/issues/7761
- 核心问题：VTE 终端（GNOME Terminal）下选择文本后仅写入 OSC 52 序列，未实际写入系统剪贴板，`wl-paste` 验证为空。
- 看点：终端兼容性问题，与 PR #8085（Escape 取消选择）形成互动。

### 8. #8060 流式思考输出短暂闪显标题颜色
- 作者：smithyyang｜更新：08-13｜评价：3 评论（已关闭）
- 地址：https://github.com/earendil-works/pi/issues/8060
- 核心问题：0.84.1 中 thinking 块流式输出时，部分内容短暂变为粗体橙黄色（标题色），约 0.5 秒后恢复。
- 看点：纯渲染层 bug，已复现，属低风险修复项。

### 9. #7689 处理 codex 的 end_turn: false
- 作者：mitsuhiko｜更新：08-13｜评价：3 评论 / 2 👍
- 地址：https://github.com/earendil-works/pi/issues/7689
- 核心问题：Codex 后端在 `response.completed` 中可能返回 `end_turn: false`，Pi 当前未处理该扩展协议。
- 看点：模型生态协议适配细节，对 Codex 用户的使用体验有直接影响。

### 10. #8055 CJK 终端下模糊宽度字符破坏表格对齐
- 作者：Shallow-dusty｜更新：08-13｜评价：3 评论（已关闭）
- 地址：https://github.com/earendil-works/pi/issues/8055
- 核心问题：① ± … € 等模糊宽度字符被按 1 列计算，但 CJK 终端按 2 列渲染，导致表格边界错位。
- 看点：中文字符渲染的经典问题，涉及终端宽度检测的健壮性。

## 重要 PR 进展
过去 24 小时共有 12 个 PR 更新，以下为按影响力筛选的 10 个：

### 1. #8082 修复 resume 刷屏与 SIGINT 终端恢复
- 作者：frankieyep｜状态：CLOSED
- 地址：https://github.com/earendil-works/pi/pull/8082
- 内容：两项终端卫生修复：1) 恢复大会话时仅渲染可见视口而非全部历史（759 KB 会话输出从 844KB 降至合理范围）；2) SIGINT 时恢复终端原始模式、窗口标题与键盘协议。
- 看点：直接命中 #8079 与 #8080 两个社区痛点，属高价值修复。

### 2. #8086 Gemini 工具 schema 兼容回退
- 作者：d33disc｜状态：CLOSED
- 地址：https://github.com/earendil-works/pi/pull/8086
- 内容：当 generativelanguage 端点拒绝未知 JSON Schema 字段时，自动回退到旧版 `parameters` 格式，解决 `400 INVALID_ARGUMENT`。
- 看点：提升 Gemini 接入的兼容范围，对多模型用户意义显著。

### 3. #8084 修复布尔扩展参数吞掉后续 prompt
- 作者：felixzsh｜状态：CLOSED
- 地址：https://github.com/earendil-works/pi/pull/8084
- 内容：`--plan` 等布尔扩展标志将下一个 CLI 参数作为值消费掉，且未回填，导致 `pi -p --plan "prompt"` 启动会话后无任何消息并以 0 退出。
- 看点：CLI 参数解析的边界 bug，直接影响扩展工作流。

### 4. #8085 新增 Escape 取消鼠标选区
- 作者：pablasso｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/8085
- 内容：拖动选择中按下 `Escape` 可取消选区且不触发自动复制，对齐主流文本编辑器行为。
- 看点：小改动提升交互舒适度，回应“误触复制”类反馈。

### 5. #8066 提示编辑器视觉行缓存
- 作者：affanali2k3｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/8066
- 内容：缓存视觉行计算结果，仅在宽度或文本变化时失效，修复 #8029 的大缓冲区移动卡顿。
- 看点：直接针对性能热点，引入 `VisualLine` 类型统一多处内联定义。

### 6. #8070 扩展标志默认值类型校验
- 作者：acmerfight｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/8070
- 内容：将 `registerFlag()` 建模为判别联合，强制 `type` 与 `default` 一致，拒绝 `default: "false"` 这类布尔/字符串混用。
- 看点：从类型系统层面消除一类扩展配置隐患。

### 7. #7984 更新 grok-mermaid 至 0.2.3
- 作者：xl0｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/7984
- 内容：升级 grok-mermaid 渲染库，修复部分图表渲染问题（类暂不支持）。
- 看点：持续打磨 Mermaid 渲染质量，对文档类工作流友好。

### 8. #6216 新增 Amazon Bedrock Mantle OpenAI Responses 提供商
- 作者：unexge｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/6216
- 内容：基于 OpenAI Node SDK 的 Bedrock Provider，接入 Mantle 的 Responses API。
- 看点：扩展 AWS 生态接入能力，是等待较久的 provider 类 PR。

### 9. #8067 用户可见消息统一使用 APP_NAME
- 作者：mellson｜状态：CLOSED
- 地址：https://github.com/earendil-works/pi/pull/8067
- 内容：将剩余硬编码的应用名替换为 `APP_NAME`，使 rebrand 版 Pi 的输出保持一致。Pi 官方行为不变。
- 看点：对下游 fork/发行版友好的基础性改动。

### 10. #8057 修复 todo 示例校验失败时崩溃
- 作者：cyzlmh｜状态：OPEN
- 地址：https://github.com/earendil-works/pi/pull/8057
- 内容：`renderResult` 在校验失败时 `details` 为 truthy 空对象，`switch` 无 default 分支返回 undefined，导致 TUI 崩溃。补充默认返回值。
- 看点：示例代码的质量修复，对扩展开发者的参考价值高于功能本身。

## 功能需求趋势
从近期 Issues 与 PR 中可提炼出以下社区关注方向：

- **模型生态广度**：Grok 4.6 目录支持（#8046）、Amazon Bedrock Mantle（#6216）、Gemini schema 回退（#8086）相继落地，社区对“第一时间接入新模型/新 API”有持续需求。
- **终端健壮性与恢复**：SIGINT 后终端状态恢复（#8080）、`/exit` 残留 kitchen 协议（#5065）、VTE 复制兼容性（#7761）构成一组高频反馈，PR #8082 已部分修复。
- **大上下文管理**：#6879 的自动压缩边界讨论热度最高，结合 #7960 的 `/resume` 进度计数分歧分析，社区对上下文生命周期可见性提出更高要求。
- **构建与时延优化**：#7739 建议设定启动时间预算对标 jcode；#4254 提出共享 jiti 实例加速扩展加载。性能敏感型用户占比不低。

## 开发者关注点
- **上下文压缩不可预测**：#6879 表明压缩仅在 API 拒绝请求时才触发，开发者期望按步骤主动检查上下文水位，而非到达硬性上限后被动应对。
- **终端残留问题反复出现**：无论 SIGINT、`/exit` 还是 crash，终端原始模式、标题、剪贴板协议恢复问题收到多次反馈，属于“破坏开发环境”级别的高优痛点。
- **Windows 兼容性短板**：#7829（settings.json 路径转义）、#8047（Unix socket 测试失败）、#8088（AbortSignal 取消链缺口）均指向 Windows 下容易被忽视的缺陷，跨平台一致性仍有提升空间。
- **长响应失败重试导致输出重复**：#8031 指出 openai-codex 长响应中断后重试会保留并重复已输出的部分，开发者对“失败后状态清理 + 幂等重试”存在明确诉求。

---
*本日报由 GitHub 数据自动生成，所列链接均为 earendil-works/pi 仓库原始 Issue/PR。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-14

## 今日速览

昨日完成 **v0.21.11 正式版发布**，核心亮点为 Agent Plugins v1 与 `/coordinate` 原生多 Agent 协作命令；同时放出 **v0.21.12-preview.1** 与 **nightly** 预览，集中修复 Web Shell 会话保持并新增工作区文件上传能力。社区侧围绕多 Agent Fleet 架构、Windows 平台可用性与 Vertex AI 认证问题讨论热度最高。

## 版本发布

### v0.21.11（正式版）
- **Agent Plugins v1**：支持通过插件机制扩展 Agent 能力（[#8834](https://github.com/QwenLM/qwen-code/pull/8834)）
- **原生多 Agent 工作流**：新增 `/coordinate` 命令，可调度只读 teammates 协作（[#8804](https://github.com/QwenLM/qwen-code/pull/8804)）
- **SWE-bench Verified**：当前 E2E 验证状态为 **QUARANTINED**（500/500 完成，0 resolved），非生产环境验证中

### v0.21.12-preview.1 / nightly
- fix(web-shell)：保持独立会话目标（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）
- feat(web-shell)：支持工作区文件上传（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）

## 社区热点 Issues

1. **RFC：原生协调独立 Qwen 会话** [#8718](https://github.com/QwenLM/qwen-code/issues/8718)
   leader 可派发多个后台 worker 并保持交互，可观察关联运行时与任务状态。9 条评论，已关闭，是多 Agent Fleet 工作的总纲。

2. **会话恢复超时导致当前会话丢失（P1）** [#8678](https://github.com/QwenLM/qwen-code/issues/8678)
   大会话 restore 超时需要保护现有会话，PR1 已合入，实现超时契约与可观测性。

3. **Windows 下 Ctrl+V 粘贴完全失效（P1，回归）** [#9061](https://github.com/QwenLM/qwen-code/issues/9061)
   0.21.0 与 0.21.11 之间引入回归，PowerShell 正常但 Qwen Code CLI 无响应，Windows 用户受影响明显。

4. **Gemini 2.5 在 Vertex AI 上完全不可用** [#9019](https://github.com/QwenLM/qwen-code/issues/9019)
   `thinkingLevel` 字段总是携带 UNSPECIFIED 占位符导致 400 错误，所有请求在工具调用前即失败。

5. **无密钥 Vertex AI 无法从环境自动推断认证** [#9025](https://github.com/QwenLM/qwen-code/issues/9025)
   纯环境变量配置的无密钥 Vertex AI 在 headless 模式下无法自动选择 `vertex-ai` 认证类型。

6. **Python SDK 拒绝 `permission_mode="auto"`** [#9002](https://github.com/QwenLM/qwen-code/issues/9002)
   CLI 支持但 SDK 客户端校验提前拦截，二者行为不一致。

7. **后台 Agent 恢复与 activeWork 追踪** [#8586](https://github.com/QwenLM/qwen-code/issues/8586)
   请求为 daemon 深层健康检查增加 `activeWork` 事实，覆盖五层恢复路径。

8. **record_artifact 未验证 workspacePath 导致状态不一致** [#9083](https://github.com/QwenLM/qwen-code/issues/9083)
   文件实际存在但 artifact 显示 missing，模型误导用户可打开/下载。

9. **read_file 仅凭扩展名将非图片文件发送给模型 API** [#9088](https://github.com/QwenLM/qwen-code/issues/9088)
   PNG 扩展名但内容为 JSON 时，原始 400 直接中止对话轮次。

10. **Windows 独立安装器 Get-FileHash 失败** [#7118](https://github.com/QwenLM/qwen-code/issues/7118)
    已有 7 条评论与 3 个 👍，安装 SHA-256 校验失败后回退 npm 安装。

## 重要 PR 进展

1. **[#9095](https://github.com/QwenLM/qwen-code/pull/9095) feat(review): 前瞻式闭合无限缺陷类别**
   通过提示词改造让 Agent 3b 识别"枚举陷阱"，不再逐入口枚举无限缺陷族。

2. **[#8677](https://github.com/QwenLM/qwen-code/pull/8677) feat(tui): OpenTUI 渲染后端（React 轨道）**
   单一 PR 完成新 TUI 渲染器迁移，主打无闪烁与一等鼠标支持。

3. **[#9104](https://github.com/QwenLM/qwen-code/pull/9104) feat(autofix): 非收敛 diff 升级为维护者交接**
   当 diff 跨轮持续超出预算时停止自动修补，转人工决策。

4. **[#9086](https://github.com/QwenLM/qwen-code/pull/9086) fix(review): 修复四个实际运行失败**
   针对三个真实 PR 跑通 `qwen review run` 发现的四个缺陷，每个修复均配有回归测试。

5. **[#8978](https://github.com/QwenLM/qwen-code/pull/8978) feat(serve): 空 channel 集优雅降级**
   `--channel all` 不再因无配置而 exit(1)，改为 no-op 并仅恢复活跃 channel。

6. **[#8682](https://github.com/QwenLM/qwen-code/pull/8682) feat(serve): daemon 会话轮询状态端点**
   新增 `GET /session/:id/turns/:promptId` 与 `/turns/current`，支持 idle/queued/running 等状态轮询。

7. **[#9057](https://github.com/QwenLM/qwen-code/pull/9057) fix(daemon): 精简子 Agent 实时回放日志**
   为仅渲染主会话摘要的客户端提供紧凑日志，保留完整日志作为默认兼容。

8. **[#8332](https://github.com/QwenLM/qwen-code/pull/8332) feat(cli): 附件音频桥接**
   主模型不支持音频时，通过批量语音模型转写并标记为不可信机器转写，支持交互与 ACP。

9. **[#8529](https://github.com/QwenLM/qwen-code/pull/8529) feat(core): 从 API 元数据解析模型模态**
   使用 models.dev 紧凑快照解析缺失的输入模态，后台刷新且不阻塞冷启动。

10. **[#9098](https://github.com/QwenLM/qwen-code/pull/9098) feat(cli): 设置项启用动态工作流**
    新增 `tools.workflowsEnabled` 配置项，替代此前未文档化的环境变量。

## 功能需求趋势

- **多 Agent / Fleet 架构**：`/coordinate` 命令落地后，Fleet 的持久化、恢复、加固（stage 2/3）与 Web Shell 会话治理成为当前主赛道
- **Web Shell 能力扩张**：工作区文件上传、Channel 策略重设计、artifact 路径校验是反复出现的高频主题
- **云服务认证与模型兼容**：Vertex AI keyless 认证推断、Gemini thinkingLevel 适配是亟需解决的集成问题
- **Omni 多模态实验**：S4a-S6 多个 Policy/Memory 子任务推进中，关注媒体降质压缩、跨会话召回与治理收尾
- **TUI 现代化**：OpenTUI 渲染后端迁移值得持续跟踪，直接改善终端交互体验

## 开发者关注点

- **Windows 平台体验**：安装器校验失败、CLI 粘贴回归、桌面端误开终端窗口，Windows 用户反馈集中
- **SDK 与 CLI 行为一致性**：`permission_mode="auto"` 被 SDK 拒绝暴露了校验分叉问题
- **文件操作可靠性**：artifact 状态不一致、伪图片文件导致 400 中断，影响 agent 对文件系统的信任
- **依赖安全**：npm 审计报出 2 个 high severity 漏洞（[#8944](https://github.com/QwenLM/qwen-code/issues/8944)），Repo 层面已并行推进 CODEOWNERS 与最小权限等安全卫生 PR（[#9008](https://github.com/QwenLM/qwen-code/pull/9008)）
- **大会话恢复超时**：restore 超时保护会话的修复已合入，但用户对 daemon 长会话稳定性仍有较高期待

> 数据来源：[QwenLM/qwen-code GitHub Repository](https://github.com/QwenLM/qwen-code) · 统计区间：2026-08-13 至 2026-08-14

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-14

## 今日速览

项目正式以 **CodeWhale** 品牌发布 v0.9.7，旧 `deepseek-tui` npm 包停止维护，命令统一为 `codewhale`。社区围绕 agent 工具 schema 过载（#5324）、大文本处理会话卡死（#1425）以及 Windows 环境问题展开激烈讨论；v0.9.8 的新功能 PR（Auto-Review 守护、DS4 本地路由）已经开放。

## 版本发布

**v0.9.7**：自本版本起，产品以 Shannon Labs 的 **CodeWhale** 名义发布。`codewhale` 命令 / npm 包 / 资产名统一为小写技术标识符；旧 `deepseek-tui` npm 包已弃用，不再发布新版本。v0.8.x 用户升级时需注意命令变更。
https://github.com/Hmbown/CodeWhale/releases

## 社区热点 Issues

1. **#5324 agent tool 32 字段 schema 导致模型频繁报错** [OPEN]
  模型面对的 `agent` 工具有 32 个属性、零必填字段，同时服务 8 个 action，运行时还要接受一堆别名。社区讨论如何简化 schema，已有 PR #5369 尝试先行降级 Moonshot schemas。这是当前影响模型稳定性的核心技术债。
  https://github.com/Hmbown/CodeWhale/issues/5324

2. **#1425 分析 300 万字小说时会话中断卡死** [OPEN]
  用户让 TUI 分析长篇文本，AI 启动 10 个子 Agent 分批处理，但 `agent_wait` 一直等待子 Agent 超时，最终会话中断。子 Agent 全部显示 Running 却无响应，是并发调度的可靠性问题。
  https://github.com/Hmbown/CodeWhale/issues/1425

3. **#2369 配置路径在 Windows / Cygwin 之间分裂，存在静默迁移 bug** [OPEN]
  Windows 与 Cygwin 环境下配置文件解析走不同的 home 路径规则，可能导致旧配置迁移后丢失。涉及 macOS/Linux 的路径差异，影响面较大。
  https://github.com/Hmbown/CodeWhale/issues/2369

4. **#1651 VS Code 在 YOLO Agent 执行测试脚本时崩溃** [OPEN]
  在 VS Code 集成终端中运行 YOLO Agent 时，VS Code 会崩溃或意外退出。IDE 集成稳定性是开发者高频使用场景。
  https://github.com/Hmbown/CodeWhale/issues/1651

5. **#1829 SSH 连接失败 exit 255，疑似沙箱出站阻断** [OPEN]
  内置 shell 无法建立 SSH 连接，即使本地终端正常。沙箱 TCP 22 出站规则需要重新评估。
  https://github.com/Hmbown/CodeWhale/issues/1829

6. **#1675 Agent 实时输出中文乱码** [OPEN]
  生成 Obsidian/Word 内容时，中文输出乱码。疑似编码处理问题，影响大量中文用户。
  https://github.com/Hmbown/CodeWhale/issues/1675

7. **#5374 Agent 写作时文本损坏（新建，macOS）** [OPEN]
  今天新建的 issue：macOS 上 agent 输出文本全部乱码，用户无法阅读。需要尽快定位是渲染层还是生成层的问题。
  https://github.com/Hmbown/CodeWhale/issues/5374

8. **#5359 四个 TUI 测试读取真实机器状态，在开发机上必然失败** [OPEN]
  测试读取 `~/.codewhale` 和 display probe，开发机有真实状态就失败，CI 却一直绿。测试隔离性问题已由 PR #5368 修复。
  https://github.com/Hmbown/CodeWhale/issues/5359

9. **#5340 v0.9.6 升级后 doctor 永远卡在 needs action** [OPEN]
  升级到 v0.9.6 后，`codewhale doctor` 的 first-run 和 update checkpoint 状态无法完成，即使重新跑一遍 onboarding。升级路径的检查逻辑有 bug。
  https://github.com/Hmbown/CodeWhale/issues/5340

10. **#998 文案展示不全，希望鼠标悬浮显示完整提示** [OPEN]
  界面文本在窄屏或长文本场景下被截断，用户希望 hover 能看到完整内容。属于 UI 细节但反馈较多（11 条评论）。
  https://github.com/Hmbown/CodeWhale/issues/998

## 重要 PR 进展

1. **#5353 Auto-Review 增加 model guardian 层（v0.9.8）** [OPEN]
  Auto-Review 变成真正的两层模式：确定性规则层不可绕过，fallback 升级到一次性 model guardian，参考 Codex 和 Kimi 语义，默认 fail-closed。
  https://github.com/Hmbown/CodeWhale/pull/5353

2. **#5365 本地 DS4（DwarfStar）成为一等路由** [OPEN]
  `/setup provider ds4` 或 provider-picker 的 `D` 快捷键可直接配置无 key 的本地 DeepSeek V4 路由，复用 OpenAI 兼容传输层，无需手动适配。
  https://github.com/Hmbown/CodeWhale/pull/5365

3. **#5369 Moonshot schemas 降级而不是拒绝条件字段** [OPEN]
  针对 #5324 单独拆出的 schema 切片：对 Moonshot 模型的 schema 做降级处理，避免因条件字段缺失而拒绝请求。
  https://github.com/Hmbown/CodeWhale/pull/5369

4. **#5368 将无防护测试隔离到独立状态根目录** [OPEN]
  修复 #5359，通过三个独立机制隔离测试环境，每个机制都有对应回归测试。
  https://github.com/Hmbown/CodeWhale/pull/5368

5. **#5339 抑制子 shell 自动完成事件** [OPEN]
  过滤子进程后台 shell 的 completion 事件，避免污染父模型流，关闭 #5325。
  https://github.com/Hmbown/CodeWhale/pull/5339

6. **#5364 Markdown 引用块渲染改进** [CLOSED]
  为 `>` 引用块添加引用栏渲染，支持嵌套、内联格式和正确的复制行为。
  https://github.com/Hmbown/CodeWhale/pull/5364

7. **#5358 Auto-Review 拒绝理由 + 断路器** [CLOSED]
  Block 不再返回裸 `permission_denied`，而是附带具体理由；并加入断路器防止模型在同一拒绝动作上反复绕圈直到步数耗尽。
  https://github.com/Hmbown/CodeWhale/pull/5358

8. **#5333 / #5318 终端窗口置顶迷你模式（社区 PR 整合）** [CLOSED]
  社区贡献的 Windows 功能：右键菜单或 `/pin` 可将宿主终端缩到 640x400 并置顶，再次触发恢复。Hmbown 以 harvest 流程整合进主线。
  https://github.com/Hmbown/CodeWhale/pull/5333
  https://github.com/Hmbown/CodeWhale/pull/5318

9. **#5336 MCP 协议修复：无下一页时省略 nextCursor** [CLOSED]
  `tools/list` 和 `resources/list` 返回 `"nextCursor": null`，违反 MCP 规范（必须是字符串或缺失），导致 Claude Code 等严格客户端报错。现已修复。
  https://github.com/Hmbown/CodeWhale/pull/5336

10. **#5106 DeepSeekClient 重命名为 provider-neutral 类型** [CLOSED, WIP]
  配合品牌更名，将 `DeepSeekClient` / `deepseek_api_key` 等内部类型改为 provider-neutral 命名，不影响行为。
  https://github.com/Hmbown/CodeWhale/pull/5106

## 功能需求趋势

- **本地/自托管模型支持**：社区强烈希望 CodeWhale 能便捷接入本地模型（DS4/DwarfStar、NVIDIA NIM 等），减少对云端 API 的依赖。
- **可配置交互体验**：可定制键位（#436）、多行输入模式 / 自定义发送快捷键（#5345）被反复提及，输入体验是高频诉求。
- **i18n 深度覆盖**：中文乱码（#1675）、文案截断（#998）、zh-Hant 完整度（#5334）说明国际化不再只是翻译，需要处理编码与布局细节。
- **远程工作台一体化**：CNB / Lighthouse / Feishu 流程整合（#1984）以及 US-first 远程通道评估（#1990），目标是让远程使用体验像本地一样顺畅。
- **Agent 运维治理**：Auto-Review 两层模式、agent 工具 schema 简化、子 Agent 超时处理，说明社区开始关注 Agent 的可控性与可观测性。

## 开发者关注点

- **Windows 是重灾区**：配置路径分裂（#2369）、SSH 出站阻断（#1829）、默认终端体验（#1854）、shell 风格不匹配（#1754）——大量 issue 集中在 Windows/Cygwin 环境。
- **大上下文稳定性不足**：300 万字小说分析卡死（#1425）、合并分析报告保存慢（#1732），长文本场景需要更稳健的内存与并发策略。
- **升级/迁移路径有摩擦**：v0.9.6 doctor 卡死（#5340）、旧 `deepseek-tui` 包到 `codewhale` 的配置迁移（#2369），需要更平滑的升级体验。
- **测试可靠性**：测试读取真实机器状态（#5359）反映 CI 与本地环境一致性不足，开发者对 test isolation 的容忍度在降低。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*