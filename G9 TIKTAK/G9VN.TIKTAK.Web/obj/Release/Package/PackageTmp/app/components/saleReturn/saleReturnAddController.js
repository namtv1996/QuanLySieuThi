//not code
(function (app) {
    app.controller('saleReturnAddController', saleReturnAddController);

    saleReturnAddController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$state'];
    function saleReturnAddController($scope, apiService, $stateParams, notificationService, $state) {
        $scope.getSaleOrderById = getSaleOrderById;
        $scope.saleOrder = {
            VoucherNo: null,
            VoucherID:null,
            PayingCustomerAmount: 0,           
            TienTraLai: 0,
            TotalAmount: null,
            TotalPaymented: null,
            TotalDiscountAmount: null,
            TotalVATAmount: null,
            DiscountAmount: null,
            TotalQuantitySR: 0,
            TotalAmountSR: null,
            TotalDiscountAmountSR: null,
            TotalVATAmountSR: null,
            DiscountAmountSR: null,
            TotalMaxQuantity: null
        };

        $scope.getCustomer = getCustomer;
       
        $scope.getReceipt = getReceipt;
        
        $scope.getSaleOrderDetail = getSaleOrderDetail;
        $scope.listSaleOrderDetail = [];
        $scope.getItem = getItem;
        $scope.listItemOpt = [];
        $scope.Update = Update;
        $scope.changeQuantity = changeQuantity;

        $scope.AddSaleReturn = AddSaleReturn;
        $scope.saleReturn = {
            VoucherDate: new Date()
        };
        $scope.AddSaleReturnDetail = AddSaleReturnDetail;
        $scope.saleReturnDetail = {};

        $scope.getSaleReturnBySaleOrder = getSaleReturnBySaleOrder;
        $scope.listSaleReturnBySaleOrder = [];

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'SR',
                    vouchertype1: 7,
                    vouchertype2: 7
                }
            }
            apiService.get('api/saleOrder/getCode', config, function (result) {
                $scope.saleReturn.VoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }

        function getSaleReturnBySaleOrder() {
            var config = {
                params: {
                    saleOrderVoucherNo: $scope.saleOrder.VoucherNo
                }
            }
            apiService.get('api/saleOrder/getSaleReturnBySaleOrderVoucherNo', config, function (result) {
                $scope.listSaleReturnBySaleOrder = result.data;
                $scope.saleOrder.TotalPaymented = 0;
                $scope.saleOrder.DiscountAmountSR = $scope.saleOrder.DiscountAmount;
                $scope.saleOrder.TienTraLai = $scope.saleOrder.PayingCustomerAmount;
                if ($scope.listSaleReturnBySaleOrder.length > 0) {
                    for (var i = 0; i < $scope.listSaleReturnBySaleOrder.length; i++) {
                        $scope.listSaleReturnBySaleOrder[i].stt = i + 1;
                        $scope.saleOrder.DiscountAmountSR = $scope.saleOrder.DiscountAmountSR - $scope.listSaleReturnBySaleOrder[i].DiscountAmount;
                        $scope.saleOrder.TotalPaymented = $scope.saleOrder.TotalPaymented + $scope.listSaleReturnBySaleOrder[i].TotalAmount;
                        $scope.saleOrder.TienTraLai = $scope.saleOrder.TienTraLai - $scope.saleOrder.TotalPaymented;
                    }
                } else {
                    $scope.saleOrder.TienTraLai = $scope.saleOrder.TienTraLai - $scope.saleOrder.TotalPaymented;
                }

            }, function (error) {
                console.log(error.data);
            });
        }

        function AddSaleReturn() {
            if ($scope.listSaleOrderDetail != []) {
                $scope.saleReturn.OriginalVoucherNo = $scope.saleOrder.VoucherNo;
                $scope.saleReturn.BranchID = $scope.saleOrder.BranchID;
                $scope.saleReturn.ObjectID = $scope.saleOrder.ObjectID;
                $scope.saleReturn.StatusID = 0;
                $scope.saleReturn.VoucherType = 7;
                $scope.saleReturn.TotalAmount = $scope.saleOrder.TienTraLai;
                $scope.saleReturn.TotalVATAmount = $scope.saleOrder.TotalVATAmountSR;
                $scope.saleReturn.TotalDiscountAmount = $scope.saleOrder.TotalDiscountAmountSR;
                $scope.saleReturn.DiscountForInvoice = $scope.saleOrder.DiscountAmountSR;
                $scope.saleReturn.VoucherDate = new Date($scope.saleReturn.VoucherDate);
                apiService.post('api/saleOrder/createSaleReturn', $scope.saleReturn,
                    function (result) {
                        AddSaleReturnDetail(0, result.data);

                        //cập nhật trạng thái đơn hàng
                        if ($scope.saleOrder.TotalQuantitySR >= $scope.saleOrder.TotalMaxQuantity) {
                            if ($scope.saleOrder.StatusID === 1 || $scope.saleOrder.StatusID === 12) {
                                $scope.saleOrder.StatusID = 11;
                            }
                            if ($scope.saleOrder.StatusID === 15 || $scope.saleOrder.StatusID === 13) {
                                $scope.saleOrder.StatusID = 14;
                            }
                            if ($scope.saleOrder.StatusID === 3 || $scope.saleOrder.StatusID === 16) {
                                $scope.saleOrder.StatusID = 17;
                            }
                           
                        } else {
                            if ($scope.saleOrder.StatusID === 1) {
                                $scope.saleOrder.StatusID = 12;
                            }
                            if ($scope.saleOrder.StatusID === 15) {
                                $scope.saleOrder.StatusID = 13;
                            }
                            if ($scope.saleOrder.StatusID === 3) {
                                $scope.saleOrder.StatusID = 16;
                            }
                        }
                        $scope.saleOrder.VoucherDate = new Date($scope.saleOrder.VoucherDate);
                        apiService.put('api/saleOrder/update', $scope.saleOrder, function (result) {
                            console.log('đã cập nhật trạng thái đơn hàng');
                        }, function () {
                            console.log('lỗi cập nhật trạng thái đơn hàng');
                        });

                        $state.go('saleReturn_detail', { id: result.data.VoucherID });
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
        }

        function AddSaleReturnDetail(i, item) {
            if (i < $scope.listSaleOrderDetail.length) {
                if ($scope.listSaleOrderDetail[i].select == true) {
                    $scope.saleReturnDetail.VoucherID = item.VoucherID;
                    $scope.saleReturnDetail.ItemID = $scope.listSaleOrderDetail[i].ItemID;
                    $scope.saleReturnDetail.Quantity = $scope.listSaleOrderDetail[i].quan;
                    $scope.saleReturnDetail.UnitPrice = $scope.listSaleOrderDetail[i].UnitPrice;
                    $scope.saleReturnDetail.VATRate = $scope.listSaleOrderDetail[i].VATRate;
                    $scope.saleReturnDetail.DiscountAmount = $scope.listSaleOrderDetail[i].chietkhau;
                    $scope.saleReturnDetail.DiscountRate = $scope.listSaleOrderDetail[i].DiscountRate;
                    $scope.saleReturnDetail.Amount = $scope.listSaleOrderDetail[i].Amount;

                    apiService.post('api/saleOrderDetail/createSaleReturnDetail', $scope.saleReturnDetail,
                        function (result) {
                            AddSaleReturnDetail(i + 1, item);
                           
                        }, function () {

                        });

                } else {
                    AddSaleReturnDetail(i + 1, item);
                }

            }
        }

        function changeQuantity(stt) {
            $scope.listSaleOrderDetail[stt - 1].chietkhau = ($scope.listSaleOrderDetail[stt - 1].DiscountRate * ($scope.listSaleOrderDetail[stt - 1].quan * $scope.listSaleOrderDetail[stt - 1].UnitPrice)) / 100;

            $scope.listSaleOrderDetail[stt - 1].Amount = $scope.listSaleOrderDetail[stt - 1].UnitPrice * $scope.listSaleOrderDetail[stt - 1].quan
                - $scope.listSaleOrderDetail[stt - 1].chietkhau;

            //$scope.voucherDetail[stt - 1].conlai = $scope.voucherDetail[stt - 1].maxquantity - $scope.voucherDetail[stt - 1].quan

            $scope.Update();
        }

        function Update() {
            $scope.saleOrder.TotalQuantitySR = 0;
            $scope.saleOrder.TotalAmountSR = 0;
            $scope.saleOrder.TotalDiscountAmountSR = 0;
            $scope.saleOrder.DiscountAmountSR = 0;
            $scope.saleOrder.TotalVATAmountSR = 0;
            $scope.saleOrder.TienTraLai = 0;

            for (var i = 0; i < $scope.listSaleOrderDetail.length; i++) {

                if ($scope.listSaleOrderDetail[i].select === true) {
                    //$scope.listSaleOrderDetail[i].Amount = $scope.listSaleOrderDetail[i].UnitPrice * $scope.listSaleOrderDetail[i].Quantity - $scope.listSaleOrderDetail[i].DiscountAmount;
                    $scope.saleOrder.TotalQuantitySR = $scope.saleOrder.TotalQuantitySR + $scope.listSaleOrderDetail[i].quan;

                    $scope.saleOrder.TotalAmountSR = $scope.saleOrder.TotalAmountSR + $scope.listSaleOrderDetail[i].Amount;

                    $scope.listSaleOrderDetail[i].discount2 = ($scope.listSaleOrderDetail[i].Amount / $scope.saleOrder.TotalAmount) * Number($scope.saleOrder.DiscountAmount);
                    $scope.saleOrder.TotalVATAmountSR += ($scope.listSaleOrderDetail[i].VATRate / 100) * ($scope.listSaleOrderDetail[i].Amount - $scope.listSaleOrderDetail[i].discount2);
                    $scope.saleOrder.DiscountAmountSR = $scope.saleOrder.DiscountAmountSR + $scope.listSaleOrderDetail[i].discount2;

                    $scope.saleOrder.TotalDiscountAmountSR = $scope.saleOrder.TotalDiscountAmountSR + $scope.listSaleOrderDetail[i].chietkhau;

                }
            }

            if ($scope.saleOrder.TotalAmountSR === 0) {
                $scope.saleOrder.TienTraLai = 0;
            } else {
                $scope.saleOrder.TienTraLai = $scope.saleOrder.TotalAmountSR + $scope.saleOrder.TotalVATAmountSR - $scope.saleOrder.DiscountAmountSR;
            }           
            if ($scope.saleOrder.TienTraLai > $scope.saleOrder.PayingCustomerAmount) {
                $scope.saleOrder.TienTraLai = $scope.saleOrder.PayingCustomerAmount;
            }

            $scope.saleOrder.TotalDiscountAmountSR = $scope.saleOrder.TotalDiscountAmountSR + $scope.saleOrder.DiscountAmountSR;
        }

        function getItem() {
            apiService.get('api/positem/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.listSaleOrderDetail.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listSaleOrderDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.listSaleOrderDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.listSaleOrderDetail[i].SKU_Code = $scope.listItemOpt[j].SKU;

                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getSaleOrderDetail() {
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.listSaleOrderDetail = result.data;
               
                var config = {
                    params: {
                        originalVoucherNo: $scope.saleOrder.VoucherNo
                    }
                }
                apiService.get('api/saleOrderDetail/getSaleReturnDetailByOVN', config,
                    function (result) {
                        var invoice_detail = [];
                        invoice_detail = result.data;
                        $scope.saleOrder.TotalQuantitySR = 0;
                        $scope.saleOrder.TotalMaxQuantity = 0;
                        for (var i = 0; i < $scope.listSaleOrderDetail.length; i++) {
                            $scope.listSaleOrderDetail[i].maxquantity = $scope.listSaleOrderDetail[i].Quantity;
                           
                            for (var j = 0; j < invoice_detail.length; j++) {
                                if ($scope.listSaleOrderDetail[i].ItemID === invoice_detail[j].ItemID) {
                                    $scope.listSaleOrderDetail[i].maxquantity = $scope.listSaleOrderDetail[i].maxquantity - invoice_detail[j].Quantity;
                                }
                            }
                            $scope.listSaleOrderDetail[i].select = true;
                            $scope.listSaleOrderDetail[i].stt = i + 1;
                            $scope.listSaleOrderDetail[i].quan = $scope.listSaleOrderDetail[i].maxquantity;
                            $scope.listSaleOrderDetail[i].chietkhau = ($scope.listSaleOrderDetail[i].DiscountRate * ($scope.listSaleOrderDetail[i].quan * $scope.listSaleOrderDetail[i].UnitPrice)) / 100;
                            $scope.listSaleOrderDetail[i].Amount = $scope.listSaleOrderDetail[i].quan * $scope.listSaleOrderDetail[i].UnitPrice - $scope.listSaleOrderDetail[i].chietkhau;

                            $scope.saleOrder.TotalQuantitySR = $scope.saleOrder.TotalQuantitySR + $scope.listSaleOrderDetail[i].maxquantity;
                            $scope.saleOrder.TotalMaxQuantity = $scope.saleOrder.TotalMaxQuantity + $scope.listSaleOrderDetail[i].maxquantity;

                        }

                        $scope.getItem();
                        $scope.getSaleReturnBySaleOrder();
                    }, function (error) {
                        console.log('Failed !!');
                    }
                );
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getSaleOrderById() {
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrder = result.data;
                
                $scope.getSaleOrderDetail();
               
                $scope.getCustomer($scope.saleOrder.ObjectID);
                $scope.getCode();
               
                $scope.getReceipt($scope.saleOrder.VoucherNo);
               
                //$scope.Update();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getCustomer(id) {
            apiService.get('api/Customer/getbyid/' + id, null, function (result) {
                var customer = {};
                customer = result.data;

                if ($scope.saleOrder.ObjectID === customer.ObjectID) {
                    $scope.saleOrder.ObjectName = customer.ObjectName;
                    $scope.saleOrder.ObjectAddress = customer.ObjectAddress;
                    $scope.saleOrder.Tel = customer.Tel;
                    $scope.saleOrder.Email = customer.Email;
                    $scope.saleOrder.ObjectCode = customer.ObjectCode;
                }

            }, function (error) {
                console.log("Không gọi được dữ liệu khách hàng");
            });
        }

        function getReceipt(id) {
            var config = {
                params: {
                    originalvoucherno: id
                }
            }
            apiService.get('api/saleOrder/getbyoriginalvoucherno', config, function (result) {
                var listReceipt = [];
                listReceipt = result.data;
                $scope.saleOrder.PayingCustomerAmount = 0;
                for (var i = 0; i < listReceipt.length; i++) {
                    if ($scope.saleOrder.VoucherNo === listReceipt[i].OriginalVoucherNo) {
                        $scope.saleOrder.PayingCustomerAmount = $scope.saleOrder.PayingCustomerAmount + listReceipt[i].TotalAmount;
                       // $scope.saleOrder.TienTraLai = $scope.saleOrder.PayingCustomerAmount;
                    }
                }
            }, function (error) {
                console.log(error.data);
            });
        }
        
        $scope.getSaleOrderById();
       
    }
})(angular.module('tiktak.saleReturn'));