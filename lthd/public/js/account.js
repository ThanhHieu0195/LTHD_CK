var myApp = angular.module('myAccount', ['ngRoute']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "account/login.html"
        })
        .when("/register", {
            templateUrl : "account/register.html"
        })
        .otherwise({
            templateUrl : "account/login.html"
        });
});

myApp.controller('myControllerLogin', function($scope, $http) {

    $scope.auto_login = function () {
        if ($.cookie('token')==undefined) return;
            window.location = "/dashboard";
    }

    $scope.auto_login();
	$scope.submit = function() {
		var username = $('#username').val();
		var password = $('#password').val();
		if (username.length == 0 || password.length == 0) {
			return false;
		}
        $http({
            method: 'POST',
            url: 'http://localhost:3000/token',
            data: {username:username, password:password},
        }).then(function successCallback(res) {
			if (res.status == 200 ) {
                $.cookie('token', res.data.type+ ' ' +res.data.token);
                $scope.auto_login();
			}
		});
		return true;
	}
});