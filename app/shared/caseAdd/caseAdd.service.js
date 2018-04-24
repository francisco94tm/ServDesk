/* ======================================================
 *
 * CASE ADD SERVICE 
 * 
 */

var CaseAdd = function(System, Session, Obj){

    var status = 'closed';
    this.data = {
        id: undefined,
        author: undefined,
        subject: undefined,
        description: undefined,
        client: undefined,
        caseType: undefined, 
        responsable: undefined, 
        registerMedium: undefined,
        asset: undefined,
        agentThreat: undefined
    }

    this.reset = () => {
        this.data = {
            id: undefined,
            author: undefined,
            subject: undefined,
            description: undefined,
            client: undefined,
            caseType: undefined, 
            responsable: undefined, 
            registerMedium: undefined,
            asset: undefined,
            agentThreat: undefined
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
        return !Obj.isFilled(this.data, ['id', 'author']);
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
        return System.call('saveCase', d);         
    }
}

angular.module('app').service('CaseAdd', CaseAdd); 