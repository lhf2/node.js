var  http  =  require('http');
var  file  =  require('./file');
http.createServer(function  (request,  response)  {
    response.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
    if(request.url!=="/favicon.ico"){  //清除第2此访问
        console.log('访问');
        response.write('hello,world');
        //读取文件
        //file.readfile("./test.txt");
        /*file.readfileSync("./test.txt");
        console.log(file.readfileSync("./test.txt"));*/
        //写入文件
        //file.writefile('./test1.txt','我是通过Node.js写入的内容');
        file.writeFileSync('./test1.txt','我是通过Node.js写入的内容');
        response.end('');//不写则没有http协议尾
    }
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');