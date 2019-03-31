(function (app) {
    app.controller('inwardStockEditController', inwardStockEditController);
    inwardStockEditController.$inject = ['$scope', 'apiService', '$stateParams', 'notificationService', '$ngBootbox', '$state'];

    function inwardStockEditController($scope, apiService, $stateParams, notificationService, $ngBootbox, $state) {
        $scope.inwardStock = {
          
            discount_default: 0
        };
        $scope.infoVendor = {};
        $scope.GetVoucherById = GetVoucherById;
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.getItem = getItem;

        $scope.cart = {
            list_selected: [],
        };

        $scope.filterList = [];
        $scope.dis = 'none';
        $scope.dis1 = 'none';
        $scope.searchText = '';
        $scope.search = search;

        $scope.chooseProduct = chooseProduct;

        $scope.TinhToan = TinhToan;
        $scope.update = update;
        $scope.del = del;

        $scope.discountForInvoice = discountForInvoice;

        $scope.EditInwardStock = EditInwardStock;
        $scope.AddInwardStockDetail = AddInwardStockDetail;
        $scope.InwardStockDetail = {};

        function discountForInvoice() {         
            $scope.inwardStock.DiscountForInvoice = $scope.inwardStock.DiscountForInvoice;
            TinhToan();
        }

        function EditInwardStock(id) {
            apiService.del('api/purchaseInvDetail/deleteByVoucherID?id=' + id, null, function () {
                apiService.put('api/purchaseInvoice/update', $scope.inwardStock, function (result) {
                    AddInwardStockDetail(0, result.data)
                }, function (error) {
                    notificationService.displayError('Cập nhật thất bại !');
                });


            }, function (error) {
                notificationService.displayError('Thất bại !!');
            });
        }

        function AddInwardStockDetail(i, item) {

            if (i < $scope.cart.list_selected.length) {
                $scope.InwardStockDetail.VoucherID = item.VoucherID;
                $scope.InwardStockDetail.SortOrder = $scope.cart.list_selected[i].stt;
                $scope.InwardStockDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.InwardStockDetail.Quantity = $scope.cart.list_selected[i].quan;
                $scope.InwardStockDetail.UnitPrice = $scope.cart.list_selected[i].UnitPrice;
                $scope.InwardStockDetail.VATRate = $scope.cart.list_selected[i].thue;
                $scope.InwardStockDetail.DiscountAmount = $scope.cart.list_selected[i].chietkhau;
                $scope.InwardStockDetail.DiscountRate = ($scope.cart.list_selected[i].chietkhau * 100) / ($scope.cart.list_selected[i].quan * $scope.cart.list_selected[i].UnitPrice);
                $scope.InwardStockDetail.Amount = $scope.cart.list_selected[i].thanhtien;
                apiService.post('api/purchaseInvDetail/create', $scope.InwardStockDetail,
                    function (result) {
                        AddInwardStockDetail(i + 1, item);

                    }, function (error) {
                        console.log('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Successfully !!');

                $state.go('inwardStockDetails', { id: item.VoucherID });
            }
        }

        function TinhToan() {
            $scope.inwardStock.discount_default = 0;
            $scope.inwardStock.TotalPurchaseQuantity = 0;
            $scope.inwardStock.TotalAmount = 0;
            $scope.inwardStock.TotalDiscountAmount = 0;
            $scope.inwardStock.TotalVATAmount = 0;
            $scope.inwardStock.TotalPaymentAmount = 0;
            for (var i in $scope.cart.list_selected) {
                $scope.inwardStock.TotalAmount = $scope.inwardStock.TotalAmount + $scope.cart.list_selected[i].thanhtien;
                $scope.cart.list_selected[i].discount2 = ($scope.cart.list_selected[i].thanhtien / $scope.inwardStock.TotalAmount) * Number($scope.inwardStock.DiscountForInvoice);
                $scope.inwardStock.TotalVATAmount += ($scope.cart.list_selected[i].thue / 100) * ($scope.cart.list_selected[i].thanhtien - $scope.cart.list_selected[i].discount2);
                $scope.inwardStock.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmount + $scope.cart.list_selected[i].chietkhau;
                $scope.inwardStock.TotalPurchaseQuantity = $scope.inwardStock.TotalPurchaseQuantity + $scope.cart.list_selected[i].quan;

            }
            if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '' && $scope.infoVendor.ObjectID !== undefined) {
                $scope.inwardStock.discount_default = ($scope.infoVendor.DiscountRateDefault * $scope.inwardStock.TotalAmount) / 100;
            }
            $scope.inwardStock.TotalPaymentAmount = $scope.inwardStock.TotalAmount + $scope.inwardStock.TotalVATAmount - $scope.inwardStock.DiscountForInvoice - $scope.inwardStock.discount_default;
            $scope.inwardStock.TotalDiscountAmount = $scope.inwardStock.TotalDiscountAmount + $scope.inwardStock.DiscountForInvoice + $scope.inwardStock.discount_default;
        }

        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }
            TinhToan();
        }
        function update(stt) {
            $scope.cart.list_selected[stt - 1].thanhtien = $scope.cart.list_selected[stt - 1].UnitPrice * $scope.cart.list_selected[stt - 1].quan
                - $scope.cart.list_selected[stt - 1].chietkhau;
            TinhToan();
        }

        function chooseProduct(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                var item = result.data;
                if ($scope.cart.list_selected.length === 0) {
                    item.quan = 1;
                    item.stt = 1;
                    item.chietkhau = 0;
                    item.thue = 0;
                    item.UnitPrice = item.PurchasePrice;
                    if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '' && $scope.infoVendor.ObjectID !== undefined && $scope.infoVendor.PricePolicyDefault !== null) {
                        if ($scope.infoVendor.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                            item.UnitPrice = item.SalePrice;
                        } else {
                            if ($scope.infoVendor.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                item.UnitPrice = item.WholesalePrice;
                            }
                            if ($scope.infoVendor.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                item.UnitPrice = item.PurchasePrice;
                            }
                        }

                        item.thue = $scope.infoVendor.TaxRateDefault;
                    }

                    item.thanhtien = item.UnitPrice * item.quan - item.chietkhau;

                    $scope.cart.list_selected.push(item);
                }
                else {
                    var pos = -1;
                    var STT = 1;
                    for (var i in $scope.cart.list_selected) {
                        if ($scope.cart.list_selected[i].ID === id) {
                            pos = i;
                        }
                        STT++;
                    }
                    if (pos === -1) {
                        item.quan = 1;
                        item.stt = STT;
                        item.chietkhau = 0;
                        item.thue = 0;
                        item.UnitPrice = item.PurchasePrice;
                        if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '' && $scope.infoVendor.ObjectID !== undefined && $scope.infoVendor.PricePolicyDefault !== null) {
                            if ($scope.infoVendor.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                item.UnitPrice = item.SalePrice;
                            } else {
                                if ($scope.infoVendor.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                    item.UnitPrice = item.WholesalePrice;
                                }
                                if ($scope.infoVendor.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                    item.UnitPrice = item.PurchasePrice;
                                }
                            }

                            item.thue = $scope.infoVendor.TaxRateDefault;
                        }

                        item.thanhtien = item.UnitPrice * item.quan - item.chietkhau;
                        $scope.cart.list_selected.push(item);

                    }
                    else {
                        $scope.cart.list_selected[pos].quan++;

                        $scope.cart.list_selected[pos].thanhtien = ($scope.cart.list_selected[pos].UnitPrice * $scope.cart.list_selected[pos].quan
                            - $scope.cart.list_selected[pos].chietkhau);
                    }
                }

                TinhToan();
            }, function (error) {
                notificationService.displayError(error.data);
            });
            $scope.dis = 'none';
            $scope.searchText = '';
        }

        function search() {
            if ($scope.searchText !== '') {
                $scope.dis = 'block';
                var account = {};
                apiService.get('api/account/users', null, function (result) {
                    account = result.data;
                    apiService.get('api/itemOption/AutoComplete?BranchID=' + account.BranchID, null, function (result1) {
                        $scope.filterList = result1.data;
                    });
                });
                if ($scope.filterList.length === 0) {
                    $scope.dis1 = 'block';
                }
            }
            else {
                $scope.dis = 'none';
            }
        }
        function getItem() {
            apiService.get('api/positem/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.voucherDetail.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.voucherDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.listItemOpt[j].quan = $scope.voucherDetail[i].Quantity;
                            $scope.listItemOpt[j].chietkhau = $scope.voucherDetail[i].DiscountAmount;
                            $scope.listItemOpt[j].thue = $scope.voucherDetail[i].VATRate;
                            $scope.listItemOpt[j].stt = i + 1;
                            $scope.listItemOpt[j].UnitPrice = $scope.voucherDetail[i].UnitPrice;
                            $scope.listItemOpt[j].thanhtien = $scope.voucherDetail[i].Amount;

                            $scope.cart.list_selected.push($scope.listItemOpt[j]);
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
                $scope.getItem();

            }, function (error) {
                notificationService.displayError(error.data);
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
                if ($scope.inwardStock.ObjectID !== null) {
                    apiService.get('api/vendor/getbyid/' + $scope.inwardStock.ObjectID, null,
                        function (result) {
                            $scope.infoVendor = result.data;
                            if (result.data.ObjectID === $scope.inwardStock.ObjectID) {
                                $scope.inwardStock.ObjectName = result.data.ObjectName;
                                $scope.inwardStock.ObjectAddress = result.data.ObjectAddress;
                                $scope.inwardStock.Tel = result.data.Tel;
                                $scope.inwardStock.Email = result.data.Email;
                            }
                        }, function (error) {
                            console.log('Thất bại !!');
                        }
                    );
                }
                

            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        $scope.GetVoucherById();
        $scope.GetVoucherDetail();

    }
})(angular.module('tiktak.cashbook'));