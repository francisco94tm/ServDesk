/*****************************************************************
 * Alert Container Component
 */

function caseItemListController($scope, $element, $attrs, CaseItemList, $interval, Dashboard){  

    // Obtain cases filter data
    $scope.$ctrl.filter = CaseItemList.getFilterData();
    $scope.$ctrl.data = [];
    $scope.$ctrl.isLoading = false;
    
    // Update alerts
    $scope.$on('getCases', function (event, data) {   
        $scope.$ctrl.data = data;  
    });  

    $scope.$ctrl.loadData = function(){ 
        $scope.$ctrl.data = []; 
        $scope.$ctrl.isLoading = true;        
        var promise = Dashboard.getCatalogues(['request']);   
        var interval = $interval(() => {
            promise.then((data) => {  
                $scope.$ctrl.isLoading  = false;
                $scope.$ctrl.data = data.request;  
                $interval.cancel(interval);
            });
        }, 1000);
    };
}
 
angular.module('app').component('caseItemList', {
    templateUrl: 'app/shared/caseItemList/caseItemList.view.html',
    controller: caseItemListController,
    bindings: {}, 
});
