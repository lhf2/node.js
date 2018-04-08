var OptPool = require('./OptPool');
var optPool = new OptPool(); 
var pool = optPool.getPool(); 

pool.getConnection(function(err, conn){
    if(err){
        console.log('出现错误拉:'+ err)
    }else{
        var my = ['aaa','bbb'];
        conn.query('INSERT INTO admin.user(username, password) VALUES(?, ?)',my, function(err){
            if(err){
                console.log('报错了:'+ err);
            }
        });

        conn.query('SELECT * FROM admin.user ', function(err, rs){
            if(err){
                console.log('报错了:'+ err);
            }else{
                console.log(rs);
            }
            conn.release(); //放回连接池
        });
    }
});





























//执行SQL语句 
  /*pool.getConnection(function(err,conn){ 
  
    //----插入 
    var userAddSql = 'insert into user (uname,pwd) values(?,?)'; 
    var param = ['eee','eee'];
    conn.query(userAddSql,param,function(err,rs){
        if(err){ 
            console.log('insert err:',err.message); 
            return; 
        } 
        console.log('insert success'); 
        //conn.release(); //放回连接池
    })
    //查询 
    conn.query('SELECT * from user', function(err, rs) { 
        if (err) { 
            console.log('[query] - :'+err); 
            return; 
        }   
        for(var i=0;i<rs.length;i++){
            console.log(rs[i].uname); 
        }
        conn.release(); //放回连接池
    });

});
 */