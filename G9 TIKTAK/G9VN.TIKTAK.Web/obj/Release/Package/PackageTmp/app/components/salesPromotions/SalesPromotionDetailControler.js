(function (app) {
    app.controller('SalesPromotionDetailControler', SalesPromotionDetailControler);
    SalesPromotionDetailControler.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams', '$ngBootbox'];
    function SalesPromotionDetailControler($scope, apiService, notificationService, $state, $stateParams, $ngBootbox) {
        $scope.getbyid = getbyid;
        $scope.getbysalespr = getbysalespr;
        $scope.limitChar = limitChar;
        $scope.changestt = changestt;
        $scope.deletel = deletel;
        $scope.getbypromotionid = getbypromotionid;
        $scope.SalesPromotionDetail = {};
        $scope.SalesPromotion = [];
       
        function getbyid() {
            apiService.get('api/salespromotiondetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.SalesPromotionDetail = result.data;
            }, function (error) {
                console.log('get that bại')
            });
        }
        function getbypromotionid() {
            apiService.get('api/saleOrder/getbypromotionid/' + $stateParams.id, null, function (result) {
                $scope.saleOrder = result.data;
                if ($scope.saleOrder.length == 0) {
                    $scope.display = 'none !important';
                    $scope.displayimg = 'block !important';
                } else {
                    $scope.displayimg = 'none !important';
                    $scope.display = 'block !important';

                }
            }, function (error) {
                console.log('get that bại')
            });
        }
        
        function getbysalespr() {
            apiService.get('api/salespromotion/getbyid/' + $stateParams.id, null, function (result) {
                $scope.SalesPromotion = result.data;
                $scope.CreateDate = new Date($scope.SalesPromotion.CreateDate);
                if ($scope.SalesPromotion.Description !== null) {
                    $scope.Description = $scope.limitChar($scope.SalesPromotion.Description, 15)

                } else {
                    $scope.Description = '';
                }
                if ($scope.SalesPromotion.Status == true) {
                    $scope.tt = "Đang giao dịch";
                    $scope.cs = "available";
                    $scope.dis = "none !important";
                    $scope.dis1 = "block !important";
                }
                else {
                    $scope.tt = "Ngừng giao dịch";
                    $scope.cs = "not-available";
                    $scope.dis = "block !important";
                    $scope.dis1 = "none !important";
                }
              
                if ($scope.SalesPromotion.VoucherType == 0) {
                    $scope.VoucherType = 'CK Σ đơn hàng';
                }
                if ($scope.SalesPromotion.VoucherType == 1) {
                    $scope.VoucherType = 'CK từng hàng hóa';
                }
                if ($scope.SalesPromotion.Expirydate !== null) {
                    $scope.Expirydate = new Date($scope.SalesPromotion.Expirydate);

                } else {
                    $scope.Expirydate = 'Không thời hạn';
                }
               // $scope.Expirydate1 = $scope.SalesPromotion.Expirydate;
            }, function (error) {
                console.log('get that bại')
            });
        }
        function changestt(i) {
            if (i == 1) {
                $scope.SalesPromotion.Status = true;
                $scope.info="Đã kích hoạt"
            }
            if (i == 2) {
                $scope.SalesPromotion.Status = false;
                $scope.info = "Đã ngừng"

            }
            apiService.put('api/salespromotion/update', $scope.SalesPromotion,
                function (result) {
                    notificationService.displaySuccess($scope.info);
                    getbysalespr();
                }, function (error) {
                    notificationService.displayError($scope.info);
                });
        }
        function deletel(){
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: $stateParams.id
                    }
                }
                apiService.del('api/salespromotion/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    $state.go('salesPromotions_list');
                    getbysalespr();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
        function limitChar(str, limit) {
            var cutString = str.slice(0, limit);
            if (str.length >= limit) {
                str = cutString + '...';
            } else {
                str = cutString
            }
            return str;
        }
        getbysalespr();
        getbyid();
        getbypromotionid();

    }
})(angular.module('tiktak.salesPromotions'));