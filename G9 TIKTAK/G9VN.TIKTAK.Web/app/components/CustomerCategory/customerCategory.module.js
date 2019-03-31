/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
	angular.module('tiktak.customerCategory', ['tiktak.common']).config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('customerCategory', {
		    url: "/customerCategory",
		    parent: 'base',
			templateUrl: "/app/components/customerCategory/customerCategoryListView.html",
			controller: "customerCategoryListController"
		}).state('customerCategory_add', {
		    url: "/customerCategory_add",
		    parent: 'base',
			templateUrl: "/app/components/customerCategory/customerCategoryAddView.html",
			controller: "customerCategoryAddController"
		}).state('customerCategory_edit', {
		    url: "/customerCategory_edit/:id",
		    parent: 'base',
		    templateUrl: "/app/components/customerCategory/customerCategoryEditView.html",
		    controller: "customerCategoryEditController"
		});
	}
})();