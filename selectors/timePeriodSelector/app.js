(function($localPath){
   angular
      .module("app",[
         "vsl.core.ui.testLogin",
         "vsl.velocity.app.services",
         "vsl.velocity.app.service.currentSelections",
         "vsl.velocity.app.service.principalProperties",
         "vsl.velocity.ui.selectors.timePeriodSelector"
      ])
      .config(function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(["self",/.*/]);
      });

   angular.module("app").controller("AppController",AppController);

   AppController.$inject=["$scope", "currentSelections"];

   function AppController($scope, currentSelections) {

      currentSelections.setSelectedTimePeriodDefault({
         name: "x/x to y/y/yyyy",
         value: "CUSTOM",
         startDate: new Date(),
         endDate: new Date(),
         display: "6/15 to 7/5/2016"
      });


      $scope.$on("vsl.core.ui.testLogin:success",function(){
         console.log("EVENT --> vsl.core.ui.testLogin:success","timePeriodSelector");

      });

      return;
   }
   angular.bootstrap(document.body,["app"]);

})(window.location.href);