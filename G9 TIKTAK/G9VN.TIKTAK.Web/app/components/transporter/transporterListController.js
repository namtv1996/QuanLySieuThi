
(function (app) {
    app.controller('transporterListController', transporterListController);

    transporterListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function transporterListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listTransporter = [];
        $scope.getTransporter = getTransporter;

        function getTransporter() {
            apiService.get('api/transporter/getall', null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listTransporter = result.data;
              
                
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.getTransporter();
    }
})(angular.module('tiktak.transporter'));

