
/*****************************************************************
 * request Component
 */

function reportContainerController($scope, $element, $attrs, $rootScope, ReportContainer, Chart, System, moment, Dashboard){ 
    
    // Radar cases chart
    Dashboard.getCatalogues(['request']).then(data => { 
        $scope.pie = {};
        $scope.pie.data = [
            data.request[0].items.length,
            data.request[1].items.length,
            data.request[2].items.length,
            data.request[3].items.length
        ]; 
        $scope.pie.labels = ["Abiertos", "En progreso", "Solucionados", "Cancelados"];   
    });   


    $scope.radar = {};
    $scope.radar.labels = ["Impacto", "Ocurrencia", "Probabilidad"]; 
    $scope.radar.options = {
        title: {
            display: true,
            fontFamily: "Walfork",
            fontSize: 20,
            text: "Tipo de amenazas"
        }, 
    };

    $scope.line = {};
    $scope.line.options = {
        title: {
            display: true,
            fontFamily: "Walfork",
            fontSize: 20,
            text: "Impacto"
        }, 
    };

    
    function media(arr){
        var prom = 0; 
        angular.forEach(arr, val => {
            prom += val;
        });
        return prom / arr.length;
    };

    function normalize(data){
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

    var a = [];
    var t = [];
    var o = [];
     
    function analysis(data){ 
        
        var obj = {
            amb : [],
            tec : [],
            org : []
        }; 
        data = normalize(data);
        
        if(data.length == 0)
            return{
                amb : 0,
                tec : 0,
                org : 0
            };

        angular.forEach(data, (val, id) => { 
            angular.forEach(val.threatType, (v, i) => {                
                switch(v.name){
                    case "Ambiental":
                        obj.amb.push(v.impact * v.ocurrences);
                        break;
                    case "Tecnológica":
                        obj.tec.push(v.impact * v.ocurrences);
                        break;
                    case "Organizacional":
                        obj.org.push(v.impact * v.ocurrences);
                        break;
                }
            });
        }); 
        obj.amb = media(obj.amb);
        obj.tec = media(obj.tec);
        obj.org = media(obj.org); 
        return obj;
    }

    $scope.line.series = ["Ambiental", "Tecnológica", "Organizacional"];
    $scope.line.labels = [ 
        moment().subtract(2, "months").format('MMMM'),
        moment().subtract(1, "months").format('MMMM'),
        moment().format('MMMM')
    ]; 
    $scope.line.data = [];

    System.call('getRiskCalculation', {from: '-2 months', to: '-1 months'}).then(r1 => { 
        // console.log(response.data);
        var x = analysis(r1.data);  
        a.push(isNaN(x.amb) ? 0 : x.amb); 
        t.push(isNaN(x.tec) ? 0 : x.tec); 
        o.push(isNaN(x.org) ? 0 : x.org); 

        System.call('getRiskCalculation', {from: '-1 months', to: '0 months'}).then(r2 => {
            
            var x = analysis(r2.data);  
            a.push(isNaN(x.amb) ? 0 : x.amb); 
            t.push(isNaN(x.tec) ? 0 : x.tec); 
            o.push(isNaN(x.org) ? 0 : x.org); 

            $scope.$ctrl.d = normalize(r2.data);
            // // Chart by asset
            $scope.$watch('asset', (data) => {    
                $scope.radar.series = [];
                $scope.radar.data = [];
                if(data == undefined)
                    return;
                angular.forEach(data.threatType, (val, id) => {
                    $scope.radar.series.push(val.name); // Add new serie;
                    $scope.radar.data.push([val.impact, val.ocurrences, (val.probability/10)]);
                }); 
            }); 

            System.call('getRiskCalculation', {from: '0 months', to: '1 months'}).then(r3 => {
                // console.log(response.data);
                var x = analysis(r3.data); 
                a.push(isNaN(x.amb) ? 0 : x.amb);
                t.push(isNaN(x.tec) ? 0 : x.tec); 
                o.push(isNaN(x.org) ? 0 : x.org);  
                $scope.line.data.push(a,t,o);                  
            }); 
        });         
    });

    

  
};

angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});