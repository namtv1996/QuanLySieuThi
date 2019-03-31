/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.primeCost', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('primeCost', {
            url: "/primeCost",
            parent: 'base',
            templateUrl: "/app/components/primeCost/primeCostView.html",
            controller: "primeCostController"
        }).state('primeCost_add', {
            url: "/primeCost_add",
            parent: 'base',
            templateUrl: "/app/components/primeCost/primeCostAddView.html",
            controller: "primeCostAddController"
        });
    }
})();