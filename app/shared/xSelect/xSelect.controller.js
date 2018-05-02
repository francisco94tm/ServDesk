
/*****************************************************************
 *  x Select Component
 */

function xselectController($scope, $element, $attrs){  
    // Flag to know whether the dialog is opened or closed
    $scope.$ctrl.isOpened = false;
    $scope.$ctrl.defaultSelected = false;

    // $element.ready(function(){
    //     $scope.$apply(function(){  
    //         $timeout(function(){
    //             if($scope.$ctrl.itemSelected != undefined){             
    //                 angular.forEach($scope.$ctrl.options, function(val, id){                                            
    //                     if(val.id ==  $scope.$ctrl.itemSelected){ 
    //                         console.log(val.id)
    //                         $scope.$ctrl.ngModel = val;
    //                         return -1;
    //                     }
    //                 }); 
    //             }
    //         },200);            
    //     });
    // }); 
 
    $scope.$ctrl.getSelected =  function(){   
        if($scope.$ctrl.itemSelected == undefined)
            return;

        // if($scope.$ctrl.defaultSelected)
        //     return; 
        // $scope.$ctrl.defaultSelected = true;
        angular.forEach($scope.$ctrl.options, function(val, id){                                            
            if(val.id ==  $scope.$ctrl.itemSelected){  
                $scope.$ctrl.ngModel = val;
                return -1;
            }
        });  
    };

    // Shuffle open / close dialog function
    $scope.$ctrl.shuffle = function(obj){    
        if($scope.$ctrl.disabled)
            return; 
        $scope.$ctrl.isOpened = !$scope.$ctrl.isOpened;        
        if(obj == undefined)
            return; 
        $scope.$ctrl.ngModel = obj;
    };
    // Close dialog function
    $scope.$ctrl.close = function(){ 
        $scope.$ctrl.isOpened = false;
    };
}
  
angular.module('app').component('xselect', {
    templateUrl: 'app/shared/xSelect/xSelect.view.html',
    controller: xselectController,
    bindings: {
        'label': '@',
        'options': '=',
        'ngModel': '=?',
        'disabled': '=',
        'itemSelected': '@',
        'filter': '@'
    }, 
    replace: true
});
