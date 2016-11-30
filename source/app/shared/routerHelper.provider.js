function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider, $config) {
  function RouterHelper($state) {
    let hasOtherwise = false;
    return {
      configureStates(states, otherwisePath) {
        states.forEach((state) => {
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      },
      getStates() {
        return $state.get();
      }
    };
  }
  RouterHelper.$inject = ['$state'];

  this.$get = RouterHelper;
  $locationProvider.html5Mode($config.html5Mode).hashPrefix('!');
}

routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$config'];

module.exports = routerHelperProvider;
