/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.vendor', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('vendor', {
            url: "/vendor",
            parent: 'base',
            templateUrl: "/app/components/vendor/vendorListView.html",
            controller: "vendorListController"
        }).state('vendor_add', {
            url: "/vendor_add",
            parent: 'base',
            templateUrl: "/app/components/vendor/vendorAddView.html",
            controller: "vendorAddController"
        }).state('vendor_edit', {
            url: "/vendor_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/vendor/vendorEditView.html",
            controller: "vendorEditController"
        });
    }
})();