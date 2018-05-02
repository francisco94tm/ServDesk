/****************************************************************************
 *  CaseItemList Service
 ********************************************/

var CaseItemList = function(){
    
    this.data = []; 
    this.filter = {
        options : [
            { id: 1, name: 'Recientes', 	key: '-registerDate', 	icon: 'date_range'},
            { id: 2, name: 'Más urgente', 	key: ['-id_caseType.id', '-registerDate'],  icon: 'error_outline'},
            { id: 3, name: 'Antiguos', 	    key: 'registerDate', 	icon: 'date_range'}, 
            { id: 4, name: 'Menos urgentes',key: 'id_caseType.id', 	icon: 'error_outline'},
        ],
        selected: 
            { id: 2, name: 'Más urgente', 	key: ['-id_caseType.id', '-registerDate'], 	icon: 'error_outline'}
    };
    
    this.setData = function(d){
        this.data = d;
    }

    this.getData = function(){ 
        return this.data;
    }  
    
    this.getFilterData = function(){
        return this.filter;
    }

    this.getFilterOptions = function(){
        return this.filter.options;
    }

    this.getFilterSelected = function(){
        return this.filter.selected;
    } 
}


angular.module('app').service('CaseItemList', CaseItemList); 