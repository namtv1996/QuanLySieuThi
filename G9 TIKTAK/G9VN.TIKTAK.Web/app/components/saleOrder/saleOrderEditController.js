(function (app) {
    app.controller('saleOrderEditController', saleOrderEditController);

    saleOrderEditController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$ngBootbox', '$state'];
    function saleOrderEditController($scope, apiService, notificationService, $stateParams, $ngBootbox, $state) {

        //đơn đặt hàng
        $scope.saleOrders = {};
        //chi tiết đơn đặt hàng 
        $scope.saleOrdersDetail = {};
        //danh sach sp
        $scope.listItem = {};
        //list view
        $scope.listview = [];
        //trạng thái đơn hàng
        $scope.state = {};
        //khách hàng
        $scope.customer = {};
        //hiển thị chức năng
        $scope.display = {}
        //autocomplete khách hàng
        $scope.diss = 'none';
        //tổng số lượng
        $scope.totalQuantity = 0;
        //tổng tiền thanh toán
        $scope.payments = 0;
        
        $scope.disabled = {};
        $scope.displayfunc = displayfunc;

        function displayfunc() {
            //được sửa tất cả
            if ($scope.saleOrders.StatusID == 7 || $scope.saleOrders.StatusID == 8 || $scope.saleOrders.StatusID == 9) {
                $scope.disabled.quantity = false;
                $scope.disabled.unitprice = false;
                $scope.disabled.discountamountoc = false;
                $scope.disabled.vatamountoc = false;
                $scope.disabled.searchText = false;
                $scope.disabled.deletebtn = false;
                $scope.disabled.Customer_Info = false;
                $scope.disabled.VoucherDate = false;
                $scope.disabled.VoucherNo = true;
                $scope.disabled.employee = false;
                $scope.disabled.edit = "";
                $scope.display.btndel = "block";
            }
            //được sửa: ghi chú , tag, ngày giao 
            if ($scope.saleOrders.StatusID == 2 || $scope.saleOrders.StatusID == 4||$scope.saleOrders.StatusID==45) {
                $scope.disabled.quantity = true;
                $scope.disabled.unitprice = true;
                $scope.disabled.discountamountoc = true;
                $scope.disabled.vatamountoc = true;
                $scope.disabled.searchText = true;
                $scope.disabled.deletebtn = true;
                $scope.disabled.Customer_Info = true;
                $scope.disabled.VoucherDate = true;
                $scope.disabled.VoucherNo = true;
                $scope.disabled.employee = true;
                $scope.disabled.edit = 'none';
                $scope.display.btndel = "none";
            }
            //chỉ được sửa ghi chú và tag
            if ($scope.saleOrders.StatusID == 1 || $scope.saleOrders.StatusID == 3) {
                $scope.disabled.quantity = true;
                $scope.disabled.unitprice = true;
                $scope.disabled.discountamountoc = true;
                $scope.disabled.vatamountoc = true;
                $scope.disabled.searchText = true;
                $scope.disabled.deletebtn = true;
                $scope.disabled.Customer_Info = true;
                $scope.disabled.VoucherDate = true;
                $scope.disabled.VoucherNo = true;
                $scope.disabled.employee = true;
                $scope.disabled.edit = 'none';
                $scope.display.btndel = "none";
            }
        }

        ///hàm lấy thông tin cần thiết cho view chi tiết
        $scope.getInfo = function () {
            //lấy thông tin chi tiết đơn hàng
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrdersDetail = result.data;

            });
            //lấy thông tin đơn đặt hàng
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrders = result.data;
                $scope.saleOrders.VoucherDate = new Date($scope.saleOrders.VoucherDate);
                $scope.payments = $scope.saleOrders.TotalAmountOC + $scope.saleOrders.TotalVATAmountOC - $scope.saleOrders.TotalDiscountAmountOC;
                $scope.txt_discount = $scope.saleOrders.DiscountAmountOC;
                $('.colored-palegreen')[0].checked = true;
                //lấy danh sách sp 
                apiService.get('api/itemOption/getitemsaleinvoice1/' + $scope.saleOrders.VoucherID, null, function (result1) {
                    $scope.listview = result1.data;
                    for (var index in $scope.listview) {
                        $scope.totalQuantity +=Number( $scope.listview[index].Quantity);
                    }
                });
                // lấy thông tin khách hàng
                apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null, function (result) {
                    $scope.customer = result.data;
                });
                $scope.displayfunc();
            })
          
           
        }
        $scope.getInfo();
        
 
    
        //update info
        $scope.update_info = update_info;
        function update_info() {
          
            $scope.totalQuantity = 0;
            $scope.saleOrders.TotalAmountOC = 0;
            $scope.saleOrders.TotalVATAmountOC = 0;
            $scope.saleOrders.TotalDiscountAmountOC = 0;
            for (var index in $scope.listview) {
                //thành tiền
                $scope.listview[index].AmountOC = $scope.listview[index].Quantity * $scope.listview[index].UnitPriceOC - $scope.listview[index].DiscountAmountOC;
                //tổng tiền
                $scope.saleOrders.TotalAmountOC += Number($scope.listview[index].AmountOC);
            }
            for (var index in $scope.listview) {
                
                //tổng số lượng
                $scope.totalQuantity += Number($scope.listview[index].Quantity);
                //update chiết khấu đơn hàng
                if ($('.colored-palegreen')[0].checked == false) {
                    $scope.payments = $scope.saleOrders.TotalAmountOC - ($scope.txt_discount / 100) * $scope.saleOrders.TotalAmountOC;
                    $scope.saleOrders.DiscountAmountOC = ($scope.txt_discount / 100) * $scope.saleOrders.TotalAmountOC;
                } else {
                    $scope.payments = $scope.saleOrders.TotalAmountOC - $scope.txt_discount;
                    $scope.saleOrders.DiscountAmountOC = $scope.txt_discount;
                }
                //tính tiền phân bổ chiết khấu
                $scope.listview[index].discount2 = ($scope.listview[index].AmountOC / $scope.saleOrders.TotalAmountOC) * $scope.saleOrders.DiscountAmountOC;
                //tính tổng vat
                $scope.saleOrders.TotalVATAmountOC += ($scope.listview[index].VATRate / 100) * ($scope.listview[index].AmountOC - $scope.listview[index].discount2);
                //tính tổng chiết khấu
                $scope.saleOrders.TotalDiscountAmountOC += Number($scope.listview[index].DiscountAmountOC);
            }
        
          
           
            //tính tổng chiết khấu           
            $scope.saleOrders.TotalDiscountAmountOC += $scope.saleOrders.DiscountAmountOC;


          

            //update lại tổng tiền thanh toán
            $scope.payments = $scope.saleOrders.TotalAmountOC + $scope.saleOrders.TotalVATAmountOC - $scope.saleOrders.TotalDiscountAmountOC;
        }

        //sale
        $scope.sale = sale;
        $scope.dis3 = 'none';

        function sale() {
            //$ngBootbox.customDialog({
            //    title: 'Giảm giá đơn hàng',
            //    message: '<div class="widget-body" style="box-shadow: none !important;background-color: inherit;"><div><form class="form-horizontal form-bordered ng-pristine ng-valid" role="form" ng-click="namtv()"><div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label no-padding-right">Giá mới</label><div class="col-sm-8"><input type="email" class="form-control" id="inputEmail3" placeholder="VNĐ" style="width: 100%;"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-4 control-label no-padding-right">Chiết khấu</label><div class="col-sm-8"><input type="text" class="form-control" id="inputPassword3" placeholder="VNĐ,%" style="width: 100%;"></div><div class="col-sm-4 col-sm-offset-4"><label style="padding-top: 8px;"><input class="checkbox-slider toggle colored-palegreen" type="checkbox"><span class="text"></span></label></div></div><div class="form-group"><div class="col-sm-offset-4 col-sm-4"><button type="submit" class="btn btn-palegreen">Áp dụng</button></div></div></form></div></div>'
            //});

            if ($scope.dis3 == 'block') {
                $scope.dis3 = 'none';
            } else {
                $scope.dis3 = 'block';
            }

        }
        //điều chỉnh giá

        $scope.discount = discount;
        function discount() {
            $scope.update_info();
            $scope.dis3 = 'none';
        }
        //   // thay đổi đơn vị trong popover điều chỉnh giá
        $scope.changeUNiT = changeUNiT;
        function changeUNiT() {
            if ($('.colored-palegreen')[0].checked == false) {
                if ($('#txt_discount')[0].value < 0) $scope.txt_discount = 0;
                if ($('#txt_discount')[0].value > 100) $scope.txt_discount = 100;
            }
        }
        //xóa 1 sản phẩm trong giỏ hàng
        $scope.delete_itemselected = delete_itemselected;
        function delete_itemselected(item) {
            for (var index in $scope.listview) {
                if ($scope.listview[index].ID.toLowerCase().indexOf(item.ID.toLowerCase()) > -1) {
                    //   xóa 1 phần tử
                    $scope.listview.splice(index, 1);
                   
                }
            }
            $scope.update_info();
        }
        //tim kiem 
        $scope.search = search;
        $scope.filterList = [];
        function search() {

            if ($scope.searchText != '') {
                $scope.dis = 'block';

                apiService.get('api/itemOption/search?key=' + $scope.searchText, null, function (result) {
                    $scope.filterList = result.data;
                }, function () {
                    console.log('load items failed');
                });
            }
            else {
                $scope.dis = 'none';
            }


        }
        //chon san pham
        $scope.chooseProduct = chooseProduct;

        function chooseProduct(item) {



            /// chưa có sản phẩm-> thêm vào mảng  
            if ($scope.listview.length == 0) {
             
                item.UnitPriceOC = item.SalePrice;
                item.Quantity = 1;
                item.stt = 1;
                item.DiscountAmountOC = 0;
                item.VATRate = 0;
               
                $scope.listview.push(item);
            }
            else {
                var pos = -1;
                var STT = 1;

              
                for (var i in $scope.listview) {
                    if ($scope.listview[i].ID == item.ID) {
                        pos = i;
                    }
                    STT++;
                }
                //thêm sản phẩm mới
                if (pos == -1) {
                  

                    item.Quantity = 1;
                    item.stt = STT;
                    item.DiscountAmountOC = 0;
                    item.VATRate = 0;
                    item.UnitPriceOC = item.SalePrice;
                    $scope.listview.push(item);

                }
                    //sản phẩm đã có trong đơn
                else {
                    $scope.listview[pos].Quantity++;
                   
                }
            }

            $scope.dis = 'none';
            $scope.update_info();

        }

        //đối tượng chi tiết đơn đặt hàng
        $scope.saleOrdersDetail1 = {
            DiscountAmountOC: 0,
            DiscountAmount: 0,
            Amount: 0,
            AmountOC: 0,
            VATAmount: 0,
            VATAmountOC: 0
        };
        $scope.AddSaleOrdersDetail = AddSaleOrdersDetail;
        function AddSaleOrdersDetail(i, item) {
            if (i < $scope.listview.length) {
                $scope.saleOrdersDetail1.VoucherID = item.VoucherID;
                $scope.saleOrdersDetail1.ItemID = $scope.listview[i].ID;
                $scope.saleOrdersDetail1.Quantity = $scope.listview[i].Quantity;
                $scope.saleOrdersDetail1.QuantityConvert = $scope.saleOrdersDetail1.Quantity;
                $scope.saleOrdersDetail1.UnitPriceOC = $scope.listview[i].UnitPriceOC;
                $scope.saleOrdersDetail1.UnitPrice = $scope.saleOrdersDetail1.UnitPriceOC;
                $scope.saleOrdersDetail1.UnitPriceConvertOC = $scope.saleOrdersDetail1.UnitPriceOC;
                $scope.saleOrdersDetail1.UnitPriceConvert = $scope.saleOrdersDetail1.UnitPriceOC;
                $scope.saleOrdersDetail1.AmountOC = $scope.listview[i].AmountOC;
                $scope.saleOrdersDetail1.Amount = $scope.saleOrdersDetail1.AmountOC;
                //tiền chiết khấu
                $scope.saleOrdersDetail1.DiscountAmountOC = $scope.listview[i].DiscountAmountOC;
                //tiền chiết khấu quy đổi
                $scope.saleOrdersDetail1.DiscountAmount = $scope.saleOrdersDetail1.DiscountAmountOC;
                //tỷ lệ chiết khấu
                $scope.saleOrdersDetail1.DiscountRate = ($scope.listview[i].DiscountAmountOC / $scope.saleOrdersDetail1.AmountOC) * 100;

                $scope.saleOrdersDetail1.VATAmountOC = $scope.listview[i].VATRate* $scope.saleOrdersDetail1.AmountOC;
                $scope.saleOrdersDetail1.VATAmount = $scope.saleOrdersDetail1.VATAmountOC;
                $scope.saleOrdersDetail1.VATRate = $scope.listview[i].VATRate;
               
                //stt
                $scope.saleOrdersDetail1.SortOrder = $scope.listview[i].stt;
                $scope.saleOrdersDetail1.OutwardPrice = $scope.saleOrdersDetail1.UnitPriceOC;
                $scope.saleOrdersDetail1.OutwardAmount = $scope.saleOrdersDetail1.AmountOC;
                $scope.saleOrdersDetail1.SpecialConsumeTaxRate = 0;
                $scope.saleOrdersDetail1.SpecialConsumeTaxAmountOC = 0;
                $scope.saleOrdersDetail1.SpecialConsumeTaxAmount = 0;
                $scope.saleOrdersDetail1.SpecialConsumeUnitPriceOC = 0;
                $scope.saleOrdersDetail1.SpecialConsumeUnitPrice = 0;
                $scope.saleOrdersDetail1.ConvertRate = 0;
                $scope.saleOrdersDetail1.UnitPriceAfterTaxOC = 0;
                $scope.saleOrdersDetail1.UnitPriceAfterTax = 0;
                $scope.saleOrdersDetail1.AmountAfterTaxOC = 0;
                $scope.saleOrdersDetail1.AmountAfterTax = 0;
                $scope.saleOrdersDetail1.DiscountAmountAfterTax = 0;
                $scope.saleOrdersDetail1.DiscountAmountAfterTaxOC = 0;
                $scope.saleOrdersDetail1.OutwardPriceConvert = 0;

                apiService.post('api/saleOrderDetail/create', $scope.saleOrdersDetail1,
                    function (result) {
                        AddSaleOrdersDetail(i + 1, item);
                    },
                    function (error) {
                        notificationService.displayError('Thêm mới không thành công');
                    });
            } else {
                var d = document.getElementById("inputEmail3").value;
               // notificationService.displaySuccess('Đơn hàng đã được thêm mới.');
                $scope.saleOrders.VoucherID = item.VoucherID;
                d = $scope.saleOrders.VoucherDate;

                //chuyển hướng đến trang detail của đơn hàng vừa thêm mới
                $state.go('saleOrder_Detail', { id: item.VoucherID });
                notificationService.displaySuccess("Cập nhật đơn hàng thành công!");
            }

        }


    
        //lưu đơn hàng
        $scope.save = save;
        function save() {
            //update
            //console.log($scope.saleOrders.VoucherDate);
            console.log(new Date($scope.saleOrders.VoucherDate));
            if ($scope.saleOrders.VoucherDate == undefined) {
                $scope.saleOrders.VoucherDate = new Date();
            }
            $scope.saleOrders.VoucherDate = new Date($scope.saleOrders.VoucherDate);
            $scope.saleOrders.TotalAmount = $scope.saleOrders.TotalAmountOC;
            $scope.saleOrders.DiscountAmount = $scope.saleOrders.DiscountAmountOC;
            $scope.saleOrders.TotalDiscountAmount = $scope.saleOrders.TotalDiscountAmountOC;
            $scope.saleOrders.TotalVATAmount = $scope.saleOrders.TotalVATAmountOC;
          
            apiService.put('api/saleOrder/update', $scope.saleOrders, function (result) {
                   // xóa hết các chi tiết đơn hàng             
                apiService.del("api/saleOrderDetail/delete?id="+$scope.saleOrders.VoucherID, null, function () {
                  //thêm mới chi tiết đơn hàng
                    $scope.AddSaleOrdersDetail(0, $scope.saleOrders);
                    
                }, function () {
                    notificationService.displayError("Xóa không thành công!");
                });
            }, function (error) {
                notificationService.displayError('Cập nhật đơn hàng không thành công!');
            });

        }


       
    }
})(angular.module('tiktak.saleOrder'));