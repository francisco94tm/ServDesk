
/*****************************************************************
 *  x Select Component
 */

function xToastController($scope, $element, $attrs, xToast, $timeout, $rootScope){   
    $scope.$ctrl.xToast = xToast;
    $scope.$ctrl.xToast.display = false;

    $scope.$ctrl.timeout = 5000; 
    var undo = false;

    $scope.$on('openToast', function(scope, data){
        $timeout(()=>{
            xToast.show();
            xToast.data = data;
            $timeout(()=>{
                xToast.hide();
                if(!undo)
                    $rootScope.$broadcast("undo", false);
            }, $scope.$ctrl.timeout);
        }, 500);        
    });
    
    $scope.$on('closeToast', function(){
        xToast.hide();
    });

    $scope.$ctrl.undo = function(){
        undo = true;
        $rootScope.$broadcast("undo", true);
    }   
 
}
  
angular.module('app').component('xtoast', {
    templateUrl: 'app/shared/xToast/xToast.view.html',
    controller: xToastController,
    bindings: { 
    }, 
    replace: true
});
