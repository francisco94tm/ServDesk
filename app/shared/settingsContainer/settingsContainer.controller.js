/*****************************************************************
 * request Component
 */

function settingsContainerController($scope, $element, $attrs, $window, DashNav, CaseItemList, Session, Dashboard, $rootScope){  

    $scope.$ctrl.Session = Session;
    $scope.$ctrl.CaseItemList = CaseItemList;
    
    Dashboard.getCatalogues(['theme']).then(data => {
        $scope.$ctrl.options = data;
    });

    $scope.$ctrl.logout = () => {        
        Session.close().then(data => {
            // console.log(data);
            $window.location = "#"; 
            CaseItemList.data = [];
            $rootScope.$broadcast('displayCase', undefined);
            DashNav.reset();
        }); 
    };
}
 
angular.module('app').component('settingsContainer', {
    templateUrl: 'app/shared/settingsContainer/settingsContainer.view.html',
    controller: settingsContainerController,
    bindings: {  }, 
});