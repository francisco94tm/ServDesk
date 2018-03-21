/****************************************************************************
 *  Alerts Service
 ********************************************/

 var Alerts = function(){

    var priorityStr = {
       "-1"  : "",
        "0"  : "Baja Prioridad",
        "1"  : "Prioridad media",
        "2"  : "Alta Prioridad",
        "3"  : "Muy Alta Prioridad"
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

    var data = null;

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
        data = d;
    }

    this.getData = function(){
        return data;
    }
}
