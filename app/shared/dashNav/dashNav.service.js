

/****************************************************************************
 *  Dashboard Navigation Service
 ********************************************/

var DashNav = function() {   

    // Default init section
    var currentSection =  4;
    var level = undefined;

    // Section in dashboard Panel 
    var sections; 

    this.reset = function(){ 
        sections = [
            { name: "Mis Casos",   view: 'case-container',   sectionlevel: 2,  icon: 'notifications_none'	},
            { name: "Datos",       view: 'data-container',   sectionlevel: 2,  icon: 'lightbulb_outline'	},
            { name: "Agentes",     view: 'agent-container',  sectionlevel: 1,  icon: 'perm_identity' },
            { name: "Reportes",    view: 'report-container', sectionlevel: 3,  icon: 'show_chart'	}
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