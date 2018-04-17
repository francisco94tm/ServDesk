/*****************************************************************
 * x Input Component
 */
function xTextareaController($scope, $element, $attrs){ 
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';
}

angular.module('app').component('xTextarea', {
    templateUrl: 'app/shared/xTextarea/xTextarea.view.html',
    controller: xTextareaController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=', 
        'placeholder': '@',
    }, 
    replace: true
});

