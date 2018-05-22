
/*****************************************************************
 * request Component
 */

function reportContainerController($scope, $element, $attrs, $rootScope, ReportContainer, Chart, System, moment, CaseItemList, Utils){ 
    
    $scope.$ctrl.CaseItemList = CaseItemList;  
 
    ReportContainer.getResponseTime().then(response => { 
        console.log(response.data);
        $scope.$ctrl.solutionTime = response.data.solutionTime;
        $scope.$ctrl.attentionTime = response.data.attentionTime;
        $scope.$ctrl.today = new Date();
    }); 

    /* --------------------------------------------------------- */

    /**
     *  Resumen de casos
     */

    $scope.$ctrl.pie = {};    
    $scope.$ctrl.pie.data = [];
    $scope.$ctrl.pie.labels = ["Abiertos", "En progreso", "Solucionados", "Cancelados"];   

    $scope.$on('drawPieChart', (event, data) => {  
        $scope.$ctrl.pie.data = CaseItemList.getQuantity();
    });

    
    /* --------------------------------------------------------- */
    
    /**
     * Resumen por infraestructura
     */
    $scope.$ctrl.radar = {};
    $scope.$ctrl.radar.labels = ["Impacto", "Ocurrencia", "Probabilidad"]; 
    $scope.$ctrl.radar.options = {
        title: {
            display: true,
            fontFamily: "Walfork",
            fontSize: 20,
            text: "Tipo de amenazas"
        }, 
    };

    
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
 

    var a = [];
    var t = [];
    var o = [];
     
    function analysis(data){ 
        
        var obj = {
            amb : [],
            tec : [],
            org : []
        }; 
        data = ReportContainer.normalizeRiskData(data);
        
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
        obj.amb = Utils.media(obj.amb);
        obj.tec = Utils.media(obj.tec);
        obj.org = Utils.media(obj.org); 
        return obj;
    }

    $scope.$ctrl.line.series = ["Ambiental", "Tecnológica", "Organizacional"];
    $scope.$ctrl.line.labels = [ 
        moment().subtract(2, "months").format('MMMM'),
        moment().subtract(1, "months").format('MMMM'),
        moment().format('MMMM')
    ]; 
    $scope.$ctrl.line.data = [];


    
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

            $scope.$ctrl.d = ReportContainer.normalizeRiskData(r2.data);
            // // Chart by asset
            $scope.$watch('asset', (data) => {    
                $scope.$ctrl.radar.series = [];
                $scope.$ctrl.radar.data = [];
                if(data == undefined)
                    return;
                angular.forEach(data.threatType, (val, id) => {
                    $scope.$ctrl.radar.series.push(val.name); // Add new serie;
                    $scope.$ctrl.radar.data.push([val.impact, val.ocurrences, (val.probability/10)]);
                }); 
            }); 

            System.call('getRiskCalculation', {from: '0 months', to: '1 months'}).then(r3 => {
                // console.log(response.data);
                var x = analysis(r3.data); 
                a.push(isNaN(x.amb) ? 0 : x.amb);
                t.push(isNaN(x.tec) ? 0 : x.tec); 
                o.push(isNaN(x.org) ? 0 : x.org);  
                $scope.$ctrl.line.data.push(a,t,o);                  
            }); 
        });         
    });

    

  
};

angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});