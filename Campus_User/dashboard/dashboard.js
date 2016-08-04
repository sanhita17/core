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

   log("Script: vsl.velocity.views.campus.dashboard",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.views.campus.dashboard",[
      $localPath.combineUrls("dashboard.css"),
      $localPath.combineUrls("../../../resources/fonts/fonts.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.views.campus.dashboard",[
      "ngCookies",
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity",
      "vsl.velocity.app.directives",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.views.campus.dashboard");
   });

   module.controller("campusDashboardController",campusDashboardController);

   campusDashboardController.$inject=[];

   function campusDashboardController() {
      log("Controller: vsl.velocity.views.campus.dashboard");

      return;
   }

   module.service("campusDashboardService",campusDashboardService);

   campusDashboardService.$inject=[];

   function campusDashboardService(){
      log("Service: vsl.velocity.views.campus.dashboard");

      var service={};

      return service;
   }

   module.directive("campusDashboard",campusDashboard);

   campusDashboard.$inject=[];

   function campusDashboard() {
      log("Directive: vsl.velocity.views.campus.dashboard");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("dashboard.html"),
         controller: campusDashboardController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.campus.dashboard");

         return;
      }

   }

});
