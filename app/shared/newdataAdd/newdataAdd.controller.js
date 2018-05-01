
/*****************************************************************
 * request Component
 */

function newdataAddController($scope, $element, $attrs, NewdataAdd, $rootScope, Dashboard){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.NewdataAdd = NewdataAdd; 

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });  

    $scope.$ctrl.saveNewdata = () => {			
        NewdataAdd.save().then(response => {  
            $scope.$ctrl.NewdataAdd.close();
            Dashboard.getCatalogues(['newdata']).then(r => {	 
                $rootScope.$broadcast('getNewdatas', r.newdata);	 
            });  				
            var objeto = {
                title: "Newdatae registrado, el folio es:",
                id:  response.data.id
            } 
            $rootScope.$broadcast('openPopup', objeto);	
            NewdataAdd.reset();
        });			 
    } 
}
 
angular.module('app').component('newdataAdd', {
    templateUrl: 'app/shared/newdataAdd/newdataAdd.view.html',
    controller: newdataAddController,
    bindings: { }, 
});