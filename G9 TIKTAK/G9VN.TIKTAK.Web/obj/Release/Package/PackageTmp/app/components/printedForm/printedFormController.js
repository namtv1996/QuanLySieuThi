(function (app) {
    app.controller('printedFormController', printedFormController);

    printedFormController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', 'textAngularManager', '$compile'];
    function printedFormController($scope, apiService, notificationService, $ngBootbox, textAngularManager, $compile) {
        $scope.getallcode = getallcode;
        $scope.listcode = [];
        $scope.ckeditorOptions = {
            language: 'vi'
        }
        $scope.data = [];
               
        $scope.formView = {};
        $scope.print = "";
        function getallcode() {
            apiService.get('api/printedform/getall', null, function (result) {              
                $scope.data = result.data;         
                $scope.print = result.data[0].ID;
                $scope.formView = result.data[0];
                //$("textarea")[1].value = $scope.formView.HtmlCode
                //$compile($("textarea")[1])($scope);
                document.getElementById("print").innerHTML = $scope.formView.HtmlBody;
          
                   // notificationService.displaySuccess('Có ' + result.data.length + ' bản ghi.');                                               
            }, function () {
                console.log('load items failed');
            });

        }
        //load edi
       
   
        $scope.getallcode();
        ///chọn form in    
        $scope.selectForm = selectForm;
        function selectForm() {
            apiService.get('api/printedform/getByID/' + $scope.print,null,function(result){
                $scope.formView = result.data;
                $("textarea")[1].value = $scope.formView.HtmlCode
            }, function () {
                console.log('load items failed');
            });
        }
        //cập nhật 
        $scope.updateFormView = updateFormView;
        function updateFormView() {
            apiService.put('api/printedform/update', $scope.formView, function (result) {
                notificationService.displaySuccess('Cập nhật thành công ');
            }, function () {
                console.log('load items failed');
            });
        }
    }


})(angular.module('tiktak.printedForm'));