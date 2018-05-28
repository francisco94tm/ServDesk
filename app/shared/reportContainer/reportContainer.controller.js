
/*****************************************************************
 * request Component
 */

function reportContainerController(
    $scope, $element, $attrs, 
    $rootScope, ReportContainer, Chart, 
    System, moment, Utils, 
    Dashboard, $timeout, $q){ 

     
    $scope.$ctrl.CaseItemList = CaseItemList;  
    $scope.$ctrl.ReportContainer = ReportContainer;  
    $scope.tabselected = 0;    
    $scope.$ctrl.pie = {};    
    $scope.$ctrl.pie.data = [];
    $scope.$ctrl.downloading = false;   
    ReportContainer.loadTraductions();

    // Download Excel report ------------------------------------------
    $scope.$ctrl.downloadReport = function(){        
        $scope.$ctrl.downloading = true;
        $timeout(() => {
            $scope.$ctrl.downloading = false; 
        }, 1000);
    };


    // Reload charts ----------------------------------------------------------
    $scope.$on('updateCharts', (event, data) => {
        // Media solution and attention time ---------------------------------
        ReportContainer.getResponseTime().then(response => {  
            $scope.$ctrl.solutionTime = response.data.solutionTime;
            $scope.$ctrl.attentionTime = response.data.attentionTime;
            $scope.$ctrl.today = new Date();
        }); 
        
        // Draw pie chart  ----------------------------------------------------
        Dashboard.getCatalogues(['request']).then(response => { 
            var new_array = [ 
                response.request[0].length,
                response.request[1].length,
                response.request[2].length,
                response.request[3].length,
            ];
            $scope.$ctrl.pie.data = new_array;
 
        }); 
    });

    // Load risk Carlculation per period
    $scope.calcRisk = function(from, to) {
        return System.call('getRiskCalculation', {'from': from, 'to': to});
    } 
    
    
    /* --------------------------------------------------------- */
    /**
     * Resumen por infraestructura
     */
    $scope.$ctrl.radar = {};
    
    $scope.$ctrl.radar.labels = ["Impacto", "Ocurrencia", "Probabilidad"]; 
    $scope.$ctrl.radar.series = ["Ambiental", "Tecnológica", "Organizacional"]; 
    $scope.$ctrl.radar.options = {
        title: {
            display: true,
            fontFamily: "Walfork",
            fontSize: 20,
            text: "Tipo de amenazas"
        }, 
    }; 
    $scope.calcRisk(true, true).then(response => {   
        $scope.$ctrl.d = ReportContainer.normalizeRiskData(response.data); 
    });

    $scope.$watch('$ctrl.asset', function(data){
        if(data == undefined)
            return;
        $scope.$ctrl.radar.data = ReportContainer.analysis($scope.$ctrl.asset);
    });
    
    

    
    /* --------------------------------------------------------- */

    /**
     * Por periodo de tiempo
     */
    $scope.$ctrl.line = {};
    $scope.$ctrl.line.options = {
        title: {
            display: true,
            fontFamily: "Walfork",
            fontSize: 20,
            text: "Impacto"
        }, 
    }; 

   
    // var a = [];
    // var t = [];
    // var o = [];
     

    // // Analyze data
    // $scope.$ctrl.analysis = function(data){  
    //     return ReportContainer.analysis(data);
    // }

    $scope.$ctrl.line.series = ["Ambiental", "Tecnológica", "Organizacional"];
    $scope.$ctrl.line.labels = [ 
        moment().subtract(2, "months").format('MMMM'),
        moment().subtract(1, "months").format('MMMM'),
        moment().format('MMMM')
    ]; 
    
     
   var promises = [];
    promises.push($scope.calcRisk("-2 months", "-1 months").then(response => { return response.data}));
    promises.push($scope.calcRisk("-1 months", "0 months").then(response => { return response.data}));
    promises.push($scope.calcRisk("0 months", "1 months").then(response => { return response.data}));

    $q.all(promises).then(function(response){  
        var data = [];         

        angular.forEach(response, function(obj, id){ 
            data[id] = [];
            var x = ReportContainer.normalizeRiskData(obj);    
            angular.forEach(x, function(o, i){
                data[id].push(ReportContainer.analysis(o));
            });          
        });

        // Loop through months
        var x = [];
        angular.forEach(data, function(month, id){
            // Loop though threat Types
            x[id] = [0,0,0];
            angular.forEach(month, function(obj, i){ 
                x[id][0] += obj[0][0]*1+obj[0][1]*1+obj[0][2]*1;
                x[id][1] += obj[1][0]*1+obj[1][1]*1+obj[1][2]*1;
                x[id][2] += obj[2][0]*1+obj[2][1]*1+obj[2][2]*1;
            });
        })
        $scope.$ctrl.line.data = x;
        console.log(x);
        
        // console.log(response); 
    });


    // $scope.$ctrl.line.data = [];
    
    // System.call('getRiskCalculation', {from: '-2 months', to: '-1 months'}).then(r1 => { 
    //     // console.log(response.data);
    //     var x = analysis(r1.data);  
    //     a.push(isNaN(x.amb) ? 0 : x.amb); 
    //     t.push(isNaN(x.tec) ? 0 : x.tec); 
    //     o.push(isNaN(x.org) ? 0 : x.org); 

    //     System.call('getRiskCalculation', {from: '-1 months', to: '0 months'}).then(r2 => {
            
    //         var x = analysis(r2.data);  
    //         a.push(isNaN(x.amb) ? 0 : x.amb); 
    //         t.push(isNaN(x.tec) ? 0 : x.tec); 
    //         o.push(isNaN(x.org) ? 0 : x.org); 

    //         $scope.$ctrl.d = ReportContainer.normalizeRiskData(r2.data);
    //         // // Chart by asset
    //         $scope.$watch('asset', (data) => {    
    //             $scope.$ctrl.radar.series = [];
    //             $scope.$ctrl.radar.data = [];
    //             if(data == undefined)
    //                 return;
    //             angular.forEach(data.threatType, (val, id) => {
    //                 $scope.$ctrl.radar.series.push(val.name); // Add new serie;
    //                 $scope.$ctrl.radar.data.push([val.impact, val.ocurrences, (val.probability/10)]);
    //             }); 
    //         }); 

    //         System.call('getRiskCalculation', {from: '0 months', to: '1 months'}).then(r3 => {
    //             // console.log(response.data);
    //             var x = analysis(r3.data); 
    //             a.push(isNaN(x.amb) ? 0 : x.amb);
    //             t.push(isNaN(x.tec) ? 0 : x.tec); 
    //             o.push(isNaN(x.org) ? 0 : x.org);  
    //             $scope.$ctrl.line.data.push(a,t,o);                  
    //         }); 
    //     });         
    // });   
};

angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});