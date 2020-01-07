// 将类数组转化成数组
// 类数组的定义 ： 1索引 2.长度

function add() {
  // ... for of 必须要给当前对象 提供一个生成器方法

  console.log([ // ... Array.from
    ...{
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      [Symbol.iterator]: function* () {
        let index = 0;
        while (index !== this.length) {
          yield this[index++];
        }
      }
      //   [Symbol.iterator]() {
      //     let len = this.length;
      //     let index = 0;
      //     // 迭代器 是有next方法 而且方法执行后 需要返回 value,done
      //     return {
      //       next: () => {
      //         return { value: this[index++], done: index === len + 1 };
      //       }
      //     };
      //   }
    }
  ]);
}
add(1, 2, 3, 4, 5);


// function * read(){
//     try{
//         let a = yield 1;
//         console.log(a)
//         let b = yield 2;
//         console.log(b)
//         let c = yield 3;
//         console.log(c)
//     }catch(e){
//         console.log('e:'+e);
//     }
// }
// let it = read();
// console.log(it.next('xxx')) // {value:1.done:false} 第一次next参数没有任何意义
// it.throw('xxx')