(function(){
	"use strict"; 

	// Login Controller
	var loginCtrl = function($scope, $window) {		 
		$scope.continue = function () { 
			$window.location = "#/dash"; 	
		};
	}; 

	// Inject function
	loginCtrl.$inject = ['$scope', '$window'];
	angular.module('app').controller('loginCtrl', loginCtrl);	
}());