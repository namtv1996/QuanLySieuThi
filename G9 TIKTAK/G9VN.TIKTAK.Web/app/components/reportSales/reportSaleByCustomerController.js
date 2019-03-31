(function (app) {
    app.controller('reportSaleByCustomerController', reportSaleByCustomerController);

    reportSaleByCustomerController.$inject = ['$scope', 'apiService'];
    function reportSaleByCustomerController($scope, apiService) {

        $scope.ReportSaleByCustomer = ReportSaleByCustomer;
        $scope.listReport = [];

        $scope.TienHang = 0;
        $scope.TienThue = 0;
        $scope.TienChietKhau = 0;
        $scope.DoanhThu = 0;
        $scope.TienMat = 0;

        $scope.list_branch = [];
        $scope.branchid = '';

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
            $scope.TienHang = 0;
            $scope.TienThue = 0;
            $scope.TienChietKhau = 0;
            $scope.DoanhThu = 0;
            $scope.TienMat = 0;

            var config = {
                params: {
                    date1: $scope.start_date,
                    date2: $scope.end_date,
                    branchid: $scope.branchid
                }
            }

            apiService.get('api/statistic/reportSaleByCustomer', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    $scope.listReport[i].doanhthu = $scope.listReport[i].totalAmount + $scope.listReport[i].totalVATAmount - $scope.listReport[i].discountAmount;

                    if ($scope.listReport[i].totalPayingCustomer === null) {
                        $scope.listReport[i].totalPayingCustomer = 0;
                    }

                    $scope.TienHang = $scope.TienHang + $scope.listReport[i].totalAmount;
                    $scope.TienThue = $scope.TienThue + $scope.listReport[i].totalVATAmount;
                    $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].discountAmount;
                    $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].doanhthu;
                    $scope.TienMat = $scope.TienMat + $scope.listReport[i].totalPayingCustomer;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function ReportSaleByCustomer() {
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

                apiService.get('api/statistic/reportSaleByCustomer', config, function (result) {
                    $scope.listReport = result.data;
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                        $scope.listReport[i].doanhthu = $scope.listReport[i].totalAmount + $scope.listReport[i].totalVATAmount - $scope.listReport[i].discountAmount;

                        if ($scope.listReport[i].totalPayingCustomer === null) {
                            $scope.listReport[i].totalPayingCustomer = 0;
                        }

                        $scope.TienHang = $scope.TienHang + $scope.listReport[i].totalAmount;
                        $scope.TienThue = $scope.TienThue + $scope.listReport[i].totalVATAmount;
                        $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].discountAmount;
                        $scope.DoanhThu = $scope.DoanhThu + $scope.listReport[i].doanhthu;
                        $scope.TienMat = $scope.TienMat + $scope.listReport[i].totalPayingCustomer;
                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load items failed');
            });

           
        }
       
        $scope.ReportSaleByCustomer();

    }
})(angular.module('tiktak.reportSales'));