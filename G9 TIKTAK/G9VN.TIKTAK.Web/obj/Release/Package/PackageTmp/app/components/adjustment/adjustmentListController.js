(function (app) {
    app.controller('adjustmentListController', adjustmentListController);

    adjustmentListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function adjustmentListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.getAdjustment = getAdjustment;
        $scope.listAdjustment = [];
        $scope.getBranch = getBranch;
        $scope.listBranch = [];
        $scope.deleteVoucher = deleteVoucher;
        $scope.getByStatus = getByStatus;

        function getByStatus() {
            apiService.get('api/voucherCheck/getbystatus', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listAdjustment = result.data;
                $scope.getBranch();
                for (var i in $scope.listAdjustment) {
                    if ($scope.listAdjustment[i].Status == true) {
                        $scope.listAdjustment[i].tt = "Đã hoàn thành";
                        $scope.listAdjustment[i].cs = "available";
                    }
                    else {
                        $scope.listAdjustment[i].tt = "Đang kiểm";
                        $scope.listAdjustment[i].cs = "not-available";
                    }
                }

            }, function () {
                console.log('load data failed');
            });
        }

        function deleteVoucher(id, status) {
            if (status === false) {
                $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                    var config = {
                        params: {
                            id: id
                        }
                    }

                    apiService.del('api/voucherCheck/delete', config, function () {
                        notificationService.displaySuccess('Xóa thành công');
                        $scope.getAdjustment();
                    }, function () {
                        notificationService.displayError('Xóa không thành công');
                    })
                });
            } else {
                notificationService.displayWarning('Phiếu kiểm đã hoàn thành. Không thể xóa !!');
            }
           
        }

        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranch = result.data;
                for (var i = 0; i < $scope.listAdjustment.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listAdjustment[i].BranchID === $scope.listBranch[j].BranchID) {
                            $scope.listAdjustment[i].BranchName = $scope.listBranch[j].BranchName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getAdjustment() {
            apiService.get('api/voucherCheck/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listAdjustment = result.data;
                $scope.getBranch();
                for (var i in $scope.listAdjustment) {
                    if ($scope.listAdjustment[i].Status == true) {
                        $scope.listAdjustment[i].tt = "Đã hoàn thành";
                        $scope.listAdjustment[i].cs = "available";
                    }
                    else {
                        $scope.listAdjustment[i].tt = "Đang kiểm";
                        $scope.listAdjustment[i].cs = "not-available";
                    }
                }
                
            }, function () {
                console.log('load data failed');
            });
        }
        $scope.getAdjustment();
    }
})(angular.module('tiktak.adjustment'));