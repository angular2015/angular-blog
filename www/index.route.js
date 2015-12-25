(function () {
    'use strict';
  angular.module('beer.app').config(indexConfig);
  function indexConfig($urlRouterProvider){
              $urlRouterProvider.otherwise('/frontPage');
  };

})();