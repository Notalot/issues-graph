const issuesService = require('./issues.service');

angular.module('issues-graphs')
  .service('issues', issuesService);