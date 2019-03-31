(function (app) {
    app.controller('receiptDetailController', receiptDetailController);

    receiptDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams','$state'];
    function receiptDetailController($scope, apiService, notificationService, $stateParams, $state) {
        //thông tin phiếu thu
        $scope.receipt = {};
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
            if ($scope.receipt.TotalAmountOC === undefined) {
                $scope.receipt.TotalAmountOC = '0';
            } else {
                $scope.receipt.TotalAmountOC = Currency(ConvertNumber($scope.receipt.TotalAmountOC.toString()));
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
                    for (var i = 0; i < $scope.listObjectKind.length; i++) {
                        for (var j = 0; j < $scope.listObject.length; j++) {
                            if ($scope.listObjectKind[i].ObjectKindID === $scope.listObject[j].ObjectKind) {
                                $scope.receipt.ObjectKind = $scope.listObjectKind[i].ObjectKindName;
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

                    $scope.receipt.ObjectName = $scope.listObject[i].ObjectName;
                    $scope.receipt.ObjectID = $scope.listObject[i].ObjectID;
                    break;
                }
            }
        }

        $scope.get_Info = get_Info;
        function get_Info() {
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.receipt = result.data;

                apiService.get('api/Customer/getbyid/' + $scope.receipt.ObjectID, null, function (result) {
                    $scope.receipt.ObjectName = result.data.ObjectName;
                    if (result.data.ObjectKind === 1) { $scope.receipt.ObjectKind = 'Nhà cung cấp'; }
                    if (result.data.ObjectKind === 2) { $scope.receipt.ObjectKind = 'Khách hàng'; }
                    if (result.data.ObjectKind === 3) { $scope.receipt.ObjectKind = 'Nhân viên'; }
                    if (result.data.ObjectKind === 4) { $scope.receipt.ObjectKind = 'Nhóm khách hàng'; }
                    if (result.data.ObjectKind === 5) { $scope.receipt.ObjectKind = 'Đối tác vận chuyển'; }
                });
                apiService.get('api/branch/getbyid/' + $scope.receipt.BranchID, null, function (result) {
                    $scope.receipt.BranchName = result.data.BranchName;
                });
                if ($scope.receipt.StatusID === 1) {
                    document.getElementById("loaiphieuthu").style.display = "none";
                    document.getElementById("loaiphieuthu2").style.display = "block";
                    $scope.receipt.loaiphieuthu1 = $scope.receipt.OriginalVoucherNo;
                    $scope.receipt.chungtugoc = 'Không xác định';

                } else {
                    document.getElementById("loaiphieuthu").style.display = "block";
                    document.getElementById("loaiphieuthu2").style.display = "none";
                    $scope.receipt.chungtugoc = $scope.receipt.OriginalVoucherNo;
                    $scope.receipt.loaiphieuthu0 = 'Phiếu thu tự động tạo khi giao dịch';

                    document.getElementById("ObjectKind").disabled = true;
                    document.getElementById("ObjectName").disabled = true;
                    document.getElementById("TotalAmount").disabled = true;
                    document.getElementById("loaiphieuthu").disabled = true;

                    document.getElementById("ObjectKind").style.backgroundColor = "#e0dbd4";
                    document.getElementById("ObjectName").style.backgroundColor = "#e0dbd4";
                    document.getElementById("TotalAmount").style.backgroundColor = "#e0dbd4";
                    document.getElementById("loaiphieuthu").style.backgroundColor = "#e0dbd4";

                }
                $scope.receipt.TotalAmountOC = Currency($scope.receipt.TotalAmountOC.toString());
                $scope.receipt.VoucherDate = new Date($scope.receipt.VoucherDate);
            }, function (error) {
                notificationService.displayError("Lỗi khi gọi api");
            });
        }

        $scope.UpdateReceipt = UpdateReceipt;
        function UpdateReceipt() {
            if ($scope.frmReceiptDetail.$valid == true) {
                $scope.receipt.TotalAmount = Number(ConvertNumber($scope.receipt.TotalAmountOC));
                $scope.receipt.TotalAmountOC = Number(ConvertNumber($scope.receipt.TotalAmountOC));
                if ($scope.receipt.StatusID === 0) {
                    $scope.receipt.OriginalVoucherNo = $scope.receipt.chungtugoc;
                } else {
                    $scope.receipt.OriginalVoucherNo = $scope.receipt.loaiphieuthu1;
                }
                apiService.put('api/saleOrder/update', $scope.receipt, function (result) {
                    notificationService.displaySuccess("Cập nhật thành công !");
                    $state.go('receipt');
                });
            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục dữ liệu bắt buộc !!');
            }
        }

        $scope.get_Info();
    }
})(angular.module('tiktak.cashbook'))