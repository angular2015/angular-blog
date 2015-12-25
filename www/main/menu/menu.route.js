(function(){
    'use strict';
    angular.module('beer.menu').config(homeRoute);
   function homeRoute($stateProvider){
       $stateProvider.state('menu',{
           url:'/menu',
           templateUrl:'main/menu/menu.html',
           controller:'MenuCtrl'
       });
   };
})();