(function (app) {
    app.controller('branchListController', branchListController);

    branchListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
  
    function branchListController($scope, apiService, notificationService, $ngBootbox) {
        //mảng lấy dữ dữ liệu từ api
        $scope.listBranchs = [];
        //mang tạm sau khi tim kiem
        $scope.filterList = [];
        //chuoi text trong input tim kiem
        $scope.searchText = '';

        //khai bao hàm
        $scope.getBranchs = getBranchs;
        $scope.deleteBranch = deleteBranch;

        //tìm kiếm
        $scope.search = function () {
            if ($scope.searchText === '') {
                $scope.filterList = $scope.listBranchs;
                //alert('as');
            }
            if ($scope.searchText != '') {
                $scope.filterList = [];
                for (var index in $scope.listBranchs) {
                   
                    
                    if ($scope.listBranchs[index].BranchName.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) {
                        $scope.filterList.push({
                            BranchCode: $scope.listBranchs[index].BranchCode,
                            BranchName: $scope.listBranchs[index].BranchName,
                            Address: $scope.listBranchs[index].Address,
                            TelephoneNumber: $scope.listBranchs[index].TelephoneNumber,
                            Email: $scope.listBranchs[index].Email
                        });                     
                    }
                }
               
            }
            
        }
            //lấy chi nhánh
            function getBranchs() {
                apiService.get('api/branch/getall', null, function (result) {
                   
                    $scope.listBranchs = result.data;
                    $scope.filterList = result.data;
                   // $scope.filterList.splice(4, 5);
                    for (var i in $scope.listBranchs) {
                        if ($scope.listBranchs[i].Status == true) {
                            $scope.listBranchs[i].tt = "Đang hoạt động";
                            $scope.listBranchs[i].cs = "available";
                        }
                        else {
                            $scope.listBranchs[i].tt = "Ngừng hoạt động";
                            $scope.listBranchs[i].cs = "not-available";
                        }
                    }

                }, function () {
                    console.log('load items failed');
                });
            }
            //click nút xóa
            function deleteBranch(id) {
                $ngBootbox.confirm('<h4>Bạn có chắc muốn xóa?</h4>').then(function () {
                    var config = {
                        params: {
                            id: id
                        }
                    }
                    apiService.del('api/branch/delete', config, function () {
                        notificationService.displaySuccess('Xóa thành công');
                        getBranchs();
                    }, function () {
                        notificationService.displayError('Xóa không thành công');

                    })
                });
            }
            $scope.getBranchs();
            //tim kiem

        }

    
   
})(angular.module('tiktak.branch'));