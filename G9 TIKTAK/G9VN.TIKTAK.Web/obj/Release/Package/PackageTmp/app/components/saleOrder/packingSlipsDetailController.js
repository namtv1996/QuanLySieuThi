(function (app) {
    app.controller('packingSlipsDetailController', packingSlipsDetailController);

    packingSlipsDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$ngBootbox'];
    function packingSlipsDetailController($scope, apiService, notificationService, $stateParams, $ngBootbox) {

        //Phiếu đóng gói
        $scope.packingSlips = {};
        //chi tiết Phiếu đóng gói
        $scope.packingSlipsDetail = {};
        //danh sach sp
        $scope.listItem = {};
        //list view
        $scope.listview = [];
        //trạng thái Phiếu đóng gói
        $scope.state = {};
        //phương thức tiếp nhận hàng (1: nhận tại cửa hàng, 2: giao hàng)
        $scope.method_of_receipt = 1;
        //hiển thị chức năng
        $scope.display = {}
        // thông tin đơn hàng gốc
        $scope.saleOrders = {};


        //hàm hiển thị các chức năng
        $scope.displayfunc = displayfunc
        function displayfunc() {
            //nhận tại cửa hàng
            if ($scope.packingSlips.StatusID == 1) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'none';
                //thanh toán
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'block';
                $scope.display.dis5 = 'block';
                $scope.display.dis7 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'none';
                $scope.style = 'col-md-12';
                $scope.display.title = 'Đóng gói';
                //nút hủy
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                $scope.display.icon = 'available';
                $scope.state.title = 'Nhận tại cửa hàng';
                //icon
                $scope.display.icon1 = 'fa fa-check-circle';
                $scope.display.icon2 = 'fa fa-check-circle';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
            }           
            //giao hàng
            if ($scope.packingSlips.StatusID == 2) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'block';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';             
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đối tác vận chuyển';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
            }      
        }

        ///hàm lấy thông tin cần thiết cho view chi tiết
        $scope.getInfo = function () {
            $scope.listview = [];
            $scope.packingSlipsDetail = {};
            //lấy thông tin đơn đặt hàng
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.packingSlips = result.data;               
                //lấy danh sách sp 
                apiService.get('api/itemOption/getitemsaleinvoice/' + $scope.packingSlips.VoucherID, null, function (result1) {
                    $scope.listItem = result1.data;

                    //gán lại các trường cần hiển thị
                    var vie = {};
                    for (var index in $scope.listItem) {
                        vie.SKU = $scope.listItem[index].SKU;
                        vie.Name = $scope.listItem[index].Name;
                        vie.Quantity = $scope.packingSlipsDetail[index].Quantity;
                        vie.UnitPrice = $scope.packingSlipsDetail[index].UnitPrice;
                        vie.money_amount = $scope.packingSlipsDetail[index].AmountOC;
                        vie.Image1 = $scope.listItem[index].Image1;
                        vie.discount = $scope.packingSlipsDetail[index].DiscountAmountOC;
                        vie.vat = $scope.packingSlipsDetail[index].VATRate;
                        $scope.listview.push(vie);
                        vie = {};
                    }
                    //console.log($scope.listview[0].SKU);  
                });
                //lấy thông tin chứng từ gốc
                apiService.get('api/saleOrder/search?key=' + result.data.OriginalVoucherNo, null, function (result1) {
                    $scope.saleOrders = result1.data;
                });
                $scope.displayfunc();
            });
            //lấy thông tin chi tiết đơn hàng
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.packingSlipsDetail = result.data;

            });

        }
        $scope.getInfo();

        //thêm mới chi tiết đóng gói
        $scope.AddpackingSlipsDetail = AddpackingSlipsDetail;
        function AddpackingSlipsDetail(i, item) {
            if (i < $scope.packingSlipsDetail.length) {
                $scope.packingSlipsDetail[i].VoucherID = item.VoucherID;
                apiService.post('api/saleOrderDetail/create', $scope.packingSlipsDetail[i],
                    function (result) {
                        AddpackingSlipsDetail(i + 1, item);
                    },
                    function (error) {
                        notificationService.displayError('Thêm mới chi tiết đóng gói không thành công');
                    });
            }
        }
        //thêm mới phiếu đóng gói
        $scope.AddSaleOrder = AddSaleOrder;
        function AddSaleOrder() {
            $scope.packingSlips.VoucherType = 30;
            $scope.packingSlips.OriginalVoucherNo = $scope.packingSlips.VoucherNo;
            apiService.post('api/saleOrder/create_package', $scope.packingSlips, function (result) {
                AddpackingSlipsDetail(0, result.data);
            }, function (error) {
                notificationService.displayError('Thêm mới phiếu đóng gói không thành công');
            });
        }
     

        //in hóa đơn
        $scope.printInvoice = printInvoice;
        function printInvoice() {
            var contents = document.getElementById("dvContents").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Đơn hàng</title>');
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

    }
})(angular.module('tiktak.saleOrder'));