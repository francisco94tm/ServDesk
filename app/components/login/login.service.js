
var Login = function() {     
    this.ALLOW_TO_LOGIN = 1;
    this.NON_EXISTENT_USER = -1;
    this.WRONG_PASSWORD = 0;
}

angular.module('app').service('Login', Login); 
 