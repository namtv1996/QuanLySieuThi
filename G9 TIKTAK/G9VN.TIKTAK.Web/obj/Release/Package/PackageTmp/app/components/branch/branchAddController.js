(function (app) {
    app.controller('branchAddController', branchAddController);
    branchAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function branchAddController(apiService, $scope, notificationService, $state) {
        $scope.branchs = {
            BranchCode: null,
            BranchName: null,
            Address: null,
            TelephoneNumber: null,
            Email: null,
            status:true
        }
        
        $scope.AddBranch = AddBranch;
       

        function AddBranch() {
            console.log($scope.branchs);
            apiService.post('api/branch/create', $scope.branchs,
                function (result) {
                    notificationService.displaySuccess(result.data.BranchName + ' đã được thêm mới.');
                    $state.go('branch');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');

                });
        }
    }
})(angular.module('tiktak.branch'));