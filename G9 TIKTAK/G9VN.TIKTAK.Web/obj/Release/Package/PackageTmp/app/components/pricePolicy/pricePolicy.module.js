/// <reference path="/Assets/admin/libs/angular/angular.js" />
/// <reference path="pricePolicyAddView.html" />

(function () {
    angular.module('tiktak.pricePolicy', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('pricePolicy', {
            url: "/pricePolicy",
            parent: 'base',
            templateUrl: "/app/components/pricePolicy/pricePolicyListView.html",
            controller: "pricePolicyListController"
        }).state('pricePolicy_add', {
            url: "/pricePolicy_add",
            parent: 'base',
            templateUrl: "/app/components/pricePolicy/pricePolicyAddView.html",
            controller: "pricePolicyAddController"
        }).state('pricePolicy_edit', {
            url: "/pricePolicy_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/pricePolicy/pricePolicyEditView.html",
            controller: "pricePolicyEditController"
        });
    }
})();