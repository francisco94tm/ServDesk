
/*****************************************************************
 * request Component
 */

function caseContentController(
    $scope, $element, $attrs, 
    $rootScope, $timeout, CaseContent,
    CaseItemList, Dashboard, Session, 
    Obj, $filter){    

    // Init Services
    $scope.$ctrl.Obj = Obj;
    $scope.$ctrl.CaseContent = CaseContent;
    $scope.$ctrl.Session = Session;
    $scope.$ctrl.CaseItemList = CaseItemList;  
 
    // Load catalogues
    $scope.$ctrl.options = {}; 
    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data; 
    });
    
    $scope.$on('displayCase', (event, data) => {  
        CaseContent.data = data;
        CaseContent.setEditModeOff();   
    }); 
     
    // Clic on Edit button
    $scope.$ctrl.edit = function(){  
        CaseContent.shuffleEditMode(); 
         
        // CLicked on Save, proceed to save in Database
        if(!CaseContent.isEditModeOn()){
            CaseContent.edit().then(response => {
                if(response.data.error != ""){
                    console.log(response.data.error);
                    $rootScope.$broadcast('openToast', {
                        'show_button': false,
                        'title': 'Ocurrió un error, intentelo de nuevo.'
                    });  
                    $scope.$ctrl.revertEdit();
                }
                // Success saving
                else { 
                    $rootScope.$broadcast('openToast', {'title': 'Caso guardado'});
                    $scope.$on('undo', (event, data) => {
                        $scope.$ctrl.revertEdit();
                        CaseContent.edit().then(response => {
                            if(response.data.error != ""){
                                console.log(response.data.error);
                                $rootScope.$broadcast('openToast', {
                                    'show_button': false,
                                    'title': 'Ocurrió un error.'
                                });
                            }
                        });
                    });  
                }
            });
        }
        else          
            CaseContent.backup = angular.copy($scope.$ctrl.CaseContent.data);    
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