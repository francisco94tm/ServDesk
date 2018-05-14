
/*****************************************************************
 * request Component
 */

function caseContainerController($scope, $element, $attrs, Session){  
     // Search variable
    $scope.$ctrl.search = "";
    $scope.$ctrl.Session = Session;
}
 
angular.module('app').component('caseContainer', {
    templateUrl: 'app/shared/caseContainer/caseContainer.view.html',
    controller: caseContainerController,
    bindings: {} 
});