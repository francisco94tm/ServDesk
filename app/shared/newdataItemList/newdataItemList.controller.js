/*****************************************************************
 * Alert Container Component
 */

function newdataItemListController($scope, $rootScope, $element, $attrs, $interval, DashNav, NewdataItemList, NewdataItem, NewdataContent, Dashboard){  
 
    $scope.$ctrl.data = [];

    $scope.$ctrl.NewdataItemList = NewdataItemList;   
    $scope.$ctrl.DashNav = DashNav;   
    NewdataItemList.reset();  
    $scope.$ctrl.isLoading = false;
      
    $scope.$ctrl.setCurrentTab = (n) => { 
        if(NewdataContent.isEditModeOn())
            for (var key in NewdataContent.data)
                if (NewdataContent.data.hasOwnProperty(key))
                    NewdataContent.data[key] = NewdataContent.backup[key]; 
        NewdataItemList.setCurrentTab(n);
        NewdataItem.current = undefined; 
        $rootScope.$broadcast('displayNewdata', undefined);
    }
 
    
    // Update alerts
    $scope.$on('getNewdata', function (event, data) {   
        $scope.$ctrl.data = data;  
    });  

    $scope.$ctrl.loadData = function(){ 
        $scope.$ctrl.data = []; 
        $scope.$ctrl.isLoading = true;        
        var promise =  Dashboard.getCatalogues(['client','registerMedium','agentThreat']);   
        var interval = $interval(() => {
            promise.then((data) => {  
                $scope.$ctrl.isLoading  = false;
                $scope.$ctrl.data = data;  
                $interval.cancel(interval);
            });
        }, 1000);
    };
    $scope.$ctrl.loadData();
}
 
angular.module('app').component('newdataItemList', {
    templateUrl: 'app/shared/newdataItemList/newdataItemList.view.html',
    controller: newdataItemListController,
    bindings: {}, 
});
