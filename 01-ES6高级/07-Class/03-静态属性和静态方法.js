class Biology{
  //实例属性 （共有属性）
  //breathe="呼吸";   //ES7 实验型语法，不能使用this
  constructor(type){
    
    //实例属性，实例方法
    this.type = type;
    this.canBreathe="能呼吸";
    this.sayHello=()=>{console.log('hello')}
  }
  //原型方法 （私有方法）
  say(){
    console.log('我是Biology');
  }

  //供类 使用的属性 和方法
  static sayHaa(worlds){
    console.log('哈哈：'+worlds);
  }
  //ES6 写法
  /*static get a(){
    return 250;
  }*/
  //ES7
  static a=250;
}

let Animal = new Biology('动物');
console.log(Animal);
Animal.sayHello();

Biology.sayHaa(666);//哈哈：666
console.log(Biology.a);//250