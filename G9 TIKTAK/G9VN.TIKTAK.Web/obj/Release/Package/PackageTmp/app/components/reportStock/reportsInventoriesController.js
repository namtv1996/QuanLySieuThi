(function (app) {
    app.controller('reportsInventoriesController', reportsInventoriesController);

    reportsInventoriesController.$inject = ['$scope', 'apiService'];
    function reportsInventoriesController($scope, apiService) {

        $scope.getItemOption = getItemOption;
        $scope.listItemOpt = [];
        $scope.getItem = getItem;
        $scope.listItem = [];
        $scope.BaoCao = BaoCao;
        $scope.TotalInventoryAmountBranch = 0;
        $scope.TotalInventoryAmountSystem = 0;
        $scope.TotalClosingQuantity = 0;
        $scope.TotalClosingQuantityBranch = 0;

        $scope.branchid = '';
        $scope.listBranch = [];

        $scope.ViewReport = ViewReport;

        function ViewReport() {
            $scope.listItemOpt = [];
            $scope.TotalInventoryAmountBranch = 0;
            $scope.TotalInventoryAmountSystem = 0;
            $scope.TotalClosingQuantity = 0;
            $scope.TotalClosingQuantityBranch = 0;
            var config = {
                params: {
                    BranchID: $scope.branchid
                }
            }

            apiService.get('api/itemOption/AutoComplete', config, function (result) {
                $scope.listItemOpt = result.data;

                $scope.getItem();

                for (var i = 0; i < $scope.listItemOpt.length; i++) {
                    $scope.listItemOpt[i].stt = i + 1;
                    $scope.listItemOpt[i].InventoryAmountBranch = $scope.listItemOpt[i].quantity * $scope.listItemOpt[i].PurchasePrice;
                    $scope.listItemOpt[i].InventoryAmountSystem = $scope.listItemOpt[i].ClosingQuantity * $scope.listItemOpt[i].PurchasePrice;
                    if ($scope.listItemOpt[i].InventoryAmountSystem !== 0) {
                        $scope.listItemOpt[i].Proportion = (($scope.listItemOpt[i].InventoryAmountBranch / $scope.listItemOpt[i].InventoryAmountSystem) * 100).toFixed(2);                    }
                    else {
                        $scope.listItemOpt[i].Proportion = 0;
                    }
                }
                BaoCao();
            }, function () {
                console.log('load items failed');
            });
        }

        function getItem() {
            apiService.get('api/item/getall', null, function (result) {
                $scope.listItem = result.data;
                for (var i = 0; i < $scope.listItemOpt.length; i++) {
                    for (j = 0; j < result.data.length; j++) {
                        if ($scope.listItemOpt[i].ItemID == $scope.listItem[j].ItemID) {

                            $scope.listItemOpt[i].NameItem = $scope.listItem[j].Name;
                        }
                    }
                }
            }, function () {
                console.log('load items failed');
            });
        }

        function BaoCao() {

            for (var i = 0; i < $scope.listItemOpt.length; i++) {
                $scope.TotalInventoryAmountBranch = $scope.TotalInventoryAmountBranch + $scope.listItemOpt[i].InventoryAmountBranch;
                $scope.TotalInventoryAmountSystem = $scope.TotalInventoryAmountSystem + $scope.listItemOpt[i].InventoryAmountSystem;
                $scope.TotalClosingQuantity = $scope.TotalClosingQuantity + $scope.listItemOpt[i].ClosingQuantity;
                $scope.TotalClosingQuantityBranch = $scope.TotalClosingQuantityBranch + $scope.listItemOpt[i].quantity;
            }
        }

        function getItemOption() {

            apiService.get('api/branch/getall', null, function (result) {
                $scope.listBranch = result.data;
                $scope.branchid = $scope.listBranch[0].BranchID;

                var config = {
                    params: {
                        BranchID: $scope.branchid
                    }
                }

                apiService.get('api/itemOption/AutoComplete', config, function (result) {
                    $scope.listItemOpt = result.data;

                    $scope.getItem();

                    for (var i = 0; i < $scope.listItemOpt.length; i++) {
                        $scope.listItemOpt[i].stt = i + 1;
                        $scope.listItemOpt[i].InventoryAmountBranch = $scope.listItemOpt[i].quantity * $scope.listItemOpt[i].PurchasePrice;
                        $scope.listItemOpt[i].InventoryAmountSystem = $scope.listItemOpt[i].ClosingQuantity * $scope.listItemOpt[i].PurchasePrice;
                        if ($scope.listItemOpt[i].InventoryAmountSystem !== 0) {
                            $scope.listItemOpt[i].Proportion = (($scope.listItemOpt[i].InventoryAmountBranch / $scope.listItemOpt[i].InventoryAmountSystem) * 100).toFixed(2);
                        }
                        else {
                            $scope.listItemOpt[i].Proportion = 0;
                        }
                    }
                    BaoCao();
                }, function () {
                    console.log('load items failed');
                });
            }, function () {
            });


        }

        $scope.getItemOption();

    }
})(angular.module('tiktak.reportStock'));