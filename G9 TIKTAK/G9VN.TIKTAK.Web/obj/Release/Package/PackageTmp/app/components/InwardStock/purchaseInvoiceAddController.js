(function (app) {
    app.controller('purchaseInvoiceAddController', purchaseInvoiceAddController);

    purchaseInvoiceAddController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$state', '$stateParams'];
    function purchaseInvoiceAddController($scope, apiService, notificationService, $ngBootbox, $state, $stateParams) {
        $scope.getInwardStockById = getInwardStockById;
        $scope.inward = {
            TotalInvoiceQuantity: 0,
            TongConLai: 0,
            TotalPaymentAmountForInvoice: 0,
            TotalPaymented: 0,
            TotalAmountHD: 0,
            TotalVATAmountHD: 0,
            TotalDiscountAmountHD: 0,
            DiscountForInvoiceHD: 0
        };
        $scope.getVendor = getVendor;
        $scope.getInwardStockDetail = getInwardStockDetail;
        $scope.listInwardStockDetail = [];
        $scope.getItem = getItem;
        $scope.Update = Update;
        $scope.changeQuantity = changeQuantity;
        $scope.AddInvoice = AddInvoice;
        $scope.invoice = {
            INVoucherNo: null
        };
        $scope.AddInvoiceDetail = AddInvoiceDetail;

        $scope.getInvoiceByInwardStock = getInvoiceByInwardStock;
        $scope.listInvoiceByInwardStock = [];

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'HD',
                    vouchertype1: 5,
                    vouchertype2: 5
                }
            }
            apiService.get('api/purchaseInvoice/getCode', config, function (result) {
                $scope.invoice.INVoucherNo = result.data;
            }, function () {
                console.log('Mã đéo tự sinh được. Akay vl');
            });
        }

        function getInvoiceByInwardStock() {
            apiService.get('api/purchaseInvoice/getInvoiceByInwardStock/' + $stateParams.id, null,
                function (result) {
                    $scope.listInvoiceByInwardStock = result.data;
                    $scope.inward.TotalPaymented = 0;
                    $scope.inward.TotalInvoiceQuantity = $scope.inward.TotalPurchaseQuantity;
                    $scope.inward.DiscountForInvoiceHD = $scope.inward.DiscountForInvoice;
                    $scope.inward.TongConLai = 0;
                    if ($scope.listInvoiceByInwardStock.length > 0) {
                        for (var i = 0; i < $scope.listInvoiceByInwardStock.length; i++) {
                            $scope.listInvoiceByInwardStock[i].stt = i + 1;
                            $scope.inward.TotalInvoiceQuantity = $scope.inward.TotalInvoiceQuantity - $scope.listInvoiceByInwardStock[i].TotalPurchaseQuantity;
                            $scope.inward.DiscountForInvoiceHD = $scope.inward.DiscountForInvoiceHD - $scope.listInvoiceByInwardStock[i].DiscountForInvoice;
                            $scope.inward.TotalPaymented = $scope.inward.TotalPaymented + $scope.listInvoiceByInwardStock[i].TotalPaymentAmount;
                            $scope.inward.TotalPaymentAmountForInvoice = $scope.inward.TotalPaymentAmount - $scope.inward.TotalPaymented;
                        }
                    } else {
                        $scope.inward.TotalPaymentAmountForInvoice = $scope.inward.TotalPaymentAmount - $scope.inward.TotalPaymented;
                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function AddInvoice() {
            var check = true;
            for (var i in $scope.listInwardStockDetail) {
                if ($scope.listInwardStockDetail[i].select1 === true && $scope.listInwardStockDetail[i].quan <= 0) {
                    check = false;
                    break;
                }
            }
            if (check === true) {
                if ($scope.listInwardStockDetail.length > 0) {
                    $scope.invoice.INVoucherNo = $scope.invoice.INVoucherNo;
                    $scope.invoice.OriginalVoucherNo = $scope.inward.INVoucherNo;
                    $scope.invoice.BranchID = $scope.inward.BranchID;
                    $scope.invoice.InwardStockID = $scope.inward.VoucherID;
                    $scope.invoice.ObjectID = $scope.inward.ObjectID;
                    $scope.invoice.DeliveryDate = $scope.inward.DeliveryDate;
                    $scope.invoice.PaymentStatus = 0;
                    $scope.invoice.TotalPurchaseQuantity = $scope.inward.TotalInvoiceQuantity;
                    $scope.invoice.TotalAmount = $scope.inward.TotalAmountHD;
                    $scope.invoice.TotalVATAmount = $scope.inward.TotalVATAmountHD;
                    $scope.invoice.TotalDiscountAmount = $scope.inward.TotalDiscountAmountHD;
                    $scope.invoice.DiscountForInvoice = $scope.inward.DiscountForInvoiceHD;
                    $scope.invoice.TotalPaymentAmount = $scope.inward.TotalPaymentAmountForInvoice;
                    apiService.post('api/purchaseInvoice/createInv', $scope.invoice,
                        function (result) {
                            AddInvoiceDetail(0, result.data);
                            //thêm hóa đơn => tăng công nợ
                            if ($scope.inward.ObjectID !== null) {
                                apiService.get('api/vendor/getbyid/' + $scope.inward.ObjectID, null,
                                    function (result) {
                                        var vendor = {};
                                        vendor = result.data;
                                        if (vendor.ObjectID === $scope.inward.ObjectID) {
                                            vendor.Debt = vendor.Debt + $scope.inward.TotalPaymentAmountForInvoice;
                                            apiService.put('api/vendor/update', vendor
                                            );
                                        }
                                    }, function (error) {
                                        notificationService.displayError('Thất bại !!');
                                    }
                                );
                            }
                            $scope.inward.InvoiceExportStatus = 1;
                            apiService.put('api/purchaseInvoice/update', $scope.inward,
                                function (result) {

                                }, function (error) {
                                    console.log('Cập nhật phiếu thất bại !!');
                                }
                            );
                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        });
                }
            } else {
                notificationService.displayWarning('Hàng hóa nhập vào không hợp lệ');
            }

        }

        function AddInvoiceDetail(i, item) {
            var invoiceDetail = {};
            if (i < $scope.listInwardStockDetail.length) {
                if ($scope.listInwardStockDetail[i].select1 === true && $scope.listInwardStockDetail[i].quan > 0) {
                    invoiceDetail.VoucherID = item.VoucherID;
                    invoiceDetail.ItemID = $scope.listInwardStockDetail[i].ItemID;
                    invoiceDetail.Quantity = $scope.listInwardStockDetail[i].quan;
                    invoiceDetail.UnitPrice = $scope.listInwardStockDetail[i].UnitPrice;
                    invoiceDetail.VATRate = $scope.listInwardStockDetail[i].VATRate;
                    invoiceDetail.DiscountAmount = $scope.listInwardStockDetail[i].chietkhau;
                    invoiceDetail.DiscountRate = $scope.listInwardStockDetail[i].DiscountRate;
                    invoiceDetail.Amount = $scope.listInwardStockDetail[i].Amount;
                    apiService.post('api/purchaseInvDetail/create', invoiceDetail,
                        function (result) {
                            AddInvoiceDetail(i + 1, item);

                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        });

                }
                else {
                    AddInvoiceDetail(i + 1, item);
                }

            }
            else {
                notificationService.displaySuccess('Successfully !!');

                $state.go('inwardStockDetails', { id: $stateParams.id });
            }
        }

        function changeQuantity(stt) {
            $scope.listInwardStockDetail[stt - 1].chietkhau = ($scope.listInwardStockDetail[stt - 1].DiscountRate * ($scope.listInwardStockDetail[stt - 1].quan * $scope.listInwardStockDetail[stt - 1].UnitPrice)) / 100;

            $scope.listInwardStockDetail[stt - 1].Amount = $scope.listInwardStockDetail[stt - 1].UnitPrice * $scope.listInwardStockDetail[stt - 1].quan
                - $scope.listInwardStockDetail[stt - 1].chietkhau;

            $scope.listInwardStockDetail[stt - 1].conlai = $scope.listInwardStockDetail[stt - 1].maxquantity - $scope.listInwardStockDetail[stt - 1].quan;
            $scope.Update();
        }

        function Update() {
            $scope.inward.DiscountForInvoiceHD = 0;
            $scope.inward.TotalInvoiceQuantity = 0;
            $scope.inward.TotalAmountHD = 0;
            $scope.inward.TongConLai = 0;
            $scope.inward.TotalDiscountAmountHD = 0;
            $scope.inward.TotalVATAmountHD = 0;
            $scope.inward.TotalPaymentAmountForInvoice = 0;
            for (var i in $scope.listInwardStockDetail) {
                if ($scope.listInwardStockDetail[i].select1 === true) {
                    $scope.inward.TotalAmountHD = $scope.inward.TotalAmountHD + $scope.listInwardStockDetail[i].Amount;
                    $scope.listInwardStockDetail[i].discount2 = ($scope.listInwardStockDetail[i].Amount / $scope.inward.TotalAmount) * Number($scope.inward.DiscountForInvoice);
                    $scope.inward.TotalVATAmountHD += ($scope.listInwardStockDetail[i].VATRate / 100) * ($scope.listInwardStockDetail[i].Amount - $scope.listInwardStockDetail[i].discount2);
                    $scope.inward.TotalDiscountAmountHD = $scope.inward.TotalDiscountAmountHD + $scope.listInwardStockDetail[i].chietkhau;
                    $scope.inward.TotalInvoiceQuantity = $scope.inward.TotalInvoiceQuantity + $scope.listInwardStockDetail[i].quan;
                    $scope.inward.DiscountForInvoiceHD = $scope.inward.DiscountForInvoiceHD + $scope.listInwardStockDetail[i].discount2;
                }

                $scope.inward.TongConLai = $scope.inward.TongConLai + $scope.listInwardStockDetail[i].maxquantity;
            }
            if ($scope.inward.TotalAmountHD === 0) {
                $scope.inward.TotalPaymentAmountForInvoice = 0;
            } else {
                $scope.inward.TotalPaymentAmountForInvoice = $scope.inward.TotalAmountHD + $scope.inward.TotalVATAmountHD - $scope.inward.DiscountForInvoiceHD;
            }
            $scope.inward.TotalDiscountAmountHD = $scope.inward.TotalDiscountAmountHD + $scope.inward.DiscountForInvoiceHD;
            $scope.inward.TongConLai = $scope.inward.TongConLai - $scope.inward.TotalInvoiceQuantity;
        }

        function getItem() {
            apiService.get('api/itemOption/getall', null,
                function (result) {
                    var item = [];
                    item = result.data;

                    for (var i = 0; i < $scope.listInwardStockDetail.length; i++) {
                        //$scope.listInwardStockDetail[i].select = true;
                        //$scope.listInwardStockDetail[i].stt = i + 1;
                        //$scope.listInwardStockDetail[i].quan = $scope.listInwardStockDetail[i].maxquantity;
                        //$scope.listInwardStockDetail[i].conlai = $scope.listInwardStockDetail[i].maxquantity - $scope.listInwardStockDetail[i].quan;
                        for (var j = 0; j < item.length; j++) {
                            if ($scope.listInwardStockDetail[i].ItemID === item[j].ID) {
                                $scope.listInwardStockDetail[i].ItemName = item[j].Name;
                                $scope.listInwardStockDetail[i].SKU = item[j].SKU;
                            }
                        }
                    }

                }, function (error) {
                    console.log('Failed !!');
                }
            );
        }

        function getInwardStockDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null,
                function (result) {
                    $scope.listInwardStockDetail = result.data;
                    apiService.get('api/purchaseInvDetail/getpurchaseinvoicedetail/' + $stateParams.id, null,
                        function (result) {
                            var invoice_detail = [];
                            invoice_detail = result.data;
                            for (var i = 0; i < $scope.listInwardStockDetail.length; i++) {
                                $scope.listInwardStockDetail[i].stt = i + 1;
                                $scope.listInwardStockDetail[i].select1 = false;
                                $scope.listInwardStockDetail[i].maxquantity = $scope.listInwardStockDetail[i].Quantity;
                                for (var j = 0; j < invoice_detail.length; j++) {
                                    if ($scope.listInwardStockDetail[i].ItemID === invoice_detail[j].ItemID) {
                                        $scope.listInwardStockDetail[i].maxquantity = $scope.listInwardStockDetail[i].maxquantity - invoice_detail[j].Quantity;
                                    }
                                }
                                if ($scope.listInwardStockDetail[i].maxquantity <= 0) {
                                    $scope.listInwardStockDetail[i].select1 = false;
                                    // document.getElementById("" + $scope.listInwardStockDetail[i].stt.toString()).disabled = true;
                                } else {
                                    $scope.listInwardStockDetail[i].select1 = true;
                                }


                                $scope.listInwardStockDetail[i].quan = $scope.listInwardStockDetail[i].maxquantity;
                                $scope.listInwardStockDetail[i].chietkhau = ($scope.listInwardStockDetail[i].DiscountRate * ($scope.listInwardStockDetail[i].quan * $scope.listInwardStockDetail[i].UnitPrice)) / 100;
                                $scope.listInwardStockDetail[i].Amount = $scope.listInwardStockDetail[i].quan * $scope.listInwardStockDetail[i].UnitPrice - $scope.listInwardStockDetail[i].chietkhau;
                                $scope.listInwardStockDetail[i].conlai = $scope.listInwardStockDetail[i].maxquantity - $scope.listInwardStockDetail[i].quan;
                            }

                        }, function (error) {
                            console.log('Failed !!');
                        }
                    );


                    $scope.getItem();
                }, function (error) {
                    console.log('Failed !!');
                }
            );
        }

        function getInwardStockById() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null,
                function (result) {
                    $scope.inward = result.data;

                    $scope.getInvoiceByInwardStock();
                    if ($scope.inward.ObjectID !== null) {
                        $scope.getVendor($scope.inward.ObjectID);
                    }
                    $scope.getCode();
                    $scope.getInwardStockDetail();
                }, function (error) {
                    console.log('Failed !!');
                }
            );
        }

        function getVendor(id) {
            var vendor = {};
            apiService.get('api/vendor/getbyid/' + id, null,
                function (result) {
                    vendor = result.data;
                    if ($scope.inward.ObjectID === vendor.ObjectID) {
                        $scope.inward.VendorName = vendor.ObjectName;
                        $scope.inward.Address = vendor.ObjectAddress;
                        $scope.inward.Tel = vendor.Tel;
                        $scope.inward.Email = vendor.Email;
                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        $scope.getInwardStockById();

    }
})(angular.module('tiktak.inwardStock'));