(function (app) {
    app.controller('reportsInventoriesStockAdjustmentsController', reportsInventoriesStockAdjustmentsController);

    reportsInventoriesStockAdjustmentsController.$inject = ['$scope', 'apiService'];
    function reportsInventoriesStockAdjustmentsController($scope, apiService) {
        $scope.ReportInventoriesStockAjustments = ReportInventoriesStockAjustments;
        $scope.listReport = [];
        $scope.TotalDifference = 0;
        $scope.TotalAmount = 0;

        $scope.listBranch = [];
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
            $scope.TotalDifference = 0;
            $scope.TotalAmount = 0;

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportInventoriesStockAdjustments', config, function (result) {
                $scope.listReport = result.data;

                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    $scope.TotalDifference = $scope.TotalDifference + $scope.listReport[i].Result;
                    $scope.TotalAmount = $scope.TotalAmount + $scope.listReport[i].Amount;
                }

            }, function () {
                console.log('load items failed');
            });

        }

        function ReportInventoriesStockAjustments() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranch = result.data;
                $scope.branchid = $scope.listBranch[0].BranchID;

                var config = {
                    params: {
                        branchid: $scope.branchid,
                        date1: $scope.start_date,
                        date2: $scope.end_date
                    }
                }

                apiService.get('api/statistic/reportInventoriesStockAdjustments', config, function (result) {
                    $scope.listReport = result.data;
                    
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                        $scope.TotalDifference = $scope.TotalDifference + $scope.listReport[i].Result;
                        $scope.TotalAmount = $scope.TotalAmount + $scope.listReport[i].Amount;
                    }
                   
                }, function () {
                    console.log('load items failed');
                });
            }, function () {
            });

        }

        $scope.ReportInventoriesStockAjustments();
    }
})(angular.module('tiktak.reportStock'));