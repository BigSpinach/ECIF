const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) { //创建promis实例的时候，执行器函数就要立即执行
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    let resolve = (value) => {
      //执行器里的参数函数用来 控制promise实例的状态和值
      this.value = value;
      this.status = FULFILLED;

    };
    let reject = (reason) => {
      this.reason = reason;
      this.status = REJECTED;
    };
    //执行器立即执行，传递两个函数作为参数
    //executor 执行的时候，可能会报错，将错误导致代码不能往下执行
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
    

  }

  then(onFulfilled,onRejected){
    //实例通过then方法 ，根据状态的不同得到不同的结果
    if(this.status === FULFILLED){
      //表示成功， 拿到 this.value
      onFulfilled(this.value);
    }
    if(this.status === REJECTED){
      //表示失败， 拿到 this.reason
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;