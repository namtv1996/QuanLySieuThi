(function (app) {
    app.controller('purchaseReturnListController', purchaseReturnListController);

    purchaseReturnListController.$inject = ['$scope', 'apiService','notificationService'];
    function purchaseReturnListController($scope, apiService, notificationService) {
        $scope.getPurchaseReturn = getPurchaseReturn;
        $scope.listPurchaseReturn = [];
        $scope.getVendor = getVendor;
        $scope.listVendor = [];
        $scope.getInwardStock = getInwardStock;
        $scope.listInwardStock = [];

        function getInwardStock() {
            apiService.get('api/purchaseInvoice/getall', null, function (result) {
                $scope.listInwardStock = result.data;
                for (var i = 0; i < $scope.listPurchaseReturn.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listPurchaseReturn[i].InwardStockID === $scope.listInwardStock[j].VoucherID) {
                            $scope.listPurchaseReturn[i].InwardStockVoucherNo = $scope.listInwardStock[j].INVoucherNo;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;
                for (var i = 0; i < $scope.listPurchaseReturn.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listPurchaseReturn[i].ObjectID === $scope.listVendor[j].ObjectID) {
                            $scope.listPurchaseReturn[i].VendorName = $scope.listVendor[j].ObjectName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getPurchaseReturn() {
            apiService.get('api/purchaseInvoice/getPurchaseReturn', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listPurchaseReturn = result.data;
                $scope.getInwardStock();
                $scope.getVendor();
                for (var i in $scope.listPurchaseReturn) {
                    if ($scope.listPurchaseReturn[i].Status === 1) {
                        $scope.listPurchaseReturn[i].status = "Đã trả";
                        $scope.listPurchaseReturn[i].cs = "available";
                    }
                    if ($scope.listPurchaseReturn[i].Status === 0) {
                        $scope.listPurchaseReturn[i].status = "Đang trả";
                        $scope.listPurchaseReturn[i].cs = "not-available";
                    }
                    if ($scope.listPurchaseReturn[i].Status === 1 && $scope.listPurchaseReturn[i].PaymentStatus === 2) {
                        $scope.listPurchaseReturn[i].status = "Hoàn thành";
                        $scope.listPurchaseReturn[i].cs = "available";
                    }
                }
                for (var j in $scope.listPurchaseReturn) {
                    if ($scope.listPurchaseReturn[j].PaymentStatus === 0) {
                        $scope.listPurchaseReturn[j].tt = 'fa fa-circle-o';
                    } else {
                        if ($scope.listPurchaseReturn[j].PaymentStatus === 1) {
                            $scope.listPurchaseReturn[j].tt = 'fa fa-adjust';
                        }
                        if ($scope.listPurchaseReturn[j].PaymentStatus === 2) {
                            $scope.listPurchaseReturn[j].tt = 'fa fa-circle';
                        }
                    }
                }

            }, function () {
                console.log('load data failed');
            });
        }
        $scope.getPurchaseReturn();

    }
})(angular.module('tiktak.purchaseReturn'));