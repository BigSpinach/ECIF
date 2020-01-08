[TOC]

---

# 9 Class

## 9.1 Class的基础语法



### 9.1.1 claas和构造函数书写方式

> ES6的class其实可以理解为 构造函数的 语法糖

```javascript
function sayHello(a,b){
  this.a = a;
  this.b = b;
};

sayHellow.prototype.add = function(){
  return this.a+this.b;
};

//ES6 -----class
class sayHello(){
  constructor(){
    
 	}
  //注意没有 ，隔开
  //写了会报错
 	add(){
    return this.a+this.b;
  }
};

```

### 9.1.2 class与构造函数的关系

> class的类型还是function，跟构造函数保持一致
>
> 类的所有方法都定义在了 `prototype`这个属性上

```javascript
typeof sayHello;//"function"
sayHello === sayHello.prototype.constructor;//true

let s = new sayHello();
s.__proto__ === sayHello.constructor;//true
sayHello.prototype.constructor === sayHello;//true
```



> Object.assign(targetAttribute,{function1,function2,...});
>
> 批量给目标属性添加方法

```javascript
class Point(){
  constructor(){
    //...
  }
};
//批量给Point.prototype 原型上添加两个方法
Object.assign(Point.prototype,{
  		sayHello(){},
     add(){}
});
```



### 9.1.3 class与构造函数的不同之处

> class内部定义的所有方法都是`不可枚举`的
> 构造函数的原型上的方法是`可枚举`的

```javascript
class Point{
  constructor(){
    //...
  }
  toString(){
    //...
  }
}

Object.keys(Point.prototype);//[]
Object.getOwnPrototypeNames(Point.prototype);//["constructor","toString"]
```





> class的属性名可以采用表达式

```javascript
let methodName = 'getArea';
class Square{
  constructor(length){
    //...
  }
  [methodName](){
    //...
  }
}
```



> class 必须使用 `new` 命令，不能像构造函数一样可以直接当做函数使用

```javascript
class Foo{
  constructor(){
		return Object.create(null);
  }
}

Foo();//Uncaught TypeError: Class constructor Foo cannot be invoked without 'new'
   
```

## 9.2 class内部使用严格模式

> 类 和 模块 的 内部 默认 使用 严格 模式， 所以 不需要 使用 use strict 指定 运行 模式。 只要 将 代码 写在 类 或 模块 之中， 那么 就 只有 严格 模式 可用。 考虑到 未来 所有 的 代码 其实 都是 运行 在 模块 之中， 所以 ES6 实际上 已经 把 整个 语言 都 升级 到了 严格 模式 下。
>

## 9.3 constructor方法

> + `constructor`方法是类的默认方法，通过new命令生成对象实例时`自动调用`该方法
>
> + 一个类必须有`constructor`方法，如果没有显式定义，会自动添加空的constructor方法
>
> + constructor方法默认返回实例对象（即this），【我们可以指定返回另一个对象】
>
>   ```javascript
>   class Foo{
>     constructor(){
>   		return Object.create(null);
>     }
>   }
>   
>   new Foo() instanceof Foo;//false
>   ```
>
> + 类必须使用`new`命令来调用，直接使用会报错



## 9.4 类的实例对象

与ES5生成实例对象完全一致



注意：`__proto__`并不是语言本身的特性，而是各大厂商具体实现添加的私有属性，避免使用该属性
可以使用 `Object.getPrototypeOf()`这个方法来获取实例对象的原型，然后再为原型添加属性和方法



## 9.5 class 表达式

> 与函数一样，class也可以使用表达式的形式定义。

```javascript
const MyClass = class Me{
  getClassName(){
    return Me.name;
  }
};

//生成一个 MyClass 的类，（注意，Me是内部使用的类名，MyClass相当于对外接口）
```





## 9.6 不存在变量提升



## 9.7 私有方法

> ES6没有提供私有方法，只能通过变通的方式实现

【方式一：在命名上加以区别】


```javascript
class Widget{
  //公有方法
  foo(bar){
    this._bar(bar);
  }
  //私有方法
  _bar(baz){
    return this.snaf = baz;
  }
}
```

这种做法不安全，因为在类的外部依然可以使用`_bar`这个`所谓的公有`方法



【方式二：将所有的私有方法都移出模块】

> 原理：模块内所有的方法对外都是可见的

```javascript
class Widget{
  foo(baz){
    bar.call(this,baz);
    //调用这个方法，使得bar成为当前模块的私有方法
  }
  //...  
}

function bar(baz){
  return this.snaf = baz;
}
```





【方式三：使用Symbol】

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{
  //公有方法
  foo(baz){
    this[bar](baz);
  }
  //私有方法
  [bar](baz){
    return this[snaf] = baz;
  }
  
  //...
}
```

