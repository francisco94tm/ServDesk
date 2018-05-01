/*****************************************************************
 * Alert Container Component
 */

function newdataItemListController($scope, $rootScope, $element, $attrs, NewdataItemList, NewdataItem, NewdataContent, Dashboard){  
 
    $scope.$ctrl.data = [];

    $scope.$ctrl.NewdataItemList = NewdataItemList;   
    NewdataItemList.reset();  
      
    $scope.$ctrl.setCurrentTab = (n) => { 
        if(NewdataContent.isEditModeOn()){
            for (var key in NewdataContent.data) {
                if (NewdataContent.data.hasOwnProperty(key)) { 
                    NewdataContent.data[key] = NewdataContent.backup[key];
                }
            }
        }
        NewdataItemList.setCurrentTab(n);
        NewdataItem.current = undefined; 
        $rootScope.$broadcast('displayNewdata', undefined);
    }

    Dashboard.getCatalogues(['client','registerMedium','agentThreat']).then((data)=> {  
        $scope.$ctrl.data = data;
    });
    
    // Update alerts
    $scope.$on('getNewdata', function (event, data) {   
        $scope.$ctrl.data = data;  
    });  
}
 
angular.module('app').component('newdataItemList', {
    templateUrl: 'app/shared/newdataItemList/newdataItemList.view.html',
    controller: newdataItemListController,
    bindings: {}, 
});
