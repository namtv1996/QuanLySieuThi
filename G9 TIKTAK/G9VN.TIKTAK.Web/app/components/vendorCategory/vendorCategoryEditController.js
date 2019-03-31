(function (app) {
    app.controller('vendorCategoryEditController', vendorCategoryEditController);
    vendorCategoryEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function vendorCategoryEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.vendorCategory = {
            Name: null,
            Description: null,
            Status: null,
           
            ModifyDate: new Date(),
            ModifyBy: null,
            CreateDate: null,
            PricePolicyDefault: null,
            TaxRateDefault: null,
            DiscountRateDefault: null,
            PaymentMethodDefault: null,
            PaymentScheduleDefault: null
        }

        $scope.UpdateVendorCategory = UpdateVendorCategory;
        $scope.GetById = GetById;
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

        function GetById() {
            apiService.get('api/objectCategory/getbyid/' + $stateParams.id, null, function (result) {
                $scope.vendorCategory = result.data;
                $scope.vendorCategory.CreateDate = new Date($scope.vendorCategory.CreateDate);
                if ($scope.vendorCategory.PaymentMethodDefault !== null) {
                    $scope.vendorCategory.PaymentMethodDefault = $scope.vendorCategory.PaymentMethodDefault.toString();
                }
                $scope.getPricePolicy();
                $scope.getPaymentSchedule();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateVendorCategory() {
            $scope.vendorCategory.PaymentMethodDefault = Number($scope.vendorCategory.PaymentMethodDefault);

            apiService.put('api/objectCategory/update', $scope.vendorCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('vendorCategory');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {

                $scope.listPP = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

       
        $scope.GetById();
    }
})(angular.module('tiktak.vendorCategory'));