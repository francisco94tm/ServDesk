
var Login = function(Session) {     
    this.ALLOW_TO_LOGIN = 1;
    this.NON_EXISTENT_USER = -1;
    this.WRONG_PASSWORD = 0;

    // Verify if session exist
    this.sessionExists = function(){
        return Session.isSet().then(function(response){ 
            return response.data !== 'FALSE';
        });
    }
}

angular.module('app').service('Login', Login); 
 