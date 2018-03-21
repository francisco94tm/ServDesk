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
            console.log($scope.$ctrl.data.priority);
            switch($scope.$ctrl.data.priority){
                case "0":
                    $scope.$ctrl.priorityClass = 'low-priority';
                    break;
                case "1":
                    $scope.$ctrl.priorityClass = 'medium-priority';
                    break;
                case "2":
                    $scope.$ctrl.priorityClass = 'high-priority';
                    break;
                case "3":
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

function alertContainerController($scope, $element, $attrs){ 
}
 
angular.module('app').component('alertContainer', {
    templateUrl: 'js/components/alert-container.component.html',
    controller: alertContainerController,
    bindings: {
        'data': '=',
        'current': '=', 
        'orderBy': '=',
        'filterBy': '='
    }, 
});



/*****************************************************************
 * Alert Container Component
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
    templateUrl: 'js/components/xselect.component.html',
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
