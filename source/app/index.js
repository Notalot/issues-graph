/**
 * Stylesheet
 */
require('../stylesheets/main.css');
/**
 * Modules
 */
require('./modules/igApi/');

require('chart.js');
require('angular-chart.js');


/**
 * Shared
 */
const routerHelperProvider = require('./shared/routerHelper.provider');

/**
 * Config file
 */
const config = require('./config');

function getStates() {
  return config.routes;
}

function appRun(routerHelper, $config) {
  routerHelper.configureStates(getStates());
  Chart.defaults.global.colors = $config.charts.colors;
}
appRun.$inject = ['routerHelper', '$config'];

angular
  .module('issues-graphs', ['ui.router', 'ui-notification', 'ig.api', 'chart.js'])
    .constant('$config', config)
    .provider('routerHelper', routerHelperProvider)
  .run(appRun);


/**
 * Components
 */
require('./components/issues/');
require('./components/graphs/');
