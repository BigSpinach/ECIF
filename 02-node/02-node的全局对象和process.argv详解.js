//node 的全局对象 global

//在node中可以直接访问 global对象
{
  let a =1;
  global.a=250;
  console.log(a);//  1  ?   
}
//原因是： global下的属性是全局都可以使用
//      当前作用域下有  a属性，所以访问的是 当前作用域下的 a=1
//再如 
{
  global.a=250;
  console.log(a);//  250
}


//----------------------------------------


//正式
//默认声明属性时不放在global上
// node 的特点 每个文件都是一个模块， 模块外边包了一个匿名函数
// module.exports  = {}  //引用类型地址
//匿名函数的参数可以直接拿来使用  exports,module,require,__dirname , __filename
console.log(this===global);//false
console.log(this===module.exports);//true


//如何取到  global 
(function(){
  //console.log(this);
  console.log(Object.keys(global));
  /*
    [
  'global',
  'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',
  'queueMicrotask',
  'clearImmediate',
  'setImmediate',
  'a'
  ]
  //node version -13.2
  //没有 process Buffer
  */
})();
//global 中的属性叫全局属性，可以在全局进行访问
//还有  exports,module,require,__dirname , __filename 这些全局对象

//1.process----进程
console.log(process);

//1.1  process.platform  判断当前操作平台（系统） windows对应win32  mac对应darwin
console.log(process.platform);

//1.2  process.argv  接收用户传递的参数 （注：接收在命令行模式中传递的参数）
//例如  node 1.js  --port 3000 --config ggg
//拿到的就是  process.argv=[*,*,--port 3000 --config ggg]
//前两个参数分别是 node.exe 执行文件的绝对路径  和  1.js 的文件的绝对路径
console.log(process.argv);
/*
[
  'C:\\Program Files\\nodejs\\node.exe',
  'c:\\Users\\L\\Desktop\\ECIF\\02-node\\tempCodeRunnerFile.js'
]
 */

 //通常这么使用
let config = process.argv.slice(2).reduce((memo,current,index,input)=>{
  if(current.includes("--")){
    //带有 -- 的作为key  下一项作为 value
    memo[current.slice(2)] = input[index+1];
  }
  return memo;
},{});
//在命令行中 执行  node .\02-node的全局对象.js --config ggg --port 3000
console.log(config);//{ config: 'ggg', port: '3000' }

//一般管理用户传参借助 commander 这个库
//npm install commander
// 具体使用看 03-commander.js
