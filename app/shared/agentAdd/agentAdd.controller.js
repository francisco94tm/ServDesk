
/*****************************************************************
 * request Component
 */

function agentAddController($scope, $element, $attrs, AgentAdd, $rootScope, Dashboard, $sce, System){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.AgentAdd = AgentAdd;  
    $scope.$ctrl.isSaving = false; 
    $scope.$ctrl.databaseValid = {};

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });
    
    $scope.$watch('$ctrl.AgentAdd.data.usr', (obj) => { 
        if(obj != undefined && $scope.$ctrl.valid.usr){
            System.call('doesAgentExist', {'user':obj} ).then(response => {  
                if(response.data*1 > 0){      
                    $scope.$ctrl.databaseValid.usr = false; 
                }
                else $scope.$ctrl.databaseValid.usr = true;
            });  
        }
    });

    $scope.$ctrl.saveAgent = () => {
        $scope.$ctrl.isSaving = true;			
        AgentAdd.save().then(response => {   
            console.log(response);
            if(response.data.error == undefined || response.data.error != ""){                
                console.log(response.data.error);
                $rootScope.$broadcast('openToast', {'title': 'Ocurrió un error.', 'show_button': false});	 
                $scope.$ctrl.AgentAdd.close();
                $scope.$ctrl.isSaving = false;
            }

            else{
                Dashboard.getCatalogues(['agent']).then(r => {	 
                    $rootScope.$broadcast('getAgents', r.agent);	 
                }); 
                var objeto = {
                    title: "Agente registrado",
                    id:  response.data.id,
                    description : $sce.trustAsHtml("Se envió un correo a <b>"+AgentAdd.data.email+"</b> con la información para poder acceder al sistema como agente.")
                }; 

                $rootScope.$broadcast('openPopup', objeto);	 
                $scope.$ctrl.AgentAdd.close();
                AgentAdd.reset();
                $scope.$ctrl.isSaving = false;
            } 
        });			 
    } 
}
 
angular.module('app').component('agentAdd', {
    templateUrl: 'app/shared/agentAdd/agentAdd.view.html',
    controller: agentAddController,
    bindings: { }, 
});