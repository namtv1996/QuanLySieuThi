(function (app) {
    'use strict';

    app.controller('applicationGroupAddController', applicationGroupAddController);

    applicationGroupAddController.$inject = ['$scope', 'apiService', 'notificationService', '$location', 'commonService'];

    function applicationGroupAddController($scope, apiService, notificationService, $location, commonService) {
        $scope.group = {
            ID: 0,
            Roles: [],
            Name:''
        }
        $scope.hanghoa = {};
        $scope.khachhang = {};
        $scope.nhomnguoidung = {};
        $scope.nguoidung = {};
        $scope.donhang = {};
        $scope.nhacungcap = {};
        $scope.phieuthu = {};
        $scope.phieuchi = {};
        $scope.kiemhang = {};
        $scope.nhaphang = {};
        $scope.baocao = {};
        $scope.quyen = {};
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var e = 0;
        var f = 0;
        var g = 0;
        var h = 0;
        var k = 0;
        var m = 0;
        var n = 0;
        var o = 0;

        $scope.addAppGroup = addApplicationGroup;

        function addApplicationGroup() {
            $scope.hanghoa.Roles = {};
            $scope.khachhang.Roles = {};
            $scope.nhomnguoidung.Roles = {};
            $scope.nguoidung.Roles = {};
            $scope.donhang.Roles = {};
            $scope.nhacungcap.Roles = {};
            $scope.phieuthu.Roles = {};
            $scope.phieuchi.Roles = {};
            $scope.kiemhang.Roles = {};
            $scope.nhaphang.Roles = {};
            $scope.baocao.Roles = {};
            $scope.quyen.Roles = {};

            apiService.post('/api/applicationGroup/add', $scope.group, addSuccessed, addFailed);
        }

        function addSuccessed() {
            notificationService.displaySuccess($scope.group.Name + ' đã được thêm mới.');

            $location.url('application_groups');
        }
        function addFailed(response) {
            notificationService.displayError(response.data.Message);
            notificationService.displayErrorValidation(response);
        }
        function loadRoles() {
            apiService.get('/api/applicationRole/getlistall', null, function (response) {
                $scope.roles = response.data;
                    for (var i = 0 ; i < response.data.length;i++) {
                        if (response.data[i].type == 1) {
                            $scope.hanghoa[a] = {};
                            $scope.hanghoa[a] = response.data[i];
                            a++
                        }
                        if (response.data[i].type == 2) {
                            $scope.khachhang[b] = {};
                            $scope.khachhang[b] = response.data[i];
                            b++
                        }
                        if (response.data[i].type == 3) {
                            $scope.nhomnguoidung[c] = {};
                            $scope.nhomnguoidung[c] = response.data[i];
                            c++
                        }
                        if (response.data[i].type == 4) {
                            $scope.nguoidung[d] = {};
                            $scope.nguoidung[d] = response.data[i];
                            d++
                        }
                        if (response.data[i].type == 5) {
                            $scope.donhang[e] = {};
                            $scope.donhang[e] = response.data[i];
                            e++
                        }
                        if (response.data[i].type == 6) {
                            $scope.nhacungcap[f] = {};
                            $scope.nhacungcap[f] = response.data[i];
                            f++
                        }
                        if (response.data[i].type == 7) {
                            $scope.phieuthu[g] = {};
                            $scope.phieuthu[g] = response.data[i];
                            g++
                        }
                        if (response.data[i].type == 8) {
                            $scope.phieuchi[h] = {};
                            $scope.phieuchi[h] = response.data[i];
                            h++
                        }
                        if (response.data[i].type == 9) {
                            $scope.kiemhang[k] = {};
                            $scope.kiemhang[k] = response.data[i];
                            k++
                        }
                        if (response.data[i].type == 10) {
                            $scope.nhaphang[m] = {};
                            $scope.nhaphang[m] = response.data[i];
                            m++
                        }
                        if (response.data[i].type == 12) {
                            $scope.baocao[n] = {};
                            $scope.baocao[n] = response.data[i];
                            n++
                        }
                        if (response.data[i].type == 11) {
                            $scope.quyen[o] = {};
                            $scope.quyen[o] = response.data[i];
                            o++
                        }
                    }
                    
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách quyền.');
                });

        }

        loadRoles();

    }
})(angular.module('tiktak.application_groups'));