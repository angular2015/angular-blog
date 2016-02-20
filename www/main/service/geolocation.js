(function () {
    'use strict';
    angular.module('beer.service', [])
            .factory('geoHelper', geoHelper);
    function geoHelper(ajaxRequest, $localStorage, $rootScope, $q, google_key, $http) {
        var geo = {};
        geo.defer = $q.defer();
        geo.defer2 = $q.defer();
        geo.defer3 = $q.defer();
        geo.timeout = 30000;
        // geo.address success
        geo.success = function (position) {
            //getting location of user with address
            var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true');
            promise2.then(function (data) {
                geo.defer.resolve(data);
            });
        };
        // geo.address error
        geo.error = function (error) {

            //back up forgetting userlocation
            var promise = ajaxRequest.send('https://www.googleapis.com/geolocation/v1/geolocate?key=' + google_key);
            promise.then(function (data) {
                var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.location.lat + ',' + data.location.lng + '&sensor=true');
                promise2.then(function (data) {
                    geo.defer.reject(data);
                });

            });
        }
        geo.address = function (timeout) {
            if (timeout)
                geo.timeout = timeout;
//getting location of user
            navigator.geolocation.watchPosition(geo.success, geo.error, {maximumAge: 3000, timeout: geo.timeout, enableHighAccuracy: true});//function for get position of user
            return  geo.defer.promise;
        };
        //getting near beer shops
        geo.nearBeer = function (data) {
            $http({
                url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + data.lat + ',' + data.lng + '&radius=5000&types=store&name=wine&key=' + google_key,
                method: 'POST',
            })
                    .success(function (data) {
                        geo.defer2.resolve(data);
                    });
            return geo.defer2.promise;

        };
        geo.path = function (data) {
            var origin = $localStorage.userLocation;
            var def=$q.defer();
            $http({
                url: 'https://maps.googleapis.com/maps/api/directions/json?origin=' + origin.lat + ',' + origin.lng + '&destination=' + data.lat + ',' + data.lng + '&key=' + google_key,
                method: 'GET'
            })
                    .success(function (data) {
                        def.resolve(data);
                    });
            return def.promise;
        };
        geo.decodePoly = function (data) {
            console.log(data);
            var poly = $rootScope.maps.geometry.encoding.decodePath(data.points);
            return poly;
        };
        return geo;
    }
    ;
})();



