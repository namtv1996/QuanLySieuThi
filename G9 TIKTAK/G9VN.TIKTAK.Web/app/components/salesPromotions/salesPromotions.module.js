/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.salesPromotions', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('salesPromotions_list', {
            url: "/salesPromotions_list",
            parent: 'base',
            templateUrl: "/app/components/salesPromotions/salesPromotionsListView.html",
            controller: "salesPromotionsListController"
        }).state('salesPromotions_add', {
            url: "/salesPromotions_add",
            parent: 'base',
            templateUrl: "/app/components/salesPromotions/salesPromotionsAddView.html",
            controller: "salesPromotionsAddController"
        })
        .state('salesPromotions_menu', {
            url: "/salesPromotions_menu",
            parent: 'base',
            templateUrl: "/app/components/salesPromotions/salesPromotionsMenuView.html",
           // controller: "salesPromotionsMenuController"
        })
        .state('salesPromotions_detail', {
            url: "/salesPromotions_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/salesPromotions/salesPromotionDetailView.html",
            controller: "SalesPromotionDetailControler"
        }).state('salesPromotionsItem_Add', {
            url: "/salesPromotionsItem_Add",
            parent: 'base',
            templateUrl: "/app/components/salesPromotions/salesPromotionItemAddView.html",
            controller: "SalesPromotionItemAddControler"
        });
    }
})();