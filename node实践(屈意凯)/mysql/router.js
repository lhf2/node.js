var fs = require('fs');
var querystring = require('querystring');
var OptPool = require('./OptPool');
var optPool = new OptPool(); 
var pool = optPool.getPool(); 
var url = require('url');



module.exports={
    login:function(req,res){

        var state = '请登录';
        fs.readFile('../login/login.html', function(err, data){
            re = new RegExp('{*}','g'); // /\{name\}/g
            res.write(data.toString().replace(re, state));
            res.end('');
        });
    },
    loginData: function(req,res){
        pool.getConnection(function(err, conn){
            var canshu = url.parse(req.url,true).query;
            if(err){
                console.log('出现错误拉:'+ err)
            }else{
                conn.query('SELECT * FROM admin.user WHERE username=\''+canshu.username+'\' and password=\''+canshu.password+'\'', function(err, rs){
                    if(err){
                        console.log('报错了:'+ err);
                    }else{
                        if(rs.length == 0){
                           fs.readFile('../login/login.html', function(err, data){
                                re = new RegExp('{*}','g'); // /\{name\}/g
                                res.end(data.toString().replace(re, '帐号不存在或密码错误'));
                            }); 
                        }else{
                            fs.readFile('../login/login.html', function(err, data){
                                re = new RegExp('{*}','g'); // /\{name\}/g
                                res.end(data.toString().replace(re, '登录成功'));
                            }); 
                        }
                        
                    }

                    conn.release(); //放回连接池
                    
                })

            }
        })
    }
    ,
    zhuce:function(req,res){
        fs.readFile('zhuce.html', function(err, data){
            res.write(data);
            res.end('');
        });
    }
}

