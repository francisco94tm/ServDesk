
/*****************************************************************
 * request Component
 */

function caseContentController($scope, $element, $attrs, CaseContent, Dashboard){    

    $scope.$ctrl.CaseContent = CaseContent; 
    $scope.$ctrl.options = {};

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data;
    });
    
    $scope.$on('displayCase', (event, data) => {  
        $scope.$ctrl.data = data;
        CaseContent.setEditModeOff(); 
    }); 

    $scope.$ctrl.edit = function(){  
        CaseContent.shuffleEditMode(); 
    };
}
 
angular.module('app').component('caseContent', {
    templateUrl: 'app/shared/caseContent/caseContent.view.html',
    controller: caseContentController,
    bindings: { }, 
});