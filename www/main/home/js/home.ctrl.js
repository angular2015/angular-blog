(function () {
    'use strict';
    angular.module('beer.home').controller('HomeCtrl', homeCtrl);
    function homeCtrl($scope, uiGmapGoogleMapApi, $localStorage, $rootScope, geoHelper, $log, $ionicPopup)
    {
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        uiGmapGoogleMapApi.then(function (maps) {
            $rootScope.maps = maps;

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
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
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
            var loc = data.results[0].geometry.location;
            $localStorage.userLocation = {lat: loc.lat, lng: loc.lng};
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
           
            var data = {lat: marker.model.latitude, lng: marker.model.longitude};
            console.log(data);
            var promise = geoHelper.path(data);
            promise.then(function(data) {
                var poly = data.routes[0].overview_polyline;
                var dirObj = geoHelper.decodePoly(poly);
                var path=[];
                for(var i=0;i<dirObj.length;i++)
                {
                   var location={latitude:dirObj[i].lat(),longitude:dirObj[i].lng()};
                   path.push(location);
                };
                 console.log(path);
                $scope.polylines = [
                    {
                        id: 1,
                        path: path,
                        stroke: {
                            color: '#6060FB',
                            weight: 3
                        },
                        editable: true,
                        draggable: true,
                        geodesic: true,
                        visible: true,
                        icons: [{
                                icon: {
                                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                                },
                                offset: '25px',
                                repeat: '50px'
                            }]
                    }];
                
            });
   
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