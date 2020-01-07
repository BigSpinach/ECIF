
class Subject  {
  constructor(name){
    this.name = name,
    this.arr = [],//用于存储 被观察者对象（都有谁订阅了我，一会执行的时候根据这里的订阅者发布）
    this.state = "OK"//算是一个依据 ，当这个改变时，要通知观察者（订阅者）去做什么事
  }
  attach(obj){
    this.arr.push(obj);// 
  }
	setState(newState){
    this.state = newState;
    this.arr.forEach(item=>{
     	item.update(newState) ;//通知订阅者更新状态
    });
  }
}

class Observer {
  constructor(name){
    this.name = name
  }
  update(newsState){
    //观察者依据 被观察者 状态改变这一特征，执行对应操作
    console.log(this.name+"新状态:"+newsState);
  }
}

//TEST
let s = new Subject("Baby");
let o1 = new Observer("张三");
let o2 = new Observer("李四");

//被观察者 和 观察者 建立联系
s.attach(o1);
s.attach(o2);

//被观察者状态改变
s.setState("No");
//接下来的事就是观察者也会发生改变