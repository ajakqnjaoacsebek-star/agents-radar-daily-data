# AI Infrastructure Digest 2026-08-11

> Generated: 2026-08-11 07:02 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-08-11

## 1. Ecosystem Overview

The ecosystem is in a "ship then stabilize" cycle: three major open-weight model families — Kimi K3, DeepSeek-V4, and Muse Glimmer — landed within days of each other, and every project in this digest is absorbing the fallout. Datacenter serving frameworks (vLLM, SGLang) are consumed with CUDA-graph reliability and KV-cache memory efficiency for large MoE/reasoning models, while local runtimes (llama.cpp, Ollama, Unsloth) are racing to cover new architectures and quant formats. LiteLLM, the only pure gateway in the set, is attacking Python performance ceilings with a Rust rewrite. The common thread across all six projects is reliability: speculative-decoding determinism, CUDA-graph replay stability, and quantization-path correctness dominate the issue trackers.

## 2. Activity Comparison

Counts below reflect issues/PRs explicitly cited in the daily digests, not full-project totals.

| Project | Issues cited | PRs cited | Release status |
|---|---|---|---|
| vLLM | 16 | 13 | **v0.27.0** — 561 commits, 242 contributors |
| SGLang | 25 | 16 | None in window (v0.5.16/0.5.17 referenced) |
| llama.cpp | 10 | 19 | **b10342–b10357** (10 merged releases) |
| Ollama | 17 | 10 | **v0.32.8** |
| LiteLLM | 16 | 11 | **v1.96.0** |
| Unsloth | 14 | 14 | **v0.1.61-beta / v0.1.60-beta** |

**Read-through:** vLLM's release is the largest by commit count, but a disproportionate share of its cited items are regressions from that release (#51758, #51744). SGLang carries the most open stability debt — a cluster of DSpark CUDA-graph failures at TP8 (#33356, #31023) with no merged fix. llama.cpp shows the healthiest PR-to-issue ratio, consistent with its steady multi-backend release train. Ollama's high issue count relative to PRs reflects v0.32.7 regressions (model deletion, MLX contamination). LiteLLM's issues skew toward correctness and security (budget bypass, cross-team key access) rather than performance.

## 3. Model Support Race

- **Kimi K3** — vLLM is the clear leader: full-stack support in v0.27.0 (kernels, AttnRes, Python/Rust frontends) plus a dedicated ROCm gap-tracking issue (#50682). SGLang has Day-0 support merged with a DSpark variant and active roadmap (#32607), but no release yet. llama.cpp/Ollama/LiteLLM/Unsloth are silent.
- **Muse Glimmer** — Ollama GA'd it in v0.32.8 across platforms (MLX headline on Apple Silicon); Unsloth shipped support + Dynamic quants in v0.1.60/61-beta; llama.cpp has only a proposed OpenVINO backend (#26888), unmerged. Ollama + Unsloth lead local enablement, though the `muse-glimmer:30b-mlx` manifest issue (#17656) means operators should verify weights.
- **DeepSeek-V4-Flash / DSpark** — Every relevant project has support and every one has an open reliability issue: vLLM startup regression (#51758) and KV-cache overhead (#51041); SGLang TP8 graph-capture failures (#33356, #31023); llama.cpp garbled output on Strix Halo ROCm (#25436). **No one is fully production-stable on this model yet.**
- **Granite-Switch and Nemotron MTP** — llama.cpp is the only project with merged support (#25107, #26725). Ollama has a Nemotron 3 Nano Omni MLX PR inbound (#17060).
- **dots.note.omni** — SGLang completed native support (#33829), a multimodal differentiator.

**Verdict:** vLLM leads frontier serving (Kimi K3, DeepSeek-V4 integration depth). llama.cpp leads architecture breadth for local/edge (Granite-Switch, Nemotron MTP). Ollama + Unsloth lead turnkey local distribution (Muse Glimmer). SGLang differentiates on DSpark and multimodal but is paying for it in stability.

## 4. Performance Frontier

Optimization effort is concentrated in five areas:

1. **KV-cache memory efficiency** — The dominant constraint for long-context serving. vLLM is investigating ~56 bytes/token KV overhead on H20 with DeepSeek-V4-Flash-0731 (#51041); SGLang merged TurboQuant KV-cache quantization claiming 4.9× compression (#22048).
2. **CUDA-graph execution** — Both serving engines are refactoring graph capture/replay: vLLM's MRV2 fusion (#46849) and MRV1 guards (#51768); SGLang's dynamic-replay RFC (#32432) after TP8 startup capture crashes. Graph stability is now a first-class reliability concern, not just a perf lever.
3. **Quantization below FP8** — vLLM is pursuing W4A8 INT4→INT8 expanding loads (#49529) and NVFP4 KV-cache on pre-SM100 GPUs (#47684); SGLang added NVFP4/MXFP4/FP8 diffusion paths; llama.cpp's spec-decode divergence on Q4_K_M (#25618) shows quantized-target determinism remains unsolved.
4. **Distributed serving** — SGLang leads with DeepEP two-batch overlap for DSV4 decode (#33834) and wide-EP requests on GB200/B200 (#34120); vLLM fixed ROCm TP8 MoE shard allocation for DeepSeek-V4 (#51473). Context-parallel decode attention remains a gap in both.
5. **Backend coverage for local/edge** — llama.cpp continues its broad multi-backend train (OpenCL FA prefill #26428, Metal tuning #26570, WebGPU refactor #26134). Unsloth unlocked ROCm AOTriton attention (#8323), eliminating a 66 GiB SDPA fallback. ROCm 7.14 (llama.cpp) and ROCm 7.2 (SGLang CI) migrations confirm AMD as a mainstream target.

## 5. Layer Positioning

- **vLLM — datacenter serving engine.** Full-stack ownership from custom kernels (AttnRes) to Python/Rust frontends; the reference implementation for frontier model deployment at TP8 scale. No local/edge story.
- **SGLang — datacenter serving engine optimized for reasoning and RL workloads.** Strongest on DSpark, PD disaggregation, and AMD; differentiates on speculative decoding and multimodal (dots.note.omni). Overlaps nearly 1:1 with vLLM in positioning.
- **llama.cpp — embeddable inference substrate.** Broadest hardware coverage (CPU, CUDA, ROCm, Metal, Vulkan, WebGPU, OpenCL, OpenVINO) and the GGUF format hub. Infrastructure for other products rather than an end-user product — it is the engine under Ollama and Unsloth Studio.
- **Ollama — turnkey local runtime + model registry.** Built on llama.cpp and now MLX; competes on experience and distribution, not kernel innovation. The default Apple Silicon path.
- **LiteLLM — gateway/control plane only.** No inference; provides routing, budgets, logging, and multi-provider abstraction. The Rust migration (#31263) targets sub-1ms overhead, an explicit acknowledgment that the Python proxy has hit its ceiling.
- **Unsloth — fine-tuning + local inference.** Unusual dual role: LoRA/QLoRA training with Dynamic quants, plus a Studio runtime for chat/serving. Bridges the training/serving gap and is the only project in this set with a meaningful training story.

## 6. Trend Signals

1. **Open-weight frontier models arrive in waves; support maturity lags by 1–2 weeks.** Kimi K3, DeepSeek-V4, and Muse Glimmer all landed in the same window. Every project shipped support with known regressions (vLLM #51758, Ollama #17661, SGLang #33356). Production users should pin versions during model-release windows and validate on the exact target model before upgrading.

2. **CUDA-graph replay is the hidden reliability bottleneck of serving engines.** Both vLLM and SGLang have open graph-capture/replay failures in TP8 configurations. The SGLang dynamic-replay RFC (#32432) is the one to watch — its resolution will define how serving engines handle variable-shape decode for hybrid/MoE models.

3. **Speculative decoding / MTP is table stakes, and determinism is the open problem.** vLLM MRV2, llama.cpp multi-output backend sampling (#25532) and Nemotron MTP (#26725), SGLang MTP, Unsloth DFlash sidecars — all shipped or in flight this cycle. But llama.cpp's divergence on quantized targets (#25618) is a correctness risk for applications that require reproducible output.

4. **AMD ROCm is now a mainstream target, not an afterthought.** ROCm 7.14 (llama.cpp CI), ROCm 7.2 (SGLang PR gate), AOTriton (Unsloth), and gfx942 fixes (vLLM) all landed concurrently. Expect AMD-specific regressions (Strix Halo #25436, MI325X crash #48266) to remain common, but the investment is real.

5. **MLX is emerging as a genuine Apple Silicon inference path.** Ollama explicitly claims state-of-the-art MLX performance; Unsloth now has an MLX path. However, long-lived runner response contamination (#17599) shows the engine's maturity lag — treat MLX as promising but not production-solid for long-running agents.

6. **The gateway layer has hit a Python ceiling.** LiteLLM's Rust migration, spend-update write amplification (#31866), and event-loop blocking in pre-call checks (#36174) all point at the same limit. Control-plane overhead, not model latency, is the next optimization battleground at high QPS.

7. **Agentic workloads are driving correctness fixes at every layer.** Tool-call parser bugs (vLLM qwen3_xml #51679, SGLang PythonicDetector negative numbers #27910, Ollama Qwen3-VL #17647), system-prompt logging (LiteLLM #36406), and reasoning-token accounting (SGLang #32898) all surfaced this cycle. Agent traffic is now a core design assumption; build with tool-call verification in mind, not just token streaming.

8. **The quantization frontier is moving below FP8.** NVFP4/MXFP4 on Blackwell, W4A8 expanding loads, and KV-cache compression (TurboQuant) are the active areas. FP8 is becoming the baseline, not the differentiator.

**What to watch this week:** the vLLM DeepSeek-V4-Flash startup fix (#51768) landing; whether SGLang merges a fix for the DSpark TP8 graph capture (#33356); Ollama's response to the model-deletion (#17661) and MLX contamination (#17599) reports; and LiteLLM's budget-enforcement fix (#26672) — arguably the highest-severity production issue across all six projects, since it lets spend exceed configured caps.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-11

## Today's Highlights

vLLM released **v0.27.0** (561 commits, 242 contributors), headlined by full-stack **Kimi K3** support including kernels, Python/Rust frontends, and AttnRes kernels. The most active conversation is around **DeepSeek-V4-Flash** reliability and memory behavior — a fresh 0.27.0 startup regression ([#51758](https://github.com/vllm-project/vllm/issues/51758)) and KV-cache overhead on H20 ([#51041](https://github.com/vllm-project/vllm/issues/51041)) are drawing heavy attention, while maintainers are guarding MRV1 CUDA-graph configurations ([#51768](https://github.com/vllm-project/vllm/pull/51768)) and reverting a perf change that broke CI ([#51750](https://github.com/vllm-project/vllm/pull/51750)).

---

## Releases & Breaking Changes

- **vLLM v0.27.0** — [release](https://github.com/vllm-project/vllm/releases/tag/v0.27.0)  
  - 561 commits from 242 contributors (64 new).
  - Full-stack **Kimi K3** support: model files/kernels ([#50089](https://github.com/vllm-project/vllm/issues/50089), [#50000](https://github.com/vllm-project/vllm/issues/50000)), Python frontend ([#50093](https://github.com/vllm-project/vllm/issues/50093)), Rust frontend ([#50104](https://github.com/vllm-project/vllm/issues/50104)), AttnRes kernels ([#50090](https://github.com/vllm-project/vllm/issues/50090)).
- **Transformers 5.15.0 bump in flight** — [vllm-project/vllm#51668](https://github.com/vllm-project/vllm/pull/51668)  
  - Potential compatibility break: `vllm-openai:latest` (0.27.0 + Transformers 5.15.0) fails to start Gemma4 QAT NVFP4 models ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- No explicit API/config migration notes in the release beyond the above; users upgrading from 0.26.x with DeepSeek-V4-Flash should test carefully ([#51758](https://github.com/vllm-project/vllm/issues/51758)).

---

## New Model & Hardware Support

- **Kimi K3** — first-class support landed in v0.27.0, including AttnRes kernels and both Python/Rust frontends. See release links above.
- **ROCm Kimi-K3 gap tracking** — [vllm-project/vllm#50682](https://github.com/vllm-project/vllm/issues/50682)  
  Tracks Day-0 features, AITER fused-MoE integration, and performance optimization for Kimi-K3 on AMD ROCm.
- **AutoRound block-wise FP8 support** — [vllm-project/vllm#47434](https://github.com/vllm-project/vllm/pull/47434)  
  Adds AutoRound block-wise FP8 support for models like Llama-3.1-8B.
- **XPU torch linear backend for blockwise FP8 GEMM** — [vllm-project/vllm#50826](https://github.com/vllm-project/vllm/pull/50826)  
  Enables the native `torch._scaled_mm` FP8 backend on Intel XPU.
- **ROCm: preserve native MXFP4 TP8 shard allocation for DeepSeek-V4** — [vllm-project/vllm#51473](https://github.com/vllm-project/vllm/pull/51473)  
  Fixes physical padding on ROCm TP8 MoE sharding.
- **SM8x / Ampere support for DeepSeek-V4-Flash remains requested** — [#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851)  
  DeepSeek-V4-Flash and the 0731 checkpoint still do not run on A100/A800 or RTX 30-series.
- **FlashInfer NVFP4 KV-cache on pre-SM100 GPUs** — [vllm-project/vllm#47684](https://github.com/vllm-project/vllm/issues/47684)  
  RFC tracking Ampere/Hopper support for NVFP4 KV cache with FlashInfer.

---

## Performance & Optimization

- **KV-cache memory concern for DeepSeek-V4-Flash-0731** — [vllm-project/vllm#51041](https://github.com/vllm-project/vllm/issues/51041)  
  Reports **~56 bytes/token** KV cache (7.7 GiB holding only ~150K tokens) on H20 TP=2, and `max_model_len` capped at ~121,344. This needs investigation before deploying the 0731 checkpoint at long context.
- **Speculative decoding regression isolated** — [vllm-project/vllm#49927](https://github.com/vllm-project/vllm/issues/49927)  
  Production A/B on DeepSeek-V4-Flash isolates `#48137` as costing **~10.6% spec-decode acceptance**, and `#48660` as shifting output distributions.
- **MRV2: fuse AR speculator multi-step decodes back into one CUDA graph** — [vllm-project/vllm#46849](https://github.com/vllm-project/vllm/pull/46849)  
  Restores fused multi-step CUDA graph execution for autoregressive speculative decoding, removing per-step Python and replay overhead.
- **Optional HPC BF16xFP32 router GEMM** — [vllm-project/vllm#49312](https://github.com/vllm-project/vllm/pull/49312)  
  Adds an opt-in high-performance path for FP32 MoE router weights on SM90 GPUs.
- **Avoid repeated multimodal prompt-update scans** — [vllm-project/vllm#51774](https://github.com/vllm-project/vllm/pull/51774)  
  Removes quadratic behavior when many multimodal items share the same target.
- **PTX 9.4 `ldmatrix.s8.s4` for W4A8** — [vllm-project/vllm#49529](https://github.com/vllm-project/vllm/issues/49529)  
  Proposes adopting hardware INT4→INT8 expanding loads for W4A8-INT8 paths.
- **Revert of “Narrow DeepSeek V4 eager CUDA graph region”** — [vllm-project/vllm#51750](https://github.com/vllm-project/vllm/pull/51750)  
  Reverted because it broke B200 MoE refactor integration CI (`gsm8k` test failure).

---

## Stability & Regressions

Ranked by severity:

1. **DeepSeek-V4-Flash fails to start after upgrading 0.26.0 → 0.27.0** — [vllm-project/vllm#51758](https://github.com/vllm-project/vllm/issues/51758)  
   Blocks production upgrades; likely related to the DeepSeek-V4 CUDA-graph/MRV1 changes.
2. **vLLM 0.27.0 + Transformers 5.15.0 cannot start Gemma4 QAT NVFP4** — [vllm-project/vllm#51744](https://github.com/vllm-project/vllm/issues/51744)  
   `vllm-openai:latest` fails with Gemma-4-31B NVFP4, TP=2, fp8 KV cache.
3. **V1 engine + MTP + GLM-5.1 hangs under sustained traffic** — [vllm-project/vllm#40926](https://github.com/vllm-project/vllm/issues/40926)  
   Workers hang, `sample_tokens` RPC times out, `EngineDeadError`; TP=8 production impact.
4. **ROCm gfx942 (MI325X) worker crash when sequences cross 2048 tokens** — [vllm-project/vllm#48266](https://github.com/vllm-project/vllm/issues/48266)  
   DeepSeek-V4-Flash architecture with `sparse_attn_indexer` + fp8 KV cache, TP=4.
5. **FlashInfer sampler JIT crashes engine startup when nvcc is missing** — [vllm-project/vllm#49497](https://github.com/vllm-project/vllm/issues/49497)  
   Precompiled/wheel installs have no fallback to the native sampler.
6. **Hybrid multi-group KV connector crash on invalid/load-error blocks** — [vllm-project/vllm#50687](https://github.com/vllm-project/vllm/issues/50687)  
   `_update_requests_with_invalid_blocks` raises `ValueError: too many values to unpack`.
7. **Composite VLM wrapper silently discards real `lm_head.weight`** — [vllm-project/vllm#51063](https://github.com/vllm-project/vllm/issues/51063)  
   `Mistral3ForConditionalGeneration` resolves `tie_word_embeddings` from the wrong config; coherent vocabulary but incoherent output.
8. **`qwen3_xml` tool parser consumes `</think>`** — [vllm-project/vllm#51679](https://github.com/vllm-project/vllm/issues/51679)  
   Reasoning content is merged into `content`; the `--reasoning-parser qwen3` path works as a workaround.
9. **`CUDNN_STATUS_INTERNAL_ERROR` at image preprocessing** — [vllm-project/vllm#51717](https://github.com/vllm-project/vllm/issues/51717)  
   Triggered with `--mm-device-do-normalize`; closed as a bug.

**Notable fixes in flight:**

- Guard DeepSeek-V4 MRV1 piecewise CUDA graphs — [vllm-project/vllm#51768](https://github.com/vllm-project/vllm/pull/51768)  
  Defaults `DeepseekV4ForCausalLM` to MRV2 and rejects known-broken MRV1 + piecewise CUDA-graph configs.
- Fix CPU sampler ignoring request seeds in mixed batches — [vllm-project/vllm#51272](https://github.com/vllm-project/vllm/pull/51272)
- Fix UVA silent input corruption and remote DoS under GPU Confidential Computing — [vllm-project/vllm#50671](https://github.com/vllm-project/vllm/pull/50671)
- XPU weight-offloading startup fix for empty/non-pinned CPU tensors — [vllm-project/vllm#51770](https://github.com/vllm-project/vllm/pull/51770)
- ROCm: remove stale SDPA and skinny GEMM workarounds — [vllm-project/vllm#50907](https://github.com/vllm-project/vllm/pull/50907)

---

## What This Means for Application Developers

- **Before upgrading to v0.27.0, test DeepSeek-V4-Flash workloads explicitly.** A startup regression is already reported ([#51758](https://github.com/vllm-project/vllm/issues/51758)), and DeepSeek-V4-Flash-0731 shows much higher KV-cache usage than the preview checkpoint ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- **If you serve Gemma4 QAT NVFP4, pin the image or Transformers version** until the 5.15.0 compatibility issue is resolved ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **Agents relying on tool-call extraction with Qwen3 should verify reasoning/`</think>` boundaries.** The `qwen3_xml` parser can merge reasoning into `content`; use `--reasoning-parser qwen3` as a workaround ([#51679](https://github.com/vllm-project/vllm/issues/51679)).
- **Ampere users should not expect DeepSeek-V4-Flash support yet.** Both SM8x follow-up tracks remain open ([#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851)).
- **Watch for MRV2 becoming the default for DeepSeek-V4.** It fixes known MRV1 CUDA-graph breakage but may change performance characteristics ([#51768](https://github.com/vllm-project/vllm/pull/51768)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-11

## 1. Today's Highlights

No release shipped in the last 24 hours; attention is concentrated on stabilizing DeepSeek-V4-DSpark CUDA-Graph execution on TP8 ([#31023](https://github.com/sgl-project/sglang/issues/31023), [#33356](https://github.com/sgl-project/sglang/issues/33356)), with an RFC ([#32432](https://github.com/sgl-project/sglang/issues/32432)) proposing explicit contracts for dynamic graph replay. Supporting work landed or advanced on an AMD PR-gate migration to ROCm 7.2 ([#34204](https://github.com/sgl-project/sglang/pull/34204)), a CuTeDSL bump that fixes a Blackwell FA4 startup regression ([#34372](https://github.com/sgl-project/sglang/pull/34372)), and complete dots.note.omni model support ([#33829](https://github.com/sgl-project/sglang/pull/33829)) alongside the Kimi K3 roadmap ([#32607](https://github.com/sgl-project/sglang/issues/32607)).

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Two config/behavior changes to note:

- **`nsa` attention backend alias normalized to `dsa`** — [#34232](https://github.com/sgl-project/sglang/pull/34232) makes the deprecated alias consistent with the existing `compressed` → `dsv4` normalization; `nsa` was previously handled only at the point of use, so some code paths could disagree with the deprecation. Users should migrate to `--attention-backend dsa`.
- **AMD PR gate moving to ROCm 7.2** — [#34204](https://github.com/sgl-project/sglang/pull/34204) (WIP) swaps the AMD PR gate to ROCm 7.2 and demotes ROCm 7.0 to a daily shadow job.

## 3. New Model & Hardware Support

- **dots.note.omni** — [#33829](https://github.com/sgl-project/sglang/pull/33829) completes support with native encoders, video preprocessing, and MTP decoding.
- **Kimi K3** — Roadmap [#32607](https://github.com/sgl-project/sglang/issues/32607): Day-0 PR [#32541](https://github.com/sgl-project/sglang/pull/32541) merged; DSpark variant published; bugs tracked in [#32970](https://github.com/sgl-project/sglang/issues/32970).
- **DeepSeek-V4 on AMD** — [#33480](https://github.com/sgl-project/sglang/pull/33480) adds prefill context-parallel two-batch overlap for DSV4.
- **Quantization** — TurboQuant KV cache quantization (4.9× compression, arXiv:2504.19874) in [#22048](https://github.com/sgl-project/sglang/pull/22048); ZImage-Turbo DiT full FP8 quantization + CUDA Graph in [#21912](https://github.com/sgl-project/sglang/pull/21912).
- **Apple Silicon / MLX** — MoE optimization workstream [#22283](https://github.com/sgl-project/sglang/issues/22283); RFCs [#32321](https://github.com/sgl-project/sglang/issues/32321) and [#32833](https://github.com/sgl-project/sglang/issues/32833) converge on a Torch-owned SRT path with an exported MLX region and a documented per-step event-loop contract.
- **Wide EP for GLM5-2 / Kimi-K3 on GB200/B200** requested in [#34120](https://github.com/sgl-project/sglang/issues/34120), with deployment failures reported under several configs. The Cambricon MLU in-tree backend RFC ([#26438](https://github.com/sgl-project/sglang/issues/26438)) was closed inactive.

## 4. Performance & Optimization

- **DeepSeek-V4 perf tracking** — [#33636](https://github.com/sgl-project/sglang/issues/33636) scopes SM90/SM100/SM103 work and tracks the open PRs driving it.
- **DSpark roadmap** — [#30344](https://github.com/sgl-project/sglang/issues/30344) prioritizes an online/adaptive cost model and further dynamic scheduling improvements.
- **Context Parallelism roadmap (Q3 2026)** — [#21788](https://github.com/sgl-project/sglang/issues/21788) summarizes existing prefill-CP for DSA models and MHA/GQA (Qwen3-MoE + FA3); decode-CP attention backend coverage remains a gap.
- **DSV4 decode TBO with DeepEP backend** — [#33834](https://github.com/sgl-project/sglang/pull/33834).
- **FA4 Blackwell startup regression fixed** by bumping CuTeDSL to 4.6.2 ([#34372](https://github.com/sgl-project/sglang/pull/34372)), addressing the `quack-kernels==0.6.3` + `nvidia-cutlass-dsl==4.6.0` combination on SM103.
- **Diffusion roadmap** — [#23035](https://github.com/sgl-project/sglang/issues/23035): LTX-2 one/two-stage pipelines, NVFP4/MXFP4/FP8, graph-level optimization, kernel fusion over compiler-driven fusion.

## 5. Stability & Regressions

Ranked roughly by severity. Several fix PRs are in flight; the DSpark CUDA-graph issues do not yet have merged fixes.

1. **DSpark large decode CUDA-Graph capture — non-deterministic illegal memory / host SIGSEGV on TP8 (v0.5.16)** — [#33356](https://github.com/sgl-project/sglang/issues/33356). Fails during server startup on B300/B30Z; no fix PR linked yet.
2. **DSpark compact target-verify CUDA Graph transition — timing-sensitive illegal memory access on TP8** — [#31023](https://github.com/sgl-project/sglang/issues/31023). The cross-TP planning inconsistency is addressed by PR [#31195](https://github.com/sgl-project/sglang/pull/31195); the second root cause remains open.
3. **Scheduler hang in DSV4 sparse prefill with hierarchical cache + 16K chunked prefill** — [#34235](https://github.com/sgl-project/sglang/issues/34235). Reported on 0.5.17 / H20 FP8 with watchdog abort; a sampling device-side assert also appears on 0.5.16+PR.
4. **Kimi-K3 DSPARK Xid 13 (CTA not present) at ~218k context on B300** — [#32855](https://github.com/sgl-project/sglang/issues/32855), closed; related to the same TP8 CUDA-graph instability family.
5. **Z-Image BCG failure on single GPU — illegal memory access / hang at first replay** — [#34183](https://github.com/sgl-project/sglang/issues/34183), closed. TP=2 unaffected; `dit_cpu_offload` changes the failure mode.
6. **W4AFP8 + DeepEP crash on first inference — TypeError missing `routed_scaling_factor`** — [#33660](https://github.com/sgl-project/sglang/issues/33660), closed. Affects GLM-5.2 w4afp8 with `--moe-a2a-backend deepep`.
7. **PythonicDetector drops tool calls with negative numeric arguments** — [#27910](https://github.com/sgl-project/sglang/issues/27910), closed. `-5` parses as `ast.UnaryOp`, not `ast.Constant`, so the detector silently drops the argument — significant for agentic workloads.
8. **Diffusion video regressions** — Wan2.2 T2V-A14B mosaic/corrupted output ([#27125](https://github.com/sgl-project/sglang/issues/27125), closed) and Wan2.2-TI2V-5B-Diffusers failure on Atlas A3 ([#27920](https://github.com/sgl-project/sglang/issues/27920), closed).
9. **Fix PRs in flight or merged**: Qwen3.5 M=0 crash under DP attention + AllToAll MoE ([#22455](https://github.com/sgl-project/sglang/pull/22455)); HiCache Mamba track-boundary bookkeeping under overlap scheduling ([#29792](https://github.com/sgl-project/sglang/pull/29792)); PD disaggregation reasoning-token accounting for the handoff token ([#32898](https://github.com/sgl-project/sglang/pull/32898)); DP controller now detects scheduler death instead of blocking on `recv` ([#34233](https://github.com/sgl-project/sglang/pull/34233)); stale requests dropped during weight-update pause ([#34185](https://github.com/sgl-project/sglang/pull/34185), draft).
10. **CI health** — the auto-collected CUDA coredump tracker ([#26340](https://github.com/sgl-project/sglang/issues/26340)) continues to surface events from `pr-test.yml`; the CI tracking issue ([#17050](https://github.com/sgl-project/sglang/issues/17050)) reports 3 broken, 11 flaky, 668 recently fixed.

## 6. What This Means for Application Developers

- **DSpark users on TP8 should pin a known-good build** and track [#33356](https://github.com/sgl-project/sglang/issues/33356) / [#31023](https://github.com/sgl-project/sglang/issues/31023); the dynamic-CUDA-graph RFC ([#32432](https://github.com/sgl-project/sglang/issues/32432)) signals maintainers are formalizing replay contracts, but startup-time graph-capture flakiness is still expected in the meantime.
- **FA4 on Blackwell**: update CuTeDSL to 4.6.2 ([#34372](https://github.com/sgl-project/sglang/pull/34372)) before serving NVFP4 models like `thinkingmachines/Inkling-Small-NVFP4`.
- **Agentic workloads**: the Programmatic KV Cache RFC ([#27574](https://github.com/sgl-project/sglang/issues/27574)) and recoverable KV placement state ([#33394](https://github.com/sgl-project/sglang/issues/33394)) preview smarter router/engine coordination; the PythonicDetector negative-number fix ([#27910](https://github.com/sgl-project/sglang/issues/27910)) is important for agents emitting negative tool arguments. A push-based engine load reporter ([#32523](https://github.com/sgl-project/sglang/pull/32523)) is in progress for load-aware routing.
- **Request throttling**: the closed PR [#21838](https://github.com/sgl-project/sglang/pull/21838) adds `--max-images-per-request` to prevent OOM from excessive image inputs — useful guidance if you serve multimodal endpoints.
- **Async RL / weight updates**: PR [#34185](https://github.com/sgl-project/sglang/pull/34185) (draft) drops requests that are already too stale during weight-update pauses, which will reduce retract-mode pileups.
- **Config hygiene**: migrate off the deprecated `nsa` attention-backend alias to `dsa` ([#34232](https://github.com/sgl-project/sglang/pull/34232)).

Unit-test coverage for core modules (`managers/`, `mem_cache/`, `entrypoints/`, `sampling/`, `parser/`, `function_call/`) remains a tracked gap ([#20865](https://github.com/sgl-project/sglang/issues/20865)), so expect E2E-heavy regressions to keep surfacing in CI.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-11

## 1. Today's Highlights

The release train is focused on inference flexibility and backend coverage: [b10355](https://github.com/ggml-org/llama.cpp/pull/25532) adds multi-output backend sampling with token speculation, while [b10342](https://github.com/ggml-org/llama.cpp/pull/25107) introduces the Granite-Switch architecture and [b10344](https://github.com/ggml-org/llama.cpp/pull/26725) adds Nemotron MTP support. ROCm builds also move to 7.14 via [b10356](https://github.com/ggml-org/llama.cpp/pull/25775), and an OpenCL flash-attention prefill optimization landed in [b10357](https://github.com/ggml-org/llama.cpp/pull/26428). On the stability side, open issues around DeepSeek-V4 on Strix Halo ROCm and speculative-decoding divergence on quantized targets remain under investigation.

## 2. Releases & Breaking Changes

- **b10357** — OpenCL FA prefill kernels now transpose the K tile in local memory ([#26428](https://github.com/ggml-org/llama.cpp/pull/26428)).
- **b10356** — CI/build/release targets ROCm 7.14, replacing 7.2.1 and adopting TheRock-based multi-arch deliverables ([#25775](https://github.com/ggml-org/llama.cpp/pull/25775)). ROCm users should verify driver/runtime compatibility before upgrading.
- **b10355** — Adds multi-output backend sampling, including backend sampling with token speculation and a numeric context parameter declaring maximum outputs per sequence ([#25532](https://github.com/ggml-org/llama.cpp/pull/25532)). This is the most notable API/config behavior change today.
- **b10354** — Fixes CPU affinity mask being ignored on Android ([#26838](https://github.com/ggml-org/llama.cpp/pull/26838)).
- **b10353** — ROLL now requires contiguous sources on CUDA and Metal; previously a non-contiguous source could silently produce wrong results ([#25928](https://github.com/ggml-org/llama.cpp/pull/25928)).
- **b10344** — Adds MTP support for Nemotron models, including `mtp_flags` ([#26725](https://github.com/ggml-org/llama.cpp/pull/26725)).
- **b10343** — Updates cpp-httplib to 0.53.0 ([#26821](https://github.com/ggml-org/llama.cpp/pull/26821)).
- **b10342** — New Granite-Switch architecture: dense all-attention Granite-4.1 with per-token LoRA adapters selected by control tokens ([#25107](https://github.com/ggml-org/llama.cpp/pull/25107)).
- **b10338** — Model-saver fix for expert shared/chunk FFN length key clobbering ([#26693](https://github.com/ggml-org/llama.cpp/pull/26693)).
- **b10336** — WebGPU WGSL refactor and flash-attention simplification ([#26134](https://github.com/ggml-org/llama.cpp/pull/26134)).

## 3. New Model & Hardware Support

- **Granite-Switch** architecture support merged in [b10342](https://github.com/ggml-org/llama.cpp/pull/25107) — Granite-4.1 with embedded LoRA adapters selected per token.
- **Nemotron MTP** support merged in [b10344](https://github.com/ggml-org/llama.cpp/pull/26725).
- **BailingMoE3** support is proposed in [PR #26608](https://github.com/ggml-org/llama.cpp/pull/26608), enabling Ling 3.0 flash models with MTP.
- **OpenVINO Muse-Glimmer** backend support is proposed in [PR #26888](https://github.com/ggml-org/llama.cpp/pull/26888), adding SIGMOID/ARGMAX ops and sliding-window vs full-attention layer classification.
- **ROCm 7.14** is now the CI/release target ([#25775](https://github.com/ggml-org/llama.cpp/pull/25775)), which is relevant for gfx1201 and newer AMD hardware.

## 4. Performance & Optimization

- **OpenCL FA prefill**: K-tile transpose in local memory ([#26428](https://github.com/ggml-org/llama.cpp/pull/26428)) — targets FA prefill kernel efficiency.
- **CUDA flash-attention**: XOR swizzle for K/V shared-memory fp16 tiles to reduce bank conflicts on Turing+ ([#25635](https://github.com/ggml-org/llama.cpp/pull/25635)).
- **Grammar engine**: Single-lookup grammar parsing with fewer copies, measuring ~1.2–1.3× speedup ([#26885](https://github.com/ggml-org/llama.cpp/pull/26885)).
- **HIP/RDNA**: RDNA3/RDNA4 mmq config tuning in [PR #26284](https://github.com/ggml-org/llama.cpp/pull/26284).
- **Metal**: Per-device flash-attention vector tuning (Q, NE) is proposed in [PR #26570](https://github.com/ggml-org/llama.cpp/pull/26570).
- **MoE host-RAM offload**: [Issue #26448](https://github.com/ggml-org/llama.cpp/issues/26448) requests keeping MoE expert weights in host memory and reading over PCIe DMA without H2D copies; reports significant VRAM savings on RTX 4090 (e.g., 23GB MoE on 1.6GB VRAM). No merged implementation yet.

## 5. Stability & Regressions

Ranked roughly by impact:

- **DeepSeek-V4 garbled output on Strix Halo with ROCm** — [Issue #25436](https://github.com/ggml-org/llama.cpp/issues/25436), open. Multiple GGUF sources affected; no fix PR yet.
- **Qwen3.5 tool calls printed inside thinking block and generation stops** — [Issue #20837](https://github.com/ggml-org/llama.cpp/issues/20837), open, high community engagement.
- **Speculative decoding divergence from vanilla greedy on quantized targets** — [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618), open. Draft-MTP/draft-dspark produce different text vs non-speculative runs on Q4_K_M targets; bf16 matches.
- **MTP inter-request state retention causing nondeterminism** — [Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425), open, affects Qwen3.6-35B-A3B-MTP.
- **Gemma 4 31B infinite `<unused49>` token loop after idle** — [Issue #26088](https://github.com/ggml-org/llama.cpp/issues/26088), open.
- **RPC backend graph compute failure on DeepSeek-V4** — [Issue #26820](https://github.com/ggml-org/llama.cpp/issues/26820), open.
- **Strix Halo performance regression due to input layers offloaded to CPU** — [Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700), open.
- **CPU build failure: unknown type name `__fp16`** in `simd-mappings.h` — [Issue #26677](https://github.com/ggml-org/llama.cpp/issues/26677), open.

Fixes in flight:

- **Vulkan**: fall back to CPU for `GET_ROWS` with misaligned view offsets, avoiding hard `GGML_ASSERT` crash ([PR #26854](https://github.com/ggml-org/llama.cpp/pull/26854)).
- **Metal**: fix SIGABRT in `ggml_metal_rsets_free` during process exit ([PR #26857](https://github.com/ggml-org/llama.cpp/pull/26857)).
- **Speculative-simple**: pass `ctx_other` to draft context and fail gracefully for drafters borrowing target tensors ([PR #26883](https://github.com/ggml-org/llama.cpp/pull/26883)).
- **NV CMP 70HX throttling**: user-side PTX `__dp4a` emulation workaround documented in [Issue #26810](https://github.com/ggml-org/llama.cpp/issues/26810), closed as workaround.

## 6. What This Means for Application Developers

- **Token speculation / MTP is becoming more flexible** with multi-output backend sampling ([#25532](https://github.com/ggml-org/llama.cpp/pull/25532)) and Nemotron MTP support ([#26725](https://github.com/ggml-org/llama.cpp/pull/26725)). However, validate deterministic behavior if your target model is quantized — see [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618).
- **ROCm users on Strix Halo / Radeon 9000-class hardware** should test b10356+ for ROCm 7.14 compatibility, but watch [Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700) and [Issue #25436](https://github.com/ggml-org/llama.cpp/issues/25436) if serving DeepSeek-V4-class models.
- **Granite-Switch support** ([#25107](https://github.com/ggml-org/llama.cpp/pull/25107)) opens a new pattern: one dense model with many per-token LoRA adapters selected by control tokens. This is useful for agent/tool-selection workloads but changes how prompt/control-token handling should be designed.
- **If you ship via Vulkan or Metal**, the pending `GET_ROWS` and shutdown-crash fixes ([#26854](https://github.com/ggml-org/llama.cpp/pull/26854), [#26857](https://github.com/ggml-org/llama.cpp/pull/26857)) are worth tracking for server and mobile stability.
- **Edge deployments** benefit from the WebGPU flash-attention simplification ([#26134](https://github.com/ggml-org/llama.cpp/pull/26134)) and OpenCL FA prefill improvements ([#26428](https://github.com/ggml-org/llama.cpp/pull/26428)), especially on memory-constrained clients.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-11

## Today's Highlights

Ollama shipped **v0.32.8**, making Meta's **Muse Glimmer** generally available across platforms and emphasizing the MLX engine as the headline path for Apple Silicon agent workloads — including Claude Code, Codex, Pi, OpenClaw, and Hermes. The release wave is tempered by several regression reports: users have seen model deletion after upgrading to v0.32.7 ([#17661](https://github.com/ollama/ollama/issues/17661)), a `muse-glimmer:30b-mlx` manifest that appears to contain NVFP4 weights instead of MLX weights ([#17656](https://github.com/ollama/ollama/issues/17656)), and MLX long-lived runner response contamination ([#17599](https://github.com/ollama/ollama/issues/17599)).

## Releases & Breaking Changes

- [v0.32.8](https://github.com/ollama/ollama/releases/tag/v0.32.8) — Muse Glimmer is now available on all platforms. Release notes explicitly call out coding agent use cases (Claude Code, Codex, Pi, etc.) and long-running personal assistants, and state that Ollama's MLX engine provides state-of-the-art performance on Apple Silicon.
- [v0.32.7](https://github.com/ollama/ollama/releases/tag/v0.32.7) — Initial Muse Glimmer support via MLX on Apple Silicon; broader support for Apple Silicon, NVIDIA, AMD, and other platforms was promised “in the coming days.”

User-reported breaking/regression notes to watch:

- [#17661](https://github.com/ollama/ollama/issues/17661) — Upgrading to v0.32.7 on Jetson AGX Orin caused multiple models to disappear, leaving only `qwen3.6:35b`.
- [#17645](https://github.com/ollama/ollama/issues/17645) — On v0.32.7, `ollama pull muse-glimmer:30b-q8_0` returns `412: The model you are attempting to pull requires a newer version of Ollama that may be in pre-release`.
- [#17444](https://github.com/ollama/ollama/issues/17444) — v0.32.4 and v0.32.5 break tool calling in the VS Code Copilot GitHub Harness; rolling back to v0.32.1 is confirmed to restore functionality.

## New Model & Hardware Support

- **Muse Glimmer** — Meta's newest open model is now supported in v0.32.7/v0.32.8, currently via MLX on Apple Silicon, with NVIDIA/AMD/Apple optimizations expected shortly.
- [PR #17060](https://github.com/ollama/ollama/pull/17060) — Adds MLX support for **Nemotron 3 Nano Omni**, including Mamba2/recurrent pieces, MoE routing, and quantized NVFP4/MXFP8 expert paths.
- [PR #17650](https://github.com/ollama/ollama/pull/17650) — Adds **Gemma4 image input support** on MLX through the generic `base.MediaModel` interface.
- [PR #17555](https://github.com/ollama/ollama/pull/17555) — Adds native chat handling for **Apertus 1.5 8B/70B**, a Swiss multimodal model family.

⚠️ Packaging concern: [#17656](https://github.com/ollama/ollama/issues/17656) reports that `muse-glimmer:30b-mlx` is actually built from NVFP4 layers, not real MLX weights, despite the tag name.

## Performance & Optimization

- v0.32.8 claims **state-of-the-art MLX performance on Apple Silicon** for Muse Glimmer.
- [PR #17654](https://github.com/ollama/ollama/pull/17654) — Windows-on-Arm CPU runner is currently built at baseline `armv8-a`, shipping zero dot-product/matrix instructions. A one-line `GGML_CPU_ARM_ARCH` change would enable optimized CPU kernels without compatibility risk.
- [#17557](https://github.com/ollama/ollama/issues/17557) — Feature request to keep MoE experts in host RAM and load active experts to GPU on demand. Current llama.cpp behavior loads all experts into VRAM: a 16B MoE model with a 6GB file reportedly requires 23GB VRAM, blocking 8GB/12GB GPUs.
- [#16873](https://github.com/ollama/ollama/issues/16873) — High CPU and low GPU utilization on Windows dual-socket servers across CPU-only, GPU-only, and hybrid modes; under investigation.
- [PR #17663](https://github.com/ollama/ollama/pull/17663) — Exposes projected context length in model details; currently bucket-based, expandable later with better MLX runner estimation.
- [PR #17480](https://github.com/ollama/ollama/pull/17480) — Replaces synthetic benchmark prompts with HumanEval-derived patch/continuation tasks for more realistic coding-agent benchmarks.

## Stability & Regressions

Ranked by severity:

1. **Model deletion after upgrade** — [#17661](https://github.com/ollama/ollama/issues/17661): v0.32.7 removed several models on Jetson AGX Orin. No fix PR yet.
2. **MLX cross-request response contamination** — [#17599](https://github.com/ollama/ollama/issues/17599): with `OLLAMA_KEEP_ALIVE=-1`, a long-lived MLX runner intermittently returns verbatim answers to earlier prompts. No fix PR yet.
3. **Deterministic CUDA crash on DGX Spark** — [#17596](https://github.com/ollama/ollama/issues/17596): illegal memory access in `ggml_cuda_flash_attn_ext_mma_f16_case<256, 256, 8, 8>` during large prefill with Qwen3-Next 80B-A3B. No fix PR yet.
4. **Wrong MLX manifest** — [#17656](https://github.com/ollama/ollama/issues/17656): `muse-glimmer:30b-mlx` points to NVFP4 layers instead of MLX weights. No fix PR yet.
5. **Tool-calling regression** — [#17444](https://github.com/ollama/ollama/issues/17444): VS Code Copilot harness broken on v0.32.4/0.32.5; confirmed rollback to v0.32.1.
6. **MLX generation degeneration** — [#17632](https://github.com/ollama/ollama/issues/17632): `laguna-s-2.1:mlx-bf16` intermittently fails to terminate and produces stream-of-consciousness output on Apple Silicon.
7. **Muse Glimmer pull failure** — [#17645](https://github.com/ollama/ollama/issues/17645): v0.32.7 advertises support but cannot pull `muse-glimmer:30b-q8_0` (HTTP 412).

Other notable issues:

- [#15950](https://github.com/ollama/ollama/issues/15950) — Runner accepts TCP connections but requests never reach the work loop after large models have been pinned in memory for hours; same shape as the previously resolved #15258.
- [#17544](https://github.com/ollama/ollama/issues/17544) — `/api/generate` silently ignores `think: true` when `format` is set; `/api/chat` handles the same request correctly.
- [#17491](https://github.com/ollama/ollama/issues/17491) — `ollama create` hangs with two `FROM` lines (model + mmproj projector); [PR #17649](https://github.com/ollama/ollama/pull/17649) adds per-file SHA-256 progress to address the silent hang.
- [#17652](https://github.com/ollama/ollama/issues/17652) — User skills in `~/.ollama/skills/` are silently skipped; [PR #17657](https://github.com/ollama/ollama/pull/17657) improves skill scanning and explains rejected skill names.
- [#16785](https://github.com/ollama/ollama/issues/16785) — `ollama run model > out.txt` writes ANSI terminal sequences; [PR #17644](https://github.com/ollama/ollama/pull/17644) suppresses word-wrap escapes when stdout is not a TTY.
- [#17647](https://github.com/ollama/ollama/issues/17647) — Qwen3-VL tool-call parser errors reach clients as bare JSON/XML unmarshal messages; [PR #17651](https://github.com/ollama/ollama/pull/17651) wraps parser errors with client-facing context.
- [#17653](https://github.com/ollama/ollama/issues/17653) — `launch claude-desktop` on Ubuntu is rejected with “only supported on macOS and Windows.”
- [#16673](https://github.com/ollama/ollama/issues/16673) — Ollama desktop app context-length slider becomes grayed out after subsequent launches.

## What This Means for Application Developers

- **Update to v0.32.8 if you need Muse Glimmer**, but verify model tags carefully: `muse-glimmer:30b-mlx` may not currently contain real MLX weights ([#17656](https://github.com/ollama/ollama/issues/17656)), and pulls can fail with 412 on v0.32.7 ([#17645](https://github.com/ollama/ollama/issues/17645)).
- **Do not trust long-lived MLX runners with `keep_alive=-1` yet** — cross-request response contamination ([#17599](https://github.com/ollama/ollama/issues/17599)) is a correctness and data-isolation risk. Restart runners periodically or add response validation at the application layer.
- **If you use VS Code Copilot-style tool-calling harnesses**, pin to v0.32.1 until the regression in v0.32.4/0.32.5 is resolved ([#17444](https://github.com/ollama/ollama/issues/17444)).
- **For large MoE models on small GPUs**, current Ollama/llama.cpp behavior can demand far more VRAM than the file size suggests; plan around all-experts-in-VRAM or track [#17557](https://github.com/ollama/ollama/issues/17557) for host-RAM expert offload.
- **If you build on Qwen3-VL or complex tool calls**, upstream parser-error wrapping is coming in [PR #17651](https://github.com/ollama/ollama/pull/17651); in the meantime, capture request metadata before invoking tool calls to aid debugging.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-11

## 1. Today's Highlights
The marquee item is the **Rust migration parent ticket** ([#31263](https://github.com/BerriAI/litellm/issues/31263)): LiteLLM is moving toward a sub-1ms-overhead gateway in Rust, with a launch blog post and an early-beta signup open. Separately, **v1.96.0** ships with cosign-signed Docker images, and a new **fusion API** PR ([#36511](https://github.com/BerriAI/litellm/pull/36511)) adds `litellm.fusion()`/`afusion()` for parallel multi-model generation with judge-based synthesis. The long-awaited **Langfuse v4 SDK/OTel ingestion upgrade** ([#33391](https://github.com/BerriAI/litellm/pull/33391)) is also in flight.

## 2. Releases & Breaking Changes
- **v1.96.0** — All Docker images are now signed with [cosign](https://docs.sigstore.dev/cosign/overview/); every release uses the key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Verification steps are included in the release notes. ([release](https://github.com/BerriAI/litellm/releases))
- **PR [#36514](https://github.com/BerriAI/litellm/pull/36514)** — New opt-in `general_settings` flags (`enforce_model_rpm_tpm_on_create`, etc., both default `false`) reject `POST /model/new` / project create when `rpm`/`tpm` are missing. Behavior change only if explicitly enabled.
- **PR [#36488](https://github.com/BerriAI/litellm/pull/36488)** — Adds a nullable `config_updated_at` column to virtual keys, stamped only on update/regenerate/block/unblock. Schema migration required; the key page "Last Updated" timestamp will now reflect config changes instead of every request.
- **PR [#36406](https://github.com/BerriAI/litellm/pull/36406)** — Adds `system_prompt` to `StandardLoggingPayload`; list-form Anthropic `system` blocks (used by Claude Code/Cowork) are now surfaced in logging payloads.

## 3. New Model & Hardware Support
- **Nadir provider** ([#33227](https://github.com/BerriAI/litellm/pull/33227)) — First-class `nadir/auto` virtual model; Nadir classifies request complexity server-side and routes to the cheapest suitable model.
- **Ofox provider** ([#32049](https://github.com/BerriAI/litellm/pull/32049)) — JSON-configured OpenAI-compatible provider exposing 100+ models via OpenAI, Anthropic, and Gemini protocols (`OFOX_API_KEY`).
- **Z.AI model gap** ([#32218](https://github.com/BerriAI/litellm/issues/32218)) — Docs advertise `glm-5.2[1m]`, but the proxy returns `Unknown Model`; plain `glm-5.2` works. Translation layer needs the 1M-context variant registered.
- **GPUStack models still fail to add** ([#25833](https://github.com/BerriAI/litellm/issues/25833)) — 500 error when testing connection via the OpenAI provider path; still open.

## 4. Performance & Optimization
- **Rust migration** ([#31263](https://github.com/BerriAI/litellm/issues/31263)) — Parent ticket claiming **sub-1ms overheads**; beta signup available. Largest performance lever on the roadmap.
- **Spend-tracking write amplification** ([#31866](https://github.com/BerriAI/litellm/issues/31866)) — Open PR adds `disable_entity_spend_updates` to suppress per-request entity counter UPDATEs at high QPS while preserving raw spend log INSERTs.
- **Event-loop blocking in pre-call checks** ([#36174](https://github.com/BerriAI/litellm/issues/36174)) — `Router.async_get_healthy_deployments` calls sync `litellm.token_counter` (tiktoken) directly on the event loop when `enable_pre_call_checks=True` + `max_input_tokens` set; blocks async paths.
- **Per-pod TPM enforcement** ([#27736](https://github.com/BerriAI/litellm/issues/27736)) — With `usage-based-routing-v2`, deployment TPM limits are enforced per replica, so effective limit becomes `tpm_limit × N_replica`; no cross-pod coordination.
- **Shadow eval for auto-router** ([#36250](https://github.com/BerriAI/litellm/pull/36250)) — Samples a configurable % of a key's successful traffic, duplicates it through the auto-router, and reports per-tier blind pairwise win rates — evidence for "is it safe to turn the router on?" before production routing.

## 5. Stability & Regressions
Ranked by severity; no fix PRs exist yet unless noted.

- **Budget enforcement bypassed** ([#26672](https://github.com/BerriAI/litellm/issues/26672), open, 15 comments) — v1.82.3+ fails to enforce key/user `max_budget`; spend continues past the limit. This is production-impacting for quota controls. No fix PR linked.
- **Streaming usage severely undercounted** ([#36114](https://github.com/BerriAI/litellm/issues/36114), open) — Provider-independent undercount in chained proxy setups; root cause located in the stream aggregation layer, not the already-fixed `chunk_parser()`. Affects usage-based billing.
- **Cross-team key access on `/v1/memory`** ([#27722](https://github.com/BerriAI/litellm/issues/27722), open) — Team 2 can read/update/delete Team 1's keys on memory CRUD endpoints without authorization. Security issue; no fix linked.
- **`async for` TypeError on reasoning streams** ([#27670](https://github.com/BerriAI/litellm/issues/27670)) — `stream=True` with providers returning a `reasoning` field in delta crashes with `'async for' requires an object with aiter method, got NoneType`.
- **No mid-stream fallback on `/v1/messages`** ([#24004](https://github.com/BerriAI/litellm/issues/24004)) — Anthropic SSE errors (`overloaded_error`, `internal_server_error`) are not caught by router fallbacks for `anthropic_messages` route type.
- **`max_parallel_requests` leaks on cancellation** ([#27955](https://github.com/BerriAI/litellm/issues/27955)) — Redis counter monotonically increases when clients cancel streaming `/v1/messages` mid-stream, eventually blocking all requests.
- **Request Logs hours behind** ([#25234](https://github.com/BerriAI/litellm/issues/25234)) — Timezone-naive `SpendLogs` timestamps make Live Tail/Request Logs appear delayed in the UI.
- **Empty Bearer header with literal API keys** ([#27434](https://github.com/BerriAI/litellm/issues/27434)) — `openai/*` models with `api_key` as a literal string emit `Authorization: Bearer ` (empty), rejected client-side by httpx. Use `os.environ/` references; root-cause fix still pending.
- **Config overwrite bug closed** ([#12875](https://github.com/BerriAI/litellm/issues/12875)) — `LiteLLM_Config` table no longer overwrites newly deployed `general_settings`; resolved.
- **Fix PRs in flight:** Slack spend-report dedupe across pods ([#36489](https://github.com/BerriAI/litellm/pull/36489)) addresses the duplicate-alerts-per-replica issue ([#14809](https://github.com/BerriAI/litellm/issues/14809)); Anthropic midturn `system` message preservation for Claude Code ([#34290](https://github.com/BerriAI/litellm/pull/34290)) is merged/closed; Vertex multi-breakpoint `cache_control` last-write-wins fix ([#35539](https://github.com/BerriAI/litellm/pull/35539)) is open.

## 6. What This Means for Application Developers
- **Plan for the Rust gateway.** If you run LiteLLM at high RPS, join the beta ([#31263](https://github.com/BerriAI/litellm/issues/31263)) and benchmark against the Python proxy — sub-1ms overhead would change gateway sizing math.
- **Verify budget enforcement before upgrading.** Track [#26672](https://github.com/BerriAI/litellm/issues/26672) if you rely on `max_budget` for hard spend caps; current 1.82.3+ behavior may let spend exceed limits.
- **Don't trust streaming `usage` for billing yet.** The stream aggregation undercount ([#36114](https://github.com/BerriAI/litellm/issues/36114)) is provider-independent; reconcile against non-streaming calls or log-level token counts until fixed.
- **Fusion API is coming** ([#36511](https://github.com/BerriAI/litellm/pull/36511)) — one SDK call to fan out to N models and synthesize a judge answer; useful for self-consistency and routing experiments.
- **Key auditing improves.** Once [#36488](https://github.com/BerriAI/litellm/pull/36488) lands, `config_updated_at` gives you a real "when did the key config change" signal.
- **Langfuse users:** the v4 SDK/OTel upgrade ([#33391](https://github.com/BerriAI/litellm/pull/33391)) is open; stay on v2 until it ships unless you need Langfuse Cloud Fast Preview ingestion.
- **Verify image signatures** on v1.96.0+ with cosign ([release](https://github.com/BerriAI/litellm/releases)) to protect your supply chain.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-11

## Today's Highlights

Meta Superintelligence Labs released **Muse Glimmer**, a dense 30B open model under Apache 2.0, and Unsloth shipped v0.1.60-beta / v0.1.61-beta with support plus Unsloth Dynamic quants. On the Studio side, a Windows native-path regression that causes local GGUF chat completions to fail with `503 model_switch_failed` is being fixed in [PR #8391](https://github.com/unslothai/unsloth/pull/8391), and several latency/memory improvements landed for chat, LoRA scans, and ROCm attention. MiniMax M3 GGUF compatibility and AMD/ROCm stability remain the main open risk areas.

## Releases & Breaking Changes

- **[v0.1.61-beta](https://github.com/unslothai/unsloth/releases) / [v0.1.60-beta](https://github.com/unslothai/unsloth/releases)** — Both add support for Meta Muse Glimmer 30B, a dense model for local agentic/coding workflows under Apache 2.0. No breaking changes are documented in the release data.
- **[PR #8395](https://github.com/unslothai/unsloth/pull/8395)** — Fixes Unsloth reporting another package's version on the MLX path.
- **[Issue #8171](https://github.com/unslothai/unsloth/issues/8171)** — `unsloth.__version__` aliases `unsloth_zoo.__version__`, so version misreporting can occur when core releases ahead of the zoo.

## New Model & Hardware Support

- **Meta Muse Glimmer 30B** — Newly supported via Unsloth and Unsloth Dynamic quants. See [v0.1.61-beta](https://github.com/unslothai/unsloth/releases).
- **MiniMax H3 GGUF variants** — Studio now sources official Ref2VA builds instead of a community mirror in [PR #8383](https://github.com/unslothai/unsloth/pull/8383).
- **DFlash speculative drafter** — Studio will auto-launch `dflash-*.gguf` sidecars for speculative decoding in [PR #8338](https://github.com/unslothai/unsloth/pull/8338).
- **Studio audio support** — New TTS/STT create tab, LoRA training tab, and OpenAI-compatible audio endpoints in [PR #7984](https://github.com/unslothai/unsloth/pull/7984).

## Performance & Optimization

- **[PR #8371](https://github.com/unslothai/unsloth/pull/8371)** — Fixes delayed streaming for already-loaded GGUFs. Studio would spend up to ~16s searching before output; the model was actually ready in under 0.5s.
- **[PR #8323](https://github.com/unslothai/unsloth/pull/8323)** — Unlocks ROCm AOTriton attention so a 16 GB card no longer requests ~66 GiB during SDPA fallback.
- **[PR #8392](https://github.com/unslothai/unsloth/pull/8392)** — Moves the LoRA scan off the event loop, preventing server stalls during model picker polling.
- **[PR #8382](https://github.com/unslothai/unsloth/pull/8382)** — Reduces chat send overhead by reusing saved conversation metadata instead of reading the record four times.
- **[PR #8334](https://github.com/unslothai/unsloth/pull/8334)** — Stops caching inconclusive llama-server MTP capability probes, avoiding silent fallback from speculative decoding.
- **[PR #8394](https://github.com/unslothai/unsloth/pull/8394)** — Skips linked-folder RAG filters/lexical joins when nothing is linked, improving RAG search latency.
- **[PR #8393](https://github.com/unslothai/unsloth/pull/8393)** — Avoids parsing large tokenizer JSON files when detecting non-audio text checkpoints.

## Stability & Regressions

- **High — Windows native GGUF paths break chat completions** — [Issue #8368](https://github.com/unslothai/unsloth/issues/8368) and [Issue #8375](https://github.com/unslothai/unsloth/issues/8375): `C:\...` paths are split at the drive letter, causing `503 model_switch_failed`. Fix PR exists: [PR #8391](https://github.com/unslothai/unsloth/pull/8391).
- **High — Muse Glimmer GGUF cannot load in bundled llama.cpp** — [Issue #8345](https://github.com/unslothai/unsloth/issues/8345): the bundled `llama-server` does not recognize the `muse-glimmer` GGUF architecture. Closed, but verify before deploying.
- **High — MiniMax M3 GGUF fails on Apple Silicon** — [Issue #8360](https://github.com/unslothai/unsloth/issues/8360): `missing indexer.head_count metadata` when loading `unsloth/MiniMax-M3-GGUF`.
- **Medium — ROCm Whisper runtime pairing failure** — [Issue #8364](https://github.com/unslothai/unsloth/issues/8364): missing `hipblaslt` kernel catalog. Windows ROCm slim pairing fix is in [PR #8379](https://github.com/unslothai/unsloth/pull/8379).
- **Medium — AMD VRAM instability** — [Issue #7164](https://github.com/unslothai/unsloth/issues/7164) (models leaving VRAM when idle) and [Issue #7452](https://github.com/unslothai/unsloth/issues/7452) (VRAM usage not read on RDNA3).
- **Medium — NVFP4 load failure on 5060 Ti 16 GB** — [Issue #8246](https://github.com/unslothai/unsloth/issues/8246).
- **Medium — sd-cli SIGABRT on AMD video generation** — [Issue #8322](https://github.com/unslothai/unsloth/issues/8322): backend buffer allocation failure under Auto/group memory policy.
- **Older/open issues still active** — GLM-OCR load failure ([#4269](https://github.com/unslothai/unsloth/issues/4269)), sampling inside `TrainingCallback` ([#3538](https://github.com/unslothai/unsloth/issues/3538)), AMD Ryzen AI install bug ([#8335](https://github.com/unslothai/unsloth/issues/8335)), AutoRound model load failure ([#7997](https://github.com/unslothai/unsloth/issues/7997)).

## What This Means for Application Developers

- **On Windows with local GGUFs**: use forward-slash paths or wait for [PR #8391](https://github.com/unslothai/unsloth/pull/8391) before relying on native `C:\` model paths in Studio.
- **Muse Glimmer 30B** is immediately worth evaluating for local coding/agentic deployments; validate that your bundled llama.cpp/GGUF loader supports the new `muse-glimmer` architecture.
- **AMD/ROCm users** should track [PR #8323](https://github.com/unslothai/unsloth/pull/8323) and [PR #8379](https://github.com/unslothai/unsloth/pull/8379) closely — both directly impact memory sizing and Whisper/audio runtime reliability.
- **OpenAI-compatible API consumers**: watch [PR #7984](https://github.com/unslothai/unsloth/pull/7984) for new audio endpoints and [PR #8372](https://github.com/unslothai/unsloth/pull/8372) for Claude 5 / GPT-5.5 sampling-parameter compatibility changes.
- **Studio operators** should upgrade once the Windows path fix and LoRA-scan offload land; they remove two common causes of `503` errors and event-loop stalls.

</details>