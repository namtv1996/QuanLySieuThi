(function (app) {
    app.controller('itemEditController', itemEditController);
    itemEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', 'akFileUploaderService'];
    function itemEditController(apiService, $scope, notificationService, $state, $stateParams, akFileUploaderService) {
        $scope.items = {
            Status: true
        }

        $scope.UpdateItems = UpdateItems;
        $scope.GetById = GetById;
        $scope.itemCategory = {
            ItemCategoryName: '',
            Status: true
        }

        function GetById() {
            apiService.get('api/item/getbyid/' + $stateParams.id, null, function (result) {
                $scope.items = result.data;
                apiService.get('api/itemCategory/getbyid/' + $scope.items.ItemCategoryID, null, function (result1) {
                    $scope.key = result1.data.ItemCategoryName;
                });
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        var lsItemOp = [];
        function getItemOption() {
            apiService.get('api/itemOption/getbyitemid/' + $scope.items.ItemID, null, function (result) {
                lsItemOp = result.data;
                if ($scope.items.Status == true) {
                    var ok = false;
                    for (var i in lsItemOp) {
                        if (lsItemOp[i].Status == true) {
                            ok = true;
                            break;
                        }
                    }
                    if (ok = false) {
                        for (var i in lsItemOp) {
                            lsItemOp[i].Status = true;
                        }
                        UpdateItemOption(0);
                    }
                    else {
                        notificationService.displaySuccess('Cập nhật thành công.');
                        $state.go('items');
                    }
                }
                else {
                    for (var i in lsItemOp) {
                        lsItemOp[i].Status = false;
                    }
                    UpdateItemOption(0);
                }
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function UpdateItemOption(i) {
            if (i < lsItemOp.length) {
                apiService.put('api/itemOption/update', lsItemOp[i],
                    function (result) {
                        UpdateItemOption(i + 1);
                    }, function (error) {
                        notificationService.displayError('Cập nhật không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Cập nhật thành công.');
                $state.go('items');
            }
        }

        function UpdateItems(items) {
            akFileUploaderService.updateModel(items, "api/item/updateImg").then(function (result) {
                getItemOption();
            }, function (error) {
                notificationService.displayError('Cập nhật không thành công.');
            });
        }
        GetById();

        $scope.dp = 'display:none;height:40px;padding:10px;';
        $scope.addItemCategory = function () {
            $scope.itemCategory.ItemCategoryName = $scope.key;
            apiService.post('api/itemCategory/create', $scope.itemCategory,
                        function (result) {
                            $scope.items.ItemCategoryID = result.data.Id;
                            $scope.lsItemCategory = [];
                            $scope.dp = 'display:none;height:40px;padding:10px;';
                            notificationService.displayInfo('Thêm mới nhóm hàng ' + $scope.key + ' thành công.');
                        }, function (error) {
                            notificationService.displayError('Thêm mới nhóm hàng hóa không thành công.');
                        });
        }
        //tìm kiếm loại hàng hóa
        $scope.lsItemCategory = [];
        $scope.search = search;
        function search() {
            $scope.dp = 'display:block;height:40px;padding:10px;';
            if ($scope.key != '') {
                apiService.get('api/itemCategory/search?key=' + $scope.key, null, function (result) {
                    $scope.lsItemCategory = result.data;
                }, function () {
                    console.log('load items failed');
                });
            }
            else {
                $scope.dp = 'display:none';
                $scope.lsItemCategory = [];
            }
        }
        // chọn Loại hàng hóa
        $scope.choose = choose;
        function choose(item) {
            $scope.itemCategory = item;
            $scope.items.ItemCategoryID = item.Id;
            $scope.lsItemCategory = [];
            $scope.key = $scope.itemCategory.ItemCategoryName;
            $scope.dp = 'display:none';
        }

    }
})(angular.module('tiktak.items'));