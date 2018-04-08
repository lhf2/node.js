var  fs=  require('fs');
module.exports={
    readfile:function(path,recall){          //异步执行
        fs.readFile(path,function(err,data){
            if(err){
                console.log(err);
            }else{
                recall(data);
            }
        });
    },
    readfileSync:function(path){      //同步读取
        var  data  =  fs.readFileSync(path,'utf-8');
        return  data;
    },
    writefile:function(path,data){    //异步方式
        fs.writeFile(path,  data,  function  (err)  {
            if  (err)  {
                throw  err;
            }
            console.log('It\'s  saved!');  //文件被保存
        });
    },
    writeFileSync:function(path,data){  //同步方式
        fs.writeFileSync(path,  data);
    },
    readImg:function(path,res){
        fs.readFile(path,'binary',function(err,  file)  {
            if  (err)  {
                console.log(err);
                return;
            }else{
                //res.writeHead(200,  {'Content-Type':'image/jpeg'});
                res.write(file,'binary');
                res.end();
            }
        });
    }
}