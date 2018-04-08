var http = require('http');
var util = require('util');
http.createServer(function (req, res) {


    console.log('Request received: ');
    util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url


    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });
    res.end('callback(\'{\"msg\": \"我要一个女朋友\"}\')');


}).listen(3000,'127.0.0.1');
console.log('Server running on port http://127.0.0.1:3000/');