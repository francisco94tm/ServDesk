
  
/*****************************************************************
 * Search Component
 */

function searchController($scope, $element, $attrs){ 
}
 
angular.module('app').component('search', {
    templateUrl: 'app/shared/search/search.view.html',
    controller: searchController,
    bindings: {
        'ngModel': '='
    }, 
});