(function (app) {
    app.controller('itemListController', itemListController);

    itemListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function itemListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listItems = [];
        $scope.items = {};
        $scope.getItems = getItems;
        $scope.deleteItems = deleteItems;
        $scope.GetById = GetById;
        $scope.stopDeal = stopDeal;
        $scope.UpdateItems = UpdateItems;
        $scope.getbranch = getbranch;
        $scope.listBranch = [];

        function getbranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranch = result.data;
            });
        }
        $scope.getbranch();
        function GetById(id) {
            apiService.get('api/item/getbyid/' + id, null, function (result) {
                $scope.items = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function stopDeal(id, ok) {
            apiService.get('api/item/getbyid/' + id, null, function (result) {
                $scope.items = result.data;
                $scope.items.Status = ok;
                UpdateItems();
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function UpdateItems() {
            apiService.put('api/item/update', $scope.items,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    for (var i in $scope.listItems) {
                        if ($scope.listItems[i].Status == true) {
                            $scope.listItems[i].tt = "Đang giao dịch";
                            $scope.listItems[i].cs = "available";
                        }
                        else {
                            $scope.listItems[i].tt = "Ngừng giao dịch";
                            $scope.listItems[i].cs = "not-available";
                        }
                    }
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
        function getItemCategory(i) {
            if (i < $scope.listItems.length) {
                if ($scope.listItems[i].ItemCategoryID != null && $scope.listItems[i].ItemCategoryID != '') {
                    apiService.get('api/itemCategory/getbyid/' + $scope.listItems[i].ItemCategoryID, null, function (result) {
                        $scope.listItems[i].Category = result.data.ItemCategoryName;
                        getItemCategory(i + 1);
                    }, function (error) {
                        console.log('load items failed');
                    });
                }
                else {
                    $scope.listItems[i].Category = '';
                }
            }
        }
        //LẤY DS Item
        function getItems() {
            apiService.get('api/item/getall', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }

                $scope.listItems = result.data;
                for (var i in $scope.listItems) {
                    if ($scope.listItems[i].Image == null) {
                        $scope.listItems[i].Image = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                }
                getItemCategory(0);
                for (var i in $scope.listItems) {
                    if ($scope.listItems[i].Status == true) {
                        $scope.listItems[i].tt = "Đang giao dịch";
                        $scope.listItems[i].cs = "available";
                    }
                    else {
                        $scope.listItems[i].tt = "Ngừng giao dịch";
                        $scope.listItems[i].cs = "not-available";
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }
        ///XÓA Item
        function deleteItems(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/item/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getItems();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
        ////SẮP XẾP
        //ban đầu  sắp xếp theo ngày tạo mới nhất
        $scope.getItems();
        $scope.columnName = 'CreateDate';
        $scope.reverse = true;
        $scope.clas = '';
        $scope.orderByTag = function (propertyName) {
            //đảo chiều mỗi khi click lại
            $scope.reverse = ($scope.columnName === propertyName) ? !$scope.reverse : false;
            //đổi icon
            if (propertyName === 'Name' && $scope.reverse == false) {
                $scope.clas = "fa fa-sort-alpha-asc";
            }
            if (propertyName === 'Name' && $scope.reverse == true) {
                $scope.clas = "fa fa-sort-alpha-desc";
            }
            if (propertyName != 'Name') {
                $scope.clas = '';
            }
            $scope.columnName = propertyName;
        }
        /////
        $scope.selectedFile = null;
        $scope.msg = "";
        $scope.loadFile = function (files) {
            $scope.$apply(function () {
                $scope.selectedFile = files[0];
            })
        }
        $scope.handleFile = function () {
            var file = $scope.selectedFile;

            if (file) {

                var reader = new FileReader();

                reader.onload = function (e) {

                    var data = e.target.result;

                    var workbook = XLSX.read(data, { type: 'binary' });

                    var first_sheet_name = workbook.SheetNames[0];

                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                    //console.log(excelData);  
                    if (dataObjects.length > 0) {
                        $scope.save(dataObjects);
                    } else {
                        $scope.msg = "Error : Something Wrong !";
                    }
                }
                reader.onerror = function (ex) {

                }
                reader.readAsBinaryString(file);
            }
        }
        $scope.loading = loading;
        function loading() {
            const $ = document.querySelector.bind(document);
            //APP
            let App = {};
            App.init = (function () {
                //Init
                function handleFileSelect(evt) {
                    const files = evt.target.files; // FileList object
                    //files template
                    let template = `${Object.keys(files)
                        .map(file => `<div class="name"><span>${files[file].name}</span></div><div class="file file--${file}"><div class="progress active"></div><div class="done"><a href="" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000"><g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g></svg></a></div></div>`).join("")}`;

                    $("#drop").classList.add("hidden");
                    $("footer").classList.add("hasFiles");
                    $(".importar").classList.add("active");
                    setTimeout(() => {
                        $(".list-files").innerHTML = template;
                    }, 1000);

                    Object.keys(files).forEach(file => {
                        let load = 2000 + (file * 2000); // fake load
                        setTimeout(() => {
                            $(`.file--${file}`).querySelector(".progress").classList.remove("active");
                            $(`.file--${file}`).querySelector(".done").classList.add("anim");
                        }, load);
                    });
                }
                // trigger input
                $("#triggerFile").addEventListener("click", evt => {
                    evt.preventDefault();
                    $("input[type=file]").click();
                });
                // drop events
                $("#drop").ondragleave = evt => {
                    $("#drop").classList.remove("active");
                    evt.preventDefault();
                };
                $("#drop").ondragover = $("#drop").ondragenter = evt => {
                    $("#drop").classList.add("active");
                    evt.preventDefault();
                };
                $("#drop").ondrop = evt => {
                    $("input[type=file]").files = evt.dataTransfer.files;
                    $("footer").classList.add("hasFiles");
                    $("#drop").classList.remove("active");
                    evt.preventDefault();
                };
                //upload more
                $(".importar").addEventListener("click", () => {
                    $(".list-files").innerHTML = "";
                    $("footer").classList.remove("hasFiles");
                    $(".importar").classList.remove("active");
                    setTimeout(() => {
                        $("#drop").classList.remove("hidden");
                    }, 500);
                });
                // input change
                $("input[type=file]").addEventListener("change", handleFileSelect);
            })();
        }
        //DOM
        $scope.loading();
        var ix = 0;
        var iy = 0;
        var iz = 0;
        var name = null;
        $scope.ListName = [];
        var NAME = null;
        var ln = 0;
        
        $scope.ItemCategory = [];
        $scope.listAttributeNew = [];
        $scope.listAttribute1 = [];
        $scope.ItemCategory1 = [];
        $scope.listItemOption1 = [];
        $scope.listAttribute = [];
        $scope.listAttributeDetail = [];
        $scope.save = function (data) {
            $scope.listItemOption = [];
            $scope.listItem = [];
            $scope.listNew = [];
            $scope.listNew1 = [];
            $scope.listStock = [];

            for (i in data) {
                if (data[i]['Tên hàng hóa'] !== undefined) {
                    $scope.listItem[iy] = {};
                    $scope.listItem[iy].Name = data[i]['Tên hàng hóa'];
                    $scope.listItem[iy].Status = true;
                    $scope.listItem[iy].Brand = data[i]['Nhãn hiệu'];
                    $scope.listItem[iy].Image = data[i]['Ảnh'];
                    $scope.listItem[iy].Quantity = Number(data[i]['Số lượng quy cách']);
                    $scope.listItem[iy].Unit = data[i]['Đơn vị tính'];
                    $scope.listItem[iy].Tags = data[i]['Type'];
                    $scope.listItem[iy].ItemCategoryName = data[i]['Loại hàng hóa'];
                    $scope.listItem[iy].code = data[i]['Type'];
                    iy++;
                } else {
                    $scope.listItemOption[ix] = {};
                    $scope.listItemOption[ix].Name = data[i]['Tên tùy chọn'];
                    $scope.listItemOption[ix].Barcode = data[i]['Mã vạch'];
                    $scope.listItemOption[ix].SKU = data[i]['Mã SKU'];
                    $scope.listItemOption[ix].StockID = null;
                    $scope.listItemOption[ix].Color = null;
                    $scope.listItemOption[ix].Size = null;
                    $scope.listItemOption[ix].CreateDate = null;
                    $scope.listItemOption[ix].CreateBy = null;
                    $scope.listItemOption[ix].Description = null;
                    $scope.listItemOption[ix].Weigh = '0kg';
                    $scope.listItemOption[ix].BranchID = null;
                    $scope.listItemOption[ix].ModifiedDate = null;
                    $scope.listItemOption[ix].ModifiedBy = null;
                    $scope.listItemOption[ix].TaxRate = null;
                    $scope.listItemOption[ix].Material = null;
                    $scope.listItemOption[ix].SalePrice = data[i]['Giá bán lẻ'];
                    $scope.listItemOption[ix].PurchasePrice = data[i]['Giá nhập'];
                    $scope.listItemOption[ix].InitialPrice = data[i]['Giá khởi tạo'];
                    $scope.listItemOption[ix].WholesalePrice = data[i]['Giá sĩ'];
                    $scope.listItemOption[ix].UnitName = null;
                    $scope.listItemOption[ix].UnitConvertRate = 1;
                    $scope.listItemOption[ix].ClosingQuantity = data[i]['Tổng số lượng tồn kho'];
                    $scope.listItemOption[ix].Quantity1 = data[i]['DEFAULT'];
                    $scope.listItemOption[ix].Quantity2 = data[i]['CN0002'];
                    $scope.listItemOption[ix].Quantity3 = data[i]['CN0003'];
                    $scope.listItemOption[ix].ItemID = null;
                    $scope.listItemOption[ix].Image1 = data[i]['Ảnh_1'];
                    $scope.listItemOption[ix].Image2 = null;
                    $scope.listItemOption[ix].Image3 = null;
                    $scope.listItemOption[ix].Image4 = null;
                    $scope.listItemOption[ix].Status = true;
                    $scope.listItemOption[ix].HomeFlag = true;
                    $scope.listItemOption[ix].MinimumInventory = 0.00;
                    $scope.listItemOption[ix].MaximumInventory = 0.00;
                    $scope.listItemOption[ix].NotificationInventory = false;
                    $scope.listItemOption[ix].Tags = data[i]['Type'];
                    $scope.listItemOption[ix].Properties = data[i]['Thuộc tính'];
                    $scope.listItemOption[ix].Value = data[i]['Giá trị'];
                    ix++;
                }
            }
            for (h in $scope.listItem) {
                if (name !== $scope.listItem[h].ItemCategoryName) {
                    $scope.ItemCategory.push($scope.listItem[h]);
                    name = $scope.listItem[h].ItemCategoryName;
                }
            }
            apiService.post('api/itemCategory/SaveFile', $scope.ItemCategory, function (result) {
                notificationService.displayInfo('Quá trình nhập loại hàng hóa từ file thành công');
                $scope.ItemCategory1 = result.data;
                for (var m = 0 ; m < $scope.ItemCategory1.length; m++) {
                    for (var n = 0 ; n < $scope.listItem.length; n++) {
                        if ($scope.ItemCategory1[m].Code == $scope.listItem[n].Tags) {
                            $scope.listItem[n].ItemCategoryID = $scope.ItemCategory1[m].Id;
                        }
                    }
                }
                apiService.post('api/item/SaveFile', $scope.listItem, function (result) {
                    notificationService.displayInfo('Quá trình nhập hàng hóa từ file thành công');
                    $scope.listNew = result.data;
                    for (var r = 0 ; r < $scope.listNew.length; r++) {
                        for (var s = 0 ; s < $scope.listItemOption.length; s++) {
                            if ($scope.listNew[r].Tags == $scope.listItemOption[s].Tags) {
                                $scope.listItemOption[s].ItemID = $scope.listNew[r].ItemID;
                            }
                        }
                    }
                    apiService.post('api/itemOption/SaveFile', $scope.listItemOption, function (result) {
                        notificationService.displayInfo('Quá trình nhập quy cách hàng hóa từ file thành công');
                        $scope.listNew1 = result.data;
                        for (i in $scope.listItemOption) {
                            for (j in $scope.listNew1) {
                                if ($scope.listNew1[j].SKU == $scope.listItemOption[i].SKU) {
                                    $scope.listItemOption[i].ID = $scope.listNew1[j].ID;
                                }
                            }
                        }
                        for (i in $scope.listItemOption) {
                            for (j in $scope.listBranch) {
                                $scope.listStock[iz] = {};
                                if ($scope.listBranch[j].BranchCode == "DEFAULT") {
                                    $scope.listStock[iz].InitialInventory = Number($scope.listItemOption[i].Quantity1);
                                    $scope.listStock[iz].ItemOptionID = $scope.listItemOption[i].ID;
                                    $scope.listStock[iz].BranchID = $scope.listBranch[j].BranchID;
                                    $scope.listStock[iz].Quantity = Number($scope.listItemOption[i].Quantity1);
                                }
                                if ($scope.listBranch[j].BranchCode == "CN0002") {
                                    $scope.listStock[iz].InitialInventory = Number($scope.listItemOption[i].Quantity2);
                                    $scope.listStock[iz].ItemOptionID = $scope.listItemOption[i].ID;
                                    $scope.listStock[iz].BranchID = $scope.listBranch[j].BranchID;
                                    $scope.listStock[iz].Quantity = Number($scope.listItemOption[i].Quantity2);
                                }
                                if ($scope.listBranch[j].BranchCode == "CN0003") {
                                    $scope.listStock[iz].InitialInventory = Number($scope.listItemOption[i].Quantity3);
                                    $scope.listStock[iz].ItemOptionID = $scope.listItemOption[i].ID;
                                    $scope.listStock[iz].BranchID = $scope.listBranch[j].BranchID;
                                    $scope.listStock[iz].Quantity = Number($scope.listItemOption[i].Quantity3);
                                }
                                iz++;
                            }
                        }
                        //stock
                        apiService.post('api/stock/SaveFile', $scope.listStock, function (result) {
                            notificationService.displayInfo('Quá trình cập nhật tồn kho cho hàng hóa từ file thành công');
                            for (k in $scope.listItemOption) {
                                if (NAME !== $scope.listItemOption[k].Properties) {
                                    $scope.ListName[ln] = {};
                                    $scope.ListName[ln].Name = $scope.listItemOption[k].Properties;
                                    $scope.ListName[ln].Type = $scope.listItemOption[k].SKU;
                                    $scope.listAttribute.push($scope.ListName[ln]);
                                    NAME = $scope.ListName[ln].Name;
                                    ln++;
                                }
                            }
                            
                            for (var g = 0; g < $scope.listAttribute.length-1; g++) {
                                for (var h = g + 1; h < $scope.listAttribute.length; h++) {
                                    if ($scope.listAttribute[g].Name == $scope.listAttribute[h].Name) {
                                        $scope.listAttribute.splice(h, 1);
                                        h--;
                                    }
                                }
                            }
                            apiService.post('api/attribute/savefile', $scope.listAttribute, function (result) {
                                notificationService.displayInfo('Quá trình nhập thuộc tính cho hàng hóa từ file thành công');
                                $scope.listAttributeNew = result.data;
                                var w = 0;
                                for (v in $scope.listItemOption) {
                                    for (t in $scope.listAttributeNew) {
                                        if ($scope.listItemOption[v].Properties == $scope.listAttribute[t].Name) {
                                            $scope.listAttributeDetail[w] = {};
                                            $scope.listAttributeDetail[w].ItemOptionID = $scope.listItemOption[v].ID;
                                            $scope.listAttributeDetail[w].AttributeID = $scope.listAttributeNew[t].AttributeID;
                                            $scope.listAttributeDetail[w].Value = $scope.listItemOption[t].Value;
                                            w++;
                                        }
                                       
                                    }
                                }
                                apiService.post('api/attributedetail/savefile', $scope.listAttributeDetail, function (result) {
                                    console.log("attribute thành công");
                                    $scope.getItems();

                                });
                            });
                        }, function (error) { console.log("thất bại") });
                       
                    }, function (error) {
                        console.log('Cập nhật không thành công.');
                    });
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công hàng hóa.');
                });
            }, function (error) {
                console.log('error itemcategory');
            });
        }
    }
})(angular.module('tiktak.items'));