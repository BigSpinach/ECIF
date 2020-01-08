//中断promise链 其实就是返回一个等待的promise
let p =  new Promise((resolve,reject)=>{
  resolve(250);
});

//
let p1 = p.then(()=>{
  console.log('p.then');
  return new Promise(()=>{},()=>{})
},err=>{
  console.log(err);
}).then(
    //这个then会等待上一个then的返回值...上一个then中反悔了一个等待的promise
    //所以这个 then就不会执行
    //即 达到了中断promise链的作用
    data=>{console.log(data);},
    err=>{console.log(err);}
  );