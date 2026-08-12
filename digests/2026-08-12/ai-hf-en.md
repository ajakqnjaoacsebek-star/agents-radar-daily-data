# Hugging Face Trending Models Digest 2026-08-12

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-12 02:00 UTC

---

# Hugging Face Trending Models Digest — 2026-08-12

## 1. Today's Highlights

MiniMax-H3 is the week's dominant ecosystem, extending far beyond its official release into ComfyUI ports, LoRAs, prompt rewriters, and GGUF quantizations. Moonshot AI's Kimi-K3 is the highest-liked model in this digest with 10,528 likes, a compressed multimodal release that has already drawn 1.56M downloads. DeepSeek-V4-Flash-0731 remains a production favorite, crossing 1M downloads while its unsloth GGUF quant adds another 208K. Baidu's Unlimited-OCR also stands out with 2.89M downloads, showing strong demand for specialized document-understanding models. Across the board, open-weight models are generating large, active communities around local inference and workflow integrations.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,153 | 1,048,685 | DeepSeek's latest flash text-generation model, tagged for conversational use. Its 1M+ downloads make it one of the most widely adopted LLMs in this week's digest. |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 550 | 93,668 | A compact 2.6B text-generation model from LiquidAI with a focus on efficient inference. Its strong download count and official GGUF sibling signal demand for small, deployable LLMs. |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 332 | 2,049 | A preview text-generation model built on a mixture-of-experts causal LM architecture. It is trending as an early open-weight look at a new MoE design. |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 303 | 6,148 | inclusionAI's conversational flash LLM using the bailing_hybrid architecture and custom code. It is positioned as a fast, open-license option and is quickly gaining community traction. |
| [Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 154 | 0 | A tiny variant of the Ling-3.0 family, MIT-licensed and designed for lightweight deployments. It has zero downloads so far but is drawing attention as an on-device-scale release. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,528 | 1,565,484 | Moonshot AI's image-text-to-text multimodal model with compressed-tensors and feature-extraction tags. It leads the digest in likes and is a major open multimodal release. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,579 | 59,368 | The official MiniMax-H3 image-text-to-video model, supporting both text-to-video and image-to-video generation. It anchors an entire ecosystem of LoRAs, ComfyUI ports, and quantizations. |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,101 | 0 | A 30B image-text-to-text conversational model from meta-models. It has high likes despite zero public downloads, suggesting strong research or preview-stage interest. |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 341 | 20,376 | A diffusers-based image-to-video model tuned from MiniMax-H3 for faster generation. Its t2v/i2v/r2v tags and 20K downloads show strong interest in video variants. |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 326 | 653 | NVIDIA's voice chat model with references to recent speech and audio arxiv research. It signals growing open-weight work in voice-enabled assistants. |
| [PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 265 | 0 | A community text-to-video adaptation of MiniMax-H3, Apache-2.0 licensed and endpoints-compatible. It illustrates the range of stylized community checkpoints being built on H3. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 226 | 39 | A single-file diffusion model covering image-to-video, text-to-video, and video-to-video tasks. It is a new open alternative in the generative video space. |
| [BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 166 | 708 | An image-text-to-text model built on a Qwen3.5 MoE backbone. It combines conversational multimodal capabilities with a mixture-of-experts architecture. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,019 | 2,892,191 | Baidu's OCR-focused image-text-to-text model, tagged for unlimited-ocr and feature-extraction. It is the most downloaded specialized model in this digest, reflecting strong document-AI demand. |
| [Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 228 | 6,769 | Mistral AI's 3B safety and guardrail model built for vLLM and Mistral Common. It targets the growing need for lightweight shield models in agentic systems. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,899 | 2,521,093 | A heavily fine-tuned, uncensored Qwen3.6-derived GGUF with a long feature stack. It is the most downloaded community fine-tune in this digest. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,212 | 6,798,796 | A ComfyUI single-file diffusion version of MiniMax-H3 referencing the official base model. It is the overall top-downloaded model this week with 6.80M downloads. |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 651 | 0 | A LoRA for MiniMax-H3 Turbo covering text-to-video and text-to-audio tasks. It has high likes for a zero-download release, indicating strong community anticipation. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 649 | 207,990 | Unsloth's GGUF quantization of DeepSeek-V4-Flash-0731. It is the standard local-inference path for DeepSeek's popular flash model. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 459 | 0 | An INT8 ComfyUI-ready conversion of a heavily modified Qwen3-VL-32B "Heretic" variant. It shows the community pushing multimodal VL models into ComfyUI pipelines. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 307 | 0 | Unsloth's GGUF conversion of the Muse-Glimmer 30B multimodal model. It enables local execution of a model with no public download count yet. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 276 | 0 | Kijai's ComfyUI implementation/config for MiniMax-H3. It is a key integration piece for running H3 video generation inside ComfyUI. |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 275 | 0 | A pruned LoRA adapter for MiniMax-H3 Turbo packaged for ComfyUI. It makes the Turbo LoRA immediately usable in node-based workflows. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 203 | 0 | Official GGUF weights for the Muse-Glimmer 30B multimodal model. It lowers the barrier for running this conversational model locally. |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 201 | 111,942 | The llama.cpp-compatible GGUF version of LiquidAI's 2.6B model. Its 112K downloads indicate heavy use for local and edge LLM inference. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 192 | 0 | An experimental ComfyUI variant for exploring newer MiniMax-H3 features. It highlights the fast-moving, iterative nature of the H3 community. |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 131 | 19,250 | NVIDIA's 30B-A3B text-generation model in NVFP4 quantized format. It brings a high-capacity sparse MoE model to 4-bit-class precision. |
| [MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 130 | 353 | A PEFT LoRA designed for prompt rewriting in the MiniMax-H3 ecosystem. It is a practical companion for improving video-generation prompts. |
| [MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 114 | 0 | A LoRA focused on improving realism for people in MiniMax-H3 video generation. It targets a core creative use case within the growing H3 LoRA ecosystem. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 110 | 781 | Unsloth's GGUF conversion of MiniMax-H3 for stable-diffusion.cpp and video generation. It extends the H3 video model to local GPU/CPU inference stacks. |

## 3. Ecosystem Signal

The biggest signal this week is the **MiniMax-H3 ecosystem effect**: at least 11 of the 30 trending models are directly tied to H3, spanning official weights, ComfyUI ports, LoRAs, prompt rewriters, and GGUF quantizations. This mirrors LLM fine-tuning culture now fully arriving in video generation. Meanwhile, **multimodal image-text-to-text models** are surging — Kimi-K3, Muse-Glimmer, BigBang-v1, and Unlimited-OCR all show that open-weight multimodal releases are becoming central to the Hub.

Open-weight adoption is clearly **production-driven**, with DeepSeek-V4-Flash and Baidu Unlimited-OCR both crossing millions of downloads. Quantization remains a key distribution layer: unsloth GGUF conversions, DavidAU's massive Qwen3.6 GGUF, and NVIDIA's NVFP4 release all demonstrate that users want local-first, workflow-ready versions of frontier open models. The combination of permissive licenses, ComfyUI integrations, and fast quantized variants is defining how open models travel from release to real-world use.

## 4. Worth Exploring

- **Kimi-K3** — The week's highest-liked model at 10,528 likes. It is a compressed multimodal model that balances strong capability with efficient inference, making it an important reference point for the next generation of open vision-language systems.
- **MiniMax-H3 + Comfy-Org/MiniMax-H3** — Beyond the official model, the ComfyUI single-file version has 6.80M downloads. Studying the H3 ecosystem shows how a strong base video model can quickly spawn LoRAs, workflow integrations, and local quantizations.
- **DeepSeek-V4-Flash-0731** — With 1M+ downloads, it is one of the most production-ready open LLMs in this digest. Pair it with unsloth's GGUF to see how a flagship model gets packaged for local deployment.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*