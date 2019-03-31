(function (app) {
    app.controller('itemOptionListController', itemOptionListController);
    itemOptionListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function itemOptionListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.bc = {
            format: 'CODE128A',
            lineColor: '#000000',
            width: 1,
            height: 35,
            background: "#dddddd",
            displayValue: true,
            fontOptions: '',
            font: 'monospace',
            textAlign: 'center',
            textPosition: 'top',
            textMargin: 1,
            fontSize: 12,
            background: '#ffffff',
            margin: 1,
            marginTop: -3,
            marginBottom: -10,
            marginLeft: 0,
            marginRight: 0,
            valid: function (valid) {
            }
        }
        $scope.listItems = [];
        $scope.listNew = [];
        $scope.items = {};
        $scope.getItems = getItems;
        $scope.deleteItems = deleteItems;
        $scope.detailItems = detailItems;
        $scope.GetById = GetById;
        $scope.checkAll = checkAll;
        $scope.InBarcode = InBarcode;
        $scope.exportFile = exportFile;
        $scope.PrintDiv = PrintDiv;
        $scope.close = close;

        $scope.exportExcel = exportExcel;
        function exportExcel() {
            var config = {
                params: {
                    filter: $scope.keyword
                }
            }
            apiService.get('api/itemOption/ExportXls', config, function (response) {
                if (response.status = 200) {
                    window.location.href = response.data.Message;
                }
               
            }, function (error) {
                notificationService.displayError(error);

            });
        }
        // lay thong tin user
        $scope.account = {};
        apiService.get("api/account/users", null, function (result) {
            $scope.account = result.data;
            $scope.getItems();

        });

        function InBarcode() {
            var ix = 0;
            for (var i = 0; i < $scope.listItems.length; i++) {
                if ($scope.listItems[i].CheckBox == true) {
                    $scope.listNew[ix] = {};
                    $scope.listNew[ix].BarcodeNew = $scope.listItems[i].Barcode;
                    $scope.listNew[ix].NameNew = $scope.listItems[i].Name;
                    $scope.listNew[ix].SalePriceNew = $scope.listItems[i].SalePrice;
                    $scope.listNew[ix].SKUNew = $scope.listItems[i].SKU;
                    $scope.listNew[ix].ClosingQuantityNew = $scope.listItems[i].ClosingQuantity;
                    ix++;
                }
            }
        }
        function close() {
            $scope.listNew = [];
        }
        function exportFile() {
            for (var i = 0; i < $scope.listNew.length; i++) {
                document.getElementById("show").innerHTML = $('.test')[i].innerHTML;
                for (var j = 0; j < $scope.listNew[i].ClosingQuantityNew; j++) {
                    $('#code').clone().appendTo('#showIn');
                }
            }
            $scope.PrintDiv();
            $('.delete').remove();
        }
        function PrintDiv() {
            var contents = document.getElementById("dvContents").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Tiktac.vn</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
        function checkAll() {
            if ($scope.setall == true) {
                for (var i = 0; i <= $scope.listItems.length; i++) {
                    $scope.listItems[i].CheckBox = true;
                }
            } else {
                for (var i = 0; i <= $scope.listItems.length; i++) {
                    $scope.listItems[i].CheckBox = false;
                }

            }
        }

        function GetById(id) {
            apiService.get('api/itemOption/getbyid/' + id, null, function (result) {
                $scope.items = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        var item = {};
        function UpdateItems(id) {
            apiService.get('api/item/getbyid/' + id, null, function (result) {
                item = result.data;
                if (item.Quantity > 1) {
                    item.Quantity = item.Quantity - 1;
                    apiService.put('api/item/update', item,
                        function (result) {
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
                        notificationService.displaySuccess('Xóa thành công hàng hóa.');
                    }, function () {
                        notificationService.displayError('Xóa hàng hóa không thành công');
                    })
                }
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function getItems() {
            apiService.get('api/itemOption/getListItemOptionByBranchID?BranchID=' + $scope.account.BranchID, null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listItems = result.data;
                for (var i in $scope.listItems) {
                    if ($scope.listItems[i].image1 == null) {
                        $scope.listItems[i].image1 = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                }

                for (var i in $scope.listItems) {
                    if ($scope.listItems[i].UnitName != null) {
                        $scope.listItems[i].Unit = $scope.listItems[i].UnitName;
                        $scope.listItems[i].CheckBox = false;
                    }
                }
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
        function deleteItems(id, itemid) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/itemOption/delete', config, function () {
                    UpdateItems(itemid);
                    notificationService.displaySuccess('Xóa Quy cách hàng hóa thành công');
                    getItems();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
        function detailItems() {
            var options = {
                templateUrl: '/app/components/itemOption/itemOptionViewDetail.html',
                title: 'Thông tin ' + $scope.items.Name + '',
                className: 'test-class',
            };
            $ngBootbox.customDialog(options);
        }

        $scope.ten = "block";
        $scope.ma = "block";
        $scope.gia = "block";
        $scope.hienthi = function hienthi() {
            if ($scope.status1 == true) {
                $scope.ten = "none";
            } else {
                $scope.ten = "block";
            }
            if ($scope.status2 == true) {
                $scope.gia = "none";
            } else {
                $scope.gia = "block";
            }
            if ($scope.status3 == true) {
                $scope.ma = "none";
            } else {
                $scope.ma = "block";
            }
        }


    }
})(angular.module('tiktak.itemOption'));