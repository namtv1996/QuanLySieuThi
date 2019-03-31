(function (app) {
    app.controller('reportsProfitController', reportSalesController);

    reportSalesController.$inject = ['$scope', 'apiService', 'notificationService', '$filter'];
    function reportSalesController($scope, apiService, notificationService, $filter) {
        //lấy thông tin tài khoản
        $scope.account = {};
        $scope.BranchID = '';

        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            $scope.BranchID = $scope.account.BranchID;
            $scope.ViewReport();
        });
       
        //lấy ds chi nhánh
        $scope.branch = [];
        $scope.getBranch = getBranch;
        function getBranch() {
            apiService.get('api/branch/getall', null, function (result) {
                $scope.branch = result.data;
            }, function () {
                console.log('load itemCategory failed');
            });
        }
        $scope.getBranch();
   
        //ngày 1,ngày 2 kỳ hiện tại
        $scope.date2 = new Date();
        
        $scope.date1 = new Date($scope.date2.getTime() - 1000 * 3600 * 24 * 30);
        $scope.date1.setHours(0);
        $scope.date1.setMinutes(0);
        $scope.date1.setSeconds(0);
        $scope.date1.setMilliseconds(0);
        $scope.date1 = new Date($scope.date1);
        // ngày 3, ngày 4 kì trước
        // ngày 4 =  ngày 1 - 1 day
        $scope.date4 = new Date($scope.date1.getTime() - 1000 * 3600 * 24);
        
        $scope.date3 = new Date($scope.date4.getTime() - 1000 * 3600 * 24 * 30);
        //báo cáo kỳ hiện tại
        $scope.report = {};
        //báo cáo kỳ trước
        $scope.report1 = {};
        // thay đổi
        $scope.change = {};
        $scope.ViewReport = function () {
            var config = {
                params:{
                    BranchID: $scope.BranchID,
                    date1: $scope.date1,
                    date2: $scope.date2
                }              
            }
            //báo cáo kỳ hiện tại
            $scope.date4  = new Date($scope.date1.getTime()-1000*3600*24);
            $scope.date3 = new Date($scope.date4.getTime() - ($scope.date2.getTime() - $scope.date1.getTime()));
            apiService.get('api/report/ReportProfitAndLoss',config, function (result) {
                $scope.report = result.data;
                var config = {
                    params: {
                        BranchID: $scope.BranchID,
                        date1:  $scope.date3,
                        date2: $scope.date4
                    }
                }
                //báo cáo kỳ trước
                apiService.get('api/report/ReportProfitAndLoss', config, function (result) {
                    $scope.report1 = result.data;        
                    //console.log($scope.report1.a2_2);               
                });
            });
        }
        //show modal
        $scope.showmodal = function () {
            
        }
    }
})(angular.module('tiktak.reportFinance'));