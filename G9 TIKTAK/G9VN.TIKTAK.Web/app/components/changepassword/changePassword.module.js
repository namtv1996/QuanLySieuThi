(function () {
    angular.module('tiktak.changepassword', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('changepassword', {
            url: "/changepassword",
            parent: 'base',
            templateUrl: "/app/components/changepassword/changePasswordView.html",
            controller: "changePasswordController"
        });
    }
})();