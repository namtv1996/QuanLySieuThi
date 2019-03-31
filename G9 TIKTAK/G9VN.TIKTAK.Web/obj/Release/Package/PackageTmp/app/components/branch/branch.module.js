/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    var pa = angular.module('tiktak.branch', ['tiktak.common']);
    pa.config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('branch', {
            url: "/branch",
            parent: 'base',
            templateUrl: "/app/components/branch/branchListView.html",
            controller: "branchListController"
        }).state('branch_add', {
            url: "/branch_add",
            parent: 'base',
            templateUrl: "/app/components/branch/branchAddView.html",
            controller: "branchAddController"
        }).state('branch_edit', {
            url: '/branch_edit/:id',
            parent: 'base',
            templateUrl: "/app/components/branch/branchEditView.html",
            controller:"branchEditController"
        });
    }
})();