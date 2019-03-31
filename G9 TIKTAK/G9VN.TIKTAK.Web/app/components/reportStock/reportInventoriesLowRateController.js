(function (app) {
    app.controller('reportInventoriesLowRateController', reportInventoriesLowRateController);

    reportInventoriesLowRateController.$inject = ['$scope', 'apiService','notificationService'];
    function reportInventoriesLowRateController($scope, apiService, notificationService) {

        $scope.getItemOpt = getItemOpt;
        $scope.listItemOpt = [];

        $scope.branchid = '';
        $scope.list_branch = [];

        $scope.ViewReport = ViewReport;

        function ViewReport() {
            apiService.get('api/statistic/reportInventoriesLowRate?branchid=' + $scope.branchid, null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có hàng hóa nào có tồn kho dưới định mức tối thiểu !!!');
                }
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.listItemOpt.length; i++) {
                    $scope.listItemOpt[i].stt = i + 1;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getItemOpt() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;

                apiService.get('api/statistic/reportInventoriesLowRate?branchid=' + $scope.branchid, null, function (result) {
                    if (result.data.length === 0) {
                        notificationService.displayWarning('Không có hàng hóa nào có tồn kho dưới định mức tối thiểu !!!');
                    }
                    $scope.listItemOpt = result.data;
                    for (var i = 0; i < $scope.listItemOpt.length; i++) {
                        $scope.listItemOpt[i].stt = i + 1;
                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () { });
        }

        $scope.getItemOpt();


    }
})(angular.module('tiktak.reportStock'));