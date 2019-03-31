(function (app) {
    app.controller('receiptAddController', receiptAddController);
    receiptAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state']

    function receiptAddController($scope, apiService, notificationService, $state) {

        $scope.receipt = {
            ObjectKindName: '',
            VoucherNo: '',
            OriginalVoucherNo: '',
            TotalAmount: '0',
            TotalAmountOC: 0,
            VoucherDate: new Date(),
            VoucherType: '23',
            BranchID: null,
            ObjectID: null,
            StatusID: 1
        };

        $scope.getObjectKind = getObjectKind;
        $scope.listObjectKind = [];

        $scope.getObject = getObject;
        $scope.listObject = [];

       
        $scope.searchText = '';
      
        $scope.chooseObject = chooseObject

        $scope.AddReceipt = AddReceipt;


        $scope.getCode = getCode;
        function getCode() {
            var config = {
                params: {
                    parentID: 'PT',
                    vouchertype1: 20,
                    vouchertype2: 25
                }
            }
            apiService.get('api/saleOrder/getCode', config, function (result) {
                $scope.receipt.VoucherNo = result.data;
            }, function () {
                console.log('Đéo tự động sinh code. Cay vl');
            });
        }

        $scope.account = {};
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;          
        });

        $scope.changeAmount = changeAmount;
        function changeAmount() {
            if ($scope.receipt.TotalAmount === undefined) {
                $scope.receipt.TotalAmount = '0';
            } else {
                $scope.receipt.TotalAmount = Currency(ConvertNumber($scope.receipt.TotalAmount.toString()));
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

        function AddReceipt(loadpage) {
            if ($scope.frmAddReceipt.$valid == true) {
                if (Number(ConvertNumber($scope.receipt.TotalAmount)) > 0) {
                    $scope.receipt.ObjectID = $scope.receipt.ObjectID;
                    $scope.receipt.TotalAmountOC = Number(ConvertNumber($scope.receipt.TotalAmount));
                    $scope.receipt.BranchID = $scope.account.BranchID;
                    $scope.receipt.StatusID = 1;
                    apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                        function (result) {
                            notificationService.displaySuccess('Tạo phiếu thu thành công !!');
                            if (loadpage === 0) {
                                $state.go('receipt');
                            } else {
                                if (loadpage === 1) {
                                    $state.go('receipt_add');
                                    location.reload(true);
                                }
                            }
                        },
                        function () { }
                    );
                } else {
                    notificationService.displayWarning('Giá trị phiếu thu phải lớn hơn 0đ !');
                }
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục dữ liệu bắt buộc !!');
            }
        }

        function chooseObject(id) {
            for (var i in $scope.listObject) {
                if ($scope.listObject[i].ObjectID === id) {

                    $scope.searchText = $scope.listObject[i].ObjectName;
                    $scope.receipt.ObjectID = $scope.listObject[i].ObjectID;                 
                    break;
                }
            }
        }
       
        function getObjectKind() {
            apiService.get('api/objectCategory/getAllObjectKind', null,
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
                                $scope.receipt.ObjectKindName = $scope.listObjectKind[i].ObjectKindName;
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