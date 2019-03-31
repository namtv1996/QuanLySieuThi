(function (app) {
    app.controller('paymentScheduleEditController', paymentScheduleEditController);
    paymentScheduleEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function paymentScheduleEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.paymentSchedule = {

            PaymentScheduleName: null,
            PayWithin: null,
            Status: true,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null

        }

        $scope.UpdatePaymentSchedule = UpdatePaymentSchedule;
        $scope.GetById = GetById;

        function GetById() {
            apiService.get('api/paymentSchedule/getbyid/' + $stateParams.id, null, function (result) {
                $scope.paymentSchedule = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdatePaymentSchedule() {
            apiService.put('api/paymentSchedule/update', $scope.paymentSchedule,
                function (result) {
                    notificationService.displaySuccess('Kỳ hạn ' + result.data.PaymentScheduleName + ' đã được cập nhật.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }

        GetById();
    }
})(angular.module('tiktak.pricePolicy'));