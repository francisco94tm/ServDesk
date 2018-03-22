(function() {
	'use strict';

	// Dash Ctrl
	var dashCtrl = function($scope, $sce, System, NavPanel, Alerts, Utils){
		
		/* Configuration variables */
		System.setRoute('system/system.php'); 
		 
		$scope.data = {};		
		$scope.options = {};

		// Session
		$scope.session = { 			 
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
		System.call('getTableData', {'table': 'requerimiento'}).then(function(response){ 
			if(response.data.info == false){
				console.log("No hay registros");
				return;
			}
			Alerts.setData(response.data.info);
		});
  

		// Load catalogues
		$scope.catalogues = [
			"theme", 
			"impact", 
			"priority", 
			"urgency", 
			"status",
			"agent",
			"caseType",
			"registerMedium",
		];
		angular.forEach($scope.catalogues, function(val, id){
			System.call('getTableData', {'table': val}).then(function(response){
				$scope.options[val] = response.data.info;
			});
		});
	
		// Flags
		$scope.alertx = {
			hidden: true
		};

 
		// $scope.options = {
		// 	tema: [
		// 		{ id: 1, name: 'Oscuro', url: "css/dark-theme.css"},
		// 		{ id: 2, name: 'Claro', url: "css/default.css"},
		// 	],
		// 	activo: [ 
		// 		{ id: 1, name: 'Activo 1'}, 
		// 		{ id: 2, name: 'Activo 2'},
		// 	],
		// 	responsable: [ 
		// 		{ id: 1, name: 'Responsable 1'}, 
		// 		{ id: 2, name: 'Responsable 2'},
		// 	],
		// 	status: [ 
		// 		{ id: 1, name: 'Status 1'}, 
		// 		{ id: 2, name: 'Status 2'},
		// 	],
		// 	impacto: [ 
		// 		{ id: 1, name: 'Impacto 1'}, 
		// 		{ id: 2, name: 'Impacto 2'},
		// 	],
		// 	prioridad: [ 
		// 		{ id: 1, name: 'Prioridad 1'}, 
		// 		{ id: 2, name: 'Prioridad 2'},
		// 	],
		// 	urgencia: [ 
		// 		{ id: 1, name: 'Urgencia 1'}, 
		// 		{ id: 2, name: 'Urgencia 2'},
		// 	],
		// };

 
		$scope.newRequirement = function(){		
			$scope.alertx.hidden = false;
		};

		$scope.closeNewRequirementAlert = function(){		
			$scope.data.auxsreq = undefined;
			$scope.alertx.hidden = true;
		};
 

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
	dashCtrl.$inject = ['$scope', '$sce', 'System', 'NavPanel', 'Alerts', 'Utils'];

}());