var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
   var urlParts = url.parse(req.url); 
   
   if(urlParts.pathname === "/" || urlParts.pathname === "") {
        urlParts.pathname = "/tictactoe.html";   
   }
   
   var path = __dirname + "/assets" + urlParts.pathname;
   
   fs.stat(path, function(err, stat) {
        if(err) {
            res.statusCode = 404;
            res.end();
        } else {
   
           var ttt = fs.createReadStream(path);
           ttt.pipe(res);
           console.log("File served");
               
        }
            
   });
}).listen(process.env.PORT, "0.0.0.0");

console.log("Waiting for requests");