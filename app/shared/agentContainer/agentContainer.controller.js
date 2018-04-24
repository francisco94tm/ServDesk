
/*****************************************************************
 * Agent Container Component
 */

function agentContainerController($scope, $element, $attrs, Dashboard){
    Dashboard.getCatalogues('agent').then(data => { 
        $scope.$ctrl.data = data;
    });

    // Update alerts
    $scope.$on('getAgents', (event, data) => {   
        $scope.$ctrl.data = data;
    });  
}
 
angular.module('app').component('agentContainer', {
    templateUrl: 'app/shared/agentContainer/agentContainer.view.html',
    controller: agentContainerController,
    bindings: {}, 
});