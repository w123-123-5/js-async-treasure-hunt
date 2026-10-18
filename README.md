# 寻宝奇旅 · JavaScript 异步实验

实验二：JavaScript 异步之寻宝。

- `index.html` —— 寻宝动画展示页：藏宝图路线、逐站动画、探险日志、守卫猜拳互动、宝箱庆典。
- `treasure-promise.js` —— 原题的 Promise 链版本。
- `treasure-async.js` —— 用 async/await 重写后的版本，新增「迷雾森林」「急流古渡」「守卫猜拳」等异步情节，Node 下直接运行：`node treasure-async.js`。

知识点：每个寻宝环节都是一个 Promise；主线程用 async/await 顺序编排；try/catch 处理守卫分支与失败结局。
