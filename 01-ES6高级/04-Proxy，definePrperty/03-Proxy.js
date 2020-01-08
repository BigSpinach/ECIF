let handler = {
  
  get : function(target,name){
    if(name==='prototype'){
      return Object.prototype;
    }
    return 'Hello, '+ name;
  },
  
  apply : function(target,thisBingding,args){
    //console.dir(target,thisBingding,args);
    //console.dir(arguments);
    return args[0];
  },

  constructor : function(target,args){
    return {value:args[1]};
  }

};

var fproxy = new Proxy(function(x,y){return x+y;},handler);

fproxy(1,2);//1
//fproxy这个代理对象代理了 匿名函数 fn(x,y)  => fn(1,2);
//执行这个匿名函数会执行apply 方法
//也就是 返回 args[0]   
//args===[1,2]  //args即使代理对象的实参集合
fproxy(2222,2);//2222

new fproxy(1,2);
//执行fproxy对象中的constructor方法
//返回 {values：2};

fproxy.prototype === Object.prototype;//true
//执行代理对象的获取方法 ，name===prototype

fproxy.foo;//"Hello, foo" 
//执行代理对象的get 方法
