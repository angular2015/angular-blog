(function() {
    'use strict';
    angular.module('beer.login').controller('loginCtrl', function($scope, $state,timeStorage,ajaxRequest, $ionicLoading) {
        $scope.user = {
            email: '',
            password: ''
        }
        $scope.login = function() {
            if (!$scope.user.email) {
                console.log('please enter email');
            }
            else if (!$scope.user.password) {
                console.log('please enter password');
            }

            else {
                console.log('ok');
                var data = {
                    m: $scope.user.email,
                    m1: $scope.user.password
                };
                var api = 'login.php';

                var promise = ajaxRequest.send(api, data);
                promise.then(function(data2) {
                    console.log(data2);
                    if (data2.msg == "success") {
                        timeStorage.set('login',data2,100);
                        $state.go('menu.home');
                    }
                    else{
                        console.log('please enter correct');
                    }
                });

            }
        };
    });
})();