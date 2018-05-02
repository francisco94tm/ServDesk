(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, Dashboard, Session){
		
		$scope.Session = Session; 

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
		}   
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'Dashboard', 'Session', '$interval'];

}());