/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak.employee', ['tiktak.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('employee', {
            url: "/employee",
            parent: 'base',
            templateUrl: "/app/components/employee/employeeListView.html",
            controller: "employeeListController"
        }).state('employee_add', {
            url: "/employee_add",
            parent: 'base',
            templateUrl: "/app/components/employee/employeeAddView.html",
            controller: "employeeAddController"
        }).state('employee_edit', {
            url: "/employee_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/employee/employeeEditView.html",
            controller: "employeeEditController"
        });
    }
})();