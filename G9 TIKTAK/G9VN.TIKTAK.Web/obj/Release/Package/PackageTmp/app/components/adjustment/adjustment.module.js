/// <reference path="adjustmentListView.html" />
/// <reference path="/Assets/admin/libs/angular/angular.js" />
/// <reference path="adjustmentAddView.html" />

(function () {
    // khai bao module  so tien mat
    angular.module('tiktak.adjustment', ['tiktak.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        //khai báo url, đường dẫn tài nguyên, controller của module
        // danh sach phieu thu
        $stateProvider.state('adjustment', {
            url: "/adjustment",
            parent: 'base',
            templateUrl: "/app/components/adjustment/adjustmentListView.html",
            controller: "adjustmentListController"
        }).state('adjustment_add', {
            url: '/adjustment_add',
            parent: 'base',
            templateUrl: "/app/components/adjustment/adjustmentAddView.html",
            controller: "adjustmentAddController"
        }).state('adjustmentDetails', {
            url: "/adjustmentDetails/:id",
            parent: 'base',
            templateUrl: "/app/components/adjustment/adjustmentDetailsView.html",
            controller: "adjustmentDetailsController"
        }).state('adjustment_edit', {
            url: "/adjustment_edit/:id",
            parent: 'base',
            templateUrl: "/app/components/adjustment/adjustmentEditView.html",
            controller: "adjustmentEditController"
        });
    }

})();