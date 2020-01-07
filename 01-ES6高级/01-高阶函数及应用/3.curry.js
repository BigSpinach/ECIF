//柯理化函数
//柯理化 我们可以把一个大函数拆分成很多的具体的功能
// 柯里化 : 就是将一个函数拆分成多个函数
// 判断类型 Object.prototype.toString.call

//封装一个 checkType的方法，实现类型判断
//检测 谁 的 类型 
//检测 content 的 type
const checkType = (content, type) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
}

const result = checkType("abc", "String");
console.log(result);

//上述方法 需要两个参数，后边的判断类型需要手动填写，不好，预处理一下（柯理化思想）
console.log('----------我是分隔线---------------'); {
  const checkType = (type) => {
    //预处理这个 type
    return (content) => {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
  }

  let isString = checkType('String');
  console.log(isString('abc'));
}

console.log('----------我是分隔线---------------'); {
  const checkType = (type) => {
    //预处理这个 type
    return (content) => {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
  }

  let types = ["String", "Number", "Boolean", "RegExp"];
  let utils = {};
  types.forEach(type => {
    utils['is' + type] = checkType(type);
  });

  //let isString = checkType('String');
  console.log(utils.isString('abc'));
  console.log(utils.isNumber(123));
  console.log(utils.isRegExp(/\d{0,9}/));
}


console.log('----------我是分隔线---------------'); {
  //通用 柯理化
  const curring = (fn, arr = []) => {
    //arr用来存储fn的参数
    let len = fn.length;
    
    return (...args) => {
      arr = arr.concat(...args);
      console.log(arr);
      if (arr.length < len) {
        return curring(fn, arr);
      }
      return fn(...arr);
    }
  };

  let add = (a,b,c)=>{
    return a+b+c;
  }

  let r = curring(add)(1)(2,3);
  console.log(r);
}

console.log('----------我是分隔线---------------');
{
  //通用 柯理化
  const curring = (fn, arr = []) => {
    //arr用来存储fn的参数
    let len = fn.length;
    
    return (...args) => {
      arr = arr.concat(...args);
      if (arr.length < len) {
        return curring(fn, arr);
      }
      return fn(...arr);
    }
  };

  let checkType = (type,content)=>{   
   return Object.prototype.toString.call(content) === `[object ${type}]`;
  }

  let types = ["String", "Number", "Boolean", "RegExp"];
  let utils = {};
  types.forEach(type => {
    utils['is' + type] = curring(checkType)(type);
  });

 

  //test
  let result = utils.isString("a12aa");
  console.log(result);

}