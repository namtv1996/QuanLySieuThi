/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.inwardStock', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('inwardStock', {
            url: "/inwardStock",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/inwardStockListView.html",
            controller: "inwardStockListController"
        }).state('inwardStock_add', {
            url: "/inwardStock_add",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/inwardStockAddView.html",
            controller: "inwardStockAddController"
        }).state('inwardStockDetails', {
            url: "/inwardStockDetails/:id",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/inwardStockDetailsView.html",
            controller: "inwardStockDetailsController"
        }).state('purchaseInv', {
            url: "/purchaseInv",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/purchaseInvoiceListView.html",
            controller: "purchaseInvoiceListController"
        }).state('purchaseInvAdd', {
            url: "/purchaseInvAdd/:id",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/purchaseInvoiceAddView.html",
            controller: "purchaseInvoiceAddController"
        }).state('partialStorage_add', {
            url: "/partialStorage_add/:id",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/partialStorageAddView.html",
            controller: "partialStorageAddController"
        }).state('purchaseInvDetail', {
            url: "/purchaseInvDetail/:id",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/purchaseInvoiceDetailView.html",
            controller: "purchaseInvoiceDetailController"
        }).state('inwardStockEdit', {
            url: "/inwardStockEdit/:id",
            parent: 'base',
            templateUrl: "/app/components/inwardStock/inwardStockEditView.html",
            controller: "inwardStockEditController"
        });
    }
})();