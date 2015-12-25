(function () {
    'use strict';
    angular.module('beer.front').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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