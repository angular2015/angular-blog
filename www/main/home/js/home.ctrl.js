(function () {
    'use strict';
    angular.module('beer.home').controller('HomeCtrl', homeCtrl);
    function homeCtrl($scope, uiGmapGoogleMapApi, ajaxRequest, $log, $ionicPopup)
    {



        // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
      $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        var onSuccess = function (position) {
            console.log(position);
                    var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true');
            promise2.then(function (data) {
              console.log(data.results[0].formatted_address);
              $scope.location=data.results[0].formatted_address;
            });

        };
  uiGmapGoogleMapApi.then(function (maps) {
            });
// onError Callback receives a PositionError object
//
        function onError(error) {
          
      
            var promise = ajaxRequest.send('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBWkF7x23R6YZCUCu02fZnXVfNtBl4U2gs');
            promise.then(function (data) {
                 console.log(data);
                var promise2 = ajaxRequest.send('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.location.lat + ',' + data.location.lng + '&sensor=true');
                promise2.then(function (data) {
                    console.log(data);
                });
               
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        var myPopup = $ionicPopup.show({
            template: 'Please Enable Gps To Get Best From This App',
            title: 'Enable Gps',
            subTitle: 'Gps Not Available',
            scope: $scope,
            buttons: [
                {text: 'Cancel',
                    onTap: cancelButton
                },
                {
                    text: '<b>Ok</b>',
                    type: 'button-positive',
                    onTap: saveButton
                }
            ]
        });
        function saveButton(e) {


        }
        function cancelButton(e) {

        }
        myPopup.then(function (res) {
            alert('Tapped!', res);
            myPopup.close();
        });



        ;

    }

    ;
})();