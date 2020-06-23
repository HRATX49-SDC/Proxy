const http = require('http');
const express = require('express');
const path = require('path')
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 5555;

const app = express();
var proxy = httpProxy.createProxyServer({});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', (req, res) => {
  console.log('redirecting to mainImage server')
  proxy.web(req, res, {target: `http://purrgetmainitemdisplay-env.eba-upicdvwk.us-east-2.elasticbeanstalk.com/`});
});

app.get('/reccomended*', (req, res) => {
  console.log('redireccting to recommended server');
  proxy.web(req, res, {target: `http://reccomended-featuredserver-dev.us-east-2.elasticbeanstalk.com/`})
})

// app.get('/purrget', (req,res) => {
//   console.log('redirecting to aboutItem server');
//   proxy.web(req, res, {target: `http://localhost:5100/`});
// })

app.listen(PORT, () => {
  console.log(`Express Proxy is listening on port ${PORT}`);
});