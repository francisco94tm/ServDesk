
/*****************************************************************
 * request Component
 */

function agentContentController($scope, $element, $attrs, $rootScope, AgentItemList, AgentContent, Dashboard){

    $scope.$ctrl.AgentContent = AgentContent;
    $scope.$ctrl.AgentItemList = AgentItemList;  
    $scope.$ctrl.options = {};
    $scope.$ctrl.undo = false; 

    Dashboard.getCatalogues().then((data) => { 
        $scope.$ctrl.options = data;
    });
    
    $scope.$on('displayAgent', (event, data) => {  
        AgentContent.data = data;
        AgentContent.setEditModeOff(); 
    }); 


    /******************************************************
     *  Edit case
     */  
    $scope.$ctrl.edit = function(){
        AgentContent.shuffleEditMode(); 
         
        // CLicked on Save, proceed to save in Database
        if(!AgentContent.isEditModeOn()){
            AgentContent.data.time = false;

            // Save case in database
            AgentContent.edit().then(response => {
                console.log(response.data)

                // CHeck for errors ------------
                if(response.data.error[0] != ""){                    
                    // Revert data in view
                    $scope.$ctrl.revertEdit();
                    // An error happened, show alert
                    console.log(response.data.error);
                    $rootScope.$broadcast('openToast', {
                        'show_button': false,
                        'title': 'Ocurrió un error, intentelo de nuevo.'
                    });  
                }

                // No errors, success saving--------
                else { 
                    // Trigger an undo toast
                    $rootScope.$broadcast('openToast', {'title': 'Agente guardado'});

                    // The user clicked undo, revert data
                    $scope.$on('undo', (event, data) => {
                        $scope.$ctrl.revertEdit();
                        // Save previous data in DB
                        AgentContent.edit().then(response => {
                            
                            // Could revert changes
                            if(response.data.error[0] != ""){
                                console.log(response.data.error);
                                $rootScope.$broadcast('openToast', {
                                    'show_button': false,
                                    'title': 'Ocurrió un error.'
                                });
                            }
                        });
                    });  
                }
            });
        }
        else         
            AgentContent.backup = angular.copy($scope.$ctrl.AgentContent.data);    
    };


    // $scope.$ctrl.edit = function(){  
    //    AgentContent.backup = angular.copy($scope.$ctrl.AgentContent.data);         
    //     AgentContent.shuffleEditMode(); 
    //     // CLicked on Save, proceed to save in Database
    //     if(!AgentContent.isEditModeOn()){
    //         $rootScope.$broadcast('openToast', {'title': 'Agente guardado'}); 
    //         AgentContent.edit().then(response => {
    //             if(response.data.error[0] != "")
    //                 console.log(response.data.error);
    //         });
    //     } 
    // }; 
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