(function (app) {
    app.controller('reportInventoriesTransactionController', reportInventoriesTransactionController);

    reportInventoriesTransactionController.$inject = ['$scope', 'apiService'];
    function reportInventoriesTransactionController($scope, apiService) {

        $scope.getReportTransactionStock = getReportTransactionStock;
        $scope.listReport = [];
        $scope.SoLuongNhap = 0;
        $scope.GiaTriNhap = 0;
        $scope.SoLuongXuat = 0;
        $scope.GiaTriXuat = 0;
         
        $scope.end_date = new Date();
        $scope.start_date = new Date($scope.end_date.getTime() - 1000 * 3600 * 24 * 30);
        $scope.start_date.setHours(0);
        $scope.start_date.setMinutes(0);
        $scope.start_date.setSeconds(0);
        $scope.start_date.setMilliseconds(0);
        $scope.start_date = new Date($scope.start_date);

        $scope.list_branch = [];
        $scope.branchid = '';

        $scope.ViewReport = ViewReport;
      
        function ViewReport() {
            $scope.listReport = [];
            $scope.SoLuongNhap = 0;
            $scope.GiaTriNhap = 0;
            $scope.SoLuongXuat = 0;
            $scope.GiaTriXuat = 0;

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/report/reportTransactionStock', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;

                    if ($scope.listReport[i].VoucherType === 4) {
                        $scope.listReport[i].Source = 'Nhập hàng';
                        $scope.listReport[i].font3 = 'bold';
                        $scope.listReport[i].font2 = 'normal';
                        $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                        $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                        $scope.listReport[i].ExportQuantity = 0;
                        $scope.listReport[i].ExportAmount = 0;
                    }
                    if ($scope.listReport[i].VoucherType === 6) {
                        $scope.listReport[i].Source = 'Trả hàng mua';
                        $scope.listReport[i].font3 = 'normal';
                        $scope.listReport[i].font2 = 'bold';
                        $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                        $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                        $scope.listReport[i].ImportQuantity = 0;
                        $scope.listReport[i].ImportAmount = 0;
                    }
                    if ($scope.listReport[i].VoucherType === 3) {
                        $scope.listReport[i].Source = 'Cân bằng kho';
                        if ($scope.listReport[i].AfterCheck > $scope.listReport[i].InStock) {
                            $scope.listReport[i].font3 = 'bold';
                            $scope.listReport[i].font2 = 'normal';
                            $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ExportQuantity = 0;
                            $scope.listReport[i].ExportAmount = 0;
                        }
                        if ($scope.listReport[i].AfterCheck < $scope.listReport[i].InStock) {
                            $scope.listReport[i].font3 = 'normal';
                            $scope.listReport[i].font2 = 'bold';
                            $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ImportQuantity = 0;
                            $scope.listReport[i].ImportAmount = 0;
                        }

                    }
                    if ($scope.listReport[i].VoucherType >= 10 && $scope.listReport[i].VoucherType <= 14) {
                        $scope.listReport[i].Source = 'Bán hàng';
                        $scope.listReport[i].font3 = 'normal';
                        $scope.listReport[i].font2 = 'bold';
                        $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                        $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                        $scope.listReport[i].ImportQuantity = 0;
                        $scope.listReport[i].ImportAmount = 0;
                    }
                    if ($scope.listReport[i].VoucherType === 7) {
                        $scope.listReport[i].Source = 'Hàng bán trả';
                        $scope.listReport[i].font3 = 'bold';
                        $scope.listReport[i].font2 = 'normal';
                        $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                        $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                        $scope.listReport[i].ExportQuantity = 0;
                        $scope.listReport[i].ExportAmount = 0;
                    }

                    $scope.SoLuongNhap = $scope.SoLuongNhap + $scope.listReport[i].ImportQuantity;
                    $scope.GiaTriNhap = $scope.GiaTriNhap + $scope.listReport[i].ImportAmount;
                    $scope.SoLuongXuat = $scope.SoLuongXuat + $scope.listReport[i].ExportQuantity;
                    $scope.GiaTriXuat = $scope.GiaTriXuat + $scope.listReport[i].ExportAmount;

                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getReportTransactionStock() {
            apiService.get('api/branch/getall', null, function (result) {

                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;

                var config = {
                    params: {
                        branchid: $scope.branchid,
                        date1: $scope.start_date,
                        date2: $scope.end_date
                    }
                }

                apiService.get('api/report/reportTransactionStock', config, function (result) {
                    $scope.listReport = result.data;
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;

                        if ($scope.listReport[i].VoucherType === 4) {
                            $scope.listReport[i].Source = 'Nhập hàng';
                            $scope.listReport[i].font3 = 'bold';
                            $scope.listReport[i].font2 = 'normal';
                            $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ExportQuantity = 0;
                            $scope.listReport[i].ExportAmount = 0;
                        }
                        if ($scope.listReport[i].VoucherType === 6) {
                            $scope.listReport[i].Source = 'Trả hàng mua';
                            $scope.listReport[i].font3 = 'normal';
                            $scope.listReport[i].font2 = 'bold';
                            $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ImportQuantity = 0;
                            $scope.listReport[i].ImportAmount = 0;
                        }
                        if ($scope.listReport[i].VoucherType === 3) {
                            $scope.listReport[i].Source = 'Cân bằng kho';
                            if ($scope.listReport[i].AfterCheck > $scope.listReport[i].InStock) {
                                $scope.listReport[i].font3 = 'bold';
                                $scope.listReport[i].font2 = 'normal';
                                $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                                $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                                $scope.listReport[i].ExportQuantity = 0;
                                $scope.listReport[i].ExportAmount = 0;
                            }
                            if ($scope.listReport[i].AfterCheck < $scope.listReport[i].InStock) {
                                $scope.listReport[i].font3 = 'normal';
                                $scope.listReport[i].font2 = 'bold';
                                $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                                $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                                $scope.listReport[i].ImportQuantity = 0;
                                $scope.listReport[i].ImportAmount = 0;
                            }

                        }
                        if ($scope.listReport[i].VoucherType >= 10 && $scope.listReport[i].VoucherType <= 14) {
                            $scope.listReport[i].Source = 'Bán hàng';
                            $scope.listReport[i].font3 = 'normal';
                            $scope.listReport[i].font2 = 'bold';
                            $scope.listReport[i].ExportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ExportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ImportQuantity = 0;
                            $scope.listReport[i].ImportAmount = 0;
                        }
                        if ($scope.listReport[i].VoucherType === 7) {
                            $scope.listReport[i].Source = 'Hàng bán trả';
                            $scope.listReport[i].font3 = 'bold';
                            $scope.listReport[i].font2 = 'normal';
                            $scope.listReport[i].ImportQuantity = $scope.listReport[i].Quantity;
                            $scope.listReport[i].ImportAmount = $scope.listReport[i].Amount;
                            $scope.listReport[i].ExportQuantity = 0;
                            $scope.listReport[i].ExportAmount = 0;
                        }

                        $scope.SoLuongNhap = $scope.SoLuongNhap + $scope.listReport[i].ImportQuantity;
                        $scope.GiaTriNhap = $scope.GiaTriNhap + $scope.listReport[i].ImportAmount;
                        $scope.SoLuongXuat = $scope.SoLuongXuat + $scope.listReport[i].ExportQuantity;
                        $scope.GiaTriXuat = $scope.GiaTriXuat + $scope.listReport[i].ExportAmount;

                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () { });           
        }
        $scope.getReportTransactionStock();
    }
})(angular.module('tiktak.reportStock'));