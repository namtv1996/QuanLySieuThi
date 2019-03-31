(function (app) {
    app.controller('pricePolicyAddController', pricePolicyAddController);
    pricePolicyAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function pricePolicyAddController(apiService, $scope, notificationService, $state) {
        $scope.pricePolicy = {
            PricePolicyCode: null,
            PricePolicyName: null,
            ApplyFor:null,
            Status: true,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null
            
        }

        $scope.AddPricePolicy = AddPricePolicy;

        function AddPricePolicy() {
            apiService.post('api/pricePolicy/create', $scope.pricePolicy,
                function (result) {
                    notificationService.displaySuccess('Chính sách '+ result.data.PricePolicyCode + ' đã được thêm mới.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
    }
})(angular.module('tiktak.pricePolicy'));