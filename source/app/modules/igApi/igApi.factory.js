const Api = require('./github.api');

function igApiFactory($config, Notification) {
  const apiConfig = Object.assign({
    onUncauchError(error) {
      Notification.error(error.message);
    },
  }, $config.apiOptions);

  const api = new Api(apiConfig);

  return api;
}

igApiFactory.$inject = ['$config', 'Notification'];

module.exports = igApiFactory;
