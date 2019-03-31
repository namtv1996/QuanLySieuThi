/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.customer', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('customer', {
            url: "/customer",
            parent: 'base',
            templateUrl: "/app/components/customer/customerListView.html",
            controller: "customerListController"
        }).state('customer_add', {
            url: "/customer_add",
            parent: 'base',
            templateUrl: "/app/components/customer/customerAddView.html",
            controller: "customerAddController"
        }).state('customer_edit', {
            url: "/customer_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/customer/customerEditVew.html",
            controller: "customerEditController"
        });
    }
})();