const graphsTemplate = require('./graphs.view.html');
const graphsController = require('./graphs.controller.js');

function graphsDirective() {
  const directive = {
    template: graphsTemplate,
    restrict: 'EA',
    replace: true,
    controller: graphsController,
    controllerAs: 'vm',
    bindToController: true
  };
  return directive;
}

module.exports = graphsDirective;
