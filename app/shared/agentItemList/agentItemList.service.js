/****************************************************************************
 *  AgentItemList Service
 ********************************************/

var AgentItemList = function(){
    
    this.data = [];      
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


angular.module('app').service('AgentItemList', AgentItemList); 