(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, Dashboard, System, xPopup, Session){
		
		$scope.Session = Session;

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
				$scope.$broadcast('addSectionToNav', response); 	 
			});    

			// Load catalogues
			Dashboard.getCatalogues().then(function(response){	 	
				$scope.$broadcast('getCases', response.request);	
				$scope.$broadcast('getAgents', response.agent);	
				$scope.options = response; 
			}); 
		}  

		// // Logout
		// $scope.logout = function(){					
		// 	Dashboard.logout();			
		// 	$window.location = "#"; 
		// 	// NavPanel.reset();
		// }  

		

		// $scope.saveRequirement = function(){			
		// 	Requirement.save().then(function(response){
		// 		Dashboard.getCatalogues('request').then(function(response){	 		
		// 			$scope.$broadcast('getAlerts', response.request);			
		// 			$scope.options.request = response.request; 
		// 		});  				
		// 		var objeto = {
		// 			title: "Requerimiento registrado",
		// 			id:  response.data.id
		// 		} 
		// 		$scope.$broadcast('openPopup', objeto);	
		// 	});			 
		// }

		// $scope.saveClient = function(){			
		// 	Client.save().then(function(response){ 	
		// 		console.log(response);		
		// 		var objeto = {
		// 			title: "Cliente registrado",
		// 			id:  response.data.id
		// 		} 
		// 		$scope.$broadcast('openPopup', objeto);	
		// 	});			 
		// }

		// $scope.saveAgent = function(){			
		// 	Agent.save().then(function(response){ 	
		// 		console.log(response);		
		// 		var objeto = {
		// 			title: "Agente registrado",
		// 			id:  response.data.id
		// 		} 
		// 		$scope.$broadcast('openPopup', objeto);	
		// 	});			 
		// }
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'Dashboard', 'System', 'xPopup'];

}());