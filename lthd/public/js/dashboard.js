var myApp = angular.module('myDashboard', ['ngRoute']);
var link_api = 'http://localhost:3000/api/';
var authorization = $.cookie('token');
var socket = io();

myApp.run(function($http) {
    $http.defaults.headers.common.Authorization = authorization;
});

myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "newsfeed.html"
        })
        .when("/register", {
            templateUrl : "newsfeed.html"
        })
        .otherwise({
            templateUrl : "reset_url.html"
        });
});

myApp.controller('myController', function($scope, $http) {
    $scope.logOut = function () {
        $.removeCookie('token', { path: '/' });
        window.location = "/";
    };
    //
    $http.get(link_api).then(function successCallback(res){
        $scope.profile = res.data.profile;
        console.log($scope.profile);
        // alert('Xin chào ' + profile.data.username);

        //Load notification

         //nhận thông báo
         socket.on($scope.profile.data.id, function (msg) {
             console.log(msg);
         });
         //gửi thông báo
         $scope.notification = function (sender, receiver, content) {
             if (sender == "") {
                 sender = $scope.profile.data.id;
             }
             data_notification = {
                 sender:sender,
                 receiver:receiver,
                 content:content
             }
             socket.emit( 'notification', data_notification);
         };
    },
    function errorCallback( res ) {
        alert('time out');
        $scope.logOut();
    });
});

myApp.controller('myNewFeed', function($scope, $http){
    //Load data new feed
    var link_newfeed = link_api+'newfeed/1';
    $http.get(link_newfeed).then(function successCallback(res) {
        console.log(res);
    });
    //load num posted
    var link_num_posted = link_api+'newfeed/totalpost';
    $http.get(link_num_posted).then(function successCallback(res) {
        $scope.num_posted = res.data;
    });
    //load commentd
    var link_num_commented = link_api+'comment/totalpost';
    $http.get(link_num_commented).then(function successCallback(res) {
        $scope.num_commented = res.data;
    });
//    load new photo
    var link_new_photos = link_api+'newfeed/photos/1';
    $http.get(link_new_photos).then(function successCallback(res) {
        $scope.new_photos = res.data;
    });

    $scope.show_notification = function () {
        $("#notificationContainer").fadeToggle(300);
        $("#notification_count").fadeOut("slow");
        return false;
    };
});