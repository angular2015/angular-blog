(function(){
    'use strict';
    angular.module('beer.home').config(homeConfig);
    function homeConfig(uiGmapGoogleMapApiProvider)
    {
         uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    }
})();