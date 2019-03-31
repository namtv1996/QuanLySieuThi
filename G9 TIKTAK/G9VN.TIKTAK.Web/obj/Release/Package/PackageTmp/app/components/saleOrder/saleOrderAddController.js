(function (app) {

    app.controller('saleOrderAddController', saleOrderAddController);
    saleOrderAddController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$state'];

    function saleOrderAddController($scope, apiService, notificationService, $ngBootbox, $state) {
        //LẤY DS Item
        $scope.ckkm = 0;
        $scope.disabled = 'none';
        $scope.disabled1 = 'block';
        $scope.filterList = [];
        var today = new Date();
        //lấy thông tin chi nhánh+ lấy thông  tin hàng hóa theo chi nhánh
        $scope.account = {};
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            apiService.get('api/itemOption/AutoComplete?BranchID=' + $scope.account.BranchID, null, function (result1) {
                $scope.filterList = result1.data;
            });
        });
        $scope.displaycart = 'block';

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'DH',
                    vouchertype1: 10,
                    vouchertype2: 14
                }
            }

            apiService.get('api/saleOrder/getCode', config, function (result1) {
                $scope.saleOrders.VoucherNo = result1.data;
            });
        }
        $scope.getCode();
        //TÌM KIẾM HÀNG HÓA
        $scope.dis = 'none';
        //chuoi text trong input tim kiem
        $scope.searchText = '';
        $scope.search = search;
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });

        function search() {

            if ($scope.searchText != '') {
                $scope.dis = 'block';
            }
            else {
                $scope.dis = 'none';
            }


        }

        ///CHON SAN PHAM 

        $scope.cart = {
            list_selected: [],
            customer: {
                ObjectID: '77ffeb25-befb-4996-bfe4-dcb3a6646f0a',
                ObjectName: 'Khách vãng lai'
            }
        }
        $scope.total = 0;
        $scope.quantity = 0;
        $scope.vat = 0;
        $scope.shipping_amount = '0';

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
            }
        }

        $scope.changeStatusDiscount = changeStatusDiscount;
        function changeStatusDiscount(stt) {
            if ($scope.cart.list_selected[stt - 1].txt_discount_item !== '' && $scope.cart.list_selected[stt - 1].txt_discount_item !== null && $scope.cart.list_selected[stt - 1].txt_discount_item !== '0') {
                if ($scope.cart.list_selected[stt - 1].status_discount === false) {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = Number(Number(ConvertNumber($scope.cart.list_selected[stt - 1].txt_discount_item)) * 100 / ($scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].unit_price))));
                } else {
                    $scope.cart.list_selected[stt - 1].txt_discount_item = Currency((Number($scope.cart.list_selected[stt - 1].txt_discount_item) * $scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].unit_price)) / 100).toFixed(2));
                }
            }
        }

        $scope.ApplyDiscount = ApplyDiscount;
        function ApplyDiscount(stt) {
            if ($scope.cart.list_selected[stt - 1].status_discount === false) {
                $scope.cart.list_selected[stt - 1].discount = Currency(Number($scope.cart.list_selected[stt - 1].txt_discount_item) * $scope.cart.list_selected[stt - 1].quan * Number(ConvertNumber($scope.cart.list_selected[stt - 1].unit_price)) / 100);
                
            } else {
                $scope.cart.list_selected[stt - 1].discount = $scope.cart.list_selected[stt - 1].txt_discount_item;
            }

            $scope.update_info();
            $scope.cart.list_selected[stt - 1].display_discount = 'none';
        }

        $scope.chooseProduct = chooseProduct;

        function chooseProduct(item) {
            $scope.disabled = 'none';
            $scope.disabled1 = 'block';
            item.discount2 = 0;
            $scope.displaycart = 'none';
            /// chưa có sản phẩm-> thêm vào mảng  
            if ($scope.cart.list_selected.length == 0) {
                item.quan = 1;
                item.stt = 1;
                item.status_discount = true;
                item.display_discount = 'none';
                item.txt_discount_item = '0';
                item.discount = '0';
                item.vat = 0;
                item.unit_price = Currency(item.saleprice.toString());

                if ($scope.customers.ObjectName !== null && $scope.customers.ObjectName !== '') {
                    if ($scope.customers.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                        item.unit_price = Currency(item.saleprice.toString());
                    } else {
                        if ($scope.customers.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                            item.unit_price = Currency(item.WholesalePrice.toString());
                        }
                        if ($scope.customers.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                            item.unit_price = Currency(item.PurchasePrice.toString());
                        }
                    }

                    item.vat = $scope.customers.TaxRateDefault;
                }

                //thành tiền
                item.money_amount = (Number(ConvertNumber(item.unit_price)) * item.quan - Number(ConvertNumber(item.discount)));
                $scope.cart.list_selected.push(item);
            }
            else {
                var pos = -1;
                var STT = 1;
                for (var i in $scope.cart.list_selected) {
                    if ($scope.cart.list_selected[i].ID == item.ID) {
                        pos = i;
                    }
                    STT++;
                }
                //thêm sản phẩm mới
                if (pos == -1) {
                    item.quan = 1;
                    item.stt = STT;
                    item.status_discount = true;
                    item.display_discount = 'none';
                    item.txt_discount_item = '0';
                    item.discount = '0';
                    item.vat = 0;
                    item.unit_price = Currency(item.saleprice.toString());

                    if ($scope.customers.ObjectName !== null && $scope.customers.ObjectName !== '') {
                        if ($scope.customers.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                            item.unit_price = Currency(item.saleprice.toString());
                        } else {
                            if ($scope.customers.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                item.unit_price = Currency(item.WholesalePrice.toString());
                            }
                            if ($scope.customers.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                item.unit_price = Currency(item.PurchasePrice.toString());
                            }
                        }

                        item.vat = $scope.customers.TaxRateDefault;
                    }

                    //thành tiền
                    item.money_amount = (Number(ConvertNumber(item.unit_price)) * item.quan - Number(ConvertNumber(item.discount)));
                    $scope.cart.list_selected.push(item);

                }
                //sản phẩm đã có trong đơn
                else {
                    $scope.cart.list_selected[pos].quan++;
                    $scope.cart.list_selected[pos].money_amount = (Number(ConvertNumber($scope.cart.list_selected[pos].unit_price)) * $scope.cart.list_selected[pos].quan
                        - Number(ConvertNumber($scope.cart.list_selected[pos].discount)));
                }
            }

            $scope.dis = 'none';
            $scope.searchText = '';
            $scope.update_info();

        }
        //update info
        $scope.update_info = update_info;
        function update_info() {
            if ($scope.shipping_amount === undefined) {
                $scope.shipping_amount = '0';
            } else {
                $scope.shipping_amount = Currency(ConvertNumber($scope.shipping_amount.toString()));
            }
            var chietkhau = 0;
            $scope.quantity = 0;
            $scope.total = 0;
            $scope.saleOrders.TotalDiscountAmount = 0;
            $scope.saleOrders.TotalVATAmount = 0;

            for (var index in $scope.cart.list_selected) {
                if ($scope.cart.list_selected[index].unit_price === undefined) {
                    $scope.cart.list_selected[index].unit_price = '0';
                } else {
                    $scope.cart.list_selected[index].unit_price = Currency(ConvertNumber($scope.cart.list_selected[index].unit_price.toString()));
                }

                if ($scope.cart.list_selected[index].discount === undefined) {
                    $scope.cart.list_selected[index].discount = '0';
                } else {                                   
                    $scope.cart.list_selected[index].discount = Currency(ConvertNumber($scope.cart.list_selected[index].discount.toString())); 
                }
                //upadate cot thanh tien
                
                $scope.cart.list_selected[index].money_amount = $scope.cart.list_selected[index].quan * Number(ConvertNumber($scope.cart.list_selected[index].unit_price)) - Number(ConvertNumber($scope.cart.list_selected[index].discount));
                              
                //update lai tong so
                $scope.total += $scope.cart.list_selected[index].money_amount;
                //update lai so luong
                $scope.quantity += $scope.cart.list_selected[index].quan;
                $scope.saleOrders.TotalDiscountAmount += Number(ConvertNumber($scope.cart.list_selected[index].discount));
                //sau khi update stt thì index sẽ tăng 1đvị; 
                $scope.cart.list_selected[index].stt = ++index;

            }
            //update chiết khấu đơn hàng
            if ($scope.customers.ObjectName !== null && $scope.customers.ObjectName !== '') {
                if ($('.colored-palegreen')[0].checked == false) {
                    chietkhau = $scope.customers.DiscountRateDefault;
                } else {
                    chietkhau = ($scope.customers.DiscountRateDefault * $scope.total) / 100;
                }
            }
            if ($('.colored-palegreen')[0].checked == false) {
                $scope.payments = $scope.total - (($scope.txt_discount + chietkhau) / 100) * $scope.total;
                $scope.discount_money = (($scope.txt_discount + chietkhau) / 100) * $scope.total;
            } else {
                $scope.payments = $scope.total - ($scope.txt_discount + chietkhau);
                $scope.discount_money = ($scope.txt_discount + chietkhau);
            }
            //tính tổng chiết khấu
            $scope.saleOrders.TotalDiscountAmount += $scope.discount_money;
            $scope.saleOrders.TotalDiscountAmountOC = $scope.saleOrders.TotalDiscountAmount;


            //tínhtổng vat
            //chiết khấu phân bổ cho từng sản phẩm trong đơn hàng
            //  $scope.cart.list_selected.discount2=0;
            for (var index in $scope.cart.list_selected) {
                $scope.cart.list_selected[index].discount2 = ($scope.cart.list_selected[index].money_amount / $scope.total) * Number($scope.discount_money);
                $scope.saleOrders.TotalVATAmount += ($scope.cart.list_selected[index].vat / 100) * ($scope.cart.list_selected[index].money_amount - $scope.cart.list_selected[index].discount2);
            }
            $scope.saleOrders.TotalVATAmountOC = $scope.saleOrders.TotalVATAmount;

            //update lại tổng tiền thanh toán
            $scope.payments = $scope.total + $scope.saleOrders.TotalVATAmount - Number($scope.discount_money) + Number(ConvertNumber($scope.shipping_amount));
            stt = false;
           
            $('#collapseThrees').hide(1000);

        }

        /// delete
        $scope.delete_itemselected = function (id) {
            for (var index in $scope.cart.list_selected) {
                if ($scope.cart.list_selected[index].ID.toLowerCase().indexOf(id.toLowerCase()) > -1) {
                    $scope.cart.list_selected.splice(index, 1);
                }
            }
            $scope.displaycart = 'block';
            $scope.ckkm = 0;
            $scope.discount_money = 0;
            $scope.update_info();
        };
        //lấy danh sách khác hàng
        $scope.listCustomer = [];
        $scope.filterList_cus = [];
        $scope.getcustomer = getcustomer;

        function getcustomer() {
            apiService.get('api/Customer/getall', null, function (result) {
                $scope.listCustomer = result.data;
                $scope.filterList_cus = $scope.listCustomer
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.getcustomer();
        //tìm kiếm khách hàng
        $scope.diss = 'none';
        $scope.searchCus = '';
        $scope.Search_Customer = Search_Customer;
        function Search_Customer() {
            $scope.displayAdvance1 = 'none';

            if ($scope.searchCus === '') {
                $scope.filterList_cus = $scope.listCustomer;
                //$scope.diss = 'none';
                $scope.customers.displayAdvance = 'none';
                $scope.customers.Tel = null;
                $scope.customers.ObjectName = null;
                $scope.customers.Email = null;
                $scope.customers.ObjectAddress = null;
            }
            if ($scope.searchCus !== '') {
                $scope.diss = 'block';
            }
        }

        $scope.autocoplete_customer_click = autocoplete_customer_click;
        function autocoplete_customer_click() {
            if ($scope.diss === 'none') {
                $scope.diss = 'block';
            } else {
                $scope.diss = 'none';
            }
        }

        ///chọn khách hàng

        $scope.customers = {
            ObjectID: null,
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
            Description: null,
            displayAdvance: 'none'
        }
        //đối tượng dùng thêm mới khách hàng
        $scope.customers1 = {

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

        $scope.choose_Cus = function (item) {
            apiService.get('api/Customer/getbyid/' + item.ObjectID, null, function (result) {
                $scope.customers = result.data;
                $scope.searchCus = $scope.customers.ObjectName;
                $scope.diss = 'none';
                $scope.customers.displayAdvance = 'block';

                if ($scope.customers.ApplyIncentives === 2) {
                    apiService.get('api/pricePolicy/getbyid/' + $scope.customers.PricePolicyDefault, null, function (result) {
                        $scope.customers.PricePolicyDefaultName = result.data.PricePolicyName;

                    }, function (error) {
                        console.log(error.data);
                    });

                    apiService.get('api/paymentSchedule/getbyid/' + $scope.customers.PaymentScheduleDefault, null, function (result) {
                        $scope.customers.PaymentScheduleDefaultName = result.data.PaymentScheduleName;

                    }, function (error) {
                        console.log(error.data);
                    });

                    if ($scope.customers.PaymentMethodDefault === 1) {
                        $scope.customers.PaymentMethodDefaultName = 'Tiền mặt';
                    } else {
                        if ($scope.customers.PaymentMethodDefault === 2) {
                            $scope.customers.PaymentMethodDefaultName = 'Chuyển khoản';
                        }
                        if ($scope.customers.PaymentMethodDefault === 3) {
                            $scope.customers.PaymentMethodDefaultName = 'COD';
                        }
                    }

                    if ($scope.cart.list_selected.length > 0) {
                        for (var i in $scope.cart.list_selected) {
                            if ($scope.customers.TaxRateDefault !== null) {
                                $scope.cart.list_selected[i].vat = $scope.customers.TaxRateDefault;
                            }

                            if ($scope.customers.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].saleprice.toString());
                            } else {
                                if ($scope.customers.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                    $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                }
                                if ($scope.customers.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                    $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                }
                            }

                            $scope.update_info();
                        }
                    }
                }
                else {
                    if ($scope.customers.ApplyIncentives === 1) {
                        var customerCategory = {};
                        apiService.get('api/objectCategory/getbyid/' + $scope.customers.ObjectCategoryID, null, function (result) {
                            customerCategory = result.data;
                            apiService.get('api/pricePolicy/getbyid/' + customerCategory.PricePolicyDefault, null, function (result) {
                                $scope.customers.PricePolicyDefault = result.data.PricePolicyID;
                                $scope.customers.PricePolicyDefaultName = result.data.PricePolicyName;
                            }, function (error) {
                                console.log('pricePolicy2');
                            });

                            apiService.get('api/paymentSchedule/getbyid/' + customerCategory.PaymentScheduleDefault, null, function (result) {
                                $scope.customers.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                $scope.customers.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                            }, function (error) {
                                console.log('paymentSchedule2');
                            });

                            if (customerCategory.PaymentMethodDefault === 1) {
                                $scope.customers.PaymentMethodDefaultName = 'Tiền mặt';
                            } else {
                                if (customerCategory.PaymentMethodDefault === 2) {
                                    $scope.customers.PaymentMethodDefaultName = 'Chuyển khoản';
                                }
                                if (customerCategory.PaymentMethodDefault === 3) {
                                    $scope.customers.PaymentMethodDefaultName = 'COD';
                                }
                            }
                            $scope.customers.TaxRateDefault = customerCategory.TaxRateDefault;
                            $scope.customers.DiscountRateDefault = customerCategory.DiscountRateDefault;

                            if ($scope.cart.list_selected.length > 0) {
                                $scope.customers.DiscountRateDefault = customerCategory.DiscountRateDefault;
                                for (var i in $scope.cart.list_selected) {
                                    if (customerCategory.TaxRateDefault !== null) {
                                        $scope.cart.list_selected[i].vat = customerCategory.TaxRateDefault;
                                    }
                                    if (customerCategory.PricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                        $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].saleprice.toString());
                                    } else {
                                        if (customerCategory.PricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                            $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                        }
                                        if (customerCategory.PricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                            $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                        }
                                    }

                                    $scope.update_info();
                                }
                            }

                        }, function (error) {
                            console.log('vendorCategory');
                        });
                    }

                    if ($scope.customers.ApplyIncentives === 3) {
                        var store = {};
                        apiService.get('api/account/store', null, function (result) {
                            apiService.get('api/configStore/getConfig?manageStoreID=' + result.data.ManageStoreID, null, function (result) {
                                store = result.data;
                                apiService.get('api/pricePolicy/getbyid/' + store.SalePricePolicyDefault, null, function (result) {
                                    $scope.customers.PricePolicyDefault = result.data.PricePolicyID;
                                    $scope.customers.PricePolicyDefaultName = result.data.PricePolicyName;
                                }, function (error) {
                                    console.log('pricePolicy2');
                                });

                                apiService.get('api/paymentSchedule/getbyid/' + store.PaymentScheduleDefault, null, function (result) {
                                    $scope.customers.PaymentScheduleDefault = result.data.PaymentScheduleID;
                                    $scope.customers.PaymentScheduleDefaultName = result.data.PaymentScheduleName;
                                }, function (error) {
                                    console.log('paymentSchedule2');
                                });

                                if (store.PaymentMethodDefault === 1) {
                                    $scope.customers.PaymentMethodDefaultName = 'Tiền mặt';
                                } else {
                                    if (store.PaymentMethodDefault === 2) {
                                        $scope.customers.PaymentMethodDefaultName = 'Chuyển khoản';
                                    }
                                    if (store.PaymentMethodDefault === 3) {
                                        $scope.customers.PaymentMethodDefaultName = 'COD';
                                    }
                                }

                                $scope.customers.TaxRateDefault = store.SaleTaxDefault;

                                if ($scope.cart.list_selected.length > 0) {
                                    for (var i in $scope.cart.list_selected) {
                                        if (store.SaleTaxDefault !== null) {
                                            $scope.cart.list_selected[i].vat = store.SaleTaxDefault;
                                        }
                                        if (store.SalePricePolicyDefault.toString() === '3048ffe8-e2c8-4b43-a8a5-766ad6643a83') {
                                            $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].saleprice.toString());
                                        } else {
                                            if (store.SalePricePolicyDefault.toString() === 'f53cecc7-5a7b-44b9-894b-c6b18ac85d49') {
                                                $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].WholesalePrice.toString());
                                            }
                                            if (store.SalePricePolicyDefault.toString() === '155acc95-47be-4169-a73a-872aec588f54') {
                                                $scope.cart.list_selected[i].unit_price = Currency($scope.cart.list_selected[i].PurchasePrice.toString());
                                            }
                                        }
                                        $scope.update_info();
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
            });
        }
        $scope.displayAdvance1 = 'none';
        $scope.AdvanceSettingClick = function () {
            if ($scope.displayAdvance1 === 'none') {
                $scope.displayAdvance1 = 'block';
            } else {
                $scope.displayAdvance1 = 'none';
            }
        }
        //click outside
        $(document).click(function (e) {

            if ($scope.dis == 'block') {
                if (e.target.id != 'txt_search') {
                    // $('#close_table_select')[0].style.display = 'none';
                    $scope.dis = 'none';
                }
            }
            if (e.target.class != 'autocoplete_customer') {
                // $('#autocoplete_customer')[0].style.display = 'none';
            }
        });
        // thay đổi đơn vị trong popover điều chỉnh giá
        $scope.changeUNiT = changeUNiT;
        function changeUNiT() {
            if ($('.colored-palegreen')[0].checked == false) {
                if ($('#txt_discount')[0].value < 0) $scope.txt_discount = 0;
                if ($('#txt_discount')[0].value > 100) $scope.txt_discount = 100;

            }
        }
        $scope.change = function () {
            if ($('.colored-palegreen')[0].checked == false) {
                if ($scope.txt_discount < 0) {
                    $scope.txt_discount = 0;
                }
                if ($scope.txt_discount > 100) {
                    $scope.txt_discount = 100;
                }
            }
        }
        //sale
        $scope.sale = sale;
        $scope.dis3 = 'none';
        function sale() {
            //$ngBootbox.customDialog({
            //    title: 'Giảm giá đơn hàng',
            //    message: '<div class="widget-body" style="box-shadow: none !important;background-color: inherit;"><div><form class="form-horizontal form-bordered ng-pristine ng-valid" role="form" ng-click="namtv()"><div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label no-padding-right">Giá mới</label><div class="col-sm-8"><input type="email" class="form-control" id="inputEmail3" placeholder="VNĐ" style="width: 100%;"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-4 control-label no-padding-right">Chiết khấu</label><div class="col-sm-8"><input type="text" class="form-control" id="inputPassword3" placeholder="VNĐ,%" style="width: 100%;"></div><div class="col-sm-4 col-sm-offset-4"><label style="padding-top: 8px;"><input class="checkbox-slider toggle colored-palegreen" type="checkbox"><span class="text"></span></label></div></div><div class="form-group"><div class="col-sm-offset-4 col-sm-4"><button type="submit" class="btn btn-palegreen">Áp dụng</button></div></div></form></div></div>'
            //});
            if ($scope.dis3 == 'block') {
                $scope.dis3 = 'none';
            } else {
                $scope.dis3 = 'block';
            }
        }
        $scope.sale1 = sale1;
        $scope.dis4 = 'none';
        function sale1() {
            //$ngBootbox.customDialog({
            //    title: 'Giảm giá đơn hàng',
            //    message: '<div class="widget-body" style="box-shadow: none !important;background-color: inherit;"><div><form class="form-horizontal form-bordered ng-pristine ng-valid" role="form" ng-click="namtv()"><div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label no-padding-right">Giá mới</label><div class="col-sm-8"><input type="email" class="form-control" id="inputEmail3" placeholder="VNĐ" style="width: 100%;"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-4 control-label no-padding-right">Chiết khấu</label><div class="col-sm-8"><input type="text" class="form-control" id="inputPassword3" placeholder="VNĐ,%" style="width: 100%;"></div><div class="col-sm-4 col-sm-offset-4"><label style="padding-top: 8px;"><input class="checkbox-slider toggle colored-palegreen" type="checkbox"><span class="text"></span></label></div></div><div class="form-group"><div class="col-sm-offset-4 col-sm-4"><button type="submit" class="btn btn-palegreen">Áp dụng</button></div></div></form></div></div>'
            //});
            if ($scope.dis4 == 'block') {
                $scope.dis4 = 'none';
            } else {
                $scope.dis4 = 'block';
            }
        }
        //nhấn áp dụng trong giảm giá
        $scope.txt_reason = null;
        $scope.txt_discount = 0;
        $scope.discount_money = 0;
        $scope.payments = 0;
        $scope.discount = discount;
        function discount() {
            $scope.update_info();
            $scope.dis3 = 'none';
        }
        //hàm chuyển đổi định dạng
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
        //THANH TOÁN
        //tiền hiển thị
        $scope.guest_money = 0;
        // tiền khách trả
        $scope.guest_money_value = 0;
        $scope.debt = 0;
        $scope.change_guest_money = function () {
            $scope.guest_money = Currency(ConvertNumber($scope.guest_money));
            $scope.debt = ConvertNumber($scope.guest_money) - $scope.payments;
            $scope.guest_money_value = ConvertNumber($scope.guest_money);
        }
        //CLEAR ĐƠN HÀNG
        function clear_data() {
            //reset giỏ hàng
            $scope.cart.list_selected = [];
            //tiền hàng
            $scope.total = 0;
            //số lượng
            $scope.quantity = 0;
            //tiền chiết khấu
            $scope.discount_money = 0;
            //tiền cần thanh toán
            $scope.payments = 0;
            //tiền khách trả
            $scope.guest_money_value = 0;
            $scope.guest_money = 0;
            //tiền nợ của đơn hàng
            $scope.debt = 0;
            //value textbox chiết khấu (VNĐ,%)
            $scope.txt_discount = 0;
            //value textbox tìm kiếm hàng hóa
            $scope.searchText = 0;
        }
        $scope.saveandcontinue = function () {
            clear_data();
            notificationService.displaySuccess('Thêm đơn hàng thành công!');
        }
        //LƯU VÀ TIẾP TỤC
        //đối tượng chi tiết đơn đặt hàng
        $scope.saleOrdersDetail = {
            DiscountAmountOC: 0,
            DiscountAmount: 0,
            Amount: 0,
            AmountOC: 0,
            VATAmount: 0,
            VATAmountOC: 0
        };
        $scope.AddSaleOrdersDetail = AddSaleOrdersDetail;
        function AddSaleOrdersDetail(i, item) {
            if (i < $scope.cart.list_selected.length) {
                $scope.saleOrdersDetail.VoucherID = item.VoucherID;
                $scope.saleOrdersDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.saleOrdersDetail.Quantity = $scope.cart.list_selected[i].quan;
                $scope.saleOrdersDetail.QuantityConvert = $scope.saleOrdersDetail.Quantity;
                $scope.saleOrdersDetail.UnitPriceOC = Number(ConvertNumber($scope.cart.list_selected[i].unit_price));
                $scope.saleOrdersDetail.UnitPrice = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.UnitPriceConvertOC = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.UnitPriceConvert = $scope.saleOrdersDetail.UnitPriceOC;
                $scope.saleOrdersDetail.AmountOC = $scope.cart.list_selected[i].money_amount;
                $scope.saleOrdersDetail.Amount = $scope.saleOrdersDetail.AmountOC;
                //tiền chiết khấu
                $scope.saleOrdersDetail.DiscountAmountOC = Number(ConvertNumber($scope.cart.list_selected[i].discount));
                //tiền chiết khấu quy đổi
                $scope.saleOrdersDetail.DiscountAmount = $scope.saleOrdersDetail.DiscountAmountOC;
                $scope.saleOrdersDetail.DiscountReason = $scope.cart.list_selected[i].DiscountReason;
                //tỷ lệ chiết khấu
                $scope.saleOrdersDetail.DiscountRate = (Number(ConvertNumber($scope.cart.list_selected[i].discount)) / ($scope.cart.list_selected[i].quan * Number(ConvertNumber($scope.cart.list_selected[i].unit_price)))) * 100;
                $scope.saleOrdersDetail.VATAmountOC = $scope.cart.list_selected[i].vat * $scope.saleOrdersDetail.AmountOC;
                $scope.saleOrdersDetail.VATAmount = $scope.saleOrdersDetail.VATAmountOC;
                $scope.saleOrdersDetail.VATRate = $scope.cart.list_selected[i].vat;
                //stt
                $scope.saleOrdersDetail.SortOrder = $scope.cart.list_selected[i].stt;
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
                        AddSaleOrdersDetail(i + 1, item);
                    },
                    function (error) {
                        notificationService.displayError('Thêm mới không thành công');
                    });
            } else {
                var d = document.getElementById("inputEmail3").value;
                notificationService.displaySuccess('Đơn hàng đã được thêm mới.');
                $scope.saleOrders.VoucherID = item.VoucherID;
                d = $scope.saleOrders.VoucherDate;
                //chuyển hướng đến trang detail của đơn hàng vừa thêm mới
                $state.go('saleOrder_Detail', { id: item.VoucherID });
            }
        }
        //đối tượng đơn đặt hàng
        $scope.saleOrders = {
            //tỉ giá triết khấu
            DiscountRate: 0,
            //tiền triết khấu quy đổi (thường là vnđ,DiscountAmountOC = DiscountAmount*ExchangeRate )
            DiscountAmountOC: 0,
            //tiền chiết khấu gốc
            DiscountAmount: 0,
            //tổng tiền quy đổi
            TotalAmountOC: 0,
            //tổng tiền gốc
            TotalAmount: 0,
            TotalDiscountAmountOC: 0,
            TotalDiscountAmount: 0,
            //tiền thuế
            TotalVATAmountOC: 0,
            TotalVATAmount: 0,
            TotalOutwardAmount: 0,
            IsPosted: true,
            SortOrder: 0,
            CommisionAmountOC: 0,
            CommisionAmount: 0,
            ShippingAmount: 0,
            IsAttachList: true,
            IsShowUnitConvert: true,
            StatusID: 1,
            VoucherType: 10,
            VoucherDate: new Date()
        };
        $scope.AddSaleOrders = AddSaleOrders;
        function AddSaleOrders() {
            var check_price = false;
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                if ($scope.cart.list_selected[i].unit_price === '0' || $scope.cart.list_selected[i].unit_price === null || $scope.cart.list_selected[i].unit_price === undefined) {
                    check_price = false;
                    break;
                } else {
                    check_price = true;
                }
            }

            if (check_price === true) {
                if ($scope.customers.ObjectName !== null && $scope.customers.ObjectName !== '') {
                    if ($('#txt_discount')[0].value == "") {
                        $scope.txt_discount = 0;
                        $scope.discount_money = 0;
                    }
                    //trạng thái ban đầu là đặt hàng
                    $scope.saleOrders.StatusID = 7;
                    $scope.saleOrders.IsShowUnitConvert = true;
                    $scope.saleOrders.IsAttachList = true;
                    if (Number(ConvertNumber($scope.shipping_amount)) >= 0) {
                        $scope.saleOrders.ShippingAmount = Number(ConvertNumber($scope.shipping_amount));
                    } else {
                        $scope.saleOrders.ShippingAmount = 0;
                    }
                    $scope.saleOrders.CommisionAmount = 0;
                    $scope.saleOrders.CommisionAmountOC = $scope.saleOrders.CommisionAmount;
                    $scope.saleOrders.SortOrder = 0;
                    $scope.saleOrders.IsPosted = true;
                    $scope.saleOrders.TotalOutwardAmount = 0;
                    $scope.saleOrders.BranchID = $scope.account.BranchID;
                    //tiền chiết khấu theo đơn hàng
                    $scope.saleOrders.DiscountAmountOC = $scope.discount_money;
                    $scope.saleOrders.DiscountAmount = $scope.saleOrders.DiscountAmountOC;
                    $scope.saleOrders.DiscountRate = $scope.discount_money * 100 / $scope.total;
                    $scope.saleOrders.TotalAmountOC = $scope.total;
                    $scope.saleOrders.TotalAmount = $scope.saleOrders.TotalAmountOC;

                    // chưa chọn khách hàng, điền đầy đủ thông tin khách hàng và thêm mới khách hàng
                    if ($scope.customers.ObjectID == null) {
                        $scope.customers1.ObjectName = $scope.customers.ObjectName;
                        $scope.customers1.Email = $scope.customers.Email;
                        $scope.customers1.Tel = $scope.customers.Tel;
                        $scope.customers1.ObjectAddress = $scope.customers.ObjectAddress;
                        //nếu không có thông tin khách hàng thì là khách vãng lai
                        if ($scope.customers.ObjectName == null && $scope.customers.Email == null && $scope.customers.Tel == null && $scope.customers.ObjectAddress == null) {
                            $scope.saleOrders.ObjectID = '77ffeb25-befb-4996-bfe4-dcb3a6646f0a';
                            $scope.saleOrders.PromotionID = pid;
                            apiService.post('api/saleOrder/create', $scope.saleOrders,
                                function (result) {
                                    AddSaleOrdersDetail(0, result.data);
                                },
                                function (error) {
                                    notificationService.displayError('Thêm mới không thành công.');
                                });
                        } else {
                            apiService.post('api/Customer/create', $scope.customers1,
                                function (result) {
                                    notificationService.displaySuccess('khách hàng ' + result.data.ObjectName + ' đã được thêm mới.');
                                    $scope.saleOrders.ObjectID = result.data.ObjectID;
                                    $scope.saleOrders.PromotionID = pid;
                                    apiService.post('api/saleOrder/create', $scope.saleOrders,
                                        function (result) {
                                            AddSaleOrdersDetail(0, result.data);
                                        },
                                        function (error) {
                                            notificationService.displayError('Thêm mới không thành công.');
                                        });
                                },
                                function (error) {
                                    notificationService.displayError('Thêm mới khách hàng không thành công.');
                                });
                        }
                    }
                    else {
                        $scope.saleOrders.ObjectID = $scope.customers.ObjectID;
                        $scope.saleOrders.PromotionID = pid;
                        apiService.post('api/saleOrder/create', $scope.saleOrders,
                            function (result) {
                                AddSaleOrdersDetail(0, result.data);
                            },
                            function (error) {
                                notificationService.displayError('Thêm mới không thành công.');
                            });
                    }
                }
                else {
                    notificationService.displayWarning('Bạn cần nhập thông tin khách hàng !');
                }
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ đơn giá !');
            }
        }
        $scope.lsUser = [];
        $scope.getUser = function () {
            apiService.get('api/account/GetUser', null, function (result) {
                $scope.lsUser = result.data;
            }, function (error) {
                console.log('load lsUser failed');
            });
        }
        $scope.getUser();

        $scope.DonGiaoHang = {
        }
        $scope.lsTransporter = [];
        $scope.Transporter = function () {
            apiService.get('api/employee/getallTransporter', null, function (result) {
                $scope.lsTransporter = result.data;
            }, function () {
                console.log('load Transporter failed');
            });
        }
        $scope.Transporter();
        $scope.getSalesPromotion = getSalesPromotion;
        $scope.listSalesPromotion = [];
        $scope.listSalesPromotionDetail = [];
        $scope.CalculatePromotion = CalculatePromotion;
        var stt = false;
        function getSalesPromotion() {
            $('#collapseThrees').show(1000);
            if (stt == false) {
                $scope.listNew = [];
                $scope.listSalesPromotionNew = [];
                apiService.get('api/salespromotiondetail/getall', null, function (result) {
                    $scope.listSalesPromotionDetail = result.data;
                    for (i in $scope.listSalesPromotionDetail) {
                        if ($scope.listSalesPromotionDetail[i].PromotionType == 0) {
                            if ($scope.listSalesPromotionDetail[i].ConditionsMin !== null && $scope.listSalesPromotionDetail[i].ConditionsMin <= $scope.payments && $scope.payments <= $scope.listSalesPromotionDetail[i].ConditionsMax) {
                                $scope.listSalesPromotionNew.push($scope.listSalesPromotionDetail[i]);
                            } else {
                                $scope.disPr = 'none !important';
                                $scope.disPr1 = 'block !important';
                            }
                        } else {
                            for (j in $scope.cart.list_selected) {
                                if ($scope.listSalesPromotionDetail[i].ItemID == $scope.cart.list_selected[j].ID && $scope.listSalesPromotionDetail[i].QuantityItem <= $scope.cart.list_selected[j].quan) {
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
                                if ($scope.listSalesPromotionNew[k].VoucherID == $scope.listSalesPromotion[l].VoucherID && $scope.listSalesPromotion[l].Status == true && today >= CreateDate && $scope.listSalesPromotion[l].ApplyQuantity > 0 && $scope.listSalesPromotion[l].Status == true) {
                                    $scope.listNew[ix] = {};
                                    $scope.listNew[ix].ApplyQuantity = $scope.listSalesPromotion[l].ApplyQuantity;
                                    $scope.listNew[ix].BranchID = $scope.listSalesPromotion[l].BranchID;
                                    $scope.listNew[ix].CreateDate = $scope.listSalesPromotion[l].CreateDate;
                                    $scope.listNew[ix].Description = $scope.listSalesPromotion[l].Description;
                                    $scope.listNew[ix].Expirydate = $scope.listSalesPromotion[l].Expirydate;
                                    $scope.listNew[ix].PromotionName = $scope.listSalesPromotion[l].PromotionName;
                                    $scope.listNew[ix].VoucherType = $scope.listSalesPromotion[l].VoucherType;
                                    $scope.listNew[ix].PromotionValue = $scope.listSalesPromotionNew[k].PromotionValue;
                                    $scope.listNew[ix].Object = $scope.listSalesPromotion[l].Object;
                                    $scope.listNew[ix].Status = $scope.listSalesPromotion[l].Status;
                                    $scope.listNew[ix].VoucherDate = $scope.listSalesPromotion[l].VoucherDate;
                                    $scope.listNew[ix].VoucherID = $scope.listSalesPromotion[l].VoucherID;
                                    $scope.listNew[ix].VoucherNo = $scope.listSalesPromotion[l].VoucherNo;
                                    $scope.listNew[ix].VoucherTypeDetail = $scope.listSalesPromotionNew[k].VoucherType;
                                    $scope.listNew[ix].ItemID = $scope.listSalesPromotionNew[k].ItemID;
                                    if ($scope.listSalesPromotion[l].VoucherType == 0) {
                                        $scope.listNew[ix].VoucherType1 = 'CK Σ đơn hàng';
                                    } else {
                                        $scope.listNew[ix].VoucherType1 = 'CK theo từng hàng hóa';
                                    }
                                    ix++;
                                }
                            }
                        }
                        if ($scope.listNew.length >= 1) {
                            for (var r = 0 ; r < $scope.listNew.length; r++) {
                                for (var t = r + 1 ; t < $scope.listNew.length; t++)
                                    if ($scope.listNew[r].VoucherID == $scope.listNew[t].VoucherID) {
                                        $scope.listNew.splice(t, 1)
                                    }
                            }
                        }
                        if ($scope.listNew.length !== 0) {
                            $scope.disPr = 'block !important';
                            $scope.disPr1 = 'none !important';
                        }
                        ttclick = null;
                        stt = true;
                        luu = parseInt($scope.saleOrders.DiscountAmountOC);
                    });
                }, function (error) {
                    console.log('load items failed');
                });
            }
        }
        var dateend;
        var TCK;
        var tck;
        var ttbd;
        var sttck = true;
        var pid = null;
        var ttclick = null;
       
        $scope.SalesPromotionTemporary = [];
        //update_info
        function CalculatePromotion(e, t, v, id, p) {
            pid = id;
            $scope.disabled = 'block';
            $scope.disabled1 = 'none';
            if (ttclick !== id) {
            $scope.ckkm = 0;
            var tt = 0;
            var ttck = 0;
           
                if (p == 0) {
                    if (e !== null) {
                        dateend = new Date(e);
                        if (dateend < today) {
                            notificationService.displayWarning('Khuyến mại hết hạn');
                        } else {
                            TCK = 0;
                            tck = 0;
                            if (t == true) {
                                TCK =  v;
                                tck = ($scope.payments * TCK) / 100;
                                $scope.payments = $scope.payments -tck + $scope.discount_money;
                                $scope.ckkm = tck;
                                $scope.saleOrders.TotalDiscountAmountOC = $scope.ckkm + $scope.discount_money;
                            } else {
                                TCK =  v;
                                tck = TCK;
                                $scope.payments = $scope.payments -tck+$scope.discount_money;
                                $scope.ckkm = TCK + $scope.discount_money;
                                $scope.saleOrders.TotalDiscountAmountOC = $scope.ckkm + $scope.discount_money;
                            }
                        }
                    } else {
                        TCK = 0;
                        tck = 0;
                        if (t == true) {
                            TCK = ($scope.payments * v) / 100;
                            tck = $scope.discount_money + TCK;
                            $scope.payments = $scope.payments - tck;
                            $scope.ckkm = TCK + $scope.discount_money;
                            $scope.saleOrders.TotalDiscountAmountOC = $scope.ckkm + $scope.discount_money;
                            pid = id;
                        } else {
                            TCK = $scope.discount_money + v;
                            tck = TCK;
                            $scope.payments = $scope.payments - tck;
                            $scope.ckkm = v;
                            $scope.saleOrders.TotalDiscountAmountOC = $scope.ckkm + $scope.discount_money;
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
                                for (k in $scope.cart.list_selected) {
                                    for (o in $scope.SalesPromotionTemporary) {
                                        if ($scope.cart.list_selected[k].ID == $scope.SalesPromotionTemporary[o].ItemID) {
                                            if ($scope.SalesPromotionTemporary[o].VoucherType == true) {
                                                tck = (($scope.cart.list_selected[k].money_amount * $scope.SalesPromotionTemporary[o].PromotionValue) / 100) + Number($scope.cart.list_selected[k].discount);
                                                $scope.cart.list_selected[k].discount = Currency($scope.cart.list_selected[k].money_amount - tck);
                                                $scope.cart.list_selected[k].money_amount = tck;
                                                ttck += Number(ConvertNumber($scope.cart.list_selected[k].discount));
                                                tt += tck;
                                            } else {
                                                TCK = Number($scope.cart.list_selected[k].discount) + $scope.SalesPromotionTemporary[o].PromotionValue;
                                                tck = $scope.cart.list_selected[k].money_amount - TCK;
                                                $scope.cart.list_selected[k].discount = Currency(TCK);
                                                $scope.cart.list_selected[k].money_amount = tck;
                                                tt += tck;
                                                ttck += TCK;
                                            }
                                        }
                                    }
                                }
                                $scope.saleOrders.TotalDiscountAmountOC += ttck;
                                $scope.ckkm = ttck;
                                $scope.payments -= $scope.ckkm;
                            });
                        }
                    } else {
                        apiService.get('api/salespromotiondetail/getbyid/' + id, null, function (result) {
                            $scope.SalesPromotionTemporary = result.data;
                            for (k in $scope.cart.list_selected) {
                                for (o in $scope.SalesPromotionTemporary) {
                                    if ($scope.cart.list_selected[k].ID == $scope.SalesPromotionTemporary[o].ItemID) {
                                         if ($scope.SalesPromotionTemporary[o].VoucherType == true) {
                                                tck = (($scope.cart.list_selected[k].money_amount * $scope.SalesPromotionTemporary[o].PromotionValue) / 100) + Number($scope.cart.list_selected[k].discount);
                                                $scope.cart.list_selected[k].discount = Currency($scope.cart.list_selected[k].money_amount -tck);
                                                $scope.cart.list_selected[k].money_amount = tck;
                                                ttck +=Number(ConvertNumber($scope.cart.list_selected[k].discount));
                                                tt += tck;
                                            } else {
                                                TCK = Number($scope.cart.list_selected[k].discount) +$scope.SalesPromotionTemporary[o].PromotionValue;
                                                tck = $scope.cart.list_selected[k].money_amount -TCK;
                                                $scope.cart.list_selected[k].discount =Currency(TCK);
                                                $scope.cart.list_selected[k].money_amount = tck;
                                                tt += tck;
                                                ttck += TCK;
                                                 }
                                    }
                                }
                            }
                            $scope.saleOrders.TotalDiscountAmountOC += ttck;
                            $scope.ckkm = ttck;
                            $scope.payments -= $scope.ckkm;
                        });
                    }
                }
                ttclick = id;
                $scope.saleOrders.TotalDiscountAmountOC = $scope.ckkm + $scope.discount_money;
                $scope.payments = $scope.total - $scope.saleOrders.TotalDiscountAmountOC;
            }
        }
    }
})(angular.module('tiktak.saleOrder'));