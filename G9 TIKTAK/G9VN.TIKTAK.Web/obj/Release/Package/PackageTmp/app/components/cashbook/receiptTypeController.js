(function (app) {
    app.controller('receipTypetListController', receipTypetListController);
    receipTypetListController.$inject = ['$scope', 'apiService', 'notificationService'];

    function receipTypetListController($scope, apiService, notificationService) {
        //khai bao mot mang listreceipt
        $scope.listReceiptType = [];
        $scope.getListReceiptType = getListReceiptType;
        function getListReceiptType() {
            //truyen vao url cua api 
            apiService.get('api/cashbook/getall_receipttype', null, function () {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi')
                }
                $scope.listReceiptType = result.data;
            }, function () {
                console.log();
            });
        }

        //goi ham getListReceipt
        $scope.getListReceiptType();
    }
})(angular.module('tiktak.cashbook'));