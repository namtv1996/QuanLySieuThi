(function (app) {
    app.controller('pageSettingController', pageSettingController);
    pageSettingController.$inject = ['$scope', 'apiService', 'notificationService', '$state', 'akFileUploaderService'];
    function pageSettingController($scope, apiService, notificationService, $state, akFileUploaderService) {
        $scope.updateStore = updateStore;
        $scope.account = {}
        function loadDetail() {
            apiService.get('api/account/store', null, function (result) {
                $scope.store = result.data;
                if ($scope.store.Logo == null || $scope.store.Logo == '') {
                    $scope.store.Logo = '../../../Assets/admin/img/shop_store_market_shopping_cafe_retail_sale_trading_trade_products_commerce_marketplace_bar_bistro_grocery_building_service_business_flat_design_icon-512.png';
                } else {
                    $scope.store.Logo = result.data.Logo;
                }
            });
        }
        function updateStore(store) {
            akFileUploaderService.updateModel(store, '/api/ManageStore/updateImgStore').then(function (result) { notificationService.displaySuccess('Cập nhật thành công.'); });
            
        }
        loadDetail();
    }


})(angular.module('tiktak.pageSetting'));



