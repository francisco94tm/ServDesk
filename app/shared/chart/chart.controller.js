
function chartController($scope, $element, $attrs, Chart){     
    Chart.draw(); 
}
 
angular.module('app').component('chart', {
    templateUrl: 'app/shared/chart/chart.view.html',
    controller: chartController,
    bindings: {}
});

