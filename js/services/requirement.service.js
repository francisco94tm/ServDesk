/****************************************************************************
 *  Requirements Service
 ********************************************/

var Requirement = function(System, Alertx, Alerts, $timeout){
    
    var data = {
        id: undefined,
        agent: undefined,
        reason: undefined,
        description: undefined,
        client: undefined,
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
		this.client = c;
    } 

    this.save = function(){
        var data = this.data;
        var promises = Object.keys(data).map(function(key){ 
            if(data[key].id != undefined)
               data[key] = data[key].id;
        });          

        Promise.all(promises).then(function() {
            System.call('saveRequirement', data).then(function(response){ 
                Alertx.setTitle("Requerimiento registrado");
                Alertx.setId(response.data.id);
                Alertx.show(); 
            });
        });
    }
}
