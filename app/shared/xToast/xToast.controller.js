
/*****************************************************************
 *  x Select Component
 */

function xToastController($scope, $element, $attrs, xToast, $timeout){   
    $scope.$ctrl.xToast = xToast;
    $scope.$ctrl.timeout = 5000; 

    $scope.$on('openToast', function(scope, data){
        $timeout(()=>{
            xToast.show();
            xToast.data = data;
            $timeout(()=>{
                xToast.hide();
            }, $scope.$ctrl.timeout);
        }, 500);        
    });
    
    $scope.$on('closeToast', function(){
        xToast.hide();
    });
 
}
  
angular.module('app').component('xtoast', {
    templateUrl: 'app/shared/xToast/xToast.view.html',
    controller: xToastController,
    bindings: { 
    }, 
    replace: true
});
