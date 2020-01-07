const fs = require('fs').promises;
// async + await 其实是 generator + co的语法糖
async function  read(){ // async函数返回的是promise
    let r = await Promise.all([p1,p2])
    try{
        let content =  await fs.readFile('./name1.txt','utf8'); // age.txt
        let age =  await fs.readFile(content,'utf8'); // 10
        let xx = await {age:age + 10}
        return xx;
    }catch(e){
        console.log(e);
    }
}
read().then(data=>{
    console.log(data);
},err=>{
    console.log(err);
})