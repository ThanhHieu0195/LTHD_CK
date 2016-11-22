var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
});

myApp.controller('myController', function($scope, $route, $templateCache, $location){

});