
(function () {
    angular.module('tiktak.barcode', ['tiktak.common','angular-barcode']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('barcode', {
            url: "/barcode",
            parent: 'base',
            templateUrl: "/app/components/createBarcode/createBarcodeView.html",
            controller: "createBarcodeController"
        });
    }
})();