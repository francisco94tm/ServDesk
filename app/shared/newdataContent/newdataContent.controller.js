
/*****************************************************************
 * request Component
 */

function newdataContentController($scope, $element, $attrs, NewdataContent, NewdataItemList, Dashboard){

    $scope.$ctrl.NewdataContent = NewdataContent; 
    $scope.$ctrl.NewdataItemList = NewdataItemList; 
    $scope.$ctrl.options = {}; 

    // Load catalogues
    Dashboard.getCatalogues(['area','department','businessUnit','threatType']).then((data) => {  
        $scope.$ctrl.options = data;
    });
    
    // Display data
    $scope.$on('displayNewdata', (event, data) => {   
        NewdataContent.data = data;
        NewdataContent.setEditModeOff(); 
    }); 

    // Edit 
    $scope.$ctrl.edit = function(){ 
        NewdataContent.backup = angular.copy($scope.$ctrl.NewdataContent.data);         
        NewdataContent.shuffleEditMode(); 
    };


    // Revert edits
    $scope.$ctrl.revertEdit = function(){  
        for (var key in NewdataContent.data)
            if (NewdataContent.data.hasOwnProperty(key))
                NewdataContent.data[key] = NewdataContent.backup[key];     
        NewdataContent.setEditModeOff(); 
    };
}
 
angular.module('app').component('newdataContent', {
    templateUrl: 'app/shared/newdataContent/newdataContent.view.html',
    controller: newdataContentController,
    bindings: { }, 
});