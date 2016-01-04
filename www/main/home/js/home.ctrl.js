(function () {
    'use strict';
    angular.module('beer.home').controller('HomeCtrl', homeCtrl);
    function homeCtrl($scope, uiGmapGoogleMapApi, ajaxRequest, $log)
    {
        uiGmapGoogleMapApi.then(function (maps) {
        });
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        var promise = ajaxRequest.send('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBWkF7x23R6YZCUCu02fZnXVfNtBl4U2gs');
        promise.then(function (data) {
            $scope.location = data;
            var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.location.lat + ',' + data.location.lng + '&sensor=true');
            promise2.then(function (data) {
                $log.log(data);
            });
            $log.log(data);
        });
        $scope.locationGps = 'position';

    }
    ;
})();