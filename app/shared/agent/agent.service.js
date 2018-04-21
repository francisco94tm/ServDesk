/****************************************************************************
 *  AlertContainer Service
 ********************************************/

var Agent = function(Obj, System){

    this.data = {
        id: undefined,
        name: undefined,
        firstLastname: undefined,
        secondLastname: undefined, 
        mobilephone: undefined,
        address: undefined,
        phone: undefined,
        email: undefined 
    }

    this.getData = function(){
		return this.data;
    } 

    this.areFieldsMissing = function(){
        return !Obj.isFilled(this.data, ['id']);
    }
    
    this.setAgent = function(c){ 
		this.data.Agent = c;
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
        return System.call('saveAgent', d);         
    }
}


angular.module('app').service('Agent', Agent); 