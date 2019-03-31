(function (app) {
    app.controller('vendorAddController', vendorAddController);
    vendorAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function vendorAddController(apiService, $scope, notificationService, $state) {
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
                    apiService.get('api/objectCategory/getbyid/' + $scope.vendors.ObjectCategoryID, null, function (result) {
                        $scope.vendors.PricePolicyDefault = result.data.PricePolicyDefault;
                        $scope.vendors.TaxRateDefault = result.data.TaxRateDefault;
                        $scope.vendors.DiscountRateDefault = result.data.DiscountRateDefault;
                        $scope.vendors.PaymentMethodDefault = result.data.PaymentMethodDefault;
                        $scope.vendors.PaymentScheduleDefault = result.data.PaymentScheduleDefault;
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
                    }
                }
                apiService.post('api/vendor/create', $scope.vendors,
                    function (result) {
                        notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                        $state.go('vendor');
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

    }
})(angular.module('tiktak.vendor'));