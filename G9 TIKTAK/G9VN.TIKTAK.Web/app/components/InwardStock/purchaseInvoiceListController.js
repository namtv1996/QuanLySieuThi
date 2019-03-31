(function (app) {
    app.controller('purchaseInvoiceListController', purchaseInvoiceListController);

    purchaseInvoiceListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$state'];
    function purchaseInvoiceListController($scope, apiService, notificationService, $ngBootbox, $state) {

        $scope.getBranch = getBranch;
        $scope.listBranch = [];
        $scope.getVendor = getVendor;
        $scope.listVendor = [];
        $scope.getPurchaseInvoice = getPurchaseInvoice;
        $scope.listInvoice = [];
        $scope.deleteInvoice = deleteInvoice;


        function deleteInvoice(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.get('api/purchaseInvoice/getbyid/' + id, null, function (result) {
                    var a = {};
                    a = result.data;
                    var vendorid = a.ObjectID;
                    var amount = a.TotalPaymentAmount;
                    if (a.PaymentStatus === 0) {
                        apiService.del('api/purchaseInvoice/deleteInwardStock', config, function () {

                            apiService.get('api/vendor/getbyid/' + vendorid, null,
                                function (result) {
                                    var vendor = {};
                                    vendor = result.data;
                                    if (vendor.ObjectID === vendorid) {
                                        vendor.Debt = vendor.Debt - amount;
                                        apiService.put('api/vendor/update', vendor
                                        );
                                    }
                                }, function (error) {
                                    console.log('Ko cập nhật đk công nợ !!');
                                }
                            );
                            notificationService.displaySuccess('Đã xóa hóa đơn !!');
                            getInwardStock();
                        }, function () {
                            notificationService.displayError('Xóa không thành công');
                        });
                    } else {
                        notificationService.displayWarning('Hóa đơn đã thanh toán. Không thể xóa hóa đơn này này !!');
                    }

                }, function () {
                    console.log('load items failed');
                });
            });
        }


        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;
                for (var i = 0; i < $scope.listInvoice.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listInvoice[i].ObjectID === $scope.listVendor[j].ObjectID) {
                            $scope.listInvoice[i].VendorName = $scope.listVendor[j].ObjectName;
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
                for (var i = 0; i < $scope.listInvoice.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listInvoice[i].BranchID === $scope.listBranch[j].BranchID) {
                            $scope.listInvoice[i].BranchName = 'Chi nhánh ' + $scope.listBranch[j].BranchName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getPurchaseInvoice() {
            apiService.get('api/purchaseInvoice/getpurchaseinvoice', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listInvoice = result.data;
                $scope.getVendor();
                $scope.getBranch();
                for (var j in $scope.listInvoice) {
                    if ($scope.listInvoice[j].PaymentStatus == 0) {

                        $scope.listInvoice[j].tt = 'fa fa-circle-o';
                        $scope.listInvoice[j].btn = 'btn btn-default';
                        $scope.listInvoice[j].icon = 'fa fa-trash-o';
                    } else {
                        $scope.listInvoice[j].tt = 'fa fa-circle';
                        $scope.listInvoice[j].btn = '';
                        $scope.listInvoice[j].icon = '';
                    }
                }

            }, function () {
                console.log('load data failed');
            });
        }
        $scope.getPurchaseInvoice();
    }
})(angular.module('tiktak.inwardStock'));