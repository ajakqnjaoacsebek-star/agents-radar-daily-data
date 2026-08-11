# Hugging Face Trending Models Digest 2026-08-11

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-11 07:02 UTC

---

# Hugging Face Trending Models Digest — 2026-08-11

## 1. Today's Highlights

This week's Hub is dominated by MiniMax-H3: the open video-generation model has already spawned ComfyUI ports, LoRA adapters, turbo variants, prompt rewriters, a TAE, and even Qwen-VL/H3 hybrid experiments — making it the fastest-growing ecosystem in this digest. Moonshot AI's Kimi-K3 leads new multimodal releases with 10,483 likes and 1.51M downloads, while DeepSeek-V4-Flash-0731 shows strong production traction with 954k downloads plus an immediate GGUF quantization. Meta's Muse-Glimmer-30B and Baidu's Unlimited-OCR also signal major community interest in vision-language and document-AI workloads. Established open models like FLUX.1-dev and whisper-large-v3 remain evergreen, proving that lasting utility beats short-term hype.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,087 | 954,441 | DeepSeek's fast open-weight chat model for text generation and conversational use. Its near-million downloads show strong real-world adoption, and a popular GGUF quantized version is already available. |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 499 | 89,680 | A compact 2.6B language model from LiquidAI designed for efficient deployment. It is trending as a small, capable LLM with official GGUF weights for local inference. |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 320 | 1,344 | A preview text-generation model built on a Mixture-of-Experts causal architecture. It is drawing attention for exploring sparse, high-capacity LLM designs. |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 293 | 5,261 | A flash-tuned conversational model using the Bailing hybrid architecture. Its custom_code and safetensors tags make it a notable experimental entry in efficient LLMs. |
| [Mach-1-Additive-35B](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 116 | 2,129 | A 35B Qwen3.5-MoE-inspired model using ternary and additive weight schemes. It stands out for pushing parameter-efficiency research in open-weight LLMs. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,466 | 47,468 | Flagship image-text-to-video model and the center of this week's ecosystem wave. Its base weights are powering ComfyUI ports, LoRAs, turbo variants, and prompt-rewriting add-ons. |
| [MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,163 | 6,009,639 | ComfyUI single-file distribution of MiniMax-H3. It is the most-downloaded model in this digest and the default way many users run H3 locally. |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 850 | 0 | Meta's open image-text-to-text model for vision-language conversations. Despite zero tracked downloads, its high likes and immediate GGUF follow-up reveal strong community anticipation. |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,483 | 1,510,032 | Moonshot AI's compressed multimodal model with feature-extraction and compressed-tensors support. It is one of the most-liked new releases this week and has already surpassed 1.5M downloads. |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 262 | 15,087 | A turbo image-to-video variant of MiniMax-H3 built with Diffusers. Its real download momentum shows immediate appetite for faster video generation. |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 305 | 597 | NVIDIA's 11B voice-chat model for spoken dialogue. It is trending as an audio-centric multimodal model, backed by a chain of safety and RLHF research references. |
| [FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,082 | 480,762 | Black Forest Labs' open text-to-image generation model. It remains a top benchmark and default choice for high-quality open image generation. |
| [MiniMax-H3-TAE](https://huggingface.co/Kijai/MiniMax-H3-TAE) | Kijai | 103 | 0 | Temporal autoencoder component for MiniMax-H3 video encoding and decoding. It is an important building block in the H3 ComfyUI pipeline. |
| [MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 263 | 0 | Kijai's ComfyUI-oriented packaging of MiniMax-H3. It signals strong demand for plug-and-play H3 video workflows. |
| [MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 185 | 0 | Experimental MiniMax-H3 build from Kijai for early adopters. It reflects how rapidly the community is iterating on H3 tooling and inference paths. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,006 | 2,921,751 | Baidu's high-performance OCR model for image-text-to-text and feature extraction. With over 2.9M downloads, it is the standout specialized model of the week. |
| [whisper-large-v3](https://huggingface.co/openai/whisper-large-v3) | openai | 6,132 | 4,901,834 | OpenAI's mature automatic-speech-recognition model. It remains one of the most-downloaded models on the Hub and a default open speech-to-text baseline. |
| [Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 224 | 6,343 | A compact 3B safety and guardrail classifier from Mistral. It is trending as a lightweight moderation model for vLLM deployments and LLM safety stacks. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 640 | 199,167 | Unsloth's GGUF quantization of DeepSeek-V4-Flash. It makes the popular 954k-download model easy to run locally in llama.cpp and similar runtimes. |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 235 | 0 | Unsloth's GGUF conversion of Meta's Muse-Glimmer-30B for local vision-language inference. Its early appearance underscores demand for immediately runnable multimodal weights. |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 167 | 0 | Author-side GGUF variant of Muse-Glimmer-30B. It shows that an official model now ships with quantization from day one. |
| [LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 186 | 89,611 | Official GGUF packaging of LiquidAI's 2.6B model. Its near-90k downloads highlight strong demand for small, quantized local LLMs. |
| [Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,871 | 2,439,083 | A community Qwen3.6 27B fine-tune and merge with GGUF packaging and multi-token prediction. Its 2.4M downloads make it the most-downloaded community fine-tune in this digest. |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 608 | 0 | LoRA adapter for MiniMax-H3-Turbo text-to-video generation. It represents the fast-growing ecosystem of lightweight H3 style and behavior mods. |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 255 | 0 | ComfyUI-ready LoRA for MiniMax-H3-Turbo. It makes H3 Turbo customization more accessible to node-based video artists. |
| [MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 119 | 268 | Prompt-rewriting LoRA designed to improve MiniMax-H3 outputs. It highlights the community's push toward more controllable video generation. |
| [PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 257 | 0 | Community text-to-video fine-tune of MiniMax-H3 with Apache-2.0 and endpoints_compatible tags. It shows rapid third-party styling on the H3 base. |
| [Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 445 | 0 | A ComfyUI-oriented INT8 Qwen3-VL-32B variant fused with H3. It exemplifies the extreme community merges pushing toward multimodal video workflows. |
| [Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 156 | 0 | NVFP4-quantized Qwen3-VL-32B text-encoder for MiniMax-H3 in ComfyUI. It targets reduced memory usage in H3-based pipelines. |

## 3. Ecosystem Signal

MiniMax-H3 is clearly the center of gravity this week: a single open video model has spawned ComfyUI ports, LoRA variants, prompt rewriters, TAE components, and even Qwen-VL/H3 hybrids. This signals that open video generation is shifting from standalone checkpoints to composable, ComfyUI-driven workflows. In LLMs, DeepSeek-V4-Flash and LiquidAI LFM2.5 demonstrate a common pattern: strong full-precision releases are immediately followed by GGUF quantizations from Unsloth and the original authors. Open-weight models are dominating the leaderboard — even NVIDIA, Meta, and OpenAI entries are openly available. Fine-tuning activity is intense but low-barrier; many high-like H3 adapters and “Heretic” Qwen merges have zero tracked downloads, suggesting they are shared as community artifacts rather than production packages. Overall, the ecosystem is prioritizing ease of deployment, local quantization, and rapid iteration on visually creative tasks.

## 4. Worth Exploring

- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — The strongest new multimodal release by likes, with compressed-tensors and feature-extraction support. It is worth studying for efficient vision-language inference at scale.
- **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)** — With 2.9M downloads and 4k likes, it is the clearest signal that OCR and document intelligence remain high-value open-model use cases.
- **[Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3)** — The single most-downloaded model in this digest. It is the easiest on-ramp for understanding both ComfyUI video workflows and how single-file diffusion models are distributed.