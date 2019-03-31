(function () {

    "use strict"

    angular.module("akFileUploader", ['tiktak.common'])

           .factory("akFileUploaderService", ["$q", "$http",'authenticationService',
               function ($q, $http, authenticationService) {

                   var getModelAsFormData = function (data) {
                       var dataAsFormData = new FormData();
                       angular.forEach(data, function (value, key) {
                           dataAsFormData.append(key, value);
                       });
                       return dataAsFormData;
                   };

                   var saveModel = function (data, url) {
                       var deferred = $q.defer();
                       authenticationService.setHeader();
                       $http({
                           url: url,
                           method: "POST",
                           data: getModelAsFormData(data),
                           transformRequest: angular.identity,
                           headers: { 'Content-Type': undefined }
                       }).then(function (result) {
                           deferred.resolve(result);
                       }, function (err, status) {
                           deferred.reject(err);
                       });
                       return deferred.promise;
                   };

                   var updateModel = function (data, url) {
                       var deferred = $q.defer();
                       authenticationService.setHeader();
                       $http({
                           url: url,
                           method: "PUT",
                           data: getModelAsFormData(data),
                           transformRequest: angular.identity,
                           headers: { 'Content-Type': undefined }
                       }).then(function (result) {
                           deferred.resolve(result);
                       }, function (err, status) {
                           deferred.reject(err);
                       });
                       return deferred.promise;
                   };

                   return {
                       saveModel: saveModel,
                       updateModel: updateModel
                   }
               }])
            
         .directive("akFileModel", ["$parse",
                function ($parse) {
                    return {
                        restrict: "A",
                        link: function (scope, element, attrs) {
                            var model = $parse(attrs.akFileModel);
                            var modelSetter = model.assign;
                            element.bind("change", function () {
                                scope.$apply(function () {
                                    modelSetter(scope, element[0].files[0]);
                                });
                            });
                        }
                    };
                }]);
})(window, document);