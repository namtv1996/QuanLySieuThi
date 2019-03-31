(function (app) {
    app.controller('SalesPromotionItemAddControler', SalesPromotionItemAddControler);
    SalesPromotionItemAddControler.$inject = ['$scope', 'apiService', 'notificationService', '$state'];
    function SalesPromotionItemAddControler($scope, apiService, notificationService, $state) {
        //khai báo
        $scope.listSalesPromotion = {};
        $scope.cart = {
            list_selected: [],
        };
        $scope.dis = 'none';
        $scope.listItemPromotion = [];
        $scope.listSalesPromotionDetail = {};
        $scope.code = {};
        //khai báo sự kiện
        $scope.getcode = getcode;
        $scope.addSalesPromotion = addSalesPromotion;
        $scope.addSalesPromotionDetail = addSalesPromotionDetail;
        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        $scope.Cover = Cover;
        $scope.search = search;
        $scope.chooseProduct = chooseProduct;
        $scope.filterList = [];
        var pt = false;
        function search() {
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
        function chooseProduct(id) {
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
                    item.thanhtien = item.SalePrice * item.quan;
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
                        item.thanhtien = item.SalePrice * item.quan;
                        $scope.cart.list_selected.push(item);
                    }
                    else {
                        $scope.cart.list_selected[pos].quan++;
                        $scope.cart.list_selected[pos].thanhtien = ($scope.cart.list_selected[pos].SalePrice * $scope.cart.list_selected[pos].quan);
                    }
                } var pos = -1;


            }, function (error) {
                notificationService.displayError(error.data);
            });
            $scope.dis = 'none';
            $scope.searchText = '';
        }
        function Cover(stt) {
            if ($scope.cart.list_selected[stt - 1].VoucherType == true) {
                if ($scope.cart.list_selected[stt - 1].PromotionValue > 100 || $scope.cart.list_selected[stt - 1].PromotionValue < 0) {
                    $scope.cart.list_selected[istt - 1].PromotionValue = 0;
                }
            } else {
                for (i in $scope.cart.list_selected) {
                    $scope.cart.list_selected[stt - 1].PromotionValue = Currency(ConvertNumber($scope.cart.list_selected[stt - 1].PromotionValue))
                }
            }
        }
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
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                }
                else {
                    if (arr[i + 1] >= '5') {
                        arr1[i] = arr[i] - -1;
                    }
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
        function getcode() {
            apiService.get('api/salespromotion/getCode', null, function (result) {
                $scope.code = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.del = del;
        function del(stt) {
            $scope.cart.list_selected.splice(stt - 1, 1);
            for (var i = 0; i < $scope.cart.list_selected.length; i++) {
                $scope.cart.list_selected[i].stt = i + 1;
            }
            $scope.totalquan()
        }
        function addSalesPromotion(s) {
            if (s == 0) {
                $scope.listSalesPromotion.Status = false;
            } else {
                $scope.listSalesPromotion.Status = true;
            }
            $scope.listSalesPromotion.VoucherNo = $scope.code;
            $scope.listSalesPromotion.VoucherType = 1;
            apiService.post('api/salespromotion/create', $scope.listSalesPromotion,
                function (result) {
                    addSalesPromotionDetail(0, result.data);
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
        function addSalesPromotionDetail(i, SalesPro) {
            if (i < $scope.cart.list_selected.length) {
                $scope.listSalesPromotionDetail.VoucherID = SalesPro.VoucherID;
                $scope.listSalesPromotionDetail.QuantityItem = $scope.cart.list_selected[i].QuantityItem;
                $scope.listSalesPromotionDetail.ItemID = $scope.cart.list_selected[i].ID;
                $scope.listSalesPromotionDetail.LimitPromotion = $scope.cart.list_selected[i].LimitPromotion;
                $scope.listSalesPromotionDetail.PromotionValue = ConvertNumber($scope.cart.list_selected[i].PromotionValue);
                $scope.listSalesPromotionDetail.PromotionType = 1;
                if ($scope.cart.list_selected[i].VoucherType == undefined) {
                    $scope.listSalesPromotionDetail.VoucherType = false;
                } else {
                    $scope.listSalesPromotionDetail.VoucherType = $scope.cart.list_selected[i].VoucherType;
                }
                apiService.post('api/salespromotionDetail/create', $scope.listSalesPromotionDetail,
                       function (result) {
                           addSalesPromotionDetail(i + 1, SalesPro);
                       }, function (error) {
                           notificationService.displayError('Thêm mới không thành công.');
                       });
            } else {
                notificationService.displaySuccess('Thêm mới thành công !!');
                $state.go('salesPromotions_detail', { id: SalesPro.VoucherID });
            }
        }
        getcode();
    }
})(angular.module('tiktak.salesPromotions'));