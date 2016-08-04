(function($localPath){
   function log() {
      console.log.apply(console,arguments);
   }

   angular
      .module("app",[
         "vsl.core.ui.testLogin",
         "vsl.velocity.app.services",
         "vsl.velocity.app.service.currentSelections",
         "vsl.velocity.app.service.principalProperties",
         "vsl.velocity.ui.selectors.classSelector",
         "vsl.velocity.ui.selectors.studentSelector",
         "vsl.velocity.ui.selectors.strandSelector",
         "vsl.velocity.ui.selectors.reportTypeSelector",
         "vsl.velocity.ui.nonStudent.subNavbar"
      ])
      .config(function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(["self",/.*/]);
      });

   angular.module("app").controller("AppController",AppController);

   AppController.$inject=["$scope", "$timeout", "$q", "temporaryStorage", "currentSelections"];

   function AppController($scope, $timeout, $q, temporaryStorage, currentSelections) {

      $scope.$on("vsl.core.ui.testLogin:success",function(){
         console.log("EVENT --> vsl.core.ui.testLogin:success","classSelector");

         $timeout(function(){
            $scope.setup();
         },0);

         $scope.setup=function(){
            //TODO: Sample response from: temporaryStorage.get('schoolClassSelected')
            var response={
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

            var value=response.result.properties[0].value;
            $scope.schoolClassSelected=value;
            temporaryStorage.set('schoolClassSelected',$scope.schoolClassSelected,true).then(function(){
               $scope.$broadcast("vsl.velocity.app:loaded");
            });
         };
      });

      $scope.$watch(currentSelections.getSelectedSchoolClass,function(nv){
         if (nv!=undefined) {
            $scope.schoolClassSelected = nv;
            $scope.checkRequiredFields();
         }
      });

      $scope.$watch(currentSelections.getSelectedStudent,function(nv){
         if (nv!=undefined) {
            if (nv.uuid=="allStudents") {
               $q.all([
                  currentSelections.setSelectedStrand("All Strands")
               ]).then(function(){
                  $location.path("/teacher/progress/schoolClassRpt");
               });
            } else {
               $scope.studentSelected=nv;
               $scope.checkRequiredFields();
            }
         }
      });

      $scope.$watch(currentSelections.getSelectedStrand,function(nv){
         if (nv!=undefined) {
            if (nv.name=="All Strands") {
               $location.path("/teacher/progress/studentRpt");
            } else {
               $scope.strandSelected = nv;
               $scope.checkRequiredFields();
            }
         }
      });

      $scope.$watch(currentSelections.getSelectedReportType,function(nv){
         if (nv!=undefined) {
            $scope.reportTypeSelected = nv;
            $scope.checkRequiredFields();
         }
      });

      $scope.checkRequiredFields = function(){
         log("FUNC --> checkRequiredFields()");
         if ($scope.schoolClassSelected && $scope.studentSelected && $scope.strandSelected && $scope.reportTypeSelected) {
            info("\t$scope.schoolClassSelected: ",($scope.schoolClassSelected?$scope.schoolClassSelected.name:""));
            info("\t$scope.studentSelected: ",($scope.studentSelected?$scope.studentSelected.firstName+" "+$scope.studentSelected.lastName:""));
            info("\t$scope.strandSelected: ",($scope.strandSelected?$scope.strandSelected.name:""));
            info("\t$scope.reportTypeSelected: ",($scope.reportTypeSelected?$scope.reportTypeSelected.name:""));
         }
      };

      return;
   }
   angular.bootstrap(document.body,["app"]);

})(window.location.href);