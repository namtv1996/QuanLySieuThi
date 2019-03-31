(function (app) {
    app.controller('reportSalesOrdersController', reportSalesOrdersController);

    reportSalesOrdersController.$inject = ['$scope', 'apiService'];
    function reportSalesOrdersController($scope, apiService) {

        $scope.ReportOrderStatistics = ReportOrderStatistics;
        $scope.listReport = [];
        $scope.TienHang = 0;
        $scope.TienThue = 0;
        $scope.TienChietKhau = 0;
        $scope.PhiGiaoHang = 0;
        $scope.DoanhSo = 0;
        $scope.SoLuong = 0;

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

        $scope.searchText = '';
        $scope.search = search;

        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });
        function search() {
            $scope.listReport = [];

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportOrderStatistics', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    //$scope.TienHang = $scope.TienHang + $scope.listReport[i].TotalAmount;
                    //$scope.TienThue = $scope.TienThue + $scope.listReport[i].TotalVATAmount;
                    //$scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].DiscountAmount;
                    //$scope.DoanhSo = $scope.DoanhSo + $scope.listReport[i].Revenue;
                    //$scope.SoLuong = $scope.SoLuong + $scope.listReport[i].Quantity;

                    if ($scope.listReport[i].StatusID === 1) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'
                    }
                    if ($scope.listReport[i].StatusID === 15) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'
                    }
                    if ($scope.listReport[i].StatusID === 2) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 3) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 4) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }
                    if ($scope.listReport[i].StatusID === 45) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 5) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 7) {
                        $scope.listReport[i].InvoiceStatus = 'Đặt hàng';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 8) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 9) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 95) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 10) {
                        $scope.listReport[i].InvoiceStatus = 'Đã hủy';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 11) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                    }

                    if ($scope.listReport[i].StatusID === 12) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 13) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 14) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                    }

                    if ($scope.listReport[i].StatusID === 16) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 17) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn phần';
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function ViewReport() {
            $scope.listReport = [];
            $scope.TienHang = 0;
            $scope.TienThue = 0;
            $scope.TienChietKhau = 0;
            $scope.PhiGiaoHang = 0;
            $scope.DoanhSo = 0;
            $scope.SoLuong = 0;

            var config = {
                params: {
                    branchid: $scope.branchid,
                    date1: $scope.start_date,
                    date2: $scope.end_date
                }
            }

            apiService.get('api/statistic/reportOrderStatistics', config, function (result) {
                $scope.listReport = result.data;
                for (var i = 0; i < $scope.listReport.length; i++) {
                    $scope.listReport[i].stt = i + 1;
                    $scope.TienHang = $scope.TienHang + $scope.listReport[i].TotalAmount;
                    $scope.TienThue = $scope.TienThue + $scope.listReport[i].TotalVATAmount;
                    $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].DiscountAmount;
                    $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].ShippingAmount;
                    $scope.DoanhSo = $scope.DoanhSo + $scope.listReport[i].Revenue;
                    $scope.SoLuong = $scope.SoLuong + $scope.listReport[i].Quantity;

                    if ($scope.listReport[i].StatusID === 1) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'
                    }
                    if ($scope.listReport[i].StatusID === 15) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'
                    }
                    if ($scope.listReport[i].StatusID === 2) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 3) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 4) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }
                    if ($scope.listReport[i].StatusID === 45) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 5) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 7) {
                        $scope.listReport[i].InvoiceStatus = 'Đặt hàng';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 8) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 9) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 95) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 10) {
                        $scope.listReport[i].InvoiceStatus = 'Đã hủy';
                        $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                        $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                    }

                    if ($scope.listReport[i].StatusID === 11) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                    }

                    if ($scope.listReport[i].StatusID === 12) {
                        $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 13) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 14) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                    }

                    if ($scope.listReport[i].StatusID === 16) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                    }

                    if ($scope.listReport[i].StatusID === 17) {
                        $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                        $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                        $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                        $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                        $scope.listReport[i].ReturnStatus = 'Trả hàng toàn phần';
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }
      

        function ReportOrderStatistics() {           
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

                apiService.get('api/statistic/reportOrderStatistics', config, function (result) {
                    $scope.listReport = result.data;
                    for (var i = 0; i < $scope.listReport.length; i++) {
                        $scope.listReport[i].stt = i + 1;
                        $scope.TienHang = $scope.TienHang + $scope.listReport[i].TotalAmount;
                        $scope.TienThue = $scope.TienThue + $scope.listReport[i].TotalVATAmount;
                        $scope.TienChietKhau = $scope.TienChietKhau + $scope.listReport[i].DiscountAmount;
                        $scope.PhiGiaoHang = $scope.PhiGiaoHang + $scope.listReport[i].ShippingAmount;
                        $scope.DoanhSo = $scope.DoanhSo + $scope.listReport[i].Revenue;
                        $scope.SoLuong = $scope.SoLuong + $scope.listReport[i].Quantity;

                        if ($scope.listReport[i].StatusID === 1) {
                            $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'                         
                        }
                        if ($scope.listReport[i].StatusID === 15) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng'
                        }
                        if ($scope.listReport[i].StatusID === 2) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 3) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 4) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }
                        if ($scope.listReport[i].StatusID === 45) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 5) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 7) {
                            $scope.listReport[i].InvoiceStatus = 'Đặt hàng';
                            $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 8) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 9) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 95) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 10) {
                            $scope.listReport[i].InvoiceStatus = 'Đã hủy';
                            $scope.listReport[i].PackStatus = 'Chưa đóng gói';
                            $scope.listReport[i].ImportStatus = 'Chưa xuất kho';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Chưa trả hàng';
                        }

                        if ($scope.listReport[i].StatusID === 11) {
                            $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                        }

                        if ($scope.listReport[i].StatusID === 12) {
                            $scope.listReport[i].InvoiceStatus = 'Hoàn thành';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán toàn bộ';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                        }

                        if ($scope.listReport[i].StatusID === 13) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                        }

                        if ($scope.listReport[i].StatusID === 14) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Thanh toán một phần';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng toàn bộ';
                        }

                        if ($scope.listReport[i].StatusID === 16) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng một phần';
                        }

                        if ($scope.listReport[i].StatusID === 17) {
                            $scope.listReport[i].InvoiceStatus = 'Đang giao dịch';
                            $scope.listReport[i].PackStatus = 'Đóng gói toàn bộ';
                            $scope.listReport[i].ImportStatus = 'Xuất kho toàn bộ';
                            $scope.listReport[i].PaymentStatus = 'Chưa thanh toán';
                            $scope.listReport[i].ReturnStatus = 'Trả hàng toàn phần';
                        }
                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () { });

          
        }

       
        $scope.ReportOrderStatistics();
    }
})(angular.module('tiktak.reportSales'));