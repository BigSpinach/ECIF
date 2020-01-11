function T(){ 
    this.name=name;
    this.age=age;
}
T.prototype.sayHello =function(){
  console.log('hello');
}

let t = new T("BigSpinach",3);
console.log(t);

//---------------------
function T(name,age){ 
  this.name=name;
  this.age=age;
}
T.prototype.sayHello =function(){
console.log('hello');
}
const mockNew = (fatherClass,...args)=>{
    let obj={};
    //将fatherClass constructor中的this改为obj
    fatherClass.call(obj,...args);
    //并且将 obj.__proto__ 指向 fatherClass 的原型，从而拿到父类原型上的方法和属性
    obj.__proto__ = fatherClass.prototype;
    return obj;
 
}
let t2 = mockNew(T,'bagS',3);
console.log(t2);


//------------
//如果父类构造函数返回一个引用地址空间，实例指向这个地址
{
  function Fn(name,age){
    this.name=name;
    this.age = age;
    this.sayHi = function(){console.log('Hi')}
    return {a:1,b:2}
  }
  Fn.prototype.sayHello= function(){console.log('Hello')}
  let f = new Fn('bigS',28);
  console.log(f);//{ a: 1, b: 2 }

  const mockNew=(fatherClass,...args)=>{
    let obj={};
    let returnVal = fatherClass.call(obj,...args);
    if((typeof returnVal ==='object'&&returnVal!==null)||typeof returnVal ==='function'){
      return returnVal;
    }
    obj.__proto__ = fatherClass.prototype;
    return obj;
  }
  let f2 = mockNew(Fn,"liu",26);
  console.log(f2);

}