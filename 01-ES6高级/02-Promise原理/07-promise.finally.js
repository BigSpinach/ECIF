const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(x, y => {
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          reject(r);
        });
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject); //和 resolvePromise 作用一样
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }
    let reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }

        });

      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }

  catch (errCallback) {
    return this.then(null, errCallback);
  }

  //只有成功的promise
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    })
  }

  finally() {

  }
}
module.exports = Promise;


//finally的特点
//如果 finally中返回一个 promise
// 它会等待这个promise 执行完成
// 然后再 继续向后执行
{
  Promise.reject(222).finally(() => {
    console.log('finally');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(250);
      }, 5000);
    })
  }).catch(data => {
    console.log(data);
  });

  //run code ...
  //finally
  //  5s后
  //250


  Promise.reject(222).finally(() => {
    console.log('finally');
  }).catch(data => {
    console.log(data);
  });
  /*
    finally
    222
  */

  Promise.resolve(222).finally(() => {
    console.log('finally');
  }).then(data => {
    console.log(data);
  });
  /*
    finally
    222
  */
}