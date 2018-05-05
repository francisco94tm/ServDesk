/*****************************************************************
 * Alert Container Component
 */

function caseItemListController($scope, $element, $attrs, $interval, $timeout,  CaseItemList, Dashboard){  

    // Obtain cases filter data 
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.isLoading = false; 
    $scope.$ctrl.groupDisabled = [];
 
    // Update alerts
    $scope.$on('getCases', function (event, data) {   
        $scope.$ctrl.CaseItemList.data = data;  
    });  

    // load data when click reload
    $scope.$ctrl.loadData = function(){ 
        $scope.$ctrl.CaseItemList.data = []; 
        $scope.$ctrl.isLoading = true;        
        var promise = Dashboard.getCatalogues(['request']);   
        var interval = $interval(() => {
            promise.then((data) => {  
                $scope.$ctrl.isLoading  = false; 
                $scope.$ctrl.CaseItemList.data = data.request;  
                $timeout(() => $scope.$ctrl.scroll());
                $interval.cancel(interval); 
            });
        }, 1000);
    };
    $scope.$ctrl.loadData(); 

    // Scroll up to hide refresh button
    var list = angular.element($element).find(".item-wrapper");

    $scope.$ctrl.scroll = function() { 
        list.animate({
            scrollTop: 40
        }); 
    };    
    // Click refresh btn
    // list.bind("wheel", function(e) {
    //     if(list.scrollTop() < 90){
    //         var s = list.scrollTop() / 2;
    //         list.scrollTop(-s);
    //     }
    //     if(list.scrollTop() < 70){
    //         $scope.$ctrl.loadData();
    //     } 
    // });
}
angular.module('app').component('caseItemList', {
    templateUrl: 'app/shared/caseItemList/caseItemList.view.html',
    controller: caseItemListController,
    bindings: {}, 
}); 
