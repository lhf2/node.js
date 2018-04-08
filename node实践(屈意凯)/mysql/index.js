var server = require('./createServer');
var url = require('url');
var router = require('./router');

server(3000, function(req, res){
	var pathname = url.parse(req.url).pathname.replace(/\//, "");
	console.log(req.url);
	try{ 
	
 	if (pathname.indexOf('.js') == -1) {   
		router[pathname](req,res);
	}
	}catch(err){                  
		res.write('页面不存在');
	}
});

