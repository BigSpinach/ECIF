//浅拷贝
//Object.assign(target, ...sources)
//方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
let obj={
  a:1,
  b:2,
  //c:{name:"c",age:666}
}
let copy_obj = Object.assign(obj);
console.log(copy_obj);//=>  { a: 1, b: 2 }
copy_obj.a=250;
//copy_obj.c.age=250;
console.log(copy_obj);//=>  { a: 250, b: 2 }
//弊端  
console.log(obj);//=>  { a: 250, b: 2 }

//Object.assign(obj1,obj2);
{
  let obj1 = "xxx";
  let obj2 = {a:2,b:2};
  let return_assign = Object.assign(obj1,obj2);
  console.log(return_assign);//{a: 2, b: 2}
  console.log(obj1);//{a: 2, b: 2}
  console.log(obj2);//{a: 2, b: 2}
  console.log(obj1===return_assign);//true
  console.log(obj2===return_assign);//false
}








//深拷贝
//数据类型判断的方式
//1. instanceof
//2. constructor
//3. Object.prototype.toString.call()
//4. typeof

/*
const deepClone =(value)=>{
  if(value == null) return value; // 排除掉null 和undefine 的情况
  if(typeof value !== 'object') return value; // 这里包含了函数类型
  if(value instanceof RegExp) return new RegExp(value);
  if(value instanceof Date) return new Date(value);
  // .....
  // 拷贝的人可能是一个对象 或者是一个数组 (循环)  for in 
  let instance = new value.constructor;

  for(let key in value){
    if(value.hasOwnProperty(key)){
      instance[key] = deepClone(value[key]);//这样写存在死循环
      //当 拷贝的 value 是自己的时候
      // let obj = {};
      // obj.name = boj;
      // deepClone(obj);//死循环了
      
    }
  }
  return instance;
}

let obj =123 ;
deepClone(obj);
*/

//使用WeakMap 弱引用的数据类型来解决  引用类型数据一直被引用的问题
const deepClone=(value,hash=new WeakMap)=>{
  if(value==null) return value;
  if(typeof value !== "object") return value;
  if(value instanceof RegExp) return new RegExp(value);
  if(value instanceof Date) return new Date(value);
  //...
  let instance = new value.constructor;
  //value是object或者函数
  //（拷贝不处理函数）
  if(hash.has(value)){
    return hash.get(value);
  }
  hash.set(value,instance);


  for(let key in value){
    if(value.hasOwnProperty(key)){
      instance[key] = deepClone(value[key],hash);
    }
  }
  return instance;
}

let obj = {a:1};
obj.b = obj;
console.log(deepClone(obj));

