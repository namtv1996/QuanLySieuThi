//<reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.purchaseReturn', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('purchaseReturn', {
            url: "/purchaseReturn",
            parent: 'base',
            templateUrl: "/app/components/purchaseReturn/purchaseReturnListView.html",
            controller: "purchaseReturnListController"
        }).state('purchaseReturnDetail', {
            url: "/purchaseReturnDetail/:id",
            parent: 'base',
            templateUrl: "/app/components/purchaseReturn/purchaseReturnDetail.html",
            controller: "purchaseReturnDetailController"
        }).state('purchaseReturnAdd', {
            url: "/purchaseReturnAdd/:id",
            parent: 'base',
            templateUrl: "/app/components/purchaseReturn/purchaseReturnAddView.html",
            controller: "purchaseReturnAddController"
        }).state('purchaseReturn_add', {
            url: "/purchaseReturn_add/:id",
            parent: 'base',
            templateUrl: "/app/components/purchaseReturn/purchaseReturnAddPlusView.html",
            controller: "purchaseReturnAddPlusController"
        });
    }
})();