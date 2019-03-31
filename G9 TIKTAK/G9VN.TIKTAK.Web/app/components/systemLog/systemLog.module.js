/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.logs', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('logs', {
            url: "/logs",
            parent: 'base',
            templateUrl: "/app/components/systemLog/systemLogView.html",
            controller: "systemLogController"
        });
    }
})();