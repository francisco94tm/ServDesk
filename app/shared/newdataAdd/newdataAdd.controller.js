
/*****************************************************************
 * request Component
 */

function newdataAddController($scope, $element, $attrs, 
    DashNav, NewdataAdd, NewdataItemList, 
    $rootScope, Dashboard, Validate, 
    System, $sce, $timeout){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.DashNav = DashNav; 
    $scope.$ctrl.NewdataAdd = NewdataAdd; 
    $scope.$ctrl.NewdataItemList = NewdataItemList; 
    $scope.$ctrl.isSaving = false;
    $scope.$ctrl.databaseValid = {};

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });  

    $scope.$ctrl.saveNewdata = () => {	
        $scope.$ctrl.isSaving = true;		
        NewdataAdd.save().then(response => {  
            
            console.log(response.data);
            if(response.data.error == undefined || response.data.error != ""){                
                console.log(response.data.error);
                $rootScope.$broadcast('openToast', {'title': 'Ocurrió un error.', 'show_button': false});	 
                $scope.$ctrl.NewdataAdd.close();
                $scope.$ctrl.isSaving = false;
            }

            else{
                Dashboard.getCatalogues(['client','registerMedium','agentThreat']).then(r => {	 
                    $rootScope.$broadcast('getNewdata', r);	 
                }); 
                var objeto = {
                    title:  NewdataItemList.getCurrentTabName()+" registrado",
                    id:  response.data.id
                }
                if(NewdataItemList.getCurrentTab() == 1){
                   objeto.description = $sce.trustAsHtml("Se envió un correo a <b>"+NewdataAdd.data.email+"</b> con la información para poder acceder al sistema como cliente.")
                }

                $rootScope.$broadcast('openPopup', objeto);	 
                $scope.$ctrl.NewdataAdd.close();
                NewdataAdd.reset();
                $scope.$ctrl.isSaving = false;
            }
        });			 
    } 

    
    $scope.$watch('$ctrl.NewdataAdd.data.curp', (obj) => { 
        $timeout(() => {
            if(obj != undefined && obj.length == 18){ 
                System.call('doesCURPExist', {'curp':obj} ).then(response => { 
                    console.log("Is on database", response.data); 
                    if(response.data*1 > 0){      
                        $scope.$ctrl.databaseValid.curp = false; 
                    }
                    else $scope.$ctrl.databaseValid.curp = true;
                });  
            }
            else  $scope.$ctrl.databaseValid.curp = true;
        }); 
    });
}
 
angular.module('app').component('newdataAdd', {
    templateUrl: 'app/shared/newdataAdd/newdataAdd.view.html',
    controller: newdataAddController,
    bindings: { }, 
});