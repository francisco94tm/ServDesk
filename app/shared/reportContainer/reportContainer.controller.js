
/*****************************************************************
 * request Component
 */

function reportContainerController($scope, $element, $attrs, ReportContainer){   
 
    ReportContainer.getReport().then(response => {
        console.log(response.data);
        $scope.$ctrl.data = response.data;
    });
}
 
angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});