//// <reference path="/Assets/admin/libs/angular/angular.js" />
(function () {
    angular.module('tiktak.reportStock', ['tiktak.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('reportStock', {
            url: "/reportStock",
            parent: 'base',
            templateUrl: "/app/components/reportStock/reportStockView.html",
            controller: "reportStockController"
            }).state('reportsInventories', {
                url: "/reportsInventories",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportsInventoriesView.html",
                controller: "reportsInventoriesController"
            }).state('reportInventoriesTransaction', {
                url: "/reportInventoriesTransaction",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportInventoriesTransactionView.html",
                controller: "reportInventoriesTransactionController"
            }).state('reportInventoriesLowRate', {
                url: "/reportInventoriesLowRate",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportInventoriesLowRateView.html",
                controller: "reportInventoriesLowRateController"
            }).state('reportInventorietExportImportOnhand', {
                url: "/reportInventorietExportImportOnhand",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportInventorietExportImportOnhandView.html",
                controller: "reportInventorietExportImportOnhandController"
            }).state('reportInventoriesHighRate', {
                url: "/reportInventoriesHighRate",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportInventoriesHighRateView.html",
                controller: "reportInventoriesHighRateController"
            }).state('reportsInventoriesStockAdjustments', {
                url: "/reportsInventoriesStockAdjustments",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportsInventoriesStockAdjustmentsView.html",
                controller: "reportsInventoriesStockAdjustmentsController"
            }).state('reportRecommendPurchaseOrder', {
                url: "/reportRecommendPurchaseOrder",
                parent: 'base',
                templateUrl: "/app/components/reportStock/reportRecommendPurchaseOrderView.html",
                controller: "reportRecommendPurchaseOrderController"
            });
    }
})();