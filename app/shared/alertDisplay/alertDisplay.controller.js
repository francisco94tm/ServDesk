/*****************************************************************
 * Alert Display Component
 */

function alertDisplayController($scope, $element, $attrs){ 
}
 
angular.module('app').component('alertDisplay', {
    templateUrl: 'app/shared/alertDisplay/alertDisplay.view.html',
    controller: alertDisplayController,
    bindings: {
        'data': '='
    }, 
});

