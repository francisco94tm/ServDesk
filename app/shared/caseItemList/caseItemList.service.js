/****************************************************************************
 *  CaseItemList Service
 ********************************************/

var CaseItemList = function($filter){
    
    this.data = [];
    this.quantity = [
        0, 0, 0, 0
    ];
    this.filter = {
        options : [
            { id: 1, name: 'Recientes', 	 icon: 'schedule',              key: ['id_status.id','-registerDate']},
            { id: 2, name: 'Más urgente', 	 icon: 'warning',               key: ['id_status.id', '-id_caseType.id', '-registerDate']},
            { id: 3, name: 'Antiguos', 	     icon: 'hourglass_empty',       key: ['id_status.id', 'registerDate']}, 
            { id: 4, name: 'Menos urgentes', icon: 'error_outline',         key: ['id_status.id', 'id_caseType.id']},
        ],
        selected: 
        { id: 2, name: 'Más urgente', 	 icon: 'error_outline', key: ['id_status.id', '-id_caseType.id', '-registerDate']},
    };

    this.getStatus = function(id, num_items){ 
        id = (id*1 + 1);
        // num_items = this.quantity[id-1];
        switch(id){
            case 1: 
                return "Abierto"+((num_items>1)?'s':''); break;
            case 2: 
                return "En proceso de solución"; break;
            case 3: 
                return "Solucionado"+((num_items>1)?'s':''); break;
            case 4: 
                return "Cancelado"+((num_items>1)?'s':''); break;
        }
    }
    
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
    this.getQuantity = function(){ 
        return this.quantity;
    }
}


angular.module('app').service('CaseItemList', CaseItemList); 