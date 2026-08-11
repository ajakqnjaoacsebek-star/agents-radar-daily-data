# ArXiv AI 研究日报 2026-08-11

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-11 10:24 UTC

---

# ArXiv AI 研究日报（2026-08-11）

## 📌 今日速览

今日 50 篇论文中，LLM 安全研究从“提示注入”扩展到了“思维链隐私”与“动态安全护栏”：有工作成功从专有 API 的加密推理块中恢复 CoT，也有框架将 agent harness 本身作为可演化的安全组件。训练方法论层面，多篇论文同时反思 on-policy 蒸馏的 token 级目标，指出“高 token 一致但全局错误”的退化模式，并提出基于抽象技能、自参考老师等改进方案。智能体领域进展密集：芯片架构搜索、科研自动化、多智能体制度设计均有新系统与新视角。应用方面，医学多模态（分割+推理）、科学视频生成基准、金融数值 token 化等方向出现更接近真实部署的模型与评测。整体来看，社区正从“刷分导向的基准”转向“针对现有评测缺陷的元评估与更可信基准构建”。

## 🔥 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Thinking Mode Fusion for Mathematical Generalization](http://arxiv.org/abs/2608.09893v1) | Cao, Zhang, Bloem et al. | 提出 Thinking Mode Fusion，让同一模型同时支持简洁回答与长链推理，并系统研究了两种模式间“数据比例”和“训练调度”对数学泛化的影响。为多模式统一训练提供了可复用的经验参考。 |
| [Mismatch Matters: On-Policy Distillation Beyond Token Agreement](http://arxiv.org/abs/2608.09836v1) | Yu, Yu, Xu et al. | 揭示 on-policy 蒸馏中的“退化一致性”失败模式：学生用重复循环取得高 token 一致但全局回答错误。主张将蒸馏目标从 token 匹配转向结构与语义匹配，对当前后训练 pipeline 有直接警示。 |
| [Stealing Reasoning Traces from Proprietary LLM APIs](http://arxiv.org/abs/2608.09867v1) | Panfilov, Schmotz, Shumailov et al. | 展示专有 LLM API 返回的加密思维链文本块可被逆向恢复，从而绕过服务方对 CoT 的隐藏保护。说明在客户端不可信假设下，现有“服务器端加密”方案并不完备，安全影响重大。 |
| [SR-OPSD: Self-Referenced On-Policy Self-Distillation](http://arxiv.org/abs/2608.09745v1) | Sun, Li, Zhao et al. | 提出自参考 on-policy 自蒸馏，由策略自身的 stop-gradient 版本作为教师生成 token 级稠密监督，缓解固定自教师带来的分布漂移问题。与 RLVR、蒸馏等训练流程高度相关。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [SHE: Trajectory-driven Safety Harness Evolution for LLM Agents](http://arxiv.org/abs/2608.09885v1) | Qu, Mao, Li et al. | 将 LLM 智能体的安全机制视为可进化的“安全护栏”，根据运行轨迹反馈动态调整上下文、工具和权限配置。突破静态 harness 的安全局限，为部署期安全改进提供了新范式。 |
| [Consilience for Verifier-Free Test-Time Scaling](http://arxiv.org/abs/2608.09898v1) | Kong, Hui, Mao et al. | 提出免验证器测试时缩放（VF-TTS），在无外部验证信号的场景中利用模型自身一致性提升 rollout 质量。扩展了测试时计算在通用任务上的适用范围。 |
| [ArchAgent v2: Data Prefetching Championship Case Study](http://arxiv.org/abs/2608.09874v1) | Gonzalez, Gupta, Jain et al. | 将 agentic 算法设计引入微架构搜索，在数据预取锦标赛中验证了其在严格硬件预算、长仿真约束下发现有效架构的能力。是 AI 辅助芯片设计领域少见的端到端案例。 |
| [Multi-Agent AI Safety as an Institutional Design Problem](http://arxiv.org/abs/2608.09828v1) | Abdullah X | 主张将多智能体安全建模为“AI 制度设计”问题，分析任务委派、信息流、资源使用等部署规则如何决定集体安全。为多智能体安全分析提供了宏观的制度视角。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Multimodal Model Diffing for Feature Discovery and Control](http://arxiv.org/abs/2608.09928v1) | Batra, Naghashyar, Khakzar et al. | 通过模型 diffing 与多模态特征分解，定位 MLLM 中驱动视觉理解的隐藏特征，支持事后审计与因果干预。为多模态模型可解释性提供了新工具集。 |
| [MoNo: Multiscale Optimal Transport Neural Operator for PDEs](http://arxiv.org/abs/2608.09764v1) | Yang, Wu, Fu et al. | 提出多尺度最优传输神经算子，解决一般几何 PDE 求解中可学习投影机制的信息损失问题。在科学计算与复杂工程仿真上具备良好泛化潜力。 |
| [GO-MUON: Second-Order Muon Done Right](http://arxiv.org/abs/2608.09763v1) | Che | 将 Muon 优化器与谱几何结合，用数据自适应的加权几何构造精确的更新方向，并跨优化步复用几何信息。对大规模基础模型训练的内存/收敛平衡有借鉴意义。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [MedPixel: Unified Pixel-Language Model for Medical Reasoning and Segmentation](http://arxiv.org/abs/2608.09818v1) | Yang, Shi, Chen et al. | 将医学图像分割、临床推理与区域定位整合进一个像素-语言模型，支持基于文本提示的区域级诊断。增强了读片流程的可解释性与人机交互性。 |
| [SWE-Bench ProMax: Multilingual Code Refactoring Benchmark](http://arxiv.org/abs/2608.09802v1) | Shi, Xu, Fu et al. | 在审计发现 SWE-bench 大量实例存在测试缺陷的基础上，构建了更大规模、多语言的代码重构基准，覆盖长周期跨文件任务。为新一代编码智能体评估提供更可信的测试集。 |
| [Sci-VBench: Science Video Generation Benchmark](http://arxiv.org/abs/2608.09873v1) | Zhang, Song, Fu et al. | 建立面向科学领域的知识/推理密集型视频生成基准，含 1253 个专家标注样本、覆盖 60 个学科。填补科学视频生成缺乏系统评测的空白，推动质量评估从视觉真实走向知识真实。 |
| [Financial Numerical Prediction and Allocation as Token Generation](http://arxiv.org/abs/2608.09880v1) | Ouyang, Lee | 将金融数值预测与资产配置统一建模为受约束 token 生成，使语言模型直接输出预算分配和预测目标。省去专门的回归/策略头，简化金融领域 LM 应用链路。 |

## 📈 研究趋势信号

今日投稿中浮现出三个明确信号。**第一，LLM 安全研究正由“模型权重”转向“运行环境”**：安全 harness、上下文/工具/权限等“制度性”组件开始被显式建模和演化（如 SHE、Multi-Agent AI Safety、Agentic Harnesses），安全不再只是权重属性。**第二，RLVR 与 on-policy 蒸馏的结合成为主流训练配方，但 token 级监督目标正被深度审视**：多篇工作提出“技能抽象”“输出结构匹配”“自参考教师”等替代方案，试图解决稀疏奖励和高 token 一致但全局错误的问题。**第三，评估进入“元评估”时代**：研究者不再默认 benchmark 可靠，而是主动审计测试质量（如 SWE-bench 60% 缺陷实例）、设计抗污染与更抗饱和的基准，覆盖翻译、TTS、科学视频等多模态领域。

## 🎯 值得精读

1. **Stealing Reasoning Traces from Proprietary LLM APIs**（http://arxiv.org/abs/2608.09867v1）  
   首次系统演示从加密推理块中恢复思维链，攻击成本低、影响面广。它不仅挑战商业模型对 CoT 的“隐藏式保护”，也重新引发“不可信客户端”下的隐私设计思考，安全研究者与 API 提供商都应关注。

2. **Mismatch Matters: On-Policy Distillation Beyond Token Agreement**（http://arxiv.org/abs/2608.09836v1）  
   直击当前 LLM 后训练中广泛使用的 on-policy 蒸馏，指出“高 token agreement”可能只是重复循环造成的假象。论文提出超越 token 匹配的优化目标，是对现有训练方法的重要修正。

3. **SWE-Bench ProMax**（http://arxiv.org/abs/2608.09802v1）  
   基于对 SWE-bench Verified 近 60% 实例存在测试缺陷的审计，构建了大规模、多语言、长周期的代码重构基准。编码智能体评估正快速饱和，此工作可视为下一代评测的重要候选。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*