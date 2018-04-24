
/*****************************************************************
 * request Component
 */

function agentItemController($scope, $element, $attrs, AgentItem, $rootScope){ 
    
    $scope.$ctrl.AgentItem = AgentItem;
    
    // Select curren agent
    $scope.agentItemClick = function(data){ 
        var d = ($scope.$ctrl.current == data) ? undefined : data;
        $scope.$ctrl.current = d; 
        $rootScope.$broadcast('displayAgent', d);
    };  
}
 
angular.module('app').component('agentItem', {
    templateUrl: 'app/shared/agentItem/agentItem.view.html',
    controller: agentItemController,
    bindings: { 
        data: '=',
        current: '='
    }, 
});