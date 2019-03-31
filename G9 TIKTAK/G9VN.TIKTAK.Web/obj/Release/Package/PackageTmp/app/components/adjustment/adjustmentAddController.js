(function (app) {

    app.controller('adjustmentAddController', adjustmentAddController);
    adjustmentAddController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams','$state', '$ngBootbox'];
    function adjustmentAddController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
        $scope.AddVoucherCheck = AddVoucherCheck;
        $scope.AddVoucherCheckDetail = AddVoucherCheckDetail;
        $scope.search = search;
        $scope.dis = 'none';
        $scope.filterList = [];
        $scope.searchText = '';
        $scope.update = update;
        $scope.listItems = [];
        $scope.ChooseItem = ChooseItem;
        $scope.AfterCheck = AfterCheck;
        $scope.voucherCheck = {
            TotalAfterCheck: 0,
            TotalDifference: 0,
           
            Status: false

        };
        $scope.voucherCheckDetail = {

        };
        $scope.getBranch = getBranch;
        $scope.account = {
            BranchName:null
        };

        $scope.getCode = getCode;
        function getCode() {
            apiService.get('api/voucherCheck/getCode', null, function (result) {
                $scope.voucherCheck.VoucherCode = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        $scope.getCode();

        function getBranch() {
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
        }
        $scope.getBranch();

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
                    if (item.Quantity > 0) {
                        item.chenh_lech = item.Quantity - item.dieu_chinh;
                    } else {
                        item.chenh_lech = item.dieu_chinh - item.Quantity;
                    }
                    
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
                        if (item.Quantity > 0) {
                            item.chenh_lech = item.Quantity - item.dieu_chinh;
                        } else {
                            item.chenh_lech = item.dieu_chinh - item.Quantity;
                        }
                        $scope.cart.list_selected.push(item);

                    }
                }
                AfterCheck();
                $scope.dis = 'none';
                $scope.searchText = '';
            }, function (error) {
                notificationService.displayError(error.data);
            });


        }

        function update(stt) {
            if ($scope.cart.list_selected[stt - 1].Quantity > $scope.cart.list_selected[stt - 1].dieu_chinh) {
                $scope.cart.list_selected[stt - 1].chenh_lech =
                    $scope.cart.list_selected[stt - 1].Quantity - 1 + 1 - $scope.cart.list_selected[stt - 1].dieu_chinh;
            } else {
                $scope.cart.list_selected[stt - 1].chenh_lech =
                    $scope.cart.list_selected[stt - 1].dieu_chinh - 1 + 1 - $scope.cart.list_selected[stt - 1].Quantity;

            }

            AfterCheck();

        }

        $scope.del = function (stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }

            AfterCheck();
        }

        function AfterCheck() {
            $scope.voucherCheck.TotalAfterCheck = 0;
            $scope.voucherCheck.TotalDifference = 0;

            for (var i in $scope.cart.list_selected) {
                $scope.voucherCheck.TotalAfterCheck = $scope.voucherCheck.TotalAfterCheck + 1 - 1 + $scope.cart.list_selected[i].dieu_chinh;

                $scope.voucherCheck.TotalDifference = $scope.voucherCheck.TotalDifference + 1 - 1 + $scope.cart.list_selected[i].chenh_lech;

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
                $state.go('adjustmentDetails', {id:item.VoucherID});
            }
        }
        function AddVoucherCheck() {
            if ($scope.cart.list_selected != []) {
                $scope.voucherCheck.BranchID = $scope.account.BranchID;
                apiService.post('api/voucherCheck/create', $scope.voucherCheck,
                    function (result) {
                        AddVoucherCheckDetail(0, result.data);
                        
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
               
            }
        }
    }

})(angular.module('tiktak.adjustment'));