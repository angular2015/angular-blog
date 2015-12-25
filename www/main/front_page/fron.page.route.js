(function () {
    'use strict';
    angular.module('starter').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$urlRouterProvider.otherwise('/frontPage');
        $stateProvider
                .state('frontPage', {
                    url: '/frontPage',
//                    views: {'mainView': {
                            templateUrl: 'main/front_page/frontPage.html',
                            controller: 'frontPageCtrl'
//                        }}


                });

    });
})();