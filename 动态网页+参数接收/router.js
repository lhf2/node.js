var file = require('./file');
var url  =  require('url');
var querystring  =  require('querystring');  //post需导入
function getCall(req,res){
    function recall(data){
        res.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
        res.write(data);
        res.end('')
    }
    return recall;
}
module.exports = {
    login:function(req,res){
        //使用get接收参数(同步)
        /*var rdata = url.parse(req.url,true).query;
        console.log(rdata);
        if(rdata["email"]!=undefined){
            console.log(rdata["email"]);
            console.log(rdata["pwd"]);
        }*/
        //使用post接收参数(异步)
        var post = '';// 定义了一个post变量，用于暂存请求体的信息
        req.on('data',function(chunck){//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunck
        })
        req.on('end',function(){ //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            post  =  querystring.parse(post);
            /*console.log('email:'+post['email']+'\n');
            console.log('pwd:'+post['pwd']+'\n');
            recall = getCall(req,res);*/
            arr = ['email','pwd'];
            function recall(data){
                res.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
                dataStr = data.toString();
                for(var i =0 ;i<arr.length;i++){
                    re = new RegExp('{'+arr[i]+'}','g'); // /\{name\}/g
                    dataStr = dataStr.replace(re,post[arr[i]]);
                }
                res.write(dataStr);
                res.end('')
            }
            file.readfile('./login.html',recall);
        })
    },
    zhuce:function(req,res){
        recall = getCall(req,res);
        file.readfile('./zhuce.html',recall)
    },
    showImg:function(req,res){
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        file.readImg('./love.jpg',res)
    }
}