var Session = function(System) { 
    
    this.session = {
        name: undefined,
        firstLastname: undefined,
        secondLastname: undefined,
        email: undefined,
        id: undefined,
        status: undefined,
        user: undefined,
        level:undefined
    } 
    
    this.isSet = function(){
        var flag;
        var _this = this;
        return System.call('getLoginStatus');
    }

    // Setters
    this.setName = function(name){
        this.session.name = name;
    }
    this.setFirstLastname = function(firstLastname){
        this.session.firstLastname = firstLastname;
    }
    this.setSecondLastname = function(secondLastname){
        this.secondLastname = secondLastname;
    }
    this.setEmail = function(email){
        this.session.email = email;
    }
    this.setId = function(id){
        this.session.id = id;
    }
    this.setStatus = function(status){
        this.status = status;
    } 
    this.setUser = function(user){
        this.session.user = user;
    }
    this.setLevel = function(level){
        this.session.level = level;
    }
    this.setData = function(data){        
        this.session.name = data.name;
        this.session.firstLastname = data.firstLastname;
        this.session.secondLastname = data.secondLastname;
        this.session.email = data.email;
        this.session.id = data.id;
        this.session.status = data.status;
        this.session.user = data.usr;
        this.session.level = data.level; 
    }
    
    // Getters
     // Getters
     this.getName = function(){
        return this.session.name;
    }
    this.getFirstLastname = function(){
        return this.session.firstLastname;
    }
    this.getSecondLastname = function(){
        return this.session.secondLastname;
    }
    this.getEmail = function(){
        return this.session.email;
    } 
    this.getId = function(){
        return this.session.id;
    }
    this.getStatus = function(){
        return this.session.status;
    }
    this.getUser = function(){
        return this.session.user;
    }
    this.getLevel = function(){
        return this.session.level;
    }
    this.getData = function(){
        var _this = this;
        return System.call('getLoginStatus').then(function(response){  
            if(response.data !== false){
                _this.setData(response.data);
                return response.data;
            } 
            return _this.session; 
        }); 
    } 

    this.close = function(){
        System.call('logout').then(function(response){

        });
    }
}

angular.module('app').service('Session', Session); 
 