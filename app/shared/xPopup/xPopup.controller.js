
/*****************************************************************
 *  x Select Component
 */

function xPopupController($scope, $element, $attrs, xPopup){   
    $scope.$ctrl.xPopup = xPopup;
    $scope.$ctrl.xPopup.display = false;
    // $scope.$ctrl.display = xPopup.display; 

    $scope.$on('openPopup', function(scope, data){
        console.log(data); 
        xPopup.show();
        xPopup.data = data;
    });
    
    $scope.$on('closePopup', function(){
        xPopup.hide();
    });
 
}
  
angular.module('app').component('xpopup', {
    templateUrl: 'app/shared/xPopup/xPopup.view.html',
    controller: xPopupController,
    bindings: { 
    }, 
    replace: true
});
