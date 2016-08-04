encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }
   function info() {
      //console.info.apply(console,arguments);
   }
   function error() {
      //console.error.apply(console,arguments);
   }

   log("Script: vsl.velocity.views.district.dashboard",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.views.district.dashboard",[
      $localPath.combineUrls("dashboard.css"),
      $localPath.combineUrls("../../../resources/fonts/fonts.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.views.district.dashboard",[
      "ngCookies",
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity",
      "vsl.velocity.app.directives",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.views.district.dashboard");
   });

   module.controller("districtDashboardController",districtDashboardController);

   districtDashboardController.$inject=[];

   function districtDashboardController() {
      log("Controller: vsl.velocity.views.district.dashboard");

      return;
   }

   module.service("districtDashboardService",districtDashboardService);

   districtDashboardService.$inject=[];

   function districtDashboardService(){
      log("Service: vsl.velocity.views.district.dashboard");

      var service={};

      return service;
   }

   module.directive("districtDashboard",districtDashboard);

   districtDashboard.$inject=[];

   function districtDashboard() {
      log("Directive: vsl.velocity.views.district.dashboard");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("dashboard.html"),
         controller: districtDashboardController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.district.dashboard");

         return;
      }

   }

});
