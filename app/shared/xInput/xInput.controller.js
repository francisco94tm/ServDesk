

/*****************************************************************
 * x Input Component
 */
function xinputController($scope, $element, $attrs, Validate){ 
    
    // Set default properties
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';    
    $scope.$ctrl.uppercase = $scope.$ctrl.uppercase || false;
    $scope.$ctrl.disabled = $scope.$ctrl.disabled || false; 
    $scope.$ctrl.validModel = $scope.$ctrl.validModel || true;  
    $scope.$ctrl.databaseValidModel = $scope.$ctrl.databaseValidModel || true;  
    $scope.$ctrl.colorize = false;
     
    // Limit press keys
    $scope.limitKeypress = function ($event, value, maxLength) {
        if(maxLength == undefined)
            return; 
        if (value != undefined && value.toString().length >= maxLength) {
            $event.preventDefault();
        }
    }

    $scope.$ctrl.validate = function(){
        
        // There is no data in the input
        if(Validate.isEmpty($scope.$ctrl.ngModel)){
            $scope.$ctrl.validModel = true;
            $scope.$ctrl.colorize = false;
            return;
        }
        switch($scope.$ctrl.type){
            
            // Skip if input type is password or text
            case undefined:
            case 'password':
            case 'text':
                $scope.$ctrl.colorize = true;
                return;

            // Proceed to evaluate regex type
            default:
                var response = Validate.regex($scope.$ctrl.ngModel, $scope.$ctrl.type);
                $scope.$ctrl.validModel = response.status && $scope.$ctrl.databaseValidModel;;
                $scope.$ctrl.colorize = true;
                return (!$scope.$ctrl.databaseValidModel ) ? 'Ya se encuentra registrado.' : response.message;
        }
    };
}

angular.module('app').component('xinput', {
    templateUrl: 'app/shared/xInput/xInput.view.html',
    controller: xinputController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=',
        'type': '@', 
        'placeholder': '@',
        'class': '@',
        'uppercase': '=?',
        'validModel': '=?',
        'databaseValidModel': '=?',
        'maxLength': '@?',
        'minLength': '@?',
    }, 
    replace: true
});