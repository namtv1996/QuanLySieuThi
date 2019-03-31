(function (app) {
    app.controller('deliveryCostController', deliveryCostController);
    deliveryCostController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];
    function deliveryCostController($scope, apiService, notificationService, $ngBootbox) {
        $scope.Usesignup = {
            token: null,
            Email: null,
            Password: null,
            ContactPhone: null,
            ContactName: null
        }
        $scope.transporter = {
            ObjectCode: null,
            ObjectName: null,
            ObjectAddress: null,
            ObjectCategoryID: null,
            ObjectKind: 5,
            Tel: null,
            Email: null,
            Debt: 0,
            AccumulativePoint: 0,
            Status: true,
            BankAccount: null,
            BankName: null,
            TaxCode: null,
            Description: null,
            CreateDate: new Date(),
            CreateBy: null,

        };
        $scope.ghnstt = 'Cửa hàng chưa sử dụng';
        $scope.SignUpGHN = SignUpGHN;
        $scope.Partner = {};
        $scope.listDelivery = [];
        $scope.GetDelivery = GetDelivery;
        $scope.getCode = getCode;
        $scope.myFunction = myFunction;
        $scope.myFunction1 = myFunction;
        $scope.myFunction2 = myFunction;
        $scope.myFunction3 = myFunction;
        $scope.display = "none !important"
        $scope.display1 = "none !important"
        $scope.display2 = "none !important"
        $scope.display3 = "none !important"
        function myFunction() {
            if ($scope.display === "none !important") {
                $scope.display = "block !important";
            } else {
                $scope.display = "none !important";
            }
        }
        function myFunction1() {
            if ($scope.display1 === "none !important") {
                $scope.display1 = "block !important";
            } else {
                $scope.display1 = "none !important";
            }
        }
        function myFunction2() {
            if ($scope.display2 === "none !important") {
                $scope.display2 = "block !important";
            } else {
                $scope.display2 = "none !important";
            }
        }
        function myFunction3() {
            if ($scope.display3 === "none !important") {
                $scope.display3 = "block !important";
            } else {
                $scope.display3 = "none !important";
            }
        }
        function getCode() {
            apiService.get('api/transporter/getCode', null, function (result) {
                $scope.transporter.ObjectCode = result.data;
            }, function () {
                console.log('load items failed');
            });
        }
        function AddTransporter() {
            $scope.transporter.ObjectName = $scope.Partner.PartnerName;
            $scope.transporter.Tel = $scope.Partner.Tel;
            $scope.transporter.Email = $scope.Partner.Gmail;
            $scope.transporter.ObjectAddress = $scope.Partner.ObjectAddress;
                apiService.post('api/transporter/create', $scope.transporter,
                    function (result) {
                        notificationService.displaySuccess(result.data.ObjectCode + ' đã được thêm mới.');
                        $state.go('transporter');
                    }, function (error) {
                        notificationService.displayError('Thêm mới không thành công.');
                    });
        }
        $scope.getCode();
        function SignUpGHN() {
            $scope.Usesignup.ContactPhone = $scope.authentication.phoneNumber;
            $scope.Usesignup.ContactName = $scope.authentication.storeName;
            apiService.post('api/transportpartners/GHNSignUp', $scope.Usesignup, function (result) {
                var obj = JSON.parse('' + result.data.Content + '');
                //notificationService.displayInfo(obj.msg);
                alert(obj.msg);
                if (obj.msg == "Success") {
                    $scope.Partner.Status = true;
                    $scope.Partner.StoreName = $scope.authentication.storeName;
                    $scope.Partner.NameSignIn = $scope.Usesignup.Email;
                    $scope.Partner.PartnerName = "GHN";
                    $scope.Partner.Tel = "18001201";
                    $scope.Partner.Gmail = "support24/24api@ghn.vn";
                    $scope.Partner.ObjectAddress = "Công ty Cổ phần Dịch vụ Giao Hàng Nhanh";
                    apiService.post('api/Partner/create', $scope.Partner, function (result) {
                        AddTransporter();
                    }, function (error) {
                    });
                }


            }, function (error) {

            });
        }
        function GetDelivery() {
            apiService.get('api/Partner/getall', null, function (result) {
                $scope.listDelivery = result.data;
                for (i in $scope.listDelivery) {
                    if ($scope.listDelivery[i].PartnerName == 'GHN') {
                        $scope.ghnstt = 'Cửa hàng đã sử dụng';
                        $scope.displ = 'block !important';
                        $scope.Usesignup.Email = $scope.listDelivery[i].NameSignIn;
                        $scope.Usesignup.Password = $scope.listDelivery[i].PassSignIn;
                    }
                }
            });

        }
        GetDelivery();
    }
})(angular.module('tiktak.deliveryCost'));