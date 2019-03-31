(function (app) {
    app.controller('purchaseReturnAddPlusController', purchaseReturnAddPlusController);

    purchaseReturnAddPlusController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$state'];
    function purchaseReturnAddPlusController($scope, apiService, $stateParams, notificationService, $state) {
        $scope.inwardStock = {
            VoucherID: null,
            INVoucherNo: null,
            Status: null,
            TotalReturnQuantity: 0,
            TotalAmountPR: 0,
            TotalVATAmountPR: 0,
            TotalDiscountAmountPR: 0,
            TotalPaymentAmountPR: 0,
            DiscountForInvoicePR: 0,
            TotalPaymented: 0,
            TotalMaxQuantity: 0
        };
        $scope.purchaseReturn = {
            // VoucherID: null,
            INVoucherNo: null

        };
        $scope.purchaseReturnDetail = {};
        $scope.GetVoucherById = GetVoucherById;
        $scope.GetVendor = GetVendor;
        $scope.vendor = {};
        $scope.getPurchaseReturnByPartialStorage = getPurchaseReturnByPartialStorage;
        $scope.listPurchaseReturnByPartialStorage = [];
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.voucherDetail = [];
        $scope.getItem = getItem;
        $scope.listItemOpt = [];
        $scope.AddPurchaseReturn = AddPurchaseReturn;
        $scope.AddPurchaseReturnDetail = AddPurchaseReturnDetail;
        $scope.Update = Update;
        $scope.changeQuantity = changeQuantity;

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'PR',
                    vouchertype1: 6,
                    vouchertype2: 6
                }
            }
            apiService.get('api/purchaseInvoice/getCode', config, function (result) {
                $scope.purchaseReturn.INVoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }

        function getPurchaseReturnByPartialStorage() {

            apiService.get('api/purchaseInvoice/getPurchaseReturnByISID/' + $stateParams.id, null,
                function (result) {
                    $scope.listPurchaseReturnByPartialStorage = result.data;
                    $scope.inwardStock.TotalPaymented = 0;
                    $scope.inwardStock.TotalReturnQuantity = $scope.inwardStock.TotalPurchaseQuantity;
                    $scope.inwardStock.TotalAmountPR = $scope.inwardStock.TotalAmount;
                    $scope.inwardStock.TotalVATAmountPR = $scope.inwardStock.TotalVATAmount;
                    $scope.inwardStock.DiscountForInvoicePR = $scope.inwardStock.DiscountForInvoice;
                    if ($scope.listPurchaseReturnByPartialStorage.length > 0) {
                        for (var i = 0; i < $scope.listPurchaseReturnByPartialStorage.length; i++) {
                            $scope.listPurchaseReturnByPartialStorage[i].stt = i + 1;
                            $scope.inwardStock.TotalReturnQuantity = $scope.inwardStock.TotalReturnQuantity - $scope.listPurchaseReturnByPartialStorage[i].TotalPurchaseQuantity;
                            $scope.inwardStock.DiscountForInvoicePR = $scope.inwardStock.DiscountForInvoicePR - $scope.listPurchaseReturnByPartialStorage[i].DiscountForInvoice;
                            $scope.inwardStock.TotalAmountPR = $scope.inwardStock.TotalAmountPR - $scope.listPurchaseReturnByPartialStorage[i].TotalAmount;
                            $scope.inwardStock.TotalVATAmountPR = $scope.inwardStock.TotalVATAmountPR - $scope.listPurchaseReturnByPartialStorage[i].TotalVATAmount;
                            $scope.inwardStock.TotalPaymented = $scope.inwardStock.TotalPaymented + $scope.listPurchaseReturnByPartialStorage[i].TotalPaymentAmount;
                            $scope.inwardStock.TotalPaymentAmountPR = $scope.inwardStock.TotalPaymentAmount - $scope.inwardStock.TotalPaymented;
                        }
                    } else {
                        $scope.inwardStock.TotalPaymentAmountPR = $scope.inwardStock.TotalPaymentAmount - $scope.inwardStock.TotalPaymented;
                    }
                }, function (error) {
                    console.log('Thất bại !!');
                }
            );
        }

        function AddPurchaseReturn() {
            if ($scope.voucherDetail != []) {
                $scope.purchaseReturn.InwardStockID = $scope.inwardStock.VoucherID;
                $scope.purchaseReturn.OriginalVoucherNo = $scope.inwardStock.INVoucherNo;
                $scope.purchaseReturn.BranchID = $scope.inwardStock.BranchID;
                $scope.purchaseReturn.ObjectID = $scope.inwardStock.ObjectID;
                $scope.purchaseReturn.Status = 0;
                $scope.purchaseReturn.TotalPurchaseQuantity = $scope.inwardStock.TotalReturnQuantity;
                $scope.purchaseReturn.TotalAmount = $scope.inwardStock.TotalAmountPR;
                $scope.purchaseReturn.DiscountForInvoice = $scope.inwardStock.DiscountForInvoicePR;
                $scope.purchaseReturn.TotalPaymentAmount = $scope.inwardStock.TotalPaymentAmountPR;
                $scope.purchaseReturn.TotalVATAmount = $scope.inwardStock.TotalVATAmountPR;
                $scope.purchaseReturn.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmountPR;

                apiService.post('api/purchaseInvoice/createPurchaseReturn', $scope.purchaseReturn,
                    function (result) {
                        AddPurchaseReturnDetail(0, result.data);

                        //apiService.get('api/purchaseInvoice/getbyid/' + $scope.inwardStock.VoucherID, null,
                        //    function (result) {
                        //        var inward = {};
                        //        inward = result.data;
                        //        if ($scope.inwardStock.TotalReturnQuantity < $scope.inwardStock.TotalMaxQuantity) {
                        //            inward.Status = 1;
                        //        } else {
                        //            if ($scope.inwardStock.TotalReturnQuantity >= $scope.inwardStock.TotalMaxQuantity) {
                        //                inward.Status = 2;
                        //            }
                        //        }
                        //        apiService.put('api/purchaseInvoice/update', inward,
                        //            function (result) { },
                        //            function (error) { }
                        //        );
                        //    }, function (error) {
                        //    }
                        //);
                        $scope.vendor.Debt = $scope.vendor.Debt - $scope.purchaseReturn.TotalPaymentAmount;
                        apiService.put('api/vendor/update', $scope.vendor,
                            function (result) {
                                console.log("Công nợ phải trả đã trừ đi");
                            }, function (error) {
                                console.log("Đéo cập nhật đk công nợ");
                            }
                        );
                        notificationService.displaySuccess('Successfully !!');
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    }
                );
            }
        }

        function AddPurchaseReturnDetail(i, item) {
            if (i < $scope.voucherDetail.length) {
                if ($scope.voucherDetail[i].select == true) {
                    $scope.purchaseReturnDetail.VoucherID = item.VoucherID;
                    $scope.purchaseReturnDetail.ItemID = $scope.voucherDetail[i].ItemID;
                    $scope.purchaseReturnDetail.Quantity = $scope.voucherDetail[i].quan;
                    $scope.purchaseReturnDetail.UnitPrice = $scope.voucherDetail[i].UnitPrice;
                    $scope.purchaseReturnDetail.VATRate = $scope.voucherDetail[i].VATRate;
                    $scope.purchaseReturnDetail.DiscountAmount = $scope.voucherDetail[i].chietkhau;
                    $scope.purchaseReturnDetail.DiscountRate = $scope.voucherDetail[i].DiscountRate;
                    $scope.purchaseReturnDetail.Amount = $scope.voucherDetail[i].Amount;

                    apiService.post('api/purchaseInvDetail/create', $scope.purchaseReturnDetail,
                        function (result) {
                            AddPurchaseReturnDetail(i + 1, item);
                            $state.go('purchaseReturnDetail', { id: item.VoucherID });
                        }, function () {

                        });

                } else {
                    AddPurchaseReturnDetail(i + 1, item);
                }

            }
        }

        function changeQuantity(stt) {
            $scope.voucherDetail[stt - 1].chietkhau = ($scope.voucherDetail[stt - 1].DiscountRate * ($scope.voucherDetail[stt - 1].quan * $scope.voucherDetail[stt - 1].UnitPrice)) / 100;

            $scope.voucherDetail[stt - 1].Amount = $scope.voucherDetail[stt - 1].UnitPrice * $scope.voucherDetail[stt - 1].quan
                - $scope.voucherDetail[stt - 1].chietkhau;

            //$scope.voucherDetail[stt - 1].conlai = $scope.voucherDetail[stt - 1].maxquantity - $scope.voucherDetail[stt - 1].quan

            $scope.Update();
        }

        function Update() {
            $scope.inwardStock.TotalReturnQuantity = 0;
            $scope.inwardStock.TotalAmountPR = 0;
            $scope.inwardStock.TotalDiscountAmountPR = 0;
            $scope.inwardStock.TotalVATAmountPR = 0;
            $scope.inwardStock.TotalPaymentAmountPR = 0;
            $scope.inwardStock.DiscountForInvoicePR = 0;
            for (var i in $scope.voucherDetail) {
                if ($scope.voucherDetail[i].select === true) {
                    $scope.inwardStock.TotalAmountPR = $scope.inwardStock.TotalAmountPR + $scope.voucherDetail[i].Amount;
                    $scope.voucherDetail[i].discount2 = ($scope.voucherDetail[i].Amount / $scope.inwardStock.TotalAmount) * Number($scope.inwardStock.DiscountForInvoice);
                    $scope.inwardStock.TotalVATAmountPR += ($scope.voucherDetail[i].VATRate / 100) * ($scope.voucherDetail[i].Amount - $scope.voucherDetail[i].discount2);
                    $scope.inwardStock.TotalDiscountAmountPR = $scope.inwardStock.TotalDiscountAmountPR + $scope.voucherDetail[i].chietkhau;
                    $scope.inwardStock.TotalReturnQuantity = $scope.inwardStock.TotalReturnQuantity + $scope.voucherDetail[i].quan;
                    $scope.inwardStock.DiscountForInvoicePR = $scope.inwardStock.DiscountForInvoicePR + $scope.voucherDetail[i].discount2;

                }
            }
            if ($scope.inwardStock.TotalAmountPR === 0) {
                $scope.inwardStock.TotalPaymentAmountPR = 0;
            } else {
                $scope.inwardStock.TotalPaymentAmountPR = $scope.inwardStock.TotalAmountPR + $scope.inwardStock.TotalVATAmountPR - $scope.inwardStock.DiscountForInvoicePR;
            }
            $scope.inwardStock.TotalDiscountAmountPR = $scope.inwardStock.TotalDiscountAmountPR + $scope.inwardStock.DiscountForInvoicePR;
            //$scope.inwardStock.TongConLai = $scope.inwardStock.TongConLai - $scope.inwardStock.TotalReturnQuantity;
        }

        function getItem() {
            apiService.get('api/itemOption/getall', null, function (result) {
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

        function GetVoucherDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherDetail = result.data;

                apiService.get('api/purchaseInvDetail/getPurchaseReturnDetailByISID/' + $stateParams.id, null,
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
                            $scope.inwardStock.TotalMaxQuantity = $scope.inwardStock.TotalMaxQuantity + $scope.voucherDetail[i].maxquantity;
                            //$scope.voucherDetail[i].conlai = $scope.voucherDetail[i].maxquantity - $scope.voucherDetail[i].quan;
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

        function GetVendor(id) {
            apiService.get('api/vendor/getbyid/' + id, null, function (result) {
                $scope.vendor = result.data;
                if ($scope.inwardStock.ObjectID === $scope.vendor.ObjectID) {
                    $scope.inwardStock.ObjectName = $scope.vendor.ObjectName;
                    $scope.inwardStock.ObjectAddress = $scope.vendor.ObjectAddress;
                    $scope.inwardStock.Tel = $scope.vendor.Tel;
                    $scope.inwardStock.Email = $scope.vendor.Email;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function GetVoucherById() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null, function (result) {
                $scope.inwardStock = result.data;

                $scope.GetVendor($scope.inwardStock.ObjectID);
                $scope.getCode();
                $scope.getPurchaseReturnByPartialStorage();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.GetVoucherById();
        $scope.GetVoucherDetail();
    }
})(angular.module('tiktak.purchaseReturn'));