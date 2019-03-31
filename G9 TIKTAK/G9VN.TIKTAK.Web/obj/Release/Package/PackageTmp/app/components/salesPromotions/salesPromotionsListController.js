(function (app) {
    app.controller('salesPromotionsListController', salesPromotionsListController);
    salesPromotionsListController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function salesPromotionsListController($scope, apiService, notificationService, $state,$stateParams) {
        $scope.getSalesPromotion = getSalesPromotion;
        $scope.listSalesPromotion = [];
        var a= new Date();
        function getSalesPromotion() {
            apiService.get('api/salespromotion/getall', null, function (result) {
                $scope.listSalesPromotion = result.data;
                for (var i in $scope.listSalesPromotion) {
                    var b = new Date( $scope.listSalesPromotion[i].Expirydate);
                    if ($scope.listSalesPromotion[i].Status == true) {
                        $scope.listSalesPromotion[i].tt = "Đang chạy";
                        $scope.listSalesPromotion[i].cs = "available";
                    }
                    else {
                        $scope.listSalesPromotion[i].tt = "Ngừng chạy";
                        $scope.listSalesPromotion[i].cs = "not-available";
                    }
                    if ($scope.listSalesPromotion[i].Expirydate !== null) {
                        if (a > b) {
                            $scope.listSalesPromotion[i].tt = "Hết hạn";
                            $scope.listSalesPromotion[i].cs = "blue";
                        }
                    } else {
                        $scope.listSalesPromotion[i].Expirydate='Không giới hạn'
                    }
                }
                notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
            }, function (error) {
                console.log('get thất bại')
            });
        }
        getSalesPromotion();



    }
})(angular.module('tiktak.salesPromotions'));