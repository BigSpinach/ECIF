//  race 赛跑 哪个快 用哪个 all是所有完成才完成

//使用
let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
      reject('嗝屁了');
      resolve('ok1');
    }, 1000);
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok2');
    }, 2000);
})

Promise.race([p1,p2]).then(data=>{
  console.log(data);
},err=>{
  console.log("err:"+err);
});
// => err:嗝屁了

const isPromise = (value)=>{
  if((typeof value ==='object'&&value!==null) ||typeof value ==='function' ){
    return typeof value.then === "function";
  }
  return false;
}
//方法的实现
Promise.race = function(promises){
  //思路：循环执行 promises 中的每一个promise，谁快就采用谁的状态
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      if(!isPromise(promises[i])){
        console.log('123456');
        return promises[i];
      }
    }
    for(let i=0;i<promises.length;i++){
      if(isPromise(promises[i])){
        return promises[i].then(resolve,reject);    
      }
    }
  })
}
/*
Promise.ra_ce = function(promises) {
  promises = Array.from(promises);
  return new Promise((resolve, reject) => {
      if(promises.length===0) {
          return;
      } else {
          for(let i=0; i<promises.length; i++) {
              Promise.resolve(promises[i]).then(data => {
                  resolve(data);
                  return;
              }, err => {
                  reject(err);
                  return;
              })
          }
      }
  })
}
*/

let p1 = new Promise((resolve,reject)=>{
  setTimeout(() => {
    //reject('嗝屁了');
    resolve('ok1');
  }, 1000);
})
let p2 = new Promise((resolve,reject)=>{
  setTimeout(() => {
      resolve('ok2');
  }, 2000);
})
let p3 =250;
Promise.race([p1,p2,p3]).then(data=>{
  console.log(data);
},err=>{
  console.log("err:"+err);
});