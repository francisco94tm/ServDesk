
/*****************************************************************
 * request Component
 */

function caseContentController(
    $scope, $element, $attrs, 
    $rootScope, CaseContent,
    CaseItemList, Dashboard, Session, 
    Validate){    

    // Init Services 
    $scope.$ctrl.CaseContent = CaseContent;
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.solving = false;    
    $scope.$ctrl.sessionId = Session.getId(); 
    $scope.$ctrl.isEmpty = function(obj){
        return Validate.isEmpty(obj);
    }
    
    /******************************************************
     *  Load catalogues
     */ 
    $scope.$ctrl.options = {}; 
    Dashboard.getCatalogues().then((data) => {  
        var c = [];
        for(let i=0; i<4; i++){
           angular.forEach(data.client[i], function(val, id){
                c.push(val);
           });
        } 
        data.client = c;
        $scope.$ctrl.options = data; 
    });
    
    /******************************************************
     *  Display case when catch a broadcast call
     */ 
    $scope.$on('displayCase', (event, data) => {  
        CaseContent.data = data;
        CaseContent.setEditModeOff();   
    }); 
     
    /******************************************************
     *  Edit case
     */  
    $scope.$ctrl.edit = function(){
        CaseContent.shuffleEditMode(); 
         
        // CLicked on Save, proceed to save in Database
        if(!CaseContent.isEditModeOn()){
            CaseContent.data.time = false;

            // Save case in database
            CaseContent.edit().then(response => {
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
                    $rootScope.$broadcast('openToast', {'title': 'Caso guardado'});

                    // The user clicked undo, revert data
                    $scope.$on('undo', (event, data) => {
                        $scope.$ctrl.revertEdit();
                        // Save previous data in DB
                        CaseContent.edit().then(response => {
                            
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
            CaseContent.backup = angular.copy($scope.$ctrl.CaseContent.data);    
    };

    /******************************************************
     *  Clicked on revert button, reset changes made on edit mode
     */
    $scope.$ctrl.revertEdit = function(){  
        for (var key in CaseContent.data)
            if (CaseContent.data.hasOwnProperty(key))
                CaseContent.data[key] = CaseContent.backup[key]; 
        CaseContent.setEditModeOff(); 
    }; 

    /****************************************************************
     * Change current case status 
     * @param {integer} status
     */
    $scope.$ctrl.setStatusTo = function(status){ 
        // Open dialog to solve the case
        if(status == 3){
            $scope.$ctrl.solving = true;
            CaseContent.setEditModeOff(); 
            return;
        }

        if(status == 2){
            $scope.$ctrl.saveNewStatus(status).then(response => {
                console.log(response.data);
            });
        } 
    }

    /*****************************************************************
     * Solve the case
     */
    $scope.$ctrl.solveCase = function(){
        var this_id = CaseContent.data.id; 
        $scope.$ctrl.saveNewStatus(3).then(response => {
            console.log(response.data);
            $rootScope.$broadcast('openToast', {'title': 'Caso '+this_id+' solucionado', 'show_button': false});
            CaseContent.setEditModeOff(); 
            $scope.$ctrl.solving = false;
        });
    };

    /***********************************************************
     * Change case status
     * @param {integer} status 
     */
    $scope.$ctrl.saveNewStatus = function(status){ 
        var this_id = CaseContent.data.id; 
        angular.forEach(CaseItemList.data[status-2], function(obj, id){
            if(obj.id != this_id) 
                return; 
            CaseItemList.data[status-2].splice(id, 1);  
            CaseItemList.data[status-1].push(obj);  
        }); 
        CaseContent.data.id_status.id = status;
        CaseContent.data.time = true; 
        return CaseContent.edit()
    }
}
 
angular.module('app').component('caseContent', {
    templateUrl: 'app/shared/caseContent/caseContent.view.html',
    controller: caseContentController,
    bindings: { }, 
});