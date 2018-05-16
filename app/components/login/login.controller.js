(function(){
	"use strict"; 

	// Login Controller
	var loginCtrl = function($scope, $window, System, Obj, Login, Session, $timeout) {	
		
		$scope.wrong = undefined;

		// Check of session exist otherwise redirect to Login  ------------------------------------
		Login.sessionExists().then(function(response){ 
			if(response == true)
				$window.location = "#/dash"; 
			else loadLogin(); 
		}); 

		function loadLogin(){
			$scope.loginFields = {
				user: '',
				pass: ''
			};

			// Click on continue button to login
			$scope.continue = function () { 

				$scope.wrong = undefined;

				// Check email and password fields are not empty
				if(!Obj.isFilled($scope.loginFields)){
					alert("Faltan campos por llenar"); // TODO: Change alert to xPopup
					return;
				}
				// Call system to verify credentials
				System.setRoute('system/system.php');
				System.call('login', $scope.loginFields).then(function(response){  
					
					// console.log(response.data);
					
					switch(response.data.instruction){
						case Login.NON_EXISTENT_USER:
							// alert("Usuario no registrado");
							$scope.wrong = true;
							break;
						case Login.WRONG_PASSWORD:
							// alert("Contraseña incorrecta");
							$scope.wrong = true;
							break;
						case Login.ALLOW_TO_LOGIN: 
							$scope.wrong = false;
							Session.setData(response.data.session);
							$timeout(() => {
								$window.location = "#/dash";
							},1000);
							// $window.location = "#/dash";
							break;
						default:
							console.error("Unknown order:");
							console.log(response.data);
					}							
				});	
			};
		}
	}; 

	// Inject function
	loginCtrl.$inject = ['$scope', '$window', 'System', 'Obj', 'Login', 'Session', '$timeout'];
	angular.module('app').controller('loginCtrl', loginCtrl);	
}());