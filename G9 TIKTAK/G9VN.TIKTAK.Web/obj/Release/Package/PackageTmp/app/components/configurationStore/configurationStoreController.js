(function (app) {
    app.controller('configurationStoreController', configurationStoreController);
    configurationStoreController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function configurationStoreController(apiService, $scope, notificationService, $state) {    
        $scope.configStore_detail = {
         
        };
        $scope.listPricePolicy = [];
        $scope.listPaymentSchedule = [];

        $scope.getConfigByStore = getConfigByStore;
        var store = {};

        $scope.UpdateConfigStore = UpdateConfigStore;

        function UpdateConfigStore() {
            if ($scope.configStore_detail.ConfigurationStoreID === undefined) {
                var config = {};
                config.ManageStoreID = store.ManageStoreID;
                config.StoreName = store.StoreName;
                config.SaleTaxDefault = $scope.configStore_detail.SaleTaxDefault;
                config.PurchaseTaxDefault = $scope.configStore_detail.PurchaseTaxDefault;
                config.SalePricePolicyDefault = $scope.configStore_detail.SalePricePolicyDefault;
                config.PurchasePricePolicyDefault = $scope.configStore_detail.PurchasePricePolicyDefault;
                config.PaymentScheduleDefault = $scope.configStore_detail.PaymentScheduleDefault;
                config.PaymentMethodDefault = Number($scope.configStore_detail.PaymentMethodDefault);

                apiService.post('api/configStore/create', config, function (result) {    
                    notificationService.displaySuccess('Cấu hình thành công');
                    $state.go('pageSetting');
                }, function () {
                    console.log('config failed');
                });
            } else {
                $scope.configStore_detail.PaymentMethodDefault = Number($scope.configStore_detail.PaymentMethodDefault);
                apiService.put('api/configStore/updateConfig', $scope.configStore_detail, function (result) {
                    notificationService.displaySuccess('Cấu hình thành công');
                    $state.go('pageSetting');
                }, function () {
                    console.log('config failed');
                });
            }
        }
      
        function getConfigByStore() {
            apiService.get('api/account/store', null, function (result) {
                store = result.data;

                apiService.get('api/configStore/getConfig?manageStoreID=' + store.ManageStoreID, null, function (result) {
                    $scope.configStore_detail = result.data;
                    if (result.data !== null) {
                        $scope.configStore_detail.PaymentMethodDefault = $scope.configStore_detail.PaymentMethodDefault.toString();
                    }

                    apiService.get('api/pricePolicy/getall', null, function (result) {
                        $scope.listPricePolicy = result.data;

                    }, function () {
                        console.log('load items failed');
                    });

                    apiService.get('api/paymentSchedule/getall', null, function (result) {
                        $scope.listPaymentSchedule = result.data;

                    }, function () {
                        console.log('load items failed');
                    });
                }, function () {
                    console.log('load items failed');
                });
                
            }, function () {
                console.log('load items failed');
            });
            
        }

        $scope.getConfigByStore();
       
    }
})(angular.module('tiktak.configurationStore'));