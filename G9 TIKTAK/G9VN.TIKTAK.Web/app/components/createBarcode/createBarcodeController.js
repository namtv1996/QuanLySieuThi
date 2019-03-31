(function (app) {
    app.controller('createBarcodeController', createBarcodeController);
    createBarcodeController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function createBarcodeController(apiService, $scope, notificationService, $state) {
        $scope.bc = {
            format: 'CODE128',
            lineColor: '#000000',
            width: 1,
            height: 100,
            displayValue: true,
            fontOptions: '',
            font: 'monospace',
            textAlign: 'center',
            textPosition: 'bottom',
            textMargin: 2,
            fontSize: 20,
            background: '#ffffff',
            margin: 0,
            marginTop: undefined,
            marginBottom: undefined,
            marginLeft: undefined,
            marginRight: undefined,
            valid: function (valid) {
               
            }
        }
       
        
    }
})(angular.module('tiktak.barcode'));