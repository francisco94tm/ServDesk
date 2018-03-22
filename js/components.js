/*****************************************************************
 * Logo Component
 */

function logoController($scope, $element, $attrs){
    switch($attrs.size){
        case 'small':
            $scope.$ctrl.px = 60;
            break;
    } 
}
 
angular.module('app').component('logo', {
    templateUrl: 'js/components/logo.component.html',
    controller: logoController,
    bindings: {
        'size': '@'
    }
});

  
/*****************************************************************
 * Search Component
 */

function searchController($scope, $element, $attrs){ 
}
 
angular.module('app').component('search', {
    templateUrl: 'js/components/search.component.html',
    controller: searchController,
    bindings: {
        'ngModel': '='
    }, 
});


/*****************************************************************
 * Alert Item Component
 */

function alertItemController($scope, $element, $attrs, $timeout){  
    $scope.alertItemClick = function(data){        
        if($scope.$ctrl.current == data)        
            $scope.$ctrl.current = undefined;
        else{  
            $scope.$ctrl.current  = data;  
        } 
    }; 
    
    $element.ready(function(){
        $scope.$apply(function(){  
            switch($scope.$ctrl.data.priority){
                case "1":
                    $scope.$ctrl.priorityClass = 'low-priority';
                    break;
                case "2":
                    $scope.$ctrl.priorityClass = 'medium-priority';
                    break;
                case "3":
                    $scope.$ctrl.priorityClass = 'high-priority';
                    break;
                case "4":
                    $scope.$ctrl.priorityClass = 'very-high-priority';
                    break;
                case "-1":
                    $scope.$ctrl.priorityClass = 'non-priority';
                    break;
            } 
        });
    });   
}
 
angular.module('app').component('alertItem', {
    templateUrl: 'js/components/alert-item.component.html',
    controller: alertItemController,
    bindings: {
        'data': '<',
        'current': '=' 
    }, 
});


/*****************************************************************
 * Alert Container Component
 */

function alertItemContainerController($scope, $element, $attrs){ 
    // $element.ready(function(){
    //     $scope.$apply(function(){             
    //         $scope.$ctrl.data = Alerts.getData();
    //         console.log(Alerts);
    //     });
    // });
}
 
angular.module('app').component('alertItemContainer', {
    templateUrl: 'js/components/alert-item-container.component.html',
    controller: alertItemContainerController,
    bindings: {
        'data': '=',
        'current': '=', 
        'orderBy': '=',
        'filterBy': '='
    }, 
});


/*****************************************************************
 * Alert Display Component
 */

function alertDisplayController($scope, $element, $attrs){ 
}
 
angular.module('app').component('alertDisplay', {
    templateUrl: 'js/components/alert-display.component.html',
    controller: alertDisplayController,
    bindings: {
        'data': '='
    }, 
});


/*****************************************************************
 *  x Select Component
 */

function xselectController($scope, $element, $attrs){  
    // Flag to know whether the dialog is opened or closed
    $scope.$ctrl.isOpened = false;

    $element.ready(function(){
        $scope.$apply(function(){  
            if($scope.$ctrl.itemSelected != undefined){                
                angular.forEach($scope.$ctrl.options, function(val, id){
                    if(val.id == $scope.$ctrl.itemSelected*1){
                        $scope.$ctrl.ngModel = val;
                        return -1;
                    }
                }); 
            }
        });
    }); 

    // Shuffle open / close dialog function
    $scope.$ctrl.shuffle = function(obj){    

        if($scope.$ctrl.disabled)
            return;
 
        $scope.$ctrl.isOpened = !$scope.$ctrl.isOpened;        
        if(obj == undefined)
            return;
        $scope.$ctrl.ngModel = obj;
    };
    // Close dialog function
    $scope.$ctrl.close = function(){
        $scope.$ctrl.isOpened = false;
    };
}
  
angular.module('app').component('xselect', {
    templateUrl: 'js/components/x-select.component.html',
    controller: xselectController,
    bindings: {
        'label': '@',
        'options': '=',
        'ngModel': '=',
        'disabled': '=',
        'itemSelected': '@'
    }, 
    replace: true
});


/*****************************************************************
 * x Input Component
 */
function xinputController($scope, $element, $attrs){ 
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';
}

angular.module('app').component('xinput', {
    templateUrl: 'js/components/x-input.component.html',
    controller: xinputController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=',
        'type': '@', 
        'placeholder': '@',
    }, 
    replace: true
});



/*****************************************************************
 * x Input Component
 */
function xtextareaController($scope, $element, $attrs){ 
    $scope.$ctrl.type = $scope.$ctrl.type || 'text';
}

angular.module('app').component('xtextarea', {
    templateUrl: 'js/components/x-textarea.component.html',
    controller: xtextareaController,
    bindings: {
        'label': '@', 
        'ngModel': '=',
        'disabled': '=', 
        'placeholder': '@',
    }, 
    replace: true
});

