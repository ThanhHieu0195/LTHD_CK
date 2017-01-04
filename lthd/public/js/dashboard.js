var myApp = angular.module('myDashboard', []);

myApp.controller('myController', function($scope, $http) {

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
                window.location = "/dashboard";
            }
        });
    }
});