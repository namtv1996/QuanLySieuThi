// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tiktak', 
        ['tiktak.common', 'tiktak.items', 'tiktak.vendor', 'tiktak.vendorCategory', 'tiktak.employee',
           'tiktak.saleOrder', 'tiktak.deliveryOrder', 'tiktak.customer',
            'tiktak.customerCategory', 'tiktak.cashbook', 'tiktak.adjustment',
            'tiktak.inwardStock', 'tiktak.itemTransfer', 'tiktak.primeCost',
            'tiktak.salesPromotions', 'tiktak.saleReturn', 'tiktak.logs', 'tiktak.printedForm',
            'tiktak.purchaseReturn', 'tiktak.itemOption', 'tiktak.branch', 'tiktak.paymentSchedule',
            'tiktak.pricePolicy','tiktak.deliveryCost', 'tiktak.pageSetting', 'tiktak.reportFinance',
            'tiktak.reportSales', 'tiktak.reportStock', 'tiktak.application_groups',
            'tiktak.application_roles', 'tiktak.application_users', 'tiktak.barcode', 'tiktak.changepassword',
            'tiktak.configurationStore','tiktak.transporter'

        ])
        .config(config)
        .config(configAuthentication)
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }])
        //.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        //    cfpLoadingBarProvider.includeBar = true;
        //}])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.latencyThreshold = 100; // Thiết lập thời gian tối thiểu
        }])
        //.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        //    cfpLoadingBarProvider.parentSelector = '#loading-bar-container'; // Cây DOM mà sẽ chưa cái thanh chạy
        //    cfpLoadingBarProvider.spinnerTemplate = '<div class="modal fade in ng-scope" role="dialog" style="display: block; padding-left: 17px"><div class="row" style="margin-top:0px !important;background: rgba(0, 0, 0, .2);height:6%;"><div><div><div class="spi"><div></div><div></div><div></div><div></div></div></div></div></div></div>'; // HTML của cái cục tròn tròn
        //}])
        .constant('ngAuthSettings', {
            apiServiceBaseUri: '',
            clientId: 'ngAuthApp'
        })

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('base', {
                url: '',
                templateUrl: "app/shared/views/baseView.html",
                abstract: true
            })
            .state('notification', {
                url: '/notification',
                templateUrl: "/app/components/notification/tiktacNotification.html",
               // controller: "loginController"
            })
            
            .state('login', {
                url: '/login',
                parent: 'base',
                templateUrl: "/app/components/login/loginView.html",
                controller: "loginController"
            })
            .state('posOrder', {
                url: '/posOrder',
                templateUrl: "/app/components/posOrders/posOrderView.html",
                controller: "posOrderController"
            })
            .state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/app/components/home/homeView.html",
                controller: "homeController"
            });
        $urlRouterProvider.otherwise('/login');
    }

    function configAuthentication($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                request: function (config) {

                    return config;
                },
                requestError: function (rejection) {

                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (response.status == "401") {
                        $location.path('/login');
                    }
                    //the same response/modified/or a new one need to be returned.
                    return response;
                },
                responseError: function (rejection) {

                    if (rejection.status == "401") {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }
})();
