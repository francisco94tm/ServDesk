
/*****************************************************************
 * request Component
 */

function agentContentController($scope, $element, $attrs, AgentContent, Dashboard){

    $scope.$ctrl.AgentContent = AgentContent; 
    $scope.$ctrl.options = {}; 

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data;
    });
    
    $scope.$on('displayAgent', (event, data) => {  
        $scope.$ctrl.data = data;
        AgentContent.setEditModeOff(); 
    }); 

    $scope.$ctrl.edit = function(){  
        AgentContent.shuffleEditMode(); 
    };
}
 
angular.module('app').component('agentContent', {
    templateUrl: 'app/shared/agentContent/agentContent.view.html',
    controller: agentContentController,
    bindings: { }, 
});