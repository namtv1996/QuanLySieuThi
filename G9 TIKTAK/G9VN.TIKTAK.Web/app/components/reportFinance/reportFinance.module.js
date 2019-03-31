/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.reportFinance', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('reportFinance', {
            url: "/reportFinance",
            parent: 'base',
            templateUrl: "/app/components/reportFinance/reportFinanceView.html",
            controller: "reportFinanceController"

        }).state('reportsProfit', {
            url: "/reportsProfit",
            parent: 'base',
            templateUrl: "/app/components/reportFinance/reportsProfitView.html",
            controller: "reportsProfitController"

        }).state('reportVouchers', {
            url: "/reportVouchers",
            parent: 'base',
            templateUrl: "/app/components/reportFinance/reportVouchersView.html",
            controller: "reportVouchersController"

        }).state('reportDebtsCustomers', {
            url: "/reportDebtsCustomers",
            parent: 'base',
            templateUrl: "/app/components/reportFinance/reportDebtsCustomersView.html",
            controller: "reportDebtsCustomersController"

        }).state('reportDebtsSuppliers', {
            url: "/reportDebtsSuppliers",
            parent: 'base',
            templateUrl: "/app/components/reportFinance/reportDebtsSuppliersView.html",
            controller: "reportDebtsSuppliersController"

        });
    }
})();