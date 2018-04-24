
/*****************************************************************
 * request Component
 */

function caseItemController($scope, $element, $attrs, CaseItem, $rootScope){ 
    
    $scope.$ctrl.CaseItem = CaseItem;
    
    // Select curren case
    $scope.caseItemClick = function(data){ 
        var d = ($scope.$ctrl.current == data) ? undefined : data;
        $scope.$ctrl.current = d; 
        $rootScope.$broadcast('displayCase', d);
    }; 
    
    $element.ready(function(){
        $scope.$apply(function(){  
            var ct_id = $scope.$ctrl.data.id_caseType.id;
            $scope.$ctrl.priorityClass = CaseItem.getPriorityClass(ct_id);                    
        });
    });   
}
 
angular.module('app').component('caseItem', {
    templateUrl: 'app/shared/caseItem/caseItem.view.html',
    controller: caseItemController,
    bindings: { 
        data: '=',
        current: '='
    }, 
});