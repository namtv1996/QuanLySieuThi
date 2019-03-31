(function (app) {
    app.controller('reportOrderReturnsByDateController', reportOrderReturnsByDateController);

    reportOrderReturnsByDateController.$inject = ['$scope', 'apiService'];
    function reportOrderReturnsByDateController($scope, apiService) {

        $scope.ReportSaleOrderReturn = ReportSaleOrderReturn;
        $scope.listReport = [];
        $scope.TotalQuantityReturn = 0;
        $scope.TotalAmountReturn = 0;

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
            $scope.TotalQuantityReturn = 0;
            $scope.TotalAmountReturn = 0;

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportSaleOrderReturn', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    $scope.TotalQuantityReturn = $scope.TotalQuantityReturn + $scope.listReport[i].QuantityReturn;
                    $scope.TotalAmountReturn = $scope.TotalAmountReturn + $scope.listReport[i].TotalAmount;
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function ReportSaleOrderReturn() {            
            apiService.get('api/branch/getall', null, function (result) {
                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;

                var config = {
                    params: {
                        branchid: $scope.branchid,
                        date1: $scope.start_date,
                        date2: $scope.end_date
                    }
                }

                apiService.get('api/statistic/reportSaleOrderReturn', config, function (result) {
                    $scope.listReport = result.data;
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                        $scope.TotalQuantityReturn = $scope.TotalQuantityReturn + $scope.listReport[i].QuantityReturn;
                        $scope.TotalAmountReturn = $scope.TotalAmountReturn + $scope.listReport[i].TotalAmount;
                    }

                }, function () {
                    console.log('load items failed');
                });
            }, function () {
            });
        }

        $scope.ReportSaleOrderReturn();


    }
})(angular.module('tiktak.reportSales'));