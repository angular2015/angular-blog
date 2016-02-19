(function () {
    'use strict';
    angular.module('beer.home').controller('HomeCtrl', homeCtrl);
    function homeCtrl($scope, uiGmapGoogleMapApi, geoHelper, $log, $ionicPopup)
    {



        // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//

        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        uiGmapGoogleMapApi.then(function (maps) {
        });
        //for setting user location of the user on the map
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: {draggable: true,
                scrollwheel: true},
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };

        $scope.randomMarkers = []//for showing beers shop on the map
        var promise = geoHelper.address();//current lat long of user
        promise.then(function (data) {
            console.log(data);
            var loc = data.results[0].geometry.location;
            $scope.map = {center: {latitude: loc.lat, longitude: loc.lng}, zoom: 15};
            $scope.marker.coords.latitude = loc.lat;//setting the user location on the map
            $scope.marker.coords.longitude = loc.lng;//setting the user location on the map

            var promise = geoHelper.nearBeer(loc);//get the beer shop details
            promise.then(function (data) {
                console.log(data);
                for (var i = 0; i < data.results.length; i++)
                {
                    var marks = {
                        latitude: data.results[i].geometry.location.lat,
                        icon: data.results[i].icon,
                        longitude: data.results[i].geometry.location.lng,
                        title: data.results[0].name,
                        id: i,
                        vicinity: data.results[0].vicinity
                    }
                    $scope.randomMarkers.push(marks);//for showing beers shop on the map

                }
                console.log($scope.randomMarkers);

            })
//            $scope.randomMarkers = [{latitude: loc.lat + 0.1, ran: 'main/image/icon.png', longitude: loc.lng + 0.1, title: 'm' + 1, id: 0}];
        });
        promise.catch(function (data) {
            console.log('gps not avialable')
        });
        $scope.onClick = function (marker, eventName, model) {
            console.log("Clicked!");
              var promise = geoHelper.path();
            model.show = !model.show;
        };
        $scope.setPath = function (data) {
            console.log('ok');
        }
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

            myPopup.close();
        });



        ;

    }

    ;
})();