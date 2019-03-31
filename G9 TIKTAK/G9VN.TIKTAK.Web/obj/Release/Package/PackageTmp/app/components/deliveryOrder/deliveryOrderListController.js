(function (app) {
    app.controller('deliveryOrderListController', deliveryOrderListController);
    deliveryOrderListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function deliveryOrderListController($scope, apiService, notificationService, $ngBootbox) {

        $scope.listDeliveryOrder = [];
        $scope.GetAllDeliveryOrder = GetAllDeliveryOrder;

        var account = {};
        
        function GetAllDeliveryOrder() {
            apiService.get('api/account/users', null, function (result) {
                account = result.data;
                apiService.get('api/saleOrder/getalldelivery?BranchID=' + account.BranchID, null, function (result) {
                    $scope.listDeliveryOrder = result.data;
                    for (var i in $scope.listDeliveryOrder) {
                        if ($scope.listDeliveryOrder[i].StatusID === 1) {
                            $scope.listDeliveryOrder[i].tt = "Hoàn thành";
                            $scope.listDeliveryOrder[i].cs = "available";
                            $scope.listDeliveryOrder[i].icon_delivery = "fa fa-check-circle-o";
                            $scope.listDeliveryOrder[i].icon_payment = "fa fa-check-circle-o";
                        }
                        if ($scope.listDeliveryOrder[i].StatusID === 0) {
                            $scope.listDeliveryOrder[i].tt = "Đang giao hàng";
                            $scope.listDeliveryOrder[i].cs = "blue";
                            $scope.listDeliveryOrder[i].icon_delivery = "fa fa-circle-o";
                            $scope.listDeliveryOrder[i].icon_payment = "fa fa-circle-o";
                        }
                        if ($scope.listDeliveryOrder[i].StatusID === 2 || $scope.listDeliveryOrder[i].StatusID === 3) {
                            $scope.listDeliveryOrder[i].tt = "Đã giao hàng";
                            $scope.listDeliveryOrder[i].cs = "available";
                            $scope.listDeliveryOrder[i].icon_delivery = "fa fa-check-circle-o";
                            $scope.listDeliveryOrder[i].icon_payment = "fa fa-circle-o";
                        }
                        if ($scope.listDeliveryOrder[i].StatusID === 4) {
                            $scope.listDeliveryOrder[i].tt = "Hủy giao hàng";
                            $scope.listDeliveryOrder[i].cs = "not-available";
                            $scope.listDeliveryOrder[i].icon_delivery = "fa fa-circle-o";
                            $scope.listDeliveryOrder[i].icon_payment = "fa fa-circle-o";
                        }
                        if ($scope.listDeliveryOrder[i].VoucherDate === null) {
                            $scope.listDeliveryOrder[i].VoucherDate = '_ _ /_ _ /_ _';
                        }
                    }
                }, function () {
                    console.log('load items failed');
                });

            }, function () {
                console.log('load items failed');
            });

        }

        $scope.GetAllDeliveryOrder();
    }
})(angular.module('tiktak.deliveryOrder'));