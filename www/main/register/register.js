(function() {
    'use strict';
    angular.module('starter').controller('registerCtrl', function($scope, ajaxRequest, $ionicLoading) {
        $scope.user = {
            email: '',
            name: '',
            password: '',
            repassword: ''
        }
        $scope.signup = function() {
            if (!$scope.user.name) {
                console.log('please enter user name');
            }
            else if (!$scope.user.email) {
                console.log('please enter email');
            }
            else if (!$scope.user.password) {
                console.log('please enter password');
            }
            else if (!$scope.user.repassword) {
                console.log('please enter re password');
            }
            else if ($scope.user.password == $scope.user.repassword) {
                console.log('ok')
                var data = {
                    
                    'm': $scope.user.email,
                    'm1': $scope.user.password,
                    'm2': $scope.user.name
                };
                var api = 'registration.php';

                var promise = ajaxRequest.send(api, data);
                promise.then(function(data2) {
                    
                });

                console.log(data);
            }

            else {
                console.log('please enter same password');
            }
        }
    });
})();