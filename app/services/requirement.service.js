/****************************************************************************
 *  Requirements Service
 ********************************************/

var Requirement = function(System, xPopup, Alert, $timeout){
    
    this.data = {
        id: undefined,
        author: undefined,
        reason: undefined,
        description: undefined,
        client: 1,
        caseType: undefined,
        status: undefined,
        impact: undefined,
        priority: undefined,
        urgency: undefined,
        registerMedium: undefined
    }

    this.getData = function(){
		return this.data;
    } 
    
    this.setClient = function(c){
        console.log(this.data);
		this.data.client = c;
    } 

    this.save = function(){ 
        var d = this.data;
        console.log(d);
        var promises = Object.keys(d).map(function(key){ 
            if(d[key] != undefined)
                if(d[key].id != undefined)
                    d[key] = d[key].id;
        });          

        Promise.all(promises).then(function() {
            System.call('saveRequirement', d).then(function(response){ 
                xPopup.setTitle("Requerimiento registrado");
                xPopup.setId(response.data.id);
                xPopup.show(); 

                Alert.reload().then(function(response){
                    console.log(response);
                    angular.forEach(response.data.info, function(val, id){
                        Alert.data.push(val);
                    });
                });
            });
        });
    }
}

angular.module('app').service('Requirement', Requirement); 