(function (app) {
    app.controller('itemAddController', itemAddController);
    itemAddController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'akFileUploaderService', '$ngBootbox'];
    function itemAddController(apiService, $scope, notificationService, $state, akFileUploaderService, $ngBootbox) {
        $scope.items = {
            Quantity: 0,
            Status: true,
            ItemCategoryID: '',
        };
        $scope.stock = [];
        $scope.itemOption = {
            HomeFlag: true,
            SalePrice: 0,
            WholesalePrice: 0,
            ClosingQuantity: 0,
            InitialPrice: 0,
            PurchasePrice: 0,
            MinimumInventory: 0,
            MaximumInventory: 0


        };

        $scope.check = check;
        $scope.checked = true;
        $scope.filterList = [];
        $scope.displayError = 'none';
        $scope.displaySuccess = 'block';

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

        $scope.getSKU = getSKU;
        function getSKU() {
            apiService.get('api/itemOption/getSKU', null, function (result) {
                $scope.itemOption.SKU = result.data;
            }, function () {
                console.log('load items failed');
            });

            apiService.get('api/itemOption/getall', null, function (result) {
                $scope.filterList = result.data;
            }, function () { });
        }
        $scope.getSKU();
        $scope.itemCategory = {
            ItemCategoryName: '',
            Status: true
        }
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });
        $scope.branch = [];
        $scope.lsItemCategory = [];
        $scope.AddItems = AddItems;
        $scope.getBranch = getBranch();
        $scope.search = search;
        $scope.dp = 'display:none;height:40px;padding:10px;';
        $scope.key = '';
        $scope.kl = 0;
        $scope.dv = 'kg';

        var ok = false;
        $scope.SaveAndAdd = function () {
            if ($scope.frmAddItem.$valid == true) {
                ok = true;
                AddItems();

            } else {
                notificationService.displayWarning('Vui lòng nhập đủ thông tin vào các trường có dấu sao màu đỏ.');
            }

        }
        //hàm chuyển đổi định dạng
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

        $scope.displayDiv = 'none';
        function search() {
            if ($scope.key !== '' && $scope.key !== undefined) {
                apiService.get('api/itemCategory/search?key=' + $scope.key, null, function (result) {
                    $scope.lsItemCategory = result.data;
                    if (result.data.length == 0) {
                        $scope.dp = 'display:block;height:40px;padding:10px;';
                        $scope.displayDiv = 'none';
                    } else {
                        $scope.dp = 'display:none';
                        $scope.displayDiv = 'block';
                    }
                }, function () {
                    console.log('load items failed');
                });
            }
            else {
                $scope.dp = 'display:none';
                $scope.displayDiv = 'none';
                $scope.lsItemCategory = [];
            }
        }       

        $scope.choose = function (item) {
            $scope.itemCategory = item;
            $scope.items.ItemCategoryID = item.Id;
            $scope.lsItemCategory = [];
            $scope.key = $scope.itemCategory.ItemCategoryName;
            $scope.dp = 'display:none';
            $scope.displayDiv = 'none';
        }

        $scope.addItemCategory = function () {
            $scope.itemCategory.ItemCategoryName = $scope.key;
            apiService.post('api/itemCategory/create', $scope.itemCategory,
                function (result) {
                    $scope.items.ItemCategoryID = result.data.Id;
                    $scope.lsItemCategory = [];
                    $scope.dp = 'display:none;height:40px;padding:10px;';
                    notificationService.displayInfo('Thêm mới loại hàng hóa ' + $scope.key + ' Thành công');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }

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

        function AddItems(items) {
            if ($scope.checked === true) {
                if ($scope.frmAddItem.$valid == true) {
                    //số tùy chọn hàng hóa         
                    $scope.items.Quantity = 1;
                    $scope.items.CreateBy = 'Hải Nam';
                    $scope.items.BranchID = '0cd830a0-f22e-4920-9602-41cb3008adff';
                    //đơn vị gốc
                    $scope.items.Unit = $scope.itemOption.Unit;
                    //thêm mới 1 hàng hóa
                    //nếu check thông báo vượt định mức thì tồn tối đa phải > tồn tối thiểu
                    if ($scope.itemOption.NotificationInventory == true && Number(ConvertNumber($scope.itemOption.MinimumInventory)) < Number(ConvertNumber($scope.itemOption.MaximumInventory)) || $scope.itemOption.NotificationInventory == false) {
                        akFileUploaderService.saveModel($scope.items, "api/item/createImg")
                            .then(function (result) {
                                $scope.itemOption.ItemID = result.data.ItemID;
                                $scope.itemOption.Image1 = result.data.Image;
                                $scope.itemOption.Name = $scope.items.Name;
                                $scope.itemOption.Status = $scope.items.Status;
                                $scope.itemOption.CreateBy = 'Hải Nam';
                                $scope.itemOption.Weigh = ConvertNumber($scope.kl) + $scope.dv;
                                $scope.itemOption.UnitName = $scope.items.Unit;
                                $scope.itemOption.UnitConvertRate = 1;
                                $scope.itemOption.ClosingQuantity = ConvertNumber($scope.itemOption.ClosingQuantity);
                                if ($scope.itemOption.Unit != undefined) {
                                    $scope.itemOption.Name += " - " + $scope.itemOption.Unit;
                                }
                                // thêm giá trị của thuộc tính vào tên tùy chọn
                                for (var index in $scope.listAttribute) {

                                    if ($scope.listAttribute[index].AttributeID != undefined) {
                                        $scope.itemOption.Name += " - " + $scope.listAttribute[index].value;
                                    }
                                }
                                //thêm tùy chọn đầu tiên
                                apiService.post('api/itemOption/create', $scope.itemOption,
                                    function (result) {
                                        $scope.listAttributeBind = [];
                                        for (var index in $scope.listAttribute) {

                                            if ($scope.listAttribute[index].AttributeID != undefined) {
                                                $scope.listAttributeBind[index] = {};
                                                $scope.listAttributeBind[index].value = $scope.listAttribute[index].value;
                                                $scope.listAttributeBind[index].AttributeID = $scope.listAttribute[index].AttributeID;
                                                $scope.listAttributeBind[index].ItemOptionID = result.data.ID;
                                            }
                                        }
                                        // thêm thuộc tính cho tùy chọn hàng hóa
                                        if ($scope.listAttributeBind.length > 0) {
                                            apiService.post("api/attributedetail/create", $scope.listAttributeBind, function (result) {
                                                notificationService.displaySuccess("Thêm mới thành công!");
                                            });
                                        }
                                        else {
                                            notificationService.displaySuccess("Thêm mới thành công!");
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

                                        if (!ok) {
                                            $state.go('items');
                                            ok = false;
                                            $scope.getSKU();
                                        }
                                        else {
                                            $state.go('items_add');
                                            ok = false;
                                            $scope.getSKU();
                                        }
                                    }, function (error) {
                                        notificationService.displayError('Thêm mới không thành công.');
                                    });
                            }, function (error) {
                                notificationService.displayError('Thêm mới không thành công.');
                            });

                    }
                    else {
                        notificationService.displayWarning('Tồn tối đa phải lớn hơn tồn tối thiểu');
                    }


                } else {
                    notificationService.displayWarning('Vui lòng nhập đủ thông tin vào các trường có dấu sao màu đỏ.');
                }
            } else {
                notificationService.displayWarning('Mã SKU đã tồn tại !!');
            }
        }

        /// thông báo vượt định mức (if $scope.itemOption.NotificationInventory=true ==> thông báo cho admin khi vượt định mức)
        $scope.itemOption.NotificationInventory = false;
        $scope.readOnly = 'none';
        $('input.number')[6].style.backgroundColor = '#d2cece';
        $('input.number')[5].style.backgroundColor = '#d2cece';
        $scope.notificationInventory = notificationInventory;
        function notificationInventory() {
            if ($scope.itemOption.NotificationInventory) {
                $scope.readOnly = 'visible';
                $('input.number')[6].style.backgroundColor = '#fbfbfb';
                $('input.number')[5].style.backgroundColor = '#fbfbfb';
            }
            else {
                $scope.readOnly = 'none';
                $('input.number')[6].style.backgroundColor = '#d2cece';
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
            }, function (error) { console.log("loadfail") });
        }
        $scope.getAllAttribute();
        //focus input attribute
        $scope.focusInput = focusInput;
        function focusInput(item) {
            item.display = "block";
            //$('div#selectAttribute').css({
            //    "display": "block"
            //});;
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
        $scope.searchAttribute = searchAttribute;
        $scope.dp1 = 'display:none;height:40px;padding:10px;';
        function searchAttribute(key) {
            // $scope.dp1 = 'display:block;height:40px;padding:10px;';

            if (key != '') {
                apiService.get("api/attribute/getByName?key=" + key, null, function (result1) {
                    if (result1.data == null) {
                        $scope.dp1 = 'display:block;height:40px;padding:10px;';
                        $scope.listAttributeView = [];
                    }
                    else {
                        $scope.dp1 = 'display:none';
                    }

                    apiService.get('api/attribute/search?key=' + key, null, function (result) {
                        $scope.listAttributeView = result.data;
                    });
                });

            }
            else {
                $scope.dp1 = 'display:none';
                $scope.getAllAttribute();
            }
        }

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

        //$scope.focusOutInput = focusOutInput;
        //function focusOutInput(item) {

        //    $(document).click(function (e) {
        //        console.log(e.target.id);
        //        if (e.target.offsetParent != "div#selectAttribute" && e.target.id != "inputAttribute") {
        //            item.display = "none";
        //        }

        //    });

        //}
        //sự kiện nhập tên
        $scope.stringname = "";
        $scope.enterName = enterName;
        function enterName() {
            $scope.stringname = $scope.items.Name;
        }
        //sự kiện kho thêm đơn vị chuyển đổi
        //$scope.ChangeUnitconvert = ChangeUnitconvert;

        //function ChangeUnitconvert() {
        //    if ($scope.items.Name != undefined) {
        //    $scope.items.Name = $scope.stringname + " - " + $scope.itemOption.Unit;
        //    if ($scope.itemOption.Unit == "") {

        //            $scope.items.Name = $scope.stringname;
        //    }

        //    }
        //}
        $scope.deleteItemsCategory = deleteItemsCategory;
        function deleteItemsCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/itemCategory/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    focusInput1();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }

    }
})(angular.module('tiktak.items'));