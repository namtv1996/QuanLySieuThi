/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('paymentScheduleListController', paymentScheduleListController);

    paymentScheduleListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function paymentScheduleListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listPaymentSchedule = [];
        $scope.getPaymentSchedule = getPaymentSchedule;
        $scope.deletePaymentSchedule = deletePaymentSchedule;

        function getPaymentSchedule() {
            apiService.get('api/paymentSchedule/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi Kỳ Hạn Thanh Toán nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi Kỳ Hạn Thanh Toán.');
                }
                $scope.listPaymentSchedule = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function deletePaymentSchedule(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/paymentSchedule/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getPaymentSchedule();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }

        $scope.getPaymentSchedule();
    }
})(angular.module('tiktak.paymentSchedule'));

