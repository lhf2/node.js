/*function controller(req,res){
    call('hello',req,res);
    res.end("");
}
function  call(res){
    console.log('call');
}
module.exports  =  controller;    //只支持一个函数*/

 //支持多个函数
 module.exports={
     fun2:function(res){
         console.log('fun2');
         res.write('我是fun2')
     },
     fun3:function(res){
         console.log('fun3');
         res.write('我是fun3')
     },
 }
