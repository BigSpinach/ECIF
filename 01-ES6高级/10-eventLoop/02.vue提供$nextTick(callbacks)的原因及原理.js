
//原因：更新视图不能 数据一发生改变就立马更新，这样很耗性能

//解决：vm.nextTick(callback1);
//      vm.nextTick(callback2);
//      vm.nextTick(callback3);
//      ...
// 将 callback1 , 2, 3 放置一个数组中-------callbacks
//等到到了一定时间，清空 这个数组------pending? 循环遍历执行callbacks中的每一项


//原理：
//1） callbacks=[callback1,callback2,callback3,...]
//2） flushCallbacks()----清空数组，并执行每一项callback。
//3） 核心  
    //3.1)  promise 的处理机制------微任务
const p = Promise.resolve();
timerFunc=()=>{
  p.then(flushCallbacks)
}

    //3.2)  MutationObserver（原生对象）的处理机制------微任务

    //3.3)  setImmediate 只在ie下采用   ----宏任务

    //3.4)  定时器  ------宏任务

    
// - 微任务： promise.then ，MutationObserver，
// - 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，UI rendering。

// 浏览器的事件环 node 11 版本 表现和浏览器一致

