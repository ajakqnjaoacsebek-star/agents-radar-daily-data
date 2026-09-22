import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "config", "ai-project-catalog.json");
const statePath = path.join(root, "digests", "ai-project-state.json");
const verifiedAt = "2026-09-22";

const profile = (format, valueTypes, userFit, userActions, manualAlternative, tasteStatus = "preferred") => ({
  tasteStatus,
  format,
  valueTypes,
  userFit,
  userActions,
  manualAlternative,
});

const preferredProfiles = {
  "idea-evidence-vault": profile(
    "specific-project",
    ["practical", "personal-capability", "long-term-asset"],
    "你经常先记下点子、过一阵才决定要不要做；这个项目正好把“马上开工”改成“先查证再收藏”。",
    ["输入一个你真实想过的点子", "让系统找相似产品、真实讨论和反对证据", "自己选择继续、调整或暂缓，并把证据留下"],
    "人工搜索一次并不难，但点子多起来后很容易漏掉反面证据，也无法积累一套可回看的判断记录。",
  ),
  "niche-lead-radar": profile(
    "specific-project",
    ["economic", "earning-capability", "personal-capability", "long-term-asset"],
    "你目前最缺的不是再想一个功能，而是知道网上哪些问题反复出现、谁真的在为它困扰。",
    ["先选 GitHub Issues 和 Hacker News 两个公开来源", "收集带原链接的抱怨与求助并合并同类项", "挑一个高频问题，回到原帖人工确认是否值得继续"],
    "偶尔人工浏览足够看热闹；要跨平台连续观察并保留证据时，雷达才比人工有明显价值。",
  ),
  "friend-desktop-pet": profile(
    "specific-project",
    ["creation-experience", "personal-capability"],
    "你明确觉得桌宠方向有趣；它能让你做出一个真正在桌面上活动、可展示给朋友看的成果。",
    ["先用虚构角色做透明桌面窗口和三个动作", "加入文字对话或语音中的一种", "确认好玩后再在获得同意的前提下换成朋友形象"],
    "人工图片或聊天机器人无法产生常驻桌面的互动感，这个项目的价值在可见、可玩的完整体验。",
  ),
  "daily-life-rpg": profile(
    "specific-project",
    ["practical", "creation-experience", "personal-capability"],
    "如果普通待办让你不想打开，它可以把真实任务变成一张可玩的地图，而不是再做一个严肃清单。",
    ["挑三件本周真的要做的事", "把它们改成关卡、奖励和可跳过规则", "用七天记录自己是否真的更愿意行动"],
    "如果普通待办已经够用，就不值得做；只有游戏化确实让你更愿意行动时才继续。",
  ),
  "micro-course-product": profile(
    "specific-project",
    ["economic", "earning-capability", "personal-capability", "long-term-asset"],
    "它让你练习把自己会的一件小事做成别人愿意学、甚至愿意付费的最小内容产品。",
    ["选一个你确实做过的小技能", "用 AI 辅助做一节三十分钟以内的演示和练习", "找三个人试学，观察他们在哪一步卡住"],
    "只写一篇说明当然更快；做这个项目的价值是验证别人能否学会，以及你有没有产品化和表达能力。",
  ),
  "industry-digest-service": profile(
    "specific-project",
    ["economic", "earning-capability", "long-term-asset"],
    "它能把你已经做过的日报能力，迁移成针对某个真实人群的付费信息服务实验。",
    ["先找到一个信息分散且更新频繁的小领域", "连续两期人工核验并保留原始来源", "拿样刊问五位目标读者是否愿意持续看或付费"],
    "只做一期时人工整理更省事；只有读者需要持续更新，自动管道和长期资料库才有经济价值。",
  ),
  "vertical-chatbot-demo": profile(
    "specific-project",
    ["earning-capability", "personal-capability", "long-term-asset"],
    "这是一个能展示“我会把 AI 做成可靠产品”的作品，不只是会调用聊天接口。",
    ["选十页自己能核对的资料", "做带引用、不会就拒答的问答页", "准备二十个真实问题，记录错误并改进"],
    "把文件直接发给通用 AI 更快；项目价值在于可重复、可验收、能给别人使用的交付能力。",
  ),
  "arduino-voice-control": profile(
    "specific-project",
    ["personal-capability", "creation-experience"],
    "它能让你第一次把 AI 从屏幕里的回答变成真实灯光或动作，成果直观且能继续扩展。",
    ["准备低压 Arduino、LED 或小舵机", "先只识别开灯和关灯两条白名单指令", "加入失败拒绝和物理急停，再考虑扩展"],
    "手按开关当然更快；这个项目的价值是学习语音、代码和硬件如何形成安全闭环。",
  ),
  "language-pronunciation": profile(
    "specific-project",
    ["practical", "personal-capability", "long-term-asset"],
    "如果你有口语练习需求，它能把“听起来不对”变成可以重录和比较的具体反馈。",
    ["录制十个自己确实要练的短句", "把录音与目标音节和节奏对齐", "请真人核对反馈，再保留可信指标"],
    "偶尔查一个词用现成工具更快；长期练习并想看自己的变化时，个人工作台才值得。",
  ),
  "personal-finance-scenario": profile(
    "specific-project",
    ["practical", "personal-capability"],
    "作为学生，你可以用它比较订阅、大额购买和储蓄计划，而不是去算餐馆利润或做不相关的生意工具。",
    ["用虚构数字建立收入、固定支出和一次性支出", "比较三个方案的每月现金余量", "用手算核对后再换成自己的数字"],
    "简单预算表人工就够用；只有你想比较很多假设并看清变化来源时，AI 解释层才有价值。",
  ),
  "news-claim-map": profile(
    "specific-project",
    ["personal-capability", "long-term-asset"],
    "它训练你不被一篇摘要带着走，能把新闻中的事实、观点和原始来源分开。",
    ["选一个自己感兴趣的低争议科技事件", "收集三到五篇报道并拆出主张和引用", "画出分歧图并逐条点回原文核对"],
    "只想知道大概发生什么时直接阅读更快；遇到重要或互相矛盾的信息时，证据图才值得。",
  ),
  "public-data-neighborhood": profile(
    "specific-project",
    ["practical", "personal-capability", "creation-experience"],
    "它让你把 AI 和地图、公共数据结合，做出一个与你所在城市或校园周边有关的可见作品。",
    ["只选一个官方公开数据源", "做一张显示地点和时间变化的小地图", "核对更新时间、缺失值和是否真的对出行有用"],
    "偶尔查天气或公交用现成 App 更快；要把多个长期变化放在一起观察时才值得自建。",
  ),
  "llm-cost-simulator": profile(
    "specific-project",
    ["practical", "personal-capability", "earning-capability"],
    "你会持续做 AI 项目，提前算清每天调用多少次、一个月可能花多少钱，能避免项目做完才发现养不起。",
    ["输入一个真实项目的提示词长度和每日调用次数", "对比三种模型的月成本和失败重试成本", "设置自己能接受的预算上限并验证降级方案"],
    "少量调用可以心算；一旦有多个模型、自动任务和重试，模拟器能防止成本判断失真。",
  ),
  "prompt-regression": profile(
    "specific-project",
    ["personal-capability", "long-term-asset", "earning-capability"],
    "它能把“感觉这个提示词更好了”变成可重复比较，是你以后做可靠 AI 产品时能反复用的能力。",
    ["保存十个你真实遇到过的输入", "每次改提示词都批量运行并并排比较", "把变差的样例留下，形成自己的回归题库"],
    "只改一次提示词人工看就够；长期迭代或准备交付给别人时，回归测试才有明显价值。",
  ),
  "eval-dataset-maker": profile(
    "specific-project",
    ["personal-capability", "long-term-asset", "earning-capability"],
    "它会把你做项目时踩过的坑变成以后自动验收的题目，让能力不只停留在一次修好。",
    ["从一个已做项目中挑十个失败输入", "写出什么算合格和不合格", "让新版自动重跑并保存差异"],
    "只有两三个样例时人工检查更快；项目反复改动或要给别人用时，评测集才成为长期资产。",
  ),
  "local-vs-cloud": profile(
    "specific-project",
    ["personal-capability", "practical"],
    "它能让你亲自知道本地模型到底够不够聪明、能省多少钱，而不是只听别人争论。",
    ["选十个自己常用的真实任务", "让一个本地模型和一个云模型盲测同题", "记录质量、速度、费用和隐私差异后决定各用在哪"],
    "偶尔聊天无需测试；当你想省 API 钱或处理私人资料时，这个判断会直接影响后续项目。",
  ),
  "citation-checker": profile(
    "specific-project",
    ["practical", "personal-capability", "long-term-asset"],
    "你以后会越来越依赖 AI 找资料，这个项目能帮你检查链接是否真的支持回答，避免被看似可靠的引用骗到。",
    ["准备十条带链接的 AI 回答", "抓取原文并逐条判断支持、部分支持或不支持", "把误判样例加入回归测试"],
    "重要内容少时人工逐条看最好；资料多、需要持续核验时，自动初筛才有价值。",
  ),
  "context-compression": profile(
    "specific-project",
    ["personal-capability", "practical", "earning-capability"],
    "它能直接提高你用 Codex 做长项目的能力：用更少上下文保住关键约束，减少重复解释和 token 成本。",
    ["选一个你真实做过的长任务", "分别用原文、普通摘要和结构化交接包继续", "比较遗漏、返工和 token，再固定最好模板"],
    "短对话无需压缩；跨很多轮、换任务或换模型时，它才会明显减少返工。",
  ),
  "multi-agent-handoff": profile(
    "specific-project",
    ["personal-capability", "long-term-asset"],
    "它能训练你把一个复杂任务交给另一个 AI 继续，而不是每次换模型都从头解释。",
    ["让一个 Agent 做到任务中途", "只把目标、现状、证据和下一步写成交接包", "让另一个 Agent 接手并记录它缺了什么"],
    "单人短任务无需交接；复杂项目或多 Agent 协作时，这项能力能直接减少丢上下文。",
  ),
  "sports-form-review": profile(
    "specific-project",
    ["personal-capability", "creation-experience"],
    "如果你近期练某项运动，它能把视觉模型和真实动作结合，做出能看见差异的个人练习作品。",
    ["只选一个低风险基础动作", "录制自己与公开示范并标出关键姿态", "请懂动作的人核对模型提示，错误就停用"],
    "没有长期运动需求时不值得做；有固定动作想改善时，视频对比才比偶尔照镜子有价值。",
  ),
};

const conditionalProfiles = {
  "book-private-search": profile("specific-project", ["practical", "personal-capability", "long-term-asset"], "等你开始备考或系统读书时，它能让教材、讲义和笔记真正变成可检索资料库。", ["先导入一个章节", "用十道已知答案问题核对引用页码", "通过后再逐步加入其余资料"], "没进入长期学习阶段时直接问 Codex 更快，因此只在你开始备考或读书时推荐。", "conditional"),
  "exam-study-simulator": profile("specific-project", ["practical", "personal-capability"], "等你开始备考时，它能根据自己的资料出题并记录薄弱点。", ["只选一章资料", "生成十题并逐题核对出处", "记录错因，确认是否比普通刷题更有帮助"], "没有明确考试时没有使用场景，因此只在备考阶段推荐。", "conditional"),
  "job-application-assistant": profile("specific-project", ["practical", "earning-capability"], "等你开始集中求职时，它能整理岗位要求和简历证据，但不会替你自动投递。", ["导入一个真实岗位和自己的简历", "生成匹配证据与待补项", "由你确认后只生成投递草稿"], "零散投递人工更快，只有集中求职时才值得建立。", "conditional"),
  "ai-blender-room": profile("specific-project", ["personal-capability", "creation-experience"], "当你确实想做游戏场景、空间草图或三维作品时，它能带你进入 AI 加三维的长期方向。", ["先做墙、桌和灯三个低模物体", "让 AI 解释步骤而不是一键生成", "导出可旋转场景并决定是否继续学 Blender"], "只做摆件且没有后续用途时不值得，因此必须先有明确作品目标。", "conditional"),
  "3d-print-repair-part": profile("specific-project", ["practical", "personal-capability", "creation-experience"], "当你真有一个坏掉且买不到的非承重零件时，它能把 AI、测量、建模和打印连接起来。", ["测量真实零件尺寸", "建一个简单非承重替换件", "打印后测误差并迭代一次"], "没有真实维修需求时只是摆件，因此只在出现具体物件时推荐。", "conditional"),
};

function makeCandidate(input) {
  return {
    readerReady: true,
    tasteStatus: "preferred",
    crossDomain: false,
    largeCommercial: false,
    ...input,
  };
}

const newCandidates = [
  makeCandidate({
    candidateId: "klinko-idea-validator",
    origin: "verified-existing",
    title: "给项目点子办一场小型试营业",
    oneLine: "先找证据和致命假设，再决定要不要把一个点子做成完整项目。",
    summary: "你把一个模糊点子交进去，它不会马上替你写代码，而是先找目标人群、现有替代品、反对证据和最危险的假设，最后给出一场一到三小时可执行的小测试。",
    problemSolved: "你经常会突然想到一个项目，但不知道它是真的有用，还是只在脑海里听起来不错；直接开工又可能浪费几天。",
    howItHelps: "它把点子拆成“谁会用、现在怎么解决、什么情况证明它不值得做”，再给你一个最便宜的验证动作。你得到的是判断依据，不是漂亮但空泛的项目计划。",
    format: "specific-project",
    valueTypes: ["practical", "economic", "personal-capability", "long-term-asset"],
    userFit: "这正对应你“先把想法记下来、定期判断、确认后再让 Codex 开工”的习惯。",
    userActions: ["输入一个你最近真实想过的点子", "让系统搜索相似产品、真实抱怨和现有替代办法", "亲自核对证据，选择继续、缩小或暂缓"],
    manualAlternative: "只有一个点子时可以手工搜；点子持续增加后，这个系统能保留统一判断标准和历史证据。",
    outcome: "一个可以长期收藏的点子档案库；每个点子都有证据、致命假设、判断和下一步。",
    whyWorthwhile: "它能减少凭兴奋开工，也会训练你判断需求、竞品和可行性的能力。",
    skills: ["需求验证", "证据检索", "关键假设设计"],
    realWorldPotential: "既能筛自己的项目，也能成为以后判断可变现方向的入口。",
    feasibilityProbe: "今天拿一个真实点子，用公开资料找三个替代方案和五条用户讨论，看结论是否改变你的决定。",
    costAndRisks: ["公开讨论不等于付费意愿", "外部服务可能需要账号或 API Key", "不得把模型推测当成市场事实"],
    tags: ["practical", "learning", "commercial"],
    difficulty: { technical: 42, dependencies: 35, time: 38, costRisk: 25, uncertainty: 48, explanation: "两颗星。最难的是找到真实证据并承认点子可能不成立，页面和数据结构反而简单。" },
    source: { label: "GitHub · Klinko Startup Idea Validator", url: "https://github.com/klinkoai/klinko-startup-idea-validator", verifiedAt },
  }),
  makeCandidate({
    candidateId: "ideaforge-demand-radar",
    origin: "verified-existing",
    title: "跨平台真实需求雷达",
    oneLine: "从 GitHub、Hacker News 等公开讨论里，找出人们反复抱怨且可能愿意解决的问题。",
    summary: "系统定期收集公开求助、抱怨和现有替代方案，把同类问题合并，并保留原帖供你核对。它不直接宣布“这是商机”，而是给你一张可继续访谈和验证的线索榜。",
    problemSolved: "你想做有用或能产生经济价值的项目，但在学校很难碰到足够多的真实客户，也不知道线上哪里有需求。",
    howItHelps: "它替你持续观察多个公开平台，把重复出现的问题、受影响人群、现有解决办法和原链接放到一起。你不用每天刷平台，也不会只凭一次抱怨就开工。",
    format: "specific-project",
    valueTypes: ["economic", "earning-capability", "personal-capability", "long-term-asset"],
    userFit: "它直接补上你目前“找不到需求”的缺口，也比替某个小商家做一次低价小单更能积累长期判断能力。",
    userActions: ["第一版只接 GitHub Issues 和 Hacker News", "把同类问题聚合并展示频率、原帖和现有替代品", "每周人工挑一个线索，回原帖核验并设计访谈问题"],
    manualAlternative: "偶尔浏览可以发现零散灵感；跨平台、持续去重和回看历史时，自动雷达的价值才明显。",
    outcome: "一个每天更新的需求线索榜，能点回原文，并记录你对每条线索的判断。",
    whyWorthwhile: "你会练到公开数据获取、聚类、证据核验和需求判断；这些能力也能服务未来的产品或兼职。",
    skills: ["公开数据收集", "需求聚类", "商机验证", "证据核验"],
    realWorldPotential: "可用于寻找个人项目、内容选题、开源工具方向，成熟后也可能做成垂直情报服务。",
    feasibilityProbe: "先抓两个公开来源各五十条内容，人工检查前十名是否真是重复问题，而不是关键词巧合。",
    costAndRisks: ["遵守平台条款和频率限制", "不抓私人资料、不自动联系用户", "高频讨论不代表有人付钱"],
    tags: ["commercial", "learning", "practical"],
    difficulty: { technical: 58, dependencies: 52, time: 55, costRisk: 30, uncertainty: 62, explanation: "三颗星。抓取不算最难，难点是去重、保留证据并避免把热闹误判成需求。" },
    source: { label: "GitHub · IdeaForge", url: "https://github.com/VinGuar/IdeaForge", verifiedAt },
  }),
  makeCandidate({
    candidateId: "desktop-ai-companion-lab",
    origin: "verified-existing",
    title: "能听会说的实体感 AI 桌面伙伴",
    oneLine: "先让一个桌面角色能对话、记住少量信息，再决定是否给它接外壳、屏幕或舵机。",
    summary: "第一阶段不是马上造完整机器人，而是在 Windows 桌面上做一个会听、会说、有表情和有限记忆的角色；确认你真的喜欢这种互动后，再让它控制灯光、舵机或小屏幕。",
    problemSolved: "你对桌宠和现实中的 AI 伙伴感兴趣，但直接买硬件、做外壳和调模型太麻烦，也不知道完成后是否真的好玩。",
    howItHelps: "它把高难度目标拆成桌面角色、语音对话、记忆、实体动作四层。每做完一层就能看到结果，前一层不好玩就不用继续花钱。",
    format: "specific-project",
    valueTypes: ["creation-experience", "personal-capability", "long-term-asset"],
    userFit: "这是你明确觉得有趣的方向；成果可见、可玩，也能把语音、角色、记忆和硬件知识串起来。",
    userActions: ["先运行开源桌面伙伴并替换一个角色或动作", "加入本地或云端语音对话和三条可控记忆", "使用一周后仍想继续，再购买低压硬件做一个动作"],
    manualAlternative: "普通聊天 AI 更省事，但它没有常驻角色和物理反馈；这个项目追求的是创作体验与完整系统能力。",
    outcome: "一个能在桌面陪你说话、保留少量可删除记忆，并有机会连接真实装置的个人作品。",
    whyWorthwhile: "它能跨越桌面应用、语音、模型调用、记忆与硬件，是少数既有趣又能长期扩展的作品。",
    skills: ["桌面应用", "语音识别与合成", "记忆设计", "低压硬件控制"],
    realWorldPotential: "可做个人作品、展览互动、陪伴式提醒或开源硬件原型；不保证形成商业产品。",
    feasibilityProbe: "先不买硬件，只用现成开源项目跑通一个透明桌面角色和一次语音往返，观察自己是否愿意持续使用。",
    costAndRisks: ["完整版本投入可能较大", "真人形象和声音必须获得授权", "麦克风与记忆数据应本地优先且可删除"],
    tags: ["imagination", "learning"],
    crossDomain: true,
    difficulty: { technical: 76, dependencies: 72, time: 82, costRisk: 55, uncertainty: 68, explanation: "四颗星。软件原型可先做，真正接入稳定语音和硬件后会变成长期项目。" },
    source: { label: "GitHub · desktop-ai-companion", url: "https://github.com/moheith/desktop-ai-companion", verifiedAt },
  }),
  makeCandidate({
    candidateId: "ai-app-core-clone",
    origin: "verified-existing",
    title: "复现一个热门 AI 产品最关键的那一下",
    oneLine: "不抄完整产品，只挑它最让你惊讶的一个交互或能力，做成可运行原型。",
    summary: "你每周从 GitHub、抖音或产品榜挑一个真正在流行的 AI 项目，先弄清用户为什么喜欢，再只复现一个核心闭环，例如“给截图→生成可运行页面”。",
    problemSolved: "你想从网上热门项目获得灵感，但只看介绍学不到实现方法；完整照抄又太大、很快失去耐心。",
    howItHelps: "它强迫你先判断项目最有价值的一步，再把输入、处理和输出跑通。完成后你既理解了别人为什么火，也留下一个能继续改造的代码底座。",
    format: "direction-exploration",
    valueTypes: ["personal-capability", "creation-experience", "earning-capability", "long-term-asset"],
    userFit: "你明确希望我从网上找热门、实用、有趣的项目；这种做法让推荐不只停留在“看看”，而是转成真正学会。",
    userActions: ["挑一个近期真实项目并写出它最吸引你的一个功能", "把核心闭环限制为一次输入、一次处理、一次输出", "做完后再决定改成自己的用途还是停在学习样品"],
    manualAlternative: "只看演示最快，但不能形成实现能力；完整复制太慢，复现一个核心闭环是中间路线。",
    outcome: "一个能运行的核心功能样品，以及你对原项目价值、实现难点和可改造方向的拆解。",
    whyWorthwhile: "它能持续拓宽眼界，又把观察转成代码、产品判断和可复用模块。",
    skills: ["产品拆解", "快速原型", "界面与数据闭环", "开源许可判断"],
    realWorldPotential: "有些样品可以改成个人工具、作品集或垂直小产品，但必须避免直接复制品牌和受保护素材。",
    feasibilityProbe: "先参考 ai-app-cloner 的做法，只拿一个公开页面截图，验证能否还原一个可点击界面，而不是复制整款 App。",
    costAndRisks: ["遵守开源许可和商标边界", "不要复制付费数据或私有接口", "控制范围，否则很容易变成无底洞"],
    tags: ["learning", "practical", "imagination"],
    difficulty: { technical: 55, dependencies: 48, time: 58, costRisk: 28, uncertainty: 55, explanation: "三颗星。每次难度取决于所选功能，必须主动砍掉登录、支付和完整后台。" },
    source: { label: "GitHub · ai-app-cloner", url: "https://github.com/Birkenpapier/ai-app-cloner", verifiedAt },
  }),
  makeCandidate({
    candidateId: "first-paid-ai-microproduct",
    origin: "original-concept",
    title: "从一个已验证需求做出首个可收费小产品",
    oneLine: "先找到一个人正在花时间或钱解决的问题，再做只解决其中一步的小工具。",
    summary: "这不是让你先写一个 SaaS，而是从真实需求出发：找到现有笨办法、确认对方愿意试，再用 AI 做一个可以交付的小闭环，最后才谈收费。",
    problemSolved: "你希望 AI 项目有现实经济价值，但目前缺少明确需求和变现路径，担心做完仍找不到用户。",
    howItHelps: "它把“赚钱项目”拆成需求证据、第一位用户、人工服务、半自动工具四步。你会先证明有人真的在意，再决定是否值得产品化。",
    format: "direction-exploration",
    valueTypes: ["economic", "earning-capability", "personal-capability", "long-term-asset"],
    userFit: "它允许你先通过网络找到需求，不要求在学校里碰运气，也不要求靠三四十元的小单长期耗时间。",
    userActions: ["从需求雷达或熟悉社区挑一个有现有笨办法的问题", "联系一位愿意反馈的人，先人工完成一次并记录耗时", "只自动化最贵或最容易出错的一步，再判断是否收费"],
    manualAlternative: "第一单应该允许人工完成；如果每次都只能靠大量人工且收入覆盖不了时间，就应停止而不是强行自动化。",
    outcome: "一个有真实用户反馈、成本记录和收费判断的小产品实验；失败也会留下需求证据。",
    whyWorthwhile: "你会学习价值判断、用户沟通、范围控制、交付和定价，而不是闭门造车。",
    skills: ["需求访谈", "服务设计", "AI 自动化", "成本与定价"],
    realWorldPotential: "可能变成一次付费交付、数字产品或订阅工具，也可能在验证后明确放弃。",
    feasibilityProbe: "先不写产品；用两小时找到一个真实问题、一位愿意交流的人和一种现有解决办法。找不到就换方向。",
    costAndRisks: ["不承诺赚钱", "不得自动骚扰或绕过平台规则", "先限制预算和最长验证时间", "注意个人信息与收款合规"],
    tags: ["commercial", "learning", "practical"],
    difficulty: { technical: 48, dependencies: 50, time: 62, costRisk: 38, uncertainty: 75, explanation: "三颗星。技术不一定难，真正难的是找到真实用户、控制投入并接受需求可能不成立。" },
  }),
  makeCandidate({
    candidateId: "student-ai-portfolio",
    origin: "verified-existing",
    title: "把做过的 AI 项目变成一份能展示的学生作品集",
    oneLine: "自动读项目说明和成果链接，帮你挑出真正值得展示的内容并生成可部署网站。",
    summary: "它不是空白模板，而是先读你做过的仓库和完成记录，找出最能说明能力的项目，再写成别人看得懂的作品介绍。",
    problemSolved: "你会逐渐做很多 AI 项目，但如果成果散在文件夹和聊天记录里，以后求职、合作或回顾时很难证明自己会什么。",
    howItHelps: "它读取你授权的项目说明、截图和成果，提炼“解决了什么、你做了什么、结果如何”，再生成一个可编辑的作品集。",
    format: "specific-project",
    valueTypes: ["practical", "earning-capability", "long-term-asset", "personal-capability"],
    userFit: "你现在就在持续做项目；越早建立成果记录，未来越不需要临时回忆和包装。",
    userActions: ["先选两个真正完成的项目", "让系统从 README 和复盘中提取成果与证据", "人工删掉夸张表述后发布一个最小作品集"],
    manualAlternative: "只有一两个项目时人工写很快；项目多起来后，自动整理和持续更新才形成长期资产。",
    outcome: "一个能展示真实项目、成果证据和所学能力的个人网站。",
    whyWorthwhile: "它既能提高表达和复盘能力，也能为求职、合作或接单留下可信入口。",
    skills: ["项目叙事", "资料抽取", "网站发布", "事实核验"],
    realWorldPotential: "可直接用于学生作品展示、求职和寻找合作者。",
    feasibilityProbe: "只导入两个公开项目，检查生成介绍是否准确、是否比原 README 更容易看懂。",
    costAndRisks: ["不得编造成果或夸大贡献", "私人仓库和简历需最小权限", "公开前清除密钥和私人信息"],
    tags: ["practical", "learning"],
    difficulty: { technical: 48, dependencies: 42, time: 50, costRisk: 25, uncertainty: 40, explanation: "两颗星。技术路线成熟，主要工作是整理真实证据并把介绍写得可信。" },
    source: { label: "GitHub · ScoutFolio", url: "https://github.com/aaron-sulbaran/scoutfolio", verifiedAt },
  }),
  makeCandidate({
    candidateId: "open-source-issue-scout",
    origin: "verified-existing",
    title: "帮你挑一个真能完成的开源任务",
    oneLine: "按你的技能和可用时间筛选 GitHub 问题，避免第一次贡献就撞上大坑。",
    summary: "它读取带有 good first issue 等标签的公开任务，再按主题、技术、预计时间和描述清晰度排序，让你从一个小修复开始接触真实协作。",
    problemSolved: "你想提高真实开发能力或积累公开成果，但 GitHub 任务太多，不知道哪个适合自己、做了是否有人接收。",
    howItHelps: "它先筛掉信息不完整、长期没人维护或明显超出能力的任务，再给出需要读哪些文件、先问维护者什么和预计风险。",
    format: "specific-project",
    valueTypes: ["personal-capability", "earning-capability", "long-term-asset"],
    userFit: "这比自己凭空设计练习更接近真实问题，还能积累公开协作和作品证据。",
    userActions: ["输入你会的语言、想学方向和半天或一天时间", "核对三个候选 issue 的维护状态与验收标准", "先评论确认范围，再完成最小修复或文档改进"],
    manualAlternative: "GitHub 搜索本身不难；AI 的价值在于读 issue 和仓库背景、估算范围并解释为什么适合你。",
    outcome: "一个与你当前能力匹配的开源任务清单，以及至少一次真实贡献尝试。",
    whyWorthwhile: "你会练到读陌生项目、沟通、测试和提交，而不是只做自己设定答案的练习。",
    skills: ["开源协作", "代码阅读", "任务估算", "Pull Request"],
    realWorldPotential: "公开贡献可进入作品集，也可能带来合作机会，但不保证变现。",
    feasibilityProbe: "先不用 AI 写代码，只验证工具推荐的三个 issue 是否仍开放、范围清晰且维护者活跃。",
    costAndRisks: ["不要批量占用 issue", "先遵守仓库贡献规范", "模型对难度和工时的估计可能错误"],
    tags: ["learning", "practical"],
    difficulty: { technical: 50, dependencies: 42, time: 55, costRisk: 20, uncertainty: 52, explanation: "两到三颗星。筛选器容易做，真正挑战是完成一次陌生仓库里的真实贡献。" },
    source: { label: "GitHub · github-issue-analyzer", url: "https://github.com/AlonNaor22/github-issue-analyzer", verifiedAt },
  }),
  makeCandidate({
    candidateId: "ai-app-spec-builder",
    origin: "verified-existing",
    title: "把一句想法问成可交给 Codex 的项目说明",
    oneLine: "通过一轮有针对性的问题，把模糊想法整理成范围、页面、数据和验收标准。",
    summary: "它不会直接替你开工，而是像产品经理一样追问用户、场景、数据、边界和最小验证，最后产出一份能交给 Codex 继续讨论的项目说明。",
    problemSolved: "你有时知道大概想做什么，却在项目进行中不断补需求，导致返工或做出自己也用不上的功能。",
    howItHelps: "它围绕最不确定的地方提问，把想法变成用户场景、最小范围、不可做事项和验收例子，降低沟通遗漏。",
    format: "specific-project",
    valueTypes: ["practical", "personal-capability", "long-term-asset"],
    userFit: "你经常直接在 Codex 开始项目；这个工具能在开工前把模糊想法整理成更稳定的输入，但不会取代你和 Codex 的讨论。",
    userActions: ["输入一个仍然模糊的真实想法", "回答系统提出的十个以内关键问题", "删除不需要的功能，把结果交给 Codex 做可行性检查"],
    manualAlternative: "你直接和 Codex 讨论也能完成；只有想保存统一模板、比较多个点子时才值得做成工具。",
    outcome: "一份包含使用场景、最小范围、数据来源、风险和验收例子的项目说明。",
    whyWorthwhile: "它能训练需求表达和范围控制，也能减少后续返工。",
    skills: ["需求澄清", "范围控制", "验收设计", "结构化输出"],
    realWorldPotential: "可成为个人项目入口，也可用于帮助别人把想法整理成可开发说明。",
    feasibilityProbe: "拿一个旧项目的最初想法跑一遍，看生成问题是否能提前发现后来发生的返工。",
    costAndRisks: ["不能把完整文档误当成需求已被验证", "问题过多会让工具比直接对话更麻烦"],
    tags: ["practical", "learning"],
    difficulty: { technical: 38, dependencies: 30, time: 38, costRisk: 22, uncertainty: 42, explanation: "两颗星。结构化问答容易实现，难点是只问真正影响范围的问题。" },
    source: { label: "GitHub · AI App Idea Generator", url: "https://github.com/Enterprise-DNA-OS/ai-app-idea-generator", verifiedAt },
  }),
];

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const migrated = catalog.map((candidate) => ({
  ...candidate,
  tasteStatus: "archive",
  ...(preferredProfiles[candidate.candidateId] ?? conditionalProfiles[candidate.candidateId] ?? {}),
}));
const newIds = new Set(newCandidates.map((candidate) => candidate.candidateId));
const nextCatalog = [...migrated.filter((candidate) => !newIds.has(candidate.candidateId)), ...newCandidates];
fs.writeFileSync(catalogPath, JSON.stringify(nextCatalog, null, 2) + "\n", "utf8");

if (process.argv.includes("--catalog-only")) {
  console.log(`Migrated ${nextCatalog.length} candidates.`);
  process.exit(0);
}

function rawDifficulty(difficulty) {
  return Math.round(
    difficulty.technical * 0.3 +
      difficulty.dependencies * 0.2 +
      difficulty.time * 0.2 +
      difficulty.costRisk * 0.1 +
      difficulty.uncertainty * 0.2,
  );
}

function stars(raw) {
  return 1 + [35, 50, 65, 80].filter((threshold) => raw > threshold).length;
}

function card(candidate, date) {
  const rawScore = rawDifficulty(candidate.difficulty);
  const {
    readerReady: _readerReady,
    tasteStatus: _tasteStatus,
    tags: _tags,
    crossDomain: _crossDomain,
    largeCommercial: _largeCommercial,
    signalDate: _signalDate,
    difficulty,
    ...publicFields
  } = candidate;
  return {
    version: 1,
    date,
    ...publicFields,
    difficulty: {
      scale: 5,
      rawScore,
      currentStars: stars(rawScore),
      explanation: difficulty.explanation,
    },
    generatedBy: "curated-fallback",
  };
}

const replacements = [
  ["2026-09-18", "klinko-idea-validator"],
  ["2026-09-19", "ai-app-core-clone"],
  ["2026-09-20", "desktop-ai-companion-lab"],
  ["2026-09-21", "first-paid-ai-microproduct"],
  ["2026-09-22", "ideaforge-demand-radar"],
];
const byId = new Map(nextCatalog.map((candidate) => [candidate.candidateId, candidate]));
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const replacementDates = new Set(replacements.map(([date]) => date));
state.recent = state.recent.filter((entry) => !replacementDates.has(entry.date));

for (const [date, candidateId] of replacements) {
  const candidate = byId.get(candidateId);
  if (!candidate) throw new Error(`Missing replacement candidate: ${candidateId}`);
  const output = card(candidate, date);
  const outputPath = path.join(root, "digests", date, "daily-ai-project.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");
  state.recent.push({
    candidateId,
    date,
    tags: candidate.tags,
    crossDomain: candidate.crossDomain,
    largeCommercial: candidate.largeCommercial,
    stars: output.difficulty.currentStars,
  });
}

state.recent.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n", "utf8");

console.log(`Migrated ${nextCatalog.length} candidates and replaced ${replacements.length} daily cards.`);
