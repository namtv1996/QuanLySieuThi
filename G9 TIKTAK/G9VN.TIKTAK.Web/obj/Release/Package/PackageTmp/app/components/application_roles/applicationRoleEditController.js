(function (app) {
    'use strict';

    app.controller('applicationRoleEditController', applicationRoleEditController);

    applicationRoleEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];

    function applicationRoleEditController($scope, apiService, notificationService, $state, $stateParams) {
        $scope.role = {}


        $scope.updateApplicationRole = updateApplicationRole;

        function updateApplicationRole() {
            apiService.put('/api/applicationRole/update', $scope.role, addSuccessed, addFailed);
        }
        function loadDetail() {
            apiService.get('/api/applicationRole/detail/' + $stateParams.id, null,
            function (result) {
                $scope.role = result.data;
            },
            function (result) {
                notificationService.displayError(result.data);
            });
        }

        function addSuccessed() {
            notificationService.displaySuccess($scope.role.Name + ' đã được cập nhật thành công.');

            $state.go('application_roles');
        }
        function addFailed(response) {
            notificationService.displayError(response.data.Message);
            notificationService.displayErrorValidation(response);
        }
        loadDetail();
    }
})(angular.module('tiktak.application_roles'));