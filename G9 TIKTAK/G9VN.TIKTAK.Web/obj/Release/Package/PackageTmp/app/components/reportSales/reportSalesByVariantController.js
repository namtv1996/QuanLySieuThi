(function (app) {
    app.controller('reportSalesByVariantController', reportSalesByVariantController);

    reportSalesByVariantController.$inject = ['$scope', 'apiService'];
    function reportSalesByVariantController($scope, apiService) {

        $scope.getReportBestSell = getReportBestSell;
        $scope.listReport = [];

        $scope.TotalQuantity = 0;
        $scope.TotalVoucherQuantity = 0;
        $scope.TotalAmount = 0;

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

            $scope.TotalQuantity = 0;
            $scope.TotalVoucherQuantity = 0;
            $scope.TotalAmount = 0;

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportBestSell', config, function(result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    $scope.TotalQuantity = $scope.TotalQuantity + $scope.listReport[i].Quantity;
                    $scope.TotalVoucherQuantity = $scope.TotalVoucherQuantity + $scope.listReport[i].VoucherQuantity;
                    $scope.TotalAmount = $scope.TotalAmount + $scope.listReport[i].Amount;
                }

            }, function() {
                console.log('load items failed');
            });
        }

        function getReportBestSell() {
         
            apiService.get('api/branch/getall', null, function(result) {
                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;

                var config = {
                    params: {
                        branchid: $scope.branchid,
                        date1: $scope.start_date,
                        date2: $scope.end_date
                    }
                }

                apiService.get('api/statistic/reportBestSell', config, function(result) {
                    $scope.listReport = result.data;

                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                        $scope.TotalQuantity = $scope.TotalQuantity + $scope.listReport[i].Quantity;
                        $scope.TotalVoucherQuantity = $scope.TotalVoucherQuantity + $scope.listReport[i].VoucherQuantity;
                        $scope.TotalAmount = $scope.TotalAmount + $scope.listReport[i].Amount;
                    }
                }, function() {
                    console.log('load items failed');
                });

            }, function() { });          
        }

        $scope.getReportBestSell();

    }
})(angular.module('tiktak.reportSales'));