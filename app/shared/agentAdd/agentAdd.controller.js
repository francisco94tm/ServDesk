
/*****************************************************************
 * request Component
 */

function agentAddController($scope, $element, $attrs, AgentAdd, $rootScope, Dashboard){  
    
    // Check if the dialog is closed 
    $scope.$ctrl.AgentAdd = AgentAdd; 

    // Get catalogues
    Dashboard.getCatalogues().then(data => {
        $scope.$ctrl.options =  data;
    });  

    $scope.$ctrl.saveAgent = () => {			
        AgentAdd.save().then(response => {  
            $scope.$ctrl.AgentAdd.close();
            Dashboard.getCatalogues(['agent']).then(r => {	 
                $rootScope.$broadcast('getAgents', r.agent);	 
            });  				
            var objeto = {
                title: "Agente registrado, el folio es:",
                id:  response.data.id
            } 
            $rootScope.$broadcast('openPopup', objeto);	
            AgentAdd.reset();
        });			 
    } 
}
 
angular.module('app').component('agentAdd', {
    templateUrl: 'app/shared/agentAdd/agentAdd.view.html',
    controller: agentAddController,
    bindings: { }, 
});