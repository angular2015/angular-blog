(function () {
    'use strict';
    angular.module('beer.service', [])
            .factory('geoHelper', geoHelper);
    function geoHelper() {
        var geo = {};
        geo.address = function (data) {

        };
        return geo;
    }
    ;
})();