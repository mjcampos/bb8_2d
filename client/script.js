var myApp = angular.module('myApp', ['ngRoute']);

// Clientside routing
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {templateUrl: 'partials/home.html'})
	.when('/game', {templateUrl: 'partials/game.html'})
	.when('/help', {templateUrl: 'partials/help.html'})
	.otherwise({redirectTo: '/'});
});