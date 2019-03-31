(function (app) {
    app.controller('purchaseInvoiceDetailController', purchaseInvoiceDetailController);

    purchaseInvoiceDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$state', '$stateParams'];
    function purchaseInvoiceDetailController($scope, apiService, notificationService, $ngBootbox, $state, $stateParams) {

        $scope.getBranch = getBranch;
        $scope.Branch = {};
        $scope.getVendor = getVendor;
        $scope.Vendor = {};

        $scope.getInvoiceById = getInvoiceById;
        $scope.invoice = {};

        $scope.deleteInvoice = deleteInvoice;

        $scope.GetInvoiceDetail = GetInvoiceDetail;
        $scope.listInvoiceDetail = [];
        $scope.getItem = getItem;
        $scope.listItemOpt = [];

        $scope.ThanhToan = ThanhToan;
        $scope.AddCashPayment = AddCashPayment;

        function ThanhToan(id) {
            if ($scope.invoice.PaymentStatus === 0) {

                $scope.invoice.PaymentStatus = 1;
                $scope.invoice.INVoucherDate = new Date();
                apiService.put('api/purchaseInvoice/update', $scope.invoice,
                    function (result) {
                        notificationService.displaySuccess('Thanh toán hóa đơn thành công !!');
                        var inwardStock = {};
                        apiService.get('api/purchaseInvoice/getbyid/' + $scope.invoice.InwardStockID, null,
                            function (result) {
                                inwardStock = result.data;
                                inwardStock.PaymentStatus = 1;
                                apiService.put('api/purchaseInvoice/update', inwardStock,
                                    function (result) {
                                    }, function (error) {
                                    }
                                );
                                $scope.AddCashPayment($scope.invoice.TotalPaymentAmount);
                            }, function (error) {
                                notificationService.displayError('Thất bại !!');
                            }
                        );

                        //báo công nợ nhà cung cấp.(thanh toán thì công nợ giảm đi)
                        if ($scope.invoice.ObjectID !== null) {
                            if ($scope.Vendor.Debt === 0) {
                                $scope.Vendor.Debt = vendor.Debt;
                            } else {
                                $scope.Vendor.Debt = $scope.Vendor.Debt - $scope.invoice.TotalPaymentAmount;
                            }
                            apiService.put('api/vendor/update', $scope.Vendor,
                                function (result) {
                                }, function (error) {
                                }
                            );
                        }
                        $scope.getInvoiceById();

                    }, function (error) {
                        notificationService.displayError('Cập nhật không thành công.');
                    }
                );
            } else {
                notificationService.displayWarning('Hóa đơn này đã được thanh toán rồi.');
            }
        }

        function AddCashPayment(amount) {
            var cashPayment = {};
            cashPayment.ObjectID = $scope.invoice.ObjectID;
            cashPayment.BranchID = $scope.invoice.BranchID;
            cashPayment.OriginalVoucherNo = $scope.invoice.OriginalVoucherNo;
            cashPayment.InwardStockID = $scope.invoice.InwardStockID;
            cashPayment.VoucherType = 40;
            cashPayment.Status = 0;
            cashPayment.TotalAmount = amount;
            cashPayment.INVoucherDate = new Date();
            apiService.post('api/purchaseInvoice/createCashPayment', cashPayment,
                function (result) {
                    notificationService.displaySuccess('Phiếu chi cho hóa đơn ' + $scope.invoice.INVoucherNo + ' đã được tạo !!');

                }, function (error) {
                    notificationService.displayError('Không tạo được phiếu chi !!');
                });
        }

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
                            if (vendorid !== null && vendorid !== '') {
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
                            }
                            notificationService.displaySuccess('Đã xóa hóa đơn !!');
                            $scope.getInvoiceById();
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

        function GetInvoiceDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.listInvoiceDetail = result.data;
                $scope.getItem();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getItem() {
            apiService.get('api/positem/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.listInvoiceDetail.length; i++) {
                    for (var j = 0; j < $scope.listItemOpt.length; j++) {
                        if ($scope.listInvoiceDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.listInvoiceDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.listInvoiceDetail[i].SKU_Code = $scope.listItemOpt[j].SKU;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getVendor(id) {
            apiService.get('api/vendor/getbyid/' + id, null, function (result) {
                $scope.Vendor = result.data;

                if ($scope.invoice.ObjectID === $scope.Vendor.ObjectID) {
                    $scope.invoice.VendorName = $scope.Vendor.ObjectName;
                    $scope.invoice.VendorAddress = $scope.Vendor.ObjectAddress;
                    $scope.invoice.VendorTel = $scope.Vendor.Tel;
                    $scope.invoice.Email = $scope.Vendor.Email;
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function getBranch(id) {
            apiService.get('api/branch/getbyid/' + id, null, function (result) {
                $scope.Branch = result.data;

                if ($scope.invoice.BranchID === $scope.Branch.BranchID) {
                    $scope.invoice.BranchName = $scope.Branch.BranchName;
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function getInvoiceById() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null, function (result) {

                $scope.invoice = result.data;
                if ($scope.invoice.ObjectID !== null) {
                    $scope.getVendor($scope.invoice.ObjectID);
                }
                $scope.getBranch($scope.invoice.BranchID);
                if ($scope.invoice.INVoucherDate === null) {
                    $scope.invoice.INVoucherDate = '_ _ /_ _ /_ _';
                }
                if ($scope.invoice.PaymentStatus == 0) {
                    $scope.invoice.tt = 'Đang thanh toán';
                    $scope.invoice.cs = 'blue';
                } else {
                    $scope.invoice.tt = 'Đã thanh toán';
                    $scope.invoice.cs = 'available';
                }


            }, function () {
                console.log('load data failed');
            });
        }

        $scope.getInvoiceById();
        $scope.GetInvoiceDetail();
    }
})(angular.module('tiktak.inwardStock'));