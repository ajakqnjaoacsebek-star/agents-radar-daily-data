# AI 基础设施日报 2026-08-11

> 生成时间: 2026-08-11 10:24 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施横向对比分析 — 2026-08-11

## 1. 生态全景

今日生态由两大模型牵引：Kimi-K3 完成从模型到内核的全栈落地，DeepSeek-V4-Flash 则集中暴露新架构的"青春期问题"——KV cache 膨胀约 8 倍、SM8x 缺失、多引擎出现升级回归。与此同时，Meta 的 Muse Glimmer 在发布 24 小时内即获得 Ollama 全平台支持与 Unsloth 量化适配，头部模型从开源到可部署的周期已被压缩到一天以内。优化火力正从通用 kernel 转向架构专属 kernel（gfx950 DSpark MLA decode、KDA fused decode），而稳定性问题同步累积：今日共记录 4 个高严重度未修复问题，分布在 vLLM、SGLang、Ollama 与 LiteLLM。总体判断：生态处于"新架构密集落地、稳定性还债"并行的阶段，版本纪律比追逐最新功能更重要。

## 2. 各项目活跃度对比

| 项目 | Release | 引用 Issues | 引用 PRs | 今日亮点 |
|---|---|---|---|---|
| vLLM | 1（v0.27.0：561 commits / 242 贡献者，其中 64 位新） | ~12 | ~16 | Kimi-K3 全栈发布，ROCm 专属 kernel 密集合入 |
| SGLang | 无（当前在版 0.5.16 / 0.5.17） | ~8 | ~13 | 扩散模型 bit-exact 融合（H100 最高 16.2%），Kimi-K3 NPU 适配 |
| llama.cpp | 9（b10338 → b10358） | ~11 | ~19 | 日更 9 版，ROCm 7.14 切换，Nemotron MTP 落地 |
| Ollama | 2（v0.32.7 / v0.32.8） | 28 | 23 | Muse Glimmer 全平台可用（MLX 首发） |
| LiteLLM | 1（v1.96.0） | ~17 | ~16 | Docker 镜像 cosign 签名，Rust 网关补齐 DeepSeek parity |
| Unsloth | 2（v0.1.60 / v0.1.61-beta） | ~21 | ~7 | Muse Glimmer 运行 + Dynamic 量化支持 |

> 口径说明：Issues/PRs 为各日报中明确引用的条目数，非 GitHub API 全量统计。

活跃度特征：**llama.cpp** 以 9 个 Release/日展示出最激进的发布节奏；**vLLM** 单 Release 规模最大（561 commits，242 位贡献者）；**Ollama** 的 Issue/PR 覆盖面最广（28/23），反映其用户群偏应用层、问题粒度更碎；**LiteLLM** 的 PR 密度集中在成本追溯与治理类修复，属于"把账算清楚"的阶段。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth | 领跑者 |
|---|---|---|---|---|---|---|
| Kimi-K3 | ✅ NVIDIA 全栈 + ROCm 推进 | ✅ GPU + 昇腾 NPU 适配 | ❌ | ❌ | ❌ | **vLLM**（NVIDIA 首发）；SGLang（NPU 差异化） |
| DeepSeek-V4-Flash | ⚠️ 支持但有升级回归、KV 膨胀、SM8x 缺失 | ⚠️ DSpark CUDA Graph 崩溃、稀疏 prefill 挂起 | ⚠️ RPC worker 崩溃 | ❌ | ❌ | 无稳定赢家 |
| Muse Glimmer | ❌ | ❌ | ⚠️ 工具检测修复 | ✅ v0.32.8 全平台 | ✅ v0.1.61-beta | **Ollama**（产品化最快） |
| GLM-4.7-Flash | ❌ | ✅ 确定性 FA4 | ❌ | ❌ | ❌ | **SGLang** |
| Nemotron | ❌ | ❌ | ✅ MTP 支持 | ✅ MLX Nemotron 3 | ❌ | 并列（解码能力 vs 端侧覆盖） |
| Granite-Switch | ❌ | ❌ | ✅ CPU POC | ❌ | ❌ | **llama.cpp**（独家） |

- **数据中心竞赛**：vLLM 对 Kimi-K3 的支持完整度领先 SGLang 至少一个身位（模型 + Python/Rust 前端 + AttnRes 内核一次到位）；但 DeepSeek-V4-Flash 无人跑通"稳定运行"——vLLM 受困 KV 膨胀与 0.27.0 回归，SGLang 受困 DSpark CUDA Graph，llama.cpp 的 RPC 后端直接崩溃。
- **本地/端侧竞赛**：Ollama 冲刺速度最快，MLX 首发后 24 小时内补齐全平台；Unsloth 靠 Dynamic 量化建立差异化；llama.cpp 架构覆盖面最宽，但产品化封装不如 Ollama 完整。
- **反向信号**：预量化格式兼容正在成为新的支持瓶颈——MiniMax M3 GGUF 在 Unsloth 加载失败（缺 `indexer.head_count`），Qwen3.6-int4-AutoRound 无法加载，NVFP4 在 5060 Ti 上不可用。模型格式与量化格式的矩阵复杂度已经超出"一个引擎全部兼容"的能力边界。

## 4. 性能优化前沿

| 方向 | 代表性工作 | 收益/意义 |
|---|---|---|
| 架构专属 Kernel | vLLM gfx950 DSpark MLA decode（#51803）、KDA fused decode（#50654） | 新架构（DeltaNet/MLA 变体）需要定制 kernel，通用 GEMM 覆盖不了 |
| 算子融合 | SGLang 扩散模型 RoPE+GELU/SwiGLU 融合（#34306/#34314/#34315）、ROCm DSA indexer GEMM 融合（#34394） | bit-exact 无损，H100 denoise 耗时降低 2.6%–16.2% |
| KV Cache 效率 | vLLM 暴露 DSV4-Flash 每 token 56 bytes（约 8 倍膨胀，#51041）；SGLang MLA 投影+RoPE+KV 写入融合（#32935） | 容量规划指标从"token 数"转向"bytes/token" |
| 量化路径 | vLLM W4A8 引入 PTX 9.4 `ldmatrix.s8.s4`（#49529）；在线量化未量化 linear/moe（#51392）；SGLang MXFP4 输出量化融合（#33873） | 硬件级 INT4→INT8 扩展加载，降低 smem 带宽；混合量化覆盖预量化 checkpoint |
| 投机解码 / MTP | llama.cpp 后端多输出采样（#25532）；Unsloth DFlash 侧车自动启动（#8338）；vLLM MTP warmup 修复（#51802） | 消解草稿模型与并行采样的重复计算 |
| 分布式 / 通信重叠 | vLLM DeepSeek-V4 CSA 多流重叠（#51794）；SGLang DeepEP 路径修复（#33660） | 计算-通信重叠是 MoE 大模型 TP 扩展的关键 |
| 内存调度 | llama.cpp #26448 与 Ollama #17557 均提出 MoE 专家权重驻留 Host RAM、PCIe DMA 直读 | 作者实测 1.6GB VRAM 跑 23GB MoE、8GB 卡跑 81GB Qwen3-235B——若落地将重构消费级显卡可运行上限 |

## 5. 分层定位差异

| 层 | 项目 | 核心职责 | 代表能力 | 定位关键词 |
|---|---|---|---|---|
| 推理引擎 | vLLM | 数据中心高吞吐推理 | PagedAttention、AttnRes、CSA 重叠、多卡服务 | 性能天花板 |
| 引擎 + 调度 | SGLang | 推理 + 请求调度 + 多模态 | RadixAttention、分层 KV cache、sglang-router、NPU | 系统级编排 |
| 本地运行时 | llama.cpp | CPU/GPU/异构本地推理 | GGUF 量化、RPC 多机、Metal/OpenCL/ROCm 7.14 | 硬件覆盖面最广 |
| 本地产品 | Ollama | 模型分发 + 多引擎封装 | llama.cpp + MLX 双引擎、Agent 集成（Claude Code） | 体验与分发 |
| 网关 | LiteLLM | 多 Provider 聚合 + 治理 | 统一 API、限流/预算、cosign 签名、Rust 重写 | 南北向流量治理 |
| 微调 / 训练 | Unsloth | 高效微调 + Studio 本地推理 | 2x 微调加速、Dynamic 量化、内置 llama.cpp | 训练到部署闭环 |

关键差异点：

- **vLLM vs SGLang**：vLLM 强在"内核深度"（今日 5 个架构专属 kernel），SGLang 强在"系统广度"（调度、路由、NPU、多模态）。二者在 DeepSeek-V4 上同时受挫，说明新架构适配需要内核与调度两条腿走路。
- **llama.cpp vs Ollama**：llama.cpp 是"引擎原教旨"，Ollama 是"引擎分销商"——它不写 kernel，而是同时维护 llama.cpp 与 MLX 两个后端。Unsloth 则从训练侧切入，用 Studio 把微调产物直接接到 llama.cpp 推理，形成"微调→量化→部署"闭环。
- **LiteLLM 是唯一纯网关层**：不碰模型执行，专注引擎之上的统一 API、可观测性与合规。今日的 cosign 签名与 Rust 迁移都是这一层独有的命题。

## 6. 值得关注的趋势信号

1. **新架构正在重写容量规划规则**：DSV4-Flash-0731 的 KV cache 达 56 bytes/token（约 8 倍膨胀），H20 上 7.7 GiB 仅容纳 150K tokens。部署工程师不能再看模型参数估算 `max_model_len`，必须按实际 bytes/token 重算；引擎则需要在 KV 层提供显存计量新接口。

2. **ROCm/AMD 首次获得与 CUDA 平行的专属内核通道**：gfx950 专属 MLA decode、KDA fused decode、ROCm 7.14 成为 llama.cpp 官方 CI 目标——"AMD 只能跑通用 kernel"的短板正被逐层补上。但 Strix Halo 上的乱码与 CPU 占用问题（#25436/#25700）提示驱动与运行时成熟度仍是风险点。

3. **多引擎策略成为本地运行时标配**：Ollama 的"llama.cpp + MLX"双引擎、Unsloth Studio 内嵌 llama.cpp、vLLM 的 Python/Rust 双前端，本质是同一信号——没有单一引擎能覆盖所有硬件，运行时必须按芯片自动选择执行后端。MLX runner 串行处理请求（#17666）是目前最明显的并发短板。

4. **版本滚动风险是生产环境头号敌人**：今日高严重度问题几乎全是"升级后炸毁"型——vLLM 0.26.0→0.27.0 后 DeepSeek-V4-Flash 运行失败（#51758）、Ollama 0.32.4/0.32.5 破坏 VS Code Copilot 工具调用（#17444）、`latest` 镜像因 Transformers 5.15.0 无法启动 Gemma4（#51744）。`latest` 标签应禁用于生产，升级必须走"验证过再上"的卡点流程。

5. **Agent 工作负载成为第一优化公民**：Muse Glimmer 发布即定位编码 Agent 与长驻助手；sglang-router 的 KV 感知路由与可恢复状态（#33394/#32523）专门服务多引擎 Agent 网关；Qwen3.5 工具调用被思考块截断（#20837，59 评论）是最疼的 agent 正确性缺陷。工具调用与思考链的交互，正在成为所有引擎的共性难题。

6. **网关层进入"工程产品化"阶段**：LiteLLM cosign 镜像签名、Rust 重写目标 <1ms overhead、Langfuse 官方直接提交 v4 升级 PR——网关从"API 转发"演进为安全、成本、性能三重约束的治理层。但流式 usage 少计（#36114）与预算绕过（#26672）两个高严重度问题未修复，可信计费仍不成熟。

**给 Agent/应用开发者的三条行动建议**：

- **锁版本**：Ollama 固定在 0.32.1（避开工具调用回归）；vLLM 服务 DSV4 场景暂留 0.26.0；所有引擎禁用 `latest` 镜像。
- **重算容量**：使用 DSV4-Flash-0731 按 56 bytes/token 做 capacity planning，并在监控中增加 KV cache bytes/token 指标。
- **关注两个未成熟窗口**：LiteLLM Rust 网关与 Ollama MLX runner 均处早期阶段（并发串行、响应串扰未解决），勿将生产流量迁入。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM 动态日报 — 2026-08-11

### 1. 今日速览

- **vLLM v0.27.0 正式发布**，一次性落地 Kimi-K3 全栈支持（模型、内核、Python/Rust 前端、AttnRes 内核），包含 561 个 commit、242 位贡献者（其中 64 位新贡献者）。
- **DeepSeek-V4-Flash 是当前最大热点**：SM8x（A100/A800）支持请求 #50576 已积累 98 条评论；Flash-0731 变体被曝 KV cache 膨胀约 8 倍（#51041）；升级至 v0.27.0 后出现运行回归（#51758）。
- **ROCm 侧同步推进 Kimi-K3 与 DeepSeek-V4 优化**，今日新增 gfx950 DSpark draft MLA decode 内核（#51803）、KDA fused decode 内核（#50654）与 DeepSeek-V4 CSA 多流重叠（#51794）。

---

### 2. 版本发布与破坏性变更

- **[v0.27.0 Release](https://github.com/vllm-project/vllm/releases/tag/v0.27.0)**：561 commits、242 位贡献者（64 位新）。核心特性是 **Kimi-K3 完整落地**：核心模型与 kernels（[#50089](https://github.com/vllm-project/vllm/pull/50089)、[#50000](https://github.com/vllm-project/vllm/pull/50000)）、Python 前端（[#50093](https://github.com/vllm-project/vllm/pull/50093)）、Rust 前端（[#50104](https://github.com/vllm-project/vllm/pull/50104)）、AttnRes kernels（[#50090](https://github.com/vllm-project/vllm/pull/50090)）。
- **升级风险提示**：
  - [#51758](https://github.com/vllm-project/vllm/issues/51758)：从 0.26.0 升级到 0.27.0 后，DeepSeek-V4-Flash 直接运行报错（今日新报告，暂无修复 PR）。
  - [#51744](https://github.com/vllm-project/vllm/issues/51744)：`vllm/vllm-openai:latest`（0.27.0）镜像内 Transformers 5.15.0 导致 Gemma4（QAT NVFP4）启动失败（今日新报告，暂无修复 PR）。

---

### 3. 新模型与硬件支持

- **Kimi-K3**：v0.27.0 Release 已提供 NVIDIA 侧全栈支持（见上）。ROCm 侧的能力差距与路线图由 [#50682](https://github.com/vllm-project/vllm/issues/50682) 跟踪。
- **[PR #51647](https://github.com/vllm-project/vllm/pull/51647)（ROCm）**：为 AITER MLA 补齐非 16 对齐 head 的 padding，使 Kimi-K3 TP=4 下每 rank 24 heads 可使用 AITER MLA 路径，不再回退到 Triton MLA。
- **[PR #47017](https://github.com/vllm-project/vllm/pull/47017)（ROCm/gfx11）**：解除 ROCm sparse-indexer 的 Python 侧阻断，使 DeepSeek-V4 系列 checkpoint 可在 RDNA 设备上通过平台校验。
- **[PR #51392](https://github.com/vllm-project/vllm/pull/51392)（Quantization）**：支持对任意预量化 checkpoint（Quark / ModelOpt / compressed-tensors 等）中未量化的 `linear` / `moe` 部分做在线量化。
- **[PR #48215](https://github.com/vllm-project/vllm/pull/48215)（Multi-modal LoRA）**：为 Ultravox 增加 tower/connector LoRA 支持，承接 #31479 多模态 LoRA 扩展计划。
- **[Issue #31479](https://github.com/vllm-project/vllm/issues/31479)**：多模态模型 tower/connector LoRA 的通用化支持仍在推进中（16 条评论）。

---

### 4. 性能与优化

- **[PR #51803](https://github.com/vllm-project/vllm/pull/51803)（ROCm/gfx950）**：为 Kimi-K3 DSpark draft 组实现专用 MLA decode kernel——将非因果多 token block 展平为每个 query token 一个 decode row，规避现有 `TritonMLAImpl` 的绕路实现。
- **[PR #50654](https://github.com/vllm-project/vllm/pull/50654)（ROCm）**：Kimi-K3 KDA 层 fused decode kernel，单 step 内融合 causal conv1d、gated delta-rule recurrence 与每 value head 状态更新。
- **[PR #51794](https://github.com/vllm-project/vllm/pull/51794)（ROCm）**：DeepSeek-V4 启用 CSA（compute/communication overlap）多流重叠，基于 #43718 与 #50866 继续推进。
- **[PR #48223](https://github.com/vllm-project/vllm/pull/48223)（ROCm）**：dual-stream decode 支持 hipgraph/cudagraph 兼容。注意：仅在 DP 下启用，TP 下观察到性能回退。
- **[Issue #49529](https://github.com/vllm-project/vllm/issues/49529)（Kernel）**：建议在 W4A8-INT8 路径中采用 PTX 9.4（CUDA 13.4 DP）新增的 `ldmatrix.s8.s4` 硬件 INT4→INT8 扩展加载，减少 shared memory 带宽开销。
- **[PR #49139](https://github.com/vllm-project/vllm/pull/49139)（Kernel 正确性修复）**：修复 `persistent_topk` 在长 radix row 后接短 row、再回 radix row 时直方图复用导致的错误结果。

---

### 5. 稳定性与回归

按严重程度排列：

| 严重度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#51758](https://github.com/vllm-project/vllm/issues/51758) | 0.26.0 → 0.27.0 升级后 DeepSeek-V4-Flash 运行失败（今日上报） | 无修复 PR |
| 🔴 高 | [#51744](https://github.com/vllm-project/vllm/issues/51744) | `latest` 镜像（0.27.0）因 Transformers 5.15.0 无法启动 Gemma4 | 无修复 PR |
| 🟠 中 | [#51041](https://github.com/vllm-project/vllm/issues/51041) | DeepSeek-V4-Flash-0731 KV cache 每 token 高达 **56 bytes（约 8 倍膨胀）**；H20 TP=2 下 7.7 GiB 仅容纳 150K tokens，`max_model_len` 被压至约 121,344 | 无修复 PR，需上游确认是否 checkpoint 配置缺陷 |
| 🟠 中 | [#49497](https://github.com/vllm-project/vllm/issues/49497) | FlashInfer sampler 在 nvcc 不可见时 JIT 崩溃，且不回退到原生 sampler；wheel 默认安装即可触发 | 无修复 PR |
| 🟠 中 | [#40926](https://github.com/vllm-project/vllm/issues/40926) | V1 + MTP + GLM-5.1（TP=8）在持续流量下 worker hang，`sample_tokens` RPC 超时，30s 后 EngineDeadError | 无修复 PR |
| 🟠 中 | [#48266](https://github.com/vllm-project/vllm/issues/48266) | ROCm MI325X（gfx942）TP=4，DeepSeek-V4-flash + fp8 KV cache，序列越过 2048 tokens 时 GPU memory access fault | 无修复 PR |
| 🟡 低 | [#50687](https://github.com/vllm-project/vllm/issues/50687) | 混合多组 KV 下，connector 上报 load-error block 时 `_update_requests_with_invalid_blocks` 抛 `ValueError: too many values to unpack` | 无修复 PR |
| 🟡 长期 | [#50576](https://github.com/vllm-project/vllm/issues/50576) / [#40851](https://github.com/vllm-project/vllm/issues/40851) | DeepSeek-V4-Flash 与 Flash-0731 均不支持 SM8x（A100/A800/RTX 30xx），社区诉求强烈（98 / 43 条评论） | 无修复 PR，需 DeepSeek 侧 deepgemm 适配 |
| ✅ 已有修复 | [PR #51802](https://github.com/vllm-project/vllm/pull/51802) | 修复 NVIDIA DeepSeek-V4 mHC warmup：正确识别 `DeepseekV4DecoderLayer` warmup 路径，覆盖 TileLang pre/fused post/pre/post 函数 | 今日新建，Open |
| ✅ 已有修复 | [PR #51766](https://github.com/vllm-project/vllm/pull/51766) | 修复 Kimi-K3 场景下 Mamba 外部 prefix 命中后 running CoW 语义丢失问题 | 今日 Closed |

---

### 6. 对应用开发者的意义

- **生产 DeepSeek-V4-Flash 的服务商请暂缓升级 v0.27.0**：#51758 是今日上报的升级回归，在上游 hotfix 或 workaround 明确前，建议 pinned 在 0.26.0。
- **DeepSeek-V4-Flash-0731 的内存模型与前代差异极大**（KV 每 token 56 bytes，约 8 倍）。在容量规划时必须按实际 bytes/token 重算 `max_model_len`，否则极易出现 OOM 或 context 长度不达预期；若业务场景依赖长上下文，建议首选 Flash 初版或等待上游澄清。
- **A100/A800 用户目前无法运行 DeepSeek-V4-Flash 系列**，如业务强依赖该模型，需预留 Hopper/Blackwell 资源或评估 DeepSeek 官方推理栈。
- **Kimi-K3 在 NVIDIA 侧随 v0.27.0 可用**，但 ROCm 侧仍属渐进落地阶段（AITER MLA 对齐、gfx950 专属 kernel 均在完善中）。AMD 用户可跟踪 [#50682](https://github.com/vllm-project/vllm/issues/50682) 获取最新路线图。
- **依赖 `latest` 镜像的 Gemma4 用户请注意**：当前镜像内 Transformers 5.15.0 与 Gemma4 QAT NVFP4 不兼容，建议固定到明确版本号，避免被滚动升级打断服务。
- **多模态 LoRA 能力正在扩展**：Ultravox 的 tower/connector LoRA 已进入 PR 阶段（#48215），后续多模态模型的可组合微调能力会更完整，但目前尚未合并，生产环境勿直接依赖。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### 今日速览

2026-08-11 的 SGLang 动态聚焦三个方向：一是 DSpark 在 TP8/长上下文场景下的稳定性问题集中爆发，涉及 CUDA Graph 非法内存访问与调度器挂起，相关修复与 RFC 密集更新；二是 Kimi-K3 的 NPU 适配与通用模型支持持续演进；三是 AMD/ROCm 与扩散模型在 H100/H200 上的算子融合优化表现亮眼（单点提升 2.6%–16.2%）。

---

### 新模型与硬件支持

- **Kimi-K3 支持扩展到昇腾 NPU**：PR #33465 在现有 GPU 集成（#32541）基础上，为 Kimi-K3 增加 Ascend NPU 后端支持。该 PR 尽量保留共享/GPU 行为，通过 Ascend 后端分发 NPU 专用实现，并提取了 Ascend Triton kernels 以便复用。  
  链接：https://github.com/sgl-project/sglang/pull/33465

- **GLM-4.7-Flash 新增确定性 FA4 支持**：PR #33945 为 GLM-4.7-Flash 引入确定性 FlashAttention-4（FA4）支持。若你正在使用 GLM-4.7-Flash 且受限于非确定性推理，该 PR 值得关注。  
  链接：https://github.com/sgl-project/sglang/pull/33945

---

### 性能与优化

- **AMD/ROCm DSA Indexer 算子融合**：PR #34394 将 ROCm DSA indexer 的 `wk` 与 `weights_proj` 两个独立 GEMM 融合为单个 `wk_weights_proj` GEMM，可减少内核启动开销，并避免依赖 CUDA-only 的融合实现。  
  链接：https://github.com/sgl-project/sglang/pull/34394

- **AMD/ROCm MLA 融合与量化优化持续推进**：
  - PR #32935 针对 Kimi-K2.5 MXFP4 场景，融合 MLA 投影、RoPE 和 KV-cache 写入。
  - PR #33873 在 AMD 上融合 MLA value projection 与 MXFP4 输出量化，是 #32935 的互补工作。  
  链接：https://github.com/sgl-project/sglang/pull/32935 | https://github.com/sgl-project/sglang/pull/33873

- **扩散模型在 H100/H200 上的融合优化（bit-exact，全部提交阶段）**：
  - **ERNIE-Image**：PR #34306 融合 rotate-half RoPE + GELU-mul 并提升 rope cos/sin，denoise 耗时 H100 降低 16.2%，H200 降低 12.7%。
  - **Ideogram-4**：PR #34314 融合 Qwen3-style RoPE 和 SwiGLU silu-mul，denoise 耗时 H100 降低 5.1%，H200 降低 4.7%。
  - **LTX-2**：PR #34315 在 8 个 adaLN 位置挂载 bit-exact 融合 modulate，denoise 耗时 H100 降低 2.8%，H200 降低 2.6%。  
  链接：https://github.com/sgl-project/sglang/pull/34306 | https://github.com/sgl-project/sglang/pull/34314 | https://github.com/sgl-project/sglang/pull/34315

- **模型加载启动优化**：PR #32017 提出将 checkpoint staging 与 CUDA graph capture 在启动阶段重叠，避免大模型启动时 I/O 与捕获串行带来的空闲等待。  
  链接：https://github.com/sgl-project/sglang/pull/32017

---

### 稳定性与回归

- **严重：DSpark TP8 CUDA Graph 崩溃（多个 issue 并存）**：
  - #33356 报告在官方 v0.5.16 release image 上，`DeepSeek-V4-Pro-DSpark` 在 B300/B30Z TP8 的 large decode CUDA-Graph 捕获可能在**服务启动期**触发非法内存访问或 host `SIGSEGV`。目前无标注 fix PR。
  - #31023 报告 compact ragged target-verify CUDA Graph 路径在 TP>1 时存在非确定性非法内存访问，根因之一是跨 TP 的 planning 不一致（rank 可能选择不同的 verify budget），PR #31195 已修复该控制面问题。
  - 相关 RFC：#32432 提出为动态 CUDA Graph 复用制定显式的元数据、工作区和流所有权契约。  
  链接：https://github.com/sgl-project/sglang/issues/33356 | https://github.com/sgl-project/sglang/issues/31023 | https://github.com/sgl-project/sglang/issues/32432

- **严重：DeepSeek-V4 稀疏 prefill 调度器挂起**：#34235 报告在 sglang 0.5.17 + hierarchical cache + chunked prefill 16K 组合下，DSV4 稀疏 prefill 触发 watchdog abort；同时观测到 0.5.16+PR 版本上的 sampling device-side assert。该 issue 创建于 08-10，更新于 08-11，暂无 fix PR 关联。  
  链接：https://github.com/sgl-project/sglang/issues/34235

- **中等：W4AFP8 + DeepEP 路径崩溃已关闭**：#33660 报告 W4AFP8 量化模型（GLM-5.2 等 DSV2 架构）配合 `--moe-a2a-backend deepep` 启动时，所有 rank 同时崩溃（TypeError 缺少 `routed_scaling_factor`）。该 issue 已被关闭。  
  链接：https://github.com/sgl-project/sglang/issues/33660

- **中等：Z-Image 单卡 BCG 首次重放崩溃**：#34183 报告 Breakable CUDA graph（BCG）在 Z-Image 单卡场景下 warmup 成功后首次 replay 必现非法内存访问或挂起；TP=2 不受影响。该 issue 已被关闭。  
  链接：https://github.com/sgl-project/sglang/issues/34183

- **CI 追踪与 CUDA Coredump 监控**：#17050 追踪 main 分支 CI 状态——当前 3 broken、11 flaky、666 recently fixed；#26340 作为自动收集 CUDA coredump 事件的 tracker（已累计 231 条评论），可用于定位 PR 测试中的偶发崩溃。  
  链接：https://github.com/sgl-project/sglang/issues/17050 | https://github.com/sgl-project/sglang/issues/26340

---

### 对应用开发者的意义

- **DSpark 使用者需谨慎选择版本与配置**：若你基于 DeepSeek-V4-Pro-DSpark 构建服务，TP8 和大解码（large decode）场景存在已知 CUDA Graph 崩溃风险。请优先跟进 #31195 的合入状态，并建议在 v0.5.16 基础上显式验证启动稳定性；同时将 `DeepSeek-V4-DSpark` 列入生产环境回归测试。
- **Kimi-K3 的 NPU 与按图像缓存改进**：PR #33465 让 NPU 用户可获得与 GPU 对齐的 Kimi-K3 支持；PR #34404 则试图缓存 Kimi-K3 的 per-image processor artifacts，对多图/多轮 Agent 交互场景可显著降低 prefill 预处理开销。
- **分层 KV Cache 与 Router 的可靠性提升**：若你使用 sgl-router 做 KV-aware 路由，建议关注 #33394（可恢复的 KV 放置状态与事件重放）和 #32523（push-based engine load reporting）。这些能力落地后，路由网关在 Worker 重启或事件丢失后的收敛速度将大幅改善，有助于构建更健壮的多引擎 Agent 网关。
- **量化与扩散模型开发者的性能红利**：如果你面向 AMD/ROCm 部署 MoE 或扩散模型，上述算子融合 PR 均有明确的降延迟收益；其中扩散模型的优化全部声明 bit-exact，可在不损失精度的前提下直接获得 H100/H200 上的 3%–16% 性能提升。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-11

## 1. 今日速览

过去 24 小时发布节奏密集（b10338 → b10358 共 9 个版本），核心变化包括：ROCm CI/发布目标升级至 7.14（[#25775](https://github.com/ggml-org/llama.cpp/pull/25775)）、后端多输出采样落地（[#25532](https://github.com/ggml-org/llama.cpp/pull/25532)）、Nemotron 模型新增 MTP 支持（[#26725](https://github.com/ggml-org/llama.cpp/pull/26725)）以及 Granite-Switch 新架构 CPU POC（[#25107](https://github.com/ggml-org/llama.cpp/pull/25107)）。社区侧，Qwen3.5 工具调用被思考块截断、Strix Halo 平台上 ROCm 乱码与性能问题仍是讨论焦点。

## 2. 版本发布与破坏性变更

**发布批次（b10338–b10358）**
- **b10358**：解决 PR #25532 的 review 意见（[#26852](https://github.com/ggml-org/llama.cpp/pull/26852)）
- **b10357**：OpenCL FA prefill kernel 在 local memory 中转置 K tile（[#26428](https://github.com/ggml-org/llama.cpp/pull/26428)）
- **b10356**：CI 与发布目标切换至 ROCm 7.14（[#25775](https://github.com/ggml-org/llama.cpp/pull/25775)）
- **b10355**：后端采样支持多输出（[#25532](https://github.com/ggml-org/llama.cpp/pull/25532)）
- **b10354**：修复 Android 上 CPU 亲和性掩码被忽略的问题（[#26838](https://github.com/ggml-org/llama.cpp/pull/26838)）
- **b10353**：ggml_roll 要求 src 连续（[#25928](https://github.com/ggml-org/llama.cpp/pull/25928)）
- **b10344**：Nemotron 模型增加 MTP 支持（[#26725](https://github.com/ggml-org/llama.cpp/pull/26725)）
- **b10343**：cpp-httplib 升级至 0.53.0（[#26821](https://github.com/ggml-org/llama.cpp/pull/26821)）
- **b10342**：Granite-Switch 新架构 CPU POC（[#25107](https://github.com/ggml-org/llama.cpp/pull/25107)）
- **b10338**：修复模型保存器 expert shared/chunk FFN 长度 key 相互覆盖（[#26693](https://github.com/ggml-org/llama.cpp/pull/26693)）

**破坏性变更与迁移注意**
- **ROCm 版本要求**：官方 CI 已迁移至 ROCm 7.14（[#25775](https://github.com/ggml-org/llama.cpp/pull/25775)），旧版 ROCm 用户需评估兼容性。
- **采样 API 变化**：b10355 为采样路径新增“最大输出数”等上下文参数，自定义采样器需跟进。
- **ROLL 行为收紧**：`ggml_roll` 非连续输入以前会静默产生错误结果，现在将直接失败（[#25928](https://github.com/ggml-org/llama.cpp/pull/25928)）。
- **模型保存变更**：b10338 修复了 GGUF 保存时 expert 相关 key 被覆盖的问题，重新导出共享 FFN 长度类模型时结果会与之前不同（[#26693](https://github.com/ggml-org/llama.cpp/pull/26693)）。

## 3. 新模型与硬件支持

- **Granite-Switch 架构（CPU POC）**：dense all-attention 模型内嵌 N 个 LoRA adapter，由控制 token 逐 token 选择（[#25107](https://github.com/ggml-org/llama.cpp/pull/25107)）。
- **Nemotron MTP**：新增 multi-token prediction 支持，含 mtp_flags 配置（[#26725](https://github.com/ggml-org/llama.cpp/pull/26725)）。
- **ROCm 7.14**：成为官方构建/发布目标（[#25775](https://github.com/ggml-org/llama.cpp/pull/25775)）。
- **进行中的模型支持**：
  - BailingMoE3 支持（[#26608](https://github.com/ggml-org/llama.cpp/pull/26608)）
  - Gemma-4 嵌套 `global_head_dim` 转换修复（[#26882](https://github.com/ggml-org/llama.cpp/pull/26882)）
  - 恢复 mmproj 量化能力，修复 #22004 重构引入的回归（[#26818](https://github.com/ggml-org/llama.cpp/pull/26818)）
  - Muse Glimmer 工具调用检测修复（[#26879](https://github.com/ggml-org/llama.cpp/pull/26879)）

## 4. 性能与优化

**已合入**
- OpenCL FA prefill：在 local memory 中转置 K tile，减少 bank conflict（[#26428](https://github.com/ggml-org/llama.cpp/pull/26428)）
- 多输出后端采样：单次前向支持多个采样输出，减少并行采样/投机解码的重复计算（[#25532](https://github.com/ggml-org/llama.cpp/pull/25532)）
- Android CPU 亲和性修复，改善移动端多核利用（[#26838](https://github.com/ggml-org/llama.cpp/pull/26838)）

**进行中**
- Metal flash-attn 按设备调优 (Q, NE)（[#26570](https://github.com/ggml-org/llama.cpp/pull/26570)）
- CUDA FA fp16 MMA kernel 用 XOR swizzle 替代 row padding 消除 K/V smem bank conflict（[#25635](https://github.com/ggml-org/llama.cpp/pull/25635)）
- server 避免将 rerank/embedding/infill 空闲槽位写入 RAM prompt cache，减少常驻内存（[#26893](https://github.com/ggml-org/llama.cpp/pull/26893)）
- **Feature Request（值得关注）**：MoE 专家权重留在 host 内存、经 PCIe DMA 直读，避免 H2D 拷贝。作者实测 1.6GB VRAM 可跑 23GB MoE，8GB 卡可跑 81GB Qwen3-235B（[#26448](https://github.com/ggml-org/llama.cpp/issues/26448)）

**负面性能问题**
- AMD Strix Halo + HIP：输入层在 CPU 上执行导致约 30% CPU 占用和 GPU 利用率下降（[#25700](https://github.com/ggml-org/llama.cpp/issues/25700)，open）

## 5. 稳定性与回归

按严重程度排列：

- **崩溃**
  - gemma-4-E4B-it 在 V100/CUDA 上触发 `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)`（[#24132](https://github.com/ggml-org/llama.cpp/issues/24132)，open）
  - RPC 后端跑 DeepSeek-V4-Flash 时 worker 报 `[create_node] invalid data ptr`，9 节点 CPU 集群复现（[#26820](https://github.com/ggml-org/llama.cpp/issues/26820)，open）

- **正确性/输出损坏**
  - Qwen3.5 开启 thinking 时工具调用 XML 被截断、提前停止（[#20837](https://github.com/ggml-org/llama.cpp/issues/20837)，open，59 评论）
  - DeepSeek V4 在 Strix Halo + ROCm 上乱码输出（[#25436](https://github.com/ggml-org/llama.cpp/issues/25436)，open）
  - 投机解码（draft-mtp/draft-dspark）在量化目标上 greedy 输出与 vanilla 不一致；bf16 目标正常（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)，open）
  - MTP 请求间状态残留，导致非确定性输出与模型退化（[#26425](https://github.com/ggml-org/llama.cpp/issues/26425)，open）

- **功能回归/兼容性**
  - 混合/循环模型上下文检查点总是失效（[#24055](https://github.com/ggml-org/llama.cpp/issues/24055)，open）
  - Muse Glimmer 在 Vulkan build 不可用（[#26865](https://github.com/ggml-org/llama.cpp/issues/26865)，closed；修复 PR [#26879](https://github.com/ggml-org/llama.cpp/pull/26879)）
  - 32 位 ARM NEON 编译失败：`unknown type name '__fp16'`（[#26677](https://github.com/ggml-org/llama.cpp/issues/26677)，open；修复 PR [#26860](https://github.com/ggml-org/llama.cpp/pull/26860)）
  - GGUF 缺少 `n_layer_all` 上界校验可能导致 OOB 读写，已合入防御性断言（[#25821](https://github.com/ggml-org/llama.cpp/pull/25821)）

## 6. 对应用开发者的意义

- **Agent 稳定性风险**：Qwen3.5 工具调用与思考块冲突（[#20837](https://github.com/ggml-org/llama.cpp/issues/20837)）是当前 agent 场景最突出的正确性问题；Muse Glimmer 的工具检测修复（[#26879](https://github.com/ggml-org/llama.cpp/pull/26879)）已提交但未合入。
- **新能力**：Granite-Switch 的 per-token LoRA 路由机制（[#25107](https://github.com/ggml-org/llama.cpp/pull/25107)）值得关注，可能催生"模型内工具/技能路由"的应用形态；Nemotron MTP（[#26725](https://github.com/ggml-org/llama.cpp/pull/26725)）可提升自回归吞吐。
- **服务端优化**：[#26893](https://github.com/ggml-org/llama.cpp/pull/26893) 降低空闲槽位内存占用，利好长驻服务；server 新增 `read_media` 工具（[#25877](https://github.com/ggml-org/llama.cpp/pull/25877)）允许视觉模型分析服务端图片，对多模态 agent 有直接帮助。
- **采样器兼容性**：b10355 引入多输出采样参数，使用自定义采样器/解码策略的开发者需要适配新的上下文接口。
- **ROCm 部署**：官方 CI 迁移至 ROCm 7.14（[#25775](https://github.com/ggml-org/llama.cpp/pull/25775)），生产环境建议提前验证。
- **分布式部署**：[#24132](https://github.com/ggml-org/llama.cpp/issues/24132) 的 V100 崩溃与 [#26820](https://github.com/ggml-org/llama.cpp/issues/26820) 的 RPC worker 崩溃在多卡/多机场景中需要重点排查。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-11

## 今日速览

今日最核心的进展是 **Muse Glimmer（Meta 最新开源模型）双版本连发**：v0.32.7 率先在 Apple Silicon 上通过 MLX 引擎提供初始支持，v0.32.8 随即扩展至全平台。与此同时，社区对 MLX 引擎的并发能力、工具调用回归、以及模型存储异常等问题反馈集中，多项修复 PR 已在推进中。Ollama 正在加速从"本地模型运行时"向"多引擎（llama.cpp + MLX）Agent 基础设施"演进。

---

## 版本发布与破坏性变更

### v0.32.8 — Muse Glimmer 全平台可用
- **内容**：Muse Glimmer 现已在所有平台发布，可驱动 Claude Code、Codex、Pi 等编码 Agent，以及 OpenClaw、Hermes 等长时运行的个人助理。Ollama 的 MLX 引擎在 Apple 硬件上提供了 SOTA 性能。
- **链接**：https://github.com/ollama/ollama/releases/tag/v0.32.8

### v0.32.7 — Muse Glimmer 初始支持（MLX / Apple Silicon）
- **内容**：Muse Glimmer 通过 Ollama MLX 引擎在 Apple Silicon 上提供初始支持；NVIDIA、AMD 等平台优化将在未来数日内跟进。
- **注意**：当前版本存在以下已报告的发布问题：
  - **Docker 镜像缺失**：v0.32.8 的 GitHub Release tag 已创建，但 `ollama/ollama:0.32.8` Docker 镜像尚未推送，拉取报 `manifest unknown`。[Issue #17668](https://github.com/ollama/ollama/issues/17668)
  - **模型拉取 412**：v0.32.7 中 `ollama pull muse-glimmer:30b-q8_0` 报 412 错误，提示需要预发布版本，manifest 与实际支持不一致。[Issue #17645](https://github.com/ollama/ollama/issues/17645)
  - **模型文件消失**：Jetson AGX Orin 用户升级到 0.32.7 后多个模型消失（qwen3.6:27B、GPT-OSS:20b 等），仅剩一个幸存。[Issue #17661](https://github.com/ollama/ollama/issues/17661)
- **链接**：https://github.com/ollama/ollama/releases/tag/v0.32.7

---

## 新模型与硬件支持

### Muse Glimmer（Meta 新开放模型）
- 全平台支持已合入 v0.32.8，MLX 引擎上提供初始 Apple Silicon 优化。但社区发现 `muse-glimmer:30b-mlx` 标签的 manifest 实际由 **NVFP4（NVIDIA 专用）权重构建**，并非真正的 MLX 权重。[Issue #17656](https://github.com/ollama/ollama/issues/17656)

### MLX 引擎：Nemotron 3 支持（PR 已合入）
- 添加了对 Nemotron 3 Nano Omni 的 MLX 支持，包括 Mamba2/循环组件、MoE 路由、NVFP4/MXFP8 量化专家路径，以及 Metal 优化的 block-mapped kernel。[PR #17060](https://github.com/ollama/ollama/pull/17060)

### MLX 引擎：Gemma4 图像输入（进行中）
- 通过通用 `base.MediaModel` 接口添加 Gemma4 图像预处理与视觉嵌入，支持 unified `vision_embedder.*` 和 transformer-based `vision_tower.*` 两种 checkpoint 格式。[PR #17650](https://github.com/ollama/ollama/pull/17650)

### Apertus 1.5 解析器/渲染器支持（进行中）
- 为完全开放的瑞士多模态模型 Apertus v1.5（8B/70B）添加原生 chat 处理。[PR #17555](https://github.com/ollama/ollama/pull/17555)

---

## 性能与优化

### Windows-on-Arm CPU 构建性能修复（PR 已提交）
- 当前 Windows-on-Arm CPU runner 因未设置 `-march`，回退到 baseline armv8-a，**没有启用任何 dot-product 或矩阵指令**。一行 preset 修复即可带来显著的 CPU 推理提升。[PR #17654](https://github.com/ollama/ollama/pull/17654)

### MLX runner 并发请求支持（新 Issue）
- 实验性 MLX runner（`x/mlxrunner`）目前**只能串行处理请求**：单 goroutine 消费无缓冲 channel，并发 API 调用被排队逐个执行。对于构建多用户服务的开发者这是一个关键瓶颈。[Issue #17666](https://github.com/ollama/ollama/issues/17666)

### MoE 专家权重重置到 Host RAM（Feature Request）
- 社区提议：允许 MoE 专家权重驻留宿主内存、按需加载到 GPU，使 16B/35B MoE 模型可在 8GB 显存上运行。目前 16B MoE（6GB 文件）需要 23GB VRAM，限制了大量消费级 GPU。[Issue #17557](https://github.com/ollama/ollama/issues/17557)

### API 暴露 projected context length（PR 已提交）
- 在模型详情中暴露投影后的上下文长度，目前基于 bucket 估算，未来可从 MLX runner 获得更精确的估计。[PR #17663](https://github.com/ollama/ollama/pull/17663)

---

## 稳定性与回归

按严重程度排列：

### 🔴 高 — 模型文件丢失（升级后数据消失）
- **0.32.7 升级后模型全部消失**：Jetson AGX Orin 用户报告 qwen3.6:27B 等多个模型在升级后丢失，仅存一个。目前**无 fix PR**，涉及数据安全，建议升级前备份 `~/.ollama/models`。[Issue #17661](https://github.com/ollama/ollama/issues/17661)

### 🔴 高 — 工具调用回归（VS Code Copilot Harness）
- **0.32.4/0.32.5 破坏 VS Code GitHub Harness 中的工具调用**：用户确认回滚到 0.32.1 可解决。影响所有基于 VS Code Copilot 的 Agent 开发流程，目前**无 fix PR**。[Issue #17444](https://github.com/ollama/ollama/issues/17444)

### 🟠 中 — MLX 长驻 runner 响应串扰
- **`OLLAMA_KEEP_ALIVE=-1` 下 MLX 引擎间歇性返回早期 prompt 的完整回答**（跨请求响应污染），而非当前请求的降级答案。这对长驻 Agent 服务是严重正确性问题，**无 fix PR 关联**。[Issue #17599](https://github.com/ollama/ollama/issues/17599)

### 🟠 中 — 低量化格式产生垃圾输出
- 切换 server KV 量化到 q4_0 后，模型输出退化为 "AI AI AI" 一类的无意义重复内容。[Issue #17614](https://github.com/ollama/ollama/issues/17614)

### 🟠 中 — CUDA 非法内存访问（DGX Spark）
- 大 prefill 请求在 DGX Spark（GB10）上确定性崩溃，触发于 `ggml_cuda_flash_attn_ext_mma_f16_case<256, 256, 8, 8>`，涉及 head size 256 模型。**有 llama.cpp 更新 PR 已关闭**（[PR #17659](https://github.com/ollama/ollama/pull/17659)），但需确认是否包含修复。[Issue #17596](https://github.com/ollama/ollama/issues/17596)

### 🟠 中 — Muse Glimmer MLX manifest 错误
- `muse-glimmer:30b-mlx` 标签实际由 NVFP4 权重构建，与标签和宣传不符。[Issue #17656](https://github.com/ollama/ollama/issues/17656)

### 🟡 低 — MLX 结构化输出被忽略
- MLX 引擎忽略 `format` 参数（structured outputs），影响 JSON 模式输出可靠性。[Issue #16563](https://github.com/ollama/ollama/issues/16563)

### 🟡 低 — `/api/generate` 静默忽略 `think` 参数
- 设置 `format` 时 `/api/generate` 静默忽略 `think: true`，而 `/api/chat` 行为正确。[Issue #17544](https://github.com/ollama/ollama/issues/17544)

### 🟡 低 — `launch claude-desktop` 不支持 Ubuntu
- Claude Desktop 启动在 Ubuntu 上直接报错，仅支持 macOS 和 Windows。[Issue #17653](https://github.com/ollama/ollama/issues/17653)

### 🟡 低 — Skills 加载失败（无法诊断）
- 用户创建的部分 skills 在 `~/.ollama/skills/` 中被静默丢弃，**已有 PR 修复诊断逻辑**（[PR #17657](https://github.com/ollama/ollama/pull/17657)）。[Issue #17652](https://github.com/ollama/ollama/issues/17652)

### 🟡 低 — 0.32.8 Docker 镜像缺失
- 发布 tag 已创建，但 Docker Registry 尚无对应镜像，CI/CD 管线拉取会失败。[Issue #17668](https://github.com/ollama/ollama/issues/17668)

---

## 对应用开发者的意义

1. **Muse Glimmer 值得立即评估**：v0.32.8 已全平台支持，Meta 新模型定位为编码 Agent（Claude Code、Codex、Pi）和长驻助手（OpenClaw、Hermes）的驱动模型。但注意 `30b-mlx` 标签的 manifest 目前有问题，拉取时确认实际权重格式。

2. **工具调用回归需锁定版本**：0.32.4/0.32.5 在 VS Code Copilot Harness 中存在工具调用回归，**建议 Agent 应用暂时固定在 0.32.1**，直到官方发布修复。此外 `/api/generate` 在 `format` 下静默忽略 `think` 的问题也可能导致链式推理应用出错。

3. **MLX runner 尚不适合并发生产负载**：`x/mlxrunner` 目前串行处理请求，且长驻 runner 存在响应串扰风险。Apple Silicon 上构建多用户服务需等待后续优化。

4. **多文件 GGUF 导入仍是长期痛点**：Issue #5245 已开放两年、156 👍，是社区高需求功能。当前拆分模型仍需手动合并后才能导入。[Issue #5245](https://github.com/ollama/ollama/issues/5245)

5. **工具调用解析错误信息将改善**：多个 PR（[#17651](https://github.com/ollama/ollama/pull/17651)、[#17658](https://github.com/ollama/ollama/pull/17658)）正在为 Qwen3-VL 等解析器添加客户端可读的错误上下文，并支持渐进式工具参数流式输出，对 LangGraph 等框架的调试体验将有实质提升。

---

*日报基于 2026-08-11 GitHub 公共数据生成，共覆盖 2 个 Release、28 条活跃 Issue、23 条 Pull Request。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 — 2026-08-11

## 1. 今日速览

LiteLLM 的 **Rust 重写（Rust Migration）** 仍是社区关注度最高的事件（Issue #31263，👍16，评论 19），本周有 DeepSeek provider parity、Docker 镜像 cosign 签名验证等实质性进展落地。稳定性和计费方向成为今日 PR 主战场：**流式 usage 成本缺失**（#36492/#36523）与 **OpenAI passthrough 流式成本注入**（#36503）同时有修复 PR 提交，流式场景成本可追溯性有望补上最后一块短板。此外，针对多副本部署下的 **TPM 限流失效**（#27736）、**streaming usage 少计**（#36114）等长期问题仍在排查中。

---

## 2. 版本发布与破坏性变更

### v1.96.0 — 强制 Docker 镜像签名验证
- **内容**：发布 v1.96.0，所有 Docker 镜像均使用 cosign 签名，并给出验证命令。该签名密钥自 commit `0112e53` 起统一使用。
- **影响**：生产环境拉取镜像时应增加 `cosign verify` 步骤，防止供应链投毒。
- 链接：https://github.com/BerriAI/litellm/releases/tag/v1.96.0

### Rust 迁移状态跟踪
- 主 ticket 持续开放，官方已开放早期 Beta 测试者报名。当前 Rust 版本已覆盖 `/messages` 路由，**DeepSeek provider 支持**（PR #36520）今日补齐，与 Python 版行为对齐（auth、URL、metadata、tool）。
- 链接：https://github.com/BerriAI/litellm/issues/31263 · https://github.com/BerriAI/litellm/pull/36520

---

## 3. 新模型与硬件支持

- **MiniMax 图像生成**（PR #35737）：新增 `/v1/image_generation` adapter，支持 image-01 / image-01-live 模型。
- **Nadir 智能路由提供商**（PR #33227）：新增 OpenAI 兼容的 `nadir/auto` 虚拟模型，服务端按请求复杂度自动路由到最廉价模型。
- **Bedrock tool-search beta 支持**（PR #36502）：为 Haiku 4.5 和 Opus 4.7 添加 `tool_search_tool_*` 所需的 beta header。
- **Bedrock adaptive thinking**（PR #36507）：修复 Converse 模式下 Opus 4.7 adaptive thinking effort 字段丢失导致零思考块的问题。
- **Z.AI glm-5.2[1m] 尚未支持**（Issue #32218）：文档宣传的 1M 上下文变体在代理返回 `Unknown Model`，需等待模型名翻译层更新。

---

## 4. 性能与优化

- **Rust 网关**（Issue #31263）：目标 overhead < 1ms，当前处于 early beta 阶段。
- **事件循环阻塞修复**（Issue #36174）：`Router.async_get_healthy_deployments` 在 async 路径上直接调用同步 tiktoken token_counter，会阻塞事件循环。`enable_pre_call_checks=True` + `max_input_tokens` 场景下影响明显，建议关注后续 fix。
- **Spend 更新可配置化**（Issue #31866）：`disable_entity_spend_updates` 标志可在高 QPS 下跳过实体级计数器 UPDATE（仅保留 INSERT 日志），为记账写放大提供逃生舱。
- **每部署独立故障策略**（Issue #31876）：router cooldown 的全局 `allowed_fails` 拆分为 per-deployment `allowed_fails_policy`，并修正 DualCache TTL。
- **多副本 TPM 限流失效**（Issue #27736）：`usage-based-routing-v2` 下 `litellm_params.tpm` 是 per-pod 计数，N 副本实际限流阈值放大 N 倍，跨 pod 限流需引入 Redis 原子计数。

---

## 5. 稳定性与回归

按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| 🔴 高 | **流式 usage 严重少计**（Issue #36114）：chain proxy 场景下 final usage 与真实 token 数偏差巨大，已定位为 stream aggregation 层问题，而非 provider 转换 | 无 fix PR，排查中 |
| 🔴 高 | **预算绕过**（Issue #26672）：v1.82.3 上 `key/user max_budget` 失效，spend 已超限仍继续放行 | 无 fix PR |
| 🔴 高 | **TPM 限流跨 pod 失效**（Issue #27736）：多副本下实际 TPM 上限 = `tpm_limit × N_replica` | 无 fix PR |
| 🟠 中 | **OpenAI passthrough 流式成本缺失**（Issue #36523 / #36492）：流式 `/v1/responses` 成本恒为 $0；#36525 修复 cost+call_type 记录 | 有 PR #36525 / #36503 |
| 🟠 中 | **max_parallel_requests 泄漏**（Issue #27955）：客户端中断流式 `/v1/messages` 时 Redis 计数器单调递增，最终所有请求被拒 | 无 fix PR |
| 🟠 中 | **Anthropic bridge 缓存计费丢失**（Issue #36091）：由 Responses API 模型（gpt-5.x）服务 Anthropic `/v1/messages` 时 `cache_read_input_tokens` 恒为 0 | 无 fix PR |
| 🟠 中 | **系统提示日志静默丢失**（Issue #36402）：Anthropic system 传 content-block list 时被 `isinstance(str)` 守卫丢弃 | 有 PR #36427 |
| 🟠 中 | **Vertex AI Agent Engine 流提前终止**（Issue #19121）：多 agent + MCP tools 在 inner-action STOP 时过早结束 SSE | 有 PR #27139 |
| 🟡 低 | **自定义定价不生效**（Issue #36521 关联）：`litellm_params` 中 `input_cost_per_token` 等未合并到 `model_info` | 有 PR #36521 |
| 🟡 低 | **Bedrock Converse 文档消息被 AWS 拒绝**（Claude Code PDF 读取失败） | 有 PR #36499（注入 text block 占位） |
| 🟡 低 | **MCP OAuth2 issuer 不匹配**（RFC 8414 违规）：named server 的授权服务器 issuer 与保护资源元数据不一致 | 有 PR #36522 |
| 🟡 低 | **vLLM GET passthrough 路由失败**（PR #22104）：`/vllm/metrics` 等 GET 请求因 request body 无 `model` 字段而错误路由 | 有 PR #22104 |
| 🟡 低 | **空 Bearer 头**（Issue #27434）：`openai/*` 模型 `api_key` 配字面量时发出 `Authorization: Bearer `，httpx 客户端侧直接拒绝 | 无 fix PR |

---

## 6. 对应用开发者的意义

- **账单与用量追溯**：当前流式成本缺失影响两类路径——OpenAI passthrough 流式（已有 fix PR，建议跟进 #36503/#36525）和升级链路上的 usage 少计（#36114 仍在排查）。如果你依赖成本监控做预算，建议暂时对 chain proxy + streaming 场景做对账。
- **Rust 迁移窗口开启**：新代码正在按 Rust/Python 双轨推进，`/messages` 路由已补 DeepSeek。若你深度使用 Claude Code / Anthropic 协议，建议关注迁移进度和兼容性公告，不要立即迁移生产流量。
- **Langfuse v4 升级倒计时**：Langfuse 官方人员已直接提交升级请求（Issue #33383，PR 待合并），当前 `pyproject.toml` 仍锁定 `langfuse = "^2.45.0"`。使用 Langfuse 回调的团队应评估 v4 迁移影响，避免上游弃用 v2 后丢失 trace。
- **新的可配置治理开关**：PR #36514 和 #36518 均引入 opt-in 的 `enforce_model_rpm_tpm_on_create` 类配置，强制模型创建时携带 rpm/tpm——这对平台规范化和防误用有益，但开启前需确认存量模型定义已补全限流参数。
- **Routing group 成为一等公民**（PR #36519）：路由组名将可被直接调用并出现在 `/v1/models` 中，Claude Code / Codex 等工具可直接发现和调用 group，这对基于模型组做租户隔离的部署是利好。
- **多副本部署风险清单**：若使用 K8s 多副本，请立即检查以下两项：TPM 限流是否虚高（#27736）；告警/花费报告是否重复（#14809）。这两项均为已知缺陷且暂无修复，需要在架构层面规避（如按副本拆分模型或外部限流）。

---

*数据窗口：2026-08-10 至 2026-08-11（GitHub API 更新时间）。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-11

## 今日速览

Meta 开放了首个来自 Meta Superintelligence Labs 的模型 **Muse Glimmer 30B**（Apache 2.0），Unsloth 已连夜发布 v0.1.61-beta 支持运行及 Dynamic 量化版本；同时 Unsloth Studio 针对 Windows / ROCm 用户集中修复了一批路径处理、内存检测与模型加载回归，其中 Windows 盘符路径导致 chat 503 的问题已有修复 PR 合入。

---

## 版本发布与破坏性变更

**v0.1.61-beta**（同日存在 v0.1.60-beta，均围绕 Muse Glimmer 支持）
- 核心内容：支持 Meta Muse Glimmer 30B（dense, 30B, Apache 2.0，面向本地 agentic 与 coding 工作流），可通过 Unsloth 及 Unsloth Dynamic 量化运行。
- 破坏性变更：无明确标注；注意 v0.1.61-beta 与 v0.1.60-beta 描述一致，建议升级至 v0.1.61-beta 以获取最新修复。

> 来源: [Release v0.1.61-beta](https://github.com/unslothai/unsloth/releases)（GitHub Releases 未提供独立链接，建议关注 repo releases 页）

---

## 新模型与硬件支持

- **Meta Muse Glimmer 30B**：今日最重量级新增支持。dense 30B 模型，Apache 2.0 许可，面向本地 agentic/coding 场景。支持运行 + Dynamic 量化（见上）。相关 Bug：[#8345](https://github.com/unslothai/unsloth/issues/8345) 报告 Studio 捆绑的 llama.cpp b10333 尚不能加载 `muse-glimmer` GGUF 架构，该 issue 已关闭。
- **MiniMax M3 GGUF**（`UD-Q5_K_XL` 变体）：Apple Silicon（M3 Ultra）加载失败，`缺失 indexer.head_count metadata`，issue 仍开放： [Issue #8360](https://github.com/unslothai/unsloth/issues/8360)
- **GLM-OCR**：用户报告无法加载 `unsloth/GLM-OCR`，复现于 DeepSeek_OCR2 微调 Colab 环境，issue 仍开放： [Issue #4269](https://github.com/unslothai/unsloth/issues/4269)
- **AutoRound 模型**：加载 `Qwen3.6-27B-int4-AutoRound` 失败，尽管已安装 auto-round：[Issue #7997](https://github.com/unslothai/unsloth/issues/7997)

---

## 性能与优化

- **MTP 能力探测超时**：PR [#8334](https://github.com/unslothai/unsloth/pull/8334) 修复 Studio 中反复出现的 `llama-server` MTP 能力探测超时问题（此前探测失败会导致进程剩余生命周期静默禁用投机解码），已合入。
- **DFlash 投机解码自动启动**：PR [#8338](https://github.com/unslothai/unsloth/pull/8338) 让 Studio 自动启动 `dflash-*.gguf` 投机解码侧车模型，此前仅被识别为排除项，从不实际加载。
- **Chat 发送路径文件读取优化**：PR [#8382](https://github.com/unslothai/unsloth/pull/8382) 将 chat 发送前重复读取同一会话记录从 4 次降至 1 次，减少生成前延迟。
- 具体性能数字未在今日数据中披露。

---

## 稳定性与回归

**高严重度（已修复/有修复 PR）**

- **Windows 盘符路径导致所有本地 GGUF chat 503**：`split_model_ref` 在 Windows 绝对路径的盘符处错误切分，导致 `model_switch_failed`。修复已合入：[PR #8399](https://github.com/unslothai/unsloth/pull/8399)（涉及 Issue [#8368](https://github.com/unslothai/unsloth/issues/8368)、[#8375](https://github.com/unslothai/unsloth/issues/8375)）
- **Muse-Glimmer-30B-GGUF 无法被捆绑 llama-server 加载**：Studio 能下载模型，但 b10333 版本不识别 `muse-glimmer` GGUF 架构。[Issue #8345](https://github.com/unslothai/unsloth/issues/8345)（已关闭）
- **MiniMax M3 GGUF 在 Apple Silicon 加载失败**：缺 `indexer.head_count` metadata，仍开放：[Issue #8360](https://github.com/unslothai/unsloth/issues/8360)
- **NVFP4 在 5060 Ti 16 GB 上无法加载**：仍开放：[Issue #8246](https://github.com/unslothai/unsloth/issues/8246)

**中严重度（进行中）**

- **ROCm / 多 GPU 设备选择**：PR [#7670](https://github.com/unslothai/unsloth/pull/7670) 阻止 llama-server 运行在没有对应 kernel 的 ROCm GPU（iGPU 上报共享内存导致误选）。仍在开放。
- **Windows ROCm `mem_get_info` 哨兵值未修正**：`free == total` 导致内存保护逻辑中的 host-RAM spill 拒绝机制失效，影响 AMD RX 6800/W7900 用户。开放中：[Issue #8403](https://github.com/unslothai/unsloth/issues/8403)、[#7452](https://github.com/unslothai/unsloth/issues/7452)、[#7164](https://github.com/unslothai/unsloth/issues/7164)
- **Debian 13 下 hipconfig 5.7 干扰 ROCm 6.1 检测**，CPU-only torch 被错误安装。[Issue #8402](https://github.com/unslothai/unsloth/issues/8402)
- **AMD Ryzen AI 安装失败**：[Issue #8335](https://github.com/unslothai/unsloth/issues/8335)
- **Studio 无法加载自己启动的本地模型**：[Issue #8365](https://github.com/unslothai/unsloth/issues/8365)（已关闭）
- **Studio 修改 Models 文件夹后模型丢失**：[Issue #8407](https://github.com/unslothai/unsloth/issues/8407)
- **clean shutdown 时的 h11 traceback**（外观像崩溃，实际无影响）：[Issue #8404](https://github.com/unslothai/unsloth/issues/8404)
- **API 查询不存在模型时无报错、静默路由到内存中的模型**：PR [#8389](https://github.com/unslothai/unsloth/pull/8389) 修复为返回 404，修复 [#8376](https://github.com/unslothai/unsloth/issues/8376)
- **`unsloth.__version__` 错误别名 `unsloth_zoo` 的版本号**：核心发布快于 zoo 时会误报，已关闭：[Issue #8171](https://github.com/unslothai/unsloth/issues/8171)

**低严重度（体验/功能类）**

- 对话刷新 5-6 次后历史被清空：[Issue #7732](https://github.com/unslothai/unsloth/issues/7732)
- 外部 provider 下架模型后 UI 显示原始 internal id：[Issue #8405](https://github.com/unslothai/unsloth/issues/8405)
- Image Gen 可选水印/元数据/来源追踪（功能请求）：[Issue #8369](https://github.com/unslothai/unsloth/issues/8369)
- 思考内容默认折叠（功能请求）：[Issue #8370](https://github.com/unslothai/unsloth/issues/8370)

---

## 对应用开发者的意义

- **Windows 部署注意**：如果您的应用在 Windows 上通过 `/v1` API 管理本地 GGUF 模型，请升级至包含 [PR #8399](https://github.com/unslothai/unsloth/pull/8399) 的版本，否则本地模型路径含盘符将导致 chat 503。
- **API 容错修复**：升级后 API 对不存在的模型 ID 将返回 404 而非静默路由到内存中的其他模型，避免“答非所问”的隐蔽错误——对多模型 Agent 应用尤其重要（[PR #8389](https://github.com/unslothai/unsloth/pull/8389)）。
- **Muse Glimmer 集成**：新模型已可用，但注意若通过 Studio 使用，需确认捆绑的 llama.cpp 版本已支持 `muse-glimmer` 架构（[Issue #8345](https://github.com/unslothai/unsloth/issues/8345) 已关闭，修复应已合入）。
- **预量化模型加载安全**：PR [#8409](https://github.com/unslothai/unsloth/pull/8409) 将 `torch.load` 切换为 `weights_only=True` 加构造函数白名单，消除了 pickle 代码执行风险——如果您加载的是托管预量化 checkpoint，这是安全相关更新。
- **版本号检查注意**：`unsloth.__version__` 可能实际返回 `unsloth_zoo` 版本。在依赖版本检测的 CI/监控中留意此问题（[Issue #8171](https://github.com/unslothai/unsloth/issues/8171) 已关闭修复）。
- **投机解码性能**：DFlash 侧车自动启动（[PR #8338](https://github.com/unslothai/unsloth/pull/8338)）可让使用 DFlash 量化模型的用户直接获得投机解码加速，无需手动配置。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*