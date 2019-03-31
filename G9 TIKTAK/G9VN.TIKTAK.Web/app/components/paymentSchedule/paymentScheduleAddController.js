(function (app) {
    app.controller('paymentScheduleAddController', paymentScheduleAddController);
    paymentScheduleAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function paymentScheduleAddController(apiService, $scope, notificationService, $state) {
        $scope.paymentSchedule = {

            PaymentScheduleName: null,
            PayWithin: null,
            Status: true,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null

        }

        $scope.AddPaymentSchedule = AddPaymentSchedule;

        function AddPaymentSchedule() {
            apiService.post('api/paymentSchedule/create', $scope.paymentSchedule,
                function (result) {
                    notificationService.displaySuccess('Kỳ hạn ' + result.data.PaymentScheduleName + ' đã được thêm mới.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
    }
})(angular.module('tiktak.paymentSchedule'));