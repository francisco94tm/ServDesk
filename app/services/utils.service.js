
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
} 

angular.module('app').service('Utils', Utils); 