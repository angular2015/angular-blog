(function () {
    'use strict';
    angular.module('starter.service', []).factory('ajaxRequest',
             ['$http', '$q', '$log',
            function ($http, $q, $log) {
                return {
                    hasInit: false,
                    init: function () {
                    },
                    url: function (api) {
//                        http://localhost/etech/www/
//                        http://excellencetechnologies.co.in/siddharth/
//http://beerlocator.netai.net/beerlocator/
                        return '' + api;
                    },
                    send: function (api, data, method) {
                        var self = this;
                        if (!self.hasInit) {
                            self.init();
                        }
                        var silent = false;
                        if (!angular.isDefined(method)) {
                            method = 'POST';
                        } else {
                            if (method === true) {
                                silent = true;
                                method = 'POST';
                            }
                        }
                        var def = $q.defer();
//                        delete $http.defaults.headers.common['X-Requested-With'];
                        var http = $http({
                            url: this.url(api),
                            method: method,
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            cache: false,
                            data: JSON.stringify(data),
                            timeout: 60000
                        });
                        http.success(function (data) {
                           // console.log(data);
                            if(data){
                                def.resolve(data);
                            }
                            else{
                                def.resolve();
                            }
//                            if (data === "success") {
//                                console.log(data);
//                                  def.resolve(data);
//                                    
//                               }
//                                else if(data === "failure"){
//                                    console.log(data);
//                                    def.resolve(data);
//                                }
//                            else {
//                                if (data === "fail") {
//                                    $log.log('Ajax Mongo Error ' + data.message);
//                                    data.message = 'Unknown! Try Again Later';
//                                   console.log(data);
//                                    def.resolve(data);
//                                }
//                                $log.warn(data.message);
//                                def.reject(data.message);
//                            }
                        });
                        http.error(function () {
                            $log.warn('500 Error');
                            def.reject('500');
                        });
                        return def.promise;
                       // colsole.log(def.promise);
                    }
                };
            }
            ]);
})();
