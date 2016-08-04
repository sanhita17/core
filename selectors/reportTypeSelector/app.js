(function($localPath){
   angular
      .module("app",[
         "vsl.core.ui.testLogin",
         "vsl.velocity.app.services",
         "vsl.velocity.app.service.currentSelections",
         "vsl.velocity.app.service.principalProperties",
         "vsl.velocity.ui.selectors.reportTypeSelector"
      ])
      .config(function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(["self",/.*/]);
      });

   angular.module("app").controller("AppController",AppController);

   AppController.$inject=["$scope", "currentSelections"];

   function AppController($scope, currentSelections) {

      currentSelections.setSelectedReportTypeDefault("Detailed Report");

      $scope.$on("vsl.core.ui.testLogin:success",function(){
         console.log("EVENT --> vsl.core.ui.testLogin:success","reportTypeSelector");

      });

      return;
   }
   angular.bootstrap(document.body,["app"]);

})(window.location.href);