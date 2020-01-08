class MathHandle{
  constructor(a,b){
    //super(props);
    //私有属性
    this.a=a;
    this.b=b;
  }

  //共有属性（原型prototype上的属性和方法）
  add(){
    return this.a + this.b;
  }

};

let m = new MathHandle(1,2);
console.log(m.add());

console.log(typeof MathHandle);//"function"
console.log( MathHandle===MathHandle.prototype.constructor );//true
m.__proto__ === MathHandle.constructor;//true