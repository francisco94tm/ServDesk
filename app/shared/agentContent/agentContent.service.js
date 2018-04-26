/****************************************************************************
 *  AgentContent Service
 ********************************************/

var AgentContent = function(System){ 

    var editMode = false;
      
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
}


angular.module('app').service('AgentContent', AgentContent); 