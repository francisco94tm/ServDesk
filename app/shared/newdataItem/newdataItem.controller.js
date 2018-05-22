
/*****************************************************************
 * request Component
 */

function newdataItemController($scope, $element, $attrs, NewdataItem, NewdataItemList, NewdataContent, $rootScope){ 
    
    $scope.$ctrl.NewdataItem = NewdataItem;
    $scope.$ctrl.NewdataItemList = NewdataItemList;
    
    // Select curren newdata
    $scope.newdataItemClick = function(data){  
        if(NewdataContent.isEditModeOn()){
            for (var key in NewdataContent.data) {
                if (NewdataContent.data.hasOwnProperty(key)) { 
                    NewdataContent.data[key] = NewdataContent.backup[key];
                }
            }
        } 
        var d = (NewdataItem.current == data) ? undefined : data;
        NewdataItem.current = d; 
        $rootScope.$broadcast('displayNewdata', d);
    };  
}
 
angular.module('app').component('newdataItem', {
    templateUrl: 'app/shared/newdataItem/newdataItem.view.html',
    controller: newdataItemController,
    bindings: { 
        data: '=',
        current: '='
    }, 
});