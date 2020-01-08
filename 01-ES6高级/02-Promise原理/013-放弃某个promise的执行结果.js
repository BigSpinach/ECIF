//放弃某个promise的执行结果

//现象：有一个promise1 ，此时 不想要promise1 的结果了
//思路：
//    借助 p = Promise.race([p1,p2])
//        只要将p2 的reject 暴露给p
//            p2 返回一个 reject
//            p.abort  = p2 的 reject
//    外层使用 p.abort 其实就是直接拿到了p2 的reject
//    从而达到 不要p1 的执行结果的目的

//一句话 ：使用 p2 的状态  从而抛弃掉p1的状态 
function wrap(p1){
    let fail = null;
    let p2 = new Promise((resolve,reject)=>{
        fail = reject; // 先将p2失败的方法暴露出来 
    });
    let p = Promise.race([p2,p1]); // race方法返回的也是一个promise
    p.abort = fail;
    return p
    
}
let p = wrap(new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok');
    }, 3000);
}))
p.abort('error');
p.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});