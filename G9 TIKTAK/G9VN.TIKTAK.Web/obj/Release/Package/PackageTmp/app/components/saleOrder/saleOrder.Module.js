/// <reference path="SaleOrderEditView.html" />
/// <reference path="../../../Assets/admin/js/dirPagination.js" />
/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.saleOrder', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('saleOrder', {
            url: "/saleOrder",
            parent: 'base',
            templateUrl: "/app/components/saleOrder/saleOrderListView.html",
            controller: "saleOrderListController"
        }).state('saleOrder_add', {
            url: "/saleOrder_add",
            parent: 'base',
            templateUrl: "/app/components/saleOrder/saleOrderAddView.html",
            controller: "saleOrderAddController"
        }).state('saleOrder_Detail', {
            url: "/saleOrder_Detail/:id",
            parent: 'base',
            templateUrl: "/app/components/saleOrder/saleOrderDetailView.html",
            controller: "saleOrderDetailController"
        }).state('saleOrder_Edit', {
            url: "/saleOrder_Edit/:id",
            parent: 'base',
            templateUrl: '/app/components/saleOrder/saleOrderEditView.html',
            controller: 'saleOrderEditController'
            }).state('saleOrdersReturns', {
                url: "/saleOrdersReturns/:id",
                parent: 'base',
                templateUrl: '/app/components/saleOrder/saleOrdersReturnsView.html',
               controller: 'saleOrdersReturnsController'
            }).state('saleOrdersReturnsList', {
                url: "/saleOrdersReturnsList",
                parent: 'base',
                templateUrl: '/app/components/saleOrder/saleOrdersReturnsListView.html',
                controller: 'saleOrdersReturnsListController'
            }).state('saleOrdersReturnsAdd', {
                url: "/saleOrdersReturnsAdd",
                parent: 'base',
                templateUrl: '/app/components/saleOrder/saleOrdersReturnsAddView.html',
                controller: 'saleOrdersReturnsAddController'
            }).state('packingSlipsDetail', {
                url: '/packingSlipsDetail/:id',
                parent: 'base',
                templateUrl: '/app/components/saleOrder/packingSlipsDetailView.html',
                controller:'packingSlipsDetailController'
            }).state('getByVoucherNo', {
                url: '/getByVoucherNo/:voucherNo',
                parent: 'base',
                templateUrl: '/app/components/saleOrder/saleOrderDetailView.html',
               
            }).state('packingSlipsAdd', {
                url: '/packingSlipsAdd',
                parent: 'base',
                templateUrl: 'app/components/saleOrder/packingSlipsAddView.html',
                controller: 'packingSlipsAddController'
            });

    }
})();