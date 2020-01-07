// 高阶函数
// 一个函数的参数 是一个函数 （回调）
// 一个函数 返回一个函数 (拆分函数)

//目的：把函数的核心逻辑提取出来，在函数的外边再增加新的功能

Function.prototype.before = function(beforeFn){
  return (...args)=>{
    beforeFn();
    this(...args);//this指的是谁调用的before这个方法
  }
};

//AOP  切片函数 装饰函数
//已有核心函数
const say = (...args)=>{
  console.log("核心功能",args);
};

//包装函数
const newSay = say.before(()=>{
  console.log("装饰层");
});


//执行
newSay();
//newSay(1,2,3);
