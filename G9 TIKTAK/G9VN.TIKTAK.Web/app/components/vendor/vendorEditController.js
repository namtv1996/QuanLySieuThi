(function (app) {
    app.controller('vendorEditController', vendorEditController);
    vendorEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', '$ngBootbox'];
    function vendorEditController(apiService, $scope, notificationService, $state, $stateParams, $ngBootbox) {
        $scope.vendors = {
            ObjectID: null,
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: null,
            Tel: null,
            Email: null,
            Debt: null,
            AccumulativePoint: null,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            ModifyDate: new Date(),
            ModifyBy: null,
            ApplyIncentives: null,
            PricePolicyDefault: null,
            TaxRateDefault: null,
            DiscountRateDefault: null,
            PaymentMethodDefault: null,
            PaymentScheduleDefault: null
        }

        $scope.UpdateVendors = UpdateVendors;
        $scope.GetVendorById = GetVendorById;
        $scope.getObjectCategory = getObjectCategory;
        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        $scope.getInwardStockByObjectID = getInwardStockByObjectID;
        $scope.listInwardStockByObjectID = [];
        $scope.displayHistory = 'none';
        $scope.deleteVoucher = deleteVoucher;

        $scope.displayAdvanceSetting = 'none';
        $scope.display_btn1 = 'block';
        $scope.display_btn2 = 'none';
        $scope.displayButton = displayButton;

        $scope.getPricePolicy = getPricePolicy;
        $scope.listPricePolicy = [];

        $scope.getPaymentSchedule = getPaymentSchedule;
        $scope.listPaymentSchedule = [];

        function displayButton() {
            if ($scope.display_btn1 === 'block') {
                $scope.display_btn1 = 'none';
                $scope.display_btn2 = 'block';
            } else {
                $scope.display_btn1 = 'block';
                $scope.display_btn2 = 'none';
            }
        }

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

        function deleteVoucher(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.get('api/purchaseInvoice/getbyid/' + id, null, function (result) {
                    var a = {};
                    a = result.data;
                    if (a.PaymentStatus === 0 && a.StockImportStatus === 0 && a.InvoiceExportStatus === 0) {
                        apiService.del('api/purchaseInvoice/deleteInwardStock', config, function () {
                            notificationService.displaySuccess('Xóa thành công');
                            $scope.GetVendorById();
                        }, function () {
                            notificationService.displayError('Xóa không thành công');
                        });
                    } else {
                        notificationService.displayWarning('Phiếu nhập đã phát sinh giao dịch. Không thể xóa phiếu nhập này !!');
                    }

                }, function () {
                    console.log('load items failed');
                });

            });
        }

        function getInwardStockByObjectID(id) {
            var config = {
                params: {
                    object_id: id
                }
            }
            apiService.get('api/purchaseInvoice/getbyObjectID', config, function (result) {
                $scope.listInwardStockByObjectID = result.data;
                if ($scope.listInwardStockByObjectID.length <= 0) {
                    $scope.displayHistory = 'none';
                } else {
                    $scope.displayHistory = 'block';
                }
                apiService.get('api/branch/getall', null, function (result) {
                    var listBranch = []
                    listBranch = result.data;
                    for (var i = 0; i < $scope.listInwardStockByObjectID.length; i++) {
                        for (var j = 0; j < listBranch.length; j++) {
                            if ($scope.listInwardStockByObjectID[i].BranchID === listBranch[j].BranchID) {
                                $scope.listInwardStockByObjectID[i].BranchName = 'Chi nhánh ' + listBranch[j].BranchName;
                            }
                        }
                    }
                }, function () {
                    console.log('load items failed');
                });
                for (var i in $scope.listInwardStockByObjectID) {
                    $scope.listInwardStockByObjectID[i].VendorName = $scope.vendors.ObjectName;
                    if ($scope.listInwardStockByObjectID[i].Status == 1) {
                        $scope.listInwardStockByObjectID[i].tt = "Đã nhập";
                        $scope.listInwardStockByObjectID[i].cs = "available";
                    }
                    if ($scope.listInwardStockByObjectID[i].Status == 0) {
                        $scope.listInwardStockByObjectID[i].tt = "Chờ nhập kho";
                        $scope.listInwardStockByObjectID[i].cs = "not-available";
                    }
                    if ($scope.listInwardStockByObjectID[i].Status == 2) {
                        $scope.listInwardStockByObjectID[i].tt = "Đang nhập kho";
                        $scope.listInwardStockByObjectID[i].cs = "blue";
                    }
                    if ($scope.listInwardStockByObjectID[i].INVoucherDate === null) {
                        $scope.listInwardStockByObjectID[i].INVoucherDate = '_ _ /_ _ /_ _';
                    }
                }

            }, function (error) {
                console.log(error.data);
            });
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

        function GetVendorById() {
            apiService.get('api/vendor/getbyid/' + $stateParams.id, null, function (result) {
                $scope.vendors = result.data;
                $scope.vendors.debt = Currency($scope.vendors.Debt);

                if ($scope.vendors.ApplyIncentives === 1 || $scope.vendors.ApplyIncentives === 3) {
                    $scope.displayAdvanceSetting = 'none';
                    $scope.vendors.ApplyIncentives = $scope.vendors.ApplyIncentives.toString();
                } else {
                    if ($scope.vendors.ApplyIncentives === 2) {
                        $scope.displayAdvanceSetting = 'block';
                        $scope.vendors.PaymentMethodDefault = $scope.vendors.PaymentMethodDefault.toString();
                        $scope.vendors.ApplyIncentives = $scope.vendors.ApplyIncentives.toString();
                    }
                }
                $scope.getInwardStockByObjectID($scope.vendors.ObjectID);

                $scope.getPricePolicy();
                $scope.getPaymentSchedule();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateVendors() {
            $scope.vendors.Debt = ConvertNumber($scope.vendors.debt);
            $scope.vendors.ApplyIncentives = Number($scope.vendors.ApplyIncentives);
            if ($scope.vendors.ApplyIncentives === 1 || $scope.vendors.ApplyIncentives === 3) {
                var objCat = {};
                apiService.get('api/objectCategory/getbyid/' + $scope.vendors.ObjectCategoryID, null, function (result) {
                    objCat = result.data;
                    $scope.vendors.PricePolicyDefault = objCat.PricePolicyDefault;
                    $scope.vendors.TaxRateDefault = objCat.TaxRateDefault;
                    $scope.vendors.DiscountRateDefault = objCat.DiscountRateDefault;
                    $scope.vendors.PaymentMethodDefault = objCat.PaymentMethodDefault;
                    $scope.vendors.PaymentScheduleDefault = objCat.PaymentScheduleDefault;

                    apiService.put('api/vendor/update', $scope.vendors,
                        function (result) {
                            notificationService.displaySuccess(/*result.data + */'Cập nhật thành công.');
                            $state.go('vendor');
                        }, function (error) {
                            notificationService.displayError('Cập nhật không thành công.');
                        });
                }, function () {
                    console.log('load items failed');
                });                
            } else {
                if ($scope.vendors.ApplyIncentives === 2) {
                    $scope.vendors.PricePolicyDefault = $scope.vendors.PricePolicyDefault;
                    $scope.vendors.TaxRateDefault = $scope.vendors.TaxRateDefault;
                    $scope.vendors.DiscountRateDefault = $scope.vendors.DiscountRateDefault;
                    $scope.vendors.PaymentScheduleDefault = $scope.vendors.PaymentScheduleDefault;
                    $scope.vendors.PaymentMethodDefault = Number($scope.vendors.PaymentMethodDefault);

                    apiService.put('api/vendor/update', $scope.vendors,
                        function (result) {
                            notificationService.displaySuccess(/*result.data + */'Cập nhật thành công.');
                            $state.go('vendor');
                        }, function (error) {
                            notificationService.displayError('Cập nhật không thành công.');
                        });
                }

            }
            
        }

        function getObjectCategory() {
            apiService.get('api/objectCategory/getallV', null, function (result) {

                $scope.listObjectCategory = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        getObjectCategory();
        GetVendorById();

    }
})(angular.module('tiktak.vendor'));