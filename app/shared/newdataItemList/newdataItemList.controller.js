/*****************************************************************
 * Alert Container Component
 */

function newdataItemListController(
    $scope, $element, $attrs,
    $rootScope, $timeout, $interval, 
    Dashboard, DashNav, NewdataItem,
    NewdataItemList, NewdataContent, 
    ){


    // Init Services  
    $scope.$ctrl.NewdataItemList = NewdataItemList;
    $scope.$ctrl.DashNav = DashNav;   
    NewdataItemList.reset();

    
    $scope.$ctrl.groupDisabled = [
        [ false, false, false, false ]
    ];


    var list = angular.element($element).find(".item-wrapper");    
    $scope.$ctrl.isLoading = false;


    /* ******************************************************
     * Change current tab section
     * *****************************************************/
    $scope.$ctrl.setCurrentTab = (n) => { 
        // $timeout(() => list.scrollTop(50));
        /* 
         * Check if editing mode is active,
         * if it is, change current data to backup data 
         * to avoid loosing info.
         */        
        // if(NewdataContent.isEditModeOn()){ // TO DO
        //     for (var key in NewdataContent.data){
        //         if (NewdataContent.data.hasOwnProperty(key)){
        //             NewdataContent.data[key] = NewdataContent.backup[key]; 
        //         }
        //     }
        // } 
        // Set current Tab
        NewdataItemList.setCurrentTab(n); 
        // Get new data list 
        NewdataItem.current = undefined; 
        $rootScope.$broadcast('displayNewdata', undefined);
    } 

    
    /* ******************************************************
     * Update data when a broadcast call is received
     * *****************************************************/
    $scope.$on('getNewdata', function (event, data) {
        $scope.$ctrl.loadData();
        // NewdataItemList.setData(data);
    });  


    /* ******************************************************
     * Load data from database
     * *****************************************************/
    $scope.$ctrl.loadData = function(){
        // Show loading animation 
        $scope.$ctrl.isLoading = true;  
        // Reset data to empty array
        NewdataItemList.setEmptyData();
        // Call server for calagues 
        var promise =  Dashboard.getCatalogues(['client','registerMedium','agentThreat']);   
        var interval = $interval(() => {
            promise.then(data => {  
                // Data is loaded
                $scope.$ctrl.isLoading  = false;  
                NewdataItemList.setData(data);
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

    $scope.$ctrl.loadData();
    $scope.$ctrl.setCurrentTab(1);
}
 
angular.module('app').component('newdataItemList', {
    templateUrl: 'app/shared/newdataItemList/newdataItemList.view.html',
    controller: newdataItemListController,
    bindings: {}, 
});
