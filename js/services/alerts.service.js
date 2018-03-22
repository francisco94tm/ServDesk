/****************************************************************************
 *  Alerts Service
 ********************************************/

 var Alerts = function(System){

    var priorityStr = {
       "-1"  : "",
        "1"  : "Baja Prioridad",
        "2"  : "Prioridad media",
        "3"  : "Alta Prioridad",
        "4"  : "Muy Alta Prioridad"
    }

    var filter = {
        options : [
            { id: 1, name: 'Fecha Ascendente', 		key: '-datetime', 	icon: 'date_range'},
            { id: 2, name: 'Prioridad Ascendente', 	key: '-priority', 	icon: 'error_outline'},
            { id: 3, name: 'Fecha Descendiente', 	key: 'datetime', 	icon: 'date_range'}, 
            { id: 4, name: 'Prioridad Descendiente',key: 'priority', 	icon: 'error_outline'},
        ],selected: 
            { id: 2, name: 'Prioridad Ascendente', 	key: '-priority', 	icon: 'error_outline'}
    };

    this.data = [];
    this.maxId = undefined;

    this.priorityToText = function(number){ 
        return priorityStr[number];
    }

    this.getFilterOptions = function(){
        return filter.options;
    }

    this.getFilterSelected = function(){
        return filter.selected;
    } 

    this.setData = function(d){
        this.data = d;
    }

    this.getData = function(){ 
        return this.data;
    }

    this.setMaxId = function(mi){
        maxId = mi;
    }

    this.getMaxId = function(){
        return this.maxId;
    }

    this.load = function(){
        return System.call('getTableData', {'table': 'Requirement'}); 
    }
  
}
