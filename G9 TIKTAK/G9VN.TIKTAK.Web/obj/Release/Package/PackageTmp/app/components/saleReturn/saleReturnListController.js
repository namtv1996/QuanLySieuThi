(function (app) {
    app.controller('saleReturnListController', saleReturnListController);

    saleReturnListController.$inject = ['$scope', 'apiService','notificationService'];
    function saleReturnListController($scope, apiService, notificationService) {

        $scope.getSaleReturn = getSaleReturn;
        $scope.listSaleReturn = [];
        $scope.getCustomer = getCustomer;
              
        function getCustomer() {
            apiService.get('api/Customer/getall', null, function (result) {
                var listCustomer = [];
                listCustomer = result.data;
                for (var i = 0; i < $scope.listSaleReturn.length; i++) {
                    for (var j = 0; j < listCustomer.length; j++) {
                        if ($scope.listSaleReturn[i].ObjectID === listCustomer[j].ObjectID) {
                            $scope.listSaleReturn[i].CustomerName = listCustomer[j].ObjectName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getSaleReturn() {
            apiService.get('api/saleOrder/getSaleReturn', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listSaleReturn = result.data;
                
                $scope.getCustomer();
                for (var i in $scope.listSaleReturn) {
                    
                    //chưa nhận hàng, chưa hoàn tiền
                    if ($scope.listSaleReturn[i].StatusID === 0) {
                        $scope.listSaleReturn[i].status = "Đang nhận";
                        $scope.listSaleReturn[i].import = "not-available";
                        $scope.listSaleReturn[i].payment = 'fa fa-circle-o';
                    }
                    //nhận hàng, chưa hoàn tiền
                    if ($scope.listSaleReturn[i].StatusID === 1) {
                        $scope.listSaleReturn[i].status = "Đã nhận";
                        $scope.listSaleReturn[i].import = "available";
                        $scope.listSaleReturn[i].payment = 'fa fa-circle-o';
                    }
                    //chưa nhận hàng, đã hoàn tiền toàn bộ
                    if ($scope.listSaleReturn[i].StatusID === 2) {
                        $scope.listSaleReturn[i].status = "Đang nhận";
                        $scope.listSaleReturn[i].import = "not-available";
                        $scope.listSaleReturn[i].payment = 'fa fa-check-circle-o';
                    }
                    //chưa nhận hàng, hoàn tiền 1 phần
                    if ($scope.listSaleReturn[i].StatusID === 3) {
                        $scope.listSaleReturn[i].status = "Đang nhận";
                        $scope.listSaleReturn[i].import = "not-available";
                        $scope.listSaleReturn[i].payment = 'fa fa-adjust';
                    }
                    //nhận hàng, hoàn tiền 1 phần
                    if ($scope.listSaleReturn[i].StatusID === 4) {
                        $scope.listSaleReturn[i].status = "Đã nhận";
                        $scope.listSaleReturn[i].import = "available";
                        $scope.listSaleReturn[i].payment = 'fa fa-adjust';
                    }
                    //nhận hàng, hoàn tiền toàn bộ
                    if ($scope.listSaleReturn[i].StatusID === 5) {
                        $scope.listSaleReturn[i].status = "Đã nhận";
                        $scope.listSaleReturn[i].import = "available";
                        $scope.listSaleReturn[i].payment = 'fa fa-check-circle-o';
                    }
                }
               
            }, function () {
                console.log('load data failed');
            });
        }
        $scope.getSaleReturn();


    }
})(angular.module('tiktak.saleReturn'));