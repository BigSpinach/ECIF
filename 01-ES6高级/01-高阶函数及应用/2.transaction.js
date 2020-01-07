//React的部分源码解读
// 事务 开始的时候 做某件事 结束的时候在做某件事
//wrappers 包装层
const perform = (anyMethod,wrappers)=>{
  //本意执行anyMethod，wrappers 是对anyMethod的包装
  wrappers.forEach(item=>{
    item.initialize();
  });
  anyMethod();
   wrappers.forEach(item=>{
    item.close();
  });
}

perform(()=>{
  console.log("原始函数执行");
},[{
  initialize(){console.log("包装开始1")},
  close(){console.log("包装结束1")}
},{
  initialize(){console.log("包装开始1")},
  close(){console.log("包装结束1")}
}]);