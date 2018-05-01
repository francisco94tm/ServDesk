
  
/*****************************************************************
 * Search Component
 */

function searchController($scope, $element, $attrs){  
    // $scope.$ctrl.label = ($scope.$ctrl.label == undefined) ? 'Buscar' : $scope.$ctrl.label;
}
 
angular.module('app').component('xsearch', {
    templateUrl: 'app/shared/xSearch/xSearch.view.html',
    controller: searchController,
    bindings: {
        'ngModel': '=',
        'label': '='
    }, 
});