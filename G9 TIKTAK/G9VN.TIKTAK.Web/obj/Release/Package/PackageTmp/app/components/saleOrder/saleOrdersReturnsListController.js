(function (app) {
    app.controller('saleOrdersReturnsListController', saleOrdersReturnsListController);

    saleOrdersReturnsListController.$inject = ['$scope', 'apiService', 'notificationService'];
    function saleOrdersReturnsListController($scope, apiService, notificationService) {
        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        $scope.tong = 0;

        function getSaleOrder() {
           
            apiService.get('api/saleOrder/getbystatusID/' + 11, null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có đơn hàng trả nào nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                    $scope.listSaleOrder = result.data;

                }
                
                
                apiService.get('api/Customer/getall', null, function (result) {
                    for (var i in result.data) {
                        for (var j in $scope.listSaleOrder) {
                            if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                            }
                           
                        }
                    }
                  
                    for (var i = 0; i <= $scope.listSaleOrder.length; i++) {
                        $scope.tong += $scope.listSaleOrder[i].TotalAmountOC;
                       
                    }
                   
                }, function () {
                    console.log('load items failed');
                    });
               
                
            });

        }
       
        $scope.getSaleOrder();

    }
})(angular.module('tiktak.saleOrder'));