
/*****************************************************************
 * request Component
 */

function caseItemController($scope, $element, $attrs, $rootScope, moment, CaseItem, CaseContent){ 
    
    $scope.$ctrl.CaseItem = CaseItem;
    
    // Select curren case
    $scope.$ctrl.caseItemClick = function(data){ 
        if(CaseContent.isEditModeOn())
            for (var key in CaseContent.data)
                if (CaseContent.data.hasOwnProperty(key))
                    CaseContent.data[key] = CaseContent.backup[key]; 
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