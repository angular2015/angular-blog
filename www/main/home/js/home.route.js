(function () {
    'use strict';
    angular.module('beer.home').config(homeRoute);
    function homeRoute($stateProvider) {
        $stateProvider.state('menu.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'main/home/home.html',
                    controller: 'HomeCtrl'
                }
            }

        });
    }
    ;
})();