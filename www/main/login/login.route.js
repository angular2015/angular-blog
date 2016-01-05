(function () {
    'use strict';
    angular.module('beer.login').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
                .state('login', {
                    url: '/login',
//                    views: {'mainView': {
                            templateUrl: 'main/login/login.html',
                            controller: 'loginCtrl'
//                        }}


                });

    });
})();


