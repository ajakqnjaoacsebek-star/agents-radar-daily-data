# AI Infrastructure Digest 2026-08-14

> Generated: 2026-08-14 02:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem
**Date:** 2026-08-14 | **Coverage:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

The inference stack is consolidating around three races simultaneously: **model coverage** (DeepSeek-V4, Kimi-K3, Qwen3.x-class MoE), **quantization breadth** (MXFP4, NVFP4, TQ2_0), and **hardware enablement** (ROCm/MI355X, NPU, Arm). Across all engines, speculative decoding is the most active — and least stable — optimization surface, with open crash and throughput-collapse reports in vLLM, SGLang, and llama.cpp. Agentic workloads are forcing architectural change upward through the stack: KV-cache programmability at the serving layer, tool-calling compatibility at the gateway layer, and context-window-bound generation at the local runtime layer. Meanwhile, AMD/ROCm enablement is advancing quickly but shipping with regressions (VRAM misdetection, HiCache performance), signaling that CUDA still absorbs the most hardening energy.

---

## 2. Activity Comparison

Counts reflect issues/PRs **referenced in the 24-hour digest**, not absolute repository totals.

| Project | Layer | Issues | PRs | Release Status |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~21 | ~17 | No release; v0.27.0 upgrade path flagged risky (3 open failures) |
| **SGLang** | Serving engine | ~17 | ~13 | No release; 3 broken / 11 flaky CI jobs |
| **llama.cpp** | Local runtime | ~17 | ~22 | **13 releases** (b10411–b10423), dense train |
| **Ollama** | Local runtime product | ~10 | ~15 | **v0.32.11** shipped |
| **LiteLLM** | Gateway / control plane | ~11 | ~14 | v1.98.0-dev.2 (dev tag) |
| **Unsloth** | Training/fine-tuning + local | ~18 | ~10 | **v0.1.702-beta** shipped |

llama.cpp is shipping fastest on release cadence; vLLM and SGLang are absorbing higher defect volume in their stabilization windows.

---

## 3. Model Support Race

| Model/Arch | vLLM | SGLang | llama.cpp | Ollama |
|---|---|---|---|---|
| **DeepSeek-V4** | ROCm checklist (#41820); flash error on 0.27.0 (#51758) | Functional roadmap (#23602), NVIDIA perf tracker SM90/SM10x | Metal repetition bug reported (#26694) | — |
| **Kimi-K3** | ROCm roadmap (#50682); GEMM-RS Blackwell kernel (#52079); compact MLA KV (#52239) | Day-0 roadmap (#32607) | Text-model PR open (#26185) | — |
| **Qwen3.5 / 3.6 / 3.8** | Native MTP perf gap (#47277); DSD collapse (#49548); MTP crash (#40756) | AMD grouped-shared-KV EAGLE verification (#34517); H20 fp8 MoE configs (#34795) | OpenVINO Qwen3.5 support | — |
| **GPT-OSS** | MXFP4 storage oracle (#52240); multi-turn HarmonyError (#23567) | — | OpenVINO MoE + MXFP4 (#26952) | — |
| **Gemma 4** | NVFP4 startup crash (#51744) | — | MTP draft crash (#24492); context init failure (#24343) | Vision+tool HTTP 500 closed (#17667) |
| **MiniMax-M3/-H3** | MXFP4 load fix (#51910) | — | — | — (M-H3 video regression in Unsloth) |

**Who's ahead:** vLLM and SGLang are racing on hyperscale MoE bring-up (DeepSeek-V4, Kimi-K3) with ROCm explicitly on the critical path; neither has a completely stable story yet. llama.cpp holds the backend-breadth lead (Metal TQ2_0, OpenVINO MoE/MXFP4, SYCL pinned memory). Ollama is not competing on raw architecture coverage — it differentiates by packaging agent CLIs (Muse Code, DeepSeek Harness) atop its runtime.

---

## 4. Performance Frontier

- **KV-cache architecture is the central battleground.** SGLang has two live RFCs for programmatic KV-cache control and position-independent reuse for agentic/RAG workloads. vLLM is shipping compact MLA layouts for DCP prefill, sparse-index caching (IndexCache for DeepSeek-V4 C4 layers), and a Mooncake encoder-cache connector. Ollama is correcting KV-accounting estimates in scheduler memory planning.
- **Speculative decoding is the highest-risk optimization.** vLLM: DSD "baseline tax" and batch-threshold throughput cliffs, proposed K-schedule context-length axis. SGLang: Mamba+NextN crashes, DSpark geometry mismatch, Qwen3.5 EAGLE grouped-KV verification. llama.cpp: auto-detecting MTP/spec draft types from GGUF metadata to remove config failure modes.
- **Quantization is fragmenting.** MXFP4 layout differs by checkpoint family (MiniMax vs GPT-OSS vs DeepSeek/Kimi) — vLLM is publishing oracle fixes per family. Metal shipped TQ2_0 ternary; OpenVINO gained MXFP4; CUDA has experimental SM120 MoE prefill for MXFP4/NVFP4.
- **Distributed serving is a reliability sink.** vLLM: decode-CP drift, spec+PP wrong outputs, NIXL HMA fail-closed fix. SGLang: DSpark multi-node deadlock, trtllm allreduce fp32-vs-bf16 debate. llama.cpp: RPC null-deref security fix.
- **Kernel-level work concentrates on MoE and FP8.** SGLang's `paged_mqa_metadata` fix (131 idle SMs), ROCm FP8 attention pipelining and per-channel activation fusion; vLLM's Blackwell GEMM-RS sequence-parallel kernel; llama.cpp's SYCL dense-FFN fusion and gated-delta-net writeback fusion.
- **LiteLLM's frontier is different: operational performance** — spend-log cleanup batching, cache-bookkeeping elimination when disabled, jittered Postgres deadlock retries.

---

## 5. Layer Positioning

| Project | Layer | Core function | Key differentiator |
|---|---|---|---|
| **vLLM** | High-scale serving engine | Multi-GPU/multi-node inference, disaggregation, ROCm bring-up | Production hardening at TP/PP/CP scale; Model Runner V2 modernization |
| **SGLang** | High-scale serving engine | Same layer as vLLM | Kernel-level specialization (MQA metadata, FP8 pipelining, DSpark); KV-cache programmability |
| **llama.cpp** | Portable inference runtime | GGUF/ggml execution across every backend | Broadest hardware reach (CUDA, Metal, Vulkan, SYCL, OpenVINO, CPU); fastest release cadence |
| **Ollama** | Local runtime product | Developer UX wrapper + model management | Packaged agent CLIs (`ollama launch`); MLX structured outputs in flight |
| **LiteLLM** | Gateway / control plane | Routing, spend, health, access control across 100+ providers | Shadow eval for chat/messages/responses; ops hardening (spend cleanup, deadlocks, image signing) |
| **Unsloth** | Training / fine-tuning + local desktop | LoRA/GRPO training, export, local serving via Studio/Desktop | Training correctness focus (GRPO LoRA fix); desktop app spans train→serve lifecycle |

The stack is converging on a shared bottom (llama.cpp-style runtimes) and a shared top (OpenAI-compatible APIs), with each project defending a distinct middle: vLLM/SGLang on scale, Ollama on UX, LiteLLM on operations, Unsloth on training-to-serving workflows.

---

## 6. Trend Signals

1. **Speculative decoding is not production-safe at scale.** MTP/DSD/EAGLE crashes span every serving engine. Pin versions, keep `num_spec_tokens` conservative, and expect config schemas to gain a context-length axis (vLLM #48627). This is the pattern to watch for a stability breakthrough in the next 2–3 release cycles.

2. **Agentic workloads are reshaping APIs from both ends.** The gateway layer is fixing agent-client incompatibilities (LiteLLM GPT-5.x `max_tokens` breaking Claude Code probes; SGLang Rust gateway rejecting `tool type: "custom"` for Codex CLI). The serving layer is rearchitecting KV-cache control for prefix reuse and multi-turn agent state (SGLang RFCs #27574/#30928).

3. **Quantization diversity has outrun correctness tooling.** MXFP4/NVFP4/TQ2_0 adoption is broad, but per-family layout differences are causing silent corruption and load failures. Validate outputs after any quantizer or checkpoint-family change; oracle fixes are landing in nightly/master, not stable releases.

4. **AMD/ROCm and NPU are first-class but early.** Every engine has active MI355X/MI325X, Strix Halo, or Ascend work — with regressions (Ollama VRAM misdetection, SGLang HiCache perf, vLLM ROCm MTP throughput lag). Treat AMD/NPU paths as experimental for production; expect fast improvement but pin tested builds.

5. **Agent CLIs are becoming a distribution channel.** Ollama's `launch muse`/`launch dsh` and LiteLLM's shadow-eval coverage for Claude Code indicate that coding-agent compatibility is now a procurement criterion — and a source of false-unavailable reports when probes fail.

6. **Security is moving up the stack.** Fixes this window: LiteLLM Langfuse credential-leak prevention and config fail-closed on bad callbacks; llama.cpp RPC null-pointer dereference. Network-exposed gateway and RPC surfaces are the new attack surface as inference becomes infrastructure.

---

**Bottom line:** The ecosystem is simultaneously converging (OpenAI-compatible APIs, GGUF/quantization formats, ROCm) and fragmenting (spec-decode behavior, KV-cache interfaces, MXFP4 layouts). For production deployments, the safe play is: pin serving-engine versions, disable speculative decoding unless benchmarked, validate per-model quantization layouts, and treat AMD/NPU backends as experimental. The next 30 days will likely settle the spec-decode stability question and clarify KV-cache API direction — both worth tracking via the RFCs and regression issues cited above.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-14

## Today's Highlights

No releases landed in the last 24 hours, but the upgrade path to v0.27.0 is looking risky: three separate reports describe hard failures — a permanent engine stall on 4-node GB10 (aarch64), a DeepSeek V4 flash error after upgrading from 0.26.0, and a startup crash for Gemma4 NVFP4 with Transformers 5.15.0. Speculative decoding remains the most active stability sink, with MTP illegal-memory-access crashes and dynamic speculative decoding (DSD) throughput collapses under investigation. On the enablement side, Model Runner V2 (MRV2) spec-decode and encoder CUDA-graph support are progressing, alongside ROCm trackers for DeepSeek V4 and Kimi-K3.

## Releases & Breaking Changes

No releases in the last 24 hours. Breaking/API changes in flight:

- [#48684](https://github.com/vllm-project/vllm/pull/48684) removes the V0-only `override_attention_dtype` flag — configs still using it will break.
- [#52236](https://github.com/vllm-project/vllm/pull/52236) removes `FireRedLIDForConditionalGeneration` (moved to `_PREVIOUSLY_SUPPORTED_MODELS`); the shared Conformer encoder is kept for FireRedASR2.
- **v0.27.0 upgrade risks** — three independent reports: DeepSeek V4 flash error on 0.26.0 → 0.27.0 ([#51758](https://github.com/vllm-project/vllm/issues/51758)), Gemma4-31B NVFP4 startup failure with Transformers 5.15.0 in `vllm-openai:latest` ([#51744](https://github.com/vllm-project/vllm/issues/51744)), and permanent engine stall after ~1 min idle on 4-node TP=4 GB10/sm_121a ([#51921](https://github.com/vllm-project/vllm/issues/51921), where `shm_broadcast` writer starves and requests never reach the scheduler).

## New Model & Hardware Support

- **Kimi-K3 ROCm roadmap** ([#50682](https://github.com/vllm-project/vllm/issues/50682)): tracks AITER fused-MoE a16w4/a8w4 integration and remaining feature/perf gaps.
- **DeepSeek-V4 on ROCm** ([#41820](https://github.com/vllm-project/vllm/issues/41820)): end-to-end enablement checklist for mHC/HCA/CSA/MoE/MTP blocks on the ROCm backend.
- **MiniMax-M3 MXFP4 (compressed-tensors)** ([#51910](https://github.com/vllm-project/vllm/pull/51910)): fixes a load-time `KeyError` when the vision tower is in the CT `ignore` list (unquantized).
- **GPT-OSS MXFP4 oracle** ([#52240](https://github.com/vllm-project/vllm/pull/52240)): clarifies interleaved `[g0, u0, g1, u1, ...]` vs contiguous `[gate; up]` storage for MoE checkpoints.
- **MRV2 multimodal** ([#49852](https://github.com/vllm-project/vllm/pull/49852)): enables encoder CUDA graphs for Model Runner V2; MRV2 draft-model spec decode also in progress ([#43091](https://github.com/vllm-project/vllm/pull/43091)).
- **FlashInfer startup hardening** ([#52241](https://github.com/vllm-project/vllm/pull/52241)): widens the `flashinfer.comm` import guard beyond `ImportError` so a `TypeError` (seen with 0.6.16.post3 on Py3.11) no longer aborts `EngineCore` startup.
- **Encoder cache over Mooncake** ([#41567](https://github.com/vllm-project/vllm/pull/41567)): new `ECMooncakeConnector` for disaggregated encoder-cache transfer.

## Performance & Optimization

- **Dynamic Speculative Decoding (DSD) regressions being investigated**:
  - [#49986](https://github.com/vllm-project/vllm/issues/49986): all speculative arms pay a "large baseline tax" vs no-spec under production defaults; the `FULL_AND_PIECEWISE → PIECEWISE` CUDA-graph downgrade is one identified culprit.
  - [#49548](https://github.com/vllm-project/vllm/issues/49548): `num_speculative_tokens_per_batch_size` causes catastrophic aggregate-throughput collapse at the batch-size threshold (Qwen3.5-122B MTP k=2); the PIECEWISE downgrade alone costs ~14% single-stream.
  - Proposed fix: extend the K-schedule table with a context-length axis — RFC [#48627](https://github.com/vllm-project/vllm/issues/48627), PR [#48944](https://github.com/vllm-project/vllm/pull/48944).
- **Qwen3.5 native MTP** ([#47277](https://github.com/vllm-project/vllm/issues/47277)): despite 82–88% acceptance, MTP can be slower than a no-MTP CUDA-graph baseline.
- **Kimi-K3**: GEMM-RS kernel for Blackwell sequence parallelism using `multimem.ld_reduce` ([#52079](https://github.com/vllm-project/vllm/pull/52079)); DCP prefill KV now publishes directly in compact MLA layout, removing rank-major gather + Python reorganization ([#52239](https://github.com/vllm-project/vllm/pull/52239)).
- **DeepSeek V4 Hopper**: [#49085](https://github.com/vllm-project/vllm/pull/49085) adds IndexCache for sparse MLA C4 layers, reusing top-k indices across adjacent layers to skip redundant sparse-indexer recomputation.
- **ViT full CUDA graph tracker** ([#38175](https://github.com/vllm-project/vllm/issues/38175)): RFC tracking production ViT CUDA-graph support for Qwen3-VL, GLM-V, Kimi K2.5.
- **Spec-decode async overlap** ([#29134](https://github.com/vllm-project/vllm/issues/29134)): making `seq_lens_cpu` optional to overlap input-prep with forward pass.
- **ROCm tunings lagging**: [#51853](https://github.com/vllm-project/vllm/issues/51853) reports erratic/poor DeepSeek V4 Pro MTP throughput on MI325X (gfx942, TP8).
- **Deterministic trace replay** ([#46701](https://github.com/vllm-project/vllm/pull/46701)): `SamplingParams.trace_decode_token_ids` forces step-by-step predetermined decode IDs while still computing real logprobs — useful for test/benchmark replay.

## Stability & Regressions

Ranked by severity:

1. **v0.27.0 permanent engine stall** ([#51921](https://github.com/vllm-project/vllm/issues/51921)) — GB10 aarch64, 4-node TP=4; requests never reach scheduler after idleness. No fix PR yet.
2. **MTP spec-decode illegal memory access** — two active reports: Qwen3.6-27B-FP8 long sequences ([#40756](https://github.com/vllm-project/vllm/issues/40756), 36 comments) and `cudaErrorIllegalAddress` in `gdn_attn.py:237` under load ([#37035](https://github.com/vllm-project/vllm/issues/37035)).
3. **Decode Context Parallelism drift** ([#41623](https://github.com/vllm-project/vllm/issues/41623)) — gibberish/drift with `--decode-context-parallel-size` in v0.21.0 and nightly.
4. **Spec decode + pipeline parallelism wrong outputs** ([#52071](https://github.com/vllm-project/vllm/issues/52071)) — reproduced at PP 2/4/8 with `--no-async-scheduling`, two spec methods, two model families.
5. **GPT-OSS multi-turn HarmonyError** ([#23567](https://github.com/vllm-project/vllm/issues/23567)) — "unexpected tokens remaining in message header" with gpt-oss-120b across v0.10.x releases; 47 comments, 22 👍, still open.
6. **KV-connector NIXL HMA fail-closed fix** ([#52232](https://github.com/vllm-project/vllm/pull/52232)) — HMA receive errors previously surfaced as successful completion; now fails closed.
7. **Mixed-precision CT draft models** ([#49893](https://github.com/vllm-project/vllm/issues/49893)) — `SpeculativeConfig method="draft_model"` can't load compressed-tensors `config_groups` checkpoints.
8. **Kernel precision parity** ([#52243](https://github.com/vllm-project/vllm/pull/52243)) — `vllm_c fused_add_rms_norm` rounding order fixed to match native IR semantics (fixes #52104).
9. **NIXL version pinning** ([#51777](https://github.com/vllm-project/vllm/pull/51777)) — Docker update to nixl-1.3.2; force-reinstall path bypassed the version pin, causing mismatched backends.
10. **Misc packing fix** ([#52235](https://github.com/vllm-project/vllm/pull/52235)) — packed weight transfer now supports 0-D scalar tensors.

Closed/aging: sleep-level-2 gibberish ([#29341](https://github.com/vllm-project/vllm/issues/29341)), Quark MXFP4 corruption on MI355 ([#41092](https://github.com/vllm-project/vllm/issues/41092)), Ray Serve PD-disaggregation incompatibilities ([#29688](https://github.com/vllm-project/vllm/issues/29688), [#30016](https://github.com/vllm-project/vllm/issues/30016)).

## What This Means for Application Developers

- **Hold off on 0.27.0** if you run DeepSeek V4, Gemma4 NVFP4, or multi-node aarch64 (GB10) — all three configs have open failure reports against 0.26.x/0.27.0. Monitor [#51758](https://github.com/vllm-project/vllm/issues/51758), [#51744](https://github.com/vllm-project/vllm/issues/51744), and [#51921](https://github.com/vllm-project/vllm/issues/51921) before upgrading.
- **Speculative decoding is not production-safe at scale yet**: MTP/DSD paths show illegal-memory crashes, batch-threshold throughput cliffs, and pipeline-parallel interaction bugs. If you enable it, pin versions, keep `num_spec_tokens` conservative, and explicitly benchmark the CUDA-graph downgrade penalty. Configs will likely gain a context-length axis ([#48627](https://github.com/vllm-project/vllm/issues/48627)) — write schedules that are forward-compatible.
- **Quantized-model differences matter**: MXFP4 layout differs by checkpoint family (MiniMax-M3 CT vs GPT-OSS interleaved vs DeepSeek/Kimi contiguous). Validate outputs after swapping quantizer or model; the oracle fixes ([#51910](https://github.com/vllm-project/vllm/pull/51910), [#52240](https://github.com/vllm-project/vllm/pull/52240)) land in nightly/master only.
- **Chat-template correctness**: DeepSeek-V4-Flash inline system messages can render as bare concatenated content (`QLATESYS`); the merge fix in [#47681](https://github.com/vllm-project/vllm/pull/47681) matters if your workload interleaves system turns.
- **Deterministic decode is coming**: `trace_decode_token_ids` ([#46701](https://github.com/vllm-project/vllm/pull/46701)) will enable exact replay for agentic eval harnesses — valuable for CI once merged.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-14

## Today's Highlights
No new releases landed in the last 24 hours; the project remains in a heavy kernel/HW-enablement phase, with active work around DeepSeek-V4, Kimi-K3, Qwen3.x, ROCm/MI355X and NPU backends. KV-cache architecture continues to be a central theme, with two live RFCs targeting agentic/RAG workloads. CI health is stable but not green: the auto-tracker reports **3 broken, 11 flaky, 672 recently fixed** on scheduled `main` tests.

## Releases & Breaking Changes
- **None.** No releases or version-tagged changes were published in the last 24 hours, so no migration notes or breaking API changes are available.

## New Model & Hardware Support
- **DeepSeek-V4 enablement and performance tracking are ongoing.** The functional roadmap covers W4A16 on Hopper, Marlin kernels, and related items; a dedicated NVIDIA perf-tracking issue is now open for SM90/SM10x.  
  [Issue #23602](https://github.com/sgl-project/sglang/issues/23602) · [Issue #33636](https://github.com/sgl-project/sglang/issues/33636)
- **Kimi K3 roadmap** is active, with Day-0 PR, cookbook, and bug-tracking links published.  
  [Issue #32607](https://github.com/sgl-project/sglang/issues/32607)
- **Qwen3.5/Qwen3.8 support work:**
  - Qwen3.5 grouped-head shared-KV verification acceleration on AMD.  
    [PR #34517](https://github.com/sgl-project/sglang/pull/34517)
  - First H20 `fp8_w8a8` tuned MoE configs for Qwen3.8 (`triton_3_7_1`) plus a fix to `Qwen3_5MoeForCausalLM` tuning utils.  
    [PR #34795](https://github.com/sgl-project/sglang/pull/34795) · [PR #34744](https://github.com/sgl-project/sglang/pull/34744)
- **NPU/Ascend:**
  - Gemma-3 sliding-window attention decode fix for NPU.  
    [PR #34557](https://github.com/sgl-project/sglang/pull/34557)
  - NPU streaming session support.  
    [PR #32597](https://github.com/sgl-project/sglang/pull/32597)
  - Ascend Mamba host-transfer paths for HiCache.  
    [PR #32275](https://github.com/sgl-project/sglang/pull/32275)
- **ROCm/MI355X:** New fused kernels target per-channel FP8 attention and remove redundant transpose copies.  
  [PR #34498](https://github.com/sgl-project/sglang/pull/34498) · [PR #34502](https://github.com/sgl-project/sglang/pull/34502)
- **Weight cache:** Static DP/EP layouts are now supported for daemon-backed weight caching, unlocking CUDA IPC mapping for cached MoE shards.  
  [PR #33684](https://github.com/sgl-project/sglang/pull/33684)

## Performance & Optimization
- **`paged_mqa_metadata` kernel optimization (DeepSeek-V4):** Removes a single-block phase where lane 0 serially advanced `q` across per-batch prefix arrays; the old path left 131 SMs idle and was expensive for `bs ≥ 1024`.  
  [PR #25855](https://github.com/sgl-project/sglang/pull/25855)
- **Qwen3.5 EAGLE verification:** Processes query heads through grouped shared KV instead of repeatedly walking the split-KV path; relevant to TP2 with 16 query heads per local KV head.  
  [PR #34517](https://github.com/sgl-project/sglang/pull/34517)
- **ROCm FP8 attention pipelining:**
  - Direct-write a8w8 BMM output to eliminate the `o_proj` transpose copy.  
    [PR #34498](https://github.com/sgl-project/sglang/pull/34498)
  - Fuse per-token FP8 activation quant into RMSNorm for per-channel FP8 projections.  
    [PR #34502](https://github.com/sgl-project/sglang/pull/34502)
- **GLM-5 DSA decode fast path:** Skips the DSA decode indexer when `kv_len <= index_topk` because the top-k already selects all valid positions; adds a dense k-only path.  
  [PR #31324](https://github.com/sgl-project/sglang/pull/31324)
- **Open perf discussion:** Whether the trtllm allreduce fusion should accumulate in fp32 like MNNVL backends, and whether the LM head GEMM should output fp32 instead of bf16.  
  [Issue #34603](https://github.com/sgl-project/sglang/issues/34603) · [Issue #33627](https://github.com/sgl-project/sglang/issues/33627) · [PR #34790](https://github.com/sgl-project/sglang/pull/34790)

## Stability & Regressions
Ranked by severity:

- **Multi-node deadlock / rank divergence (DeepSeek-V4 + DSpark on 2× DGX Spark):** One rank wedges in NCCL proxy append while the peer idles at request broadcast. No fix PR is linked yet.  
  [Issue #33289](https://github.com/sgl-project/sglang/issues/33289)
- **Mamba + NEXTN speculative decoding crash:** `TypeError: 'NoneType' object cannot be interpreted as an integer` in `set_mamba_track_indices_from_reqs()` during `TARGET_VERIFY`. A duplicate was filed and closed. Related WIP enforces Mamba checkpoint depth in the unified radix cache to prevent invalid cache attachment.  
  [Issue #34786](https://github.com/sgl-project/sglang/issues/34786) · [Issue #34787](https://github.com/sgl-project/sglang/issues/34787) · [PR #34780](https://github.com/sgl-project/sglang/pull/34780)
- **DSpark compact ragged CUDA graph geometry mismatch:** Incompatible request-slot geometry is used for the same token tier, causing correctness risk in speculative decoding.  
  [Issue #34384](https://github.com/sgl-project/sglang/issues/34384)
- **ROCm MI355X HiCache regression:** Poor performance on realistic agentic workloads with HiCache enabled.  
  [Issue #34611](https://github.com/sgl-project/sglang/issues/34611)
- **Diffusion CPU-offload regression:** Native-fallback component loading silently drops all CPU-offload decisions, causing fatal OOM on 8 GB GPUs.  
  [Issue #34772](https://github.com/sgl-project/sglang/issues/34772)
- **Rust model gateway protocol mismatch:** The `sgl-model-gateway` router rejects `/v1/responses` requests with tool `type: "custom"`; the openai-protocol crate is out of sync with the Python `protocol.py`. Affects OpenAI Codex CLI compatibility.  
  [Issue #30781](https://github.com/sgl-project/sglang/issues/30781)
- **CI health:** Tracking issue reports 3 broken and 11 flaky scheduled CI jobs.  
  [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)
- **Closed regressions:** The flashinfer_trtllm BF16 MoE illegal-memory-access bug was closed, and the HiCache watchdog-timeout report was closed as inactive.  
  [Issue #26715](https://github.com/sgl-project/sglang/issues/26715) · [Issue #26258](https://github.com/sgl-project/sglang/issues/26258)

## What This Means for Application Developers
- **No new release today:** Pin to the latest published wheel and track the `main` branch if you need deepseek-v4/kimi-k3 fix commits.
- **Agentic/RAG KV-cache APIs are in flux:** Two RFCs are actively proposing programmatic KV-cache control and position-independent KV reuse. If you rely on prefix caching for agents, expect interface changes and new tuning levers.  
  [Issue #27574](https://github.com/sgl-project/sglang/issues/27574) · [Issue #30928](https://github.com/sgl-project/sglang/issues/30928)
- **Multi-node and speculative workloads remain risk areas:** DSpark + DeepSeek-V4 on multi-node TP can deadlock, and hybrid-Mamba + NEXTN is crash-prone. Validate with stress-like OpenAI-compatible traffic before production rollout.
- **Gateway users should avoid `tool type: "custom"`** on `/v1/responses` until the Rust gateway protocol crate is resynced with Python; use standard tool types or route through the Python server.
- **ROCm/NPU enablement is advancing quickly** but is still early: MI355X HiCache and NPU streaming sessions should be treated as experimental for now.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-14

## 1. Today's Highlights
A dense release train (b10411–b10423) landed Metal TQ2_0 ternary quantization, OpenVINO Qwen3.5/gpt-oss MoE + MXFP4 support, and SYCL host-pinned memory for faster H2D transfers. The most operationally relevant items: a CUDA F16 activation-scaling NaN fix for Volta (PR #27016), a server change enabling `/metrics` and `/slots` access during `llama_decode()` (PR #27041), and a Windows ROCm release missing `hipblas.dll` (#26996). The disaggregated prefill/decode roadmap item (#21266) and OpenAI Responses API request (#19138, 40 👍) remain the top open feature threads.

## 2. Releases & Breaking Changes
- **b10423** — CPU parameters (mask/range/strict) now applied consistently across all tools (#27026). If you relied on per-tool divergence in `--cpu-mask` handling, verify your launch scripts.
- **b10419** — OpenVINO: Qwen3.5, gpt-oss MoE, MXFP4, FILL op, set-rows support (#26952).
- **b10418** — SYCL: host pinned memory to reduce Host-to-Device transfer overhead; includes `ggml_backend_sycl_host_buffer_type_get_max_size` and a thread-safety fix (#26789).
- **b10417** — chat: fixed LFM2 tool-call argument-name prefix ambiguity in the streaming PEG parser (#26960).
- **b10416** — **server cache behavior change:** `index.html` is now served with `no-cache` and revalidates via ETag, instead of `max-age=31536000, immutable`. Its name is stable but contents change per build, so the old header pinned clients to stale UIs. If you proxy the server UI, expect per-load revalidation (304) traffic (#27006).
- **b10415 / b10413** — Speculative-decoding draft type is now auto-detected from local GGUF metadata for MTP (`b10415`, #27005) and spec (`b10413`, #26814) models. `--spec-type` no longer required when `-md` loads a local draft.
- **b10414** — Metal: TQ2_0 ternary 2-bit type support, with optimized mul_mv kernel (float ops over int, precomputed `su`) (#26980).
- **b10412** — Backend sampling enabled for both dflash and dspark speculative paths; `p_min > 0` guard added (#26958).
- **b10411** — ggml-cpu: vectorized flash-attention V-cache F16→F32 conversion (#26947).

No breaking API or GGUF format changes.

## 3. New Model & Hardware Support
- **OpenVINO:** Qwen3.5 architecture, gpt-oss MoE, and MXFP4 weight support (#26952).
- **Metal:** TQ2_0 ternary (2-bit) quantization for all applicable models (#26980).
- **CUDA (PR #26704, draft):** experimental SM120 CUTLASS MoE prefill for MXFP4 (GPT-OSS fused W13) and NVFP4 (Qwen3.6-35B-A3B), disabled by default.
- **PR #21412 (open):** Zamba2 architecture support.
- **PR #26185 (open):** Kimi-K3 text model — hybrid KDA/MLA attention with cross-layer residual attention, latent MoE, and situ activation.

## 4. Performance & Optimization
- **SYCL host pinned memory (b10418)** targets the H2D transfer bottleneck; includes a max-buffer-size query and thread-safety fix (#26789).
- **SYCL dense-FFN fusion (PR #26779):** merges `mul_mat(gate)` + `mul_mat(up)` + GLU into a single q4_K reorder mat-vec for dense FFNs. Measured on Arc Pro B70 (`llama-bench -r 20`, tg128, qwen2.5-3B).
- **SYCL gated-delta-net writeback fusion (PR #26643):** port of #23940. Qwen 3.6 27B Q4_K (48/64 gated_delta_net blocks), `-ngl 99 -fa 1 -ctk f16 -ctv f16 -b 2048 -ub 2048`: **tg128 = 23.91 t/s**.
- **CPU:** FA V-cache F16→F32 conversion vectorized (b10411); a draft PR (#27032) collects further prefill/tokenization/token-generation CPU experiments for splitting into focused PRs.
- **Jinja:** quadratic `gather_string_parts` cost fixed in PR #27034 (fixes #26974) — relevant for long multi-turn template rendering.

## 5. Stability & Regressions
Ranked by severity:

1. **[Release packaging]** Windows ROCm 7.14 asset `llama-b10400-bin-win-rocm-7.14-x64.zip` is missing `hipblas.dll`; GPU undetected, `--list-devices` empty (#26996).
2. **[Correctness, SYCL]** Garbage output on the second prompt, recurring on Intel Arc Pro B60 with oneAPI 2026.1 (#26845). Same symptom class as closed #21589 — treat SYCL multi-turn as unverified.
3. **[Correctness, Metal]** DeepSeek-V4-Flash degenerates into repetition and leaks special tokens in long agentic chats (M3 Ultra, b10289) (#26694).
4. **[Crash, Vulkan]** `vk::DeviceLostError` within a few turns on DeepSeek-V4-Flash, Strix Halo (RADV) (#25664); related closed issue on AMD APU gfx90c batch-size timeout (#21724).
5. **[Crash, Vulkan]** Gemma 4 31B MTP draft: "pre-allocated tensor cannot run operation NONE" on RX 7900 XTX (#24492).
6. **[Init failure]** `Gemma4Assistant` fails context initialization (32 👍) (#24343).
7. **[Security, RPC]** Unauthenticated NULL-pointer dereference in `rpc_server::graph_compute()` via node id 0 (#25299).
8. **[Vision]** KV cache save via `/slots/{id}?action=save` fails for vision models (#19466); Qwen3-VL image embeddings broken on Vulkan (#25088).
9. **[Perf regression, Vulkan]** Reported throughput drop on RX 6600 in recent builds (#24066).

Fix PRs in flight:
- **PR #27016** — CUDA F16 activation-scaling NaN on Volta/sm_70, observed at 64-token input on V100s (fixes #26044).
- **PR #27042** — Hexagon `FLASH_ATTN_EXT` non-determinism: FA HMX queue ordering + rescale D matrix packing (fixes #26759).
- **PR #26294** — CUDA `mul_mat_id` duplicate expert-id compaction kernel miscount (fixes #24591).
- **PR #26434** — OpenCL flash-attention tile kernels: missing barrier before K/V tile reload → WAR race.
- **PR #27044** — CUDA MMQ ids-path tail padding sized from `ne11` instead of flattened row count; affects MoE gate/up projection allocation.
- **PR #27041** — Server: allow `/metrics` and `/slots` during `llama_decode()` via worker-thread yield (fixes #24866).

## 6. What This Means for Application Developers
- **Speculative decoding ops get simpler:** MTP/spec draft type auto-detection from local GGUF metadata (b10413/b10415) removes a config flag and a common failure mode when deploying local draft models alongside `-md`.
- **Web UI embedding:** with b10416, `index.html` revalidates on every load — expect ETag/304 requests and ensure your proxy honors revalidation instead of serving a long-lived cached copy.
- **Observability:** once PR #27041 merges, `/metrics` and `/slots` will be scrapable during decode — a real improvement for autoscaling and per-request monitoring. Until then, decode blocks those endpoints.
- **Tool-call reliability:** the LFM2 fix (#26960) addresses streaming-parser mis-commits when argument names are literal prefixes of each other (`password` vs `password_file`). Audit other models with prefix-ambiguous JSON schemas for the same failure class.
- **Risk guidance:** SYCL second-prompt garbage and Vulkan device-loss issues remain unresolved across Intel/AMD platforms — pin builds and run multi-turn soak tests before rolling out on those backends. Watch the Windows ROCm `hipblas.dll` packaging issue if you distribute or consume win-rocm assets. Vision-model KV-cache persistence (#19466) is still broken if you rely on slot save/restore for multimodal workloads.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama Digest — 2026-08-14

### 1. Today's Highlights
Ollama shipped v0.32.11 with two new first‑party Launch integrations: **Meta's Muse Code** and the **DeepSeek Harness**. On the engine side, the MLX runner is finally getting real structured‑output support (JSON Schema/grammar) through multiple PRs, and an open fix targets the AMD Strix Halo VRAM‑detection regression that has plagued container users since v0.30.

### 2. Releases & Breaking Changes
- **v0.32.11** released — no breaking changes reported.
  - Adds `ollama launch muse` for Meta's Muse Code CLI ([PR #17594](https://github.com/ollama/ollama/pull/17594))
  - Adds `ollama launch dsh` for DeepSeek Harness ([PR #17733](https://github.com/ollama/ollama/pull/17733))
  - Updates Muse Glimmer reasoning template to match the publisher's reference ([PR #17732](https://github.com/ollama/ollama/pull/17732))

### 3. New Model & Hardware Support
- **Muse Code and DeepSeek Harness** launch integrations are now available in v0.32.11 ([PR #17594](https://github.com/ollama/ollama/pull/17594), [PR #17733](https://github.com/ollama/ollama/pull/17733))
- **nemotron_h MLX vision support** is in progress, adding the RADIO vision encoder/projector with dynamic‑resolution and MTP offsets ([PR #17714](https://github.com/ollama/ollama/pull/17714))
- **AMD Strix Halo (gfx1151) GPU memory detection** fix is open, addressing `hipMemGetInfo()` returning system RAM instead of VRAM ([PR #17685](https://github.com/ollama/ollama/pull/17685))
- **Windows‑on‑Arm CPU build** would enable native dot‑product/matrix instructions instead of baseline armv8‑a ([PR #17654](https://github.com/ollama/ollama/pull/17654))
- **MLX quantization metadata** preservation for prequantized imports avoids producing unloadable models ([PR #17731](https://github.com/ollama/ollama/pull/17731))

### 4. Performance & Optimization
- **Explicit flash attention** for architectures that default to it (e.g., gpt‑oss) prevents long‑context crashes and enables the intended attention path ([PR #17477](https://github.com/ollama/ollama/pull/17477))
- **MLX open‑ended generation** now bounded by the request context window instead of the checkpoint's `max_position_embeddings` — fixes hangs on large models ([PR #17494](https://github.com/ollama/ollama/pull/17494))
- **KV cache accounting corrected** in `PredictServerVRAM` to mirror GraphSize, improving scheduler memory estimates ([PR #17615](https://github.com/ollama/ollama/pull/17615))
- **Centralized backend load planning** consolidates memory‑policy decisions across scheduler, options, and runner startup ([PR #17165](https://github.com/ollama/ollama/pull/17165))
- **Windows‑on‑Arm** would gain significant CPU inference speedups by compiling for ARMv8.2+ dotprod/i8mm ([PR #17654](https://github.com/ollama/ollama/pull/17654))
- **System sleep inhibition** during inference prevents OS suspension from interrupting long generations ([PR #16453](https://github.com/ollama/ollama/pull/16453))

### 5. Stability & Regressions
Ranked by severity:

- **AMD Strix Halo VRAM detection regression** (containers, v0.30+): only 2GB of VRAM is seen on systems with unified memory — likely OOM failures. Fix PR open ([Issue #16462](https://github.com/ollama/ollama/issues/16462), [PR #17685](https://github.com/ollama/ollama/pull/17685))
- **MLX structured outputs silently ignored**: JSON schema/format requests return 200 with unconstrained output. Multiple fix PRs landed/are in flight ([Issue #16563](https://github.com/ollama/ollama/issues/16563), [PR #17232](https://github.com/ollama/ollama/pull/17232), [PR #17690](https://github.com/ollama/ollama/pull/17690), [PR #17697](https://github.com/ollama/ollama/pull/17697))
- **CPU spin loop / 100% core near context limit**: Ollama becomes unresponsive after repeated truncated requests ([Issue #13461](https://github.com/ollama/ollama/issues/13461))
- **Nemotron3.5‑lightning:30b stalling** on AMD AI395+ during thinking; CTRL+C required ([Issue #17692](https://github.com/ollama/ollama/issues/17692))
- **llama3.3:70b token failures** after v0.32.2 — model generates junk tokens ([Issue #17379](https://github.com/ollama/ollama/issues/17379))
- **Claude Code no response** with `qwen3-coder:30b` despite successful generation ([Issue #17671](https://github.com/ollama/ollama/issues/17671))
- **`/api/chat` silently drops audio** on audio‑capable models like `gemma4:e4b` ([Issue #17730](https://github.com/ollama/ollama/issues/17730))
- **`/save` fails** for `nemotron_h_moe` models with "pull model manifest: file does not exist" ([Issue #17735](https://github.com/ollama/ollama/issues/17735))
- **Closed/Resolved**: Muse Glimmer MLX token leaking/`response_format` issue has been fixed via the reasoning‑template update in v0.32.11 ([Issue #17684](https://github.com/ollama/ollama/issues/17684)); Gemma 4 Cloud vision+tool HTTP 500 is closed ([Issue #17667](https://github.com/ollama/ollama/issues/17667))

### 6. What This Means for Application Developers
- **Agent CLI integrations are expanding**: `ollama launch` now supports Muse Code and DeepSeek Harness, making it easier to wire local/cloud Ollama models into coding agents.
- **MLX structured outputs are almost here**: If you've been getting unvalidated JSON from MLX models, expect grammar/JSON Schema enforcement to land soon — you can finally rely on `response_format` on Apple Silicon.
- **Beware AMD Strix Halo in containers**: Until the VRAM fix merges, consider pinning Ollama `<0.30` or monitor free memory carefully when deploying on Ryzen AI MAX systems.
- **Cloud model metadata is incomplete**: `/v1/models` may not list all available cloud models, and Claude Code doesn't yet recognize some cloud models' context windows — check documentation before relying on auto‑visibility.
- **Audio and multimodal edge cases remain**: The silent audio drop and vision/tool failures highlight that multimodal paths are still maturing; test your exact request shape before production use.

*Sources: [ollama/ollama releases](https://github.com/ollama/ollama/releases), [issues](https://github.com/ollama/ollama/issues), [pull requests](https://github.com/ollama/ollama/pulls)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-14

## Today's Highlights
- GPT-5.x `max_tokens` handling is being fixed on both Azure and OpenAI/Anthropic paths, preventing Claude Code `/model` probes from misreporting healthy models as unavailable ([#36857](https://github.com/BerriAI/litellm/pull/36857), [#36859](https://github.com/BerriAI/litellm/pull/36859), [#35063](https://github.com/BerriAI/litellm/pull/35063)).
- Shadow eval is expanding from `/v1/chat/completions` to `/v1/messages` and `/v1/responses`, plus new reverse-direction jobs to detect router regressions after adoption ([#36830](https://github.com/BerriAI/litellm/pull/36830), [#36865](https://github.com/BerriAI/litellm/pull/36865)).
- Ops hardening landed around caching overhead, spend-log cleanup, Postgres deadlock retries, Langfuse trace security, and access-group synchronization.

## Releases & Breaking Changes
- [v1.98.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.98.0-dev.2) is the latest dev tag. Release notes are limited to Docker image signing: all images are cosign-signed with the key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). No consumer-affecting API/config changes were called out in this release.

## New Model & Hardware Support
- [PR #36788](https://github.com/BerriAI/litellm/pull/36788) refreshes `model_prices_and_context_window.json`: adds `xai/grok-4.6`, `xai/grok-4.6-latest`, and `gemini/gemini-3.1-flash-tts-preview`, and corrects several deprecation dates including `gemini-embedding-001`.
- No new hardware backend, quantization format, or architecture support was announced in this window.

## Performance & Optimization
- [PR #36594](https://github.com/BerriAI/litellm/pull/36594) bounds spend-log retention cleanup so a single run cannot delete hundreds of thousands of rows per table, hold row locks indefinitely, or saturate the database. Cleanup batch size/run length become dashboard-configurable, and cleanup cost is reported.
- [PR #35438](https://github.com/BerriAI/litellm/pull/35438) removes cache bookkeeping overhead when caching is disabled, including skipping `convert_args_to_kwargs` signature inspection and memoizing parameter-name lookup on the sync completion path.
- [PR #34887](https://github.com/BerriAI/litellm/pull/34887) classifies Postgres deadlocks (`P2034` / `40P01`) as retry-safe and routes all spend-update paths through jittered retry logic so concurrent spend increments are not silently dropped.
- [PR #36714](https://github.com/BerriAI/litellm/pull/36714) fixes uncostable batches from holding cost-poll slots forever; terminal rows are retired when no model id exists or the provider 404s.

## Stability & Regressions
- **High — Azure `gpt-5-chat` deployments 400 on every `max_tokens` request**, and `/health` reports them unhealthy. Fix: [PR #36857](https://github.com/BerriAI/litellm/pull/36857) extends `max_tokens` → `max_completion_tokens` renaming to the `gpt-5-chat` family.
- **High — GPT-5.x output-limit 400s on tiny `max_tokens`** cause Claude Code’s probe to mark models unavailable. Fixes: [PR #35063](https://github.com/BerriAI/litellm/pull/35063) maps Anthropic-path 400s to `stop_reason="max_tokens"`; [PR #36859](https://github.com/BerriAI/litellm/pull/36859) returns a length-truncated 200 on OpenAI/Azure when the output budget fits no token.
- **Medium — Azure Responses forwards empty namespace descriptions** from `additional_tools`, triggered by Codex CLI defaults ([#36366](https://github.com/BerriAI/litellm/issues/36366)).
- **Medium — SpendLogs `end_user` regression in v1.87.0**: a shared virtual key pins `end_user` to the first request’s `user` for all subsequent requests ([#31441](https://github.com/BerriAI/litellm/issues/31441)).
- **Medium — `org_admin` users receive 401 on `POST /team/update`** despite authorized membership ([#27294](https://github.com/BerriAI/litellm/issues/27294)).
- **Medium — `/metrics` cannot be configured for unauthenticated access** after upgrading to 1.84.0 ([#27926](https://github.com/BerriAI/litellm/issues/27926)).
- **Medium — JWT RBAC `role_permissions.models` does not honor wildcards** like `bedrock-claude-*` ([#27536](https://github.com/BerriAI/litellm/issues/27536)).
- **Medium — Tag budgets never reset**: `ResetBudgetJob` advances `budget_reset_at` but leaves `LiteLLM_TagTable.spend` untouched, permanently blocking over-budget tags ([#27481](https://github.com/BerriAI/litellm/issues/27481)).
- **Medium — Enterprise Control Plane MCP server management broken**: MCP routes are misclassified as LLM API routes ([#27461](https://github.com/BerriAI/litellm/issues/27461)).
- **Also closed this window**: Python 3.14 `uvloop` startup failure ([#20933](https://github.com/BerriAI/litellm/issues/20933)), Anthropic-native `/v1/models` response for Claude Code discovery ([#27180](https://github.com/BerriAI/litellm/issues/27180)), duplicate `vllm` provider display in the dashboard ([#27384](https://github.com/BerriAI/litellm/issues/27384)), and missing Arize Phoenix callback spans ([#27388](https://github.com/BerriAI/litellm/issues/27388)).

## What This Means for Application Developers
- **If you serve GPT-5.x via Azure or behind Claude Code, prioritize upgrading** to builds containing [#36857](https://github.com/BerriAI/litellm/pull/36857), [#36859](https://github.com/BerriAI/litellm/pull/36859), and [#35063](https://github.com/BerriAI/litellm/pull/35063). Otherwise health checks and client probes can falsely report unavailable models.
- **Shadow eval now covers Claude Code and Responses API surfaces**, not just chat completions ([#36830](https://github.com/BerriAI/litellm/pull/36830)); reverse-direction jobs also measure post-adoption router quality ([#36865](https://github.com/BerriAI/litellm/pull/36865)). This is useful if you are deciding whether a key should permanently move to a LiteLLM router.
- **Access-group assignments are now correctly synced** from key/team create, update, regenerate, and delete paths ([#36843](https://github.com/BerriAI/litellm/pull/36843), [#36825](https://github.com/BerriAI/litellm/pull/36825)) — upgrade if you observed delayed or stale access-group grants.
- **Two security-relevant fixes landed**: Langfuse `update_trace_keys` is restricted to real trace fields, preventing credential leakage via arbitrary metadata ([#36862](https://github.com/BerriAI/litellm/pull/36862)); config load now fails if a `callbacks` entry can’t be dispatched instead of silently ignoring it ([#36858](https://github.com/BerriAI/litellm/pull/36858)).
- **For high-throughput deployments**, disable caching if unused to avoid the fixed bookkeeping overhead ([#35438](https://github.com/BerriAI/litellm/pull/35438)), and expect safer spend-write behavior under Postgres concurrency with [#34887](https://github.com/BerriAI/litellm/pull/34887).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-14

## 1. Today's Highlights

Unsloth shipped **v0.1.702-beta**, headlined by **Unsloth Desktop** — a cross-platform Windows/macOS/Linux app for running, training, exporting and deploying local AI models — plus added tool-calling/web-search support for all external providers. On the engineering side, the most important correctness item is an open PR fixing silent LoRA-ignoring rollouts in GRPO with `fast_inference=True`, and Studio landed several observability and performance PRs targeting log blindness and CPU saturation. Community reports remain concentrated on Windows installer failures, macOS M4 `llama-server` startup, and AMD ROCm device recognition/offload issues.

## 2. Releases & Breaking Changes

- **v0.1.702-beta** — [Unsloth Desktop](https://unsloth.ai/) is now available: local training, inference, export and deployment from one desktop app on Windows/macOS/Linux.
- Added **tool calling / web search and more for all external providers** in v0.1.702-beta.
- No explicit breaking changes or migration notes were listed in the release data.

## 3. New Model & Hardware Support

- No new model architectures were officially announced in the last 24h.
- Main capability addition: external-provider tool calling/web search in v0.1.702-beta.
- Still open feature requests:
  - DeepReinforce Ornith-1.0 support / Unsloth variants — [#6721](https://github.com/unslothai/unsloth/issues/6721)
  - MLX pretraining structure support — [#8607](https://github.com/unslothai/unsloth/issues/8607)
- Hardware-related issues on existing backends:
  - RX 5700 XT not recognized in Unsloth Desktop — [#8529](https://github.com/unslothai/unsloth/issues/8529)
  - Strix Halo / Radeon 8060S: `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` prevents GPU offload — [#8651](https://github.com/unslothai/unsloth/issues/8651)
  - macOS M4: `llama-server` fails to start with excessive idle RAM usage — [#8566](https://github.com/unslothai/unsloth/issues/8566)

## 4. Performance & Optimization

- **Studio CPU saturation fix** — [PR #8750](https://github.com/unslothai/unsloth/pull/8750) fixes renderer CPU saturation on long streaming replies by removing unnecessary animation DOM and making Markdown parsing incremental.
- **Live prompt/generation speed telemetry** — [PR #8700](https://github.com/unslothai/unsloth/pull/8700) surfaces live prompt-processing and generation throughput while a request is running, implementing [#8528](https://github.com/unslothai/unsloth/issues/8528).
- **Log volume reduction** — [PR #8763](https://github.com/unslothai/unsloth/pull/8763) quiets liveness polling and keeps access lines out of `tauri.log`. Measured: an idle 4h session produced 5,308 lines / 1.14 MB, with 76% from access records and 63% from six polling endpoints.
- **Kaggle storage/export fix** — [PR #8439](https://github.com/unslothai/unsloth/pull/8439) uses Kaggle's large overlay for saves and refuses a GGUF export that cannot fit.

## 5. Stability & Regressions

Ranked by severity:

- **Training correctness — GRPO silently ignores LoRA**  
  [PR #8701](https://github.com/unslothai/unsloth/pull/8701) fixes a serious bug where TRL 1.10.0 GRPO with `fast_inference=True` samples rollouts from the **base model**, ignoring the LoRA adapter with no error raised. Anyone doing GRPO should track this PR closely.

- **Windows install failures**  
  - [Issue #8698](https://github.com/unslothai/unsloth/issues/8698) — install killed by the 2-hour cap while downloading cu126 PyTorch, with no progress output.
  - [Issue #8546](https://github.com/unslothai/unsloth/issues/8546) — installation process does not complete successfully.
  - [Issue #8523](https://github.com/unslothai/unsloth/issues/8523) — Windows Setup blocked by EDR during install.
  - [Issue #8490](https://github.com/unslothai/unsloth/issues/8490) — Application Control policy blocks `unsloth.exe` at the "Running studio setup" step (closed).

- **macOS Desktop**  
  - [Issue #8566](https://github.com/unslothai/unsloth/issues/8566) — M4: `llama-server` fails to start when loading local GGUF models; excessive idle RAM usage.
  - [Issue #8610](https://github.com/unslothai/unsloth/issues/8610) — error on second launch of the macOS app.

- **AMD/ROCm**  
  - [Issue #8529](https://github.com/unslothai/unsloth/issues/8529) — RX 5700 XT is not recognized in Unsloth Desktop.
  - [Issue #8651](https://github.com/unslothai/unsloth/issues/8651) — `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` prevents GPU offload on Strix Halo/Radeon 8060S (closed).
  - [Issue #7624](https://github.com/unslothai/unsloth/issues/7624) — multi-GPU auto-selection on ROCm picks iGPU over dGPU by free-memory heuristic (closed).

- **API/model-server correctness**  
  - [Issue #8734](https://github.com/unslothai/unsloth/issues/8734) — tool calling poisons the chat history.
  - [Issue #8748](https://github.com/unslothai/unsloth/issues/8748) — installed MLX models are missing from `/v1/models` and cannot be loaded by API model auto-switch.
  - [Issue #8717](https://github.com/unslothai/unsloth/issues/8717) — saving a trained model to GGUF now requires a 16-bit intermediate download.
  - [Issue #8733](https://github.com/unslothai/unsloth/issues/8733) — raw JSONL is not exported as real JSONL (closed).

- **Multimodal regressions**  
  - [Issue #8666](https://github.com/unslothai/unsloth/issues/8666) — MiniMax-H3 video generation fails with `sd-cli exited -6`.
  - [Issue #8507](https://github.com/unslothai/unsloth/issues/8507) — `stable-diffusion.cpp` build predates MiniMax-H3 support (closed).

- **Observability improvements for debugging the above**  
  - [PR #8690](https://github.com/unslothai/unsloth/pull/8690) — read logs from inside the app in Settings > Debugging.
  - [PR #8764](https://github.com/unslothai/unsloth/pull/8764) — give each training run its own log file.
  - [PR #8761](https://github.com/unslothai/unsloth/pull/8761) — collect the backend session log in support reports.

## 6. What This Means for Application Developers

- If you use Unsloth's `fast_inference` GRPO path, verify which model is actually producing rollouts and track [PR #8701](https://github.com/unslothai/unsloth/pull/8701). The current TRL 1.10.0 behavior can silently train the base model instead of the LoRA adapter.
- Unsloth Desktop/Studio is maturing as a local inference gateway: expect live token-speed telemetry ([PR #8700](https://github.com/unslothai/unsloth/pull/8700)), per-model chat parameters ([PR #8757](https://github.com/unslothai/unsloth/pull/8757)), and full `llama-server` flag passthrough ([PR #8702](https://github.com/unslothai/unsloth/pull/8702)).
- Agent developers should note that tool calling is expanding to external providers in v0.1.702-beta, but chat-history poisoning ([#8734](https://github.com/unslothai/unsloth/issues/8734)) and provider auth compatibility remain areas to watch.
- The new log support ([PR #8690](https://github.com/unslothai/unsloth/pull/8690), [PR #8761](https://github.com/unslothai/unsloth/pull/8761), [PR #8764](https://github.com/unslothai/unsloth/pull/8764)) should make native backend crashes on Windows/AMD/macOS far more diagnosable — include these logs in support tickets.
- If you build on Studio's API, note the gap: programmatic audio/image/video generation is not yet available ([#8752](https://github.com/unslothai/unsloth/issues/8752)), and the local API still defaults to `127.0.0.1` unless exposed via Cloudflare tunnel ([#8578](https://github.com/unslothai/unsloth/issues/8578)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*