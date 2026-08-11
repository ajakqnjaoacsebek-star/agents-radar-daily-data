# AI 基础设施日报 2026-08-11

> 生成时间: 2026-08-11 07:02 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施横向对比分析报告（2026-08-11）

## 1. 生态全景

今日是典型的"模型发布驱动基础设施跟进"日：Meta 开源 Muse Glimmer，推动 Ollama/Unsloth 同日发版；vLLM 以 v0.27.0 完成 Kimi K3 全栈支持，SGLang 则以 roadmap 和优化 PR 跟进。与此同时，DeepSeek-V4 生态占据最大讨论量，但其硬件适配（SM8x 不支持）与 CUDA Graph/投机解码稳定性问题仍是跨项目的共同痛点。整体态势可概括为：新模型发布节奏加快、推理引擎进入架构重构期（MRV2、Rust 重写）、稳定性与正确性追赶不上功能扩张速度。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Release | 关键活跃度数据 | 版本特征 |
|---|---|---|---|
| **vLLM** | v0.27.0 | v0.27.0 含 561 commits / 242 贡献者（64 位新贡献者） | Kimi K3 全栈、Transformers 5.15.0、MRV2 推进 |
| **SGLang** | 无 | 自动 coredump 追踪器累计 231 条评论；CI 3 broken / 11 flaky | 大量 DeepSeek-V4 PR，无集中发布 |
| **llama.cpp** | b10353–b10357（5 个） | 最高热度 issue（Qwen3.5 工具调用）59 条评论 | 连续小步快跑，ROCm 7.14、多输出采样 |
| **Ollama** | v0.32.7 / v0.32.8 | 多文件 GGUF 需求 106 条评论 / 156 👍 | Muse Glimmer 初版落地，MLX 引擎风险未消 |
| **LiteLLM** | v1.96.0 | 24h 活跃 Issue 86 条 / 活跃 PR 231 条 | cosign 镜像签名，Rust 迁移 Beta 报名中 |
| **Unsloth** | v0.1.61-beta / v0.1.60-beta | 多个性能 PR 密集合并（#8371/#8382/#8392…） | Muse Glimmer 即时支持，Studio 修复为主 |

> 注：仅 LiteLLM 明确报告了全量活跃 Issue/PR 数；其余从日报可追踪的热度数据提取。

---

## 3. 模型支持竞速

| 模型/架构 | 领先者 | 状态 |
|---|---|---|
| **Kimi K3** | **vLLM** 全栈支持（Python/Rust 前端 + AttnRes 内核，NVIDIA 可用） | SGLang 仅为 Roadmap；ROCm 支持均未就绪 |
| **Muse Glimmer（Meta）** | **Ollama / Unsloth**（发布当日跟进） | Ollama：MLX 优先，但 manifest 有缺陷（412/NVFP4 错配）；Unsloth：需配套更新版 llama.cpp；llama.cpp 侧 OpenVINO 后端 PR 进行中 |
| **DeepSeek-V4-Flash** | **vLLM / SGLang**（大量优化） | 共同硬约束：A100/A800（SM8x）不可用；SGLang 侧重 TBO/CP 优化，vLLM 侧重稳定性修复 |
| **Granite-Switch** | llama.cpp 已合并（CPU POC） | 新 LoRA 路由架构，GPU 后端未跟进 |
| **Nemotron MTP / 循环状态** | llama.cpp（MTP 已合并，状态回滚 PR 中）；Ollama（MLX 支持已合入） | MTP 跨请求状态残留问题公开（llama.cpp #26425） |
| **dots.note.omni / Apertus 1.5 / BailingMoE3** | SGLang / Ollama / llama.cpp 各有 PR 推进 | 均未合并 |

**结论**：vLLM 在"生产级 Day0 支持"维度领先（Kimi K3），Ollama+Unsloth 在"开源模型即时可玩"维度领先（Muse Glimmer），llama.cpp 在新架构覆盖广度上持续领先，SGLang 在 DeepSeek-V4 优化深度上投入最大。

---

## 4. 性能优化前沿

各项目今日优化火力集中在四个方向：

- **投机解码 / MTP**：vLLM 恢复 MRV2 多步 CUDA graph 融合（#46849）；llama.cpp 合并 Nemotron MTP、推进 draft 状态回滚（#26623）；Unsloth 修复 MTP 探针缓存导致静默禁用（#8334）。但正确性隐患已浮现（llama.cpp 量化+投机输出不一致 #25618）。
- **注意力 / FlashAttention 内核**：llama.cpp 优化 OpenCL FA prefill 局部性（b10357）、CUDA FA fp16 XOR swizzle 降 bank conflict（#25635）；Ollama MLX 为 Muse Glimmer 重写 Metal kernel；vLLM 推进 PTX 9.4 `ldmatrix.s8.s4` 硬件整数扩展加载。
- **量化后端系统化**：MXFP4/NVFP4/W4A8 不再是单纯的模型压缩问题，而是深入 shard 分配（vLLM #51473）、KV cache（FlashInfer RFC #47684）、自动微分载体（Unsloth Dynamic Quants）等环节；但 SGLang W4AFP8+DeepEP 崩溃、llama.cpp 量化+投机分歧说明该方向仍不成熟。
- **MoE / 分布式执行**：SGLang 为 DeepSeek-V4 引入 decode 阶段 TBO（#33834）和 prefill CP 双 batch 重叠（#33480）；llama.cpp 社区提出 MoE 专家权重免 H2D 拷贝的 PCIe DMA 方案（#26448），8GB 显存可跑 81GB 模型，属架构级高影响提议。
- **引擎架构重构**：vLLM MRV2 将 DeepSeek V4 默认切换到新路径；LiteLLM 推进 Rust 重写（sub-1ms 目标）；llama.cpp 合入多输出后端采样（b10355）。三者共同信号：现有 Python/CUDA graph/同步 I/O 抽象已逼近可维护性和性能上限。

---

## 5. 分层定位差异

| 层次 | 项目 | 核心职责 | 今日关键差异化 |
|---|---|---|---|
| **生产推理引擎/模型服务** | vLLM、SGLang | 高吞吐服务、多卡/多节点扩展、前沿模型 Day0 | vLLM 以 MRV2 重构执行路径，Kimi K3 全栈支持；SGLang 深耕 DeepSeek-V4 的 DeepEP/TBO/CP 组合优化 |
| **本地/边缘推理运行时** | llama.cpp、Ollama | 跨平台（CPU/CUDA/Metal/Vulkan/ROCm）、GGUF 分发、低部署门槛 | llama.cpp 新架构覆盖最广（Granite-Switch/Nemotron），Ollama 主打零门槛 + MLX 差异化；两者共享底层运行时但 Ollama 更偏消费级 |
| **AI 网关/代理层** | LiteLLM | 多 provider 路由、预算/限流、安全审计、可观测性 | 与底层算子完全解耦；今日重点是 cosign 供应链安全、Rust 低延迟重写、预算/用量正确性修复 |
| **训练/微调 + 一体化运行时** | Unsloth | 高效微调、动态量化、Studio 一体化 API | 独特地横跨"训练→导出→推理"链路；Muse Glimmer 即时支持 + 聊天路径低延迟优化 |

定位互补明显：vLLM/SGLang 解决"集群里怎么跑满算力"，llama.cpp/Ollama 解决"个人设备上怎么跑起来"，LiteLLM 解决"很多模型怎么统一治理"，Unsloth 解决"模型怎么改快改小并落地"。

---

## 6. 值得关注的趋势信号

1. **模型发布即生态竞速日**：Meta 开源模型与 Kimi K3 在同一天驱动四五个项目发版/合码。基础设施对头部模型的 Day0 支持能力已成为竞争焦点，但也直接导致今日 vLLM v0.27.0 出现 DeepSeek-V4 升级回归——快速跟进与稳定性的矛盾开始显性化。
2. **推理引擎进入"重写期"**：vLLM MRV2、LiteLLM Rust、llama.cpp 多输出采样、SGLang 公共基础重构，都在尝试摆脱历史抽象负债（CUDA graph 捕获、Python 事件循环、同步 tokenizer）。技术决策者应关注新架构的迁移窗口，而非在旧路径上继续投入。
3. **新模型架构多样性开始压垮"通用运行时"假设**：Nemotron 循环状态、Granite-Switch 的逐 token LoRA 路由、Muse Glimmer 的多模态预处理器，要求运行时具备状态回滚、动态层选择、多模态流水线编排能力。llama.cpp 的 Nemotron 状态回滚 PR 和 Ollama 的 Gemma4 视觉预处理器是这个方向最早的具体动作。
4. **正确性/稳定性是最大的隐性成本**：Ollama MLX 跨请求响应污染、LiteLLM 预算绕过、vLLM v0.27 回归、SGLang DSpark 非法内存访问、llama.cpp 量化+投机分歧——今日每个项目都至少有一个高危正确性缺陷无修复。对 Agent/生产应用而言，**锁定版本 + 回归测试** 比追踪最新功能更重要。特别建议：Ollama 用户暂避 MLX 长驻 runner（keep_alive=-1），vLLM 生产环境暂缓升级 v0.27.0。
5. **硬件碎片化拖累生态**：DeepSeek-V4-Flash 明确不支持 SM8x，ROCm 7.14/7.2 门禁并行推进，Jetson 升级丢模型，Windows-on-Arm 连 `-march` 都没设。非 NVIDIA 主线的支持大多停留在"能跑"而非"跑好"。
6. **Agent 工作负载成为基础设施设计约束**：Muse Glimmer 定位编码代理、Ollama 新增 Qwen 渐进式工具调用流式、LiteLLM 修复 Anthropic mid-turn system 消息、SGLang 提出 KV 感知路由恢复机制——基础设施已从"生成 token"转向"维持 Agent 状态与工具闭环"。应用开发者应优先评估工具调用链路（llama.cpp Qwen3.5 问题、Ollama VS Code 回归）和 KV 生命周期管理能力。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 — 2026-08-11

## 1. 今日速览
vLLM 发布 v0.27.0，以 Kimi K3 全栈支持为核心（模型内核、前端与 AttnRes 内核均合入）。DeepSeek-V4-Flash 系列成为社区焦点：SM8x (A100/A800) 支持呼声极高、KV cache 膨胀问题被详细报告，且今日有用户反馈升级至 v0.27.0 后运行报错。Model Runner V2 (MRV2) 方向持续推进，多个相关 PR 处于活跃状态。

## 2. 版本发布与破坏性变更
- **[v0.27.0](https://github.com/vllm-project/vllm/releases)** — 本日核心发布。包含 561 个 commits、242 位贡献者（含 64 位新贡献者）。重点：
  - Kimi K3 全栈落地：核心模型与 kernels ([#50089](https://github.com/vllm-project/vllm/pull/50089), [#50000](https://github.com/vllm-project/vllm/pull/50000))、Python 前端 ([#50093](https://github.com/vllm-project/vllm/pull/50093))、Rust 前端 ([#50104](https://github.com/vllm-project/vllm/pull/50104))、AttnRes kernels ([#50090](https://github.com/vllm-project/vllm/pull/50090))。
  - **注意事项**：今日已出现 v0.26.0 → v0.27.0 升级后 DeepSeek-V4 运行报错的 issue（见下文稳定性部分）。
- Transformers 版本计划升级至 5.15.0（[#51668](https://github.com/vllm-project/vllm/pull/51668)），当前 `latest` 镜像已包含该版本。

## 3. 新模型与硬件支持
- **Kimi K3**：v0.27.0 提供完整支持，包含 Python/Rust 前端及 AttnRes 内核。ROCm 支持仍在推进中，已有独立 roadmap 跟踪（[#50682](https://github.com/vllm-project/vllm/issues/50682)）。
- **DeepSeek-V4-Flash-0731**：发行版 checkpoint 与 DeepSeek-V4-Flash 同架构。**SM8x（A100/A800/RTX 30xx）不支持**，两个 issue 均追踪此限制（[#50576](https://github.com/vllm-project/vllm/issues/50576)、[#40851](https://github.com/vllm-project/vllm/issues/40851)），尚无 fix PR。
- **[XPU] UVA 权重 offloading**（[#51770](https://github.com/vllm-project/vllm/pull/51770)）：修复启用 `--cpu-offload-gb` 时 XPU 引擎启动崩溃，等待 vllm-xpu-kernels 侧修复后移除。
- **[ROCm] MXFP4 TP8 shard 保留**（[#51473](https://github.com/vllm-project/vllm/pull/51473)）：修复 DeepSeek-V4 在 ROCm 上 MXFP4 TP8 原生 shard 分配被无效 padding 的问题。
- **[AutoRound] Block-Wise FP8 支持**（[#47434](https://github.com/vllm-project/vllm/pull/47434)）：仍开放中。
- **[RFC] FlashInfer NVFP4 KV cache 预-SM100 支持**（[#47684](https://github.com/vllm-project/vllm/issues/47684)）：目标是在 Ampere/Hopper 上可用该特性，当前仍为 RFC。

## 4. 性能与优化
- **[MRV2] AR 投机解码多步 CUDA graph 融合**（[#46849](https://github.com/vllm-project/vllm/pull/46849)）：恢复 AR 投机解码在 MRV2 中的 fused multi-step CUDA graph 执行，消除逐 draft step 重建 graph 的开销。
- **[多模态] Prompt update 扫描优化**（[#51774](https://github.com/vllm-project/vllm/pull/51774)）：避免多模态 prompt 更新的二次方复杂度（O(N²) → 线性）。
- **[Kernel] PTX 9.4 `ldmatrix.s8.s4` 采用**（[#49529](https://github.com/vllm-project/vllm/issues/49529)）：在 W4A8-INT8 路径利用硬件 INT4→INT8 扩展加载，免去软件转换。
- **[MoE] HPC BF16xFP32 路由 GEMM**（[#49312](https://github.com/vllm-project/vllm/pull/49312)）：SM90 上为 FP32 MoE router 权重提供可选高精度路径，缓存 BF16 高低位分解。
- **[DeepSeek V4] CUDA graph region 收窄回滚**（[#51750](https://github.com/vllm-project/vllm/pull/51750)）：因 nightly CI GSM8K 测试失败，回滚合并的 perf 优化 (#51430)。

## 5. 稳定性与回归
按严重程度排序：

- **[高] v0.27.0 升级后 DeepSeek-V4 报错**（[#51758](https://github.com/vllm-project/vllm/issues/51758)）：今日用户创建，目前无 fix PR。
- **[高] Gemma4 在 Transformers 5.15.0 下启动失败**（[#51744](https://github.com/vllm-project/vllm/issues/51744)）：`CUDNN_STATUS_INTERNAL_ERROR` 于图片预处理阶段（`--mm-device-do-normalize`），issue 已关闭（[#51717](https://github.com/vllm-project/vllm/issues/51717)）；Gemma4 启动失败与 Transformers 5.15.0 相关（[#51744](https://github.com/vllm-project/vllm/issues/51744)），有相应 version bump PR ([#51668](https://github.com/vllm-project/vllm/pull/51668))。
- **[高] DeepSeek V4 MRV1 piecewise CUDA graph 崩溃**（[#51768](https://github.com/vllm-project/vllm/pull/51768)）：已提交 fix PR — 默认走 MRV2，仅对 MRV1 + PIECEWISE/FULL_AND_PIECEWISE 配置做拒绝。
- **[中] qwen3_xml tool parser 吞掉 `</think>`**（[#51679](https://github.com/vllm-project/vllm/issues/51679)）：reasoning 被错误合并到 content。
- **[中] FlashInfer sampler JIT 崩溃**（[#49497](https://github.com/vllm-project/vllm/issues/49497)）：nvcc 不可发现时无 fallback 至 native sampler。
- **[中] ROCm MI325X 内存访问错误**（[#48266](https://github.com/vllm-project/vllm/issues/48266)）：DeepSeek-V4-Flash + fp8 KV + 超 2048 token 序列导致 worker crash，无 fix。
- **[中] Mistral3 复合 VLM `tie_word_embeddings` 解析错误**（[#51063](https://github.com/vllm-project/vllm/issues/51063)）：从顶层 config 读取导致丢弃真实 `lm_head.weight`，输出语义错误。
- **[低] DeepSeek-V4 回归分析**（[#49927](https://github.com/vllm-project/vllm/issues/49927)）：A/B 测试表明 #48137 消耗 10.6% spec-decode acceptance，#48660 改变输出分布。

## 6. 对应用开发者的意义
- **升级需谨慎**：v0.27.0 已确认存在 DeepSeek-V4-Flash 回归（[#51758](https://github.com/vllm-project/vllm/issues/51758)）；若生产环境运行 DeepSeek-V4 且依赖 MRV1 + CUDA graph，建议等待 fix PR ([#51768](https://github.com/vllm-project/vllm/pull/51768)) 合入后再升级。
- **Transformers 5.15.0 兼容性风险**：`latest` 镜像已带该版本，Gemma4 等模型可能受影响（[#51744](https://github.com/vllm-project/vllm/issues/51744)），建议项目锁定 Transformers 版本。
- **A100/A800 用户注意**：DeepSeek-V4-Flash 及 -0731 目前无法在 SM8x 上运行，部署前需确认硬件匹配。
- **MRV2 正成为默认路径**：DeepSeek V4 默认切换至 MRV2（[#51768](https://github.com/vllm-project/vllm/pull/51768)），若使用自定义 CUDA graph 或投机解码配置，需关注 MRV2 兼容性。
- **Kimi K3 生态起步**：全新模型支持已合入，但 ROCm 支持仍是 roadmap 状态（[#50682](https://github.com/vllm-project/vllm/issues/50682)），团队可评估在 NVIDIA 平台上的早期采用。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-11

## 今日速览

DeepSeek-V4 生态是今日焦点：DSpark 方向持续暴露 CUDA Graph 捕获/重放相关的非法内存访问问题（#31023、#33356），同时新报告了 0.5.17 中分层缓存 + chunked prefill 导致的调度器挂起与采样器设备端断言（#34235）。社区侧仍以稳定性修复为主，另有 AMD ROCm 7.2 门禁升级、DSV4 decode TBO 等多项 PR 推进中。

## 新模型与硬件支持

- **Kimi K3 Roadmap 持续更新**：包含 Day0 支持、DSpark 权重、Bug 追踪等链接，是当前社区关注度最高的新模型路线图。 [Issue #32607](https://github.com/sgl-project/sglang/issues/32607)
- **[PR] dots.note.omni 模型完整支持**：PR #33829 为 dots.note.omni 补齐原生编码器、视频预处理和 MTP 解码，当前处于 open 状态。 [PR #33829](https://github.com/sgl-project/sglang/pull/33829)
- **Wide EP 部署问题讨论**：用户在 GB200（NVLink）与 B200（RDMA over EFA）上尝试为 GLM5-2 / Kimi-K3 启用 Wide EP 遇到部署失败，社区暂未给出解决方案。 [Issue #34120](https://github.com/sgl-project/sglang/issues/34120)
- **[PR] AMD 门禁升级至 ROCm 7.2**：WIP 状态下将 AMD PR 门禁从 ROCm 7.0 切换到 7.2，7.0 降级为每日影子测试。 [PR #34204](https://github.com/sgl-project/sglang/pull/34204)

## 性能与优化

- **DeepSeek V4 性能追踪专页**：#33636 专门追踪 SM90/SM100/SM103 上 DeepSeek-V4 的性能优化 PR 进展，当前有 3 个 👍。 [Issue #33636](https://github.com/sgl-project/sglang/issues/33636)
- **[PR] DeepSeek V4 decode 阶段 TBO 支持 DeepEP**：PR #33834 为 DeepSeek-V4 在 decode 阶段引入 TBO（time-based overlap）能力，配合 DeepEP MoE 后端。 [PR #33834](https://github.com/sgl-project/sglang/pull/33834)
- **[PR] 支持 DeepSeek V4 预填充 CP 双 batch 重叠（AMD）**：针对 ROCm 平台优化 prefill 阶段 context parallel 的执行效率。 [PR #33480](https://github.com/sgl-project/sglang/pull/33480)
- **上下文并行（CP）路线图进行中**：#21788 标记为 high priority，当前仅覆盖部分模型和注意力后端，Decode CP 与更多后端支持仍在规划中。 [Issue #21788](https://github.com/sgl-project/sglang/issues/21788)

## 稳定性与回归

按严重程度排列（标注修复状态）：

1. **0.5.17 分层缓存 + chunked prefill 调度器挂起（新报告）**、DeepSeek-V4 FP8/H20 上 sparse prefill 触发 watchdog abort，且 0.5.16 + PR 还伴随采样器设备端断言。暂无 fix PR。 [Issue #34235](https://github.com/sgl-project/sglang/issues/34235)
2. **DSpark compact target-verify CUDA Graph 在 TP8 上的时序敏感非法内存访问**：跨 TP 规划不一致导致各 rank 选择不同 verify budget，PR #31195 已修复控制流问题，整体问题仍 open。 [Issue #31023](https://github.com/sgl-project/sglang/issues/31023)
3. **DSpark 大 decode CUDA-Graph 捕获时非确定性非法内存访问（v0.5.16）**：官方镜像上 B300/B30Z TP8 启动阶段即可能崩溃，失败形状因启动而异。暂无 fix。 [Issue #33356](https://github.com/sgl-project/sglang/issues/33356)
4. **Z-Image BCG 单卡首次重放崩溃（TP=2 正常）**：已确认 CUDA illegal memory access，且与 `dit_cpu_offload` 相关。已关闭（可能是重复报告或已处理）。 [Issue #34183](https://github.com/sgl-project/sglang/issues/34183)
5. **W4AFP8 + DeepEP 首次推理即全 rank 崩溃**：GLM-5.2 上 `--quantization w4afp8 --moe-a2a-backend deepep` 导致 `TypeError: missing 'routed_scaling_factor'`，已关闭。 [Issue #33660](https://github.com/sgl-project/sglang/issues/33660)
6. **CI 基础设施追踪**：#26340 是自动收集的 CUDA coredump 追踪器，累计 231 条评论；[#17050](https://github.com/sgl-project/sglang/issues/17050) 显示 CI 当前 3 broken / 11 flaky，668 个近期修复。
7. **[PR] 修复 DP controller 阻塞问题**：PR #34233 解决 `DataParallelController` 中 ready pipe 在 spawn 循环内反复绑定导致除最后一个 rank 外父进程 writer 被提前丢弃的问题。 [PR #34233](https://github.com/sgl-project/sglang/pull/34233)
8. **[PR] 修复 PD 模式推理 token 统计**：PR #32898 修复 PD 分离部署中 handoff token 未被计入推理 token 的问题。 [PR #32898](https://github.com/sgl-project/sglang/pull/32898)
9. **[PR] 统一 `nsa` 后端别名为 `dsa`**：修复 `nsa` 声明为 deprecated alias 但未在 `_handle_legacy_cp_arguments` 等处归一化的问题。 [PR #34232](https://github.com/sgl-project/sglang/pull/34232)

## 对应用开发者的意义

- **KV 感知路由的可靠性基础**：RFC #33394 提出为 sgl-router 增加 KV 放置状态的快照 + 事件重放恢复机制，解决 Router 晚启动或丢事件时 KV 视图不一致的问题，对构建多副本推理集群的 Agent 应用很重要。 [Issue #33394](https://github.com/sgl-project/sglang/issues/33394)
- **Agentic 工作负载的 KV 可编程性**：#27574 提出从引擎上层预测 KV block 价值并支持程序化控制，有助于 Agent 场景下更长上下文和多轮调用的显存管理。 [Issue #27574](https://github.com/sgl-project/sglang/issues/27574)
- **异步 RL 下过时请求处理**：PR #34185（draft）在权重更新暂停期间主动丢弃已过时的请求，避免 `mode="retract"` 时积压无效请求，对训练-推理一体化场景有实际价值。 [PR #34185](https://github.com/sgl-project/sglang/pull/34185)
- **负载感知路由的新信号**：PR #32523 为 worker 进程增加 push-based load reporter，相比轮询 worker 端点可提供更及时、一致的负载视图，适合大规模 DP 部署中的路由决策。 [PR #32523](https://github.com/sgl-project/sglang/pull/32523)
- **推理 token 计费准确性**：PD 分离模式下推理 token 统计不准确会直接影响按 token 计费或用量监控，建议尽快跟进 #32898 的合入状态。 [PR #32898](https://github.com/sgl-project/sglang/pull/32898)
- **依赖升级需谨慎**：PR #34372 指出 `nvidia-cutlass-dsl==4.6.0` 与 `quack-kernels==0.6.3` 组合在 Blackwell 上导致 FA4 启动回归，升级到 CuTeDSL 4.6.2 可修复；应用若依赖 FA4 后端需关注此变更。 [PR #34372](https://github.com/sgl-project/sglang/pull/34372)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-11

## 今日速览

过去 24 小时发布 b10353–b10357 共 5 个版本，围绕多输出采样、OpenCL FA prefill 优化与 ROCm 7.14 升级三条主线推进。新架构支持方面，Granite-Switch 与 Nemotron MTP 已落地合并，BailingMoE3 与 Muse-Glimmer OpenVINO 后端仍在 PR 阶段。社区侧焦点依旧集中在 Qwen3.5 工具调用异常与 AMD 平台（Strix Halo/ROCm）的稳定性问题上。

---

## 版本发布与破坏性变更

**b10356：CI 目标升级至 ROCm 7.14（#25775）**
ROCm 构建/发布目标从 7.2.1 切换至 7.14——这是基于 TheRock 构建系统的首个生产版本，支持从 wheels/debs/rpms/tarballs/runfiles 安装多架构产物。使用 ROCm 自建环境的用户需迁移工具链。
🔗 https://github.com/ggml-org/llama.cpp/pull/25775

**b10353：ROLL 算子要求连续 src（#25928）**
`ggml_roll` 此前仅断言 `nb[0]`，但 CUDA/Metal 的 roll kernel 按 `ne` 索引而不读 `nb` strides，导致非连续 permuted src 在 CUDA/Metal 上产生**静默错误结果**。现已改为强制要求连续输入——若您的自定义图中有对非连续张量执行 ROLL 的逻辑，将触发断言失败，需显式先做 `ggml_cont`。
🔗 https://github.com/ggml-org/llama.cpp/pull/25928

**b10343：cpp-httplib 升级至 0.53.0（#26821）**
影响 llama-server 的 HTTP 层依赖，API 兼容，建议重新编译部署。
🔗 https://github.com/ggml-org/llama.cpp/pull/26821

---

## 新模型与硬件支持

**b10342：Granite-Switch 架构合并（#25107）**
新增 `granite-switch` 架构：一个 dense all-attention Granite-4.1 基座，内嵌 N 个 LoRA 适配器，通过控制 token 逐 token 选择路由。包含 gguf-py schema 扩展（arch/KV keys/stacked）。当前为 CPU POC，GPU 后端待后续跟进。对多领域混合推理场景有明确价值。
🔗 https://github.com/ggml-org/llama.cpp/pull/25107

**b10344：Nemotron 模型 MTP（Multi-Token Prediction）支持（#26725）**
为 Nemotron Nano 提供 MTP 支持，新增 `mtp_flags` KV 项。配合投机解码可提升小模型吞吐。
🔗 https://github.com/ggml-org/llama.cpp/pull/26725

**PR #26608：BailingMoE3 支持（进行中）**
新增 BailingMoE3 架构支持，目标运行 Ling 3.0 flash 模型（含 MTP），回应 issue #26590。
🔗 https://github.com/ggml-org/llama.cpp/pull/26608

**PR #26888：OpenVINO 后端 Muse-Glimmer 支持（进行中）**
新增 `GGML_UNARY_OP_SIGMOID`、`GGML_OP_ARGMAX` 算子支持，按层区分 sliding-window 与 full-attention，并在 GPU 上拒用 bf16 `GET_ROWS`。补齐 OpenVINO 的 Muse 支持缺口（对应 issue #26865）。
🔗 https://github.com/ggml-org/llama.cpp/pull/26888

**PR #26623：Nemotron 循环状态回滚（进行中）**
为 Nemotron 新增 recurrent state rollback：为每个 draft token 创建独立状态副本，接受后回滚至最后接受 token 的状态，附带测试用例。
🔗 https://github.com/ggml-org/llama.cpp/pull/26623

---

## 性能与优化

**b10357：OpenCL FA prefill 核函数优化（#26428）**
将 K tile 在 local memory 中转置，以改进 FlashAttention prefill kernel 的访存局部性。暂未公布基准数字。
🔗 https://github.com/ggml-org/llama.cpp/pull/26428

**PR #26885：语法引擎单次查找优化（进行中）**
通过合并查表与消除额外拷贝实现 1.2x–1.3x 的 grammar parsing 加速。需注意：llguidance 仍是更快的替代方案，此优化面向内置 grammar 引擎使用方。
🔗 https://github.com/ggml-org/llama.cpp/pull/26885

**PR #25635：CUDA FA fp16 共享内存 XOR swizzle（进行中）**
在 fattn-mma-f16.cuh 中为 K/V 共享内存 tile 引入 XOR swizzle（替代原 +4 row padding），降低 Turing+（Ampere/Ada/Blackwell）上 cp.async store 与 ldmatrix load 的 bank conflict。
🔗 https://github.com/ggml-org/llama.cpp/pull/25635

**Issue #26448：MoE 专家权重免 H2D 拷贝的 PCIe DMA 方案（特性请求）**
提议将 MoE 专家权重保存在主机 pinned buffer，由 cuBLAS 经 PCIe DMA 直接读取，避免专家权重进出 VRAM。作者给出 RTX 4090 实测数据：23GB MoE 仅需 1.6GB VRAM、81GB Qwen3-235B 可跑在 8GB 卡上。属于高影响力但高复杂度的架构级改动。
🔗 https://github.com/ggml-org/llama.cpp/issues/26448

---

## 稳定性与回归

按严重程度排列：

**1. Qwen3.5 工具调用失效（#20837，OPEN，59 评论）**
开启 thinking 时，模型常把工具调用以 XML 形式输出在 thinking block 内并停止生成，导致 Agent 工作流失败。热度最高（👍17），尚无可用的修复 PR。
🔗 https://github.com/ggml-org/llama.cpp/issues/20837

**2. DeepSeek V4 在 Strix Halo/ROCm 上乱码（#25436，OPEN）**
Ryzen AI Max+ 395 + ROCm 上运行 DeepSeek-V4-Flash GGUF 输出乱码，多数据源复现。AMD 平台新架构适配问题，尚未修复。
🔗 https://github.com/ggml-org/llama.cpp/issues/25436

**3. MTP 保留请求间状态导致输出不确定（#26425，OPEN）**
Qwen3.6-35B-A3B-MTP 上 MTP 状态跨请求残留，导致输出不确定与模型质量下降。影响生产级投机解码服务。
🔗 https://github.com/ggml-org/llama.cpp/issues/26425

**4. 投机解码在量化目标上与贪心输出不一致（#25618，OPEN）**
draft-mtp/draft-dspark 在量化目标（Q4_K_M）上 greedy 输出偏离非投机结果，bf16 目标上则一致。需注意：若应用对确定性有硬要求，量化 + 投机组合当前存在正确性风险。
🔗 https://github.com/ggml-org/llama.cpp/issues/25618

**5. Gemma 4 31B 无限循环生成特殊 token（#26088，OPEN）**
长空闲后模型陷入 `<unused49>` 无限循环，跨多个 GGUF 量化源复现。
🔗 https://github.com/ggml-org/llama.cpp/issues/26088

**6. Vulkan GET_ROWS 非对齐偏移硬崩溃（PR #26854 修复中）**
`view_offs` 非零时 Vulkan 后端在 `init_pushconst_tensor_offsets` 触发 `GGML_ASSERT` 崩溃。PR 已提出回退 CPU 方案。
🔗 https://github.com/ggml-org/llama.cpp/pull/26854

**7. Metal 进程退出 SIGABRT（PR #26857 修复中）**
`ggml_metal_rsets_free` 释放时崩溃，影响嵌入 llama.cpp 的宿主应用（如 Flutter 桌面端）退出流程。
🔗 https://github.com/ggml-org/llama.cpp/pull/26857

**8. RPC 后端 DeepSeek-V4-Flash 图计算失败（#26820，OPEN）**
8 worker 分布式 CPU 部署下报 `[create_node] invalid data ptr`。分布式推理用户需留意的已知问题。
🔗 https://github.com/ggml-org/llama.cpp/issues/26820

---

## 对应用开发者的意义

- **多输出后端采样（b10355）**：支持带 token 投机验证的后端采样，单序列多输出的上限由数值上下文参数声明。对构建并行采样/树搜索类 Agent 推理服务的团队是直接的能力增强，建议关注后续 API 文档。
  🔗 https://github.com/ggml-org/llama.cpp/pull/10355

- **Qwen 系列工具调用仍是最大的 Agent 稳定性风险**：#20837（Qwen3.5 thinking + tools）与 #26425（Qwen3.6 MTP）均直接影响工具调用链路。建议生产环境严格测试"思考 + 工具调用"组合，并在 MTP 场景下监控输出确定性。目前无合并修复，**升级版本前需做回归验证**。

- **iGPU 默认加载策略将调整（PR #26081）**：引入 `load-mode auto`，自动避免在 iGPU 上使用 mmap（因共享内存场景下 mmap 会带来双倍内存占用）。对在 Strix Halo 等平台部署服务的开发者是利好，合并后需关注显存占用变化。
  🔗 https://github.com/ggml-org/llama.cpp/pull/26081

- **上下文检查点失效问题（#24055）未解决**：hybrid/recurrent 模型上 context checkpoint 每次都被 invalidate，意味着长会话服务无法从 checkpoint 恢复，内存会随上下文持续增长。MTP/循环状态模型（Nemotron、Qwen3-MTP）的使用者需自行实现会话级容错。
  🔗 https://github.com/ggml-org/llama.cpp/issues/24055

- **ROCm 7.14 工具链迁移**：新 CI 版本将影响所有 HIP 构建链，建议 AMD 平台用户规划升级窗口并验证 Strix Halo 等新硬件的兼容性（参见 #25436、#25700、#26208）。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-11

## 1. 今日速览

今日发布 v0.32.7/v0.32.8，核心事件是 Meta 新开放模型 **Muse Glimmer** 的初步落地（Apple Silicon MLX 引擎优先，多平台支持随后跟进），并在 v0.32.8 中宣称可驱动 Claude Code、Codex 等编码代理。稳定性方面需重点关注：MLX 引擎长驻 runner 出现**跨请求响应污染**（#17599），Jetson 设备升级后出现**模型文件丢失**（#17661），以及 muse-glimmer 当前存在**拉取 412 错误**与** MLX manifest 指向 NVFP4 层**两个发布缺陷（#17645 / #17656）。

## 2. 版本发布与破坏性变更

- **v0.32.8** — Muse Glimmer 全平台可用，定位为编码代理（Claude Code、Codex、Pi）与长驻个人助理（OpenClaw、Hermes）的基础模型；Ollama MLX 引擎在 Apple Silicon 上提供该模型的最优性能。[Release v0.32.8](https://github.com/ollama/ollama/releases/tag/v0.32.8)
- **v0.32.7** — Muse Glimmer 初版支持，当前仅限 Apple Silicon MLX 引擎，NVIDIA/AMD 及其他平台优化将在后续数日补齐。[Release v0.32.7](https://github.com/ollama/ollama/releases/tag/v0.32.7)
- **已知回归**：v0.32.4/0.32.5 起 VS Code Copilot Harness 中工具调用失效，用户确认回滚至 0.32.1 可恢复。[Issue #17444](https://github.com/ollama/ollama/issues/17444)
- **数据丢失风险**：Jetson AGX Orin 升级至 0.32.7 后，多个本地模型从列表中消失（仅剩一个），需紧急排查。[Issue #17661](https://github.com/ollama/ollama/issues/17661)

## 3. 新模型与硬件支持

- **Muse Glimmer**：Meta 新开放模型，随 v0.32.7/v0.32.8 发布。Apple Silicon 已可用；`muse-glimmer:30b-q8_0` 当前拉取时提示 412 需预发布版，需等待 manifest 修复。[Issue #17645](https://github.com/ollama/ollama/issues/17645)
- **MLX — Nemotron 3 Nano Omni**：合入 MLX 支持，包含 Mamba2/循环结构、MoE 路由、NVFP4/MXFP8 量化专家路径及 Metal 优化 kernel。[PR #17060](https://github.com/ollama/ollama/pull/17060)
- **MLX — Gemma4 图像输入**（进行中）：新增视觉预处理器与 embedding 集成，兼容 `vision_embedder.*` 与 `vision_tower.*` checkpoint。[PR #17650](https://github.com/ollama/ollama/pull/17650)
- **Apertus 1.5 8B/70B**（进行中）：瑞士 AI 倡议开源多模态模型，原生聊天模板支持。[PR #17555](https://github.com/ollama/ollama/pull/17555)
- **多文件 GGUF 导入**仍为开放需求（已 106 条评论、156 👍），大模型分片导入需继续等待官方支持。[Issue #5245](https://github.com/ollama/ollama/issues/5245)

## 4. 性能与优化

- **MLX 引擎**：v0.32.8 宣称在 Apple Silicon 上为 Muse Glimmer 提供 state-of-the-art 性能。[Release v0.32.8](https://github.com/ollama/ollama/releases/tag/v0.32.8)
- **API 上下文长度暴露**（进行中）：`/api/model/details` 将新增投影上下文长度（projected context length），为 MLX runner 估算值，未来可扩展更精确的评估逻辑。[PR #17663](https://github.com/ollama/ollama/pull/17663)
- **Qwen 工具调用渐进式流式**（进行中）：`/api/chat` 新增 opt-in 的 `stream_tool_calls`，支持在工具调用生成过程中持续下发 `arguments_delta`，降低 Agent 场景首块工具参数的等待时间。[PR #17658](https://github.com/ollama/ollama/pull/17658)
- **Windows-on-Arm CPU 构建**（进行中）：修复 CPU runner 未设置 `-march` 导致回退到基线 armv8-a、无任何点积/矩阵指令的问题，一行配置即可激活全部 CPU 加速指令。[PR #17654](https://github.com/ollama/ollama/pull/17654)
- **基准测试改进**（进行中）：HumanEval 补丁式提示词替代原有 "word-salad" 生成器，提升基准质量的真实性。[PR #17480](https://github.com/ollama/ollama/pull/17480)
- **MoE 专家权重重排**：社区提出将 MoE 专家权重置于宿主内存、按需加载至 GPU，使 8GB 显存可跑 16B/35B MoE 模型，但当前 llama.cpp 默认仍将全部专家载入 VRAM。[Issue #17557](https://github.com/ollama/ollama/issues/17557)

## 5. 稳定性与回归

按严重程度自上而下排列：

- **跨请求响应污染（MLX, 严重）**：`OLLAMA_KEEP_ALIVE=-1` 时，MLX 引擎长驻 runner 间歇性返回**之前某个请求的完整答案**，而非当前提示词的答案，属于严重的正确性缺陷，尚无 fix PR。[Issue #17599](https://github.com/ollama/ollama/issues/17599)
- **升级后模型丢失（Jetson）**：0.32.7 更新后多个模型从本地消失，如确认非目录/权限问题则为严重回归。[Issue #17661](https://github.com/ollama/ollama/issues/17661)
- **CUDA 非法内存访问（DGX Spark / GB10）**：`qwen3-coder-next:q4_K_M`（80B-A3B，头大小 256）大 prefill 时确定性崩溃于 `ggml_cuda_flash_attn_ext_mma_f16_case`，尚无 fix。[Issue #17596](https://github.com/ollama/ollama/issues/17596)
- **muse-glimmer manifest 缺陷**：`30b-mlx` 标签实际由 NVFP4 层构建，而非真实 MLX 权重；`30b-q8_0` 拉取提示 412。两个独立问题均未修复。[Issue #17656](https://github.com/ollama/ollama/issues/17656) / [Issue #17645](https://github.com/ollama/ollama/issues/17645)
- **MLX 生成不终止**：Laguna-S 2.1 MLX BF16 间歇性无法正常收尾，退化为"意识流"式输出。[Issue #17632](https://github.com/ollama/ollama/issues/17632)
- **VS Code 工具调用回归**：v0.32.4+ 破坏 Copilot Harness 中的工具调用，回滚至 0.32.1 有效。[Issue #17444](https://github.com/ollama/ollama/issues/17444)
- **Agent 技能静默丢弃**：`~/.ollama/skills/` 下部分合法技能无法加载且无错误提示，已有 PR 修复扫描逻辑并输出被拒名称。[Issue #17652](https://github.com/ollama/ollama/issues/17652) → [PR #17657](https://github.com/ollama/ollama/pull/17657)
- **`ollama create` 挂起**：Modelfile 含两个 FROM 行（模型 + mmproj）时 create 无限挂起，PR #17649 通过逐文件 SHA-256 进度提示改善静默阶段。[Issue #17491](https://github.com/ollama/ollama/issues/17491) / [PR #17649](https://github.com/ollama/ollama/pull/17649)
- **Qwen 模型内存异常**：RTX 5070Ti 12GB 上 Qwen3.6 35B 自更新后直接触顶，即便设置 4k context。[Issue #17517](https://github.com/ollama/ollama/issues/17517)
- **Windows 双路 CPU/GPU 利用率低**：推理速度持续偏低，CPU+GPU 混合配置下性能瓶颈明显。[Issue #16873](https://github.com/ollama/ollama/issues/16873)
- **stdout 重定向写入 ANSI 序列**：`ollama run > file` 将终端控制序列写入文件，已有修复 PR（已合并）。[Issue #16785](https://github.com/ollama/ollama/issues/16785) → [PR #17644](https://github.com/ollama/ollama/pull/17644)

## 6. 对应用开发者的意义

- **Muse Glimmer 值得跟进**：官方将其定位为编码代理与长驻助手的基础模型，Agent 开发者可在 Apple Silicon 上先行评估；但注意当前 manifest 存在 412 与 MLX 权重错配问题，v0.32.8 前请勿直接依赖。
- **MLX 引擎生产风险偏高**：#17599 跨请求污染与 #17632 生成不终止均无修复，长驻 runner 场景（keep_alive=-1）慎用 MLX 后端，或增加响应完整性校验与请求隔离。
- **版本固定策略**：VS Code Copilot Harness 用户在官方修复 #17444 前建议锁定 0.32.1；Jetson 用户暂缓升级 0.32.7。
- **工具调用生态改善中**：Qwen 渐进式工具参数流式（#17658）与错误上下文包装（#17651）合入后将显著提升构建在其上的 Agent 调试体验；后者已覆盖五个解析器。
- **API 增量变更**：`model details` 将新增投影上下文长度字段，对运行时管理上下文窗口的网关/代理层有用。
- **社区长期未决需求**：多文件 GGUF 导入（#5245）与"停止全部模型"（#6987）仍未实现，设计上层编排时需自行处理模型生命周期管理。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-11

> 数据来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)  
> 过去 24 小时活跃 Issue 86 条，活跃 PR 231 条。

## 1. 今日速览

- **v1.96.0 发布**，本次发布重点是所有 Docker 镜像均启用 cosign 签名验证。
- **Rust 迁移**仍是社区最高关注事项（[#31263](https://github.com/BerriAI/litellm/issues/31263)），目标是实现 sub-1ms overhead 的 AI Gateway，并已开放 Beta 报名。
- 多副本部署下 Slack 预算/用量报告重复的问题已有修复 PR（[#36489](https://github.com/BerriAI/litellm/pull/36489)），但 **预算绕过**（[#26672](https://github.com/BerriAI/litellm/issues/26672)）和 **Streaming usage 少计**（[#36114](https://github.com/BerriAI/litellm/issues/36114)）仍是当前最需关注的不稳定点。

## 2. 版本发布与破坏性变更

- **[v1.96.0](https://github.com/BerriAI/litellm/releases/tag/v1.96.0)**
  - 核心内容：所有 LiteLLM Docker 镜像使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名，签名 key 见 commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。
  - 未披露模型/API 破坏性变更，暂无迁移注意事项。

## 3. 新模型与硬件支持

- **Nadir 智能路由 provider**（[PR #33227](https://github.com/BerriAI/litellm/pull/33227)）：新增 `nadir/auto` 虚拟模型，由 Nadir 服务端按请求复杂度路由到最便宜模型。
- **Ofox provider**（[PR #32049](https://github.com/BerriAI/litellm/pull/32049)）：新增 Ofox 作为 OpenAI-compatible provider，统一接入 100+ 模型。
- **Multi-model Fusion API**（[PR #36511](https://github.com/BerriAI/litellm/pull/36511)）：新增 `litellm.fusion()` / `litellm.afusion()`，将同一 prompt 并行发送给 N 个模型，并可用 judge model 合成最终答案。
- 无新的硬件/量化格式支持更新。

## 4. 性能与优化

- **多副本 Slack 报告去重**（[PR #36489](https://github.com/BerriAI/litellm/pull/36489)）：修复多 Pod 场景下每个 Pod 都发一次 Slack spend report 的问题；通过 PodLockManager 实现定时任务竞争上报。
- **UI 请求优化**（[PR #36512](https://github.com/BerriAI/litellm/pull/36512)）：`useCan` 不再在每次调用时拉取 `/organization/list`，减少无谓请求。
- **高 QPS 场景降低写入开销**（[PR #31866](https://github.com/BerriAI/litellm/pull/31866)）：新增 `disable_entity_spend_updates` 开关，在保留 SpendLogs 的同时抑制 entity 计数 UPDATE。
- **问题：异步路径阻塞事件循环**（[#36174](https://github.com/BerriAI/litellm/issues/36174)）：`Router.async_get_healthy_deployments` 在 async 路径上调用同步 `token_counter`（tiktoken），开启 `enable_pre_call_checks` 后会阻塞事件循环，需关注修复。
- **问题：TPM 限制按 Pod 独立生效**（[#27736](https://github.com/BerriAI/litellm/issues/27736)）：多副本部署下实际 TPM 上限变成 `tpm_limit × N_replica`，限流效果不符合预期。
- **问题：Anthropic 流式取消导致 max_parallel_requests 计数泄漏**（[#27955](https://github.com/BerriAI/litellm/issues/27955)）：Redis 计数器在客户端取消 `/v1/messages` 后只增不减，最终可能拒绝所有请求。
- **进行中：Rust 迁移**（[#31263](https://github.com/BerriAI/litellm/issues/31263)）：目标为 sub-1ms overhead 的极低延迟 Gateway。

## 5. 稳定性与回归

### 高危

- **[Security] `/v1/memory` CRUD 越权**（[#27722](https://github.com/BerriAI/litellm/issues/27722)）：Team 2 可无授权地读取/更新/删除 Team 1 的 key。当前未看到已提交 fix PR。
- **[Budget] max_budget 绕过**（[#26672](https://github.com/BerriAI/litellm/issues/26672)）：v1.82.3 上 key/user 的 `max_budget` 在 spend 已超限后仍不生效。未看到 fix PR，使用老版本且有预算强诉求的用户建议重点验证。
- **[Usage] Streaming usage 严重少计**（[#36114](https://github.com/BerriAI/litellm/issues/36114)）：与 provider 无关，根因在 stream aggregation 层；非流式 usage 正确。目前无 fix PR。
- **[Bedrock] 无条件注入 tools**（[#27138](https://github.com/BerriAI/litellm/issues/27138)）：调用不支持 tool use 的 Bedrock 模型时，LiteLLM 会自动注入空 tools 导致 `This model doesn't support tool use`，`drop_params=True` 无效。
- **[Z.AI] 模型名不兼容**（[#32218](https://github.com/BerriAI/litellm/issues/32218)）：文档中的 `glm-5.2[1m]` 经 Proxy 返回 `Unknown Model`，需要修正翻译层。

### 中危

- **[Async] 流式 reasoning 字段导致 `async for` 崩溃**（[#27670](https://github.com/BerriAI/litellm/issues/27670)）：`stream=True` 且 provider 在 delta 中返回 reasoning 字段时，LiteLLM 报 `TypeError: 'async for' requires an object with aiter method...`。
- **[Router] 预检 block 事件循环**（[#36174](https://github.com/BerriAI/litellm/issues/36174)）：开启 pre-call checks 后，同步 token 计数会阻塞 async 调用。
- **[Multi-replica] 告警重复**（[#14809](https://github.com/BerriAI/litellm/issues/14809)）：已有 OPEN PR [#36489](https://github.com/BerriAI/litellm/pull/36489) 解决。
- **[Key 管理] 相同 secret key 可重复生成**（[#20494](https://github.com/BerriAI/litellm/issues/20494)）：`/key/generate` 不会对重复 secret key 报错。
- **[Anthropic] Mid-stream fallback 不支持**（[#24004](https://github.com/BerriAI/litellm/issues/24004)）：`/v1/messages` 在收到 Anthropic SSE 错误后不会触发 router fallback。
- **[completion_model] 优先级错误**（[#21554](https://github.com/BerriAI/litellm/issues/21554)）：`general_settings.completion_model` 会覆盖客户端显式指定的 model，而不是作为 fallback。
- **[配置] LiteLLM_Config 表覆盖新配置**（[#12875](https://github.com/BerriAI/litellm/issues/12875)）：该 issue 已 CLOSED，但多副本下配置管理仍需关注。

### 已有关闭修复

- **[Anthropic] 保留 mid-turn system 纠正消息**（[PR #34290](https://github.com/BerriAI/litellm/pull/34290)）：修复 Claude Code 在 tool call 过程中插入 in-sequence `system` 消息被丢弃的问题。
- **[Router] 支持 per-deployment allowed_fails_policy + DualCache TTL 修正**（[PR #31876](https://github.com/BerriAI/litellm/pull/31876)）：已关闭，改善不同可靠性 deployment 的独立故障容错。

## 6. 对应用开发者的意义

- **预算敏感场景**：如果当前仍运行 v1.82.3 或依赖 `max_budget`/`rpm`/`tpm` 做成本管控，建议尽快升级，并跟踪 [#26672](https://github.com/BerriAI/litellm/issues/26672)、[#27736](https://github.com/BerriAI/litellm/issues/27736) 和 [#27955](https://github.com/BerriAI/litellm/issues/27955)。
- **Streaming usage 计费**：在 [#36114](https://github.com/BerriAI/litellm/issues/36114) 修复前，不要完全信任流式请求的最终 `usage` 字段，尤其是链式 Proxy 场景。
- **多副本部署**：建议跟进 [#36489](https://github.com/BerriAI/litellm/pull/36489) 的去重逻辑；否则 Slack 告警和预算报告会重复触发。
- **Langfuse 用户**：Langfuse v4 兼容性有两个线索：Feature Request [#24123](https://github.com/BerriAI/litellm/issues/24123) 和 Langfuse 官方 issue [#33383](https://github.com/BerriAI/litellm/issues/33383)。对应升级 PR [#33391](https://github.com/BerriAI/litellm/pull/33391) 正在推进，请关注 v4 OTel ingestion 支持。
- **Claude Code / Anthropic 用户**：mid-turn system 消息丢失问题已有修复 PR [#34290](https://github.com/BerriAI/litellm/pull/34290)；但 mid-stream fallback 仍不支持（[#24004](https://github.com/BerriAI/litellm/issues/24004)），高可用场景需自行处理上游 SSE 错误。
- **新能力值得试用**：Nadir provider、Ofox provider、`litellm.fusion()` 多模型融合 API，以及即将到来的 Rust Gateway Beta，都能在路由成本或首字延迟上带来实际收益。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 2026-08-11

## 今日速览

Unsloth 连续发布两个 beta 版本，为 Meta 新开源的 Muse Glimmer 30B 模型提供即开即用的推理与动态量化支持；Studio 在 Windows 平台的本地 GGUF 路径处理存在系统性缺陷（多个 503 错误），但已有对应修复 PR；聊天流式延迟、LoRA 扫描阻塞等性能问题正在密集攻坚，其中一条已实测将响应前延迟从 16 秒降低至亚秒级。

## 版本发布与破坏性变更

- **v0.1.61-beta / v0.1.60-beta：支持 Meta Muse Glimmer**。Meta Superintelligence Labs 发布首个开源模型 Muse Glimmer（30B 稠密，Apache 2.0），面向本地 Agent 与编码场景。Unsloth 已支持加载该模型及 Unsloth Dynamic 量化格式。两个 beta 版本描述一致，疑似为快速跟进修正，建议开发者直接升级至最新版。  
  https://github.com/unslothai/unsloth/releases

## 新模型与硬件支持

- **Muse Glimmer 30B 上线**：Apache 2.0 全开放，可通过 Unsloth Dynamic Quants 在本地部署。目前社区已发现 bundled llama.cpp b10333 尚不能加载 muse-glimmer 架构（Issue #8345，已关闭），建议升级前先确认配套 llama.cpp 版本。  
  https://github.com/unslothai/unsloth/issues/8345
- **MiniMax M3 GGUF（UD-Q5_K_XL）在 Apple Silicon 无法加载**：由于 GGUF 缺少 `indexer.head_count` 元数据，Studio 内置 llama.cpp b10333 拒绝加载。需等待 llama.cpp 侧兼容。（Issue #8360，Open）  
  https://github.com/unslothai/unsloth/issues/8360
- **ROCm AOTriton 注意力解锁**（PR #8323）：修复 16GB 显存 AMD 显卡加载时错误申请 66GiB 显存的问题，允许使用 Torch 的 fused kernel。AMD 用户可用性显著提升。  
  https://github.com/unslothai/unsloth/pull/8323

## 性能与优化

- **聊天流式首次响应延迟大幅缩短**（PR #8371）：修复已加载模型发送消息后 `Generating...` 空转约 16 秒的问题，实测恢复至 <0.5 秒。此 PR 已合并。  
  https://github.com/unslothai/unsloth/pull/8371
- **聊天发送路径 I/O 去冗余**（PR #8382）：发送一条消息原先要读取同一会话记录 4 次，现优化为复用线程元数据，降低生成前磁盘 I/O。  
  https://github.com/unslothai/unsloth/pull/8382
- **LoRA 扫描移出事件循环**（PR #8392）：`/api/models/loras` 原在协程内同步遍历目录，会阻塞所有 API 请求（包括流式 token），现已异步化。  
  https://github.com/unslothai/unsloth/pull/8392
- **RAG 搜索免解析大 tokenizer**（PR #8393）+ **词法搜索路径裁剪**（PR #8394）：优化非音频模型加载时对 tokenizer_config.json 的整文件解析，并减少无链接文件夹场景下的 FTS 查询开销。  
  https://github.com/unslothai/unsloth/pull/8393  
  https://github.com/unslothai/unsloth/pull/8394
- **MLX 路径版本号自报告修复**（PR #8395）：修复 Apple Silicon 上 `unsloth.__version__` 误报为其他包版本的问题。  
  https://github.com/unslothai/unsloth/pull/8395

## 稳定性与回归

按影响面从高到低排列：

- **Windows 本地 GGUF 路径解析 Bug（高）**：以 `C:\...` 格式指定本地模型路径时，`split_model_ref` 错误拆分盘符，导致所有 chat/completions 请求返回 `503 model_switch_failed`。（Issue #8368、#8375）已有修复 PR #8391，将原生 Windows 路径读取为单一引用。  
  https://github.com/unslothai/unsloth/issues/8368  
  https://github.com/unslothai/unsloth/issues/8375  
  https://github.com/unslothai/unsloth/pull/8391
- **ROCm Whisper 启动失败（中高）**：AMD 平台更新后提示缺失 hipblaslt kernel catalog（Issue #8364），已有 PR #8379 修复 Windows ROCm Whisper slim bundle 与 llama.cpp 运行时的配对逻辑。  
  https://github.com/unslothai/unsloth/issues/8364  
  https://github.com/unslothai/unsloth/pull/8379
- **版本号误报（中）**：`unsloth.__version__` 直接引用 `unsloth_zoo.__version__`，在二者版本不同步时产生误导（Issue #8171）。已由 PR #8395（MLX 路径）+ 相应 GPU 路径修复覆盖。  
  https://github.com/unslothai/unsloth/issues/8171
- **MTP 探针结果被错误缓存（中）**：llama-server 的 MTP 能力探测在返回 inconclusive 时被缓存至进程结束，导致用户开启投机解码后静默失败。（Issue #8317，Open）PR #8334 已提交修复。  
  https://github.com/unslothai/unsloth/issues/8317  
  https://github.com/unslothai/unsloth/pull/8334
- **Studio 无法加载自己启动的本地模型（中）**：已启动模型被 UI 识别为未下载，影响本地工作流。（Issue #8365，Open）  
  https://github.com/unslothai/unsloth/issues/8365
- **NVFP4 量化在 RTX 5060 Ti 16GB 无法加载（低-中）**：待确认是否与显存容量或驱动兼容性相关。（Issue #8246，Open）  
  https://github.com/unslothai/unsloth/issues/8246
- **AMD RDNA3 VRAM 监测失效（低）**：W7900/W7500 双卡环境下 Studio 停止读取显存总量/占用。（Issue #7452，Open）  
  https://github.com/unslothai/unsloth/issues/7452

## 对应用开发者的意义

- **Windows 用户需留意路径改写**：在修复正式发布前，请使用正斜杠 `C:/models/...` 形式指定模型路径，避免 `503 model_switch_failed`。若已受影响，可尝试降级至 2026.8.10 之前版本或等 PR #8391 合并。
- **升级前检查配套组件版本**：Muse Glimmer 的 GGUF 需要更新的 llama.cpp；MiniMax M3 的 UD 量化暂不可用。在官方确认兼容前，建议固定使用当前锁定的 llama.cpp 版本。
- **服务端阻塞改善**：`/api/models/loras` 异步化与聊天路径优化将减少多用户场景下的请求排队，流式体验更稳定。Agent 类应用可放心增加并发调用。
- **AMD/ROCm 用户可重试**：AOTriton 解锁与 Whisper 配对修复将改善 16GB 级别 AMD 卡的训练与推理可用性；但 hipblaslt 相关问题仍需更新后验证。
- **版本报告修正**：`unsloth.__version__` 的误报可能影响依赖版本检测的运维脚本，修复后需注意版本号语义恢复正确。
- **新能力预告**：PR #7984 正在为 Studio 添加音频页面（TTS/STT + LoRA 训练 + OpenAI 兼容音频端点），未来可在统一接口内处理语音代理场景。  
  https://github.com/unslothai/unsloth/pull/7984

</details>