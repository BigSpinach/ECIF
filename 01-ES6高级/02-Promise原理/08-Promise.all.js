//Promise.add 处理多个异步并发问题
let fs = require('fs').promises;

//全部完成才算完成，有一个失败就失败
//Promise.all 是按照顺序执行的
Promise.all([fs.readFile('./01-ES6高级/02-Promise原理/name.txt', 'utf8'), 1, 3, 4, fs.readFile('./01-ES6高级/02-Promise原理/age.txt', 'utf8'
)]).then(data=>{
  console.log(data);
})

//=>run code ...
// [ 'age.txt', 1, 3, 4, '27' ]

const isPromise = value=>{
  if((typeof value==="object"&& value!==null)||typeof value==="function"){
    return typeof value.then === "function";
  }
  return false;
}


//Promise.all
Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    let arr=[];
    let i=0;
    let processData = (index,data)=>{
      arr[index] = data;
      if(++i===promises.length){
        resolve(arr);
      }
    }

    for(let i=0;i<promises.length;i++){
      let current = promises[i];
      if(isPromise(current)){
        current.then(data=>{
          processData(i,data);
        })
      }else{
        processData(i,current);
      }

    }
  });
}