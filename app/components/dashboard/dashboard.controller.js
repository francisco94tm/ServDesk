(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $window, $sce, System, NavPanel, Alert, Requirement, Utils, xPopup, Dashboard){
		
		// Check of session exist otherwise redirect to Login  ------------------------------------

		if(!Dashboard.sessionExists())
			$window.location = "#"; 
		else
			loadDashboard(); 
		
		// Session exists, load dashboard ----------------------------------------------------------		
		function loadDashboard(){
					
			$scope.data = {};			
			$scope.options = {};
			
			// Load session data
			Dashboard.getSessionData().then(function(response){
				// Load services
				$scope.NavPanel = NavPanel;
				$scope.Requirement = Requirement;
				$scope.Alert = Alert;
				$scope.xPopup = xPopup;

				$scope.session = response; 
				NavPanel.addSection(response);					
				Requirement.setClient(response.id); 
			}); 
			
			Alert.load().then(function(response){ 
				Alert.setMaxId(response.data.maxId);
				Alert.setData(response.data.info); 
			});
			 
			// Load catalogues
			$scope.catalogues = [
				"theme", "request", 
				"threatImpact", "threatInterest", "threatType", "threatExists", "threatCapacity",
				"infrastructureVulnerability", "assetRepository", "agentThreat",
				"status", "agent", "caseType", "registerMedium", "job",
			];
			angular.forEach($scope.catalogues, function(val, id){
				getTableData(val);
			});
			console.log($scope.options)

			function getTableData(val){
				System.call('getTableData', {'table': val}).then(function(response){ 
					if(response.data.error[0] !== "")
						console.log(response.data.error[0]);
					$scope.options[val] = response.data.info;
				});				
			}	   
		}
	};
 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$window', '$sce', 'System', 'NavPanel', 'Alert', 'Requirement', 'Utils', 'xPopup', 'Dashboard'];

}());