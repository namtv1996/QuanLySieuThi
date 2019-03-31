/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.itemTransfer', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('itemTransfer', {
            url: "/itemTransfer",
            parent: 'base',
            templateUrl: "/app/components/itemTransfer/itemTransferListView.html",
            controller: "itemTransferListController"
        }).state('itemTransfer_add', {
            url: "/itemTransfer_add",
            parent: 'base',
            templateUrl: "/app/components/itemTransfer/itemTransferAddView.html",
            controller: "itemTransferAddController"
        }).state('stockTransferDetail', {
            url: "/stockTransferDetail/:id",
            parent: 'base',
            templateUrl: "/app/components/itemTransfer/stockTransferDetailView.html",
            controller: "itemTransferDetailController"
        });
    }
})();