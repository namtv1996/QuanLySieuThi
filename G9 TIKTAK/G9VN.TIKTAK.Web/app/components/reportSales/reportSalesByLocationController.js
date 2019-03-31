(function(app) {
    app.controller('reportSalesByLocationController', reportSalesByLocationController);

    reportSalesByLocationController.$inject = ['$scope', 'apiService'];
    function reportSalesByLocationController($scope, apiService) {
        $scope.ReportSaleByBranch = ReportSaleByBranch;
        $scope.listReport = [];

        $scope.SoLuongDonHang = 0
        $scope.TienHang = 0;
        $scope.TienThue = 0;
        $scope.TienChietKhau = 0;
        $scope.PhiGiaoHang = 0;
        $scope.DoanhThu = 0;
        $scope.TienMat = 0;
        $scope.TrungBinh = 0

        $scope.end_date = new Date();
        $scope.start_date = new Date($scope.end_date.getTime() - 1000 * 3600 * 24 * 30);
        $scope.start_date.setHours(0);
        $scope.start_date.setMinutes(0);
        $scope.start_date.setSeconds(0);
        $scope.start_date.setMilliseconds(0);
        $scope.start_date = new Date($scope.start_date);
       
        $scope.ViewReport = ViewReport;

        function ViewReport() {
            $scope.listReport = [];

            $scope.SoLuongDonHang = 0;
            $scope.TienHang = 0;
            $scope.TienThue = 0;
            $scope.TienChietKhau = 0;
            $scope.PhiGiaoHang = 0;
            $scope.DoanhThu = 0;
            $scope.TienMat = 0;
            $scope.TrungBinh = 0;

            var config = {
                params: {
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportSaleByBranch', config, function(result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;

                    if ($scope.listReport[i].TotalAmount === null) {
                        $scope.listReport[i].TotalAmount = 0;
                    }
                    if ($scope.listReport[i].TotalVATAmount === null) {
                        $scope.listReport[i].TotalVATAmount = 0;
                    }
                    if ($scope.listReport[i].DiscountAmount === null) {
                        $scope.listReport[i].DiscountAmount = 0;
                    }
                    if ($scope.listReport[i].ShippingAmount === null) {
                        $scope.listReport[i].ShippingAmount = 0;
                    }
                    if ($scope.listReport[i].TotalPayingCustomer === null) {
                        $scope.listReport[i].TotalPayingCustomer = 0;
                    }
                    if ($scope.listReport[i].Revenue === null) {
                        $scope.listReport[i].Revenue = 0;
                    }
                    if ($scope.listReport[i].Medium === null) {
                        $scope.listReport[i].Medium = 0;
                    }

                    $scope.SoLuongDonHang = $scope.SoLuongDonHang + $scope.listReport[i].QuantitySaleOrder;
                    $scope.TienHang = $scope.TienHang + $scope.listReport[i].TotalAmount;
                    $scope.TienThue = $scope.TienThue + $scope.listReport[i].TotalVATAmount;
                    $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].DiscountAmount;
                    $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].ShippingAmount;
                    $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].Revenue;
                    $scope.TienMat = $scope.TienMat + $scope.listReport[i].TotalPayingCustomer;
                    $scope.TrungBinh = $scope.TrungBinh + $scope.listReport[i].Medium;
                }

            }, function() {
                console.log('load items failed');
            });
        }

        function ReportSaleByBranch() {
           
            var config = {
                params: {
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportSaleByBranch', config, function(result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;

                    if ($scope.listReport[i].TotalAmount === null) {
                        $scope.listReport[i].TotalAmount = 0;
                    }
                    if ($scope.listReport[i].TotalVATAmount === null) {
                        $scope.listReport[i].TotalVATAmount = 0;
                    }
                    if ($scope.listReport[i].DiscountAmount === null) {
                        $scope.listReport[i].DiscountAmount = 0;
                    }
                    if ($scope.listReport[i].ShippingAmount === null) {
                        $scope.listReport[i].ShippingAmount = 0;
                    }
                    if ($scope.listReport[i].TotalPayingCustomer === null) {
                        $scope.listReport[i].TotalPayingCustomer = 0;
                    }
                    if ($scope.listReport[i].Revenue === null) {
                        $scope.listReport[i].Revenue = 0;
                    }
                    if ($scope.listReport[i].Medium === null) {
                        $scope.listReport[i].Medium = 0;
                    }

                    $scope.SoLuongDonHang = $scope.SoLuongDonHang + $scope.listReport[i].QuantitySaleOrder;
                    $scope.TienHang = $scope.TienHang + $scope.listReport[i].TotalAmount;
                    $scope.TienThue = $scope.TienThue + $scope.listReport[i].TotalVATAmount;
                    $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].DiscountAmount;
                    $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].ShippingAmount;
                    $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].Revenue;
                    $scope.TienMat = $scope.TienMat + $scope.listReport[i].TotalPayingCustomer;
                    $scope.TrungBinh = $scope.TrungBinh + $scope.listReport[i].Medium;
                }

            }, function() {
                console.log('load items failed');
            });
        }

        $scope.ReportSaleByBranch();



    }
})(angular.module('tiktak.reportSales'));