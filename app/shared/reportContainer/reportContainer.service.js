/****************************************************************************
 *  ReportContainer Service
 ********************************************/

var ReportContainer = function(System, Dashboard){  

    this.catalogues = undefined;
    this.traduction = undefined;

    this.loadTraductions = function(){
        Dashboard.getCatalogues(["threatInterest", "threatExists", "threatImpact"]).then(response => { 
            this.catalogues = response; 
        }); 
    }
  
   this.fixOcurrence = function(data){
       if(this.catalogues == undefined)
            return "";
        angular.forEach(this.catalogues.threatInterest, (obj, id) => {
            if(data >= obj.lowerValue*1 && data <= obj.upperValue*1){
                this.traduction = obj.probability;
                return -1;
            }
        });
        return this.traduction;
    }
    this.fixProbability = function(data){
        if(this.catalogues == undefined)
            return "";
        angular.forEach(this.catalogues.threatExists, (obj, id) => {
            if(data >= obj.lowerValue*1 && data <= obj.upperValue*1){
                this.traduction = obj.probability;
                return -1;
            }
        });
        return this.traduction;
    }
    this.fixImpact = function(data){
        if(this.catalogues == undefined)
            return "";
        angular.forEach(this.catalogues.threatImpact, (obj, id) => {
            if(data >= obj.lowerValue*1 && data <= obj.upperValue*1){
                this.traduction = obj.impactLevel;
                return -1;
            }
        });
        return this.traduction;
    } 

    this.getResponseTime = function(){
       return System.call('getResponseTime');
    }
 
    this.analysis = function(data){
        var obj = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        var cont_amb = 0;
        var cont_tec = 0;
        var cont_org = 0;
      
        if(data == undefined)
            return obj; 

        angular.forEach(data.threatType, (v, i) => {
            switch(v.name){
                case "Ambiental":
                    obj[0][0] += v.impact;
                    obj[0][1] += v.ocurrences;
                    obj[0][2] += v.probability;
                    cont_amb++;
                    break;
                case "Tecnológica":
                    obj[1][0] += v.impact;
                    obj[1][1] += v.ocurrences;
                    obj[1][2] += v.probability;
                    cont_tec++;
                    break;
                case "Organizacional":
                    obj[2][0] += v.impact;
                    obj[2][1] += v.ocurrences;
                    obj[2][2] += v.probability;
                    cont_org++;
                    break;
            }
        }); 

        cont_amb = (cont_amb == 0) ? 1 : cont_amb;
        cont_tec = (cont_tec == 0) ? 1 : cont_tec;
        cont_org = (cont_org == 0) ? 1 : cont_org;
        
        for(let i=0; i<3; i++){
            obj[0][i] /= (cont_amb * 10);
            obj[1][i] /= (cont_tec * 10);
            obj[2][i] /= (cont_org * 10);
        }   
        return obj;    
    }
    

    // Normalize data obtained from Risk class
    this.normalizeRiskData = function(data){ 
        var assets = [];
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
                tt.impact = val2.impact/10;
                tt.ocurrences = val2.ocurrences/10;
                tt.probability = val2.probability/10;
                tt.agentThreat = []; 
                // Loop through agent threats 
                for (var key3 in val2.agentThreats) 
                {   
                    if(!val2.agentThreats.hasOwnProperty(key3)) continue;
                    var val3 = val2.agentThreats[key3];  
                    var at = {};
                    at.name = key3;
                    at.ocurrences = val3.ocurrences/10;
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