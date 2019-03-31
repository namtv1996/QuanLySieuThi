/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.deliveryCost', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('deliveryCost', {
            url: "/deliveryCost",
            parent: 'base',
            templateUrl: "/app/components/deliveryCost/deliveryCostListView.html",
            controller: "deliveryCostController"
        }).state('appmenu', {
            url: "/appmenu",
            parent: 'base',
            templateUrl: "/app/components/deliveryCost/appmenuView.html",
        });
    }
})();