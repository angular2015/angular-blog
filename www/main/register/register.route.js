(function () {
    'use strict';
    angular.module('starter').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
                .state('register', {
                    url: '/register',
//                    views: {'mainView': {
                            templateUrl: 'main/register/register.html',
                            controller: 'registerCtrl'
//                        }}


                });

    });
})();


