(function (app) {
    app.controller('customerCategoryAddController', customerCategoryAddController);
    customerCategoryAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function customerCategoryAddController(apiService, $scope, notificationService, $state) {
        $scope.customerCategory = {
            Name: null,
            Description: null,
            Status: true,
            CreateDate: new Date(),
            CreateBy: null,
            ObjectKind: 2,
            PricePolicyDefault: null,
            TaxRateDefault: 0,
            DiscountRateDefault: 0,
            PaymentMethodDefault: '1',
            PaymentScheduleDefault: null
        }

        $scope.AddCustomerCategory = AddCustomerCategory;

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

        function AddCustomerCategory() {
            if ($scope.customerCategory.Name !== null && $scope.customerCategory.Name !== '') {
                $scope.customerCategory.PaymentMethodDefault = Number($scope.customerCategory.PaymentMethodDefault);

                apiService.post('api/objectCategory/create', $scope.customerCategory,
                    function (result) {
                        notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                        $state.go('customerCategory');
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

        $scope.getPaymentSchedule();
        $scope.getPricePolicy();
    }
})(angular.module('tiktak.customerCategory'));