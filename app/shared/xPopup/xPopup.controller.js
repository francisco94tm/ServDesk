
/*****************************************************************
 *  x Select Component
 */

function xPopupController($scope, $element, $attrs, xPopup){   
    $scope.$ctrl.display = xPopup.display; 

    $scope.$on('openPopup', function(data){
        $scope.$ctrl.display = true;
        xPopup.display = false;
    });
    
    $scope.$on('closePopup', function(data){
        $scope.$ctrl.display = true;
        xPopup.display = true;
    });
}
  
angular.module('app').component('xpopup', {
    templateUrl: 'app/shared/xPopup/xPopup.view.html',
    controller: xPopupController,
    bindings: { 
    }, 
    replace: true
});
