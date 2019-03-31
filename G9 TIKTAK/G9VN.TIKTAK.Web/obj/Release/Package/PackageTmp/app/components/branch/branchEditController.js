(function (app) {
    app.controller('branchEditController', branchEditController);
    branchEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', '$stateParams'];
    ///dinh nghia controller
    function branchEditController(apiService, $scope, notificationService, $state, $stateParams) {
        //khai bao doi tuong branch
        $scope.branch = {
            BranchCode: null,
            BranchName: null,
            Addres: null,
            TelephoneNumber: null,
            Email:null,
            Status:null
        }
      //  console.log("smamsm");
      
        //ham lay 1 doi tuong branch theo id
          
        function GetById() {
            apiService.get('api/branch/getbyid/' + $stateParams.id, null, function (result) {
                $scope.branch = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        //khai bao ham
        $scope.UpdateBranch = UpdateBranch;
        //ham update 
        function UpdateBranch() {
            apiService.put('api/branch/update', $scope.branch, function (result) {
                notificationService.displaySuccess('Chi nhánh ' + result.data.BranchName + ' đã được cập nhật thành ');
                //điều hướng về list branch
                $state.go('branch');
            }, function (error) {
                notificationService.displayError('Cập nhật không thành công!');
            });
        }
 
        //gọi hàm GetById();
        GetById();

    }
})(angular.module('tiktak.branch'))