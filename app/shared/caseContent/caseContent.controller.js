
/*****************************************************************
 * request Component
 */

function caseContentController($scope, $element, $attrs, CaseContent, CaseItemList, Dashboard){    

    $scope.$ctrl.CaseContent = CaseContent;
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.options = {};

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data;
    });
    
    $scope.$on('displayCase', (event, data) => {  
        CaseContent.data = data;
        CaseContent.setEditModeOff(); 
    }); 

    $scope.$ctrl.edit = function(){  
        CaseContent.backup = angular.copy($scope.$ctrl.CaseContent.data);         
        CaseContent.shuffleEditMode();  
    };
    $scope.$ctrl.revertEdit = function(){  
        for (var key in CaseContent.data)
            if (CaseContent.data.hasOwnProperty(key))
                CaseContent.data[key] = CaseContent.backup[key]; 
        CaseContent.setEditModeOff(); 
    };
}
 
angular.module('app').component('caseContent', {
    templateUrl: 'app/shared/caseContent/caseContent.view.html',
    controller: caseContentController,
    bindings: { }, 
});