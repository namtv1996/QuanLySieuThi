(function (app) {
    app.controller('cashPaymentTypetListController', cashPaymentTypetListController);
    cashPaymentTypetListController.$inject = ['$scope', 'apiService', 'notificationService'];

    function cashPaymentTypetListController($scope, apiService, notificationService) {
        //khai bao mot mang listreceipt
        $scope.listCashPaymenType = [];
        $scope.getListCashPaymenType = getListCashPaymenType;
        function getListCashPaymenType() {
            //truyen vao url cua api 
            apiService.get('api/cashbook/getall_cashpaymenttype', null, function () {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi')
                }
                $scope.listCashPaymenType = result.data;
            }, function () {
                console.log();
            });
        }

        //goi ham getListCashPayment
        $scope.getListCashPaymenType();
    }
})(angular.module('tiktak.cashbook'));