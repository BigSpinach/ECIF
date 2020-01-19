//浏览器的eventLoop 


//宏任务  微任务

//1) 顺序问题
// script脚本里执行  （宏任务）
setTimeout(()=>{
    console.log('time1')
    Promise.resolve().then(()=>{
        console.log('then 3');
    })
    Promise.resolve().then(()=>{
        console.log('then 4');
    })
},0)
setTimeout(() => {
    console.log('time2');
},0);
Promise.resolve().then(()=>{
    console.log('then 1');
})
Promise.resolve().then(()=>{
    console.log('then 2');
})
// 当前主栈全部执行完毕后 清空微任务 ，会取出一个宏任务 ->  执行完毕后 继续清空微任务 -> 无限循环
