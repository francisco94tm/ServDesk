
/*****************************************************************
 *  x Select Component
 */

function xPopupController($scope, $element, $attrs, xPopup, $rootScope){   
    $scope.$ctrl.xPopup = xPopup;
    $scope.$ctrl.xPopup.display = false;
    $scope.$ctrl.xPopup.data.yes_no= false;
    // $scope.$ctrl.display = xPopup.display; 

    $scope.$on('openPopup', function(scope, data){
        console.log(data); 
        xPopup.show();
        xPopup.data = data;
    });
    
    $scope.$on('closePopup', function(){
        xPopup.hide();
    });

    $scope.$ctrl.yes  = function(){
        $rootScope.$broadcast("YES", {'promise': xPopup.data.promise});
        xPopup.hide();
    };
//  
}
  
angular.module('app').component('xpopup', {
    templateUrl: 'app/shared/xPopup/xPopup.view.html',
    controller: xPopupController,
    bindings: { 
    }, 
    replace: true
});
