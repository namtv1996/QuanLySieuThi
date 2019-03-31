(function (app) {
    'use strict';

    app.controller('applicationUserAddController', applicationUserAddController);

    applicationUserAddController.$inject = ['$scope', 'apiService', 'notificationService', '$location', 'commonService'];

    function applicationUserAddController($scope, apiService, notificationService, $location, commonService) {
        $scope.account = {
            Groups: []
        }
        //get ds nhóm
        $scope.groups = [];
        function loadGroups() {
            apiService.get('/api/applicationGroup/getlistall', null, function (result) {
                $scope.groups = result.data;
                    //for (var index in result.data) {
                    //    $scope.groups[index] = result.data[index].Name;
                    //}
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách nhóm.');
                });

        }
        loadGroups();
        $scope.addAccount = addAccount;

        function addAccount() {
            apiService.post('/api/applicationUser/add', $scope.account, addSuccessed, addFailed);
        }

        function addSuccessed() {
            notificationService.displaySuccess('Người dùng đã được thêm mới.');

            $location.url('application_users');
        }
        function addFailed(response) {
            notificationService.displayError(response.data.Message);
            notificationService.displayErrorValidation(response);
        }
  
        //lấy ds chi nhánh
        $scope.branch = [];
        $scope.getBranch = getBranch;
        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.branch = result.data;
            }, function () {
                console.log('load itemCategory failed');
            });
        }
        $scope.getBranch();
        $scope.nam = function () {
         //   var li = $scope.account.Groups;
        };

    }
})(angular.module('tiktak.application_users'));