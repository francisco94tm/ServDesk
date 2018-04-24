/****************************************************************************
 *  CaseItem Service
 ********************************************/

var AgentItem = function(System){  

    var priorityClass = {
        1:  'low-priority',
        2:  'medium-priority',
        3:  'high-priority',
        4:  'very-high-priority',
        0:  'non-priority'
    };
  
    this.setMaxId = mi => {
        this.maxId = mi;
    }

    this.getMaxId = () => {
        return this.maxId;
    } 

    this.getPriorityClass = (id) =>{
        return priorityClass[id];
    }
}


angular.module('app').service('AgentItem', AgentItem); 