(function (app) {
    app.controller('reportSalesDetailController', reportSalesDetailController);

    reportSalesDetailController.$inject = ['$scope', 'apiService','notificationService'];
    function reportSalesDetailController($scope, apiService, notificationService) {

        $scope.ReportSaleEndDay = ReportSaleEndDay;
        $scope.listReport = [];

        $scope.list_branch = [];
        $scope.branchid = '';

        $scope.end_date = new Date();
        $scope.start_date = new Date($scope.end_date.getTime() - 1000 * 3600 * 24 * 30);
        $scope.start_date.setHours(0);
        $scope.start_date.setMinutes(0);
        $scope.start_date.setSeconds(0);
        $scope.start_date.setMilliseconds(0);
        $scope.start_date = new Date($scope.start_date);

        $scope.ViewReport = ViewReport;

        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        $scope.list_status = [];
        $scope.displaySaleOrder = 'none';
        $scope.displaySale = 'none';
        $scope.displayReturn = 'none';
        $scope.title = '';

        function getSaleOrder(statusID, quantity) {

            var config = {
                params: {
                    branchid: $scope.branchid,
                    status: statusID,
                    voucherdate1: $scope.start_date,
                    voucherdate2: $scope.end_date
                }
            }
            if (quantity > 0) {
                if (statusID === 1) {
                    $scope.title = 'Danh sách đơn hàng đã hoàn thành'; $scope.displaySale = 'block';
                    $scope.displayReturn = 'none';
                }
                if (statusID === 7) {
                    $scope.title = 'Danh sách đơn hàng đã đặt hàng'; $scope.displaySale = 'block';
                    $scope.displayReturn = 'none';
                }
                if (statusID === 10) {
                    $scope.title = 'Danh sách đơn hàng đã hủy'; $scope.displaySale = 'block';
                    $scope.displayReturn = 'none';
                }
                if (statusID === 5) {
                    $scope.title = 'Danh sách đơn hàng đang giao dịch'; $scope.displaySale = 'block';
                    $scope.displayReturn = 'none';
                }
                if (statusID === 6) {
                    $scope.title = 'Danh sách đơn trả hàng'; $scope.displaySale = 'none';
                    $scope.displayReturn = 'block';
                }

                apiService.get('api/statistic/getSaleOrderByStatus', config, function (result) {
                    $scope.listSaleOrder = result.data;
                    apiService.get('api/Customer/getall', null, function (result) {
                        for (var j in $scope.listSaleOrder) {
                            for (var i in result.data) {
                                if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                    $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                                }
                            }
                            if (statusID !== 6) {

                                //hoàn  thành
                                if ($scope.listSaleOrder[j].StatusID == 1) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Hoàn thành';
                                    $scope.listSaleOrder[j].icon = 'available';
                                }
                                //đóng gói xuất kho thanh toán 1 phần
                                else if ($scope.listSaleOrder[j].StatusID == 15) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'available';
                                }
                                //đóng gói
                                else if ($scope.listSaleOrder[j].StatusID == 2) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 3) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, thanh toán nhưng chưa xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 4) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, thanh toán 1 phần nhưng chưa xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 45) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói thanh toán nhưng chưa xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 5) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //trả hàng thành công
                                else if ($scope.listSaleOrder[j].StatusID == 6) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Hoàn thành';
                                    $scope.listSaleOrder[j].icon = 'available';
                                }
                                //đặt hàng
                                else if ($scope.listSaleOrder[j].StatusID == 7) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đặt hàng';
                                    $scope.listSaleOrder[j].icon = 'not-available';
                                }
                                //chọn duyệt đơn thì sang trạng thái đang giao dịch
                                else if ($scope.listSaleOrder[j].StatusID == 8) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //thanh toán chưa đóng gói xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 9) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //thanh toán 1 phần chưa đóng gói xuất kho
                                else if ($scope.listSaleOrder[j].StatusID == 95) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                // đơn hàng bị hủy(trạng thái đặt hàng mới được hủy)
                                else if ($scope.listSaleOrder[j].StatusID == 10) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đã hủy';
                                    $scope.listSaleOrder[j].icon = 'red';
                                }
                                //hoàn thành + trả hàng toàn phần
                                else if ($scope.listSaleOrder[j].StatusID == 11) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Hoàn thành';
                                    $scope.listSaleOrder[j].icon = 'available';
                                }
                                //hoàn thành + trả hàng 1 phần
                                else if ($scope.listSaleOrder[j].StatusID == 12) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl5 = 'Hoàn thành';
                                    $scope.listSaleOrder[j].icon = 'available';
                                }
                                //đóng gói, xuất kho, thanh toán 1 phần + trả hàng 1 phần
                                else if ($scope.listSaleOrder[j].StatusID == 13) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, xuất kho, thanh toán 1 phần + trả hàng toàn phần
                                else if ($scope.listSaleOrder[j].StatusID == 14) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, xuất kho, chưa thanh toán + trả hàng 1 phần
                                else if ($scope.listSaleOrder[j].StatusID == 16) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-adjust';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }
                                //đóng gói, xuất kho, chưa thanh toán + trả hàng toàn phần
                                else if ($scope.listSaleOrder[j].StatusID == 17) {
                                    $scope.listSaleOrder[j].cl1 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl2 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl3 = 'fa fa-circle-o';
                                    $scope.listSaleOrder[j].cl4 = 'fa fa-check-circle-o';
                                    $scope.listSaleOrder[j].cl5 = 'Đang giao dịch';
                                    $scope.listSaleOrder[j].icon = 'blue';
                                }

                            } else {
                                if (statusID === 6) {
                                    //chưa nhận hàng, chưa hoàn tiền
                                    if ($scope.listSaleOrder[j].StatusID === 0) {
                                        $scope.listSaleOrder[j].status = "Đang nhận";
                                        $scope.listSaleOrder[j].import = "not-available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-circle-o';
                                    }
                                    //nhận hàng, chưa hoàn tiền
                                    if ($scope.listSaleOrder[j].StatusID === 1) {
                                        $scope.listSaleOrder[j].status = "Đã nhận";
                                        $scope.listSaleOrder[j].import = "available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-circle-o';
                                    }
                                    //chưa nhận hàng, đã hoàn tiền toàn bộ
                                    if ($scope.listSaleOrder[j].StatusID === 2) {
                                        $scope.listSaleOrder[j].status = "Đang nhận";
                                        $scope.listSaleOrder[j].import = "not-available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-check-circle-o';
                                    }
                                    //chưa nhận hàng, hoàn tiền 1 phần
                                    if ($scope.listSaleOrder[j].StatusID === 3) {
                                        $scope.listSaleOrder[j].status = "Đang nhận";
                                        $scope.listSaleOrder[j].import = "not-available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-adjust';
                                    }
                                    //nhận hàng, hoàn tiền 1 phần
                                    if ($scope.listSaleOrder[j].StatusID === 4) {
                                        $scope.listSaleOrder[j].status = "Đã nhận";
                                        $scope.listSaleOrder[j].import = "available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-adjust';
                                    }
                                    //nhận hàng, hoàn tiền toàn bộ
                                    if ($scope.listSaleOrder[j].StatusID === 5) {
                                        $scope.listSaleOrder[j].status = "Đã nhận";
                                        $scope.listSaleOrder[j].import = "available";
                                        $scope.listSaleOrder[j].payment = 'fa fa-check-circle-o';
                                    }
                                }
                            }
                        }
                    }, function () {
                        console.log('load items failed');
                    });
                }, function () {
                    console.log('load saleOrder failed');
                });

                $scope.displaySaleOrder = 'block';
            } else {
                notificationService.displayWarning("Không có dữ liệu !");
                $scope.displayReturn = 'none';
                $scope.displaySaleOrder = 'none';
            }
        }

        function ViewReport() {
            $scope.listReport = [];
            $scope.displayReturn = 'none';
            $scope.displaySaleOrder = 'none';
            var config = {
                params: {
                    branchid: $scope.branchid,
                    voucherdate1: $scope.start_date,
                    voucherdate2: $scope.end_date
                }
            }

            apiService.get('api/statistic/getbyenddaystatistic', config, function (result) {
                $scope.listReport = result.data;              
            }, function () {
                console.log('load items failed');
            });
        }

        function ReportSaleEndDay() {
            $scope.displaySaleOrder = 'none';
            apiService.get('api/branch/getall', null, function (result) {
                $scope.list_branch = result.data;
                $scope.branchid = $scope.list_branch[0].BranchID;
                
                var config = {
                    params: {
                        branchid: $scope.branchid,
                        voucherdate1: $scope.start_date,
                        voucherdate2: $scope.end_date
                    }
                }

                apiService.get('api/statistic/getbyenddaystatistic', config, function (result) {
                    $scope.listReport = result.data;

                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load items failed');
            });
        }

        $scope.ReportSaleEndDay();
    }
})(angular.module('tiktak.reportSales'));