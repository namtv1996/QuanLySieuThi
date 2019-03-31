//not code
(function (app) {
    app.controller('itemTransferAddController', itemTransferAddController);

    itemTransferAddController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$state', '$ngBootbox'];
    function itemTransferAddController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
        $scope.ItemTransfer = {
           
            VoucherType: 1,
            SortOrder: 0,
            IsPosted: true,
            TotalAmount: 0,
            CreatedBy: null,
            
        };
        $scope.ItemTransferDetail = {
           

        };
        $scope.cart = {
            list_selected: [],
        };
        $scope.filterList = [];
        $scope.getBranch = getBranch;
        $scope.branch = [];
        $scope.InwardStock = {};
        $scope.branchName = '';
        $scope.search = search;
        $scope.getBranchs = getBranchs;
        $scope.chooseProduct = chooseProduct;
        $scope.getCode = getCode;
        $scope.AddItemTransfer = AddItemTransfer;
        $scope.AddItemTransferDetail = AddItemTransferDetail;
        function getBranch() {
            apiService.get('api/account/users', null, function (result) {
                $scope.branch = result.data;
                }, function (error) {
                    console.log('load items failed');
            }, function () {
                console.log('load items failed');
            });
        }
        function AddItemTransfer() {
            if ($scope.frmItemTransferAdd.$valid == true) {
                if ($scope.cart.list_selected.length > 0) {
                    apiService.get('api/account/users', null, function (result) {
                        $scope.ItemTransfer.BranchID = $scope.branch.BranchID;
                        $scope.ItemTransfer.ObjectName = result.data.FullName;
                        $scope.ItemTransfer.ObjectAddress = result.data.Address;
                        $scope.ItemTransfer.Status = 1;
                        $scope.ItemTransfer.TotalAmount = $scope.tongtien;
                        $scope.ItemTransfer.MobilizationOf = a;
                        $scope.ItemTransfer.MobilizationFor = a;
                            apiService.post('api/itemTransfer/create', $scope.ItemTransfer,
                                function (result) {
                                    AddItemTransferDetail(0, result.data);
                                }, function (error) {
                                    notificationService.displayError('Thêm mới không thành công.');
                                });
                    });
                }
            } else {
                notificationService.displayWarning('nhập đầy đủ các trương có dấu chấm đỏ');
            }
        }
        function AddItemTransferDetail(i, item) {
            if (i < $scope.cart.list_selected.length) {
                $scope.ItemTransferDetail.VoucherID = item.VoucherID;
                $scope.ItemTransferDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.ItemTransferDetail.QuantityItem = $scope.cart.list_selected[i].quan;
                $scope.ItemTransferDetail.transferPrice = $scope.cart.list_selected[i].SalePrice;
                $scope.ItemTransferDetail.ConversionPrice = ($scope.cart.list_selected[i].quan * $scope.cart.list_selected[i].SalePrice);
                apiService.post('api/itemTransferDetail/create', $scope.ItemTransferDetail,
                    function (result) {
                        AddItemTransferDetail(i + 1, item);

                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Thêm mới thành công !!');
                $state.go('stockTransferDetail',{ id: item.VoucherID });
            }
        }
        function getCode() {
            var config = {
                params: {
                    parentID: 'PCH',
                }
            }
            apiService.get('api/itemTransfer/getCode', config, function (result) {
                $scope.code = result.data;
            }, function () {
                console.log('error');
            });
        }
        function chooseProduct(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                var item = result.data;
               
                if ($scope.cart.list_selected.length == 0) {
                    if ($scope.filterList.length == 0) {
                        $scope.distable = 'block';
                    }
                    else {
                        $scope.distable = 'none';
                    }
                    item.quan = 1;
                    item.stt = 1;
                    item.thanhtien = item.SalePrice * item.quan;
                    $scope.cart.list_selected.push(item);
                }
                else {
                    var STT = 1;
                    var pos = -1;
                    for (var i in $scope.cart.list_selected) {
                        if ($scope.cart.list_selected[i].ID == id) {
                            pos = i;
                        }
                        STT++;
                    }
                    if (pos == -1) {
                        item.quan = 1;
                        item.stt = STT;
                        item.thanhtien = item.SalePrice * item.quan;
                        $scope.cart.list_selected.push(item);
                    }
                    else {
                        $scope.cart.list_selected[pos].quan++;
                        $scope.cart.list_selected[pos].thanhtien = ($scope.cart.list_selected[pos].SalePrice * $scope.cart.list_selected[pos].quan);
                    }
                } var pos = -1;
                $scope.totalquan();

            }, function (error) {
                notificationService.displayError(error.data);
            });
            $scope.dis = 'none';
            $scope.searchText = '';
        }
        function search() {
            if ($scope.searchText != '') {
                $scope.dis = 'block';
                var account = {};
                apiService.get('api/account/users', null, function (result) {
                    account = result.data;
                    apiService.get('api/itemOption/AutoComplete?BranchID=' + account.BranchID, null, function (result1) {
                        $scope.filterList = result1.data;
                    });
                });
                if ($scope.filterList.length == 0) {
                    $scope.dis1 = 'block';
                }
            }
            else {
                $scope.dis = 'none';
            }
        }
        function getBranchs() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranchs = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.updateprice = updateprice;
        $scope.del = del;
       
        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }
            $scope.totalquan()
        }
        function updateprice(stt) {
            $scope.cart.list_selected[stt - 1].thanhtien = $scope.cart.list_selected[stt - 1].SalePrice * $scope.cart.list_selected[stt - 1].quan;
            $scope.totalquan()
        }
        $scope.totalquan = totalquan;
        function totalquan() {
            $scope.tongsoluong = 0;
            $scope.tongtien = 0;
            for (i in $scope.cart.list_selected) {
                $scope.tongsoluong = $scope.tongsoluong + $scope.cart.list_selected[i].quan;
                $scope.tongtien = $scope.tongtien + $scope.cart.list_selected[i].thanhtien;
            }
        }
      
        $scope.getBranchs();
        $scope.getBranch();
        $scope.getCode();
    }
})(angular.module('tiktak.itemTransfer'));