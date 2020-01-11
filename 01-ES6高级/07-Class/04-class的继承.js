class Animals{
    type = '动物'; // 声明到实例上
    get a(){ // Object.defineProperty(Animal.protoype,a)
        return 1; // Animal.prototype.a = 1;
    }
    say(){ // 放到了原型上 // Animal.prototype.say
        console.log(this);
    }
    // 静态属性就是定义到类上的属性 es6中只有静态方法
    static get flag(){ // es6的静态属性
        return  '动物'
    }
}

//继承
class Tiger extends Animals{
  constructor(name){
    super(name);//调用super相当于 Animal.call(tiger,name);
    //super 指代父类
  }
  say(){
    super.say();//super 指 父类
  }
  static getAnimal(){
    console.log(super.flag);//super指Animals.prototype
  }
}

let t = new Tiger('小老虎');
console.log(t);
t.say();
t.getAnimal();

