const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {

    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    //4. 多次执行then 方法，得到多次结果
    //当then方法在resolve或reject之前执行，也就是说resolve是一个
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      //3.状态一旦确定就不能再改变(其实就是只有是PENDING状态下才能改变)
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn=>fn()); // 发布 有可能resolve在then的后边执行,此时先将方法存放起来 ，到时候成功了 依次执行这些回调
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn=>fn()); 执行这些回调
      }
    };

    executor(resolve, reject);

  }

  then(onFulfilled, onRejected) {

    if (this.status === FULFILLED) {

      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {

      onRejected(this.reason);
    }
    //如果executor执行器函数 内是一个异步操作，那么pending状态得等到then方法执行后才能发生改变，此时，then方法中就拿不到我们想要的异步执行后的结果了
    if (this.status === PENDING) {
      //需要将resolve 和 reject 的执行函数先存起来，（存哪呢，构造函数上，每个实例都能拿的到）
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

module.exports = Promise;