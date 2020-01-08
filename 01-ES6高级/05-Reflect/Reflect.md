[toc]





----





# Reflect

>  **Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[处理器对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。 
>  与大多数全局对象不同，`Reflect`不是一个构造函数。你不能将其与一个[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)一起使用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。 





## 1.1概述





> Reflect 对象 与 Proxy 对象 一样， 也是 ES6 为了 操作 对象 而 提供 的 新的 API。 Reflect 对象 的 设计 目的 有 以下 几个。 
>
> 1. 将 Object 对象 的 一些 明显 属于 语言 内部 的 方法（ 比如 Object. defineProperty） 放到 Reflect 对象 上。 现阶段， 某些 方法 同时 在 Object 和 Reflect 对象 上 部署， 未来 的 新方法 将 只在 Reflect 对象 上 部署。 也就是说， 从 Reflect 对象 上 可以 获得 语言 内部 的 方法。 
> 2. 修改 某些 Object 方法 的 返回 结果， 让 其 变得 更 合理。 比如， Object. defineProperty（ obj， name， desc） 在 无法 定义 属性 时会 抛出 一个 错误， 而 Reflect. defineProperty（ obj， name， desc） 则 会 返回 false。







