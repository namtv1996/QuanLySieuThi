(function (app) {
    app.controller('customerCategoryEditController', customerCategoryEditController);
    customerCategoryEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function customerCategoryEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.customerCategory = {
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

        $scope.UpdateCustomerCategory = UpdateCustomerCategory;
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
                $scope.customerCategory = result.data;

                $scope.customerCategory.CreateDate = new Date($scope.customerCategory.CreateDate);
                if ($scope.customerCategory.PaymentMethodDefault !== null) {
                    $scope.customerCategory.PaymentMethodDefault = $scope.customerCategory.PaymentMethodDefault.toString();
                }
                $scope.getPricePolicy();
                $scope.getPaymentSchedule();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateCustomerCategory() {
            apiService.put('api/objectCategory/update', $scope.customerCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('customerCategory');
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
})(angular.module('tiktak.customerCategory'));