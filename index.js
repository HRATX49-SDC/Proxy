const express = require('express');
const path = require('path');
const compression = require('compression');
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 5002;

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.all('/reccomended*', (req, res) => {
  proxy.web(req, res, {target: 'http://reccomended-featuredserver-dev.us-east-2.elasticbeanstalk.com/'})
})

app.all('/main*', (req, res) => {
  proxy.web(req, res, {target: `http://purrgetmainitemv2.us-east-2.elasticbeanstalk.com/`});
});

app.all('/about*', (req, res) => {
  proxy.web(req, res, {target: `http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com/`});
});

app.all('/search*', (req, res) => {
  proxy.web(req, res, {target: `http://v50-dev.us-east-1.elasticbeanstalk.com/`});
});

app.all('/reviews*', (req, res) => {
  proxy.web(req, res, {target: `http://service-dev2.us-west-2.elasticbeanstalk.com/`});
})

//listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`)
});
