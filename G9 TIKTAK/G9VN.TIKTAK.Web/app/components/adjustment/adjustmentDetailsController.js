(function (app) {
    app.controller('adjustmentDetailsController', adjustmentDetailsController);
    adjustmentDetailsController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', '$ngBootbox'];
    function adjustmentDetailsController(apiService, $scope, notificationService, $state, $stateParams, $ngBootbox) {
        $scope.voucherCheck = {
            VoucherID: null,
            VoucherCode: null,
            ObjectID: null,
            BranchID: null,
            VoucherDate: null,
            Tags: null,
            Note: null,
            TotalAfterCheck: null,
            TotalDifference: null,
            CreateDate: null,
            CreateBy: null,
            ModifyDate: null,
            ModifyBy: null,
            Status: null,
            Description: null,
            EndUpdate: null

        };
        $scope.listItemOpt = [];
        $scope.voucherDetail = [];
        $scope.GetVoucherById = GetVoucherById;
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.getItem = getItem;
        $scope.deleteVoucher = deleteVoucher;
        $scope.balance = balance;
        $scope.listStock = [];
        $scope.PrintDiv = PrintDiv;

        $scope.account = {};
        apiService.get('api/account/users', null,
            function (result) {
                $scope.account = result.data;
            }, function () { }
        );    
        //in
        function PrintDiv() {
            var contents = document.getElementById("dvContents").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Phiếu kiểm hàng</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
        function balance() {
            if ($scope.voucherCheck.Status === false) {
                $scope.voucherCheck.Status = true;
                $scope.voucherCheck.VoucherDate = new Date();
                apiService.put('api/voucherCheck/update', $scope.voucherCheck,
                    function (result) {

                        var param = {
                            BranchID: $scope.account.BranchID,
                            voucherID: $scope.voucherCheck.VoucherID
                        };
                        apiService.put('api/stock/updateInventoryForVoucherCheck', param,
                            function (result) {
                                notificationService.displaySuccess('Kho đã được cân bằng !!');
                                GetVoucherById();
                            }, function(){}
                        );                                                                        
                    }, function (error) {
                        notificationService.displayError('Thất bại !!');
                    }
                );
            } else {
                notificationService.displayWarning('Phiếu kiểm hàng đã hoàn thành. Không thể cân bằng kho được nữa !!');
            }
        }

        function deleteVoucher(id) {
            if ($scope.voucherCheck.Status === false) {
                $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                    var config = {
                        params: {
                            id: id
                        }
                    }

                    apiService.del('api/voucherCheck/delete', config, function () {
                        notificationService.displaySuccess('Xóa thành công');
                        $state.go('adjustment');
                    }, function () {
                        notificationService.displayError('Xóa không thành công');
                    })
                });
            } else {
                notificationService.displayWarning('Đã hoàn thành kiểm hàng. Không thể xóa phiếu này !!');
            }
            
        }

        function GetVoucherById() {
            apiService.get('api/voucherCheck/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherCheck = result.data;
                if ($scope.voucherCheck.Status === true) {
                    $scope.voucherCheck.tt = "Đã hoàn thành";
                    $scope.voucherCheck.cs = "available";
                    $scope.voucherCheck.display_btn = 'none';
                }
                else {
                    $scope.voucherCheck.tt = "Đang kiểm";
                    $scope.voucherCheck.cs = "not-available";
                    $scope.voucherCheck.display_btn = 'block';
                }

                if ($scope.voucherCheck.VoucherDate === null) {
                    $scope.voucherCheck.VoucherDate = '_ _ /_ _ /_ _ _';
                }
                apiService.get('api/stock/getAll', null,
                    function (result) {
                        $scope.listStock = result.data;
                    },
                    function (error) { }
                );
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function GetVoucherDetail() {
            apiService.get('api/voucherCheckDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherDetail = result.data;
                $scope.getItem();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function getItem() {
            apiService.get('api/itemOption/getall', null, function (result) {
                $scope.listItemOpt = result.data;
                for (var i = 0; i < $scope.voucherDetail.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.voucherDetail[i].ItemID === $scope.listItemOpt[j].ID) {
                            $scope.voucherDetail[i].ItemName = $scope.listItemOpt[j].Name;
                            $scope.voucherDetail[i].SKU_Code = $scope.listItemOpt[j].SKU;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        GetVoucherById();

        GetVoucherDetail();

    }
})(angular.module('tiktak.adjustment'));