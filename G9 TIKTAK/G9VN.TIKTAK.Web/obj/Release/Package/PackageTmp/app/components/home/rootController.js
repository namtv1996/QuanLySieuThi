(function (app) {
    app.controller('rootController', rootController);
    rootController.$inject = ['$state', 'authData', 'notificationService', 'loginService', '$scope', 'authenticationService', 'apiService'];
    function rootController($state, authData, notificationService, loginService, $scope, authenticationService, apiService) {
        $scope.logOut = function () {
            apiService.get('api/account/signout', null, function (result) {
                loginService.logOut();
                $state.go('login');
            }, function (error) {
            });
        }
        $scope.authentication = authData.authenticationData;
        var FindUser;
        function FindUser() {
            apiService.get('api/account/users', null, function (result) {
                if (result.data.Avatar == '' || result.data.Avatar == null) {
                    $scope.authentication.avatar = '../../../Assets/admin/img/lydosdpm.png';
                } else {
                    $scope.authentication.avatar = result.data.Avatar;
                }
                $scope.authentication.storeName = result.data.StoreName;
                $scope.authentication.phoneNumber = result.data.PhoneNumber;
                $scope.authentication.address = result.data.Address;
                $scope.authentication.fullName = result.data.FullName;
                $scope.authentication.UserName = result.data.UserName;
                $scope.authentication.Email = result.data.Email;
                $scope.authentication.BirthDay = result.data.BirthDay;
                $scope.authentication.Id = result.data.Id;
                $scope.authentication.BranchID = result.data.BranchID;
                
                apiService.get('api/branch/getbyid/' + $scope.authentication.BranchID, null,
                    function (result) {
                        $scope.authentication.BranchName = result.data.BranchName;
                    },
                    function () { }
                );

                apiService.get('api/account/store', null, function (result) {
                    $scope.authentication.manageStoreId = result.data.ManageStoreID;
                    $scope.authentication.expirydate = result.data.Expirydate;
                    $scope.authentication.createdate = result.data.CreateDate;
                    $scope.authentication.business = result.data.Business;
                    $scope.authentication.addressStore = result.data.Address;
                    $scope.dateTime = result.data.Expirydate;
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
                    if ($scope.showdateend > 7) {
                        if ($('#showone').length !== 0) {
                            document.getElementById("showone").style.display = 'none';
                        }
                    }

                    $scope.GetNotification(result.data.ManageStoreID);
                }, function (error) {
                    notificationService.displayError(error.data);
                });
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.GetNotification = GetNotification;
        $scope.list_Notifi = [];
        $scope.class_wavein = '';
        $scope.dis_notifi = 'none';
        $scope.quan_notifi = 0;
        function GetNotification(id) {
            apiService.get('api/ManageStore/getNotification?id=' + id, null,
                function (result) {
                    $scope.list_Notifi = result.data;
                    if ($scope.list_Notifi.length > 0) {                      
                        for (var i in $scope.list_Notifi) {
                            $scope.list_Notifi[i].stt = i;
                            if ($scope.list_Notifi[i].Status === 0) { $scope.quan_notifi = $scope.quan_notifi + 1; }
                        }
                        if ($scope.quan_notifi > 0){
                            $scope.dis_notifi = 'block';
                            $scope.class_wavein = 'wave in';
                        } else {
                            $scope.dis_notifi = 'none';
                            $scope.class_wavein = '';
                        }
                    } else {
                        $scope.dis_notifi = 'none';
                        $scope.class_wavein = '';
                    }
                },
                function () { }
            ); 
        }

        $scope.Notifi_Click = Notifi_Click;
        function Notifi_Click() {
            $scope.dis_notifi = 'none';
            $scope.class_wavein = '';

            if (document.getElementById("a2").style.display === "none" && document.getElementById("chatbar1").style.display === "none") {
                document.getElementById("a2").style.display = "block";
                document.getElementById("chatbar1").style.display = "none";
            } else {
                if (document.getElementById("a2").style.display === "block" && document.getElementById("chatbar1").style.display === "none") {
                    document.getElementById("a2").style.display = "none";
                    document.getElementById("chatbar1").style.display = "none";
                }
                else if (document.getElementById("a2").style.display === "none" && document.getElementById("chatbar1").style.display === "block") {
                    document.getElementById("a2").style.display = "none";
                    document.getElementById("chatbar1").style.display = "none";
                }
                else if (document.getElementById("a2").style.display === "block" && document.getElementById("chatbar1").style.display === "block") {
                    document.getElementById("a2").style.display = "none";
                    document.getElementById("chatbar1").style.display = "none";
                }
            }
        }


        $scope.Notifi_Content_Click = Notifi_Content_Click;
        $scope.Content_detail = '';
        function Notifi_Content_Click(stt) {
            $scope.Content_detail = $scope.list_Notifi[stt].Contents;

            if ($scope.list_Notifi[stt].Status === 0 && $scope.list_Notifi[stt].ManageStoreID !== null) {
                $scope.list_Notifi[stt].Status = 1;
                apiService.put('api/ManageStore/updateNotifi', $scope.list_Notifi[stt],
                    function (result) {
                       
                    },
                    function () { }
                );
            }
        }

        FindUser();
    }
})(angular.module('tiktak'));