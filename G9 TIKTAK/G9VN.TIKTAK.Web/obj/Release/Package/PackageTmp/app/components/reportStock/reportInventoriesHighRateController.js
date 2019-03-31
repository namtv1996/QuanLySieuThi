(function (app) {
    app.controller('reportInventoriesHighRateController', reportInventoriesHighRateController);

    reportInventoriesHighRateController.$inject = ['$scope', 'apiService'];
    function reportInventoriesHighRateController($scope, apiService) {

        $scope.getItemOpt = getItemOpt;
        $scope.listItemOpt = [];

        $scope.branchid = '';
        $scope.list_branch = [];

        $scope.ViewReport = ViewReport;

        function ViewReport() {
            apiService.get('api/statistic/reportInventoriesHighRate?branchid=' + $scope.branchid, null, function (result) {
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

                apiService.get('api/statistic/reportInventoriesHighRate?branchid=' + $scope.branchid, null, function (result) {
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