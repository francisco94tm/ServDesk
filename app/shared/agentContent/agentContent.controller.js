
/*****************************************************************
 * request Component
 */

function agentContentController($scope, $element, $attrs, AgentItemList, AgentContent, Dashboard){

    $scope.$ctrl.AgentContent = AgentContent;
    $scope.$ctrl.AgentItemList = AgentItemList;  
    $scope.$ctrl.options = {}; 

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data;
    });
    
    $scope.$on('displayAgent', (event, data) => {  
        AgentContent.data = data;
        AgentContent.setEditModeOff(); 
    }); 

    $scope.$ctrl.edit = function(){  
       AgentContent.backup = angular.copy($scope.$ctrl.AgentContent.data);         
        AgentContent.shuffleEditMode(); 
    }; 
    $scope.$ctrl.revertEdit = function(){  
        for (var key in AgentContent.data)
            if (AgentContent.data.hasOwnProperty(key))
                AgentContent.data[key] = AgentContent.backup[key];       
        AgentContent.setEditModeOff(); 
    };
}
 
angular.module('app').component('agentContent', {
    templateUrl: 'app/shared/agentContent/agentContent.view.html',
    controller: agentContentController,
    bindings: { }, 
});