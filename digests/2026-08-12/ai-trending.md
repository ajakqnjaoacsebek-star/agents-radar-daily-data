# AI 开源趋势日报 2026-08-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-12 02:00 UTC

---

# AI 开源趋势日报 2026-08-12

> 数据来源：GitHub Trending + Topic Search  
> 说明：Trending 榜单中非 AI 项目（nvm、manim、awesome-mac、project-based-learning、Front-End-Checklist 等）已剔除。带 `*` 的仓库为 Trending 新上榜项目，原数据未提供当前总星数，表中总量以 `0` 占位，括号内为今日新增 star 数。

## 1. 今日速览

今日 GitHub AI 热榜几乎被“智能体工程化”主导：`prime-agent` 以 +1,138 stars 领跑，`agency-agents`、`semantica`、`orca` 等新项目紧随其后，社区关注点从“单个 Agent 演示”转向“可并行、自改进、可治理的 Agent 基础设施”。`anthropics/skills` 与 `addyosmani/agent-skills` 同天走热，Agent Skills 有望成为 MCP 之后的新标准化层。RAG 方向出现“代码库知识图谱”细分热点，如 `code-graph-rag`、`graphify`。垂直场景 Agent 也在爆发，教育、视频制作、股票分析等应用密集上榜。

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,825（+80） | 最主流的开源模型框架，支持文本、视觉、音频和多模态模型训练与推理；今日再次进入 Trending，说明基础层仍保持极高活跃度。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,955 | 老牌 ML 框架，生产环境覆盖面极广；在 AI 基础设施中依然是不可忽视的底层依赖。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,325 | 深度学习研究与训练的核心框架，Agent、LLM、多模态项目大多基于 PyTorch 生态构建。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,298 | 本地运行 LLM 的最便捷工具，支持 Kimi、GLM、DeepSeek、Qwen、Gemma 等大量开源模型；是个人开发者上手本地模型的首选入口。 |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0*（+893） | 面向上下文与“可问责 AI 系统”的图原生基础设施；今日 Trending 高增长，反映社区对 AI 可解释、可治理基础层的兴趣上升。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 36,697 | React/Angular/移动端等场景的 Agent 前端栈与 Generative UI 框架；让 Agent 能力快速嵌入真实产品界面。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,490 | 面向 Claude Code、Codex、Cursor 等编码 Agent 的 harness 性能优化系统，提供 skills、memory、security 等能力；超 23 万星体现 Agent 工程化的核心热度。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,530 | 老牌通用 Agent 项目，目标是把自主 AI 自动化带给所有人；始终是 Agent 领域的重要风向标。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,010 | Agent 工程化平台，提供工具调用、记忆、编排与 RAG 能力；是 LLM 应用开发中最常用的框架之一。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,834 | 让 Agent 直接操作浏览器并自动化执行在线任务；是“Agent + Web 交互”方向的热门项目。 |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0*（+1,138） | 自改进的 RLM 编码 Agent，面向长时自治编码任务；今日 stars 增量最高，是当天热度第一的 AI 项目。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0*（+958） | 将“完整 AI 代理机构”打包为多 Agent 集合，包含前端、社区运营、内容创意等专家角色；今日新增 stars 第二。 |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0*（+875） | Agent 开发环境（ADE），用于高效运行和编排“并行 Agent 编队”，支持桌面、移动端与 VPS；多智能体协同工作流方向值得关注。 |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 0*（+485） | Anthropic 官方公开的 Agent Skills 仓库；Skills 正在成为 MCP 之后新的 Agent 能力封装标准。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,126 | 可视化构建 Agentic workflow 与 RAG 流水线的 AI 应用平台；支持云端、VPC 自托管，是从原型到生产的常用方案。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,513 | 用户友好的自托管 AI 对话界面，支持 Ollama、OpenAI API 等；是本地 LLM 应用入口中的热门选择。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,649 | 基于 AI 大模型与自动化工作流一键生成高清短视频；内容创作自动化方向的代表项目。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,306 | AI 生产力工作室，集成智能 Chat、自主 Agent 和 300+ 助手；统一访问主流前沿 LLM。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | 0*（+812） | “终身个性化辅导”教育 Agent，提供持续陪伴式学习；今日 Trending 高增长，教育垂直场景备受关注。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0*（+748） | 开源的企业级 Agent 管理应用，用于在工作中管理多个 Agent；企业级 Agent 治理与协作需求正在快速升温。 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 0*（+458） | 开源 Agentic 视频制作系统，包含 12 条生产管线、100+ 工具和 700+ agent skill 文件；把 AI 编码助手扩展为视频工作室。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,170（+243） | LLM 驱动的多市场股票智能分析系统，集成行情、新闻、决策看板与自动推送；金融垂直场景 Agent 的代表。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,440 | 从零逐步实现 ChatGPT-like LLM 的经典教程；是社区理解 LLM 训练与推理原理的首选资源。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,567 | 2 小时从零训练 64M 参数 LLM 的教学项目；显著降低了“自己训练大模型”的学习门槛。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,467 | 面向系统工程师的 Apple Silicon LLM 推理教学项目，可构建微型 vLLM + Qwen；关注推理引擎实现细节。 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | HTML | 1,774 | Agentic RL 精选资源列表；Agent 与强化学习结合正成为前沿研究热点。 |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | TypeScript | 1,424 | 日本語 LLM 汇总清单；反映非英语大模型社区活跃度持续提升。 |
| [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) | — | 617 | 大模型“遗忘/去学习”方向资源库；AI 安全、合规与版权治理相关主题开始形成社区分支。 |
| [SeekingDream/Static-to-Dynamic-LLMEval](https://github.com/SeekingDream/Static-to-Dynamic-LLMEval) | — | 500 | 面向大模型评测数据污染问题的论文资源；动态评测成为新关注方向。 |
| [AIDASLab/Awesome-Diffusion-LLM](https://github.com/AIDASLab/Awesome-Diffusion-LLM) | — | 97 | 大型语言扩散模型论文清单；扩散模型在 LLM 领域的应用是较新的生成范式。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,342 | 将代码库、文档、SQL Schema、PDF 等转换为可查询知识图谱，无需向量库；为 Claude Code、Cursor、Gemini CLI 提供图检索能力。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,451 | 为编码 Agent 提供跨会话持久记忆，自动捕获会话并用 AI 压缩，再注入未来上下文；是 Agent 记忆层热门方案。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,297 | 领先的开源 RAG 引擎，融合 RAG 与 Agent 能力，为 LLM 构建更强上下文层。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,064 | 面向 AI Agent 的通用记忆层；解决 Agent 长期记忆、个性化和跨会话一致性问题。 |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Rust | 58,939 | 极速搜索引擎，现已支持 AI 混合检索；适合作为 RAG 应用的轻量检索底座。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,567 | 文档 Agent、OCR 与 RAG 领域的领先框架；是连接私有数据与 LLM 的重要桥梁。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,605 | 云原生向量数据库，面向大规模向量 ANN 检索；是生产级 RAG 基础设施的核心组件之一。 |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | 0*（+341） | 面向 monorepo 的 RAG 方案，用 AI + 知识图谱查询、理解并编辑多语言代码库；今日 Trending 上榜，代码库语义检索成为新热点。 |

## 3. 趋势信号分析

今日热榜的 AI 信号高度集中在“智能体工程化”。`PrimeIntellect-ai/prime-agent` 以 +1,138 stars 领跑，`agency-agents`（+958）、`semantica`（+893）、`orca`（+875）紧随其后，说明社区对可并行、自改进、可治理的 Agent 基础设施需求爆发。`anthropics/skills` 与 `addyosmani/agent-skills` 同天获得关注，暗示 Skills 正在成为继 MCP 之后的下一代 Agent 能力打包标准。RAG 方向出现 `code-graph-rag` 这类面向 monorepo 的知识图谱检索，结合 `graphify` 的流行，“代码库语义检索”成为新热点。垂直场景方面，教育（`DeepTutor`）、视频制作（`OpenMontage`）、股票分析（`daily_stock_analysis`）持续涌入，LLM 应用正从聊天工具转向生产力工具。

## 4. 社区关注热点

- [anthropics/skills](https://github.com/anthropics/skills) 与 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)：官方与社区同步押注 Agent Skills，可能是 Agent 生态下一轮标准演进方向。  
- [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent)：今日 stars 增量第一，自改进 RLM 编码 Agent 代表“长期自治任务”方向。  
- [stablyai/orca](https://github.com/stablyai/orca) 与 [paperclipai/paperclip](https://github.com/paperclipai/paperclip)：一个做并行 Agent 编队运行，一个做企业内 Agent 管理，表明多人/多 Agent 协作治理开始成为刚需。  
- [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) 与 [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)：“代码库级 RAG + 知识图谱”正在成为开发者工具领域最实用的 AI 落地场景之一。  
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) 与 [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)：教育、视频等高价值垂直场景的 Agent 应用开始获得爆发式关注。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*