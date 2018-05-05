
/*****************************************************************
 * request Component
 */

function reportContainerController($scope, $element, $attrs, $rootScope, ReportContainer, Chart){ 
    
    ReportContainer.getReport().then(response => {            
        $scope.$ctrl.d = ReportContainer.normalize(response.data);
        console.log($scope.$ctrl.d);

        // Loop through assets 
        // $scope.$ctrl.data = response.data;
    });

    $scope.labels =["Impact", "Ocurrences", "Probability"];  
};

angular.module('app').component('reportContainer', {
    templateUrl: 'app/shared/reportContainer/reportContainer.view.html',
    controller: reportContainerController,
    bindings: { }, 
});