/****************************************************************************
 *  xPopup Service
 ********************************************/

var xPopup = function($sce){

    this.display = false;
    this.data = {
        title: "Cargando...",
        id: undefined,
        description: "",
        yes_no: false,
        promise: undefined
    };


    this.show = function(){        
        this.display = true; 
    }

    this.hide = function(){
        this.display = false;
    }

    this.isHidden = function(){ 
        return this.display == false;
    }

    this.isShown = function(){ 
        return this.display == true; 
    }

    this.setId = function(i){
        this.data.id = i;
    }

    this.getId = function(){
        return this.data.id;
    }

    this.setTitle = function(t){
        this.data.title = t;
    }

    this.getTitle = function(){
        return this.data.title;
    }

    this.setDescription = function(t){
        this.data.description = t;
    }

    this.getDescription = function(){
        return this.data.description;
    }

    this.setYESNO = function(yn){
        this.data.yes_no = yn;
    }

    this.getYESNO = function(){
        return this.data.yes_no;
    }
}

angular.module('app').service('xPopup', xPopup); 