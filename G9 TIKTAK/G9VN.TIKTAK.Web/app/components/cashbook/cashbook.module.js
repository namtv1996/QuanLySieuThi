
/// <reference path="receiptListView.html" />
/// <reference path="/Assets/admin/libs/angular/angular.js" />
/// <reference path="receiptAddView.html" />

(function () {
    // khai bao module  so tien mat
    angular.module('tiktak.cashbook', ['tiktak.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        //khai báo url, đường dẫn tài nguyên, controller của module

        // danh sach phieu thu
        $stateProvider.state('receipt', {
            url: "/receipt",
            parent: 'base',
            templateUrl: "/app/components/cashbook/receiptListView.html",
            controller: "receiptListController"
            //them phieu thu
        }).state('receipt_add', {
            url: '/receipt_add',
            parent: 'base',
            templateUrl: "/app/components/cashbook/receiptAddView.html",
            controller: 'receiptAddController'
            //danh sach loai phieu thu
        }).state('receipttype', {
            url: '/receipttype',
            parent: 'base',
            templateUrl: "/app/components/cashbook/receiptTypeListView.html"
            //them moi loai phieu thu
        }).state('receipttype_add', {
            url: "/receipttype_add",
            parent: 'base',
            templateUrl: "/app/components/cashbook/receiptTypeAddView.html",

            //chi tiết phiếu thu
        }).state('receipt_detail', {
            url: "/receipt_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/cashbook/receiptDetailView.html",
            controller: "receiptDetailController"
            //danh sach phieu chi
        }).state('cashPayment', {
            url: "/cashPayment",
            parent: 'base',
            templateUrl: "/app/components/cashbook/cashPaymentListView.html",
            controller: "cashPaymentController"
            //them phieu chi
        }).state('cashpayment_add', {
            url: '/cashpayment_add',
            parent: 'base',
            templateUrl: "/app/components/cashbook/cashPaymentAddView.html",
            controller: "cashPaymentAddController"
            //danh sach loai phieu chi
        }).state('cashPaymentType', {
            url: "/cashPaymentType",
            parent: 'base',
            templateUrl: "/app/components/cashbook/cashPaymentTypeListView.html",
            controller: "cashPaymentTypetListController"
            //them loai phieu chi
        }).state('cashpaymenttype_add', {
            url: "/cashpaymenttype_add",
            parent: 'base',
            templateUrl: "/app/components/cashbook/cashPaymentTypeAddView.html"
        }).state('cashpaymenttype_detail', {
            url: "/cashpaymenttype_detail/:id",
            parent: 'base',
            templateUrl: "/app/components/cashbook/cashPaymentDetailView.html",
            controller: "cashPaymentDetailController"
        });
    }

})();