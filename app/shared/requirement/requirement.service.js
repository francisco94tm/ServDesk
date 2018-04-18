/****************************************************************************
 *  Requirements Service
 ********************************************/

var Requirement = function(System, xPopup, Alert, $timeout, Session, Obj){
    
    this.data = {
        id: undefined,
        author: undefined,
        subject: undefined,
        description: undefined,
        // client: undefined,
        caseType: undefined,
        status: undefined,
        responsable: undefined,
        // impact: undefined,
        // priority: undefined,
        // urgency: undefined,
        registerMedium: undefined,
        asset: undefined,
        agentThreat: undefined
    }

    this.getData = function(){
		return this.data;
    } 

    this.areFieldsMissing = function(){
        return !Obj.isFilled(this.data, ['id', 'author']);
    }
    
    this.setClient = function(c){ 
		this.data.client = c;
    } 

    this.setAuthor = function(){ 
        this.data.author = Session.getId();
    } 
    

    this.save = function(){ 
        this.setAuthor(); 
        var d = this.data;

        // Change object field to id
        Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        });
        console.log(d);
        return System.call('saveRequirement', d);         
    }
}

angular.module('app').service('Requirement', Requirement); 