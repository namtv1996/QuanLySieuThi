/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.deliveryOrder', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('deliveryOrder', {
            url: "/deliveryOrder",
            parent: 'base',
            templateUrl: "/app/components/deliveryOrder/deliveryOrderListView.html",
            controller: "deliveryOrderListController"
        }).state('deliveryOrder_detail', {
            url: "/deliveryOrder_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/deliveryOrder/deliveryOrderDetailView.html",
            controller: "deliveryOrderDetailController"
        });
    }
})();