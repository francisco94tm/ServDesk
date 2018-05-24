/****************************************************************************
 *  CaseContent Service
 ********************************************/

var CaseContent = function(System, Session, CaseItemList){

    var editMode = false;
    this.backup = {};
    this.data = undefined;

    
    this.hasChanged = function(){
        return !angular.equals(this.data, this.backup);
    };
            
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

    this.getCloseMessage = function(){

        // User is a client
        if(Session.getLevel() == 4)
            return "Bienvenido";
        
        // user is an agent 
        var open_cases = CaseItemList.getQuantity()[0];
        var in_process_cases = CaseItemList.getQuantity()[1];
 
        if(open_cases > 0 || in_process_cases > 0)
            return "Tienes casos por resolver";

        return "Parece que no tienes casos por resolver";
    }

    this.edit = function(){
        var d = angular.copy(this.data);
         // Change object field to id
         Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        });  
        return System.call('editCase', d);
    };
}


angular.module('app').service('CaseContent', CaseContent); 