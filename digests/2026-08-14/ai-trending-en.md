# AI Open Source Trends 2026-08-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-14 02:00 UTC

---

# AI Open Source Trends Report — 2026-08-14

**Filter note:** Excluded non-AI/ML repos from the trending list, such as `holehe`, `SpiderFoot`, and `manim`. Topic-search repositories are already AI-tagged and were filtered by relevance and momentum.

---

## 1. Today's Highlights

Agent Skills are the breakout story: `cathrynlavery/diagram-design` (+4,475 today), `anthropics/skills`, and `kepano/obsidian-skills` all point to a rapidly forming ecosystem around reusable agent capabilities. At the same time, context and memory infrastructure is becoming a first-class layer — `semantica-agi/semantica` (+713), `macro-inc/macro` (+1,239), and `infiniflow/ragflow` (+465) show intense interest in giving agents durable, structured memory. Edge/on-device AI is also accelerating with a 14MB foundation model (`cactus-compute/needle`, +769) and local-first apps like `FluidVoice` and `modly`. Finally, `NVIDIA-NeMo/Switchyard` (+408) signals a new need: routing and benchmarking across the exploding landscape of LLM providers and models.

---

## 2. Top Projects by Category

> For topic-search-only repos, today's star delta is not available and is marked as "—".

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,487 (—) | Local LLM runtime with support for recent models including Kimi-K2.6, GLM-5.2, MiniMax, and DeepSeek. Remains the default self-hosted inference layer for the community. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 167,000 (—) | Web context API for search, scraping, and browser interaction at scale. A core data layer for agentic and RAG applications. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,193 (—) | The agent engineering platform for LLM applications. Still the most widely used orchestration framework for custom agents and tool use. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0 (+328) | Local UI to run and train LLMs and diffusion models, including Qwen3.8, Kimi K3, Gemma 4, and DeepSeek-V4. +328 today shows sustained demand for frictionless local fine-tuning. |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+713) | Graph-native infrastructure for context and accountable AI systems. Early traction (+713 today) suggests structured context is a major unsolved problem. |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0 (+408) | Routes LLM traffic across models and providers while preserving OpenAI/Anthropic API compatibility. Enables flexible model selection, benchmarking, and cost optimization. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,865 (—) | Idiomatic Java library for LLM-powered applications on the JVM. Important for enterprise agents and RAG inside Spring/Quarkus stacks. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,299 (—) | LLM evaluation platform covering 100+ datasets and major model families. Increasingly relevant as teams must compare fast-moving open-weight releases. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+4475) | 29 editorial diagram types for Claude Code, delivered as self-contained HTML + SVG. Today's #1 trending repo, showing explosive interest in improving AI-generated output quality. |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 0 (+312) | Public repository for Agent Skills. This is becoming the packaging standard for reusable agent capabilities. |
| [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) | TypeScript | 0 (+241) | Open-source all-in-one AI agent workspace. Runs Claude Code, Codex, and 100+ integrations plus MCP with shared memory. |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0 (+778) | A complete "AI agency" of specialized agents, from frontend wizards to Reddit community managers. +778 today shows strong appetite for multi-agent teams. |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | — | 0 (+292) | Agent skills for Obsidian, teaching agents to use Obsidian CLI and open formats. A signal that knowledge tools are being rewired for agent access. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,597 (—) | The long-standing open platform for accessible autonomous agents. Continues to be a reference point for agentic AI. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,123 (—) | Makes websites accessible to AI agents and automates online tasks. A key building block for agent-driven web workflows. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,380 (—) | Collaborative platform for building agentic workflows and RAG pipelines. One of the most complete self-hostable LLM application platforms. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0 (+1239) | Unified team workspace spanning email, chat, docs, tasks, agents, calls, and CRM, linked by shared AI memory. +1,239 today makes it one of the strongest new entries. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,722 (—) | User-friendly AI interface supporting Ollama, OpenAI API, and more. The default self-hosted chat UI for many local LLM users. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,702 (—) | Local-first agent experience with a complete all-in-one LLM workspace. Positions "owning your intelligence" as the core value proposition. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,430 (—) | AI productivity studio with 300+ assistants and unified access to frontier LLMs. Strong example of consumer-facing AI aggregation. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,157 (—) | Automates short-video generation from a topic or keyword using AI and workflow automation. Remains a dominant vertical AI application. |
| [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice) | Swift | 0 (+76) | On-device macOS dictation app with custom-trained AI enhancement. A local, privacy-first alternative to Wispr Flow. |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | TypeScript | 0 (+118) | Desktop app for generating 3D models from images using local AI on your GPU. Highlights the move toward private, hardware-accelerated creator tools. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,752 (—) | Open-source AI job search that scans portals, evaluates listings with a structured rubric, and tailors CVs. Example of AI agents entering practical personal workflows. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0 (+769) | A 14MB foundation model for phones, wearables, smart homes, and robots. +769 today shows serious excitement around ultra-small local models. |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0 (+205) | Official inference and LoRA training package for the LTX-2 audio-video generative model. A direct signal of open generative video momentum. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,079 (—) | The central open model-definition framework for text, vision, audio, and multimodal models. Still the default interface for modern open-weight AI. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,614 (—) | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. The reference learning resource for model internals. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,483 (—) | Learn LLM inference systems on Apple Silicon by building a tiny vLLM + Qwen stack. Useful as inference engineering becomes a core skill. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 316 (—) | On-device LLM inference powered by X-bit quantization. Complements the edge-AI trend visible in today's trending list. |
| [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) | Rust | 76 (—) | Decoder-only LLM built from scratch in pure Rust using Candle. Signals growing interest in non-Python training and inference stacks. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,050 (+465) | Leading open-source RAG engine that fuses RAG with agent capabilities. +465 today confirms RAG+agents as the dominant context layer pattern. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,623 (—) | The leading document agent and OCR platform. A core framework for connecting enterprise data to LLMs. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,658 (—) | Captures everything an agent does during a session, compresses it with AI, and injects relevant context into future sessions. Persistent memory is becoming a critical agent feature. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,211 (—) | Universal memory layer for AI agents. Pairs naturally with the rise of long-running agent workspaces. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,004 (—) | Open-source AI memory platform with a self-hosted knowledge graph engine. Represents the graph-native approach to agent memory. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,174 (—) | Document indexing for vectorless, reasoning-based RAG. An interesting alternative to pure vector retrieval. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,629 (—) | High-performance, cloud-native vector database built for scalable ANN search. Remains a backbone for production RAG. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,967 (—) | High-performance vector database and search engine for next-generation AI. A favorite for performance-sensitive retrieval stacks. |

---

## 3. Trend Signal Analysis

The strongest community attention today is no longer on raw model weights but on the surrounding agent ecosystem: skills, memory, context, and orchestration. The #1 trending repo, `diagram-design`, is not a model or a framework — it is a collection of output templates for Claude Code. Combined with `anthropics/skills` and `obsidian-skills`, a clear pattern emerges: Agent Skills are becoming an installable, shareable distribution format, similar to plugins or packages.

Context and memory are also rising as first-class infrastructure. `semantica` (+713), `macro` (+1,239), `claude-mem`, `mem0`, and `cognee` all address the same bottleneck: agents forget. The explosive growth of these projects suggests the next platform war in AI will be about persistent, structured memory rather than just retrieval.

Another first-time direction is ultra-small foundation models. `needle` — a 14MB model for phones, wearables, and robots — gained +769 stars in one day. It points toward a future where edge AI, privacy, and low-cost hardware are core requirements rather than afterthoughts.

Finally, the rise of `Switchyard` and `opencompass` signals a maturing multi-model world. With releases like Kimi K2.6, GLM-5.2, DeepSeek-V4, and Gemma 4 appearing simultaneously, developers need routing, benchmarking, and cost optimization layers — not just another model.

---

## 4. Community Hot Spots

- **Agent Skills packaging** — [anthropics/skills](https://github.com/anthropics/skills), [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills), and [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design). The #1 trending repo proves developers want reusable, high-quality agent capabilities.

- **Persistent memory / context layer** — [semantica-agi/semantica](https://github.com/semantica-agi/semantica), [macro-inc/macro](https://github.com/macro-inc/macro), [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), and [mem0ai/mem0](https://github.com/mem0ai/mem0). Memory is the missing piece for long-running, trustworthy agents.

- **Edge and on-device AI** — [cactus-compute/needle](https://github.com/cactus-compute/needle), [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice), and [lightningpixel/modly](https://github.com/lightningpixel/modly). A strong shift toward privacy-preserving, GPU-local, and low-footprint AI.

- **Agent workspace consolidation** — [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS), [macro-inc/macro](https://github.com/macro-inc/macro), and [langgenius/dify](https://github.com/langgenius/dify). MCP support, shared memory, and multi-agent orchestration are becoming table stakes.

- **Model routing and evaluation** — [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) and [open-compass/opencompass](https://github.com/open-compass/opencompass). As model options explode, developers need tooling for cost/performance routing and rigorous benchmarking.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*