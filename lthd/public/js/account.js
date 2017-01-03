var myApp = angular.module('myAccount', ['ngRoute']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "account/login.html"
        })
        .when("/register", {
            templateUrl : "account/register.html"
        });
});

myApp.controller('myControllerLogin', function($scope, $http) {
	$scope.submit = function() {
		var username = $('#username').val();
		var password = $('#password').val();
		if (username.length == 0 || password.length == 0) {
			return false;
		}
        $scope.auto_login = function () {
		    if ($.cookie('token') == '') return;
		    window.location = "/dashboard";
            // if ($.cookie('token') == '') return;
            // var token = $.cookie('token');
            // var type = $.cookie('type');
            // $http({
            //     method: 'POST',
            //     url: 'http://localhost:3000/dashboard',
            //     data:{},
            //     headers: {'Authorization': type+' '+token},
            // });

        }
        $http({
            method: 'POST',
            url: 'http://localhost:3000/token',
            data: {username:username, password:password},
        }).then(function successCallback(res) {
			if (res.status == 200 ) {
                $.cookie('token', res.data.token);
                $.cookie('type', res.data.type);
                $.cookie('exp', res.data.exp);
                $.cookie('username',username);
                $scope.auto_login();
			}
		});
		return true;
	}
});