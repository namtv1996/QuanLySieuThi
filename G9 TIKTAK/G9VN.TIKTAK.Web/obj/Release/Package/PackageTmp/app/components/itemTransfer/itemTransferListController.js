(function (app) {
    app.controller('itemTransferListController', itemTransferListController);
    itemTransferListController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$state', '$ngBootbox'];
    function itemTransferListController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
        $scope.ListItemTransfer = [];
        $scope.getItemTransfer = getItemTransfer;
        function getItemTransfer() {
            apiService.get('api/itemTransfer/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }

                apiService.get('api/itemTransferDetail/getall', null, function (result1) {
                    apiService.get('api/branch/getall', null, function (result2) {
                        var j = 0;
                        $scope.stt = '';
                        for (i in result1.data) {
                            if (i < result.data.length) {
                                $scope.ListItemTransfer[j] = {};
                                for (k in result2.data) {
                                    if (result2.data[k].BranchID == result.data[i].FromStockID) {
                                        $scope.ListItemTransfer[j].cnChuyen = result2.data[k].BranchName;
                                    }
                                    if (result2.data[k].BranchID == result.data[i].ToStockID) {
                                        $scope.ListItemTransfer[j].cnNhan = result2.data[k].BranchName;
                                    }
                                }

                                $scope.ListItemTransfer[j].VoucherID = result.data[i].VoucherID;
                                $scope.ListItemTransfer[j].ngaynhan = result.data[i].MobilizationDate;
                                $scope.ListItemTransfer[j].ma = result.data[i].VoucherNo;
                                $scope.ListItemTransfer[j].nguoitao = result.data[i].ObjectName;
                                $scope.ListItemTransfer[j].ngaychuyen = result.data[i].VoucherDate;
                                
                                if (result.data[i].Status == 1) {
                                    $scope.ListItemTransfer[i].tt = "Chờ duyệt";
                                    $scope.ListItemTransfer[i].cs = "not-available";
                                }
                                if (result.data[i].Status == 2) {
                                    $scope.ListItemTransfer[i].tt = "Chờ chuyển";
                                    $scope.ListItemTransfer[i].cs = "blue";
                                }
                                if (result.data[i].Status == 3) {
                                    $scope.ListItemTransfer[i].tt = "Chờ nhận";
                                    $scope.ListItemTransfer[i].cs = "deepskyblue";
                                }
                                if (result.data[i].Status == 4) {
                                    $scope.ListItemTransfer[i].tt = "Hoàn thành";
                                    $scope.ListItemTransfer[i].cs = "available";
                                }

                                j++;
                            }

                        }
                    });


                });
            });
        }
        $scope.getItemTransfer();
    }
})(angular.module('tiktak.itemTransfer'));