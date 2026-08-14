# Hugging Face 热门模型日报 2026-08-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-14 02:00 UTC

---

# Hugging Face 热门模型日报（2026-08-14）

## 今日速览

本周 Hugging Face 榜单**最突出的现象是 MiniMax-H3 生态全面爆发**：除了原始模型以 3,826 赞、160 万下载领跑外，围绕它出现了 LoRA、GGUF、ComfyUI 集成、提示词重写器等一系列衍生模型，其中 Comfy-Org 版本下载量已突破千万。**Kimi-K3 以 10,623 周点赞登顶热度榜首**，成为最受关注的视觉语言模型。语言模型方面，**DeepSeek-V4 系列、Qwen3.8 MoE、NVIDIA Nemotron Lightning 等高效 MoE 架构密集发布**，并同步推出 FP8 / NVFP4 / GGUF 等低精度部署版本。**视频生成赛道竞争加剧**，Lightricks LTX-2.5、MiniMax-Music3 等新作纷纷上榜，开源多模态生成进入混战期。社区微调与量化活动持续活跃，尤其是 MiniMax-H3 和 Qwen 系列衍生出了大量细分化变体。

## 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 789 | 1,012 | 通义千问最新旗舰 MoE 模型，总参数 2.4T、激活参数 95B，主打极致 scaling 与对话能力。本周新发布即获近 800 赞，是国产开源大模型的又一里程碑。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,323 | 1,431,587 | DeepSeek V4 的 Flash 高效版本，在推理速度和资源占用上做了重点优化。以 3.3K 点赞和 143 万下载位居语言模型前列，说明社区部署热情极高。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 299 | 0 | DeepSeek V4 的 Pro 版本，专注更强生成质量与复杂推理能力。刚上线尚未积累下载量，但 299 个早期赞显示出市场对它期待颇高。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 603 | 116,640 | LiquidAI 推出的 2.6B 小体积语言模型，主打低资源高效推理。600+ 点赞与 11 万下载表明小模型赛道仍有很大需求。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 229 | 44,859 | NVIDIA 英伟达 Nemotron 3.5 Lightning，30B 总参 3B 激活 MoE，且采用 NVFP4 低精度格式。兼顾高智能与部署效率，适合单卡推理。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 216 | 1,292 | inclusionAI 的 Ling 3.0 超小模型，使用 custom_code 混合架构，并采用 MIT 许可。小体积、宽松协议使其成为研究微调的热门底座。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 159 | 4,000 | Qwen3.8 旗舰 MoE 的 FP8 低精度版本，大幅降低显存占用和推理成本。发布即被用于生产环境测试，代表大模型量化部署方向。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 354 | 3,868 | deepgrove 推出的 MoE 文本生成模型预览版，定位未知领域的探索性实验。354 赞和 3.8K 下载说明评测者已在快速跟进。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 130 | 22,279 | 同款 Lightning 模型的 BF16 全精度版本，适合对精度要求更高的场景。与 NVFP4 版本形成互补，提供精度与效率的取舍。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,423 | 121,042 | Meta 推出的 30B 多模态对话模型，可同时理解图像与文本并生成自然语言回复。原生版本获 1.4K 赞，是当前 Meta 系开源多模态代表。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,826 | 1,605,940 | MiniMax 新一代视频生成旗舰，支持文本/图像生成视频。3.8K 赞、160 万下载，已成为开源视频生成模型的核心底座。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 724 | 57,287 | Lightricks 发布的视频生成新版本，支持图生视频、文生视频、视频转视频等多项任务。724 赞显示其在视频生成领域持续保持竞争力。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 462 | 91,455 | MiniMax-H3 的 Turbo 加速版，主打更快的视频生成速度。下载量达 9.1 万，适合对实时性或批量生成有要求的用户。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,291 | 10,365,210 | ComfyUI 官方适配版 MiniMax-H3，一键加载工作流即可使用。下载量突破 1,036 万，是该生态中下载量最高的衍生模型。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 336 | 25 | MiniMax 的第三代音乐生成模型，支持文本直接生成音乐，并借助 diffusers 与 sglang-omni 技术。刚发布下载量还不多，但标志着 AI 音乐生成的迭代方向。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,623 | 1,871,575 | 月之暗面 Kimi K3 视觉语言模型，支持图像+文本输入并做特征提取，且支持压缩张量。周点赞 10,623 为全站最高，下载 187 万，是本周最受关注的模型。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 297 | 324 | 社区开发的 MiniMax-H3 风格化微调版本，面向特定视觉风格的自定义视频生成。Apache-2.0 协议发布，下载量刚起步。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 188 | 3,184 | 基于 Qwen3.5 MoE 架构的多模态模型，将视觉理解与文本生成融合。188 赞虽不算高，但说明 Qwen MoE 底座正在被集成到多模态领域。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 371 | 1,164 | NVIDIA 推出的 11B 语音对话模型，集成了多篇论文相关技术。支持端侧语音交互，371 赞显示其关注度正在上升。 |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 131 | 0 | 2.9B 参数的文生图扩散模型，以单文件形式发布以便 ComfyUI 直接调用。适合显存有限的本地图像生成场景。 |

### 🔧 专用模型

本周榜单中没有明显属于代码、数学、医疗、嵌入等垂直领域的专用模型，因此此处不列展示。

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 726 | 0 | 针对 MiniMax-H3-Turbo 的 LoRA 扩展，同时支持视频与音频生成联合控制。下载虽为 0，但 726 个点赞表明社区对 LoRA 适配高度关注。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 389 | 352,023 | unsloth 将 Meta 的 Muse-Glimmer-30B 转换为 GGUF 量化格式，便于本地 CPU/GPU 部署。35 万下载使其成为该模型本地部署最流行的选择。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,987 | 2,793,115 | 社区魔改版 Qwen3.6 27B，主打无审查与角色扮演风格，并提供 GGUF 量化。1987 赞、279 万下载，说明特定用途社区模型有巨大需求。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 305 | 0 | Kijai 为 MiniMax-H3 制作的 ComfyUI 自定义节点/工作流。下载量数据暂未更新，但 305 赞证明 ComfyUI 用户对原生集成期待很高。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 257 | 136,783 | Meta 官方出品的 Muse-Glimmer-30B GGUF 版本，提供标准量化选择。136K 下载，与 unsloth 版本形成双轨生态。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 314 | 0 | 将 MiniMax-H3-Turbo LoRA 进一步封装为 ComfyUI 适配版本。方便用户在 ComfyUI 中直接叠加 LoRA 生成视频，点赞 314。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 159 | 4,692 | 专注于增强真人写实风格的 MiniMax-H3 LoRA，面向人物视频生成。159 赞 / 4.7K 下载，是特定风格微调的代表作之一。 |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 149 | 111,222 | MiniMax-H3 视频模型的 GGUF 量化版本，支持 stable-diffusion.cpp 运行。11 万下载表明视频模型量化需求正在快速增长。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 149 | 652 | 用于重写提示词的 LoRA 模块，可提升 MiniMax-H3 类模型的视频生成效果。与 Turbo 版本搭配使用，是提效工具链的关键一环。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 483 | 0 | 基于 Qwen3-VL-32B 的社区魔改 INT8 量化版本，融合 ComfyUI 接口与旋转位置编码变体。483 赞验证了高压缩多模态模型的社区热度。 |

## 生态信号

本周榜单透露的生态趋势十分清晰：

- **MiniMax-H3 家族成为最大生态现象**。原始模型 + Turbo、LoRA、GGUF、Prompt Rewriter、ComfyUI 工作流等衍生模型已形成完整工具链，覆盖下载量从数百到千万级，是当前开源视频生成领域当之无愧的中心节点。
- **开源权重主导，闭源模型未上榜**。DeepSeek、Qwen、NVIDIA、MiniMax、月之暗面等均以开放权重形式发布，且同时提供 FP8、NVFP4、GGUF 等多种精度版本，低精度部署成为标配。
- **高效 MoE 架构流行**。Qwen3.8-2.4T-A95B、Nemotron Lightning 30B-A3B、LFM2.5 等模型都以较少激活参数换高智能，配合量化进一步下探部署门槛。
- **社区微调与量化基建依然活跃**。unsloth、DavidAU 等社区作者持续产出 GGUF 与风格化微调模型，尤其是“uncensored / Heretic”等标签模型依然拥有大量受众。

## 值得探索

- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：本周全站点赞最高（10,623）的模型，下载量达 187 万，代表视觉语言模型的最新进展，值得优先测试其多模态理解与特征提取能力。
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：开源视频生成生态的核心底座，周边衍生模型数量为全榜最多。研究该模型可同时理解视频生成技术前沿与社区生态运作方式。
- **[deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)**：高效语言模型的典型代表，3.3K 点赞与 143 万下载证明了社区认可度。如果想追踪国产开源大模型的迭代节奏，这个版本值得深入分析。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*