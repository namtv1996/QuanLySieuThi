(function (app) {
    app.controller('inwardStockDetailsController', inwardStockDetailsController);

    inwardStockDetailsController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$ngBootbox', '$state'];
    function inwardStockDetailsController($scope, apiService, $stateParams, notificationService, $ngBootbox, $state) {
        $scope.inwardStock = {
            VoucherID: null,
            INVoucherNo: null,
            Status: null
        };
        $scope.GetVoucherById = GetVoucherById;
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.voucherDetail = [];
        $scope.getItem = getItem;
        $scope.listItemOpt = [];
        $scope.GetVendor = GetVendor;
        $scope.listVendor = [];

        $scope.deleteVoucher = deleteVoucher;

        $scope.HoaDonToanBo = HoaDonToanBo;
        $scope.AddInvoiceFullDetail = AddInvoiceFullDetail;
        $scope.ThanhToan = ThanhToan;

        $scope.AddCashPayment = AddCashPayment;
        $scope.GetCashPaymentByInwardStock = GetCashPaymentByInwardStock;
        $scope.listCashPayment = [];

        $scope.NhapKhoToanBo = NhapKhoToanBo;
        $scope.AddPartialStorageDetail = AddPartialStorageDetail;
        $scope.aps = {};

        $scope.displayInvoice = '';
        $scope.displayPayment = 'none';
        $scope.displayInward = '';
        $scope.displayReturn = 'none';
        $scope.displayReturn1 = 'none';

        $scope.PrintDiv = PrintDiv;

        $scope.getInvoiceByInwardStock = getInvoiceByInwardStock;
        $scope.listInvoiceByInwardStock = [];

        $scope.getPartialStorageByInwardStock = getPartialStorageByInwardStock;
        $scope.listPartialStorageByInwardStock = [];
        $scope.listPartialStorageDetail = [];
        $scope.getPurchaseReturnByISID = getPurchaseReturnByISID;
        $scope.listPurchaseReturnByISID = [];

        $scope.deleteInvoice = deleteInvoice;

        $scope.BtnEdit_Click = BtnEdit_Click;

        function BtnEdit_Click() {
            if ($scope.inwardStock.Status === 0) {
                $state.go('inwardStockEdit', { id: $scope.inwardStock.VoucherID });
            } else {
                notificationService.displayWarning('Phiếu nhập đã phát sinh giao dịch. Không thể sửa đổi !!');
            }
        }

        //xóa hóa đơn
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
                            $scope.GetVoucherById();
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

        function getPurchaseReturnByISID() {
            apiService.get('api/purchaseInvoice/getPurchaseReturnByISIDAndStt/' + $stateParams.id, null,
                function (result) {
                    $scope.listPurchaseReturnByISID = result.data;
                    if ($scope.listPurchaseReturnByISID.length <= 0) {
                        $scope.displayReturn = 'none';
                        //$scope.displayReturn1 = 'block';
                    } else {
                        $scope.displayReturn = 'block';
                        var total_return_quantity = 0;
                        for (var i = 0; i < $scope.listPurchaseReturnByISID.length; i++) {
                            total_return_quantity = total_return_quantity + $scope.listPurchaseReturnByISID[i].TotalPurchaseQuantity;

                        }
                        if (total_return_quantity >= $scope.inwardStock.TotalPurchaseQuantity) {
                            $scope.displayReturn1 = 'none';
                        }

                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function getPartialStorageByInwardStock() {
            apiService.get('api/purchaseInvoice/getPartialStorageByInwardStock/' + $stateParams.id, null,
                function (result) {
                    $scope.listPartialStorageByInwardStock = result.data;
                    var total_quantity = 0;
                    for (var i = 0; i < $scope.listPartialStorageByInwardStock.length; i++) {
                        $scope.listPartialStorageByInwardStock[i].stt = i + 1;
                        $scope.listPartialStorageByInwardStock[i].displayReturn2 = 'block';
                        total_quantity = total_quantity + $scope.listPartialStorageByInwardStock[i].TotalPurchaseQuantity;
                        if ($scope.listPartialStorageByInwardStock[i].Status === 0 || $scope.listPartialStorageByInwardStock[i].Status === 1) {
                            $scope.listPartialStorageByInwardStock[i].displayReturn2 = 'block';
                        } else {
                            if ($scope.listPartialStorageByInwardStock[i].Status === 2) {
                                $scope.listPartialStorageByInwardStock[i].displayReturn2 = 'none';
                            }
                        }
                        if ($scope.listPartialStorageByInwardStock[i].INVoucherDate === null) {
                            $scope.listPartialStorageByInwardStock[i].INVoucherDate = '_ _ /_ _ /_ _';
                        }
                    }
                    if ($scope.inwardStock.TotalPurchaseQuantity <= total_quantity) {
                        $scope.displayInward = 'none';
                        $scope.inwardStock.tt = "Đã nhập kho";
                        $scope.inwardStock.cs = "available";
                        for (var j = 0; j < $scope.listPartialStorageByInwardStock.length; j++) {
                            $scope.listPartialStorageByInwardStock[j].displayReturn2 = 'none';
                        }
                        $scope.displayReturn1 = 'block';
                    } else {
                        $scope.displayInward = 'block';
                    }


                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function GetCashPaymentByInwardStock() {
            apiService.get('api/purchaseInvoice/getCashPaymentByInwardStock/' + $stateParams.id, null,
                function (result) {
                    $scope.listCashPayment = result.data;
                    if ($scope.listCashPayment.length <= 0) {
                        $scope.displayPayment = 'none';
                    } else {
                        $scope.displayPayment = 'block';
                        for (var i = 0; i < $scope.listCashPayment.length; i++) {
                            if ($scope.listCashPayment[i].INVoucherDate === null) {
                                $scope.listCashPayment[i].INVoucherDate = '_ _ /_ _ /_ _';
                            }
                        }
                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function getInvoiceByInwardStock() {
            apiService.get('api/purchaseInvoice/getInvoiceByInwardStock/' + $stateParams.id, null,
                function (result) {
                    $scope.listInvoiceByInwardStock = result.data;
                    var total_payment = 0;
                    for (var i = 0; i < $scope.listInvoiceByInwardStock.length; i++) {
                        $scope.listInvoiceByInwardStock[i].stt = i + 1;
                        if ($scope.listInvoiceByInwardStock[i].PaymentStatus === 1) {
                            $scope.listInvoiceByInwardStock[i].displayPayment1 = 'block';
                            $scope.listInvoiceByInwardStock[i].displayPayment2 = 'none';
                        } else {
                            $scope.listInvoiceByInwardStock[i].displayPayment1 = 'none';
                            $scope.listInvoiceByInwardStock[i].displayPayment2 = 'block';
                        }

                        if ($scope.listInvoiceByInwardStock[i].INVoucherDate === null) {
                            $scope.listInvoiceByInwardStock[i].INVoucherDate = '_ _ /_ _ /_ _';
                        }
                        total_payment = total_payment + $scope.listInvoiceByInwardStock[i].TotalPaymentAmount;
                    }
                    if ($scope.inwardStock.TotalPaymentAmount <= total_payment) {
                        $scope.displayInvoice = 'none';

                    } else {
                        $scope.displayInvoice = 'block';
                    }

                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        //in
        function PrintDiv() {
            var contents = document.getElementById("dvContents").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Tiktac.vn</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }

        $scope.AddDetail = AddDetail;
        function AddDetail(i, invoice_detail, voucherid) {
            if (i < $scope.voucherDetail.length) {
                var partialStorageDetail = {};
                $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].Quantity;
                if (invoice_detail.length > 0) {
                    for (var j = 0; j < invoice_detail.length; j++) {
                        if ($scope.voucherDetail[i].ItemID === invoice_detail[j].ItemID) {
                            $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].maxquantity - invoice_detail[j].Quantity;
                        }
                    }
                }
                if ($scope.voucherDetail[i].maxquantity > 0) {
                    partialStorageDetail.VoucherID = voucherid;
                    partialStorageDetail.ItemID = $scope.voucherDetail[i].ItemID;
                    partialStorageDetail.Quantity = $scope.voucherDetail[i].maxquantity;
                    partialStorageDetail.UnitPrice = $scope.voucherDetail[i].UnitPrice;
                    partialStorageDetail.DiscountRate = $scope.voucherDetail[i].DiscountRate;
                    partialStorageDetail.DiscountAmount = (partialStorageDetail.DiscountRate * (partialStorageDetail.Quantity * partialStorageDetail.UnitPrice)) / 100;
                    partialStorageDetail.VATRate = $scope.voucherDetail[i].VATRate;
                    partialStorageDetail.Amount = partialStorageDetail.Quantity * partialStorageDetail.UnitPrice - partialStorageDetail.DiscountAmount;
                    apiService.post('api/purchaseInvDetail/create', partialStorageDetail,
                        function (result) {
                            AddDetail(i + 1, invoice_detail, voucherid);
                            console.log('Thêm chi tiết đơn nhận hàng thành công');
                        }, function (error) {
                            console.log('Thêm chi tiết đơn nhận hàng không thành công.');
                        }
                    );
                } else {
                    AddDetail(i + 1, invoice_detail, voucherid);
                }
            } else {
                var param = {
                    BranchID: $scope.aps.BranchID,
                    voucherID: $scope.aps.VoucherID
                }
                apiService.put('api/stock/updateClosingQuantity', param,
                    function (result) {
                        console.log('cập nhật tồn kho thành công !!');
                    }, function (error) {
                        console.log(error);
                    }
                );

                $scope.GetVoucherById();
                notificationService.displaySuccess('Nhập kho đã hoàn thành !!');
            }
        }

        function AddPartialStorageDetail(voucherid) {
            apiService.get('api/purchaseInvDetail/getPartialStorageDetail/' + $stateParams.id, null,
                function (result) {
                    var invoice_detail = [];
                    invoice_detail = result.data;

                    AddDetail(0, invoice_detail, voucherid);

                }, function (error) {
                    console.log('Failed !!');
                }
            );
        }


        function NhapKhoToanBo() {
            var partialStorage = {};
            partialStorage.ObjectID = $scope.inwardStock.ObjectID;
            partialStorage.OriginalVoucherNo = $scope.inwardStock.INVoucherNo;
            partialStorage.InwardStockID = $scope.inwardStock.VoucherID;
            partialStorage.StockImportStatus = 1;
            partialStorage.BranchID = $scope.inwardStock.BranchID;
            partialStorage.INVoucherDate = new Date();
            if ($scope.listPartialStorageByInwardStock.length <= 0) {
                partialStorage.TotalPaymentAmount = $scope.inwardStock.TotalPaymentAmount;
                partialStorage.TotalPurchaseQuantity = $scope.inwardStock.TotalPurchaseQuantity;
            } else {
                partialStorage.TotalPaymentAmount = $scope.inwardStock.TotalPaymentAmount;
                partialStorage.TotalPurchaseQuantity = $scope.inwardStock.TotalPurchaseQuantity;
                for (var i = 0; i < $scope.listPartialStorageByInwardStock.length; i++) {
                    partialStorage.TotalPaymentAmount = partialStorage.TotalPaymentAmount - $scope.listPartialStorageByInwardStock[i].TotalPaymentAmount;
                    partialStorage.TotalPurchaseQuantity = partialStorage.TotalPurchaseQuantity - $scope.listPartialStorageByInwardStock[i].TotalPurchaseQuantity;
                }
            }

            apiService.post('api/purchaseInvoice/createPartialStorage', partialStorage,
                function (result) {
                    $scope.aps = result.data;

                    $scope.AddPartialStorageDetail($scope.aps.VoucherID);

                    $scope.inwardStock.Status = 1;
                    $scope.inwardStock.INVoucherDate = new Date();
                    $scope.inwardStock.StockImportStatus = 2;
                    apiService.put('api/purchaseInvoice/update', $scope.inwardStock,
                        function (result) {

                        }, function (error) {
                            notificationService.displayError('Thất bại !!');
                        }
                    );


                }, function (error) {
                    notificationService.displayError('Nhập kho không thành công.');
                });
        }

        function ThanhToan(id) {
            apiService.get('api/purchaseInvoice/getbyid/' + id, null, function (result) {
                var invoice = {};
                invoice = result.data

                invoice.PaymentStatus = 1;
                invoice.INVoucherDate = new Date();
                apiService.put('api/purchaseInvoice/update', invoice,
                    function (result) {
                        notificationService.displaySuccess('Hóa đơn được thanh toán !!');
                        $scope.inwardStock.PaymentStatus = 1;
                        apiService.put('api/purchaseInvoice/update', $scope.inwardStock,
                            function (result) {
                                $scope.GetVoucherById();
                                $scope.AddCashPayment(invoice.TotalPaymentAmount);
                            }, function (error) {
                                notificationService.displayError('Thất bại !!');
                            }
                        );
                        //báo công nợ nhà cung cấp.(thanh toán thì công nợ giảm đi)
                        if ($scope.inwardStock.ObjectID !== null) {
                            var vendor = {};
                            apiService.get('api/vendor/getbyid/' + $scope.inwardStock.ObjectID, null,
                                function (result) {
                                    vendor = result.data;
                                    if (vendor.ObjectID === $scope.inwardStock.ObjectID) {
                                        if (vendor.Debt === 0) {
                                            vendor.Debt = vendor.Debt;
                                        } else {
                                            vendor.Debt = vendor.Debt - $scope.invoice.TotalPaymentAmount;
                                        }
                                        apiService.put('api/vendor/update', vendor

                                        );
                                    }
                                }, function (error) {
                                    notificationService.displayError('Thất bại !!');
                                }
                            );
                        }
                    }, function (error) {
                        notificationService.displayError('Cập nhật không thành công.');
                    });
            },
                function () {
                    console.log('load items failed');
                }
            );
        }

        function AddCashPayment(amount) {
            var cashPayment = {};
            cashPayment.ObjectID = $scope.inwardStock.ObjectID;
            cashPayment.BranchID = $scope.inwardStock.BranchID;
            cashPayment.OriginalVoucherNo = $scope.inwardStock.INVoucherNo;
            cashPayment.InwardStockID = $scope.inwardStock.VoucherID;
            cashPayment.VoucherType = 40;
            cashPayment.Status = 0;
            cashPayment.TotalAmount = amount;
            cashPayment.TotalAmountOC = amount;
            cashPayment.Description = 'Trả tiền cho nhà cung cấp khi nhập hàng';
            cashPayment.INVoucherDate = new Date();
            apiService.post('api/purchaseInvoice/createCashPayment', cashPayment,
                function (result) {

                }, function (error) {
                    notificationService.displayError('Không tạo được phiếu chi !!');
                });
        }

        function AddInvoiceFullDetail(voucherid) {
            apiService.get('api/purchaseInvDetail/getpurchaseinvoicedetail/' + $stateParams.id, null,
                function (result) {
                    var invoice_detail = [];
                    invoice_detail = result.data;
                    for (var i = 0; i < $scope.voucherDetail.length; i++) {
                        var invoiceDetail = {};
                        $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].Quantity;
                        if (invoice_detail.length > 0) {
                            for (var j = 0; j < invoice_detail.length; j++) {
                                if ($scope.voucherDetail[i].ItemID === invoice_detail[j].ItemID) {
                                    $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].maxquantity - invoice_detail[j].Quantity;
                                }
                            }
                        }
                        invoiceDetail.VoucherID = voucherid;
                        invoiceDetail.ItemID = $scope.voucherDetail[i].ItemID;
                        invoiceDetail.Quantity = $scope.voucherDetail[i].maxquantity;
                        invoiceDetail.UnitPrice = $scope.voucherDetail[i].UnitPrice;
                        invoiceDetail.DiscountRate = $scope.voucherDetail[i].DiscountRate;
                        invoiceDetail.DiscountAmount = (invoiceDetail.DiscountRate * (invoiceDetail.Quantity * invoiceDetail.UnitPrice)) / 100;
                        invoiceDetail.VATRate = $scope.voucherDetail[i].VATRate;
                        invoiceDetail.Amount = invoiceDetail.Quantity * invoiceDetail.UnitPrice - invoiceDetail.DiscountAmount;
                        apiService.post('api/purchaseInvDetail/create', invoiceDetail,
                            function (result) {
                                console.log('Thêm chi tiết hóa đơn thành công');
                            }, function (error) {
                                console.log('Thêm chi tiết hóa đơn không thành công.');
                            }
                        );
                    }

                }, function (error) {
                    console.log('Failed !!');
                }
            );
        }

        function HoaDonToanBo() {
            var hoadon = {};
            hoadon.ObjectID = $scope.inwardStock.ObjectID;
            hoadon.OriginalVoucherNo = $scope.inwardStock.INVoucherNo;
            hoadon.DeliveryDate = $scope.inwardStock.DeliveryDate;
            hoadon.InwardStockID = $scope.inwardStock.VoucherID;
            hoadon.PaymentStatus = 0;
            hoadon.BranchID = $scope.inwardStock.BranchID;
            hoadon.Status = 0;
            if ($scope.listInvoiceByInwardStock.length <= 0) {
                hoadon.TotalPaymentAmount = $scope.inwardStock.TotalPaymentAmount;
                hoadon.TotalPurchaseQuantity = $scope.inwardStock.TotalPurchaseQuantity;
                hoadon.TotalAmount = $scope.inwardStock.TotalAmount;
                hoadon.TotalVATAmount = $scope.inwardStock.TotalVATAmount;
                hoadon.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmount;
                hoadon.DiscountForInvoice = $scope.inwardStock.DiscountForInvoice;
            } else {
                hoadon.TotalPaymentAmount = $scope.inwardStock.TotalPaymentAmount;
                hoadon.TotalPurchaseQuantity = $scope.inwardStock.TotalPurchaseQuantity;
                hoadon.TotalAmount = $scope.inwardStock.TotalAmount;
                hoadon.TotalVATAmount = $scope.inwardStock.TotalVATAmount;
                hoadon.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmount;
                hoadon.DiscountForInvoice = $scope.inwardStock.DiscountForInvoice;
                for (var i = 0; i < $scope.listInvoiceByInwardStock.length; i++) {
                    hoadon.TotalPaymentAmount = hoadon.TotalPaymentAmount - $scope.listInvoiceByInwardStock[i].TotalPaymentAmount;
                    hoadon.TotalPurchaseQuantity = hoadon.TotalPurchaseQuantity - $scope.listInvoiceByInwardStock[i].TotalPurchaseQuantity;
                    hoadon.TotalAmount = hoadon.TotalAmount - $scope.listInvoiceByInwardStock[i].TotalAmount;
                    hoadon.TotalVATAmount = hoadon.TotalVATAmount - $scope.listInvoiceByInwardStock[i].TotalVATAmount;
                    hoadon.TotalDiscountAmount = hoadon.TotalDiscountAmount - $scope.listInvoiceByInwardStock[i].TotalDiscountAmount;
                    hoadon.DiscountForInvoice = hoadon.DiscountForInvoice - $scope.listInvoiceByInwardStock[i].DiscountForInvoice;
                }
            }

            apiService.post('api/purchaseInvoice/createInv', hoadon,
                function (result) {
                    var detail = result.data;
                    $scope.AddInvoiceFullDetail(detail.VoucherID);
                    notificationService.displaySuccess('Đã xuất hóa đơn !!');
                    $scope.inwardStock.InvoiceExportStatus = 2;
                    apiService.put('api/purchaseInvoice/update', $scope.inwardStock,
                        function (result) {
                            $scope.GetVoucherById();

                        }, function (error) {
                            notificationService.displayError('Thất bại !!');
                        }
                    );

                    //báo công nợ nhà cung cấp(xuất hóa đơn thì công nợ tăng lên)
                    if ($scope.inwardStock.ObjectID !== null) {
                        var vendor = {};
                        apiService.get('api/vendor/getbyid/' + $scope.inwardStock.ObjectID, null,
                            function (result) {
                                vendor = result.data;
                                if (vendor.ObjectID === $scope.inwardStock.ObjectID) {
                                    vendor.Debt = vendor.Debt + $scope.hoadon.TotalPaymentAmount;
                                    apiService.put('api/vendor/update', vendor
                                    );
                                }
                            }, function (error) {
                                notificationService.displayError('Thất bại !!');
                            }
                        );
                    }
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
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
                            $state.go('inwardStock');
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

        function GetVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;

                for (var j = 0; j < result.data.length; j++) {
                    if ($scope.inwardStock.ObjectID === $scope.listVendor[j].ObjectID) {
                        $scope.inwardStock.ObjectName = $scope.listVendor[j].ObjectName;
                        $scope.inwardStock.ObjectAddress = $scope.listVendor[j].ObjectAddress;
                        $scope.inwardStock.Tel = $scope.listVendor[j].Tel;
                        $scope.inwardStock.Email = $scope.listVendor[j].Email;
                        $scope.inwardStock.ObjectAddress = $scope.listVendor[j].ObjectAddress;
                    }
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function GetVoucherDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherDetail = result.data;
                $scope.getItem();

            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getItem() {
            apiService.get('api/positem/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.voucherDetail.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.voucherDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.voucherDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.voucherDetail[i].SKU_Code = $scope.listItemOpt[j].SKU;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function GetVoucherById() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null, function (result) {
                $scope.inwardStock = result.data;
                if ($scope.inwardStock.Status === 1) {
                    $scope.inwardStock.tt = "Đã nhập kho";
                    $scope.inwardStock.cs = "available";
                }
                if ($scope.inwardStock.Status === 0) {
                    $scope.inwardStock.tt = "Chờ nhập kho";
                    $scope.inwardStock.cs = "not-available";
                }
                if ($scope.inwardStock.Status === 2) {
                    $scope.inwardStock.tt = "Đang nhập kho";
                    $scope.inwardStock.cs = "blue";
                }


                $scope.GetVendor();
                $scope.getInvoiceByInwardStock();
                $scope.GetCashPaymentByInwardStock();
                $scope.getPartialStorageByInwardStock();
                $scope.getPurchaseReturnByISID();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.GetVoucherById();
        $scope.GetVoucherDetail();

    }
})(angular.module('tiktak.inwardStock'));