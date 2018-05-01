/****************************************************************************
 *  NewdataItemList Service
 ********************************************/

var NewdataItemList = function(){
    
    // Default init tab
    var currentTab =  0;
    var level = undefined;

    // Tabs in newdata Panel 
    var tabs; 

    this.reset = function(){ 
        tabs = [
            { name: "Clientes",             table: 'client',   tablevel: 2,  icon: 'face'	},
            { name: "Medios de registro",   table: 'registerMedium',   tablevel: 2,  icon: 'content_paste'	},
            { name: "Agentes de amenaza",   table: 'agentThreat',  tablevel: 1,  icon: 'warning' } 
        ];
    };
    
    // Add a tab to Dash Nav
    this.addTab = function(obj){  
        tabs.push(obj);
    }

    // Get tab items
    this.getTabs = function(){ 
        return tabs;
    } 

    this.getLevel = function(){
        return level;
    };

    this.setLevel = function(l){
        level = l;
    };


    // Get index of current nav tab
    this.getCurrentTab = function(){ 
        return currentTab;
    }

    // Set index of current nav tab
    this.setCurrentTab = function(cs){
        currentTab = cs;
    }
}


angular.module('app').service('NewdataItemList', NewdataItemList); 