
/*****************************************************************
 * Alert Component
 */

function alertController($scope, $element, $attrs, $timeout, Alert){ 
    $scope.alertItemClick = function(data){        
        if($scope.$ctrl.current == data)        
            $scope.$ctrl.current = undefined;
        else{  
            $scope.$ctrl.current  = data;  
        } 
    }; 
    
    $element.ready(function(){
        $scope.$apply(function(){   
            
            // switch($scope.$ctrl.data.priority.id){
            //     case "1":
            //         $scope.$ctrl.priorityClass = 'low-priority';
            //         break;
            //     case "2":
            //         $scope.$ctrl.priorityClass = 'medium-priority';
            //         break;
            //     case "3":
            //         $scope.$ctrl.priorityClass = 'high-priority';
            //         break;
            //     case "4":
            //         $scope.$ctrl.priorityClass = 'very-high-priority';
            //         break;
            //     case "-1":
            //         $scope.$ctrl.priorityClass = 'non-priority';
            //         break;
            // } 
        });
    });   
}
 
angular.module('app').component('alert', {
    templateUrl: 'app/shared/alert/alert.view.html',
    controller: alertController,
    bindings: {
        'data': '<',
        'current': '=' 
    }, 
});