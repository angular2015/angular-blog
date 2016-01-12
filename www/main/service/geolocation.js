(function () {
    'use strict';
    angular.module('beer.service', [])
            .factory('geoHelper', geoHelper);
    function geoHelper(ajaxRequest, $q) {
        var geo = {};
        geo.defer = $q.defer();
        geo.timeout=30000;
        geo.success = function (position) {
            
            var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true');
            promise2.then(function (data) {
                geo.defer.resolve(data);
            });
        };
        geo.error = function (error) {
            var promise = ajaxRequest.send('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBWkF7x23R6YZCUCu02fZnXVfNtBl4U2gs');
            promise.then(function (data) {
                var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.location.lat + ',' + data.location.lng + '&sensor=true');
                promise2.then(function (data) {
                    geo.defer.reject(data);
                });

            });
        }
        geo.address = function (timeout) {
            if(timeout)
                geo.timeout=timeout;
           
            navigator.geolocation.watchPosition(geo.success, geo.error,{ maximumAge: 3000, timeout: geo.timeout, enableHighAccuracy: true });//function for get position of user
            return  geo.defer.promise;
        };
        return geo;
    }
    ;
})();



