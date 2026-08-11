# Hugging Face 热门模型日报 2026-08-11

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-11 10:24 UTC

---

# Hugging Face 热门模型日报（2026-08-11）

## 今日速览

本周 HF 榜单热闹非凡：**FLUX.1-dev** 以 1.4 万点赞领跑全站，月之暗面的 **Kimi-K3** 紧随其后斩获 1 万+ 点赞，两者成为绝对焦点。**MiniMax-H3** 视频生成模型及其衍生社区生态（ComfyUI 适配、LoRA、TAE 等）大规模刷屏，单条衍生模型下载量最高达 679 万。**DeepSeek-V4-Flash-0731** 下载量突破 100 万，说明高效开源 LLM 依旧是开发者的刚需。同时，多模态（视频生成、视觉理解、语音聊天）与量化（GGUF、NVFP4）成为两大活跃方向，社区微调内容明显增多。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,105 | 1,048,685 | DeepSeek 最新 Flash 版对话模型，主打高效推理与可扩展性。上线后下载量很快破百万，是本周最火热开源 LLM 之一。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 511 | 93,668 | Liquid AI 推出的 2.6B 小参数语言模型，面向低资源高效部署。9 万+ 下载表明小模型在社区中同样有很强需求。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 322 | 2,049 | DeepGrove 的混合专家（MoE）文本生成模型预览版。点赞与下载量不算高，但为 MoE 架构探索提供了新选项。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 296 | 6,148 | 基于 Bailing 混合架构的轻量级对话模型，强调高效文本生成。虽然热度中等，但定制化技术栈值得留意。 |
| [SyzygyResearch/Mach-1-Additive-35B](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 120 | 2,511 | 基 于 Qwen3.5 MoE 的实验性模型，采用三值/加法权重探索极端量化。代表社区对下一代模型压缩方法的研究方向。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,494 | 59,368 | MiniMax 的旗舰图像/文本到视频生成模型，支持多模态输入。以近 3,500 点赞成为视频生成领域最热新作，带动周边工具链快速跟进。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 916 | 0 | Meta 发布的多模态对话模型（image-text-to-text），具备视觉理解与对话能力。虽然下载量为 0，但官方及第三方 GGUF 版本同时上榜，话题性很强。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,493 | 1,565,484 | 月之暗面新一代多模态模型，支持图文混合输入并可做特征提取。周点赞破万且下载超 156 万，是本周社区关注度最高的新模型。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 264 | 20,376 | 面向图像生成视频的 Turbo 版模型，优化了推理速度。与 ComfyUI 生态结合紧密，是 MiniMax-H3 衍生生态的重要一环。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 260 | 0 | MiniMax-H3 的社区微调变体，专注于特定风格 text-to-video 生成。虽然下载为零，但点赞数反映出垂直风格社区的活跃需求。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 309 | 653 | NVIDIA 推出的语音聊天模型，融合多篇语音技术论文成果。任务标注为 N/A，但代表了语音智能体方向的重要开源尝试。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 159 | 708 | 基于 Qwen3.5 MoE 的多模态对话模型，面向通用图文交互。社区开始基于 Qwen3.5 做多样化微调，值得跟踪观察。 |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,087 | 475,396 | 黑森林实验室的旗舰文本生成图像模型，是开源图像生成的标杆。以 1.4 万点赞位列全榜第一，持续领跑文生图赛道。 |
| [Kijai/MiniMax-H3-TAE](https://huggingface.co/Kijai/MiniMax-H3-TAE) | Kijai | 104 | 0 | 与 MiniMax-H3 配套的时序自编码器，用于视频生成的特征压缩/重建。由知名 ComfyUI 开发者提供，是视频模型链路的基础模块。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 225 | 6,769 | Mistral 推出的 3B 安全分类器，用于内容审核与安全防护。轻量专用模型瞄准安全对齐需求，体现 LLM 应用层配套工具的趋势。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,010 | 2,892,191 | 百度的通用 OCR 模型，支持多种图像到文本的识别场景。下载量接近 290 万，是文档理解与办公自动化领域的主力开源选择。 |
| [nvidia/Alpamayo2-Super](https://huggingface.co/nvidia/Alpamayo2-Super) | nvidia | 102 | 6,257 | NVIDIA 发布的机器人领域专用模型，针对实体交互控制设计。作为榜单中少见的 robotics 任务模型，反映 AI 向物理世界延伸的趋势。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,179 | 6,798,796 | ComfyUI 官方适配的 MiniMax-H3 单文件格式，方便节点工作流直接调用。679 万下载量使其成为视频生成用户接入 MiniMax-H3 的主要入口。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 615 | 0 | 针对 MiniMax-H3 Turbo 的 LoRA 微调插件，可低成本定制视频风格或行为。虽暂无下载，但获得 615 点赞说明社区对扩展能力期待很高。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,877 | 2,521,093 | 社区深度微调版 Qwen3.6 27B 的 GGUF 量化，主打“uncensored”风格。下载量超 252 万，反映开源社区对个性化 LLM 的旺盛需求。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 449 | 0 | 将 Qwen3-VL-32B 与 MiniMax-H3 结合的 ComfyUI 量化版本，支持 INT8 视觉编码。属于跨界融合型微调，适合在 ComfyUI 中做多模态实验。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 263 | 0 | 知名开发者 Kijai 制作的 MiniMax-H3 ComfyUI 实现，提供自定义节点。为 ComfyUI 用户提供稳定的视频生成集成方案。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 257 | 0 | MiniMax-H3 Turbo LoRA 的 ComfyUI 适配版，简化部署流程。与同类工具互补，进一步丰富视频生成生态。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 247 | 0 | unsloth 提供的 Muse-Glimmer-30B 量化版，通过 GGUF 降低部署门槛。虽暂无下载，但官方量化质量是社区关注点。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 644 | 207,990 | DeepSeek V4 Flash 的 GGUF 量化版本，兼容 llama.cpp 等本地推理工具。下载超 20 万，是本地部署热门 LLM 的首选量化格式。 |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 189 | 111,942 | LFM2.5 2.6B 的 GGUF 版，适合 CPU/边缘设备高效推理。下载量 11 万，说明小模型量化同样有广阔应用场景。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 173 | 0 | Meta 官方发布的 Muse-Glimmer-30B GGUF 量化版，便于本地运行。与原始版同时上榜，显示官方对量化生态的支持。 |
| [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 158 | 0 | 使用 NVFP4 精度量化的 Qwen3-VL-32B 与 MiniMax-H3 混合方案，面向 ComfyUI。代表社区对高性能多模态量化的探索。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 121 | 353 | 针对 MiniMax-H3 的提示词重写 LoRA，优化视频生成文本输入质量。有助于提升提示词工程效率，是工作流中的实用组件。 |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 188 | 0 | Kijai 发布的 MiniMax-H3 实验性版本，包含尚未正式整合的新特性。体现社区开发者在模型质量上的持续迭代。 |

## 生态信号

- **MiniMax-H3 形成完整生态**：从官方基础模型到 ComfyUI 适配、Turbo、LoRA、TAE、提示词重写等十余个衍生条目同时上榜，类似此前 FLUX 的爆发，显示出“一个强模型带动整条工具链”的典型模式。
- **开源权重仍是主流，量化快速跟进**：DeepSeek、Meta、NVIDIA、Mistral 等均在榜单发布完整可商用权重；unsloth 等团队迅速提供 GGUF 版本，本地部署和边缘推理需求强劲。
- **社区微调高度活跃**：风格化“uncensored”“Heretic”等微调模型层出不穷，但质量参差；同时安全专用模型（Shieldstral）开始获得关注，说明开源生态正从“可用”走向“可控”。
- **多模态竞争转向视频与统一视觉语言模型**：Kimi-K3、Muse-Glimmer、MiniMax-H3 和大量 Qwen3-VL 变体验证了这一趋势，图像生成则由 FLUX.1-dev 持续领跑。

## 值得探索

- **moonshotai/Kimi-K3**：本周点赞破万的超级新星，支持图文理解与特征提取，下载量达 156 万。可作为通用多模态基础模型评估其综合能力。
- **MiniMaxAI/MiniMax-H3**：视频生成领域生态核心，仅衍生工具就覆盖量化、LoRA、ComfyUI 多个层面。从 ComfyUI 版本入手可快速搭建完整视频生成工作流。
- **SyzygyResearch/Mach-1-Additive-35B**：采用三值/加法权重的实验性模型，代表极具潜力的模型压缩研究方向，值得关注其与标准 MoE 在效果和效率上的差异。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*