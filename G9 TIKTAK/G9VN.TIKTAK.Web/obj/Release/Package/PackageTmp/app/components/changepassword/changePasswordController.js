(function (app) {
    app.controller('changePasswordController', changePasswordController);
    changePasswordController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'akFileUploaderService'];
    function changePasswordController(apiService, $scope, notificationService, $state, akFileUploaderService) {
        $scope.refreshPass = refreshPass;
        $scope.updateAccount = updateAccount;
        $scope.resetlist = {};
        function refreshPass() {
            apiService.put('api/account/ChangePassword', $scope.resetlist,
                function (result) {
                    notificationService.displaySuccess('Cập nhật thành công.');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
        $scope.account = {}
        function loadDetail() {
            apiService.get('api/account/users', null, function (result) {
                $scope.account = result.data;
            });
        }
        function updateAccount(account) {
            akFileUploaderService.updateModel(account, '/api/applicationUser/updateImgUser').then(function (result) { notificationService.displaySuccess('Cập nhật thành công.'); });
            //apiService.put('/api/applicationUser/update', $scope.account)
          
        }
        loadDetail();
    }
})(angular.module('tiktak.changepassword'));