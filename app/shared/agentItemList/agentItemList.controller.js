/*****************************************************************
 * Alert Container Component
 */

function agentItemListController($scope, $element, $attrs, AgentItemList, Dashboard, $interval){  
 
    $scope.$ctrl.data = [];
    $scope.$ctrl.isLoading = false;

    // Update alerts
    $scope.$on('getAgents', function (event, data) {   
        // $scope.$ctrl.data = data;  
        $scope.$ctrl.loadData();
    }); 
    
    $scope.$ctrl.loadData = function(){ 
        
        $scope.$ctrl.data = [];
        $scope.$ctrl.isLoading = true;
        var promise = Dashboard.getCatalogues(['agent']);        
        var interval = $interval(() => {
            promise.then((data) => {  
                $scope.$ctrl.isLoading  = false;
                $scope.$ctrl.data = data.agent;  
                $interval.cancel(interval);
            });
        }, 1000);
    };

    $scope.$ctrl.loadData();
}
 
angular.module('app').component('agentItemList', {
    templateUrl: 'app/shared/agentItemList/agentItemList.view.html',
    controller: agentItemListController,
    bindings: {}, 
});
