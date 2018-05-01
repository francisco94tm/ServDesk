(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, Dashboard){
		
		// $scope.Session = Session;

		// Check of session exist otherwise redirect to Login  ------------------------------------
		Dashboard.sessionExists().then(function(response){ 
			if(response == false)
				$window.location = "#"; 
			else loadDashboard(); 
		}); 
 
		// Session exists, load dashboard ----------------------------------------------------------		
		function loadDashboard(){ 	
			 
			// Load session data
			Dashboard.getSessionData().then(function(response){ 
				$scope.$broadcast('addSectionToNav', response); 	 
			});    

			// Load catalogues
			// Dashboard.getCatalogues().then(function(response){	 	
			// 	$scope.$broadcast('getCases', response.request);	
			// 	$scope.$broadcast('getAgents', response.agent);	
			// 	$scope.options = response; 
			// }); 
		}   
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'Dashboard', 'System', 'xPopup'];

}());