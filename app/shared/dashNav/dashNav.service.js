

/****************************************************************************
 *  Dashboard Navigation Service
 ********************************************/

var DashNav = function() {   

    // Default init section
    var currentSection =  0;
    var level = undefined;  
    var sections; 

    this.reset = function(){ 
        currentSection =  0;
        level = undefined;
        sections = [
            { name: "Mis Casos",   view: 'case-container',   level: 4,  icon: 'notifications_none'	},
            { name: "Datos",       view: 'data-container',   level: 3,  icon: 'lightbulb_outline'	},
            { name: "Agentes",     view: 'agent-container',  level: 1,  icon: 'perm_identity' },
            { name: "Reportes",    view: 'report-container', level: 4,  icon: 'show_chart'	}
        ];
    };
    
    // Add a section to Dash Nav
    this.addSection = function(obj){   
        sections.push(obj);
    }

    // Get section items
    this.getSections = function(){ 
        return sections;
    } 

    this.getLevel = function(){
        return level;
    };

    this.setLevel = function(l){
        level = l;
    };


    // Get index of current nav section
    this.getCurrentSection = function(){ 
        return currentSection;
    }

    // Set index of current nav section
    this.setCurrentSection = function(cs){
        currentSection = cs;
    }
}

angular.module('app').service('DashNav', DashNav); 