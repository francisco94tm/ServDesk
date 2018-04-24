
/*****************************************************************
 * request Component
 */

function caseAddController($scope, $element, $attrs, CaseAdd, $rootScope, Dashboard){  
    
    // Check if the dialog is closed
    $scope.$ctrl.status = CaseAdd;
    $scope.$ctrl.CaseAdd = CaseAdd; 

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });

    $scope.$ctrl.saveCase = () => {			
        CaseAdd.save().then(response => { 
            $scope.$ctrl.status.close();
            Dashboard.getCatalogues('request').then(r => {	  
                $rootScope.$broadcast('getCases', r.request);	 
            });  				
            var objeto = {
                title: "Caso registrado, el folio es:",
                id:  response.data.id
            } 
            $rootScope.$broadcast('openPopup', objeto);	
            CaseAdd.reset();
        });			 
    } 
}
 
angular.module('app').component('caseAdd', {
    templateUrl: 'app/shared/caseAdd/caseAdd.view.html',
    controller: caseAddController,
    bindings: { }, 
});