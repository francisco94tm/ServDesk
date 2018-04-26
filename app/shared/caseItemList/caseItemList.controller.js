/*****************************************************************
 * Alert Container Component
 */

function caseItemListController($scope, $element, $attrs, CaseItemList){  

    // Obtain cases filter data
    $scope.$ctrl.filter = CaseItemList.getFilterData();
    $scope.$ctrl.data = [];
    
    // Update alerts
    $scope.$on('getCases', function (event, data) {   
        $scope.$ctrl.data = data;  
    });  
}
 
angular.module('app').component('caseItemList', {
    templateUrl: 'app/shared/caseItemList/caseItemList.view.html',
    controller: caseItemListController,
    bindings: {}, 
});
