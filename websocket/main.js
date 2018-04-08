var websocketServer = require('ws').Server;
var wss = new websocketServer({
    port:3001
})
//保存所有已经连接的客户端
var sockets = [];
//建立连接
wss.on('connection',function(ws){
    sockets.push(ws);
    console.log('服务端建立成功');
    //收到消息时候
    ws.on('message',function(msg){
        console.log('服务器端接受到的消息为：'+msg);
        //发送消息（广播 好几个客户端 一个小程序 一个网页socket.html）
        for(var i=0;i<sockets.length;i++){
            sockets[i].send('响应的'+msg);
        }
    })
    //关闭连接 （防止刷新一方然后就会报错 一旦刷新了就意味着关闭了 sockets数组中就找不到了 就会报错 所以要移除）
    ws.on('close',function(){
        for(var i=0;i<sockets.length;i++){
            if(sockets[i] == this){
                sockets.splice(i,1);
                break
            }
        }
    })
})
