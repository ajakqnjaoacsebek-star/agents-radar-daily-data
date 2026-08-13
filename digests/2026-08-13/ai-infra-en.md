# AI Infrastructure Digest 2026-08-13

> Generated: 2026-08-13 02:02 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-08-13

## 1. Ecosystem Overview

The inference stack is converging on a familiar pattern: **vLLM and SGLang** are absorbing most of the bleeding-edge model performance work (Kimi-K3, DeepSeek-V4, Blackwell/ROCm kernels), while **llama.cpp and Ollama** iterate rapidly on local-runtime correctness and platform breadth (MLX expansion, new TTS/vision support). **LiteLLM** is consolidating its role as the billing/routing/cost-control layer, with spend-log durability and budget-reservation fixes dominating. **Unsloth** is a clear outlier — its activity is almost entirely Desktop/Studio packaging stability (AMD detection, Windows installers, macOS startup), not training research. The most striking signal: **no stable release shipped today from any serving engine or gateway** — the only releases were llama.cpp patch builds (b10369–b10375) and an Ollama RC. Production users are being told, in effect, to pin versions while distributed-serving regressions (multi-node stalls, DSpark deadlocks, NVFP4 NaNs) get worked out in open PRs.

## 2. Activity Comparison

Counts reflect issues/PRs explicitly referenced in today's digests, not full GitHub totals.

| Project | Issues Referenced | PRs Referenced | Release Status |
|---|---|---|---|
| vLLM | ~13 | ~14 | No release; v0.27 carries critical multi-node stall + startup regressions |
| SGLang | ~15 | ~12 | No release; `--torchao-config` flag removed (breaking) |
| llama.cpp | ~8 | ~13 | **3 builds shipped** (b10369, b10373, b10375) |
| Ollama | ~15 | ~16 | **v0.32.10-rc1** — breaking `repeat_penalty` default change |
| LiteLLM | ~11 (3 closed) | ~15 | No release; security/cost fixes in PRs |
| Unsloth | ~28 | ~14 | No release; ~10 open installer/startup failure issues |

**Read:** Unsloth is burning the most issue volume on Desktop packaging; llam.cpp is the only project delivering regular releases; vLLM/SGLang activity is PR-heavy but release-quiet — a sign of hardening rather than feature shipping.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---|---|---|---|---|---|
| **Kimi-K3** | Furthest ahead: GEMM-RS seq-parallelism (Blackwell), fused MLA RMSNorm, ROCm latent-MoE overlap — all in-flight PRs | gfx950 Triton MLA decode tuning in progress | Text-model PR open (hybrid KDA+MLA) | — | — |
| **DeepSeek-V4(-Flash)** | Startup failure on v0.27; ROCm accuracy fix in progress | MXFP4 KV cache for Hopper (PR); multi-node DSpark deadlocks; 1M-token OOM | — | Model request open (deepseek-v4-flash:0731) | — |
| **Qwen 3.5 / 3.6** | GDN BF16 semantics PR; dynamic spec-decode regression open | XPU fused GDN kernel | Bare-function parsing fix shipped in b10375 | MLX builds slower/unrunnable on M3; Chinese-input garbage on Windows CPU | Groq registry adds Qwen 3.6 27B |
| **Gemma 4 / variants** | Startup failure with TR 5.15; hybrid-SWA prefix-cache collapse | — | — | Repeated `<unused49>` tokens w/ `think=false` | — |
| **New entrants** | Jina Embeddings V5, SigLIP alignment | LLaDA2.2 on Ascend NPU | pocket-tts (TTS), RDNA4 docs | Nemotron-H MLX vision, Muse/Talos launch integrations | Meta Muse Spark 1.2, Parallel AI provider, Bedrock GPT-5.6 @ 1M ctx |

**Who's ahead:** vLLM and SGLang are effectively tied on frontier-model performance work, with vLLM leading on Blackwell kernels and SGLang leading on Hopper KV-cache compression and hardware diversity (Ascend, XPU, CPU AMX). llama.cpp is the fastest releaser but newest to Kimi-K3. Ollama is the only one actively pushing MLX beyond macOS. LiteLLM is the only project where "support" means pricing/cost-map accuracy rather than kernels.

## 4. Performance Frontier

Optimization effort today clusters in five areas:

- **KV cache:** The hottest topic. SGLang's MXFP4 KV cache for DeepSeek-V4 on Hopper (JIT FlashMLA-style split-KV decode) is the most consequential PR in this window. vLLM's KV-cache layout refactor ([#51704]) is in flight; Ollama's MLX KV-connector framework and q4_0 KV garbage-output bug show the same pressure at the local layer.
- **Speculative decoding:** Ollama disabled `repeat_penalty` by default to accelerate spec decode (~7–8% prefill gain on NVFP4 MLX from fused multiply+cast). vLLM reports a catastrophic throughput collapse with Qwen3.5-122B MTP at batch-size thresholds; EAGLE3 on MiniMax-M3 shows 2.1–2.3× decode speedup. SGLang optimized GDN verification to skip redundant QKV split/copy kernels.
- **Distributed serving:** This is the regression hot zone. vLLM has a critical 4-node idle stall; SGLang has DSpark rank-divergence deadlocks, CUDA graph geometry failures, and concurrency=1 launch failures; llama.cpp is building disaggregated prefill workers ([#25675]) and RPC tensor-parallel support. Multi-node reliability is the industry's weakest link today.
- **Quantization:** NVFP4/MXFP4 dominate (SGLang Blackwell NVFP4 MoE NaN regression, vLLM MiniMax-M3 NVFP4 on B200, Ollama NVFP4 MLX). W8A8 scoped enablement on AMD gfx1100 (vLLM) and AutoRound AMX kernels on CPU (SGLang) broaden the hardware matrix.
- **Kernel fusion:** vLLM's fused MLA RMSNorm and GEMM-RS `multimem.ld_reduce` sequence parallelism; SGLang's XPU fused GDN; llama.cpp's SYCL unary-op fusion and transposed-conv-as-GEMM workaround.

## 5. Layer Positioning

| Layer | Projects | Today's Character |
|---|---|---|
| **Multinode serving engines** | vLLM, SGLang | Feature-complete but **stability-limited**: no releases shipped, critical distributed bugs open, most optimizations in unmerged PRs. Safe for single-node; multi-node TP/DSpark requires pinning and testing. |
| **Local runtimes** | llama.cpp, Ollama | llama.cpp is the reliable releaser (3 builds/day); Ollama is the platform play (MLX expansion, launch integrations, OpenAI-compat surface). Both have Blackwell/AMD perf regressions open. |
| **Gateway / control plane** | LiteLLM | Owns cost maps, budgets, routing. Activity is durability/correctness (spend-log requeuing, budget-reservation leaks, Redis cross-talk) plus provider onboarding. No kernel work by design. |
| **Fine-tuning / Desktop tooling** | Unsloth | Training/FT work is quiet; Desktop/Studio packaging consumes the queue. The "local-tools for self-hosted providers" PR ([#8630]) hints at a move toward agent-tool orchestration. |

The pragmatic deployment stack today: **LiteLLM in front, single-node vLLM/SGLang behind, llama.cpp/Ollama for edge/local** — with the understanding that DeepSeek-V4/Kimi-K3 on multi-node DSpark is not yet production-safe in either major serving engine.

## 6. Trend Signals

1. **Distributed serving is the industry bottleneck.** Every engine has an open, unfixed multi-node regression: vLLM's idle stall, SGLang's rank-divergence deadlock, llama.cpp's RPC worker crash. Until these close, multi-node is "not production-safe" — a direct constraint on agent workloads that need large contexts across multiple GPUs.

2. **KV-cache compression is the next frontier, and MXFP4 is the horse.** SGLang's Hopper MXFP4 KV cache is the most significant unmerged PR this window. Ollama's q4_0 KV corruption and vLLM's KV-cache refactor show everyone is chasing the same memory wall.

3. **The "DSpark" pattern is real but fragile.** DSpark appears across vLLM and SGLang issue trackers with distinct failure modes. Adoption is ahead of reliability. If you're building on DSV4/DSpark, budget for debugging infrastructure.

4. **MLX is escaping macOS.** Ollama's registry-to-local capability check explicitly targets Linux/Windows MLX. Apple-silicon-only assumptions are obsolete; watch for MLX as a first-class local runtime tier.

5. **Security is moving from CVEs to operational data-protection.** SGLang hardened SafeUnpickler (CVE-2026-15969); LiteLLM closed a cross-user response-leak in Redis Cluster and still has a token-hash leak in 429 bodies; Ollama fixed blob-hash verification for rogue OCI registries. For gateways and multi-tenant setups, these are the issues to upgrade for.

6. **Cost correctness is a feature.** LiteLLM spent the day fixing budget reservations, spend-log durability, and Azure pricing rows. If you have budgeted keys or multi-provider cost reporting, expect silent misbilling in paths involving Azure GPT-5.6 and Azure router aliases.

**Bottom line for technical decision-makers:** pin versions (llama.cpp b10356+ for Blackwell, tested stable vLLM/SGLang tags, explicit `repeat_penalty` after Ollama 0.32.10), do not trust multi-node DSpark in production, and track the MXFP4 KV-cache and PD-disaggregation unification PRs — they will change both memory economics and transport configuration when they land.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-13

## 1. Today’s Highlights

No new vLLM release landed in the last 24h. The most active areas are stability reports around v0.27 — including a multi-node idle stall ([#51921](https://github.com/vllm-project/vllm/issues/51921)) and DeepSeek-V4-Flash startup failure ([#51758](https://github.com/vllm-project/vllm/issues/51758)) — plus in-flight performance work for Kimi-K3 on Blackwell/ROCm: GEMM-RS sequence parallelism ([#52079](https://github.com/vllm-project/vllm/pull/52079)), fused MLA RMSNorm ([#52080](https://github.com/vllm-project/vllm/pull/52080)), and re-opened dual-stream ROCm hipgraphs ([#52033](https://github.com/vllm-project/vllm/pull/52033)). A CI GPU↔CPU sync checker ([#43107](https://github.com/vllm-project/vllm/pull/43107)) and the KV-cache layout refactor ([#51704](https://github.com/vllm-project/vllm/pull/51704)) also progressed.

## 2. Releases & Breaking Changes

- **No new releases** in the last 24h; no API/config migration notes to report.
- Related in-flight change: the ROCm dual-stream hipgraphs decode PR was reverted via [#52024](https://github.com/vllm-project/vllm/pull/52024) due to a Qwen3.5 CI failure and re-opened as [#52033](https://github.com/vllm-project/vllm/pull/52033) with a fix.

## 3. New Model & Hardware Support

- **Qwen3.5 GDN BF16 semantics** — [PR #51797](https://github.com/vllm-project/vllm/pull/51797) preserves activation-dtype Q/K normalization and beta semantics across fused prefill, speculative decode, and packed decode.
- **Jina Embeddings V5** — [PR #52037](https://github.com/vllm-project/vllm/pull/52037) skips unused output layers for pooling-only encoder/nano variants.
- **SigLIP input alignment** — [PR #51157](https://github.com/vllm-project/vllm/pull/51157) pads SigLIP text prompts to the trained sequence length so text/image embeddings stay aligned.
- **Kimi-K3 on ROCm tracking** — [Issue #50682](https://github.com/vllm-project/vllm/issues/50682) tracks upstream ROCm feature enablement and performance for Kimi-K3.
- **AMD gfx1100 AITER W8A8** — [PR #51598](https://github.com/vllm-project/vllm/pull/51598) enables scoped W8A8/GDN/sampler support on gfx1100 with fail-closed gates.

## 4. Performance & Optimization

- **Kimi-K3 GEMM-RS on Blackwell** — [PR #52079](https://github.com/vllm-project/vllm/pull/52079) adds GEMM-RS sequence parallelism using `multimem.ld_reduce`, supporting arbitrary M values.
- **Kimi-K3 ROCm MLA RMSNorm fusion** — [PR #52080](https://github.com/vllm-project/vllm/pull/52080) collapses `q_a_layernorm` and `kv_a_layernorm` into a single fused RMSNorm launch per MLA layer.
- **Kimi-K3 ROCm latent-MoE overlap** — [PR #51437](https://github.com/vllm-project/vllm/pull/51437) overlaps the shared expert all-reduce with the routed up-projection.
- **Cheaper chunked prefill** — [PR #49171](https://github.com/vllm-project/vllm/pull/49171) skips logits and sampling for unfinished prefill requests in Model Runner V2.
- **ROCm dual-stream decode with hipgraphs** — reverted in [#52024](https://github.com/vllm-project/vllm/pull/52024), re-opened with a Qwen3.5 fix in [#52033](https://github.com/vllm-project/vllm/pull/52033).
- **GPU↔CPU sync detection** — [PR #43107](https://github.com/vllm-project/vllm/pull/43107) adds a `VLLM_GPU_SYNC_CHECK` mechanism to catch implicit syncs on the main CUDA stream.
- **EAGLE-style prefix cache** — [PR #50897](https://github.com/vllm-project/vllm/pull/50897) adds lookahead-aware prefix cache hashing for EAGLE-style draft models.
- **Dynamic speculative decoding regression** — [Issue #49548](https://github.com/vllm-project/vllm/issues/49548) reports catastrophic aggregate-throughput collapse at batch-size thresholds with Qwen3.5-122B MTP.
- **MiniMax-M3-NVFP4 on 8×B200** — [Issue #51494](https://github.com/vllm-project/vllm/issues/51494) shares first post-fix benchmark data, including ~2.1–2.3× decode speedup with EAGLE3.

## 5. Stability & Regressions

Ranked by severity:

- **Critical — v0.27 multi-node idle stall**: [Issue #51921](https://github.com/vllm-project/vllm/issues/51921) — engine permanently stalls after ~1 minute idle on 4-node TP=4 GB10/sm_121; requests never reach the scheduler. No fix PR yet.
- **High — v0.27 DeepSeek-V4-Flash startup failure**: [Issue #51758](https://github.com/vllm-project/vllm/issues/51758) — upgrading from 0.26.0 to 0.27.0 triggers a flash error when running DeepSeek-V4.
- **High — Qwen3.6 code-generation failure**: [Issue #47761](https://github.com/vllm-project/vllm/issues/47761) — v0.23/v0.24 returns `400 Unterminated string starting at` for code-generation workloads.
- **High — Gemma4 startup failure in latest image**: [Issue #51744](https://github.com/vllm-project/vllm/issues/51744) — `vllm/vllm-openai:latest` fails to start Gemma4 with Transformers 5.15.0.
- **High — DeepSeek-V4-Flash + DSpark on SM120**: [Issue #50720](https://github.com/vllm-project/vllm/issues/50720) — FlashInfer sparse MLA decode kernel routing fails on RTX PRO 6000 Blackwell.
- **Medium — Intel Arc Battlemage**: [Issue #48953](https://github.com/vllm-project/vllm/issues/48953) — TP=2 crashes with `zeMemOpenIpcHandle INVALID_ARGUMENT`; related PP=2 instability tracked in [Issue #46072](https://github.com/vllm-project/vllm/issues/46072).
- **Medium — Scheduler deadlock after validation error**: [Issue #42381](https://github.com/vllm-project/vllm/issues/42381) — engine deadlocks when a prompt exceeds `max_model_len` by one token.
- **Medium — Hybrid-SWA prefix cache collapse**: [Issue #48435](https://github.com/vllm-project/vllm/issues/48435) — Gemma-4-31B prefix reuse drops to zero at ~25% pool occupancy in round-robin workloads.
- **Fix in progress — ROCm DeepSeek-V4 accuracy**: [PR #51821](https://github.com/vllm-project/vllm/pull/51821) restores the DeepSeek-V4 input GEMM override point after `amd/DeepSeek-V4-Flash-NVFP4` showed 0.0000 GSM8K accuracy on gfx950.
- **Low — dependency security**: [Issue #51993](https://github.com/vllm-project/vllm/issues/51993) requests a minimum setuptools version bump in `requirements/common.txt`.

## 6. What This Means for Application Developers

- **Be cautious with v0.27 in production**: there are open reports of startup failures and an idle multi-node stall. Pin to a known-good version or test idle/restart behavior before rollout.
- **Validate model outputs after upgrade**: Qwen3.6 code generation, DeepSeek-V4-Flash, and Gemma4 all have open correctness/startup issues in recent versions.
- **For Blackwell/ROCm Kimi-K3 deployments**, the important performance work is still in open PRs, not in a stable release. Expect near-term changes in KV-cache layout ([#51704](https://github.com/vllm-project/vllm/pull/51704)) and speculative decoding.
- **Watch backend-specific hardware issues**: Intel Arc Battlemage TP/PP and ROCm Kimi-K3/DeepSeek paths still have open stability gaps; don’t assume multi-GPU scaling is safe without checking the tracking issues.
- **No stable release landed today** — if you depend on vLLM as a serving gateway, prefer tested stable tags over `latest` until the reported regressions are resolved.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-13

## Today's Highlights
Activity is concentrated on DeepSeek-V4/Kimi-K3 production hardening: a new Blackwell NVFP4 MoE NaN regression, multi-node DSpark deadlocks, and long-context OOMs all surfaced in the last 24h, while MXFP4 KV cache (Hopper) and PD-disaggregation protocol unification continue to advance. No releases shipped; the main breaking change is the removal of the already-broken `--torchao-config` flag ([PR #34304](https://github.com/sgl-project/sglang/pull/34304)). A [CVE-2026-15969](https://github.com/sgl-project/sglang/pull/34370) fix hardens SafeUnpickler, and CI tooling gained cancelled-run reruns plus AMD nightly pruning.

## Releases & Breaking Changes
- **No new releases in the last 24h.**
- **`--torchao-config` removed** ([PR #34304](https://github.com/sgl-project/sglang/pull/34304)): every accepted value has raised `ImportError` since the torchao pin moved to 0.17.0. Flag, `torchao_utils.py`, layered-loading branch, docs, and dependency are deleted — update launch scripts if you were passing it.
- Deprecated `cafile` parameter finally removed ([PR #8462](https://github.com/sgl-project/sglang/pull/8462), closed).

## New Model & Hardware Support
- **Hopper (SM90/H20): MXFP4 KV cache for DeepSeek-V4**, end-to-end codec + memory pool + fused decode attention ([PR #32741](https://github.com/sgl-project/sglang/pull/32741)).
- **Ascend NPU: LLaDA2.2 block-routing MoE + JointThresholdInDel (JTI)**, including prefill/decode graph capture; CUDA retains the existing Triton path ([PR #32280](https://github.com/sgl-project/sglang/pull/32280)).
- **AMD gfx950: Triton MLA decode geometry tuning for Kimi-K3** ([PR #34580](https://github.com/sgl-project/sglang/pull/34580)).
- **XPU: `SGLANG_USE_SGL_XPU` defaults to true** ([PR #34492](https://github.com/sgl-project/sglang/pull/34492)); fused GDN kernel for Qwen3.5 ([PR #33354](https://github.com/sgl-project/sglang/pull/33354)).
- **CPU: AMX kernels for AutoRound quantization** ([PR #29593](https://github.com/sgl-project/sglang/pull/29593)).
- Apple Silicon roadmap ([#19137](https://github.com/sgl-project/sglang/issues/19137)) and SM120 performance plan ([#19637](https://github.com/sgl-project/sglang/issues/19637)) remain open; Kimi-K3 roadmap tracking at [#32607](https://github.com/sgl-project/sglang/issues/32607).

## Performance & Optimization
- **MXFP4 KV decode for DSV4 on Hopper**: JIT-compiled port of the FlashMLA three-stage split-KV design (scheduler metadata kernel + persistent WGMMA main kernel) ([PR #32741](https://github.com/sgl-project/sglang/pull/32741)).
- **GDN speculative verification avoids QKV materialization** — `causal_conv1d_update` already emits packed QKV, so redundant split/copy kernels are skipped ([PR #33778](https://github.com/sgl-project/sglang/pull/33778)).
- **Cache-DiT on MiniMax-H3 now actually caches** — previously enabled but a no-op (1.00× speedup, byte-identical output with no warning) ([PR #33827](https://github.com/sgl-project/sglang/pull/33827)).
- **CI health**: 3 broken / 11 flaky / 671 recently fixed on `main` ([#17050](https://github.com/sgl-project/sglang/issues/17050)). PR [#34643](https://github.com/sgl-project/sglang/pull/34643) prunes AMD nightlies that burn **466 GPU-h/night** with no results for a week.
- Open question: should TRT-LLM allreduce fusion accumulate in FP32 like the MNNVL backends? ([#34603](https://github.com/sgl-project/sglang/issues/34603)).
- DSV4 perf tracking on SM90/SM10x ([#33636](https://github.com/sgl-project/sglang/issues/33636)) and SM120 optimization plan ([#19637](https://github.com/sgl-project/sglang/issues/19637)) are the active perf roadmaps.

## Stability & Regressions
Ranked by severity; no fix PRs landed for these yet except where noted:

1. **Blackwell NVFP4 MoE NaNs** — `flashinfer_trtllm` online NVFP4 MoE produces non-finite output on SM100/SM103 after upgrading past `0.6.16rc4` (new tile-192 TRTLLM_GEN path); GSM8K scores 0.0 ([#34629](https://github.com/sgl-project/sglang/issues/34629)).
2. **Multi-node TP rank-divergence deadlock** — DSV4 + DSpark on 2× DGX Spark (GB10): one rank wedges in NCCL proxy append (logits all-gather), peer idles at request broadcast ([#33289](https://github.com/sgl-project/sglang/issues/33289)).
3. **Scheduler hang in DSV4 sparse prefill** — sglang 0.5.17, hierarchical cache + 16K chunked prefill on H20; watchdog abort; device-side sampling assert on 0.5.16+PR ([#34235](https://github.com/sgl-project/sglang/issues/34235)).
4. **1M-token prefill CUDA OOM** — DSV4 indexer `fp8_mqa_logits` nonpaged path, `--tp 8` + MegaMoE on 8× B200; same request serves under tp8/dp8 dp-attention ([#34155](https://github.com/sgl-project/sglang/issues/34155)).
5. **DSpark CUDA launch failure** at `concurrency=1` for Kimi-K3 on v0.5.17 ([#34522](https://github.com/sgl-project/sglang/issues/34522)).
6. **DSpark compact ragged CUDA Graph uses incompatible request-slot geometry** for the same token tier ([#34384](https://github.com/sgl-project/sglang/issues/34384)).
7. **ROCm MI355 HiCache broken** — severe performance degradation on realistic agentic workloads ([#34611](https://github.com/sgl-project/sglang/issues/34611)).
8. **Closed**: 3–4 pt eval drop on DeepSeek-V4-Pro between 0.5.12 and 0.5.14 ([#33659](https://github.com/sgl-project/sglang/issues/33659)); inactive CUDA IMA in DP-attention `forward_idle` on GLM-5.1 GB300 ([#27987](https://github.com/sgl-project/sglang/issues/27987)).
9. **Security**: [PR #34370](https://github.com/sgl-project/sglang/pull/34370) hardens `SafeUnpickler` with an exact-name allowlist for generic modules (CVE-2026-15969).

## What This Means for Application Developers
- **DSV4 + DSpark is not production-safe on multi-node TP or at concurrency=1** — expect intermittent deadlocks and CUDA graph geometry failures; single-node, higher-concurrency setups are the safer path pending fixes.
- **Use dp-attention for 1M-token contexts on B200**: plain `--tp 8` MegAMoE dies with OOM in the indexer; `tp8/dp8` serves the same request.
- **Hopper DSV4 deployments should watch for the MXFP4 KV cache PR** — it promises meaningful KV memory savings (FlashMLA-style decode kernel) once merged.
- **Remove `--torchao-config` from any existing launch scripts** — the flag is gone.
- **PD-disaggregation users** (mooncake/nixl/mori) should track the single-protocol-layer RFC ([#33861](https://github.com/sgl-project/sglang/issues/33861)) and its staging issue ([#34510](https://github.com/sgl-project/sglang/issues/34510)) — transport config will change.
- **Multimodal apps** get content-addressed preprocessing cache infrastructure ([PR #34398](https://github.com/sgl-project/sglang/pull/34398)); expect reduced per-request image-processing overhead once it lands.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-13

## Today's Highlights

Three new builds landed: **b10375** tightens bare-function parsing for Qwen tool-calling models ([#26793](https://github.com/ggml-org/llama.cpp/pull/26793)), **b10373** improves imatrix finite checks ([#26861](https://github.com/ggml-org/llama.cpp/pull/26861)), and **b10369** adds pocket-tts support to the multimodal pipeline ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871)). Active PRs continue around disaggregated prefill workers ([#25675](https://github.com/ggml-org/llama.cpp/pull/25675)) and server metrics correctness ([#26920](https://github.com/ggml-org/llama.cpp/pull/26920)). On the stability side, several AMD/ROCm backend issues and a fresh RTX 5080 performance regression report ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918)) remain open.

## Releases & Breaking Changes

- **b10375** — chat: tighten bare function parsing for Qwen models ([#26793](https://github.com/ggml-org/llama.cpp/pull/26793))  
  Release: https://github.com/ggml-org/llama.cpp/releases/tag/b10375
- **b10373** — imatrix.cpp: move finite check and only check touched experts ([#26861](https://github.com/ggml-org/llama.cpp/pull/26861))  
  Release: https://github.com/ggml-org/llama.cpp/releases/tag/b10373
- **b10369** — mtmd: support pocket-tts ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871)); includes grouped transposed-conv workaround via GEMM + col2im  
  Release: https://github.com/ggml-org/llama.cpp/releases/tag/b10369

No explicit API or config migration notes were included in these release notes.

## New Model & Hardware Support

Landed:

- **pocket-tts** in `mtmd` — new text-to-speech model support ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871))
- **RDNA4 documentation** — adds gfx1200/gfx1201 as supported HIP targets ([#26745](https://github.com/ggml-org/llama.cpp/pull/26745))

In progress / open PRs:

- **Kimi-K3 text model** — hybrid KDA + MLA attention, latent MoE, cross-layer residual attention ([#26185](https://github.com/ggml-org/llama.cpp/pull/26185))
- **Longcat-Flash** — MLA + zero-computing experts ([#19182](https://github.com/ggml-org/llama.cpp/pull/19182))
- **OpenVINO backend** — Qwen3.5 dense/MoE support plus GPU memory optimization ([#26952](https://github.com/ggml-org/llama.cpp/pull/26952))
- **OpenCL Adreno xmem SDPA path** for non-causal diffusion attention ([#26331](https://github.com/ggml-org/llama.cpp/pull/26331))

No new quantization formats were mentioned in this batch.

## Performance & Optimization

- **pocket-tts / mtmd**: transposed convolutions built as GEMM + col2im to avoid the missing grouped `conv_transpose_1d` path ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871))
- **SYCL**: proposed fusion of unary ops (silu/sigmoid/softplus) with MUL ([#26411](https://github.com/ggml-org/llama.cpp/pull/26411))
- **RPC**: adds `-sm tensor` support with async graph compute, custom all-reduce, graph UID cache, and tensor 2D ops ([#26610](https://github.com/ggml-org/llama.cpp/pull/26610))
- **NUMA**: `--numa mirror` mirrors weights per NUMA node to eliminate cross-socket traffic ([#16000](https://github.com/ggml-org/llama.cpp/pull/16000))
- **Server metrics**: refactor to reuse task result `stats`/`metrics` and fix counting correctness ([#26920](https://github.com/ggml-org/llama.cpp/pull/26920))

Reported regression numbers to track:

- RTX 5080 / Blackwell: ~40% slower prompt processing and generation between b10356 and b10359+ ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918))
- SYCL on Intel Arc B70: Q8_0 reorder path degrades prefill by ~42% ([#25203](https://github.com/ggml-org/llama.cpp/issues/25203))
- AMD APU DFlash + quantized MoE: ~2x slower than non-speculative baseline ([#25117](https://github.com/ggml-org/llama.cpp/issues/25117))

## Stability & Regressions

Ranked by likely user impact:

1. **RTX 5080 / Blackwell performance regression** — ~40% slower between b10356 and b10359+; no fix PR yet ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918))
2. **Pre-built ROCm Windows binary crashes** with `cudaMemGetInfo failed` on b10373 ([#26963](https://github.com/ggml-org/llama.cpp/issues/26963))
3. **Glimmer Q8_0 + 4x Tesla T10 tensor split** hits `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)` ([#26902](https://github.com/ggml-org/llama.cpp/issues/26902))
4. **ROCm gfx1151 RPC worker crash** in `GGML_OP_TOP_K` during DeepSeek V4 prefill after ~4096 tokens ([#26746](https://github.com/ggml-org/llama.cpp/issues/26746))
5. **KV cache save/restore broken for vision models** via `/slots/...?action=save` ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466))
6. **AMD GPU token substitution corruption on Qwen3.6-27B** — closed; verify against latest builds ([#26754](https://github.com/ggml-org/llama.cpp/issues/26754))
7. **Qwen3.6 tool parsing suffix mismatch** — closed; related tightening landed in b10375 via ([#26793](https://github.com/ggml-org/llama.cpp/pull/26793))

## What This Means for Application Developers

- If you serve **Qwen models with tool calling**, upgrade to **b10375** — the bare-function parsing change directly targets function-call extraction edge cases.
- **Multimodal applications** can now test **pocket-tts** starting from b10369.
- **Vision-model KV cache persistence** remains unreliable on the server; avoid relying on `/slots/...?action=save` for multimodal sessions ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466)).
- If you depend on **`/metrics`**, expect measurement semantics to change with the pending refactor ([#26920](https://github.com/ggml-org/llama.cpp/pull/26920)).
- **Blackwell GPU users** should consider pinning to b10356 until the RTX 5080 regression is identified ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918)).
- Keep an eye on the **disaggregated prefill PR** ([#25675](https://github.com/ggml-org/llama.cpp/pull/25675)) if you run prompt-processing and decode on separate device groups.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-13

## 1. Today's Highlights

v0.32.10-rc1 shipped with a breaking default change: `repeat_penalty` now defaults to 1.0 (off) instead of 1.1, matching other engines and accelerating speculative decoding. On the platform side, Ollama is clearly preparing to bring MLX to Linux/Windows — registry-side download blocks are moving to local capability checks ([#17710](https://github.com/ollama/ollama/pull/17710)), a file-backed MLX KV connector framework was proposed ([#17707](https://github.com/ollama/ollama/pull/17707)), and Nemotron-H vision support landed for MLX ([#17714](https://github.com/ollama/ollama/pull/17714)). Multiple OpenAI-compatibility and thinking/structured-output correctness fixes are also in flight.

## 2. Releases & Breaking Changes

- **v0.32.10-rc1** ([release](https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1)): `repeat_penalty` now defaults to 1.0 (off) rather than 1.1. Models without an explicit per-model parameter no longer get repetition suppression — set one explicitly if older models exhibit repetition. This also speeds up speculative decoding.
- Same release: ~7–8% faster prefill on NVFP4 MLX models with a global scale (double-scale NVFP4), via fused multiply+cast ([PR #17703](https://github.com/ollama/ollama/pull/17703)).
- **Versioning fix**: local builds now report proper semver instead of pre-release tags, preventing upgrade logic from misfiring ([PR #16980](https://github.com/ollama/ollama/pull/16980)).

## 3. New Model & Hardware Support

- **Nemotron-H MLX vision**: [PR #17714](https://github.com/ollama/ollama/pull/17714) implements the RADIO vision encoder and projector on the shared MLX media pipeline (dynamic-resolution preprocessing, placeholder expansion, chunked feature scattering, MTP offsets). Audio remains unsupported.
- **MLX on Linux/Windows**: [PR #17710](https://github.com/ollama/ollama/pull/17710) shifts MLX model availability checks from the registry to the local client, explicitly to support bringing Linux/Windows MLX online. MLX-tagged models can now be pulled anywhere, but the local runtime must be present.
- **MLX KV connector framework**: [PR #17707](https://github.com/ollama/ollama/pull/17707) adds a pluggable KV/prefix-cache connector around MLX restore points, with a file-backed `ExampleConnector` persisting snapshots as safetensors.
- **Launch integrations**: `ollama launch muse` for Meta's Muse Code CLI ([PR #17594](https://github.com/ollama/ollama/pull/17594)) and `ollama launch talos` for the permission-kernel agent ([PR #17589](https://github.com/ollama/ollama/pull/17589)).
- **Model request**: deepseek-v4-flash:0731 for local users ([#17510](https://github.com/ollama/ollama/issues/17510)).

## 4. Performance & Optimization

- Speculative decoding speedup from disabling `repeat_penalty` by default (v0.32.10-rc1).
- NVFP4 MLX prefill: ~7–8% faster on double-scale models ([PR #17703](https://github.com/ollama/ollama/pull/17703)).
- **Open regression**: ~10% generation / ~20% prefill degradation for Q4_K_M on AMD Radeon 780M (Vulkan/Windows) since v0.30.7; Q6_K and Q8_0 unaffected ([#16721](https://github.com/ollama/ollama/issues/16721)).
- **Open bug**: Qwen3.5:35b-mlx significantly slower than the non-MLX build on Mac M3 24GB; Qwen3.6:35b-mlx unrunnable ([#17050](https://github.com/ollama/ollama/issues/17050)).
- Feature request for a "dspark" speculative-decoding option remains open ([#17016](https://github.com/ollama/ollama/issues/17016)).

## 5. Stability & Regressions

Ranked by severity:

1. **Garbage outputs with low KV quantization** — switching KV cache to q4_0 causes repetitive unintelligible token streams; q8_0 works ([#17614](https://github.com/ollama/ollama/issues/17614)). No fix PR yet.
2. **`token repeat limit reached` regression** in `/api/generate` since 0.32.1 ([#17270](https://github.com/ollama/ollama/issues/17270)) — directly relevant to the new `repeat_penalty` default; verify per-model behavior when upgrading to 0.32.10-rc1.
3. **Nemotron3.5-lightning:30b stalls** on AMD AI395+ (Framework Desktop, 128GB) mid-thinking; Ctrl+C required ([#17692](https://github.com/ollama/ollama/issues/17692)).
4. **Qwen2.5-3B emits garbage ASCII for Chinese input** on Windows CPU — tokenizer mis-detection ([#17587](https://github.com/ollama/ollama/issues/17587)).
5. **Gemma 4 emits repeated `<unused49>` tokens** when `think=false` via `/api/chat`, breaking the VS Code extension ([#17459](https://github.com/ollama/ollama/issues/17459)).
6. **Structured outputs + thinking**: `/api/generate` applies the JSON grammar from the first token, leaving thinking-capable models no room to reason ([#17544](https://github.com/ollama/ollama/issues/17544)). Fixes open: defer structured outputs until thinking completes in generate ([PR #17705](https://github.com/ollama/ollama/pull/17705)); keep format grammar across chat restart ([PR #17706](https://github.com/ollama/ollama/pull/17706)).
7. **Raw generate defaults thinking on** — empty replies for SillyTavern-style `raw: true` requests without a `think` field; fix in [PR #17708](https://github.com/ollama/ollama/pull/17708) (open).
8. **Security fix landed**: manifests with config and layer sharing the same digest skipped blob hash verification (SSRF exfiltration from rogue OCI registries) — fixed by [PR #15504](https://github.com/ollama/ollama/pull/15504).
9. **Closed regressions**: model load failure on AMD Vega8 iGPU after 0.24.0 ([#17285](https://github.com/ollama/ollama/issues/17285)); GPU not used with CUDA 12.1 in 0.32.4 ([#17431](https://github.com/ollama/ollama/issues/17431)); `num_ctx` silently halved (`num_ctx/2 + 2`) on gpt-oss:20b ([#17427](https://github.com/ollama/ollama/issues/17427)); CUDA init crash on MX250 / CC 6.1 ([#17138](https://github.com/ollama/ollama/issues/17138)).
10. **ARM build fix**: unsupported ARM CPU variants (armv9.2-a) on toolchains older than GCC 12 are now skipped instead of aborting the build ([PR #17385](https://github.com/ollama/ollama/pull/17385)).
11. **systemd packaging fix**: unit file now installed to the vendor dir so `mask`/`disable` persist across reinstalls ([PR #17363](https://github.com/ollama/ollama/pull/17363)).

## 6. What This Means for Application Developers

- **Set `repeat_penalty` explicitly** if you depend on the old 1.1 default. After 0.32.10, models without an explicit setting get no repetition suppression — outputs will change, though speculative decoding gets faster.
- **Thinking + JSON mode**: if you use `format` with thinking-capable models, upgrade once [PR #17705](https://github.com/ollama/ollama/pull/17705) and [PR #17706](https://github.com/ollama/ollama/pull/17706) land — grammars will be deferred until reasoning completes, fixing degraded or empty responses.
- **Raw completions**: clients posting `raw: true` (e.g., SillyTavern) may receive empty replies today because thinking defaults on; [PR #17708](https://github.com/ollama/ollama/pull/17708) fixes this and should be tracked closely.
- **OpenAI compatibility**: `reasoning_effort="minimal"` is now accepted and mapped to low ([PR #17712](https://github.com/ollama/ollama/pull/17712)); Codex-style web search works in `/v1/responses` ([PR #17686](https://github.com/ollama/ollama/pull/17686)) with graceful limit handling (max 3 searches, then a tool result) in [PR #17709](https://github.com/ollama/ollama/pull/17709).
- **Observability remains a gap**: server-level inference metrics are still missing ([#17694](https://github.com/ollama/ollama/issues/17694)). Poll `/api/ps` and per-request timing until vLLM-style metrics land.
- **MLX distribution change**: with [PR #17710](https://github.com/ollama/ollama/pull/17710), MLX-tagged models can be pulled on any platform but will only run where the MLX runtime exists — detect capability client-side rather than relying on pull-time errors.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-13

## Today's Highlights
Cost-map and provider support dominate: Meta Muse Spark 1.2 pricing ([#36717](https://github.com/BerriAI/litellm/pull/36717)), a full Groq registry sync ([#36664](https://github.com/BerriAI/litellm/pull/36664)), Bedrock GPT-5.6 bumped to a 1M context window ([#36698](https://github.com/BerriAI/litellm/pull/36698)), and Parallel AI added as a chat/responses provider ([#36704](https://github.com/BerriAI/litellm/pull/36704)). Spend-log durability and budget-reservation fixes landed across three PRs ([#36716](https://github.com/BerriAI/litellm/pull/36716), [#34826](https://github.com/BerriAI/litellm/pull/34826), [#36718](https://github.com/BerriAI/litellm/pull/36718)). The most severe report — response leakage/cross-talk between users in Redis Cluster on OpenShift ([#25447](https://github.com/BerriAI/litellm/issues/25447)) — is now closed, though no root-cause PR appears in today's window.

## Releases & Breaking Changes
No new releases or version bumps in the last 24 hours. No API or config migration notes.

## New Model & Hardware Support
- **Meta Muse Spark 1.2** added to the cost map at $1.25/$4.25 per M tokens (input/output), plus the cheaper contributor SKU; `reasoning_effort` is now accepted ([#36717](https://github.com/BerriAI/litellm/pull/36717)).
- **Groq registry sync**: adds Qwen 3.6 27B, both Prompt Guard 2 sizes, and Orpheus models; corrects gpt-oss and Llama context/completion limits; records announced shutdown dates ([#36664](https://github.com/BerriAI/litellm/pull/36664)).
- **Bedrock GPT-5.6 Sol/Terra/Luna**: `max_input_tokens` raised from 272K to 1,000,000 with new `*_above_272k_tokens` input/cache/output pricing rows ([#36698](https://github.com/BerriAI/litellm/pull/36698)).
- **Parallel AI** promoted from search-only to a full chat + responses provider, with hand-built v1 search params (`after_date`, `fetch_policy`, `location`) ([#36704](https://github.com/BerriAI/litellm/pull/36704)).
- **Cohere Embed v4**: multimodal content is now preserved under the provider's `inputs` field instead of being flattened into text ([#36715](https://github.com/BerriAI/litellm/pull/36715)).

## Performance & Optimization
- **Budget reservation leak fixed**: token-counting routes no longer reserve budget. Previously a single `:countTokens` call (even a failed one) leaked a reservation that could brick a budgeted key at $0 spend ([#36718](https://github.com/BerriAI/litellm/pull/36718)).
- **Spend-log durability**: failed DB writes now requeue batches ([#36716](https://github.com/BerriAI/litellm/pull/36716)); rows popped for a cancelled flush are requeued and the queue drains at shutdown ([#34826](https://github.com/BerriAI/litellm/pull/34826)); uncostable batches are retired so they can't starve the cost poll page ([#36714](https://github.com/BerriAI/litellm/pull/36714)).
- **Complexity router calibration**: classifier rubric is now calibrated with worked examples and is selectable per router, so routine engineering traffic stops being routed to the most expensive tier ([#36578](https://github.com/BerriAI/litellm/pull/36578)).
- **Router cleanup**: untagged requests now bypass tagged pre-routing strategies, and marker pseudo-deployments are removed from the selection pool (fixes unmapped-provider 400s) ([#36627](https://github.com/BerriAI/litellm/pull/36627)).

## Stability & Regressions
Ranked by severity:

1. **Response leakage / cross-talk between users** in Redis Cluster on OpenShift — reported as critical, now closed ([#25447](https://github.com/BerriAI/litellm/issues/25447)). No fix PR visible in this window; verify the fix is in your deployed version.
2. **Xiaomi MiMo-V2-Pro/Omni**: `output_config` causes `AsyncCompletions.create()` to fail through Claude Code ([#24549](https://github.com/BerriAI/litellm/issues/24549)) — open, translation-layer bug.
3. **`max_parallel_requests` counter leak**: Redis counter grows monotonically when Anthropic streaming requests are cancelled mid-stream, eventually blocking all requests ([#27955](https://github.com/BerriAI/litellm/issues/27955)) — open.
4. **Blank assistant message** injected after a tool-call assistant message (Deepseek backend via codex) ([#31553](https://github.com/BerriAI/litellm/issues/31553)) — open.
5. **429 error body leaks full SHA-256 token hash** of the offending virtual key ([#27884](https://github.com/BerriAI/litellm/issues/27884)) — security-adjacent, open.
6. **Python 3.13 packaging gap**: litellm 1.96.1 publishes no cp313 wheel/sdist, so `pip install litellm>=1.41.15` resolves to an incompatible build ([#36526](https://github.com/BerriAI/litellm/issues/36526)) — closed.
7. **Azure GPT-5.6 terra/luna cost rows** carry OpenAI's post-cut prices instead of Azure's meters ([#36192](https://github.com/BerriAI/litellm/issues/36192)) — open; wrong billing.
8. **Crash fixed**: `_should_start_new_content_block` no longer accesses `chunk.choices[0]` unconditionally on usage-only chunks ([#36553](https://github.com/BerriAI/litellm/issues/36553)) — closed. Related: Anthropic/Bedrock guardrail SSE streams are now scanned and re-emitted ([#36598](https://github.com/BerriAI/litellm/pull/36598)).
9. **API contract fix**: six proxy routes now return 400 (not 500) for missing required body params ([#35849](https://github.com/BerriAI/litellm/pull/35849)); custom Anthropic base URLs now honor bearer auth ([#33057](https://github.com/BerriAI/litellm/pull/33057)).

Other open items worth watching: `/spend/logs` stores the Azure router alias instead of the served deployment ([#27942](https://github.com/BerriAI/litellm/issues/27942)), Ollama `reasoning_content` is always null for thinker models ([#27956](https://github.com/BerriAI/litellm/issues/27956)), and the `LiteLLM_Config` table can overwrite newly deployed configs ([#12875](https://github.com/BerriAI/litellm/issues/12875)).

## What This Means for Application Developers
- **Multi-replica Redis deployments**: treat the cross-talk fix as a required upgrade — this is exactly the class of bug that is silent and data-corrupting ([#25447](https://github.com/BerriAI/litellm/issues/25447)).
- **Budgeted keys**: deploy the budget-reservation fix before exposing token-counting routes; today a failed Google `:countTokens` call can permanently brick a key at $0 spend ([#36718](https://github.com/BerriAI/litellm/pull/36718)).
- **Python 3.13 users**: pin litellm to a wheel-compatible build until 1.96.2 ships a cp313 artifact ([#36526](https://github.com/BerriAI/litellm/issues/36526)).
- **Anthropic-adapter traffic**: if you rely on `max_parallel_requests` and users cancel streams, the counter can leak and lock your gateway — monitor and be ready to reset Redis counters ([#27955](https://github.com/BerriAI/litellm/issues/27955)).
- **Cost accuracy**: Azure GPT-5.6 Terra/Luna spend is currently mispriced ([#36192](https://github.com/BerriAI/litellm/issues/36192)), and Azure router spend logs may point at the wrong model ([#27942](https://github.com/BerriAI/litellm/issues/27942)). Treat recent cost data for those paths with caution.
- **New models are ready to price**: Muse Spark 1.2, Groq Qwen 3.6 27B, and Bedrock GPT-5.6 at 1M context are all now costable in-registry.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-13

## Today’s Highlights

No new releases landed in the last 24 hours. The main activity is Desktop/Studio hardening: maintainers opened PRs for AMD ROCm/CPU mismatches ([#8620](https://github.com/unslothai/unsloth/pull/8620)), Windows generated-`.exe` launch failures ([#8592](https://github.com/unslothai/unsloth/pull/8592)), macOS llama-server startup ([#8574](https://github.com/unslothai/unsloth/pull/8574)), and the Deep Research freeze ([#8634](https://github.com/unslothai/unsloth/pull/8634), [#8633](https://github.com/unslothai/unsloth/pull/8633)). Several AMD GPU detection regressions remain the largest stability cluster.

## Releases & Breaking Changes

- **No releases in the last 24h.**  
- No API/config migration notes were announced in the issues or PRs covered here. In-flight installer changes in [#8412](https://github.com/unslothai/unsloth/pull/8412) would move Linux CPU to torch 2.11 and add a Vulkan path for AMD without ROCm, but are not merged yet.

## New Model & Hardware Support

- **DeepReinforce Ornith-1.0** was requested as an Unsloth variant/compatibility target ([#6721](https://github.com/unslothai/unsloth/issues/6721)).
- **MiniMax-H3 / MiniMax-M3 GGUF** are currently blocked in Desktop/Studio: `stable-diffusion.cpp` predates MiniMax-H3 ([#8507](https://github.com/unslothai/unsloth/issues/8507)), and MiniMax-M3 GGUF fails with missing indexer keys ([#8513](https://github.com/unslothai/unsloth/issues/8513)).
- **AMD support work in open PRs:**
  - Gate ROCm GPU selection on the build’s architecture coverage to avoid picking an unsupported iGPU/dGPU ([#7670](https://github.com/unslothai/unsloth/pull/7670)).
  - Add Vulkan backend for AMD without ROCm, plus gfx1033 gating and installer fixes ([#8412](https://github.com/unslothai/unsloth/pull/8412)).
  - Validate legacy `sd` binary discovery before treating it as stable-diffusion.cpp ([#8560](https://github.com/unslothai/unsloth/pull/8560)).
  - Report explicitly when PyTorch cannot see the GPU the installer just announced ([#8620](https://github.com/unslothai/unsloth/pull/8620)).

## Performance & Optimization

- **LoRA scan moved off the event loop** in [#8392](https://github.com/unslothai/unsloth/pull/8392) — the model-picker polling route no longer blocks streamed chat tokens.
- **Deep Research streaming re-render work:** [#8634](https://github.com/unslothai/unsloth/pull/8634) stops an entire chat re-render per delta event, and [#8633](https://github.com/unslothai/unsloth/pull/8633) fixes stranded activity frames; both are follow-ups to the freeze in [#8483](https://github.com/unslothai/unsloth/issues/8483).
- **Tokenizer audio detection no longer parses large JSON payloads** for ordinary text models ([#8393](https://github.com/unslothai/unsloth/pull/8393)).
- **GGUF memory estimation fixed:** [#8635](https://github.com/unslothai/unsloth/pull/8635) removes a constant 0.5757 GB offset in remote GGUF buffer reservation, which was also blocking Backend CI.
- **Kaggle save/export handling:** use the large overlay for saves and refuse GGUF exports that cannot fit ([#8439](https://github.com/unslothai/unsloth/pull/8439)).
- **Feature request:** show live prompt-processing speed and generation speed in Studio’s API request view ([#8528](https://github.com/unslothai/unsloth/issues/8528)).

## Stability & Regressions

**High severity**

- **Deep Research freeze** during “Writing The Report” on Gemma-4-26B-A4B ([#8483](https://github.com/unslothai/unsloth/issues/8483)); mitigation PRs [#8634](https://github.com/unslothai/unsloth/pull/8634) and [#8633](https://github.com/unslothai/unsloth/pull/8633).
- **AMD installer/backend mismatch:** Studio reports ROCm but runs CPU-only with no visible GPU ([#8473](https://github.com/unslothai/unsloth/issues/8473)); fix in [#8620](https://github.com/unslothai/unsloth/pull/8620).
- **macOS M4 / Apple Silicon:** llama-server fails to start for local GGUF models, with excessive idle RAM usage ([#8566](https://github.com/unslothai/unsloth/issues/8566)); fix in [#8574](https://github.com/unslothai/unsloth/pull/8574).
- **Windows install blocked by Application Control/AppLocker** on generated `unsloth.exe` ([#8490](https://github.com/unslothai/unsloth/issues/8490)); fix in [#8592](https://github.com/unslothai/unsloth/pull/8592).
- **Linux AppImage missing required libraries** ([#8463](https://github.com/unslothai/unsloth/issues/8463)).
- **AMD GPU detection failures:** RX 5700XT not recognized ([#8529](https://github.com/unslothai/unsloth/issues/8529)), RX 7600 AppImage not recognized ([#8471](https://github.com/unslothai/unsloth/issues/8471)), latest llama.cpp build broke AMD detection ([#7485](https://github.com/unslothai/unsloth/issues/7485)), RDNA3 VRAM usage stops updating ([#7452](https://github.com/unslothai/unsloth/issues/7452)), and Windows AMD install fails ([#8508](https://github.com/unslothai/unsloth/issues/8508)).

**Medium severity**

- Installer/startup failures: macOS install failed ([#8530](https://github.com/unslothai/unsloth/issues/8530)), Windows EDR blocks setup ([#8523](https://github.com/unslothai/unsloth/issues/8523)), second launch of macOS app errors ([#8610](https://github.com/unslothai/unsloth/issues/8610)), Windows install does not finish ([#8546](https://github.com/unslothai/unsloth/issues/8546)), local folder linking broken ([#8416](https://github.com/unslothai/unsloth/issues/8416)).
- Auth/HF token issues: private dataset metadata does not pass the HF token ([#4962](https://github.com/unslothai/unsloth/issues/4962)), Desktop cannot access a Hugging Face repo with the provided token ([#8604](https://github.com/unslothai/unsloth/issues/8604)).
- API/session bugs: context leaks between sessions/model harnesses when using Unsloth as an API backend ([#8442](https://github.com/unslothai/unsloth/issues/8442)); OpenRouter free models return “Insufficient credits” ([#8518](https://github.com/unslothai/unsloth/issues/8518)).
- macOS text encoding errors in Desktop ([#8594](https://github.com/unslothai/unsloth/issues/8594)); Apple M4 Pro shown as 4-MHz instead of GHz ([#8519](https://github.com/unslothai/unsloth/issues/8519)).
- Closed/fix-pending: eager-attention OOM when fine-tuning with datasets ([#3363](https://github.com/unslothai/unsloth/issues/3363)) and tokenizer breakage inside `FastLanguageModel` ([#3624](https://github.com/unslothai/unsloth/issues/3624)).
- RAG embeddings segfault on AMD gfx1100 ([#7331](https://github.com/unslothai/unsloth/issues/7331)) is closed; follow-up containment for first-RAG allocation crashes is in [#8609](https://github.com/unslothai/unsloth/pull/8609).

## What This Means for Application Developers

- **Desktop/Studio reliability is still rolling out through open PRs, not a release.** If you deploy on AMD, Windows with AppLocker/WDAC, or macOS, pin to a known-good version until [#8620](https://github.com/unslothai/unsloth/pull/8620), [#8592](https://github.com/unslothai/unsloth/pull/8592), and [#8574](https://github.com/unslothai/unsloth/pull/8574) land.
- **Server concurrency improvements matter for API workloads:** moving LoRA scans off the event loop ([#8392](https://github.com/unslothai/unsloth/pull/8392)) and reducing Deep Research re-renders ([#8634](https://github.com/unslothai/unsloth/pull/8634)) should reduce token stalls and UI freezes.
- **GGUF compatibility with new model families is fragile right now.** MiniMax-H3/M3 users should validate their bundled llama.cpp/stable-diffusion.cpp versions before relying on Desktop/Studio ([#8507](https://github.com/unslothai/unsloth/issues/8507), [#8513](https://github.com/unslothai/unsloth/issues/8513)).
- **HF auth propagation has known gaps** for private datasets and Desktop downloads ([#4962](https://github.com/unslothai/unsloth/issues/4962), [#8604](https://github.com/unslothai/unsloth/issues/8604)), so pass tokens explicitly and verify gated-repo access.
- **New local-tools support is in flight:** [#8630](https://github.com/unslothai/unsloth/pull/8630) would add Search, Code, MCP tools, and RAG to self-hosted providers (vLLM, Ollama, llama.cpp, OpenAI-compatible). It requires explicit per-connection opt-in, so plan permission and sandboxing ahead of adoption.
- Other notable feature requests: pretraining structure/corpus selection ([#8607](https://github.com/unslothai/unsloth/issues/8607)) and automatic context compaction ([#8504](https://github.com/unslothai/unsloth/issues/8504)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*