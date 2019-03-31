(function (app) {
    app.controller('reportDebtsSuppliersController', reportDebtsSuppliersController);

    reportDebtsSuppliersController.$inject = ['$scope', 'apiService'];
    function reportDebtsSuppliersController($scope, apiService) {

        $scope.getVendor = getVendor;
        $scope.listVendor = [];

        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;
                $scope.TotalDebt = 0;
                for (var i = 0; i < $scope.listVendor.length; i++) {
                    $scope.listVendor[i].stt = i + 1;
                    $scope.TotalDebt = $scope.TotalDebt + $scope.listVendor[i].Debt;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.getVendor();

    }
})(angular.module('tiktak.reportFinance'));