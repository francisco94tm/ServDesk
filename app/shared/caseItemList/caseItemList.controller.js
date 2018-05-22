/*****************************************************************
 * Alert Container Component
 */

function caseItemListController($scope, $element, $attrs, $interval, $timeout, CaseItemList, Dashboard, $rootScope){  

    // Obtain cases filter data     
    var list = angular.element($element).find(".item-wrapper");
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.isLoading = false; 
    $scope.$ctrl.groupDisabled = [ false, false, false, false ];
    $scope.$ctrl.category = undefined;

 
    // Update alerts when receiving a broadcast call
    $scope.$on('getCases', () => {
        $scope.$ctrl.loadData();
    });  

    // load data when click reload button
    $scope.$ctrl.loadData = () => {  
        $rootScope.$broadcast('displayCase', undefined);
        $scope.$ctrl.current = undefined;
        CaseItemList.data = []; 
        CaseItemList.quantity = [0, 0, 0, 0];
        $scope.$ctrl.isLoading = true;        
        var promise = Dashboard.getCatalogues(['request']);
        var interval = $interval(() => {
            promise.then((data) => { 
                $scope.$ctrl.isLoading  = false; 
                CaseItemList.data =  data.request;
                $timeout(() => $scope.$ctrl.scroll());                
                $interval.cancel(interval); 
            });
        }, 1000);
    };  
 
    // Scroll up to hide refresh button
    $scope.$ctrl.scroll = () => { 
        list.animate({
            scrollTop: 50
        }); 
    };     
}
angular.module('app').component('caseItemList', {
    templateUrl: 'app/shared/caseItemList/caseItemList.view.html',
    controller: caseItemListController,
    bindings: {}, 
}); 
