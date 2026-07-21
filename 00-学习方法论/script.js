/* ============================================
 * script.js — 学习进度页面的交互逻辑
 *
 * 架构说明（数据驱动渲染）：
 *   数据（chapters 数组）是"唯一真相来源"
 *   → 用户操作改变数据 → 重新渲染受影响的 UI 部分
 *   → 数据同时保存到 localStorage
 *
 * 这种模式的好处是：你永远不用担心 UI 和数据不同步，
 * 因为 UI 只是数据的"投影"。
 * ============================================ */

// =============================================
// 第一部分：默认数据定义
// =============================================
// 这里是学习章节和任务内容，基于 fullstack-ai-agent-roadmap 真实学习路线。
// 要修改内容，改这个数组就行，不用动其他代码 —— 这就是"数据与逻辑分离"。

const defaultChapters = [
  {
    id: "ch00",
    title: "00 · 学习方法论（1周）",
    expanded: false,
    tasks: [
      { id: "ch00-t1", text: "理解学习循环：阅读 → 模仿 → 默写 → 修改 → 教别人", done: false },
      { id: "ch00-t2", text: "配置开发环境（Git, Python uv, Node nvm, VS Code）", done: false },
      { id: "ch00-t3", text: "掌握 Git 基本命令 + Conventional Commits 规范", done: false },
      { id: "ch00-t4", text: "学会使用命令行终端 + AI 辅助编程的正确姿势", done: false },
      { id: "ch00-t5", text: "【项目】搭建学习看板（HTML+CSS+JS）并部署到 GitHub Pages", done: false },
    ],
  },
  {
    id: "ch01",
    title: "01 · Python 从零到源码（10周）",
    expanded: false,
    tasks: [
      { id: "ch01-t1", text: "W1-W3：语法基础 → 数据结构 → 函数与模块 → CLI 待办应用", done: false },
      { id: "ch01-t2", text: "W4-W6：面向对象 → 装饰器/上下文 → 迭代器/生成器", done: false },
      { id: "ch01-t3", text: "W7-W9：并发异步 → Pydantic 类型系统 → 工程化与发布 PyPI", done: false },
      { id: "ch01-t4", text: "W10：阅读 CPython 源码（listobject.c / ceval.c）+ 写 2000 字博客", done: false },
      { id: "ch01-t5", text: "【项目】pyspider-cli：生产级异步爬虫工具，发布到 PyPI", done: false },
    ],
  },
  {
    id: "ch02",
    title: "02 · JavaScript 从零到源码（10周）",
    expanded: false,
    tasks: [
      { id: "ch02-t1", text: "W1-W3：语法与类型 → this 绑定 → 手写 bind → 闭包与作用域", done: false },
      { id: "ch02-t2", text: "W4-W5：原型与继承（手写 new/instanceof）→ 手写 Promise A+ 规范", done: false },
      { id: "ch02-t3", text: "W6-W8：DOM 事件委托 → 防抖节流 → ES6+ → 手写 require（循环依赖）", done: false },
      { id: "ch02-t4", text: "W9-W10：TypeScript 完整指南 → V8 引擎原理（Hidden Classes / GC）", done: false },
      { id: "ch02-t5", text: "【项目】mini-lodash（30 函数 npm 包）+ 在线代码沙箱（CodePen 克隆）", done: false },
    ],
  },
  {
    id: "ch03",
    title: "03 · HTML/CSS 现代 Web（4周）",
    expanded: false,
    tasks: [
      { id: "ch03-t1", text: "W1：语义化 HTML5 + 表单验证 + ARIA 无障碍 + SEO（WAVE 0 错误）", done: false },
      { id: "ch03-t2", text: "W2：CSS 选择器优先级 + Flexbox/Grid 布局 + 移动端适配", done: false },
      { id: "ch03-t3", text: "W3：CSS 变量/暗色模式/动画/3D 变换 + @container 容器查询", done: false },
      { id: "ch03-t4", text: "W4：Tailwind CSS + shadcn/ui + 浏览器渲染管线 + Lighthouse 95+", done: false },
      { id: "ch03-t5", text: "【项目】像素级还原 3 个真实网站（Linear / Stripe / Apple AirPods）", done: false },
    ],
  },
  {
    id: "ch04",
    title: "04 · React 前端框架（10周）",
    expanded: false,
    tasks: [
      { id: "ch04-t1", text: "W1-W3：JSX → Hooks 全集 → 自定义 Hook → Context + useReducer", done: false },
      { id: "ch04-t2", text: "W4-W6：Zustand + TanStack Query → React Router + 表单/Zod → Next.js SSR", done: false },
      { id: "ch04-t3", text: "W7-W8：测试（Vitest + RTL + Playwright）→ 性能优化（React Compiler）", done: false },
      { id: "ch04-t4", text: "W9-W10：手写 mini-react（Fiber + Hooks + Diff + Scheduler + 并发渲染）", done: false },
      { id: "ch04-t5", text: "【项目】在线协作白板（React 19 + Yjs CRDT + Konva.js + WebSocket）", done: false },
    ],
  },
  {
    id: "ch05",
    title: "05 · 后端开发 FastAPI + Node（8周）",
    expanded: false,
    tasks: [
      { id: "ch05-t1", text: "W1-W2：HTTP/REST 设计 + FastAPI 路由 + Pydantic 校验 + 依赖注入", done: false },
      { id: "ch05-t2", text: "W3-W4：JWT + OAuth2 鉴权 → WebSocket + SSE 流式推送 + 任务队列", done: false },
      { id: "ch05-t3", text: "W5-W6：Node.js + Hono 框架 → Redis 限流/缓存 + 结构化日志/监控", done: false },
      { id: "ch05-t4", text: "W7-W8：测试（pytest + AsyncClient 80% 覆盖）→ Docker + CI/CD 部署", done: false },
      { id: "ch05-t5", text: "【项目】Conduit 博客 API（FastAPI + Hono 双版本）+ 实时聊天系统", done: false },
    ],
  },
  {
    id: "ch06",
    title: "06 · 数据库与工程化（6周）",
    expanded: false,
    tasks: [
      { id: "ch06-t1", text: "W1-W2：SQL 50 题 → 索引/事务/锁/MVCC → EXPLAIN 慢查询优化（5s→50ms）", done: false },
      { id: "ch06-t2", text: "W3-W4：Redis 数据结构 + 持久化 + 哨兵/集群（实现限流/排行榜/分布式锁）", done: false },
      { id: "ch06-t3", text: "W5：SQLAlchemy 2.0 + Alembic → pgvector 向量检索 + 混合搜索 + Rerank", done: false },
      { id: "ch06-t4", text: "W6：Docker 多阶段构建 → K8s（Pod/Deployment/Service）→ Grafana 监控栈", done: false },
      { id: "ch06-t5", text: "【项目】mini-twitter：高并发微博（5 万用户/100 万推文，P95 < 100ms）", done: false },
    ],
  },
  {
    id: "ch07",
    title: "07 · AI 基础：Prompt 与 LLM（6周）",
    expanded: false,
    tasks: [
      { id: "ch07-t1", text: "W1-W2：LLM 全景（Claude/GPT/Gemini）→ Prompt 工程六原则 + CoT/ToT", done: false },
      { id: "ch07-t2", text: "W3：Function Calling / Tool Use — 手写 while-until-done 工具调用循环", done: false },
      { id: "ch07-t3", text: "W4-W5：RAG 完整实现（文档解析→分块→向量检索→Rerank→引用生成）→ 评测体系", done: false },
      { id: "ch07-t4", text: "W6：从零实现 GPT（Transformer + BPE Tokenizer + 训练管线 + KV Cache）", done: false },
      { id: "ch07-t5", text: "【项目】AskMyDocs：企业文档问答系统（多格式/混合搜索/流式引用/95%+ 准确率）", done: false },
    ],
  },
  {
    id: "ch08",
    title: "08 · AI Agent 框架与源码（12周）⭐核心",
    expanded: false,
    tasks: [
      { id: "ch08-t1", text: "W1-W2：Agent 五种模式 → 200 行纯手写 Agent（不用框架）", done: false },
      { id: "ch08-t2", text: "W3-W5：LangGraph 核心（State/Node/Edge/Checkpointer/Human-in-the-loop）→ MCP 协议 → 自建 Obsidian MCP Server", done: false },
      { id: "ch08-t3", text: "W6-W8：Claude/OpenAI Agent SDK → 多 Agent 协作（CrewAI/AutoGen）→ Computer Use 浏览器自动化", done: false },
      { id: "ch08-t4", text: "W9-W12：Agent 评测/SWE-bench → Langfuse 可观测性 → LangGraph 源码逐行注解 → 手写 mini-agent-sdk（<500行）", done: false },
      { id: "ch08-t5", text: "【项目】三选一：AutoCoder（CLI 编码 Agent）/ AgentOps（Agent SaaS 平台）/ Family CFO（家庭财务多 Agent）", done: false },
    ],
  },
  {
    id: "ch09",
    title: "09 · 综合实战 · 毕业项目（8-12周）",
    expanded: false,
    tasks: [
      { id: "ch09-t1", text: "需求发现 → 用户调研 → 竞品分析 → 产品设计文档", done: false },
      { id: "ch09-t2", text: "架构设计：技术选型 + 数据流/时序图/DB Schema/部署拓扑 + RFC 文档", done: false },
      { id: "ch09-t3", text: "MVP 开发：脚手架 → 后端+DB+鉴权 → 前端+核心功能 → AI Agent 集成", done: false },
      { id: "ch09-t4", text: "发布运营：内测（20 人）→ ProductHunt/V2EX 冷启动 → 100+ 真实用户", done: false },
      { id: "ch09-t5", text: "【目标】一个能上线、能赚钱、能写进简历的真实产品", done: false },
    ],
  },
];


// =============================================
// 第二部分：localStorage 读写（数据持久化）
// =============================================

// localStorage 的键名，用一个常量统一管理，避免各处分写字符串
const STORAGE_KEY = "learning-progress";

// 数据版本号 —— 当 defaultChapters 内容有改动时，升级版本号
// 旧版本 localStorage 数据会被自动丢弃，用新的默认数据替换
// 比如：删除了 Homebrew 任务 → 从 1 升到 2
const DATA_VERSION = 2;

/**
 * 从 localStorage 加载数据
 * 如果 localStorage 里有数据就用它，没有就用默认数据
 *
 * 为什么用 try-catch？
 *   localStorage 的 JSON.parse 可能因为数据损坏而报错，
 *   用 try-catch 兜底，出错时返回默认数据，确保页面不会白屏。
 */
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      // 兼容旧格式：旧数据没有 _version 字段，直接返回 chapters 数组本身
      // 新格式：{ chapters: [...], _version: N }
      if (Array.isArray(data)) {
        // 旧格式（无版本号），丢弃并用默认数据
        console.info("检测到旧格式数据（无版本号），使用默认数据");
        return defaultChapters;
      }
      // 版本检查：如果 localStorage 里的数据版本和当前代码版本不一致，
      // 说明数据格式有变动（比如新增/删除任务），丢弃旧数据，使用默认数据。
      if (data._version === DATA_VERSION) {
        return data.chapters;
      }
      console.info("数据版本不匹配，使用默认数据（旧版本：" + data._version + "，新版本：" + DATA_VERSION + "）");
    }
  } catch (error) {
    console.warn("读取保存的数据失败，使用默认数据：", error);
  }
  // 没有保存的数据或读取失败：返回默认数据
  return defaultChapters;
}

/**
 * 把数据保存到 localStorage
 *
 * JSON.stringify：把 JavaScript 对象转成 JSON 字符串
 * 因为 localStorage 只能存字符串，不能直接存对象
 */
function saveState(chapters) {
  try {
    // 用对象包裹数组，这样可以在同一层存放版本号
    // JSON.stringify 会忽略数组的非索引属性，所以不能直接把 _version 挂在数组上
    const data = { chapters: chapters, _version: DATA_VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("保存数据失败：", error);
  }
}

/**
 * 重置所有数据到默认状态（清除 localStorage）
 */
function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  // 重新渲染页面
  renderApp(defaultChapters);
}


// =============================================
// 第三部分：渲染引擎
// =============================================

/**
 * 主渲染函数
 * 遍历所有章节数据，生成对应的 DOM 元素并插入页面
 *
 * @param {Array} chapters - 章节数据数组
 */
function renderApp(chapters) {
  // 1. 找到页面上的容器元素
  const app = document.getElementById("app");
  if (!app) {
    console.error("找不到 #app 容器，请检查 HTML");
    return;
  }

  // 2. 清空容器（每次渲染都从零开始，避免重复内容）
  app.innerHTML = "";

  // 3. 为每个章节创建卡片，逐个追加
  chapters.forEach(function (chapter) {
    const card = createChapterCard(chapter);
    app.appendChild(card);
  });
}

/**
 * 为一个章节创建完整的 DOM 卡片结构
 *
 * 生成的 HTML 结构（伪代码示意）：
 * <div class="chapter-card open?">          ← 根据 expanded 决定是否有 .open
 *   <div class="chapter-header">            ← 可点击的标题行
 *     <span class="chapter-number">1</span>
 *     <span class="chapter-title">章节名</span>
 *     <span class="chapter-percent">0%</span>
 *     <span class="chapter-arrow">▼</span>
 *   </div>
 *   <div class="chapter-progress">
 *     <div class="chapter-progress-fill">   ← 宽度由 JS 动态设置
 *   </div>
 *   <div class="chapter-body">              ← 折叠容器
 *     <div class="task-list">
 *       <label class="task-item">           ← label 让点击文字也能勾选
 *         <input type="checkbox" class="task-checkbox">
 *         <span class="task-checkmark">     ← 自定义复选框外观
 *         <span class="task-text">任务名
 *       </label>
 *       ...更多任务
 *     </div>
 *   </div>
 * </div>
 */
function createChapterCard(chapter) {
  // ---- 创建卡片容器 ----
  const card = document.createElement("div");
  card.className = "chapter-card";
  card.dataset.chapterId = chapter.id;  // data-chapter-id，事件委托时用来定位
  // 如果之前保存了展开状态，加载时就展开
  if (chapter.expanded) {
    card.classList.add("open");
  }

  // ---- 创建标题行（可点击展开/收起）----
  const header = document.createElement("div");
  header.className = "chapter-header";

  // 序号圆圈
  const number = document.createElement("span");
  number.className = "chapter-number";
  // 从 id 中提取序号（"ch01" → "01" → "1"）
  number.textContent = String(parseInt(chapter.id.replace("ch", ""), 10));

  // 标题文字
  const title = document.createElement("span");
  title.className = "chapter-title";
  title.textContent = chapter.title;

  // 进度百分比
  const percent = document.createElement("span");
  percent.className = "chapter-percent";
  percent.textContent = calcPercent(chapter) + "%";

  // 展开箭头（▼ = 向下）
  const arrow = document.createElement("span");
  arrow.className = "chapter-arrow";
  arrow.textContent = "▼";

  // 把子元素拼到标题行里
  header.appendChild(number);
  header.appendChild(title);
  header.appendChild(percent);
  header.appendChild(arrow);

  // ---- 创建进度条 ----
  const progressBar = document.createElement("div");
  progressBar.className = "chapter-progress";

  const progressFill = document.createElement("div");
  progressFill.className = "chapter-progress-fill";
  // 设置初始宽度 = 实际进度百分比
  progressFill.style.width = calcPercent(chapter) + "%";

  progressBar.appendChild(progressFill);

  // ---- 创建任务列表（折叠区）----
  const body = document.createElement("div");
  body.className = "chapter-body";

  const taskList = document.createElement("div");
  taskList.className = "task-list";

  // 遍历任务，生成每个任务项
  chapter.tasks.forEach(function (task) {
    const taskItem = createTaskItem(chapter.id, task);
    taskList.appendChild(taskItem);
  });

  body.appendChild(taskList);

  // ---- 组装整个卡片 ----
  card.appendChild(header);
  card.appendChild(progressBar);
  card.appendChild(body);

  return card;
}

/**
 * 创建一个任务项（label 包裹的复选框 + 文字）
 *
 * @param {string} chapterId - 所属章节的 id
 * @param {Object} task - 任务对象 { id, text, done }
 */
function createTaskItem(chapterId, task) {
  // 用 <label> 包裹所有内容，点击文字也能触发复选框
  const label = document.createElement("label");
  label.className = "task-item";

  // 隐藏的原生复选框（真正负责勾选/取消）
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  // 用 data-* 属性存储章节 id 和任务 id，事件处理时从这里读取
  checkbox.dataset.chapterId = chapterId;
  checkbox.dataset.taskId = task.id;
  // 根据数据里的 done 状态设置复选框的勾选状态
  checkbox.checked = task.done;

  // 自定义复选框外观（一个 span，用 CSS 画成好看的方框）
  const checkmark = document.createElement("span");
  checkmark.className = "task-checkmark";

  // 任务描述文字
  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  // 拼装
  label.appendChild(checkbox);
  label.appendChild(checkmark);
  label.appendChild(text);

  return label;
}

/**
 * 计算某个章节的完成百分比
 *
 * 算法：已完成任务数 / 总任务数 × 100，结果取整数
 * 如果该章节没有任务（极端情况），返回 0
 */
function calcPercent(chapter) {
  if (chapter.tasks.length === 0) return 0;
  const completed = chapter.tasks.filter(function (t) {
    return t.done;
  }).length;
  return Math.round((completed / chapter.tasks.length) * 100);
}


// =============================================
// 第四部分：UI 更新（局部刷新）
// =============================================

/**
 * 更新单个章节卡片的进度条和百分比文字
 *
 * 设计思路：不重新渲染整个卡片，只更新变化的部分。
 * 这样做比全量渲染高效，也避免了折叠状态丢失的问题。
 */
function updateChapterUI(card, chapter) {
  // 更新百分比文字
  const percentEl = card.querySelector(".chapter-percent");
  if (percentEl) {
    percentEl.textContent = calcPercent(chapter) + "%";
  }

  // 更新进度条宽度
  const fillEl = card.querySelector(".chapter-progress-fill");
  if (fillEl) {
    fillEl.style.width = calcPercent(chapter) + "%";
  }
}


// =============================================
// 第五部分：事件处理（事件委托）
// =============================================

// 获取 #app 容器，在这里绑定一个统一的 click 监听器
const app = document.getElementById("app");

// 当前数据 —— 全局变量，让事件处理和渲染共享同一份数据
// 初始值从 localStorage 加载
let currentChapters = loadState();

app.addEventListener("click", function (event) {
  // event.target 是实际被点击的元素
  const target = event.target;

  // ----- 情况 1：点击了章节标题行 → 展开/收起 -----
  // closest() 方法：向上查找最近的匹配元素。
  // 即使用户点的是标题行里的箭头或百分比数字，
  // 也能通过 closest 找到所属的 .chapter-header
  const header = target.closest(".chapter-header");
  if (header) {
    // 找到对应的 .chapter-card
    const card = header.closest(".chapter-card");
    // 切换 .open class（展开 ←→ 收起）
    card.classList.toggle("open");

    // 同步更新数据里的 expanded 状态，并保存
    const chapterId = card.dataset.chapterId;
    const chapter = findChapterById(chapterId);
    if (chapter) {
      chapter.expanded = card.classList.contains("open");
      saveState(currentChapters);
    }
    return; // 处理完毕，退出
  }

  // ----- 情况 2：点击了任务复选框 → 切换完成状态 -----
  if (target.classList.contains("task-checkbox")) {
    // 从 data-* 属性中取出章节 id 和任务 id
    const chapterId = target.dataset.chapterId;
    const taskId = target.dataset.taskId;

    // 在数据中找到对应章节和任务
    const chapter = findChapterById(chapterId);
    const task = findTaskById(chapter, taskId);

    if (chapter && task) {
      // 翻转 done 状态：完成的变未完成，未完成的变完成
      task.done = target.checked;

      // 保存到 localStorage
      saveState(currentChapters);

      // 局部更新 UI（进度条 + 百分比），不重新渲染整个页面
      const card = target.closest(".chapter-card");
      updateChapterUI(card, chapter);
    }
  }
});

/**
 * 根据 id 查找章节
 */
function findChapterById(chapterId) {
  return currentChapters.find(function (ch) {
    return ch.id === chapterId;
  });
}

/**
 * 根据 id 查找任务
 */
function findTaskById(chapter, taskId) {
  if (!chapter) return null;
  return chapter.tasks.find(function (t) {
    return t.id === taskId;
  });
}


// =============================================
// 第六部分：重置按钮
// =============================================

document.getElementById("btn-reset").addEventListener("click", function () {
  // 二次确认，防止误操作
  if (confirm("确定要重置所有学习进度吗？此操作不可撤销。")) {
    // 重置数据为默认值
    currentChapters = defaultChapters.map(function (ch) {
      // 深拷贝：把默认数据复制一份，避免修改到原始 defaultChapters
      return {
        ...ch,
        tasks: ch.tasks.map(function (t) {
          return { ...t };
        }),
      };
    });
    // 清除 localStorage
    localStorage.removeItem(STORAGE_KEY);
    // 重新渲染
    renderApp(currentChapters);
  }
});


// =============================================
// 第七部分：页面初始化
// =============================================

/**
 * 应用启动入口
 *
 * 执行顺序：
 *   1. 从 localStorage 读取保存的数据（如果有的话）
 *   2. 第一次渲染整个页面
 */
function init() {
  renderApp(currentChapters);
}

// DOM 解析完成后执行初始化
// 由于 index.html 里使用了 <script defer>，
// 这里用 DOMContentLoaded 作为双重保险
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  // DOM 已经加载好了，直接初始化
  init();
}
