const igApiFactory = require('./igApi.factory');

angular.module('ig.api', [])
  .factory('$api', igApiFactory);
