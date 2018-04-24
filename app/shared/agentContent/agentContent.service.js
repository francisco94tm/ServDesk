/****************************************************************************
 *  AgentContent Service
 ********************************************/

var AgentContent = function(System){ 

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


angular.module('app').service('AgentContent', AgentContent); 