# Hugging Face 热门模型日报 2026-08-11

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-11 07:02 UTC

---

# Hugging Face 热门模型日报（2026-08-11）

## 今日速览

视频与多模态模型成为本周绝对主角：FLUX.1-dev 以 14,082 点赞居首，Kimi-K3 以 10,483 点赞紧随其后。MiniMax-H3 已形成完整生态，官方权重、ComfyUI 单文件、Turbo、LoRA、TAE 等十余个相关模型同时上榜。语言模型方面，DeepSeek-V4-Flash-0731 以 954,441 下载领跑，unsloth 也迅速推出 GGUF 量化版。百度 Unlimited-OCR 和 OpenAI Whisper 作为专用模型分别获得 292 万与 490 万下载，说明实用型模型仍具极强需求。meta-models 的 Muse-Glimmer-30B 首次上榜获得 850 点赞但下载仍为 0，仍处于发布早期。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,087 | 954,441 | DeepSeek 最新的 V4 Flash 文本生成模型，支持对话场景，定位快速响应。954,441 下载量是本周 LLM 中最突出，且已有 GGUF 量化版推进本地部署。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 499 | 89,680 | LiquidAI 的 2.6B 轻量文本生成模型，适合低资源部署。89,680 下载表明它在小型 LLM 中获得社区认可。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 320 | 1,344 | deepgrove 的预览版文本生成模型，采用 mixture-of-experts 架构。320 点赞相对低调，但新架构方向值得关注。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 293 | 5,261 | inclusionAI 的轻量对话模型，强调 conversational flash 体验。293 点赞说明国产新模型正在快速进入社区视野。 |
| [SyzygyResearch/Mach-1-Additive-35B](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 116 | 2,129 | 基于 Qwen3.5 MoE 的 35B 实验模型，探索 ternary/additive 权重。它更偏向研究型部署，是观察下一代压缩方案的好样本。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,082 | 480,762 | Black Forest Labs 的文本到图像扩散模型，社区衍生插件极多。14,082 点赞为本周最高，继续担当开源图像生成基座。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,483 | 1,510,032 | Moonshot AI 的多模态图文理解/生成模型，采用 compressed-tensors 并支持 feature extraction。10,483 点赞和 151 万下载说明它是本周最受关注的多模态新模型之一。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,466 | 47,468 | MiniMax 官方图像/文本到视频生成模型，支持 text-to-video、image-to-video。47,468 下载外加大量二创组件，是本周视频生成生态核心。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,163 | 6,009,639 | MiniMax-H3 的 ComfyUI 单文件分发版，可无缝接入 ComfyUI 生态。6,009,639 下载为全榜最高，凸显 ComfyUI 用户的巨大需求。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 850 | 0 | meta-models 发布的多模态图文对话模型，支持图像文本到文本。850 点赞但下载为 0，说明刚刚上线，权重尚未被大规模拉取。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 305 | 597 | NVIDIA 的语音聊天模型（VoiceChat-11B），面向语音交互场景。305 点赞说明音频对话在专业厂商中仍是重要方向。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 263 | 0 | Kijai 的 MiniMax-H3 ComfyUI 适配仓库，帮助用户在工作流中集成视频生成。263 点赞虽不高，却是 MiniMax-H3 生态链的一环。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 262 | 15,087 | MiniMax-H3 的 Turbo 图像到视频模型，支持 diffusers 工作流。15,087 下载说明用户喜欢更快、更省算力的视频生成版本。 |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 185 | 0 | Kijai 的 MiniMax-H3 实验性分支/组件，探索视频生成最新特性。185 点赞显示出社区对实验版本的高关注。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 155 | 617 | endless-frontier 推出的基于 Qwen3.5 MoE 的多模态图文对话模型。155 点赞说明它正作为新的图文对话模型进入测试视野。 |
| [Kijai/MiniMax-H3-TAE](https://huggingface.co/Kijai/MiniMax-H3-TAE) | Kijai | 103 | 0 | MiniMax-H3 的时序自编码器（TAE），用于视频潜在表示编解码。Apache-2.0 许可，是视频生成流程中的基础组件。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [openai/whisper-large-v3](https://huggingface.co/openai/whisper-large-v3) | openai | 6,132 | 4,901,834 | OpenAI 的自动语音识别大模型，支持多语言语音转写。4,901,834 下载是本周下载量最大的模型之一，说明 ASR 部署需求极为稳定。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,006 | 2,921,751 | 百度推出的 OCR 模型，支持图像文字识别与特征提取。2,921,751 下载体现中文场景和通用 OCR 的巨大落地需求。 |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 224 | 6,343 | Mistral 的 3B 安全护栏模型，面向 vLLM 等内容安全场景。224 点赞说明安全/审核模型正成为模型生态的刚需配件。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,871 | 2,439,083 | 社区融合微调并 GGUF 量化的 Qwen3.6 27B 图文对话模型，名字中带有 uncensored/heretic 等社区风格标签。2,439,083 下载说明这一类“高自由度”微调模型有很强受众。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 640 | 199,167 | unsloth 制作的 DeepSeek V4 Flash GGUF 量化包，适配本地推理。199,167 下载与主模型的下载热度直接联动。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 608 | 0 | 针对 MiniMax-H3-Turbo 的 LoRA 插件，标签指向 text-to-video 和 audio-video。608 点赞说明社区正快速为 Turbo 视频模型补充微调能力。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 445 | 0 | Qwen3-VL-32B 的 INT8 量化变体，专为 ComfyUI/H3 流程优化。445 点赞说明大型 VL 模型在 ComfyUI 中的本地化部署需求增长。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 257 | 0 | 社区非官方微调的 MiniMax-H3 文本生视频模型，主打特定风格。257 点赞反映基础视频模型之上的个性化二次创作需求。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 255 | 0 | MiniMax-H3-Turbo LoRA 的 ComfyUI 适配版本，主打即插即用。255 点赞说明 ComfyUI 用户非常看重低门槛视频模型微调。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 235 | 0 | unsloth 为 Muse-Glimmer-30B 生成的 GGUF 量化版本。235 点赞说明新多模态模型发布后，社区很希望立刻能在本地跑起来。 |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 186 | 89,611 | LiquidAI 自己发布 LFM2.5-2.6B 的 GGUF 格式，兼容 llama.cpp。89,611 下载与原版几乎相当，显示轻量模型用户偏好 GGUF。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 167 | 0 | meta-models 官方发布的 Muse-Glimmer-30B GGUF 权重。167 点赞且 0 下载，可能刚上传，是未来本地部署的官方入口。 |
| [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 156 | 0 | 面向 ComfyUI 的 Qwen3-VL 32B 文本编码器 NVFP4 量化版本，并与 MiniMax-H3 流程集成。156 点赞显示量化已进入视频/多模态工作流的组件级。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 119 | 268 | 用于 MiniMax-H3 提示词重写的 LoRA，目标是提升视频生成提示质量。119 点赞体现提示词工程与轻量微调的结合趋势。 |

## 生态信号

从榜单看，MiniMax-H3 是当前生态势能最强的视频模型家族：官方权重、ComfyUI 单文件、Turbo、LoRA、TAE 几乎同时上榜，说明一个模型只要开源，社区就会迅速补齐部署与微调链路。DeepSeek-V4-Flash 与 Whisper、OCR 等基座则凭借稳健下载量证明实用型模型同样重要。开源权重仍占绝对主流，闭源 API 模型未进入榜单；GGUF、INT8、NVFP4、LoRA 等量化/微调活动高频出现，正在把大模型推向本地化和垂直化。

## 值得探索

- **MiniMax-H3 / Comfy-Org 版**：如要体验视频生成，优先考虑 MiniMax-H3 与其 ComfyUI 单文件生态；TAE 和 LoRA 组件也值得一并研究。
- **DeepSeek-V4-Flash-0731**：本周 LLM 下载最猛的新模型，适合测试推理速度，unsloth GGUF 版本可低门槛本地运行。
- **Kimi-K3**：压缩张量 + 多模态的组合让它兼具研究价值和实用性，适合观察 Moonshot 的开源路线。