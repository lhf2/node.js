var    http    =    require('http');
function server(_listen, _call){
    http.createServer(function (request, response)    {
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        if(request.url!=="/favicon.ico"){
            _call && _call(request,response);
        }
    }).listen(_listen || 8000);
}


module.exports = server