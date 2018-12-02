// {
//   "/api/gateway/route/*": {
//     "target": "https://hml.aecweb.com.br",
//     "secure": false,
//     "logLevel": "debug",
//     "changeOrigin": true
//   }
// }

const proxy = [
  {
    //context: '/api/gateway/route/',
    context: '/api/*',
    target: 'https://hml.aecweb.com.br/',
    pathRewrite: {'^/api' : '/api'}
  }
];

module.exports = proxy;