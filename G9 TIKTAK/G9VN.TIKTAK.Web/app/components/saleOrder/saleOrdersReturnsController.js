(function (app) {
    app.controller('saleOrdersReturnsController', saleOrdersReturnsController);

    saleOrdersReturnsController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$ngBootbox'];
    function saleOrdersReturnsController($scope, apiService, notificationService, $stateParams, $ngBootbox) {

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
        $scope.savesaleOrdersReturns = function () {
            $scope.saleOrders.StatusID = 11;
            apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                //gọi hàm hiển thị chức năng

            });
            notificationService.displaySuccess('Trả hàng thành công!');

        }
        ///hàm lấy thông tin cần thiết cho view chi tiết
        $scope.getInfo = function () {
            //lấy thông tin đơn đặt hàng
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrders = result.data;
              
                //gọi hàm hiển thị chức năng
               
                //lấy danh sách sp 
                apiService.get('api/itemOption/getitemsaleinvoice/' + $scope.saleOrders.VoucherID, null, function (result1) {
                    $scope.listItem = result1.data;

                    //gán lại các trường cần hiển thị
                    var vie = {};
                    for (var index in $scope.listItem) {
                        vie.SKU = $scope.listItem[index].SKU;
                        vie.Name = $scope.listItem[index].Name;
                        vie.Quantity = $scope.saleOrdersDetail[index].Quantity;
                        vie.UnitPrice = $scope.saleOrdersDetail[index].UnitPrice;
                        vie.money_amount = $scope.saleOrdersDetail[index].AmountOC;
                        vie.Image1 = $scope.listItem[index].Image1;
                        vie.discount = $scope.saleOrdersDetail[index].DiscountAmountOC;
                        vie.vat = $scope.saleOrdersDetail[index].VATRate;
                        $scope.listview.push(vie);
                        vie = {};
                    }
                    //console.log($scope.listview[0].SKU);  
                });
                // lấy thông tin khách hàng
                apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null, function (result) {
                    $scope.customer = result.data;
                });
            })
            //lấy thông tin chi tiết đơn hàng
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrdersDetail = result.data;

            });
            
        }
        
        $scope.getInfo();
    }
})(angular.module('tiktak.saleOrder'));