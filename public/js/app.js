var myApp = angular.module('myApp', []);

myApp.controller('myControllerLogin', function($scope) {
	$scope.submit = function() {
		var username = $('#username').val();
		var password = $('#password').val();
		if (username.length == 0 || password.length == 0) {
			return false;
		}
		return true;
	}
});