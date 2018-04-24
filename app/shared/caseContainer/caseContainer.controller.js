
/*****************************************************************
 * request Component
 */

function caseContainerController($scope, $element, $attrs){  
    // Search variable
    $scope.$ctrl.search = "";
}
 
angular.module('app').component('caseContainer', {
    templateUrl: 'app/shared/caseContainer/caseContainer.view.html',
    controller: caseContainerController,
    bindings: {} 
});