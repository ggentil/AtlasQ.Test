const proxy = [
  {
    //context: '/api/gateway/route/',
    context: '/api/*',
    target: '',
    pathRewrite: {'^/api' : '/api'}
  }
];

module.exports = proxy;