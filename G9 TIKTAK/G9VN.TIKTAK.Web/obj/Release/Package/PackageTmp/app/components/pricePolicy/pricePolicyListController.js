/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('pricePolicyListController', pricePolicyListController);

    pricePolicyListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function pricePolicyListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listPricePolicy = [];
        $scope.getPricePolicy = getPricePolicy;
        $scope.deletePricePolicy = deletePricePolicy;
       
        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi Chính Sách Giá nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi Chính Sách Giá.');
                }
                $scope.listPricePolicy = result.data;
                for (var i in $scope.listPricePolicy) {
                    if ($scope.listPricePolicy[i].Status == true) {
                        $scope.listPricePolicy[i].tt = "Đang kích hoạt";
                        $scope.listPricePolicy[i].cs = "available";
                    }
                    else {
                        $scope.listPricePolicy[i].tt = "Hủy kích hoạt";
                        $scope.listPricePolicy[i].cs = "not-available";
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function deletePricePolicy(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/pricePolicy/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getPricePolicy();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
       
        $scope.getPricePolicy();
    }
})(angular.module('tiktak.pricePolicy'));

