/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.itemadjustment', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('itemadjustment', {
            url: "/itemadjustment",
            parent: 'base',
            templateUrl: "/app/components/itemadjustment/itemadjustmentListView.html",
            controller: "itemadjustmentListController"
        }).state('itemadjustment_add', {
            url: "/itemadjustment_add",
            parent: 'base',
            templateUrl: "/app/components/itemadjustment/itemadjustmentAddView.html",
            controller: "itemadjustmentAddController"
        });
    }
})();