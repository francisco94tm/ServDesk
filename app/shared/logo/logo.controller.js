/*****************************************************************
 * Logo Component
 */

function logoController($scope, $element, $attrs){
    switch($attrs.size){
        case 'small':
            $scope.$ctrl.px = 60;
            break;
    } 
}
 
angular.module('app').component('logo', {
    templateUrl: 'app/shared/logo/logo.view.html',
    controller: logoController,
    bindings: {
        'size': '@'
    }
});
