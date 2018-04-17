var Dashboard = function(Session) {   
    this.sessionExists = function(){
        return Session.isSet().then(function(response){ 
            return response.data !== 'FALSE';
        });
    }
    this.getSessionData = function(){         
        return Session.getData().then(function(response){ 
            return {
                id : response.id,
                name :  response.name + " " +  response.firstLastname,  
                icon:	'settings',
                search: "", 
                theme: 	{
                    id: 1,
                    value: 'Oscuro',
                    url: 'assets/css/default.css'
                }
            } 
        });        
    } 
    this.logout = function(){
        Session.close();
    }
}

angular.module('app').service('Dashboard', Dashboard); 
 