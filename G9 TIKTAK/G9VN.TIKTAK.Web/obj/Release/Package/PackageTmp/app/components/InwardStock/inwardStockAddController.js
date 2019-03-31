//not code
(function (app) {
    app.controller('inwardStockAddController', inwardStockAddController);
    inwardStockAddController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$state', '$ngBootbox'];
    function inwardStockAddController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
        $scope.InwardStock = {
            INVoucherNo: null,
            DeliveryDate: null,
            TotalPurchaseQuantity: 0,
            TotalAmount: 0,
            TotalVATAmount: 0,
            TotalDiscountAmount: 0,
            DiscountForInvoice: '0',
            DiscountForInvoice_txt: '0',
            TotalPaymentAmount: 0,
            Status: 0,
            InvoiceExportStatus: 0,
            StockImportStatus: 0,
            PaymentStatus: 0,
            discount_default: 0
        };
        $scope.InwardStockDetail = {
        };
        $scope.TinhToan = TinhToan;
        $scope.update = update;
        $scope.discountForInvoice = discountForInvoice;

        $scope.getVendor = getVendor;
        $scope.listVendor = [];
        $scope.vendor_searchText = '';


        $scope.getInfoVendor = getInfoVendor;
        $scope.infoVendor = {
            ObjectID: null,
            ObjectName: null,
            Address: null,
            Tel: null,
            Email: null,
            PricePolicyDefaultName: null,
            PaymentMethodDefaultName: null,
            PaymentScheduleDefaultName: null
        };
        $scope.vendors = {
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: 1,
            Tel: null,
            Email: null,
            Debt: 0,
            AccumulativePoint: 0,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null,
            ApplyIncentives: '3',
            PricePolicyDefault: null,
            TaxRateDefault: 0,
            DiscountRateDefault: 0,
            PaymentMethodDefault: '1',
            PaymentScheduleDefault: null
        }
        $scope.getBranch = getBranch;
        $scope.branch = {};
        $scope.branchName = '';
        $scope.cart = {
            list_selected: [],
        };
        $scope.chooseProduct = chooseProduct;
        $scope.del = del;
        $scope.AddInwardStock = AddInwardStock;
        $scope.AddInwardStockDetail = AddInwardStockDetail;
        $scope.getItemOptionByBranch = getItemOptionByBranch;
        $scope.getCode = getCode;
        $scope.filterList = [];
        $scope.dis = 'none';
        $scope.dis1 = 'none';
        $scope.searchText = '';
        $scope.search = search;
        //lấy thông tin chi nhánh+ lấy thông  tin hàng hóa theo chi nhánh
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });

        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        //Dinh dang tien VND
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                } else {
                    break;
                }
            }
            var Gia = "";
            var dem = 0;
            for (var i = arr1.length - 1; i >= 0; i--) {
                dem++;
                Gia = Gia + arr1[i];
                if (dem == 3 && i != 0) {
                    Gia = Gia + ",";
                    dem = 0;
                }
            }
            var arr2 = new String(Gia);
            var GiaMoi = '';
            for (var i = arr2.length - 1; i >= 0; i--) {
                GiaMoi = GiaMoi + arr2[i];
            }
            return GiaMoi;
        }
        //Dinh dang so
        function ConvertNumber(str) {
            var arr = new String(str);
            var monney = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != ',') {
                    monney = monney + arr[i];
                }
            }
            return monney;
        }

        $scope.class_btn_vnd = 'btn btn-primary';
        $scope.class_btn_pt = 'btn btn-default';
        document.getElementById("vnd").disabled = true;
        document.getElementById("pt").disabled = false;      
        var check_unit = 1;

        $scope.changeUnitDiscount_Click = changeUnitDiscount_Click;
        function changeUnitDiscount_Click(check_click) {
            if (check_click === 1) {
                $scope.class_btn_vnd = 'btn btn-primary';
                $scope.class_btn_pt = 'btn btn-default';
                check_unit = 1;
                document.getElementById("vnd").disabled = true;
                document.getElementById("pt").disabled = false;
                if ($scope.InwardStock.DiscountForInvoice_txt !== null && $scope.InwardStock.DiscountForInvoice_txt !== '' && $scope.InwardStock.DiscountForInvoice_txt !== '0') {
                    $scope.InwardStock.DiscountForInvoice_txt = Currency((Number($scope.InwardStock.DiscountForInvoice_txt) * Number(ConvertNumber($scope.InwardStock.TotalAmount)) / 100).toString());
                }
            }
            else if (check_click === 2) {
                $scope.class_btn_vnd = 'btn btn-default';
                $scope.class_btn_pt = 'btn btn-primary';
                check_unit = 2;
                document.getElementById("vnd").disabled = false;
                document.getElementById("pt").disabled = true;
                if ($scope.InwardStock.DiscountForInvoice_txt !== null && $scope.InwardStock.DiscountForInvoice_txt !== '' && $scope.InwardStock.DiscountForInvoice_txt !== '0') {
                    $scope.InwardStock.DiscountForInvoice_txt = Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt)) / Number(ConvertNumber($scope.InwardStock.TotalAmount)) * 100;
                }
            }
        }

        $scope.discount_item_Click = discount_item_Click
        function discount_item_Click(stt) {
            if ($scope.cart.list_selected[stt - 1].display_discount === 'none') {
                $scope.cart.list_selected[stt - 1].display_discount = 'block';
                for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                    if (i !== stt - 1) {
                        $scope.cart.list_selected[i].display_discount = 'none';
                    }
                }
            } else {
                $scope.cart.list_selected[stt - 1].display_discount = 'none';
            }
        }

        $scope.changeDiscount = changeDiscount;
        function changeDiscount(stt) {
            if ($scope.cart.list_selected[stt - 1].status_discount === false) {
                if (Number(ConvertNumber($scope.cart.list_selected[stt - 1].txt_discount_item)) > 100) {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = '100';
                }
                if (Number(ConvertNumber($scope.cart.list_selected[stt - 1].txt_discount_item)) <= 0) {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = '0';
                }
            } else {
                $scope.cart.list_selected[stt - 1].txt_discount_item = Currency($scope.cart.list_selected[stt - 1].txt_discount_item);
                if (Number(ConvertNumber($scope.cart.list_selected[stt - 1].txt_discount_item)) > ($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice)))) {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = Currency(($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice))).toString());
                }
            }
        }

        $scope.changeStatusDiscount = changeStatusDiscount;
        function changeStatusDiscount(stt) {
            if ($scope.cart.list_selected[stt - 1].txt_discount_item !== '' && $scope.cart.list_selected[stt - 1].txt_discount_item !== null && $scope.cart.list_selected[stt - 1].txt_discount_item !== '0') {
                if ($scope.cart.list_selected[stt - 1].status_discount === false) {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = Number(Number(ConvertNumber($scope.cart.list_selected[stt - 1].txt_discount_item)) * 100 / ($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice))));
                } else {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = Currency((Number($scope.cart.list_selected[stt - 1].txt_discount_item) * $scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice)) / 100).toFixed(2));
                }
            }
        }

        $scope.ApplyDiscount = ApplyDiscount;
        function ApplyDiscount(stt) {
            if ($scope.cart.list_selected[stt - 1].status_discount === false) {
                $scope.cart.list_selected[stt - 1].chietkhau = Currency(Number($scope.cart.list_selected[stt - 1].txt_discount_item) * $scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice)) / 100);

            } else {
                $scope.cart.list_selected[stt - 1].chietkhau = $scope.cart.list_selected[stt - 1].txt_discount_item;
            }

            $scope.update(stt);
            $scope.cart.list_selected[stt - 1].display_discount = 'none';
        }

        function search() {
            if ($scope.searchText != '') {
                $scope.dis = 'block';
                var account = {};
                apiService.get('api/account/users', null, function (result) {
                    account = result.data;
                    apiService.get('api/itemOption/AutoComplete?BranchID=' + account.BranchID, null, function (result1) {
                        $scope.filterList = result1.data;
                    });
                });
            }
            else {
                $scope.dis = 'none';
            }
        }

        function getCode() {
            var config = {
                params: {
                    parentID: 'NH',
                    vouchertype1: 4,
                    vouchertype2: 4
                }
            }
            apiService.get('api/purchaseInvoice/getCode', config, function (result) {
                $scope.InwardStock.INVoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }
        function getItemOptionByBranch() {
            apiService.get('api/account/users', null, function (result) {
                var account = {};
                account = result.data;
                apiService.get('api/itemOption/AutoComplete?BranchID=' + account.BranchID, null, function (result) {
                    $scope.listItemOpt = result.data;

                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load items failed');
            });
        }
        function discountForInvoice() {
            if (check_unit === 1) {
                if ($scope.InwardStock.DiscountForInvoice_txt === undefined) {
                    $scope.InwardStock.DiscountForInvoice_txt = '0';
                } else {
                    $scope.InwardStock.DiscountForInvoice_txt = Currency(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt.toString()));
                    if (Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt)) > Number($scope.InwardStock.TotalAmount)) {
                        $scope.InwardStock.DiscountForInvoice_txt = Currency(ConvertNumber($scope.InwardStock.TotalAmount.toString()));
                    }
                }
                $scope.InwardStock.DiscountForInvoice = Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt));
            }
            else if (check_unit === 2) {
                if ($scope.InwardStock.DiscountForInvoice_txt === undefined) {
                    $scope.InwardStock.DiscountForInvoice_txt = '0';
                } else {                  
                    if (Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt)) < 0) {
                        $scope.InwardStock.DiscountForInvoice_txt = '0';
                    }
                    if (Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt)) > 100) {
                        $scope.InwardStock.DiscountForInvoice_txt = '100';
                    }                   
                }
                $scope.InwardStock.DiscountForInvoice = (Number(ConvertNumber($scope.InwardStock.DiscountForInvoice_txt)) / 100) * Number(ConvertNumber($scope.InwardStock.TotalAmount));
            }
                 
            TinhToan();
        }
        function AddInwardStock() {
            var check_price = false;
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                if ($scope.cart.list_selected[i].UnitPrice === '0' || $scope.cart.list_selected[i].UnitPrice === null || $scope.cart.list_selected[i].UnitPrice === undefined) {
                    check_price = false;
                    break;
                } else {
                    check_price = true;
                }
            }

            if ($scope.cart.list_selected.length > 0) {
                if (check_price === true) {
                    $scope.InwardStock.ObjectID = $scope.infoVendor.ObjectID;
                    $scope.InwardStock.BranchID = $scope.branch.BranchID;
                    $scope.InwardStock.DeliveryDate = $scope.InwardStock.DeliveryDate;
                    $scope.InwardStock.DiscountForInvoice = Number(ConvertNumber($scope.InwardStock.DiscountForInvoice)) + $scope.InwardStock.discount_default;
                    apiService.post('api/purchaseInvoice/create', $scope.InwardStock,
                        function (result) {
                            AddInwardStockDetail(0, result.data);
                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        });
                } else {
                    notificationService.displayWarning('Bạn cần nhập đầy đủ đơn giá !!');
                }
            } else {
                notificationService.displayWarning('Vui lòng chọn hàng hóa để nhập !!');
            }
        }
        function AddInwardStockDetail(i, item) {
            if (i < $scope.cart.list_selected.length) {
                $scope.InwardStockDetail.VoucherID = item.VoucherID;
                $scope.InwardStockDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.InwardStockDetail.SortOrder = $scope.cart.list_selected[i].stt;
                $scope.InwardStockDetail.Quantity = $scope.cart.list_selected[i].quan;
                $scope.InwardStockDetail.UnitPrice = Number(ConvertNumber($scope.cart.list_selected[i].UnitPrice));
                $scope.InwardStockDetail.VATRate = $scope.cart.list_selected[i].thue;
                $scope.InwardStockDetail.DiscountAmount = Number(ConvertNumber($scope.cart.list_selected[i].chietkhau));
                $scope.InwardStockDetail.DiscountAmountOC = $scope.InwardStockDetail.DiscountAmount;
                $scope.InwardStockDetail.DiscountReason = $scope.cart.list_selected[i].DiscountReason;
                $scope.InwardStockDetail.DiscountRate = (Number(ConvertNumber($scope.cart.list_selected[i].chietkhau)) * 100) / ($scope.cart.list_selected[i].quan * Number(ConvertNumber($scope.cart.list_selected[i].UnitPrice)));
                $scope.InwardStockDetail.Amount = $scope.cart.list_selected[i].thanhtien;
                apiService.post('api/purchaseInvDetail/create', $scope.InwardStockDetail,
                    function (result) {
                        AddInwardStockDetail(i + 1, item);

                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Successfully !!');

                $state.go('inwardStockDetails', { id: item.VoucherID });
            }
        }
        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }
            TinhToan();
        }
        function update(stt) {
            if ($scope.cart.list_selected[stt - 1].UnitPrice === undefined) {
                $scope.cart.list_selected[stt - 1].UnitPrice = '0';
            } else {
                $scope.cart.list_selected[stt - 1].UnitPrice = Currency(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice.toString()));
            }

            if ($scope.cart.list_selected[stt - 1].chietkhau === undefined) {
                $scope.cart.list_selected[stt - 1].chietkhau = '0';
            } else {
                $scope.cart.list_selected[stt - 1].chietkhau = Currency(ConvertNumber($scope.cart.list_selected[stt - 1].chietkhau.toString()));
                if (Number(ConvertNumber($scope.cart.list_selected[stt - 1].chietkhau)) > ($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice)))) {
                    $scope.cart.list_selected[stt - 1].chietkhau = Currency(($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice))).toString());
                }
            } 

            $scope.cart.list_selected[stt - 1].thanhtien = Number(ConvertNumber($scope.cart.list_selected[stt - 1].UnitPrice)) * $scope.cart.list_selected[stt - 1].quan
                    - Number(ConvertNumber($scope.cart.list_selected[stt - 1].chietkhau));

            TinhToan();
        }
        function chooseProduct(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                var item = result.data;
                if ($scope.cart.list_selected.length == 0) {
                    item.quan = 1;
                    item.stt = 1;
                    item.status_discount = true;
                    item.display_discount = 'none';
                    item.txt_discount_item = '0';
                    item.chietkhau = '0';
                    item.thue = 0;
                    item.UnitPrice = Currency(item.PurchasePrice.toString());
                    if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '' && $scope.infoVendor.PricePolicyDefault !== null) {
                        if ($scope.infoVendor.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                            item.UnitPrice = Currency(item.SalePrice.toString());
                        } else {
                            if ($scope.infoVendor.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                item.UnitPrice = Currency(item.WholesalePrice.toString());
                            }
                            if ($scope.infoVendor.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                item.UnitPrice = Currency(item.PurchasePrice.toString());
                            }
                        }

                        item.thue = $scope.infoVendor.TaxRateDefault;
                    }

                    item.thanhtien = Number(ConvertNumber(item.UnitPrice)) * item.quan - Number(ConvertNumber(item.chietkhau));

                    $scope.cart.list_selected.push(item);
                }
                else {
                    var pos = -1;
                    var STT = 1;
                    for (var i in $scope.cart.list_selected) {
                        if ($scope.cart.list_selected[i].ID == id) {
                            pos = i;
                        }
                        STT++;
                    }
                    if (pos == -1) {
                        item.quan = 1;
                        item.stt = STT;
                        item.status_discount = true;
                        item.display_discount = 'none';
                        item.txt_discount_item = '0';
                        item.chietkhau = '0';
                        item.thue = 0;
                        item.UnitPrice = Currency(item.PurchasePrice.toString());
                        if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '' && $scope.infoVendor.PricePolicyDefault !== null) {
                            if ($scope.infoVendor.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                item.UnitPrice = Currency(item.SalePrice.toString());
                            } else {
                                if ($scope.infoVendor.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                    item.UnitPrice = Currency(item.WholesalePrice.toString());
                                }
                                if ($scope.infoVendor.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                    item.UnitPrice = Currency(item.PurchasePrice.toString());
                                }
                            }

                            item.thue = $scope.infoVendor.TaxRateDefault;
                        }

                        item.thanhtien = Number(ConvertNumber(item.UnitPrice)) * item.quan - Number(ConvertNumber(item.chietkhau));
                        $scope.cart.list_selected.push(item);

                    }
                    else {
                        $scope.cart.list_selected[pos].quan++;

                        $scope.cart.list_selected[pos].thanhtien = (Number(ConvertNumber($scope.cart.list_selected[pos].UnitPrice)) * $scope.cart.list_selected[pos].quan
                            - Number(ConvertNumber($scope.cart.list_selected[pos].chietkhau)));
                    }
                }

                TinhToan();
            }, function (error) {
                notificationService.displayError(error.data);
            });
            $scope.dis = 'none';
            $scope.searchText = '';
        }
        function TinhToan() {
            $scope.InwardStock.discount_default = 0;
            $scope.InwardStock.TotalPurchaseQuantity = 0;
            $scope.InwardStock.TotalAmount = 0;
            $scope.InwardStock.TotalDiscountAmount = 0;
            $scope.InwardStock.TotalVATAmount = 0;
            $scope.InwardStock.TotalPaymentAmount = 0;
            for (var i in $scope.cart.list_selected) {
                $scope.InwardStock.TotalAmount = $scope.InwardStock.TotalAmount + $scope.cart.list_selected[i].thanhtien;
                $scope.cart.list_selected[i].discount2 = ($scope.cart.list_selected[i].thanhtien / $scope.InwardStock.TotalAmount) * Number(ConvertNumber($scope.InwardStock.DiscountForInvoice));
                $scope.InwardStock.TotalVATAmount += ($scope.cart.list_selected[i].thue / 100) * ($scope.cart.list_selected[i].thanhtien - $scope.cart.list_selected[i].discount2);
                $scope.InwardStock.TotalDiscountAmount = $scope.InwardStock.TotalDiscountAmount + Number(ConvertNumber($scope.cart.list_selected[i].chietkhau));
                $scope.InwardStock.TotalPurchaseQuantity = $scope.InwardStock.TotalPurchaseQuantity + $scope.cart.list_selected[i].quan;

            }
            if ($scope.infoVendor.ObjectID !== null && $scope.infoVendor.ObjectID !== '') {
                $scope.InwardStock.discount_default = ($scope.infoVendor.DiscountRateDefault * $scope.InwardStock.TotalAmount) / 100;
            }
            $scope.InwardStock.TotalPaymentAmount = $scope.InwardStock.TotalAmount + $scope.InwardStock.TotalVATAmount - Number(ConvertNumber($scope.InwardStock.DiscountForInvoice)) - $scope.InwardStock.discount_default;
            $scope.InwardStock.TotalDiscountAmount = $scope.InwardStock.TotalDiscountAmount + Number(ConvertNumber($scope.InwardStock.DiscountForInvoice)) + $scope.InwardStock.discount_default;
        }
        function getBranch() {
            apiService.get('api/account/users', null, function (result) {
                var account = {};
                account = result.data;
                apiService.get('api/branch/getbyid/' + account.BranchID, null, function (result) {
                    $scope.branch = result.data;
                    $scope.branchName = 'Chi nhánh ' + $scope.branch.BranchName;
                }, function () {
                    console.log('load items failed');
                });

            }, function () {
                console.log('load items failed');
            });
        }
        function getInfoVendor(id) {
            apiService.get('api/vendor/getbyid/' + id, null, function (result) {
                $scope.infoVendor = result.data;
                if ($scope.infoVendor.ApplyIncentives === 2) {
                    apiService.get('api/pricePolicy/getbyid/' + $scope.infoVendor.PricePolicyDefault, null, function (result) {
                        $scope.infoVendor.PricePolicyDefaultName = result.data.PricePolicyName;
                    }, function (error) {
                        console.log('pricePolicy1');
                    });

                    apiService.get('api/paymentSchedule/getbyid/' + $scope.infoVendor.PaymentScheduleDefault, null, function (result) {
                        $scope.infoVendor.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                    }, function (error) {
                        console.log('paymentSchedule1');
                    });

                    if ($scope.infoVendor.PaymentMethodDefault === 1) {
                        $scope.infoVendor.PaymentMethodDefaultName = 'Tiền mặt';
                    } else {
                        if ($scope.infoVendor.PaymentMethodDefault === 2) {
                            $scope.infoVendor.PaymentMethodDefaultName = 'Chuyển khoản';
                        }
                        if ($scope.infoVendor.PaymentMethodDefault === 3) {
                            $scope.infoVendor.PaymentMethodDefaultName = 'COD';
                        }
                    }
                    if ($scope.cart.list_selected.length > 0) {
                        for (var i in $scope.cart.list_selected) {
                            if ($scope.infoVendor.TaxRateDefault !== null) {
                                $scope.cart.list_selected[i].thue = $scope.infoVendor.TaxRateDefault;
                            }

                            if ($scope.infoVendor.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].SalePrice.toString());
                            } else {
                                if ($scope.infoVendor.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                    $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                }
                                if ($scope.infoVendor.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                    $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                }
                            }

                            $scope.update($scope.cart.list_selected[i].stt);
                        }
                    }
                }
                else {
                    if ($scope.infoVendor.ApplyIncentives === 1) {
                        var vendorCategory = {};
                        apiService.get('api/objectCategory/getbyid/' + $scope.infoVendor.ObjectCategoryID, null, function (result) {
                            vendorCategory = result.data;
                            apiService.get('api/pricePolicy/getbyid/' + vendorCategory.PricePolicyDefault, null, function (result) {
                                $scope.infoVendor.PricePolicyDefault = result.data.PricePolicyID;
                                $scope.infoVendor.PricePolicyDefaultName = result.data.PricePolicyName;
                            }, function (error) {
                                console.log('pricePolicy2');
                            });

                            apiService.get('api/paymentSchedule/getbyid/' + vendorCategory.PaymentScheduleDefault, null, function (result) {
                                $scope.infoVendor.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                $scope.infoVendor.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                            }, function (error) {
                                console.log('paymentSchedule2');
                            });

                            if (vendorCategory.PaymentMethodDefault === 1) {
                                $scope.infoVendor.PaymentMethodDefaultName = 'Tiền mặt';
                            } else {
                                if (vendorCategory.PaymentMethodDefault === 2) {
                                    $scope.infoVendor.PaymentMethodDefaultName = 'Chuyển khoản';
                                }
                                if (vendorCategory.PaymentMethodDefault === 3) {
                                    $scope.infoVendor.PaymentMethodDefaultName = 'COD';
                                }
                            }
                            $scope.infoVendor.TaxRateDefault = vendorCategory.TaxRateDefault;
                            $scope.infoVendor.DiscountRateDefault = vendorCategory.DiscountRateDefault;

                            if ($scope.cart.list_selected.length > 0) {
                                $scope.infoVendor.DiscountRateDefault = vendorCategory.DiscountRateDefault;
                                for (var i in $scope.cart.list_selected) {
                                    if (vendorCategory.TaxRateDefault !== null) {
                                        $scope.cart.list_selected[i].thue = vendorCategory.TaxRateDefault;
                                    }
                                    if (vendorCategory.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                        $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].SalePrice.toString());
                                    } else {
                                        if (vendorCategory.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                            $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                        }
                                        if (vendorCategory.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                            $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                        }
                                    }

                                    $scope.update($scope.cart.list_selected[i].stt);
                                }
                            }

                        }, function (error) {
                            console.log('vendorCategory');
                        });
                    }

                    if ($scope.infoVendor.ApplyIncentives === 3) {
                        var store = {};
                        apiService.get('api/account/store', null, function (result) {
                            apiService.get('api/configStore/getConfig?manageStoreID=' + result.data.ManageStoreID, null, function (result) {
                                store = result.data;
                                apiService.get('api/pricePolicy/getbyid/' + store.PurchasePricePolicyDefault, null, function (result) {
                                    $scope.infoVendor.PricePolicyDefault = result.data.PricePolicyID;
                                    $scope.infoVendor.PricePolicyDefaultName = result.data.PricePolicyName;
                                }, function (error) {
                                    console.log('pricePolicy2');
                                });

                                apiService.get('api/paymentSchedule/getbyid/' + store.PaymentScheduleDefault, null, function (result) {
                                    $scope.infoVendor.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                    $scope.infoVendor.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                                }, function (error) {
                                    console.log('paymentSchedule2');
                                });

                                if (store.PaymentMethodDefault === 1) {
                                    $scope.infoVendor.PaymentMethodDefaultName = 'Tiền mặt';
                                } else {
                                    if (store.PaymentMethodDefault === 2) {
                                        $scope.infoVendor.PaymentMethodDefaultName = 'Chuyển khoản';
                                    }
                                    if (store.PaymentMethodDefault === 3) {
                                        $scope.infoVendor.PaymentMethodDefaultName = 'COD';
                                    }
                                }

                                $scope.infoVendor.TaxRateDefault = store.PurchaseTaxDefault;
                                if (store.ConfigurationStoreID !== null && store !== undefined) {
                                    if ($scope.cart.list_selected.length > 0) {
                                        for (var i in $scope.cart.list_selected) {
                                            if (store.PurchaseTaxDefault !== null) {
                                                $scope.cart.list_selected[i].thue = store.PurchaseTaxDefault;
                                            }
                                            if (store.PurchasePricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                                $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].SalePrice.toString());
                                            } else {
                                                if (store.PurchasePricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                                    $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                                }
                                                if (store.PurchasePricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                                    $scope.cart.list_selected[i].UnitPrice = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                                }
                                            }

                                            $scope.update($scope.cart.list_selected[i].stt);
                                        }
                                    }
                                }

                            }, function (error) {
                                console.log('pricePolicy2');
                            });
                        }, function (error) {
                            console.log('vendorCategory');
                        });
                    }
                }
            }, function (error) {
                console.log('getInfoVendor');
            });


        }
        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                $scope.listVendor = result.data;
                $scope.InwardStock.DeliveryDate = new Date();
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.listObjectCategory = [];
        $scope.getObjectCategory = getObjectCategory;

        $scope.getVendorCode = getVendorCode;

        $scope.AddVendors = AddVendors;

        $scope.getPricePolicy = getPricePolicy;
        $scope.listPricePolicy = [];

        $scope.getPaymentSchedule = getPaymentSchedule;
        $scope.listPaymentSchedule = [];

        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {
                $scope.listPricePolicy = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function getPaymentSchedule() {
            apiService.get('api/paymentSchedule/getall', null, function (result) {
                $scope.listPaymentSchedule = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function getVendorCode() {
            apiService.get('api/vendor/getVendorCode', null, function (result) {
                $scope.vendors.ObjectCode = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function AddVendors() {
            if ($scope.frmAddVendors.$valid == true) {
                $scope.vendors.ApplyIncentives = Number($scope.vendors.ApplyIncentives);
                if ($scope.vendors.ApplyIncentives === 1 || $scope.vendors.ApplyIncentives === 3) {
                    $scope.vendors.PricePolicyDefault = null;
                    $scope.vendors.TaxRateDefault = null;
                    $scope.vendors.DiscountRateDefault = null;
                    $scope.vendors.PaymentMethodDefault = null;
                    $scope.vendors.PaymentScheduleDefault = null;
                } else {
                    if ($scope.vendors.ApplyIncentives === 2) {
                        $scope.vendors.PricePolicyDefault = $scope.vendors.PricePolicyDefault;
                        $scope.vendors.TaxRateDefault = $scope.vendors.TaxRateDefault;
                        $scope.vendors.DiscountRateDefault = $scope.vendors.DiscountRateDefault;
                        $scope.vendors.PaymentScheduleDefault = $scope.vendors.PaymentScheduleDefault;
                        $scope.vendors.PaymentMethodDefault = Number($scope.vendors.PaymentMethodDefault);
                    }
                }
                apiService.post('api/vendor/create', $scope.vendors,
                    function (result) {
                        notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                        $('#close').click();
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            } else {
                notificationService.displayWarning('Nhập đầy đủ các trường có dấu chấm đỏ');
            }
        }

        function getObjectCategory() {
            apiService.get('api/objectCategory/getallV', null, function (result) {

                $scope.listObjectCategory = result.data;
            }, function () {
                console.log('load items failed');
            });

            $scope.getVendorCode();
        }

        $scope.getObjectCategory();
        $scope.getPricePolicy();
        $scope.getPaymentSchedule();
        $scope.getVendor();
        $scope.getBranch();
        $scope.getCode();
        $scope.getItemOptionByBranch();
    }
})(angular.module('tiktak.inwardStock'));