/****************************************************************************
 *  NewdataContent Service
 ********************************************/

var NewdataContent = function(System){ 

    var editMode = false;
    this.backup = {};
    this.data = {};
      
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


angular.module('app').service('NewdataContent', NewdataContent); 