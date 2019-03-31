(function (app) {
    app.controller('reportDebtsCustomersController', reportDebtsCustomersController);

    reportDebtsCustomersController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', '$ngBootbox'];
    function reportDebtsCustomersController(apiService, $scope, notificationService, $state, $stateParams, $ngBootbox) {
        $scope.getCustomer = getCustomer;
        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        $scope.listDebt=[];
        $scope.listCustomer = [];
        $scope.close = close;
        function close(id) {
            $('div.modal-backdrop.fade.in').remove()
            $state.go('saleOrder_Detail', { id: id });


        }
        function getCustomer() {
            apiService.get('api/Customer/getall1', null, function (result) {
                $scope.listCustomer = result.data;
                $scope.TotalDebt = 0;
                for (var i = 0; i < $scope.listCustomer.length; i++) {
                    $scope.listCustomer[i].stt = i + 1;
                    $scope.TotalDebt = $scope.TotalDebt + $scope.listCustomer[i].Debt;
                }
            }, function () {
                console.log('load items failed');
            });
        }
        function getSaleOrder(idobject) {
            for (i in $scope.listCustomer) {
                if (idobject == $scope.listCustomer[i].ObjectID) {
                    $scope.name = $scope.listCustomer[i].ObjectName;
                    $scope.ObjectCode = $scope.listCustomer[i].ObjectCode;
                    $scope.Email = $scope.listCustomer[i].Email;
                    $scope.Sex = $scope.listCustomer[i].Sex;
                    $scope.TaxCode = $scope.listCustomer[i].TaxCode;
                    $scope.Tel = $scope.listCustomer[i].Tel;
                    $scope.BirthdayDate = $scope.listCustomer[i].BirthdayDate;
                }
            }
            $scope.listSaleOrder = [];
            apiService.get('api/saleOrder/SelectSaleOrderByObject?ObjectID=' + idobject, null, function (result) {
                $scope.listSaleOrder = result.data;
              
                for (var j in $scope.listSaleOrder) {
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
            });
        }
        $scope.getCustomer();

    }
})(angular.module('tiktak.reportFinance'));