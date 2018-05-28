/****************************************************************************
 *  NewdataContent Service
 ********************************************/

var NewdataContent = function(System, NewdataItemList){ 

    var editMode = false;
    this.backup = {};
    this.data = undefined;
      
    this.isEditModeOn = function(){
        return editMode == true;
    } 

    this.isEditModeOff = function(){
        return editMode == false;
    } 

    this.setEditModeOn = function(){
        editMode = true;
    }  
    
    this.setEditModeOff = function(){
        editMode = false;
    } 
    
    this.shuffleEditMode = function(){
        editMode = !editMode;
    }  

    
    this.edit = function(){
        var d = angular.copy(this.data);
         // Change object field to id
         Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        });  
        var what = NewdataItemList.getCurrentTab();
        switch(what){
            case 1:                
                return System.call('editClient', d);
            case 2:                
                return System.call('editRegisterMedium', d);
            case 3:
                return System.call('editAgentThreat', d);
        } 
    };

    this.delete = function(){
        var what = NewdataItemList.getCurrentTab();
        switch(what){
            case 1:                
                return System.call('deleteClient', {'id': this.data.id});
            case 2:                
                return System.call('deleteRegisterMedium', {'id': this.data.id});
            case 3:
                return System.call('deleteAgentThreat', {'id': this.data.id});
        } 
    }
}


angular.module('app').service('NewdataContent', NewdataContent); 