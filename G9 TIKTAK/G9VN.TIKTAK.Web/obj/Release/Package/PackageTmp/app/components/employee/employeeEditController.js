(function (app) {
    app.controller('employeeEditController', employeeEditController);
    employeeEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function employeeEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.employee = {
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
           
            ObjectKind: null,
            Tel: null,
            Email: null,
           
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            ModifyDate: new Date(),
            ModifyBy: null
        }

        $scope.UpdateEmployee = UpdateEmployee;
        $scope.GetEmployeeById = GetEmployeeById;
        

        function GetEmployeeById() {
            apiService.get('api/employee/getbyid/' + $stateParams.id, null, function (result) {
                $scope.employee = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateEmployee() {
            apiService.put('api/employee/update', $scope.employee,
                function (result) {
                    notificationService.displaySuccess(/*result.data + */'Cập nhật thành công.');
                    $state.go('pageSetting');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }

       
        GetEmployeeById();
    }
})(angular.module('tiktak.employee'));