/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.items', ['tiktak.common', 'akFileUploader']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('items', {
            url: "/items",
            parent: 'base',
            templateUrl: "/app/components/items/itemListView.html",
            controller: "itemListController"
        }).state('items_add', {
            url: "/items_add",
            parent: 'base',
            templateUrl: "/app/components/items/itemAddView.html",
            controller: "itemAddController"
        }).state('items_edit', {
            url: "/items_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/items/itemEditView.html",
            controller: "itemEditController"
        }).state('items_view', {
            url: "/items_view/:id",
            parent: 'base',
            templateUrl: "/app/components/items/itemViewDetail.html",
            controller: "itemViewDetailController"
        });
    }
})();