

/*****************************************************************
 * x Input Component
 */
function xinputController($scope, $element, $attrs, Validate){ 
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';
    $scope.$ctrl.disabled = $scope.$ctrl.disabled || false;  
    $scope.$ctrl.colorize = false;

    if($scope.$ctrl.validModel == undefined)
        $scope.$ctrl.validModel = true;

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
                $scope.$ctrl.validModel = response.status;                
                $scope.$ctrl.colorize = true;
                return response.message;
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
        'validModel': '=?'
    }, 
    replace: true
});