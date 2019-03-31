/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.object', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('objects', {
            url: "/objects",
            parent: 'base',
            templateUrl: "/app/components/objects/objectListView.html",
            controller: "objectListController"
        })
    }
})();