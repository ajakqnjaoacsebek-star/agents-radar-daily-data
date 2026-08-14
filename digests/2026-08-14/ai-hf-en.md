# Hugging Face Trending Models Digest 2026-08-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-14 02:00 UTC

---

# Hugging Face Trending Models Digest — 2026-08-14

## Today's Highlights

MiniMax-H3 is the week's clear center of gravity: the base video-generation model plus Turbo variants, LoRAs, ComfyUI packaging, and GGUF quantizations form the largest cluster, with the Comfy-Org single-file version alone surpassing 10.36M downloads. On the LLM side, DeepSeek-V4 Flash, Qwen's 2.4T-parameter MoE, and NVIDIA Nemotron Lightning show a shift toward massive sparse models with efficient active-parameter counts. Moonshot's Kimi-K3 is the most-liked model in the dataset at 10,623 likes, while MiniMax-Music3, LTX-2.5, and NVIDIA VoiceChat expand the audio/video frontier. Community quantization and deployment work is equally notable: GGUF, NVFP4, FP8, and INT8 variants appear across nearly every major release.

## 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 789 | 1,012 | Qwen's latest massive MoE text-generation model, with roughly 2.4T total parameters and 95B active. It is trending as a flagship open-weight sparse LLM, though it is still a fresh release with limited downloads. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,323 | 1,431,587 | A fast, chat-aligned DeepSeek V4 variant. Its huge download count reflects strong demand for efficient open-weight reasoning and conversational models. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 299 | 0 | A newly released Pro version of DeepSeek V4, likely aimed at higher capability than Flash. It is generating early interest but had not accumulated downloads at snapshot time. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 603 | 116,640 | A compact 2.6B parameter language model from Liquid AI. It is popular for local and edge deployment due to its small footprint and strong efficiency. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 216 | 1,292 | A small custom-code model from inclusionAI using the "Bailing hybrid" architecture and an MIT license. It is notable as a permissively licensed compact open-weight release. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 354 | 3,868 | An open-weight mixture-of-experts text-generation model in preview. It is trending as a new MoE entry with causal LM capabilities. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 130 | 22,279 | NVIDIA's 30B-total, 3B-active language model in BF16. It is attractive for high-performance inference with a low active-parameter count. |

## 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,423 | 121,042 | An image-text-to-text conversational model from meta-models. It is trending alongside GGUF variants, with strong downloads for an open vision-language assistant. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,826 | 1,605,940 | The flagship MiniMax-H3 image-text-to-video generation model. It anchors a large ecosystem of LoRAs, Turbo derivatives, GGUF quantizations, and ComfyUI integrations. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 724 | 57,287 | A diffusion single-file video generation model supporting image-to-video, text-to-video, and video-to-video. It is trending for its versatility in open-weight video workflows. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 462 | 91,455 | A Turbo-oriented derivative of MiniMax-H3 for faster video generation. It is popular among users who want MiniMax-H3 quality with lower latency. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 336 | 25 | A text-to-audio music generation model from MiniMaxAI. It is a very new release, with early likes signaling interest in open-weight music generation. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,623 | 1,871,575 | Kimi-K3 is Moonshot's large image-text-to-text multimodal model and the most-liked model in this digest. Its compressed-tensors support and massive download count make it a standout open-weight release. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 371 | 1,164 | A specialized voice chat model from NVIDIA Labs. It is gaining attention for open-weight spoken dialogue and audio understanding. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 188 | 3,184 | A Qwen3.5-MoE-based image-text-to-text conversational model. It is trending as a new open-weight multimodal MoE release. |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 131 | 0 | A text-to-image diffusion single-file model focused on anime-style generation. It is notable for its ComfyUI-ready packaging, though downloads have not yet accumulated. |

## 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 726 | 0 | A LoRA adapter for MiniMax-H3-Turbo with text-to-video and audio-video tags. The high like count despite zero downloads suggests strong pre-release community interest. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 389 | 352,023 | Unsloth's optimized GGUF quantization of Muse-Glimmer-30B. It is extremely popular for local inference of the multimodal model. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,291 | 10,365,210 | A ComfyUI-ready single-file packaging of MiniMax-H3, not a new fine-tune. It is the most-downloaded model in this digest, highlighting ComfyUI's central role in video-generation workflows. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 257 | 136,783 | The official GGUF release of Muse-Glimmer-30B from meta-models. It provides a straightforward path for running the vision-language model locally. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,987 | 2,793,115 | A community Qwen3.6-based 27B GGUF merge/fine-tune with "uncensored" and "heretic" tags. Its massive download count shows continued demand for roleplay-oriented local LLM builds. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 305 | 0 | A ComfyUI-oriented repository for MiniMax-H3 from Kijai. The high likes with zero downloads suggest it is primarily code/workflow assets rather than model weights. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 299 | 0 | A newly released Pro version of DeepSeek V4. It is generating early interest, though downloads have not yet accumulated. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 229 | 44,859 | NVIDIA's NVFP4-quantized version of the Nemotron 3.5 Lightning 30B-A3B model. It offers a highly efficient lower-precision option for deploying the model. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 159 | 4,000 | An FP8 quantized version of Qwen's 2.4T-parameter MoE model. It is relevant for serving a massive sparse LLM with reduced memory requirements. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 297 | 324 | A community text-to-video fine-tune of MiniMax-H3 with a distinctive "PinkCherry" style. It shows how MiniMax-H3 is being adapted by the community for specialized creative output. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 314 | 0 | A ComfyUI-ready LoRA for MiniMax-H3-Turbo. It is part of the growing ecosystem of modular, UI-first video-generation add-ons. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 159 | 4,692 | A LoRA designed to improve realistic people generation in MiniMax-H3. It is a good example of targeted fine-tuning for video quality. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 149 | 111,222 | A GGUF quantized version of MiniMax-H3 for local video generation. It enables efficient inference through stable-diffusion.cpp-style workflows. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 149 | 652 | A specialized LoRA for rewriting prompts in MiniMax-H3 workflows. It is useful for improving prompt quality before video generation. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 483 | 0 | An INT8, ComfyUI-oriented variant of a Qwen3-VL 32B "uncensored/heretic" merge. It is an example of community vision-language models being optimized for local UI workflows. |

## Ecosystem Signal

Open-weight releases clearly dominate this Hugging Face trend list; no proprietary API-only models appear. The strongest momentum is around multimodal generation, with MiniMax-H3 as the anchor: Turbo derivatives, LoRAs for realism and prompt rewriting, ComfyUI single-file packs, and GGUF quantizations all orbit the same base model, and Comfy-Org's packaging alone has 10.36M downloads. Video and audio generation are also expanding rapidly, with LTX-2.5, MiniMax-Music3, and NVIDIA VoiceChat bringing new modalities into the open-weight ecosystem. Large sparse MoE language models are another major signal—Qwen 3.8 2.4T-A95B, DeepSeek-V4 Flash/Pro, Kimi-K3, and Nemotron Lightning all emphasize high total parameters with lower active-parameter inference. Quantization and fine-tuning activity is robust: GGUF conversions by Unsloth and meta-models, official NVFP4/FP8 quantizations, and community "uncensored"/roleplay merges remain extremely popular. ComfyUI is becoming a key distribution channel, reinforcing that local, tool-agnostic deployment matters as much as raw model quality.

## Worth Exploring

- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — The highest-liked model in this digest and a strong case study in open-weight multimodal pretraining, compressed-tensor distribution, and community demand.
- **[Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3)** — The most-downloaded model in the digest. It is worth studying to understand how ComfyUI packaging and the MiniMax-H3 ecosystem drive real-world adoption.
- **[Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8)** — A massive open-weight MoE in FP8. It is a valuable reference for efficient serving of very large sparse language models.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*