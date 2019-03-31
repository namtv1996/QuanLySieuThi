(function (app) {
    app.controller('reportSaleByAccountController', reportSaleByAccountController);

    reportSaleByAccountController.$inject = ['$scope', 'apiService'];
    function reportSaleByAccountController($scope, apiService) {

        $scope.ReportSaleByEmployee = ReportSaleByEmployee;
        $scope.listReport = [];
        $scope.TienHang = 0;
        $scope.TienThue = 0;
        $scope.TienChietKhau = 0;
        $scope.PhiGiaoHang = 0;
        $scope.DoanhThu = 0;
        $scope.SoLuongBan = 0;
        $scope.SoLuongTra = 0;
        $scope.TienMat = 0;
        $scope.TienHangTra = 0;
        $scope.DoanhThuThuc = 0;

        $scope.end_date = new Date();
        $scope.start_date = new Date($scope.end_date.getTime() - 1000 * 3600 * 24 * 30);
        $scope.start_date.setHours(0);
        $scope.start_date.setMinutes(0);
        $scope.start_date.setSeconds(0);
        $scope.start_date.setMilliseconds(0);
        $scope.start_date = new Date($scope.start_date);
      
        $scope.list_branch = [];
        $scope.branchid = '';

        $scope.ViewReport = ViewReport;

        function ViewReport() {
            $scope.listReport = [];
            $scope.TienHang = 0;
            $scope.TienThue = 0;
            $scope.TienChietKhau = 0;
            $scope.PhiGiaoHang = 0;
            $scope.DoanhThu = 0;
            $scope.SoLuongBan = 0;
            $scope.SoLuongTra = 0;
            $scope.TienMat = 0;
            $scope.TienHangTra = 0;
            $scope.DoanhThuThuc = 0;

            var config = {
                params: {
                    date1: $scope.start_date,
                    date2: $scope.end_date,
                    branchid: $scope.branchid
                }
            }

            apiService.get('api/statistic/reportSaleByEmployee', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                   
                    if ($scope.listReport[i].totalPayingCustomer === null) {
                        $scope.listReport[i].totalPayingCustomer = 0;
                    }
                    if ($scope.listReport[i].quantityReturn === null) {
                        $scope.listReport[i].quantityReturn = 0;
                    }
                    if ($scope.listReport[i].totalAmountReturn === null) {
                        $scope.listReport[i].totalAmountReturn = 0;
                    }
                   
                    $scope.TienHang = $scope.TienHang + $scope.listReport[i].totalAmount;
                    $scope.TienThue = $scope.TienThue + $scope.listReport[i].totalVatAmount;
                    $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].discountAmount;
                    $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].shippingAmount;
                    $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].revenue;
                    $scope.SoLuongBan = $scope.SoLuongBan + $scope.listReport[i].quantitySales;
                    $scope.SoLuongTra = $scope.SoLuongTra + $scope.listReport[i].quantityReturn;
                    $scope.TienHangTra = $scope.TienHangTra + $scope.listReport[i].totalAmountReturn;
                    $scope.DoanhThuThuc = $scope.DoanhThuThuc + $scope.listReport[i].actualRevenue;
                    $scope.TienMat = $scope.TienMat + $scope.listReport[i].totalPayingCustomer;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function ReportSaleByEmployee() {

            apiService.get('api/branch/getall', null, function (result) {
                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;

                var config = {
                    params: {
                        date1: $scope.start_date,
                        date2: $scope.end_date,
                        branchid: $scope.branchid
                    }
                }

                apiService.get('api/statistic/reportSaleByEmployee', config, function (result) {
                    $scope.listReport = result.data;
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                       
                        if ($scope.listReport[i].quantityReturn === null) {
                            $scope.listReport[i].quantityReturn = 0;
                        }
                        if ($scope.listReport[i].totalAmountReturn === null) {
                            $scope.listReport[i].totalAmountReturn = 0;
                            $scope.listReport[i].actualRevenue = $scope.listReport[i].revenue;
                        }
                        if ($scope.listReport[i].totalPayingCustomer === null) {
                            $scope.listReport[i].totalPayingCustomer = 0;
                        }

                        $scope.TienHang = $scope.TienHang + $scope.listReport[i].totalAmount;
                        $scope.TienThue = $scope.TienThue + $scope.listReport[i].totalVatAmount;
                        $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].discountAmount;
                        $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].shippingAmount;
                        $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].revenue;
                        $scope.SoLuongBan = $scope.SoLuongBan + $scope.listReport[i].quantitySales;
                        $scope.SoLuongTra = $scope.SoLuongTra + $scope.listReport[i].quantityReturn;
                        $scope.TienHangTra = $scope.TienHangTra + $scope.listReport[i].totalAmountReturn;
                        $scope.DoanhThuThuc = $scope.DoanhThuThuc + $scope.listReport[i].actualRevenue;
                        $scope.TienMat = $scope.TienMat + $scope.listReport[i].totalPayingCustomer;
                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load items failed');
            });
        }
     
        $scope.ReportSaleByEmployee();
    }
})(angular.module('tiktak.reportSales'));