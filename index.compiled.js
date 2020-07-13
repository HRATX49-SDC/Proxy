"use strict";

var express = require('express');

var path = require('path');

var compression = require('compression');

var httpProxy = require('http-proxy');

var PORT = process.env.PORT || 5000;
var app = express();
var proxy = httpProxy.createProxyServer({});
app.use(compression()); //routes
// app.all('/reccomended*', (req, res) => {
//   proxy.web(req, res, {target: 'http://rec-feat-display.us-east-2.elasticbeanstalk.com/'})
// })
// app.all('/main*', (req, res) => {
//   proxy.web(req, res, {target: `http://purrgetmainitemdisplay.us-east-2.elasticbeanstalk.com/`});
// });
// app.all('/about*', (req, res) => {
//   proxy.web(req, res, {target: `http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com/`});
// });
// app.all('/search*', (req, res) => {
//   proxy.web(req, res, {target: `http://v50-dev.us-east-1.elasticbeanstalk.com/`});
// });

app.all('/reviews*', function (req, res) {
  proxy.web(req, res, {
    target: "http://localhost:5200/"
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
