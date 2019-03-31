/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.vendorCategory', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('vendorCategory', {
            url: "/vendorCategory",
            parent: 'base',
            templateUrl: "/app/components/vendorCategory/vendorCategoryListView.html",
            controller: "vendorCategoryListController"
        }).state('vendorCategory_add', {
            url: "/vendorCategory_add",
            parent: 'base',
            templateUrl: "/app/components/vendorCategory/vendorCategoryAddView.html",
            controller: "vendorCategoryAddController"
        }).state('vendorCategory_edit', {
            url: "/vendorCategory_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/vendorCategory/vendorCategoryEditView.html",
            controller: "vendorCategoryEditController"
        });
    }
})();