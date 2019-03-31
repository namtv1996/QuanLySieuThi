(function (app) {
    app.controller('deliveryOrderDetailController', deliveryOrderDetailController);
    deliveryOrderDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$stateParams'];
    function deliveryOrderDetailController($scope, apiService, notificationService, $ngBootbox, $stateParams) {
        $scope.deliveryOrder = {};
        $scope.GetDeliveryOrder = GetDeliveryOrder;

        $scope.deliveryOrderDetail = [];
        $scope.listItemOpt = [];
        $scope.GetDeliveryOrderDetail = GetDeliveryOrderDetail;

        $scope.Delivered = Delivered;
        $scope.COD_Paymented = COD_Paymented;
        $scope.PaymentShippingAmount = PaymentShippingAmount;

        $scope.display_payment = 'none';
        $scope.display_btn_delivery = 'block';
        $scope.dis_btn_pay1 = 'none';
        $scope.dis_btn_pay2 = 'none';
        //$scope.displayReceipt = 'none';
        $scope.cls = '';
        $scope.thongbao = '';
        $scope.cls1 = '';
        $scope.thongbaos = '';

        $scope.account = {};

        $scope.GetReceipt = GetReceipt;
        $scope.listReceipt = [];
        $scope.GetCashPayment = GetCashPayment;
        $scope.listCashPayment = [];

        function GetCashPayment() {            
            var config = {
                params: {
                    vouchertype1: 40,
                    vouchertype2: 42,
                    id: $scope.deliveryOrder.VoucherID
                }
            }
            apiService.get('api/purchaseInvoice/getVoucherByInwardStockID', config,
                function (result) {
                    $scope.listCashPayment = result.data;
                    if ($scope.listCashPayment.length <= 0) {
                        $scope.displayReceipt2 = 'none';
                    } else {
                        if ($scope.displayReceipt2 === 'none') {
                            $scope.displayReceipt2 = 'block';
                        }                      
                    }
                }, function (error) {
                    console.log("(T.T)");
                }
            );
        }

        function GetReceipt() {
            apiService.get('api/saleOrder/getbyoriginalvoucherno?originalvoucherno=' + $scope.deliveryOrder.SaleOrderVoucherNo, null,
                function (result) {
                    for (var i in result.data) {
                        if (result.data[i].SortOrder === 10) {
                            $scope.listReceipt.push(result.data[i]);
                        }
                    }
                   
                    if ($scope.listReceipt.length <= 0) {
                        $scope.displayReceipt1 = 'none';
                    } else {
                        if ($scope.displayReceipt1 === 'none') {
                            $scope.displayReceipt1 = 'block';
                        }                     
                    }
                }, function (error) {
                    console.log("(T.T)");
                }
            );
        }

        function PaymentShippingAmount() {
            $scope.deliveryOrder.StatusID = 1;
            $scope.deliveryOrder.VoucherDate = new Date($scope.deliveryOrder.VoucherDate);
            apiService.put('api/saleOrder/update', $scope.deliveryOrder, function (result1) {
                var cashPayment = {};
                cashPayment.InwardStockID = $scope.deliveryOrder.VoucherID;
                cashPayment.ObjectID = $scope.deliveryOrder.TransporterID;
                cashPayment.BranchID = $scope.deliveryOrder.BranchID;
                cashPayment.OriginalVoucherNo = $scope.deliveryOrder.VoucherNo;
                cashPayment.VoucherType = 41;
                cashPayment.Status = 0;
                cashPayment.INVoucherDate = new Date();
                cashPayment.TotalAmount = $scope.deliveryOrder.ShippingAmount;
                cashPayment.TotalAmountOC = $scope.deliveryOrder.ShippingAmount;
                cashPayment.Description = 'Thanh toán phí ship cho ' + $scope.deliveryOrder.TransporterName;
                apiService.post('api/purchaseInvoice/createCashPayment', cashPayment,
                    function (result) {
                       
                        //công nợ đối tác vận chuyển
                        apiService.get('api/transporter/getbyid/' + $scope.deliveryOrder.TransporterID, null,
                            function (result) {
                                var tran = {};
                                tran = result.data;

                                tran.Debt = tran.Debt + Number($scope.deliveryOrder.ShippingAmount);
                                apiService.put('api/transporter/update', tran,
                                    function (result) {
                                        console.log('công nợ đối tác vận chuyển');
                                       
                                    },
                                    function (error) {
                                        console.log('update fail');
                                    }
                                );
                            },
                            function (error) {
                                console.log('Thêm mới chi tiết đóng gói không thành công');
                            }
                        );
                        $scope.GetCashPayment();
                        $scope.deliveryOrder.cs = 'available';
                        $scope.deliveryOrder.status = 'Hoàn thành';

                        $scope.display_payment = 'block';
                        $scope.display_btn_delivery = 'none';
                        $scope.dis_btn_pay1 = 'none';
                        $scope.dis_btn_pay2 = 'none';
                        //$scope.displayReceipt = 'block';
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã giao hàng';
                        $scope.cls1 = 'fa fa-check-square-o';
                        $scope.thongbaos = 'Đã nhận tiền thu hộ';
                        $scope.cls2 = 'fa fa-check-square-o';
                        $scope.thongbao2 = 'Đã thanh toán phí ship';
                        //$scope.GetDeliveryOrder();
                    }, function (error) {
                        console.log("éo tạo đk phiếu chi");
                    }
                );
               
            }, function () {
                console.log('load items failed');
            });
        }

        function COD_Paymented() {
            $scope.deliveryOrder.StatusID = 3;
            $scope.deliveryOrder.VoucherDate = new Date($scope.deliveryOrder.VoucherDate);
            apiService.put('api/saleOrder/update', $scope.deliveryOrder, function (result1) {
                var receipt = {};
                receipt.ObjectID = $scope.deliveryOrder.TransporterID;
                receipt.BranchID = $scope.deliveryOrder.BranchID;
                receipt.OriginalVoucherNo = $scope.deliveryOrder.SaleOrderVoucherNo;
                receipt.VoucherType = 21;
                receipt.SortOrder = 10;
                receipt.StatusID = 0;
                receipt.VoucherDate = new Date();
                receipt.TotalAmount = $scope.deliveryOrder.TotalAmount;
                receipt.TotalAmountOC = $scope.deliveryOrder.TotalAmount;
                receipt.Description = 'Nhận tiền thu hộ từ đối tác vận chuyển ' + $scope.deliveryOrder.TransporterName;
                apiService.post('api/saleOrder/create_receipt', receipt,
                    function (result) {
                        $scope.GetReceipt();
                        $scope.deliveryOrder.cs = 'available';
                        $scope.deliveryOrder.status = 'Đã giao hàng';

                        $scope.display_payment = 'block';
                        $scope.display_btn_delivery = 'none';
                        $scope.dis_btn_pay1 = 'none';
                        $scope.dis_btn_pay2 = 'block';
                        //$scope.displayReceipt = 'block';
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã giao hàng';
                        $scope.cls1 = 'fa fa-check-square-o';
                        $scope.thongbaos = 'Đã nhận tiền thu hộ';
                        //công nợ đối tác vận chuyển
                        apiService.get('api/transporter/getbyid/' + $scope.deliveryOrder.TransporterID, null,
                            function (result) {
                                var tran = {};
                                tran = result.data;

                                tran.Debt = tran.Debt - Number($scope.deliveryOrder.TotalAmount);
                                apiService.put('api/transporter/update', tran,
                                    function (result) {
                                        console.log('công nợ đối tác vận chuyển');
                                    },
                                    function (error) {
                                        console.log('update fail');
                                    }
                                );
                            },
                            function (error) {
                                console.log('Thêm mới chi tiết đóng gói không thành công');
                            }
                        );
                    }, function (error) {
                        console.log("éo tạo đk phiếu thu");
                    }
                );

                apiService.get('api/saleOrder/getbyid/' + $scope.deliveryOrder.SaleOrderID, null,
                    function (result) {
                        var saleOrder = {};
                        saleOrder = result.data;
                        saleOrder.SortOrder = 2;
                        if (saleOrder.StatusID === 45) { saleOrder.StatusID = 4; }
                        if (saleOrder.StatusID === 95) { saleOrder.StatusID = 9; }
                        if (saleOrder.StatusID === 15) { saleOrder.StatusID = 1; }
                        if (saleOrder.StatusID === 2) { saleOrder.StatusID = 4; }
                        if (saleOrder.StatusID === 3) { saleOrder.StatusID = 1; }
                        if (saleOrder.StatusID === 8) { saleOrder.StatusID = 9; }
                        saleOrder.VoucherDate = new Date(saleOrder.VoucherDate);
                        apiService.put('api/saleOrder/update', saleOrder,
                            function (result) {
                                //công nợ khách hàng
                                apiService.get('api/Customer/getbyid/' + $scope.deliveryOrder.ObjectID, null,
                                    function (result) {
                                        var customer = {};
                                        customer = result.data;

                                        customer.Debt = customer.Debt - Number($scope.deliveryOrder.TotalAmount);
                                        apiService.put('api/Customer/update', customer,
                                            function (result) {
                                                console.log('công nợ khách hàng');
                                            },
                                            function (error) {
                                                console.log('update fail');
                                            }
                                        );
                                    },
                                    function (error) {
                                        console.log('Thêm mới chi tiết đóng gói không thành công');
                                    }
                                );
                            }, function (error) {
                                console.log("update saleOrder fail");
                            }
                        );                       
                    }, function (error) {                       
                    }
                );
            }, function () {
                console.log('load items failed');
            });
        }

        function Delivered() {
            $scope.deliveryOrder.StatusID = 2;
            $scope.deliveryOrder.VoucherDate = new Date($scope.deliveryOrder.VoucherDate);
            apiService.put('api/saleOrder/update', $scope.deliveryOrder, function (result1) {
                var param = {
                    BranchID: $scope.account.BranchID,
                    voucherID: $scope.deliveryOrder.SaleOrderID
                };
               
                apiService.put('api/stock/updateClosingQuantityStockCombo', param, function () { },
                    function(){}
                );
                apiService.put('api/saleOrder/UpdateInventory', param, function (result) {
                }, function (error) {
                    console.log = 'không update đk số lượng ^^';
                });

                $scope.GetDeliveryOrder();
            }, function () {
                console.log('load items failed');
            });
        }

        function GetDeliveryOrder() {
            apiService.get('api/saleOrder/getDeliveryVoucherById/' + $stateParams.id, null, function (result) {
                $scope.deliveryOrder = result.data;
                apiService.get('api/account/users', null, function (result) {
                    $scope.account = result.data;
                }, function () {
                    console.log('load items failed');
                    });
              
                //đang giao hàng
                if ($scope.deliveryOrder.StatusID === 0) {
                    $scope.deliveryOrder.cs = 'blue';
                    $scope.deliveryOrder.status = 'Đang giao hàng';

                    $scope.display_payment = 'none';
                    $scope.display_btn_delivery = 'block';

                } else {
                    //hoàn thành
                    if ($scope.deliveryOrder.StatusID === 1) {
                        $scope.deliveryOrder.cs = 'available';
                        $scope.deliveryOrder.status = 'Hoàn thành';

                        $scope.display_payment = 'block';
                        $scope.display_btn_delivery = 'none';
                        $scope.dis_btn_pay1 = 'none';
                        $scope.dis_btn_pay2 = 'none';
                        //$scope.displayReceipt = 'block';
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã giao hàng';
                        $scope.cls1 = 'fa fa-check-square-o';
                        $scope.thongbaos = 'Đã nhận tiền thu hộ';
                        $scope.cls2 = 'fa fa-check-square-o';
                        $scope.thongbao2 = 'Đã thanh toán phí ship';
                    }
                    //giao hàng nhưng chưa thanh toán
                    if ($scope.deliveryOrder.StatusID === 2) {
                        $scope.deliveryOrder.cs = 'available';
                        $scope.deliveryOrder.status = 'Đã giao hàng';

                        $scope.display_payment = 'block';
                        $scope.display_btn_delivery = 'none';
                        $scope.dis_btn_pay1 = 'block';
                        $scope.dis_btn_pay2 = 'none';
                        //$scope.displayReceipt = 'none';
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã giao hàng';
                        $scope.cls1 = '';
                        $scope.thongbaos = '';
                    }
                    //nhận tiền thu hộ, chưa thanh toán ship
                    if ($scope.deliveryOrder.StatusID === 3) {
                        $scope.deliveryOrder.cs = 'available';
                        $scope.deliveryOrder.status = 'Đã giao hàng';

                        $scope.display_payment = 'block';
                        $scope.display_btn_delivery = 'none';
                        $scope.dis_btn_pay1 = 'none';
                        $scope.dis_btn_pay2 = 'block';
                        //$scope.displayReceipt = 'block';
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã giao hàng';
                        $scope.cls1 = 'fa fa-check-square-o';
                        $scope.thongbaos = 'Đã nhận tiền thu hộ';

                    }
                    if ($scope.deliveryOrder.StatusID === 4) {
                        $scope.deliveryOrder.cs = 'not-available';
                        $scope.deliveryOrder.status = 'Hủy giao hàng';

                        $scope.display_payment = 'none';
                       
                        $scope.cls = 'fa fa-check-square-o';
                        $scope.thongbao = 'Đã hủy giao hàng';
                      
                    }
                }
                $scope.GetReceipt();
                $scope.GetCashPayment();
            }, function () {
                console.log('load items failed');
            });


        }

        function GetDeliveryOrderDetail() {
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.deliveryOrderDetail = result.data;

                apiService.get('api/itemOption/getall', null, function (result) {
                    $scope.listItemOpt = result.data;

                    for (var i in $scope.deliveryOrderDetail) {
                        for (var j in $scope.listItemOpt) {
                            if ($scope.deliveryOrderDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                                $scope.deliveryOrderDetail[i].SKU = $scope.listItemOpt[j].SKU;
                                $scope.deliveryOrderDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            }
                        }
                    }

                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.GetDeliveryOrder();
        $scope.GetDeliveryOrderDetail();

    }
})(angular.module('tiktak.deliveryOrder'));