
/*****************************************************************
 *  x Select Component
 */

function xToastController($scope, $element, $attrs, xToast, $timeout, $rootScope){   
    $scope.$ctrl.xToast = xToast;
    $scope.$ctrl.xToast.display = false; 
    $scope.$ctrl.timeout = 5000;  
    var locked = false;

    $scope.$on('openToast', function(scope, data){
        $timeout(()=>{
            xToast.show();
            data.show_button = (data.show_button == undefined)? true : data.show_button;
            xToast.data = data;
            $timeout(() => {
                if(!locked)
                    xToast.hide();  
            }, $scope.$ctrl.timeout);
        }, 500);        
    });

    $scope.$ctrl.hoverIn = () => locked = true;
    $scope.$ctrl.hoverOut = () => { 
        $timeout(()=>{
            locked = false;  
            xToast.hide(); 
        }, 1000);
    };
    
    $scope.$on('closeToast', function(){
        xToast.hide();
    });

    $scope.$ctrl.undo = function(){ 
        xToast.hide();
        $rootScope.$broadcast("undo");
    }   
 
}
  
angular.module('app').component('xtoast', {
    templateUrl: 'app/shared/xToast/xToast.view.html',
    controller: xToastController,
    bindings: { 
    }, 
    replace: true
});
