# 00 · 学习方法论

---

## 一、本章节完成的任务

| # | 任务 | 说明 |
|---|------|------|
| 1 | 理解学习循环 | 掌握"阅读 → 模仿 → 默写 → 修改 → 教别人"五步学习法 |
| 2 | 配置开发环境 | 安装Git、Python (uv)、Node.js (nvm)、VS Code等 |
| 3 | 掌握 Git 基本操作 | 学习 `add` / `commit` / `push` / `pull` + Conventional Commits 规范 |
| 4 | 命令行与 AI 辅助编程 | 熟悉终端基本操作，学会用 AI 工具辅助写代码的正确姿势 |
| 5 | 🛠️ **章节项目** | 搭建学习进度看板（HTML + CSS + JS），部署到 GitHub Pages |

---

## 二、章节项目：学习进度记录网页

### 项目简介

这是一个**纯前端**的学习进度看板，用于记录和追踪 AI Agent 全栈工程师学习路线中 10 个模块的学习进度。它不依赖任何框架，只使用浏览器原生三件套（HTML5 + CSS + JavaScript）构建。

### 核心功能

- **10 个学习模块卡片**，覆盖从学习方法论到 AI Agent 架构的完整路线
- **可展开/折叠**的章节详情，点击卡片标题即可展开查看具体任务清单
- **任务勾选**，每完成一个子任务就打勾，进度条实时更新
- **进度条可视化**，每个模块顶部有绿色进度条，直观展示完成百分比
- **localStorage 持久化**，刷新页面或关闭浏览器后数据不丢失，下次打开自动恢复
- **一键重置**，工具栏提供重置按钮，清空所有进度重新开始

### 架构设计

项目采用 **"数据驱动渲染"** 模式：

```
数据（chapters 数组，唯一真相来源）
    ↓ 用户操作改变数据
    ↓ 数据保存到 localStorage
    ↓ 根据新数据重新渲染 UI
UI（DOM 只是数据的"投影"）
```

这样做的好处是：**UI 永远不会和数据不同步**，因为所有界面变化都来自同一份数据。

### 使用方法

**方式一：本地打开（推荐开发时使用）**

```bash
# 在项目目录下启动一个简单的 HTTP 服务器
cd 00-学习方法论
python3 -m http.server 8080

# 浏览器访问 http://localhost:8080
```

> 为什么需要 HTTP 服务器？直接用 `file://` 协议打开虽然也能运行，但某些浏览器对 `file://` 下的 localStorage 支持有限制，用 HTTP 服务器更贴近真实部署环境。

**方式二：GitHub Pages（线上访问）**

项目已部署到 GitHub Pages，可以通过公开 URL 直接访问（需在仓库 Settings 中启用 Pages）。

### 文件说明

| 文件 | 用途 |
|------|------|
| [index.html](index.html) | 页面骨架 —— 定义 `#app` 挂载点、标题、工具栏、页脚 |
| [style.css](style.css) | 页面样式 —— 卡片布局、进度条动画、复选框定制、响应式适配 |
| [script.js](script.js) | 交互逻辑 —— 数据定义、渲染引擎、事件处理、localStorage 读写 |

---

## 三、技术栈 & 工具栈

### 前端技术

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构，使用语义化标签 + `defer` 脚本加载 |
| **CSS3** | 视觉样式，使用 CSS 自定义属性（`--color-*`）、Flexbox 布局、`transition` 动画、`@media` 响应式 |
| **JavaScript (ES6+)** | 交互逻辑，数据驱动渲染、事件委托、localStorage API、`JSON.stringify` / `JSON.parse` |

### 开发工具

| 工具 | 用途 |
|------|------|
| **VS Code** | 代码编辑器 |
| **Git** | 版本控制，遵循 Conventional Commits 规范 |
| **GitHub** | 代码托管 + GitHub Pages 静态站点部署 |
| **Python http.server** | 本地开发时快速启动 HTTP 服务器 |
| **Chrome DevTools** | 浏览器开发者工具，用于调试 HTML/CSS/JS、查看 localStorage |

### 本项目刻意不使用的技术

为了打好基础，本项目**刻意不使用**以下技术（后续章节会逐步引入）：

- ❌ 前端框架（React / Vue）—— 先用原生 JS 理解 DOM 操作的本质
- ❌ 构建工具（Vite / Webpack）—— 先感受"零构建"的原生开发体验
- ❌ CSS 框架（Tailwind / Bootstrap）—— 先手写 CSS 理解盒模型和布局原理
- ❌ Node.js 后端 —— 先聚焦纯前端，后续章节再引入后端

该项目由Claude code帮助完成