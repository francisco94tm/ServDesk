var app = angular.module("app", ['ngRoute', 'ng-click-out', 'monospaced.elastic', 'chart.js', 'angularMoment']); 
 
angular.module('app')
.config(function ($routeProvider, $locationProvider, ChartJsProvider) 
{ 
    ChartJsProvider.setOptions({ 
        chartColors : [ '#FFBC67', '#DA727E', '#AC6C82', '#685C79', '#196ED9', '#949FB1', '#4D5360'] , 
    });

    $routeProvider
    .when('/', {
        templateUrl: 'app/components/login/login.view.html',
        controller: 'loginCtrl' 
    })
    .when('/dash', {
        templateUrl: 'app/components/dashboard/dashboard.view.html',
        controller: 'dashCtrl'
    }) 
    .otherwise({
        redirectTo: '/'
    }); 

    // use the HTML5 History API
    $locationProvider.hashPrefix('');   


}).run(function(amMoment) {
    amMoment.changeLocale('de');
});