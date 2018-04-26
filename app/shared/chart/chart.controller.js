
function chartController($scope, $element, $attrs, Chart){

    $scope.graph = "COTR1"
    
    $scope.$on('drawChart', function(event, data){
        if(data != undefined){ 

            data = data["COTR10"].threatTypes

            var newdata = [];
            angular.forEach(data, (value, key) => {
                newdata.push(
                    {
                        className: key, // optional, can be used for styling
                        axes: [
                            { axis: "impact",      value: value.impact,     yOffset: 15},
                            { axis: "ocurrences",  value: value.ocurrences, xOffset: -10},
                            { axis: "probability", value: value.probability, xOffset: 10}
                        ]
                    }
                );
            });
            Chart.data = newdata;
        }
        Chart.draw(); 
    });    
}
 
angular.module('app').component('chart', {
    templateUrl: 'app/shared/chart/chart.view.html',
    controller: chartController,
    bindings: {}
});

