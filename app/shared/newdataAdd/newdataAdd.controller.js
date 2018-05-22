
/*****************************************************************
 * request Component
 */

function newdataAddController($scope, $element, $attrs, DashNav, NewdataAdd, NewdataItemList, $rootScope, Dashboard, Validate, System){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.DashNav = DashNav; 
    $scope.$ctrl.NewdataAdd = NewdataAdd; 
    $scope.$ctrl.NewdataItemList = NewdataItemList; 

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });  

    $scope.$ctrl.saveNewdata = () => {			
        NewdataAdd.save().then(response => { 
            console.log(response); 
            $scope.$ctrl.NewdataAdd.close();
            Dashboard.getCatalogues(['client','registerMedium','agentThreat']).then(r => {	 
                $rootScope.$broadcast('getNewdata', r);	 
            });  		 
            var objeto = {
                title:  NewdataItemList.getTabs()[NewdataAdd.what.id - 1].name+" registrado, el folio es:",
                id:  response.data.id
            } 
            $rootScope.$broadcast('openPopup', objeto);	
            NewdataAdd.reset();
        });			 
    } 

    
    $scope.$watch('$ctrl.NewdataAdd.data.curp', (obj) => {
        if(obj != undefined && obj.length >= 18){
            if(Validate.curp(obj)){  

                System.call('getCURPMetadata', {'curp':obj}).then(response => {
                    console.log(response.data);
                });
            }
            else{
                console.log("CURP Invalido");
            }
        }
    });
}
 
angular.module('app').component('newdataAdd', {
    templateUrl: 'app/shared/newdataAdd/newdataAdd.view.html',
    controller: newdataAddController,
    bindings: { }, 
});