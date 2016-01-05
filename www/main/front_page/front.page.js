(function () {
    'use strict';
    angular.module('beer.front').controller('frontPageCtrl', function ($scope,$log,googleLogin,$timeout, $ionicLoading) {
        var opt = {
            client_id: '86285624834-atvl4kh7jsn12qb88lpkqbdsjbdqv570.apps.googleusercontent.com',
            redirect_uri: 'http://localhost/demo1/demo',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
            secret: 'G1S47gTV9QGPoBUS3qxwkkut'
        };


        $scope.gogleLogin = function () {

            var loginGoogle = googleLogin.authorize(opt);
            loginGoogle.then(function (res) {
                console.log(res);
                if (res.google_id != '') {
                }
            });
        };
     
        var self = this;
        $timeout(function () {
            //timeout requried to wait for facebook plugin file to load
            if (window.cordova.platformId == "browser") {
                facebookConnectPlugin.browserInit('479597252219489');
            }
            facebookConnectPlugin.getLoginStatus(function (response) {
                $log.info(response);
                if (response.status === 'connected') {
                    $log.info('User Already LoggedIn');
                    self.getData();
                } else {
                    $log.info('User Not Logged In');
                }
            }, function () {
                $log.warn('Get Login Status Error');

            });
        }, 1000);
        $scope.facebookLogin = function () {
            facebookConnectPlugin.login(['public_profile'], function (data) {
                $log.info(data);
                self.getData();
            }, function (data) {
                $log.warn(data);
            });
        };
        self.getData = function () {
            facebookConnectPlugin.api('/me', ['public_profile'], function (data) {
                $log.info(data);
                $scope.$apply(function () {
                    $scope.fb_data = data;
                });
            });
        };

    });
})();


