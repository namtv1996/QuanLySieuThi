(function (app) {
    app.controller('vendorCategoryAddController', vendorCategoryAddController);
    vendorCategoryAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function vendorCategoryAddController(apiService, $scope, notificationService, $state) {
        $scope.vendorCategory = {
            Name: null,
            Description: null,
            Status: true,
            CreateDate: new Date(),
            CreateBy: null,
            ObjectKind: 1,
            PricePolicyDefault: null,
            TaxRateDefault: 0,
            DiscountRateDefault: 0,
            PaymentMethodDefault: '1',
            PaymentScheduleDefault:null
        }

        $scope.AddVendorCategory = AddVendorCategory;

        $scope.getPricePolicy = getPricePolicy;
        $scope.listPP = [];

        $scope.getPaymentSchedule = getPaymentSchedule;
        $scope.listPaymentSchedule = [];

        function getPaymentSchedule() {
            apiService.get('api/paymentSchedule/getall', null, function (result) {
                $scope.listPaymentSchedule = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function AddVendorCategory() {
            if ($scope.vendorCategory.Name !== null || $scope.vendorCategory.Name !== '') {
                $scope.vendorCategory.PaymentMethodDefault = Number($scope.vendorCategory.PaymentMethodDefault);
                apiService.post('api/objectCategory/create', $scope.vendorCategory,
                    function (result) {
                        notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                        $state.go('vendorCategory');
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    }
                );
            } else {
                notificationService.displayWarning('Bạn cần điền đầy đủ thông tin !!');

            }
            
        }

        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {

                $scope.listPP = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.getPricePolicy();
        $scope.getPaymentSchedule();
    }
})(angular.module('tiktak.vendorCategory'));