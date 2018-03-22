(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $sce, System, NavPanel, Alerts, Requirement, Utils, Alertx){
		
		/* Configuration variables */
		System.setRoute('system/system.php'); 
		 
		$scope.data = {};		
		$scope.options = {};

		// Session
		$scope.session = { 			
			id: 1, 
			name : 	"Francisco Trejo",
			icon:	'settings',
			search: "", 	
			theme: 	{
				id: 1,
				value: 'Oscuro',
				url: 'css/default.css'
			},	
		};
 
		NavPanel.addSection($scope.session);
		$scope.NavPanel = NavPanel;
		

		// Load alerts 	
		$scope.Alerts = Alerts;
		$scope.Alertx = Alertx;
		
		Alerts.load().then(function(response){ 
			console.log(response.data.maxId)
			Alerts.setData(response.data.info); 
		});
		  

		// Load catalogues
		$scope.catalogues = [
			"theme", "impact", "priority", "urgency", 
			"status", "agent", "caseType", "registerMedium"
		];
		angular.forEach($scope.catalogues, function(val, id){
			getTableData(val);
		});

		function getTableData(val){
			System.call('getTableData', {'table': val}).then(function(response){
				$scope.options[val] = response.data.info;
			});
		}	 
		
		$scope.Requirement = Requirement;	
		Requirement.setClient($scope.session.id); 

		$scope.data.chart = [
			{
				  className: 'germany', // optional, can be used for styling
				  axes: [
					{axis: "strength", value: 13, yOffset: 10},
					{axis: "intelligence", value: 1},
					{axis: "charisma", value: 8},  
					{axis: "dexterity", value: 4},  
					{axis: "luck", value: 9, xOffset: -20},
					{axis: "luck", value: 9, xOffset: -20},
				  ]
			},
			{
				className: 'México',
				  axes: [
					{axis: "strength", value: 3},
					{axis: "intelligence", value: 15},
					{axis: "charisma", value: 4},  
					{axis: "dexterity", value: 1},  
					{axis: "luck", value: 15},
					{axis: "luck", value: 11},
				  ]
			},
			{
				className: 'argentina',
				  axes: [
					{axis: "strength", value: 5},
					{axis: "intelligence", value: 1},
					{axis: "charisma", value: 16},  
					{axis: "dexterity", value: 10},  
					{axis: "luck", value: 5},
					{axis: "luck", value: 19},
				  ]
			}
			
		];
 
		var colorFunction = function(i) {
			var colorArray = ['#a00041','#d73c4c','#f66d3a','#ffaf59','#ffe185','#ffffbc','#e6f693','#aadea2','#62c3a5','#2c87bf','#5e4ca4'];
			return colorArray[i];
		}
		RadarChart.defaultConfig.color = colorFunction,
		// RadarChart.defaultConfig.radius = 3;
		RadarChart.defaultConfig.w = 400;
		RadarChart.defaultConfig.h = 400;
		RadarChart.defaultConfig.backgroundTooltipColor = "#444";
		RadarChart.defaultConfig.backgroundTooltipOpacity = "1.0";  


		RadarChart.draw(".chart-container", $scope.data.chart);

	};
 

	angular.module('app').controller('dashCtrl', dashCtrl);
	dashCtrl.$inject = ['$scope', '$sce', 'System', 'NavPanel', 'Alerts', 'Requirement', 'Utils', 'Alertx'];

}());