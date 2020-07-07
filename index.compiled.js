"use strict";

var express = require('express');

var path = require('path');

var compression = require('compression');

var httpProxy = require('http-proxy');

var PORT = process.env.PORT || 5002;
var app = express();
var proxy = httpProxy.createProxyServer({});
app.use(compression()); //routes

app.all('/reccomended*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://rec-feat-display.us-east-2.elasticbeanstalk.com/'
  });
});
app.all('/main*', function (req, res) {
  proxy.web(req, res, {
    target: "http://purrgetmainitemdisplay.us-east-2.elasticbeanstalk.com/"
  });
});
app.all('/about*', function (req, res) {
  proxy.web(req, res, {
    target: "http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com/"
  });
});
app.all('/search*', function (req, res) {
  proxy.web(req, res, {
    target: "http://v50-dev.us-east-1.elasticbeanstalk.com/"
  });
});
app.all('/reviews*', function (req, res) {
  proxy.web(req, res, {
    target: "http://service-dev2.us-west-2.elasticbeanstalk.com/"
  });
}); //place here to allow for proper request forwarding

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, 'public'))); //listen

app.listen(PORT, function () {
  console.log("Express is listening on port ".concat(PORT));
});
