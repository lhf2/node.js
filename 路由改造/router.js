var file = require('./file');
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
        recall = getCall(req,res);
        file.readfile('./login.html',recall)
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