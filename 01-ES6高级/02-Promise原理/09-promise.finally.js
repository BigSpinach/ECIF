Promise.prototype.finally = function(callback){
  return this.then(val=>{
    return Promise.resolve(callback()).then(val=>val);
  },err=>{
    return Promise.resolve(callback()).then(err=>{throw err});
  })
}

//test 
Promise.reject().finally(()=>{
  console.log('finally');
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(111);
    }, 1000);
  })
  
}).then(null,err=>{
  console.log(err);
});