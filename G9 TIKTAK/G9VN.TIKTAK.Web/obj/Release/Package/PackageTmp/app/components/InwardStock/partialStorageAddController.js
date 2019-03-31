(function (app) {
    app.controller('partialStorageAddController', partialStorageAddController);

    partialStorageAddController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$ngBootbox', '$state'];
    function partialStorageAddController($scope, apiService, $stateParams, notificationService, $ngBootbox, $state) {
        $scope.inwardStock = {
            TotalImportingQuantity: 0,
            TongConLai: 0,
            TotalVoucherValue: 0,
            TotalPaymented: 0,
            TotalAmountPS: 0,
            TotalVATAmountPS: 0,
            TotalDiscountAmountPS: 0,
            DiscountForInvoicePS: 0,
            TotalMaxQuantity: 0
        };
        $scope.GetVoucherById = GetVoucherById;
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.voucherDetail = [];
        $scope.getItem = getItem;
      
        $scope.GetVendor = GetVendor;

        $scope.Update = Update;
        $scope.changeQuantity = changeQuantity;

        $scope.getPartialStorageByInwardStock = getPartialStorageByInwardStock;
        $scope.listPartialStorageByInwardStock = [];

        $scope.AddPartialStorage = AddPartialStorage;
        $scope.PartialStorage = {
            INVoucherNo: null
        };
        $scope.AddPartialStorageDetail = AddPartialStorageDetail;

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'PS',
                    vouchertype1: 8,
                    vouchertype2: 8
                }
            }
            apiService.get('api/purchaseInvoice/getCode', config, function (result) {
                $scope.PartialStorage.INVoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }

        function AddPartialStorage() {
            if ($scope.listInwardStockDetail !== []) {
                $scope.PartialStorage.INVoucherNo = $scope.PartialStorage.INVoucherNo;
                $scope.PartialStorage.OriginalVoucherNo = $scope.inwardStock.INVoucherNo;
                $scope.PartialStorage.INVoucherDate = new Date();
                $scope.PartialStorage.BranchID = $scope.inwardStock.BranchID;
                $scope.PartialStorage.InwardStockID = $scope.inwardStock.VoucherID;
                $scope.PartialStorage.ObjectID = $scope.inwardStock.ObjectID;
                $scope.PartialStorage.StockImportStatus = 1;
                $scope.PartialStorage.Status = 1;
                $scope.PartialStorage.TotalPurchaseQuantity = $scope.inwardStock.TotalImportingQuantity;
                $scope.PartialStorage.TotalAmount = $scope.inwardStock.TotalAmountPS;
                $scope.PartialStorage.TotalVATAmount = $scope.inwardStock.TotalVATAmountPS;
                $scope.PartialStorage.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmountPS;
                $scope.PartialStorage.DiscountForInvoice = $scope.inwardStock.DiscountForInvoicePS;
                $scope.PartialStorage.TotalPaymentAmount = $scope.inwardStock.TotalVoucherValue;
                apiService.post('api/purchaseInvoice/createPartialStorage', $scope.PartialStorage,
                    function (result) {
                        var aps = {};
                        aps = result.data;

                        AddPartialStorageDetail(0, result.data);
                       
                        $scope.inwardStock.StockImportStatus = 1;
                        if ($scope.inwardStock.TotalImportingQuantity < $scope.inwardStock.TotalMaxQuantity) {
                            $scope.inwardStock.Status = 2;
                        } else {
                            $scope.inwardStock.Status = 1;
                            $scope.inwardStock.INVoucherDate = new Date();
                        }
                        
                        apiService.put('api/purchaseInvoice/update', $scope.inwardStock,
                            function (result) {
                                var param = {
                                    BranchID: aps.BranchID,
                                    voucherID: aps.VoucherID
                                }
                                apiService.put('api/stock/updateClosingQuantity', param,
                                    function (result) {
                                        console.log('cập nhật tồn kho thành công !!');
                                    }, function (error) {
                                        console.log('cập nhật hàng hóa thất bại !!');
                                    }
                                );
                            }, function (error) {
                                console.log('Cập nhật phiếu thất bại !!');
                            }
                        );                      
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
           
        }

        function AddPartialStorageDetail(i, item) {
            var partialStorageDetail = {};
            if (i < $scope.voucherDetail.length) {
                if ($scope.voucherDetail[i].select === true) {
                    partialStorageDetail.VoucherID = item.VoucherID;
                    partialStorageDetail.ItemID = $scope.voucherDetail[i].ItemID;
                    partialStorageDetail.Quantity = $scope.voucherDetail[i].quan;
                    partialStorageDetail.UnitPrice = $scope.voucherDetail[i].UnitPrice;
                    partialStorageDetail.VATRate = $scope.voucherDetail[i].VATRate;
                    partialStorageDetail.DiscountAmount = $scope.voucherDetail[i].chietkhau;
                    partialStorageDetail.DiscountRate = $scope.voucherDetail[i].DiscountRate;
                    partialStorageDetail.Amount = $scope.voucherDetail[i].Amount;
                    apiService.post('api/purchaseInvDetail/create', partialStorageDetail,
                        function (result) {
                           
                            AddPartialStorageDetail(i + 1, item);
                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        }
                    );
                }
                else {
                    AddPartialStorageDetail(i + 1, item);
                }
            }
            else {
                notificationService.displaySuccess('Đã nhập kho một phần !!');
               
                $state.go('inwardStockDetails', { id: $stateParams.id });
            }
        }

        function getPartialStorageByInwardStock() {
            apiService.get('api/purchaseInvoice/getPartialStorageByInwardStock/' + $stateParams.id, null,
                function (result) {

                    $scope.listPartialStorageByInwardStock = result.data;
                    $scope.inwardStock.TotalPaymented = 0;
                    $scope.inwardStock.TotalImportingQuantity = $scope.inwardStock.TotalPurchaseQuantity;
                    $scope.inwardStock.TongConLai = 0;
                    $scope.inwardStock.DiscountForInvoicePS = $scope.inwardStock.DiscountForInvoice;
                    if ($scope.listPartialStorageByInwardStock.length > 0) {
                        for (var i = 0; i < $scope.listPartialStorageByInwardStock.length; i++) {
                            $scope.listPartialStorageByInwardStock[i].stt = i + 1;
                            $scope.inwardStock.TotalImportingQuantity = $scope.inwardStock.TotalImportingQuantity - $scope.listPartialStorageByInwardStock[i].TotalPurchaseQuantity;
                            $scope.inwardStock.DiscountForInvoicePS = $scope.inwardStock.DiscountForInvoicePS - $scope.listPartialStorageByInwardStock[i].DiscountForInvoice;

                            $scope.inwardStock.TotalPaymented = $scope.inwardStock.TotalPaymented + $scope.listPartialStorageByInwardStock[i].TotalPaymentAmount;
                            $scope.inwardStock.TotalVoucherValue = $scope.inwardStock.TotalPaymentAmount - $scope.inwardStock.TotalPaymented;
                        }
                    } else {
                        $scope.inwardStock.TotalVoucherValue = $scope.inwardStock.TotalPaymentAmount - $scope.inwardStock.TotalPaymented;
                    }
                    

                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function changeQuantity(stt) {
            $scope.voucherDetail[stt - 1].chietkhau = ($scope.voucherDetail[stt - 1].DiscountRate * ($scope.voucherDetail[stt - 1].quan * $scope.voucherDetail[stt - 1].UnitPrice)) / 100;

            $scope.voucherDetail[stt - 1].Amount = $scope.voucherDetail[stt - 1].UnitPrice * $scope.voucherDetail[stt - 1].quan
                - $scope.voucherDetail[stt - 1].chietkhau;

            $scope.voucherDetail[stt - 1].conlai = $scope.voucherDetail[stt - 1].maxquantity - $scope.voucherDetail[stt - 1].quan

            $scope.Update();
        }

        function Update() {
            $scope.inwardStock.DiscountForInvoicePS = 0;
            $scope.inwardStock.TotalImportingQuantity = 0;
            $scope.inwardStock.TotalAmountPS = 0;
            $scope.inwardStock.TongConLai = 0;
            $scope.inwardStock.TotalDiscountAmountPS = 0;
            $scope.inwardStock.TotalVATAmountPS = 0;
            $scope.inwardStock.TotalVoucherValue = 0;
            for (var i in $scope.voucherDetail) {
                if ($scope.voucherDetail[i].select === true) {
                    $scope.inwardStock.TotalAmountPS = $scope.inwardStock.TotalAmountPS + $scope.voucherDetail[i].Amount;
                    $scope.voucherDetail[i].discount2 = ($scope.voucherDetail[i].Amount / $scope.inwardStock.TotalAmount) * Number($scope.inwardStock.DiscountForInvoice);
                    $scope.inwardStock.TotalVATAmountPS += ($scope.voucherDetail[i].VATRate / 100) * ($scope.voucherDetail[i].Amount - $scope.voucherDetail[i].discount2);
                    $scope.inwardStock.TotalDiscountAmountPS = $scope.inwardStock.TotalDiscountAmountPS + $scope.voucherDetail[i].chietkhau;
                    $scope.inwardStock.TotalImportingQuantity = $scope.inwardStock.TotalImportingQuantity + $scope.voucherDetail[i].quan;
                    $scope.inwardStock.DiscountForInvoicePS = $scope.inwardStock.DiscountForInvoicePS + $scope.voucherDetail[i].discount2;
                   
                } 
                $scope.inwardStock.TongConLai = $scope.inwardStock.TongConLai + $scope.voucherDetail[i].maxquantity;
            }
            if ($scope.inwardStock.TotalAmountPS === 0) {
                $scope.inwardStock.TotalVoucherValue = 0;
            } else {
                $scope.inwardStock.TotalVoucherValue = $scope.inwardStock.TotalAmountPS + $scope.inwardStock.TotalVATAmountPS - $scope.inwardStock.DiscountForInvoicePS;
            }
            $scope.inwardStock.TotalDiscountAmountPS = $scope.inwardStock.TotalDiscountAmountPS + $scope.inwardStock.DiscountForInvoicePS;
            $scope.inwardStock.TongConLai = $scope.inwardStock.TongConLai - $scope.inwardStock.TotalImportingQuantity;
        }

        function GetVendor(id) {
            apiService.get('api/vendor/getbyid/' + id, null, function (result) {
                var vendor = {};
                vendor = result.data;

                if ($scope.inwardStock.ObjectID === vendor.ObjectID) {
                    $scope.inwardStock.ObjectName = vendor.ObjectName;
                    $scope.inwardStock.ObjectAddress = vendor.ObjectAddress;
                    $scope.inwardStock.Tel = vendor.Tel;
                    $scope.inwardStock.Email = vendor.Email;
                    $scope.inwardStock.ObjectAddress = vendor.ObjectAddress;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function GetVoucherDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherDetail = result.data;
                apiService.get('api/purchaseInvDetail/getPartialStorageDetail/' + $stateParams.id, null,
                    function (result) {
                        var invoice_detail = [];
                        invoice_detail = result.data;
                        $scope.inwardStock.TotalMaxQuantity = 0;
                        for (var i = 0; i < $scope.voucherDetail.length; i++) {
                            $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].Quantity;
                            for (var j = 0; j < invoice_detail.length; j++) {
                                if ($scope.voucherDetail[i].ItemID === invoice_detail[j].ItemID) {
                                    $scope.voucherDetail[i].maxquantity = $scope.voucherDetail[i].maxquantity - invoice_detail[j].Quantity;
                                }
                            }

                            $scope.voucherDetail[i].select = true;
                            $scope.voucherDetail[i].stt = i + 1;
                            $scope.voucherDetail[i].quan = $scope.voucherDetail[i].maxquantity;
                            $scope.voucherDetail[i].chietkhau = ($scope.voucherDetail[i].DiscountRate * ($scope.voucherDetail[i].quan * $scope.voucherDetail[i].UnitPrice)) / 100;
                            $scope.voucherDetail[i].Amount = $scope.voucherDetail[i].quan * $scope.voucherDetail[i].UnitPrice - $scope.voucherDetail[i].chietkhau;
                            $scope.voucherDetail[i].conlai = $scope.voucherDetail[i].maxquantity - $scope.voucherDetail[i].quan;

                            $scope.inwardStock.TotalMaxQuantity = $scope.inwardStock.TotalMaxQuantity + $scope.voucherDetail[i].maxquantity;
                        }

                    }, function (error) {
                        console.log('Failed !!');
                    }
                );
                $scope.getItem();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getItem() {
            apiService.get('api/itemOption/getall', null, function (result) {
                var listItemOpt = [];
                listItemOpt = result.data;
                for (var i = 0; i < $scope.voucherDetail.length; i++) {
                    for (var j = 0; j < listItemOpt.length; j++) {
                        if ($scope.voucherDetail[i].ItemID === listItemOpt[j].ID) {
                            $scope.voucherDetail[i].ItemName = listItemOpt[j].Name;
                            $scope.voucherDetail[i].SKU_Code = listItemOpt[j].SKU;
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
                $scope.getCode();
                $scope.getPartialStorageByInwardStock();
                $scope.GetVendor($scope.inwardStock.ObjectID);

            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.GetVoucherById();
        $scope.GetVoucherDetail();

    }
})(angular.module('tiktak.inwardStock'));