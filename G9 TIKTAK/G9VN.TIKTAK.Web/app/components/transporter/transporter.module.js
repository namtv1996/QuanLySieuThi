/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.transporter', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('transporter', {
            url: "/transporter",
            parent: 'base',
            templateUrl: "/app/components/transporter/transporterListView.html",
            controller: "transporterListController"
        }).state('transporter_add', {
            url: "/transporter_add",
            parent: 'base',
            templateUrl: "/app/components/transporter/transporterAddView.html",
            controller: "transporterAddController"
        }).state('transporter_detail', {
            url: "/transporter_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/transporter/transporterDetailView.html",
            controller: "transporterDetailController"
        });
    }
})();