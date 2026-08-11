# AI CLI 工具社区动态日报 2026-08-11

> 生成时间: 2026-08-11 10:24 UTC | 覆盖工具: 10 个

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

# AI CLI 工具社区动态横向对比分析报告

**日期：2026-08-11**

---

## 1. 生态全景

当前 AI CLI 工具正经历从“对话式编程助手”向“持久化开发工作区”的快速演进，各主流工具均在 24 小时内发布了补丁或推进了架构级重构。Agent/子代理的可靠性、会话生命周期管理、跨平台兼容性成为三大核心竞争焦点；与此同时，安全策略误报、配额计费不透明等问题在多个工具社区集中爆发，反映出工具在规模化落地过程中正面临“安全与效率”的平衡挑战。头部工具（Claude Code、OpenAI Codex、Gemini CLI）迭代稳定，而开源新锐（OpenCode、Pi、Qwen Code）则以高频 PR 合并速度与灵活的 provider 兼容性快速缩小差距。

---

## 2. 各工具活跃度对比

> 注：Issues 数为当日社区热点/全部更新数量，PR 数为当日有更新的 PR 数量，Release 为当日/昨日发布。

| 工具 | Issues | PR | Release | 活跃度特征 |
|------|--------|-----|---------|-----------|
| Claude Code | 10（热点） | 1 | v2.1.227 | Issues 高热但社区 PR 贡献极低，官方主导迭代 |
| OpenAI Codex | 10（热点） | 10 | v0.147.0-alpha.6.6 | Issue 与 PR 双高，全部 PR 已合并，工具链自驱力强 |
| Gemini CLI | 10（热点） | 10 | v0.56.0-nightly | 高活跃，P1 级 Bug 堆积与修复并行，维护者响应快 |
| GitHub Copilot CLI | 10（热点） | 1 | v1.0.79 | Issues 聚焦企业场景，社区 PR 贡献少 |
| Kimi Code CLI | 5（全量） | 7 | 无 | 议题集中但体量较小，历史 PR 批量合入 |
| OpenCode | 10（热点） | 10 | 无 | 高活跃开源社区，Provider 可靠性与计费透明是焦点 |
| Pi | 10（热点） | 10 | 无 | 高活跃，Windows/WSL 与 TUI 体验为核心议题 |
| Qwen Code | 10（热点） | 10 | v0.21.9 正式版 | 高活跃，会话管理与 daemon 架构是主线 |
| DeepSeek TUI | 2（全量） | 5 | 无（v0.9.6 准备中） | 规模尚小，聚焦架构重构与安全修复 |
| Grok Build | 0 | 0 | 无 | 无活动 |

---

## 3. 共同关注的功能方向

### 3.1 Agent / 子代理可靠性与安全边界
- **Gemini CLI**：Subagent 达到 MAX_TURNS 被误报为成功（#22323）、Generalist 无限挂起（#21409）、禁用后仍被执行（#22093）
- **DeepSeek TUI**：嵌套子代理可扩大根会话递归深度预算（#5253），已通过 PR #5317 修复
- **GitHub Copilot CLI**：rubber-duck 的对抗性审查可被模型参数绕过（#4432）、agent 使用已下架模型导致整会话崩溃（#4427）
- **Claude Code**：AUP 安全护栏对正常开发任务大量误报（#71208、#71314 等）

### 3.2 Windows 平台兼容性
- **OpenAI Codex**：Computer Use 多项阻塞（EPERM、ACL、node_repl）、沙箱内 Git HTTPS 失败（#37013、#31073、#37415）
- **Qwen Code**：聊天文件链接冒号被 URL 编码（#8644）
- **Pi**：CMD 下 P0 级重复输出/内存泄漏（#7947）、WSL 登录挂起（#6187）
- **OpenCode**：PowerShell 非 ASCII 乱码（#23636）、反斜杠路径致文件树不刷新（#41704）
- **Kimi Code CLI**：PowerShell 7 从 D 盘启动找不到路径（#2600）
- **GitHub Copilot CLI**：VS Code 持有 watcher 句柄致插件更新失败（#4095）

### 3.3 配额/计费透明度
- **Gemini CLI**：用量显示 1–8% 却报 Usage limit reached（#28761，15 👍）
- **OpenAI Codex**：周限额消耗速度与旧的 5 小时限额一样快（#33685）
- **OpenCode**：Go Plan 用户 45 分钟烧掉 $12 且零输出、无警告（#41684）；Zen 模型禁用开关未在网关生效（#41697）

### 3.4 会话生命周期管理
- **Qwen Code**：大会话恢复超时丢失会话（#8678）、新增 sessionRotation 支持（#8927）
- **OpenAI Codex**：线程导航因无界元数据变慢（#21211）、Remote 线程无法恢复（#37403）
- **Gemini CLI**：`--resume` 误开新会话文件并可能污染原文件（#28767）
- **OpenCode**：Provider 流中断被静默记录为正常完成（#37852，55 👍）、长会话 fork 加速（#41701）
- **Kimi Code CLI**：跨会话记忆系统缺失（#1283、#1478）

### 3.5 本地化（i18n）与文案质量
- **Claude Code**：#64472 长期诉求简体中文界面
- **OpenCode**：高棉语本地化 PR（#37457）
- **Kimi Code CLI**：规划任务中意外出现“Autopsy（验尸）”文案（#2599）

---

## 4. 差异化定位分析

| 工具 | 定位与技术路线 | 核心优势 | 当前短板 |
|------|---------------|---------|---------|
| **Claude Code** | 面向专业开发者的全栈 CLI，深度绑定 Claude 模型与订阅体系 | 模型能力领先、生态成熟、补丁响应快 | 安全护栏误报严重；社区 PR 参与度低；桌面端设置可信度受损 |
| **OpenAI Codex** | 背靠 OpenAI 闭源模型的工具链型 CLI，Rust 实现 | Provider 抽象灵活、工具目录缓存等架构细节扎实、CI/CD 集成好 | Windows 端 Computer Use 与沙箱问题集中；连接可靠性（反复 Reconnecting）影响体验 |
| **Gemini CLI** | 原生 Agent 优先架构，强调子代理与 Auto Memory | Agent 框架前瞻性强、新模型接入快（贡献者已提交 3.6 Flash 配置） | P1 级 Agent 稳定性问题长期未决，信任度受损 |
| **GitHub Copilot CLI** | 企业级 GitHub 生态 CLI，策略管理为核心 | 企业策略支持（allow-auto-only）、与 GitHub 深度集成 | 配置写入易碎（/config model 清空 settings）；企业网络/CA 兼容性差 |
| **Kimi Code CLI** | 绑定 Moonshot 模型，Python 实现 | 社区小而专注；ACP 协议与 shell 路由修复及时 | 记忆系统缺失成为大项目最大瓶颈；文档匮乏 |
| **OpenCode** | 开源开放的 provider 中立 CLI（TS/Go） | Provider 兼容性广、社区 PR 合入极快、会话管理特性丰富 | 计费/配额网关一致性差；Windows 桌面端稳定性弱 |
| **Pi** | 独立开发者主导的多模型 TUI，JVM 技术栈 | 多 provider 接入（Copilot/Anthropic/DeepSeek）、TUI 交互细节打磨好 | Windows/WSL 体验碎片化；长会话 CPU/内存占用高 |
| **Qwen Code** | 绑定 Qwen 模型的 daemon/Web Shell 服务架构 | 服务端多租户路线清晰、会话轮换/结构化错误码等设计先进 | 内存分配策略含糊；headless 模式错误误报影响 CI |
| **DeepSeek TUI** | Rust 实现的高性能 TUI，面向极简与深度定制 | 架构重构（crate 分解）前瞻性强；递归安全修复及时 | 生态尚小；功能覆盖与头部工具差距较大 |
| **Grok Build** | xAI 官方 CLI | 待观察 | 当日无任何社区动态，活跃度最低 |

---

## 5. 社区热度与成熟度

### 第一梯队：高度活跃、快速迭代
**OpenAI Codex、Gemini CLI、OpenCode、Pi、Qwen Code** —— 每日 PR 合入量均在 10 个左右，社区贡献者参与度高（含独立开发者提交的首次贡献，如 Gemini 的 MCP OAuth 修复）。其中 **OpenCode** 社区反应速度最快，issue 提交后当日即有对应 PR；**Pi** 的 PR 覆盖 deepseek 参数映射、WebSocket 重试、TUI 搜索等全栈细节。

### 第二梯队：用户基数大但社区贡献低
**Claude Code、GitHub Copilot CLI** —— 议题热度高（AUP 误报多 issue 集中爆发、企业策略问题持续半年未解决），但社区 PR 数极低（各仅 1 个），迭代主要由官方驱动。这既可能反映其架构开放性不足，也提示企业用户需更多依赖官方支持通道。

### 第三梯队：规模较小、转型或蓄势期
**Kimi Code CLI、DeepSeek TUI** —— Kimi 今日无新版本，以历史 PR 批量合入为主，处于功能补强阶段；DeepSeek TUI 以 EPIC-005 架构重构和 v0.9.6 发布准备为主，工程化进展扎实，但社区规模尚小。**Grok Build** 当日无活动，竞争力未知。

---

## 6. 值得关注的趋势信号

1. **安全护栏正从“一刀切”走向“上下文感知”的临界点**：Claude Code 的 AUP 误报在一天内出现近 5 例同类 issue，且全部来自正常安全审计/Web 开发任务，部分用户已开始提交“绕过策略自动恢复”的配置。这暗示：AI 安全策略若不能区分“防御性安全任务”与“恶意行为”，将迫使开发者自行规避，反而增大风险。

2. **Windows 从“次要平台”跃升为“第二主战场”**：OpenAI Codex 的 Windows Computer Use 多 bug 阻塞、Qwen Code 的路径编码修复、Pi 的 P0 级 CMD 异常，均说明各厂商正在集中补课 Windows 适配。对开发者而言，选择工具时需重点考察其 Windows 沙箱与终端链路成熟度。

3. **会话管理从“上下文窗口”升级为“产品级生命周期”**：OpenAI Codex 的量。线程元数据膨胀、Gemini 的 resume 会话文件污染、Qwen 的 daemon 级会话轮换、Kimi 的记忆系统呼声，共同指向一个趋势——“持久工作区”将成为 AI CLI 的标配能力。开发者在选择工具时，应关注其长会话稳定性、恢复机制与记忆持久化方案。

4. **计费与配额的可观测性正在成为信任基石**：Gemini、Codex、OpenCode 均出现配额显示与实际计费不一致的问题，且 OpenCode 出现“静默烧钱 + 模型禁用开关失效”。对于使用订阅额度的团队，建议优先选择配额逻辑透明、支持预警机制的工具。

5. **开源社区 PR 合入速度成为竞争力分水岭**：OpenCode、Pi、Qwen Code 在 24 小时内完成 10+ PR 合入，而 Claude Code、Copilot CLI 仅各有 1 个社区 PR。社区驱动型工具在长尾需求响应上具备显著优势，这对依赖特定工作流定制的开发者尤为重要。

6. **多模型/自定义端点兼容性正从“锦上添花”变为“刚需”**：Copilot CLI 的 BYOK 场景硬编码模型失败、OpenCode 的 provider 流静默中断、Pi 的 DeepSeek 原生参数映射，均反映出用户不再接受被锁定于单一模型厂商。支持任意 OpenAI 兼容端点、可配置 provider 参数的工具将在未来 6–12 个月内获得更大市场空间。

---

*报告基于 2026-08-11 各工具 GitHub 公开数据生成，数据截至当日 23:59 UTC。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-08-11 ｜ 数据源：github.com/anthropics/skills**

> 说明：样本中 PR 评论数字段缺失（undefined），热度排序依据仓库"按评论数排序"的原始顺序推断；样本内 PR 状态全部为 open（数据为 Top 20 PR / Top 15 Issue 子集）。

## 一、热门 Skills 排行

**1. skill-creator 评估链路修复（[#1298](https://github.com/anthropics/skills/pull/1298)）**
- 功能：修复 `run_eval.py` 对所有描述恒报 recall=0% 的严重缺陷——将 eval artifact 安装为真实 skill，并修复 Windows 流读取、触发检测与并行 worker。
- 热点：直接回应 [#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍，社区 10+ 次独立复现）；"描述优化循环正在对噪声做优化"严重动摇开发者对 skill 工具链的信任。
- 状态：open

**2. document-typography 排版质检（[#514](https://github.com/anthropics/skills/pull/514)）**
- 功能：AI 生成文档的排版质量控制——孤行（orphan）、页尾标题（widow）、编号错位等 Claude 生成文档的普遍问题。
- 热点：被社区视为"影响每份生成文档"的基础能力，需求无争议、合并阻力小。
- 状态：open

**3. testing-patterns 测试方法论（[#723](https://github.com/anthropics/skills/pull/723)）**
- 功能：覆盖完整测试栈：Testing Trophy 取舍哲学、AAA 模式、该测与不该测、React Testing Library、边界用例。
- 热点：测试编写是 Agent 工程化最高频场景之一，结构化测试方法论呼声高。
- 状态：open

**4. ODT/OpenDocument（[#486](https://github.com/anthropics/skills/pull/486)）**
- 功能：ODT/ODS 创建、模板填充、ODT→HTML 解析；触发词覆盖 LibreOffice、ISO 标准格式等。
- 热点：文档 Skill 版图正从 docx/pdf 向开放格式扩展，补齐 ISO 生态拼图。
- 状态：open

**5. pyxel 复古游戏开发（[#525](https://github.com/anthropics/skills/pull/525)）**
- 功能：基于 pyxel-mcp 的像素/8-bit 游戏开发，write → run_and_capture → inspect → iterate 迭代闭环。
- 热点：作者即 Pyxel/pyxel-mcp 原作者 kitao，上游背书且 2026-07 仍在更新，活跃度最高的一批。
- 状态：open

**6. skill-quality-analyzer + skill-security-analyzer（[#83](https://github.com/anthropics/skills/pull/83)）**
- 功能：两个元技能——质量分析覆盖结构/文档（20%）、示例、资源等五维评估；安全分析则面向 skill 安全审查。
- 热点：与社区对 skill 质量与安全的高度关注（[#492](https://github.com/anthropics/skills/issues/492)、[#202](https://github.com/anthropics/skills/issues/202)）形成共振。
- 状态：open

**7. self-audit 输出审计（[#1367](https://github.com/anthropics/skills/pull/1367)）**
- 功能：交付前先做机械性文件验证，再按损害严重度执行四维推理审计（v1.3.0），宣称通用任何项目/技术栈/模型。
- 热点：与 [#1385](https://github.com/anthropics/skills/issues/1385) 质量门禁管线提案同源，代表"输出质量治理"新方向。
- 状态：open

**8. color-expert 色彩专家（[#1302](https://github.com/anthropics/skills/pull/1302)）**
- 功能：自包含色彩知识库——ISCC-NBS/Munsell/XKCD/RAL 命名系统、OKLCH/OKLAB/CAM16 等色空间"何时用哪个"决策表。
- 热点：垂直领域专家知识结构化的范本，2026-07-21 仍活跃，具备随时合并条件。
- 状态：open

其他值得关注：frontend-design 清晰化重构（[#210](https://github.com/anthropics/skills/pull/210)）、plan-file-hygiene（[#1479](https://github.com/anthropics/skills/pull/1479)）、SAP-RPT-1-OSS 预测分析（[#181](https://github.com/anthropics/skills/pull/181)）。

## 二、社区需求趋势（来自 Issues）

- **安全与信任边界**：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）位居全部 Issues 之首——社区技能挂 anthropic/ 命名空间冒充官方，形成权限信任链漏洞；[#1175](https://github.com/anthropics/skills/issues/1175) 关注将访问控制逻辑写入 SKILL.md 的安全/上下文风险。
- **组织级共享与分发**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论、8 👍）要求 org 内直接共享 Skill，替代"下载文件→Slack 传送→手动上传"的原始链路。
- **评估工具链可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（12 评论、7 👍）与 [#1169](https://github.com/anthropics/skills/issues/1169) 持续报告 run_eval 0% 触发率；[#62](https://github.com/anthropics/skills/issues/62) skills 莫名消失；[#189](https://github.com/anthropics/skills/issues/189) 插件重复安装污染上下文。开发者的核心焦虑是"造 skill 的工具不可信"。
- **上下文窗口效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api skill 单次注入 ~156k token 撑爆上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提出 compact-memory 符号化压缩长期记忆。
- **输出质量治理**：[#202](https://github.com/anthropics/skills/issues/202) 批评 skill-creator 冗长低效且命名违规；[#1385](https://github.com/anthropics/skills/issues/1385) 提出三闸门质量管线；[#412](https://github.com/anthropics/skills/issues/412) 提议 agent-governance 安全模式。
- **平台/协议扩展**：[#16](https://github.com/anthropics/skills/issues/16) 希望 Skills 暴露为 MCP 接口、[#29](https://github.com/anthropics/skills/issues/29) 希望支持 AWS Bedrock。

## 三、高潜力待合并 Skills

- **[#514 document-typography](https://github.com/anthropics/skills/pull/514)**：痛点通用、改动独立、无争议，合并阻力最小。
- **[#723 testing-patterns](https://github.com/anthropics/skills/pull/723)**：内容完整、工程价值直观，最可能被官方收录的品类。
- **[#525 pyxel](https://github.com/anthropics/skills/pull/525)**：上游作者持续维护，但偏 niche，可能进入 example-skills 而非核心集。
- **[#1302 color-expert](https://github.com/anthropics/skills/pull/1302)**：自包含、质量高、近期活跃，具备随时合并条件。
- **[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)**：与 [#1385](https://github.com/anthropics/skills/issues/1385) 提案互相背书，已迭代至 v1.3.0，值得跟踪。
- **[#1479 plan-file-hygiene](https://github.com/anthropics/skills/pull/1479)**：明确回应 [#1417](https://github.com/anthropics/skills/issues/1417) 并获得社区贡献者背书，提交晚但方向正确。
- **[#83 analyzer 元技能](https://github.com/anthropics/skills/pull/83)**：契合安全/质量诉求，但官方是否收录"分析 skill 的 skill"存在不确定性。

## 四、生态洞察

**一句话总结**：社区最集中的诉求是让 Skill 生态先"可信"再"规模化"——修复 skill-creator 评估工具链的 0% recall 缺陷（否则整个优化循环在噪声上空转）、规范命名与分发以消除信任边界漏洞（#492）、同时解决上下文窗口效率与组织级共享等规模化瓶颈。

---

# Claude Code 社区动态日报（2026-08-11）

## 今日速览

昨日发布补丁版本 v2.1.227，修复了登录令牌过期导致的 feature flags 误判及 `claude-code-action` 中 Bash 命令失效问题。社区侧最突出的舆情是 Linux 平台用户集中反馈 AUP（可接受使用政策）安全拦截产生大量误报，多个正常开发任务（安全审计、Web 调试、文件清理）被错误阻断。此外，当日仅有 1 个新 PR，聚焦 hookify 插件配置加载缺陷的修复。

---

## 版本发布

### v2.1.227（2026-08-11）

主要变更：

- **修复**：会话以过期登录令牌启动时，feature flags 不再绕过用户订阅等级进行求值，避免 Fable 功能向 Max 计划用户错误提示启用用量额度。
- **修复**：`claude-code-action` 环境下所有 Bash 命令因 `allowed_no` 问题而失败的情况。

🔗 [查看 Release 详情](https://github.com/anthropics/claude-code/releases)

---

## 社区热点 Issues

以下为过去 24 小时内更新最活跃、开发者关注度最高的 10 个 Issue：

1. **桌面应用强制注入 computer-use MCP，即使已禁用 Computer Use**
   #68022 ｜ macOS 桌面版在设置中禁用 Computer Use 后，仍向每个会话注入 `computer-use` MCP 服务器（27 个工具 + 约 1.4K 令牌指令块），导致上下文膨胀和潜在功能冲突。
   🔗 https://github.com/anthropics/claude-code/issues/68022

2. **年龄验证功能触发 Anthropic API 内容过滤错误**
   #71357 ｜ macOS 平台上年龄验证（Age Verification）流程意外触发 “Output blocked by content filtering policy” API 错误，用户无法正常使用相关功能。
   🔗 https://github.com/anthropics/claude-code/issues/71357

3. **AUP 误报：CSP 调试与前端开发被安全策略拦截**
   #71314 ｜ 在浏览器控制台输出 CSP 违规信息后，正常的前端调试会话（TypeError 排查、用户偏好功能实现）被误判为安全违规而中断。
   🔗 https://github.com/anthropics/claude-code/issues/71314

4. **AUP 误报：云端 IAM 事件响应审计被阻断**
   #71208 ｜ 对自己组织的 Web 服务器与容器基础设施进行攻击失陷排查时，被 cyber 安全护栏错误拦截，影响真实安全响应工作流。
   🔗 https://github.com/anthropics/claude-code/issues/71208

5. **AUP 误报：删除 Claude 自身记忆文件被安全策略阻止**
   #71333 ｜ 清理本地项目目录中 Claude Code 自己的会话记忆/history 文件，这一纯本地文件操作被 cyber  safeguard 误判为可疑行为。
   🔗 https://github.com/anthropics/claude-code/issues/71333

6. **AUP 误报：CSP nonce 中间件与 404 路由修复被中断**
   #71309 ｜ 实施 CSP（内容安全策略）nonce 配置和 API 404 调试等标准 Web 安全加固任务时，Opus 4.8 的护栏误触发生成 AUP 阻断。
   🔗 https://github.com/anthropics/claude-code/issues/71309

7. **AUP 误报：预测市场订单脚本被 cyber 护栏错误标记**
   #71404 ｜ 普通应用层调用（公开市场接口下单）被识别为 cyber 相关操作，触发安全误报，且多条同类问题在同一天集中提交。
   🔗 https://github.com/anthropics/claude-code/issues/71404

8. **桌面会话 PR 选择器显示无法刷新的陈旧 PR 卡片**
   #71326 ｜ 桌面应用的 PR picker 将 PR 状态冻结在会话开始时刻，已合并/关闭的 PR 卡片无法移除或刷新，且存在数据丢失风险。
   🔗 https://github.com/anthropics/claude-code/issues/71326

9. **中文（简体）本地化 / i18n 支持缺失**
   #64472 ｜ 社区长期诉求：CLI 提示、错误信息、`--help` 输出均仅有英文界面，中文用户每次都需要进行心理翻译，期望官方提供简体中文界面。
   🔗 https://github.com/anthropics/claude-code/issues/64472

10. **`design` 命令文档缺失**
    #69471 ｜ 官方 CLI 指南中找不到 `design` 命令的使用文档，与 Claude Design 入门文章链接不一致，影响功能发现与使用。
    🔗 https://github.com/anthropics/claude-code/issues/69471

---

## 重要 PR 进展

当日仓库仅有 1 个 PR 更新：

### hookify 插件：从祖先 .claude 目录加载规则，防止静默绕过
#85716 ｜ OPEN ｜ 作者：alifakbxr

- **修复目标**：`plugins/hookify/core/config_loader.py`
- **背景**：此前 hookify 插件在加载配置时存在静默失败模式，可能让安全相关的规则（hook）被绕过——例如当配置只存在于上级目录时未被加载。
- **变更内容**：改为从祖先 `.claude` 目录递归加载规则，确保项目子目录下运行时不会因配置缺失而静默失去安全检查。
- **环境**：跨平台（Linux/macOS/Windows），Python 3.10+。

🔗 https://github.com/anthropics/claude-code/pull/85716

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

- **AUP 安全拦截的精准度**（最突出）：大量 Linux 用户遭遇安全策略误报，涉及安全审计、Web 开发、IAM 运维等**正常开发场景**，暴露出当前护栏对“安全相关但不违规”的任务判断过严。
- **订阅与功能权限一致性**：登录令牌过期后 feature flags 求值逻辑引发 Max 用户被错误引导开启用量额度，说明订阅状态与会话生命周期管理需要更紧密的耦合。
- **桌面端体验与 MCP 行为收敛**：Computer Use 禁用后仍注入 MCP 服务器，表明桌面应用对用户设置的遵从存在缺陷；PR 选择器缓存与刷新机制也需优化。
- **国际化（i18n）支持**：简体中文本地化需求仍有持续呼声，尤其面向中文开发者群体的 CLI 界面与文档。
- **文档完整性**：`design` 等命令缺少官方文档索引，开发者希望所有 CLI 命令都有对应的 guide 支撑。

---

## 开发者关注点

- **安全策略误报成高频痛点**：当日 Issue 列表中近半数来自同一位 Linux 用户（sworrl）提交的 AUP 误报，覆盖“删除本地文件被拦截”“安全审计被中断”“无意义键盘输入触发护栏”等极端场景，开发者对护栏的“一刀切”判断表达明显不满。
- **护栏影响真实生产工作**：多起案例发生在生产环境故障修复或安全事件响应过程中，误拦截直接**阻碍了恢复与审计工作**，开发者呼吁对“防御性安全任务”给出明确豁免通道。
- **桌面端设置可信度受损**：在 UI 上关闭 Computer Use 后仍被注入相关工具，引发对桌面应用“设置项是否真的生效”的信任危机。
- **文档与指引滞后**：命令文档缺失、错误信息无本地化等问题，降低了工具的可发现性与使用效率。
- **社区行动趋势**：由于 AUP 误报问题集中爆发，部分用户已开始提交“绕过策略自动恢复”的配置技能（如 #71393），这可能反过来增加安全风险——官方需尽快校准模型护栏并给出更透明的拦截原因与申诉路径。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-11

## 今日速览

今日发布 0.147.0-alpha.6.6 补丁版本。社区讨论热度集中在 Windows 平台问题：Computer Use 功能多项故障（EPERM、ACL 权限失败、node_repl 上下文复用错误）以及沙箱内 Git HTTPS 操作失败持续引发关注；与此同时，Projects 排序失效（39 👍）与每周限额消耗异常（14 👍）是开发者反馈最强烈的两个功能性缺陷。PR 方面以工具链内部重构和稳定性优化为主。

## 版本发布

**rust-v0.147.0-alpha.6.6** — 发布 0.147.0-alpha.6.6，未附带变更日志。此前版本为 0.147.0-alpha.6.5（含 Computer Use 插件）。链接：[Release](https://github.com/openai/codex/releases)

## 社区热点 Issues（10 个）

1. **[#14297] 新版 Codex App 回复前总是执行 5 次 Reconnecting 才回答** — [Closed] 54 条评论
  用户报告新版 Codex App 在每次回复前反复出现 5 次 "Reconnecting..."，旧版本无此问题。该 Issue 虽然创建已久但今日仍有更新，评论数高居榜首，说明影响范围较大且至今未有明确结论。[链接](https://github.com/openai/codex/issues/14297)

2. **[#31836] Projects 按 Last updated 排序无效** — 41 条评论，39 👍
  在 macOS 桌面端 Projects 视图中，`Sort By: Last updated` 选项不生效，仅对项目组内任务排序而不对项目本身排序。这是目前社区支持度最高的未解决问题之一。[链接](https://github.com/openai/codex/issues/31836)

3. **[#33685] 周限额消耗速度与旧的 5 小时限额一样快** — 26 条评论，14 👍
  用户反馈在 GPT-5.5 High 的正常使用模式下，每周限额的消耗速度与之前 5 小时限额几乎相同，疑似限额计费逻辑存在回归。该问题影响所有依赖订阅额度的日常用户。[链接](https://github.com/openai/codex/issues/33685)

4. **[#21211] 线程导航/加载因无界元数据和大历史 hydration 变慢** — 24 条评论
  线程标题被完整首条消息填充导致 SQLite 线程列表膨胀，同时大历史记录加载时性能严重退化。根因指向线程元数据无限制增长，影响长会话用户。[链接](https://github.com/openai/codex/issues/21211)

5. **[#37013] Windows Computer Use 跨 JS 调用复用过期 node_repl 上下文** — 21 条评论，4 👍
  Windows 桌面端 Computer Use 在首次 JS 执行完成后，后续调用因复用过期 `@oai/sky` helper transport 而失败。属于 Windows 端 Computer Use 的核心阻塞问题。[链接](https://github.com/openai/codex/issues/37013)

6. **[#31073] Windows 沙箱内 Git HTTPS 远程操作失败** — 17 条评论
  在 Codex 原生 Windows 沙箱中，Git HTTPS 远程命令（如 push/pull/clone）失败或崩溃，但同样的命令在普通 PowerShell 中正常工作。本地 Git 操作不受影响，问题特定于远程 HTTPS 操作。[链接](https://github.com/openai/codex/issues/31073)

7. **[#29908] apply_patch/managed sandbox 在 Ubuntu 24.04 上遇 Bubblewrap 错误** — 15 条评论
  Bubblewrap 0.9.0 在 Ubuntu 24.04（内核 6.17）上报 loopback/userns 错误，导致 `apply_patch` 和受管沙箱命令无法运行。影响 Linux 平台的基础工具链。[链接](https://github.com/openai/codex/issues/29908)

8. **[#37415] Windows Computer Use spawn EPERM，WindowsApps ACL 导致沙箱提升失败** — 10 条评论，4 👍
  在 Windows 上启动 Computer Use 时遭遇 `spawn EPERM`，原因是沙箱提升过程受 WindowsApps 目录 ACL 限制。这是 Windows Computer Use 不可用的又一独立根因。[链接](https://github.com/openai/codex/issues/37415)

9. **[#37403] macOS 桌面端无法恢复 Remote Control/CLI 线程，报 `already has an active writer`** — 9 条评论，7 👍
  最新更新后，macOS 桌面端无法恢复通过移动端 Remote Control 发起的 CLI 线程。影响移动端与桌面端协同工作流。[链接](https://github.com/openai/codex/issues/37403)

10. **[#33307] 粘贴代码被自动转换为富文本格式** — 3 条评论，16 👍
  在编辑器中粘贴如 `__init__` 会被自动格式化为斜体 `init`，破坏代码粘贴的准确性。虽然评论数不多但 👍 数高，反映该问题影响面广且社区期待快速修复。[链接](https://github.com/openai/codex/issues/33307)

## 重要 PR 进展（10 个）

1. **[#37979] Honor per-directory bundled skill settings in `skills/list`** — 已合并
  修复 `skills/list` 在加载多个工作目录时未正确应用各目录不同 `skills.bundled.enabled` 配置的问题。[链接](https://github.com/openai/codex/pull/37979)

2. **[#37970] Cache tool catalogs for streamable HTTP MCP servers** — 已合并
  为流式 HTTP MCP 服务器增加进程级工具目录缓存，子代理可直接使用已知工具定义而无需提前建立连接，减少延迟和连接开销。[链接](https://github.com/openai/codex/pull/37970)

3. **[#37939] Validate images before returning `view_image` output** — 已合并
  在 `view_image` 工具输出前拒绝无效或不支持的图像数据，防止非图像文件内容通过 code mode 泄露；保留有效图像字节和元数据。[链接](https://github.com/openai/codex/pull/37939)

4. **[#37929] Add shared runtime build information** — 已合并
  新增 `codex-build-info` 以从 `codex-package.json` 解析打包运行时的语义版本，同时保留可执行文件中写入的 commit 信息。[链接](https://github.com/openai/codex/pull/37929)

5. **[#37908] Apply refreshed cloud config bundles to later sessions** — 已合并
  修复后台刷新云配置仅更新磁盘缓存、同进程新会话仍使用启动时快照的问题，使共享配置包在后续会话中即时生效。[链接](https://github.com/openai/codex/pull/37908)

6. **[#37906] Make gRPC code-mode notifications fire-and-forget** — 已合并
  gRPC code-mode 中通知事件不再等待客户端确认，避免未确认通知阻塞 cell 完成；保留通知确认 RPC 作为兼容性 no-op。[链接](https://github.com/openai/codex/pull/37906)

7. **[#37926] Distinguish turn-start thread persistence** — 已合并
  在线程存储持久化契约中新增 `PersistContext`，使存储层能识别模型采样前的立即持久化请求（`TurnStart`），并支持后台排队处理。优化线程可靠性。[链接](https://github.com/openai/codex/pull/37926)

8. **[#37896] Add hermetic Windows SDK and MSVC runtime repositories** — 已合并
  为 Windows SDK 和 MSVC runtime 添加固定版本仓库（x64/arm64），要求通过 `--repo_env=BAZEL_MSVC_RUNTIME_VISUAL_STUDIO_EULA=1` 明确接受许可。改善 Windows 构建可复现性。[链接](https://github.com/openai/codex/pull/37896)

9. **[#37895] Add configurable Responses API request metadata** — 已合并
  新增 `responses_api_metadata` 配置，用于在每个 Responses API turn（含父请求与子代理请求）中注入产品自有键值元数据，限制 16 条、键为 ≤64 字符 ASCII 标识符。[链接](https://github.com/openai/codex/pull/37895)

10. **[#37889] Ignore Unix socket proxy settings on Windows** — 已合并
  修复 Windows 上配置 Unix socket 代理权限导致 Windows 代理监听器被限制到 loopback 并产生警告的问题；Windows 运行时设置现在会排除 Unix socket 权限。[链接](https://github.com/openai/codex/pull/37889)

## 功能需求趋势

从近期 Issues 和 PR 可以提炼出以下社区关注方向：

- **Windows 平台完善**：当前最集中的诉求领域。包括 Computer Use 在 Windows 上的可用性（多个独立 bug 阻塞）、原生沙箱与 Git 集成（HTTPS 失败）、WSL/集成终端稳定性、Windows SDK/MSVC 构建支持。多个相关 PR 正在推进修复。
- **Remote/移动端能力增强**：用户希望在 Codex Remote 中上传任意文件（不只图片）、恢复被移除的麦克风听写功能、修复移动端旧聊天无法打开的问题。移动端与桌面端的无缝衔接是高频诉求。
- **会话/线程管理与性能**：线程排序、元数据膨胀导致加载变慢、子代理无法可靠关闭与累积、上下文压缩失败导致任务状态丢失等，反映长会话场景下的稳定性不足。
- **速率限制与配额透明化**：周限额消耗异常、不同组织间配额互相影响（#37948）、限额耗尽与上下文压缩结合导致用量浪费，社区对限额计算逻辑和配额隔离机制持续关注。
- **模型/端点兼容性**：自定义 `model_provider` 端点下 Browser/Computer Use 插件不可用、`tool_search` 在非原生 API 端点上报错（Ollama/Bifrost）、超大数据工具集处理不稳定，社区需要更强的自定义部署支持。

## 开发者关注点

- **Windows 沙箱是最大痛点**：Git HTTPS 在沙箱内不可用、Computer Use 多个流程因 Windows 特殊权限模型（WindowsApps ACL、EPERM）失败、WSL 集成终端静默关闭。Windows 开发者对原生沙箱稳定性的负面反馈集中。
- **限额消耗归因不透明**：多个开发者报告“没有用重模式但限额快速耗尽”，且上下文压缩失败会重复执行已完成工作进一步消耗额度——这一问题叠加了可靠性缺陷与资费敏感。
- **WebSocket/连接可靠性**：桌面端反复 Reconnecting（#14297）、CLI 在 WebSocket 降级到 HTTPS 后断连（#37661），连接层不稳定影响核心使用体验。
- **自定义工具链兼容性**：第三方模型端点下 MCP 工具发现机制失效、`view_image` 泄露非图像文件内容、大量 MCP 工具（>100）时的动态工具搜索在非原生 API 上不可用——对自托管和异构部署用户影响明显。
- **粘贴与输入体验**：代码粘贴被富文本化（`__init__` 变斜体）是看似小但影响高频操作的问题，社区支持度高（16 👍），属于低优先级但高感知度的体验缺陷。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，这是 2026-08-11 的 Gemini CLI 社区动态日报。

---

## 今日速览

今日发布 v0.56.0-nightly 版本，修复了 MCP OAuth 令牌刷新时未使用存储 client ID 的问题。社区方面，关于 **usage limit 误报** 的 Issue（#28761）在短时间内获得 15 个 👍，成为今日焦点；同时，多个 P1 级 Agent 稳定性问题（Subagent 挂起、误报成功）仍在持续发酵，开发者对 Agent 执行可靠性的诉求强烈。

## 版本发布

- **v0.56.0-nightly.20260811.geef19f25c** ([查看详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260811.geef19f25c))
  - 核心修复：refresh MCP OAuth tokens 时使用存储的 client ID（提交者 @ParthivNaresh，首次贡献）。
  - 完整变更日志需查看 Release 页面。

## 社区热点 Issues

1. **[#28761] [Bug] 用量远未达上限却提示 Usage limit reached** ([链接](https://github.com/google-gemini/gemini-cli/issues/28761))
   - **重要度**：P1，15 👍（今日最高）。用户反馈内置用量显示仅 1–8%，但 CLI 反复报错“Usage limit reached for gemini-3.5-flash”。
   - **社区反应**：影响面广、优先级高，涉及配额判定逻辑与展示不一致的核心体验问题。

2. **[#22323] [Bug] Subagent 达到 MAX_TURNS 被误报为 GOAL 成功** ([链接](https://github.com/google-gemini/gemini-cli/issues/22323))
   - **重要度**：P1，12 条评论。Subagent 在未开展分析时即因 MAX_TURNS 中止，却返回 `status: success`，严重掩盖真实失败原因。
   - **社区反应**：维护者已标记 need-retesting，该问题直接影响自动化任务的可信度。

3. **[#21409] [Bug] Generalist agent 执行时无限挂起** ([链接](https://github.com/google-gemini/gemini-cli/issues/21409))
   - **重要度**：P1，8 👍 / 8 条评论。创建文件夹等简单操作触发 generalist agent 后长时间无响应（用户等待达 1 小时）。
   - **社区反应**：反馈已久仍未解决，开发者普遍建议通过提示词禁用 subagent 绕过。

4. **[#25166] [Bug] Shell 命令执行完成后卡在 “Waiting input”** ([链接](https://github.com/google-gemini/gemini-cli/issues/25166))
   - **重要度**：P1，3 👍。简单 CLI 命令结束后界面仍显示等待输入，导致流程无法继续。
   - **社区反应**：核心交互阻塞类问题，影响日常自动化操作效率。

5. **[#21983] [Bug] Browser subagent 在 Wayland 环境下失败** ([链接](https://github.com/google-gemini/gemini-cli/issues/21983))
   - **重要度**：P1。Wayland 图形环境下浏览器子代理无法正常运行，影响 Linux 桌面用户。
   - **社区反应**：平台兼容性问题，已被维护者复现并标记 need-retesting。

6. **[#26522] [Bug] Auto Memory 无限重试低价值会话** ([链接](https://github.com/google-gemini/gemini-cli/issues/26522))
   - **重要度**：P2。后台提取代理仅当 `read_file` 成功才标记会话已处理；对低信号会话反复重试，浪费 token。
   - **社区反应**：属于 Auto Memory 系列问题之一，开发者关注资源消耗优化。

7. **[#26525] [Bug] Auto Memory 缺乏确定性脱敏，日志过多** ([链接](https://github.com/google-gemini/gemini-cli/issues/26525))
   - **重要度**：P2（安全）。敏感内容在进入模型上下文之后才提示脱敏，且服务端日志可能记录技能内容。
   - **社区反应**：安全相关，社区对隐私数据处理的潜在风险表示关注。

8. **[#20079] [Bug] ~/.gemini/agents 下的符号链接 agent 无法识别** ([链接](https://github.com/google-gemini/gemini-cli/issues/20079))
   - **重要度**：P2。开发者希望用 symlink 管理 agent 配置，但 CLI 不会将其识别为有效 agent。
   - **社区反应**：配置灵活性诉求，等待维护者回复（status/need-information）。

9. **[#24246] [Bug] 工具数量超过 128 个时触发 400 错误** ([链接](https://github.com/google-gemini/gemini-cli/issues/24246))
   - **重要度**：P2。大型项目启用多组工具后，请求报 400（实测超 400 个工具时必现）。
   - **社区反应**：已标记需更多信息，影响复杂项目落地，期望优化工具作用域管理。

10. **[#22093] [Bug] 自 v0.33.0 起 Subagent 在禁用状态下仍被执行** ([链接](https://github.com/google-gemini/gemini-cli/issues/22093))
    - **重要度**：P2。配置中 agent 模式已禁用，但 generalist 等子代理仍被自动调用，违反用户预期。
    - **社区反应**：涉及权限边界与配置强制力，用户认为行为“越权”，已加入 retesting 队列。

## 重要 PR 进展

1. **[#28767] [fix] `--resume` 误开新会话文件，且清理逻辑误删真实会话** ([链接](https://github.com/google-gemini/gemini-cli/pull/28767))
   - **说明**：P1。`resolveSessionId` 复用被恢复会话的 ID，导致 `config.initialize()` 新开空聊天，可能污染原会话文件；同时清理逻辑可能误删目标文件。

2. **[#28744] [fix] ACP 路径在恢复会话前勿启动新聊天** ([链接](https://github.com/google-gemini/gemini-cli/pull/28744))
   - **说明**：P1。修复 `loadSession` 中因 `initializeSessionConfig` 提前调用 `config.initialize()` 导致会话文件被“投毒”的问题，但作者指出这只是两处问题之一。

3. **[#28673] [feat] 新增 Gemini 3.6 Flash 与 3.5 Flash-Lite 模型配置** ([链接](https://github.com/google-gemini/gemini-cli/pull/28673))
   - **说明**：P2，L 级变更。为核心包添加新模型的基础定义、thinking/multimodalToolUse 能力、别名和 Code Assist 解析配置，社区期待的新模型支持落地。

4. **[#28546] [fix] 使用 GEMINI_API_KEY 时剥离 Authorization 头** ([链接](https://github.com/google-gemini/gemini-cli/pull/28546))
   - **说明**：P1，安全修复（已关闭/合入）。残留的 `Authorization` 头会导致 Google API 返回 401 UNAUTHENTICATED / ACCESS_TOKEN_TYPE_UNSUPPORTED，此 PR 统一移除冲突头。

5. **[#28581] [fix] 处理 @ 引用时跳过 diff hunk 标记** ([链接](https://github.com/google-gemini/gemini-cli/pull/28581))
   - **说明**：P2，性能优化。避免 diff 中 diff hunk 分隔符被误当作 `@file` 引用，消除两次递归的 workspace 级 glob 搜索，防止大文件 prompt 下 minimatch 堆增长。

6. **[#28764] [fix] vscode-ide-companion：跟踪激活期所有 Disposable** ([链接](https://github.com/google-gemini/gemini-cli/pull/28764))
   - **说明**：P2。修复 `activate()` 中因多余括号导致逗号表达式问题，两个注册项仅保留最后一个 Disposable，影响 `gemini.diff.accept` 等命令的注销与资源回收。

7. **[#28666] [fix] GlobTool：校验所有将被搜索的工作区目录** ([链接](https://github.com/google-gemini/gemini-cli/pull/28666))
   - **说明**：P2。修复 `validateToolParamValues` 与 `execute()` 对 `dir_path` 缺省时作用域判定不一致的问题，防止越权访问未授权目录。

8. **[#28639] [fix] 保护 formatTruncatedToolOutput 免受非正数 maxChars 影响** ([链接](https://github.com/google-gemini/gemini-cli/pull/28639))
   - **说明**：P1。当 `maxChars <= 0` 时，现有逻辑因 `slice` 负数索引导致输出膨胀约 2 倍；现改为直接返回原文并补充回归测试。

9. **[#28660] [fix] SDK：工具参数格式错误时保持 sendStream 存活** ([链接](https://github.com/google-gemini/gemini-cli/pull/28660))
   - **说明**：P2。防御性解析字符串型 SDK 工具参数，将非法 JSON 转为结构化 `functionResponse` 错误，而不是让 `JSON.parse` 异常逃逸导致流中断。

10. **[#28655] [fix] Whisper 模型下载改为失败原子化** ([链接](https://github.com/google-gemini/gemini-cli/pull/28655))
    - **说明**：P2。将下载流写入临时文件，避免中断/失败时在安装路径留下损坏的 `.bin` 文件；此前网络中断或磁盘写满会导致半截模型文件。

## 功能需求趋势

- **Agent/Subagent 可靠性与可控性**（约 18/30 条 Issue 标注 area/agent）：开发者最关心子代理不误报、不挂起、严格遵循配置（如禁用后不得运行）、主动使用 skills、以及在 `/chat share` 和 `/bug` 报告中透出子代理轨迹与上下文。
- **Auto Memory 机制完善**：围绕内存提取（#26522, #26523, #26525）形成系列问题，趋势从“功能可用”转向“资源消耗控制与隐私安全加固”。
- **新模型支持**：PR #28673 显示社区已开始贡献 Gemini 3.6 Flash / 3.5 Flash-Lite 的配置接入，版本跟进诉求强烈。
- **认证与配额体验**：usage limit 误报（#28761）、API Key 认证头冲突（#28546）等，反映多认证方式并存下的状态混乱亟待统一治理。
- **IDE 集成与终端体验**：VS Code 插件资源管理（#28764/#28665）、外部编辑器退出后终端渲染损坏（#24935）、resize 闪烁（#21924）等，说明原生 IDE 与终端环境的使用体验正成为关注重点。

## 开发者关注点

- **高频痛点：任务卡死与假成功**。Generalist 挂起（#21409）、Shell 假死（#25166）、Subagent 超时误报（#22323）等 P1 问题长期存在，直接影响用户信任度。
- **配额与认证的“可见性失真”**。内置配额展示与实际报错不符（#28761），以及 `GEMINI_API_KEY` 下残留 Authorization 头引发的 401，都是认证链路上的“隐形地雷”。
- **配置与文件系统边界情况**。symlink agent 不识别（#20079）、`--resume` 会话文件错乱（#28767）、settings.json 对 Browser Agent 失效（#22267）等，暴露配置系统对特殊场景支持不足。
- **工具调用与数据鲁棒性**。>128 工具报 400（#24246）、diff hunk 被误解析（#28581）、GitHub API 非法 JSON 导致扩展崩溃（#28657/#28663）等，说明复杂输入下的防御性编程仍需加强。

---
*数据来源：github.com/google-gemini/gemini-cli（Issue/PR 更新时间为 2026-08-11）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-11）

## 今日速览

v1.0.79 于昨日发布，新增 sandbox 配置可视化与企业策略支持；然而社区随即报告了 `/config model` 清空 settings.json 的严重回归（#4431），以及用户级模型配置在新会话中不生效（#4434）。代理与模型选择相关的稳定性及规则覆盖问题成为今日讨论焦点。

## 版本发布

**v1.0.79**（2026-08-10 发布）

- `/sandbox` 配置对话框现在会显示 sandbox 设置在 `settings.json` 中的存储位置
- 支持企业 `allow-auto-only` 策略：`/allow-all auto` 可用，而完整的 `allow-all` 仍被阻止
- 允许企业托管的 sandbox 策略强制执行代理 URL，同时凭证…（原文截断）

## 社区热点 Issues

### 1. 企业策略间歇性阻止模型列表获取
[#1595](https://github.com/github/copilot-cli/issues/1595) [OPEN] [area:enterprise, area:models]

企业用户账号显示约 40% 剩余 premium 请求，但 `/models` 命令返回 “access denied by Copilot policy”。该问题持续近半年，已有 29 条评论、11 个赞，是企业环境中影响最广的未解决问题之一。

### 2. Windows 下插件更新失败（VS Code 运行期间）
[#4095](https://github.com/github/copilot-cli/issues/4095) [OPEN] [area:platform-windows, area:plugins]

`copilot plugin update` 在 Windows 上报 `Access is denied (os error 5)`，原因是 Copilot 扩展在 VS Code 中持有了 installed-plugins 目录的 watcher 句柄。该 Issue 获得 13 个赞，是平台相关问题中呼声最高的。

### 3. `/config model` 清空全部设置
[#4431](https://github.com/github/copilot-cli/issues/4431) [CLOSED]

v1.0.79 中，执行 `/config model` 会彻底覆写 `<user>/.copilot/settings.json`，导致所有用户设置丢失。该问题当日创建、当日关闭，但影响严重，社区反应迅速。

### 4. 用户级模型配置对新会话不生效
[#4434](https://github.com/github/copilot-cli/issues/4434) [OPEN] [triage]

与 #4431 密切相关：通过 `/config model` 设置的默认模型，在 `/clear` 或会话界面创建新会话时不会生效，必须退出并重启 CLI 才会加载。这给依赖用户默认模型的工作流带来困扰。

### 5. 长会话中子代理使用已下架模型导致整个会话失败
[#4427](https://github.com/github/copilot-cli/issues/4427) [OPEN] [area:agents, area:models]

在约 2 小时的 autopilot 会话中，主模型为 Opus 5，期间启动 `gemini-3.6-flash` 执行子任务；但该模型随后在服务端被下架，导致主代理后续操作失败、整个会话崩溃。这是长会话稳定性的重要隐患。

### 6. 仓库 AGENT.md 的 `model:` 字段覆盖会话模型
[#4437](https://github.com/github/copilot-cli/issues/4437) [OPEN] [triage]

若仓库包含 Claude-Code 风格的 `.claude/agents/*/AGENT.md` 且声明了 `model:` 字段，Copilot CLI 会将其作为同名自定义代理的默认模型，即使当前会话使用 BYOK 提供商。这造成了仓库配置对用户模型选择的意外越权。

### 7. rubber-duck 的对抗性审查策略可被模型参数绕过
[#4432](https://github.com/github/copilot-cli/issues/4432) [OPEN] [triage]

`rubber-duck` 子代理的存在目的是提供跨模型族的“第二意见”（如 Claude 会话让 GPT 审查）。但其 `task` 工具暴露了可选的 `model` 参数——模型可自行传入该参数，静默覆盖 `complementary` 策略和用户的 `/subagents` 设置，使对抗性审查形同虚设。

### 8. `explore` 工具硬编码模型，忽略自定义/DeepSeek 配置
[#3954](https://github.com/github/copilot-cli/issues/3954) [OPEN] [area:agents, area:models]

代理尝试调用 `explore` 工具时，CLI 无视用户配置的自定义模型端点（如 DeepSeek），强制使用 `gpt-5.4-mini`，导致 BYOK 场景下请求失败。该问题自 6 月起存在，已获 3 个赞，影响范围逐渐扩大。

### 9. 非交互模式（-p）下工具调用批准被静默撤销
[#4433](https://github.com/github/copilot-cli/issues/4433) [CLOSED]

`-p/--prompt` 模式的长会话（约 4-8 分钟、多次工具调用）运行中，所有写类工具调用及部分只读诊断命令开始返回 `Permission denied and could not request permission from user`，且无法恢复。该问题严重阻碍自动化场景。

### 10. 企业 MCP 注册表在 macOS 上被私有 CA 证书阻断
[#4364](https://github.com/github/copilot-cli/issues/4364) [OPEN] [area:enterprise, area:networking, area:mcp]

macOS 上 Copilot CLI 1.0.78 验证企业自定义 MCP 注册表时，rustls 以 Apple 错误 -67901（证书不符合标准）拒绝私有 CA 证书，且 fail-closed 策略导致所有 MCP 服务器不可用。企业环境落地的关键阻塞点。

## 重要 PR 进展

过去 24 小时内仅有 1 个 PR：

**[#4428](https://github.com/github/copilot-cli/pull/4428) [OPEN] Add initial devcontainer configuration**

作者 Pjrich1313 为仓库添加了初始 devcontainer 配置，便于开发者通过容器化环境贡献代码。目前评论为空，尚待维护者审阅。

## 功能需求趋势

- **MCP 配置统一**：[#4429](https://github.com/github/copilot-cli/issues/4429) 请求将 VS Code 与 Copilot CLI 的 MCP 配置 schema 统一为单一 `mcp.json`，减少维护成本。
- **模型选择灵活性**：多个 Issue 反映硬编码模型（#3954）与静默模型覆盖（#4432、#4437）问题，社区强烈期望模型选择规则透明化、可配置化。
- **企业策略细化**：v1.0.79 中 allow-auto-only 支持表明企业对精细策略控制的需求；#1595 和 #4364 进一步凸显企业环境的复杂性需要更多适配。
- **长会话稳定性**：自动化及长时间运行场景增多，社区对会话恢复、模型中途变化、权限持久性提出更高要求。

## 开发者关注点

1. **配置持久化易碎**：`/config model` 直接清空 settings.json（#4431）、用户默认模型不生效（#4434），反映出配置写入/读取链路存在缺陷，影响信任度。
2. **模型选择规则不可预期**：AGENT.md 的 model 字段、rubber-duck 的 model 参数以及 explore 硬编码，均导致实际使用的模型与用户预期不一致。
3. **Windows 平台兼容性**：VS Code 与 CLI 的文件句柄冲突（#4095）和路径引号处理（#4426），让 Windows 用户频繁遭遇报错。
4. **企业网络策略适配不足**：私有 CA 证书、策略间歇性误判、代理强制等企业场景问题，显示 CLI 在企业网络环境中的成熟度仍需提升。

---

*数据来源：[github/copilot-cli](https://github.com/github/copilot-cli) · 时间范围：2026-08-10 至 2026-08-11*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-11

## 今日速览
今日社区主要围绕“跨会话记忆系统”展开集中讨论，两条相关 Issue（#1283、#1478）均指向大项目场景下记忆能力缺失的核心痛点。同时，Windows 路径兼容 Bug（#2600）与规划任务中出现的“验尸”（#2599）成为新的问题反馈。今日无新版本发布，但历史 PR 有批量更新与合并。

## 社区热点 Issues
> 今日 Issue 数量较少（共 5 条），以下全量收录并分析。

### 1. [增强] 记忆系统：跨会话持久上下文 — #1283
- **链接**：[MoonshotAI/kimi-cli Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **作者**：CatKang | 更新：2026-08-11 | 评论：33
- **重要性**：这是社区最热议的功能请求，要求实现 automatic memory（AI 管理笔记）与 manual memory（用户定义指令）的完整记忆能力。33 条评论表明用户对“持久上下文”有极强期望，是大项目开发的关键需求。

### 2. [增强] 能优化记忆层吗？参考文档中未找到相关说明 — #1478
- **链接**：[MoonshotAI/kimi-cli Issue #1478](https://github.com/MoonshotAI/kimi-cli/issues/1478)
- **作者**：hahy36 | 更新：2026-08-11 | 评论：1
- **重要性**：该 Issue 以用户痛苦经历为切入点，直接抱怨“大项目很痛苦”，并援引其他工具的记忆机制作为参考，反映出文档缺失与功能不完善的双重痛点，与 #1283 形成高优先级需求信号。

### 3. [增强] Web 端：对 AI 响应任意位置进行引用与回复 — #2601
- **链接**：[MoonshotAI/kimi-cli Issue #2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)
- **作者**：topit | 更新：2026-08-11 | 评论：0
- **重要性**：该请求针对 Kimi Web（而非 CLI）提出交互增强，支持用户在 AI 回复的任意文本片段上附加评论或追问。若实现，将直接提升代码审查与方案解读场景的操作精度。

### 4. [Bug] Windows PowerShell 7 默认 D 盘启动时找不到路径 — #2600
- **链接**：[MoonshotAI/kimi-cli Issue #2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)
- **作者**：RooKichenn | 更新：2026-08-11 | 评论：0
- **重要性**：明确的环境兼容性 Bug，影响 Windows 下使用 PowerShell 7 且自定义启动目录的用户。问题描述清晰（Kimi Code 0.33，从 D 盘启动失败），且与工作流强相关，应尽快跟进。

### 5. [Bug] CLI 规划任务出现“验尸”字样，令人困惑 — #2599
- **链接**：[MoonshotAI/kimi-cli Issue #2599](https://github.com/MoonshotAI/kimi-cli/issues/2599)
- **作者**：KING0177 | 更新：2026-08-11 | 评论：0
- **重要性**：用户在使用 kimi k3 模型规划任务时，todo 中出现了“Autopsy（验尸）”一词，属于非预期且具有负面联想的 UI 文案。该问题虽不涉及功能逻辑，但会显著影响用户体验与信任感，建议核查任务生成模板或模型提示词。

## 重要 PR 进展
> 今日共 7 个 PR 更新，全部为合并/关闭状态，以下全量收录。

### 1. fix(acp): 用 RuntimeError 替代 assert 语句 — #2057
- **链接**：[MoonshotAI/kimi-cli PR #2057](https://github.com/MoonshotAI/kimi-cli/pull/2057)
- **功能/修复**：将 `acp/session.py` 中 5 个 `assert` 替换为标准异常。避免 Python `-O` 优化模式下断言被剥离导致的安全校验缺失，提升生产环境健壮性。

### 2. fix(wire): 消除 WireFile.append_record 的 TOCTOU 竞态 — #2056
- **链接**：[MoonshotAI/kimi-cli PR #2056](https://github.com/MoonshotAI/kimi-cli/pull/2056)
- **功能/修复**：修复文件存在性检查与状态读取之间的时间窗口竞态，防止文件被并发删除时引发未处理异常。

### 3. fix(agentspec): 用 AgentSpecError 替代 assert — #2055
- **链接**：[MoonshotAI/kimi-cli PR #2055](https://github.com/MoonshotAI/kimi-cli/pull/2055)
- **功能/修复**：将 `agentspec.py` 中的断言控制流替换为显式异常，避免 `-O` 优化导致安全检查静默失效。

### 4. 修复文件工具与 UI 反馈的次要 Bug — #1328
- **链接**：[MoonshotAI/kimi-cli PR #1328](https://github.com/MoonshotAI/kimi-cli/pull/1328)
- **功能/修复**：修复 `StrReplaceFile` 多次编辑时替换计数计算错误，及其他 UI 反馈问题，提升文件操作正确性与交互体验。

### 5. fix(pyinstaller): 过滤不存在的 dateparser 缓存文件 — #1082
- **链接**：[MoonshotAI/kimi-cli PR #1082](https://github.com/MoonshotAI/kimi-cli/pull/1082)
- **功能/修复**：修复 PyInstaller 打包时因 `dateparser_tz_cache.pkl` 未生成（懒加载）导致的收集失败，解决 CI 环境构建报错。

### 6. fix: 移除 WriteFile 工具中冗余的 mode 验证 — #1077
- **链接**：[MoonshotAI/kimi-cli PR #1077](https://github.com/MoonshotAI/kimi-cli/pull/1077)
- **功能/修复**：删除 `write.py` 中对 `mode` 参数重复且冗余的运行时校验（已有 schema 约束），简化代码逻辑。

### 7. fix(acp): 通过终端参数路由 shell 命令 — #1393
- **链接**：[MoonshotAI/kimi-cli PR #1393](https://github.com/MoonshotAI/kimi-cli/pull/1393)
- **作者**：hanhan3344
- **功能/修复**：调整 ACP Shell 执行方式，将 shell 可执行文件放入 `command`、调用参数放入 `args`，并适配当前 ACP SDK 的 `terminal_id` 返回结构，新增 Bash 与 PowerShell 的回归测试。

## 功能需求趋势
从今日 Issue 中可提炼出社区最关注的功能方向：

- **跨会话记忆系统（最高优先级）**：两条 Issue（#1283、#1478）直接指向“记忆层”，要求实现自动与手动双通道的持久上下文能力。这已成为大项目开发者的核心痛点，预计后续会持续发酵，官方可能加速该功能的规划。
- **Web 端交互增强**：#2601 请求对 AI 响应进行“选中即评论”的交互，体现用户对更细粒度、上下文相关的操作追求，与编辑器内评论模式高度一致。
- **环境兼容性与可预期性**：#2600（Windows 路径）与 #2599（意外文案）虽为 Bug，但暴露了工具在异构环境和工作流中的稳定性问题，用户对“可预测行为”的要求正在提升。

## 开发者关注点
- **大项目记忆缺失之痛**：多位开发者表示没有记忆系统时，在大型项目中需反复向 AI 重复上下文，切换会话后一切归零，导致效率骤降、体验痛苦。
- **文档缺失**：用户明确反馈“参考文档未找到记忆相关内容”，说明新特性或预期功能缺少配套说明，加大使用门槛。
- **Windows 特定路径问题**：PowerShell 7 默认从非系统盘启动时，Kimi Code 路径解析失败，这直接影响 Windows 开发者日常使用，且可能与当前工作目录处理逻辑相关。
- **UI 文案信任感**：规划任务中出现“Autopsy（验尸）”这类令人不适的词汇，虽不构成功能性 Bug，但会严重影响用户对工具的专业性与安全感的判断，需要官方注意生成内容的审核与本地化。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**2026-08-11**


## 今日速览

今日社区焦点集中在 **provider 流中断静默失败**（#37852，获 55 👍）与 **OpenCode Go 网关对 deepseek-v4-flash 模型名前导空格校验错误** 两件事上；同时，多名用户反馈 **Go/Zen 订阅配额在无警告情况下被快速耗尽、模型禁用开关不生效** 的计费与网关一致性问题。PR 方面迎来一波质量修复：会话重试上限、Windows 路径规范化、长会话 fork 加速与 TUI 选择复制 bug 均有对应 PR 提交。


## 社区热点 Issues

**1. Provider 流中断被静默记录为正常完成（零 token、零文本、无报错）**
· 评论 18 · 👍 55 · [Issue #37852](https://github.com/anomalyco/opencode/issues/37852)
> 创建于 2026-07-20，持续高热。Provider 流在中途终止且无 finish reason 或 usage 数据时，assistant 消息以 `finish=unknown`、零 token、无文本形式写入，循环正常退出且无任何日志。对于 subagent 调用表现为"空返回、无错误"，排查困难。社区反应强烈，是当前稳定性方向最紧迫的 issue。

**2. OpenAI 兼容接口 `server_is_overloaded` 错误不重试**
· 评论 14 · 👍 11 · [Issue #25884](https://github.com/anomalyco/opencode/issues/25884)
> 长驻问题（自 2026-05）。当 OpenAI 兼容流返回 `server_is_overloaded` 瞬时错误时不进行重试，导致用户需要手动重新请求，影响自动化流程。与 #37852 同属 provider 可靠性问题域。

**3. 长时运行 shell 命令（如 Gradle 构建）在 "BUILD SUCCESSFUL" 后仍挂起**
· 评论 12 · 👍 9 · [Issue #25038](https://github.com/anomalyco/opencode/issues/25038)
> Android Gradle 构建等长命令在成功输出后进程仍不退出，阻塞后续对话。构建/开发场景下高频复现，社区期望引入智能超时或后台运行机制（相关 PR #40005 已提交）。

**4. deepseek-v4-flash 模型名前导空格导致 400 错误**
· 评论 7 · [Issue #41300](https://github.com/anomalyco/opencode/issues/41300)（已关闭）
> 创建于 08-08，已关闭但仍具参考价值：Console Go 网关校验模型名时发现请求中带有前导空格（" deepseek-v4-flash"），`/model` 配置与网关转发之间存在 trim 缺失。同批问题还包括 #41306、#41322，形成系列事件。

**5. Go Plan 免费模型拥塞 + 配额静默耗尽，45 分钟烧掉 $12 且零输出**
· 评论 2 · [Issue #41684](https://github.com/anomalyco/opencode/issues/41684)
> 新增 issue。big-pickle 免费模型拥塞导致请求反复失败，同时配额耗尽无任何 UI 警告，用户毫无感知地持续消耗计费额度。计费透明度问题引发关注。

**6. Zen 模型禁用开关未在网关生效，Codex 持续调用并产生费用**
· 评论 3 · [Issue #41697](https://github.com/anomalyco/opencode/issues/41697)
> 新增 issue。Zen 订阅用户在网关层关闭某模型后，Codex 等外部客户端仍可绕过开关继续调用该模型并产生账单，表明模型禁用仅作用于本地 UI 而非服务端强制。

**7. PowerShell 非 ASCII 字符输出乱码（Windows）**
· 评论 14 · 👍 2 · [Issue #23636](https://github.com/anomalyco/opencode/issues/23636)
> Windows 中文/日文/韩文 locale 下，bash 工具执行 PowerShell 命令时 `[Console]::OutputEncoding` 默认为系统编码（如 GB2312），导致中文文件名等输出乱码。Windows 用户长期痛点。

**8. SessionRetry.policy() 无限重试，无最大次数与总时长上限**
· 评论 6 · [Issue #21960](https://github.com/anomalyco/opencode/issues/21960)
> `packages/opencode/src/session/retry.ts` 对 429/529/overloaded 错误无限重试，无上限。今日已有对应 PR #41699 提交修复（见下文）。

**9. 功能请求：保存 prompts 与 threads，支持按主题/书签管理**
· 评论 5 · [Issue #24017](https://github.com/anomalyco/opencode/issues/24017)
> 用户希望会话与 prompt 可持久保存、按主题分类、加书签，便于长期工作流沉淀。会话管理方向持续有呼声。

**10. Windows Desktop sidecar 崩溃，exitCode -2147483645，随后 "Failed to fetch"**
· 评论 2 · [Issue #41714](https://github.com/anomalyco/opencode/issues/41714)
> 新增 issue。Desktop 启动后短暂运行，`opencode server` sidecar 崩溃导致 UI 报 `Failed to fetch`，1.18.15 与 1.18.16 均可复现。Windows 稳定性问题之一。

> 其他值得留意的 issue：[#41694 Desktop 无法打开 Sublime Text（Windows）](https://github.com/anomalyco/opencode/issues/41694)、[#41655 嵌入浏览器的 TUI 滚动失效](https://github.com/anomalyco/opencode/issues/41655)、[#40572 Electron 渲染进程冻结（Solid.js 响应式循环）](https://github.com/anomalyco/opencode/issues/40572)、[#40399 Web UI 项目会话因路径大小写不匹配而列表为空](https://github.com/anomalyco/opencode/issues/40399)。


## 重要 PR 进展

**1. [fix(session)] 设置会话重试上限，支持可配置 retry/backoffDelay**
· [PR #41699](https://github.com/anomalyco/opencode/pull/41699)
> 直接修复 #21960。为 `SessionRetry.policy()` 增加 attempt cap，并允许通过配置自定义重试次数与退避延迟，避免无限重试拖垮会话。

**2. [fix] 规范化 Windows 反斜杠路径，修复文件树自动刷新**
· [PR #41704](https://github.com/anomalyco/opencode/pull/41704)
> `path.normalize()` 保留反斜杠，而 tree-store 与 watcher 按 `/` 分割，导致 AI 编辑后 Windows 上文件树与查看器不自动刷新。修复 `path.ts` 并统一路径格式。

**3. [fix(opencode)] 加速长会话 fork**
· [PR #41701](https://github.com/anomalyco/opencode/pull/41701)
> fork 超长会话时采用有序持久化批次 + 3,000 事件分块投影，大幅缩短 fork 等待时间。对应 issue #41698。

**4. [fix(app)] 处理无标题会话 tab 信息**
· [PR #41700](https://github.com/anomalyco/opencode/pull/41700)
> 新 V2 会话无标题时 tab 元数据比对崩溃的问题。修复 tab-info 相等性检查，并移除遗留调试日志。

**5. [fix(tui)] 防止侧边栏选择复制串扰**
· [PR #41713](https://github.com/anomalyco/opencode/pull/41713)
> 修复 TUI 中选中对话文本时，右侧 Context 侧边栏内容被一并复制的问题。对应 issue #41692。

**6. [fix(provider)] 尊重 attachment image capability**
· [PR #41527](https://github.com/anomalyco/opencode/pull/41527)
> 自定义 provider 配置了 `attachment: true` 但未声明 `modalities` 时，仍被标记为不支持图片输入。此 PR 使其按配置接受图片附件，修复 #33542。

**7. [fix(app)] 非安全 HTTP 上下文下的 blob ID 生成降级**
· [PR #41710](https://github.com/anomalyco/opencode/pull/41710)
> 远程服务器 IP（非 HTTPS）下粘贴图片导致崩溃的问题，为非安全上下文提供 blob ID 生成备选方案。对应 issue #41706。

**8. [feat(background)] 长时 shell 命令后台运行，不阻塞对话**
· [PR #40005](https://github.com/anomalyco/opencode/pull/40005)
> 重新提交的 #39978。`gh run watch`、轮询、构建等长命令可转入后台执行，用户可继续对话（配合 Ctrl+B 提示逻辑）。回应了 #25038 一类痛点的核心诉求。

**9. [feat(storage)] 安全数据库维护控制**
· [PR #41711](https://github.com/anomalyco/opencode/pull/41711)
> 基于 #36710（保留原作者 @chubes4 提交），添加数据库安全维护入口，部分解决 #16101，关联 #37495、#34875、#36851、#32093 等多个存储相关 issue。

**10. [feat(opencode)] 长会话空闲恢复后自动压缩**
· [PR #40403](https://github.com/anomalyco/opencode/pull/40403)
> 恢复长时间空闲的会话时自动压缩历史前缀，避免每轮对话重复发送完整上下文，降低 token 成本。

> 另值得关注：[#41716 Docker Bun 贡献者工作流文档](https://github.com/anomalyco/opencode/pull/41716)、[#41695 Termux 一键安装脚本](https://github.com/anomalyco/opencode/pull/41695)、[#13860 GitHub Action 支持 GHES](https://github.com/anomalyco/opencode/pull/13860)、[#37457 高棉语本地化](https://github.com/anomalyco/opencode/pull/37457)、[#39982 失败 shell 命令简洁错误输出](https://github.com/anomalyco/opencode/pull/39982)、[#39990 同一命令反复失败时注入调试循环提示](https://github.com/anomalyco/opencode/pull/39990)、[#39997 未变化文件读取去重（file_unchanged stub）](https://github.com/anomalyco/opencode/pull/39997)。


## 功能需求趋势

1. **Shell 命令执行体验**：长命令挂起、失败输出冗长、后台运行需求集中爆发 —— #25038、#39982、#39990、#40005 形成完整改进链路。社区对构建/测试类长任务的诉求强烈。
2. **会话管理能力**：保存/归档/书签（#24017）、空闲会话自动压缩（#40403）、长会话 fork 性能（#41701），指向"会话生命周期管理"正成为核心需求。
3. **Provider 可靠性与容错**：overload 重试（#25884）、流中断可观测（#37852）、重试上限（#21960/#41699），社区对 provider 故障时的行为可控性要求提高。
4. **跨平台/移动端支持**：Termux 安装（#41695 与 #33010）、GitHub Enterprise Server 支持（#13860），覆盖 Android 与企业内网场景。
5. **本地化与语法高亮**：高棉语字典（#37457）、Odin 语言高亮（#40889），国际化与小众语言支持持续扩展。


## 开发者关注点

1. **Provider 静默失败是最大信任危机**：无文本、零 token、无报错地"正常完成"（#37852），对 agent 自动化工作流是致命的——下游无法区分空结果与故障。
2. **配额/计费透明度不足**：Go plan 用户在 45 分钟内烧掉 $12 且全程无警告（#41684）；Zen 模型禁用开关不生效导致外部客户端持续计费（#41697）。开发者要求网关层强制实施 + 配额预警。
3. **Windows 平台体验仍是短板**：PowerShell 编码乱码（#23636）、反斜杠路径致文件树不刷新（#41704）、desktop sidecar 崩溃（#41714）、Sublime Text 无法打开（#41694）——多个独立 issue 同时出现，平台兼容性修复需求集中。
4. **同一模型问题多 issue 重复提交**：deepseek-v4-flash 前导空格问题以 #41300、#41306、#41322 三个独立 issue 报告并关闭后，仍有人验证 400 错误持续存在（#41306），说明 *Gateway 模型名校验的回归测试需要加强*。
5. **重试策略集中治理**：#21960 无限重试 issue 挂起多月后，今日出现对应修复 PR #41699；配合 #25884 的 overload 重试缺失，社区对 provider 错误分类与重试语义的标准化有明确期待。

---
*本日报基于 GitHub 公开数据自动生成，数据截至 2026-08-11。*


</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

## Pi 社区动态日报（2026-08-11）

### 1. 今日速览

过去 24 小时 Pi 仓库无新 Release，社区讨论集中在 Windows/WSL 运行问题、Copilot 登录限流、长会话性能与 TUI 交互体验上；同时有大量 PR 围绕 WebSocket 重试、DeepSeek 参数映射、自定义技能目录误识别等方向进行修复。另有一个 Windows CMD 下的 P0 级重复输出/内存泄漏问题需要重点关注。

---

### 2. 社区热点 Issues

**#7547 [Windows] [sink-thread] How do you use Pi on windows? What issues are you seeing?**  
开放中 · 25 评论 · 1 👍  
Windows 开发者数量庞大，但 Pi 在 Windows 上的运行方式过多，导致核心团队难以确定优化重点。该 Issue 正在收集 Windows 用户的实际用法和问题，是当前社区讨论最集中的帖子。  
https://github.com/earendil-works/pi/issues/7547

**#6187 [bug] Pi login hangs in WSL after browser-based GitHub Copilot device authorization**  
开放中 · 22 评论  
WSL 中安装 Pi 后，浏览器端 GitHub Copilot 授权已完成，但 WSL 终端里的 Pi 客户端无法检测到授权状态，登录一直挂起。这是 WSL 用户的高频痛点。  
https://github.com/earendil-works/pi/issues/6187

**#5291 [bug] Sessions hang on "working" when used with Anthropic subscription**  
已关闭 · 9 评论 · 3 👍  
配合 Anthropic Enterprise 订阅使用时，会话会同时卡在 `Working...`，打断/恢复有时有效、有时无效。该问题对订阅制用户影响较大。  
https://github.com/earendil-works/pi/issues/5291

**#7730 [bug] High CPU usage on Mac OS with long session**  
开放中 · 9 评论 · 8 👍  
macOS 上运行 Pi 时 CPU 占用可达 50–110%，内存 600–800MB，且与会话长度/上下文大小相关。这是当前性能方向最有代表性的反馈。  
https://github.com/earendil-works/pi/issues/7730

**#7850 [bug, no-action] GitHub Copilot login fails with 429 (Rate Limiting) for organizations with a lot of activated / available models**  
已关闭 · 5 评论 · 6 👍  
GitHub Copilot 组织账号如果启用了 20+ 模型，登录时会触发 `429 Too Many Requests`。对大型组织用户使用 Copilot 构成直接阻碍。  
https://github.com/earendil-works/pi/issues/7850

**#7444 WebSocket retry only handles two error codes; other transient response.failed errors hard-stop the turn**  
已关闭 · 7 评论  
Codex WebSocket 重试逻辑只对 `previous_response_not_found` 和 `websocket_connection_limit_reached` 做重试，其他瞬时 `response.failed` 会直接中断当前 turn。该问题直接催生了今日 PR #7943。  
https://github.com/earendil-works/pi/issues/7444

**#7835 Edit tool rejects a single-object edits argument**  
开放中 · 4 评论  
部分模型会把 edit 工具的 `edits` 参数以单个对象而不是数组形式传入，Edit 工具会直接报错。影响小模型/弱格式遵循模型的稳定性。  
https://github.com/earendil-works/pi/issues/7835

**#7836 Edit fuzzy match misses lines with differences in whitespace length**  
开放中 · 4 评论 · 1 👍  
`normalizeForFuzzyMatch` 没有折叠连续空白或去除行首空白，导致 `oldText` 与实际内容只是空白长度不一致时 fuzzy match 失败。这是编辑工具健壮性问题。  
https://github.com/earendil-works/pi/issues/7836

**#7846 [bug] Unable to start 0.84.0, 0.84.1, with bun runtime**  
开放中 · 3 评论 · 1 👍  
使用 bun 运行时启动 Pi 0.84.0/0.84.1 会崩溃：`zlib.createZstdDecompress is not a function`。这直接阻断 bun 用户升级使用新版本。  
https://github.com/earendil-works/pi/issues/7846

**#7947 [bug, untriaged] 【P0】在 CMD 上运行遇到重复输出、内存泄漏等严重问题**  
已关闭 · 2 评论  
Windows 11 LTSC 的 CMD 中，Pi 写代码时输出大量重复的 `0`，且行数越来越多，Ctrl+C 无法终止，疑似存在严重稳定性/内存泄漏问题。虽然状态已关闭，但 P0 严重度值得跟进。  
https://github.com/earendil-works/pi/issues/7947

---

### 3. 重要 PR 进展

**#7943 fix(ai): retry Codex websocket rate limits**  
关闭 · 引用 #7444  
Codex WebSocket 目前会重试除已知不可重试错误之外的所有 `response.failed`，包括速率限制等瞬时错误，修复 #7444 指出的重试覆盖不足问题。  
https://github.com/earendil-works/pi/pull/7943

**#7948 feat(coding-agent): defer extension runtime reloads**  
开放中  
将扩展上下文中等待式的 `ctx.reload()` 改为 fire-and-forget 的 `ctx.requestReload()`，并对 reload 请求做合并，延迟到扩展操作、compaction、分支摘要完成后执行，提升扩展运行时稳定性。  
https://github.com/earendil-works/pi/pull/7948

**#7950 fix(plan-mode): make progress tracking robust and tolerant**  
开放中  
修复 plan-mode 示例扩展中步骤完成标记必须精确匹配 `[DONE:n]` 的问题。现在会从 `thinking` 等结构读取文本内容，使执行过程中 todo widget 能正确勾选。  
https://github.com/earendil-works/pi/pull/7950

**#7924 fix(coding-agent): ignore docs in custom skill directories**  
关闭  
针对 `settings.skills` / `--skill` 目录下 `README.md`、`AGENTS.md`、`CLAUDE.md` 被误当作 skill 加载的问题，改为只有声明非空 `description` 的 Markdown 文件才作为 skill 候选，避免文档文件产生无意义的 validation warning。  
https://github.com/earendil-works/pi/pull/7924

**#7807 fix(ai): expose low reasoning effort for native DeepSeek V4 Flash**  
关闭  
DeepSeek V4 Flash 原生支持 `low` 推理档位，而 V4 Pro 的 `low` 会映射到 `high`。此 PR 为 Flash 添加独立映射，避免请求被错误提升档位。  
https://github.com/earendil-works/pi/pull/7807

**#7897 fix(coding-agent): inherit subagent session config**  
关闭  
修复子代理跟随任意会话最后设置的 model/thinking 的问题，改为默认继承当前会话的模型与思考档位配置。  
https://github.com/earendil-works/pi/pull/7897

**#7899 fix(tui): prevent split Alt+Enter from interrupting**  
关闭  
在没有 Kitty Keyboard Protocol 时，Alt+Enter 会拆成 `ESC` + `CR`；如果两个字节间隔超过 10ms，会被误判为 `app.interrupt`，中止当前 turn。此 PR 将转义序列超时提升到 100ms。  
https://github.com/earendil-works/pi/pull/7899

**#7901 feat(ai): AI Gateway transport over the Cloudflare AI binding**  
关闭  
新增基于 Cloudflare Workers AI Gateway binding 的 AI Gateway 传输层，为 Cloudflare 生态用户提供新的接入方式。  
https://github.com/earendil-works/pi/pull/7901

**#7913 feat(tui): add fullscreen transcript search**  
关闭  
为 fullscreen TUI 模式增加 transcript 搜索功能，默认快捷键 `Ctrl+Shift+f`，方便长会话中定位历史内容。  
https://github.com/earendil-works/pi/pull/7913

**#7941 fix(ai): make model max tokens optional**  
关闭  
将 `Model.maxTokens` 设为可选，请求限制按 `options.maxTokens ?? model.maxTokens` 解析；两者都未设置时，在 API 允许的情况下省略 provider 参数，为自定义模型配置提供更大灵活性。  
https://github.com/earendil-works/pi/pull/7941

---

### 4. 功能需求趋势

从今日更新的大量 Issue 中，社区最关注的功能方向集中在以下几个方面：

- **Windows / WSL 支持与稳定性**  
  包括 Windows 运行方式梳理、WSL 登录挂起、CMD 下的严重输出异常等，是当前最集中的用户反馈群体。  
  https://github.com/earendil-works/pi/issues/7547  
  https://github.com/earendil-works/pi/issues/6187  
  https://github.com/earendil-works/pi/issues/7947

- **TUI 交互与终端体验增强**  
  包括 sticky header、fullscreen 下“下方还有内容”的指示器、全文搜索、tmux 内 Kitty 图像透传、OSC 8 超链接可点击、可配置 keybinding 等。  
  https://github.com/earendil-works/pi/issues/7802  
  https://github.com/earendil-works/pi/issues/7908  
  https://github.com/earendil-works/pi/issues/7936  
  https://github.com/earendil-works/pi/issues/7930  
  https://github.com/earendil-works/pi/issues/7939

- **多模型 / 网关 / 提供商兼容性**  
  社区对 OpenRouter 转发 Anthropic 模型、Cloudflare AI Gateway、DeepSeek 原生参数、Copilot 限流等问题非常敏感。  
  https://github.com/earendil-works/pi/issues/7938  
  https://github.com/earendil-works/pi/issues/7896  
  https://github.com/earendil-works/pi/issues/7850

- **扩展与自定义技能体系**  
  自定义 skill 目录中的文档文件被误加载、plan-mode 进度无法更新、扩展热重载时机不当等问题，说明社区正在围绕扩展生态的真实场景打磨稳定性。  
  https://github.com/earendil-works/pi/issues/7805  
  https://github.com/earendil-works/pi/issues/7919  
  https://github.com/earendil-works/pi/pull/7948

- **性能与资源占用**  
  长会话 CPU 飙高、bun 运行时无法启动、CMD 内存泄漏等，反映出终端 AI 工具在长时间运行场景下的性能优化需求。  
  https://github.com/earendil-works/pi/issues/7730  
  https://github.com/earendil-works/pi/issues/7846

---

### 5. 开发者关注点

综合今日 Issue 与 PR，开发者反馈最集中的痛点和高频需求包括：

- **登录与鉴权流程不够可靠**：Copilot 组织账号 429 限流、WSL 中授权状态无法被客户端感知、Anthropic 订阅会话卡在 `Working...`，都是阻塞用户上手的高频问题。
- **长会话性能与资源占用**：macOS 高 CPU、内存持续上涨以及 CMD 下的严重异常输出，说明 Pi 在长时间/大上下文会话中仍需进一步做渲染和会话管理优化。
- **模型输出容错性不足**：Edit 工具对单个对象参数、空白差异、JSON 字符串等模型常见输出形式处理不够宽容，导致小模型用户频繁触发工具错误。
- **协议与兼容性细节待完善**：包括 WebSocket 重试覆盖不足、wire protocol 中 `usage` 字段丢失、JSONL session 版本不一致、OpenRouter 转发 Anthropic 时 `cache_control` 被错误附加等。
- **可配置性与扩展边界需要更清晰**：开发者希望 keybinding 不被硬编码、自定义 skill 目录不被文档文件污染、扩展 reload 能避开操作繁忙期，这些都需要更稳定的扩展框架支持。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-11** | **数据来源：github.com/QwenLM/qwen-code**

---

## 1. 今日速览

今日最核心的进展是 **v0.21.9 正式版发布**，新增了 Qoder 插件原生安装能力和 Local Control 二维码配对，标志着插件生态与移动端协同进入新阶段。社区层面，**会话管理与 daemon 架构**是绝对焦点，多个 P1/P2 级问题涉及会话恢复超时、ACP 子进程内存分配和独立会话能力。此外，三个平台体验类 Bug（Windows 文件链接、macOS iTerm 闪屏、语音听写权限）引发较多讨论。

---

## 2. 版本发布

### v0.21.9（正式版）
- **Qoder 插件支持**：新增从本地目录、归档、Git 仓库、URL 和 npm 包安装 Qoder 插件的原生能力，并支持自动加载系统提示（[#8661](https://github.com/QwenLM/qwen-code/pull/8661)）。
- **Local Control 配对**：通过二维码实现 Local Control 配对。

### v0.21.9-nightly.20260811.8c90697ace
- 测试改进：覆盖上下文刷新标记的跨轮次承接场景（[#8809](https://github.com/QwenLM/qwen-code/pull/8809)）。

### live-host-v0.1.1（桌面端）
- **CLI 修复**：选择沙箱运行时前先探测其可用性（[#7734](https://github.com/QwenLM/qwen-code/pull/7734)）。
- **Autofix 修复**：序列化扫描与选择流程。

---

## 3. 社区热点 Issues

### 高优先级 / 核心功能
1. **[#8678] 大会话恢复超时时无法保留当前会话**（P1 · 5 评论）  
   会话恢复超时会导致当前会话丢失。已有 PR #8691 解决了超时契约和可观测性部分，但完整修复仍在推进中。这是 P1 问题，直接影响大规模会话的用户体验。  
   https://github.com/QwenLM/qwen-code/issues/8678

2. **[#8920] headless 模式下 OpenAI API 错误被误报为成功**（P2 · 3 评论）  
   使用 `--output-format stream-json` 时，上游 API 错误竟携带 `"is_error":false` 退出码 0，会误导 CI/CD 流水线作出错误判断。属非交互模式的关键正确性问题。  
   https://github.com/QwenLM/qwen-code/issues/8920

3. **[#8182] daemon 向每个 ACP 子进程授权 50% 主机内存**（P2 · 4 评论）  
   `qwen serve` 未按子进程数量划分内存上限，每个 `qwen --acp` 子进程都可能拿到主机一半的 V8 old-space，内存耗尽风险极高。  
   https://github.com/QwenLM/qwen-code/issues/8182

4. **[#8871] ACP 子进程报 "Unknown argument: acp"**（P2 · 4 评论）  
   `qwen serve --http-bridge=true` 派生子进程时传了 `--acp` 参数但子进程无法解析，导致认证失败。serve 与 CLI 的参数协议存在不一致。  
   https://github.com/QwenLM/qwen-code/issues/8871

### 平台与体验类
5. **[#8644] Windows 聊天中点击文件链接失败**（P2 · 4 评论）  
   盘符冒号被 URL 编码为 `%3A`，VS Code 无法打开 `file:///d%3A/...`。Windows 用户高频踩坑，社区呼声很高。  
   https://github.com/QwenLM/qwen-code/issues/8644

6. **[#8901] macOS iTerm 闪屏问题**（P2 · 3 评论）  
   在 iTerm 中选择命令确认后回车必现闪屏，版本 0.21.8。影响 macOS 端交互稳定性。  
   https://github.com/QwenLM/qwen-code/issues/8901

7. **[#8877] 语音听写麦克风权限警告每次启动都出现**（P2 · 3 评论）  
   警告在用户未使用语音时自动弹出，且有时出现两次，属于 macOS 平台上的误报干扰。  
   https://github.com/QwenLM/qwen-code/issues/8877

### 会话与配置
8. **[#8837] ACP 自动调度提示从恢复的转录中丢失**（P2 · 3 评论）  
   ACP 会话恢复后，定时任务触发的 `user_message_chunk` 缺失；该问题与 #8885（rewind 索引错位）相互关联，影响会话连续性。  
   https://github.com/QwenLM/qwen-code/issues/8837

9. **[#8504] 自定义模型保留时 Provider 更新提示循环**（P2 · 4 评论）  
   用户添加自定义模型后，更新成功的提示会反复弹出。属于配置同步逻辑缺陷，已有 PR #8889 在修复中。  
   https://github.com/QwenLM/qwen-code/issues/8504

10. **[#8845] Web Shell Channel 管理与工作区重设计**（feature-request · 4 评论）  
    社区要求 Web Shell 暴露更清晰的 Channel 访问策略、会话隔离和工作区所有权控制，反映了服务端多租户场景的诉求。  
    https://github.com/QwenLM/qwen-code/issues/8845

---

## 4. 重要 PR 进展

### 会话与通道
1. **[#8927] feat(channels): 会话生命周期绑定 sessionRotation**  
   对应 Issue #8926。为每个 Channel 增加 `sessionRotation` 选项，支持按 `maxTurns` 或 `maxAge` 自动切换新会话，防止长驻会话超出上下文窗口。  
   https://github.com/QwenLM/qwen-code/pull/8927

2. **[#8884] fix: 为 SessionNotFoundError 添加结构化错误码**  
   解决会话关闭重试的幂等问题，Web UI 与 Java 客户端均可正确识别“正在关闭中”的状态，避免无效重试。  
   https://github.com/QwenLM/qwen-code/pull/8884

3. **[#8889] fix(core,vscode): 保持 Provider 更新版本同步**  
   修复 #8504：区分“实际安装版本哈希”与“模板刷新哈希”，避免提示循环。  
   https://github.com/QwenLM/qwen-code/pull/8889

### ACP / CLI
4. **[#8782] fix(acp): 发送标准 session_info_update 通知**  
   让不实现 Qwen 扩展的 ACP 客户端也能收到会话标题更新，提升协议兼容性。  
   https://github.com/QwenLM/qwen-code/pull/8782

5. **[#8526] feat(cli): 通过 ACP 暴露推理努力度（reasoning effort）**  
   新增 `thought_level` 选择器（Default/Low/Medium/High/Extra high/Max），并支持通过 `set_config_option` 动态调整。  
   https://github.com/QwenLM/qwen-code/pull/8526

6. **[#8789] fix(cli): 优化重复内联图片渲染**  
   引入 SHA-256 负缓存避免重复解码无效 PNG，同时防止图片数据被 ANSI 转义污染，并让纯图片消息获得完整高度。  
   https://github.com/QwenLM/qwen-code/pull/8789

7. **[#8786] fix(cli): 添加隐私安全的工具结果边界诊断**  
   在 producer、finalizer、recorder、ACP 等多个边界记录工具结果的代码单元/字节数，用于定位超长或变异输出问题，默认不打印敏感内容。  
   https://github.com/QwenLM/qwen-code/pull/8786

### Web Shell / 桌面端
8. **[#8844] fix(web-shell): 保持工作区选择器建议关闭**  
   修复路径建议在输入框失焦后仍弹回的问题，同时让 Browse 操作先释放焦点再打开选择器，消除交互竞态。  
   https://github.com/QwenLM/qwen-code/pull/8844

9. **[#8872] feat(web-shell): 改进思考过程与工具调用展示**  
   复用 Ctrl+O 在 Web Shell 中切换思考内容显隐，并持久化偏好；隐藏思考时，仅由思考分隔的普通工具调用会合并为一个工具组，减少信息噪声。  
   https://github.com/QwenLM/qwen-code/pull/8872

10. **[#8896] fix(desktop): 合并 Live Host 0.1.1 回归问题**  
    统一修复 macOS 包运行时提交证明、麦克风状态机抖动、SSE 正常结束误报“Connection lost”等问题。  
    https://github.com/QwenLM/qwen-code/pull/8896

---

## 5. 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

- **会话生命周期管理（最强诉求）**：包括会话恢复超时保护（#8678）、会话轮换（#8926/#8927）、独立会话（#8908）、rewind 索引对齐（#8885）、自动调度提示持久化（#8837）。社区正推动 daemon 级会话管理走向产品化。
- **Web Shell 与服务端多租户能力**：Channel 策略重设计（#8845）、SSE 重连体验（#8887）、会话导航不打断源会话（#8923）。Web Shell 正从单机工具向多人协同平台演进。
- **上游错误处理与容错**：API 错误被误报成功（#8920）、fail-fast 占位响应检测（#8916）、重复工具调用检测（#8898）。对 OpenAI 兼容端点的健壮性要求显著提高。
- **多代理（Fleet）架构**：监督 teammate 运行时（#8841）已进入“fleet MVP”阶段，依赖多代理的 `sessionRotation` 与独立会话能力，属于路线图中的一脉。
- **资源保护与可观测性**：ACP 子进程内存上限（#8182）、split resource protection 分 PR 交付（#8091）、OpenTelemetry 会话生命周期（#8616），核心诉求是“服务模式下可控、可视”。

---

## 6. 开发者关注点

- **错误报告可信度**：headless/stream-json 模式将错误包装成成功结果，会直接污染自动化链路，这是开发者最敏感的正确性问题之一。
- **Windows 平台体验短板**：文件链接冒号编码 bug 影响日常使用，Windows 用户的工单占比呈上升趋势。
- **内存/资源分配透明度**：daemon 对 ACP 子进程的内存授权策略含糊，导致多子进程环境下 OOM 风险不可预期，开发者希望按实际子进程数动态分配。
- **配置一致性**：`tools.truncateToolOutputThreshold` 配置被硬编码忽略（#8922）、Provider 更新提示循环（#8504），均反映出“配置说了不算”的挫败感。
- **macOS 本地体验细节**：iTerm 闪屏和麦克风权限误报虽非功能性障碍，但高频出现，严重干扰沉浸式编码。
- **CI/CD 自动化健康度**：autofix 与 review-pr 的互相取消形成死循环（#8888），主分支 E2E 持续失败（#8847/#8870），说明自动化流程本身需要引入更严格的故障隔离（见 #8928）。

---

*本日报由技术分析师自动整理，数据截至 2026-08-11 23:59 UTC。*

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-11

> 数据来源：github.com/Hmbown/DeepSeek-TUI（注：当前关联仓库与 Issue/PR 链接均指向 Hmbown/CodeWhale）

## 1. 今日速览

今日社区动态集中在 **CodeWhale TUI 的 crate 分解重构**与**子代理递归深度安全修复**两条主线上：EPIC-005 作为大型追踪 issue 持续汇聚重构进展（#5316），同时 PR #5317 修复了嵌套子代理可绕过根会话深度预算的 bug（#5253）。此外，v0.9.6 发布准备已合入（#5315），ACP 协议工具执行能力也迎来重要补强（#5225）。今日共 2 个 Issue、5 个 PR 更新。

## 2. 版本发布

今日无新 Release。

## 3. 社区热点 Issues

> 今日仅有 2 个 Issue 更新，全部列出。

- **[#5316] EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)** — `OPEN`，评论 2。  
  这是 CodeWhale TUI crate 分解工作的**大型追踪 issue**，所有子 EPIC、FEAT 和 PR 都会在此登记。它标志着 TUI 正在从单体 crate 向模块化架构演进，会影响后续所有功能开发方式与贡献者协作路径。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/issues/5316)

- **[#5253] [bug] 嵌套子代理可扩大根会话的深度预算** — `CLOSED`，评论 1。  
  该 bug 允许后代子代理通过显式传入 `max_depth` 扩大根会话继承的递归预算，绕过了全局 `MAX_SPAWN_DEPTH_CEILING = 8` 的限制。社区对该问题的关注点在于**递归安全性**与**运营者可配置预算的强制约束**。#5317 已完成修复。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/issues/5253)

## 4. 重要 PR 进展

> 今日共 5 个 PR 更新，全部列出。

- **[#5225] feat(acp): 在 session/prompt 中暴露 file/search/git/patch/shell 工具** — `CLOSED`。  
  ACP 服务器此前只流式返回模型文本，不执行模型请求的工具调用，导致通过 ACP 接入的编辑器或桥接层（如 Zed）只能获得纯聊天式体验，缺乏真正的代码编辑能力。该 PR 补全了工具执行链路。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/pull/5225)

- **[#5277] build(deps): 将 docker/login-action 从 4.5.2 升级到 4.6.0** — `OPEN`（dependabot）。  
  常规 CI 依赖维护更新，新版加固了认证与日志输出逻辑，属于基础运维保障类变更。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/pull/5277)

- **[#5317] fix(subagents): 将嵌套 max_depth 限制在继承预算内** — `CLOSED`。  
  对应修复 #5253。在显式 `max_depth` 分支中补上了 `inherited.min(..)`，避免子代理把递归深度扩展到根会话设定之上。修复方式与已有的 profile-hint 分支保持一致。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/pull/5317)

- **[#5300] refactor(core): 将主请求准备逻辑归入 core** — `CLOSED`。  
  用生产级 `MessageRequest` DTO 家族替换掉 codewhale-core 中未使用的合成 `ChatRequest` 脚手架，并新增纯函数 `prepare_primary_turn_request`，统一了生产与测试路径的请求构造方式。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/pull/5300)

- **[#5315] chore(release): 发布 v0.9.6** — `CLOSED`。  
  这是一个“减法”版本：移除部分运行时保护、收敛到单一稳定基础提示词、让 provider 结束语更真实，并精简压缩路径。整体方向是降低复杂度和维护成本。  
  [GitHub 链接](https://github.com/Hmbown/CodeWhale/pull/5315)

## 5. 功能需求趋势

从今日更新的 Issue 与 PR 中可以提炼出以下社区关注方向：

- **模块化/架构重构**：EPIC-005 表明 TUI crate 分解是当前最核心的架构级工作，社区期待更清晰的模块边界与可独立演进的能力单元。
- **子代理递归安全**：#5253 + #5317 强调对嵌套生成深度预算的**绝对约束**，防止算子配置被后代调用意外扩大。
- **ACP 协议完整工具执行**：#5225 显示集成方（Zed、第三方 adapter）需要 ACP 不仅能对话，更要能驱动文件读写、搜索、git、shell 等真实编辑操作。
- **发布节奏与精简**：#5315 的 v0.9.6 以“减法”为主题，反映出社区对减少运行时保护、统一 base prompt、简化维护面的认可。

## 6. 开发者关注点

- **子代理深度预算易被突破**：开发者对 `max_depth` 的显式覆盖行为敏感，期望所有嵌套调用都强制继承根会话的绝对上限，且应有清晰报错而非静默扩大。
- **ACP 集成体验仍是短板**：纯聊天式响应无法满足编辑器场景的实操需求；工具调用必须真正落盘到文件、git、shell 等操作上，才能支撑日常开发流。
- **重构带来的迁移成本**：随着 `MessageRequest` DTO 归入 core、crate 分解推进，依赖 TUI 内部结构的第三方集成需要跟随调整，社区关注 API 稳定性和过渡路径。

---
*本日报由自动化分析生成，覆盖 2026-08-10 至 2026-08-11 的数据更新。*

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*