// 反射 Object.defineProperty
// 里面有部分的对象的方法 放到 Reflect 功能基本一致 
// Proxy 中能代理的方法 Reflect 都可以实现
// 1) get /set  给对象设置属性
const obj = {};

//之前
//obj.name = 'BigSpinach';

Reflect.set(obj,'name','BigSpinach'); // obj.name = 'BigSpinach';

console.log(Reflect.get(obj,'name'));


// 2) has  判断有没有某个属性
// 之前的写法
console.log('a' in {a:1});
// 新的写法
console.log(Reflect.has({a:1},'a'));


// 3)defineProperty
//Vue中有用这个来冻结一些不需要设置 get/set 的对象，达到优化性能的目的
const obj = {a:1}
Object.freeze(obj); // 这个属性就能不能配置了   冻结freeze
let flag = Reflect.defineProperty(obj,'a',{
    value:100
})
console.log(flag);

// 4)getOwnPropertyDescriptor
const obj = {a:1};
console.log(Reflect.getOwnPropertyDescriptor(obj,'a'));


// 5)ownKeys
let obj = {
  a:1,
  [Symbol()]:1
};
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj));


// 6)
//Object.setPrototypeOf    相当于 xxx.__proto__
//Object.getPrototypeOf    相当于 xxx.__proto__
Reflect.setPrototypeOf 
Reflect.getPrototypeOf

// 7) 函数的apply方法 bind call apply的区别 改变this指向
const fn = function(a,b){ // apply 支持多个参数传参
  console.log(this,a,b);
}
fn.apply = function(){
  console.log('apply')
}
// 函数原型上的apply方法 让他执行
// call 的特点 1） 是改this指向 让函数执行
//fn.__proto__.apply(1,[2,3]); //  找到fn.__proto__上的apply，执行？？

// Function.prototype.apply.call(fn,1,[2,3]);
//  step1=>  call 方法立即执行，并把 Function.prototype.apply中的this改为 fn，传参 1,[2,3]
//  step2=>   Function.prototype.apply(1,[2,3])执行
Reflect.apply(fn,1,[2,3]); // 保证使用的是Function原型上的apply方法


// 8)Reflect.construct
class XXX{
  constructor(name,age){
      this.name = name
  }
}
let xxx =  Reflect.construct(XXX,['lk',27]);
console.log(xxx); // 相当于 new

// 9) Reflect.deleteProperty // delete obj.a 返回是否删除成功


// 10) Reflect.preventExtensions
let obj = {}; // 扩展不能添加属性
Reflect.preventExtensions(obj)
obj.a = 1;
console.log(Reflect.isExtensible(obj));