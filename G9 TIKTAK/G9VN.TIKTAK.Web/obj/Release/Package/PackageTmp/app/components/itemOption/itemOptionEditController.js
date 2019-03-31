(function (app) {
    app.controller('itemOptionEditController', itemOptionEditController);
    itemOptionEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', 'akFileUploaderService'];

    function itemOptionEditController(apiService, $scope, notificationService, $state, $stateParams, akFileUploaderService) {
        $scope.itemOption = {
            listAttribute: [],
            Status: true,
            SKU_change: null
        }
        // ds chi nhánh
        $scope.branch = [];
        $scope.stock = [];
        $scope.stringname = "";
        // tổng tồn kho ban đầu 
        $scope.ClosingQuantity1= 0;
        $scope.UpdateItemOption = UpdateItemOption;
        $scope.UpdateStatusItem = UpdateStatusItem;
        $scope.GetById = GetById;
        $scope.unit = '';
        var items = {};
        $scope.select1 = '1';
        $scope.listSaleInvoiceWhereItem = [];
        $scope.dv = 'kg';

        $scope.check = check;
        $scope.checked = true;
        $scope.filterList = [];

        $scope.displayError = 'none';
        $scope.displaySuccess = 'block';

        function check() {
            $scope.checked = true;
            for (var i in $scope.filterList) {
                if ($scope.filterList[i].SKU === $scope.itemOption.SKU_change && $scope.filterList[i].SKU !== $scope.itemOption.SKU) {
                    $scope.checked = false;
                    $scope.displayError = 'block';
                    $scope.displaySuccess = 'none';
                    break;
                }
                else {
                    $scope.checked = true;
                    $scope.displayError = 'none';
                    $scope.displaySuccess = 'block';
                }
            }
        }

        //chuyển định dạng tiền sang số
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
        //Dinh dang tien VND
        $scope.Currency = Currency;

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
        var listItemsOption = [];
        var ok = false;

        function UpdateStatusItem() {
            apiService.get('api/itemOption/getbyitemid/' + $scope.itemOption.ItemID, null, function (result) {
                listItemsOption = result.data;
                if (listItemsOption.length > 1) {
                    for (var i in listItemsOption) {
                        if (listItemsOption[i].Status == true) {
                            ok = true;
                            break;
                        }
                    }
                } else {
                    ok = $scope.itemOption.Status;
                }
                items.Status = ok;
                apiService.put('api/item/update', items,
                    function (result) {
                        notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                        window.history.back();
                    },
                    function (error) {
                        notificationService.displayError('Cập nhật hàng hóa không thành công.');
                    });


            }, function (error) {
                notificationService.displayError('itemOption load fail');
            });
        }
        //tùy chọn nâng cao-  lịch sử giao dịch
        $scope.selectOption = function () {
            //lấy lịch sử giao dịch
            GetSaleInvoiceByItemOptionID($scope.itemOption.ID);
        }
        //lấy lịch sử giao dịch của tùy chọn       
        $scope.content2 = 'none';
        $scope.columnname = 'VoucherNo'
        function GetSaleInvoiceByItemOptionID(id) {
            apiService.get("api/saleOrder/getSaleInvoiceByItemoptionID?ItemOptionID=" + id + "&&number=" + Number($scope.select1), null, function (result) {
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
        //lấy thông tin tùy chọn hàng hóa
        function GetById() {
            apiService.get('api/itemOption/getbyid/' + $stateParams.id, null, function (result) {
                $scope.itemOption = result.data;
                $scope.itemOption.SKU_change = $scope.itemOption.SKU;
                if ($scope.itemOption.Image1 == null) {
                    $scope.itemOption.Image1 = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                }
                $scope.itemOption.WholesalePrice = Currency($scope.itemOption.WholesalePrice);
                $scope.itemOption.MinimumInventory = Currency($scope.itemOption.MinimumInventory);
                //$scope.itemOption.ClosingQuantity = Currency($scope.itemOption.ClosingQuantity);
                $scope.itemOption.PurchasePrice = Currency($scope.itemOption.PurchasePrice);
                $scope.itemOption.SalePrice = Currency($scope.itemOption.SalePrice);
                $scope.itemOption.MaximumInventory = Currency($scope.itemOption.MaximumInventory);

                $scope.stringname = $scope.itemOption.Name;
                $scope.notificationInventory();

                apiService.get('api/account/users', null, function (result1) {
                    var acc = result1.data;
                    //lấy thông tin tồn kho chi tiết
                    apiService.get('api/stock/getStockDetail/' + $scope.itemOption.ID, null, function (result) {
                        $scope.branch = result.data;
                        for (var index in result.data) {
                            $scope.ClosingQuantity1 += result.data[index].initialinventory;
                            if (acc.BranchID === result.data[index].branchId) {
                                $scope.InventoryOfBranch = result.data[index].quantity;
                            }
                        }
                    });
                });
               

                //lấy ds thuộc tính của tùy
                apiService.get("api/attributedetail/getListAttribute/" + $scope.itemOption.ID, null, function (result1) {
                    $scope.itemOption.listAttribute = result1.data;
                    for (var index in $scope.itemOption.listAttribute) {
                        $scope.listAttribute[index] = {};
                        $scope.listAttribute[index].name = $scope.itemOption.listAttribute[index].Name;
                        $scope.listAttribute[index].value = $scope.itemOption.listAttribute[index].value;
                        $scope.listAttribute[index].display = "none";
                        $scope.listAttribute[index].index = index;
                        $scope.listAttribute[index].AttributeID = $scope.itemOption.listAttribute[index].AttributeID;
                    }
                    //lấy lịch sử giao dịch
                    GetSaleInvoiceByItemOptionID($scope.itemOption.ID);
                }, function (error) {
                    console.log("load data Attribute ItemOption  fail!")
                });

                apiService.get('api/itemOption/getall', null, function (result) {
                    $scope.filterList = result.data;
                }, function () { });
            }, function (error) {
                console.log("load data itemoption fail!")
            });
        }

        function UpdateItemOption(itemOption) {
            if ($scope.checked === true) {
                if ($scope.itemOption.NotificationInventory == true && Number(ConvertNumber($scope.itemOption.MinimumInventory)) < Number(ConvertNumber($scope.itemOption.MaximumInventory)) || $scope.itemOption.NotificationInventory == false) {
                    $scope.itemOption.ClosingQuantity = ConvertNumber($scope.itemOption.ClosingQuantity);
                    $scope.itemOption.SKU = $scope.itemOption.SKU_change;
                    apiService.get('api/item/getbyid/' + $scope.itemOption.ItemID, null, function (result) {
                        items = result.data;
                        var stringName = items.Name;
                        $scope.itemOption.Name = stringName;
                        //cập nhật tên tùy chọn
                        if ($scope.itemOption.UnitName != "" && $scope.itemOption.UnitName != undefined) {
                            $scope.itemOption.Name += " - " + $scope.itemOption.UnitName;
                        }
                        $scope.listAttributeBind = [];
                        for (var index in $scope.listAttribute) {
                            if ($scope.listAttribute[index].AttributeID != undefined) {
                                $scope.itemOption.Name += " - " + $scope.listAttribute[index].value;
                            }
                            if ($scope.listAttribute[index].AttributeID != undefined) {
                                $scope.listAttributeBind[index] = {};
                                $scope.listAttributeBind[index].value = $scope.listAttribute[index].value;
                                $scope.listAttributeBind[index].AttributeID = $scope.listAttribute[index].AttributeID;
                                $scope.listAttributeBind[index].ItemOptionID = $scope.itemOption.ID;
                            }
                        }
                        //cập nhật lại các thuộc tính của tùy chọn
                        apiService.del("api/attributedetail/deleteAttributeDetail?id=" + $scope.itemOption.ID, null, function (result) {
                            // thêm thuộc tính cho tùy chọn hàng hóa
                            if ($scope.listAttributeBind.length > 0) {
                                apiService.post("api/attributedetail/create", $scope.listAttributeBind, function (result) { });
                            }
                        });
                        //cập nhật tùy chọn           
                        akFileUploaderService.updateModel(itemOption, "api/itemOption/updateImg").then(function (result) {
                            UpdateStatusItem();
                            //Cập nhật tồn kho theo chi nhánh
                            //xóa các chi tiết tồn kho 
                            apiService.del('api/stock/deleteByItemoptionID/' + itemOption.ID, null, function (result) {
                                //thêm tồn kho ban đầu theo từng chi nhánh
                                for (var index in $scope.branch) {
                                    $scope.stock[index] = {};
                                    $scope.stock[index].StockID = "00000000-0000-0000-0000-000000000000";
                                    $scope.stock[index].BranchID = $scope.branch[index].branchId;
                                    $scope.stock[index].ItemOptionID = itemOption.ID;
                                    $scope.stock[index].Quantity = $scope.branch[index].quantity;
                                    $scope.stock[index].InitialInventory = $scope.branch[index].initialinventory;
                                }
                                apiService.post('api/stock/create', $scope.stock, function (result) {

                                });
                            });
                        }, function (error) {
                            notificationService.displayError('Cập nhật không thành công.');
                        });
                    });
                } else {
                    notificationService.displayWarning('Tồn tối đa phải lớn hơn tồn tối thiểu');
                }
            } else {
                notificationService.displayWarning('Mã SKU đã tồn tại !!');
            }
           

        }

        GetById();
        /// thông báo vượt định mức (if $scope.itemOption.NotificationInventory=true ==> thông báo cho admin khi vượt định mức)
        $scope.itemOption.NotificationInventory = false;
        $scope.readOnly = 'none';
        $('input.number')[1].style.backgroundColor = '#d2cece';
        $('input.number')[5].style.backgroundColor = '#d2cece';
        $scope.notificationInventory = notificationInventory;

        function notificationInventory() {
            if ($scope.itemOption.NotificationInventory) {
                $scope.readOnly = 'visible';
                $('input.number')[1].style.backgroundColor = '#fbfbfb';
                $('input.number')[5].style.backgroundColor = '#fbfbfb';
            } else {
                $scope.readOnly = 'none';
                $('input.number')[1].style.backgroundColor = '#d2cece';
                $('input.number')[5].style.backgroundColor = '#d2cece';
            }
        };
        //thêm mới thuộc tính
        $scope.listAttribute = [];
        var i = 0;
        $scope.attribute = {
            display: "none",
            name: "",
            value: "",
            index: 0
        };
        $scope.listAttribute.push($scope.attribute);
        $scope.addAttribute = addAttribute;

        function addAttribute() {
            i++;
            var index = Number($scope.listAttribute.length);
            $scope.listAttribute[index] = {};
            $scope.listAttribute[index].index = i;
            $scope.listAttribute[index].display = "none";
            $scope.listAttribute[index].name = "";
            $scope.listAttribute[index].value = "";

        }
        //xóa 1 thuộc tính
        $scope.deleteAttribute = deleteAttribute;

        function deleteAttribute(id) {
            for (var index in $scope.listAttribute) {
                if ($scope.listAttribute[index].index == id) {
                    //xóa 1 phần tử từ vị trí index;
                    $scope.listAttribute.splice(index, 1);
                }
            }
        }
        //lấy ds thuộc tính
        $scope.listAttributeView = [];
        $scope.getAllAttribute = getAllAttribute;

        function getAllAttribute() {
            apiService.get("api/attribute/getAll", null, function (result) {
                $scope.listAttributeView = result.data;
            }, function (error) {
                console.log("loadfail")
            });
        }
        $scope.getAllAttribute();
        //focus input
        $scope.focusInput = focusInput;

        function focusInput(item) {
            item.display = "block";
            if (item.name != "") {
                apiService.get("api/attribute/getByName?key=" + item.name, null, function (result1) {
                    if (result1.data == null) {
                        $scope.dp1 = 'display:block;height:40px;padding:10px;';
                        $scope.listAttributeView = [];
                    } else {
                        $scope.dp1 = 'display:none';
                    }

                    apiService.get('api/attribute/search?key=' + item.name, null, function (result) {
                        $scope.listAttributeView = result.data;
                    });
                });

            }
        }
        // chọn 1 thuộc tính
        $scope.chooseAttribute = chooseAttribute;

        function chooseAttribute(item1, item) {
            item.AttributeID = item1.AttributeID;
            item.name = item1.Name;
            item.display = "none";
            $scope.dp1 = 'display:none';
        }

        //tìm kiếm thuộc tính
        $scope.searchAttribute = searchAttribute;
        $scope.dp1 = 'display:none;height:40px;padding:10px;';

        function searchAttribute(key) {
            // $scope.dp1 = 'display:block;height:40px;padding:10px;';

            if (key != '') {
                apiService.get("api/attribute/getByName?key=" + key, null, function (result1) {
                    if (result1.data == null) {
                        $scope.dp1 = 'display:block;height:40px;padding:10px;';
                        $scope.listAttributeView = [];
                    } else {
                        $scope.dp1 = 'display:none';
                    }

                    apiService.get('api/attribute/search?key=' + key, null, function (result) {
                        $scope.listAttributeView = result.data;
                    });
                });

            } else {
                $scope.dp1 = 'display:none';
                $scope.getAllAttribute();
            }
        }

        //thêm mới 1 thuộc tính vào csdl
        $scope.addNewAttribute = addNewAttribute;

        function addNewAttribute(name) {
            $scope.attributeNew = UpdateItemOption
            $scope.attributeNew.Name = name;
            $scope.attributeNew.Status = true;
            apiService.post("api/attribute/create", $scope.attributeNew, function (result) {
                notificationService.displaySuccess("Thêm mới thuộc tính " + result.data.Name);
                $scope.dp1 = 'display:none';
            });
        }

        //tính tổng tồn kho toàn hệ thống
        $scope.calculateClosingQuantity = calculateClosingQuantity;

        function calculateClosingQuantity() {
            $scope.ClosingQuantity1 = 0;
            for (var index in $scope.branch) {
                $scope.ClosingQuantity1 += $scope.branch[index].initialinventory;
            }
        }

    }
})(angular.module('tiktak.itemOption'));