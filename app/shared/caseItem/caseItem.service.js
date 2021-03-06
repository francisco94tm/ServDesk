/****************************************************************************
 *  CaseItem Service
 ********************************************/

var CaseItem = function(System){  
    var priorityClass = {
        1:  'low-priority',
        2:  'medium-priority',
        3:  'high-priority',
        4:  'very-high-priority',
        0:  'non-priority'
    }; 
    this.getPriorityClass = (id) =>{
        return priorityClass[id];
    }
}


angular.module('app').service('CaseItem', CaseItem); 