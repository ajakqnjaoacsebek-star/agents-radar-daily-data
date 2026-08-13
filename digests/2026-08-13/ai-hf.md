# Hugging Face 热门模型日报 2026-08-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-13 02:02 UTC

---

## Hugging Face 热门模型日报（2026-08-13）

### 📌 今日速览

- **Kimi-K3** 以 10,584 周点赞登顶榜首，成为今日最受关注的多模态模型；**DeepSeek-V4-Flash-0731** 下载量突破百万，是当前社区部署热度最高的语言模型。
- **MiniMax-H3** 家族生态爆发，官方模型之外衍生出大量 LoRA、ComfyUI 封装、GGUF 量化版本，是今日视频生成领域最活跃的模型系列。
- **NVIDIA Nemotron-3.5-Lightning** 同时推出 BF16 与 NVFP4 两种精度版本，兼顾性能与低比特部署；**Qwen3.8-2.4T-A95B** 也提供 FP8 量化，大模型量化成为标配。
- 多模态模型（图像理解、视频生成）在榜单中占比过半，**Muse-Glimmer-30B**、**LTX-2.5**、**VoiceChat-11B** 等新品齐发力。
- 社区微调与量化创作异常活跃，GGUF、LoRA、FP8/NVFP4/INT8 等格式的二次分发模型数量持续攀升。

---

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,240 | 1,048,685 | 新一代高效对话模型，下载量超百万，是当前落地部署最热门的文本生成模型之一。 |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 586 | 93,668 | 轻量级文本生成模型，主打低资源场景，适合端侧与高效推理研究。 |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 524 | 978 | 超大规模 MoE 语言模型，2.4T 总参数量、95B 激活参数，代表顶尖开源规模。 |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 346 | 2,049 | 因果语言模型预览版，采用 MoE 架构，主打高能效文本生成。 |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 319 | 6,148 | 混合架构对话模型，使用自定义代码，支持高效文本生成与多轮交互。 |
| [Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 191 | 0 | 极小规模版本，适合资源受限环境下的语言任务快速验证。 |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 116 | 15,740 | 高稀疏激活的 30B 模型（A3B），BF16 精度，兼顾性能与部署友好性。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,584 | 1,565,484 | 支持图像文本理解的多模态模型，点赞与下载双高，采用压缩张量技术，是今日社区焦点。 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,716 | 83,484 | 官方视频生成模型，支持文本/图像到视频，带动整个 H3 生态快速扩张。 |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,298 | 0 | 30B 级图像文本对话模型，强调多模态理解与生成能力，上线即获高关注。 |
| [MiniMax-H3 (Comfy-Org)](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,258 | 6,798,796 | ComfyUI 单文件格式的 MiniMax-H3，下载量接近 680 万，是工作流用户的首选接入版本。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 573 | 39 | 轻量级图像到视频扩散模型，支持视频到视频，适合创意生成工作流。 |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 411 | 20,376 | H3 加速版视频生成模型，覆盖 t2v/i2v/r2v 多种生成任务，社区下载活跃。 |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 353 | 653 | 语音对话多模态模型，结合对话与语音处理能力，面向实时交互场景。 |
| [MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 295 | 0 | Kijai 制作的 ComfyUI 适配版 MiniMax-H3，为视频生成工作流提供直接可用的封装。 |
| [PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 287 | 0 | 基于 MiniMax-H3 的视频生成模型变体，适配 transformers 与端点部署。 |
| [MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 214 | 0 | MiniMax-H3 实验性版本，探索生成质量与风格多样性的潜在改进。 |
| [BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 182 | 708 | 基于 Qwen3.5-MoE 的多模态对话模型，支持图像文本输入，热度持续上升。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,958 | 2,521,093 | 社区微调版 Qwen3.6 27B，主打“无审查”特性并附带多组命名增强，GGUF 下载超 252 万。 |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 701 | 0 | 用于 MiniMax-H3-Turbo 的 LoRA 扩展，支持文本到视频与音频视频联合生成。 |
| [DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 666 | 207,990 | DeepSeek-V4-Flash 的 GGUF 量化版，由 unsloth 优化，大幅降低了本地部署门槛。 |
| [Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 477 | 0 | 基于 Qwen3-VL-32B 的微调版本，集成 ComfyUI 与 INT8 量化，支持多模态推理。 |
| [Muse-Glimmer-30B-GGUF (unsloth)](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 360 | 0 | Muse-Glimmer-30B 的 GGUF 量化版，便于本地多模态对话部署。 |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 301 | 0 | 面向 ComfyUI 剪枝版的 MiniMax-H3-Turbo LoRA 适配器，方便节点式工作流调用。 |
| [Muse-Glimmer-30B-GGUF (meta-models)](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 241 | 0 | 官方出品的 Muse-Glimmer-30B GGUF 版本，支持低资源设备运行多模态模型。 |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 206 | 19,250 | Nemotron-3.5 的 NVFP4 低比特量化版，在保持性能的同时显著降低显存占用。 |
| [MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 146 | 0 | 针对真实人物生成优化的 MiniMax-H3 LoRA，提升视频生成的人像写实度。 |
| [MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 141 | 353 | 专用提示词重写 LoRA，帮助用户优化输入以提升 MiniMax-H3 的生成质量。 |
| [MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 137 | 781 | 视频生成模型 MiniMax-H3 的 GGUF 量化版，适配 CPU/低显存推理。 |
| [Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 119 | 3,851 | 超大规模 MoE 模型的 FP8 量化版，大幅压缩存储成本，适合多卡推理。 |

---

### 🌐 生态信号

- **MiniMax-H3 家族势头最旺**：官方发布后 24 小时内即涌现 LoRA、ComfyUI 封装、GGUF 量化等近 10 个衍生模型，下载量合计接近 700 万，显示出社区对视频生成生态的高参与度。
- **多模态成为顶流**：Kimi-K3 点赞破万，Muse-Glimmer、LTX、VoiceChat 等多模态模型齐上榜，纯文本 LLM 虽然下载稳定，但社交热度逐渐被多模态抢占。
- **量化与微调已成标配**：几乎所有新模型都会立刻出现 GGUF/FP8/NVFP4 或 LoRA 版本，说明开源社区对低成本部署和个性化定制的需求极其旺盛；同时，低比特量化（FP8/NVFP4）正成为官方与第三方共同推进的方向。

---

### 🔭 值得探索

1. **[Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：本周点赞最高的多模态模型，且下载超 156 万，其“压缩张量”特性值得深入研究，可能是兼顾理解能力与存储效率的新方向。
2. **[MiniMax-H3（Comfy-Org 版）](https://huggingface.co/Comfy-Org/MiniMax-H3)**：近 680 万下载的 ComfyUI 单文件封装，适合希望快速上手视频生成的创作者；围绕 H3 的 LoRA 与量化生态也值得逐一挖掘。
3. **[DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF)**：原始模型下载超百万，unsloth 的 GGUF 版提供了轻量部署路径，是低成本体验顶尖开源 LLM 的快速入口。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*