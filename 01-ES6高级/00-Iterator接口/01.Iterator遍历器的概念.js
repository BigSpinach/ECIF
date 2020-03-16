//js数据结构有Map ,Set ,Array , Object 这四种数据集合
//Iterator的目的：处理这四种数据集合的机制

//它是一种机制
//供 for...of 命令使用


//Iterator 遍历的过程
/*
  1.遍历器本身是一个只针对象，开始时指向当前数据结构的起始位置
  2.第一次调用指针对象的 next 方法，指针就指向当前数据结构的第一个成员
  3.第二次调用指针对象的 next 方法，指针就指向当前数据结构的第二个成员
  ...
  4.不断地调用next方法，直到它指向数据结构的结束位置

每调用一次 next 方法，返回一个 {value:当前成员的值,done：true或false} 
*/


//mackIterator
function mackIterator(item){
  let nextIndex = 0;
  return {
    next:function(){
      return nextIndex<item.length?
      {value:item[nextIndex++],done:false}:
      {value:undefined,done:true}
    }
  }
}

let arr=['a','b','c'];
let mt = mackIterator(arr);
console.log(mt.next());//{ value: 'a', done: false }
console.log(mt.next());//{ value: 'b', done: false }
console.log(mt.next());//{ value: 'c', done: false }
console.log(mt.next());//{ value: undefined, done: true }
