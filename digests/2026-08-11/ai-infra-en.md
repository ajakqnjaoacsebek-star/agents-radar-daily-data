# AI Infrastructure Digest 2026-08-11

> Generated: 2026-08-11 10:24 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# AI Infrastructure Ecosystem Report — 2026-08-11

## 1. Ecosystem Overview

Today's digests show an inference ecosystem in active transition: vLLM shipped its largest release to date (v0.27.0, 561 commits) with full-stack Kimi K3 support, while SGLang, llama.cpp, Ollama, and Unsloth all converged on the same frontier models (DeepSeek-V4, Muse Glimmer, MTP variants) with varying levels of maturity. Hardware diversification is accelerating — ROCm/gfx950 kernels, Ascend NPU ports, MLX on Apple Silicon, and Windows-on-Arm builds are all advancing in parallel — yet stability on non-NVIDIA backends remains a production risk. A second major theme is the emergence of new attention architectures (delta-rule/MLA variants, DSA, MTP) requiring novel kernels and CUDA Graph replay semantics; multiple open regressions across projects show this transition is not yet complete. Finally, security hardening (cosign-signed images, pickle-safe loading, GGUF metadata bounds) and agentic-workload correctness (tool-calling, multi-model routing, long-lived runner isolation) are becoming first-class engineering concerns rather than afterthoughts.

## 2. Activity Comparison

| Project | Release Status | Key Volume Indicators | Notable PRs / Fixes |
|---|---|---|---|
| **vLLM** | **v0.27.0** shipped (major); 561 commits, 242 contributors, 64 first-time | ~15 critical open issues tracked; heavy 24h kernel/ROCm PR activity | Kimi K3 full-stack; online quant for partially pre-quantized checkpoints (#51392); gfx950 MLA kernel (#51803); dual-stream decode (#48223) |
| **SGLang** | No release in 24h window; active on 0.5.17 | 3 critical open issues (2 DSpark CUDA Graph, 1 scheduler hang); 10+ perf PRs merged | 3 bit-exact diffusion kernel fusions (−16.2% max on H100); Kimi-K3 Ascend NPU port; DSA indexer fold into aiter GEMM |
| **llama.cpp** | **10 releases** (b10338–b10358) in window | 7 high-severity open issues; 15+ merged/under-review PRs | Multi-output backend sampling (#25532); Granite-Switch arch (#25107); ROCm 7.14 CI upgrade (#25775); XOR swizzle flash-attn (#25635) |
| **Ollama** | **v0.32.8** + **v0.32.7** shipped (Muse Glimmer GA) | 11 ranked regressions; 7 fix PRs in flight; 2 release-quality issues (missing Docker tag, mis-packaged MLX tag) | MLX Nemotron 3 (#17060); Gemma4 vision MLX (#17650); WoA CPU fix (#17654); null config handling (#17624) |
| **LiteLLM** | **v1.96.0** shipped (cosign-signed images) | 2 critical, 3 high, 3 medium open issues; ~10 PRs merged | Rust `/messages` DeepSeek parity (#36520); MiniMax image gen adapter (#35737); custom pricing propagation fix (#36521) |
| **Unsloth** | **v0.1.61-beta** shipped (Muse Glimmer support) | 3 fixed regressions, ~10 open ROCm/Studio edge cases; 15+ PRs merged | `weights_only` pickle hardening (#8409); Windows drive-letter fix (#8399); 404 on mistyped model IDs (#8389); DFlash sidecar auto-launch (#8338) |

**Velocity signal:** llama.cpp is shipping at an extremely high cadence (10 releases/day), vLLM is consolidating a large contributor base into one major release, and SGLang is investing heavily in performance PRs while deferring releases. LiteLLM's Rust gateway migration is the strategic pivot to watch — it may fundamentally change its role from Python proxy to performance-critical infrastructure component.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **Kimi K3** (MLA + delta-rule + AttnRes) | **Full-stack in v0.27.0** (models, kernels, Python/Rust frontends); ROCm roadmap tracked (#50682) | GPU integration + **Ascend NPU port** (#33465); Kernel fusions for K2.5 MLA | Not in notable release activity | Not mentioned | Not mentioned |
| **DeepSeek-V4-Flash / DSpark** | **SM8x (A100) still unsupported** (#50576); ROCm gfx11 enabled (#47017); ~8× KV cache overhead flagged (#51041); **critical regression on 0.27.0** (#51758) | Most mature serving surface: ROCm DSA/MLA fusions merged; **2 open CUDA Graph illegal-memory issues on TP8** (#31023, #33356); scheduler hang on hierarchical cache + chunked prefill (#34235) | RPC backend failure on multi-node CPU (#26820); garbled output on Strix Halo ROCm (#25436); multi-seq rollback fix merged | Not mentioned | Not mentioned |
| **Muse Glimmer 30B** (Meta, Apache 2.0) | Not mentioned | Not mentioned | Not in release activity (related Granite-Switch arch landed b10342) | **GA on all platforms (v0.32.8)**; MLX tag mis-packaged (#17656); Docker image missing (#17668) | **Supported with Dynamic quants (v0.1.61-beta)**; GGUF arch detection fixed |
| **Granite-Switch** (dense all-attention + per-token LoRA adapters) | Not mentioned | Not mentioned | **Shipped in b10342** (#25107) — only implementation | Not mentioned | Not mentioned |
| **Nemotron 3 / MTP** | MTP + V1 engine + GLM-5.1 hangs under load (#40926) | FlashAttention-4 deterministic support for GLM-4.7-Flash (#33945) | **Nemotron MTP support** (#26744); MTP state-retention bug open (#26425) | **MLX support for Nemotron 3 Nano Omni** (#17060) | DFlash/MTP sidecar auto-launch; MTP probe reliability fix |
| **GLM-5.x / Qwen3.6** | GLM-5.1 hang under sustained traffic | DSA indexer fusion for GLM5/DeepSeek (#34394) | Qwen3.5 tool-call XML bug (#20837) highest-engagement open issue | Qwen3.6 loading regression (#17517) | MTP/KV regressions on Qwen3.6 |
| **Minimax M3** | Partially pre-quantized online quant (#51392) covers | **W8A8 on NPU** (#33040) | Not mentioned | Not mentioned | **UD-Q5_K_XL fails on Apple Silicon** (#8360) |

**Who is ahead?** For **Kimi K3**, vLLM is the clear leader (full-stack in one release), while SGLang leads on **DeepSeek-V4** serving maturity (more fused kernels, established ROCm path) but is contending with CUDA Graph instability on TP8. **Ollama** won the Muse Glimmer distribution race, though Unsloth matched it for fine-tuning workflows and llama.cpp has the architectural edge (Granite-Switch) that may underpin future Glimmer variants. **llama.cpp** remains the broadest architecture adopter per release cadence.

## 4. Performance Frontier

Optimization efforts cluster into five areas today:

1. **KV cache and attention kernels for new architectures.** The delta-rule/MLA/DSA shift is forcing novel kernel work across every engine: vLLM added fused KDA decode (#50654) and gfx950 MLA kernels (#51803), SGLang folded DSA indexer q/k prep into a single aiter GEMM (#34394) and fused MLA projection + RoPE + KV write (#32935), and llama.cpp fixed flash-attn smem bank conflicts with XOR swizzling (#25635). The KV cache expansion of DeepSeek-V4-Flash (~8× per-token on H20, #51041 vLLM) is a concrete capacity problem deployers must plan for.

2. **Speculative decoding / MTP.** All engines are investing here: llama.cpp landed multi-output backend sampling (#25532) — foundational for token-speculation; Unsloth made MTP/DSpark sidecar discovery and probing reliable; vLLM has MTP + V1 engine hangs under load (#40926) still open; SGLang reports DSpark graph-replay flakiness on TP8. This is the least standardized and highest-risk performance area.

3. **CUDA Graph replay and streaming semantics.** SGLang's RFC #32432 (explicit metadata, workspace, stream-ownership contracts for dynamic replay) is a design-level response to the DSpark illegal-memory issues. vLLM is similarly adding dual-stream decode and CSA multi-stream overlap (#51794, #48223). Both are converging on the same problem: CUDA Graphs were not designed for multi-model, multi-group, or persistent workloads.

4. **Quantization breadth.** vLLM's online quantization for partially pre-quantized checkpoints (#51392), SGLang's MXFP4 output-quant fusion (#33873) and NVFP4 checkpoint path (#26543), llama.cpp's DP2A/DP4A proposal (#24616), and Unsloth's Dynamic quants for Muse Glimmer show quantization is no longer a model-conversion step but a runtime serving feature.

5. **Diffusion serving as a first-class workload.** SGLang merged three bit-exact kernel fusions (RoPE + GELU-mul, SwiGLU silu-mul, adaLN modulate) cutting denoise latency up to 16.2% on H100. No other engine is investing here — this is a differentiation opportunity.

**Notable outlier:** llama.cpp's MoE host-RAM offload proposal (#26448) — 23 GB MoE on 1.6 GB VRAM — is speculative but, if implemented, would change the economics of local MoE serving and is echoed by Ollama's #17557.

## 5. Layer Positioning

| Layer | Projects | Core Value / Role | Key Differentiation |
|---|---|---|---|
| **Production serving engines** | vLLM, SGLang | Multi-GPU/multi-node high-throughput inference with advanced scheduling, CUDA Graph capture, dynamic batching | vLLM: scale/contributor momentum, first full Kimi K3 stack. SGLang: deeper kernel-level fusions (esp. ROCm/diffusion), NPU path |
| **Local / edge runtime** | llama.cpp | Single-machine/CPU/GPU GGUF execution, maximal architecture coverage, quantization ecosystem | 10-releases/day cadence, GGUF format ownership, multi-output sampling as enabling primitive |
| **User-facing local deployment** | Ollama | Wraps llama.cpp for frictionless single-command model serving; API + model registry + cross-platform installers | Muse Glimmer GA distribution; MLX engine; strongest consumer/agent-tool integration surface (Claude Code, VS Code) |
| **Gateway / router / auth / cost layer** | LiteLLM | Sits between applications and hundreds of providers; API translation, budget enforcement, load balancing, observability | Now moving to Rust for sub-1ms overhead — a strategic threat to Python-based gateways; supply-chain hardening via cosign |
| **Fine-tuning / training plus inference** | Unsloth | Parameter-efficient fine-tuning (Q-LoRA etc.) with an emerging local serving story (Studio) | Muse Glimmer Dynamic quants, DFlash sidecar speculation, training-to-serving continuity (same GGUF ecosystem) |

The stack is stratifying cleanly: **vLLM/SGLang own the datacenter**, **llama.cpp is the universal runtime substrate**, **Ollama is the distribution + developer-experience layer on top of it**, **LiteLLM is the control plane**, and **Unsloth owns the training-to-inference handoff**. The most interesting overlap: Unsloth's Studio is evolving toward an inference gateway (OpenAI-compatible endpoints, audio APIs, multi-model routing), which would put it in both Ollama's and LiteLLM's lane. The second most interesting overlap: vLLM and SGLang are both becoming full-shape serving platforms, with SGLang's kernel-level investment potentially paying off on ROCm where vLLM still has more open roadmaps than merged kernels.

## 6. Trend Signals

1. **Delta-rule / linear-attention architectures are the new kernel battleground.** Kimi K3 and DeepSeek-V4 are dominating roadmap discussions across all five engines. The KV cache is no longer a static store — it is a recurrent state requiring per-decode-step kernel updates. This is a fundamental serving change, not an incremental optimization. Watch for standardization of MTP/DSA/MLA kernel contracts across engines over the next quarter.

2. **ROCm/AMD is the most active non-CUDA platform, but production-readiness is gappy.** vLLM has gfx950 decode kernels merged and a Kimi-K3 ROCm roadmap; SGLang has a steady stream of ROCm fusions; llama.cpp moved to ROCm 7.14 CI; Unsloth has multiple open RDNA bugs (installer misdetection, hipconfig shadowing, memory-guard sentinel). If you're deploying on AMD for cost reasons, budget time for platform-specific debugging — the kernel coverage is ahead of the system-level reliability.

3. **MLX is quietly becoming a real serving target.** Ollama's MLX engine now has Nemotron 3 (with Mamba2 and MoE paths) and Gemma4 vision support. But the two critical MLX issues — long-lived runner cross-request response contamination (#17599) and single-request serialization (#17666) — make it unsuitable for multi-tenant agent workloads today. If your agents are Apple-Silicon-local and single-session, MLX is viable; otherwise stay on CUDA/ROCm.

4. **Agentic workloads are reshaping correctness requirements.** The highest-severity bugs across projects today are agent-path issues: tool-call parsing (llama.cpp #20837, Ollama #17444, Unsloth #8389), cross-request state leakage (Ollama #17599), model-routing misdirection (Unsloth #8376), and budget-enforcement bypasses (LiteLLM #26672). Multi-model agents are the new stress test. The Mu se Glimmer GA on Ollama, Unsloth Dynamic quants, and LiteLLM's Claude Code/Rust gateway work all signal agent-first positioning from every layer of the stack.

5. **Supply-chain hardening is becoming mandatory.** LiteLLM cosign-signs all Docker images, Unsloth is moving pre-quantized checkpoint loading to `weights_only`, llama.cpp is adding GGUF metadata bounds assertions, and vLLM's Docker images are now pinned in CI workflows. For anyone serving untrusted models or running multi-tenant gateways, this is the quarter to check your base images, model-loading paths, and registry provenance.

6. **For application developers specifically:** (a) pin vLLM to 0.26.x if you serve DeepSeek-V4-Flash — 0.27.0 has a known regression; (b) avoid SGLang hierarchical cache + chunked prefill on DeepSeek-V4/H20; (c) do not trust LiteLLM budget limits on v1.82.3 — verify enforcement; (d) if you're on Ollama and use VS Code Copilot tool calling, stay on 0.32.1; (e) if you're building on MLX, redesign to avoid long-lived multi-request runners until #17599 is fixed; (f) the most promising near-term gains are SGLang's diffusion fusions (bit-exact, no accuracy trade-off) and llama.cpp's multi-output sampling path once the quantized-target divergence (#25618) is resolved.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-11

## Today's Highlights
vLLM released **v0.27.0**, a major milestone with **561 commits from 242 contributors (64 new)** and full-stack **Kimi K3** support covering model files, kernels, Python/Rust frontends, and AttnRes kernels. The hottest ongoing thread remains **DeepSeek-V4-Flash on Ampere/SM8x** ([#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851)), while ROCm enablement and kernel-performance PRs dominate the 24-hour activity.

## Releases & Breaking Changes
- **[v0.27.0](https://github.com/vllm-project/vllm/releases/tag/v0.27.0)** — 561 commits, 242 contributors, 64 first-time contributors. Headline feature: **Kimi K3** support across core model files, kernels, Python/Rust frontends, and AttnRes kernels. No explicit migration notes were included in the release summary.

## New Model & Hardware Support
- **[Kimi K3 in v0.27.0](https://github.com/vllm-project/vllm/releases/tag/v0.27.0)** — Full-stack support landed in one release: core model/kernels, Python and Rust frontends, AttnRes kernels.
- **[#50576](https://github.com/vllm-project/vllm/issues/50576)** — Open feature request for **SM8x (A100/A800) support of DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 DSpark**; 98 comments and 12 👍, following the existing [#40851](https://github.com/vllm-project/vllm/issues/40851).
- **[#50682](https://github.com/vllm-project/vllm/issues/50682)** — Tracks the **Kimi-K3 gap/roadmap on ROCm**, including AITER fused-MoE integrations and backend enablement.
- **[#47017](https://github.com/vllm-project/vllm/pull/47017)** — Enables **DeepSeek-V4 checkpoints on ROCm gfx11/RDNA** by unblocking the sparse-indexer and platform validation paths.
- **[#51392](https://github.com/vllm-project/vllm/pull/51392)** — Adds online quantization for **partially pre-quantized checkpoints from any `quant_method`** (Quark, ModelOpt, compressed-tensors, etc.).
- **[#50632](https://github.com/vllm-project/vllm/pull/50632)** — Adds a **GSM8K accuracy gate for amd/DeepSeek-V4-Flash-MXFP4** on ROCm, using the MXFP4 MoE backend.
- **[#48215](https://github.com/vllm-project/vllm/pull/48215)** — Adds **tower/connector LoRA support for Ultravox** (multi-modal).

## Performance & Optimization
- **[#51041](https://github.com/vllm-project/vllm/issues/51041)** — DeepSeek-V4-Flash-0731 uses **~8× more KV cache per token (56 bytes/token)** than the preview, holding only ~150K tokens in 7.7 GiB on H20 TP=2; `max_model_len` caps around **121344**.
- **[#51803](https://github.com/vllm-project/vllm/pull/51803)** — New **Kimi-K3 DSpark draft MLA decode kernel for gfx950**; flattens non-causal multi-token blocks into per-query decode rows for Triton MLA.
- **[#50654](https://github.com/vllm-project/vllm/pull/50654)** — **Kimi-K3 fused KDA decode kernel** for ROCm: combines causal conv1d, gated delta-rule recurrence, and value-head updates per decode step.
- **[#48223](https://github.com/vllm-project/vllm/pull/48223)** — Enables **dual-stream decode with hipgraph compatibility** on ROCm, only when DP is enabled to avoid TP regressions.
- **[#51794](https://github.com/vllm-project/vllm/pull/51794)** — Enables **CSA multi-stream overlap for DeepSeek-V4** on ROCm (continues [#43718](https://github.com/vllm-project/vllm/pull/43718)).
- **[#49529](https://github.com/vllm-project/vllm/issues/49529)** — Proposal to adopt **PTX 9.4 `ldmatrix.s8.s4`** for in-flight INT4→INT8 expansion in W4A8-INT8 kernels.
- **[#49139](https://github.com/vllm-project/vllm/pull/49139)** — Fixes persistent top-k histogram reuse after short/medium rows, preventing incorrect results for radix rows following short rows.

## Stability & Regressions
- **[#51758](https://github.com/vllm-project/vllm/issues/51758)** — **Regression after upgrading 0.26.0 → 0.27.0**: DeepSeek-V4-Flash fails to run. Critical for users on that model path.
- **[#51744](https://github.com/vllm-project/vllm/issues/51744)** — `vllm/vllm-openai:latest` (vLLM 0.27.0) fails to start **Gemma-4-31B-it-QAT-NVFP4** with Transformers 5.15.0.
- **[#48266](https://github.com/vllm-project/vllm/issues/48266)** — **ROCm/gfx942 worker crash** with GPU memory access fault when sequences cross 2048 tokens (DeepSeek-V4-Flash, sparse_attn_indexer + fp8 KV cache, MI325X TP=4).
- **[#40926](https://github.com/vllm-project/vllm/issues/40926)** — V1 engine + MTP + GLM-5.1 (DSA + MoE + MLA) **workers hang under sustained traffic**, `sample_tokens` RPC timeout, `EngineDeadError`.
- **[#49497](https://github.com/vllm-project/vllm/issues/49497)** — **FlashInfer sampler JIT crashes engine startup** when `nvcc` isn’t discoverable; no automatic fallback to native sampler.
- **[#51063](https://github.com/vllm-project/vllm/issues/51063)** — Composite VLM wrapper (`Mistral3ForConditionalGeneration`) resolves `tie_word_embeddings` from the wrong config, **silently discarding a real `lm_head.weight`** (coherent vocab but incoherent output).
- **[#50687](https://github.com/vllm-project/vllm/issues/50687)** — Hybrid multi-group KV crash: `_update_requests_with_invalid_blocks` raises `ValueError: too many values to unpack` when a connector reports load-error blocks.
- **[#48953](https://github.com/vllm-project/vllm/issues/48953)** — Intel XPU: `zeMemOpenIpcHandle INVALID_ARGUMENT` on **dual Arc B50 (Battlemage) TP=2**.
- Fixes in progress: **[#51802](https://github.com/vllm-project/vllm/pull/51802)** fixes NVIDIA DeepSeek-V4 mHC warmup; **[#51766](https://github.com/vllm-project/vllm/pull/51766)** preserves Mamba running CoW after external hits; **[#47822](https://github.com/vllm-project/vllm/pull/47822)** skips lookahead allocation for running prefill chunks; **[#51622](https://github.com/vllm-project/vllm/pull/51622)** centralizes shared mmap cleanup in the CPU KV-offload worker.

## What This Means for Application Developers
- **Kimi K3 deployers** should upgrade to v0.27.0 for the first full supported stack; ROCm teams should track [#50682](https://github.com/vllm-project/vllm/issues/50682) and the upcoming gfx950/ROCm kernel PRs.
- **DeepSeek-V4-Flash on Ampere** remains unsupported; if you’re on A100/A800, monitor [#50576](https://github.com/vllm-project/vllm/issues/50576) and [#40851](https://github.com/vllm-project/vllm/issues/40851) before attempting deployment.
- **Immediate caution for upgrading to 0.27.0**: DeepSeek-V4-Flash ([#51758](https://github.com/vllm-project/vllm/issues/51758)) and NVFP4 Gemma-4 ([#51744](https://github.com/vllm-project/vllm/issues/51744)) are showing regressions; pin versions until fixes land or validate on non-production workloads first.
- If you rely on **NVFP4 KV caches on pre-SM100 GPUs**, watch [#47684](https://github.com/vllm-project/vllm/issues/47684) for FlashInfer support beyond Blackwell.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-11

## 1. Today's Highlights

DeepSeek-V4-DSpark CUDA Graph stability on TP8 remains the most active surface: two open illegal-memory issues ([#31023](https://github.com/sgl-project/sglang/issues/31023), [#33356](https://github.com/sgl-project/sglang/issues/33356)) plus a new RFC proposing formal replay contracts ([#32432](https://github.com/sgl-project/sglang/issues/32432)), alongside a fresh scheduler hang on 0.5.17 with hierarchical cache + chunked prefill ([#34235](https://github.com/sgl-project/sglang/issues/34235)). Diffusion serving is the bright spot — three bit-exact kernel-fusion PRs cut denoise latency by up to 16.2% on H100. Ascend NPU enablement advanced with Kimi-K3 and Minimax-M3 support, and multiple AMD ROCm MLA/DSA fusions are in flight.

## 2. Releases & Breaking Changes

None in the last 24 hours.

## 3. New Model & Hardware Support

- **Kimi-K3 on Ascend NPU** ([PR #33465](https://github.com/sgl-project/sglang/pull/33465)) — NPU port layered on the GPU integration from #32541; keeps shared/GPU behavior intact and dispatches NPU-specific kernels through the Ascend backend.
- **Minimax M3 (w8a8) on NPU** ([PR #33040](https://github.com/sgl-project/sglang/pull/33040)) — part 2/2 of the NPU adaptation.
- **GLM-4.7-Flash deterministic FA4** ([PR #33945](https://github.com/sgl-project/sglang/pull/33945)) — deterministic FlashAttention-4 support for GLM-4.7-Flash.
- **NVFP4 quantization improvements** ([PR #26543](https://github.com/sgl-project/sglang/pull/26543), WIP) — ModelOpt NVFP4 checkpoint loading path, starting with config/loading fixes.
- **Kimi-K3 VLM preprocessing cache** ([PR #34404](https://github.com/sgl-project/sglang/pull/34404)) — per-image processor artifacts are now cached and shared across prompts, decoupled from turn-level prompt composition.
- **MiMo-V2.5 audio tokenizer** ([PR #33198](https://github.com/sgl-project/sglang/pull/33198)) — fixes causal sliding-window attention (128, 0) regressed by the TP-aware VisionAttention refactor.
- **Apple Silicon** — RFC ([#32321](https://github.com/sgl-project/sglang/issues/32321)) consolidates the Torch/MLX runner-stub split into one Torch-owned SRT path with an exported whole-model MLX region; event-loop contract RFC ([#32833](https://github.com/sgl-project/sglang/issues/32833)) targets four MLX event-loop bugs seen in July.
- **Cambricon MLU** in-tree support RFC ([#26438](https://github.com/sgl-project/sglang/issues/26438)) closed as inactive.

## 4. Performance & Optimization

**Diffusion denoise latency** (all bit-exact, H100/H200):

- **ERNIE-Image**: fused rotate-half RoPE + GELU-mul, hoisted rope cos/sin — **-16.2% / -12.7%** ([PR #34306](https://github.com/sgl-project/sglang/pull/34306), closed)
- **Ideogram-4**: fused Qwen3-style RoPE and SwiGLU silu-mul — **-5.1% / -4.7%** ([PR #34314](https://github.com/sgl-project/sglang/pull/34314))
- **LTX-2**: fused modulate at the 8 bare adaLN sites — **-2.8% / -2.6%** ([PR #34315](https://github.com/sgl-project/sglang/pull/34315), closed)

**AMD / ROCm:**

- Fold DSA indexer q/k prep into aiter's single `wk_weights_proj` GEMM for GLM5/DeepSeek models ([PR #34394](https://github.com/sgl-project/sglang/pull/34394))
- Fuse Kimi-K2.5 MLA projection + RoPE + KV-cache write ([PR #32935](https://github.com/sgl-project/sglang/pull/32935))
- Fuse MLA value projection with MXFP4 output quantization ([PR #33873](https://github.com/sgl-project/sglang/pull/33873))

**Other kernels and infrastructure:**

- DSA indexer fp8-quant Q kernel occupancy tuning to 8 warps/block with lane-0-only weights write, bitwise-identical output ([PR #32755](https://github.com/sgl-project/sglang/pull/32755))
- Batch embedding cache host→device range copies for EPD ([PR #31574](https://github.com/sgl-project/sglang/pull/31574))
- Overlap checkpoint staging with CUDA graph capture during startup to cut engine cold-start time for large checkpoints ([PR #32017](https://github.com/sgl-project/sglang/pull/32017))
- Push-based engine load reporting for load-aware routing ([PR #32523](https://github.com/sgl-project/sglang/pull/32523))
- Dedicated perf tracking now exists for DeepSeek-V4 on NVIDIA ([#33636](https://github.com/sgl-project/sglang/issues/33636)) and DSpark overall ([#30344](https://github.com/sgl-project/sglang/issues/30344)). Context parallelism roadmap: [#21788](https://github.com/sgl-project/sglang/issues/21788).

## 5. Stability & Regressions

Ranked by severity:

1. **DeepSeek-V4 scheduler hang with hierarchical cache + chunked prefill** ([#34235](https://github.com/sgl-project/sglang/issues/34235)) — 0.5.17 on FP8/H20, watchdog abort in DSV4 sparse prefill; also a sampling device-side assert reported on 0.5.16+PR. No fix PR yet.
2. **DSpark compact target-verify CUDA Graph illegal memory on TP8** ([#31023](https://github.com/sgl-project/sglang/issues/31023)) — cross-TP planning inconsistency fixed by [PR #31195](https://github.com/sgl-project/sglang/pull/31195); the timing-sensitive illegal-memory half remains open.
3. **DSpark large decode CUDA-Graph capture failure on TP8** ([#33356](https://github.com/sgl-project/sglang/issues/33356)) — non-deterministic illegal memory or SIGSEGV at server startup on v0.5.16 (B300/B30Z); no fix linked.
4. **Z-Image BCG single-GPU illegal memory on first replay** ([#34183](https://github.com/sgl-project/sglang/issues/34183)) — closed; TP=2 unaffected.
5. **Kimi-K3 DSPARK Xid 13 crash at ~218k context** ([#32855](https://github.com/sgl-project/sglang/issues/32855)) — closed.
6. **W4AFP8 + DeepEP crash at first inference** ([#33660](https://github.com/sgl-project/sglang/issues/33660)) — closed; TypeError missing `routed_scaling_factor` on GLM-5.2.
7. **Wan2.2 T2V-A14B mosaic/corrupted video output** ([#27125](https://github.com/sgl-project/sglang/issues/27125)) — closed.
8. **Flaky Inkling decode cache-hit check** ([PR #34405](https://github.com/sgl-project/sglang/pull/34405)) — intermittent `Too few decode cache hits: 16/32` with KL divergence 0.0; fix requires a full sliding window of live SWA.
9. **CI health** ([#17050](https://github.com/sgl-project/sglang/issues/17050)) — 3 broken, 11 flaky, 666 recently fixed; auto-collected CUDA coredumps tracked in [#26340](https://github.com/sgl-project/sglang/issues/26340).

A new RFC ([#32432](https://github.com/sgl-project/sglang/issues/32432)) proposes explicit metadata, workspace, and stream-ownership contracts for dynamic CUDA Graph replay to eliminate this class of DSpark failures at the design level.

## 6. What This Means for Application Developers

- **Pin SGLang versions for DSpark/TP8 serving** until fixes for #31023 and #33356 land; failures are non-deterministic, so stress startup and large-context paths in staging before rollout.
- **Avoid hierarchical cache + chunked prefill on DeepSeek-V4/H20 for now** — the 0.5.17 combination can hang the scheduler ([#34235](https://github.com/sgl-project/sglang/issues/34235)).
- **Diffusion users on H100/H200 should upgrade**: the new fused kernels are bit-exact and deliver substantial denoise latency reductions with no accuracy trade-off.
- **Agentic orchestration is becoming a first-class design target**: the Programmatic KV Cache RFC ([#27574](https://github.com/sgl-project/sglang/issues/27574)) and router KV-state snapshots ([#33394](https://github.com/sgl-project/sglang/issues/33394)) point toward predictable cross-engine KV reuse — relevant if you build multi-engine routers or agent workloads.
- **Hardware diversification is progressing** (NPU, AMD, MLX), but these backends are still stabilizing; keep CUDA/ROCm as the production baseline and follow the NPU roadmap ([#25598](https://github.com/sgl-project/sglang/issues/25598)) for maturity signals.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-11

## 1. Today's Highlights

Multi-output backend sampling landed in [b10355](https://github.com/ggml-org/llama.cpp/releases/tag/b10355) ([#25532](https://github.com/ggml-org/llama.cpp/pull/25532)), enabling backend-level sampling with token speculation — foundational for higher-throughput speculative decode. On the model side, Granite-Switch architecture support ([b10342](https://github.com/ggml-org/llama.cpp/releases/tag/b10342) / [#25107](https://github.com/ggml-org/llama.cpp/pull/25107)) adds a dense all-attention Granite-4.1 variant with per-token LoRA adapter selection, and CI now targets ROCm 7.14 ([b10356](https://github.com/ggml-org/llama.cpp/releases/tag/b10356) / [#25775](https://github.com/ggml-org/llama.cpp/pull/25775)). Several correctness fixes also shipped: Android CPU affinity masking, contiguous-tensor enforcement for ROLL on CUDA/Metal, and a model-saver GGUF key clobber fix.

## 2. Releases & Breaking Changes

Ten releases shipped (b10338–b10358). Notable items:

- **Multi-output backend sampling** ([b10355](https://github.com/ggml-org/llama.cpp/releases/tag/b10355) / [#25532](https://github.com/ggml-org/llama.cpp/pull/25532)): adds a numeric context parameter declaring the maximum outputs per sequence. Follow-up review comment addressed in [b10358](https://github.com/ggml-org/llama.cpp/releases/tag/b10358) ([#26852](https://github.com/ggml-org/llama.cpp/pull/26852)). API change for sampling backends.
- **ROLL now requires contiguous src on CUDA/Metal** ([b10353](https://github.com/ggml-org/llama.cpp/releases/tag/b10353) / [#25928](https://github.com/ggml-org/llama.cpp/pull/25928)): permuted inputs previously produced silently wrong results; custom graph code passing non-contiguous tensors will now assert.
- **cpp-httplib bumped to 0.53.0** ([b10343](https://github.com/ggml-org/llama.cpp/releases/tag/b10343) / [#26821](https://github.com/ggml-org/llama.cpp/pull/26821)).
- **Model-saver expert FFN fix** ([b10338](https://github.com/ggml-org/llama.cpp/releases/tag/b10338) / [#26693](https://github.com/ggml-org/llama.cpp/pull/26693)): shared/chunk FFN length KV key was being clobbered on save; re-export affected expert models.

## 3. New Model & Hardware Support

- **Granite-Switch architecture** ([b10342](https://github.com/ggml-org/llama.cpp/releases/tag/b10342) / [#25107](https://github.com/ggml-org/llama.cpp/pull/25107)): dense all-attention Granite-4.1 with N embedded LoRA adapters selected per-token by control tokens; CPU POC with gguf-py schema (arch, KV keys, stacked adapters).
- **Nemotron MTP** ([b10344](https://github.com/ggml-org/llama.cpp/releases/tag/b10344) / [#26725](https://github.com/ggml-org/llama.cpp/pull/26725)): multi-token prediction support, including new `mtp_flags`.
- **ROCm 7.14** ([b10356](https://github.com/ggml-org/llama.cpp/releases/tag/b10356) / [#25775](https://github.com/ggml-org/llama.cpp/pull/25775)): build/release CI switched from 7.2.1; follow-up adds `windows-rocm` to check-release ([#26897](https://github.com/ggml-org/llama.cpp/pull/26897)).
- **BailingMoE3** ([#26608](https://github.com/ggml-org/llama.cpp/pull/26608)): support in review, enabling Ling 3.0 flash models with MTP.
- **Gemma-4 conversion fix** ([#26882](https://github.com/ggml-org/llama.cpp/pull/26882)): handles `global_head_dim` nested inside `text_config`.
- **mmproj quantization restored** ([#26818](https://github.com/ggml-org/llama.cpp/pull/26818)): vision tower GGUFs can be quantized again after regression from the #22004 refactor.
- **WebGPU CI fixes** ([#26566](https://github.com/ggml-org/llama.cpp/pull/26566)): resolves flash_attn_ext workgroup storage limits in Dawn and related test failures.

## 4. Performance & Optimization

- **OpenCL FA prefill** ([b10357](https://github.com/ggml-org/llama.cpp/releases/tag/b10357) / [#26428](https://github.com/ggml-org/llama.cpp/pull/26428)): K tile now transposed in local memory for flash-attention prefill kernels.
- **CUDA flash-attn bank conflicts** ([#25635](https://github.com/ggml-org/llama.cpp/pull/25635)): XOR swizzling for K/V smem fp16 tiles replaces row padding (+4), addressing shared-memory bank conflicts on cp.async stores and ldmatrix loads (Turing+).
- **Server idle-slot caching** ([#26893](https://github.com/ggml-org/llama.cpp/pull/26893)): rerank/embedding/infill idle slots are no longer saved to the RAM prompt cache, since those task types can't restore from it — reduces memory waste on mixed-workload endpoints.
- **DP4A emulation via DP2A on CUDA** ([#24616](https://github.com/ggml-org/llama.cpp/issues/24616)): open feature request to broaden integer-dot hardware coverage.
- **MoE host-RAM offload proposal** ([#26448](https://github.com/ggml-org/llama.cpp/issues/26448)): design for keeping expert weights in pinned host memory and reading directly over PCIe DMA; reports 23 GB MoE on 1.6 GB VRAM and 81 GB Qwen3-235B on 8 GB cards. Not yet implemented.

## 5. Stability & Regressions

Open issues by severity:

- **GGML_ASSERT crash on Gemma-4 E4B (V100/CUDA)** ([#24132](https://github.com/ggml-org/llama.cpp/issues/24132)): `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS` failure; open.
- **DeepSeek V4 garbled output on Strix Halo (ROCm)** ([#25436](https://github.com/ggml-org/llama.cpp/issues/25436)): open, affects IQ3_XXS Flash GGUF variants.
- **Qwen3.5 tool call parsing with thinking enabled** ([#20837](https://github.com/ggml-org/llama.cpp/issues/20837)): 59 comments; tool calls printed in XML inside the thinking block and generation stops — highest-engagement open bug.
- **MTP retains inter-request state** ([#26425](https://github.com/ggml-org/llama.cpp/issues/26425)): non-deterministic output on Qwen3.6-35B-A3B-MTP with MTP enabled.
- **RPC backend graph compute failure** ([#26820](https://github.com/ggml-org/llama.cpp/issues/26820)): `[create_node] invalid data ptr` with DeepSeek-V4-Flash on multi-node CPU-only workers.
- **Strix Halo perf regression** ([#25700](https://github.com/ggml-org/llama.cpp/issues/25700)): input layers forced onto CPU causing ~30% CPU usage and reduced GPU utilization.
- **Speculative decoding greedy divergence** ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)): draft-MTP/DSPark spec decode diverges from vanilla on quantized targets (Q4_K_M); matches on bf16.
- **32-bit ARM build break** ([#26677](https://github.com/ggml-org/llama.cpp/issues/26677)): `__fp16` unknown type without IEEE half format; fix PR gating on `__ARM_FP16_FORMAT_IEEE` is open ([#26860](https://github.com/ggml-org/llama.cpp/pull/26860)).
- **ROCm MTP buffer reservation** ([#26038](https://github.com/ggml-org/llama.cpp/issues/26038)): excessive compute buffer reservation in MTP draft context reduces fitted context size.
- **Context checkpoints invalidated on hybrid/recurrent models** ([#24055](https://github.com/ggml-org/llama.cpp/issues/24055)): still open.
- **Fixed this round:** ROLL silent corruption on CUDA/Metal ([b10353](https://github.com/ggml-org/llama.cpp/releases/tag/b10353)); Android CPU affinity mask ignored ([b10354](https://github.com/ggml-org/llama.cpp/releases/tag/b10354)); nondeterministic ROCm output at zero temperature ([#14727](https://github.com/ggml-org/llama.cpp/issues/14727)) closed; SYCL garbage on second prompt ([#21589](https://github.com/ggml-org/llama.cpp/issues/21589)) closed.

Also merged/up for review: OOB-write guard for `n_layer_all` ([#25821](https://github.com/ggml-org/llama.cpp/pull/25821)), DeepSeek-V4 multi-seq rollback fix ([#26756](https://github.com/ggml-org/llama.cpp/pull/26756)), and Nemotron recurrent state rollback for CUDA ([#26623](https://github.com/ggml-org/llama.cpp/pull/26623)).

## 6. What This Means for Application Developers

- **Agent/tool-calling workloads:** monitor the Qwen3.5 XML tool-call bug with thinking enabled ([#20837](https://github.com/ggml-org/llama.cpp/issues/20837)). A Muse Glimmer fix for tool calls emitted after EOM is in review ([#26879](https://github.com/ggml-org/llama.cpp/pull/26879)), and the new server-side `read_media` tool ([#25877](https://github.com/ggml-org/llama.cpp/pull/25877)) will let vision models analyze images directly from the server filesystem.
- **Speculative decoding:** the multi-output sampling work ([#25532](https://github.com/ggml-org/llama.cpp/pull/25532)) is groundwork for faster decode, but note the known greedy divergence on quantized targets ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)) — validate spec-decode output if you serve quantized models.
- **Model conversion:** mmproj quantization is restored ([#26818](https://github.com/ggml-org/llama.cpp/pull/26818)) — re-check vision pipelines that depended on quantized mmproj GGUFs. Re-export expert models saved with b10337 or earlier affected by the FFN key clobber ([b10338](https://github.com/ggml-org/llama.cpp/releases/tag/b10338)).
- **Server memory footprint:** the idle-slot cache fix ([#26893](https://github.com/ggml-org/llama.cpp/pull/26893)) automatically reduces RAM usage on endpoints mixing completion, rerank, and embedding tasks.
- **Security hardening trend:** new upper-bound assertions for GGUF metadata ([#25821](https://github.com/ggml-org/llama.cpp/pull/25821), [#26892](https://github.com/ggml-org/llama.cpp/pull/26892)) matter if you serve untrusted or third-party GGUFs — update before exposing custom model loading.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-11

## Today's Highlights

Ollama released **v0.32.8**, making **Muse Glimmer** generally available across platforms after v0.32.7 introduced MLX-only support on Apple Silicon. The release positions Muse Glimmer as a viable backbone for coding agents (Claude Code, Codex, Pi) and long-running assistants. However, several release-quality issues surfaced immediately: the v0.32.8 Docker image is missing from the registry, and the advertised Muse Glimmer MLX tag appears to wrap NVIDIA NVFP4 layers instead of real MLX weights.

## Releases & Breaking Changes

- **v0.32.8** — Muse Glimmer is now available on all platforms. Release notes highlight its suitability for coding agent and personal assistant workloads, with MLX engine performance on Apple Silicon called out as state-of-the-art. No migration notes were provided.
  - [v0.32.8](https://github.com/ollama/ollama/releases/tag/v0.32.8)
- **v0.32.7** — Initial Muse Glimmer support for Apple Silicon via the MLX engine. Broader NVIDIA/AMD/platform optimizations are expected in the coming days.
  - [v0.32.7](https://github.com/ollama/ollama/releases/tag/v0.32.7)
- **Potential breaking issue:** The v0.32.8 Docker image tag is not yet pushed, so `docker pull ollama/ollama:0.32.8` currently fails with `manifest unknown`.
  - [Issue #17668](https://github.com/ollama/ollama/issues/17668)

## New Model & Hardware Support

- **Muse Glimmer** — Meta's newest open model, now broadly available in v0.32.8. Initially MLX-only in v0.32.7, with NVIDIA/AMD support promised in follow-up releases.
  - [Issue #17645](https://github.com/ollama/ollama/issues/17645) reports the `muse-glimmer:30b-q8_0` manifest currently refuses pulls on 0.32.7 with a "newer version required" error.
- **MLX Nemotron 3 support** — PR adds MLX support for Nemotron 3 Nano Omni, including Mamba2/recurrent components, MoE routing, and quantized NVFP4/MXFP8 expert paths.
  - [PR #17060](https://github.com/ollama/ollama/pull/17060)
- **Gemma4 image input on MLX** — New PR adds Gemma4 vision preprocessing/embeddings through the generic `base.MediaModel` interface.
  - [PR #17650](https://github.com/ollama/ollama/pull/17650)
- **Apertus 1.5** — Native parser/renderer support for Swiss AI's Apertus v1.5 8B and 70B models.
  - [PR #17555](https://github.com/ollama/ollama/pull/17555)
- **Windows-on-Arm CPU build fix** — Sets `GGML_CPU_ARM_ARCH` so the CPU runner no longer ships baseline `armv8-a` without dot-product/matrix instructions.
  - [PR #17654](https://github.com/ollama/ollama/pull/17654)

## Performance & Optimization

- **MLX runner lacks concurrency** — `x/mlxrunner` currently serializes requests: one goroutine consumes the request channel, so concurrent API calls queue up. Batched/concurrent decode is requested.
  - [Issue #17666](https://github.com/ollama/ollama/issues/17666)
- **MoE expert offload proposal** — Ollama inherits llama.cpp's behavior of loading all MoE expert weights into VRAM, so a 16B MoE model (~6GB file) can require 23GB VRAM. A feature request wants experts in host RAM with on-demand GPU compute to run 16B/35B MoE on 8GB GPUs.
  - [Issue #17557](https://github.com/ollama/ollama/issues/17557)
- **Windows dual-socket bottleneck** — High CPU and low GPU utilization persist across CPU-only, GPU-only, and hybrid configurations on dual-socket Windows servers.
  - [Issue #16873](https://github.com/ollama/ollama/issues/16873)
- **Context-length projection** — PR to expose projected context length in model details, a stepping stone toward better MLX runner estimation.
  - [PR #17663](https://github.com/ollama/ollama/pull/17663)

## Stability & Regressions

Ranked by severity:

1. **MLX long-lived runner returns another prompt's answer verbatim** — Under `OLLAMA_KEEP_ALIVE=-1`, repeat calls intermittently produce the complete response from an earlier request, a serious correctness/security issue for agent applications. No fix PR yet.
   - [Issue #17599](https://github.com/ollama/ollama/issues/17599)
2. **Deterministic CUDA illegal memory access on DGX Spark** — Large prefill against `qwen3-coder-next:q4_K_M` (head size 256) crashes the runner in `ggml_cuda_flash_attn_ext_mma_f16_case` on Grace Blackwell.
   - [Issue #17596](https://github.com/ollama/ollama/issues/17596)
3. **v0.32.7 update deleted local models on Jetson AGX Orin** — Models including Qwen3.6 27B, GPT-OSS 20b, and others disappeared after upgrade; only qwen3.6:35b survived.
   - [Issue #17661](https://github.com/ollama/ollama/issues/17661)
4. **Lower KV quantization causes garbage output** — Switching from `q8_0` to `q4_0` kv quantization makes a model emit repetitive unintelligible text (`"AI AI AI..."`).
   - [Issue #17614](https://github.com/ollama/ollama/issues/17614)
5. **v0.32.4/0.32.5 break tool calling in VS Code Copilot Harness** — Rolling back to 0.32.1 restores functionality. No fix PR referenced.
   - [Issue #17444](https://github.com/ollama/ollama/issues/17444)
6. **Muse Glimmer MLX tag is not real MLX weights** — `muse-glimmer:30b-mlx` manifest is built from NVFP4 layers, not actual MLX weights, despite the tag and blog positioning.
   - [Issue #17656](https://github.com/ollama/ollama/issues/17656)
7. **Structured outputs ignored for MLX models** — `format`/JSON schema output is not honored on the MLX engine.
   - [Issue #16563](https://github.com/ollama/ollama/issues/16563)
8. **Qwen model loading regression** — Qwen3.6 35B Q4_K_M hits memory ceiling without filling GPU on RTX 5070 Ti after recent updates.
   - [Issue #17517](https://github.com/ollama/ollama/issues/17517)
9. **`/api/generate` silently ignores `think: true` when `format` is set** — `/api/chat` handles the same request correctly.
   - [Issue #17544](https://github.com/ollama/ollama/issues/17544)
10. **Runner hang with zero bytes returned** — Large models pinned in memory for hours, then `/api/generate` hangs indefinitely while `/api/version` still responds.
    - [Issue #15950](https://github.com/ollama/ollama/issues/15950)
11. **Gemma 4 Cloud HTTP 500 with vision + tool calling** — `gemma4:31b-cloud` fails when a request combines vision and tool calls.
    - [Issue #17667](https://github.com/ollama/ollama/issues/17667)

Relevant fix PRs in flight:

- **[PR #17651](https://github.com/ollama/ollama/pull/17651)** wraps tool-call parser errors with client-facing context, addressing Qwen3-VL parser diagnostics.
- **[PR #17664](https://github.com/ollama/ollama/pull/17664)** recovers boundary tokens fumbled into Glimmer ATEM invoke names.
- **[PR #17624](https://github.com/ollama/ollama/pull/17624)** handles null integration config entries that currently panic.
- **[PR #17623](https://github.com/ollama/ollama/pull/17623)** accepts Claude Code `[1m]` model context suffix in `ollama launch`.
- **[PR #17657](https://github.com/ollama/ollama/pull/17657)** improves skill-root scanning and explains rejected skill names.

## What This Means for Application Developers

- **Muse Glimmer is now a viable model target** for coding agents and long-running assistants, but verify tags carefully today: `muse-glimmer:30b-mlx` currently appears to be mis-packaged, and the 0.32.8 Docker image is not yet available.
- **MLX runners are unsafe for long-lived multi-request agents until further notice** — with `keep_alive=-1`, a runner can return another request's full answer. Pin to a single request per runner or avoid MLX long-lived mode.
- **Prefer `/api/chat` over `/api/generate`** when combining `think` and `format`; the generate endpoint silently drops thinking output in structured mode.
- **If you depend on VS Code Copilot tool calling with local Ollama, stay on 0.32.1** until the 0.32.4/0.32.5 regression is resolved.
- **Watch for progressive tool-call streaming** — PR #17658 proposes opt-in `stream_tool_calls` on `/api/chat`, which will help interactive agent UIs, but it is not merged yet.
- **MoE memory pressure remains a real constraint**: 16B/35B MoE models still require disproportionate VRAM because all expert weights are loaded up front; expect further offload work but no timeline.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-11

## Today's Highlights
LiteLLM maintainers continued pushing the Rust gateway migration forward, with a parent ticket now tracking the sub-1ms overhead target and Rust `/messages` reaching DeepSeek provider parity. On the Python/proxy side, cost-accounting fixes dominate: streaming usage cost is being fixed for OpenAI passthrough routes, and custom pricing is now correctly propagated from `litellm_params`. Release v1.96.0 also highlights supply-chain hardening — all Docker images are cosign-signed.

## Releases & Breaking Changes
- [Release v1.96.0](https://github.com/BerriAI/litellm/releases/tag/v1.96.0)  
  No API-breaking changes are called out. The headline is Docker image signature verification: all images are signed with cosign, using the same signing key since commit `0112e53`.

## New Model & Hardware Support
No new CUDA/ROCm/Metal/CPU or quantization work was reported in this window. Provider/model additions include:

- [PR #35737](https://github.com/BerriAI/litellm/pull/35737): MiniMax `image_generation` adapter for `/v1/image_generation`, supporting `image-01` and `image-01-live`.
- [PR #33227](https://github.com/BerriAI/litellm/pull/33227): First-class Nadir provider support via `nadir/auto`, an OpenAI-compatible intelligent router.
- [PR #36520](https://github.com/BerriAI/litellm/pull/36520): DeepSeek provider parity for the Rust `/messages` implementation, matching Python auth/URL/metadata/tool behavior.
- [PR #36502](https://github.com/BerriAI/litellm/pull/36502): Bedrock tool-search beta allowlist now includes Haiku 4.5 and Opus 4.7.
- [PR #36507](https://github.com/BerriAI/litellm/pull/36507): Preserves adaptive thinking effort through the `/v1/messages` Bedrock Converse bridge.

## Performance & Optimization
- [Issue #31263](https://github.com/BerriAI/litellm/issues/31263): Parent ticket for the Rust migration — positioned as the “fastest and litest” AI gateway with sub-1ms overhead. Early beta signup is open.
- [Issue #31866](https://github.com/BerriAI/litellm/issues/31866): Proposed `disable_entity_spend_updates` flag to suppress entity counter `UPDATE`s at high request volume while still writing SpendLogs — relevant for reducing Redis/DB write pressure.
- [Issue #31876](https://github.com/BerriAI/litellm/issues/31876): Per-deployment `allowed_fails_policy` plus DualCache TTL correction, improving router cooldown flexibility and cache consistency.

## Stability & Regressions
Ranked by severity:

- **Critical — Budget enforcement bypass** ([Issue #26672](https://github.com/BerriAI/litellm/issues/26672)): `key`/`user` `max_budget` is not enforced on v1.82.3 even after spend exceeds the limit. Open, with no fix PR yet. Audit budget enforcement before relying on it.
- **Critical — `/v1/memory` CRUD authorization gap** ([Issue #27722](https://github.com/BerriAI/litellm/issues/27722)): Team 2 can read/update/delete Team 1’s memory keys without authorization. Open.
- **High — Streaming usage undercounted** ([Issue #36114](https://github.com/BerriAI/litellm/issues/36114)): Provider-independent stream aggregation undercounts `usage`, even after a chunk-parser fix. Related fixes for OpenAI passthrough streams and streamed `/v1/responses` cost are in [PR #36503](https://github.com/BerriAI/litellm/pull/36503) and [PR #36525](https://github.com/BerriAI/litellm/pull/36525).
- **High — Cache accounting lost on Anthropic↔Responses bridge** ([Issue #36091](https://github.com/BerriAI/litellm/issues/36091)): `cache_read_input_tokens` is always 0 when Anthropic `/v1/messages` is served by Responses-API upstream models.
- **Medium — Sync token_counter on async path** ([Issue #36174](https://github.com/BerriAI/litellm/issues/36174)): `Router.async_get_healthy_deployments` calls sync `_pre_call_checks`, which can block the event loop under load with `enable_pre_call_checks=True`.
- **Medium — `max_parallel_requests` leaks across cancelled streams** ([Issue #27955](https://github.com/BerriAI/litellm/issues/27955)): Redis counter monotonically increases on mid-stream `/v1/messages` cancellation.
- **Medium — TPM enforcement is per-pod, not global** ([Issue #27736](https://github.com/BerriAI/litellm/issues/27736)): Effective deployment limit becomes `tpm_limit × N_replica` in multi-replica setups.
- **Low — Z.AI `glm-5.2[1m]` returns Unknown Model** ([Issue #32218](https://github.com/BerriAI/litellm/issues/32218)): Documented 1M variant fails while plain `glm-5.2` works.
- **Fix PRs worth noting**:
  - [PR #36499](https://github.com/BerriAI/litellm/pull/36499): Fixes Claude Code PDF reads on Bedrock Converse by injecting a text block with document messages.
  - [PR #36521](https://github.com/BerriAI/litellm/pull/36521): Fixes custom pricing fields set in `litellm_params` not propagating into `model_info`.

## What This Means for Application Developers
- **Do not assume budget limits are hard guarantees** on affected versions. If you rely on `max_budget`, verify enforcement on your current deployment and watch [Issue #26672](https://github.com/BerriAI/litellm/issues/26672).
- **Streaming usage/cost can still be unreliable** for passthrough and Anthropic bridge routes. If you bill based on streamed usage, cross-check against non-streaming calls until the aggregation fixes land.
- **Bedrock + Claude Code users should test the new fixes**: PDF document handling, tool-search beta headers for Haiku 4.5/Opus 4.7, and adaptive thinking effort forwarding all have targeted PRs in flight.
- **The Rust gateway is becoming concrete.** If sub-1ms gateway overhead matters for your architecture, the migration ticket and beta signup are worth tracking.
- **New opt-in `rpm`/`tpm` enforcement flags** ([PR #36514](https://github.com/BerriAI/litellm/pull/36514), [PR #36518](https://github.com/BerriAI/litellm/pull/36518)) will let you reject unbounded model registrations at `POST /model/new` time — useful for multi-tenant control.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-11

## Today's Highlights

Unsloth shipped **v0.1.61-beta** adding support for **Meta Muse Glimmer 30B**, the first Apache-2.0 open model from Meta Superintelligence Labs, with Unsloth Dynamic quants for local agentic/coding deployments. Studio stability work closed fixes for Windows drive-letter path breakage ([#8399](https://github.com/unslothai/unsloth/pull/8399)), MTP capability-probe caching ([#8334](https://github.com/unslothai/unsloth/pull/8334)), and silent misrouting of mistyped model IDs on the `/v1` API ([#8389](https://github.com/unslothai/unsloth/pull/8389)); a security hardening PR moving pre-quantized checkpoint loading to `weights_only` is also up ([#8409](https://github.com/unslothai/unsloth/pull/8409)).

## Releases & Breaking Changes

- **[v0.1.61-beta / v0.1.60-beta — Meta Muse Glimmer](https://github.com/unslothai/unsloth/releases)** — Muse Glimmer 30B (dense, Apache 2.0) is now runnable via Unsloth and Unsloth Dynamic quants. Note that the bundled `llama.cpp` initially failed to recognize the `muse-glimmer` GGUF architecture ([#8345](https://github.com/unslothai/unsloth/issues/8345)); the issue is closed, so verify your bundle is current before loading the new GGUF.
- **Version reporting corrected** — `unsloth.__version__` aliasing `unsloth_zoo.__version__` caused misreports when core shipped ahead of zoo; closed ([#8171](https://github.com/unslothai/unsloth/issues/8171)).
- **Dependency pinning** — PR pins all remaining unpinned Studio requirements (66 entries across 5 files); existing `>=`/`<` ranges are preserved deliberately ([#8408](https://github.com/unslothai/unsloth/pull/8408)).

## New Model & Hardware Support

- **Meta Muse Glimmer 30B** — dense 30B, Apache 2.0, optimized for local agentic and coding workflows; supported with Dynamic quants (v0.1.61-beta, [releases](https://github.com/unslothai/unsloth/releases)).
- **DFlash speculative decoding** — Studio will now auto-launch `dflash-*.gguf` sidecars instead of merely excluding them from the quant picker ([#8338](https://github.com/unslothai/unsloth/pull/8338)).
- **Studio Audio page** — new TTS/STT create tab, LoRA train tab, and OpenAI-compatible audio endpoints ([#7984](https://github.com/unslothai/unsloth/pull/7984)).
- **Installer/hardware coverage** — torch 2.11 on Linux CPU-only machines, Vulkan support for AMD without ROCm, and a gfx1033 gate for the Studio installer ([#8412](https://github.com/unslothai/unsloth/pull/8412), split from [#8343](https://github.com/unslothai/unsloth/pull/8343) for SteamOS/Bazzite/AppImage).
- **RDNA 1/2 (gfx10) BF16 detection** — HIP BF16 is now gated off correctly even when PyTorch over-reports support; downstream callers consume the corrected probe ([#7682](https://github.com/unslothai/unsloth/pull/7682)).

## Performance & Optimization

- **Chat send path** — Studio read the same conversation record four times before generation; PR collapses this into one fetch per send ([#8382](https://github.com/unslothai/unsloth/pull/8382)).
- **Speculative decoding reliability** — Inconclusive llama-server MTP probes were cached for the process lifetime, silently disabling speculation; PR now re-probes and avoids repeated timeouts ([#8334](https://github.com/unslothai/unsloth/pull/8334), fixes [#8317](https://github.com/unslothai/unsloth/issues/8317)).
- **Training start progress** — `expected_bytes` counted every repo file even though training fetches a subset, producing a stuck "Downloading 99%" overlay; metadata-only dataset caches now report correct progress ([#8384](https://github.com/unslothai/unsloth/pull/8384)).
- **Faster updates** — desktop-initiated backend updates skip redundant packaged frontend rebuilds and reuse the release-built `frontend/dist` ([#8326](https://github.com/unslothai/unsloth/pull/8326)).
- **Sidecar discovery** — MTP/DSpark sidecars are now found in custom scan folders with nested quant subdirectories, enabling speculative decoding where it was previously missed ([#8118](https://github.com/unslothai/unsloth/pull/8118), fixes [#8077](https://github.com/unslothai/unsloth/issues/8077)).

## Stability & Regressions

Ranked by severity; fix PRs noted where they exist.

1. **Pickle deserialization in pre-quant checkpoints** — `load_prequantized_transformer` read torchao checkpoints with `weights_only=False` before validation, executing pickle code; PR adds `weights_only` + constructor allowlist ([#8409](https://github.com/unslothai/unsloth/pull/8409)).
2. **Windows drive-letter path splitting** — absolute local GGUF paths (`C:\...`) broke `split_model_ref`, causing HTTP 503 `model_switch_failed` on already-loaded models; fixed ([#8368](https://github.com/unslothai/unsloth/issues/8368), [#8375](https://github.com/unslothai/unsloth/issues/8375), fix [#8399](https://github.com/unslothai/unsloth/pull/8399)).
3. **Silent API misrouting** — requests for a non-loaded/mistyped model id were routed to whatever model was resident with no error; PR returns 404 instead ([#8376](https://github.com/unslothai/unsloth/issues/8376), fix [#8389](https://github.com/unslothai/unsloth/pull/8389)).
4. **ROCm/AMD edge cases (mostly open)** — whisper update fails on missing hipblaslt kernel catalog ([#8364](https://github.com/unslothai/unsloth/issues/8364)); Debian 13 `hipconfig 5.7` shadows ROCm 6.1 and the installer falls back to CPU torch on gfx1100 ([#8402](https://github.com/unslothai/unsloth/issues/8402)); `mem_get_info` free==total sentinel uncorrected in memory guards, so host-RAM spill refusal never fires on Windows ROCm ([#8403](https://github.com/unslothai/unsloth/issues/8403)); text GGUF reaching the diffusion image loader and Flux import failure on Windows ([#8406](https://github.com/unslothai/unsloth/issues/8406)); cosmetic h11 shutdown traceback ([#8404](https://github.com/unslothai/unsloth/issues/8404)).
5. **MiniMax M3 GGUF on Apple Silicon** — `UD-Q5_K_XL` fails to load with missing `indexer.head_count` metadata ([#8360](https://github.com/unslothai/unsloth/issues/8360)).
6. **NVFP4 on RTX 5060 Ti 16 GB** — model fails to load on Blackwell ([#8246](https://github.com/unslothai/unsloth/issues/8246)).
7. **Studio storage/UI regressions** — changing the Models folder leaves downloads listed as external dirs and image models unfound ([#8407](https://github.com/unslothai/unsloth/issues/8407)); raw `external::...` model id shown when a provider drops a selected model ([#8405](https://github.com/unslothai/unsloth/issues/8405)); chat revisions past ~5–6 reset the thread ([#7732](https://github.com/unslothai/unsloth/issues/7732)); models swap in/out of VRAM when idle on AMD ([#7164](https://github.com/unslothai/unsloth/issues/7164)); VRAM total/usage reporting stops on RDNA3 ([#7452](https://github.com/unslothai/unsloth/issues/7452)).
8. **Fine-tuning correctness** — trainer kwargs moved to config were dropped rather than applied ([#8374](https://github.com/unslothai/unsloth/pull/8374)); sampling inside `TrainingCallback` raises `Invalid target device: None` ([#3538](https://github.com/unslothai/unsloth/issues/3538)).

## What This Means for Application Developers

- **Muse Glimmer 30B is deployable today** as an Apache-2.0 dense model for agentic/coding workloads, with Dynamic quants via v0.1.61-beta. Confirm your llama.cpp / Unsloth bundle recognizes the `muse-glimmer` GGUF architecture before rolling out ([#8345](https://github.com/unslothai/unsloth/issues/8345)).
- **API correctness improves for multi-model agents**: mistyped model IDs will soon 404 instead of silently hitting whatever model is loaded — a critical fix for anyone running multiple models behind Studio's OpenAI-compatible endpoints ([#8389](https://github.com/unslothai/unsloth/pull/8389)).
- **Windows users with local GGUF paths** should upgrade to pick up the drive-letter fix; expect the 503 `model_switch_failed` failure mode to disappear ([#8399](https://github.com/unslothai/unsloth/pull/8399)).
- **Security-sensitive deployments** using torchao pre-quantized checkpoints should track [#8409](https://github.com/unslothai/unsloth/pull/8409); current loading executes pickle before validation.
- **Audio modality is coming to Studio** (TTS/STT + OpenAI-compatible endpoints) — relevant if you're evaluating Studio as an inference gateway ([#7984](https://github.com/unslothai/unsloth/pull/7984)).
- **AMD/ROCm environments remain risky**: several installer, memory-guard, and kernel-catalog bugs are still open ([#8402](https://github.com/unslothai/unsloth/issues/8402), [#8403](https://github.com/unslothai/unsloth/issues/8403), [#8364](https://github.com/unslothai/unsloth/issues/8364)) — validate GPU detection and memory reporting explicitly before relying on Studio on RDNA hardware.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*