# AI 开源趋势日报 2026-08-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-13 02:02 UTC

---

# AI 开源趋势日报（2026-08-13）

## 筛选说明
已剔除 Trending 中与 AI/ML 无关的通用项目：`localsend`、`spiderfoot`、`MediaCrawler`、`everyone-can-use-english`；主题搜索结果中的 `Front-End-Checklist`、`netdata`、`airflow`、`julia` 等通用工具/前端/基础设施项目亦不展开。

> 注：Trending 接口部分未返回总 star 数，表中以 `0` 占位，括号内为今日新增。

## 一、今日速览

- 今日 Trending 共 17 个仓库，其中约 13 个与 AI 直接相关；**Agent 类项目占比最高**，并行 agent 开发环境、多智能体工作流、agent 管理工具集中爆发。
- **Claude Code 生态仍是重要内容源**：`diagram-design` 以今日 +2,855 登顶；ECC、claude-mem 等 agent 性能/记忆工具保持高热度。
- **垂直模型与端侧模型开始登榜**：金融基础模型 Kronos、音视频生成模型 LTX-2、14MB 端侧模型 needle 同日出现。
- **AI 生产力应用持续吸星**：`ppt-master` 今日 +476，`macro` 今日 +227，AI 办公/团队协作场景成熟度提升。
- **RAG 赛道由 RAGFlow 继续领跑**，同时图结构、长期记忆、向量数据库等上下文基础设施成为下一阶段竞争焦点。

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+2855） | 为 Claude Code 设计的 29 种编辑级图表模板，纯 HTML/SVG 自包含。今日热榜第一，反映“agent 原生内容/资产”正在成为新品类。 |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0（+845） | 图原生的上下文基础设施，面向可审计 AI 系统。今日 +845，指向“图/上下文工程”这一新兴技术方向。 |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0（+421） | NVIDIA NeMo 生态中的 Rust 项目，面向 LLM/智能体工程。今日 +421，显示大厂正在加码 Rust AI 基础设施。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,375 | 本地/自托管 LLM 运行的事实标准，持续支持最新开源模型。仍是 LLM 部署基础层最常用工具之一。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,019 | 模型定义、推理与训练的标准框架。支撑文本、视觉、音频与多模态模型的生态基座。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 166,469 | 面向 LLM 的搜索、抓取与 Web 交互 Context API。Agent 获取外部实时数据的关键基础设施。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,251 | Rust 生态中的模块化 LLM 应用框架。与 Switchyard 一起代表 Rust 在 AI 应用层的快速渗透。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0（+1235） | 面向“并行 agent 舰队”的开发环境，可用自己的订阅运行任意编码 agent。今日 +1,235，多 agent 并行协调成为核心热点。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+1873） | 一套“AI 机构”式的多角色 agent 集合，覆盖前端、内容、社区运营等场景。今日 +1,873，低门槛脚本化 agent 工作流受社区欢迎。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0（+571） | 开源 agent 管理应用，帮助团队在工作中统一管理 agent。今日 +571，说明 agent 正从“单点试用”走向“企业级治理”。 |
| [embabel/embabel-agent](https://github.com/embabel/embabel-agent) | Kotlin | 0（+40） | JVM 上的 Agent 框架，补齐 Java/Kotlin 企业级 AI 应用开发栈。今日新增虽不高，但技术方向具有代表性。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 229,609 | “与你一起成长的 agent”框架。搜索热榜超高星项目，属于 Agent 赛道头部力量。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,763 | 面向 Claude Code、Codex 等的 agent harness 性能优化系统，覆盖技能、记忆、安全、研究型开发。典型“agent 工程化”代表。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,102 | Agent 工程化平台，长期稳定维护的 LLM 应用开发底座。是理解 AI Agent 生态绕不开的基础项目。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,978 | 让 AI agent 直接操作浏览器的自动化工具。Agent 需要“眼睛和手”，Web 交互方向热度持续。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 45,652（+476） | AI 将文档/主题转化为原生 PowerPoint，支持动画、图表、旁白和自定义模板。今日 +476，AI 办公落地的又一个爆款场景。 |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0（+227） | 统一团队工作空间，把邮件、聊天、文档、任务、CRM、Agent 用共享 AI 记忆串联。代表 AI 原生协作应用的新形态。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,358 | AI 生产力工作室，支持智能聊天、自主 agent 与 300+ 助手。统一接入前沿 LLM，是客户端 AI 产品的高星代表。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,618 | 用户友好的本地 LLM Web 界面，兼容 Ollama、OpenAI API。作为“开源 ChatGPT 前端”长期保持高热度。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,820 | 利用 AI 与自动化工作流，根据主题一键生成高清短视频。AI 内容创作工具中的现象级开源项目。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,644 | AI 求职助手：扫描职位、A-F 评分、定制简历、跟踪申请。垂直工作流 AI 应用快速聚星。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,582 | LLM 驱动的多市场股票智能分析系统，覆盖行情、新闻、决策看板与自动推送。金融垂直 AI 应用需求旺盛。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python | 0（+266） | 面向金融市场“语言”的基础模型。今日 +266，显示行业大模型开始向金融垂直领域深度渗透。 |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0（+65） | LTX-2 音视频生成模型的官方推理与 LoRA 训练包。开源生成式媒体模型持续迭代，创作者生态受益。 |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+315） | 仅 14MB 的基础模型，面向手机、穿戴设备、智能家居与机器人。端侧小模型是当前极具想象力的方向。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,534 | 从零开始手写 ChatGPT 类 LLM 的经典教程。反映社区“深入理解模型原理”的长期学习需求。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,351 | 动态神经网络与 GPU 加速深度学习框架。所有现代 LLM 训练/微调最重要的基础框架之一。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,982 | 通用机器学习框架。虽然今日未见爆发，但作为 AI 基础设施始终是社区底座。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,575（+139） | 领先的开源 RAG 引擎，融合检索增强与 Agent 能力，为 LLM 提供上下文层。今日仍保持增长，RAG 赛道标杆项目。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,600 | 领先的文档 agent 与 OCR 平台，也是 RAG 应用开发核心框架。搜索热榜高星，生态稳定。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,701 | 将代码库、文档、SQL Schema、PDF 转化为可查询知识图谱；无需向量库，做确定性 AST 解析。代表“无向量 RAG/图 RAG”新路线。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,556 | 为编码 agent 提供跨会话持久上下文，自动压缩并注入相关记忆。是 agent 长期记忆层的重要开源方案。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,142 | 面向 AI agent 的通用记忆层。记忆与 RAG 结合，是智能体从“无状态”走向“有状态”的关键组件。 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 132,347 | 100+ AI Agents、Agent Skills 与 RAG Apps 的开源合集。虽为资源库，但直接反映 LLM 应用生态的广度。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,615 | 云原生向量数据库，面向可扩展的向量 ANN 搜索。是生产环境 RAG/知识库最常用的基础设施之一。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,942 | 高性能、大规模向量数据库与向量检索引擎。Rust 实现的向量数据库在性能和可靠性上优势明显。 |

## 三、趋势信号分析

今日热榜最强烈的信号是 **“Agent 舰队化”**：从 `stablyai/orca` 的并行 agent 开发环境，到 `agency-agents` 的多角色 agent 集合，再到 `paperclip` 的 agent 管理 App，社区已不再只关注单个 agent，而是关注**大规模使用、编排、治理与记忆共享**。

其次，**Claude Code 生态仍在溢出**。`diagram-design` 这类“prompt/模板资产”能登顶热榜，说明 agent 原生的内容本身已成为新的开源热点。同时，ECC、claude-mem 等技能/记忆/性能优化项目保持高星，编码 agent 正从“能用”走向“可工程化”。

第三，**Rust 与图/记忆基础设施加速上位**。NVIDIA NeMo/Switchyard、rig、macro 同时出现，Rust 在 AI 运行时和 agent 基础设施中的存在感明显增强；semantica、Graphify、claude-mem 则把上下文从传统向量检索扩展到**知识图谱与长期记忆**。

最后，Kronos、LTX-2、needle 揭示模型层的**垂直化与端侧化**：金融基础模型、开源音视频生成、14MB 端侧模型各有代表，可能与近期多模态开源发布和端侧 AI 部署趋势密切相关。

## 四、社区关注热点

- **Agent 管理与多 Agent 编排**：重点关注 `stablyai/orca`、`paperclipai/paperclip`、`msitarzewski/agency-agents`。它们代表“单个 agent 功能”转向“agent 团队如何被管理、调度和治理”。
- **Claude Code / 编码 Agent 资产**：重点关注 `cathrynlavery/diagram-design`、`affaan-m/ECC`、`thedotmack/claude-mem`。prompt、技能、记忆、性能优化正在模块化为可复用的“agent 原生资产”。
- **图/知识/记忆基础设施**：重点关注 `semantica-agi/semantica`、`Graphify-Labs/graphify`、`mem0ai/mem0`。向量 RAG 正在向图结构、长期记忆与上下文工程演进。
- **垂直与端侧模型**：重点关注 `shiyu-coder/Kronos`、`Lightricks/LTX-2`、`cactus-compute/needle`。金融、音视频生成、微型端侧模型是下一波模型层机会。
- **Rust AI 基础设施**：重点关注 `NVIDIA-NeMo/Switchyard`、`0xPlaygrounds/rig`。Rust 正在从系统软件进入 AI 运行时与 agent 框架层，值得提前布局。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*