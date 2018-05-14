/****************************************************************************
 *  CaseContent Service
 ********************************************/

var CaseContent = function(System){

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
        return System.call('editCase', d);
    };
}


angular.module('app').service('CaseContent', CaseContent); 