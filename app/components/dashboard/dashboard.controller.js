(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, Session, $timeout){
		$scope.allLoaded = false;
		$scope.Session = Session; 

		// Check if session exist otherwise redirect to Login  ------------------------------------ 
		Session.isSet().then(response => {  
			if(response.data == "FALSE")
				$window.location = "#"; 
			else loadDashboard(); 
		}); 
 
		// Session exists, load dashboard ----------------------------------------------------------		
		function loadDashboard() {			 
			// Load session data
			Session.loadData().then(data => {
				$timeout(function(){
					$scope.$broadcast('addSectionToNav', data);  
					$scope.$broadcast('getCases');   
					$scope.allLoaded = true; 
				});
			}); 
		}   
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', 'Session', '$timeout'];

}());