
/****************************************************************************
 *  Utils Service
 ********************************************/

function Utils (){
    this.countIfMatchProperty = function(object, prop, value){
        var cont = 0;
        angular.forEach(object, function(val, id){
            if(val[prop] == value)
                cont++;			
        });
        return cont;
    }

    
    this.media = function(arr) {
        var prom = 0; 
        angular.forEach(arr, val => {
            prom += val;
        });
        return prom / arr.length;
    }
} 

angular.module('app').service('Utils', Utils); 
