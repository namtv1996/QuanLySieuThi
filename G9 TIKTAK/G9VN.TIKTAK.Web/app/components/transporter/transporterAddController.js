
(function (app) {
    app.controller('transporterAddController', transporterAddController);

    transporterAddController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function transporterAddController($scope, apiService, notificationService, $ngBootbox) {
        $scope.transporter = {
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: 5,
            Tel: null,
            Email: null,
            Debt: 0,
            AccumulativePoint: 0,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null,
            
        };
        $scope.AddTransporter = AddTransporter;
        $scope.getCode = getCode;

        function getCode() {
            apiService.get('api/transporter/getCode', null, function (result) {
                $scope.transporter.ObjectCode = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function AddTransporter() {
            if ($scope.frmAddVendors.$valid == true) {
                
                apiService.post('api/transporter/create', $scope.transporter,
                    function (result) {
                        notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                        $state.go('transporter');
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục bắt buộc !');
            }
        }

        $scope.getCode();
    }
})(angular.module('tiktak.transporter'));

