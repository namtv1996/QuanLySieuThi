(function (app) {
    app.controller('itemViewDetailController', itemViewDetailController);
    itemViewDetailController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', '$ngBootbox'];
    function itemViewDetailController(apiService, $scope, notificationService, $state, $stateParams, $ngBootbox) {
        $scope.items = {};
        $scope.itemOption = {
            listAttribute: []
        }
        $scope.combo = {};
        $scope.listItemOptionall = [];
        $scope.displayCombo = '';
        $scope.listNew = [];
        $scope.listItemOption = [];
        $scope.getSingleItem = getSingleItem;
        $scope.getItemOption = getItemOption;
        $scope.getItemOptionall = getItemOptionall;
        $scope.GetById = GetById;
        $scope.selectOption = selectOption;
        $scope.getcombo = getcombo;
        $scope.account = {};
        $scope.getItemCategory = getItemCategory;
        $scope.close = close;
        function close(id) {
            $('div.modal-backdrop.fade.in').remove()
                $state.go('itemOption_edit', { id: id });
      
           
        }
        function GetById(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                $scope.itemOption = result.data;
                GetSaleInvoiceByItemOptionID($scope.itemOption.ID, $scope.select1 = 1);
                getcombo();
                if ($scope.itemOption.Image1 == null) {
                    $scope.itemOption.Image1 = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                }
                apiService.get('api/stock/getStockDetail/' + $scope.itemOption.ID, null, function (result) {
                    $scope.branch = result.data;
                });
                apiService.get('api/itemOption/getall', null, function (result) {
                    $scope.filterList = result.data;
                }, function () { });
            }, function (error) {
                console.log("load data itemoption fail!")
            });
        }
        function getItemCategory() {
            apiService.get('api/itemCategory/getbyid/' + $scope.items.ItemCategoryID, null, function (result) {
                $scope.items.Category = result.data.ItemCategoryName;
            }, function (error) {
                console.log(error.data);
            });
        }
        function getSingleItem() {
            apiService.get('api/item/getbyid/' + $stateParams.id, null, function (result) {
                $scope.items = result.data;
                $scope.getItemCategory();
                $scope.getItemOption();
            }, function (error) {
                console.log(error.data);
            });
        }
        //lấy thông tin tồn kho chi tiết
        $scope.getStockInventoryDetail = getStockInventoryDetail;
        function getStockInventoryDetail(count) {
            if (count < $scope.listItemOption.length) {
                apiService.get('api/stock/getStockDetail/' + $scope.listItemOption[count].ID, null, function (result) {
                    $scope.listItemOption[count].listStockDetail = [];
                    $scope.listItemOption[count].listStockDetail = result.data;
                    // số lượng có thể bán theo chi nhánh của người dùng
                    for (var index in result.data) {
                        if (result.data[index].branchId == $scope.account.BranchID) {
                            $scope.listItemOption[count].numberByBranch = result.data[index].quantity;
                            ////nếu chỉ còn 1 chi nhánh có hàng thì số lượng có thể bán = số lượng theo chi nhánh đó - tồn tối thiểu
                            //if ($scope.listItemOption[count].numberByBranch == $scope.listItemOption[count].ClosingQuantity) {
                            //    $scope.listItemOption[count].numberByBranch = $scope.listItemOption[count].numberByBranch - $scope.listItemOption[count].MinimumInventory;
                            //}
                        }
                    }
                    getStockInventoryDetail(count + 1);
                });
            }
        }
        function getItemOption() {
            apiService.get('api/itemOption/getbyitemid/' + $stateParams.id, null, function (result) {
                $scope.listItemOption = result.data;
                apiService.get('api/account/users', null, function (result) {
                    $scope.account = result.data;
                    $scope.getStockInventoryDetail(0);
                });

                for (var i in $scope.listItemOption) {
                    if ($scope.listItemOption[i].Image1 == null) {
                        $scope.listItemOption[i].Image1 = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                }
            }, function (error) {
                console.log(error.data);
            });
        }
        var item = {};
        //cập nhật lại số lượng tùy chọn hàng hóa
        function UpdateItems(id) {
            apiService.get('api/item/getbyid/' + id, null, function (result) {
                item = result.data;
                if (item.Quantity > 1) {
                    item.Quantity = $scope.listItemOption.length;
                    apiService.put('api/item/update', item,
                        function (result) {
                            getSingleItem();
                            notificationService.displaySuccess('Cập nhật thành công hàng hóa.');
                        }, function (error) {
                            notificationService.displayError('Cập nhật không thành công.');
                        });
                }
                else {
                    var config = {
                        params: {
                            id: id
                        }
                    }
                    apiService.del('api/item/delete', config, function () {
                        $state.go('items');
                        notificationService.displaySuccess('Xóa thành công hàng hóa.');
                    }, function () {
                        notificationService.displayError('Xóa hàng hóa không thành công');
                    })
                }
            }, function (error) {
                console.log(error.data);
            });
        }
        function selectOption() {
            //lấy lịch sử giao dịch
            GetSaleInvoiceByItemOptionID($scope.itemOption.ID);
        }
        function GetSaleInvoiceByItemOptionID(id) {
            apiService.get("api/saleOrder/getSaleInvoiceByItemoptionID?ItemOptionID=" + id + "&&number=" + $scope.select1, null, function (result) {
                $scope.listSaleInvoiceWhereItem = result.data;
                if (result.data.length == 0) {

                    $scope.content2 = 'block';
                }
                else {

                    $scope.content2 = 'none';
                }
                for (var j in $scope.listSaleInvoiceWhereItem) {
                    //đóng gói
                    //hoàn  thành
                    if ($scope.listSaleInvoiceWhereItem[j].StatusID == 1) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Hoàn thành';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'available';
                    }
                    //đóng gói xuất kho thanh toán 1 phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 15) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'available';
                    }
                    //đóng gói
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 2) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 3) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, thanh toán nhưng chưa xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 4) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, thanh toán 1 phần nhưng chưa xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 45) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói thanh toán nhưng chưa xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 5) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //trả hàng thành công
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 6) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Hoàn thành';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'available';
                    }
                    //đặt hàng
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 7) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đặt hàng';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'not-available';
                    }
                    //chọn duyệt đơn thì sang trạng thái đang giao dịch
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 8) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //thanh toán chưa đóng gói xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 9) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //thanh toán 1 phần chưa đóng gói xuất kho
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 95) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    // đơn hàng bị hủy(trạng thái đặt hàng mới được hủy)
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 10) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đã hủy';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'red';
                    }
                    //hoàn thành + trả hàng toàn phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 11) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Hoàn thành';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'available';
                    }
                    //hoàn thành + trả hàng 1 phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 12) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Hoàn thành';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'available';
                    }
                    //đóng gói, xuất kho, thanh toán 1 phần + trả hàng 1 phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 13) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, xuất kho, thanh toán 1 phần + trả hàng toàn phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 14) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, xuất kho, chưa thanh toán + trả hàng 1 phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 16) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-adjust';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                    //đóng gói, xuất kho, chưa thanh toán + trả hàng toàn phần
                    else if ($scope.listSaleInvoiceWhereItem[j].StatusID == 17) {
                        $scope.listSaleInvoiceWhereItem[j].cl1 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl2 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl3 = 'fa fa-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl4 = 'fa fa-check-circle-o';
                        $scope.listSaleInvoiceWhereItem[j].cl5 = 'Đang giao dịch';
                        $scope.listSaleInvoiceWhereItem[j].icon = 'blue';
                    }
                }

            });
        }
        $scope.deleteItems = function (id, itemid) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id,
                        itemid: itemid
                    }
                }

                apiService.get('api/itemOption/deleteItemOption', config, function (result) {
                    if (result.data === 1) {
                        notificationService.displayWarning('Hàng hóa này đã phát sinh giao dịch. Không thể xóa !!');
                    } else {
                        $scope.getSingleItem();
                        notificationService.displaySuccess('Đã xóa hàng hóa !!');
                    }
                   
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
   
       
        function getItemOptionall() {
            apiService.get('api/itemOption/getall', null, function (result) {
                $scope.listItemOptionall = result.data;
            }, function (error) { });
        }
        function getcombo() {
            apiService.get('api/combo/getbyid/' + $scope.itemOption.ID, null, function (result) {
                $scope.combo = result.data;
                if ($scope.combo.length == 0) {
                    $scope.displayCombo = 'none !important';
                } else {
                    $scope.displayCombo = 'block !important';
                    var q = 0;
                    for (k in $scope.combo) {
                        for (x in $scope.listItemOptionall) {

                            if ($scope.combo[k].ItemID == $scope.listItemOptionall[x].ID) {
                                $scope.listNew[q] = {};
                                $scope.listNew[q].ID = $scope.listItemOptionall[x].ID;
                                $scope.listNew[q].ItemID = $scope.listItemOptionall[x].ItemID;
                                $scope.listNew[q].SKU = $scope.listItemOptionall[x].SKU;
                                $scope.listNew[q].Image1 = $scope.listItemOptionall[x].Image1;
                                $scope.listNew[q].SalePrice = $scope.listItemOptionall[x].SalePrice;
                                $scope.listNew[q].Name = $scope.listItemOptionall[x].Name;
                                $scope.listNew[q].QuantityItem = $scope.combo[k].QuantityItem;
                                q++;
                            }
                        }
                    }
                }
            }, function (error) {
                console.log(error.data);
            });
        }

        $scope.getSingleItem();
        $scope.getItemOptionall();
    }
})(angular.module('tiktak.items'));