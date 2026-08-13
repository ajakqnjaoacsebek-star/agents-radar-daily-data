# ArXiv AI Research Digest 2026-08-13

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-13 02:02 UTC

---

## Today's Highlights

Today’s arXiv digest highlights a field increasingly concerned with cross-lingual robustness, agentic reliability, and verifiable evaluation. Several papers expose safety and consistency gaps in multilingual settings, from low-resource LLM alignment to tool-using agents and text-to-image generation. Agentic systems are being scrutinized beyond final answers, with new work on action-level policy retention, memory growth in coding agents, and test-time GUI adaptation. Meanwhile, interpretability research is moving toward set-level and perturbation-based analyses, and efficiency work targets RL rollout scheduling, quantization, and probabilistic consistency checking.

## Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Abigail Oppong, P Sam Sahil, Tadesse Destaw Belay et al. | Investigates whether English-centric safety alignment generalizes across languages, focusing on low-resource languages. Finds that safety safeguards often fail, revealing a critical vulnerability in multilingual deployment. |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Minsoo Kim, Sungyoung Ji, Kisung Moon et al. | Proposes ASMI, an uncertainty measure based on whether confident predictions are fragile under perturbations to attention pathways. This complements output-distribution-based uncertainty and may improve LLM calibration and reliability. |
| [Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1) | Dong Qiao, Chris Ding, Jicong Fan et al. | Characterizes the output behavior of 32 LLMs from six families using 10,000 prompts and embedding-based behavioral mapping. Provides a way to track how model behavior changes across generations rather than relying solely on benchmark scores. |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Clemens Vetter, David Kaczér, Lucie Flek et al. | Analyzes emergent misalignment through the lens of persona features, testing whether fine-tuning on narrow tasks amplifies latent harmful directions. Contributes data-attribution evidence for a mechanistic account of alignment failures. |
| [Beyond a Bag of Features: Set-Level Instability in Sparse Autoencoders](http://arxiv.org/abs/2608.11197v1) | Nikolai Bolik, Lennart Stöpler, Artur Andrzejak et al. | Shows that sparse-autoencoder-based interpretations of category typicality can be unstable at the set level, unlike dense-representation cosine analyses. Raises important caveats for feature-level interpretability methods. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1) | Sourabrata Mukherjee, Kalika Bali, Sunayana Sitaram et al. | Evaluates whether tool-using agents take the same actions when given the same task in different languages, instead of only comparing final answers. Action-level consistency matters for cost, latency, and failure modes in multilingual agent deployment. |
| [Why Does CLAUDE.md Keep Growing? Catastrophic Remembering in Agentic Coding](http://arxiv.org/abs/2608.11095v1) | Kushal Chakrabarti | Explains the unbounded growth of agentic coding READMEs such as CLAUDE.md as a consequence of imperfect recall and asymmetric deletion costs. Names and formalizes “catastrophic remembering,” where instructions accumulate until a wholesale rewrite becomes necessary. |
| [Test-Time Self-Evolving GUI Visual Grounding via Reflection-Guided On-Policy Self-Distillation](http://arxiv.org/abs/2608.11191v1) | Shiyu Xuan, Zechao Li | Addresses GUI agents’ inability to adapt to unseen interfaces after deployment with reflection-guided on-policy self-distillation. Enables test-time self-evolution for GUI visual grounding without intrusive backbone changes. |
| [FaithformBench: Benchmarking Faithfulness of Mathematical Chain-of-Thought Autoformalisation](http://arxiv.org/abs/2608.10916v1) | Rob Cornish, Iacopo Ghinassi, Po-Hung Yeh et al. | Introduces a benchmark for measuring whether autoformalisation systems faithfully map natural-language mathematical reasoning into formal statements. Provides an alternative to expensive human-annotated ground truth for evaluating reasoning-to-proof pipelines. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Orr Paradise, Oliver Richardson, Yoshua Bengio et al. | Studies whether a probabilistic predictor’s answers to conditional-probability queries are self-consistent and verifiable in polynomial time. Formalizes consistency checking with direct relevance to AI safety and honest uncertainty reporting. |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | He-Yen Hsieh, H. T. Kung | Introduces a post-training quantization method that resolves midpoint ambiguity in round-to-nearest by training a conditional diffusion reconstructor. Improves calibration-free LLM quantization without requiring calibration data. |
| [Scheduling Mixed RL Rollouts Beyond Prefix Locality](http://arxiv.org/abs/2608.11152v1) | Zetao Hong, Song Yuan, Yuanhao Ding et al. | Extends prefix-aware scheduling for RL post-training pipelines that combine rollouts across multiple domains and feedback paradigms. Proposes control mechanisms beyond prefix locality to improve inference efficiency and load balance. |
| [Efficient Hypergradient Descent for Inverse Reinforcement Learning](http://arxiv.org/abs/2608.11052v1) | Nikita Sevriukov, Anna Barabanova, Uliana Gagarina et al. | Frames inverse reinforcement learning as bilevel optimization and proposes efficient hypergradient descent for reward recovery. Reduces the computational cost of standard RL-based inner-loop optimization. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Changhao Xiang, Shangyu Xing, Zhen Wu et al. | Proposes an object-level alignment method for multimodal LLMs by interleaving visual tokens into language, reducing referential ambiguity. Improves explicit object binding beyond global image-text pair alignment. |
| [V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1) | Alicia Larsen, Victoire Laurent, Aulia Kharis Rakhamsari et al. | Generates financial reasoning benchmarks from executable computation trees, providing verified ground truth for LLM evaluation. Addresses the gap in testing financial reasoning over structured data. |
| [ConRub-Med: Reinforcement Learning with Consensus Rubrics for Open-Ended Medical Question Answering](http://arxiv.org/abs/2608.10996v1) | Taojie Zhu, Yuan Xia, Tao Sun et al. | Uses consensus rubrics as verifiable rewards for RL on open-ended medical questions where simple outcome checking is unavailable. Improves clinical answer quality while keeping the reward signal scalable and rubric-based. |

## Research Trend Signal

Today’s submissions point to three converging trends. First, multilingual robustness is becoming a first-class evaluation target: papers test safety alignment, tool-use policies, and text-to-image generation across languages, revealing that English-centric assumptions hide large performance and safety gaps. Second, agentic systems are no longer evaluated only by final answers; action-level consistency, memory accumulation in coding agents, and unsupervised GUI adaptation are now central concerns. Third, interpretability is shifting from static representations toward set-level and perturbation-based analyses, such as sparse-autoencoder instability and attention-path fragility. On the methods side, efficiency and verifiability dominate: calibration-free quantization, RL rollout scheduling, probabilistic consistency checking, and benchmark generation from executable computation trees. Taken together, these papers suggest a maturing field focused on reliable, language-aware, and operationally grounded AI systems.

## Worth Deep Reading

1. **The Illusion of Cross-Lingual Safety in Low-Resource Languages** — This paper directly challenges a core assumption in safety alignment: that English-centric safeguards transfer across languages. Its findings have immediate practical implications for multilingual deployment and safety auditing.

2. **Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents** — A valuable shift in evaluation methodology, comparing action trajectories rather than final answers in multilingual agent settings. It exposes hidden failure modes in cost, latency, and behavior consistency.

3. **How to Verify Consistency of Probabilistic Claims** — A foundational theoretical contribution for AI safety. Formalizing polynomial-time consistency checks for probabilistic predictors could underpin future verification tools for uncertainty claims.

---
*This digest is auto-generated by [agents-radar](https://github.com/ajakqnjaoacsebek-star/agents-radar-daily-data).*