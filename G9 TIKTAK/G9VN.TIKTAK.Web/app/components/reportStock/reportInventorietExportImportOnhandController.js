(function (app) {
    app.controller('reportInventorietExportImportOnhandController', reportInventorietExportImportOnhandController);
    reportInventorietExportImportOnhandController.$inject = ['$scope', 'apiService'];
    function reportInventorietExportImportOnhandController($scope, apiService) {

        ////page hiện tại
        //$scope.curr = 1;
        //lấy thông tin tài khoản
        $scope.account = {};
        $scope.BranchID = '';

        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            $scope.BranchID = $scope.account.BranchID;
            $scope.ViewReport();
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

        $scope.date2 = new Date();
        $scope.date1 = new Date($scope.date2.getTime() - 3600 * 1000 * 24 * 30);
        $scope.date1.setHours(0);
        $scope.date1.setMinutes(0);
        $scope.date1.setSeconds(0);
        $scope.date1.setMilliseconds(0);
        $scope.date1 = new Date($scope.date1);
        //báo cáo kỳ hiện tại
        $scope.report = [];
        //tổng tồn kho đầu kì
        $scope.totalA1 = 0;
        // tổng giá trị tồn kho đầu kì
        $scope.totalA2 = 0;
        // tổng số lượng nhập trong kì 
        $scope.totalA3_7 = 0;
        // tổng giá trị tăng trong kì
        $scope.totalValueA3_7 = 0;
        //tổng số lượng xuất trong kì
        $scope.totalA8_11 = 0;
        // tổng giá trị giảm trong kì
        $scope.totalValueA8_11 = 0;
        // tổng số lượng tồn kho cuối kì
        $scope.totalA14 = 0;
        // tổng giá trị tồn kho cuối kì
        $scope.totalA15 = 0;
        // xem báo cáo
        $scope.ViewReport = function () {
            var config = {
                params: {
                    BranchID: $scope.BranchID,
                    date1: $scope.date1,
                    date2: $scope.date2
                }
            }

            apiService.get('api/report/ReportImportExport', config, function (result) {
                $scope.report = result.data;
                for (var index in $scope.report) {
                    $scope.totalA1 += $scope.report[index].a1;
                    $scope.totalA2 += $scope.report[index].a2;
                    $scope.totalA3_7 += $scope.report[index].a3 + $scope.report[index].a4 + $scope.report[index].a5 + $scope.report[index].a6 + $scope.report[index].a7;
                    $scope.totalValueA3_7 += $scope.totalA3_7*$scope.report[index].PurchasePrice;
                    $scope.totalA8_11 += $scope.report[index].a8 + $scope.report[index].a9 + $scope.report[index].a10 + $scope.report[index].a11;
                    $scope.totalValueA8_11 += $scope.totalA8_11 * $scope.report[index].PurchasePrice;
                    $scope.totalA14 += $scope.report[index].a14;
                    $scope.totalA15 += $scope.report[index].a15;
                }
            });
        }
    }
})(angular.module('tiktak.reportStock'));