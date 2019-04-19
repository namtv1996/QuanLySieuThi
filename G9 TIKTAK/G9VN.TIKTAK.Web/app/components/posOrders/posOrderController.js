(function (app) {
    app.controller('posOrderController', posOrderController);
    posOrderController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$compile'];

    function posOrderController($scope, apiService, notificationService, $ngBootbox, $compile) {
        $scope.chooseTab = chooseTab;
        $scope.tab = 0;
        $scope.dp = ['block', 'none', 'none', 'none', 'none', 'none'];
        $scope.dp2 = ['block', 'none', 'none', 'none', 'none', 'none'];
        $scope.lf = ['10px', '112px', '225px', '338px', '450px', '565px'];
        $scope.lf1 = ['10px', '112px', '225px', '338px', '450px', '565px'];
        $scope.stype = ['', '', '', '', '', ''];
        //lấy mẫu in
        $scope.selectForm = selectForm;
        $scope.formView = {};
        var stt = false;
        var luu = 0;
        $scope.showPromotion = showPromotion;
        function showPromotion(i) {
            if (i == 1) {
                $scope.dis = "none !important";
                $scope.dis1 = "block !important";
                $scope.getSalesPromotion();
            }
            if (i == 2) {
                $scope.dis = "block !important";
                $scope.dis1 = "none !important";
            }

        }
        function selectForm() {
            apiService.get('api/printedform/getByID/' + "b1094b8a-131e-49ea-88df-120d0ee26b16", null, function (result) {
                $scope.formView = result.data;
                document.getElementById("demo").innerHTML = $scope.formView.HtmlHeader + $scope.formView.HtmlBody;
                $compile(document.getElementById("demo"))($scope);
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.selectForm();
        function chooseTab(tb) {
            $scope.tab = tb;
            for (var i = 0; i < $scope.dp2.length; i++) {
                if (i == $scope.tab) {
                    $scope.dp2[i] = 'block';
                    $scope.stype[$scope.tab] = 'background:#fff ;border-top: 3px solid #2dc3e8;z-index: 6;';
                }
                else {
                    $scope.dp2[i] = 'none';
                    $scope.stype[i] = 'background: none;border-top: none;z-index: auto;';
                }
            }
            if ($scope.shoppingCart[$scope.tab].lsItem.length != 0) {
                TinhTong();
            }
            else {
                $scope.clear();
            }
        }

        $scope.discount_item_Click = discount_item_Click
        function discount_item_Click(stt) {
            if ($scope.shoppingCart[$scope.tab].lsItem[stt-1].display_discount === 'none') {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].display_discount = 'block';
                for (var i = 0; i < $scope.shoppingCart[$scope.tab].lsItem.length; i++) {
                    if (i !== stt - 1) {
                        $scope.shoppingCart[$scope.tab].lsItem[i].display_discount = 'none';
                    }
                }
            } else {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].display_discount = 'none';
            }
        }

        $scope.changeDiscount_txt = changeDiscount_txt;
        function changeDiscount_txt(stt) {
            if ($scope.shoppingCart[$scope.tab].lsItem[stt - 1].status_discount === false) {
                if (Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item)) > 100) {
                    $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item = '100';
                }
                if (Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item)) <= 0) {
                    $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item = '0';
                }
            } else {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item = Currency($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item);
            }
        }

        $scope.changeStatusDiscount = changeStatusDiscount;
        function changeStatusDiscount(stt) {
            if ($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item !== '' && $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item !== null && $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item !== '0') {
                if ($scope.shoppingCart[$scope.tab].lsItem[stt - 1].status_discount === false) {
                    $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item = Number(Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item)) * 100 / ($scope.shoppingCart[$scope.tab].lsItem[stt - 1].quan * Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price))));
                } else {
                    $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item = Currency((Number($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item) * $scope.shoppingCart[$scope.tab].lsItem[stt - 1].quan * Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price)) / 100).toFixed(2));
                }
            }
        }

        $scope.ApplyDiscount = ApplyDiscount;
        function ApplyDiscount(stt) {
            if ($scope.shoppingCart[$scope.tab].lsItem[stt - 1].status_discount === false) {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].chietkhau = Currency(Number($scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item) * $scope.shoppingCart[$scope.tab].lsItem[stt - 1].quan * Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price)) / 100);

            } else {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].chietkhau = $scope.shoppingCart[$scope.tab].lsItem[stt - 1].txt_discount_item;
            }

            $scope.TinhToan(stt);
            $scope.shoppingCart[$scope.tab].lsItem[stt - 1].display_discount = 'none';
        }

        //lấy thông tin chi nhánh+ lấy thông  tin hàng hóa theo chi nhánh
        $scope.account = {};
        $scope.getItems = getItems;
        $scope.listItems = [];
        function getItems() {
            apiService.get('api/account/users', null, function (result) {
                $scope.account = result.data;
                apiService.get('api/itemOption/AutoComplete?BranchID=' + $scope.account.BranchID, null, function (result1) {
                    $scope.listItems = result1.data;
                    for (var i in $scope.listItems) {
                        $scope.listItems[i].NameCut = $scope.limitChar($scope.listItems[i].Name, 10);
                    }
                });
            });
        }
        getItems();
        $scope.closeTab = function (tb) {
            $ngBootbox.confirm('Bạn muốn xóa đơn hàng này?').then(function () {
                $scope.clear();
                var max;
                for (var i = 0; i < $scope.dp.length; i++) {
                    if ($scope.dp[i] == 'block') {
                        max = i;
                    }
                }
                $scope.dp[tb] = 'none';
                if (tb == max) {
                    for (var i = 0; i < $scope.dp.length; i++) {
                        if ($scope.dp[i] == 'block') {
                            max = i;
                        }
                    }
                    $scope.chooseTab(max);
                }
                else {
                    var nonMax;
                    for (var i = tb; i < $scope.dp.length; i++) {
                        if ($scope.dp[i] == 'block') {
                            nonMax = i;
                            break;
                        }
                    }
                    $scope.chooseTab(nonMax);
                    var dem = -1;
                    for (var i = 0; i < $scope.dp.length; i++) {
                        if ($scope.dp[i] == 'block') {
                            dem++;
                            $scope.lf[i] = $scope.lf1[dem];
                        }
                    }
                }
            });
        }
        $scope.addTab = function () {
            for (var i = 0; i < $scope.dp.length; i++) {
                if ($scope.dp[i] == 'none') {
                    $scope.dp[i] = 'block';
                    $scope.chooseTab(i);
                    break;
                }
            }
            var dem = -1;
            for (var i = 0; i < $scope.dp.length; i++) {
                if ($scope.dp[i] == 'block') {
                    dem++;
                    $scope.lf[i] = $scope.lf1[dem];
                }
            }
        }
        $scope.itemOption = {
            Status: true
        }
        $scope.AddSaleOrders = AddSaleOrders;
        $scope.AddReceipt = AddReceipt;
        $scope.selectDebt = false;
        $scope.getItemCategory = getItemCategory;
        $scope.listItemCategory = [];
        $scope.getItemOptionByItemCategory = getItemOptionByItemCategory;
        $scope.saleOrders = {
            TotalAmountOC: 0,
            TotalVATAmountOC: 0,
            TotalDiscountAmountOC: 0,
            DiscountAmountOC: 0,
            VoucherType: 12,
            discount_default: 0
        };
        $scope.saleOrdersDetail = {};
        $scope.listCustomer1 = [];
        $scope.shoppingCart = [{
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        }, {
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        },
        {
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        }, {
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        }, {
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        }, {
            lsItem: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            },
            Employee: $scope.authentication.userName
        }]
        $scope.TienKhachDua = 0;
        $scope.TraLaiKhach = 0;
        $scope.TraLaiKhach_demo = 0;
        $scope.TongThanhToan = 0;
        $scope.getByID = getByID;
        $scope.clear = clear;
        $scope.TinhTong = TinhTong;
        $scope.TinhTong2 = TinhTong2;
        $scope.TinhToan = TinhToan;
        $scope.AddSaleOrdersDetail = AddSaleOrdersDetail;
        $scope.PrintDiv = PrintDiv;
        $scope.AddSaleOrders1 = AddSaleOrders1;
        $scope.ChooseVND = ChooseVND;
        $scope.Choose = Choose;
        $scope.check = true;
        var add = true;
        $scope.key = '';
        var items = {};
        $scope.TimKiem = TimKiem;
        $scope.search = search;
        $scope.searchText = '';
        $scope.ChooseCustomer = ChooseCustomer;
        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        $scope.limitChar = limitChar;
        function limitChar(str, limit) {
            var cutString = str.slice(0, limit);
            if (str.length >= limit) {
                str = cutString + '...';
            } else {
                str = cutString
            }
            return str;
        }
        //Dinh dang tien VND
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                }
                else {
                    if (arr[i + 1] >= '5') {
                        arr1[i] = arr[i] - -1;
                    }
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

        //Chon khach hang
        $scope.disAdvance = 'none';
        function ChooseCustomer(id) {
            for (var i in $scope.listCustomer1) {
                if ($scope.listCustomer1[i].ObjectID == id) {
                    $scope.disAdvance = 'block';
                    $scope.shoppingCart[$scope.tab].customer = $scope.listCustomer1[i];
                    $scope.searchText = $scope.shoppingCart[$scope.tab].customer.ObjectName;
                    $scope.shoppingCart[$scope.tab].customer.ObjectAddress = limitChar($scope.shoppingCart[$scope.tab].customer.ObjectAddress, 27);
                    $scope.shoppingCart[$scope.tab].customer.debt_demo = $scope.shoppingCart[$scope.tab].customer.Debt;
                    $scope.shoppingCart[$scope.tab].customer.debt = 0;
                    $scope.shoppingCart[$scope.tab].customer.selectDebt = false;
                    $scope.shoppingCart[$scope.tab].customer.displayDebt = 'none';

                    if ($scope.shoppingCart[$scope.tab].customer.ApplyIncentives === 2) {
                        apiService.get('api/pricePolicy/getbyid/' + $scope.listCustomer1[i].PricePolicyDefault, null, function (result) {
                            $scope.shoppingCart[$scope.tab].customer.PricePolicyDefaultName = result.data.PricePolicyName;

                        }, function (error) {
                            console.log(error.data);
                        });

                        apiService.get('api/paymentSchedule/getbyid/' + $scope.listCustomer1[i].PaymentScheduleDefault, null, function (result) {
                            $scope.shoppingCart[$scope.tab].customer.PaymentScheduleDefaultName = result.data.PaymentScheduleName;

                        }, function (error) {
                            console.log(error.data);
                        });

                        if ($scope.listCustomer1[i].PaymentMethodDefault === 1) {
                            $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Tiền mặt';
                        } else {
                            if ($scope.listCustomer1[i].PaymentMethodDefault === 2) {
                                $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Chuyển khoản';
                            }
                            if ($scope.listCustomer1[i].PaymentMethodDefault === 3) {
                                $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'COD';
                            }
                        }

                        if ($scope.shoppingCart[$scope.tab].lsItem.length > 0) {
                            for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                                if ($scope.shoppingCart[$scope.tab].customer.TaxRateDefault !== null) {
                                    $scope.shoppingCart[$scope.tab].lsItem[i].thue = $scope.shoppingCart[$scope.tab].customer.TaxRateDefault;
                                }

                                if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                    $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].saleprice;
                                } else {
                                    if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                        $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].WholesalePrice;
                                    }
                                    if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                        $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].PurchasePrice;
                                    }
                                }

                                $scope.TinhToan($scope.shoppingCart[$scope.tab].lsItem[i].stt);
                            }
                        }
                    }
                    else {
                        if ($scope.shoppingCart[$scope.tab].customer.ApplyIncentives === 1) {
                            var cus_Category = {};
                            apiService.get('api/objectCategory/getbyid/' + $scope.listCustomer1[i].ObjectCategoryID, null, function (result) {
                                cus_Category = result.data;
                                $scope.shoppingCart[$scope.tab].customer.DiscountRateDefault = cus_Category.DiscountRateDefault;
                                $scope.shoppingCart[$scope.tab].customer.TaxRateDefault = cus_Category.TaxRateDefault;

                                apiService.get('api/pricePolicy/getbyid/' + cus_Category.PricePolicyDefault, null, function (result) {
                                    $scope.shoppingCart[$scope.tab].customer.PricePolicyDefaultName = result.data.PricePolicyName;
                                    $scope.shoppingCart[$scope.tab].customer.PricePolicyDefault = result.data.PricePolicyID;
                                }, function (error) {
                                    console.log(error.data);
                                });

                                apiService.get('api/paymentSchedule/getbyid/' + cus_Category.PaymentScheduleDefault, null, function (result) {
                                    $scope.shoppingCart[$scope.tab].customer.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                                    $scope.shoppingCart[$scope.tab].customer.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                }, function (error) {
                                    console.log(error.data);
                                });

                                if (cus_Category.PaymentMethodDefault === 1) {
                                    $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Tiền mặt';
                                } else {
                                    if (cus_Category.PaymentMethodDefault === 2) {
                                        $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Chuyển khoản';
                                    }
                                    if (cus_Category.PaymentMethodDefault === 3) {
                                        $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'COD';
                                    }
                                }

                                if ($scope.shoppingCart[$scope.tab].lsItem.length > 0) {
                                    for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                                        if (cus_Category.TaxRateDefault !== null) {
                                            $scope.shoppingCart[$scope.tab].lsItem[i].thue = cus_Category.TaxRateDefault;
                                        }

                                        if (cus_Category.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                            $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].saleprice;
                                        } else {
                                            if (cus_Category.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                                $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].WholesalePrice;
                                            }
                                            if (cus_Category.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                                $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].PurchasePrice;
                                            }
                                        }

                                        $scope.TinhToan($scope.shoppingCart[$scope.tab].lsItem[i].stt);
                                    }
                                }
                            }, function (error) {
                                console.log(error.data);
                            });
                        }

                        if ($scope.shoppingCart[$scope.tab].customer.ApplyIncentives === 3 || $scope.shoppingCart[$scope.tab].customer.ApplyIncentives === 0 || $scope.shoppingCart[$scope.tab].customer.ApplyIncentives === null) {
                            var store = {};
                            apiService.get('api/account/store', null, function (result) {
                                apiService.get('api/configStore/getConfig?manageStoreID=' + result.data.ManageStoreID, null, function (result) {
                                    store = result.data;
                                    apiService.get('api/pricePolicy/getbyid/' + store.SalePricePolicyDefault, null, function (result) {
                                        $scope.shoppingCart[$scope.tab].customer.PricePolicyDefault = result.data.PricePolicyID;
                                        $scope.shoppingCart[$scope.tab].customer.PricePolicyDefaultName = result.data.PricePolicyName;
                                    }, function (error) {
                                        console.log('pricePolicy2');
                                    });

                                    apiService.get('api/paymentSchedule/getbyid/' + store.PaymentScheduleDefault, null, function (result) {
                                        $scope.shoppingCart[$scope.tab].customer.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                        $scope.shoppingCart[$scope.tab].customer.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                                    }, function (error) {
                                        console.log('paymentSchedule2');
                                    });

                                    if (store.PaymentMethodDefault === 1) {
                                        $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Tiền mặt';
                                    } else {
                                        if (store.PaymentMethodDefault === 2) {
                                            $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'Chuyển khoản';
                                        }
                                        if (store.PaymentMethodDefault === 3) {
                                            $scope.shoppingCart[$scope.tab].customer.PaymentMethodDefaultName = 'COD';
                                        }
                                    }

                                    $scope.shoppingCart[$scope.tab].customer.TaxRateDefault = store.SaleTaxDefault;

                                    if ($scope.shoppingCart[$scope.tab].lsItem.length > 0) {
                                        for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                                            if (store.SaleTaxDefault !== null) {
                                                $scope.shoppingCart[$scope.tab].lsItem[i].thue = store.SaleTaxDefault;
                                            }
                                            if (store.SalePricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                                $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].saleprice;
                                            } else {
                                                if (store.SalePricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                                    $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].WholesalePrice;
                                                }
                                                if (store.SalePricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                                    $scope.shoppingCart[$scope.tab].lsItem[i].unit_price = $scope.shoppingCart[$scope.tab].lsItem[i].PurchasePrice;
                                                }
                                            }

                                            $scope.TinhToan($scope.shoppingCart[$scope.tab].lsItem[i].stt);
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
                    $scope.listCustomer1 = [];
                    break;
                }
            }
        }
        $scope.DisplayDebt = DisplayDebt;
        function DisplayDebt() {
            if ($scope.searchText !== null && $scope.searchText !== "") {
                if ($scope.shoppingCart[$scope.tab].customer.displayDebt === 'block') {
                    $scope.shoppingCart[$scope.tab].customer.displayDebt = 'none';
                } else {
                    $scope.shoppingCart[$scope.tab].customer.displayDebt = 'block';
                }

            }
            else {
                $scope.shoppingCart[$scope.tab].customer.displayDebt = 'none';
            }
        }

        $scope.displayAdvance1 = 'none';
        $scope.AdvanceSettingClick = AdvanceSettingClick;
        function AdvanceSettingClick() {
            if ($scope.displayAdvance1 === 'none') { $scope.displayAdvance1 = 'block'; }
            else { $scope.displayAdvance1 = 'none'; }
        }
        //Tim kiem khach hhang
        function search() {
            $scope.disAdvance = 'none';
            //if ($scope.searchText != '') {
                apiService.get('api/Customer/search?key=' + $scope.searchText, null, function (result) {
                    $scope.listCustomer1 = result.data;
                }, function () {
                    console.log('load items failed');
                });
           // }
           // else {
           //     $scope.listCustomer1 = [];
            //    $scope.shoppingCart[$scope.tab].customer = {};
           // }
        }
        ////Tim kiem hang hoa
        function TimKiem() {
            if ($scope.key != '') {
                for (var i in $scope.listItems) {
                    $scope.listItems[i].NameCut = $scope.limitChar($scope.listItems[i].Name, 10);
                    if ($scope.key == $scope.listItems[i].Barcode || $scope.key == $scope.listItems[i].SKU) {
                        $scope.getByID($scope.listItems[i]);
                        $scope.key = '';
                    }
                }
            }
        }
        //Chon nhap tien mat
        function ChooseVND() {
            $scope.check = true;
            $scope.saleOrders.DiscountAmountOC = 0;
            TinhTong();
        }
        //Chon nhap %
        function Choose() {
            $scope.check = false;
            $scope.saleOrders.DiscountAmountOC = 0;
            TinhTong();
        }
        //Khoi tao lai gia tri ban dau cgo cac bien
        function clear() {
            $(".x1").prop("disabled", false);
            $("#pt1").prop("disabled", false);
            $("#pt2").prop("disabled", false);
            ckt = 0;
            ttclick = null;
            $scope.vnd = '';
            $scope.pt = '';
            $scope.saleOrders = {
                TotalAmountOC: 0,
                TotalVATAmountOC: 0,
                TotalDiscountAmountOC: 0,
                DiscountAmountOC: 0,
            };
            $scope.TongThanhToan = 0;
            $scope.TienKhachDua = 0;
            $scope.TraLaiKhach = 0;
            $scope.TraLaiKhach_demo = 0;
            $scope.shoppingCart[$scope.tab] = {
                lsItem: [],
                customer: {
                    ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                    ObjectName: 'Khách vãng lai'
                },
                Employee: $scope.authentication.userName
            }
            $scope.key = '';
            $scope.searchText = '';
            $scope.listCustomer1 = [];
            $scope.disAdvance = 'none';
            stt = false;
            $scope.listNew = [];
            $scope.listSalesPromotionNew = [];
        }
        //Tinh la so tien khi thay doi chiet khau hoac thue cua tung mat hang
        function TinhToan(stt) {
            if (Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price)) === undefined) {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price = '0';
            } else {
                $scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price = Currency(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price.toString()));
            }
            $scope.shoppingCart[$scope.tab].lsItem[stt - 1].thanhtien = (Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].unit_price)) * $scope.shoppingCart[$scope.tab].lsItem[stt - 1].quan
                - Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[stt - 1].chietkhau)));
            $scope.saleOrders.DiscountAmountOC = Number(ConvertNumber($scope.saleOrders.DiscountAmountOC));

            if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) == 0) {
                TinhTong();
            }
            else {
                TinhTong2();
            }
            $scope.TienTraLai();
            sttpromotion();
        }
        function TinhTong2() {
            if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) >= 0 || Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) <= 9) {
                if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) == 0) {
                    TinhTong();
                }
                else {
                    $scope.saleOrders.discount_default = 0;
                    if ($scope.searchText !== null && $scope.searchText !== '') {
                        $scope.saleOrders.discount_default = (($scope.shoppingCart[$scope.tab].customer.DiscountRateDefault) * $scope.saleOrders.TotalAmountOC) / 100;
                    }
                    if ($scope.check == false) {
                        if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) > 100) {
                            $scope.saleOrders.DiscountAmountOC = '100';
                        }
                        if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) <= 0) {
                            $scope.saleOrders.DiscountAmountOC = '0';
                        }
                        $scope.saleOrders.DiscountAmountOC = ($scope.saleOrders.TotalAmountOC * Number(ConvertNumber($scope.saleOrders.DiscountAmountOC))) / 100;
                    } else {
                        $scope.saleOrders.DiscountAmountOC = Currency($scope.saleOrders.DiscountAmountOC);
                    }
                    $scope.saleOrders.TotalDiscountAmountOC = 0;
                    $scope.saleOrders.TotalVATAmountOC = 0;
                    $scope.saleOrders.TotalAmountOC = 0;
                    for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                        $scope.saleOrders.TotalAmountOC = $scope.saleOrders.TotalAmountOC + $scope.shoppingCart[$scope.tab].lsItem[i].thanhtien;
                        $scope.saleOrders.TotalDiscountAmountOC = $scope.saleOrders.TotalDiscountAmountOC - - Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[i].chietkhau));
                    }
                    $scope.saleOrders.TotalDiscountAmountOC = $scope.saleOrders.TotalDiscountAmountOC - - Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) + $scope.saleOrders.discount_default;
                    for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                        var x = ($scope.shoppingCart[$scope.tab].lsItem[i].thanhtien / $scope.saleOrders.TotalAmountOC) * Number(ConvertNumber($scope.saleOrders.DiscountAmountOC));
                        $scope.saleOrders.TotalVATAmountOC = $scope.saleOrders.TotalVATAmountOC - -($scope.shoppingCart[$scope.tab].lsItem[i].thanhtien - x) * ($scope.shoppingCart[$scope.tab].lsItem[i].thue / 100);
                    }
                    $scope.TongThanhToan = $scope.saleOrders.TotalAmountOC + $scope.saleOrders.TotalVATAmountOC - Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) - $scope.saleOrders.discount_default;
                    $scope.TienKhachDua = Currency($scope.TongThanhToan);
                    if ($scope.check == false) {
                        $scope.saleOrders.DiscountAmountOC = (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) / $scope.saleOrders.TotalAmountOC) * 100;
                    }
                }
            }
            else {
                $scope.saleOrders.DiscountAmountOC = 0
            }
            stt = false;
            ckt =$scope.saleOrders.TotalDiscountAmountOC;
        }
        function TinhTong() {
            $scope.saleOrders.discount_default = 0;
            $scope.saleOrders.TotalAmountOC = 0;
            $scope.saleOrders.TotalVATAmountOC = 0;
            $scope.saleOrders.TotalDiscountAmountOC = 0;
            for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                $scope.saleOrders.TotalAmountOC = $scope.saleOrders.TotalAmountOC + $scope.shoppingCart[$scope.tab].lsItem[i].thanhtien;
                $scope.saleOrders.TotalVATAmountOC = $scope.saleOrders.TotalVATAmountOC + ($scope.shoppingCart[$scope.tab].lsItem[i].thanhtien * $scope.shoppingCart[$scope.tab].lsItem[i].thue) / 100;
                $scope.saleOrders.TotalDiscountAmountOC = $scope.saleOrders.TotalDiscountAmountOC - -Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[i].chietkhau));
            }
            if ($scope.searchText !== null && $scope.searchText !== '') {
                $scope.saleOrders.discount_default = (($scope.shoppingCart[$scope.tab].customer.DiscountRateDefault) * $scope.saleOrders.TotalAmountOC) / 100;
            }
            if ($scope.check == false) {
                $scope.saleOrders.DiscountAmountOC = ($scope.saleOrders.TotalAmountOC * Number(ConvertNumber($scope.saleOrders.DiscountAmountOC))) / 100;
            }
            $scope.TongThanhToan = $scope.saleOrders.TotalAmountOC - -$scope.saleOrders.TotalVATAmountOC - Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) - $scope.saleOrders.discount_default;
            $scope.saleOrders.TotalDiscountAmountOC = $scope.saleOrders.TotalDiscountAmountOC - - Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) + $scope.saleOrders.discount_default;
            $scope.TienKhachDua = Currency($scope.TongThanhToan);
            stt = false;                       
        }
        //Tinh tien tra cho khach
        $scope.TienTraLai = function () {
            var temp = new String($scope.TienKhachDua);        
            if (temp[temp.length - 1] >= 0 || temp[temp.length - 1] <= 9) {
                $scope.TienKhachDua = Currency(ConvertNumber($scope.TienKhachDua));
                $scope.TraLaiKhach = Number(ConvertNumber($scope.TienKhachDua)) - Number($scope.TongThanhToan);
                $scope.TraLaiKhach_demo = $scope.TraLaiKhach;                
            }
            else {
                $scope.TienKhachDua = 0;
                $scope.TraLaiKhach = 0;
                $scope.TraLaiKhach_demo = $scope.TraLaiKhach;
            }
        }
        $scope.UpdateDebt = UpdateDebt;
        function UpdateDebt() {
            if ($scope.shoppingCart[$scope.tab].customer.selectDebt === true) {
                $scope.shoppingCart[$scope.tab].customer.debt_demo = $scope.shoppingCart[$scope.tab].customer.debt_demo - ConvertNumber($scope.TraLaiKhach_demo);
                $scope.TraLaiKhach_demo = $scope.TraLaiKhach_demo - $scope.shoppingCart[$scope.tab].customer.Debt;
                if ($scope.TraLaiKhach_demo <= 0) {
                    $scope.TraLaiKhach_demo = 0;
                    $scope.shoppingCart[$scope.tab].customer.debt = $scope.TraLaiKhach;
                } else {
                    $scope.shoppingCart[$scope.tab].customer.debt_demo = 0;
                    $scope.shoppingCart[$scope.tab].customer.debt = $scope.shoppingCart[$scope.tab].customer.Debt;
                }
            } else {
                $scope.shoppingCart[$scope.tab].customer.debt_demo = $scope.shoppingCart[$scope.tab].customer.Debt;
                $scope.TraLaiKhach_demo = $scope.TraLaiKhach;
            }
        }
        //Chon hang hoa cho don hang
        function getByID(option) {
            // apiService.get('api/positem/getbyid/' + id, null, function (result) {
            if (option.quantity <= 0) {
                notificationService.displayWarning("Sản phẩm tạm thời hết hàng!");
            }
            else {
                var item = option;
                if ($scope.shoppingCart[$scope.tab].lsItem.length == 0) {
                    item.quan = 1;
                    item.stt = 1;
                    item.display_discount = "none";
                    item.txt_discount_item = '0';
                    item.status_discount = true;
                    item.chietkhau = 0;
                    item.thue = 0;
                    item.unit_price = item.saleprice;
                    if ($scope.searchText !== null && $scope.searchText !== '') {
                        if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                            item.unit_price = item.saleprice;
                        } else {
                            if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                item.unit_price = item.WholesalePrice;
                            }
                            if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                item.unit_price = item.PurchasePrice;
                            }
                        }
                        item.thue = $scope.shoppingCart[$scope.tab].customer.TaxRateDefault;
                    }
                    item.unit_price = Currency(ConvertNumber(item.unit_price));
                    item.thanhtien = (Number(ConvertNumber(item.unit_price)) * item.quan - item.chietkhau);                   
                    $scope.shoppingCart[$scope.tab].lsItem.push(item);
                }
                else {
                    var pos = -1;
                    var STT = 1;
                    for (var i in $scope.shoppingCart[$scope.tab].lsItem) {
                        if ($scope.shoppingCart[$scope.tab].lsItem[i].ID == item.ID) {
                            pos = i;
                        }
                        STT++;
                    }
                    if (pos == -1) {
                        item.quan = 1;
                        item.stt = STT;
                        item.display_discount = "none";
                        item.status_discount = true;
                        item.txt_discount_item = '0';
                        item.chietkhau = 0;
                        item.thue = 0;
                        item.unit_price = item.saleprice;
                        if ($scope.searchText !== null && $scope.searchText !== '') {
                            if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                item.unit_price = item.saleprice;
                            } else {
                                if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                    item.unit_price = item.WholesalePrice;
                                }
                                if ($scope.shoppingCart[$scope.tab].customer.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                    item.unit_price = item.PurchasePrice;
                                }
                            }
                            item.thue = $scope.shoppingCart[$scope.tab].customer.TaxRateDefault;
                        }
                        item.unit_price = Currency(ConvertNumber(item.unit_price));
                        item.thanhtien = (Number(ConvertNumber(item.unit_price)) * item.quan - item.chietkhau);       
                        $scope.shoppingCart[$scope.tab].lsItem.push(item);
                    }
                    else {
                        $scope.shoppingCart[$scope.tab].lsItem[pos].quan++;
                        $scope.shoppingCart[$scope.tab].lsItem[pos].thanhtien = (Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[pos].unit_price)) * $scope.shoppingCart[$scope.tab].lsItem[pos].quan
                            - $scope.shoppingCart[$scope.tab].lsItem[pos].chietkhau);
                    }
                }
                $scope.saleOrders.DiscountAmountOC = Number(ConvertNumber($scope.saleOrders.DiscountAmountOC));
                if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) === 0) {
                    $scope.TinhTong();
                } else {
                    $scope.TinhTong2();
                }
               
                $scope.TienTraLai();
                stt = false;
            }
            //}, function (error) {
            //    notificationService.displayError(error.data);
            //});
        }
        //function getItems() {
        //    apiService.get('api/positem/getall', null, function (result) {
        //        $scope.listItems = result.data;
        //        for (var i in result.data) {
        //            $scope.listItems[i].NameCut = $scope.limitChar($scope.listItems[i].Name, 10);
        //        }
        //    }, function () {
        //        console.log('load items failed');
        //    });
        //}
        function AddSaleOrdersDetail(i, item) {
            if (i < $scope.shoppingCart[$scope.tab].lsItem.length) {
                $scope.saleOrdersDetail.VoucherID = item.VoucherID;
                $scope.saleOrdersDetail.ItemID = $scope.shoppingCart[$scope.tab].lsItem[i].ID;
                $scope.saleOrdersDetail.Quantity = $scope.shoppingCart[$scope.tab].lsItem[i].quan;
                $scope.saleOrdersDetail.QuantityConvert = $scope.saleOrdersDetail.Quantity;
                $scope.saleOrdersDetail.UnitPriceOC = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[i].unit_price));
                $scope.saleOrdersDetail.UnitPrice = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.UnitPriceConvertOC = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.UnitPriceConvert = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.AmountOC = $scope.shoppingCart[$scope.tab].lsItem[i].thanhtien;
                $scope.saleOrdersDetail.Amount = $scope.saleOrdersDetail.AmountOC;
                $scope.saleOrdersDetail.DiscountReason = $scope.shoppingCart[$scope.tab].lsItem[i].DiscountReason;
                $scope.saleOrdersDetail.DiscountAmountOC = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[i].chietkhau));
                $scope.saleOrdersDetail.DiscountAmount = $scope.saleOrdersDetail.DiscountAmountOC;
                $scope.saleOrdersDetail.DiscountRate = ($scope.saleOrdersDetail.DiscountAmountOC / ($scope.saleOrdersDetail.Quantity * $scope.saleOrdersDetail.UnitPrice)) * 100;
                $scope.saleOrdersDetail.VATRate = $scope.shoppingCart[$scope.tab].lsItem[i].thue;
                $scope.saleOrdersDetail.VATAmountOC = $scope.saleOrdersDetail.AmountOC * $scope.saleOrdersDetail.VATRate / 100;
                $scope.saleOrdersDetail.VATAmount = $scope.saleOrdersDetail.VATAmountOC;
                $scope.saleOrdersDetail.OutwardPrice = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.OutwardAmount = $scope.saleOrdersDetail.AmountOC;
                $scope.saleOrdersDetail.SpecialConsumeTaxRate = 0;
                $scope.saleOrdersDetail.SpecialConsumeTaxAmountOC = 0;
                $scope.saleOrdersDetail.SpecialConsumeTaxAmount = 0;
                $scope.saleOrdersDetail.SpecialConsumeUnitPriceOC = 0;
                $scope.saleOrdersDetail.SpecialConsumeUnitPrice = 0;
                $scope.saleOrdersDetail.ConvertRate = 0;
                $scope.saleOrdersDetail.UnitPriceAfterTaxOC = 0;
                $scope.saleOrdersDetail.UnitPriceAfterTax = 0;
                $scope.saleOrdersDetail.AmountAfterTaxOC = 0;
                $scope.saleOrdersDetail.AmountAfterTax = 0;
                $scope.saleOrdersDetail.DiscountAmountAfterTax = 0;
                $scope.saleOrdersDetail.DiscountAmountAfterTaxOC = 0;
                $scope.saleOrdersDetail.OutwardPriceConvert = 0;
                apiService.post('api/saleOrderDetail/create', $scope.saleOrdersDetail,
                    function (result) {
                        apiService.get('api/positem/getbyid/' + $scope.saleOrdersDetail.ItemID, null, function (result) {
                            $scope.itemOption = result.data;
                            $scope.itemOption.ClosingQuantity = $scope.itemOption.ClosingQuantity - $scope.shoppingCart[$scope.tab].lsItem[i].quan;
                            //update tồn kho của tùy chọn (stock)
                            $scope.stock = {
                                StockID: '00000000-0000-0000-0000-000000000000',
                                ItemOptionID: $scope.shoppingCart[$scope.tab].lsItem[i].ID,
                                BranchID: $scope.account.BranchID,
                                Quantity: $scope.shoppingCart[$scope.tab].lsItem[i].quan,
                                InitialInventory: 0

                            }
                            apiService.put('api/stock/update', $scope.stock, function (result) {

                            });
                            apiService.put('api/positem/update', $scope.itemOption, function (result) {
                                AddSaleOrdersDetail(i + 1, item);
                            }, function (error) {
                                notificationService.displayError(error.data);
                            });
                        }, function (error) {
                            notificationService.displayError(error.data);
                        });
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Đơn hàng đã được thêm mới.');
                $scope.saleOrders.VoucherID = item.VoucherID;
                $scope.saleOrders.VoucherDate = item.VoucherDate;
                var param = {
                    BranchID: $scope.saleOrders.BranchID,
                    voucherID: $scope.saleOrders.VoucherID
                }
                apiService.put('api/stock/updateClosingQuantityStockCombo', param);
                //load lại hàng hóa
                apiService.get('api/itemOption/AutoComplete?BranchID=' + $scope.account.BranchID, null, function (result1) {
                    $scope.listItems = result1.data;
                    for (var i in $scope.listItems) {
                        $scope.listItems[i].NameCut = $scope.limitChar($scope.listItems[i].Name, 10);
                    }
                });
                $scope.clear();
            }
        }
        function AddSaleOrders() {
            var a = 0;
            for (i in $scope.shoppingCart[$scope.tab].lsItem) {
                if ($scope.shoppingCart[$scope.tab].lsItem[i].quan > $scope.shoppingCart[$scope.tab].lsItem[i].quantity) {
                    a = 0;
                    break;
                }
                else {
                    a = 1;
                }
            }
            if (a == 1) {
                if ($scope.shoppingCart[$scope.tab].lsItem != []) {

                    if ($scope.check == false) {
                        $scope.saleOrders.DiscountAmountOC = (($scope.saleOrders.TotalAmountOC * Number(ConvertNumber($scope.saleOrders.DiscountAmountOC))) / 100) + $scope.saleOrders.discount_default;
                    }
                    if (Number(ConvertNumber($scope.TienKhachDua)) >= Number(ConvertNumber($scope.TongThanhToan))) {
                        $scope.saleOrders.StatusID = 1;
                    } else {
                        if (Number(ConvertNumber($scope.TienKhachDua)) < Number(ConvertNumber($scope.TongThanhToan))) {
                            $scope.saleOrders.StatusID = 15;
                            $scope.saleOrders.Debt = true;
                        }
                    }
                    $scope.saleOrders.IsShowUnitConvert = true;
                    $scope.saleOrders.IsAttachList = true;
                    $scope.saleOrders.CommisionAmount = 0;
                    $scope.saleOrders.CommisionAmountOC = 0;
                    $scope.saleOrders.SortOrder = 0;
                    $scope.saleOrders.ShippingAmount = 0;
                    $scope.saleOrders.VoucherType = 12;
                    $scope.saleOrders.VoucherDate = new Date();
                    $scope.saleOrders.BranchID = $scope.account.BranchID;
                    $scope.saleOrders.IsPosted = true;
                    $scope.saleOrders.TotalOutwardAmount = 0;
                    $scope.saleOrders.TotalVATAmount = $scope.saleOrders.TotalVATAmountOC;
                    $scope.saleOrders.TotalDiscountAmount = $scope.saleOrders.TotalDiscountAmountOC;
                    $scope.saleOrders.TotalAmount = $scope.saleOrders.TotalAmountOC;
                    $scope.saleOrders.DiscountAmountOC = Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) + $scope.saleOrders.discount_default;
                    $scope.saleOrders.DiscountAmount = $scope.saleOrders.DiscountAmountOC;
                    $scope.saleOrders.DiscountRate = (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) / $scope.saleOrders.TotalAmountOC) * 100;
                    $scope.saleOrders.ObjectID = $scope.shoppingCart[$scope.tab].customer.ObjectID;
                    $scope.saleOrders.Employee = $scope.shoppingCart[$scope.tab].Employee;
                    $scope.saleOrders.PromotionID = ID;
                  
                    if (ID !== null) {
                        apiService.put('api/salespromotion/UpdateInventory?ID=' + ID);
                        //"api/attributedetail/deleteAttributeDetail?id="
                    }
                    if ($scope.searchText !== null && $scope.searchText !== "") {
                        apiService.post('api/saleOrder/create', $scope.saleOrders,
                            function (result) {

                                var sale = {};
                                sale = result.data;
                                if ($scope.searchText !== null && $scope.searchText !== "") {
                                    if (($scope.shoppingCart[$scope.tab].customer.selectDebt === true) && (ConvertNumber($scope.TienKhachDua) > $scope.TongThanhToan)) {
                                        apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null,
                                            function (result) {

                                                $scope.AddReceipt(ConvertNumber($scope.TongThanhToan), sale.VoucherNo);

                                                var ctm = {};
                                                ctm = result.data;

                                                ctm.Debt = $scope.shoppingCart[$scope.tab].customer.debt_demo;

                                                apiService.put('api/Customer/update', ctm,
                                                    function (result) {
                                                        console.log("Đã tăng công nợ");
                                                    }, function (error) {
                                                        console.log("");
                                                    }
                                                );
                                            }, function (error) {
                                                console.log("Éo tăng được công nợ");
                                            }
                                        );
                                    }
                                    if ((ConvertNumber($scope.TienKhachDua) <= $scope.TongThanhToan) && ($scope.shoppingCart[$scope.tab].customer.selectDebt === false)) {
                                        apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null,
                                            function (result) {
                                                $scope.AddReceipt(ConvertNumber($scope.TienKhachDua), sale.VoucherNo);
                                                var ctm = {};
                                                ctm = result.data;

                                                ctm.Debt = ctm.Debt - $scope.TraLaiKhach;

                                                apiService.put('api/Customer/update', ctm,
                                                    function (result) {
                                                        console.log("Đã tăng công nợ");
                                                    }, function (error) {
                                                        console.log("");
                                                    }
                                                );

                                            }, function (error) {
                                                console.log("Éo tăng được công nợ");
                                            }
                                        );
                                    }
                                    if ((ConvertNumber($scope.TienKhachDua) > $scope.TongThanhToan) && ($scope.shoppingCart[$scope.tab].customer.selectDebt === false)) {
                                        $scope.AddReceipt(ConvertNumber($scope.TongThanhToan), sale.VoucherNo);
                                    }
                                    if ((ConvertNumber($scope.TienKhachDua) <= $scope.TongThanhToan) && ($scope.shoppingCart[$scope.tab].customer.selectDebt === true)) {
                                        apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null,
                                            function (result) {
                                                $scope.AddReceipt(ConvertNumber($scope.TienKhachDua), sale.VoucherNo);
                                                var ctm = {};
                                                ctm = result.data;

                                                ctm.Debt = ctm.Debt - $scope.shoppingCart[$scope.tab].customer.debt_demo;

                                                apiService.put('api/Customer/update', ctm,
                                                    function (result) {
                                                        console.log("Đã tăng công nợ");
                                                    }, function (error) {
                                                        console.log("");
                                                    }
                                                );

                                            }, function (error) {
                                                console.log("Éo tăng được công nợ");
                                            }
                                        );
                                    }
                                    AddSaleOrdersDetail(0, result.data);
                                    $scope.date = result.data.VoucherDate.substring(0, 10);
                                }


                            }, function (error) {
                                notificationService.displayError('Thêm mới không thành công.');
                            });
                    } else {
                        if (ConvertNumber($scope.TienKhachDua) >= $scope.TongThanhToan) {
                            apiService.post('api/saleOrder/create', $scope.saleOrders,
                                function (result) {

                                    var sale = {};
                                    sale = result.data;

                                    $scope.AddReceipt(ConvertNumber($scope.TongThanhToan), sale.VoucherNo);
                                    AddSaleOrdersDetail(0, result.data);
                                    $scope.date = result.data.VoucherDate.substring(0, 10);
                                }, function (error) {
                                    notificationService.displayError('Thêm mới không thành công.');
                                });
                        } else {
                            notificationService.displayWarning('Khách hàng phát sinh công nợ. Cần cập nhật thông tin khách hàng !!');
                        }
                    }
                }
            } else {
                notificationService.displayWarning('Số lượng ' + $scope.shoppingCart[$scope.tab].lsItem[i].Name + ' bán ra lớn hơn số lượng hàng tồn trong kho vui lòng nhập hàng thêm để bán !!');
            }
        }
        function AddReceipt(amount, voucherno) {
            if (amount > 0) {
                var receipt = {};
                receipt.ObjectID = $scope.saleOrders.ObjectID;
                receipt.BranchID = $scope.saleOrders.BranchID;
                receipt.OriginalVoucherNo = voucherno;
                receipt.VoucherType = 20;
                receipt.StatusID = 0;
                receipt.VoucherDate = new Date();
                receipt.TotalAmount = amount;
                receipt.TotalAmountOC = amount;
                receipt.Description = 'Phiếu thu tiền tự động tạo từ đơn hàng ' + voucherno;
                apiService.post('api/saleOrder/create_receipt', receipt,
                    function (result) {
                        if (($scope.shoppingCart[$scope.tab].customer.selectDebt === true) && (ConvertNumber($scope.TienKhachDua) > $scope.TongThanhToan)) {
                            var receiptDebt = {};
                            receiptDebt.ObjectID = $scope.saleOrders.ObjectID;
                            receiptDebt.OriginalVoucherNo = 'Công nợ khách hàng';
                            receiptDebt.VoucherType = 23;
                            receiptDebt.StatusID = 0;
                            receiptDebt.VoucherDate = new Date();
                            receiptDebt.TotalAmount = $scope.shoppingCart[$scope.tab].customer.debt;
                            receiptDebt.TotalAmountOC = $scope.shoppingCart[$scope.tab].customer.debt;
                            receiptDebt.Description = 'Phiếu thu tiền công nợ của khách hàng được tự động tạo từ đơn hàng ' + voucherno;
                            apiService.post('api/saleOrder/create_receipt', receiptDebt,
                                function (result) {
                                    //notificationService.displaySuccess('Phiếu thu công nợ khách hàng đã được tạo.');
                                }, function (error) {
                                }
                            );
                        }
                        // notificationService.displaySuccess('Phiếu thu cho đơn hàng đã được tạo.');
                        if (add == true) {
                            $scope.PrintDiv();
                        }
                        add = true;
                    }, function (error) {
                        console.log("éo tạo đk phiếu thu");
                    }
                );
            } else {
                notificationService.displayWarning('Số tiền phải lớn hơn 0đ');
            }
        }
        function AddSaleOrders1() {
            add = false;
            $scope.AddSaleOrders();
        }
        // gọi sự kiện in
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
            add = true;
            return false;
        }
        $scope.printElement = function (elem) {
            var domClone = elem.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
        }
        $scope.del = function (stt) {
            $scope.listSalesPromotionNew = [];
            stt = false;
            $scope.shoppingCart[$scope.tab].lsItem.splice(stt - 1, 1);
            for (var i = 0; i < $scope.shoppingCart[$scope.tab].lsItem.length; i++) {
                $scope.shoppingCart[$scope.tab].lsItem[i].stt = i + 1;
                $scope.shoppingCart[$scope.tab].lsItem[i].display_discount = 'none';
            }
            if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) == 0) {
                TinhTong();
            }
            else {
                if (Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)) > $scope.TongThanhToan)
                    $scope.saleOrders.DiscountAmountOC = 0;
                TinhTong2();
            }
           
        }
        function getItemCategory() {
            apiService.get('api/itemCategory/getall', null, function (result) {
                $scope.listItemCategory = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        function getItemOptionByItemCategory(id) {
            apiService.get('api/itemOption/getbyitemcategoryid/' + id, null, function (result) {

                $scope.listItems = result.data;
                for (var i in result.data) {
                    $scope.listItems[i].NameCut = $scope.limitChar($scope.listItems[i].Name, 10);
                    $scope.listItems[i].saleprice = $scope.listItems[i].SalePrice;
                    $scope.listItems[i].image1 = $scope.listItems[i].Image1;
                    $scope.listItems[i].quantity = $scope.listItems[i].ClosingQuantity;
                }
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.customers = {
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: 2,
            Tel: null,
            Email: null,
            Debt: 0,
            AccumulativePoint: 0,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            CaringStaff: null,
            Sex: null,
            Description: null
        }
        $scope.listObjectCategory = [];
        $scope.getObjectCategory = getObjectCategory;
        $scope.getEmployee = getEmployee;
        $scope.getcustomer = getcustomer;
        $scope.AddCustomers = AddCustomers;
        $scope.mediate = '';
        function getcustomer() {
            apiService.get('api/Customer/getall', null, function (result) {

                $scope.listCustomer = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function AddCustomers() {
            if ($scope.frmAddCustomer.$valid == true) {
                console.log("da");
                apiService.post('api/Customer/create', $scope.customers,
                    function (result) {
                        notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displayWarning('Nhập đầy đủ các trương có dấu chấm đỏ');
            }
        }
        function getObjectCategory() {
            apiService.get('api/posObjectCategory/getall', null, function (result) {

                $scope.listObjectCategory = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        function getEmployee() {
            apiService.get('api/employee/getall', null, function (result) {

                $scope.listGetEmployee = result.data;
            }, function () {
                console.log('load items failed');
            });
            apiService.get('api/Customer/getCustomerCode', null, function (result) {
                $scope.customers.ObjectCode = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.sttpromotion = sttpromotion;
        function sttpromotion() {
            stt = false;
        }
        $scope.getSalesPromotion = getSalesPromotion;
        $scope.CalculatePromotion = CalculatePromotion;
        $scope.listSalesPromotion = [];
        $scope.listSalesPromotionDetail = [];
        var today = new Date();
        function getSalesPromotion() {
            if (stt == false) {
                apiService.get('api/salespromotiondetail/getall', null, function (result) {
                    $scope.listSalesPromotionDetail = result.data;
                    $scope.listSalesPromotionNew = [];
                    $scope.listNew = [];
                    for (i in $scope.listSalesPromotionDetail) {
                        if ($scope.listSalesPromotionDetail[i].PromotionType == 0) {
                            if ($scope.listSalesPromotionDetail[i].ConditionsMin <= $scope.TongThanhToan && $scope.TongThanhToan <= $scope.listSalesPromotionDetail[i].ConditionsMax) {
                                $scope.listSalesPromotionNew.push($scope.listSalesPromotionDetail[i]);
                            } else {
                                $scope.disPr = 'none !impo rtant';
                                $scope.disPr1 = 'block !important';
                            }
                        } else {
                            for (j in $scope.shoppingCart[$scope.tab].lsItem) {
                                if ($scope.listSalesPromotionDetail[i].ItemID == $scope.shoppingCart[$scope.tab].lsItem[j].ID && $scope.listSalesPromotionDetail[i].QuantityItem <= $scope.shoppingCart[$scope.tab].lsItem[j].quan) {
                                    $scope.listSalesPromotionNew.push($scope.listSalesPromotionDetail[i]);
                                }
                            }
                        }


                    }
                    apiService.get('api/salespromotion/getall/', null, function (result) {
                        $scope.listSalesPromotion = result.data;
                        var ix = 0;
                        var CreateDate;
                        for (k in $scope.listSalesPromotionNew) {
                            for (l in $scope.listSalesPromotion) {
                                CreateDate = new Date($scope.listSalesPromotion[l].CreateDate)
                                if ($scope.listSalesPromotionNew[k].VoucherID == $scope.listSalesPromotion[l].VoucherID && $scope.listSalesPromotion[l].Status == true && $scope.listSalesPromotion[l].ApplyQuantity > 0 && today >= CreateDate) {
                                    $scope.listNew[ix] = {};
                                    $scope.listNew[ix].ApplyQuantity = $scope.listSalesPromotion[l].ApplyQuantity;
                                    $scope.listNew[ix].BranchID = $scope.listSalesPromotion[l].BranchID;
                                    $scope.listNew[ix].CreateDate = $scope.listSalesPromotion[l].CreateDate;
                                    $scope.listNew[ix].Description = $scope.listSalesPromotion[l].Description;
                                    $scope.listNew[ix].Expirydate = $scope.listSalesPromotion[l].Expirydate;
                                    $scope.listNew[ix].PromotionName = $scope.listSalesPromotion[l].PromotionName;
                                    $scope.listNew[ix].PromotionValue = $scope.listSalesPromotionNew[k].PromotionValue;
                                    $scope.listNew[ix].Object = $scope.listSalesPromotion[l].Object;
                                    $scope.listNew[ix].Status = $scope.listSalesPromotion[l].Status;
                                    $scope.listNew[ix].VoucherDate = $scope.listSalesPromotion[l].VoucherDate;
                                    $scope.listNew[ix].VoucherID = $scope.listSalesPromotion[l].VoucherID;
                                    $scope.listNew[ix].VoucherNo = $scope.listSalesPromotion[l].VoucherNo;
                                    $scope.listNew[ix].VoucherTypeDetail = $scope.listSalesPromotionNew[k].VoucherType;
                                    $scope.listNew[ix].VoucherType = $scope.listSalesPromotion[l].VoucherType;
                                    if ($scope.listSalesPromotion[l].VoucherType == 0) {
                                        $scope.listNew[ix].VoucherType1 = 'CK Σ đơn hàng';
                                    } else {
                                        $scope.listNew[ix].VoucherType1 = 'CK từng hàng hóa';
                                    }
                                    ix++;
                                }
                            }
                        }
                        if ($scope.listNew.length >= 1) {
                            for (var r = 0; r < $scope.listNew.length; r++) {
                                for (var t = r + 1; t < $scope.listNew.length; t++)
                                    if ($scope.listNew[r].VoucherID == $scope.listNew[t].VoucherID) {
                                        $scope.listNew.splice(t, 1)
                                    }
                            }
                        }
                        if ($scope.listNew.length !== 0) {
                            $scope.disPr = 'block !important';
                            $scope.disPr1 = 'none !important';
                        }
                        stt = true;
                        luu = parseInt(Number(ConvertNumber($scope.saleOrders.DiscountAmountOC)));
                    });

                }, function (error) {
                    console.log('load items failed');
                });
            }
        }
        var tam = false;
        var ID = null;
        var ttclick = null;
        var ckt =0;
        
        //Tông tiên từ đơn saleOrders.TotalAmountOC
        //list shoppingcar $scope.shoppingCart[$scope.tab].lsItem
        //TongThanhToan tong trien khách cần thanh toán
        function CalculatePromotion(e, t, v, id, p) {
            $scope.saleOrders.TotalDiscountAmountOC=ckt;
            ID = id;
            $(".x1").prop("disabled", true);
            $("#pt1").prop("disabled", true);
            $("#pt2").prop("disabled", true);
            if ($scope.check == true) {
                $scope.vnd = ''; $scope.pt = 'none';
            } else {
                $scope.vnd = 'none'; $scope.pt = '';
            }
            if (ttclick !== id) {
                var TongTien = 0;
                var tt = 0;
                var TCK = 0; //tong cong ck có cả ck thêm
                var tck = 0;//tieng ck dã dk tính
                var ttck = 0; //tổng tiền chiết khấu

                for (w in $scope.shoppingCart[$scope.tab].lsItem) {
                    $scope.shoppingCart[$scope.tab].lsItem[w].chietkhau = 0;
                    $scope.shoppingCart[$scope.tab].lsItem[w].thanhtien = $scope.shoppingCart[$scope.tab].lsItem[w].quan * Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[w].unit_price));
                    TongTien += $scope.shoppingCart[$scope.tab].lsItem[w].thanhtien;
                }
                $scope.saleOrders.TotalAmountOC = TongTien;
                $scope.TongThanhToan = TongTien;
                if (p == 0) {
                    if (e !== null) {
                        dateend = new Date(e);
                        if (dateend < today) {
                            notificationService.displayWarning('Khuyến mại hết hạn');
                        } else {
                            if (t == true) {
                                TCK = Number($scope.saleOrders.TotalDiscountAmountOC) + v;
                                tck = ($scope.saleOrders.TotalAmountOC * TCK) / 100;
                                $scope.TongThanhToan -= tck;
                                $scope.saleOrders.TotalDiscountAmountOC = tck;
                                $scope.TienKhachDua = $scope.TongThanhToan;
                            } else {
                                TCK = Number($scope.saleOrders.TotalDiscountAmountOC) + v;
                                tck = TCK;
                                $scope.TongThanhToan -= tck;
                                $scope.saleOrders.TotalDiscountAmountOC = tck;
                                $scope.TienKhachDua = $scope.TongThanhToan;
                            }
                        }
                    } else {
                        if (t == true) {

                            TCK = Number($scope.saleOrders.TotalDiscountAmountOC) + v;
                            tck = ($scope.saleOrders.TotalAmountOC * TCK) / 100;
                            $scope.TongThanhToan -= tck;
                            $scope.saleOrders.TotalDiscountAmountOC = tck;
                            $scope.TienKhachDua = $scope.TongThanhToan;
                        } else {
                            TCK = Number($scope.saleOrders.TotalDiscountAmountOC) + v;
                            tck = TCK;
                            $scope.TongThanhToan -= tck;
                            $scope.saleOrders.TotalDiscountAmountOC = tck;
                            $scope.TienKhachDua = $scope.TongThanhToan;
                        }
                    }
                } else {
                    if (e !== null) {
                        dateend = new Date(e);
                        if (dateend < today) {
                            notificationService.displayWarning('Khuyến mại hết hạn');
                        } else {
                            apiService.get('api/salespromotiondetail/getbyid/' + id, null, function (result) {
                                $scope.SalesPromotionTemporary = result.data;
                                //list shoppingcar $scope.shoppingCart[$scope.tab].lsItem
                                for (k in $scope.shoppingCart[$scope.tab].lsItem) {
                                    for (o in $scope.SalesPromotionTemporary) {
                                        if ($scope.shoppingCart[$scope.tab].lsItem[k].ID == $scope.SalesPromotionTemporary[o].ItemID) {
                                            if ($scope.SalesPromotionTemporary[o].VoucherType == true) {
                                                TCK = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[k].chietkhau)) + $scope.SalesPromotionTemporary[o].PromotionValue;
                                                tck = ($scope.shoppingCart[$scope.tab].lsItem[k].thanhtien * TCK) / 100;
                                                $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien = $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien - tck;
                                                $scope.shoppingCart[$scope.tab].lsItem[k].chietkhau = tck;
                                                ttck += tck;
                                            } else {
                                                TCK = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[k].chietkhau)) + $scope.SalesPromotionTemporary[o].PromotionValue;
                                                tck = $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien - TCK;
                                                $scope.shoppingCart[$scope.tab].lsItem[k].chietkhau = TCK;
                                                $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien = tck;
                                                ttck += TCK;
                                            }
                                        }
                                    }
                                }
                                $scope.saleOrders.TotalDiscountAmountOC = ttck;
                                $scope.TongThanhToan -= ttck;
                                $scope.TienKhachDua = $scope.TongThanhToan;
                            });
                        }
                    } else {
                        apiService.get('api/salespromotiondetail/getbyid/' + id, null, function (result) {
                            $scope.SalesPromotionTemporary = result.data;
                            //list shoppingcar $scope.shoppingCart[$scope.tab].lsItem
                            for (k in $scope.shoppingCart[$scope.tab].lsItem) {
                                for (o in $scope.SalesPromotionTemporary) {
                                    if ($scope.shoppingCart[$scope.tab].lsItem[k].ID == $scope.SalesPromotionTemporary[o].ItemID) {
                                        if ($scope.SalesPromotionTemporary[o].VoucherType == true) {
                                            TCK = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[k].chietkhau)) + $scope.SalesPromotionTemporary[o].PromotionValue;
                                            tck = ($scope.shoppingCart[$scope.tab].lsItem[k].thanhtien * TCK) / 100;
                                            $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien = $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien - tck;
                                            $scope.shoppingCart[$scope.tab].lsItem[k].chietkhau = tck;
                                            ttck += tck;
                                        } else {
                                            TCK = Number(ConvertNumber($scope.shoppingCart[$scope.tab].lsItem[k].chietkhau)) + $scope.SalesPromotionTemporary[o].PromotionValue;
                                            tck = $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien - TCK;
                                            $scope.shoppingCart[$scope.tab].lsItem[k].chietkhau = TCK;
                                            $scope.shoppingCart[$scope.tab].lsItem[k].thanhtien = tck;
                                            ttck += TCK;
                                        }
                                    }
                                }
                            }
                            $scope.saleOrders.TotalDiscountAmountOC = ttck;
                            $scope.TongThanhToan -= ttck;
                            $scope.TienKhachDua = $scope.TongThanhToan;
                        });
                    }
                }
                ttclick = id;
            }
        }
        $scope.getcustomer();
        $scope.getObjectCategory();
        $scope.getEmployee();
        $scope.getItemCategory();
    }

})(angular.module('tiktak'));