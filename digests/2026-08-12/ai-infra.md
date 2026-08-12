# AI 基础设施日报 2026-08-12

> 生成时间: 2026-08-12 02:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-12）

## 1. 生态全景

当前 AI 基础设施生态正处于“模型架构快速迭代 vs 推理栈适配滞后”的紧张期。DeepSeek-V4 系列、Kimi-K3、GLM 5.2 等新一代 MoE/长上下文模型对底层算子、KV cache、投机解码策略提出了更高要求，导致 vLLM、SGLang、llama.cpp 等主流引擎均出现多起与这些模型相关的严重回归（如 Kimi-K3 长上下文崩溃、DeepSeek-V4 KV cache 膨胀、SM8x 不支持等）。与此同时，各家在 Blackwell/ROCm 等新硬件上的优化竞争明显加速：vLLM 补丁版本密集、SGLang 深入 SM120 性能调优、llama.cpp 将 CI 全面切至 ROCm 7.14。Agent 应用驱动下的结构化输出、工具调用、流式响应可靠性成为网关与本地运行时（LiteLLM、Ollama）的共同焦点。整体而言，生态活跃度极高，但稳定性风险随新模型发布而显著上升。

## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Releases（24h） | 备注 |
|---|---|---|---|---|
| vLLM | 大量更新（含新 bug 报告） | 多个 PR 合入/推进中 | v0.27.1 补丁 | 社区热点集中在 DeepSeek-V4 SM8x 支持（#50576，98评论） |
| SGLang | 62 条更新 | 500+ 条 PR 有更新 | 无正式版本发布 | 高活跃，但 CI 有 3 broken / 11 flaky |
| llama.cpp | 多起后端崩溃报告 | 多 PR 合并 | 连续 7 个版本（b10356–b10362） | 发布频率最高，Claude 模型修复持续 |
| Ollama | 多起回归报告 | 多个功能 PR 进行中 | v0.32.9 | 社区关注 agent 集成与 MLX 稳定性 |
| LiteLLM | 若干 bug/feature | 多个 fix PR | 7 个补丁版（v1.90.7–v1.96.2） | 发布节奏快，均有 cosign 签名，无破坏性变更 |
| Unsloth | 大量安装/兼容性问题 | 多个优化 PR | v0.1.701-beta / v0.1.70-beta + v0.1.62-beta | 首次发布 Desktop 应用，beta 阶段 bug 集中 |

*注：vLLM/SGLang 数据按摘要统计，未给出精确 issues/pr 总数；llama.cpp/Ollama 等均有明确版本号。*

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | 备注 |
|---|---|---|---|---|---|
| DeepSeek-V4 (Flash/0731) | 支持但 SM8x 不可用；0.27.x 存在回归 | 性能跟踪中，FP8/H20 有 hang | 支持，但 ROCm 输出乱码 | 未明确提及 | 新模型适配均不完善 |
| Kimi-K3 | 支持但长上下文严重退化 | 有 Delayed-Attention Helion backend | 未见明确支持 | 未提及 | vLLM 稳定性风险最高 |
| GLM 5.2 | 优化任务清单推进中 | 涉及 Wide EP 启动问题 | 未提及 | 未提及 | |
| Nemotron 3.5 Lightning | — | — | — | ✅ v0.32.9 官方支持 | Ollama 领先 |
| EXAONE 4.5 | — | — | ✅ SWA 修复 | 未见 | |
| LTX-2.5 / MiniMax H3 LoRA | — | ✅ Diffusion 新支持 | — | — | SGLang 在扩散模型上领先 |
| Qwen3.5/3.6 hybrid | — | — | 部分支持 | CUDA 回退 CPU 问题 | 三栈均有涉及 |
| Gemma4 | Docker 镜像无法加载（TF 5.15.0 不兼容） | — | 部分后端无法加载（OpenVINO） | Cloud 报错 | 各栈兼容性均不佳 |
| A.X K2 | — | — | ✅ 新架构支持 | — | llama.cpp 领先 |

**结论：** 新模型支持方面 SGLang 在扩散模型上扩展最快，Ollama 在轻量 agent 模型（Nemotron Lightning）上最敏捷，llama.cpp 在通用 GGUF 新架构上持续快速跟进，而 vLLM 虽然覆盖广但受制于算子/硬件适配，DeepSeek-V4 等热门模型的稳定性明显落后。

## 4. 性能优化前沿

| 方向 | 代表项目与举措 |
|---|---|
| **KV cache** | vLLM：NVFP4 KV cache 扩展到 pre-SM100（PR #46963）；Ollama：低比特 KV cache 导致输出退化（暴露稳定性问题）；llama.cpp：无明确 KV cache 优化，但相关 bug 在排查 |
| **投机解码** | vLLM：DSpark 置信度调度（#47808）、上下文长度感知调度（#48627）、DSD 性能税调查（#49986）；Ollama：VRAM 不足时自动弃用 drafter（Unsloth PR #8435）；llama.cpp：Glimmer drafter 优化中 |
| **批处理与调度** | vLLM：DSD 在批大小阈值处吞吐崩塌（#49548）；LiteLLM：APScheduler 抖动错峰；SGLang：DeepEPv2 ElasticBuffer 使 MoE decode 可被 CUDA graph 捕获 |
| **量化** | vLLM：W4A8 INT8 新指令（PTX `ldmatrix.s8.s4`）、Compressed-Tensors WNA16 MoE Humming 支持；SGLang：mxfp8 GEMM flashinfer cute-dsl 后端；llama.cpp：多量化崩坏问题（IQ3_XXS） |
| **分布式推理** | SGLang：SM12X FlashInfer TRT-LLM all-reduce；vLLM：ROCm 双流 decode + hipgraph（仅 DP）；llama.cpp：RPC 后端越界写漏洞（安全性）；LiteLLM：Postgres 死锁重试 |
| **算子/内核** | vLLM：ROCm MoE router fused GEMM、FlashInfer workspace 精确预留；SGLang：Radix-4 MoE router kernel、Megatron LayerNorm sequence parallelism；llama.cpp：OpenCL FA prefill 优化 |

**火力最集中**：投机解码的可靠性/自适应策略、MoE 分布式通信（DeepEP/A2A）、低比特量化内核优化，以及各硬件后端（ROCm/Blackwell/XPU）的兼容性修复。

## 5. 分层定位差异

| 项目 | 分层 | 核心定位 | 今日动态侧重点 |
|---|---|---|---|
| **vLLM** | 推理引擎 | 高吞吐生产级 LLM 服务（PagedAttention、连续批处理） | 增量版本补丁、DeepSeek-V4 适配、投机解码性能调优、FlexAttention 弃用 |
| **SGLang** | 推理引擎 | 高性能推理框架，强调图优化与多模态（Diffusion） | 新 diffusion 模型支持，SM120 优化，PP+HiCache 一致性 |
| **llama.cpp** | 本地运行时/轻量推理库 | 边缘与本地推理，跨后端（CUDA/Vulkan/ROCm/OpenCL/SYCL） | 高频发布，多后端兼容性修复、JSON schema 改进、CLI 迁移 |
| **Ollama** | 本地运行时 + 模型仓库 | 面向开发者和桌面的极简部署体验 | 新模型支持（Nemotron）、Responses API、metrics、MLX 稳定性 |
| **LiteLLM** | 网关/代理层 | 多模型统一接入、路由、计费、Guardrails | cosign 签名、计费修复、OTel 泄漏、MCP 脱敏、Rust 迁移 |
| **Unsloth** | 训练/微调 + 本地推理（Studio/Desktop） | 高效微调（QLoRA）与一键部署 | Desktop 发布、流式解析线性化、VRAM 管理、多 GPU 训练修复 |

**差异要点**：vLLM/SGLang 面向数据中心高并发，强调吞吐与高级调度；llama.cpp/Ollama 面向端侧/桌面的易用性与轻量；LiteLLM 属于控制平面，负责流量治理；Unsloth 从训练侧切入，试图纵向打通“微调→导出→部署”全链路。

## 6. 值得关注的趋势信号

1. **“模型-硬件-引擎”三角摩擦加剧**：DeepSeek-V4 和 Kimi-K3 这类超大规模 MoE 模型刚发布时，几乎每个引擎都会遇到硬件架构（SM8x）、KV cache 或调度器的适配问题。**采购 A100/A800 或计划跑新模型的生产团队需预留 2-4 周的稳定性验证窗口**，不要盲目升级到最新引擎版本。

2. **投机解码从“默认开启”进入“收益再评估期”**：vLLM 多个 issue 表明固定 k 策略在高并发下可能得不偿失，动态调度（置信度/上下文长度）成为优化前沿。**应用开发者在开启投机解码时务必基于真实流量模型压测**，避免批大小阈值附近的吞吐崩塌。

3. **Agent 应用正在反向塑造基础设施需求**：Ollama 新增 server-side web search、LiteLLM 修复 MCP 脱敏与流式空 chunk、llama.cpp 改进 JSON Schema 支持——这些都不是底层性能优化，而是围绕工具调用、结构化输出和流式可靠性的功能增强。**这是当前“模型能力”竞争之外最确定的差异化战场**。

4. **可观测性成为生产部署的标配话题**：Ollama 推出 `/metrics` 端点，LiteLLM 修复 OTel 资源泄漏，llama.cpp 重构服务器 metrics，Unsloth 引入 CUDA CI。**基础设施团队应开始统一规划模型服务的监控指标**（吞吐、KV cache 利用率、spec decode 接受率、队列深度），而不是等到故障时临时加日志。

5. **本地推理栈的“平台化”苗头**：Unsloth Desktop 把训练、推理、导出包装成桌面应用，Ollama 继续扩展 OpenRC 和 MLX，llama.cpp 加速多后端适配。**边缘/本地大模型应用将不再是“跑个 demo”，而是逐步成为可交付的产品底座**，但当前 Windows+AMD、MLX 结构化输出等成熟度问题仍需时间解决。

6. **CI/发布质量风险突出**：SGLang 3 broken/11 flaky，Unsloth 全天红，vLLM 最新镜像与 Transformers 5.15.0 不兼容，Ollama 发布流程事故。**对主分支或 `latest` 标签的直接依赖正在变得危险**，建议所有生产环境锁定精确版本，并建立基于特定模型的回归测试矩阵。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 — 2026-08-12

## 今日速览

vLLM 发布 v0.27.1 补丁版本，新增对量化 DSpark Markov heads 的支持。社区关注焦点仍集中在 DeepSeek-V4 系列：SM8x（A100/A800）支持呼声持续高涨（#50576 评论数已达 98），同时升级 0.27.0 后运行 DeepSeek-V4-Flash 报错（#51758）、0731 版本 KV cache 异常膨胀（#51041）等新问题浮出水面。稳定性方面，Kimi-K3 长上下文退化（#51039）与 vllm-openai:latest 镜像因 Transformers 5.15.0 无法启动 Gemma4（#51744）是今日最值得关注的新报告。

---

## 版本发布与破坏性变更

- **[Release] v0.27.1**：基于 v0.27.0 的补丁版本，新增对量化 DSpark Markov heads 的支持（#50424）。建议所有使用 v0.27.0 的用户升级。
  https://github.com/vllm-project/vllm/releases/tag/v0.27.1

- **[Bug] 升级 v0.26.0 → v0.27.0 后运行 DeepSeek-V4-Flash 报错**（#51758，9 评论）：用户报告升级后 DeepSeek-V4-Flash 无法正常运行，尚未有 fix PR，建议暂缓升级或回滚至 v0.26.x。
  https://github.com/vllm-project/vllm/issues/51758

- **[Bug] vllm/vllm-openai:latest（vLLM 0.27.0 + Transformers 5.15.0）无法启动 Gemma4**（#51744，9 评论，3 👍）：镜像内 Transformers 5.15.0 与 Gemma4-31B-it-qat-NVFP4 不兼容，模型加载失败。如依赖最新镜像，请关注后续修复或锁定旧版本。
  https://github.com/vllm-project/vllm/issues/51744

- **[RFC 已关闭] 弃用 FlexAttention 后端**（#50324，13 评论，7 👍）：FlexAttention 在 ROCm 上已非默认选择，CUDA 上性能落后于 TritonAttention，且维护成本高、频繁破坏 CI。项目决定弃用该后端，相关测试覆盖将被移除。
  https://github.com/vllm-project/vllm/issues/50324

- **[RFC 已关闭] Offloading Metrics 重新设计**（#44008，25 评论）：现有关卸载指标设计无法扩展至 offloading manager 自有状态（如 `vllm:kv_of...`），需重构为更通用的指标框架。
  https://github.com/vllm-project/vllm/issues/44008

---

## 新模型与硬件支持

- **[Feature] DeepSeek-V4-Flash / 0731 的 SM8x（A100/A800）支持**（#50576，98 评论，12 👍）：目前两个 checkpoint 均无法在 Ampere 架构运行。该 issue 热度极高，社区需求强烈，尚无明确时间表。
  https://github.com/vllm-project/vllm/issues/50576

- **[Tracking] DeepSeek-V4-Flash sm_80 支持跟踪**（#40851，43 评论，21 👍）：早期跟踪 issue，当前仍处于打开状态，初始化阶段 DeepGEMM 断言失败。
  https://github.com/vllm-project/vllm/issues/40851

- **[Tracking] Kimi-K3 的 ROCm 支持与性能优化路线图**（#50682，15 评论）：跟踪 AITER fused-moe（a16w4/a8w4）、Flydsl/opus 等集成工作。
  https://github.com/vllm-project/vllm/issues/50682

- **[PR] 将 NVFP4 KV cache 扩展到 pre-SM100 硬件**（#46963）：通过 FlashInfer slot-mapping API 使 Ampere（RTX 3090）和 Hopper 也能使用 NVFP4 分页 KV cache，不再局限于 SM100 原生路径。
  https://github.com/vllm-project/vllm/pull/46963

- **[PR] ROCm 支持 fused bf16→fp32 MoE router GEMM**（#50268）：解决 ROCm 上 MoE router gate 的 fp32 输出问题。
  https://github.com/vllm-project/vllm/pull/50268

- **[PR] ROCm Docker 镜像内置 LMCache KV connector**（#51208）：使 LMCache 在 ROCm 镜像中开箱即用，对齐 CUDA 镜像的 `INSTALL_KV_CONNECTORS` 行为。
  https://github.com/vllm-project/vllm/pull/51208

- **[PR] Compressed-Tensors WNA16 MoE 支持 Humming**（#48918）：使 Humming 路径可初始化 sub-byte WNA16 checkpoint，不再在 Marlin-only 路径中硬失败。
  https://github.com/vllm-project/vllm/pull/48918

- **[Perf] 采用 PTX 9.4 `ldmatrix.s8.s4` 指令优化 W4A8-INT8 路径**（#49529，13 评论）：CUDA 13.4 新增的 INT4→INT8 硬件扩展加载指令，可减少 W4A8 反量化开销。
  https://github.com/vllm-project/vllm/issues/49529

---

## 性能与优化

- **[PR] DSpark 置信度调度验证**（#47808）：根据每请求置信度自适应调整 draft 验证预算，替代固定 k 验证全部 draft token 的策略。动机是固定 k 投机在高并发下 GPU 饱和时，验证 7 个 draft 的计算开销超过 token 接受带来的收益。
  https://github.com/vllm-project/vllm/pull/47808

- **[Perf] 动态投机解码（DSD）在生产默认配置下的性能税**（#49986，9 评论）：基准测试发现所有启用 `speculative_config` 的 arm 都有显著性能损失，`PIECEWISE` 调度被识别为因素之一。
  https://github.com/vllm-project/vllm/issues/49986

- **[RFC] 上下文长度感知的投机 token 调度**（#48627，8 评论，2 👍）：提议将 `num_speculative_tokens_per_batch_size` 扩展为 `(batch, ctx)` 二维查表，根据上下文长度动态选择 K。
  https://github.com/vllm-project/vllm/issues/48627

- **[Perf/Regression] 动态投机解码在批大小阈值处导致吞吐崩塌**（#49548，6 评论）：Qwen3.5-122B MTP（k=2）场景下，`FULL_AND_PIECEWISE → PIECEWISE` cudagraph 降级导致单流约 14% 损失，并发下出现更严重的聚合吞吐崩塌。
  https://github.com/vllm-project/vllm/issues/49548

- **[Tracking] GLM 5.2 性能优化任务清单**（#46654，21 评论，9 👍）：已合并 3 个优化 PR，其余在推进中，协调频道为 Slack #sprint-glm52。
  https://github.com/vllm-project/vllm/issues/46654

- **[Tracking] 自定义 fused kernel 开发跟踪**（#25179，49 评论）：跟踪各类融合 kernel 需求，包括量化与 KV cache 正交化、新 pass 支持等。
  https://github.com/vllm-project/vllm/issues/25179

- **[PR] ROCm 双流 decode + hipgraph 支持**（#48223）：在 ROCm 上启用双流 decode 并与 hip/cudagraph 兼容，仅 DP 模式下启用（TP 下有性能回退）。
  https://github.com/vllm-project/vllm/pull/48223

- **[PR] 使用 FlashInfer workspace sizing helper**（#46883）：按 FlashInfer attention planning 所需精确预留 workspace 大小，替代总是预留默认大小的做法。
  https://github.com/vllm-project/vllm/pull/46883

---

## 稳定性与回归

按严重程度排序：

- **[严重] Kimi-K3 长上下文 prefill 后全部请求退化为重复 token**（#51039，8 评论）：约 240K token 的 prefill 处理后，部署对所有后续请求输出单一重复 token，疑似 packed KDA prefill 导致 NaN logits。影响范围大，暂无 fix。
  https://github.com/vllm-project/vllm/issues/51039

- **[严重] v0.24.0 在 Blackwell sm_120 启动时 DeepGEMM "Unknown recipe" 断言崩溃**（#47130，7 评论，6 👍）：FP8 checkpoint 在 0.23.0 正常、0.24.0 启动崩溃，已确认是回归。
  https://github.com/vllm-project/vllm/issues/47130

- **[高] B200 上 NVFP4 FlashInfer CuteDSL MoE + DeepEP 数值精度问题**（#31840，24 评论）：指定 `VLLM_MOE_DP_CHUNK_SIZE=1024` 等配置组合下出现数值精度问题，该 issue 已关闭。
  https://github.com/vllm-project/vllm/issues/31840

- **[高] DeepSeek-V4-Flash-0731 KV cache 异常膨胀**（#51041，11 评论）：KV cache 每 token 占用 56 字节，约比 preview 版本大 8 倍，7.7 GiB 仅能容纳约 150K token，`max_model_len` 因此受限。
  https://github.com/vllm-project/vllm/issues/51041

- **[中] ROCm/gfx942（MI325X）TP=4 超过 2048 token 时 GPU 内存访问错误**（#48266，6 评论）：DeepSeek-V4-Flash arch + sparse_attn_indexer + fp8 KV cache 组合，worker 崩溃。
  https://github.com/vllm-project/vllm/issues/48266

- **[中] #48137 导致 spec-decode 接受率下降 10.6%，#48660 改变输出分布**（#49927，6 评论）：生产环境 A/B 测试分离了 0.26.0 两个 PR 的独立影响。
  https://github.com/vllm-project/vllm/issues/49927

- **[中] qwen3_next_mtp + num_speculative_tokens=5 时 cudaErrorIllegalAddress**（#37035，6 评论，2 👍）：负载下 `gdn_attn.py:237` 出现非法内存访问。
  https://github.com/vllm-project/vllm/issues/37035

- **[中] Thinking-budget 状态在 batch 重排时泄漏给无关请求**（PR #51890，已关闭）：两行交换时状态未从旧行移除，导致两个无关联请求共享思考预算状态。修复 PR 已合入（mrv1-only）。
  https://github.com/vllm-project/vllm/pull/51890

- **[中] DeepGemmQuantScaleFMT 延迟初始化 + QuantFP8 UE8M0 packed path 修复**（PR #51359）：修复 RTX PRO 6000（SM120）上 FP8 kernel 套件崩溃和潜在 kernel 契约违规。
  https://github.com/vllm-project/vllm/pull/51359

- **[低] MIG UUID 在 CUDA_VISIBLE_DEVICES 中的兼容性问题**（#35295，8 评论）：vLLM 0.15.1 在 MIG 切片场景下崩溃，issue 已因 stale 关闭。
  https://github.com/vllm-project/vllm/issues/35295

---

## 对应用开发者的意义

- **DeepSeek-V4-Flash 用户请谨慎升级 0.27.x**：已有升级后报错报告（#51758），且 0731 版本 KV cache 浪费严重（#51041）。如生产环境依赖该模型，建议先在测试环境验证再升级。
  https://github.com/vllm-project/vllm/issues/51758
  https://github.com/vllm-project/vllm/issues/51041

- **A100/A800 用户运行 DeepSeek-V4 系列仍需等待**：SM8x 支持尚无具体时间表（#50576、#40851），如有采购决策可参考。
  https://github.com/vllm-project/vllm/issues/50576

- **最新镜像存在 Transformers 5.15.0 兼容风险**：`vllm/vllm-openai:latest` 当前无法启动 Gemma4 模型（#51744）。使用最新镜像的服务建议锁定版本并回归测试。
  https://github.com/vllm-project/vllm/issues/51744

- **动态投机解码（DSD）配置需充分压测**：多个 issue（#49548、#49986、#48627）表明动态投机在并发和批大小阈值附近可能导致吞吐崩塌，生产部署务必基于实际流量模型验证。
  https://github.com/vllm-project/vllm/issues/49548

- **FlexAttention 即将弃用**（#50324）：如显式配置了 FlexAttention 后端，建议迁移至 TritonAttention 以避免未来破坏性变更。
  https://github.com/vllm-project/vllm/issues/50324

- **Kimi-K3 长上下文场景存在严重退化风险**（#51039）：如服务长上下文请求，目前不建议在生产环境使用 Kimi-K3，或需限制上下文长度。
  https://github.com/vllm-project/vllm/issues/51039

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 2026-08-12

## 今日速览

- 过去 24 小时无新版本发布；GitHub 上 62 条 Issue、500+ 条 PR 有更新，项目保持高活跃度。
- 高优先级工作集中在 DeepSeek V4 性能跟踪（[#33636](https://github.com/sgl-project/sglang/issues/33636)）、SM120 性能优化计划（[#19637](https://github.com/sgl-project/sglang/issues/19637)）和 PP+HiCache 一致性修复计划（[#22607](https://github.com/sgl-project/sglang/issues/22607)）。
- CI 自动跟踪显示当前 3 条 broken、11 条 flaky（[#17050](https://github.com/sgl-project/sglang/issues/17050)），基础自动化稳定性仍需关注。

## 版本发布与破坏性变更

- **无正式版本发布。**
- 配置/默认值变更相关 PR：
  - [PR #34492](https://github.com/sgl-project/sglang/pull/34492)：XPU 后端 `SGLANG_USE_SGL_XPU` 默认改为 `true`，影响 XPU 部署的默认运行路径。
  - [PR #32330](https://github.com/sgl-project/sglang/pull/32330)：在 SM12X 上启用 FlashInfer TRT-LLM all-reduce 后端，TP>1 decode 不再退回 NCCL ring all-reduce（已关闭，可能已合并）。

## 新模型与硬件支持

- Diffusion 模型：
  - [PR #34471](https://github.com/sgl-project/sglang/pull/34471) 支持 LTX-2.5。
  - [PR #34359](https://github.com/sgl-project/sglang/pull/34359) 支持 MiniMax H3 LoRA（原生 fused 布局与 Diffusers/PEFT split-QKV 布局）。
- 硬件/后端：
  - [PR #32593](https://github.com/sgl-project/sglang/pull/32593) 为 Kimi Delta-Attention 新增 Helion backend。
  - [PR #34490](https://github.com/sgl-project/sglang/pull/34490) 为 AMD 增加 Radix-4 MoE top-k router kernel，面向 Kimi-K3 路由。
  - [PR #32745](https://github.com/sgl-project/sglang/pull/32745) 修复 Qwen3.5 GemmaRMSNorm 在 Ascend 950 上的 NPU kernel 注册问题。
  - [PR #34492](https://github.com/sgl-project/sglang/pull/34492) 默认启用 XPU SGL 后端。
  - [PR #32330](https://github.com/sgl-project/sglang/pull/32330) 在 SM120/SM121 上启用 FlashInfer TRT-LLM all-reduce。

## 性能与优化

- 进行中的性能计划：
  - SM120 Blackwell 性能优化计划（[#19637](https://github.com/sgl-project/sglang/issues/19637)）：DeepSeek V4、DeepGEMM MQA Indexer 等子项已完成。
  - DeepSeek V4 性能跟踪（[#33636](https://github.com/sgl-project/sglang/issues/33636)）：覆盖 SM90/SM10X，TRT-LLM DSv4 attention for SM100/103 仍在待办。
  - SGLang-Diffusion 路线图（[#23035](https://github.com/sgl-project/sglang/issues/23035)）：LTX-2 系列、低精度（nvfp4/mxfp4/fp8）、图级优化与 kernel fusion。
- 具体优化 PR：
  - [PR #29525](https://github.com/sgl-project/sglang/pull/29525) DeepEPv2 ElasticBuffer MoE A2A 后端：固定 per-rank 容量带来静态通信形状，使 MoE decode 路径在任意拓扑下可被 CUDA graph 捕获。
  - [PR #30915](https://github.com/sgl-project/sglang/pull/30915) Megatron LayerNorm sequence parallelism：在纯 TP 下降低 prefill 路径的 all_reduce 开销。
  - [PR #34042](https://github.com/sgl-project/sglang/pull/34042) 为 mxfp8 GEMM 增加 flashinfer cute-dsl 后端，在 sm10x 上比 persistent cutlass 更快，拟设为默认。

## 稳定性与回归

按严重程度排列：

- **高**：[#34235](https://github.com/sgl-project/sglang/issues/34235) DeepSeek-V4 FP8/H20 场景下，hierarchical cache + chunked prefill 触发 scheduler hang（watchdog abort），且 0.5.16 之后采样器出现 device-side assert。暂无直接 fix PR。
- **高**：[#34155](https://github.com/sgl-project/sglang/issues/34155) 1M-token prefill 在 8x B200 `--tp 8 --moe-a2a-backend megamoe` 下触发 CUDA OOM（DSV4 indexer fp8_mqa_logits nonpaged 路径）；同等请求在 tp8/dp8 dp-attention 下可正常服务。
- **高**：[#34389](https://github.com/sgl-project/sglang/issues/34389) Diffusion attention backend fallback 变更导致大多数模型推理报错，升级到最新版前需确认兼容性。
- **高**：[#34120](https://github.com/sgl-project/sglang/issues/34120) GLM5-2 / Kimi-K3 在 GB200/B200 上启用 Wide EP 时部署无法启动。
- **中**：[#34000](https://github.com/sgl-project/sglang/issues/34000) Diffusion multi-output rollout 存在多处问题：per-sample 轨迹坍缩到 output 0、grouped forward AttributeError、latent packing 跳过。
- **中**：[#27974](https://github.com/sgl-project/sglang/issues/27974) `rope_scaling` 通过 `--json-model-override-args` 对 VLM 模型静默失效（已关闭，可能已修复）。
- **中**：[#33660](https://github.com/sgl-project/sglang/issues/33660) W4AFP8 + DeepEP 在首次推理时所有 rank 崩溃，`TypeError: missing 'routed_scaling_factor'`（已关闭）。
- **低**：[#28019](https://github.com/sgl-project/sglang/issues/28019) Gemma-4-26B-A4B FP8 在 DGX Spark（SM121）上 fused-MoE 超过动态共享内存上限（已关闭）。
- **低**：[#24322](https://github.com/sgl-project/sglang/issues/24322) EAGLE + MiMo-V2.5 NVFP4 在 `load_merged_column_weight` 出现 shape mismatch（已关闭）。

修复/回归覆盖：

- [PR #34447](https://github.com/sgl-project/sglang/pull/34447) 修复 Qwen fused shared-expert 检测在 PP 非首 stage 初始化的崩溃（已关闭）。
- [PR #29792](https://github.com/sgl-project/sglang/pull/29792) 修复 Mamba 在 overlap scheduling 下 track-boundary 记录错误（已关闭）。
- [PR #31366](https://github.com/sgl-project/sglang/pull/31366) 在 consumer Blackwell（sm120/sm121）上跳过 `dsv3_fused_a_gemm` 失败测试（已关闭）。
- [PR #32557](https://github.com/sgl-project/sglang/pull/32557) 为 DeepSeek-V4 CP hook 排序崩溃添加回归测试（进行中）。

## 对应用开发者的意义

- **长上下文 Agent 场景需谨慎升级**：HiCache 一致性修复计划（[#22607](https://github.com/sgl-project/sglang/issues/22607)）虽然意在优化长前缀复用，但当前 DSV4 部分配置下 scheduler hang（[#34235](https://github.com/sgl-project/sglang/issues/34235)）与 1M-token prefill OOM（[#34155](https://github.com/sgl-project/sglang/issues/34155)）仍可能影响生产稳定性。
- **Diffusion/多模态生态在快速扩展**：LTX-2.5、MiniMax H3 LoRA 等支持即将或已经落地，适合相关生成类应用跟进；但 attention backend fallback 回归（[#34389](https://github.com/sgl-project/sglang/issues/34389)）会让部分已有模型在升级后失败，建议在测试环境先行验证。
- **部署配置需要重新审视**：XPU 默认后端变更（[#34492](https://github.com/sgl-project/sglang/pull/34492)）与 SM12X all-reduce 切换（[#32330](https://github.com/sgl-project/sglang/pull/32330)）会影响 TP>1 部署的通信路径；Wide EP 在 GB200/B200 上的问题（[#34120](https://github.com/sgl-project/sglang/issues/34120)）则限制了部分大模型扩展部署方式。
- **CI 基础设施引入新观测手段**：自动收集 CUDA coredump 的 tracker（[#26340](https://github.com/sgl-project/sglang/issues/26340)）已经运行，遇到 GPU 崩溃时可作为辅助排查依据；同时当前 CI 存在 3 broken / 11 flaky，PR 合并节奏偏快，建议关注主分支的持续集成状态。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时 llama.cpp 连续发布 b10356–b10362 共 7 个版本，核心变化包括 EXAONE 4.5 SWA 修复、OpenCL FlashAttention prefill 优化以及 CI 全面升级至 ROCm 7.14。社区侧，一个 RPC 后端 `SET_ROWS` 越界写漏洞被发现并已有修复 PR；同时多后端（CUDA/Vulkan/ROCm/SYCL）仍有多起崩溃和回归报告，需关注。

## 2. 版本发布与破坏性变更

- **b10356** — CI 构建目标切换至 ROCm 7.14（首个 TheRock 构建系统生产版本），Linux/Windows 均新增对应 CI 目标。  
  [Release b10356](https://github.com/ggml-org/llama.cpp/releases/tag/b10356) | [PR #25775](https://github.com/ggml-org/llama.cpp/pull/25775)
- **b10357** — OpenCL FlashAttention prefill 内核在本地内存中转置 K 矩阵，提升局部性。  
  [Release b10357](https://github.com/ggml-org/llama.cpp/releases/tag/b10357)
- **b10358** — 处理 PR #25532 的审查意见，无功能变更。  
  [Release b10358](https://github.com/ggml-org/llama.cpp/releases/tag/b10358)
- **b10359** — 修复 WebGPU CI 错误：新增 flash_attn 测试、i32 cpy 支持并启用 all-ops 测试。  
  [Release b10359](https://github.com/ggml-org/llama.cpp/releases/tag/b10359)
- **b10360** — 抑制 PEG 辅助代码中的不完整转义序列警告。  
  [Release b10360](https://github.com/ggml-org/llama.cpp/releases/tag/b10360)
- **b10361** — 修复 EXAONE 4.5 模型的 SWA（滑动窗口注意力）未正确启用的问题（因 hparams 读取顺序导致）。  
  [Release b10361](https://github.com/ggml-org/llama.cpp/releases/tag/b10361)
- **b10362** — 禁用 HIP 后端 backend-sampler 的 multi-output 测试（依赖 CUB，HIP 不可用）。  
  [Release b10362](https://github.com/ggml-org/llama.cpp/releases/tag/b10362)

**注意**：ROCm 7.14 相关 issue [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) 报告在加载时会报 `libhipblas.so.3` 缺失，升级环境时需确认配套库已正确安装。

## 3. 新模型与硬件支持

- **新增模型架构：A.X K2** — PR #26757 增加对 SKT 发布的 A.X-K2 模型支持，包含 Sparse Gated Attention 和 Gated Norm 特性。  
  [PR #26757](https://github.com/ggml-org/llama.cpp/pull/26757)
- **EXAONE 4.5 SWA 修复** — b10361 确保 `LLM_KV_NEXTN_PREDICT_LAYERS` 读取后再判断 `n_layer()`，避免 SWA 被错误禁用。  
  [Release b10361](https://github.com/ggml-org/llama.cpp/releases/tag/b10361)
- **AMD UMA 内存检测修复** — PR #26932 修复 Strix Halo（gfx1151）等大显存 iGPU 上 `hipMemGetInfo()` 返回系统内存而不是 VRAM 的问题，改用 sysfs 读取。  
  [PR #26932](https://github.com/ggml-org/llama.cpp/pull/26932)
- **ROCm 7.14 正式 CI 支持** — b10356/PR #25775 为 Linux/Windows 新增 ROCm 7.14 构建目标。  
  [PR #25775](https://github.com/ggml-org/llama.cpp/pull/25775)

## 4. 性能与优化

- **OpenCL FlashAttention prefill 优化** — b10357 在本地内存中转置 K 矩阵块，减少全局内存访问，提升 prefill 性能。  
  [Release b10357](https://github.com/ggml-org/llama.cpp/releases/tag/b10357)
- **Glimmer drafter 优化（进行中）** — PR #26842 针对 Glimmer 草稿模型做推理路径优化，目前处于讨论阶段。  
  [PR #26842](https://github.com/ggml-org/llama.cpp/pull/26842)
- **Expert Caching 方案重新设计** — 此前的专家缓存 PR #26563 已关闭，作者表示将重构后重新提交；新 PR #26824 也已关闭，计划以更干净的 commit history 重开。该方案旨在通过热力图/mmap pinning 提升 MoE 性能，但当前未合入。  
  [PR #26563](https://github.com/ggml-org/llama.cpp/pull/26563) | [PR #26824](https://github.com/ggml-org/llama.cpp/pull/26824)

## 5. 稳定性与回归

按严重程度排列（已标注 fix 状态）：

- **RPC 后端越界写漏洞（严重）** — #26912 发现 `SET_ROWS` 在 release 构建下可写入输出张量缓冲区之外，可能触发内存损坏。修复 PR #26933 已在执行前增加维度校验。  
  [Issue #26912](https://github.com/ggml-org/llama.cpp/issues/26912) | [Fix PR #26933](https://github.com/ggml-org/llama.cpp/pull/26933)
- **CUDA 调度断言失败** — #24132 在 V100 上加载 `gemma-4-E4B-it-Q4_0.gguf` 时触发 `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)`。  
  [Issue #24132](https://github.com/ggml-org/llama.cpp/issues/24132)
- **OpenVINO 无法加载 Gemma 4** — #24415 报告 gemma-4-12B 在 OpenVINO CPU/GPU/NPU 后端均无法加载。  
  [Issue #24415](https://github.com/ggml-org/llama.cpp/issues/24415)
- **ROCm 7.14 动态库缺失** — #25807 升级 ROCm 7.14 后报 `libhipblas.so.3` 错误，尚未有 fix。  
  [Issue #25807](https://github.com/ggml-org/llama.cpp/issues/25807)
- **Vulkan MoE 崩溃** — #23769 在 Intel Arc B70 上运行 Qwen3.6-35B MoE 模型崩溃（Windows/Vulkan）。  
  [Issue #23769](https://github.com/ggml-org/llama.cpp/issues/23769)
- **DeepSeek V4 ROCm 输出乱码** — #25436 在 Strix Halo（ROCm/HIP）上 DeepSeek V4 生成乱码，影响 IQ3_XXS 等量化。  
  [Issue #25436](https://github.com/ggml-org/llama.cpp/issues/25436)
- **SYCL 第二次 prompt 输出垃圾** — #26845 在 Intel Arc Pro B60 上第二次 prompt 生成垃圾内容。  
  [Issue #26845](https://github.com/ggml-org/llama.cpp/issues/26845)
- **DSpark 推测解码 CUDA 错误** — #26554 在 deepseek4 多 GPU 下解码约 2500 token 后触发 `cublasSgemm` unsupported value。  
  [Issue #26554](https://github.com/ggml-org/llama.cpp/issues/26554)

## 6. 对应用开发者的意义

- **JSON Schema 生成更稳健** — PR #26939 对不支持的 regex 模式（如 lookahead）优雅降级为 JSON 字符串；PR #26931 使 `pattern` 支持非锚定表达式，符合 JSON Schema 规范。对依赖结构化输出的 Agent 应用更友好。  
  [PR #26939](https://github.com/ggml-org/llama.cpp/pull/26939) | [PR #26931](https://github.com/ggml-org/llama.cpp/pull/26931)
- **CLI 参数迁移预警** — PR #26934 将废弃的 `--mmap`/`--no-mmap`/`--mlock`/`--direct-io` 统一迁移为 `--load-mode`，涉及脚本和文档。若在 CI/容器中使用了旧参数，需提前适配。  
  [PR #26934](https://github.com/ggml-org/llama.cpp/pull/26934)
- **服务器 metrics 重构中** — PR #26920 正在清理指标计算逻辑（如 t/s），将更新与 `llama_decode` 结果绑定，提升准确性。对基于 `llama-server` 做监控的部署有影响，建议关注其合入进度。  
  [PR #26920](https://github.com/ggml-org/llama.cpp/pull/26920)
- **OpenAI Responses API 兼容增强** — PR #26013 改进 Responses API 的 JSON Schema 支持和流式兼容性，并加入 Cohere2 MoE 模板解析。适合用 Responses API 做工具调用的应用。  
  [PR #26013](https://github.com/ggml-org/llama.cpp/pull/26013)
- **Web UI 可用性提升** — PR #26928 为聊天中的代码块/文件增加下载按钮，PR #26910 重构 UI 状态管理。前端集成团队可留意。  
  [PR #26928](https://github.com/ggml-org/llama.cpp/pull/26928) | [PR #26910](https://github.com/ggml-org/llama.cpp/pull/26910)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 2026-08-12

## 1. 今日速览
- Ollama 发布 v0.32.9，新增 NVIDIA Nemotron 3.5 Lightning（30B MoE / 3B active）模型支持，面向 always-on agents 场景。
- 社区集中报告多起回归与正确性问题：Qwen3.6 在 Apple M2 性能下降、DGX Spark 上 CUDA flash attention 确定性崩溃、Jetson 升级后模型被删除。
- 核心进展包括：OpenAI Responses API 增加 web search 支持（[PR #17686](https://github.com/ollama/ollama/pull/17686)）、默认 repeat_penalty 行为调整（[PR #17679](https://github.com/ollama/ollama/pull/17679)）、/metrics 端点（[PR #16998](https://github.com/ollama/ollama/pull/16998)）。

## 2. 版本发布与破坏性变更
- **v0.32.9 发布**：新增 [NVIDIA Nemotron 3.5 Lightning](https://ollama.com/library/nemotron-3.5-lightning)（30B MoE / 3B active）支持；配套 [PR #17672](https://github.com/ollama/ollama/pull/17672) 为 nemotron_h 接入 3.5 prompt layout。  
  https://github.com/ollama/ollama/releases/tag/v0.32.9
- **进行中：默认 repeat_penalty 调整**：目前服务端会对未显式设置 repeat_penalty 的模型强制应用 1.1。[PR #17679](https://github.com/ollama/ollama/pull/17679) 提议停止该默认行为，合并后模型采样输出可能变化。
- **进行中：`ollama create` 管线变更**：[PR #14969](https://github.com/ollama/ollama/pull/14969) 计划将 create 切换为服务器端 MLX 导入（safetensors），并限制 GGUF create 为“包装已有 GGUF 输入”。依赖本地 GGUF 转换的工作流将受影响。
- **发布流程事故（已关闭）**：Docker 镜像 0.32.8 缺失（[#17668](https://github.com/ollama/ollama/issues/17668)）；HA 中 0.32.7 更新 404（[#17678](https://github.com/ollama/ollama/issues/17678)）。

## 3. 新模型与硬件支持
- **Nemotron 3.5 Lightning**：v0.32.9 官方支持，30B MoE / 3B active，专为 OpenClaw、Hermes Age 等 agent harness 设计。  
  https://ollama.com/library/nemotron-3.5-lightning
- **MLX：Ling-3.0-Tiny**：[PR #17643](https://github.com/ollama/ollama/pull/17643) 为 MLX 后端实现 BailingMoeV3ForCausalLM 架构，支持 Ling-3.0-tiny 及 FP8/INT4 量化版本。
- **AMD Strix Halo 显存探测修复**：[PR #17685](https://github.com/ollama/ollama/pull/17685) 修复 hipMemGetInfo() 返回系统内存而非显存的问题，新增 `OLLAMA_GPU_MEMORY` 环境变量。
- **OpenRC 服务支持**：[PR #17681](https://github.com/ollama/ollama/pull/17681) 为 Alpine/Gentoo 增加 OpenRC init 脚本，支持 `rc-service` 管理 daemon。

## 4. 性能与优化
- **可观测性（进行中）**：[PR #16998](https://github.com/ollama/ollama/pull/16998) 新增 opt-in Prometheus 兼容 `/metrics` 端点（`OLLAMA_METRICS=1`），暴露队列深度、已加载模型数、请求计数与 token 指标。
- **MLX 并发解码（进行中）**：[PR #17666](https://github.com/ollama/ollama/issues/17666) 指出 MLX runner 当前单 goroutine 串行消费请求，需要支持 batched/concurrent decode。
- **回归：Apple M2 性能下降**：Qwen3.6-35B-A3B 在 Mac Studio M2 上从旧版 ~72 T/s 明显变慢（[#17583](https://github.com/ollama/ollama/issues/17583)）。

## 5. 稳定性与回归
按严重程度排列：

- **升级后模型被删除（严重，无 fix PR）**：Jetson AGX Orin 从 0.32.7 升级后，qwen3.6:27B、GPT-OSS:20b 等模型消失，仅 qwen3.6:35b 保留。  
  [#17661](https://github.com/ollama/ollama/issues/17661)
- **MLX 跨请求响应污染（严重，已关闭）**：`OLLAMA_KEEP_ALIVE=-1` 时 MLX runner 间歇返回早期 prompt 的完整答案。已关闭，请确认修复版本。  
  [#17599](https://github.com/ollama/ollama/issues/17599)
- **CUDA 确定性崩溃（高，无 fix PR）**：DGX Spark（GB10）上，qwen3-coder-next:q4_K_M 大 prefill 触发 `ggml_cuda_flash_attn_ext_mma_f16_case` illegal memory access（head-size 256）。  
  [#17596](https://github.com/ollama/ollama/issues/17596)
- **低比特 KV cache 输出退化（高，无 fix PR）**：KV cache 从 q8_0 切到 q4_0 后，模型输出退化为无意义 token 串。  
  [#17614](https://github.com/ollama/ollama/issues/17614)
- **ROCm 工具调用中断（中高，无 fix PR）**：q8_0/q4_0 KV cache 下 Qwen3.5/3.6 在生成 tool call 前停止，问题随量化精度加剧。  
  [#17347](https://github.com/ollama/ollama/issues/17347)
- **MLX 结构化输出不可靠（中高）**：MLX 模型忽略 `response_format`（[#16563](https://github.com/ollama/ollama/issues/16563)）；`muse-glimmer:30b-mlx` 泄漏控制 token 且不遵循 JSON schema（[#17684](https://github.com/ollama/ollama/issues/17684)）。
- **CUDA hybrid 模型回退 CPU（中，无 fix PR）**：Qwen3.6 hybrid 在 llama.cpp b10353 下回退 CPU，b10242 正常。  
  [#17669](https://github.com/ollama/ollama/issues/17669)
- **context deadline exceeded（中，有 fix PR）**：HF 模型下载或直连 URL 请求失败。已在 [PR #17551](https://github.com/ollama/ollama/pull/17551) 中修复 stalled direct URL 请求重试逻辑。  
  [#17484](https://github.com/ollama/ollama/issues/17484)
- **Claude Code 无响应（中，无 fix PR）**：`ollama launch claude --model qwen3-coder:30b` 生成成功但 Claude Code 不显示响应。  
  [#17671](https://github.com/ollama/ollama/issues/17671)
- **Cloud 问题**：Gemma 4 Cloud 在 vision + tool calling 时返回 HTTP 500（[#17667](https://github.com/ollama/ollama/issues/17667)）；Cloud 始终报告 0 cached tokens（[#15758](https://github.com/ollama/ollama/issues/15758)）。
- **LXC 内存误判（中）**：Ollama 使用 MemFree 而非 MemAvailable，导致容器内误报 “insufficient memory”。  
  [#15704](https://github.com/ollama/ollama/issues/15704)
- **配置崩溃修复（PR）**：[PR #17624](https://github.com/ollama/ollama/pull/17624) 处理 integration config 中 null 条目，避免 `LoadIntegration` 返回 nil 后解引用 panic。

## 6. 对应用开发者的意义
- **Agent 与 Responses API**：[PR #17686](https://github.com/ollama/ollama/pull/17686) 为 OpenAI Responses API 兼容层加入 server-side web search，Codex 可直接使用原生 `web_search` 工具。另有 [feature request #17673](https://github.com/ollama/ollama/issues/17673) 建议支持 OpenAI custom tools。
- **Claude Code / Ollama Launch**：注意 qwen3-coder 与 Claude Code 的兼容问题（[#17671](https://github.com/ollama/ollama/issues/17671)）；[PR #17623](https://github.com/ollama/ollama/pull/17623) 修复 Claude `[1m]` context 后缀被 `/api/show` 拒绝的问题，[PR #17680](https://github.com/ollama/ollama/pull/17680) 改进 claude-desktop 在 Linux 上的错误说明。
- **默认参数敏感性**：若 [PR #17679](https://github.com/ollama/ollama/pull/17679) 合并，未显式设置 repeat_penalty 的模型将不再继承 1.1，输出文本重复率可能上升，建议提前对比评估。
- **可观测性接入**：[PR #16998](https://github.com/ollama/ollama/pull/16998) 的 `/metrics` 端点可直接与 Prometheus 集成，用于监控队列、模型加载和 token 用量。
- **MLX 生产使用需谨慎**：结构化输出目前不可靠（[#16563](https://github.com/ollama/ollama/issues/16563)、[#17684](https://github.com/ollama/ollama/issues/17684)），runner 仍串行处理请求（[#17666](https://github.com/ollama/ollama/issues/17666)），高并发场景建议继续使用 CUDA/ROCm 后端。
- **部署形态扩展**：[PR #17681](https://github.com/ollama/ollama/pull/17681) 为 Alpine/Gentoo 增加 OpenRC 支持；[PR #17685](https://github.com/ollama/ollama/pull/17685) 改善 AMD Strix Halo 等大显存 iGPU 的显存识别。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-12

## 今日速览

LiteLLM 在 2026-08-12 发布了多个补丁版本（v1.90.7 ~ v1.96.2），核心动作集中在验证 Docker 镜像签名（cosign）。Rust 迁移作为最大的长期项目仍在持续推进，社区关注度高。PR 侧的重点是修复 Bedrock 遗留测试、xAI 网页搜索计费、Guardrail SSE 流处理、Postgres 死锁重试以及 OTel 资源泄漏等生产稳定性和可观测性问题。

## 版本发布与破坏性变更

过去 24 小时发布了 **7 个版本**：`v1.90.7`、`v1.91.5`、`v1.92.2`、`v1.93.2`、`v1.94.3`、`v1.95.1`、`v1.96.2`。所有版本均附带 cosign 签名，用于 Docker 镜像完整性验证。此次发布属于常规补丁迭代，**未发现明显的破坏性 API/配置变更**；建议关注后续完整 Changelog 确认行为变化。

- [v1.96.2 release](https://github.com/BerriAI/litellm/releases/tag/v1.96.2) | [v1.95.1](https://github.com/BerriAI/litellm/releases/tag/v1.95.1) | [v1.94.3](https://github.com/BerriAI/litellm/releases/tag/v1.94.3) | [v1.93.2](https://github.com/BerriAI/litellm/releases/tag/v1.93.2) | [v1.92.2](https://github.com/BerriAI/litellm/releases/tag/v1.92.2) | [v1.91.5](https://github.com/BerriAI/litellm/releases/tag/v1.91.5) | [v1.90.7](https://github.com/BerriAI/litellm/releases/tag/v1.90.7)

## 新模型与硬件支持

无新增模型或硬件后端支持条目。但有两个模型/后端相关的 PR 正在推进：

- **Bedrock 测试迁移**：将已退役的 Claude 3 Sonnet 依赖迁移到新的 `us.anthropic.claude-sonnet-4-5-20250929`，避免 CI 404/500 报错。[PR #36600](https://github.com/BerriAI/litellm/pull/36600)
- **Bedrock 模型能力补充**：为 DeepSeek V3.2 和 GLM 5 的所有区域 ID 补充原生 Structured Output 能力标记，修复跨区域能力缺失问题。[PR #36597](https://github.com/BerriAI/litellm/pull/36597)

## 性能与优化

今日有多个性能与稳定性 PR 正在推进，重点是资源使用和调度优化：

- **调度错峰**：对 proxy 内 APScheduler 注册的后台任务进行抖动/错峰处理，避免所有任务在启动时同一瞬间触发，从而降低数据库峰值压力。[PR #36589](https://github.com/BerriAI/litellm/pull/36589)
- **Spend 日志清理限制**：限制 retention cleanup 单次删除行数（之前可单次删除 50 万行）、单批删除的锁持有时间，并暴露到 dashboard 可配置。[PR #36594](https://github.com/BerriAI/litellm/pull/36594)
- **OTel Tracer Provider 泄漏修复**：修复按凭据维度的 `TracerProvider` 缓存无限增长且从不 shutdown 的问题，避免 `BatchSpanProcessor` 工作线程数无限膨胀。[PR #36591](https://github.com/BerriAI/litellm/pull/36591)
- **Postgres 死锁重试**：将死锁错误（P2034/40P01）纳入重试分类，统一走带抖动和退避的重试逻辑，避免并发下 spend increment 静默丢失。[PR #34887](https://github.com/BerriAI/litellm/pull/34887)
- **Rust 迁移**：meta issue 仍在收集 Beta 测试者，定位为 sub-1ms 开销的极轻量 AI Gateway（仍是进行中项目）。[Issue #31263](https://github.com/BerriAI/litellm/issues/31263)

## 稳定性与回归

按严重程度排列（标注是否已有修复 PR）：

**高**
- **`/v1/messages` 流式响应空 choices 崩溃**：`_should_start_new_content_block` 未处理 `choices=[]` 的 usage-only chunk。影响所有非 Anthropic 后端的 Anthropic 格式流式请求。[Issue #36553](https://github.com/BerriAI/litellm/issues/36553) | **无 PR**
- **Python 3.13 无法安装 litellm 1.96.1**：该版本仅有 cp310 wheel，导致 Python 3.13 环境解析失败。[Issue #36526](https://github.com/BerriAI/litellm/issues/36526) | **无 PR**（v1.96.2 已发布，待确认是否已修复）
- **Perplexity 流式请求 500**：`usage.cost` 返回 dict 导致 `float()` 转换失败。已有修复 PR。[PR #36593](https://github.com/BerriAI/litellm/pull/36593)

**中**
- **MCP 工具参数/结果未脱敏**：日志后端的 metadata 中 MCP tool 参数和结果即使 message logging 关闭也会原样导出。已有修复 PR。[PR #36474](https://github.com/BerriAI/litellm/pull/36474)
- **sensitive_data_routing guardrail 不生效**：文档中描述的 guardrail 类型未被识别。[Issue #36535](https://github.com/BerriAI/litellm/issues/36535) | **无 PR**
- **litellm_content_filter 评估在 Guardrails Monitor 中缺失**：请求 metadata 有记录，但 Guardrails Monitor 不展示。[Issue #36566](https://github.com/BerriAI/litellm/issues/36566) | **无 PR**
- **Meta Model API 缺失 UI 下拉选项**：后端支持 `meta` provider 和 `meta/muse-spark-1.1`，但 Dashboard 无该选项。[Issue #36164](https://github.com/BerriAI/litellm/issues/36164) | **无 PR**

**低（已标记 stale，大多长期未解决）**
- Vertex AI 使用全局 API endpoint / express token 时仍被强制要求凭证。[#21036](https://github.com/BerriAI/litellm/issues/21036)
- Ollama 多 deployment 场景下 cooldown handler 硬编码 `APIConnectionError` 导致 failover 失效。[#27362](https://github.com/BerriAI/litellm/issues/27362)
- 嵌入模型 `aembedding` 缺少 `num_retries` 导致零重试、无 failover。[#27363](https://github.com/BerriAI/litellm/issues/27363)
- OpenRouter 动态计费（service tier / 实时定价）尚未支持。[#27588](https://github.com/BerriAI/litellm/issues/27588)

## 对应用开发者的意义

1. **流失式响应稳定性提升**：Perplexity 流 500 和空 chunk 崩溃修复后，对直接对接 `/v1/messages` 或依赖流式响应的应用是实质性利好。但后者仍需跟进 fix PR 落地。
2. **计费准确性改善**：xAI web search 的 `$0` 计费问题、自定义定价字段（`input_cost_per_token` 等）生效问题，以及 Postgres 死锁导致的 spend 丢失都在修复中，**对于依赖 LiteLLM 做内部成本核算的团队建议优先升级验证**。
3. **MCP 安全/隐私修复**：MCP 工具参数脱敏修复意味着日志后端的敏感信息泄露风险将得到控制，**对已启用 MCP 工具的 Agent 类应用尤其重要**。
4. **运维注意事项**：Python 3.13 用户在确认 wheel 修复前建议锁定版本；后台任务错峰和日志清理限流上线后，**高峰期数据库负载有望降低**，可观察 P95 延迟变化；OTel 修复解决长跑进程的内存/线程数增长问题，对长期运行的生产 Proxy 有意义。
5. **Rust 迁移**仍在早期，**不建议当前依赖其作为生产网关**，但可关注 Beta 进展。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-12

## 1. 今日速览

Unsloth 今日重磅发布 **Unsloth Desktop**，首个支持本地运行与训练 AI 模型的跨平台桌面应用，同时推出 v0.1.701-beta / v0.1.70-beta 两个版本。社区反馈集中在两个方面：Windows + AMD 显卡环境的大量安装/驱动问题（GPU 识别为 ROCm 但后端 CPU-only 运行），以及 Studio 对 MiniMax-M3、Muse-Glimmer 等新一代 GGUF 模型的兼容性缺口。修复侧，团队正密集合入 Studio 后端性能优化（流式解析从二次方降至线性）、CI 修复和 VRAM 管理改进。

## 2. 版本发布与破坏性变更

- **v0.1.701-beta / v0.1.70-beta：Unsloth Desktop 正式发布**。首个桌面版 AI 应用，支持在 Windows / macOS / Linux 上本地运行与训练模型，涵盖研究、导出、部署流程。下载入口： [https://unsloth.ai/](https://unsloth.ai/)
  Release: https://github.com/unslothai/unsloth/releases
- **v0.1.62-beta**：常规 bug 修复版本。
  Release: https://github.com/unslothai/unsloth/releases
- ⚠️ **迁移注意事项**：Desktop 版不同于 pip 安装，环境隔离和依赖管理方式有变。当前已报告 Linux AppImage 缺少系统库、Windows AMD 安装失败、macOS Studio 与内置 llama.cpp 版本不同步导致 GGUF 加载失败等新问题，升级前建议评估目标平台兼容性。

## 3. 新模型与硬件支持

- **新增模型/架构面临兼容性挑战**，Studio 内置 llama.cpp 版本与 HF 上的新量化模型存在同步滞后：
  - **MiniMax-M3 GGUF** 在 Apple Silicon 上加载失败：`UD-Q5_K_XL` 缺 `indexer.head_count` 元数据（[#8513](https://github.com/unslothai/unsloth/issues/8513)、[#8360](https://github.com/unslothai/unsloth/issues/8360)）。
  - **Muse-Glimmer-30B-GGUF** 无法被内置 `llama-server` 识别，架构 `muse-glimmer` 不在支持列表中（[#8345](https://github.com/unslothai/unsloth/issues/8345)）。
  - **Qwen3.5 4B Vision** notebook 在 Colab 上报 AcceleratorError（[#7124](https://github.com/unslothai/unsloth/issues/7124)）。
- **CUDA 覆盖补强**：PR #8489 为 Unsloth Studio 引入首个 CUDA CI 测试（Kaggle T4），当前 CI 仅覆盖 CPU，Turing 架构回归风险正在补上（[#8489](https://github.com/unslothai/unsloth/pull/8489)）。

## 4. 性能与优化

以下优化均在 PR 阶段，尚未发布正式版本：

- **流式输出工具解析从二次方降至线性**：#8428 避免每个 token 全量重扫整段 response；#8494 进一步将 safetensors 与 healer 路径中三个同类二次方扫描全部改为线性，实时聊天和工具调用场景收益明显（[#8428](https://github.com/unslothai/unsloth/pull/8428)、[#8494](https://github.com/unslothai/unsloth/pull/8494)）。
- **后端启动时间优化**：#8498 削减了无关启动路径上的阻塞任务，避免事件循环被卡（[#8498](https://github.com/unslothai/unsloth/pull/8498)）。
- **显存不足时优先弃用投机解码**：Auto 模式下，当仅主模型能塞入 VRAM 时自动丢弃 drafter，避免因投机解码牺牲上下文窗口或直接 OOM（[#8435](https://github.com/unslothai/unsloth/pull/8435)）。
- **路由与数据层 5 条超线性路径重写**：纯算法级优化，无行为变更（[#8499](https://github.com/unslothai/unsloth/pull/8499)）。
- **多 GPU 训练修复**：#8516 修复 xFormers attention mask 与 QKV 不在同一 GPU 导致的训练失败（[#8516](https://github.com/unslothai/unsloth/pull/8516)）。

## 5. 稳定性与回归

按严重程度排序：

**严重 — 安装/环境不可用（Windows + AMD）**

- **Studio 将 AMD GPU 识别为 ROCm 但实际 CPU-only 运行**，Live monitor 显示 VRAM `--`、`No visible GPU`，无任何告警，用户被误导（[#8473](https://github.com/unslothai/unsloth/issues/8473)）。
- **AMD ROCm PyTorch 被安装器替换为非 ROCm 版本**，导致 torch import 失败（[#7275](https://github.com/unslothai/unsloth/issues/7275)）。
- **Unsloth Desktop 在 Windows AMD GPU 上安装失败**（[#8508](https://github.com/unslothai/unsloth/issues/8508)）；**Windows 登录自启动失效**（[#8510](https://github.com/unslothai/unsloth/issues/8510)）。
- **Linux AppImage 缺少系统库**，应用无法启动（[#8463](https://github.com/unslothai/unsloth/issues/8463)）。

**严重 — 模型加载/推理失败**

- **Studio 无法加载自己下载的本地 GGUF**，路径存在 Windows 绝对路径被截断、模型切换 503 等根因（[#8368](https://github.com/unslothai/unsloth/issues/8368)、[#8375](https://github.com/unslothai/unsloth/issues/8375)），PR #8475 通过从 checkpoint 内容而非目录顺序判定模型类型来修复（[#8475](https://github.com/unslothai/unsloth/pull/8475)）。
- **导出的 tokenizer_config.json 含 `tokenizer_class: "TokenizersBackend"`**，transformers AutoTokenizer 无法加载，导致微调产物不可用（[#8444](https://github.com/unslothai/unsloth/issues/8444)）。

**中等 — CI/流程问题**

- **Backend CI 全天全红**，23 个测试失败，根因是 CI 镜像缺 torchao 依赖，所有 PR 被阻塞。已有两个修复 PR：#8506、#8486（[#8506](https://github.com/unslothai/unsloth/pull/8506)、[#8486](https://github.com/unslothai/unsloth/pull/8486)）。
- **版本号误报**：`unsloth.__version__` 直接引用 `unsloth_zoo.__version__`，当两者 release 不同步时，Unsloth 版本号会错误回退（[#8171](https://github.com/unslothai/unsloth/issues/8171)）。

## 6. 对应用开发者的意义

- **Unsloth Desktop 的出现值得关注**：它意味着 Unsloth 从训练库/推理库向「本地开发—训练—部署」全栈平台演进。如果你在构建本地优先的 Agent/应用，这是一个新的可选底座，但当前桌面端 bug 较多，生产落地建议等 1-2 个稳定版本。
- **Windows + AMD 用户暂不建议升级**：安装器存在 GPU 误判、依赖被替换等硬伤，可能让你花半天排查环境问题。社区目前没有 workaround，耐心等修复。
- **流式工具调用性能优化对实时 Agent 体验有直接帮助**：二次方扫描是工具调用场景长 response 卡顿的隐患，合入后聊天延迟将显著改善。
- **模型生态同步风险**：Studio 内置 llama.cpp 与 HuggingFace 上新模型（MiniMax-M3、Muse-Glimmer）存在滞后，直接加载新版 GGUF 可能失败。在依赖 Studio 作为推理网关时，务必先验证目标模型架构与内置 llama.cpp 的兼容性。
- **微调产出可用性**：导出 tokenizer 含非法 `TokenizersBackend` class，任何用 AutoTokenizer 加载产物并在外部部署的工作流会直接被破坏，需等 hotfix 或手动修正配置。

---
*数据来源：github.com/unslothai/unsloth，统计窗口为 2026-08-11 至 2026-08-12。*

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*