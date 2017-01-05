var myApp = angular.module('myDashboard', ['ngRoute']);
var link_api = 'http://localhost:3000/api/';
var authorization = $.cookie('token');

myApp.run(function($http) {
    $http.defaults.headers.common.Authorization = authorization;
});

myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "new_feed.html"
        })
        .when("/register", {
            templateUrl : "new_feed.html"
        })
        .otherwise({
            templateUrl : "new_feed.html"
        });
});
myApp.controller('myController', function($scope, $http) {
    $scope.logOut = function () {
        $.removeCookie('token', { path: '/' });
        window.location = "/";
    };

    $http.get(link_api).then(function successCallback(res){
        var profile = res.data.profile;
        alert('Xin chào ' + profile.data.username);

    },
    function errorCallback( res ) {
        $.logOut();
    });
});