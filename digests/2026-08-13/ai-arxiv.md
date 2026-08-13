# ArXiv AI 研究日报 2026-08-13

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-13 02:02 UTC

---

# ArXiv AI 研究日报（2026-08-13）

## 今日速览

今日 50 篇论文中，最突出的信号是跨语言与多语言评测的密集出现：低资源语言安全对齐、工具型智能体的策略保持、多语言文生图一致性均被系统性质疑。另一条主线是可验证性与不确定性，包括概率查询自洽性的计算理论、数学思维链形式化忠实度基准，以及注意力路径扰动作为不确定性信号。智能体方面，测试时自适应的 GUI grounding 与 agentic coding 记忆膨胀问题值得关注；同时出现了若干面向金融、医疗、低资源语音的垂直领域工作。整体上，研究正从“能否答对”转向“能否保持、能否解释、能否验证”。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Abigail Oppong, P Sam Sahil, Tadesse Destaw Belay et al. | 在多种低资源语言上检验 LLM 安全对齐的迁移效果，发现所谓“多语言安全”存在明显漏洞。对多语言部署和红队评测有直接参考价值。 |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Clemens Vetter, David Kaczér, Lucie Flek et al. | 将微调后出现的跨领域有害行为归因到预训练中的 persona 特征，检验 emergent misalignment 的机制。为安全对齐的数据归因与干预提供线索。 |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Minsoo Kim, Sungyoung Ji, Kisung Moon et al. | 提出以注意力子网络互信息衡量预测在注意力通道扰动下的脆弱性，无需额外训练即可获取不确定性信号。实验表明其比仅使用输出分布更可靠。 |
| [Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1) | Dong Qiao, Chris Ding, Jicong Fan | 将 32 个模型对 10,000 条提示的响应嵌入并映射为行为空间，量化家族/代际差异。为 LLM 评估提供超越排行榜的行为演变视角。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Test-Time Self-Evolving GUI Visual Grounding via Reflection-Guided On-Policy Self-Distillation](http://arxiv.org/abs/2608.11191v1) | Shiyu Xuan, Zechao Li | 通过反射引导的 on-policy 自蒸馏让 GUI grounding 模型在测试时持续适应新界面。避免部署后参数冻结带来的泛化瓶颈。 |
| [Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1) | Sourabrata Mukherjee, Kalika Bali, Sunayana Sitaram | 在相同任务的不同语言版本下比较工具型智能体的操作轨迹，而非仅看最终答案。发现跨语言策略保留并不稳定，提出新的 agent 一致性评测维度。 |
| [Why Does CLAUDE.md Keep Growing? Catastrophic Remembering in Agentic Coding](http://arxiv.org/abs/2608.11095v1) | Kushal Chakrabarti | 将 agentic coding 中记忆文件无限膨胀解释为“灾难性记住”：追加指令容易，但删除依据已失效的指令很困难。为 agent 长期记忆维护提出新问题。 |
| [ConRub-Med: Reinforcement Learning with Consensus Rubrics for Open-Ended Medical Question Answering](http://arxiv.org/abs/2608.10996v1) | Taojie Zhu, Yuan Xia, Tao Sun et al. | 用共识式 rubric 作为 RL 的可验证奖励，解决开放式医学问答缺少自动判分器的问题。在医疗场景下比通用 RLHF 更可控。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Orr Paradise, Oliver Richardson, Yoshua Bengio et al. | 研究条件概率查询自洽性是否可在多项式时间内验证，并给出复杂度边界。为 AI 安全中的概率诚实与审计提供理论基础。 |
| [V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1) | Alicia Larsen, Victoire Laurent, Aulia Kharis Rakhamsari et al. | 由可执行计算树生成带验证的金融推理基准，覆盖结构化数据上的多步推理。缓解金融 LLM 评估中 ground truth 昂贵且不可验证的问题。 |
| [FaithformBench: Benchmarking Faithfulness of Mathematical Chain-of-Thought Autoformalisation](http://arxiv.org/abs/2608.10916v1) | Rob Cornish, Iacopo Ghinassi, Po-Hung Yeh et al. | 提出衡量数学思维链自动形式化忠实度的基准，不依赖人工标注或 LLM judge。使“形式化是否忠实于原推理”可自动化评估。 |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | He-Yen Hsieh, H. T. Kung | 针对量化中点歧义，用条件扩散模型重建权重分布以做舍入，无需校准集即可改善量化 LLM 性能。为后训练量化提供新的生成式思路。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Changhao Xiang, Shangyu Xing, Zhen Wu et al. | 将视觉对象作为 token 插入语言序列，进行显式对象级对齐而非仅图像-文本整体对齐。减少 MLLM 中的指代歧义。 |
| [On the Limitations of Cross-Lingual Consistency in Multilingual Text-to-image Generation](http://arxiv.org/abs/2608.11002v1) | Sicheng Zhang, Zhonghao Yan, Binzhu Xie et al. | 发布 LingT2I 基准，系统测量多语言文生图模型在语义一致性和生成质量上的跨语言差距。发现非英语提示的语义保持与物体数/关系理解显著退化。 |
| [StreamFlow: Dynamic Memory Flows for Streaming Video Understanding](http://arxiv.org/abs/2608.10949v1) | Muxin Fu, Yifan Zhang, Wentao Zhang et al. | 用动态记忆流管理流式视频中的关键证据，在严格因果和有限内存下支持视频理解。不修改主干网络，适合长视频在线理解。 |

## 研究趋势信号

今日稿件呈现三个趋势：一是“跨语言一致性”成为横跨安全、智能体、多模态生成的新评估维度，说明社区不再以英文或高资源语言表现代表模型真实能力；二是“验证/自洽”方法论兴起，概率查询一致性、可执行计算树、形式化忠实度等试图给 LLM 输出提供可审计的锚点；三是可解释性与不确定性研究向动态扰动和表示稳定性延伸，例如 SAE 的集合级不稳定与注意力路径脆弱性。此外，测试时自适应、低资源语音和流式视频记忆也构成小而活跃的方向。

## 值得精读

1. **[How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1)**  
   把 AI 安全中的“概率诚实”问题转化为可验证的计算问题，且作者包括 Yoshua Bengio。对于任何依赖条件概率查询的预测器，这篇论文给出了自洽性验证的理论边界。

2. **[The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1)**  
   直接挑战 LLM 安全对齐在多语言环境中的基本假设。低资源语言安全测试是实际部署中容易被忽视的盲区，具有现实紧迫性。

3. **[Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1)**  
   提出评估工具型智能体时不应只看最终答案，而应比较动作轨迹。跨语言策略保持是一个新评测维度，对 agent 的安全性、一致性与成本控制都有启示。

---
*本日报由 [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data) 自动生成。*