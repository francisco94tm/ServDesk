(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, System, NavPanel, Alert, Requirement, Client, Agent, Utils, xPopup, Dashboard){
		
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
				$scope.Client = Client;
				$scope.Agent = Agent;
				$scope.xPopup = xPopup;
				$scope.Alert = Alert;			
				
				$scope.session = response; 
				NavPanel.addSection(response);		 
			});     

			Dashboard.getCatalogues().then(function(response){	
				console.log(response.request);				
				$scope.$broadcast('getAlerts', response.request); // going down!			
				$scope.options = response; 
			}); 
			
			$scope.$watch('Agent.data', function(obj){
				console.log(obj);
			}, true);
		}  

		// Logout
		$scope.logout = function(){					
			Dashboard.logout();			
			$window.location = "#"; 
			NavPanel.reset();
		}  


		$scope.saveRequirement = function(){			
			Requirement.save().then(function(response){
				Dashboard.getCatalogues('request').then(function(response){	 		
					$scope.$broadcast('getAlerts', response.request);			
					$scope.options.request = response.request; 
				});  				
				var objeto = {
					title: "Requerimiento registrado",
					id:  response.data.id
				} 
				$scope.$broadcast('openPopup', objeto);	
			});			 
		}

		$scope.saveClient = function(){			
			Client.save().then(function(response){ 	
				console.log(response);		
				var objeto = {
					title: "Cliente registrado",
					id:  response.data.id
				} 
				$scope.$broadcast('openPopup', objeto);	
			});			 
		}

		$scope.saveAgent = function(){			
			Agent.save().then(function(response){ 	
				console.log(response);		
				var objeto = {
					title: "Agente registrado",
					id:  response.data.id
				} 
				$scope.$broadcast('openPopup', objeto);	
			});			 
		}
	}; 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'System', 'NavPanel', 'Alert', 'Requirement', 'Client', 'Agent', 'Utils', 'xPopup', 'Dashboard'];

}());