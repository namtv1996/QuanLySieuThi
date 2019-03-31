(function (app) {
    app.controller('pricePolicyEditController', pricePolicyEditController);
    pricePolicyEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function pricePolicyEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.pricePolicy = {
            
            PricePolicyCode: null,
            PricePolicyName: null,
            Status: null,
            Description: null,
            ModifyDate: new Date(),
            ModifyBy: null
        }

        $scope.UpdatePricePolicy = UpdatePricePolicy;
        $scope.GetById = GetById;
       
        function GetById() {
            apiService.get('api/pricePolicy/getbyid/' + $stateParams.id, null, function (result) {
                $scope.pricePolicy = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdatePricePolicy() {
            apiService.put('api/pricePolicy/update', $scope.pricePolicy,
                function (result) {
                    notificationService.displaySuccess('Chính sách ' + result.data.PricePolicyCode + ' đã được cập nhật.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
     
        GetById();
    }
})(angular.module('tiktak.pricePolicy'));