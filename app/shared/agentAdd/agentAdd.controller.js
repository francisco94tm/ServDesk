
/*****************************************************************
 * request Component
 */

function agentAddController($scope, $element, $attrs, AgentAdd, $rootScope, Dashboard){  
    
    // Check if the dialog is closed
    $scope.$ctrl.status = AgentAdd;
    $scope.$ctrl.agentAdd = AgentAdd; 

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });

    $scope.$ctrl.saveCase = () => {			
        agentAdd.save().then(response => { 
            $scope.$ctrl.status.close();
            Dashboard.getCatalogues('request').then(r => {	  
                $rootScope.$broadcast('getAgents', r.request);	 
            });  				
            var objeto = {
                title: "Agente registrado, el folio es:",
                id:  response.data.id
            } 
            $rootScope.$broadcast('openPopup', objeto);	
            agentAdd.reset();
        });			 
    } 
}
 
angular.module('app').component('agentAdd', {
    templateUrl: 'app/shared/agentAdd/agentAdd.view.html',
    controller: agentAddController,
    bindings: { }, 
});