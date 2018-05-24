var app = angular.module("app", 
    [
        'ngRoute', 'ng-click-out', 'monospaced.elastic', 
        'chart.js', 'angularMoment'
    ]); 
 
angular.module('app')
.config(function ($routeProvider, $locationProvider, ChartJsProvider) 
{ 
    ChartJsProvider.setOptions({ 
        chartColors : [ '#3E95CD', '#8E5EA2', '#3CBA9F','#E8C3B9',  '#C45850', '#196ED9', '#949FB1', '#4D5360'], 
        defaultFontFamily: "Walfork", 
        legend: { 
            display: true, 
            position: 'bottom',
            labels: {
                fontColor: "#333",
                fontFamily: "Walfork",
            }           
        },
        tooltips: {
            backgroundColor: "rgba(50,50,50,0.9)",
            titleFontFamily: "Walfork",
            titleMarginBottom: 20, 
            titleFontSize: 20,
            bodyFontFamily: "Walfork",
            bodyFontSize: 12,
            bodySpacing: 15,
            cornerRadius: 2,
            xPadding: 30,
            yPadding: 20,
            intersect: false,  
        },
        elements: { 
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 20
            }
        }
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


}).run(function(amMoment, $rootScope) {
    amMoment.changeLocale('de');   
});