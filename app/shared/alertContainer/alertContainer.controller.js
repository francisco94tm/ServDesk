/*****************************************************************
 * Alert Component
 */

function alertContainerController($scope, $element, $attrs){ 
    // $element.ready(function(){
    //     $scope.$apply(function(){             
    //         $scope.$ctrl.data = Alerts.getData();
    //         console.log(Alerts);
    //     });
    // });
}
 
angular.module('app').component('alertContainer', {
    templateUrl: 'app/shared/alertContainer/alertContainer.view.html',
    controller: alertContainerController,
    bindings: {
        'data': '=',
        'current': '=', 
        'orderBy': '=',
        'filterBy': '='
    }, 
});
