/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    var app=angular.module('tiktak.printedForm', ['tiktak.common']);
    app.config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('printedForm', {
            url: "/printedForm",
            parent: 'base',
            templateUrl: "/app/components/printedForm/printedFormView.html",
            controller: "printedFormController"
        });
    }
})();
