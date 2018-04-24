
/*****************************************************************
 * request Component
 */

function agentContentController($scope, $element, $attrs){   
    $scope.$on('displayAgent', (event, data) => { 
        $scope.$ctrl.data = data;
    }); 
}
 
angular.module('app').component('agentContent', {
    templateUrl: 'app/shared/agentContent/agentContent.view.html',
    controller: agentContentController,
    bindings: { }, 
});