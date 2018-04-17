/****************************************************************************
 *  xPopup Service
 ********************************************/

var xPopup = function(){

    var display = false;
    var title = undefined;
    var id = undefined;

    this.show = function(){
        display = true;
    }

    this.hide = function(){
        display = false;
    }

    this.isHidden = function(){
        return display == false;
    }

    this.isShown = function(){
        return display == true;
    }

    this.setId = function(i){
        id = i;
    }

    this.getId = function(){
        return id;
    }

    this.setTitle = function(t){
        title = t;
    }

    this.getTitle = function(){
        return title;
    }
}

angular.module('app').service('xPopup', xPopup); 