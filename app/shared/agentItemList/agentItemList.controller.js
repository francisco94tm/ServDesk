/*****************************************************************
 * Alert Container Component
 */

function agentItemListController($scope, $element, $attrs, AgentItemList){  
 
    $scope.$ctrl.data = [];
    
    // Update alerts
    $scope.$on('getAgents', function (event, data) {  
        $scope.$ctrl.data = data;  
    });  
}
 
angular.module('app').component('agentItemList', {
    templateUrl: 'app/shared/agentItemList/agentItemList.view.html',
    controller: agentItemListController,
    bindings: {}, 
});
