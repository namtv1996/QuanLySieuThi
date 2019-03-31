//not code
(function (app) {
    app.controller('itemTransferDetailController', itemTransferDetailController);

    itemTransferDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$state', '$ngBootbox'];
    function itemTransferDetailController($scope, apiService, notificationService, $stateParams, $state, $ngBootbox) {
        //khởi tạo tên sư kiện
        $scope.GetStockTransferById = GetStockTransferById;
        $scope.GetStockTransferDetailById = GetStockTransferDetailById;
        $scope.getitem = getitem;
        $scope.statusChange = statusChange;
        $scope.StockTransferOut = StockTransferOut;
        $scope.StockTransferIn = StockTransferIn;
        $scope.AddItemTransfer = AddItemTransfer;
        $scope.status = status;
        $scope.AddItemTransferDetail = AddItemTransferDetail;
        $scope.deleteItemTransfes = deleteItemTransfes;
        $scope.PrintDiv = PrintDiv;
        $scope.getItemTransfer = getItemTransfer;
        //list and object
        $scope.ListItemTransfer = [];
        $scope.ListItemTransferDetail = [];
        $scope.ItemTransferDetail = {};
        $scope.listNew = {};
        $scope.lisItem = [];
        $scope.ListItemTransferIn = {};
        $scope.ListItemTransferUpdate = {};
        $scope.user = {};
        $scope.listgetitemTransfer = [];
        //sự kiện
        function getacc() {
            apiService.get('api/account/users', null, function (result) {
                $scope.user = result.data;
            });
        }
        function GetStockTransferDetailById() {
            apiService.get('api/itemTransfer/getbyid/' + $stateParams.id, null, function (result1) {
                apiService.get('api/branch/getall', null, function (result) {
                        for (i in result.data) {
                            if (result1.data.FromStockID == result.data[i].BranchID) {
                                $scope.listNew.cnchuyen = result.data[i].BranchName;
                                $scope.listNew.cnchuyenid = result.data[i].BranchID;
                                
                            }
                            if (result1.data.ToStockID == result.data[i].BranchID) {
                                $scope.listNew.cnnhan = result.data[i].BranchName;
                                $scope.listNew.cnnhanid = result.data[i].BranchID;
                              

                            }
                        }
                });
            });
        }
        function getitem() {
            apiService.get('api/itemTransferDetail/getbyid/' + $stateParams.id, null, function (result1) {
                apiService.get('api/positem/getall', null, function (result2) {
                    var a = 0;
                    for (k in result1.data) {
                        for (x in result2.data) {
                            
                            if (result1.data[k].ItemID == result2.data[x].ID) {
                                $scope.lisItem[a] = {};
                                $scope.lisItem[a].ID = result2.data[x].ItemID;
                                $scope.lisItem[a].ItemName = result2.data[x].Name;
                                $scope.lisItem[a].SKU_Code = result2.data[x].SKU;
                                $scope.lisItem[a].SL = result1.data[k].QuantityItem;
                                $scope.lisItem[a].DG = result1.data[k].ConversionPrice;
                                $scope.lisItem[a].TT = result1.data[k].transferPrice;
                                a++;
                            }
                        }
                    }

                });
            });
        }
        function GetStockTransferById() {
            apiService.get('api/itemTransfer/getbyid/' + $stateParams.id, null, function (result) {
                $scope.ListItemTransfer = result.data;
                apiService.get('api/account/users', null, function (result1) {
                    if (result.data.FromStockID == result1.data.BranchID) {
                        if ($scope.ListItemTransfer.Status === 1) {
                            $scope.ListItemTransfer.tt = "Chờ duyệt";
                            $scope.ListItemTransfer.cs = "not-available";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.dc = 'none !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'none !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dst_duyet = 'block !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'none !important';
                            $scope.ListItemTransfer.dst_nhan = 'none !important';

                        }
                        if ($scope.ListItemTransfer.Status === 2) {
                            $scope.ListItemTransfer.tt = "Chờ chuyển";
                            $scope.ListItemTransfer.cs = "blue";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.dc = 'none !important';
                            $scope.ListItemTransfer.cd = 'block !important';
                            $scope.ListItemTransfer.cdtc = 'none !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'block !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                        if ($scope.ListItemTransfer.Status === 3) {
                            $scope.ListItemTransfer.tt = "Chờ nhận";
                            $scope.ListItemTransfer.cs = "deepskyblue";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.dc = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'block !important';
                            $scope.ListItemTransfer.cncn1 = 'block !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                        if ($scope.ListItemTransfer.Status === 4) {
                            $scope.ListItemTransfer.tt = "Đã nhận";
                            $scope.ListItemTransfer.cs = "available";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'block !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'block !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                    }
                    if (result.data.ToStockID == result1.data.BranchID) {
                        if ($scope.ListItemTransfer.Status === 1) {
                            $scope.ListItemTransfer.tt = "Chờ duyệt";
                            $scope.ListItemTransfer.cs = "not-available";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'none !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dc = 'block !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'block !important';
                            $scope.ListItemTransfer.dst_chuyen = 'none !important';
                            $scope.ListItemTransfer.dst_nhan = 'none !important';

                        }
                        if ($scope.ListItemTransfer.Status === 2) {
                            $scope.ListItemTransfer.tt = "Chờ chuyển";
                            $scope.ListItemTransfer.cs = "blue";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'none !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'block !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                        if ($scope.ListItemTransfer.Status === 3) {
                            $scope.ListItemTransfer.tt = "Chờ nhận";
                            $scope.ListItemTransfer.cs = "deepskyblue";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'block !important';
                            $scope.ListItemTransfer.nd = 'block !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'none !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dc = 'none !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                        if ($scope.ListItemTransfer.Status === 4) {
                            $scope.ListItemTransfer.tt = "Đã nhận";
                            $scope.ListItemTransfer.cs = "available";
                            $scope.ListItemTransfer.ds = 'none !important';
                            $scope.ListItemTransfer.cd = 'none !important';
                            $scope.ListItemTransfer.cdtc = 'block !important';
                            $scope.ListItemTransfer.nd = 'none !important';
                            $scope.ListItemTransfer.ndtc = 'block !important';
                            $scope.ListItemTransfer.cncn1 = 'none !important';
                            $scope.ListItemTransfer.cn = 'none !important';
                            $scope.ListItemTransfer.dc = 'none !important';
                            $scope.ListItemTransfer.dst_duyet = 'none !important';
                            $scope.ListItemTransfer.dst_chuyen = 'block !important';
                            $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                            $scope.ListItemTransfer.dst_nhan = 'block !important';
                        }
                    }
                    if (result.data.FromStockID !== result1.data.BranchID && result.data.ToStockID !== result1.data.BranchID) {
                        $scope.ListItemTransfer.dst_chuyen = 'none !important';
                        $scope.ListItemTransfer.dst_nhan = 'none !important';
                        $scope.ListItemTransfer.dst_duyet = 'none !important';
                        $scope.ListItemTransfer.cncn1 = 'none !important';
                        $scope.ListItemTransfer.dst_duyet1 = 'none !important';
                    }
                });
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function statusChange(i) {
            if (i == 3) {
                $scope.StockTransferOut();
                $scope.status(i);
            }
            if (i == 4) {
                $scope.StockTransferIn();
                $scope.status(i);
            }
            if (i == 2) {
                $scope.status(i);
            }
        }
        function status(i) {
            $scope.ListItemTransfer.Status = i;
            apiService.put('api/itemTransfer/update', $scope.ListItemTransfer, function (result) {
                notificationService.displaySuccess('Thành công !');
                $scope.GetStockTransferById();
            }, function (error) {
                notificationService.displayError('Thất bại. Xin vui lòng thử lại hoặc ấn tổ hợp phím CTRL +F5 và thử lại');
            });
        }
        function StockTransferOut() {
            var param = {
                BranchID: $scope.listNew.cnchuyenid,
                voucherID: $scope.ListItemTransfer.VoucherID
            }
            apiService.put('api/stock/updateClosingQuantityStockTransferOut', param);
        }
        function StockTransferIn() {
            var param = {
                BranchID: $scope.listNew.cnnhanid,
                voucherID: $scope.ListItemTransfer.VoucherID
            }
            apiService.put('api/stock/updateClosingQuantityStockTransferIn', param);
            $scope.AddItemTransfer();
            notificationService.displaySuccess('Thành công !');

        }
        function AddItemTransfer() {
            $scope.ListItemTransferIn.BranchID = $scope.listNew.cnnhanid;
            $scope.ListItemTransferIn.FromStockID = $scope.listNew.cnchuyenid;
            $scope.ListItemTransferIn.ToStockID = $scope.listNew.cnnhanid;
            $scope.ListItemTransferIn.CreatedBy = $scope.ListItemTransfer.CreatedBy;
            $scope.ListItemTransferIn.InwardStockKeeper = $scope.ListItemTransfer.InwardStockKeeper;
            $scope.ListItemTransferIn.IsPosted = $scope.ListItemTransfer.IsPosted;
            $scope.ListItemTransferIn.MobilizationDate = new Date();
            $scope.ListItemTransferIn.ObjectAddress = $scope.ListItemTransfer.ObjectAddress;
            $scope.ListItemTransferIn.ObjectName = $scope.ListItemTransfer.ObjectName;
            $scope.ListItemTransferIn.OutwardStockKeeper = $scope.ListItemTransfer.OutwardStockKeeper;
            $scope.ListItemTransferIn.SortOrder = $scope.ListItemTransfer.SortOrder;
            $scope.ListItemTransferIn.Status = 4;
            $scope.ListItemTransferIn.VoucherNo = '';
            $scope.ListItemTransferIn.VoucherType = 44;
            apiService.post('api/itemTransfer/createStockIn', $scope.ListItemTransferIn,
                function (result) {
                    var k = 0;
                    AddItemTransferDetail(0, result.data);
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
        function AddItemTransferDetail(k, lisItem) {
            if (k < $scope.lisItem.length) {
                $scope.ItemTransferDetail.VoucherID = lisItem.VoucherID;
                $scope.ItemTransferDetail.ItemID = $scope.lisItem[k].ID;
                $scope.ItemTransferDetail.QuantityItem = $scope.lisItem[k].SL;
                $scope.ItemTransferDetail.transferPrice = $scope.lisItem[k].DG;

                $scope.ItemTransferDetail.ConversionPrice = ($scope.lisItem[k].SL * $scope.lisItem[k].DG);
                apiService.post('api/itemTransferDetail/create', $scope.ItemTransferDetail,
                    function (result) {
                        AddItemTransferDetail(k + 1, lisItem);

                    }, function (error) {
                        notificationService.displayError('NHận hàng không thành công !');
                    });
            }
            else {
                notificationService.displaySuccess('Nhận hàng thành công !');
            }
        }
        function deleteItemTransfes(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa ?</h4>').then(function () {
                var config = {
                    params: {
                        id: $stateParams.id
                    }
                }
                if ($scope.ListItemTransfer.Status <= 2) {
                    apiService.del('api/itemTransfer/delete', config,
                        function (result) {
                            notificationService.displaySuccess('Xóa thành công !');
                            $state.go('itemTransfer');
                        }, function (error) {
                            notificationService.displayError('Xóa không thành công !');
                            
                        });
                } else {
                    notificationService.displayError('Xóa không thành công, Không thể xóa khi đã chuyển hàng !');
                }
                
            });
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
            add = true;
            return false;

        }
        function getItemTransfer() {
            apiService.get('api/itemTransfer/getbyvoucherid/' + $stateParams.id, null,
                function (result) {
                    $scope.listgetitemTransfer = result.data;
                }, function (error) {
                    console.log('Lấy itemtransfer không thành công !');
            });
        }
        //Gọi sự kiện
        $scope.getItemTransfer();
        $scope.getitem();
        $scope.GetStockTransferById();
        $scope.GetStockTransferDetailById();

    }
})(angular.module('tiktak.itemTransfer'));