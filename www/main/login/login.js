(function () {
    'use strict';
   angular.module('beer.login').controller('loginCtrl', function($scope, $ionicLoading) {
       $scope.user={
           email:'',
            password:''
}
       $scope.login=function(){
           if(!$scope.user.email){
               console.log('please enter email');
           }
           else if(!$scope.user.password){
               console.log('please enter password');
           }
           
           else{
               console.log('ok')
              var data={
                
                  email:$scope.user.email,
                  password:$scope.user.password
              }
              console.log(data);
           }
       }
   });
})();