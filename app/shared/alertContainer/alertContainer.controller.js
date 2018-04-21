/*****************************************************************
 * Alert Container Component
 */

function alertContainerController($scope, $element, $attrs, Alert){  
    $scope.$on('getAlerts', function (event, data) {  
        $scope.$ctrl.data = data;  
    });
    $scope.$ctrl.Alert = Alert; 
}
 
angular.module('app').component('alertContainer', {
    templateUrl: 'app/shared/alertContainer/alertContainer.view.html',
    controller: alertContainerController,
    bindings: {  
        'current': '=', 
        'orderBy': '=',
        'filterBy': '='
    }, 
});
