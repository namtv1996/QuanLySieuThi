(function (app) {
    app.controller('saleReturnDetailController', saleReturnDetailController);

    saleReturnDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams'];
    function saleReturnDetailController($scope, apiService, notificationService, $stateParams) {

        $scope.getSaleReturnById = getSaleReturnById;
        $scope.saleReturn = {
            TotalQuantity: 0,
            displayReceive: 'block',
            displayReceiveVoucher: 'none',
            TotalPaymented: 0,
            Paymented: 0,
            ConLai: 0
        };
        $scope.getCustomer = getCustomer;
        $scope.customer = {};

        $scope.getSaleReturnDetail = getSaleReturnDetail;
        $scope.listSaleReturnDetail = [];
        $scope.getItemOpt = getItemOpt;
        $scope.listItemOpt = [];

        $scope.AddReceiveVoucher = AddReceiveVoucher
        $scope.AddReceiveVoucherDetail = AddReceiveVoucherDetail

        $scope.getInwardStockBySaleReturn = getInwardStockBySaleReturn;
        $scope.listInwardStockBySaleReturn = [];

        $scope.display_btn = '';
        $scope.thongbao = '';
        $scope.display_pay = 'none';
        $scope.displayPayment = 'none';
        $scope.DisplayPayment = DisplayPayment;


        $scope.GetCashPayment = GetCashPayment;
        $scope.listCashPayment = [];
        $scope.PartialPayment = PartialPayment;


        function GetCashPayment() {
            apiService.get('api/purchaseInvoice/getCashPaymentByInwardStock/' + $scope.saleReturn.VoucherID, null,
                function (result) {
                    $scope.listCashPayment = result.data;
                    if ($scope.listCashPayment.length <= 0) {
                        $scope.displayPayment = 'none';
                        $scope.thongbao = 'none';
                        $scope.saleReturn.TotalPaymented = 0;
                        $scope.saleReturn.ConLai = $scope.saleReturn.TotalAmount - $scope.saleReturn.TotalPaymented;
                    } else {
                        $scope.displayPayment = 'block';
                        $scope.saleReturn.TotalPaymented = 0;
                        for (var i = 0; i < $scope.listCashPayment.length; i++) {
                            if ($scope.listCashPayment[i].INVoucherDate === null) {
                                $scope.listCashPayment[i].INVoucherDate = '_ _ /_ _ /_ _';
                            }

                            $scope.saleReturn.TotalPaymented = $scope.saleReturn.TotalPaymented + $scope.listCashPayment[i].TotalAmount;

                        }

                        $scope.saleReturn.ConLai = $scope.saleReturn.TotalAmount - $scope.saleReturn.TotalPaymented;

                        if ($scope.saleReturn.ConLai <= 0 || $scope.saleReturn.TotalPaymented >= $scope.saleReturn.TotalAmount) {
                            $scope.display_btn = 'none';
                            $scope.display_pay = 'none';
                            $scope.thongbao = 'block';

                            //cập nhật đơn trả hàng                   
                            if ($scope.saleReturn.StatusID === 0 || $scope.saleReturn.StatusID === 3) {
                                $scope.saleReturn.StatusID = 2;
                            } else {
                                if ($scope.saleReturn.StatusID === 1 || $scope.saleReturn.StatusID === 4) {
                                    $scope.saleReturn.StatusID = 5;
                                }
                            }
                            $scope.saleReturn.VoucherDate = new Date($scope.saleReturn.VoucherDate);
                            apiService.put('api/saleOrder/update', $scope.saleReturn,
                                function (result) { },
                                function () { }
                            );
                        } else {
                            $scope.display_btn = 'block';
                            $scope.thongbao = 'none';
                        }
                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function PartialPayment(amount) {
            if (amount > 0) {
                var cashPayment = {};
                cashPayment.ObjectID = $scope.saleReturn.ObjectID;
                cashPayment.BranchID = $scope.saleReturn.BranchID;
                cashPayment.OriginalVoucherNo = $scope.saleReturn.VoucherNo;
                cashPayment.InwardStockID = $scope.saleReturn.VoucherID;
                cashPayment.VoucherType = 40;
                cashPayment.Status = 0;
                cashPayment.TotalAmount = amount;
                cashPayment.TotalAmountOC = amount;
                cashPayment.INVoucherDate = new Date();
                cashPayment.Description = 'Hoàn lại tiền cho khách khi khách trả hàng';
                apiService.post('api/purchaseInvoice/createCashPayment', cashPayment,
                    function (result) {

                        //cập nhật công nợ khách hàng
                        $scope.customer.Debt = $scope.customer.Debt + amount;
                        apiService.put('api/Customer/update', $scope.customer,
                            function (result) {
                                console.log("Cập nhật công nợ");
                            }, function (error) {
                                console.log("Công nợ phải thu đéo tăng lên được");
                            });

                        //cập nhật đơn trả hàng                   
                        if ($scope.saleReturn.StatusID === 0) {
                            $scope.saleReturn.StatusID = 3;
                        } else {
                            if ($scope.saleReturn.StatusID === 1) {
                                $scope.saleReturn.StatusID = 4;
                            }
                        }

                        $scope.saleReturn.VoucherDate = new Date($scope.saleReturn.VoucherDate);
                        apiService.put('api/saleOrder/update', $scope.saleReturn,
                            function (result) { },
                            function () { }
                        );

                        $scope.getSaleReturnById();

                    }, function (error) {
                        notificationService.displayError('Không tạo được phiếu chi !!');
                    });
            } else {
                notificationService.displayWarning('Giá trị phiếu chi phải lớn hơn 0đ !!');
            }
            
        }

        $scope.FullPayment = FullPayment;
        function FullPayment(amount) {
            if (amount > 0) {
                var cashPayment = {};
                cashPayment.ObjectID = $scope.saleReturn.ObjectID;
                cashPayment.BranchID = $scope.saleReturn.BranchID;
                cashPayment.OriginalVoucherNo = $scope.saleReturn.VoucherNo;
                cashPayment.InwardStockID = $scope.saleReturn.VoucherID;
                cashPayment.VoucherType = 40;
                cashPayment.Status = 0;
                cashPayment.TotalAmount = amount;
                cashPayment.TotalAmountOC = amount;
                cashPayment.INVoucherDate = new Date();
                cashPayment.Description = 'Hoàn lại tiền cho khách khi khách trả hàng';
                apiService.post('api/purchaseInvoice/createCashPayment', cashPayment,
                    function (result) {

                        //cập nhật công nợ khách hàng
                        $scope.customer.Debt = $scope.customer.Debt + amount;
                        apiService.put('api/Customer/update', $scope.customer,
                            function (result) {
                                console.log("Cập nhật công nợ");
                            }, function (error) {
                                console.log("Công nợ phải thu đéo tăng lên được");
                            });

                        //cập nhật đơn trả hàng

                        if ($scope.saleReturn.StatusID === 0) {
                            $scope.saleReturn.StatusID = 2;
                        } else {
                            if ($scope.saleReturn.StatusID === 1) {
                                $scope.saleReturn.StatusID = 5;
                            }
                        }
                        $scope.saleReturn.VoucherDate = new Date($scope.saleReturn.VoucherDate);
                        apiService.put('api/saleOrder/update', $scope.saleReturn,
                            function (result) { },
                            function () { }
                        );

                        $scope.getSaleReturnById();

                    }, function (error) {
                        notificationService.displayError('Không tạo được phiếu chi !!');
                    }
                );
            } else {
                notificationService.displayWarning('Giá trị phiếu chi phải lớn hơn 0đ !!');
            }
            
        }

        function DisplayPayment() {
            if ($scope.display_pay === 'block') {
                $scope.display_pay = 'none';
            } else {
                $scope.display_pay = 'block';
            }
        }

        function getInwardStockBySaleReturn(voucherno) {
            var config = {
                params: {
                    sr_voucherno: voucherno
                }
            }
            apiService.get('api/purchaseInvoice/getPurchaseInvoiceBySaleReturn', config, function (result) {
                $scope.listInwardStockBySaleReturn = result.data;
                if ($scope.listInwardStockBySaleReturn.length > 0) {
                    $scope.saleReturn.displayReceive = 'none';
                    $scope.saleReturn.displayReceiveVoucher = 'block';
                } else {
                    $scope.saleReturn.displayReceive = 'block';
                    $scope.saleReturn.displayReceiveVoucher = 'none';
                }

            }, function (error) {
                console.log(error.data);
            });
        }

        function AddReceiveVoucher() {
            if ($scope.listSaleReturnDetail != []) {
                var ReceiveVoucher = {};
                ReceiveVoucher.OriginalVoucherNo = $scope.saleReturn.VoucherNo;
                ReceiveVoucher.ObjectID = $scope.saleReturn.ObjectID;
                ReceiveVoucher.Status = 1;
                ReceiveVoucher.BranchID = $scope.saleReturn.BranchID;
                ReceiveVoucher.StockImportStatus = 1;
                ReceiveVoucher.INVoucherDate = new Date();
                ReceiveVoucher.PaymentStatus = 0;
                ReceiveVoucher.TotalPurchaseQuantity = $scope.saleReturn.TotalQuantity;
                ReceiveVoucher.TotalPaymentAmount = $scope.saleReturn.TotalAmount;
                ReceiveVoucher.TotalAmount = $scope.saleReturn.TotalAmount;
                ReceiveVoucher.TotalVATAmount = $scope.saleReturn.TotalVATAmount;
                ReceiveVoucher.TotalDiscountAmount = $scope.saleReturn.TotalDiscountAmount;
                ReceiveVoucher.DiscountForInvoice = $scope.saleReturn.DiscountAmount;
                apiService.post('api/purchaseInvoice/createVoucherReceiveItemReturn', ReceiveVoucher,
                    function (result) {
                        AddReceiveVoucherDetail(0, result.data);

                        notificationService.displaySuccess('Phiếu nhập hàng đã được tạo !!');
                        $scope.saleReturn.displayReceive = 'none';
                        $scope.saleReturn.displayReceiveVoucher = 'block';

                        //cập nhật đơn trả hàng
                        if ($scope.saleReturn.StatusID === 0) {
                            $scope.saleReturn.StatusID = 1;
                        } else {
                            if ($scope.saleReturn.StatusID === 2) {
                                $scope.saleReturn.StatusID = 5;
                            }
                            if ($scope.saleReturn.StatusID === 3) {
                                $scope.saleReturn.StatusID = 4;
                            }
                        }
                        $scope.saleReturn.VoucherDate = new Date($scope.saleReturn.VoucherDate);
                        apiService.put('api/saleOrder/update', $scope.saleReturn,
                            function (result) { },
                            function () { }
                        );

                        //cập nhật tồn kho
                        var param = {
                            BranchID: $scope.saleReturn.BranchID,
                            voucherID: $scope.saleReturn.VoucherID
                        }
                        apiService.put('api/stock/updateClosingQuantitySaleReturn', param,
                            function (result) {
                                console.log('cập nhật tồn kho thành công !!');
                            }, function (error) {
                                console.log('cập nhật hàng hóa thất bại !!');
                            }
                        );

                        //cập nhật công nợ khách hàng
                        $scope.customer.Debt = $scope.customer.Debt - $scope.saleReturn.TotalAmount;
                        apiService.put('api/Customer/update', $scope.customer,
                            function (result) {
                                console.log('Cập nhật công nợ khách hàng');
                            },
                            function () { }
                        );

                        $scope.getSaleReturnById();

                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });

            }
        }

        function AddReceiveVoucherDetail(i, item) {
            if (i < $scope.listSaleReturnDetail.length) {
                var receiveVoucherDetail = {};
                receiveVoucherDetail.VoucherID = item.VoucherID;
                receiveVoucherDetail.ItemID = $scope.listSaleReturnDetail[i].ItemID;
                receiveVoucherDetail.Quantity = $scope.listSaleReturnDetail[i].Quantity;
                receiveVoucherDetail.UnitPrice = $scope.listSaleReturnDetail[i].UnitPrice;
                receiveVoucherDetail.VATRate = $scope.listSaleReturnDetail[i].VATRate;
                receiveVoucherDetail.DiscountAmount = $scope.listSaleReturnDetail[i].DiscountAmount;
                receiveVoucherDetail.DiscountRate = $scope.listSaleReturnDetail[i].DiscountRate;
                receiveVoucherDetail.Amount = $scope.listSaleReturnDetail[i].Amount;

                apiService.post('api/purchaseInvDetail/create', receiveVoucherDetail,
                    function (result) {
                        AddReceiveVoucherDetail(i + 1, item);
                        //$state.go('saleReturn_detail', { id: item.VoucherID });
                    }, function () {

                    }
                );
            }
        }

        function getItemOpt() {
            apiService.get('api/positem/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.listSaleReturnDetail.length; i++) {
                    for (var j = 0; j < $scope.listItemOpt.length; j++) {
                        if ($scope.listSaleReturnDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.listSaleReturnDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.listSaleReturnDetail[i].SKU = $scope.listItemOpt[j].SKU;
                        }
                    }
                }

            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getSaleReturnDetail() {
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.listSaleReturnDetail = result.data;

                $scope.saleReturn.TotalQuantity = 0;
                for (var i = 0; i < $scope.listSaleReturnDetail.length; i++) {
                    $scope.saleReturn.TotalQuantity = $scope.saleReturn.TotalQuantity + $scope.listSaleReturnDetail[i].Quantity;
                }
                $scope.getItemOpt();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getSaleReturnById() {
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleReturn = result.data;

                $scope.getCustomer();
                if ($scope.saleReturn.StatusID === 1 || $scope.saleReturn.StatusID === 4 || $scope.saleReturn.StatusID === 5) {
                    $scope.saleReturn.status = "Đã nhận";
                    $scope.saleReturn.cs = "available";
                    $scope.saleReturn.displayReceive = 'none';
                    $scope.saleReturn.displayReceiveVoucher = 'block';
                   
                }
                if ($scope.saleReturn.StatusID === 0 || $scope.saleReturn.StatusID === 2 || $scope.saleReturn.StatusID === 3) {
                    $scope.saleReturn.status = "Đang nhận";
                    $scope.saleReturn.cs = "not-available";
                    $scope.saleReturn.displayReceive = 'block';
                    $scope.saleReturn.displayReceiveVoucher = 'none';
                    
                }
                $scope.getSaleReturnDetail();
                $scope.getInwardStockBySaleReturn($scope.saleReturn.VoucherNo);
                $scope.GetCashPayment();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getCustomer() {
            apiService.get('api/Customer/getbyid/' + $scope.saleReturn.ObjectID, null, function (result) {

                $scope.customer = result.data;
                if ($scope.saleReturn.ObjectID === $scope.customer.ObjectID) {
                    $scope.saleReturn.CustomerName = $scope.customer.ObjectName;
                    $scope.saleReturn.CustomerAddress = $scope.customer.ObjectAddress;
                    $scope.saleReturn.CustomerEmail = $scope.customer.Email;
                    $scope.saleReturn.CustomerTel = $scope.customer.Tel;
                }
            }, function (error) {
                console.log(error.data);
            });
        }

        $scope.getSaleReturnById();

    }
})(angular.module('tiktak.saleReturn'));