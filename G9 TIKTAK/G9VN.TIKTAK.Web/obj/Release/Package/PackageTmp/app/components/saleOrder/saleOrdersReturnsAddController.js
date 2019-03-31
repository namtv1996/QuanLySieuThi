(function (app) {
    app.controller('saleOrdersReturnsAddController', saleOrdersReturnsAddController);

    saleOrdersReturnsAddController.$inject = ['$scope', 'apiService', 'notificationService'];
    function saleOrdersReturnsAddController($scope, apiService, notificationService) {
        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        $scope.tim = tim;
        function tim() {
            if ($scope.searchText == '') {
                apiService.get('api/saleOrder/getall', null, function (result) {
                    if (result.data.length == 0) {
                        notificationService.displayWarning('Không có bản ghi nào!!!');
                    }
                    else {
                        notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                    }
                    $scope.listSaleOrder = result.data;
                    apiService.get('api/Customer/getall', null, function (result) {
                        for (var i in result.data) {
                            for (var j in $scope.listSaleOrder) {
                                if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                    $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                                }
                            }
                        }
                    },
                        function () {
                            console.log('load items failed');
                        });
                }, function () {
                    console.log('load saleOrder failed');
                });
                
                
            }
            if ($scope.searchText != '') {
                apiService.get('api/saleOrder/search?key=' + $scope.searchText, null, function (result) {
                    $scope.listSaleOrder = result.data;
                    
                }, function () {
                    console.log('load items failed');
                    });
                 apiService.get('api/Customer/getall', null, function (result) {
                    for (var i in result.data) {
                        for (var j in $scope.listSaleOrder) {
                            if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                            }
                        }
                    }
                },
                    function () {
                    console.log('load items failed');
                });
            }
            else {
                $scope.listSaleOrder = $scope.listSaleOrder;
            }
        }
        function getSaleOrder() {
            apiService.get('api/saleOrder/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listSaleOrder = result.data;
                apiService.get('api/Customer/getall', null, function (result) {
                    for (var i in result.data) {
                        for (var j in $scope.listSaleOrder) {
                            if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                            }
                        }
                    }
                },
                    function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load saleOrder failed');
            });
        }
        $scope.getSaleOrder();
      
    }
})(angular.module('tiktak.saleOrder'));