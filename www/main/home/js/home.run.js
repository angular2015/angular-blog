(function () {
    'use strict';
    angular.module('beer.home').run(runHome);
    function runHome() {
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            alert("navigator.geolocation works well");
        }
        
        
    }
    ;
})();