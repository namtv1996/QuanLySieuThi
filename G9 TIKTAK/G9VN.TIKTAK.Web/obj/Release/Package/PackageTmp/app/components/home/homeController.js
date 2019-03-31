(function (app) {
    app.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$state', 'authData', 'apiService', 'notificationService', '$ngBootbox'];

    function homeController($scope, $state, authData, apiService, notificationService, $ngBootbox) {
        $scope.checkLogin = function () {
            if (authData.authenticationData.IsAuthenticated == false) {
                $state.go('login')
            } else {
                $scope.FindUser();
            }
        }

        $scope.loadhightchar = function () {
            Highcharts.setOptions({
                chart: {
                    style: {
                        fontFamily: 'unset'
                    }
                }
            });
            Highcharts.chart('a', {              
                title: {
                    text: 'BIỂU ĐỒ THỐNG KÊ DOANH THU'                   
                },             
                subtitle: {
                    text: '7 ngày bán hàng gần nhất'
                },
                xAxis: {
                    categories: [$scope.n1, $scope.n2, $scope.n3, $scope.n4, $scope.n5, $scope.n6, $scope.n7]
                },
                series: [{
                    name: 'Doanh thu ',
                    type: 'column',
                    colorByPoint: true,
                    data: [$scope.d1, $scope.d2, $scope.d3, $scope.d4, $scope.d5, $scope.d6, $scope.d7],
                    showInLegend: false
                }]
            });          

           
        }
        $scope.Currency = Currency;
        $scope.getReportHome = getReportHome;
        $scope.time = time;
        $scope.showAll = showAll;
        $scope.hideAll = hideAll;

        $scope.item = {
            tonkho: 0
        };
        $scope.listSaleOrder = [];
        $scope.listHistory = [];
        $scope.listReportHome = [];
        $scope.listMan = [];
        $scope.FindUser = FindUser;
        $scope.totalRevenue = 0;
        $scope.stc = 'display: none;';
        $scope.s5 = 'display: block;';
        $scope.hienthi = 'Tất cả'
        function time() {
            clocktime = setTimeout("time()", "1000", "JavaScript");
        }
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                }
                else {
                    if (arr[i + 1] >= '5') {
                        arr1[i] = arr[i] - -1;
                    }
                    break;
                }
            }
            var Gia = "";
            var dem = 0;
            for (var i = arr1.length - 1; i >= 0; i--) {
                dem++;
                Gia = Gia + arr1[i];
                if (dem == 3 && i != 0) {
                    Gia = Gia + ",";
                    dem = 0;
                }
            }
            var arr2 = new String(Gia);
            var GiaMoi = '';
            for (var i = arr2.length - 1; i >= 0; i--) {
                GiaMoi = GiaMoi + arr2[i];
            }
            return GiaMoi;
        }
        function showAll() {
            $scope.stc = 'display: block;';
            $scope.s5 = 'display: none;';
            $scope.hienthi = 'Thu gọn';
        }
        function hideAll() {
            $scope.stc = 'display: none;';
            $scope.s5 = 'display: block;';
            $scope.hienthi = 'Tất cả';
        }
        function getReportHome() {
            apiService.get('api/salehome/reportHome', null, function (result) {
                $scope.listReportHome = result.data.listReportHomeViewModel;
                $scope.listHistory = result.data.listSaleInvoiceViewModel;
                $scope.listMan = result.data.reportHomeNewViewModel;
                for (var i = 0; i <= $scope.listReportHome.length; i++) {
                    if (i == 6) {
                        $scope.d1 = $scope.listReportHome[i].revenue;
                        $scope.n1 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 5) {
                        $scope.d2 = $scope.listReportHome[i].revenue;
                        $scope.n2 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 4) {
                        $scope.d3 = $scope.listReportHome[i].revenue;
                        $scope.n3 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 3) {
                        $scope.d4 = $scope.listReportHome[i].revenue;
                        $scope.n4 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 2) {
                        $scope.d5 = $scope.listReportHome[i].revenue;
                        $scope.n5 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 1) {
                        $scope.d6 = $scope.listReportHome[i].revenue;
                        $scope.n6 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                    if (i == 0) {
                        $scope.d7 = $scope.listReportHome[i].revenue;
                        $scope.n7 = $scope.listReportHome[i].date;
                    } else {
                        if (i == $scope.listReportHome.length) {
                            break;
                        }
                    }
                }
                $scope.loadhightchar();
                $scope.time();
               
            });
        }

        $scope.checkLogin();
        function FindUser() {
            apiService.get('api/account/users', null, function (result) {
                $scope.authentication.storeName = result.data.StoreName;
                $scope.authentication.phoneNumber = result.data.PhoneNumber;
                $scope.authentication.address = result.data.Address;
                $scope.authentication.fullName = result.data.FullName;
                $scope.authentication.UserName = result.data.UserName;
                $scope.authentication.Email = result.data.Email;
                $scope.authentication.BirthDay = result.data.BirthDay;
                $scope.authentication.Id = result.data.Id;
                apiService.get('api/account/store', null, function (result) {
                    $scope.authentication.expirydate = result.data.Expirydate;
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


                }, function (error) {
                    notificationService.displayError(error.data);
                });

                $scope.getReportHome();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }


    }
})(angular.module('tiktak'));