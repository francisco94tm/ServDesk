/****************************************************************************
 *  AlertContainer Service
 ********************************************/

var Client = function(Obj, System){

    this.data = {
        id: undefined,
        name: undefined,
        firstLastname: undefined,
        secondLastname: undefined, 
        mobilephone: undefined,
        phone: undefined,
        email: undefined, 
        job: undefined,
        area: undefined,
        department: undefined,
        businessUnit: undefined
    }

    this.getData = function(){
		return this.data;
    } 

    this.areFieldsMissing = function(){
        return !Obj.isFilled(this.data, ['id']);
    }
    
    this.setClient = function(c){ 
		this.data.client = c;
    } 

    this.setAuthor = function(){ 
        this.data.author = Session.getId();
    } 
    

    this.save = function(){  
        var d = this.data; 
        // Change object field to id
        Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        }); 
        return System.call('saveClient', d);         
    }
}


angular.module('app').service('Client', Client); 