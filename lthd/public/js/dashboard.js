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
    $scope.loadpage = function () {
    //    kich hoat hoat dong cua angular
    };
});

myApp.controller('myNewFeed', function($scope, $http){
    $http.get(link_api).then(function successCallback(res){
        $scope.profile = res.data.profile;

        console.log($scope.profile);
        $scope.sendNotification = function (obj) {
            var sender = $scope.profile.data.id;
            data_notification = {
                sender:sender,
                receiver:obj.receiver,
                content:obj.content
            }
            var url = link_api+'notification';
            $http.post(url, data_notification).then(function successCallBack(res) {
                console.log('noti');
                data_notification.id = res.data.insertId;
                data_notification.sender_name = obj.sender_name;
                console.log(res);
                // res.sen
                socket.emit( 'notification', data_notification);
            });
        };

        $scope.notification_update_comment = function (obj_comment) {
            socket.emit( 'update_comment', obj_comment);
        };

        $scope.notification_del_comment = function (obj_comment) {
            socket.emit( 'del_comment', obj_comment);
        };
        //Load notification

        socket.on($scope.profile.data.id, function (obj) {
            $scope.num_notification = parseInt($scope.num_notification) + 1;
            $scope.list_notification.push(obj);
            $.notify("Bạn vừa nhận thông báo mới", "success");
        });

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

        socket.on('del_comment', function (obj) {
            for (var i = 0; i<$scope.list_comment[obj.post_id].length; i++) {
                if ($scope.list_comment[obj.post_id][i].id == obj.id) {
                    $scope.list_comment[obj.post_id][i].content= '';
                    $scope.list_comment[obj.post_id][i].notification_comment= 'Bình luận đã được thu hôi';
                }
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
        //load notification
        var link_notification = link_api+'notification';
        $http.get(link_notification).then(function successCallback(res) {
            $scope.list_notification = res.data;
        });

        var link_notification_count = link_api+'notification/count';
        $http.get(link_notification_count).then(function successCallback(res) {
            $scope.num_notification = res.data;
            if ($scope.num_notification == undefined) {
                $scope.num_notification = 0;
            }
        });
        //    rut chich du lieu
        var link_crawler = link_api+'crawler';
        $http.get(link_crawler).then(function successCallback(res) {
            $scope.list_crawler = res.data;
        });
        $scope.show_notification = function () {
            $("#notificationContainer").fadeToggle(300);
            $("#notification_count").fadeOut("slow");
            return false;
        };

        $scope.push_comment = function (key, feed) {
            var post_id = feed.id;
            var content = feed.comment_content;
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
                    feed.comment_content = '';
                    $scope.list_comment[post_id].push(obj_comment);
                    $scope.notification_update_comment(obj_comment);
                    $scope.sendNotification({receiver:feed.post_by,
                        content:'bình luận "'+obj_comment.content+'" trong post '+feed.describe,
                        sender_name:feed.poster
                    });
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

        $scope.del_comment = function (obj) {
            var link = link_api+'comment/'+obj.id;
            var is_ok = true;
            // var is_ok = confirm('Are you ok ?');
            if (is_ok==true) {
                $http.delete(link).then(function successCallback(res) {
                    $scope.notification_del_comment(obj);
                    obj.notification_comment = "Bình luận đã được thu hôi";
                    obj.content='';
                });
            }
        }


    },function errorCallback( res ) {
        alert('time out');
        $scope.logOut();
    });

});