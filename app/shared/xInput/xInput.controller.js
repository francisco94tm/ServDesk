

/*****************************************************************
 * x Input Component
 */
function xinputController($scope, $element, $attrs){ 
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';
    $scope.$ctrl.disabled = $scope.$ctrl.disabled || false;
}

angular.module('app').component('xinput', {
    templateUrl: 'app/shared/xInput/xInput.view.html',
    controller: xinputController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=',
        'type': '@', 
        'placeholder': '@',
        'class': '@'
    }, 
    replace: true
});