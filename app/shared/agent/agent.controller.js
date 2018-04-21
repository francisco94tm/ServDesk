function agentController($scope, $element, $attrs, agent){   
}
  
angular.module('app').component('agent', {
    templateUrl: 'app/shared/agent/agent.view.html',
    controller: agentController,
    bindings: { 
    }, 
    replace: true
});
