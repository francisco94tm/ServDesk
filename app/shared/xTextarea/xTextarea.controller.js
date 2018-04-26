/*****************************************************************
 * x Input Component
 */
function xTextareaController($scope, $element, $attrs){  
}

angular.module('app').component('xtextarea', {
    templateUrl: 'app/shared/xTextarea/xTextarea.view.html',
    controller: xTextareaController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=?', 
        'placeholder': '@',
        'class': '@'
    }, 
    replace: true
});

