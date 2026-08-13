# AI 基础设施日报 2026-08-13

> 生成时间: 2026-08-13 02:02 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-13）

## 1. 生态全景

当前 AI 基础设施正处于“新模型驱动的大版本迭代期”：DeepSeek-V4、Kimi-K3、Qwen3.5/3.6 等新一代架构（MLA/MoE/GDN/MTP）迫使各引擎在算子层重写与正确性验证上高强度投入，同时 Blackwell（SM120）、AMD gfx950、ROCm 等新硬件的适配问题集中暴露。生产稳定性是行业共同痛点——vLLM 的“静默停滞”、SGLang 的多节点死锁、llama.cpp 的输出损坏均发生在 API 表面正常时，排查难度极高。性能优化主战场已从单纯的吞吐数字转向 KV cache 压缩（MXFP4）、MoE 通信重叠、投机解码参数鲁棒性等系统级维度。生态分层日益清晰：vLLM/SGLang 主导云端高性能推理，llama.cpp/Ollama 扎根本地与边缘，LiteLLM 在网关层做多 provider 抽象与成本治理，Unsloth 在微调环节形成互补。值得注意的还有 MLX 生态的快速扩张——Ollama 正把 Apple Silicon 从“能跑”推向“高性能 + 视觉 + 长上下文缓存”的完整方案。

## 2. 各项目活跃度对比

| 项目 | 提及 Issues | 提及 PRs | Release | 今日头条 |
|---|---|---|---|---|
| vLLM | 10 | 10 | 无 | v0.27.0 升级后 DeepSeek V4 flash error + 引擎空闲停滞 |
| SGLang | 15（含 closed/roadmap） | 9 | 无 | 多节点 TP 死锁、1M token OOM 无修复；MXFP4 KV 推进 |
| llama.cpp | 15（含 closed） | 14 | 3 个（b10375/b10373/b10369） | Qwen 工具解析收紧 + ROCm/GLM 正确性问题 |
| Ollama | 19（含 closed） | 18 | 1 个（v0.32.10-rc1） | repeat_penalty 默认变更 + NVFP4 MLX prefill +7~8% |
| LiteLLM | 17（含 closed） | 16 | 无 | Redis 串扰关闭；token 计数预算泄漏修复在途 |
| Unsloth | 14 | 14 | 无 | AMD 误报/Windows 拦截/macOS 启动失败均有 fix PR |

*注：数字为日报中明确提及的 Issue/PR 编号数，非 GitHub 当日全量统计。*

**解读：** Ollama/llama.cpp 迭代节奏最快；LiteLLM 修复面最广（计费、安全、provider 兼容）；SGLang 高严重度开放问题最多，稳定性压力最大。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---|---|---|---|---|---|
| **Kimi-K3** | ROCm 优化密集（GEMM-RS/fused RMSNorm/MoE overlap） | gfx950 MLA decode 调优中 | 文本模型 PR 进行中（#26185） | — | — |
| **DeepSeek-V4** | 升级回归（flash error） | MXFP4 KV Cache（Hopper）开发中 | ROCm RPC 崩溃（gfx1151） | 模型请求（#17510） | — |
| **Qwen3.5/3.6** | GDN BF16 语义匹配 PR | — | OpenVINO Dense/MoE 支持 | Qwen3.6 CUDA 回退已修复 | Groq 新增 Qwen3.6 27B |
| **Gemma 4** | 启动失败（Transformers 5.15 不兼容） | — | MTP+Vulkan 崩溃 | think=false 重复 token | — |
| **GLM-5.2** | — | — | dense-MLA CUDA 输出损坏 | — | — |
| **GPT-5.6** | — | — | — | — | Bedrock 1M 上下文 + 定价档 |
| **多模态/新后端** | SigLIP 修复、Jina V5 | NPU LLaDA2.2、Intel AMX | pocket-tts、OpenCL Adreno | Nemotron-H MLX 视觉 | Parallel AI 新 provider |

**结论：** Kimi-K3 与 DeepSeek-V4 是引擎层竞速焦点，vLLM/SGLang 在算子层深耕，llama.cpp 仍在追赶；LiteLLM 的差异化在模型注册表与定价即时性（GPT-5.6 1M、Groq 关停日期），对应用开发者最直接。多模态是本地运行时今日亮点（pocket-tts、Nemotron-H 视觉），GPU 引擎侧多模态集中在 embedding 修复。

## 4. 性能优化前沿

| 方向 | 关键动态 | 代表项目 |
|---|---|---|
| **KV cache 压缩** | MXFP4 KV Cache 端到端解码（SM90/H20）；低量化 KV 乱码问题；KV OOM 告警 | SGLang #32741、Ollama #17614、vLLM #41962 |
| **MoE 通信重叠** | 共享 expert all-reduce 与 routed expert up-projection 重叠，减少 TP 通信等待 | vLLM #51437 |
| **算子融合** | MLA 前端 RMSNorm 融合；UNARY+MUL 融合；GDN 避免 Q/K/V 物化 | vLLM #52080、llama.cpp #26411、SGLang #33778 |
| **序列并行/分布式** | GEMM-RS（multimem.ld_reduce）内核；RPC tensor 级模型 + async graph_compute + custom all_reduce；NUMA 权重镜像 | vLLM #52079、llama.cpp #26610/#16000 |
| **投机解码** | 动态投机 batch-size 阈值引发吞吐崩塌；repeat_penalty 默认关闭以加速 speculative decoding | vLLM #49548、Ollama v0.32.10-rc1 |
| **批处理/scheduler** | 未完成 chunked-prefill 跳过 logits/sampling；Cache-DiT 修复（此前 1.00x 无效） | vLLM #49171、SGLang #33827 |
| **后端正交优化** | NVFP4 MLX prefill 融合算子 +7~8%；SYCL 融合；OpenCL Adreno SDPA；gfx950 geometry 调优 | Ollama #17703、llama.cpp #26411/#26331、SGLang #34580 |

**判断：** KV cache 低比特化是显存效率竞赛的核心；MoE 通信重叠与 MLA 算子融合是新一代模型的性能胜负手；投机解码的“参数悬崖”说明优化进入精细化调参阶段，不再是“开箱即快”。

## 5. 分层定位差异

| 层 | 项目 | 定位 | 核心价值 | 今日动态特征 |
|---|---|---|---|---|
| 生产级推理服务 | vLLM | 云端高吞吐 serving、多节点/多卡、连续批处理 | 吞吐、PagedAttention、生产级 API | 高影响 Bug 与深度优化并行，升级风险高 |
| 探索型推理引擎 | SGLang | 高吞吐 serving + RadixAttention 前缀复用、多硬件路线 | 前缀缓存、MoE 后端多样性 | 新功能激进（MXFP4/NPU/gfx950），但 TP 死锁/长上下文稳定性拖后腿 |
| 本地/边缘运行时 | llama.cpp | GGUF 生态、CPU/GPU/VPU 全后端、RPC 多机 | 可移植性、量化生态、部署自由度 | 版本迭代快，正确性类 bug 偏多 |
| 本地运行时/分发 | Ollama | 开箱即用模型服务 + 模型分发拉取 | 易用性、MLX 优先、OpenAI 兼容层 | 以 llama.cpp bump 为基底，自研 MLX 优化与兼容层修复 |
| LLM 网关 | LiteLLM | 多 provider 统一入口、模型路由、预算/计费、可观测性 | 成本治理、多租户隔离、provider 抽象 | 计费正确性与多租户安全是主线，UI 层重建（shadcn） |
| 微调/训练 | Unsloth | LoRA/QLoRA 高效微调、Studio 一体化工具链 | 微调速度/显存效率、GGUF 转换 | 修复面在环境兼容，功能向 Agent 工具链延伸 |

**关键洞察：**
- **vLLM 与 SGLang 正面竞争**：vLLM 在 ROCm/MoE 算子深度上领先半步，SGLang 在 KV 量化和多硬件宽度上更激进。
- **llama.cpp 是 Ollama 的上游依赖**：Ollama 今日约半数 bug（Qwen3.6 CUDA 回退、Gemma 4 异常）最终靠 llama.cpp bump 解决，二者是“上游引擎 + 下游分发/体验”关系。
- **LiteLLM 位于所有引擎之上**：对模型架构无感，但对 provider 定价/上下文窗口变化极其敏感。
- **Unsloth 与推理生态形成闭环**：微调产出（GGUF/LoRA）喂给 llama.cpp/Ollama/vLLM 消费，MiniMax-M3 GGUF 加载失败正是这种依赖关系的体现。

## 6. 值得关注的趋势信号

1. **新一代架构（MLA + MoE + MTP）引发全栈重构阵痛**：DeepSeek-V4/Kimi-K3 在 vLLM/SGLang/llama.cpp 三线同时出现正确性/性能问题（flash error、NaN、输出损坏），kernel 级适配已成硬门槛。选型时应优先考察目标模型在各引擎上的专项优化与已知问题清单。

2. **“静默故障”是生产环境最大威胁**：vLLM 引擎空闲后永久停滞、SGLang 多节点 rank 分叉死锁、LiteLLM 响应串扰——共同特征是无报错、无崩溃、行为错误。建议所有生产部署增加端到端延迟/正确性探针（定时 dummy 请求 + 输出校验），不能只依赖进程存活监控。

3. **KV cache 量化是下一波显存红利**：MXFP4 KV Cache 与低量化 KV 乱码问题并存，方向明确但工程质量参差。Hopper/Blackwell 上 1M 上下文与更高并发吞吐的解锁，大概率要靠 KV 压缩而非单纯加显存。

4. **工具调用/结构化输出语义正确性成为应用层核心**：llama.cpp 收紧 Qwen 工具解析、Ollama 三连 PR 修 thinking + structured outputs 交互、LiteLLM 透出 reasoning_content——Agent 工作负载已成为推理栈的一等公民。Agent 开发者应将“工具调用格式鲁棒性”和“思考链可观测性”纳入引擎选型标准。

5. **AMD/ROCm 进入“投入大、坑仍多”阶段**：vLLM 密集合入 ROCm 优化（GEMM-RS/RMSNorm 融合），SGLang 调优 gfx950，但 llama.cpp/Ollama 的加载失败、显存误报等基础问题仍存。AMD 用户应建立“性能可提升、稳定性需自测”的预期。

6. **MLX 生态从副线走向正式支持**：Ollama 的 Nemotron-H 视觉、KV connector 框架、Linux/Windows MLX 校验，加上 SGLang 的 Apple Silicon 路线图，意味着 Apple 设备作为推理平台的价值正被系统性建设，桌面端模型分发策略需提前规划。

7. **安全与成本治理成为网关/运行时层差异化竞争力**：LiteLLM 的 Redis 串扰修复、429 泄漏哈希、spend log 不丢失；Ollama 的 SSRF 修复；SGLang 的 SafeUnpickler——对多租户 SaaS 团队，这是比吞吐数字更重要的选型权重。

8. **Agent 工具链正在下沉到基础设施**：Ollama `launch` 集成 Muse Code/Talos、Unsloth Studio 增加本地工具循环（Search/Code/MCP/RAG）、LiteLLM 的 MCP Server 管理——三个不同层级不约而同拥抱 Agent 生态，“模型服务”与“Agent 运行时”的边界开始模糊，技术决策者需关注对架构分工的长期影响。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM 动态日报 — 2026-08-13

## 1. 今日速览

今日无新版本发布，但社区波动明显：**v0.27.0 升级后 DeepSeek V4 闪光解码报错**（#51758）与**引擎空闲后永久停滞**（#51921）两条高影响 Bug 正在发酵；与此同时，**Kimi-K3 在 ROCm 上的性能优化持续推进**（GEMM-RS、RMSNorm 融合、MoE 重叠等 3+ PR 密集合入），ROCm 双流解码 PR 因正确性回归被 revert 后重新提交，整体处于“修复与优化并行”的状态。

## 2. 版本发布与破坏性变更

无新 Release，但以下与 v0.27.0 相关的升级风险需要注意：

- **升级到 v0.27.0 后 DeepSeek V4 运行 flash error**（[#51758](https://github.com/vllm-project/vllm/issues/51758)，评论 16）。用户从 0.26.0 升级后，`--enable-flash-attn` 路径崩溃，建议升级前备份配置并验证推理路径。
- **v0.27.0 在 4 节点 TP=4（GB10/aarch64）上引擎空闲约 1 分钟后永久停滞**（[#51921](https://github.com/vllm-project/vllm/issues/51921)，评论 7）。`shm_broadcast` writer 饥饿，请求永远无法到达 scheduler，API 层面 `/v1/models` 仍正常响应——异常隐蔽，生产环境需警惕。

## 3. 新模型与硬件支持

今日无新 Release，但以下 PR/Issue 更新了模型与硬件支持状态：

- **Kimi-K3 的 ROCm 支持路线图**（[#50682](https://github.com/vllm-project/vllm/issues/50682)，评论 15）：社区维护者持续跟踪，AITER fused-moe（a16w4/a8w4）已集成，后续还有多阶段性能优化计划。
- **Qwen3.5 GDN BF16 语义匹配**（[#51797](https://github.com/vllm-project/vllm/pull/51797)）：保持激活 dtype 下的 Q/K 归一化与 beta 语义，覆盖 fused prefill、通用/投机解码及 packed decode，Triton warmup 同步门控。
- **SigLIP 文本提示填充修复**（[#51157](https://github.com/vllm-project/vllm/pull/51157)）：SigLIP 训练时使用 `padding="max_length"` 且无 attention mask，当前未填充的 text embedding 与 image embedding 不对齐，PR 修复图像-文本相似度计算。
- **Jina Embeddings V5 跳过无用输出层**（[#52037](https://github.com/vllm-project/vllm/pull/52037)）：pooling-only 模型可绕过通用 pooling adapter 的生成层替换，减少计算浪费。
- **DeepSeek-V4-Flash 在 RTX PRO 6000（SM120）上 FlashInfer 稀疏 MLA decode kernel 路由失败**（[#50720](https://github.com/vllm-project/vllm/issues/50720)，评论 10）：Blackwell 新架构下路由逻辑尚待适配。

## 4. 性能与优化

**Kimi-K3 (ROCm) 多项性能 PR 推进中：**

- **[#52079](https://github.com/vllm-project/vllm/pull/52079)**：新增 GEMM-RS（multimem.ld_reduce）序列并行内核，基于 CUTLASS 实现，支持任意 M 值（如 M=1023），仅对特定条件启用。
- **[#52080](https://github.com/vllm-project/vllm/pull/52080)**：将 MLA 前端的 `q_a_layernorm(q_c)` 和 `kv_a_layernorm(kv_c)` 融合为一次 `fused_q_kv_rmsnorm` 调用，减少每层两次独立 kernel launch。
- **[#51437](https://github.com/vllm-project/vllm/pull/51437)**：Latent-MoE 中，将共享 expert 的 all-reduce 与 routed expert 的 up-projection 重叠，减少 TP 下的通信等待。

**通用性能优化：**

- **[#49171](https://github.com/vllm-project/vllm/pull/49171)**（MRV2）：针对未完成 chunked-prefill 的请求，跳过 logits 计算与采样。这些 token 后续会被 `num_sampled=0` 丢弃，属于纯浪费，优化后能降低 prefill 阶段的无效计算。

**ROCm 双流解码的反复：**

- [#52024](https://github.com/vllm-project/vllm/pull/52024) revert 了之前的双流解码 PR（#48223），原因是在 Qwen3.5-35B-A3B-DEP2 上 CI 的 GSM8K 正确性测试失败。
- [#52033](https://github.com/vllm-project/vllm/pull/52033) 重新开启，附带了针对 Qwen3.5 风格模型的修复。需要后续跟进最终合入状态。

**性能回归告警：**

- 动态投机解码（`num_speculative_tokens_per_batch_size`）在 batch-size 阈值处引发聚合吞吐量灾难性下降（[#49548](https://github.com/vllm-project/vllm/issues/49548)，评论 7）。文档中已知的 cudagraph 降级（FULL_AND_PIECEWISE → PIECEWISE）约损失 14% 单流性能，但该 Issue 报告了更严重的并发场景崩塌。

## 5. 稳定性与回归

按严重程度排列：

- **引擎空闲后永久停滞（严重）**：[#51921](https://github.com/vllm-project/vllm/issues/51921)（v0.27.0/4-node TP=4/GB10）。空闲约 1 分钟后请求永远无法进入 scheduler，无报错、API 表面正常。影响生产可用性，尚无 fix PR。
- **DeepSeek V4 升级回归（严重）**：[#51758](https://github.com/vllm-project/vllm/issues/51758)。0.26.0 → 0.27.0 后 flash error，评论已 16 条，涉及范围广。
- **Gemma4 与 Transformers 5.15.0 不兼容**：[#51744](https://github.com/vllm-project/vllm/issues/51744)，👍 4。`vllm-openai:latest`（0.27.0）无法启动 Gemma4，需关注镜像依赖锁定策略。
- **ROCm 上 DeepSeek-V4 Flash KV cache OOM**：[#41962](https://github.com/vllm-project/vllm/issues/41962)。`rocm_dequantize_blocked_k_cache` 将整个 KV cache 池物化导致 decode 阶段 OOM。
- **Intel Arc B50 双卡 TP=2 崩溃**：[#48953](https://github.com/vllm-project/vllm/issues/48953)，`zeMemOpenIpcHandle` 返回 INVALID_ARGUMENT，战斧系列 XPU 老问题在 Battlemage 上重现。
- **安全：setuptools 版本过低**：[#51993](https://github.com/vllm-project/vllm/issues/51993)。`requirements/common.txt` 中的已知安全漏洞，建议尽快升级。
- **FusedMoE Kernel CI 长年失败**：[#39525](https://github.com/vllm-project/vllm/issues/39525)。2×B200 上的 `test_moe_layer.py` 自加入起持续失败，需确认当前状态。
- **DeepSeek-V4 Flash GSM8K 精度为 0**：[#51821](https://github.com/vllm-project/vllm/pull/51821) 曾提交修复（恢复输入 GEMM override 点），但该 PR 已被关闭，需关注后续重开或替代方案。

## 6. 对应用开发者的意义

- **暂缓升级 v0.27.0**：多个高影响 Bug 集中在 0.27.0（引擎停滞、DeepSeek V4 flash error、Gemma4 启动失败），若生产环境依赖 DeepSeek 或 Gemma4，建议等 0.27.1 或更稳定的补丁版本。
- **多节点部署需额外监控**：即使 API 表面正常，也可能出现请求永远无法被调度的“静默死亡”状态，建议增加请求端到端延迟的告警，并人工验证 v0.27.0 的 4 节点场景。
- **ROCm 用户可提前布局 Kimi-K3**：GEMM-RS、RMSNorm 融合、MoE 重叠等优化正在密集合入，后续版本会显著改善 AMD 上的 MLA/MoE 推理效率。
- **投机解码参数需谨慎调优**：动态投机解码的 batch-size 阈值可能触发急剧的性能崩塌，应用侧应做阶梯式压测，避免在未知并发水位上直接上线。
- **嵌入模型（BGE-M3/SigLIP/Jina V5）有修复红利**：今日多项 embedding 相关 PR 在语义正确性或计算效率上做出改进，embedding 服务可关注这些修复的合入周期。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 动态日报 — 2026-08-13

### 1. 今日速览
- 昨日无新 Release，社区活动集中于 bug 修复与性能优化贡献。
- 多节点**TP 死锁**（#33289）、**1M-token 长输入 OOM**（#34155）、**调度器挂起**（#34235）等严重稳定性问题持续成为焦点，多个问题仍待修复。
- Hopper/Blackwell 平台优化推进明显，包括 **DeepSeek-V4 MXFP4 KV Cache 解码**（#32741）及 **KIMI-K3 gfx950 kernel 调优**（#34580）等 PR 均在活跃开发中。

---

### 2. 版本发布与破坏性变更
- **移除 torchao 集成**：PR [#34304](https://github.com/sgl-project/sglang/pull/34304) 实现了 #34295，删除 `--torchao-config` 参数及相关代码。该参数自 torchao 0.17.0 起对所有值均报 `ImportError`，属清理性破坏变更，升级前请检查是否有依赖该参数的服务配置。
- **XPU 默认启用 SGL_XPU**：PR [#34492](https://github.com/sgl-project/sglang/pull/34492) 将 `SGLANG_USE_SGL_XPU` 默认改为 true，影响 XPU 后端行为，相关用户需关注。

---

### 3. 新模型与硬件支持
- **Apple Silicon 支持路线图**：Issue [#19137](https://github.com/sgl-project/sglang/issues/19137) 持续征集贡献者，推进 2026 Q2 Apple 设备支持计划。
- **NPU LLaDA2.2 支持**：PR [#32280](https://github.com/sgl-project/sglang/pull/32280) 在 Ascend NPU 上启用 LLaDA2.2 block routing MoE 与 JTI，支持 prefill/decode 图捕获，CUDA 保留 Triton 路径。
- **Kimi K3 路线图**：Issue [#32607](https://github.com/sgl-project/sglang/issues/32607) 持续追踪 Kimi-K3 的 Day0 支持、bug 修复及 cookbook。
- **AMD gfx950 优化**：PR [#34580](https://github.com/sgl-project/sglang/pull/34580) 针对 KIMI-K3 在 AMD GPU 上的 Triton MLA decode kernel stage-1 geometry 进行调优。
- **CPU AMX 量化支持**：PR [#29593](https://github.com/sgl-project/sglang/pull/29593) 为 auto-round 增加 Intel AMX CPU 支持。

---

### 4. 性能与优化
- **MXFP4 KV Cache for DeepSeek-V4（Hopper）**：PR [#32741](https://github.com/sgl-project/sglang/pull/32741) 实现端到端 MXFP4 KV Cache 解码，JIT 编译 FlashMLA 三分段 split-KV 设计，目标提升 Hopper（SM90/H20）显存效率与解码吞吐。
- **KIMI-K3 MLAs 内核调优**：PR [#34580](https://github.com/sgl-project/sglang/pull/34580) 优化 AMD gfx950 stage-1 几何配置。
- **GDN 目标验证避免张量物化**：PR [#33778](https://github.com/sgl-project/sglang/pull/33778) 移除 GDN 推理中冗余的 Q/K/V 分离拷贝操作，减少显存与 kernel 开销。
- **Cache-DiT 功能修复**：PR [#33827](https://github.com/sgl-project/sglang/pull/33827) 修复 MiniMax-H3 上 Cache-DiT 未实际生效的问题，该功能此前启用后无加速效果（1.00x）。
- **高层性能计划**：关注 Issue [#19637](https://github.com/sgl-project/sglang/issues/19637)（SM120 优化）与 [#33636](https://github.com/sgl-project/sglang/issues/33636)（DeepSeek V4 Perf Tracking），后者聚焦 SM90/SM10X 上优先级优化项。

---

### 5. 稳定性与回归
以下按严重程度排列，均无关联 fix PR（除非注明）；CI 健康度见 [#17050](https://github.com/sgl-project/sglang/issues/17050)（3 broken / 11 flaky）。

- **多节点 TP 死锁（严重，高优）**：Issue [#33289](https://github.com/sgl-project/sglang/issues/33289) — DeepSeek-V4 + DSpark 在 2×DGX Spark 上出现 rank 分叉死锁，rank A 卡在 NCCL proxy append，rank B 空转。影响多节点生产部署。
- **1M-token 长上下文 OOM（严重）**：Issue [#34155](https://github.com/sgl-project/sglang/issues/34155) — v0.5.17 上 `--tp 8 --moe-a2a-backend megamoe` 单请求 1.04M token 在 prefill 阶段 CUDA OOM，dp-attention 可规避。
- **调度器挂起 + sampling assert（严重）**：Issue [#34235](https://github.com/sgl-project/sglang/issues/34235) — hierarchical cache + chunked prefill 16K 下 DSV4 sparse prefill 触发 watchdog abort，0.5.16+ 另有采样断言语义。
- **FlashInfer TRTLLM NVFP4 MoE NaN（严重，新）**：Issue [#34629](https://github.com/sgl-project/sglang/issues/34629) — 升级 FlashInfer 至 0.6.16rc4 后在 SM100/103 上 tile-192 路径产生 NaN，GSM8K 测试得分归零。
- **DSpark 并发启动失败**：Issue [#34522](https://github.com/sgl-project/sglang/issues/34522) — v0.5.17 Kimi-K3 在 concurrency=1 时 CUDA launch failure。
- **DSpark Graph 几何错误**：Issue [#34384](https://github.com/sgl-project/sglang/issues/34384) — compact ragged CUDA Graph 使用不兼容的 request-slot 几何。
- **ROCm HiCache 性能退化**：Issue [#34611](https://github.com/sgl-project/sglang/issues/34611) — MI355X HiCache 在 agentic 真实负载下表现不佳。
- **已关闭/已解决**：
  - NemotronH 精度问题（extra_buffer）— Issue [#31833](https://github.com/sgl-project/sglang/issues/31833) 已关闭。
  - Blackwell `cute-dsl` 集成 — Issue [#32950](https://github.com/sgl-project/sglang/issues/32950) 已完成。
  - DeepSeek-V4-Pro 分数回退 — Issue [#33659](https://github.com/sgl-project/sglang/issues/33659) 已关闭。
- **其他**：CI 权限管理 PR [#34649](https://github.com/sgl-project/sglang/pull/34649)，安全加固 PR [#34370](https://github.com/sgl-project/sglang/pull/34370)（SafeUnpickler 白名单）。

---

### 6. 对应用开发者的意义
- **生产部署风险提示**：多节点 TP 死锁（#33289）和长上下文 OOM（#34155）目前均无修复补丁，若你的服务涉及多节点 TP、`megamoe` 或超长上下文，建议：

  - 升级前在预发环境跑 30 分钟以上加压测试；
  - 长文本场景优先采用 `--dp-attention` 缓解 OOM；
  - 关注 `--moe-a2a-backend` 与 `--speculative-algorithm` 组合的稳定性。

- **性能红利预告**：MXFP4 KV Cache（#32741）若合入，将显著降低 DeepSeek-V4 在 Hopper 上的 KV 显存占用，对高并发推理和长上下文服务是重大利好，可提前规划压测与容量评估。

- **配置兼容性检查**：若曾使用 `--torchao-config`，升级前需要移除相关配置；XPU 用户注意 `SGLANG_USE_SGL_XPU` 默认值变更。

- **架构演进方向**：PD 拆分的单协议层统一方案（[RFC #33861](https://github.com/sgl-project/sglang/issues/33861) + [Tracking #34510](https://github.com/sgl-project/sglang/issues/34510)）可能重构传输层协议，建议关注其对现有 mooncake/nixl/mori 部署的影响，后续升级可能涉及配置迁移。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

## llama.cpp 动态日报 — 2026-08-13

### 1. 今日速览

今日发布 b10375、b10373、b10369 三个版本，重点为 Qwen 工具调用解析收紧、imatrix 有限性检查后移，并为 mtmd 新增 pocket-tts 支持。分离式 prefill/decode 持续成为最活跃方向（[#21266](https://github.com/ggml-org/llama.cpp/issues/21266) 与 [PR #25675](https://github.com/ggml-org/llama.cpp/pull/25675)）。多后端稳定性问题仍较突出，包括 ROCm 动态库加载失败（[#25807](https://github.com/ggml-org/llama.cpp/issues/25807)）与 GLM-5.2 dense-MLA CUDA 输出损坏（[#26027](https://github.com/ggml-org/llama.cpp/issues/26027)）。

---

### 2. 版本发布与破坏性变更

- **b10375** — chat：收紧 Qwen 模型的裸函数解析（[#26793](https://github.com/ggml-org/llama.cpp/pull/26793)）。这对 Qwen 系列工具调用场景有行为影响：此前模型在省略换行等边界情况下可能将后续内容错误捕获进参数，升级后解析更严格。若你的应用依赖宽松解析容错，建议回归测试工具调用链路。
- **b10373** — imatrix：将有限性检查后移，仅检查被实际触达的专家（[#26861](https://github.com/ggml-org/llama.cpp/pull/26861)）。属于行为修正，对 imatrix 生成结果可能产生轻微影响。
- **b10369** — mtmd：支持 pocket-tts（[#26871](https://github.com/ggml-org/llama.cpp/pull/26871)）。该实现将转置卷积构建为 GEMM + col2im，以绕开 ggml_conv_transpose_1d 缺乏分组模式的限制。

---

### 3. 新模型与硬件支持

- **pocket-tts**：随 b10369 落地 mtmd 支持（[#26871](https://github.com/ggml-org/llama.cpp/pull/26871)）。
- **OpenVINO 后端**：[PR #26952](https://github.com/ggml-org/llama.cpp/pull/26952) 启用 Qwen3.5 Dense 与 MoE 的 CPU/GPU 支持，并优化 GPU 峰值内存。
- **HIP 构建文档**：[PR #26745](https://github.com/ggml-org/llama.cpp/pull/26745) 补充 RDNA4（gfx1200/gfx1201）到 GPU_TARGETS 支持列表。
- **Kimi-K3 文本模型**：[PR #26185](https://github.com/ggml-org/llama.cpp/pull/26185) 进行中，引入 cross-layer residual attention、latent MoE、situ activation 等新结构。
- **OpenCL**：[PR #26331](https://github.com/ggml-org/llama.cpp/pull/26331) 为 Adreno 新增 xmem SDPA 路径，解决非因果扩散注意力在 Z-Image 1024 下的缓冲区损坏。

---

### 4. 性能与优化

- **SYCL 算子融合**：[PR #26411](https://github.com/ggml-org/llama.cpp/pull/26411) 融合 UNARY(silu|sigmoid|softplus) + MUL，延续 #26015 的融合工作。
- **RPC `-sm tensor`**：[PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610) 为 RPC 后端增加 tensor 级序列模型支持，包含 async graph_compute、自定义 all_reduce、graph uid 缓存，面向多机 RDMA 场景。
- **NUMA 权重镜像**：[PR #16000](https://github.com/ggml-org/llama.cpp/pull/16000) 新增 `--numa mirror`，将模型权重镜像到每个 NUMA 节点并用线程局部变量选择本地副本，消除跨 socket 访存。
- **HIP fast-math 默认关闭**：[PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696) 将 `-funsafe-math-optimizations` 改为 opt-in（`GGML_HIP_UNSAFE_MATH=OFF` 默认），HIP 构建恢复到 IEEE 合规，追求峰值性能者可自行开启。
- **CLI 配置系统**：[PR #26118](https://github.com/ggml-org/llama.cpp/pull/26118)（已关闭）尝试引入系统级配置文件，减少多 GPU、线程等重复参数传递。

---

### 5. 稳定性与回归

**高严重度（正确性/崩溃）**

- **[#25807] ROCm 加载失败（开放）**：ROCm 7.14 下报 `error while loading shared libraries: libhipblas.so.3`，影响 llama-fit-params 等工具。[GitHub](https://github.com/ggml-org/llama.cpp/issues/25807)
- **[#26027] GLM-5.2 dense-MLA CUDA 输出损坏（开放）**：任何真实 transformer 层 offload 到 GPU 后产生"部分连贯文本混垃圾"的输出，涉及 RTX PRO 6000 Blackwell（SM120）。[GitHub](https://github.com/ggml-org/llama.cpp/issues/26027)
- **[#26963] ROCm Windows 二进制崩溃（开放）**：预编译 b10373 报 "cudaMemGetInfo failed"，与同日关闭的 [#26929](https://github.com/ggml-org/llama.cpp/issues/26929)（不识别 GPU）为同一用户提交，建议等官方修复二进制。[GitHub](https://github.com/ggml-org/llama.cpp/issues/26963)
- **[#24492] Gemma 4 31B MTP + Vulkan 崩溃（开放）**：报 pre-allocated tensor cannot run operation NONE，影响 draft-mtp 推理。[GitHub](https://github.com/ggml-org/llama.cpp/issues/24492)
- **[#26746] ROCm gfx1151 RPC worker 在 TOP_K 崩溃（开放）**：DeepSeek V4 prefill 超过 4096 token 后触发，涉及 TheRock 7.14.0。[GitHub](https://github.com/ggml-org/llama.cpp/issues/26746)

**回归与性能劣化**

- **[#26918] RTX 5080 40% 性能回归（已关闭）**：b10356→b10359 起 prompt processing 与生成速度显著劣化，且随版本递增。虽已关闭，但发布说明中未见明确修复指向，建议关注后续构建验证。[GitHub](https://github.com/ggml-org/llama.cpp/issues/26918)
- **[#25117] DFlash 在 AMD APU 上 2x 回归（开放）**：Strix Halo + 量化 MoE 目标下，投机解码比基线慢约 2 倍。[GitHub](https://github.com/ggml-org/llama.cpp/issues/25117)
- **[#25356] Vulkan 批量解码吞吐断崖（开放）**：多专家 MoE（512 专家）在 9 并发序列时 TG 从 122.5 t/s 跌至 82.9 t/s，疑似 MMV dispatch 的固定 8-token 阈值导致。[GitHub](https://github.com/ggml-org/llama.cpp/issues/25356)
- **[#24946] SYCL Battlemage 功耗问题（开放）**：`-cb` 标志使 Arc Pro B70 在请求间持续处于 gt-c0 高功耗状态（2800 MHz），影响空闲功耗。[GitHub](https://github.com/ggml-org/llama.cpp/issues/24946)
- **[#23797] SYCL 多 GPU 张量分裂 token 损坏（已关闭）**：Level Zero 下 token 严重损坏，OpenCL 回退性能跌至 4 T/s，多架构受影响。[GitHub](https://github.com/ggml-org/llama.cpp/issues/23797)

**功能缺陷**

- **[#19466] Vision 模型 KV cache 保存失效（开放）**：`/slots/3?action=save` 对视觉模型不工作，36 条评论为今日最高热度，7 个 👍。[GitHub](https://github.com/ggml-org/llama.cpp/issues/19466)
- **[#25751] Gemma 4 SWA 遗忘关键细节（开放）**：疑似滑动窗口注意力在长上下文下丢失早期关键信息，影响 4×3090 部署。[GitHub](https://github.com/ggml-org/llama.cpp/issues/25751)

---

### 6. 对应用开发者的意义

- **Qwen 工具调用需要回归验证**：b10375 收紧裸函数解析后，此前可容忍的宽松输出格式（如缺省前导换行）可能被拒绝。若你的 Agent 依赖 Qwen 原生工具调用，请升级后跑一遍完整工具链路，并考虑在 prompt 中强化格式约束。
- **Vision 模型暂时不要依赖 KV cache 持久化**：[#19466](https://github.com/ggml-org/llama.cpp/issues/19466) 确认 /slots save 对视觉模型不可用，构建多模态 Agent 会话恢复功能时应预留 fallback 方案（如重放历史消息）。
- **分离式 prefill/decode 值得提前关注**：[issue #21266](https://github.com/ggml-org/llama.cpp/issues/21266)（14👍）与 [PR #25675](https://github.com/ggml-org/llama.cpp/pull/25675) 正在推进独立 prefill worker，通过宿主机内存传输序列状态。对长上下文、高并发在线服务的架构选型有直接影响。
- **server metrics 行为将修正**：[PR #26920](https://github.com/ggml-org/llama.cpp/pull/26920) 重构了指标统计方式，修复 master 分支的计数正确性问题，并朝 [#24866](https://github.com/ggml-org/llama.cpp/issues/24866)（llama_decode() 期间可访问 /metrics）迈进一步。依赖指标做计费/监控的应用应关注语义变化。
- **ROCm 用户谨慎升级**：预编译 ROCm Windows 二进制（b10373）存在 GPU 识别与崩溃问题，Linux 侧 libhipblas.so.3 错误也未修复。建议锁定已知稳定版本，或等官方重新发布二进制。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 2026-08-13

## 今日速览

v0.32.10-rc1 发布：`repeat_penalty` 默认改为 1.0（关闭）并对齐其他引擎，NVFP4 MLX 模型 prefill 提速约 7–8%。多路 PR 聚焦 OpenAI 兼容层与 thinking/structured outputs 的交互修复；历史 SSRF 漏洞修复已合入，Qwen3.6 CUDA 回退问题随 llama.cpp bump 关闭。

## 版本发布与破坏性变更

**v0.32.10-rc1**（[Release](https://github.com/ollama/ollama/releases)）
- **`repeat_penalty` 默认值 1.1 → 1.0（off）**：未显式设置该参数的模型将不再默认抑制重复，与其他引擎行为对齐，同时加速 speculative decoding。若旧模型出现重复生成，需在 Modelfile 或请求中显式设置 per-model 值。**升级后生成行为可能变化，建议灰度验证。**
- **NVFP4 MLX prefill 优化**：带全局 scale 的 NVFP4 MLX 模型 prefill 提速约 7–8%，对应实现见 [PR #17703](https://github.com/ollama/ollama/pull/17703)。
- 本地构建版本排序修复（[PR #16980](https://github.com/ollama/ollama/pull/16980)）：`git describe` 产生的 `X.Y.Z-N-gHASH` 被 semver 误判为预发布版，可能导致本地构建被错误升级；已改为合规 semver。

## 新模型与硬件支持

- **Nemotron-H MLX 视觉支持**（[PR #17714](https://github.com/ollama/ollama/pull/17714)）：实现 RADIO 视觉编码器与 projector，接入共享 MLX media pipeline，支持动态分辨率预处理、确定性占位符扩展与 MTP offsets。
- **MLX KV connector 框架**（[PR #17707](https://github.com/ollama/ollama/pull/17707)）：在 MLX prefix-cache restore 点之上抽象 connector 层，附带 safetensors 文件后端示例，支持最长 prompt 前缀恢复。
- **Linux/Windows MLX 支持推进**（[PR #17710](https://github.com/ollama/ollama/pull/17710)）：下载校验逻辑从 registry 侧移到本地侧，本机无 MLX 时不再拉取不可运行的 MLX 模型。
- **ARM CPU 构建兼容**（[PR #17385](https://github.com/ollama/ollama/pull/17385)）：GCC < 12 工具链（如 Jetson AGX Orin / Ubuntu 22.04）不再因 `-march=armv9.2-a+...` 构建失败。
- **新模型请求**（未实现）：deepseek-v4-flash:0731（[#17510](https://github.com/ollama/ollama/issues/17510)）、kat-coder-v2.5-dev（[#17506](https://github.com/ollama/ollama/issues/17506)）。

## 性能与优化

**已落地**
- NVFP4 MLX 双 scale 模型 prefill 融合算子（[PR #17703](https://github.com/ollama/ollama/pull/17703)）：将 float32 global scale 乘法与 dtype 回写编译为单个 kernel，减少 kernel launch 和中间张量，prefill 提升约 7–8%（随 v0.32.10-rc1 发布）。

**进行中的性能问题**
- **AMD Vulkan Q4_K_M 回归**（[#16721](https://github.com/ollama/ollama/issues/16721)，OPEN）：v0.30.7+ 在 Radeon 780M 上 generation 降约 10%、prefill 降约 20%，仅 Q4_K_M 受影响，Q6_K/Q8_0 无变化。
- **MLX 模型性能倒挂**（[#17050](https://github.com/ollama/ollama/issues/17050)，OPEN）：M3 24GB 上 Qwen3.5:35b-mlx 慢于非 MLX 版；Qwen3.6:35b-mlx 无法运行。

## 稳定性与回归

**安全**
- **SSRF blob 校验绕过已修复**（[#15485](https://github.com/ollama/ollama/issues/15485)，CLOSED）：manifest 中 config 与 layer digest 相同时 `skipVerify` map 碰撞，导致 blob 哈希校验被跳过、恶意 registry 可外泄 SSRF 响应。修复见 [PR #15504](https://github.com/ollama/ollama/pull/15504)。

**高影响**
- **Qwen3.6 混合模型 CUDA 回退 CPU**（[#17669](https://github.com/ollama/ollama/issues/17669)，CLOSED）：llama.cpp b10353 引入，b10242 正常；已随 [PR #17702](https://github.com/ollama/ollama/pull/17702)（llama.cpp bump）关闭。
- **`/api/generate` 被 token repeat limit 中止**（[#17270](https://github.com/ollama/ollama/issues/17270)，OPEN）：0.32.1 回归，0.20.7 正常。v0.32.10-rc1 默认关闭 repeat_penalty 后可能缓解，建议验证。

**模型输出正确性**
- **低量化 KV 格式乱码**（[#17614](https://github.com/ollama/ollama/issues/17614)，OPEN）：q8_0→q4_0 KV 量化后输出重复无意义 token。
- **Qwen2.5-3B 中文输入输出垃圾 ASCII**（[#17587](https://github.com/ollama/ollama/issues/17587)，OPEN）：Windows CPU 上 tokenizer 误判，输出 `@@@@@`、`!!!!!`。
- **Gemma 4 think=false 重复 `<unused49>`**（[#17459](https://github.com/ollama/ollama/issues/17459)，OPEN）：同时影响 VS Code 集成。
- **Qwen3.6 35B 显存异常**（[#17517](https://github.com/ollama/ollama/issues/17517)，OPEN）：RTX 5070Ti 12GB 上直接触顶，GPU 未充分利用。

**其他**
- 响应截断（[#17272](https://github.com/ollama/ollama/issues/17272)，CLOSED）；num_ctx 实际截断为配置值一半（[#17427](https://github.com/ollama/ollama/issues/17427)，CLOSED）；Docker + AMD APU 0.30+ 无法加载模型（[#17285](https://github.com/ollama/ollama/issues/17285)，CLOSED）；0.32.4 CUDA 12.1 GPU 不可用（[#17431](https://github.com/ollama/ollama/issues/17431)，CLOSED）；runner 挂起且请求不达 work loop（[#15950](https://github.com/ollama/ollama/issues/15950)，OPEN）。

**修复中（相关 PR）**
- `/api/generate` 在 thinking 完成前不强制 structured outputs（[PR #17705](https://github.com/ollama/ollama/pull/17705)，修复 [#17544](https://github.com/ollama/ollama/issues/17544)）
- `/api/generate` raw 请求不默认开启 thinking（[PR #17708](https://github.com/ollama/ollama/pull/17708)，修复 [#17700](https://github.com/ollama/ollama/issues/17700)，SillyTavern 场景）
- Chat restart 时保留 structured outputs 与 thinking 配置（[PR #17706](https://github.com/ollama/ollama/pull/17706)）
- 过滤 namespace 类型工具避免 llama-server 报错（[PR #17630](https://github.com/ollama/ollama/pull/17630)）
- Agent edit 工具支持单次调用多次替换（[PR #17711](https://github.com/ollama/ollama/pull/17711)）

## 对应用开发者的意义

- **OpenAI 兼容层增强**：Responses API 支持服务端 web search（[PR #17686](https://github.com/ollama/ollama/pull/17686)），Codex 等客户端可直接使用；`reasoning_effort=minimal` 映射为 low（[PR #17712](https://github.com/ollama/ollama/pull/17712)）；搜索超限后优雅结束请求而非报错（[PR #17709](https://github.com/ollama/ollama/pull/17709)）。
- **thinking 与 structured outputs 协同**：对依赖 `/api/generate` 的工具（如 SillyTavern），[PR #17708](https://github.com/ollama/ollama/pull/17708) 修复 raw 请求空回复；[PR #17705](https://github.com/ollama/ollama/pull/17705)/[#17706](https://github.com/ollama/ollama/pull/17706) 保证思考模型在 JSON 模式下有推理空间，输出质量应显著改善。
- **`repeat_penalty` 默认值变更**：升级 v0.32.10-rc1 后，未显式设置该参数的模型可能更易重复，代理类应用需在请求侧显式覆盖。
- **MLX 生态演进**：KV connector 框架为长对话缓存复用提供新接口；Linux/Windows MLX 支持即将落地，跨平台模型分发策略需提前规划。
- **可观测性缺口仍在**：服务端推理指标需求（[#17694](https://github.com/ollama/ollama/issues/17694)）尚未实现，生产环境监控目前只能依赖 `/api/ps` 与请求级日志。
- **Agent 运行时生态扩展**：`ollama launch` 新增 Muse Code（[PR #17594](https://github.com/ollama/ollama/pull/17594)）与 Talos（[PR #17589](https://github.com/ollama/ollama/pull/17589)）集成，Ollama 正从模型服务向 agent 启动器演进。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 · 2026-08-13

## 今日速览
过去 24 小时无新版本发布。值得关注的动态集中在三方面：**① 高优稳定性修复密集推进**——Redis Cluster 用户间响应串扰安全缺陷已关闭（#25447），token 计数路由预算预留泄漏、spend log 丢失等三笔修复 PR 在途；**② 模型/定价注册表大幅更新**——Groq 全量对齐官方文档、Bedrock GPT-5.6 开放 1M 上下文、新增 Meta Muse Spark 1.2，并首次接入 Parallel AI Provider；**③ UI 层 antd/Tremor → shadcn 迁移持续进行**（3 个 PR 并行）。

## 新模型与硬件支持
- **Parallel AI 全新增为 chat + responses Provider**（[#36704](https://github.com/BerriAI/litellm/pull/36704)）：此前仅支持 search，本次补齐 OpenAI Responses 兼容端点，并将 `after_date`、`fetch_policy`、`location` 等 search 参数正确嵌套发送；同时修正 per-request 定价长期记为 $0 的问题。
- **Groq 模型注册表同步官方文档**（[#36664](https://github.com/BerriAI/litellm/pull/36664)）：新增 Qwen 3.6 27B、Prompt Guard 2 两个尺寸、Orpheus 等 5 个模型；修正 gpt-oss / Llama 的上下文及输出上限；补充模型关停日期。
- **Meta Muse Spark 1.2 及其 contributor 低价档**（[#36717](https://github.com/BerriAI/litellm/pull/36717)）：定价 $1.25/$4.25 每 M token，修复此前调用按 $0 计费、`reasoning_effort` 被 400 拒绝的问题。
- **Bedrock GPT-5.6 Sol/Terra/Luna 支持 1M 上下文**（[#36698](https://github.com/BerriAI/litellm/pull/36698)，已合并）：`max_input_tokens` 从 272K 提升至 1M，新增 `*_above_272k_tokens` 长上下文输入/缓存/输出定价档，避免超长 prompt 被按短上下文费率计费。
- **Gemini 2.5 Flash / Flash-Lite priority/flex paygo 支持**（[#23388](https://github.com/BerriAI/litellm/issues/23388)，已关闭）：Vertex AI 的按需/灵活计费选项已覆盖到这两个模型。

## 性能与优化
- **成本轮询页不再被“不可计费 batch”饿死**（[#36714](https://github.com/BerriAI/litellm/pull/36714)）：统一 ID 中缺少 model id、或 Provider 返回 404 的行会被直接退役，避免占满轮询槽位导致新 batch 永远等不到成本回写。
- **token 计数路由跳过预算预留**（[#36718](https://github.com/BerriAI/litellm/pull/36718)）：免费 token 计数请求此前会预留预算且从不回收，单次调用足以把带预算的 key 打到 $0 锁死；Google `:countTokens` 即使在调用失败时也会泄漏预留。该 PR 让所有 token 计数路由（含 Google）不再参与预算预留。
- **复杂度路由（complexity_router）分类器校准**（[#36578](https://github.com/BerriAI/litellm/pull/36578)）：原 rubric 面向消费级 chat 校准，最高档描述“非平凡代码/多步技术工作”恰好命中开发者/Agent 流量中位数，导致常规工程请求被路由到最贵档位；PR 引入 worked examples 校准，并支持按 router 选择 rubric。

## 稳定性与回归

### 严重（安全/数据正确性）
- **[已关闭] Redis Cluster 多租户响应串扰**（[#25447](https://github.com/BerriAI/litellm/issues/25447)）：OpenShift 多副本环境下偶发将响应返回给错误客户端，属严重隔离缺陷，现已关闭，建议确认部署版本已包含修复。
- **[OPEN] 429 响应泄漏完整 token SHA-256 哈希**（[#27884](https://github.com/BerriAI/litellm/issues/27884)）：parallel request limiter 的 429 错误体包含 64 位完整哈希，存在凭证信息泄露风险，尚无修复 PR。

### 预算/计费正确性
- **[OPEN] anthropic adapter 下 `max_parallel_requests` 不可靠**（[#27955](https://github.com/BerriAI/litellm/issues/27955)）：客户端中途取消 `/v1/messages` 流式请求后，Redis 计数器单调递增，最终所有请求被限流。
- **[OPEN] `global_max_parallel_requests` 不生效**（[#27900](https://github.com/BerriAI/litellm/issues/27900)）。
- **[OPEN] Azure GPT-5.6 Terra/Luna 价格错误**（[#36192](https://github.com/BerriAI/litellm/issues/36192)）：cost map 误用 OpenAI 直连降价，Azure 从未跟进，需在修复前手工校正账单。
- **[OPEN] `/spend/logs` 记录 router 模型而非实际选中模型**（[#27942](https://github.com/BerriAI/litellm/issues/27942)）：Azure Model Router 场景下成本归属错误。

### 崩溃与功能回归（已修复/修复中）
- **[已关闭] 空 `choices` chunk 崩溃**（[#36553](https://github.com/BerriAI/litellm/issues/36553)）：`_should_start_new_content_block` 无条件访问 `chunk.choices[0]`，仅含 usage 的 OpenAI 格式 chunk 会触发崩溃；已修复。
- **[修复中] Bedrock Guardrail + Anthropic 流式返回 500**（[#36598](https://github.com/BerriAI/litellm/pull/36598)）：SSE 帧无法被流式组装器读取，输出扫描也不执行；PR 先组帧成完整响应再走常规扫描路径。
- **[OPEN] 自定义 MCP Server 创建失败**（[#23869](https://github.com/BerriAI/litellm/issues/23869)）：UI 添加自定义 MCP server 报 "Could not find..."，17 条评论、9 👍，社区影响面较大。
- **[OPEN] Xiaomi MiMo 在 Claude Code 下失败**（[#24549](https://github.com/BerriAI/litellm/issues/24549)）：`output_config` 参数导致 `AsyncCompletions.create()` 报错。
- **[OPEN] DeepSeek tool calls 后出现空白 assistant 消息**（[#31553](https://github.com/BerriAI/litellm/issues/31553)）：codex 经网关调用时产生意外空消息。
- **[OPEN] Ollama `reasoning_content` 恒为 null**（[#27956](https://github.com/BerriAI/litellm/issues/27956)）：Qwen3/DeepSeek-R1 思维链无法透出至 Langfuse 等观测平台。
- **[OPEN] Usage AI Chat 在模型名为代理别名/组时失败**（[#24513](https://github.com/BerriAI/litellm/issues/24513)）。
- **[已关闭] Responses API 流式缺少必需 SSE 事件类型**（[#20975](https://github.com/BerriAI/litellm/issues/20975)）。
- **[OPEN] Cohere Embed v4 多模态输入被错误展平为 texts**（[#36715](https://github.com/BerriAI/litellm/pull/36715)，修复 PR 已提交）。

### 数据持久化与可观测性（均有修复 PR）
- **spend log 在 DB 传输错误时静默丢失**（[#36716](https://github.com/BerriAI/litellm/pull/36716)）：Prisma P1001 未进入重试分支；修复后失败批次重新入队。
- **flush 取消导致 spend log 行丢失，且 shutdown 不排空队列**（[#34826](https://github.com/BerriAI/litellm/pull/34826)）。
- **otel v2 下 Phoenix per-key/team 项目路由失效**（[#36706](https://github.com/BerriAI/litellm/pull/36706)）：恢复 `phoenix_project_name` 元数据路由。
- **[OPEN] Guardrails Monitor 不展示 `litellm_content_filter` 评估**（[#36566](https://github.com/BerriAI/litellm/issues/36566)）。

### 其他
- **[已关闭] 1.96.1 缺少 Python 3.13 wheel/sdist**（[#36526](https://github.com/BerriAI/litellm/issues/36526)）。
- **缺失请求体参数返回 500 而非 400**（[#35849](https://github.com/BerriAI/litellm/pull/35849)）：涉及 6 个代理路由，e2e 测试已覆盖，PR 进行中。
- **[已关闭] anthropic messages 自定义 base URL 忽略 bearer 认证**（[#33057](https://github.com/BerriAI/litellm/pull/33057)）。
- **带标签的 pre-routing strategy 误捕获所有请求**（[#36627](https://github.com/BerriAI/litellm/pull/36627)）：修复无标签请求绕过已选分层策略、并移除 marker 伪部署。
- **团队/Key 创建时 `budget_duration: null` 被默认值覆盖**（[#36699](https://github.com/BerriAI/litellm/pull/36699)）：修复后显式 null 表示“永不重置”，UI 下拉支持恢复该选项。
- **[已关闭] DB 存储的 auto-router/complexity-router 模型从 `/v1/models` 消失**（[#33168](https://github.com/BerriAI/litellm/issues/33168)）。

## 对应用开发者的意义
- **预算与账单可靠性显著提升**：token 计数路由不再锁死预算 key（#36718），三笔 spend log 修复（#36716、#34826、#36714）将大幅减少成本数据丢失。依赖 `/spend/*` 做计费/配额的产品建议升级后做一次故障注入验证。
- **多租户安全**：Redis 串扰修复（#25447）已关闭，集群部署应尽快跟进；429 泄漏 token 哈希（#27884）仍未修复，网关类产品在日志管线中需自行脱敏。
- **Claude Code / Anthropic 接入方**：`max_parallel_requests` 计数泄漏（#27955）直接影响长稳运行；Bedrock Guardrail + 流式修复（#36598）值得关注落地版本。此前 system message 误拒（#21420）已关闭。
- **新模型即开即用**：Muse Spark 1.2、Groq 新模型、GPT-5.6 1M 上下文均可直接通过模型名使用；Parallel AI 可作为 chat/responses 后端接入。注意 Azure 版 GPT-5.6 定价 bug（#36192）修复前账单会偏高。
- **Agent 工具链注意**：MCP Server 创建（#23869）与 MCP 安全 guardrail 模板（#30953）两个 UI 问题未修复，依赖 UI 管理 MCP 的团队可临时使用配置文件/API 绕过；Ollama 推理模型的思维链透出（#27956）会影响基于 reasoning 的观测与分析。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 · 2026-08-13

## 今日速览
- 无新版本发布；过去 24 小时动态集中在**修复 PR 集中提交**：AMD GPU 误报、Windows 安全策略拦截、macOS llama-server 启动失败、Deep Research 冻结均有对应 fix 进入 open 状态。
- 社区最高赞 feature request 仍是 **DeepReinforce Ornith-1.0 支持**（[#6721](https://github.com/unslothai/unsloth/issues/6721)，👍23）；AMD 平台兼容性问题约占当日 issue 近 1/3，但已有多条针对性 PR 在推进。

## 新模型与硬件支持
- **DeepReinforce Ornith-1.0**：社区请求增加 Unsloth 优化变体或工具链兼容支持（[#6721](https://github.com/unslothai/unsloth/issues/6721)）。
- **MiniMax-M3 GGUF 加载受阻**：用户下载官方 `unsloth/MiniMax-M3-GGUF`（UD-Q6_K_XL，9 shards，~387GB）后，Studio 捆绑的 llama.cpp b10360 报缺少 indexer keys，疑似 Studio llama.cpp 与 HF 量化版本不同步（[#8513](https://github.com/unslothai/unsloth/issues/8513)）。
- **MiniMax-H3 受限于 stable-diffusion.cpp 版本**：系统 PATH 中 `/usr/bin/sd` 过旧，不识别 MiniMax-H3；PR [#8560](https://github.com/unslothai/unsloth/pull/8560) 将校验 legacy `sd` 二进制再接受，避免误判（[#8507](https://github.com/unslothai/unsloth/issues/8507)）。
- **安装器扩展 AMD Linux 覆盖**：PR [#8412](https://github.com/unslothai/unsloth/pull/8412) 为 Linux 安装器加入 torch 2.11 CPU 包、Vulkan 后端（无需 ROCm）及 gfx1033 架构 gate。

## 性能与优化
- **LoRA 扫描移出事件循环**（[#8392](https://github.com/unslothai/unsloth/pull/8392)）：`GET /api/models/loras` 原先在协程内同步扫描 outputs/exports 目录并逐个读取 config，导致扫描期间服务端无法响应其他请求（含流式 token）。合入后不再阻塞事件循环。
- **非音频 tokenizer 免整文件解析**（[#8393](https://github.com/unslothai/unsloth/pull/8393)）：`detect_audio_type` 不再对 `tokenizer_config.json` 做全量 `json.loads` 探测 codec token，省去普通文本 checkpoint 的大型 tokenizer 解析开销。
- **远程 GGUF 输出缓冲回归修复**（[#8635](https://github.com/unslothai/unsloth/pull/8635)）：修正 #8524 引入的 0.5757GB 固定偏移，`TestEstimateGgufRequiredGb` 8 个失败用例恢复通过。
- **可观测性增强**：社区请求在 Studio API 页实时展示 prompt 处理速度与生成速度（当前仅生成速度且需请求完成后可见）（[#8528](https://github.com/unslothai/unsloth/issues/8528)）。
- **图片/视频生成预设**（[#8390](https://github.com/unslothai/unsloth/pull/8390)）：Studio Images/Video 页新增可保存/覆盖/删除的生成预设，方便批量试验。

## 稳定性与回归
- **严重：Deep Research 冻结**（[#8483](https://github.com/unslothai/unsloth/issues/8483)）：在 Gemma-4-26B-A4B 上写报告阶段无响应。PR [#8634](https://github.com/unslothai/unsloth/pull/8634) 停止流式研究 run 对整段 chat 的 re-render；PR [#8633](https://github.com/unslothai/unsloth/pull/8633) 跟进 activity panel 取消计时器泄漏与主线程问题。
- **严重：AMD GPU 误报为可用、实际跑 CPU**（[#8473](https://github.com/unslothai/unsloth/issues/8473)）：`unsloth studio update` 打印 `AMD ROCm (gfx1201)`，但后端 CPU-only、Live monitor 显示 VRAM `--`。PR [#8620](https://github.com/unslothai/unsloth/pull/8620) 将改为在 PyTorch 看不到 GPU 时直接报错。
- **高：Windows 安装被安全策略拦截**（[#8490](https://github.com/unslothai/unsloth/issues/8490)）：AppLocker/WDAC 拒绝未签名的 `unsloth.exe` console script，安装死在 `Running studio setup`。PR [#8592](https://github.com/unslothai/unsloth/pull/8592) 改为直接调用 `python -m unsloth_cli`，不再依赖生成 exe。
- **高：macOS M4 无法加载本地 GGUF**（[#8566](https://github.com/unslothai/unsloth/issues/8566)）：`llama-server` 启动失败且错误信息误指 GGUF/内存不足。PR [#8574](https://github.com/unslothai/unsloth/pull/8574) 为 macOS 设置 `DYLD_LIBRARY_PATH` 并对启动错误重新分类。
- **中：API 后端上下文泄漏**（[#8442](https://github.com/unslothai/unsloth/issues/8442)）：以 unsloth 作为 API 后端时，上下文会在会话与模型 harness 之间串线，影响多会话/多租户场景。
- **中：ROCm RAG embedder 崩溃**：移除 warmup 后首次 RAG 操作仍可能因 torch/ROCm 栈不匹配崩溃；PR [#8609](https://github.com/unslothai/unsloth/pull/8609) 将该崩溃隔离为可捕获错误。
- **中：Backend CI 持续红色**：PR [#8637](https://github.com/unslothai/unsloth/pull/8637) 修复两处根因——仅按 SSE 字段判断事件类型导致流中断、远程 GGUF 契约测试过期。
- **低：RDNA3 VRAM 读数失效**（[#7452](https://github.com/unslothai/unsloth/issues/7452)）、**llama.cpp 破坏 AMD 检测**（[#7485](https://github.com/unslothai/unsloth/issues/7485)）、**RX 5700XT/7600 不识别**（[#8529](https://github.com/unslothai/unsloth/issues/8529)、[#8471](https://github.com/unslothai/unsloth/issues/8471)）等 AMD 系列问题仍待统一排查；PR [#7670](https://github.com/unslothai/unsloth/pull/7670)（按构建 arch coverage 选 GPU、加崩溃恢复）在推进。

## 对应用开发者的意义
- **Agent/流式场景**：#8483 的修复（[#8633](https://github.com/unslothai/unsloth/pull/8633)、[#8634](https://github.com/unslothai/unsloth/pull/8634)）合入前，Deep Research 长任务仍有冻结风险，建议在上层加任务级超时。#8442 的上下文泄漏需评估是否影响多会话应用；上下文自动压缩（[#8504](https://github.com/unslothai/unsloth/issues/8504)）仍为开放请求。
- **AMD 用户**：#8473 意味着“安装器提示 GPU 正常”并不可信；环境自检应以 Live monitor 是否显示 VRAM 为准。PR [#7670](https://github.com/unslothai/unsloth/pull/7670) 合入后多 GPU 选择将更可靠。
- **Windows 企业环境**：若启用了 AppLocker/WDAC，当前安装会被拦截，可等 [#8592](https://github.com/unslothai/unsloth/pull/8592) 合入后再升级。
- **服务端响应性**：[#8392](https://github.com/unslothai/unsloth/pull/8392) 合入后，模型选择器轮询 LoRA 列表不再阻塞其他请求，对多用户共享实例是实质改善。
- **本地工具链扩展**：PR [#8630](https://github.com/unslothai/unsloth/pull/8630) 为 vLLM/Ollama/llama.cpp/OpenAI 兼容等自托管 provider 增加 Studio 本地工具循环（Search/Code/MCP/RAG），需要本地 Agent 能力的开发者可提前跟进。

</details>

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*