"use strict";

var express = require('express');

var path = require('path');

var httpProxy = require('http-proxy');

var PORT = process.env.PORT || 5002;
var app = express();
var proxy = httpProxy.createProxyServer({});
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, 'public'))); //routes

app.get('/reccomended*', function (req, res) {
  console.log('Redirecting to reccomended service');
  proxy.web(req, res, {
    target: 'http://reccomended-featuredserver-dev.us-east-2.elasticbeanstalk.com/'
  });
});
app.get('/main', function (req, res) {
  console.log('redirecting to mainImage server');
  proxy.web(req, res, {
    target: "http://purrgetmainitemdisplay-env.eba-upicdvwk.us-east-2.elasticbeanstalk.com/"
  });
}); //listen

app.listen(PORT, function () {
  console.log("Express is listening on port ".concat(PORT));
});
