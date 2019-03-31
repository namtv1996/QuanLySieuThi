/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.paymentSchedule', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('paymentSchedule', {
            url: "/paymentSchedule",
            parent: 'base',
            templateUrl: "/app/components/paymentSchedule/paymentScheduleListView.html",
            controller: "paymentScheduleListController"
        }).state('paymentSchedule_add', {
            url: "/paymentSchedule_add",
            parent: 'base',
            templateUrl: "/app/components/paymentSchedule/paymentScheduleAddView.html",
            controller: "paymentScheduleAddController"
        }).state('paymentSchedule_edit', {
            url: "/paymentSchedule_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/paymentSchedule/paymentScheduleEditView.html",
            controller: "paymentScheduleEditController"
        });
    }
})();