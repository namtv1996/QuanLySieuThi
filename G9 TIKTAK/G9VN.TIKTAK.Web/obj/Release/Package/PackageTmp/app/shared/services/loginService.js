(function (app) {
    'use strict';
    app.service('loginService', ['$http', '$q', 'authenticationService', 'authData', 'ngAuthSettings',
    function ($http, $q, authenticationService, authData, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var userInfo;
        var deferred;

        this.login = function (loginData) {
            deferred = $q.defer();
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + ngAuthSettings.clientId;
            }
            $http.post(serviceBase+'/oauth/token', data, {
                headers:
                   { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                if (loginData.useRefreshTokens) {
                    userInfo = {
                        accessToken: response.data.access_token,
                        userName: loginData.userName,
                        refreshToken: response.refresh_token,
                        useRefreshTokens:true
                    };
                }
                else {
                    userInfo = {
                        accessToken: response.data.access_token,
                        userName: loginData.userName,
                        refreshToken: "",
                        useRefreshTokens: false
                    };
                }
                authenticationService.setTokenInfo(userInfo);
                authData.authenticationData.IsAuthenticated = true;
                authData.authenticationData.userName = loginData.userName;
                authData.useRefreshTokens = loginData.useRefreshTokens;
                deferred.resolve(null);
            }
            , function (err, status) {
                authenticationService.removeToken();
                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.userName = "";
                authData.useRefreshTokens = false;
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        this.logOut = function () {
            authenticationService.removeToken();
            authData.authenticationData.IsAuthenticated = false;
            authData.authenticationData.userName = "";
            authData.useRefreshTokens = false;
        }
    }]);
})(angular.module('tiktak.common'));