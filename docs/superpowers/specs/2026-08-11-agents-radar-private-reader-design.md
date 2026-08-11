# Agents Radar 私人阅读站设计

## 目标

使用 Sites 创建一个仅供站点所有者访问的每日阅读站。它展示 agents-radar 自动生成的最新中文日报、历史日期和各类别全文，不重复执行抓取或模型调用。

## 已确认的边界

- 站点访问权限仅限所有者。
- 每日内容由 agents-radar 的 GitHub Actions 工作流生成并自动同步到网站。
- 日报 Markdown、`manifest.json` 和 `highlights.json` 存储在公开 GitHub fork；网站本身不公开。
- 第一版浏览完整日报及现有 highlights，不声称已经实现全站 30 条链接去重、打分后仅推荐 5 条的独立精选算法。
- 不在网站保存 DeepSeek 或 GitHub 的日报生成凭据。

## 架构

```
GitHub Actions（每日生成）
        │ 提交 digests/、manifest.json、highlights.json
        ▼
公开 GitHub fork
        │ 浏览器按需读取 JSON 与 Markdown
        ▼
Sites 私人阅读站（仅所有者）
```

站点是纯阅读客户端。首页加载远程 `manifest.json`，从中确定最新日期和可用报告；随后读取同日期的 `highlights.json` 与用户选择的 Markdown。由于数据在 GitHub Actions 每日提交后即更新，站点无需每日重新部署。

## 页面与交互

### 首页

- 顶部显示“今日雷达”、最新日期、数据更新时间与刷新操作。
- 今日重点区展示 `highlights.json` 中已有的重点；无法解析时显示“今日重点暂不可用”，仍保留全文入口。
- 报告入口按 CLI、Agents、Infra、Trending、HN、ArXiv、HF、Community 分类。

### 阅读页

- 左侧按日期切换，默认选中最新日期。
- 中间显示当前报告的 Markdown 渲染内容。
- 中文为默认语言；同类英文文件存在时提供中英切换。
- 所有来源链接在新标签页打开。

### 错误与空状态

- 远程清单获取失败时，显示明确的重试操作，不用旧内容伪装成最新。
- 某份日报不存在时，解释该数据源当日未生成，并让用户切换其他报告。
- 站点不显示 Token、API Key、GitHub Actions 日志或本地路径。

## 同步与部署

1. 用户创建自己的公开 GitHub fork，并启用原项目每日工作流；GitHub Actions Secrets 保存 DeepSeek Key。
2. 网站配置一个固定的公开数据根地址，指向该 fork 的 raw 内容。
3. 每次打开或点击刷新时，网站重新请求 `manifest.json`，因此 GitHub Actions 提交后的新日报可立即被看到。
4. Sites 只需首次创建和部署；访问策略设置为仅所有者。

## 视觉方向

网站采用“个人情报台”而非原项目的密集终端风：深蓝灰底、偏冷白文字、低饱和电蓝作为数据焦点色。阅读区留出宽阔行距，重点卡片用于快速决定是否深入全文；避免装饰性图表和无关动效。

## 验证标准

- 未登录或非授权访客不能访问站点。
- 首页能读取 fork 的最新 `manifest.json` 并切换到最新日期。
- 至少能打开中文 HN、Trending、CLI 三类日报；英文文件存在时能切换。
- 修改后的远程 manifest 在刷新页面后可见，无需重新部署 Sites。
- 页面与浏览器控制台均不出现任何密钥。

## 非目标

- 不在本阶段修改原 agents-radar 抓取与模型生成逻辑。
- 不在网站内运行 DeepSeek、GitHub API 写入或定时任务。
- 不在本阶段实现“全站 5 条推荐”算法；该能力需要单独规格与数据结构。
