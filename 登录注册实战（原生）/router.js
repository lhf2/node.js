var file = require('./file');
var url  =  require('url');
var querystring  =  require('querystring');  //post需导入
var OptPool = require('./OptPool');
var optPool = new OptPool();
var pool = optPool.getPool();
module.exports = {
    login:function(req,res){
        //使用post接收参数(异步)
        var post = '';// 定义了一个post变量，用于暂存请求体的信息
        req.on('data',function(chunck){//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunck
        })
        req.on('end',function(){ //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            post  =  querystring.parse(post);
            function recall(data){
                res.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
                dataStr = data.toString();
                //执行SQL语句
                pool.getConnection(function(err,conn){
                    //查询
                    conn.query('SELECT * from user where uname=? and pwd=?',[post.email,post.pwd], function(err, rs) {
                        if (err) {
                            console.log('登录失败');
                            return;
                        }
                        if(rs.length>0){//查询到数据了
                            var output ='登录成功'
                        }else{//未查询到数据
                            var output ='用户名或密码错误'
                        }
                        var re = new RegExp('{*}','g'); // /\{name\}/g
                        res.end(dataStr.replace(re,output));
                        conn.release(); //放回连接池
                    });
                });
            }
            file.readfile('./login.html',recall);
        })
    },
    zhuce:function(req,res){
        //使用post接收参数(异步)
        var post = '';// 定义了一个post变量，用于暂存请求体的信息
        req.on('data',function(chunck){//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunck
        })
        req.on('end',function(){ //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            post  =  querystring.parse(post);
            function recall(data){
                res.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
                dataStr = data.toString();
                //执行SQL语句
                pool.getConnection(function(err,conn){
                    //查询
                    conn.query('insert into user (uname,pwd) values(?,?)',[post.email,post.pwd], function(err, rs) {
                        if (err) {
                            console.log('注册失败');
                            return;
                        }
                        var re = new RegExp('{*}','g'); // /\{name\}/g
                        res.end(dataStr.replace(re,'注册成功'));
                        conn.release(); //放回连接池
                    });
                });
                res.write(dataStr);
                res.end('')
            }
            file.readfile('./zhuce.html',recall);
        })
    }
}