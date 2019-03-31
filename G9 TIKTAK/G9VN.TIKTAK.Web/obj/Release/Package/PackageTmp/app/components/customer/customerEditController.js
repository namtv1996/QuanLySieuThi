(function (app) {
    app.controller('customerEditController', customerEditController);
    customerEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    function customerEditController(apiService, $scope, notificationService, $state, $stateParams) {
        $scope.customers = {
            ObjectID: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: null,
            BirthdayDate: null,
            Tel: null,
            Email: null,
            Debt: null,
            AccumulativePoint: null,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            CaringStaff: null,
            Sex: null,
            Description: null,
            ApplyIncentives: null,
            PricePolicyDefault: null,
            TaxRateDefault: 0,
            DiscountRateDefault: 0,
            PaymentMethodDefault: null,
            PaymentScheduleDefault: null
        }

        $scope.UpdateCustomers = UpdateCustomers;
        $scope.GetCustomerById = GetCustomerById;
        $scope.getObjectCategory = getObjectCategory;

        $scope.getSaleOrder = getSaleOrder;
        $scope.listSaleOrder = [];
        $scope.displayHistory = 'none';

        $scope.getRegion = getRegion;
        $scope.listRegion = [];
        $scope.selectDistrict = selectDistrict;
        $scope.listRegionaddress = [];
        $scope.selectTown = selectTown;
        $scope.listRegionTown = [];

        $scope.getPricePolicy = getPricePolicy;
        $scope.listPricePolicy = [];

        $scope.getPaymentSchedule = getPaymentSchedule;
        $scope.listPaymentSchedule = [];

        $scope.displayAdvanceSetting = 'none';

        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {
                $scope.listPricePolicy = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function getPaymentSchedule() {
            apiService.get('api/paymentSchedule/getall', null, function (result) {
                $scope.listPaymentSchedule = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function selectDistrict() {
            apiService.get('api/Region/getaddress?key=' + $scope.customers.ObjectState, null, function (result) {
                $scope.listRegionaddress = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function selectTown() {

            apiService.get('api/Region/getaddress?key=' + $scope.customers.ObjectDistrict, null, function (result) {
                $scope.listRegionTown = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function getRegion() {
            apiService.get('api/Region/getone', null, function (result) {

                $scope.listRegion = result.data;

            }, function () {
                console.log('load items failed');
            });
        }

        function getSaleOrder(id) {
            var config = {
                params: {
                    object_id: id
                }
            }
            apiService.get('api/saleOrder/getSaleOrderByObjectID', config, function (result) {                
               
                $scope.listSaleOrder = result.data;
                if ($scope.listSaleOrder.length <= 0) {
                    $scope.displayHistory = 'none';
                } else {
                    $scope.displayHistory = 'block';
                }
                for (var j in $scope.listSaleOrder) {
                    $scope.listSaleOrder[j].ObjName = $scope.customers.ObjectName;
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
                console.log('load saleOrder failed');
            });
        }
        

        function GetCustomerById() {
            apiService.get('api/Customer/getbyid/' + $stateParams.id, null, function (result) {
                $scope.customers = result.data;
                $scope.customers.BirthdayDate = new Date($scope.customers.BirthdayDate);
                if ($scope.customers.ApplyIncentives === 1 || $scope.customers.ApplyIncentives === 3) {
                    $scope.displayAdvanceSetting = 'none';
                    $scope.customers.ApplyIncentives = $scope.customers.ApplyIncentives.toString();
                } else {
                    if ($scope.customers.ApplyIncentives === 2) {
                        $scope.displayAdvanceSetting = 'block';                        
                        $scope.customers.PaymentMethodDefault = $scope.customers.PaymentMethodDefault.toString();
                        $scope.customers.ApplyIncentives = $scope.customers.ApplyIncentives.toString();
                    }
                }
                
                //if ($scope.customers.BirthdayDate !== null) {
                //    var temp2 = "";
                //    var dt2 = $scope.customers.BirthdayDate.substring(8, 10);
                //    var mon2 = $scope.customers.BirthdayDate.substring(5, 7);
                //    var yr2 = $scope.customers.BirthdayDate.substring(0, 4);
                //    temp2 = mon2 + "/" + dt2 + "/" + yr2;
                //    var date2 = new Date(temp2);
                //    document.getElementById('datecustomer').valueAsDate = new Date(date2);
                //}
                $scope.getRegion();
                $scope.selectDistrict();
                $scope.selectTown();
                $scope.getSaleOrder($scope.customers.ObjectID);
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateCustomers() {
            $scope.customers.ApplyIncentives = Number($scope.customers.ApplyIncentives);
            if ($scope.customers.ApplyIncentives === 1 || $scope.customers.ApplyIncentives === 3) {
                $scope.customers.PricePolicyDefault = null;
                $scope.customers.TaxRateDefault = null;
                $scope.customers.DiscountRateDefault = null;
                $scope.customers.PaymentMethodDefault = null;
                $scope.customers.PaymentScheduleDefault = null;
            } else {
                if ($scope.customers.ApplyIncentives === 2) {
                    $scope.customers.PricePolicyDefault = $scope.customers.PricePolicyDefault;
                    $scope.customers.TaxRateDefault = $scope.customers.TaxRateDefault;
                    $scope.customers.DiscountRateDefault = $scope.customers.DiscountRateDefault;
                    $scope.customers.PaymentScheduleDefault = $scope.customers.PaymentScheduleDefault;
                    $scope.customers.PaymentMethodDefault = Number($scope.customers.PaymentMethodDefault);
                }
            }
            apiService.put('api/Customer/update', $scope.customers,
                function (result) {
                    notificationService.displaySuccess('Cập nhật thành công.');
                    $state.go('customer');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }

        function getObjectCategory() {
            apiService.get('api/objectCategory/getall', null, function (result) {

                $scope.listObjectCategory = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        function getEmployee() {
            apiService.get('api/employee/getall', null, function (result) {

                $scope.listGetEmployee = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        getObjectCategory();
        getEmployee();

        GetCustomerById();
        $scope.getPricePolicy();
        $scope.getPaymentSchedule();
    }
})(angular.module('tiktak.customer'));