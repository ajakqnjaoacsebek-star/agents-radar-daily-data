# Hugging Face Trending Models Digest 2026-08-13

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-13 02:02 UTC

---

# Hugging Face Trending Models Digest — 2026-08-13

## Today's Highlights

The board is dominated by the **MiniMax-H3 video ecosystem**, with the base model, ComfyUI conversions, Turbo variants, LoRAs, and GGUF versions all appearing in the top 30. **Kimi-K3** is the clear engagement leader, earning the most likes at 10,584 and over 1.5M downloads. **DeepSeek-V4-Flash-0731** shows exceptionally broad adoption with more than 1M downloads, while **Qwen3.8-2.4T-A95B** and its FP8 companion signal growing interest in frontier-scale MoE models. Community activity is heavily concentrated around quantized GGUF releases, ComfyUI-ready adapters, and “uncensored/heretic” fine-tunes, indicating demand for locally runnable and creatively specialized versions of major open-weight models.

## Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,240 | 1,048,685 | DeepSeek’s latest Flash text-generation model, positioned for fast and efficient deployment. Its 1M+ downloads make it the most-downloaded pure-language release on this digest. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 586 | 93,668 | A compact 2.6B text-generation model from Liquid AI. The high download count for a small model suggests strong interest in lightweight, low-cost serving and agentic workflows. |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 524 | 978 | A sparse MoE language model with 2.4T total parameters and 95B active parameters. It represents Qwen’s frontier-scale open-weight architecture push and has a companion FP8 release. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 346 | 2,049 | Preview text-generation model using a mixture-of-experts causal LM design. Early community interest places it among the newer MoE entrants on this list. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 319 | 6,148 | Flash-sized Ling 3.0 model built for conversational text generation with custom hybrid architecture. It pairs with the tiny variant to show InclusionAI’s small-model family strategy. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 206 | 19,250 | NVIDIA’s 30B MoE model with 3B active parameters, shipped in memory-efficient NVFP4 format. It is attractive for high-quality generation on NVIDIA GPUs with reduced VRAM usage. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 191 | 0 | Tiny variant of Ling 3.0 using the `bailing_hybrid` custom-code architecture. It is notable for its MIT license and ultra-portable model footprint, though downloads are not yet visible. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 119 | 3,851 | FP8-quantized version of Qwen3.8-2.4T-A95B, cutting memory requirements while preserving the MoE architecture. Its presence reflects demand for frontier-scale models in constrained infrastructure. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 116 | 15,740 | BF16 reference version of NVIDIA Nemotron 3.5 Lightning 30B-A3B. It serves as the high-precision baseline for the NVFP4 quantized model also trending today. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,584 | 1,565,484 | Moonshot’s image-text-to-text multimodal model with compressed-tensor support. It is the highest-liked model on today’s board and has attracted over 1.5M downloads. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,716 | 83,484 | Official MiniMax-H3 video generation model for image-to-video and text-to-video. It anchors one of the largest model ecosystems in the list, including LoRAs, ComfyUI assets, and GGUF derivatives. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,298 | 0 | Image-text-to-text conversational model combining visual understanding with language generation. It has generated significant release-day interest despite zero downloads yet, and GGUF versions are already trending. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,258 | 6,798,796 | ComfyUI-ready single-file distribution of MiniMax-H3. Its 6.8M downloads make it one of the most-used assets on this digest and a strong indicator of ComfyUI video-generation demand. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 573 | 39 | Lightricks’ latest image-to-video diffusion model for high-fidelity video synthesis. Downloads are still minimal, suggesting a very recent upload, but likes show immediate creative-industry interest. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 411 | 20,376 | Turbo-optimized variant of MiniMax-H3 for image-to-video generation. Over 20K downloads suggest users are actively seeking faster video-generation checkpoints. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 353 | 653 | NVIDIA’s 11B voice-chat model designed for speech-based conversational interaction. It extends the Nemotron family into multimodal voice-agent territory. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 295 | 0 | Dedicated ComfyUI integration and workflow support for MiniMax-H3 from a well-known ComfyUI developer. It has no visible downloads yet, but Kijai’s involvement makes it a valuable asset for ComfyUI users. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 214 | 0 | Experimental branch of Kijai’s MiniMax-H3 support. It signals active iteration around ComfyUI-oriented video generation tooling. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 182 | 708 | Community vision-language model built on a Qwen3.5-MoE base. It demonstrates how Qwen’s LLM foundations are being reused for conversational multimodal systems. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,958 | 2,521,093 | Community “uncensored/heretic” fine-tune of Qwen3.6 in GGUF format. With over 2.5M downloads, it shows a strong niche for creative, locally run, uncensored roleplay and chat models. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 701 | 0 | LoRA adapter for MiniMax-H3 Turbo text-to-video, text-to-audio, and audio-video generation. It is part of the fast-growing lightweight adapter ecosystem around MiniMax-H3. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 666 | 207,990 | Unsloth’s GGUF quantization of DeepSeek-V4-Flash-0731. With 208K downloads, it is a default choice for running DeepSeek’s Flash model locally or in CPU-based serving environments. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 477 | 0 | INT8-quantized, ComfyUI-integrated “heretic” fine-tune of Qwen3-VL-32B. It reflects the convergence of vision-language models, quantization, and ComfyUI packaging. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 360 | 0 | Unsloth’s GGUF-quantized version of meta-models’ Muse-Glimmer-30B. It enables local execution of this 30B multimodal model, though downloads are not yet visible. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 301 | 0 | ComfyUI-tuned LoRA adapter for MiniMax-H3 Turbo. It complements the broader swarm of MiniMax-H3 workflow and adapter releases. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 287 | 0 | Apache-2.0 licensed community fine-tune of MiniMax-H3 for text-to-video generation. It is marked `endpoints_compatible` and appears aimed at specialized creative video use cases. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 241 | 0 | Official GGUF release of Muse-Glimmer-30B from the model authors. It shows first-party support for local deployment of the new multimodal model. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 146 | 0 | LoRA designed to improve realism in people and human motion when generating with MiniMax-H3. It targets high-quality human-centric video generation. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 141 | 353 | PEFT LoRA that rewrites prompts to improve MiniMax-H3 video output. It already has real downloads, indicating active use for prompt-adherence tuning. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 137 | 781 | GGUF version of MiniMax-H3 for video generation, compatible with stable-diffusion.cpp workflows. It supports text-to-video and image-to-video in local GGUF-based tools. |

## Ecosystem Signal

**MiniMax-H3** is the dominant ecosystem of the day: roughly one-third of all trending entries are MiniMax-H3-related, including the base model, ComfyUI conversions, Turbo variants, LoRAs, and GGUF releases. This signals a shift from standalone model launches to full toolchain ecosystems — users now expect model weights, workflow integrations, quantized formats, and specialized adapters to appear at the same time. **Kimi-K3** and **DeepSeek-V4-Flash-0731** are the breakout open-weight releases by engagement, with 1.5M and 1.05M downloads respectively; both come from API-centric labs but are available openly on Hugging Face. Qwen’s 2.4T MoE and NVIDIA’s Nemotron Lightning show a parallel trend toward massive sparse architectures offered in multiple precisions. Community fine-tuning is heavily focused on “uncensored/heretic” variants, video-model LoRAs, and Unsloth GGUF conversions, suggesting that open weights are no longer enough — polished local formats and ComfyUI support are becoming decisive for adoption.

## Worth Exploring

- **moonshotai/Kimi-K3** — the highest-liked model today with over 1.5M downloads. Its compressed-tensor approach and multimodal image-text-to-text interface make it a compelling model to study for efficient multimodal deployment.
- **Comfy-Org/MiniMax-H3** — with 6.8M downloads, this ComfyUI-ready distribution is the center of gravity for the MiniMax-H3 video ecosystem. It is the best example of how packaging and workflow integration drive real-world usage.
- **LiquidAI/LFM2.5-2.6B** — a small 2.6B model with 93K downloads. It is worth studying for lightweight serving, on-device applications, and efficient architecture design outside the large-MoE race.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*