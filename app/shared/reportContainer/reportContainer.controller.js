
/*****************************************************************
 * request Component
 */

function reportContainerController($scope, $element, $attrs, $rootScope, ReportContainer){   
 
    ReportContainer.getReport().then(response => { 
        $rootScope.$broadcast('drawChart', response.data);
        $scope.$ctrl.data = response.data;
    });
}
 
angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});