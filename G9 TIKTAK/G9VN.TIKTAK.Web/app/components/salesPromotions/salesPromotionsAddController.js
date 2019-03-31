(function (app) {
    app.controller('salesPromotionsAddController', salesPromotionsAddController);
    salesPromotionsAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];
    function salesPromotionsAddController($scope, apiService, notificationService, $state) {
        //khai báo
        $scope.listSalesPromotion = {};
        $scope.attribute = {
            ID: null,
            QuantityItem: null,
            DiscountAmount: null,
            ConditionsMax: 0,
            ConditionsMin: 0,
            PromotionValue: 0,
            VoucherType: false,
            stt: 0
        };
        $scope.listItemPromotion = [];
        $scope.listSalesPromotionDetail = {};
        $scope.listItemPromotion.push($scope.attribute);
        $scope.code = {};
        //khai báo sự kiện
        $scope.getcode = getcode;
       
        $scope.addrow = addrow;
        $scope.addSalesPromotion = addSalesPromotion;
        $scope.addSalesPromotionDetail = addSalesPromotionDetail;
        $scope.Currency = Currency;
        $scope.ConvertNumber = ConvertNumber;
        $scope.Cover = Cover;
        var pt = false;
        function Cover(stt) {
            if ($scope.listItemPromotion[stt].VoucherType == true) {
                if ($scope.listItemPromotion[stt].PromotionValue > 100 || $scope.listItemPromotion[stt].PromotionValue < 0) {
                    $scope.listItemPromotion[i].PromotionValue = 0;
                }
            } else {
                for (i in $scope.listItemPromotion) {
                    $scope.listItemPromotion[i].ConditionsMax = Currency(ConvertNumber($scope.listItemPromotion[i].ConditionsMax))
                    $scope.listItemPromotion[i].ConditionsMin = Currency(ConvertNumber($scope.listItemPromotion[i].ConditionsMin))
                    $scope.listItemPromotion[i].PromotionValue = Currency(ConvertNumber($scope.listItemPromotion[i].PromotionValue))
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
        // sự kiện 
        function addrow() {
            var index = Number($scope.listItemPromotion.length);
            $scope.listItemPromotion[index] = {};
            $scope.listItemPromotion[index].QuantityItem = null;
            $scope.listItemPromotion[index].DiscountAmount = null;
            $scope.listItemPromotion[index].ConditionsMax = 0;
            var tam = parseInt(ConvertNumber($scope.listItemPromotion[index - 1].ConditionsMax));
            $scope.listItemPromotion[index].ConditionsMin = Currency(tam + 1);
            $scope.listItemPromotion[index].PromotionValue = 0;
            $scope.listItemPromotion[index].VoucherType = false;
            $scope.listItemPromotion[index].stt = index;
        }
        $scope.deleteItems = deleteItems;
        function deleteItems(i){
            $scope.listItemPromotion.splice(i, 1);
        }
        function getcode() {
            apiService.get('api/salespromotion/getCode', null, function (result) {
                $scope.code = result.data;
            }, function () {
                console.log('load items failed');
            });
        }

        function addSalesPromotion(s) {
            if ($scope.frmAddSalesPromotion.$valid == true) {
                if (s == 0) {
                    $scope.listSalesPromotion.Status = false;
                } else {
                    $scope.listSalesPromotion.Status = true;
                }
                $scope.listSalesPromotion.VoucherNo = $scope.code;
                apiService.post('api/salespromotion/create', $scope.listSalesPromotion,
                    function (result) {
                        addSalesPromotionDetail(0, result.data);
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
            } else {
                notificationService.displayError('Yêu cầu nhập tất cả các trường có dấu * màu đỏ.');
            }
            
        }
        function addSalesPromotionDetail(i, SalesPro) {
            if (i < $scope.listItemPromotion.length) {
                $scope.listSalesPromotionDetail.VoucherID = SalesPro.VoucherID;
                $scope.listSalesPromotionDetail.ConditionsMax = ConvertNumber($scope.listItemPromotion[i].ConditionsMax);
                $scope.listSalesPromotionDetail.ConditionsMin = ConvertNumber($scope.listItemPromotion[i].ConditionsMin);
                $scope.listSalesPromotionDetail.PromotionValue = $scope.listItemPromotion[i].PromotionValue;
                $scope.listSalesPromotionDetail.VoucherType = $scope.listItemPromotion[i].VoucherType;
                $scope.listSalesPromotionDetail.PromotionType = 0;
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