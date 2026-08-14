# AI 基础设施日报 2026-08-14

> 生成时间: 2026-08-14 02:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## 1. 生态全景

当前 AI 基础设施处于“模型迭代速度 > 引擎适配速度”的紧平衡状态。DeepSeek-V4、Kimi-K3、Qwen3.5/3.6 等新一代架构在发布后 24 小时内即被 vLLM/SGLang 纳入深度优化管线，且优化焦点已从“能跑”转向稀疏注意力、分布式通信、投机解码等性能调优。同时，多后端（ROCm、OpenVINO、SYCL、Metal）与桌面/边缘部署需求推动本地运行时快速扩展，但稳定性问题（多节点死锁、device loss、静默错误）成为各项目共同的短板。Agent 工作负载正成为 KV Cache 策略与投机解码优化的核心场景。

## 2. 各项目活跃度对比

| 项目 | Releases | PR 更新（日报提及/全库） | Issues（日报提及/全库） | 备注 |
|---|---|---|---|---|
| vLLM | 0 | ~15 个 PR 提及 | ~15 个 Issue 提及 | v0.27.0 稳定性回归跟进为主 |
| SGLang | 0 | 467 个 PR 更新（全库） | ~20 个 Issue 提及 | 高活跃，性能优化密集 |
| llama.cpp | 10（b10411 → b10423） | ~15 个 PR 提及 | ~17 个 Issue 提及 | 高频发版，多后端修复 |
| Ollama | 1（v0.32.11） | ~13 个 PR 提及 | ~11 个 Issue 提及 | 聚焦 `ollama launch` 集成 |
| LiteLLM | 1（v1.98.0-dev.2） | ~13 个 PR 提及 | ~11 个 Issue 提及 | 修复 GPT-5.x 兼容性 |
| Unsloth | 1（v0.1.702-beta） | 205 个 PR 更新（全库） | 49 个 Issue（全库） | 桌面版首日反馈爆发 |

## 3. 模型支持竞速

- **DeepSeek-V4 / Kimi-K3**：vLLM 与 SGLang 处于第一梯队。vLLM 已合入 IndexCache（#49085）、DCP 直写 MLA 布局（#52239）、Blackwell GEMM-RS（#52079），并有专门 ROCm 跟踪（#41820）；SGLang 进入纯性能优化阶段（#33636），跟进 NVIDIA Perf 与 ROCm 优化。llama.cpp 对 Kimi-K3 仅有文本模型 PR（#26185），DeepSeek-V4 仍以修复 Vulkan/ROCm 问题为主；Ollama 尚未覆盖这两种架构。
- **Qwen 系列**：SGLang 有 Qwen3.5 验证加速（#34517）与 Qwen3.8 tuned MoE 配置（#34795）；llama.cpp OpenVINO 已支持 Qwen3.5（b10419），SYCL 优化针对 Qwen3.6；vLLM 有 Qwen3.5 MTP 问题反馈（#47277）说明已支持；Unsloth 已支持 Qwen3.5 训练。Ollama 仍停留在社区请求阶段（#17720）。整体上 Qwen 系列覆盖最广、适配最快。
- **其他新架构**：MiniMax-M3 MXFP4 推理修复（vLLM）、Gemma4 启动问题（vLLM/llama.cpp/Ollama）、Nemotron MLX 视觉（Ollama）、GLM-5.2 DSA 快速路径（SGLang）、gpt-oss OpenVINO 支持（llama.cpp）。

结论：服务端推理引擎（vLLM/SGLang）在最新大模型支持上领跑，llama.cpp 在后端多样性与覆盖面上占优，Ollama 与 LiteLLM 更偏向应用层消费与兼容。

## 4. 性能优化前沿

- **KV Cache 管理与重用**：SGLang 推进两个 RFC——程序化 KV Cache（#27574）和位置无关重用（#30928）；vLLM 的 IndexCache 实现稀疏 MLA 层间 top-k 复用；llama.cpp 向量化 V-cache F16→F32 转换。
- **投机解码/验证**：SGLang 利用 grouped-head shared KV 加速 EAGLE 验证（#34517）；llama.cpp 实现 draft 模型自动识别与后端采样（b10413/b10415）；vLLM 的 DSD 仍有性能回退问题（#49986）。
- **分布式通信**：vLLM DCP prefill 直写 MLA 布局、Blackwell GEMM-RS 融合；SGLang 规划 NCCL 2.30（zero-SM one-sided、RAS 监控）；llama.cpp 聚焦 RPC 安全与稳定性。
- **算子融合与量化**：SGLang 在 ROCm 上融合 FP8 量化至 RMSNorm（#34502）、消除 BMM 转置拷贝（#34498）；llama.cpp Metal 新增 TQ2_0 三元量化、SYCL q4_K FFN 融合；vLLM 修复 MiniMax-M3 MXFP4 加载。
- **调度与可观测性**：vLLM MRV2 启用 encoder CUDA graph；llama.cpp 使 `/metrics`、`/slots` 在 decode 期间可访问（#27041）。

## 5. 分层定位差异

| 项目 | 层次 | 核心定位 |
|---|---|---|
| vLLM | 服务端推理引擎 | 面向生产部署的高吞吐推理，PagedAttention、连续批处理、前沿模型优化 |
| SGLang | 服务端推理引擎 | 与 vLLM 竞争，RadixAttention、激进的新模型适配、深度 ROCm 调优 |
| llama.cpp | 本地/边缘运行时 | 轻量、多后端（CPU/CUDA/Metal/Vulkan/OpenVINO/SYCL），易嵌入 |
| Ollama | 本地模型运行时 | 基于 llama.cpp 的上层封装，提供模型管理、API 服务与桌面体验 |
| LiteLLM | LLM 网关 | 统一 API、路由/负载均衡、预算与安全审计，不负责模型计算 |
| Unsloth | 训练/微调框架 | 高效 LoRA/QLoRA/GRPO 训练，附带推理服务；桌面版覆盖全流程 |

## 6. 值得关注的趋势信号

1. **模型迭代加速，引擎竞争白热化**：DeepSeek-V4、Kimi-K3 发布后即进入深度性能优化阶段，稀疏注意力、分布式通信、投机解码成为核心战场。
2. **Agent 工作负载重塑引擎优先级**：KV Cache 重用、draft 模型自动加载、后端采样、结构化输出成为高频关键词，直接服务多轮工具调用与 RAG。
3. **多后端是标配，但稳定性是短板**：ROCm、SYCL、OpenVINO、Metal 各后端均出现 device loss、结果错误、性能回退等问题；生产部署需做目标硬件验证。
4. **安全与正确性隐患突出**：Unsloth GRPO 静默忽略 LoRA（#8701）、llama.cpp RPC 未认证漏洞（#25299）、LiteLLM Langfuse 凭据泄露（#36862）等，提示自动化流程需增加显式校验。
5. **桌面端一体化工具出现**：Unsloth Desktop 首日收获 49 Issues/205 PRs，表明开发者对“本地训练-推理-部署”全流程集成有强烈需求。
6. **Agent 开发者应关注**：投机解码采样参数（`p_min`）、KV Cache 命中率优化、工具调用协议认证差异（如 Unsloth 不识别 `x-api-key`）、以及多节点 DSpark 死锁等已知问题。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 · 2026-08-14

## 1. 今日速览

今日社区焦点集中在 **v0.27.0 稳定性回归**（DeepSeek-V4-Flash 加载失败、Gemma4 启动失败、4 节点 TP=4 空闲后死锁均无修复 PR），以及 **DeepSeek-V4 / Kimi-K3 的性能优化密集推进**（IndexCache、GEMM-RS、DCP 直接发布 MLA 布局）。此外，MRV2 生态加速合入——spec decode draft model 支持、多模态 encoder CUDA graph、确定性解码重放（`trace_decode_token_ids`）均在过去 24 小时有更新。

---

## 2. 版本发布与破坏性变更

无新版本发布（过去 24 小时无 Release）。以下变更值得关注：

- **[PR #48684] 移除 `override_attention_dtype`**：该参数仅为 V0 遗留，已在 V1 移除后成为死代码。若仍在使用该参数，升级后需删除。  
  https://github.com/vllm-project/vllm/pull/48684

- **[PR #52236] 移除 `FireRedLIDForConditionalGeneration` 架构**，并加入 `_PREVIOUSLY_SUPPORTED_MODELS`（标记为 "0.27.0"）。共享的 `conformer_encoder.py` 保留（`FireRedASR2` 仍在使用）。对此架构有依赖的部署需锁定 v0.27.x。  
  https://github.com/vllm-project/vllm/pull/52236

- **[PR #51777] Docker 镜像升级 nixl 至 1.3.2**：修复 kv-connector 层二次安装时 `--no-deps` 绕过 nixl 元包版本约束的问题。  
  https://github.com/vllm-project/vllm/pull/51777

---

## 3. 新模型与硬件支持

- **[PR #51910] MiniMax-M3 MXFP4（compressed-tensors 格式）推理修复**：CT `mixed-precision` 格式下 vision tower 在 ignore 列表中未量化，此前加载时直接 `KeyError`，现正常支持。  
  https://github.com/vllm-project/vllm/pull/51910

- **[PR #49085] DeepSeek-V4 增加 IndexCache 支持（Hopper）**：C4 稀疏 MLA 层相邻层可复用 indexer top-k 选择结果，避免逐层重复计算 sparse indexer。  
  https://github.com/vllm-project/vllm/pull/49085

- **[Issue #41820] DeepSeek-V4 在 ROCm 后端的端到端启用与优化跟踪**：覆盖 mHC/HCA/CSA/MoE/MTP 多个关键模块，当前状态 Open。  
  https://github.com/vllm-project/vllm/issues/41820

- **[Issue #50682] Kimi-K3 在 ROCm 的差距与路线图跟踪**：Day 0 已集成 AITER fused-moe（a16w4 / a8w4），后续持续补齐性能。  
  https://github.com/vllm-project/vllm/issues/50682

- **[PR #52239] Kimi-K3 DCP prefill KV 直接以 MLA 布局发布**：替代 rank-major gather + 本地重组，multicast publisher 直接写入请求-major 紧凑布局，分 `kv_c` 与 `k_pe` 两个平面。  
  https://github.com/vllm-project/vllm/pull/52239

- **[PR #52079] Kimi-K3 增加 GEMM-RS 内核（Blackwell）**：基于 CUTLASS CuTeDSL `multimem.ld_reduce`，支持任意 M 值（如 M=1023），仅在 M 满足约束时启用（状态 CLOSED）。  
  https://github.com/vllm-project/vllm/pull/52079

---

## 4. 性能与优化

- **[PR #49085] DeepSeek-V4 IndexCache**：C4 稀疏 MLA layer 间复用 top-k 索引，减少 indexer 重复计算（详见上节）。  
  https://github.com/vllm-project/vllm/pull/49085

- **[PR #52239] Kimi-K3 DCP prefill 直写 MLA 布局**：消除 rank-major 中间张量的本地物化与 Python 重组开销。  
  https://github.com/vllm-project/vllm/pull/52239

- **[PR #52079] Blackwell GEMM-RS（Reduce-Scatter）**：为序列并行场景提供 GEMM+RS 融合内核，支持任意 M。  
  https://github.com/vllm-project/vllm/pull/52079

- **[Issue #38175] ViT 全 CUDA Graph 支持（Tracker）**：Qwen3-VL / GLM-V / Kimi K2.5 等多模态模型 ViT encoder 的 kernel launch 开销优化，RFC 跟踪中。  
  https://github.com/vllm-project/vllm/issues/38175

- **[PR #49852] MRV2 多模态 encoder CUDA graph**：在 model runner v2 上启用 encoder cuda graph，测试 `test_vit_cudagraph.py`。  
  https://github.com/vllm-project/vllm/pull/49852

- **[Issue #45861] DeepSeek-V4 性能优化任务清单**：多个关联 PR（#45061、#45863、#44577 等）已完成，持续跟踪中。  
  https://github.com/vllm-project/vllm/issues/45861

- **遗留性能问题（无 fix）**：
  - [Issue #47277] Qwen3.5 native MTP 即使 acceptance 达 82–88% 仍慢于 no-MTP CUDA graph 基线  
    https://github.com/vllm-project/vllm/issues/47277
  - [Issue #49986] DSD（Dynamic Speculative Decoding）在 production 默认配置下相比 no-spec 有明显 baseline tax，`PIECEWISE` 为已知因素  
    https://github.com/vllm-project/vllm/issues/49986
  - [Issue #49548] DSD 在 batch size 阈值附近（MTP, V1/PIECEWISE）出现聚合吞吐崩塌  
    https://github.com/vllm-project/vllm/issues/49548

---

## 5. 稳定性与回归

按严重程度排列：

| 严重度 | Issue/PR | 问题 | 状态 |
|---|---|---|---|
| 🔴 严重 | [#51921](https://github.com/vllm-project/vllm/issues/51921) | **v0.27.0 在 4 节点 TP=4（GB10/sm_121, aarch64）空闲约 1 分钟后永久 stall**：shm_broadcast writer 饥饿，请求无法进入 scheduler，API 仍响应 `/v1/models` | Open，无 fix |
| 🔴 严重 | [#51758](https://github.com/vllm-project/vllm/issues/51758) | **v0.26.0 → v0.27.0 升级后 DeepSeek-V4-Flash 报错无法运行** | Open，无 fix |
| 🟠 高 | [#51744](https://github.com/vllm-project/vllm/issues/51744) | **最新镜像（vLLM 0.27.0 + Transformers 5.15.0）启动 Gemma4（NVFP4, TP=2）失败** | Open，无 fix |
| 🟠 高 | [#40756](https://github.com/vllm-project/vllm/issues/40756) | **MTP speculative decoding 长序列非法内存访问**（Qwen3.6-27B-FP8, v0.19.1, num_spec_tokens=5） | Open，无 fix |
| 🟠 高 | [#41623](https://github.com/vllm-project/vllm/issues/41623) | **decode context parallelism（`--decode-context-parallel-size`）输出漂移/乱码**（v0.21.0 与 nightly） | Open，无 fix |
| 🟠 高 | [#37035](https://github.com/vllm-project/vllm/issues/37035) | **qwen3_next_mtp num_spec_tokens=5 高负载下 `cudaErrorIllegalAddress`**（gdn_attn.py:237） | Open，无 fix |
| 🟡 中 | [#52071](https://github.com/vllm-project/vllm/issues/52071) | **pipeline parallelism + spec decode 在 `--no-async-scheduling` 下输出错误**（PP=2/4/8 均可复现） | Open，无 fix |
| 🟡 中 | [#51853](https://github.com/vllm-project/vllm/issues/51853) | **DeepSeek-V4 Pro MTP 在 MI325X（gfx942, TP8）上性能差且不稳定**（ROCm 内核未调优） | Open，无 fix |

**已有修复 PR 的问题：**

- **[PR #52243] 修复 `fused_add_rms_norm` 舍入语义与 native IR 不一致**（fixes #52104），涉及 CUDA `vllm_c` vectorized/generic kernel。  
  https://github.com/vllm-project/vllm/pull/52243

- **[PR #52232] NIXL HMA receive 错误现在 fail closed**：此前 HMA block ID 因跨 pool 作用域被 worker 省略，失败请求会被误报为成功；现正确传播失败信号。  
  https://github.com/vllm-project/vllm/pull/52232

- **[PR #52241] 放宽 `flashinfer.comm` import guard**：`except ImportError` 改为更宽的异常捕获，避免 flashinfer-python 0.6.16.post3 在 import 时抛 `TypeError` 导致 EngineCore 启动中止。  
  https://github.com/vllm-project/vllm/pull/52241

- **[PR #52235] 修复 packed weight transfer 对 0 维（scalar）张量的支持**：`pack_tensors` / `packed_ipc_producer` 在 reinterpret 为 `uint8` 时因 `dim() == 0` 崩溃。  
  https://github.com/vllm-project/vllm/pull/52235

- **[PR #47681] 修复 OpenAI/Anthropic 兼容层 inline system message 渲染**：DeepSeek-V4-Flash 的自定义 encoder 会将 inline system message 拼接到前一条 user span 末尾，导致 `QLATESYS` 式错误，现改为渲染前合并。  
  https://github.com/vllm-project/vllm/pull/47681

---

## 6. 对应用开发者的意义

- **升级 v0.27.0 需谨慎**：#51758（DeepSeek-V4-Flash 加载失败）与 #51744（Gemma4 启动失败）均影响最新稳定版；#51921 则影响 4 节点 GB10 集群的空闲恢复，长时间托管服务建议暂缓升级并关注修复 PR。/v1/models 等控制面接口正常但推理面静默不可用，这类故障最难发现，建议增加请求级健康探测。

- **gpt-oss 多轮对话仍有已知问题**（#23567，47 评论、22 👍）：`openai_harmony.HarmonyError: unexpected tokens remaining in message header` 在 v0.10.1/0.10.1.1 上仍存在，使用 gpt-oss-120b 的线上服务需规避多轮场景或自行做消息头截断。

- **确定性解码新能力值得关注**：[PR #46701] 新增 `SamplingParams.trace_decode_token_ids`，强制 sampler 按预置序列逐步输出 token，同时保留真实 logprobs/ranks。对评测、回归测试、Agent 行为复现非常实用。

- **DSpark + logprobs 解锁**：[PR #52242] 移除了 `enable_adaptive_verification` 对 logprobs 的限制，此前 adaptive verification 下无法获取 logprobs，现可同时开启。对此功能的开发者可跟踪合入进展。

- **多模态应用延迟可期**：ViT full CUDA graph（#38175）与 MRV2 encoder cuda graph（#49852）持续推进，Qwen3-VL、GLM-V、Kimi K2.5 等视觉模型的首 token 延迟有望在后续版本获得明显改善。

- **DeepSeek-V4-Flash 对话格式修复**：#47681 修复了 inline system message 被渲染为普通 content 拼接的问题。若你的应用依赖 Anthropic/OpenAI 格式的系统消息穿插（如 `[user, system, user]`），此修复将影响输出质量。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-14

## 1. 今日速览

过去 24 小时 SGLang 仓库保持高活跃度（467 条 PR 更新）。DeepSeek V4 已从功能支持进入纯性能优化阶段（#33636），而 Agentic 负载的 KV Cache 重用成为设计焦点——两个 RFC（#27574、#30928）正在推进更智能的前缀缓存策略。ROCm 侧优化密集落地，多个 PR 针对 MI355X 的 FP8 量化和注意力输出路径消除冗余拷贝（#34498、#34502）。稳定性方面，多节点 TP rank 分歧死锁（#33289）仍是值得关注的高危问题。

## 2. 版本发布与破坏性变更

无。

## 3. 新模型与硬件支持

- **DeepSeek V4 路线图持续更新**（[#23602](https://github.com/sgl-project/sglang/issues/23602)）：Hopper W4A16、Day0 PR 等已完成，功能支持进入收尾阶段；同日 NVIDIA Perf Tracking issue（[#33636](https://github.com/sgl-project/sglang/issues/33636)）单独跟踪 SM90/SM10X 性能，未完成项包括 TRT-LLM DSv4 attention for SM100/103。
- **Kimi K3 进入 bug 跟踪期**（[#32607](https://github.com/sgl-project/sglang/issues/32607)）：Day0 支持已发布，含 DSpark 变体和 bug 跟踪链接，社区关注度高（👍 16）。
- **NCCL 2.30 功能集成计划启动**（[#32774](https://github.com/sgl-project/sglang/issues/32774)）：覆盖 NCCL EP、cross-group M-to-N 传输、zero-SM one-sided 通信、运行时 RAS 监控等对 serving 场景有价值的能力。
- **H20 新增 Qwen3.8（Qwen3_5MoeForCausalLM）tuned MoE 配置**（[#34795](https://github.com/sgl-project/sglang/pull/34795)）：首个 triton_3_7_1 配置目录，E=512, N=256, fp8_w8a8, block_shape=[128,128]。
- **Ascend NPU 支持持续扩展**：Gemma-3 滑动窗口注意力 decode 修复（[#34557](https://github.com/sgl-project/sglang/pull/34557)）、NPU 流式会话支持（[#32597](https://github.com/sgl-project/sglang/pull/32597)）、HiCache Ascend Mamba 主机传输（[#32275](https://github.com/sgl-project/sglang/pull/32275)）。

## 4. 性能与优化

- **Qwen3.5 验证加速（AMD）**：[#34517](https://github.com/sgl-project/sglang/pull/34517) 利用 grouped-head shared KV 在 EAGLE target verification 中避免重复处理，对 Qwen3.5-397B TP2 场景有显著收益。
- **GLM-5.2 DSA 快速路径**：[#31324](https://github.com/sgl-project/sglang/pull/31324) 在 `kv_len <= index_topk` 时跳过索引器 logits GEMM + top-k 选择，直接使用 k-only 缓存路径。
- **ROCm FP8 算子融合**：[#34502](https://github.com/sgl-project/sglang/pull/34502) 将 per-token FP8 激活量化融合进 RMSNorm，去除独立量化 kernel；[#34498](https://github.com/sgl-project/sglang/pull/34498) 直接以 o_proj epilogue 所需布局输出 a8w8 BMM 结果，消除转置拷贝。均在 MI355X + Kimi-K2.7-Code-MXFP4 上验证。
- **DeepSeek V4 paged_mqa_metadata kernel 优化**（[#25855](https://github.com/sgl-project/sglang/pull/25855)，已关闭）：Phase 3 原先依赖单 SM 串行推进 prefix 数组，`bs ≥ 1024` 时开销显著，重构后可释放其余 SM 并行度。
- **LM head GEMM 输出考虑回退 fp32**（[#34790](https://github.com/sgl-project/sglang/pull/34790)）：WIP，针对 [#33627](https://github.com/sgl-project/sglang/issues/33627) 讨论中 BF16 截断对 RL/训练场景的影响。

## 5. 稳定性与回归

**高危**

- **多节点 TP rank 分歧死锁**（[#33289](https://github.com/sgl-project/sglang/issues/33289)）：DeepSeek-V4-Flash + DSpark 跨 2 节点 TP=2 时，rank A 卡在 NCCL proxy append，rank B 空闲在 request broadcast。暂无 fix PR。
- **DSpark compact ragged CUDA Graph 请求槽几何不兼容**（[#34384](https://github.com/sgl-project/sglang/issues/34384)）：同一 token tier 使用不兼容的 request-slot 布局，可能导致非法内存访问。暂无 fix PR。

**中危**

- **HiCache + PP 不一致**（[#27010](https://github.com/sgl-project/sglang/pull/27010)）：修复 PR 仍在进行中，已引入两种同步机制解决多 PP rank 分歧导致的 crash。
- **Diffusion native-fallback 丢 CPU offload 决策**（[#34772](https://github.com/sgl-project/sglang/issues/34772)）：组件加载降级到 native path 时自动和显式 CPU-offload 标志被静默丢弃，8GB GPU 上直接 OOM。
- **ROCm MI355 HiCache 在 agentic 工作负载下性能差**（[#34611](https://github.com/sgl-project/sglang/issues/34611)）：无 fix PR。

**低危 / 特定配置**

- **Mamba + NEXTN 验证阶段 TypeError**（[#34786](https://github.com/sgl-project/sglang/issues/34786)）：`mamba_next_track_idx is None` 导致崩溃；重复提交的 [#34787](https://github.com/sgl-project/sglang/issues/34787) 已关闭。无 fix PR。
- **GPT-OSS + require_reasoning + json_schema 输出畸形**（[#31019](https://github.com/sgl-project/sglang/issues/31019)）：Harmony 格式缺少 Role 和 Channel 字段。
- **fa3 backend 在 H20 + mla page-size 64 下性能回退**（[#31310](https://github.com/sgl-project/sglang/issues/31310)）。
- **SGLang 不支持 hidden_size=4096 / moe_intermediate_size=2048 的 DeepSeek-V4-Flash 配置**（[#30595](https://github.com/sgl-project/sglang/issues/30595)）：Triton fused MoE 断言失败。
- **Qwen3.5 在 AMD MI355X 上 zero-grid launch 导致 HIP invalid configuration**（[#31794](https://github.com/sgl-project/sglang/pull/31794)）：已在 PR 中修复。

## 6. 对应用开发者的意义

- **Agentic 工作负载的 KV Cache 策略正在演进**：两个 RFC——[#27574](https://github.com/sgl-project/sglang/issues/27574)（Programmatic KV Cache，从引擎外部预测 KV block 价值）和 [#30928](https://github.com/sgl-project/sglang/issues/30928)（位置无关的 KV Cache 重用，解决 RadixAttention 对字节相同但偏移不同的内容无法命中的问题）——直接关系到多轮工具调用和 RAG 场景的 prefix 命中率。建议构建 agent 应用的团队关注设计讨论。
- **Rust 网关与 Python 协议不同步的坑**：sgl-model-gateway v0.3.2 拒绝 `type: "custom"` 的工具定义，导致 OpenAI Codex CLI 等客户端无法使用（[#30781](https://github.com/sgl-project/sglang/issues/30781)）。如果你的应用依赖非标准工具类型，需要等待协议同步修复或绕过网关。
- **CLI 插件化正在推进**：[#34753](https://github.com/sgl-project/sglang/pull/34753) 为 `sglang serve` 引入可扩展后端插件，解决生态项目（如 SGLang-Omni）发布同名 console script 导致的安装冲突。对在此之上构建集成工具的开发者是利好。
- **DeepSeek V4 / Kimi K3 的 Day0 支持已就绪**：但多节点 DSpark（[#33289](https://github.com/sgl-project/sglang/issues/33289)）和特定 MoE 配置（[#30595](https://github.com/sgl-project/sglang/issues/30595)）仍不稳定，生产部署前建议先在目标硬件上跑通验证。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 — 2026-08-14

## 1. 今日速览

今日从 b10411 快速迭代至 b10423，核心看点：OpenVINO 后端落地 Qwen3.5 与 MXFP4 支持，SYCL 引入 host pinned memory 优化 host→device 传输，Metal 新增 TQ2_0 三元量化，spec/MTP draft 模型自动检测与后端采样逐步成熟。稳定性方面，Vulkan/ROCm/SYCL/Metal 多后端仍有 device loss 与解码正确性问题报告，CUDA/OpenCL 已有针对性修复 PR 在途。

---

## 2. 版本发布与行为变更

过去 24h 共发布 10 个版本（b10411 → b10423），主要变更：

- **b10423** — common: 统一各工具的 CPU 参数（`--cpu-mask` / `--cpu-range` / `--cpu-strict` 等），跨工具行为将趋于一致，升级后建议验证 CPU 亲和性配置是否按预期生效。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10423
- **b10419** — OpenVINO: 支持 Qwen3.5 系列、MXFP4 量化、gpt-oss MoE，以及内存优化和 recurrent-state-rollback 测试。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10419
- **b10418** — SYCL: 支持 host pinned memory，改善 Host-to-Device 内存访问吞吐。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10418
- **b10417** — chat: 修复 LFM2 工具调用参数名前缀歧义问题。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10417
- **b10416** — server: `index.html` 改为 no-cache 提供（原为 `max-age=31536000, immutable`），修复 Web UI 被浏览器长期缓存导致不更新的问题。属于缓存策略变更，用户升级后首次加载会重新拉取。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10416
- **b10415 / b10413** — spec/MTP draft 模型类型自动检测（从 HF 仓库 sidecar 或本地 GGUF 元数据）。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10415  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10413
- **b10414** — Metal: 新增 TQ2_0 三元量化支持。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10414
- **b10412** — spec: dflash 与 dspark 均启用后端采样，并支持 `p_min > 0`。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10412
- **b10411** — ggml-cpu: 向量化 flash-attention V-cache 的 F16→F32 转换。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10411

---

## 3. 新模型与硬件支持

- **OpenVINO 后端支持 Qwen3.5 + MXFP4**（b10419）：同时支持 gpt-oss MoE，OpenVINO 用户的模型覆盖度明显扩大。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10419
- **Metal 新增 TQ2_0 三元量化**（b10414）：面向 2-bit-per-element 的 GGML_TYPE_TQ2_0，配套优化了 mul_mv kernel（整数运算转浮点、预计算 su）。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10414

**进行中的模型/架构 PR：**

- **Kimi-K3 文本模型**（PR #26185）：混合 KDA（线性）+ MLA 注意力，另含 cross-layer residual attention、latent MoE、situ activation 等新结构。  
  https://github.com/ggml-org/llama.cpp/pull/26185
- **Zamba2 架构支持**（PR #21412）：包含架构映射、张量布局与压缩调试，仍在推进。  
  https://github.com/ggml-org/llama.cpp/pull/21412
- **CUDA SM120 CUTLASS MoE prefill**（PR #26704，draft）：支持 GPT-OSS MXFP4（fused W13）与 Qwen3.6-35B-A3B NVFP4，默认关闭。  
  https://github.com/ggml-org/llama.cpp/pull/26704
- **EAGLE-3 转换修复**（PR #27040）：aux layer ids 需从 `eagle_config` 嵌套字段读取，EAGLE-3.1 checkpoint 转换将更准确。  
  https://github.com/ggml-org/llama.cpp/pull/27040

---

## 4. 性能与优化

已落地：

- **SYCL host pinned memory**（b10418）：通过 pinned buffer 提升 Host↔Device 传输效率，对 PCIe 受限的 Intel 独显/核显场景收益明显。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10418
- **CPU flash-attention V-cache 转换向量化**（b10411）：F16→F32 的 V-cache 转换不再逐元素标量执行。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10411
- **Metal TQ2_0 mul_mv kernel 优化**（b10414）：整数运算改浮点，配合预计算减少 kernel 内开销。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10414
- **OpenVINO 内存优化**（b10419）：降低推理峰值内存占用。  
  https://github.com/ggml-org/llama.cpp/releases/tag/b10419

进行中：

- **SYCL q4_K 稠密 FFN 算子融合**（PR #26779）：将 mul_mat(gate) + mul_mat(up) + GLU 融合为单一 q4_K reorder mat-vec，延续 #26015 / #26411 的融合工作，在 Arc Pro B70 上 tg128 有可测提升。  
  https://github.com/ggml-org/llama.cpp/pull/26779
- **SYCL gated-delta-net state writeback cpy 融合**（PR #26643）：移植自 #23940，在 Arc Pro B70 + Qwen3.6 27B Q4_K（48/64 层 gated_delta_net）tg128 达 23.91 tok/s。  
  https://github.com/ggml-org/llama.cpp/pull/26643
- **CPU 预填充/分词/生成优化合集**（PR #27032，draft）：作者计划拆分为多个独立 PR，关注 CPU 场景的开发者可跟进。  
  https://github.com/ggml-org/llama.cpp/pull/27032
- **Jinja 模板 quadratic cost 修复**（PR #27034）：`gather_string_parts` 的 `vector::erase` 与 `string::append` 均为平方级复杂度，修复超长上下文/多轮 chat 模板的性能退化（对应 #26974）。  
  https://github.com/ggml-org/llama.cpp/pull/27034
- **CUDA MMQ ids-path tail padding 修复**（PR #27044）：修正 MoE gate/up 投影中 `src1_q8_1` 分配的行数计算不一致问题，避免边界情况下的越界或错误。  
  https://github.com/ggml-org/llama.cpp/pull/27044

---

## 5. 稳定性与回归

按严重程度排列：

**安全风险**

- **ggml-rpc 远程未认证 NULL 指针解引用**（#25299）：`graph_compute()` 中 node id=0 被解析为 `nullptr` 后直接放入 cgraph 节点，可被远程利用导致服务崩溃。**尚无 fix PR**，RPC 服务请勿暴露公网。  
  https://github.com/ggml-org/llama.cpp/issues/25299

**崩溃 / Device Loss**

- **Vulkan: Strix Halo 上 DeepSeek-V4-Flash 数轮对话后 `vk::DeviceLostError`**（#25664，20 条评论，无 fix）。  
  https://github.com/ggml-org/llama.cpp/issues/25664
- **ROCm gfx1151 + RPC: DeepSeek V4 prefill 超过 4096 token 时 GGML_OP_TOP_K 崩溃**（#26746，8 条评论，无 fix，涉及 RPC+HIP 组合）。  
  https://github.com/ggml-org/llama.cpp/issues/26746
- **Windows ROCm 7.14 发布包缺 `hipblas.dll`**（#26996，新建，5 条评论）：GPU 无法被检测到，`--list-devices` 返回空。Windows ROCm 用户暂勿升级到该发布包。  
  https://github.com/ggml-org/llama.cpp/issues/26996
- **ROCm 加载大模型挂起**（#19482，13 条评论，无 fix）。  
  https://github.com/ggml-org/llama.cpp/issues/19482
- **Gemma 4 31B MTP 在 Vulkan 上崩溃**（#24492，12 条评论，无 fix）。  
  https://github.com/ggml-org/llama.cpp/issues/24492

**正确性 / 输出异常**

- **SYCL: 第二个 prompt 输出垃圾**（#26845，7 条评论，无 fix；与已关闭的 #21589 同族，疑为未根治）。  
  https://github.com/ggml-org/llama.cpp/issues/26845
- **Metal: DeepSeek-V4-Flash 长 agentic 对话中重复退化 + 泄漏特殊 token**（#26694，5 条评论，无 fix）。  
  https://github.com/ggml-org/llama.cpp/issues/26694
- **SWA 在 Gemma 4 上遗忘关键细节**（#25751，14 条评论，无 fix，CUDA 后端，疑似 sliding window attention 实现问题）。  
  https://github.com/ggml-org/llama.cpp/issues/25751

**功能缺陷 / 回归**

- **vision 模型 KV cache 保存不生效**（#19466，38 条评论，7👍，open enhancement）。  
  https://github.com/ggml-org/llama.cpp/issues/19466
- **Vulkan 近期版本性能回退**（#24066，38 条评论，RX 6600 + Qwen3.5-9B）。  
  https://github.com/ggml-org/llama.cpp/issues/24066

**已有修复 PR 在途的问题**

- **CUDA Volta (sm_70) f16 activation 出现 NaN**（#26044）→ PR #27016 定位为 activation scaling 问题，已在 V100 上验证。  
  https://github.com/ggml-org/llama.cpp/pull/27016
- **CUDA mul_mat_id 重复 expert id 压缩错误**（#24591）→ PR #26294 修复了 compaction kernel 用"any lane match"而非实际 match count 导致的问题。  
  https://github.com/ggml-org/llama.cpp/pull/26294
- **Hexagon FA HMX 非确定性输出**（#26759）→ PR #27042 修复队列排序问题并冗余去除 VTCM 中 scale diagonal matrix D。  
  https://github.com/ggml-org/llama.cpp/pull/27042
- **server: llama_decode 期间 /metrics、/slots 不可用**（#24866）→ PR #27041 通过 worker thread 与 `yield_to_queue` 解决。  
  https://github.com/ggml-org/llama.cpp/pull/27041
- **OpenCL flash-attention tile kernel WAR race** → PR #26434 在 k_start 循环重载共享内存前补 barrier。  
  https://github.com/ggml-org/llama.cpp/pull/26434

---

## 6. 对应用开发者的意义

1. **draft/MTP 模型开箱即用门槛降低**：b10413/b10415 使 `-md` 加载本地 draft 模型时可从 GGUF 元数据自动识别 spec 类型，不再需要手写 `--spec-type`。Qwen3.5-MTP、DeepSeek-V4-Flash 类模型集成成本下降。
2. **DeepSeek dflash/dspark 解码质量可调**：b10412 为两个 spec 路径启用了后端采样并开放 `p_min > 0`，长上下文 agentic 场景可尝试调整采样参数缓解重复问题（参见 #26694）。
3. **流式工具调用可靠性是持续改进重点**：b10417 修复了 LFM2 工具调用参数名前缀歧义（流式解析器在 `password` 与 `password_file` 这类前缀孪生参数上的贪婪匹配问题）。在构建依赖流式 tool call 解析的应用时，建议跟进此类修复并补充回归测试。
4. **server 可观测性改善**：PR #27041 让 `/metrics` 与 `/slots` 在 decode 期间可访问，对自建网关/监控系统的开发者是直接利好；b10416 修复了 Web UI 缓存固化问题。
5. **多后端部署选择拓宽，但需注意平台雷区**：OpenVINO（Qwen3.5/MXFP4）、SYCL pinned memory、Metal TQ2_0 均为好消息；但 Windows ROCm 发布包当前不可用（#26996），RPC 后端存在安全漏洞（#25299），生产环境请做好版本验证与网络隔离。
6. **OpenAI Responses API 仍未落地**（#19138，40👍）：`/v1/responses` 支持是 server 侧最高票的 feature request 之一，但目前没有对应 PR，规划依赖此 API 的应用时需保留兼容层。  
   https://github.com/ggml-org/llama.cpp/issues/19138
7. **disaggregated prefill/decode 仍在 roadmap**（#21266）：ggerganov 表示架构上已具备条件，但尚未排期实现，关注者可以订阅该 issue。  
   https://github.com/ggml-org/llama.cpp/issues/21266

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-14

## 1. 今日速览

**v0.32.11 发布**，集中落地 `ollama launch` 生态扩展：新增 Muse Code 与 DeepSeek Harness 两个 first-party 集成，并为 Muse Glimmer 推理模板做了对齐。**MLX 结构化输出**缺陷进入修复通道：此前静默忽略 JSON Schema 的问题已有两版修复（#17232 合并、#17690 合并），另有一个更完整的 XGrammar 方案在推进中（#17697）。**AMD Strix Halo VRAM 检测回归**获得针对性修复 PR（#17685），但尚未合并。

---

## 2. 版本发布与破坏性变更

### v0.32.11

- **Muse Code 集成**（[#17594](https://github.com/ollama/ollama/pull/17594)）：新增 `ollama launch muse`，自动写入 Muse Code 所需的 settings.json（绕过其 provider catalog 限制）。
- **DeepSeek Harness 集成**（[#17733](https://github.com/ollama/ollama/pull/17733)）：新增 `ollama launch dsh`，从 npm 安装 `@deepseek-ai/dsh`，支持本地与云模型。
- **Muse Glimmer 推理模板变更**（[#17732](https://github.com/ollama/ollama/pull/17732)）：Go 渲染器对齐官方 Jinja 模板。显式系统提示词中 `Reasoning effort` 被规范化为 `Reasoning strength`，且当提示已包含推理指令时不再额外添加 renderer 推理行。
  - **注意**：已配置 Muse Glimmer 显式系统提示词的用户，升级后推理行为可能发生变化，建议验证提示词效果。

---

## 3. 新模型与硬件支持

- **nemotron_h MLX 视觉支持**（[#17714](https://github.com/ollama/ollama/pull/17714)，OPEN）：实现 RADIO 视觉编码器与投影器，接入共享 MLX 媒体管线，含动态分辨率预处理、确定性 placeholder 展开、chunked feature scattering。音频仍不支持（与上游一致）。
- **Windows-on-Arm CPU 算子优化**（[#17654](https://github.com/ollama/ollama/pull/17654)，OPEN）：修复 CPU runner 未设置 `GGML_CPU_ARM_ARCH`、退化为 baseline armv8-a（无任何 dot-product 指令）的问题。仅在 `cpu_arm64` preset 中添加一行配置。
- **社区请求**：
  - Qwen3.8-2.4T-A95B-FP8 上云请求（[#17720](https://github.com/ollama/ollama/issues/17720)）
  - Agent Host Protocol 集成请求（[#17729](https://github.com/ollama/ollama/issues/17729)）

---

## 4. 性能与优化

- **后端加载规划集中化**（[#17165](https://github.com/ollama/ollama/pull/17165)，OPEN）：此前内存估算分散在 scheduler preflight、request options、runner startup 三处，导致不同阶段估算不一致。该 PR 统一为单一后端加载规划路径，修复 iGPU/mmproj 场景下"合成估算 vs 实际分配"的偏差。属于调度正确性优化，间接改善大模型加载稳定性。
- **MLX num_predict 越界修复**（[#17494](https://github.com/ollama/ollama/pull/17494)，OPEN）：MLX runner 此前忽略请求的 `num_ctx`，开放式生成仅受 checkpoint 的 `max_position_embeddings` 约束，大模型上可能无限挂起。修复后生成预算绑定请求上下文窗口。
- **Flash Attention 显式请求**（[#17477](https://github.com/ollama/ollama/pull/17477)，OPEN）：gpt-oss 在 partial offload 下 FA 被 llama-server `auto` 模式关闭导致长上下文崩溃。该 PR 对默认需要 FA 的架构显式开启。

---

## 5. 稳定性与回归

**按严重程度排列。**

### 高危

- **AMD Strix Halo VRAM 检测回归（0.30+ 容器部署）**（[#16462](https://github.com/ollama/ollama/issues/16462)）：`hipMemGetInfo()` 在 ROCm 7.2 下返回系统空闲内存而非 GPU VRAM，容器中仅显示 2GB 可用显存。
  - **修复 PR**：[#17685](https://github.com/ollama/ollama/pull/17685)（OPEN）新增 `OLLAMA_GPU_MEMORY` 环境变量 + `SmallCarveOutIGPU` 处理，尚未合并。
- **llama3.3:70b 产生垃圾 token（v0.32.2+）**（[#17379](https://github.com/ollama/ollama/issues/17379)）：DEV/PROD 环境均复现，已排除 Prompt 变更因素，暂未见修复 PR。
- **Nemotron3.5-lightning:30b 在 AMD AI395+ 上停顿**（[#17692](https://github.com/ollama/ollama/issues/17692)）：thinking 阶段随机卡死，CTRL+C 可中断返回。无修复 PR。

### 中危

- **MLX 结构化输出静默忽略**（[#16563](https://github.com/ollama/ollama/issues/16563)）：`response_format` 在 MLX runner 中被丢弃，返回 200 但输出不受约束。
  - **修复**：[#17232](https://github.com/ollama/ollama/pull/17232)（已合并）改为显式拒绝结构化输出请求；[#17690](https://github.com/ollama/ollama/pull/17690)（已合并）实现 grammar/JSON Schema 采样支持；[#17697](https://github.com/ollama/ollama/pull/17697)（OPEN）用 XGrammar 做完整结构化输出。注意：#17232 与 #17690/#17697 行为相反（拒绝 vs 支持），最终行为取决于后续版本合并顺序。
- **`/api/chat` 静默丢弃 `audios` 字段**（[#17730](https://github.com/ollama/ollama/issues/17730)）：audio-capable 模型（gemma4:e4b）上传音频时返回 HTTP 200 但模型实际未收到音频，会"自信地"给出文本回答。属静默失败，比报错更危险。
- **`/save` 在 nemotron-3.5-lightning 上失败**（[#17735](https://github.com/ollama/ollama/issues/17735)）：报 `pull model manifest: file does not exist`，本地 manifest 有效仍复现，2026-08-14 新建，暂无响应。
- **Claude Code 模型识别与上下文窗口问题**：
  - kimi-k2.7-code:cloud 不在 Claude Code 已知模型列表中，强制回退 200k 自动压缩窗口（[#17717](https://github.com/ollama/ollama/issues/17717)）
  - Launcher 拒绝 `[1m]` 后缀，云模型上下文窗口无法传递（[#17584](https://github.com/ollama/ollama/issues/17584)）

### 低危

- **Vulkan 后端 CPU 空转**（[#13461](https://github.com/ollama/ollama/issues/13461)）：接近上下文限制或截断时单核 100% CPU，已持续数月。无修复 PR。
- **Mac 非管理员"Restart to update"失败**（[#11972](https://github.com/ollama/ollama/issues/11972)）：输入管理员凭据后更新不执行。无修复 PR。
- **WriteWithBackup 时间戳碰撞**（[#17713](https://github.com/ollama/ollama/issues/17713)）：同一文件 1 秒内多次写入会选择相同备份路径，已确认问题，核心维护者提交。
- **Gemma4 通道边界空白处理**（[#17570](https://github.com/ollama/ollama/pull/17570)，OPEN）：修复 `->` 未被翻译、thinking 偶尔不中断的问题。

---

## 6. 对应用开发者的意义

1. **MLX 结构化输出行为将变化**：目前 MLX 模型上 `response_format` 被静默忽略（#16563）。已合并的修复方向存在冲突——#17232 选择显式报错，而 #17690/#17697 选择真正实现约束采样。升级后请验证你的 MLX 模型 + 结构化输出请求：可能从"静默成功"变为"报错"或"真正生效"。
2. **`/api/chat` 静默丢弃音频是隐蔽坑**：对 audio-capable 模型（如 gemma4:e4b）传 `audios` 字段会得到 HTTP 200 + 无音频回答，务必自行校验响应内容或等官方修复（#17730）。
3. **`ollama launch` 生态在快速扩展**：Muse Code（#17594）和 DeepSeek Harness（#17733）已随 v0.32.11 落地。在 Claude Code 场景注意云模型的上下文窗口可能无法正确传递（#17717/#17584）。
4. **Claude Code + 非默认上下文窗口存在限制**：`[1m]` 后缀被 launcher 拒绝且云模型 context window 不传递，长上下文场景需要手动配置或等待修复。
5. **调度层面改进值得关注**：#17165 统一加载规划后，大模型加载失败率与显存估算精度有望提升，对依赖 Ollama 做多模型加载的网关/调度层有利。

---

*报告生成时间：2026-08-14 | 数据来源：github.com/ollama/ollama Issues/PRs/Releases*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 — 2026-08-14

## 1. 今日速览

今日修复集中在 **GPT-5.x 系列模型兼容性**：`max_tokens=1` 导致 Claude Code 探测 400 的问题已有修复 PR，Azure `gpt-5-chat` 部署的 `max_tokens`→`max_completion_tokens` 重命名也在推进中，直接影响 `/health` 健康检查与模型可用性。功能侧，**shadow eval 扩展覆盖 `/v1/messages` 与 `/v1/responses` 流量**[#36830](https://github.com/BerriAI/litellm/pull/36830)，并新增反向 shadow eval 任务[#36865](https://github.com/BerriAI/litellm/pull/36865)。安全侧，**Langfuse trace 字段限制**修复防止团队凭据经 `update_trace_keys` 泄露[#36862](https://github.com/BerriAI/litellm/pull/36862)。

## 2. 版本发布与破坏性变更

**v1.98.0-dev.2**：此开发版无功能变更说明，仅附有镜像 cosign 签名验证文档。所有 LiteLLM Docker 镜像均使用同一密钥进行 cosign 签名。

- 发布链接：[v1.98.0-dev.2](https://github.com/BerriAI/litellm/releases)

**PTU 部署计费行为变更**（[#36829](https://github.com/BerriAI/litellm/pull/36829)）：PTU（Provisioned Throughput Unit）部署在写入时将所有定价字段置零，**不再叠加按 token 计费**。此前未设置单价时会回落到公共价格表，导致用户被双重计费。部署 PTU 配置的用户需关注此变更。

## 3. 新模型与硬件支持

**模型价格表更新**（[#36788](https://github.com/BerriAI/litellm/pull/36788)）：
- 新增 `xai/grok-4.6`、`xai/grok-4.6-latest`
- 新增 `gemini/gemini-3.1-flash-tts-preview`（TTS 模型）
- 修正 `gemini-embedding-001` 停用日期

**Fireworks AI 模型在 Azure Foundry 的支持**（[#26618](https://github.com/BerriAI/litellm/issues/26618)，已关闭）：请求支持 DeepSeek V3.2、OpenAI gpt-oss-120b、Kimi K2.5、MiniMax M2.5，issue 已关闭说明支持可能已合入。

## 4. 性能与优化

- **spend-logs 保留清理任务受限**（[#36594](https://github.com/BerriAI/litellm/pull/36594)，已合并）：此前单次清理可每表删除 50 万行且无限时，批量删除可能无限持有行锁。现在清理任务有批次大小与运行时长上限，配置项可通过 dashboard 调整，并会报告清理任务对数据库的开销。
- **缓存关闭时跳过缓存簿记**（[#35438](https://github.com/BerriAI/litellm/pull/35438)）：每次同步 completion 都会执行缓存簿记与 `inspect.signature` 参数名查找。该 PR 在 `sync_set_cache` 中提前返回（当缓存禁用时），并记忆化参数名查找，减少每次调用的开销。

## 5. 稳定性与回归

### 高严重度 — 模型可用性

- **GPT-5.x `max_tokens=1` 返回 400**（[#36859](https://github.com/BerriAI/litellm/pull/36859) / [#35063](https://github.com/BerriAI/litellm/pull/35063)）：当 `max_tokens` 小到放不下一个可见 token 时，GPT-5.x 返回 400。Claude Code 的 `/model` 探测（`max_tokens=1`）因此把模型标记为不可用。已有两个 fix PR：OpenAI/Azure 路径返回长度截断的 200[#36859](https://github.com/BerriAI/litellm/pull/36859)；Anthropic 路径映射为 `stop_reason="max_tokens"` 而非 400[#35063](https://github.com/BerriAI/litellm/pull/35063)。
- **Azure `gpt-5-chat` 部署全部 400**（[#36857](https://github.com/BerriAI/litellm/pull/36857)）：`max_tokens`→`max_completion_tokens` 重命名逻辑跳过了整个 `gpt-5-chat` 系列，导致该系列部署所有请求 400、`/health` 永久不健康。PR 新增 `requires_max_completion_tokens` 谓词修复此问题。
- **Azure GPT-5.6 terra/luna 价格错误**（[#36192](https://github.com/BerriAI/litellm/issues/36192)）：Azure 侧 GPT-5.6 terra/luna 沿用 OpenAI 直连降价后的价格（OpenAI 7/30 将 Terra 降 20%、Luna 降 80%），但 Azure 从未跟进降价。成本映射数据错误会导致企业账单不准，目前无 fix PR。

### 中严重度 — 数据正确性与权限

- **`end_user` 字段被固定为第一个请求的用户**（[#31441](https://github.com/BerriAI/litellm/issues/31441)）：共享虚拟密钥下，后续请求携带不同 `user` 字段时，SpendLogs 的 `end_user` 仍保留第一个请求的值。v1.87.0 回归，影响用量审计准确性。暂无 fix PR。
- **Access Group 关联不同步**（[#36843](https://github.com/BerriAI/litellm/pull/36843) / [#36825](https://github.com/BerriAI/litellm/pull/36825)）：key 创建/更新/再生/删除时 `assigned_key_ids` 未同步；team 创建/更新/删除时 `assigned_team_ids` 未同步。导致组内模型权限与实际的 key/team 归属不一致，已有双 PR 修复。
- **Xiaomi MiMo 模型 `output_config` 参数**（[#24549](https://github.com/BerriAI/litellm/issues/24549)）：Claude Code 使用 `MiMo-V2-Pro` / `MiMo-V2-Omni` 时请求失败。暂无 fix PR。
- **Vertex AI 自定义 api_base 凭证跳过逻辑缺失**（[#19138](https://github.com/BerriAI/litellm/issues/19138)）：自定义代理无需 Google Vertex 凭证，但库仍报 `DefaultCredentialsError`。暂无 fix PR。

### 安全修复

- **Langfuse trace 凭据泄露风险**（[#36862](https://github.com/BerriAI/litellm/pull/36862)）：`update_trace_keys` 本意是允许调用方指定 request-metadata key 更新 trace，但团队成员可借此取出团队 Langfuse 凭证，且 `trace_public` 可让 trace 公开可读。修复将更新路径限制为真实的 Langfuse trace 字段。

### 其他回归与待修问题

- **预算重置问题**：内部用户已设预算后无法重置为 Unlimited（[#32474](https://github.com/BerriAI/litellm/issues/32474)）；标签预算从未重置，耗尽后永久封禁（[#27481](https://github.com/BerriAI/litellm/issues/27481)）。
- **JWT RBAC 通配符无效**（[#27536](https://github.com/BerriAI/litellm/issues/27536)）：`role_permissions.models` 做精确字符串匹配，不支持 `bedrock-claude-*` 等通配符。
- **`org_admin` 更新 team 收到 401**（[#27294](https://github.com/BerriAI/litellm/issues/27294)）。
- **/metrics 端点无法匿名访问**（[#27926](https://github.com/BerriAI/litellm/issues/27926)）：升级 1.84.0 后 Prometheus metrics 在反向代理后面临鉴权问题。
- **GoogleGenAI 适配器重复 tool_call_id**（[#27078](https://github.com/BerriAI/litellm/issues/27078)）：`functionCall` parts 用 `f"call_{func_name}"` 生成确定性 ID，同函数多次调用时冲突。

## 6. 对应用开发者的意义

- **Claude Code + GPT-5.x 用户直接受益**：`max_tokens=1` 探测 400 的修复（[#36859](https://github.com/BerriAI/litellm/pull/36859)、[#35063](https://github.com/BerriAI/litellm/pull/35063)）落地后，Claude Code 的 `/model` 选择器不再将 GPT-5.x 误判为不可用。使用 Azure `gpt-5-chat` 的部署需跟进 [#36857](https://github.com/BerriAI/litellm/pull/36857) 的合并，否则 `/health` 持续误报。
- **Shadow eval 覆盖范围扩大**：此前仅采样 `/v1/chat/completions`，现在 `/v1/messages`（Claude Code/Desktop）和 `/v1/responses` 流量也可纳入评估[#36830](https://github.com/BerriAI/litellm/pull/36830)；反向 shadow eval 任务可追踪已采用 router 的 key 是否发生质量回退[#36865](https://github.com/BerriAI/litellm/pull/36865)。
- **MCP 可观测性提升**：[#36724](https://github.com/BerriAI/litellm/pull/36724) 将 MCP 工具调用的完整客户端 HTTP 头暴露给日志回调和 hooks，此前仅记录 `content-type`，自定义头完全不可见。
- **多租户部署需关注**：Langfuse 凭据泄露修复（[#36862](https://github.com/BerriAI/litellm/pull/36862)）建议尽快跟进；access group 同步修复（[#36843](https://github.com/BerriAI/litellm/pull/36843)、[#36825](https://github.com/BerriAI/litellm/pull/36825)）影响团队/密钥的模型权限收敛，升级后应验证既有 access group 的权限边界。
- **预算/用量数据有已知缺陷**：`end_user` 字段固定（[#31441](https://github.com/BerriAI/litellm/issues/31441)）和标签预算不重置（[#27481](https://github.com/BerriAI/litellm/issues/27481)）会影响审计与预算控制，依赖这些字段做计费的团队需评估影响并跟踪修复进度。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-14

## 1. 今日速览

Unsloth 在 8 月 13 日更新中正式发布 **v0.1.702-beta，推出 Unsloth Desktop**——号称首个可在本地运行和训练 AI 模型的跨平台桌面应用，并为全部外部 Provider 加入 tool calling / web search。桌面版首日反馈量很大：24 小时内 49 个 Issue、205 个 PR 有更新，问题集中在 Windows 安装流程、AMD GPU 识别和 macOS M4 兼容性三块。最需警惕的是 **GRPO `fast_inference=True` 时 LoRA 被静默忽略** 的正确性 Bug，修复 PR #8701 已在推进。

## 2. 版本发布与破坏性变更

- **v0.1.702-beta**：Unsloth Desktop 正式发布。支持在 Windows / macOS / Linux 本地运行和训练模型，并集成"研究、导出、部署"一体化工作流。
  https://github.com/unslothai/unsloth/releases/tag/v0.1.702-beta
- **8 月 13 日更新**：为所有外部 Provider 增加 tool calling / web search 等能力——对 Agent/网关类集成是直接利好。
- **注意安装包版本滞后**：#8688 指出 README 中 Windows 下载链接仍硬编码指向 v0.1.701-beta 资产，安装请以 GitHub Releases 页面为准。 https://github.com/unslothai/unsloth/issues/8688
- **依赖版本将上调**：PR #8701 计划调高 TRL 与 datasets 版本上限（修复 GRPO rollout 问题），依赖锁定在旧版 TRL 1.10.0 的流水线需关注合入进度。 https://github.com/unslothai/unsloth/pull/8701
- **llama-server 参数面开放**：PR #8702 在模型设置中新增"额外 llama-server 参数"文本框，覆盖 CLI 全部 283 个 flag 中 Studio 未管理的部分——直接改配置可能引入不稳定因素。 https://github.com/unslothai/unsloth/pull/8702

## 3. 新模型与硬件支持

- **AMD 支持仍是重灾区**：
  - RX 5700XT 在 Desktop 中完全无法被识别（#8529，Open，10 评论，今日最高热度）： https://github.com/unslothai/unsloth/issues/8529
  - 其余 AMD 问题多为 Closed 状态：Radeon 8060S (gfx1100) RAG 嵌入 warmup 段错误（#7331）、Strix Halo 上 `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` 导致无法显存卸载（#8651）、ROCm 多卡自动选择误选 iGPU（#7624）。AMD 路径仍处于逐卡修补阶段。
- **MiniMax-H3**：两个独立问题——系统自带 sd.cpp 版本过旧不支持（#8507，Closed）；视频生成时 Qwen3VL 文本编码器权重加载失败，`sd-cli exited -6`（#8666，Open）： https://github.com/unslothai/unsloth/issues/8666
- **DeepReinforce Ornith-1.0**：社区 23 👍 请求官方优化变体与兼容支持（#6721，Open），至今无排期迹象。 https://github.com/unslothai/unsloth/issues/6721
- **MLX 预训练能力请求**：语料选择、shard packing、tokenizer word pair 计算等预训练结构支持（#8607，Open）： https://github.com/unslothai/unsloth/issues/8607

## 4. 性能与优化

- **Studio 日志风暴治理（#8763，PR）**：实测空闲 4 小时 tauri.log 达 5308 行 / 1.14 MB，其中 76% 是 access 记录、63% 来自 6 个轮询端点；按此速率 5 MiB 上限约 18 小时写满，导致前一天故障日志被覆盖。修复将静默存活轮询并阻止访问日志写入。 https://github.com/unslothai/unsloth/pull/8763
- **流式回复 CPU 饱和（#8750，PR）**：长回复会因动画 DOM 累积 + 非增量 Markdown 解析使渲染进程饱和、UI 卡死。改为移除冗余动画 DOM、增量解析并与浏览器绘制同步。 https://github.com/unslothai/unsloth/pull/8750
- **实时吞吐显示（#8700，PR）**：请求进行中即可看到 prompt 处理速度与生成速度，最终值持久化到 API 监控条目，且保持 OpenAI/Anthropic 兼容接口不变。对应需求 #8528。 https://github.com/unslothai/unsloth/pull/8700
- **聊天搜索框（⌘K）打开卡顿（#8514，PR）**：CommandList 高度随内容跳动导致 stutter，改为固定高度后再展开。 https://github.com/unslothai/unsloth/pull/8514
- **训练日志隔离（#8764，PR）**：每次训练运行独立日志文件，避免与服务器会话日志交织，便于排障。

## 5. 稳定性与回归

按严重程度排列：

- **【严重·静默错误】GRPO LoRA 被忽略（#8701，Fix PR）**：TRL 1.10.0 + `fast_inference=True` 时，rollout 实际从 base model 采样，LoRA adapter 被忽略且无报错——loss 有限、reward std 正常、退出码 0，仅有一行 regex 警告。**所有 GRPO 用户应视为高危**，修复后会将 LoRA 显式交给 vLLM 处理。 https://github.com/unslothai/unsloth/pull/8701
- **【数据正确性】tool calling 污染聊天历史（#8734，Open）**：工具调用痕迹被写入 chat history，长期对话会累积脏数据；另有 raw jsonl 未被真正导出为 jsonl 格式（#8733，Closed）。 https://github.com/unslothai/unsloth/issues/8734
- **【API 兼容】Claude Code 401（#8663，Closed）**：Unsloth 端点只接受 `Authorization: Bearer sk-unsloth-…`，不识别 Anthropic 标准的 `x-api-key` 头，导致官方 Claude Code CLI 全部请求失败。
- **【安装流程】Windows 问题群**：
  - 安装被 2 小时上限杀死，下载 cu126 PyTorch 期间无任何进度输出（#8698，Open）： https://github.com/unslothai/unsloth/issues/8698
  - 安装完成后端启动崩溃（`SSLKEYLOGFILE` 不可写）、EDR / Application Control 拦截 unsloth.exe（#8523、#8490，均 Closed）、AMD GPU 安装失败（#8508，Closed）。
- **【桌面端】macOS**：M4 / 16GB 上加载本地 GGUF 时 llama-server 启动失败，且空闲 RAM 占用异常（#8566，Open）；应用第二次启动报错（#8610，Open）。 https://github.com/unslothai/unsloth/issues/8566
- **【GGUF 导出回退】#8717（Open）**：导出 GGUF 前被迫先下载/落盘 16bit 全量权重（40GB+），中间产物阻塞流程。配套 PR #8439（Kaggle 大 overlay + 无法容纳时拒绝导出）已关闭，虽针对 Kaggle 场景，但思路可借鉴。 https://github.com/unslothai/unsloth/issues/8717
- **【其他】Kaggle T4 上 Qwen 3.5 0.8B bf16 训练崩溃（#7506，Open）**；MLX 模型装入后不出现在 `/v1/models`，API 自动切换无法加载（#8748，Open）。

## 6. 对应用开发者的意义

- **Provider 工具调用已可用**：v0.1.702-beta 为所有外部 Provider 启用 tool calling / web search，Agent 应用可经 Unsloth 网关统一接入，无需各自适配。
- **认证方式有坑**：Unsloth Studio 端点只认 Bearer token；若你的应用走 Anthropic SDK 风格（`x-api-key`）会直接 401（#8663）。网关或 SDK 适配层需做 header 转换。
- **GRPO 训练先暂停升级**：`fast_inference=True` 下 LoRA 静默失效意味着基于 TRL 1.10.0 的实验结果可能全部来自 base model，务必等 #8701 合入并验证后再跑生产实验。
- **局域网调用受限**：Desktop API 默认只监听 127.0.0.1，内网多机访问只能靠 Cloudflare tunnel（#8578，3 👍），对私有化部署团队是个硬约束。 https://github.com/unslothai/unsloth/issues/8578
- **多模态暂无 API**：音频/图像/视频生成只有 Web UI，没有程序化接口（#8752，Open），需要编程式接入的注意规划。 https://github.com/unslothai/unsloth/issues/8752
- **Studio Agent 在变强**：PR #8753 为 Studio Agent 增加 `edit_file` 工具，避免大文件被反复整体重写、上下文耗尽——值得 Agent 应用开发者关注其实现方式。 https://github.com/unslothai/unsloth/pull/8753

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*