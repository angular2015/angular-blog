(function () {
    'use strict';
    angular.module('beer.list').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
                .state('menu.list', {
                    url: '/list',
                    views: {'menuContent': {
                            templateUrl: 'main/list_page/list.html',
                            controller: 'listCtrl'
                        }}


                });

    });
})();


