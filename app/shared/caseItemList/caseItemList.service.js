/****************************************************************************
 *  CaseItemList Service
 ********************************************/

var CaseItemList = function(filterFilter){
    
    this.data = [];  
    this.filter = {
        options : [
            { id: 1, name: 'Recientes', 	 icon: 'date_range',    key: ['id_status.id','-registerDate']},
            { id: 2, name: 'Más urgente', 	 icon: 'error_outline', key: ['id_status.id', '-id_caseType.id', '-registerDate']},
            { id: 3, name: 'Antiguos', 	     icon: 'date_range',    key: ['id_status.id', 'registerDate']}, 
            { id: 4, name: 'Menos urgentes', icon: 'error_outline', key: ['id_status.id', 'id_caseType.id']},
        ],
        selected: 
        { id: 2, name: 'Más urgente', 	 icon: 'error_outline', key: ['id_status.id', '-id_caseType.id', '-registerDate']},
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
    this.getFlag = function(){
        return this.flag;
    }; 
}


angular.module('app').service('CaseItemList', CaseItemList); 