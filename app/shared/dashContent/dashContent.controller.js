/*****************************************************************
 * Dashboard Content Component
 */

function dashContentController($scope, $element, $attrs, DashNav, DashContent){  

    // Detect when dashboard section changes
    getNavData();
    $scope.$on('getCurrentSection', (event, data) => {
       getNavData();
    });

    function getNavData(){
        $scope.$ctrl.sections = DashNav.getSections(); 
        $scope.$ctrl.currentSection = DashNav.getCurrentSection();
    }
}
  
angular.module('app').component('dashContent', {
    templateUrl: 'app/shared/dashContent/dashContent.view.html',
    controller: dashContentController,
    bindings: {
    }, 
});

