/*****************************************************************
 * Alert Container Component
 */

function alertContainerController($scope, $element, $attrs, Alert){ 
    $element.ready(function(){
        $scope.$apply(function(){           
            $scope.$ctrl.data =  Alert.getData(); 
        });
    }); 
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
