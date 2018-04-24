
/*****************************************************************
 * request Component
 */

function caseContentController($scope, $element, $attrs){   
    $scope.$on('displayCase', (event, data) => { 
        $scope.$ctrl.data = data;
    }); 
}
 
angular.module('app').component('caseContent', {
    templateUrl: 'app/shared/caseContent/caseContent.view.html',
    controller: caseContentController,
    bindings: { }, 
});