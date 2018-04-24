/****************************************************************************
 *  CaseContent Service
 ********************************************/

var CaseContent = function(System){

    var priorityStr = {
       "-1"  : "",
        "1"  : "Baja Prioridad",
        "2"  : "Prioridad media",
        "3"  : "Alta Prioridad",
        "4"  : "Muy Alta Prioridad"
    }

    this.filter = {
        options : [
            { id: 1, name: 'Recientes', 	key: '-registerDate', 	icon: 'date_range'},
            { id: 2, name: 'Más urgente', 	key: '-id_caseType.id', icon: 'error_outline'},
            { id: 3, name: 'Antiguos', 	    key: 'registerDate', 	icon: 'date_range'}, 
            { id: 4, name: 'Menos urgentes',key: 'id_caseType.id', 	icon: 'error_outline'},
        ],
        selected: 
            { id: 2, name: 'Prioridad Ascendente', 	key: '-registerDate', 	icon: 'error_outline'}
    };

    this.data = [];
    this.maxId = undefined;

    this.priorityToText = function(number){ 
        return priorityStr[number];
    }

    this.getFilterOptions = function(){
        return this.filter.options;
    }

    this.getFilterSelected = function(){
        return this.filter.selected;
    } 

    this.setData = function(d){ 
        this.data = d;
    }

    this.getData = function(){ 
        return this.data;
    }

    this.setMaxId = function(mi){
        this.maxId = mi;
    }

    this.getMaxId = function(){
        return this.maxId;
    }

    this.load = function(){
        return System.call('getRequirementData'); 
    }

    this.reload = function(){
        console.log(this.maxId);
        return System.call('getRequirementData', {'condition': 'id > '+this.maxId}); 
    }
  
}


angular.module('app').service('CaseContent', CaseContent); 