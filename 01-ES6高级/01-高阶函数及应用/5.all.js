//目的： 读取数据node是异步操作，我们需要等同步代码都执行完毕后再执行异步代码
const fs = require('fs');
let person = {};
//并发问题： 我们不能确保 node读取的两个文件是什么时候完成的，可能完成一个，也可能两个


//实用计数器的方式解决并发
/*
let index=0;
function  out() {
  if(index===2){
    console.log(person);
  }
}

fs.readFile('name.txt', 'utf8', (err, data) => {
  person['name'] = data;
  //index++;
  //out();
});


fs.readFile('age.txt','utf8',(err,data)=>{
  person['age'] = data;
  //index++;
  //out();
}); 

*/


//使用高阶函数解决并发

const after = (times,fn) => ()=> --times === 0 && fn();
/*
const after = (times ,fn)=>{
  return ()=>{
    if(--times===0){
      fn();
    }
  }
}
*/

let times = 2;
const newAfter = after(times,()=>{
  console.log(person);
})


fs.readFile('name.txt', 'utf8', (err, data) => {
  person['name'] = data;
  newAfter();
});


fs.readFile('age.txt','utf8',(err,data)=>{
  person['age'] = data;
  newAfter();
}); 
