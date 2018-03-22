
// Load components
$.when(
    $.getScript('js/services/obj.service.js'),
    $.getScript('js/services/validate.service.js'),
    $.getScript('js/services/regex.service.js'), 
    $.getScript('js/services/system.service.js'), 
    $.getScript('js/services/navPanel.service.js'),
    $.getScript('js/services/alerts.service.js'),   
    $.getScript('js/services/requirement.service.js'),   
    $.getScript('js/services/utils.service.js'),
    $.getScript('js/services/alertx.service.js'),
)
.done(function(){
    angular.module('app').service('Obj', Obj); 
    angular.module('app').service('Validate', Validate); 
    angular.module('app').service('Regex', Regex); 
    angular.module('app').service('System', System); 
    angular.module('app').service('NavPanel', NavPanel); 
    angular.module('app').service('Alerts', Alerts); 
    angular.module('app').service('Requirement', Requirement);
    angular.module('app').service('Utils', Utils); 
    angular.module('app').service('Alertx', Alertx); 
}); 
