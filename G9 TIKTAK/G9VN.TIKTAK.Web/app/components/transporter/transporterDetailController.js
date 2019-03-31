
(function (app) {
    app.controller('transporterDetailController', transporterDetailController);

    transporterDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox','$stateParams','$state'];
    function transporterDetailController($scope, apiService, notificationService, $ngBootbox, $stateParams, $state) {
        $scope.transporter = {};
        $scope.getTransporterById = getTransporterById;

        $scope.UpdateTransporter = UpdateTransporter;

        $scope.GetCountVoucherAndTotalAmount = GetCountVoucherAndTotalAmount;
        $scope.info = {};

        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;

        $scope.changeAmount = changeAmount;
        function changeAmount(){
            if ($scope.transporter.Debt === undefined) {
                $scope.transporter.Debt = '0';
            } else {
                $scope.transporter.Debt = Currency(ConvertNumber($scope.transporter.Debt.toString()));
            }     
        }
        //Dinh dang tien VND
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                } else {
                    break;
                }
            }
            var Gia = "";
            var dem = 0;
            for (var i = arr1.length - 1; i >= 0; i--) {
                dem++;
                Gia = Gia + arr1[i];
                if (dem == 3 && i != 0) {
                    Gia = Gia + ",";
                    dem = 0;
                }
            }
            var arr2 = new String(Gia);
            var GiaMoi = '';
            for (var i = arr2.length - 1; i >= 0; i--) {
                GiaMoi = GiaMoi + arr2[i];
            }
            return GiaMoi;
        }
        //Dinh dang so
        function ConvertNumber(str) {
            var arr = new String(str);
            var monney = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != ',') {
                    monney = monney + arr[i];
                }
            }
            return monney;
        }

        function GetCountVoucherAndTotalAmount() {
            apiService.get('api/transporter/getCountVoucherAndTotalAmount?id=' + $stateParams.id, null, function (result) {
                $scope.info = result.data;
                if ($scope.info.countVoucher === null) { $scope.info.countVoucher = 0; }
                if ($scope.info.totalAmount === null) { $scope.info.totalAmount = 0; }
                $scope.info.countVoucher = Currency($scope.info.countVoucher.toString());
                $scope.info.totalAmount = Currency($scope.info.totalAmount.toString());
            }, function (error) {
                console.log('(T.T)');
            });
        }

        function getTransporterById() {
            apiService.get('api/transporter/getbyid/' + $stateParams.id, null, function (result) {
                $scope.transporter = result.data;
                $scope.transporter.Debt = Currency($scope.transporter.Debt.toString());
                $scope.GetCountVoucherAndTotalAmount();
            }, function (error) {
                console.log('(T.T)');
            });
        }

        function UpdateTransporter() {
            $scope.transporter.Debt = Number(ConvertNumber($scope.transporter.Debt.toString()));
            apiService.put('api/transporter/update', $scope.transporter, function (result) {
                notificationService.displaySuccess('Cập nhật thành công !');
                $state.go('transporter');
            }, function (error) {
                console.log('(T.T)');
            });
        }

        $scope.getTransporterById();


    }
})(angular.module('tiktak.transporter'));

