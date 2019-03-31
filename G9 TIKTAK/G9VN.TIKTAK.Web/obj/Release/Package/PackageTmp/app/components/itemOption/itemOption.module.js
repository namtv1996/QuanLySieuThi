/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.itemOption', ['tiktak.common', 'angular-barcode', 'akFileUploader']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('itemOption', {
            url: "/itemOption",
            parent: 'base',
            templateUrl: "/app/components/itemOption/itemOptionListView.html",
            controller: "itemOptionListController"
        }).state('itemOption_add', {
            url: "/itemOption_add/:id",
            parent: 'base',
            templateUrl: "/app/components/itemOption/itemOptionAddView.html",
            controller: "itemOptionAddController"
        }).state('combo_Add', {
            url: "/combo_Add/:id",
            parent: 'base',
            templateUrl: "/app/components/itemOption/comboAddView.html",
            controller: "comboAddController"
        }).state('itemOption_edit', {
            url: "/itemOption_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/itemOption/itemOptionEditView.html",
            controller: "itemOptionEditController"
        });
    }
})();