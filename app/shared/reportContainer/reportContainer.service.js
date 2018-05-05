/****************************************************************************
 *  ReportContainer Service
 ********************************************/

var ReportContainer = function(System){
    
    var data;
    var assets = [];

    this.getReport = function(){
        return System.call('getRiskCalculation');
    };

    this.normalize = function(data){
        for (var key1 in data) 
        {    
            if(!data.hasOwnProperty(key1)) continue;
            var val1 = data[key1];
            var asset = {};
            asset.id = key1; // Get its ID
            asset.name = val1.name; // Get its name
            asset.ocurrences = val1.ocurrences; // Get its ocurrences
            asset.threatType = [];

            // Loop through threat types 
            for (var key2 in val1.threatTypes) 
            {   
                if(!val1.threatTypes.hasOwnProperty(key2)) continue; 
                var val2 = val1.threatTypes[key2];  
                var tt = {};
                tt.name = key2;
                tt.impact = val2.impact;
                tt.ocurrences = val2.ocurrences;
                tt.probability = val2.probability;
                tt.agentThreat = []; 
                // Loop through agent threats 
                for (var key3 in val2.agentThreats) 
                {   
                    if(!val2.agentThreats.hasOwnProperty(key3)) continue;
                    var val3 = val2.agentThreats[key3];  
                    var at = {};
                    at.name = key3;
                    at.ocurrences = val3.ocurrences;
                    at.probability = val3.probability;
                    at.v = val3.v;
                    at.e = val3.e;
                    at.c = val3.c;
                    at.r = val3.R;
                    at.action = val3.action;
                    at.recomendation = val3.recomendation;
                    tt.agentThreat.push(at);
                } 
                asset.threatType.push(tt);
            }
            assets.push(asset);
        } 
        return assets;
    }
}


angular.module('app').service('ReportContainer', ReportContainer); 