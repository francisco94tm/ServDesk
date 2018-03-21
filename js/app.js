var app = angular.module("app", ['ngRoute', 'ng-click-out']); 

angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl' 
        })
        .when('/dash', {
            templateUrl: 'pages/dashboard.html',
            controller: 'dashCtrl'
        }) 
        .otherwise({
            redirectTo: '/'
        }); 
        // use the HTML5 History API
        $locationProvider.hashPrefix(''); 
}); 