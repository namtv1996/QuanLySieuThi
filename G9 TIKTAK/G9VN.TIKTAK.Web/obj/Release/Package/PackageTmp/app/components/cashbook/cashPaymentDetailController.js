(function (app) {
    app.controller('cashPaymentDetailController', cashPaymentDetailController);

    cashPaymentDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams','$state'];
    function cashPaymentDetailController($scope, apiService, notificationService, $stateParams, $state) {
        //thông tin phiếu thu
        $scope.cashPayment = {};
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
                }
                else {
                    if (arr[i + 1] >= '5') {
                        arr1[i] = arr[i] - -1;
                    }
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

        $scope.changeAmount = changeAmount;
        function changeAmount() {
            if ($scope.cashPayment.TotalAmount === undefined) {
                $scope.cashPayment.TotalAmount = '0';
            } else {
                $scope.cashPayment.TotalAmount = Currency(ConvertNumber($scope.cashPayment.TotalAmount.toString()));
            }
        }

        $scope.getObjectKind = getObjectKind;
        function getObjectKind() {
            apiService.get('api/objectCategory/getAllObjectKind', null,
                function (result) {
                    $scope.listObjectKind = result.data;
                },
                function () { }
            );
        }

        $scope.getObject = getObject;
        function getObject(id) {
            var config = {
                params: {
                    id: id
                }
            }
            apiService.get('api/objectCategory/getObjectByObjectKind', config,
                function (result) {
                    $scope.listObject = result.data;
                    $scope.cashPayment.ObjectName = '';
                    for (var i = 0; i < $scope.listObjectKind.length; i++) {
                        for (var j = 0; j < $scope.listObject.length; j++) {
                            if ($scope.listObjectKind[i].ObjectKindID === $scope.listObject[j].ObjectKind) {
                                $scope.cashPayment.ObjectKind = $scope.listObjectKind[i].ObjectKindName;
                            }
                        }
                    }
                },
                function () { }
            );
        }

        $scope.chooseObject = chooseObject;
        function chooseObject(id) {
            for (var i in $scope.listObject) {
                if ($scope.listObject[i].ObjectID === id) {

                    $scope.cashPayment.ObjectName = $scope.listObject[i].ObjectName;
                    $scope.cashPayment.ObjectID = $scope.listObject[i].ObjectID;
                    break;
                }
            }
        }

        $scope.UpdateCashPayment = UpdateCashPayment;
        function UpdateCashPayment() {
            if ($scope.frmCashPaymentDetail.$valid == true) {
                $scope.cashPayment.TotalAmount = Number(ConvertNumber($scope.cashPayment.TotalAmount));
                $scope.cashPayment.TotalAmountOC = Number(ConvertNumber($scope.cashPayment.TotalAmount));
                if ($scope.cashPayment.Status === 0) {
                    $scope.cashPayment.OriginalVoucherNo = $scope.cashPayment.chungtugoc;
                } else {
                    $scope.cashPayment.OriginalVoucherNo = $scope.cashPayment.loaiphieuchi1;
                }
                apiService.put('api/purchaseInvoice/update', $scope.cashPayment, function (result) {
                    notificationService.displaySuccess("Cập nhật thành công !");
                    $state.go('cashPayment');
                });
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục dữ liệu bắt buộc !!');
            }
        }

        $scope.get_Info = get_Info;
        function get_Info() {
            apiService.get('api/purchaseInvoice/getbyid/' + $stateParams.id, null, function (result) {
                $scope.cashPayment = result.data;
               
                apiService.get('api/Customer/getbyid/' + $scope.cashPayment.ObjectID, null, function (result) {
                    $scope.cashPayment.ObjectName = result.data.ObjectName;
                    if (result.data.ObjectKind === 1) { $scope.cashPayment.ObjectKind = 'Nhà cung cấp'; }
                    if (result.data.ObjectKind === 2) { $scope.cashPayment.ObjectKind = 'Khách hàng'; }
                    if (result.data.ObjectKind === 3) { $scope.cashPayment.ObjectKind = 'Nhân viên'; }
                    if (result.data.ObjectKind === 4) { $scope.cashPayment.ObjectKind = 'Nhóm khách hàng'; }
                    if (result.data.ObjectKind === 5) { $scope.cashPayment.ObjectKind = 'Đối tác vận chuyển'; }
                });
                                             
                apiService.get('api/branch/getbyid/' + $scope.cashPayment.BranchID, null, function (result) {
                    $scope.cashPayment.BranchName = result.data.BranchName;
                });

                if ($scope.cashPayment.Status === 1) {
                    document.getElementById("loaiphieuchi0").style.display = "none";
                    document.getElementById("loaiphieuchi1").style.display = "block";
                    $scope.cashPayment.loaiphieuchi1 = $scope.cashPayment.OriginalVoucherNo;
                    $scope.cashPayment.chungtugoc = 'Không xác định';

                } else {
                    document.getElementById("loaiphieuchi0").style.display = "block";
                    document.getElementById("loaiphieuchi1").style.display = "none";
                    $scope.cashPayment.chungtugoc = $scope.cashPayment.OriginalVoucherNo;
                    $scope.cashPayment.loaiphieuchi0 = 'Phiếu chi tự động tạo khi giao dịch';

                    document.getElementById("ObjectKind").disabled = true;
                    document.getElementById("ObjectName").disabled = true;
                    document.getElementById("TotalAmount").disabled = true;
                    document.getElementById("loaiphieuchi0").disabled = true;

                    document.getElementById("ObjectKind").style.backgroundColor = "#e0dbd4";
                    document.getElementById("ObjectName").style.backgroundColor = "#e0dbd4";
                    document.getElementById("TotalAmount").style.backgroundColor = "#e0dbd4";
                    document.getElementById("loaiphieuchi0").style.backgroundColor = "#e0dbd4";

                }
                $scope.cashPayment.TotalAmount = Currency($scope.cashPayment.TotalAmount.toString());
                $scope.cashPayment.INVoucherDate = new Date($scope.cashPayment.INVoucherDate);
            }, function (error) {
                console.log("Lỗi khi gọi api");
            });
        }
        $scope.get_Info();
    }
})(angular.module('tiktak.cashbook'))