
/*****************************************************************
 * request Component
 */

function agentItemController($scope, $element, $attrs, AgentItem, AgentContent, $rootScope){ 
    
    $scope.$ctrl.AgentItem = AgentItem;
    
    // Select curren agent
    $scope.agentItemClick = function(data){ 
        if(AgentContent.isEditModeOn()){
            for (var key in AgentContent.data) {
                if (AgentContent.data.hasOwnProperty(key)) { 
                    AgentContent.data[key] = AgentContent.backup[key];
                }
            }
        }
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