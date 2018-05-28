
/*****************************************************************
 * request Component
 */

function caseContentController(
    $scope, $element, $attrs, 
    $rootScope, CaseContent,
    CaseItemList, Dashboard, Session, 
    Validate, $sce){    

    // Init Services  
    $scope.$ctrl.CaseContent = CaseContent;
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.solving = false;    
    $scope.$ctrl.sessionId = Session.getId(); 
    $scope.$ctrl.sessionLevel = Session.getLevel(); 
    $scope.$ctrl.isEmpty = function(obj){
        return Validate.isEmpty(obj);
    }
    
    /******************************************************
     *  Load catalogues
     */ 
    $scope.$ctrl.options = {}; 
    Dashboard.getCatalogues().then((data) => {  
        var c = []; 
        angular.forEach(data.client[0], function(val, id){
            c.push(val);
        });        
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
                if(response.data.error != ""){                    
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
                            if(response.data.error != ""){
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

        if(status == 4){ 
            var obj = {
                'yes_no': true,
                'title': '¿Está seguro de querer cancelar este caso?',
                'description': $sce.trustAsHtml('<br>'),
                'promise': 'CASE_'+CaseContent.data.id
            }
            $rootScope.$broadcast('openPopup', obj);
            $scope.$on('YES', (event, value) => {   
                if(value['promise'] == 'CASE_'+CaseContent.data.id){
                    $scope.$ctrl.saveNewStatus(status).then(response => {
                        console.log(response.data);
                        $rootScope.$broadcast('openToast', {'title': 'Caso '+CaseContent.data.id+' cancelado', 'show_button': false});
                        CaseContent.setEditModeOff(); 
                    });
                }
            });
            // CaseContent.setEditModeOff(); 
            // return;
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
       
        var from = (status != 4) ? CaseItemList.data[status-2] : CaseItemList.data[status-3];
        var to = CaseItemList.data[status-1];

        var this_id = CaseContent.data.id; 
        angular.forEach(from, function(obj, id){
            if(obj.id != this_id) 
                return; 
            from.splice(id, 1);              
            to.push(obj);  
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