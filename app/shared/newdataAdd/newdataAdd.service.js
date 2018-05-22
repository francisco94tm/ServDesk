/* ======================================================
 *
 * CASE ADD SERVICE 
 * 
 */

var NewdataAdd = function(System, Session, Obj){

    var status = 'closed';
    this.what = undefined; 
    this.data = {
        id: undefined, 
        curp: undefined,
        name: undefined,
        firstLastname: undefined,
        secondLastname: undefined, 
        mobilephone: undefined, 
        phone: undefined,
        email: undefined,
        job: undefined,
        department: undefined,
        area: undefined,
        businessUnit: undefined,
        threatType: undefined
    } 

    this.allFieldsAreTrue = function(obj){
        return Obj.allPropertiesAreTrue(obj);
    }

    this.reset = () => {
        this.data = {
            id: undefined, 
            curp: undefined,
            name: undefined,
            firstLastname: undefined,
            secondLastname: undefined, 
            mobilephone: undefined, 
            phone: undefined,
            email: undefined,
            job: undefined,
            department: undefined,
            area: undefined,
            businessUnit: undefined,
            threatType: undefined
        } 
    };

    this.close = () => {
        status = 'closed';
    };
    this.open = () => {
        status = 'opened';
    };
    this.shuffle = () => {
        status = this.isClosed() ? 'opened' : 'closed';
    };
    this.isClosed = () => { 
        return status == 'closed';
    };
    this.isOpened = () => {
        return status == 'opened';
    };
    this.getStatus = () => {
        return status;
    }
    this.areFieldsMissing = function(){
        if(this.what == undefined)
            return true;
        if(this.what.id == 1)
            return !Obj.isFilled(this.data, ['id', 'description', 'threatType']);
        if(this.what.id == 2)
            return !Obj.isFilled(this.data, ['id', 'description', 'threatType', 'curp', 'firstLastname', 'secondLastname', 'email', 'phone', 'mobilephone', 'job', 'department', 'area', 'businessUnit']);
        if(this.what.id == 3)
            return !Obj.isFilled(this.data, ['id', 'curp', 'firstLastname', 'secondLastname', 'email', 'phone', 'mobilephone', 'job', 'department', 'area', 'businessUnit']);
    } 
    this.save = function(){  
        var d = angular.copy(this.data); 
        // Change object field to id
        Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        }); 
        var url;
        switch(this.what.id){
            case 1:
                return System.call('saveClient', d);  
            case 2:
                return System.call('saveRegisterMedium', d);  
            case 3:
                return System.call('saveAgentThreat', d);  
        }

               
    }
}

angular.module('app').service('NewdataAdd', NewdataAdd); 