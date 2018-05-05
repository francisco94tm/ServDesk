
function chartController($scope, $element, $attrs, Chart){

    $scope.$ctrl.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

    // $scope.$ctrl.data = [
    //         [65, 59, 90, 81, 56, 55, 40],
    //         [28, 48, 40, 19, 96, 27, 100]
    // ]; 

    // $scope.$ctrl.options = {};

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales",  "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];

    $scope.$ctrl.toggle = function(){
        alert();
        // $scope.data = [200, 100, 700, 20, 800];
    };

    // $scope.graph = "COTR1"
    
    // $scope.$on('drawChart', function(event, data){
    //     if(data != undefined){ 

    //         data = data["COTR10"].threatTypes

    //         var newdata = [];
    //         angular.forEach(data, (value, key) => {
    //             newdata.push(
    //                 {
    //                     className: key, // optional, can be used for styling
    //                     axes: [
    //                         { axis: "impact",      value: value.impact,     yOffset: 15},
    //                         { axis: "ocurrences",  value: value.ocurrences, xOffset: -10},
    //                         { axis: "probability", value: value.probability, xOffset: 10}
    //                     ]
    //                 }
    //             );
    //         });
    //         Chart.data = newdata;
    //     }
    //     Chart.draw(); 
    // });    
}
 
angular.module('app').component('chart', {
    templateUrl: 'app/shared/chart/chart.view.html',
    controller: chartController,
    bindings: {}
});

