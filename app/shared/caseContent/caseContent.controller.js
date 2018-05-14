
/*****************************************************************
 * request Component
 */

function caseContentController($scope, $element, $attrs, $rootScope, CaseContent, CaseItemList, Dashboard, Session){    

    $scope.$ctrl.CaseContent = CaseContent;
    $scope.$ctrl.Session = Session;
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.options = {};
    $scope.$ctrl.undo = false;

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data; 
    });
    
    $scope.$on('displayCase', (event, data) => {  
        CaseContent.data = data;
        CaseContent.setEditModeOff(); 
    }); 

     
    // Clic on Edit button
    $scope.$ctrl.edit = function(){  
        CaseContent.backup = angular.copy($scope.$ctrl.CaseContent.data);         
        CaseContent.shuffleEditMode();

        // CLicked on Save, proceed to save in Database
        if(!CaseContent.isEditModeOn()){
            $rootScope.$broadcast('openToast', {'title': 'Caso guardado'}); 
            CaseContent.edit().then(response => {
                if(response.data.error[0] != "")
                    console.log(response.data.error);
            });
        }
    };

    // Click on revert button, reset changes made on edit mode
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