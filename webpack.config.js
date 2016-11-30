switch (process.env.NODE_ENV) {
  case 'prod':
  case 'build':
  case 'production':
    module.exports = require('./config/webpack.prod')({ env: 'production' });
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({ env: 'development' });
}
