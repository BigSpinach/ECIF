const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
//promise 的处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
  //直接成功
  //x promise1 return 给 promise2 的值
  //resolve reject 是 promise2 成功或者失败的回调
  //resolve(x);

  //处理x的类型，来决定 resolve 还是reject
  //方法必须写的很严谨  可以看看Promise A+
  if (promise2 === x) { // 自己等自己成功还是失败
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`));
  }

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    //判断 x是不是对象或者一个函数，来进一步确定x的类型是不是一个promise
    //console.log("测试");
    try {
      let then = x.then; //通过获取 x上的then方法的方式来进一步确定是不是 promise
      if (typeof then === "function") {      
        //x.then(()=>{},()=>{});
        /*
          变态写法
          let obj={};
          let i=0;
          Object.defineProperty(obj,"then",{
            get(){
              i++;
              if(i===2){
                throw new Error();
              }
            }
          })
        */
        then.call(x, y => { //这里的y r 这两个参数是 promise1 传递给promise2 管理的值
          //成功
          //resolve(y);
          //有可能 y 还是一个 promise
          //递归解析的方式，将 第一个promise中的resolve 中的 return的promise 一直 .then执行，直到拿到里边的value 
          resolvePromise(promise2,y,resolve,reject);
        }, r => {
          //失败         
          reject(r);
        });
      }
    } catch (e) {
      reject(e);
    }

  } else { //不是函数和对象，那就是普通值
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
      /*
      new Promise((resolve,reject)=>{
        resolve(new Promise)
      })
      */
     //resolve 传递了一个 新的promise，我们要实现递归解析，取到里边的常量
     if(value instanceof Promise){
       //如果一个promise resolve了一个新的promise，它会等待这个内部的promise执行完成
       return value.then(resolve,reject);//和 resolvePromise 作用一样
     }
      
      //状态一旦确定就不能发生改变
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        //依次执行 成功或失败的所有回调函数

        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }
    let reject = reason => {
      //reject 这里的reason 是要存储在当前promise实例上的值
      //console.log(reason);
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());

      }
    }

    //如果创建promise 实例时就出错
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }

  }

  then(onFulfilled, onRejected) {
    //then 中解决 Promise的链式调用
    let promise2 = new Promise((resolve, reject) => {
      // let x = onFulfilled(this.value);
      // resolve(x);
      if (this.status === FULFILLED) { //根据状态执行
        setTimeout(() => { //异步，解决 promise2 那不到的问题
          try {
            let x = onFulfilled(this.value);
            //resolve(x);
            //这个 x 可能是普通值 报错 或者 新的promise
            //console.log(promise2); //此时 promise2 还没有被创建，读不到，
            //解决：将这部分代码转换为异步执行
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
}
module.exports = Promise;