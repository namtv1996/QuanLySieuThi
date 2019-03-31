(function (app) {
    app.controller('customerAddController', customerAddController);
    customerAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function customerAddController(apiService, $scope, notificationService, $state) {
        $scope.customers = {

            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: 2,
            Tel: null,
            Email: null,
            Debt: 0,
            AccumulativePoint: 0,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            CaringStaff: null,
            Sex: null,
            Description: null,
            ApplyIncentives: '3',
            PricePolicyDefault: null,
            TaxRateDefault: 0,
            DiscountRateDefault: 0,
            PaymentMethodDefault: '1',
            PaymentScheduleDefault:null
        }

        $scope.listObjectCategory = [];
       
        $scope.getObjectCategory = getObjectCategory;
        $scope.getEmployee = getEmployee;
        $scope.getcustomer = getcustomer;
        $scope.AddCustomers = AddCustomers;
        $scope.option = option;
        $scope.option1 = option1;
        $scope.mediate = '';
       
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
        
        function getcustomer() {
            apiService.get('api/Customer/getall', null, function (result) {
               
                $scope.listCustomer = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function option() {

            $scope.mediate = 'customer_add';
           
        }
        function option1() {
            $scope.mediate = 'customer';
        }
        function AddCustomers() {


            if ($scope.frmAddCustomer.$valid == true) {

                if ($scope.mediate == '') {
                    $scope.mediate = 'customer';
                    
                }
                var a = null;
            
                if ($scope.listCustomer.length != 0) {
                    for (var i = 0; i < $scope.listCustomer.length; i++) {
                        if ($scope.customers.ObjectCode == null) { a = true } else {
                            if ($scope.customers.ObjectCode == $scope.listCustomer[i].ObjectCode) {
                                notificationService.displayWarning('Trùng mã khách hàng vui lòng nhâp lại. Xin cảm ơn !!');
                                a = false;
                                break;
                            } else {
                                a = true;
                            }
                        }
                    }
                } else {
                    a = true;
                }
             
                if (a == true) {
                    
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
                    
                    apiService.post('api/Customer/create', $scope.customers,
                        function (result) {
                            notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                            $state.go($scope.mediate);
                            $scope.customers.ObjectName = '';
                            $scope.customers.Tel = '';
                            $scope.customers.Sex = '';
                            $scope.customers.ObjectAddress = '';
                            $scope.customers.ObjectCategoryID = '';
                            $scope.customers.Email = '';
                            $scope.customers.TaxCode = '';
                            $scope.customers.BirthdayDate = '';

                            //if (customers.ObjectCode != null) {
                            //    var str = new String(customers.ObjectCode);
                            //    var a = parseInt(str[str.length - 1]) + 1;
                            //    var code = '';
                            //    for (var i = 0; i < str.length - 1; i++) {
                            //        code = code + str[i];
                            //    }
                            //    customers.ObjectCode = code + a;

                            //}


                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        });
                   
                }
            } else {
                notificationService.displayWarning('nhập đầy đủ các trương có dấu chấm đỏ');
            }
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
            apiService.get('api/Customer/getCustomerCode', null, function (result) {
                $scope.customers.ObjectCode = result.data;
            }, function () {
                console.log('load items failed');
            });
        }


        $scope.getcustomer();
        $scope.getObjectCategory();
        $scope.getEmployee();
        $scope.getRegion();
        $scope.getPricePolicy();
        $scope.getPaymentSchedule();

    }
})(angular.module('tiktak.customer'));