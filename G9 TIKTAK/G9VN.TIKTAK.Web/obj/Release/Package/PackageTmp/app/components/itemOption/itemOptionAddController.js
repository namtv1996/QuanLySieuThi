(function (app) {
    app.controller('itemOptionAddController', itemOptionAddController);
    itemOptionAddController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams', 'akFileUploaderService'];
    function itemOptionAddController(apiService, $scope, notificationService, $state, $stateParams, akFileUploaderService) {

        $scope.GetById = GetById;
        $scope.items = {};
        $scope.kl = 0;
        $scope.dv = 'kg';
        $scope.branch = [];
        $scope.stock = [];
        $scope.displayError = 'none';
        $scope.displaySuccess = 'block';

        $scope.check = check;
        $scope.checked = true;
        $scope.filterList = [];
       
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
                        for (var i in $scope.listAttribute) {
                            if ($scope.listAttribute[i].AttributeID != undefined) {
                                $scope.listAttributeBind[i] = {};
                                $scope.listAttributeBind[i].value = $scope.listAttribute[i].value;
                                $scope.listAttributeBind[i].AttributeID = $scope.listAttribute[i].AttributeID;
                                $scope.listAttributeBind[i].ItemOptionID = result.data.ID;
                            }
                        }
                        if ($scope.listAttributeBind.length > 0) {
                            apiService.post("api/attributedetail/create", $scope.listAttributeBind, function (result) {
                                notificationService.displaySuccess("Thêm mới thành công!");
                            });
                        } else {
                            notificationService.displaySuccess('Thêm thành công');
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
                        apiService.put('api/item/update', $scope.items, function (result) {
                        if (!a) {
                            $state.go('items_view', { id: $scope.items.ItemID });
                            a = false;
                        } else {
                            $state.go('itemOption_add');
                            $scope.itemOption.Name = $scope.items.Name;
                            a = false;
                        }
                        },
                            function(error){}
                        );
                        

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
        //sự kiện kho thêm đơn vị chuyển đổi
        //$scope.ChangeUnitconvert = ChangeUnitconvert;

        //function ChangeUnitconvert() {

        //    $scope.itemOption.Name = $scope.items.Name + " - " + $scope.itemOption.UnitName;
        //    if ($scope.itemOption.UnitName == "") {
        //        $scope.itemOption.Name = $scope.items.Name;
        //    }
        //}
    }
})(angular.module('tiktak.itemOption'));