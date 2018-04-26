var app = angular.module("app", ['ngRoute', 'ng-click-out', 'monospaced.elastic']); 

angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
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
}); 