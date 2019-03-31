(function (app) {

    app.controller('adjustmentEditController', adjustmentEditController);
    adjustmentEditController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams','$state', '$ngBootbox'];
    function adjustmentEditController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
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
        $scope.voucherCheckDetail = {};
        $scope.GetVoucherById = GetVoucherById;
        $scope.search = search;
        $scope.dis = 'none';
        $scope.filterList = [];
        $scope.searchText = '';
        $scope.GetVoucherDetail = GetVoucherDetail;
        $scope.voucherDetail = [];
        $scope.getItem = getItem;
        $scope.del = del;

        $scope.update = update;
        $scope.listItems = [];
        $scope.ChooseItem = ChooseItem;
        $scope.afterCheck = afterCheck;
        $scope.EditVoucherCheck = EditVoucherCheck;
        $scope.AddVoucherCheckDetail = AddVoucherCheckDetail;

        $scope.account = {};


        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }

            afterCheck();
        }

        function update(stt) {
            if ($scope.cart.list_selected[stt - 1].Quantity > $scope.cart.list_selected[stt - 1].dieu_chinh) {
                $scope.cart.list_selected[stt - 1].chenh_lech =
                    $scope.cart.list_selected[stt - 1].Quantity - 1 + 1 - $scope.cart.list_selected[stt - 1].dieu_chinh;
            } else {
                $scope.cart.list_selected[stt - 1].chenh_lech =
                    $scope.cart.list_selected[stt - 1].dieu_chinh - 1 + 1 - $scope.cart.list_selected[stt - 1].Quantity;

            }


            afterCheck();

        }

        $scope.cart = {
            list_selected: [],

        }

        function ChooseItem(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                var item = result.data;
                for (i in $scope.filterList) {
                    if ($scope.filterList[i].ID === item.ID) {
                        item.Quantity = $scope.filterList[i].quantity;
                    }
                }
                if ($scope.cart.list_selected.length == 0) {
                    item.stt = 1;
                    item.dieu_chinh = 1;
                    item.reason = null;
                    item.chenh_lech = item.Quantity - item.dieu_chinh;

                    $scope.cart.list_selected.push(item);

                }
                else {
                    var ind = -1;
                    var STT = 1;
                    for (var index in $scope.cart.list_selected) {
                        if ($scope.cart.list_selected[index].ID == id) {
                            ind = index;
                        }
                        STT++;
                    }
                    if (ind == -1) {
                        item.stt = STT;
                        item.dieu_chinh = 1;
                        item.reason = null;
                        item.chenh_lech = item.Quantity - item.dieu_chinh;
                        $scope.cart.list_selected.push(item);

                    }
                }

                afterCheck();
                $scope.dis = 'none';
                $scope.searchText = '';
            }, function (error) {
                notificationService.displayError(error.data);
            });


        }

        function GetVoucherById() {
            apiService.get('api/voucherCheck/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherCheck = result.data;
                if ($scope.voucherCheck.Status == true) {
                    $scope.voucherCheck.tt = "Đã hoàn thành";
                    $scope.voucherCheck.cs = "available";
                }
                else {
                    $scope.voucherCheck.tt = "Đang kiểm";
                    $scope.voucherCheck.cs = "not-available";
                }

                apiService.get('api/account/users', null, function (result) {
                    $scope.account = result.data;
                    apiService.get('api/branch/getbyid/' + $scope.account.BranchID, null, function (result) {
                        $scope.account.BranchName = result.data.BranchName;

                    }, function () {
                        console.log('load items failed');
                    });
                }, function () {
                    console.log('load items failed');
                });
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function search() {
            if ($scope.searchText != '') {
                $scope.dis = 'block';

                apiService.get('api/itemOption/AutoComplete?BranchID=' + $scope.account.BranchID, null, function (result1) {
                    $scope.filterList = result1.data;
                });
            }
            else {
                $scope.dis = 'none';
            }
        }

        function GetVoucherDetail() {
            apiService.get('api/voucherCheckDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.voucherDetail = result.data;
                getItem();


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
                            
                            $scope.listItemOpt[j].dieu_chinh = $scope.voucherDetail[i].AfterCheck + 1 - 1;
                            $scope.listItemOpt[j].chenh_lech = $scope.voucherDetail[i].Result + 1 - 1;
                            $scope.listItemOpt[j].reason = $scope.voucherDetail[i].Reason;
                            $scope.listItemOpt[j].stt = i + 1;
                            $scope.listItemOpt[j].Quantity = $scope.voucherDetail[i].InStock + 1 - 1;

                            $scope.cart.list_selected.push($scope.listItemOpt[j]);
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function afterCheck() {
            $scope.voucherCheck.TotalAfterCheck = 0;
            $scope.voucherCheck.TotalDifference = 0;

            for (var i in $scope.cart.list_selected) {
                $scope.voucherCheck.TotalAfterCheck = $scope.voucherCheck.TotalAfterCheck - 1 + 1 + $scope.cart.list_selected[i].dieu_chinh;

                $scope.voucherCheck.TotalDifference = $scope.voucherCheck.TotalDifference + 1 - 1 + $scope.cart.list_selected[i].chenh_lech;


            }

        }

        function EditVoucherCheck() {
            if ($scope.cart.list_selected != []) {


                apiService.put('api/voucherCheck/update', $scope.voucherCheck,
                    function (result) {
                        AddVoucherCheckDetail($scope.voucherDetail.length, result.data);
                        $state.go('adjustmentDetails/' + $stateParams.id);
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
        }
        function AddVoucherCheckDetail(i, item) {
            if (i < $scope.cart.list_selected.length) {
                $scope.voucherCheckDetail.VoucherID = item.VoucherID;
                $scope.voucherCheckDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.voucherCheckDetail.InStock = $scope.cart.list_selected[i].Quantity;
                $scope.voucherCheckDetail.AfterCheck = $scope.cart.list_selected[i].dieu_chinh;
                $scope.voucherCheckDetail.Reason = $scope.cart.list_selected[i].reason;
                $scope.voucherCheckDetail.Result = $scope.cart.list_selected[i].chenh_lech;
                apiService.post('api/voucherCheckDetail/create', $scope.voucherCheckDetail,
                    function (result) {
                        AddVoucherCheckDetail(i + 1, item);

                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });

            }
            else {
                notificationService.displaySuccess('Successfully !!');
                $state.go('adjustmentDetails', { id: item.VoucherID });

            }
        }

        GetVoucherById();

        GetVoucherDetail();

    }

})(angular.module('tiktak.adjustment'));