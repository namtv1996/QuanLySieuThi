(function (app) {
    app.controller('purchaseReturnDetailController', purchaseReturnDetailController);

    purchaseReturnDetailController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$ngBootbox', '$state'];
    function purchaseReturnDetailController($scope, apiService, $stateParams, notificationService, $ngBootbox, $state) {

        $scope.purchaseReturn = {
            Paymented: 0,
            TotalPaymented: 0,
            ConLai: 0,
        };
        $scope.getPurchaseReturnById = getPurchaseReturnById;
        $scope.GetVendor = GetVendor;
        $scope.Vendor = {};
        $scope.GetPurchaseReturnDetail = GetPurchaseReturnDetail;
        $scope.purchaseReturnDetail = [];
        $scope.getItem = getItem;
        $scope.listItemOpt = [];
        $scope.display = '';
        $scope.dis = '';
        $scope.disp = '';
        $scope.display_pay = 'none';
        $scope.displayReceipt = 'none';
        $scope.cls = '';
        $scope.cls1 = '';
        $scope.thongbao = '';
        $scope.TraHang = TraHang;
        $scope.thongbaos = '';
        $scope.PaymentFull = PaymentFull;
        $scope.PartialPayment = PartialPayment;
        $scope.deleteVoucher = deleteVoucher;
        $scope.Warning = Warning;
        $scope.Display = Display;
        $scope.AddReceipt = AddReceipt;
        $scope.GetReceipt = GetReceipt;
        $scope.listReceipt = [];
        $scope.getInwardStock = getInwardStock;


        function getInwardStock() {
            apiService.get('api/purchaseInvoice/getbyid/' + $scope.purchaseReturn.InwardStockID, null, function (result) {
                var inwardStock = result.data;

                if ($scope.purchaseReturn.InwardStockID === inwardStock.VoucherID) {
                    $scope.purchaseReturn.InwardStockVoucherNo = inwardStock.INVoucherNo;
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function GetReceipt() {
            var config = {
                params: {
                    originalvoucherno: $scope.purchaseReturn.INVoucherNo
                }
            }
            apiService.get('api/saleOrder/getbyoriginalvoucherno', config,
                function (result) {
                    $scope.listReceipt = result.data;

                    if ($scope.listReceipt.length <= 0) {
                        $scope.displayReceipt = 'none';
                        $scope.purchaseReturn.TotalPaymented = 0;
                    } else {
                        $scope.displayReceipt = 'block';
                        $scope.purchaseReturn.TotalPaymented = 0;
                        for (var i = 0; i < $scope.listReceipt.length; i++) {
                            $scope.purchaseReturn.TotalPaymented = $scope.purchaseReturn.TotalPaymented + $scope.listReceipt[i].TotalAmount;
                        }
                    }

                    $scope.purchaseReturn.ConLai = $scope.purchaseReturn.TotalPaymentAmount - $scope.purchaseReturn.TotalPaymented;
                    if ($scope.purchaseReturn.ConLai <= 0) {
                        $scope.purchaseReturn.PaymentStatus = 2;
                        apiService.put('api/purchaseInvoice/update', $scope.purchaseReturn,
                            function (result) {
                                $scope.cls1 = 'fa fa-check-square-o';
                                $scope.thongbaos = 'ĐÃ NHẬN HOÀN TIỀN';
                                $scope.display = 'block';
                                $scope.dis = 'none';
                                $scope.disp = 'none';
                                $scope.display_pay = 'none';
                            }, function (error) {
                                console.log("...");
                            });
                    }
                }, function (error) {
                    console.log(" phiếu thu");
                }
            );
        }

        function Display() {
            $scope.disp = 'block';
            $scope.display_pay = 'block';
        }

        function AddReceipt(amount) {
            if (amount > 0) {
                var receipt = {};
                receipt.ObjectID = $scope.purchaseReturn.ObjectID;
                receipt.OriginalVoucherNo = $scope.purchaseReturn.INVoucherNo;
                receipt.VoucherType = 20;
                receipt.StatusID = 0;
                receipt.VoucherDate = new Date();
                receipt.TotalAmount = amount;
                receipt.TotalAmountOC = amount;
                receipt.Description = 'Nhận tiền khi trả lại hàng cho nhà cung cấp';
                apiService.post('api/saleOrder/create_receipt', receipt,
                    function (result) {

                    }, function (error) {
                        console.log("Đéo tạo đk phiếu thu");
                    }
                );
            } else {
                notificationService.displayWarning('Số tiền phải lớn hơn 0đ');
            }

        }

        function PartialPayment() {
            $scope.purchaseReturn.PaymentStatus = 1;
            apiService.put('api/purchaseInvoice/update', $scope.purchaseReturn,
                function (result) {
                    $scope.AddReceipt($scope.purchaseReturn.Paymented);
                    $scope.GetReceipt();
                    $scope.getPurchaseReturnById();

                    $scope.Vendor.Debt = $scope.Vendor.Debt + $scope.purchaseReturn.Paymented;
                    apiService.put('api/vendor/update', $scope.Vendor,
                        function (result) {
                            console.log("Công nợ phải trả đã tăng lên");
                        }, function (error) {
                            console.log("Công nợ phải trả đéo tăng lên được");
                        });


                }, function (error) {
                    notificationService.displayError('Thanh toán thất bại !');
                });
        }

        function Warning() {
            notificationService.displayWarning('Tính năng này chưa được hỗ trợ. Xin quý khách vui lòng đợi bản cập nhật sau.');
        }

        function deleteVoucher(id) {
            if ($scope.purchaseReturn.Status === 0) {
                $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                    var config = {
                        params: {
                            id: id
                        }
                    }
                    apiService.del('api/purchaseInvoice/delete', config, function () {
                        notificationService.displaySuccess('Xóa thành công');
                        $state.go('purchaseReturn');
                    }, function () {
                        notificationService.displayError('Xóa không thành công');
                    })
                });
            } else {
                notificationService.displayWarning('Hàng hóa đã xuất trả. Không xóa được đơn trả hàng !');
            }

        }

        function PaymentFull() {
            $scope.purchaseReturn.PaymentStatus = 2;
            apiService.put('api/purchaseInvoice/update', $scope.purchaseReturn,
                function (result) {
                    notificationService.displaySuccess(result.data.INVoucherNo + ' được thanh toán !');
                    //$scope.dis = 'none';
                    //$scope.disp = 'none';
                    //$scope.thongbaos = 'ĐÃ NHẬN HOÀN TIỀN';
                    //$scope.cls1 = 'fa fa-check-square-o';
                    $scope.AddReceipt($scope.purchaseReturn.ConLai);
                    $scope.getPurchaseReturnById();

                    $scope.Vendor.Debt = $scope.Vendor.Debt + $scope.purchaseReturn.TotalPaymentAmount;
                    apiService.put('api/vendor/update', $scope.Vendor,
                        function (result) {
                            console.log("Công nợ phải trả đã tăng lên");
                        }, function (error) {
                            console.log("Công nợ phải trả đéo tăng lên được");
                        });


                }, function (error) {
                    notificationService.displayError('Thanh toán thất bại !');
                });
        }

        function TraHang() {
            var param = {
                BranchID: $scope.purchaseReturn.BranchID,
                voucherID: $scope.purchaseReturn.VoucherID
            }
            apiService.put('api/stock/updateClosingQuantityPurchaseReturn', param,
                function (result) {
                    console.log('cập nhật tồn kho thành công !!');
                }, function (error) {
                    console.log('cập nhật hàng hóa thất bại !!');
                }
            );

            $scope.purchaseReturn.Status = 1;
            $scope.purchaseReturn.INVoucherDate = new Date();

            apiService.put('api/purchaseInvoice/update', $scope.purchaseReturn,
                function (result) {
                    notificationService.displaySuccess('Hoàn trả hàng hóa thành công !!');
                    //$scope.thongbao = 'ĐÃ XUẤT TRẢ';
                    //$scope.cls = 'fa fa-check-square-o';
                    //$scope.dis = 'none';
                    //$scope.display = 'block';
                    //$scope.disp = 'block';
                    //$scope.purchaseReturn.tt = "Đã trả";
                    //$scope.purchaseReturn.cs = "available";
                    $scope.getPurchaseReturnById();

                }, function (error) {
                    notificationService.displayError('Thất bại !!');
                });
        }

        function GetPurchaseReturnDetail() {
            apiService.get('api/purchaseInvDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.purchaseReturnDetail = result.data;
                $scope.getItem();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getItem() {
            apiService.get('api/itemOption/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.purchaseReturnDetail.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.purchaseReturnDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.purchaseReturnDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.purchaseReturnDetail[i].SKU_Code = $scope.listItemOpt[j].SKU;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function GetVendor(id) {
            apiService.get('api/vendor/getbyid/' + id, null, function (result) {
                $scope.Vendor = result.data;
                if ($scope.purchaseReturn.ObjectID === $scope.Vendor.ObjectID) {
                    $scope.purchaseReturn.ObjectName = 'Nhà cung cấp ' + $scope.Vendor.ObjectName;
                    $scope.purchaseReturn.ObjectAddress = $scope.Vendor.ObjectAddress;
                    $scope.purchaseReturn.Tel = $scope.Vendor.Tel;
                    $scope.purchaseReturn.Email = $scope.Vendor.Email;
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getPurchaseReturnById() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null, function (result) {
                $scope.purchaseReturn = result.data;
                $scope.purchaseReturn.Paymented = 0;
                $scope.GetReceipt();
                $scope.GetVendor($scope.purchaseReturn.ObjectID);
                $scope.getInwardStock();
                if ($scope.purchaseReturn.Status === 1) {
                    $scope.purchaseReturn.tt = "Đã trả";
                    $scope.purchaseReturn.cs = "available";
                }
                else {
                    $scope.purchaseReturn.tt = "Đang trả";
                    $scope.purchaseReturn.cs = "not-available";
                }
                if ($scope.purchaseReturn.INVoucherDate === null) {
                    $scope.purchaseReturn.INVoucherDate = '_ _ /_ _ /_ _';
                }
                if ($scope.purchaseReturn.Status === 0) {
                    $scope.display = 'none';
                    $scope.dis = 'block';
                    $scope.disp = 'none';
                }
                if ($scope.purchaseReturn.Status === 1 && $scope.purchaseReturn.PaymentStatus === 0) {
                    $scope.thongbao = 'ĐÃ XUẤT TRẢ';
                    $scope.cls = 'fa fa-check-square-o';
                    $scope.display = 'block';
                    $scope.dis = 'none';
                    $scope.disp = 'block';
                }
                if ($scope.purchaseReturn.Status === 1 && $scope.purchaseReturn.PaymentStatus === 1) {
                    $scope.thongbao = 'ĐÃ XUẤT TRẢ';
                    $scope.cls = 'fa fa-check-square-o';
                    $scope.thongbaos = 'Đang nhận';
                    $scope.cls1 = 'not-available';
                    $scope.display = 'block';
                    $scope.dis = 'none';
                    $scope.disp = 'block';
                }
                if ($scope.purchaseReturn.Status === 1 && $scope.purchaseReturn.PaymentStatus === 2) {
                    $scope.purchaseReturn.tt = "Hoàn thành";
                    $scope.purchaseReturn.cs = "available";
                    $scope.thongbao = 'ĐÃ XUẤT TRẢ';
                    $scope.cls = 'fa fa-check-square-o';
                    $scope.cls1 = 'fa fa-check-square-o';
                    $scope.thongbaos = 'ĐÃ NHẬN HOÀN TIỀN';
                    $scope.display = 'block';
                    $scope.dis = 'none';
                    $scope.disp = 'none';
                }


            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.getPurchaseReturnById();
        $scope.GetPurchaseReturnDetail();

    }
})(angular.module('tiktak.purchaseReturn'));