(function (app) {
    app.controller('saleOrderListController', saleOrderListController);

    saleOrderListController.$inject = ['$scope', 'apiService', 'notificationService'];
    function saleOrderListController($scope, apiService, notificationService) {
        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        //lấy thông tin chi nhánh+ lấy thông  tin hàng hóa theo chi nhánh
        $scope.account = {};
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            $scope.getSaleOrder0();
        });
        //lay ds don hang theo chi nhanh tuong ung cua tai khoan dang nhap
        var a = '';
        $scope.getSaleOrder0 = getSaleOrder0;
        $scope.getSaleOrder1 = getSaleOrder1;
        $scope.getSaleOrder2 = getSaleOrder2;
        function getSaleOrder0() {
            a = 'SelectSaleOrderByBranchID';
            $scope.getSaleOrder();
        }
        function getSaleOrder1() {
            a = 'SelectSaleOrder10ByBranchID';
            $scope.getSaleOrder();
        }
        function getSaleOrder2() {
            a = 'SelectSaleOrder12ByBranchID';
            $scope.getSaleOrder();
        }
        function getSaleOrder() {
            apiService.get('api/saleOrder/' + a + '?BranchID=' + $scope.account.BranchID, null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listSaleOrder = result.data;
                apiService.get('api/Customer/getall', null, function (result) {
                    for (var j in $scope.listSaleOrder) {
                        for (var i in result.data) {
                            if ($scope.listSaleOrder[j].ObjectID == result.data[i].ObjectID) {
                                $scope.listSaleOrder[j].ObjName = result.data[i].ObjectName;
                            }
                        }
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
                    }
                }, function () {
                    console.log('load items failed');
                });
            }, function () {
                console.log('load saleOrder failed');
            });
        }

        //filter theo cột
        $scope.columnname = 'VoucherNo';
        $scope.reverse = true;
        $scope.orderByTag = orderByTag;
        function orderByTag(propertyName) {
            //đảo chiều mỗi khi click lại
            $scope.reverse = ($scope.columnname === propertyName) ? !$scope.reverse : false;
            //gán tên trường muốn sắp xếp
            $scope.columnname = propertyName;
            //đổi icon mã đơn
            if (propertyName === 'VoucherNo' && $scope.reverse == false) {
                $scope.clas1 = "fa fa-sort-alpha-asc";
            }
            if (propertyName === 'VoucherNo' && $scope.reverse == true) {
                $scope.clas1 = "fa fa-sort-alpha-desc";
            }
            if (propertyName != 'VoucherNo') {
                $scope.clas1 = '';
            }

            //đổi icon tên khách hàng
            if (propertyName === 'ObjName' && $scope.reverse == false) {
                $scope.clas2 = "fa fa-sort-alpha-asc";
            }
            if (propertyName === 'ObjName' && $scope.reverse == true) {
                $scope.clas2 = "fa fa-sort-alpha-desc";
            }
            if (propertyName != 'ObjName') {
                $scope.clas2 = '';
            }
            //đổi icon VoucherDate
            if (propertyName === 'VoucherDate' && $scope.reverse == false) {
                $scope.clas3 = "fa fa-sort-amount-asc";
            }
            if (propertyName === 'VoucherDate' && $scope.reverse == true) {
                $scope.clas3 = "fa fa-sort-amount-desc";
            }
            if (propertyName != 'VoucherDate') {
                $scope.clas3 = '';
            }
            //đổi icon StatusID
            if (propertyName === 'StatusID' && $scope.reverse == false) {
                $scope.clas4 = "fa fa-sort-amount-asc";
            }
            if (propertyName === 'StatusID' && $scope.reverse == true) {
                $scope.clas4 = "fa fa-sort-amount-desc";
            }
            if (propertyName != 'StatusID') {
                $scope.clas4 = '';
            }
            //đổi icon TotalAmountOC
            if (propertyName === 'TotalAmountOC' && $scope.reverse == false) {
                $scope.clas5 = "fa fa-sort-amount-asc";
            }
            if (propertyName === 'TotalAmountOC' && $scope.reverse == true) {
                $scope.clas5 = "fa fa-sort-amount-desc";
            }
            if (propertyName != 'TotalAmountOC') {
                $scope.clas5 = '';
            }

        }
        $scope.importData = importData;
        function importData() {
            notificationService.displayWarning('Chức năng đang cập nhật!');
        }
        $scope.exportData = exportData;
        function exportData() {
            notificationService.displayWarning('Chức năng đang cập nhật!');
        }
    }
})(angular.module('tiktak.saleOrder'));