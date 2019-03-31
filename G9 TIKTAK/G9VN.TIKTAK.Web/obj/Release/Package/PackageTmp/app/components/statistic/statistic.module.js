/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.items', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('statistic_byendday', {
                url: "/statistic_byendday",
                parent: 'base',
                templateUrl: "/app/components/statistic/byEndayStatisticView.html",
                controller: "byEndDayStatisticController"
            });
    }
})();