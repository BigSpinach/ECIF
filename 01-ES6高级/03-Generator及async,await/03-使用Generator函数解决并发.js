const fs = require('fs').promises;
function * read(){
   let content =  yield fs.readFile('./name.txt','utf8'); // age.txt
   let age =  yield fs.readFile(content,'utf8'); // 10
   let xx = yield {age:age + 10}
   return xx;//么有任何意义
}
function co(it){
    return new Promise((resolve,reject)=>{
        // 异步迭代需要先提供一个next方法
        function next(data){
            let {value,done} = it.next(data);
            if(!done){
                Promise.resolve(value).then(data=>{
                    next(data);
                },err=>{
                    reject(err);
                })
            }else{
                resolve(value);
            }
        }
        next();
    })
}
// let co = require('co');
co(read()).then(data=>{
    console.log(data);
});

//原始读取数据
// let it = read();
// it.next().value.then(data=>{
//     it.next(data).value.then(data=>{
//         let r = it.next(data);
//         console.log(r.value);
//     })
// })


