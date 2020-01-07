const fs = require('fs');
let person = {};

e = {
  arr :[],
  on(fn){
    this.arr.push(fn);
  },
  emit(){
    this.arr.forEach(element => {
      element();
    });
  }
};

e.on(()=>{
  console.log("OK");
});

e.on(()=>{//订阅
  if(Object.keys(person).length===2){
    console.log(person);
  }
});

//订阅 是异步的（先存起来，后使用）
fs.readFile("age.txt", "utf8",(err,data)=>{
  person["age"] = data;
  //订阅
  e.emit();
});
fs.readFile("name.txt", "utf8",(err,data)=>{
  person["name"] = data;
  e.emit();
})