/****************************************************************************
 *  NewdataItemList Service
 ********************************************/

var NewdataItemList = function(){
    
    // Default init tab
    var currentTab =  1;
    var level = undefined;
    var data = []; 

    // Tabs in newdata Panel 
    var tabs; 

    this.setData = function(d){
        data = [];
        data = d;
    }

    this.setEmptyData = function(){
        data = []; 
    }

    this.getData = function(){
        return data;
    }

    this.reset = function(){ 
        tabs = [
            { id: 1, name: "cliente",             table: 'client',           tablevel: 2,  icon: 'face'	},
            { id: 2, name: "medio de registro",   table: 'registerMedium',   tablevel: 1,  icon: 'content_paste'	},
            { id: 3, name: "agente de amenaza",   table: 'agentThreat',      tablevel: 1,  icon: 'warning' } 
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
        return currentTab*1;
    }

    this.getCurrentTabName = function(){
        return tabs[currentTab - 1].name;
    };

    // Set index of current nav tab
    this.setCurrentTab = function(cs){
        currentTab = cs*1;
    }
}


angular.module('app').service('NewdataItemList', NewdataItemList); 