/*****************************************************************
 * Dash Nav Component
 */

function dashNavController($scope, $element, $attrs, $timeout, DashNav, $rootScope){ 
    
    $scope.$ctrl.DashNav = DashNav;  
    DashNav.reset();
    
    // Stablish default init section
    $rootScope.$broadcast('getCurrentSection');
    
    // ALert to DashContent that current section has changed
    $scope.$ctrl.setCurrentSection = (n) => { 
        DashNav.setCurrentSection(n);
        $rootScope.$broadcast('getCurrentSection');
    }
    
    // Detect if a new section has to be added to the dash-nav
    $scope.$on('addSectionToNav', (event, data) => {
        console.log(data);
        DashNav.addSection(data);
        DashNav.setLevel(data.sectionlevel);        
    })
}
 
angular.module('app').component('dashNav', {
    templateUrl: 'app/shared/dashNav/dashNav.view.html',
    controller: dashNavController,
    bindings: {}
});

