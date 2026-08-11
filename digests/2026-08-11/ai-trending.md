# AI 开源趋势日报 2026-08-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-11 10:24 UTC

---

# AI 开源趋势日报（2026-08-11）

## 筛选说明

- 已从 Trending 榜单剔除与 AI/ML 无关的项目：`LadybirdBrowser/ladybird`（浏览器）、`opa334/Dopamine`（iOS 越狱）、`NanmiCoder/MediaCrawler`（通用爬虫）等。
- 已从主题搜索结果中剔除仅带 AI 标签但核心非 AI 的项目：`thedaviddias/Front-End-Checklist`、`siyuan-note/siyuan`、`JuliaLang/julia`、`netdata/netdata`、`MariaDB/server` 等。
- 以下表格优先收录 Trending 新上榜项目与主题搜索中高 star 的代表性项目。

---

## 今日速览

今日 AI 开源热榜呈现明显“Agent 工程化”趋势：`prime-agent` 以 **+2,642** stars 领跑，`agency-agents`、`semantica`、`agent-skills` 紧随其后。上下文/RAG 赛道同样活跃，`firecrawl` 与 `code-graph-rag` 分别从 Web 上下文和代码知识图谱切入。`ComfyUI` 仍以 **+922** stars 守住生成式视觉阵地；`weathernext`、`TradingAgents` 则代表 AI 向科学计算和金融垂直场景深入。整体来看，社区关注点正从“单点模型能力”转向“Agent 的技能、记忆、工具与上下文基础设施”。

---

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,932 | 端到端开源机器学习框架。搜索榜中 star 总量最高的 AI 基础设施之一，仍是深度学习生态基石。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,256 | 本地运行 LLM 的开源运行时。已快速跟进 Kimi-K2.6、GLM-5.2、DeepSeek 等新模型，是本地 AI 部署的标准入口。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 165,516（+835） | 面向 AI Agent 的网页搜索、抓取与上下文 API。今日 +835 stars，成为 Agent 获取在线上下文的重要基础设施。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,582 | 统一文本、视觉、音频和多模态模型的定义、推理与训练框架。社区生态最广泛的 transformers 库。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,310 | 动态神经网络框架。与 TensorFlow 并列的 AI 研究/生产基础工具。 |
| [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) | C++ | 75,847 | 经典开源 OCR 引擎。广泛嵌入文档解析、RAG 预处理管线。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | Python | 66,947 | 经典机器学习库。数据科学和传统 ML 任务的基础工具。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0（+2,642） | 面向编码工作流与长时自主任务的 self-improving RLM Agent。今日热榜第一，代表“自治 Agent + 自改进”方向发展。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+1,349） | 一个包含多种专家 Agent 的“AI 代理公司”。今日 +1,349 stars，展示多角色智能体协作从概念走向产品化。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | JavaScript | 0（+659） | 面向 AI 编码 Agent 的生产级工程技能集。今日 +659 stars，验证 “Agent Skills” 正在成为可复用的新工程资产。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,333 | Agent harness 性能优化系统，提供 skills、instincts、memory、security 等能力。适合 Claude Code、Codex、Cursor 等编码 Agent。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 228,737 | “The agent that grows with you” 的个性化 Agent 框架。与 AutoGPT 同量级的高关注度项目。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,510 | 自动化 AI Agent 平台，愿景是让每个人都能使用和构建 AI。通用 Agent 领域最老牌的明星项目之一。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 143,963 | Agent 工程平台。LangChain 仍是构建 LLM Agent 应用最常用的编排层之一。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,742 | 让 AI Agent 能够操作浏览器完成线上任务。Web Agent 方向的核心基础设施。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | 0（+922） | 最流行的模块化 Diffusion 模型 GUI、API 与后端。今日 +922 stars，说明开源图像生成社区依然活跃。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,076 | 构建 Agentic Workflows、RAG Pipelines 的协作式 AI 平台。适合团队从原型到生产的一站式部署。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,456 | 支持 Ollama、OpenAI API 的用户友好 AI 界面。本地部署场景最常用的前端入口之一。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,561 | 利用 AI 大模型和自动化工作流一键生成高清短视频。AI 内容创作方向的高 star 项目。 |
| [google-deepmind/weathernext](https://github.com/google-deepmind/weathernext) | Python | 0（+325） | DeepMind 天气预测项目。今日 +325 stars，代表 AI for Science 正在走向主流开源。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0（+177） | 多智能体 LLM 金融交易框架。今日 +177 stars，是 AI 金融垂直应用的典型代表。 |
| [danielmiessler/LifeOS](https://github.com/danielmiessler/LifeOS) | TypeScript | 0（+315） | 帮助个人从“当前状态”迁移到“理想状态”的 AI 爬坡框架。今日 +315 stars，关注 Agent 在个人生活规划中的落地。 |
| [ruvnet/RuView](https://github.com/ruvnet/RuView) | Rust | 0（+154） | 将商用 WiFi 信号转换为实时空间智能、生命体征监测和存在感知。今日 +154 stars，探索非视觉传感 + AI 的新方向。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,374 | 从零用 PyTorch 一步步实现 ChatGPT 类 LLM。是系统学习大模型原理最受欢迎的教程项目之一。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,553 | 用 2 小时从 0 训练 64M 参数 LLM。兼顾教学与工程验证，开源训练路线清晰。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,238 | 用 Rust 构建模块化、可扩展的 LLM 应用。Rust 在 AI 工具链中的地位正在上升。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,466 | 面向系统工程师的 LLM 推理教学项目，目标是构建 Tiny vLLM + Qwen。理解推理栈的一个优秀入口。 |
| [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) | Rust | 75 | 基于 Candle 从零构建的纯 Rust Decoder-only LLM。探索 Gated DeltaNet、稀疏注意力与 MoE 的轻量实现。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | 0（+682） | 面向 Monorepo 的“终极 RAG”，用知识图谱让 AI 查询、理解和编辑多语言代码库。今日 +682 stars，代码 RAG 方向爆发。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,133 | 把代码、文档、SQL Schema、PDF 等转换为可查询知识图谱。无需向量库，而是用确定性 AST 解析构建边关系。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,376 | 为 AI Agent 提供跨会话持久记忆：自动捕获、AI 压缩并在未来会话注入相关上下文。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,248 | 开源 RAG 引擎，将 RAG 与 Agent 能力融合，是大模型应用中最流行的上下文层之一。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,014 | 通用 AI Agent 记忆层。解决跨会话记忆问题，是 RAG/知识库与 Agent 结合的关键组件。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,556 | 领先的文档 Agent 与 OCR 平台，也是经典 RAG 框架。LlamaIndex 构成了大量 RAG 应用的地基。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,603 | 云原生高性能向量数据库。面向大规模向量 ANN 检索，是 RAG 系统的常见基础设施。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,914 | 高性能向量数据库与向量搜索引擎。为新一代 AI 应用提供大规模向量检索能力。 |

> 注：Trending 榜单原始数据中部分仓库未给出可靠 total stars，故显示为 0；括号内为今日新增。

---

## 趋势信号分析

今日最明显的信号是 AI Agent 从“对话工具”走向“自治工程系统”。`prime-agent`（+2,642）以自改进、长时运行为卖点爆发，`agency-agents`（+1,349）与 `agent-skills`（+659）则说明“Agent 技能/角色”正被拆成可复用的工程资产。第二，上下文层成为新战场：`firecrawl`（+835）抓取 Web 上下文，`semantica`（+970）构建图原生上下文，`code-graph-rag`（+682）把代码库变成知识图谱——模型能力已不再是主要瓶颈，结构化、可追溯的上下文才是重点。第三，垂直 AI 应用继续细化：`weathernext` 代表 AI for Science，`TradingAgents` 深入金融，`LifeOS` 落地个人规划。新概念如 RLM Agent、Graph-Native Infrastructure、Vectorless RAG 登榜，说明社区正在探索比“接 API”更深的 Agent 范式。`ollama` 同步支持 Kimi-K2.6、GLM-5.2 等新模型，也反映出开源权重发布与下游工具链迭代仍紧密联动。

---

## 社区关注热点

- **`PrimeIntellect-ai/prime-agent`**：今日最火项目（+2,642），自改进编码 Agent，值得观察长时自治任务如何落地。
- **`addyosmani/agent-skills` 与 `msitarzewski/agency-agents`**：分别代表“技能”和“角色/多智能体拆解”，是把 Agent 经验产品化的两个重要方向。
- **`vitali87/code-graph-rag` 与 `Graphify-Labs/graphify`**：用知识图谱为代码库建索引，正在成为 AI 理解和编辑 Monorepo 的关键基础设施。
- **`firecrawl/firecrawl` 与 `semantica-agi/semantica`**：Web 上下文与图原生上下文的双入口，Agent 需要更高质量、更可解释的上下文。
- **`google-deepmind/weathernext`**：AI 走进科学计算，气象垂直可能是下一个大模型落地的重要场景。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*