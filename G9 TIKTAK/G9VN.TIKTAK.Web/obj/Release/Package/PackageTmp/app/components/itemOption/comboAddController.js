(function (app) {
    app.controller('comboAddController', comboAddController);
    comboAddController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', 'akFileUploaderService'];
    function comboAddController(apiService, $scope, notificationService, $state, $stateParams, akFileUploaderService) {

        $scope.GetById = GetById;
        $scope.chooseProduct = chooseProduct;
        $scope.items = {};
        $scope.cart = {
            list_selected: [],
        };
        $scope.kl = 0;
        $scope.ComBo = {
        };
        $scope.dv = 'kg';
        $scope.branch = [];
        $scope.filterList = [];
        $scope.stock = [];
        $scope.displayError = 'none';
        $scope.displaySuccess = 'block';
        $scope.dis = 'none';
        $scope.del = del;
        $scope.updateprice = updateprice;
        $scope.AddComBo = AddComBo;
        $scope.check = check;
        $scope.checked = true;
        $scope.filterList = [];
        $scope.max = 0;


        function check() {
            $scope.checked = true;
            for (var i in $scope.filterList) {
                if ($scope.filterList[i].SKU === $scope.itemOption.SKU) {
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
        function GetById() {
            apiService.get('api/item/getbyid/' + $stateParams.id, null, function (result) {
                $scope.items = result.data;
                $scope.itemOption.Name = $scope.items.Name;
                $scope.itemOption.ItemID = $scope.items.ItemID;

                apiService.get('api/itemOption/getall', null, function (result) {
                    $scope.filterList = result.data;
                }, function () { });

            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        $scope.GetById();
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });
        //lấy ds chi nhánh
        $scope.getBranch = getBranch();
        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.branch = result.data;
                for (var index in result.data) {
                    $scope.branch[index].ClosingQuantity = 0;
                }
            }, function () {
                console.log('load itemCategory failed');
            });
        }
        //tính tổng tồn kho toàn hệ thống
        $scope.calculateClosingQuantity = calculateClosingQuantity;
        function calculateClosingQuantity() {
            $scope.itemOption.ClosingQuantity = 0;
            for (var index in $scope.branch) {
                $scope.itemOption.ClosingQuantity += $scope.branch[index].ClosingQuantity;
            }
        }
        $scope.itemOption = {
            Status: true,
            Image1: '../../../Assets/admin/img/camera1.png',
            UnitConvertRate: 1,
            WholesalePrice: 0,
            PurchasePrice: 0,
            SalePrice: 0,
            UnitName: '',
            MinimumInventory: 0,
            MaximumInventory: 0,
            Status: true,
            HomeFlag: true,
            Weigh: 0
        }
        $scope.dv = 'kg';
        //nhấn lưu thêm
        var a = false;
        $scope.AddItemOption2 = function (itemOption) {
            a = true;
            $scope.AddItemOption(itemOption);
        }
        //nhấn lưu
        $scope.AddItemOption = AddItemOption;
        function AddItemOption(itemOption) {
            var kt=false;
            for (s in $scope.branch) {
                if(0 !== $scope.branch[s].ClosingQuantity && $scope.branch[s].ClosingQuantity <= $scope.max){
                    kt = true;
                    break;
                }else{
                    kt=false;
                }
            }
            if (kt==true) {
                if ($scope.checked === true) {
                    if ($scope.itemOption.NotificationInventory == true && Number(ConvertNumber($scope.itemOption.MinimumInventory)) < Number(ConvertNumber($scope.itemOption.MaximumInventory)) || $scope.itemOption.NotificationInventory == false) {
                        $scope.itemOption.Weigh = ConvertNumber($scope.kl) + $scope.dv;
                        if ($scope.itemOption.ClosingQuantity != undefined) {
                            $scope.itemOption.ClosingQuantity = ConvertNumber($scope.itemOption.ClosingQuantity);
                        }
                        //cập nhật tên tùy chọn
                        if ($scope.itemOption.UnitName != "" && $scope.itemOption.UnitName != undefined) {
                            $scope.itemOption.Name += " - " + $scope.itemOption.UnitName;
                        }
                        // thêm giá trị của thuộc tính vào tên tùy chọn
                        for (var index in $scope.listAttribute) {
                            if ($scope.listAttribute[index].AttributeID != undefined) {
                                $scope.itemOption.Name += " - " + $scope.listAttribute[index].value;
                            }
                        }
                        akFileUploaderService.saveModel(itemOption, "api/itemOption/createImg").then(function (result) {
                            $scope.listAttributeBind = [];
                            for (var index in $scope.listAttribute) {
                                if ($scope.listAttribute[index].AttributeID != undefined) {
                                    $scope.listAttributeBind[index] = {};
                                    $scope.listAttributeBind[index].value = $scope.listAttribute[index].value;
                                    $scope.listAttributeBind[index].AttributeID = $scope.listAttribute[index].AttributeID;
                                    $scope.listAttributeBind[index].ItemOptionID = result.data.ID;
                                }
                            }
                            if ($scope.listAttributeBind.length > 0) {
                                apiService.post("api/attributedetail/create", $scope.listAttributeBind, function (result) {
                                    notificationService.displaySuccess("Thêm mới thành công!");
                                    AddComBo(0, result.data);
                                });
                            } else {
                                notificationService.displaySuccess('Thêm thành công');
                                AddComBo(0, result.data);
                            }
                            //thêm tồn kho ban đầu theo từng chi nhánh
                            for (var index in $scope.branch) {
                                $scope.stock[index] = {};
                                $scope.stock[index].StockID = "00000000-0000-0000-0000-000000000000";
                                $scope.stock[index].BranchID = $scope.branch[index].BranchID;
                                $scope.stock[index].ItemOptionID = result.data.ID;
                                $scope.stock[index].Quantity = $scope.branch[index].ClosingQuantity;
                                $scope.stock[index].InitialInventory = $scope.branch[index].ClosingQuantity;
                            }
                            apiService.post('api/stock/create', $scope.stock, function (result) {
                            });
                            $scope.items.Quantity += 1;
                            apiService.put('api/item/update', $scope.items);
                            if (!a) {
                                $state.go('items_view', { id: $scope.items.ItemID });
                                a = false;
                            } else {
                                $state.go('itemOption_add');
                                a = false;
                            }

                        }, function (error) {
                            notificationService.displayError('Thêm mới không thành công.');
                        });
                    }
                    else {
                        notificationService.displayWarning('Tồn tối đa phải lớn hơn tồn tối thiểu');
                    }
                }
                else {
                    notificationService.displayWarning('Mã SKU đã tồn tại !!');
                }

            } else {
                notificationService.displayInfo('Bạn phải nhập số lượng tồn kho cho chi nhánh không quá '+$scope.max+' hoặc phải bằng '+$scope.max+'  !');
            }
        }
        $scope.getSKU = getSKU;
        function getSKU() {
            apiService.get('api/itemOption/getSKU', null, function (result) {
                $scope.itemOption.SKU = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.getSKU();
        /// thông báo vượt định mức (if $scope.itemOption.NotificationInventory=true ==> thông báo cho admin khi vượt định mức)
        $scope.itemOption.NotificationInventory = false;
        $scope.readOnly = 'none';
        $('input.number')[2].style.backgroundColor = '#d2cece';
        $('input.number')[6].style.backgroundColor = '#d2cece';
        $scope.notificationInventory = notificationInventory;
        function notificationInventory() {
            if ($scope.itemOption.NotificationInventory) {
                $scope.readOnly = 'visible';
                $('input.number')[2].style.backgroundColor = '#fbfbfb';
                $('input.number')[6].style.backgroundColor = '#fbfbfb';
            }
            else {
                $scope.readOnly = 'none';
                $('input.number')[2].style.backgroundColor = '#d2cece';
                $('input.number')[6].style.backgroundColor = '#d2cece';
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
        //lấy ds thuộc tính
        $scope.listAttributeView = [];
        $scope.getAllAttribute = getAllAttribute;
        function getAllAttribute() {
            apiService.get("api/attribute/getAll", null, function (result) {
                $scope.listAttributeView = result.data;
            }, function (error) { console.log("loadfail") });
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
                    }
                    else {
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
        //thêm mới 1 thuộc tính vào csdl
        $scope.addNewAttribute = addNewAttribute;
        function addNewAttribute(name) {
            $scope.attributeNew = {};
            $scope.attributeNew.Name = name;
            $scope.attributeNew.Status = true;
            apiService.post("api/attribute/create", $scope.attributeNew, function (result) {
                notificationService.displaySuccess("Thêm mới thuộc tính " + result.data.Name);
                $scope.dp1 = 'display:none';
            });
        }
        function chooseProduct(id, sl) {
            $('#info').fadeIn(3000);
            if (sl <= 0) {
                notificationService.displayError('Sản phẩn không còn hàng trong kho');
            }else{
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
                        item.quantity = sl;
                        item.thanhtien = item.SalePrice * item.quan;
                        $scope.max = item.quantity / item.quan;
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
                            item.quantity = sl;
                            item.thanhtien = item.SalePrice * item.quan;
                            var G = item.quantity / item.quan;
                            if (G < $scope.max) {
                                $scope.max = G;
                            }
                            $scope.cart.list_selected.push(item);
                        }
                        else {
                            $scope.cart.list_selected[pos].quan++;
                            $scope.cart.list_selected[pos].thanhtien = ($scope.cart.list_selected[pos].SalePrice * $scope.cart.list_selected[pos].quan);
                            var A = ($scope.cart.list_selected[pos].quantity / $scope.cart.list_selected[pos].quan);
                            if (A < $scope.max) {
                                $scope.max = A;
                            }
                        }
                    } var pos = -1;
                    $scope.totalquan();

                }, function (error) {
                    notificationService.displayError(error.data);
                });}
            $scope.dis = 'none';
            $scope.searchText = '';
        }
        $scope.search = function () {
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
        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }
            $scope.totalquan()
        }
        function updateprice() {
            $scope.max = 0;
            for (var i=0; i<$scope.cart.list_selected.length;i++) {
                $scope.cart.list_selected[i].thanhtien = $scope.cart.list_selected[i].SalePrice * $scope.cart.list_selected[i].quan;
                if (i === 0) {
                    var B = $scope.cart.list_selected[i].quantity / $scope.cart.list_selected[i].quan;
                    $scope.max = B.toFixed(0);
                }
                else {
                    var B = $scope.cart.list_selected[i].quantity / $scope.cart.list_selected[i].quan;                   
                    if (B < $scope.max) {
                        $scope.max = B.toFixed(0);
                    }
                }
                
            }
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
        function AddComBo(i, item) {
            if (i < $scope.cart.list_selected.length) {
                $scope.ComBo.ComboID = item.ID;
                $scope.ComBo.ItemID = $scope.cart.list_selected[i].ID;
                $scope.ComBo.QuantityItem = $scope.cart.list_selected[i].quan;
                $scope.ComBo.TransferPrice = $scope.cart.list_selected[i].SalePrice;
                $scope.ComBo.TotalAmount = ($scope.cart.list_selected[i].quan * $scope.cart.list_selected[i].SalePrice);
                apiService.post('api/combo/create', $scope.ComBo,
                    function (result) {
                        AddComBo(i + 1, item);
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            }
            else {
                notificationService.displaySuccess('Thêm mới thành công !!');
                $state.go('stockTransferDetail', { id: item.VoucherID });
            }
        }

    }
})(angular.module('tiktak.itemOption'));