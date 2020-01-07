// 生成器 生成迭代器的 es6语法

// 返回值叫迭代器
function * read(){
    yield 1; //产出
    yield 2;
    yield 3
}
// iterator 迭代器
let it = read();
console.log(it.next()); // {value:1,done:false}
console.log(it.next());
console.log(it.next());
console.log(it.next()); // return unefined
console.log(it.next()); 