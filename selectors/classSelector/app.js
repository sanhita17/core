(function($localPath){
   angular
      .module("app",[
         "vsl.core.ui.testLogin",
         "vsl.core.sis",
         "vsl.velocity.app.services",
         "vsl.velocity.app.service.currentSelections",
         "vsl.velocity.app.service.principalProperties",
         "vsl.velocity.ui.selectors.classSelector"
      ])
      .config(function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(["self",/.*/]);
      });

   angular.module("app").controller("AppController",AppController);

   AppController.$inject=["$scope", "$timeout", "temporaryStorage", "currentSelections"];

   function AppController($scope, $timeout, temporaryStorage, currentSelections) {

      currentSelections.setSelectedSchoolClassDefault("allClasses");

      $scope.$on("vsl.core.ui.testLogin:success",function(){
         console.log("EVENT --> vsl.core.ui.testLogin:success","classSelector");

         $timeout(function(){
            $scope.setup();
         },0);

         $scope.setup = function(){
            //TODO: Sample response from: temporaryStorage.get('schoolClassSelected')
            var response = {
               "jsonrpc":"2.0",
               "id":"c1e7b6af-4a26-e352-e140-57a0f45fc442",
               "result":{
                  "messages":[
                     {
                        "code":200,
                        "success":true,
                        "message":"success"
                     }
                  ],
                  "properties":[
                     {
                        "key":"schoolClassSelected",
                        "value":{
                           "campusMasterUuid":"2097223F-092B-4050-937F-F1CF614EC80B",
                           "districtMasterUuid":"0B6D8B7D-873F-40D8-B687-3D2460B181C3",
                           "districtTrackUuid":"F30F93FB-4E2F-4F5A-96C0-ED736D802AD9",
                           "name":"Self 3rd Grade",
                           "uuid":"5FA64BF8-ECD7-4A8B-A476-EA64E112C77F"
                        },
                        "applicationUuid":"EC6A1DF0-C0E2-4D28-BC25-C36E442F5162",
                        "principalUuid":"82440D39-F787-46D5-95C5-2665C83852F9",
                        "defaultValue":null
                     }
                  ],
                  "success":true,
                  "badRequest":false
               }
            };

            var value = response.result.properties[0].value;
            $scope.schoolClassSelected = value;
            temporaryStorage.set('schoolClassSelected',$scope.schoolClassSelected,true).then(function(){
               $scope.$broadcast("vsl.velocity.app:loaded");
            });
         };

      });

      return;
   }
   angular.bootstrap(document.body,["app"]);

})(window.location.href);