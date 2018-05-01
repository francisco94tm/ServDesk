/* ======================================================
 *
 * CASE ADD SERVICE 
 * 
 */

var NewdataAdd = function(System, Session, Obj){

    var status = 'closed';
    this.data = {
        id: undefined,
        name: undefined,
        firstLastname: undefined,
        secondLastname: undefined, 
        mobilephone: undefined,
        address: undefined,
        phone: undefined,
        email: undefined,
        level: undefined,
        usr: undefined,
        pass: undefined,
    }

    this.reset = () => {
        this.data = {
            id: undefined,
            name: undefined,
            firstLastname: undefined,
            secondLastname: undefined, 
            mobilephone: undefined,
            address: undefined,
            phone: undefined,
            email: undefined,
            level: undefined,
            usr: undefined,
            pass: undefined,
        }; 
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
        return !Obj.isFilled(this.data, ['id']);
    } 
    this.save = function(){  
        var d = this.data; 
        // Change object field to id
        Object.keys(d).map(function(key){ 
            if(d[key] !== null && typeof d[key] === 'object'){
                d[key] = d[key].id;
            }
        }); 
        return System.call('saveNewdata', d);         
    }
}

angular.module('app').service('NewdataAdd', NewdataAdd); 