/*****************************************************************
 * request Component
 */

function settingsContainerController($scope, $element, $attrs, $window, DashNav, Session){  
    $scope.$ctrl.logout = () => {        
        Session.close().then(data => {
            // console.log(data);
            $window.location = "#"; 
            DashNav.reset();
        }); 
    };
}
 
angular.module('app').component('settingsContainer', {
    templateUrl: 'app/shared/settingsContainer/settingsContainer.view.html',
    controller: settingsContainerController,
    bindings: {  }, 
});