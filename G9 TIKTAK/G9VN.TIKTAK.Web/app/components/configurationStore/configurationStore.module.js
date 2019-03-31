/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.configurationStore', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('configurationStore', {
            url: "/configurationStore",
            parent: 'base',
            templateUrl: "/app/components/configurationStore/configurationStoreView.html",
            controller: "configurationStoreController"
        });
    }
})();
