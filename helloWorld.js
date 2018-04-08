var http = require('http');
//创建服务器
http.createServer(function(req,res){
    //头部声明
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(req.url!=="/favicon.ico") {  //清除第2此访问
        console.log('访问');
        res.write('hello,world');
        res.end();//不写则没有http协议尾,但写了会产生两次访问
    }
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');