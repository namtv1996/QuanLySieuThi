/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.reportSales', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('reportSales', {
            url: "/reportSales",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesView.html",
            controller: "reportSalesController"

        }).state('reportSalesDetail', {
            url: "/reportSalesDetail",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesDetailView.html",
            controller: "reportSalesDetailController"

        }).state('reportSalesByDate', {
            url: "/reportSalesByDate",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesByDateView.html",
            controller: "reportSalesByDateController"

        }).state('reportSalesShipments', {
            url: "/reportSalesShipments",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesShipmentsView.html",
            controller: "reportSalesShipmentsController"

        }).state('reportSalesOrders', {
            url: "/reportSalesOrders",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesOrdersView.html",
            controller: "reportSalesOrdersController"

        }).state('reportSalesByVariant', {
            url: "/reportSalesByVariant",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesByVariantView.html",
            controller: "reportSalesByVariantController"

        }).state('reportSalesByLocation', {
            url: "/reportSalesByLocation",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSalesByLocationView.html",
            controller: "reportSalesByLocationController"

        }).state('reportOrderReturnsByDate', {
            url: "/reportOrderReturnsByDate",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportOrderReturnsByDateView.html",
            controller: "reportOrderReturnsByDateController"

        }).state('reportSaleByAccount', {
            url: "/reportSaleByAccount",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSaleByAccountView.html",
            controller: "reportSaleByAccountController"

        }).state('reportSaleBySource', {
            url: "/reportSaleBySource",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSaleBySourceView.html",
            controller: "reportSaleBySourceController"

        }).state('reportSaleByCustomer', {
            url: "/reportSaleByCustomer",
            parent: 'base',
            templateUrl: "/app/components/reportSales/reportSaleByCustomerView.html",
            controller: "reportSaleByCustomerController"

        });
    }
})();