
  
/*****************************************************************
 * Search Component
 */

function searchController($scope, $element, $attrs){ 
}
 
angular.module('app').component('xsearch', {
    templateUrl: 'app/shared/xSearch/xSearch.view.html',
    controller: searchController,
    bindings: {
        'ngModel': '='
    }, 
});