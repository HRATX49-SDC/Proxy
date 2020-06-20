const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const expressProxy = require('express-http-proxy');
const PORT = 5555;
const app = express();

// app.use(expressProxy('https://localhost:5000'))

// app.listen(5555, () => {
//   console.log(`Express Proxy is listening on port ${PORT}`)
// })

var proxy = httpProxy.createProxyServer({});

http.createServer(function(req,res) {
  proxy.web(req, res, {target: 'http://localhost:5000'});
}).listen(5555);

console.log("Proxy running on port 5555")