(function (app) {
    app.controller('cashPaymentAddController', cashPaymentAddController);
    cashPaymentAddController.$inject = ['$scope', 'apiService', 'notificationService','$state']

    function cashPaymentAddController($scope, apiService, notificationService, $state) {

        $scope.cashPayment = {
            ObjectKindName: '',
            INVoucherNo: '',
            OriginalVoucherNo: '',
            TotalAmount: '0',
            INVoucherDate: new Date(),
            VoucherType: '40',
            BranchID: null,
            ObjectID: null,
            Status: 1
        };

        $scope.getObjectKind = getObjectKind;
        $scope.listObjectKind = [];
       
        $scope.getObject = getObject;
        $scope.listObject = [];

       
        $scope.searchText = '';
      
        $scope.chooseObject = chooseObject

        $scope.AddCashPayment = AddCashPayment;

        $scope.account = {};
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
        });

        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'PC',
                    vouchertype1: 40,
                    vouchertype2: 42
                }
            }
            apiService.get('api/purchaseInvoice/getCode', config, function (result) {
                $scope.cashPayment.INVoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }

        $scope.changeAmount = changeAmount;
        function changeAmount() {
            if ($scope.cashPayment.TotalAmount === undefined) {
                $scope.cashPayment.TotalAmount = '0';
            } else {
                $scope.cashPayment.TotalAmount = Currency(ConvertNumber($scope.cashPayment.TotalAmount.toString()));
            }
        }

        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        //Dinh dang tien VND
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                } else {
                    break;
                }
            }
            var Gia = "";
            var dem = 0;
            for (var i = arr1.length - 1; i >= 0; i--) {
                dem++;
                Gia = Gia + arr1[i];
                if (dem == 3 && i != 0) {
                    Gia = Gia + ",";
                    dem = 0;
                }
            }
            var arr2 = new String(Gia);
            var GiaMoi = '';
            for (var i = arr2.length - 1; i >= 0; i--) {
                GiaMoi = GiaMoi + arr2[i];
            }
            return GiaMoi;
        }
        //Dinh dang so
        function ConvertNumber(str) {
            var arr = new String(str);
            var monney = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != ',') {
                    monney = monney + arr[i];
                }
            }
            return monney;
        }

        function AddCashPayment(loadpage) {
            if ($scope.frmAddCashPayment.$valid == true) {
                $scope.cashPayment.ObjectID = $scope.cashPayment.ObjectID;
                $scope.cashPayment.BranchID = $scope.account.BranchID;
                $scope.cashPayment.TotalAmount = Number(ConvertNumber($scope.cashPayment.TotalAmount));
                $scope.cashPayment.TotalAmountOC = $scope.cashPayment.TotalAmount;
                apiService.post('api/purchaseInvoice/createCashPayment', $scope.cashPayment,
                    function (result) {
                        notificationService.displaySuccess('Tạo phiếu chi thành công !!');
                        if (loadpage === 0) {
                            $state.go('cashPayment');
                        } else {
                            if (loadpage === 1) {
                                $state.go('cashpayment_add');
                                location.reload(true);
                            }
                        }
                    },
                    function () { }
                );
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục dữ liệu bắt buộc !!');
            }                       
        }

        function chooseObject(id) {
            for (var i in $scope.listObject) {
                if ($scope.listObject[i].ObjectID === id) {
                    
                    $scope.searchText = $scope.listObject[i].ObjectName;
                    $scope.cashPayment.ObjectID = $scope.listObject[i].ObjectID;                   
                    break;
                }
            }
        }

        
        function getObjectKind() {
            apiService.get('api/objectCategory/getAllObjectKind',null,
                function (result) {
                    $scope.listObjectKind = result.data;
                },
                function () { }
            );
        }

        function getObject(id) {
            var config = {
                params: {
                    id: id
                }
            }
            apiService.get('api/objectCategory/getObjectByObjectKind', config,
                function (result) {
                    $scope.listObject = result.data;
                    for (var i = 0; i < $scope.listObjectKind.length; i++) {
                        for (var j = 0; j < $scope.listObject.length; j++) {
                            if ($scope.listObjectKind[i].ObjectKindID === $scope.listObject[j].ObjectKind) {
                                $scope.cashPayment.ObjectKindName = $scope.listObjectKind[i].ObjectKindName;
                            }
                        }
                    }
                },
                function () { }
            );
        }

        $scope.getObjectKind();
        $scope.getCode();
        
    }
})(angular.module('tiktak.cashbook'));