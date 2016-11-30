function graphsController(issues, $scope) {
  const vm = this;

  vm.labels   = [];
  vm.options  = {
    scales: {
      yAxes: [{
        position: 'right'
      }]
    }
  };
  vm.onlyOpen   = false;
  vm.graphData  = [];

  function fillGraphsData(){
    let issData  = issues.getIssuesAndLabels(vm.onlyOpen ? 'open' : 'all');
    vm.graphData = issData.issues;
    vm.labels    = issData.labels;
  }

  function setIssuesStatus(status){
    vm.onlyOpen = status;
    fillGraphsData();
  }

  Promise.all([issues.recievedIssues])
      .then(() => {
        fillGraphsData();
        $scope.$apply();
      });

  vm.setIssuesStatus = setIssuesStatus;
}

graphsController.$inject = ['issues', '$scope'];

module.exports = graphsController;
