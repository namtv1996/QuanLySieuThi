
(function (app) {
    app.controller('customerCategoryListController', customerCategoryListController);

    customerCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function customerCategoryListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listcustomerCategory = [];
        $scope.getcustomerCategory = getcustomerCategory;
        $scope.customerCategory;
        $scope.deleteCustomerCategory = deleteCustomerCategory;
        $scope.detailCustomerCategory = detailCustomerCategory;
        $scope.getPricePolicy = getPricePolicy;

        var options = {
            templateUrl: '/app/components/customerCategory/customerCategoryViewDetail.html',
            title: 'Chi tiết nhóm khách hàng',
            className: 'test-class',
        };
        $scope.search = function () {
            if ($scope.searchText == '') {
                $scope.filterList = $scope.listcustomerCategory;
                //alert('as');
            }
            if ($scope.searchText != '') {
                $scope.filterList = [];
                for (var index in $scope.listcustomerCategory) {
                    if ($scope.listcustomerCategory[index].Name.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) {
                        $scope.filterList.push({
                            Name: $scope.listcustomerCategory[index].Name,
                            Id: $scope.listcustomerCategory[index].Id,
                            Description: $scope.listcustomerCategory[index].Description,
                            Status: $scope.listcustomerCategory[index].Status
                        });
                    }
                }
            }
        }
        function getcustomerCategory() {
            apiService.get('api/objectCategory/getall', null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listcustomerCategory = result.data;
                $scope.filterList = $scope.listcustomerCategory;

                for (var i in $scope.listcustomerCategory) {
                    if ($scope.listcustomerCategory[i].Status == true) {
                        $scope.listcustomerCategory[i].tt = "Đang kích hoạt";
                        $scope.listcustomerCategory[i].cs = "available";
                    }
                    else {
                        $scope.listcustomerCategory[i].tt = "Hủy kích hoạt";
                        $scope.listcustomerCategory[i].cs = "not-available";
                    }
                }

            }, function () {
                console.log('load items failed');
            });
        }

        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {
                $scope.listPP = result.data;
                for (var i = 0; i < $scope.listcustomerCategory.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listcustomerCategory[i].PricePolicyID === $scope.listPP[j].PricePolicyID) {
                            $scope.listcustomerCategory[i].PricePolicyName = $scope.listPP[j].PricePolicyName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.getPricePolicy();

        function detailCustomerCategory(id) {
            $ngBootbox.customDialog(options);

        }
        function deleteCustomerCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                var list = [];
                apiService.get('api/Customer/getCustomerByObjectCategory', config,
                    function (result) {
                        list = result.data;

                        if (list.length <= 0) {
                            apiService.del('api/objectCategory/delete', config, function () {
                                notificationService.displaySuccess('Xóa thành công');
                                getVendorCategory();
                            });


                        } else {
                            notificationService.displayError('Đã có dữ liệu khách hàng thuộc nhóm này. Bạn không thể xóa !!');
                        }
                    },
                    function () { }
                );

            });
        }
        $scope.getcustomerCategory();
        $scope.getPricePolicy();
    }
})(angular.module('tiktak.customerCategory'));
