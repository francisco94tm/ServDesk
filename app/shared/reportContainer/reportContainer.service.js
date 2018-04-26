/****************************************************************************
 *  ReportContainer Service
 ********************************************/

var ReportContainer = function(System){
    
    var data;

    this.getReport = function(){
        return System.call('getRiskCalculation');
    };
}


angular.module('app').service('ReportContainer', ReportContainer); 