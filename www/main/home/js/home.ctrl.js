(function () {
    'use strict';
    angular.module('beer.home').controller('HomeCtrl', homeCtrl);
    function homeCtrl($scope,uiGmapGoogleMapApi)
    {
        uiGmapGoogleMapApi.then(function (maps) {
        });
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    }
    ;
})();