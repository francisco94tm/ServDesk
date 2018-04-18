(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, System, NavPanel, Alert, Requirement, Utils, xPopup, Dashboard){
		
		// Check of session exist otherwise redirect to Login  ------------------------------------
		Dashboard.sessionExists().then(function(response){ 
			if(response == false)
				$window.location = "#"; 
			else loadDashboard(); 
		}); 
		
		// Session exists, load dashboard ----------------------------------------------------------		
		function loadDashboard(){

			// Load catalogues
			$scope.data = {};
			$scope.options = {};			
			 
			// Load session data
			Dashboard.getSessionData().then(function(response){
				
				// Load services
				$scope.NavPanel = NavPanel;
				$scope.Requirement = Requirement; 
				$scope.xPopup = xPopup;
				$scope.Alert = Alert;			
				
				$scope.session = response; 
				NavPanel.addSection(response);		
				
				// $scope.$watch('Requirement.data', function(obj){
				// 	console.log(obj);
				// }, true)
			});     

			Dashboard.getCatalogues().then(function(response){	
				console.log(response.request);				
				$scope.$broadcast('getAlerts', response.request); // going down!			
				$scope.options = response; 
			}); 		  
		}  

		// Logout
		$scope.logout = function(){					
			Dashboard.logout();			
			$window.location = "#"; 
			NavPanel.reset();
		}  


		$scope.saveRequirement = function(){			
			Requirement.save().then(function(response){
				response.data
				var objeto = {
					title: "Requerimiento registrado",
					id:  response.data.id
				}
				console.log(objeto)
				$scope.$broadcast('openPopup', objeto);	
			});			 
		}
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'System', 'NavPanel', 'Alert', 'Requirement', 'Utils', 'xPopup', 'Dashboard'];

}());