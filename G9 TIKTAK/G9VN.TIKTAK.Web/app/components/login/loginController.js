(function (app) {
    app.controller('loginController', ['$scope', 'loginService', '$injector', 'notificationService', 'apiService',
        function ($scope, loginService, $injector, notificationService, apiService) {
            $scope.loginData = {
                userName: "",
                password: "",
                useRefreshTokens: true
            };
            var checkStore = checkStore;
            var sumString = "";
            var NameStore = {};
            $scope.loginSubmit = function () { loginService.login($scope.loginData).then(function (response) { if (response != null) { notificationService.displayError(response.data.error_description); } else { var stateService = $injector.get('$state'); stateService.go('home'); notificationService.displayInfo('Xin chào ' + $scope.loginData.userName + ''); } }); }
            function checkStore() {
                $(document).ready(function () {
                    //jquery
                    $(location).attr('href');
                    //pure javascript
                    var link = window.location.href;
                    var pathname = link.substring(7);
                    for (var i = 0; i < pathname.length; i++) {
                        if (pathname[i] == ':') {
                            break;
                        }
                        else {
                            sumString = sumString + pathname[i];
                        }
                    }
                    apiService.get('api/ManageStore/getbynamestore?key=' + sumString, null, function (result) {
                        if (result.data.length == 0) {
                            var stateService = $injector.get('$state');
                            stateService.go('notification');
                        } else {
                            $scope.dateTime = result.data[0].Expirydate;
                            var temp2 = "";
                            var dt2 = $scope.dateTime.substring(8, 10);
                            var mon2 = $scope.dateTime.substring(5, 7);
                            var yr2 = $scope.dateTime.substring(0, 4);
                            temp2 = mon2 + "/" + dt2 + "/" + yr2;
                            var date1 = new Date();
                            var date2 = new Date(temp2);
                            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            $scope.showdateend = diffDays;
                            if (date2.getTime() <= date1.getTime()) {
                                window.location = 'http://' + result.data[0].StoreName + '.tiktac.vn/MailHelper/MailHelper';
                            }
                        }

                    }, function (error) {
                        notificationService.displayError(error.data);
                    });

                });
            }
            checkStore();
        }]);
})(angular.module('tiktak'));