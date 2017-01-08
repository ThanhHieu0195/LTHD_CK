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

            $scope.update_comment = function (obj_comment) {
                socket.emit( 'update_comment', obj_comment);
            };
    },
    function errorCallback( res ) {
        alert('time out');
        $scope.logOut();
    });
});

myApp.controller('myNewFeed', function($scope, $http){
    socket.on('update_comment', function (obj) {
        console.log(obj);
        var post_id = obj.post_id;
        if ($scope.list_comment[post_id] == undefined) {
            $scope.list_comment[post_id] = [];
        }
        var is_isset = false;
        console.log($scope.list_comment[post_id]);
        for (var i=0; i<$scope.list_comment[post_id].length; i++) {
            if (obj.id == $scope.list_comment[post_id][i].id) {
                is_isset = true;
            }
        }
        if (is_isset == false) {
            $scope.list_comment[post_id].push(obj);
        }
    });

    //Load data new feed
    var link_newfeed = link_api+'newfeed/1';
    $scope.myImage = '';
    $http.get(link_newfeed).then(function successCallback(res) {
        $scope.list_newsfeed = res.data.data;
        $scope.list_comment = res.data.data_comment;
        console.log(res.data);
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

    $scope.push_comment = function (key, obj, content) {
        var post_id = obj.id;
        var content = content;
        var link_push_comment = link_api+'comment';
        var data = {post_id:post_id, content:content};
        if (key == 13) {
            $http.post(link_push_comment, data).then(function successCallback(res) {
                var data = res.data[0];
                var obj_comment = {
                    avt_commenter:$scope.profile.data.avata_link,
                    comment_by:$scope.profile.data.id,
                    commenter:$scope.profile.data.username,
                    content:content,
                    date_comment:data.date_comment,
                    id:data.id,
                    post_id:data.post_id
                };
                if ($scope.list_comment[post_id] == undefined) {
                    $scope.list_comment[post_id] = [];
                }
                $scope.list_comment[post_id].push(obj_comment);
                $scope.update_comment(obj_comment);
            });
        }
    };
    $scope.fileSelected = function (element) {
        $scope.myImage = element.files[0];
    };
    $scope.push_post = function (describe) {
        var url = 'http://localhost:3000/upload/image_upload';
        var describe = describe;
        var myImage = $scope.myImage;
        var fp = new FormData();

        if (myImage!='' && describe != '') {
            fp.append('myImage', myImage);
            fp.append('describe', describe);
            preloader.fadeIn();
            $http({
                url: url,
                method: 'POST',
                data: fp,
                headers: { 'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function successCallback(res) {
                console.log(res);
                window.location = "http://localhost:3000/dashboard/";
            });
        } else {
            alert('Thông tin rỗng');
        }
    }

});