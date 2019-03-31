/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.pageSetting', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('pageSetting', {
            url: "/pageSetting",
            parent: 'base',
            templateUrl: "/app/components/pageSetting/pageSettingView.html",
            controller: "pageSettingController"
            
            
        });
    }
})();