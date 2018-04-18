/****************************************************************************
 *  xPopup Service
 ********************************************/

var xPopup = function(){

    this.display = false;
    this.title = undefined;
    this.id = undefined;

    this.show = function(){
        
        this.display = true; 
    }

    this.hide = function(){
        this.display = false;
    }

    this.isHidden = function(){
        console.log("esta oculto?");
        return this.display == false;
    }

    this.isShown = function(){
        console.log("visible?");
        return this.display == true;
    }

    this.setId = function(i){
        this.id = i;
    }

    this.getId = function(){
        return this.id;
    }

    this.setTitle = function(t){
        this.title = t;
    }

    this.getTitle = function(){
        return this.title;
    }
}

angular.module('app').service('xPopup', xPopup); 