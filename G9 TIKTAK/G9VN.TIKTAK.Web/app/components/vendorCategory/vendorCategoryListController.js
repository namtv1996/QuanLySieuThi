/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('vendorCategoryListController', vendorCategoryListController);

    vendorCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function vendorCategoryListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listVendorCategory = [];
        $scope.getVendorCategory = getVendorCategory;
        $scope.deleteVendorCategory = deleteVendorCategory;

        $scope.getPricePolicy = getPricePolicy;


        $scope.search = function () {
            if ($scope.searchText == '') {
                $scope.filterList = $scope.listVendorCategory;
                //alert('as');
            }
            if ($scope.searchText != '') {
                $scope.filterList = [];
                for (var index in $scope.listVendorCategory) {
                    if ($scope.listVendorCategory[index].Name.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) {
                        $scope.filterList.push({
                            Name: $scope.listVendorCategory[index].Name,
                            Id: $scope.listVendorCategory[index].Id,
                            Description: $scope.listVendorCategory[index].Description,
                            Status: $scope.listVendorCategory[index].Status,
                            CreateDate: $scope.listVendorCategory[index].CreateDate
                        });
                    }
                }
            }
        }

        function getVendorCategory() {
            apiService.get('api/objectCategory/getallV', null, function (result) {
                if (result.data.length == 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listVendorCategory = result.data;
                $scope.filterList = $scope.listVendorCategory;
                for (var i in $scope.listVendorCategory) {
                    if ($scope.listVendorCategory[i].Status == true) {
                        $scope.listVendorCategory[i].tt = "Đang kích hoạt";
                        $scope.listVendorCategory[i].cs = "available";
                    }
                    else {
                        $scope.listVendorCategory[i].tt = "Hủy kích hoạt";
                        $scope.listVendorCategory[i].cs = "not-available";
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getPricePolicy() {
            apiService.get('api/pricePolicy/getall', null, function (result) {
                $scope.listPP = result.data;
                for (var i = 0; i < $scope.listVendorCategory.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listVendorCategory[i].PricePolicyID === $scope.listPP[j].PricePolicyID) {
                            $scope.listVendorCategory[i].PricePolicyName = $scope.listPP[j].PricePolicyName;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }
        $scope.getPricePolicy();


        function deleteVendorCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                var list = [];
                apiService.get('api/vendor/getVendorByObjectCategory', config,
                    function (result) {
                        list = result.data;

                        if (list.length <= 0) {
                            apiService.del('api/objectCategory/delete', config, function () {
                                notificationService.displaySuccess('Xóa thành công');
                                getVendorCategory();
                            });


                        } else {
                            notificationService.displayError('Đã có dữ liệu nhà cung cấp thuộc nhóm này. Bạn không thể xóa !!');
                        }
                    },
                    function(){}
                );

            });
        }
        $scope.getVendorCategory();
        $scope.getPricePolicy();
    }
})(angular.module('tiktak.vendorCategory'));

