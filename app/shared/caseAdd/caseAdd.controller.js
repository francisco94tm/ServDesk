
/*****************************************************************
 * request Component
 */

function caseAddController($scope, $element, $attrs, CaseAdd, $rootScope, Dashboard, $timeout, $filter){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.CaseAdd = CaseAdd; 
    $scope.$ctrl.validate = {};
 
    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        var c = [];
         
        angular.forEach(data.client[0], function(val, id){
            c.push(val);
        });
           
        data.client = c;
        $scope.$ctrl.options =  data; 
        $scope.$ctrl.options.assetRepository = $filter('filter')($scope.$ctrl.options.assetRepository, 'Pública');  
    }); 

    $scope.$ctrl.saveCase = () => {			
        CaseAdd.save().then(response => { 
            $scope.$ctrl.CaseAdd.close();
            $timeout(() => {
                Dashboard.getCatalogues(['request']).then(r => {	  
                    $rootScope.$broadcast('getCases', r.request);	 
                });  				
                var objeto = {
                    title: "Caso registrado, el folio es:",
                    id:  response.data.id
                } 
                $rootScope.$broadcast('openPopup', objeto);	
                CaseAdd.reset();
            }, 500);            
        });			 
    } 
}
 
angular.module('app').component('caseAdd', {
    templateUrl: 'app/shared/caseAdd/caseAdd.view.html',
    controller: caseAddController,
    bindings: { }, 
});