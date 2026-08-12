# Hugging Face 热门模型日报 2026-08-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-12 02:00 UTC

---

# Hugging Face 热门模型日报（2026-08-12）

## 今日速览

MiniMax-H3 成为本周最强生态事件：官方视频模型、ComfyUI 单文件、Turbo、LoRA、GGUF、提示词重写器集中上榜。Kimi-K3 以 10,528 赞领跑全榜，压缩张量多模态路线受关注；DeepSeek-V4-Flash 则以 104 万下载成为文本生成流量王。百度 Unlimited-OCR 下载近 290 万，专用模型在文档/OCR 场景需求强劲。语言模型方面，LiquidAI、deepgrove、inclusionAI 等高效/小参数量模型持续涌现，社区微调与量化（GGUF/LoRA/NVFP4）生态非常活跃。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,153 | 1,048,685 | DeepSeek V4 的 Flash 文本生成模型，定位于对话与高效推理。周下载超 104 万，是本次榜单中的语言模型流量王。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 550 | 93,668 | Liquid AI 的 2.6B 小参数文本生成模型，强调算力效率。配合 GGUF 版本，是轻量级本地部署的有力选择。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 332 | 2,049 | deepgrove 发布的 MoE 文本生成预览模型。332 周赞，Mixture-of-Experts 架构值得关注。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 303 | 6,148 | Ling 3.0 的 Flash 版对话模型，采用 bailing_hybrid 架构。为国产开源语言模型家族再添新成员。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 154 | 0 | Ling 3.0 的 Tiny 版，面向低资源/端侧场景。虽然下载为 0，但 154 周赞说明社区对轻量模型仍有期待。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 131 | 19,250 | NVIDIA 的 30B-A3B MoE 语言模型，以 NVFP4 低精度格式发布。兼顾性能与显存效率，是官方量化 LLM 的代表。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,579 | 59,368 | MiniMax 的视频生成模型，支持文生视频、图生视频与图文生视频。3,579 周赞，并带动了 LoRA、GGUF、ComfyUI 等衍生生态。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,101 | 0 | meta-models 的多模态模型，支持图像+文本对话。虽然下载为 0，但 1,101 周赞预示量化与微调版本会快速跟进。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,212 | 6,798,796 | MiniMax-H3 的 ComfyUI 单文件打包版本，方便接入本地工作流。679.8 万下载，是 MiniMax-H3 生态的主要分发入口。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,528 | 1,565,484 | 月之暗面 Kimi K3，图像文本到文本 + 特征抽取的多模态模型。10,528 周赞成为全榜最高赞，压缩张量特性尤其受关注。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 341 | 20,376 | MiniMax-H3 的 Turbo 变体，支持 t2v/i2v/r2v 多方向视频生成。2 万+下载，适合追求更高效率的视频生成任务。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 326 | 653 | NVIDIA 的 11B 语音对话模型，面向语音/会话交互场景。326 周赞，是音频与 LLM 结合方向的重要开源模型。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 226 | 39 | Lightricks 的视频生成模型，支持图生视频/文生视频/视频转视频。226 周赞，以 diffusion 单文件形式进入生态。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 166 | 708 | 基于 Qwen3.5 MoE 的多模态对话模型，支持图像文本输入。166 周赞，体现 MoE 与视觉语言结合的社区探索。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 228 | 6,769 | Mistral 的 3B 安全护栏/审查模型，用于生成内容检测和防护。是安全类专用模型中的新选择。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,019 | 2,892,191 | 百度的 Unlimited-OCR，从图像中提取文字并支持特征抽取。4,019 周赞、289.2 万下载，是榜单中下载量最高的专用模型。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,899 | 2,521,093 | 社区魔改 Qwen3.6 27B，集成了 uncensored/Heretic 等标签，并已完成 GGUF 量化。252 万下载，是社区微调+量化路线的高热度代表。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 651 | 0 | MiniMax-H3 Turbo 风格的 LoRA，用于视频生成微调。651 周赞，体现社区对 MiniMax-H3 定制化的热情。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 649 | 207,990 | DeepSeek V4 Flash 的 unsloth GGUF 量化版。20.8 万下载，是本地部署 V4 Flash 的首选格式之一。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 459 | 0 | Qwen3-VL 32B 的社区魔改 INT8 量化版，带 ComfyUI/ConvRot 适配。459 周赞，显示视觉语言模型在本地部署和风格化微调上同样活跃。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 307 | 0 | Muse-Glimmer 30B 的 unsloth GGUF 量化版。0 下载但 307 周赞，为本地多模态部署提供了轻量化入口。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 276 | 0 | Kijai 为 MiniMax-H3 提供的 ComfyUI 适配文件。276 周赞，是视频生成工作流的重要生态补件。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 275 | 0 | MiniMax-H3-Turbo LoRA 的 ComfyUI 剪枝版，便于直接用于文生视频工作流。275 周赞，属于 MiniMax-H3 社区组件。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 265 | 0 | MiniMax-H3 的社区风格化衍生版本，声明 endpoints 兼容。265 周赞，反映 MiniMax-H3 微调生态的多样化。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 203 | 0 | Muse-Glimmer 30B 的 GGUF 量化版，方便本地部署。203 周赞，与 unsloth 版本形成多入口选择。 |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 201 | 111,942 | LFM2.5-2.6B 的 GGUF 量化版，专为 llama.cpp 本地推理准备。11.2 万下载，说明轻量模型的本地部署需求旺盛。 |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 192 | 0 | Kijai 制作的 MiniMax-H3 实验版本/测试用适配文件。192 周赞，供社区提前探索尚未稳定化的功能。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 130 | 353 | MiniMax-H3 的提示词重写 LoRA，用于优化/改写视频生成提示词。130 周赞，是工作流增强型微调组件。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 114 | 0 | fal 出品的 MiniMax-H3 写实人物 LoRA，增强视频人物真实感。114 周赞，体现平台对高质量人物视频的硬需求。 |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 110 | 781 | MiniMax-H3 的 GGUF 量化版，配合 stable-diffusion.cpp 可探索 CPU/边缘部署。110 周赞，是视频模型轻量化部署的早期尝试。 |

## 生态信号

MiniMax-H3 已从单一权重演化为完整生态链：官方模型、ComfyUI 单文件、Turbo、LoRA、提示词重写器、GGUF 同时上榜，视频生成正进入“可安装、可微调、可本地跑”的阶段。开源权重仍是主流，DeepSeek、Kimi、Meta、NVIDIA、Mistral、百度均放出官方权重，社区用 GGUF、LoRA、INT8/NVFP4 快速完成衍生。闭源 API 并未出现在榜单视野，开放权重与社区再创作成为当前 Hugging Face 生态的核心动力。值得注意的还有“uncensored/Heretic”类魔改和平台 LoRA（fal、lightx2v）兴起，反映用户对风格化、可控性与低门槛部署的强烈需求。

## 值得探索

- **Kimi-K3**：全榜最高周赞（10,528）+ 156.5 万下载，压缩张量与多模态特征抽取的结合值得深入研究。
- **DeepSeek-V4-Flash-0731**：超 104 万下载，Flash 定位高效文本生成；配合 unsloth GGUF 可快速验证本地部署效果。
- **baidu/Unlimited-OCR**：289.2 万下载，OCR 专用模型在文档解析、RAG 数据管线中具有很强落地价值。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*