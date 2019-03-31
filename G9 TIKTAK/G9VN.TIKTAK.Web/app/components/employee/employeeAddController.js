(function (app) {
    app.controller('employeeAddController', employeeAddController);
    employeeAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function employeeAddController(apiService, $scope, notificationService, $state) {
        $scope.employee = {

            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,

            ObjectKind: 3,
            Tel: null,
            Email: null,

            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null

        }

        $scope.AddEmployee = AddEmployee;

        function AddEmployee() {
            apiService.post('api/employee/create', $scope.employee,
                function (result) {
                    notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }

      


    }
})(angular.module('tiktak.employee'));