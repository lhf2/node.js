var http = require('http');
//var User = require('./User');
var Teacher = require('./Teacher');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(request.url!=="/favicon.ico"){//清除第2此访问
        /*user = new User(1,'李可馨',25);
        user.enter();*/
        teacher = new Teacher(1,'张艺兴',27);
        teacher.teach(response);
        response.end('');
    }
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');