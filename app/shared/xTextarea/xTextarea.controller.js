/*****************************************************************
 * x Input Component
 */
function xTextareaController($scope, $element, $attrs){ 
    $scope.limitKeypress = function ($event, value, maxLength) {
        if(maxLength == undefined)
            return; 
        if (value != undefined && value.toString().length >= maxLength) {
            $event.preventDefault();
        }
    } 
}

angular.module('app').component('xtextarea', {
    templateUrl: 'app/shared/xTextarea/xTextarea.view.html',
    controller: xTextareaController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=?', 
        'placeholder': '@',
        'class': '@',
        'maxLength': '@?',
        'minLength': '@?',
    }, 
    replace: true
});

