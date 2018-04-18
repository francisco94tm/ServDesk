function requirementController($scope, $element, $attrs, requirement){   
 
}
  
angular.module('app').component('requirement', {
    templateUrl: 'app/shared/requirement/requirement.view.html',
    controller: requirementController,
    bindings: { 
    }, 
    replace: true
});
