(function (app) {
    app.controller('inwardStockListController', inwardStockListController);

    inwardStockListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function inwardStockListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.getInwardStock = getInwardStock;
        $scope.listInwardStock = [];
        $scope.getBranch = getBranch;
        $scope.listBranch = [];
        $scope.getVendor = getVendor;
        $scope.listVendor = [];
        $scope.deleteVoucher = deleteVoucher;
        $scope.getByStatus = getByStatus;

        function getByStatus(status) {
            var config = {
                params: {
                    status: status
                }
            }
            apiService.get('api/purchaseInvoice/getbystatus', config, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listInwardStock = result.data;
                $scope.getVendor();
                $scope.getBranch();
                for (var i in $scope.listInwardStock) {
                    if ($scope.listInwardStock[i].Status == 1) {
                        $scope.listInwardStock[i].tt = "Đã nhập";
                        $scope.listInwardStock[i].cs = "available";
                    }
                    if ($scope.listInwardStock[i].Status == 0) {
                        $scope.listInwardStock[i].tt = "Chờ nhập kho";
                        $scope.listInwardStock[i].cs = "not-available";
                    }
                    if ($scope.listInwardStock[i].Status == 2) {
                        $scope.listInwardStock[i].tt = "Đang nhập kho";
                        $scope.listInwardStock[i].cs = "blue";
                    }
                    if ($scope.listInwardStock[i].INVoucherDate === null) {
                        $scope.listInwardStock[i].INVoucherDate = '_ _ /_ _ /_ _';
                    }
                }

            }, function () {
                console.log('load data failed');
            });
        }

        function deleteVoucher(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.get('api/purchaseInvoice/getbyid/' + id, null, function (result) {
                    var a = {};
                    a = result.data;
                    if (a.PaymentStatus === 0 && a.StockImportStatus === 0 && a.InvoiceExportStatus === 0) {
                        apiService.del('api/purchaseInvoice/deleteInwardStock', config, function () {
                            notificationService.displaySuccess('Xóa thành công');
                            getInwardStock();
                        }, function () {
                            notificationService.displayError('Xóa không thành công');
                        });
                    } else {
                        notificationService.displayWarning('Phiếu nhập đã phát sinh giao dịch. Không thể xóa phiếu nhập này !!');
                    }

                }, function () {
                    console.log('load items failed');
                });

            });
        }

        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;
                for (var i = 0; i < $scope.listInwardStock.length; i++) {
                    if ($scope.listInwardStock[i].ObjectID === null) {
                        $scope.listInwardStock[i].VendorName = '- - - - - - - - - -';
                    } else {
                        for (var j = 0; j < result.data.length; j++) {
                            if ($scope.listInwardStock[i].ObjectID === $scope.listVendor[j].ObjectID) {
                                $scope.listInwardStock[i].VendorName = $scope.listVendor[j].ObjectName;
                            }
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranch = result.data;
                for (var i = 0; i < $scope.listInwardStock.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listInwardStock[i].BranchID === $scope.listBranch[j].BranchID) {
                            $scope.listInwardStock[i].BranchName = $scope.listBranch[j].BranchName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getInwardStock() {
            apiService.get('api/purchaseInvoice/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listInwardStock = result.data;
                $scope.getVendor();
                $scope.getBranch();
                for (var i in $scope.listInwardStock) {
                    if ($scope.listInwardStock[i].Status == 1) {
                        $scope.listInwardStock[i].tt = "Đã nhập";
                        $scope.listInwardStock[i].cs = "available";
                    }
                    if ($scope.listInwardStock[i].Status == 0) {
                        $scope.listInwardStock[i].tt = "Chờ nhập";
                        $scope.listInwardStock[i].cs = "not-available";
                    }
                    if ($scope.listInwardStock[i].Status == 2) {
                        $scope.listInwardStock[i].tt = "Đang nhập";
                        $scope.listInwardStock[i].cs = "blue";
                    }
                    if ($scope.listInwardStock[i].INVoucherDate === null) {
                        $scope.listInwardStock[i].INVoucherDate = '_ _ /_ _ /_ _';
                    }
                }

            }, function () {
                console.log('load data failed');
            });
        }
        $scope.getInwardStock();
    }
})(angular.module('tiktak.inwardStock'));