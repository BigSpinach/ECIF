const after = (times, fn) => {
  // after可以生成新的函数 等待函数执行次数达到我的预期时执行
  return () => {
    if (--times === 0) {
      fn();
    }
  }
};
let newAfter = after(3, () => {
  console.log("三次后调用");
});
newAfter();
newAfter();
newAfter();
// lodash after

// 并发的问题  发布订阅 观察者模式


//-------------------------------------
//真实场景：游客只能下载3次，超过3次下载失效
const isOK = (times, fn) => {
  return () => {
    if (--times >= 0) {
      fn();
    }else{
      //fn = null;
      //直接清空太暴力
      console.log('续费继续下载');
    }
  }
}

const down = () => {
  console.log('download OK');
}

const newDown = isOK(3, down);
newDown();
newDown();
newDown();
newDown();//
newDown();

