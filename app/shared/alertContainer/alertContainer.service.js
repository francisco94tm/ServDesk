/****************************************************************************
 *  AlertContainer Service
 ********************************************/

var AlertContainer = function(){
    this.data = []; 
    
    this.setData = function(d){
        this.data = d;
    }

    this.getData = function(){ 
        return this.data;
    }   
}


angular.module('app').service('AlertContainer', AlertContainer); 