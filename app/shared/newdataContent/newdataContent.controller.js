
/*****************************************************************
 * request Component
 */

function newdataContentController(
    $scope, $element, $attrs, 
    $rootScope, NewdataContent, NewdataItemList, 
    Dashboard, $sce){

    $scope.$ctrl.NewdataContent = NewdataContent; 
    $scope.$ctrl.NewdataItemList = NewdataItemList; 
    $scope.$ctrl.options = {}; 

    // Load catalogues
    Dashboard.getCatalogues(['area','department','businessUnit','threatType', 'clientstatus']).then((data) => {  
        $scope.$ctrl.options = data;
    });
    
    // Display data
    $scope.$on('displayNewdata', (event, data) => {   
        NewdataContent.data = data;
        NewdataContent.setEditModeOff(); 
    }); 

    
    /******************************************************
     *  Edit case
     */  
    $scope.$ctrl.edit = function(){
        NewdataContent.shuffleEditMode(); 
         
        // CLicked on Save, proceed to save in Database
        if(!NewdataContent.isEditModeOn()){
            NewdataContent.data.time = false;

            // Save case in database
            NewdataContent.edit().then(response => {
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
                    $rootScope.$broadcast('openToast', {'title': NewdataItemList.getCurrentTabName()+' guardado'});

                    // The user clicked undo, revert data
                    $scope.$on('undo', (event, data) => {
                        $scope.$ctrl.revertEdit();
                        // Save previous data in DB
                        NewdataContent.edit().then(response => {
                            
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
            NewdataContent.backup = angular.copy($scope.$ctrl.NewdataContent.data);    
    };
 
    
    /******************************************************
     *  Clicked on revert button, reset changes made on edit mode
     */ 
    $scope.$ctrl.revertEdit = function(){  
        for (var key in NewdataContent.data)
            if (NewdataContent.data.hasOwnProperty(key))
                NewdataContent.data[key] = NewdataContent.backup[key];     
        NewdataContent.setEditModeOff(); 
    };

    $scope.$ctrl.delete = function(){ 
        var obj = {
            'yes_no': true,
            'title': '¿Está seguro de eliminar este '+NewdataItemList.getCurrentTabName()+'?',
            'description': $sce.trustAsHtml('<br>'),
            'promise': 'NEWDATA_'+NewdataContent.data.id
        }
        $rootScope.$broadcast('openPopup', obj); 
        $scope.$on('YES', (event, value) => { 
            console.log(value);
            console.log("NEWDATA_"+NewdataContent.data.id);
            if(value['promise'] == "NEWDATA_"+NewdataContent.data.id){
                NewdataContent.delete().then(function(response){
                    console.log(response.data);
                    $rootScope.$broadcast('getNewdata');
                    $scope.$ctrl.NewdataContent.data = undefined;
                });
            }
        });
    };

}
 
angular.module('app').component('newdataContent', {
    templateUrl: 'app/shared/newdataContent/newdataContent.view.html',
    controller: newdataContentController,
    bindings: { }, 
});