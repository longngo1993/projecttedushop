﻿(function (app) {
    'use strict';
    app.service('authenticationService', ['$http', '$q', '$window','localStorageService','authData','$injector',
    function ($http, $q, $window, localStorageService, authData, $injector) {
            var tokenInfo;

            this.setTokenInfo = function (data) {
                tokenInfo = data;
                localStorageService.set("TokenInfo", JSON.stringify(tokenInfo));
            }

            this.getTokenInfo = function () {
                return tokenInfo;
            }

            this.removeToken = function () {
                tokenInfo = null;
                localStorageService.set("TokenInfo", tokenInfo);
              //  this.init();
            }

            this.init = function () {
                 tokenInfo = localStorageService.get("TokenInfo");
                if (tokenInfo) {
                    tokenInfo = JSON.parse(tokenInfo);
                    authData.authenticationData.IsAuthenticated = true;
                    authData.authenticationData.userName = tokenInfo.userName;
                }
            }

            this.setHeader = function () {
                delete $http.defaults.headers.common['X-Requested-With'];
                if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined) && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenInfo.accessToken;
                    $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
                else {
                    var stateService = $injector.get('$state');
                    stateService.go('login');
                }
            }

            this.validateRequest = function () {
                this.setHeader();
                var url = 'api/home/TestMethod';
                var deferred = $q.defer();
                $http.get(url).then(function () {
                    deferred.resolve(null);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }

            this.init();
        }
    ]);
})(angular.module('tedushop.common'));