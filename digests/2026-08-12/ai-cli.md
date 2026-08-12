# AI CLI 工具社区动态日报 2026-08-12

> 生成时间: 2026-08-12 02:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-12）

## 1. 生态全景

AI CLI 工具已进入高频迭代与生态治理并行的阶段：主流厂商（Anthropic、OpenAI、Google、GitHub、阿里、Moonshot）与开源社区（OpenCode、Pi、CodeWhale）在 24 小时内合计发布 3+ 版本、50+ PR、100+ Issue 更新，版本节奏明显加快。社区反馈焦点从“功能多少”转向“真实场景下的稳定性”——Windows 兼容性、MCP 互操作、Agent 成本失控、沙箱失效成为共性问题。各工具功能趋同（均有 MCP、沙箱、多模型支持），但差异化定位逐渐清晰：商业工具押注生态绑定，开源工具拼交互创新。开发者对“透明性”和“可控性”的要求，已超过对新功能本身的渴求。

## 2. 各工具活跃度对比

| 工具 | Issues 更新 | PR 更新 | Release 情况 |
|------|-------------|---------|--------------|
| Claude Code | 热点 10+ | 7 | v2.1.228（修复 3 项） |
| OpenAI Codex | 热点 10+ | 10 | 3 个 alpha（0.148.0-alpha.7→9） |
| Gemini CLI | 热点 10+ | 10 | 4 个版本（含 v0.55.1 稳定版） |
| GitHub Copilot CLI | 41 条 | 3 | 无 |
| Kimi Code CLI | 3 条 | 8 | 无 |
| OpenCode | 热点 10+ | 10 | 无 |
| Pi | 热点 10+ | 10 | 无 |
| Qwen Code | 热点 10+ | 10 | v0.21.10 正式版 + preview/nightly |
| DeepSeek TUI | 热点 10+ | 6 | 无 |
| Grok Build | 0 | 0 | 无活动 |

> 注：“热点 10+”指日报中列出 10 条重点内容，不代表当日全部更新量。

## 3. 共同关注的功能方向

### 3.1 跨平台稳定性（尤其 Windows）
- **涉及工具**：Claude Code（#14828 控制台闪烁、#59408 Ctrl+C 清空输入）、Codex（#20214 桌面冻结、#30270 插件消失）、Copilot CLI（#4095/#4151 插件安装失败）、Kimi（#2600 PowerShell 路径）、Pi（#7947 CMD 重复输出）、Qwen（#8644 Windows 文件链接）。
- **核心诉求**：解决文件锁、终端渲染、路径解析等系统性兼容问题，这些已持续数月甚至 8 个月未修复，正成为选型时的扣分项。

### 3.2 Agent 执行可靠性与成本治理
- **涉及工具**：Claude Code（#67636 并行 Agent 烧数百万 token）、Gemini CLI（#21409 子代理挂起、#22323 失败误报成功）、OpenCode（#27924 压缩死循环）、Qwen（#8963 长任务中断）、DeepSeek（#5323 Auto-Review 静默阻断）、Copilot（#4251 大 session OOM）。
- **核心诉求**：需要强制中断机制、失败状态可观测、成本上限与实时用量可见性。

### 3.3 MCP/工具协议互操作与标准化
- **涉及工具**：Claude Code（#36024 Gmail 多账户、#79986 Desktop MCP 调度回归）、Codex（#38089 MCP OAuth CIMD）、Copilot CLI（#4211 BigInt 序列化、#4439 GitLab OAuth issuer 不匹配）、Qwen/DeepSeek（ACP 工具暴露）。
- **核心诉求**：从“能连”走向“企业级可用”——多实例、多账户、复杂数据类型、OAuth 等能力需标准化验证。

### 3.4 安全与沙箱策略的透明度和可配置性
- **涉及工具**：Claude Code（#73468 macOS 沙箱 E2BIG、#80988 提示词注入）、Codex（#38080 Windows 沙箱嵌套 Git）、Gemini（#24828 沙盒环境变量丢失）、Copilot（#3877 审批粒度不足）、DeepSeek（#4959 /stop 紧急停止）。
- **核心诉求**：沙箱在真实项目规模下必须可用，安全策略应可解释、可关闭，并提供运行时级“急停”按钮。

### 3.5 跨会话记忆与多会话编排
- **涉及工具**：Kimi（#1283 Memory System，34 评论）、Gemini（#26522 Auto Memory 无限重试）、OpenCode（#12548/#17838 标签页系统）、Pi（#7897 子代理继承配置）、Claude Code（#76727 多会话共享工作树）。
- **核心诉求**：持久化上下文、会话间通信、多 Agent 统一管理，避免重复上下文与信息丢失。

## 4. 差异化定位分析

- **Claude Code**：功能最全的“瑞士军刀”，社区规模最大，问题反馈也最密集；聚焦企业级既有工作流，但 Windows 历史包袱和 Desktop 回归削弱口碑。
- **OpenAI Codex**：Rust 原生重写，迭代最激进（日更 3 版）；重点投入桌面端、插件生态与协议层（gRPC/MCP），适合追求新架构的开发者。
- **Gemini CLI**：深度绑定 Google 生态（Vertex、Cloud Workstations），用 nightly/preview/stable 多轨控制质量；特色是 Auto Memory 与评估体系，适合 GCP 用户。
- **GitHub Copilot CLI**：企业治理与 GitHub 集成为护城河，CLI 本身更新保守；当前焦点是 MCP 互操作与模型配置一致性，适合已有 Copilot 订阅的团队。
- **Kimi Code**：轻量、社区小，外部贡献者主导大量防御性修复；侧重点在持久化记忆与交互精确度，适合 Moonshot 模型用户。
- **OpenCode**：开源 TUI 创新者，标签页、slash 命令生态活跃；多会话编排是核心差异化，社区期望快速对齐 Claude Code 命令体验。
- **Pi**：通用多 provider 接入，TUI 细节打磨充分（剪贴板、键位、滚动）；独立开发者维护，反馈直接，适合快速切换模型、轻量使用的场景。
- **Qwen Code**：强调 Web Shell 远程开发与 ACP/daemon 架构，适合云端开发；当前最大短板是 tmux/iTerm 渲染与跨平台稳定性。
- **DeepSeek TUI**：已更名 CodeWhale，聚焦自主代理（Auto-Review、工具 schema 优化）；外部贡献活跃（ACP、provider 接入），但运行时可靠性和网络层仍待打磨。

## 5. 社区热度与成熟度

- **第一梯队（高热度、规模化）**：Claude Code 评论量大、Issue 历史长；Codex 日更 3 版、PR 密度高；Copilot CLI 单日 41 条 Issue 更新，用户基数庞大。
- **第二梯队（活跃迭代期）**：Gemini CLI（日更 4 版）、Qwen Code（正式版 + 双迭代）、OpenCode（TUI 2.0 调整）、Pi（多方向 PR）。
- **第三梯队（小而精）**：Kimi Code（3 Issue / 8 PR）、DeepSeek TUI（10 Issue / 6 PR），社区规模小但外部贡献质量较高。
- **停滞**：Grok Build 24 小时无活动。

**成熟度判断**：Claude Code 与 Copilot CLI 属于“成熟但负重”状态——功能全面但历史问题积压；Codex、Gemini、Qwen 快速迭代但伴随回归；OpenCode、Pi 处于功能扩张期；Kimi、DeepSeek 仍在早期，底层健壮性靠社区补强。

## 6. 值得关注的趋势信号

- **Windows 体验成为选型分水岭**：多个 Windows Issue 持续数月无人修复（Claude #14828 达 8 个月），Windows 开发者在选择工具时应优先验证目标 CLI 的文件锁、终端渲染、路径处理能力。
- **MCP 协议进入“深水区”**：OAuth 元数据、BigInt 序列化、多账户支持集中爆发，说明 MCP 已完成“从 0 到 1”，下一步是“从 1 到 100”的企业级兼容与稳定性。
- **Agent 治理比 Agent 能力更迫切**：成本天花板、强制中断、行为审计成为集体诉求，未来 AI CLI 的竞争力将部分取决于“谁能防止 Agent 失控”，而非单纯追求更聪明的 Agent。
- **上下文与记忆是长会话体验的分水岭**：压缩死循环、Memory 污染、会话恢复失败反复出现，开发者已经开始关注“上下文能否被信任”，而不仅仅是“上下文多长”。
- **开源社区成为底层质量的重要保障**：多个关键修复（Kimi 的 assert 替换、Pi 的剪贴板修复、DeepSeek 的 ACP 改造）来自外部贡献者，维护者响应速度将直接影响项目生命力。

---

*报告基于 2026-08-12 各工具 GitHub 社区的公开 Issue/PR/Release 信息整理。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止 2026-08-12 | 来源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行

> 注：以下 PR 按社区评论数排序（数据中评论数未显式导出，排名依据列表原始顺序）；Top 20 内全部为 **OPEN** 状态，暂无 merged。

**① PR #1298 — skill-creator 评估管道修复（recall=0% 缺陷）**
- **功能**：修复 `run_eval.py` 对所有 skill 描述均报告 recall=0% 的严重缺陷（关联 Issue #556，10+ 独立复现），同时修复 Windows 流读取、触发检测与并行 worker 问题。
- **讨论热点**：该缺陷使 `run_loop.py` / `improve_description.py` 整个描述优化循环"在噪声上优化"，是当前生态最核心的工具链阻塞点。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1298

**② PR #514 — document-typography 文档排版质检 Skill**
- **功能**：检测 AI 生成文档的孤词换行（orphan word wrap）、段首寡妇行（widow paragraphs）、编号错位等排版问题。
- **讨论热点**：针对所有 Claude 生成文档的共性缺陷，社区认为普适性高、贴近日常产出质量。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/514

**③ PR #538 — pdf Skill 大小写敏感引用修复**
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不匹配的引用（`REFERENCE.md`→`reference.md`、`FORMS.md`→`forms.md`）。
- **讨论热点**：在大小写敏感文件系统（Linux/macOS）上原引用失效，影响跨平台可用性。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/538

**④ PR #486 — 新增 ODT Skill（OpenDocument 文档处理）**
- **功能**：支持 `.odt/.ods` 的创建、模板填充、读取及 ODT→HTML 转换，覆盖 LibreOffice / ISO 开源文档格式需求。
- **讨论热点**：补齐了官方文档类 Skills 在开源办公格式上的空白。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/486

**⑤ PR #210 — frontend-design Skill 清晰度与可执行性改进**
- **功能**：重写 frontend-design skill，确保每条指令都可在单次对话中执行，提升引导的具体性。
- **讨论热点**：Skill 应从"教育性文档"转向"可执行指令"——与 Issue #202 的社区共识相呼应。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/210

**⑥ PR #83 — skill-quality-analyzer + skill-security-analyzer 元技能**
- **功能**：新增两个 meta skills：质量分析器（结构/文档/示例等 5 维度评分）与安全分析器，供社区自检 Skill 质量与安全性。
- **讨论热点**：在安全信任议题（Issue #492）升温背景下，社区对 Skill 质量/安全自检工具需求强烈。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/83

**⑦ PR #1367 — self-audit 推理质量门控 Skill**
- **功能**：交付前先做机械文件验证（Step 0），再按损害严重度执行四维度推理审计；宣称适配任意项目/技术栈/模型。
- **讨论热点**：与 Issue #1385 的质量门控管线提案联动，代表"AI 产出质量治理"方向。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1367

---

## 2. 社区需求趋势（来自 Issues）

- **安全与信任边界（声量最高）**：Issue #492（43 评论）指出社区 Skill 在 `anthropic/` 命名空间下分发构成信任边界漏洞，用户易误授予高权限——当前最受关注的安全议题。
  🔗 https://github.com/anthropics/skills/issues/492
- **企业级共享协作**：Issue #228（16 评论，👍8）要求组织级 Skill 共享库 / 直链分享，取代"下载→Slack→手动上传"的低效链路。
  🔗 https://github.com/anthropics/skills/issues/228
- **Skill 工具链可靠性**：Issue #556（12 评论，👍7）与 #1169 集中报告 `run_eval.py` 在所有查询下 0% 触发率，描述优化循环完全失效。
  🔗 https://github.com/anthropics/skills/issues/556
- **Agent 记忆与状态管理**：#1329 compact-memory 提出符号化紧凑状态记法，减少长时运行 agent 的上下文消耗。
  🔗 https://github.com/anthropics/skills/issues/1329
- **上下文窗口资源感知**：#1487 报告 `claude-api` skill 单次注入约 156k token 撑爆上下文，凸显"资源感知型" Skill 设计需求。
  🔗 https://github.com/anthropics/skills/issues/1487
- **生态互操作**：#16（Skills 暴露为 MCP）与 #29（AWS Bedrock 支持）持续被提及，跨平台/跨协议集成是长期诉求。
  🔗 https://github.com/anthropics/skills/issues/16 ｜ 🔗 https://github.com/anthropics/skills/issues/29
- **质量治理提案**：#1385 提出"预任务校准→对抗评审→交付验证"三闸门管线，是 #1367 的系统化延伸。
  🔗 https://github.com/anthropics/skills/issues/1385

---

## 3. 高潜力待合并 Skills（评论活跃 · 尚未合并）

| PR | Skill | 亮点 | 链接 |
|---|---|---|---|
| #514 | document-typography | 通用排版质检，覆盖面广 | https://github.com/anthropics/skills/pull/514 |
| #486 | ODT / OpenDocument | 补齐开源文档格式处理空白 | https://github.com/anthropics/skills/pull/486 |
| #83 | skill-quality / security analyzer | 元技能，推动社区质量自循环 | https://github.com/anthropics/skills/pull/83 |
| #723 | testing-patterns | 完整测试栈（Testing Trophy / React / 单元测试） | https://github.com/anthropics/skills/pull/723 |
| #525 | pyxel 复古游戏开发 | 结合 pyxel-mcp，游戏场景稀缺 Skill | https://github.com/anthropics/skills/pull/525 |
| #1367 | self-audit | 推理质量门控，与 #1385 提案联动 | https://github.com/anthropics/skills/pull/1367 |
| #1302 | color-expert | 色彩命名体系 / 色彩空间选型专业知识 | https://github.com/anthropics/skills/pull/1302 |
| #1479 | plan-file-hygiene | 治理规划产物文件生命周期（addresses #1417） | https://github.com/anthropics/skills/pull/1479 |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求，是先修好"制造 Skill 的工具"——`run_eval.py` 的 recall=0% 系统性缺陷（#556/#1169/#1298/#1323 多路独立复现）已使 skill 描述优化循环完全失效；在工具链之外，文档处理（typography / ODT / PDF / DOCX）、测试生成、质量与安全审计是社区最期待落地的三大新 Skill 方向。**

---

# Claude Code 社区动态日报（2026-08-12）

## 今日速览

- **v2.1.228 发布**，修复交互会话重绘停滞、Windows 下 Git Bash 检测失败及 `/tui` 回退异常三项问题。
- **社区焦点仍集中在老牌 Windows Bug 与新增的 Desktop MCP 回归**：#14828（控制台窗口闪烁）累计 60 条评论，势头不减；#79986（MCP 工具声明但永不调度）引发对 Desktop 稳定性的质疑。
- **功能需求方面**，Gmail MCP 多账户支持（#36024）以 77 👍 登顶今日需求榜，反映多账户协作场景的迫切性。

## 版本发布

**v2.1.228**（[Release 链接](https://github.com/anthropics/claude-code/releases)）

- 修复罕见的内部布局错误导致交互会话完全停止重绘、但进程仍在后台运行的 bug
- 修复从 git 安装目录的父文件夹启动 Claude Code 时，Windows 下无法定位 `git` / Git Bash 的问题
- 修复 `/tui` 回退相关异常（原 release notes 截断，具体范围待确认）

## 社区热点 Issues

挑选过去 24 小时内更新、讨论最热烈或影响面最大的 10 个 Issue：

1. **[#27801] Cowork：VM 服务无法启动，重启后依旧**（72 评论 | 41 👍）  
   从 2 月创建至今仍未关闭，Windows 用户持续受影响。VM service 不运行导致 Cowork 工作区完全不可用，社区已多次反馈但官方响应缓慢。  
   https://github.com/anthropics/claude-code/issues/27801

2. **[#14828] Windows：执行工具时控制台窗口闪烁**（60 评论 | 36 👍）  
   持续近 8 个月的老问题，覆盖所有 Windows 安装方式。闪烁虽不致命，但高频工具调用下视觉干扰严重，社区多次催促修复无果，今日仍处于 OPEN 状态。  
   https://github.com/anthropics/claude-code/issues/14828

3. **[#36024] MCP 集成支持多个 Gmail 账户**（25 评论 | 77 👍）  
   今日评论数最高、👍 数第一的功能请求。个人 + 工作多账户是普遍场景，当前仅支持单一账户连接严重限制了 Gmail MCP 的实际可用性。  
   https://github.com/anthropics/claude-code/issues/36024

4. **[#80988] v2.1.219 注入 `heron_brook` 提示词段，静默改写 Opus 5 的 Agent 委派策略**（21 评论 | 48 👍）  
   严重透明性问题：系统提示词被内部注册为 `heron_brook` 的代码段强制插入"Do not call the AgentTool unless the user requested it"，且无关闭选项。用户配置的委派策略被无声覆盖，动摇了用户对模型行为可控性的信任。  
   https://github.com/anthropics/claude-code/issues/80988

5. **[#54394] v2.1.117 内嵌 ugrep 将 grep OOM 放大为 V8-heap-OOM，WSL2 主机冻结**（27 评论）  
   性能/稳定性双重问题：`exec -a ugrep` 包装器使正则回溯从进程级 OOM 升级到 8GB V8 堆 OOM，直接导致 WSL2 整机卡死。涉及内存安全边界，影响严重。  
   https://github.com/anthropics/claude-code/issues/54394

6. **[#79986] Claude Desktop：外部 stdio MCP 工具声明后永不分发**（15 评论）  
   桌面版 1.24012.1 更新引入的回归：MCP server 握手成功、`tools/list` 正常返回，但应用从不发送 `tools/call`。影响 Windows/macOS/Linux 全平台，等于 MCP 生态在 Desktop 端整体失效。  
   https://github.com/anthropics/claude-code/issues/79986

7. **[#59408] Windows：Ctrl+C / Ctrl+Shift+C 静默清空提示输入**（14 评论）  
   无确认、无恢复地丢失当前 prompt 内容，与常见终端行为冲突。输入较长指令时误触风险极高，社区要求至少增加回收站机制或确认提示。  
   https://github.com/anthropics/claude-code/issues/59408

8. **[#73468] macOS 沙箱完全不可用：Seatbelt 内联 profile 超出 ARG_MAX**（7 评论）  
   在存在大量 git worktree 的仓库中，`sandbox-exec -p` 因参数超长导致**所有**沙箱命令报 `E2BIG`，连 `printf ok` 都无法执行。Git 仓库规模稍大即触发，沙箱功能形同虚设。  
   https://github.com/anthropics/claude-code/issues/73468

9. **[#78775] [回归] Desktop 会话时间范围筛选仅在"按状态分组"时出现**（8 评论 | 28 👍）  
   7 月更新引入的 UI 回归：切换分组视图后时间筛选器消失。功能隐藏而非移除，用户普遍认为这是布局逻辑错误而非有意设计。  
   https://github.com/anthropics/claude-code/issues/78775

10. **[#67636] 并行 Agent 导致数百万 token 消耗后崩溃**（6 评论）  
   Claude 一次拉起 10–15 个并行 Agent 做只读操作后崩溃，造成巨额 token 费用。社区关注的不仅是资源浪费，更是 Agent 数量的自动决策缺乏成本上限约束。  
   https://github.com/anthropics/claude-code/issues/67636

**其他值得留意**：同一位 macOS 用户提交的系列模型行为问题（#71576、#72061、#74848、#75232）集中反映指令遵从失败、内容未读即声称已读、编造来源等现象，虽然单个评论量不高，但组合起来指向模型行为一致性隐患。另外 #85973（"感谢上帝还有中国模型"）因 cyber-safeguard 误报引发社区共鸣，评论数虽少但情绪激烈。

## 重要 PR 进展

过去 24 小时共 7 个 PR 更新：

1. **[#70173] `clean_gone` 分支清理修复**（CLOSED）  
   修复 `/clean_gone` 从未删除任何分支的 bug：原实现用 `git branch -v` + grep `[gone]` 检测失效分支，但该标记默认不输出。改用 `git branch -vv` 并修正 sed/awk 管道逻辑。已关闭，回合并入主线。  
   https://github.com/anthropics/claude-code/pull/70173

2. **[#85716] hookify：从祖先 .claude 目录加载规则，修复静默绕过**  
   针对 #85613 的安全修复。原实现只加载当前目录的 hook 规则，攻击者可通过在子目录创建同名 hook 静默绕过安全策略。此 PR 让配置加载沿目录树向上回溯，跨平台支持。  
   https://github.com/anthropics/claude-code/pull/85716

3. **[#85243] skills 名称规范：8 个内置 skill 改用 spec 兼容命名**  
   当前 `hookify`、`plugin-dev` 等 8 个 skill 的 `name` 字段含空格且为标题大小写（如 "Writing Hookify Rules"），不符合 skill spec 对 slug 的要求。此 PR 统一改为连字符小写格式，避免下游工具解析失败。  
   https://github.com/anthropics/claude-code/pull/85243

4. **[#85806] security-guidance：文档中的 XSS 模式不再误报**  
   四个 XSS 相关规则现在复用已有的 `_DOC_EXTS` 路径过滤，当模式出现在文档/散文语境时不再告警，同时保留可执行源码文件中的告警行为，并补充了回归测试。  
   https://github.com/anthropics/claude-code/pull/85806

5. **[#85925] docs：将剩余旧域名文档链接指向 code.claude.com**  
   清理 `docs.claude.com` 旧链接（仅重定向），替换为规范链接 `code.claude.com`，涉及 plugins、skills、agents、commands 及 issue 模板联系方式。  
   https://github.com/anthropics/claude-code/pull/85925

6. **[#85822] docs：修复 plugins 和 examples 中的陈旧链接与 README 漂移**  
   验证每个链接的实时重定向状态后更新 hook 示例、plugins README 中的文档链接；纯文档改动，零代码风险。  
   https://github.com/anthropics/claude-code/pull/85822

7. **[#85834] fix：HackerOne 赏金计划访问问题**（质量存疑）  
   PR 描述修改 devcontainer.json 以正确安装 hookify 插件，但全文为俄语且标注"AIOS Bounty Engine 生成"，改动意图与说明关联性弱，疑似低质量自动提交，建议社区谨慎评估。  
   https://github.com/anthropics/claude-code/pull/85834

## 功能需求趋势

从全部 Issues 中提炼出四个最受关注的功能方向：

1. **MCP 生态深化与多账户支持**  
   #36024（Gmail 多账户，77 👍）是今日最高赞需求。MCP 已从"能否连接"进入"能否多实例、多账户、稳定调度"阶段——#79986 暴露的 Desktop 调度回归说明 MCP 运行时稳定性仍是短板。

2. **多 Agent / 跨会话协作与控制**  
   #76727 要求为多会话共享工作树提供一等公民的协调原语，而非依赖自建 `PreToolUse deny` hook；#67636 则呼吁对并行 Agent 数量设置成本上限。社区对 Agent 的需求正从"能跑"转向"可控、可协调、可预算"。

3. **沙箱与安全策略的透明度和可配置性**  
   #73468（macOS 沙箱 E2BIG）显示沙箱在真实项目规模下尚未可用；#80988（`heron_brook` 注入）和 #85222/#85973（cyber-safeguard 误报）则指向策略执行不透明。安全机制若不可见、不可关、误杀高，开发者会直接改用本地模型。

4. **Desktop 应用体验追赶 CLI**  
   5 个 Desktop 相关 Issue（#79986、#78775、#85798、#84841、#84880）涉及 MCP 调度、UI 回归、会话恢复断裂。Desktop 版功能迭代快但回归频率高，社区期待稳定性能与 CLI 保持一致。

## 开发者关注点

- **Windows 平台问题长期悬而未决**：#14828 控制台闪烁持续 8 个月、60 条评论零修复；#59408 输入清空无确认、#54394 WSL2 内存溢出。Windows 用户积累的整体体验是"老问题不修、新问题不断"。
- **指令遵从与记忆可靠性受到质疑**：#85677 报告项目指令"读到了但被忽略"、记忆笔记冲突时错误的条目胜出；多位用户（如 #71576、#72061、#74848、#75232）反映模型声称已执行但实际未读、来源编造等行为。治理问题开始追赶功能问题。
- **计费与成本透明度堪忧**：#81703 与 #83062 分别报告 604.74 美元和 995.67 美元的自动充值争议（后者为 8 月 1 日二次事件）；#67636 显示 Agent 并发失控可在数分钟内烧掉数百万 token。用户需要成本上限、实时用量可见性和更清晰的配额扣减逻辑。
- **更新机制可靠性不足**：#85974/#85975 为同一问题重复提交——macOS 自动更新"报告成功但留下不可执行的 stub 二进制"，且 postinstall 链接失败时无回滚。更新流程需要失败检测而非仅"报告成功"。
- **模型行为一致性成为隐性痛点**：多个 Issue（#71576、#72061、#75232、#74848）出自同一用户，但模式不孤立——"先聊后做"、跳过工具直接编造内容、未经确认写文件等行为反复出现。开发者开始明确要求：要么严格遵循指令，要么在不确定时停下来询问，而不是自作主张。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-12

## 今日速览

过去 24 小时内，Codex 连续发布 3 个 Rust alpha 版本（0.148.0-alpha.7 → alpha.9），迭代节奏明显加快。社区讨论重心集中在 Windows 平台稳定性（插件、沙箱、内存与性能问题）和高赞的 Linux 桌面端需求；与此同时，PR 侧在 MCP 工具链、gRPC 会话代理、Windows 沙箱权限等方面有大量基础设施改进。

---

## 版本发布

- **rust-v0.148.0-alpha.7 / alpha.8 / alpha.9** 连续发布，位于 0.148 开发线上。GitHub Releases 页面未附带详细变更说明，推测为 0.148 里程碑的滚动修复与功能收敛。
  - https://github.com/openai/codex/releases

---

## 社区热点 Issues

**1. [#11023] Codex 桌面应用 Linux 支持请求**（😍 950 | 💬 207 | 已关闭）  
社区关注度最高的 Issue。用户因 [issue #10432](https://github.com/openai/codex/issues/10432) 导致 macOS 上的桌面应用几乎不可用，转而要求在 Linux 桌面运行 Codex App。尽管该 Issue 已关闭，但 950 个 👍 清楚表明这是社区最迫切的功能需求之一。  
https://github.com/openai/codex/issues/11023

**2. [#20214] Windows 11 上 Codex App 频繁冻结/卡顿**（👍 81 | 💬 96）  
在 AMD Ryzen 5 5600 + 32GB RAM 的 Windows 11 Pro 上，最新 Microsoft Store 版 Codex App 依然频繁无响应。这是 Windows 平台反馈最集中的性能问题，持续 3 个月仍未关闭。  
https://github.com/openai/codex/issues/20214

**3. [#37403] macOS Desktop 无法恢复远程控制/CLI 线程**（👍 9 | 💬 10）  
8 月 7 日更新 macOS ChatGPT Desktop 客户端后回归：夜间通过手机 Remote Control 继续 Codex CLI 线程，白天在桌面端打开同一线程时抛 `already has an active writer`。直接冲击“离线继续工作”核心工作流。  
https://github.com/openai/codex/issues/37403

**4. [#29235] 拥有完全访问权限且禁用审批提示时，Codex 仍请求权限**（👍 16 | 💬 3）  
线程已配置完全文件系统访问且禁用审批提示，但 Codex 仍反复在普通操作（本地读、编辑、命令）前请求权限。该问题破坏跨线程流程连贯性，开发者反馈强烈。  
https://github.com/openai/codex/issues/29235

**5. [#6150] 支持 Linux RISC-V（riscv64）平台**（👍 9 | 💬 9）  
npm 包在 `linux riscv64` 上直接抛出 `Unsupported platform`。RISC-V 开发者希望在 Ubuntu 24.04 上使用 Codex。  
https://github.com/openai/codex/issues/6150

**6. [#25391] Windows Computer Use 插件引导失败：原生管道路径不可用**（💬 23）  
ChatGPT Pro 订阅 + 最新 Windows App 上，Computer Use 运行时可用性门控已通过，但原生管道持续报错 `Windows Computer Use helper paths are unavailable`。与 #25571 高度相似，疑似批量受影响。  
https://github.com/openai/codex/issues/25391

**7. [#21670] Windows Chrome 插件与 Browser Use 设置挂起**（💬 15 | 👍 7）  
Chrome 插件可偶尔打开 HTTPS 页面并读取标题，但速度极慢；直接 browser-client 设置调用超时挂起，插件 UI 卸载时报 OS error 5。  
https://github.com/openai/codex/issues/21670

**8. [#30270] Windows App 更新后 Bundled 插件消失**（💬 12）  
应用更新后，陈旧的捆绑市场路径导致 Browser/Chrome/Computer Use 插件集体消失。这是 Windows 更新流程中的顽固问题，关联 #26501、#28084、#33738 等多条 Issue。  
https://github.com/openai/codex/issues/30270

**9. [#31376] `codex exec` 在 SSE 流开始前无限挂起**（💬 8 | 👍 2）  
非交互式 `codex exec` 运行 23 分钟后，在死连接（CLOSE_WAIT，无读超时、无重试）上无限挂起。Windows/Linux 均可复现，影响 CI/自动化场景。  
https://github.com/openai/codex/issues/31376

**10. [#38059] Windows Desktop 内存增长至 8.8GB 且 UI 冻结**（💬 3 | 新增）  
8 月 11 日新上报：Codex App 空置时内存涨至 8.8GB，1-2 条消息后 UI 冻结。已在两个版本复现（26.803.10989.0 / 26.803.8161.0）。  
https://github.com/openai/codex/issues/38059

---

## 重要 PR 进展

**1. [#38103] 避免 TUI 历史中克隆 MCP 调用**（已合并）  
MCP 调用格式化改为借用 invocation/server/tool 名称，减少 TUI 历史渲染的克隆开销。  
https://github.com/openai/codex/pull/38103

**2. [#38101] 文件上传附加托管 App 上下文**（已合并）  
托管 App 工具调用的文件创建请求现在包含 connector ID、action name 和 model；服务端返回文件大小时优先采用。  
https://github.com/openai/codex/pull/38101

**3. [#38092] 简化排队用户消息准入**（已合并）  
用户消息在 Core 接受为新回合或 steer 时即解析准入，无需等待 rollout 持久化；删除持久化/hook 相关错误和任务簿记。  
https://github.com/openai/codex/pull/38092

**4. [#38089] MCP OAuth 注册支持 CIMD**（已合并）  
当授权服务器声明支持 public client 且 Codex 使用本地 loopback 回调时，优先采用 Client ID Metadata Documents（CIMD）；否则回退到 Dynamic Client Registration。  
https://github.com/openai/codex/pull/38089

**5. [#38087] gRPC code-mode 会话共用 HTTP 客户端**（已合并）  
gRPC code-mode 连接改用 `HttpClientFactory` 构建，从而支持应用的外发代理和自定义 CA 配置；接受 http/https origin，拒绝未支持的协议。  
https://github.com/openai/codex/pull/38087

**6. [#38080] Windows 沙箱允许嵌套 Git 仓库**（已合并）  
修复沙箱用户运行 Git 命令时，主用户拥有的嵌套仓库被拒绝的问题。新增 worktree 根及其 `/*` 通配符到 Git 配置信任列表。  
https://github.com/openai/codex/pull/38080

**7. [#38078] 减少世界状态补丁处理中的克隆**（已合并）  
从借用 JSON 值直接反序列化类型化 section 快照，原地构建/应用合并补丁，避免整快照克隆与转换。  
https://github.com/openai/codex/pull/38078

**8. [#38075] TUI 历史按实际渲染宽度添加**（已合并）  
新聊天控件初始化时使用当前终端宽度；根据历史渲染模式和 ambient-pet 预留后的可用宽度决定历史 cell 可见性。  
https://github.com/openai/codex/pull/38075

**9. [#38074] 跟踪隐式 executor 技能调用**（已合并）  
检测 executor 拥有的技能文档读取和脚本执行（原生/URI 工作目录），仅在活动执行环境中匹配技能，并发出技能调用分析事件。  
https://github.com/openai/codex/pull/38074

**10. [#38064] Windows 沙箱授予 Codex 应用根目录访问**（已合并）  
对本地 Codex 应用根目录应用沙箱读/执行 ACL 并使其子内容继承；跳过缺失路径、非目录等特殊情况，运行时缓存仍单独处理。  
https://github.com/openai/codex/pull/38064

---

## 功能需求趋势

- **Linux 桌面端支持**：950 👍 的极高呼声，是当前最大功能缺口。
- **非 x86 架构支持**：RISC-V 等新兴架构需求开始出现。
- **Windows 插件/浏览器生态稳定性**：多条 Issue 指向 Windows 上 Chrome/Browser/Computer Use 插件在安装、更新、缓存、文件锁方面的系统性缺陷。
- **远程控制 / 跨设备工作流**：macOS 远程控制线程恢复回归牵动高价值工作流。
- **性能与资源占用**：内存增长至 8.8GB、`codex exec` 无限挂起、插件协调冻结 61 秒等性能问题频繁出现。
- **MCP 与自动化工具链**：PR 侧 CIMD OAuth、ReviewDecision 审批、gRPC 回调转发等说明 MCP 生态是当前基础设施投入重点。

---

## 开发者关注点

- **Windows 升级/更新后状态损坏**是最突出痛点：捆绑插件消失、市场快照陈旧、文件锁导致缓存损坏、新旧状态混合（#30270、#33738、#26501、#28084、#26109 等形成 Issue 家族）。
- **权限与审批行为不一致**：即使配置了 full access 和禁用审批，仍被拦截打断流程（#29235）。
- **沙箱与真实环境的集成**：嵌套 Git 仓库、应用根目录访问、代理设置等，是 sandbox 落地日常开发的关键细节。
- **App 与 CLI 的远程/异步场景可靠性**：定时任务挂起、`codex exec` 死连接不重试、Remote Control 线程恢复失败，都在影响“无人值守”场景。
- **MCP 调用与 TUI 渲染性能**：多个 PR 专门优化克隆与渲染路径，说明大历史/大状态下的内存和响应速度仍在持续打磨。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-12

## 1. 今日速览

昨日共发布 4 个版本（含 nightly、preview 与稳定版 v0.55.1），核心修复围绕 **模型容量耗尽误报** 问题，并引入工具注册表（Tool Registry）与本地 eval 报告功能。社区讨论仍集中在 **Agent 挂起、子 Agent 行为可靠性、Auto Memory 后台任务** 三个方向；安全方面，多个 CRITICAL 级 CVE 修复 PR 正在等待合入。

## 2. 版本发布

过去 24 小时共发布 4 个版本：

- **[v0.56.0-nightly.20260812.g5024443c7](https://github.com/google-gemini/gemini-cli/releases)**：修复核心/CLI 层"模型容量耗尽"误报及配额查询模型映射错误（PR #28730）；新增本地 eval 报告命令与开发者文档（PR #28369）。
- **[v0.56.0-preview.1](https://github.com/google-gemini/gemini-cli/releases)**：v0.55.0-preview.1 变更日志整理与版本号升级，无功能性变化。
- **[v0.55.1](https://github.com/google-gemini/gemini-cli/releases)**：修复 release 验证中 `npm ci` 忽略脚本的问题、防止工作区二进制文件遮蔽；引入工具注册表（Tool Registry）。
- **[v0.55.0-preview.3](https://github.com/google-gemini/gemini-cli/releases)**：通过 cherry-pick 将 #28730 修复补入 v0.55.0-preview.2，形成补丁版本。

## 3. 社区热点 Issues

以下为过去 24 小时内更新最活跃、关注度最高的 10 个 Issue：

### 🔴 P1 高优先级 Bug

1. **[#22323 Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1｜12 评论｜2 👍
   `codebase_investigator` 子代理在自身报告中明确写出"命中最大轮次限制、未做任何分析"，最终状态却被标记为 `success / GOAL`。这种**状态掩盖**问题直接破坏用户对 Agent 执行结果的信任。

2. **[#21409 通用 Agent 无限挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1｜8 评论｜8 👍
   一旦任务交给 generalist agent，就连"创建文件夹"这种简单操作也会永久卡死，用户等待一小时无果。8 个 👍 说明并非个例；临时规避手段是禁止模型委托子代理。

3. **[#25166 Shell 命令执行完成后卡在"Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1｜4 评论｜3 👍
   已结束的简单 CLI 命令仍被标记为运行中并显示"等待用户输入"。终端状态管理存在缺陷，严重影响自动化与日常交互。

4. **[#21983 Browser 子代理在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)** — P1｜4 评论｜1 👍
   Browser 子代理在 Wayland 显示环境下无法完成目标，且终止原因同样被误报为 `GOAL`。

5. **[#22186 get-shit-done 输出钩子导致崩溃](https://github.com/google-gemini/gemini-cli/issues/22186)** — P1｜3 评论
   当 GSD（get-shit-done）输出接近完成、打印用户摘要时，Gemini CLI 反复崩溃，属于输出链路的稳定性缺陷。

### 🟠 P2 重要问题与功能方向

6. **[#24353 稳健的组件级评估（EPIC）](https://github.com/google-gemini/gemini-cli/issues/24353)** — P1｜7 评论
   行为评估体系后续规划：仓库已有 76 个行为评估测试、覆盖 6 个受支持 Gemini 模型，目标是让评估更细粒度、更健壮。

7. **[#26522 阻止 Auto Memory 无限重试低信号会话](https://github.com/google-gemini/gemini-cli/issues/26522)** — P2｜5 评论
   后台提取 Agent 因"会话看起来低价值"而跳过的记录不会被标记为已处理，导致反复出现在索引中、被无限重试，浪费 token 且拖慢后台任务。

8. **[#24828 沙盒不转发 GOOGLE_GENAI_API_VERSION](https://github.com/google-gemini/gemini-cli/issues/24828)** — P2｜5 评论
   启用 `GEMINI_SANDBOX=true` 并搭配 `GOOGLE_GEMINI_BASE_URL` 构建 Vertex 兼容 API 路径时，沙盒返回 404。原因：`sandbox.ts` 只转发硬编码环境变量列表。

9. **[#24246 工具数量超过 128 个时报 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246)** — P2｜3 评论
   API 一次性传入超过 128 个工具就报 400。社区期望 Agent 能根据当前启用范围智能裁剪工具集，而非全量发送。

10. **[#26525 Auto Memory 需要确定性数据编辑与减少日志](https://github.com/google-gemini/gemini-cli/issues/26525)** — P2｜4 评论
    隐私问题：本地转录内容在发送给后台提取模型前**缺少确定性编辑**，且现有技能文件可能被写入日志。对安全敏感用户属阻塞性缺陷。

## 4. 重要 PR 进展

以下 10 个 PR 是昨日社区最值得关注的合并/推进动态：

### ✅ 功能修复

1. **[#28730 修复模型容量耗尽误报与配额映射](https://github.com/google-gemini/gemini-cli/pull/28730)** — 已合入 nightly
   解决 CLI 中"容量耗尽"误报，修正核心包中客户端侧模型配额查找映射，并保留 UI 中 "Keep trying" 选项以应对瞬态容量高峰。

2. **[#28599 将容量耗尽归类为终端错误，防止重试挂起](https://github.com/google-gemini/gemini-cli/pull/28599)** — 已关闭
   当后端返回 `MODEL_CAPACITY_EXHAUSTED`（HTTP 429）且未指定重试延迟时，客户端不再无限重试，而是立即触发模型回退链。

3. **[#28729 修复 IDE 连接目录不匹配](https://github.com/google-gemini/gemini-cli/pull/28729)** — 已合入
   解决在 Cider / VS Code 远程工作区等虚拟或差异化 FUSE 路径下，Gemini CLI 无法连接 IDE Companion 扩展的问题。

4. **[#28688 动态解析 Cloud Workstations OAuth 重定向 URI](https://github.com/google-gemini/gemini-cli/pull/28688)** — 已关闭
   修复 Cloud Workstations 虚拟机中 OAuth 流程因静态 `localhost` 重定向而失败的问题，适配开发者本地浏览器环境。

5. **[#28679 改进 Vertex AI 401 错误提示](https://github.com/google-gemini/gemini-cli/pull/28679)** — Open
   当用户使用 `vertex-ai` 认证类型但只提供标准 Gemini API Key 时，给出更明确的引导性错误信息，改善接入体验。

6. **[#28581 跳过 diff hunk 标记被误判为 @ 引用](https://github.com/google-gemini/gemini-cli/pull/28581)** — Open
   防止 unified/combined diff 中的 `@@` hunk 标记被当成 `@file` 引用，避免在大型 diff 提示中触发两次递归全局搜索，减少 `minimatch`/`path-scurry` 堆内存增长。

7. **[#28768 修复 CI 夜间发布与性能测试失败](https://github.com/google-gemini/gemini-cli/pull/28768)** — Open
   修复 Wombat 因静态标签导致 403 DELETE 错误，以及性能测试套件中 ripgrep 解析失败的问题。

### 🛡️ 安全修复

8. **[#28780 升级 shell-quote 至 1.8.4（CVE-2026-9277）](https://github.com/google-gemini/gemini-cli/pull/28780)** — Open
   Trivy 扫描发现的 CRITICAL 级漏洞，影响 `package-lock.json` 中的 `shell-quote` 依赖。

9. **[#28778 升级 simple-git 至 3.32.3（CVE-2026-28292）](https://github.com/google-gemini/gemini-cli/pull/28778)** — Open
   同样是 Trivy 标记的 CRITICAL 级漏洞，simple-git 从 3.28.0 升级至 3.32.3。

### 🧪 评估与工具链

10. **[#28369 新增本地 eval 报告命令与开发文档](https://github.com/google-gemini/gemini-cli/pull/28369)** — Open
    添加评估报告汇总工具：开发者运行 `npm run eval:report` 即可聚合各模型在 Vitest `report.json` 中的通过率，并映射回测试清单策略。

## 5. 功能需求趋势

从当前活跃 Issues 中可提炼出五个社区最关注的功能方向：

1. **Agent 可观测性与自省**
   子代理轨迹应通过 `/chat share` 可见（#22598）、bug 报告需包含子代理上下文（#21763）、Agent 应准确了解自己的 CLI 参数/热键/运行方式（#21432）。

2. **Auto Memory 智能化与隐私**
   低信号会话分类与终止重试（#26522）、无效收件箱补丁隔离（#26523）、发送前确定性编辑（#26525），以及整体内存系统 bug 修复（#26516）。

3. **AST 感知代码工具**
   探索 AST 感知的文件读取、搜索与代码库映射的实际收益（#22745、#22746），目标是减少 token 消耗、提高单次工具调用的信息密度。

4. **破坏性行为防护**
   Agent 应主动避免或劝阻 `git reset`、`--force` 等危险命令，尤其在复杂 git 操作和数据库维护场景下（#22672）。

5. **沙盒与 IDE 集成**
   沙盒环境变量完整透传（#24828）、IDE 连接路径兼容性（#28729）、Cloud Workstations 等云端开发环境认证（#28688）。

## 6. 开发者关注点

结合 Issue 与 PR 中的用户反馈，当前高频痛点集中在以下四个方面：

- **Agent 挂起/卡死是最高频缺陷**：通用 Agent（#21409）、Shell 命令执行（#25166）、Vite 交互式脚手架（#22465）三条路径都会出现"永久等待"，开发者普遍将其列为 P1 阻断问题。
- **子 Agent 行为不一致且难以约束**：v0.33.0 之后子代理在配置禁用的情况下仍被调用（#22093）；系统默认不使用自定义技能与子代理，必须显式指令才触发（#21968）。
- **容量耗尽误报与重试策略引发连锁体验问题**：一个错误的 429/容量耗尽提示会触发回退、挂起或误导性报错（#28730、#28599），社区已提交多条相关修复。
- **安全修复合入节奏成为关注点**：shell-quote、simple-git 两个 CRITICAL 级 CVE 修复 PR 目前仍处于 Open 状态，依赖安全敏感的开发者正在跟进。

---

*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)（2026-08-12 抓取）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-12）

## 今日速览

今日无新版本发布。过去 24 小时内共有 41 条 Issue 更新，社区讨论集中在 **Windows 插件安装/更新失败**、**MCP 互操作性** 以及 **模型配置/选择混乱** 三大方向；其中 #4095 以 14 👍 成为今日最受关注问题。PR 侧仅有 3 个更新，主要涉及 CI 安全加固与开发容器配置。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

以下从 41 条更新 Issue 中挑选 10 条最值得关注：

### 1. Windows 插件 update 持续失败，VS Code 被指为元凶
- **#4095**：[Windows: plugin update fails with "Access is denied (os error 5)" while VS Code is running](https://github.com/github/copilot-cli/issues/4095)
- 社区关注度：👍 14，评论 2
- 重要性：Copilot 扩展持有的 watcher 句柄锁定了 `installed-plugins` 目录，导致 `copilot plugin update` 在 Windows 上必然失败。高 👍 数说明 Windows 用户受影响面广，是当前平台体验最大痛点。

### 2. Windows 上所有来源的 plugin install 均失败
- **#4151**：[plugin install fails with Access is denied (os error 5) on Windows for all sources](https://github.com/github/copilot-cli/issues/4151)
- 社区关注度：评论 3
- 重要性：无论是 marketplace、GitHub repo 还是本地目录，`copilot plugin install` 在 Windows 11 上 100% 失败。与 #4095 同属 Windows 文件访问权限问题，疑似底层 CLI 安装流程对文件锁处理不够健壮。

### 3. 恢复大会话内存暴涨 3-4 倍，疑似 1.0.74 回归
- **#4251**：[Resume of a large session OOMs / grinds one CPU core for ~70 min in 1.0.74](https://github.com/github/copilot-cli/issues/4251)
- 社区关注点：评论 3，👍 1
- 重要性：用户通过 A/B 测试定位到 1.0.74 相对 1.0.73 的回归：恢复同一个大 session，峰值 RSS 显著上升，长时间占用单核 CPU。长时间会话重度用户受影响明显。

### 4. MCP 响应中出现 BigInt 导致任务直接中止
- **#4211**：[Copilot CLI couldn't handle BigInt in structured MCP response](https://github.com/github/copilot-cli/issues/4211)
- 社区关注点：评论 3
- 重要性：MCP server 返回大数字时，CLI 抛出 `Do not know how to serialize a BigInt`，所有进行中任务被中止。MCP 生态正在快速扩展，这类序列化边界问题会阻碍企业级 MCP server 接入。

### 5. /config model 会清空全部 settings.json
- **#4431**：[Using /model config wipes all settings](https://github.com/github/copilot-cli/issues/4431)
- 状态：已关闭（Closed）
- 社区关注点：评论 3
- 重要性：在 1.0.79 中设置用户级模型时，`settings.json` 会被整体覆盖，属于高危数据丢失问题。虽然已关闭，但社区对配置写入逻辑的信任度受到很大影响。

### 6. 企业账户下所有 Claude 模型不可用
- **#4422**：[All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)
- 社区关注点：👍 3，评论 2
- 重要性：用户使用 Personal Enterprise 账户，昨天还能用 Claude 系列，今天全部不可选，回滚版本也无法恢复。企业策略模型可见性问题直接阻断日常开发。

### 7. Rubber Duck 评审没有坚持“跨模型族”设计
- **#4380**：[Rubber Duck uses same model family as primary session](https://github.com/github/copilot-cli/issues/4380)
- 社区关注点：评论 3
- 重要性：`rubber-duck` 的设计本意是提供跨模型族的对抗性评审，但实际会沿用主会话模型族，导致“第二意见”失去独立性。用户关注评审质量与模型选择治理。

### 8. 原生 tgrep 索引器在大 monorepo 中 OOM
- **#3976**：[native tgrep indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976)
- 社区关注点：评论 2
- 重要性：启用 `copilot_cli_tgrep` 实验后，`tgrep serve` 在会话启动时构建 trigram 索引，对大型 monorepo 无内存上限，会直接 OOM 杀死宿主机。性能与稳定性是大型项目团队的核心顾虑。

### 9. Copilot Free 在 Codespaces 中提示 “No model available”
- **#4405**：[Copilot Free in GitHub Codespaces: "No model available" after update](https://github.com/github/copilot-cli/issues/4405)
- 社区关注点：评论 1
- 重要性：Free 用户在 Codespaces 中启动 CLI 正常，但每次 prompt 都失败，提示检查 policy enablement。这也反映出 CLI 对 Free/Token/BYOK 等模型来源的检测和错误提示不够清晰。

### 10. GitLab MCP OAuth 因 RFC 8414 issuer mismatch 被拒绝
- **#4439**：[Copilot CLI 1.0.79 rejects GitLab MCP OAuth metadata with an RFC 8414 issuer mismatch](https://github.com/github/copilot-cli/issues/4439)
- 社区关注点：评论 1
- 重要性：GitLab Self-Managed MCP server 使用 OAuth 2.0 Dynamic Client Registration 时，CLI 因 issuer 校验不匹配而无法认证。说明 MCP OAuth 兼容性在真实企业环境中仍不够成熟。

## 重要 PR 进展

过去 24 小时内仅有 3 个 PR 更新，全部列出：

### 1. #4452：[Revert 5 copilot/fix with copilot](https://github.com/github/copilot-cli/pull/4452)
- 状态：已关闭（Closed）
- 说明：标题指向一次由 Copilot 辅助生成的“回滚 5 个修复”提交，目前已被关闭。摘要信息为空，可能是自动化整理或误提交。

### 2. #4449：[Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)
- 状态：Open（Draft）
- 说明：将仓库 PR 自动化从 `pull_request_target` 迁走，采用低权限的 `pull_request` workflow 执行不可信输入，并把需要仓库写权限的操作隔离到专门 workflow。属于 CI/CD 安全加固，能降低恶意 PR 提权风险。

### 3. #4428：[Add initial devcontainer configuration](https://github.com/github/copilot-cli/pull/4428)
- 状态：Open
- 说明：为仓库新增 devcontainer 配置，方便贡献者获得统一开发环境。PR 描述仅写“LGTM”，信息较简略，仍处于开放状态。

## 功能需求趋势

综合今日 Issue，社区最关注的几个功能方向如下：

### 1. MCP 生态与互操作性
- 关注 BigInt 序列化、OAuth issuer 校验、动态客户端注册等企业 MCP server 接入问题。
- 代表性 Issue：
  - [#4211 BigInt serialization](https://github.com/github/copilot-cli/issues/4211)
  - [#4439 GitLab MCP OAuth](https://github.com/github/copilot-cli/issues/4439)

### 2. 模型选择与成本治理
- 用户希望更可控的模型选择、透明的子代理模型使用，以及避免意外消耗高成本模型。
- 代表性 Issue：
  - [#4380 Rubber Duck model family](https://github.com/github/copilot-cli/issues/4380)
  - [#4432 rubber-duck model argument override](https://github.com/github/copilot-cli/issues/4432)
  - [#4377 GPT-5.6 delegates to Opus subagent](https://github.com/github/copilot-cli/issues/4377)

### 3. Windows 平台体验
- 插件安装/更新失败是 Windows 用户最高频问题，根因多与文件锁和权限处理有关。
- 代表性 Issue：
  - [#4095 VS Code watcher handles](https://github.com/github/copilot-cli/issues/4095)
  - [#4151 plugin install all sources fail](https://github.com/github/copilot-cli/issues/4151)

### 4. 性能与内存控制
- 大 session 恢复、原生搜索索引器、长时任务在大型仓库上需要更明确的内存上限和性能优化。
- 代表性 Issue：
  - [#4251 session resume OOM](https://github.com/github/copilot-cli/issues/4251)
  - [#3976 tgrep OOM](https://github.com/github/copilot-cli/issues/3976)
  - [#4448 search stuck](https://github.com/github/copilot-cli/issues/4448)

### 5. 权限与安全策略
- 社区希望更细粒度的权限控制、可配置的 `auto-allow-all`，以及企业级 sandbox 和 CLI 启停策略。
- 代表性 Issue：
  - [#3877 auto-allow permissions](https://github.com/github/copilot-cli/issues/3877)
  - [#4443 read-only vs write outside cwd](https://github.com/github/copilot-cli/issues/4443)
  - [#4446 policy to require sandbox](https://github.com/github/copilot-cli/issues/4446)

### 6. Skill/Plugin 生命周期语义
- 重复加载、显式调用失败、`disable-model-invocation` 行为冲突等问题，说明 skill/plugin 解析逻辑仍需打磨。
- 代表性 Issue：
  - [#4430 duplicate skills](https://github.com/github/copilot-cli/issues/4430)
  - [#4451 redundant slash skill reload](https://github.com/github/copilot-cli/issues/4451)
  - [#4438 disable-model-invocation unreachable](https://github.com/github/copilot-cli/issues/4438)

## 开发者关注点

- **Windows 文件锁问题亟需解决**：`plugin install/update` 在 VS Code 运行时会失败，用户被迫关闭编辑器才能操作，严重影响 Windows 生态。
- **大 session 与大型仓库的性能退化**：1.0.74 恢复 session 内存暴涨，tgrep 索引无上限导致 OOM，开发者对大仓库的稳定性信心下降。
- **模型配置体验混乱**：`/config model` 清空配置、用户默认模型不即时生效、auto 模式选中不可用模型，说明模型配置链路缺乏一致性验证。
- **MCP 企业接入门槛高**：BigInt 序列化错误和 GitLab OAuth 兼容性问题会直接阻断真实 MCP server 接入，且错误信息不够可操作。
- **权限提示粒度不足**：只读命令（如 `docker compose ps`）访问 cwd 外目录也会触发完整审批，开发者希望区分读写操作并支持默认放行策略。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-12

## 今日速览
过去 24 小时无新版本发布，社区讨论集中在长期未决的 **Memory System 功能请求**（#1283，34 条评论）以及两个新提交的 Issue 上。PR 方面，除 **可配置 thinking effort**（#2509）仍在开发外，另有 7 个稳定性 / 协议修复 PR 被关闭，其中多数来自外部贡献者。

---

## 社区热点 Issues

> 以下为过去 24 小时内更新的全部 3 条 Issue。

### 1. [#1283 Memory System - Persistent context across sessions（OPEN）](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **作者 / 创建 / 更新**：CatKang / 02-27 / 08-11（评论 34）
- **核心内容**：要求实现跨会话持久化记忆系统，支持 AI 管理的自动记忆与用户定义的手动指令，以保留项目上下文、编码习惯和用户偏好。
- **为何重要**：这是长时间悬而未决的高讨论量 Issue，反映用户对“连续工作流”的强烈需求；8 月 11 日仍有更新说明社区持续关注。

### 2. [#2601 Quote & Reply: comment on any selected part of an AI response in Kimi Web（OPEN）](https://github.com/MoonshotAI/kimi-cli/issues/2601)
- **作者 / 创建 / 更新**：topit / 08-11 / 08-11（评论 0）
- **核心内容**：建议在 Kimi Web 中支持对 AI 回复的任意片段（段落、代码块、计划步骤、 Diff 解释行）进行“引用并回复”，便于针对具体内容追问。
- **为何重要**：这是新提交的交互体验增强，说明用户希望更精细地控制与模型的对话上下文。

### 3. [#2600 Windows 中 PowerShell 7 默认从 D 盘启动时找不到路径（OPEN）](https://github.com/MoonshotAI/kimi-cli/issues/2600)
- **作者 / 创建 / 更新**：RooKichenn / 08-11 / 08-11（评论 0）
- **核心内容**：Bug 报告。当 PowerShell 7 默认启动目录设为 D 盘而非 C 盘系统目录时，打开 kimi code（v0.33）会提示路径找不到。
- **为何重要**：Windows 环境兼容性问题是高频反馈点，该问题影响使用自定义默认目录的开发者。

---

## 重要 PR 进展

> 以下为过去 24 小时内更新的全部 8 条 PR。其中 7 条已关闭（可能已合并），1 条开放。

### 1. [#2509 feat(kimi): configurable thinking effort and /effort command（OPEN）](https://github.com/MoonshotAI/kimi-cli/pull/2509)
- **作者 / 创建 / 更新**：n-WN / 07-18 / 08-11
- **内容**：新增可配置的 “thinking effort” 支持，并提供 `/effort` 命令。关联 Issue #2501，并兼容旧的 `reasoning_effort` 参数传递。
- **意义**：此功能若合并，用户可控制模型推理深度，是当前社区关注的核心能力之一。

### 2. [#2057 fix(acp): replace assert statements with proper RuntimeError exceptions（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/2057)
- **作者**：hobostay
- **内容**：将 `acp/session.py` 中 5 处 `assert` 替换为显式 `RuntimeError`，避免 Python `-O` 优化下断言被移除导致安全检查失效。
- **意义**：提升生产环境健壮性，属于关键防御性修复。

### 3. [#2056 fix(wire): eliminate TOCTOU race in WireFile.append_record（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/2056)
- **作者**：hobostay
- **内容**：修复 `WireFile.append_record` 中 `path.exists()` 与 `stat()` 之间的 TOCTOU 竞态条件，防止文件被删除时出现未处理异常。
- **意义**：消除文件写入路径的潜在崩溃，提高稳定性。

### 4. [#2055 fix(agentspec): replace assert with proper AgentSpecError exception（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/2055)
- **作者**：hobostay
- **内容**：将 `agentspec.py` 中的 `assert` 替换为显式 `AgentSpecError` 异常，确保关键检查在优化模式下仍然生效。
- **意义**：与 #2057 同属系统化替换 assert 的系列改进。

### 5. [#1328 Fix minor bugs in file tools and UI feedback（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/1328)
- **作者**：hobostay
- **内容**：修复 `StrReplaceFile` 多次编辑时替换计数计算错误等三个小 bug，提升文件操作正确性和 UI 反馈体验。
- **意义**：改善核心文件编辑工具的实际使用体验。

### 6. [#1082 fix(pyinstaller): filter non-existent dateparser cache files（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/1082)
- **作者**：hobostay
- **内容**：PyInstaller 打包时过滤 `dateparser` 不存在的懒加载缓存文件，避免全新环境中 `collect_data_files` 报错。
- **意义**：修复打包流程的 CI / 新环境兼容问题。

### 7. [#1077 fix: remove redundant mode validation in WriteFile tool（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/1077)
- **作者**：hobostay
- **内容**：删除 `WriteFile` 工具中重复的 `mode` 参数运行时校验（检查是否为 overwrite/append），简化代码。
- **意义**：移除冗余逻辑，降低维护成本。

### 8. [#1393 fix(acp): route shell commands through terminal args（CLOSED）](https://github.com/MoonshotAI/kimi-cli/pull/1393)
- **作者**：hanhan3344
- **内容**：修复 ACP Shell 终端执行时命令与参数路由问题，适配当前 ACP SDK 中基于 `terminal_id` 的响应形态，并添加 bash / PowerShell 回归测试。
- **意义**：提升 ACP 协议下跨平台 shell 命令执行的正确性。

---

## 功能需求趋势

从近期 Issue 与 PR 中可提炼出以下社区重点关注方向：

- **持久化与记忆能力**：跨会话保留上下文、项目模式、用户偏好（#1283）是最高频诉求，且长期未解决。
- **交互精细度**：支持对 AI 回复中任意片段进行引用、评论或追问（#2601），即“局部上下文交互”。
- **推理过程控制**：通过 `/effort` 命令或可配置参数调节模型思考深度（PR #2509），由用户权衡速度与质量。
- **环境兼容性与稳定性**：Windows 路径处理（#2600）、ACP 协议下 shell 命令路由（#1393）、并发/竞态条件修复（#2056）均反映开发者对跨平台稳定性的重视。
- **代码级健壮性**：多个 PR 将生产代码中的 `assert` 替换为显式异常（#2055、#2057），说明开发者关注 Python `-O` 模式下的行为一致性。

---

## 开发者关注点

- **Windows 体验仍是痛点**：PowerShell 7 默认目录为 D 盘时无法正常工作，且 issue 提交者为 v0.33 版本用户，表明该问题在当前版本仍存在。
- **会话延续性是刚需**：Memory System 获得 34 条评论且更新周期超长，开发者希望 CLI 能像 IDE 一样记住上下文，而不必每次重复说明项目背景。
- **安全/正确性细节敏感**：外部贡献者主动修复 `-O` 下 `assert` 失效、TOCTOU 竞态等隐蔽问题，说明用户群有较高工程素养，并期待官方维护底层可靠性。
- **新功能 PR 推进较慢**：#2509（thinking effort）已开放近一个月仍未合并，社区对配置化推理深度有期待，同时也希望官方加快 review 节奏。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-12

## 1. 今日速览

今日社区主要由 **TUI 2.0 稳定性修复** 和 **Claude Code 风格 slash 命令的需求浪潮** 构成：V2/next 分支的音频报错、插件加载、写入输出等多项问题均已在 PR 中收敛；同时用户 afonsoft 集中提交了 7 个新功能请求（/usage、/security-review、/verify 等），预示社区正期望 OpenCode 快速补齐类 Claude Code 的交互能力。

## 2. 版本发布

过去 24 小时内无新版本 Release。

## 3. 社区热点 Issues

以下是过去 24 小时评论数最多的 10 个 Issue，横跨 TUI、桌面端、模型兼容性和稳定性问题。

### 3.1 TUI 权限提示面板尺寸与展开状态不可配置
**#28191** | 评论 9 | 👍 0 | 状态: OPEN  
权限/审批提示面板硬编码为 `maxHeight: 15` 行且默认折叠（`expanded: false`），大 diff 场景下无法一览全貌。用户希望 `tui.json` 中新增配置项控制面板高度与默认展开状态。  
🔗 https://github.com/anomalyco/opencode/issues/28191

### 3.2 无限压缩循环：上下文压缩失败后死循环
**#27924** | 评论 8 | 👍 0 | 状态: OPEN  
`prompt.ts` 中的 session 循环在压缩失败（例如压缩状态丢失或摘要无效）时进入 `overflow → compact → still overflow → …` 的死循环，最终导致会话卡死。这是目前最影响长时间会话稳定性的核心 bug。  
🔗 https://github.com/anomalyco/opencode/issues/27924

### 3.3 桌面端关闭按钮应最小化到系统托盘
**#18134** | 评论 8 | 👍 2 | 状态: CLOSED  
Windows 11 用户期望点击关闭按钮后最小化到系统托盘而非退出应用（类似 Slack/Steam），已被社区标记关闭，但讨论热度与需求仍然存在。  
🔗 https://github.com/anomalyco/opencode/issues/18134

### 3.4 静默/后台压缩：不要把摘要流式输出到终端
**#13033** | 评论 5 | 👍 5 | 状态: CLOSED  
自动压缩触发时，摘要生成过程会逐字流式直播到聊天窗口，用户只能干等且打断阅读。社区希望有一个静默模式，压缩完成后只显示结果摘要。  
🔗 https://github.com/anomalyco/opencode/issues/13033

### 3.5 Zen 模型 gpt-5.6-luna / gpt-5.6-terra 上游请求失败
**#39831** | 评论 5 | 👍 1 | 状态: OPEN  
使用 `opencode` 提供的 Zen 服务时，gpt-5.6-luna 和 gpt-5.6-terra 持续报 HTTP 403，而 gpt-5.4-nano 等旧模型正常。疑似上游密钥/权限配置问题，影响新模型迁移。  
🔗 https://github.com/anomalyco/opencode/issues/39831

### 3.6 Chrome 风格标签页系统
**#12548** | 评论 5 | 👍 10 | 状态: CLOSED  
用户希望 TUI 支持多会话标签页，免去频繁回到 session list 切换上下文的麻烦。虽然已关闭，但 10 个 👍 表明多会话编排仍是社区强烈诉求。  
🔗 https://github.com/anomalyco/opencode/issues/12548

### 3.7 V2 TUI：ALSA 错误刷屏破坏终端显示
**#41763** | 评论 4 | 👍 1 | 状态: OPEN  
在无声卡的 Linux 主机上使用 V2 beta/next，每次滚动 slash-command 选择器都会触发 ALSA 初始化，错误信息直接覆盖 TUI 界面。此问题在今日已被 PR #41770 定位修复。  
🔗 https://github.com/anomalyco/opencode/issues/41763

### 3.8 VS Code 通知：agent 完成或需关注时提醒
**#39936** | 评论 4 | 👍 1 | 状态: OPEN  
已有 TUI、Desktop、CLI 的各系统通知能力，但 VS Code 插件仍缺失。用户希望 agent 异步完成时可推送 VS Code 原生通知。  
🔗 https://github.com/anomalyco/opencode/issues/39936

### 3.9 TUI 中的会话与子代理标签页
**#17838** | 评论 4 | 👍 6 | 状态: CLOSED  
与 #12548 类似，进一步要求展示子代理的独立标签页，以便在同一视口中编排多个 agent 任务运行。虽被关闭，但与 #12548 一并说明了标签页功能的持续社区呼声。  
🔗 https://github.com/anomalyco/opencode/issues/17838

### 3.10 多个 TUI 共享一个 server 时事件串扰
**#39181** | 评论 4 | 👍 0 | 状态: OPEN  
用户运行单个 `opencode serve` 并挂载多个 TUI（不同目录），侧边栏右下角的分支名偶尔显示为其他项目的分支，目录正确但分支串场。  
🔗 https://github.com/anomalyco/opencode/issues/39181

---

## 4. 重要 PR 进展

以下 10 个 PR 覆盖 TUI 渲染、插件加载、核心运行时与桌面端修复。

### 4.1 feat(tui): experiments via devtools bar, drafts stay put
**#41917** | 状态: OPEN | 作者: kitlangton  
将实验功能入口从 `/baldbeard` 彩蛋命令迁移到底部 DevTools 栏的 Experiments 项，并确保实验开关不会影响草稿保留。  
🔗 https://github.com/anomalyco/opencode/pull/41917

### 4.2 feat(opencode): add Claude Code ACP runtime
**#41904** | 状态: OPEN | 作者: stocky789  
通过 `@agentclientprotocol/claude-agent-acp` 将 Claude Code 作为 OpenCode 的新 runtime 接入，相关了 #5182、#20002、#24038 三个长期请求。  
🔗 https://github.com/anomalyco/opencode/pull/41904

### 4.3 fix(desktop): label windows by active tab
**#41729** | 状态: OPEN | 作者: maxipesfix  
修复 macOS Window 菜单无法区分多窗口的问题：桌面端窗口标题现在跟随活动标签页更新，关闭 #40490。  
🔗 https://github.com/anomalyco/opencode/pull/41729

### 4.4 fix(tui): stop retrying unavailable audio
**#41770** | 状态: OPEN | 作者: muyiyr  
直接关闭 #41763——音频引擎不可用时停止重试，释放失败的原生引擎与缓存声音，避免 ALSA 错误刷屏。  
🔗 https://github.com/anomalyco/opencode/pull/41770

### 4.5 fix(tui): truncate fractional mtimes in fresh plugin specifiers
**#41891** | 状态: CLOSED | 作者: kitlangton  
修复外部 TUI 插件加载失败问题：`freshSpecifier` 将 `stat.mtimeMs` 原始小数附加值拼入 import specifier，导致编译后的 `opencode2` 找不到兼容模块。  
🔗 https://github.com/anomalyco/opencode/pull/41891

### 4.6 fix(client): surface managed startup stderr
**#41793** | 状态: CLOSED | 作者: kitlangton  
托管后台服务启动失败时，现在会输出具体的 stderr（如端口冲突指引），而不是仅返回退出码。关闭 #41696。  
🔗 https://github.com/anomalyco/opencode/pull/41793

### 4.7 fix(tui): render instruction updates as compact notices
**#41900** | 状态: OPEN | 作者: kitlangton  
指令更新不再向 transcript 中倾倒完整模型指令文本，而是渲染为单行紧凑通知：`◈ Instructions updated: core/codemode`。  
🔗 https://github.com/anomalyco/opencode/pull/41900

### 4.8 fix(tui): show completed write output
**#41883** | 状态: OPEN | 作者: kitlangton  
V2 的 `write` 工具完成后，现在会展示语法高亮后的文件内容。这是 #41352 的 cherry-pick 版（原合并进了过期的 v2-migration 分支，从未到达 v2）。  
🔗 https://github.com/anomalyco/opencode/pull/41883

### 4.9 feat(server): web-standard fetch handler entry
**#41896** | 状态: CLOSED | 作者: kitlangton  
新增 `ServerFetch.make`：不绑定端口、不监听、不带信号处理器的 web-standard `(request) => Response` 处理器，嵌入方完全掌控生命周期。  
🔗 https://github.com/anomalyco/opencode/pull/41896

### 4.10 fix(session): fail empty assistant responses instead of recording success
**#41898** | 状态: OPEN | 作者: patil2001  
V2 当前会把“仅有 reasoning、无正文无工具调用”的助手响应记录为成功；此 PR 改为将其视为失败，关闭 #37372。  
🔗 https://github.com/anomalyco/opencode/pull/41898

---

## 5. 功能需求趋势

通过对今日全部 Issue 的分析，社区最关注的五个功能方向如下：

### 5.1 Claude Code 风格 slash 命令生态
用户 `afonsoft` 在今日集中提交了 7 个新命令请求：`/usage`（#41915）、`/security-review`（#41913）、`/verify`（#41912）、`/simplify`（#41911）、`/btw`（#41910）、`/approve`（#41909）、`/context`（#41908）。说明社区希望 OpenCode 在“内置命令化工作流”上快速对齐 Claude Code。

### 5.2 TUI 多会话与多代理编排
#12548（Chrome 标签页）、#17838（子代理标签）、#28191（权限面板可配置）三项合计 👍 16，多会话标签页、子代理状态可视化、可配置 UI 面板是 TUI 交互增强的最强共识。

### 5.3 IDE 与系统集成
#39936（VS Code 通知）、#18134（关闭最小化到托盘）代表用户希望 OpenCode 能在非 TUI 场景下无缝融入桌面与 IDE 工作流。

### 5.4 新模型与提供商兼容性
#39831（Zen 新模型 403）表明用户对 gpt-5.6 系列新模型接入有即时需求，模型供给链的稳定性正成为选择工具的关键因素。

### 5.5 非 UTF-8 文件编码支持
#37602（GBK 等编码参数）获得 2 👍，在东亚用户群体中具有一定代表性——编辑/写入工具目前强制 UTF-8，对存量项目构成现实障碍。

---

## 6. 开发者关注点

以下是开发者反馈中的高频痛点：

- **压缩循环无终止条件（#27924）**：上下文溢出后的压缩失败会引发无限循环，这是长会话稳定性的最大威胁。
- **无声音设备上的 ALSA 刷屏（#41763 / #41890）**：在无音频硬件的 Linux 主机上交互异常频繁触发 ALSA 初始化，错误信息直接破坏 TUI 渲染——已在 #41770 修复。
- **Windows 行尾被静默改写（#37090）**：apply_patch/write 工具会将 CRLF 转换为 LF，对 Windows 开发者构成实际代码污染。
- **LLM 重试无上限（#41848）**：`RETRY_MAX_DELAY` 被设置为 ~24 天，流式错误触发后 UI 将永久停在 “Thinking…”，用户完全无法感知错误。
- **实例启动挂起/僵尸 git 进程（#41806）**：Linux 下 bootstrap 间歇性永远等待，子进程 exit 后无人回收（`<defunct>`），TUI 虽可输入但 Enter 无法启动会话。
- **多 TUI 共享 server 的事件串扰（#39181）**：共享 daemon 架构下，目录、分支等会话上下文在多个 TUI 之间互相串引，影响多项目并行工作。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-12

> 数据来源：github.com/badlogic/pi-mono

---

## 今日速览

- 流式协议回归修复取得进展：#7982 已提交以恢复 `message_update` 事件中的 `usage` 字段，针对 #7911。
- Copilot 登录 429 限流问题仍在发酵，多起 Issue 指向组织级账号拥有 20+ 模型时触发，社区关注度高。
- 中国区新模型接入：PR #7989 提交了 Qwen Token Plan Individual CN 内置 provider，补齐国内订阅支持。

---

## 社区热点 Issues

精选过去 24 小时内更新最活跃、影响面最大的 10 个 Issue：

### 1. [CLOSED] #6187 — WSL 中 Pi 登录挂起（25 评论）
浏览器中完成 GitHub Copilot 设备授权后，WSL 内的 pi 客户端无法检测到已完成状态，一直卡在等待登录。涉及 WSL + 浏览器授权的联动问题，讨论热度最高。
🔗 https://github.com/badlogic/pi-mono/issues/6187

### 2. [OPEN] #7730 — Mac OS 长会话高 CPU 占用（10 评论，👍 8）
CPU 在 50–110% 之间波动，内存 600–800MB，疑似与会话长度/上下文大小相关。Mac 用户性能热点，获 8 个 👍。
🔗 https://github.com/badlogic/pi-mono/issues/7730

### 3. [CLOSED] #7846 — bun 运行时下 0.84.0/0.84.1 无法启动（10 评论）
`zlib.createZstdDecompress is not a function`，指向 undici 与 bun 的兼容性问题，是 0.84.0 的回归缺陷。
🔗 https://github.com/badlogic/pi-mono/issues/7846

### 4. [CLOSED] #7850 — Copilot 登录 429：拥有 20+ 可用模型的组织账号（7 评论，👍 7）
设备授权成功后，Copilot 登录报 `429 Too Many Requests`。多个组织级用户复现，模型列表过多触发限流，获 7 个 👍。
🔗 https://github.com/badlogic/pi-mono/issues/7850

### 5. [OPEN, inprogress] #7911 — 0.84.0 流式事件丢失 `usage` 字段（2 评论）
#7290 的修复移除了 `message_update` 上的 `message` 字段，但 `usage` 也随之消失，导致 RPC/JSON 协议在 `message_end` 之前无任何用量信息。已有修复 PR #7982。
🔗 https://github.com/badlogic/pi-mono/issues/7911

### 6. [OPEN] #7836 — Edit 模糊匹配忽略空白差异（6 评论，👍 1）
`normalizeForFuzzyMatch` 不折叠连续空白，导致相同内容因空白长度不同而匹配失败。小模型在处理 edit 时高频踩坑。
🔗 https://github.com/badlogic/pi-mono/issues/7836

### 7. [OPEN] #7553 — compaction 需要独立的思考级别配置（8 评论）
自动/手动压缩时无条件复用当前会话 thinking level，用户希望为压缩单独设置 reasoning budget。
🔗 https://github.com/badlogic/pi-mono/issues/7553

### 8. [OPEN] #7829 — Windows 下无效 settings.json 被静默忽略（3 评论）
`C:\Users\...` 这类反斜杠路径导致 JSON 非法，但 Pi 不报配置错误，反而抛出误导性的 “bash not found”。Windows 用户配置排障成本高。
🔗 https://github.com/badlogic/pi-mono/issues/7829

### 9. [CLOSED] #7966 — `--thinking` 命令行参数无效（3 评论）
`pi --thinking off "prompt"` 仍沿用上一次的 thinking 模式，参数被忽略，CLI 行为与文档不符。
🔗 https://github.com/badlogic/pi-mono/issues/7966

### 10. [CLOSED] #7947 — 【P0】CMD 下重复输出、内存泄漏（2 评论）
Windows CMD + DeepSeek-V4-Flash 环境下，终端输出大量重复的 `0` 且逐行增多，Ctrl+C 无法终止，属严重稳定性问题。
🔗 https://github.com/badlogic/pi-mono/issues/7947

---

## 重要 PR 进展

精选 10 个关键 PR（含正在开发与已合并）：

### 1. [OPEN] #7989 — feat(ai): 新增 Qwen Token Plan Individual CN provider
为中国区（cn-beijing）添加 qwen-token-plan-individual-cn 内置 provider，复用 `QWEN_TOKEN_PLAN_CN_API_KEY`，对应 #7847。
🔗 https://github.com/badlogic/pi-mono/pull/7989

### 2. [OPEN] #7982 — fix(coding-agent): 流式事件中保留 usage
恢复 JSON/RPC `message_update` 上的累计 provider usage，同时保持无 `message` 快照、流大小线性。附带回归测试，关闭 #7911。
🔗 https://github.com/badlogic/pi-mono/pull/7982

### 3. [CLOSED] #7978 — fix(edit): 规范化单对象 edits 并折叠模糊匹配空白
将单对象 `{oldText, newText}` 自动转为数组；同时让 `normalizeForFuzzyMatch` 折叠连续空白，修复 #7836。这是 #7904 的增强版。
🔗 https://github.com/badlogic/pi-mono/pull/7978

### 4. [OPEN] #7981 — fix(ai): 为所有 provider 映射 models.dev 成本层级
修复 #7912：除了 github-copilot，其余 provider 未使用 `getModelsDevCost`，导致成本计算为纯标量、无法表达 tiered 定价。
🔗 https://github.com/badlogic/pi-mono/pull/7981

### 5. [CLOSED] #7905 — fix(config): 细化 pnpm 检测并校验托管安装
`detectInstallMethod()` 只要路径含 `/pnpm/` 就判定为 pnpm，导致 `$PNPM_HOME` 下非 pnpm 管理的包被误判；同时避免在未托管时给出错误的升级命令。
🔗 https://github.com/badlogic/pi-mono/pull/7905

### 6. [CLOSED] #7866 — feat(tui): TuiAltScreen 新增 copyOnSelect 选项
允许用户关闭全屏 TUI 下鼠标选择文本自动复制到剪贴板的行为，默认保持 `true` 兼容现有体验。
🔗 https://github.com/badlogic/pi-mono/pull/7866

### 7. [CLOSED] #7865 — fix(tui): SelectList 与 model-selector 支持 pageUp/pageDown
修复 base SelectList 和 model-selector 缺少 `tui.select.pageUp/pageDown` 键位处理的问题，统一所有选择器导航行为。
🔗 https://github.com/badlogic/pi-mono/pull/7865

### 8. [CLOSED] #7897 — fix(coding-agent): 子代理继承当前会话配置
修复子代理跟随“任意最近会话”的模型/思考级别问题，改为继承发起方当前会话的 model/thinking 配置。
🔗 https://github.com/badlogic/pi-mono/pull/7897

### 9. [CLOSED] #7972 — fix(tui): 选择复制走宿主剪贴板，让 “Copied!” 名副其实
原来直接写 OSC 52 序列并无条件显示 “Copied!”。在 macOS Terminal.app、VTE 终端及未开启 OSC 52 的 tmux 下实际失败，现改用宿主剪贴板通道。
🔗 https://github.com/badlogic/pi-mono/pull/7972

### 10. [OPEN] #7722 — feat(coding-agent): 新增 `--use-theme` 主题覆盖
支持单主题（`pi --use-theme dark`）或按外观切换（`pi --use-theme dayowl/nightowl`），仅对当前运行生效，不落盘。
🔗 https://github.com/badlogic/pi-mono/pull/7722

---

## 功能需求趋势

### 模型与提供商扩展
- **中国区模型接入**：#7989（Qwen Token Plan CN）、#7847 等需求说明国内用户有明确付费渠道接入诉求。
- **模型网关**：PR #7901 尝试接入 Cloudflare AI Gateway（AI binding），延续内置 provider 多元化趋势。
- **成本精度**：#7981 要求所有 provider 采用 models.dev 的 tiered 定价，而非四维标量。

### TUI / 终端体验
- **剪贴板与鼠标行为**：#7866 / #7972 围绕 OSC 52、copyOnSelect、终端差异展开，多 PR 专门修正跨终端一致性（iTerm2、Ghostty、tmux）。
- **富文本渲染**：#7956（HTML 导出渲染 Mermaid）、#7936（tmux 下 Kitty 图形协议内联图片）表明用户期望 TUI 与导出场景的渲染能力对齐。
- **滚动反馈**：#7970 为全屏 transcript 增加 `↓` 滚动指示器，提升长会话导航体验。

### 配置与扩展性
- **细粒度控制**：#7553（compaction 独立 thinking level）、#7722（--use-theme）都指向同一个方向：运行级参数应可覆盖会话级配置。
- **子代理行为**：#7897 让子代理继承发起会话的模型/思考级别，而不是全局“最后设置”。
- **扩展 API 能力**：#7986 提出向扩展暴露 session-bound 的 off-transcript 流式调用，支持扩展实现自定义模型交互。

### 会话与协议
- **流式协议数据完整性**：#7911 暴露了优化流大小（移除 message 快照）时误删 usage 的教训，社区对协议字段的语义界定更加敏感。
- **JSONL 版本一致性**：#7937 显示 `pi-coding-agent` 与 `pi-agent-core` 对 v3/v4 会话格式的判定存在分歧，需要统一版本策略。

---

## 开发者关注点

### 高频痛点
1. **GitHub Copilot 登录 429 限流** — #7850 与 #7428 指向同一问题：组织账户模型列表过大时，登录请求触发限流。影响订阅用户与组织用户，社区呼声较高。
2. **回归缺陷修复速度** — 0.84.x 引入多个回归：#7846（bun 崩溃）、#7911（usage 丢失）、#7947（CMD 输出爆炸）。开发者希望发布前增加对 bun/Windows 的兼容性验证。
3. **配置错误提示不友好** — #7829：非法 JSON 被静默吞掉，反而报 `bash not found`，排障困难；#7939 则指出硬编码键位绕过 keybinding 配置，与项目规范冲突。
4. **Edit 工具容错性不足** — #7836 的空白差异问题、#7944 的 edits 序列化字符串问题，说明模型输出参数形态多样，工具层需要更宽容的归一化。

### 值得注意的新方向
- **会话间通信**：PR #7968 提交了 intercom 扩展，实现运行中两个 Pi 会话的实时消息 + `ask_predecessor` 幽灵响应器（虽然已关闭，但展示了社区对协作式 multi-session 场景的兴趣）。
- **性能基准**：#7739 提出为启动时间和内存设定可量化的预算，对标 jcode 的基准数据，而非“凭感觉优化”。
- **跨平台体验**：Windows（CMD、Git Bash）与 WSL 的兼容性问题占据多席，表明 Pi 的用户基础正向非 macOS/Linux 主流环境扩展。

---

*日报完。数据基于 2026-08-12 抓取的 GitHub Issue/PR 元信息，去重并按活跃度筛选。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-12）

## 今日速览

今日核心动向集中在 **Web Shell 与会话管理的稳定性加固**：昨日发布 v0.21.10 正式版，新增 ACP 推理强度配置能力与 Web Shell 图片预览；同时连续发布 v0.21.11-preview.0 和 v0.21.10-nightly 两个迭代版本，重点修复 Web Shell 会话导航安全与 serve 会话续接行为。社区方面，**tmux/iTerm 闪屏** 与 **长任务执行中断** 仍是开发者反馈最多的高频痛点。

## 版本发布

### v0.21.10（正式版）
- **ACP 支持配置推理强度（reasoning effort）**，可在 Default 至 Max 范围内通过会话配置调整（[#8526](https://github.com/QwenLM/qwen-code/pull/8526)）
- **Web Shell 图片预览**：点击上传或粘贴的图片即可在 artifact 中打开
- Qwen Live Host v0.1.1：修复沙箱运行时探测时机（[#7734](https://github.com/QwenLM/qwen-code/pull/7734)）与 autofix 扫描选取序列化

### v0.21.11-preview.0
- `fix(web-shell)`: 强制会话导航的 prompt 安全校验（[#8931](https://github.com/QwenLM/qwen-code/pull/8931)）
- `chore(serve)`: 记录会话续接准入日志

### v0.21.10-nightly.20260812.a64d1291d2
- 包含与 preview 相同的两个补丁（会话导航安全 + 会话续接日志）

---

## 社区热点 Issues（10 个）

### 1. [P1] Session 大容量恢复超时导致当前会话丢失
**Issue #8678** | 评论 7 | [链接](https://github.com/QwenLM/qwen-code/issues/8678)
- **内容**：当 session restore 数据量过大导致超时时，当前会话无法保留。作者 doudouOUC 在 issue 中同步了修复进度——PR #8691 已合并，实现了超时契约、迟到请求安全与可观测性。
- **关注点**：core 级会话管理对内存与延迟敏感，属 P1 优先级。

### 2. iTerm + SSH + tmux 场景闪屏问题
**Issue #8562** | 评论 6 | [链接](https://github.com/QwenLM/qwen-code/issues/8562)
- **内容**：MacBook 通过 iTerm2 SSH 到 Ubuntu 服务器并在 tmux 中使用 Qwen Code，对话时分屏内持续闪烁。用户用 Qwen 3.8 Max 排查后自判为 Qwen Code 版本问题。
- **关注点**：与今日新增的 #8901（mac 上 iTerm 闪屏）、#8962（tmux 下无法使用）高度重复，疑似同一渲染缺陷。

### 3. Provider 更新后自定义模型保留时提示反复出现
**Issue #8504** | 评论 5 | [链接](https://github.com/QwenLM/qwen-code/issues/8504)
- **内容**：v0.21.4 开始，当 provider 配置中含有用户自定义模型时，`Built-in Provider Update` 提示在更新完成后反复出现，无法消除。

### 4. [P2] 主分支 CI E2E 测试失败
**Issue #8959** | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8959)
- **内容**：E2E 测试在 main 分支 commit `a64d1291d2f6...` 上未产出测试结果即失败，由机器人自动追踪。

### 5. OpenAI 兼容 API 错误在 stream-json 模式下被报告为成功
**Issue #8920** | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8920)
- **内容**：v0.21.9 中，当 OpenAI 兼容 API 返回错误时，`--output-format stream-json` 仍输出 `"subtype":"success"` 且退出码为 0，**将错误伪装为成功执行**，对 CI 调用方有误导风险。

### 6. [P2] Windows 下点击聊天中的文件链接无法打开（盘符冒号被 URL 编码）
**Issue #8644** | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8644)
- **内容**：VS Code 报 `Failed to open file: cannot open file:///d%3A/aplikacja/...`，盘符 `d:` 中的冒号被编码为 `%3A`，导致无法跳转。

### 7. [P2] `--approval-mode` 与 `--auth-type` 参数缺失于 `qwen --help`
**Issue #8897** | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8897)
- **内容**：两个参数已注册并可校验（传非法值会报错），但不出现在帮助信息中，影响 CLI 可发现性。

### 8. [P2] daemon 给每个 ACP 子进程授权宿主机 50% 内存，未按子进程数均分
**Issue #8182** | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8182)
- **内容**：`qwen serve` 为每个 `qwen --acp` 子进程设置基于宿主机内存的 V8 old-space 上限，且缓存单值不随子进程数变化，存在资源耗尽风险。

### 9. 图片加载崩溃（v0.21.2 回归）
**Issue #8957** | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8957)
- **内容**：自 v0.21.2 起，读取图片时 Qwen Code 立即崩溃，v0.21.1 为最后可用版本。已被标记 `need-retesting`。

### 10. 并行 read_file 调用结果被合并
**Issue #8940** | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8940)
- **内容**：v0.21.9 中多个并行 `read_file` 的结果混在同一个结果块中，难以区分归属文件，影响工具结果可追溯性。

---

## 重要 PR 进展（10 个）

### 1. fix(acp): 隔离 worktree 会话的 workspace 设置与上下文文件解析
**PR #8152** | [链接](https://github.com/QwenLM/qwen-code/pull/8152)
- **内容**：git worktree 中会话的 `settings.json` 与 `QWEN.md` 此前被解析到项目根目录而非 worktree 目录，本 PR 修复该不一致问题（文件操作已正确）。

### 2. fix(serve): 关闭 daemon ACP 资源保护缺口
**PR #8947** | [链接](https://github.com/QwenLM/qwen-code/pull/8947)
- **内容**：对 #8911 的后续补充。daemon 拥有的通道在 ACP SDK 分发前校验有界 JSON-RPC 信封，限制活跃 handler、预响应、SDK 前出站操作与在途请求。

### 3. fix(cli): 协调终端 teardown 流程
**PR #7837** | [链接](https://github.com/QwenLM/qwen-code/pull/7837)
- **内容**：让交互会话在异步资源清理前执行一次同步、幂等的终端 teardown，覆盖正常清理、进程直接退出、SIGINT/SIGTERM/SIGHUP，并保留信号退出码。修复 Kitty 键盘推送。

### 4. feat(core): 从 API 元数据解析模型模态
**PR #8529** | [链接](https://github.com/QwenLM/qwen-code/pull/8529)
- **内容**：通过 models.dev 为已配置模型及运行时模型切换补齐缺失的输入模态信息，内置精简模态快照，后台刷新远程元数据，冷启动不等待。

### 5. feat(web-shell): tmux 后端的交互式终端子代理
**PR #8613** | [链接](https://github.com/QwenLM/qwen-code/pull/8613)
- **内容**：允许 agent 在 daemon 宿主机的 tmux 会话中运行交互式 CLI（REPL、其他 agent CLI、curses/TUI 应用），Web Shell 提供实时交互视图。

### 6. fix(core): 解决 Qwen 3.8 推理预算冲突
**PR #8525** | [链接](https://github.com/QwenLM/qwen-code/pull/8525)
- **内容**：修复 DashScope Qwen 3.8 请求在不同配置层同时携带 `reasoning_effort` 与 `thinking_budget` 的冲突，按既有优先级合并。

### 7. fix(core): 接受带点的 Claude 小版本别名并新增 Opus 5 令牌上限
**PR #8585** | [链接](https://github.com/QwenLM/qwen-code/pull/8585)
- **内容**：解析器支持 `claude-opus-4.8` 这类 LiteLLM/Vertex/Bedrock 风格的虚线小版本别名；补充 Opus 5 的 token 限额。

### 8. feat(review): 新增 Maven 多模块验证
**PR #8777** | [链接](https://github.com/QwenLM/qwen-code/pull/8777)
- **内容**：在工具链适配边界注册 Maven adapter，`review build-test` 可识别 Maven 根目录并映射多模块结构，扩展代码审查的构建验证能力。

### 9. feat(web-shell): 改进 thinking 与工具进度展示
**PR #8872** | [链接](https://github.com/QwenLM/qwen-code/pull/8872)
- **内容**：Web Shell 紧凑模式下 Ctrl+O 可隐藏 thinking 行，并将仅被 thinking 行分隔的普通工具组合并为标准可展开聚合视图；agent、todo、question 等边界保持独立。

### 10. feat(web-shell): 支持工作区文件上传
**PR #8874** | [链接](https://github.com/QwenLM/qwen-code/pull/8874)
- **内容**：Web Shell composer 支持拖拽/选择文件上传，多文件顺序上传、进度显示、取消、自动冲突重命名与内联文件预览。

---

## 功能需求趋势

从近 24 小时更新的 Issues/PRs 提炼出以下高频需求方向：

1. **Web Shell 能力扩展**：上传文件、推理强度控制、交互式终端子代理——Web Shell 正从聊天界面演进为完整远程开发工作台。
2. **终端渲染稳定性**：tmux 闪屏（#8562, #8901, #8962）、图片加载崩溃（#8957）、文字选择行为（#8738）表明终端 UI 层是当前最大体验短板。
3. **ACP/daemon 资源治理**：内存上限均分（#8182）、资源保护缺口（#8947）、超时安全恢复（#8678），服务端架构进入精细化资源管控阶段。
4. **CLI 可发现性与正确性**：`--help` 参数缺失（#8897）、headless 模式错误误报成功（#8920），非交互式场景的可靠性受到关注。
5. **多平台兼容**：Windows 文件链接（#8644）、macOS 闪屏、Linux tmux 渲染——跨平台适配仍是持续投入方向。

---

## 开发者关注点

- **tmux/远程终端体验差**是今日最强反馈声音，多位用户描述"闪瞎眼""完全无法用"，建议缩小显示尺寸才能勉强使用，已新增 #8962、#8901 两个复现报告，希望尽快定位渲染层根因。
- **长任务执行不可靠**：有用户反馈在 yolo/auto 模式下运行 Python 脚本或 delete 命令时会卡住不动，无法完成数小时甚至数天的后台任务（#8963），并对模式准确性提出质疑。
- **配置与提示不一致**：Provider 更新提示与真实行为脱节（#8948）、自定义模型保存后提示反复出现（#8504），开发者对配置系统的信任度受到影响。
- **错误上报可信度**：OpenAI API 失败被包装为"success"退出（#8920）引发了对 CI/自动化场景误判的担忧，呼吁 headless 模式严格区分结果状态。
- **回归问题处置**：v0.21.2 起的图片加载崩溃（#8957）和 v0.21.4 起的提示循环（#8504）持续多日未解，用户对回归响应速度有期待。

---
*数据截至 2026-08-12，基于 GitHub QwenLM/qwen-code 仓库公开信息整理。*

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-12

> 数据来源：`Hmbown/DeepSeek-TUI`（当前 GitHub 仓库显示为 `Hmbown/CodeWhale`）

## 今日速览

今日社区焦点集中在 **v0.9.5 的 Auto-Review 模式回归**：工具调用被静默阻断、后台 shell 事件串扰父模型流、agent 工具 32 字段 schema 导致模型报错，一连串运行时问题集中暴露。与此同时，维护者提交了 web 站点审计修复 PR，外部贡献者在消息复制、会话快照恢复、新模型网关接入等方向持续输出，社区活跃度较高。

## 版本发布

过去 24 小时无新 Release。

## 社区热点 Issues

### 1. #5323 `[bug]` v0.9.5 回归：Auto-Review 模式静默阻断所有 Bash 调用和写操作
- **作者**: USTHzhanglu | 创建: 2026-08-12 | 评论: 2 | 状态: OPEN
- **摘要**: 升级到 v0.9.5 后，Auto-Review 模式从原本自动批准工具调用，变为对所有 Bash/写操作提示"destructive action requires explicit review"，且没有明显 UI 反馈，导致自动化工作流静默卡死。
- **重要性**: 高严重度回归，直接影响自动代理的核心执行链路，v0.9.x 早期版本行为正确。
- **社区反应**: 刚创建即有 2 条评论，属紧急性 bug。
  链接: https://github.com/Hmbown/CodeWhale/issues/5323

### 2. #5325 `[bug]` runtime: 子代理后台 shell 完成事件不应传给父模型流
- **作者**: Hmbown | 创建: 2026-08-12 | 评论: 0 | 状态: OPEN
- **摘要**: 父模型 turn 流会收到所有被追踪后台 shell job 的 `background_shell_completion` 事件，包括子代理 spawn 的 job——而子代理的完成事件已经通过自身 runtime 传递过一遍，产生重复。
- **重要性**: 多代理/子代理场景下的事件路由污染，会造成父模型上下文噪声和误判，属于并发架构级缺陷。
- **社区反应**: 新建 0 评论，但维护者亲自提出，指向明确修复方向。
  链接: https://github.com/Hmbown/CodeWhale/issues/5325

### 3. #5324 `[bug]` agent tool: 简化 32 字段 schema，模型频繁报错
- **作者**: Hmbown | 创建: 2026-08-12 | 评论: 0 | 状态: OPEN
- **摘要**: 模型侧 `agent` 工具带有 32 个属性的 JSON schema、零必填字段，同时承载 8 种 action，runtime parser 还接受多种别名。模型输出容易命中 schema 校验错误。
- **重要性**: 工具 schema 设计是模型可靠性的核心，过大的 schema 会显著提高错误率、增加 token 消耗，对 DeepSeek 系列模型尤为明显。
- **社区反应**: 新建 0 评论。
  链接: https://github.com/Hmbown/CodeWhale/issues/5324

### 4. #4683 `[bug]` DeepSeek completions URL 间歇性报错
- **作者**: demian-welt | 创建: 2026-07-22 | 评论: 3 | 状态: OPEN
- **摘要**: 长时间对话后，请求 `https://api.deepseek.com/v1/chat/completions` 间歇性失败，报 `Warn Network error`，期望行为是稳定取得结果。
- **重要性**: 网络端点 flaky 是社区高频反馈，直接影响生产可用性，3 条评论持续跟进。
- **社区反应**: 有多位用户共鸣，疑似与长上下文 keep-alive 有关。
  链接: https://github.com/Hmbown/CodeWhale/issues/4683

### 5. #4956 `[bug]` WSL2 环境网络连接失败
- **作者**: RelicOfTesla | 创建: 2026-07-28 | 评论: 2 | 状态: OPEN
- **摘要**: WSL2 下安装后重启 shell，启动并配置 codewhale 即报 `provider Network error: Connection failed`，无法连接 API provider。
- **重要性**: WSL2 是 Linux 用户常见的 Windows 开发环境，环境特定问题会阻塞大量潜在用户。
- **社区反应**: 两个独立 issue 都指向网络层，或与代理/防火墙设置有关。
  链接: https://github.com/Hmbown/CodeWhale/issues/4956

### 6. #4568 `[bug]` 新版斜杠指令（/xxx）响应迟缓，性能不如上一版
- **作者**: whp233 | 创建: 2026-07-19 | 评论: 1 | 状态: OPEN
- **摘要**: 输入 `/xxx` 斜杠指令后需等待较长时间才有反应，上一版本几乎即时；怀疑新版性能优化回退。环境为 Windows 10 最新版。
- **重要性**: 中文用户提交的性能回归报告，斜杠指令是高频操作，卡顿感会严重影响日常体验。
- **社区反应**: 评论 1 条但 issue 一直未被关闭，问题持续存在。
  链接: https://github.com/Hmbown/CodeWhale/issues/4568

### 7. #4564 `[bug]` Windows 下 `--model`/`--toolsets` 预置标志被当作单个参数
- **作者**: alozano978-spec | 创建: 2026-07-19 | 评论: 2 | 状态: OPEN
- **摘要**: Windows npm 全局安装时，`codewhale --model X --toolsets Y exec ...` 会拼接为单个参数被消费；只有 `codewhale exec --auto --max-steps N` 可用。建议支持预置标志或增加 `CODWHALE_MODEL`/`CODWHALE_TOOLSETS` 环境变量。
- **重要性**: CLI 参数解析的跨平台一致性，Windows 用户的命令行体验问题。
- **社区反应**: 有 workaround 讨论但尚未修复。
  链接: https://github.com/Hmbown/CodeWhale/issues/4564

### 8. #5241 `[bug]` Pricing 端点 503，所有会话显示 unverified_live_pricing
- **作者**: alitvak69 | 创建: 2026-08-04 | 评论: 1 | 状态: OPEN
- **摘要**: 从 0.8.67 升级到 0.9.3 后，成本显示失效，所有 provider 会话均标记 `unpriced_reasons = ["unverified_live_pricing"]`，即使切换三个不同 provider 路由都一样。
- **重要性**: 费用可视化是用户决策的重要参考，升级后完全失效属于功能性回归。
- **社区反应**: 评论较少但问题具体、可复现。
  链接: https://github.com/Hmbown/CodeWhale/issues/5241

### 9. #4959 `[enhancement]` 提议 `stop` 命令：机械工具调用拦截
- **作者**: ronohara | 创建: 2026-07-29 | 评论: 8 | 状态: OPEN
- **摘要**: 在 YOLO 模式或深层自主工作流中，文本命令如 `+ stop` 或 `stop` 会被忽略。建议增加 `/stop` 命令，在 runtime 层拦截工具调用（STOP-word intercept），以备紧急停止。
- **重要性**: 安全控制机制，尤其对于自主执行能力强的 Agent 工具，是用户安全感的刚需。
- **社区反应**: 8 条评论，社区讨论最热烈的 feature request 之一。
  链接: https://github.com/Hmbown/CodeWhale/issues/4959

### 10. #5316 `[EPIC]` EPIC-005：CodeWhale TUI Crate 分解（Umbrella）
- **作者**: aboimpinto | 创建: 2026-08-10 | 评论: 2 | 状态: OPEN
- **摘要**: 本体仓库 TUI crate 结构分解的 umbrella 跟踪 issue，所有子 EPIC、FEAT 和 PR 均在本 issue 汇报，面向提升模块化和可维护性。
- **重要性**: 架构级重构计划，预示未来代码结构将有较大调整，影响所有贡献者。
- **社区反应**: 社区贡献者提出的架构演进方向，关注度高。
  链接: https://github.com/Hmbown/CodeWhale/issues/5316

## 重要 PR 进展

> 过去 24 小时内更新共 6 个 PR，全部列出。

### 1. #5225 `[CLOSED]` feat(acp): 通过 session/prompt 开放 file/search/git/patch/shell 工具
- **作者**: rafaelcavalheri | 创建: 2026-08-03 | 状态: CLOSED
- **摘要**: ACP 服务器的 `session/prompt` 原本只流式返回模型文本、从不执行工具调用，导致 Zed 等编辑器集成只能获得纯聊天能力。此 PR 使 ACP 桥接层获得真实代码编辑能力。
- **重要性**: ACP 集成能力的里程碑式补强，对 Zed/第三方 adapter 生态至关重要。状态已关闭，需关注合并结果。
  链接: https://github.com/Hmbown/CodeWhale/pull/5225

### 2. #5326 `[OPEN]` web: 审计修复 — i18n 对齐、复制/间距、测试修复
- **作者**: Hmbown | 创建: 2026-08-12 | 状态: OPEN
- **摘要**: 对 Codewhale 社区网站（`web/`）做审计后的快速修复，包括 TOOL_SURFACE.md 引用断言更新、复制文案/间距修正，其余站点验证通过。
- **重要性**: 维护者主导的网站质量维护，保证文档与工具表面契约一致。
  链接: https://github.com/Hmbown/CodeWhale/pull/5326

### 3. #5319 `[OPEN]` fix(tui): 复制消息时不带视觉 rail 装饰
- **作者**: XhesicaFrost | 创建: 2026-08-11 | 状态: OPEN
- **摘要**: 修复用户/助手单元格的 Copy Message 行为：改为复制 canonical 源内容而非渲染后的 Ratatui 行；Tool/Thinking/System 等复杂单元格仍走完整 transcript 路径。
- **重要性**: 直接对应 issue #5314，提升 TUI 剪贴板内容的可用性，外部贡献者高质量修复。
  链接: https://github.com/Hmbown/CodeWhale/pull/5319

### 4. #5320 `[OPEN]` fix(session): 分离快照读取与崩溃恢复
- **作者**: h3c-hexin | 创建: 2026-08-11 | 状态: OPEN
- **摘要**: 新增 `load_session_snapshot` 做无副作用读取（工具调用运行时安全），新增 `recover_session_for_resume` 返回修复统计，使宿主持有自身 transcript 锁并做确定性恢复。
- **重要性**: 解决会话恢复与运行中读取的竞态条件，增强崩溃恢复可靠性。
  链接: https://github.com/Hmbown/CodeWhale/pull/5320

### 5. #5321 `[OPEN]` feat: 将 OrcaRouter 注册为命名 provider
- **作者**: XiaoHuo888-hue | 创建: 2026-08-11 | 状态: OPEN
- **摘要**: 参考 OpenRouter 集成方式注册 OrcaRouter（OpenAI 兼容网关），`ORCAROUTER_API_KEY`（以 `sk-orca-` 开头）可访问 150+ 模型，模型选择器和文档同步更新。
- **重要性**: 新增第三方模型网关支持，拓展模型生态选择，外部贡献者驱动。
  链接: https://github.com/Hmbown/CodeWhale/pull/5321

### 6. #5318 `[OPEN]` feat(tui): Windows 宿主终端窗口固定为最前迷你窗口
- **作者**: SparkofSpike | 创建: 2026-08-11 | 状态: OPEN
- **摘要**: 为 Windows 宿主终端新增"缩小平铺"（PiP）能力：右键菜单或 `/pin` 命令将终端缩至 640x400 并置顶，再次触发恢复原尺寸，类似画中画。
- **重要性**: Windows 场景下的实用 UI 增强，适用于边看文档边跑 agent 的工作流。
  链接: https://github.com/Hmbown/CodeWhale/pull/5318

## 功能需求趋势

从今日全部 Issues 中可提炼出四个社区最关注的功能方向：

- **自主工作流安全机制**：`/stop` 命令、Auto-Review 行为回归、子代理事件隔离——用户对 Agent 失控的担忧越来越具体，要求 runtime 层提供可预测的拦截与隔离机制。
- **工具 schema 对模型友好化**：#5324 提出的 32 字段 schema 简化诉求，反应了模型侧工具调用的稳定性和 token 效率正成为 agent 可靠性的关键瓶颈。
- **跨平台兼容性**：Windows CLI 参数解析、WSL2 网络连接、Windows PiP 窗口支持——多平台用户群体增长带来的差异化需求日益凸显。
- **UI 细节与性能回退**：复制内容带 UI 装饰、宽屏终端不填充、斜杠指令卡顿等，用户对 TUI 体验打磨和性能退化非常敏感。

## 开发者关注点

- **v0.9.5 可靠性回退**：Auto-Review 静默阻断、后台事件重复投递、pricing 端点 503，多点并发说明 0.9.x 引入的架构改动需要更多回归验证。
- **网络层稳定性**：DeepSeek URL 间歇失败 + WSL2 无法连接，网络问题在支持请求中占比最高。
- **模型 schema 负担**：32 字段工具 schema 对模型输出约束过弱、易错，开发者希望精简为按 action 拆分的小 schema。
- **事故可恢复性**：自动化流程长时间运行后 hang 住且无入口停止，用户亟需 runtime 级 stop 和可靠的会话恢复机制，而非仅依赖文本指令。
- **开源协作活跃**：#5319/#5320/#5321/#5318 均为外部开发者提交，且质量较高，维护者反馈积极，社区生态向好。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*