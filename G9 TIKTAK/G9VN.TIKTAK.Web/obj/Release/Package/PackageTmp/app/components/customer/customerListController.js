
(function (app) {
    app.controller('customerListController', customerListController);

    customerListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function customerListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listCustomer = [];
        $scope.getcustomer = getcustomer;
        $scope.customer;
        $scope.deleteCustomer = deleteCustomer;
        $scope.detailCustomer = detailCustomer;
        $scope.listObjectCategory = [];
        $scope.UpdateCustomer = UpdateCustomer;
        $scope.getObjectCategory = getObjectCategory;
        $scope.search = search;
        $scope.filterList = [];
        $scope.searchText = '';
        var options = {
            templateUrl: '/app/components/customer/customerViewDetail.html',
            title: 'Chi tiết khách hàng',
            className: 'test-class',

        };

        function UpdateCustomer() {
            apiService.put('api/Customer/update', $scope.customer,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    for (var i in $scope.listCustomer) {
                        if ($scope.listCustomer[i].Status == true) {
                            $scope.listCustomer[i].tt = "Đang giao dịch";
                            $scope.listCustomer[i].cs = "available";
                        }
                        else {
                            $scope.listCustomer[i].tt = "Ngừng giao dịch";
                            $scope.listCustomer[i].cs = "not-available";
                        }
                    }
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
        $scope.search = search;
   function search () {
            if ($scope.searchText == '') {
                $scope.listCustomer = $scope.listCustomer;
                //alert('as');
            }
            if ($scope.searchText != '') {
                apiService.get('api/Customer/search?key=' + $scope.searchText, null, function (result) {
                    $scope.filterList = result.data;
                }, function () {
                    console.log('load items failed');
                        });
                    }
            else {
                $scope.filterList = $scope.listCustomer;
                }
            }


        function getcustomer() {
            apiService.get('api/Customer/getall', null, function (result) {
                if (result.data.length == 0) {
                    $scope.filterList = result.data;
                    notificationService.displayWarning('Không có bản ghi nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');
                }
                $scope.listCustomer = result.data;
                for (var i in $scope.listCustomer) {
                    if ($scope.listCustomer[i].Status == true) {
                        $scope.listCustomer[i].tt = "Đang giao dịch";
                        $scope.listCustomer[i].cs = "available";
                        $scope.filterList = $scope.listCustomer;
                    }
                    else {
                        $scope.listCustomer[i].tt = "Ngừng giao dịch";
                        $scope.listCustomer[i].cs = "not-available";
                        $scope.filterList = $scope.listCustomer;
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function getObjectCategory() {
            apiService.get('api/objectCategory/getall', null, function (result) {
                $scope.listObjectCategory = result.data;
                for (var i = 0; i < $scope.listCustomer.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if ($scope.listCustomer[i].ObjectCategoryID == $scope.listObjectCategory[j].Id) {
                            $scope.listCustomer[i].CategoryName = $scope.listObjectCategory[j].Name;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }
        function detailCustomer(id) {
            $ngBootbox.customDialog(options);

        }
        function deleteCustomer(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/Customer/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getcustomer();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }
        
        $scope.getcustomer();
        $scope.getObjectCategory();
    }
})(angular.module('tiktak.customer'));

