/****************************************************************************
 *  System Service
 ********************************************/

var System = function($http, Obj) { 

    var route = 'system/system.php';
    var id = undefined;
    var obj = {}; 

    this.setRoute = function(r){
        route = r;
    }

    this.setId = function(i){
        id = i;
    }

    this.setObject = function(o){
        obj = o;
    }

    this.call = function(request, object){  
        // No Request specified
        if(request==undefined){
            error.log("No request specified");
            return;
        }
        
        // Set object to send
        if(object != undefined)
            this.setObject(object); 

        obj.request = request; 
        var x = Obj.toparams(obj);
        return $http({
            url: route,
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: x
        });  
    } 
}


angular.module('app').service('System', System); 
