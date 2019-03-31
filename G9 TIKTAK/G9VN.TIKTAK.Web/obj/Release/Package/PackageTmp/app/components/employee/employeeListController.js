
(function (app) {
    app.controller('employeeListController', employeeListController);

    employeeListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function employeeListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.listEmployee = [];
        $scope.getEmployee = getEmployee;
        $scope.employees;
        $scope.deleteEmployee = deleteEmployee;
        //$scope.detailVendors = detailVendors;
        //$scope.listObjectCategory = [];
        //$scope.getObjectCategory = getObjectCategory;

        //var options = {
        //    templateUrl: '/app/components/employee/vendorDetailView.html',
        //    title: 'Chi tiết nhà cung cấp',
        //    className: 'test-class',

        //};

        $scope.search = function () {
            if ($scope.searchText == '') {
                $scope.filterList = $scope.listEmployee;
                //alert('as');
            }
            if ($scope.searchText != '') {
                $scope.filterList = [];
                for (var index in $scope.listEmployee) {
                    if ($scope.listEmployee[index].ObjectName.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) {
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
        function getEmployee() {
            apiService.get('api/employee/getall', null, function (result) {
                if (result.data.length === 0) {
                    notificationService.displayWarning('Không có bản ghi Nhân Viên nào!!!');
                }
                else {
                    notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi Nhân Viên.');
                }
                $scope.listEmployee = result.data;
                $scope.filterList = $scope.listEmployee;
                for (var i in $scope.listEmployee) {
                    if ($scope.listEmployee[i].Status == true) {
                        $scope.listEmployee[i].tt = "Đang làm việc";
                        $scope.listEmployee[i].cs = "available";
                    }
                    else {
                        $scope.listEmployee[i].tt = "Đã nghỉ việc";
                        $scope.listEmployee[i].cs = "not-available";
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        //function getObjectCategory() {
        //    apiService.get('api/objectCategory/getall', null, function (result) {
        //        $scope.listObjectCategory = result.data;
        //        for (var i = 0; i < $scope.listVendor.length; i++) {
        //            for (var j = 0; j < result.data.length; j++) {
        //                if ($scope.listVendor[i].ObjectCategoryID === $scope.listObjectCategory[j].Id) {
        //                    $scope.listVendor[i].CategoryName = $scope.listObjectCategory[j].Name;
        //                }
        //            }
        //        }
        //    }, function () {
        //        console.log('load items failed');
        //    });
        //}
       // $scope.getObjectCategory();

        //function detailVendors(id) {
        //    $ngBootbox.customDialog(options);

        //}
        function deleteEmployee(id) {
            $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/employee/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    getEmployee();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }


        $scope.getEmployee();
        //$scope.getObjectCategory();

    }
})(angular.module('tiktak.employee'));

