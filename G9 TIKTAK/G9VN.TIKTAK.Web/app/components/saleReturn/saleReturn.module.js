/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.saleReturn', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('saleReturn', {
            url: "/saleReturn",
            parent: 'base',
            templateUrl: "/app/components/saleReturn/saleReturnListView.html",
            controller: "saleReturnListController"
        }).state('saleReturn_add', {
            url: "/saleReturn_add/:id",
            parent: 'base',
            templateUrl: "/app/components/saleReturn/saleReturnAddView.html",
            controller: "saleReturnAddController"
        }).state('saleReturn_detail', {
            url: "/saleReturn_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/saleReturn/saleReturnDetailView.html",
            controller: "saleReturnDetailController"
        });
    }
})();