(function() {
    'use strict';
    angular.module('beer.menu').controller('MenuCtrl', menuCtrl);
    function menuCtrl($state, timeStorage, $scope)
    {
        $scope.logout = function() {
            timeStorage.remove('login');
            $state.go('frontPage');
        }
    }
    ;
})();