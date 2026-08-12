# AI Infrastructure Digest 2026-08-12

> Generated: 2026-08-12 02:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — 2026-08-12
**AI Infrastructure Ecosystem Digest**

---

## 1. Ecosystem Overview

The AI infrastructure ecosystem is in a **reliability-first phase**: every major project shipped patch releases or tracked regressions this window, while the community converges on DeepSeek-V4 as the primary stress-test workload. Speculative decoding (DSpark/DSD/MTP) has gone from differentiator to known-risk feature, with crashes and throughput cliffs documented across vLLM, llama.cpp, and SGLang. AMD/ROCm is now an official first-class target (llama.cpp's TheRock/ROCm 7.14 builds), but AMD-specific correctness bugs — Strix Halo garbled output, MI325X memory faults — are surfacing in proportion to adoption. The serving-engine layer (vLLM, SGLang) races on kernel and KV-cache optimization; the gateway layer (LiteLLM) matures on spend accounting and operational robustness; the edge layer (llama.cpp, Ollama, Unsloth) pushes new model support, MLX correctness, and local desktop UX.

---

## 2. Activity Comparison

Counts below are **issue/PR references in the 24-hour digest window**, not repository totals.

| Project | Issues (24h) | PRs (24h) | Releases | Release status |
|---|---|---|---|---|
| vLLM | 22 | 17 | **v0.27.1** (patch) | Patch stream addressing 0.27.0 regressions |
| SGLang | 17 | 20 | none | No release; CI cleanup + high-priority kernel work |
| llama.cpp | 18 | 18 | **b10356–b10362** (7 patches) | Highest release cadence this window |
| Ollama | 15 | 10 | **v0.32.9** | Steady minor releases; Docker tag incident on 0.32.8 |
| LiteLLM | 27 | 19 | **7 patches** (v1.90.7–v1.96.2) | Highest patch volume; identical boilerplate notes |
| Unsloth | 13 | 12 | **v0.1.701-beta**, v0.1.70-beta, v0.1.62-beta | Beta train; Desktop launch day |

**Signal:** llama.cpp and LiteLLM are shipping at the highest velocity; SGLang is deliberately paused on releases while stabilizing CI (670 fixed, 3 broken, 11 flaky). vLLM's newest release carries two fresh regressions (Gemma4 + Transformers 5.15.0, DeepSeek-V4-Flash upgrade path), making v0.27.1 the recommended pin.

---

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---|---|---|---|---|---|
| **DeepSeek-V4-Flash** | Runtime regression; Ampere unsupported; ~8× KV expansion | Perf tracking; H20 hang; B200 OOM | DSpark multi-GPU crash; garbled on Strix Halo | — | — |
| **Kimi-K3 / Delta-Attention** | ROCm roadmap + AITER integration | Helion backend + AMD Radix-4 MoE kernel | — | — | — |
| **GLM 5.x** | Perf task list (#46654) | Wide-EP gap still open | — | — | Bedrock structured output ✓ |
| **NVIDIA Nemotron 3.5 Lightning** | — | — | — | **v0.32.9 support ✓** | — |
| **LTX-2.5 diffusion** | — | PR #34471 ✓ | — | — | — |
| **MiniMax H3 LoRA** | — | PR #34359 ✓ | arch gap in bundled sd.cpp | — | — |
| **SKT A.X K2** (Sparse Gated Attn) | — | — | PR #26757 (review) | — | — |
| **EXAONE 4.5 SWA** | — | — | b10361 fix ✓ | — | — |
| **DeepSeek V3.2** | — | — | — | — | Bedrock structured output ✓ |

**Who is ahead:**
- **llama.cpp** leads on *breadth of new architectures* (A.X K2, EXAONE fixes) and *backend portability* (ROCm 7.14/TheRock, OpenCL, 32-bit ARM).
- **SGLang** leads on *novel attention/kernel integration* (Kimi Delta-Attention Helion, FlashInfer mxfp8 GEMM) and is the only engine shipping diffusion (LTX-2.5).
- **vLLM** leads on *production-hardening features* around new models (quantized DSpark Markov heads, NVFP4 KV cache on pre-SM100, compressed-tensors WNA16 MoE) but trails badly on DeepSeek-V4 Ampere support — the highest-engagement issue in the ecosystem (98 comments).
- **Ollama** wins on *end-user model availability* (Nemotron 3.5 Lightning, Ling-3.0-Tiny MLX), but its bundled llama.cpp/MLX layers lag on architecture correctness (Muse-Glimmer, MiniMax GGUF).
- **LiteLLM** tracks provider-side support rather than model internals — Bedrock/Vertex/Azure additions land as routing and cost fixes.

---

## 4. Performance Frontier

Optimization effort concentrates in five areas:

**KV Cache.** vLLM's FlashInfer-based NVFP4 KV cache path on Ampere/Hopper (#46963) is the most strategically significant, removing the SM100-only restriction and shrinking KV footprints on existing hardware. Contrast: Ollama reports q4_0/q8_0 quantized KV cache producing garbage output (#17614) and breaking tool calls on ROCm (#17347) — quantized KV is still correctness-risky outside vLLM's controlled path.

**Quantization.** vLLM is planning W4A8-INT8 via PTX 9.4 `ldmatrix.s8.s4` (#49529) and fixed the QuantFP8/UE8M0 crash on SM120 (#51359). SGLang's FlashInfer cute-dsl mxfp8 GEMM (#34042) reports significant wins over the persistent Cutlass path on SM10X. NVFP4 + FP8 remain the two dominant thrusts.

**Speculative Decoding.** vLLM's DSpark confidence-scheduled verification (#47808) adaptively sizes draft budgets — a direct response to the documented high-concurrency collapse where 7 drafts/request cost more than they return. llama.cpp is building a pluggable Deterministic Draft Filter SPI (#26551). But DSD/DSpark reliability is poor across the board: vLLM's batch-threshold cudagraph cliff (#49548), llama.cpp's reproducible multi-GPU DSpark crash at ~2,000–2,600 tokens (#26554).

**Distributed Serving.** SGLang's DeepEPv2 ElasticBuffer backend (#29525) targets CUDA-graph-capturable multi-node MoE decode; vLLM adds ROCm dual-stream decode with hip/cudagraph compatibility (#48223). Wide-EP over GB200 NVLink (GLM5-2/Kimi-K3) remains an open gap in SGLang (#34120).

**Kernel & Scheduling.** ROCm kernel work dominates: vLLM's fused bf16→fp32 MoE router GEMM (#50268), SGLang's AMD Radix-4 MoE top-k router (#34490), llama.cpp's OpenCL FA prefill K-tile transpose (#26428). Unsloth fixes a multi-GPU xFormers attention-mask device mismatch (#8516); LiteLLM staggers background jobs to kill the APScheduler thundering herd (#36589).

---

## 5. Layer Positioning

| Layer | Projects | Core role today |
|---|---|---|
| **Serving engines** | vLLM, SGLang | Multi-GPU, production-grade inference: continuous batching, paged attention, quantization kernels, speculative decoding, distributed MoE. Deepest engagement with DeepSeek-V4-era model complexity (indexers, MTP heads, sparse attention). |
| **Local runtime** | llama.cpp, Ollama | llama.cpp is the cross-backend engine layer (CUDA/HIP/OpenCL/SYCL/Vulkan/WebGPU, now TheRock builds). Ollama is the distribution/UX layer on top — model management, MLX runner, desktop experience — trading kernel depth for accessibility. |
| **Gateway** | LiteLLM | Control plane: multi-provider routing, failover/cooldowns, spend tracking/chargeback, guardrails, OpenAI/Anthropic compatibility layers. Its Rust rewrite (#31263, sub-1ms overhead target) signals that gateway latency is now a competitive metric. |
| **Training / fine-tuning** | Unsloth | Memory-efficient LoRA/QLoRA fine-tuning, expanding into unified local workflow with Unsloth Desktop and Studio. Its dependency on bundled llama.cpp/sd.cpp for GGUF means it inherits upstream architecture gaps. |

Blurring: Unsloth and Ollama now overlap at the local-deployment layer; vLLM and SGLang are functionally interchangeable for standard OpenAI workloads, with the difference in kernel strategy and ecosystem integrations.

---

## 6. Trend Signals

**1. DeepSeek-V4 is the ecosystem's stress test — and it is still fragile.** Every serving engine has an open DeepSeek-V4 issue: Ampere gaps, KV-cache blowup (56 bytes/token), 240K-token NaN degeneration, 1M-token prefill OOM, DSpark crashes near 2.5K tokens. Agent/application developers serving long-context or high-concurrency V4 workloads should pin known-good versions and validate aggressively; the stack is not ready for unattended production.

**2. Speculative decoding has moved from "free speedup" to "benchmark-before-enable."** The failure modes are now well-documented: batch-threshold cliffs, PIECEWISE cudagraph downgrades, acceptance-rate regressions (#48137 costs ~10.6%), multi-GPU crashes. Watch for vLLM's confidence-scheduled verification as the template for adaptive drafts.

**3. AMD/ROCm is first-class, and the bugs are spilling out — that's progress.** llama.cpp's TheRock/ROCm 7.14 production builds, vLLM ROCm kernel work, and SGLang XPU default all point the same direction. But expect a wave of AMD-specific issues (VRAM detection, hipBLAS loading, memory faults) as fleet diversity grows.

**4. Quantized KV cache is the next correctness battleground.** Ollama's q4_0/q8_0 failures (garbage output, broken tool calls) contrast sharply with vLLM's methodical NVFP4 path. Tool-calling agents are the canary: any KV quantization that corrupts function-call tokens is a silent application breaker. Test quantized KV against exact tool-call prompts.

**5. Gateways are becoming trust infrastructure.** LiteLLM's spend-accounting fixes (xAI web-search billing, Azure GPT-5.6 meters, passthrough budget leakage, deadlock retries) plus Ollama's `/metrics` endpoint and llama.cpp's metrics refactor mean chargeback-grade usage telemetry is finally achievable. Finance/ops teams can start relying on these numbers.

**6. Supply-chain hygiene is now a visible operational risk.** Three distinct incidents this window: llama.cpp RPC `SET_ROWS` OOB write (security), Ollama's missing Docker tag for v0.32.8, LiteLLM's missing Python 3.13 wheel. Engineers should pin artifacts, verify signatures (LiteLLM now cosign-signs all images), and treat "latest" tags as untrustworthy in CI.

**7. Local + agentic is converging.** Unsloth Desktop (first OSS desktop app for train/run/export), Ollama's Nemotron 3.5 Lightning support (30B MoE / 3B active for always-on agents), and the WebGPU/OpenCL work in llama.cpp all point at local, always-on agent execution layers as a real deployment target — with the caveat that MLX structured outputs, desktop installers, and vision+tool combinations are still immature.

**Bottom line for technical decision-makers:** the serving/gateway layers are stabilizing enough for controlled production rollout of DeepSeek-V4 workloads, provided you pin versions, disable speculative decoding by default, and test quantized KV cache against your tool-call patterns. The local/desktop layer is shipping fast but remains validation-heavy. AMD is viable and rising. Expect the next 30 days to be dominated by DeepSeek-V4 reliability fixes and NVFP4 KV-cache adoption.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-12

## Today's Highlights
vLLM shipped v0.27.1, a patch release adding support for quantized DSpark Markov heads ([#50424](https://github.com/vllm-project/vllm/pull/50424)) on top of v0.27.0. Community demand for DeepSeek-V4-Flash on Ampere (SM80) continues to dominate — issue [#50576](https://github.com/vllm-project/vllm/issues/50576) now has 98 comments and is the most active thread. On the regression front, two fresh reports hit the 0.27.0 upgrade path: Gemma4 fails to start with Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)) and DeepSeek-V4-Flash errors after upgrading from 0.26.0 ([#51758](https://github.com/vllm-project/vllm/issues/51758)).

## Releases & Breaking Changes
- **v0.27.1 patch release** — supports quantized DSpark Markov heads ([release](https://github.com/vllm-project/vllm/releases/tag/v0.27.1), [PR #50424](https://github.com/vllm-project/vllm/pull/50424)).
- **FlexAttention deprecation RFC closed** ([#50324](https://github.com/vllm-project/vllm/issues/50324)): it is no longer the default on ROCm and trails TritonAttention on CUDA; the RFC proposes removal due to maintenance cost and unused coverage.
- **Speculative-decoding config semantics have shifted**: `rejection_sample_method` values `strict`/`probabilistic` are replaced by `standard`/`block` (default `standard`), and `synthetic_acceptance_rate` is gone — docs synced in [#51611](https://github.com/vllm-project/vllm/pull/51611).

## New Model & Hardware Support
- **DeepSeek-V4-Flash / V4-Flash-0731 on Ampere**: still unsupported on SM8x (A100/A800/RTX 30xx) — tracking issues [#50576](https://github.com/vllm-project/vllm/issues/50576) and [#40851](https://github.com/vllm-project/vllm/issues/40851) remain open. Additionally, V4-Flash-0731 uses ~8× more KV cache per token than the preview checkpoint (56 bytes/token), capping `max_model_len` around 121K on H20 TP=2 ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- **Kimi-K3 on ROCm**: upstream gap/roadmap tracking opened, including AITER fused-MoE a16w4/a8w4 integration ([#50682](https://github.com/vllm-project/vllm/issues/50682)).
- **ROCm Docker image** now ships the LMCache KV connector out of the box ([#51208](https://github.com/vllm-project/vllm/pull/51208)).
- **NVFP4 KV cache on pre-SM100** (Ampere/Hopper) via FlashInfer slot-mapping API, removing the SM100-only restriction ([#46963](https://github.com/vllm-project/vllm/pull/46963)).
- **Humming support for compressed-tensors WNA16 MoE checkpoints** ([#48918](https://github.com/vllm-project/vllm/pull/48918)).
- **W4A8-INT8 roadmap**: adopt PTX 9.4 `ldmatrix.s8.s4` for in-flight INT4→INT8 expanding loads ([#49529](https://github.com/vllm-project/vllm/issues/49529)).
- **RFC: full CUDA graph support for ViT encoders** in multimodal models (Qwen3-VL, GLM-V, Kimi K2.5) ([#38175](https://github.com/vllm-project/vllm/issues/38175)); LoRA on tower/connector for more MM models also requested ([#31479](https://github.com/vllm-project/vllm/issues/31479)).

## Performance & Optimization
- **DSpark confidence-scheduled verification** ([#47808](https://github.com/vllm-project/vllm/pull/47808)): adaptively sizes the draft-verification budget from per-request confidence instead of fixed-k verification, targeting the high-concurrency collapse where 7 drafts/request cost more than they return.
- **Dynamic speculative decoding (DSD) remains risky in production**: DSD arms pay a baseline tax vs no-spec ([#49986](https://github.com/vllm-project/vllm/issues/49986)); aggregate-throughput collapse occurs at the batch-size threshold on Qwen3.5-122B MTP (k=2), tied to the `FULL_AND_PIECEWISE → PIECEWISE` cudagraph downgrade (~14% single-stream cost) ([#49548](https://github.com/vllm-project/vllm/issues/49548)). An RFC proposes extending `num_speculative_tokens_per_batch_size` with a context-length axis ([#48627](https://github.com/vllm-project/vllm/issues/48627)); a second closed RFC covers per-request effective proposal lengths ([#48202](https://github.com/vllm-project/vllm/issues/48202)).
- **GLM 5.2 performance optimization** tracked with a merged task list ([#46654](https://github.com/vllm-project/vllm/issues/46654)).
- **ROCm kernel work**: fused bf16→fp32 MoE router GEMM enabled ([#50268](https://github.com/vllm-project/vllm/pull/50268)); dual-stream decode with hip/cudagraph compatibility for DP configurations ([#48223](https://github.com/vllm-project/vllm/pull/48223)).
- **FlashInfer workspace sizing helper** used when available, avoiding over-reservation for attention planning ([#46883](https://github.com/vllm-project/vllm/pull/46883)).
- **Custom encoder cache managers** can now be configured via `VllmConfig` for online and offline inference ([#51251](https://github.com/vllm-project/vllm/pull/51251)).
- **ROCm CI**: skinny GEMM test suite reduced from ~2 hours to ~10 seconds ([#51877](https://github.com/vllm-project/vllm/pull/51877)).
- Embedding-task optimization RFC remains open for encoder models ([#21796](https://github.com/vllm-project/vllm/issues/21796)).

## Stability & Regressions
**High severity**
- **Kimi-K3 long-context degeneration**: after a ~240K-token prefill, the deployment returns a single repeated degenerate token for every subsequent request (NaN logits; packed KDA prefill suspected) ([#51039](https://github.com/vllm-project/vllm/issues/51039)).
- **Gemma4 startup failure**: `vllm/vllm-openai:latest` (vLLM 0.27.0) fails to start a Gemma4 NVFP4 model under Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **DeepSeek-V4-Flash regression**: upgrade from 0.26.0 to 0.27.0 errors at runtime ([#51758](https://github.com/vllm-project/vllm/issues/51758)).
- **DeepGEMM "Unknown recipe" assertion** during FP8 kernel warmup on Blackwell sm_120 — a 0.24.0 regression vs 0.23.0 ([#47130](https://github.com/vllm-project/vllm/issues/47130)).

**Medium severity**
- **ROCm/gfx942 (MI325X)**: GPU memory access fault when sequences cross 2048 tokens with DeepSeek-V4-Flash, `sparse_attn_indexer` + FP8 KV cache, TP=4 ([#48266](https://github.com/vllm-project/vllm/issues/48266)).
- **Spec-decode crashes/regressions**: `cudaErrorIllegalAddress` in `gdn_attn.py` with qwen3_next_mtp at k=5 under load ([#37035](https://github.com/vllm-project/vllm/issues/37035)); fix PR for autoregressive draft-decode capture under dynamic SD ([#49652](https://github.com/vllm-project/vllm/pull/49652)); #48137 costs ~10.6% spec-decode acceptance and #48660 shifts output distributions on DeepSeek-V4-Flash ([#49927](https://github.com/vllm-project/vllm/issues/49927)).
- **NVFP4 + FlashInfer CuteDSL MoE + DeepEP low-latency** numerical accuracy issue on B200 — closed as stale ([#31840](https://github.com/vllm-project/vllm/issues/31840)).

**Fixes in flight**
- QuantFP8 DeepGEMM UE8M0 path: lazy `DeepGemmQuantScaleFMT` oracle init and bound packed path to group_size 128, fixing a crash on RTX PRO 6000 (SM120) ([#51359](https://github.com/vllm-project/vllm/pull/51359)).
- Thinking-budget state no longer bleeds between requests after mixed-batch reorder ([#51890](https://github.com/vllm-project/vllm/pull/51890)).
- Request-controlled audio preprocessing bounded against model limits to prevent oversized feature allocations ([#51894](https://github.com/vllm-project/vllm/pull/51894)).
- EAGLE cache-peek capability now declared per KV cache manager, failing closed for unsupported/recurrent managers ([#51351](https://github.com/vllm-project/vllm/pull/51351)).
- Never-hit cached blocks now evicted first instead of being mixed with hit blocks ([#51642](https://github.com/vllm-project/vllm/pull/51642)).

## What This Means for Application Developers
- **Test before upgrading to 0.27.0**: Gemma4 + Transformers 5.15.0 and DeepSeek-V4-Flash both have fresh startup/runtime regressions; v0.27.1 is the recommended patch, and the QuantFP8/UE8M0 crash fix is still in flight ([#51359](https://github.com/vllm-project/vllm/pull/51359)).
- **Don't plan Ampere deployments for DeepSeek-V4-Flash**: SM8x support is a top community ask but remains unimplemented, and V4-Flash-0731's ~8× KV cache expansion will severely cap context length even where it does run.
- **Be cautious with dynamic speculative decoding in production**: known batch-threshold throughput cliffs, PIECEWISE cudagraph downgrades, and acceptance-rate regressions make it a benchmark-before-enable feature.
- **Kimi-K3 long-context serving is risky** near ~240K tokens until the NaN/degeneration bug is fixed; isolate long-context workloads or pin a known-good version.
- **NVFP4 KV cache on Ampere/Hopper is the opportunity to watch**: the FlashInfer-based path ([#46963](https://github.com/vllm-project/vllm/pull/46963)) makes smaller KV footprints viable without SM100 hardware.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## 1. Today’s Highlights

No new release landed in the last 24 hours, but CI and high-priority kernel work are clearly the main focus. The CI tracker shows 3 broken and 11 flaky tests with 670 recently fixed, while the CUDA coredump tracker continues to collect pr-test failures ([#17050](https://github.com/sgl-project/sglang/issues/17050), [#26340](https://github.com/sgl-project/sglang/issues/26340)). High-priority work remains concentrated on DeepSeek-V4 performance, SM120 enablement, and PP+HiCache consistency, with significant new enablement PRs for XPU, LTX-2.5 diffusion, Kimi Delta-Attention, and FlashInfer mxfp8 GEMM.

## 2. Releases & Breaking Changes

- No new release or merged config/API breaking change in the last 24h.
- Watch these open PRs if they merge: [#34492](https://github.com/sgl-project/sglang/pull/34492) changes the XPU backend default to `SGLANG_USE_SGL_XPU=true`; [#34489](https://github.com/sgl-project/sglang/pull/34489) changes the Triton download method for multi-architecture/custom Python environments.

## 3. New Model & Hardware Support

- **Diffusion:** [#34471](https://github.com/sgl-project/sglang/pull/34471) adds LTX-2.5 support; [#34359](https://github.com/sgl-project/sglang/pull/34359) adds MiniMax H3 LoRA support in both native fused and Diffusers/PEFT split-QKV layouts.
- **Kimi models:** [#32593](https://github.com/sgl-project/sglang/pull/32593) adds an opt-in Helion backend for Kimi Delta-Attention packed decode/prefill; [#34490](https://github.com/sgl-project/sglang/pull/34490) adds an AMD Radix-4 MoE top-k router kernel for Kimi-K3.
- **XPU/NPU:** [#34492](https://github.com/sgl-project/sglang/pull/34492) makes `SGLANG_USE_SGL_XPU` default to true on XPU; [#32745](https://github.com/sgl-project/sglang/pull/32745) fixes Qwen3.5 GemmaRMSNorm loading on Ascend 950.
- **Wide EP:** [#34120](https://github.com/sgl-project/sglang/issues/34120) remains open for GLM5-2/Kimi-K3 over GB200 NVLink and B200 EFA; users report deployment still fails to come up.

## 4. Performance & Optimization

- **DeepSeek-V4 perf tracking** ([#33636](https://github.com/sgl-project/sglang/issues/33636)) is active on NVIDIA SM90/SM10X. TRT-LLM DSv4 attention integration for SM100/103 is still a high-priority open item.
- **SM120 optimization plan** ([#19637](https://github.com/sgl-project/sglang/issues/19637)) continues; DeepSeek-V4 and DeepGEMM MQA Indexer work are checked off, while DeepSeek-V4 Flash support remains open.
- **DeepEPv2 ElasticBuffer backend** ([#29525](https://github.com/sgl-project/sglang/pull/29525)) targets CUDA-graph-capturable MoE decode with fixed per-rank communication shapes, including multi-node topologies.
- **FlashInfer cute-dsl mxfp8 GEMM** ([#34042](https://github.com/sgl-project/sglang/pull/34042)) is WIP and reported significantly faster than the persistent Cutlass path on SM10X; no concrete numbers yet.
- **LayerNorm sequence parallelism** ([#30915](https://github.com/sgl-project/sglang/pull/30915)) adds Megatron-style `--enable-layernorm-sp` for the prefill/EXTEND path under pure TP.
- **Diffusion roadmap** ([#23035](https://github.com/sgl-project/sglang/issues/23035)) continues targeting LTX-2, NVFP4/MXFP4/FP8, graph-level optimization, consumer GPU tuning, and kernel fusion.

## 5. Stability & Regressions

Active issues updated in the last 24h, ranked by severity:

- **Scheduler hang / watchdog abort on DeepSeek-V4 FP8 + H20** — `sglang 0.5.17` with hierarchical cache and chunked prefill 16K hangs in DSV4 sparse prefill; also a sampling device-side assert on a 0.5.16+PR build. No linked fix PR yet: [#34235](https://github.com/sgl-project/sglang/issues/34235)
- **1M-token prefill CUDA OOM on 8x B200** — DSV4 indexer `fp8_mqa_logits` in the nonpaged path crashes under `--tp 8 --moe-a2a-backend megamoe`; equivalent request works under tp8/dp8 dp-attention. No linked fix PR yet: [#34155](https://github.com/sgl-project/sglang/issues/34155)
- **Diffusion attention backend fallback regression** — a fallback change is now breaking most diffusion models. No linked fix PR yet: [#34389](https://github.com/sgl-project/sglang/issues/34389)
- **Diffusion multi-output rollout bugs** — per-sample trajectories collapse to output 0, grouped forward raises `AttributeError`, and provided latents skip packing: [#34000](https://github.com/sgl-project/sglang/issues/34000)
- **CUDA coredump tracker** continues collecting pr-test CUDA crashes: [#26340](https://github.com/sgl-project/sglang/issues/26340)

Closed/inactive bugs touched in the last 24h — not all are confirmed fixed, many were stale-closed:

- W4AFP8 + DeepEP `routed_scaling_factor` crash on GLM-5.2: [#33660](https://github.com/sgl-project/sglang/issues/33660)
- Gemma-4-26B-A4B FP8 Dynamic fused-MoE exceeding SM121 shared memory: [#28019](https://github.com/sgl-project/sglang/issues/28019)
- DeepEP cooperative launch “too many blocks” error: [#23992](https://github.com/sgl-project/sglang/issues/23992)
- `sgl-kernel 0.15.2` vs `transformers 5.6.0` dependency conflict: [#27654](https://github.com/sgl-project/sglang/issues/27654)
- `rope_scaling` via `--json-model-override-args` silent no-op for VLM-format models: [#27974](https://github.com/sgl-project/sglang/issues/27974)
- EAGLE + MiMo-V2.5 NVFP4 shape mismatch: [#24322](https://github.com/sgl-project/sglang/issues/24322)
- MiMo-V2.5-Pro-FP4-DFlash drafter accept-length anomaly: [#27924](https://github.com/sgl-project/sglang/issues/27924)

Fix/test PRs updated in the last 24h:

- [#34447](https://github.com/sgl-project/sglang/pull/34447) fixes PP-safe fused shared-expert detection for Qwen MoE, avoiding non-first-stage `PPMissingLayer` crashes.
- [#29792](https://github.com/sgl-project/sglang/pull/29792) fixes Mamba track-boundary bookkeeping under overlap scheduling.
- [#32330](https://github.com/sgl-project/sglang/pull/32330) enables FlashInfer TRT-LLM all-reduce on SM120/SM121, avoiding NCCL ring fallback.
- [#28857](https://github.com/sgl-project/sglang/pull/28857) fixes Gemma4 tool-parser array parsing of bracketed strings/stray brackets.
- [#28864](https://github.com/sgl-project/sglang/pull/28864) rejects empty/blank `lora_name`/`lora_path`; [#28858](https://github.com/sgl-project/sglang/pull/28858) validates `n` and rejects empty stop strings in `SamplingParams.verify()`.
- [#34491](https://github.com/sgl-project/sglang/pull/34491) makes diffusion LoRA IPC weight updates honor `lora_merge_mode`.
- [#32557](https://github.com/sgl-project/sglang/pull/32557) adds a regression test for the DeepSeek-V4 prefill-CP hook-ordering crash fixed by [#33532](https://github.com/sgl-project/sglang/pull/33532).
- [#31366](https://github.com/sgl-project/sglang/pull/31366) skips `dsv3_fused_a_gemm` on consumer Blackwell due to the ~100KB shared-memory cap.

## 6. What This Means for Application Developers

- **DeepSeek-V4 long-context deployments are still risky.** If you are serving 1M-token prompts on B200 or using hierarchical cache + chunked prefill on H20, validate against [#34155](https://github.com/sgl-project/sglang/issues/34155) and [#34235](https://github.com/sgl-project/sglang/issues/34235). For 1M-token prefill, dp-attention appears to be a safer path than the MegaMoE nonpaged path.
- **Diffusion users should be cautious on current main.** The attention-backend fallback regression ([#34389](https://github.com/sgl-project/sglang/issues/34389)) and multi-output rollout bugs ([#34000](https://github.com/sgl-project/sglang/issues/34000)) can break otherwise-working workloads. Pin to a known-good release unless you need the new LTX-2.5/MiniMax H3 work.
- **LoRA and RL weight-sync paths are becoming safer.** `lora_merge_mode` is now honored in IPC weight updates ([#34491](https://github.com/sgl-project/sglang/pull/34491)), and invalid `lora_name`/`lora_path` and sampling params are rejected earlier ([#28864](https://github.com/sgl-project/sglang/pull/28864), [#28858](https://github.com/sgl-project/sglang/pull/28858)).
- **Router state recovery is coming.** If you run long-lived `sgl-router` with KV-aware routing, review the snapshots + event-replay RFC ([#33394](https://github.com/sgl-project/sglang/issues/33394)) — current live-event-only reconstruction is fragile if the router restarts after workers.
- **Non-NVIDIA deployments are improving.** XPU now moving to `sgl-xpu` by default ([#34492](https://github.com/sgl-project/sglang/pull/34492)), and Ascend 950 Qwen3.5 support is fixed ([#32745](https://github.com/sgl-project/sglang/pull/32745)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-12

## 1. Today's Highlights

Seven patch releases landed (b10356–b10362), headlined by ROCm 7.14 CI/build targets — the first production release using AMD's TheRock build system — and a fix enabling sliding-window attention for EXAONE 4.5. On the reliability front, a security-relevant out-of-bounds write in the RPC backend's `SET_ROWS` path was reported ([#26912](https://github.com/ggml-org/llama.cpp/issues/26912)) with a validation fix already open as [PR #26933](https://github.com/ggml-org/llama.cpp/pull/26933). New architecture support for SKT A.X K2 (Sparse Gated Attention + Gated Norm) entered review ([PR #26757](https://github.com/ggml-org/llama.cpp/pull/26757)), and speculative decoding (DSpark) on multi-GPU setups remains the most active stability battleground.

## 2. Releases & Breaking Changes

**Shipped (b10356 → b10362):**
- **b10362** — Disables the multi-output sampling chain test on HIP; `top_k`'s backend probs path requires CUB, which is unavailable on HIP ([#26878](https://github.com/ggml-org/llama.cpp/pull/26878)).
- **b10361** — Fixes SWA not being enabled for EXAONE 4.5: `load_arch_hparams` checked `n_layer() == 64` before `LLM_KV_NEXTN_PREDICT_LAYERS` was read ([#26848](https://github.com/ggml-org/llama.cpp/pull/26848)).
- **b10360** — Suppresses incomplete escape-sequence warnings in the PEG grammar module ([#26780](https://github.com/ggml-org/llama.cpp/pull/26780)).
- **b10359** — WebGPU CI fixes: new flash-attention tests, i32 `cpy` support, sub-group matrix handling when `max_kv_tile == 0` ([#26566](https://github.com/ggml-org/llama.cpp/pull/26566)).
- **b10358** — Addresses review feedback on speculative-decoding PR #25532 ([#26852](https://github.com/ggml-org/llama.cpp/pull/26852)).
- **b10357** — OpenCL: transposes the K tile in local memory for FA prefill kernels ([#26428](https://github.com/ggml-org/llama.cpp/pull/26428)).
- **b10356** — CI targets for **ROCm 7.14** on Linux and Windows using the TheRock build system; wheels/debs/rpms/tarballs/runfiles install paths ([#25775](https://github.com/ggml-org/llama.cpp/pull/25775)).

**Breaking/deprecation in progress:**
- [PR #26934](https://github.com/ggml-org/llama.cpp/pull/26934) migrates deprecated `--mmap` / `--no-mmap` / `--mlock` / `--direct-io` flags to a unified `--load-mode` argument across scripts, examples, SYCL docs, and Snapdragon tooling. Applications passing the old flags should plan for removal.

## 3. New Model & Hardware Support

- **A.X K2** (SKT) — new architecture support with Sparse Gated Attention and Gated Norm ([PR #26757](https://github.com/ggml-org/llama.cpp/pull/26757)).
- **EXAONE 4.5** — sliding-window attention now correctly enabled ([#26848](https://github.com/ggml-org/llama.cpp/pull/26848)).
- **ROCm 7.14 / TheRock** — official build and release targets for Linux + Windows ([#25775](https://github.com/ggml-org/llama.cpp/pull/25775)).
- **AMD iGPU UMA VRAM detection** — fix for Strix Halo (gfx1151) class parts where `hipMemGetInfo()` reports system RAM instead of GPU VRAM; now reads sysfs VRAM ([PR #26932](https://github.com/ggml-org/llama.cpp/pull/26932)).
- **Glimmer drafter optimization** — in review ([PR #26842](https://github.com/ggml-org/llama.cpp/pull/26842)); note the `muse-glimmer` architecture is still erroring in the wild ([#26858](https://github.com/ggml-org/llama.cpp/issues/26858), [#26902](https://github.com/ggml-org/llama.cpp/issues/26902)).
- **32-bit ARM** — `__fp16` usage gated on `__ARM_FP16_FORMAT_IEEE` for NEON builds ([PR #26860](https://github.com/ggml-org/llama.cpp/pull/26860)).

## 4. Performance & Optimization

- **OpenCL FA prefill** — K-tile transpose moved to local memory in b10357, targeting prefill kernel efficiency ([#26428](https://github.com/ggml-org/llama.cpp/pull/26428)).
- **Expert caching** — the two competing PRs ([#26563](https://github.com/ggml-org/llama.cpp/pull/26563), [#26824](https://github.com/ggml-org/llama.cpp/pull/26824)) were both closed; author is redesigning ~half the system and will re-open clean. Includes heatmap-based mmap pinning and host↔device expert transfer.
- **Deterministic Draft Filter** — new pluggable SDK/SPI for draft-token validation in speculative decoding ([PR #26551](https://github.com/ggml-org/llama.cpp/pull/26551)).
- **MTP context fitting on ROCm** — excessive compute-buffer reservation in the MTP draft context unnecessarily shrinks fitted context size on HIP ([#26038](https://github.com/ggml-org/llama.cpp/issues/26038)).
- **Build perf** — ccache configured as HIP compiler launcher to fix slow ROCm builds despite high hit rates ([PR #26926](https://github.com/ggml-org/llama.cpp/pull/26926)).

## 5. Stability & Regressions

Ranked by severity; fix PRs noted where available.

1. **RPC `SET_ROWS` OOB write (security)** — `ggml-rpc-server` can write past an output tensor buffer in release builds ([#26912](https://github.com/ggml-org/llama.cpp/issues/26912)); validation loop proposed in [PR #26933](https://github.com/ggml-org/llama.cpp/pull/26933).
2. **DeepSeek V4 garbled output on Strix Halo (ROCm/HIP)** — 27 comments, 5 👍, still open; affects Ryzen AI Max+ 395 ([#25436](https://github.com/ggml-org/llama.cpp/issues/25436)).
3. **DSpark speculative decoding crash on CUDA** — `cublasSgemm` "unsupported value" after ~2,000–2,600 decoded tokens on multi-GPU DeepSeek-V4-Flash; reproducible across runs ([#26554](https://github.com/ggml-org/llama.cpp/issues/26554)).
4. **ROCm 7.14 runtime breakage** — `libhipblas.so.3` shared-library loading error ([#25807](https://github.com/ggml-org/llama.cpp/issues/25807)) and VRAM not allocated on gfx1201 ([#26208](https://github.com/ggml-org/llama.cpp/issues/26208)). Expect follow-up fixes as 7.14 CI lands.
5. **RPC worker crash in `GGML_OP_TOP_K`** — gfx1151 ROCm worker crashes during DeepSeek V4 prefill past 4096 tokens ([#26746](https://github.com/ggml-org/llama.cpp/issues/26746)).
6. **Qwen3-Embedding all-NaN on Volta (CUDA sm_70)** — permanent server wedge; CPU output correct; present in every version since embedding support landed ([#26044](https://github.com/ggml-org/llama.cpp/issues/26044)).
7. **SYCL garbage on second prompt** — Intel Arc Pro B60, reproducible after first generation ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845)).
8. **Muse-Glimmer** — "unknown model architecture" ([#26858](https://github.com/ggml-org/llama.cpp/issues/26858)) and tensor-split `GGML_ASSERT` failure on 4×Tesla T10 ([#26902](https://github.com/ggml-org/llama.cpp/issues/26902)); both closed/open respectively, architecture still maturing.
9. **Gemma-4 family** — OpenVINO load failure ([#24415](https://github.com/ggml-org/llama.cpp/issues/24415)); `GGML_SCHED_MAX_SPLIT_INPUTS` assert on V100 ([#24132](https://github.com/ggml-org/llama.cpp/issues/24132)).
10. **Closed today** — `split-mode = tensor` regression since b10054 ([#25829](https://github.com/ggml-org/llama.cpp/issues/25829)); `enable_thinking:false` ignored on qwen3.5 ([#20182](https://github.com/ggml-org/llama.cpp/issues/20182)); LFM2.5 tool-call quoting ([#26658](https://github.com/ggml-org/llama.cpp/issues/26658)); Vulkan MoE crash on Intel Arc B70 ([#23769](https://github.com/ggml-org/llama.cpp/issues/23769)); long-running server slowdown ([#22360](https://github.com/ggml-org/llama.cpp/issues/22360)).

## 6. What This Means for Application Developers

- **ROCm 7.14 migration is now official** — AMD users should expect the default release binaries to move to 7.14 (TheRock). Verify `libhipblas.so.3` is on `LD_LIBRARY_PATH` and test Strix Halo/gfx1151 paths before upgrading production.
- **Patch your RPC deployments** — if you expose `ggml-rpc-server`, adopt [PR #26933](https://github.com/ggml-org/llama.cpp/pull/26933) for the `SET_ROWS` OOB write ([#26912](https://github.com/ggml-org/llama.cpp/issues/26912)) or restrict trust in RPC clients.
- **Speculative decoding is still risky for long generations** — DSpark on multi-GPU CUDA reliably crashes around 2–2.6K decoded tokens ([#26554](https://github.com/ggml-org/llama.cpp/issues/26554)). Use it for short responses or stay on validated draft-model combinations.
- **Server observability is being tightened** — the metrics refactor ([PR #26920](https://github.com/ggml-org/llama.cpp/pull/26920)) ties metric updates to `llama_decode` outcome and fixes derived-metric correctness; meaningful for dashboards/SLOs.
- **Structured output is getting more robust** — JSON-schema grammars will soon accept unanchored regex patterns ([PR #26931](https://github.com/ggml-org/llama.cpp/pull/26931)) and gracefully fall back on unsupported patterns like lookaheads ([PR #26939](https://github.com/ggml-org/llama.cpp/pull/26939)). OpenAI Responses API + Cohere2 template schema support is also in flight ([PR #26013](https://github.com/ggml-org/llama.cpp/pull/26013)).
- **Plan for CLI flag churn** — migrate any scripts using `--mmap`/`--no-mmap`/`--mlock`/`--direct-io` to `--load-mode` before the old flags are removed ([PR #26934](https://github.com/ggml-org/llama.cpp/pull/26934)).
- **Tooling/MCP trajectory** — the server-side tool registry refactor ([#20673](https://github.com/ggml-org/llama.cpp/issues/20673)) and MCP resources/prompts restoration ([#26862](https://github.com/ggml-org/llama.cpp/issues/26862)) signal that server-side MCP handling is being consolidated; web UI will gain file-download buttons for generated artifacts ([PR #26928](https://github.com/ggml-org/llama.cpp/pull/26928)) and a `read_media` tool for vision models ([PR #25877](https://github.com/ggml-org/llama.cpp/pull/25877)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama Digest — 2026-08-12

### 1. Today's Highlights

Ollama shipped **v0.32.9** with support for **NVIDIA Nemotron 3.5 Lightning**, a 30B MoE model with 3B active parameters aimed at always-on agent execution layers. At the same time, the tracker is dominated by MLX correctness issues, quantization-related output corruption, a Docker image availability incident for v0.32.8, and an active PR adding OpenAI Responses API web search support.

### 2. Releases & Breaking Changes

- **v0.32.9** — adds NVIDIA Nemotron 3.5 Lightning support. No explicit migration notes in the release description.  
  https://github.com/ollama/ollama/releases/tag/v0.32.9
- **Docker image availability incident** — `ollama/ollama:0.32.8` was missing from Docker Registry immediately after release, causing `manifest unknown` errors. The issue is now closed, but verify tags before pinning in CI.  
  https://github.com/ollama/ollama/issues/17668
- **In progress: server-side MLX imports** — PR #14969 would support safetensors imports through the MLX create pipeline and limit GGUF create to wrapping existing GGUF inputs, a potential behavior change for `ollama create`.  
  https://github.com/ollama/ollama/pull/14969
- **Proposed default behavior change** — PR #17679 stops applying `repeat_penalty 1.1` to models that do not set one, which will change generation behavior for many models if merged.  
  https://github.com/ollama/ollama/pull/17679

### 3. New Model & Hardware Support

- **NVIDIA Nemotron 3.5 Lightning** — open 30B MoE, 3B active parameters, positioned for agent harnesses like OpenClaw and Hermes Age.  
  https://github.com/ollama/ollama/releases/tag/v0.32.9
- **Nemotron 3.5 prompt layout support** — PR #17672 selects the 3.5 parser/renderer from checkpoint templates and maps reasoning effort to the expected final-user annotation.  
  https://github.com/ollama/ollama/pull/17672
- **Ling-3.0-Tiny on MLX** — PR #17643 adds MLX support for the Bailing MoE V3 architecture, including FP8/INT4 quantized releases.  
  https://github.com/ollama/ollama/pull/17643
- **AMD Strix Halo GPU memory detection fix** — PR #17685 fixes `hipMemGetInfo()` returning system RAM instead of GPU VRAM on gfx1151 and similar large-VRAM iGPUs.  
  https://github.com/ollama/ollama/pull/17685
- **OpenAI Responses API web search** — PR #17686 adds server-side web search for Codex through Ollama's Responses API compatibility layer.  
  https://github.com/ollama/ollama/pull/17686

### 4. Performance & Optimization

- **Qwen3.6-35B-A3B regression on Apple M2** — reported performance dropped significantly after upgrading to Ollama 0.32.5, with an older build running ~72 T/s on the same model/prompt/hardware. Investigation ongoing.  
  https://github.com/ollama/ollama/issues/17583
- **MLX runner request serialization** — Issue #17666 notes the experimental MLX runner handles one request at a time; concurrent calls are queued. Batching/concurrent decode support is proposed.  
  https://github.com/ollama/ollama/issues/17666
- **Metrics endpoint** — PR #16998 adds an opt-in Prometheus-compatible `/metrics` endpoint via `OLLAMA_METRICS=1`, exposing queue depth, models loaded, HTTP request counts, and token-level metrics.  
  https://github.com/ollama/ollama/pull/16998
- **Speculative decoding benchmark work** — PR #17480 replaces synthetic prompts with packed HumanEval patch prompts so speculative draft models are tested on realistic code-like continuations.  
  https://github.com/ollama/ollama/pull/17480

### 5. Stability & Regressions

Ranked by approximate severity:

- **Session revocation security issue** — sessions are not revoked after password/email change, leaving accounts accessible. No fix PR yet.  
  https://github.com/ollama/ollama/issues/17682
- **Quantized KV cache produces garbage output** — switching from q8_0 to q4_0 KV quantization caused models to emit unintelligible repeated tokens.  
  https://github.com/ollama/ollama/issues/17614
- **Quantized KV cache breaks tool calls on ROCm** — q8_0/q4_0 KV cache causes models to stop mid-turn instead of emitting tool calls on Qwen3.5/3.6 with AMD GPUs; severity tracks quant precision.  
  https://github.com/ollama/ollama/issues/17347
- **Deterministic CUDA illegal memory access** — large prefills with head-size-256 models crash the runner on DGX Spark (GB10) in `ggml_cuda_flash_attn_ext_mma_f16_case`.  
  https://github.com/ollama/ollama/issues/17596
- **MLX cross-request response contamination** — with `OLLAMA_KEEP_ALIVE=-1`, long-lived MLX runners intermittently return a verbatim answer to an earlier prompt. Closed, but verify whether the fix is included in your build.  
  https://github.com/ollama/ollama/issues/17599
- **MLX structured outputs ignored** — `response_format` is not enforced for MLX models.  
  https://github.com/ollama/ollama/issues/16563
- **MLX Muse token leakage** — `muse-glimmer:30b-mlx` prefixes completions with control tokens and ignores JSON schemas.  
  https://github.com/ollama/ollama/issues/17684
- **Models disappeared after upgrade** — updating to 0.32.7 on Jetson AGX Orin removed several models; only qwen3.6:35b survived.  
  https://github.com/ollama/ollama/issues/17661
- **`context deadline exceeded` on direct URL pulls** — PR #17551 fixes retry backoff when the first registry request stalls and cancels the shared context.  
  https://github.com/ollama/ollama/issues/17484  
  https://github.com/ollama/ollama/pull/17551
- **Gemma 4 Cloud HTTP 500 with vision + tools** — `gemma4:31b-cloud` fails when a request combines vision and tool calling.  
  https://github.com/ollama/ollama/issues/17667
- **Claude Code integration returns empty responses** — `qwen3-coder:30b` generates successfully, but Claude Code shows no response, despite `ollama run` working.  
  https://github.com/ollama/ollama/issues/17671
- **Qwen3.6 hybrid falls back to CPU on CUDA** — works with llama.cpp b10242, but falls back to CPU with b10353.  
  https://github.com/ollama/ollama/issues/17669

### 6. What This Means for Application Developers

- **Agentic workloads should evaluate Nemotron 3.5 Lightning** on v0.32.9. The 3B-active MoE profile is aimed at always-on agent execution layers, so it may be a strong fit for long-running harness workloads.
- **Be cautious with MLX in production.** Structured outputs are still unreliable, long-lived runners have shown cross-request contamination, and MLX requests are currently serialized. Pin GGUF builds or add output validation if you depend on MLX.
- **KV cache quantization is risky for tool-calling loops.** Issues #17614 and #17347 show both incoherent text and missing tool calls when q4_0/q8_0 KV cache is enabled. Test quantized KV cache against your exact tool-call prompts before rolling out.
- **Pin Docker tags in CI.** The v0.32.8 registry incident is a reminder that release tags may not immediately have matching images.
- **If you use `ollama create` with large files, be ready for silent hangs.** Per-file SHA-256 progress is in progress in PR #17649, but until then large Modelfile creation can look stuck.
- **OpenAI-compatible agent developers should watch PR #17686** — web search in the Responses API is coming, which will unblock Codex-style tooling with local or cloud models.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Digest — 2026-08-12

### 1. Today's Highlights
The Rust rewrite remains the marquee effort: the parent ticket ([#31263](https://github.com/BerriAI/litellm/issues/31263)) continues to draw discussion with a sub-1ms overhead target and open beta signups. On the operations side, a cluster of spend-accounting fixes landed or progressed — xAI web-search billing now reads `server_side_tool_usage_details` ([#30817](https://github.com/BerriAI/litellm/pull/30817)), passthrough budget reservations no longer leak into Redis ([#36592](https://github.com/BerriAI/litellm/pull/36592)), and Postgres deadlocks retry instead of silently dropping spend increments ([#34887](https://github.com/BerriAI/litellm/pull/34887)). Several streaming crash fixes are in flight for non-standard provider chunk shapes ([#36553](https://github.com/BerriAI/litellm/issues/36553), [#27670](https://github.com/BerriAI/litellm/issues/27670), [#36593](https://github.com/BerriAI/litellm/pull/36593)).

### 2. Releases & Breaking Changes
Seven patch releases were cut in the last 24h — v1.96.2, v1.95.1, v1.94.3, v1.93.2, v1.92.2, v1.91.5, v1.90.7 — all with identical boilerplate release notes documenting cosign-signed Docker image verification (same key since [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)). No migration notes were published. One packaging regression to flag: [litellm 1.96.1 ships no Python 3.13-compatible wheel or sdist](https://github.com/BerriAI/litellm/issues/36526), so Python 3.13 environments resolving `litellm>=1.41.15` currently land on an uninstallable artifact.

### 3. New Model & Hardware Support
- Bedrock: DeepSeek V3.2 and GLM 5 now advertise native structured output across cross-region and region-pinned IDs, not just a single canonical ID ([#36597](https://github.com/BerriAI/litellm/pull/36597)).
- Bedrock CI tests repointed off the retired Claude 3 Sonnet (`anthropic.claude-3-sonnet-20240229-v1:0`) onto Claude Sonnet 4.5 ([#36600](https://github.com/BerriAI/litellm/pull/36600)).
- Cost-map fix: Azure GPT-5.6 Terra/Luna rows now reflect Azure's published meters rather than OpenAI's post-cut prices ([#36192](https://github.com/BerriAI/litellm/issues/36192)).
- Open gaps: Meta's `meta/muse-spark-1.1` is backend-supported but missing from the UI provider dropdown ([#36164](https://github.com/BerriAI/litellm/issues/36164)); native BlockRun integration requested ([#27719](https://github.com/BerriAI/litellm/issues/27719)); Vertex AI's 10-image-link limit is unhandled ([#27838](https://github.com/BerriAI/litellm/issues/27838)).

### 4. Performance & Optimization
- The [Rust migration](https://github.com/BerriAI/litellm/issues/31263) targets sub-1ms gateway overhead; no independent benchmarks published yet.
- Scheduled background jobs are now staggered across jobs and pods, eliminating synchronized APScheduler firing instants that concentrate load at startup/rollout — a real thundering-herd issue for multi-replica deployments ([#36589](https://github.com/BerriAI/litellm/pull/36589)).
- Spend-log retention cleanup is now bounded in batch size and run length (previously a single run could delete 500k rows per table and hold row locks indefinitely), with dashboard visibility added ([#36594](https://github.com/BerriAI/litellm/pull/36594)).
- The OTEL credential-scoped `TracerProvider` cache is now bounded and shuts down `BatchSpanProcessor` worker threads instead of leaking them ([#36591](https://github.com/BerriAI/litellm/pull/36591)).
- Prisma database spans are attributed to PostgreSQL instead of `localhost` (the Rust query-engine loopback), fixing APM topology views ([#36595](https://github.com/BerriAI/litellm/pull/36595)).

### 5. Stability & Regressions
Ranked by severity:
- **Streaming crashes**: `_should_start_new_content_block` crashes on empty-`choices` usage-only chunks from OpenAI-format backends on `/v1/messages` ([#36553](https://github.com/BerriAI/litellm/issues/36553)); streaming with a `reasoning` field in the delta raises `TypeError: 'async for' requires an object with 'aiter' method` ([#27670](https://github.com/BerriAI/litellm/issues/27670)); Perplexity streams 500 on dict-shaped `usage.cost` — fix in [PR #36593](https://github.com/BerriAI/litellm/pull/36593); Bedrock guardrails return 500 on Anthropic SSE streams because frames aren't assembled for scanning — fix in [PR #36598](https://github.com/BerriAI/litellm/pull/36598).
- **Failover gaps**: hardcoded `APIConnectionError` in `cooldown_handlers.py` blocks failover to healthy deployments ([#27362](https://github.com/BerriAI/litellm/issues/27362)); `aembedding` missing `num_retries` kwarg means zero retries/no failover for embedding groups ([#27363](https://github.com/BerriAI/litellm/issues/27363)); mid-stream fallback still unsupported for `anthropic_messages` route type ([#24004](https://github.com/BerriAI/litellm/issues/24004)); stale router cooldown cache entries across Redis-back replicas fixed in [PR #34508](https://github.com/BerriAI/litellm/pull/34508).
- **Spend/budget correctness**: Postgres deadlock re-raises drop spend increments — retry fix in [PR #34887](https://github.com/BerriAI/litellm/pull/34887); passthrough requests leaked budget reservations into Redis causing false `BudgetExceededError` — fix in [PR #36592](https://github.com/BerriAI/litellm/pull/36592); `model_info` cost overrides ignored when routing to an upstream LiteLLM proxy ([#27656](https://github.com/BerriAI/litellm/issues/27656)) with a matching custom-pricing propagation fix in [PR #36584](https://github.com/BerriAI/litellm/pull/36584); xAI web-search billed at $0 due to legacy `num_sources_used` parsing — fix in [PR #30817](https://github.com/BerriAI/litellm/pull/30817).
- **MCP/guardrail correctness**: MCP OAuth discovery can block proxy worker startup and cascade into gateway-wide outages — background-warming fix in [PR #36599](https://github.com/BerriAI/litellm/pull/36599); MCP tool arguments/results bypassed redaction in logging backends ([#36474](https://github.com/BerriAI/litellm/pull/36474)); `asyncio.CancelledError` when listing tools for OAuth2 HTTP MCP servers ([#27635](https://github.com/BerriAI/litellm/issues/27635)); `sensitive_data_routing` documented but not recognized as a guardrail ([#36535](https://github.com/BerriAI/litellm/issues/36535)); `litellm_content_filter` evaluations missing from Guardrails Monitor ([#36566](https://github.com/BerriAI/litellm/issues/36566)); Anthropic transformer forces `effort: xhigh` on all Claude models, causing 400s for Claude Code ([#27168](https://github.com/BerriAI/litellm/issues/27168)).
- **Platform**: Python 3.13 wheel missing for 1.96.1 ([#36526](https://github.com/BerriAI/litellm/issues/36526)); rate-limit errors surfaced as "No deployments available" with a printed stack trace ([#20867](https://github.com/BerriAI/litellm/issues/20867)); `add_user_information_to_llm_headers` not forwarded to `/v1/files` or `/v1/batches` ([#27641](https://github.com/BerriAI/litellm/issues/27641)); OCI maps `max_completion_tokens` to unsupported `maxTokens` for GPT-5 ([#27429](https://github.com/BerriAI/litellm/issues/27429)); Vertex AI express-token endpoints still force service-account credentials ([#21036](https://github.com/BerriAI/litellm/issues/21036)); discarded background tasks in `auth_checks.py` (including an SSO-binding DB write) can vanish mid-flight — reference-holding fix in [PR #35379](https://github.com/BerriAI/litellm/pull/35379).
- **Closed this window**: duplicate alerts/spend reports across replicas ([#14809](https://github.com/BerriAI/litellm/issues/14809)), MCP semantic tool filter invalid schema ([#27105](https://github.com/BerriAI/litellm/issues/27105)), Helm standalone DB secret drift ([#27173](https://github.com/BerriAI/litellm/issues/27173)), Snowflake Cortex base URL ([#27187](https://github.com/BerriAI/litellm/issues/27187)), Enterprise grace-period API-key rejection ([#27193](https://github.com/BerriAI/litellm/issues/27193)).

### 6. What This Means for Application Developers
- **Spend data is becoming trustworthy**: with fixes for xAI web-search, Azure GPT-5.6 meters, passthrough budget leakage, and deadlock retries, usage/cost numbers are safe to use for internal chargeback — but pin to the new patches before reconciling.
- **Multi-replica deployments** should adopt the job-staggering and bounded-cleanup PRs ([#36589](https://github.com/BerriAI/litellm/pull/36589), [#36594](https://github.com/BerriAI/litellm/pull/36594)); these address real thundering-herd and DB-saturation failure modes at scale.
- **If you stream from non-OpenAI providers** (Perplexity, Scaleway, or any backend emitting usage-only or `reasoning`-in-delta chunks), you're hitting known crashes — upgrade once [PR #36593](https://github.com/BerriAI/litellm/pull/36593) and the `_should_start_new_content_block` fix merge, or normalize those providers upstream.
- **MCP users**: review OAuth transport registrations; [PR #36599](https://github.com/BerriAI/litellm/pull/36599) is critical for avoiding startup/rollout outages, and [PR #36474](https://github.com/BerriAI/litellm/pull/36474) closes a data-leak gap in logging integrations.
- **Routing groups are now callable as virtual models** and appear in `/v1/models` ([#36519](https://github.com/BerriAI/litellm/pull/36519)) — relevant for Claude Code/Codex model discovery. Separately, the complexity router's rubric is being recalibrated for developer/agent traffic ([#36578](https://github.com/BerriAI/litellm/pull/36578)), and a new shadow-eval mode lets you test the auto-router without routing production traffic ([#36587](https://github.com/BerriAI/litellm/pull/36587)).
- **Python 3.13 users**: pin to a release with cp313 wheels or track [the packaging issue](https://github.com/BerriAI/litellm/issues/36526).
- **Langfuse customers**: the v2 SDK is still pinned; both community and Langfuse-team tickets ([#24123](https://github.com/BerriAI/litellm/issues/24123), [#33383](https://github.com/BerriAI/litellm/issues/33383)) indicate v4/OTel ingestion support is coming but not yet merged.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## 1. Today's Highlights

Unsloth shipped **v0.1.701-beta** with **Unsloth Desktop** — the first open-source desktop app for running and training models locally on Windows, macOS, and Linux ([release notes](https://github.com/unslothai/unsloth/releases)). The launch is generating early install/runtime reports on Linux AppImage and Windows AMD systems. On the engineering side, a wave of Studio backend PRs targets quadratic hot paths, blocking event-loop work, and multi-GPU attention device mismatches.

## 2. Releases & Breaking Changes

- **v0.1.701-beta** — Introduces **Unsloth Desktop**: run, train, export, and deploy from the same local app. Available for Windows, macOS, and Linux ([release](https://github.com/unslothai/unsloth/releases)).
- **v0.1.70-beta** — Listed with identical release notes to v0.1.701-beta; likely a versioning echo in the feed ([release](https://github.com/unslothai/unsloth/releases)).
- **v0.1.62-beta** — “Many bug fixes” ([release](https://github.com/unslothai/unsloth/releases)).

No explicit API/config breaking changes were announced in the provided data.

## 3. New Model & Hardware Support

No new first-party model/architecture support was announced in the last 24 hours. Relevant in-progress items:

- Unsloth Studio’s first **CUDA CI coverage on Kaggle T4** is proposed, which would catch Turing/sm_75-only failures ([PR #8440](https://github.com/unslothai/unsloth/pull/8440), [PR #8489](https://github.com/unslothai/unsloth/pull/8489)).
- Several new-model support gaps were reported:
  - **MiniMax-M3 GGUF** fails to load on Apple Silicon due to missing `indexer.head_count` / `indexer` metadata in bundled llama.cpp ([#8360](https://github.com/unslothai/unsloth/issues/8360), [#8513](https://github.com/unslothai/unsloth/issues/8513)).
  - **MiniMax-H3** hits a stable-diffusion.cpp build that predates the architecture ([#8507](https://github.com/unslothai/unsloth/issues/8507)).
  - **Muse-Glimmer-30B-GGUF** cannot be loaded by the bundled llama.cpp because the `muse-glimmer` GGUF architecture is unrecognized ([#8345](https://github.com/unslothai/unsloth/issues/8345)).

## 4. Performance & Optimization

Multiple backend performance PRs landed or are in review:

- **Linear-time streaming tool parsing** — stops rescanning the entire accumulated response on every streamed token ([PR #8428](https://github.com/unslothai/unsloth/pull/8428)); extends linear scanning to safetensors and “healer” tool paths ([PR #8494](https://github.com/unslothai/unsloth/pull/8494)).
- **Backend startup and event-loop work** — cuts unnecessary startup work and removes blocking operations from the asyncio loop ([PR #8498](https://github.com/unslothai/unsloth/pull/8498)).
- **Routes/data layer** — replaces five superlinear paths, plus a full-vocabulary decode that was discarded ([PR #8499](https://github.com/unslothai/unsloth/pull/8499)).
- **Speculative decoding under Auto/`--fit`** — now drops the drafter first when VRAM is tight, preserving context length and avoiding OOM ([PR #8435](https://github.com/unslothai/unsloth/pull/8435)).
- **xFormers multi-GPU fix** — keeps attention masks on the correct GPU device, fixing `query.device: cuda:1` / `attn_bias: cuda:0` failures in packed/padding-free multi-GPU training ([PR #8516](https://github.com/unslothai/unsloth/pull/8516)).
- **VRAM observability** — reports host VRAM usage when per-GPU attribution is impossible on asymmetric multi-GPU hosts ([PR #8481](https://github.com/unslothai/unsloth/pull/8481)).

No concrete throughput/latency numbers were provided in the upstream data.

## 5. Stability & Regressions

Ranked by severity:

1. **Unsloth Desktop cannot start on Linux AppImage** — missing required Linux libraries; open with 8 comments ([#8463](https://github.com/unslothai/unsloth/issues/8463)).
2. **Windows AMD install failures** — Desktop install fails ([#8508](https://github.com/unslothai/unsloth/issues/8508)); AMD ROCm installer can replace the ROCm PyTorch wheel with a non-ROCm `torch`, breaking import ([#7275](https://github.com/unslothai/unsloth/issues/7275)).
3. **AMD GPU misdetection / CPU-only runtime** — Studio installer reports AMD GPU, but backend runs CPU-only with no reconciliation ([#8473](https://github.com/unslothai/unsloth/issues/8473)).
4. **Exported tokenizer broken** — `tokenizer_config.json` contains `"tokenizer_class": "TokenizersBackend"`, which `transformers.AutoTokenizer` cannot load; impacts all downstream fine-tune deployments ([#8444](https://github.com/unslothai/unsloth/issues/8444)).
5. **Backend CI red on `main`** — every open PR was blocked; fix PR clears four CI reds caused by missing `torchao` in CI and a leaking allowlist answer ([PR #8506](https://github.com/unslothai/unsloth/pull/8506), [PR #8486](https://github.com/unslothai/unsloth/pull/8486)).
6. **Windows GGUF path handling** — drive-letter paths (`C:\...`) break model switching, returning 503 `model_switch_failed`; closed issues indicate fixes are in ([#8368](https://github.com/unslothai/unsloth/issues/8368), [#8375](https://github.com/unslothai/unsloth/issues/8375)).
7. **Version reporting bug** — `unsloth.__version__` aliases `unsloth_zoo.__version__`, so version can misreport when core releases ahead of zoo ([#8171](https://github.com/unslothai/unsloth/issues/8171)).

## 6. What This Means for Application Developers

- **Local deployment is now a real Desktop story.** Unsloth Desktop lets you train, run, export, and deploy models locally without a server stack. But if you target Windows + AMD or Linux AppImage environments, validate the installer/runtime first — several launch-day reports are blockers ([#8463](https://github.com/unslothai/unsloth/issues/8463), [#8508](https://github.com/unslothai/unsloth/issues/8508)).
- **Check exported tokenizers before shipping fine-tunes.** The `TokenizersBackend` export bug can make model loading fail in any standard transformers pipeline ([#8444](https://github.com/unslothai/unsloth/issues/8444)).
- **Studio custom OpenAI-compatible providers cap output at 32K tokens** by default, even for model families with larger known caps; a fix is proposed ([#8509](https://github.com/unslothai/unsloth/issues/8509), [PR #8512](https://github.com/unslothai/unsloth/pull/8512)).
- **Multi-GPU fine-tuning with packed/attention masks should see fewer device-mismatch crashes** if you pick up the xFormers attention-mask fix ([PR #8516](https://github.com/unslothai/unsloth/pull/8516)).
- **If you rely on MiniMax/Muse-Glimmer GGUF models, wait for llama.cpp/stable-diffusion.cpp architecture support** before building on Unsloth Studio ([#8513](https://github.com/unslothai/unsloth/issues/8513), [#8507](https://github.com/unslothai/unsloth/issues/8507)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*