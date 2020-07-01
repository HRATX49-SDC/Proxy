const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 5002;

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.all('/reccomended*', (req, res) => {
  console.log('Redirecting to reccomended service')
  proxy.web(req, res, {target: 'http://reccomended-featuredserver-dev.us-east-2.elasticbeanstalk.com/'})
})

app.all('/main', (req, res) => {
  console.log('redirecting to mainImage server')
  proxy.web(req, res, {target: `http://purrgetmainitemv2.us-east-2.elasticbeanstalk.com/`});
});

app.all('/about*', (req, res) => {
  console.log('redirecting to about server')
  proxy.web(req, res, {target: `http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com/`});
});

app.all('/search*', (req, res) => {
  console.log('redirecting to search server')
  proxy.web(req, res, {target: `http://v50-dev.us-east-1.elasticbeanstalk.com/`});
});

//listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`)
});
