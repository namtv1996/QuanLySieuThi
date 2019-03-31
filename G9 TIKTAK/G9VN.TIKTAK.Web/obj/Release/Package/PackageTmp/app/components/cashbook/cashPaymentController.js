(function (app) {
    app.controller('cashPaymentController', cashPaymentController);
    cashPaymentController.$inject = ['$scope', 'apiService', 'notificationService']

    function cashPaymentController($scope, apiService, notificationService) {
        //khai bao mot mang listreceipt
        $scope.listCashPayment = [];
        $scope.getListCashPayment = getListCashPayment;
        $scope.getObject = getObject;
        $scope.listObject = [];

        function getObject(id) {
           
            apiService.get('api/vendor/getallobject', null, function (result) {               
                for (var i = 0; i < $scope.listCashPayment.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listCashPayment[i].ObjectID === result.data[j].ObjectID) {
                            $scope.listCashPayment[i].ObjectName = result.data[j].ObjectName;
                        }
                    }
                }
            }, function () {
                console.log();
            });
            
        }

        function getListCashPayment() {

            apiService.get('api/purchaseInvoice/getCashPayment', null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi')
                }
                $scope.listCashPayment = result.data;
                for (var i = 0; i < $scope.listCashPayment.length; i++) {
                    if ($scope.listCashPayment[i].Status === 0) {
                        $scope.listCashPayment[i].CashBookType = 'Tự động';
                    }
                    if ($scope.listCashPayment[i].Status === 1) {
                        $scope.listCashPayment[i].CashBookType = 'Thủ công';
                    }
                    if ($scope.listCashPayment[i].VoucherType === 40) {
                        $scope.listCashPayment[i].PaymentMethod = 'Tiền mặt';
                    }
                    if ($scope.listCashPayment[i].VoucherType === 41) {
                        $scope.listCashPayment[i].PaymentMethod = 'COD';
                    }
                    if ($scope.listCashPayment[i].VoucherType === 42) {
                        $scope.listCashPayment[i].PaymentMethod = 'Chuyển khoản';
                    }
                }
                $scope.getObject();
            }, function () {
                console.log();
            });
        }


        $scope.getListCashPayment();
    }
})(angular.module('tiktak.cashbook'));