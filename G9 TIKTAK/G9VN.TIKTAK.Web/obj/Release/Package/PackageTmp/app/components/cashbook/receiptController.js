(function (app){
    app.controller('receiptListController', receiptListController);
    receiptListController.$inject = ['$scope', 'apiService', 'notificationService'];
   
    function receiptListController($scope, apiService, notificationService) {
        //khai bao mot mang listreceipt
        $scope.listReceipt = [];
        $scope.getListReceipt1 = getListReceipt1;
        //lấy thông tin tài khoản
        $scope.account = {};
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            //goi ham getListReceipt
            $scope.getListReceipt1();
        });

        $scope.getListReceipt1 = getListReceipt1;
        function getListReceipt1() {
            //truyen vao url cua api 
            apiService.get('api/saleOrder/getall_receipt1?BranchID=' + $scope.account.BranchID, null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào');
                }
                else {
                    $scope.listReceipt = result.data;
                    //gán phương thức thanh toán
                    for (var index in $scope.listReceipt) {
                        if ($scope.listReceipt[index].VoucherType === 20 || $scope.listReceipt[index].VoucherType === 23) {
                            $scope.listReceipt[index].method_of_payment = 'Tiền mặt'
                        }
                        if ($scope.listReceipt[index].VoucherType === 21 || $scope.listReceipt[index].VoucherType === 25) {
                            $scope.listReceipt[index].method_of_payment = 'COD'
                        }
                        if ($scope.listReceipt[index].VoucherType === 22 || $scope.listReceipt[index].VoucherType === 24) {
                            $scope.listReceipt[index].method_of_payment = 'Chuyển khoản'
                        }
                        if ($scope.listReceipt[index].OriginalVoucherID !== null && $scope.listReceipt[index].OriginalVoucherID !== "") {
                            $scope.listReceipt[index].originalVoucherID = $scope.listReceipt[index].OriginalVoucherID;
                        }

                    }   

                    notificationService.displaySuccess('Có ' + $scope.listReceipt.length + ' bản ghi');
                }

            }, function () {
                console.log('có lỗi khi gọi api');
            });
        }
      
    
    }
})(angular.module('tiktak.cashbook'));