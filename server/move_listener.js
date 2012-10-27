var http = require('http');


http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<h1>hello, i know nodejitsu.</h1>');
  response.end();
}).listen(8080); // the server will listen on port 8080