// chdir  cwd()     //在哪里执行的这个文件，返回的目录就是哪里（代表的就是执行的文件）
// process.chdir('xxx/ooo/*.node')   //把执行目录手动修改为 xxx/ooo/*.node
const path = require('path');
console.log(path.resolve()); // 解析出一个绝对路径
console.log(process.cwd()); // 在哪里执行这个文件 ,目录就是哪里 代表的就是执行的文件的绝对路径
/*
  当前环境中执行 ctrl + alt + n
  C:\Users\L\Desktop\ECIF
  C:\Users\L\Desktop\ECIF
*/

/**
 命令行中执行
    PS C:\Users\L\Desktop\ECIF\02-node> node .\04-process中的其他.js
    C:\Users\L\Desktop\ECIF\02-node
    C:\Users\L\Desktop\ECIF\02-node
 */


// env 环境变量
// console.log(process.env); // 可以根据环境变量的不同 执行不同的结果
// 开发的时候 localhost  /  www.xxx.cn
// 临时的变量 export / set  => cross-env
// 放到系统的环境变量中 计算-》系统-》 环境变量

//webpack plugin的原理
let url = '';
if(process.env.NODE_ENV === 'development'){
    url = 'localhost'
}else{
    url = 'www'
}
console.log(url);
/*
  配合命令行使用
  mac下
  export  NODE_ENV=development  && node 04-process中的其他.js
  win下 ? 真不知道
  set ...
*/

//process.nextTick()
//node中的微任务 process.nextTick() 比 Promise先执行
Promise.resolve().then(()=>{
  console.log('promise.then');
});

process.nextTick(()=>{
  console.log('process.nextTick');
});

/*执行结果
  process.nextTick
  promise.then
*/