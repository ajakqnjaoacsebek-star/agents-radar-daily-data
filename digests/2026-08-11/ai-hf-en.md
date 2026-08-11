# Hugging Face Trending Models Digest 2026-08-11

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-11 10:24 UTC

---

# Hugging Face Trending Models Digest — 2026-08-11

## 1. Today's Highlights

Video generation is the center of gravity: MiniMax-H3 and its ecosystem account for about a third of the trending list, and Comfy-Org's single-file conversion alone has 6,798,796 downloads. Moonshot AI's Kimi-K3 collected 10,493 likes, making it the most-liked new multimodal LLM and a strong signal for compressed-tensor architectures. DeepSeek-V4-Flash-0731 leads practical adoption with 1,048,685 downloads, while unsloth's GGUF conversion adds 207,990. FLUX.1-dev remains the text-to-image anchor with 14,087 likes, and NVIDIA expanded into voice chat and robotics rather than general chat. Overall, open-weight models are quickly surrounded by quantization and ComfyUI-ready derivatives within days of release.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [`deepseek-ai/DeepSeek-V4-Flash-0731`](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,105 | 1,048,685 | Fast text-generation flagship from DeepSeek, designed for conversational use. It leads the week's non-image models with 1,048,685 downloads, confirming strong demand in serving and GGUF workflows. |
| [`LiquidAI/LFM2.5-2.6B`](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 511 | 93,668 | Small 2.6B text-generation model with conversational tuning. It is trending for delivering capable language performance in a compact size, with a matching GGUF release from the same team. |
| [`deepgrove/maple-preview`](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 322 | 2,049 | Preview mixture-of-experts causal language model from deepgrove. It stands out as an early-access MoE design, drawing attention from researchers tracking new efficient architectures. |
| [`inclusionAI/Ling-3.0-flash`](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 296 | 6,148 | Flash text-generation model using the bailing_hybrid architecture and custom code. Its lightweight conversational focus is attracting early adopters looking for fast hybrid inference. |
| [`SyzygyResearch/Mach-1-Additive-35B`](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 120 | 2,511 | Research-oriented 35B model built on a Qwen3.5 MoE base with ternary and additive weight exploration. It is worth watching for its unusual architecture experiments rather than as a turnkey chat model. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [`black-forest-labs/FLUX.1-dev`](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,087 | 475,396 | State-of-the-art open text-to-image diffusion model from Black Forest Labs. It remains the category anchor with 14,087 likes and is widely used as a dev checkpoint for image generation. |
| [`moonshotai/Kimi-K3`](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,493 | 1,565,484 | Compressed image-text-to-text model from Moonshot AI based on the kimi_k3 architecture. It is the week's most-liked new multimodal LLM, boosted by compressed-tensor efficiency and 1,565,484 downloads. |
| [`MiniMaxAI/MiniMax-H3`](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,494 | 59,368 | Image-text-to-video foundation model that anchors the MiniMax-H3 video ecosystem. Its 3,494 likes and multiple downstream packages make it the week's defining generative video release. |
| [`Comfy-Org/MiniMax-H3`](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,179 | 6,798,796 | ComfyUI single-file distribution of MiniMax-H3 from Comfy-Org. It trended because it packages the video model for easy use in ComfyUI, accumulating 6,798,796 downloads. |
| [`meta-models/Muse-Glimmer-30B`](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 916 | 0 | Image-text-to-text conversational model from meta-models using the muse_glimmer architecture. It is trending as a new multimodal LLM with immediate GGUF support from unsloth and the authors. |
| [`nvidia/NVIDIA-NemotronLabs-VoiceChat-11B`](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 309 | 653 | Voice-chat model from NVIDIA Nemotron Labs, spanning audio and text interaction. It is notable for bringing NVIDIA's spoken-dialogue research into a compact 11B package. |
| [`lightx2v/Minimax-h3-Turbo`](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 264 | 20,376 | Turbo variant of MiniMax-H3 for image-to-video with diffusers t2v/i2v/r2v support. It is trending as a faster community alternative for video generation. |
| [`Kijai/MiniMax-H3_comfy`](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 263 | 0 | ComfyUI custom-node implementation for MiniMax-H3 by Kijai. It appears alongside the base model because ComfyUI users need a native integration package. |
| [`Kijai/MiniMax-H3-experimental`](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 188 | 0 | Experimental ComfyUI package for MiniMax-H3. It is drawing attention for early access to newer or unstable video-generation features. |
| [`endless-frontier/BigBang-v1`](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 159 | 708 | Image-text-to-text conversational model based on a Qwen3.5 MoE architecture. It is trending as a community MoE multimodal model with a large-scale "big bang" design. |
| [`Kijai/MiniMax-H3-TAE`](https://huggingface.co/Kijai/MiniMax-H3-TAE) | Kijai | 104 | 0 | Temporal AutoEncoder (TAE) component for MiniMax-H3, Apache-2.0 licensed. It is important for users working on latent-space video decoding and ComfyUI pipelines. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [`baidu/Unlimited-OCR`](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,010 | 2,892,191 | Large OCR model from Baidu with unlimited-ocr and feature-extraction tags. It is one of the week's strongest specialized entries, with 4,010 likes and 2,892,191 downloads. |
| [`mistralai/Shieldstral-1.0-3B`](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 225 | 6,769 | 3B guardrail/safety model from Mistral AI, built on mistral3 and optimized for vLLM. It is trending as a lightweight responsible-AI layer for production deployments. |
| [`nvidia/Alpamayo2-Super`](https://huggingface.co/nvidia/Alpamayo2-Super) | nvidia | 102 | 6,257 | Robotics model from NVIDIA built around alpamayo2_super. It shows growing interest in embodied AI and is notable as an enterprise-grade specialized release. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [`DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF`](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,877 | 2,521,093 | Community GGUF fine-tune based on Qwen3.6-27B with "uncensored/heretic" stylization. It has 2,521,093 downloads, making it one of the most adopted custom GGUF packs this week. |
| [`unsloth/DeepSeek-V4-Flash-0731-GGUF`](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 644 | 207,990 | Unsloth's GGUF conversion of DeepSeek-V4-Flash-0731. It adds 207,990 downloads within the same trend window, making local deployment of DeepSeek V4 practical. |
| [`larryvrh/MiniMax-H3-Turbo-Lora`](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 615 | 0 | LoRA adapter targeting MiniMax-H3 for turbo text-to-video and audio-video generation. It is trending as a lightweight way to speed up or modify H3 outputs. |
| [`ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot`](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 449 | 0 | INT8 ComfyUI-packaged fine-tune of Qwen3-VL-32B with a "Heretic-H3" twist. It is notable for combining vision-language capability with ComfyUI-ready quantization. |
| [`SexGod1979/PinkCherry_MiniMax-H3`](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 260 | 0 | Community text-to-video fine-tune of MiniMax-H3. It is gaining likes for applying a distinct "PinkCherry" style to H3 video generation while keeping an Apache-2.0 license. |
| [`drbaph/MiniMax-H3-Turbo-Lora-ComfyUI`](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 257 | 0 | Pruned LoRA adapter for MiniMax-H3-Turbo packaged for ComfyUI. It targets users who want turbo video generation without manual adapter setup. |
| [`unsloth/Muse-Glimmer-30B-GGUF`](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 247 | 0 | Unsloth GGUF conversion of Muse-Glimmer-30B. It gives immediate llama.cpp compatibility for the multimodal model, though downloads are still early. |
| [`LiquidAI/LFM2.5-2.6B-GGUF`](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 189 | 111,942 | Official GGUF release of LiquidAI's 2.6B LFM2.5 language model. It is optimized for llama.cpp and has already accumulated 111,942 downloads. |
| [`meta-models/Muse-Glimmer-30B-GGUF`](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 173 | 0 | Author-provided GGUF of Muse-Glimmer-30B. It is useful for comparing author vs unsloth quantization and for running the multimodal model in llama.cpp. |
| [`sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4`](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 158 | 0 | NVFP4-quantized Qwen3-VL-32B text encoder intended for MiniMax-H3 ComfyUI workflows. It is an example of GPU-efficient quantization for hybrid video/vision pipelines. |
| [`lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA`](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 121 | 353 | LoRA adapter from lightx2v for rewriting prompts in MiniMax-H3 workflows. It is trending as a small PEFT component that improves prompt quality for video generation. |

## 3. Ecosystem Signal

The trending list shows three clear signals. First, video generation is consolidating around MiniMax-H3: base weights, ComfyUI single-file releases, Turbo LoRAs, a temporal autoencoder, and prompt-rewriting adapters all appeared in the same weekly window. Second, open-weight models dominate, but the action is shifting to derivatives—GGUF conversions from unsloth and LiquidAI, INT8 and NVFP4 packs for Qwen-VL/H3 text encoders, and community "uncensored/heretic" fine-tunes. These formats lower the barrier to local deployment and have become a fast path to traction. Third, DeepSeek, Qwen/Muse, and LiquidAI families are gaining momentum; DeepSeek-V4-Flash-0731's 1M+ downloads and its unsloth GGUF show that efficient inference is as valuable as raw capability. Proprietary API models are absent from the top of this list; the ecosystem is shipping open weights, permissive fine-tunes, and quantized runtimes.

## 4. Worth Exploring

- [`moonshotai/Kimi-K3`](https://huggingface.co/moonshotai/Kimi-K3) — A compressed image-text-to-text LLM with 10,493 likes and 1,565,484 downloads. It is the best single model to study for high-efficiency multimodal serving and compressed-tensor architectures.
- [`MiniMaxAI/MiniMax-H3`](https://huggingface.co/MiniMaxAI/MiniMax-H3) — The base model behind the week's largest video-generation ecosystem. Try it with Comfy-Org's single-file release and Kijai's TAE/LoRA components to understand production ComfyUI video workflows.
- [`deepseek-ai/DeepSeek-V4-Flash-0731`](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) — The most-adopted new text-generation model, with 1,048,685 downloads. Its unsloth GGUF makes it an ideal reference for open-weight deployment and quantization.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*