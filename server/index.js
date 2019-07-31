const http = require('http');
const httpProxy = require('http-proxy');

//
// Create your proxy server and set the target in the options.
//
const proxy = httpProxy.createProxyServer(); // See (†)

// 路由信息
const routers = [
  {
    path: '/navbar',
    target: 'http://localhost:9094',
  },
  {
    path: '/app1',
    target: 'http://localhost:9091',
  },
  {
    path: '/app2',
    target: 'http://localhost:9092',
  },
  {
    path: '/app3',
    target: 'http://localhost:9093',
  },
];
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
const server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  let flag = true;
  routers.forEach(item => {
    if (req.url.startsWith(item.path)) {
      proxy.web(req, res, {
        target: item.target + req.url.replace(item.path, ''),
        ignorePath: true,
      });
      flag = false;
    }
  });
  if (flag) {
    console.error('invalid url: ' + req.url);
  }
});
console.log('proxy listening on port 9089');
server.listen(9089);
