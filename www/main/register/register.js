(function () {
    'use strict';
   angular.module('starter').controller('registerCtrl', function($scope, $ionicLoading) {
       $scope.user={
           email:'',
           name:'',
           password:'',
           repassword:''
       }
       $scope.signup=function(){
           if(!$scope.user.name){
               console.log('please enter user name');
           }
           else if(!$scope.user.email){
               console.log('please enter email');
           }
           else if(!$scope.user.password){
               console.log('please enter password');
           }
           else if(!$scope.user.repassword){
               console.log('please enter re password');
           }
           else if($scope.user.password==$scope.user.repassword){
               console.log('ok')
              var data={
                  name:$scope.user.name,
                  email:$scope.user.email,
                  password:$scope.user.password
              }
              console.log(data);
           }
           else{
               console.log('please enter same password');
           }
       }
   });
})();