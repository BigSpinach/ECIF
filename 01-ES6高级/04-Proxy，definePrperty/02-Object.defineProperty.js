//----------------ES5--------------------
{
  let obj={
    _a:"",
    get a(){
      return this._a;
    },
    set a(val){
      this._a=val
    }
  }
  obj.a = 250;
  console.log(obj.a);
 
}

// vue中数据劫持 给每个对象都添加一个 getter和setter 当值变化可以 可以实现更新视图的功能

//-----------Object.defineProperty(target,attrs,value)------------------
{
  let obj = {};
  let val = '';
  Object.defineProperty(obj,'a',{
    //configurable:false,
    enumerable:true,// for in 原型上的方法
    //writable:false,
    get(){
      return val;
    },
    set(value){
      val = value;
    }
  });
  //delete obj.a;
  console.log(obj); 
}

//---------Vue 源码

  function observer(obj){
    if(typeof obj !=="object" || obj==null) return;

    for(let key in obj){
      defineProperty(obj,key,obj[key]);
    }

  };

  function defineProperty(obj,key,value){
    //这个函数执行会形成闭包，主要用于保存 value值便于后边操作
    observer(value);//value=obj[key]   如果value是对象,递归
    Object.defineProperty(obj,key,{
      get(){
        return value;
      },
      set(val){
        //数据改变，更新视图
        updateView();
        value=val;  
      }
    })
  };
  updateView=()=>{
    console.log("update");
  }

  //TEST
  let obj = {a:1,b:2};
  observer(obj);
  obj.a = 250;
  console.log(obj.a); 
