(function (app) {
    app.controller('reportVouchersController', reportSalesController);

    reportSalesController.$inject = ['$scope', 'apiService','$state'];
    function reportSalesController($scope, apiService, $state) {

        $scope.ReportCashBook = ReportCashBook;
        $scope.listReport = [];
        $scope.data = {};
        //lấy thông tin tài khoản
        $scope.account = {};
        $scope.BranchID = '';

        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            $scope.BranchID = $scope.account.BranchID;
            $scope.ReportCashBook();
        });

        //lấy ds chi nhánh
        $scope.branch = [];
        $scope.getBranch = getBranch;
        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.branch = result.data;
            }, function () {
                console.log('load itemCategory failed');
            });
        }
        $scope.getBranch();

        //ngày hiện tại
        $scope.date2 = new Date();
        //30 ngày trước
        $scope.date1 = new Date($scope.date2.getTime() - 1000 * 3600 * 24 * 30);
        $scope.date1.setHours(0);
        $scope.date1.setMinutes(0);
        $scope.date1.setSeconds(0);
        $scope.date1.setMilliseconds(0);
        $scope.date1 = new Date($scope.date1);

        $scope.getVoucherDetail = getVoucherDetail;
        function getVoucherDetail(stt) {
            if ($scope.listReport[stt].VoucherType >= 20 && $scope.listReport[stt].VoucherType <= 25) {
                $state.go('receipt_detail', { id: $scope.listReport[stt].VoucherID });
            }
            if ($scope.listReport[stt].VoucherType >= 40 && $scope.listReport[stt].VoucherType <= 42) {
                $state.go('cashpaymenttype_detail', { id: $scope.listReport[stt].VoucherID });
            }
        }

        function ReportCashBook() {
            var config = {
                params:{
                    BranchID: $scope.BranchID,
                    date1: $scope.date1,
                    date2: $scope.date2
                }
            }
            apiService.get('api/report/reportCashBook', config, function (result) {
                $scope.listReport = result.data;
                for (var i in $scope.listReport) { $scope.listReport[i].stt = i; }

                apiService.get('api/report/reportCashBook1', config, function (result) {
                    $scope.data = result.data;
                }, function () {
                    console.log('error reportCashBook1 ');
                });
            }, function () {
                console.log('error reportCashBook ');
            });
        }
    }
})(angular.module('tiktak.reportFinance'));