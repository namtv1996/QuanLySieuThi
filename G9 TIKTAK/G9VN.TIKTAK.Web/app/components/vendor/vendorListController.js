
(function (app) {
    app.controller('vendorListController', vendorListController);

    vendorListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function vendorListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listVendor = [];
        $scope.getVendor = getVendor;
        $scope.vendors;
        $scope.deleteVendors = deleteVendors;

        $scope.listObjectCategory = [];
        $scope.getObjectCategory = getObjectCategory;

        $scope.search = function () {
            if ($scope.searchText == '') {
                $scope.filterList = $scope.listVendor;
                //alert('as');
            }
            if ($scope.searchText != '') {
                $scope.filterList = [];
                for (var index in $scope.listVendor) {
                    if ($scope.listVendor[index].ObjectName.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) {
                        $scope.filterList.push({
                            ObjectName: $scope.listVendor[index].ObjectName,
                            ObjectCode: $scope.listVendor[index].ObjectCode,
                            ObjectID: $scope.listVendor[index].ObjectID,
                            Description: $scope.listVendor[index].Description,
                            Status: $scope.listVendor[index].Status,
                            CreateDate: $scope.listVendor[index].CreateDate
                        });
                    }
                }
            }
        }
        function getVendor() {
            apiService.get('api/vendor/getall', null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listVendor = result.data;
                $scope.filterList = $scope.listVendor;
                $scope.getObjectCategory();
                for (var i in $scope.listVendor) {
                    if ($scope.listVendor[i].Status == true) {
                        $scope.listVendor[i].tt = "Đang giao dịch";
                        $scope.listVendor[i].cs = "available";
                    }
                    else {
                        $scope.listVendor[i].tt = "Ngừng giao dịch";
                        $scope.listVendor[i].cs = "not-available";
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getObjectCategory() {
            apiService.get('api/objectCategory/getallV', null, function (result) {
                $scope.listObjectCategory = result.data;
                for (var i = 0; i < $scope.listVendor.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listVendor[i].ObjectCategoryID === $scope.listObjectCategory[j].Id) {
                            $scope.listVendor[i].CategoryName = $scope.listObjectCategory[j].Name;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }


        function deleteVendors(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/vendor/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getVendor();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }


        $scope.getVendor();


    }
})(angular.module('tiktak.vendor'));

